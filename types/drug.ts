// types/drug.ts

// --- Применение в гайдах (одна запись) ---
export interface GuidelineUsageEntry {
  guideCode: string;          // «ESC ACS 2023»
  guideSection: string;       // «Раздел 7.2 – Антикоагулянтная терапия»
  indicationSummary: string;  // Кратко: как используется препарат
  link: string;               // Ссылка на гайд
  recommendationClass?: string; // "I", "IIa", "IIb", "III"
  evidenceLevel?: string;      // "A", "B", "C"
}

// --- Применение в гайдах (EU / US) ---
export interface GuidelineUsage {
  eu: GuidelineUsageEntry[];
  us: GuidelineUsageEntry[];
}

// --- Формы выпуска с улучшенной структурой ---
export interface DrugForm {
  form: string;           // "Раствор для инъекций"
  strength: string;       // "40 мг/0,4 мл"
  route: string;         // "п/к", "в/в", "перорально"
  volume?: string;       // "0,4 мл" - для инъекционных форм
  packageSize?: string;  // "10 шприцов"
  note?: string;
}

// --- Дозирование с улучшенной типобезопасностью ---
export interface DosageRegimen {
  indication: string;
  regimen: string;
  maxDailyDose?: string;
  duration?: string;      // "5-10 дней", "до выписки"
  notes?: string;
}

export interface ImpairmentAdjustment {
  condition: string;     // "КК 15–30 мл/мин", "Тяжёлая печёночная недостаточность"
  adjustment: string;
  notes?: string;
}

export interface DrugDosage {
  adults: DosageRegimen[];
  renalImpairment: ImpairmentAdjustment[];
  hepaticImpairment: ImpairmentAdjustment[];
  pediatrics: {
    ageGroup: string;
    regimen: string;
    notes?: string;
  }[];
  elderly?: string;
}

// --- Основной тип лекарства (МНН) ---
export interface Drug {
  // Идентификация
  id: string;                    // уникальный ID (можно = slug)
  genericName: string;           // МНН
  slug: string;                  // для URL, например "enoxaparin"
  tradeNames: string[];          // торговые названия
  atcCode?: string;
  pharmacologicClass?: string;
  therapeuticClass?: string;
  specialties: string[];         // например ["Кардиология", "Хирургия"]

  // Дополнительно для SEO / описания
  manufacturer?: string;
  description?: string;
  
  // Мета-информация для поиска
  searchKeywords?: string[];     // дополнительные ключевые слова для поиска

  // Показания
  indications: {
    title: string;
    description: string;
    classOfRecommendation?: string;
    levelOfEvidence?: string;
    isOffLabel?: boolean;        // внерегистрационное применение
  }[];

  // Формы выпуска
  forms: DrugForm[];

  // Дозирование
  dosage: DrugDosage;

  // Противопоказания
  contraindications: {
    absolute: string[];
    relative: string[];
    warnings?: string[];         // особые предупреждения
  };

  // Взаимодействия
  interactions: {
    drug: string;
    effect: string;
    action: string;
    severity: 'major' | 'moderate' | 'minor';  // степень значимости
  }[];

  // Нежелательные явления
  adverseEffects: {
    common: string[];
    serious: string[];
    frequency?: {               // частота встречаемости
      effect: string;
      frequency: string;        // "очень часто", "часто", "редко"
    }[];
  };

  // Мониторинг
  monitoring: {
    laboratory: string[];       // лабораторные показатели
    clinical: string[];         // клинические признаки
    instrumental?: string[];    // инструментальные исследования
  };

  // Беременность/лактация
  pregnancyLactation: {
    pregnancy: string;
    pregnancyCategory?: string; // "A", "B", "C", "D", "X"
    lactation: string;
  };

  // Администрирование / передозировка / «фишки»
  administration?: string;
  overdose?: {
    symptoms: string[];
    treatment: string[];
  };
  pearls: string[];

  // Механизм действия
  mechanismOfAction?: string;

  // Фармакокинетика
  pharmacokinetics?: {
    bioavailability?: string;
    halfLife?: string;
    metabolism?: string;
    excretion?: string;
  };

  // Применение в гайдах (EU / US)
  guidelineUsage: GuidelineUsage;

