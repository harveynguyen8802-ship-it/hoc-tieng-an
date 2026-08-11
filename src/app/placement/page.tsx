'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
import { VI } from '@/lib/i18n';
import { Loader2, CheckCircle2, XCircle, Sparkles, Target, BookOpen, Headphones, MessageCircle, FileText } from 'lucide-react';
import { Loading } from '@/components/States';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Question {
  category: string;
  level: string;
  question: string;
  options: string[];
  answer: number;
}

interface Result {
  totalScore: number;
  scores: Record<string, number>;
  level: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  learningPath: { skill: string; title: string; activities: string[] }[];
}

const CATEGORY_INFO: Record<string, { icon: typeof BookOpen; label: string; color: string }> = {
  vocab: { icon: BookOpen, label: VI.placement.sections.vocab, color: 'text-purple-500 bg-purple-50' },
  grammar: { icon: FileText, label: VI.placement.sections.grammar, color: 'text-blue-500 bg-blue-50' },
  reading: { icon: FileText, label: VI.placement.sections.reading, color: 'text-green-500 bg-green-50' },
  listening: { icon: Headphones, label: VI.placement.sections.listening, color: 'text-orange-500 bg-orange-50' },
  reflex: { icon: MessageCircle, label: VI.placement.sections.reflex, color: 'text-pink-500 bg-pink-50' }
};

const SKILL_LABEL: Record<string, string> = {
  vocab: 'Từ vựng', grammar: 'Ngữ pháp', reading: 'Đọc hiểu', listening: 'Nghe hiểu', reflex: 'Phản xạ'
};

export default function PlacementPage() {
  const router = useRouter();
  const [stage, setStage] = useState<'intro' | 'testing' | 'result'>('intro');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const startTest = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/placement/questions');
      const data = await res.json();
      setQuestions(data.questions);
      setAnswers(new Array(data.questions.length).fill(-1));
      setStage('testing');
      setCurrentIdx(0);
    } catch {
      toast.error(VI.errors.network);
    } finally {
      setLoading(false);
    }
  };

  const selectAnswer = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIdx] = idx;
    setAnswers(newAnswers);
  };

  const next = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      submitTest();
    }
  };

  const submitTest = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/placement/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, questions })
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || VI.errors.generic);
        return;
      }
      setResult(data.result);
      setStage('result');
    } catch {
      toast.error(VI.errors.network);
    } finally {
      setSubmitting(false);
    }
  };

  const skip = () => router.push('/dashboard');

  if (stage === 'intro') {
    return (
      <AppShell>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm mb-4">
              <Sparkles className="w-4 h-4" /> {VI.placement.title}
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{VI.placement.title}</h1>
            <p className="text-slate-600 text-lg">{VI.placement.desc}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
            {Object.entries(CATEGORY_INFO).map(([key, info]) => {
              const Icon = info.icon;
              return (
                <div key={key} className={cn("rounded-2xl p-4 text-center", info.color)}>
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-xs font-medium">{info.label}</div>
                </div>
              );
            })}
          </div>

          <div className="card">
            <h3 className="font-bold text-slate-900 mb-3">Bài kiểm tra bao gồm:</h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />{questions.length || 15} câu hỏi trắc nghiệm</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />5 kỹ năng: Từ vựng, Ngữ pháp, Đọc hiểu, Nghe hiểu, Phản xạ</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />AI phân tích và đề xuất lộ trình học cá nhân</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />Thời gian: khoảng 10-15 phút</li>
            </ul>
            <div className="flex gap-3 mt-6">
              <button onClick={startTest} disabled={loading} className="btn-primary flex-1">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Target className="w-4 h-4" />}
                {VI.placement.startTest}
              </button>
              <button onClick={skip} className="btn-secondary">{VI.placement.skip}</button>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  if (stage === 'testing') {
    const q = questions[currentIdx];
    const info = CATEGORY_INFO[q.category];
    const Icon = info?.icon || BookOpen;
    const progress = ((currentIdx + 1) / questions.length) * 100;

    return (
      <AppShell>
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>{VI.placement.question} {currentIdx + 1} {VI.placement.of} {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full gradient-bg transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="card">
            <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4", info?.color)}>
              <Icon className="w-3.5 h-3.5" />{info?.label}
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-6">{q.question}</h2>

            <div className="space-y-3">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => selectAnswer(idx)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border-2 transition-all",
                    answers[currentIdx] === idx
                      ? "border-primary-500 bg-primary-50"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center font-semibold text-sm",
                      answers[currentIdx] === idx ? "bg-primary-500 text-white" : "bg-slate-100 text-slate-600"
                    )}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="flex-1">{opt}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                disabled={currentIdx === 0}
                className="btn-secondary"
              >
                {VI.previous}
              </button>
              <button
                onClick={next}
                disabled={answers[currentIdx] === -1 || submitting}
                className="btn-primary"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {currentIdx === questions.length - 1 ? VI.placement.submit : VI.next}
              </button>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  if (stage === 'result' && result) {
    return (
      <AppShell>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-bg text-white mb-4">
              <Sparkles className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{VI.placement.result}</h1>
            <p className="text-slate-600">{VI.placement.yourLevel}: <span className="font-bold text-primary-600 text-xl">{VI.level[result.level as keyof typeof VI.level]}</span></p>
          </div>

          <div className="card mb-6">
            <div className="text-center mb-6">
              <div className="text-6xl font-bold gradient-text">{result.totalScore}</div>
              <div className="text-slate-500 mt-1">{VI.placement.totalScore}</div>
            </div>

            <h3 className="font-bold text-slate-900 mb-3">{VI.placement.skillScores}</h3>
            <div className="space-y-3">
              {Object.entries(result.scores).map(([skill, score]) => {
                const info = CATEGORY_INFO[skill];
                const Icon = info?.icon || BookOpen;
                return (
                  <div key={skill} className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", info?.color)}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{SKILL_LABEL[skill] || skill}</span>
                        <span className="font-semibold">{score}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full gradient-bg transition-all" style={{ width: `${score}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <h3 className="font-bold text-slate-900">{VI.placement.strengths}</h3>
              </div>
              <ul className="space-y-2 text-sm">
                {result.strengths.map((s, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>{SKILL_LABEL[s] || s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-orange-500" />
                <h3 className="font-bold text-slate-900">{VI.placement.weaknesses}</h3>
              </div>
              <ul className="space-y-2 text-sm">
                {result.weaknesses.map((s, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-orange-500">↑</span>{SKILL_LABEL[s] || s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card mb-6">
            <h3 className="font-bold text-slate-900 mb-3">📚 {VI.placement.learningPath}</h3>
            <div className="space-y-3">
              {result.learningPath.map((path, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50">
                  <div className="font-semibold text-slate-900 mb-2">{path.title}</div>
                  <ul className="space-y-1 text-sm text-slate-600">
                    {path.activities.map((act, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="text-primary-500">•</span>{act}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => router.push('/dashboard')} className="btn-primary flex-1">
              Bắt đầu học ngay
            </button>
            <button onClick={() => { setStage('intro'); setResult(null); }} className="btn-secondary">
              {VI.placement.retake}
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  return <Loading />;
}