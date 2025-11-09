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
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Все');

  const filteredNews =
    selectedSpecialty === 'Все'
      ? NEWS_ITEMS
      : NEWS_ITEMS.filter(
          (item) => item.specialty === selectedSpecialty
        );

  return (
    <main className="bg-[#fcfcee] min-h-screen">
      {/* Блок афоризма + специальность */}
      <section className="border-b border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 pt-4 pb-10 flex items-start justify-between">
          {/* Пустое место слева — помогает центровать блок афоризма */}
          <div className="flex-1" />

          {/* Центр: афоризм */}
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-semibold italic text-[#3b342d]">
              Mens sana in corpore sano
            </h1>

            {/* Чип + перевод в одной строке */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button className="px-5 py-1.5 text-xs font-medium rounded-full border border-[#d3c7aa] bg-white text-[#7a6a55] shadow-sm">
                Афоризм месяца
              </button>

              <p className="text-sm text-[#6b654f]">
                В здоровом теле — здоровый дух (Ювенал)
              </p>
            </div>
          </div>

          {/* Справа: специальность */}
          <div className="flex-1 flex justify-end">
            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] tracking-[0.14em] uppercase text-[#b1a68b]">
                СПЕЦИАЛЬНОСТЬ
              </span>

              <select
                value={selectedSpecialty}
                onChange={(event) => setSelectedSpecialty(event.target.value)}
                className="min-w-[180px] rounded-full border border-[#d3c7aa] bg-white px-4 py-1.5 text-sm text-[#3b342d] shadow-sm outline-none focus:border-[#015d52] focus:ring-1 focus:ring-[#015d52]"
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

      {/* Список новостей с одной «молнией» слева */}
      <section className="relative max-w-[1360px] mx-auto px-4 pt-10 pb-16">
        {/* Одна большая жёлтая линия слева, с анимацией */}
        <div className="absolute left-0 top-6 bottom-6 flex justify-center">
          <div className="w-[2px] bg-[#facc15] lightning-bar" />
        </div>

        <ul className="space-y-5 pl-6">
          {filteredNews.map((item) => (
            <li key={item.id} className="flex items-start gap-4">
              {/* Кружок перед ссылкой */}
              <div className="relative mt-1 flex h-7 w-7 items-center justify-center rounded-full border border-[#b3b3b3] bg-white">
                <span className="h-3 w-px bg-[#facc15]" />
              </div>

              {/* Новость как активная ссылка */}
              <a
                href={item.href}
                className="text-[15px] leading-snug text-[#3b342d] hover:text-[#015d52] transition-colors"
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


