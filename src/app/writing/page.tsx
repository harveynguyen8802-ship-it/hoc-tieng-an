'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { VI } from '@/lib/i18n';
import { PenLine, Sparkles, CheckCircle2, RefreshCw, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

interface Feedback {
  score: number;
  grammar: number;
  spelling: number;
  vocabulary: number;
  structure: number;
  coherence: number;
  naturalness: number;
  corrected: string;
  moreNatural: string;
  explanation: string;
}

const SKILLS = [
  { key: 'grammar', label: VI.writing.grammar, color: 'bg-purple-500' },
  { key: 'spelling', label: VI.writing.spelling, color: 'bg-blue-500' },
  { key: 'vocabulary', label: VI.writing.vocabulary, color: 'bg-pink-500' },
  { key: 'structure', label: VI.writing.structure, color: 'bg-orange-500' },
  { key: 'coherence', label: VI.writing.coherence, color: 'bg-cyan-500' },
  { key: 'naturalness', label: VI.writing.naturalness, color: 'bg-green-500' }
];

export default function WritingPage() {
  const [prompts, setPrompts] = useState<string[]>([]);
  const [prompt, setPrompt] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    fetch('/api/writing').then((r) => r.json()).then((d) => {
      setPrompts(d.prompts || []);
      if (d.prompts?.length > 0) setPrompt(d.prompts[0]);
    });
  }, []);

  const analyze = async () => {
    if (!content.trim() || content.length < 20) {
      toast.error('Vui lòng viết ít nhất 20 ký tự');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, content })
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || VI.errors.generic);
        return;
      }
      setFeedback(data.feedback);
    } catch {
      toast.error(VI.errors.network);
    } finally {
      setLoading(false);
    }
  };

  const tryAnother = () => {
    setContent('');
    setFeedback(null);
    if (prompts.length > 1) {
      const next = prompts[(prompts.indexOf(prompt) + 1) % prompts.length];
      setPrompt(next);
    }
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <PenLine className="w-8 h-8 text-orange-500" /> {VI.writing.title}
          </h1>
          <p className="text-slate-500 mt-1">Viết và nhận phản hồi chi tiết từ AI</p>
        </div>

        {/* Prompt */}
        <div className="card mb-4 border-l-4 border-orange-400">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold text-slate-500">{VI.writing.prompt}:</span>
          </div>
          <div className="text-lg font-medium text-slate-900">{prompt}</div>
          <button onClick={tryAnother} className="btn-ghost text-xs mt-2">
            <RefreshCw className="w-3 h-3" /> Đề bài khác
          </button>
        </div>

        {/* Writing area */}
        <div className="card mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={VI.writing.placeholder}
            rows={10}
            className="input resize-none font-mono text-sm"
          />
          <div className="flex items-center justify-between mt-3">
            <div className="text-xs text-slate-500">{content.length} ký tự · {content.trim().split(/\s+/).filter(Boolean).length} từ</div>
            <button onClick={analyze} disabled={loading} className="btn-primary">
              <Sparkles className="w-4 h-4" /> {loading ? 'Đang phân tích...' : VI.writing.analyze}
            </button>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="space-y-4 animate-fade-in">
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <h2 className="font-bold text-slate-900">{VI.writing.score}</h2>
              </div>
              <div className="text-center mb-4">
                <div className="text-6xl font-bold gradient-text">{feedback.score}</div>
                <div className="text-slate-500 text-sm mt-1">điểm / 100</div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {SKILLS.map((s) => (
                  <div key={s.key} className="p-3 rounded-xl bg-slate-50">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-slate-700">{s.label}</span>
                      <span className="font-semibold text-slate-900">{(feedback as any)[s.key]}</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className={cn("h-full transition-all", s.color)} style={{ width: `${(feedback as any)[s.key]}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="font-bold text-slate-900 mb-3">So sánh bài viết</h3>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                  <div className="text-xs font-semibold text-red-700 mb-2">❌ {VI.writing.yourText}</div>
                  <div className="text-slate-900 whitespace-pre-wrap">{content}</div>
                </div>
                {feedback.corrected !== content && (
                  <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                    <div className="text-xs font-semibold text-green-700 mb-2">✅ {VI.writing.corrected}</div>
                    <div className="text-slate-900 whitespace-pre-wrap">{feedback.corrected}</div>
                  </div>
                )}
                {feedback.moreNatural && feedback.moreNatural !== feedback.corrected && (
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                    <div className="text-xs font-semibold text-blue-700 mb-2">⭐ {VI.writing.moreNatural}</div>
                    <div className="text-slate-900 whitespace-pre-wrap">{feedback.moreNatural}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="card border-l-4 border-yellow-400">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                <h3 className="font-bold text-slate-900">{VI.writing.explanation}</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">{feedback.explanation}</p>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}