import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-helpers';
import { MOCK_AI_FEEDBACK } from '@/lib/mock-data';

const PROMPTS = [
  'Write about your favorite hobby and why you enjoy it.',
  'Describe a memorable trip you have taken.',
  'Write about your goals for the next 5 years.',
  'Discuss the advantages and disadvantages of remote work.',
  'Describe a person who has influenced you the most.'
];

async function analyzeWriting(text: string) {
  // Sẽ thay bằng OpenAI/Claude API
  return MOCK_AI_FEEDBACK.writing(text);
}

export async function GET() {
  return NextResponse.json({ prompts: PROMPTS });
}

export async function POST(req: NextRequest) {
  const { user, error } = await requireAuth();
  if (error) return error;

  try {
    const { prompt, content } = await req.json();
    if (!content || content.trim().length < 20) {
      return NextResponse.json({ error: 'Vui lòng viết ít nhất 20 ký tự' }, { status: 400 });
    }

    const feedback = await analyzeWriting(content);

    await prisma.writingSubmission.create({
      data: {
        userId: user!.id, prompt: prompt || '', content,
        aiFeedback: JSON.stringify(feedback),
        score: feedback.score,
        grammarScore: feedback.grammar, spellingScore: feedback.spelling,
        vocabScore: feedback.vocabulary, structureScore: feedback.structure,
        coherenceScore: feedback.coherence, naturalnessScore: feedback.naturalness
      }
    });

    await prisma.user.update({ where: { id: user!.id }, data: { xp: { increment: 15 } } });
    await prisma.learningProgress.upsert({
      where: { userId_skill: { userId: user!.id, skill: 'writing' } },
      update: { lessonsDone: { increment: 1 }, totalTime: { increment: 10 } },
      create: { userId: user!.id, skill: 'writing', score: feedback.score, lessonsDone: 1, totalTime: 10 }
    });

    return NextResponse.json({ feedback });
  } catch (e) {
    console.error('Writing error:', e);
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 });
  }
}