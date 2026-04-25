import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Image as ImageIcon, Link2, KeyRound, User } from 'lucide-react';
import type { AuthUser } from './api';
import { updateUserProfile } from './api';

const DEFAULT_AVATARS = [
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Mimi',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Loki',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Bot1',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Bot2',
];

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser | null;
  onProfileUpdate: (updatedUser: AuthUser) => void;
  showToast: (msg: string) => void;
}

export default function ProfileModal({ isOpen, onClose, currentUser, onProfileUpdate, showToast }: ProfileModalProps) {
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');

  useEffect(() => {
    if (isOpen && currentUser) {
      setDisplayName(currentUser.displayName || '');
      setAvatar(currentUser.avatar || '');
      setPassword('');
      if (currentUser.avatar && !DEFAULT_AVATARS.includes(currentUser.avatar)) {
        setCustomAvatarUrl(currentUser.avatar);
        setActiveTab('custom');
      } else {
        setActiveTab('presets');
      }
    }
  }, [isOpen, currentUser]);

  const handleSave = async () => {
    if (!currentUser) return;
    if (currentUser.isGuest) {
      showToast('访客模式无法修改资料');
      return;
    }

    setLoading(true);
    const finalAvatar = activeTab === 'presets' ? avatar : customAvatarUrl;

    const { success, error } = await updateUserProfile(currentUser.id, {
      displayName,
      password: password || undefined,
      avatar: finalAvatar || undefined,
    });

    setLoading(false);

    if (success) {
      showToast('个人资料已更新');
      onProfileUpdate({
        ...currentUser,
        displayName,
        avatar: finalAvatar || undefined,
      });
      onClose();
    } else {
      showToast(error || '更新失败');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-surface-variant/40 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-surface-container-lowest rounded-[2rem] shadow-2xl overflow-hidden border border-outline-variant/10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-outline-variant/10 flex items-center justify-between bg-surface-container-low shrink-0">
            <h2 className="text-xl font-extrabold font-headline text-on-surface">编辑个人资料</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface-container-highest rounded-full transition-colors text-on-surface-variant hover:text-on-surface"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto">
            {/* Avatar Section */}
            <div className="mb-10">
              <label className="block text-sm font-bold text-on-surface-variant mb-4 uppercase tracking-widest flex items-center gap-2">
                <ImageIcon size={16} /> 更换头像
              </label>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 rounded-3xl bg-surface-container-high border border-outline-variant/20 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                  {(activeTab === 'presets' && avatar) || (activeTab === 'custom' && customAvatarUrl) ? (
                    <img 
                      src={activeTab === 'presets' ? avatar : customAvatarUrl} 
                      alt="Avatar Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23eee"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="14" fill="%23999">图片失效</text></svg>';
                      }}
                    />
                  ) : (
                    <span className="text-4xl font-black text-on-surface-variant/30">
                      {displayName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex gap-2 p-1 bg-surface-container-low rounded-xl mb-4">
                    <button
                      onClick={() => setActiveTab('presets')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'presets' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                    >
                      系统预设
                    </button>
                    <button
                      onClick={() => setActiveTab('custom')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'custom' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                    >
                      自定义链接
                    </button>
                  </div>
                  
                  {activeTab === 'presets' && (
                    <div className="grid grid-cols-6 gap-2">
                      {DEFAULT_AVATARS.map((url) => (
                        <button
                          key={url}
                          onClick={() => setAvatar(url)}
                          className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all hover:scale-110 ${avatar === url ? 'border-primary shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                          <img src={url} alt="preset" className="w-full h-full object-cover bg-surface-container-high" />
                        </button>
                      ))}
                    </div>
                  )}

                  {activeTab === 'custom' && (
                    <div className="relative">
                      <Link2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50" />
                      <input
                        type="url"
                        value={customAvatarUrl}
                        onChange={(e) => setCustomAvatarUrl(e.target.value)}
                        placeholder="输入图片 URL"
                        className="w-full pl-9 pr-4 py-3 rounded-xl bg-surface-container-high border border-transparent focus:border-primary focus:bg-white outline-none text-sm font-bold text-on-surface transition-all placeholder:font-medium placeholder:text-on-surface-variant/40"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Display Name Section */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-on-surface-variant mb-3 uppercase tracking-widest flex items-center gap-2">
                <User size={16} /> 显示昵称
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="您的称呼"
                className="w-full px-5 py-4 rounded-2xl bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-white outline-none text-on-surface font-bold placeholder:text-on-surface-variant/40 transition-all"
              />
            </div>

            {/* Password Section */}
            <div className="mb-4">
              <label className="block text-sm font-bold text-on-surface-variant mb-3 uppercase tracking-widest flex items-center gap-2">
                <KeyRound size={16} /> 修改密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="留空则保持原密码不变"
                className="w-full px-5 py-4 rounded-2xl bg-surface-container-low border-2 border-transparent focus:border-primary focus:bg-white outline-none text-on-surface font-bold placeholder:text-on-surface-variant/40 transition-all"
              />
              <p className="text-xs text-on-surface-variant/50 mt-2 font-medium pl-1">
                如不需要修改密码，请不要填写此栏。
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-outline-variant/10 bg-surface-container-low flex justify-end gap-3 shrink-0">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl font-bold text-sm text-on-surface-variant hover:bg-surface-container-highest transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              disabled={loading || currentUser?.isGuest}
              className="px-8 py-3 rounded-xl signature-gradient text-white font-black text-sm flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <Save size={16} />
              )}
              保存修改
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
