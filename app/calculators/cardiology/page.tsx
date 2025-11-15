// app/calculators/cardiology/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SupportM } from '@/components/SupportM';
import { FilterM } from '@/components/FilterM';

export default function CardiologyCalculatorsPage() {
  const router = useRouter();
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<string>('Кардиология');

  const handleSpecialtyChange = (value: string) => {
    setSelectedSpecialty(value);
    if (value !== 'Кардиология') {
      router.push('/calculators');
    }
  };

  return (
    <main className="min-h-screen bg-[#fcfcee] py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* верх: заголовок + FilterM справа */}
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#015D52] mb-2">
              Кардиологические калькуляторы
            </h1>
            <p className="text-sm text-gray-700 max-w-xl">
              Выберите калькулятор для оценки риска и поддержки решений при
              кардиологических состояниях. Все расчёты основаны на
              европейских и американских рекомендациях.
            </p>
          </div>

          <FilterM
            selected={selectedSpecialty}
            onChange={handleSpecialtyChange}
          />
        </header>

        {/* карточки калькуляторов — как в гайдах */}
        <section className="grid gap-4 md:grid-cols-3">
          {/* GRACE / TIMI (2 в 1) */}
          <button
            type="button"
            onClick={() => router.push('/calculators/cardiology/grace-timi')}
            className="h-full rounded-3xl border border-[#015D52]/25 bg-white/80 px-4 py-4 text-left shadow-sm transition hover:border-[#015D52] hover:shadow-md"
          >
            <h2 className="mb-1 text-sm font-extrabold tracking-tight text-[#015D52]">
              GRACE / TIMI (2 в 1)
            </h2>
            <p className="mb-3 text-xs text-gray-800">
              Европейская и американская модификация оценки риска
              внутрибольничной и 6-месячной смертности при ОКС в одном
              калькуляторе.
            </p>

            <div className="mb-2 rounded-lg bg-[#e7f2ff] px-3 py-2">
              <p className="mb-1 text-[11px] font-semibold text-[#134b84]">
                🇪🇺 Европейский подход
              </p>
              <p className="text-[11px] text-gray-800">
                GRACE 2.0: госпитальная и 6-месячная смертность. Параметры:
                возраст, ЧСС, САД, креатинин, признаки СН, ЭКГ, тропонин.
              </p>
            </div>

            <div className="mb-2 rounded-lg bg-[#ffe9ec] px-3 py-2">
              <p className="mb-1 text-[11px] font-semibold text-[#a7233c]">
                🇺🇸 Американский подход
              </p>
              <p className="text-[11px] text-gray-800">
                TIMI Risk Score для NSTEMI: оценка 14-дневного риска смерти /
                ИМ / срочной реваскуляризации.
              </p>
            </div>

            <p className="mt-1 text-[11px] text-gray-700">
              <span className="font-semibold">Интерпретация:</span> ≥140 баллов
              по GRACE или ≥3 баллов по TIMI — высокий риск, показана ранняя
              инвазивная тактика.
            </p>
          </button>

          {/* HEART / ED risk */}
          <div className="h-full rounded-3xl border border-[#015D52]/15 bg-white/80 px-4 py-4 text-left shadow-sm">
            <h2 className="mb-1 text-sm font-extrabold tracking-tight text-[#015D52]">
              HEART / ED risk
            </h2>
            <p className="mb-3 text-xs text-gray-800">
              Быстрая оценка краткосрочного риска MACE в приёмном отделении,
              включающая европейский HEART и международный EDACS.
            </p>

            <div className="mb-2 rounded-lg bg-[#e7f2ff] px-3 py-2">
              <p className="mb-1 text-[11px] font-semibold text-[#134b84]">
                🇪🇺 Европейский подход
              </p>
              <p className="text-[11px] text-gray-800">
                HEART Score: 0–10 баллов. Факторы риска, анамнез, ЭКГ, возраст,
                биомаркеры (тропонин).
              </p>
            </div>

            <div className="mb-2 rounded-lg bg-[#ffe9ec] px-3 py-2">
              <p className="mb-1 text-[11px] font-semibold text-[#a7233c]">
                🌍 EDACS / международный подход
              </p>
              <p className="text-[11px] text-gray-800">
                EDACS (Emergency Department Assessment of Chest Pain Score) —
                быстрая стратификация риска в течение первых 2 часов.
              </p>
            </div>

            <p className="mt-1 text-[11px] text-gray-700">
              <span className="font-semibold">Интерпретация:</span> низкие
              значения HEART / EDACS соответствуют &lt;3% риску неблагоприятных
              событий и позволяют рассмотреть раннюю выписку при отсутствии
              других факторов риска.
            </p>
          </div>

          {/* TIMI для NSTE-ACS / US */}
          <div className="h-full rounded-3xl border border-[#015D52]/15 bg-white/80 px-4 py-4 text-left shadow-sm">
            <h2 className="mb-1 text-sm font-extrabold tracking-tight text-[#015D52]">
              TIMI для NSTE-ACS / US
            </h2>
            <p className="mb-3 text-xs text-gray-800">
              Стратификация риска осложнений и отдалённого прогноза у
              пациентов с NSTE-ACS с учётом европейских GRACE и американских
              TIMI-подходов.
            </p>

            <div className="mb-2 rounded-lg bg-[#e7f2ff] px-3 py-2">
              <p className="mb-1 text-[11px] font-semibold text-[#134b84]">
                🇪🇺 Европейский подход
              </p>
              <p className="text-[11px] text-gray-800">
                ESC 2023: использование GRACE 2.0 для оценки долгосрочного
                прогноза с фокусом на 6-месячной смертности.
              </p>
            </div>

            <div className="mb-2 rounded-lg bg-[#ffe9ec] px-3 py-2">
              <p className="mb-1 text-[11px] font-semibold text-[#a7233c]">
                🇺🇸 Американский подход
              </p>
              <p className="text-[11px] text-gray-800">
                ACC/AHA: TIMI Risk Score с дополнительными параметрами и
                возможной интеграцией с PRECISE-DAPT для оценки риска
                кровотечений.
              </p>
            </div>

            <p className="mt-1 text-[11px] text-gray-700">
              <span className="font-semibold">Интерпретация:</span> сочетание
              шкал GRACE и TIMI позволяет одновременно оценить ишемический и
              геморрагический риск и персонализировать интенсивность ДАТТ.
            </p>
          </div>
        </section>

        <SupportM />
      </div>
    </main>
  );
}

