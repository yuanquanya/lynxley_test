/**
 * Netlify Function: 保存历史记录
 * POST /.netlify/functions/history-save
 */
import { getPool, ensureTables } from './utils/db.js';
import { verifyAuth, jsonResponse, corsHeaders } from './utils/auth.js';

export const handler = async (event) => {
  // 处理 CORS 预检请求
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: '方法不允许' });
  }

  // 验证登录
  const authResult = verifyAuth(event);
  if (!authResult.valid) {
    return jsonResponse(401, { error: authResult.error });
  }

  try {
    const { id, assessmentId, title, result, date } = JSON.parse(event.body || '{}');

    const pool = getPool();
    await ensureTables();

    await pool.execute(
      `INSERT INTO history (id, user_id, assessment_id, title, score, correct_count, total_count, time_taken, breakdown, answers, date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        authResult.user.id,
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

    return jsonResponse(201, { success: true });
  } catch (err) {
    console.error('保存历史记录失败:', err.message);
    return jsonResponse(500, { error: '保存历史记录失败' });
  }
};
