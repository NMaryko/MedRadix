'use client';

import { useState } from 'react';

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

// ТОТ ЖЕ СПИСОК СПЕЦИАЛЬНОСТЕЙ, ЧТО И НА ГЛАВНОЙ
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

// СИСТЕМНЫЙ СПИСОК НОЗОЛОГИЙ ПО КАРДИОЛОГИИ
const CARDIOLOGY_GROUPS: NosologyGroup[] = [
  {
    label: 'Ишемическая болезнь сердца',
    items: [
      { id: 'acs', label: 'Острый коронарный синдром (ОКС)' },
      { id: 'stable-chd', label: 'Стабильная ишемическая болезнь сердца' },
    ],
  },
  {
    label: 'Артериальная гипертензия',
    items: [{ id: 'htn', label: 'Артериальная (эссенциальная) гипертензия' }],
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
      { id: 'vt-vf', label: 'Желудочковые тахиаритмии и фибрилляция желудочков' },
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

// ТРИ ОТДЕЛЬНЫХ СЦЕНАРИЯ ОКС
const ACS_SCENARIOS: AcsScenario[] = [
  {
    id: 'stemi',
    title: 'STEMI: подъём ST и типичный болевой синдром',
    subtitle: 'Приоритет немедленной реперфузии и первичного ЧКВ.',
  },
  {
    id: 'nstemi',
    title: 'NSTEMI: инфаркт без подъёма ST',
    subtitle: 'Ранняя инвазивная стратегия при высоком риске по шкале GRACE.',
  },
  {
    id: 'ua',
    title: 'Нестабильная стенокардия',
    subtitle:
      'Ишемия без некроза миокарда; тактика схожа с NSTEMI с акцентом на стратификацию риска.',
  },
];

const ACS_SECTIONS: GuideSection[] = [
  { id: 'definition', label: 'Определение и классификация' },
  { id: 'diagnostics', label: 'Диагностика и стратификация риска' },
  { id: 'initial-therapy', label: 'Начальная терапия и антикоагуляция' },
  { id: 'reperfusion', label: 'Реперфузионная и инвазивная стратегия' },
  { id: 'secondary-prevention', label: 'Вторичная профилактика' },
];

export default function GuidesPage() {
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<string>('Кардиология');
  const [selectedNosologyId, setSelectedNosologyId] =
    useState<CardioNosologyId>('acs');
  const [scientiaOpen, setScientiaOpen] = useState<boolean>(false);

  const isCardiology = selectedSpecialty === 'Кардиология';
  const isACS = isCardiology && selectedNosologyId === 'acs';

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="bg-[#fcfcee] min-h-screen">
      {/* АФОРИЗМ + ФИЛЬТРЫ (как на главной) */}
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

            {/* Фильтры справа */}
            <div className="flex-1 flex justify-end">
              <div className="flex flex-col items-end gap-2">
                {/* Специальность */}
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f]">
                    Специальность
                  </span>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="min-w-[210px] rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52]"
                  >
                    {SPECIALTIES.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Нозология — только если выбрана Кардиология */}
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

      {/* СОДЕРЖИМОЕ ГАЙДА */}
      {isACS ? (
        <section className="max-w-[1360px] mx-auto px-4 pt-10 pb-16">
          {/* Заголовок ОКС */}
          <header className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#2b2115] mb-3">
              Острый коронарный синдром (ОКС)
            </h1>
            <p className="text-[15px] md:text-base text-[#4b3b2f] leading-relaxed">
              ОКС объединяет STEMI, NSTEMI и нестабильную стенокардию и описывает
              острое ишемическое повреждение миокарда. Ниже — ключевые клинические
              сценарии, которые помогают ориентироваться в структуре гайда.
            </p>
          </header>

          {/* ТРИ НЕ КЛИКАБЕЛЬНЫХ БЛОКА СЦЕНАРИЕВ */}
          <div className="mb-10 flex flex-col md:flex-row justify-center gap-4">
            {ACS_SCENARIOS.map((scenario) => (
              <div
                key={scenario.id}
                className="flex-1 min-w-[220px] rounded-3xl border border-[#e0d7c8] bg-white/80 px-6 py-4 text-left shadow-sm"
              >
                <h3 className="text-[15px] md:text-base font-semibold text-[#2b2115] mb-1.5">
                  {scenario.title}
                </h3>
                <p className="text-xs md:text-sm text-[#4b3b2f]">
                  {scenario.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* ДВЕ КОЛОНКИ: слева Scientia + разделы, справа текст */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* ЛЕВАЯ КОЛОНКА */}
            <aside className="lg:w-72 lg:flex-none">
              {/* Scientia MedRadix — КОРОТКОЕ ОПИСАНИЕ + РАСКРЫВАЕМЫЙ КОНТЕНТ */}
              <button
                type="button"
                onClick={() => setScientiaOpen((v) => !v)}
                className="w-full text-left mb-6 rounded-2xl border border-[#015d52]/25 bg-[#015d52]/6 px-4 py-3 hover:bg-[#015d52]/10 transition-colors"
              >
                <h3 className="text-sm font-semibold text-[#015d52] mb-1">
                  Scientia MedRadix: отличия EU / US
                </h3>
                <p className="text-xs text-[#3b342d] leading-relaxed">
                  Сводка ключевых различий между европейскими (ESC) и
                  американскими (ACC/AHA) рекомендациями по ОКС с прямыми
                  ссылками на исходные документы.
                </p>
              </button>

              {scientiaOpen && (
                <div className="mb-6 rounded-2xl border border-[#e0d7c8] bg-white/90 px-4 py-3 text-xs text-[#2b2115] leading-relaxed">
                  <p className="mb-2 font-semibold">
                    Примеры различий ESC vs ACC/AHA при ОКС:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-2">
                    <li>
                      Различия в деталях тайминга первичного ЧКВ и
                      фибринолизиса (окна времени &laquo;door-to-balloon&raquo; и
                      &laquo;door-to-needle&raquo;).
                    </li>
                    <li>
                      Подход к длительности двойной антиагрегантной терапии (ДАТТ)
                      при высоком риске кровотечений.
                    </li>
                    <li>
                      Различные акценты в использовании шкал риска (GRACE,
                      TIMI и др.) при выборе инвазивной стратегии.
                    </li>
                  </ul>
                  <p className="mb-1">
                    При заполнении этого блока нужно будет сослаться на
                    конкретные документы (например, последние ESC Guidelines по
                    ОКС и соответствующие ACC/AHA guidelines) и оформить их в
                    виде таблицы/списка с классами рекомендаций и уровнями
                    доказательности.
                  </p>
                </div>
              )}

              {/* Навигация по разделам */}
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

            {/* ПРАВАЯ КОЛОНКА — ТЕКСТ ГАЙДА */}
            <article className="flex-1 space-y-10 text-[15px] leading-relaxed text-[#2b2115]">
              {/* Определение и классификация */}
              <section id="definition" className="scroll-mt-28">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  Определение и классификация
                </h2>
                <p className="mb-3">
                  ОКС — это остро возникшая или усилившаяся ишемия миокарда,
                  обусловленная несоответствием между потребностью в кислороде и
                  коронарным кровотоком. В большинстве случаев причиной является
                  разрыв или эрозия атеросклеротической бляшки с тромбозом
                  коронарной артерии.
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-3">
                  <li>
                    <strong>STEMI</strong> — инфаркт миокарда с подъёмом ST и
                    формированием патологического зубца Q.
                  </li>
                  <li>
                    <strong>NSTEMI</strong> — инфаркт без подъёма ST при наличии
                    повышения/падения высокочувствительного тропонина.
                  </li>
                  <li>
                    <strong>Нестабильная стенокардия</strong> — ишемия миокарда
                    без некроза (тропонин в референсных пределах).
                  </li>
                </ul>
              </section>

              {/* Диагностика и стратификация риска */}
              <section id="diagnostics" className="scroll-mt-28">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  Диагностика и стратификация риска
                </h2>
                <p className="mb-3">
                  Диагностический алгоритм основан на совокупности клиники,
                  ЭКГ-изменений и динамики высокочувствительного тропонина.
                  Используются серийные измерения и быстрые протоколы (0–1 ч,
                  0–2 ч) в соответствии с валидированными алгоритмами.
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-3">
                  <li>
                    Повторные ЭКГ при сохранении симптомов или изменении
                    состояния.
                  </li>
                  <li>
                    Стратификация риска по шкале{' '}
                    <strong>GRACE</strong> (госпитальная/6-месячная смертность) и
                    <strong> TIMI</strong>.
                  </li>
                  <li>
                    Использование эхокардиографии, коронарографии, КТ-ангиографии
                    в зависимости от клинической ситуации.
                  </li>
                </ul>
              </section>

              {/* Начальная терапия и антикоагуляция */}
              <section id="initial-therapy" className="scroll-mt-28">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  Начальная терапия и антикоагуляция
                </h2>
                <p className="mb-3">
                  Базовый подход включает купирование боли, коррекцию
                  гемодинамики, назначение антиагрегантов и парентеральных
                  антикоагулянтов с учётом риска кровотечения.
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-3">
                  <li>
                    Нагрузочная доза ацетилсалициловой кислоты + ингибитор P2Y12.
                  </li>
                  <li>
                    Выбор между нефракционированным гепарином, эноксапарином,
                    фондопаринуксом и др. в зависимости от сценария и стратегии
                    реперфузии.
                  </li>
                  <li>
                    Коррекция терапии при наличии показаний к пероральным
                    антикоагулянтам (ФП, протезированные клапаны и т.п.).
                  </li>
                </ul>
              </section>

              {/* Реперфузионная и инвазивная стратегия */}
              <section id="reperfusion" className="scroll-mt-28">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  Реперфузионная и инвазивная стратегия
                </h2>
                <p className="mb-4">
                  Стратегия определяется наличием подъёма ST, сроками от начала
                  симптомов, доступностью ЧКВ-центра и общим риском пациента.
                </p>

                {/* STEMI */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    STEMI: приоритет немедленной реперфузии
                  </h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Первичное ЧКВ в максимально короткие сроки.</li>
                    <li>
                      При недоступности ЧКВ — фибринолиз с последующей
                      коронарографией.
                    </li>
                    <li>
                      Выбор стентов и ДАТТ с учётом риска кровотечений и
                      сопутствующей патологии.
                    </li>
                  </ul>
                </div>

                {/* NSTEMI */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    NSTEMI: ранняя инвазивная тактика при высоком риске
                  </h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Высокий риск по GRACE / динамике тропонина — ранняя
                      коронарография.
                    </li>
                    <li>
                      У умеренного/низкого риска — отсроченная инвазивная или
                      консервативная стратегия.
                    </li>
                    <li>
                      Роль КТ-ангиографии при низкой вероятности ИБС и
                      неинтерпретируемой ЭКГ.
                    </li>
                  </ul>
                </div>

                {/* Нестабильная стенокардия */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Нестабильная стенокардия
                  </h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Клиника ишемии при нормальном тропонине, часто с
                      динамикой ЭКГ.
                    </li>
                    <li>
                      Тактика близка к NSTEMI: стратификация риска, рассмотрение
                      ранней коронарографии.
                    </li>
                    <li>
                      Обязательное исключение альтернативных причин боли в
                      груди.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Вторичная профилактика */}
              <section id="secondary-prevention" className="scroll-mt-28">
                <h2 className="text-xl md:text-2xl font-semibold mb-3">
                  Вторичная профилактика
                </h2>
                <ul className="list-disc pl-6 space-y-1 mb-3">
                  <li>Контроль факторов риска: АД, липиды, гликемия, курение.</li>
                  <li>
                    Оптимальная длительность ДАТТ в зависимости от стента, риска
                    ишемии и кровотечения.
                  </li>
                  <li>
                    Рекомендации по физической активности, кардиореабилитация,
                    обучение пациента.
                  </li>
                </ul>
              </section>
            </article>
          </div>

          <div className="mt-12 text-center text-sm text-[#4b3b2f]">
            support@medradix.info
          </div>
        </section>
      ) : (
        <section className="max-w-[1360px] mx-auto px-4 pt-10 pb-16">
          <p className="text-center text-sm text-[#4b3b2f]">
            Для выбранной нозологии структура гайда будет настроена отдельно.
          </p>
          <div className="mt-12 text-center text-sm text-[#4b3b2f]">
            support@medradix.info
          </div>
        </section>
      )}
    </main>
  );
}

