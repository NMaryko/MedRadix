'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const SPECIALTIES: string[] = [
  'Все',
  'Акушерство и гинекология',
  'Аллергология и иммунология',
  'Анестезиология и реаниматология',
  'Гастроэнтерология',
  'Гематология',
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

// конвертация мкмоль/л → мг/дл
function convertCreatinineToMgDL(creatinineMcmolL: number): number {
  return creatinineMcmolL / 88.4;
}

// категория риска по GRACE (грубо по порогам)
function getGraceRiskCategory(score: number): 'низкий' | 'промежуточный' | 'высокий' {
  if (score < 100) return 'низкий';
  if (score < 140) return 'промежуточный';
  return 'высокий';
}

function getGraceRiskDescription(
  score: number,
  hospitalRisk: number,
  sixMonthRisk: number
): { categoryLabel: string; text: string } {
  const category = getGraceRiskCategory(score);
  const map: Record<typeof category, string> = {
    низкий: 'низкий риск',
    промежуточный: 'промежуточный риск',
    высокий: 'высокий риск',
  } as const;

  const categoryLabel = map[category];

  const text = `Ориентировочная внутрибольничная летальность ≈ ${hospitalRisk}%, 6-месячная ≈ ${sixMonthRisk}% — ${categoryLabel}.`;

  return { categoryLabel, text };
}

