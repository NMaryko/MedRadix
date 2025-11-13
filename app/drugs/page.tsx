'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Drug, mockDrugEnoxaparin } from '../../types/drug';

const drugs: Drug[] = [mockDrugEnoxaparin];

export default function DrugsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrugs = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return drugs;

    return drugs.filter((drug) => {
      const haystack = [
        drug.genericName,
        drug.tradeNames.join(' '),
        drug.pharmacologicClass ?? '',
        drug.therapeuticClass ?? '',
        ...drug.indications.map((i) => i.title),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [searchTerm]);

  return (
    <main className="min-h-screen bg-[#fcfcee] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            База препаратов
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Быстрый доступ к основным препаратам, применению и связи с клиническими
            гайдами. Сейчас в базе один примерный препарат (эноксапарин).
          </p>
        </header>

        {/* Поисковая строка */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Поиск по названию, группе или показаниям
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Например: enoxaparin, антикоагулянт, ОКС…"
            className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600
                       bg-white/80"
          />
        </div>

        {/* Результаты */}
        {filteredDrugs.length === 0 ? (
          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3
