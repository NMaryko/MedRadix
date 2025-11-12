// app/guides/acs/page.tsx - ПОЛНЫЙ ЕВРОПЕЙСКИЙ ГАЙД ОКС
'use client';

import { useState } from 'react';
import {
  ExternalLink,
  Clock,
  CheckCircle,
  AlertTriangle,
  FolderPlus,
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

interface Nosology {
  id: string;
  label: string;
  group: string; // системный раздел, подзаголовок
}

const CARDIOLOGY_NOSOLOGIES: Nosology[] = [
  // Ишемическая болезнь сердца
  {
    id: 'acs',
    label: 'Острый коронарный синдром (ОКС)',
    group: 'Ишемическая болезнь сердца',
  },
  {
    id: 'chronic-ihd',
    label: 'Хроническая ишемическая болезнь сердца',
    group: 'Ишемическая болезнь сердца',
  },
  {
    id: 'stable-angina',
    label: 'Стабильная стенокардия',
    group: 'Ишемическая болезнь сердца',
  },
  {
    id: 'post-mi',
    label: 'Постинфарктный период',
    group: 'Ишемическая болезнь сердца',
  },

  // Нарушения ритма и проводимости
  {
    id: 'af',
    label: 'Фибрилляция предсердий',
    group: 'Нарушения ритма и проводимости',
  },
  {
    id: 'other-arrhythmias',
    label: 'Другие нарушения ритма и проводимости',
    group: 'Нарушения ритма и проводимости',
  },

  // Сердечная недостаточность
  {
    id: 'hf',
    label: 'Хроническая сердечная недостаточность',
    group: 'Сердечная недостаточность',
  },

  // Артериальная гипертензия
  {
    id: 'htn',
    label: 'Артериальная гипертензия',
    group: 'Артериальная гипертензия',
  },

  // Поражения клапанов и врождённые пороки
  {
    id: 'valvular',
    label: 'Поражения клапанов сердца',
    group: 'Поражения клапанов и врождённые пороки',
  },
  {
    id: 'congenital',
    label: 'Врожденные пороки сердца у взрослых',
    group: 'Поражения клапанов и врождённые пороки',
  },

  // Кардиомиопатии
  {
    id: 'cardiomyopathies',
    label: 'Кардиомиопатии',
    group: 'Кардиомиопатии',
  },

  // Воспалительные заболевания
  {
    id: 'myocarditis',
    label: 'Миокардиты',
    group: 'Воспалительные заболевания миокарда и перикарда',
  },
  {
    id: 'pericarditis',
    label: 'Перикардиты',
    group: 'Воспалительные заболевания миокарда и перикарда',
  },

  // Лёгочная гипертензия и ТЭЛА
  {
    id: 'pah',
    label: 'Легочная гипертензия',
    group: 'Лёгочная гипертензия и ТЭЛА',
  },
  {
    id: 'pe',
    label: 'Тромбоэмболия легочной артерии (ТЭЛА)',
    group: 'Лёгочная гипертензия и ТЭЛА',
  },
];

export default function ACSPage() {
  const [selectedTab, setSelectedTab] = useState<
    'diagnosis' | 'treatment' | 'prevention' | 'comparison'
  >('diagnosis');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Кардиология');
  const [selectedNosology, setSelectedNosology] = useState(
    'Острый коронарный синдром (ОКС)'
  );

  // Группировка нозологий по разделам (для <optgroup>)
  const nosologiesByGroup = CARDIOLOGY_NOSOLOGIES.reduce<
    Record<string, Nosology[]>
  >((acc, n) => {
    if (!acc[n.group]) acc[n.group] = [];
    acc[n.group].push(n);
    return acc;
  }, {});

  // Полные данные ESC 2023-2024
  const escGuideline = {
    title: 'Острый коронарный синдром',
    version: 'ESC 2023-2024',
    sources: {
      nsteacs: 'https://academic.oup.com/eurheartj/article/44/38/3720/7235365',
      stemi:
        'https://academic.oup.com/eurheartj/advance-article/doi/10.1093/eurheartj/ehae170/7649113',
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
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень C - Консенсус экспертов или малые исследования',
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
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень C - Консенсус экспертов или малые исследования',
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
            evidenceText:
              'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
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
            evidenceText:
              'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
          },
        ],
        nstemi: [
          {
            criteria: 'ST-депрессия',
            details: ['≥0.5 мм в ≥2 смежных отведениях', 'Горизонтальная или косонисходящая'],
            class: 'I' as RecommendationClass,
            level: 'B' as EvidenceLevel,
            evidenceText:
              'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
          },
          {
            criteria: 'Инверсия зубца T',
            details: ['≥1 мм в отведениях с доминирующим R', 'Глубокая симметричная инверсия'],
            class: 'I' as RecommendationClass,
            level: 'B' as EvidenceLevel,
            evidenceText:
              'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
          },
          {
            criteria: 'Преходящая ST-элевация',
            details: ['<20 минут', 'Спонтанное разрешение'],
            class: 'I' as RecommendationClass,
            level: 'B' as EvidenceLevel,
            evidenceText:
              'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
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
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
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
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
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
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
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
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень C - Консенсус экспертов или малые исследования',
        },
        {
          measure: 'Обезболивание',
          indication: 'Боль умеренной-сильной интенсивности',
          dose: 'Морфин 2-4 мг в/в болюс + титрация; при непереносимости — фентанил 25-50 мкг в/в',
          options: ['Морфин 2-4 мг в/в + метоклопрамид 10 мг', 'При непереносимости: фентанил 25-50 мкг'],
          class: 'I' as RecommendationClass,
          level: 'C' as EvidenceLevel,
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень C - Консенсус экспертов или малые исследования',
        },
        {
          measure: 'Нитроглицерин',
          indication: 'Персистирующая боль, СН, гипертензия',
          contraindications: ['САД <90 мм рт.ст.', 'Прием ингибиторов ФДЭ-5', 'Выраженная брадикардия'],
          dose: '0.3-0.6 мг сублингвально или 5-10 мкг/мин в/в',
          class: 'I' as RecommendationClass,
          level: 'C' as EvidenceLevel,
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень C - Консенсус экспертов или малые исследования',
        },
      ],

      antiplateletTherapy: [
        {
          drug: 'Аспирин',
          loading: '150-300 мг перорально (разжевать)',
          maintenance: '75-100 мг/сут постоянно',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
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
              advantages: ['Быстрое начало действия', 'Обратимое связывание'],
              disadvantages: [
                'Одышка (10-15%)',
                'Кровотечения',
                'Взаимодействие с сильными ингибиторами CYP3A4',
              ],
              class: 'I' as RecommendationClass,
              level: 'A' as EvidenceLevel,
              evidenceText:
                'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
            },
            {
              name: 'Прасугрел',
              loading: '60 мг',
              maintenance: '10 мг/сут (5 мг при массе <60 кг)',
              duration: '12 месяцев',
              advantages: ['Мощный эффект', 'Меньше одышки'],
              disadvantages: ['Противопоказан при инсульте/ТИА', 'Больше кровотечений'],
              class: 'I' as RecommendationClass,
              level: 'B' as EvidenceLevel,
              evidenceText:
                'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
            },
            {
              name: 'Клопидогрел',
              loading: '600 мг',
              maintenance: '75 мг/сут',
              duration: '12 месяцев',
              advantages: ['Хорошая переносимость', 'Низкий риск кровотечений'],
              disadvantages: ['Медленное начало', 'Вариабельный ответ', 'Взаимодействие с ИПП'],
              class: 'I' as RecommendationClass,
              level: 'B' as EvidenceLevel,
              evidenceText:
                'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
            },
          ],
        },
      ],

      // Антикоагулянты
      anticoagulation: [
        {
          drug: 'Фондапаринукс',
          dose: '2.5 мг п/к 1 раз/сут',
          indication: 'Предпочтительный антикоагулянт при NSTE-ACS без показаний к срочному ЧКВ',
          notes: 'Не применять при КК <30 мл/мин; при ЧКВ — дополнительно болюс НФГ',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText:
            'Класс I - Предпочтительный выбор при NSTE-ACS; Уровень A - Множественные РКИ или мета-анализы',
        },
        {
          drug: 'Эноксапарин (НМГ)',
          dose: '1 мг/кг п/к каждые 12 ч (при КК <30 мл/мин — 1 мг/кг 1 раз/сут)',
          indication: 'Альтернатива фондапаринуксу при невозможности его применения',
          notes: 'Требует коррекции дозы при ХБП; учитывать суммарную антикоагуляцию при ЧКВ',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
        },
        {
          drug: 'Нефракционированный гепарин',
          dose: '60–70 Ед/кг в/в болюс (макс 5000 Ед), затем 12–15 Ед/кг/ч с контролем АЧТВ',
          indication: 'Пациенты со STEMI/NSTE-ACS при первичном ЧКВ или при ХБП тяжёлой степени',
          notes: 'Контролировать АЧТВ; помнить о риске ГИТ',
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
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
            evidenceText:
              'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
          },
          {
            method: 'Фибринолиз',
            timing: 'FMC-to-needle ≤10 мин при задержке ЧКВ >120 мин',
            indications: ['Раннее поступление (<2 ч)', 'Молодой возраст', 'Передне-септальная локализация'],
            contraindications: [
              'Абсолютные: внутричерепное кровоизлияние, ЗЧМТ, злокачественные опухоли ЦНС',
              'Относительные: тяжелая гипертензия, операция <3 нед, кровотечения',
            ],
            drugs: [
              'Тенектеплаза: вес-зависимая доза (30-50 мг)',
              'Альтеплаза: 15 мг болюс + 0.75 мг/кг (макс 50 мг) за 30 мин + 0.5 мг/кг (макс 35 мг) за 60 мин',
            ],
            class: 'I' as RecommendationClass,
            level: 'A' as EvidenceLevel,
            evidenceText:
              'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
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
            evidenceText:
              'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
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
            evidenceText:
              'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
          },
        ],
      },

      adjunctiveTherapy: [
        {
          drug: 'Бета-блокаторы',
          indication: 'Тахикардия, гипертензия, сохраненная функция ЛЖ',
          contraindications: [
            'Острая декомпенсация СН',
            'Выраженная брадикардия',
            'АВ-блокада II–III ст.',
            'Бронхоспазм',
          ],
          options: ['Метопролол 25-50 мг 2 раза/сут', 'Бисопролол 2.5-10 мг/сут'],
          timing: 'В первые 24 часа при стабильном состоянии',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
        },
        {
          drug: 'Статины высокой интенсивности',
          indication: 'Все пациенты с ОКС',
          options: ['Аторвастатин 80 мг/сут', 'Розувастатин 20-40 мг/сут'],
          timing: 'Немедленно при поступлении',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
        },
        {
          drug: 'ИАПФ/БРА',
          indication: 'СН, дисфункция ЛЖ (ФВ <40%), диабет, гипертензия',
          options: ['Рамиприл 2.5-10 мг/сут', 'Периндоприл 2-8 мг/сут', 'Валсартан 80-320 мг/сут'],
          timing: 'В первые 24 часа при стабильном состоянии',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
        },
        {
          drug: 'Антагонисты минералокортикоидных рецепторов',
          indication: 'ФВ ЛЖ ≤40% + СН или сахарный диабет после ОКС',
          options: ['Эплеренон 25–50 мг/сут', 'Спиронолактон 25–50 мг/сут'],
          timing: 'В течение первых 3–7 суток при стабильном креатинине и калии',
          contraindications: ['Калий >5.0 ммоль/л', 'КК <30 мл/мин'],
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
        },
        {
          drug: 'SGLT2 ингибиторы',
          indication: 'СН с ФВ сниженной или умеренно сниженной после ОКС (с/без СД)',
          options: ['Дапаглифлозин 10 мг/сут', 'Эмпаглифлозин 10 мг/сут'],
          timing: 'После стабилизации гемодинамики и функции почек',
          contraindications: ['КК <20–25 мл/мин (в зависимости от препарата)'],
          class: 'IIa' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText:
            'Класс IIa - Следует рассмотреть; Уровень A - Множественные РКИ или мета-анализы',
        },
      ],

      commonPitfalls: [
        {
          title: 'Задержка реперфузии при STEMI',
          items: [
            'Длительное ожидание нормализации боли/ЭКГ вместо немедленного решения о ЧКВ/фибринолизе',
            'Направление пациента в неинтервенционный стационар при наличии доступного ЧКВ-центра',
            'Отсутствие контроля таймингов (FMC-to-device, door-to-balloon, FMC-to-needle)',
          ],
          severity: 'high',
        },
        {
          title: 'Недооценка риска у пациентов с NSTE-ACS',
          items: [
            'Отсутствие расчёта GRACE/HEART и ведение «как стабильную ИБС»',
            'Задержка инвазивной стратегии у пациентов с высокими тропонинами и динамикой ЭКГ',
            'Отмена ДАТТ слишком рано при низкой оценке риска кровотечений',
          ],
          severity: 'high',
        },
        {
          title: 'Ошибки в антикоагулянтной и антитромбоцитарной терапии',
          items: [
            'Дублирование антикоагулянтов (НФГ + НМГ + фондапаринукс одновременно)',
            'Отсутствие коррекции дозы при сниженной функции почек',
            'Продолжение ДАТТ в полном объёме при явно высоком риске кровотечения без пересмотра схемы',
          ],
          severity: 'medium',
        },
        {
          title: 'Недостаточная вторичная профилактика',
          items: [
            'Отсутствие титрации статина до целевого ЛПНП <1.4 ммоль/л',
            'Не назначен ИАПФ/БРА и МРА при сниженной ФВ ЛЖ',
            'Пациент не направлен в программу кардиореабилитации',
          ],
          severity: 'medium',
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
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
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
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
        },
      ],
      lifestyle: [
        {
          area: 'Курение',
          recommendation: 'Полное прекращение',
          interventions: ['Консультирование', 'Никотин-заместительная терапия', 'Варениклин/бупропион'],
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
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
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
        },
        {
          area: 'Физическая активность',
          recommendation: '150 мин/неделю умеренной или 75 мин/неделю интенсивной нагрузки',
          progression: 'Постепенное увеличение под контролем',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
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
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
        },
        {
          aspect: 'Выбор P2Y12 ингибитора',
          eu: 'Прасугрел предпочтителен при планируемом ЧКВ',
          us: 'Тикагрелор или прасугрел - равноправный выбор',
          significance: 'ESC более конкретен в выборе прасугрела',
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
        },
        {
          aspect: 'Сроки ЧКВ при NSTEMI',
          eu: '<24 ч для высокого риска, <72 ч для промежуточного',
          us: '<12-24 ч для среднего/высокого риска',
          significance: 'Более агрессивные сроки в US',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
        },
        {
          aspect: 'Длительность двойной антитромбоцитарной терапии',
          eu: '12 месяцев стандартно, 3-6 месяцев при высоком риске кровотечений',
          us: '6-12 месяцев с возможностью продления до 30 месяцев при низком риске кровотечений',
          significance: 'Более гибкий подход в US рекомендациях',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText:
            'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
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
            className={`px-2 py-1 rounded-full border text-xs sm:text-sm ${
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
            className={`px-2 py-1 rounded-full border text-xs sm:text-sm ${
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
          <p className="text-[11px] sm:text-xs text-gray-600 max-w-xs">{rec.evidenceText}</p>
        )}
      </div>
    );
  };

  const TimingBadge = ({ time }: { time: string }) => (
    <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-xs sm:text-sm text-gray-700">
      <Clock size={14} />
      {time}
    </div>
  );

  const handleSaveSection = () => {
    if (typeof window !== 'undefined') {
      window.alert(
        'Функция сохранения в личную папку «Мои гайды» появится в одной из следующих версий MedRadix. Пока вы можете добавить страницу в закладки браузера.'
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#fcfcee] py-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Заголовок и фильтры */}
        <section className="border-b border-gray-200 mb-8">
          <div className="max-w-7xl mx-auto px-0 pt-4 pb-4">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-0">
              {/* Нозология */}
              <div className="flex-1 flex justify-start order-2 lg:order-1 w-full lg:w-auto">
                <div className="flex flex-col gap-1 w-full lg:w-auto">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f] hidden lg:block">
                    Нозология
                  </span>
                  <select
                    value={selectedNosology}
                    onChange={(e) => setSelectedNosology(e.target.value)}
                    className="rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52] w-full lg:w-[220px]"
                  >
                    {Object.entries(nosologiesByGroup).map(([group, items]) => (
                      <optgroup key={group} label={group}>
                        {items.map((nosology) => (
                          <option key={nosology.id} value={nosology.label}>
                            {nosology.label}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>

              {/* Заголовок */}
              <div className="flex-shrink-0 text-center order-1 lg:order-2 px-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {escGuideline.title}
                </h1>
                <p className="text-lg text-gray-600">
                  Полное клиническое руководство {escGuideline.version}
                </p>
              </div>

              {/* Специальность */}
              <div className="flex-1 flex justify-end order-3 w-full lg:w-auto">
                <div className="flex flex-col items-end gap-1 w-full lg:w-auto">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f] hidden lg:block">
                    Специальность
                  </span>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="rounded-full border border-[#d3cec4] bg-white px-4 py-1.5 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52] w-full lg:w-[220px]"
                  >
                    {SPECIALTIES.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Ссылки и предупреждение */}
            <div className="text-center mt-6 space-y-3">
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={escGuideline.sources.nsteacs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors text-sm"
                >
                  <ExternalLink size={16} />
                  ESC NSTE-ACS 2023
                </a>
                <a
                  href={escGuideline.sources.stemi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors text-sm"
                >
                  <ExternalLink size={16} />
                  ESC STEMI 2024
                </a>
                <a
                  href={escGuideline.sources.us}
                  className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition-colors text-sm"
                >
                  <ExternalLink size={16} />
                  ACC/AHA 2025
                </a>
              </div>

              <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                Для медицинских специалистов. Обзор и интерпретация; не заменяет официальные
                руководства. Следуйте локальным протоколам.
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* ЛЕВОЕ МЕНЮ РАЗДЕЛОВ (desktop) */}
          <aside className="lg:w-52 xl:w-56 flex-shrink-0">
            <div className="sticky top-24 hidden lg:block">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9c978f] mb-3">
                Разделы гайда
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  { id: 'diagnosis' as const, label: 'Диагностика' },
                  { id: 'treatment' as const, label: 'Лечение' },
                  { id: 'prevention' as const, label: 'Профилактика' },
                  { id: 'comparison' as const, label: 'Сравнение' },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedTab(id)}
                    className={`text-sm rounded-full border px-3 py-1.5 text-left whitespace-nowrap transition ${
                      selectedTab === id
                        ? 'bg-[#015d52] text-white border-[#015d52] shadow-sm'
                        : 'bg-white text-gray-700 border-[#d3cec4] hover:border-[#015d52]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Основной контент */}
          <div className="flex-1 min-w-0">
            {/* Навигация ТОЛЬКО для мобильных/планшетов */}
            <div className="flex border-b border-gray-200 mb-6 overflow-x-auto lg:hidden">
              {[
                { id: 'diagnosis' as const, label: 'Диагностика' },
                { id: 'treatment' as const, label: 'Лечение' },
                { id: 'prevention' as const, label: 'Профилактика' },
                { id: 'comparison' as const, label: 'Сравнение' },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setSelectedTab(id)}
                  className={`px-4 py-2 border-b-2 text-sm font-medium whitespace-nowrap ${
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
            <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 lg:p-8 mb-8">
              {/* ДИАГНОСТИКА */}
              {selectedTab === 'diagnosis' && (
                <div className="space-y-12">
                  {/* Первичная оценка */}
                  <section>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                      Первичная оценка и диагностика
                    </h2>

                    <div className="space-y-6">
                      {escGuideline.diagnosis.initialAssessment.map((step, index) => (
                        <div
                          key={index}
                          className="bg-blue-50 rounded-xl p-5 sm:p-6 border border-blue-200"
                        >
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                              {step.step}
                            </h3>
                            <div className="flex flex-wrap gap-3 md:justify-end">
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
                              <li
                                key={idx}
                                className="flex items-start gap-3"
                              >
                                <CheckCircle
                                  size={18}
                                  className="text-green-500 mt-0.5 flex-shrink-0"
                                />
                                <span className="text-gray-700 text-sm sm:text-base">
                                  {action}
                                </span>
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
                      <div className="bg-red-50 rounded-xl p-5 sm:p-6 border border-red-200">
                        <h4 className="text-lg font-semibold text-red-800 mb-4">STEMI критерии</h4>
                        {escGuideline.diagnosis.ecgCriteria.stemi.map((criteria, idx) => (
                          <div
                            key={idx}
                            className="mb-6 last:mb-0"
                          >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                              <h5 className="font-semibold text-gray-900">
                                {criteria.criteria}
                              </h5>
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
                      <div className="bg-orange-50 rounded-xl p-5 sm:p-6 border border-orange-200">
                        <h4 className="text-lg font-semibold text-orange-800 mb-4">
                          NSTEMI критерии
                        </h4>
                        {escGuideline.diagnosis.ecgCriteria.nstemi.map((criteria, idx) => (
                          <div
                            key={idx}
                            className="mb-6 last:mb-0"
                          >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                              <h5 className="font-semibold text-gray-900">
                                {criteria.criteria}
                              </h5>
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

                    <div className="bg-purple-50 rounded-xl p-5 sm:p-6 border border-purple-200">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                        <h4 className="text-lg font-semibold text-purple-800">
                          Высокочувствительный тропонин
                        </h4>
                        <RecommendationBadge
                          rec={{
                            class:
                              escGuideline.diagnosis.biomarkers.highSensitivityTroponin.class,
                            level:
                              escGuideline.diagnosis.biomarkers.highSensitivityTroponin.level,
                            evidenceText:
                              escGuideline.diagnosis.biomarkers.highSensitivityTroponin
                                .evidenceText,
                          }}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="font-medium mb-2">
                            Протокол:{' '}
                            {escGuideline.diagnosis.biomarkers.highSensitivityTroponin.protocol}
                          </p>
                          <p className="text-sm text-gray-700 mb-4">
                            Отсечка:{' '}
                            {escGuideline.diagnosis.biomarkers.highSensitivityTroponin.cutoff}
                          </p>
                          <p className="text-sm text-gray-700">
                            Динамика:{' '}
                            {escGuideline.diagnosis.biomarkers.highSensitivityTroponin.dynamics}
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
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        Дополнительные биомаркеры
                      </h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {escGuideline.diagnosis.biomarkers.additionalMarkers.map(
                          (marker, idx) => (
                            <li key={idx}>• {marker}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </section>

                  {/* Стратификация риска */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                      Стратификация риска
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* GRACE */}
                      <div className="bg-yellow-50 rounded-xl p-5 sm:p-6 border border-yellow-200">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                          <h4 className="text-lg font-semibold text-yellow-800">
                            Шкала GRACE
                          </h4>
                          <RecommendationBadge
                            rec={{
                              class: escGuideline.diagnosis.riskStratification.grace.class,
                              level: escGuideline.diagnosis.riskStratification.grace.level,
                              evidenceText:
                                escGuideline.diagnosis.riskStratification.grace.evidenceText,
                            }}
                          />
                        </div>
                        <p className="font-medium mb-2">Параметры:</p>
                        <ul className="text-sm text-gray-700 space-y-1 mb-4">
                          {escGuideline.diagnosis.riskStratification.grace.parameters.map(
                            (param, idx) => (
                              <li key={idx}>• {param}</li>
                            )
                          )}
                        </ul>
                        <p className="font-medium mb-2">Уровни риска:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {escGuideline.diagnosis.riskStratification.grace.scores.map(
                            (score, idx) => (
                              <li key={idx}>• {score}</li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* HEART */}
                      <div className="bg-green-50 rounded-xl p-5 sm:p-6 border border-green-200">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                          <h4 className="text-lg font-semibold text-green-800">
                            Шкала HEART
                          </h4>
                          <RecommendationBadge
                            rec={{
                              class: escGuideline.diagnosis.riskStratification.hematics.class,
                              level: escGuideline.diagnosis.riskStratification.hematics.level,
                              evidenceText:
                                escGuideline.diagnosis.riskStratification.hematics.evidenceText,
                            }}
                          />
                        </div>
                        <p className="font-medium mb-2">Параметры:</p>
                        <ul className="text-sm text-gray-700 space-y-1 mb-4">
                          {escGuideline.diagnosis.riskStratification.hematics.parameters.map(
                            (param, idx) => (
                              <li key={idx}>• {param}</li>
                            )
                          )}
                        </ul>
                        <p className="font-medium mb-2">Уровни риска:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {escGuideline.diagnosis.riskStratification.hematics.scores.map(
                            (score, idx) => (
                              <li key={idx}>• {score}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Калькуляторы риска (быстрый переход, 2-в-1 ESC + ACC/AHA) */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      Калькуляторы риска (быстрый переход)
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <a

