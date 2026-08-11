import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-helpers';

export async function POST(req: NextRequest) {
  const { user, error } = await requireAuth();
  if (error) return error;

  const { lessonSlug, score } = await req.json();
  const xpGained = Math.floor((score || 0) / 10);

  await prisma.user.update({
    where: { id: user!.id },
    data: { xp: { increment: xpGained } }
  });

  await prisma.learningProgress.upsert({
    where: { userId_skill: { userId: user!.id, skill: 'grammar' } },
    update: {
      score: Math.round(score),
      lessonsDone: { increment: 1 },
      totalTime: { increment: 5 }
    },
    create: {
      userId: user!.id, skill: 'grammar', score: Math.round(score),
      lessonsDone: 1, totalTime: 5
    }
  });

  return NextResponse.json({ xpGained });
}