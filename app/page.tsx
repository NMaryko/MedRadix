'use client';

import { useState } from 'react';

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

const NEWS = [
  {
    id: 1,
    title:
      'Новые рекомендации ESC по ведению пациентов с фибрилляцией предсердий',
    href: '#',
  },
  {
    id: 2,
    title:
      'FDA одобрило новый препарат для лечения сердечной недостаточности',
    href: '#',
  },
  {
    id: 3,
    title:
      'Исследование The Lancet: связь между сном и риском деменции',
    href: '#',
  },
  {
    id: 4,
    title:
      'JAMA: Влияние витамина D на иммунный ответ при COVID-19',
    href: '#',
  },
  {
    id: 5,
    title:
      'Обновлены гайдлайны ADA по лечению сахарного диабета 2 типа',
    href: '#',
  },
];

export default function HomePage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('Все');

  const filteredNews = NEWS; // пока без реальной фильтрации

  return (
    <main className="bg-[#fcfcee] min-h-screen">
      {/* Компактный блок афоризма сверху */}
      <section className="border-b border-gray-200">
        {/* ПОДНЯЛИ БЛОК БЛИЖЕ К ШАПКЕ: pt-2 вместо pt-4 */}
        <div className="max-w-[1360px] mx-auto px-4 pt-2 pb-4">
          {/* ТРИ КОЛОНКИ: чип слева, афоризм по центру, фильтр справа */}
          <div className="flex items-center">
            {/* Левая колонка: чип */}
            <div className="flex-1 flex justify-start">
              <button className="px-5 py-1.5 text-xs font-medium rounded-full border border-[#b6b6c0] bg-white shadow-sm">
                Афоризм месяца
              </button>
            </div>

            {/* Центральная колонка: афоризм строго по центру всей области
                Увеличили боковые отступы, чтобы чип и фильтр были дальше от центра */}
            <div className="flex-shrink-0 text-center mx-16 md:mx-24">
              <h2 className="text-2xl md:text-3xl font-semibold italic tracking-wide">
                Mens sana in corpore sano
              </h2>
              <p className="mt-1.5 text-sm text-[#3b342d]">
                В здоровом теле — здоровый дух (Ювенал)
              </p>
            </div>

            {/* Правая колонка: фильтр специальности */}
            <div className="flex-1 flex justify-end">
              <div className="flex flex-col items-end gap-1">
                {/* Подпись выровнена по правому краю и по ширине селекта */}
                <span className="block w-full text-right text-[11px] uppercase tracking-[0.18em] text-[#9c978f]">
                  Специальность
                </span>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  // немного сузили фильтр, чтобы он визуально больше походил на чип
                  className="min-w-[170px] rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52]"
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
        </div>
      </section>

      {/* Список новостей с одной общей «молнией» слева */}
      <section className="relative max-w-[1360px] mx-auto px-4 pt-8 pb-16">
        {/* Жёлтая линия от нижней до верхней новости */}
        <div className="absolute left-10 top-2 bottom-2 flex items-stretch pointer-events-none">
          <div className="w-[2px] bg-gradient-to-b from-[#facc15]/0 via-[#facc15] to-[#facc15]/0 animate-pulse" />
        </div>

        <ul className="space-y-4 pl-16">
          {filteredNews.map((item) => (
            <li key={item.id} className="flex items-start gap-4">
              {/* Иконка-кружок */}
              <div className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-[#3b3640] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.03)]">
                <span className="h-4 w-[2px] bg-[#facc15] rounded-full" />
              </div>

              {/* Кликабельная новость, шрифт чуть крупнее */}
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
