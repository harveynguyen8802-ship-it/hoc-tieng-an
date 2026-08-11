'use client';

import { useState } from 'react';
import Link from 'next/link';
import { VI } from '@/lib/i18n';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6">
          <ArrowLeft className="w-4 h-4" /> {VI.back}
        </Link>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">{VI.auth.forgotPassword}</h2>
          <p className="text-slate-500 mt-2">{VI.auth.forgotPasswordHint}</p>
        </div>

        {sent ? (
          <div className="card text-center animate-fade-in">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <div className="font-semibold text-slate-900">Đã gửi liên kết!</div>
            <p className="text-sm text-slate-600 mt-2">Vui lòng kiểm tra email của bạn.</p>
            <Link href="/login" className="btn-secondary mt-6">{VI.auth.login}</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 card">
            <div>
              <label className="label">{VI.auth.email}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input pl-10" placeholder="email@example.com" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : VI.auth.sendResetLink}
            </button>
            <div className="text-center text-sm text-slate-600">
              {VI.auth.hasAccount}{' '}
              <Link href="/login" className="text-primary-600 font-semibold hover:underline">{VI.auth.loginNow}</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}