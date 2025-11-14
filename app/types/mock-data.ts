import { Drug } from './drug';

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
  
  // Добавьте минимальные обязательные поля чтобы избежать ошибок
  indications: [],
  forms: [],
  dosage: {
    adults: [],
    renalImpairment: [],
    hepaticImpairment: [],
    pediatrics: []
  },
  contraindications: {
    absolute: [],
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
