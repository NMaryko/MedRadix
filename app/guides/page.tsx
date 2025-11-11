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

// Нозологии для кардиологии (можно расширять)
const CARDIO_DIAGNOSES: string[] = [
  'Выберите нозологию',
  'Острый коронарный синдром (ОКС)',
  'Фибрилляция предсердий',
  'Хроническая сердечная недостаточность',
  'Артериальная гипертензия',
  'Дислипидемия',
];

interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  content: string;
}

const ACS_SCENARIOS: Scenario[] = [
  {
    id: 'stemi',
    title: 'Сценарий 1. ОКС с подъёмом сегмента ST (STEMI)',
    subtitle:
      'Пациент с типичными болями и подъёмом ST — стратегия реперфузии в первые часы.',
    content:
      'Ключевые шаги: немедленная ЭКГ, оценка по шкалам риска, приоритет первичного ЧКВ в течение 120 минут от первого медицинского контакта. Если ЧКВ недоступно — системный тромболизис с последующим переводом в центр ЧКВ. Антитромбоцитарная терапия: нагрузочные дозы аспирина и ингибитора P2Y12 (предпочтительно тикагрелор/прасугрел в европейских рекомендациях, в США — чаще клопидогрел при высоком риске кровотечений).',
  },
  {
    id: 'nstemi',
    title: 'Сценарий 2. ОКС без подъёма ST (NSTEMI / нестабильная стенокардия)',
    subtitle:
      'Высокий или промежуточный риск по GRACE/ESC — ранняя инвазивная стратегия.',
    content:
      'Основные элементы: серийное измерение тропонина высокочувствительными тестами, стратификация риска (GRACE, TIMI). При высоком риске — коронарография в течение 24 часов, при очень высоком — в первые 2 часа. Антитромбоцитарная терапия двойная, антикоагулянты — фондапаринукс/НМГ; выбор конкретных препаратов зависит от наличия ЧКВ, риска кровотечения, сопутствующих состояний.',
  },
  {
    id: 'acs-uncertain',
    title: 'Сценарий 3. Подозрение на ОКС, но нет подъёма тропонина / неспецифическая ЭКГ',
    subtitle:
      'Пациент с грудной болью, но промежуточная вероятность ОКС — протокол наблюдения.',
    content:
      'Фокус: повторные ЭКГ, динамика высокочувствительного тропонина по ускоренным протоколам (0–1 ч, 0–2 ч). Если биомаркеры и ЭКГ остаются без изменений, рассматриваются неишемические причины болей. При сохранении симптомов и промежуточном риске — функциональные тесты или КТ-коронарография для уточнения диагноза.',
  },
];

