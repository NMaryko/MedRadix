// app/guides/page.tsx

export default function GuidesPage() {
  return (
    <main className="bg-[#fcfcee] min-h-screen">
      {/* HERO / ОБЛОЖКА */}
      <section className="border-b border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 py-8 space-y-4">
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit rounded-full border border-[#d3cec4] bg-white px-4 py-1 text-xs tracking-[0.18em] uppercase text-[#7a6a55]">
              Гайды · Кардиология
            </span>

            <h1 className="text-3xl md:text-4xl font-semibold text-[#2b2115]">
              Острый коронарный синдром (ОКС)
            </h1>

            <p className="max-w-2xl text-sm md:text-base text-[#4b3b2f]">
              Структурированный гайд для приёмного отделения, кардиологов и
              интенсивистов. Основан на ESC и ACC/AHA рекомендациях с
              аналитикой MedRadix по отличиям EU / US.
            </p>

            {/* Фишка MedRadix */}
            <div className="mt-2 inline-flex flex-wrap items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
              <span className="inline-flex items-center rounded-full bg-[#015d52] px-3 py-1 text-xs font-semibold text-white">
                MedRadix Insight
              </span>
              <span className="text-sm text-[#3b342d]">
                Наша фирменная часть — сравнение тактики EU / US для ключевых
                решений при ОКС.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* БЛОК: КЛЮЧЕВЫЕ ОТЛИЧИЯ EU / US (ФИРМЕННЫЙ) */}
      <section className="border-b border-gray-200 bg-[#f8f4ee]/70">
        <div className="max-w-[1360px] mx-auto px-4 py-10">
          <div className="rounded-3xl bg-white px-6 py-6 md:px-8 md:py-8 shadow-[0_10px_25px_rgba(0,0,0,0.06)]">
            <h2 className="text-xl md:text-2xl font-semibold text-[#2b2115] mb-4">
              Ключевые отличия EU / US по ОКС
            </h2>
            <p className="text-sm md:text-base text-[#4b3b2f] mb-4">
              Здесь будет компактная карта различий: где европейские и
              американские гайдлайны реально расходятся по тактике. Этот блок
              мы потом сделаем интерактивным и сохраняемым в «Избранное».
            </p>

            <ul className="space-y-2 text-sm md:text-base text-[#3b342d] list-disc pl-5">
              <li>Сроки реперфузии при STEMI.</li>
              <li>Стратегия при NSTE-ACS high-risk.</li>
              <li>Баланс PCI / тромболизиса в зависимости от ресурса.</li>
              <li>Подход к антитромботической терапии.</li>
              <li>Особые группы (ХБП, пожилые, коморбидные пациенты).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ВЫБОР СЦЕНАРИЯ ОКС */}
      <section className="border-b border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 py-10 space-y-4">
          <h2 className="text-lg md:text-xl font-semibold text-[#2b2115]">
            Выберите сценарий ОКС
          </h2>
          <p className="text-sm md:text-base text-[#4b3b2f]">
            Ниже — структуры для разных клинических сценариев. Пока они
            статичные, позже добавим быстрый переход и фильтры.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white px-4 py-4 shadow-sm border border-[#e5ded2]">
              <h3 className="text-sm font-semibold text-[#2b2115] mb-1">
                STEMI
              </h3>
              <p className="text-xs text-[#4b3b2f]">
                Полный подъём ST, приоритет немедленной реперфузии.
              </p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-4 shadow-sm border border-[#e5ded2]">
              <h3 className="text-sm font-semibold text-[#2b2115] mb-1">
                NSTE-ACS / NSTEMI
              </h3>
              <p className="text-xs text-[#4b3b2f]">
                Нестабильная ишемия без подъёма ST, акцент на стратификации
                риска.
              </p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-4 shadow-sm border border-[#e5ded2]">
              <h3 className="text-sm font-semibold text-[#2b2115] mb-1">
                Нестабильная стенокардия
              </h3>
              <p className="text-xs text-[#4b3b2f]">
                Клиника ОКС без выраженного тропонинового ответа.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NSTE-ACS / NSTEMI — ПРИМЕР СТРУКТУРЫ БЕЗ РОМАНОВ */}
      <section className="border-b border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 py-10 space-y-8">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-[#2b2115] mb-2">
              NSTE-ACS / NSTEMI
            </h2>
            <p className="text-sm md:text-base text-[#4b3b2f]">
              Ниже — скелет структуры. Тут будут не длинные тексты, а короткие
              блоки и схемы, которые потом можно сохранять по отдельности.
            </p>
          </div>

          {/* ОПРЕДЕЛЕНИЕ */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[#2b2115]">
              1. Определение и спектр
            </h3>
            <p className="text-sm md:text-base text-[#4b3b2f]">
              Краткое определение, чем NSTE-ACS отличается от STEMI, какие
              клинические формы сюда входят. 3–5 предложений, без «романа».
            </p>
          </div>

          {/* РИСК-СТРАТИФИКАЦИЯ — БЛОК ДЛЯ СХЕМЫ */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-[#2b2115]">
              2. Риск-стратификация и триаж
            </h3>
            <p className="text-sm md:text-base text-[#4b3b2f]">
              Здесь будет схема: как быстро понять, кто low / intermediate /
              high risk.
            </p>
            <div className="rounded-2xl border border-dashed border-[#d3cec4] bg-white/70 px-4 py-3 text-xs md:text-sm text-[#4b3b2f]">
              [Здесь позже будет диаграмма/алгоритм риск-стратификации.
              Сохраняемый блок.]
            </div>
          </div>

          {/* ДИАГНОСТИКА */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[#2b2115]">
              3. Диагностика
            </h3>
            <ul className="list-disc pl-5 text-sm md:text-base text-[#4b3b2f] space-y-1">
              <li>ECG: ключевые признаки, которые нельзя пропустить.</li>
              <li>Биомаркеры: тропонин, динамика, интервалы.</li>
              <li>Визуализация: когда и зачем.</li>
            </ul>
          </div>

          {/* ЛЕЧЕНИЕ: ОБЩАЯ КАРТИНА */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[#2b2115]">
              4. Общая стратегия лечения
            </h3>
            <p className="text-sm md:text-base text-[#4b3b2f]">
              Короткий обзор: что обязательно у всех, что зависит от риска,
              когда вообще думаем про инвазивную тактику.
            </p>
          </div>

          {/* КОНСЕРВАТИВНАЯ ТАКТИКА — БУДУЩИЙ БЛОК-АЛГОРИТМ */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-[#2b2115]">
              5. Консервативная тактика
            </h3>
            <p className="text-sm md:text-base text-[#4b3b2f]">
              Здесь будет компактный алгоритм медикаментозной терапии с
              подразделами по классам препаратов.
            </p>
            <div className="rounded-2xl border border-dashed border-[#d3cec4] bg-white/70 px-4 py-3 text-xs md:text-sm text-[#4b3b2f]">
              [Блок-алгоритм консервативного лечения NSTE-ACS. Тоже отдельный
              сохраняемый блок.]
            </div>
          </div>

          {/* ИНВАЗИВНАЯ ТАКТИКА — НАШ ОСНОВНОЙ БЛОК */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-[#2b2115]">
              6. Инвазивная тактика
            </h3>
            <p className="text-sm md:text-base text-[#4b3b2f]">
              Главный блок для инвазивной кардиологии: кто и когда должен
              попадать в катлаб, сроки, high-risk критерии.
            </p>
            <div className="rounded-2xl border border-dashed border-[#d3cec4] bg-white/70 px-4 py-3 text-xs md:text-sm text-[#4b3b2f]">
              [Здесь будет основная схема инвазивной тактики для NSTE-ACS.
              Сохраняемый блок + внутри локальная мини-карта EU/US.]
            </div>
          </div>

          {/* ОСОБЫЕ ГРУППЫ */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[#2b2115]">
              7. Особые группы пациентов
            </h3>
            <ul className="list-disc pl-5 text-sm md:text-base text-[#4b3b2f] space-y-1">
              <li>Пожилые пациенты.</li>
              <li>ХБП / диализ.</li>
              <li>Коморбидные пациенты (ХСН, сахарный диабет и т.д.).</li>
            </ul>
          </div>

          {/* ЛОКАЛЬНАЯ EU/US МИНИ-КАРТА ДЛЯ NSTE-ACS */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[#2b2115]">
              8. NSTE-ACS: отличия EU / US (локальная карта)
            </h3>
            <div className="rounded-2xl bg-white px-4 py-3 shadow-sm text-xs md:text-sm text-[#3b342d]">
              [Краткая таблица/список: где именно по NSTE-ACS расходятся EU и
              US. Отдельный сохраняемый блок.]
            </div>
          </div>
        </div>
      </section>

      {/* ЗАГЛУШКИ ДЛЯ STEMI И НЕСТАБИЛЬНОЙ СТЕНОКАРДИИ */}
      <section className="border-b border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 py-10 space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-[#2b2115]">
              STEMI
            </h2>
            <p className="text-sm md:text-base text-[#4b3b2f]">
              Здесь будет похожая структурная схема для STEMI: блоки определения,
              диагностики, реперфузии, инвазивной тактики и EU/US отличий.
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-[#2b2115]">
              Нестабильная стенокардия
            </h2>
            <p className="text-sm md:text-base text-[#4b3b2f]">
              И отдельная структура для нестабильной стенокардии. Сейчас это
              заглушки, чтобы увидеть общую композицию страницы.
            </p>
          </div>
        </div>
      </section>

      {/* ФИНАЛЬНАЯ СВОДКА EU/US ПО ВСЕМ СЦЕНАРИЯМ */}
      <section>
        <div className="max-w-[1360px] mx-auto px-4 py-12">
          <div className="rounded-3xl bg-white px-6 py-6 md:px-8 md:py-8 shadow-[0_10px_25px_rgba(0,0,0,0.06)]">
            <h2 className="text-xl md:text-2xl font-semibold text-[#2b2115] mb-3">
              Итоговая сводка отличий EU / US по ОКС
            </h2>
            <p className="text-sm md:text-base text-[#4b3b2f] mb-3">
              Здесь будет финальная «шпаргалка» по различиям: соберём в одном
              месте ключевые расхождения по STEMI, NSTE-ACS и нестабильной
              стенокардии.
            </p>
            <p className="text-xs md:text-sm text-[#7a6a55]">
              Этот блок мы тоже пометим как отдельный, чтобы его можно было
              добавлять в «Папки» и Избранное.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
