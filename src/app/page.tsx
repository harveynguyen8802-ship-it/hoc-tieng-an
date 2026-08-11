import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const token = cookies().get('access_token')?.value;
  if (token) {
    const payload = await verifyAccessToken(token);
    if (payload) {
      const user = await prisma.user.findUnique({ where: { id: payload.userId } });
      if (user) {
        if (user.role === 'ADMIN') redirect('/admin');
        if (!user.placementDone) redirect('/placement');
        redirect('/dashboard');
      }
    }
  }
  redirect('/login');
}