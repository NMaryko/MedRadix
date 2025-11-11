// app/guides/page.tsx
'use client';

import { useState } from 'react';

type SpecialtyId = 'cardiology';

interface Specialty {
  id: SpecialtyId;
  label: string;
}

const SPECIALTIES: Specialty[] = [
  { id: 'cardiology', label: 'Кардиология' },
];

type NosologyId =
  | 'htn'
  | 'ischemic'
  | 'acs'
  | 'arrhythmias'
  | 'hf'
  | 'valvular'
  | 'cmp'
  | 'myocarditis'
  | 'pericarditis'
  | 'ie'
  | 'pe'
  | 'chd';

interface Nosology {
  id: NosologyId;
  label: string;
}

const CARDIO_NOSOLOGIES: Nosology[] = [
  { id: 'htn', label: 'Артериальная гипертензия' },
  { id: 'ischemic', label: 'Ишемическая болезнь сердца (стабильная)' },
  { id: 'acs', label: 'Острый коронарный синдром (ОКС)' },
  { id: 'arrhythmias', label: 'Нарушения ритма и проводимости' },
  { id: 'hf', label: 'Хроническая сердечная недостаточность' },
  { id: 'valvular', label: 'Клапанные пороки сердца' },
  { id: 'cmp', label: 'Кардиомиопатии' },
  { id: 'myocarditis', label: 'Миокардиты' },
  { id: 'pericarditis', label: 'Перикардиты' },
  { id: 'ie', label: 'Инфекционный эндокардит' },
  { id: 'pe', label: 'Тромбоэмболия лёгочной артерии (ТЭЛА)' },
  { id: 'chd', label: 'Врожденные пороки сердца' },
];

type ScenarioId = 'stemi' | 'nstemi' | 'unstable' | 'noStElevation';

interface Scenario {
  id: ScenarioId;
  title: string;
  subtitle: string;
}

const ACS_SCENARIOS: Scenario[] = [
  {
    id: 'stemi',
    title: 'STEMI: подъём ST и типичный болевой синдром',
    subtitle: 'Сценарий немедленной реперфузии и первичного ЧКВ.',
  },
  {
    id: 'nstemi',
    title: 'NSTEMI: некроз без подъёма ST',
    subtitle:
      'Повышение тропонина без подъёма ST, необходимость ранней инвазивной стратегии.',
  },
  {
    id: 'unstable',
    title: 'Нестабильная стенокардия',
    subtitle:
      'Болевой синдром без некроза миокарда, оценка риска и выбор инвазивной тактики.',
  },
];

type GuideSectionId =
  | 'sm_eu_us'
  | 'definition'
  | 'diagnostics'
  | 'risk'
  | 'strategy'
  | 'pharm'
  | 'invasive'
  | 'followup';

interface GuideSection {
  id: GuideSectionId;
  shortTitle: string;
  fullTitle: string;
}

const ACS_SECTIONS: GuideSection[] = [
  {
    id: 'sm_eu_us',
    shortTitle: 'Scientia MedRadix: EU / US',
    fullTitle: 'Scientia MedRadix: ключевые отличия европейских и американских рекомендаций',
  },
  {
    id: 'definition',
    shortTitle: 'Определение',
    fullTitle: 'Определение и классификация ОКС',
  },
  {
    id: 'diagnostics',
    shortTitle: 'Диагностика',
    fullTitle: 'Диагностика и первичная оценка пациента с подозрением на ОКС',
  },
  {
    id: 'risk',
    shortTitle: 'Риск',
    fullTitle: 'Стратификация риска',
  },
  {
    id: 'strategy',
    shortTitle: 'Тактика',
    fullTitle: 'Стратегия ведения и выбор реперфузии',
  },
  {
    id: 'pharm',
    shortTitle: 'Фармакотерапия',
    fullTitle: 'Антитромботическая и сопутствующая фармакотерапия',
  },
  {
    id: 'invasive',
    shortTitle: 'Инвазивные методы',
    fullTitle: 'Инвазивные вмешательства и особенности ЧКВ',
  },
  {
    id: 'followup',
    shortTitle: 'Наблюдение',
    fullTitle: 'Долгосрочное наблюдение и вторичная профилактика',
  },
];

