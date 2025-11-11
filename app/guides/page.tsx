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

// Нозологии для кардиологии — список можно потом расширять
const CARDIO_DIAGNOSES: string[] = [
  'Выберите нозологию',
  'Острый коронарный синдром (ОКС)',
  'Фибрилляция предсердий',
  'Хроническая сердечная недостаточность',
  'Артериальная гипертензия',
  'Стабильная ишемическая болезнь сердца',
  'Постинфарктный период',
  'Тромбоэмболия лёгочной артерии',
  'Тахиаритмии',
];

type ScenarioId = 'stemi' | 'nstemi' | 'uncertain';

interface Scenario {
  id: ScenarioId;
  title: string;
  subtitle: string;
}

const ACS_SCENARIOS: Scenario[] = [
  {
    id: 'stemi',
    title: 'STEMI: подъём ST и типичный болевой синдром',
    subtitle: 'Приоритет немедленной реперфузии и первичного ЧКВ.',
  },
  {
    id: 'nstemi',
    title: 'NSTEMI / нестабильная стенокардия',
    subtitle: 'Высокий риск по шкалам — ранняя инвазивная стратегия.',
  },
  {
    id: 'uncertain',
    title: 'Подозрение на ОКС без явных изменений',
    subtitle: 'Наблюдение, протоколы серийного тропонина и дообследование.',
  },
];

const GUIDE_SECTIONS = [
  { id: 'overview', label: 'Обзор и цели' },
  { id: 'diagnostics', label: 'Диагностика' },
  { id: 'treatment', label: 'Лечение' },
  { id: 'reperfusion', label: 'Реперфузионная стратегия' },
  { id: 'antithrombotic', label: 'Антитромботическая терапия' },
  { id: 'followup', label: 'Наблюдение' },
  { id: 'eu-us', label: 'EU / US отличия' },
];

function getScenarioIntro(id: ScenarioId): {
  overview: string;
  diagnostics: string;
  treatment: string;
  reperfusion: string;
  antithrombotic: string;
  followup: string;
} {
  switch (id) {
    case 'stemi':
      return {
        overview:
          'STEMI — ОКС с подъёмом сегмента ST, отражающий, как правило, полную окклюзию коронарной артерии. Цель — максимально ранняя реперфузия (желательно в первые 120 минут от первого медицинского контакта).',
        diagnostics:
          'Ключевые элементы диагностики: типичный болевой синдром, ЭКГ с подъёмом ST ≥1 мм в смежных отведениях или новый блок левой ножки, быстрый высокочувствительный тропонин (подтверждает миокардиальное повреждение, но не должен задерживать решение о реперфузии).',
        treatment:
          'Лечение включает немедленную антитромбоцитарную терапию, антикоагулянты, ангиотензин-превращающие ингибиторы/АРНИ, бета-блокаторы, статины и агрессивный контроль факторов риска. Основное решение — выбор метода реперфузии (ЧКВ или тромболизис).',
        reperfusion:
          'При доступном ЧКВ-центре — первичное ЧКВ в течение 120 минут от первого контакта. Если время превышает порог — предпочтителен немедленный тромболизис с последующим переводом в центр ЧКВ для ранней коронарографии.',
        antithrombotic:
          'Стартовая ДАТТ: аспирин + P2Y12-ингибитор (тикагрелор/прасугрел или клопидогрел в зависимости от рекомендаций и профиля риска). Антикоагуляция — НФГ или НМГ на этапе острого вмешательства. Длительность ДАТТ обычно 12 месяцев с возможной модификацией в зависимости от ишемического и геморрагического риска.',
        followup:
          'После выписки — строгий контроль факторов риска, кардиореабилитация, оценка необходимости ИКД/CRT, регулярная оценка приверженности терапии и появление симптомов ишемии или сердечной недостаточности.',
      };
    case 'nstemi':
      return {
        overview:
          'NSTEMI и нестабильная стенокардия объединяются в ОКС без подъёма ST. Основная задача — стратификация риска и выбор момента инвазивного вмешательства (коронарографии).',
        diagnostics:
          'Диагностика основана на клинической картине, динамике высокочувствительного тропонина и изменениях ST/T на ЭКГ. Используются шкалы GRACE, TIMI, HEART для стратификации риска и планирования инвазивной стратегии.',
        treatment:
          'Базисная терапия: кислород при гипоксии, анальгезия, нитраты (при отсутствии гипотонии), бета-блокаторы, статины в нагрузочной дозе, ингибиторы АПФ. Решение о времени коронарографии зависит от клинических критериев очень высокого, высокого или умеренного риска.',
        reperfusion:
          'При очень высоком риске (нестабильность гемодинамики, рефрактерная ишемия, угрожающие аритмии) — немедленная инвазивная стратегия в первые 2 часа. При высоком риске — ранняя коронарография в течение 24 часов. При промежуточном риске — инвазивная тактика в течение 72 часов или функциональные тесты.',
        antithrombotic:
          'ДАТТ: аспирин + P2Y12-ингибитор (чаще тикагрелор/клопидогрел). Антикоагуляция фондапаринуксом, НМГ или НФГ в зависимости от протокола и наличия ЧКВ. При сочетании с пероральными антикоагулянтами возможно сокращение до двойной терапии.',
        followup:
          'После NSTEMI акцент делается на вторичной профилактике: контроль артериального давления, липидов, гликемии, обязательное прекращение курения, кардиореабилитация и план регулярных визитов.',
      };
    case 'uncertain':
    default:
      return {
        overview:
          'Пациенты с болью в груди и промежуточной вероятностью ОКС требуют структурированного подхода: быстрый сбор анамнеза, стратификация риска и минимизация ненужных госпитализаций без пропуска истинного ОКС.',
        diagnostics:
          'Используются алгоритмы ускоренного высокочувствительного тропонина (0–1 час или 0–2 часа), повторные ЭКГ и клиническая оценка. При отрицательной динамике биомаркеров и отсутствии ЭКГ-изменений рассматриваются другие причины болевого синдрома.',
        treatment:
          'До исключения ОКС пациент наблюдается в мониторном отделении с контролем симптомов. Антитромботическая терапия может быть отсрочена до уточнения диагноза, чтобы избежать необоснованного риска кровотечения.',
        reperfusion:
          'При появлении типичных изменений ЭКГ или росте тропонина пациент переводится в категорию NSTEMI/STEMI с соответствующей инвазивной стратегией. При стабильной картине — рассматриваются функциональные тесты или КТ-коронарография.',
        antithrombotic:
          'Антитромботическая терапия назначается после подтверждения ишемической природы симптомов. Это позволяет снизить риск ненужной антикоагуляции и ДАТТ у пациентов без коронарной патологии.',
        followup:
          'Даже при исключении ОКС важно оценить общий сердечно-сосудистый риск, дать рекомендации по образу жизни и при необходимости направить к кардиологу для дообследования (стресс-тесты, визуализация).',
      };
  }
}

