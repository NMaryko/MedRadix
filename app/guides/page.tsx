// app/guides/page.tsx
'use client';

import { useState } from 'react';

type SpecialtyId = 'cardiology';

type NosologyId =
  | 'acs'
  | 'af'
  | 'chf'
  | 'htn'
  | 'stableIhd'
  | 'postMi'
  | 'pe'
  | 'tachy'
  | 'brady'
  | 'valvular'
  | 'cmp'
  | 'myocarditis'
  | 'pericarditis'
  | 'congenital';

type ScenarioId = 'stemi' | 'nstemi' | 'ua';

// --- Справочники ---

const SPECIALTIES: { id: SpecialtyId; label: string }[] = [
  { id: 'cardiology', label: 'Кардиология' },
];

const CARDIO_NOSOLOGIES: { id: NosologyId; label: string }[] = [
  { id: 'acs', label: 'Острый коронарный синдром (ОКС)' },
  { id: 'stableIhd', label: 'Стабильная ишемическая болезнь сердца' },
  { id: 'htn', label: 'Артериальная гипертензия' },
  { id: 'chf', label: 'Хроническая сердечная недостаточность' },
  { id: 'af', label: 'Фибрилляция предсердий' },
  { id: 'tachy', label: 'Тахиаритмии' },
  { id: 'brady', label: 'Брадиаритмии и блокады проведения' },
  { id: 'pe', label: 'Тромбоэмболия лёгочной артерии' },
  { id: 'postMi', label: 'Постинфарктный период' },
  { id: 'valvular', label: 'Клапанные пороки сердца' },
  { id: 'cmp', label: 'Кардиомиопатии' },
  { id: 'myocarditis', label: 'Миокардиты' },
  { id: 'pericarditis', label: 'Перикардиты' },
  { id: 'congenital', label: 'Врожденные пороки сердца у взрослых' },
];

const ACS_SCENARIOS: {
  id: ScenarioId;
  title: string;
  subtitle: string;
}[] = [
  {
    id: 'stemi',
    title: 'STEMI: подъём ST и типичный болевой синдром',
    subtitle: 'Приоритет немедленной реперфузии и первичного ЧКВ.',
  },
  {
    id: 'nstemi',
    title: 'NSTEMI: ОКС без подъёма ST',
    subtitle:
      'Повреждение миокарда по тропонину, риск-стратификация и ранняя инвазивная тактика.',
  },
  {
    id: 'ua',
    title: 'Нестабильная стенокардия',
    subtitle:
      'Ишемия без подъёма тропонина, динамика симптомов и ЭКГ, индивидуализация инвазивного подхода.',
  },
];

// --- Структура разделов гайда по ОКС ---

type GuideSectionId =
  | 'sciMed'
  | 'overview'
  | 'diagnostics'
  | 'risk'
  | 'reperfusion'
  | 'pharm'
  | 'secondary';

interface GuideSection {
  id: GuideSectionId;
  title: string;
  accent?: boolean;
}

const ACS_SECTIONS: GuideSection[] = [
  {
    id: 'sciMed',
    title: 'Scientia MedRadix: различия рекомендаций Европы и США',
    accent: true,
  },
  {
    id: 'overview',
    title: 'Общие положения и классификация ОКС',
  },
  {
    id: 'diagnostics',
    title: 'Диагностика и начальная оценка',
  },
  {
    id: 'risk',
    title: 'Риск-стратификация и выбор стратегии',
  },
  {
    id: 'reperfusion',
    title: 'Реперфузионная терапия',
  },
  {
    id: 'pharm',
    title: 'Медикаментозная терапия',
  },
  {
    id: 'secondary',
    title: 'Вторичная профилактика и наблюдение',
  },
];

// --- Компонент гайда по ОКС ---

