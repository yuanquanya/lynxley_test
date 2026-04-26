/**
 * 响应式 App - 根据屏幕宽度自动切换桌面端/手机端 UI
 * 所有状态在此处集中管理，确保切换布局时不丢失进度
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import DesktopApp from './DesktopApp';
import MobileApp from './MobileApp';
import AuthPage from './AuthPage';
import { ASSESSMENTS } from './constants';
import { Assessment, AssessmentItem, UserResult, HistoryRecord, ViewType } from './types';
import { useTimer } from './useTimer';
import { fetchHistory, saveHistoryRecord, deleteHistoryRecord, checkAuth, logout as apiLogout, AuthUser } from './api';
import { AnimatePresence, motion } from 'motion/react';
import ProfileModal from './ProfileModal';

const MOBILE_BREAKPOINT = 768;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isMobile;
}

export interface SharedAppProps {
  currentAssessment: Assessment;
  view: ViewType;
  setView: (v: ViewType) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (idx: number) => void;
  answers: Record<string, string | string[]>;
  setAnswers: (ans: Record<string, string | string[]>) => void;
  result: UserResult | null;
  history: HistoryRecord[];
  selectedHistoryRecord: HistoryRecord | null;
  timerDisplay: string;
  timerIsLow: boolean;
  onStartAssessment: (item: AssessmentItem) => void;
  onFinishAssessment: () => void;
  onViewHistoryRecord: (record: HistoryRecord) => void;
  onDeleteRecord: (id: string) => void;
  onGoLibrary: () => void;
  markedQuestions: Record<string, boolean>;
  setMarkedQuestions: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  showToast: (msg: string) => void;
  showConfirm: (msg: string, onConfirm: () => void) => void;
  currentUser: AuthUser | null;
  onLogout: () => void;
  onOpenProfile: () => void;
}

export default function App() {
  const isMobile = useIsMobile();

  // 认证状态
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  const [view, setView] = useState<ViewType>('library');
  const [selectedItem, setSelectedItem] = useState<AssessmentItem | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [result, setResult] = useState<UserResult | null>(null);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [selectedHistoryRecord, setSelectedHistoryRecord] = useState<HistoryRecord | null>(null);
  const [markedQuestions, setMarkedQuestions] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [confirmState, setConfirmState] = useState<{ isOpen: boolean; message: string; onConfirm: () => void } | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  let activeAssessmentId = '1';
  if (view === 'results' && selectedHistoryRecord) {
    if (selectedHistoryRecord.assessmentId) {
      activeAssessmentId = selectedHistoryRecord.assessmentId;
    } else {
      const foundKey = Object.keys(ASSESSMENTS).find(k => ASSESSMENTS[k].title === selectedHistoryRecord.title);
      if (foundKey) activeAssessmentId = foundKey;
    }
  } else if (selectedItem) {
    activeAssessmentId = selectedItem.id;
  }
  const currentAssessment = ASSESSMENTS[activeAssessmentId] || ASSESSMENTS['1'];

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const showConfirm = useCallback((message: string, onConfirm: () => void) => {
    setConfirmState({ isOpen: true, message, onConfirm });
  }, []);

  const closeConfirm = useCallback(() => {
    setConfirmState(null);
  }, []);

  // 启动时检查登录状态
  useEffect(() => {
    checkAuth().then(user => {
      setCurrentUser(user);
      setAuthChecked(true);
    });
  }, []);

  // 登录后从 MySQL API 加载历史记录
  useEffect(() => {
    if (currentUser) {
      fetchHistory().then(records => {
        setHistory(records);
      });
    }
  }, [currentUser]);

  const handleLogout = useCallback(() => {
    apiLogout();
    setCurrentUser(null);
    setHistory([]);
    setView('library');
  }, []);

  const handleStartAssessment = useCallback((item: AssessmentItem) => {
    setSelectedItem(item);
    setView('assessment');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setMarkedQuestions({});
  }, []);

  const timerRef = useRef<{ remaining: number; totalSeconds: number }>({ remaining: 0, totalSeconds: 0 });

  const computeTimeTaken = (remaining: number, totalSeconds: number) => {
    const elapsed = totalSeconds - remaining;
    const m = Math.floor(elapsed / 60);
    const s = elapsed % 60;
    return `${m}分${s}秒`;
  };

  const handleFinishAssessment = useCallback(() => {
    const { remaining, totalSeconds } = timerRef.current;
    const timeTaken = computeTimeTaken(remaining, totalSeconds);
    
    const checkIsCorrect = (userAns: string | string[] | undefined, correctAns: string | string[]) => {
      if (!userAns) return false;
      if (Array.isArray(correctAns)) {
        if (!Array.isArray(userAns)) return false;
        if (correctAns.length !== userAns.length) return false;
        const sortedCorrect = [...correctAns].sort();
        const sortedUser = [...userAns].sort();
        return sortedCorrect.every((val, index) => val === sortedUser[index]);
      }
      return userAns === correctAns;
    };

    const correctCount = currentAssessment.questions.reduce((acc, q) => {
      return acc + (checkIsCorrect(answers[q.id], q.correctOptionId) ? 1 : 0);
    }, 0);
    
    const score = Math.round((correctCount / currentAssessment.questions.length) * 100);
    const categoryStats: Record<string, { correct: number; total: number }> = {};
    currentAssessment.questions.forEach(q => {
      const cat = q.category || '未分类';
      if (!categoryStats[cat]) categoryStats[cat] = { correct: 0, total: 0 };
      categoryStats[cat].total += 1;
      if (checkIsCorrect(answers[q.id], q.correctOptionId)) categoryStats[cat].correct += 1;
    });

    const breakdown = Object.entries(categoryStats).map(([category, stats]) => ({
      category,
      score: Math.round((stats.correct / stats.total) * 100)
    }));

    const newResult: UserResult = {
      score,
      correctCount,
      totalCount: currentAssessment.questions.length,
      timeTaken,
      breakdown,
      answers: Object.entries(answers).map(([questionId, selectedOptionId]) => ({
        questionId,
        selectedOptionId: selectedOptionId as string | string[],
      })),
    };
    setResult(newResult);

    // Save to history
    const record: HistoryRecord = {
      id: Date.now().toString(),
      assessmentId: selectedItem?.id || '1',
      title: selectedItem?.title || currentAssessment.title,
      result: newResult,
      date: new Date().toLocaleString('zh-CN'),
    };
    setHistory(prev => [record, ...prev]);
    // 异步保存到 MySQL
    saveHistoryRecord(record);

    setView('results');
  }, [answers, selectedItem, currentAssessment]);

  const handleViewHistoryRecord = useCallback((record: HistoryRecord) => {
    setSelectedHistoryRecord(record);
    setResult(record.result);
    setView('results');
  }, []);

  const handleDeleteRecord = useCallback((id: string) => {
    setHistory(prev => prev.filter(r => r.id !== id));
    // 异步从 MySQL 删除
    deleteHistoryRecord(id);
  }, []);

  const handleGoLibrary = useCallback(() => {
    setView('library');
    setSelectedHistoryRecord(null);
  }, []);

  const timer = useTimer(view === 'assessment', handleFinishAssessment);

  // Sync timer state to ref for use in handleFinishAssessment callback
  useEffect(() => {
    timerRef.current = { remaining: timer.remaining, totalSeconds: timer.totalSeconds };
  }, [timer.remaining, timer.totalSeconds]);

  const sharedProps: SharedAppProps = {
    currentAssessment,
    view,
    setView,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    setAnswers,
    result,
    history,
    selectedHistoryRecord,
    timerDisplay: timer.display,
    timerIsLow: timer.isLow,
    onStartAssessment: handleStartAssessment,
    onFinishAssessment: handleFinishAssessment,
    onViewHistoryRecord: handleViewHistoryRecord,
    onDeleteRecord: handleDeleteRecord,
    onGoLibrary: handleGoLibrary,
    markedQuestions,
    setMarkedQuestions,
    showToast,
    showConfirm,
    currentUser,
    onLogout: handleLogout,
    onOpenProfile: () => setIsProfileModalOpen(true),
  };

  // 加载中状态
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-8 h-8 border-3 border-outline-variant border-t-primary rounded-full"
        />
      </div>
    );
  }

  // 未登录 -> 显示登录页
  if (!currentUser) {
    return <AuthPage onAuthSuccess={(user) => setCurrentUser(user)} />;
  }

  return (
    <>
      {isMobile ? <MobileApp {...sharedProps} /> : <DesktopApp {...sharedProps} />}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-24 md:bottom-10 left-1/2 bg-surface-container-highest text-on-surface px-6 py-3 rounded-full shadow-2xl z-[100] font-bold text-sm tracking-widest pointer-events-none"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmState?.isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeConfirm();
            }}
            className="fixed inset-0 flex items-center justify-center p-4 backdrop-blur-sm cursor-pointer" style={{ zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.4)', touchAction: 'none' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-container-lowest rounded-3xl p-8 max-w-[320px] w-full card-shadow border border-outline-variant/10 text-center relative z-10 cursor-auto"
            >
              <h3 className="font-headline text-lg font-bold text-on-surface mb-8 leading-relaxed pointer-events-none">{confirmState.message}</h3>
              <div className="flex gap-4">
                <button
                  onClick={closeConfirm}
                  className="flex-1 py-3 px-4 rounded-full bg-surface-container-high text-on-surface-variant font-bold text-sm hover:opacity-80 transition-opacity active:scale-95"
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    confirmState.onConfirm();
                    closeConfirm();
                  }}
                  className="flex-1 py-3 px-4 rounded-full signature-gradient text-white font-bold text-sm hover:scale-95 transition-transform shadow-lg shadow-primary/20 active:scale-95"
                >
                  确定
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        onProfileUpdate={(user) => setCurrentUser(user)}
        showToast={showToast}
      />
    </>
  );
}
