'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { VI } from '@/lib/i18n';
import { Loading, EmptyState } from '@/components/States';
import { Target, ChevronLeft, Check, X, BarChart, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface ToeicTest {
  id?: string;
  title: string;
  part: string;
  type: string;
  questions: { question: string; options: string[]; answer: number; explanationVi?: string; audio?: string }[] | string;
}

const PART_LABEL: Record<string, string> = {
  'listening-1': VI.toeic.parts['listening-1'],
  'listening-2': VI.toeic.parts['listening-2'],
  'listening-3': VI.toeic.parts['listening-3'],
  'listening-4': VI.toeic.parts['listening-4'],
  'reading-5': VI.toeic.parts['reading-5'],
  'reading-6': VI.toeic.parts['reading-6'],
  'reading-7': VI.toeic.parts['reading-7']
};

export default function ToeicPage() {
  const [tests, setTests] = useState<ToeicTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ToeicTest | null>(null);

  useEffect(() => {
    fetch('/api/toeic')
      .then((r) => r.json())
      .then((d) => setTests(d.tests || []))
      .finally(() => setLoading(false));
  }, []);

  if (selected) return <ToeicTestView test={selected} onBack={() => setSelected(null)} />;

  const listening = tests.filter((t) => t.part.startsWith('listening'));
  const reading = tests.filter((t) => t.part.startsWith('reading'));

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-8 h-8 text-red-500" /> {VI.toeic.title}
          </h1>
          <p className="text-slate-500 mt-1">{VI.toeic.desc}</p>
        </div>

        {loading ? <Loading /> : tests.length === 0 ? (
          <EmptyState icon={Target} title="Chưa có bài TOEIC" />
        ) : (
          <div className="space-y-8">
            <Section title="🎧 Listening" tests={listening} onSelect={setSelected} />
            <Section title="📖 Reading" tests={reading} onSelect={setSelected} />
          </div>
        )}
      </div>
    </AppShell>
  );
}

