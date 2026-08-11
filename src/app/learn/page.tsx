'use client';

import { AppShell } from '@/components/AppShell';
import { VI } from '@/lib/i18n';
import Link from 'next/link';
import { Brain, Headphones, Mic, Newspaper, PenLine, FileText, Target, Bot, Sparkles, BookOpen, BarChart3 } from 'lucide-react';

const MODULES = [
  { href: '/vocabulary', icon: Brain, label: VI.menu.vocabulary, desc: 'Học từ vựng với Spaced Repetition', color: 'from-purple-500 to-pink-500' },
  { href: '/grammar', icon: FileText, label: VI.menu.grammar, desc: 'Ngữ pháp từ cơ bản đến nâng cao', color: 'from-blue-500 to-cyan-500' },
  { href: '/listening', icon: Headphones, label: VI.menu.listening, desc: 'Luyện nghe theo trình độ', color: 'from-orange-500 to-red-500' },
  { href: '/speaking', icon: Mic, label: VI.menu.speaking, desc: 'Luyện nói với AI feedback', color: 'from-pink-500 to-rose-500' },
  { href: '/reading', icon: Newspaper, label: VI.menu.reading, desc: 'Đọc hiểu đa dạng chủ đề', color: 'from-green-500 to-emerald-500' },
  { href: '/writing', icon: PenLine, label: VI.menu.writing, desc: 'Luyện viết với AI chấm', color: 'from-orange-400 to-yellow-500' },
  { href: '/ai-conversation', icon: Bot, label: VI.menu.aiConversation, desc: 'Trò chuyện với AI theo vai trò', color: 'from-indigo-500 to-purple-500' },
  { href: '/toeic', icon: Target, label: VI.menu.toeic, desc: 'Luyện thi TOEIC mini & full test', color: 'from-red-500 to-orange-500' }
];

export default function LearnPage() {
  return (
    <AppShell>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary-500" /> {VI.menu.learning}
          </h1>
          <p className="text-slate-500 mt-1">Chọn kỹ năng bạn muốn luyện tập hôm nay</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODULES.map((m) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.href}
                href={m.href}
                className="card group relative overflow-hidden hover:scale-[1.02] transition-transform"
              >
                <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br ${m.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white mb-4`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">{m.label}</h3>
                <p className="text-sm text-slate-500">{m.desc}</p>
              </Link>
            );
          })}
        </div>

        <div className="card mt-6 gradient-bg text-white">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-bold">Gợi ý từ AI</h3>
          </div>
          <p>Hãy dành ít nhất 30 phút mỗi ngày để học liên tục. AI sẽ phân tích điểm mạnh yếu và đề xuất lộ trình tối ưu cho bạn.</p>
        </div>
      </div>
    </AppShell>
  );
}