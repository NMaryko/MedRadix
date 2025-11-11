// app/guides/acs/page.tsx
import React from "react";

const styles = {
  wrap: { maxWidth: 1150, margin: "32px auto", padding: "0 16px", color: "var(--ink)" as const },
  note: { color: "var(--muted)", fontSize: 14, marginBottom: 8 },
  card: { background: "var(--card)", border: "1px solid var(--line)", borderRadius: 14, padding: 18, margin: "16px 0" },
  kpi: { display: "flex", gap: 12, flexWrap: "wrap" as const },
  flow: { display: "flex", gap: 12, flexWrap: "wrap" as const },
  step: { flex: "1 1 260px", border: "1px dashed var(--line)", borderRadius: 10, padding: 12 },
  list: { margin: "8px 0 0 0", paddingLeft: 16 },
  tbl: { width: "100%", borderCollapse: "separate" as const, borderSpacing: 0, overflow: "hidden", borderRadius: 12, border: "1px solid var(--line)" },
  th: { padding: "10px 12px", borderBottom: "1px solid var(--line)", verticalAlign: "top" as const, background: "#0e1633", color: "#cdd6ff", textAlign: "left" as const },
  td: { padding: "10px 12px", borderBottom: "1px solid var(--line)", verticalAlign: "top" as const },
  callout: { borderLeft: "3px solid var(--accent)", background: "#0c1430", padding: 12, borderRadius: 8, marginTop: 10 },
  src: { fontSize: 12, color: "#97a3cf", marginTop: 8 },
};

