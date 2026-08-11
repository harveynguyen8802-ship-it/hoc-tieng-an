'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { useAuth } from '@/lib/auth-context';
import { VI } from '@/lib/i18n';
import { Loading } from '@/components/States';
import { BarChart3, Award, Lock, TrendingUp, Target, Calendar, Flame } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, RadialBarChart, RadialBar, Legend } from 'recharts';

interface ProgressData {
  progress: { skill: string; score: number; totalTime: number; lessonsDone: number }[];
  unlockedAchievements: { achievement: { slug: string; titleVi: string; icon: string; description: string; xpReward: number } }[];
  allAchievements: { id: string; slug: string; titleVi: string; icon: string; description: string; xpReward: number }[];
  unreadNotifications: number;
}

const SKILL_LABEL: Record<string, string> = {
  vocabulary: VI.dashboard.stats.vocabLearned,
  grammar: VI.menu.grammar,
  listening: VI.menu.listening,
  reading: VI.menu.reading,
  speaking: VI.menu.speaking,
  writing: VI.menu.writing
};

export default function ProgressPage() {
  const { user } = useAuth();
  const [data, setData] = useState<ProgressData | null>(null);

  useEffect(() => {
    fetch('/api/progress').then((r) => r.json()).then(setData);
  }, []);

  if (!user || !data) return <AppShell><Loading /></AppShell>;

  const unlockedSlugs = new Set(data.unlockedAchievements.map((a) => a.achievement.slug));
  const totalXP = data.allAchievements.reduce((s, a) => s + a.xpReward, 0);
  const earnedXP = data.unlockedAchievements.reduce((s, a) => s + a.achievement.xpReward, 0);

  // Skill progress chart
  const skillData = data.progress.map((p) => ({
    name: SKILL_LABEL[p.skill] || p.skill,
    score: p.score,
    lessons: p.lessonsDone
  }));

  // Daily goal progress (mock)
  const dailyGoalData = [
    { day: 'T2', value: 85 }, { day: 'T3', value: 92 }, { day: 'T4', value: 78 },
    { day: 'T5', value: 95 }, { day: 'T6', value: 88 }, { day: 'T7', value: 90 }, { day: 'CN', value: 100 }
  ];

  // Level progress
  const levelData = [{ name: 'Level', value: user.level, fill: '#0ea5e9' }];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-primary-500" /> {VI.menu.progress}
          </h1>
          <p className="text-slate-500 mt-1">Theo dõi tiến bộ học tập của bạn</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBox icon={Flame} label={VI.dashboard.stats.streak} value={`${user.streak} ${VI.dashboard.stats.totalDays}`} color="from-orange-400 to-red-500" />
          <StatBox icon={Target} label={VI.dashboard.stats.totalDays} value={user.totalStudyDays} color="from-blue-400 to-cyan-500" />
          <StatBox icon={TrendingUp} label={VI.dashboard.stats.totalTime} value={`${Math.round(user.totalStudyMinutes / 60)}h`} color="from-green-400 to-emerald-500" />
          <StatBox icon={Award} label={VI.gamification.achievements} value={`${data.unlockedAchievements.length}/${data.allAchievements.length}`} color="from-purple-400 to-pink-500" />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-bold text-slate-900 mb-4">{VI.dashboard.charts.weeklyProgress}</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyGoalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <h3 className="font-bold text-slate-900 mb-4">{VI.dashboard.charts.skills}</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={80} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#06b6d4" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="card">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" /> {VI.gamification.achievements} ({earnedXP}/{totalXP} XP)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {data.allAchievements.map((a) => {
              const unlocked = unlockedSlugs.has(a.slug);
              return (
                <div
                  key={a.id}
                  className={`p-4 rounded-2xl text-center transition-all ${unlocked ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300' : 'bg-slate-50 opacity-60'}`}
                >
                  <div className="text-4xl mb-2">{unlocked ? a.icon : <Lock className="w-10 h-10 mx-auto text-slate-400" />}</div>
                  <div className="font-bold text-sm text-slate-900">{a.titleVi}</div>
                  <div className="text-xs text-slate-500 mt-1">{a.description}</div>
                  {unlocked && <div className="badge bg-yellow-500 text-white mt-2">+{a.xpReward} XP</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function StatBox({ icon: Icon, label, value, color }: { icon: typeof Flame; label: string; value: string | number; color: string }) {
  return (
    <div className="card">
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-3`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500 mt-1">{label}</div>
    </div>
  );
}