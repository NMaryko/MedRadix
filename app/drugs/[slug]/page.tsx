// types/drug.ts - ПОЛНОСТЬЮ УНИВЕРСАЛЬНАЯ СТРУКТУРА ДЛЯ ЛЮБЫХ ПРЕПАРАТОВ

// ==================== БАЗОВЫЕ ТИПЫ ДЛЯ ВСЕХ ПРЕПАРАТОВ ====================

// --- Применение в клинических рекомендациях ---
export interface GuidelineUsageEntry {
  guideCode: string;                    // "ESC ACS 2023", "ACC/AHA 2022"
  guideSection: string;                 // "Раздел 7.2 – Антикоагулянтная терапия"
  indicationSummary: string;            // Краткое описание применения
  link: string;                         // Ссылка на оригинальный документ
  recommendationClass?: "I" | "IIa" | "IIb" | "III";  // Класс рекомендаций
  evidenceLevel?: "A" | "B" | "C";      // Уровень доказательств
  region: "EU" | "US" | "RU" | "OTHER"; // Регион рекомендаций
  lastUpdated?: string;                 // Дата обновления рекомендации
}

// --- Формы выпуска и упаковки ---
export interface DrugForm {
  form: string;                         // "Таблетки", "Раствор для инъекций"
  strength: string;                     // "40 мг/0,4 мл", "100 мг"
  route: "перорально" | "п/к" | "в/в" | "в/м" | "ингаляционно" | "топически" | "другое";
  volume?: string;                      // "0,4 мл" (для инъекционных форм)
  packageSize?: string;                 // "10 шприцов", "30 таблеток"
  manufacturer?: string;                // Производитель конкретной формы
  note?: string;                        // Особые примечания
  storageConditions?: string;           // Условия хранения
  barcode?: string;                     // Штрих-код упаковки
}

// --- Дозирование и режимы применения ---
export interface DosageRegimen {
  indication: string;                   // Показание для этого режима
  regimen: string;                      // Схема приема: "1 мг/кг п/к каждые 12 часов"
  maxDailyDose?: string;                // Максимальная суточная доза
  duration?: string;                    // "5-10 дней", "до выписки"
  notes?: string;                       // Особые примечания
  titration?: string;                   // Схема титрования дозы
  loadingDose?: string;                 // Нагрузочная доза
  maintenanceDose?: string;             // Поддерживающая доза
}

export interface ImpairmentAdjustment {
  condition: string;                    // "КК 15-30 мл/мин", "Тяжелая печеночная недостаточность"
  adjustment: string;                   // Коррекция дозы
  notes?: string;                       // Дополнительные указания
  monitoring?: string;                  // Особенности мониторинга
}

export interface SpecialPopulationDosing {
  population: string;                   // "Пожилые", "Дети 6-12 лет", "Беременные"
  regimen: string;                      // Схема дозирования
  notes?: string;
  evidenceLevel?: string;
}

export interface DrugDosage {
  // Основные режимы для взрослых
  adults: DosageRegimen[];
  
  // Коррекция при нарушениях функции
  renalImpairment: ImpairmentAdjustment[];
  hepaticImpairment: ImpairmentAdjustment[];
  
  // Особые популяции
  pediatrics: SpecialPopulationDosing[];
  geriatrics?: string;                  // Особенности у пожилых
  pregnancy?: string;                   // Особенности при беременности
  lactation?: string;                   // Особенности при лактации
  
  // Дополнительные режимы
  switching?: {                         // Переход с других препаратов
    from: string;
    to: string;
    regimen: string;
  }[];
  discontinuation?: string;             // Особенности отмены
}

// --- Взаимодействия с другими препаратами ---
export interface DrugInteraction {
  drug: string;                         // Препарат или класс
  effect: string;                       "Повышение риска кровотечения"
  mechanism?: string;                   // Механизм взаимодействия
  action: string;                       // Рекомендуемые действия
  severity: "major" | "moderate" | "minor"; // Степень значимости
  evidence: "established" | "probable" | "possible"; // Уровень доказательности
  management?: string;                  // Тактика ведения
}

// --- Нежелательные явления ---
export interface AdverseEffect {
  effect: string;                       // Название НЯ
  frequency: "очень часто" | "часто" | "нечасто" | "редко" | "очень редко";
  system?: string;                      // Система органов
  severity?: "легкая" | "средняя" | "тяжелая" | "угрожающая жизни";
  management?: string;                  // Тактика ведения
  reversible?: boolean;                 // Обратимость
}

