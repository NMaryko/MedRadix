// app/pricing/page.tsx
'use client';

import { useState } from 'react';

type Audience = 'doctors' | 'nurses';

interface Plan {
  label: string;
  months: number;
  pricePerMonth: number;
  total: number;
}

const doctorPlans: Plan[] = [
  { label: '3 месяца', months: 3, pricePerMonth: 18, total: 54 },
  { label: '6 месяцев', months: 6, pricePerMonth: 15, total: 90 },
  { label: '12 месяцев', months: 12, pricePerMonth: 12, total: 144 },
];

const nursePlans: Plan[] = [
  { label: '3 месяца', months: 3, pricePerMonth: 13, total: 39 },
  { label: '6 месяцев', months: 6, pricePerMonth: 10, total: 60 },
  { label: '12 месяцев', months: 12, pricePerMonth: 7, total: 84 },
];

const discounts = ['-$18', '-$72'];

export default function PricingPage() {
  const [audience, setAudience] = useState<Audience>('doctors');

  const plans = audience === 'doctors' ? doctorPlans : nursePlans;
  const accessTextPrefix =
    audience === 'doctors'
      ? 'Полный доступ ко всем разделам сайта на'
      : 'Полный доступ к разделу «Медсестрам» на';
  const pointsLabel =
    audience === 'doctors' ? '(CME/NMO)*' : '(NMO)*';

  return (
    <main className="min-h-screen bg-[#fcfcee] py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Заголовок */}
        <h1 className="text-center text-3xl md:text-4xl font-serif mb-10">
          Опции тарифов
        </h1>

        {/* Переключатель Врач / Медсестрам */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex w-[320px] rounded-full bg-white p-1 border border-transparent hover:border-[#015D52] shadow-[inset_0_0_18px_rgba(0,0,0,0.35)] transition-colors">
            <button
              type="button"
              onClick={() => setAudience('doctors')}
              className={`flex-1 px-4 py-3 text-sm md:text-base rounded-full transition ${
                audience === 'doctors'
                  ? 'bg-[#015D52] text-white'
                  : 'text-[#5E3830]'
              }`}
            >
              Врач
            </button>
            <button
              type="button"
              onClick={() => setAudience('nurses')}
              className={`flex-1 px-4 py-3 text-sm md:text-base rounded-full transition ${
                audience === 'nurses'
                  ? 'bg-[#015D52] text-white'
                  : 'text-[#5E3830]'
              }`}
            >
              Медсестрам
            </button>
          </div>
        </div>

        {/* Карточки тарифов */}
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={plan.label}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col"
            >
              {/* Верхняя строка: заголовок + скидка */}
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#5E3830]">
                  {plan.label}
                </h2>

                {index > 0 && (
                  <div className="px-4 py-1 bg-[#015D52] text-white text-sm rounded-none rounded-tr-3xl">
                    {discounts[index - 1]}
                  </div>
                )}
              </div>

              {/* Цена */}
              <div className="mb-6">
                <p className="text-3xl font-bold text-[#5E3830]">
                  ${plan.pricePerMonth}
                  <span className="text-base font-normal ml-1 text-[#5E3830]">
                    /мес
                  </span>
                  <span className="text-base font-normal ml-1 text-[#5E3830]">
                    (${plan.total})
                  </span>
                </p>
              </div>

              {/* Описание */}
              <ul className="space-y-3 text-sm text-gray-700 flex-1">
                <li className="flex gap-2">
                  <span className="mt-1">✓</span>
                  <span>
                    {accessTextPrefix} {plan.label.toLowerCase()}
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1">✓</span>
                  <span>
                    Сохранение сертификатов и файлов в личном кабинете
                    с автоматическим подсчётом международных баллов{' '}
                    {pointsLabel}
                  </span>
                </li>
              </ul>

              {/* Кнопка оплатить */}
              <button
                type="button"
                className="mt-8 w-full bg-[#015D52] text-white py-3 font-semibold rounded-none rounded-bl-3xl hover:bg-[#01463d] transition-colors"
              >
                Оплатить
              </button>
            </div>
          ))}
        </div>

        {/* Сноска */}
        <p className="mt-10 text-xs text-center text-gray-500 max-w-3xl mx-auto">
          * Информация о признании международных баллов (CME/NMO) может
          отличаться. Пожалуйста, уточняйте детали в Министерстве
          здравоохранения вашей страны.
        </p>

        {/* Email поддержки */}
        <p className="mt-36 text-center text-base text-[#4b3b2f]">
          support@medradix.info
        </p>
      </div>
    </main>
  );
}

