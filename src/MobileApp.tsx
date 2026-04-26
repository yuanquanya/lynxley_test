/**
 * Mobile App - 手机端 UI
 */

import { useState, ReactNode, JSXElementConstructor, Key, ReactElement, ReactPortal } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Clock,
  Signal,
  CheckCircle2,
  XCircle,
  BookOpen,
  MoreVertical,
  Bookmark,
  LayoutGrid,
  TrendingUp,
  Download,
  Calendar,
  ChevronRight,
  Trash2,
  Play,
  Video,
  Lock,
} from 'lucide-react';
import { LIBRARY_ITEMS } from './constants';
import { Category, HistoryRecord, UserResult } from './types';
import type { SharedAppProps } from './App';
import type { AuthUser } from './api';

/* ───────────────────────── Root ───────────────────────── */

export default function MobileApp(props: SharedAppProps) {
  const {
    currentAssessment,
    view, setView,
    currentQuestionIndex, setCurrentQuestionIndex,
    answers, setAnswers,
    result, history, selectedHistoryRecord,
    timerDisplay, timerIsLow,
    onStartAssessment, onFinishAssessment,
    onViewHistoryRecord, onDeleteRecord, onGoLibrary,
    markedQuestions, setMarkedQuestions, showToast, showConfirm,
    currentUser, onLogout, onOpenProfile,
  } = props;

  return (
    <div className="min-h-screen bg-surface selection:bg-primary-fixed selection:text-primary max-w-screen-md mx-auto relative">
      <AnimatePresence mode="wait">
        {view === 'library' && (
          <LibraryView key="library" onStart={onStartAssessment} onGoReports={() => setView('reports')} onGoLearning={() => setView('learning')} showToast={showToast} currentUser={currentUser} onLogout={onLogout} onOpenProfile={onOpenProfile} />
        )}
        {view === 'assessment' && (
          <AssessmentView
            key="assessment"
            currentAssessment={currentAssessment}
            onFinish={onFinishAssessment}
            onGoLibrary={onGoLibrary}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            answers={answers}
            setAnswers={setAnswers}
            timerDisplay={timerDisplay}
            timerIsLow={timerIsLow}
            markedQuestions={markedQuestions}
            setMarkedQuestions={setMarkedQuestions}
            showToast={showToast}
            showConfirm={showConfirm}
          />
        )}
        {view === 'results' && (
          <ResultsView
            key="results"
            result={result!}
            currentAssessment={currentAssessment}
            onBack={onGoLibrary}
            onGoReports={() => setView('reports')}
            onGoLearning={() => setView('learning')}
            isFromHistory={!!selectedHistoryRecord}
            showToast={showToast}
            currentUser={currentUser}
            onLogout={onLogout}
            onOpenProfile={onOpenProfile}
          />
        )}
        {view === 'reports' && (
          <ReportsView
            key="reports"
            history={history}
            onBack={onGoLibrary}
            onViewRecord={onViewHistoryRecord}
            onDelete={onDeleteRecord}
            showConfirm={showConfirm}
            onGoLearning={() => setView('learning')}
            showToast={showToast}
            currentUser={currentUser}
            onLogout={onLogout}
            onOpenProfile={onOpenProfile}
          />
        )}
        {view === 'learning' && (
          <LearningView
            key="learning"
            onGoLibrary={onGoLibrary}
            onGoReports={() => setView('reports')}
            showToast={showToast}
            currentUser={currentUser}
            onLogout={onLogout}
            onOpenProfile={onOpenProfile}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────── Bottom Tab Bar ───────────────────────── */

function BottomTabBar({ active, onTabChange }: { active: 'library' | 'learning' | 'reports'; onTabChange?: (tab: 'library' | 'learning' | 'reports') => void }) {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md rounded-t-3xl" style={{ boxShadow: '0 -10px 30px rgba(13,28,46,0.04)' }}>
      <div className="flex justify-around items-center px-4 pt-3 pb-8 safe-bottom max-w-screen-md mx-auto">
        <button
          onClick={() => onTabChange?.('library')}
          className={`flex flex-col items-center justify-center rounded-2xl px-5 py-2 transition-all active:scale-95 ${active === 'library'
            ? 'bg-blue-100 text-blue-800'
            : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
        >
          <BookOpen size={22} />
          <span className="text-[11px] font-medium tracking-wide uppercase mt-1">题库</span>
        </button>
        <button
          onClick={() => onTabChange?.('learning')}
          className={`flex flex-col items-center justify-center rounded-2xl px-5 py-2 transition-all active:scale-95 ${active === 'learning'
            ? 'bg-blue-100 text-blue-800'
            : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
        >
          <Video size={22} />
          <span className="text-[11px] font-medium tracking-wide uppercase mt-1">学习</span>
        </button>
        <button
          onClick={() => onTabChange?.('reports')}
          className={`flex flex-col items-center justify-center rounded-2xl px-5 py-2 transition-all active:scale-95 ${active === 'reports'
            ? 'bg-blue-100 text-blue-800'
            : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
        >
          <TrendingUp size={22} />
          <span className="text-[11px] font-medium tracking-wide uppercase mt-1">报告</span>
        </button>
      </div>
    </nav>
  );
}

/* ───────────────────────── Top App Bar ───────────────────────── */

function TopAppBar({
  title,
  onBack,
  rightAction,
  children
}: {
  title: string;
  onBack?: () => void;
  rightAction?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl max-w-screen-md">
      <div className="flex items-center px-4 h-14 w-full">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-surface-container-high/50 transition-colors active:scale-95"
          >
            <ArrowLeft size={22} className="text-primary" />
          </button>
        )}
        <h1 className="font-headline text-lg font-bold tracking-tight text-primary ml-1">{title}</h1>
        <div className="flex-grow" />
        {rightAction}
      </div>
      {children}
    </header>
  );
}

/* ───────────────────────── Mobile Right Action ───────────────────────── */

function MobileRightAction({ currentUser, onLogout, showToast, onOpenProfile }: { currentUser?: AuthUser | null; onLogout?: () => void; showToast: (msg: string) => void; onOpenProfile?: () => void }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="flex items-center gap-1">
      <button onClick={() => showToast('你知道吗，点击 搜索 这个按钮可以浪费你整整1秒钟。。')} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-high/50 transition-colors">
        <Search size={20} className="text-on-surface-variant" />
      </button>
      {currentUser && (
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-9 h-9 rounded-full signature-gradient flex items-center justify-center overflow-hidden border border-outline-variant/20"
          >
            {currentUser.avatar ? (
              <img src={currentUser.avatar} alt="Avatar" className="w-full h-full object-cover bg-white" />
            ) : (
              <span className="text-white text-xs font-black">{currentUser.displayName.charAt(0).toUpperCase()}</span>
            )}
          </button>
          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
              <div className="absolute right-0 top-full mt-2 w-44 bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/10 py-2 z-50">
                <div className="px-4 py-3 border-b border-outline-variant/10">
                  <p className="text-xs font-bold text-on-surface truncate">{currentUser.displayName}</p>
                  <p className="text-[10px] text-on-surface-variant truncate">@{currentUser.username}</p>
                </div>
                <button
                  onClick={() => { setShowUserMenu(false); onOpenProfile?.(); }}
                  className="w-full px-4 py-3 text-left text-sm font-bold text-on-surface hover:bg-surface-container-highest transition-colors"
                >
                  编辑资料
                </button>
                <button
                  onClick={() => { setShowUserMenu(false); onLogout?.(); }}
                  className="w-full px-4 py-3 text-left text-sm font-bold text-error hover:bg-error/5 transition-colors"
                >
                  退出登录
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── Library View ───────────────────────── */

function LibraryView({ onStart, onGoReports, onGoLearning, showToast, currentUser, onLogout, onOpenProfile }: { onStart: (item: any) => void; onGoReports: () => void; onGoLearning: () => void; showToast: (msg: string) => void; currentUser?: AuthUser | null; onLogout?: () => void; onOpenProfile?: () => void }) {
  const [activeCategory, setActiveCategory] = useState<string>('全部');
  const categories = ['全部', '网络类', '编码类', '决策类', '安全类', '人工智能类'];
  const filteredItems = activeCategory === '全部' ? LIBRARY_ITEMS : LIBRARY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col min-h-screen">
      <TopAppBar
        title="Lynxley_test"
        rightAction={<MobileRightAction currentUser={currentUser} onLogout={onLogout} showToast={showToast} onOpenProfile={onOpenProfile} />}
      />

      <main className="pt-16 pb-28 px-5">
        <div className="mb-6">
          <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-on-surface-variant/60">知识题库</span>
          <h2 className="font-headline text-4xl font-extrabold text-on-surface mt-2 tracking-tight">题库中心</h2>
        </div>

        <div className="flex overflow-x-auto gap-2 mb-6 pb-2 -mx-5 px-5" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`
            .flex.overflow-x-auto::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`whitespace-nowrap px-5 py-2 rounded-full font-bold text-xs tracking-wide transition-all active:scale-95 shrink-0 ${
                activeCategory === c
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-surface-container-lowest border border-outline-variant/10 text-on-surface-variant'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="bg-surface-container-lowest rounded-3xl p-6 card-shadow border border-outline-variant/10 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="px-3 py-1 bg-surface-container-low text-primary text-[10px] font-bold uppercase tracking-widest rounded-lg">
                  {item.category}
                </span>
                <span className="text-on-surface-variant/50 text-xs font-medium">{item.duration}</span>
              </div>
              <h3 className="font-headline text-xl font-bold text-on-surface leading-snug mb-5">
                {item.title}
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-on-surface-variant/50 text-xs font-medium gap-1">
                  <Signal size={14} />
                  <span>{item.difficulty}</span>
                </div>
                <button
                  onClick={() => onStart(item)}
                  className="signature-gradient text-white px-7 py-2.5 rounded-full font-bold text-sm transition-transform active:scale-95 shadow-md shadow-primary/20"
                >
                  {item.status === 'Review' ? '查看' : '开始'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center pt-8 pb-4">
          <p className="text-on-surface-variant/40 text-sm italic">已到达题库底部</p>
        </div>
      </main>

      <BottomTabBar active="library" onTabChange={(tab) => { if (tab === 'reports') onGoReports(); if (tab === 'learning') onGoLearning(); }} />
    </motion.div>
  );
}

/* ───────────────────────── Assessment View ───────────────────────── */

function AssessmentView({
  onFinish,
  onGoLibrary,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  answers,
  setAnswers,
  timerDisplay,
  timerIsLow,
  markedQuestions,
  setMarkedQuestions,
  currentAssessment,
  showToast,
  showConfirm,
}: {
  onFinish: () => void;
  onGoLibrary: () => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (idx: number) => void;
  answers: Record<string, string>;
  setAnswers: (ans: Record<string, string>) => void;
  timerDisplay: string;
  timerIsLow: boolean;
  markedQuestions: Record<string, boolean>;
  setMarkedQuestions: (mq: Record<string, boolean>) => void;
  showToast: (msg: string) => void;
  showConfirm: (msg: string, cb: () => void) => void;
  currentAssessment: any;
}) {
  const [activeTab, setActiveTab] = useState<'reading' | 'questions'>('reading');
  const [showQuestionMap, setShowQuestionMap] = useState(false);
  const question = currentAssessment.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentAssessment.questions.length) * 100;

  const handleToggleMark = () => {
    setMarkedQuestions({
      ...markedQuestions,
      [question.id]: !markedQuestions[question.id]
    });
  };

  const handleBack = () => {
    showConfirm('确认退出测验吗？目前的进度将会丢失。', () => onGoLibrary());
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl max-w-screen-md">
        <div className="flex items-center px-4 h-14 w-full">
          <button onClick={handleBack} className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-surface-container-high/50 transition-colors active:scale-95">
            <ArrowLeft size={22} className="text-primary" />
          </button>
          <span className="font-headline text-lg font-bold tracking-tight text-primary ml-1">答题</span>
          <div className="flex-grow" />
          <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 mr-2 ${timerIsLow ? 'bg-error/10' : 'bg-surface-container-high'}`}>
            <Clock size={14} className={timerIsLow ? 'text-error' : 'text-primary'} />
            <span className={`text-sm font-bold tabular-nums ${timerIsLow ? 'text-error animate-pulse' : 'text-on-surface'}`}>{timerDisplay}</span>
          </div>
          <button onClick={() => showToast('你知道吗，点击 菜单 这个按钮可以浪费你整整1秒钟。。')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high/50">
            <MoreVertical size={20} className="text-on-surface-variant" />
          </button>
        </div>
        <div className="px-5 pb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">
              第 {currentQuestionIndex + 1} 题 / 共 {currentAssessment.questions.length} 题
            </span>
            <span className="text-[10px] font-bold text-primary">{Math.round(progress)}% 完成</span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full signature-gradient rounded-full" />
          </div>
        </div>
        <div className="flex px-5 gap-2 pb-3">
          <button
            onClick={() => setActiveTab('reading')}
            className={`flex-1 py-2.5 rounded-2xl text-sm font-bold transition-all ${activeTab === 'reading' ? 'bg-primary-fixed text-primary' : 'bg-surface-container-high/50 text-on-surface-variant'
              }`}
          >
            阅读材料
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`flex-1 py-2.5 rounded-2xl text-sm font-bold transition-all ${activeTab === 'questions' ? 'bg-primary-fixed text-primary' : 'bg-surface-container-high/50 text-on-surface-variant'
              }`}
          >
            题目
          </button>
        </div>
      </header>

      <main className={`pt-44 flex-1 flex flex-col ${activeTab === 'reading' && currentAssessment.readingMaterial.iframeUrl ? 'px-0 pb-0 overflow-hidden relative' : 'px-5 pb-32 overflow-y-auto'}`}>
        <AnimatePresence mode="wait">
          {activeTab === 'reading' ? (
            <motion.div key="reading" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className={`flex-1 flex flex-col ${currentAssessment.readingMaterial.iframeUrl ? 'overflow-hidden' : ''}`}>
              {currentAssessment.readingMaterial.iframeUrl ? (
                <iframe src={currentAssessment.readingMaterial.iframeUrl} className="w-full h-full pb-20 flex-1 border-none bg-white" title="Reading Material" />
              ) : (
                <div className="pb-8">
                  <h2 className="font-headline text-3xl font-extrabold text-on-surface leading-tight tracking-tight mb-8">
                    {currentAssessment.readingMaterial.title}
                  </h2>
                  <figure className="mb-8 rounded-3xl overflow-hidden card-shadow">
                    <img src={currentAssessment.readingMaterial.image} alt="配图" className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
                    <figcaption className="p-3 bg-surface-container-low text-[11px] text-on-surface-variant font-medium">
                      {currentAssessment.readingMaterial.imageCaption}
                    </figcaption>
                  </figure>
                  <article className="space-y-6 text-on-surface leading-relaxed text-base font-normal">
                    {currentAssessment.readingMaterial.content?.map((p: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, i: Key | null | undefined) => {
                      return <p key={i}>{p}</p>;
                    })}
                    {currentAssessment.readingMaterial.quote && (
                      <div className="p-6 bg-surface-container-low rounded-3xl italic text-on-surface border-l-4 border-primary">
                        "{currentAssessment.readingMaterial.quote}"
                        <div className="mt-3 not-italic font-bold text-xs text-primary uppercase tracking-widest">
                          — {currentAssessment.readingMaterial.quoteAuthor}
                        </div>
                      </div>
                    )}
                  </article>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="questions" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className="font-headline text-2xl font-bold leading-tight text-on-surface tracking-tight mb-8">
                {question.text}
              </h3>
              <div className="space-y-3">
                {question.options.map(function (option: any) {
                  const isMulti = question.category === '多选题';
                  const isSelected = Array.isArray(answers[question.id])
                    ? (answers[question.id] as string[]).includes(option.id)
                    : answers[question.id] === option.id;
                  
                  const handleOptionClick = () => {
                    if (isMulti) {
                      const current = Array.isArray(answers[question.id]) ? (answers[question.id] as string[]) : [];
                      if (current.includes(option.id)) {
                        setAnswers({ ...answers, [question.id]: current.filter(id => id !== option.id) });
                      } else {
                        setAnswers({ ...answers, [question.id]: [...current, option.id] });
                      }
                    } else {
                      setAnswers({ ...answers, [question.id]: option.id });
                    }
                  };

                  return (
                    <button
                      key={option.id}
                      onClick={handleOptionClick}
                      className={`w-full p-5 rounded-2xl transition-all text-left flex items-center gap-4 active:scale-[0.98] ${isSelected
                        ? 'bg-primary-fixed border-2 border-primary shadow-sm'
                        : 'bg-surface-container-low border-2 border-transparent'}`}
                    >
                      <span className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-base shrink-0 ${isSelected ? 'bg-primary text-white' : 'bg-surface-container-high text-primary'}`}>{option.label}</span>
                      <span className={`text-base font-medium ${isSelected ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                        {option.text}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center justify-between pt-8">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                  className="px-5 py-3 text-primary font-bold text-sm flex items-center gap-2 rounded-2xl hover:bg-surface-container-high/50 transition-all disabled:opacity-30"
                >
                  <ArrowLeft size={16} /> 上一题
                </button>
                {currentQuestionIndex === currentAssessment.questions.length - 1 ? (
                  <button onClick={onFinish} className="signature-gradient text-white px-8 py-3 rounded-full font-bold text-sm flex items-center gap-2 active:scale-95 shadow-lg shadow-primary/20">
                    结束考试 <CheckCircle2 size={16} />
                  </button>
                ) : (
                  <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)} className="signature-gradient text-white px-8 py-3 rounded-full font-bold text-sm flex items-center gap-2 active:scale-95 shadow-lg shadow-primary/20">
                    下一题 <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Floating Controls */}
      <div className="fixed bottom-0 left-0 w-full z-40 max-w-screen-md mx-auto">
        <AnimatePresence>
          {showQuestionMap && (
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
              className="mx-5 mb-3 bg-white rounded-3xl p-5 shadow-2xl border border-outline-variant/10">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-sm text-on-surface">题目导航</h4>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase">共 {currentAssessment.questions.length} 题</span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {currentAssessment.questions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => { setCurrentQuestionIndex(idx); setActiveTab('questions'); setShowQuestionMap(false); }}
                    className={`w-10 h-10 flex flex-col items-center justify-center rounded-xl font-bold text-xs transition-all relative overflow-hidden ${idx === currentQuestionIndex
                      ? 'bg-primary text-white ring-3 ring-primary-fixed shadow-md'
                      : markedQuestions[q.id] ? 'bg-secondary-container/20 text-secondary border border-secondary'
                        : answers[q.id] ? 'bg-surface-container-high text-on-surface-variant'
                          : 'bg-surface-container-low text-on-surface-variant'
                      }`}
                  >
                    <span>{idx + 1}</span>
                    {markedQuestions[q.id] && idx !== currentQuestionIndex && <div className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-bl-sm"></div>}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex items-center justify-between px-5 pt-3 pb-8 safe-bottom bg-white/95 backdrop-blur-md rounded-t-3xl" style={{ boxShadow: '0 -10px 30px rgba(13,28,46,0.04)' }}>
          <button onClick={() => setShowQuestionMap(!showQuestionMap)} className="flex items-center gap-2 bg-surface-container-high text-primary px-4 py-2.5 rounded-2xl font-bold text-sm active:scale-95">
            <LayoutGrid size={16} /> 题目导航
          </button>
          <div className="flex items-center gap-3">
            <button onClick={handleToggleMark} className={`w-10 h-10 flex items-center justify-center rounded-full active:scale-95 transition-colors ${markedQuestions[question.id] ? 'bg-secondary-container text-secondary' : 'bg-surface-container-low text-on-surface-variant'}`}>
              <Bookmark size={18} className={markedQuestions[question.id] ? 'fill-secondary' : ''} />
            </button>
            <button
              onClick={() => {
                if (currentQuestionIndex < currentAssessment.questions.length - 1) {
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                  setActiveTab('questions');
                } else {
                  onFinish();
                }
              }}
              className="w-14 h-14 flex items-center justify-center rounded-full signature-gradient text-white shadow-lg shadow-primary/30 active:scale-95"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ───────────────────────── Results View ───────────────────────── */

function ResultsView({ result, currentAssessment, onBack, onGoReports, onGoLearning, isFromHistory, showToast, currentUser, onLogout, onOpenProfile }: { result: UserResult; currentAssessment: any; onBack: () => void; onGoReports: () => void; onGoLearning?: () => void; isFromHistory: boolean; showToast: (msg: string) => void; currentUser?: AuthUser | null; onLogout?: () => void; onOpenProfile?: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col min-h-screen">
      <TopAppBar title="测验结果" onBack={isFromHistory ? onGoReports : undefined} rightAction={<MobileRightAction currentUser={currentUser} onLogout={onLogout} showToast={showToast} onOpenProfile={onOpenProfile} />} />

      <main className="pt-16 pb-28 px-5">
        <div className="text-center py-8">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/60">最终得分</span>
          <div className="flex items-baseline justify-center gap-1 mt-2">
            <motion.span initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }}
              className="font-headline text-8xl font-extrabold text-primary">{result.score}</motion.span>
            <span className="font-headline text-3xl text-on-surface-variant/40 font-bold">/100</span>
          </div>
        </div>

        <div className="flex gap-3 mb-8">
          <div className="flex-1 bg-surface-container-lowest rounded-2xl p-4 flex items-center gap-3 card-shadow">
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center">
              <Clock size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60">用时</p>
              <p className="font-headline text-lg font-bold text-on-surface">{result.timeTaken}</p>
            </div>
          </div>
          <div className="flex-1 bg-surface-container-lowest rounded-2xl p-4 flex items-center gap-3 card-shadow">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
              <CheckCircle2 size={18} className="text-secondary" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60">正确率</p>
              <p className="font-headline text-lg font-bold text-on-surface">{result.score}%</p>
            </div>
          </div>
        </div>

        <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden mb-10">
          <motion.div initial={{ width: 0 }} animate={{ width: `${result.score}%` }} transition={{ duration: 1 }} className="h-full signature-gradient rounded-full" />
        </div>

        <div className="mb-10 bg-surface-container-lowest rounded-3xl p-6 card-shadow border border-outline-variant/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline text-lg font-bold text-on-surface tracking-tight">成绩分项</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">知识点掌握度</span>
          </div>
          <div className="space-y-6">
            {result.breakdown.map((b) => (
              <div key={b.category}>
                <div className="flex justify-between text-xs mb-2 font-bold">
                  <span className="text-on-surface-variant">{b.category}</span>
                  <span className={b.score < 80 ? 'text-error' : 'text-on-surface'}>{b.score}%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${b.score}%` }} transition={{ duration: 1, delay: 0.3 }}
                    className={`h-full rounded-full ${b.score < 80 ? 'bg-error' : 'signature-gradient'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h3 className="font-headline text-2xl font-extrabold text-on-surface tracking-tight">详细解析</h3>
          <span className="bg-surface-container-high px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
            {result.totalCount} 道题
          </span>
        </div>

        <div className="space-y-6">
          {currentAssessment.questions.map((q, idx) => {
            const userAnswer = result.answers.find(a => a.questionId === q.id)?.selectedOptionId;
            
            const checkIsCorrect = (uAns: any, cAns: any) => {
              if (!uAns) return false;
              if (Array.isArray(cAns)) {
                if (!Array.isArray(uAns)) return false;
                if (cAns.length !== uAns.length) return false;
                const sortedC = [...cAns].sort();
                const sortedU = [...uAns].sort();
                return sortedC.every((v, i) => v === sortedU[i]);
              }
              return uAns === cAns;
            };
            
            const isCorrect = checkIsCorrect(userAnswer, q.correctOptionId);
            const isOptionUserSelected = (optId: string) => Array.isArray(userAnswer) ? userAnswer.includes(optId) : userAnswer === optId;
            const isOptionActualCorrect = (optId: string) => Array.isArray(q.correctOptionId) ? q.correctOptionId.includes(optId) : q.correctOptionId === optId;

            return (
              <motion.div key={q.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-surface-container-lowest rounded-3xl p-6 card-shadow">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-on-surface-variant">第 {idx + 1 < 10 ? `0${idx + 1}` : idx + 1} 题</span>
                  <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${isCorrect ? 'text-secondary' : 'text-error'}`}>
                    {isCorrect ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                    {isCorrect ? '正确' : '错误'}
                  </span>
                </div>
                <h4 className="font-headline text-lg font-bold text-on-surface leading-snug mb-5">{q.text}</h4>
                <div className="space-y-2.5 mb-5">
                  {q.options.filter(opt => isOptionUserSelected(opt.id) || isOptionActualCorrect(opt.id)).map(opt => {
                    const isActualCorrect = isOptionActualCorrect(opt.id);
                    return (
                      <div key={opt.id} className={`p-4 rounded-2xl flex items-center justify-between ${isActualCorrect ? 'bg-secondary/5 border-2 border-secondary' : 'bg-error/5 border-2 border-error'}`}>
                        <span className="font-bold text-on-surface text-sm">{opt.text}</span>
                        {isActualCorrect ? <CheckCircle2 size={18} className="text-secondary shrink-0" /> : <XCircle size={18} className="text-error shrink-0" />}
                      </div>
                    );
                  })}
                </div>
                <div className={`p-5 rounded-2xl border-l-4 ${isCorrect ? 'bg-surface-container-low border-secondary' : 'bg-error-container/20 border-error'}`}>
                  <h5 className="font-bold mb-2 flex items-center gap-2 text-on-surface uppercase tracking-widest text-[10px]">
                    <BookOpen size={14} className={isCorrect ? 'text-secondary' : 'text-error'} /> 详细解析
                  </h5>
                  <p className="text-on-surface-variant leading-relaxed text-sm">{q.rationale}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 space-y-3">
          <button onClick={onBack} className="w-full signature-gradient text-white py-4 rounded-full font-bold text-base active:scale-[0.98] shadow-lg shadow-primary/20 transition-transform">
            完成复查
          </button>
          <button onClick={() => showToast('你知道吗，点击 下载详细报告 这个按钮可以浪费你整整1秒钟。。')} className="w-full text-primary text-sm font-bold py-3 flex items-center justify-center gap-2">
            <Download size={16} /> 下载详细报告
          </button>
        </div>
      </main>

      <BottomTabBar active="reports" onTabChange={(tab) => { if (tab === 'library') onBack(); if (tab === 'learning') onGoLearning?.(); }} />
    </motion.div>
  );
}

/* ───────────────────────── Reports View ───────────────────────── */

function ReportsView({ history, onBack, onViewRecord, onDelete, showConfirm, showToast, onGoLearning, currentUser, onLogout, onOpenProfile }: { history: HistoryRecord[]; onBack: () => void; onViewRecord: (r: HistoryRecord) => void; onDelete: (id: string) => void; showConfirm: (msg: string, cb: () => void) => void; showToast: (msg: string) => void; onGoLearning?: () => void; currentUser?: AuthUser | null; onLogout?: () => void; onOpenProfile?: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col min-h-screen">
      <TopAppBar title="Lynxley_test" rightAction={<MobileRightAction currentUser={currentUser} onLogout={onLogout} showToast={showToast} onOpenProfile={onOpenProfile} />} />

      <main className="pt-16 pb-28 px-5">
        <div className="mb-8">
          <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-on-surface-variant/60">历史记录</span>
          <h2 className="font-headline text-4xl font-extrabold text-on-surface mt-2 tracking-tight">答题报告</h2>
        </div>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-6">
              <TrendingUp size={32} className="text-on-surface-variant/40" />
            </div>
            <h3 className="font-headline text-xl font-bold text-on-surface mb-2">暂无记录</h3>
            <p className="text-on-surface-variant text-sm text-center max-w-xs">完成一次测验后，您的答题记录将会出现在这里。</p>
            <button onClick={onBack} className="mt-8 signature-gradient text-white px-8 py-3 rounded-full font-bold text-sm active:scale-95 shadow-md shadow-primary/20">
              前往题库
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((record, idx) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: idx * 0.06 }}
                className="bg-surface-container-lowest rounded-3xl p-5 card-shadow border border-outline-variant/10 flex items-center gap-3"
              >
                <button
                  onClick={() => onViewRecord(record)}
                  className="flex-1 text-left active:scale-[0.98] transition-transform"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-headline text-lg font-bold text-on-surface leading-snug pr-4">{record.title}</h3>
                    <ChevronRight size={20} className="text-on-surface-variant/40 shrink-0 mt-0.5" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white ${record.result.score >= 80 ? 'bg-secondary' : record.result.score >= 60 ? 'bg-primary' : 'bg-error'}`}>
                        {record.result.score}
                      </div>
                      <span className="text-on-surface-variant text-xs font-medium">分</span>
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant/60 text-xs">
                      <Clock size={12} />
                      <span>{record.result.timeTaken}</span>
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant/60 text-xs">
                      <Calendar size={12} />
                      <span>{record.date}</span>
                    </div>
                  </div>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showConfirm('确定要删除此条记录吗？', () => onDelete(record.id));
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl text-on-surface-variant/40 hover:text-error hover:bg-error/10 transition-all active:scale-90 shrink-0"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <BottomTabBar active="reports" onTabChange={(tab) => { if (tab === 'library') onBack(); if (tab === 'learning') onGoLearning?.(); }} />
    </motion.div>
  );
}

/* ───────────────────────── Learning View ───────────────────────── */

const VIDEO_PLACEHOLDERS = [
  { id: 1, title: '第一套操作题演示', subtitle: '课程 01', duration: '11:20', cover: '/covers/cover1.jpg', url: '/videos/第一套操作题.mp4' },
  { id: 2, title: '第二套操作题演示', subtitle: '课程 02', duration: '12:25', cover: '/covers/cover2.jpg', url: '/videos/第二套操作题.mp4' },
  { id: 3, title: '第三套操作题演示', subtitle: '课程 03', duration: '10:38', cover: '/covers/cover3.jpg', url: '/videos/第三套操作题.mp4' },
  { id: 4, title: '第四套操作题演示', subtitle: '课程 04', duration: '12:11', cover: '/covers/cover4.jpg', url: '/videos/第四套操作题.mp4' },
  { id: 5, title: '第五套操作题演示', subtitle: '课程 05', duration: '8:46', cover: '/covers/cover5.jpg', url: '/videos/第五套操作题2.mp4' },
  { id: 6, title: '第六套操作题演示', subtitle: '课程 06', duration: '8:31', cover: '/covers/cover6.jpg', url: '/videos/第六套操作题.mp4' },
  { id: 7, title: '第七套操作题演示', subtitle: '课程 07', duration: '5:30', cover: '/covers/cover7.jpg', url: '/videos/第七套操作题.mp4' },
  { id: 8, title: '第八套操作题演示', subtitle: '课程 08', duration: '6:22', cover: '/covers/cover8.jpg', url: '/videos/第八套操作题.mp4' },
];

function LearningView({ onGoLibrary, onGoReports, showToast, currentUser, onLogout, onOpenProfile }: { onGoLibrary: () => void; onGoReports: () => void; showToast: (msg: string) => void; currentUser?: AuthUser | null; onLogout?: () => void; onOpenProfile?: () => void }) {
  const [activeVideo, setActiveVideo] = useState<any>(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col min-h-screen">
      <TopAppBar title="Lynxley_test" rightAction={<MobileRightAction currentUser={currentUser} onLogout={onLogout} showToast={showToast} onOpenProfile={onOpenProfile} />} />

      {activeVideo ? (
        <main className="pt-14 pb-28">
          <div className="w-full aspect-video bg-black">
            <video 
              key={activeVideo.id}
              src={activeVideo.url} 
              controls 
              autoPlay
              playsInline
              className="w-full h-full"
              preload="auto"
            />
          </div>
          <div className="px-5 pt-4 pb-3 border-b border-outline-variant/10">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black tracking-widest text-primary uppercase">{activeVideo.subtitle}</span>
              <span className="text-on-surface-variant/30">•</span>
              <span className="text-[10px] font-medium text-on-surface-variant">{activeVideo.duration}</span>
            </div>
            <h2 className="text-lg font-bold text-on-surface font-headline leading-tight">{activeVideo.title}</h2>
          </div>
          <div className="px-5 pt-4">
            <button onClick={() => setActiveVideo(null)} className="flex items-center gap-2 text-sm font-bold text-on-surface-variant active:text-primary transition-colors mb-5">
              <ArrowLeft size={16} /> 返回列表
            </button>
            <h3 className="font-headline font-bold text-on-surface mb-4 flex items-center gap-2">
              <Video size={16} className="text-primary" /> 相关推荐
            </h3>
            <div className="space-y-3 pb-10">
              {VIDEO_PLACEHOLDERS.map((v) => (
                <button key={v.id} onClick={() => { setActiveVideo(v); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`w-full flex gap-3 text-left active:scale-[0.98] transition-all p-2 rounded-2xl ${activeVideo.id === v.id ? 'bg-primary/5 ring-1 ring-primary/20' : ''}`}>
                  <div className="relative w-28 aspect-video shrink-0 rounded-xl overflow-hidden bg-surface-container-high">
                    <img src={v.cover} alt="" className="w-full h-full object-cover" />
                    <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-sm text-[9px] font-bold text-white px-1.5 py-0.5 rounded">{v.duration}</div>
                    {activeVideo.id === v.id && (
                      <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
                        <div className="flex gap-0.5">
                          {[0.4, 0.7, 0.5, 0.9].map((h, i) => (
                            <motion.div key={i} animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: h + 0.5, delay: i * 0.1 }} className="w-0.5 bg-white rounded-full" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 py-0.5 min-w-0">
                    <h4 className={`text-sm font-bold leading-snug line-clamp-2 ${activeVideo.id === v.id ? 'text-primary' : 'text-on-surface'}`}>{v.title}</h4>
                    <p className="text-[10px] text-on-surface-variant mt-1.5 font-medium">{v.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </main>
      ) : (
        <main className="pt-16 pb-28 px-5">
          <div className="mb-8">
            <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-on-surface-variant/60">视频课程</span>
            <h2 className="font-headline text-4xl font-extrabold text-on-surface mt-2 tracking-tight">操作题视频</h2>

          </div>
          <div className="space-y-6">
            {VIDEO_PLACEHOLDERS.map((video, idx) => (
              <motion.div key={video.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}
                className="active:scale-[0.98] transition-transform duration-200" onClick={() => setActiveVideo(video)}>
                <div className="relative aspect-video rounded-2xl overflow-hidden card-shadow border border-outline-variant/10">
                  <img src={video.cover} alt={video.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute top-3 right-3">
                    <div className="w-8 h-8 bg-black/40 backdrop-blur-md rounded-lg flex items-center justify-center text-white border border-white/10"><Clock size={14} /></div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-end p-3">
                    <div className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10"><span className="text-[10px] font-bold text-white">{video.duration}</span></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary/90 text-white rounded-full flex items-center justify-center shadow-lg"><Play size={20} fill="currentColor" className="ml-0.5" /></div>
                  </div>
                </div>
                <div className="mt-3 px-1">
                  <div className="flex items-center gap-2 mb-1"><span className="text-[9px] font-black tracking-widest uppercase text-primary">{video.subtitle}</span></div>
                  <h3 className="font-headline text-base font-bold text-on-surface leading-snug line-clamp-2">{video.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

        </main>
      )}

      <BottomTabBar active="learning" onTabChange={(tab) => { if (tab === 'library') onGoLibrary(); if (tab === 'reports') onGoReports(); }} />
    </motion.div>
  );
}

function showConfirm(arg0: string, arg1: () => void) {
  throw new Error('Function not implemented.');
}
