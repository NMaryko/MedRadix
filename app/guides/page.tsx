<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <title>Фибрилляция предсердий — Алгоритмы (EU vs US)</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    :root {
      --bg:#0b1020; --card:#111735; --ink:#e9edff; --muted:#a8b2d1;
      --accent:#5ea2ff; --ok:#2ecc71; --warn:#f1c40f; --risk:#e74c3c;
      --line:#2a3260; --chip:#1a2248;
    }
    body {background:var(--bg); color:var(--ink); font:16px/1.5 Inter,system-ui,Segoe UI,Arial;}
    .wrap {max-width:1150px; margin:32px auto; padding:0 16px;}
    h1,h2,h3 {margin:0 0 12px}
    h1 {font-size:28px}
    h2 {font-size:22px; margin-top:28px}
    h3 {font-size:18px; margin-top:18px; color:var(--muted)}
    .card {background:var(--card); border:1px solid var(--line); border-radius:14px; padding:18px; margin:16px 0}
    .grid {display:grid; gap:12px}
    .g-2 {grid-template-columns:1fr 1fr}
    .g-3 {grid-template-columns:1fr 1fr 1fr}
    .badge {display:inline-block; padding:4px 8px; border-radius:999px; background:var(--chip); color:var(--ink); font-size:12px}
    .tag {padding:2px 8px; border:1px solid var(--line); border-radius:999px; color:var(--muted); font-size:12px}
    .note {color:var(--muted); font-size:14px}
    .flow {display:flex; gap:12px; flex-wrap:wrap}
    .step {flex:1 1 260px; border:1px dashed var(--line); border-radius:10px; padding:12px; position:relative}
    .step::before {content:"→"; position:absolute; right:8px; top:8px; color:var(--muted)}
    .pill {padding:6px 10px; border-radius:8px; background:#0f1736; border:1px solid var(--line); display:inline-block; margin:4px 6px 0 0}
    .list {margin:8px 0 0 0; padding-left:16px}
    .tbl {width:100%; border-collapse:separate; border-spacing:0; overflow:hidden; border-radius:12px; border:1px solid var(--line)}
    .tbl th, .tbl td {padding:10px 12px; border-bottom:1px solid var(--line); vertical-align:top}
    .tbl th {background:#0e1633; color:#cdd6ff; text-align:left}
    .tbl tr:last-child td {border-bottom:none}
    .callout {border-left:3px solid var(--accent); background:#0c1430; padding:12px; border-radius:8px}
    .legend {display:flex; gap:8px; flex-wrap:wrap}
    .chip-ok {background:rgba(46,204,113,.12); color:#b8f5d2; border:1px solid rgba(46,204,113,.35)}
    .chip-warn {background:rgba(241,196,15,.12); color:#ffe8a3; border:1px solid rgba(241,196,15,.35)}
    .chip-risk {background:rgba(231,76,60,.12); color:#ffb3a8; border:1px solid rgba(231,76,60,.35)}
    .src {font-size:12px; color:#97a3cf}
    .kpi {display:flex; gap:12px; flex-wrap:wrap}
    .kpi > div {flex:1 1 180px; background:#0e1633; border:1px solid var(--line); border-radius:10px; padding:10px}
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Фибрилляция предсердий (ESC 2024 vs AHA/ACC/HRS 2023)</h1>
    <div class="note">Для медицинских специалистов. Обзор и интерпретация; не заменяет официальные руководства. Следуйте локальным протоколам.</div>

    <div class="card kpi">
      <div><b>Версия EU:</b><br>ESC 2024</div>
      <div><b>Версия US:</b><br>AHA/ACC/HRS 2023</div>
      <div><b>Последняя проверка:</b><br>ДД.ММ.ГГГГ</div>
      <div><b>Цель:</b><br>Диагностика, стратификация риска, лечение, сравнение</div>
    </div>

    <h2>1) Диагностика: алгоритм</h2>
    <div class="card">
      <div class="legend">
        <span class="badge">Симптомы/скрининг</span>
        <span class="badge">Подтверждение</span>
        <span class="badge">Поиск причин</span>
      </div>
      <div class="flow">
        <div class="step">
          <b>Подозрение на ФП</b>
          <ul class="list">
            <li>Нерегулярный пульс, палпитации, одышка, инсульт/ТИА в анамнезе</li>
            <li>Оппортунистический скрининг >65 лет; таргетированный при факторах риска</li>
          </ul>
        </div>
        <div class="step">
          <b>Подтверждение ритма</b>
          <ul class="list">
            <li>12‑кан. ЭКГ: нерегулярный RR, отсутствие P</li>
            <li>Если пароксизмальная: Холтер/patch/имплантируемый монитор при криптогенном инсульте</li>
          </ul>
        </div>
        <div class="step">
          <b>Оценка причины и коморбидности</b>
          <ul class="list">
            <li>ТТЭ/ТЧЭ при показаниях; ТТГ, электролиты, креатинин</li>
            <li>Оценить ожирение, АГ, ОАС, алког. нагрузку</li>
          </ul>
        </div>
      </div>
      <div class="callout src">Источники: официальные страницы ESC 2024 и AHA/ACC/HRS 2023 (ссылки будут указаны на карточке источников ниже).</div>
    </div>

    <h2>2) Антикоагуляция: решение по риску инсульта</h2>
    <div class="card">
      <table class="tbl">
        <thead>
          <tr>
            <th>Шаг</th>
            <th>ESC 2024</th>
            <th>US 2023</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Стратификация риска</td>
            <td>CHA2DS2‑VASc (расширенные комментарии по промежуточному риску)</td>
            <td>CHA2DS2‑VASc (разрешено расширение клин. факторов при пограничном балле)</td>
          </tr>
          <tr>
            <td>Когда начинать ОАК</td>
            <td>Мужчины ≥2, женщины ≥3 — рекомендовано; при 1 у мужчин — индивидуально</td>
            <td>Сходно; акцент на shared decision при промежуточном риске</td>
          </tr>
          <tr>
            <td>Выбор препарата</td>
            <td>Преимущественно ДОАК; варфарин при МНКС, клапан. протезах, тяжелой МТР</td>
            <td>То же; уточнения по ХБП (дозы апиксабана/рибоксабана)</td>
          </tr>
          <tr>
            <td>Исключения/противопоказания</td>
            <td>Высокий риск кровотечений — модифицируем факторы, не отменяем ОАК только по HAS‑BLED</td>
            <td>То же; выделен подход к LAAO у непереносимости ОАК</td>
          </tr>
        </tbody>
      </table>
      <div class="note">Формулировки оригинальны; ориентированы на практику. Для точных порогов и классов рекомендаций — см. первоисточники.</div>
    </div>

    <h2>3) Контроль ритма/частоты: выбор стратегии</h2>
    <div class="card">
      <div class="flow">
        <div class="step">
          <b>Немедленно</b>
          <div class="pill chip-risk">Гемодинамическая нестабильность → срочная ЭИТ</div>
          <div class="pill chip-warn">ОАК до/после ЭИТ по правилу 3 нед / 4 нед (или ТЧЭ‑направляемо)</div>
        </div>
        <div class="step">
          <b>Контроль ритма</b>
          <ul class="list">
            <li>Ранняя абляция при симптомной пароксизмальной ФП и неэффективности/нежелании ААП</li>
            <li>ААП по профилю: флекаинид/пропафенон (без структурной болезни), соталол/дронедарон, амиодарон при ССН/ГЛЖ</li>
          </ul>
        </div>
        <div class="step">
          <b>Контроль частоты</b>
          <ul class="list">
            <li>Бета‑блокаторы; недигидропиридиновые БКК; дигоксин при СН</li>
            <li>Целевой ЧСС покоя ~80–110/мин индивидуально</li>
          </ul>
        </div>
      </div>
      <div class="callout">
        Отличия: ESC акцентирует раннюю катетерную абляцию у избранных пациентов; US сходно, но подчёркивает shared decision и центры с опытом.
      </div>
    </div>

    <h2>4) Коморбидность и модификация факторов риска</h2>
    <div class="card">
      <ul class="list">
        <li>АГ: строгий контроль, предпочтение схем с ИАПФ/БРА</li>
        <li>Ожирение: снижение массы ≥10% улучшает удержание синусового ритма</li>
        <li>ОАС: диагностика и СИПАП-терапия</li>
        <li>Алкоголь: ограничение/абстиненция снижает рецидивы</li>
      </ul>
      <div class="note">Подход схож в EU и US; различаются формулировки классов/уровней доказательств.</div>
    </div>

    <h2>5) Карточка источников</h2>
    <div class="card">
      <ul class="list">
        <li>ESC 2024 Atrial Fibrillation Guidelines — официальная страница (URL будет указан)</li>
        <li>AHA/ACC/HRS 2023 Atrial Fibrillation Guideline — официальная страница (URL будет указан)</li>
      </ul>
      <div class="src">Права на оригинальные документы принадлежат соответствующим обществам. На данной странице — переработанные, оригинально оформленные конспекты и алгоритмы.</div>
    </div>
  </div>
</body>
</html>
