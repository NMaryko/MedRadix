// app/guides/acs/page.tsx - ПОЛНАЯ СТРАНИЦА ОКС
'use client';

import { useState } from 'react';
import { ArrowRight, Download, ExternalLink, AlertTriangle, Heart, Clock } from 'lucide-react';

export default function ACSPage() {
  const [selectedTab, setSelectedTab] = useState<'eu' | 'us' | 'comparison'>('eu');

  // Данные по алгоритмам
  const acsData = {
    diagnosis: "Острый коронарный синдром (ОКС)",
    
    eu_guideline: {
      name: "ESC 2023 Guidelines for ACS",
      source: "https://academic.oup.com/eurheartj/article/44/38/3720/7235365",
      lastUpdate: "2023-08-25"
    },
    
    us_guideline: {
      name: "ACC/AHA 2022 Guideline for ACS", 
      source: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000001102",
      lastUpdate: "2022-04-15"
    },

    // Европейский алгоритм
    eu_algorithm: {
      title: "Европейский алгоритм ESC 2023",
      steps: [
        {
          step: 1,
          title: "Первичная оценка",
          description: "ЭКГ в течение 10 мин, тропонины высокочувствительные",
          details: ["Оценка по шкале GRACE", "Экстренная стратификация риска"],
          time: "0-10 мин"
        },
        {
          step: 2, 
          title: "Стратификация по ЭКГ",
          description: "ST-подъем → экстренная реперфузия\nБез ST-подъема → ранняя инвазивная тактика",
          details: ["STEMI: ЧКВ <90 мин", "NSTEMI: ЧКВ <24 ч (высокий риск)"],
          time: "10-30 мин"
        },
        {
          step: 3,
          title: "Медикаментозная терапия",
          description: "Двойная антитромбоцитарная терапия + антикоагулянты",
          details: ["Аспирин 150-300 мг", "Клопидогрел 600 мг или Тикагрелор 180 мг", "Фондапаринукс или НФГ"],
          time: "0-30 мин"
        },
        {
          step: 4,
          title: "Инвазивная стратегия",
          description: "Ранняя ангиография у пациентов высокого риска",
          details: ["GRACE >140", "Динамика ST", "Рецидивирующая ишемия", "Гемодинамическая нестабильность"],
          time: "<24 ч"
        }
      ],
      visualization: `
        Поступление → ЭКГ за 10 мин → STEMI? 
          ├─ Да → ЧКВ за 90 мин
          └─ Нет → Оценка риска (GRACE)
                ├─ Высокий риск → ЧКВ за 24 ч  
                └─ Низкий риск → Консервативно
      `
    },

    // Американский алгоритм  
    us_algorithm: {
      title: "Американский алгоритм ACC/AHA 2022",
      steps: [
        {
          step: 1,
          title: "Первичная диагностика",
          description: "ЭКГ в течение 10 мин, тропонины",
          details: ["Оценка по TIMI Risk Score", "Быстрая стратификация"],
          time: "0-10 мин"
        },
        {
          step: 2,
          title: "Тактика при STEMI",
          description: "ЧКВ предпочтительнее тромболизиса",
          details: ["ЧКВ <90 мин", "При невозможности ЧКВ → тромболизис <30 мин"],
          time: "10-90 мин"
        },
        {
          step: 3, 
          title: "Антитромбоцитарная терапия",
          description: "Более агрессивный подход к ДАТТ",
          details: ["Аспирин 325 мг", "Тикагрелор 180 мг (предпочтительно)", "Прасугрел 60 мг как альтернатива"],
          time: "0-30 мин"
        },
        {
          step: 4,
          title: "Инвазивное лечение NSTEMI",
          description: "Более широкие показания к ранней инвазивной тактике",
          details: ["NSTEMI: ЧКВ <12-24 ч", "Расширенные критерии высокого риска"],
          time: "<24 ч"
        }
      ],
      visualization: `
        Поступление → ЭКГ за 10 мин → STEMI?
          ├─ Да → ЧКВ за 90 мин (предпочтительно)
          │       └─ Альтернатива: тромболизис за 30 мин
          └─ Нет → TIMI Risk Score
                ├─ Средний/высокий риск → ЧКВ за 12-24 ч
                └─ Низкий риск → Консервативно
      `
    },

    // Ключевые различия
    keyDifferences: [
      {
        aspect: "Дозировка аспирина",
        eu: "150-300 мг нагрузка",
        us: "325 мг нагрузка", 
        significance: "Более высокая нагрузочная доза в US"
      },
      {
        aspect: "Сроки ЧКВ при NSTEMI",
        eu: "<24 ч для высокого риска",
        us: "<12-24 ч для среднего/высокого риска", 
        significance: "Более агрессивные сроки в US"
      },
      {
        aspect: "Препараты ДАТТ",
        eu: "Клопидогрел или Тикагрелор",
        us: "Тикагрелор предпочтительнее",
        significance: "Более сильные антиагреганты в US"
      },
      {
        aspect: "Оценка риска",
        eu: "Шкала GRACE",
        us: "TIMI Risk Score", 
        significance: "Разные подходы к стратификации"
      }
    ],

    // Калькуляторы
    calculators: [
      {
        name: "GRACE Risk Score",
        description: "Оценка риска смертности при ОКС",
        parameters: ["Возраст", "ЧСС", "САД", "Креатинин", "Сердечная недостаточность", "ЭКГ изменения", "Повышение ферментов"],
        formula: "Сложная мультипликативная формула"
      },
      {
        name: "TIMI Risk Score", 
        description: "Стратификация риска при NSTEMI",
        parameters: ["Возраст ≥65", "≥3 фактора риска", "Стеноз КА >50%", "ЭКГ изменения", "≥2 приступов за 24ч", "Аспирин за 7 дней", "Повышение маркеров"],
        formula: "1 балл за каждый критерий (0-7)"
      }
    ],

    // Практические рекомендации
    practicalTips: [
      "При STEMI - время = миокард, экстренная реперфузия обязательна",
      "Тикагрелор предпочтительнее клопидогрела при высоком риске",
      "У пациентов высокого риска - ранняя инвазивная стратегия улучшает прогноз",
      "Длительность ДАТТ: 12 месяцев после ЧКВ, затем переоценка"
    ]
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {acsData.diagnosis}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Полное руководство по диагностике и лечению с сравнением европейских и американских рекомендаций
          </p>
        </div>

        {/* Навигация по табам */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setSelectedTab('eu')}
            className={`flex items-center px-6 py-3 border-b-2 font-medium text-lg ${
              selectedTab === 'eu'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <span>🇪🇺 ESC 2023</span>
          </button>
          <button
            onClick={() => setSelectedTab('us')}
            className={`flex items-center px-6 py-3 border-b-2 font-medium text-lg ${
              selectedTab === 'us'
                ? 'border-red-500 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <span>🇺🇸 ACC/AHA 2022</span>
          </button>
          <button
            onClick={() => setSelectedTab('comparison')}
            className={`flex items-center px-6 py-3 border-b-2 font-medium text-lg ${
              selectedTab === 'comparison'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <span>⚖️ Сравнение</span>
          </button>
        </div>

        {/* Контент табов */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {selectedTab === 'eu' && (
            <div>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {acsData.eu_algorithm.title}
                  </h2>
                  <p className="text-gray-600">
                    Европейское общество кардиологов • Обновлено {acsData.eu_guideline.lastUpdate}
                  </p>
                </div>
                <a
                  href={acsData.eu_guideline.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <ExternalLink size={16} />
                  Оригинальный гайд
                </a>
              </div>

              {/* Визуализация алгоритма */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <ArrowRight className="text-blue-500" />
                  Визуализация алгоритма
                </h3>
                <div className="font-mono text-sm bg-white p-4 rounded border">
                  <pre>{acsData.eu_algorithm.visualization}</pre>
                </div>
              </div>

              {/* Пошаговый алгоритм */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Пошаговый алгоритм лечения
                </h3>
                {acsData.eu_algorithm.steps.map((step) => (
                  <div key={step.step} className="flex gap-6 p-6 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.step}
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-sm text-blue-600">
                        <Clock size={14} />
                        {step.time}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h4>
                      <p className="text-gray-700 mb-3 whitespace-pre-line">
                        {step.description}
                      </p>
                      {step.details && (
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {step.details.map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'us' && (
            <div>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {acsData.us_algorithm.title}
                  </h2>
                  <p className="text-gray-600">
                    Американская коллегия кардиологов • Обновлено {acsData.us_guideline.lastUpdate}
                  </p>
                </div>
                <a
                  href={acsData.us_guideline.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <ExternalLink size={16} />
                  Оригинальный гайд
                </a>
              </div>

              {/* Визуализация алгоритма */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <ArrowRight className="text-red-500" />
                  Визуализация алгоритма
                </h3>
                <div className="font-mono text-sm bg-white p-4 rounded border">
                  <pre>{acsData.us_algorithm.visualization}</pre>
                </div>
              </div>

              {/* Пошаговый алгоритм */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Пошаговый алгоритм лечения
                </h3>
                {acsData.us_algorithm.steps.map((step) => (
                  <div key={step.step} className="flex gap-6 p-6 bg-red-50 rounded-xl border border-red-200">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.step}
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                        <Clock size={14} />
                        {step.time}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h4>
                      <p className="text-gray-700 mb-3 whitespace-pre-line">
                        {step.description}
                      </p>
                      {step.details && (
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {step.details.map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'comparison' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Сравнение EU vs US подходов
              </h2>

              {/* Ключевые различия */}
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <AlertTriangle className="text-yellow-500" />
                  Ключевые различия в подходах
                </h3>
                <div className="grid gap-4">
                  {acsData.keyDifferences.map((diff, index) => (
                    <div key={index} className="p-6 border-2 border-green-200 rounded-xl bg-green-50">
                      <h4 className="font-semibold text-lg text-gray-900 mb-3">
                        {diff.aspect}
                      </h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="font-semibold text-blue-600">🇪🇺 EU</div>
                          <div className="text-sm mt-1">{diff.eu}</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-red-600">🇺🇸 US</div>
                          <div className="text-sm mt-1">{diff.us}</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-green-600">Значимость</div>
                          <div className="text-sm mt-1">{diff.significance}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Калькуляторы */}
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Heart className="text-purple-500" />
                  Калькуляторы риска
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {acsData.calculators.map((calc, index) => (
                    <div key={index} className="p-6 border border-purple-200 rounded-xl bg-purple-50">
                      <h4 className="font-bold text-lg text-gray-900 mb-3">
                        {calc.name}
                      </h4>
                      <p className="text-gray-700 mb-4">{calc.description}</p>
                      <div className="mb-3">
                        <span className="font-semibold text-sm">Параметры:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {calc.parameters.map((param, idx) => (
                            <span key={idx} className="bg-white px-2 py-1 rounded text-xs border">
                              {param}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-2">
                        <Download size={16} />
                        Рассчитать {calc.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Практические рекомендации */}
              <div>
                <h3 className="text-2xl font-semibold mb-6">
                  Практические рекомендации
                </h3>
                <div className="grid gap-4">
                  {acsData.practicalTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-sm font-bold">!</span>
                      </div>
                      <p className="text-gray-800">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Информация об источниках */}
        <div className="bg-gray-800 text-white rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Источники и ссылки</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-300 mb-2">Европейские рекомендации</h4>
              <a href={acsData.eu_guideline.source} className="text-blue-200 hover:text-blue-100 underline break-all">
                {acsData.eu_guideline.source}
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-red-300 mb-2">Американские рекомендации</h4>
              <a href={acsData.us_guideline.source} className="text-red-200 hover:text-red-100 underline break-all">
                {acsData.us_guideline.source}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
