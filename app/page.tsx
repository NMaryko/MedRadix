// app/page.tsx
'use client';

import { useState } from 'react';
import {
  FileText,
  BookOpen,
  PenSquare,
  Mic,
  GraduationCap,
  Calculator,
  Pill,
  Syringe,
  FolderOpen,
} from 'lucide-react';

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
    title: 'Новые рекомендации ESC по ведению пациентов с фибрилляцией предсердий',
    href: '#',
  },
  {
    id: 2,
    title: 'FDA одобрило новый препарат для лечения сердечной недостаточности',
    href: '#',
  },
  {
    id: 3,
    title: 'Исследование The Lancet: связь между сном и риском деменции',
    href: '#',
  },
  {
    id: 4,
    title: 'JAMA: Влияние витамина D на иммунный ответ при COVID-19',
    href: '#',
  },
  {
    id: 5,
    title: 'Обновлены гайдлайны ADA по лечению сахарного диабета 2 типа',
    href: '#',
  },
];

type SectionId =
  | 'news'
  | 'guides'
  | 'articles'
  | 'experts'
  | 'courses'
  | 'calculators'
  | 'drugs'
  | 'nurses'
  | 'folders';

interface SectionConfig {
  id: SectionId;
  title: string;
  description: string;
  href: string;
}

const SECTIONS: SectionConfig[] = [
  {
    id: 'news',
    title: 'Новое',
    description: 'Обновления по версиям гайдлайнов, свежим исследованиям и материалам, появляющимся на сайте MedRadix.',
    href: '/news',
  },
  {
    id: 'guides',
    title: 'Гайды',
    description: 'Европейские клинические рекомендации, сопоставленные с американскими гайдлайнами.',
    href: '/guides',
  },
  {
    id: 'articles',
    title: 'Статьи',
    description: 'Самые свежие исследования из ключевых медицинских журналов мира.',
    href: '/articles',
  },
  {
    id: 'experts',
    title: 'Голос эксперта',
    description: 'Комментарии ведущих специалистов по ключевым исследованиям и рекомендациям.',
    href: '/experts',
  },
  {
    id: 'courses',
    title: 'Курсы',
    description: 'Собраны бесплатные российские и зарубежные программы, дающие международные баллы.',
    href: '/courses',
  },
  {
    id: 'calculators',
    title: 'Калькуляторы',
    description: 'Достаточно один раз ввести данные, чтобы получить параллельные расчёты.',
    href: '/calculators',
  },
  {
    id: 'drugs',
    title: 'Лекарства',
    description: 'Инструкции лекарств с применениями их в гайдлайнах.',
    href: '/drugs',
  },
  {
    id: 'nurses',
    title: 'Медсестрам',
    description: 'Раздел с редкими обучающими материалами, где можно получить бесплатные кредиты.',
    href: '/nurses',
  },
  {
    id: 'folders',
    title: 'Папки',
    description: 'Сохранение сертификатов и файлов в личном кабинете с автоматическим подсчётом баллов.',
    href: '/folders',
  },
];

function getSectionIcon(id: SectionId) {
  switch (id) {
    case 'news': return FileText;
    case 'guides': return BookOpen;
    case 'articles': return PenSquare;
    case 'experts': return Mic;
    case 'courses': return GraduationCap;
    case 'calculators': return Calculator;
    case 'drugs': return Pill;
    case 'nurses': return Syringe;
    case 'folders': return FolderOpen;
    default: return FileText;
  }
}

