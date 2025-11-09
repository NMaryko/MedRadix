'use client';

import { useState } from 'react';

type NewsItem = {
  id: number;
  title: string;
  href: string;
  specialty: string;
};

const SPECIALTIES: string[] = [
  'Все',
  'Акушерство и гинекология',
  'Аллергология и иммунология',
  'Анестезиология и реаниматология',
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
    href: '#',
    specialty: 'Кардиология',
  },
  {
    id: 2,
    title:
      'FDA одобрило новый препарат для лечения сердечной недостаточности',
    href: '#',
    specialty: 'Кардиология',
  },
  {
    id: 3,
    title:
      'Исследование The Lancet: связь между сном и риском деменции',
    href: '#',
    specialty: 'Неврология',
  },
  {
    id: 4,
    title:
      'JAMA: влияние витамина D на иммунный ответ при COVID-19',
    href: '#',
    specialty: 'Аллергология и иммунология',
  },
  {
    id: 5,
    title:
      'Обновлены гайдлайны ADA по лечению сахарного диабета 2 типа',
    href: '#',
    specialty: 'Эндокринология',
  },
];

export default function HomePage() {
  const [activeSpecialty, setActiveSpecialty] = useState<string>('Все');

  const filteredNews =
    activeSpecialty === 'Все'
      ? NEWS_ITEMS
      : NEWS_ITEMS.filter((item) => item.specialty === activeSpecialty);

  return (
    <main className="bg-[#fcfcee] min-h-screen pt-4 pb-12">
      {/* Блок афоризма + специальность */}
      <section className="border-b border-[#e5ddc8] pb-6">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Сам афоризм */}
          <h1 className="text-center text-3xl md:text-[32px] font-semibold text-[#3b342d]">
            Mens sana in corpore sano
          </h1>

          {/* Перевод + чип + специальность на одной линии */}
          <div className="mt-3 flex items-center gap-4">
            {/* Чип слева */}
            <button className="flex-none px-5 py-1.5 text-[13px] font-medium rounded-full border border-[#c8c0ad] bg-white/80 text-[#3b342d] shadow-sm">
              Афоризм месяца
            </button>

            {/* Перевод по центру */}
            <p className="flex-1 text-center text-sm text-[#6a6255]">
              В здоровом теле — здоровый дух (Ювенал)
            </p>

            {/* Специальность справа */}
            <div className="flex-none text-right">
              <span className="block text-[11px] tracking-[0.16em] uppercase text-[#b3a58d] mb-1">
                специальность
              </span>
              <select
                value={activeSpecialty}
                onChange={(e) => setActiveSpecialty(e.target.value)}
                className="h-9 min-w-[190px] rounded-full border border-[#d3cbb7] bg-white px-4 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#015d52]/40 focus:border-[#015d52]"
              >
                {SPECIALTIES.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Список новостей с молнией слева */}
      <section className="mt-4">
        <div className="relative max-w-[1200px] mx-auto px-6 pt-2">
          {/* Одна большая жёлтая линия от 5-й до 1-й новости */}
          <div className="absolute left-[52px] top-3 bottom-3 flex justify-center">
            <div className="w-[2px] bg-[#facc15] lightning-bar" />
          </div>

          <ul className="space-y-4 pl-16">
            {filteredNews.map((item) => (
              <li
                key={item.id}
                className="flex items-start gap-4 group cursor-pointer"
              >
                {/* Иконка-кружок рядом с линией */}
                <div className="relative mt-[2px] flex h-6 w-6 items-center justify-center rounded-full border border-[#b3a58d] bg-white">
                  <span className="h-2 w-2 rounded-full bg-[#b3a58d] group-hover:bg-[#015d52] transition-colors" />
                </div>

                {/* Текст новости — крупнее, кликабельный */}
                <a
                  href={item.href}
                  className="text-[15px] leading-relaxed text-[#3b342d] group-hover:text-[#015d52] transition-colors"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
