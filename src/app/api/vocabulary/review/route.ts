import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-helpers';
import { sm2 } from '@/lib/utils';

export async function POST(req: NextRequest) {
  const { user, error } = await requireAuth();
  if (error) return error;

  const { vocabularyId, quality } = await req.json(); // quality: 0-5

  if (typeof vocabularyId !== 'string' || typeof quality !== 'number') {
    return NextResponse.json({ error: 'Dữ liệu không hợp lệ' }, { status: 400 });
  }

  const existing = await prisma.vocabularyReview.findUnique({
    where: { userId_vocabularyId: { userId: user!.id, vocabularyId } }
  });

  const current = existing || { ease: 2.5, interval: 0, repetitions: 0 };
  const next = sm2(current, quality);

  const review = await prisma.vocabularyReview.upsert({
    where: { userId_vocabularyId: { userId: user!.id, vocabularyId } },
    update: {
      ease: next.ease,
      interval: next.interval,
      repetitions: next.repetitions,
      nextReviewAt: next.nextReview,
      lastResult: quality >= 3 ? 'correct' : 'wrong',
      wrongCount: { increment: quality < 3 ? 1 : 0 },
      correctCount: { increment: quality >= 3 ? 1 : 0 },
      reviewedAt: new Date()
    },
    create: {
      userId: user!.id,
      vocabularyId,
      ease: next.ease,
      interval: next.interval,
      repetitions: next.repetitions,
      nextReviewAt: next.nextReview,
      lastResult: quality >= 3 ? 'correct' : 'wrong',
      wrongCount: quality < 3 ? 1 : 0,
      correctCount: quality >= 3 ? 1 : 0,
      reviewedAt: new Date()
    }
  });

  // Update XP
  if (quality >= 3) {
    await prisma.user.update({ where: { id: user!.id }, data: { xp: { increment: 5 } } });
  }

  // Update learning progress
  await prisma.learningProgress.upsert({
    where: { userId_skill: { userId: user!.id, skill: 'vocabulary' } },
    update: {
      lessonsDone: { increment: 1 },
      totalTime: { increment: 1 }
    },
    create: {
      userId: user!.id, skill: 'vocabulary', score: quality * 20,
      lessonsDone: 1, totalTime: 1
    }
  });

  return NextResponse.json({ review });
}