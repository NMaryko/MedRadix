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

// Описание разделов для «шахматной» сетки
const SECTIONS = [
  {
    id: 1,
    title: 'Новое',
    description:
      'Обновления по версиям гайдлайнов, свежим исследованиям и материалам, появляющимся на сайте MedRadix. Новые материалы помечены янтарной линией, которая показывает добавления за последние 14 дней (для новостей раздела «Гайды» — 60 дней).',
  },
  {
    id: 2,
    title: 'Гайды',
    description:
      'Европейские клинические рекомендации, сопоставленные с американскими гайдами, с регулярным обновлением версий и ключевых изменений.',
  },
  {
    id: 3,
    title: 'Статьи',
    description:
      'Самые свежие исследования из ключевых медицинских журналов мира, краткие выводы, цифры и ссылки на оригиналы.',
  },
  {
    id: 4,
    title: 'Голос эксперта',
    description:
      'Комментарии ведущих специалистов по ключевым исследованиям и рекомендациям, со ссылками на оригиналы.',
  },
  {
    id: 5,
    title: 'Курсы',
    description:
      'Собраны бесплатные российские и зарубежные программы, дающие международные баллы (CME/НМО).',
  },
  {
    id: 6,
    title: 'Калькуляторы',
    description:
      'Достаточно один раз ввести данные, чтобы получить параллельные расчёты по европейским и американским стандартам.',
  },
  {
    id: 7,
    title: 'Лекарства',
    description:
      'Инструкции лекарств с применениями их в гайдлайнах.',
  },
  {
    id: 8,
    title: 'Медсестрам',
    description:
      'Раздел с редкими обучающими материалами, где можно получить бесплатные кредиты за прохождение.',
  },
  {
    id: 9,
    title: 'Папки',
    description:
      'Сохранение сертификатов и файлов в личном кабинете с автоматическим подсчётом баллов (CME/НМО).',
  },
];

export default function HomePage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('Все');

  const filteredNews = NEWS; // пока без реальной фильтрации

  return (
    <main className="bg-[#fcfcee] min-h-screen">
      {/* --- БЛОК АФОРИЗМА (НЕ ТРОГАЛА, КАК У ТЕБЯ БЫЛО) --- */}
      <section className="border-b border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 pt-4 pb-4">
          {/* ТРИ КОЛОНКИ: чип слева, афоризм по центру, фильтр справа */}
          <div className="flex items-center">
            {/* Левая колонка: чип */}
            <div className="flex-1 flex justify-start">
              <button className="px-5 py-1.5 text-xs font-medium rounded-full border border-[#b6b6c0] bg-white shadow-sm">
                Афоризм месяца
              </button>
            </div>

            {/* Центральная колонка: афоризм по центру */}
            <div className="flex-shrink-0 text-center">
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

      {/* --- СПИСОК НОВОСТЕЙ С МОЛНИЕЙ СЛЕВА (ТОЖЕ НЕ ТРОГАЛА) --- */}
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

              {/* Кликабельная новость */}
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

      {/* --- НОВЫЙ БЛОК: ШАХМАТКА РАЗДЕЛОВ + КНОПКА ДОСТУПА --- */}
      <section className="max-w-[1360px] mx-auto px-4 pt-8 pb-20">
        <div className="space-y-10">
          {SECTIONS.map((section, index) => {
            const isOdd = index % 2 === 0; // 1,3,5... (по человечески) выравниваем вправо
            const isNovoe = section.title === 'Новое';

            const titleClasses = isNovoe
              ? 'text-lg font-semibold text-[#e6a800]'
              : 'text-lg font-semibold text-[#2b2115]';

            const textBlock = (
              <div className="max-w-md">
                <h3 className={titleClasses}>{section.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3b342d]">
                  {section.description}
                </p>
              </div>
            );

            const iconBlock = (
              <div
                className={`flex h-14 w-14 flex-none items-center justify-center rounded-full ${
                  isNovoe ? 'bg-[#e6a800]' : 'bg-[#015d52]'
                }`}
              >
                {/* Простая «иконка»: буква первого символа, белая */}
                <span className="text-white text-xl font-semibold">
                  {section.title[0]}
                </span>
              </div>
            );

            // нечётные (1,3,5...) — по правому краю, сначала текст, потом иконка
            // чётные (2,4,6...) — по левому, сначала иконка, потом текст
            return (
              <div
                key={section.id}
                className={`flex items-start gap-6 ${
                  isOdd ? 'justify-end text-right' : 'justify-start text-left'
                }`}
              >
                {isOdd ? (
                  <>
                    {textBlock}
                    {iconBlock}
                  </>
                ) : (
                  <>
                    {iconBlock}
                    {textBlock}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Кнопка доступа и цены */}
        <div className="mt-16 flex flex-col items-center gap-3">
          <button className="px-8 py-3 rounded-full bg-[#015d52] text-white text-sm md:text-base font-medium hover:bg-[#01463d] transition-colors">
            Получить полный доступ MedRadix
          </button>
          <p className="text-sm text-[#3b342d]">
            для врачей — от $12/мес, для медсестёр — от $7/мес
          </p>
        </div>

        {/* Почта поддержки внизу */}
        <p className="mt-10 text-xs md:text-sm text-[#7a6a55] text-center">
          support@medradix.info
        </p>
      </section>
    </main>
  );
}


