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

// ====== Типы ======

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
  // Ишемическая болезнь сердца
  { id: 'acs', label: 'Острый коронарный синдром (ОКС)', group: 'Ишемическая болезнь сердца' },
  { id: 'chronic-ihd', label: 'Хроническая ишемическая болезнь сердца', group: 'Ишемическая болезнь сердца' },
  { id: 'stable-angina', label: 'Стабильная стенокардия', group: 'Ишемическая болезнь сердца' },
  { id: 'post-mi', label: 'Постинфарктный период', group: 'Ишемическая болезнь сердца' },

  // Нарушения ритма и проводимости
  { id: 'af', label: 'Фибрилляция предсердий', group: 'Нарушения ритма и проводимости' },
  { id: 'other-arrhythmias', label: 'Другие нарушения ритма и проводимости', group: 'Нарушения ритма и проводимости' },

  // Сердечная недостаточность
  { id: 'hf', label: 'Хроническая сердечная недостаточность', group: 'Сердечная недостаточность' },

  // Артериальная гипертензия
  { id: 'htn', label: 'Артериальная гипертензия', group: 'Артериальная гипертензия' },

  // Поражения клапанов и врождённые пороки
  { id: 'valvular', label: 'Поражения клапанов сердца', group: 'Поражения клапанов и врождённые пороки' },
  { id: 'congenital', label: 'Врожденные пороки сердца у взрослых', group: 'Поражения клапанов и врождённые пороки' },

  // Кардиомиопатии
  { id: 'cardiomyopathies', label: 'Кардиомиопатии', group: 'Кардиомиопатии' },

  // Воспалительные заболевания
  { id: 'myocarditis', label: 'Миокардиты', group: 'Воспалительные заболевания миокарда и перикарда' },
  { id: 'pericarditis', label: 'Перикардиты', group: 'Воспалительные заболевания миокарда и перикарда' },

  // Лёгочная гипертензия и ТЭЛА
  { id: 'pah', label: 'Легочная гипертензия', group: 'Лёгочная гипертензия и ТЭЛА' },
  { id: 'pe', label: 'Тромбоэмболия легочной артерии (ТЭЛА)', group: 'Лёгочная гипертензия и ТЭЛА' },
];

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

  // ====== ДАННЫЕ (НЕ СКРАЩАТЬ — базовый массив сохранён) ======
  const escGuideline = {
    title: 'Острый коронарный синдром',
    version: 'ESC 2023-2024',
    sources: {
      nsteacs: 'https://academic.oup.com/eurheartj/article/44/38/3720/7235365',
      stemi: 'https://academic.oup.com/eurheartj/advance-article/doi/10.1093/eurheartj/ehae170/7649113',
      us: '#',
      full: 'https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines',
    },

    // ДИАГНОСТИКА — базовые блоки + ДОБАВЛЕНО: MINOCA
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
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень C — Консенсус экспертов или малые исследования',
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
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень C — Консенсус экспертов или малые исследования',
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
            evidenceText: 'Класс I — Рекомендуется/Показано; Уровень B — Одно РКИ или крупные нерандомизированные исследования',
          },
          {
            criteria: 'Новая блокада ЛНПГ',
            details: ['Ширина QRS ≥120 мс', 'Типичная морфология БЛНПГ', 'Согласованность с клинической картиной'],
            class: 'I' as RecommendationClass,
            level: 'B' as EvidenceLevel,
            evidenceText: 'Класс I — Рекомендуется/Показано; Уровень B — Одно РКИ или крупные нерандомизированные исследования',
          },
        ],
        nstemi: [
          {
            criteria: 'ST-депрессия',
            details: ['≥0.5 мм в ≥2 смежных отведениях', 'Горизонтальная или косонисходящая'],
            class: 'I' as RecommendationClass,
            level: 'B' as EvidenceLevel,
            evidenceText: 'Класс I — Рекомендуется/Показано; Уровень B — Одно РКИ или крупные нерандомизированные исследования',
          },
          {
            criteria: 'Инверсия зубца T',
            details: ['≥1 мм в отведениях с доминирующим R', 'Глубокая симметричная инверсия'],
            class: 'I' as RecommendationClass,
            level: 'B' as EvidenceLevel,
            evidenceText: 'Класс I — Рекомендуется/Показано; Уровень B — Одно РКИ или крупные нерандомизированные исследования',
          },
          {
            criteria: 'Преходящая ST-элевация',
            details: ['<20 минут', 'Спонтанное разрешение'],
            class: 'I' as RecommendationClass,
            level: 'B' as EvidenceLevel,
            evidenceText: 'Класс I — Рекомендуется/Показано; Уровень B — Одно РКИ или крупные нерандомизированные исследования',
          },
        ],
      },

      // ДОБАВЛЕНО: MINOCA — диагностический модуль с ведением
      minoca: {
        definition: 'МИНОКА: клиника инфаркта миокарда с повышением/падением тропонина и отсутствием обструктивных поражений эпикардиальных артерий (<50% стеноза) при коронарографии.',
        dx: [
          'Исключить: миокардит, ТЭЛА, ТАКОЦУБО, тип 2 ИМ (дисбаланс спрос/доставка)',
          'Инвазивная визуализация: OCT/IVUS для выявления разрыва/эрозии бляшки, тромба, SCAD',
          'CMR (в первые 7 дней): дифференцировать миокардит/ишемию/ТАКОЦУБО',
          'Тест на вазоспазм (ацетилхолин) — при подозрении на спастический механизм',
        ],
        management: [
          {
            scenario: 'Подтверждённая разрыв/эрозия бляшки (по OCT/IVUS) — ишемический MINOCA',
            therapy: [
              { drug: 'Двойная антиагрегантная терапия', dose: 'Аспирин 75–100 мг/сут + тикагрелор 90 мг 2 р/сут (или клопидогрел 75 мг/сут) на 12 мес', note: 'Как при ИМ без подъёма ST', class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel, evidenceText: 'Адаптация DAPT аналогично NSTE-ACS при доказанной тромбозе/эрозии' },
              { drug: 'Статин высокой интенсивности', dose: 'Аторвастатин 80 мг/сут или розувастатин 20–40 мг/сут', note: 'Цель ЛПНП <1.4 ммоль/л и −50% от исходного', class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel },
              { drug: 'ИАПФ/БРА', dose: 'Рамиприл 2.5–10 мг/сут или валсартан 80–320 мг/сут', note: 'При сниженной ФВ ЛЖ/СН/СД/АГ', class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel },
              { drug: 'Бета-блокатор', dose: 'Бисопролол 2.5–10 мг/сут или метопролол 25–200 мг/сут', note: 'При симптомах ишемии/тахикардии/СН', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
            ],
          },
          {
            scenario: 'Вазоспастический MINOCA',
            therapy: [
              { drug: 'БКК (дилтиазем/амлодипин/верапамил)', dose: 'Дилтиазем 120–360 мг/сут или амлодипин 5–10 мг/сут', note: 'Профилактика спазма', class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel },
              { drug: 'Нитраты', dose: 'ИПН нитратов/нитроглицерин с титрацией', note: 'Контроль ангинозных симптомов', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
              { drug: 'Избегать ß-блокаторов без показаний', dose: '—', note: 'Возможное усиление спазма при вазоспастической ангине', class: 'IIb' as RecommendationClass, level: 'C' as EvidenceLevel },
            ],
          },
          {
            scenario: 'SCAD (спонтанная диссекция коронарной артерии)',
            therapy: [
              { drug: 'Консервативная тактика', dose: '—', note: 'Чаще спонтанное заживление; ЧКВ только при продолжающейся ишемии/окклюзии проксимальных сегментов', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel },
              { drug: 'Антитромботическая терапия', dose: 'Чаще монотерапия аспирином 75–100 мг/сут; DAPT — индивидуально при стентировании', note: 'Осторожно с антикоагулянтами — риск расширения диссекции', class: 'IIa' as RecommendationClass, level: 'C' as EvidenceLevel },
            ],
          },
        ],
      },

      biomarkers: {
        highSensitivityTroponin: {
          protocol: '0/1 час или 0/2 часа',
          cutoff: '99-й перцентиль верхнего референсного предела (URL)',
          dynamics: 'Изменение ≥20% за 3–6 часов',
          interpretation: [
            'При поступлении <URL и через 1 ч <URL → низкий риск',
            'При поступлении <URL и через 1 ч >URL → промежуточный риск',
            'При поступлении >URL и динамика ≥20% → высокий риск',
            'При поступлении >URL и динамика <20% → повтор через 3–6 ч',
          ],
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень A — Множественные РКИ или мета‑анализы',
        },
        additionalMarkers: [
          'КФК‑МВ: менее специфичен, но полезен при недоступности тропонина',
          'Миоглобин: ранний маркер, низкая специфичность',
          'BNP/NT‑proBNP: прогностическая ценность',
        ],
      },

      riskStratification: {
        grace: {
          parameters: ['Возраст', 'ЧСС', 'Систолическое АД', 'Уровень креатинина', 'Признаки СН', 'ЭКГ изменения', 'Повышение кардиальных ферментов'],
          scores: ['Низкий риск: <109 баллов', 'Средний риск: 109–140 баллов', 'Высокий риск: >140 баллов'],
          mortality: ['Госпитальная: 0.6% (низкий риск) до 21% (высокий риск)', '6‑месячная: 3% (низкий риск) до 26% (высокий риск)'],
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень B — Одно РКИ или крупные нерандомизированные исследования',
        },
        hematics: {
          parameters: ['Возраст', 'Уровень тропонина', 'ЭКГ изменения', 'Факторы риска', 'Повторяемость боли'],
          scores: ['Очень низкий риск: 0–2 балла', 'Низкий риск: 3–5 баллов', 'Высокий риск: ≥6 баллов'],
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень B — Одно РКИ или крупные нерандомизированные исследования',
        },
      },

      differentialDiagnosis: [
        { condition: 'Перикардит', features: ['Боль зависит от положения тела', 'Шум трения перикарда', 'Диффузная ST‑элевация', 'Отсутствие реципрокных изменений'] },
        { condition: 'ТЭЛА', features: ['Внезапная одышка', 'Гипоксия', 'Правосторонняя перегрузка на ЭКГ', 'Повышение D‑димера'] },
        { condition: 'Расслоение аорты', features: ['Мигрирующая боль', 'Асимметрия АД', 'Расширение средостения на рентгене', 'Неврологическая симптоматика'] },
      ],
    },

    // ЛЕЧЕНИЕ (полноценный блок как был, без сокращений)
    treatment: {
      generalMeasures: [
        {
          measure: 'Кислородотерапия',
          indication: 'SatO2 <90% или дыхательная недостаточность',
          dose: '2–4 л/мин через назальные канюли',
          class: 'I' as RecommendationClass,
          level: 'C' as EvidenceLevel,
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень C — Консенсус экспертов',
        },
        {
          measure: 'Обезболивание',
          indication: 'Боль умеренной‑сильной интенсивности',
          dose: 'Морфин 2–4 мг в/в болюс + титрация; при непереносимости — фентанил 25–50 мкг в/в',
          options: ['Морфин 2–4 мг в/в + метоклопрамид 10 мг', 'При непереносимости: фентанил 25–50 мкг'],
          class: 'I' as RecommendationClass,
          level: 'C' as EvidenceLevel,
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень C — Консенсус экспертов',
        },
        {
          measure: 'Нитроглицерин',
          indication: 'Персистирующая боль, СН, гипертензия',
          contraindications: ['САД <90 мм рт.ст.', 'Прием ингибиторов ФДЭ‑5', 'Выраженная брадикардия'],
          dose: '0.3–0.6 мг сублингвально или 5–10 мкг/мин в/в',
          class: 'I' as RecommendationClass,
          level: 'C' as EvidenceLevel,
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень C — Консенсус экспертов',
        },
      ],

      antiplateletTherapy: [
        {
          drug: 'Аспирин',
          loading: '150–300 мг перорально (разжевать)',
          maintenance: '75–100 мг/сут постоянно',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень A — Множественные РКИ или мета‑анализы',
          notes: 'Начать немедленно при подозрении на ОКС',
        },
        {
          drug: 'P2Y12 ингибиторы — ВЫБОР',
          options: [
            {
              name: 'Тикагрелор',
              loading: '180 мг',
              maintenance: '90 мг 2 раза/сут',
              duration: '12 месяцев',
              advantages: ['Быстрое начало действия', 'Обратимое связывание'],
              disadvantages: ['Одышка (10–15%)', 'Кровотечения', 'Взаимодействие с сильными ингибиторами CYP3A4'],
              class: 'I' as RecommendationClass,
              level: 'A' as EvidenceLevel,
              evidenceText: 'Класс I — Рекомендуется/Показано; Уровень A — Множественные РКИ или мета‑анализы',
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
              evidenceText: 'Класс I — Рекомендуется/Показано; Уровень B — Одно РКИ/крупные нерандомизированные',
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
              evidenceText: 'Класс I — Рекомендуется/Показано; Уровень B — Одно РКИ/крупные нерандомизированные',
            },
          ],
        },
      ],

      anticoagulation: [
        {
          drug: 'Фондапаринукс',
          dose: '2.5 мг п/к 1 раз/сут',
          indication: 'Предпочтительный антикоагулянт при NSTE‑ACS без показаний к срочному ЧКВ',
          notes: 'Не применять при КК <30 мл/мин; при ЧКВ — дополнительно болюс НФГ',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I — Предпочтительный выбор при NSTE‑ACS; Уровень A — Множественные РКИ/мета‑анализы',
        },
        {
          drug: 'Эноксапарин (НМГ)',
          dose: '1 мг/кг п/к каждые 12 ч (при КК <30 мл/мин — 1 мг/кг 1 раз/сут)',
          indication: 'Альтернатива фондапаринуксу при невозможности его применения',
          notes: 'Требует коррекции дозы при ХБП; учитывать суммарную антикоагуляцию при ЧКВ',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень A — Множественные РКИ/мета‑анализы',
        },
        {
          drug: 'Нефракционированный гепарин',
          dose: '60–70 Ед/кг в/в болюс (макс 5000 Ед), затем 12–15 Ед/кг/ч с контролем АЧТВ',
          indication: 'Пациенты со STEMI/NSTE‑ACS при первичном ЧКВ или при ХБП тяжёлой степени',
          notes: 'Контролировать АЧТВ; помнить о риске ГИТ',
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень B — Одно РКИ/крупные нерандомизированные',
        },
      ],

      reperfusion: {
        stemi: [
          {
            method: 'Первичное ЧКВ',
            timing: 'FMC‑to‑device ≤120 мин, door‑to‑balloon ≤90 мин',
            indications: ['Всем пациентам с STEMI при доступности в сроки'],
            results: ['Снижение смертности на 25–50%', 'Уменьшение размеров ИМ', 'Снижение частоты СН'],
            class: 'I' as RecommendationClass,
            level: 'A' as EvidenceLevel,
            evidenceText: 'Класс I — Рекомендуется/Показано; Уровень A — Множественные РКИ/мета‑анализы',
          },
          {
            method: 'Фибринолиз',
            timing: 'FMC‑to‑needle ≤10 мин при задержке ЧКВ >120 мин',
            indications: ['Раннее поступление (<2 ч)', 'Молодой возраст', 'Передне‑септальная локализация'],
            contraindications: [
              'Абсолютные: внутричерепное кровоизлияние, ЗЧМТ, злокачественные опухоли ЦНС',
              'Относительные: тяжелая гипертензия, операция <3 нед, кровотечения',
            ],
            drugs: [
              'Тенектеплаза: вес‑зависимая доза (30–50 мг)',
              'Альтеплаза: 15 мг болюс + 0.75 мг/кг (макс 50 мг) за 30 мин + 0.5 мг/кг (макс 35 мг) за 60 мин',
            ],
            class: 'I' as RecommendationClass,
            level: 'A' as EvidenceLevel,
            evidenceText: 'Класс I — Рекомендуется/Показано; Уровень A — Множественные РКИ/мета‑анализы',
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
            evidenceText: 'Класс I — Рекомендуется/Показано; Уровень A — Множественные РКИ/мета‑анализы',
          },
          {
            strategy: 'Отсроченная инвазивная (25–72 ч)',
            indications: ['Диабет', 'Почечная недостаточность', 'Снижение ФВ ЛЖ', 'Ранняя постинфарктная стенокардия'],
            class: 'I' as RecommendationClass,
            level: 'A' as EvidenceLevel,
            evidenceText: 'Класс I — Рекомендуется/Показано; Уровень A — Множественные РКИ/мета‑анализы',
          },
        ],
      },

      adjunctiveTherapy: [
        {
          drug: 'Бета‑блокаторы',
          indication: 'Тахикардия, гипертензия, сохраненная функция ЛЖ',
          contraindications: ['Острая декомпенсация СН', 'Выраженная брадикардия', 'АВ‑блокада II–III ст.', 'Бронхоспазм'],
          options: ['Метопролол 25–50 мг 2 раза/сут', 'Бисопролол 2.5–10 мг/сут'],
          timing: 'В первые 24 часа при стабильном состоянии',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень A — Множественные РКИ/мета‑анализы',
        },
        {
          drug: 'Статины высокой интенсивности',
          indication: 'Все пациенты с ОКС',
          options: ['Аторвастатин 80 мг/сут', 'Розувастатин 20–40 мг/сут'],
          timing: 'Немедленно при поступлении',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень A — Множественные РКИ/мета‑анализы',
        },
        {
          drug: 'ИАПФ/БРА',
          indication: 'СН, дисфункция ЛЖ (ФВ <40%), диабет, гипертензия',
          options: ['Рамиприл 2.5–10 мг/сут', 'Периндоприл 2–8 мг/сут', 'Валсартан 80–320 мг/сут'],
          timing: 'В первые 24 часа при стабильном состоянии',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень A — Множественные РКИ/мета‑анализы',
        },
        {
          drug: 'Антагонисты минералокортикоидных рецепторов',
          indication: 'ФВ ЛЖ ≤40% + СН или сахарный диабет после ОКС',
          options: ['Эплеренон 25–50 мг/сут', 'Спиронолактон 25–50 мг/сут'],
          timing: 'В течение первых 3–7 суток при стабильном креатинине и калии',
          contraindications: ['Калий >5.0 ммоль/л', 'КК <30 мл/мин'],
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень B — Одно РКИ/крупные нерандомизированные',
        },
        {
          drug: 'SGLT2 ингибиторы',
          indication: 'СН с ФВ сниженной или умеренно сниженной после ОКС (с/без СД)',
          options: ['Дапаглифлозин 10 мг/сут', 'Эмпаглифлозин 10 мг/сут'],
          timing: 'После стабилизации гемодинамики и функции почек',
          contraindications: ['КК <20–25 мл/мин (в зависимости от препарата)'],
          class: 'IIa' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс IIa — Следует рассмотреть; Уровень A — Множественные РКИ/мета‑анализы',
        },
      ],

      commonPitfalls: [
        {
          title: 'Задержка реперфузии при STEMI',
          items: [
            'Длительное ожидание нормализации боли/ЭКГ вместо немедленного решения о ЧКВ/фибринолизе',
            'Направление пациента в неинтервенционный стационар при наличии доступного ЧКВ‑центра',
            'Отсутствие контроля таймингов (FMC‑to‑device, door‑to‑balloon, FMC‑to‑needle)',
          ],
          severity: 'high',
        },
        {
          title: 'Недооценка риска у пациентов с NSTE‑ACS',
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
          deescalation: ['При высоком риске кровотечений: 3–6 месяцев', 'Рассмотреть переход на клопидогрел после 1–3 месяцев', 'Оценка по шкале PRECISE‑DAPT и ARC‑HBR'],
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень A — Множественные РКИ/мета‑анализы',
        },
        {
          drug: 'Статины',
          target: 'ЛПНП снижение ≥50% от исходного и <1.4 ммоль/л',
          monitoring: 'Через 4–12 недель, затем ежегодно',
          escalation: ['При недостижении цели: + эзетимиб 10 мг/сут', 'При персистирующем высоком ЛПНП: + ингибитор PCSK9'],
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень A — Множественные РКИ/мета‑анализы',
        },
      ],
      lifestyle: [
        {
          area: 'Курение',
          recommendation: 'Полное прекращение',
          interventions: ['Консультирование', 'Никотин‑заместительная терапия', 'Варениклин/бупропион'],
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень B — Одно РКИ/крупные нерандомизированные',
        },
        {
          area: 'Диета',
          recommendation: 'Средиземноморская диета',
          components: ['Овощи, фрукты, цельнозерновые', 'Рыба 2 раза/неделю', 'Оливковое масло', 'Ограничение соли <5 г/сут'],
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень B — Одно РКИ/крупные нерандомизированные',
        },
        {
          area: 'Физическая активность',
          recommendation: '150 мин/нед умеренной или 75 мин/нед интенсивной нагрузки',
          progression: 'Постепенное увеличение под контролем',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень A — Множественные РКИ/мета‑анализы',
        },
      ],
    },

    // СРАВНЕНИЕ
    comparison: {
      title: 'Сравнение Европейских (ESC 2023–2024) и Американских (ACC/AHA 2025) рекомендаций',
      keyDifferences: [
        {
          aspect: 'Дозировка аспирина',
          eu: '150–300 мг нагрузка, 75–100 мг/сут поддержка',
          us: '325 мг нагрузка, 81 мг/сут поддержка',
          significance: 'US использует более высокую нагрузочную дозу',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень A — Множественные РКИ/мета‑анализы',
        },
        {
          aspect: 'Выбор P2Y12 ингибитора',
          eu: 'Прасугрел предпочтителен при планируемом ЧКВ',
          us: 'Тикагрелор или прасугрел — равноправный выбор',
          significance: 'ESC более конкретен в выборе прасугрела',
          class: 'I' as RecommendationClass,
          level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень B — Одно РКИ/крупные нерандомизированные',
        },
        {
          aspect: 'Сроки ЧКВ при NSTEMI',
          eu: '<24 ч для высокого риска, <72 ч для промежуточного',
          us: '<12–24 ч для среднего/высокого риска',
          significance: 'Более агрессивные сроки в US',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень A — Множественные РКИ/мета‑анализы',
        },
        {
          aspect: 'Длительность двойной антитромбоцитарной терапии',
          eu: '12 месяцев стандартно, 3–6 месяцев при высоком риске кровотечений',
          us: '6–12 месяцев с возможностью продления до 30 месяцев при низком риске кровотечений',
          significance: 'Более гибкий подход в US рекомендациях',
          class: 'I' as RecommendationClass,
          level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I — Рекомендуется/Показано; Уровень A — Множественные РКИ/мета‑анализы',
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

  // ====== UI-компоненты ======
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

  const handleSaveSection = () => {};

  const sections = [
    { id: 'diagnosis' as const, label: 'Диагностика' },
    { id: 'treatment' as const, label: 'Лечение' },
    { id: 'complications' as const, label: 'Осложнения' },
    { id: 'prevention' as const, label: 'Профилактика' },
    { id: 'comparison' as const, label: 'Сравнение' },
  ];

  // ====== Рендер ======
  return (
    <main className="min-h-screen bg-[#fcfcee] py-8">
      <div className="max-w-[1800px] mx-auto px-4">
        {/* Заголовок и фильтры */}
        <section className="border-b border-gray-200 mb-8">
          <div className="max-w-[1800px] mx-auto px-4 pt-4 pb-4">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-0">
              {/* Нозология слева на десктопе; на мобайле идёт второй */}
              <div className="flex-1 flex justify-start order-3 w-full lg:w-auto lg:order-1 lg:justify-start">
                <div className="flex flex-col gap-1 w-full lg:w-auto">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f] hidden lg:block">Нозология</span>
                  <select
                    value={selectedNosology}
                    onChange={(e) => setSelectedNosology(e.target.value)}
                    className="rounded-full border border-[#d3cec4] bg-white px-4 text-center h-12 min-h-[48px] lg:h-10 text-base text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52] w-full lg:w-[230px]"
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

              {/* Заголовок — по центру */}
              <div className="flex-shrink-0 text-center order-2 lg:order-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {escGuideline.title}
                </h1>
              </div>

              {/* Специальность справа на десктопе; на мобайле идёт первой */}
              <div className="flex-1 flex justify-end order-1 w-full lg:w-auto lg:order-3 lg:justify-end">
                <div className="flex flex-col items-start lg:items-end gap-1 w-full lg:w-auto">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f] hidden lg:block">Специальность</span>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="rounded-full border border-[#d3cec4] bg-white px-4 text-center h-12 min-h-[48px] lg:h-10 text-base text-[#3b342d] shadow-sm focus:outline-none focus:border-[#015d52] w-full lg:w-[230px]"
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
                    selectedTab === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Калькуляторы риска — фикс‑блок под чипами на десктопе, на мобайле ниже */}
            <div className="hidden lg:block lg:sticky lg:top-24 z-10 mb-6">
              <div className="grid grid-cols-3 gap-4">
                <a
                  href="/calculators/grace"
                  className="border border-blue-200 rounded-xl px-4 py-3 text-sm flex flex-col justify-between hover:bg-blue-50 transition"
                >
                  <span className="font-semibold text-gray-900 mb-1">GRACE / TIMI‑like EU</span>
                  <span className="text-gray-600">
                    Европейская и американская модификация оценки риска госпитальной и 6‑месячной
                    смертности в одном калькуляторе.
                  </span>
                </a>
                <a
                  href="/calculators/heart"
                  className="border border-green-200 rounded-xl px-4 py-3 text-sm flex flex-col justify-between hover:bg-green-50 transition"
                >
                  <span className="font-semibold text-gray-900 mb-1">HEART / ED risk</span>
                  <span className="text-gray-600">
                    Быстрая оценка краткосрочного риска MACE в приёмном отделении, включающая европейский HEART и
                    международный EDACS.
                  </span>
                </a>
                <a
                  href="/calculators/timi-acs"
                  className="border border-purple-200 rounded-xl px-4 py-3 text-sm flex flex-col justify-between hover:bg-purple-50 transition"
                >
                  <span className="font-semibold text-gray-900 mb-1">TIMI для NSTE‑ACS / US</span>
                  <span className="text-gray-600">
                    Стратификация риска осложнений и отдалённого прогноза у пациентов с NSTE‑ACS (ESC + ACC/AHA подходы).
                  </span>
                </a>
              </div>
            </div>

            {/* Карточка гайда */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
              {/* ДИАГНОСТИКА */}
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
                          ОКС — острое клиническое проявление ишемической болезни сердца, вызванное несоответствием между
                          коронарным кровотоком и потребностью миокарда в кислороде. Основные механизмы: разрыв/эрозия бляшки с
                          тромбозом, динамический спазм, микроциркуляторная дисфункция.
                        </p>
                        <p className="text-gray-700">
                          Ключевая классификация: STEMI (персистирующая подъём ST/новая БЛНПГ) и NSTE‑ACS (NSTEMI/нестабильная
                          стенокардия). Стратегия определяется ЭКГ, тропонином и риском по шкалам (GRACE/HEART).
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
                                <td className="p-2">Персистирующая ST‑элевация/новая БЛНПГ + клиника ишемии</td>
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
                                <td className="p-2">Риск‑стратификация, антиангинальная/антитромботическая терапия</td>
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
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900">{step.step}</h3>
                            </div>
                            <div className="flex flex-col md:flex-row gap-3 md:items-center">
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
                        <h4 className="text-lg font-semibold text-red-800 mb-2">STEMI критерии</h4>
                        <div className="text-xs text-gray-600 mb-4">Класс/Уровень ниже заголовка</div>
                        {escGuideline.diagnosis.ecgCriteria.stemi.map((criteria, idx) => (
                          <div key={idx} className="mb-6 last:mb-0">
                            <RecommendationBadge
                              rec={{
                                class: criteria.class,
                                level: criteria.level,
                                evidenceText: criteria.evidenceText,
                              }}
                            />
                            <h5 className="mt-2 font-semibold text-gray-900">{criteria.criteria}</h5>
                            <ul className="text-sm text-gray-700 space-y-1 mt-1">
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
                        <h4 className="text-lg font-semibold text-orange-800 mb-2">NSTEMI критерии</h4>
                        <div className="text-xs text-gray-600 mb-4">Класс/Уровень ниже заголовка</div>
                        {escGuideline.diagnosis.ecgCriteria.nstemi.map((criteria, idx) => (
                          <div key={idx} className="mb-6 last:mb-0">
                            <RecommendationBadge
                              rec={{ class: criteria.class, level: criteria.level, evidenceText: criteria.evidenceText }}
                            />
                            <h5 className="mt-2 font-semibold text-gray-900">{criteria.criteria}</h5>
                            <ul className="text-sm text-gray-700 space-y-1 mt-1">
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
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
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

                  {/* MINOCA */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">МИНОКА (MINOCA)</h3>
                    <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                      <p className="text-gray-800 mb-3">{escGuideline.diagnosis.minoca.definition}</p>
                      <p className="text-sm font-medium text-gray-700 mb-2">Диагностика:</p>
                      <ul className="text-sm text-gray-700 space-y-1 mb-4">
                        {escGuideline.diagnosis.minoca.dx.map((d, i) => (
                          <li key={i}>• {d}</li>
                        ))}
                      </ul>

                      {escGuideline.diagnosis.minoca.management.map((m, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-4 border border-amber-100 mb-3">
                          <h4 className="font-semibold text-gray-900 mb-2">{m.scenario}</h4>
                          <div className="space-y-3">
                            {m.therapy.map((t, i) => (
                              <div key={i} className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                                <div>
                                  <p className="text-sm text-gray-800">
                                    <span className="font-medium">{t.drug}:</span> {t.dose}
                                  </p>
                                  {t.note && (
                                    <p className="text-xs text-gray-600 mt-1">{t.note}</p>
                                  )}
                                </div>
                                <RecommendationBadge rec={{ class: t.class, level: t.level, evidenceText: t.evidenceText }} />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
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
                          <div className="flex flex-col gap-2 mb-4">
                            <h3 className="text-xl font-semibold text-gray-900">{measure.measure}</h3>
                            <RecommendationBadge
                              rec={{ class: measure.class, level: measure.level, evidenceText: measure.evidenceText }}
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
                                {measure.contraindications.map((contra: string, i: number) => (
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
                        <div className="flex flex-col gap-2 mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">Аспирин</h3>
                            <p className="text-gray-600">
                              Нагрузка: {escGuideline.treatment.antiplateletTherapy[0].loading} • Поддержка:
                              {' '}
                              {escGuideline.treatment.antiplateletTherapy[0].maintenance}
                            </p>
                          </div>
                          <RecommendationBadge
                            rec={{
                              class: escGuideline.treatment.antiplateletTherapy[0].class!,
                              level: escGuideline.treatment.antiplateletTherapy[0].level!,
                              evidenceText: escGuideline.treatment.antiplateletTherapy[0].evidenceText,
                            }}
                          />
                        </div>
                        <p className="text-gray-700">{escGuideline.treatment.antiplateletTherapy[0].notes}</p>
                      </div>

                      {/* P2Y12 ингибиторы */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">P2Y12 ингибиторы — выбор препарата</h3>
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                          {(escGuideline.treatment.antiplateletTherapy[1] as any)?.options?.map(
                            (drug: any, idx: number) => (
                              <div key={idx} className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-sm">
                                <div className="flex flex-col gap-2 mb-4">
                                  <h4 className="text-lg font-semibold text-gray-900">{drug.name}</h4>
                                  <RecommendationBadge
                                    rec={{ class: drug.class, level: drug.level, evidenceText: drug.evidenceText }}
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
                                        {drug.advantages.map((adv: string, i: number) => (
                                          <li key={i}>• {adv}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {drug.disadvantages && (
                                    <div>
                                      <p className="font-medium text-sm mb-1">Недостатки:</p>
                                      <ul className="text-sm text-gray-700 space-y-1">
                                        {drug.disadvantages.map((dis: string, i: number) => (
                                          <li key={i}>• {dis}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Антикоагулянтная терапия */}
                  <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Антикоагулянтная терапия</h2>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {escGuideline.treatment.anticoagulation.map((ac: any, idx: number) => {
                        const isLongTitle = ac.drug === 'Нефракционированный гепарин';
                        return (
                          <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200">
                            <div
                              className={`flex ${
                                isLongTitle
                                  ? 'flex-col'
                                  : 'flex-col'
                              } gap-2 mb-3`}
                            >
                              <h4 className="text-lg font-semibold text-gray-900">{ac.drug}</h4>
                              <RecommendationBadge rec={{ class: ac.class, level: ac.level, evidenceText: ac.evidenceText }} />
                            </div>
                            <p className="text-sm text-gray-700 mb-1">
                              <strong>Показания:</strong> {ac.indication}
                            </p>
                            <p className="text-sm text-gray-700 mb-1">
                              <strong>Дозировка:</strong> {ac.dose}
                            </p>
                            {ac.notes && (
                              <p className="text-sm text-gray-700">
                                <strong>Особенности:</strong> {ac.notes}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* Реперфузия */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">Стратегии реперфузии</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* STEMI */}
                      <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                        <h4 className="text-lg font-semibold text-red-800 mb-2">STEMI</h4>
                        <div className="text-xs text-gray-600 mb-4">Класс/Уровень ниже заголовка</div>
                        {escGuideline.treatment.reperfusion.stemi.map((method: any, idx: number) => (
                          <div key={idx} className="mb-6 last:mb-0">
                            <RecommendationBadge
                              rec={{ class: method.class, level: method.level, evidenceText: method.evidenceText }}
                            />
                            <h5 className="mt-2 font-semibold text-gray-900">{method.method}</h5>
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
                                  {method.contraindications.map((contra: string, i: number) => (
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
                        <h4 className="text-lg font-semibold text-orange-800 mb-2">NSTEMI</h4>
                        <div className="text-xs text-gray-600 mb-4">Класс/Уровень ниже заголовка</div>
                        {escGuideline.treatment.reperfusion.nstemi.map((strategy: any, idx: number) => (
                          <div key={idx} className="mb-6 last:mb-0">
                            <RecommendationBadge
                              rec={{ class: strategy.class, level: strategy.level, evidenceText: strategy.evidenceText }}
                            />
                            <h5 className="mt-2 font-semibold text-gray-900">{strategy.strategy}</h5>
                            <ul className="text-sm text-gray-700 space-y-1">
                              {strategy.indications.map((indication: string, i: number) => (
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
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {escGuideline.treatment.adjunctiveTherapy.map((therapy: any, idx: number) => {
                        const isLongTitle = therapy.drug === 'Антагонисты минералокортикоидных рецепторов';
                        return (
                          <div key={idx} className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                            <div className={`flex ${isLongTitle ? 'flex-col' : 'flex-col'} gap-2 mb-4`}>
                              <h4 className="text-lg font-semibold text-gray-900">{therapy.drug}</h4>
                              <RecommendationBadge rec={{ class: therapy.class, level: therapy.level, evidenceText: therapy.evidenceText }} />
                            </div>
                            <p className="text-gray-700 mb-2">
                              <strong>Показания:</strong> {therapy.indication}
                            </p>
                            <p className="text-gray-700 mb-2">
                              <strong>Тайминг:</strong> {therapy.timing}
                            </p>
                            {therapy.options && (
                              <div className="mt-2">
                                <p className="font-medium text-sm mb-1">Препараты:</p>
                                <ul className="text-sm text-gray-700 space-y-1">
                                  {therapy.options.map((opt: string, i: number) => (
                                    <li key={i}>• {opt}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {therapy.contraindications && (
                              <div className="mt-2">
                                <p className="font-medium text-sm mb-1">Противопоказания:</p>
                                <ul className="text-sm text-gray-700 space-y-1">
                                  {therapy.contraindications.map((contra: string, i: number) => (
                                    <li key={i}>• {contra}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* Частые ошибки */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Частые ошибки и подводные камни</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Блок ориентирован на врачей, работающих в ОИТ, приёмных отделениях и инвазивных лабораториях. Может
                      использоваться как чек‑лист перед выпиской пациента.
                    </p>
                    <div className="space-y-4">
                      {escGuideline.treatment.commonPitfalls.map((p: any, idx: number) => (
                        <div key={idx} className="bg-red-50/70 rounded-xl p-4 border border-red-200">
                          <div className="flex items-start gap-2 mb-2">
                            <AlertTriangle className="text-red-500 mt-0.5" size={18} />
                            <h4 className="font-semibold text-gray-900">{p.title}</h4>
                          </div>
                          <ul className="text-sm text-gray-700 space-y-1 pl-6 list-disc">
                            {p.items.map((item: string, i: number) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* ОСЛОЖНЕНИЯ */}
              {selectedTab === 'complications' && (
                <div className="space-y-10">
                  <h2 className="text-3xl font-bold text-gray-900">Осложнения</h2>

                  {/* No‑reflow / микроциркуляторная дисфункция */}
                  <section className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No‑reflow (микроциркуляторная дисфункция)</h3>
                      <RecommendationBadge rec={{ class: 'IIa', level: 'B', evidenceText: 'Фармакологическая поддержка при персистирующей no‑reflow' }} />
                      <p className="text-sm text-gray-700 mb-2 font-medium">Диагностика:</p>
                      <ul className="text-sm text-gray-700 space-y-1 mb-3">
                        <li>• TIMI {'<'} 3, низкий миокардиальный blush grade, персистирующая ишемия после стентирования</li>
                      </ul>
                      <p className="text-sm text-gray-700 mb-2 font-medium">Алгоритм лечения:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Интракоронарно: аденозин 60–120 мкг болюс; нитропруссид 50–200 мкг; верапамил 100–200 мкг</li>
                        <li>• Ингибиторы GP IIb/IIIa: эптифибатид болюс 180 мкг/кг ×2 с интервалом 10 мин, затем 2.0 мкг/кг/мин 12–18 ч</li>
                        <li>• Оптимизация: адекватная антикоагуляция, избегать высокой давления инъекции контраста</li>
                      </ul>
                    </div>
                  </section>

                  {/* Контраст‑индуцированное повреждение почек (CIN) */}
                  <section className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Контраст‑индуцированное поражение почек</h3>
                      <RecommendationBadge rec={{ class: 'IIa', level: 'B', evidenceText: 'Профилактика у пациентов с ХБП/высоким риском' }} />
                      <p className="text-sm text-gray-700 mb-2 font-medium">Диагностика:</p>
                      <ul className="text-sm text-gray-700 space-y-1 mb-3">
                        <li>• Рост креатинина ≥25% или ≥0.5 мг/дл в течение 48–72 ч после контраста</li>
                      </ul>
                      <p className="text-sm text-gray-700 mb-2 font-medium">Алгоритм профилактики/ведения:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Гидратация: 0.9% NaCl 1–1.5 мл/кг/ч за 3–12 ч до и 6–12 ч после (индивидуализация при СН)</li>
                        <li>• Минимизировать объём и осмолярность контраста; избегать повторного контраста в первые 48–72 ч</li>
                        <li>• Рассмотреть высокоинтенсивный статин до ЧКВ (аторвастатин 80 мг) — снижение риска CIN</li>
                        <li>• Метформин: см. «Сопутствующие патологии» — временная отмена при сниженной СКФ и введении контраста</li>
                      </ul>
                    </div>
                  </section>

                  {/* Кардиогенный шок */}
                  <section className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Кардиогенный шок</h3>
                      <RecommendationBadge rec={{ class: 'I', level: 'A', evidenceText: 'Немедленное ЧКВ culprit‑only; норэпинефрин — прессор 1‑й линии' }} />
                      <p className="text-sm text-gray-700 mb-2 font-medium">Диагностика:</p>
                      <ul className="text-sm text-gray-700 space-y-1 mb-3">
                        <li>• Систолическое АД {'<'} 90 мм рт.ст. {'>'}30 мин или необходимость вазопрессоров</li>
                        <li>• Признаки гипоперфузии (олигурия, лактоацидоз, холодные кожные покровы)</li>
                      </ul>
                      <p className="text-sm text-gray-700 mb-2 font-medium">Алгоритм:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Немедленное ЧКВ «culprit‑only»; оценка на МПК (Impella/ECMO) при рефрактерности</li>
                        <li>• Норэпинефрин 0.05–1.0 мкг/кг/мин — титровать к MAP 65–70 мм рт.ст.</li>
                        <li>• Добутамин 2.5–20 мкг/кг/мин при низком сердечном выбросе</li>
                        <li>• Избегать рутинной ИАБП при отсутствии механических осложнений</li>
                      </ul>
                    </div>
                  </section>

                  {/* Аритмии (ЖТ/ФЖ) */}
                  <section className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">ЖТ/ФЖ</h3>
                      <RecommendationBadge rec={{ class: 'I', level: 'A', evidenceText: 'Дефибрилляция — первично; амниодарон/лидокаин — адъювант' }} />
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Дефибрилляция по алгоритму ACLS</li>
                        <li>• Амиодарон 300 мг в/в болюс, затем 150 мг при рецидиве; инфузия 1 мг/мин 6 ч, затем 0.5 мг/мин</li>
                        <li>• Лидокаин 1–1.5 мг/кг в/в, повтор 0.5–0.75 мг/кг до макс 3 мг/кг</li>
                        <li>• MgSO4 2 г в/в при torsades de pointes</li>
                      </ul>
                    </div>
                  </section>

                  {/* Кровотечения на антитромботической терапии */}
                  <section className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Кровотечение на антитромботической терапии</h3>
                      <RecommendationBadge rec={{ class: 'IIa', level: 'C', evidenceText: 'Коррекция схемы в зависимости от тяжести (BARC)' }} />
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Лёгкое: локальные меры, пересмотр доз/ИПП, наблюдение</li>
                        <li>• Умеренное/тяжёлое: временная отмена P2Y12, приоритет аспирина; реверсия антикоагулянта по показаниям</li>
                        <li>• Жизнеугрожающее: протамин при НФГ/НМГ; PCC/идарусизумаб/андексанет — по типу антикоагулянта</li>
                      </ul>
                    </div>
                  </section>

                  {/* Сопутствующие патологии (только то, что меняет терапию) */}
                  <section className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Сопутствующие патологии (влияющие на выбор/дозы)</h3>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>
                          <span className="font-medium">СД/Метформин:</span> временно отменить при планируемом или проведённом контрастировании у пациентов со сниженной СКФ
                          (например, eGFR < 30 мл/мин/1.73м²) и/или при риске CIN; возобновить после оценки функции почек через 48–72 ч.
                        </li>
                        <li>
                          <span className="font-medium">ХБП:</span> коррекция доз антикоагулянтов (эноксапарин 1 мг/кг 1 раз/сут при КК < 30), избегать нефротоксинов, мониторинг калия при МРА.
                        </li>
                        <li>
                          <span className="font-medium">ФП при ОКС:</span> при ЧКВ рассмотреть тройную терапию кратко (≤1 нед), далее ОАК + P2Y12 (клопидогрел) до 6–12 мес; избегать
                          длительной тройной схемы при HBR.
                        </li>
                        <li>
                          <span className="font-medium">ХОБЛ/астма:</span> при необходимости β‑блокатора — кардиоселективные (бисопролол/метопролол), избегать неселективных.
                        </li>
                      </ul>
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
                      {escGuideline.secondaryPrevention.medications.map((med: any, idx: number) => (
                        <div key={idx} className="bg-white rounded-lg p-4 border border-blue-100">
                          <div className="flex flex-col gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{med.drug}</h4>
                            <RecommendationBadge rec={{ class: med.class, level: med.level, evidenceText: med.evidenceText }} />
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
                              {med.deescalation.map((item: string, i: number) => (
                                <li key={i}>• {item}</li>
                              ))}
                            </ul>
                          )}
                          {med.escalation && (
                            <ul className="text-sm text-gray-700 space-y-1 mt-2">
                              {med.escalation.map((item: string, i: number) => (
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
                      {escGuideline.secondaryPrevention.lifestyle.map((item: any, idx: number) => (
                        <div key={idx} className="bg-white rounded-lg p-4 border border-green-100">
                          <div className="flex flex-col gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{item.area}</h4>
                            <RecommendationBadge rec={{ class: item.class, level: item.level, evidenceText: item.evidenceText }} />
                          </div>
                          <p className="text-sm text-gray-700 mb-1">
                            Рекомендация: <span className="font-medium">{item.recommendation}</span>
                          </p>
                          {item.components && (
                            <ul className="text-sm text-gray-700 space-y-1 mt-2">
                              {item.components.map((c: string, i: number) => (
                                <li key={i}>• {c}</li>
                              ))}
                            </ul>
                          )}
                          {item.interventions && (
                            <ul className="text-sm text-gray-700 space-y-1 mt-2">
                              {item.interventions.map((c: string, i: number) => (
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
                      {escGuideline.comparison.keyDifferences.map((diff: any, idx: number) => (
                        <div key={idx} className="bg-white rounded-lg p-4 border border-green-100 shadow-sm">
                          <div className="flex flex-col gap-2 mb-3">
                            <h4 className="font-semibold text-gray-900">{diff.aspect}</h4>
                            <RecommendationBadge rec={{ class: diff.class, level: diff.level, evidenceText: diff.evidenceText }} />
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-medium text-gray-700 mb-1">🇪🇺 ESC 2023–2024 / Europe</p>
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
                Данное руководство представляет собой обзор и интерпретацию клинических рекомендаций для медицинских
                специалистов. Информация носит исключительно образовательный характер и не заменяет профессиональное
                медицинское заключение. При принятии клинических решений всегда следуйте официальным руководствам и локальным
                протоколам вашего учреждения. Авторы не несут ответственности за использование представленной информации в
                клинической практике.
              </p>

              {/* большой визуальный отступ перед почтой */}
              <div className="h-[150px]" aria-hidden="true" />

              <p className="text-lg font-medium text-gray-900">support@medradix.info</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
