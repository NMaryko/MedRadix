// components/DrugPage.tsx

import { Drug, generateDrugSchema } from '@/types/drug';

interface DrugPageProps {
  drug: Drug;
}

export default function DrugPage({ drug }: DrugPageProps) {
  const schemaData = generateDrugSchema(drug);

  return (
    <main
      className="px-4 py-6 max-w-5xl mx-auto"
      itemScope
      itemType="https://schema.org/Drug"
    >
      {/* JSON-LD разметка для поисковиков */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Основной контент для пользователя */}
      <h1 className="text-2xl font-semibold mb-4" itemProp="name">
        {drug.genericName}
      </h1>

      {drug.tradeNames?.length > 0 && (
        <p className="text-sm text-muted-foreground mb-2">
          Торговые названия: {drug.tradeNames.join(', ')}
        </p>
      )}

      {drug.description && (
        <p className="mb-4" itemProp="description">
          {drug.description}
        </p>
      )}

      <section className="mb-4">
        <h2 className="font-semibold mb-1">Формы выпуска</h2>
        <ul>
          {drug.forms.map((form) => (
            <li
              key={`${form.form}-${form.strength}`}
              itemProp="dosageForm"
            >
              {form.form} — {form.strength} ({form.route})
              {form.note ? ` — ${form.note}` : ''}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-4" itemProp="indication">
        <h2 className="font-semibold mb-1">Показания</h2>
        <ul className="list-disc pl-5">
          {drug.indications.map((indication) => (
            <li key={indication.title}>
              <strong>{indication.title}</strong>: {indication.description}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-4" itemProp="contraindication">
        <h2 className="font-semibold mb-1">Противопоказания</h2>
        <p>
          <strong>Абсолютные:</strong>{' '}
          {drug.contraindications.absolute.join(', ')}
        </p>
        <p>
          <strong>Относительные:</strong>{' '}
          {drug.contraindications.relative.join(', ')}
        </p>
      </section>

      <section className="mb-4">
        <h2 className="font-semibold mb-1">Нежелательные явления</h2>
        <p>
          <strong>Частые:</strong> {drug.adverseEffects.common.join(', ')}
        </p>
        <p>
          <strong>Серьёзные:</strong> {drug.adverseEffects.serious.join(', ')}
        </p>
      </section>
    </main>
  );
}

