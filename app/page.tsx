export default function HomePage() {
  const news = [
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

  return (
    <main className="min-h-screen bg-[#fcfcee]">
      {/* Блок афоризма и специальности под шапкой */}
      <section className="border-b border-gray-200 bg-[#fcfcee]">
        <div className="max-w-[1360px] mx-auto px-4 py-6 flex items-start justify-between gap-8">
          {/* Левая часть — чип + афоризм */}
          <div className="flex flex-col gap-3">
            <button className="inline-flex items-center rounded-full border border-[#015d52]/30 bg-white px-4 py-1 text-xs font-medium text-[#015d52] shadow-sm">
              Афоризм месяца
            </button>

            <div>
              <p className="text-2xl font-semibold text-[#2b2115] italic">
                Mens sana in corpore sano
              </p>
              <p className="mt-1 text-sm text-[#6b5b47]">
                В здоровом теле — здоровый дух (Ювенал)
              </p>
            </div>
          </div>

          {/* Правая часть — Специальность: Все */}
          <div className="flex flex-col items-end gap-2">
            <span className="text-sm text-[#8c7c67]">Специальность:</span>
            <button className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm text-[#2b2115] hover:border-[#015d52] hover:text-[#015d52] transition-colors">
              Все
              <span className="text-xs">▼</span>
            </button>
          </div>
        </div>
      </section>

      {/* Список новостей с иконками и "молнией" */}
      <section className="bg-[#fcfcee]">
        <div className="max-w-[1360px] mx-auto px-4 py-8 space-y-4">
          {news.map((item, index) => (
            <div
              key={item.id}
              className="flex items-start gap-3 border-b border-gray-200 pb-3 last:border-b-0"
            >
              {/* Жёлтая "молния" слева */}
              <span className="news-lightning mt-1" />

              {/* Иконка + текст новости */}
              <div className="flex items-start gap-3">
                {/* Пока простая круглая иконка-заглушка, потом можно заменить логотипами сайтов */}
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-xs font-semibold text-[#8c7c67]">
                  {index + 1}
                </div>
                <a
                  href="#"
                  className="text-sm leading-snug text-[#2b2115] hover:text-[#015d52] hover:underline underline-offset-2"
                >
                  {item.title}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}


      </section>
    </main>
  );
}
