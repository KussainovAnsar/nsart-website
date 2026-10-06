// Facility model: geometry from working drawings BIGE 64-07/ПР/АС-2 and 54-2012 (ARLAN SI),
// telemetry profiles from the KT Cloud Lab Zabbix 4.0 dashboards (6 Sep – 4 Oct 2026).
// Local frame, metres: x runs from grid line 1 (−22.425) to grid line 9 (+22.425),
// z runs from grid line Б (−9) to grid line А (+9), y is up, finished floor = 0.

export const AX = [-22.425, -16.425, -10.425, -4.425, 1.575, 7.575, 13.575, 19.575, 22.425];
export const AZ = { 'Б': -9, 'Б1': -3, 'А1': 3, 'А': 9 };
export const GROUND = -0.6;
export const ENV = { x0: -22.68, x1: 22.63, z0: -9.55, z1: 9.5, top: 5.2, cornice: 3.45 };
export const HALL = { x0: -7.25, x1: 11.75, z0: -7.65, z1: 4.15, floor: 0.4, top: 3.58, ceil: 3.45 };

// plan sheet АС-2 lsheet 8 was traced at 33.63 px per metre; grid line 1 at px 377, Б at px 172
const PX = (px) => +(AX[0] + (px - 377) / 33.63).toFixed(3);
const PZ = (py) => +(AZ['Б'] + (py - 172) / 33.73).toFixed(3);
const seg = (a, b, c, d) => [PX(a), PZ(b), PX(c), PZ(d)];

// interior partitions (centre lines), traced from the plan
export const WALLS = [
  seg(560, 172, 560, 413), seg(377, 305, 560, 305), seg(377, 413, 560, 413),
  seg(715, 172, 715, 430), seg(887, 172, 887, 220), seg(563, 430, 887, 430),
  seg(440, 413, 440, 563), seg(377, 563, 563, 563), seg(563, 413, 563, 690),
  seg(465, 563, 465, 779), seg(465, 630, 563, 630), seg(465, 688, 563, 688), seg(530, 688, 530, 779),
  seg(620, 515, 620, 720), seg(620, 515, 820, 515), seg(690, 515, 690, 635), seg(620, 565, 690, 565),
  seg(620, 720, 710, 720), seg(710, 565, 710, 779), seg(690, 635, 820, 635), seg(820, 515, 820, 779),
  seg(820, 623, 887, 623), seg(1000, 623, 1000, 779),
  seg(1540, 172, 1540, 220), seg(1540, 623, 1540, 779),
  seg(1540, 408, 1890, 408), seg(1740, 408, 1740, 620), seg(1740, 620, 1700, 650), seg(1540, 650, 1700, 650),
  seg(1800, 408, 1800, 779), seg(1800, 560, 1890, 560),
];
// door openings [x, z, width]
const door = (px, py, w) => [PX(px), PZ(py), w];
// entrance door centre on facade 1 (z), shared by the shell and the plan
export const ENTRANCE_Z = -0.165;
export const DOORS = [
  door(372, 470, 1.5),
  door(440, 490, 1.0), door(500, 413, 0.9), door(470, 305, 0.9), door(563, 470, 1.1), door(640, 430, 0.9), door(800, 430, 0.9),
  door(500, 563, 0.9), door(465, 600, 0.8), door(465, 700, 0.8), door(515, 630, 0.8), door(515, 688, 0.8),
  door(655, 515, 0.8), door(655, 565, 0.8), door(660, 720, 0.8), door(760, 515, 0.9), door(760, 635, 0.9), door(820, 700, 0.9),
  door(855, 623, 1.3), door(1000, 700, 1.3),
  door(1540, 700, 1.3), door(1600, 650, 1.0), door(1830, 408, 1.0), door(1845, 560, 0.9), door(1800, 700, 0.9),
  door(1688, 779, 1.5), door(840, 172, 0.75),
  door(887, 600, 1.3), door(1505, 623, 1.3), // hall doors Д-1
];

