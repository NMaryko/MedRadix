'use client';

import { useState } from 'react';
import { SupportM } from '@/components/SupportM';

const MODES = ['EU / US', 'Только ESC', 'Только ACC/AHA'];
const SPECIALTIES = ['Кардиология', 'Эндокринология', 'Неврология', 'Стоматология', 'Общая терапия'];

export default function ComingSoonPage() {
  const [mode, setMode] = useState(MODES[0]);
  const [specialty, setSpecialty] = useState(SPECIALTIES[0]);

  return (
    <main className="min-h-screen bg-[#fcfcee] flex flex-col">
      <div className="max-w-5xl mx-auto w-full px-4 pt-8 flex-1 flex flex-col">
        {/* ДВА ФИЛЬТРА: М и Специальность (по дизайну как фильтр М) */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl mx-auto justify-center">
          {/* Фильтр М */}
          <div className="w-full">
            <div className="relative w-full">
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="
                  appearance-none
                  rounded-full border border-[#d3cec4]
                  bg-white
                  px-4 pr-10
                  h-12 min-h-[48px]
                  text-base text-[#3b342d]
                  shadow-sm
                  w-full
                  text-center
                  focus:outline-none
                  focus:border-[#015d52]
                  focus:ring-1 focus:ring-[#015d52]
                  hover:ring-1 hover:ring-[#015d52]
                  hover:shadow-[0_0_10px_#015D52]
                "
              >
                {MODES.map((m) => (
                  <option key={m} value={m} className="text-center">
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Фильтр Специальность (тем же дизайном) */}
          <div className="w-full">
            <div className="relative w-full">
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="
                  appearance-none
                  rounded-full border border-[#d3cec4]
                  bg-white
                  px-4 pr-10
                  h-12 min-h-[48px]
                  text-base text-[#3b342d]
                  shadow-sm
                  w-full
                  text-center
                  focus:outline-none
                  focus:border-[#015d52]
                  focus:ring-1 focus:ring-[#015d52]
                  hover:ring-1 hover:ring-[#015d52]
                  hover:shadow-[0_0_10px_#015D52]
                "
              >
                {SPECIALTIES.map((s) => (
                  <option key={s} value={s} className="text-center">
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ЦЕНТРАЛЬНЫЙ ТЕКСТ */}
        <div className="flex-1 flex items-center justify-center py-12">
          <p className="text-2xl sm:text-3xl font-normal tracking-wide text-[#5E3830] text-center">
            Раздел в разработке!
          </p>
        </div>

        {/* SUPPPORT M ВНИЗУ */}
        <div className="mt-auto pb-12">
          <SupportM />
        </div>
      </div>
    </main>
  );
}

