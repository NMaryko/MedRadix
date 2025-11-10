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
    title: 'Исследование The Lancet: связь между сном и риском деменции',
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
    description:
      'Обновления по версиям гайдлайнов, свежим исследованиям и материалам, появляющимся на сайте MedRadix. Новые материалы помечены янтарной линией, которая показывает добавления за последние 14 дней. Для раздела «Гайды» новости остаются в Новом до 60 дней.',
    href: '/news',
  },
  {
    id: 'guides',
    title: 'Гайды',
    description:
      'Европейские клинические рекомендации, сопоставленные с американскими гайдлайнами, с регулярным обновлением версий и ключевых изменений.',
    href: '/guides',
  },
  {
    id: 'articles',
    title: 'Статьи',
    description:
      'Самые свежие исследования из ключевых медицинских журналов мира, краткие выводы, цифры и ссылки на оригиналы.',
    href: '/articles',
  },
  {
    id: 'experts',
    title: 'Голос эксперта',
    description:
      'Комментарии ведущих специалистов по ключевым исследованиям и рекомендациям, со ссылками на оригиналы.',
    href: '/experts',
  },
  {
    id: 'courses',
    title: 'Курсы',
    description:
      'Собраны бесплатные российские и зарубежные программы, дающие международные баллы (CME/НМО).',
    href: '/courses',
  },
  {
    id: 'calculators',
    title: 'Калькуляторы',
    description:
      'Достаточно один раз ввести данные, чтобы получить параллельные расчёты по европейским и американским стандартам.',
    href: '/calculators',
  },
  {
    id: 'drugs',
    title: 'Лекарства',
    description:
      'Инструкции лекарств с применениями их в гайдлайнах.',
    href: '/drugs',
  },
  {
    id: 'nurses',
    title: 'Медсестрам',
    description:
      'Раздел с редкими обучающими материалами, где можно получить бесплатные кредиты за прохождение.',
    href: '/nurses',
  },
  {
    id: 'folders',
    title: 'Папки',
    description:
      'Сохранение сертификатов и файлов в личном кабинете с автоматическим подсчётом баллов (CME/НМО).',
    href: '/folders',
  },
];

function getSectionIcon(id: SectionId) {
  switch (id) {
    case 'news':
      return FileText;
    case 'guides':
      return PenSquare;
    case 'articles':
      return BookOpen;
    case 'experts':
      return Mic;
    case 'courses':
      return GraduationCap;
    case 'calculators':
      return Calculator;
    case 'drugs':
      return Pill;
    case 'nurses':
      return Syringe;
    case 'folders':
      return FolderOpen;
    default:
      return FileText;
  }
}

