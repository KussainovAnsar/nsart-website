// 2D schematics in high-performance HMI style: grey canvas, thin dark lines, colour only for flow and alarms.
// Power one-line, chilled-water loop and the hall plan; values refresh every second; clicks jump to the 3D object.
import { telemetry, FACTS, buildHall, HALL, ROW_X_RANGE, ROW_Z_RANGE } from './model.js';

const TXT = {
  en: { title: 'Schematics', tabs: ['Power', 'Cooling', 'Server hall'], close: 'Back to 3D', mains: 'Mains', gen: 'Generator', battery: 'On battery', sim: 'Simulate mains loss', restore: 'Restore mains', ats: 'Changeover', bus: 'LV bus 0.4 kV', tie: 'Bus tie', ups: 'UPS Eaton 9395 · N+1', load: 'IT load', standby: 'Standby', running: 'Running', online: 'Online', supply: 'Supply', ret: 'Return', heat: 'Heat load', cop: 'COP (calc.)', hall: 'Server hall', legend: 'Rack power, kW', inlet: 'inlet', fan: 'fan', click: 'Click an element to see it in 3D', open: 'open alarms', feeders: 'Grid 10 kV' },
  ru: { title: 'Схемы', tabs: ['Питание', 'Холод', 'Машзал'], close: 'Назад в 3D', mains: 'Сеть', gen: 'Генератор', battery: 'На батареях', sim: 'Смоделировать потерю сети', restore: 'Вернуть сеть', ats: 'АВР', bus: 'Шины 0,4 кВ', tie: 'Секционный', ups: 'ИБП Eaton 9395 · N+1', load: 'ИТ-нагрузка', standby: 'Резерв', running: 'В работе', online: 'В работе', supply: 'Подача', ret: 'Обратка', heat: 'Тепловая нагрузка', cop: 'COP (расчёт)', hall: 'Машинный зал', legend: 'Мощность стойки, кВт', inlet: 'вход', fan: 'вент.', click: 'Нажмите на элемент, чтобы увидеть его в 3D', open: 'открытых тревог', feeders: 'Сеть 10 кВ' },
  kk: { title: 'Сызбалар', tabs: ['Қуат', 'Салқын', 'Машзал'], close: '3D-ге оралу', mains: 'Желі', gen: 'Генератор', battery: 'Батареяда', sim: 'Желі жоғалуын модельдеу', restore: 'Желіні қайтару', ats: 'АВҚ', bus: '0,4 кВ шиналар', tie: 'Секциялық', ups: 'ҮҚК Eaton 9395 · N+1', load: 'IT жүктеме', standby: 'Резерв', running: 'Жұмыста', online: 'Жұмыста', supply: 'Беру', ret: 'Қайтару', heat: 'Жылу жүктемесі', cop: 'COP (есеп)', hall: 'Машина залы', legend: 'Сөре қуаты, кВт', inlet: 'кіріс', fan: 'желд.', click: '3D-де көру үшін элементті басыңыз', open: 'ашық дабыл', feeders: '10 кВ желі' },
};