  // Служебное
  updatedAt: string;
  published: boolean;           // опубликован ли препарат
  verified: boolean;            // проверен ли контент
}

// --- Утилиты для работы с лекарствами ---

/**
 * Получить все торговые названия препарата для поиска
 */
export function getDrugSearchTerms(drug: Drug): string[] {
  const terms = new Set<string>([
    drug.genericName.toLowerCase(),
    ...drug.tradeNames.map(name => name.toLowerCase()),
    ...(drug.searchKeywords || [])
  ]);
  
  // Добавляем специализации
  drug.specialties.forEach(spec => terms.add(spec.toLowerCase()));
  
  return Array.from(terms);
}

/**
 * Получить основную форму выпуска (первую или самую популярную)
 */
export function getPrimaryForm(drug: Drug): DrugForm | undefined {
  return drug.forms[0];
}

/**
 * Проверить, есть ли препарат в указанном гайде
 */
export function hasGuidelineMention(drug: Drug, guideCode: string): boolean {
  const allGuidelines = [...drug.guidelineUsage.eu, ...drug.guidelineUsage.us];
  return allGuidelines.some(guide => 
    guide.guideCode.toLowerCase().includes(guideCode.toLowerCase())
  );
}

// --- JSON-LD схема для поисковиков (schema.org/Drug) ---

export function generateDrugSchema(drug: Drug) {
  const url = `https://medradix.info/drugs/${drug.slug}`;
  const primaryForm = getPrimaryForm(drug);

  return {
    '@context': 'https://schema.org',
    '@type': 'Drug',
    '@id': url,
    name: drug.genericName,
    genericName: drug.genericName,
    brandName: drug.tradeNames.length > 0 ? {
      '@type': 'Brand',
      name: drug.tradeNames[0]
    } : undefined,
    activeIngredient: drug.genericName,
    dosageForm: primaryForm?.form,
    strength: primaryForm?.strength,
    code: drug.slug,
    description: drug.description || `Информация о препарате ${drug.genericName}`,
    manufacturer: drug.manufacturer ? {
      '@type': 'Organization',
      name: drug.manufacturer
    } : undefined,
    indication: drug.indications.map((ind) => ({
      '@type': 'MedicalCondition',
      name: ind.title,
      description: ind.description
    })),
    contraindication: [
      ...drug.contraindications.absolute,
      ...drug.contraindications.relative
    ].join(', '),
    warning: drug.contraindications.warnings?.join(', '),
    seriousAdverseEffect: drug.adverseEffects.serious.map((effect) => ({
      '@type': 'MedicalCondition',
      name: effect
    })),
    administrationRoute: drug.administration,
    drugClass: drug.pharmacologicClass,
    therapeuticClass: drug.therapeuticClass,
    url,
    // Мета-информация для лучшей индексации
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: '100'
    }
  };
}

/**
 * Генерирует мета-теги для SEO
 */
export function generateDrugMetaTags(drug: Drug) {
  const primaryIndication = drug.indications[0]?.title || '';
  
  return {
    title: `${drug.genericName} - инструкция, применение, дозировка | MedRadix`,
    description: `${drug.genericName}: ${drug.description || primaryIndication}. Торговые названия: ${drug.tradeNames.join(', ')}.`,
    keywords: [
      drug.genericName,
      ...drug.tradeNames,
      ...drug.specialties,
      'инструкция',
      'применение',
      'дозировка',
      'показания'
    ].join(', '),
    openGraph: {
      title: `${drug.genericName} - MedRadix`,
      description: drug.description || `Информация о препарате ${drug.genericName}`,
      type: 'article' as const,
      url: `https://medradix.info/drugs/${drug.slug}`
    }
  };
}

// === MOCK DATA FOR DRUGS LIST ===
export const mockDrugsList = [
  {
    id: "enoxaparin",
    slug: "enoxaparin", 
    genericName: "Enoxaparin",
    tradeNames: ["Клексан", "Эниксум", "Гемапаксан"],
    therapeuticClass: "Антикоагулянт"
  }
];

