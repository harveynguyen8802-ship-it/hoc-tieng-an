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
  const { error } = await requireAuth();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const level = searchParams.get('level');

  let rawLessons = await prisma.grammarLesson.findMany({
    where: {
      ...(category && category !== 'all' ? { category } : {}),
      ...(level && level !== 'all' ? { level } : {})
    },
    orderBy: [{ category: 'asc' }, { order: 'asc' }]
  });

  // Parse JSON string fields (SQLite stores arrays as JSON strings)
  const lessons = rawLessons.map((l) => ({
    ...l,
    examples: parseJsonField<unknown[]>(l.examples, []),
    exercises: parseJsonField<unknown[]>(l.exercises, []),
    answerKey: parseJsonField<unknown[]>(l.answerKey, []),
    explanationVi: parseJsonField<unknown[]>(l.explanationVi, [])
  }));

  // Fallback nếu DB trống
  if (lessons.length === 0) {
    const { MOCK_GRAMMAR } = await import('@/lib/mock-data');
    let filtered = MOCK_GRAMMAR;
    if (category && category !== 'all') filtered = filtered.filter((g: { category: string }) => g.category === category);
    if (level && level !== 'all') filtered = filtered.filter((g: { level: string }) => g.level === level);
    return NextResponse.json({ lessons: filtered });
  }

  return NextResponse.json({ lessons });
}