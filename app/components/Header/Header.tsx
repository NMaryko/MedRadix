// app/lib/search.ts - УНИВЕРСАЛЬНЫЙ ПОИСК ДЛЯ ВСЕХ РАЗДЕЛОВ
import { mockDrugsList } from '@/types/drug';

export interface SearchResult {
  id: string;
  type: 'drug' | 'guide' | 'article' | 'disease' | 'course' | 'calculator' | 'expert' | 'nurse';
  title: string;
  description: string;
  url: string;
  category?: string;
  relevance: number;
}

// 🔧 УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ДЛЯ ЛЮБЫХ ДАННЫХ
function searchInData<T>(
  data: T[],
  query: string,
  type: SearchResult['type'],
  category: string,
  fields: (keyof T)[],
  baseScore: number
): SearchResult[] {
  const lowerQuery = query.toLowerCase().trim();
  
  return data
    .filter(item =>
      fields.some(field => {
        const value = item[field];
        return typeof value === 'string' && value.toLowerCase().includes(lowerQuery);
      })
    )
    .map(item => {
      const titleField = fields[0]; // Первое поле используется как заголовок
      const title = String(item[titleField]);
      
      return {
        id: String((item as any).id || Math.random().toString()),
        type,
        title,
        description: `Найдено в разделе "${category}"`,
        url: (item as any).url || `/${type}s`,
        category,
        relevance: calculateRelevance(title, lowerQuery, baseScore)
      };
    });
}

// 📋 БАЗЫ ДАННЫХ ДЛЯ ВСЕХ РАЗДЕЛОВ (ПОКА ПУСТЫЕ - ЗАПОЛНИТЕ КОГДА БУДУТ ДАННЫЕ)

// Препараты (уже есть)
const drugsData = mockDrugsList;

// Гайды (добавьте данные когда будут)
const guidesData: any[] = [
  // Пример: { id: 'esc-acs', title: 'ESC Guidelines по ОКС', description: '...', url: '/guides/esc-acs' }
];

// Статьи (добавьте данные когда будут)
const articlesData: any[] = [
  // Пример: { id: 'mi-diagnosis', title: 'Диагностика инфаркта', description: '...', url: '/articles/mi-diagnosis' }
];

// Курсы (добавьте данные когда будут)  
const coursesData: any[] = [
  // Пример: { id: 'acs-course', title: 'ОКС для практиков', description: '...', url: '/courses/acs' }
];

// Калькуляторы (добавьте данные когда будут)
const calculatorsData: any[] = [
  // Пример: { id: 'grace-score', title: 'GRACE Score', description: '...', url: '/calculators/grace' }
];

// Эксперты (добавьте данные когда будут)
const expertsData: any[] = [
  // Пример: { id: 'cardio-expert', title: 'Кардиология сегодня', description: '...', url: '/experts/cardio' }
];

// Медсестрам (добавьте данные когда будут)
const nursesData: any[] = [
  // Пример: { id: 'injection-guide', title: 'Техника инъекций', description: '...', url: '/nurses/injections' }
];

// Заболевания (добавьте данные когда будут)
const diseasesData: any[] = [
  // Пример: { id: 'myocardial-infarction', title: 'Инфаркт миокарда', description: '...', url: '/diseases/mi' }
];

// 🎯 ГЛАВНАЯ ФУНКЦИЯ ПОИСКА
export async function globalSearch(query: string): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  const lowerQuery = query.toLowerCase().trim();

  if (!lowerQuery) return [];

  // 🔍 ПОИСК ПО ВСЕМ РАЗДЕЛАМ
  
  // Препараты
  results.push(...searchInData(drugsData, lowerQuery, 'drug', 'Препараты', 
    ['genericName', 'tradeNames', 'therapeuticClass'], 100));

  // Гайды
  results.push(...searchInData(guidesData, lowerQuery, 'guide', 'Гайды',
    ['title', 'description'], 95));

  // Статьи  
  results.push(...searchInData(articlesData, lowerQuery, 'article', 'Статьи',
    ['title', 'description'], 90));

  // Курсы
  results.push(...searchInData(coursesData, lowerQuery, 'course', 'Курсы',
    ['title', 'description'], 90));

  // Калькуляторы
  results.push(...searchInData(calculatorsData, lowerQuery, 'calculator', 'Калькуляторы',
    ['title', 'description'], 85));

  // Эксперты
  results.push(...searchInData(expertsData, lowerQuery, 'expert', 'Эксперты', 
    ['title', 'description'], 85));

  // Медсестрам
  results.push(...searchInData(nursesData, lowerQuery, 'nurse', 'Медсестрам',
    ['title', 'description'], 85));

  // Заболевания
  results.push(...searchInData(diseasesData, lowerQuery, 'disease', 'Заболевания',
    ['title', 'description'], 90));

  // 📢 ЗАГЛУШКИ - показывают что разделы есть
  if (lowerQuery.includes('гайд') && guidesData.length === 0) {
    results.push(createComingSoon('guide', 'Клинические рекомендации', 'guides', 50));
  }
  
  if (lowerQuery.includes('курс') && coursesData.length === 0) {
    results.push(createComingSoon('course', 'Обучающие курсы', 'courses', 50));
  }
  
  if (lowerQuery.includes('статья') && articlesData.length === 0) {
    results.push(createComingSoon('article', 'Медицинские статьи', 'articles', 50));
  }

  return results.sort((a, b) => b.relevance - a.relevance);
}

// 🛠️ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

function calculateRelevance(text: string, query: string, baseScore: number): number {
  const lowerText = text.toLowerCase();
  if (lowerText === query) return baseScore;
  if (lowerText.startsWith(query)) return baseScore * 0.9;
  if (lowerText.includes(query)) return baseScore * 0.7;
  return baseScore * 0.3;
}

function createComingSoon(type: SearchResult['type'], title: string, url: string, relevance: number): SearchResult {
  return {
    id: `${type}-coming-soon`,
    type,
    title,
    description: 'Раздел находится в разработке. Скоро появится!',
    url: `/${url}`,
    category: title,
    relevance
  };
}

// 📤 ФУНКЦИИ ДЛЯ ДОБАВЛЕНИЯ ДАННЫХ (ИСПОЛЬЗУЙТЕ КОГДА БУДУТ ДАННЫЕ)

export function addGuidesData(data: any[]) {
  guidesData.push(...data);
}

export function addArticlesData(data: any[]) {
  articlesData.push(...data);
}

export function addCoursesData(data: any[]) {
  coursesData.push(...data);
}

export function addCalculatorsData(data: any[]) {
  calculatorsData.push(...data);
}

export function addExpertsData(data: any[]) {
  expertsData.push(...data);
}

export function addNursesData(data: any[]) {
  nursesData.push(...data);
}

export function addDiseasesData(data: any[]) {
  diseasesData.push(...data);
}
