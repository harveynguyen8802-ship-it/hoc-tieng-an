import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-helpers';

export async function GET(req: NextRequest) {
  const { user, error } = await requireAuth();
  if (error) return error;

  // Learning progress
  const progress = await prisma.learningProgress.findMany({
    where: { userId: user!.id }
  });

  // Số từ đã học
  const vocabLearned = await prisma.vocabularyReview.count({
    where: { userId: user!.id, correctCount: { gt: 0 } }
  });

  // Số bài đã hoàn thành
  const lessonsDone = await prisma.quizAttempt.count({
    where: { userId: user!.id, isCorrect: true }
  });

  // Điểm trung bình
  const avgScore = progress.length > 0
    ? progress.reduce((s, p) => s + p.score, 0) / progress.length
    : 0;

  // Recent activity 7 ngày (mock từ learningProgress + vocabularyReview)
  const dailyProgress = await prisma.vocabularyReview.findMany({
    where: { userId: user!.id, reviewedAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    select: { reviewedAt: true, correctCount: true, wrongCount: true }
  });

  // Group by date
  const dailyMap: Record<string, { date: string; minutes: number; xp: number }> = {};
  dailyProgress.forEach((r) => {
    const d = r.reviewedAt.toISOString().split('T')[0];
    if (!dailyMap[d]) dailyMap[d] = { date: d, minutes: 0, xp: 0 };
    dailyMap[d].minutes += (r.correctCount + r.wrongCount) * 2;
    dailyMap[d].xp += (r.correctCount * 5);
  });

  // Goal progress
  const targetScore = user!.targetScore || 700;
  const currentEstimate = user!.currentLevel === 'C1' ? 850 : user!.currentLevel === 'B2' ? 650 : user!.currentLevel === 'B1' ? 450 : 300;
  const goalProgress = Math.min(100, Math.round((currentEstimate / targetScore) * 100));

  return NextResponse.json({
    progress,
    vocabLearned,
    lessonsDone,
    avgScore: Math.round(avgScore),
    goalProgress,
    daily: Object.values(dailyMap),
    skills: progress.map((p) => ({ skill: p.skill, score: p.score }))
  });
}