// app/guides/acs/page.tsx — ОКС (финал «код-окс»)
// Next.js client component. Без framer-motion. Добавлены: Complications, MINOCA, Comorbidities.
// Десктоп: селекты компактнее и с выравниванием текста по центру; Мобайл: крупные тач-таргеты, Специальность выше Нозологии.

'use client';

import { useState } from 'react';
import {
  ExternalLink,
  Clock,
  CheckCircle,
  AlertTriangle,
  FolderPlus,
  ChevronDown,
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

interface Nosology {
  id: string;
  label: string;
  group: string;
}

const CARDIOLOGY_NOSOLOGIES: Nosology[] = [
  { id: 'acs', label: 'Острый коронарный синдром (ОКС)', group: 'Ишемическая болезнь сердца' },
  { id: 'chronic-ihd', label: 'Хроническая ишемическая болезнь сердца', group: 'Ишемическая болезнь сердца' },
  { id: 'stable-angina', label: 'Стабильная стенокардия', group: 'Ишемическая болезнь сердца' },
  { id: 'post-mi', label: 'Постинфарктный период', group: 'Ишемическая болезнь сердца' },

  { id: 'af', label: 'Фибрилляция предсердий', group: 'Нарушения ритма и проводимости' },
  { id: 'other-arrhythmias', label: 'Другие нарушения ритма и проводимости', group: 'Нарушения ритма и проводимости' },

  { id: 'hf', label: 'Хроническая сердечная недостаточность', group: 'Сердечная недостаточность' },

  { id: 'htn', label: 'Артериальная гипертензия', group: 'Артериальная гипертензия' },

  { id: 'valvular', label: 'Поражения клапанов сердца', group: 'Поражения клапанов и врождённые пороки' },
  { id: 'congenital', label: 'Врожденные пороки сердца у взрослых', group: 'Поражения клапанов и врождённые пороки' },

  { id: 'cardiomyopathies', label: 'Кардиомиопатии', group: 'Кардиомиопатии' },

  { id: 'myocarditis', label: 'Миокардиты', group: 'Воспалительные заболевания миокарда и перикарда' },
  { id: 'pericarditis', label: 'Перикардиты', group: 'Воспалительные заболевания миокарда и перикарда' },

  { id: 'pah', label: 'Легочная гипертензия', group: 'Лёгочная гипертензия и ТЭЛА' },
  { id: 'pe', label: 'Тромбоэмболия легочной артерии (ТЭЛА)', group: 'Лёгочная гипертензия и ТЭЛА' },
];

// Унифицированные типы записей (чтобы не ловить TS-ошибки при optional-полях)
interface DrugRec {
  drug: string;
  dose?: string;
  indication?: string;
  contraindications?: string[];
  options?: string[];
  timing?: string;
  notes?: string;
  note?: string;
  duration?: string;
  target?: string;
  monitoring?: string;
  deescalation?: string[];
  escalation?: string[];
  class: RecommendationClass;
  level: EvidenceLevel;
  evidenceText?: string;
}

export default function ACSPage() {
  const [selectedTab, setSelectedTab] = useState<'diagnosis' | 'treatment' | 'complications' | 'prevention' | 'comparison'>('diagnosis');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Кардиология');
  const [selectedNosology, setSelectedNosology] = useState('Острый коронарный синдром (ОКС)');
  const [isIntroOpen, setIsIntroOpen] = useState(true);

  const groupedCardiologyNosologies = CARDIOLOGY_NOSOLOGIES.reduce<Record<string, Nosology[]>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  const escGuideline = {
    title: 'Острый коронарный синдром',
    version: 'ESC 2023-2024',
    sources: {
      nsteacs: 'https://academic.oup.com/eurheartj/article/44/38/3720/7235365',
      stemi: 'https://academic.oup.com/eurheartj/advance-article/doi/10.1093/eurheartj/ehae170/7649113',
      us: '#',
      full: 'https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines',
    },

    // ДИАГНОСТИКА (как было) + добавлен блок MINOCA
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
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень C - Консенсус экспертов/малые исследования',
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
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень C - Консенсус экспертов/малые исследования',
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
            examples: ['Передний STEMI: V1-V4', 'Нижний STEMI: II, III, aVF', 'Боковой STEMI: I, aVL, V5-V6', 'Задний STEMI: V7-V9'],
            class: 'I' as RecommendationClass,
            level: 'B' as EvidenceLevel,
            evidenceText: 'Класс I; Уровень B',
          },
          {
            criteria: 'Новая блокада ЛНПГ',
            details: ['Ширина QRS ≥120 мс', 'Типичная морфология БЛНПГ', 'Согласованность с клиникой'],
            class: 'I' as RecommendationClass,
            level: 'B' as EvidenceLevel,
            evidenceText: 'Класс I; Уровень B',
          },
        ],
        nstemi: [
          {
            criteria: 'ST-депрессия',
            details: ['≥0.5 мм в ≥2 смежных отведениях', 'Горизонтальная/косонисходящая'],
            class: 'I' as RecommendationClass,
            level: 'B' as EvidenceLevel,
            evidenceText: 'Класс I; Уровень B',
          },
          {
            criteria: 'Инверсия зубца T',
            details: ['≥1 мм в отведениях с доминирующим R', 'Глубокая симметричная инверсия'],
            class: 'I' as RecommendationClass,
            level: 'B' as EvidenceLevel,
            evidenceText: 'Класс I; Уровень B',
          },
          {
            criteria: 'Преходящая ST-элевация',
            details: ['<20 минут', 'Спонтанное разрешение'],
            class: 'I' as RecommendationClass,
            level: 'B' as EvidenceLevel,
            evidenceText: 'Класс I; Уровень B',
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
          evidenceText: 'Класс I; Уровень A',
        },
        additionalMarkers: [
          'КФК-МВ: менее специфичен, но полезен при недоступности тропонина',
          'Миоглобин: ранний маркер, низкая специфичность',
          'BNP/NT-proBNP: прогностическая ценность',
        ],
      },

      riskStratification: {
        grace: {
          parameters: ['Возраст', 'ЧСС', 'Систолическое АД', 'Креатинин', 'Признаки СН', 'ЭКГ изменения', 'Повышение ферментов'],
          scores: ['Низкий: <109', 'Средний: 109-140', 'Высокий: >140'],
          mortality: ['Госпитальная: 0.6%→21%', '6-месячная: 3%→26%'],
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I; Уровень B',
        },
        hematics: {
          parameters: ['Возраст', 'Тропонин', 'ЭКГ изменения', 'Факторы риска', 'Повторяемость боли'],
          scores: ['Очень низкий: 0-2', 'Низкий: 3-5', 'Высокий: ≥6'],
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I; Уровень B',
        },
      },

      differentialDiagnosis: [
        { condition: 'Перикардит', features: ['Боль зависит от положения', 'Шум трения', 'Диффузная ST-элевация', 'Нет реципрокности'] },
        { condition: 'ТЭЛА', features: ['Внезапная одышка', 'Гипоксия', 'Правонагрузка на ЭКГ', '↑D-димер'] },
        { condition: 'Расслоение аорты', features: ['Мигрирующая боль', 'Асимметрия АД', 'Широкое средостение', 'Невро-симптомы'] },
      ],

      // ДОБАВЛЕНО: MINOCA — практическое ведение
      minoca: {
        definition: 'Инфаркт миокарда при не-обструктивных коронарных артериях (стеноз <50%) при ангиографии.',
        diagnosticSteps: [
          'Исключить альтернативы: миокардит (CMR), ТЭЛА, ТКМ, тип 2 ИМ (supply/demand).',
          'Оценить механизм: спазм, микрососудистая дисфункция, SCAD, тромб/эмбол.',
          'Рассмотреть ОКТ/IVUS при неясном механизме (там, где доступно).',
        ],
        therapy: [
          {
            drug: 'Статины высокой интенсивности',
            dose: 'Аторвастатин 40–80 мг/сут или Розувастатин 20–40 мг/сут',
            note: 'Показаны большинству пациентов при атеротромбоз-подозрении',
            class: 'I' as RecommendationClass,
            level: 'A' as EvidenceLevel,
            evidenceText: 'Снижение MACE; множественные исследования',
          },
          {
            drug: 'ИАПФ/БРА',
            dose: 'Рамиприл 2.5–10 мг/сут; Валсартан 80–320 мг/сут',
            note: 'Особенно при сниженной ФВ/диабете/гипертензии',
            class: 'I' as RecommendationClass,
            level: 'A' as EvidenceLevel,
          },
          {
            drug: 'Бета-блокаторы',
            dose: 'Метопролол 25–200 мг/сут (титрация) или Бисопролол 2.5–10 мг/сут',
            note: 'При ишемии/тахикардии/боли; избегать при вазоспазме с брадикардией',
            class: 'IIa' as RecommendationClass,
            level: 'B' as EvidenceLevel,
          },
          {
            drug: 'Кальций-блокаторы (вазоспазм)',
            dose: 'Дилтиазем 120–360 мг/сут или Амлодипин 5–10 мг/сут',
            note: '± Длительно действующие нитраты (изосорбид мононитрат 30–60 мг)',
            class: 'I' as RecommendationClass,
            level: 'B' as EvidenceLevel,
          },
          {
            drug: 'SCAD (спонтанная диссекция)',
            note: 'Избегать тромболизиса; предпочтение консервативной тактике; ЧКВ только при ишемии высокого риска',
            class: 'IIa' as RecommendationClass,
            level: 'C' as EvidenceLevel,
          },
        ],
      },
    },

    // ЛЕЧЕНИЕ (возвращено как было по вашему шаблону)
    treatment: {
      generalMeasures: [
        {
          measure: 'Кислородотерапия',
          indication: 'SatO2 <90% или дыхательная недостаточность',
          dose: '2-4 л/мин через назальные канюли',
          class: 'I' as RecommendationClass,
          level: 'C' as EvidenceLevel,
          evidenceText: 'Класс I; Уровень C',
        },
        {
          measure: 'Обезболивание',
          indication: 'Боль умеренной-сильной интенсивности',
          dose: 'Морфин 2-4 мг в/в болюс + титрация; при непереносимости — фентанил 25-50 мкг',
          options: ['Морфин 2-4 мг в/в + метоклопрамид 10 мг', 'При непереносимости: фентанил 25-50 мкг'],
          class: 'I' as RecommendationClass,
          level: 'C' as EvidenceLevel,
          evidenceText: 'Класс I; Уровень C',
        },
        {
          measure: 'Нитроглицерин',
          indication: 'Персистирующая боль, СН, гипертензия',
          contraindications: ['САД <90 мм рт.ст.', 'Ингибиторы ФДЭ-5', 'Выраженная брадикардия'],
          dose: '0.3-0.6 мг сублингвально или 5-10 мкг/мин в/в',
          class: 'I' as RecommendationClass,
          level: 'C' as EvidenceLevel,
          evidenceText: 'Класс I; Уровень C',
        },
      ],

      antiplateletTherapy: [
        {
          drug: 'Аспирин',
          loading: '150-300 мг PO (разжевать)',
          maintenance: '75-100 мг/сут постоянно',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I; Уровень A',
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
              advantages: ['Быстрое начало', 'Обратимое связывание'],
              disadvantages: ['Одышка (10-15%)', 'Кровотечения'],
              class: 'I' as RecommendationClass,
              level: 'A' as EvidenceLevel,
              evidenceText: 'Класс I; Уровень A',
            },
            {
              name: 'Прасугрел',
              loading: '60 мг',
              maintenance: '10 мг/сут (5 мг при массе <60 кг)',
              duration: '12 месяцев',
              advantages: ['Мощный эффект', 'Меньше одышки'],
              disadvantages: ['Противопоказан при инсульте/ТИА'],
              class: 'I' as RecommendationClass,
              level: 'B' as EvidenceLevel,
              evidenceText: 'Класс I; Уровень B',
            },
            {
              name: 'Клопидогрел',
              loading: '600 мг',
              maintenance: '75 мг/сут',
              duration: '12 месяцев',
              advantages: ['Хорошая переносимость', 'Низкий риск кровотечений'],
              disadvantages: ['Медленное начало', 'Вариабельность ответа'],
              class: 'I' as RecommendationClass,
              level: 'B' as EvidenceLevel,
              evidenceText: 'Класс I; Уровень B',
            },
          ],
        },
      ],

      anticoagulation: [
        {
          drug: 'Фондапаринукс',
          dose: '2.5 мг п/к 1 раз/сут',
          indication: 'Предпочтителен при NSTE-ACS без срочного ЧКВ',
          notes: 'Не при КК <30 мл/мин; при ЧКВ — дополнительно болюс НФГ',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I; Уровень A',
        },
        {
          drug: 'Эноксапарин (НМГ)',
          dose: '1 мг/кг п/к каждые 12 ч (КК <30 мл/мин — 1 мг/кг 1 раз/сут)',
          indication: 'Альтернатива фондапаринуксу',
          notes: 'Коррекция дозы при ХБП; учитывать суммарную антикоагуляцию при ЧКВ',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I; Уровень A',
        },
        {
          drug: 'Нефракционированный гепарин',
          dose: '60–70 Ед/кг в/в болюс (макс 5000 Ед), затем 12–15 Ед/кг/ч по АЧТВ',
          indication: 'STEMI/NSTE-ACS при первичном ЧКВ или тяжёлой ХБП',
          notes: 'Контроль АЧТВ; риск ГИТ',
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I; Уровень B',
        },
      ] as DrugRec[],

      reperfusion: {
        stemi: [
          {
            method: 'Первичное ЧКВ',
            timing: 'FMC-to-device ≤120 мин, door-to-balloon ≤90 мин',
            indications: ['Всем пациентам с STEMI при доступности в сроки'],
            results: ['Снижение смертности', 'Уменьшение размера ИМ', 'Снижение частоты СН'],
            class: 'I' as RecommendationClass,
            level: 'A' as EvidenceLevel,
            evidenceText: 'Класс I; Уровень A',
          },
          {
            method: 'Фибринолиз',
            timing: 'FMC-to-needle ≤10 мин при задержке ЧКВ >120 мин',
            indications: ['Раннее поступление (<2 ч)', 'Передне-септальная локализация'],
            contraindications: [
              'Абсолютные: ВЧК, недавняя ЗЧМТ, опухоли ЦНС',
              'Относительные: тяжёлая АГ, недавние операции/кровотечения',
            ],
            drugs: [
              'Тенектеплаза: вес-зависимо 30–50 мг',
              'Альтеплаза: 15 мг болюс + 0.75 мг/кг (макс 50) за 30 мин + 0.5 мг/кг (макс 35) за 60 мин',
            ],
            class: 'I' as RecommendationClass,
            level: 'A' as EvidenceLevel,
            evidenceText: 'Класс I; Уровень A',
          },
        ],
        nstemi: [
          {
            strategy: 'Ранняя инвазивная (<24 ч)',
            indications: ['Нестабильность/шок', 'Рецидив/рефрактерная ишемия', 'ЖОА', 'Механические осложнения', 'Острая СН', 'GRACE >140'],
            class: 'I' as RecommendationClass,
            level: 'A' as EvidenceLevel,
            evidenceText: 'Класс I; Уровень A',
          },
          {
            strategy: 'Отсроченная инвазивная (25–72 ч)',
            indications: ['Диабет', 'Почечная недостаточность', 'ФВ ЛЖ снижена', 'Ранняя пост-ИМ стенокардия'],
            class: 'I' as RecommendationClass,
            level: 'A' as EvidenceLevel,
            evidenceText: 'Класс I; Уровень A',
          },
        ],
      },

      adjunctiveTherapy: [
        {
          drug: 'Бета-блокаторы',
          indication: 'Тахикардия, гипертензия, сохраненная функция ЛЖ',
          contraindications: ['Острая декомпенсация СН', 'Выраженная брадикардия', 'АВ-блок II–III', 'Бронхоспазм'],
          options: ['Метопролол 25–50 мг 2 р/сут', 'Бисопролол 2.5–10 мг/сут'],
          timing: 'В первые 24 ч при стабильном состоянии',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I; Уровень A',
        },
        {
          drug: 'Статины высокой интенсивности',
          indication: 'Все пациенты с ОКС',
          options: ['Аторвастатин 80 мг/сут', 'Розувастатин 20–40 мг/сут'],
          timing: 'Немедленно при поступлении',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I; Уровень A',
        },
        {
          drug: 'ИАПФ/БРА',
          indication: 'СН, ФВ <40%, диабет, гипертензия',
          options: ['Рамиприл 2.5–10 мг/сут', 'Периндоприл 2–8 мг/сут', 'Валсартан 80–320 мг/сут'],
          timing: 'В первые 24 ч при стабильности',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I; Уровень A',
        },
        {
          drug: 'Антагонисты минералокортикоидных рецепторов',
          indication: 'ФВ ЛЖ ≤40% + СН или СД после ОКС',
          options: ['Эплеренон 25–50 мг/сут', 'Спиронолактон 25–50 мг/сут'],
          timing: 'В течение 3–7 сут при стабильных креатинине и калии',
          contraindications: ['Калий >5.0 ммоль/л', 'КК <30 мл/мин'],
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I; Уровень B',
        },
        {
          drug: 'SGLT2 ингибиторы',
          indication: 'СН со сниженной/умеренно сниженной ФВ после ОКС (с/без СД)',
          options: ['Дапаглифлозин 10 мг/сут', 'Эмпаглифлозин 10 мг/сут'],
          timing: 'После стабилизации гемодинамики/ФП',
          contraindications: ['КК <20–25 мл/мин (по препарату)'],
          class: 'IIa' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс IIa; Уровень A',
        },
      ] as DrugRec[],

      commonPitfalls: [
        {
          title: 'Задержка реперфузии при STEMI',
          items: [
            'Ожидание спонтанной регрессии вместо немедленного ЧКВ/фибринолиза',
            'Перевод в не-ЧКВ центр при доступном интервенционном',
            'Нет контроля таймингов (FMC-device, door-balloon, FMC-needle)',
          ],
          severity: 'high',
        },
        {
          title: 'Недооценка риска у NSTE-ACS',
          items: [
            'Нет расчёта GRACE/HEART',
            'Задержка инвазивной стратегии при высоких тропонинах/динамике ЭКГ',
            'Слишком ранняя деэскалация ДАТТ',
          ],
          severity: 'high',
        },
        {
          title: 'Ошибки антитромботической терапии',
          items: [
            'Дублирование антикоагулянтов',
            'Нет коррекции дозы при сниженной ФП',
            'Продолжение полной ДАТТ при очень высоком риске кровотечений без пересмотра',
          ],
          severity: 'medium',
        },
      ],
    },

    // НОВЫЙ РАЗДЕЛ: ОСЛОЖНЕНИЯ (в карточках, с дозами/алгоритмами/классами)
    complications: {
      cards: [
        {
          title: 'No-reflow / Slow-flow при ЧКВ',
          context: 'Персистирующая микроциркуляторная обструкция после реканализации',
          actions: [
            { drug: 'Аденозин (интракоронарно)', dose: '60–150 мкг болюсно, можно повторять', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel, evidenceText: 'Улучшение микроперфузии' },
            { drug: 'Никорандил (интракоронарно)', dose: '2–6 мг болюсно', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
            { drug: 'Ептифибатид (GP IIb/IIIa)', dose: '180 мкг/кг болюс ×2 с интервалом 10 мин, затем 2 мкг/кг/мин 12–18 ч', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel, evidenceText: 'При выраженном тромбозе/NO-reflow' },
            { drug: 'Нитропрепараты (интракоронарно)', dose: '100–200 мкг болюс', class: 'IIb' as RecommendationClass, level: 'C' as EvidenceLevel },
          ],
          notes: ['Оптимизация давления, избегать тахикардии', 'Мягкая постдилатация; рассмотреть аспирацию тромба селективно'],
        },
        {
          title: 'Кардиогенный шок',
          context: 'Систолическое АД <90 мм рт.ст. >30 мин и признаки гипоперфузии',
          actions: [
            { drug: 'Норадреналин', dose: '0.05–0.5 мкг/кг/мин титрация', class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel },
            { drug: 'Добутамин', dose: '2–20 мкг/кг/мин при сниженной ФВ', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
            { drug: 'Ранняя реваскуляризация', dose: 'Немедленное ЧКВ КВА', class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel, evidenceText: 'Улучшает выживаемость' },
            { drug: 'ИABP/МКО', dose: 'Рассмотреть при механических осложнениях', class: 'IIa' as RecommendationClass, level: 'C' as EvidenceLevel },
          ],
          notes: ['Коррекция ацидоза, гипоксии, электролитов', 'Избегать чрезмерной вазоконстрикции'],
        },
        {
          title: 'Жизнеопасные аритмии (VT/VF)',
          context: 'В контексте острого ИМ',
          actions: [
            { drug: 'Купирование VF/VT', dose: 'Электроимпульсная терапия по ACLS', class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel },
            { drug: 'Амиодарон', dose: '300 мг в/в болюс, затем 150 мг при рецидиве; инфузия 1 мг/мин 6 ч, далее 0.5 мг/мин', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
            { drug: 'Лидокаин (альтернатива)', dose: '1–1.5 мг/кг болюс, затем 1–4 мг/мин', class: 'IIb' as RecommendationClass, level: 'B' as EvidenceLevel },
          ],
          notes: ['Коррекция гипокалиемии/магниемии', 'Исключить ишемию/реокклюзию'],
        },
        {
          title: 'Острая митральная регургитация (разрыв папиллярной мышцы)',
          context: 'Внезапная лёгочная отёчность, шум МК',
          actions: [
            { drug: 'Нитропруссид/нитраты', dose: 'Титрация под АД', class: 'IIa' as RecommendationClass, level: 'C' as EvidenceLevel },
            { drug: 'Экстренная хирургия', dose: 'Ремонт/протезирование МК', class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel },
            { drug: 'Механическая поддержка', dose: 'IABP/МКО при нестабильности', class: 'IIa' as RecommendationClass, level: 'C' as EvidenceLevel },
          ],
          notes: ['Не задерживать хирургическое решение', 'Эхокардиография bedside'],
        },
        {
          title: 'Острая левожелудочковая недостаточность/отёк лёгких',
          context: 'Тяжёлая одышка, влажные хрипы, гипоксемия',
          actions: [
            { drug: 'Фуросемид', dose: '20–40 мг в/в, титрация по эффекту', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel },
            { drug: 'Нитраты', dose: 'В/в 10–200 мкг/мин по АД', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
            { drug: 'НИВЛ/CPAP', dose: 'Снижение преднагрузки, улучшение оксигенации', class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel },
          ],
          notes: ['Исключить механические осложнения', 'Контролировать диурез/электролиты'],
        },
        {
          title: 'Кровотечение на ДАТТ/антикоагулянтах',
          context: 'Желудочно-кишечные/другие кровотечения',
          actions: [
            { drug: 'ИПП', dose: 'Пантопразол 80 мг болюс → 8 мг/ч 72 ч (при ЖКК)', class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel },
            { drug: 'Пересмотр ДАТТ', dose: 'Сокращение длительности/переход на монотерапию (клопидогрел)', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
            { drug: 'Антидоты', dose: 'Идаруцизумаб (дабигатран), Андексанет (апиксабан/ривароксабан)', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
          ],
          notes: ['Стратификация по ARC-HBR/PRECISE-DAPT', 'Мультидисциплинарное решение'],
        },
      ],
    },

    secondaryPrevention: {
      duration: 'Пожизненно после ОКС',
      medications: [
        {
          drug: 'Двойная антитромбоцитарная терапия',
          duration: '12 месяцев после ЧКВ',
          deescalation: ['Высокий риск кровотечений: 3–6 месяцев', 'Рассмотреть переход на клопидогрел после 1–3 мес', 'PRECISE-DAPT и ARC-HBR в помощь'],
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I; Уровень A',
        },
        {
          drug: 'Статины',
          target: 'ЛПНП ↓ ≥50% и <1.4 ммоль/л',
          monitoring: 'Через 4–12 недель, затем ежегодно',
          escalation: ['Если цель не достигнута: + эзетимиб 10 мг/сут', 'Далее — ингибитор PCSK9'],
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I; Уровень A',
        },
      ] as DrugRec[],
      lifestyle: [
        {
          area: 'Курение',
          recommendation: 'Полное прекращение',
          interventions: ['Консультирование', 'НЗТ', 'Варениклин/бупропион'],
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I; Уровень B',
        },
        {
          area: 'Диета',
          recommendation: 'Средиземноморская',
          components: ['Овощи/фрукты/цельнозерновые', 'Рыба 2 р/нед', 'Оливковое масло', 'Соль <5 г/сут'],
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I; Уровень B',
        },
        {
          area: 'Физическая активность',
          recommendation: '150 мин/нед умеренной или 75 мин/нед интенсивной',
          progression: 'Постепенно под контролем',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I; Уровень A',
        },
      ],
    },

    // Сопутствующие состояния — только то, что меняет терапию
    comorbidities: {
      items: [
        {
          title: 'Сахарный диабет и йодконтраст',
          points: [
            'Метформин: при eGFR <30 — отменить; при 30–59 — рассмотреть паузу в день контраста и 48 ч после с контролем креатинина',
            'SGLT2: при острой болезни/риске дегидратации — временно отменить',
          ],
          class: 'IIa' as RecommendationClass, level: 'C' as EvidenceLevel,
        },
        {
          title: 'Хроническая болезнь почек',
          points: [
            'Эноксапарин: КК <30 — 1 мг/кг 1 р/сут',
            'Фондапаринукс: избегать при КК <30',
            'Контраст: гидратация; минимизировать дозу контраста',
          ],
          class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel,
        },
        {
          title: 'Фибрилляция предсердий после ЧКВ',
          points: [
            'ОАК + клопидогрел (предпочтительно) + аспирин ≤1 нед (при высоком ишемическом риске), затем ОАК + клопидогрел до 6–12 мес',
            'Избегать трёхкомпонентной терапии >1 нед без веских причин',
          ],
          class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel,
        },
        {
          title: 'ХОБЛ/астма',
          points: [
            'Кардиоселективные ББ (бисопролол/метопролол) допустимы при необходимости',
            'Избегать бронхоспазма; титровать осторожно',
          ],
          class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel,
        },
      ],
    },

    comparison: {
      title: 'Сравнение Европейских (ESC 2023-2024) и Американских (ACC/AHA 2025) рекомендаций',
      keyDifferences: [
        {
          aspect: 'Дозировка аспирина',
          eu: '150–300 мг нагрузка, 75–100 мг/сут поддержка',
          us: '325 мг нагрузка, 81 мг/сут поддержка',
          significance: 'US — более высокая нагрузочная доза',
          class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel,
        },
        {
          aspect: 'Выбор P2Y12',
          eu: 'Прасугрел предпочтителен при планируемом ЧКВ',
          us: 'Тикагрелор или прасугрел — равноправно',
          significance: 'ESC конкретнее про прасугрел',
          class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel,
        },
        {
          aspect: 'Сроки ЧКВ при NSTEMI',
          eu: '<24 ч высокий риск, <72 ч промежуточный',
          us: '<12–24 ч при среднем/высоком риске',
          significance: 'US агрессивнее по срокам',
          class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel,
        },
        {
          aspect: 'Длительность ДАТТ',
          eu: '12 мес стандартно; 3–6 мес при HBR',
          us: '6–12 мес; возможно до 30 мес при низком риске кровотечений',
          significance: 'US более гибко',
          class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel,
        },
      ],
      practicalImplications: [
        'EU — более консервативен в антиагрегантах',
        'US — агрессивнее в сроках инвазивной тактики',
        'Оба сходятся в вторичной профилактике',
        'Индивидуализация по риску и локальным протоколам',
      ],
    },
  };

  // UI helpers
  const RecommendationBadge = ({ rec }: { rec: Recommendation }) => {
    const cls: RecommendationClass = rec.class ?? 'I';
    const lvl: EvidenceLevel = rec.level ?? 'A';
    return (
      <div className="flex flex-col gap-1 text-sm min-w-[170px]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-2 py-1 rounded border ${
            cls === 'I' ? 'bg-green-100 text-green-800 border-green-300'
            : cls === 'IIa' ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
            : cls === 'IIb' ? 'bg-blue-100 text-blue-800 border-blue-300'
            : 'bg-red-100 text-red-800 border-red-300'
          }`}>Класс {cls}</span>
          <span className={`px-2 py-1 rounded border ${
            lvl === 'A' ? 'bg-green-100 text-green-800 border-green-300'
            : lvl === 'B' ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
            : 'bg-red-100 text-red-800 border-red-300'
          }`}>Уровень {lvl}</span>
        </div>
        {rec.evidenceText && <p className="text-xs text-gray-600 max-w-xs">{rec.evidenceText}</p>}
      </div>
    );
  };

  const TimingBadge = ({ time }: { time: string }) => (
    <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
      <Clock size={14} />
      {time}
    </div>
  );

  const handleSaveSection = () => {};

  // порядок вкладок (включая Complications между Treatment и Prevention)
  const sections = [
    { id: 'diagnosis' as const, label: 'Диагностика' },
    { id: 'treatment' as const, label: 'Лечение' },
    { id: 'complications' as const, label: 'Осложнения' },
    { id: 'prevention' as const, label: 'Профилактика' },
    { id: 'comparison' as const, label: 'Сравнение' },
  ];

  return (
    <main className="min-h-screen bg-[#fcfcee] py-8">
      <div className="max-w-[1800px] mx-auto px-4">
        {/* Заголовок и фильтры */}
        <section className="border-b border-gray-200 mb-8">
          <div className="max-w-[1800px] mx-auto px-4 pt-4 pb-4">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-0">
              {/* Специальность — мобильная первая; десктоп справа, компактнее и центрированный текст */}
              <div className="flex-1 flex justify-start order-1 w-full lg:w-auto lg:order-3 lg:justify-end">
                <div className="flex flex-col items-start lg:items-end gap-1 w-full lg:w-auto">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f] hidden lg:block">Специальность</span>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="rounded-full border border-[#d3cec4] bg-white px-4 h-12 min-h-[48px] text-base text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52] w-full text-center lg:(w-[200px] h-10 min-h-0 text-sm)"
                  >
                    {SPECIALTIES.map((spec) => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Заголовок — по центру, после фильтров на мобиле */}
              <div className="flex-shrink-0 text-center order-4 lg:order-2 w-full">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {escGuideline.title}
                </h1>
              </div>

              {/* Нозология — мобильная вторая; десктоп слева, компактнее и центрированный текст */}
              <div className="flex-1 flex justify-end order-2 w-full lg:w-auto lg:order-1 lg:justify-start">
                <div className="flex flex-col gap-1 w-full lg:w-auto">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f] hidden lg:block">Нозология</span>
                  <select
                    value={selectedNosology}
                    onChange={(e) => setSelectedNosology(e.target.value)}
                    className="rounded-full border border-[#d3cec4] bg-white px-4 h-12 min-h-[48px] text-base text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52] w-full text-center lg:(w-[260px] h-10 min-h-0 text-sm)"
                  >
                    {Object.entries(groupedCardiologyNosologies).map(([groupName, items]) => (
                      <optgroup key={groupName} label={groupName}>
                        {items.map((nosology) => (
                          <option key={nosology.id} value={nosology.label}>{nosology.label}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Ссылки и предупреждение */}
            <div className="text-center mt-6 space-y-3">
              <div className="flex justify-center gap-4 flex-wrap">
                <a href={escGuideline.sources.nsteacs} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  <ExternalLink size={16} />
                  ESC NSTE-ACS 2023
                </a>
                <a href={escGuideline.sources.stemi} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  <ExternalLink size={16} />
                  ESC STEMI 2024
                </a>
                <a href={escGuideline.sources.us} className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
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
          {/* Левое меню (десктоп) */}
          <aside className="hidden lg:block lg:w-56 flex-shrink-0">
            <div className="sticky top-40">
              <div className="text-sm font-semibold tracking-[0.16em] text-[#9c978f] uppercase mb-3">
                Разделы гайда
              </div>
              <div className="space-y-2">
                {sections.map(({ id, label }) => {
                  const active = selectedTab === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setSelectedTab(id)}
                      className={`w-full rounded-full border px-3 py-2 text-sm text-left font-medium transition
                        ${active ? 'bg-[#013c37] text-white border-[#013c37]' : 'bg-white text-[#1f2933] border-[#d3cec4]'}
                        hover:ring-1 hover:ring-[#015d52] hover:shadow-[0_0_10px_#015D52]`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Контент */}
          <div className="flex-1 min-w-0">
            {/* Навигация чипами – мобильные/планшеты */}
            <div className="flex lg:hidden border-b border-gray-200 mb-6 overflow-x-auto">
              {sections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setSelectedTab(id)}
                  className={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                    selectedTab === id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Карточка гайда */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
              {/* ДИАГНОСТИКА */}
              {selectedTab === 'diagnosis' && (
                <div className="space-y-12">
                  {/* Краткая ориентация (ОКС) */}
                  <section>
                    <button
                      onClick={() => setIsIntroOpen(v => !v)}
                      className="w-full flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3"
                    >
                      <span className="text-lg font-semibold text-emerald-900">Краткая ориентация (ОКС)</span>
                      <ChevronDown className={`transition ${isIntroOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isIntroOpen && (
                      <div className="border border-emerald-200 border-t-0 rounded-b-xl p-4 space-y-4">
                        <p className="text-gray-700">
                          ОКС — острое проявление ИБС из-за несоответствия между коронарным кровотоком и потребностью миокарда в O2.
                        </p>
                        <p className="text-gray-700">
                          Ключевая классификация: STEMI (персистирующая подъём ST/новая БЛНПГ) и NSTE-ACS (NSTEMI/нестабильная стенокардия).
                        </p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-emerald-100 text-emerald-900">
                                <th className="p-2 text-left">Тип</th>
                                <th className="p-2 text-left">Критерии</th>
                                <th className="p-2 text-left">Тактика</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="p-2 font-medium">STEMI</td>
                                <td className="p-2">Персистирующая ST-элевация/новая БЛНПГ + клиника ишемии</td>
                                <td className="p-2">Немедленная реперфузия (первичное ЧКВ либо фибринолиз)</td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-2 font-medium">NSTEMI</td>
                                <td className="p-2">Изменения ST/T ± ↑тропонина</td>
                                <td className="p-2">Инвазивная стратегия по риску (GRACE)</td>
                              </tr>
                              <tr>
                                <td className="p-2 font-medium">Нестабильная стенокардия</td>
                                <td className="p-2">Клиника ишемии без ↑тропонина</td>
                                <td className="p-2">Риск-стратификация, антиангинальная/антитромботическая терапия</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </section>

                  {/* Первичная оценка */}
                  <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Первичная оценка и диагностика</h2>
                    <div className="space-y-6">
                      {escGuideline.diagnosis.initialAssessment.map((step, index) => (
                        <div key={index} className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                            <div><h3 className="text-xl font-semibold text-gray-900">{step.step}</h3></div>
                            <div className="flex flex-col md:flex-row gap-3 md:items-center">
                              <TimingBadge time={step.timing} />
                              <RecommendationBadge rec={{ class: step.class, level: step.level, evidenceText: step.evidenceText }} />
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
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                              <h5 className="font-semibold text-gray-900">{criteria.criteria}</h5>
                              <RecommendationBadge rec={{ class: criteria.class, level: criteria.level, evidenceText: criteria.evidenceText }} />
                            </div>
                            <ul className="text-sm text-gray-700 space-y-1">
                              {criteria.details.map((detail, i) => (<li key={i}>• {detail}</li>))}
                            </ul>
                            {criteria.examples && (
                              <div className="mt-2">
                                <p className="font-medium text-sm">Примеры:</p>
                                <ul className="text-sm text-gray-600 space-y-1">
                                  {criteria.examples.map((example, i) => (<li key={i}>• {example}</li>))}
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
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                              <h5 className="font-semibold text-gray-900">{criteria.criteria}</h5>
                              <RecommendationBadge rec={{ class: criteria.class, level: criteria.level, evidenceText: criteria.evidenceText }} />
                            </div>
                            <ul className="text-sm text-gray-700 space-y-1">
                              {criteria.details.map((detail, i) => (<li key={i}>• {detail}</li>))}
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
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <h4 className="text-lg font-semibold text-purple-800">Высокочувствительный тропонин</h4>
                        <RecommendationBadge rec={{
                          class: escGuideline.diagnosis.biomarkers.highSensitivityTroponin.class,
                          level: escGuideline.diagnosis.biomarkers.highSensitivityTroponin.level,
                          evidenceText: escGuideline.diagnosis.biomarkers.highSensitivityTroponin.evidenceText,
                        }} />
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="font-medium mb-2">Протокол: {escGuideline.diagnosis.biomarkers.highSensitivityTroponin.protocol}</p>
                          <p className="text-sm text-gray-700 mb-4">Отсечка: {escGuideline.diagnosis.biomarkers.highSensitivityTroponin.cutoff}</p>
                          <p className="text-sm text-gray-700">Динамика: {escGuideline.diagnosis.biomarkers.highSensitivityTroponin.dynamics}</p>
                        </div>
                        <div>
                          <p className="font-medium mb-2">Интерпретация:</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {escGuideline.diagnosis.biomarkers.highSensitivityTroponin.interpretation.map((item, idx) => (<li key={idx}>• {item}</li>))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Дополнительные биомаркеры</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {escGuideline.diagnosis.biomarkers.additionalMarkers.map((m, idx) => (<li key={idx}>• {m}</li>))}
                      </ul>
                    </div>
                  </section>

                  {/* Стратификация риска */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">Стратификация риска</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                          <h4 className="text-lg font-semibold text-yellow-800">Шкала GRACE</h4>
                          <RecommendationBadge rec={{
                            class: escGuideline.diagnosis.riskStratification.grace.class,
                            level: escGuideline.diagnosis.riskStratification.grace.level,
                            evidenceText: escGuideline.diagnosis.riskStratification.grace.evidenceText,
                          }} />
                        </div>
                        <p className="font-medium mb-2">Параметры:</p>
                        <ul className="text-sm text-gray-700 space-y-1 mb-4">
                          {escGuideline.diagnosis.riskStratification.grace.parameters.map((p, idx) => (<li key={idx}>• {p}</li>))}
                        </ul>
                        <p className="font-medium mb-2">Уровни риска:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {escGuideline.diagnosis.riskStratification.grace.scores.map((s, idx) => (<li key={idx}>• {s}</li>))}
                        </ul>
                      </div>

                      <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                          <h4 className="text-lg font-semibold text-green-800">Шкала HEART</h4>
                          <RecommendationBadge rec={{
                            class: escGuideline.diagnosis.riskStratification.hematics.class,
                            level: escGuideline.diagnosis.riskStratification.hematics.level,
                            evidenceText: escGuideline.diagnosis.riskStratification.hematics.evidenceText,
                          }} />
                        </div>
                        <p className="font-medium mb-2">Параметры:</p>
                        <ul className="text-sm text-gray-700 space-y-1 mb-4">
                          {escGuideline.diagnosis.riskStratification.hematics.parameters.map((p, idx) => (<li key={idx}>• {p}</li>))}
                        </ul>
                        <p className="font-medium mb-2">Уровни риска:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {escGuideline.diagnosis.riskStratification.hematics.scores.map((s, idx) => (<li key={idx}>• {s}</li>))}
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Калькуляторы риска (как было: 3 ссылки, с объединёнными формулировками) */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Калькуляторы риска (быстрый переход)</h3>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                      <a href="/calculators/grace" className="border border-blue-200 rounded-xl px-4 py-3 text-sm flex flex-col justify-between hover:bg-blue-50 transition">
                        <span className="font-semibold text-gray-900 mb-1">GRACE / TIMI-like EU</span>
                        <span className="text-gray-600">Европейская и американская модификация в одном калькуляторе.</span>
                      </a>
                      <a href="/calculators/heart" className="border border-green-200 rounded-xl px-4 py-3 text-sm flex flex-col justify-between hover:bg-green-50 transition">
                        <span className="font-semibold text-gray-900 mb-1">HEART / ED risk</span>
                        <span className="text-gray-600">Краткосрочный риск MACE в приёмном отделении (HEART/EDACS).</span>
                      </a>
                      <a href="/calculators/timi-acs" className="border border-purple-200 rounded-xl px-4 py-3 text-sm flex flex-col justify-between hover:bg-purple-50 transition">
                        <span className="font-semibold text-gray-900 mb-1">TIMI для NSTE-ACS / US</span>
                        <span className="text-gray-600">Стратификация осложнений и прогноза (ESC + ACC/AHA подходы).</span>
                      </a>
                    </div>
                  </section>

                  {/* MINOCA (добавлено в Диагностику) */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">MINOCA: диагностика и ведение</h3>
                    <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                      <p className="mb-3 text-gray-800"><strong>Определение:</strong> {escGuideline.diagnosis.minoca.definition}</p>
                      <p className="font-medium mb-2">Диагностические шаги:</p>
                      <ul className="text-sm text-gray-700 space-y-1 mb-4">
                        {escGuideline.diagnosis.minoca.diagnosticSteps.map((s, idx) => (<li key={idx}>• {s}</li>))}
                      </ul>
                      <p className="font-medium mb-2">Терапия (по механизму/профилю):</p>
                      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {escGuideline.diagnosis.minoca.therapy.map((t, idx) => (
                          <div key={idx} className="bg-white rounded-lg p-4 border border-amber-100">
                            <div className="flex items-start justify-between gap-3 mb-1">
                              <div>
                                <h4 className="font-semibold text-gray-900">{t.drug}</h4>
                                {t.dose && <p className="text-sm text-gray-700"><strong>Доза:</strong> {t.dose}</p>}
                                {t.note && <p className="text-xs text-gray-600 mt-1">{t.note}</p>}
                              </div>
                              <RecommendationBadge rec={{ class: t.class, level: t.level, evidenceText: t.evidenceText }} />
                            </div>
                          </div>
                        ))}
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
                      {escGuideline.treatment.generalMeasures.map((m, idx) => (
                        <div key={idx} className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                            <h3 className="text-xl font-semibold text-gray-900">{m.measure}</h3>
                            <RecommendationBadge rec={{ class: m.class, level: m.level, evidenceText: m.evidenceText }} />
                          </div>
                          {m.indication && <p className="text-gray-700 mb-2"><strong>Показания:</strong> {m.indication}</p>}
                          {m.dose && <p className="text-gray-700"><strong>Дозировка:</strong> {m.dose}</p>}
                          {m.contraindications && (
                            <div className="mt-3">
                              <p className="font-medium text-sm mb-1">Противопоказания:</p>
                              <ul className="text-sm text-gray-700 space-y-1">
                                {m.contraindications.map((c, i) => (<li key={i}>• {c}</li>))}
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
                      <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">Аспирин</h3>
                            <p className="text-gray-600">Нагрузка: {escGuideline.treatment.antiplateletTherapy[0].loading} • Поддержка: {escGuideline.treatment.antiplateletTherapy[0].maintenance}</p>
                          </div>
                          <RecommendationBadge rec={{
                            class: escGuideline.treatment.antiplateletTherapy[0].class as RecommendationClass,
                            level: escGuideline.treatment.antiplateletTherapy[0].level as EvidenceLevel,
                            evidenceText: escGuideline.treatment.antiplateletTherapy[0].evidenceText,
                          }} />
                        </div>
                        <p className="text-gray-700">{escGuideline.treatment.antiplateletTherapy[0].notes}</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">P2Y12 ингибиторы — выбор</h3>
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                          {(escGuideline.treatment.antiplateletTherapy[1] as any)?.options?.map((drug: any, idx: number) => (
                            <div key={idx} className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-sm">
                              <div className="flex flex-wrap md:flex-nowrap md:items-start md:justify-between gap-4 mb-4">
                                <h4 className="text-lg font-semibold text-gray-900">{drug.name}</h4>
                                <RecommendationBadge rec={{ class: drug.class, level: drug.level, evidenceText: drug.evidenceText }} />
                              </div>
                              <div className="space-y-3">
                                <div><span className="font-medium">Нагрузка:</span><span className="text-gray-700 ml-2">{drug.loading}</span></div>
                                <div><span className="font-medium">Поддержка:</span><span className="text-gray-700 ml-2">{drug.maintenance}</span></div>
                                <div><span className="font-medium">Длительность:</span><span className="text-gray-700 ml-2">{drug.duration}</span></div>
                                {drug.advantages && (
                                  <div>
                                    <p className="font-medium text-sm mb-1">Преимущества:</p>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                      {drug.advantages.map((adv: string, i: number) => (<li key={i}>• {adv}</li>))}
                                    </ul>
                                  </div>
                                )}
                                {drug.disadvantages && (
                                  <div>
                                    <p className="font-medium text-sm mb-1">Недостатки:</p>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                      {drug.disadvantages.map((dis: string, i: number) => (<li key={i}>• {dis}</li>))}
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

                  {/* Антикоагулянтная терапия */}
                  <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Антикоагулянтная терапия</h2>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {(escGuideline.treatment.anticoagulation as DrugRec[]).map((ac, idx) => {
                        const isLongTitle = ac.drug === 'Нефракционированный гепарин';
                        return (
                          <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200">
                            <div className={`flex ${isLongTitle ? 'flex-col' : 'flex-col md:flex-row md:items-start md:justify-between'} gap-4 mb-3`}>
                              <h4 className="text-lg font-semibold text-gray-900">{ac.drug}</h4>
                              <RecommendationBadge rec={{ class: ac.class, level: ac.level, evidenceText: ac.evidenceText }} />
                            </div>
                            {ac.indication && <p className="text-sm text-gray-700 mb-1"><strong>Показания:</strong> {ac.indication}</p>}
                            {ac.dose && <p className="text-sm text-gray-700 mb-1"><strong>Дозировка:</strong> {ac.dose}</p>}
                            {ac.notes && (<p className="text-sm text-gray-700"><strong>Особенности:</strong> {ac.notes}</p>)}
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* Реперфузия */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">Стратегии реперфузии</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                        <h4 className="text-lg font-semibold text-red-800 mb-4">STEMI</h4>
                        {escGuideline.treatment.reperfusion.stemi.map((m: any, idx: number) => (
                          <div key={idx} className="mb-6 last:mb-0">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                              <h5 className="font-semibold text-gray-900">{m.method}</h5>
                              <RecommendationBadge rec={{ class: m.class, level: m.level, evidenceText: m.evidenceText }} />
                            </div>
                            <p className="text-sm text-gray-700 mb-2"><strong>Тайминг:</strong> {m.timing}</p>
                            {m.results && (<p className="text-sm text-gray-700 mb-2"><strong>Результаты:</strong> {m.results.join(', ')}</p>)}
                            {m.contraindications && (
                              <div className="mt-2">
                                <p className="font-medium text-sm mb-1">Противопоказания:</p>
                                <ul className="text-sm text-gray-700 space-y-1">
                                  {m.contraindications.map((c: string, i: number) => (<li key={i}>• {c}</li>))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                        <h4 className="text-lg font-semibold text-orange-800 mb-4">NSTEMI</h4>
                        {escGuideline.treatment.reperfusion.nstemi.map((s: any, idx: number) => (
                          <div key={idx} className="mb-6 last:mb-0">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                              <h5 className="font-semibold text-gray-900">{s.strategy}</h5>
                              <RecommendationBadge rec={{ class: s.class, level: s.level, evidenceText: s.evidenceText }} />
                            </div>
                            <ul className="text-sm text-gray-700 space-y-1">
                              {s.indications.map((ind: string, i: number) => (<li key={i}>• {ind}</li>))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Частые ошибки */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Частые ошибки и подводные камни</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Блок для ОИТ/ЕД/инвазивных лабораторий; можно использовать как чек-лист перед выпиской.
                    </p>
                    <div className="space-y-4">
                      {escGuideline.treatment.commonPitfalls.map((p: any, idx: number) => (
                        <div key={idx} className="bg-red-50/70 rounded-xl p-4 border border-red-200">
                          <div className="flex items-start gap-2 mb-2">
                            <AlertTriangle className="text-red-500 mt-0.5" size={18} />
                            <h4 className="font-semibold text-gray-900">{p.title}</h4>
                          </div>
                          <ul className="text-sm text-gray-700 space-y-1 pl-6 list-disc">
                            {p.items.map((item: string, i: number) => (<li key={i}>{item}</li>))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* ОСЛОЖНЕНИЯ */}
              {selectedTab === 'complications' && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Осложнения при ОКС</h2>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {escGuideline.complications.cards.map((c: any, idx: number) => (
                      <div key={idx} className="rounded-xl p-6 border"
                        style={{ backgroundColor: 'rgba(1,93,82,0.03)', borderColor: 'rgba(1,93,82,0.15)' }}>
                        <h3 className="text-xl font-semibold text-gray-900">{c.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{c.context}</p>
                        <div className="space-y-3">
                          {c.actions.map((a: DrugRec, i: number) => (
                            <div key={i} className="bg-white border border-gray-100 rounded-lg p-3">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p className="font-medium text-gray-900">{a.drug}</p>
                                  {a.dose && <p className="text-sm text-gray-700"><strong>Доза:</strong> {a.dose}</p>}
                                </div>
                                <RecommendationBadge rec={{ class: a.class, level: a.level, evidenceText: a.evidenceText }} />
                              </div>
                            </div>
                          ))}
                        </div>
                        {c.notes?.length ? (
                          <ul className="mt-3 text-xs text-gray-600 space-y-1">
                            {c.notes.map((n: string, j: number) => (<li key={j}>• {n}</li>))}
                          </ul>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  {/* Сопутствующие состояния (только те, что меняют терапию) */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Сопутствующие патологии, влияющие на выбор терапии</h3>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {escGuideline.comorbidities.items.map((cm: any, idx: number) => (
                        <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{cm.title}</h4>
                            <RecommendationBadge rec={{ class: cm.class, level: cm.level }} />
                          </div>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {cm.points.map((p: string, i: number) => (<li key={i}>• {p}</li>))}
                          </ul>
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
                      {(escGuideline.secondaryPrevention.medications as DrugRec[]).map((med, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-4 border border-blue-100">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-2">
                            <h4 className="font-semibold text-gray-900">{med.drug}</h4>
                            <RecommendationBadge rec={{ class: med.class, level: med.level, evidenceText: med.evidenceText }} />
                          </div>
                          {med.duration && (<p className="text-sm text-gray-700 mb-1">Длительность: <span className="font-medium">{med.duration}</span></p>)}
                          {med.target && (<p className="text-sm text-gray-700 mb-1">Цель: <span className="font-medium">{med.target}</span></p>)}
                          {med.monitoring && (<p className="text-sm text-gray-700 mb-1">Мониторинг: <span className="font-medium">{med.monitoring}</span></p>)}
                          {med.deescalation && (<ul className="text-sm text-gray-700 space-y-1 mt-2">{med.deescalation.map((it, i) => (<li key={i}>• {it}</li>))}</ul>)}
                          {med.escalation && (<ul className="text-sm text-gray-700 space-y-1 mt-2">{med.escalation.map((it, i) => (<li key={i}>• {it}</li>))}</ul>)}
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Образ жизни</h3>
                    <div className="space-y-4">
                      {escGuideline.secondaryPrevention.lifestyle.map((item: any, idx: number) => (
                        <div key={idx} className="bg-white rounded-lg p-4 border border-green-100">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-2">
                            <h4 className="font-semibold text-gray-900">{item.area}</h4>
                            <RecommendationBadge rec={{ class: item.class, level: item.level, evidenceText: item.evidenceText }} />
                          </div>
                          <p className="text-sm text-gray-700 mb-1">Рекомендация: <span className="font-medium">{item.recommendation}</span></p>
                          {item.components && (<ul className="text-sm text-gray-700 space-y-1 mt-2">{item.components.map((c: string, i: number) => (<li key={i}>• {c}</li>))}</ul>)}
                          {item.interventions && (<ul className="text-sm text-gray-700 space-y-1 mt-2">{item.interventions.map((c: string, i: number) => (<li key={i}>• {c}</li>))}</ul>)}
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
                      {escGuideline.comparison.keyDifferences.map((diff: any, idx: number) => (
                        <div key={idx} className="bg-white rounded-lg p-4 border border-green-100 shadow-sm">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                            <h4 className="font-semibold text-gray-900">{diff.aspect}</h4>
                            <RecommendationBadge rec={{ class: diff.class, level: diff.level, evidenceText: diff.evidenceText }} />
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
                      {escGuideline.comparison.practicalImplications.map((item: string, idx: number) => (
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

            {/* Кнопка сохранения */}
            <section className="mt-4 mb-8 text-center">
              <button
                onClick={handleSaveSection}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#015d52] bg-white text-sm font-medium text-[#015d52] hover:ring-1 hover:ring-[#015d52] hover:shadow-[0_0_10px_#015D52] transition"
              >
                <FolderPlus size={16} />
                <span>Сохранить текущий раздел в «Мои гайды»</span>
              </button>
            </section>

            {/* Footer */}
            <section className="border-t border-gray-200 mt-12 pt-8 text-center">
              <p className="text-sm text-gray-600 mb-6 max-w-4xl mx-auto">
                Данное руководство представляет собой обзор и интерпретацию клинических рекомендаций для медицинских специалистов.
                Информация носит исключительно образовательный характер и не заменяет профессиональное медицинское заключение.
                При принятии решений следуйте официальным руководствам и локальным протоколам вашего учреждения.
              </p>

              {/* Визуальный зазор перед e-mail */}
              <div className="h-[150px]" aria-hidden="true"></div>

              <p className="text-lg font-medium text-gray-900">support@medradix.info</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

