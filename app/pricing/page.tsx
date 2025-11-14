// app/pricing/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

type Audience = 'doctors' | 'nurses';

interface Plan {
  label: string;       // "3 месяца"
  months: number;      // 3, 6, 12
  pricePerMonth: number;
  total: number;       // Сумма в скобках
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

const discounts = ['-$18', '-$72']; // для 6 и 12 месяцев — как на старом макете

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
          <div className="inline-flex rounded-full bg-[#e5e7eb] p-1">
            <button
              type="button"
              onClick={() => setAudience('doctors')}
              className={`px-6 py-2 text-sm md:text-base rounded-full transition ${
                audience === 'doctors'
                  ? 'bg-[#003747] text-white'
                  : 'text-gray-700'
              }`}
            >
              Врач
            </button>
            <button
              type="button"
              onClick={() => setAudience('nurses')}
              className={`px-6 py-2 text-sm md:text-base rounded-full transition ${
                audience === 'nurses'
                  ? 'bg-[#003747] text-white'
                  : 'text-gray-700'
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
              className="relative bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col"
            >
              {/* Бейдж скидки для 6 и 12 месяцев */}
              {index > 0 && (
                <div className="absolute -top-4 right-6 px-3 py-1 rounded-full bg-gray-900 text-white text-sm">
                  {discounts[index - 1]}
                </div>
              )}

              {/* Цена */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">{plan.label}</h2>
                <p className="text-3xl font-bold">
                  ${plan.pricePerMonth}
                  <span className="text-base font-normal ml-1">/мес</span>
                  <span className="text-base text-gray-500 ml-1">
                    (${plan.total})
                  </span>
                </p>
              </div>

              {/* Описание — 1 в 1 по смыслу с Hostinger */}
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
                className="mt-8 w-full rounded-full bg-[#015D52] text-white py-3 font-semibold"
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

        {/* Нижний блок как на скрине */}
        <div className="mt-12 text-center">
          <Link
            href="/pricing"
            className="inline-flex px-10 py-3 rounded-full bg-[#015D52] text-white font-semibold"
          >
            Получить полный доступ к MedRadix
          </Link>
          <p className="mt-4 text-sm text-gray-600">
            для врачей — от $12/мес, для медсестер — от $7/мес
          </p>
        </div>
      </div>
    </main>
  );
}
