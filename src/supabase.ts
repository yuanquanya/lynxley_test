/**
 * Supabase 客户端初始化
 * 使用 Vite 环境变量注入 Supabase 配置
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase 配置缺失，云同步功能将不可用');
}

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// 只有在配置存在时才初始化 supabase 客户端，否则传入占位符以防止页面白屏崩溃
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : (null as any);
