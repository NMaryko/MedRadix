'use client';

import React from 'react';

export const SPECIALTIES: string[] = [
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
  'Стоматология',
  'Терапия',
  'Травматология и ортопедия',
  'Урология',
  'Хирургия',
  'Эндокринология',
];

interface FilterMProps {
  selected: string;                 // текущая выбранная спец-ть
  onChange: (value: string) => void; // что делать при смене
}

export function FilterM({ selected, onChange }: FilterMProps) {
  return (
    <div className="w-full md:w-72">
      <label
        htmlFor="specialty-select"
        className="mb-1 block text-[11px] font-semibold tracking-[0.18em] text-gray-500 uppercase text-center md:text-right"
      >
        СПЕЦИАЛЬНОСТЬ
      </label>
      <select
        id="specialty-select"
        className="w-full rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 text-center shadow-sm transition hover:border-[#015D52] hover:ring-1 hover:ring-[#015D52]/20 focus:border-[#015D52] focus:outline-none focus:ring-2 focus:ring-[#015D52]/25"
        style={{ textAlignLast: 'center' }}
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        {SPECIALTIES.map((spec) => (
          <option key={spec} value={spec}>
            {spec}
          </option>
        ))}
      </select>
    </div>
  );
}