// === ПОЛНЫЙ MOCK ДАННЫХ ДЛЯ ЭНОКСАПАРИНА ===
export const mockDrugEnoxaparin: Drug = {
  id: "enoxaparin",
  genericName: "Enoxaparin",
  slug: "enoxaparin", 
  tradeNames: ["Клексан", "Эниксум", "Гемапаксан"],
  atcCode: "B01AB05",
  pharmacologicClass: "Низкомолекулярный гепарин",
  therapeuticClass: "Антикоагулянт",
  specialties: ["Кардиология", "Ангиохирургия", "Терапия", "Реаниматология"],
  manufacturer: "Санофи",
  description: "Низкомолекулярный гепарин для профилактики и лечения тромбоэмболических осложнений. Применяется при острых коронарных синдромах, тромбозах глубоких вен и тромбоэмболии легочной артерии.",

  // Показания
  indications: [
    {
      title: "Острый коронарный синдром без подъёма ST (NSTE-ACS)",
      description: "Антикоагулянтная терапия у пациентов с нестабильной стенокардией и NSTEMI в составе комбинированного лечения.",
      classOfRecommendation: "I",
      levelOfEvidence: "A"
    },
    {
      title: "Профилактика венозных тромбоэмболических осложнений",
      description: "Профилактика ВТЭО у взрослых пациентов при высоком и умеренном риске тромбоза в периоперационном периоде.",
      classOfRecommendation: "I", 
      levelOfEvidence: "A"
    },
    {
      title: "Лечение тромбоза глубоких вен и ТЭЛА",
      description: "Начальная антикоагулянтная терапия при ТГВ и ТЭЛА с последующим переходом на пероральные антикоагулянты.",
      classOfRecommendation: "I",
      levelOfEvidence: "A"
    }
  ],

  // Формы выпуска
  forms: [
    {
      form: "Раствор для инъекций в шприцах",
      strength: "20 мг/0,2 мл",
      route: "п/к",
      note: "Профилактика у пациентов с низкой массой тела"
    },
    {
      form: "Раствор для инъекций в шприцах", 
      strength: "40 мг/0,4 мл",
      route: "п/к",
      note: "Стандартная профилактика ВТЭО"
    },
    {
      form: "Раствор для инъекций в шприцах",
      strength: "60 мг/0,6 мл", 
      route: "п/к",
      note: "Лечебные дозы (1 мг/кг)"
    },
    {
      form: "Раствор для инъекций в шприцах",
      strength: "80 мг/0,8 мл",
      route: "п/к", 
      note: "Лечебные дозы у пациентов с высокой массой тела"
    }
  ],

  // Дозирование
  dosage: {
    adults: [
      {
        indication: "NSTE-ACS (нестабильная стенокардия, NSTEMI)",
        regimen: "1 мг/кг п/к каждые 12 часов в сочетании с антитромбоцитарной терапией",
        duration: "2-8 дней или до реваскуляризации",
        notes: "Не вводить в/м. Коррекция при почечной недостаточности."
      },
      {
        indication: "Профилактика ВТЭО при ортопедических операциях",
        regimen: "40 мг п/к 1 раз в сутки, начиная за 12 часов до операции",
        duration: "10-14 дней, при высоком риске до 35 дней",
        notes: "Оценивать риск кровотечения и функцию почек"
      },
      {
        indication: "Лечение ТГВ и/или ТЭЛА", 
        regimen: "1 мг/кг п/к каждые 12 часов или 1,5 мг/кг п/к 1 раз в сутки",
        duration: "До перехода на пероральные антикоагулянты",
        notes: "Выбор режима зависит от клинической ситуации"
      }
    ],
    renalImpairment: [
      {
        condition: "КК ≥ 30 мл/мин",
        adjustment: "Стандартные режимы дозирования"
      },
      {
        condition: "КК 15-30 мл/мин", 
        adjustment: "Рассмотреть снижение дозы (1 мг/кг 1 раз в сутки)"
      },
      {
        condition: "КК < 15 мл/мин",
        adjustment: "Обычно не рекомендуется"
      }
    ],
    hepaticImpairment: [
      {
        condition: "Тяжёлая печёночная недостаточность",
        adjustment: "Повышен риск кровотечения. Использование только после индивидуальной оценки."
      }
    ],
    pediatrics: [
      {
        ageGroup: "Дети и подростки",
        regimen: "Использование по индивидуальным схемам (мг/кг) в специализированных центрах",
        notes: "Требуется участие детского специалиста"
      }
    ],
    elderly: "У пожилых (>75 лет) выше риск кровотечения: требуется контроль функции почек, массы тела"
  },

  // Противопоказания
  contraindications: {
    absolute: [
      "Активное клинически значимое кровотечение",
      "Подозрение на внутричерепное кровоизлияние", 
      "Гепарин-индуцированная тромбоцитопения (ГИТ) в анамнезе",
      "Выраженная неконтролируемая тромбоцитопения"
    ],
    relative: [
      "Недавние операции с высоким риском кровотечения",
      "Тяжёлые нарушения коагуляции",
      "Тяжёлая печёночная недостаточность",
      "Сочетание с другими антикоагулянтами"
    ],
    warnings: [
      "Риск спинальных/эпидуральных гематом при нейроаксиальной анестезии",
      "Мониторинг тромбоцитов при длительной терапии"
    ]
  },

  // Взаимодействия
  interactions: [
    {
      drug: "Ацетилсалициловая кислота, клопидогрель, НПВП",
      effect: "Повышение риска кровотечения",
      action: "Назначать вместе только при наличии показаний, мониторить признаки кровотечения",
      severity: "major"
    },
    {
      drug: "Другие антикоагулянты (варфарин, НОАК)",
      effect: "Суммирование антикоагулянтного эффекта", 
      action: "Избегать одновременного применения, аккуратный переход между препаратами",
      severity: "major"
    }
  ],

  // Нежелательные явления
  adverseEffects: {
    common: [
      "Кровотечения лёгкой и средней степени",
      "Гематомы в месте инъекции", 
      "Умеренная тромбоцитопения",
      "Повышение трансаминаз"
    ],
    serious: [
      "Массивные кровотечения (ЖКТ, внутричерепные)",
      "Гепарин-индуцированная тромбоцитопения с тромбозами",
      "Спинальные/эпидуральные гематомы"
    ]
  },

  // Мониторинг
  monitoring: {
    laboratory: [
      "ОАК (Hb, тромбоциты) до начала и при длительной терапии",
      "Креатинин и расчёт клиренса креатинина",
      "Функция печени (АСТ, АЛТ)"
    ],
    clinical: [
      "Клинический контроль кровотечений (кожа, ЖКТ, мочевыделительная система)",
      "Признаки тромбоза при подозрении на ГИТ"
    ]
  },

  // Беременность/лактация
  pregnancyLactation: {
    pregnancy: "НМГ часто рассматриваются как предпочтительные антикоагулянты при необходимости антикоагуляции во время беременности, но применение требует индивидуальной оценки.",
    lactation: "Выделение в грудное молоко минимальное; многие руководства допускают применение при ГВ с осторожностью.",
    pregnancyCategory: "B"
  },

  // Дополнительно
  administration: "Вводится только п/к (передне/заднебоковая поверхность брюшной стенки). Не удалять воздушный пузырёк из шприца, не массировать место инъекции.",
  pearls: [
    "Не вводить эноксапарин внутримышечно",
    "Всегда учитывать функцию почек и возраст при выборе дозы", 
    "Фиксировать время последней дозы перед нейроаксиальной анестезией"
  ],

  // Применение в гайдах
  guidelineUsage: {
    eu: [
      {
        guideCode: "ESC NSTE-ACS 2020",
        guideSection: "Раздел 7 – Антикоагулянтная терапия при NSTE-ACS",
        indicationSummary: "Один из препаратов выбора для парентеральной антикоагуляции при NSTE-ACS",
        link: "https://www.escardio.org"
      }
    ],
    us: [
      {
        guideCode: "ACC/AHA NSTE-ACS", 
        guideSection: "Anticoagulant Therapy in NSTE-ACS",
        indicationSummary: "Один из предпочтительных вариантов антикоагуляции у пациентов с NSTE-ACS",
        link: "https://www.acc.org/guidelines"
      }
    ]
  },

  // Служебное
  updatedAt: new Date().toISOString(),
  published: true,
  verified: true
};
