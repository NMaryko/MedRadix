// app/components/Header.tsx
'use client';

import { useState } from 'react';
import { Search, User } from 'lucide-react';

const menuItems = [
  'Новое',
  'Гайды',
  'Статьи',
  'Голос эксперта',
  'Курсы',
  'Калькуляторы',
  'Лекарства',
  'Медсестрам',
];

// пока везде НЕТ новостей – всё зелёное
// когда появятся новости в разделе, просто поменяем false → true
const hasNews: Record<string, boolean> = {
  'Новое': false,
  'Гайды': false,
  'Статьи': false,
  'Голос эксперта': false,
  'Курсы': false,
  'Калькуляторы': false,
  'Лекарства': false,
  'Медсестрам': false,
};

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<'RU' | 'EN'>('RU');

  return (
    <header className="bg-white border-b border-gray-100">
      {/* Основная шапка */}
      <div className="max-w-[1360px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <div className="flex-shrink-0">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900 font-serif">
                MedRadix
              </span>
              <span className="text-xs text-gray-600 italic -mt-1">
                Scientia pro vita
              </span>
            </div>
          </div>

          {/* Центральное меню */}
          <nav className="flex-1 flex justify-center">
            <ul className="flex items-center space-x-8">
              {menuItems.map((item) => {
                const underlineColor = hasNews[item]
                  ? 'bg-yellow-500'
                  : 'bg-[#015d52]';

                return (
                  <li key={item} className="relative">
                    <button
                      className={`text-sm font-medium transition-colors duration-200 group ${
                        item === 'Новое'
                          ? 'text-yellow-600'
                          : 'text-gray-800'
                      } hover:text-[#015d52]`}
                    >
                      {item}
                      {/* Полоса под пунктом меню (появляется при ховере) */}
                      <span
                        className={`pointer-events-none absolute -bottom-1 left-0 w-full h-0.5 ${underlineColor} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Правая часть */}
          <div className="flex items-center space-x-6">
            {/* Лупа */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-800 hover:text-[#015d52] transition-colors duration-200"
              aria-label="Поиск"
            >
              <Search size={20} />
            </button>

            {/* Кнопка Войти — зелёная, текст и иконка белые */}
            <button className="flex items-center space-x-2 bg-[#015d52] text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#01463d] transition-colors duration-200">
              <User size={16} />
              <span>Войти</span>
            </button>

            {/* Переключатель языков: RU / EN после кнопки */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setActiveLang('RU')}
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeLang === 'RU'
                    ? 'text-[#015d52]'
                    : 'text-gray-800 hover:text-[#015d52]'
                }`}
              >
                RU
              </button>

              <span className="text-gray-400">/</span>

              <button
                onClick={() => setActiveLang('EN')}
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeLang === 'EN'
                    ? 'text-[#015d52]'
                    : 'text-gray-800 hover:text-[#015d52]'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Панель поиска — узкая, по центру, с полями слева/справа */}
      {isSearchOpen && (
        <div className="border-t border-[#015d52] bg-white shadow-lg">
          <div className="max-w-[1360px] mx-auto px-4 py-4 flex justify-center">
            <div className="w-full max-w-xl border-2 border-[#015d52] rounded-lg shadow-[0_0_10px_rgba(1,93,82,0.2)]">
              <input
                type="text"
                placeholder="Поиск по гайдам, статьям, лекарствам..."
                className="w-full px-4 py-3 text-gray-900 placeholder-gray-500 border-none outline-none bg-transparent"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


