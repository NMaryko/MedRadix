// app/calculators/cardiology/page.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FilterM } from '@/components/FilterM';
import { SupportM } from '@/components/SupportM';

interface CardConfig {
  id: string;
  title: string;
  subtitle: string;
  href?: string; // если есть — карточка кликабельна
  euTitle: string;
  euItems: string[];
  usTitle: string;
  usItems: string[];
  interpretation: string;
}

const CARDS: CardConfig[] = [
  {
    id: 'grace-timi',
    title: 'GRACE / TIMI (2 в 1)',
    subtitle:
      'Оценка риска при ОКС: европейский GRACE и американский TIMI в одном калькуляторе.',
    href: '/calculators/cardiology/grace-timi',
    euTitle: 'eu Европейский подход',
    euItems: [
      'GRACE 2.0: госпитальная и 6-месячная смертность',
      'Параметры: возраст, ЧСС, САД, креатинин, признаки СН, ЭКГ, тропонин',
    ],
    usTitle: 'us Американский подход',
    usItems: [
      'TIMI Risk Score для NSTEMI/UA',
      '14-дневный риск смерти/ИМ/срочная реваскуляризация',
    ],
    interpretation:
      'Интерпретация: ≥140 баллов по GRACE или ≥3 баллов по TIMI — высокий риск, показана ранняя инвазивная тактика.',
  },
  {
    id: 'heart-ed',
    title: 'HEART / ED risk',
    subtitle:
      'Быстрая оценка краткосрочного риска MACE в приёмном отделении, включающая европейский HEART и международный EDACS.',
    euTitle: 'eu Европейский подход',
    euItems: [
      'HEART Score: 0–10 баллов',
      'Компоненты: анамнез, ЭКГ, возраст, факторы риска, тропонин',
    ],
    usTitle: 'us Американский подход',
    usItems: [
      'EDACS (Emergency Department Assessment of Chest Pain Score)',
      'Быстрая стратификация в течение 2 часов',
    ],
    interpretation:
      'Интерпретация: низкий риск по HEART / EDACS соответствует безопасной госпитализации в наблюдение; низкий риск по EDACS — возможна ранняя выписка.',
  },
  {
    id: 'timi-nste',
    title: 'TIMI для NSTE-ACS / US',
    subtitle:
      'Стратификация риска осложнений и отдалённого прогноза у пациентов с NSTE-ACS с учётом европейских GRACE и американских TIMI-подходов.',
    euTitle: 'eu Европейский подход',
    euItems: [
      'ESC 2023: использование GRACE 2.0 для долгосрочного прогноза',
      'Фокусировка на 6-месячной смертности',
    ],
    usTitle: 'us Американский подход',
    usItems: [
      'ACC/AHA TIMI Risk Score + дополнительные параметры',
      'Интеграция с PRECISE-DAPT для оценки кровотечений',
    ],
    interpretation:
      'Интерпретация: комбинированная оценка GRACE и TIMI позволяет персонализировать уровень ишемического и геморрагического риска при выборе длительности и интенсивности ДАТТ.',
  },
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
        {/* верх: заголовок + фильтр М справа */}
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <h1 className="mb-2 text-3xl font-bold text-[#015D52]">
              Кардиологические калькуляторы
            </h1>
            <p className="text-sm text-gray-700">
              Выберите калькулятор для оценки риска и поддержки решений при
              кардиологических пациентах. Все расчёты основаны на европейских и
              американских рекомендациях.
            </p>
          </div>

          <div className="w-full md:w-72">
            <FilterM
              selected={selectedSpecialty}
              onChange={handleSpecialtyChange}
            />
          </div>
        </header>

        {/* карточки калькуляторов */}
        <section className="grid gap-4 md:grid-cols-3">
          {CARDS.map((card) => {
            const CardInner = (
              <div className="h-full rounded-3xl border border-[#015D52]/30 bg-white/80 p-5 shadow-sm transition hover:border-[#015D52] hover:shadow-md">
                <h2 className="mb-2 text-[15px] md:text-[16px] font-medium tracking-[0.03em] uppercase text-[#5E3830]">
                  {card.title}
                </h2>
                <p className="mb-3 text-xs md:text-sm text-gray-800">
                  {card.subtitle}
                </p>

                <div className="space-y-3 text-xs md:text-[13px]">
                  <div className="rounded-2xl bg-[#e7f3ff] px-3 py-2">
                    <p className="mb-1 text-[11px] font-semibold uppercase text-[#015D52]">
                      {card.euTitle}
                    </p>
                    <ul className="list-disc space-y-1 pl-4 text-gray-800">
                      {card.euItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-[#ffe7ee] px-3 py-2">
                    <p className="mb-1 text-[11px] font-semibold uppercase text-[#5E3830]">
                      {card.usTitle}
                    </p>
                    <ul className="list-disc space-y-1 pl-4 text-gray-800">
                      {card.usItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-[11px] text-gray-700">
                    <span className="font-semibold">Интерпретация: </span>
                    {card.interpretation}
                  </p>
                </div>
              </div>
            );

            // пока кликабельна только первая карта (рабочий калькулятор)
            if (card.href) {
              return (
                <Link key={card.id} href={card.href} className="block">
                  {CardInner}
                </Link>
              );
            }

            return (
              <div key={card.id} className="block cursor-default">
                {CardInner}
              </div>
            );
          })}
        </section>

        {/* единый SupportM снизу */}
        <SupportM />
      </div>
    </main>
  );
}


