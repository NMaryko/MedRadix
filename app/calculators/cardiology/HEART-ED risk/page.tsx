// app/calculators/cardiology/heart-ed/page.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FilterM } from '@/components/FilterM';
import { SupportM } from '@/components/SupportM';

type HeartScore = {
  history: number;
  ecg: number;
  age: number;
  riskFactors: number;
  troponin: number;
};

type EdacsScore = {
  age: number;
  sex: number;
  symptoms: number;
  ecg: number;
  troponin: number;
};

export default function HeartEdCalculator() {
  const [heartScore, setHeartScore] = useState<HeartScore>({
    history: 0,
    ecg: 0,
    age: 0,
    riskFactors: 0,
    troponin: 0,
  });

  const [edacsScore, setEdacsScore] = useState<EdacsScore>({
    age: 0,
    sex: 0,
    symptoms: 0,
    ecg: 0,
    troponin: 0,
  });

  const [showResults, setShowResults] = useState(false);

  const calculateHeartScore = (): number => {
    return Object.values(heartScore).reduce((sum, value) => sum + value, 0);
  };

  const calculateEdacsScore = (): number => {
    return Object.values(edacsScore).reduce((sum, value) => sum + value, 0);
  };

  const getHeartRisk = (score: number): string => {
    if (score <= 3) return 'Низкий риск (0.9-1.7% MACE за 6 недель)';
    if (score <= 6) return 'Умеренный риск (12-16.6% MACE за 6 недель)';
    return 'Высокий риск (50-65% MACE за 6 недель)';
  };

  const getEdacsRisk = (score: number): string => {
    if (score < 16) return 'Низкий риск - возможна ранняя выписка';
    return 'Высокий риск - требуется госпитализация';
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setHeartScore({
      history: 0,
      ecg: 0,
      age: 0,
      riskFactors: 0,
      troponin: 0,
    });
    setEdacsScore({
      age: 0,
      sex: 0,
      symptoms: 0,
      ecg: 0,
      troponin: 0,
    });
    setShowResults(false);
  };

  const totalHeartScore = calculateHeartScore();
  const totalEdacsScore = calculateEdacsScore();

  return (
    <main className="min-h-screen bg-[#fcfcee] py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Хлебные крошки */}
        <nav className="mb-6 text-sm text-gray-600">
          <Link href="/calculators" className="hover:text-[#015D52]">
            Калькуляторы
          </Link>
          <span className="mx-2">/</span>
          <Link href="/calculators/cardiology" className="hover:text-[#015D52]">
            Кардиология
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#015D52] font-medium">HEART / ED risk</span>
        </nav>

        {/* Заголовок и фильтр */}
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <h1 className="mb-2 text-3xl font-bold text-[#015D52]">
              HEART / ED risk калькулятор
            </h1>
            <p className="text-sm text-gray-700">
              Быстрая оценка краткосрочного риска MACE в приёмном отделении, 
              включающая европейский HEART и международный EDACS.
            </p>
          </div>

          <div className="w-full md:w-72">
            <FilterM selected="Кардиология" onChange={() => {}} />
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Европейский HEART Score */}
          <div className="rounded-3xl border border-[#015D52]/30 bg-white/80 p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <div className="rounded-full bg-[#015D52] px-3 py-1 text-xs font-semibold text-white">
                EU
              </div>
              <h2 className="text-xl font-bold text-[#015D52]">
                HEART Score
              </h2>
            </div>
            
            <p className="mb-6 text-sm text-gray-700">
              Европейский подход: 0–10 баллов. Компоненты: анамнез, ЭКГ, возраст, 
              факторы риска, тропонин.
            </p>

            <div className="space-y-4">
              {/* История */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-800">
                  Анамнез
                </label>
                <select
                  value={heartScore.history}
                  onChange={(e) => setHeartScore({...heartScore, history: Number(e.target.value)})}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-[#015D52] focus:outline-none focus:ring-2 focus:ring-[#015D52]/20"
                >
                  <option value={0}>Низкая вероятность (0 баллов)</option>
                  <option value={1}>Умеренная вероятность (1 балл)</option>
                  <option value={2}>Высокая вероятность (2 балла)</option>
                </select>
              </div>

              {/* ЭКГ */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-800">
                  ЭКГ
                </label>
                <select
                  value={heartScore.ecg}
                  onChange={(e) => setHeartScore({...heartScore, ecg: Number(e.target.value)})}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-[#015D52] focus:outline-none focus:ring-2 focus:ring-[#015D52]/20"
                >
                  <option value={0}>Нормальная (0 баллов)</option>
                  <option value={1}>Неспецифические изменения (1 балл)</option>
                  <option value={2}>Значимая депрессия ST (2 балла)</option>
                </select>
              </div>

              {/* Возраст */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-800">
                  Возраст
                </label>
                <select
                  value={heartScore.age}
                  onChange={(e) => setHeartScore({...heartScore, age: Number(e.target.value)})}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-[#015D52] focus:outline-none focus:ring-2 focus:ring-[#015D52]/20"
                >
                  <option value={0}>Моложе 45 лет (0 баллов)</option>
                  <option value={1}>45–65 лет (1 балл)</option>
                  <option value={2}>Старше 65 лет (2 балла)</option>
                </select>
              </div>

              {/* Факторы риска */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-800">
                  Факторы риска
                </label>
                <select
                  value={heartScore.riskFactors}
                  onChange={(e) => setHeartScore({...heartScore, riskFactors: Number(e.target.value)})}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-[#015D52] focus:outline-none focus:ring-2 focus:ring-[#015D52]/20"
                >
                  <option value={0}>Нет или 1 фактор (0 баллов)</option>
                  <option value={1}>2–3 фактора (1 балл)</option>
                  <option value={2}>≥4 факторов (2 балла)</option>
                </select>
              </div>

              {/* Тропонин */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-800">
                  Тропонин
                </label>
                <select
                  value={heartScore.troponin}
                  onChange={(e) => setHeartScore({...heartScore, troponin: Number(e.target.value)})}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-[#015D52] focus:outline-none focus:ring-2 focus:ring-[#015D52]/20"
                >
                  <option value={0}>В пределах нормы (0 баллов)</option>
                  <option value={1}>1–3× верхней границы нормы (1 балл)</option>
                  <option value={2}>{'>'}3× верхней границы нормы (2 балла)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Американский EDACS */}
          <div className="rounded-3xl border border-[#5E3830]/30 bg-white/80 p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <div className="rounded-full bg-[#5E3830] px-3 py-1 text-xs font-semibold text-white">
                US
              </div>
              <h2 className="text-xl font-bold text-[#5E3830]">
                EDACS Score
              </h2>
            </div>
            
            <p className="mb-6 text-sm text-gray-700">
              Американский подход: Emergency Department Assessment of Chest Pain Score. 
              Быстрая стратификация в течение 2 часов.
            </p>

            <div className="space-y-4">
              {/* Возраст */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-800">
                  Возраст (лет)
                </label>
                <input
                  type="number"
                  value={edacsScore.age || ''}
                  onChange={(e) => setEdacsScore({...edacsScore, age: Number(e.target.value)})}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-[#5E3830] focus:outline-none focus:ring-2 focus:ring-[#5E3830]/20"
                  placeholder="Введите возраст"
                />
              </div>

              {/* Пол */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-800">
                  Пол
                </label>
                <select
                  value={edacsScore.sex}
                  onChange={(e) => setEdacsScore({...edacsScore, sex: Number(e.target.value)})}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-[#5E3830] focus:outline-none focus:ring-2 focus:ring-[#5E3830]/20"
                >
                  <option value={0}>Мужской (0 баллов)</option>
                  <option value={4}>Женский (4 балла)</option>
                </select>
              </div>

              {/* Симптомы */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-800">
                  Характер симптомов
                </label>
                <select
                  value={edacsScore.symptoms}
                  onChange={(e) => setEdacsScore({...edacsScore, symptoms: Number(e.target.value)})}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-[#5E3830] focus:outline-none focus:ring-2 focus:ring-[#5E3830]/20"
                >
                  <option value={0}>Типичная боль в груди (0 баллов)</option>
                  <option value={3}>Атипичные симптомы (3 балла)</option>
                  <option value={5}>Боль в эпигастрии (5 баллов)</option>
                </select>
              </div>

              {/* ЭКГ */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-800">
                  ЭКГ
                </label>
                <select
                  value={edacsScore.ecg}
                  onChange={(e) => setEdacsScore({...edacsScore, ecg: Number(e.target.value)})}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-[#5E3830] focus:outline-none focus:ring-2 focus:ring-[#5E3830]/20"
                >
                  <option value={0}>Нормальная (0 баллов)</option>
                  <option value={2}>Новые изменения (2 балла)</option>
                  <option value={4}>Ишемические изменения (4 балла)</option>
                </select>
              </div>

              {/* Тропонин */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-800">
                  Тропонин
                </label>
                <select
                  value={edacsScore.troponin}
                  onChange={(e) => setEdacsScore({...edacsScore, troponin: Number(e.target.value)})}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:border-[#5E3830] focus:outline-none focus:ring-2 focus:ring-[#5E3830]/20"
                >
                  <option value={0}>Нормальный (0 баллов)</option>
                  <option value={4}>Повышенный (4 балла)</option>
                  <option value={6}>Значительно повышенный (6 баллов)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Кнопки расчета и сброса */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={handleCalculate}
            className="rounded-2xl bg-[#015D52] px-8 py-4 font-semibold text-white transition hover:bg-[#014840] focus:outline-none focus:ring-2 focus:ring-[#015D52]/50"
          >
            Рассчитать риски
          </button>
          <button
            onClick={handleReset}
            className="rounded-2xl border border-[#5E3830] px-8 py-4 font-semibold text-[#5E3830] transition hover:bg-[#5E3830]/10 focus:outline-none focus:ring-2 focus:ring-[#5E3830]/50"
          >
            Сбросить
          </button>
        </div>

        {/* Результаты */}
        {showResults && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-[#e7f3ff] p-6">
              <h3 className="mb-4 text-lg font-bold text-[#015D52]">
                HEART Score Результат
              </h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#015D52] mb-2">
                  {totalHeartScore}
                </div>
                <div className="text-lg font-semibold text-gray-800">
                  {getHeartRisk(totalHeartScore)}
                </div>
                <div className="mt-4 text-sm text-gray-700">
                  {totalHeartScore <= 3 && 
                    'Низкий риск - безопасная госпитализация в наблюдение'}
                  {totalHeartScore > 3 && totalHeartScore <= 6 && 
                    'Умеренный риск - требуется наблюдение и дообследование'}
                  {totalHeartScore > 6 && 
                    'Высокий риск - срочная госпитализация в стационар'}
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-[#ffe7ee] p-6">
              <h3 className="mb-4 text-lg font-bold text-[#5E3830]">
                EDACS Результат
              </h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#5E3830] mb-2">
                  {totalEdacsScore}
                </div>
                <div className="text-lg font-semibold text-gray-800">
                  {getEdacsRisk(totalEdacsScore)}
                </div>
                <div className="mt-4 text-sm text-gray-700">
                  {totalEdacsScore < 16 && 
                    'Низкий риск по EDACS - возможна ранняя выписка при отрицательных тропонинах'}
                  {totalEdacsScore >= 16 && 
                    'Высокий риск по EDACS - требуется госпитализация и наблюдение'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Интерпретация */}
        <div className="mt-8 rounded-3xl border border-[#015D52]/30 bg-white/80 p-6">
          <h3 className="mb-4 text-lg font-bold text-[#015D52]">
            Интерпретация результатов
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              <strong>Низкий риск по HEART (0-3 балла):</strong> 0.9-1.7% риск MACE за 6 недель. 
              Безопасная госпитализация в наблюдение.
            </p>
            <p>
              <strong>Низкий риск по EDACS ({'<'}16 баллов):</strong> Возможна ранняя выписка 
              при отрицательных тропонинах в динамике.
            </p>
            <p>
              <strong>Умеренный/высокий риск:</strong> Требуется госпитализация, 
              наблюдение и дообследование согласно клиническим рекомендациям.
            </p>
          </div>
        </div>

        {/* SupportM */}
        <SupportM />
      </div>
    </main>
  );
}
