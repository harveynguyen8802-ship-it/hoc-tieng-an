import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-helpers';
import { MOCK_AI_FEEDBACK } from '@/lib/mock-data';

// Mock AI service - sẵn sàng thay bằng OpenAI/Claude/Gemini thật
async function generateSpeakingFeedback(userText: string, topic: string) {
  // Trong production, gọi AI API thật ở đây:
  // const response = await openai.chat.completions.create({...})
  return MOCK_AI_FEEDBACK.speaking(userText);
}

export async function POST(req: NextRequest) {
  const { user, error } = await requireAuth();
  if (error) return error;

  try {
    const { userText, topic } = await req.json();
    if (!userText || userText.trim().length < 3) {
      return NextResponse.json({ error: 'Vui lòng nhập câu trả lời' }, { status: 400 });
    }

    const feedback = await generateSpeakingFeedback(userText, topic);

    // Lưu session
    await prisma.speakingSession.create({
      data: {
        userId: user!.id,
        topic: topic || 'general',
        userText,
        aiFeedback: JSON.stringify(feedback),
        score: feedback.score
      }
    });

    // Cập nhật tiến độ + XP
    await prisma.user.update({
      where: { id: user!.id },
      data: { xp: { increment: 10 } }
    });

    await prisma.learningProgress.upsert({
      where: { userId_skill: { userId: user!.id, skill: 'speaking' } },
      update: { lessonsDone: { increment: 1 }, totalTime: { increment: 3 } },
      create: { userId: user!.id, skill: 'speaking', score: feedback.score, lessonsDone: 1, totalTime: 3 }
    });

    return NextResponse.json({ feedback });
  } catch (e) {
    console.error('Speaking error:', e);
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 });
  }
}