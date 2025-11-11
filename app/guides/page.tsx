// app/guides/acs/page.tsx - РАСШИРЕННАЯ ВЕРСИЯ С УРОВНЯМИ ДОКАЗАТЕЛЬСТВИ
'use client';

import { useState } from 'react';
import { ArrowRight, Download, ExternalLink, AlertTriangle, Heart, Clock, Stethoscope, Shield, Zap } from 'lucide-react';

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

    // ДИАГНОСТИКА - НОВЫЙ РАЗДЕЛ
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
      ],
      risk_scores: [
        {
          name: "GRACE Risk Score",
          purpose: "Оценка госпитальной и 6-месячной смертности",
          parameters: ["Возраст", "ЧСС", "САД", "Креатинин", "СН", "ЭКГ", "Ферменты"],
          level: 'A' as EvidenceLevel
        },
        {
          name: "TIMI Risk Score",
          purpose: "Стратификация при NSTEMI",
          parameters: ["Возраст ≥65", "≥3 ФР ССЗ", "Стеноз КА", "ЭКГ", "≥2 приступов", "Аспирин", "Маркеры"],
          level: 'A' as EvidenceLevel
        }
      ]
    },

    // ЛЕЧЕНИЕ - РАСШИРЕННАЯ ВЕРСИЯ
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
        },
        {
          step: 4,
          title: "Инвазивная стратегия и реперфузия",
          description: "Ранняя ангиография у пациентов высокого риска",
          details: [
            { item: "GRACE >140", level: 'A' as EvidenceLevel },
            { item: "Динамика ST-сегмента", level: 'A' as EvidenceLevel },
            { item: "Рецидивирующая ишемия", level: 'B' as EvidenceLevel },
            { item: "Гемодинамическая нестабильность", level: 'A' as EvidenceLevel }
          ],
          time: "<24 ч",
          evidence: 'A' as EvidenceLevel
        }
      ]
    },

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
          title: "Антитромбоцитарная и антикоагулянтная терапия",
          description: "Более агрессивный подход к ДАТТ",
          details: [
            { item: "Аспирин 325 мг нагрузка", level: 'A' as EvidenceLevel },
            { item: "Тикагрелор 180 мг (предпочтительно)", level: 'A' as EvidenceLevel },
            { item: "Прасугрел 60 мг как альтернатива", level: 'A' as EvidenceLevel },
            { item: "Эноксапарин или Бивалирудин", level: 'B' as EvidenceLevel }
          ],
          time: "0-30 мин",
          evidence: 'A' as EvidenceLevel
        },
        {
          step: 4,
          title: "Инвазивное лечение NSTEMI",
          description: "Более широкие показания к ранней инвазивной тактике", 
          details: [
            { item: "NSTEMI: ЧКВ <12-24 ч", level: 'A' as EvidenceLevel },
            { item: "Расширенные критерии высокого риска", level: 'B' as EvidenceLevel },
            { item: "Ранняя выписка при низком риске", level: 'B' as EvidenceLevel }
          ],
          time: "<24 ч",
          evidence: 'A' as EvidenceLevel
        }
      ]
    },

    // ВТОРИЧНАЯ ПРОФИЛАКТИКА - НОВЫЙ РАЗДЕЛ
    secondary_prevention: {
      title: "Вторичная профилактика и реабилитация",
      medications: [
        { item: "ДАТТ: 12 месяцев после ЧКВ", level: 'A' as EvidenceLevel },
        { item: "Статины высокой интенсивности (atorvastatin 80 mg)", level: 'A' as EvidenceLevel },
        { item: "Бета-блокаторы (метопролол, бисопролол)", level: 'A' as EvidenceLevel },
        { item: "ИАПФ/БРА при СН или дисфункции ЛЖ", level: 'A' as EvidenceLevel },
        { item: "Эплеренон при СН и ФВ <40%", level: 'B' as EvidenceLevel }
      ],
      lifestyle: [
        { item: "Полный отказ от курения", level: 'A' as EvidenceLevel },
        { item: "Средиземноморская диета", level: 'A' as EvidenceLevel },
        { item: "Регулярная физическая активность 150 мин/нед", level: 'A' as EvidenceLevel },
        { item: "Контроль веса (ИМТ <25)", level: 'B' as EvidenceLevel }
      ],
      monitoring: [
        { item: "Липидный профиль через 4-12 недель", level: 'A' as EvidenceLevel },
        { item: "Глюкоза и HbA1c", level: 'A' as EvidenceLevel },
        { item: "Функция почек и электролиты", level: 'B' as EvidenceLevel }
      ]
    },

    // Ключевые различия
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
      }
    ]
  };

  // Компонент для отображения уровня доказательности
  const EvidenceBadge = ({ level }: { level: EvidenceLevel }) => (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${EVIDENCE_LEVELS[level].color}`}>
      Уровень {level}
    </span>
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
            Полное руководство по диагностике и лечению с уровнями доказательности
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
            <span>⚖️ Сравнение</span>
          </button>
        </div>

        {/* Контент табов */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {selectedTab === 'eu' && (
            <div className="space-y-12">
              {/* ДИАГНОСТИКА */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Stethoscope className="text-blue-500" />
                  Диагностика ОКС
                </h2>
                
                {/* Критерии диагноза */}
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

                {/* Дифференциальная диагностика */}
                <div className="bg-yellow-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-yellow-800">Дифференциальная диагностика</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {acsData.diagnosis_section.differential.map((item, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3 border">
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ЛЕЧЕНИЕ */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Zap className="text-red-500" />
                  Алгоритм лечения ESC 2023
                </h2>

                <div className="space-y-6">
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
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex justify-between items-center bg-white rounded-lg px-3 py-2">
                              <span className="text-gray-700">{detail.item}</span>
                              <EvidenceBadge level={detail.level} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ПРОФИЛАКТИКА */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Shield className="text-green-500" />
                  Вторичная профилактика
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-green-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-green-800">Медикаментозная терапия</h3>
                    <ul className="space-y-3">
                      {acsData.secondary_prevention.medications.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-start">
                          <span className="text-gray-700">{item.item}</span>
                          <EvidenceBadge level={item.level} />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-yellow-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-yellow-800">Образ жизни</h3>
                    <ul className="space-y-3">
                      {acsData.secondary_prevention.lifestyle.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-start">
                          <span className="text-gray-700">{item.item}</span>
                          <EvidenceBadge level={item.level} />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-purple-800">Мониторинг</h3>
                    <ul className="space-y-3">
                      {acsData.secondary_prevention.monitoring.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-start">
                          <span className="text-gray-700">{item.item}</span>
                          <EvidenceBadge level={item.level} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Остальные табы (US и Comparison) остаются аналогичными */}
          {selectedTab === 'us' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Американский алгоритм ACC/AHA 2022
              </h2>
              {/* Аналогичная структура как для EU */}
            </div>
          )}

          {selectedTab === 'comparison' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Сравнение EU vs US подходов
              </h2>
              {/* Структура сравнения */}
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



