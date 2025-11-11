// @ts-nocheck
'use client';

import { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

// ТЕ ЖЕ СПЕЦИАЛЬНОСТИ, ЧТО И НА ГЛАВНОЙ
const SPECIALTIES = [
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

// УПОРЯДОЧЕННЫЙ СПИСОК НОЗОЛОГИЙ ДЛЯ КАРДИОЛОГИИ
const CARDIO_NOSOLOGIES = [
  { id: 'acs', label: 'Острый коронарный синдром (ОКС)' },
  { id: 'chronic-ihd', label: 'Хроническая ишемическая болезнь сердца' },
  { id: 'stable-angina', label: 'Стабильная стенокардия' },
  { id: 'af', label: 'Фибрилляция предсердий' },
  { id: 'other-arrhythmias', label: 'Нарушения ритма и проводимости' },
  { id: 'hf', label: 'Хроническая сердечная недостаточность' },
  { id: 'htn', label: 'Артериальная гипертензия' },
  { id: 'valvular', label: 'Поражения клапанов сердца' },
  { id: 'congenital', label: 'Врожденные пороки сердца у взрослых' },
  { id: 'cardiomyopathies', label: 'Кардиомиопатии' },
  { id: 'myocarditis', label: 'Миокардиты' },
  { id: 'pericarditis', label: 'Перикардиты' },
  { id: 'post-mi', label: 'Постинфарктный период' },
  { id: 'pah', label: 'Легочная гипертензия' },
  { id: 'pe', label: 'Тромбоэмболия легочной артерии (ТЭЛА)' },
];

// КЛИНИЧЕСКИЕ СЦЕНАРИИ ОКС
const ACS_SCENARIOS = [
  {
    id: 'stemi',
    title: 'STEMI: подъём ST и типичный болевой синдром',
    subtitle: 'Приоритет немедленной реперфузии и первичного ЧКВ.',
  },
  {
    id: 'nstemi',
    title: 'NSTEMI / нестабильная стенокардия',
    subtitle: 'Повышенный риск — ранняя инвазивная стратегия у приоритетных групп.',
  },
  {
    id: 'suspected-acs',
    title: 'Подозрение на ОКС без явных изменений',
    subtitle: 'Наблюдение, серийные тропонины, оценка риска и дообследование.',
  },
];

// РАЗДЕЛЫ ВНУТРИ ГАЙДА
const ACS_SECTIONS = [
  { id: 'definition', label: 'Определение и классификация' },
  { id: 'diagnostics', label: 'Диагностика' },
  { id: 'risk', label: 'Стратификация риска' },
  { id: 'treatment', label: 'Стратегии лечения и реперфузии' },
  { id: 'pharmacotherapy', label: 'Медикаментозная терапия' },
  { id: 'secondary-prevention', label: 'Вторичная профилактика и реабилитация' },
  { id: 'scientia', label: 'Scientia MedRadix: отличия EU / US' },
];

export default function GuidesPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('Кардиология');
  const [selectedNosology, setSelectedNosology] = useState('acs');

  const isCardiology = selectedSpecialty === 'Кардиология';
  const isACS = isCardiology && selectedNosology === 'acs';

  const handleScenarioClick = (scenarioId) => {
    const el = document.getElementById(`scenario-${scenarioId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSectionClick = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="bg-[#fcfcee] min-h-screen">
      {/* БЛОК АФОРИЗМА КАК НА ГЛАВНОЙ */}
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

            {/* Специальность + нозология справа, одна колонка */}
            <div className="flex-1 flex justify-end">
              <div className="flex flex-col items-end gap-2">
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f]">
                    Специальность
                  </span>
                  <div className="relative">
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedSpecialty(value);
                        if (value !== 'Кардиология') {
                          setSelectedNosology('');
                        } else if (!selectedNosology) {
                          setSelectedNosology('acs');
                        }
                      }}
                      className="min-w-[220px] appearance-none rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52]"
                    >
                      {SPECIALTIES.map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9c978f]" />
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f]">
                    Нозология
                  </span>
                  <div className="relative">
                    <select
                      value={selectedNosology}
                      onChange={(e) => setSelectedNosology(e.target.value)}
                      disabled={!isCardiology}
                      className="min-w-[260px] appearance-none rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52] disabled:bg-gray-100 disabled:text-gray-400"
                    >
                      {CARDIO_NOSOLOGIES.map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9c978f]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ЕСЛИ ЕЩЁ НЕ КАРДИОЛОГИЯ / НЕ РЕАЛИЗОВАНО */}
      {!isACS && (
        <section className="max-w-[1360px] mx-auto px-4 pt-10 pb-16 text-center text-[#4b3b2f]">
          {isCardiology ? (
            <p className="text-base md:text-lg">
              Для выбранной нозологии подробный гайд ещё в работе. Сейчас реализован пример
              структуры для&nbsp;
              <span className="font-semibold">«Острого коронарного синдрома (ОКС)»</span>.
            </p>
          ) : (
            <p className="text-base md:text-lg">
              Страница «Гайды» пока разрабатывается на примере кардиологии. Выберите
              специальность&nbsp;
              <span className="font-semibold">«Кардиология»</span>, чтобы увидеть структуру гайда.
            </p>
          )}
          <p className="mt-8 text-sm md:text-base text-[#6b6258]">
            По вопросам и предложениям: <span className="font-semibold">support@medradix.info</span>
          </p>
        </section>
      )}

      {/* ОСНОВНОЙ ГАЙД ПО ОКС */}
      {isACS && (
        <section className="max-w-[1360px] mx-auto px-4 pt-10 pb-20">
          {/* Заголовок + краткое введение */}
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#2b2115]">
              Острый коронарный синдром (ОКС)
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-base md:text-lg text-[#4b3b2f] leading-relaxed">
              ОКС объединяет STEMI, NSTEMI и нестабильную стенокардию и описывает клиническую
              ситуацию острого ишемического повреждения миокарда. Ниже представлены ключевые
              клинические сценарии и структурированный гайд по диагностике, стратификации риска и
              лечению ОКС.
            </p>
          </div>

          {/* ТРИ КЛИНИЧЕСКИХ СЦЕНАРИЯ В РЯД */}
          <div className="mb-12 grid gap-4 md:grid-cols-3">
            {ACS_SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                type="button"
                onClick={() => handleScenarioClick(scenario.id)}
                className="group rounded-3xl border border-[#e0d8cc] bg-white/80 px-5 py-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.10)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-[#2b2115] mb-1">
                      {scenario.title}
                    </h3>
                    <p className="text-sm md:text-[15px] text-[#5a5045] leading-relaxed">
                      {scenario.subtitle}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 text-[#015d52] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </div>
              </button>
            ))}
          </div>

          {/* ЛЕВАЯ КОЛОНКА + ОСНОВНОЙ ТЕКСТ */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-10">
            {/* СЛЕВА: Scientia MedRadix + разделы */}
            <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
              {/* Яркий блок Scientia */}
              <div
                className="cursor-pointer rounded-3xl bg-gradient-to-br from-[#015d52] to-[#023f3a] px-5 py-4 text-white shadow-[0_14px_35px_rgba(0,0,0,0.25)]"
                onClick={() => handleSectionClick('scientia')}
              >
                <div className="text-xs uppercase tracking-[0.22em] opacity-80 mb-1">
                  Scientia MedRadix
                </div>
                <div className="font-semibold text-[15px] md:text-base">
                  Отличия рекомендаций EU / US при ОКС
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-[#e3f4f1]">
                  Сводка ключевых различий между европейскими и американскими рекомендациями:
                  сроки и стратегия инвазивного подхода, уровни доказательности и нюансы
                  антитромботической терапии.
                </p>
              </div>

              {/* Список разделов гайда */}
              <nav className="space-y-2">
                {ACS_SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => handleSectionClick(section.id)}
                    className="w-full text-left rounded-xl px-4 py-2 text-[15px] md:text-base font-semibold text-[#3b2b22] hover:bg-[#f3ebe1] hover:text-[#015d52] transition-colors"
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </aside>

            {/* СПРАВА: СОДЕРЖАНИЕ ГАЙДА */}
            <div className="flex-1 space-y-10 text-[#3b342d]">
              {/* СЦЕНАРИЙ 1 */}
              <section id="scenario-stemi" className="scroll-mt-28">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  Клинический сценарий: STEMI
                </h2>
                <p className="text-base md:text-lg leading-relaxed mb-3">
                  STEMI — это ОКС с подъёмом сегмента ST или вновь возникшим блоком левой ножки
                  пучка Гиса на фоне типичного ишемического болевого синдрома и повышения
                  кардиоспецифических биомаркеров. Основная цель — максимально быстро восстановить
                  коронарный кровоток.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/80 border border-[#e0d8cc] px-5 py-4 shadow-sm">
                    <h3 className="font-semibold mb-2 text-[15px]">
                      Первичная оценка и стабилизация
                    </h3>
                    <ul className="list-disc pl-5 text-sm md:text-[15px] space-y-1.5">
                      <li>Мониторирование ЭКГ, сатурации и артериального давления.</li>
                      <li>Обеспечение венозного доступа, кислород при выраженной гипоксемии.</li>
                      <li>Купирование боли (нитраты, опиоиды при необходимости).</li>
                      <li>Оценка гемодинамики и признаков острой сердечной недостаточности.</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-white/80 border border-[#e0d8cc] px-5 py-4 shadow-sm">
                    <h3 className="font-semibold mb-2 text-[15px]">
                      Реперфузионная стратегия
                    </h3>
                    <ul className="list-disc pl-5 text-sm md:text-[15px] space-y-1.5">
                      <li>Предпочтение первичному ЧКВ при доступности в рекомендованные сроки.</li>
                      <li>
                        Тромболитическая терапия при невозможности своевременного ЧКВ, с последующей
                        оценкой эффективности и рассмотрением спасительной ангиопластики.
                      </li>
                      <li>Ранняя стратификация риска осложнений и план последующего вмешательства.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* СЦЕНАРИЙ 2 */}
              <section id="scenario-nstemi" className="scroll-mt-28">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  Клинический сценарий: NSTEMI / нестабильная стенокардия
                </h2>
                <p className="text-base md:text-lg leading-relaxed mb-3">
                  NSTEMI и нестабильная стенокардия характеризуются отсутствием стойкого подъёма ST
                  и вариабельной динамикой тропонина. Ключевые задачи — подтвердить наличие
                  миокардиального повреждения, оценить риск и определить необходимость раннего
                  инвазивного подхода.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/80 border border-[#e0d8cc] px-5 py-4 shadow-sm">
                    <h3 className="font-semibold mb-2 text-[15px]">
                      Диагностический алгоритм
                    </h3>
                    <ul className="list-disc pl-5 text-sm md:text-[15px] space-y-1.5">
                      <li>Серийные ЭКГ и высокочувствительные тропонины.</li>
                      <li>Оценка клинического риска (GRACE, TIMI) и гемодинамики.</li>
                      <li>Исключение альтернативных причин симптомов и повышения тропонина.</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-white/80 border border-[#e0d8cc] px-5 py-4 shadow-sm">
                    <h3 className="font-semibold mb-2 text-[15px]">
                      Инвазивная стратегия
                    </h3>
                    <ul className="list-disc pl-5 text-sm md:text-[15px] space-y-1.5">
                      <li>Немедленная коронарография при признаках крайне высокого риска.</li>
                      <li>Ранняя (в течение ближайших суток) инвазивная тактика при высоком риске.</li>
                      <li>Отсроченный инвазивный или консервативный подход при низком риске.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* СЦЕНАРИЙ 3 */}
              <section id="scenario-suspected-acs" className="scroll-mt-28">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  Клинический сценарий: подозрение на ОКС без явных изменений
                </h2>
                <p className="text-base md:text-lg leading-relaxed mb-3">
                  У части пациентов клиническая картина и факторы риска заставляют думать об ОКС,
                  но ЭКГ и маркеры на момент обращения могут быть неопределёнными. Важно обеспечить
                  безопасное наблюдение, минимизируя риск пропуска инфаркта.
                </p>
                <div className="rounded-2xl bg-white/80 border border-[#e0d8cc] px-5 py-4 shadow-sm">
                  <h3 className="font-semibold mb-2 text-[15px]">
                    Наблюдение и дообследование
                  </h3>
                  <ul className="list-disc pl-5 text-sm md:text-[15px] space-y-1.5">
                    <li>Серийные ЭКГ и высокочувствительные тропонины по ускоренным протоколам.</li>
                    <li>Оценка клинического риска с решением о госпитализации в профильное отделение.</li>
                    <li>
                      Стресс-тестирование или неинвазивная визуализация (КТ-ангиография, стресс-Эхо)
                      при исключении инфаркта.
                    </li>
                  </ul>
                </div>
              </section>

              {/* ОСНОВНЫЕ РАЗДЕЛЫ ГАЙДА */}

              <section id="definition" className="scroll-mt-28">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  Определение и классификация
                </h2>
                <p className="text-base md:text-lg leading-relaxed mb-3">
                  ОКС — это клинико-биохимический синдром, отражающий острое несоответствие между
                  потребностью миокарда в кислороде и коронарным кровотоком, приводящее к
                  ишемическому повреждению. Выделяют ОКС с подъёмом ST (STEMI) и без подъёма
                  ST (NSTEMI / нестабильная стенокардия), что определяет дальнейшую тактику
                  реперфузии.
                </p>
                <p className="text-sm md:text-[15px] leading-relaxed text-[#5a5045]">
                  Ключевой критерий инфаркта миокарда — повышение и/или снижение кардиального
                  тропонина с хотя бы одним значением выше верхней границы нормы в сочетании с
                  клиническими, ЭКГ- или визуализационными признаками ишемии.
                </p>
              </section>

              <section id="diagnostics" className="scroll-mt-28">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">Диагностика</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/80 border border-[#e0d8cc] px-5 py-4 shadow-sm">
                    <h3 className="font-semibold mb-2 text-[15px]">
                      Клиническая картина и ЭКГ
                    </h3>
                    <ul className="list-disc pl-5 text-sm md:text-[15px] space-y-1.5">
                      <li>Стандартное описание болевого синдрома (локализация, длительность, связь с нагрузкой).</li>
                      <li>Оценка сопутствующих симптомов: одышка, вегетативные проявления, коллапс.</li>
                      <li>12-канальное ЭКГ в первые минуты обращения, при необходимости расширенные отведения.</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-white/80 border border-[#e0d8cc] px-5 py-4 shadow-sm">
                    <h3 className="font-semibold mb-2 text-[15px]">
                      Биомаркеры и визуализация
                    </h3>
                    <ul className="list-disc pl-5 text-sm md:text-[15px] space-y-1.5">
                      <li>Высокочувствительные тропонины по стандартным или ускоренным протоколам.</li>
                      <li>ЭхоКГ для оценки локальных нарушений сократимости и осложнений.</li>
                      <li>При необходимости — КТ-ангиография или другие методы визуализации.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="risk" className="scroll-mt-28">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  Стратификация риска
                </h2>
                <p className="text-base md:text-lg leading-relaxed mb-3">
                  Стратификация риска позволяет определить необходимость немедленного вмешательства
                  и интенсивность наблюдения. Используются шкалы GRACE, TIMI и другие, учитывающие
                  возраст, гемодинамику, тропонины, ЭКГ и сопутствующие состояния.
                </p>
                <div className="rounded-2xl bg-white/80 border border-[#e0d8cc] px-5 py-4 shadow-sm">
                  <h3 className="font-semibold mb-2 text-[15px]">
                    Примеры категорий риска
                  </h3>
                  <ul className="list-disc pl-5 text-sm md:text-[15px] space-y-1.5">
                    <li>Крайне высокий риск — показания к немедленной инвазивной стратегии.</li>
                    <li>Высокий риск — ранняя коронарография в ближайшие сутки.</li>
                    <li>Промежуточный и низкий риск — индивидуализированный подход к инвазивной тактике и наблюдению.</li>
                  </ul>
                </div>
              </section>

              <section id="treatment" className="scroll-mt-28">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  Стратегии лечения и реперфузии
                </h2>
                <p className="text-base md:text-lg leading-relaxed mb-3">
                  Тактика лечения определяется типом ОКС, временем от начала симптомов, доступностью
                  ЧКВ и клиническим риском. Для STEMI приоритет — как можно более ранняя реперфузия.
                  Для NSTEMI/нестабильной стенокардии акцент делается на стратификации риска и
                  выборе времени инвазивного вмешательства.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/80 border border-[#e0d8cc] px-5 py-4 shadow-sm">
                    <h3 className="font-semibold mb-2 text-[15px]">STEMI</h3>
                    <ul className="list-disc pl-5 text-sm md:text-[15px] space-y-1.5">
                      <li>Первичное ЧКВ в приоритетные сроки при доступности опытного центра.</li>
                      <li>Фибринолитическая терапия при отсутствии возможности ЧКВ в рекомендуемые интервалы.</li>
                      <li>Оценка успеха реперфузии и необходимость спасительного ЧКВ.</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-white/80 border border-[#e0d8cc] px-5 py-4 shadow-sm">
                    <h3 className="font-semibold mb-2 text-[15px]">NSTEMI / нестабильная стенокардия</h3>
                    <ul className="list-disc pl-5 text-sm md:text-[15px] space-y-1.5">
                      <li>Немедленная инвазивная тактика при крайне высоком риске.</li>
                      <li>Ранняя инвазивная стратегия при высоком риске согласно шкалам.</li>
                      <li>Консервативный подход с функциональной оценкой ишемии при низком риске.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="pharmacotherapy" className="scroll-mt-28">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  Медикаментозная терапия
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/80 border border-[#e0d8cc] px-5 py-4 shadow-sm">
                    <h3 className="font-semibold mb-2 text-[15px]">
                      Антитромботическая терапия
                    </h3>
                    <ul className="list-disc pl-5 text-sm md:text-[15px] space-y-1.5">
                      <li>Двойная антитромбоцитарная терапия у большинства пациентов после ЧКВ.</li>
                      <li>Выбор длительности терапии в зависимости от риска ишемии и кровотечений.</li>
                      <li>Антикоагулянты при наличии сопутствующих показаний (например, ФП).</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-white/80 border border-[#e0d8cc] px-5 py-4 shadow-sm">
                    <h3 className="font-semibold mb-2 text-[15px]">
                      Фоновая кардиопротективная терапия
                    </h3>
                    <ul className="list-disc pl-5 text-sm md:text-[15px] space-y-1.5">
                      <li>Высокие дозы статинов, затем поддерживающая терапия.</li>
                      <li>Бета-адреноблокаторы при отсутствии противопоказаний.</li>
                      <li>Ингибиторы АПФ / БРА, антагонисты минералокортикоидных рецепторов по показаниям.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="secondary-prevention" className="scroll-mt-28">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  Вторичная профилактика и реабилитация
                </h2>
                <p className="text-base md:text-lg leading-relaxed mb-3">
                  Долгосрочный прогноз после ОКС определяется не только успехом острого лечения, но
                  и качеством вторичной профилактики. Важны контроль факторов риска, приверженность
                  терапии и участие в кардиореабилитационных программах.
                </p>
                <ul className="list-disc pl-5 text-sm md:text-[15px] space-y-1.5">
                  <li>Отказ от курения и модификация образа жизни.</li>
                  <li>Контроль артериального давления, липидов и гликемии.</li>
                  <li>Постепенное расширение физической активности под контролем специалистов.</li>
                </ul>
              </section>

              <section id="scientia" className="scroll-mt-28">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  Scientia MedRadix: отличия EU / US
                </h2>
                <p className="text-base md:text-lg leading-relaxed mb-3">
                  Этот раздел предназначен для краткого сопоставления ключевых позиций европейских и
                  американских рекомендаций по ОКС. Конкретные цифры и уровни доказательности
                  необходимо сверять с оригинальными документами соответствующих обществ.
                </p>
                <div className="rounded-2xl bg-white/80 border border-[#e0d8cc] px-5 py-4 shadow-sm">
                  <ul className="list-disc pl-5 text-sm md:text-[15px] space-y-1.5">
                    <li>
                      Подход к срокам инвазивной стратегии при NSTEMI может различаться по временным
                      интервалам для категорий риска.
                    </li>
                    <li>
                      В отдельных ситуациях отличаются рекомендуемые комбинации антитромботической
                      терапии и длительность двойной антитромбоцитарной терапии.
                    </li>
                    <li>
                      Различия в терминологии и акцентах по шкалам риска и использованию некоторых
                      диагностических тестов.
                    </li>
                    <li>
                      Подход к пациентам с сопутствующими заболеваниями (например, хронической
                      почечной недостаточностью) может иметь нюансы в дозировках и выборе препаратов.
                    </li>
                  </ul>
                  <p className="mt-3 text-xs md:text-[13px] text-[#6b6258]">
                    Примечание: данный обзор носит образовательный характер и не заменяет чтение
                    полных версий рекомендаций профильных обществ.
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* НИЗ СТРАНИЦЫ */}
          <div className="mt-16 text-center text-sm md:text-base text-[#4b3b2f]">
            support@medradix.info
          </div>
        </section>
      )}
    </main>
  );
}
