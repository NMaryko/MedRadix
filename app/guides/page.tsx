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

// ===== Универсальный безопасный рендер текста с < и > =====
const Safe = ({ text }: { text: string }) => (
  <>{text.replaceAll('<', '\u003C').replaceAll('>', '\u003E')}</>
);

// ===== Типы =====
type EvidenceLevel = 'A' | 'B' | 'C';
type RecommendationClass = 'I' | 'IIa' | 'IIb' | 'III';

interface Recommendation {
  class?: RecommendationClass;
  level?: EvidenceLevel;
  text?: string;
  evidenceText?: string;
}

// ===== Данные выбора =====
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

// ===== Страница =====
export default function ACSPage() {
  const [selectedTab, setSelectedTab] = useState<'diagnosis' | 'treatment' | 'complications' | 'prevention' | 'comparison'>('diagnosis');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Кардиология');
  const [selectedNosology, setSelectedNosology] = useState('Острый коронарный синдром (ОКС)');
  const [isIntroOpen, setIsIntroOpen] = useState(true); // Аккордеон «Краткая ориентация (ОКС)»

  // Группировка нозологий
  const groupedCardiologyNosologies = CARDIOLOGY_NOSOLOGIES.reduce<Record<string, Nosology[]>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  // ====== ДАННЫЕ ГАЙДА (весь контент сохранён) + МИНОКА (добавлено) ======
  const escGuideline = {
    title: 'Острый коронарный синдром',
    version: 'ESC 2023-2024',
    sources: {
      nsteacs: 'https://academic.oup.com/eurheartj/article/44/38/3720/7235365',
      stemi: 'https://academic.oup.com/eurheartj/advance-article/doi/10.\u200B1093/eurheartj/ehae170/7649113',
      us: '#',
      full: 'https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines',
    },

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
            examples: ['Передний STEMI: V1-V4', 'Нижний STEMI: II, III, aVF', 'Боковой STEMI: I, aVL, V5-V6', 'Задний STEMI: V7-V9 (дополнительные отведения)'],
            class: 'I' as RecommendationClass,
            level: 'B' as EvidenceLevel,
            evidenceText: 'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
          },
          {
            criteria: 'Новая блокада ЛНПГ',
            details: ['Ширина QRS ≥120 мс', 'Типичная морфология БЛНПГ', 'Согласованность с клинической картиной'],
            class: 'I' as RecommendationClass,
            level: 'B' as EvidenceLevel,
            evidenceText: 'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
          },
        ],
        nstemi: [
          {
            criteria: 'ST-депрессия',
            details: ['≥0.5 мм в ≥2 смежных отведениях', 'Горизонтальная или косонисходящая'],
            class: 'I' as RecommendationClass,
            level: 'B' as EvidenceLevel,
            evidenceText: 'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
          },
          {
            criteria: 'Инверсия зубца T',
            details: ['≥1 мм в отведениях с доминирующим R', 'Глубокая симметричная инверсия'],
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
          parameters: ['Возраст', 'ЧСС', 'Систолическое АД', 'Уровень креатинина', 'Признаки СН', 'ЭКГ изменения', 'Повышение кардиальных ферментов'],
          scores: ['Низкий риск: <109 баллов', 'Средний риск: 109-140 баллов', 'Высокий риск: >140 баллов'],
          mortality: ['Госпитальная: 0.6% (низкий риск) до 21% (высокий риск)', '6-месячная: 3% (низкий риск) до 26% (высокий риск)'],
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
        },
        hematics: {
          parameters: ['Возраст', 'Уровень тропонина', 'ЭКГ изменения', 'Факторы риска', 'Повторяемость боли'],
          scores: ['Очень низкий риск: 0-2 балла', 'Низкий риск: 3-5 баллов', 'Высокий риск: ≥6 баллов'],
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
        },
      },

      differentialDiagnosis: [
        { condition: 'Перикардит', features: ['Боль зависит от положения тела', 'Шум трения перикарда', 'Диффузная ST-элевация', 'Отсутствие реципрокных изменений'] },
        { condition: 'ТЭЛА', features: ['Внезапная одышка', 'Гипоксия', 'Правосторонняя перегрузка на ЭКГ', 'Повышение D-димера'] },
        { condition: 'Расслоение аорты', features: ['Мигрирующая боль', 'Асимметрия АД', 'Расширение средостения на рентгене', 'Неврологическая симптоматика'] },
      ],

      // ====== МИНОКА (добавлено, без сокращения имеющегося) ======
      minoca: {
        title: 'МИНОКА (инфаркт миокарда при необструктивных коронарных артериях)',
        points: [
          'Определение: критерии ИМ при отсутствии обструктивных поражений эпикардиальных КА (обычно <50% стеноза) по данным коронарографии/КТ-КАГ.',
          'Исключить мимики: миокардит (CMR), такоцубо, ТЭЛА, спазм КА, микроциркуляторная дисфункция, тромб/эмбол.',
          'Обязателен CMR (предпочтительно до 7 дней) для дифференциации (ишемический паттерн LGE vs миокардит).',
        ],
        therapy: [
          { drug: 'Аспирин', dose: '75–100 мг/сут', note: 'При подтверждённом атеротромбозе/плаковом событии', class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel, evidenceText: 'Продолжительность как при ИМ с обструкцией — персонализировано' },
          { drug: 'P2Y12 (тикгр/клопидогрел)', dose: 'по показаниям', note: 'Если есть доказательства тромботического механизма/эрозии бляшки', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
          { drug: 'Статин высокой интенсивности', dose: 'аторвастатин 40–80 мг/сут или розувастатин 20–40 мг/сут', note: 'При наличии атеросклероза/высокого ЛПНП', class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel },
          { drug: 'ИАПФ/БРА', dose: 'рамиприл 2.5–10 мг/сут, периндоприл 2–8 мг/сут или валсартан 80–320 мг/сут', note: 'При дисфункции ЛЖ/СН/АГ/СД', class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel },
          { drug: 'Бета-блокатор', dose: 'метопролол 25–50 мг 2 р/сут или бисопролол 2.5–10 мг/сут', note: 'При ишемии/тахиаритмии/СН', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
          { drug: 'Антиспастическая терапия', dose: 'нитраты, БКК (дилтиазем/амлодипин)', note: 'Если подтверждён коронароспазм', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
        ],
      },
    },

    // ===== ЛЕЧЕНИЕ (исходный контент сохранён) =====
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
          dose: 'Морфин 2-4 мг в/в болюс + титрация; при непереносимости — фентанил 25-50 мкг в/в',
          options: ['Морфин 2-4 мг в/в + метоклопрамид 10 мг', 'При непереносимости: фентанил 25-50 мкг'],
          class: 'I' as RecommendationClass,
          level: 'C' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень C - Консенсус экспертов или малые исследования',
        },
        {
          measure: 'Нитроглицерин',
          indication: 'Персистирующая боль, СН, гипертензия',
          contraindications: ['САД <90 мм рт.ст.', 'Прием ингибиторов ФДЭ-5', 'Выраженная брадикардия'],
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
              advantages: ['Быстрое начало действия', 'Обратимое связывание'],
              disadvantages: ['Одышка (10-15%)', 'Кровотечения', 'Взаимодействие с сильными ингибиторами CYP3A4'],
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
              disadvantages: ['Противопоказан при инсульте/ТИА', 'Больше кровотечений'],
              class: 'I' as RecommendationClass,
              level: 'B' as EvidenceLevel,
              evidenceText: 'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
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
              evidenceText: 'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
            },
          ],
        },
      ],

      anticoagulation: [
        {
          drug: 'Фондапаринукс',
          dose: '2.5 мг п/к 1 раз/сут',
          indication: 'Предпочтительный антикоагулянт при NSTE-ACS без показаний к срочному ЧКВ',
          notes: 'Не применять при КК <30 мл/мин; при ЧКВ — дополнительно болюс НФГ',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I - Предпочтительный выбор при NSTE-ACS; Уровень A - Множественные РКИ или мета-анализы',
        },
        {
          drug: 'Эноксапарин (НМГ)',
          dose: '1 мг/кг п/к каждые 12 ч (при КК <30 мл/мин — 1 мг/кг 1 раз/сут)',
          indication: 'Альтернатива фондапаринуксу при невозможности его применения',
          notes: 'Требует коррекции дозы при ХБП; учитывать суммарную антикоагуляцию при ЧКВ',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
        },
        {
          drug: 'Нефракционированный гепарин',
          dose: '60–70 Ед/кг в/в болюс (макс 5000 Ед), затем 12–15 Ед/кг/ч с контролем АЧТВ',
          indication: 'Пациенты со STEMI/NSTE-ACS при первичном ЧКВ или при ХБП тяжёлой степени',
          notes: 'Контролировать АЧТВ; помнить о риске ГИТ',
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
        },
      ],

      reperfusion: {
        stemi: [
          {
            method: 'Первичное ЧКВ',
            timing: 'FMC-to-device ≤120 мин, door-to-balloon ≤90 мин',
            indications: ['Всем пациентам с STEMI при доступности в сроки'],
            results: ['Снижение смертности на 25-50%', 'Уменьшение размеров ИМ', 'Снижение частоты СН'],
            class: 'I' as RecommendationClass,
            level: 'A' as EvidenceLevel,
            evidenceText: 'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
          },
          {
            method: 'Фибринолиз',
            timing: 'FMC-to-needle ≤10 мин при задержке ЧКВ >120 мин',
            indications: ['Раннее поступление (<2 ч)', 'Молодой возраст', 'Передне-септальная локализация'],
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
            indications: ['Диабет', 'Почечная недостаточность', 'Снижение ФВ ЛЖ', 'Ранняя постинфарктная стенокардия'],
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
          contraindications: ['Острая декомпенсация СН', 'Выраженная брадикардия', 'АВ-блокада II–III ст.', 'Бронхоспазм'],
          options: ['Метопролол 25-50 мг 2 раза/сут', 'Бисопролол 2.5-10 мг/сут'],
          timing: 'В первые 24 часа при стабильном состоянии',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
        },
        {
          drug: 'Статины высокой интенсивности',
          indication: 'Все пациенты с ОКС',
          options: ['Аторвастатин 80 мг/сут', 'Розувастатин 20-40 мг/sut'],
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
        {
          drug: 'Антагонисты минералокортикоидных рецепторов',
          indication: 'ФВ ЛЖ ≤40% + СН или сахарный диабет после ОКС',
          options: ['Эплеренон 25–50 мг/сут', 'Спиронолактон 25–50 мг/сут'],
          timing: 'В течение первых 3–7 суток при стабильном креатинине и калии',
          contraindications: ['Калий >5.0 ммоль/л', 'КК <30 мл/мин'],
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень B - Одно РКИ или крупные нерандомизированные исследования',
        },
        {
          drug: 'SGLT2 ингибиторы',
          indication: 'СН с ФВ сниженной или умеренно сниженной после ОКС (с/без СД)',
          options: ['Дапаглифлозин 10 мг/сут', 'Эмпаглифлозин 10 мг/сут'],
          timing: 'После стабилизации гемодинамики и функции почек',
          contraindications: ['КК <20–25 мл/мин (в зависимости от препарата)'],
          class: 'IIa' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс IIa - Следует рассмотреть; Уровень A - Множественные РКИ или мета-анализы',
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

    // ===== Вторичная профилактика =====
    secondaryPrevention: {
      duration: 'Пожизненно после ОКС',
      medications: [
        {
          drug: 'Двойная антитромбоцитарная терапия',
          duration: '12 месяцев после ЧКВ',
          deescalation: ['При высоком риске кровотечений: 3-6 месяцев', 'Рассмотреть переход на клопидогрел после 1-3 месяцев', 'Оценка по шкале PRECISE-DAPT и ARC-HBR'],
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I - Рекомендуется/Показано; Уровень A - Множественные РКИ или мета-анализы',
        },
        {
          drug: 'Статины',
          target: 'ЛПНП снижение ≥50% от исходного и <1.4 ммоль/л',
          monitoring: 'Через 4-12 недель, затем ежегодно',
          escalation: ['При недостижении цели: + эзетимиб 10 мг/сут', 'При персистирующем высоком ЛПНП: + ингибитор PCSK9'],
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
          components: ['Овощи, фрукты, цельнозерновые', 'Рыба 2 раза/неделю', 'Оливковое масло', 'Ограничение соли <5 г/сут'],
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

    // ===== Сравнение =====
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
  } as const;

  // ===== UI-кусочки =====
  const RecommendationBadge = ({ rec }: { rec: Recommendation }) => {
    const cls: RecommendationClass = rec.class ?? 'I';
    const lvl: EvidenceLevel = rec.level ?? 'A';
    return (
      <div className="flex flex-col gap-1 text-sm">
        <div className="flex items-center gap-2 flex-wrap">
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
            <Safe text={`Класс ${cls}`} />
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
            <Safe text={`Уровень ${lvl}`} />
          </span>
        </div>
        {rec.evidenceText && (
          <p className="text-xs text-gray-600 max-w-xs">
            <Safe text={rec.evidenceText} />
          </p>
        )}
      </div>
    );
  };

  const TimingBadge = ({ time }: { time: string }) => (
    <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
      <Clock size={14} />
      <Safe text={time} />
    </div>
  );

  const handleSaveSection = () => {};

  const sections = [
    { id: 'diagnosis' as const, label: 'Диагностика' },
    { id: 'treatment' as const, label: 'Лечение' },
    { id: 'complications' as const, label: 'Осложнения' },
    { id: 'prevention' as const, label: 'Профилактика' },
    { id: 'comparison' as const, label: 'Сравнение' },
  ];

  // ===== РЕНДЕР =====
  return (
    <main className="min-h-screen bg-[#fcfcee] py-8">
      <div className="max-w-[1800px] mx-auto px-4">
        {/* Заголовок и фильтры */}
        <section className="border-b border-gray-200 mb-8">
          <div className="max-w-[1800px] mx-auto px-4 pt-4 pb-4">
            {/* Desktop: [Нозология | Заголовок | Специальность]
                Mobile: [Специальность] -> [Нозология] -> [Заголовок] */}
            <div className="flex flex-col lg:grid lg:grid-cols-3 lg:items-center gap-4">
              {/* Mobile-first: Специальность (идёт первой), на desktop — справа */}
              <div className="order-1 lg:order-3 lg:justify-self-end w-full lg:w-auto">
                <div className="flex flex-col items-start lg:items-end gap-1 w-full lg:w-auto">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f] hidden lg:block">Специальность</span>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="rounded-full border border-[#d3cec4] bg-white px-4 h-12 min-h-[48px] text-base text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52] w-full lg:w-[230px] text-center lg:h-10 lg:min-h-0"
                  >
                    {SPECIALTIES.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Заголовок — по центру, на мобиле идёт третьим */}
              <div className="order-3 lg:order-2 text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  <Safe text={escGuideline.title} />
                </h1>
              </div>

              {/* Нозология: на desktop — слева */}
              <div className="order-2 lg:order-1 lg:justify-self-start w-full lg:w-auto">
                <div className="flex flex-col gap-1 w-full lg:w-auto">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f] hidden lg:block">Нозология</span>
                  <select
                    value={selectedNosology}
                    onChange={(e) => setSelectedNosology(e.target.value)}
                    className="rounded-full border border-[#d3cec4] bg-white px-4 h-12 min-h-[48px] text-base text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52] w-full lg:w-[320px] lg:h-10 lg:min-h-0"
                  >
                    {Object.entries(groupedCardiologyNosologies).map(([groupName, items]) => (
                      <optgroup key={groupName} label={groupName}>
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
            </div>

            {/* Ссылки и предупреждение */}
            <div className="text-center mt-6 space-y-3">
              <div className="flex justify-center gap-4 flex-wrap">
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

        {/* Сетка */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Левое меню (десктоп) */}
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
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
                      className={`w-full rounded-full border px-3 py-2 text-sm text-left font-medium transition ${
                        active
                          ? 'bg-[#013c37] text-white border-[#013c37]'
                          : 'bg-white text-[#1f2933] border-[#d3cec4]'
                      } hover:ring-1 hover:ring-[#015d52] hover:shadow-[0_0_10px_#015D52]`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* КАЛЬКУЛЯТОРЫ — ПОД МЕНЮ СЛЕВА (ТОЛЬКО ДЕСКТОП) */}
              <div className="mt-6">
                <div className="text-sm font-semibold tracking-[0.16em] text-[#9c978f] uppercase mb-3">
                  Калькуляторы риска
                </div>
                <div className="space-y-2">
                  <a href="/calculators/grace" className="block border border-blue-200 rounded-xl px-3 py-2 text-sm hover:bg-blue-50 transition">
                    <div className="font-semibold text-gray-900"><Safe text="GRACE / TIMI-like EU" /></div>
                    <div className="text-gray-600 text-xs leading-snug"><Safe text="Европейская и американская модификация оценки риска госпитальной и 6-месячной смертности в одном калькуляторе." /></div>
                  </a>
                  <a href="/calculators/heart" className="block border border-green-200 rounded-xl px-3 py-2 text-sm hover:bg-green-50 transition">
                    <div className="font-semibold text-gray-900"><Safe text="HEART / ED risk" /></div>
                    <div className="text-gray-600 text-xs leading-snug"><Safe text="Быстрая оценка краткосрочного риска MACE в приёмном отделении, включающая европейский HEART и международный EDACS." /></div>
                  </a>
                  <a href="/calculators/timi-acs" className="block border border-purple-200 rounded-xl px-3 py-2 text-sm hover:bg-purple-50 transition">
                    <div className="font-semibold text-gray-900"><Safe text="TIMI для NSTE-ACS / US" /></div>
                    <div className="text-gray-600 text-xs leading-snug"><Safe text="Стратификация риска осложнений и отдалённого прогноза у пациентов с NSTE-ACS (ESC + ACC/AHA подходы)." /></div>
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Контент */}
          <div className="flex-1 min-w-0">
            {/* Навигация чипами – мобильные/планшеты */}
            <div className="flex lg:hidden border-b border-gray-200 mb-4 overflow-x-auto">
              {sections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setSelectedTab(id)}
                  className={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                    selectedTab === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Калькуляторы — для МОБИЛЬНОЙ версии, под чипами (десктоп уже слева) */}
            <section className="mb-6 lg:hidden">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Калькуляторы риска</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="/calculators/grace" className="border border-blue-200 rounded-xl px-4 py-3 text-sm flex flex-col justify-between hover:bg-blue-50 transition">
                  <span className="font-semibold text-gray-900 mb-1"><Safe text="GRACE / TIMI-like EU" /></span>
                  <span className="text-gray-600"><Safe text="Европейская и американская модификация оценки риска госпитальной и 6-месячной смертности в одном калькуляторе." /></span>
                </a>
                <a href="/calculators/heart" className="border border-green-200 rounded-xl px-4 py-3 text-sm flex flex-col justify-between hover:bg-green-50 transition">
                  <span className="font-semibold text-gray-900 mb-1"><Safe text="HEART / ED risk" /></span>
                  <span className="text-gray-600"><Safe text="Быстрая оценка краткосрочного риска MACE в приёмном отделении, включающая европейский HEART и международный EDACS." /></span>
                </a>
                <a href="/calculators/timi-acs" className="border border-purple-200 rounded-xl px-4 py-3 text-sm flex flex-col justify-between hover:bg-purple-50 transition">
                  <span className="font-semibold text-gray-900 mb-1"><Safe text="TIMI для NSTE-ACS / US" /></span>
                  <span className="text-gray-600"><Safe text="Стратификация риска осложнений и отдалённого прогноза у пациентов с NSTE-ACS (ESC + ACC/AHA подходы)." /></span>
                </a>
              </div>
            </section>

            {/* Карточка гайда */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
              {/* Диагностика */}
              {selectedTab === 'diagnosis' && (
                <div className="space-y-12">
                  {/* Краткая ориентация (ОКС) — аккордеон */}
                  <section>
                    <button
                      onClick={() => setIsIntroOpen((v) => !v)}
                      className="w-full flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3"
                    >
                      <span className="text-lg font-semibold text-emerald-900">Краткая ориентация (ОКС)</span>
                      <ChevronDown className={`transition ${isIntroOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isIntroOpen && (
                      <div className="border border-emerald-200 border-t-0 rounded-b-xl p-4 space-y-4">
                        <p className="text-gray-700">
                          <Safe text="ОКС — острое клиническое проявление ишемической болезни сердца, вызванное несоответствием между коронарным кровотоком и потребностью миокарда в кислороде. Основные механизмы: разрыв/эрозия атеросклеротической бляшки с тромбозом, динамический спазм, микроциркуляторная дисфункция." />
                        </p>
                        <p className="text-gray-700">
                          <Safe text="Ключевая классификация: STEMI (персистирующая подъём ST/новая БЛНПГ) и NSTE-ACS (NSTEMI/нестабильная стенокардия). Стратегия определяется ЭКГ, тропонином и риском по шкалам (GRACE/HEART)." />
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
                                <td className="p-2">
                                  <Safe text="Персистирующая ST-элевация/новая БЛНПГ + клиника ишемии" />
                                </td>
                                <td className="p-2">
                                  <Safe text="Немедленная реперфузия (первичное ЧКВ либо фибринолиз)" />
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-2 font-medium">NSTEMI</td>
                                <td className="p-2">
                                  <Safe text="Изменения ST/T ± ↑тропонина" />
                                </td>
                                <td className="p-2">
                                  <Safe text="Ранняя/отсроченная инвазивная стратегия по риску (GRACE)" />
                                </td>
                              </tr>
                              <tr>
                                <td className="p-2 font-medium">Нестабильная стенокардия</td>
                                <td className="p-2">
                                  <Safe text="Клиника ишемии без ↑тропонина" />
                                </td>
                                <td className="p-2">
                                  <Safe text="Риск-стратификация, антиангинальная/антитромботическая терапия" />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </section>

                  {/* Первичная оценка и диагностика */}
                  <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Первичная оценка и диагностика</h2>
                    <div className="space-y-6">
                      {escGuideline.diagnosis.initialAssessment.map((step, index) => (
                        <div key={index} className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                          <div className="flex flex-col gap-3 mb-4">
                            <h3 className="text-xl font-semibold text-gray-900">
                              <Safe text={step.step} />
                            </h3>
                            <div className="flex flex-col md:flex-row md:items-center gap-3">
                              <TimingBadge time={step.timing} />
                              <RecommendationBadge
                                rec={{ class: step.class, level: step.level, evidenceText: step.evidenceText }}
                              />
                            </div>
                          </div>
                          <ul className="space-y-2">
                            {step.actions.map((action, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">
                                  <Safe text={action} />
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
                      <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                        <h4 className="text-lg font-semibold text-red-800 mb-3">STEMI критерии</h4>
                        {escGuideline.diagnosis.ecgCriteria.stemi.map((c, idx) => (
                          <div key={idx} className="mb-6 last:mb-0">
                            <h5 className="font-semibold text-gray-900 mb-2">
                              <Safe text={c.criteria} />
                            </h5>
                            <RecommendationBadge rec={{ class: c.class, level: c.level, evidenceText: c.evidenceText }} />
                            <ul className="text-sm text-gray-700 space-y-1 mt-2">
                              {c.details.map((d, i) => (
                                <li key={i}>
                                  <Safe text={`• ${d}`} />
                                </li>
                              ))}
                            </ul>
                            {c.examples && (
  <div className="mt-2">
    <p className="font-medium text-sm">Примеры:</p>
    <ul className="text-sm text-gray-600 space-y-1">
      {c.examples.map((ex: string, i: number) => (
        <li key={i}>• <Safe text={ex} /></li>
      ))}
    </ul>
  </div>
)}
                          </div>
                        ))}
                      </div>

                      {/* NSTEMI */}
                      <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                        <h4 className="text-lg font-semibold text-orange-800 mb-3">NSTEMI критерии</h4>
                        {escGuideline.diagnosis.ecgCriteria.nstemi.map((c, idx) => (
                          <div key={idx} className="mb-6 last:mb-0">
                            <h5 className="font-semibold text-gray-900 mb-2">
                              <Safe text={c.criteria} />
                            </h5>
                            <RecommendationBadge rec={{ class: c.class, level: c.level, evidenceText: c.evidenceText }} />
                            <ul className="text-sm text-gray-700 space-y-1 mt-2">
                              {c.details.map((d, i) => (
                                <li key={i}>
                                  <Safe text={`• ${d}`} />
                                </li>
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
                      <div className="flex flex-col gap-3 mb-4">
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
                            <Safe text={`Протокол: ${escGuideline.diagnosis.biomarkers.highSensitivityTroponin.protocol}`} />
                          </p>
                          <p className="text-sm text-gray-700 mb-4">
                            <Safe text={`Отсечка: ${escGuideline.diagnosis.biomarkers.highSensitivityTroponin.cutoff}`} />
                          </p>
                          <p className="text-sm text-gray-700">
                            <Safe text={`Динамика: ${escGuideline.diagnosis.biomarkers.highSensitivityTroponin.dynamics}`} />
                          </p>
                        </div>
                        <div>
                          <p className="font-medium mb-2">Интерпретация:</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {escGuideline.diagnosis.biomarkers.highSensitivityTroponin.interpretation.map((item, idx) => (
                              <li key={idx}>
                                <Safe text={`• ${item}`} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Дополнительные маркеры */}
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Дополнительные биомаркеры</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {escGuideline.diagnosis.biomarkers.additionalMarkers.map((marker, idx) => (
                          <li key={idx}>
                            <Safe text={`• ${marker}`} />
                          </li>
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
                        <div className="flex flex-col gap-3 mb-4">
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
                            <li key={idx}>
                              <Safe text={`• ${param}`} />
                            </li>
                          ))}
                        </ul>
                        <p className="font-medium mb-2">Уровни риска:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {escGuideline.diagnosis.riskStratification.grace.scores.map((score, idx) => (
                            <li key={idx}>
                              <Safe text={`• ${score}`} />
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* HEART */}
                      <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                        <div className="flex flex-col gap-3 mb-4">
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
                            <li key={idx}>
                              <Safe text={`• ${param}`} />
                            </li>
                          ))}
                        </ul>
                        <p className="font-medium mb-2">Уровни риска:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {escGuideline.diagnosis.riskStratification.hematics.scores.map((score, idx) => (
                            <li key={idx}>
                              <Safe text={`• ${score}`} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* МИНОКА */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">МИНОКА: диагностика и тактика</h3>
                    <div className="bg-sky-50 rounded-xl p-6 border border-sky-200">
                      <ul className="text-sm text-gray-700 space-y-1 mb-3">
                        {escGuideline.diagnosis.minoca.points.map((p, i) => (
                          <li key={i}>
                            <Safe text={`• ${p}`} />
                          </li>
                        ))}
                      </ul>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Терапия (по фенотипу):</h4>
                      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {escGuideline.diagnosis.minoca.therapy.map((t, i) => (
                          <div key={i} className="bg-white rounded-lg p-4 border border-sky-100">
                            <div className="mb-2">
                              <h5 className="font-semibold text-gray-900">
                                <Safe text={t.drug} />
                              </h5>
                              <p className="text-sm text-gray-700">
                                <Safe text={`Доза: ${t.dose}`} />
                              </p>
                              {t.note && (
                                <p className="text-xs text-gray-600 mt-1">
                                  <Safe text={t.note} />
                                </p>
                              )}
                            </div>
                            <RecommendationBadge rec={{ class: t.class, level: t.level, evidenceText: t.evidenceText }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {/* Лечение */}
              {selectedTab === 'treatment' && (
                <div className="space-y-12">
                  {/* Общие мероприятия */}
                  <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Общие мероприятия</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {escGuideline.treatment.generalMeasures.map((measure, idx) => (
                        <div key={idx} className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            <Safe text={measure.measure} />
                          </h3>
                          <RecommendationBadge
                            rec={{ class: measure.class, level: measure.level, evidenceText: measure.evidenceText }}
                          />
                          <p className="text-gray-700 mt-3">
                            <Safe text={`Показания: ${measure.indication}`} />
                          </p>
                          <p className="text-gray-700">
                            <Safe text={`Дозировка: ${measure.dose}`} />
                          </p>
                          {measure.contraindications && (
                            <div className="mt-3">
                              <p className="font-medium text-sm mb-1">Противопоказания:</p>
                              <ul className="text-sm text-gray-700 space-y-1">
                                {measure.contraindications.map((contra: string, i: number) => (
                                  <li key={i}>
                                    <Safe text={`• ${contra}`} />
                                  </li>
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
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Аспирин</h3>
                        <RecommendationBadge
                          rec={{
                            class: escGuideline.treatment.antiplateletTherapy[0].class!,
                            level: escGuideline.treatment.antiplateletTherapy[0].level!,
                            evidenceText: escGuideline.treatment.antiplateletTherapy[0].evidenceText,
                          }}
                        />
                        <p className="text-gray-600 mt-3">
                          <Safe text={`Нагрузка: ${escGuideline.treatment.antiplateletTherapy[0].loading} • Поддержка: ${escGuideline.treatment.antiplateletTherapy[0].maintenance}`} />
                        </p>
                        <p className="text-gray-700 mt-1">
                          <Safe text={escGuideline.treatment.antiplateletTherapy[0].notes!} />
                        </p>
                      </div>

                      {/* P2Y12 ингибиторы */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">P2Y12 ингибиторы — выбор</h3>
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                          {(escGuideline.treatment.antiplateletTherapy[1]?.options ?? []).map((drug: any, idx: number) => (
                            <div key={idx} className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-sm">
                              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                <Safe text={drug.name} />
                              </h4>
                              <RecommendationBadge rec={{ class: drug.class, level: drug.level, evidenceText: drug.evidenceText }} />
                              <div className="space-y-2 mt-3">
                                <div>
                                  <span className="font-medium">Нагрузка:</span>
                                  <span className="text-gray-700 ml-2">
                                    <Safe text={drug.loading} />
                                  </span>
                                </div>
                                <div>
                                  <span className="font-medium">Поддержка:</span>
                                  <span className="text-gray-700 ml-2">
                                    <Safe text={drug.maintenance} />
                                  </span>
                                </div>
                                <div>
                                  <span className="font-medium">Длительность:</span>
                                  <span className="text-gray-700 ml-2">
                                    <Safe text={drug.duration} />
                                  </span>
                                </div>
                                {drug.advantages && (
                                  <div>
                                    <p className="font-medium text-sm mb-1">Преимущества:</p>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                      {drug.advantages.map((adv: string, i: number) => (
                                        <li key={i}>
                                          <Safe text={`• ${adv}`} />
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {drug.disadvantages && (
                                  <div>
                                    <p className="font-medium text-sm mb-1">Недостатки:</p>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                      {drug.disadvantages.map((dis: string, i: number) => (
                                        <li key={i}>
                                          <Safe text={`• ${dis}`} />
                                        </li>
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

                  {/* Антикоагулянтная терапия */}
                  <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Антикоагулянтная терапия</h2>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {escGuideline.treatment.anticoagulation.map((ac: any, idx: number) => (
                        <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            <Safe text={ac.drug} />
                          </h4>
                          <RecommendationBadge rec={{ class: ac.class, level: ac.level, evidenceText: ac.evidenceText }} />
                          <p className="text-sm text-gray-700 mt-3">
                            <strong>Показания:</strong> <Safe text={ac.indication} />
                          </p>
                          <p className="text-sm text-gray-700">
                            <strong>Дозировка:</strong> <Safe text={ac.dose} />
                          </p>
                          {ac.notes && (
                            <p className="text-sm text-gray-700">
                              <strong>Особенности:</strong> <Safe text={ac.notes} />
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Реперфузия */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">Стратегии реперфузии</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* STEMI */}
                      <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                        <h4 className="text-lg font-semibold text-red-800 mb-2">STEMI</h4>
                        {escGuideline.treatment.reperfusion.stemi.map((m: any, idx: number) => (
                          <div key={idx} className="mb-6 last:mb-0">
                            <RecommendationBadge rec={{ class: m.class, level: m.level, evidenceText: m.evidenceText }} />
                            <p className="text-sm text-gray-700 mt-2">
                              <strong>Метод:</strong> <Safe text={m.method} />
                            </p>
                            <p className="text-sm text-gray-700">
                              <strong>Тайминг:</strong> <Safe text={m.timing} />
                            </p>
                            {m.results && (
                              <p className="text-sm text-gray-700">
                                <strong>Результаты:</strong> <Safe text={m.results.join(', ')} />
                              </p>
                            )}
                            {m.contraindications && (
                              <div className="mt-2">
                                <p className="font-medium text-sm mb-1">Противопоказания:</p>
                                <ul className="text-sm text-gray-700 space-y-1">
                                  {m.contraindications.map((c: string, i: number) => (
                                    <li key={i}>
                                      <Safe text={`• ${c}`} />
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* NSTEMI */}
                      <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                        <h4 className="text-lg font-semibold text-orange-800 mb-2">NSTEMI</h4>
                        {escGuideline.treatment.reperfusion.nstemi.map((s: any, idx: number) => (
                          <div key={idx} className="mb-6 last:mb-0">
                            <RecommendationBadge rec={{ class: s.class, level: s.level, evidenceText: s.evidenceText }} />
                            <p className="text-sm text-gray-700 mt-2">
                              <strong>Стратегия:</strong> <Safe text={s.strategy} />
                            </p>
                            <ul className="text-sm text-gray-700 space-y-1">
                              {s.indications.map((ind: string, i: number) => (
                                <li key={i}>
                                  <Safe text={`• ${ind}`} />
                                </li>
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
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {escGuideline.treatment.adjunctiveTherapy.map((t: any, idx: number) => (
                        <div key={idx} className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            <Safe text={t.drug} />
                          </h4>
                          <RecommendationBadge rec={{ class: t.class, level: t.level, evidenceText: t.evidenceText }} />
                          <p className="text-gray-700 mt-3">
                            <strong>Показания:</strong> <Safe text={t.indication} />
                          </p>
                          {t.timing && (
                            <p className="text-gray-700">
                              <strong>Тайминг:</strong> <Safe text={t.timing} />
                            </p>
                          )}
                          {t.options && (
                            <div className="mt-2">
                              <p className="font-medium text-sm mb-1">Препараты:</p>
                              <ul className="text-sm text-gray-700 space-y-1">
                                {t.options.map((opt: string, i: number) => (
                                  <li key={i}>
                                    <Safe text={`• ${opt}`} />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {t.contraindications && (
                            <div className="mt-2">
                              <p className="font-medium text-sm mb-1">Противопоказания:</p>
                              <ul className="text-sm text-gray-700 space-y-1">
                                {t.contraindications.map((c: string, i: number) => (
                                  <li key={i}>
                                    <Safe text={`• ${c}`} />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Частые ошибки */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Частые ошибки и подводные камни</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Блок ориентирован на врачей, работающих в ОИТ, приёмных отделениях и инвазивных лабораториях. Может использоваться как чек-лист перед выпиской пациента.
                    </p>
                    <div className="space-y-4">
                      {escGuideline.treatment.commonPitfalls.map((p: any, idx: number) => (
                        <div key={idx} className="bg-red-50/70 rounded-xl p-4 border border-red-200">
                          <div className="flex items-start gap-2 mb-2">
                            <AlertTriangle className="text-red-500 mt-0.5" size={18} />
                            <h4 className="font-semibold text-gray-900">
                              <Safe text={p.title} />
                            </h4>
                          </div>
                          <ul className="text-sm text-gray-700 space-y-1 pl-6 list-disc">
                            {p.items.map((it: string, i: number) => (
                              <li key={i}>
                                <Safe text={it} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* Осложнения — РАСШИРЕННЫЙ БЛОК (вернул и дополнил) */}
              {selectedTab === 'complications' && (
                <div className="space-y-10">
                  <h2 className="text-3xl font-bold text-gray-900">Осложнения ОКС: диагностика и ведение</h2>

                  {/* No-Reflow / Slow-Flow */}
                  <section className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No-Reflow / Slow-Flow</h3>
                    <RecommendationBadge rec={{ class: 'IIa', level: 'B', evidenceText: 'Инвазивные и фармакологические методы улучшают перфузию миокарда' }} />
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
                      <p className="text-sm text-gray-700 mb-2 font-medium">Диагностика:</p>
                      <ul className="text-sm text-gray-700 space-y-1 mb-3">
                        <li>
                          <Safe text="• TIMI < 3, низкий миокардиальный blush grade, персистирующая ишемия после стентирования" />
                        </li>
                      </ul>
                      <p className="text-sm text-gray-700 mb-2 font-medium">Алгоритм ведения:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>
                          <Safe text="• Внутрикоронарный аденозин 60–120 мкг болюсно, повторно при необходимости (IIa/B)" />
                        </li>
                        <li>
                          <Safe text="• Внутрикоронарный нитропруссид 50–200 мкг (IIa/B)" />
                        </li>
                        <li>
                          <Safe text="• ГП IIb/IIIa: эптифибатид болюс 180 мкг/кг ×2 с интервалом 10 мин + инфузия 2 мкг/кг/мин 18–24 ч (при высоком тромбозе) (IIa/B)" />
                        </li>
                        <li>
                          <Safe text="• Техники: аспирация тромба по показаниям, осторожная постдилатация, оптимизация антикоагуляции (ACT 250–300 с)" />
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* Кардиогенный шок */}
                  <section className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Кардиогенный шок</h3>
                    <RecommendationBadge rec={{ class: 'I', level: 'A', evidenceText: 'Немедленная ревоскулиаризация улучшает выживаемость' }} />
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4">
                      <p className="text-sm text-gray-700 mb-2 font-medium">Диагностика:</p>
                      <ul className="text-sm text-gray-700 space-y-1 mb-3">
                        <li>
                          <Safe text="• Систолическое АД < 90 мм рт.ст. >30 мин или необходимость вазопрессоров" />
                        </li>
                        <li>
                          <Safe text="• Признаки гипоперфузии (олигурия, лактоацидоз, холодные кожные покровы)" />
                        </li>
                      </ul>
                      <p className="text-sm text-gray-700 mb-2 font-medium">Алгоритм:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>
                          <Safe text="• Немедленное ЧКВ ‘culprit-only’, рассмотреть механическую поддержку кровообращения" />
                        </li>
                        <li>
                          <Safe text="• Вазопрессор: норэпинефрин титровать до целевого MAP" />
                        </li>
                        <li>
                          <Safe text="• Инотроп: добутамин при сохранённой гипоперфузии (IIa/B)" />
                        </li>
                        <li>
                          <Safe text="• Коррекция ацидоза/гипоксии, осторожная инфузионная терапия под эхо-наведением" />
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* Острая левожелудочковая недостаточность/отек лёгких */}
                  <section className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Острая ЛЖ-недостаточность / отёк лёгких</h3>
                    <RecommendationBadge rec={{ class: 'I', level: 'B', evidenceText: 'Немедленная разгрузка, кислород, вентиляционная поддержка по показаниям' }} />
                    <ul className="text-sm text-gray-700 space-y-1 mt-3">
                      <li><Safe text="• Кислород/НИВЛ при гипоксии, позиция полусидя" /></li>
                      <li><Safe text="• Петлевые диуретики (фуросемид/торасемид) с титрацией по эффекту" /></li>
                      <li><Safe text="• Нитраты при САД ≥100–110 мм рт.ст.; избегать при гипотонии" /></li>
                      <li><Safe text="• Ранняя оценка на ЧКВ (ишемическая причина)" /></li>
                    </ul>
                  </section>

                  {/* Механические осложнения ИМ (ПМЖП, разрыв сосочковой мышцы, разрыв свободной стенки) */}
                  <section className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Механические осложнения инфаркта</h3>
                    <RecommendationBadge rec={{ class: 'I', level: 'B', evidenceText: 'Немедленная диагностика (Эхо/КТ) и ургентная хирургическая стратегия' }} />
                    <div className="grid md:grid-cols-3 gap-4 mt-3">
                      <div className="bg-gray-50 rounded-xl p-4 border">
                        <h4 className="font-semibold mb-2">ПМЖП (разрыв межжелудочковой перегородки)</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li><Safe text="• Внезапное ухудшение, шум дефекта, кардиогенный шок" /></li>
                          <li><Safe text="• Эхо: поток через дефект, повышение RV нагрузок" /></li>
                          <li><Safe text="• Тактика: инотропы, ИАБП/мехподдержка, экстренная хирургия" /></li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 border">
                        <h4 className="font-semibold mb-2">Острая регургитация МК (разрыв сосочковой мышцы)</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li><Safe text="• Острая отёчная одышка, новый систолический шум" /></li>
                          <li><Safe text="• Эхо: тяжелая MR, ‘flail’ створка" /></li>
                          <li><Safe text="• Тактика: нитраты при нормо-/гипертензии, ИАБП, ургентная хирургия" /></li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 border">
                        <h4 className="font-semibold mb-2">Разрыв свободной стенки ЛЖ</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li><Safe text="• Тампонада, электромеханическая диссоциация, коллапс" /></li>
                          <li><Safe text="• Эхо: перикардиальный выпот с признаками тампонады" /></li>
                          <li><Safe text="• Тактика: перикардиоцентез по жизненным показаниям, экстренная хирургия" /></li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Аритмии после ИМ */}
                  <section className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Аритмии после ИМ</h3>
                    <RecommendationBadge rec={{ class: 'I', level: 'B', evidenceText: 'Мониторинг, коррекция электролитов, таргетная антиаритмическая/электротерапия' }} />
                    <div className="grid md:grid-cols-2 gap-4 mt-3">
                      <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                        <h4 className="font-semibold mb-2">ЖТ/ФЖ</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li><Safe text="• Немедленная дефибрилляция при ФЖ/нестабильной ЖТ" /></li>
                          <li><Safe text="• Коррекция калия/магния; лидокаин как опция (IIb)" /></li>
                          <li><Safe text="• Абляция при рецидивах/шторме (специализированный центр)" /></li>
                        </ul>
                      </div>
                      <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                        <h4 className="font-semibold mb-2">Брадиаритмии/АВ-блок</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li><Safe text="• Атропин при симптомной брадикардии; при неэффективности — временная стимуляция" /></li>
                          <li><Safe text="• При переднем ИМ и высоких блокадах — низкий порог для ВЭКС" /></li>
                          <li><Safe text="• Оценка обратимости после реперфузии" /></li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Перикардит ранний/поздний (Дресслера) */}
                  <section className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Перикардит после ИМ</h3>
                    <RecommendationBadge rec={{ class: 'IIa', level: 'B', evidenceText: 'НПВС/колхицин уменьшают рецидивы; осторожность с НПВС в ранний период' }} />
                    <ul className="text-sm text-gray-700 space-y-1 mt-3">
                      <li><Safe text="• Ранний перикардит: 1–4 сутки; лечение — НПВС (ибупрофен) + ИПП, избегать высоких доз при риске кровотечений" /></li>
                      <li><Safe text="• Синдром Дресслера: недели/месяцы; колхицин 0.5–1.0 мг/сут 3 мес (IIa/B)" /></li>
                      <li><Safe text="• Исключить тампонаду; при выпоте — эхо-контроль" /></li>
                    </ul>
                  </section>

                  {/* Инсульт/реинфаркт */}
                  <section className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Инсульт / реинфаркт</h3>
                    <RecommendationBadge rec={{ class: 'I', level: 'B', evidenceText: 'Немедленная нейровизуализация при подозрении на инсульт; оптимизация антитромботической терапии' }} />
                    <ul className="text-sm text-gray-700 space-y-1 mt-3">
                      <li><Safe text="• Острый неврологический дефицит — срочная КТ/МРТ, консультация инсультной команды" /></li>
                      <li><Safe text="• Реинфаркт — повторная ЭКГ, динамика тропонина, оценка проходимости стента (инвазивно)" /></li>
                      <li><Safe text="• Оптимизация ДАТТ/антикоагуляции по балансу ишемия/кровотечение" /></li>
                    </ul>
                  </section>
                </div>
              )}

              {/* Профилактика */}
              {selectedTab === 'prevention' && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Вторичная профилактика после ОКС</h2>

                  <section className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Медикаментозная терапия</h3>
                    <div className="space-y-4">
                      {escGuideline.secondaryPrevention.medications.map((med: any, idx: number) => (
                        <div key={idx} className="bg-white rounded-lg p-4 border border-blue-100">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            <Safe text={med.drug} />
                          </h4>
                          <RecommendationBadge rec={{ class: med.class, level: med.level, evidenceText: med.evidenceText }} />
                          {med.duration && (
                            <p className="text-sm text-gray-700 mt-2">
                              <Safe text={`Длительность: ${med.duration}`} />
                            </p>
                          )}
                          {med.target && (
                            <p className="text-sm text-gray-700">
                              <Safe text={`Цель: ${med.target}`} />
                            </p>
                          )}
                          {med.monitoring && (
                            <p className="text-sm text-gray-700">
                              <Safe text={`Мониторинг: ${med.monitoring}`} />
                            </p>
                          )}
                          {med.deescalation && (
                            <ul className="text-sm text-gray-700 space-y-1 mt-2">
                              {med.deescalation.map((it: string, i: number) => (
                                <li key={i}>
                                  <Safe text={`• ${it}`} />
                                </li>
                              ))}
                            </ul>
                          )}
                          {med.escalation && (
                            <ul className="text-sm text-gray-700 space-y-1 mt-2">
                              {med.escalation.map((it: string, i: number) => (
                                <li key={i}>
                                  <Safe text={`• ${it}`} />
                                </li>
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
                      {escGuideline.secondaryPrevention.lifestyle.map((item: any, idx: number) => (
                        <div key={idx} className="bg-white rounded-lg p-4 border border-green-100">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            <Safe text={item.area} />
                          </h4>
                          <RecommendationBadge rec={{ class: item.class, level: item.level, evidenceText: item.evidenceText }} />
                          <p className="text-sm text-gray-700 mt-2">
                            Рекомендация: <span className="font-medium"><Safe text={item.recommendation} /></span>
                          </p>
                          {item.components && (
                            <ul className="text-sm text-gray-700 space-y-1 mt-2">
                              {item.components.map((c: string, i: number) => (
                                <li key={i}>
                                  <Safe text={`• ${c}`} />
                                  </li>
                              ))}
                            </ul>
                          )}
                          {item.interventions && (
                            <ul className="text-sm text-gray-700 space-y-1 mt-2">
                              {item.interventions.map((c: string, i: number) => (
                                <li key={i}>
                                  <Safe text={`• ${c}`} />
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* Сравнение */}
              {selectedTab === 'comparison' && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    <Safe text={escGuideline.comparison.title} />
                  </h2>

                  {/* Ключевые различия */}
                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <h3 className="text-xl font-semibold text-green-800 mb-4">Ключевые различия</h3>
                    <div className="space-y-4">
                      {escGuideline.comparison.keyDifferences.map((diff: any, idx: number) => (
                        <div key={idx} className="bg-white rounded-lg p-4 border border-green-100 shadow-sm">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            <Safe text={diff.aspect} />
                          </h4>
                          <RecommendationBadge rec={{ class: diff.class, level: diff.level, evidenceText: diff.evidenceText }} />
                          <div className="grid md:grid-cols-2 gap-4 text-sm mt-3">
                            <div>
                              <p className="font-medium text-gray-700 mb-1">🇪🇺 ESC 2023-2024 / Europe</p>
                              <p className="text-gray-700">
                                <Safe text={diff.eu} />
                              </p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700 mb-1">🇺🇸 ACC/AHA 2025 / US</p>
                              <p className="text-gray-700">
                                <Safe text={diff.us} />
                              </p>
                            </div>
                          </div>
                          <p className="mt-3 text-sm text-gray-600">
                            <Safe text={diff.significance} />
                          </p>
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
                          <span>
                            <Safe text={item} />
                          </span>
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
                При принятии клинических решений всегда следуйте официальным руководствам и локальным протоколам вашего учреждения.
                Авторы не несут ответственности за использование представленной информации в клинической практике.
              </p>

              {/* Визуальный зазор 150px перед e-mail */}
              <div className="h-[150px]" aria-hidden="true"></div>

              <p className="text-lg font-medium text-gray-900">support@medradix.info</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
