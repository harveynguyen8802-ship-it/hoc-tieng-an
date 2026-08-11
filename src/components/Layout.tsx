'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { VI } from '@/lib/i18n';
import { useAuth } from '@/lib/auth-context';
import {
  Home, BookOpen, Brain, FileText, Headphones, Mic, Newspaper, PenLine,
  Bot, Target, BarChart3, User, LogOut, Menu, X, Shield, Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

const MENU_ITEMS = [
  { href: '/dashboard', label: VI.menu.home, icon: Home },
  { href: '/learn', label: VI.menu.learning, icon: BookOpen },
  { href: '/vocabulary', label: VI.menu.vocabulary, icon: Brain },
  { href: '/grammar', label: VI.menu.grammar, icon: FileText },
  { href: '/listening', label: VI.menu.listening, icon: Headphones },
  { href: '/speaking', label: VI.menu.speaking, icon: Mic },
  { href: '/reading', label: VI.menu.reading, icon: Newspaper },
  { href: '/writing', label: VI.menu.writing, icon: PenLine },
  { href: '/ai-conversation', label: VI.menu.aiConversation, icon: Bot },
  { href: '/toeic', label: VI.menu.toeic, icon: Target },
  { href: '/progress', label: VI.menu.progress, icon: BarChart3 },
  { href: '/profile', label: VI.menu.account, icon: User }
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <>
      {open && <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={onClose} />}
      <aside className={cn(
        "fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-slate-100 flex flex-col z-40 transition-transform duration-300",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white text-xl">🇬🇧</div>
            <div>
              <div className="font-bold text-slate-900 leading-tight">Học Tiếng Anh</div>
              <div className="text-xs text-slate-500">AI Cá nhân hóa</div>
            </div>
          </Link>
          <button onClick={onClose} className="lg:hidden text-slate-500"><X className="w-5 h-5" /></button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 my-0.5 rounded-xl text-sm font-medium transition-all",
                  active ? "bg-primary-50 text-primary-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon className={cn("w-5 h-5", active ? "text-primary-600" : "")} />
                <span className="flex-1">{item.label}</span>
              </Link>
            );
          })}

          {user?.role === 'ADMIN' && (
            <Link
              href="/admin"
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 my-0.5 rounded-xl text-sm font-medium transition-all",
                pathname === '/admin' ? "bg-red-50 text-red-700" : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <Shield className="w-5 h-5" />
              <span className="flex-1">{VI.menu.admin}</span>
            </Link>
          )}
        </nav>

        <div className="p-3 border-t border-slate-100">
          {user && (
            <div className="flex items-center gap-3 px-3 py-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-slate-900 truncate">{user.fullName}</div>
                <div className="text-xs text-slate-500">{user.currentLevel} · {user.xp} XP</div>
              </div>
              <button onClick={handleLogout} title={VI.menu.logout} className="text-slate-400 hover:text-red-500 transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export function Header({ onMenuClick, unreadCount }: { onMenuClick: () => void; unreadCount?: number }) {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-slate-100">
      <div className="flex items-center justify-between px-4 lg:px-8 h-16">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="lg:hidden text-slate-700">
            <Menu className="w-6 h-6" />
          </button>
          <div className="lg:hidden font-bold text-slate-900">Học Tiếng Anh AI</div>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <>
              <div className="hidden md:flex items-center gap-4 px-3 py-1.5 rounded-full bg-slate-50">
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="text-orange-500">🔥</span>
                  <span className="font-semibold text-slate-700">{user.streak}</span>
                </div>
                <div className="w-px h-4 bg-slate-200" />
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-semibold text-slate-700">{user.xp} XP</span>
                </div>
              </div>

              <button
                onClick={() => router.push('/notifications')}
                className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount && unreadCount > 0 ? (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
                ) : null}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="lg:hidden p-2 text-slate-700">
      <Menu className="w-6 h-6" />
    </button>
  );
}