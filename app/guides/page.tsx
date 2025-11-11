// pages/acs.js
import Head from 'next/head';
import React from 'react';

const AcuteCoronarySyndromePage = () => {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f8f9fa' }}>
      <Head>
        <title>ОКС: диагностика и лечение — по Европейским и Американским гайдам</title>
        <meta name="description" content="Алгоритмы диагностики и лечения ОКС по гайдам ESC и AHA. Различия, источники, клинические рекомендации." />
      </Head>

      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: '#004a42', fontSize: '2.5rem', fontWeight: 'bold' }}>
          Острый коронарный синдром (ОКС)
        </h1>
        <p style={{ color: '#482828', fontSize: '1.2rem' }}>
          Сравнение рекомендаций Европейского и Американского кардиологических обществ
        </p>
      </header>

      <section id="diagnosis" style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#015D52', borderBottom: '2px solid #144d35', paddingBottom: '0.5rem' }}>
          Диагностика ОКС
        </h2>

        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem' }}>
          <div style={{ flex: 1, padding: '1rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#144d35', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ backgroundColor: '#1C542D', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.9rem' }}>EU</span>
              ESC 2023
            </h3>
            <ul style={{ color: '#482828', lineHeight: '1.6' }}>
              <li>ЭКГ в течение 10 минут от поступления</li>
              <li>Определение hs-cTn в 0ч и через 1-3ч</li>
              <li>Алгоритм 0/1h или 0/2h для исключения</li>
              <li>Оценка риска по шкале HEART или GRACE</li>
            </ul>
          </div>

          <div style={{ flex: 1, padding: '1rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#144d35', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ backgroundColor: '#490005', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.9rem' }}>US</span>
              AHA 2022
            </h3>
            <ul style={{ color: '#482828', lineHeight: '1.6' }}>
              <li>ЭКГ в течение 10 минут</li>
              <li>Определение тропонина в 0ч и через 3ч (или 1ч, если высокочувствительный)</li>
              <li>Рекомендация по использованию шкалы TIMI и GRACE</li>
              <li>Акцент на клинической картине при неясных результатах</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="treatment" style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#015D52', borderBottom: '2px solid #144d35', paddingBottom: '0.5rem' }}>
          Лечение ОКС
        </h2>

        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
          <thead>
            <tr style={{ backgroundColor: '#004a42', color: 'white' }}>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Параметр</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Европа (ESC)</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>США (AHA)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>Антиагреганты</td>
              <td style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>Тикагрелор или прасугрел + аспирин</td>
              <td style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>Тикагрелор или клопидогрел + аспирин</td>
            </tr>
            <tr>
              <td style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>Антикоагулянты</td>
              <td style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>Эноксапарин или бивалирудин</td>
              <td style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>Эноксапарин или унфракционированный гепарин</td>
            </tr>
            <tr>
              <td style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>Реинфаркт</td>
              <td style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>Приоритет ИКС с имплантацией стента</td>
              <td style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>То же, но с акцентом на время "дверь-баллон"</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="differences" style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#015D52', borderBottom: '2px solid #144d35', paddingBottom: '0.5rem' }}>
          Ключевые различия
        </h2>
        <ul style={{ color: '#482828', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
          <li><strong>Антиагреганты:</strong> ESC предпочитает прасугрел при отсутствии противопоказаний, AHA — тикагрелор как универсальный.</li>
          <li><strong>Антикоагулянты:</strong> ESC — бивалирудин при ИКС, AHA — унфракционированный гепарин как стандарт.</li>
          <li><strong>Время ИКС:</strong> ESC — до 24ч при стабильности, AHA — в течение 120 мин при всех НСТ-ИМ.</li>
        </ul>
      </section>

      <section id="sources" style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#015D52', borderBottom: '2px solid #144d35', paddingBottom: '0.5rem' }}>
          Источники
        </h2>
        <ul style={{ color: '#482828', lineHeight: '1.6' }}>
          <li>
            <a href="https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines/2023-acute-coronary-syndromes" target="_blank" rel="noopener noreferrer" style={{ color: '#015D52', textDecoration: 'underline' }}>
              ESC Guidelines on acute coronary syndromes (2023)
            </a>
          </li>
          <li>
            <a href="https://www.ahajournals.org/doi/10.1161/CIR.0000000000001032" target="_blank" rel="noopener noreferrer" style={{ color: '#015D52', textDecoration: 'underline' }}>
              AHA/ACC Guideline for the Management of Patients With Chest Pain (2022)
            </a>
          </li>
        </ul>
      </section>

      <footer style={{ marginTop: '3rem', padding: '1rem', backgroundColor: '#004a42', color: 'white', textAlign: 'center', borderRadius: '8px' }}>
        <p>© 2025 MedRadix. Все данные основаны на публичных гайдлайнах. Не заменяет профессиональную медицинскую консультацию.</p>
      </footer>
    </div>
  );
};

export default AcuteCoronarySyndromePage;


