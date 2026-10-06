import * as THREE from 'three';
import { GROUND, HALL, ROOMS, OUTDOOR, ROW_X_RANGE, ROW_Z_RANGE, HOT_AISLES, COLD_AISLES, ENV, RACK } from './model.js';
export { HALL };

// moving-dash material for flows
function flowMaterial(color, speed = 1, dash = 0.5) {
  const m = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(color) }, uSpeed: { value: speed }, uDash: { value: dash } },
    vertexShader: `varying vec2 vUv;
      #include <common>
      #include <logdepthbuf_pars_vertex>
      void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      #include <logdepthbuf_vertex>
      }`,
    fragmentShader: `uniform float uTime; uniform vec3 uColor; uniform float uSpeed; uniform float uDash; varying vec2 vUv;
      #include <logdepthbuf_pars_fragment>
      void main(){
        #include <logdepthbuf_fragment>
        float s = fract(vUv.x * uDash - uTime * uSpeed);
        float a = smoothstep(0.0, 0.15, s) * (1.0 - smoothstep(0.55, 0.7, s));
        gl_FragColor = vec4(uColor * (0.55 + 1.6 * a), 0.55 + 0.45 * a);
      }`,
    transparent: true, depthWrite: false, toneMapped: false,
  });
  return m;
}
function tube(points, r, mat, tension = 0) {
  const pts = points.map((p) => new THREE.Vector3(...p));
  const path = new THREE.CurvePath();
  for (let i = 0; i < pts.length - 1; i++) path.add(new THREE.LineCurve3(pts[i], pts[i + 1]));
  let len = 0; for (let i = 0; i < pts.length - 1; i++) len += pts[i].distanceTo(pts[i + 1]);
  const g = new THREE.TubeGeometry(path, Math.max(8, Math.round(len * 2)), r, 8, false);
  const uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setX(i, uv.getX(i) * len);
  const m = new THREE.Mesh(g, mat); m.renderOrder = 5; return m;
}

