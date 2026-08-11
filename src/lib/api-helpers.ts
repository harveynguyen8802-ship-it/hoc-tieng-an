import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyAccessToken } from './auth';
import { prisma } from './prisma';

export async function getAuthUser() {
  const token = cookies().get('access_token')?.value;
  if (!token) return null;
  const payload = await verifyAccessToken(token);
  if (!payload) return null;
  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  return user;
}

export async function requireAuth() {
  const user = await getAuthUser();
  if (!user) {
    return { user: null, error: NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 }) };
  }
  return { user, error: null };
}

export async function requireAdmin() {
  const { user, error } = await requireAuth();
  if (error) return { user: null, error };
  if (user?.role !== 'ADMIN') {
    return { user: null, error: NextResponse.json({ error: 'Không có quyền truy cập' }, { status: 403 }) };
  }
  return { user, error: null };
}