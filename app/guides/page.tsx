// app/guides/acs/page.tsx - ПОЛНЫЙ ЕВРОПЕЙСКИЙ ГАЙД ОКС
'use client';

import { useState } from 'react';
import { ArrowRight, Download, ExternalLink, AlertTriangle, Heart, Clock, Stethoscope, Shield, Zap, Scale, Pill, Activity, AlertCircle, CheckCircle } from 'lucide-react';

type EvidenceLevel = 'A' | 'B' | 'C';
type RecommendationClass = 'I' | 'IIa' | 'IIb' | 'III';

interface Recommendation {
  class: RecommendationClass;
  level: EvidenceLevel;
  text: string;
}

export default function ACSPage() {
  const [selectedTab, setSelectedTab] = useState<'diagnosis' | 'treatment' | 'prevention' | 'comparison'>('diagnosis');

  // Полные данные ESC 2023-2024
  const escGuideline = {
    title: "Острый коронарный синдром (ОКС)",
    version: "ESC 2023-2024",
    sources: {
      nsteacs: "https://academic.oup.com/eurheartj/article/44/38/3720/7235365",
      stemi: "https://academic.oup.com/eurheartj/advance-article/doi/10.1093/eurheartj/ehae170/7649113",
      full: "https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines"
    },

    // ДИАГНОСТИКА - ПОЛНАЯ ДЕТАЛИЗАЦИЯ
    diagnosis: {
      initialAssessment: [
        {
          step: "Немедленная оценка",
          actions: [
            "ЭКГ в течение 10 минут от первого медицинского контакта",
            "Оценка жизненных показателей (АД, ЧСС, SatO2)",
            "Венозный доступ + забор крови на тропонин",
            "Быстрая стратификация риска"
          ],
          timing: "0-10 мин"
        },
        {
          step: "Клиническая оценка",
          actions: [
            "Характер боли: давящая, жгучая, за грудиной",
            "Иррадиация: левая рука, шея, челюсть, спина",
            "Сопутствующие симптомы: одышка, тошнота, потливость",
            "Длительность: >20 минут"
          ],
          timing: "10-20 мин"
        }
      ],

      ecgCriteria: {
        stemi: [
          {
            criteria: "ST-элевация в ≥2 смежных отведениях",
            details: [
              "Все отведения кроме V2-V3: ≥1 мм",
              "V2-V3: мужчины <40 лет ≥2.5 мм, ≥40 лет ≥2.0 мм", 
              "V2-V3: женщины ≥1.5 мм",
              "Нижние отведения: II, III, aVF ≥1 мм"
            ],
            examples: [
              "Передний STEMI: V1-V4",
              "Нижний STEMI: II, III, aVF", 
              "Боковой STEMI: I, aVL, V5-V6",
              "Задний STEMI: V7-V9 (дополнительные отведения)"
            ]
          },
          {
            criteria: "Новая блокада ЛНПГ",
            details: [
              "Ширина QRS ≥120 мс",
              "Типичная морфология БЛНПГ",
              "Согласованность с клинической картиной"
            ]
          }
        ],
        nstemi: [
          {
            criteria: "ST-депрессия",
            details: ["≥0.5 мм в ≥2 смежных отведениях", "Горизонтальная или косонисходящая"]
          },
          {
            criteria: "Инверсия зубца T",
            details: ["≥1 мм в отведениях с доминирующим R", "Глубокая симметричная инверсия"]
          },
          {
            criteria: "Преходящая ST-элевация",
            details: ["<20 минут", "Спонтанное разрешение"]
          }
        ]
      },

      biomarkers: {
        highSensitivityTroponin: {
          protocol: "0/1 час или 0/2 часа",
          cutoff: "99-й перцентиль верхнего референсного предела (URL)",
          dynamics: "Изменение ≥20% за 3-6 часов",
          interpretation: [
            "При поступлении <URL и через 1 ч <URL → низкий риск",
            "При поступлении <URL и через 1 ч >URL → промежуточный риск", 
            "При поступлении >URL и динамика ≥20% → высокий риск",
            "При поступлении >URL и динамика <20% → повтор через 3-6 ч"
          ]
        },
        additionalMarkers: [
          "КФК-МВ: менее специфичен, но полезен при недоступности тропонина",
          "Миоглобин: ранний маркер, низкая специфичность",
          "BNP/NT-proBNP: прогностическая ценность"
        ]
      },

      riskStratification: {
        grace: {
          parameters: ["Возраст", "ЧСС", "Систолическое АД", "Уровень креатинина", "Признаки СН", "ЭКГ изменения", "Повышение кардиальных ферментов"],
          scores: [
            "Низкий риск: <109 баллов",
            "Средний риск: 109-140 баллов", 
            "Высокий риск: >140 баллов"
          ],
          mortality: [
            "Госпитальная: 0.6% (низкий риск) до 21% (высокий риск)",
            "6-месячная: 3% (низкий риск) до 26% (высокий риск)"
          ]
        },
        hematics: {
          parameters: ["Возраст", "Уровень тропонина", "ЭКГ изменения", "Факторы риска", "Повторяемость боли"],
          scores: ["Очень низкий риск: 0-2 балла", "Низкий риск: 3-5 баллов", "Высокий риск: ≥6 баллов"]
        }
      },

      differentialDiagnosis: [
        {
          condition: "Перикардит",
          features: ["Боль зависит от положения тела", "Шум трения перикарда", "Диффузная ST-элевация", "Отсутствие реципрокных изменений"]
        },
        {
          condition: "ТЭЛА", 
          features: ["Внезапная одышка", "Гипоксия", "Правосторонняя перегрузка на ЭКГ", "Повышение D-димера"]
        },
        {
          condition: "Расслоение аорты",
          features: ["Мигрирующая боль", "Асимметрия АД", "Расширение средостения на рентгене", "Неврологическая симптоматика"]
        },
        {
          condition: "Острый панкреатит",
          features: ["Боль в эпигастрии", "Повышение амилазы/липазы", "Связь с приемом алкоголя/пищи"]
        }
      ]
    },

    // ЛЕЧЕНИЕ - ПОЛНЫЕ АЛГОРИТМЫ
    treatment: {
      generalMeasures: [
        {
          measure: "Кислородотерапия",
          indication: "SatO2 <90% или дыхательная недостаточность",
          dose: "2-4 л/мин через назальные канюли",
          class: "I" as RecommendationClass,
          level: "C" as EvidenceLevel
        },
        {
          measure: "Обезболивание",
          indication: "Боль умеренной-сильной интенсивности",
          options: [
            "Морфин 2-4 мг в/в + метоклопрамид 10 мг",
            "При непереносимости: фентанил 25-50 мкг"
          ],
          class: "I" as RecommendationClass,
          level: "C" as EvidenceLevel
        },
        {
          measure: "Нитроглицерин",
          indication: "Персистирующая боль, СН, гипертензия",
          contraindications: ["САД <90 мм рт.ст.", "Прием ингибиторов ФДЭ-5", "Выраженная брадикардия"],
          dose: "0.3-0.6 мг сублингвально или 5-10 мкг/мин в/в",
          class: "I" as RecommendationClass,
          level: "C" as EvidenceLevel
        }
      ],

      antiplateletTherapy: [
        {
          drug: "Аспирин",
          loading: "150-300 мг перорально (разжевать)",
          maintenance: "75-100 мг/сут постоянно",
          class: "I" as RecommendationClass,
          level: "A" as EvidenceLevel,
          notes: "Начать немедленно при подозрении на ОКС"
        },
        {
          drug: "P2Y12 ингибиторы - ВЫБОР",
          options: [
            {
              name: "Тикагрелор",
              loading: "180 мг",
              maintenance: "90 мг 2 раза/сут",
              duration: "12 месяцев",
              advantages: ["Быстрое начало действия", "Обратимое связывание"],
              disadvantages: ["Одышка (10-15%)", "Кровотечения", "Взаимодействие с сильными ингибиторами CYP3A4"],
              class: "I" as RecommendationClass,
              level: "A" as EvidenceLevel
            },
            {
              name: "Прасугрел",
              loading: "60 мг", 
              maintenance: "10 мг/сут (5 мг при массе <60 кг)",
              duration: "12 месяцев",
              advantages: ["Мощный эффект", "Меньше одышки"],
              disadvantages: ["Противопоказан при инсульте/ТИА", "Больше кровотечений"],
              class: "I" as RecommendationClass,
              level: "B" as EvidenceLevel
            },
            {
              name: "Клопидогрел",
              loading: "600 мг",
              maintenance: "75 мг/сут", 
              duration: "12 месяцев",
              advantages: ["Хорошая переносимость", "Низкий риск кровотечений"],
              disadvantages: ["Медленное начало", "Вариабельный ответ", "Взаимодействие с ИПП"],
              class: "I" as RecommendationClass,
              level: "B" as EvidenceLevel
            }
          ]
        }
      ],

      anticoagulation: [
        {
          drug: "Фондапаринукс",
          dose: "2.5 мг п/к 1 раз/сут",
          advantages: ["Предсказуемый эффект", "Низкий риск ТЭО", "Меньше кровотечений vs НФГ"],
          disadvantages: ["Противопоказан при почечной недостаточности (ClCr <30)"],
          class: "I" as RecommendationClass,
          level: "A" as EvidenceLevel
        },
        {
          drug: "Низкомолекулярный гепарин (эноксапарин)",
          dose: "1 мг/кг п/к 2 раза/сут",
          advantages: ["Предсказуемый антикоагулянтный эффект"],
          disadvantages: ["Накопление при почечной недостаточности"],
          class: "I" as RecommendationClass, 
          level: "A" as EvidenceLevel
        },
        {
          drug: "Нефракционированный гепарин",
          dose: "60-70 Ед/кг в/в болюс (макс 5000 Ед), затем 12-15 Ед/кг/час",
          advantages: ["Короткий период полувыведения", "Контроль по АЧТВ"],
          disadvantages: ["Непредсказуемый эффект", "Гепарин-индуцированная тромбоцитопения"],
          class: "I" as RecommendationClass,
          level: "B" as EvidenceLevel
        }
      ],

      reperfusion: {
        stemi: [
          {
            method: "Первичное ЧКВ",
            timing: "FMC-to-device ≤120 мин, door-to-balloon ≤90 мин",
            indications: ["Всем пациентам с STEMI при доступности в сроки"],
            results: ["Снижение смертности на 25-50%", "Уменьшение размеров ИМ", "Снижение частоты СН"],
            class: "I" as RecommendationClass,
            level: "A" as EvidenceLevel
          },
          {
            method: "Фибринолиз",
            timing: "FMC-to-needle ≤10 мин при задержке ЧКВ >120 мин",
            indications: ["Раннее поступление (<2 ч)", "Молодой возраст", "Передне-септальная локализация"],
            contraindications: [
              "Абсолютные: внутричерепное кровоизлияние, ЗЧМТ, злокачественные опухоли ЦНС",
              "Относительные: тяжелая гипертензия, операция ❤ нед, кровотечения"
            ],
            drugs: [
              "Тенектеплаза: вес-зависимая доза (30-50 мг)",
              "Альтеплаза: 15 мг болюс + 0.75 мг/кг (макс 50 мг) за 30 мин + 0.5 мг/кг (макс 35 мг) за 60 мин"
            ],
            class: "I" as RecommendationClass,
            level: "A" as EvidenceLevel
          }
        ],
        nstemi: [
          {
            strategy: "Ранняя инвазивная (<24 ч)",
            indications: [
              "Гемодинамическая нестабильность/кардиогенный шок",
              "Рецидивирующая/рефрактерная ишемия",
              "Жизнеопасные аритмии",
              "Механические осложнения",
              "Острая СН",
              "GRACE >140"
            ],
            class: "I" as RecommendationClass,
            level: "A" as EvidenceLevel
          },
          {
            strategy: "Отсроченная инвазивная (25-72 ч)",
            indications: ["Диабет", "Почечная недостаточность", "Снижение ФВ ЛЖ", "Ранняя постинфарктная стенокардия"],
            class: "I" as RecommendationClass,
            level: "A" as EvidenceLevel
          }
        ]
      },

      adjunctiveTherapy: [
        {
          drug: "Бета-блокаторы",
          indication: "Тахикардия, гипертензия, сохраненная функция ЛЖ",
          contraindications: ["СН", "Брадикардия", "АВ-блокада", "Бронхоспазм"],
          options: ["Метопролол 25-50 мг 2 раза/сут", "Бисопролол 2.5-10 мг/сут"],
          timing: "В первые 24 часа при стабильном состоянии",
          class: "I" as RecommendationClass,
          level: "A" as EvidenceLevel
        },
        {
          drug: "Статины высокой интенсивности",
          indication: "Все пациенты с ОКС",
          options: ["Аторвастатин 80 мг/сут", "Розувастатин 20-40 мг/сут"],
          timing: "Немедленно при поступлении",
          class: "I" as RecommendationClass,
          level: "A" as EvidenceLevel
        },
        {
          drug: "ИАПФ/БРА",
          indication: "СН, дисфункция ЛЖ (ФВ <40%), диабет, гипертензия",
          options: ["Рамиприл 2.5-10 мг/сут", "Периндоприл 2-8 мг/сут", "Валсартан 80-320 мг/сут"],
          timing: "В первые 24 часа при стабильном состоянии",
          class: "I" as RecommendationClass,
          level: "A" as EvidenceLevel
        }
      ]
    },

    // ВТОРИЧНАЯ ПРОФИЛАКТИКА
    secondaryPrevention: {
      duration: "Пожизненно после ОКС",
      medications: [
        {
          drug: "Двойная антитромбоцитарная терапия",
          duration: "12 месяцев после ЧКВ",
          deescalation: [
            "При высоком риске кровотечений: 3-6 месяцев",
            "Рассмотреть переход на клопидогрел после 1-3 месяцев",
            "Оценка по шкале PRECISE-DAPT и ARC-HBR"
          ],
          class: "I" as RecommendationClass,
          level: "A" as EvidenceLevel
        },
        {
          drug: "Статины",
          target: "ЛПНП снижение ≥50% от исходного и <1.4 ммоль/л",
          monitoring: "Через 4-12 недель, затем ежегодно",
          escalation: ["При недостижении цели: + эзетимиб 10 мг/сут", "При персистирующем высоком ЛПНП: + ингибитор PCSK9"],
          class: "I" as RecommendationClass,
          level: "A" as EvidenceLevel
        }
      ],
      lifestyle: [
        {
          area: "Курение",
          recommendation: "Полное прекращение",
          interventions: ["Консультирование", "Никотин-заместительная терапия", "Варениклин/бупропион"],
          class: "I" as RecommendationClass,
          level: "B" as EvidenceLevel
        },
        {
          area: "Диета",
          recommendation: "Средиземноморская диета",
          components: ["Овощи, фрукты, цельнозерновые", "Рыба 2 раза/неделю", "Оливковое масло", "Ограничение соли <5 г/сут"],
          class: "I" as RecommendationClass,
          level: "B" as EvidenceLevel
        },
        {
          area: "Физическая активность",
          recommendation: "150 мин/неделю умеренной или 75 мин/неделю интенсивной нагрузки",
          progression: "Постепенное увеличение под контролем",
          class: "I" as RecommendationClass,
          level: "A" as EvidenceLevel
        }
      ]
    },

    // СРАВНЕНИЕ С US
    comparison: {
      keyDifferences: [
        {
          aspect: "Дозировка аспирина",
          eu: "150-300 мг нагрузка, 75-100 мг/сут поддержка",
          us: "325 мг нагрузка, 81 мг/сут поддержка",
          significance: "US использует более высокую нагрузочную дозу"
        },
        {
          aspect: "Выбор P2Y12 ингибитора",
          eu: "Прасугрел предпочтителен при планируемом ЧКВ",
          us: "Тикагрелор или прасугрел - равноправный выбор",
          significance: "ESC более конкретен в выборе прасугрела"
        },
        {
          aspect: "Сроки ЧКВ при NSTEMI",
          eu: "<24 ч для высокого риска, <72 ч для промежуточного",
          us: "<12-24 ч для среднего/высокого риска", 
          significance: "Более агрессивные сроки в US"
        }
      ],
      practicalImplications: [
        "EU подход более консервативен в выборе антиагрегантов",
        "US подход более агрессивен в сроках инвазивного лечения",
        "Оба подхода сходятся в принципах вторичной профилактики"
      ]
    }
  };

  // Компоненты интерфейса
  const RecommendationBadge = ({ rec }: { rec: Recommendation }) => (
    <div className="flex items-center gap-2 text-sm">
      <span className={`px-2 py-1 rounded border ${
        rec.class === 'I' ? 'bg-green-100 text-green-800 border-green-300' :
        rec.class === 'IIa' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
        rec.class === 'IIb' ? 'bg-blue-100 text-blue-800 border-blue-300' :
        'bg-red-100 text-red-800 border-red-300'
      }`}>
        Класс {rec.class}
      </span>
      <span className={`px-2 py-1 rounded border ${
        rec.level === 'A' ? 'bg-green-100 text-green-800 border-green-300' :
        rec.level === 'B' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
        'bg-red-100 text-red-800 border-red-300'
      }`}>
        Уровень {rec.level}
      </span>
    </div>
  );

  const TimingBadge = ({ time }: { time: string }) => (
    <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
      <Clock size={14} />
      {time}
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {escGuideline.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Полное клиническое руководство {escGuideline.version} • Диагностика, лечение, вторичная профилактика
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a href={escGuideline.sources.nsteacs} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              <ExternalLink size={16} />
              NSTE-ACS 2023
            </a>
            <a href={escGuideline.sources.stemi} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
              <ExternalLink size={16} />
              STEMI 2024
            </a>
          </div>
        </div>

        {/* Навигация */}
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
          {[
            { id: 'diagnosis' as const, label: '🔍 Диагностика', icon: Stethoscope },
            { id: 'treatment' as const, label: '💊 Лечение', icon: Pill },
            { id: 'prevention' as const, label: '🛡️ Профилактика', icon: Shield },
            { id: 'comparison' as const, label: '⚖️ Сравнение', icon: Scale }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedTab(id)}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium text-lg whitespace-nowrap ${
                selectedTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </div>

        {/* Контент */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          
          {/* ДИАГНОСТИКА */}
          {selectedTab === 'diagnosis' && (
            <div className="space-y-12">
              {/* Первичная оценка */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Stethoscope className="text-blue-500" />
                  Первичная оценка и диагностика
                </h2>
                
                <div className="space-y-6">
                  {escGuideline.diagnosis.initialAssessment.map((step, index) => (
                    <div key={index} className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">{step.step}</h3>
                        <TimingBadge time={step.timing} />
                      </div>
                      <ul className="space-y-2">
                        {step.actions.map((action, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* ЭКГ критерии */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">ЭКГ критерии</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* STEMI */}
                  <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                    <h4 className="text-lg font-semibold text-red-800 mb-4">STEMI критерии</h4>
                    {escGuideline.diagnosis.ecgCriteria.stemi.map((criteria, idx) => (
                      <div key={idx} className="mb-4 last:mb-0">
                        <p className="font-medium text-gray-900 mb-2">{criteria.criteria}</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {criteria.details.map((detail, i) => (
                            <li key={i}>• {detail}</li>
                          ))}
                        </ul>
                        {criteria.examples && (
                          <div className="mt-2">
                            <p className="font-medium text-sm">Примеры:</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {criteria.examples.map((example, i) => (
                                <li key={i}>• {example}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* NSTEMI */}
                  <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                    <h4 className="text-lg font-semibold text-orange-800 mb-4">NSTEMI критерии</h4>
                    {escGuideline.diagnosis.ecgCriteria.nstemi.map((criteria, idx) => (
                      <div key={idx} className="mb-4 last:mb-0">
                        <p className="font-medium text-gray-900 mb-2">{criteria.criteria}</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {criteria.details.map((detail, i) => (
                            <li key={i}>• {detail}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Биомаркеры */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Биомаркеры</h3>
                
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <h4 className="text-lg font-semibold text-purple-800 mb-4">
                    Высокочувствительный тропонин
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="font-medium mb-2">Протокол: {escGuideline.diagnosis.biomarkers.highSensitivityTroponin.protocol}</p>
                      <p className="text-sm text-gray-700 mb-4">
                        Отсечка: {escGuideline.diagnosis.biomarkers.highSensitivityTroponin.cutoff}
                      </p>
                      <p className="text-sm text-gray-700">
                        Динамика: {escGuideline.diagnosis.biomarkers.highSensitivityTroponin.dynamics}
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-2">Интерпретация:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {escGuideline.diagnosis.biomarkers.highSensitivityTroponin.interpretation.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ЛЕЧЕНИЕ */}
          {selectedTab === 'treatment' && (
            <div className="space-y-12">
              {/* Антитромбоцитарная терапия */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Pill className="text-blue-500" />
                  Антитромбоцитарная терапия
                </h2>

                <div className="space-y-6">
                  {/* Аспирин */}
                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">Аспирин</h3>
                        <p className="text-gray-600">
                          Нагрузка: {escGuideline.treatment.antiplateletTherapy[0].loading} • 
                          Поддержка: {escGuideline.treatment.antiplateletTherapy[0].maintenance}
                        </p>
                      </div>
                      <RecommendationBadge rec={{
                        class: escGuideline.treatment.antiplateletTherapy[0].class,
                        level: escGuideline.treatment.antiplateletTherapy[0].level,
                        text: ''
                      }} />
                    </div>
                    <p className="text-gray-700">{escGuideline.treatment.antiplateletTherapy[0].notes}</p>
                  </div>

                  {/* P2Y12 ингибиторы */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">P2Y12 ингибиторы - выбор препарата</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {escGuideline.treatment.antiplateletTherapy[1].options.map((drug, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-sm">
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">{drug.name}</h4>
                          
                          <div className="space-y-3">
                            <div>
                              <span className="font-medium">Нагрузка:</span>
                              <span className="text-gray-700 ml-2">{drug.loading}</span>
                            </div>
                            <div>
                              <span className="font-medium">Поддержка:</span>
                              <span className="text-gray-700 ml-2">{drug.maintenance}</span>
                            </div>
                            <div>
                              <span className="font-medium">Длительность:</span>
                              <span className="text-gray-700 ml-2">{drug.duration}</span>
                            </div>
                            
                            <div className="mt-4">
                              <RecommendationBadge rec={{
                                class: drug.class,
                                level: drug.level,
                                text: ''
                              }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Реперфузия */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Стратегии реперфузии</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* STEMI */}
                  <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                    <h4 className="text-lg font-semibold text-red-800 mb-4">STEMI</h4>
                    {escGuideline.treatment.reperfusion.stemi.map((method, idx) => (
                      <div key={idx} className="mb-6 last:mb-0">
                        <div className="flex justify-between items-start mb-3">
                          <h5 className="font-semibold text-gray-900">{method.method}</h5>
                          <RecommendationBadge rec={{
                            class: method.class,
                            level: method.level,
                            text: ''
                          }} />
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>Тайминг:</strong> {method.timing}
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>Результаты:</strong> {method.results?.join(', ')}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* NSTEMI */}
                  <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                    <h4 className="text-lg font-semibold text-orange-800 mb-4">NSTEMI</h4>
                    {escGuideline.treatment.reperfusion.nstemi.map((strategy, idx) => (
                      <div key={idx} className="mb-6 last:mb-0">
                        <div className="flex justify-between items-start mb-3">
                          <h5 className="font-semibold text-gray-900">{strategy.strategy}</h5>
                          <RecommendationBadge rec={{
                            class: strategy.class,
                            level: strategy.level,
                            text: ''
                          }} />
                        </div>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {strategy.indications.map((indication, i) => (
                            <li key={i}>• {indication}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* СРАВНЕНИЕ */}
          {selectedTab === 'comparison' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Scale className="text-green-500" />
                Сравнение EU ESC vs US ACC/AHA
              </h2>

              {/* Ключевые различия */}
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-xl font-semibold text-green-800 mb-4">Ключевые различия</h3>
                <div className="space-y-4">
                  {escGuideline.comparison.keyDifferences.map((diff, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4




