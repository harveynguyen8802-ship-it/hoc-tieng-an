'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar, Header } from '@/components/Layout';
import { useAuth } from '@/lib/auth-context';

export function AppShell({ children, requireAuth = true }: { children: ReactNode; requireAuth?: boolean }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!loading && requireAuth && !user) router.push('/login');
  }, [user, loading, requireAuth, router]);

  useEffect(() => {
    if (user) {
      fetch('/api/notifications/unread-count')
        .then((r) => r.ok ? r.json() : { count: 0 })
        .then((d) => setUnreadCount(d.count || 0))
        .catch(() => {});
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-slate-500">Đang tải...</div>
      </div>
    );
  }

  if (requireAuth && !user) return null;

  return (
    <div className="min-h-screen flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} unreadCount={unreadCount} />
        <main className="flex-1 p-4 lg:p-8 animate-fade-in">{children}</main>
      </div>
    </div>
  );
}