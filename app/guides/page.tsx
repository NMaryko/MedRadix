'use client';

import { useState } from 'react';

type Specialty = 'Кардиология';

type NosologyId =
  | 'acs'
  | 'af'
  | 'hf'
  | 'htn'
  | 'stable_angina'
  | 'post_mi'
  | 'pe'
  | 'tachyarrhythmias';

interface Nosology {
  id: NosologyId;
  label: string;
}

const SPECIALTIES: Specialty[] = ['Кардиология'];

const CARDIO_NOSOLOGIES: Nosology[] = [
  { id: 'acs', label: 'Острый коронарный синдром (ОКС)' },
  { id: 'af', label: 'Фибрилляция предсердий' },
  { id: 'hf', label: 'Хроническая сердечная недостаточность' },
  { id: 'htn', label: 'Артериальная гипертензия' },
  { id: 'stable_angina', label: 'Стабильная ишемическая болезнь сердца' },
  { id: 'post_mi', label: 'Постинфарктный период' },
  { id: 'pe', label: 'Тромбоэмболия лёгочной артерии' },
  { id: 'tachyarrhythmias', label: 'Тахиаритмии' },
];

export default function GuidesPage() {
  const [specialty, setSpecialty] = useState<Specialty>('Кардиология');
  const [nosology, setNosology] = useState<NosologyId>('acs');

  const currentNosology = CARDIO_NOSOLOGIES.find((n) => n.id === nosology);

  return (
    <main className="bg-[#fcfcee] min-h-screen">
      {/* Блок афоризма и фильтров */}
      <section className="border-b border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 pt-4 pb-6">
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

            {/* Справа — фильтр специальности */}
            <div className="flex-1 flex justify-end">
              <div className="flex flex-col items-end gap-1">
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f]">
                  Специальность
                </span>
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value as Specialty)}
                  className="min-w-[190px] rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52]"
                >
                  {SPECIALTIES.map((s) => (
                    <option key={s} value={s}>
                      {s}
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
                value={nosology}
                onChange={(e) => setNosology(e.target.value as NosologyId)}
                className="min-w-[260px] rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52]"
              >
                {CARDIO_NOSOLOGIES.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Контент гайда для выбранной нозологии */}
      <section className="max-w-[1360px] mx-auto px-4 pt-10 pb-16">
        {currentNosology && (
          <>
            <h1 className="text-2xl md:text-3xl font-semibold text-center text-[#2b2115] mb-3">
              {currentNosology.label}
            </h1>
            <p className="text-center text-sm md:text-base text-[#4b3b2f] max-w-3xl mx-auto mb-8">
              Здесь будет подробная структура соответствующего гайда: сценарии,
              разделы, сравнение европейских и американских рекомендаций и
              ссылки на первоисточники.
            </p>
          </>
        )}

        <p className="mt-16 text-center text-sm md:text-base text-[#4b3b2f]">
          support@medradix.info
        </p>
      </section>
    </main>
  );
}


