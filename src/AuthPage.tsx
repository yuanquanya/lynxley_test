/**
 * 登录页面 - Material Design 3 风格
 * 支持账号登录 + 访客模式
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Lock, Eye, EyeOff, ArrowRight, Sparkles, UserCheck } from 'lucide-react';
import { login, guestLogin, AuthUser } from './api';

interface AuthPageProps {
  onAuthSuccess: (user: AuthUser) => void;
}

export default function AuthPage({ onAuthSuccess }: AuthPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await login(username, password);
      if (result.success && result.user) {
        onAuthSuccess(result.user);
      } else {
        setError(result.error || '登录失败');
      }
    } catch {
      setError('网络连接失败，请检查服务器是否运行');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    const guest = guestLogin();
    onAuthSuccess(guest);
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 relative overflow-hidden selection:bg-primary-fixed selection:text-primary">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] signature-gradient rounded-full opacity-[0.03] blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary rounded-full opacity-[0.04] blur-[100px] translate-y-1/3 -translate-x-1/4" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-[440px] relative z-10"
      >
        {/* Logo & Brand */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl signature-gradient shadow-2xl shadow-primary/30 mb-8"
          >
            <Sparkles size={36} className="text-white" />
          </motion.div>
          <h1 className="text-4xl font-extrabold font-headline text-on-surface tracking-tighter mb-3">
            Lynxley_test
          </h1>
          <p className="text-on-surface-variant font-medium text-lg">
            欢迎回来，请登录您的账户
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-surface-container-lowest rounded-[2rem] p-10 ambient-shadow border border-outline-variant/10">
          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-error-container/30 border border-error/20 text-error rounded-2xl px-5 py-4 mb-8 text-sm font-bold text-center">
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="relative">
              <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="用户名"
                autoComplete="username"
                required
                className="w-full pl-14 pr-5 py-4.5 rounded-2xl bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-white outline-none text-on-surface font-bold placeholder:text-on-surface-variant/40 placeholder:font-medium transition-all"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/50 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="密码"
                autoComplete="current-password"
                required
                className="w-full pl-14 pr-14 py-4.5 rounded-2xl bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-white outline-none text-on-surface font-bold placeholder:text-on-surface-variant/40 placeholder:font-medium transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-xl text-on-surface-variant/40 hover:text-on-surface-variant transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading || !username || !password}
              className="w-full py-5 rounded-2xl signature-gradient text-white font-black text-sm tracking-wider flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-primary/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-8!"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  登录
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-outline-variant/20" />
            <span className="text-on-surface-variant/40 text-xs font-bold tracking-widest">或</span>
            <div className="flex-1 h-px bg-outline-variant/20" />
          </div>

          {/* Guest Login Button */}
          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full py-5 rounded-2xl bg-surface-container-high text-on-surface font-bold text-sm tracking-wider flex items-center justify-center gap-3 hover:bg-surface-container-highest transition-all active:scale-[0.98] border border-outline-variant/10"
          >
            <UserCheck size={18} className="text-on-surface-variant" />
            访客模式
            <span className="text-on-surface-variant/50 text-xs font-medium">· 数据仅保存在本地</span>
          </button>
        </div>

        {/* Footer hint */}
        <p className="text-center text-on-surface-variant/50 text-xs mt-8 font-medium">
          访客模式数据存储在浏览器本地，登录账户可云端同步
        </p>
      </motion.div>
    </div>
  );
}
