import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, isValidEmail } from '@/lib/auth';
import { signAccessToken, signRefreshToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Vui lòng nhập email và mật khẩu' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Email không hợp lệ' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng' }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng' }, { status: 401 });
    }

    const payload = { userId: user.id, email: user.email, role: user.role };
    const accessToken = await signAccessToken(payload);
    const refreshToken = await signRefreshToken(payload);

    cookies().set('access_token', accessToken, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', maxAge: 15 * 60, path: '/'
    });
    cookies().set('refresh_token', refreshToken, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', maxAge: 7 * 24 * 60 * 60, path: '/'
    });

    return NextResponse.json({
      user: {
        id: user.id, email: user.email, fullName: user.fullName,
        avatar: user.avatar, role: user.role as 'USER' | 'ADMIN',
        currentLevel: user.currentLevel, dailyMinutes: user.dailyMinutes,
        placementDone: user.placementDone, xp: user.xp, level: user.level,
        streak: user.streak, longestStreak: user.longestStreak,
        totalStudyDays: user.totalStudyDays, totalStudyMinutes: user.totalStudyMinutes,
        targetLevel: user.targetLevel, targetExam: user.targetExam, targetScore: user.targetScore
      }
    });
  } catch (e) {
    console.error('Login error:', e);
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 });
  }
}