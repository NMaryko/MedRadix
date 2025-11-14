import type { Metadata } from 'next';
import './globals.css';
import Header from './components/Header/Header';

export const metadata: Metadata = {
  title: 'MedRadix — международная медицинская платформа',
  description:
    'MedRadix — международная медицинская платформа для врачей и среднего медперсонала. Scientia pro vita — Знания во благо жизни: структурированные клинические гайдлайны EU и US, калькуляторы риска, база препаратов и подборка онлайн-курсов с баллами непрерывного медицинского образования.',
  alternates: {
    canonical: 'https://medradix.info/',
  },
  openGraph: {
    title: 'MedRadix — международная медицинская платформа',
    description:
      'MedRadix — международная медицинская платформа для врачей и среднего медперсонала. Scientia pro vita — Знания во благо жизни: структурированные клинические гайдлайны EU и US, калькуляторы риска, база препаратов и подборка онлайн-курсов с баллами непрерывного медицинского образования.',
    url: 'https://medradix.info/',
    siteName: 'MedRadix',
    locale: 'ru_RU',
    type: 'website',
  },
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



