import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-helpers';

export async function GET(req: NextRequest) {
  const { user, error } = await requireAuth();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const topic = searchParams.get('topic');
  const level = searchParams.get('level');
  const search = searchParams.get('search');
  const favoriteOnly = searchParams.get('favorite') === 'true';

  const parseJsonField = <T,>(value: unknown, fallback: T): T => {
    if (value === null || value === undefined) return fallback;
    if (typeof value === 'string') {
      try { return JSON.parse(value) as T; } catch { return fallback; }
    }
    if (Array.isArray(value) || typeof value === 'object') return value as T;
    return fallback;
  };

  // Get list + user's reviews
  const vocabRaw = await prisma.vocabulary.findMany({
    where: {
      ...(topic && topic !== 'all' ? { topic } : {}),
      ...(level && level !== 'all' ? { level } : {}),
      ...(search ? { OR: [{ word: { contains: search } }, { meaning: { contains: search } }] } : {})
    },
    include: {
      reviews: { where: { userId: user!.id } }
    },
    take: 100,
    orderBy: { word: 'asc' }
  });

  // #region agent log
  fetch('http://127.0.0.1:7336/ingest/506a886f-a3e3-43bd-97c3-77408c223dab', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '697114' }, body: JSON.stringify({ sessionId: '697114', runId: 'pre-fix', hypothesisId: 'H1', location: 'api/vocabulary/route.ts:GET', message: 'vocab raw types', data: { count: vocabRaw.length, firstSynType: typeof vocabRaw[0]?.synonyms, firstSynValue: vocabRaw[0]?.synonyms, firstAntType: typeof vocabRaw[0]?.antonyms, firstColType: typeof vocabRaw[0]?.collocations }, timestamp: Date.now() }) }).catch(() => {});
  // #endregion

  // Parse JSON string fields (SQLite stores arrays as JSON strings)
  const vocab = vocabRaw.map((v) => ({
    ...v,
    synonyms: parseJsonField<string[]>(v.synonyms, []),
    antonyms: parseJsonField<string[]>(v.antonyms, []),
    collocations: parseJsonField<string[]>(v.collocations, [])
  }));

  let filtered = vocab;
  if (favoriteOnly) {
    filtered = vocab.filter((v) => v.reviews[0]?.isFavorite);
  }

  // Get distinct topics
  const topics = await prisma.vocabulary.findMany({ select: { topic: true }, distinct: ['topic'] });

  // Get due reviews for spaced repetition
  const dueReviews = await prisma.vocabularyReview.findMany({
    where: { userId: user!.id, nextReviewAt: { lte: new Date() } },
    include: { vocabulary: true },
    take: 20
  });

  return NextResponse.json({
    vocabulary: filtered,
    topics: topics.map((t) => t.topic),
    dueCount: dueReviews.length,
    dueWords: dueReviews
  });
}