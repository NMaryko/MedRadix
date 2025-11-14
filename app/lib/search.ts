// app/lib/search.ts - ИСПРАВЛЕННЫЙ КОД
import { mockDrugsList } from '@/types/drug';

export interface SearchResult {
  id: string;
  type: 'drug' | 'guide' | 'article' | 'disease' | 'course';
  title: string;
  description: string;
  url: string;
  category?: string;
  relevance: number;
}

export async function globalSearch(query: string): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  const lowerQuery = query.toLowerCase().trim();

  if (!lowerQuery) return [];

  // 🔍 УПРОЩЕННЫЙ поиск по препаратам (без specialties)
  const drugResults = mockDrugsList
    .filter(drug =>
      drug.genericName.toLowerCase().includes(lowerQuery) ||
      drug.tradeNames.some(name => name.toLowerCase().includes(lowerQuery)) ||
      drug.therapeuticClass.toLowerCase().includes(lowerQuery) ||
      (drug.description && drug.description.toLowerCase().includes(lowerQuery)) // 👈 ДОБАВИЛИ ПОИСК ПО ОПИСАНИЮ
    )
    .map(drug => ({
      id: drug.id,
      type: 'drug' as const,
      title: drug.genericName,
      description: `Торговые названия: ${drug.tradeNames.join(', ')} • ${drug.therapeuticClass}`,
      url: `/drugs/${drug.slug}`,
      category: 'Препараты',
      relevance: calculateRelevance(drug.genericName, lowerQuery, 100)
    }));

  results.push(...drugResults);

  // 🔍 Заглушки для будущих разделов
  if (lowerQuery.includes('курс') || lowerQuery.includes('обучение')) {
    results.push({
      id: 'courses-coming-soon',
      type: 'course',
      title: 'Курсы MedRadix',
      description: 'Раздел курсов находится в разработке. Скоро появится!',
      url: '/courses',
      category: 'Курсы',
      relevance: 50
    });
  }

  if (lowerQuery.includes('гайд') || lowerQuery.includes('рекомендация')) {
    results.push({
      id: 'guides-coming-soon',
      type: 'guide',
      title: 'Клинические рекомендации',
      description: 'База гайдов ESC, ACC/AHA и других организаций',
      url: '/guides',
      category: 'Гайды',
      relevance: 50
    });
  }

  if (lowerQuery.includes('болезнь') || lowerQuery.includes('заболевание')) {
    results.push({
      id: 'diseases-coming-soon',
      type: 'disease',
      title: 'База заболеваний',
      description: 'Информация о заболеваниях и подходах к лечению',
      url: '/diseases',
      category: 'Заболевания',
      relevance: 50
    });
  }

  return results.sort((a, b) => b.relevance - a.relevance);
}

function calculateRelevance(text: string, query: string, baseScore: number): number {
  const lowerText = text.toLowerCase();
  if (lowerText === query) return baseScore;
  if (lowerText.startsWith(query)) return baseScore * 0.9;
  if (lowerText.includes(query)) return baseScore * 0.7;
  return baseScore * 0.3;
}

