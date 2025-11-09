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
        <div className="max-w-[1360px] mx-auto px-4 pt-6 pb-10">
          <div className="flex items-start justify-between gap-6">
            {/* Афоризм по центру */}
            <div className="flex-1 flex flex-col items-center text-center">
              <button className="mb-3 inline-flex items-center rounded-full border border-[#6b635a] px-5 py-1 text-xs font-medium tracking-wide uppercase text-[#6b635a] bg-white/70">
                Афоризм месяца
              </button>

              <h1 className="text-3xl md:text-4xl font-semibold italic text-[#3b342d]">
                Mens sana in corpore sano
              </h1>

              <p className="mt-2 text-sm text-[#6b635a]">
                В здоровом теле — здоровый дух (Ювенал)
              </p>
            </div>

            {/* Справа — фильтр специальности */}
            <div className="w-56 pt-8">
              <span className="block text-[11px] uppercase tracking-[0.16em] text-[#b0a89e] mb-1 text-right">
                Специальность
              </span>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="mt-1 block w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-[#3b342d] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#015d52]"
              >
                {specialties.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

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

     {/* Список новостей, как на старом сайте */}
      <section className="relative max-w-[1360px] mx-auto px-4 pt-6 pb-16">
        {/* Одна большая «молния» слева */}
        <div className="absolute left-0 top-4 bottom-4 flex justify-center">
          <div className="w-[2px] bg-[#facc15] lightning-bar" />
        </div>

        <ul className="space-y-4 pl-6">
          {filteredNews.map((item) => (
            <li key={item.id} className="flex items-start gap-4">
              {/* Иконка-кружок перед ссылкой */}
              <div className="relative mt-1 flex h-7 w-7 items-center justify-center rounded-full border border-[#f3b640] bg-white">
                <span className="h-3 w-[2px] rounded-full bg-[#f3b640]" />
              </div>

              {/* Новость как активная ссылка */}
              <a
                href={item.href}
                className="text-sm text-[#3b342d] hover:text-[#015d52] transition-colors"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}