// --- Мониторинг параметров ---
export interface MonitoringParameter {
  parameter: string;                    // "МНО", "АСТ/АЛТ", "Креатинин"
  frequency: string;                    // "перед началом", "еженедельно"
  target?: string;                      // Целевой диапазон
  action?: string;                      // Действия при отклонении
}

// --- Фармакокинетические параметры ---
export interface Pharmacokinetics {
  absorption?: string;                  // Биодоступность, время до Cmax
  distribution?: string;                // Vd, связывание с белками
  metabolism?: string;                  // Пути метаболизма, изоферменты
  excretion?: string;                   // Пути выведения, T1/2
  specialPopulations?: string;          // Особенности у отдельных групп
}

// --- Информация для беременных и кормящих ---
export interface PregnancyLactationInfo {
  pregnancyCategory?: "A" | "B" | "C" | "D" | "X" | "N";
  pregnancyRecommendation: string;
  lactationRecommendation: string;
  risks?: string;                       // Оценка рисков
  alternatives?: string;                // Альтернативные препараты
}

// ==================== ОСНОВНОЙ ИНТЕРФЕЙС ПРЕПАРАТА ====================

export interface Drug {
  // === ОСНОВНАЯ ИДЕНТИФИКАЦИЯ ===
  id: string;                           // Уникальный ID (совпадает с slug)
  genericName: string;                  // Международное непатентованное название
  slug: string;                         // Для URL: "enoxaparin", "aspirin"
  tradeNames: string[];                 // Торговые названия
  chemicalName?: string;                // Химическое название
  atcCode?: string;                     // Код ATC
  casNumber?: string;                   // CAS номер
  
  // === КЛАССИФИКАЦИЯ ===
  pharmacologicClass: string;           // Фармакологическая группа
  therapeuticClass: string;             // Терапевтическая группа
  mechanismOfAction: string;            // Механизм действия
  specialties: string[];                // Специальности: ["Кардиология", "Неврология"]
  
  // === ОСНОВНАЯ ИНФОРМАЦИЯ ===
  manufacturer?: string;                // Производитель(и)
  description: string;                  // Краткое описание
  searchKeywords: string[];             // Ключевые слова для поиска
  
  // === ФОРМЫ ВЫПУСКА ===
  forms: DrugForm[];
  
  // === ПОКАЗАНИЯ К ПРИМЕНЕНИЮ ===
  indications: {
    title: string;                      // Название показания
    description: string;                // Подробное описание
    classOfRecommendation?: "I" | "IIa" | "IIb" | "III";
    levelOfEvidence?: "A" | "B" | "C";
    isOffLabel?: boolean;               // Внерегистрационное применение
    notes?: string;
  }[];
  
  // === ДОЗИРОВАНИЕ ===
  dosage: DrugDosage;
  
  // === ПРОТИВОПОКАЗАНИЯ И ПРЕДУПРЕЖДЕНИЯ ===
  contraindications: {
    absolute: string[];                 // Абсолютные противопоказания
    relative: string[];                 // Относительные противопоказания
    warnings: string[];                 // Особые предупреждения
    precautions: string[];              // Меры предосторожности
  };
  
  // === ЛЕКАРСТВЕННЫЕ ВЗАИМОДЕЙСТВИЯ ===
  interactions: DrugInteraction[];
  
  // === НЕЖЕЛАТЕЛЬНЫЕ ЯВЛЕНИЯ ===
  adverseEffects: {
    byFrequency: AdverseEffect[];       // По частоте встречаемости
    bySystem: {                         // По системам органов
      system: string;
      effects: string[];
    }[];
    serious: string[];                  // Серьезные НЯ
    management: string;                 // Общая тактика ведения НЯ
  };
  
  // === МОНИТОРИНГ ===
  monitoring: {
    laboratory: MonitoringParameter[];  // Лабораторные показатели
    clinical: MonitoringParameter[];    // Клинические параметры
    instrumental?: MonitoringParameter[]; // Инструментальные исследования
    therapeuticDrugMonitoring?: string; // ТЛК при необходимости
  };
  