export default function HomePage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('Все');
  const filteredNews = NEWS;

  return (
    <main className="bg-[#fcfcee] min-h-screen">
      {/* Афоризм и фильтр */}
      <section className="border-b border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 pt-4 pb-4">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-0">
            {/* Чип */}
            <div className="flex-1 flex justify-start order-2 lg:order-1">
              <button className="px-5 py-1.5 text-xs font-medium rounded-full border border-[#b6b6c0] bg-white shadow-sm">
                Афоризм месяца
              </button>
            </div>

            {/* Афоризм */}
            <div className="flex-shrink-0 text-center order-1 lg:order-2">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold italic tracking-wide">
                Mens sana in corpore sano
              </h2>
              <p className="mt-1.5 text-sm text-[#3b342d]">
                В здоровом теле — здоровый дух (Ювенал)
              </p>
            </div>

            {/* Фильтр */}
            <div className="flex-1 flex justify-end order-3">
              <div className="flex flex-col items-end gap-1">
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f] hidden lg:block">
                  Специальность
                </span>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="min-w-[190px] rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52]"
                >
                  {SPECIALTIES.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Новое */}
      <section className="relative max-w-[1360px] mx-auto px-4 pt-6 lg:pt-8 pb-12 lg:pb-16">
        <div className="absolute left-4 lg:left-10 top-2 bottom-2 flex items-stretch pointer-events-none">
          <div className="w-[2px] bg-gradient-to-b from-[#facc15]/0 via-[#facc15] to-[#facc15]/0 animate-pulse" />
        </div>

        <ul className="space-y-4 pl-12 lg:pl-16">
          {filteredNews.map((item) => (
            <li key={item.id} className="flex items-start gap-4">
              <div className="flex h-6 w-6 lg:h-7 lg:w-7 flex-none items-center justify-center rounded-full border border-[#3b3640] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.03)]">
                <span className="h-3 lg:h-4 w-[2px] bg-[#facc15] rounded-full" />
              </div>
              <a
                href={item.href}
                className="text-sm lg:text-[16px] md:text-[17px] leading-relaxed text-[#3b342d] hover:text-[#015d52] transition-colors"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Шахматка разделов */}
      <section className="border-t border-gray-200 bg-[#f8f4ee]/80">
        <div className="max-w-[1360px] mx-auto px-4 py-12 lg:py-16 space-y-8 lg:space-y-10">
          {SECTIONS.map((section, index) => {
            const Icon = getSectionIcon(section.id);
            const isOdd = (index + 1) % 2 === 1;
            const isNews = section.id === 'news';
            const textColorTitle = isNews ? 'text-[#e68a00]' : 'text-[#3b2b22]';
            const haloBase = isNews ? 'bg-[#f59e0b33]' : 'bg-[#015d5230]';
            const circleBase = isNews ? 'bg-[#f59e0b]' : 'bg-[#015d52]';

            return (
              <a key={section.id} href={section.href} className="block group">
                <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 rounded-3xl bg-white/80 px-6 lg:px-10 py-6 lg:py-8 shadow-[0_10px_25px_rgba(0,0,0,0.04)] transition-all duration-300 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] group-hover:-translate-y-0.5">
                  
                  {/* Для мобильных: всегда иконка сверху, текст снизу */}
                  <div className="lg:hidden w-full text-center">
                    <div className={`relative rounded-full p-3 ${haloBase} transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-70 mx-auto`}>
                      <div className={`flex h-14 w-14 lg:h-16 lg:w-16 items-center justify-center rounded-full ${circleBase} text-white`}>
                        <Icon className="h-7 w-7 lg:h-8 lg:w-8" />
                      </div>
                    </div>
                    <h3 className={`${textColorTitle} text-xl lg:text-2xl md:text-3xl font-semibold mt-4 mb-3`}>
                      {section.title}
                    </h3>
                    <p className="text-sm lg:text-base md:text-lg leading-relaxed text-[#4b3b2f]">
                      {section.description}
                    </p>
                  </div>

                  {/* Для десктопа: сохраняем шахматку */}
                  {isOdd ? (
                    <>
                      <div className="hidden lg:flex flex-1 text-right">
                        <div>
                          <h3 className={`${textColorTitle} text-2xl md:text-3xl font-semibold mb-3`}>
                            {section.title}
                          </h3>
                          <p className="text-base md:text-lg leading-relaxed text-[#4b3b2f] max-w-xl ml-auto">
                            {section.description}
                          </p>
                        </div>
                      </div>
                      <div className="hidden lg:flex flex-none justify-end">
                        <div className={`relative rounded-full p-3 ${haloBase} transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-70`}>
                          <div className={`flex h-16 w-16 items-center justify-center rounded-full ${circleBase} text-white`}>
                            <Icon className="h-8 w-8" />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="hidden lg:flex flex-none justify-start">
                        <div className={`relative rounded-full p-3 ${haloBase} transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-70`}>
                          <div className={`flex h-16 w-16 items-center justify-center rounded-full ${circleBase} text-white`}>
                            <Icon className="h-8 w-8" />
                          </div>
                        </div>
                      </div>
                      <div className="hidden lg:flex flex-1 text-left">
                        <div>
                          <h3 className={`${textColorTitle} text-2xl md:text-3xl font-semibold mb-3`}>
                            {section.title}
                          </h3>
                          <p className="text-base md:text-lg leading-relaxed text-[#4b3b2f] max-w-xl mr-auto">
                            {section.description}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 py-12 lg:py-16 text-center">
          <button className="inline-flex items-center justify-center rounded-full bg-[#015d52] px-8 lg:px-10 py-3 text-base md:text-lg font-semibold text-white shadow-md hover:bg-[#01463d] hover:shadow-lg transition-colors">
            Получить полный доступ MedRadix
          </button>
          <p className="mt-4 text-sm md:text-base text-[#4b3b2f]">
            для врачей — от $12/мес, для медсестер — от $7/мес
          </p>
          <p className="mt-6 lg:mt-10 text-sm md:text-base text-[#4b3b2f]">
            support@medradix.info
          </p>
        </div>
      </section>
    </main>
  );
}

