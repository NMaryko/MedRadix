// app/guides/acs/page.tsx - ПОЛНЫЙ КОД СО ВСЕМИ ВКЛАДКАМИ
'use client';

import { useState } from 'react';
import { ArrowRight, Download, ExternalLink, AlertTriangle, Heart, Clock, Stethoscope, Shield, Zap, Scale } from 'lucide-react';

// Типы для уровней доказательности
type EvidenceLevel = 'A' | 'B' | 'C';

interface Evidence {
  level: EvidenceLevel;
  description: string;
}

const EVIDENCE_LEVELS: Record<EvidenceLevel, { name: string; color: string }> = {
  'A': { name: 'Высокий уровень', color: 'bg-green-100 text-green-800 border-green-300' },
  'B': { name: 'Средний уровень', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  'C': { name: 'Низкий уровень', color: 'bg-red-100 text-red-800 border-red-300' }
};

export default function ACSPage() {
  const [selectedTab, setSelectedTab] = useState<'eu' | 'us' | 'comparison'>('eu');

  // Расширенные данные по ОКС
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

    // ДИАГНОСТИКА
    diagnosis_section: {
      title: "Диагностика ОКС",
      criteria: {
        clinical: [
          { item: "Типичная боль в груди >20 мин", level: 'A' as EvidenceLevel },
          { item: "Иррадиация в левую руку, шею, челюсть", level: 'A' as EvidenceLevel },
          { item: "Сопутствующая одышка, тошнота, потливость", level: 'B' as EvidenceLevel }
        ],
        ecg: [
          { item: "ST-элевация ≥1 мм в двух смежных отведениях", level: 'A' as EvidenceLevel },
          { item: "Новая блокада левой ножки пучка Гиса", level: 'A' as EvidenceLevel },
          { item: "ST-депрессия ≥0.5 мм", level: 'A' as EvidenceLevel },
          { item: "Инверсия зубцов T ≥2 мм", level: 'B' as EvidenceLevel }
        ],
        biomarkers: [
          { item: "Повышение высокочувствительного тропонина выше 99 перцентиля", level: 'A' as EvidenceLevel },
          { item: "Динамика тропонина: ↑≥20% за 3-6 часов", level: 'A' as EvidenceLevel },
          { item: "Повышение КФК-МВ, миоглобина", level: 'B' as EvidenceLevel }
        ]
      },
      differential: [
        "Перикардит (боль зависит от положения тела)",
        "ТЭЛА (одышка, гипоксия, правосторонняя ЭКГ)",
        "Расслоение аорты (мигрирующая боль, асимметрия АД)",
        "Острый панкреатит (амилаза, липаза)",
        "Костно-мышечная боль (зависит от движения)"
      ]
    },

    // ЕВРОПЕЙСКИЙ АЛГОРИТМ
    eu_algorithm: {
      title: "Европейский алгоритм ESC 2023",
      steps: [
        {
          step: 1,
          title: "Первичная оценка и диагностика",
          description: "ЭКГ в течение 10 мин + тропонины высокочувствительные",
          details: [
            { item: "Оценка по шкале GRACE", level: 'A' as EvidenceLevel },
            { item: "Экстренная стратификация риска", level: 'A' as EvidenceLevel }
          ],
          time: "0-10 мин",
          evidence: 'A' as EvidenceLevel
        },
        {
          step: 2, 
          title: "Стратификация по ЭКГ и тактика",
          description: "ST-подъем → экстренная реперфузия\nБез ST-подъема → ранняя инвазивная тактика",
          details: [
            { item: "STEMI: ЧКВ <90 мин от первого контакта", level: 'A' as EvidenceLevel },
            { item: "NSTEMI высокого риска: ЧКВ <24 ч", level: 'A' as EvidenceLevel },
            { item: "NSTEMI низкого риска: консервативная тактика", level: 'B' as EvidenceLevel }
          ],
          time: "10-30 мин",
          evidence: 'A' as EvidenceLevel
        },
        {
          step: 3,
          title: "Медикаментозная терапия",
          description: "Двойная антитромбоцитарная терапия + антикоагулянты",
          details: [
            { item: "Аспирин 150-300 мг нагрузка", level: 'A' as EvidenceLevel },
            { item: "Клопидогрел 600 мг или Тикагрелор 180 мг", level: 'A' as EvidenceLevel },
            { item: "Фондапаринукс 2.5 мг п/к или НФГ", level: 'A' as EvidenceLevel },
            { item: "Статин высокой интенсивности", level: 'A' as EvidenceLevel }
          ],
          time: "0-30 мин",
          evidence: 'A' as EvidenceLevel
        }
      ]
    },

    // АМЕРИКАНСКИЙ АЛГОРИТМ
    us_algorithm: {
      title: "Американский алгоритм ACC/AHA 2022",
      steps: [
        {
          step: 1,
          title: "Первичная диагностика и оценка",
          description: "ЭКГ в течение 10 мин + тропонины",
          details: [
            { item: "Оценка по TIMI Risk Score", level: 'A' as EvidenceLevel },
            { item: "Быстрая стратификация риска", level: 'A' as EvidenceLevel }
          ],
          time: "0-10 мин",
          evidence: 'A' as EvidenceLevel
        },
        {
          step: 2,
          title: "Тактика реперфузии при STEMI",
          description: "ЧКВ предпочтительнее тромболизиса",
          details: [
            { item: "ЧКВ <90 мин от первого контакта", level: 'A' as EvidenceLevel },
            { item: "При невозможности ЧКВ → тромболизис <30 мин", level: 'A' as EvidenceLevel },
            { item: "Трансфер в ЧКВ-центр при задержках", level: 'B' as EvidenceLevel }
          ],
          time: "10-90 мин",
          evidence: 'A' as EvidenceLevel
        },
        {
          step: 3, 
          title: "Антитромбоцитарная терапия",
          description: "Более агрессивный подход к ДАТТ",
          details: [
            { item: "Аспирин 325 мг нагрузка", level: 'A' as EvidenceLevel },
            { item: "Тикагрелор 180 мг (предпочтительно)", level: 'A' as EvidenceLevel },
            { item: "Прасугрел 60 мг как альтернатива", level: 'A' as EvidenceLevel },
            { item: "Эноксапарин или Бивалирудин", level: 'B' as EvidenceLevel }
          ],
          time: "0-30 мин",
          evidence: 'A' as EvidenceLevel
        }
      ]
    },

    // ВТОРИЧНАЯ ПРОФИЛАКТИКА
    secondary_prevention: {
      eu: {
        medications: [
          { item: "ДАТТ: 12 месяцев после ЧКВ", level: 'A' as EvidenceLevel },
          { item: "Статины высокой интенсивности", level: 'A' as EvidenceLevel },
          { item: "Бета-блокаторы (метопролол, бисопролол)", level: 'A' as EvidenceLevel },
          { item: "ИАПФ/БРА при СН или дисфункции ЛЖ", level: 'A' as EvidenceLevel }
        ]
      },
      us: {
        medications: [
          { item: "ДАТТ: 12 месяцев после ЧКВ", level: 'A' as EvidenceLevel },
          { item: "Статины высокой интенсивности", level: 'A' as EvidenceLevel },
          { item: "Бета-блокаторы", level: 'A' as EvidenceLevel },
          { item: "ИАПФ/БРА при СН, СД, ХБП", level: 'A' as EvidenceLevel }
        ]
      }
    },

    // КЛЮЧЕВЫЕ РАЗЛИЧИЯ
    keyDifferences: [
      {
        aspect: "Дозировка аспирина",
        eu: "150-300 мг нагрузка",
        us: "325 мг нагрузка", 
        significance: "Более высокая нагрузочная доза в US",
        evidence_eu: 'A' as EvidenceLevel,
        evidence_us: 'A' as EvidenceLevel
      },
      {
        aspect: "Сроки ЧКВ при NSTEMI",
        eu: "<24 ч для высокого риска", 
        us: "<12-24 ч для среднего/высокого риска",
        significance: "Более агрессивные сроки в US",
        evidence_eu: 'A' as EvidenceLevel,
        evidence_us: 'A' as EvidenceLevel
      },
      {
        aspect: "Препараты ДАТТ",
        eu: "Клопидогрел или Тикагрелор",
        us: "Тикагрелор предпочтительнее",
        significance: "Более сильные антиагреганты в US", 
        evidence_eu: 'A' as EvidenceLevel,
        evidence_us: 'A' as EvidenceLevel
      },
      {
        aspect: "Оценка риска",
        eu: "Шкала GRACE",
        us: "TIMI Risk Score", 
        significance: "Разные подходы к стратификации",
        evidence_eu: 'A' as EvidenceLevel,
        evidence_us: 'A' as EvidenceLevel
      }
    ],

    // КАЛЬКУЛЯТОРЫ
    calculators: [
      {
        name: "GRACE Risk Score",
        description: "Оценка риска смертности при ОКС",
        parameters: ["Возраст", "ЧСС", "САД", "Креатинин", "Сердечная недостаточность", "ЭКГ изменения", "Повышение ферментов"],
        level: 'A' as EvidenceLevel
      },
      {
        name: "TIMI Risk Score", 
        description: "Стратификация риска при NSTEMI",
        parameters: ["Возраст ≥65", "≥3 фактора риска", "Стеноз КА >50%", "ЭКГ изменения", "≥2 приступов за 24ч", "Аспирин за 7 дней", "Повышение маркеров"],
        level: 'A' as EvidenceLevel
      }
    ]
  };

  // Компонент для отображения уровня доказательности
  const EvidenceBadge = ({ level }: { level: EvidenceLevel }) => (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${EVIDENCE_LEVELS[level].color}`}>
      Уровень {level}
    </span>
  );

  // Компонент шага алгоритма
  const AlgorithmStep = ({ step, color }: { step: any; color: string }) => (
    <div className={`flex gap-6 p-6 ${color} rounded-xl border ${color.replace('bg-', 'border-')}200`}>
      <div className="flex flex-col items-center">
        <div className={`w-12 h-12 ${color.replace('bg-', 'bg-').replace('-50', '-500')} text-white rounded-full flex items-center justify-center font-bold text-lg`}>
          {step.step}
        </div>
        <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
          <Clock size={14} />
          {step.time}
        </div>
        <EvidenceBadge level={step.evidence} />
      </div>
      <div className="flex-1">
        <h4 className="text-xl font-semibold text-gray-900 mb-2">
          {step.title}
        </h4>
        <p className="text-gray-700 mb-3 whitespace-pre-line">
          {step.description}
        </p>
        <ul className="space-y-2">
          {step.details.map((detail: any, idx: number) => (
            <li key={idx} className="flex justify-between items-center bg-white rounded-lg px-3 py-2">
              <span className="text-gray-700">{detail.item}</span>
              <EvidenceBadge level={detail.level} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {acsData.diagnosis}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Полное руководство по диагностике и лечению с сравнением EU vs US рекомендаций
          </p>
        </div>

        {/* Навигация по табам */}
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
          <button onClick={() => setSelectedTab('eu')} className={`flex items-center px-6 py-3 border-b-2 font-medium text-lg whitespace-nowrap ${selectedTab === 'eu' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}>
            <span>🇪🇺 ESC 2023</span>
          </button>
          <button onClick={() => setSelectedTab('us')} className={`flex items-center px-6 py-3 border-b-2 font-medium text-lg whitespace-nowrap ${selectedTab === 'us' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500'}`}>
            <span>🇺🇸 ACC/AHA 2022</span>
          </button>
          <button onClick={() => setSelectedTab('comparison')} className={`flex items-center px-6 py-3 border-b-2 font-medium text-lg whitespace-nowrap ${selectedTab === 'comparison' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500'}`}>
            <span>⚖️ Сравнение EU/US</span>
          </button>
        </div>

        {/* Контент табов */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {/* EU ВКЛАДКА */}
          {selectedTab === 'eu' && (
            <div className="space-y-12">
              {/* ДИАГНОСТИКА */}
              <section>
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Stethoscope className="text-blue-500" />
                    Диагностика ОКС - ESC 2023
                  </h2>
                  <a href={acsData.eu_guideline.source} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    <ExternalLink size={16} />
                    Оригинальный гайд
                  </a>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-blue-800">Клинические критерии</h3>
                    <ul className="space-y-3">
                      {acsData.diagnosis_section.criteria.clinical.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-start">
                          <span className="text-gray-700">{item.item}</span>
                          <EvidenceBadge level={item.level} />
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-green-800">ЭКГ критерии</h3>
                    <ul className="space-y-3">
                      {acsData.diagnosis_section.criteria.ecg.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-start">
                          <span className="text-gray-700">{item.item}</span>
                          <EvidenceBadge level={item.level} />
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-purple-800">Биомаркеры</h3>
                    <ul className="space-y-3">
                      {acsData.diagnosis_section.criteria.biomarkers.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-start">
                          <span className="text-gray-700">{item.item}</span>
                          <EvidenceBadge level={item.level} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* ЛЕЧЕНИЕ */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Zap className="text-blue-500" />
                  Алгоритм лечения ESC 2023
                </h2>

                <div className="space-y-6">
                  {acsData.eu_algorithm.steps.map((step) => (
                    <AlgorithmStep key={step.step} step={step} color="bg-blue-50" />
                  ))}
                </div>
              </section>

              {/* ПРОФИЛАКТИКА */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Shield className="text-blue-500" />
                  Вторичная профилактика - ESC
                </h2>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-800">Медикаментозная терапия</h3>
                  <ul className="space-y-3">
                    {acsData.secondary_prevention.eu.medications.map((item, idx) => (
                      <li key={idx} className="flex justify-between items-center bg-white rounded-lg px-4 py-3">
                        <span className="text-gray-700">{item.item}</span>
                        <EvidenceBadge level={item.level} />
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          )}

          {/* US ВКЛАДКА */}
          {selectedTab === 'us' && (
            <div className="space-y-12">
              {/* ДИАГНОСТИКА */}
              <section>
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Stethoscope className="text-red-500" />
                    Диагностика ОКС - ACC/AHA 2022
                  </h2>
                  <a href={acsData.us_guideline.source} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                    <ExternalLink size={16} />
                    Оригинальный гайд
                  </a>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-red-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-red-800">Клинические критерии</h3>
                    <ul className="space-y-3">
                      {acsData.diagnosis_section.criteria.clinical.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-start">
                          <span className="text-gray-700">{item.item}</span>
                          <EvidenceBadge level={item.level} />
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-orange-800">ЭКГ критерии</h3>
                    <ul className="space-y-3">
                      {acsData.diagnosis_section.criteria.ecg.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-start">
                          <span className="text-gray-700">{item.item}</span>
                          <EvidenceBadge level={item.level} />
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-pink-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-pink-800">Биомаркеры</h3>
                    <ul className="space-y-3">
                      {acsData.diagnosis_section.criteria.biomarkers.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-start">
                          <span className="text-gray-700">{item.item}</span>
                          <EvidenceBadge level={item.level} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* ЛЕЧЕНИЕ */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Zap className="text-red-500" />
                  Алгоритм лечения ACC/AHA 2022
                </h2>

                <div className="space-y-6">
                  {acsData.us_algorithm.steps.map((step) => (
                    <AlgorithmStep key={step.step} step={step} color="bg-red-50" />
                  ))}
                </div>
              </section>

              {/* ПРОФИЛАКТИКА */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Shield className="text-red-500" />
                  Вторичная профилактика - ACC/AHA
                </h2>

                <div className="bg-red-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-red-800">Медикаментозная терапия</h3>
                  <ul className="space-y-3">
                    {acsData.secondary_prevention.us.medications.map((item, idx) => (
                      <li key={idx} className="flex justify-between items-center bg-white rounded-lg px-4 py-3">
                        <span className="text-gray-700">{item.item}</span>
                        <EvidenceBadge level={item.level} />
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          )}

          {/* СРАВНЕНИЕ EU/US */}
          {selectedTab === 'comparison' && (
            <div className="space-y-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Scale className="text-green-500" />
                Сравнение EU vs US подходов
              </h2>

              {/* КЛЮЧЕВЫЕ РАЗЛИЧИЯ */}
              <section>
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <AlertTriangle className="text-yellow-500" />
                  Ключевые различия в подходах
                </h3>
                <div className="grid gap-6">
                  {acsData.keyDifferences.map((diff, index) => (
                    <div key={index} className="p-6 border-2 border-green-200 rounded-xl bg-green-50">
                      <h4 className="font-semibold text-lg text-gray-900 mb-4">
                        {diff.aspect}
                      </h4>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="font-semibold text-blue-600 mb-2">🇪🇺 ESC</div>
                          <div className="text-gray-700 mb-2">{diff.eu}</div>
                          <EvidenceBadge level={diff.evidence_eu} />
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-red-600 mb-2">🇺🇸 ACC/AHA</div>
                          <div className="text-gray-700 mb-2">{diff.us}</div>
                          <EvidenceBadge level={diff.evidence_us} />
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-green-600 mb-2">Клиническая значимость</div>
                          <div className="text-gray-700">{diff.significance}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* КАЛЬКУЛЯТОРЫ */}
              <section>
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Heart className="text-purple-500" />
                  Калькуляторы риска
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {acsData.calculators.map((calc, index) => (
                    <div key={index} className="p-6 border border-purple-200 rounded-xl bg-purple-50">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-lg text-gray-900">
                          {calc.name}
                        </h4>
                        <EvidenceBadge level={calc.level} />
                      </div>
                      <p className="text-gray-700 mb-4">{calc.description}</p>
                      <div className="mb-4">
                        <span className="font-semibold text-sm text-gray-600">Параметры:</span>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {calc.parameters.map((param, idx) => (
                            <span key={idx} className="bg-white px-2 py-1 rounded text-xs border border-gray-300">
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
              </section>

              {/* ПРАКТИЧЕСКИЕ ВЫВОДЫ */}
              <section>
                <h3 className="text-2xl font-semibold mb-6">Практические выводы для клинициста</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-800 mb-3">Когда следовать EU подходу?</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• При доступности GRACE score</li>
                      <li>• При консервативной тактике ведения</li>
                      <li>• В условиях ограниченных ресурсов</li>
                      <li>• При использовании клопидогрела</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 rounded-xl p-6">
                    <h4 className="font-semibold text-red-800 mb-3">Когда следовать US подходу?</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• При необходимости агрессивной тактики</li>
                      <li>• При доступности тикагрелора/прасугрела</li>
                      <li>• В условиях быстрого доступа к ЧКВ</li>
                      <li>• При использовании TIMI score</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Легенда уровней доказательности */}
        <div className="bg-gray-800 text-white rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Уровни доказательности</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">A</div>
              <p className="text-green-300 font-semibold">Высокий уровень</p>
              <p className="text-green-200 text-sm">Мета-анализы, РКИ</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">B</div>
              <p className="text-yellow-300 font-semibold">Средний уровень</p>
              <p className="text-yellow-200 text-sm">Когортные исследования</p>
            </div>
            <div className="text-center">
              <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">C</div>
              <p className="text-red-300 font-semibold">Низкий уровень</p>
              <p className="text-red-200 text-sm">Экспертные мнения</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}




