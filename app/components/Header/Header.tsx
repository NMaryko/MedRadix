// app/components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import { Search, User, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();

  // Определяем активный раздел по текущему пути
  useEffect(() => {
    if (pathname === '/') {
      setActiveMenuItem(null);
      return;
    }

    // Ищем активный раздел
    const activeItem = MENU_ITEMS.find(item => {
      if (item.href === '/') return false;
      return pathname.startsWith(item.href);
    });

    setActiveMenuItem(activeItem?.name || null);
  }, [pathname]);

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

      {/* Панель поиска */}
      {isSearchOpen && (
        <div className="border-t border-[#015d52] bg-white/95 shadow-md">
          <div className="max-w-[1360px] mx-auto px-4 py-4 flex justify-center">
            <div className="w-full max-w-xl border border-[#015d52] rounded-lg shadow-[0_0_10px_rgba(1,93,82,0.25)]">
              <input
                type="text"
                placeholder="Поиск по гайдам, статьям, лекарствам..."
                className="w-full px-4 py-2.5 text-sm text-[#2b2115] placeholder-gray-500 bg-white border-none outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

