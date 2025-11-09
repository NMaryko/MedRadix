export default function Home() {
  return (
    <main style={{ minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>MedRadix</h1>
        <p style={{ marginTop: '0.5rem', maxWidth: '600px' }}>
          Здесь будет главная страница платформы MedRadix. Текст и разделы мы позже
          заменим на утверждённую структуру из Horizons.
        </p>
      </header>

      <section style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Навигация (черновик)</h2>
        <ul>
          <li>Главная</li>
          <li>EU vs US Regulatory Guides</li>
          <li>Resources</li>
          <li>About</li>
        </ul>
      </section>

      <section>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Контент появится позже</h2>
        <p style={{ marginTop: '0.5rem', maxWidth: '600px' }}>
          Сейчас это только технический скелет для разработки. Весь реальный контент
          и блоки мы добавим отдельно, по согласованной структуре.
        </p>
      </section>
    </main>
  );
}
