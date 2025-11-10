// app/components/Header.tsx
'use client';

import { useState } from 'react';
import { Search, User, Menu, X } from 'lucide-react';

const MENU_ITEMS = [
  'Новое',
  'Гайды', 
  'Статьи',
  'Голос эксперта',
  'Курсы',
  'Калькуляторы',
  'Лекарства',
  'Медсестрам',
];

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<'RU' | 'EN'>('RU');
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      {/* Основная шапка */}
      <div className="max-w-[1360px] mx-auto px-4 py-3 flex items-center justify-between">
        {/* Логотип */}
        <div className="flex flex-col">
          <span className="text-xl md:text-2xl font-semibold text-[#2b2115]">
            MedRadix
          </span>
          <span className="text-xs text-[#7a6a55] italic mt-[-2px]">
            Scientia pro vita
          </span>
        </div>

        {/* Гамбургер для мобильных */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Меню (центр) - скрыто на мобильных */}
        <nav className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center space-x-4 xl:space-x-7">
            {MENU_ITEMS.map((item) => {
              const isActive = activeMenuItem === item;
              const isNovoje = item === 'Новое';

              return (
                <li key={item} className="relative group">
                  <button
                    type="button"
                    onClick={() => setActiveMenuItem(item)}
                    className={`inline-flex flex-col items-center font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-[18px] md:text-[20px] scale-105'
                        : 'text-[17px] md:text-lg'
                    } ${
                      isNovoje
                        ? 'text-[#e6a800]'
                        : 'text-[#4b3b2f] hover:text-[#015d52]'
                    }`}
                  >
                    <span>{item}</span>
                    <span
                      className={`mt-1 h-0.5 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                        isNovoje ? 'bg-[#facc15]' : 'bg-[#015d52]'
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Правая часть: поиск, вход, язык - скрыто на мобильных */}
        <div className="hidden lg:flex items-center space-x-5">
          <button
            type="button"
            onClick={() => setIsSearchOpen((v) => !v)}
            className="ml-6 mr-4 text-[#4b3b2f] hover:text-[#015d52] transition-colors duration-200"
          >
            <Search size={22} />
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-[#015d52] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#01463d] transition-colors duration-200"
          >
            <User size={14} />
            <span>Войти</span>
          </button>

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

      {/* Мобильное меню */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="max-w-[1360px] mx-auto px-4 py-4">
            <nav className="space-y-4">
              {MENU_ITEMS.map((item) => {
                const isNovoje = item === 'Новое';
                return (
                  <button
                    key={item}
                    type="button"
                    className={`block w-full text-left py-2 px-4 text-lg font-medium ${
                      isNovoje ? 'text-[#e6a800]' : 'text-[#4b3b2f]'
                    } hover:bg-gray-50 rounded-lg`}
                    onClick={() => {
                      setActiveMenuItem(item);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item}
                  </button>
                );
              })}
              
              <div className="pt-4 border-t flex items-center justify-between">
                <button className="flex items-center gap-2 text-[#015d52] font-medium">
                  <User size={16} />
                  Войти
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveLang('RU')}
                    className={activeLang === 'RU' ? 'font-semibold text-[#015d52]' : 'text-gray-600'}
                  >
                    RU
                  </button>
                  <span className="text-gray-400">/</span>
                  <button
                    onClick={() => setActiveLang('EN')}
                    className={activeLang === 'EN' ? 'font-semibold text-[#015d52]' : 'text-gray-600'}
                  >
                    EN
                  </button>
                </div>
              </div>
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


