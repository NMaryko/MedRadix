// app/guides/page.tsx
import Link from 'next/link';

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-[#fcfcee] py-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Заголовок страницы */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#015D52] mb-2">
            Гайды по специальностям
          </h1>
          <p className="text-sm text-gray-700 max-w-2xl">
            Выберите специальность и нужный клинический гайд. 
            Сейчас доступен гайд по острому коронарному синдрому (ОКС). 
            Постепенно список будет расширяться.
          </p>
        </header>

        {/* Блок "Кардиология" */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#5E3830]()
