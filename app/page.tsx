'use client';

import { useState } from 'react';

type NewsItem = {
  id: number;
  title: string;
  specialty: string;
  href: string;
};

const SPECIALTIES: string[] = [
  'Все',
  'Аллергология',
  'Анестезиология',
  'Гастроэнтерология',
  'Гематология',
  'Гериатрия',
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
  'Терапия',
  'Травматология и ортопедия',
  'Урология',
  'Хирургия',
  'Эндокринология',
];

const NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    title:
      'Новые рекомендации ESC по ведению пациентов с фибрилляцией предсердий',
    specialty: 'Кардиология',
    href: '#',
  },
  {
    id: 2,
    title:
      'FDA одобрило новый препарат для лечения сердечной недостаточности',
    specialty: 'Кардиология',
    href: '#',
  },
  {
    id: 3,
    title:
      'Исследование The Lancet: связь между сном и риском деменции',
    specialty: 'Неврология',
    href: '#',
  },
  {
    id: 4,
    title:
      'JAMA: влияние витамина D на иммунный ответ при COVID-19',
    specialty: 'Инфекционные болезни',
    href: '#',
  },
  {
    id: 5,
    title:
      'Обновлены гайдлайны ADA по лечению сахарного диабета 2 типа',
    specialty: 'Эндокринология',
    href: '#',
  },
];

export default function HomePage() {
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<string>('Все');

  const filteredNews =
    selectedSpecialty === 'Все'
      ? NEWS_ITEMS
      : NEWS_ITEMS.filter(
          (item) => item.specialty === selectedSpecialty,
        );

  return (
    <main className="bg-[#fcfcee] min-h-screen pb-16">
      {/* Блок афоризма */}
      <section className="border-b border-gray-200">
        <div className="max-w-[1360px] mx-auto px-6 pt-4 pb-8">
          {/* Афоризм по центру, ближе к шапке */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-semibold italic text-[#3b342d]">
              Mens sana in corpore sano
            </h1>
          </div>

          {/* Чип + фильтр специальности на одной линии */}
          <div className="mt-4 flex items-center justify-between">
            {/* Чип слева */}
            <button className="px-5 py-1.5 text-xs font-medium rounded-full border border-[#b6b5aa] text-[#3b342d] bg-white shadow-sm">
              Афоризм месяца
            </button>

            {/* Специальность: надпись + селект друг под другом */}
            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#b0a38a]">
                СПЕЦИАЛЬНОСТЬ
              </span>
              <select
                value={selectedSpecialty}
                onChange={(e) =>
                  setSelectedSpecialty(e.target.value)
                }
                className="min-w-[240px] rounded-full border border-[#d1cbb5] bg-white px-4 py-1.5 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#015d52]/40 focus:border-[#015d52]"
              >
                {SPECIALTIES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Перевод строго по центру под афоризмом */}
          <p className="mt-4 text-sm md:text-base text-center text-[#6b635a]">
            В здоровом теле — здоровый дух (Ювенал)
          </p>
        </div>
      </section>

      {/* Новости с одной длинной жёлтой линией слева */}
      <section className="relative max-w-[1360px] mx-auto px-6 pt-10 pb-8">
        {/* Одна общая линия от нижней новости к верхней */}
        <div className="pointer-events-none absolute left-[32px] top-0 bottom-0 flex justify-center">
          <div className="w-[2px] bg-[#facc15] lightning-bar" />
        </div>

        <ul className="space-y-4 pl-14">
          {filteredNews.map((item) => (
            <li key={item.id} className="flex items-start gap-4">
              {/* Кружок-иконка перед ссылкой */}
              <div className="relative mt-1 flex h-7 w-7 items-center justify-center rounded-full border border-[#3b6040] bg-white">
                <span className="h-3 w-3 rounded-full bg-[#3b6040]" />
              </div>

              {/* Новость — кликабельная ссылка, крупнее шрифт */}
              <a
                href={item.href}
                className="text-[16px] md:text-[17px] leading-relaxed text-[#3b342d] hover:text-[#015d52] transition-colors"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
