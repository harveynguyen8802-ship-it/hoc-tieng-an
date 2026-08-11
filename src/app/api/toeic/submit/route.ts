import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-helpers';

export async function POST(req: NextRequest) {
  const { user, error } = await requireAuth();
  if (error) return error;

  try {
    const { testId, answers, questions } = await req.json();

    let correct = 0;
    const wrongAnswers: number[] = [];
    questions.forEach((q: { answer: number }, idx: number) => {
      if (answers[idx] === q.answer) {
        correct++;
      } else {
        wrongAnswers.push(idx);
      }
    });

    const total = questions.length;
    // TOEIC scoring: mỗi part có trọng số khác nhau
    // Listening: 0-495, Reading: 0-495
    const isListening = testId.includes('listening');
    const scaledScore = Math.round((correct / total) * (isListening ? 495 : 495));

    const test = await prisma.toeicTest.findUnique({ where: { id: testId } });
    const listeningScore = isListening ? scaledScore : 0;
    const readingScore = !isListening ? scaledScore : 0;
    const totalScore = listeningScore + readingScore;

    // Dự đoán trình độ
    let predicted = '450';
    if (totalScore >= 850) predicted = '900+';
    else if (totalScore >= 750) predicted = '850';
    else if (totalScore >= 650) predicted = '750';
    else if (totalScore >= 550) predicted = '650';
    else if (totalScore >= 450) predicted = '550';

    const result = await prisma.toeicResult.create({
      data: {
        userId: user!.id, testId,
        listeningScore, readingScore, totalScore,
        predictedLevel: predicted,
        wrongAnswers: JSON.stringify(wrongAnswers)
      }
    });

    await prisma.user.update({ where: { id: user!.id }, data: { xp: { increment: correct * 2 } } });

    return NextResponse.json({
      result: { ...result, correctCount: correct, totalCount: total }
    });
  } catch (e) {
    console.error('Toeic submit error:', e);
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 });
  }
}