'use client';

import { useMemo, useState } from 'react';
import { Search, Pill, AlertCircle } from 'lucide-react';

type Drug = {
  id: string;
  name: string;
  generic?: string;
  group: string;
  indications: string;
  guideSection?: string;
};

const DRUGS: Drug[] = [
  {
    id: 'aspirin',
    name: 'Ацетилсалициловая кислота (Аспирин)',
    generic: 'Acetylsalicylic acid',
    group: 'Антитромбоцитарные средства',
    indications: 'ОКС, вторичная профилактика ИМ и ишемического инсульта, стабильная ИБС',
    guideSection: 'ОКС • Антитромбоцитарная терапия',
  },
  {
    id: 'ticagrelor',
    name: 'Тикагрелор',
    generic: 'Ticagrelor',
    group: 'P2Y12-ингибиторы',
    indications: 'ОКС с и без подъёма ST, после ЧКВ в составе ДАТТ',
    guideSection: 'ОКС • P2Y12 ингибиторы',
  },
  {
    id: 'prasugrel',
    name: 'Прасугрел',
    generic: 'Prasugrel',
    group: 'P2Y12-ингибиторы',
    indications: 'ОКС при планируемом/выполненном ЧКВ (без инсульта/ТИА в анамнезе)',
    guideSection: 'ОКС • P2Y12 ингибиторы',
  },
  {
    id: 'clopidogrel',
    name: 'Клопидогрел',
    generic: 'Clopidogrel',
    group: 'P2Y12-ингибиторы',
    indications: 'Альтернатива при высоком риске кровотечения или непереносимости тикагрелора/прасугрела',
    guideSection: 'ОКС • P2Y12 ингибиторы / деэскалация',
  },
];

export default function DrugsPage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return DRUGS;
    return DRUGS.filter((d) =>
      [d.name, d.generic, d.group, d.indications, d.guideSection]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <main className="min-h-screen bg-[#fcfcee] py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Заголовок */}
        <header className="mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            База препаратов
          </h1>
          <p className="text-sm text-gray-600 max-w-2xl">
            Быстрый доступ к основным препаратам,применение их в клинических гайдах.
          </p>
        </header>

        {/* Поиск */}
        <section className="mb-6">
          <label className="block text-xs font-semibold tracking-[0.18em] text-[#9c978f] uppercase mb-2">
            Поиск по названию, группе или показаниям
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Например: тикагрелор, антитромбоцитарные, ОКС..."
              className="w-full rounded-full border border-[#d3cec4] bg-white pl-10 pr-4 h-11 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:ring-1 focus:ring-[#015d52]"
            />
          </div>
        </section>

        {/* Результаты */}
        <section>
          {filtered.length === 0 ? (
            <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-sm text-gray-700">
              <AlertCircle className="text-yellow-500" size={18} />
              <span>По текущему запросу препаратов не найдено. Измените критерии поиска.</span>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {filtered.map((drug) => (
                <article
                  key={drug.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-2"
                >
                  <div className="flex items-start gap-2">
                    <Pill className="text-[#015d52] mt-1" size={18} />
                    <div>
                      <h2 className="font-semibold text-gray-900 text-sm md:text-base">
                        {drug.name}
                      </h2>
                      {drug.generic && (
                        <p className="text-xs text-gray-500 italic">
                          {drug.generic}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-xs text-gray-700">
                    <span className="font-semibold">Группа: </span>
                    <span>{drug.group}</span>
                  </div>

                  <div className="text-xs text-gray-700">
                    <span className="font-semibold">Основные показания: </span>
                    <span>{drug.indications}</span>
                  </div>

                  {drug.guideSection && (
                    <div className="mt-1">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-medium text-emerald-800">
                        Связан с разделом гайда: {drug.guideSection}
                      </span>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Дисклеймер */}
        <section className="mt-10 border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-500">
            Таблица носит обзорный характер и не заменяет официальные инструкции по
            применению препаратов и локальные протоколы. Для выбора дозировок и схем
            терапии всегда используйте полный текст гайдов и утверждённые документы.
          </p>
        </section>
      </div>
    </main>
  );
}