export function createLayers(bld) {
  const out = {};
  const mats = [];
  const er = ROOMS.find((r) => r.key === 'electrical'), pr = ROOMS.find((r) => r.key === 'pump');
  const G = GROUND + 0.08;

  // ---------- POWER ----------
  const power = new THREE.Group(); power.name = 'power';
  const hv = flowMaterial(0xb388ff, 0.6, 0.6), lv = flowMaterial(0xffb300, 0.8, 0.8), gen = flowMaterial(0xff7043, 0.5, 0.8), ups = flowMaterial(0x26c6da, 1.0, 1.2), feedA = flowMaterial(0x26c6da, 1.2, 1.6), feedB = flowMaterial(0xffca28, 1.2, 1.6);
  mats.push(hv, lv, gen, ups, feedA, feedB);
  const s = OUTDOOR.substation, gs = OUTDOOR.genset;
  power.add(tube([[OUTDOOR.fence.x1 + 25, G, -6.2], [s.x1, G, -6.2]], 0.09, hv), tube([[OUTDOOR.fence.x1 + 25, G, -3.4], [s.x1, G, -3.4]], 0.09, hv));
  power.add(tube([[s.x0, G, -4.6], [ENV.x1 + 0.1, G, -4.6], [ENV.x1 - 0.4, 2.9, -4.6], [er.x1 - 0.5, 2.9, -4.6], [er.x1 - 0.5, 1.6, -4.6]], 0.11, lv));
  power.add(tube([[gs.x0, G, 9.0], [27, G, 2.0], [ENV.x1 + 0.1, G, -2.6], [ENV.x1 - 0.4, 2.9, -2.6], [er.x0 + 6.8, 2.9, -2.6], [er.x0 + 6.8, 2.1, -2.6]], 0.11, gen));
  power.add(tube([[er.x0 + 6.8, 2.6, er.z1 - 0.4], [er.x1 - 0.5, 2.6, er.z1 - 0.4]], 0.08, lv));
  power.add(tube([[er.x1 - 0.5, 2.5, er.z0 + 1.6], [er.x1 - 0.5, 2.5, er.z0 + 0.6], [er.x0 + 0.8, 2.5, er.z0 + 0.6], [er.x0 + 0.8, 1.9, er.z0 + 0.6]], 0.1, lv));
  // UPS output → ЩБП → rack distribution boards on the south wall of the hall
  power.add(tube([[er.x0 + 7.2, 2.3, er.z0 + 0.6], [er.x0 + 8.5, 2.3, er.z0 + 0.6], [er.x0 + 8.5, 2.9, er.z0 + 0.6], [er.x0 - 0.3, 2.9, er.z0 + 0.6], [HALL.x0 + 0.4, 3.3, er.z0 + 0.6], [HALL.x0 + 0.4, 3.3, HALL.z1 - 0.3], [-2.0, 3.3, HALL.z1 - 0.3], [-2.0, HALL.floor + 2.0, HALL.z1 - 0.3]], 0.1, ups));
  // per-row feeds A and B along the cable trays
  ROW_X_RANGE.forEach(([a, b], r) => {
    const cx = (a + b) / 2;
    power.add(tube([[-4.4, HALL.floor + 2.0, HALL.z1 - 0.5], [-4.4, HALL.floor + 2.62, HALL.z1 - 1.0], [cx - 0.12, HALL.floor + 2.62, HALL.z1 - 1.0], [cx - 0.12, HALL.floor + 2.58, ROW_Z_RANGE[1]], [cx - 0.12, HALL.floor + 2.58, ROW_Z_RANGE[0] + 0.3]], 0.035, feedA));
    power.add(tube([[-3.2, HALL.floor + 2.0, HALL.z1 - 0.5], [-3.2, HALL.floor + 2.7, HALL.z1 - 1.1], [cx + 0.12, HALL.floor + 2.7, HALL.z1 - 1.1], [cx + 0.12, HALL.floor + 2.58, ROW_Z_RANGE[1]], [cx + 0.12, HALL.floor + 2.58, ROW_Z_RANGE[0] + 0.3]], 0.035, feedB));
  });
  power.visible = false; out.power = power;

  // ---------- COOLING: chilled water ----------
  const cooling = new THREE.Group(); cooling.name = 'cooling';
  const sup = flowMaterial(0x42a5f5, 0.9, 1.0), ret = flowMaterial(0xef5350, -0.9, 1.0);
  mats.push(sup, ret);
  const yU = 0.18; // under the raised floor
  const chillerLine = (c, dz, mat) => [[c.x0, GROUND + 0.5, (c.z0 + c.z1) / 2 + dz], [23.6, GROUND + 0.5, (c.z0 + c.z1) / 2 + dz], [23.6, GROUND + 0.5, 3.3 + dz], [ENV.x1, 0.9, 3.3 + dz], [pr.x1 - 0.4, 0.9, 3.3 + dz], [pr.x1 - 0.4, 1.4 + (mat === ret ? 0.35 : 0), pr.z0 + 0.5]];
  OUTDOOR.chillers.forEach((c) => { cooling.add(tube(chillerLine(c, -0.18, sup), 0.08, sup)); cooling.add(tube(chillerLine(c, 0.18, ret), 0.08, ret)); });
  // header → under the raised floor → along each row to its coolers
  cooling.add(tube([[pr.x0 + 0.4, 1.4, pr.z0 + 0.5], [HALL.x1 + 0.2, 1.4, pr.z0 + 0.5], [HALL.x1 - 0.3, yU, pr.z0 + 0.5], [HALL.x1 - 0.3, yU, ROW_Z_RANGE[0] - 0.3], [HALL.x0 + 1.0, yU, ROW_Z_RANGE[0] - 0.3]], 0.07, sup));
  cooling.add(tube([[pr.x0 + 0.4, 1.75, pr.z0 + 0.5], [HALL.x1 + 0.2, 1.75, pr.z0 + 0.5], [HALL.x1 - 0.5, yU + 0.12, pr.z0 + 0.5], [HALL.x1 - 0.5, yU + 0.12, ROW_Z_RANGE[0] - 0.55], [HALL.x0 + 1.0, yU + 0.12, ROW_Z_RANGE[0] - 0.55]], 0.07, ret));
  bld.coolers.forEach((k) => {
    cooling.add(tube([[k.x - 0.15, yU, ROW_Z_RANGE[0] - 0.3], [k.x - 0.15, yU, k.z], [k.x - 0.15, HALL.floor + 0.2, k.z]], 0.03, sup));
    cooling.add(tube([[k.x + 0.15, yU + 0.12, ROW_Z_RANGE[0] - 0.55], [k.x + 0.15, yU + 0.12, k.z], [k.x + 0.15, HALL.floor + 0.2, k.z]], 0.03, ret));
  });
  cooling.visible = false; out.cooling = cooling;

  // ---------- AIRFLOW: aisle volumes, particles, inlet heat map ----------
  const airflow = new THREE.Group(); airflow.name = 'airflow';
  const vol = (a, b, color) => { const g = new THREE.BoxGeometry(b - a - 0.04, RACK.h - 0.05, ROW_Z_RANGE[1] - ROW_Z_RANGE[0] - 0.05); g.translate((a + b) / 2, HALL.floor + RACK.h / 2, (ROW_Z_RANGE[0] + ROW_Z_RANGE[1]) / 2); return new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.13, depthWrite: false, toneMapped: false })); };
  HOT_AISLES.forEach(([a, b]) => airflow.add(vol(a, b, 0xff5a3c)));
  COLD_AISLES.forEach(([a, b]) => airflow.add(vol(a, b, 0x3fa9ff)));
  // particles: cold aisle → through racks → hot aisle → back through the coolers
  const PN = 2400, pPos = new Float32Array(PN * 3), pCol = new Float32Array(PN * 3), pState = [];
  const lanes = [];
  [[0, 1], [2, 3], [4, 5]].forEach(([r1, r2], i) => {
    const hot = HOT_AISLES[i], hotC = (hot[0] + hot[1]) / 2;
    const coldL = i === 0 ? HALL.x0 + 0.9 : (COLD_AISLES[i - 1][0] + COLD_AISLES[i - 1][1]) / 2;
    const coldR = (COLD_AISLES[i][0] + COLD_AISLES[i][1]) / 2;
    lanes.push([coldL, hotC], [coldR, hotC]);
  });
  for (let i = 0; i < PN; i++) { const l = lanes[i % lanes.length]; pState.push({ l, t: Math.random(), z: ROW_Z_RANGE[0] + 0.2 + Math.random() * (ROW_Z_RANGE[1] - ROW_Z_RANGE[0] - 0.4), y: HALL.floor + 0.2 + Math.random() * 1.75, sp: 0.18 + Math.random() * 0.12 }); }
  const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pPos, 3)); pg.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
  const points = new THREE.Points(pg, new THREE.PointsMaterial({ size: 0.06, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false, toneMapped: false }));
  points.frustumCulled = false; airflow.add(points);
  const cCold = new THREE.Color(0x5ab8ff), cHot = new THREE.Color(0xff6a3d), cc = new THREE.Color();
  function updateParticles(dt) {
    for (let i = 0; i < PN; i++) {
      const p = pState[i]; p.t += dt * p.sp; if (p.t > 1) { p.t -= 1; p.y = HALL.floor + 0.2 + Math.random() * 1.75; }
      const [a, b] = p.l, t = p.t;
      const x = a + (b - a) * Math.min(1, t * 1.25);
      const y = t < 0.8 ? p.y : p.y + (t - 0.8) * 2.5; // rises in the hot aisle toward the containment roof
      pPos[i * 3] = x; pPos[i * 3 + 1] = Math.min(HALL.floor + RACK.h - 0.05, y); pPos[i * 3 + 2] = p.z;
      cc.copy(cCold).lerp(cHot, Math.min(1, Math.max(0, (t - 0.35) * 2.2)));
      pCol[i * 3] = cc.r; pCol[i * 3 + 1] = cc.g; pCol[i * 3 + 2] = cc.b;
    }
    pg.attributes.position.needsUpdate = true; pg.attributes.color.needsUpdate = true;
  }
  // inlet temperature map over the floor (ASHRAE scale 18–27 °C)
  const hc = document.createElement('canvas'); hc.width = 380; hc.height = 236;
  const htex = new THREE.CanvasTexture(hc); htex.colorSpace = THREE.SRGBColorSpace;
  const hg = new THREE.PlaneGeometry(HALL.x1 - HALL.x0, HALL.z1 - HALL.z0); hg.rotateX(-Math.PI / 2); hg.translate((HALL.x0 + HALL.x1) / 2, HALL.floor + 0.02, (HALL.z0 + HALL.z1) / 2);
  const heat = new THREE.Mesh(hg, new THREE.MeshBasicMaterial({ map: htex, transparent: true, opacity: 0.85, depthWrite: false, toneMapped: false }));
  heat.renderOrder = 4; airflow.add(heat);
  const ramp = (v) => { // 18 → 27 °C
    const t = Math.min(1, Math.max(0, (v - 18) / 9));
    const stops = [[0, [40, 110, 255]], [0.3, [60, 200, 230]], [0.5, [90, 220, 120]], [0.72, [250, 220, 60]], [1, [240, 70, 50]]];
    for (let i = 0; i < stops.length - 1; i++) { const [a, ca] = stops[i], [b, cb] = stops[i + 1]; if (t <= b) { const k = (t - a) / (b - a); return ca.map((c, j) => Math.round(c + (cb[j] - c) * k)); } }
    return stops[stops.length - 1][1];
  };
  function updateHeat(samples) { // samples: [{x, z, v}]
    const W = hc.width, H = hc.height, g = hc.getContext('2d'), img = g.createImageData(W, H);
    for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
      const x = HALL.x0 + (i + 0.5) / W * (HALL.x1 - HALL.x0), z = HALL.z0 + (j + 0.5) / H * (HALL.z1 - HALL.z0);
      let ws = 0, vs = 0;
      for (const s of samples) { const d2 = (s.x - x) ** 2 + (s.z - z) ** 2 + 0.6; const w = 1 / (d2 * d2); ws += w; vs += w * s.v; }
      let v = vs / ws;
      for (const [a, b] of HOT_AISLES) if (x > a && x < b && z > ROW_Z_RANGE[0] && z < ROW_Z_RANGE[1]) v += 9.5;
      const [r, gg, bb] = ramp(v), k = (j * W + i) * 4;
      img.data[k] = r; img.data[k + 1] = gg; img.data[k + 2] = bb; img.data[k + 3] = 200;
    }
    g.putImageData(img, 0, 0); htex.needsUpdate = true;
  }
  airflow.visible = false; out.airflow = airflow;

  // ---------- NETWORK ----------
  const network = new THREE.Group(); network.name = 'network';
  const net = flowMaterial(0x69f0ae, 1.4, 1.6), wan = flowMaterial(0xe040fb, 0.9, 1.0);
  mats.push(net, wan);
  const mda = bld.items.get('MDA 1.1');
  for (let r = 2; r <= 7; r++) { const z = bld.items.get('ZDA 1.' + r); network.add(tube([[mda.pos.x, HALL.floor + 2.0, mda.pos.z], [mda.pos.x, HALL.floor + 2.85, mda.pos.z], [z.pos.x, HALL.floor + 2.85, mda.pos.z], [z.pos.x, HALL.floor + 2.0, z.pos.z]], 0.03, net)); }
  ['HDA 1.1', 'HDA 1.2'].forEach((id) => { const h = bld.items.get(id); network.add(tube([[mda.pos.x, HALL.floor + 2.0, mda.pos.z], [mda.pos.x, HALL.floor + 2.3, (mda.pos.z + h.pos.z) / 2], [h.pos.x, HALL.floor + 2.0, h.pos.z]], 0.03, net)); });
  // two diverse fibre routes: line 1 leaves through facade Б, line 2 through the entrance end
  const cr = ROOMS.find((r) => r.key === 'control');
  const cx = (cr.x0 + cr.x1) / 2;
  const wan2 = flowMaterial(0xf06292, 0.9, 1.0); mats.push(wan2);
  network.add(tube([[mda.pos.x - 0.15, HALL.floor + 2.0, mda.pos.z], [mda.pos.x - 0.15, 3.25, mda.pos.z], [mda.pos.x - 0.15, 3.25, HALL.z0 - 0.4], [cx, 2.9, HALL.z0 - 0.4], [cx, 2.9, ENV.z0 + 0.3], [cx - 2, G, ENV.z0 - 1.0], [cx - 6, G, OUTDOOR.fence.z0 - 1], [cx - 30, G, OUTDOOR.fence.z0 - 60]], 0.06, wan));
  network.add(tube([[mda.pos.x + 0.15, HALL.floor + 2.0, mda.pos.z], [mda.pos.x + 0.15, 3.35, mda.pos.z], [mda.pos.x + 0.15, 3.35, 2.4], [ENV.x0 + 0.4, 2.9, 2.4], [ENV.x0 - 0.5, G, 2.4], [OUTDOOR.fence.x0 + 1, G, 3.6], [OUTDOOR.fence.x0 - 70, G, 6]], 0.06, wan2));
  bld.items.set('FIBER-1', { id: 'FIBER-1', kind: 'fiber', line: 0, pos: new THREE.Vector3(cx - 6, GROUND + 0.6, OUTDOOR.fence.z0 - 1) });
  bld.items.set('FIBER-2', { id: 'FIBER-2', kind: 'fiber', line: 1, pos: new THREE.Vector3(OUTDOOR.fence.x0 + 1, GROUND + 0.6, 3.6) });
  bld.labels.push({ id: 'lbl-f1', item: 'FIBER-1', pos: new THREE.Vector3(cx - 6, GROUND + 2.2, OUTDOOR.fence.z0 - 1), group: 'network', cls: 'equip fiber' });
  bld.labels.push({ id: 'lbl-f2', item: 'FIBER-2', pos: new THREE.Vector3(OUTDOOR.fence.x0 + 1, GROUND + 2.2, 3.6), group: 'network', cls: 'equip fiber' });
  network.visible = false; out.network = network;
  // grid: two 10 kV feeders from substation 110/10 kV №156A reach the site from the east
  bld.items.set('GRID', { id: 'GRID', kind: 'grid', pos: new THREE.Vector3(OUTDOOR.fence.x1 + 2, GROUND + 0.6, -4.8) });
  bld.labels.push({ id: 'lbl-grid', item: 'GRID', pos: new THREE.Vector3(OUTDOOR.fence.x1 + 6, GROUND + 2.4, -4.8), group: 'power', cls: 'equip grid' });

  // ---------- ALARM MARKERS ----------
  const alarms = new THREE.Group(); alarms.name = 'alarms';
  const ringGeo = new THREE.RingGeometry(0.28, 0.36, 40);
  const markers = new Map();
  function marker(id) {
    if (markers.has(id)) return markers.get(id);
    const it = bld.items.get(id); if (!it) return null;
    const mat = new THREE.MeshBasicMaterial({ color: 0xff5252, transparent: true, toneMapped: false, side: THREE.DoubleSide });
    const m = new THREE.Mesh(ringGeo, mat); m.renderOrder = 10;
    m.position.copy(it.pos).add(new THREE.Vector3(0, 1.45, 0));
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.9, 6), mat); stem.position.y = -0.62; m.add(stem);
    alarms.add(m); markers.set(id, m); return m;
  }
  function setAlarms(map, time, cam) { // map: id -> severity
    markers.forEach((m, id) => (m.visible = map.has(id)));
    for (const [id, sev] of map) { const m = marker(id); if (!m) continue; m.visible = true; m.material.color.set(sev === 'avg' ? 0xff8a3d : 0xffd54f); const s = 1 + 0.25 * Math.sin(time * 6); m.scale.setScalar(s); m.quaternion.copy(cam.quaternion); }
  }
  out.alarms = alarms;

  return { ...out, update(t, dt) { mats.forEach((m) => (m.uniforms.uTime.value = t)); if (airflow.visible) updateParticles(dt); }, updateHeat, setAlarms, ramp };
}
