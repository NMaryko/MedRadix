// app/page.tsx

type NewsItem = {
  id: number;
  title: string;
};

const newsItems: NewsItem[] = [
  {
    id: 1,
    title:
      'Новые рекомендации ESC по ведению пациентов с фибрилляцией предсердий',
  },
  {
    id: 2,
    title:
      'FDA одобрило новый препарат для лечения сердечной недостаточности',
  },
  {
    id: 3,
    title:
      'Исследование The Lancet: связь между сном и риском деменции',
  },
  {
    id: 4,
    title:
      'JAMA: Влияние витамина D на иммунный ответ при COVID-19',
  },
  {
    id: 5,
    title:
      'Обновлены гайдлайны ADA по лечению сахарного диабета 2 типа',
  },
];

export default function HomePage() {
  return (
    <div className="bg-[#fcfcee] min-h-screen">
      <div className="max-w-[1360px] mx-auto px-4 pt-10 pb-16">
        {/* Верхний блок: Афоризм месяца + Специальность */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          {/* Левая часть — афоризм */}
          <div>
            <button className="inline-flex items-center rounded-full border border-[#015d52] bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#015d52]">
              Афоризм месяца
            </button>

            <div className="mt-4">
              <p className="text-2xl md:text-3xl font-serif text-gray-900">
                Mens sana in corpore sano
              </p>
              <p className="mt-1 text-sm text-gray-600">
                В здоровом теле — здоровый дух (Ювенал).
              </p>
            </div>
          </div>

          {/* Правая часть — специальность */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <span className="text-xs uppercase tracking-wide text-gray-500">
              Специальность
            </span>
            <button className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm transition-colors hover:border-[#015d52] hover:text-[#015d52]">
              Все
              <span className="text-xs">▾</span>
            </button>
          </div>
        </div>

        {/* Список новостей */}
        <div className="space-y-4">
          {newsItems.map((item) => (
            <a
              key={item.id}
              href="#"
              className="group flex items-start gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-white/70"
            >
              {/* Молния слева */}
              <div className="mt-1">
                <div className="lightning-bar" />
              </div>

              {/* Текст новости */}
              <div>
                <p className="text-sm text-gray-900 group-hover:text-[#015d52]">
                  {item.title}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
