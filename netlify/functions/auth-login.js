/**
 * Netlify Function: 用户登录
 * POST /.netlify/functions/auth-login
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
    const { username, password } = JSON.parse(event.body || '{}');

    if (!username || !password) {
      return jsonResponse(400, { error: '用户名和密码不能为空' });
    }

    const pool = getPool();
    await ensureTables();

    // 查找用户
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return jsonResponse(401, { error: '用户名或密码错误' });
    }

    const user = rows[0];

    // 验证密码
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return jsonResponse(401, { error: '用户名或密码错误' });
    }

    // 生成 JWT
    const token = signToken({
      id: user.id,
      username: user.username,
      displayName: user.display_name,
    });

    return jsonResponse(200, {
      token,
      user: { id: user.id, username: user.username, displayName: user.display_name },
    });
  } catch (err) {
    console.error('登录失败:', err.message);
    return jsonResponse(500, { error: '登录失败，请稍后再试' });
  }
};
