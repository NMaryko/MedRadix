'use client';

import { useState } from 'react';
import {
  Zap,
  BookOpen,
  Feather,
  GraduationCap,
  Calculator,
  Pill,
  Syringe,
  Folder,
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
      {/* Блок афоризма + фильтр специальности (НЕ трогаем структуру, только размеры шрифтов) */}
      <section className="border-b border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 pt-4 pb-4">
          <div className="flex items-center">
            {/* Левая колонка: чип */}
            <div className="flex-1 flex justify-start">
              <button className="px-5 py-1.5 text-xs font-medium rounded-full border border-[#b6b6c0] bg-white shadow-sm">
                Афоризм месяца
              </button>
            </div>

            {/* Центр: афоризм */}
            <div className="flex-shrink-0 text-center">
              <h2 className="text-3xl md:text-4xl font-semibold italic tracking-wide">
                Mens sana in corpore sano
              </h2>
              <p className="mt-2 text-lg md:text-xl text-[#3b342d]">
                В здоровом теле — здоровый дух (Ювенал)
              </p>
            </div>

            {/* Правая колонка: Специальность */}
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
              {/* Иконка-кружок с молнией */}
              <div className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-[#3b3640] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.03)]">
                <Zap className="h-4 w-4 text-[#facc15]" />
              </div>

              {/* Кликабельная новость — font, как у описаний разделов */}
              <a
                href={item.href}
                className="text-lg md:text-xl leading-relaxed text-[#3b342d] hover:text-[#015d52] transition-colors"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Шахматка разделов */}
      <section className="max-w-[1360px] mx-auto px-4 pb-20 space-y-10">
        {/* 1. Новое (иконка молния + жёлтый круг) */}
        <div className="flex items-center justify-between gap-10 rounded-3xl bg-white/80 shadow-sm hover:shadow-lg transition-shadow duration-200 px-10 py-7 cursor-pointer">
          {/* Текст слева */}
          <div className="max-w-xl mr-auto">
            <h3 className="text-2xl md:text-3xl font-semibold text-[#e6a800] mb-3">
              Новое
            </h3>
            <p className="text-xl md:text-2xl leading-relaxed text-[#4b3b2f]">
              Обновления по версиям гайдлайнов, свежим исследованиям и
              материалам, появляющимся на сайте MedRadix. Новые материалы
              помечены янтарной линией, которая показывает добавления за
              последние 14 дней. Для раздела «Гайды» новости остаются в Новом до
              60 дней.
            </p>
          </div>

          {/* Иконка справа */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-[#f59e0b] flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105">
                <Zap className="h-9 w-9 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Гайды (иконка книга + мини-флажки внутри) */}
        <div className="flex items-center justify-between gap-10 rounded-3xl bg-white/80 shadow-sm hover:shadow-lg transition-shadow duration-200 px-10 py-7 cursor-pointer">
          {/* Иконка слева */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-[#065f46] flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105">
                <div className="relative">
                  <BookOpen className="h-9 w-9 text-white" />
                  {/* маленькие “флажки” EU/US */}
                  <div className="absolute -bottom-1 -left-1 h-3 w-3 rounded-full bg-[#0052B4]" />
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-[#b91c1c]" />
                </div>
              </div>
            </div>
          </div>

          {/* Текст справа */}
          <div className="max-w-xl ml-auto text-right">
            <h3 className="text-2xl md:text-3xl font-semibold text-[#3b342d] mb-3">
              Гайды
            </h3>
            <p className="text-xl md:text-2xl leading-relaxed text-[#4b3b2f]">
              Европейские клинические рекомендации, сопоставленные с
              американскими гайдлайнами, с регулярным обновлением версий и
              ключевых изменений.
            </p>
          </div>
        </div>

        {/* 3. Статьи (иконка перо) */}
        <div className="flex items-center justify-between gap-10 rounded-3xl bg-white/80 shadow-sm hover:shadow-lg transition-shadow duration-200 px-10 py-7 cursor-pointer">
          {/* Текст слева */}
          <div className="max-w-xl mr-auto">
            <h3 className="text-2xl md:text-3xl font-semibold text-[#3b342d] mb-3">
              Статьи
            </h3>
            <p className="text-xl md:text-2xl leading-relaxed text-[#4b3b2f]">
              Самые свежие исследования из ключевых медицинских журналов мира,
              краткие выводы, цифры и ссылки на оригиналы.
            </p>
          </div>

          {/* Иконка справа */}
          <div className="flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-[#065f46] flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105">
              <Feather className="h-9 w-9 text-white" />
            </div>
          </div>
        </div>

        {/* 4. Голос эксперта (иконка “экспертность”) */}
        <div className="flex items-center justify-between gap-10 rounded-3xl bg-white/80 shadow-sm hover:shadow-lg transition-shadow duration-200 px-10 py-7 cursor-pointer">
          {/* Иконка слева */}
          <div className="flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-[#065f46] flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105">
              <GraduationCap className="h-9 w-9 text-white" />
            </div>
          </div>

          {/* Текст справа */}
          <div className="max-w-xl ml-auto text-right">
            <h3 className="text-2xl md:text-3xl font-semibold text-[#3b342d] mb-3">
              Голос эксперта
            </h3>
            <p className="text-xl md:text-2xl leading-relaxed text-[#4b3b2f]">
              Комментарии ведущих специалистов по ключевым исследованиям и
              рекомендациям, со ссылками на оригиналы.
            </p>
          </div>
        </div>

        {/* 5. Курсы / Калькуляторы */}
        <div className="flex items-center justify-between gap-10 rounded-3xl bg-white/80 shadow-sm hover:shadow-lg transition-shadow duration-200 px-10 py-7 cursor-pointer">
          {/* Курсы слева */}
          <div className="flex items-center gap-4 max-w-xl mr-auto">
            <div className="h-16 w-16 rounded-full bg-[#0f766e] flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105">
              <GraduationCap className="h-9 w-9 text-white" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-[#3b342d] mb-3">
                Курсы
              </h3>
              <p className="text-xl md:text-2xl leading-relaxed text-[#4b3b2f]">
                Собраны бесплатные российские и зарубежные программы, дающие
                международные баллы (CME/НМО).
              </p>
            </div>
          </div>

          {/* Калькуляторы справа */}
          <div className="flex items-center gap-4 max-w-xl ml-auto justify-end">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-[#3b342d] mb-3 text-right">
                Калькуляторы
              </h3>
              <p className="text-xl md:text-2xl leading-relaxed text-[#4b3b2f] text-right">
                Достаточно один раз ввести данные, чтобы получить параллельные
                расчёты по европейским и американским стандартам.
              </p>
            </div>
            <div className="h-16 w-16 rounded-full bg-[#065f46] flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105">
              <Calculator className="h-9 w-9 text-white" />
            </div>
          </div>
        </div>

        {/* 6. Лекарства / Медсестрам */}
        <div className="flex items-center justify-between gap-10 rounded-3xl bg-white/80 shadow-sm hover:shadow-lg transition-shadow duration-200 px-10 py-7 cursor-pointer">
          {/* Лекарства слева */}
          <div className="flex items-center gap-4 max-w-xl mr-auto">
            <div className="h-16 w-16 rounded-full bg-[#065f46] flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105">
              <Pill className="h-9 w-9 text-white" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-[#3b342d] mb-3">
                Лекарства
              </h3>
              <p className="text-xl md:text-2xl leading-relaxed text-[#4b3b2f]">
                Инструкции лекарств с применениями их в гайдлайнах.
              </p>
            </div>
          </div>

          {/* Медсестрам справа (шприц) */}
          <div className="flex items-center gap-4 max-w-xl ml-auto justify-end">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-[#3b342d] mb-3 text-right">
                Медсестрам
              </h3>
              <p className="text-xl md:text-2xl leading-relaxed text-[#4b3b2f] text-right">
                Раздел с редкими обучающими материалами, где можно получить
                бесплатные кредиты за прохождение.
              </p>
            </div>
            <div className="h-16 w-16 rounded-full bg-[#0f766e] flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105">
              <Syringe className="h-9 w-9 text-white" />
            </div>
          </div>
        </div>

        {/* 7. Папки */}
        <div className="flex items-center gap-4 rounded-3xl bg-white/80 shadow-sm hover:shadow-lg transition-shadow duration-200 px-10 py-7 cursor-pointer">
          <div className="h-16 w-16 rounded-full bg-[#0f766e] flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105">
            <Folder className="h-9 w-9 text-white" />
          </div>
          <div className="max-w-xl">
            <h3 className="text-2xl md:text-3xl font-semibold text-[#3b342d] mb-3">
              Папки
            </h3>
            <p className="text-xl md:text-2xl leading-relaxed text-[#4b3b2f]">
              Сохранение сертификатов и файлов в личном кабинете с
              автоматическим подсчётом баллов (CME/НМО).
            </p>
          </div>
        </div>

        {/* CTA + цены */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#015d52] text-white text-lg font-semibold shadow-md hover:bg-[#01463d] transition-colors">
            Получить полный доступ MedRadix
          </button>
          <p className="mt-3 text-sm text-[#4b3b2f]">
            для врачей — от $12/мес, для медсестёр — от $7/мес
          </p>
        </div>

        {/* support — расстояние увеличено в 2 раза */}
        <p className="mt-8 text-center text-sm text-[#4b3b2f]">
          support@medradix.info
        </p>
      </section>
    </main>
  );
}
