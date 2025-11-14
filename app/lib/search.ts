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
    .filter(drug => {
      // аккуратно достаём description, даже если его нет в типе
      const description = (drug as any).description as string | undefined;

      return (
        drug.genericName.toLowerCase().includes(lowerQuery) ||
        drug.tradeNames.some(name => name.toLowerCase().includes(lowerQuery)) ||
        drug.therapeuticClass.toLowerCase().includes(lowerQuery) ||
        (description && description.toLowerCase().includes(lowerQuery)) // 👈 добавили поиск по описанию
      );
    })
    .map(drug => ({
      id: drug.id,
      type: 'drug' as const,
      title: drug.genericName,
      description: `Торговые названия: ${dr

