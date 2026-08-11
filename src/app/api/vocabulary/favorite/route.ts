import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-helpers';

export async function POST(req: NextRequest) {
  const { user, error } = await requireAuth();
  if (error) return error;

  const { vocabularyId, isFavorite } = await req.json();

  const review = await prisma.vocabularyReview.upsert({
    where: { userId_vocabularyId: { userId: user!.id, vocabularyId } },
    update: { isFavorite },
    create: { userId: user!.id, vocabularyId, isFavorite }
  });

  return NextResponse.json({ review });
}