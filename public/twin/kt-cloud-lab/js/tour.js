// Guided walk: the camera enters through the main door, visits each room and leaves through the loading bay.
// Doors open on approach (building.updateDoors); the viewer may pause, skip, or take control at any time.
import * as THREE from 'three';
import { ENTRANCE_Z as EZ } from './model.js';

const STOPS = {
  en: [
    ['Main entrance', 'Granite steps, a glass canopy and the KT Cloud Lab cloud. Every visit starts here.'],
    ['Lobby and turnstile', 'Security checks each visitor; staff pass through the turnstile into the corridor.'],
    ['Control room', 'Duty engineers watch power, cooling and network in Zabbix around the clock. Raised floor +0.4 m.'],
    ['Server hall', '221.7 m², raised floor 400 mm, 84 racks in seven rows. Cold air leaves the in-row coolers into this aisle.'],
    ['Contained hot aisles', 'Behind rows 1|2, 3|4 and 5|6 hot air is closed in and goes straight back to the coolers.'],
    ['Pump room', 'Two pumps and a booster move chilled water from the outdoor chillers under the raised floor.'],
    ['Loading bay', 'Equipment comes in from the yard through a wide door and a ramp.'],
    ['Electrical room', 'Four Eaton 9395 modules in N+1, batteries for 10 minutes, main switchboard and the changeover to the generator.'],
    ['Chillers', 'Two HiRef LSE658FS outside the end wall, 633 kW of cooling each.'],
    ['Generator and substation', 'Cummins C1000D5 with 24 h of fuel; beside it the 2 × 1600 kVA substation on two 10 kV feeders.'],
  ],
  ru: [
    ['Главный вход', 'Гранитные ступени, стеклянный козырёк и облако KT Cloud Lab. Отсюда начинается любой визит.'],
    ['Холл и турникет', 'Охрана встречает каждого посетителя, персонал проходит через турникет в коридор.'],
    ['Диспетчерская', 'Дежурные инженеры круглосуточно следят в Zabbix за питанием, холодом и сетью. Фальшпол +0,4 м.'],
    ['Машинный зал', '221,7 м², фальшпол 400 мм, 84 стойки в семи рядах. В этот коридор межрядные кондиционеры подают холодный воздух.'],
    ['Закрытые горячие коридоры', 'За рядами 1|2, 3|4 и 5|6 горячий воздух закрыт и сразу возвращается к кондиционерам.'],
    ['Насосная', 'Два насоса и подкачка гонят холодную воду от уличных чиллеров под фальшпол.'],
    ['Загрузочная', 'Оборудование заносят со двора через широкую дверь и пандус.'],
    ['Электрощитовая', 'Четыре модуля Eaton 9395 по схеме N+1, батареи на 10 минут, ВРУ и АВР с генератором.'],
    ['Чиллеры', 'Два HiRef LSE658FS у торцевой стены, по 633 кВт холода.'],
    ['ДГУ и подстанция', 'Cummins C1000D5 с запасом топлива на 24 ч; рядом подстанция 2 × 1600 кВА на двух фидерах 10 кВ.'],
  ],
  kk: [
    ['Басты кіреберіс', 'Гранит баспалдақ, шыны күнқағар және KT Cloud Lab бұлты. Кез келген сапар осыдан басталады.'],
    ['Холл және турникет', 'Күзет әр келушіні қарсы алады, қызметкерлер турникет арқылы дәлізге өтеді.'],
    ['Диспетчерлік', 'Кезекші инженерлер Zabbix-те қуат, салқын және желіні тәулік бойы бақылайды. Жалған еден +0,4 м.'],
    ['Машина залы', '221,7 м², жалған еден 400 мм, жеті қатарда 84 сөре. Қатараралық кондиционерлер осы дәлізге суық ауа береді.'],
    ['Жабық ыстық дәліздер', '1|2, 3|4 және 5|6 қатарлар артында ыстық ауа жабық және бірден кондиционерлерге қайтады.'],
    ['Сорғы бөлмесі', 'Екі сорғы мен қосымша сорғы сыртқы чиллерлерден суық суды жалған еден астына айдайды.'],
    ['Тиеу бөлмесі', 'Жабдық аулалан кең есік пен пандус арқылы әкелінеді.'],
    ['Электр қалқаны бөлмесі', 'N+1 сызбасындағы төрт Eaton 9395 модулі, 10 минуттық батареялар, КТҚ және генераторға АВҚ.'],
    ['Чиллерлер', 'Шеткі қабырға жанындағы екі HiRef LSE658FS, әрқайсысы 633 кВт.'],
    ['ДГҚ және қосалқы станция', '24 сағаттық отыны бар Cummins C1000D5; жанында екі 10 кВ фидердегі 2 × 1600 кВА қосалқы станция.'],
  ],
};
const UI = {
  en: { pause: 'Pause', play: 'Continue', next: 'Next', control: 'Walk myself', exit: 'Exit', of: 'of' },
  ru: { pause: 'Пауза', play: 'Дальше', next: 'Следующая', control: 'Идти самому', exit: 'Выйти', of: 'из' },
  kk: { pause: 'Кідірту', play: 'Жалғастыру', next: 'Келесі', control: 'Өзім жүремін', exit: 'Шығу', of: '/' },
};

