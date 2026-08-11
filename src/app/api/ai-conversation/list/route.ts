import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/api-helpers';

export async function GET() {
  const { user, error } = await requireAuth();
  if (error) return error;

  const conversations = await prisma.aiConversation.findMany({
    where: { userId: user!.id },
    orderBy: { updatedAt: 'desc' },
    take: 30
  });

  return NextResponse.json({ conversations });
}

export async function POST(req: NextRequest) {
  const { user, error } = await requireAuth();
  if (error) return error;

  const { role, topic } = await req.json();
  const conv = await prisma.aiConversation.create({
    data: { userId: user!.id, role, topic: topic || 'free', messages: JSON.stringify([]) }
  });
  return NextResponse.json({ conversation: conv });
}