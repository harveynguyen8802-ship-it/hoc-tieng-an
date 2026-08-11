import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-helpers';

export async function POST(req: NextRequest) {
  const { user, error } = await requireAuth();
  if (error) return error;

  const { lessonId, score } = await req.json();
  const xpGained = Math.floor((score || 0) / 10);

  await prisma.user.update({ where: { id: user!.id }, data: { xp: { increment: xpGained } } });

  await prisma.learningProgress.upsert({
    where: { userId_skill: { userId: user!.id, skill: 'listening' } },
    update: { lessonsDone: { increment: 1 }, totalTime: { increment: 5 } },
    create: { userId: user!.id, skill: 'listening', score: 80, lessonsDone: 1, totalTime: 5 }
  });

  return NextResponse.json({ xpGained });
}