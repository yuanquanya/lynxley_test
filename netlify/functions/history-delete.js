/**
 * Netlify Function: 删除历史记录
 * DELETE /.netlify/functions/history-delete?id=xxx
 */
import { getPool, ensureTables } from './utils/db.js';
import { verifyAuth, jsonResponse, corsHeaders } from './utils/auth.js';

export const handler = async (event) => {
  // 处理 CORS 预检请求
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'DELETE') {
    return jsonResponse(405, { error: '方法不允许' });
  }

  // 验证登录
  const authResult = verifyAuth(event);
  if (!authResult.valid) {
    return jsonResponse(401, { error: authResult.error });
  }

  try {
    // Netlify Functions 不支持路径参数，使用 query string
    const id = event.queryStringParameters?.id;
    if (!id) {
      return jsonResponse(400, { error: '缺少记录 ID' });
    }

    const pool = getPool();
    await ensureTables();

    await pool.execute(
      'DELETE FROM history WHERE id = ? AND user_id = ?',
      [id, authResult.user.id]
    );

    return jsonResponse(200, { success: true });
  } catch (err) {
    console.error('删除历史记录失败:', err.message);
    return jsonResponse(500, { error: '删除历史记录失败' });
  }
};
