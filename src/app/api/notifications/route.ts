import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-helpers';

export async function GET() {
  const { user, error } = await requireAuth();
  if (error) return error;

  const notifications = await prisma.notification.findMany({
    where: { userId: user!.id },
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  return NextResponse.json({ notifications });
}

export async function POST(req: NextRequest) {
  const { user, error } = await requireAuth();
  if (error) return error;

  await prisma.notification.updateMany({
    where: { userId: user!.id, read: false },
    data: { read: true }
  });

  return NextResponse.json({ success: true });
}