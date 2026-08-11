import { NextResponse } from 'next/server';
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

export async function GET() {
  const { error } = await requireAuth();
  if (error) return error;

  const rawLessons = await prisma.listeningLesson.findMany({ orderBy: { level: 'asc' } });
  const lessons = rawLessons.map((l) => ({
    ...l,
    questions: parseJsonField<unknown[]>(l.questions, [])
  }));
  if (lessons.length === 0) {
    const { MOCK_LISTENING } = await import('@/lib/mock-data');
    return NextResponse.json({ lessons: MOCK_LISTENING });
  }
  return NextResponse.json({ lessons });
}