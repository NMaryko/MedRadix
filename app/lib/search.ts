// lib/search.ts - БАЗОВАЯ ВЕРСИЯ
export async function globalSearch(query: string): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  
  // 🔍 ТОЛЬКО препараты (остальное - заглушки)
  const drugResults = searchInDrugs(query);
  results.push(...drugResults);

  // 🔍 Заглушки для будущих разделов
  if (query.includes('курс') || query.includes('обучение')) {
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

  if (query.includes('гайд') || query.includes('рекомендация')) {
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

  return results.sort((a, b) => b.relevance - a.relevance);
}
