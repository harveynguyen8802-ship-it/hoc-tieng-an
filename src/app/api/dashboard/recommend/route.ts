import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-helpers';

export async function GET(req: NextRequest) {
  const { user, error } = await requireAuth();
  if (error) return error;

  // Phân tích dữ liệu
  const progress = await prisma.learningProgress.findMany({ where: { userId: user!.id } });
  const skills: Record<string, number> = {};
  progress.forEach((p) => { skills[p.skill] = p.score; });

  // Tìm kỹ năng yếu nhất
  const sorted = Object.entries(skills).sort((a, b) => a[1] - b[1]);
  const weakest = sorted.slice(0, 2).map(([s]) => s);
  const strongest = sorted.slice(-2).map(([s]) => s).reverse();

  // Đề xuất bài học dựa trên:
  // - Kỹ năng yếu: ưu tiên
  // - Lịch sử: tránh lặp
  // - Thời gian còn lại trong ngày
  const dailyMinutes = user!.dailyMinutes || 30;

  // Goal progress
  const targetScore = user!.targetScore || 700;
  const currentEstimate = user!.currentLevel === 'C1' ? 850 : user!.currentLevel === 'B2' ? 650 : user!.currentLevel === 'B1' ? 450 : 300;
  const goalProgress = Math.min(100, Math.round((currentEstimate / targetScore) * 100));

  const recommendations: { type: string; title: string; reason: string; duration: number; priority: number }[] = [];

  // Từ vựng (luôn)
  recommendations.push({ type: 'vocabulary', title: 'Ôn tập từ vựng hôm nay', reason: 'Duy trì streak và mở rộng vốn từ', duration: 10, priority: 1 });

  // Ngữ pháp
  recommendations.push({ type: 'grammar', title: 'Bài ngữ pháp được đề xuất', reason: 'Củng cố nền tảng ngữ pháp', duration: 10, priority: 2 });

  // Kỹ năng yếu nhất
  if (weakest.includes('listening')) {
    recommendations.push({ type: 'listening', title: 'Luyện nghe chủ đề phù hợp', reason: 'Listening đang yếu, cần tập trung', duration: 15, priority: 3 });
  } else if (weakest.includes('speaking')) {
    recommendations.push({ type: 'speaking', title: 'Luyện nói với AI', reason: 'Speaking cần cải thiện', duration: 10, priority: 3 });
  } else if (weakest.includes('writing')) {
    recommendations.push({ type: 'writing', title: 'Luyện viết câu', reason: 'Writing cần cải thiện', duration: 10, priority: 3 });
  } else if (weakest.includes('reading')) {
    recommendations.push({ type: 'reading', title: 'Đọc hiểu', reason: 'Reading cần cải thiện', duration: 10, priority: 3 });
  }

  // Nếu còn thời gian, thêm speaking
  const usedTime = recommendations.reduce((s, r) => s + r.duration, 0);
  if (usedTime < dailyMinutes) {
    recommendations.push({ type: 'speaking', title: 'Trò chuyện ngắn với AI', reason: 'Cải thiện phản xạ và tự nhiên', duration: Math.min(10, dailyMinutes - usedTime), priority: 4 });
  }

  // Tạo daily plan
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  await prisma.dailyLearningPlan.upsert({
    where: { userId_date: { userId: user!.id, date: today } },
    update: { totalMinutes: dailyMinutes, activities: JSON.stringify(recommendations) },
    create: { userId: user!.id, date: today, totalMinutes: dailyMinutes, activities: JSON.stringify(recommendations) }
  });

  return NextResponse.json({
    weakestSkills: weakest,
    strongestSkills: strongest,
    dailyMinutes,
    goalProgress,
    recommendations: recommendations.slice(0, 5),
    aiInsight: generateInsight(strongest, weakest)
  });
}

function generateInsight(strong: string[], weak: string[]): string {
  const strongLabels = strong.map(sKILL_LABEL).join(', ');
  const weakLabels = weak.map(sKILL_LABEL).join(', ');

  if (weakLabels) {
    return `Bạn đang có nền tảng ${strongLabels || 'tốt'}. Tuy nhiên ${weakLabels} đang là điểm yếu. Hệ thống đề xuất dành 60% thời gian học trong tuần cho ${weakLabels}.`;
  }
  return `Bạn đang có tiến bộ tốt ở tất cả các kỹ năng. Hãy duy trì nhịp học đều đặn!`;
}

function sKILL_LABEL(s: string): string {
  return { vocab: 'Từ vựng', grammar: 'Ngữ pháp', listening: 'Nghe', speaking: 'Nói', reading: 'Đọc', writing: 'Viết' }[s] || s;
}