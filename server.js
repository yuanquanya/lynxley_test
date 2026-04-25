import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'lynxley_test_secret_key_change_in_production';

// Middleware
app.use(cors());
app.use(express.json());

// ── MySQL 连接池 ──────────────────────────────────────────────
let pool;

async function initDatabase() {
  pool = mysql.createPool({
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    user: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'lynxley_test',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  // 自动建表 - 用户表
  const createUsersTableSQL = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      display_name VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  // 自动建表 - 历史记录表（含 user_id 外键）
  const createHistoryTableSQL = `
    CREATE TABLE IF NOT EXISTS history (
      id VARCHAR(50) PRIMARY KEY,
      user_id INT NOT NULL,
      assessment_id VARCHAR(50),
      title VARCHAR(255) NOT NULL,
      score INT NOT NULL,
      correct_count INT NOT NULL,
      total_count INT NOT NULL,
      time_taken VARCHAR(50) NOT NULL,
      breakdown JSON,
      answers JSON,
      date VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_user_id (user_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  try {
    await pool.execute(createUsersTableSQL);
    await pool.execute(createHistoryTableSQL);
    console.log('✅ 数据库表初始化完成');
  } catch (err) {
    console.error('❌ 数据库初始化失败:', err.message);
    throw err;
  }
}

// ── JWT 认证中间件 ──────────────────────────────────────────────

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: '未登录，请先登录' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, username, displayName }
    next();
  } catch (err) {
    return res.status(401).json({ error: '登录已过期，请重新登录' });
  }
}

// ── 用户认证 API ──────────────────────────────────────────────

// 注册
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, displayName } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: '用户名和密码不能为空' });
    }

    if (username.length < 2 || username.length > 50) {
      return res.status(400).json({ error: '用户名长度需要在 2-50 个字符之间' });
    }

    if (password.length < 4) {
      return res.status(400).json({ error: '密码长度不能少于 4 个字符' });
    }

    // 检查用户名是否已存在
    const [existing] = await pool.execute(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );

    if (existing.length > 0) {
      return res.status(409).json({ error: '用户名已被注册' });
    }

    // 加密密码
    const passwordHash = await bcrypt.hash(password, 10);

    // 创建用户
    const [result] = await pool.execute(
      'INSERT INTO users (username, password_hash, display_name) VALUES (?, ?, ?)',
      [username, passwordHash, displayName || username]
    );

    // 生成 JWT
    const token = jwt.sign(
      { id: result.insertId, username, displayName: displayName || username },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      token,
      user: { id: result.insertId, username, displayName: displayName || username },
    });
  } catch (err) {
    console.error('注册失败:', err.message);
    res.status(500).json({ error: '注册失败，请稍后再试' });
  }
});

// 登录
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: '用户名和密码不能为空' });
    }

    // 查找用户
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: '用户名或密码错误' });
    }

    const user = rows[0];

    // 验证密码
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: '用户名或密码错误' });
    }

    // 生成 JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, displayName: user.display_name },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      token,
      user: { id: user.id, username: user.username, displayName: user.display_name },
    });
  } catch (err) {
    console.error('登录失败:', err.message);
    res.status(500).json({ error: '登录失败，请稍后再试' });
  }
});

// 验证 token（前端用于检查登录状态）
app.get('/api/auth/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// ── 历史记录 API（需要登录） ──────────────────────────────────

// 获取当前用户的历史记录
app.get('/api/history', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM history WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    // 将数据库行转换为前端需要的格式
    const records = rows.map((row) => ({
      id: row.id,
      assessmentId: row.assessment_id,
      title: row.title,
      result: {
        score: row.score,
        correctCount: row.correct_count,
        totalCount: row.total_count,
        timeTaken: row.time_taken,
        breakdown: typeof row.breakdown === 'string' ? JSON.parse(row.breakdown) : row.breakdown,
        answers: typeof row.answers === 'string' ? JSON.parse(row.answers) : row.answers,
      },
      date: row.date,
    }));
    res.json(records);
  } catch (err) {
    console.error('获取历史记录失败:', err.message);
    res.status(500).json({ error: '获取历史记录失败' });
  }
});

// 保存新的历史记录
app.post('/api/history', authMiddleware, async (req, res) => {
  try {
    const { id, assessmentId, title, result, date } = req.body;

    await pool.execute(
      `INSERT INTO history (id, user_id, assessment_id, title, score, correct_count, total_count, time_taken, breakdown, answers, date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        req.user.id,
        assessmentId || null,
        title,
        result.score,
        result.correctCount,
        result.totalCount,
        result.timeTaken,
        JSON.stringify(result.breakdown),
        JSON.stringify(result.answers),
        date,
      ]
    );

    res.status(201).json({ success: true });
  } catch (err) {
    console.error('保存历史记录失败:', err.message);
    res.status(500).json({ error: '保存历史记录失败' });
  }
});

// 删除历史记录（只能删除自己的）
app.delete('/api/history/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.execute('DELETE FROM history WHERE id = ? AND user_id = ?', [id, req.user.id]);
    res.json({ success: true });
  } catch (err) {
    console.error('删除历史记录失败:', err.message);
    res.status(500).json({ error: '删除历史记录失败' });
  }
});

// ── 生产环境：托管前端静态文件 ──────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));

  // 所有非 API 路由返回 index.html（支持 SPA 路由）
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    }
  });
}

// ── 启动服务器 ─────────────────────────────────────────────────
async function start() {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
      if (process.env.NODE_ENV === 'production') {
        console.log('📦 生产模式：托管静态文件从 dist/');
      }
    });
  } catch (err) {
    console.error('服务器启动失败:', err.message);
    process.exit(1);
  }
}

start();