// rooms: number on sheet АС-2, key for the name, bbox in px, area m², floor level
const room = (n, key, a, b, c, d, area, lvl = 0) => ({ n, key, x0: PX(a), z0: PZ(b), x1: PX(c), z1: PZ(d), area, lvl });
export const ROOMS = [
  room(1, 'vestibule', 377, 413, 440, 563, 3.83), room(2, 'lobby', 440, 413, 563, 563, 19.08),
  room(3, 'office', 377, 305, 560, 413, 16.22), room(4, 'office', 377, 172, 560, 305, 18.09),
  room(5, 'office', 560, 172, 715, 430, 23.92), room(6, 'control', 715, 172, 887, 430, 23.92, 0.4),
  room(7, 'corridor', 563, 430, 887, 515, 34.0), room(8, 'office', 690, 515, 820, 635, 11.8),
  room(9, 'service', 715, 635, 820, 779, 12.5, 0.4), room(11, 'service', 620, 565, 710, 720, 10.3),
  room(17, 'wc', 377, 563, 465, 630, 5.1), room(18, 'staff', 377, 630, 465, 779, 11.8),
  room(19, 'service', 820, 623, 1000, 779, 21.4, 0.4), room(20, 'corridor', 1000, 623, 1540, 779, 71.7),
  room(21, 'loading', 1540, 650, 1800, 779, 27.3), room(22, 'storage', 1800, 560, 1890, 779, 16.6),
  room(23, 'pump', 1540, 408, 1740, 650, 41.8), room(24, 'duty', 1800, 408, 1890, 560, 11.2),
  room(25, 'electrical', 1540, 172, 1890, 408, 71.3), room(27, 'hall', 887, 220, 1535, 623, 221.7, 0.4),
];

// ---------- machine hall per EL sheet 41 and SKS sheets 7–10 ----------
const ROW_X = [1.86, 3.93, 6.20, 8.27, 10.54, 12.61, 14.88]; // offset of each row from the west hall wall
export const RACK = { w: 0.6, d: 1.07, h: 2.0 };
const ROW_END_Z = HALL.z1 - 2.22;
const COOLERS = { 1: [[4, 1, 1], [11, 2, 0]], 2: [[3, 3, 0], [9, 4, 0]], 3: [[5, 5, 0], [12, 6, 1]], 4: [[3, 7, 0], [9, 8, 0]], 5: [[5, 9, 1], [12, 10, 0]], 6: [[3, 11, 0], [9, 12, 0]], 7: [[5, 13, 0], [12, 14, 1]] };

export function buildHall() {
  const items = [];
  let clientIdx = 0;
  for (let r = 1; r <= 7; r++) {
    const x0 = HALL.x0 + ROW_X[r - 1];
    const backDir = r % 2 ? 1 : -1; // rows 1,3,5,7 turn their backs to +x
    const k = Object.fromEntries(COOLERS[r].map(([p, n, big]) => [p, { n, big }]));
    let eda = 0;
    const r1 = ['EDA', 'EDA', 'EDA', 'K', 'MDA 1.1', 'HDA 1.1', 'HDA 1.2', 'EDA', 'EDA', 'EDA', 'K', 'EDA', 'EDA', 'EDA'];
    for (let p = 1; p <= 14; p++) {
      const z = ROW_END_Z - 0.3 - (p - 1) * 0.6;
      const base = { row: r, pos: p, x: x0 + RACK.d / 2, z, backDir };
      if (k[p]) { items.push({ ...base, kind: 'cooler', id: 'K' + k[p].n, ac: k[p].n, big: !!k[p].big }); continue; }
      let kind = 'eda', id;
      if (r === 1 && r1[p - 1] !== 'EDA') { id = r1[p - 1]; kind = id.startsWith('MDA') ? 'mda' : 'hda'; }
      else if (r > 1 && p === 7) { id = 'ZDA 1.' + r; kind = 'zda'; }
      else { eda++; id = `EDA 1.${r}.${eda}`; }
      items.push({ ...base, kind, id, ci: kind === 'eda' ? ++clientIdx : 0 });
    }
  }
  return items;
}
export const ROW_X_RANGE = ROW_X.map((o) => [HALL.x0 + o, HALL.x0 + o + RACK.d]);
export const ROW_Z_RANGE = [ROW_END_Z - 8.4, ROW_END_Z];
// containment per row layout: hot aisles are the 1.0 m aisles between rows 1|2, 3|4, 5|6
export const HOT_AISLES = [[1, 2], [3, 4], [5, 6]].map(([a, b]) => [ROW_X_RANGE[a - 1][1], ROW_X_RANGE[b - 1][0]]);
export const COLD_AISLES = [[2, 3], [4, 5], [6, 7]].map(([a, b]) => [ROW_X_RANGE[a - 1][1], ROW_X_RANGE[b - 1][0]]);

