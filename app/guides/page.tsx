"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, Save, BookOpen, Info, Search, LayoutGrid, Filter, Sparkles, Calculator, AlertTriangle } from "lucide-react";

// --- UI primitives (shadcn-like minimal inline versions to keep file self-contained) ---
const cn = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(" ");

function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-2xl shadow-sm border border-zinc-200 bg-white", className)}>{children}</div>;
}
function CardHeader({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("p-4 border-b border-zinc-100", className)}>{children}</div>;
}
function CardContent({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("p-4", className)}>{children}</div>;
}
function Button({ className = "", children, ...props }: any) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-4 min-h-11 text-sm font-medium border border-zinc-200 bg-white hover:bg-zinc-50 shadow-sm transition",
        className
      )}
    >
      {children}
    </button>
  );
}
function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs border border-zinc-200 bg-zinc-50 whitespace-nowrap",
        className
      )}
    >
      {children}
    </span>
  );
}
function Accordion({ children }: { children: React.ReactNode }) {
  return <div className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200 overflow-hidden">{children}</div>;
}
function AccordionItem({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3 text-left",
          open ? "bg-emerald-50/50" : "hover:bg-zinc-50"
        )}
      >
        <span className="font-semibold">{title}</span>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      {open && <div className="px-4 pb-4 pt-2 text-sm text-zinc-700">{children}</div>}
    </div>
  );
}

// --- Constants ---
const BRAND_EMERALD = "#015D52"; // фирменный изумрудный

