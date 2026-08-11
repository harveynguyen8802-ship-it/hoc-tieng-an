import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { hashPassword, verifyPassword } from '@/lib/auth';

export async function PUT(req: NextRequest) {
  try {
    const token = cookies().get('access_token')?.value;
    if (!token) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });

    const payload = await verifyAccessToken(token);
    if (!payload) return NextResponse.json({ error: 'Token không hợp lệ' }, { status: 401 });

    const data = await req.json();
    const { fullName, currentLevel, targetLevel, targetExam, targetScore, dailyMinutes, avatar, currentPassword, newPassword } = data;

    const updateData: Record<string, unknown> = {};
    if (fullName !== undefined) updateData.fullName = fullName;
    if (currentLevel !== undefined) updateData.currentLevel = currentLevel;
    if (targetLevel !== undefined) updateData.targetLevel = targetLevel;
    if (targetExam !== undefined) updateData.targetExam = targetExam;
    if (targetScore !== undefined) updateData.targetScore = targetScore;
    if (dailyMinutes !== undefined) updateData.dailyMinutes = dailyMinutes;
    if (avatar !== undefined) updateData.avatar = avatar;

    if (newPassword) {
      if (!currentPassword) return NextResponse.json({ error: 'Vui lòng nhập mật khẩu hiện tại' }, { status: 400 });
      const user = await prisma.user.findUnique({ where: { id: payload.userId } });
      if (!user) return NextResponse.json({ error: 'Người dùng không tồn tại' }, { status: 404 });
      const valid = await verifyPassword(currentPassword, user.passwordHash);
      if (!valid) return NextResponse.json({ error: 'Mật khẩu hiện tại không đúng' }, { status: 401 });
      if (newPassword.length < 6) return NextResponse.json({ error: 'Mật khẩu mới phải có ít nhất 6 ký tự' }, { status: 400 });
      updateData.passwordHash = await hashPassword(newPassword);
    }

    const user = await prisma.user.update({
      where: { id: payload.userId },
      data: updateData,
      select: {
        id: true, email: true, fullName: true, avatar: true, role: true,
        currentLevel: true, dailyMinutes: true, placementDone: true,
        xp: true, level: true, streak: true, longestStreak: true,
        totalStudyDays: true, totalStudyMinutes: true,
        targetLevel: true, targetExam: true, targetScore: true
      }
    });

    return NextResponse.json({ user });
  } catch (e) {
    console.error('Update profile error:', e);
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 });
  }
}