// app/guides/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FilterM } from '@/components/FilterM';
import { SupportM } from '@/components/SupportM';

export default function GuidesPage() {
  const router = useRouter();
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<string>('Все');

  const handleSpecialtyChange = (value: string) => {
    setSelectedSpecialty(value);

    // пока единственный готовый гайд — ОКС в кардиологии
    if (value === 'Кардиология') {
      router.push('/guides/cardiology/acs');
    }
    // для остальных специальностей просто оставляем выбор,
    // маршруты добавим позже
  };

  return (
    <main className="min-h-screen bg-[#fcfcee] py-10">
      <div className="max-w-5xl mx-auto px-4">
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold text-[#015D52]">
            Гайды
          </h1>

          <FilterM
            selected={selectedSpecialty}
            onChange={handleSpecialtyChange}
          />
        </header>

        {/* позже здесь добавим список гайдов по выбранной специальности */}

        <SupportM />
      </div>
    </main>
  );
}


