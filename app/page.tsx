export default function HomePage() {
  const newsItems = [
    'Новые рекомендации ESC по ведению пациентов с фибрилляцией предсердий',
    'FDA одобрило новый препарат для лечения сердечной недостаточности',
    'Исследование The Lancet: связь между сном и риском деменции',
    'JAMA: Влияние витамина D на иммунный ответ при COVID-19',
    'Обновлены гайдлайны ADA по лечению сахарного диабета 2 типа',
  ];

  const specialties = [
  'Все',
  'Аллергология и иммунология',
  'Анестезиология и реаниматология',
  'Гастроэнтерология',
  'Гематология',
  'Дерматовенерология',
  'Инфекционные болезни',
  'Кардиология',
  'Неврология',
  'Нефрология',
  'Онкология',
  'Офтальмология',
  'Отоларингология',
  'Педиатрия',
  'Психиатрия',
  'Пульмонология',
  'Ревматология',
  'Терапия',
  'Травматология и ортопедия',
  'Урология',
  'Эндокринология',
];

  return (
    <main className="bg-[#fcfcee] min-h-screen">
      {/* Блок афоризма и специальности */}
      <section className="border-b border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 py-8 flex items-start justify-between gap-8">
          {/* Левая часть — чип Афоризм месяца */}
          <div className="pt-1">
            <button className="px-4 py-1 text-xs font-medium rounded-full border border-[#015d52] text-[#015d52] bg-white">
              Афоризм месяца
            </button>
          </div>

          {/* Центр — афоризм, по центру */}
          <div className="flex-1 text-center">
            <h1 className="text-3xl md:text-4xl font-semibold italic text-[#3b342d]">
              Mens sana in corpore sano
            </h1>
            <p className="mt-2 text-sm text-[#6b635a]">
              В здоровом теле — здоровый дух (Ювенал)
            </p>
          </div>

          {/* Правая часть — специальность */}
          <div className="text-right">
            <span className="block text-[10px] tracking-[0.16em] uppercase text-[#6b635a] mb-1">
              Специальность
            </span>
            <select className="px-3 py-1 text-sm border border-gray-300 rounded-full bg-white text-[#3b342d]">
              {specialties.map((sp) => (
                <option key={sp}>{sp}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Список новостей */}
      <section className="max-w-[1360px] mx-auto px-4 py-8">
        <ul className="space-y-4">
          {newsItems.map((title, index) => (
            <li key={index}>
              <a
                href="#"
                className="flex items-start gap-4 group"
              >
                {/* Жёлтая «молния» — вертикальная полоса слева */}
                <span className="h-10 w-1 rounded-full bg-gradient-to-b from-yellow-400 to-yellow-500 group-hover:from-yellow-300 group-hover:to-yellow-500 transition-colors" />

                {/* Иконка (пока заглушка) */}
                <div className="mt-1 h-6 w-6 flex items-center justify-center rounded-full border border-[#015d52] text-[#015d52] text-xs flex-shrink-0">
                  i
                </div>

                {/* Текст новости как ссылка */}
                <p className="text-sm text-[#3b342d] group-hover:text-[#015d52]">
                  {title}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}


