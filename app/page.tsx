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
    title: 'JAMA: Влияние витамина D на иммунный ответ при COVID-19',
    href: '#',
  },
  {
    id: 5,
    title:
      'Обновлены гайдлайны ADA по лечению сахарного диабета 2 типа',
    href: '#',
  },
];

// Блоки «шахмат» для разделов
const SECTION_BLOCKS = [
  {
    id: 'news',
    title: 'Новое',
    description:
      'Обновления по версиям гайдлайнов, свежим исследованиям и материалам, появляющимся на сайте MedRadix. Новые материалы помечены янтарной линией, которая показывает добавления за последние 14 дней. Для раздела «Гайды» новости остаются в Новом до 60 дней.',
    href: '/news',
    align: 'right' as const, // первый блок справа
    icon: FileText,
    accent: 'yellow' as const,
  },
  {
    id: 'guides',
    title: 'Гайды',
    description:
      'Европейские клинические рекомендации, сопоставленные с американскими гайдлайнами, с регулярным обновлением версий и ключевых изменений.',
    href: '/guides',
    align: 'left' as const,
    icon: BookOpen,
  },
  {
    id: 'articles',
    title: 'Статьи',
    description:
      'Самые свежие исследования из ключевых медицинских журналов мира, краткие выводы, цифры и ссылки на оригиналы.',
    href: '/articles',
    align: 'right' as const,
    icon: PenSquare,
  },
  {
    id: 'experts',
    title: 'Голос эксперта',
    description:
      'Комментарии ведущих специалистов по ключевым исследованиям и рекомендациям, со ссылками на оригиналы.',
    href: '/experts',
    align: 'left' as const,
    icon: Mic,
  },
  {
    id: 'courses',
    title: 'Курсы',
    description:
      'Собраны бесплатные российские и зарубежные программы, дающие международные баллы (CME/NМО).',
    href: '/courses',
    align: 'right' as const,
    icon: GraduationCap,
  },
  {
    id: 'calculators',
    title: 'Калькуляторы',
    description:
      'Достаточно один раз ввести данные, чтобы получить параллельные расчёты по европейским и американским стандартам.',
    href: '/calculators',
    align: 'left' as const,
    icon: Calculator,
  },
  {
    id: 'drugs',
    title: 'Лекарства',
    description:
      'Инструкции лекарств с применениями их в гайдлайнах.',
    href: '/drugs',
    align: 'right' as const,
    icon: Pill,
  },
  {
    id: 'nurses',
    title: 'Медсестрам',
    description:
      'Раздел с редкими обучающими материалами, где можно получить бесплатные кредиты за прохождение.',
    href: '/nurses',
    align: 'left' as const,
    icon: Syringe, // шприц
  },
  {
    id: 'folders',
    title: 'Папки',
    description:
      'Сохранение сертификатов и файлов в личном кабинете с автоматическим подсчётом баллов (CME/NМО).',
    href: '/folders',
    align: 'right' as const,
    icon: FolderOpen,
  },
];

