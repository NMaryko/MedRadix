// app/calculators/cardiology/page.tsx
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

export default function CardiologyCalculatorsPage() {
  const router = useRouter();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Кардиология');

  const handleSpecialtyChange = (value: string) => {
    setSelectedSpecialty(value);
    if (value !== 'Кардиология') {
      router.push('/calculators');
    }
  };

  return (
    <main className="min-h-screen bg-[#fcfcee] py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* верх: заголовок + фильтр справа */}
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#015D52] mb-2">
              Кардиологические калькуляторы
            </h1>
            <p className="text-sm text-gray-700 max-w-3xl">
              Выберите калькулятор для оценки риска и поддержки решений при
              кардиологических пациентах.
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

        {/* карточки кардио-калькуляторов */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* 1. GRACE / TIMI */}
          <section
            className="group cursor-pointer rounded-3xl border border-[#015D52]/40 bg-white/80 p-5 shadow-sm transition hover:border-[#015D52] hover:shadow-lg hover:shadow-[#015D52]/15"
            onClick={() => router.push('/calculators/cardiology/grace-timi')}
          >
            <h2 className="text-lg font-bold text-[#015D52] mb-3">
              GRACE / TIMI (2 в 1)
            </h2>
            <p className="text-sm text-gray-700 mb-3">
              Оценка риска при ОКС: европейский GRACE и американский TIMI в одном
              калькуляторе.
            </p>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• Ввод в европейских единицах</li>
              <li>• Автоматическая конверсия для TIMI</li>
              <li>• Раздельный вывод 🇪🇺 / 🇺🇸</li>
            </ul>
          </section>

          {/* 2. Заглушка под HEART */}
          <section className="rounded-3xl border border-[#015D52]/20 bg-white/60 p-5 text-sm text-gray-500">
            <h2 className="text-lg font-bold text-[#015D52] mb-3">
              HEART / ED risk
            </h2>
            <p>Будет добавлен отдельным калькулятором.</p>
          </section>

          {/* 3. Заглушка под TIMI NSTE-ACS */}
          <section className="rounded-3xl border border-[#015D52]/20 bg-white/60 p-5 text-sm text-gray-500">
            <h2 className="text-lg font-bold text-[#015D52] mb-3">
              TIMI для NSTE-ACS / US
            </h2>
            <p>Будет добавлен отдельным калькулятором.</p>
          </section>
        </div>

        {/* support снизу по центру */}
        <footer className="mt-[500px] pt-4 text-base text-[#5E3830] text-center">
          <a href="mailto:support@medradix.info" className="font-semibold">
            support@medradix.info
          </a>
        </footer>
      </div>
    </main>
  );
}
