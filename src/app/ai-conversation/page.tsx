'use client';

import { useEffect, useRef, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { VI } from '@/lib/i18n';
import { Bot, Send, Languages, Plus, Loader2, Sparkles, User as UserIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  vi?: string;
}

const ROLES = [
  { value: 'friend', label: VI.aiConv.roles.friend, emoji: '😊', color: 'bg-pink-500' },
  { value: 'teacher', label: VI.aiConv.roles.teacher, emoji: '👨‍🏫', color: 'bg-blue-500' },
  { value: 'colleague', label: VI.aiConv.roles.colleague, emoji: '👔', color: 'bg-purple-500' },
  { value: 'recruiter', label: VI.aiConv.roles.recruiter, emoji: '💼', color: 'bg-orange-500' },
  { value: 'customer', label: VI.aiConv.roles.customer, emoji: '🛍️', color: 'bg-green-500' },
  { value: 'restaurant', label: VI.aiConv.roles.restaurant, emoji: '🍽️', color: 'bg-red-500' },
  { value: 'airport', label: VI.aiConv.roles.airport, emoji: '✈️', color: 'bg-cyan-500' }
];

export default function AIConversationPage() {
  const [role, setRole] = useState(ROLES[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [explainVi, setExplainVi] = useState(true);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const startNew = async (r: typeof ROLES[number]) => {
    setRole(r);
    setMessages([]);
    setConversationId(null);
    const res = await fetch('/api/ai-conversation/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: r.value, topic: 'free' })
    });
    const data = await res.json();
    setConversationId(data.conversation?.id);
    // Initial greeting
    const greetings: Record<string, string> = {
      friend: "Hey! How's it going? What did you do today?",
      teacher: "Hello! I'm glad to help you practice English today. How are you feeling?",
      colleague: "Hi there! How's the project going?",
      recruiter: "Welcome! Thank you for coming. Could you tell me about yourself?",
      customer: "Excuse me, could you help me? I'm looking for something.",
      restaurant: "Good evening! Welcome. Table for how many?",
      airport: "Good morning. May I see your passport?"
    };
    setMessages([{ role: 'assistant', content: greetings[r.value] || greetings.friend, vi: 'Xin chào, mình đang chờ bạn trả lời nhé.' }]);
  };

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/ai-conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: role.value,
          topic: 'free',
          userMessage: input,
          conversationId,
          messages: messages.concat(userMsg)
        })
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || VI.errors.generic);
        return;
      }
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply.en, vi: data.reply.vi }]);
      if (data.conversationId) setConversationId(data.conversationId);
    } catch {
      toast.error(VI.errors.network);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    startNew(ROLES[0]);
  }, []);

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Bot className="w-8 h-8 text-primary-500" /> {VI.aiConv.title}
          </h1>
          <p className="text-slate-500 mt-1">Luyện giao tiếp với AI theo nhiều vai trò khác nhau</p>
        </div>

        {/* Role selector */}
        <div className="card mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-slate-700">{VI.aiConv.selectRole}:</div>
            <button onClick={() => startNew(role)} className="btn-ghost text-sm">
              <Plus className="w-4 h-4" /> {VI.aiConv.newConversation}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {ROLES.map((r) => (
              <button
                key={r.value}
                onClick={() => startNew(r)}
                className={cn(
                  "px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2",
                  role.value === r.value ? `${r.color} text-white` : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}
              >
                <span>{r.emoji}</span>{r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="card p-0 overflow-hidden flex flex-col" style={{ height: '60vh' }}>
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-lg", role.color)}>{role.emoji}</div>
              <div>
                <div className="font-semibold text-slate-900 text-sm">{role.label}</div>
                <div className="text-xs text-green-500">● Đang hoạt động</div>
              </div>
            </div>
            <button
              onClick={() => setExplainVi(!explainVi)}
              className={cn("btn-ghost text-xs", explainVi && "bg-primary-50 text-primary-700")}
            >
              <Languages className="w-4 h-4" /> {VI.aiConv.explainInVietnamese}
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex gap-2", m.role === 'user' ? "justify-end" : "justify-start")}>
                {m.role === 'assistant' && (
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0", role.color)}>
                    {role.emoji}
                  </div>
                )}
                <div className={cn("max-w-[80%] space-y-1")}>
                  <div className={cn(
                    "rounded-2xl px-4 py-2.5",
                    m.role === 'user' ? "bg-primary-500 text-white" : "bg-slate-100 text-slate-900"
                  )}>
                    <div>{m.content}</div>
                  </div>
                  {explainVi && m.vi && m.role === 'assistant' && (
                    <div className="text-xs text-slate-500 italic px-2">🇻🇳 {m.vi}</div>
                  )}
                </div>
                {m.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-primary-200 flex items-center justify-center flex-shrink-0">
                    <UserIcon className="w-4 h-4 text-primary-700" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2">
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white", role.color)}>{role.emoji}</div>
                <div className="bg-slate-100 rounded-2xl px-4 py-2.5 text-slate-500 text-sm flex items-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin" /> {VI.aiConv.aiTyping}
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-100">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder={VI.aiConv.typeMessage}
                className="input flex-1"
              />
              <button onClick={send} disabled={!input.trim() || loading} className="btn-primary">
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> {VI.aiConv.explainNote}
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}