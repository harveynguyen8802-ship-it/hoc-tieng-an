import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, isValidEmail } from '@/lib/auth';
import { signAccessToken, signRefreshToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, password } = await req.json();

    if (!fullName || !email || !password) {
      return NextResponse.json({ error: 'Vui lòng nhập đầy đủ thông tin' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Email không hợp lệ' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Mật khẩu phải có ít nhất 6 ký tự' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Email đã được sử dụng' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        fullName,
        role: 'USER',
        profile: { create: {} }
      }
    });

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
        role: user.role as 'USER' | 'ADMIN',
        currentLevel: user.currentLevel, dailyMinutes: user.dailyMinutes,
        placementDone: user.placementDone, xp: user.xp, level: user.level,
        streak: user.streak, longestStreak: user.longestStreak,
        totalStudyDays: user.totalStudyDays, totalStudyMinutes: user.totalStudyMinutes,
        targetLevel: user.targetLevel, targetExam: user.targetExam, targetScore: user.targetScore
      }
    });
  } catch (e) {
    console.error('Register error:', e);
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 });
  }
}