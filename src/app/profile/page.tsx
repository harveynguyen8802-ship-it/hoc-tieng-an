'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { useAuth } from '@/lib/auth-context';
import { VI } from '@/lib/i18n';
import { Loading } from '@/components/States';
import { User, Mail, Lock, Target, Clock, Award, Sparkles, Save, KeyRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    fullName: '', currentLevel: 'A1', targetLevel: 'B1',
    targetExam: 'NONE', targetScore: 600, dailyMinutes: 30
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '', newPassword: '', confirmPassword: ''
  });
  const [tab, setTab] = useState<'profile' | 'password' | 'avatar'>('profile');

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName,
        currentLevel: user.currentLevel,
        targetLevel: user.targetLevel || 'B1',
        targetExam: user.targetExam || 'NONE',
        targetScore: user.targetScore || 600,
        dailyMinutes: user.dailyMinutes
      });
    }
  }, [user]);

  if (!user) return <AppShell><Loading /></AppShell>;

  const save = async () => {
    await updateProfile(form);
  };

  const changePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error(VI.auth.passwordMismatch);
      return;
    }
    await updateProfile(passwordForm);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const avatarSeed = user.fullName.charAt(0).toUpperCase();

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <User className="w-8 h-8 text-primary-500" /> {VI.profile.title}
          </h1>
          <p className="text-slate-500 mt-1">Quản lý thông tin cá nhân và mục tiêu học tập</p>
        </div>

        {/* Avatar + Info */}
        <div className="card mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-3xl font-bold">
              {avatarSeed}
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">{user.fullName}</div>
              <div className="text-sm text-slate-500">{user.email}</div>
              <div className="flex gap-2 mt-2">
                <span className="badge bg-primary-50 text-primary-700">{user.currentLevel}</span>
                <span className="badge bg-yellow-50 text-yellow-700">⭐ {user.xp} XP</span>
                <span className="badge bg-orange-50 text-orange-700">🔥 {user.streak}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button onClick={() => setTab('profile')} className={cn("px-4 py-2 rounded-xl text-sm font-medium", tab === 'profile' ? "bg-primary-500 text-white" : "bg-white text-slate-700 border border-slate-200")}>
            <User className="w-4 h-4 inline mr-1" /> Hồ sơ
          </button>
          <button onClick={() => setTab('password')} className={cn("px-4 py-2 rounded-xl text-sm font-medium", tab === 'password' ? "bg-primary-500 text-white" : "bg-white text-slate-700 border border-slate-200")}>
            <KeyRound className="w-4 h-4 inline mr-1" /> {VI.auth.changePassword}
          </button>
        </div>

        {tab === 'profile' && (
          <div className="card space-y-4">
            <div>
              <label className="label">{VI.auth.fullName}</label>
              <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="input" />
            </div>

            <div>
              <label className="label">{VI.profile.currentLevel}</label>
              <select value={form.currentLevel} onChange={(e) => setForm({ ...form, currentLevel: e.target.value })} className="input">
                {LEVELS.map((l) => <option key={l} value={l}>{VI.level[l as keyof typeof VI.level]}</option>)}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">{VI.profile.targetLevel}</label>
                <select value={form.targetLevel} onChange={(e) => setForm({ ...form, targetLevel: e.target.value })} className="input">
                  {LEVELS.map((l) => <option key={l} value={l}>{VI.level[l as keyof typeof VI.level]}</option>)}
                </select>
              </div>
              <div>
                <label className="label">{VI.profile.targetExam}</label>
                <select value={form.targetExam} onChange={(e) => setForm({ ...form, targetExam: e.target.value })} className="input">
                  <option value="NONE">Chưa có</option>
                  <option value="TOEIC">TOEIC</option>
                  <option value="IELTS">IELTS</option>
                </select>
              </div>
            </div>

            {(form.targetExam === 'TOEIC') && (
              <div>
                <label className="label">Điểm TOEIC mục tiêu</label>
                <select value={form.targetScore} onChange={(e) => setForm({ ...form, targetScore: parseInt(e.target.value) })} className="input">
                  {[450, 550, 650, 750, 850, 900].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            )}

            {form.targetExam === 'IELTS' && (
              <div>
                <label className="label">Điểm IELTS mục tiêu</label>
                <select value={form.targetScore} onChange={(e) => setForm({ ...form, targetScore: parseInt(e.target.value) })} className="input">
                  {[5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map((s) => <option key={s} value={s * 10}>{s}</option>)}
                </select>
              </div>
            )}

            <div>
              <label className="label">{VI.profile.dailyMinutes}</label>
              <input type="number" min={5} max={180} value={form.dailyMinutes} onChange={(e) => setForm({ ...form, dailyMinutes: parseInt(e.target.value) || 30 })} className="input" />
              <div className="text-xs text-slate-500 mt-1">Phút mỗi ngày (5 - 180)</div>
            </div>

            <button onClick={save} className="btn-primary">
              <Save className="w-4 h-4" /> {VI.save}
            </button>
          </div>
        )}

        {tab === 'password' && (
          <div className="card space-y-4">
            <div>
              <label className="label">Mật khẩu hiện tại</label>
              <input type="password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} className="input" />
            </div>
            <div>
              <label className="label">Mật khẩu mới</label>
              <input type="password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} className="input" placeholder="Tối thiểu 6 ký tự" />
            </div>
            <div>
              <label className="label">Xác nhận mật khẩu mới</label>
              <input type="password" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} className="input" />
            </div>
            <button onClick={changePassword} className="btn-primary">
              <Lock className="w-4 h-4" /> {VI.auth.changePassword}
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
}