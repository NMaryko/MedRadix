// app/guides/acs/page.tsx - ПОЛНЫЙ ЕВРОПЕЙСКИЙ ГАЙД ОКС
'use client';

import { useState } from 'react';
import {
  ExternalLink,
  Clock,
  CheckCircle,
} from 'lucide-react';

type EvidenceLevel = 'A' | 'B' | 'C';
type RecommendationClass = 'I' | 'IIa' | 'IIb' | 'III';

interface Recommendation {
  class?: RecommendationClass;
  level?: EvidenceLevel;
  text?: string;
  evidenceText?: string;
}

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
  'Терапия',
  'Травматология и ортопедия',
  'Урология',
  'Хирургия',
  'Эндокринология',
];

const CARDIOLOGY_NOSOLOGIES: string[] = [
  'Острый коронарный синдром (ОКС)',
  'Стабильная ИБС',
  'Артериальная гипертензия',
  'Сердечная недостаточность',
  'Нарушения ритма и проводимости',
  'Приобретенные пороки сердца',
  'Воспалительные заболевания сердца',
  'Кардиомиопатии',
];

export default function ACSPage() {
  const [selectedTab, setSelectedTab] = useState<
    'diagnosis' | 'treatment' | 'prevention' | 'comparison'
  >('diagnosis');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Кардиология');
  const [selectedNosology, setSelectedNosology] = useState('Острый коронарный синдром (ОКС)');

  // Полные данные ESC 2023-2024
  const escGuideline = {
    title: 'Острый коронарный синдром',
    version: 'ESC 2023-2024',
    sources: {
      nsteacs: 'https://academic.oup.com/eurheartj/article/44/38/3720/7235365',
      stemi: 'https://academic.oup.com/eurheartj/advance-article/doi/10.1093/eurheartj/ehae170/7649113',
      us: '#',
      full: 'https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines',
    },

    // ДИАГНОСТИКА - ПОЛНАЯ ДЕТАЛИЗАЦИЯ
    diagnosis: {
      initialAssessment: [
        {
          step: 'Немедленная оценка',
          actions: [
            'ЭКГ в течение 10 минут от первого медицинского контакта',
            'Оценка жизненных показателей (АД, ЧСС, SatO2)',
            'Венозный доступ + забор крови на тропонин',
            'Быстрая стратификация риска',
          ],
          timing: '0-10 мин',
          class: 'I' as RecommendationClass,
          level: 'C' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень C - Консенсус экспертов или малые исследования',
        },
        {
          step: 'Клиническая оценка',
          actions: [
            'Характер боли: давящая, жгучая, за грудиной',
            'Иррадиация: левая рука, шея, челюсть, спина',
            'Сопутствующие симптомы: одышка, тошнота, потливость',
            'Длительность: >20 минут',
          ],
          timing: '10-20 мин',
          class: 'I' as RecommendationClass,
          level: 'C' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень C - Консенсус экспертов или малые исследования',
        },
      ],

      ecgCriteria: {
        stemi: [
          {
            criteria: 'ST-элевация в ≥2 смежных отведениях',
            details: [
              'Все отведения кроме V2-V3: ≥1 мм',
              'V2-V3: мужчины <40 лет ≥2.5 мм, ≥40 лет ≥2.0 мм',
              'V2-V3: женщины ≥1.5 мм',
              'Нижние отведения: II, III, aVF ≥1 мм',
            ],
            examples: [
              'Передний STEMI: V1-V4',
              'Нижний STEMI: II, III, aVF',
              'Боковой STEMI: I, aVL, V5-V6',
              'Задний STEMI: V7-V9 (дополнительные отведения)',
            ],
            class: 'I' as RecommendationClass,
            level: 'B' as EvidenceLevel,
            evidenceText: 'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
          },
          {
            criteria: 'Новая блокада ЛНПГ',
            details: [
              'Ширина QRS ≥120 мс',
              'Типичная морфология БЛНПГ',
              'Согласованность с клинической картиной',
            ],
            class: 'I' as RecommendationClass,
            level: 'B' as EvidenceLevel,
            evidenceText: 'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
          },
        ],
        nstemi: [
          {
            criteria: 'ST-депрессия',
            details: [
              '≥0.5 мм в ≥2 смежных отведениях',
              'Горизонтальная или косонисходящая',
            ],
            class: 'I' as RecommendationClass,
            level: 'B' as EvidenceLevel,
            evidenceText: 'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
          },
          {
            criteria: 'Инверсия зубца T',
            details: [
              '≥1 мм в отведениях с доминирующим R',
              'Глубокая симметричная инверсия',
            ],
            class: 'I' as RecommendationClass,
            level: 'B' as EvidenceLevel,
            evidenceText: 'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
          },
          {
            criteria: 'Преходящая ST-элевация',
            details: ['<20 минут', 'Спонтанное разрешение'],
            class: 'I' as RecommendationClass,
            level: 'B' as EvidenceLevel,
            evidenceText: 'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
          },
        ],
      },

      biomarkers: {
        highSensitivityTroponin: {
          protocol: '0/1 час или 0/2 часа',
          cutoff: '99-й перцентиль верхнего референсного предела (URL)',
          dynamics: 'Изменение ≥20% за 3-6 часов',
          interpretation: [
            'При поступлении <URL и через 1 ч <URL → низкий риск',
            'При поступлении <URL и через 1 ч >URL → промежуточный риск',
            'При поступлении >URL и динамика ≥20% → высокий риск',
            'При поступлении >URL и динамика <20% → повтор через 3-6 ч',
          ],
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
        },
        additionalMarkers: [
          'КФК-МВ: менее специфичен, но полезен при недоступности тропонина',
          'Миоглобин: ранний маркер, низкая специфичность',
          'BNP/NT-proBNP: прогностическая ценность',
        ],
      },

      riskStratification: {
        grace: {
          parameters: [
            'Возраст',
            'ЧСС',
            'Систолическое АД',
            'Уровень креатинина',
            'Признаки СН',
            'ЭКГ изменения',
            'Повышение кардиальных ферментов',
          ],
          scores: [
            'Низкий риск: <109 баллов',
            'Средний риск: 109-140 баллов',
            'Высокий риск: >140 баллов',
          ],
          mortality: [
            'Госпитальная: 0.6% (низкий риск) до 21% (высокий риск)',
            '6-месячная: 3% (низкий риск) до 26% (высокий риск)',
          ],
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
        },
        hematics: {
          parameters: [
            'Возраст',
            'Уровень тропонина',
            'ЭКГ изменения',
            'Факторы риска',
            'Повторяемость боли',
          ],
          scores: [
            'Очень низкий риск: 0-2 балла',
            'Низкий риск: 3-5 баллов',
            'Высокий риск: ≥6 баллов',
          ],
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
        },
      },

      differentialDiagnosis: [
        {
          condition: 'Перикардит',
          features: [
            'Боль зависит от положения тела',
            'Шум трения перикарда',
            'Диффузная ST-элевация',
            'Отсутствие реципрокных изменений',
          ],
        },
        {
          condition: 'ТЭЛА',
          features: [
            'Внезапная одышка',
            'Гипоксия',
            'Правосторонняя перегрузка на ЭКГ',
            'Повышение D-димера',
          ],
        },
        {
          condition: 'Расслоение аорты',
          features: [
            'Мигрирующая боль',
            'Асимметрия АД',
            'Расширение средостения на рентгене',
            'Неврологическая симптоматика',
          ],
        },
      ],
    },

    // ЛЕЧЕНИЕ - ПОЛНЫЕ АЛГОРИТМЫ
    treatment: {
      generalMeasures: [
        {
          measure: 'Кислородотерапия',
          indication: 'SatO2 <90% или дыхательная недостаточность',
          dose: '2-4 л/мин через назальные канюли',
          class: 'I' as RecommendationClass,
          level: 'C' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень C - Консенсус экспертов или малые исследования',
        },
        {
          measure: 'Обезболивание',
          indication: 'Боль умеренной-сильной интенсивности',
          options: [
            'Морфин 2-4 мг в/в + метоклопрамид 10 мг',
            'При непереносимости: фентанил 25-50 мкг',
          ],
          class: 'I' as RecommendationClass,
          level: 'C' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень C - Консенсус экспертов или малые исследования',
        },
        {
          measure: 'Нитроглицерин',
          indication: 'Персистирующая боль, СН, гипертензия',
          contraindications: [
            'САД <90 мм рт.ст.',
            'Прием ингибиторов ФДЭ-5',
            'Выраженная брадикардия',
          ],
          dose: '0.3-0.6 мг сублингвально или 5-10 мкг/мин в/в',
          class: 'I' as RecommendationClass,
          level: 'C' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень C - Консенсус экспертов или малые исследования',
        },
      ],

      antiplateletTherapy: [
        {
          drug: 'Аспирин',
          loading: '150-300 мг перорально (разжевать)',
          maintenance: '75-100 мг/сут постоянно',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
          notes: 'Начать немедленно при подозрении на ОКС',
        },
        {
          drug: 'P2Y12 ингибиторы - ВЫБОР',
          options: [
            {
              name: 'Тикагрелор',
              loading: '180 мг',
              maintenance: '90 мг 2 раза/сут',
              duration: '12 месяцев',
              advantages: [
                'Быстрое начало действия',
                'Обратимое связывание',
              ],
              disadvantages: [
                'Одышка (10-15%)',
                'Кровотечения',
                'Взаимодействие с сильными ингибиторами CYP3A4',
              ],
              class: 'I' as RecommendationClass,
              level: 'A' as EvidenceLevel,
              evidenceText: 'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
            },
            {
              name: 'Прасугрел',
              loading: '60 мг',
              maintenance: '10 мг/сут (5 мг при массе <60 кг)',
              duration: '12 месяцев',
              advantages: ['Мощный эффект', 'Меньше одышки'],
              disadvantages: [
                'Противопоказан при инсульте/ТИА',
                'Больше кровотечений',
              ],
              class: 'I' as RecommendationClass,
              level: 'B' as EvidenceLevel,
              evidenceText: 'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
            },
            {
              name: 'Клопидогрел',
              loading: '600 мг',
              maintenance: '75 мг/сут',
              duration: '12 месяцев',
              advantages: [
                'Хорошая переносимость',
                'Низкий риск кровотечений',
              ],
              disadvantages: [
                'Медленное начало',
                'Вариабельный ответ',
                'Взаимодействие с ИПП',
              ],
              class: 'I' as RecommendationClass,
              level: 'B' as EvidenceLevel,
              evidenceText: 'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
            },
          ],
        },
      ],

      reperfusion: {
        stemi: [
          {
            method: 'Первичное ЧКВ',
            timing: 'FMC-to-device ≤120 мин, door-to-balloon ≤90 мин',
            indications: ['Всем пациентам с STEMI при доступности в сроки'],
            results: [
              'Снижение смертности на 25-50%',
              'Уменьшение размеров ИМ',
              'Снижение частоты СН',
            ],
            class: 'I' as RecommendationClass,
            level: 'A' as EvidenceLevel,
            evidenceText: 'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
          },
          {
            method: 'Фибринолиз',
            timing: 'FMC-to-needle ≤10 мин при задержке ЧКВ >120 мин',
            indications: [
              'Раннее поступление (<2 ч)',
              'Молодой возраст',
              'Передне-септальная локализация',
            ],
            contraindications: [
              'Абсолютные: внутричерепное кровоизлияние, ЗЧМТ, злокачественные опухоли ЦНС',
              'Относительные: тяжелая гипертензия, операция ❤ нед, кровотечения',
            ],
            drugs: [
              'Тенектеплаза: вес-зависимая доза (30-50 мг)',
              'Альтеплаза: 15 мг болюс + 0.75 мг/кг (макс 50 мг) за 30 мин + 0.5 мг/кг (макс 35 мг) за 60 мин',
            ],
            class: 'I' as RecommendationClass,
            level: 'A' as EvidenceLevel,
            evidenceText: 'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
          },
        ],
        nstemi: [
          {
            strategy: 'Ранняя инвазивная (<24 ч)',
            indications: [
              'Гемодинамическая нестабильность/кардиогенный шок',
              'Рецидивирующая/рефрактерная ишемия',
              'Жизнеопасные аритмии',
              'Механические осложнения',
              'Острая СН',
              'GRACE >140',
            ],
            class: 'I' as RecommendationClass,
            level: 'A' as EvidenceLevel,
            evidenceText: 'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
          },
          {
            strategy: 'Отсроченная инвазивная (25-72 ч)',
            indications: [
              'Диабет',
              'Почечная недостаточность',
              'Снижение ФВ ЛЖ',
              'Ранняя постинфарктная стенокардия',
            ],
            class: 'I' as RecommendationClass,
            level: 'A' as EvidenceLevel,
            evidenceText: 'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
          },
        ],
      },

      adjunctiveTherapy: [
        {
          drug: 'Бета-блокаторы',
          indication: 'Тахикардия, гипертензия, сохраненная функция ЛЖ',
          contraindications: ['СН', 'Брадикардия', 'АВ-блокада', 'Бронхоспазм'],
          options: ['Метопролол 25-50 мг 2 раза/сут', 'Бисопролол 2.5-10 мг/сут'],
          timing: 'В первые 24 часа при стабильном состоянии',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
        },
        {
          drug: 'Статины высокой интенсивности',
          indication: 'Все пациенты с ОКС',
          options: ['Аторвастатин 80 мг/сут', 'Розувастатин 20-40 мг/сут'],
          timing: 'Немедленно при поступлении',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
        },
        {
          drug: 'ИАПФ/БРА',
          indication: 'СН, дисфункция ЛЖ (ФВ <40%), диабет, гипертензия',
          options: ['Рамиприл 2.5-10 мг/сут', 'Периндоприл 2-8 мг/сут', 'Валсартан 80-320 мг/сут'],
          timing: 'В первые 24 часа при стабильном состоянии',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
        },
      ],
    },

    // ВТОРИЧНАЯ ПРОФИЛАКТИКА
    secondaryPrevention: {
      duration: 'Пожизненно после ОКС',
      medications: [
        {
          drug: 'Двойная антитромбоцитарная терапия',
          duration: '12 месяцев после ЧКВ',
          deescalation: [
            'При высоком риске кровотечений: 3-6 месяцев',
            'Рассмотреть переход на клопидогрел после 1-3 месяцев',
            'Оценка по шкале PRECISE-DAPT и ARC-HBR',
          ],
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
        },
        {
          drug: 'Статины',
          target: 'ЛПНП снижение ≥50% от исходного и <1.4 ммоль/л',
          monitoring: 'Через 4-12 недель, затем ежегодно',
          escalation: [
            'При недостижении цели: + эзетимиб 10 мг/сут',
            'При персистирующем высоком ЛПНП: + ингибитор PCSK9',
          ],
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
        },
      ],
      lifestyle: [
        {
          area: 'Курение',
          recommendation: 'Полное прекращение',
          interventions: ['Консультирование', 'Никотин-заместительная терапия', 'Варениклин/бупропион'],
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
        },
        {
          area: 'Диета',
          recommendation: 'Средиземноморская диета',
          components: [
            'Овощи, фрукты, цельнозерновые',
            'Рыба 2 раза/неделю',
            'Оливковое масло',
            'Ограничение соли <5 г/сут',
          ],
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
        },
        {
          area: 'Физическая активность',
          recommendation: '150 мин/неделю умеренной или 75 мин/неделю интенсивной нагрузки',
          progression: 'Постепенное увеличение под контролем',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
        },
      ],
    },

    // СРАВНЕНИЕ С US
    comparison: {
      title: 'Сравнение Европейских (ESC 2023-2024) и Американских (ACC/AHA 2025) рекомендаций',
      keyDifferences: [
        {
          aspect: 'Дозировка аспирина',
          eu: '150-300 мг нагрузка, 75-100 мг/сут поддержка',
          us: '325 мг нагрузка, 81 мг/сут поддержка',
          significance: 'US использует более высокую нагрузочную дозу',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
        },
        {
          aspect: 'Выбор P2Y12 ингибитора',
          eu: 'Прасугрел предпочтителен при планируемом ЧКВ',
          us: 'Тикагрелор или прасугрел - равноправный выбор',
          significance: 'ESC более конкретен в выборе прасугрела',
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
        },
        {
          aspect: 'Сроки ЧКВ при NSTEMI',
          eu: '<24 ч для высокого риска, <72 ч для промежуточного',
          us: '<12-24 ч для среднего/высокого риска',
          significance: 'Более агрессивные сроки в US',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
        },
        {
          aspect: 'Длительность двойной антитромбоцитарной терапии',
          eu: '12 месяцев стандартно, 3-6 месяцев при высоком риске кровотечений',
          us: '6-12 месяцев с возможностью продления до 30 месяцев при низком риске кровотечений',
          significance: 'Более гибкий подход в US рекомендациях',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
        },
      ],
      practicalImplications: [
        'EU подход более консервативен в выборе антиагрегантов',
        'US подход более агрессивен в сроках инвазивного лечения',
        'Оба подхода сходятся в принципах вторичной профилактики',
        'Выбор тактики должен учитывать индивидуальный риск пациента и локальные протоколы',
      ],
    },
  };

  // Компоненты интерфейса
  const RecommendationBadge = ({ rec }: { rec: Recommendation }) => {
    const cls: RecommendationClass = rec.class ?? 'I';
    const lvl: EvidenceLevel = rec.level ?? 'A';

    return (
      <div className="flex flex-col gap-1 text-sm">
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded border ${
              cls === 'I'
                ? 'bg-green-100 text-green-800 border-green-300'
                : cls === 'IIa'
                ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                : cls === 'IIb'
                ? 'bg-blue-100 text-blue-800 border-blue-300'
                : 'bg-red-100 text-red-800 border-red-300'
            }`}
          >
            Класс {cls}
          </span>
          <span
            className={`px-2 py-1 rounded border ${
              lvl === 'A'
                ? 'bg-green-100 text-green-800 border-green-300'
                : lvl === 'B'
                ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                : 'bg-red-100 text-red-800 border-red-300'
            }`}
          >
            Уровень {lvl}
          </span>
        </div>
        {rec.evidenceText && (
          <p className="text-xs text-gray-600 max-w-xs">{rec.evidenceText}</p>
        )}
      </div>
    );
  };

  const TimingBadge = ({ time }: { time: string }) => (
    <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
      <Clock size={14} />
      {time}
    </div>
  );

  return (
    <main className="min-h-screen bg-[#fcfcee] py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Заголовок и фильтры - как на главной странице */}
        <section className="border-b border-gray-200 mb-8">
          <div className="max-w-7xl mx-auto px-4 pt-4 pb-4">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-0">
              
              {/* Нозология - на месте чипа */}
              <div className="flex-1 flex justify-start order-2 lg:order-1 w-full lg:w-auto">
                <div className="flex flex-col gap-1 w-full lg:w-auto">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f] hidden lg:block">
                    Нозология
                  </span>
                  <select
                    value={selectedNosology}
                    onChange={(e) => setSelectedNosology(e.target.value)}
                    className="rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52] w-full lg:w-[190px]"
                  >
                    {CARDIOLOGY_NOSOLOGIES.map((nosology) => (
                      <option key={nosology} value={nosology}>
                        {nosology}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Заголовок - центр */}
              <div className="flex-shrink-0 text-center order-1 lg:order-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {escGuideline.title}
                </h1>
                <p className="text-lg text-gray-600">
                  Полное клиническое руководство {escGuideline.version}
                </p>
              </div>

              {/* Специальность - справа */}
              <div className="flex-1 flex justify-end order-3 w-full lg:w-auto">
                <div className="flex flex-col items-end gap-1 w-full lg:w-auto">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f] hidden lg:block">
                    Специальность
                  </span>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52] w-full lg:w-[190px]"
                  >
                    {SPECIALTIES.map((spec) => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Ссылки и предупреждение */}
            <div className="text-center mt-6 space-y-3">
              <div className="flex justify-center gap-4">
                <a
                  href={escGuideline.sources.nsteacs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <ExternalLink size={16} />
                  ESC NSTE-ACS 2023
                </a>
                <a
                  href={escGuideline.sources.stemi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <ExternalLink size={16} />
                  ESC STEMI 2024
                </a>
                <a
                  href={escGuideline.sources.us}
                  className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <ExternalLink size={16} />
                  ACC/AHA 2025
                </a>
              </div>
              
              <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                Для медицинских специалистов. Обзор и интерпретация; не заменяет официальные руководства. Следуйте локальным протоколам.
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Основной контент */}
          <div className="flex-1">
            {/* Навигация */}
            <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
              {[
                { id: 'diagnosis' as const, label: 'Диагностика' },
                { id: 'treatment' as const, label: 'Лечение' },
                { id: 'prevention' as const, label: 'Профилактика' },
                { id: 'comparison' as const, label: 'Сравнение' },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setSelectedTab(id)}
                  className={`px-6 py-3 border-b-2 font-medium text-lg whitespace-nowrap ${
                    selectedTab === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
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
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      Первичная оценка и диагностика
                    </h2>

                    <div className="space-y-6">
                      {escGuideline.diagnosis.initialAssessment.map((step, index) => (
                        <div key={index} className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900">{step.step}</h3>
                            </div>
                            <div className="flex gap-4">
                              <TimingBadge time={step.timing} />
                              <RecommendationBadge
                                rec={{
                                  class: step.class,
                                  level: step.level,
                                  evidenceText: step.evidenceText,
                                }}
                              />
                            </div>
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
                          <div key={idx} className="mb-6 last:mb-0">
                            <div className="flex justify-between items-start mb-3">
                              <h5 className="font-semibold text-gray-900">{criteria.criteria}</h5>
                              <RecommendationBadge
                                rec={{
                                  class: criteria.class,
                                  level: criteria.level,
                                  evidenceText: criteria.evidenceText,
                                }}
                              />
                            </div>
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
                          <div key={idx} className="mb-6 last:mb-0">
                            <div className="flex justify-between items-start mb-3">
                              <h5 className="font-semibold text-gray-900">{criteria.criteria}</h5>
                              <RecommendationBadge
                                rec={{
                                  class: criteria.class,
                                  level: criteria.level,
                                  evidenceText: criteria.evidenceText,
                                }}
                              />
                            </div>
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
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-semibold text-purple-800">Высокочувствительный тропонин</h4>
                        <RecommendationBadge
                          rec={{
                            class: escGuideline.diagnosis.biomarkers.highSensitivityTroponin.class,
                            level: escGuideline.diagnosis.biomarkers.highSensitivityTroponin.level,
                            evidenceText: escGuideline.diagnosis.biomarkers.highSensitivityTroponin.evidenceText,
                          }}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="font-medium mb-2">
                            Протокол: {escGuideline.diagnosis.biomarkers.highSensitivityTroponin.protocol}
                          </p>
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
                            {escGuideline.diagnosis.biomarkers.highSensitivityTroponin.interpretation.map(
                              (item, idx) => (
                                <li key={idx}>• {item}</li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Дополнительные маркеры */}
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Дополнительные биомаркеры</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {escGuideline.diagnosis.biomarkers.additionalMarkers.map((marker, idx) => (
                          <li key={idx}>• {marker}</li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  {/* Стратификация риска */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">Стратификация риска</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* GRACE */}
                      <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-lg font-semibold text-yellow-800">Шкала GRACE</h4>
                          <RecommendationBadge
                            rec={{
                              class: escGuideline.diagnosis.riskStratification.grace.class,
                              level: escGuideline.diagnosis.riskStratification.grace.level,
                              evidenceText: escGuideline.diagnosis.riskStratification.grace.evidenceText,
                            }}
                          />
                        </div>
                        <p className="font-medium mb-2">Параметры:</p>
                        <ul className="text-sm text-gray-700 space-y-1 mb-4">
                          {escGuideline.diagnosis.riskStratification.grace.parameters.map((param, idx) => (
                            <li key={idx}>• {param}</li>
                          ))}
                        </ul>
                        <p className="font-medium mb-2">Уровни риска:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {escGuideline.diagnosis.riskStratification.grace.scores.map((score, idx) => (
                            <li key={idx}>• {score}</li>
                          ))}
                        </ul>
                      </div>

                      {/* HEART */}
                      <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-lg font-semibold text-green-800">Шкала HEART</h4>
                          <RecommendationBadge
                            rec={{
                              class: escGuideline.diagnosis.riskStratification.hematics.class,
                              level: escGuideline.diagnosis.riskStratification.hematics.level,
                              evidenceText: escGuideline.diagnosis.riskStratification.hematics.evidenceText,
                            }}
                          />
                        </div>
                        <p className="font-medium mb-2">Параметры:</p>
                        <ul className="text-sm text-gray-700 space-y-1 mb-4">
                          {escGuideline.diagnosis.riskStratification.hematics.parameters.map((param, idx) => (
                            <li key={idx}>• {param}</li>
                          ))}
                        </ul>
                        <p className="font-medium mb-2">Уровни риска:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {escGuideline.diagnosis.riskStratification.hematics.scores.map((score, idx) => (
                            <li key={idx}>• {score}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {/* ЛЕЧЕНИЕ */}
              {selectedTab === 'treatment' && (
                <div className="space-y-12">
                  {/* Общие мероприятия */}
                  <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Общие мероприятия</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                      {escGuideline.treatment.generalMeasures.map((measure, idx) => (
                        <div key={idx} className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-gray-900">{measure.measure}</h3>
                            <RecommendationBadge
                              rec={{
                                class: measure.class,
                                level: measure.level,
                                evidenceText: measure.evidenceText,
                              }}
                            />
                          </div>
                          <p className="text-gray-700 mb-2">
                            <strong>Показания:</strong> {measure.indication}
                          </p>
                          <p className="text-gray-700">
                            <strong>Дозировка:</strong> {measure.dose}
                          </p>
                          {measure.contraindications && (
                            <div className="mt-3">
                              <p className="font-medium text-sm mb-1">Противопоказания:</p>
                              <ul className="text-sm text-gray-700 space-y-1">
                                {measure.contraindications.map((contra, i) => (
                                  <li key={i}>• {contra}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Антитромбоцитарная терапия */}
                  <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Антитромбоцитарная терапия</h2>

                    <div className="space-y-6">
                      {/* Аспирин */}
                      <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">Аспирин</h3>
                            <p className="text-gray-600">
                              Нагрузка: {escGuideline.treatment.antiplateletTherapy[0].loading} • Поддержка:{' '}
                              {escGuideline.treatment.antiplateletTherapy[0].maintenance}
                            </p>
                          </div>
                          <RecommendationBadge
                            rec={{
                              class: escGuideline.treatment.antiplateletTherapy[0].class,
                              level: escGuideline.treatment.antiplateletTherapy[0].level,
                              evidenceText: escGuideline.treatment.antiplateletTherapy[0].evidenceText,
                            }}
                          />
                        </div>
                        <p className="text-gray-700">{escGuideline.treatment.antiplateletTherapy[0].notes}</p>
                      </div>

                      {/* P2Y12 ингибиторы */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          P2Y12 ингибиторы - выбор препарата
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                          {(escGuideline.treatment.antiplateletTherapy[1]?.options ?? []).map((drug, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-sm">
                              <div className="flex justify-between items-start mb-4">
                                <h4 className="text-lg font-semibold text-gray-900">{drug.name}</h4>
                                <RecommendationBadge
                                  rec={{
                                    class: drug.class,
                                    level: drug.level,
                                    evidenceText: drug.evidenceText,
                                  }}
                                />
                              </div>

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

                                {drug.advantages && (
                                  <div>
                                    <p className="font-medium text-sm mb-1">Преимущества:</p>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                      {drug.advantages.map((adv, i) => (
                                        <li key={i}>• {adv}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {drug.disadvantages && (
                                  <div>
                                    <p className="font-medium text-sm mb-1">Недостатки:</p>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                      {drug.disadvantages.map((dis, i) => (
                                        <li key={i}>• {dis}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
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
                              <RecommendationBadge
                                rec={{
                                  class: method.class,
                                  level: method.level,
                                  evidenceText: method.evidenceText,
                                }}
                              />
                            </div>
                            <p className="text-sm text-gray-700 mb-2">
                              <strong>Тайминг:</strong> {method.timing}
                            </p>
                            {method.results && (
                              <p className="text-sm text-gray-700 mb-2">
                                <strong>Результаты:</strong> {method.results.join(', ')}
                              </p>
                            )}
                            {method.contraindications && (
                              <div className="mt-2">
                                <p className="font-medium text-sm mb-1">Противопоказания:</p>
                                <ul className="text-sm text-gray-700 space-y-1">
                                  {method.contraindications.map((contra, i) => (
                                    <li key={i}>• {contra}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
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
                              <RecommendationBadge
                                rec={{
                                  class: strategy.class,
                                  level: strategy.level,
                                  evidenceText: strategy.evidenceText,
                                }}
                              />
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

                  {/* Дополнительная терапия */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">Дополнительная терапия</h3>

                    <div className="grid md:grid-cols-3 gap-6">
                      {escGuideline.treatment.adjunctiveTherapy.map((therapy, idx) => (
                        <div key={idx} className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-lg font-semibold text-gray-900">{therapy.drug}</h4>
                            <RecommendationBadge
                              rec={{
                                class: therapy.class,
                                level: therapy.level,
                                evidenceText: therapy.evidenceText,
                              }}
                            />
                          </div>
                          <p className="text-gray-700 mb-2">
                            <strong>Показания:</strong> {therapy.indication}
                          </p>
                          <p className="text-gray-700 mb-2">
                            <strong>Тайминг:</strong> {therapy.timing}
                          </p>
                          {therapy.contraindications && (
                            <div className="mt-2">
                              <p className="font-medium text-sm mb-1">Противопоказания:</p>
                              <ul className="text-sm text-gray-700 space-y-1">
                                {therapy.contraindications.map((contra, i) => (
                                  <li key={i}>• {contra}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* ПРОФИЛАКТИКА */}
              {selectedTab === 'prevention' && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Вторичная профилактика после ОКС</h2>

                  <section className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Медикаментозная терапия</h3>

                    <div className="space-y-4">
                      {escGuideline.secondaryPrevention.medications.map((med, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-4 border border-blue-100">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{med.drug}</h4>
                            <RecommendationBadge
                              rec={{
                                class: med.class,
                                level: med.level,
                                evidenceText: med.evidenceText,
                              }}
                            />
                          </div>
                          {med.duration && (
                            <p className="text-sm text-gray-700 mb-1">
                              Длительность: <span className="font-medium">{med.duration}</span>
                            </p>
                          )}
                          {med.target && (
                            <p className="text-sm text-gray-700 mb-1">
                              Цель: <span className="font-medium">{med.target}</span>
                            </p>
                          )}
                          {med.monitoring && (
                            <p className="text-sm text-gray-700 mb-1">
                              Мониторинг: <span className="font-medium">{med.monitoring}</span>
                            </p>
                          )}
                          {med.deescalation && (
                            <ul className="text-sm text-gray-700 space-y-1 mt-2">
                              {med.deescalation.map((item, i) => (
                                <li key={i}>• {item}</li>
                              ))}
                            </ul>
                          )}
                          {med.escalation && (
                            <ul className="text-sm text-gray-700 space-y-1 mt-2">
                              {med.escalation.map((item, i) => (
                                <li key={i}>• {item}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Образ жизни</h3>

                    <div className="space-y-4">
                      {escGuideline.secondaryPrevention.lifestyle.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-4 border border-green-100">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{item.area}</h4>
                            <RecommendationBadge
                              rec={{
                                class: item.class,
                                level: item.level,
                                evidenceText: item.evidenceText,
                              }}
                            />
                          </div>
                          <p className="text-sm text-gray-700 mb-1">
                            Рекомендация: <span className="font-medium">{item.recommendation}</span>
                          </p>
                          {item.components && (
                            <ul className="text-sm text-gray-700 space-y-1 mt-2">
                              {item.components.map((c, i) => (
                                <li key={i}>• {c}</li>
                              ))}
                            </ul>
                          )}
                          {item.interventions && (
                            <ul className="text-sm text-gray-700 space-y-1 mt-2">
                              {item.interventions.map((c, i) => (
                                <li key={i}>• {c}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* СРАВНЕНИЕ */}
              {selectedTab === 'comparison' && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{escGuideline.comparison.title}</h2>

                  {/* Ключевые различия */}
                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <h3 className="text-xl font-semibold text-green-800 mb-4">Ключевые различия</h3>
                    <div className="space-y-4">
                      {escGuideline.comparison.keyDifferences.map((diff, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-4 border border-green-100 shadow-sm">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-semibold text-gray-900">{diff.aspect}</h4>
                            <RecommendationBadge
                              rec={{
                                class: diff.class,
                                level: diff.level,
                                evidenceText: diff.evidenceText,
                              }}
                            />
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-medium text-gray-700 mb-1">🇪🇺 ESC 2023-2024 / Europe</p>
                              <p className="text-gray-700">{diff.eu}</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700 mb-1">🇺🇸 ACC/AHA 2025 / US</p>
                              <p className="text-gray-700">{diff.us}</p>
                            </div>
                          </div>
                          <p className="mt-3 text-sm text-gray-600">{diff.significance}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Практические выводы */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Практические выводы для врача</h3>
                    <ul className="space-y-2 text-gray-700">
                      {escGuideline.comparison.practicalImplications.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="text-green-500 mt-0.5" size={18} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer с поддержкой */}
        <section className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-600 mb-6 max-w-4xl mx-auto">
            Данное руководство представляет собой обзор и интерпретацию клинических рекомендаций для медицинских специалистов. 
            Информация носит исключительно образовательный характер и не заменяет профессиональное медицинское заключение. 
            При принятии клинических решений всегда следуйте официальным руководствам и локальным протоколам вашего учреждения. 
            Авторы не несут ответственности за использование представленной информации в клинической практике.
          </p>
          <p className="text-lg font-medium text-gray-900">
            support@medradix.info
          </p>
        </section>
      </div>
    </main>
  );
}

