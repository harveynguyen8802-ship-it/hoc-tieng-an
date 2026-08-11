'use client';

import { useEffect, useState, useRef } from 'react';
import { AppShell } from '@/components/AppShell';
import { VI } from '@/lib/i18n';
import { Loading, EmptyState } from '@/components/States';
import { Headphones, Play, Pause, Volume2, ChevronLeft, Eye, EyeOff, RotateCcw, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface ListeningLesson {
  id?: string;
  title: string;
  titleVi: string;
  level: string;
  topic: string;
  duration: number;
  transcript: string;
  transcriptVi: string;
  questions?: { type?: string; q: string; options?: string[]; answer: number | string }[] | string;
}

const LEVEL_LABEL: Record<string, string> = {
  Beginner: VI.listening.levels.Beginner,
  Elementary: VI.listening.levels.Elementary,
  Intermediate: VI.listening.levels.Intermediate,
  'Upper Intermediate': VI.listening.levels['Upper Intermediate'],
  Advanced: VI.listening.levels.Advanced
};

export default function ListeningPage() {
  const [lessons, setLessons] = useState<ListeningLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ListeningLesson | null>(null);

  useEffect(() => {
    fetch('/api/listening')
      .then((r) => r.json())
      .then((d) => setLessons(d.lessons || []))
      .finally(() => setLoading(false));
  }, []);

  if (selected) return <ListeningPlayer lesson={selected} onBack={() => setSelected(null)} />;

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Headphones className="w-8 h-8 text-orange-500" /> {VI.listening.title}
          </h1>
          <p className="text-slate-500 mt-1">Luyện nghe theo từng trình độ với audio và transcript</p>
        </div>

        {loading ? <Loading /> : lessons.length === 0 ? (
          <EmptyState icon={Headphones} title="Chưa có bài nghe" />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lessons.map((l, i) => (
              <button
                key={i}
                onClick={() => setSelected(l)}
                className="card text-left group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                    <Headphones className="w-6 h-6" />
                  </div>
                  <span className="badge bg-orange-50 text-orange-700">{LEVEL_LABEL[l.level] || l.level}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{l.titleVi}</h3>
                <div className="text-xs text-slate-500 mb-3">{l.title}</div>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span>⏱️ {l.duration}s</span>
                  <span>📚 {l.topic}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

function ListeningPlayer({ lesson, onBack }: { lesson: ListeningLesson; onBack: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showVi, setShowVi] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const questions = typeof lesson.questions === 'string' ? JSON.parse(lesson.questions || '[]') : (lesson.questions || []);
  const sentences = lesson.transcript.split(/[.!?]/).filter((s) => s.trim().length > 0);

  const speak = (text?: string) => {
    const u = text || sentences[currentIdx] || lesson.transcript;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(u);
      utterance.lang = 'en-US';
      utterance.rate = rate;
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
    } else {
      toast.error('Trình duyệt không hỗ trợ');
    }
  };

  const stop = () => {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const nextSentence = () => {
    if (currentIdx < sentences.length - 1) {
      setCurrentIdx(currentIdx + 1);
      speak(sentences[currentIdx + 1]);
    }
  };

  const prevSentence = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      speak(sentences[currentIdx - 1]);
    }
  };

  const repeat = () => speak(sentences[currentIdx]);

  const complete = async () => {
    await fetch('/api/listening/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonId: lesson.id, score: 100 })
    });
    toast.success(VI.success.completed);
    onBack();
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="btn-ghost mb-6">
          <ChevronLeft className="w-4 h-4" /> {VI.back}
        </button>

        <div className="card mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="badge bg-orange-50 text-orange-700">{LEVEL_LABEL[lesson.level] || lesson.level}</span>
            <span className="badge bg-slate-100">{lesson.topic}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{lesson.titleVi}</h1>
          <div className="text-sm text-slate-500">{lesson.title}</div>
        </div>

        {/* Player controls */}
        <div className="card mb-6">
          <div className="text-xs text-slate-500 mb-2 text-center">{VI.listening.playSentence} {currentIdx + 1}/{sentences.length}</div>
          <div className="p-4 rounded-xl bg-slate-50 text-center mb-4">
            <div className="text-lg font-medium text-slate-900">{sentences[currentIdx]}</div>
          </div>

          <div className="flex justify-center items-center gap-2 mb-3">
            <button onClick={prevSentence} className="btn-secondary !p-2.5"><ChevronLeft className="w-4 h-4" /></button>
            {isPlaying ? (
              <button onClick={stop} className="btn-primary !p-3"><Pause className="w-5 h-5" /></button>
            ) : (
              <button onClick={() => speak(sentences[currentIdx])} className="btn-primary !p-3"><Play className="w-5 h-5" /></button>
            )}
            <button onClick={repeat} className="btn-secondary !p-2.5"><RotateCcw className="w-4 h-4" /></button>
            <button onClick={nextSentence} className="btn-secondary !p-2.5"><ChevronLeft className="w-4 h-4 rotate-180" /></button>
          </div>

          <div className="flex justify-center items-center gap-3 text-sm">
            <span className="text-slate-500">{VI.listening.slow}:</span>
            {[0.5, 0.75, 1].map((r) => (
              <button
                key={r}
                onClick={() => { setRate(r); speak(sentences[currentIdx]); }}
                className={cn("px-3 py-1 rounded-lg text-xs font-medium", rate === r ? "bg-primary-500 text-white" : "bg-slate-100 text-slate-700")}
              >
                {r}x
              </button>
            ))}
          </div>
        </div>

        {/* Transcript toggle */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button onClick={() => setShowTranscript(!showTranscript)} className="btn-secondary">
            {showTranscript ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showTranscript ? VI.listening.hideTranscript : VI.listening.showTranscript}
          </button>
          <button onClick={() => setShowVi(!showVi)} className="btn-secondary">
            {showVi ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showVi ? 'Ẩn dịch' : VI.listening.translation}
          </button>
        </div>

        {showTranscript && (
          <div className="card mb-6">
            <h3 className="font-bold text-slate-900 mb-3">{VI.listening.transcript}</h3>
            <div className="text-slate-700 leading-relaxed whitespace-pre-line">
              {showVi ? lesson.transcriptVi : lesson.transcript}
            </div>
          </div>
        )}

        {/* Questions */}
        {questions.length > 0 && (
          <div className="card mb-6">
            <h3 className="font-bold text-slate-900 mb-4">{VI.listening.questions}</h3>
            <div className="space-y-4">
              {questions.map((q: { q: string; options?: string[]; answer: number | string }, i: number) => {
                const userAns = answers[i];
                const isCorrect = userAns === q.answer;
                return (
                  <div key={i} className="p-4 rounded-xl bg-slate-50">
                    <div className="font-medium text-slate-900 mb-3">{i + 1}. {q.q}</div>
                    {q.options && (
                      <div className="grid grid-cols-2 gap-2">
                        {q.options.map((opt, j) => (
                          <button
                            key={j}
                            disabled={showResult}
                            onClick={() => setAnswers({ ...answers, [i]: j })}
                            className={cn(
                              "p-2.5 rounded-lg border-2 text-sm text-left transition-all",
                              !showResult && userAns === j ? "border-primary-500 bg-primary-50"
                                : !showResult ? "border-slate-200 hover:border-slate-300"
                                : j === q.answer ? "border-green-500 bg-green-50"
                                : userAns === j ? "border-red-500 bg-red-50"
                                : "border-slate-200 opacity-60"
                            )}
                          >
                            {String.fromCharCode(65 + j)}. {opt}
                          </button>
                        ))}
                      </div>
                    )}
                    {showResult && (
                      <div className={cn("mt-2 text-sm font-medium flex items-center gap-2", isCorrect ? "text-green-600" : "text-red-600")}>
                        {isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        {isCorrect ? VI.grammar.correct : VI.grammar.wrong}
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
              <button onClick={complete} className="btn-primary w-full mt-4">
                {VI.finish}
              </button>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}