export default function ACSPage() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          :root { --bg:#0b1020; --card:#111735; --ink:#e9edff; --muted:#a8b2d1; --accent:#5ea2ff; --line:#2a3260; }
          html,body { background: var(--bg); }
          table tr:last-child td { border-bottom: none; }
        `,
        }}
      />
      <div style={styles.wrap}>
        <h1>Острый коронарный синдром (ESC 2023–2024 vs ACC/AHA 2025)</h1>
        <div style={styles.note}>Для медицинских специалистов. Обзор и интерпретация; не заменяет официальные руководства. Следуйте локальным протоколам.</div>

        <div style={{ ...styles.card, ...styles.kpi }}>
          <div><b>EU (ESC):</b><br />NSTE-ACS 2023; STEMI 2024</div>
          <div><b>US (ACC/AHA):</b><br />ACS Guideline 2025</div>
          <div><b>Проверка:</b><br />ДД.ММ.ГГГГ</div>
          <div><b>Фокус:</b><br />Диагностика, риск, реперфузия, АТТ</div>
        </div>

        <h2>1) Диагностика и маршрут</h2>
        <div style={styles.card}>
          <div style={styles.flow}>
            <div style={styles.step}>
              <b>Triage</b>
              <ul style={styles.list as React.CSSProperties}>
                <li>ЭКГ ≤10 мин от контакта</li>
                <li>Нестабильность → реанимация/катетеризация</li>
              </ul>
            </div>
            <div style={styles.step}>
              <b>STEMI</b>
              <ul style={styles.list as React.CSSProperties}>
                <li>Подъём ST/новая БЛНПГ + клиника</li>
                <li>Первичное ЧКВ при доступности; иначе фибринолиз</li>
              </ul>
            </div>
            <div style={styles.step}>
              <b>NSTE-ACS</b>
              <ul style={styles.list as React.CSSProperties}>
                <li>Без подъёма ST, ишемические симптомы/изменения ST-T</li>
                <li>hs‑тропонин: протокол 0/1ч или 0/2ч</li>
              </ul>
            </div>
          </div>
          <div style={styles.callout}>
            Отличия: обе системы используют hs‑тропонин и ускоренные протоколы. ESC делает упор на валидированный 0/1ч и безопасную выписку низкого риска; US 2025 — на системные процессы и метрики сети.
          </div>
        </div>

        <h2>2) Реперфузия при STEMI</h2>
        <div style={styles.card}>
          <table style={styles.tbl}>
            <thead>
              <tr>
                <th style={styles.th}>Шаг</th>
                <th style={styles.th}>ESC</th>
                <th style={styles.th}>US</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Первичное ЧКВ</td>
                <td style={styles.td}>Door‑to‑balloon ≤90 мин; FMC‑to‑device ≤120 мин</td>
                <td style={styles.td}>Сходно; KPI и маршрутизация сети</td>
              </tr>
              <tr>
                <td style={styles.td}>Фибринолиз</td>
                <td style={styles.td}>Если задержка ЧКВ &gt;120 мин — лизис ≤10 мин от диагноза</td>
                <td style={styles.td}>Сходно; далее фармакоинвазивная тактика</td>
              </tr>
              <tr>
                <td style={styles.td}>Rescue PCI</td>
                <td style={styles.td}>При неудаче лизиса/персистирующей ишемии</td>
                <td style={styles.td}>То же</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>3) Инвазивная тактика при NSTE-ACS</h2>
        <div style={styles.card}>
          <table style={styles.tbl}>
            <thead>
              <tr>
                <th style={styles.th}>Категория риска</th>
                <th style={styles.th}>ESC (тайминг)</th>
                <th style={styles.th}>US (тайминг)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>Очень высокий</td>
                <td style={styles.td}>Немедленно: нестабильность, шок, аритмии</td>
                <td style={styles.td}>Немедленно при тех же признаках</td>
              </tr>
              <tr>
                <td style={styles.td}>Высокий</td>
                <td style={styles.td}>Ранний ≤24 ч (динамика ST/T, ↑hs‑cTn, GRACE &gt;140)</td>
                <td style={styles.td}>Ранний ≤24 ч при сходных критериях</td>
              </tr>
              <tr>
                <td style={styles.td}>Умеренный/низкий</td>
                <td style={styles.td}>Функц. тесты/КТ‑КАГ; селективная инвазия</td>
                <td style={styles.td}>Сходно; акцент на ко‑морбидности и SDM</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>4) Антитромботическая терапия</h2>
        <div style={styles.card}>
          <div style={styles.flow}>
            <div style={styles.step}>
              <b>DAPT после ЧКВ</b>
              <ul style={styles.list as React.CSSProperties}>
                <li>Стандарт: АСК + тикагрелор/прасугрел 12 мес</li>
                <li>HBR: укорочение 3–6 мес, возможна деэскалация</li>
              </ul>
            </div>
            <div style={styles.step}>
              <b>P2Y12 выбор</b>
              <ul style={styles.list as React.CSSProperties}>
                <li>ESC: прасугрел у ЧКВ‑кандидатов; тикагрелор — альтернатива</li>
                <li>US: тикагрелор или прасугрел — оба предпочтительнее клопидогрела</li>
              </ul>
            </div>
            <div style={styles.step}>
              <b>ФП + ОКС (ТАТ)</b>
              <ul style={styles.list as React.CSSProperties}>
                <li>Короткая ТАТ 1 нед → ОАК + P2Y12 до 6–12 мес</li>
                <li>US: минимизация АСК так же приоритетна</li>
              </ul>
            </div>
          </div>
          <div style={styles.callout}>
            Отличия: ESC чаще указывает прасугрел при планируемом ЧКВ (если нет противопоказаний); US допускает равнозначный выбор тикагрелор/прасугрел. Подходы к HBR и укорочению DAPT в целом совпадают.
          </div>
        </div>

        <h2>5) Доп. меры</h2>
        <div style={styles.card}>
          <ul style={styles.list as React.CSSProperties}>
            <li>Статины высокой интенсивности; ИАПФ/БРА; бета‑блокатор по показаниям; эскалация по ЛПНП (эзетимиб/PCSK9)</li>
            <li>ARC‑HBR оценка, план деэскалации DAPT</li>
            <li>Реабилитация, отказ от курения, контроль АД/СД, вакцинация</li>
          </ul>
        </div>

        <h2>6) Отличия EU vs US — кратко</h2>
        <div style={styles.card}>
          <table style={styles.tbl}>
            <thead>
              <tr>
                <th style={styles.th}>Тема</th>
                <th style={styles.th}>EU (ESC)</th>
                <th style={styles.th}>US (ACC/AHA)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>hs‑тропонин</td>
                <td style={styles.td}>0/1ч приоритет, валидированные отсечки</td>
                <td style={styles.td}>0/1ч и 0/2ч; гибкость локальных протоколов</td>
              </tr>
              <tr>
                <td style={styles.td}>P2Y12 при ЧКВ</td>
                <td style={styles.td}>Прасугрел предпочтительно (если подходит)</td>
                <td style={styles.td}>Тикагрелор или прасугрел — оба ок</td>
              </tr>
              <tr>
                <td style={styles.td}>DAPT при HBR</td>
                <td style={styles.td}>3–6 мес; возможна P2Y12‑монотерапия</td>
                <td style={styles.td}>Сходно; акцент на индивидуализации</td>
              </tr>
              <tr>
                <td style={styles.td}>NSTE‑ACS тайминг</td>
                <td style={styles.td}>Очень высокий — немедленно; высокий — ≤24 ч</td>
                <td style={styles.td}>Сходно; упор на доступность и пути</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>7) Источники</h2>
        <div style={styles.card}>
          <ul style={styles.list as React.CSSProperties}>
            <li>ESC NSTE‑ACS (2023): https://www.escardio.org</li>
            <li>ESC STEMI (2024): https://www.escardio.org</li>
            <li>ACC/AHA ACS (2025): https://www.acc.org, https://www.ahajournals.org</li>
          </ul>
          <div style={styles.src}>Права у обществ; здесь — переработанные схемы и конспекты.</div>
        </div>
      </div>
    </>
  );
}