function MedRadixInsight() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-[#015d52] bg-white px-5 py-2 text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-[#015d52] shadow-sm hover:bg-[#015d52] hover:text-white transition-colors"
      >
        MedRadix Insight — EU / US
        <span className="text-[10px] md:text-xs">
          {open ? 'Свернуть' : 'Показать отличия'}
        </span>
      </button>

      {open && (
        <div className="mt-4 rounded-2xl bg-white/90 border border-[#d3cec4] p-5 text-sm md:text-base leading-relaxed text-[#3b342d] shadow-sm">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Стратегия реперфузии при STEMI.</strong> ESC более жёстко
              настаивает на первичном ЧКВ в первые 120 минут; американские
              рекомендации допускают немного большую вариативность в зависимости
              от логистики центра.
            </li>
            <li>
              <strong>Выбор P2Y12-ингибитора.</strong> В европейских гайдах
              тикагрелор/прасугрел чаще указаны как препараты первой линии у
              пациентов без высокого риска кровотечения; в США шире
              используется клопидогрел, особенно у пожилых и при ограниченном
              доступе к новым препаратам.
            </li>
            <li>
              <strong>Длительность двойной антитромбоцитарной терапии.</strong>{' '}
              Общий диапазон 6–12 месяцев совпадает, но ESC активнее предлагает
              сократить ДАТТ у пациентов с высоким риском кровотечений и
              расширить у пациентов с высоким ишемическим риском.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

function AcuteCoronarySyndromeSection() {
  const [openScenarioId, setOpenScenarioId] = useState<string | null>(null);

  return (
    <section className="max-w-[960px] mx-auto pt-10 pb-16">
      {/* Заголовок ОКС */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-semibold italic text-[#1f2933]">
          Острый коронарный синдром (ОКС)
        </h1>
        <p className="mt-3 text-sm md:text-base text-[#3b342d] max-w-2xl mx-auto leading-relaxed">
          ОКС объединяет STEMI, NSTEMI и нестабильную стенокардию. Основные
          задачи — раннее распознавание, оценка риска и выбор оптимальной
          стратегии реперфузии или инвазивного вмешательства в зависимости от
          времени, доступности ЧКВ-центра и профиля риска пациента.
        </p>
      </div>

      {/* Чип с отличиями EU/US */}
      <MedRadixInsight />

      {/* Сценарии ОКС */}
      <div className="mt-10 space-y-4">
        <h2 className="text-lg md:text-xl font-semibold text-[#1f2933] text-center mb-2">
          Клинические сценарии
        </h2>

        {ACS_SCENARIOS.map((scenario) => {
          const isOpen = openScenarioId === scenario.id;

          return (
            <div
              key={scenario.id}
              className="rounded-2xl bg-white/90 border border-[#e0dbd0] shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                type="button"
                onClick={() =>
                  setOpenScenarioId(isOpen ? null : scenario.id)
                }
                className="w-full text-left px-5 py-4 flex flex-col gap-1"
              >
                <span className="text-base md:text-lg font-semibold text-[#3b2b22]">
                  {scenario.title}
                </span>
                <span className="text-xs md:text-sm text-[#6b5b4a]">
                  {scenario.subtitle}
                </span>
                <span className="mt-1 text-[11px] md:text-xs text-[#9c8f80] uppercase tracking-[0.16em]">
                  {isOpen ? 'Свернуть сценарий' : 'Открыть сценарий'}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-4 text-sm md:text-base text-[#3b342d] leading-relaxed border-t border-[#efe8dc]">
                  {scenario.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function GuidesPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Все');
  const [selectedDiagnosis, setSelectedDiagnosis] =
    useState<string>('Выберите нозологию');

  const isCardio = selectedSpecialty === 'Кардиология';
  const showACS = isCardio && selectedDiagnosis === 'Острый коронарный синдром (ОКС)';

  return (
    <main className="bg-[#fcfcee] min-h-screen">
      {/* Блок афоризма — как на главной */}
      <section className="border-b border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 pt-4 pb-4">
          <div className="flex items-center">
            {/* Чип слева */}
            <div className="flex-1 flex justify-start">
              <button className="px-5 py-1.5 text-xs font-medium rounded-full border border-[#b6b6c0] bg-white shadow-sm">
                Афоризм месяца
              </button>
            </div>

            {/* Афоризм по центру */}
            <div className="flex-shrink-0 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold italic tracking-wide">
                Mens sana in corpore sano
              </h2>
              <p className="mt-1.5 text-sm text-[#3b342d]">
                В здоровом теле — здоровый дух (Ювенал)
              </p>
            </div>

            {/* Фильтр специальности справа */}
            <div className="flex-1 flex justify-end">
              <div className="flex flex-col items-end gap-1">
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f]">
                  Специальность
                </span>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => {
                    setSelectedSpecialty(e.target.value);
                    setSelectedDiagnosis('Выберите нозологию');
                  }}
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

          {/* Второй фильтр — нозологии, только для кардиологии */}
          {isCardio && (
            <div className="mt-4 flex justify-center">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f]">
                  Нозология
                </span>
                <select
                  value={selectedDiagnosis}
                  onChange={(e) => setSelectedDiagnosis(e.target.value)}
                  className="min-w-[260px] rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52]"
                >
                  {CARDIO_DIAGNOSES.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Основное содержимое: либо подсказка, либо ОКС */}
      <section className="max-w-[1360px] mx-auto px-4">
        {!isCardio && (
          <div className="py-16 text-center text-sm md:text-base text-[#6b5b4a]">
            Выберите специальность, чтобы увидеть список доступных гайдов.
          </div>
        )}

        {isCardio && !showACS && (
          <div className="py-16 text-center text-sm md:text-base text-[#6b5b4a]">
            Выберите нозологию, чтобы просмотреть структуру гайда. Для примера
            сейчас реализован раздел «Острый коронарный синдром (ОКС)».
          </div>
        )}

        {showACS && <AcuteCoronarySyndromeSection />}
      </section>

      {/* Низ страницы с support */}
      <section className="border-t border-gray-200 mt-8">
        <div className="max-w-[1360px] mx-auto px-4 py-10 text-center">
          <p className="text-sm md:text-base text-[#4b3b2f]">
            support@medradix.info
          </p>
        </div>
      </section>
    </main>
  );
}
