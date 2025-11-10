import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header/Header';

export const metadata: Metadata = {
  title: 'MedRadix',
  description: 'Международная образовательная медицинская платформа MedRadix',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-white text-slate-900">
        <Header />
        <main className="max-w-[1360px] mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}

