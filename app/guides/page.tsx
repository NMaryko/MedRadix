// app/guides/acs/page.tsx
// ОКС: ESC 2023/2024 vs ACC/AHA 2025 (оригинальная разметка, без копирования дизайна гайдов)
export default function ACSPage() {
  return (
    <div className="wrap">
      <h1>Острый коронарный синдром (ESC 2023–2024 vs ACC/AHA 2025)</h1>
      <div className="note">Для медицинских специалистов. Обзор и интерпретация; не заменяет официальные руководства. Следуйте локальным протоколам.</div>

      <div className="card kpi">
        <div><b>EU (ESC):</b><br />NSTE-ACS 2023; ACS with ST elevation 2024</div>
        <div><b>US (ACC/AHA):</b><br />ACS Guideline 2025</div>
        <div><b>Последняя проверка:</b><br />ДД.ММ.ГГГГ</div>
        <div><b>Фокус:</b><br />Диагностика, стратификация риска, реперфузия/инвазивная тактика, АТТ</div>
      </div>

      <h2>1) Диагностика и первичный маршрут</h2>
      <div className="card">
        <div className="flow">
          <div className="step">
            <b>Тriage</b>
            <ul className="list">
              <li>ECG ≤10 мин от контакта</li>
              <li>Критическая нестабильность → немедленная реанимация/катетеризация</li>
            </ul>
          </div>
          <div className="step">
            <b>STEMI</b>
            <ul className="list">
              <li>Подъем ST/новая БЛНПГ + клиника ишемии</li>
              <li>Маршрут: первичное ЧКВ при доступности, иначе фибринолиз</li>
            </ul>
          </div>
          <div className="step">
            <b>NSTE-ACS</b>
            <ul className="list">
              <li>ECG без подъёма ST, боль/изменения ST-T</li>
              <li>Высокочувствительный тропонин: 0/1ч или 0/2ч алгоритм</li>
            </ul>
          </div>
        </div>
        <div className="callout">
          Отличия: обе системы рекомендуют hs‑тропонин с протоколами 0/1ч; в EU шире акцент на валидации 0/1ч и безопасной выписке при низком риске. US 2025 подчёркивает системный подход и качество сети реперфузии.
        </div>
      </div>

      <h2>2) Реперфузионная терапия при STEMI</h2>
      <div className="card">
        <table className="tbl">
          <thead>
            <tr>
              <th>Шаг</th>
              <th>ESC</th>
              <th>US</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Первичное ЧКВ</td>
              <td>Цель door‑to‑balloon ≤90 мин; FMC‑to‑device ≤120 мин</td>
              <td>Сходно; системные KPI по времени и транспорту</td>
            </tr>
            <tr>
              <td>Фибринолиз</td>
              <td>Если ожидаемая задержка ЧКВ >120 мин → фибринолиз ≤10 мин от диагноза</td>
              <td>Сходно; при успешном лизисе — фармакоинвазивная стратегия</td>
            </tr>
            <tr>
              <td>Rescue PCI</td>
              <td>Показано при неудаче лизиса/персистирующей ишемии</td>
              <td>То же</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>3) Инвазивная тактика при NSTE-ACS</h2>
      <div className="card">
        <table className="tbl">
          <thead>
            <tr>
              <th>Категория риска</th>
              <th>ESC (тайминг)</th>
              <th>US (тайминг)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Очень высокий</td>
              <td>Немедленно: нестабильность, рефрактерная боль, аритмии, шок</td>
              <td>Немедленно при тех же признаках</td>
            </tr>
            <tr>
              <td>Высокий</td>
              <td>Ранний инвазивный ≤24 ч (динамика ST/T, ↑hs‑cTn, GRACE >140)</td>
              <td>Ранний инвазивный ≤24 ч при сходных критериях</td>
            </tr>
            <tr>
              <td>Умеренный/низкий</td>
              <td>Функц. тесты/КТ‑КАГ; селективная инвазия</td>
              <td>Сходно; акцент на shared decision и ко‑морбидности</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>4) Антитромботическая терапия</h2>
      <div className="card">
        <div className="flow">
          <div className="step">
            <b>DAPT после ЧКВ</b>
            <ul className="list">
              <li>Стандарт: АСК + тикагрелор/прасугрел 12 мес</li>
              <li>Высокий риск кровотечений: укорочение (3–6 мес) с деэскалацией</li>
            </ul>
          </div>
          <div className="step">
            <b>Предпочтение P2Y12</b>
            <ul className="list">
              <li>ESC: прасугрел у ЧКВ‑кандидатов; тикагрелор — альтернатива</li>
              <li>US: тикагрелор/прасугрел предпочтительнее клопидогрела; выбор по профилю</li>
            </ul>
          </div>
          <div className="step">
            <b>ФП + ОКС (тройная терапия)</b>
            <ul className="list">
              <li>Короткая ТАТ (ОАК + АСК + P2Y12) 1 нед → далее ОАК + P2Y12 до 6–12 мес</li>
              <li>US сходно; акцент на минимизацию АСК</li>
            </ul>
          </div>
        </div>
        <div className="callout">
          Отличия: ESC чаще рекомендует прасугрел у пациентов, идущих на ЧКВ, при отсутствии противопоказаний; US допускает более гибкий выбор между тикагрелором/прасугрелом. Варианты укороченной DAPT при HBR сходны.
        </div>
      </div>

      <h2>5) Дополнительные меры</h2>
      <div className="card">
        <ul className="list">
          <li>Ранняя вторичная профилактика: статины высокой интенсивности, ИАПФ/БРА, бета‑блокатор при показаниях, эзетимиб/PCSK9 по ЛПНП</li>
          <li>Оценка кровотечения (ARC‑HBR), план деэскалации DAPT</li>
          <li>Курение, сахар, давление, реабилитация, вакцинация</li>
        </ul>
      </div>

      <h2>6) Краткая таблица отличий EU vs US</h2>
      <div className="card">
        <table className="tbl">
          <thead>
            <tr>
              <th>Тема</th>
              <th>EU (ESC)</th>
              <th>US (ACC/AHA)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>hs‑тропонин протокол</td>
              <td>0/1ч в приоритете, валидированные отсечки</td>
              <td>0/1ч и 0/2ч приемлемы; локальные протоколы качества</td>
            </tr>
            <tr>
              <td>P2Y12 при ЧКВ</td>
              <td>Прасугрел предпочтительно у подходящих</td>
              <td>Тикагрелор или прасугрел — оба предпочтительнее клопидогрела</td>
            </tr>
            <tr>
              <td>Укорочение DAPT (HBR)</td>
              <td>3–6 мес с деэскалацией; возможен P2Y12‑монотерапия</td>
              <td>Сходно; сильный акцент на индивидуализацию риска</td>
            </tr>
            <tr>
              <td>NSTE‑ACS тайминг</td>
              <td>Очень высокий — немедленно; высокий — ≤24 ч</td>
              <td>Сходно; подчёркнуты системные пути и доступность</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>7) Источники</h2>
      <div className="card">
        <ul className="list">
          <li>ESC Guidelines: NSTE‑ACS (2023) — официальная страница: https://www.escardio.org</li>
          <li>ESC Guidelines: STEMI/ACS with ST elevation (2024) — официальная страница: https://www.escardio.org</li>
          <li>ACC/AHA ACS Guideline (2025) — официальная страница: https://www.acc.org / https://www.ahajournals.org</li>
        </ul>
        <div className="src">Права на оригинальные документы принадлежат соответствующим обществам. Здесь — переработанные, оригинально оформленные конспекты и схемы.</div>
      </div>

      <style jsx>{`
        :root {
          --bg:#0b1020; --card:#111735; --ink:#e9edff; --muted:#a8b2d1;
          --accent:#5ea2ff; --line:#2a3260; --chip:#1a2248;
        }
        .wrap {max-width:1150px; margin:32px auto; padding:0 16px; color:var(--ink); background:var(--bg); font:16px/1.55 Inter,system-ui,Arial;}
        h1,h2 {margin:0 0 12px}
        h1 {font-size:28px}
        h2 {font-size:22px; margin-top:28px}
        .note {color:var(--muted); font-size:14px; margin-bottom:8px}
        .card {background:var(--card); border:1px solid var(--line); border-radius:14px; padding:18px; margin:16px 0}
        .kpi {display:flex; gap:12px; flex-wrap:wrap}
        .flow {display:flex; gap:12px; flex-wrap:wrap}
        .step {flex:1 1 260px; border:1px dashed var(--line); border-radius:10px; padding:12px}
        .list {margin:8px 0 0 0; padding-left:16px}
        .tbl {width:100%; border-collapse:separate; border-spacing:0; overflow:hidden; border-radius:12px; border:1px solid var(--line)}
        .tbl th, .tbl td {padding:10px 12px; border-bottom:1px solid var(--line); vertical-align:top}
        .tbl th {background:#0e1633; color:#cdd6ff; text-align:left}
        .tbl tr:last-child td {border-bottom:none}
        .callout {border-left:3px solid var(--accent); background:#0c1430; padding:12px; border-radius:8px; margin-top:10px}
        .src {font-size:12px; color:#97a3cf; margin-top:8px}
        body {background:var(--bg)}
      `}</style>
    </div>
  );
}

