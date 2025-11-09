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

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<'RU' | 'EN'>('RU');

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      {/* Основная шапка */}
      <div className="max-w-[1360px] mx-auto px-4 py-3 flex items-center justify-between">
        {/* Логотип */}
        <div className="flex flex-col">
          <span className="text-2xl font-semibold text-[#2b2115]">MedRadix</span>
          <span className="text-xs text-[#7a6a55] italic mt-[-2px]">
            Scientia pro vita
          </span>
        </div>

        {/* Меню */}
        <nav className="flex-1 flex justify-center">
          <ul className="flex items-center space-x-7">
            {MENU_ITEMS.map((item) => (
              <li key={item} className="relative group">
                <button
                  className={`inline-flex flex-col items-center text-[15px] md:text-base font-medium transition-colors duration-200 ${
                    item === 'Новое'
                      ? 'text-[#e6a800]'
                      : 'text-[#4b3b2f] hover:text-[#015d52]'
                  }`}
                >
                  <span>{item}</span>

                  {/* Полоска под разделом */}
                  {item === 'Новое' ? (
                    // "Новое" всегда с жёлтой линией
                    <span className="mt-1 h-0.5 w-full bg-[#facc15]" />
                  ) : (
                    // Остальные — зелёная линия, появляется плавно слева-направо при ховере
                    <span className="mt-1 h-0.5 w-full bg-[#015d52] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Правая часть: поиск, Войти, язык */}
        <div className="flex items-center space-x-5">
          {/* Лупа */}
          <button
            onClick={() => setIsSearchOpen((v) => !v)}
            className="text-[#4b3b2f] hover:text-[#015d52] transition-colors duration-200"
            aria-label="Поиск"
          >
            <Search size={18} />
          </button>

          {/* Кнопка Войти (зелёная, текст и иконка белые) */}
          <button className="inline-flex items-center gap-2 rounded-full bg-[#015d52] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#01463d] transition-colors duration-200">
            <User size={14} />
            <span>Войти</span>
          </button>

          {/* Языки RU / EN после кнопки Войти */}
          <div className="flex items-center gap-1 text-sm">
            <button
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

      {/* Панель поиска под шапкой — появляется только по клику на лупу */}
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