function Section({ title, tests, onSelect }: { title: string; tests: ToeicTest[]; onSelect: (t: ToeicTest) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-4">{title}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tests.map((t, i) => (
          <button key={i} onClick={() => onSelect(t)} className="card text-left">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                <Target className="w-6 h-6" />
              </div>
              <span className="badge bg-red-50 text-red-700">{t.type === 'mini' ? VI.toeic.mini : VI.toeic.full}</span>
            </div>
            <h3 className="font-bold text-slate-900">{PART_LABEL[t.part] || t.part}</h3>
            <div className="text-xs text-slate-500 mt-1">{t.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ToeicTestView({ test, onBack }: { test: ToeicTest; onBack: () => void }) {
  const questions = typeof test.questions === 'string' ? JSON.parse(test.questions || '[]') : (test.questions || []);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/toeic/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testId: test.id, answers, questions })
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || VI.errors.generic);
        return;
      }
      setResult(data.result);
      setShowResult(true);
    } catch {
      toast.error(VI.errors.network);
    } finally {
      setLoading(false);
    }
  };

  if (showResult && result) {
    return <ToeicResult result={result} test={test} questions={questions} answers={answers} onBack={onBack} />;
  }

  const q = questions[idx];

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="btn-ghost">
            <ChevronLeft className="w-4 h-4" /> {VI.back}
          </button>
          <div className="text-sm text-slate-600">{PART_LABEL[test.part]}</div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-slate-600 mb-2">
            <span>{VI.toeic.questions} {idx + 1} {VI.toeic.of} {questions.length}</span>
            <span>{Math.round(((idx + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-500 to-orange-500" style={{ width: `${((idx + 1) / questions.length) * 100}%` }} />
          </div>
        </div>

        <div className="card">
          {q.audio && (
            <div className="mb-4 p-3 rounded-xl bg-blue-50 text-blue-700 text-sm">
              🎧 {q.audio}
            </div>
          )}
          <div className="text-lg font-semibold text-slate-900 mb-6">{q.question}</div>

          <div className="space-y-2">
            {q.options.map((opt: string, i: number) => (
              <button
                key={i}
                onClick={() => {
                  const newAns = [...answers];
                  newAns[idx] = i;
                  setAnswers(newAns);
                }}
                className={cn(
                  "w-full text-left p-4 rounded-xl border-2 transition-all",
                  answers[idx] === i ? "border-primary-500 bg-primary-50" : "border-slate-200 hover:border-slate-300"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center font-semibold text-sm",
                    answers[idx] === i ? "bg-primary-500 text-white" : "bg-slate-100 text-slate-600"
                  )}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span>{opt}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0} className="btn-secondary">{VI.previous}</button>
            {idx === questions.length - 1 ? (
              <button onClick={submit} disabled={answers[idx] === -1 || loading} className="btn-primary">
                {loading ? 'Đang chấm...' : VI.toeic.submit}
              </button>
            ) : (
              <button onClick={() => setIdx(idx + 1)} disabled={answers[idx] === -1} className="btn-primary">{VI.toeic.next}</button>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function ToeicResult({ result, test, questions, answers, onBack }: { result: any; test: ToeicTest; questions: any[]; answers: number[]; onBack: () => void }) {
  const wrongAnswers: number[] = JSON.parse(result.wrongAnswers || '[]');

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        <button onClick={onBack} className="btn-ghost mb-4">
          <ChevronLeft className="w-4 h-4" /> {VI.back}
        </button>

        <div className="card mb-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white mb-4">
            <BarChart className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">{VI.toeic.result}</h1>
          <div className="text-6xl font-bold gradient-text mt-4">{result.totalScore}</div>
          <div className="text-slate-500 mt-1">{VI.toeic.totalScore}</div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-blue-50">
              <div className="text-2xl font-bold text-blue-700">{result.listeningScore}</div>
              <div className="text-xs text-blue-600 mt-1">{VI.toeic.listeningScore}</div>
            </div>
            <div className="p-4 rounded-xl bg-green-50">
              <div className="text-2xl font-bold text-green-700">{result.readingScore}</div>
              <div className="text-xs text-green-600 mt-1">{VI.toeic.readingScore}</div>
            </div>
            <div className="p-4 rounded-xl bg-purple-50">
              <div className="text-2xl font-bold text-purple-700">{result.predictedLevel}</div>
              <div className="text-xs text-purple-600 mt-1">{VI.toeic.predicted}</div>
            </div>
          </div>
        </div>

        {/* Analysis */}
        <div className="card">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-500" />
            {VI.toeic.analysis}
          </h3>
          <div className="text-sm text-slate-600 mb-4">
            Bạn đã trả lời đúng <strong>{result.correctCount}/{result.totalCount}</strong> câu. 
            {wrongAnswers.length > 0 && ` Hãy xem lại ${wrongAnswers.length} câu sai dưới đây.`}
          </div>

          <div className="space-y-3">
            {wrongAnswers.map((idx) => {
              const q = questions[idx];
              return (
                <div key={idx} className="p-4 rounded-xl bg-red-50 border border-red-100">
                  <div className="font-medium text-slate-900 mb-2">{idx + 1}. {q.question}</div>
                  <div className="flex items-center gap-2 text-sm">
                    <X className="w-4 h-4 text-red-500" />
                    <span className="text-red-700">{VI.toeic.yourAnswer}: {q.options[answers[idx]] || '—'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-green-700">{VI.toeic.correctAnswer}: {q.options[q.answer]}</span>
                  </div>
                  {q.explanationVi && (
                    <div className="text-xs text-slate-600 mt-2 italic">💡 {q.explanationVi}</div>
                  )}
                </div>
              );
            })}
            {wrongAnswers.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                🎉 Tuyệt vời! Bạn trả lời đúng tất cả các câu.
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}