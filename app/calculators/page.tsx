// app/calculators/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SPECIALTIES: string[] = [
  'Все',
  'Акушерство и гинекология',
  'Аллергология и иммунология',
  'Анестезиология и реаниматология',
  'Гастроэнтерология',
  'Гематология',
  'Дерматология',
  'Инфекционные болезни',
  'Кардиология',
  'Неврология',
  'Нефрология',
  'Онкология',
  'Офтальмология',
  'Педиатрия',
  'Пульмонология',
  'Психиатрия',
  'Ревматология',
  'Стоматология',
  'Терапия',
  'Травматология и ортопедия',
  'Урология',
  'Хирургия',
  'Эндокринология',
];

export default function CalculatorsPage() {
  const router = useRouter();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Все');

  const handleSpecialtyChange = (value: string) => {
    setSelectedSpecialty(value);

    if (value === 'Кардиология') {
      router.push('/calculators/cardiology');
    }
    // Остальные специальности пока никуда не ведём
  };

  return (
    <main className="min-h-screen bg-[#fcfcee] py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* заголовок + фильтр */}
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#015D52] mb-2">
              Калькуляторы MedRadix
            </h1>
            <p className="text-sm text-gray-700 max-w-3xl">
              Калькуляторы риска и принятия решений, адаптированные под европейские
              и американские рекомендации. Выберите специальность, чтобы перейти к
              доступным инструментам.
            </p>
          </div>

          <div className="w-full md:w-80">
            <label
              htmlFor="specialty-select"
              className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700"
            >
              Специальность
            </label>
            <select
              id="specialty-select"
              className="w-full rounded-xl border border-[#015D52] bg-white/90 px-3 py-2 text-sm text-gray-900 text-center shadow-sm transition hover:border-[#015D52] hover:ring-2 hover:ring-[#015D52]/20 focus:border-[#015D52] focus:outline-none focus:ring-2 focus:ring-[#015D52]/30"
              value={selectedSpecialty}
              onChange={(e) => handleSpecialtyChange(e.target.value)}
            >
              {SPECIALTIES.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        </header>

        {/* простой текст-заглушка, пока не выбрана конкретная спец. */}
        <section className="rounded-3xl border border-[#015D52]/20 bg-white/70 p-6 text-sm text-gray-700">
     
        </section>

        {/* support снизу по центру */}
        <footer className="mt-[400px] pt-4 text-base text-[#5E3830] text-center">
          <a href="mailto:support@medradix.info" className="font-semibold">
            support@medradix.info
          </a>
        </footer>
      </div>
    </main>
  );
}



