/**
 * Netlify Function: 用户注册
 * POST /.netlify/functions/auth-register
 */
import bcrypt from 'bcryptjs';
import { getPool, ensureTables } from './utils/db.js';
import { signToken, jsonResponse, corsHeaders } from './utils/auth.js';

export const handler = async (event) => {
  // 处理 CORS 预检请求
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: '方法不允许' });
  }

  try {
    const { username, password, displayName } = JSON.parse(event.body || '{}');

    if (!username || !password) {
      return jsonResponse(400, { error: '用户名和密码不能为空' });
    }

    if (username.length < 2 || username.length > 50) {
      return jsonResponse(400, { error: '用户名长度需要在 2-50 个字符之间' });
    }

    if (password.length < 4) {
      return jsonResponse(400, { error: '密码长度不能少于 4 个字符' });
    }

    const pool = getPool();
    await ensureTables();

    // 检查用户名是否已存在
    const [existing] = await pool.execute(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );

    if (existing.length > 0) {
      return jsonResponse(409, { error: '用户名已被注册' });
    }

    // 加密密码
    const passwordHash = await bcrypt.hash(password, 10);

    // 创建用户
    const [result] = await pool.execute(
      'INSERT INTO users (username, password_hash, display_name) VALUES (?, ?, ?)',
      [username, passwordHash, displayName || username]
    );

    // 生成 JWT
    const token = signToken({
      id: result.insertId,
      username,
      displayName: displayName || username,
    });

    return jsonResponse(201, {
      token,
      user: { id: result.insertId, username, displayName: displayName || username },
    });
  } catch (err) {
    console.error('注册失败:', err.message);
    return jsonResponse(500, { error: '注册失败，请稍后再试' });
  }
};
