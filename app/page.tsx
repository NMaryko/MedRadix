export default function HomePage() {
  return (
    <main className="bg-[#fcfcee] min-h-screen">
      {/* Блок афоризма и фильтра специальности */}
      <section className="border-b border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 py-6 flex items-start justify-between gap-8">
          {/* Левая часть — чип и афоризм */}
          <div>
            <button className="px-4 py-1 text-xs font-medium rounded-full border border-[#015d52] text-[#015d52] bg-white">
              Афоризм месяца
            </button>

            <h1 className="mt-4 text-3xl md:text-4xl font-semibold italic text-[#3b342d]">
              Mens sana in corpore sano
            </h1>

            <p className="mt-2 text-sm text-[#6b635a]">
              В здоровом теле — здоровый дух (Ювенал).
            </p>
          </div>

          {/* Правая часть — специальность */}
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs uppercase tracking-wide text-[#6b635a]">
              Специальность:
            </span>
            <button className="inline-flex items-center gap-2 px-4 py-1 text-sm rounded-full border border-gray-300 bg-white text-[#3b342d]">
              Все
              <span className="text-xs">▾</span>
            </button>
          </div>
        </div>
      </section>

      {/* Список новостей, как на старом сайте */}
      <section className="max-w-[1360px] mx-auto px-4 py-8">
        <ul className="space-y-4">
          {[
            'Новые рекомендации ESC по ведению пациентов с фибрилляцией предсердий',
            'FDA одобрило новый препарат для лечения сердечной недостаточности',
            'Исследование The Lancet: связь между сном и риском деменции',
            'JAMA: Влияние витамина D на иммунный ответ при COVID-19',
            'Обновлены гайдлайны ADA по лечению сахарного диабета 2 типа',
          ].map((title, index) => (
            <li key={index} className="flex items-start gap-4">
              {/* Иконка-кружок с мягкой «молнией» */}
              <div className="mt-1 h-6 w-6 flex items-center justify-center rounded-full border border-[#f9c94a] bg-[#fff9e6] relative overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-b from-[#f9c94a] to-transparent animate-pulse" />
              </div>

              <p className="text-sm text-[#3b342d]">{title}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