function renderAcsSectionBody(sectionId: GuideSectionId, scenarioId: ScenarioId) {
  // Здесь пока академичные, но короткие черновые тексты-шаблоны.
  // Потом вы сможете заменить их реальными выдержками из ESC/ACC/AHA.
  switch (sectionId) {
    case 'sm_eu_us':
      return (
        <>
          <p className="mb-3">
            В этом блоке будут системно собраны отличия между европейскими рекомендациями
            (ESC) и американскими (ACC/AHA) по ведению пациентов с острым коронарным синдромом.
          </p>
          <p className="mb-3">
            Для каждого шага маршрута пациента — от догоспитального этапа до вторичной
            профилактики — будут указаны:
          </p>
          <ul className="list-disc list-inside space-y-1 mb-3">
            <li>различия в классах рекомендаций и уровне доказательности;</li>
            <li>отличия в пороговых значениях (тайминги, дозировки, шкалы риска);</li>
            <li>особенности выбора стратегии реперфузии и фармакотерапии.</li>
          </ul>
          <p className="text-sm text-gray-500">
            Источники: актуальные версии ESC и ACC/AHA по ОКС, ссылки будут вынесены
            отдельным списком литературы.
          </p>
        </>
      );
    case 'definition':
      return (
        <>
          <p className="mb-3">
            Острый коронарный синдром (ОКС) — клинико-биохимический синдром, возникающий
            при остром нарушении коронарного кровотока и включающий STEMI, NSTEMI и
            нестабильную стенокардию.
          </p>
          <p className="mb-3">
            В шаблоне гайда здесь будет краткая, но точная формулировка из оригинального
            документа ESC / ACC/AHA, а также упрощённая схема классификации для ежедневной
            практики.
          </p>
        </>
      );
    case 'diagnostics':
      return (
        <>
          <p className="mb-3">
            Диагностический блок собирает воедино клинику, ЭКГ, динамику высокочувствительного
            тропонина и визуализацию. Для каждого сценария ОКС акценты различаются:
          </p>
          <ul className="list-disc list-inside space-y-1 mb-3">
            <li>для STEMI — приоритет немедленной ЭКГ и фиксации подъёма ST;</li>
            <li>
              для NSTEMI / нестабильной стенокардии — повторная ЭКГ, серийный тропонин,
              шкалы риска (GRACE, TIMI);
            </li>
            <li>учёт дифференциального диагноза (МИНОКА, миокардит, ТЭЛА и др.).</li>
          </ul>
        </>
      );
    case 'risk':
      return (
        <>
          <p className="mb-3">
            Стратификация риска основана на сочетании клинических, электрокардиографических
            и биохимических критериев. В таблицах будут представлены ключевые пороги
            и критерии высокого/очень высокого риска для выбора инвазивной стратегии.
          </p>
        </>
      );
    case 'strategy':
      return (
        <>
          <p className="mb-3">
            В этой секции будет маршрут пациента для выбранного сценария{' '}
            <span className="font-semibold">{scenarioId.toUpperCase()}</span> — в виде
            схем и алгоритмов:
          </p>
          <ul className="list-disc list-inside space-y-1 mb-3">
            <li>тайминги реперфузии (door-to-balloon, door-to-needle);</li>
            <li>показания к первичному ЧКВ и фармакоинвазивной стратегии;</li>
            <li>когда допустима консервативная тактика.</li>
          </ul>
        </>
      );
    case 'pharm':
      return (
        <>
          <p className="mb-3">
            Раздел фармакотерапии обобщит схемы антитромботической терапии (DAPT, тройная
            терапия), антикоагулянтов и вторичной профилактики (статины, ИАПФ, β-блокаторы).
          </p>
        </>
      );
    case 'invasive':
      return (
        <>
          <p className="mb-3">
            Здесь будут сосредоточены инвазивные аспекты: показания к ЧКВ / АКШ, особенности
            стентирования, тактика при многофокусном поражении, сроки вмешательства при
            NSTEMI/нестабильной стенокардии.
          </p>
        </>
      );
    case 'followup':
      return (
        <>
          <p className="mb-3">
            Блок наблюдения и вторичной профилактики объединит рекомендации по контролю
            факторов риска, физической реабилитации и длительности антитромботической
            терапии с учётом шкал ишемического и геморрагического риска.
          </p>
        </>
      );
    default:
      return null;
  }
}

