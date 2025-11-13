// components/Header.tsx - ПОЛНЫЙ КОД
'use client';

import { useState, useRef, useEffect } from 'react';
import { globalSearch, type SearchResult } from '@/app/lib/search';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Закрытие результатов при клике вне области
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Поиск при изменении запроса
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true);
        const results = await globalSearch(searchQuery);
        setSearchResults(results);
        setShowResults(true);
        setIsSearching(false);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  const handleResultClick = (url: string) => {
    window.location.href = url;
    setShowResults(false);
    setSearchQuery('');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <div className="flex items-center space-x-8">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#015d52] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">MedRadix</span>
            </a>
            
            {/* Навигация */}
            <nav className="hidden md:flex space-x-6">
              <a href="/drugs" className="text-gray-700 hover:text-[#015d52] transition-colors font-medium">
                Препараты
              </a>
              <a href="/guides" className="text-gray-700 hover:text-[#015d52] transition-colors font-medium">
                Гайды
              </a>
              <a href="/courses" className="text-gray-700 hover:text-[#015d52] transition-colors font-medium">
                Курсы
              </a>
            </nav>
          </div>

          {/* Поисковая строка */}
          <div ref={searchRef} className="relative w-96">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Поиск препаратов, гайдов, курсов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length > 1 && setShowResults(true)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#015d52] focus:border-[#015d52] transition-all bg-white"
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#015d52]"></div>
                </div>
              )}
            </div>

            {/* Результаты поиска */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
                <div className="p-2">
                  {searchResults.map((result, index) => (
                    <div
                      key={`${result.type}-${result.id}-${index}`}
                      onClick={() => handleResultClick(result.url)}
                      className="flex items-start p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 ${
                        result.type === 'drug' ? 'bg-blue-100 text-blue-600' :
                        result.type === 'guide' ? 'bg-green-100 text-green-600' :
                        result.type === 'course' ? 'bg-orange-100 text-orange-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {result.type === 'drug' && '💊'}
                        {result.type === 'guide' && '📚'}
                        {result.type === 'course' && '🎓'}
                        {result.type === 'disease' && '🫀'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-gray-900 group-hover:text-[#015d52] transition-colors truncate">
                            {result.title}
                          </h3>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full ml-2">
                            {result.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {result.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Футер результатов */}
                <div className="border-t border-gray-100 bg-gray-50 px-4 py-2">
                  <p className="text-xs text-gray-600 text-center">
                    Найдено результатов: {searchResults.length}
                  </p>
                </div>
              </div>
            )}

            {/* Сообщение если ничего не найдено */}
            {showResults && searchQuery.length > 1 && searchResults.length === 0 && !isSearching && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 text-gray-300">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-800 mb-1">Ничего не найдено</h3>
                <p className="text-sm text-gray-600">
                  Попробуйте изменить запрос или поищите в конкретном разделе
                </p>
                <div className="mt-3 flex justify-center space-x-3">
                  <a href="/drugs" className="text-xs text-[#015d52] hover:text-[#014a43] font-medium">
                    Все препараты
                  </a>
                  <a href="/guides" className="text-xs text-[#015d52] hover:text-[#014a43] font-medium">
                    Все гайды
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Кнопка входа/профиля */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-[#015d52] transition-colors">
              Войти
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

