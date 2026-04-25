/**
 * 纯本地认证 + 历史记录存储
 * 无需任何后端服务，所有数据存储在 localStorage
 */

import { HistoryRecord } from './types';

// ── 本地存储 Key ──────────────────────────────────────────────

const USER_KEY = 'lynxley_auth_user';
const HISTORY_KEY = 'lynxley_history';

// ── 用户类型 ──────────────────────────────────────────────

export interface AuthUser {
  id: number;
  username: string;
  displayName: string;
  isGuest?: boolean;
}

// ── 预设账号（硬编码） ──────────────────────────────────────────

const PRESET_ACCOUNTS: { username: string; password: string; displayName: string }[] = [
  { username: '20242013', password: '20', displayName: '20242013' },
];

// ── 用户管理 ──────────────────────────────────────────────

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

function clearUser() {
  localStorage.removeItem(USER_KEY);
}

// ── 认证 API ──────────────────────────────────────────────

/** 登录 - 本地验证预设账号 */
export async function login(
  username: string,
  password: string
): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  const account = PRESET_ACCOUNTS.find(
    (a) => a.username === username && a.password === password
  );

  if (!account) {
    return { success: false, error: '用户名或密码错误' };
  }

  const user: AuthUser = {
    id: 1,
    username: account.username,
    displayName: account.displayName,
  };
  saveUser(user);
  return { success: true, user };
}

/** 访客登录 - 纯本地模式 */
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
  clearUser();
}

/** 检查登录状态 */
export async function checkAuth(): Promise<AuthUser | null> {
  return getSavedUser();
}

// ── 历史记录（localStorage）──────────────────────────────────

function getStorageKey(user?: AuthUser | null): string {
  const u = user || getSavedUser();
  if (!u) return HISTORY_KEY;
  if (u.isGuest) return `${HISTORY_KEY}_guest`;
  return `${HISTORY_KEY}_${u.username}`;
}

function loadLocalHistory(): HistoryRecord[] {
  try {
    const raw = localStorage.getItem(getStorageKey());
    if (!raw) return [];
    return JSON.parse(raw) as HistoryRecord[];
  } catch {
    return [];
  }
}

function saveLocalHistory(records: HistoryRecord[]) {
  try {
    localStorage.setItem(getStorageKey(), JSON.stringify(records));
  } catch (e) {
    console.warn('历史记录保存失败:', e);
  }
}

/** 获取当前用户的历史记录 */
export async function fetchHistory(): Promise<HistoryRecord[]> {
  return loadLocalHistory();
}

/** 保存一条历史记录 */
export async function saveHistoryRecord(record: HistoryRecord): Promise<boolean> {
  const existing = loadLocalHistory();
  saveLocalHistory([record, ...existing]);
  return true;
}

/** 删除一条历史记录 */
export async function deleteHistoryRecord(id: string): Promise<boolean> {
  const existing = loadLocalHistory();
  saveLocalHistory(existing.filter((r) => r.id !== id));
  return true;
}