export function createScheme({ getT, lang, onPick, alarms }) {
  const root = document.getElementById('scheme');
  let open = false, tab = 0, outage = null; // outage: {t0} in real seconds
  const rack = buildHall();
  const f1 = (v) => v.toFixed(1), f0 = (v) => v.toFixed(0);

  function shell() {
    const X = TXT[lang()] || TXT.en;
    root.innerHTML = `<header><b>${X.title}</b><nav>${X.tabs.map((t, i) => `<button data-t="${i}" aria-pressed="${i === tab}">${t}</button>`).join('')}</nav><span class="sp"></span><span class="hint">${X.click}</span><button class="cl">${X.close}</button></header><div class="cv"></div>`;
    root.querySelectorAll('nav button').forEach((b) => (b.onclick = () => { tab = +b.dataset.t; shell(); }));
    root.querySelector('.cl').onclick = () => close();
    draw();
  }
  const pick = (e) => { const g = e.target.closest('[data-id]'); if (g) { close(); onPick(g.dataset.id); } };

  function draw() {
    const cv = root.querySelector('.cv'); if (!cv) return;
    const X = TXT[lang()] || TXT.en, t = getT();
    if (tab === 0) cv.innerHTML = power(X, t);
    if (tab === 1) cv.innerHTML = cooling(X, t);
    if (tab === 2) cv.innerHTML = hallPlan(X, t);
    cv.querySelector('svg').onclick = pick;
    const sim = cv.querySelector('#simBtn'); if (sim) sim.onclick = () => { outage = outage ? null : { t0: performance.now() / 1000 }; draw(); };
  }

  // ---------- power one-line ----------
  function power(X, t) {
    const ph = [0, 1, 2].map((p) => telemetry.upsPhase(t, p)), it = ph[0] + ph[1] + ph[2];
    const fac = telemetry.facility(t);
    // outage scenario: 0–10 s on battery, generator starts and takes the load through the changeover
    let st = 'mains', el = 0;
    if (outage) { el = performance.now() / 1000 - outage.t0; st = el < 10 ? 'battery' : 'gen'; }
    const live = (on) => (on ? 'en' : 'off');
    const mainsOn = st === 'mains', genOn = st === 'gen';
    const bat = st === 'battery' ? Math.max(0, 100 - el * 1.6) : 100;
    const box = (x, y, w, h, title, lines, id, cls = '') => `<g class="eq ${cls}" ${id ? `data-id="${id}"` : ''}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/><text class="t" x="${x + 10}" y="${y + 20}">${title}</text>${lines.map((l, i) => `<text class="v" x="${x + 10}" y="${y + 40 + i * 17}">${l}</text>`).join('')}</g>`;
    const brk = (x, y, closed, id) => `<rect class="brk ${closed ? 'cl' : 'op'}" x="${x - 9}" y="${y - 9}" width="18" height="18" ${id ? `data-id="${id}"` : ''}/>`;
    const tx = (x, y, id) => `<g class="eq" data-id="${id}"><circle class="wd" cx="${x}" cy="${y - 11}" r="17"/><circle class="wd" cx="${x}" cy="${y + 11}" r="17"/></g>`;
    return `<svg viewBox="0 0 1280 680" class="hmi">
      <text class="cap" x="40" y="36">${X.feeders}</text>
      <path class="ln ${live(mainsOn || st === 'battery' ? mainsOn : false)} hv" d="M150 50 V120 M390 50 V120"/>
      <text class="lbl" x="160" y="70">№20</text><text class="lbl" x="400" y="70">№17</text>
      ${brk(150, 120, mainsOn, 'GRID')}${brk(390, 120, mainsOn, 'GRID')}
      <path class="ln ${live(mainsOn)} hv" d="M150 129 V160 M390 129 V160"/>
      ${tx(150, 190, 'TP')}${tx(390, 190, 'TP')}
      <text class="lbl" x="178" y="194">T1 · ТМ-1600</text><text class="lbl" x="418" y="194">T2 · ТМ-1600</text>
      <path class="ln ${live(mainsOn)}" d="M150 218 V262 M390 218 V262"/>
      ${brk(150, 262, mainsOn, 'TP')}${brk(390, 262, mainsOn, 'TP')}
      <path class="bus ${live(mainsOn)}" d="M90 300 H250 M290 300 H450"/>${brk(270, 300, false, 'TP')}
      <text class="lbl" x="92" y="292">${X.bus} · I</text><text class="lbl" x="372" y="292">II</text><text class="lbl" x="256" y="325">${X.tie}</text>
      <path class="ln ${live(mainsOn)}" d="M150 271 V300 M390 271 V300"/>
      <!-- generator and changeover -->
      <g class="eq ${genOn ? 'run' : ''}" data-id="DGU"><circle cx="640" cy="190" r="34"/><text class="g" x="640" y="200" text-anchor="middle">G</text></g>
      <text class="lbl" x="684" y="176">Cummins C1000D5</text><text class="v" x="684" y="196">${genOn ? X.running + ' · ' + f0(fac.total) + ' kW' : X.standby + ' · 833 kW'}</text><text class="v" x="684" y="214">4000 l · 24 h</text>
      <path class="ln ${live(genOn)}" d="M640 224 V300"/>
      <path class="ln ${live(mainsOn)}" d="M390 300 V360 H560"/>
      <g class="eq" data-id="АВР"><rect x="560" y="330" width="160" height="60" rx="3"/><text class="t" x="572" y="352">${X.ats}</text><text class="v" x="572" y="372">${mainsOn ? X.mains : genOn ? X.gen : '—'}</text><path class="sw" d="${mainsOn ? 'M600 380 L640 352' : genOn ? 'M680 380 L640 352' : 'M640 380 L640 360'}"/></g>
      <path class="ln ${live(genOn)}" d="M640 300 V330"/>
      <path class="ln ${live(mainsOn || genOn)}" d="M720 360 H800"/>
      ${box(800, 320, 170, 80, 'ВРУ', ['2 × 2500 A', f0(fac.total) + ' kW'], 'ВРУ')}
      <path class="ln ${live(mainsOn || genOn)}" d="M885 400 V440 H300 V470"/>
      <!-- UPS -->
      <g class="eq ${st === 'battery' ? 'alm' : ''}" data-id="UPS2"><rect x="120" y="470" width="420" height="120" rx="3"/><text class="t" x="132" y="492">${X.ups}</text>
        ${[0, 1, 2, 3].map((i) => `<g transform="translate(${140 + i * 98} 505)"><rect class="mod" width="84" height="40" rx="2"/><text class="v" x="8" y="17">UPM${i + 1}</text><text class="v" x="8" y="33">${f1(it / 4)} kW</text></g>`).join('')}
        <text class="v" x="132" y="575">${st === 'battery' ? X.battery : X.online} · L1 ${f1(ph[0])} · L2 ${f1(ph[1])} · L3 ${f1(ph[2])} kW</text></g>
      <g class="eq" data-id="АК1"><rect x="570" y="490" width="120" height="80" rx="3"/><text class="t" x="582" y="512">АК1–4</text><text class="v" x="582" y="532">${f0(telemetry.battery(t))} V</text><rect class="lvl" x="582" y="544" width="96" height="10"/><rect class="lvlf ${bat < 60 ? 'lowb' : ''}" x="582" y="544" width="${(96 * bat / 100).toFixed(0)}" height="10"/></g>
      <path class="ln en" d="M540 530 H570"/>
      <path class="ln ${live(true)} prot" d="M330 590 V620 H1180"/>
      ${[0, 1, 2, 3].map((i) => `<g class="eq" data-id="ЩРТ-${i + 1}"><path class="ln en prot" d="M${560 + i * 160} 620 V640"/><rect x="${500 + i * 160}" y="640" width="120" height="34" rx="3"/><text class="t" x="${512 + i * 160}" y="662">ЩРТ-${i + 1} · ${f0(it / 4)} kW</text></g>`).join('')}
      ${box(1040, 470, 200, 100, X.load, [f0(it) + ' kW · ' + f0(it / FACTS.ups.kw * 100) + ' %', 'PUE ' + fac.pue.toFixed(2), '75 + 9 racks · A/B']) }
      <foreignObject x="1000" y="40" width="250" height="60"><button id="simBtn" xmlns="http://www.w3.org/1999/xhtml" class="${outage ? 'on' : ''}">${outage ? X.restore : X.sim}</button></foreignObject>
      ${outage ? `<text class="cap alm" x="1000" y="120">${st === 'battery' ? X.battery + ' · ' + (10 - el).toFixed(0) + ' s' : X.gen}</text>` : ''}
    </svg>`;
  }

  // ---------- chilled water ----------
  function cooling(X, t) {
    const fac = telemetry.facility(t), al = alarms();
    const ch = (x, id) => `<g class="eq run" data-id="${id}"><rect x="${x}" y="70" width="230" height="90" rx="3"/>${[0, 1, 2, 3].map((i) => `<circle class="fan" cx="${x + 32 + i * 55}" cy="96" r="16"/>`).join('')}<text class="t" x="${x + 10}" y="140">${id} · HiRef LSE658FS</text><text class="v" x="${x + 10}" y="156">633 kW · ${X.running}</text></g>`;
    const pump = (x, id, on) => `<g class="eq ${on ? 'run' : ''}" data-id="${id}"><circle cx="${x}" cy="300" r="22"/><path class="tri" d="M${x - 10} 288 L${x + 14} 300 L${x - 10} 312 Z"/><text class="lbl" x="${x - 12}" y="342">${id}</text></g>`;
    const k = rack.filter((r) => r.kind === 'cooler');
    const cool = k.map((c, i) => { const v = telemetry.inlet(t, c.ac), f = telemetry.fan(t, c.ac), a = al.has(c.id); const x = 120 + (i % 7) * 152, y = 430 + Math.floor(i / 7) * 110;
      return `<g class="eq ${a ? 'alm' : ''}" data-id="${c.id}"><rect x="${x}" y="${y}" width="128" height="76" rx="3"/><text class="t" x="${x + 8}" y="${y + 18}">${c.id} · AC ${c.ac}</text><text class="v" x="${x + 8}" y="${y + 38}">${X.inlet} ${f1(v)} °C</text><text class="v" x="${x + 8}" y="${y + 56}">${X.fan} ${f0(f)} %</text><rect class="lvl" x="${x + 8}" y="${y + 63}" width="112" height="6"/><rect class="lvlf ${f > 95 ? 'lowb' : ''}" x="${x + 8}" y="${y + 63}" width="${(112 * f / 100).toFixed(0)}" height="6"/></g>`; }).join('');
    return `<svg viewBox="0 0 1280 680" class="hmi">
      ${ch(120, 'CH-1')}${ch(420, 'CH-2')}
      <path class="ln sup" d="M235 160 V230 H1140 M535 160 V230"/><path class="ln ret" d="M265 160 V250 H1160 M565 160 V250"/>
      <text class="lbl" x="760" y="222">${X.supply}</text><text class="lbl" x="760" y="268">${X.ret}</text>
      ${pump(820, 'P1', true)}${pump(900, 'P2', true)}${pump(980, 'P3', false)}
      <path class="ln sup" d="M820 230 V278 M900 230 V278 M980 230 V278 M820 322 V380 H1140 M900 322 V380 M980 322 V380"/>
      <path class="ln sup" d="M100 380 H1140 V230"/><path class="ln ret" d="M90 400 H1160 V250"/>
      ${cool}
      ${`<g class="eq"><rect x="760" y="60" width="300" height="110" rx="3"/><text class="t" x="772" y="82">${X.heat}</text><text class="big" x="772" y="118">${f0(fac.it * 1.06)} kW</text><text class="v" x="772" y="140">${X.cop} ${fac.cop.toFixed(2)} · ${f0(fac.chillers)} kW el.</text><text class="v" x="772" y="158">PUE ${fac.pue.toFixed(2)} · ${f1(telemetry.outside(t))} °C</text></g>`}
    </svg>`;
  }

  // ---------- hall plan ----------
  function hallPlan(X, t) {
    const al = alarms();
    const W = 1100, sx = W / (HALL.x1 - HALL.x0), sz = 560 / (HALL.z1 - HALL.z0), ox = 90, oz = 70;
    const px = (x) => ox + (x - HALL.x0) * sx, pz = (z) => oz + (z - HALL.z0) * sz;
    let ci = 0;
    const cells = rack.map((r) => {
      const x = px(r.x - 0.535), z = pz(r.z - 0.3), w = 1.07 * sx, h = 0.6 * sz - 2;
      let fill = '#8f969b', label = '';
      if (r.kind === 'eda') { ci = r.ci; const kw = telemetry.rackPower(t, r.ci); const k = Math.min(1, kw / 7); fill = kw < 0.5 ? '#c3c7ca' : `hsl(${205 - k * 175} ${35 + k * 40}% ${70 - k * 22}%)`; label = kw.toFixed(1); }
      if (r.kind === 'cooler') { fill = '#5f8fb5'; label = r.id; }
      if (['mda', 'hda', 'zda'].includes(r.kind)) { fill = '#6f7a83'; label = r.id.split(' ')[0]; }
      const a = al.has(r.id);
      return `<g class="eq rk ${a ? 'alm' : ''}" data-id="${r.id}"><rect x="${x}" y="${z}" width="${w}" height="${h}" style="fill:${fill}"/><text x="${x + w / 2}" y="${z + h / 2 + 4}" text-anchor="middle">${label}</text></g>`;
    }).join('');
    const rows = ROW_X_RANGE.map(([a, b], i) => `<text class="row" x="${px((a + b) / 2)}" y="${pz(ROW_Z_RANGE[1]) + 26}" text-anchor="middle">${i + 1}</text>`).join('');
    const legend = [0, 1.75, 3.5, 5.25, 7].map((v, i) => `<rect x="${980 + i * 46}" y="22" width="40" height="12" fill="${v < 0.5 ? '#c3c7ca' : `hsl(${205 - v / 7 * 175} ${35 + v / 7 * 40}% ${70 - v / 7 * 22}%)`}"/><text class="lbl" x="${980 + i * 46}" y="50">${v}</text>`).join('');
    return `<svg viewBox="0 0 1280 680" class="hmi"><text class="cap" x="40" y="36">${X.hall} · 221.7 m² · ${al.size} ${X.open}</text>${legend}<text class="lbl" x="840" y="33">${X.legend}</text>
      <rect class="wall" x="${ox}" y="${oz}" width="${W}" height="560"/>${cells}${rows}</svg>`;
  }

  let timer = null;
  function openScheme(t = tab) { tab = t; open = true; root.hidden = false; shell(); clearInterval(timer); timer = setInterval(draw, 1000); }
  function close() { open = false; root.hidden = true; clearInterval(timer); outage = null; }
  return { open: openScheme, close, get isOpen() { return open; }, refresh() { if (open) shell(); } };
}
