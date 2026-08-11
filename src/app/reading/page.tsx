'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { VI } from '@/lib/i18n';
import { Loading, EmptyState } from '@/components/States';
import { Newspaper, ChevronLeft, ChevronRight, Check, X, Eye, EyeOff, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Passage {
  id?: string;
  title: string;
  titleVi?: string;
  level: string;
  topic: string;
  content: string;
  contentVi?: string;
  keyWords?: { word: string; meaning: string }[] | string;
  questions?: { q: string; options: string[]; answer: number }[] | string;
  explanationVi?: string[] | string;
}

const CATEGORIES = [
  { value: 'all', label: 'Tất cả' },
  { value: 'daily', label: VI.reading.categories.daily },
  { value: 'business', label: VI.reading.categories.business },
  { value: 'toeic', label: VI.reading.categories.toeic },
  { value: 'ielts', label: VI.reading.categories.ielts }
];

export default function ReadingPage() {
  const [passages, setPassages] = useState<Passage[]>([]);
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState('all');
  const [selected, setSelected] = useState<Passage | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/reading')
      .then((r) => r.json())
      .then((d) => setPassages(d.passages || []))
      .finally(() => setLoading(false));
  }, []);

  if (selected) return <ReadingView passage={selected} onBack={() => setSelected(null)} />;

  const filtered = topic === 'all' ? passages : passages.filter((p) => p.topic === topic);

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Newspaper className="w-8 h-8 text-green-500" /> {VI.reading.title}
          </h1>
          <p className="text-slate-500 mt-1">Đọc hiểu theo chủ đề và trình độ</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setTopic(c.value)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                topic === c.value ? "bg-green-500 text-white" : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        {loading ? <Loading /> : filtered.length === 0 ? (
          <EmptyState icon={Newspaper} title="Chưa có bài đọc" />
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((p, i) => (
              <button key={i} onClick={() => setSelected(p)} className="card text-left">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className="badge bg-green-50 text-green-700">{p.level}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{p.titleVi || p.title}</h3>
                <div className="text-xs text-slate-500 mb-3 line-clamp-2">{p.content.slice(0, 100)}...</div>
                <div className="text-xs text-slate-400">{p.topic}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

function ReadingView({ passage, onBack }: { passage: Passage; onBack: () => void }) {
  const [showVi, setShowVi] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const keyWords = typeof passage.keyWords === 'string' ? JSON.parse(passage.keyWords || '[]') : (passage.keyWords || []);
  const questions = typeof passage.questions === 'string' ? JSON.parse(passage.questions || '[]') : (passage.questions || []);
  const explanations = typeof passage.explanationVi === 'string' ? JSON.parse(passage.explanationVi || '[]') : (passage.explanationVi || []);

  const complete = async () => {
    await fetch('/api/reading/complete', { method: 'POST' });
    toast.success(VI.success.completed);
    onBack();
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="btn-ghost mb-4">
          <ChevronLeft className="w-4 h-4" /> {VI.back}
        </button>

        <div className="card mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="badge bg-green-50 text-green-700">{passage.level}</span>
            <span className="badge bg-slate-100">{passage.topic}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{passage.titleVi || passage.title}</h1>
          {passage.titleVi && <div className="text-sm text-slate-500 mt-1">{passage.title}</div>}
        </div>

        {/* Reading content */}
        <div className="card mb-4">
          <div className="prose max-w-none">
            <p className="text-slate-800 leading-relaxed whitespace-pre-line text-lg">
              {showVi && passage.contentVi ? passage.contentVi : passage.content}
            </p>
          </div>
          <button onClick={() => setShowVi(!showVi)} className="btn-secondary mt-4 text-sm">
            {showVi ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showVi ? 'Hiện tiếng Anh' : VI.reading.translation}
          </button>
        </div>

        {/* Key words */}
        {keyWords.length > 0 && (
          <div className="card mb-4">
            <h3 className="font-bold text-slate-900 mb-3">{VI.reading.keyWords}</h3>
            <div className="grid md:grid-cols-2 gap-2">
              {keyWords.map((kw: { word: string; meaning: string }, i: number) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50">
                  <div className="font-semibold text-slate-900">{kw.word}</div>
                  <div className="text-sm text-slate-600">{kw.meaning}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Questions */}
        {questions.length > 0 && (
          <div className="card">
            <h3 className="font-bold text-slate-900 mb-4">{VI.reading.questions}</h3>
            <div className="space-y-4">
              {questions.map((q: { q: string; options: string[]; answer: number }, i: number) => {
                const userAns = answers[i];
                const isCorrect = userAns === q.answer;
                return (
                  <div key={i} className="p-4 rounded-xl bg-slate-50">
                    <div className="font-medium text-slate-900 mb-3">{i + 1}. {q.q}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {q.options.map((opt, j) => (
                        <button
                          key={j}
                          disabled={showResult}
                          onClick={() => setAnswers({ ...answers, [i]: j })}
                          className={cn(
                            "p-3 rounded-lg border-2 text-left text-sm transition-all",
                            !showResult && userAns === j ? "border-primary-500 bg-primary-50"
                              : !showResult ? "border-slate-200 hover:border-slate-300"
                              : j === q.answer ? "border-green-500 bg-green-50"
                              : userAns === j ? "border-red-500 bg-red-50"
                              : "border-slate-200 opacity-60"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <div className={cn(
                              "w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold",
                              showResult && j === q.answer ? "bg-green-500 text-white"
                                : showResult && userAns === j ? "bg-red-500 text-white"
                                : userAns === j ? "bg-primary-500 text-white"
                                : "bg-slate-100 text-slate-600"
                            )}>
                              {showResult && j === q.answer ? <Check className="w-3 h-3" /> :
                               showResult && userAns === j ? <X className="w-3 h-3" /> :
                               String.fromCharCode(65 + j)}
                            </div>
                            {opt}
                          </div>
                        </button>
                      ))}
                    </div>
                    {showResult && explanations[i] && (
                      <div className="mt-2 p-2 rounded-lg bg-blue-50 text-sm text-blue-900">
                        💡 {explanations[i]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!showResult ? (
              <button onClick={() => setShowResult(true)} className="btn-primary w-full mt-4">
                {VI.listening.submit}
              </button>
            ) : (
              <button onClick={complete} className="btn-primary w-full mt-4">{VI.finish}</button>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}