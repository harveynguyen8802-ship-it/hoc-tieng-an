'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { useAuth } from '@/lib/auth-context';
import { VI } from '@/lib/i18n';
import { Loading } from '@/components/States';
import { calculateLevelFromXP } from '@/lib/utils';
import { Sparkles, TrendingUp, Clock, Award, Target, Brain, FileText, Headphones, Mic, Newspaper, PenLine, ArrowRight, Flame, BookOpen, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface DashboardData {
  progress: { skill: string; score: number; totalTime: number; lessonsDone: number }[];
  vocabLearned: number;
  lessonsDone: number;
  avgScore: number;
  goalProgress: number;
  daily: { date: string; minutes: number; xp: number }[];
  skills: { skill: string; score: number }[];
}

interface RecommendData {
  weakestSkills: string[];
  strongestSkills: string[];
  dailyMinutes: number;
  goalProgress?: number;
  recommendations: { type: string; title: string; reason: string; duration: number; priority: number }[];
  aiInsight: string;
}

const SKILL_LABEL: Record<string, string> = {
  vocabulary: VI.dashboard.stats.vocabLearned,
  grammar: VI.menu.grammar,
  listening: VI.menu.listening,
  reading: VI.menu.reading,
  speaking: VI.menu.speaking,
  writing: VI.menu.writing
};

const SKILL_ICON: Record<string, typeof Brain> = {
  vocabulary: Brain,
  grammar: FileText,
  listening: Headphones,
  reading: Newspaper,
  speaking: Mic,
  writing: PenLine
};

const RECOMMEND_ICON: Record<string, typeof Brain> = {
  vocabulary: Brain,
  grammar: FileText,
  listening: Headphones,
  reading: Newspaper,
  speaking: Mic,
  writing: PenLine
};

const RECOMMEND_HREF: Record<string, string> = {
  vocabulary: '/vocabulary',
  grammar: '/grammar',
  listening: '/listening',
  reading: '/reading',
  speaking: '/speaking',
  writing: '/writing'
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardData | null>(null);
  const [rec, setRec] = useState<RecommendData | null>(null);

  useEffect(() => {
    fetch('/api/dashboard/stats').then((r) => r.json()).then(setStats);
    fetch('/api/dashboard/recommend').then((r) => r.json()).then(setRec);
  }, []);

  if (!user || !stats || !rec) return <AppShell><Loading /></AppShell>;

  const { level, current, needed } = calculateLevelFromXP(user.xp);
  const xpProgress = Math.round((current / needed) * 100);

  const radarData = stats.skills.map((s) => ({
    skill: SKILL_LABEL[s.skill] || s.skill,
    score: s.score,
    fullMark: 100
  }));

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome banner */}
        <div className="rounded-3xl gradient-bg p-6 lg:p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="text-white/80 text-sm">{VI.dashboard.greeting},</div>
              <h1 className="text-3xl lg:text-4xl font-bold mt-1">{user.fullName} 👋</h1>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="badge bg-white/20 backdrop-blur text-white">{VI.dashboard.stats.level}: {level}</span>
                <span className="badge bg-white/20 backdrop-blur text-white">{user.currentLevel}</span>
                <span className="badge bg-white/20 backdrop-blur text-white">🔥 {user.streak} {VI.gamification.streakDays}</span>
              </div>
            </div>
            <Link href={RECOMMEND_HREF[rec.recommendations[0]?.type] || '/vocabulary'} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary-700 font-semibold hover:scale-105 transition-transform shadow-lg">
              <Sparkles className="w-5 h-5" /> Bắt đầu học
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Award} label={VI.dashboard.stats.xp} value={user.xp} sub={`${xpProgress}% → Lv.${level + 1}`} color="from-yellow-400 to-orange-500" />
          <StatCard icon={Flame} label={VI.dashboard.stats.streak} value={user.streak} sub={`Tối đa: ${user.longestStreak}`} color="from-orange-400 to-red-500" />
          <StatCard icon={Clock} label={VI.dashboard.stats.totalTime} value={`${Math.round(user.totalStudyMinutes / 60)}h`} sub={`${user.totalStudyDays} ${VI.dashboard.stats.totalDays}`} color="from-blue-400 to-cyan-500" />
          <StatCard icon={Target} label={VI.dashboard.stats.goalProgress} value={`${rec.goalProgress || stats.goalProgress}%`} sub={user.targetExam || 'Chưa đặt'} color="from-green-400 to-emerald-500" />
        </div>

        {/* XP Progress */}
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold text-slate-900">{VI.dashboard.stats.xp}: {current} / {needed}</div>
            <div className="text-sm text-slate-500">{VI.gamification.toNextLevel}</div>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full gradient-bg" style={{ width: `${xpProgress}%` }} />
          </div>
        </div>

        {/* AI Recommend + Insight */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">{VI.dashboard.todayPlan}</h2>
                <p className="text-sm text-slate-500">{VI.dashboard.todayPlanDesc}</p>
              </div>
            </div>

            <div className="space-y-3">
              {rec.recommendations.map((r, i) => {
                const Icon = RECOMMEND_ICON[r.type] || Brain;
                return (
                  <Link
                    key={i}
                    href={RECOMMEND_HREF[r.type] || '/dashboard'}
                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-primary-100 flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6 text-slate-600 group-hover:text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-900">{r.title}</div>
                      <div className="text-sm text-slate-500">{r.reason}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-primary-600">{r.duration} {VI.minutes}</div>
                      <ArrowRight className="w-4 h-4 text-slate-400 ml-auto mt-1 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="font-bold text-slate-900">Phân tích AI</h2>
            </div>
            <div className="space-y-4 text-sm">
              {rec.strongestSkills.length > 0 && (
                <div>
                  <div className="font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Điểm mạnh
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {rec.strongestSkills.map((s) => (
                      <span key={s} className="badge bg-green-50 text-green-700">{SKILL_LABEL[s] || s}</span>
                    ))}
                  </div>
                </div>
              )}
              {rec.weakestSkills.length > 0 && (
                <div>
                  <div className="font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4 text-orange-500" /> Điểm yếu
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {rec.weakestSkills.map((s) => (
                      <span key={s} className="badge bg-orange-50 text-orange-700">{SKILL_LABEL[s] || s}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="p-3 rounded-xl bg-slate-50 text-slate-700 leading-relaxed">
                {rec.aiInsight}
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-bold text-slate-900 mb-4">{VI.dashboard.charts.skills}</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar name="Score" dataKey="score" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <h3 className="font-bold text-slate-900 mb-4">{VI.dashboard.charts.dailyProgress}</h3>
            <div className="h-64">
              {stats.daily.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.daily}>
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="minutes" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                  Chưa có dữ liệu - hãy bắt đầu học!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function StatCard({ icon: Icon, label, value, sub, color }: { icon: typeof Award; label: string; value: string | number; sub: string; color: string }) {
  return (
    <div className="card relative overflow-hidden">
      <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br ${color} opacity-20`} />
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-3`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500 mt-0.5">{label}</div>
      <div className="text-xs text-slate-400 mt-1">{sub}</div>
    </div>
  );
}