// app/guides/acs/page.tsx
import styles from "./styles.module.css";

export default function ACSPage() {
  return (
    <div className={styles.wrap}>
      <h1>Острый коронарный синдром (ESC 2023–2024 vs ACC/AHA 2025)</h1>
      <div className={styles.note}>Для медицинских специалистов. Обзор и интерпретация; не заменяет официальные руководства. Следуйте локальным протоколам.</div>

      <div className={`${styles.card} ${styles.kpi}`}>
        <div><b>EU (ESC):</b><br />NSTE-ACS 2023; STEMI 2024</div>
        <div><b>US (ACC/AHA):</b><br />ACS Guideline 2025</div>
        <div><b>Проверка:</b><br />ДД.ММ.ГГГГ</div>
        <div><b>Фокус:</b><br />Диагностика, риск, реперфузия, АТТ</div>
      </div>

      <h2>1) Диагностика и маршрут</h2>
      <div className={styles.card}>
        <div className={styles.flow}>
          <div className={styles.step}>
            <b>Triage</b>
            <ul className={styles.list}>
              <li>ЭКГ ≤10 мин от контакта</li>
              <li>Нестабильность → реанимация/катетеризация</li>
            </ul>
          </div>
          <div className={styles.step}>
            <b>STEMI</b>
            <ul className={styles.list}>
              <li>Подъём ST/новая БЛНПГ + клиника</li>
              <li>Первичное ЧКВ при доступности; иначе фибринолиз</li>
            </ul>
          </div>
          <div className={styles.step}>
            <b>NSTE-ACS</b>
            <ul className={styles.list}>
              <li>Без подъёма ST, ишемические симптомы/изменения ST-T</li>
              <li>hs‑тропонин: протокол 0/1ч или 0/2ч</li>
            </ul>
          </div>
        </div>
        <div className={styles.callout}>
          Отличия: обе системы используют hs‑тропонин и ускоренные протоколы. ESC делает упор на валидированный 0/1ч и безопасную выписку низкого риска; US 2025 — на системные процессы и метрики сети.
        </div>
      </div>

      <h2>2) Реперфузия при STEMI</h2>
      <div className={styles.card}>
        <table className={styles.tbl}>
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
              <td>Door‑to‑balloon ≤90 мин; FMC‑to‑device ≤120 мин</td>
              <td>Сходно; KPI и маршрутизация сети</td>
            </tr>
            <tr>
              <td>Фибринолиз</td>
              <td>Если задержка ЧКВ >120 мин → лизис ≤10 мин от диагноза</td>
              <td>Сходно; далее фармакоинвазивная тактика</td>
            </tr>
            <tr>
              <td>Rescue PCI</td>
              <td>При неудаче лизиса/персистирующей ишемии</td>
              <td>То же</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>3) Инвазивная тактика при NSTE-ACS</h2>
      <div className={styles.card}>
        <table className={styles.tbl}>
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
              <td>Немедленно: нестабильность, шок, аритмии</td>
              <td>Немедленно при тех же признаках</td>
            </tr>
            <tr>
              <td>Высокий</td>
              <td>Ранний ≤24 ч (динамика ST/T, ↑hs‑cTn, GRACE &gt;140)</td>
              <td>Ранний ≤24 ч при сходных критериях</td>
            </tr>
            <tr>
              <td>Умеренный/низкий</td>
              <td>Функц. тесты/КТ‑КАГ; селективная инвазия</td>
              <td>Сходно; акцент на ко‑морбидности и SDM</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>4) Антитромботическая терапия</h2>
      <div className={styles.card}>
        <div className={styles.flow}>
          <div className={styles.step}>
            <b>DAPT после ЧКВ</b>
            <ul className={styles.list}>
              <li>Стандарт: АСК + тикагрелор/прасугрел 12 мес</li>
              <li>HBR: укорочение 3–6 мес, возможна деэскалация</li>
            </ul>
          </div>
          <div className={styles.step}>
            <b>P2Y12 выбор</b>
            <ul className={styles.list}>
              <li>ESC: прасугрел у ЧКВ‑кандидатов; тикагрелор — альтернатива</li>
              <li>US: тикагрелор или прасугрел — оба предпочтительнее клопидогрела</li>
            </ul>
          </div>
          <div className={styles.step}>
            <b>ФП + ОКС (ТАТ)</b>
            <ul className={styles.list}>
              <li>Короткая ТАТ 1 нед → ОАК + P2Y12 до 6–12 мес</li>
              <li>US: минимизация АСК так же приоритетна</li>
            </ul>
          </div>
        </div>
        <div className={styles.callout}>
          Отличия: ESC чаще указывает прасугрел при планируемом ЧКВ (если нет противопоказаний); US допускает равнозначный выбор тикагрелор/прасугрел. Подходы к HBR и укорочению DAPT в целом совпадают.
        </div>
      </div>

      <h2>5) Доп. меры</h2>
      <div className={styles.card}>
        <ul className={styles.list}>
          <li>Статины высокой интенсивности; ИАПФ/БРА; бета‑блокатор по показаниям; эскалация липидснижающей терапии по ЛПНП</li>
          <li>ARC‑HBR оценка, план деэскалации DAPT</li>
          <li>Реабилитация, отказ от курения, контроль АД/СД, вакцинация</li>
        </ul>
      </div>

      <h2>6) Отличия EU vs US — кратко</h2>
      <div className={styles.card}>
        <table className={styles.tbl}>
          <thead>
            <tr>
              <th>Тема</th>
              <th>EU (ESC)</th>
              <th>US (ACC/AHA)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>hs‑тропонин</td>
              <td>0/1ч приоритет, валидированные отсечки</td>
              <td>0/1ч и 0/2ч; гибкость локальных протоколов</td>
            </tr>
            <tr>
              <td>P2Y12 при ЧКВ</td>
              <td>Прасугрел предпочтительно (если подходит)</td>
              <td>Тикагрелор или прасугрел — оба ок</td>
            </tr>
            <tr>
              <td>DAPT при HBR</td>
              <td>3–6 мес; P2Y12‑монотерапия возможна</td>
              <td>Сходно; сильный акцент на индивидуализации</td>
            </tr>
            <tr>
              <td>NSTE‑ACS тайминг</td>
              <td>Очень высокий — немедленно; высокий — ≤24 ч</td>
              <td>Сходно; упор на доступность и пути</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>7) Источники</h2>
      <div className={styles.card}>
        <ul className={styles.list}>
          <li>ESC NSTE‑ACS (2023) — официальная страница: https://www.escardio.org</li>
          <li>ESC STEMI (2024) — официальная страница: https://www.escardio.org</li>
          <li>ACC/AHA ACS (2025) — официальные страницы: https://www.acc.org, https://www.ahajournals.org</li>
        </ul>
        <div className={styles.src}>Права на оригинальные документы принадлежат обществам. Здесь — переработанные, оригинально оформленные схемы и конспекты.</div>
      </div>
    </div>
  );
}