function AcsGuideDetail({ scenarioId }: { scenarioId: ScenarioId }) {
  const {
    overview,
    diagnostics,
    treatment,
    reperfusion,
    antithrombotic,
    followup,
  } = getScenarioIntro(scenarioId);

  return (
    <section className="mt-10 border-t border-[#e5ddd0] pt-8 pb-16">
      <div className="max-w-[1100px] mx-auto grid gap-8 md:grid-cols-[260px,1fr]">
        {/* ЛЕВАЯ КОЛОНКА: наша фишка + разделы */}
        <aside className="space-y-4 md:sticky md:top-24 self-start">
          {/* Чип-фишка */}
          <a
            href="#eu-us"
            className="inline-flex w-full items-center justify-center rounded-full border border-[#015d52] bg-white px-4 py-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.18em] text-[#015d52] shadow-sm hover:bg-[#015d52] hover:text-white transition-colors"
          >
            Scientia MedRadix — EU / US отличия
          </a>

          {/* Кнопки разделов */}
          <nav className="space-y-2">
            {GUIDE_SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-xs md:text-sm text-[#3b342d] hover:border-[#015d52] hover:text-[#015d52] transition-colors"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* ПРАВАЯ КОЛОНКА: контент гайда */}
        <div className="space-y-10 text-sm md:text-base leading-relaxed text-[#3b342d]">
          {/* Обзор */}
          <section id="overview">
            <h2 className="text-lg md:text-xl font-semibold mb-2">
              Обзор и цели
            </h2>
            <p>{overview}</p>
          </section>

          {/* Диагностика */}
          <section id="diagnostics">
            <h2 className="text-lg md:text-xl font-semibold mb-2">
              Диагностика
            </h2>
            <p className="mb-4">{diagnostics}</p>
            {/* Небольшая «схема» шагов */}
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl bg-white shadow-sm border border-[#e6dfd4] px-3 py-3">
                <div className="text-[11px] uppercase tracking-[0.16em] text-[#9c8f80] mb-1">
                  Шаг 1
                </div>
                <div className="font-semibold mb-1">Клиника + ЭКГ</div>
                <p className="text-xs md:text-sm">
                  Оценка симптомов, ЭКГ в 12 отведениях, при необходимости
                  повторная ЭКГ через 15–30 минут.
                </p>
              </div>
              <div className="rounded-2xl bg-white shadow-sm border border-[#e6dfd4] px-3 py-3">
                <div className="text-[11px] uppercase tracking-[0.16em] text-[#9c8f80] mb-1">
                  Шаг 2
                </div>
                <div className="font-semibold mb-1">Тропонин</div>
                <p className="text-xs md:text-sm">
                  Высокочувствительный тропонин по ускоренному протоколу
                  (0–1/0–2 часа), оценка динамики.
                </p>
              </div>
              <div className="rounded-2xl bg-white shadow-sm border border-[#e6dfd4] px-3 py-3">
                <div className="text-[11px] uppercase tracking-[0.16em] text-[#9c8f80] mb-1">
                  Шаг 3
                </div>
                <div className="font-semibold mb-1">Стратификация риска</div>
                <p className="text-xs md:text-sm">
                  Шкалы GRACE/TIMI/HEART для выбора тактики наблюдения или
                  инвазивного вмешательства.
                </p>
              </div>
            </div>
          </section>

          {/* Лечение */}
          <section id="treatment">
            <h2 className="text-lg md:text-xl font-semibold mb-2">Лечение</h2>
            <p className="mb-3">{treatment}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>контроль боли и тревоги (нитраты, опиоиды при необходимости);</li>
              <li>коррекция гипоксии, артериального давления, ЧСС;</li>
              <li>ранний запуск вторичной профилактики (статины, ИАПФ/АРНИ и др.).</li>
            </ul>
          </section>

          {/* Реперфузионная стратегия */}
          <section id="reperfusion">
            <h2 className="text-lg md:text-xl font-semibold mb-2">
              Реперфузионная стратегия
            </h2>
            <p className="mb-3">{reperfusion}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#f5efe4]">
                    <th className="border border-[#e0d6c7] px-2 py-1 text-left">
                      Ситуация
                    </th>
                    <th className="border border-[#e0d6c7] px-2 py-1 text-left">
                      Предпочтительная тактика
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#e0d6c7] px-2 py-1">
                      Доступен ЧКВ-центр &lt; 120 мин
                    </td>
                    <td className="border border-[#e0d6c7] px-2 py-1">
                      Первичное ЧКВ с полной подготовкой antithrombotic терапии.
                    </td>
                  </tr>
                  <tr className="bg-[#fbf7f1]">
                    <td className="border border-[#e0d6c7] px-2 py-1">
                      Нет ЧКВ в пределах 120 мин
                    </td>
                    <td className="border border-[#e0d6c7] px-2 py-1">
                      Системный тромболизис как можно раньше, затем перевод в
                      центр ЧКВ.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#e0d6c7] px-2 py-1">
                      Высокий риск по шкалам без подъёма ST
                    </td>
                    <td className="border border-[#e0d6c7] px-2 py-1">
                      Ранняя инвазивная стратегия (коронарография в первые 24–72
                      часа).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Антитромботическая терапия */}
          <section id="antithrombotic">
            <h2 className="text-lg md:text-xl font-semibold mb-2">
              Антитромботическая терапия
            </h2>
            <p className="mb-3">{antithrombotic}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>оценка риска кровотечения (HAS-BLED, ARC-HBR и др.);</li>
              <li>выбор конкретного P2Y12-ингибитора и антикоагулянта;</li>
              <li>планируемая длительность ДАТТ с возможной деэскалацией.</li>
            </ul>
          </section>

          {/* Наблюдение */}
          <section id="followup">
            <h2 className="text-lg md:text-xl font-semibold mb-2">
              Наблюдение и вторичная профилактика
            </h2>
            <p>{followup}</p>
          </section>

          {/* EU / US отличия */}
          <section id="eu-us">
            <h2 className="text-lg md:text-xl font-semibold mb-2">
              EU / US отличия в рекомендациях
            </h2>
            <p className="mb-3">
              Ниже приведён краткий структурированный обзор различий между
              европейскими (ESC) и американскими (ACC/AHA) рекомендациями по
              ведению ОКС.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#015d52] text-white">
                    <th className="border border-[#01463f] px-2 py-1 text-left">
                      Параметр
                    </th>
                    <th className="border border-[#01463f] px-2 py-1 text-left">
                      ESC (EU)
                    </th>
                    <th className="border border-[#01463f] px-2 py-1 text-left">
                      ACC/AHA (US)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#e0d6c7] px-2 py-1">
                      Временное окно для первичного ЧКВ при STEMI
                    </td>
                    <td className="border border-[#e0d6c7] px-2 py-1">
                      До 120 минут от первого медицинского контакта.
                    </td>
                    <td className="border border-[#e0d6c7] px-2 py-1">
                      Аналогичные рамки, но допускается большая вариативность в
                      зависимости от логистики.
                    </td>
                  </tr>
                  <tr className="bg-[#fbf7f1]">
                    <td className="border border-[#e0d6c7] px-2 py-1">
                      Предпочтительный P2Y12-ингибитор
                    </td>
                    <td className="border border-[#e0d6c7] px-2 py-1">
                      Тикагрелор/прасугрел у большинства пациентов без
                      высокого риска кровотечения.
                    </td>
                    <td className="border border-[#e0d6c7] px-2 py-1">
                      Шире используется клопидогрел, особенно у пожилых и при
                      ограниченном доступе к новым препаратам.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-[#e0d6c7] px-2 py-1">
                      Длительность ДАТТ
                    </td>
                    <td className="border border-[#e0d6c7] px-2 py-1">
                      6–12 мес с активными опциями сокращения/продления при
                      высоком кровоточивом/ишемическом риске.
                    </td>
                    <td className="border border-[#e0d6c7] px-2 py-1">
                      В большинстве случаев 12 мес, деэскалация обсуждается
                      индивидуально.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default function GuidesPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Все');
  const [selectedDiagnosis, setSelectedDiagnosis] =
    useState<string>('Выберите нозологию');
  const [selectedScenarioId, setSelectedScenarioId] =
    useState<ScenarioId | null>(null);

  const isCardio = selectedSpecialty === 'Кардиология';
  const showACS =
    isCardio && selectedDiagnosis === 'Острый коронарный синдром (ОКС)';

  const currentScenario: ScenarioId | null =
    showACS && selectedScenarioId ? selectedScenarioId : null;

  return (
    <main className="bg-[#fcfcee] min-h-screen">
      {/* БЛОК АФОРИЗМА С ФИЛЬТРОМ СПЕЦИАЛЬНОСТИ */}
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

            {/* Специальность справа + под ней нозология для кардио */}
            <div className="flex-1 flex justify-end">
              <div className="flex flex-col items-end gap-2">
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f]">
                    Специальность
                  </span>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedSpecialty(value);
                      setSelectedDiagnosis('Выберите нозологию');
                      setSelectedScenarioId(null);
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

                {isCardio && (
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f]">
                      Нозология
                    </span>
                    <select
                      value={selectedDiagnosis}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedDiagnosis(value);
                        setSelectedScenarioId(null);
                      }}
                      className="min-w-[260px] rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52]"
                    >
                      {CARDIO_DIAGNOSES.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ОСНОВНОЕ СОДЕРЖИМОЕ */}
      <section className="max-w-[1360px] mx-auto px-4">
        {!isCardio && (
          <div className="py-16 text-center text-sm md:text-base text-[#6b5b4a]">
            Выберите специальность и нозологию, чтобы просмотреть структуру
            гайда.
          </div>
        )}

        {isCardio && !showACS && (
          <div className="py-16 text-center text-sm md:text-base text-[#6b5b4a]">
            Выберите нозологию из списка, чтобы открыть соответствующий гайд.
          </div>
        )}

        {showACS && (
          <div className="pt-10 pb-6 max-w-[960px] mx-auto text-center">
            <h1 className="text-2xl md:text-3xl font-semibold italic text-[#1f2933]">
              Острый коронарный синдром (ОКС)
            </h1>
            <p className="mt-3 text-sm md:text-base text-[#3b342d] leading-relaxed">
              ОКС объединяет STEMI, NSTEMI и нестабильную стенокардию. Ниже
              представлены ключевые клинические сценарии, из которых можно
              перейти к детальной структуре гайда.
            </p>
          </div>
        )}

        {/* Сценарии в ряд */}
        {showACS && (
          <div className="max-w-[1100px] mx-auto">
            <div className="grid gap-4 md:grid-cols-3">
              {ACS_SCENARIOS.map((scenario) => {
                const isActive = currentScenario === scenario.id;
                return (
                  <button
                    key={scenario.id}
                    type="button"
                    onClick={() => setSelectedScenarioId(scenario.id)}
                    className={`text-left rounded-2xl border px-4 py-4 shadow-sm transition-all ${
                      isActive
                        ? 'border-[#015d52] bg-white shadow-md -translate-y-0.5'
                        : 'border-[#e0d6c7] bg-white/80 hover:border-[#015d52] hover:shadow-md'
                    }`}
                  >
                    <div className="text-sm md:text-base font-semibold text-[#3b2b22] mb-1">
                      {scenario.title}
                    </div>
                    <div className="text-xs md:text-sm text-[#6b5b4a]">
                      {scenario.subtitle}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Детальный гайд для выбранного сценария */}
            {currentScenario && <AcsGuideDetail scenarioId={currentScenario} />}
          </div>
        )}
      </section>

      {/* НИЗ СТРАНИЦЫ */}
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

