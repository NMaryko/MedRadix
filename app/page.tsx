'use client';

import { useState, useMemo } from 'react';

type NewsItem = {
  id: number;
  title: string;
  href: string;
  specialties: string[];
};

// список специальностей (по алфавиту, плюс "Все")
  const specialties = [
  'Все',
  'Аллергология и иммунология',
  'Анестезиология и реаниматология',
  'Гастроэнтерология',
  'Гематология',
  'Дерматовенерология',
  'Инфекционные болезни',
  'Кардиология',
  'Неврология',
  'Нефрология',
  'Онкология',
  'Офтальмология',
  'Отоларингология',
  'Педиатрия',
  'Психиатрия',
  'Пульмонология',
  'Ревматология',
  'Терапия',
  'Травматология и ортопедия',
  'Урология',
  'Эндокринология',
];

// новости (пока заглушки, но уже как реальные ссылки)
const NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    title:
      'Новые рекомендации ESC по ведению пациентов с фибрилляцией предсердий',
    href: '#esc-af',
    specialties: ['Кардиология', 'Терапия'],
  },
  {
    id: 2,
    title:
      'FDA одобрило новый препарат для лечения сердечной недостаточности',
    href: '#fda-hf',
    specialties: ['Кардиология'],
  },
  {
    id: 3,
    title: 'Исследование The Lancet: связь между сном и риском деменции',
    href: '#sleep-dementia',
    specialties: ['Неврология', 'Терапия'],
  },
  {
    id: 4,
    title: 'JAMA: влияние витамина D на иммунный ответ при COVID-19',
    href: '#jama-vitd',
    specialties: ['Пульмонология', 'Терапия'],
  },
  {
    id: 5,
    title:
      'Обновлены гайдлайны ADA по лечению сахарного диабета 2 типа',
    href: '#ada-diabetes',
    specialties: ['Эндокринология', 'Терапия'],
  },
];

export default function HomePage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Все');

  const filteredNews = useMemo(() => {
    if (selectedSpecialty === 'Все') return NEWS_ITEMS;
    return NEWS_ITEMS.filter((item) =>
      item.specialties.includes(selectedSpecialty),
    );
  }, [selectedSpecialty]);

  return (
    <main className="bg-[#fcfcee] min-h-screen">
      {/* Блок афоризма + специальность */}
      <section className="max-w-[1360px] mx-auto px-4 pt-10 pb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Центровка афоризма */}
          <div className="flex-1 flex flex-col items-center text-center">
            {/* Чип чуть ниже и ближе к центру */}
            <button className="mb-4 inline-flex items-center rounded-full border border-[#e0e0d0] bg-white px-5 py-1 text-xs font-medium tracking-wide text-[#7a6a55] shadow-sm">
              Афоризм месяца
            </button>

            <h1 className="text-3xl md:text-4xl font-semibold italic text-[#3b342d]">
              Mens sana in corpore sano
            </h1>
            <p className="mt-2 text-sm text-[#6b655a]">
              В здоровом теле — здоровый дух (Ювенал)
            </p>
          </div>

          {/* Специальность справа */}
          <div className="w-full md:w-64 flex flex-col items-end gap-1">
            <span className="text-[11px] tracking-[0.16em] uppercase text-[#b0a896]">
              Специальность
            </span>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full rounded-full border border-[#d0c8b8] bg-white px-4 py-2 text-sm text-[#3b342d] shadow-sm outline-none focus:border-[#015d52] focus:ring-2 focus:ring-[#015d52]/20"
            >
              {SPECIALTIES.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Список новостей */}
      <section className="relative max-w-[1360px] mx-auto px-4 pt-6 pb-16">
        {/* Одна большая «молния» слева от списка */}
        <div className="pointer-events-none absolute left-0 top-4 bottom-4 flex justify-center">
          <div className="w-[2px] rounded-full bg-[#facc15] shadow-[0_0_14px_rgba(250,204,21,0.9)] animate-pulse" />
        </div>

        <ul className="space-y-4 pl-6">
          {filteredNews.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-4"
            >
              {/* Иконка-кружок перед ссылкой */}
              <div className="relative mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-full border border-[#f3b640] bg-white">
                <span className="h-3 w-[2px] rounded-full bg-[#f3b640]" />
              </div>

              {/* Новость как активная ссылка */}
              <a
                href={item.href}
                className="text-sm text-[#3b342d] hover:text-[#015d52] transition-colors"
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

  

