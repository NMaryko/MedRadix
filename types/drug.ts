// types/drug.ts - ИДЕАЛЬНАЯ СТРУКТУРА ДЛЯ ВСЕХ ПРЕПАРАТОВ

// ==================== БАЗОВЫЕ ТИПЫ ====================
export interface GuidelineUsageEntry {
  guideCode: string;
  guideSection: string;
  indicationSummary: string;
  link: string;
  recommendationClass?: "I" | "IIa" | "IIb" | "III";
  evidenceLevel?: "A" | "B" | "C";
}

export interface GuidelineUsage {
  eu: GuidelineUsageEntry[];
  us: GuidelineUsageEntry[];
}

export interface DrugForm {
  form: string;
  strength: string;
  route: string;
  volume?: string;
  packageSize?: string;
  note?: string;
}

export interface DosageRegimen {
  indication: string;
  regimen: string;
  maxDailyDose?: string;
  duration?: string;
  notes?: string;
}

export interface ImpairmentAdjustment {
  condition: string;
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

// ==================== ОСНОВНОЙ ИНТЕРФЕЙС ====================
export interface Drug {
  id: string;
  genericName: string;
  slug: string;
  tradeNames: string[];
  atcCode?: string;
  pharmacologicClass?: string;
  therapeuticClass?: string;
  specialties: string[];
  manufacturer?: string;
  description?: string;
  searchKeywords?: string[];
  indications: {
    title: string;
    description: string;
    classOfRecommendation?: string;
    levelOfEvidence?: string;
    isOffLabel?: boolean;
  }[];
  forms: DrugForm[];
  dosage: DrugDosage;
  contraindications: {
    absolute: string[];
    relative: string[];
    warnings?: string[];
  };
  interactions: {
    drug: string;
    effect: string;
    action: string;
    severity: 'major' | 'moderate' | 'minor';
  }[];
  adverseEffects: {
    common: string[];
    serious: string[];
    frequency?: {
      effect: string;
      frequency: string;
    }[];
  };
  monitoring: {
    laboratory: string[];
    clinical: string[];
    instrumental?: string[];
  };
  pregnancyLactation: {
    pregnancy: string;
    pregnancyCategory?: string;
    lactation: string;
  };
  administration?: string;
  overdose?: {
    symptoms: string[];
    treatment: string[];
  };
  pearls: string[];
  mechanismOfAction?: string;
  pharmacokinetics?: {
    bioavailability?: string;
    halfLife?: string;
    metabolism?: string;
    excretion?: string;
  };
  guidelineUsage: GuidelineUsage;
  updatedAt: string;
  published: boolean;
  verified: boolean;
}

// ==================== УТИЛИТЫ ====================
export function getDrugSearchTerms(drug: Drug): string[] {
  const terms = new Set<string>([
    drug.genericName.toLowerCase(),
    ...drug.tradeNames.map(name => name.toLowerCase()),
    ...(drug.searchKeywords || [])
  ]);
  drug.specialties.forEach(spec => terms.add(spec.toLowerCase()));
  return Array.from(terms);
}

export function getPrimaryForm(drug: Drug): DrugForm | undefined {
  return drug.forms[0];
}

export function hasGuidelineMention(drug: Drug, guideCode: string): boolean {
  const allGuidelines = [...drug.guidelineUsage.eu, ...drug.guidelineUsage.us];
  return allGuidelines.some(guide => 
    guide.guideCode.toLowerCase().includes(guideCode.toLowerCase())
  );
}

// ==================== SEO ФУНКЦИИ ====================
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: '100'
    }
  };
}

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
      type: 'article',
      url: `https://medradix.info/drugs/${drug.slug}`
    }
  };
}

// ==================== MOCK ДАННЫЕ ====================
// Список для поисковика (используется в app/lib/search.ts)
export const mockDrugsList = [
  {
    id: "enoxaparin",
    slug: "enoxaparin", 
    genericName: "Enoxaparin",
    tradeNames: ["Клексан", "Эниксум", "Гемапаксан"],
    therapeuticClass: "Антикоагулянт",
    // 👇 ДОБАВИЛИ description, чтобы поиск видел "низкомолекулярный гепарин"
    description: "Низкомолекулярный гепарин для профилактики и лечения тромбоэмболических осложнений. Применяется при острых коронарных синдромах, тромбозах глубоких вен и тромбоэмболии легочной артерии."
  }
];

// Полный объект, который используем для страницы препарата / SEO / Sanity-структуры
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

  forms: [
    {
      form: "Раствор для инъекций в шприцах",
      strength: "20 мг/0,2 мл",
      route: "п/к",
      volume: undefined,
      packageSize: undefined,
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

  pregnancyLactation: {
    pregnancy: "НМГ часто рассматриваются как предпочтительные антикоагулянты при необходимости антикоагуляции во время беременности, но применение требует индивидуальной оценки.",
    lactation: "Выделение в грудное молоко минимальное; многие руководства допускают применение при ГВ с осторожностью.",
    pregnancyCategory: "B"
  },

  administration: "Вводится только п/к (передне/заднебоковая поверхность брюшной стенки). Не удалять воздушный пузырёк из шприца, не массировать место инъекции.",
  pearls: [
    "Не вводить эноксапарин внутримышечно",
    "Всегда учитывать функцию почек и возраст при выборе дозы", 
    "Фиксировать время последней дозы перед нейроаксиальной анестезией"
  ],

  guidelineUsage: {
    eu: [
      {
        guideCode: "ESC NSTE-ACS 2020",
        guideSection: "Раздел 7 – Антикоагулянтная терапия при NSTE-ACS",
        indicationSummary: "Один из препаратов выбора для парентеральной антикоагуляции при NSTE-ACS",
        link: "https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines/Acute-Coronary-Syndromes-ACS-in-patients-presenting-without-persistent-ST-segment-elevation",
        recommendationClass: "I",
        evidenceLevel: "A"
      },
      {
        guideCode: "ESC VTE 2021",
        guideSection: "Лечение острого ТГВ/ТЭЛА",
        indicationSummary: "Рассматривается как стандартная начальная терапия ТГВ/ТЭЛА с последующим переходом на пероральные антикоагулянты",
        link: "https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines/Venous-Thrombo-Embolism-Guidelines",
        recommendationClass: "I",
        evidenceLevel: "A"
      }
    ],
    us: [
      {
        guideCode: "ACC/AHA NSTE-ACS 2022", 
        guideSection: "Anticoagulant Therapy in NSTE-ACS",
        indicationSummary: "Рекомендован как предпочтительный вариант антикоагуляции у пациентов с NSTE-ACS",
        link: "https://www.acc.org/guidelines/hubs/acute-coronary-syndrome",
        recommendationClass: "I",
        evidenceLevel: "A"
      },
      {
        guideCode: "CHEST VTE Guidelines 2021",
        guideSection: "Initial parenteral anticoagulation",
        indicationSummary: "Включён как вариант начальной парентеральной терапии при ТГВ/ТЭЛА",
        link: "https://journal.chestnet.org/article/S0012-3692(21)01507-3/fulltext",
        recommendationClass: "I", 
        evidenceLevel: "B"
      }
    ]
  },

  updatedAt: new Date().toISOString(),
  published: true,
  verified: true
};
