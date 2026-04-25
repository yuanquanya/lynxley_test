/**
 * Netlify Function: 验证登录状态
 * GET /.netlify/functions/auth-me
 */
import { verifyAuth, jsonResponse, corsHeaders } from './utils/auth.js';

export const handler = async (event) => {
  // 处理 CORS 预检请求
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return jsonResponse(405, { error: '方法不允许' });
  }

  const authResult = verifyAuth(event);
  if (!authResult.valid) {
    return jsonResponse(401, { error: authResult.error });
  }

  return jsonResponse(200, { user: authResult.user });
};
