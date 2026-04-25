/**
 * Netlify Function: 一次性用户创建（种子脚本）
 * POST /.netlify/functions/seed-user
 * 创建完成后请删除此文件
 */
import bcrypt from 'bcryptjs';
import { getPool, ensureTables } from './utils/db.js';
import { jsonResponse, corsHeaders } from './utils/auth.js';

export const handler = async (event) => {
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

    const pool = getPool();
    await ensureTables();

    // 检查是否已存在
    const [existing] = await pool.execute('SELECT id FROM users WHERE username = ?', [username]);
    if (existing.length > 0) {
      return jsonResponse(200, { message: `用户 "${username}" 已存在`, id: existing[0].id });
    }

    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (username, password_hash, display_name) VALUES (?, ?, ?)',
      [username, hash, displayName || username]
    );

    return jsonResponse(201, {
      message: '用户创建成功',
      id: result.insertId,
      username,
    });
  } catch (err) {
    console.error('创建用户失败:', err.message);
    return jsonResponse(500, { error: '创建用户失败: ' + err.message });
  }
};
