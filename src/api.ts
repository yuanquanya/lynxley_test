/**
 * API 调用封装 - 与 Netlify Functions 通信
 * 包含用户认证和历史记录 CRUD 操作
 * 当 API 不可用时，降级到 Cookie 存储
 */

import { HistoryRecord } from './types';
import { loadHistory as loadFromCookie, saveHistory as saveToCookie } from './cookie';

// Netlify Functions 路径
const FUNC_BASE = '/.netlify/functions';

// ── Token 管理 ──────────────────────────────────────────────

const TOKEN_KEY = 'lynxley_auth_token';
const USER_KEY = 'lynxley_auth_user';

export interface AuthUser {
  id: number;
  username: string;
  displayName: string;
}

function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

function getSavedUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

function saveUser(user: AuthUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/** 带认证头的 fetch 封装 */
function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken();
  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return fetch(url, { ...options, headers });
}

// ── 认证 API ──────────────────────────────────────────────

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

/** 注册 */
export async function register(
  username: string,
  password: string,
  displayName?: string
): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  try {
    const res = await fetch(`${FUNC_BASE}/auth-register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, displayName }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || '注册失败' };
    }
    setToken(data.token);
    saveUser(data.user);
    return { success: true, user: data.user };
  } catch (err) {
    return { success: false, error: '网络连接失败，请检查网络' };
  }
}

/** 登录 */
export async function login(
  username: string,
  password: string
): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  try {
    const res = await fetch(`${FUNC_BASE}/auth-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || '登录失败' };
    }
    setToken(data.token);
    saveUser(data.user);
    return { success: true, user: data.user };
  } catch (err) {
    return { success: false, error: '网络连接失败，请检查网络' };
  }
}

/** 登出 */
export function logout() {
  clearToken();
}

/**
 * 检查登录状态
 * 返回当前用户信息，如果未登录返回 null
 */
export async function checkAuth(): Promise<AuthUser | null> {
  const token = getToken();
  if (!token) return null;

  // 先尝试从本地获取
  const savedUser = getSavedUser();

  try {
    const res = await authFetch(`${FUNC_BASE}/auth-me`);
    if (!res.ok) {
      clearToken();
      return null;
    }
    const data = await res.json();
    saveUser(data.user);
    return data.user;
  } catch {
    // 网络不可用时，使用本地缓存的用户信息
    return savedUser;
  }
}

// ── 历史记录 API ──────────────────────────────────────────────

/**
 * 从服务器获取当前用户的历史记录
 * 如果 API 不可用，降级到 Cookie
 */
export async function fetchHistory(): Promise<HistoryRecord[]> {
  try {
    const res = await authFetch(`${FUNC_BASE}/history-get`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data as HistoryRecord[];
  } catch (err) {
    console.warn('API 不可用，降级到 Cookie 存储:', err);
    return loadFromCookie();
  }
}

/**
 * 保存一条历史记录到服务器
 * 如果 API 不可用，降级到 Cookie
 */
export async function saveHistoryRecord(record: HistoryRecord): Promise<boolean> {
  try {
    const res = await authFetch(`${FUNC_BASE}/history-save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return true;
  } catch (err) {
    console.warn('API 保存失败，降级到 Cookie:', err);
    const existing = loadFromCookie();
    saveToCookie([record, ...existing]);
    return false;
  }
}

/**
 * 从服务器删除一条历史记录
 * 如果 API 不可用，降级到 Cookie
 */
export async function deleteHistoryRecord(id: string): Promise<boolean> {
  try {
    const res = await authFetch(`${FUNC_BASE}/history-delete?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return true;
  } catch (err) {
    console.warn('API 删除失败，降级到 Cookie:', err);
    const existing = loadFromCookie();
    saveToCookie(existing.filter((r) => r.id !== id));
    return false;
  }
}