export default function GraceTimiCalculatorPage() {
  const router = useRouter();

  // фильтр справа
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<string>('Кардиология');

  const handleSpecialtyChange = (value: string) => {
    setSelectedSpecialty(value);
    if (value !== 'Кардиология') {
      router.push('/calculators');
    }
  };

  // входные данные (все в европейских единицах)
  const [age, setAge] = useState<string>('');
  const [heartRate, setHeartRate] = useState<string>('');
  const [systolicBP, setSystolicBP] = useState<string>('');
  const [creatinine, setCreatinine] = useState<string>('');
  const [heartFailure, setHeartFailure] = useState<string>('');
  const [ecg, setEcg] = useState<string>('0');
  const [troponin, setTroponin] = useState<string>('0');

  // результаты GRACE
  const [graceHospital, setGraceHospital] = useState<string>('-');
  const [graceSixMonth, setGraceSixMonth] = useState<string>('-');
  const [graceError, setGraceError] = useState<string>('');
  const [graceScoreValue, setGraceScoreValue] = useState<number | null>(null);
  const [graceRiskLabel, setGraceRiskLabel] = useState<string>('');
  const [graceSummary, setGraceSummary] = useState<string>('');

  // результаты TIMI
  const [timiScore, setTimiScore] = useState<number | null>(null);
  const [timiRisk, setTimiRisk] = useState<string>('-');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const ageNum = parseInt(age || '0', 10) || 0;
    const heartRateNum = parseInt(heartRate || '0', 10) || 0;
    const systolicBPNum = parseInt(systolicBP || '0', 10) || 0;
    const creatinineMcmolL = parseInt(creatinine || '0', 10) || 0;
    const heartFailureVal = heartFailure; // '0' | '1' | ''

    setGraceError('');

    // --- проверка обязательных полей для GRACE ---
    const missingFields: string[] = [];
    if (!ageNum) missingFields.push('Возраст');
    if (!heartRateNum) missingFields.push('ЧСС');
    if (!systolicBPNum) missingFields.push('САД');
    if (!creatinineMcmolL) missingFields.push('Креатинин');
    if (!heartFailureVal && heartFailureVal !== '0') {
      missingFields.push('Сердечная недостаточность');
    }

    // --- TIMI считаем ВСЕГДА (mg/dL) ---
    const creatinineMgDL = convertCreatinineToMgDL(creatinineMcmolL);
    const timi = calculateTIMI(
      ageNum,
      heartRateNum,
      systolicBPNum,
      creatinineMgDL,
      heartFailureVal
    );
    const timiRiskPercent = calculateTIMIRisk(timi);

    setTimiScore(timi);
    setTimiRisk(`${timiRiskPercent}%`);

    // --- если не хватает полей для GRACE ---
    if (missingFields.length > 0) {
      setGraceHospital('-');
      setGraceSixMonth('-');
      setGraceScoreValue(null);
      setGraceRiskLabel('');
      setGraceSummary('');
      setGraceError(
        `Заполните обязательные поля: ${missingFields.join(', ')}`
      );
      return;
    }

    const ecgVal = parseInt(ecg || '0', 10) || 0;
    const troponinVal = parseInt(troponin || '0', 10) || 0;

    const graceScore = calculateGRACE(
      ageNum,
      heartRateNum,
      systolicBPNum,
      creatinineMcmolL,
      heartFailureVal,
      ecgVal,
      troponinVal
    );
    const graceHospitalRisk = calculateGraceHospitalRisk(graceScore);
    const graceSixMonthRisk = calculateGraceSixMonthRisk(graceScore);

    const { categoryLabel, text } = getGraceRiskDescription(
      graceScore,
      graceHospitalRisk,
      graceSixMonthRisk
    );

    setGraceScoreValue(graceScore);
    setGraceHospital(`${graceHospitalRisk}%`);
    setGraceSixMonth(`${graceSixMonthRisk}%`);
    setGraceRiskLabel(categoryLabel);
    setGraceSummary(text);
  };

  // ---- ЛОГИКА GRACE / TIMI (упрощённая) ----

  function calculateGRACE(
    age: number,
    heartRate: number,
    systolicBP: number,
    creatinineMcmolL: number,
    heartFailure: string,
    ecg: number,
    troponin: number
  ): number {
    let score = 0;

    // возраст
    if (age < 40) score += 0;
    else if (age < 50) score += 18;
    else if (age < 60) score += 36;
    else if (age < 70) score += 55;
    else if (age < 80) score += 73;
    else score += 91;

    // ЧСС
    if (heartRate < 70) score += 0;
    else if (heartRate < 90) score += 3;
    else if (heartRate < 110) score += 9;
    else if (heartRate < 150) score += 15;
    else score += 24;

    // САД
    if (systolicBP < 80) score += 24;
    else if (systolicBP < 100) score += 18;
    else if (systolicBP < 120) score += 12;
    else if (systolicBP < 140) score += 6;
    else score += 0;

    // креатинин (мкмоль/л)
    if (creatinineMcmolL > 150) score += 20;
    else if (creatinineMcmolL > 100) score += 10;
    else score += 0;

    // СН, ЭКГ, тропонин
    score += parseInt(heartFailure || '0', 10) * 28;
    score += ecg * 28;
    score += troponin * 15;

    return score;
  }

  function calculateGraceHospitalRisk(score: number): number {
    if (score < 100) return 1;
    if (score < 140) return 3;
    return 8;
  }

  function calculateGraceSixMonthRisk(score: number): number {
    if (score < 100) return 3;
    if (score < 140) return 8;
    return 25;
  }

  function calculateTIMI(
    age: number,
    heartRate: number,
    systolicBP: number,
    creatinineMgDL: number,
    heartFailure: string
  ): number {
    let score = 0;

    if (age >= 65) score += 1;
    if (heartRate > 100) score += 1;
    if (systolicBP < 100) score += 1;
    if (creatinineMgDL > 1.2) score += 1;
    if (heartFailure === '1') score += 1;

    return score;
  }

  function calculateTIMIRisk(score: number): number {
    const risks = [5, 8, 13, 20, 26, 40];
    return risks[score] ?? 50;
  }

  // ---- РЕНДЕР ----

  return (
    <main className="min-h-screen bg-[#fcfcee] py-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* верх: заголовок + фильтр справа */}
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#015D52] mb-2">
              GRACE/TIMI калькулятор 2 в 1
            </h1>
            <div className="rounded-2xl bg-[#f8f9fa] px-4 py-3 text-sm text-gray-800">
              <p>
                <strong>*</strong> — обязательные поля для расчёта{' '}
                <span className="font-semibold">GRACE</span>.
              </p>
              <p>
                Все значения вводятся в{' '}
                <span className="font-semibold">европейских единицах</span>, креатинин
                автоматически конвертируется в мг/дл для TIMI (🇺🇸).
              </p>
            </div>
          </div>

          <div className="w-full md:w-80">
            <label
              htmlFor="specialty-select"
              className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700"
            >
              Специальность
            </label>
            <select
              id="specialty-select"
              className="w-full rounded-xl border border-[#015D52] bg-white/90 px-3 py-2 text-sm text-gray-900 text-center shadow-sm transition hover:border-[#015D52] hover:ring-2 hover:ring-[#015D52]/20 focus:border-[#015D52] focus:outline-none focus:ring-2 focus:ring-[#015D52]/30"
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

        {graceError && (
          <div className="mb-4 rounded-2xl bg-rose-50 px-4 py-3 text-xs text-rose-800">
            {graceError}
          </div>
        )}

        {/* форма */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[#015D52]/40 bg-white/80 p-5 shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {/* левая колонка — обязательные поля (*) */}
            <div className="space-y-3 text-sm text-gray-800">
              <div className="flex items-center gap-2">
                <label className="w-44 text-xs font-semibold text-gray-700">
                  Возраст (лет)<span className="text-rose-600"> *</span>
                </label>
                <input
                  type="number"
                  min={0}
                  className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="w-44 text-xs font-semibold text-gray-700">
                  ЧСС (уд/мин)<span className="text-rose-600"> *</span>
                </label>
                <input
                  type="number"
                  min={0}
                  className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm"
                  value={heartRate}
                  onChange={(e) => setHeartRate(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="w-44 text-xs font-semibold text-gray-700">
                  САД (мм рт.ст.)<span className="text-rose-600"> *</span>
                </label>
                <input
                  type="number"
                  min={0}
                  className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm"
                  value={systolicBP}
                  onChange={(e) => setSystolicBP(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="w-44 text-xs font-semibold text-gray-700">
                  Креатинин (мкмоль/л)<span className="text-rose-600"> *</span>
                </label>
                <div className="flex-1">
                  <input
                    type="number"
                    min={0}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                    value={creatinine}
                    onChange={(e) => setCreatinine(e.target.value)}
                  />
                  <div className="mt-1 text-[11px] italic text-gray-500">
                    автоматически конвертируется в мг/дл для TIMI
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="w-44 text-xs font-semibold text-gray-700">
                  Сердечная недостаточность<span className="text-rose-600"> *</span>
                </label>
                <select
                  className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm"
                  value={heartFailure}
                  onChange={(e) => setHeartFailure(e.target.value)}
                >
                  <option value="">Выберите</option>
                  <option value="0">Нет</option>
                  <option value="1">Да</option>
                </select>
              </div>
            </div>

            {/* правая колонка — доп. поля + пояснение */}
            <div className="space-y-3 text-sm text-gray-800">
              <div className="flex items-center gap-2">
                <label className="w-44 text-xs font-semibold text-gray-700">
                  ЭКГ (подъём ST)
                </label>
                <select
                  className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm"
                  value={ecg}
                  onChange={(e) => setEcg(e.target.value)}
                >
                  <option value="0">Нет</option>
                  <option value="1">Да</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="w-44 text-xs font-semibold text-gray-700">
                  Тропонин
                </label>
                <select
                  className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm"
                  value={troponin}
                  onChange={(e) => setTroponin(e.target.value)}
                >
                  <option value="0">Норма</option>
                  <option value="1">Повышен</option>
                </select>
              </div>

              <p className="mt-4 text-[11px] text-gray-600">
                TIMI (🇺🇸) рассчитывается всегда на основе введённых значений (с учётом
                конвертации креатинина). GRACE (🇪🇺) рассчитывается только при
                заполнении всех полей, отмеченных
                <span className="text-rose-600"> *</span>.
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-[#015D52] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#01433e]"
          >
            Рассчитать
          </button>
        </form>

        {/* результаты */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-[#f0f8ff] px-4 py-3 text-sm text-gray-800 border-2 border-[#007bff]">
            <h2 className="mb-2 text-base font-bold">🇪🇺 GRACE 2.0</h2>

            {graceScoreValue !== null && (
              <p className="text-xs text-gray-700 mb-1">
                Результат:{' '}
                <span className="font-semibold">
                  {graceScoreValue} баллов
                </span>
                {graceRiskLabel && (
                  <>
                    {' '}
                    (<span className="font-semibold">{graceRiskLabel}</span>)
                  </>
                )}
              </p>
            )}

            <p>
              Госпитальная смертность:{' '}
              <span className="font-semibold">{graceHospital}</span>
            </p>
            <p>
              6-месячная смертность:{' '}
              <span className="font-semibold">{graceSixMonth}</span>
            </p>

            {graceSummary && (
              <p className="mt-2 text-xs text-gray-700">{graceSummary}</p>
            )}

            {graceError && (
              <p className="mt-2 text-xs text-[#dc3545]">{graceError}</p>
            )}
          </div>

          <div className="rounded-2xl bg-[#fff0f5] px-4 py-3 text-sm text-gray-800 border-2 border-[#dc3545]">
            <h2 className="mb-2 text-base font-bold">🇺🇸 TIMI Risk Score</h2>
            <p>
              Баллы:{' '}
              <span className="font-semibold">
                {timiScore !== null ? timiScore : '-'}
              </span>
            </p>
            <p>
              14-дневный риск:{' '}
              <span className="font-semibold">{timiRisk}</span>
            </p>
            <p className="mt-1 text-[11px] italic text-gray-600">
              креатинин автоматически конвертирован в мг/дл для TIMI
            </p>
          </div>
        </div>

        {/* support снизу по центру */}
        <footer className="mt-[500px] pt-4 text-base text-[#5E3830] text-center">
          <a href="mailto:support@medradix.info" className="font-semibold">
            support@medradix.info
          </a>
        </footer>
      </div>
    </main>
  );
}