export default function GuidesPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<SpecialtyId>('cardiology');
  const [selectedNosology, setSelectedNosology] = useState<NosologyId | null>('acs');
  const [selectedScenario, setSelectedScenario] = useState<ScenarioId>('stemi');
  const [activeSection, setActiveSection] = useState<GuideSectionId>('sm_eu_us');

  const currentNosologies =
    selectedSpecialty === 'cardiology' ? CARDIO_NOSOLOGIES : [];

  const showAcs =
    selectedSpecialty === 'cardiology' && selectedNosology === 'acs';

  return (
    <main className="bg-[#fcfcee] min-h-screen">
      {/* Блок афоризма + фильтры (как на главной) */}
      <section className="border-b border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 pt-4 pb-5">
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

            {/* Справа: фильтр специальности + нозологии */}
            <div className="flex-1 flex justify-end">
              <div className="flex flex-col items-end gap-2">
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f]">
                    Специальность
                  </span>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) =>
                      setSelectedSpecialty(e.target.value as SpecialtyId)
                    }
                    className="min-w-[220px] rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52]"
                  >
                    {SPECIALTIES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f]">
                    Нозология
                  </span>
                  <select
                    value={selectedNosology ?? ''}
                    onChange={(e) =>
                      setSelectedNosology(e.target.value as NosologyId)
                    }
                    className="min-w-[260px] rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52]"
                  >
                    {currentNosologies.map(👎 => (
                      <option key={n.id} value={n.id}>
                        {n.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Описание нозологии и сценарии (пример для ОКС) */}
      {showAcs && (
        <section className="max-w-[1360px] mx-auto px-4 pt-10 pb-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-[#2b2115] mb-3">
              Острый коронарный синдром (ОКС)
            </h1>
            <p className="max-w-3xl mx-auto text-base text-[#4b3b2f] leading-relaxed">
              ОКС объединяет STEMI, NSTEMI и нестабильную стенокардию и
              отражает острое нарушение коронарного кровотока. Ниже представлены
              ключевые клинические сценарии, из которых можно перейти к
              подробной структуре гайда.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {ACS_SCENARIOS.map((scenario) => {
              const isActive = selectedScenario === scenario.id;
              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => setSelectedScenario(scenario.id)}
                  className={`text-left rounded-3xl border px-5 py-4 shadow-sm transition-all duration-200 ${
                    isActive
                      ? 'border-[#015d52] bg-white shadow-[0_14px_30px_rgba(0,0,0,0.08)]'
                      : 'border-[#e2dbcf] bg-white/70 hover:shadow-[0_10px_24px_rgba(0,0,0,0.06)]'
                  }`}
                >
                  <div className="text-sm font-semibold text-[#2b2115] mb-1">
                    {scenario.title}
                  </div>
                  <div className="text-sm text-[#4b3b2f]">
                    {scenario.subtitle}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Структура гайда по выбранному сценарию ОКС */}
      {showAcs && (
        <section className="border-t border-gray-200 bg-[#f8f4ee]/80">
          <div className="max-w-[1360px] mx-auto px-4 py-10 flex gap-10">
            {/* Левая колонка: разделы гайда */}
            <aside className="w-64 flex-shrink-0">
              <nav className="space-y-2">
                {ACS_SECTIONS.map((section) => {
                  const isActive = activeSection === section.id;
                  const isSm = section.id === 'sm_eu_us';
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-[#015d52] text-white shadow-md'
                          : isSm
                          ? 'bg-[#fff7e6] text-[#8a4b00] hover:bg-[#ffefd1]'
                          : 'bg-white/80 text-[#3b342d] hover:bg-[#e9e1d6]'
                      }`}
                    >
                      {section.shortTitle}
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Правая колонка: тело выбранного раздела */}
            <div className="flex-1 bg-white/90 rounded-3xl shadow-[0_18px_40px_rgba(0,0,0,0.06)] px-8 py-6">
              {ACS_SECTIONS.map((section) =>
                section.id === activeSection ? (
                  <article key={section.id}>
                    <h2 className="text-2xl font-semibold text-[#2b2115] mb-4">
                      {section.fullTitle}
                    </h2>
                    <div className="text-[15px] leading-relaxed text-[#3b342d] space-y-2">
                      {renderAcsSectionBody(section.id, selectedScenario)}
                    </div>
                  </article>
                ) : null
              )}
            </div>
          </div>
        </section>
      )}

      {/* Низ страницы: support */}
      <section className="border-t border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 py-10 text-center">
          <p className="text-sm md:text-base text-[#4b3b2f]">
            support@medradix.info
          </p>
        </div>
      </section>
    </main>
  );
}

