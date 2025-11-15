// app/guides/coming-soon/page.tsx
'use client';

import { FilterM } from '@/components/FilterM';
import { SupportM } from '@/components/SupportM';

export default function GuidesComingSoonPage() {
  return (
    <main className="min-h-screen bg-[#fcfcee] py-10">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h1 className="mb-4 text-2xl font-bold text-[#015D52]">
          Раздел в разработке
        </h1>

         <FilterM />
        <SupportM />
      </div>
    </main>
  );
}