// waypoints [x, z, stopIndex?, lookAt?]
const P = (x, z, stop, look) => ({ x, z, stop, look });
const ROUTE = [
  P(-34, EZ, 0, [-22.6, 2.6, EZ]), P(-27, EZ), P(-24.4, EZ), P(-22.6, EZ), P(-21.5, EZ),
  P(-20.55, 0.43), P(-20.0, -0.3, 1, [-17.8, 1.15, 1.6]), P(-17.6, -0.1), P(-16.9, -0.165), P(-15, -0.1), P(-11.2, -0.1),
  P(-9.85, -0.7), P(-9.85, -1.45), P(-9.85, -2.9, 2, [-9.8, 1.4, -8.6]), P(-9.85, -1.2), P(-8.4, 0.2), P(-8.3, 3.0), P(-7.6, 3.68), P(-6.4, 3.4),
  P(-3.6, 3.1, 3, [-1.65, 1.2, -4.5]), P(-1.65, 2.6), P(-1.65, -2.0), P(-1.65, -5.6), P(-1.3, -7.0), P(-0.48, -7.15, 4, [-0.48, 1.1, 0.5]), P(3, -7.05), P(9.4, -7.0),
  P(10.0, -3.5), P(10.2, 2.2), P(11.1, 3.4), P(11.12, 4.4), P(11.4, 5.7), P(12.2, 6.65), P(13.6, 6.4),
  P(13.94, 5.25), P(14.4, 3.2, 5, [14.6, 0.6, -0.6]), P(13.94, 5.3), P(13.9, 6.2, 6, [16.6, 1.2, 9.3]), P(18.6, 6.7), P(19.9, 6.65),
  P(21.2, 5.2), P(21.2, 2.5), P(21.2, 0.3), P(20.8, -1.6), P(20.6, -2.6), P(20.3, -3.3, 7, [15.2, 1.0, -8.2]), P(20.4, -2.6), P(20.8, -1.6),
  P(21.2, 0.4), P(21.2, 2.5), P(21.1, 5.0), P(19.9, 6.65), P(17.4, 7.6), P(16.6, 8.5), P(16.6, 9.9), P(17.6, 11.4), P(18.2, 12.6),
  P(18.2, 17.9), P(21.5, 18.4), P(23.6, 19.6, 8, [28.3, 0.6, 9.8]), P(30, 19.8), P(37.6, 19.4), P(42, 16), P(44, 12.5, 9, [33.5, 1.4, 1.0]),
];