export default function HomePage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('Все');

  const filteredNews = NEWS; // пока без реальной фильтрации

  return (
    <main className="bg-[#fcfcee] min-h-screen">
      {/* --- КОМПАКТНЫЙ БЛОК АФОРИЗМА СВЕРХУ --- */}
      <section className="border-b border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 pt-4 pb-3 md:pb-4">
          {/* на мобиле всё в колонку, на десктопе — три колонки */}
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:gap-0">
            {/* Левая колонка: чип */}
            <div className="w-full flex justify-center md:flex-1 md:justify-start">
              <button className="px-5 py-1.5 text-xs font-medium rounded-full border border-[#b6b6c0] bg-white shadow-sm">
                Афоризм месяца
              </button>
            </div>

            {/* Центральная колонка: афоризм по центру */}
            <div className="flex-shrink-0 text-center px-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold italic tracking-wide">
                Mens sana in corpore sano
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-[#3b342d]">
                В здоровом теле — здоровый дух (Ювенал)
              </p>
            </div>

            {/* Правая колонка: фильтр специальности */}
            <div className="w-full flex justify-center md:flex-1 md:justify-end">
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#9c978f]">
                  Специальность
                </span>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="min-w-[190px] rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52]"
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

      {/* --- СПИСОК НОВОСТЕЙ С МОЛНИЕЙ СЛЕВА --- */}
      <section className="relative max-w-[1360px] mx-auto px-4 pt-6 md:pt-8 pb-12 md:pb-16">
        {/* Жёлтая линия от нижней до верхней новости */}
        <div className="absolute left-6 sm:left-10 top-2 bottom-2 flex items-stretch pointer-events-none">
          <div className="w-[2px] bg-gradient-to-b from-[#facc15]/0 via-[#facc15] to-[#facc15]/0 animate-pulse" />
        </div>

        <ul className="space-y-3 sm:space-y-4 pl-12 sm:pl-16">
          {filteredNews.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-3 sm:gap-4"
            >
              {/* Иконка-кружок */}
              <div className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-[#3b3640] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.03)]">
                <span className="h-4 w-[2px] bg-[#facc15] rounded-full" />
              </div>

              {/* Кликабельная новость */}
              <a
                href={item.href}
                className="text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed text-[#3b342d] hover:text-[#015d52] transition-colors"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* --- ШАХМАТКА РАЗДЕЛОВ --- */}
      <section className="border-t border-gray-200 bg-[#f8f4ee]/80">
        <div className="max-w-[1360px] mx-auto px-4 py-10 md:py-16 space-y-8 md:space-y-10">
          {SECTIONS.map((section, index) => {
            const Icon = getSectionIcon(section.id);
            const isOdd = (index + 1) % 2 === 1; // 1,3,5... — нечётные
            const textColorTitle =
              section.id === 'news' ? 'text-[#e68a00]' : 'text-[#3b2b22]';

            const haloBase =
              section.id === 'news' ? 'bg-[#f59e0b33]' : 'bg-[#015d5230]';
            const circleBase =
              section.id === 'news' ? 'bg-[#f59e0b]' : 'bg-[#015d52]';

            return (
              <a
                key={section.id}
                href={section.href}
                className="block group"
              >
                <div
                  className={`flex flex-col md:flex-row md:items-center gap-5 md:gap-10 rounded-3xl bg-white/80 px-6 py-6 md:px-10 md:py-8 shadow-[0_10px_25px_rgba(0,0,0,0.04)] transition-all duration-300 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] group-hover:-translate-y-0.5`}
                >
                  {isOdd ? (
                    <>
                      {/* Иконка сверху на мобиле, справа на десктопе */}
                      <div className="flex-none flex justify-center md:justify-end mb-2 md:mb-0">
                        <div
                          className={`relative rounded-full p-3 ${haloBase} transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-70`}
                        >
                          <div
                            className={`flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full ${circleBase} text-white`}
                          >
                            <Icon className="h-7 w-7 md:h-8 md:w-8" />
                          </div>
                        </div>
                      </div>

                      {/* Текст: по центру на мобиле, вправо на десктопе */}
                      <div className="flex-1 text-center md:text-right">
                        <h3
                          className={`${textColorTitle} text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-3`}
                        >
                          {section.title}
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#4b3b2f] max-w-xl md:ml-auto mx-auto">
                          {section.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Иконка сверху на мобиле, слева на десктопе */}
                      <div className="flex-none flex justify-center md:justify-start mb-2 md:mb-0">
                        <div
                          className={`relative rounded-full p-3 ${haloBase} transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-70`}
                        >
                          <div
                            className={`flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full ${circleBase} text-white`}
                          >
                            <Icon className="h-7 w-7 md:h-8 md:w-8" />
                          </div>
                        </div>
                      </div>

                      {/* Текст: по центру на мобиле, влево на десктопе */}
                      <div className="flex-1 text-center md:text-left">
                        <h3
                          className={`${textColorTitle} text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-3`}
                        >
                          {section.title}
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#4b3b2f] max-w-xl md:mr-auto mx-auto">
                          {section.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* --- CTA НИЖЕ --- */}
      <section className="border-t border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 py-10 md:py-16 text-center">
          <button className="inline-flex items-center justify-center rounded-full bg-[#015d52] px-8 md:px-10 py-3 text-base md:text-lg font-semibold text-white shadow-md hover:bg-[#01463d] hover:shadow-lg transition-colors">
            Получить полный доступ MedRadix
          </button>
          <p className="mt-4 text-sm md:text-base text-[#4b3b2f]">
            для врачей — от $12/мес, для медсестер — от $7/мес
          </p>
          <p className="mt-10 text-sm md:text-base text-[#4b3b2f]">
            support@medradix.info
          </p>
        </div>
      </section>
    </main>
  );
}

