// app/guides/page.tsx
'use client';

import { useMemo, useState } from 'react';

// ТЕ ЖЕ СПЕЦИАЛЬНОСТИ, ЧТО И НА ГЛАВНОЙ
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

type Nosology = {
  id: string;
  label: string;
  specialty: string;
};

// НОЗОЛОГИИ КАРДИОЛОГИИ — УЖЕ БОЛЕЕ СТРУКТУРНО
const CARDIO_NOSOLOGIES: Nosology[] = [
  { id: 'htn', label: 'Артериальная гипертензия', specialty: 'Кардиология' },
  { id: 'chd-stable', label: 'Стабильная ишемическая болезнь сердца', specialty: 'Кардиология' },
  { id: 'acs', label: 'Острый коронарный синдром (ОКС)', specialty: 'Кардиология' },
  { id: 'af', label: 'Фибрилляция предсердий', specialty: 'Кардиология' },
  { id: 'hf', label: 'Хроническая сердечная недостаточность', specialty: 'Кардиология' },
  { id: 'post-mi', label: 'Постинфарктный период', specialty: 'Кардиология' },
  { id: 'pulm-emb', label: 'Тромбоэмболия лёгочной артерии', specialty: 'Кардиология' },
  { id: 'tachyarrhythmias', label: 'Тахиаритмии', specialty: 'Кардиология' },
];

const ALL_NOSOLOGIES: Nosology[] = [...CARDIO_NOSOLOGIES];

// СЕКЦИИ ВНУТРИ ГАЙДА ОКС (СЛЕВА В НАВИГАЦИИ)
const ACS_SECTIONS = [
  { id: 'medradix-eu-us', title: 'Scientia MedRadix: отличия EU / US' },
  { id: 'definition', title: 'Определение и классификация' },
  { id: 'risk', title: 'Стратификация риска' },
  { id: 'treatment', title: 'Стратегии лечения' },
  { id: 'medication', title: 'Медикаментозная терапия' },
];

export default function GuidesPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Кардиология');
  const [selectedNosology, setSelectedNosology] = useState<string>('acs'); // по умолчанию ОКС

  const availableNosologies = useMemo(
    () => ALL_NOSOLOGIES.filter((n) => n.specialty === selectedSpecialty),
    [selectedSpecialty],
  );

  const currentNosology = availableNosologies.find((n) => n.id === selectedNosology) ?? null;

  return (
    <main className="bg-[#fcfcee] min-h-screen">
      {/* АФОРИЗМ + ФИЛЬТРЫ */}
      <section className="border-b border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 pt-4 pb-4">
          {/* Афоризм и специальность в три колонки — как на главной */}
          <div className="flex items-center">
            {/* Левая колонка: чип */}
            <div className="flex-1 flex justify-start">
              <button className="px-5 py-1.5 text-xs font-medium rounded-full border border-[#b6b6c0] bg-white shadow-sm">
                Афоризм месяца
              </button>
            </div>

            {/* Центр: афоризм */}
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
                  onChange={(e) => {
                    const newSpec = e.target.value;
                    setSelectedSpecialty(newSpec);

                    // если меняем специальность — сбрасываем нозологию на первую доступную
                    const firstForSpec = ALL_NOSOLOGIES.find(
                      (n) => n.specialty === newSpec,
                    );
                    setSelectedNosology(firstForSpec ? firstForSpec.id : '');
                  }}
                  className="min-w-[220px] rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-sm text-[#3b3c40] shadow-sm focus:outline-none focus:border-[#015d52]"
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

          {/* ВТОРОЙ РЯД: НОЗОЛОГИИ ПОД ФИЛЬТРОМ СПЕЦИАЛЬНОСТИ */}
          <div className="mt-4 flex justify-end">
            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f]">
                Нозология
              </span>
              <select
                value={selectedNosology}
                onChange={(e) => setSelectedNosology(e.target.value)}
                className="min-w-[260px] rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-sm text-[#3b3c40]"
              >
                {availableNosologies.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* СОДЕРЖИМОЕ ГАЙДА */}
      <section className="max-w-[1360px] mx-auto px-4 py-10">
        {!currentNosology ? (
          <div className="text-center text-sm text-[#6b6258]">
            Выберите нозологию, чтобы открыть соответствующий гайд.
          </div>
        ) : currentNosology.id === 'acs' ? (
          <AcsGuide />
        ) : (
          <div className="text-center text-sm text-[#6b6258]">
            Структура для нозологии «{currentNosology.label}» ещё в разработке.
          </div>
        )}
      </section>

      {/* НИЗ СТРАНИЦЫ */}
      <section className="border-t border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 py-16 text-center">
          <p className="text-sm md:text-base text-[#4b3b2f]">
            support@medradix.info
          </p>
        </div>
      </section>
    </main>
  );
}

/**
 * Черновой пример структуры гайда по ОКС.
 * Здесь важна СТРУКТУРА (Scientia MedRadix блок, боковое меню, якоря),
 * а не окончательный медицинский текст — его будем поэтапно доводить
 * до академического уровня и снабжать ссылками.
 */
