import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-helpers';

export async function POST() {
  const { user, error } = await requireAuth();
  if (error) return error;

  await prisma.user.update({ where: { id: user!.id }, data: { xp: { increment: 15 } } });
  await prisma.learningProgress.upsert({
    where: { userId_skill: { userId: user!.id, skill: 'reading' } },
    update: { lessonsDone: { increment: 1 }, totalTime: { increment: 8 } },
    create: { userId: user!.id, skill: 'reading', score: 80, lessonsDone: 1, totalTime: 8 }
  });

  return NextResponse.json({ ok: true });
}