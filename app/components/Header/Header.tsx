// app/components/Header/Header.tsx - ПОЛНЫЙ КОД С export default
'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, User, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { globalSearch, type SearchResult } from '@/app/lib/search';

const MENU_ITEMS = [
  { name: 'Новое', href: '/news' },
  { name: 'Гайды', href: '/guides' },
  { name: 'Статьи', href: '/articles' },
  { name: 'Голос эксперта', href: '/experts' },
  { name: 'Курсы', href: '/courses' },
  { name: 'Калькуляторы', href: '/calculators' },
  { name: 'Лекарства', href: '/drugs' },
  { name: 'Медсестрам', href: '/nurses' },
];

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<'RU' | 'EN'>('RU');
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Закрытие результатов при клике вне области
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
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
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  // Определяем активный раздел по текущему пути
  useEffect(() => {
    if (pathname === '/') {
      setActiveMenuItem(null);
      return;
    }

    const activeItem = MENU_ITEMS.find(item => {
      if (item.href === '/') return false;
      return pathname.startsWith(item.href);
    });

    setActiveMenuItem(activeItem?.name || null);
  }, [pathname]);

  const handleResultClick = (url: string) => {
    window.location.href = url;
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      {/* Основная шапка */}
      <div className="max-w-[1360px] mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Логотип - ссылка на главную */}
        <Link href="/" className="flex flex-col hover:opacity-80 transition-opacity">
          <span className="text-2xl font-semibold text-[#2b2115]">
            MedRadix
          </span>
          <span className="text-xs text-[#7a6a55] italic mt-[-2px]">
            Scientia pro vita
          </span>
        </Link>

        {/* Гамбургер для мобильных */}
        <button
          className="lg:hidden p-2 text-[#4b3b2f]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Меню (центр) - скрыто на мобильных */}
        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center space-x-8">
            {MENU_ITEMS.map((item) => {
              const isActive = activeMenuItem === item.name;
              const isNovoje = item.name === 'Новое';

              return (
                <li key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={`inline-flex flex-col items-center transition-all duration-300 ${
                      isActive && !isNovoje
                        ? 'text-[26px] font-semibold text-[#01463d] leading-none'
                        : isActive && isNovoje
                        ? 'text-[26px] font-semibold text-[#e6a800] leading-none'
                        : isNovoje
                        ? 'text-[18px] font-medium text-[#e6a800]'
                        : 'text-[18px] font-medium text-[#4b3b2f] hover:text-[#015d52]'
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    
                    {/* Подчеркивание */}
                    <span
                      className={`mt-1 h-0.5 w-full origin-left transition-all duration-300 ${
                        isActive
                          ? 'scale-x-100'
                          : 'scale-x-0 group-hover:scale-x-100'
                      } ${
                        isNovoje ? 'bg-[#facc15]' : 'bg-[#015d52]'
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Правая часть: поиск, вход, язык - ВСЕГДА видна */}
        <div className="flex items-center space-x-5">
          {/* Лупа */}
          <button
            type="button"
            onClick={() => setIsSearchOpen((v) => !v)}
            className="text-[#4b3b2f] hover:text-[#015d52] transition-colors duration-200"
          >
            <Search size={22} />
          </button>

          {/* Кнопка Войти - иконка на мобильных, полная на десктопе */}
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-[#015d52] px-3 lg:px-4 py-1.5 text-sm font-medium text-white hover:bg-[#01463d] transition-colors duration-200"
          >
            <User size={16} />
            <span className="hidden lg:inline">Войти</span>
          </button>

          {/* Языки */}
          <div className="flex items-center gap-1 text-sm">
            <button
              type="button"
              onClick={() => setActiveLang('RU')}
              className={
                activeLang === 'RU'
                  ? 'font-semibold text-[#015d52]'
                  : 'text-[#4b3b2f] hover:text-[#015d52]'
              }
            >
              RU
            </button>
            <span className="text-[#c4b9aa]">/</span>
            <button
              type="button"
              onClick={() => setActiveLang('EN')}
              className={
                activeLang === 'EN'
                  ? 'font-semibold text-[#015d52]'
                  : 'text-[#4b3b2f] hover:text-[#015d52]'
              }
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню - ТОЛЬКО разделы */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="max-w-[1360px] mx-auto px-4 py-4">
            <nav className="space-y-3">
              {MENU_ITEMS.map((item) => {
                const isActive = activeMenuItem === item.name;
                const isNovoje = item.name === 'Новое';
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block w-full text-left py-3 px-4 transition-all duration-200 ${
                      isActive && !isNovoje
                        ? 'text-[22px] font-semibold text-[#01463d]'
                        : isActive && isNovoje
                        ? 'text-[22px] font-semibold text-[#e6a800]'
                        : isNovoje
                        ? 'text-[#e6a800] hover:bg-[#facc15]/5'
                        : 'text-[18px] text-[#4b3b2f] hover:bg-gray-50'
                    } rounded-lg border border-gray-100`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Панель поиска с УМНЫМ ПОИСКОМ */}
      {isSearchOpen && (
        <div ref={searchRef} className="border-t border-[#015d52] bg-white/95 shadow-md">
          <div className="max-w-[1360px] mx-auto px-4 py-4">
            <div className="w-full max-w-xl mx-auto relative">
              <div className="border border-[#015d52] rounded-lg shadow-[0_0_10px_rgba(1,93,82,0.25)] bg-white">
                <input
                  type="text"
                  placeholder="Поиск по гайдам, статьям, лекарствам..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm text-[#2b2115] placeholder-gray-500 bg-white border-none outline-none rounded-lg"
                />
                
                {/* Индикатор загрузки */}
                {isSearching && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#015d52]"></div>
                  </div>
                )}
              </div>

              {/* Результаты поиска */}
              {searchQuery.length > 1 && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#015d52] rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
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
                  
                  <div className="border-t border-gray-100 bg-gray-50 px-4 py-2">
                    <p className="text-xs text-gray-600 text-center">
                      Найдено результатов: {searchResults.length}
                    </p>
                  </div>
                </div>
              )}

              {/* Сообщение если ничего не найдено */}
              {searchQuery.length > 1 && searchResults.length === 0 && !isSearching && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 text-gray-300">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-800 mb-1">Ничего не найдено</h3>
                  <p className="text-sm text-gray-600">
                    Попробуйте изменить запрос
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}






