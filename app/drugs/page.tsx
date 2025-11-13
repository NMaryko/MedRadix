// app/drugs/page.tsx - КРАСИВАЯ СТРАНИЦА С ПЕСОЧНОЙ ЦВЕТОВОЙ СХЕМОЙ
'use client';

import { useState } from 'react';
import { mockDrugsList } from '@/types/drug';

export default function DrugsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrugs = mockDrugsList.filter(drug =>
    drug.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drug.tradeNames.some(name => name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    drug.therapeuticClass.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brown-900 mb-4">
            База препаратов MedRadix
          </h1>
          <p className="text-xl text-brown-700 max-w-2xl mx-auto leading-relaxed">
            Находите препараты с учётом клинических рекомендаций ESC, ACC/AHA и других авторитетных гайдов
          </p>
        </div>

        {/* Поисковая строка */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-brown-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Начните вводить МНН, торговое название или класс препарата..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-[#015d52] rounded-2xl focus:ring-2 focus:ring-[#015d52] focus:border-[#015d52] transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg"
              style={{ borderWidth: '1.5px' }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-brown-400 hover:text-brown-600 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Подсказки под поиском */}
          <div className="text-center mt-4">
            <p className="text-sm text-brown-600">
              Попробуйте: <span className="text-[#015d52] font-medium">эноксапарин</span>, 
              <span className="text-[#015d52] font-medium mx-2">клексан</span>, 
              <span className="text-[#015d52] font-medium">антикоагулянт</span>
            </p>
          </div>
        </div>

        {/* Результаты поиска */}
        <div className="space-y-6">
          {searchTerm ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-brown-900">
                  Найдено препаратов: <span className="text-[#015d52]">{filteredDrugs.length}</span>
                </h2>
                {filteredDrugs.length > 0 && (
                  <span className="text-sm text-brown-600 bg-amber-100 px-3 py-1 rounded-full">
                    {searchTerm}
                  </span>
                )}
              </div>

              {filteredDrugs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 text-brown-300">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-brown-800 mb-2">Препарат не найден</h3>
                  <p className="text-brown-600 max-w-md mx-auto">
                    Попробуйте изменить запрос или проверьте правильность написания.
                    Мы постоянно пополняем нашу базу препаратов.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredDrugs.map((drug) => (
                    <div
                      key={drug.id}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-amber-200 hover:shadow-xl hover:border-[#015d52] transition-all duration-300 group cursor-pointer"
                      onClick={() => window.location.href = `/drugs/${drug.slug}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-brown-900 group-hover:text-[#015d52] transition-colors">
                          {drug.genericName}
                        </h3>
                        <span className="bg-amber-100 text-brown-800 text-xs px-2 py-1 rounded-full font-medium">
                          {drug.therapeuticClass}
                        </span>
                      </div>
                      
                      <p className="text-brown-600 mb-4">
                        Торговые названия: <span className="font-medium text-brown-800">{drug.tradeNames.join(', ')}</span>
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[#015d52] font-medium group-hover:text-[#014a43] transition-colors">
                          Открыть инструкцию →
                        </span>
                        <div className="w-8 h-8 bg-[#015d52] text-white rounded-full flex items-center justify-center group-hover:bg-[#014a43] transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            /* Контент когда поиск пустой */
            <div className="text-center py-12">
              <div className="max-w-2xl mx-auto">
                <div className="w-32 h-32 mx-auto mb-8 text-amber-300">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                  </svg>
                </div>
                
                <h2 className="text-3xl font-bold text-brown-900 mb-6">
                  Интеллектуальный поиск препаратов
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center p-6 bg-white/60 rounded-2xl backdrop-blur-sm border border-amber-200">
                    <div className="w-12 h-12 mx-auto mb-4 bg-amber-100 rounded-2xl flex items-center justify-center text-[#015d52]">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-brown-800 mb-2">Клинические рекомендации</h3>
                    <p className="text-brown-600 text-sm">
                      Применение препаратов согласно ESC, ACC/AHA и другим авторитетным гайдам
                    </p>
                  </div>
                  
                  <div className="text-center p-6 bg-white/60 rounded-2xl backdrop-blur-sm border border-amber-200">
                    <div className="w-12 h-12 mx-auto mb-4 bg-amber-100 rounded-2xl flex items-center justify-center text-[#015d52]">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-brown-800 mb-2">Актуальная информация</h3>
                    <p className="text-brown-600 text-sm">
                      Все данные регулярно обновляются в соответствии с последними исследованиями
                    </p>
                  </div>
                  
                  <div className="text-center p-6 bg-white/60 rounded-2xl backdrop-blur-sm border border-amber-200">
                    <div className="w-12 h-12 mx-auto mb-4 bg-amber-100 rounded-2xl flex items-center justify-center text-[#015d52]">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-brown-800 mb-2">Для практикующих врачей</h3>
                    <p className="text-brown-600 text-sm">
                      Инструмент для быстрого доступа к информации в клинической практике
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-200">
                  <h3 className="text-xl font-semibold text-brown-800 mb-4">
                    Как пользоваться поиском?
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 text-left">
                    <div>
                      <h4 className="font-medium text-brown-700 mb-2 flex items-center">
                        <span className="w-6 h-6 bg-[#015d52] text-white rounded-full flex items-center justify-center text-sm mr-2">1</span>
                        По МНН или торговому названию
                      </h4>
                      <p className="text-brown-600 text-sm pl-8">
                        Введите международное непатентованное название или любое торговое название препарата
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-brown-700 mb-2 flex items-center">
                        <span className="w-6 h-6 bg-[#015d52] text-white rounded-full flex items-center justify-center text-sm mr-2">2</span>
                        По фармакологической группе
                      </h4>
                      <p className="text-brown-600 text-sm pl-8">
                        Ищите по классам: антикоагулянты, статины, бета-блокаторы и другим
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Support email внизу */}
        <div className="text-center mt-16 pt-8 border-t border-amber-200">
          <p className="text-brown-600 mb-2">Нужна помощь или хотите предложить препарат для добавления?</p>
          <a 
            href="mailto:support@medradix.info" 
            className="text-[#015d52] hover:text-[#014a43] font-medium transition-colors inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            support@medradix.info
          </a>
        </div>
      </div>
    </div>
  );
}
