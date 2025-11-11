'use client';

import { useState } from 'react';

type SpecialtyId =
  | 'cardiology'
  | 'neurology'
  | 'endocrinology'
  | 'pulmonology'
  | 'nephrology'
  | 'other';

type CardioNosologyId =
  | 'acs'
  | 'stable-chd'
  | 'htn'
  | 'chronic-hf'
  | 'acute-hf'
  | 'af'
  | 'svt'
  | 'vt-vf'
  | 'av-block'
  | 'myocarditis'
  | 'endocarditis'
  | 'valve-disease'
  | 'pulmonary-embolism'
  | 'pulmonary-hypertension'
  | 'congenital';

interface SpecialtyOption {
  id: SpecialtyId;
  label: string;
}

interface NosologyOption {
  id: CardioNosologyId;
  label: string;
}

interface NosologyGroup {
  label: string;
  items: NosologyOption[];
}

interface AcsScenario {
  id: 'stemi' | 'nstemi' | 'ua';
  title: string;
  subtitle: string;
}

interface GuideSection {
  id: string;
  label: string;
}

// общий список специальностей (можно расширять)
const SPECIALTIES: SpecialtyOption[] = [
  { id: 'cardiology', label: 'Кардиология' },
  { id: 'neurology', label: 'Неврология' },
  { id: 'endocrinology', label: 'Эндокринология' },
  { id: 'pulmonology', label: 'Пульмонология' },
  { id: 'nephrology', label: 'Нефрология' },
  { id: 'other', label: 'Другие специальности' },
];

// системная кардиологическая номенклатура — ГРУППЫ, а не каша
const CARDIOLOGY_GROUPS: NosologyGroup[] = [
  {
    label: 'Ишемическая болезнь сердца',
    items: [
      { id: 'acs', label: 'Острый коронарный синдром (ОКС)' },
      { id: 'stable-chd', label: 'Стабильная ишемическая болезнь сердца' },
    ],
  },
  {
    label: 'Артериальная гипертензия и поражение органов-мишеней',
    items: [{ id: 'htn', label: 'Артериальная гипертензия' }],
  },
  {
    label: 'Сердечная недостаточность',
    items: [
      { id: 'chronic-hf', label: 'Хроническая сердечная недостаточность' },
      { id: 'acute-hf', label: 'Острая сердечная недостаточность' },
    ],
  },
  {
    label: 'Нарушения ритма и проводимости',
    items: [
      { id: 'af', label: 'Фибрилляция и трепетание предсердий' },
      { id: 'svt', label: 'Наджелудочковые тахикардии' },
      { id: 'vt-vf', label: 'Желудочковые тахиаритмии и ФЖ' },
      { id: 'av-block', label: 'Атриовентрикулярные блокады' },
    ],
  },
  {
    label: 'Воспалительные и клапанные заболевания',
    items: [
      { id: 'myocarditis', label: 'Миокардит' },
      { id: 'endocarditis', label: 'Инфекционный эндокардит' },
      { id: 'valve-disease', label: 'Клапанные пороки сердца' },
    ],
  },
  {
    label: 'Лёгочные сосудистые заболевания и врождённые пороки',
    items: [
      { id: 'pulmonary-embolism', label: 'Тромбоэмболия лёгочной артерии' },
      { id: 'pulmonary-hypertension', label: 'Лёгочная гипертензия' },
      { id: 'congenital', label: 'Врожденные пороки сердца (у взрослых)' },
    ],
  },
];

// три ОТДЕЛЬНЫХ сценария ОКС
const ACS_SCENARIOS: AcsScenario[] = [
  {
    id: 'stemi',
    title: 'STEMI: подъём ST и типичный болевой синдром',
    subtitle: 'Приоритет немедленной реперфузии и первичного ЧКВ.',
  },
  {
    id: 'nstemi',
    title: 'NSTEMI: инфаркт без подъёма ST',
    subtitle: 'Высокий риск — ранняя инвазивная тактика, оценка риска.',
  },
  {
    id: 'ua',
    title: 'Нестабильная стенокардия',
    subtitle:
      'Схожий подход с NSTEMI, но без критериев инфаркта; акцент на стратификации риска.',
  },
];

