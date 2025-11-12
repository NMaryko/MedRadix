// app/guides/page.tsx
'use client';

import Link from 'next/link';

export default function GuidesIndex() {
  return (
    <main className="min-h-screen bg-[#fcfcee] p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Гайды
        </h1>
        <p className="text-gray-700 mb-6">
          Для медицинских специалистов. Обзор и интерпретация; не заменяет
          официальные руководства. Следуйте локальным протоколам.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <Link href="/guides/acs" className="text-[#015d52] underline">
              Острый коронарный синдром (ОКС)
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}

                       