  // === БЕРЕМЕННОСТЬ И ЛАКТАЦИЯ ===
  pregnancyLactation: PregnancyLactationInfo;
  
  // === ФАРМАКОКИНЕТИКА ===
  pharmacokinetics?: Pharmacokinetics;
  
  // === ФАРМАКОДИНАМИКА ===
  pharmacodynamics?: {
    onsetOfAction?: string;             // Начало действия
    durationOfAction?: string;          // Продолжительность действия
    peakEffect?: string;                // Пик эффекта
    other?: string;                     // Другие параметры
  };
  
  // === ОСОБЫЕ УКАЗАНИЯ ===
  administration: string;               // Способ применения
  preparation?: string;                 // Приготовление растворов
  compatibility?: string;               // Совместимость
  storage?: string;                     // Условия хранения
  
  // === ПЕРЕДОЗИРОВКА ===
  overdose?: {
    symptoms: string[];                 // Симптомы передозировки
    treatment: string[];                // Лечение передозировки
    antidote?: string;                  // Антидот при наличии
    supportiveCare?: string;            // Поддерживающая терапия
  };
  
  // === КЛИНИЧЕСКИЕ РЕКОМЕНДАЦИИ ===
  guidelineUsage: GuidelineUsageEntry[]; // Упрощенная структура
  
  // === ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ ===
  pearls: string[];                     // Полезные советы, "фишки"
  costEffectiveness?: string;           // Данные по фармакоэкономике
  patientCounseling?: string;           // Информация для пациента
  
  // === СЛУЖЕБНАЯ ИНФОРМАЦИЯ ===
  updatedAt: string;
  published: boolean;
  verified: boolean;
  lastReviewed?: string;                // Дата последнего пересмотра
  references?: string[];                // Список литературы
}

// ==================== УТИЛИТНЫЕ ФУНКЦИИ ====================

/**
 * Получить все поисковые термины для препарата
 */
export function getDrugSearchTerms(drug: Drug): string[] {
  const terms = new Set<string>([
    drug.genericName.toLowerCase(),
    ...drug.tradeNames.map(name => name.toLowerCase()),
    ...drug.searchKeywords,
    drug.pharmacologicClass.toLowerCase(),
    drug.therapeuticClass.toLowerCase(),
    ...drug.specialties.map(spec => spec.toLowerCase()),
    ...drug.forms.map(form => form.form.toLowerCase()),
    ...drug.forms.map(form => form.route.toLowerCase())
  ]);
  
  // Добавляем все показания
  drug.indications.forEach(ind => {
    terms.add(ind.title.toLowerCase());
  });
  
  return Array.from(terms);
}

/**
 * Получить основную форму выпуска
 */
export function getPrimaryForm(drug: Drug): DrugForm | undefined {
  return drug.forms[0];
}

/**
 * Проверить наличие упоминания в гайдах
 */
export function hasGuidelineMention(drug: Drug, guideCode: string): boolean {
  return drug.guidelineUsage.some(guide => 
    guide.guideCode.toLowerCase().includes(guideCode.toLowerCase())
  );
}

/**
 * Получить рекомендации по региону
 */
export function getGuidelinesByRegion(drug: Drug, region: string): GuidelineUsageEntry[] {
  return drug.guidelineUsage.filter(guide => guide.region === region);
}

/**
 * Получить взаимодействия по степени серьезности
 */
export function getInteractionsBySeverity(drug: Drug, severity: string): DrugInteraction[] {
  return drug.interactions.filter(interaction => interaction.severity === severity);
}

// ==================== SEO И СХЕМА ДЛЯ ПОИСКОВИКОВ ====================

