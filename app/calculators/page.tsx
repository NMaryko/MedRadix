// app/calculators/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

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
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Кардиология');

  const isCardiology = selectedSpecialty === 'Кардиология';

  return (
    <main className="min-h-screen bg-[#fcfcee] py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Заголовок + фильтр (фильтр справа сверху) */}
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Калькуляторы MedRadix
            </h1>
            <p className="text-sm text-gray-700 max-w-2xl">
              Клинические калькуляторы для ежедневной практики. Выберите
              специальность, чтобы увидеть доступные инструменты. Для старта
              реализованы калькуляторы риска при остром коронарном синдроме.
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
              className="w-full rounded-xl border border-emerald-200 bg-white/90 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              {SPECIALTIES.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        </header>

        {/* Контент в зависимости от выбранной специальности */}
        {isCardiology ? (
          <>
            <div className="mb-4 flex items-center justify-between gap-2">
              <h2 className="text-2xl font-bold text-gray-900">
                Калькуляторы риска 2 в 1 (Кардиология)
              </h2>
              <Link
                href="/calculators/cardiology/acs-risk"
                className="hidden text-xs font-semibold text-emerald-700 underline md:inline"
              >
                Открыть отдельную страницу ОКС-калькуляторов
              </Link>
            </div>

            <p className="text-sm text-gray-700 mb-6 max-w-3xl">
              Европейские и американские алгоритмы стратификации риска при
              остром коронарном синдроме, оформленные в виде трёх основных
              калькуляторов: GRACE/TIMI-like EU, HEART/ED risk и TIMI для
              NSTE-ACS/US.
            </p>

            {/* Блок из трёх карточек — макет как в гайдах */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* 1. GRACE/TIMI-like EU */}
              <section className="rounded-3xl border border-sky-100 bg-white/80 p-5 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  GRACE/TIMI-like EU
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  Европейская и американская модификация оценки риска
                  госпитальной и 6-месячной смертности в одном калькуляторе.
                </p>

                <div className="mb-3 rounded-2xl bg-sky-50 px-4 py-3">
                  <div className="text-xs font-semibold uppercase tracking-wide text-sky-800 mb-1">
                    eu Европейский подход
                  </div>
                  <ul className="text-xs text-gray-800 space-y-1">
                    <li>• GRACE 2.0: госпитальная и 6-месячная смертность</li>
                    <li>
                      • Параметры: возраст, ЧСС, САД, креатинин, СН, ЭКГ,
                      тропонин
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
              <section className="rounded-3xl border border-emerald-100 bg-white/80 p-5 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  HEART/ED risk
                </h3>
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
                      • Компоненты: анамнез, ЭКГ, возраст, факторы риска,
                      тропонин
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
                  <span className="font-semibold">Интерпретация:</span> низкий
                  риск (HEART / EDACS) — возможна ранняя выписка или госпитализация
                  в наблюдательное отделение.
                </p>
              </section>

              {/* 3. TIMI для NSTE-ACS / US */}
              <section className="rounded-3xl border border-violet-100 bg-white/80 p-5 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  TIMI для NSTE-ACS/US
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  Стратификация риска осложнений и отдалённого прогноза у
                  пациентов с NSTE-ACS (ESC + ACC/AHA подходы).
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
                  комбинированная оценка ишемического и геморрагического риска
                  для персонализации длительности ДАТТ.
                </p>
              </section>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-emerald-200 bg-white/70 p-6 text-sm text-gray-700">
            Для выбранной специальности калькуляторы ещё в разработке. Если
            вам важно ускорить появление конкретного инструмента, напишите нам
            на{' '}
            <a
              href="mailto:support@medradix.info"
              className="font-semibold text-emerald-700 underline"
            >
              support@medradix.info
            </a>
            .
          </div>
        )}

        {/* Низ страницы */}
        <footer className="mt-10 border-t border-emerald-100 pt-4 text-xs text-gray-600">
          По вопросам работы калькуляторов:{" "}
          <a
            href="mailto:support@medradix.info"
            className="font-semibold text-emerald-700"
          >
            support@medradix.info
          </a>
        </footer>
      </div>
    </main>
  );
}

