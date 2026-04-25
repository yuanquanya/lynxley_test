/**
 * Netlify Function: 获取历史记录
 * GET /.netlify/functions/history-get
 */
import { getPool, ensureTables } from './utils/db.js';
import { verifyAuth, jsonResponse, corsHeaders } from './utils/auth.js';

export const handler = async (event) => {
  // 处理 CORS 预检请求
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return jsonResponse(405, { error: '方法不允许' });
  }

  // 验证登录
  const authResult = verifyAuth(event);
  if (!authResult.valid) {
    return jsonResponse(401, { error: authResult.error });
  }

  try {
    const pool = getPool();
    await ensureTables();

    const [rows] = await pool.execute(
      'SELECT * FROM history WHERE user_id = ? ORDER BY created_at DESC',
      [authResult.user.id]
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

    return jsonResponse(200, records);
  } catch (err) {
    console.error('获取历史记录失败:', err.message);
    return jsonResponse(500, { error: '获取历史记录失败' });
  }
};
