// app/guides/acs/page.tsx — ОКС («код-окс») — расширены MINOCA и ОСЛОЖНЕНИЯ, остальное без изменений

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
  class: RecommendationClass;
  level: EvidenceLevel;
  evidenceText: string;
}

const SPECIALTIES: string[] = [
  'Все','Акушерство и гинекология','Аллергология и иммунология','Анестезиология и реаниматология',
  'Гастроэнтерология','Гематология','Дерматология','Инфекционные болезни','Кардиология','Неврология',
  'Нефрология','Онкология','Офтальмология','Педиатрия','Пульмонология','Психиатрия','Ревматология',
  'Стоматология','Терапия','Травматология и ортопедия','Урология','Хирургия','Эндокринология',
];

interface Nosology { id: string; label: string; group: string; }

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
    (acc[item.group] ||= []).push(item);
    return acc;
  }, {});

  // === GUIDELINE DATA (базовый контент сохранён; добавлены расширенные MINOCA и ОСЛОЖНЕНИЯ)
  const escGuideline = {
    title: 'Острый коронарный синдром',
    version: 'ESC 2023–2024',
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
          timing: '0–10 мин',
          class: 'I' as RecommendationClass,
          level: 'C' as EvidenceLevel,
          evidenceText: 'Класс I; уровень C — консенсус/малые исследования',
        },
        {
          step: 'Клиническая оценка',
          actions: [
            'Характер боли: давящая, за грудиной',
            'Иррадиация: левая рука/челюсть/спина',
            'Сопутствующие симптомы: одышка, тошнота, потливость',
            'Длительность >20 минут',
          ],
          timing: '10–20 мин',
          class: 'I' as RecommendationClass,
          level: 'C' as EvidenceLevel,
          evidenceText: 'Класс I; уровень C',
        },
      ],

      ecgCriteria: {
        stemi: [
          {
            criteria: 'ST-элевация в ≥2 смежных отведениях',
            details: [
              'Все отведения кроме V2–V3: ≥1 мм',
              'V2–V3: мужчины <40 лет ≥2.5 мм; ≥40 лет ≥2.0 мм',
              'V2–V3: женщины ≥1.5 мм',
            ],
            examples: ['Передний: V1–V4', 'Нижний: II, III, aVF', 'Боковой: I, aVL, V5–V6', 'Задний: V7–V9'],
            class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel,
            evidenceText: 'Класс I; уровень B',
          },
          {
            criteria: 'Новая БЛНПГ при клинике ишемии',
            details: ['QRS ≥120 мс', 'Согласованность с клиникой'],
            class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel,
            evidenceText: 'Класс I; уровень B',
          },
        ],
        nstemi: [
          {
            criteria: 'Горизонтальная/косонисходящая ST-депрессия ≥0.5 мм (≥2 отведения)',
            details: ['± инверсия T ≥1 мм'],
            class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel,
            evidenceText: 'Класс I; уровень B',
          },
          {
            criteria: 'Преходящая ST-элевация <20 мин',
            details: ['Спонтанное разрешение'],
            class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel,
            evidenceText: 'Класс I; уровень B',
          },
        ],
      },

      biomarkers: {
        highSensitivityTroponin: {
          protocol: '0/1 ч или 0/2 ч',
          cutoff: '99-й перцентиль URL',
          dynamics: 'Изменение ≥20% за 3–6 ч',
          interpretation: [
            '0 ч <URL и 1 ч <URL → низкий риск',
            '0 ч <URL и 1 ч >URL → промежуточный',
            '0 ч >URL и Δ ≥20% → высокий риск',
            '0 ч >URL и Δ <20% → повтор через 3–6 ч',
          ],
          class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel,
          evidenceText: 'Класс I; уровень A',
        },
        additionalMarkers: [
          'КФК-МВ: менее специфичен',
          'Миоглобин: ранний, низкая специфичность',
          'BNP/NT-proBNP: прогностическая ценность',
        ],
      },

      riskStratification: {
        grace: {
          parameters: ['Возраст','ЧСС','САД','Креатинин','СН','ЭКГ-изменения','Ферменты'],
          scores: ['Низкий: <109','Средний: 109–140','Высокий: >140'],
          class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I; уровень B',
        },
        hematics: {
          parameters: ['Возраст','Тропонин','ЭКГ','Факторы риска','Повтор боли'],
          scores: ['Очень низкий: 0–2','Низкий: 3–5','Высокий: ≥6'],
          class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel,
          evidenceText: 'Класс I; уровень B',
        },
      },

      differentialDiagnosis: [
        { condition: 'Перикардит', features: ['Боль меняется с положением тела','Шум трения','Диффузная ST-элевация','Нет реципрокных изменений'] },
        { condition: 'ТЭЛА', features: ['Одышка','Гипоксия','Правые перегрузки на ЭКГ','Высокий D-димер'] },
        { condition: 'Расслоение аорты', features: ['Мигрирующая боль','Асимметрия АД','Расширение средостения','Неврологические симптомы'] },
      ],

      // ===== РАСШИРЕНО: MINOCA =====
      minoca: {
        definition: 'ИМ при не-обструктивных коронарных артериях (≤50% стеноз) при наличии клинико-биохимических критериев ИМ.',
        diagnostics: {
          steps: [
            'Коронарография: подтверждение ≤50% стеноза без окклюзии.',
            'Исключить альтернативы: миокардит/ТАКО-цубо (МРТ с ЛГД), ТЭЛА, расслаивание аорты.',
            'МРТ сердца: ишемический паттерн (субэндокард/трансмурально) vs неишемический (мидмиокард/эпикард).',
            'Провокационные тесты на спазм (ацетилхолин/эргоновин) в кат-лаборатории опытной командой.',
            'Оценка микрососудистой дисфункции (CFR/IMR) при отсутствии эпикардиального спазма.',
            'Исключить SCAD (диссекция): внимательная ангиографическая оценка, при сомнении — ОКТ/IVUS.',
          ],
          class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel,
          evidenceText: 'Диагностический алгоритм повышает точность фенотипирования MINOCA.',
        },
        mechanisms: [
          {
            name: 'Разрыв/эрозия бляшки с микро-атеротромбозом',
            therapy: [
              { drug: 'Аспирин', dose: '75–100 мг/сут длительно', note: 'Антитромботическая профилактика', class: 'IIa' as RecommendationClass, level: 'C' as EvidenceLevel, evidenceText: 'Рассмотреть при подозрении на тромбоз микроциркуляции' },
              { drug: 'P2Y12 ингибитор', dose: 'клопидогрел 75 мг/сут 1–3 мес по риску', note: 'Персонализировано', class: 'IIb' as RecommendationClass, level: 'C' as EvidenceLevel, evidenceText: 'Малые данные; индивидуализация' },
              { drug: 'Статин высокой интенсивности', dose: 'аторвастатин 40–80 мг/сут или розувастатин 20–40 мг/сут', note: 'Стабилизация бляшки', class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel, evidenceText: 'Прогностическая польза' },
              { drug: 'ИАПФ/БРА', dose: 'по стандартам ОКС', note: 'Ремоделирование/прогноз', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel, evidenceText: 'Польза у пост-ИМ' },
              { drug: 'Бета-блокатор', dose: 'по ЧСС/АД', note: 'Анти-ишемический и антиаритмический эффект', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel, evidenceText: 'Подгруппы' },
            ],
          },
          {
            name: 'Вазоспазм эпикардиальных артерий',
            therapy: [
              { drug: 'БКК', dose: 'дилтиазем 120–360 мг/сут; верапамил 240–360 мг/сут; амлодипин 5–10 мг/сут', note: 'Терапия первой линии', class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel, evidenceText: 'Сильная рекомендация при вазоспастической стенокардии' },
              { drug: 'Нитраты длительного действия', dose: 'изосорбида мононитрат 20–60 мг/сут', note: 'Снижение частоты эпизодов', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel, evidenceText: 'Поддерживающая терапия' },
              { drug: 'Избегать β-блокаторов без БКК при вазоспазме', dose: '-', note: 'Риск усугубления спазма', class: 'III' as RecommendationClass, level: 'C' as EvidenceLevel, evidenceText: 'Нежелательно' },
            ],
          },
          {
            name: 'Микрососудистая дисфункция',
            therapy: [
              { drug: 'БКК или бета-блокатор', dose: 'индивидуально', note: 'Симптом-контроль', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel, evidenceText: 'Снижение ишемии' },
              { drug: 'Ивабрадин', dose: '5–7.5 мг 2 р/сут при ЧСС ≥70, синус.ритм', note: 'Если ББ не переносятся', class: 'IIb' as RecommendationClass, level: 'B' as EvidenceLevel, evidenceText: 'Контроль ЧСС' },
              { drug: 'Аспирин ± статин', dose: 'по стандартам риска', note: 'Антитромботическая/липидная профилактика', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel, evidenceText: 'Прогностическая направленность' },
            ],
          },
          {
            name: 'SCAD (спонтанная диссекция коронарной артерии)',
            therapy: [
              { drug: 'Консервативное ведение', dose: '—', note: 'При стабильной гемодинамике и TIMI ≥2', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel, evidenceText: 'Спонтанное заживление часто' },
              { drug: 'Аспирин', dose: '75–100 мг/сут', note: 'Стандартно', class: 'IIa' as RecommendationClass, level: 'C' as EvidenceLevel, evidenceText: 'Экспертный консенсус' },
              { drug: 'Бета-блокатор', dose: 'по ЧСС/АД', note: 'Снижение рецидивов', class: 'IIa' as RecommendationClass, level: 'B' as EvidenceLevel, evidenceText: 'Наблюдательные данные' },
              { drug: 'Избегать рутинного стентирования', dose: '-', note: 'Высокий риск расширения диссекции', class: 'III' as RecommendationClass, level: 'B' as EvidenceLevel, evidenceText: 'Нежелательно без показаний' },
            ],
          },
        ],
      },
    },

    // ===== ЛЕЧЕНИЕ (как было; не изменено содержимое) =====
    treatment: {
      generalMeasures: [
        { measure: 'Кислородотерапия', indication: 'SatO2 <90% или дыхательная недостаточность', dose: '2–4 л/мин через канюли', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel, evidenceText: 'Класс I; C' },
        { measure: 'Обезболивание', indication: 'Боль умеренной/сильной интенсивности', dose: 'Морфин 2–4 мг в/в + титрация; альтернатива фентанил 25–50 мкг', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel, evidenceText: 'Класс I; C' },
        { measure: 'Нитроглицерин', indication: 'Персистирующая боль, СН, гипертензия', dose: '0.3–0.6 мг SL или 5–10 мкг/мин в/в', class: 'I' as RecommendationClass, level: 'C' as EvidenceLevel, evidenceText: 'Класс I; C' },
      ],

      antiplateletTherapy: [
        {
          drug: 'Аспирин',
          loading: '150–300 мг разжевать',
          maintenance: '75–100 мг/сут',
          class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel, evidenceText: 'Класс I; A',
          notes: 'Начать немедленно при подозрении на ОКС',
        },
        {
          drug: 'P2Y12 ингибиторы — выбор',
          options: [
            { name: 'Тикагрелор', loading: '180 мг', maintenance: '90 мг 2 р/сут', duration: '12 мес', advantages: ['Быстрое начало','Обратимое связывание'], disadvantages: ['Одышка','Кровотечения'], class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel, evidenceText: 'Класс I; A' },
            { name: 'Прасугрел', loading: '60 мг', maintenance: '10 мг/сут (5 мг <60 кг)', duration: '12 мес', advantages: ['Мощный эффект'], disadvantages: ['Противопоказан после инсульта/ТИА'], class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel, evidenceText: 'Класс I; B' },
            { name: 'Клопидогрел', loading: '600 мг', maintenance: '75 мг/сут', duration: '12 мес', advantages: ['Хорошая переносимость'], disadvantages: ['Вариабельный ответ'], class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel, evidenceText: 'Класс I; B' },
          ],
        },
      ],

      anticoagulation: [
        { drug: 'Фондапаринукс', dose: '2.5 мг п/к 1 р/сут', indication: 'Предпочтителен при NSTE-ACS (без немедленного ЧКВ)', notes: 'При ЧКВ дать болюс НФГ', class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel, evidenceText: 'Класс I; A' },
        { drug: 'Эноксапарин', dose: '1 мг/кг п/к каждые 12 ч (КК <30 — 1 мг/кг 1 р/сут)', indication: 'Альтернатива фондапаринуксу', notes: 'Коррекция при ХБП', class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel, evidenceText: 'Класс I; A' },
        { drug: 'НФГ', dose: '60–70 Ед/кг болюс (макс 5000), затем 12–15 Ед/кг/ч по АЧТВ', indication: 'STEMI/NSTE-ACS при ЧКВ, тяжёлая ХБП', notes: 'Контроль АЧТВ; риск ГИТ', class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel, evidenceText: 'Класс I; B' },
      ],

      reperfusion: {
        stemi: [
          { method: 'Первичное ЧКВ', timing: 'FMC-to-device ≤120 мин, door-to-balloon ≤90', indications: ['Всем STEMI при доступности'], results: ['↓ смертности','↓ размера ИМ'], class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel, evidenceText: 'Класс I; A' },
          { method: 'Фибринолиз', timing: 'Если задержка ЧКВ >120 мин', indications: ['Раннее поступление','Молодой возраст'], contraindications: ['Абсолютные/относительные'], drugs: ['Тенектеплаза вес-зависимо','Альтеплаза болюс+инфузия'], class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel, evidenceText: 'Класс I; A' },
        ],
        nstemi: [
          { strategy: 'Ранняя инвазивная <24 ч', indications: ['Шок/нестабильность','Рефрактерная ишемия','GRACE >140'], class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel, evidenceText: 'Класс I; A' },
          { strategy: 'Отсроченная 25–72 ч', indications: ['Диабет','ХБП','Снижение ФВ ЛЖ'], class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel, evidenceText: 'Класс I; A' },
        ],
      },

      adjunctiveTherapy: [
        { drug: 'Бета-блокаторы', indication: 'Тахикардия/АГ при стабильности', options: ['Метопролол 25–50 мг 2 р/сут','Бисопролол 2.5–10 мг/сут'], timing: 'В первые 24 ч', class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel, evidenceText: 'Класс I; A' },
        { drug: 'Статины высокой интенсивности', indication: 'Всем при ОКС', options: ['Аторвастатин 80 мг','Розувастатин 20–40 мг'], timing: 'Немедленно', class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel, evidenceText: 'Класс I; A' },
        { drug: 'ИАПФ/БРА', indication: 'СН, ФВ<40%, диабет, АГ', options: ['Рамиприл 2.5–10 мг','Периндоприл 2–8 мг','Валсартан 80–320 мг'], timing: 'В первые 24 ч', class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel, evidenceText: 'Класс I; A' },
        { drug: 'Антагонисты минералокортикоидных рецепторов', indication: 'ФВ ≤40% + СН/СД', options: ['Эплеренон 25–50 мг','Спиронолактон 25–50 мг'], timing: '3–7 сутки при норм. К+ и креат.', class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel, evidenceText: 'Класс I; B' },
        { drug: 'Ингибиторы SGLT2', indication: 'СН (сниж./умеренно сниж. ФВ) после ОКС', options: ['Дапаглифлозин 10 мг','Эмпаглифлозин 10 мг'], timing: 'После стабилизации', class: 'IIa' as RecommendationClass, level: 'A' as EvidenceLevel, evidenceText: 'Класс IIa; A' },
      ],

      commonPitfalls: [
        { title: 'Задержка реперфузии при STEMI', items: ['Нет контроля таймингов','Направление в не-PCI центр'], severity: 'high' },
        { title: 'Недооценка риска при NSTE-ACS', items: ['Нет GRACE/HEART','Задержка инвазивной тактики'], severity: 'high' },
        { title: 'Ошибки антикоагуляции/ДАТТ', items: ['Дублирование антикоагулянтов','Нет коррекции доз при ХБП'], severity: 'medium' },
        { title: 'Слабая вторичная профилактика', items: ['Нет титрации статина','Нет ИАПФ/БРА/МРА при сниженной ФВ'], severity: 'medium' },
      ],
    },

    secondaryPrevention: {
      duration: 'Пожизненно',
      medications: [
        { drug: 'Двойная антитромбоцитарная терапия', duration: '12 мес после ЧКВ (3–6 мес при HBR)', deescalation: ['PRECISE-DAPT/ARC-HBR'], class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel, evidenceText: 'Класс I; A' },
        { drug: 'Статины', target: 'ЛПНП <1.4 ммоль/л и −≥50%', monitoring: '4–12 нед, далее ежегодно', escalation: ['+ эзетимиб 10 мг','+ ингибитор PCSK9'], class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel, evidenceText: 'Класс I; A' },
      ],
      lifestyle: [
        { area: 'Отказ от курения', recommendation: 'Полный', interventions: ['Консультирование','НЗТ','Варениклин/бупропион'], class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel, evidenceText: 'Класс I; B' },
        { area: 'Диета', recommendation: 'Средиземноморская', components: ['Овощи/фрукты','Рыба ≥2р/нед','Оливковое масло','Соль <5 г/сут'], class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel, evidenceText: 'Класс I; B' },
        { area: 'Физнагрузка', recommendation: '150 мин/нед умеренной или 75 мин интенсивной', class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel, evidenceText: 'Класс I; A' },
      ],
    },

    comparison: {
      title: 'ESC 2023–2024 vs ACC/AHA 2025: практические различия',
      keyDifferences: [
        { aspect: 'Нагрузка аспирином', eu: '150–300 мг', us: '325 мг', significance: 'US — более высокая нагрузка', class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel, evidenceText: 'Класс I; A' },
        { aspect: 'P2Y12 при плановом ЧКВ', eu: 'Прасугрел предпочтителен', us: 'Тикагрелор/прасугрел равноправно', significance: 'ESC конкретнее про прасугрел', class: 'I' as RecommendationClass, level: 'B' as EvidenceLevel, evidenceText: 'Класс I; B' },
        { aspect: 'Сроки инвазивной тактики при NSTEMI', eu: '<24 ч (высокий риск)', us: '12–24 ч (средний/высокий)', significance: 'US — агрессивнее', class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel, evidenceText: 'Класс I; A' },
        { aspect: 'ДАТТ длительность', eu: '12 мес; 3–6 мес при HBR', us: '6–12 мес; возможно продление до 30 мес', significance: 'US — более гибко', class: 'I' as RecommendationClass, level: 'A' as EvidenceLevel, evidenceText: 'Класс I; A' },
      ],
      practicalImplications: [
        'EU — более консервативен в выборе антиагреганта при ЧКВ',
        'US — более агрессивные сроки инвазивной тактики',
        'Сходство во вторичной профилактике',
      ],
    },
  };

  // ===== UI =====
  const RecommendationBadge = ({ rec }: { rec: Recommendation }) => {
    const cls = rec.class, lvl = rec.level;
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
        <p className="text-xs text-gray-600 max-w-xs">{rec.evidenceText}</p>
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

  return (
    <main className="min-h-screen bg-[#fcfcee] py-8">
      <div className="max-w-[1800px] mx-auto px-4">
        {/* Шапка и фильтры */}
        <section className="border-b border-gray-200 mb-8">
          <div className="max-w-[1800px] mx-auto px-4 pt-4 pb-4">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-0">
              {/* Специальность — моб: первая; десктоп: справа (уменьшено, текст по центру) */}
              <div className="flex-1 flex justify-start order-1 w-full lg:w-auto lg:order-3 lg:justify-end">
                <div className="flex flex-col items-start lg:items-end gap-1 w-full lg:w-auto">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f] hidden lg:block">Специальность</span>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="rounded-full border border-[#d3cec4] bg-white px-4 h-12 min-h-[48px] lg:h-10 text-base text-[#3b342d] text-center shadow-sm focus:outline-none focus:border-[#015d52] w-full lg:w-[220px]"
                  >
                    {SPECIALTIES.map((spec) => <option key={spec} value={spec}>{spec}</option>)}
                  </select>
                </div>
              </div>

              {/* Нозология — моб: вторая; десктоп: слева (уменьшено, текст по центру) */}
              <div className="flex-1 flex justify-end order-2 w-full lg:w-auto lg:order-1 lg:justify-start">
                <div className="flex flex-col gap-1 w-full lg:w-auto">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#9c978f] hidden lg:block">Нозология</span>
                  <select
                    value={selectedNosology}
                    onChange={(e) => setSelectedNosology(e.target.value)}
                    className="rounded-full border border-[#d3cec4] bg-white px-4 h-12 min-h-[48px] lg:h-10 text-base text-[#3b342d] text-center shadow-sm focus:outline-none focus:border-[#015d52] w-full lg:w-[220px]"
                  >
                    {Object.entries(groupedCardiologyNosologies).map(([group, items]) => (
                      <optgroup key={group} label={group}>
                        {items.map((n) => <option key={n.id} value={n.label}>{n.label}</option>)}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>

              {/* Заголовок — моб: после фильтров */}
              <div className="flex-shrink-0 text-center order-3 lg:order-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{escGuideline.title}</h1>
              </div>
            </div>

            <div className="text-center mt-6 space-y-3">
              <div className="flex justify-center gap-4 flex-wrap">
                <a href={escGuideline.sources.nsteacs} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"><ExternalLink size={16}/>ESC NSTE-ACS 2023</a>
                <a href={escGuideline.sources.stemi} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"><ExternalLink size={16}/>ESC STEMI 2024</a>
                <a href={escGuideline.sources.us} className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"><ExternalLink size={16}/>ACC/AHA 2025</a>
              </div>
              <p className="text-sm text-gray-600 max-w-2xl mx-auto">Для медспециалистов. Обзор и интерпретация; следуйте локальным протоколам.</p>
            </div>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Левое меню */}
          <aside className="hidden lg:block lg:w-56 flex-shrink-0">
            <div className="sticky top-40">
              <div className="text-sm font-semibold tracking-[0.16em] text-[#9c978f] uppercase mb-3">Разделы гайда</div>
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
                    >{label}</button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Контент */}
          <div className="flex-1 min-w-0">
            {/* Мобильные табы */}
            <div className="flex lg:hidden border-b border-gray-200 mb-6 overflow-x-auto">
              {sections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setSelectedTab(id)}
                  className={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${selectedTab === id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >{label}</button>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
              {/* === ДИАГНОСТИКА === */}
              {selectedTab === 'diagnosis' && (
                <div className="space-y-12">
                  {/* Аккордеон ориентации */}
                  <section>
                    <button onClick={() => setIsIntroOpen(v=>!v)} className="w-full flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                      <span className="text-lg font-semibold text-emerald-900">Краткая ориентация (ОКС)</span>
                      <ChevronDown className={`transition ${isIntroOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isIntroOpen && (
                      <div className="border border-emerald-200 border-t-0 rounded-b-xl p-4 space-y-4">
                        <p className="text-gray-700">ОКС — острое проявление ИБС (разрыв/эрозия бляшки, спазм, микроциркуляция). Классификация: STEMI и NSTE-ACS.</p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead><tr className="bg-emerald-100 text-emerald-900"><th className="p-2 text-left">Тип</th><th className="p-2 text-left">Критерии</th><th className="p-2 text-left">Тактика</th></tr></thead>
                            <tbody>
                              <tr className="border-b"><td className="p-2 font-medium">STEMI</td><td className="p-2">Персист. ST↑/новая БЛНПГ</td><td className="p-2">Немедленная реперфузия</td></tr>
                              <tr className="border-b"><td className="p-2 font-medium">NSTEMI</td><td className="p-2">ST↓/T-инверсия + ↑тропонин</td><td className="p-2">Инвазивная стратегия по риску</td></tr>
                              <tr><td className="p-2 font-medium">Нестаб. стенокардия</td><td className="p-2">Клиника без ↑тропонина</td><td className="p-2">Риск-стратификация, ААТ</td></tr>
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
                      {escGuideline.diagnosis.initialAssessment.map((step, i) => (
                        <div key={i} className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                            <h3 className="text-xl font-semibold text-gray-900">{step.step}</h3>
                            <div className="flex flex-col md:flex-row gap-3 md:items-center">
                              <TimingBadge time={step.timing} />
                              <RecommendationBadge rec={{ class: step.class, level: step.level, evidenceText: step.evidenceText }} />
                            </div>
                          </div>
                          <ul className="space-y-2">{step.actions.map((a, idx) => (
                            <li key={idx} className="flex items-start gap-3"><CheckCircle size={18} className="text-green-500 mt-0.5"/><span className="text-gray-700">{a}</span></li>
                          ))}</ul>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* ЭКГ */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">ЭКГ критерии</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                        <h4 className="text-lg font-semibold text-red-800 mb-4">STEMI</h4>
                        {escGuideline.diagnosis.ecgCriteria.stemi.map((c, idx) => (
                          <div key={idx} className="mb-6 last:mb-0">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                              <h5 className="font-semibold text-gray-900">{c.criteria}</h5>
                              <RecommendationBadge rec={{ class: c.class, level: c.level, evidenceText: c.evidenceText }} />
                            </div>
                            <ul className="text-sm text-gray-700 space-y-1">{c.details.map((d,i)=><li key={i}>• {d}</li>)}</ul>
                            {c.examples && (<div className="mt-2">
                              <p className="font-medium text-sm">Примеры:</p>
                              <ul className="text-sm text-gray-600 space-y-1">{c.examples.map((e,i)=><li key={i}>• {e}</li>)}</ul>
                            </div>)}
                          </div>
                        ))}
                      </div>
                      <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                        <h4 className="text-lg font-semibold text-orange-800 mb-4">NSTEMI</h4>
                        {escGuideline.diagnosis.ecgCriteria.nstemi.map((c, idx) => (
                          <div key={idx} className="mb-6 last:mb-0">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                              <h5 className="font-semibold text-gray-900">{c.criteria}</h5>
                              <RecommendationBadge rec={{ class: c.class, level: c.level, evidenceText: c.evidenceText }} />
                            </div>
                            <ul className="text-sm text-gray-700 space-y-1">{c.details.map((d,i)=><li key={i}>• {d}</li>)}</ul>
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
                        <RecommendationBadge rec={{ class: escGuideline.diagnosis.biomarkers.highSensitivityTroponin.class, level: escGuideline.diagnosis.biomarkers.highSensitivityTroponin.level, evidenceText: escGuideline.diagnosis.biomarkers.highSensitivityTroponin.evidenceText }} />
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="font-medium mb-2">Протокол: {escGuideline.diagnosis.biomarkers.highSensitivityTroponin.protocol}</p>
                          <p className="text-sm text-gray-700 mb-4">Отсечка: {escGuideline.diagnosis.biomarkers.highSensitivityTroponin.cutoff}</p>
                          <p className="text-sm text-gray-700">Динамика: {escGuideline.diagnosis.biomarkers.highSensitivityTroponin.dynamics}</p>
                        </div>
                        <div>
                          <p className="font-medium mb-2">Интерпретация:</p>
                          <ul className="text-sm text-gray-700 space-y-1">{escGuideline.diagnosis.biomarkers.highSensitivityTroponin.interpretation.map((t,i)=><li key={i}>• {t}</li>)}</ul>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">Дополнительные маркеры</h4>
                      <ul className="text-sm text-gray-700 space-y-1">{escGuideline.diagnosis.biomarkers.additionalMarkers.map((m,i)=><li key={i}>• {m}</li>)}</ul>
                    </div>
                  </section>

                  {/* Риск-стратификация */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">Стратификация риска</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                          <h4 className="text-lg font-semibold text-yellow-800">Шкала GRACE</h4>
                          <RecommendationBadge rec={{ class: escGuideline.diagnosis.riskStratification.grace.class, level: escGuideline.diagnosis.riskStratification.grace.level, evidenceText: escGuideline.diagnosis.riskStratification.grace.evidenceText }} />
                        </div>
                        <p className="font-medium mb-2">Параметры:</p>
                        <ul className="text-sm text-gray-700 space-y-1 mb-4">{escGuideline.diagnosis.riskStratification.grace.parameters.map((p,i)=><li key={i}>• {p}</li>)}</ul>
                        <p className="font-medium mb-2">Уровни риска:</p>
                        <ul className="text-sm text-gray-700 space-y-1">{escGuideline.diagnosis.riskStratification.grace.scores.map((s,i)=><li key={i}>• {s}</li>)}</ul>
                      </div>
                      <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                          <h4 className="text-lg font-semibold text-green-800">Шкала HEART</h4>
                          <RecommendationBadge rec={{ class: escGuideline.diagnosis.riskStratification.hematics.class, level: escGuideline.diagnosis.riskStratification.hematics.level, evidenceText: escGuideline.diagnosis.riskStratification.hematics.evidenceText }} />
                        </div>
                        <p className="font-medium mb-2">Параметры:</p>
                        <ul className="text-sm text-gray-700 space-y-1 mb-4">{escGuideline.diagnosis.riskStratification.hematics.parameters.map((p,i)=><li key={i}>• {p}</li>)}</ul>
                        <p className="font-medium mb-2">Уровни риска:</p>
                        <ul className="text-sm text-gray-700 space-y-1">{escGuideline.diagnosis.riskStratification.hematics.scores.map((s,i)=><li key={i}>• {s}</li>)}</ul>
                      </div>
                    </div>
                  </section>

                  {/* Калькуляторы */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Калькуляторы риска (быстрый переход)</h3>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                      <a href="/calculators/grace" className="border border-blue-200 rounded-xl px-4 py-3 text-sm flex flex-col justify-between hover:bg-blue-50 transition">
                        <span className="font-semibold text-gray-900 mb-1">GRACE / TIMI-like EU</span>
                        <span className="text-gray-600">Единый калькулятор для европейских/американских подходов.</span>
                      </a>
                      <a href="/calculators/heart" className="border border-green-200 rounded-xl px-4 py-3 text-sm flex flex-col justify-between hover:bg-green-50 transition">
                        <span className="font-semibold text-gray-900 mb-1">HEART / ED risk</span>
                        <span className="text-gray-600">Краткосрочный риск MACE в приёмном отделении.</span>
                      </a>
                      <a href="/calculators/timi-acs" className="border border-purple-200 rounded-xl px-4 py-3 text-sm flex flex-col justify-between hover:bg-purple-50 transition">
                        <span className="font-semibold text-gray-900 mb-1">TIMI для NSTE-ACS / US</span>
                        <span className="text-gray-600">Стратификация риска осложнений у NSTE-ACS.</span>
                      </a>
                    </div>
                  </section>

                  {/* ДОБАВЛЕНО: MINOCA (расширено) */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">MINOCA: диагностика и лечение по механизмам</h3>
                    <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                        <h4 className="text-lg font-semibold text-indigo-900">Алгоритм фенотипирования</h4>
                        <RecommendationBadge rec={{ class: 'I', level: 'B', evidenceText: 'МРТ + провокационные тесты + IVUS/OCT по показаниям' }} />
                      </div>
                      <ul className="text-sm text-gray-700 space-y-1 mb-4">
                        {escGuideline.diagnosis.minoca.diagnostics.steps.map((s,i)=><li key={i}>• {s}</li>)}
                      </ul>
                      <div className="grid md:grid-cols-2 gap-4">
                        {escGuideline.diagnosis.minoca.mechanisms.map((m, i) => (
                          <div key={i} className="bg-white rounded-lg p-4 border border-indigo-100">
                            <h5 className="font-semibold text-gray-900 mb-2">{m.name}</h5>
                            <ul className="text-sm text-gray-700 space-y-1">
                              {m.therapy.map((t, j) => (
                                <li key={j}>
                                  • <span className="font-medium">{t.drug}</span>{t.dose !== '-' && <> — {t.dose}</>} {t.note && <span className="text-gray-700">({t.note})</span>} <span className="text-gray-500">({t.class}, {t.level})</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {/* === ЛЕЧЕНИЕ === */}
              {selectedTab === 'treatment' && (
                <div className="space-y-12">
                  {/* Общие меры */}
                  <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Общие мероприятия</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {escGuideline.treatment.generalMeasures.map((m,i)=>(
                        <div key={i} className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                            <h3 className="text-xl font-semibold text-gray-900">{m.measure}</h3>
                            <RecommendationBadge rec={{ class: m.class, level: m.level, evidenceText: m.evidenceText }} />
                          </div>
                          <p className="text-gray-700 mb-2"><strong>Показания:</strong> {m.indication}</p>
                          <p className="text-gray-700"><strong>Дозировка:</strong> {m.dose}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Антиагреганты */}
                  <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Антитромбоцитарная терапия</h2>
                    <div className="space-y-6">
                      <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                          <div><h3 className="text-xl font-semibold text-gray-900">Аспирин</h3>
                            <p className="text-gray-600">Нагрузка: {escGuideline.treatment.antiplateletTherapy[0].loading} • Поддержка: {escGuideline.treatment.antiplateletTherapy[0].maintenance}</p>
                          </div>
                          <RecommendationBadge
  rec={{
    class: (escGuideline.treatment.antiplateletTherapy[0] as any).class ?? ('I' as RecommendationClass),
    level: (escGuideline.treatment.antiplateletTherapy[0] as any).level ?? ('A' as EvidenceLevel),
    evidenceText: (escGuideline.treatment.antiplateletTherapy[0] as any).evidenceText ?? ''
  }}
/>

                        </div>
                        <p className="text-gray-700">{escGuideline.treatment.antiplateletTherapy[0].notes}</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">P2Y12 ингибиторы — выбор</h3>
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                       {('options' in escGuideline.treatment.antiplateletTherapy[1] &&
  Array.isArray(escGuideline.treatment.antiplateletTherapy[1].options) &&
  escGuideline.treatment.antiplateletTherapy[1].options.map((drug: any, idx: number) => (
    // ... ваш JSX карточки препарата ...
  ))
)}

                            <div key={idx} className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-sm">
                              <div className="flex flex-wrap md:flex-nowrap md:items-start md:justify-between gap-4 mb-4">
                                <h4 className="text-lg font-semibold text-gray-900">{drug.name}</h4>
                                <RecommendationBadge rec={{ class: drug.class, level: drug.level, evidenceText: drug.evidenceText }} />
                              </div>
                              <div className="space-y-3">
                                <div><span className="font-medium">Нагрузка:</span><span className="text-gray-700 ml-2">{drug.loading}</span></div>
                                <div><span className="font-medium">Поддержка:</span><span className="text-gray-700 ml-2">{drug.maintenance}</span></div>
                                <div><span className="font-medium">Длительность:</span><span className="text-gray-700 ml-2">{drug.duration}</span></div>
                                {drug.advantages && (<div><p className="font-medium text-sm mb-1">Преимущества:</p><ul className="text-sm text-gray-700 space-y-1">{drug.advantages.map((a:string,i:number)=><li key={i}>• {a}</li>)}</ul></div>)}
                                {drug.disadvantages && (<div><p className="font-medium text-sm mb-1">Недостатки:</p><ul className="text-sm text-gray-700 space-y-1">{drug.disadvantages.map((d:string,i:number)=><li key={i}>• {d}</li>)}</ul></div>)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Антикоагулянты */}
                  <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Антикоагулянтная терапия</h2>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {escGuideline.treatment.anticoagulation.map((ac:any,idx:number)=>(
                        <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                            <h4 className="text-lg font-semibold text-gray-900">{ac.drug}</h4>
                            <RecommendationBadge rec={{ class: ac.class, level: ac.level, evidenceText: ac.evidenceText }} />
                          </div>
                          <p className="text-sm text-gray-700 mb-1"><strong>Показания:</strong> {ac.indication}</p>
                          <p className="text-sm text-gray-700 mb-1"><strong>Дозировка:</strong> {ac.dose}</p>
                          {ac.notes && <p className="text-sm text-gray-700"><strong>Особенности:</strong> {ac.notes}</p>}
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Реперфузия */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">Стратегии реперфузии</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                        <h4 className="text-lg font-semibold text-red-800 mb-4">STEMI</h4>
                        {escGuideline.treatment.reperfusion.stemi.map((m:any,idx:number)=>(
                          <div key={idx} className="mb-6 last:mb-0">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                              <h5 className="font-semibold text-gray-900">{m.method}</h5>
                              <RecommendationBadge rec={{ class: m.class, level: m.level, evidenceText: m.evidenceText }} />
                            </div>
                            <p className="text-sm text-gray-700 mb-2"><strong>Тайминг:</strong> {m.timing}</p>
                            {m.results && <p className="text-sm text-gray-700 mb-2"><strong>Результаты:</strong> {m.results.join(', ')}</p>}
                            {m.contraindications && (<div className="mt-2"><p className="font-medium text-sm mb-1">Противопоказания:</p><ul className="text-sm text-gray-700 space-y-1">{m.contraindications.map((c:string,i:number)=><li key={i}>• {c}</li>)}</ul></div>)}
                          </div>
                        ))}
                      </div>
                      <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                        <h4 className="text-lg font-semibold text-orange-800 mb-4">NSTEMI</h4>
                        {escGuideline.treatment.reperfusion.nstemi.map((s:any,idx:number)=>(
                          <div key={idx} className="mb-6 last:mb-0">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                              <h5 className="font-semibold text-gray-900">{s.strategy}</h5>
                              <RecommendationBadge rec={{ class: s.class, level: s.level, evidenceText: s.evidenceText }} />
                            </div>
                            <ul className="text-sm text-gray-700 space-y-1">{s.indications.map((ind:string,i:number)=><li key={i}>• {ind}</li>)}</ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Доп. терапия */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">Дополнительная терапия</h3>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {escGuideline.treatment.adjunctiveTherapy.map((t:any,idx:number)=>(
                        <div key={idx} className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                            <h4 className="text-lg font-semibold text-gray-900">{t.drug}</h4>
                            <RecommendationBadge rec={{ class: t.class, level: t.level, evidenceText: t.evidenceText }} />
                          </div>
                          <p className="text-gray-700 mb-2"><strong>Показания:</strong> {t.indication}</p>
                          {t.timing && <p className="text-gray-700 mb-2"><strong>Тайминг:</strong> {t.timing}</p>}
                          {t.options && (<div className="mt-2"><p className="font-medium text-sm mb-1">Препараты:</p><ul className="text-sm text-gray-700 space-y-1">{t.options.map((o:string,i:number)=><li key={i}>• {o}</li>)}</ul></div>)}
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Ошибки */}
                  <section>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Частые ошибки и подводные камни</h3>
                    <div className="space-y-4">
                      {escGuideline.treatment.commonPitfalls.map((p:any,idx:number)=>(
                        <div key={idx} className="bg-red-50/70 rounded-xl p-4 border border-red-200">
                          <div className="flex items-start gap-2 mb-2"><AlertTriangle className="text-red-500 mt-0.5" size={18}/><h4 className="font-semibold text-gray-900">{p.title}</h4></div>
                          <ul className="text-sm text-gray-700 space-y-1 pl-6 list-disc">{p.items.map((it:string,i:number)=><li key={i}>{it}</li>)}</ul>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* === ОСЛОЖНЕНИЯ (РАСШИРЕНО) === */}
              {selectedTab === 'complications' && (
                <div className="space-y-10">
                  <h2 className="text-3xl font-bold text-gray-900">Осложнения при ОКС: диагностика и ведение</h2>

                  {/* No-reflow */}
                  <CompCard
                    title="No-reflow / медленный кровоток после ЧКВ"
                    diag={['TIMI ≤2, отсутствует нормализация ST, микрососудистая обструкция (ангио-признаки/СТ-перфузия).','Чаще при массивном тромбозе, дистальной эмболизации.']}
                    steps={[
                      'Интервенционные: мягкие редилатации; при уместности — аспирация тромба (IIb, C).',
                      'Фармако: нитропруссид 100–200 мкг ИК болюсно (IIa, B); аденозин 30–60 мкг ИК, повтор (IIa, B); верапамил 100–200 мкг ИК (IIa, B).',
                      'ГП IIb/IIIa: эптифибатид болюс 180 мкг/кг ×2 (10 мин), затем 2 мкг/кг/мин 12–18 ч (IIa, B).',
                    ]}
                    rec={{ class:'IIa', level:'B', evidenceText:'ИК вазодилататоры/аденозин уменьшают микрососудистую обструкцию' }}
                    color="amber"
                  />

                  {/* CI-AKI */}
                  <CompCard
                    title="Контраст-индуцированное поражение почек (CI-AKI)"
                    diag={['↑ креатинина ≥0.3 мг/дл или ≥50% от исходного за 48–72 ч после контраста.','Факторы риска: ХБП, диабет, объём контраста, возраст.']}
                    steps={[
                      'Профилактика: NaCl 0.9% 1–1.5 мл/кг/ч за 3–12 ч до и 6–12 ч после (I, A).',
                      'Минимизировать объём контраста, избежать повторной экспозиции 48–72 ч (I, C).',
                      'Метформин: eGFR 30–59 — пропуск день процедуры и 48 ч после; eGFR <30 — отменить заранее (I, B).',
                      'Альтернатива: бикарбонат по локальному протоколу (IIb, B).',
                    ]}
                    rec={{ class:'I', level:'A', evidenceText:'Гидратация — ключевой метод профилактики CI-AKI' }}
                    color="blue"
                  />

                  {/* Кардиогенный шок */}
                  <CompCard
                    title="Кардиогенный шок"
                    diag={['Гипоперфузия + гипотензия (САД <90 или вазопрессоры) + признаки застоя/↑ лактата.','ЭхоКГ — оценка ФВ и механических осложнений.']}
                    steps={[
                      'Немедленная ревоскулиризация инфаркт-связанной артерии (предпочтительно ЧКВ) (I, A).',
                      'Вазопрессоры: норадреналин титровать до MAP 65–70 мм рт.ст. (IIa, B).',
                      'Инотропы: добутамин 2–20 мкг/кг/мин при низком СВ (IIa, B).',
                      'Временная МПК (Impella/VA-ECMO) у отобранных (IIb, C).',
                    ]}
                    rec={{ class:'I', level:'A', evidenceText:'Ранняя ревоскулиризация улучшает выживаемость' }}
                    color="red"
                  />

                  {/* Острая СН/отёк лёгких */}
                  <CompCard
                    title="Острая сердечная недостаточность / отёк лёгких"
                    diag={['Одышка, гипоксемия, крепитация, рентген-признаки застоя.']}
                    steps={[
                      'Оксигенация/неинвазивная вентиляция при необходимости (I, B).',
                      'Петлевые диуретики: фуросемид 20–40 мг в/в болюс с титрацией (I, C).',
                      'Вазодилататоры при АГ: нитроглицерин 10–200 мкг/мин в/в (IIa, B).',
                      'Избегать избыточной жидкости; мониторинг баланса (IIa, C).',
                    ]}
                    rec={{ class:'I', level:'B', evidenceText:'Ранняя разгрузка малого круга и NIV снижают интубации' }}
                    color="green"
                  />

                  {/* Аритмии: ФП/ЖТ-ФЖ/бради-АВ-блок */}
                  <CompCard
                    title="Аритмии при ОКС (ФП/ЖТ-ФЖ/бради-АВ-блок)"
                    diag={['ФП: быстрая нерегулярная ритмия; ЖТ/ФЖ: гемодинамическая нестабильность; брадикардия/АВ-блок с симптомами.']}
                    steps={[
                      'ФП: контроль ЧСС — метопролол 2.5–5 мг в/в болюсно до 3 раз или дилтиазем 0.25 мг/кг в/в (IIa, B); антикоагуляция по CHA₂DS₂-VASc (I, A).',
                      'ЖТ/ФЖ: немедленная дефибрилляция при нестабильности (I, A); амиодарон 150–300 мг в/в при устойчивой ЖТ (IIa, B).',
                      'Бради/АВ-блок: атропин 0.5 мг в/в до 3 мг (IIa, B); при неэффективности — временная ЭКС (IIa, C).',
                    ]}
                    rec={{ class:'I', level:'A', evidenceText:'Дефибрилляция при ЖТ/ФЖ спасает жизнь; антикоагуляция при ФП — по шкалам' }}
                    color="purple"
                  />

                  {/* Ранний тромбоз стента */}
                  <CompCard
                    title="Ранний тромбоз стента"
                    diag={['Острая ишемия/повторный подъём ST вскоре после ЧКВ; ангио: окклюзия/тромб в зоне стента.']}
                    steps={[
                      'Немедленное повторное ЧКВ (I, A).',
                      'ГП IIb/IIIa (эптифибатид как выше) при массивном тромбозе (IIa, B).',
                      'Оценить комплаенс к ДАТТ, возможные лекарственные взаимодействия (ИПП, CYP).',
                    ]}
                    rec={{ class:'I', level:'A', evidenceText:'Реваскуляризация восстанавливает кровоток и прогноз' }}
                    color="rose"
                  />

                  {/* Кровотечения на ДАТТ/АК */}
                  <CompCard
                    title="Кровотечение на ДАТТ/антикоагулянтах"
                    diag={['Оценка тяжести (BARC), локализация, гемодинамика.']}
                    steps={[
                      'Лёгкие/умеренные: локальный гемостаз, рассмотреть деэскалацию ДАТТ (клопидогрел) или укорочение длительности (IIa, B).',
                      'Тяжёлые/жизнеугрожающие: временно приостановить P2Y12 (с сохранением аспирина при возможности), специфическая обратимость (для НОАК/варфарина по протоколам) (IIa, C).',
                      'Пересмотр риска по ARC-HBR, PRECISE-DAPT — индивидуализация (I, B).',
                    ]}
                    rec={{ class:'IIa', level:'B', evidenceText:'Персонализация ДАТТ снижает кровотечения без существенной потери эффективности' }}
                    color="slate"
                  />

                  {/* Инсульт при ОКС */}
                  <CompCard
                    title="Инсульт при ОКС"
                    diag={['Неврологический дефицит; КТ/МРТ для исключения кровоизлияния.']}
                    steps={[
                      'Немедленная нейровизуализация; консультация невролога/нейрохирурга (I, C).',
                      'Коррекция антитромботической терапии по типу инсульта (ишемический vs геморрагический) (I, C).',
                      'При ишемическом инсульте и недавнем ЧКВ — мультидисциплинарное решение о продолжении ДАТТ (IIa, C).',
                    ]}
                    rec={{ class:'I', level:'C', evidenceText:'Командный подход минимизирует риски вторичных событий' }}
                    color="yellow"
                  />

                  {/* Тромб ЛЖ */}
                  <CompCard
                    title="Тромб в полости ЛЖ (пост-МИ)"
                    diag={['ЭхоКГ/КМРТ подтверждение тромба; чаще при обширном переднем ИМ.']}
                    steps={[
                      'Антикоагуляция (варфарин, цель INR 2–3) 3–6 мес с контролем резолюции (IIa, B).',
                      'Альтернатива: НОАК по локальным протоколам/риску (IIb, B).',
                      'ДАТТ + АК: минимизировать срок тройной терапии, затем двойная (IIa, B).',
                    ]}
                    rec={{ class:'IIa', level:'B', evidenceText:'АК снижает эмболические события, важна повторная визуализация' }}
                    color="teal"
                  />

                  {/* Перикардит/постинфарктный синдром */}
                  <CompCard
                    title="Ранний перикардит / постинфарктный синдром (Дресслера)"
                    diag={['Боль, шум трения, подъём воспалительных маркеров; Эхо: выпот?']}
                    steps={[
                      'Ибупрофен 600–800 мг 3 р/сут или АСК 650–1000 мг 3 р/сут 1–2 нед с постепенным снижением (IIa, B).',
                      'Колхицин 0.5 мг 1–2 р/сут 3 мес для снижения рецидивов (IIa, B).',
                      'Избегать НПВП (кроме АСК) в раннем пост-ИМ при стентировании — по локальным протоколам (IIb, C).',
                    ]}
                    rec={{ class:'IIa', level:'B', evidenceText:'Колхицин снижает рецидивы перикардита' }}
                    color="orange"
                  />

                  {/* Гиперкалиемия */}
                  <CompCard
                    title="Гиперкалиемия на фоне терапии"
                    diag={['K+ >5.5 ммоль/л, ЭКГ-изменения (высокие T, QRS расширение).']}
                    steps={[
                      'Кальция глюконат 10 мл 10% в/в медленно при ЭКГ-токсичности (I, C).',
                      'Инсулин 10 ед + глюкоза 25 г в/в болюсно (IIa, B); небулизированный β2-агонист (сальбутамол 10–20 мг) (IIa, B).',
                      'Петлевой диуретик; катионобменные смолы/соды по протоколам; пересмотр МРА/ИАПФ/БРА (I, C).',
                    ]}
                    rec={{ class:'I', level:'C', evidenceText:'Кардиопротекция кальцием и внутриклеточный шифт калия — приоритет' }}
                    color="lime"
                  />

                  {/* Аллергия на контраст */}
                  <CompCard
                    title="Гиперчувствительность к контрасту"
                    diag={['Крапивница/бронхоспазм/гипотензия во время/после контраста.']}
                    steps={[
                      'Немедленно прекратить введение, поддержка А/Д и дыхания (I, C).',
                      'Адреналин i.m. 0.3–0.5 мг (1:1000), повтор по показаниям (I, C); антигистаминные, глюкокортикостероиды (IIa, C).',
                      'Премедикация при будущих процедурах по протоколу (IIa, C).',
                    ]}
                    rec={{ class:'I', level:'C', evidenceText:'Адреналин — препарат выбора при анафилаксии' }}
                    color="indigo"
                  />

                  {/* Механические осложнения */}
                  <CompCard
                    title="Механические осложнения (VSD, разрыв ПМЖ/свободной стенки)"
                    diag={['Внезапная гемодинамическая нестабильность, новый шум; ЭхоКГ — ключ.']}
                    steps={[
                      'Срочная консультация кардиохирурга (I, C).',
                      'IABP/механическая поддержка при ожидании операции (IIb, C).',
                      'Контроль перфузии вазопрессорами/инотропами (IIa, C).',
                    ]}
                    rec={{ class:'I', level:'C', evidenceText:'Хирургическая коррекция — единственный радикальный вариант' }}
                    color="fuchsia"
                  />
                </div>
              )}

              {/* === ПРОФИЛАКТИКА === */}
              {selectedTab === 'prevention' && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Вторичная профилактика после ОКС</h2>
                  <section className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Медикаментозная терапия</h3>
                    <div className="space-y-4">
                      {escGuideline.secondaryPrevention.medications.map((m:any,idx:number)=>(
                        <div key={idx} className="bg-white rounded-lg p-4 border border-blue-100">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-2">
                            <h4 className="font-semibold text-gray-900">{m.drug}</h4>
                            <RecommendationBadge rec={{ class: m.class, level: m.level, evidenceText: m.evidenceText }} />
                          </div>
                          {m.duration && <p className="text-sm text-gray-700 mb-1">Длительность: <span className="font-medium">{m.duration}</span></p>}
                          {m.target && <p className="text-sm text-gray-700 mb-1">Цель: <span className="font-medium">{m.target}</span></p>}
                          {m.monitoring && <p className="text-sm text-gray-700 mb-1">Мониторинг: <span className="font-medium">{m.monitoring}</span></p>}
                          {m.deescalation && <ul className="text-sm text-gray-700 space-y-1 mt-2">{m.deescalation.map((x:string,i:number)=><li key={i}>• {x}</li>)}</ul>}
                          {m.escalation && <ul className="text-sm text-gray-700 space-y-1 mt-2">{m.escalation.map((x:string,i:number)=><li key={i}>• {x}</li>)}</ul>}
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Образ жизни</h3>
                    <div className="space-y-4">
                      {escGuideline.secondaryPrevention.lifestyle.map((l:any,idx:number)=>(
                        <div key={idx} className="bg-white rounded-lg p-4 border border-green-100">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-2">
                            <h4 className="font-semibold text-gray-900">{l.area}</h4>
                            <RecommendationBadge rec={{ class: l.class, level: l.level, evidenceText: l.evidenceText }} />
                          </div>
                          <p className="text-sm text-gray-700 mb-1">Рекомендация: <span className="font-medium">{l.recommendation}</span></p>
                          {l.components && <ul className="text-sm text-gray-700 space-y-1 mt-2">{l.components.map((c:string,i:number)=><li key={i}>• {c}</li>)}</ul>}
                          {l.interventions && <ul className="text-sm text-gray-700 space-y-1 mt-2">{l.interventions.map((c:string,i:number)=><li key={i}>• {c}</li>)}</ul>}
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* === СРАВНЕНИЕ === */}
              {selectedTab === 'comparison' && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{escGuideline.comparison.title}</h2>
                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <h3 className="text-xl font-semibold text-green-800 mb-4">Ключевые различия</h3>
                    <div className="space-y-4">
                      {escGuideline.comparison.keyDifferences.map((d:any,idx:number)=>(
                        <div key={idx} className="bg-white rounded-lg p-4 border border-green-100 shadow-sm">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                            <h4 className="font-semibold text-gray-900">{d.aspect}</h4>
                            <RecommendationBadge rec={{ class: d.class, level: d.level, evidenceText: d.evidenceText }} />
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div><p className="font-medium text-gray-700 mb-1">🇪🇺 ESC 2023–2024</p><p className="text-gray-700">{d.eu}</p></div>
                            <div><p className="font-medium text-gray-700 mb-1">🇺🇸 ACC/AHA 2025</p><p className="text-gray-700">{d.us}</p></div>
                          </div>
                          <p className="mt-3 text-sm text-gray-600">{d.significance}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Практические выводы</h3>
                    <ul className="space-y-2 text-gray-700">
                      {escGuideline.comparison.practicalImplications.map((t:string,idx:number)=>(
                        <li key={idx} className="flex items-start gap-2"><CheckCircle className="text-green-500 mt-0.5" size={18}/><span>{t}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Сохранить */}
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
                Обзор и интерпретация клинических рекомендаций для медицинских специалистов. Следуйте официальным руководствам и локальным протоколам.
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

/** Карточка осложнения с мягким цветным фоном для блоков (фон страницы остаётся белым) */
function CompCard({
  title,
  diag,
  steps,
  rec,
  color = 'amber',
}: {
  title: string;
  diag: string[];
  steps: string[];
  rec: Recommendation;
  color?: 'amber'|'blue'|'red'|'green'|'purple'|'rose'|'slate'|'yellow'|'teal'|'orange'|'lime'|'indigo'|'fuchsia';
}) {
  const palette: Record<string,{diag:string;steps:string}> = {
    amber:  { diag:'border-amber-200 bg-amber-50',   steps:'border-blue-200 bg-blue-50' },
    blue:   { diag:'border-blue-200 bg-blue-50',     steps:'border-green-200 bg-green-50' },
    red:    { diag:'border-red-200 bg-red-50',       steps:'border-yellow-200 bg-yellow-50' },
    green:  { diag:'border-green-200 bg-green-50',   steps:'border-indigo-200 bg-indigo-50' },
    purple: { diag:'border-purple-200 bg-purple-50', steps:'border-blue-200 bg-blue-50' },
    rose:   { diag:'border-rose-200 bg-rose-50',     steps:'border-blue-200 bg-blue-50' },
    slate:  { diag:'border-slate-200 bg-slate-50',   steps:'border-blue-200 bg-blue-50' },
    yellow: { diag:'border-yellow-200 bg-yellow-50', steps:'border-blue-200 bg-blue-50' },
    teal:   { diag:'border-teal-200 bg-teal-50',     steps:'border-blue-200 bg-blue-50' },
    orange: { diag:'border-orange-200 bg-orange-50', steps:'border-blue-200 bg-blue-50' },
    lime:   { diag:'border-lime-200 bg-lime-50',     steps:'border-blue-200 bg-blue-50' },
    indigo: { diag:'border-indigo-200 bg-indigo-50', steps:'border-blue-200 bg-blue-50' },
    fuchsia:{ diag:'border-fuchsia-200 bg-fuchsia-50',steps:'border-blue-200 bg-blue-50' },
  };
  const p = palette[color];

  return (
    <section className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <RecommendationBadge rec={rec} />
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className={`rounded-lg p-4 ${p.diag}`}>
          <h4 className="font-semibold text-gray-900 mb-2">Диагностика</h4>
          <ul className="text-sm text-gray-700 space-y-1">{diag.map((d,i)=><li key={i}>• {d}</li>)}</ul>
        </div>
        <div className={`rounded-lg p-4 ${p.steps} md:col-span-1 xl:col-span-2`}>
          <h4 className="font-semibold text-gray-900 mb-2">Алгоритм и терапия</h4>
          <ul className="text-sm text-gray-700 space-y-1">{steps.map((s,i)=><li key={i}>• {s}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
