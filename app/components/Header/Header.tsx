'use client';

import { useState } from 'react';
import { Search, User } from 'lucide-react';

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

const HAS_NEWS: Record<string, boolean> = {
  'Новое': true,
  'Гайды': false,
  'Статьи': true,
  'Голос эксперта': false,
  'Курсы': false,
  'Калькуляторы': false,
  'Лекарства': true,
  'Медсестрам': false,
};

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<'RU' | 'EN'>('RU');

  return (
    <header className="w-full border-b border-slate-100 bg-white">
      {/* Верхняя полоса с логотипом, меню и кнопками */}
      <div className="max-w-[1360px] mx-auto px-4 lg:px-6 py-3 flex items-center justify-between gap-6">
        {/* ЛОГОТИП */}
        <div className="flex-shrink-0">
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-semibold text-slate-900">MedRadix</span>
            <span className="text-[11px] text-slate-500 italic mt-[-2px]">
              Scientia pro vita
            </span>
          </div>
        </div>

        {/* МЕНЮ */}
        <nav className="flex-1 hidden md:flex justify-center">
          <ul className="flex items-center gap-6 lg:gap-8 text-sm">
            {MENU_ITEMS.map((item) => (
              <li key={item} className="relative">
                <button
                  className={`
                    group pb-1 transition-colors duration-200
                    ${item === 'Новое' ? 'text-yellow-600' : 'text-[#3b3028]'}
                    hover:text-[#015d52]
                  `}
                >
                  {item}
                  {/* Линия под пунктом меню */}
                  <span
                    className={`
                      pointer-events-none absolute left-0 -bottom-[6px] h-[2px] w-full
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200
                      ${HAS_NEWS[item] ? 'bg-yellow-500' : 'bg-[#015d52]'}
                    `}
                  />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* ПРАВАЯ ЧАСТЬ: ПОИСК, ЯЗЫК, ВОЙТИ */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Лупа */}
          <button
            onClick={() => setIsSearchOpen((prev) => !prev)}
            className="text-[#3b3028] hover:text-[#015d52] transition-colors"
            aria-label="Поиск"
          >
            <Search size={20} />
          </button>

          {/* ЯЗЫКИ */}
          <div className="hidden sm:flex items-center gap-1 text-sm">
            {(['RU', 'EN'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`
                  px-1 transition-colors duration-200
                  ${activeLang === lang
                    ? 'text-[#015d52]'
                    : 'text-[#3b3028] hover:text-[#015d52]'}
                `}
              >
                {lang}
              </button>
            ))}
            <span className="text-slate-400">/</span>
          </div>

          {/* ВОЙТИ */}
          <button className="inline-flex items-center gap-2 rounded-full border border-[#015d52] px-3 py-1 text-sm font-medium text-[#015d52] hover:bg-[#015d52] hover:text-white transition-colors">
            <User size={16} />
            <span>Войти</span>
          </button>
        </div>
      </div>

      {/* ПАНЕЛЬ ПОИСКА ПОД ШАПКОЙ */}
      {isSearchOpen && (
        <div className="border-t border-[#015d52] bg-white shadow-[0_0_10px_rgba(1,93,82,0.25)]">
          <div className="max-w-[1360px] mx-auto px-4 lg:px-6 py-3">
            <div className="rounded-lg border-2 border-[#015d52]">
              <input
                type="text"
                placeholder="Поиск по гайдам, статьям, лекарствам..."
                className="w-full bg-transparent px-3 py-2 text-sm outline-none text-slate-900 placeholder-slate-400"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
