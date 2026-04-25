/**
 * 共享 JWT 认证工具
 */
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'lynxley_test_secret_key_change_in_production';

/**
 * 签发 JWT token
 */
export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
}

/**
 * 验证 JWT token
 * 从请求头中提取 Authorization: Bearer <token>
 * 返回 { valid: true, user } 或 { valid: false, error }
 */
export function verifyAuth(event) {
  const authHeader = event.headers.authorization || event.headers.Authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return { valid: false, error: '未登录，请先登录' };
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { valid: true, user: decoded };
  } catch (err) {
    return { valid: false, error: '登录已过期，请重新登录' };
  }
}

/**
 * 通用 CORS 响应头
 */
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
};

/**
 * 构造 JSON 响应
 */
export function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
    body: JSON.stringify(body),
  };
}
