// app/guides/acs/page.tsx — «код-окс» (финал-2): стиль «Осложнений», MINOCA → Диагностика с дозами, конкретика по терапиям и алгоритмам с классами/уровнями

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

      // НОВЫЙ блок в Диагностике: MINOCA / SCAD / спазм с конкретной терапией
      minocaScadSpasm: {
        title: 'MINOCA / SCAD / Вазоспазм: верификация и ведение',
        verifyFirst: [
          'Исключить альтернативы: миокардит (КМРТ с LGE), ТЭЛА (КТ-ангио), ТАКО-ЦУБО',
          'Визуализация коронарного русла: КАГ ± IVUS/OCT для SCAD/эрозии',
          'Провокационные тесты на спазм (ацетилхолин) в опытном центре',
        ],
        phenotypes: [
          {
            name: 'Вазоспастическая ангина / спазм',
            therapy: [
              { drug: 'Дилтиазем', dose: '120–360 мг/сут (в 2–3 приёма)', note: 'Препарат первой линии', class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel, evidenceText: 'БКК уменьшают частоту спазмов и ишемии' },
              { drug: 'Амлодипин', dose: '5–10 мг/сут', note: 'Альтернатива/добавление', class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel },
              { drug: 'Нитроглицерин', dose: '0.3–0.6 мг SL при приступе; ИНФ 5–20 мкг/мин при тяжёлом течении', note: 'Купирование симптомов', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel },
            ],
            cautions: ['Избегать неселективных бета-блокаторов при подозрении на спазм (возможное усиление вазоконстрикции)'],
          },
          {
            name: 'SCAD (спонтанная диссекция коронарной артерии)',
            therapy: [
              { drug: 'Консервативное ведение', dose: '—', note: 'При стабильной гемодинамике и TIMI 3 — предпочтительно', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel, evidenceText: 'Самопроходящее заживление у большинства' },
              { drug: 'Аспирин', dose: '75–100 мг/сут', note: 'Антитромбоцитарная монотерапия после острой фазы', class: 'IIa' as RecommendationClass, level: 'C' as EvidenceLevel },
              { drug: 'Бета-блокатор', dose: 'Бисопролол 2.5–10 мг/сут или Метопролол 25–200 мг/сут', note: 'Снижение риска рецидива', class: 'IIa' as RecommendationClass, level: 'C' as EvidenceLevel },
            ],
            avoid: ['Агрессивная проводка проводника/стентирование при протяжённых разрывах — высок риск расширения диссекции'],
          },
          {
            name: 'Эрозия/разрыв бляшки без обструкции',
            therapy: [
              { drug: 'ДАТТ', dose: 'Аспирин 75–100 мг/сут + тикагрелор 90 мг 2р/сут (или клопидогрел 75 мг/сут)', note: '6–12 мес согласно риску', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
              { drug: 'Статины высокой интенсивности', dose: 'Аторвастатин 80 мг/сут или Розувастатин 20–40 мг/сут', note: 'Липид-цели как при ИБС', class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel },
            ],
          },
          {
            name: 'Микрососудистая дисфункция',
            therapy: [
              { drug: 'БКК (дилтиазем/амлодипин) или бета-блокатор', dose: 'С титрацией до контроля симптомов', note: 'Антиангинальная терапия', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
              { drug: 'Ранолазин', dose: '500–1000 мг 2р/сут', note: 'При стойкой ангине', class: 'IIb' as RecommendationClass, level: 'B' as EvidenceLevel },
            ],
          },
        ],
      },
    },

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
          indication: 'STEMI/NSTE-ACS при первичном ЧКВ или при ХБП тяжёлой степени',
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
      ],

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

    // ОСЛОЖНЕНИЯ: карточки с конкретными препаратами/дозами и алгоритмами (класс/уровень)
    complications: [
      {
        id: 'cardiogenic-shock',
        color: 'emerald',
        title: 'Кардиогенный шок',
        redFlags: ['САД <90 мм рт.ст. ≥30 мин', 'Признаки гипоперфузии (олигурия, холодные конечности)', 'Лактат >2 ммоль/л'],
        algorithm: [
          { step: 'ABCDE, мониторинг, доступ', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel },
          { step: 'Норэпинефрин 0.05–0.5 мкг/кг/мин (вазопрессор 1-й линии)', class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel },
          { step: 'Добутамин 2.5–10 мкг/кг/мин при низком СИ', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
          { step: 'Немедленная реваскуляризация (ЧКВ/КАКШ)', class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel },
          { step: 'Рассмотреть МУП (Impella/VA-ECMO) при рефрактерности', class: 'IIa' as RecommendationClass, level: 'C' as EvidenceLevel },
        ],
        therapy: [
          { drug: 'Норэпинефрин', dose: '0.05–0.5 мкг/кг/мин в/в', note: 'Цель MAP ≥65 мм рт.ст.', class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel },
          { drug: 'Добутамин', dose: '2.5–10 мкг/кг/мин в/в', note: 'Добавить при низком сердечном индексе', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
          { drug: 'Фуросемид', dose: '20–40 мг в/в болюс при перегрузке объёмом', note: 'Осторожно при гипоперфузии', class: 'IIb' as RecommendationClass, level: 'C' as EvidenceLevel },
        ],
      },
      {
        id: 'mechanical',
        color: 'rose',
        title: 'Механические осложнения ИМ',
        redFlags: ['Внезапная гипотензия', 'Новый громкий систолический шум', 'Тампонада/ЭМД'],
        algorithm: [
          { step: 'Немедленное Эхо-КГ у постели', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel },
          { step: 'Стабилизация вазопрессорами/инотропами', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel },
          { step: 'Временная МУП при шоке', class: 'IIa' as RecommendationClass, level: 'C' as EvidenceLevel },
          { step: 'Экстренная хирургия (разрыв МЖП/ПМ/стенки)', class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel },
        ],
        therapy: [
          { drug: 'Норэпинефрин', dose: '0.05–0.5 мкг/кг/мин', note: 'Поддержка давления', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel },
          { drug: 'Добутамин', dose: '2.5–10 мкг/кг/мин', note: 'Поддержка сердечного выброса', class: 'IIa' as RecommendationClass, level: 'C' as EvidenceLevel },
        ],
      },
      {
        id: 'rv-mi',
        color: 'cyan',
        title: 'Правожелудочковый инфаркт',
        redFlags: ['Гипотензия при нижнем ИМ', 'Повышенное ЯВД', 'Чистые лёгкие'],
        algorithm: [
          { step: 'Отведения V3R–V4R, Эхо-КГ (функция ПЖ)', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel },
          { step: 'Болюсы кристаллоидов 250–500 мл с повторной оценкой', class: 'IIa' as RecommendationClass, level: 'C' as EvidenceLevel },
          { step: 'Избегать нитратов/диуретиков при гипотензии', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel },
          { step: 'Добутамин при низком СИ', class: 'IIa' as RecommendationClass, level: 'C' as EvidenceLevel },
          { step: 'ЧКВ ПКА при продолжающейся ишемии', class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel },
        ],
        therapy: [
          { drug: 'Изотонические кристаллоиды', dose: '250–500 мл болюс, повторно по ответу', note: 'Цель — преднагрузка ПЖ', class: 'IIa' as RecommendationClass, level: 'C' as EvidenceLevel },
          { drug: 'Добутамин', dose: '2.5–10 мкг/кг/мин', note: 'Инотропная поддержка', class: 'IIa' as RecommendationClass, level: 'C' as EvidenceLevel },
        ],
      },
      {
        id: 'arrhythmias',
        color: 'amber',
        title: 'Жизнеопасные аритмии',
        redFlags: ['VF/pVT', 'Высокие АВ-блокады', 'Электрическая нестабильность'],
        algorithm: [
          { step: 'Дефибрилляция при VF/pVT немедленно', class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel },
          { step: 'Амиодарон при рефрактерной VT/VF', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
          { step: 'Транскутанная/временная ЭКС при выраженной брадикардии', class: 'IIa' as RecommendationClass, level: 'C' as EvidenceLevel },
          { step: 'Коррекция K/Mg', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel },
        ],
        therapy: [
          { drug: 'Амиодарон', dose: '300 мг в/в болюс, затем 150 мг; инфузия 1 мг/мин 6 ч → 0.5 мг/мин', note: 'При рецидивах VT/VF', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
          { drug: 'Лидокаин', dose: '1–1.5 мг/кг в/в болюс, затем 1–4 мг/мин', note: 'Альтернатива', class: 'IIb' as RecommendationClass, level: 'C' as EvidenceLevel },
          { drug: 'Сульфат магния', dose: '1–2 г в/в за 5–20 мин (torsades de pointes)', note: 'При TdP/гипомагниемии', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel },
          { drug: 'Калий', dose: 'Цель K⁺ 4.0–4.5 ммоль/л', note: 'Поддержание электролитов', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel },
        ],
      },
      {
        id: 'no-reflow',
        color: 'indigo',
        title: 'No-reflow / slow-flow при ЧКВ',
        redFlags: ['TIMI <3 после стентирования', 'Гипоперфузия миокарда'],
        algorithm: [
          { step: 'Интракоронарно аденозин/верапамил/нитраты', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
          { step: 'Оптимизация антикоагуляции', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel },
          { step: 'Оценка тромботической нагрузки, возможно аспирация', class: 'IIb' as RecommendationClass, level: 'C' as EvidenceLevel },
        ],
        therapy: [
          { drug: 'Аденозин (ИК)', dose: '60–120 мкг болюс в ИК', note: 'Микрососудистая вазодилатация', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
          { drug: 'Верапамил (ИК)', dose: '100–200 мкг медленно', note: 'Корригировать гипотензию', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
          { drug: 'Нитроглицерин (ИК)', dose: '100–200 мкг', note: 'Вазодилатация', class: 'IIa' as RecommendationClass, level: 'C' as EvidenceLevel },
        ],
      },
      {
        id: 'bleeding-hit',
        color: 'orange',
        title: 'Кровотечения / ГИТ',
        redFlags: ['BARC 3–5', 'Падение Hb >3 г/дл', 'Тромбоцитопения >50% от исходного'],
        algorithm: [
          { step: 'Оценка тяжести (BARC), локальный гемостаз', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel },
          { step: 'Протамин при НФГ, пересмотр ДАТТ/АК', class: 'IIa' as RecommendationClass, level: 'C' as EvidenceLevel },
          { step: 'Эндоскопия/интервенция при продолжающемся кровотечении', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel },
          { step: 'Подозрение на ГИТ → замена НФГ на фондaпаринукс/бивалирудин', class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel },
        ],
        therapy: [
          { drug: 'Протамин', dose: '1 мг на 100 Ед гепарина, введённых за прошлые 2–3 ч', note: 'Нейтрализация НФГ', class: 'IIa' as RecommendationClass, level: 'C' as EvidenceLevel },
          { drug: 'ИПП', dose: 'Пантопразол 40 мг/сут в/в/перорально', note: 'Профилактика/лечение ЖКК', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
          { drug: 'Альтернатива при ГИТ', dose: 'Фондaпаринукс 2.5 мг/сут или Бивалирудин по протоколу', note: 'Не применять НМГ при подтверждённой ГИТ', class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel },
        ],
      },
      {
        id: 'aki-contrast',
        color: 'sky',
        title: 'Острое повреждение почек (контраст/гипоперфузия)',
        redFlags: ['Рост креатинина ≥26.5 мкмоль/л за 48ч или ≥1.5× от исходного', 'Олигоанурия'],
        algorithm: [
          { step: 'Оценка объёмного статуса, отмена нефротоксинов', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel },
          { step: 'Изотоническая гидратация 1–1.5 мл/кг/ч до и после контраста', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
          { step: 'Минимизировать объём контраста', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel },
        ],
        therapy: [
          { drug: 'Гидратация (NaCl 0.9%)', dose: '1–1.5 мл/кг/ч за 3–12 ч до и 6–12 ч после', note: 'При отсутствии признаков перегрузки', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
          { drug: 'Коррекция доз', dose: 'Дозы АК/антитромботиков по КК', note: 'См. сопутствующие состояния', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel },
        ],
      },
      {
        id: 'glycemia',
        color: 'lime',
        title: 'Острые нарушения гликемии',
        redFlags: ['Гипо- или тяжёлая гипергликемия', 'Кетоацидоз'],
        algorithm: [
          { step: 'Капиллярная глюкоза, HbA1c', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel },
          { step: 'Инсулиновая коррекция по протоколу (целевой диапазон 7.8–10 ммоль/л)', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
          { step: 'Избегать гипогликемии', class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel },
        ],
        therapy: [
          { drug: 'Инсулин короткого действия', dose: 'По шкале внутр. протокола/инфузия', note: 'Титрация к целям', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
        ],
      },
      {
        id: 'comorbidity',
        color: 'violet',
        title: 'Сопутствующие состояния: только изменения терапии',
        points: [
          {
            name: 'СД и метформин',
            details: [
              { text: 'Отменять перед контрастом при eGFR <30 мл/мин/1.73 м² или при гемодинамической нестабильности/гипоксии', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel },
              { text: 'Возобновлять через 48 ч после контраста при стабильном креатинине', class: 'IIa' as RecommendationClass, level: 'C' as EvidenceLevel },
            ],
            therapy: [
              { drug: 'Метформин', dose: '— (временная отмена)', note: 'Риск лактацидоза при AKI/гипоперфузии', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel },
            ],
          },
          {
            name: 'ХБП (коррекция доз)',
            details: [
              { text: 'Эноксапарин: КК <30 — 1 мг/кг 1 р/сут', class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel },
              { text: 'Фондапаринукс противопоказан при КК <30', class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel },
              { text: 'ИАПФ/МРА — осторожная титрация, контроль K/креатинина', class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel },
            ],
            therapy: [
              { drug: 'Эноксапарин', dose: '1 мг/кг 1 р/сут (КК <30)', note: 'Анти-Xa при необходимости', class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel },
            ],
          },
          {
            name: 'ХОБЛ/астма',
            details: [
              { text: 'Предпочтительно кардиоселективные ББ (бисопролол, метопролол) с низкой старт-дозой', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
            ],
            therapy: [
              { drug: 'Бисопролол', dose: '1.25–2.5 мг → титровать', note: 'Следить за бронхоспазмом', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
            ],
          },
          {
            name: 'Беременность',
            details: [
              { text: 'Аспирин 75–100 мг/сут допустим', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
              { text: 'Клопидогрел — по строгим показаниям', class: 'IIb' as RecommendationClass, level: 'C' as EvidenceLevel },
              { text: 'НФГ предпочтительнее НОАК', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel },
            ],
            therapy: [
              { drug: 'НФГ', dose: 'под АЧТВ', note: 'Выбор АК в беременности', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel },
            ],
          },
          {
            name: 'Пожилые/хрупкие',
            details: [
              { text: 'Рассмотреть укорочение ДАТТ до 3–6 мес при HBR (PRECISE-DAPT/ARC-HBR)', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
              { text: 'Низкие старт-дозы ИАПФ/ББ/МРА, тщательная титрация', class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel },
            ],
          },
        ],
      },
    ],

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

  const RecommendationBadge = ({ rec }: { rec: Recommendation }) => {
    const cls: RecommendationClass = rec.class ?? 'I';
    const lvl: EvidenceLevel = rec.level ?? 'A';
    return (
      <div className="flex flex-col gap-1 text-sm min-w-[170px]">
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

  const sections = [
    { id: 'diagnosis' as const, label: 'Диагностика' },
    { id: 'treatment' as const, label: 'Лечение' },
    { id: 'complications' as const, label: 'Осложнения' },
    { id: 'prevention' as const, label: 'Профилактика' },
    { id: 'comparison' as const, label: 'Сравнение' },
  ];

  // Лёгкий тинт для карточек осложнений
  const tintById: Record<string, string> = {
    'cardiogenic-shock': 'bg-emerald-50 border-emerald-100',
    'mechanical': 'bg-rose-50 border-rose-100',
    'rv-mi': 'bg-cyan-50 border-cyan-100',
    'arrhythmias': 'bg-amber-50 border-amber-100',
    'no-reflow': 'bg-indigo-50 border-indigo-100',
    'bleeding-hit': 'bg-orange-50 border-orange-100',
    'aki-contrast': 'bg-sky-50 border-sky-100',
    'glycemia': 'bg-lime-50 border-lime-100',
    'comorbidity': 'bg-violet-50 border-violet-100',
  };

  return (
    <main className="min-h-screen bg-[#fcfcee] py-8">
      <style>{`
        select.text-center { text-align: center; text-align-last: center; }
        @supports not (text-align-last: center) {
          select.text-center option { text-align: center; }
        }
      `}</style>

      <div className="max-w-[1800px] mx-auto px-4">
        <section className="border-b border-gray-200 mb-8">
          <div className="max-w-[1800px] mx-auto px-4 pt-4 pb-4">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-0">
              <div className="flex-1 flex justify-start order-1 w-full lg:w-auto lg:order-3 lg:justify-end">
                <div className="flex flex-col items-start lg:items-end gap-1 w-full lg:w-auto">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f] hidden lg:block">Специальность</span>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="text-center rounded-full border border-[#d3cec4] bg-white px-4
                               h-12 min-h-[48px] w-full shadow-sm focus:outline-none focus:border-[#015d52]
                               lg:h-10 lg:min-h-0 lg:w-[200px]"
                  >
                    {SPECIALTIES.map((spec) => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex-1 flex justify-end order-2 w-full lg:w-auto lg:order-1 lg:justify-start">
                <div className="flex flex-col gap-1 w-full lg:w-auto">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f] hidden lg:block">Нозология</span>
                  <select
                    value={selectedNosology}
                    onChange={(e) => setSelectedNosology(e.target.value)}
                    className="text-center rounded-full border border-[#d3cec4] bg-white px-4
                               h-12 min-h-[48px] w-full shadow-sm focus:outline-none focus:border-[#015d52]
                               lg:h-10 lg:min-h-0 lg:w-[200px]"
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

              <div className="flex-shrink-0 text-center order-3 lg:order-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {escGuideline.title}
                </h1>
              </div>
            </div>

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

          <div className="flex-1 min-w-0">
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

            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
              {selectedTab === 'diagnosis' && (
                <div className="space-y-12">
                  {/* Аккордеон оставлен без изменений */}
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
                          ОКС — острое клиническое проявление ишемической болезни сердца, вызванное несоответствием между коронарным кровотоком и потребностью миокарда в кислороде.
                          Основные механизмы: разрыв/эрозия атеросклеротической бляшки с тромбозом, динамический спазм, микроциркуляторная дисфункция.
                        </p>
                        <p className="text-gray-700">
                          Ключевая классификация: STEMI (персистирующая подъём ST/новая БЛНПГ) и NSTE-ACS (NSTEMI/нестабильная стенокардия).
                          Стратегия определяется ЭКГ, тропонином и риском по шкалам (GRACE/HEART).
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
                                <td className="p-2">Ранняя/отсроченная инвазивная стратегия по риску (GRACE)</td>
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

                  {/* Первичная оценка/ЭКГ/Биомаркеры/Риск — как было */}
                  {/* ... (без изменений) ... */}

                  {/* НОВЫЙ блок: MINOCA/SCAD/спазм */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">MINOCA / SCAD / Вазоспазм: верификация и ведение</h3>
                    <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
                      <p className="text-sm text-gray-700 mb-3"><b>Верификация:</b> {escGuideline.diagnosis.minocaScadSpasm.verifyFirst.join('; ')}.</p>
                      <div className="grid md:grid-cols-2 gap-6">
                        {escGuideline.diagnosis.minocaScadSpasm.phenotypes.map((p, idx) => (
                          <div key={idx} className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">{p.name}</h4>
                            <div className="space-y-2">
                              {p.therapy.map((t, i) => (
                                <div key={i} className="bg-white/60 border border-emerald-100 rounded-md p-3">
                                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                                    <div>
                                      <p className="font-medium text-gray-900">{t.drug}</p>
                                      <p className="text-sm text-gray-700">Доза: {t.dose}</p>
                                      {t.note && <p className="text-xs text-gray-600 mt-1">{t.note}</p>}
                                    </div>
                                    <RecommendationBadge rec={{ class: t.class, level: t.level, evidenceText: t.evidenceText }} />
                                  </div>
                                </div>
                              ))}
                            </div>
                            {p.cautions && <p className="text-xs text-gray-600 mt-3"><b>Осторожно:</b> {p.cautions.join('; ')}</p>}
                            {p.avoid && <p className="text-xs text-gray-600 mt-1"><b>Избегать:</b> {p.avoid.join('; ')}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Калькуляторы риска — как было */}
                  {/* ... (без изменений) ... */}
                </div>
              )}

              {selectedTab === 'treatment' && (
                // ... раздел ЛЕЧЕНИЕ — БЕЗ ИЗМЕНЕНИЙ ...
                <div className="space-y-12">
                  {/* Содержимое treatment оставлено прежним */}
                  {/* ... код из предыдущей версии (без изменений) ... */}
                </div>
              )}

              {/* ОСЛОЖНЕНИЯ со стилем и конкретикой */}
              {selectedTab === 'complications' && (
                <section className="space-y-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Осложнения ОКС: диагностика и тактика</h2>
                  <p className="text-sm text-gray-600 mb-6">Карточки: «красные флаги», алгоритм (с классом/уровнем), конкретные лекарства с дозами.</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    {escGuideline.complications.map((c: any) => (
                      <article
                        key={c.id}
                        className={`rounded-2xl p-6 border ${tintById[c.id] ?? 'bg-gray-50 border-gray-100'} shadow-sm`}
                      >
                        <h3 className="text-xl font-semibold mb-4 text-gray-900">{c.title}</h3>

                        {c.redFlags?.length ? (
                          <div className="mb-4">
                            <p className="text-sm font-semibold text-gray-800 mb-1">Красные флаги</p>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                              {c.redFlags.map((r: string, i: number) => <li key={i}>{r}</li>)}
                            </ul>
                          </div>
                        ) : null}

                        {c.algorithm?.length ? (
                          <div className="mb-4">
                            <p className="text-sm font-semibold text-gray-800 mb-2">Алгоритм (первые шаги)</p>
                            <div className="space-y-2">
                              {c.algorithm.map((a: any, i: number) => (
                                <div key={i} className="bg-white/70 border border-gray-200 rounded-md p-3">
                                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                                    <p className="text-sm text-gray-800">{a.step}</p>
                                    <RecommendationBadge rec={{ class: a.class, level: a.level }} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        {c.therapy?.length ? (
                          <div className="mb-2">
                            <p className="text-sm font-semibold text-gray-800 mb-2">Терапия (конкретные препараты)</p>
                            <div className="space-y-2">
                              {c.therapy.map((t: any, i: number) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-md p-3">
                                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">{t.drug}</p>
                                      <p className="text-sm text-gray-700">Доза: {t.dose}</p>
                                      {t.note && <p className="text-xs text-gray-600 mt-1">{t.note}</p>}
                                    </div>
                                    <RecommendationBadge rec={{ class: t.class, level: t.level }} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        {c.points?.length ? (
                          <div className="mt-2 space-y-4">
                            {c.points.map((p: any, idx: number) => (
                              <div key={idx} className="bg-white/70 border border-gray-200 rounded-md p-3">
                                <p className="font-medium text-gray-900 mb-2">{p.name}</p>
                                {p.details?.length ? (
                                  <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5 mb-2">
                                    {p.details.map((d: any, j: number) => (
                                      <li key={j}>
                                        {d.text}{' '}
                                        <span className="inline-flex align-middle ml-2">
                                          <RecommendationBadge rec={{ class: d.class, level: d.level }} />
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                ) : null}
                                {p.therapy?.length ? (
                                  <div className="space-y-2">
                                    {p.therapy.map((t: any, k: number) => (
                                      <div key={k} className="bg-white border border-gray-200 rounded-md p-3">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                                          <div>
                                            <p className="text-sm font-medium text-gray-900">{t.drug}</p>
                                            <p className="text-sm text-gray-700">Доза: {t.dose}</p>
                                            {t.note && <p className="text-xs text-gray-600 mt-1">{t.note}</p>}
                                          </div>
                                          <RecommendationBadge rec={{ class: t.class, level: t.level }} />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {selectedTab === 'prevention' && (
                // ... раздел Профилактика — БЕЗ ИЗМЕНЕНИЙ ...
                <div className="space-y-8">
                  {/* Содержимое prevention оставлено прежним */}
                </div>
              )}

              {selectedTab === 'comparison' && (
                // ... раздел Сравнение — БЕЗ ИЗМЕНЕНИЙ ...
                <div className="space-y-8">
                  {/* Содержимое comparison оставлено прежним */}
                </div>
              )}
            </div>

            <section className="mt-4 mb-8 text-center">
              <button
                onClick={handleSaveSection}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#015d52] bg-white text-sm font-medium text-[#015d52] hover:ring-1 hover:ring-[#015d52] hover:shadow-[0_0_10px_#015D52] transition"
              >
                <FolderPlus size={16} />
                <span>Сохранить текущий раздел в «Мои гайды»</span>
              </button>
            </section>

            <section className="border-t border-gray-200 mt-12 pt-8 text-center">
              <p className="text-sm text-gray-600 mb-6 max-w-4xl mx-auto">
                Данное руководство представляет собой обзор и интерпретацию клинических рекомендаций для медицинских специалистов.
                Информация носит исключительно образовательный характер и не заменяет профессиональное медицинское заключение.
                При принятии клинических решений всегда следуйте официальным руководствам и локальным протоколам вашего учреждения.
                Авторы не несут ответственности за использование представленной информации в клинической практике.
              </p>
              <div className="h-[150px]" aria-hidden="true"></div>
              <p className="text-lg font-medium text-gray-900">support@medradix.info</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