export function createTour({ camera, floorAt, lang, onEnd, onControl, onStart }) {
  const el = document.getElementById('tour');
  let on = false, paused = false, s = 0, dwell = 0, stopIdx = -1, curve, samples = [], total = 0, stopAt = [];
  const look = new THREE.Vector3(), tmp = new THREE.Vector3(), m = new THREE.Matrix4(), q = new THREE.Quaternion();
  const EYE = 1.62, SPEED = 1.6, DWELL = 5.5;

  function build() {
    const pts = ROUTE.map((w) => new THREE.Vector3(w.x, floorAt(w.x, w.z) + EYE, w.z));
    curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
    const N = 3000; samples = curve.getSpacedPoints(N); total = curve.getLength();
    stopAt = [];
    ROUTE.forEach((w, i) => { if (w.stop == null) return; let best = 0, bd = 1e9; samples.forEach((p, k) => { const d = (p.x - w.x) ** 2 + (p.z - w.z) ** 2; if (d < bd) { bd = d; best = k; } }); stopAt.push({ i: w.stop, s: best / N * total, look: new THREE.Vector3(...w.look) }); });
  }
  function pointAt(dist) { const u = Math.max(0, Math.min(1, dist / total)); const p = curve.getPointAt(u); p.y = floorAt(p.x, p.z) + EYE; return p; }

  function render() {
    const T = STOPS[lang()] || STOPS.en, U = UI[lang()] || UI.en;
    const st = stopIdx >= 0 ? T[stopIdx] : T[0];
    el.innerHTML = `<div class="tc"><div class="tn mono">${String(Math.max(0, stopIdx) + 1).padStart(2, '0')} ${U.of} ${String(T.length).padStart(2, '0')}</div><b>${st[0]}</b><p>${st[1]}</p></div>
      <div class="tb"><button data-a="pause">${paused ? U.play : U.pause}</button><button data-a="next">${U.next}</button><button data-a="control">${U.control}</button><button data-a="exit">${U.exit}</button></div>
      <div class="tp"><i style="transform:scaleX(${(s / total).toFixed(3)})"></i></div>`;
    el.querySelectorAll('button').forEach((b) => (b.onclick = () => act(b.dataset.a)));
  }
  function act(a) {
    if (a === 'pause') { paused = !paused; render(); }
    if (a === 'next') { const nx = stopAt.find((x) => x.s > s + 0.5); dwell = 0; if (nx) s = Math.max(s, nx.s - 4); else end(); }
    if (a === 'control') { stop(); onControl(); }
    if (a === 'exit') { stop(); onEnd(); }
  }
  function start() {
    build(); on = true; paused = false; s = 0; dwell = 0; stopIdx = -1; el.hidden = false;
    camera.position.copy(pointAt(0)); look.copy(stopAt[0].look); camera.lookAt(look);
    document.body.classList.add('in-tour'); onStart(); render();
  }
  function stop() { on = false; el.hidden = true; document.body.classList.remove('in-tour'); }
  function end() { stop(); onEnd(); }

  let tRender = 0;
  function update(dt) {
    if (!on) return;
    const next = stopAt.find((x) => x.s >= s - 0.01 && x.i > stopIdx);
    if (!paused) {
      if (dwell > 0) { dwell -= dt; if (dwell <= 0) s += 0.02; }
      else {
        const nextS = next ? next.s : total;
        s = Math.min(nextS, s + SPEED * dt);
        if (next && s >= next.s - 0.001) { stopIdx = next.i; dwell = DWELL; render(); }
        else if (!next && s >= total - 0.01) { end(); return; }
      }
    }
    const p = pointAt(s); camera.position.lerp(p, Math.min(1, dt * 8));
    // look ahead along the path; near a stop the gaze turns to what the stop is about
    const ahead = pointAt(Math.min(total, s + 3));
    const cur = stopAt.find((x) => x.i === stopIdx);
    let w = 0;
    if (cur && Math.abs(s - cur.s) < 0.6) w = 1;
    else if (next) w = THREE.MathUtils.smoothstep(4.5 - (next.s - s), 0, 4.5);
    const target = tmp.copy(ahead); target.y = p.y - 0.15;
    if (w > 0) target.lerp(w === 1 && cur ? cur.look : next.look, w);
    if (dwell > 0 && cur) { const sway = Math.sin((DWELL - dwell) * 0.7) * 0.9; target.x += sway * 0.6; target.z += sway * 0.6; }
    look.lerp(target, Math.min(1, dt * 2.6));
    m.lookAt(camera.position, look, camera.up); q.setFromRotationMatrix(m); camera.quaternion.slerp(q, Math.min(1, dt * 5));
    tRender += dt; if (tRender > 0.5) { tRender = 0; const bar = el.querySelector('.tp i'); if (bar) bar.style.transform = `scaleX(${(s / total).toFixed(3)})`; }
  }
  function seek(i) { const st = stopAt.find((x) => x.i === i); if (!st) return; s = Math.max(0, st.s - 0.3); stopIdx = i - 1; dwell = 0; camera.position.copy(pointAt(s)); }
  return { start, stop, update, render, seek, get on() { return on; } };
}
