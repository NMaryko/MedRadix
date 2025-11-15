// app/drugs/[slug]/page.tsx - ИДЕАЛЬНАЯ СТРАНИЦА
import { generateDrugSchema, type Drug } from '@/types/drug';
import { mockDrugEnoxaparin } from '@/types/drug';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const drug = await getDrugData(params.slug);
  return {
    title: `${drug.genericName} - инструкция, применение, дозировка | MedRadix`,
    description: drug.description,
  };
}

async function getDrugData(slug: string): Promise<Drug> {
  // Пока используем только эноксапарин
  return mockDrugEnoxaparin;
}

export default async function DrugPage({ params }: { params: { slug: string } }) {
  const drug = await getDrugData(params.slug);
  const schemaData = generateDrugSchema(drug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{drug.genericName}</h1>
          {drug.tradeNames.length > 0 && (
            <p className="text-lg text-gray-600 mt-2">
              Торговые названия: {drug.tradeNames.join(', ')}
            </p>
          )}
          {drug.therapeuticClass && (
            <p className="text-gray-500 mt-1">Фармакологическая группа: {drug.therapeuticClass}</p>
          )}
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            {drug.description && (
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Описание</h2>
                <p className="text-gray-700 leading-relaxed">{drug.description}</p>
              </div>
            )}

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Показания к применению</h2>
              <div className="space-y-4">
                {drug.indications.map((indication, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-medium text-lg text-gray-900">{indication.title}</h3>
                    <p className="text-gray-700 mt-2">{indication.description}</p>
                    {(indication.classOfRecommendation || indication.levelOfEvidence) && (
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                          Класс рекомендаций: {indication.classOfRecommendation}
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Уровень доказательств: {indication.levelOfEvidence}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Дозирование</h2>
              <div className="space-y-4">
                {drug.dosage.adults.map((regimen, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900">{regimen.indication}</h4>
                    <p className="text-gray-700 mt-1"><strong>Режим:</strong> {regimen.regimen}</p>
                    {regimen.duration && <p className="text-gray-600"><strong>Длительность:</strong> {regimen.duration}</p>}
                    {regimen.notes && <p className="text-sm text-gray-500 mt-2">{regimen.notes}</p>}
                  </div>
                ))}
              </div>
            </div>

            {drug.interactions.length > 0 && (
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Взаимодействия</h2>
                <div className="space-y-4">
                  {drug.interactions.map((interaction, index) => (
                    <div key={index} className="border-l-4 border-amber-500 pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-900">{interaction.drug}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${
                          interaction.severity === 'major' ? 'bg-red-100 text-red-800' :
                          interaction.severity === 'moderate' ? 'bg-orange-100 text-orange-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {interaction.severity === 'major' ? 'Высокий риск' : 
                           interaction.severity === 'moderate' ? 'Средний риск' : 'Низкий риск'}
                        </span>
                      </div>
                      <p className="text-gray-700 mt-1"><strong>Эффект:</strong> {interaction.effect}</p>
                      <p className="text-gray-700"><strong>Рекомендации:</strong> {interaction.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Нежелательные явления</h2>
              {drug.adverseEffects.common.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3 text-gray-900">Частые</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {drug.adverseEffects.common.map((effect, index) => (
                      <li key={index}>{effect}</li>
                    ))}
                  </ul>
                </div>
              )}
              {drug.adverseEffects.serious.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900 text-red-600">Серьезные</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {drug.adverseEffects.serious.map((effect, index) => (
                      <li key={index}>{effect}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Клинические рекомендации</h2>
              {drug.guidelineUsage.eu.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3 text-gray-900">Европейские рекомендации</h3>
                  <div className="space-y-3">
                    {drug.guidelineUsage.eu.map((guide, index) => (
                      <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                        <h4 className="font-medium text-gray-900">{guide.guideCode}</h4>
                        <p className="text-gray-600 text-sm">{guide.guideSection}</p>
                        <p className="text-gray-700 mt-1">{guide.indicationSummary}</p>
                        <a href={guide.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm inline-block mt-2">
                          📖 Открыть гайд
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {drug.guidelineUsage.us.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">Американские рекомендации</h3>
                  <div className="space-y-3">
                    {drug.guidelineUsage.us.map((guide, index) => (
                      <div key={index} className="border-l-4 border-purple-500 pl-4 py-2">
                        <h4 className="font-medium text-gray-900">{guide.guideCode}</h4>
                        <p className="text-gray-600 text-sm">{guide.guideSection}</p>
                        <p className="text-gray-700 mt-1">{guide.indicationSummary}</p>
                        <a href={guide.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm inline-block mt-2">
                          📖 Открыть гайд
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Формы выпуска</h3>
              <div className="space-y-3">
                {drug.forms.map((form, index) => (
                  <div key={index} className="text-sm border-b border-gray-100 pb-3 last:border-b-0">
                    <p className="font-medium text-gray-900">{form.form}</p>
                    <p className="text-gray-600">{form.strength} • {form.route}</p>
                    {form.note && <p className="text-gray-500 text-xs mt-1">{form.note}</p>}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Противопоказания</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-red-600 text-sm">Абсолютные:</h4>
                  <ul className="text-sm text-gray-600 list-disc list-inside mt-1">
                    {drug.contraindications.absolute.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-orange-600 text-sm">Относительные:</h4>
                  <ul className="text-sm text-gray-600 list-disc list-inside mt-1">
                    {drug.contraindications.relative.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {drug.monitoring && (
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Мониторинг</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-700">Лабораторный:</h4>
                    <ul className="text-gray-600 list-disc list-inside mt-1">
                      {drug.monitoring.laboratory.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Клинический:</h4>
                    <ul className="text-gray-600 list-disc list-inside mt-1">
                      {drug.monitoring.clinical.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {drug.pregnancyLactation && (
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Беременность и лактация</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Беременность:</strong> {drug.pregnancyLactation.pregnancy}</p>
                  <p><strong>Лактация:</strong> {drug.pregnancyLactation.lactation}</p>
                  {drug.pregnancyLactation.pregnancyCategory && (
                    <p><strong>Категория:</strong> {drug.pregnancyLactation.pregnancyCategory}</p>
                  )}
                </div>
              </div>
            )}

            {drug.pearls.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold mb-3 text-blue-900">Полезные советы</h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  {drug.pearls.map((pearl, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {pearl}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

          {/* Кнопка сохранения */}
            <section className="mt-4 mb-8 text-center">
              <button
                onClick={handleSaveSection}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#015d52] bg-white text-sm font-medium text-[#015d52] hover:ring-1 hover:ring-[#015d52] hover:shadow-[0_0_10px_#015D52] transition"
              >
                <FolderPlus size={16} />
                <span>Сохранить текущий раздел в «Мои лекарства»</span>
              </button>
            </section>

        {/* Дисклеймер для раздела лекарств */}
        <p className="mt-6 text-xs text-gray-500 text-center max-w-4xl mx-auto leading-relaxed">
          Информация о лекарственных препаратах на сайте MedRadix.info представляет собой краткий обзор
          официальных данных для медицинских специалистов и носит исключительно образовательный характер.
          Она не заменяет официальную инструкцию по медицинскому применению производителя и
          действующие клинические рекомендации. Авторы не несут ответственности за использование
          представленной информации в клинической практике.
        </p>

        {/* Контакт для поддержки */}
        <div className="mt-[150px] text-center text-xs text-gray-400">
          support@medradix.info
        </div>
      </div>
    </>
  );
}

