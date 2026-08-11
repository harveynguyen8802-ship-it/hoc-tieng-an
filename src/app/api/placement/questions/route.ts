import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-helpers';

const parseJsonField = <T,>(value: unknown, fallback: T): T => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'string') {
    try { return JSON.parse(value) as T; } catch { return fallback; }
  }
  if (Array.isArray(value) || typeof value === 'object') return value as T;
  return fallback;
};

export async function GET(req: NextRequest) {
  const { user, error } = await requireAuth();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  const where: Record<string, unknown> = {};
  if (category) where.category = category;

  const rawQuestions = await prisma.quizQuestion.findMany({ where, take: 50 });
  const questions = rawQuestions.map((q) => ({
    ...q,
    options: parseJsonField<string[]>(q.options, [])
  }));

  // Nếu DB trống, fallback về MOCK_PLACEMENT
  if (questions.length === 0) {
    const { MOCK_PLACEMENT } = await import('@/lib/mock-data');
    const filtered = category ? MOCK_PLACEMENT.filter((q: { category: string }) => q.category === category) : MOCK_PLACEMENT;
    return NextResponse.json({ questions: filtered });
  }

  return NextResponse.json({ questions });
}