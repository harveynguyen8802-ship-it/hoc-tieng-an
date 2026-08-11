'use client';

import { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { VI } from '@/lib/i18n';
import { Mic, Send, Sparkles, Volume2, CheckCircle2, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

interface Feedback {
  score: number;
  pronunciation: number;
  fluency: number;
  grammar: number;
  vocabulary: number;
  sentenceStructure: number;
  naturalness: number;
  corrected: string;
  moreNatural: string;
  explanation: string;
}

const TOPICS = [
  { value: 'introduce', label: VI.speaking.topics.introduce, prompt: 'Please introduce yourself in 2-3 sentences.' },
  { value: 'work', label: VI.speaking.topics.work, prompt: 'Tell me about your current job or field of study.' },
  { value: 'family', label: VI.speaking.topics.family, prompt: 'Describe your family.' },
  { value: 'travel', label: VI.speaking.topics.travel, prompt: 'Talk about a place you want to visit.' },
  { value: 'shopping', label: VI.speaking.topics.shopping, prompt: 'How do you usually shop - online or in stores?' },
  { value: 'restaurant', label: VI.speaking.topics.restaurant, prompt: 'Describe your favorite restaurant.' },
  { value: 'office', label: VI.speaking.topics.office, prompt: 'What is your typical workday like?' },
  { value: 'interview', label: VI.speaking.topics.interview, prompt: 'Why should we hire you?' },
  { value: 'daily', label: VI.speaking.topics.daily, prompt: 'Describe your daily routine.' }
];

const SKILLS = [
  { key: 'pronunciation', label: VI.speaking.pronunciation, color: 'bg-blue-500' },
  { key: 'fluency', label: VI.speaking.fluency, color: 'bg-cyan-500' },
  { key: 'grammar', label: VI.speaking.grammar, color: 'bg-purple-500' },
  { key: 'vocabulary', label: VI.speaking.vocabulary, color: 'bg-pink-500' },
  { key: 'sentenceStructure', label: VI.speaking.sentenceStructure, color: 'bg-orange-500' },
  { key: 'naturalness', label: VI.speaking.naturalness, color: 'bg-green-500' }
];

export default function SpeakingPage() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const analyze = async () => {
    if (!text.trim()) {
      toast.error('Vui lòng nhập câu trả lời');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/speaking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userText: text, topic: topic.value })
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

  const speak = () => {
    if ('speechSynthesis' in window && text) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      speechSynthesis.speak(u);
    }
  };

  const tryAnother = () => {
    setText('');
    setFeedback(null);
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Mic className="w-8 h-8 text-pink-500" /> {VI.speaking.title}
          </h1>
          <p className="text-slate-500 mt-1">Luyện nói với AI - nhận phản hồi chi tiết sau mỗi câu</p>
        </div>

        {/* Topic selector */}
        <div className="card mb-4">
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((t) => (
              <button
                key={t.value}
                onClick={() => { setTopic(t); setFeedback(null); }}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                  topic.value === t.value ? "bg-pink-500 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Prompt */}
        <div className="card mb-4 border-l-4 border-pink-400">
          <div className="text-sm font-semibold text-slate-500 mb-1">📝 Đề bài:</div>
          <div className="text-lg font-medium text-slate-900">{topic.prompt}</div>
        </div>

        {/* Input */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="label !mb-0">{VI.speaking.recordOrType}</label>
            <button onClick={speak} className="btn-ghost text-sm">
              <Volume2 className="w-4 h-4" /> Nghe đề bài
            </button>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={VI.speaking.placeholder}
            rows={4}
            className="input resize-none"
          />
          <div className="flex justify-between items-center mt-3">
            <div className="text-xs text-slate-500">{text.length} ký tự</div>
            <div className="flex gap-2">
              {feedback && <button onClick={tryAnother} className="btn-secondary"><RefreshCw className="w-4 h-4" /> {VI.speaking.tryAnother}</button>}
              <button onClick={analyze} disabled={loading || !text.trim()} className="btn-primary">
                <Sparkles className="w-4 h-4" /> {loading ? 'Đang phân tích...' : VI.speaking.analyze}
              </button>
            </div>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="space-y-4 animate-fade-in">
            {/* Score */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <h2 className="font-bold text-slate-900">Đánh giá tổng quan</h2>
              </div>
              <div className="text-center mb-6">
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

            {/* Original vs Corrected */}
            <div className="card">
              <h3 className="font-bold text-slate-900 mb-3">So sánh câu</h3>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                  <div className="text-xs font-semibold text-red-700 mb-1">❌ {VI.speaking.yourText}</div>
                  <div className="text-slate-900">{text}</div>
                </div>
                <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                  <div className="text-xs font-semibold text-green-700 mb-1">✅ {VI.speaking.corrected}</div>
                  <div className="text-slate-900">{feedback.corrected}</div>
                </div>
                {feedback.moreNatural !== feedback.corrected && (
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                    <div className="text-xs font-semibold text-blue-700 mb-1">⭐ {VI.speaking.moreNatural}</div>
                    <div className="text-slate-900">{feedback.moreNatural}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Explanation */}
            <div className="card border-l-4 border-yellow-400">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                <h3 className="font-bold text-slate-900">{VI.speaking.explanation}</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">{feedback.explanation}</p>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}