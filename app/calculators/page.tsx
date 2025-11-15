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

    // При выборе кардиологии сразу ведём на страницу с калькуляторами ОКС
    if (value === 'Кардиология') {
      router.push('/calculators/cardiology/acs-risk');
    }
  };

  const showDevMessage =
    selectedSpecialty !== 'Все' && selectedSpecialty !== 'Кардиология';

  return (
    <main className="min-h-screen bg-[#fcfcee] py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Заголовок + фильтр (фильтр справа сверху) */}
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#015D52] mb-3">
              Калькуляторы MedRadix
            </h1>
            <p className="text-sm text-gray-700 max-w-3xl mb-3">
              Интерактивные клинические калькуляторы формата{' '}
              <span className="font-semibold">«2 в 1»</span>, объединяющие
              европейские и американские подходы в одном инструменте. Врач
              видит сразу оба алгоритма и может быстро сопоставить
              рекомендации.
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Экономия времени при приёме и в стационаре.</li>
              <li>• Прозрачная логика: видно, как формируется риск-балл.</li>
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
              className="w-full rounded-xl border border-[#015D52] bg-white/90 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#015D52] focus:outline-none focus:ring-2 focus:ring-[#015D52]/30"
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

        {/* Почти пустая главная: только сообщение о разработке при выборе других спец. */}
        {showDevMessage && (
          <div className="rounded-2xl border border-dashed border-[#015D52]/40 bg-white/70 p-6 text-sm text-gray-700">
            Для специальности{' '}
            <span className="font-semibold">{selectedSpecialty}</span> калькуляторы
            ещё в разработке.
          </div>
        )}

        {/* Низ страницы: только email без текста */}
        <footer className="mt-10 border-t border-emerald-100 pt-4 text-xs text-[#015D52]">
          <a href="mailto:support@medradix.info">support@medradix.info</a>
        </footer>
      </div>
    </main>
  );
}


