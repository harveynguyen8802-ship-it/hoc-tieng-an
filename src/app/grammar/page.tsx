'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { VI } from '@/lib/i18n';
import { Loading, EmptyState } from '@/components/States';
import { FileText, ChevronRight, BookOpen, ChevronLeft, Check, X, Lightbulb, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface GrammarLesson {
  id?: string;
  slug: string;
  title: string;
  titleVi: string;
  category: string;
  level: string;
  explanation: string;
  formula?: string;
  examples?: { en: string; vi: string }[] | string;
  notes?: string;
  exercises?: { question: string; options: string[]; answer: number; explanationVi: string }[] | string;
  answerKey?: number[] | string;
  explanationVi?: string[] | string;
  order?: number;
}

const CATEGORIES = [
  { value: 'all', label: 'Tất cả' },
  { value: 'present', label: VI.grammar.categories.present },
  { value: 'past', label: VI.grammar.categories.past },
  { value: 'future', label: VI.grammar.categories.future },
  { value: 'conditional', label: VI.grammar.categories.conditional },
  { value: 'passive', label: VI.grammar.categories.passive },
  { value: 'relative-clause', label: VI.grammar.categories['relative-clause'] },
  { value: 'gerund-infinitive', label: VI.grammar.categories['gerund-infinitive'] },
  { value: 'modal', label: VI.grammar.categories.modal },
  { value: 'articles', label: VI.grammar.categories.articles },
  { value: 'prepositions', label: VI.grammar.categories.prepositions },
  { value: 'comparatives', label: VI.grammar.categories.comparatives },
  { value: 'reported-speech', label: VI.grammar.categories['reported-speech'] },
  { value: 'advanced', label: VI.grammar.categories.advanced }
];

export default function GrammarPage() {
  const [lessons, setLessons] = useState<GrammarLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState<GrammarLesson | null>(null);
  const [exerciseMode, setExerciseMode] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/grammar?category=${category}`)
      .then((r) => r.json())
      .then((d) => setLessons(d.lessons || []))
      .finally(() => setLoading(false));
  }, [category]);

  if (selected && !exerciseMode) {
    return <GrammarDetail lesson={selected} onBack={() => setSelected(null)} onStartExercise={() => setExerciseMode(true)} />;
  }

  if (selected && exerciseMode) {
    return <GrammarExercise lesson={selected} onBack={() => { setExerciseMode(false); setSelected(null); }} onDone={() => { setExerciseMode(false); setSelected(null); }} />;
  }

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-8 h-8 text-blue-500" /> {VI.grammar.title}
          </h1>
          <p className="text-slate-500 mt-1">Học ngữ pháp từ cơ bản đến nâng cao với giải thích tiếng Việt</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                category === c.value ? "bg-primary-500 text-white" : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        {loading ? <Loading /> : lessons.length === 0 ? (
          <EmptyState icon={FileText} title="Chưa có bài ngữ pháp" />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lessons.map((l) => (
              <button
                key={l.slug}
                onClick={() => setSelected(l)}
                className="card text-left group hover:border-primary-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className="badge bg-blue-50 text-blue-700">{l.level}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{l.titleVi}</h3>
                <div className="text-xs text-slate-500 mb-2">{l.title}</div>
                <div className="text-sm text-slate-600 line-clamp-2">{l.explanation}</div>
                <div className="flex items-center gap-2 mt-4 text-primary-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Học ngay <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

function GrammarDetail({ lesson, onBack, onStartExercise }: { lesson: GrammarLesson; onBack: () => void; onStartExercise: () => void }) {
  const examples = typeof lesson.examples === 'string' ? JSON.parse(lesson.examples || '[]') : (lesson.examples || []);
  const exercises = typeof lesson.exercises === 'string' ? JSON.parse(lesson.exercises || '[]') : (lesson.exercises || []);

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="btn-ghost mb-6">
          <ChevronLeft className="w-4 h-4" /> {VI.back}
        </button>

        <div className="card mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="badge bg-blue-50 text-blue-700">{lesson.level}</span>
            <span className="badge bg-slate-100">{CATEGORIES.find((c) => c.value === lesson.category)?.label}</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">{lesson.titleVi}</h1>
          <div className="text-sm text-slate-500 mt-1">{lesson.title}</div>
        </div>

        {/* Explanation */}
        <div className="card mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-primary-500" />
            <h2 className="font-bold text-slate-900">{VI.grammar.explanation}</h2>
          </div>
          <div className="text-slate-700 leading-relaxed whitespace-pre-line">{lesson.explanation}</div>
        </div>

        {/* Formula */}
        {lesson.formula && (
          <div className="card mb-6">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-purple-500" />
              <h2 className="font-bold text-slate-900">{VI.grammar.formula}</h2>
            </div>
            <div className="font-mono text-sm bg-slate-900 text-green-400 p-4 rounded-xl whitespace-pre-line">
              {lesson.formula}
            </div>
          </div>
        )}

        {/* Examples */}
        {examples.length > 0 && (
          <div className="card mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <h2 className="font-bold text-slate-900">{VI.grammar.examples}</h2>
            </div>
            <div className="space-y-3">
              {examples.map((ex: { en: string; vi: string }, i: number) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50">
                  <div className="font-medium text-slate-900">🇬🇧 {ex.en}</div>
                  <div className="text-sm text-slate-600 mt-1">🇻🇳 {ex.vi}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {lesson.notes && (
          <div className="card mb-6 border-l-4 border-yellow-400">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">💡</span>
              <h2 className="font-bold text-slate-900">{VI.grammar.notes}</h2>
            </div>
            <div className="text-slate-700 leading-relaxed">{lesson.notes}</div>
          </div>
        )}

        {exercises.length > 0 && (
          <button onClick={onStartExercise} className="btn-primary w-full">
            <BookOpen className="w-4 h-4" /> {VI.grammar.startExercise}
          </button>
        )}
      </div>
    </AppShell>
  );
}

function GrammarExercise({ lesson, onBack, onDone }: { lesson: GrammarLesson; onBack: () => void; onDone: () => void }) {
  const exercises = typeof lesson.exercises === 'string' ? JSON.parse(lesson.exercises || '[]') : (lesson.exercises || []);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(-1);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const ex = exercises[idx];
  if (!ex) return null;

  const check = () => {
    if (selected === ex.answer) {
      setScore(score + 1);
      toast.success(VI.grammar.correct);
    } else {
      toast.error(VI.grammar.wrong);
    }
    setShowResult(true);
  };

  const next = async () => {
    if (idx < exercises.length - 1) {
      setIdx(idx + 1);
      setSelected(-1);
      setShowResult(false);
    } else {
      // Update progress
      await fetch('/api/grammar/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonSlug: lesson.slug, score: Math.round((score / exercises.length) * 100) })
      });
      toast.success(`${VI.grammar.score}: ${score}/${exercises.length}`);
      onDone();
    }
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="btn-ghost">
            <ChevronLeft className="w-4 h-4" /> {VI.back}
          </button>
          <div className="text-sm text-slate-600">{VI.grammar.exercises}: {idx + 1} / {exercises.length} · {VI.grammar.score}: {score}</div>
        </div>

        <div className="card">
          <div className="text-lg font-semibold text-slate-900 mb-6">{ex.question}</div>

          <div className="space-y-2 mb-4">
            {ex.options.map((opt: string, i: number) => {
              const isCorrect = i === ex.answer;
              const isSelected = i === selected;
              return (
                <button
                  key={i}
                  disabled={showResult}
                  onClick={() => setSelected(i)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border-2 transition-all",
                    !showResult && isSelected ? "border-primary-500 bg-primary-50"
                      : !showResult ? "border-slate-200 hover:border-slate-300"
                      : isCorrect ? "border-green-500 bg-green-50"
                      : isSelected ? "border-red-500 bg-red-50"
                      : "border-slate-200 opacity-60"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center font-semibold text-sm",
                      showResult && isCorrect ? "bg-green-500 text-white"
                        : showResult && isSelected ? "bg-red-500 text-white"
                        : isSelected ? "bg-primary-500 text-white"
                        : "bg-slate-100 text-slate-600"
                    )}>
                      {showResult && isCorrect ? <Check className="w-4 h-4" /> :
                       showResult && isSelected ? <X className="w-4 h-4" /> :
                       String.fromCharCode(65 + i)}
                    </div>
                    <span>{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 mb-4 animate-fade-in">
              <div className="text-sm font-semibold text-blue-900 mb-1">💡 {VI.grammar.explanationAnswer}:</div>
              <div className="text-sm text-blue-800">{ex.explanationVi}</div>
            </div>
          )}

          {!showResult ? (
            <button onClick={check} disabled={selected === -1} className="btn-primary w-full">
              {VI.grammar.checkAnswer}
            </button>
          ) : (
            <button onClick={next} className="btn-primary w-full">
              {idx === exercises.length - 1 ? VI.finish : VI.next}
            </button>
          )}
        </div>
      </div>
    </AppShell>
  );
}