// app/calculators/cardiology/acs-risk/page.tsx
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

export default function CardiologyAcsRiskPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Кардиология');
  const router = useRouter();

  const handleSpecialtyChange = (value: string) => {
    setSelectedSpecialty(value);

    if (value !== 'Кардиология') {
      router.push('/calculators');
    }
  };

  return (
    <main className="min-h-screen bg-[#fcfcee] py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Заголовок + фильтр справа (как на главной) */}
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#015D52] mb-2">
              Калькуляторы риска 2 в 1
            </h1>
            <p className="text-sm text-gray-700 max-w-3xl">
              Кардиологические калькуляторы для пациентов с острым коронарным
              синдромом: GRACE/TIMI-like EU, HEART/ED risk и TIMI для NSTE-ACS/US.
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

        {/* Карточки-кнопки с фирменным контуром и подсветкой */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* 1. GRACE/TIMI-like EU */}
          <section
            className="group cursor-pointer rounded-3xl border border-[#015D52]/40 bg-white/80 p-5 shadow-sm transition hover:border-[#015D52] hover:shadow-lg hover:shadow-[#015D52]/15"
            // onClick={() => {/* здесь потом запустим расчёт GRACE/TIMI */}}
          >
            <h2 className="text-lg font-bold text-[#015D52] mb-3">
              GRACE/TIMI-like EU
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              Европейская и американская модификация оценки риска госпитальной
              и 6-месячной смертности в одном калькуляторе.
            </p>

            <div className="mb-3 rounded-2xl bg-sky-50 px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-sky-800 mb-1">
                eu Европейский подход
              </div>
              <ul className="text-xs text-gray-800 space-y-1">
                <li>• GRACE 2.0: госпитальная и 6-месячная смертность</li>
                <li>
                  • Параметры: возраст, ЧСС, САД, креатинин, СН, ЭКГ, тропонин
                </li>
              </ul>
            </div>

            <div className="mb-4 rounded-2xl bg-rose-50 px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-rose-800 mb-1">
                us Американский подход
              </div>
              <ul className="text-xs text-gray-800 space-y-1">
                <li>• TIMI Risk Score для NSTEMI</li>
                <li>
                  • 14-дневный риск смерти/ИМ/срочной реваскуляризации
                </li>
              </ul>
            </div>

            <p className="text-xs text-gray-700">
              <span className="font-semibold">Интерпретация:</span> ≥ 140
              баллов (GRACE) или ≥ 3 баллов (TIMI) — высокий риск, показана
              ранняя инвазивная стратегия.
            </p>
          </section>

          {/* 2. HEART / ED risk */}
          <section
            className="group cursor-pointer rounded-3xl border border-[#015D52]/40 bg-white/80 p-5 shadow-sm transition hover:border-[#015D52] hover:shadow-lg hover:shadow-[#015D52]/15"
            // onClick={() => {/* запуск HEART/ED */}}
          >
            <h2 className="text-lg font-bold text-[#015D52] mb-3">
              HEART/ED risk
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              Быстрая оценка краткосрочного риска MACE в приёмном отделении,
              включающая европейский HEART и международный EDACS.
            </p>

            <div className="mb-3 rounded-2xl bg-emerald-50 px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-emerald-800 mb-1">
                eu Европейский подход
              </div>
              <ul className="text-xs text-gray-800 space-y-1">
                <li>• HEART Score: 0–10 баллов</li>
                <li>
                  • Компоненты: анамнез, ЭКГ, возраст, факторы риска, тропонин
                </li>
              </ul>
            </div>

            <div className="mb-4 rounded-2xl bg-rose-50 px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-rose-800 mb-1">
                us Американский подход
              </div>
              <ul className="text-xs text-gray-800 space-y-1">
                <li>• EDACS (Emergency Department ACS Score)</li>
                <li>• Быстрая стратификация течения в течение 2 лет</li>
              </ul>
            </div>

            <p className="text-xs text-gray-700">
              <span className="font-semibold">Интерпретация:</span> низкий риск
              (HEART / EDACS) — возможна ранняя выписка или госпитализация в
              наблюдательное отделение.
            </p>
          </section>

          {/* 3. TIMI для NSTE-ACS / US */}
          <section
            className="group cursor-pointer rounded-3xl border border-[#015D52]/40 bg-white/80 p-5 shadow-sm transition hover:border-[#015D52] hover:shadow-lg hover:shadow-[#015D52]/15"
            // onClick={() => {/* запуск TIMI */}}
          >
            <h2 className="text-lg font-bold text-[#015D52] mb-3">
              TIMI для NSTE-ACS/US
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              Стратификация риска осложнений и отдалённого прогноза у пациентов
              с NSTE-ACS (ESC + ACC/AHA подходы).
            </p>

            <div className="mb-3 rounded-2xl bg-violet-50 px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-violet-800 mb-1">
                eu Европейский подход
              </div>
              <ul className="text-xs text-gray-800 space-y-1">
                <li>• ESC 2023: GRACE 2.0 для долгосрочного прогноза</li>
                <li>• Фокус на 6-месячной смертности и MACE</li>
              </ul>
            </div>

            <div className="mb-4 rounded-2xl bg-rose-50 px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-rose-800 mb-1">
                us Американский подход
              </div>
              <ul className="text-xs text-gray-800 space-y-1">
                <li>• ACC/AHA 2025: TIMI Risk Score + доп. параметры</li>
                <li>• Интеграция с PRECISE-DAPT для оценки кровотечений</li>
              </ul>
            </div>

            <p className="text-xs text-gray-700">
              <span className="font-semibold">Интерпретация:</span>{' '}
              комбинированная оценка ишемического и геморрагического риска для
              персонализации длительности ДАТТ.
            </p>
          </section>
        </div>

        {/* support — как на главной */}
        <footer className="mt-[500px] pt-4 text-base text-[#5E3830]">
          <a href="mailto:support@medradix.info" className="font-semibold">
            support@medradix.info
          </a>
        </footer>
      </div>
    </main>
  );
}

