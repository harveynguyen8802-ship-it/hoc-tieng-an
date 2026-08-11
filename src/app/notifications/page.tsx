'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { VI } from '@/lib/i18n';
import { Loading, EmptyState } from '@/components/States';
import { Bell, Check, BookOpen, Flame, Sparkles, Trophy, Target, RotateCw } from 'lucide-react';
import { cn, timeAgo } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Notif {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const ICON_MAP: Record<string, typeof Bell> = {
  reminder: Target,
  streak: Flame,
  'vocab-review': BookOpen,
  'new-lesson': Sparkles,
  achievement: Trophy,
  goal: Check
};

export default function NotificationsPage() {
  const [list, setList] = useState<Notif[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch('/api/notifications')
      .then((r) => r.json())
      .then((d) => setList(d.notifications || []))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const markAll = async () => {
    await fetch('/api/notifications', { method: 'POST' });
    load();
    toast.success(VI.success.updated);
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-8 h-8 text-primary-500" /> {VI.notification.title}
            </h1>
            <p className="text-slate-500 mt-1">Tất cả thông báo của bạn</p>
          </div>
          <button onClick={markAll} className="btn-secondary">
            <Check className="w-4 h-4" /> {VI.notification.markAllRead}
          </button>
        </div>

        {loading ? <Loading /> : list.length === 0 ? (
          <EmptyState icon={Bell} title={VI.notification.noNotif} />
        ) : (
          <div className="space-y-2">
            {list.map((n) => {
              const Icon = ICON_MAP[n.type] || Bell;
              return (
                <div
                  key={n.id}
                  className={cn(
                    "card flex items-start gap-4 p-4",
                    !n.read && "border-l-4 border-primary-500 bg-primary-50/30"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                    n.type === 'streak' ? "bg-orange-100 text-orange-600"
                      : n.type === 'achievement' ? "bg-yellow-100 text-yellow-600"
                      : n.type === 'goal' ? "bg-green-100 text-green-600"
                      : "bg-primary-100 text-primary-600"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-900">{n.title}</div>
                    <div className="text-sm text-slate-600 mt-1">{n.message}</div>
                    <div className="text-xs text-slate-400 mt-2">{timeAgo(n.createdAt)}</div>
                  </div>
                  {!n.read && <div className="w-2 h-2 rounded-full bg-primary-500 mt-2" />}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}