'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { VI } from '@/lib/i18n';
import { Mail, Lock, User, Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError(VI.auth.passwordMismatch);
      return;
    }
    setLoading(true);
    const ok = await register(fullName, email, password);
    setLoading(false);
    if (ok) router.push('/placement');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-2xl">🇬🇧</div>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">{VI.auth.welcomeNew}</h2>
          <p className="text-slate-500 mt-2">Tạo tài khoản để bắt đầu hành trình học tiếng Anh</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 card">
          {error && <div className="p-3 rounded-xl bg-red-50 text-red-700 text-sm">{error}</div>}

          <div>
            <label className="label">{VI.auth.fullName}</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} required className="input pl-10" placeholder="Nguyễn Văn A" />
            </div>
          </div>

          <div>
            <label className="label">{VI.auth.email}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input pl-10" placeholder="email@example.com" />
            </div>
          </div>

          <div>
            <label className="label">{VI.auth.password}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="input pl-10" placeholder="Tối thiểu 6 ký tự" />
            </div>
          </div>

          <div>
            <label className="label">{VI.auth.confirmPassword}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="input pl-10" placeholder="Nhập lại mật khẩu" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : VI.auth.register}
          </button>

          <div className="text-center text-sm text-slate-600">
            {VI.auth.hasAccount}{' '}
            <Link href="/login" className="text-primary-600 font-semibold hover:underline">
              {VI.auth.loginNow}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}