// разделы внутри гайда ОКС (слева навигация)
const ACS_SECTIONS: GuideSection[] = [
  { id: 'definition', label: 'Определение и классификация' },
  { id: 'diagnostics', label: 'Диагностика и стратификация риска' },
  { id: 'initial-therapy', label: 'Начальная терапия и антикоагуляция' },
  { id: 'reperfusion', label: 'Реперфузионная и инвазивная стратегия' },
  { id: 'secondary-prevention', label: 'Вторичная профилактика' },
];

export default function GuidesPage() {
  const [selectedSpecialtyId, setSelectedSpecialtyId] =
    useState<SpecialtyId>('cardiology');
  const [selectedNosologyId, setSelectedNosologyId] =
    useState<CardioNosologyId>('acs');

  const isCardiology = selectedSpecialtyId === 'cardiology';
  const isACS = isCardiology && selectedNosologyId === 'acs';

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScenarioClick = (scenarioId: AcsScenario['id']) => {
    const el = document.getElementById(`scenario-${scenarioId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="bg-[#fcfcee] min-h-screen">
      {/* ----- БЛОК АФОРИЗМА (как на главной) ----- */}
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

            {/* Справа — специальность и нозология */}
            <div className="flex-1 flex justify-end">
              <div className="flex flex-col items-end gap-2">
                {/* Специальность */}
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f]">
                    Специальность
                  </span>
                  <select
                    value={selectedSpecialtyId}
                    onChange={(e) =>
                      setSelectedSpecialtyId(e.target.value as SpecialtyId)
                    }
                    className="min-w-[210px] rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52]"
                  >
                    {SPECIALTIES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Нозология — только для кардиологии пока */}
                {isCardiology && (
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f]">
                      Нозология
                    </span>
                    <select
                      value={selectedNosologyId}
                      onChange={(e) =>
                        setSelectedNosologyId(
                          e.target.value as CardioNosologyId,
                        )
                      }
                      className="min-w-[260px] rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52]"
                    >
                      {CARDIOLOGY_GROUPS.map((group) => (
                        <optgroup key={group.label} label={group.label}>
                          {group.items.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.label}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----- СОДЕРЖИМОЕ ГАЙДА ----- */}
      {isACS ? (
        <section className="max-w-[1360px] mx-auto px-4 pt-10 pb-16">
          {/* Заголовок ОКС */}
          <header className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#2b2115] mb-3">
              Острый коронарный синдром (ОКС)
            </h1>
            <p className="text-[15px] md:text-base text-[#4b3b2f] leading-relaxed">
              ОКС объединяет STEMI, NSTEMI и нестабильную стенокардию и
              представляет клиническую ситуацию с острым ишемическим
              повреждением миокарда. Ниже — ключевые клинические сценарии, из
              которых можно перейти к соответствующим разделам гайда.
            </p>
          </header>

          {/* Три карточки сценариев в ОДНОЙ строке (на мобиле — столбцом) */}
          <div className="mb-10 flex flex-col md:flex-row justify-center gap-4">
            {ACS_SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                type="button"
                onClick={() => handleScenarioClick(scenario.id)}
                className="flex-1 min-w-[220px] rounded-3xl border border-[#e0d7c8] bg-white/80 px-6 py-4 text-left shadow-sm hover:shadow-md hover:border-[#015d52]/40 transition-all"
              >
                <h3 className="text-[15px] md:text-base font-semibold text-[#2b2115] mb-1.5">
                  {scenario.title}
                </h3>
                <p className="text-xs md:text-sm text-[#4b3b2f]">
                  {scenario.subtitle}
                </p>
              </button>
            ))}
          </div>

          {/* Основной макет гайда: слева Scientia + разделы, справа текст */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* ЛЕВАЯ КОЛОНКА */}
            <aside className="lg:w-72 lg:flex-none">
              {/* Scientia MedRadix — отдельный яркий блок */}
              <div className="mb-6 rounded-2xl border border-[#015d52]/20 bg-[#015d52]/8 px-4 py-3">
                <h3 className="text-sm font-semibold text-[#015d52] mb-1">
                  Scientia MedRadix: отличия EU / US
                </h3>
                <p className="text-xs text-[#3b342d] leading-relaxed">
                  Сводка ключевых различий между европейскими (ESC) и
                  американскими (ACC/AHA) рекомендациями по ОКС: подходы к
                  стратификации риска, выбору реперфузионной стратегии и
                  вторичной профилактики.{' '}
                  <span className="italic text-[#6b6258]">
                    Точный текст здесь должен быть заполнен по исходным
                    гайдлайнам с указанием ссылок.
                  </span>
                </p>
              </div>

              {/* Навигация по разделам гайда */}
              <nav className="space-y-2 text-sm">
                {ACS_SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => handleScrollToSection(section.id)}
                    className="w-full rounded-xl border border-transparent bg-transparent px-3 py-2 text-left text-[#4b3b2f] hover:border-[#015d52]/30 hover:bg-white/70 hover:text-[#015d52] transition-colors"
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </aside>

            {/* ПРАВАЯ КОЛОНКА — СОДЕРЖИМОЕ ГАЙДА */}
            <article className="flex-1 space-y-10 text-[15px] leading-relaxed text-[#2b2115]">
              {/* Определение и классификация */}
              <section id="definition" className="scroll-mt-28">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  Определение и классификация
                </h2>
                <p className="mb-3">
                  ОКС — это спектр состояний, обусловленных острым несоответствием
                  между потребностью миокарда в кислороде и коронарным кровотоком.
                  Включает:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>STEMI — инфаркт миокарда с подъёмом сегмента ST.</li>
                  <li>
                    NSTEMI — инфаркт миокарда без подъёма ST при наличии
                    повышения маркеров некроза.
                  </li>
                  <li>
                    Нестабильная стенокардия — клиника ишемии без признаков
                    некроза миокарда.
                  </li>
                </ul>
                <p className="mt-3 text-xs text-[#6b6258]">
                  Здесь должны быть приведены выдержки и ссылки на актуальные ESC
                  и ACC/AHA гайдлайны с указанием классов рекомендаций и уровней
                  доказательности.
                </p>
              </section>

              {/* Диагностика и стратификация риска */}
              <section id="diagnostics" className="scroll-mt-28">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  Диагностика и стратификация риска
                </h2>
                <p className="mb-3">
                  Диагноз ОКС основывается на сочетании клинической картины,
                  ЭКГ-признаков ишемии/инфаркта и динамики высокочувствительного
                  тропонина. Для оценки краткосрочного риска используются шкалы
                  (например, GRACE, TIMI).
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Серийная регистрация ЭКГ и тропонина.</li>
                  <li>Исключение альтернативных причин боли в груди.</li>
                  <li>
                    Стратификация риска для выбора инвазивной тактики (ранняя
                    / отсроченная / консервативная).
                  </li>
                </ul>
                <p className="mt-3 text-xs text-[#6b6258]">
                  Здесь можно добавить таблицу с порогами тропонина и шкалами
                  риска с указанием источников.
                </p>
              </section>

              {/* Начальная терапия */}
              <section id="initial-therapy" className="scroll-mt-28">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  Начальная терапия и антикоагуляция
                </h2>
                <p className="mb-3">
                  Стандартный подход включает анальгезию, кислород при гипоксемии,
                  антиагрегантную терапию и парентеральные антикоагулянты. Точный
                  выбор препарата и дозы зависит от сценария ОКС, планируемой
                  стратегии реперфузии и риска кровотечений.
                </p>
                <p className="mt-3 text-xs text-[#6b6258]">
                  В реальном гайде здесь должны быть конкретные схемы и таблицы:
                  класс I/II рекомендаций и уровни доказательности A–C.
                </p>
              </section>

              {/* Реперфузия и инвазивная стратегия + якоря сценариев */}
              <section id="reperfusion" className="scroll-mt-28">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  Реперфузионная и инвазивная стратегия
                </h2>
                <p className="mb-4">
                  Выбор стратегии зависит от наличия подъёма ST, времени от начала
                  симптомов, доступности ЧКВ-центра и клинической нестабильности.
                </p>

                {/* Подраздел для STEMI */}
                <div id="scenario-stemi" className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    STEMI: подъём ST и типичный болевой синдром
                  </h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Приоритет — первичное ЧКВ в течение рекомендованного окна.</li>
                    <li>
                      Если ЧКВ недоступно в срок, рассматривается фибринолиз с
                      последующей ранней коронарографией.
                    </li>
                    <li>
                      Интенсивная антитромботическая терапия с учётом риска
                      кровотечения.
                    </li>
                  </ul>
                </div>

                {/* Подраздел для NSTEMI */}
                <div id="scenario-nstemi" className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    NSTEMI: инфаркт без подъёма ST
                  </h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Ранняя инвазивная стратегия у пациентов высокого риска
                      (по GRACE, динамике тропонина, ЭКГ-изменениям).
                    </li>
                    <li>
                      У умеренного/низкого риска — отсроченная инвазивная или
                      консервативная тактика.
                    </li>
                  </ul>
                </div>

                {/* Подраздел для UA */}
                <div id="scenario-ua" className="mb-2">
                  <h3 className="text-lg font-semibold mb-2">
                    Нестабильная стенокардия
                  </h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Клиника ишемии при отсутствии повреждения миокарда по
                      тропонину.
                    </li>
                    <li>
                      Тактика схожа с NSTEMI, но с акцентом на уточнение
                      диагноза и стратификацию риска.
                    </li>
                  </ul>
                </div>

                <p className="mt-3 text-xs text-[#6b6258]">
                  Все конкретные пороговые значения и тайминги нужно будет
                  перенести из ESC/ACC/AHA с точными ссылками.
                </p>
              </section>

              {/* Вторичная профилактика */}
              <section id="secondary-prevention" className="scroll-mt-28">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  Вторичная профилактика
                </h2>
                <ul className="list-disc pl-6 space-y-1 mb-3">
                  <li>Модификация факторов риска (курение, АД, липиды, сахар).</li>
                  <li>
                    Длительная антитромбоцитарная терапия с учётом риска
                    ишемии и кровотечений.
                  </li>
                  <li>
                    Реабилитация, физическая активность, приверженность терапии.
                  </li>
                </ul>
                <p className="text-xs text-[#6b6258]">
                  Здесь можно сделать отдельную таблицу по длительности ДАТТ в
                  разных сценариях (стенты, CABG, высокий риск кровотечений) с
                  указанием ссылок.
                </p>
              </section>
            </article>
          </div>

          {/* Контакт внизу страницы гайда */}
          <div className="mt-12 text-center text-sm text-[#4b3b2f]">
            support@medradix.info
          </div>
        </section>
      ) : (
        // Если выбрана другая нозология / спец — просто заглушка
        <section className="max-w-[1360px] mx-auto px-4 pt-10 pb-16">
          <p className="text-center text-sm text-[#4b3b2f]">
            Выберите нозологию, для которой будет отображён соответствующий
            гайд.
          </p>
          <div className="mt-12 text-center text-sm text-[#4b3b2f]">
            support@medradix.info
          </div>
        </section>
      )}
    </main>
  );
}

