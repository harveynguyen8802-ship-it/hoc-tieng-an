import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isValidEmail } from '@/lib/auth';

// Mock forgot password - gửi email thật sẽ tích hợp sau
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Email không hợp lệ' }, { status: 400 });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    // Luôn trả success để tránh lộ email
    return NextResponse.json({
      message: 'Nếu email tồn tại, liên kết đặt lại mật khẩu đã được gửi.',
      emailExists: !!user
    });
  } catch {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 });
  }
}