function AcsGuide({ scenario }: { scenario: ScenarioId | null }) {
  return (
    <div className="mt-10 flex gap-10">
      {/* ЛЕВАЯ КОЛОНКА: разделы */}
      <aside className="hidden lg:block w-64 flex-none">
        <nav className="sticky top-28 space-y-2">
          {ACS_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#acs-${section.id}`}
              className={`block rounded-full px-4 py-2 text-sm transition-colors ${
                section.accent
                  ? 'bg-[#fef3c7] text-[#92400e] font-semibold hover:bg-[#fde68a]'
                  : 'text-[#4b3b2f] hover:bg-[#e5e7eb]'
              }`}
            >
              {section.title}
            </a>
          ))}
        </nav>
      </aside>

      {/* ПРАВАЯ КОЛОНКА: контент */}
      <div className="flex-1 space-y-10">
        {/* Немного контекста выбранного сценария */}
        {scenario && (
          <section className="rounded-2xl bg-[#f3f4ff] px-6 py-4 text-sm text-[#111827]">
            {scenario === 'stemi' && (
              <p>
                <span className="font-semibold">Выбран сценарий:</span> STEMI —
                подъём сегмента ST с типичным болевым синдромом. Критично
                минимизировать задержку до реперфузии: &laquo;door-to-balloon&raquo;
                ≤ 90 минут при первичном ЧКВ или &laquo;door-to-needle&raquo; ≤ 30
                минут при тромболизисе, если ЧКВ недоступно.
              </p>
            )}
            {scenario === 'nstemi' && (
              <p>
                <span className="font-semibold">Выбран сценарий:</span> NSTEMI —
                ОКС без подъёма ST с повышенными тропонинами. Точка фокуса —
                ранняя риск-стратификация (GRACE, TIMI) и выбор момента
                инвазивного вмешательства.
              </p>
            )}
            {scenario === 'ua' && (
              <p>
                <span className="font-semibold">Выбран сценарий:</span>{' '}
                Нестабильная стенокардия — ишемия без тропонинового некроза.
                Важны динамика симптомов, ЭКГ и отбор пациентов для инвазивного
                подхода.
              </p>
            )}
          </section>
        )}

        {/* Scientia MedRadix – EU/US различия */}
        <section
          id="acs-sciMed"
          className="rounded-3xl border border-[#facc15] bg-[#fffbeb] px-6 py-6 shadow-sm"
        >
          <h3 className="text-xl md:text-2xl font-semibold text-[#92400e] mb-3">
            Scientia MedRadix: различия рекомендаций Европы и США
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-[#4b3b2f]">
            <li>
              <span className="font-semibold">Стратегия реперфузии STEMI.</span>{' '}
              ESC отдает более жёсткий приоритет первичному ЧКВ и допускает
              фармакоинвазивный подход при недоступности катетеризации в
              установленные сроки. ACC/AHA более подробно расписывают маршруты
              трансфера между центрами.
            </li>
            <li>
              <span className="font-semibold">
                Риск-стратификация NSTEMI/нестабильной стенокардии.
              </span>{' '}
              Европейские рекомендации опираются на GRACE как основной инструмент,
              тогда как американские допускают использование нескольких шкал
              (TIMI, HEART) в разных клинических контекстах.
            </li>
            <li>
              <span className="font-semibold">Антитромботическая терапия.</span>{' '}
              Отличаются уровни рекомендаций для тикагрелора и прасугрела,
              длительность двойной антитромбоцитарной терапии у больных с
              высоким риском кровотечений, а также акценты на деэскалации
              терапии.
            </li>
            <li>
              <span className="font-semibold">
                Длительное наблюдение и вторичная профилактика.
              </span>{' '}
              В ESC более детально прописаны целевые уровни ЛПНП и принципы
              &laquo;очень высокого риска&raquo;, тогда как ACC/AHA делают упор на
              «shared decision making» и ступенчатое усиление липидснижающей
              терапии.
            </li>
          </ul>
          <p className="mt-3 text-xs md:text-sm text-[#6b7280]">
            Подробные ссылки на ESC и ACC/AHA будут добавлены на этапе
            интеграции Sanity CMS, с привязкой к версии и году гайда.
          </p>
        </section>

        {/* Общие положения */}
        <section id="acs-overview">
          <h3 className="text-xl md:text-2xl font-semibold text-[#111827] mb-3">
            Общие положения и классификация ОКС
          </h3>
          <p className="text-sm md:text-base text-[#4b3b2f] leading-relaxed space-y-3">
            Острый коронарный синдром объединяет несколько клинических
            состояний, связанных с острым нарушением коронарного кровотока:
            инфаркт миокарда с подъёмом ST (STEMI), инфаркт миокарда без
            подъёмa ST (NSTEMI) и нестабильную стенокардию. Ключевое отличие —
            наличие некроза миокарда по тропонину и характер изменений ЭКГ.
          </p>
        </section>

        {/* Диагностика */}
        <section id="acs-diagnostics">
          <h3 className="text-xl md:text-2xl font-semibold text-[#111827] mb-3">
            Диагностика и начальная оценка
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-[#4b3b2f]">
            <li>
              <span className="font-semibold">Клиника:</span> загрудинная боль,
              иррадиация, вегетативные симптомы, атипичные проявления у
              пожилых, женщин и больных с диабетом.
            </li>
            <li>
              <span className="font-semibold">ЭКГ:</span> повторная регистрация
              каждые 15–30 минут при сохраняющейся симптоматике; при
              подозрении на заднюю/правожелудочковую локализацию — дополнительные
              отведения.
            </li>
            <li>
              <span className="font-semibold">Высокочувствительные тропонины:</span>{' '}
              серийное измерение с оценкой динамики; использование алгоритмов
              0/1-ч или 0/2-ч в зависимости от доступности.
            </li>
            <li>
              <span className="font-semibold">Базовая оценка риска:</span>{' '}
              гемодинамика, признаки острой сердечной недостаточности,
              сопутствующие заболевания, кровоточивость.
            </li>
          </ul>
        </section>

        {/* Риск-стратификация */}
        <section id="acs-risk">
          <h3 className="text-xl md:text-2xl font-semibold text-[#111827] mb-3">
            Риск-стратификация и выбор стратегии
          </h3>
          <p className="text-sm md:text-base text-[#4b3b2f] mb-2">
            В NSTEMI/нестабильной стенокардии ключевую роль играет определение
            времени инвазивного вмешательства:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-[#4b3b2f]">
            <li>Очень высокий риск — немедленная инвазия (&lt;2 часов).</li>
            <li>Высокий риск — ранняя инвазия (&lt;24 часов).</li>
            <li>Промежуточный риск — инвазия в течение 72 часов.</li>
          </ul>
          <p className="mt-2 text-sm md:text-base text-[#4b3b2f]">
            Для STEMI основной выбор — первичное ЧКВ vs тромболизис с последующим
            ЧКВ (фармакоинвазивная стратегия), исходя из времени до пункции
            артерии и логистики.
          </p>
        </section>

        {/* Реперфузия */}
        <section id="acs-reperfusion">
          <h3 className="text-xl md:text-2xl font-semibold text-[#111827] mb-3">
            Реперфузионная терапия
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-[#4b3b2f]">
            <li>
              <span className="font-semibold">STEMI:</span> первичное ЧКВ
              предпочтительнее при доступности в пределах рекомендованного
              окна; тромболизис — альтернатива при невозможности своевременного
              ЧКВ.
            </li>
            <li>
              <span className="font-semibold">NSTEMI/нестабильная стенокардия:</span>{' '}
              рутинный тромболизис не показан; инвазивная стратегия определяется
              риском и анатомией коронарных артерий.
            </li>
          </ul>
        </section>

        {/* Фармакотерапия */}
        <section id="acs-pharm">
          <h3 className="text-xl md:text-2xl font-semibold text-[#111827] mb-3">
            Медикаментозная терапия
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-[#4b3b2f]">
            <li>
              Двойная антитромбоцитарная терапия (аспирин + ингибитор P2Y12)
              с подбором препарата в зависимости от риска ишемии и кровотечений.
            </li>
            <li>Антикоагулянты в остром периоде (НМГ, фондапаринукс и др.).</li>
            <li>
              Бета-блокаторы, статины высокой интенсивности, ингибиторы
              РААС, нитраты по показаниям.
            </li>
          </ul>
        </section>

        {/* Вторичная профилактика */}
        <section id="acs-secondary">
          <h3 className="text-xl md:text-2xl font-semibold text-[#111827] mb-3">
            Вторичная профилактика и наблюдение
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-[#4b3b2f]">
            <li>Контроль факторов риска: АД, липиды, сахар, вес, курение.</li>
            <li>Кардиореабилитация и обучение пациента.</li>
            <li>Длительный мониторинг приверженности и побочных эффектов.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

// --- Основная страница Гайдов ---

export default function GuidesPage() {
  const [specialty, setSpecialty] = useState<SpecialtyId>('cardiology');
  const [nosology, setNosology] = useState<NosologyId | null>('acs');
  const [scenario, setScenario] = useState<ScenarioId | null>(null);

  const showAcs = specialty === 'cardiology' && nosology === 'acs';

  return (
    <main className="bg-[#fcfcee] min-h-screen">
      {/* Афоризм и фильтры — как на главной */}
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

            {/* Специальность справа */}
            <div className="flex-1 flex justify-end">
              <div className="flex flex-col items-end gap-1">
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f]">
                  Специальность
                </span>
                <select
                  value={specialty}
                  onChange={(e) => {
                    const value = e.target.value as SpecialtyId;
                    setSpecialty(value);
                    setNosology('acs');
                    setScenario(null);
                  }}
                  className="min-w-[210px] rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52]"
                >
                  {SPECIALTIES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Фильтр нозологий под фильтром специальности */}
          <div className="mt-4 flex justify-end">
            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f]">
                Нозология
              </span>
              <select
                value={nosology ?? 'acs'}
                onChange={(e) => {
                  const value = e.target.value as NosologyId;
                  setNosology(value);
                  setScenario(null);
                }}
                className="min-w-[260px] rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52]"
              >
                {CARDIO_NOSOLOGIES.map(👎 => (
                  <option key={n.id} value={n.id}>
                    {n.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Тело страницы гайда */}
      <section className="max-w-[1360px] mx-auto px-4 pt-10 pb-16">
        {showAcs ? (
          <>
            {/* Заголовок нозологии и краткое пояснение */}
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-semibold text-[#111827] mb-2">
                Острый коронарный синдром (ОКС)
              </h1>
              <p className="text-sm md:text-base text-[#4b3b2f]">
                ОКС объединяет STEMI, NSTEMI и нестабильную стенокардию. Ниже
                представлены основные клинические сценарии, из которых можно
                перейти к подробной структуре гайда.
              </p>
            </div>

            {/* Три сценария в ряд */}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {ACS_SCENARIOS.map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setScenario(sc.id)}
                  className={`text-left rounded-3xl border px-5 py-4 shadow-sm transition-all ${
                    scenario === sc.id
                      ? 'border-[#015d52] shadow-md bg-white'
                      : 'border-[#e5e7eb] bg-[#f9fafb] hover:border-[#015d52]/60 hover:shadow-md'
                  }`}
                >
                  <h2 className="text-sm md:text-base font-semibold text-[#111827] mb-1.5">
                    {sc.title}
                  </h2>
                  <p className="text-xs md:text-sm text-[#4b3b2f]">
                    {sc.subtitle}
                  </p>
                </button>
              ))}
            </div>

            {/* Собственно гайд по ОКС */}
            <AcsGuide scenario={scenario} />
          </>
        ) : (
          <div className="text-center text-sm md:text-base text-[#4b3b2f]">
            Подробная структура гайда для выбранной нозологии будет добавлена
            позже. Сейчас в качестве примера реализован раздел по острому
            коронарному синдрому (ОКС).
          </div>
        )}

        {/* Низ страницы — support */}
        <p className="mt-16 text-center text-sm md:text-base text-[#4b3b2f]">
          support@medradix.info
        </p>
      </section>
    </main>
  );
}