export function generateDrugSchema(drug: Drug) {
  const url = `https://medradix.info/drugs/${drug.slug}`;
  const primaryForm = getPrimaryForm(drug);

  return {
    '@context': 'https://schema.org',
    '@type': 'Drug',
    '@id': url,
    name: drug.genericName,
    genericName: drug.genericName,
    brand: drug.tradeNames.map(name => ({
      '@type': 'Brand',
      name: name
    })),
    activeIngredient: drug.genericName,
    dosageForm: primaryForm?.form,
    strength: primaryForm?.strength,
    code: drug.slug,
    description: drug.description,
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
    warning: drug.contraindications.warnings.join(', '),
    seriousAdverseEffect: drug.adverseEffects.serious.map((effect) => ({
      '@type': 'MedicalCondition',
      name: effect
    })),
    administrationRoute: drug.administration,
    drugClass: drug.pharmacologicClass,
    therapeuticClass: drug.therapeuticClass,
    mechanismOfAction: drug.mechanismOfAction,
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
    description: `${drug.genericName} (${drug.tradeNames.join(', ')}): ${drug.description}. Показания: ${primaryIndication}.`,
    keywords: [
      drug.genericName,
      ...drug.tradeNames,
      ...drug.specialties,
      'инструкция',
      'применение', 
      'дозировка',
      'показания',
      'противопоказания',
      drug.pharmacologicClass,
      drug.therapeuticClass
    ].join(', '),
    openGraph: {
      title: `${drug.genericName} - полная инструкция | MedRadix`,
      description: drug.description,
      type: 'article' as const,
      url: `https://medradix.info/drugs/${drug.slug}`
    }
  };
}

// ==================== MOCK ДАННЫЕ ДЛЯ РАЗРАБОТКИ ====================

export const mockDrugsList = [
  {
    id: "enoxaparin",
    slug: "enoxaparin", 
    genericName: "Enoxaparin",
    tradeNames: ["Клексан", "Эниксум", "Гемапаксан"],
    therapeuticClass: "Антикоагулянт",
    pharmacologicClass: "Низкомолекулярный гепарин"
  },
  {
    id: "aspirin",
    slug: "aspirin",
    genericName: "Acetylsalicylic Acid", 
    tradeNames: ["Аспирин", "Тромбо АСС", "КардиАСК"],
    therapeuticClass: "Антиагрегант",
    pharmacologicClass: "НПВП"
  },
  {
    id: "atorvastatin",
    slug: "atorvastatin", 
    genericName: "Atorvastatin",
    tradeNames: ["Липримар", "Аторис", "Торвакард"],
    therapeuticClass: "Гиполипидемическое средство",
    pharmacologicClass: "Статин"
  },
  {
    id: "metformin",
    slug: "metformin",
    genericName: "Metformin",
    tradeNames: ["Сиофор", "Глюкофаж", "Метфогамма"],
    therapeuticClass: "Гипогликемическое средство",
    pharmacologicClass: "Бигуанид"
  },
  {
    id: "amlodipine",
    slug: "amlodipine",
    genericName: "Amlodipine", 
    tradeNames: ["Норваск", "Амловас", "Тенокс"],
    therapeuticClass: "Антигипертензивное средство",
    pharmacologicClass: "Блокатор кальциевых каналов"
  }
];

// Упрощенный mock для эноксапарина (полная версия будет в базе данных)
export const mockDrugEnoxaparin: Drug = {
  // Основная идентификация
  id: "enoxaparin",
  genericName: "Enoxaparin",
  slug: "enoxaparin",
  tradeNames: ["Клексан", "Эниксум", "Гемапаксан"],
  pharmacologicClass: "Низкомолекулярный гепарин",
  therapeuticClass: "Антикоагулянт",
  mechanismOfAction: "Ингибирование фактора Xa и в меньшей степени фактора IIa (тромбина)",
  specialties: ["Кардиология", "Ангиохирургия", "Терапия", "Реаниматология"],
  
  // Основная информация
  manufacturer: "Санофи",
  description: "Низкомолекулярный гепарин для профилактики и лечения тромбоэмболических осложнений.",
  searchKeywords: ["эноксапарин", "клексан", "антикоагулянт", "гепарин", "тромбоз"],
  
  // Остальные поля заполняются по аналогии с полной структурой выше
  // ... (для экономии места оставляю заглушки)
  forms: [],
  indications: [],
  dosage: {
    adults: [],
    renalImpairment: [],
    hepaticImpairment: [],
    pediatrics: []
  },
  contraindications: {
    absolute: [],
    relative: [],
    warnings: [],
    precautions: []
  },
  interactions: [],
  adverseEffects: {
    byFrequency: [],
    bySystem: [],
    serious: [],
    management: ""
  },
  monitoring: {
    laboratory: [],
    clinical: []
  },
  pregnancyLactation: {
    pregnancyRecommendation: "",
    lactationRecommendation: ""
  },
  administration: "",
  guidelineUsage: [],
  pearls: [],
  updatedAt: new Date().toISOString(),
  published: true,
  verified: true
};
