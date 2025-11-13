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
// === MOCK DATA ===
// Временные данные для разработки

export const mockDrugEnoxaparin: Drug = {
  id: "enoxaparin",
  genericName: "Enoxaparin",
  slug: "enoxaparin", 
  tradeNames: ["Клексан", "Эниксум", "Гемапаксан"],
  atcCode: "B01AB05",
  pharmacologicClass: "Низкомолекулярный гепарин",
  therapeuticClass: "Антикоагулянт",
  specialties: ["Кардиология", "Ангиохирургия", "Терапия", "Реаниматология"],
  manufacturer: "Разные производители (Sanofi и др.)",
  description: "Низкомолекулярный гепарин для профилактики и лечения тромбоэмболических осложнений.",
  
  // Обязательные поля
  indications: [
    {
      title: "Острый коронарный синдром без подъёма ST (NSTE-ACS)",
      description: "Антикоагулянтная терапия у пациентов с нестабильной стенокардией и NSTEMI",
      classOfRecommendation: "I",
      levelOfEvidence: "A"
    }
  ],
  forms: [
    {
      form: "Раствор для инъекций",
      strength: "40 мг/0,4 мл", 
      route: "п/к"
    }
  ],
  dosage: {
    adults: [
      {
        indication: "NSTE-ACS",
        regimen: "1 мг/кг п/к каждые 12 часов"
      }
    ],
    renalImpairment: [],
    hepaticImpairment: [], 
    pediatrics: []
  },
  contraindications: {
    absolute: ["Активное кровотечение"],
    relative: []
  },
  interactions: [],
  adverseEffects: {
    common: [],
    serious: []
  },
  monitoring: {
    laboratory: [],
    clinical: []
  },
  pregnancyLactation: {
    pregnancy: "",
    lactation: ""
  },
  pearls: [],
  guidelineUsage: {
    eu: [],
    us: []
  },
  updatedAt: new Date().toISOString(),
  published: true,
  verified: true
};