function AcsGuide() {
  return (
    <div className="flex gap-8">
      {/* ЛЕВАЯ КОЛОНКА: НАВИГАЦИЯ ПО РАЗДЕЛАМ */}
      <nav className="hidden md:block w-64 flex-none">
        <ul className="space-y-2 sticky top-24">
          {ACS_SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="block text-sm text-[#4b3b2f] hover:text-[#015d52] hover:underline"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ПРАВАЯ КОЛОНКА: СОДЕРЖАНИЕ ГАЙДА */}
      <div className="flex-1 space-y-10">
        {/* Заголовок и сценарии */}
        <header>
          <h1 className="text-2xl md:text-3xl font-semibold text-center text-[#2b2115]">
            Острый коронарный синдром (ОКС)
          </h1>
          <p className="mt-3 text-center text-sm md:text-base text-[#4b3b2f] max-w-3xl mx-auto">
            ОКС объединяет STEMI, NSTEMI и нестабильную стенокардию и представляет
            клиническую ситуацию с острым ишемическим повреждением миокарда.
            Ниже — ключевые клинические сценарии, из которых можно перейти к
            соответствующим разделам гайда.
          </p>

          {/* Три сценария в ряд (на малых экранах — столбиком) */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <ScenarioCard
              title="STEMI: подъём ST и типичный болевой синдром"
              subtitle="Приоритет немедленной реперфузии и первичного ЧКВ."
              href="#treatment"
            />
            <ScenarioCard
              title="NSTEMI / нестабильная стенокардия"
              subtitle="Высокий риск — ранняя инвазивная стратегия после оценки риска."
              href="#risk"
            />
            <ScenarioCard
              title="Подозрение на ОКС без явных изменений"
              subtitle="Наблюдение, серийные тропонины, оценка риска и дообследование."
              href="#definition"
            />
          </div>
        </header>

        {/* 1. Scientia MedRadix: отличия EU / US */}
        <section id="medradix-eu-us" className="scroll-mt-24">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-[#2b2115]">
            Scientia MedRadix: отличия EU / US
          </h2>
          <p className="text-sm md:text-base text-[#4b3b2f] mb-3">
            Здесь будет собран сравнительный обзор ключевых отличий между
            европейскими (ESC) и американскими (ACC/AHA) рекомендациями
            по ОКС: критерии диагностики, сроки реперфузии, подходы к
            антикоагулянтной и антитромбоцитарной терапии, стратификация риска
            и вторичная профилактика.
          </p>
          <p className="text-xs text-[#7b746a]">
            *Этот блок — фирменная часть MedRadix и будет наполняться отдельно
            с указанием конкретных источников и таблиц.*
          </p>
        </section>

        {/* 2. Определение и классификация */}
        <section id="definition" className="scroll-mt-24">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-[#2b2115]">
            Определение и классификация
          </h2>
          <p className="text-sm md:text-base text-[#4b3b2f]">
            В структуре реального гайда здесь будет академичное описание
            определения инфаркта миокарда, критериев повреждения и ишемии,
            типов инфаркта (1–5) и различий между STEMI, NSTEMI и нестабильной
            стенокардией с ссылками на актуальные ESC/ACC/AHA рекомендации.
          </p>
        </section>

        {/* 3. Стратификация риска */}
        <section id="risk" className="scroll-mt-24">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-[#2b2115]">
            Стратификация риска
          </h2>
          <p className="text-sm md:text-base text-[#4b3b2f]">
            Здесь будут схемы и таблицы для оценки риска по шкалам GRACE,
            TIMI и другим инструментам, а также критерии отбора пациентов
            для ранней инвазивной стратегии или консервативного ведения.
          </p>
        </section>

        {/* 4. Стратегии лечения */}
        <section id="treatment" className="scroll-mt-24">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-[#2b2115]">
            Стратегии лечения
          </h2>
          <p className="text-sm md:text-base text-[#4b3b2f]">
            В готовом гайде здесь будут алгоритмы выбора реперфузионной терапии
            (первичное ЧКВ, тромболизис, отсроченное вмешательство), временные
            окна, особенности ведения особых групп пациентов.
          </p>
        </section>

        {/* 5. Медикаментозная терапия */}
        <section id="medication" className="scroll-mt-24">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-[#2b2115]">
            Медикаментозная терапия
          </h2>
          <p className="text-sm md:text-base text-[#4b3b2f]">
            Здесь будет структурированное изложение антиагрегантной,
            антикоагулянтной, бета-блокирующей, статиновой терапии и других
            классов препаратов с привязкой к разделу «Лекарства» на MedRadix.
          </p>
        </section>
      </div>
    </div>
  );
}

type ScenarioCardProps = {
  title: string;
  subtitle: string;
  href: string;
};

function ScenarioCard({ title, subtitle, href }: ScenarioCardProps) {
  return (
    <a
      href={href}
      className="block rounded-2xl border border-[#e0d6c8] bg-white px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      <h3 className="text-sm md:text-base font-semibold text-[#2b2115] mb-2">
        {title}
      </h3>
      <p className="text-xs md:text-sm text-[#4b3b2f]">{subtitle}</p>
    </a>
  );
}


