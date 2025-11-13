// app/drugs/page.tsx
export default function DrugsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Препараты</h1>
      <p className="text-gray-600 mb-6">Список препаратов находится в разработке...</p>
      
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Доступные препараты:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <a href="/drugs/enoxaparin" className="text-blue-600 hover:underline">
              Эноксапарин (Клексан) - Антикоагулянт
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
