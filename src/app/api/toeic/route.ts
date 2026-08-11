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

  const rawTests = await prisma.toeicTest.findMany({ orderBy: { createdAt: 'desc' } });
  const tests = rawTests.map((t) => ({
    ...t,
    questions: parseJsonField<unknown[]>(t.questions, [])
  }));
  if (tests.length === 0) {
    const { MOCK_TOEIC } = await import('@/lib/mock-data');
    return NextResponse.json({ tests: MOCK_TOEIC });
  }
  return NextResponse.json({ tests });
}