import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/lib/auth-context';

const inter = Inter({ subsets: ['latin', 'vietnamese'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Học Tiếng Anh AI - Nền tảng học tiếng Anh cá nhân hóa',
  description: 'Học tiếng Anh thông minh với AI, lộ trình cá nhân hóa dành cho người Việt. Từ vựng, ngữ pháp, luyện nghe, nói, đọc, viết, TOEIC, IELTS.',
  keywords: ['học tiếng Anh', 'AI', 'cá nhân hóa', 'từ vựng', 'ngữ pháp', 'TOEIC', 'IELTS'],
  authors: [{ name: 'Học Tiếng Anh AI' }],
  openGraph: {
    title: 'Học Tiếng Anh AI',
    description: 'Nền tảng học tiếng Anh cá nhân hóa bằng AI',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={inter.variable}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" toastOptions={{
            style: { borderRadius: '12px', background: '#1e293b', color: '#fff' },
            duration: 3000
          }} />
        </AuthProvider>
      </body>
    </html>
  );
}