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
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Все');
  const router = useRouter();

  const handleSpecialtyChange = (value: string) => {
    setSelectedSpecialty(value);

    if (value === 'Кардиология') {
      router.push('/calculators/cardiology/acs-risk');
    }
  };

  const showDevMessage =
    selectedSpecialty !== 'Все' && selectedSpecialty !== 'Кардиология';

  return (
    <main className="min-h-screen bg-[#fcfcee] py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Заголовок + фильтр */}
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#015D52] mb-3">
              Калькуляторы MedRadix
            </h1>
            <p className="text-sm text-gray-700 max-w-3xl mb-3">
              Интерактивные клинические калькуляторы формата{' '}
              <span className="font-semibold">«2 в 1»</span>, объединяющие
              европейские и американские подходы в одном инструменте.
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Экономия времени при приёме и в стационаре.</li>
              <li>• Прозрачная логика формирования риск-балла.</li>
              <li>• Акцент на практические решения, а не теорию.</li>
            </ul>
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

        {showDevMessage && (
          <div className="rounded-2xl border border-dashed border-[#015D52]/40 bg-white/70 p-6 text-sm text-gray-700">
            Для специальности{' '}
            <span className="font-semibold">{selectedSpecialty}</span>{' '}
            калькуляторы ещё в разработке.
          </div>
        )}

        {/* support — без линии, ниже и крупнее, коричневый */}
        <footer className="mt-[500px] pt-4 text-base text-[#5E3830]">
          <a href="mailto:support@medradix.info" className="font-semibold">
            support@medradix.info
          </a>
        </footer>
      </div>
    </main>
  );
}



