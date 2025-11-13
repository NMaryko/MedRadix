// app/drugs/[slug]/page.tsx
import { generateDrugSchema, type Drug } from '@/types/drug';
import { mockDrugEnoxaparin } from '@/types/drug';

// Генерируем метаданные для SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const drug = await getDrugData(params.slug); // Ваша функция получения данных
  
  return {
    title: `${drug.genericName} - инструкция, применение, дозировка | MedRadix`,
    description: drug.description || `Информация о препарате ${drug.genericName}. Торговые названия: ${drug.tradeNames.join(', ')}`,
    keywords: [
      drug.genericName,
      ...drug.tradeNames,
      'инструкция',
      'применение',
      'дозировка',
      'показания'
    ].join(', '),
    openGraph: {
      title: `${drug.genericName} - MedRadix`,
      description: drug.description || `Информация о препарате ${drug.genericName}`,
      type: 'article',
      url: `https://medradix.info/drugs/${drug.slug}`
    }
  };
}

// Временная функция получения данных (замените на реальную БД/API)
async function getDrugData(slug: string): Promise<Drug> {
  // Пока используем mock данные
  if (slug === 'enoxaparin') {
    return mockDrugEnoxaparin;
  }
  
  // Для других препаратов - заглушка
  throw new Error('Препарат не найден');
}

export default async function DrugPage({ params }: { params: { slug: string } }) {
  const drug = await getDrugData(params.slug);
  const schemaData = generateDrugSchema(drug);

  return (
    <>
      {/* JSON-LD разметка для поисковиков */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{drug.genericName}</h1>
          {drug.tradeNames.length > 0 && (
            <p className="text-lg text-gray-600 mt-2">
              Торговые названия: {drug.tradeNames.join(', ')}
            </p>
          )}
        </header>

        {/* Основная информация */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основной контент */}
          <div className="lg:col-span-2">
            {/* Описание */}
            {drug.description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Описание</h2>
                <p className="text-gray-700">{drug.description}</p>
              </div>
            )}

            {/* Показания */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Показания</h2>
              <div className="space-y-3">
                {drug.indications.map((indication, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-medium">{indication.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{indication.description}</p>
                    {(indication.classOfRecommendation || indication.levelOfEvidence) && (
                      <p className="text-xs text-gray-500 mt-1">
                        Класс рекомендаций: {indication.classOfRecommendation}, Уровень доказательств: {indication.levelOfEvidence}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Дозирование */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Дозирование</h2>
              <div className="space-y-4">
                {drug.dosage.adults.map((regimen, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900">{regimen.indication}</h3>
                    <p className="text-gray-700 mt-1">{regimen.regimen}</p>
                    {regimen.notes && (
                      <p className="text-sm text-gray-600 mt-2">{regimen.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            {/* Формы выпуска */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Формы выпуска</h3>
              <div className="space-y-2">
                {drug.forms.map((form, index) => (
                  <div key={index} className="text-sm">
                    <p className="font-medium">{form.form}</p>
                    <p className="text-gray-600">{form.strength} • {form.route}</p>
                    {form.note && <p className="text-gray-500 text-xs">{form.note}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Противопоказания */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Противопоказания</h3>
              <div className="space-y-2">
                <div>
                  <h4 className="font-medium text-red-600">Абсолютные:</h4>
                  <ul className="text-sm text-gray-600 list-disc list-inside">
                    {drug.contraindications.absolute.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-orange-600">Относительные:</h4>
                  <ul className="text-sm text-gray-600 list-disc list-inside">
                    {drug.contraindications.relative.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