// ---------- outdoor plant per EL sheet 42, SKS sheet 17 ----------
export const OUTDOOR = {
  chillers: [{ id: 'CH-1', x0: 25.4, x1: 31.2, z0: 5.95, z1: 8.75 }, { id: 'CH-2', x0: 25.4, x1: 31.2, z0: 10.75, z1: 13.55 }],
  genset: { x0: 33.4, x1: 36.9, z0: 6.0, z1: 15.4 },
  substation: { x0: 30.6, x1: 36.2, z0: -9.9, z1: 0.9, h: 4.8 },
  solar: { x: 19.5, z: -15.5 },
  vrf: { x: -7.4, z: 10.0 },
  fence: { x0: -50, x1: 47, z0: -30, z1: 27 },
};

// ---------- equipment facts ----------
export const FACTS = {
  ups: { make: 'Eaton', model: 'Power Xpert 9395-1100', kva: 825, kw: 742, modules: 4, bat: '4 × 9395-BAT10-500', autonomy: 10 },
  genset: { make: 'Cummins', model: 'C1000D5', engine: 'QST30-G3 V12, 30.5 l', standby: 833, prime: 751, kva: 1041, tank: 4000, hours: 24 },
  tp: { tx: '2 × ТМ-1600/10/0.4', kva: 3200, feeders: ['№20', '№17'], hv: '10 kV' },
  chiller: { make: 'HiRef', model: 'LSE658FS', cooling: 633, elec: 239 },
  sensors: { make: 'APC', model: 'AP9335TH', count: 24 },
  bms: { name: 'Zabbix 4.0.50', proto: 'SNMP', archive: 24 },
  fire: { agent: 'HFC-227ea', mass: 1142, modules: 6, nozzles: 18 },
  racks: { model: 'APC NetShelter SX 42U AR3100', total: 84, client: 75 },
};

// ---------- telemetry: deterministic replay shaped on the Zabbix trend charts ----------
export const T0 = Date.UTC(2026, 8, 6, 0, 0) - 5 * 3600e3; // 6 Sep 2026 00:00 Almaty (UTC+5)
export const T1 = Date.UTC(2026, 9, 4, 21, 14) - 5 * 3600e3;
const H = 3600e3, DAY = 24 * H;
function hash(n) { n = (n ^ 61) ^ (n >>> 16); n = n + (n << 3); n = n ^ (n >>> 4); n = Math.imul(n, 0x27d4eb2d); n = n ^ (n >>> 15); return (n >>> 0) / 4294967296; }
function noise(t, seed, period) { // smooth value noise in [-1,1]
  const u = t / period, i = Math.floor(u), f = u - i, s = f * f * (3 - 2 * f);
  const a = hash(i * 7919 + seed * 104729), b = hash((i + 1) * 7919 + seed * 104729);
  return (a + (b - a) * s) * 2 - 1;
}
const localHour = (t) => (((t + 5 * H) % DAY) + DAY) % DAY / H;

