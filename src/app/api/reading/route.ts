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

  const rawPassages = await prisma.readingPassage.findMany({ orderBy: { createdAt: 'desc' } });
  const passages = rawPassages.map((p) => ({
    ...p,
    keyWords: parseJsonField<unknown[]>(p.keyWords, []),
    questions: parseJsonField<unknown[]>(p.questions, []),
    answerKey: parseJsonField<unknown[]>(p.answerKey, []),
    explanationVi: parseJsonField<unknown[]>(p.explanationVi, [])
  }));
  if (passages.length === 0) {
    const { MOCK_READING } = await import('@/lib/mock-data');
    return NextResponse.json({ passages: MOCK_READING });
  }
  return NextResponse.json({ passages });
}