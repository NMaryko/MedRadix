// app/guides/coming-soon/page.tsx
'use client';

import { SupportM } from '@/components/SupportM';

export default function GuidesComingSoonPage() {
  return (
    <main className="min-h-screen bg-[#fcfcee] py-10">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h1 className="mb-4 text-2xl font-bold text-[#015D52]">
          Раздел в разработке
        </h1>
        <p className="text-sm text-gray-700 mb-2">
          Страница для выбранной специальности или нозологии находится в работе.
        </p>
        <p className="text-sm text-gray-700">
          Пожалуйста, вернитесь позже или выберите другую комбинацию в меню «Гайды».
        </p>

        <SupportM />
      </div>
    </main>
  );
}
