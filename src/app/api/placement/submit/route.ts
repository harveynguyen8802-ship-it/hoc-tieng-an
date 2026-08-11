import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-helpers';

function calculateLevel(score: number): string {
  if (score < 25) return 'A1';
  if (score < 45) return 'A2';
  if (score < 65) return 'B1';
  if (score < 80) return 'B2';
  if (score < 92) return 'C1';
  return 'C2';
}

function generateInsights(skillScores: Record<string, number>) {
  const skills = Object.entries(skillScores);
  const sorted = [...skills].sort((a, b) => b[1] - a[1]);
  const strengths = sorted.slice(0, 2).map(([k]) => k);
  const weaknesses = sorted.slice(-2).map(([k]) => k);

  const recommendations: Record<string, string[]> = {
    vocab: ['Học thêm 20 từ vựng mới mỗi ngày', 'Sử dụng flashcard với Spaced Repetition'],
    grammar: ['Ôn tập các thì cơ bản', 'Làm bài tập ngữ pháp theo chủ đề'],
    listening: ['Luyện nghe mỗi ngày 15 phút', 'Xem phim có phụ đề tiếng Anh'],
    reading: ['Đọc bài theo trình độ', 'Học từ vựng qua ngữ cảnh'],
    reflex: ['Luyện nói hàng ngày', 'Sử dụng AI Conversation']
  };

  const learningPath = weaknesses.map((skill) => ({
    skill,
    title: `Tập trung cải thiện ${skill}`,
    activities: recommendations[skill] || []
  }));

  return { strengths, weaknesses, recommendations, learningPath };
}

export async function POST(req: NextRequest) {
  const { user, error } = await requireAuth();
  if (error) return error;

  try {
    const { answers, questions } = await req.json();

    // Tính điểm từng kỹ năng
    const skillScores: Record<string, { correct: number; total: number }> = {
      vocab: { correct: 0, total: 0 },
      grammar: { correct: 0, total: 0 },
      reading: { correct: 0, total: 0 },
      listening: { correct: 0, total: 0 },
      reflex: { correct: 0, total: 0 }
    };

    let totalCorrect = 0;
    questions.forEach((q: { category: string; answer: number }, idx: number) => {
      const cat = q.category;
      if (skillScores[cat]) {
        skillScores[cat].total += 1;
        if (answers[idx] === q.answer) {
          skillScores[cat].correct += 1;
          totalCorrect += 1;
        }
      }
    });

    const totalScore = Math.round((totalCorrect / questions.length) * 100);
    const scores = {
      vocab: skillScores.vocab.total > 0 ? Math.round((skillScores.vocab.correct / skillScores.vocab.total) * 100) : 0,
      grammar: skillScores.grammar.total > 0 ? Math.round((skillScores.grammar.correct / skillScores.grammar.total) * 100) : 0,
      reading: skillScores.reading.total > 0 ? Math.round((skillScores.reading.correct / skillScores.reading.total) * 100) : 0,
      listening: skillScores.listening.total > 0 ? Math.round((skillScores.listening.correct / skillScores.listening.total) * 100) : 0,
      reflex: skillScores.reflex.total > 0 ? Math.round((skillScores.reflex.correct / skillScores.reflex.total) * 100) : 0
    };

    const level = calculateLevel(totalScore);
    const insights = generateInsights(scores);

    // Lưu kết quả vào DB
    await prisma.placementResult.upsert({
      where: { userId: user!.id },
      update: {
        vocabScore: scores.vocab, grammarScore: scores.grammar, readingScore: scores.reading,
        listeningScore: scores.listening, reflexScore: scores.reflex, totalScore,
        level, strengths: JSON.stringify(insights.strengths),
        weaknesses: JSON.stringify(insights.weaknesses),
        recommendations: JSON.stringify(insights.recommendations),
        learningPath: JSON.stringify(insights.learningPath)
      },
      create: {
        userId: user!.id, vocabScore: scores.vocab, grammarScore: scores.grammar,
        readingScore: scores.reading, listeningScore: scores.listening, reflexScore: scores.reflex,
        totalScore, level, strengths: JSON.stringify(insights.strengths),
        weaknesses: JSON.stringify(insights.weaknesses),
        recommendations: JSON.stringify(insights.recommendations),
        learningPath: JSON.stringify(insights.learningPath)
      }
    });

    // Cập nhật level user
    await prisma.user.update({
      where: { id: user!.id },
      data: { currentLevel: level, placementDone: true }
    });

    // Tạo notification
    await prisma.notification.create({
      data: {
        userId: user!.id,
        type: 'achievement',
        title: 'Hoàn thành kiểm tra trình độ!',
        message: `Trình độ hiện tại của bạn: ${level}. Hãy bắt đầu hành trình học tập!`
      }
    });

    return NextResponse.json({
      result: {
        totalScore, scores, level,
        strengths: insights.strengths, weaknesses: insights.weaknesses,
        recommendations: insights.recommendations, learningPath: insights.learningPath
      }
    });
  } catch (e) {
    console.error('Placement submit error:', e);
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 });
  }
}