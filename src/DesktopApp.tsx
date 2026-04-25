/**
 * Desktop App - 桌面端 UI
 */

import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Library,
  BarChart3,
  Search,
  Bell,
  Settings,
  User,
  Clock,
  Signal,
  ArrowRight,
  ArrowLeft,
  Flag,
  CheckCircle2,
  XCircle,
  Share2,
  Award,
  ChevronDown,
  TrendingUp,
  BookOpen,
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

export default function DesktopApp(props: SharedAppProps) {
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
    currentUser, onLogout,
  } = props;

  return (
    <div className="min-h-screen bg-surface selection:bg-primary-fixed selection:text-primary">
      <AnimatePresence mode="wait">
        {view === 'library' && (
          <LibraryView key="library" onStart={onStartAssessment} onGoReports={() => setView('reports')} onGoLearning={() => setView('learning')} showToast={showToast} currentUser={currentUser} onLogout={onLogout} />
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
            isFromHistory={!!selectedHistoryRecord}
            showToast={showToast}
            currentUser={currentUser}
            onLogout={onLogout}
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
            showToast={showToast}
            onGoLearning={() => setView('learning')}
            currentUser={currentUser}
            onLogout={onLogout}
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
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────── Header ───────────────── */

function AppHeader({ activeNav, onGoLibrary, onGoReports, onGoLearning, showToast, currentUser, onLogout }: { activeNav: string; onGoLibrary?: () => void; onGoReports?: () => void; onGoLearning?: () => void; showToast?: (msg: string) => void; currentUser?: AuthUser | null; onLogout?: () => void }) {
  return (
    <header className="glass-header border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-2xl font-extrabold font-headline text-on-surface tracking-tight">
          Lynxley_test
        </div>
        <nav className="hidden md:flex items-center space-x-10">
          <NavLink icon={<Library size={18} />} label="题库" active={activeNav === 'library'} onClick={onGoLibrary} />
          <NavLink icon={<Video size={18} />} label="学习" active={activeNav === 'learning'} onClick={onGoLearning} />
          <NavLink icon={<BarChart3 size={18} />} label="报告" active={activeNav === 'reports'} onClick={onGoReports} />
        </nav>
        <div className="flex items-center space-x-4">
          <IconButton icon={<Search size={20} />} onClick={() => showToast?.('你知道吗，点击 搜索 这个按钮可以浪费你整整1秒钟。。')} />
          <IconButton icon={<Bell size={20} />} onClick={() => showToast?.('你知道吗，点击 通知 这个按钮可以浪费你整整1秒钟。。')} />
          {currentUser ? (
            <div className="relative group">
              <button className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-container-highest border border-outline-variant/20 hover:bg-surface-variant transition-colors">
                <div className="w-7 h-7 rounded-full signature-gradient flex items-center justify-center">
                  <span className="text-white text-xs font-black">{currentUser.displayName.charAt(0).toUpperCase()}</span>
                </div>
                <span className="text-sm font-bold text-on-surface hidden lg:block max-w-[100px] truncate">{currentUser.displayName}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/10 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="px-4 py-3 border-b border-outline-variant/10">
                  <p className="text-xs font-bold text-on-surface truncate">{currentUser.displayName}</p>
                  <p className="text-[10px] text-on-surface-variant truncate">@{currentUser.username}</p>
                </div>
                <button onClick={onLogout} className="w-full px-4 py-3 text-left text-sm font-bold text-error hover:bg-error/5 transition-colors flex items-center gap-3">
                  <Settings size={14} />
                  退出登录
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => showToast?.('你知道吗，点击 用户配置 这个按钮可以浪费你整整1秒钟。。')} className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center border border-outline-variant/20 hover:bg-surface-variant transition-colors">
              <User size={20} className="text-on-surface-variant" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

/* ───────────────── Library View ───────────────── */

function LibraryView({ onStart, onGoReports, onGoLearning, showToast, currentUser, onLogout }: { onStart: (item: any) => void; onGoReports: () => void; onGoLearning: () => void; showToast?: (msg: string) => void; currentUser?: AuthUser | null; onLogout?: () => void }) {

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col min-h-screen">
      <AppHeader activeNav="library" onGoReports={onGoReports} onGoLearning={onGoLearning} showToast={showToast} currentUser={currentUser} onLogout={onLogout} />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
        <section className="mb-16">
          <h1 className="text-6xl font-extrabold font-headline text-on-surface mb-6 tracking-tighter">题库中心</h1>
          <p className="text-on-surface-variant text-xl max-w-2xl leading-relaxed font-medium">
            浏览我们精心策划的专业级评估题目，旨在培养深度认知与战略思维能力。
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LIBRARY_ITEMS.map((item, idx) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
              className="bg-surface-container-lowest rounded-3xl p-10 flex flex-col h-full ambient-shadow border border-outline-variant/5 hover:-translate-y-2 transition-transform duration-300 group">
              <div className="mb-8">
                <span className={`text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full ${
                  item.category === 'Strategy' ? 'bg-secondary-container text-secondary' : 'bg-primary-fixed text-primary'
                }`}>{item.category}</span>
              </div>
              <h3 className="text-2xl font-extrabold font-headline text-on-surface mb-6 leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-on-surface-variant mb-8 line-clamp-2 font-medium">{item.description}</p>
              <div className="mt-auto">
                <div className="flex items-center justify-between text-xs text-on-surface-variant mb-8 font-bold tracking-tight">
                  <span className="flex items-center gap-2"><Signal size={16} className="text-primary" /> {item.difficulty}</span>
                  <span className="flex items-center gap-2"><Clock size={16} className="text-primary" /> {item.duration}</span>
                </div>
                <button onClick={() => onStart(item)}
                  className={`w-full py-4 rounded-full font-black text-sm tracking-wider transition-all active:scale-95 ${
                    item.status === 'Review' ? 'bg-surface-container-highest text-primary hover:bg-surface-variant' : 'signature-gradient text-white shadow-lg shadow-primary/20 hover:opacity-90'
                  }`}>{item.status === 'Review' ? '查看结果' : '开始测验'}</button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <button onClick={() => showToast?.('你知道吗，点击 查看全部题目 这个按钮可以浪费你整整1秒钟。。')} className="flex items-center space-x-3 text-primary font-black group px-8 py-4 rounded-full hover:bg-primary/5 transition-colors">
            <span className="group-hover:translate-y-1 transition-transform duration-300">查看全部 32 道题目</span>
            <ChevronDown size={20} />
          </button>
        </div>
      </main>

      <footer className="py-12 border-t border-outline-variant/10 text-center bg-white/50">
        <p className="text-xs font-bold text-on-surface-variant tracking-widest uppercase">© 2024 Lynxley_test 版权所有</p>
      </footer>
    </motion.div>
  );
}

/* ───────────────── Assessment View ───────────────── */

function AssessmentView({
  currentAssessment,
  onFinish, onGoLibrary,
  currentQuestionIndex, setCurrentQuestionIndex,
  answers, setAnswers,
  timerDisplay, timerIsLow,
  markedQuestions, setMarkedQuestions, showToast, showConfirm,
}: {
  currentAssessment: any;
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
}) {
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-screen overflow-hidden">
      <nav className="glass-header border-b border-outline-variant/10 flex justify-between items-center px-8 h-20 shrink-0">
        <div className="flex items-center gap-6">
          <button onClick={handleBack} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-high transition-colors text-primary mr-2">
            <ArrowLeft size={24} />
          </button>
          <span className="text-xl font-black text-on-surface font-headline tracking-tighter">专业评估</span>
          <div className="h-8 w-px bg-outline-variant/30"></div>
          <span className="text-on-surface-variant font-bold tracking-tight">{currentAssessment.title}</span>
        </div>
        <div className="flex items-center gap-8">
          <div className={`flex items-center gap-3 font-black tracking-tighter ${timerIsLow ? 'text-error' : 'text-primary'}`}>
            <Clock size={20} />
            <span className={`tabular-nums ${timerIsLow ? 'animate-pulse' : ''}`}>{timerDisplay}</span>
          </div>
          <button onClick={onFinish} className="signature-gradient text-white px-8 py-3 rounded-full font-black text-sm tracking-wider hover:scale-95 transition-all shadow-lg shadow-primary/20">
            结束考试
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {currentAssessment.readingMaterial.iframeUrl ? (
          <section className="flex-1 flex flex-col bg-surface border-r border-outline-variant/10 overflow-hidden">
            <iframe src={currentAssessment.readingMaterial.iframeUrl} className="w-full flex-1 border-none bg-white" title="Reading Material" />
          </section>
        ) : (
          <section className="flex-1 overflow-y-auto bg-surface p-16 border-r border-outline-variant/10">
            <div className="max-w-2xl mx-auto">
              <div className="mb-12">
                <span className="font-bold text-xs tracking-[0.2em] uppercase text-primary mb-3 block">{currentAssessment.volume}</span>
                <h1 className="font-headline text-5xl font-black text-on-surface leading-tight tracking-tighter">{currentAssessment.readingMaterial.title}</h1>
              </div>
              <figure className="mb-12 rounded-3xl overflow-hidden ambient-shadow border border-outline-variant/10">
                <img src={currentAssessment.readingMaterial.image} alt="配图" className="w-full h-80 object-cover" referrerPolicy="no-referrer" />
                <figcaption className="p-5 bg-surface-container-low text-xs text-on-surface-variant font-bold tracking-tight">{currentAssessment.readingMaterial.imageCaption}</figcaption>
              </figure>
              <article className="space-y-8 text-on-surface leading-relaxed text-xl font-medium">
                {currentAssessment.readingMaterial.content?.map((p, i) => <p key={i}>{p}</p>)}
                {currentAssessment.readingMaterial.quote && (
                  <div className="p-10 bg-surface-container-low rounded-3xl italic text-on-surface border-l-8 border-primary ambient-shadow">
                    "{currentAssessment.readingMaterial.quote}"
                    <div className="mt-4 not-italic font-black text-sm text-primary uppercase tracking-widest">— {currentAssessment.readingMaterial.quoteAuthor}</div>
                  </div>
                )}
              </article>
            </div>
          </section>
        )}

        <section className="w-[540px] bg-surface-container-low overflow-y-auto p-16 shrink-0">
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold text-xs tracking-widest uppercase text-on-surface-variant">第 {currentQuestionIndex + 1} 题 / 共 {currentAssessment.questions.length} 题</span>
              <button onClick={handleToggleMark} className={`flex items-center gap-2 font-black text-xs uppercase tracking-widest hover:opacity-70 transition-opacity ${markedQuestions[question.id] ? 'text-secondary' : 'text-primary'}`}>
                <Flag size={14} className={markedQuestions[question.id] ? 'fill-secondary' : ''} /> {markedQuestions[question.id] ? '取消标记' : '标记复查'}
              </button>
            </div>
            <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-primary" />
            </div>
          </div>

          <div className="space-y-12">
            <h3 className="text-3xl font-bold leading-tight text-on-surface tracking-tight">{question.text}</h3>
            <div className="space-y-4">
              {question.options.map((option) => (
                <button key={option.id} onClick={() => setAnswers({ ...answers, [question.id]: option.id })}
                  className={`w-full p-6 rounded-2xl border-2 transition-all text-left flex items-center gap-5 group ${
                    answers[question.id] === option.id ? 'bg-primary-fixed border-primary shadow-md' : 'bg-surface-container-lowest border-transparent hover:border-outline-variant/30 ambient-shadow'
                  }`}>
                  <span className={`w-12 h-12 flex items-center justify-center rounded-xl font-black text-lg transition-colors ${
                    answers[question.id] === option.id ? 'bg-primary text-white' : 'bg-surface-container-high text-primary group-hover:bg-primary-fixed'
                  }`}>{option.label}</span>
                  <span className={`text-lg font-bold ${answers[question.id] === option.id ? 'text-on-surface' : 'text-on-surface-variant'}`}>{option.text}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-12">
              <button disabled={currentQuestionIndex === 0} onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                className="px-8 py-4 text-primary font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-surface-container-highest rounded-2xl transition-all disabled:opacity-30">
                <ArrowLeft size={18} /> 上一题
              </button>
              {currentQuestionIndex === currentAssessment.questions.length - 1 ? (
                <button onClick={onFinish} className="signature-gradient text-white px-12 py-4 rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:scale-95 transition-all shadow-xl shadow-primary/20">
                  结束考试 <CheckCircle2 size={18} />
                </button>
              ) : (
                <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)} className="signature-gradient text-white px-12 py-4 rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:scale-95 transition-all shadow-xl shadow-primary/20">
                  下一题 <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        </section>

        <aside className="w-64 bg-white border-l border-outline-variant/10 p-8 overflow-y-auto shrink-0">
          <div className="mb-10">
            <h4 className="font-black text-xs tracking-widest uppercase text-on-surface-variant mb-2">题目导航</h4>
            <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">共 {currentAssessment.questions.length} 题</p>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {currentAssessment.questions.map((q, idx) => (
              <button key={q.id} onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-10 h-10 flex flex-col items-center justify-center rounded-xl font-black text-xs transition-all relative overflow-hidden ${
                  idx === currentQuestionIndex ? 'bg-primary text-white ring-4 ring-primary-fixed shadow-lg'
                    : markedQuestions[q.id] ? 'bg-secondary-container/20 text-secondary border border-secondary'
                    : answers[q.id] ? 'bg-surface-container-high text-on-surface-variant border border-outline-variant/30'
                    : 'bg-surface-container-low text-on-surface-variant border border-outline-variant/10 hover:border-primary'
                }`}>
                <span>{idx + 1}</span>
                {markedQuestions[q.id] && idx !== currentQuestionIndex && <div className="absolute top-0 right-0 w-3 h-3 bg-secondary rounded-bl-lg"></div>}
              </button>
            ))}
          </div>
          <div className="mt-12">
            <button onClick={() => showToast('你知道吗，点击 查看已标记 这个按钮可以浪费你整整1秒钟。。')} className="w-full py-4 px-5 bg-surface-container-low text-on-surface-variant rounded-2xl font-black text-[10px] tracking-widest uppercase hover:bg-surface-container-highest transition-all flex items-center justify-between">
              查看已标记 <Flag size={14} />
            </button>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}

/* ───────────────── Results View ───────────────── */

function ResultsView({ result, currentAssessment, onBack, onGoReports, isFromHistory, showToast, currentUser, onLogout }: { result: UserResult; currentAssessment: any; onBack: () => void; onGoReports: () => void; isFromHistory: boolean; showToast?: (msg: string) => void; currentUser?: AuthUser | null; onLogout?: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col min-h-screen">
      <AppHeader activeNav="reports" onGoLibrary={onBack} onGoReports={onGoReports} showToast={showToast} currentUser={currentUser} onLogout={onLogout} />

      <main className="max-w-6xl mx-auto px-6 py-16 w-full">
        <div className="mb-20">
          <p className="font-bold text-xs uppercase tracking-[0.3em] text-primary mb-4">
            测验完成 • 已回答 {result.totalCount} / {result.totalCount} 题
          </p>
          <h1 className="font-headline text-6xl font-black text-on-surface mb-6 tracking-tighter">编辑策略精通</h1>
          <p className="text-on-surface-variant text-xl flex items-center gap-3 font-bold">
            <CheckCircle2 className="text-secondary" /> 已解锁详细错误分析与解释
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-24">
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-[2.5rem] p-12 flex flex-col justify-between relative overflow-hidden ambient-shadow border border-outline-variant/10">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <span className="inline-flex items-center px-6 py-2 rounded-full bg-secondary-container text-secondary font-black text-xs tracking-widest uppercase">
                  <Award size={16} className="mr-2" /> 优秀
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-headline text-9xl font-black text-on-surface tracking-tighter">{result.score}</span>
                <span className="font-headline text-4xl text-outline-variant font-bold">/100</span>
              </div>
              <p className="text-2xl text-on-surface-variant mt-6 font-bold">您在 {result.totalCount} 道题中答对了 {result.correctCount} 道。</p>
            </div>
            <div className="absolute -right-20 -bottom-20 w-96 h-96 signature-gradient rounded-full opacity-10 blur-[100px]"></div>
            <div className="mt-16 flex gap-5">
              <button onClick={() => showToast?.('你知道吗，点击 分享结果 这个按钮可以浪费你整整1秒钟。。')} className="signature-gradient text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:shadow-2xl transition-all">
                <Share2 size={18} /> 分享结果
              </button>
              <button onClick={() => showToast?.('你知道吗，点击 下载报告 这个按钮可以浪费你整整1秒钟。。')} className="bg-surface-container-high text-primary px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-surface-container-highest transition-all">
                下载报告
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-surface-container-low rounded-[2rem] p-10 flex items-center justify-between border border-outline-variant/10 ambient-shadow">
              <div>
                <p className="font-bold text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">百分比得分</p>
                <p className="font-headline text-5xl font-black text-on-surface">{result.score}%</p>
              </div>
              <div className="w-24 h-24 rounded-full border-8 border-surface-container-highest flex items-center justify-center relative">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path className="stroke-surface-container-highest" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" />
                  <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: `${result.score}, 100` }} transition={{ duration: 1.5, ease: "easeOut" }}
                    className="stroke-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" />
                </svg>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-[2rem] p-10 border border-outline-variant/10 ambient-shadow">
              <p className="font-bold text-[10px] uppercase tracking-widest text-on-surface-variant mb-8">成绩分项</p>
              <div className="space-y-8">
                {result.breakdown.map((b) => (
                  <div key={b.category}>
                    <div className="flex justify-between text-sm mb-3 font-bold">
                      <span className="text-on-surface-variant">{b.category}</span>
                      <span className={b.score < 80 ? 'text-error' : 'text-on-surface'}>{b.score}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${b.score}%` }} transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full rounded-full ${b.score < 80 ? 'bg-error' : 'signature-gradient'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-outline-variant/20 pb-10 gap-6">
            <div>
              <h2 className="font-headline text-4xl font-black text-on-surface tracking-tight">题目详解与分析</h2>
              <p className="text-on-surface-variant mt-2 text-lg font-medium">对 {result.totalCount} 道题的作答进行专业解析。</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => showToast?.('你知道吗，点击 全部题目 这个按钮可以浪费你整整1秒钟。。')} className="px-8 py-3 rounded-full bg-primary text-white text-sm font-black uppercase tracking-widest shadow-lg shadow-primary/20">全部题目</button>
              <button onClick={() => showToast?.('你知道吗，点击 仅看错题 这个按钮可以浪费你整整1秒钟。。')} className="px-8 py-3 rounded-full bg-surface-container-highest text-on-surface-variant text-sm font-black uppercase tracking-widest hover:bg-outline-variant/20 transition-all">仅看错题</button>
            </div>
          </div>

          {currentAssessment.questions.map((q, idx) => {
            const userAnswer = result.answers.find(a => a.questionId === q.id)?.selectedOptionId;
            const isCorrect = userAnswer === q.correctOptionId;
            return (
              <motion.div key={q.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className={`bg-surface-container-lowest rounded-[2rem] p-12 border-2 transition-all ambient-shadow ${isCorrect ? 'border-transparent' : 'border-error/20'}`}>
                <div className="flex justify-between items-start mb-10">
                  <span className="font-bold text-xs uppercase tracking-[0.2em] text-on-surface-variant">第 {idx + 1 < 10 ? `0${idx + 1}` : idx + 1} 题 • {q.category}</span>
                  <span className={`inline-flex items-center font-black gap-2 text-xs uppercase tracking-widest px-5 py-2 rounded-full ${isCorrect ? 'text-secondary bg-secondary/10' : 'text-error bg-error/10'}`}>
                    {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                    {isCorrect ? '正确' : '错误'}
                  </span>
                </div>
                <h3 className="font-headline text-3xl font-bold mb-10 leading-tight tracking-tight">{q.text}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  {q.options.filter(opt => opt.id === userAnswer || opt.id === q.correctOptionId).map(opt => {
                    const isSelected = opt.id === userAnswer;
                    const isActualCorrect = opt.id === q.correctOptionId;
                    return (
                      <div key={opt.id} className={`p-8 rounded-2xl border-2 relative ${isActualCorrect ? 'bg-secondary/5 border-secondary' : 'bg-error/5 border-error'}`}>
                        <div className="flex justify-between mb-4">
                          <p className="font-black text-on-surface text-lg">{opt.text}</p>
                          {isActualCorrect ? <CheckCircle2 className="text-secondary" /> : <XCircle className="text-error" />}
                        </div>
                        <div className={`inline-flex items-center px-3 py-1 rounded font-black text-[10px] uppercase tracking-widest text-white ${isActualCorrect ? 'bg-secondary' : 'bg-error'}`}>
                          {isSelected && isCorrect ? '你的选择 • 正确' : isSelected ? '你的选择 • 错误' : '正确答案'}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className={`p-10 rounded-3xl border-l-8 ${isCorrect ? 'bg-surface-container-low border-secondary' : 'bg-error-container/20 border-error'}`}>
                  <h4 className="font-black mb-4 flex items-center gap-3 text-on-surface uppercase tracking-widest text-sm">
                    <BookOpen size={18} className={isCorrect ? 'text-secondary' : 'text-error'} /> 详细解析
                  </h4>
                  <p className="text-on-surface-variant leading-relaxed text-lg font-medium">{q.rationale}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20 flex justify-center">
          <button onClick={onBack} className="signature-gradient text-white px-16 py-5 rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:scale-95 transition-all shadow-xl shadow-primary/20">
            <ArrowLeft size={20} /> 返回首页
          </button>
        </div>
      </main>
    </motion.div>
  );
}

/* ───────────────── Reports View ───────────────── */

function ReportsView({ history, onBack, onViewRecord, onDelete, showConfirm, showToast, onGoLearning, currentUser, onLogout }: { history: HistoryRecord[]; onBack: () => void; onViewRecord: (r: HistoryRecord) => void; onDelete: (id: string) => void; showConfirm: (msg: string, cb: () => void) => void; showToast?: (msg: string) => void; onGoLearning?: () => void; currentUser?: AuthUser | null; onLogout?: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col min-h-screen">
      <AppHeader activeNav="reports" onGoLibrary={onBack} onGoLearning={onGoLearning} showToast={showToast} currentUser={currentUser} onLogout={onLogout} />

      <main className="max-w-5xl mx-auto px-6 py-16 w-full">
        <section className="mb-16">
          <h1 className="text-6xl font-extrabold font-headline text-on-surface mb-6 tracking-tighter">答题报告</h1>
          <p className="text-on-surface-variant text-xl max-w-2xl leading-relaxed font-medium">
            查看您的历史答题记录和成绩分析。
          </p>
        </section>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-28 h-28 rounded-full bg-surface-container-high flex items-center justify-center mb-8">
              <TrendingUp size={48} className="text-on-surface-variant/30" />
            </div>
            <h3 className="font-headline text-3xl font-bold text-on-surface mb-3">暂无答题记录</h3>
            <p className="text-on-surface-variant text-lg text-center max-w-md mb-10">
              完成一次测验后，您的答题记录和分析将会出现在这里。
            </p>
            <button onClick={onBack} className="signature-gradient text-white px-12 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-95 transition-all">
              前往题库
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {history.map((record, idx) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-surface-container-lowest rounded-3xl p-8 ambient-shadow border border-outline-variant/5 hover:-translate-y-2 transition-transform duration-300 text-left group w-full relative"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showConfirm('确定要删除此条记录吗？', () => onDelete(record.id));
                  }}
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant/0 group-hover:text-on-surface-variant/40 hover:!text-error hover:!bg-error/10 transition-all active:scale-90 z-10"
                  title="删除记录"
                >
                  <Trash2 size={16} />
                </button>
                <button onClick={() => onViewRecord(record)} className="w-full text-left">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-headline text-2xl font-black text-white ${
                      record.result.score >= 80 ? 'bg-secondary' : record.result.score >= 60 ? 'signature-gradient' : 'bg-error'
                    }`}>
                      {record.result.score}
                    </div>
                    <ChevronRight size={20} className="text-on-surface-variant/30 group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-headline text-xl font-bold text-on-surface mb-4 leading-snug group-hover:text-primary transition-colors">{record.title}</h3>
                  <div className="flex items-center gap-4 text-on-surface-variant text-xs font-bold">
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {record.result.timeTaken}</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 size={14} /> {record.result.correctCount}/{record.result.totalCount}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-3 text-on-surface-variant/50 text-xs">
                    <Calendar size={12} />
                    <span>{record.date}</span>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </motion.div>
  );
}

/* ───────────────── Shared Components ───────────────── */

function NavLink({ icon, label, active = false, onClick }: { icon: ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick?.(); }}
      className={`flex items-center space-x-2 font-bold tracking-tight transition-colors ${
        active ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface'
      }`}>
      {icon}<span>{label}</span>
    </a>
  );
}

function IconButton({ icon, onClick }: { icon: ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="p-2.5 hover:bg-surface-container-low rounded-full text-on-surface-variant hover:text-primary transition-all active:scale-95">
      {icon}
    </button>
  );
}

/* ───────────────── Learning View ───────────────── */

const VIDEO_PLACEHOLDERS = [
  { id: 1, title: '第一个操作题演示', subtitle: '操作题 01', duration: '12:30', gradient: 'from-blue-500 to-indigo-600' },
  { id: 2, title: '第二个操作题演示', subtitle: '操作题 02', duration: '18:45', gradient: 'from-violet-500 to-purple-600' },
  { id: 3, title: '第三个操作题演示', subtitle: '操作题 03', duration: '15:20', gradient: 'from-cyan-500 to-blue-600' },
  { id: 4, title: '第四个操作题演示', subtitle: '操作题 04', duration: '22:10', gradient: 'from-emerald-500 to-teal-600' },
  { id: 5, title: '第五个操作题演示', subtitle: '操作题 05', duration: '19:55', gradient: 'from-amber-500 to-orange-600' },
  { id: 6, title: '第六个操作题演示', subtitle: '操作题 06', duration: '25:00', gradient: 'from-rose-500 to-pink-600' },
  { id: 7, title: '第七个操作题演示', subtitle: '操作题 07', duration: '20:35', gradient: 'from-fuchsia-500 to-violet-600' },
  { id: 8, title: '第八个操作题演示', subtitle: '操作题 08', duration: '28:15', gradient: 'from-sky-500 to-cyan-600' },
];

function LearningView({ onGoLibrary, onGoReports, showToast, currentUser, onLogout }: { onGoLibrary: () => void; onGoReports: () => void; showToast?: (msg: string) => void; currentUser?: AuthUser | null; onLogout?: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col min-h-screen">
      <AppHeader activeNav="learning" onGoLibrary={onGoLibrary} onGoReports={onGoReports} onGoLearning={() => {}} showToast={showToast} currentUser={currentUser} onLogout={onLogout} />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
        <section className="mb-16">
          <h1 className="text-6xl font-extrabold font-headline text-on-surface mb-6 tracking-tighter">学习中心</h1>
          <p className="text-on-surface-variant text-xl max-w-2xl leading-relaxed font-medium">
            精选教学视频课程，帮助你系统掌握核心知识点，为测验做好充分准备。
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {VIDEO_PLACEHOLDERS.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="bg-surface-container-lowest rounded-3xl overflow-hidden ambient-shadow border border-outline-variant/5 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer"
              onClick={() => showToast?.('视频功能即将上线，敬请期待！')}
            >
              {/* Video Thumbnail */}
              <div className={`relative w-full h-48 bg-gradient-to-br ${video.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                {/* Play button */}
                <div className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/30 shadow-xl group-hover:scale-110 transition-transform">
                  <Play size={28} className="text-white ml-1" fill="white" />
                </div>
                {/* Duration badge */}
                <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-xl">
                  {video.duration}
                </span>
                {/* Coming soon badge */}
                {video.id > 2 && (
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                    <Lock size={12} />
                    即将上线
                  </div>
                )}
              </div>
              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-black tracking-widest uppercase text-primary bg-primary-fixed px-3 py-1 rounded-lg">
                    {video.subtitle}
                  </span>
                </div>
                <h3 className="font-headline text-xl font-bold text-on-surface leading-snug group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <p className="text-on-surface-variant/40 text-sm italic">更多课程正在制作中…</p>
        </div>
      </main>

      <footer className="py-12 border-t border-outline-variant/10 text-center bg-white/50">
        <p className="text-xs font-bold text-on-surface-variant tracking-widest uppercase">© 2024 Lynxley_test 版权所有</p>
      </footer>
    </motion.div>
  );
}