// --- Page Component ---
export default function ACSGuidePage() {
  // Фильтры (перестановка порядка на мобилках: сначала Специальность, затем Нозология)
  const specialties = ["Кардиология", "Скорая помощь", "Терапия", "Анестезиология"];
  const nosologies = ["STEMI", "NSTE-ACS", "NSTEMI", "UA"];

  const [q, setQ] = useState("");
  const [spec, setSpec] = useState(specialties[0]);
  const [nos, setNos] = useState(nosologies[0]);

  const sections = useMemo(
    () => [
      { id: "overview", title: "Краткая ориентация (ОКС)" },
      { id: "intro-patho-class", title: "Патогенез и классификация (вводный блок)" },
      { id: "initial", title: "Первичная оценка" },
      { id: "diagnostics", title: "Диагностика" },
      { id: "treatment", title: "Лечение" },
      { id: "antithrombotic", title: "Антитромботическая терапия" },
      { id: "additional", title: "Дополнительная терапия" },
      { id: "risk-calcs", title: "Калькуляторы риска" },
      { id: "notes", title: "Примечания" },
    ],
    []
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      {/* Заголовок + дисклеймер (убрано явное упоминание ESC 2023-2024) */}
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-center gap-2 text-xs text-zinc-600">
          <LayoutGrid size={16} />
          <span>Для медицинских специалистов. Обзор и интерпретация; не заменяет официальные руководства. Следуйте локальным протоколам.</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Острый коронарный синдром (ОКС): практический гайд</h1>
      </div>

      {/* Верхняя панель действий */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Button aria-label="Сохранить" className="group border-zinc-300 hover:shadow-md" style={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}>
          <Save size={16} />
          <span>Сохранить</span>
        </Button>
        <Button className="border-zinc-300"><BookOpen size={16} /> Материалы</Button>
        <div className="ml-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={16} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Быстрый поиск по странице"
            className="min-h-11 pl-9 pr-3 border border-zinc-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-4">
        {/* Левая колонка: Разделы гайда (десктоп), кнопки с изумрудным свечением при ховере */}
        <aside className="hidden lg:block">
          <Card>
            <CardHeader className="flex items-center gap-2 text-sm font-semibold"><Filter size={16} /> Разделы гайда</CardHeader>
            <CardContent className="flex flex-col gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group inline-flex items-center justify-between rounded-xl border border-zinc-200 px-3 py-2 text-sm hover:shadow-sm transition relative"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <span className="truncate">{s.title}</span>
                  <ChevronRight size={16} />
                  {/* Изумрудное свечение */}
                  <span
                    className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition"
                    style={{ boxShadow: `0 0 0 2px ${BRAND_EMERALD}33, 0 0 18px ${BRAND_EMERALD}55` }}
                  />
                </a>
              ))}
            </CardContent>
          </Card>
        </aside>

        {/* Правая колонка: контент */}
        <main>
          {/* Фильтры (на мобильных: сначала Специальность, затем Нозология; расширенные кнопки) */}
          <Card className="mb-4">
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="order-1 sm:order-none">
                  <label className="block text-xs mb-1 text-zinc-600">Специальность</label>
                  <div className="flex flex-wrap gap-2">
                    {specialties.map((s) => (
                      <Button
                        key={s}
                        className={cn(
                          "min-h-11 px-3",
                          spec === s ? "border-emerald-600 ring-1 ring-emerald-200" : ""
                        )}
                        onClick={() => setSpec(s)}
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="order-2 sm:order-none">
                  <label className="block text-xs mb-1 text-zinc-600">Нозология</label>
                  <div className="flex flex-wrap gap-2">
                    {nosologies.map((n) => (
                      <Button
                        key={n}
                        className={cn(
                          "min-h-11 px-3",
                          nos === n ? "border-emerald-600 ring-1 ring-emerald-200" : ""
                        )}
                        onClick={() => setNos(n)}
                      >
                        {n}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="order-3 sm:order-none">
                  <label className="block text-xs mb-1 text-zinc-600">Инструменты</label>
                  <div className="flex flex-wrap gap-2">
                    <Button className="min-h-11"><Calculator size={16} /> Калькуляторы</Button>
                    <Button className="min-h-11"><Sparkles size={16} /> Подсказки</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Краткая ориентация (ОКС) — аккордеон над Первичной оценкой */}
          <section id="overview" className="mb-4">
            <Accordion>
              <AccordionItem title="Краткая ориентация (ОКС)" defaultOpen>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Цели первых 10 минут: ЭКГ, сатурация, болевой контроль, антитромботики по показаниям.</li>
                  <li>Стратификация: STEMI vs NSTE-ACS → маршрутизация (часы/минуты).</li>
                  <li>Коморбидность и кровотечений риск — учитывать до выбора схемы.</li>
                </ul>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Вводный блок: Патогенез/Классификация (добавлено по запросу) */}
          <section id="intro-patho-class" className="mb-6">
            <Card>
              <CardHeader className="flex items-center gap-2"><Info size={16} /> Патогенез и классификация (вводный блок)</CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-zinc-800">
                <p>
                  ОКС обусловлен острым несоответствием между потребностью миокарда в кислороде и коронарным кровотоком. Наиболее часто это
                  связано с разрывом/эрозией атеросклеротической бляшки и тромбозом, реже — с вазоспазмом, микрососудистой дисфункцией,
                  спонтанной диссекцией коронарной артерии (SCAD) или несоответствием supply/demand.
                </p>
                <p>
                  Ключевое различие в практике: наличие подъёма ST (STEMI) требует немедленной реперфузии; при NSTE-ACS (NSTEMI/нестабильная
                  стенокардия) стратегия инвазивного подхода определяется стратификацией риска (ишемического и геморрагического).
                </p>
                <p>
                  Ниже — компактная таблица основных типов ОКС для быстрой ориентации.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-zinc-200 rounded-xl overflow-hidden">
                    <thead className="bg-zinc-50">
                      <tr className="text-left">
                        <th className="p-2 border-b border-zinc-200">Тип</th>
                        <th className="p-2 border-b border-zinc-200">ЭКГ</th>
                        <th className="p-2 border-b border-zinc-200">Тропонин</th>
                        <th className="p-2 border-b border-zinc-200">Ключевая тактика</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 border-t border-zinc-200">STEMI</td>
                        <td className="p-2 border-t border-zinc-200">Подъём ST/новая БЛНПГ</td>
                        <td className="p-2 border-t border-zinc-200">↑</td>
                        <td className="p-2 border-t border-zinc-200">Немедленная реперфузия (ЧКВ предпочтительно)</td>
                      </tr>
                      <tr className="bg-zinc-50/60">
                        <td className="p-2 border-t border-zinc-200">NSTEMI</td>
                        <td className="p-2 border-t border-zinc-200">Без подъёма ST, могут быть депрессии/Т инверсии</td>
                        <td className="p-2 border-t border-zinc-200">↑</td>
                        <td className="p-2 border-t border-zinc-200">Ранняя инвазивная стратегия по риску</td>
                      </tr>
                      <tr>
                        <td className="p-2 border-t border-zinc-200">Нестабильная стенокардия</td>
                        <td className="p-2 border-t border-zinc-200">Без подъёма ST</td>
                        <td className="p-2 border-t border-zinc-200">Норма</td>
                        <td className="p-2 border-t border-zinc-200">Оценка риска, медикаментозная стабилизация, выбор инвазии</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Первичная оценка */}
          <section id="initial" className="scroll-mt-24 mb-6">
            <Card>
              <CardHeader className="flex items-center gap-2"><AlertTriangle size={16} /> Первичная оценка</CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-zinc-800">
                {/* Существующий текст раздела сохраняется. НИЧЕГО не сокращаем. */}
                <p>
                  \u2022 ABC, ЭКГ в 10 минут, SpO₂, обезболивание, нитраты/морфин по показаниям, антитромботическая нагрузка согласно выбранной
                  стратегии.
                </p>
                <p>
                  \u2022 Оцените противопоказания к антикоагулянтам/ДАТТ, кровотечения в анамнезе, ХБП, пожилой возраст, масса тела.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Диагностика */}
          <section id="diagnostics" className="scroll-mt-24 mb-6">
            <Card>
              <CardHeader>Диагностика</CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-zinc-800">
                {/* Существующий текст раздела сохраняется. */}
                <ul className="list-disc pl-5 space-y-1">
                  <li>Серийные высокочувствительные тропонины (0–1/2 ч), ЭКГ в динамике.</li>
                  <li>ЭхоКГ по показаниям, оценка осложнений.</li>
                  <li>Дифференцировать миокардит, ТЭЛА, расслаивающую аневризму аорты.</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Лечение */}
          <section id="treatment" className="scroll-mt-24 mb-6">
            <Card>
              <CardHeader>Лечение</CardHeader>
              <CardContent className="space-y-4 text-sm leading-6 text-zinc-800">
                {/* Антитромботическая терапия выведена отдельно ниже; здесь — общая тактика */}
                <p>
                  Тактика определяется подтипом ОКС и риском: реперфузия при STEMI; ранняя инвазивная стратегия при NSTEMI высокого риска;
                  оптимизация антиангинальной и вторичной профилактики.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Антитромботическая терапия с исправлениями бейджей (flex-wrap) */}
          <section id="antithrombotic" className="scroll-mt-24 mb-6">
            <Card>
              <CardHeader>Антитромботическая терапия</CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Нефракционированный гепарин</h4>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>Класс I</Badge>
                    <Badge>Уровень A</Badge>
                  </div>
                  <p className="text-sm text-zinc-800">
                    Дозирование по массе/АКТ, мониторинг, осторожность при ХБП/кровотечениях.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Антагонисты минералокортикоидных рецепторов</h4>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>Класс I</Badge>
                    <Badge>Уровень A</Badge>
                  </div>
                  <p className="text-sm text-zinc-800">Показаны при сниженной ФВ ЛЖ и симптомах/диабете после ОИМ при отсутствии противопоказаний.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Дополнительная терапия — удалён дубль "Показания" */}
          <section id="additional" className="scroll-mt-24 mb-6">
            <Card>
              <CardHeader>Дополнительная терапия</CardHeader>
              <CardContent className="space-y-3 text-sm leading-6 text-zinc-800">
                <p>Ингибиторы АПФ/БРА, бета-блокаторы, статины высокой интенсивности, коррекция факторов риска.</p>
                {/* Дублирующийся параграф "Показания" ранее удалён. */}
              </CardContent>
            </Card>
          </section>

          {/* Калькуляторы риска — оставить формулировки строго как просили */}
          <section id="risk-calcs" className="scroll-mt-24 mb-6">
            <Card>
              <CardHeader className="flex items-center gap-2"><Calculator size={16} /> Калькуляторы риска</CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button className="justify-between w-full">
                  <span>GRACE / TIMI‑like EU</span>
                  <ChevronRight size={16} />
                </Button>
                <Button className="justify-between w-full">
                  <span>HEART / ED risk</span>
                  <ChevronRight size={16} />
                </Button>
                <Button className="justify-between w-full">
                  <span>TIMI для NSTE‑ACS / US</span>
                  <ChevronRight size={16} />
                </Button>
              </CardContent>
            </Card>
          </section>

          {/* Примечания / ссылки */}
          <section id="notes" className="scroll-mt-24 mb-12">
            <Card>
              <CardHeader>Примечания</CardHeader>
              <CardContent className="text-sm text-zinc-700 space-y-2">
                <p>
                  Материал предназначен для клинической поддержки решений и не заменяет клиническое мышление врача. Всегда соотносите
                  рекомендации с локальными протоколами и характеристиками пациента.
                </p>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>

      {/* Изумрудное свечение для кнопки "Сохранить…" на десктопе */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          button:has(svg + span:contains('Сохранить')):hover {
            box-shadow: 0 0 0 2px ${BRAND_EMERALD}33, 0 0 18px ${BRAND_EMERALD}55 !important;
          }
        }
      `}</style>
    </div>
  );
}
