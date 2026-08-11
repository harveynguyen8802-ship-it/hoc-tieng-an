'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
import { useAuth } from '@/lib/auth-context';
import { VI } from '@/lib/i18n';
import { Loading } from '@/components/States';
import { Shield, Users, BookOpen, Trophy, BarChart3, CheckCircle2, Sparkles, Database, MessageSquare } from 'lucide-react';

interface AdminData {
  stats: {
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
    totalLessons: number;
    totalAttempts: number;
    correctRate: number;
    vocabCount: number;
    grammarCount: number;
    listeningCount: number;
    readingCount: number;
    toeicCount: number;
    achievementsCount: number;
  };
  recentUsers: { id: string; email: string; fullName: string; role: string; currentLevel: string; xp: number; streak: number; createdAt: string }[];
}

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<AdminData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setData)
      .catch(() => setError('Không có quyền truy cập'));
  }, []);

  if (loading || !user) return <AppShell><Loading /></AppShell>;
  if (user.role !== 'ADMIN') return null;
  if (error) return <AppShell><div className="card text-center text-red-600">{error}</div></AppShell>;
  if (!data) return <AppShell><Loading /></AppShell>;

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-8 h-8 text-red-500" /> {VI.admin.title}
          </h1>
          <p className="text-slate-500 mt-1">Quản lý hệ thống và người dùng</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Users} label={VI.admin.totalUsers} value={data.stats.totalUsers} sub={`${data.stats.activeUsers} hoạt động`} color="from-blue-500 to-cyan-500" />
          <StatCard icon={Sparkles} label={VI.admin.newUsers} value={data.stats.newUsers} sub="7 ngày qua" color="from-green-500 to-emerald-500" />
          <StatCard icon={BookOpen} label={VI.admin.totalLessons} value={data.stats.totalLessons} sub="Tất cả modules" color="from-purple-500 to-pink-500" />
          <StatCard icon={CheckCircle2} label={VI.admin.correctRate} value={`${data.stats.correctRate}%`} sub={`${data.stats.totalAttempts} lượt`} color="from-orange-500 to-red-500" />
        </div>

        {/* Content Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-primary-500" /> Thống kê nội dung
            </h3>
            <div className="space-y-3">
              <ContentRow label={VI.admin.vocabulary} value={data.stats.vocabCount} total={data.stats.vocabCount} />
              <ContentRow label={VI.admin.grammar} value={data.stats.grammarCount} total={data.stats.grammarCount} />
              <ContentRow label={VI.admin.listening} value={data.stats.listeningCount} total={data.stats.listeningCount} />
              <ContentRow label={VI.admin.reading} value={data.stats.readingCount} total={data.stats.readingCount} />
              <ContentRow label={VI.admin.toeic} value={data.stats.toeicCount} total={data.stats.toeicCount} />
              <ContentRow label={VI.gamification.achievements} value={data.stats.achievementsCount} total={data.stats.achievementsCount} />
            </div>
          </div>

          <div className="card">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary-500" /> {VI.admin.stats}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">{VI.admin.activeUsers}</span>
                <span className="font-bold text-slate-900">{data.stats.activeUsers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">{VI.admin.totalAttempts}</span>
                <span className="font-bold text-slate-900">{data.stats.totalAttempts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">{VI.admin.correctRate}</span>
                <span className="font-bold text-slate-900">{data.stats.correctRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">{VI.admin.totalLessons}</span>
                <span className="font-bold text-slate-900">{data.stats.totalLessons}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Users */}
        <div className="card">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary-500" /> Người dùng mới nhất
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-slate-500">
                  <th className="py-2 px-2">Họ tên</th>
                  <th className="py-2 px-2">Email</th>
                  <th className="py-2 px-2">Level</th>
                  <th className="py-2 px-2">XP</th>
                  <th className="py-2 px-2">Streak</th>
                  <th className="py-2 px-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {data.recentUsers.map((u) => (
                  <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="py-3 px-2 font-medium text-slate-900">{u.fullName}</td>
                    <td className="py-3 px-2 text-slate-600">{u.email}</td>
                    <td className="py-3 px-2"><span className="badge bg-primary-50 text-primary-700">{u.currentLevel}</span></td>
                    <td className="py-3 px-2">{u.xp}</td>
                    <td className="py-3 px-2">🔥 {u.streak}</td>
                    <td className="py-3 px-2">
                      <span className={`badge ${u.role === 'ADMIN' ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-700'}`}>{u.role}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function StatCard({ icon: Icon, label, value, sub, color }: { icon: typeof Users; label: string; value: string | number; sub: string; color: string }) {
  return (
    <div className="card">
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-3`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500 mt-1">{label}</div>
      <div className="text-xs text-slate-400 mt-0.5">{sub}</div>
    </div>
  );
}

function ContentRow({ label, value, total }: { label: string; value: number; total: number }) {
  const pct = total > 0 ? Math.min(100, Math.round((value / Math.max(total, 1)) * 100)) : 0;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-700">{label}</span>
        <span className="font-semibold">{value}</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary-500 to-cyan-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}