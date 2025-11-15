// app/calculators/cardiology/heart-ed-risk/page.tsx

'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { SupportM } from '@/components/SupportM';

const SPECIALTIES: string[] = [
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

// HEART Score расчет
function calculateHEART(
  history: number,
  ecg: number,
  age: number,
  riskFactors: number,
  troponin: number
): number {
  return history + ecg + age + riskFactors + troponin;
}

function getHEARTRisk(score: number): { category: string; risk: string; recommendation: string } {
  if (score <= 3) {
    return {
      category: 'Низкий риск',
      risk: '0.9-1.7% MACE за 6 недель',
      recommendation: 'Безопасная госпитализация в наблюдение'
    };
  } else if (score <= 6) {
    return {
      category: 'Умеренный риск',
      risk: '12-16.6% MACE за 6 недель',
      recommendation: 'Требуется наблюдение и дообследование'
    };
  } else {
    return {
      category: 'Высокий риск',
      risk: '50-65% MACE за 6 недель',
      recommendation: 'Срочная госпитализация в стационар'
    };
  }
}

// EDACS Score расчет
function calculateEDACS(
  age: number,
  sex: number,
  symptoms: number,
  ecg: number,
  troponin: number
): number {
  return age + sex + symptoms + ecg + troponin;
}

function getEDACSRisk(score: number): { category: string; recommendation: string } {
  if (score < 16) {
    return {
      category: 'Низкий риск',
      recommendation: 'Возможна ранняя выписка при отрицательных тропонинах'
    };
  } else {
    return {
      category: 'Высокий риск',
      recommendation: 'Требуется госпитализация и наблюдение'
    };
  }
}

export default function HeartEdRiskCalculatorPage() {
  const router = useRouter();

  // фильтр справа
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Кардиология');

  const handleSpecialtyChange = (value: string) => {
    setSelectedSpecialty(value);
    if (value !== 'Кардиология') {
      router.push('/calculators');
    }
  };

  // HEART Score данные
  const [history, setHistory] = useState<string>('0');
  const [heartEcg, setHeartEcg] = useState<string>('0');
  const [heartAge, setHeartAge] = useState<string>('0');
  const [riskFactors, setRiskFactors] = useState<string>('0');
  const [heartTroponin, setHeartTroponin] = useState<string>('0');

  // EDACS данные
  const [edacsAge, setEdacsAge] = useState<string>('');
  const [sex, setSex] = useState<string>('0');
  const [symptoms, setSymptoms] = useState<string>('0');
  const [edacsEcg, setEdacsEcg] = useState<string>('0');
  const [edacsTroponin, setEdacsTroponin] = useState<string>('0');

  // результаты
  const [heartScore, setHeartScore] = useState<number | null>(null);
  const [heartRisk, setHeartRisk] = useState<string>('');
  const [heartCategory, setHeartCategory] = useState<string>('');
  const [heartRecommendation, setHeartRecommendation] = useState<string>('');

  const [edacsScore, setEdacsScore] = useState<number | null>(null);
  const [edacsCategory, setEdacsCategory] = useState<string>('');
  const [edacsRecommendation, setEdacsRecommendation] = useState<string>('');

  const [error, setError] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Валидация EDACS возраста
    const ageNum = parseInt(edacsAge || '0', 10) || 0;
    if (!ageNum) {
      setError('Для расчета EDACS требуется возраст');
      return;
    }

    // Расчет HEART Score
    const historyNum = parseInt(history || '0', 10) || 0;
    const heartEcgNum = parseInt(heartEcg || '0', 10) || 0;
    const heartAgeNum = parseInt(heartAge || '0', 10) || 0;
    const riskFactorsNum = parseInt(riskFactors || '0', 10) || 0;
    const heartTroponinNum = parseInt(heartTroponin || '0', 10) || 0;

    const calculatedHeartScore = calculateHEART(
      historyNum,
      heartEcgNum,
      heartAgeNum,
      riskFactorsNum,
      heartTroponinNum
    );

    const heartRiskInfo = getHEARTRisk(calculatedHeartScore);

    setHeartScore(calculatedHeartScore);
    setHeartCategory(heartRiskInfo.category);
    setHeartRisk(heartRiskInfo.risk);
    setHeartRecommendation(heartRiskInfo.recommendation);

    // Расчет EDACS Score
    const sexNum = parseInt(sex || '0', 10) || 0;
    const symptomsNum = parseInt(symptoms || '0', 10) || 0;
    const edacsEcgNum = parseInt(edacsEcg || '0', 10) || 0;
    const edacsTroponinNum = parseInt(edacsTroponin || '0', 10) || 0;

    const calculatedEdacsScore = calculateEDACS(
      ageNum,
      sexNum,
      symptomsNum,
      edacsEcgNum,
      edacsTroponinNum
    );

    const edacsRiskInfo = getEDACSRisk(calculatedEdacsScore);

    setEdacsScore(calculatedEdacsScore);
    setEdacsCategory(edacsRiskInfo.category);
    setEdacsRecommendation(edacsRiskInfo.recommendation);
  };

  return (
    <main className="min-h-screen bg-[#fcfcee] py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* верх: заголовок + фильтр справа */}
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#015D52] mb-2">
              HEART / ED risk калькулятор
            </h1>
            <div className="rounded-2xl bg-[#f8f9fa] px-4 py-3 text-sm text-gray-800">
              <p>
                Быстрая оценка краткосрочного риска MACE в приёмном отделении, 
                включающая европейский HEART и международный EDACS.
              </p>
            </div>
          </div>

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
              value={selectedSpecialty}
              onChange={(e) => handleSpecialtyChange(e.target.value)}
            >
              {SPECIALTIES.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        </header>

        {error && (
          <div className="mb-4 rounded-2xl bg-rose-50 px-4 py-3 text-xs text-rose-800">
            {error}
          </div>
        )}

        {/* форма */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[#015D52]/40 bg-white/80 p-5 shadow-sm"
        >
          <div className="grid gap-8 md:grid-cols-2">
            {/* левая колонка — HEART Score */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-full bg-[#015D52] px-3 py-1 text-xs font-semibold text-white">
                  EU
                </div>
                <h2 className="text-xl font-bold text-[#015D52]">HEART Score</h2>
              </div>

              <div className="space-y-4 text-sm text-gray-800">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700">
                    Анамнез
                  </label>
                  <select
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                    value={history}
                    onChange={(e) => setHistory(e.target.value)}
                  >
                    <option value="0">Низкая вероятность (0 баллов)</option>
                    <option value="1">Умеренная вероятность (1 балл)</option>
                    <option value="2">Высокая вероятность (2 балла)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700">
                    ЭКГ
                  </label>
                  <select
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                    value={heartEcg}
                    onChange={(e) => setHeartEcg(e.target.value)}
                  >
                    <option value="0">Нормальная (0 баллов)</option>
                    <option value="1">Неспецифические изменения (1 балл)</option>
                    <option value="2">Значимая депрессия ST (2 балла)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700">
                    Возраст
                  </label>
                  <select
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                    value={heartAge}
                    onChange={(e) => setHeartAge(e.target.value)}
                  >
                    <option value="0">Моложе 45 лет (0 баллов)</option>
                    <option value="1">45–65 лет (1 балл)</option>
                    <option value="2">Старше 65 лет (2 балла)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700">
                    Факторы риска
                  </label>
                  <select
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                    value={riskFactors}
                    onChange={(e) => setRiskFactors(e.target.value)}
                  >
                    <option value="0">Нет или 1 фактор (0 баллов)</option>
                    <option value="1">2–3 фактора (1 балл)</option>
                    <option value="2">≥4 факторов (2 балла)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700">
                    Тропонин
                  </label>
                  <select
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                    value={heartTroponin}
                    onChange={(e) => setHeartTroponin(e.target.value)}
                  >
                    <option value="0">В пределах нормы (0 баллов)</option>
                    <option value="1">1–3× верхней границы нормы (1 балл)</option>
                    <option value="2">{'>'}3× верхней границы нормы (2 балла)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* правая колонка — EDACS */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-full bg-[#5E3830] px-3 py-1 text-xs font-semibold text-white">
                  US
                </div>
                <h2 className="text-xl font-bold text-[#5E3830]">EDACS Score</h2>
              </div>

              <div className="space-y-4 text-sm text-gray-800">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700">
                    Возраст (лет)<span className="text-rose-600"> *</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                    value={edacsAge}
                    onChange={(e) => setEdacsAge(e.target.value)}
                    placeholder="Введите возраст"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700">
                    Пол
                  </label>
                  <select
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                  >
                    <option value="0">Мужской (0 баллов)</option>
                    <option value="4">Женский (4 балла)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700">
                    Характер симптомов
                  </label>
                  <select
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                  >
                    <option value="0">Типичная боль в груди (0 баллов)</option>
                    <option value="3">Атипичные симптомы (3 балла)</option>
                    <option value="5">Боль в эпигастрии (5 баллов)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700">
                    ЭКГ
                  </label>
                  <select
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                    value={edacsEcg}
                    onChange={(e) => setEdacsEcg(e.target.value)}
                  >
                    <option value="0">Нормальная (0 баллов)</option>
                    <option value="2">Новые изменения (2 балла)</option>
                    <option value="4">Ишемические изменения (4 балла)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700">
                    Тропонин
                  </label>
                  <select
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                    value={edacsTroponin}
                    onChange={(e) => setEdacsTroponin(e.target.value)}
                  >
                    <option value="0">Нормальный (0 баллов)</option>
                    <option value="4">Повышенный (4 балла)</option>
                    <option value="6">Значительно повышенный (6 баллов)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-[#015D52] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#01433e]"
          >
            Рассчитать риски
          </button>
        </form>

        {/* результаты */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-[#e7f3ff] px-4 py-3 text-sm text-gray-800 border-2 border-[#015D52]">
            <h2 className="mb-2 text-base font-bold">🇪🇺 HEART Score</h2>

            {heartScore !== null && (
              <>
                <p className="text-xs text-gray-700 mb-1">
                  Результат: <span className="font-semibold">{heartScore} баллов</span>
                </p>
                <p>
                  Категория риска: <span className="font-semibold">{heartCategory}</span>
                </p>
                <p>
                  Риск MACE: <span className="font-semibold">{heartRisk}</span>
                </p>
                <p className="mt-2 text-xs text-gray-700">
                  Рекомендация: {heartRecommendation}
                </p>
              </>
            )}

            <p className="mt-3 text-[11px] text-gray-600">
              Диапазоны HEART: <span className="font-semibold">0-3</span> балла — низкий риск,{' '}
              <span className="font-semibold">4-6</span> — умеренный,{' '}
              <span className="font-semibold">7-10</span> — высокий риск.
            </p>
          </div>

          <div className="rounded-2xl bg-[#ffe7ee] px-4 py-3 text-sm text-gray-800 border-2 border-[#5E3830]">
            <h2 className="mb-2 text-base font-bold">🇺🇸 EDACS Score</h2>

            {edacsScore !== null && (
              <>
                <p className="text-xs text-gray-700 mb-1">
                  Результат: <span className="font-semibold">{edacsScore} баллов</span>
                </p>
                <p>
                  Категория риска: <span className="font-semibold">{edacsCategory}</span>
                </p>
                <p className="mt-2 text-xs text-gray-700">
                  Рекомендация: {edacsRecommendation}
                </p>
              </>
            )}

            <p className="mt-3 text-[11px] text-gray-600">
              Пороговое значение EDACS: <span className="font-semibold">16 баллов</span>.
              При результате {'<'}16 — низкий риск, возможна ранняя выписка.
            </p>
          </div>
        </div>

        <SupportM />
      </div>
    </main>
  );
}
