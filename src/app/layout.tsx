import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { PresentationProvider } from '@/context/PresentationContext';
import { AuthProvider } from '@/components/providers/AuthProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DeckMind AI — Presentation Intelligence Platform',
  description:
    'Turn any document into a presentation worth presenting. DeckMind understands your document, identifies what matters, and transforms it into a structured, visually engaging presentation.',
  keywords: [
    'presentation intelligence',
    'AI presentation maker',
    'research paper to ppt',
    'project viva slides',
    'document to presentation',
    'engineering seminar slides',
  ],
  authors: [{ name: 'DeckMind AI' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen mesh-canvas text-slate-900 selection:bg-indigo-500/20 selection:text-indigo-900">
        <AuthProvider>
          <PresentationProvider>{children}</PresentationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