export const telemetry = {
  upsPhase(t, ph) { // kW per phase, 82–92 kW band
    const base = [86.6, 88.4, 84.6][ph];
    const day = Math.sin((localHour(t) - 9) / 24 * 2 * Math.PI) * 1.6;
    const trend = (t - T0) / (T1 - T0) * 1.2;
    return base + day + trend + noise(t, 11 + ph, 5 * H) * 1.1 + noise(t, 21 + ph, 40 * 60e3) * 0.45;
  },
  upsLoad(t) { return this.upsPhase(t, 0) + this.upsPhase(t, 1) + this.upsPhase(t, 2); },
  upsVin(t, ph) { return 229.5 + noise(t, 31 + ph, 3 * H) * 1.6; },
  upsVout(t, ph) { return 230.6 + noise(t, 41 + ph, 6 * H) * 0.25; },
  battery(t) { // float 517–519 V, test-charge plateaus at 553 V as on the chart
    const d = (t - T0) / DAY;
    const plateaus = [[9.4, 12.9], [14.6, 17.2], [19.3, 23.8]];
    for (const [a, b] of plateaus) {
      if (d >= a && d < b) return 553 - (hash(Math.floor(t / 7200e3)) < 0.05 ? 5 : 0);
      if (d >= b && d < b + 1.6) return 518 + 35 * Math.exp(-(d - b) * 3.2);
    }
    return 517.6 + noise(t, 51, 12 * H) * 0.8;
  },
  inlet(t, ac) { // max rack inlet per in-row cooler, °C
    const base = 21.0 + hash(ac * 13) * 0.9;
    let v = base + noise(t, 60 + ac, 2 * H) * 0.35 + noise(t, 80 + ac, 20 * 60e3) * 0.15;
    if (ac === 6 && t > Date.UTC(2026, 9, 2, 12) - 5 * H) v += 0.9;
    if (ac === 9) v -= 0.6;
    return v;
  },
  humidity(t, ac) { // return-air RH, %
    const base = ac === 9 ? 50.5 : 37 + hash(ac * 17) * 6;
    const drift = ac === 9 ? -2.6 * (t - T0) / (T1 - T0) : 0;
    return base + drift + noise(t, 90 + ac, 9 * H) * 1.6;
  },
  fan(t, ac) { // fan speed, %
    const v = 86 + hash(ac * 29) * 5 + noise(t, 100 + ac, 6 * H) * 5 + Math.max(0, Math.sin((localHour(t) - 2) / 24 * 2 * Math.PI)) * 3;
    return Math.min(99, v + (t > Date.UTC(2026, 9, 2) - 5 * H ? 3.5 : 0));
  },
  sensor(t, i) { return 20.6 + hash(i * 37) * 1.6 + noise(t, 200 + i, 3 * H) * 0.4; },
  rackPower(t, i) { // kW for client rack i of 75; shares sum to the UPS output
    if (hash(i * 53) < 0.08) return 0.18 + noise(t, 300 + i, 4 * H) * 0.02;
    const w = 0.55 + hash(i * 53) * 0.9;
    return w * this.upsLoad(t) / 75 * (1 + noise(t, 300 + i, 4 * H) * 0.06);
  },
  wan(t, link) { // Gbit/s
    const base = [1.62, 1.41, 1.25, 1.05][link];
    return base + Math.sin((localHour(t) - 14) / 24 * 2 * Math.PI) * 0.18 + noise(t, 400 + link, 30 * 60e3) * 0.12;
  },
  outside(t) { // Alatau, early autumn: nights ~5 °C, afternoons ~18 °C
    const d = (t - T0) / DAY;
    return 12.5 - d * 0.12 + 6.5 * Math.sin((localHour(t) - 9) / 24 * 2 * Math.PI) + noise(t, 500, 18 * H) * 2.2;
  },
  rackActive(i) { return hash(i * 53) >= 0.08; }, // client racks without load sit in standby
  // facility power model: chiller COP falls with outside temperature, fans follow the cube law
  facility(t) {
    const it = this.upsLoad(t), out = this.outside(t);
    const cop = Math.max(2.6, 5.6 - 0.085 * (out - 8));
    const chillers = it * 1.06 / cop;
    let fans = 0; for (let n = 1; n <= 14; n++) fans += (n === 1 || n === 6 || n === 9 || n === 14 ? 2.2 : 0.9) * (this.fan(t, n) / 100) ** 3;
    const pumps = 14.5, upsLoss = it * 0.045, other = 9.5;
    const total = it + chillers + fans + pumps + upsLoss + other;
    return { it, chillers, fans, pumps, upsLoss, other, total, pue: total / it, cop };
  },
};

export function parseZbxTime(s) { // "04.10.2026 06:09:25" in Almaty time
  if (!s) return null;
  const [d, tm] = s.split(' ');
  const [dd, mm, yy] = d.split('.').map(Number);
  const [h, m, sec] = tm.split(':').map(Number);
  return Date.UTC(yy, mm - 1, dd, h, m, sec) - 5 * H;
}

// maps a Zabbix host to the 3D object id it belongs to
export function hostTarget(host) {
  let m = host.match(/^AC (\d+)$/);
  if (m) return +m[1] <= 14 ? 'K' + m[1] : 'KE' + (+m[1] - 14);
  m = host.match(/^ZDA1\.(\d)/);
  if (m) return 'ZDA 1.' + m[1];
  if (host.startsWith('MDA1.1')) return 'MDA 1.1';
  if (/ARISTA|NTNX/.test(host)) return 'HDA 1.1';
  return null;
}