export default function HomePage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('Все');

  const filteredNews = NEWS; // пока без реальной фильтрации

  return (
    <main className="bg-[#fcfcee] min-h-screen">
      {/* Компактный блок афоризма сверху */}
      <section className="border-b border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 pt-4 pb-4">
          {/* ТРИ КОЛОНКИ: чип слева, афоризм по центру, фильтр справа */}
          <div className="flex items-center">
            {/* Левая колонка: чип, выравнен к афоризму на одной линии */}
            <div className="flex-1 flex justify-start">
              <button className="px-5 py-1.5 text-xs font-medium rounded-full border border-[#b6b6c0] bg-white shadow-sm">
                Афоризм месяца
              </button>
            </div>

            {/* Центральная колонка: афоризм строго по центру всей области */}
            <div className="flex-shrink-0 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold italic tracking-wide">
                Mens sana in corpore sano
              </h2>
              <p className="mt-1.5 text-sm text-[#3b342d]">
                В здоровом теле — здоровый дух (Ювенал)
              </p>
            </div>

            {/* Правая колонка: фильтр специальности, симметрично чипу */}
            <div className="flex-1 flex justify-end">
              <div className="flex flex-col items-end gap-1">
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f]">
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

      {/* Шахматное описание разделов */}
      <section className="max-w-[1360px] mx-auto px-4 pt-10 pb-20 space-y-6">
        {SECTION_BLOCKS.map((block) => {
          const Icon = block.icon;
          const isRight = block.align === 'right';

          return (
            <a
              key={block.id}
              href={block.href}
              className="
                group block rounded-2xl bg-white/60 
                shadow-sm hover:shadow-[0_18px_40px_rgba(0,0,0,0.09)] 
                transition-all duration-200 
                hover:-translate-y-1
              "
            >
              <div
                className={`
                  flex items-center justify-between 
                  px-10 py-7 
                  gap-10
                  ${isRight ? 'text-right' : 'text-left'}
                `}
              >
                {isRight ? (
                  <>
                    {/* Текст слева, иконка справа */}
                    <div className="flex-1 max-w-[460px] text-left">
                      <h3
                        className={`
                          text-[22px] font-semibold mb-2
                          ${
                            block.accent === 'yellow'
                              ? 'text-[#e6a800]'
                              : 'text-[#3b2a1f]'
                          }
                        `}
                      >
                        {block.title}
                      </h3>
                      <p className="text-[15px] leading-relaxed text-[#3f362d]">
                        {block.description}
                      </p>
                    </div>

                    <div className="flex-1 flex justify-end">
                      <div
                        className={`
                          flex items-center justify-center
                          h-16 w-16 rounded-full
                          ${
                            block.accent === 'yellow'
                              ? 'bg-[#f0a83a]'
                              : 'bg-[#015d52]'
                          }
                          text-white
                          shadow-[0_0_0_8px_rgba(1,93,82,0.08)]
                          group-hover:shadow-[0_0_0_10px_rgba(1,93,82,0.18)]
                          group-hover:scale-105
                          transition-transform duration-200
                        `}
                      >
                        <Icon size={28} strokeWidth={2.1} />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Иконка слева, текст справа */}
                    <div className="flex-1 flex justify-start">
                      <div
                        className={`
                          flex items-center justify-center
                          h-16 w-16 rounded-full
                          ${
                            block.accent === 'yellow'
                              ? 'bg-[#f0a83a]'
                              : 'bg-[#015d52]'
                          }
                          text-white
                          shadow-[0_0_0_8px_rgba(1,93,82,0.08)]
                          group-hover:shadow-[0_0_0_10px_rgba(1,93,82,0.18)]
                          group-hover:scale-105
                          transition-transform duration-200
                        `}
                      >
                        <Icon size={28} strokeWidth={2.1} />
                      </div>
                    </div>

                    <div className="flex-1 max-w-[460px]">
                      <h3
                        className={`
                          text-[22px] font-semibold mb-2
                          ${
                            block.accent === 'yellow'
                              ? 'text-[#e6a800]'
                              : 'text-[#3b2a1f]'
                          }
                        `}
                      >
                        {block.title}
                      </h3>
                      <p className="text-[15px] leading-relaxed text-[#3f362d]">
                        {block.description}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </a>
          );
        })}

        {/* Блок с кнопкой доступа и ценой */}
        <div className="pt-10 text-center">
          <button className="inline-flex items-center justify-center rounded-full bg-[#015d52] px-8 py-3 text-[15px] font-semibold text-white hover:bg-[#01463d] transition-colors duration-200 shadow-md">
            Получить полный доступ MedRadix
          </button>

          <p className="mt-3 text-sm text-[#3b342d]">
            для врачей — от $12/мес, для медсестёр — от $7/мес
          </p>

          <p className="mt-10 text-sm text-[#6b6256]">
            support@medradix.info
          </p>
        </div>
      </section>
    </main>
  );
}

