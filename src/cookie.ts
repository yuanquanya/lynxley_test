/**
 * Cookie 工具 - 用于持久化答题历史数据
 */

import { HistoryRecord } from './types';

const COOKIE_NAME = 'mindful_assess_history';
const MAX_AGE_DAYS = 365;

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

export function saveHistory(history: HistoryRecord[]) {
  try {
    const json = JSON.stringify(history);
    setCookie(COOKIE_NAME, json, MAX_AGE_DAYS);
  } catch (e) {
    console.warn('保存答题记录失败:', e);
  }
}

export function loadHistory(): HistoryRecord[] {
  try {
    const raw = getCookie(COOKIE_NAME);
    if (!raw) return [];
    return JSON.parse(raw) as HistoryRecord[];
  } catch (e) {
    console.warn('读取答题记录失败:', e);
    return [];
  }
}
