/**
 * API 调用封装 - 与 Netlify Functions 通信
 * 包含用户认证和历史记录 CRUD 操作
 * 当 API 不可用时，降级到 Cookie 存储
 * 支持访客模式 - 数据存储在本地 localStorage
 */

import { HistoryRecord } from './types';
import { loadHistory as loadFromCookie, saveHistory as saveToCookie } from './cookie';

// Netlify Functions 路径
const FUNC_BASE = '/.netlify/functions';

// ── Token 管理 ──────────────────────────────────────────────

const TOKEN_KEY = 'lynxley_auth_token';
const USER_KEY = 'lynxley_auth_user';
const GUEST_HISTORY_KEY = 'lynxley_guest_history';

export interface AuthUser {
  id: number;
  username: string;
  displayName: string;
  isGuest?: boolean;
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

/** 访客登录 - 纯本地模式，无需服务器 */
export function guestLogin(): AuthUser {
  const guest: AuthUser = {
    id: -1,
    username: 'guest',
    displayName: '访客',
    isGuest: true,
  };
  saveUser(guest);
  return guest;
}

/** 登出 */
export function logout() {
  clearToken();
  localStorage.removeItem(GUEST_HISTORY_KEY);
}

/**
 * 检查登录状态
 * 返回当前用户信息，如果未登录返回 null
 */
export async function checkAuth(): Promise<AuthUser | null> {
  // 先检查是否是访客模式
  const savedUser = getSavedUser();
  if (savedUser?.isGuest) {
    return savedUser;
  }

  const token = getToken();
  if (!token) return null;

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

// ── 访客本地存储 ──────────────────────────────────────────────

function loadGuestHistory(): HistoryRecord[] {
  try {
    const raw = localStorage.getItem(GUEST_HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as HistoryRecord[];
  } catch {
    return [];
  }
}

function saveGuestHistory(records: HistoryRecord[]) {
  try {
    localStorage.setItem(GUEST_HISTORY_KEY, JSON.stringify(records));
  } catch (e) {
    console.warn('访客历史保存失败:', e);
  }
}

// ── 历史记录 API ──────────────────────────────────────────────

/** 判断当前是否访客模式 */
function isGuestMode(): boolean {
  const user = getSavedUser();
  return !!user?.isGuest;
}

/**
 * 从服务器获取当前用户的历史记录
 * 访客模式使用 localStorage，登录用户使用 API
 */
export async function fetchHistory(): Promise<HistoryRecord[]> {
  if (isGuestMode()) {
    return loadGuestHistory();
  }

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
 * 访客模式使用 localStorage，登录用户使用 API
 */
export async function saveHistoryRecord(record: HistoryRecord): Promise<boolean> {
  if (isGuestMode()) {
    const existing = loadGuestHistory();
    saveGuestHistory([record, ...existing]);
    return true;
  }

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
 * 访客模式使用 localStorage，登录用户使用 API
 */
export async function deleteHistoryRecord(id: string): Promise<boolean> {
  if (isGuestMode()) {
    const existing = loadGuestHistory();
    saveGuestHistory(existing.filter((r) => r.id !== id));
    return true;
  }

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
