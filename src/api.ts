/**
 * API 层 - Supabase 云端 + localStorage 本地降级
 *
 * 登录用户：数据存储在 Supabase 云端（支持跨设备同步）
 * 访客用户：数据存储在 localStorage（仅本地）
 * Supabase 未配置时：所有用户降级到 localStorage
 */

import { HistoryRecord } from './types';
import { supabase, isSupabaseConfigured } from './supabase';

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

// ── 用户本地缓存 ──────────────────────────────────────────

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

/** 登录 - 通过 Supabase 验证，降级到本地预设账号 */
export async function login(
  username: string,
  password: string
): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, username, display_name')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error || !data) {
        return { success: false, error: '用户名或密码错误' };
      }

      const user: AuthUser = {
        id: data.id,
        username: data.username,
        displayName: data.display_name || data.username,
      };
      saveUser(user);
      return { success: true, user };
    } catch {
      return { success: false, error: '网络连接失败' };
    }
  }

  // Supabase 未配置时 - 本地预设账号
  if (username === '20242013' && password === '20') {
    const user: AuthUser = { id: 1, username: '20242013', displayName: '20242013' };
    saveUser(user);
    return { success: true, user };
  }
  return { success: false, error: '用户名或密码错误' };
}

/** 访客登录 */
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

// ── localStorage 历史记录 ──────────────────────────────────

function getLocalKey(): string {
  const u = getSavedUser();
  if (!u) return HISTORY_KEY;
  if (u.isGuest) return `${HISTORY_KEY}_guest`;
  return `${HISTORY_KEY}_${u.username}`;
}

function loadLocalHistory(): HistoryRecord[] {
  try {
    const raw = localStorage.getItem(getLocalKey());
    if (!raw) return [];
    return JSON.parse(raw) as HistoryRecord[];
  } catch {
    return [];
  }
}

function saveLocalHistory(records: HistoryRecord[]) {
  try {
    localStorage.setItem(getLocalKey(), JSON.stringify(records));
  } catch (e) {
    console.warn('本地历史保存失败:', e);
  }
}

// ── 云端历史记录 (Supabase) ──────────────────────────────────

/** 判断当前用户是否使用云端存储 */
function useCloud(): boolean {
  const user = getSavedUser();
  return isSupabaseConfigured && !!user && !user.isGuest;
}

/** 获取历史记录 */
export async function fetchHistory(): Promise<HistoryRecord[]> {
  if (!useCloud()) return loadLocalHistory();

  const user = getSavedUser()!;
  try {
    const { data, error } = await supabase
      .from('history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map((row) => ({
      id: row.id,
      assessmentId: row.assessment_id,
      title: row.title,
      result: {
        score: row.score,
        correctCount: row.correct_count,
        totalCount: row.total_count,
        timeTaken: row.time_taken,
        breakdown: row.breakdown,
        answers: row.answers,
      },
      date: row.date,
    }));
  } catch (err) {
    console.warn('云端获取失败，降级到本地:', err);
    return loadLocalHistory();
  }
}

/** 保存一条历史记录 */
export async function saveHistoryRecord(record: HistoryRecord): Promise<boolean> {
  // 始终保存一份本地副本
  const local = loadLocalHistory();
  saveLocalHistory([record, ...local]);

  if (!useCloud()) return true;

  const user = getSavedUser()!;
  try {
    const { error } = await supabase.from('history').insert({
      id: record.id,
      user_id: user.id,
      assessment_id: record.assessmentId || null,
      title: record.title,
      score: record.result.score,
      correct_count: record.result.correctCount,
      total_count: record.result.totalCount,
      time_taken: record.result.timeTaken,
      breakdown: record.result.breakdown,
      answers: record.result.answers,
      date: record.date,
    });
    if (error) throw error;
    return true;
  } catch (err) {
    console.warn('云端保存失败，已保存到本地:', err);
    return false;
  }
}

/** 删除一条历史记录 */
export async function deleteHistoryRecord(id: string): Promise<boolean> {
  // 本地也删除
  const local = loadLocalHistory();
  saveLocalHistory(local.filter((r) => r.id !== id));

  if (!useCloud()) return true;

  try {
    const { error } = await supabase.from('history').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (err) {
    console.warn('云端删除失败:', err);
    return false;
  }
}
