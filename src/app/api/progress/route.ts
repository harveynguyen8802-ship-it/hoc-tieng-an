import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-helpers';

export async function GET() {
  const { user, error } = await requireAuth();
  if (error) return error;

  const [progress, achievements, allAchievements, notifications] = await Promise.all([
    prisma.learningProgress.findMany({ where: { userId: user!.id } }),
    prisma.userAchievement.findMany({ where: { userId: user!.id }, include: { achievement: true } }),
    prisma.achievement.findMany(),
    prisma.notification.count({ where: { userId: user!.id, read: false } })
  ]);

  return NextResponse.json({
    progress,
    unlockedAchievements: achievements,
    allAchievements,
    unreadNotifications: notifications
  });
}