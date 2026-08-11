import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) return NextResponse.json({ user: null });

    const payload = await verifyAccessToken(accessToken);
    if (!payload) return NextResponse.json({ user: null });

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true, email: true, fullName: true, avatar: true, role: true,
        currentLevel: true, dailyMinutes: true, placementDone: true,
        xp: true, level: true, streak: true, longestStreak: true,
        totalStudyDays: true, totalStudyMinutes: true,
        targetLevel: true, targetExam: true, targetScore: true
      }
    });

    if (!user) return NextResponse.json({ user: null });
    return NextResponse.json({ user });
  } catch (e) {
    console.error('Me error:', e);
    return NextResponse.json({ user: null });
  }
}