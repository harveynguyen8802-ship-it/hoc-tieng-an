'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { VI } from '@/lib/i18n';
import { Mail, Lock, Loader2, Sparkles, BookOpen, Users, Trophy } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 gradient-bg items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-lg text-white relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur text-sm mb-6">
            <Sparkles className="w-4 h-4" /> AI Cá nhân hóa
          </div>
          <h1 className="text-5xl font-bold leading-tight mb-4">
            Học tiếng Anh thông minh<br />cùng AI
          </h1>
          <p className="text-lg text-white/90 mb-12">
            Lộ trình được cá nhân hóa hoàn toàn cho bạn. Từ cơ bản đến TOEIC/IELTS, mọi thứ đều được thiết kế riêng.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <BookOpen className="w-6 h-6 mb-2" />
              <div className="font-semibold text-sm">Lộ trình AI</div>
              <div className="text-xs text-white/80 mt-1">Cá nhân hóa</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <Users className="w-6 h-6 mb-2" />
              <div className="font-semibold text-sm">Trò chuyện AI</div>
              <div className="text-xs text-white/80 mt-1">7+ vai trò</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <Trophy className="w-6 h-6 mb-2" />
              <div className="font-semibold text-sm">Gamification</div>
              <div className="text-xs text-white/80 mt-1">XP, Streak</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4 lg:hidden">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-2xl">🇬🇧</div>
            </div>
            <h2 className="text-3xl font-bold text-slate-900">{VI.auth.welcomeBack}</h2>
            <p className="text-slate-500 mt-2">{VI.auth.login} để tiếp tục hành trình của bạn</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">{VI.auth.email}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input pl-10"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="label">{VI.auth.password}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input pl-10"
                  placeholder="••••••"
                />
              </div>
            </div>

            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-primary-600 hover:underline">
                {VI.auth.forgotPassword}?
              </Link>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : VI.auth.login}
            </button>

            <div className="text-center text-sm text-slate-600">
              {VI.auth.noAccount}{' '}
              <Link href="/register" className="text-primary-600 font-semibold hover:underline">
                {VI.auth.registerNow}
              </Link>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100">
              <div className="text-xs font-semibold text-blue-900 mb-2">Tài khoản demo:</div>
              <div className="text-xs text-blue-700 space-y-1">
                <div>👤 User: <code className="font-mono">demo@hoctiengan.ai</code> / <code className="font-mono">user123</code></div>
                <div>🛡️ Admin: <code className="font-mono">admin@hoctiengan.ai</code> / <code className="font-mono">admin123</code></div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}