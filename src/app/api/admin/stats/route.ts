import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-helpers';

export async function GET() {
  const { user, error } = await requireAdmin();
  if (error) return error;

  const [users, vocabCount, grammarCount, listeningCount, readingCount, toeicCount, achievementsCount] = await Promise.all([
    prisma.user.count(),
    prisma.vocabulary.count(),
    prisma.grammarLesson.count(),
    prisma.listeningLesson.count(),
    prisma.readingPassage.count(),
    prisma.toeicTest.count(),
    prisma.achievement.count()
  ]);

  const recentUsers = await prisma.user.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    select: { id: true, email: true, fullName: true, role: true, currentLevel: true, xp: true, createdAt: true, streak: true }
  });

  const activeUsers = await prisma.user.count({
    where: { lastStudyDate: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }
  });

  const totalAttempts = await prisma.quizAttempt.count();
  const correctAttempts = await prisma.quizAttempt.count({ where: { isCorrect: true } });
  const correctRate = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

  return NextResponse.json({
    stats: {
      totalUsers: users,
      activeUsers,
      newUsers: recentUsers.length,
      totalLessons: vocabCount + grammarCount + listeningCount + readingCount,
      totalAttempts,
      correctRate,
      vocabCount, grammarCount, listeningCount, readingCount, toeicCount, achievementsCount
    },
    recentUsers
  });
}