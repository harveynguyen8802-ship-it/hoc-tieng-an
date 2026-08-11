import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-helpers';

export async function GET() {
  const { user, error } = await requireAuth();
  if (error) return error;

  const count = await prisma.notification.count({
    where: { userId: user!.id, read: false }
  });

  return NextResponse.json({ count });
}