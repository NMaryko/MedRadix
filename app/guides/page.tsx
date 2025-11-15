// app/guides/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FilterM } from '@/components/FilterM';
import { SupportM } from '@/components/SupportM';

type Nosology = {
  id: string;
  label: string;
  group: string;
};

const CARDIOLOGY_NOSOLOGIES: Nosology[] = [
  { id: 'acs', label: 'Острый коронарный синдром (ОКС)', group: 'Ишемическая болезнь сердца' },
  { id: 'chronic-ihd', label: 'Хроническая ишемическая болезнь сердца', group: 'Ишемическая болезнь сердца' },
  { id: 'stable-angina', label: 'Стабильная стенокардия', group: 'Ишемическая болезнь сердца' },
  { id: 'post-mi', label: 'Постинфарктный период', group: 'Ишемическая болезнь сердца' },

  { id: 'af', label: 'Фибрилляция предсердий', group: 'Нарушения ритма и проводимости' },
  { id: 'other-arrhythmias', label: 'Другие нарушения ритма и проводимости', group: 'Нарушения ритма и проводимости' },

  { id: 'hf', label: 'Хроническая сердечная недостаточность', group: 'Сердечная недостаточность' },

  { id: 'htn', label: 'Артериальная гипертензия', group: 'Артериальная гипертензия' },

  { id: 'valvular', label: 'Поражения клапанов сердца', group: 'Поражения клапанов и врождённые пороки' },
  { id: 'congenital', label: 'Врожденные пороки сердца у взрослых', group: 'Поражения клапанов и врождённые пороки' },

  { id: 'cardiomyopathies', label: 'Кардиомиопатии', group: 'Кардиомиопатии' },

  { id: 'myocarditis', label: 'Миокардиты', group: 'Воспалительные заболевания миокарда и перикарда' },
  { id: 'pericarditis', label: 'Перикардиты', group: 'Воспалительные заболевания миокарда и перикарда' },

  { id: 'pah', label: 'Легочная гипертензия', group: 'Лёгочная гипертензия и ТЭЛА' },
  { id: 'pe', label: 'Тромбоэмболия легочной артерии (ТЭЛА)', group: 'Лёгочная гипертензия и ТЭЛА' },
];

export default function GuidesPage() {
  const router = useRouter();

  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Все');
  const [selectedNosology, setSelectedNosology] = useState<string>('');

  const handleSpecialtyChange = (value: string) => {
    setSelectedSpecialty(value);

    // если ушли с кардиологии — очищаем нозологию
    if (value !== 'Кардиология') {
      setSelectedNosology('');
    }
  };

  const handleNosologyChange = (value: string) => {
    setSelectedNosology(value);

    // пока обрабатываем только ОКС
    if (value === 'acs') {
      router.push('/guides/cardiology/acs');
    }
  };

  // сгруппируем нозологии для optgroup
  const cardiologyGroups = Array.from(
    new Set(CARDIOLOGY_NOSOLOGIES.map((n) => n.group))
  );

  return (
    <main className="min-h-screen bg-[#fcfcee] py-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* верх: заголовок + фильтр специальности (FilterM) */}
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold text-[#015D52]">
            Гайды
          </h1>

          <FilterM
            selected={selectedSpecialty}
            onChange={handleSpecialtyChange}
          />
        </header>

        {/* фильтр нозологий кардиологии — появляется только при выборе Кардиологии */}
        {selectedSpecialty === 'Кардиология' && (
          <section className="mb-8 flex justify-start md:justify-end">
            <div className="w-full md:w-72">
              <label
                htmlFor="cardio-nosology-select"
                className="mb-1 block text-[11px] font-semibold tracking-[0.18em] text-gray-500 uppercase text-center md:text-right"
              >
                НОЗОЛОГИЯ (КАРДИОЛОГИЯ)
              </label>
              <select
                id="cardio-nosology-select"
                className="w-full rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 text-center shadow-sm transition hover:border-[#015D52] hover:ring-1 hover:ring-[#015D52]/20 focus:border-[#015D52] focus:outline-none focus:ring-2 focus:ring-[#015D52]/25"
                style={{ textAlignLast: 'center' }}
                value={selectedNosology}
                onChange={(e) => handleNosologyChange(e.target.value)}
              >
                <option value="">Выберите нозологию</option>
                {cardiologyGroups.map((group) => (
                  <optgroup key={group} label={group}>
                    {CARDIOLOGY_NOSOLOGIES.filter(
                      (n) => n.group === group
                    ).map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </section>
        )}

        {/* здесь позже появится список гайдов по выбранной нозологии */}

        <SupportM />
      </div>
    </main>
  );
}


