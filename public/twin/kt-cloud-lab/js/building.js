import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import * as TX from './tex.js';
import { AX, ENV, HALL, GROUND, WALLS, DOORS, ENTRANCE_Z, ROOMS, RACK, OUTDOOR, buildHall, HOT_AISLES, COLD_AISLES, ROW_X_RANGE, ROW_Z_RANGE } from './model.js';

// box whose UVs are in world metres, so one material tiles evenly on any size
function wbox(sx, sy, sz, x, y, z) {
  const g = new THREE.BoxGeometry(sx, sy, sz); g.translate(x, y, z);
  const p = g.attributes.position, n = g.attributes.normal, uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) {
    const ax = Math.abs(n.getX(i)), ay = Math.abs(n.getY(i));
    if (ay > 0.5) uv.setXY(i, p.getX(i), p.getZ(i));
    else if (ax > 0.5) uv.setXY(i, p.getZ(i) * -Math.sign(n.getX(i)), p.getY(i));
    else uv.setXY(i, p.getX(i) * Math.sign(n.getZ(i)), p.getY(i));
  }
  return g;
}
const box = (x0, y0, z0, x1, y1, z1) => wbox(Math.abs(x1 - x0), Math.abs(y1 - y0), Math.abs(z1 - z0), (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);

export function createBuilding({ clip, weak = false }) {
  const root = new THREE.Group(); root.name = 'kt-building';
  const groups = {};
  for (const k of ['shell', 'roof', 'interior', 'ceilings', 'racks', 'electrical', 'outdoor', 'fire', 'labels']) { groups[k] = new THREE.Group(); groups[k].name = k; root.add(groups[k]); }
  const pickables = [];
  const labels = [];
  const items = new Map(); // id -> {kind, object, instance, data}

  // ---------- materials ----------
  const M = {};
  const std = (o) => new THREE.MeshStandardMaterial({ roughness: 0.8, metalness: 0, ...o });
  // large matte surfaces fall back to Lambert on integrated GPUs
  const matte = (o) => { if (!weak) return std(o); const { roughness, metalness, ...rest } = o; return new THREE.MeshLambertMaterial(rest); };
  const tile = (t, s) => { t.repeat.set(1 / s, 1 / s); return t; };
  M.siding = matte({ map: tile(TX.siding(), 2), roughness: 0.62 });
  M.profiled = std({ map: tile(TX.profiled(), 1), metalness: 0.55, roughness: 0.38 });
  M.granite = matte({ map: tile(TX.granite(), 0.6), roughness: 0.45 });
  M.graniteStep = matte({ map: tile(TX.granite('#86574f'), 0.6), roughness: 0.5 });
  M.glass = new THREE.MeshPhysicalMaterial({ color: 0x1c2a33, metalness: 0.2, roughness: 0.05, transmission: 0, reflectivity: 0.9, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 1.6 });
  M.glassClear = new THREE.MeshPhysicalMaterial({ color: 0xa9c3cc, metalness: 0, roughness: 0.05, transparent: true, opacity: 0.28, depthWrite: false, side: THREE.DoubleSide });
  M.frame = std({ color: 0xb6bcc2, metalness: 0.7, roughness: 0.35 });
  M.white = std({ color: 0xf2f1ec, roughness: 0.55 });
  M.steel = std({ color: 0xd2d6da, metalness: 0.9, roughness: 0.25 });
  M.darkSteel = std({ color: 0x2a2e33, metalness: 0.5, roughness: 0.5 });
  M.roof = std({ map: tile(TX.profiled(), 1), color: 0xc4c8cc, metalness: 0.25, roughness: 0.62 });
  M.coping = std({ color: 0xe9e6dc, metalness: 0.3, roughness: 0.4 });
  M.wallPaint = matte({ map: tile(TX.wallPaint('#dcd6dd'), 2), roughness: 0.85 });
  M.sandwich = matte({ map: tile(TX.sandwich(), 1), roughness: 0.6, metalness: 0.1 });
  M.terrazzo = matte({ map: tile(TX.terrazzo(), 2.5), roughness: 0.35 });
  M.darkTiles = matte({ map: tile(TX.darkTiles(), 2.4), roughness: 0.4 });
  M.lino = matte({ color: 0x8e96a3, roughness: 0.5 });
  M.raised = matte({ map: tile(TX.raisedFloor(false), 0.6), roughness: 0.45 });
  M.perforated = matte({ map: tile(TX.raisedFloor(true), 0.6), roughness: 0.5, metalness: 0.2 });
  M.ceiling = matte({ map: tile(TX.ceilingTiles(), 0.6), roughness: 0.9 });
  M.ledPanel = std({ color: 0xffffff, emissive: 0xf4f7ff, emissiveIntensity: 1.1 });
  M.louvre = matte({ map: tile(TX.louvre(), 0.5), metalness: 0.4, roughness: 0.5 });
  M.block = matte({ map: tile(TX.concreteBlock(), 1.6), roughness: 0.9 });
  M.container = matte({ map: tile(TX.container(), 2.5), roughness: 0.6, metalness: 0.3 });
  M.door = matte({ color: 0xe3dcc4, roughness: 0.6 });
  M.chillerBody = matte({ color: 0xf0f1f0, roughness: 0.45, metalness: 0.2 });
  M.coil = matte({ color: 0x1f2326, roughness: 0.7, metalness: 0.4 });
  M.fanGrill = matte({ color: 0x222528, roughness: 0.6, metalness: 0.5 });
  M.rackBody = matte({ color: 0x15171a, roughness: 0.55, metalness: 0.35 });
  M.rackFront = matte({ map: TX.rackDoor(), roughness: 0.5, metalness: 0.4 });
  M.coolerFront = matte({ map: TX.coolerFront(), roughness: 0.5, metalness: 0.3 });
  M.coolerBody = matte({ color: 0x1e2124, roughness: 0.5, metalness: 0.3 });
  M.ups = matte({ color: 0x2b2f34, roughness: 0.5, metalness: 0.4 });
  M.panelGrey = matte({ color: 0xc7cbcf, roughness: 0.55, metalness: 0.3 });
  M.cylinder = std({ color: 0xc81e1e, roughness: 0.35, metalness: 0.3 });
  M.pipeBlue = std({ color: 0x3f7ec2, roughness: 0.4, metalness: 0.2 });
  M.pipeRed = std({ color: 0xc0463a, roughness: 0.4, metalness: 0.2 });
  M.pipeFoil = std({ color: 0xc9cdd1, roughness: 0.3, metalness: 0.85 });
  M.tray = matte({ color: 0xb9bec2, roughness: 0.45, metalness: 0.7 });
  M.containment = new THREE.MeshBasicMaterial({ color: 0xd8e6ee, transparent: true, opacity: 0.16, depthWrite: false });
  M.containFrame = matte({ color: 0x6c757c, metalness: 0.7, roughness: 0.35 });
  M.solar = std({ map: TX.solarCells(), roughness: 0.2, metalness: 0.4 });
  M.fence = std({ color: 0x4d6a4f, roughness: 0.6, metalness: 0.4, transparent: true, opacity: 0.85, alphaTest: 0.3 });
  M.bush = std({ color: 0x3f5a2b, roughness: 0.95 });
  M.signBlue = std({ color: 0x1e9be0, roughness: 0.35, emissive: 0x0a5f9c, emissiveIntensity: 0 });
  M.window = std({ color: 0x24313a, roughness: 0.15, metalness: 0.4, emissive: 0xffd9a0, emissiveIntensity: 0 });
  M.lamp = std({ color: 0xeeeeee, emissive: 0xfff2d8, emissiveIntensity: 0 });
  M.desk = matte({ color: 0xd8d2c6, roughness: 0.6 });
  // cutaway: shell, interior and roof take the shared clipping plane
  ['siding', 'profiled', 'granite', 'glass', 'frame', 'white', 'coping', 'wallPaint', 'sandwich', 'louvre', 'signBlue', 'window', 'door', 'roof', 'steel'].forEach((k) => { M[k].clippingPlanes = clip; M[k].clipShadows = true; });
  const meshOf = (geos, mat, opts = {}) => {
    const m = new THREE.Mesh(Array.isArray(geos) ? mergeGeometries(geos) : geos, mat);
    m.castShadow = opts.cast ?? true; m.receiveShadow = true; return m;
  };

  // ================= SHELL =================
  const SH = { siding: [], profiled: [], granite: [], glass: [], frame: [], white: [], coping: [], louvre: [], window: [], door: [], steel: [], graniteStep: [] };
  const T = 0.3; // wall build-up
  const { x0, x1, z0, z1, top, cornice } = ENV;
  const TOP_HI = 5.55;
  // granite plinth all round (photos: polished red-brown granite, 0.6 m)
  SH.granite.push(box(x0 - 0.04, GROUND - 0.2, z0 - 0.04, x1 + 0.04, 0.05, z0 + T), box(x0 - 0.04, GROUND - 0.2, z1 - T, x1 + 0.04, 0.05, z1 + 0.04), box(x0 - 0.04, GROUND - 0.2, z0, x0 + T, 0.05, z1), box(x1 - T, GROUND - 0.2, z0, x1 + 0.04, 0.05, z1));

  // --- facade Б (z0): silver office block at grid lines 1–3, beige elsewhere, glazed stair strip at x ≈ −8.6
  const sB = -15.5, sB2 = -12.0, stripB = [-9.3, -8.0];
  SH.profiled.push(box(x0, 0.05, z0, sB, TOP_HI, z0 + T), box(sB, 0.05, z0, sB2, cornice, z0 + T));
  SH.siding.push(box(sB, cornice, z0, sB2, top, z0 + T), box(sB2, 0.05, z0, stripB[0], top, z0 + T), box(stripB[1], 0.05, z0, x1, top, z0 + T));
  SH.glass.push(box(stripB[0], 2.2, z0 + 0.06, stripB[1], top - 0.15, z0 + 0.16), box(stripB[0], 0.05, z0 + 0.06, -9.05, 2.2, z0 + 0.16), box(-8.2, 0.05, z0 + 0.06, stripB[1], 2.2, z0 + 0.16));
  // ribbon glazing, louvre band, upper windows (photo 3)
  SH.glass.push(box(-21.9, 0.55, z0 - 0.02, -12.6, 2.25, z0 + 0.1), box(-21.9, 3.35, z0 - 0.02, -16.4, 4.95, z0 + 0.1));
  for (let x = -21.9; x <= -12.55; x += 1.55) SH.frame.push(box(x - 0.03, 0.5, z0 - 0.05, x + 0.03, 2.3, z0 + 0.05));
  SH.frame.push(box(-21.95, 0.5, z0 - 0.06, -12.55, 0.58, z0 + 0.06), box(-21.95, 2.22, z0 - 0.06, -12.55, 2.3, z0 + 0.06), box(-21.95, 1.4, z0 - 0.05, -12.55, 1.44, z0 + 0.05));
  for (let x = -21.9; x <= -16.3; x += 1.85) SH.frame.push(box(x - 0.03, 3.3, z0 - 0.05, x + 0.03, 5.0, z0 + 0.05));
  for (let k = 0; k < 4; k++) SH.white.push(box(-22.2, 2.38 + k * 0.17, z0 - 0.42, -12.3, 2.46 + k * 0.17, z0 - 0.3));
  for (let x = -22.0; x <= -12.2; x += 2.4) SH.white.push(box(x - 0.04, 2.3, z0 - 0.42, x + 0.04, 3.0, z0));
  // stair strip louvres + door Д-3
  for (let k = 0; k < 4; k++) SH.white.push(box(stripB[0] - 0.12, 2.4 + k * 0.17, z0 - 0.25, stripB[1] + 0.12, 2.47 + k * 0.17, z0 - 0.12));
  SH.graniteStep.push(box(-9.5, GROUND, z0 - 1.3, -7.8, -0.3, z0), box(-9.5, -0.3, z0 - 0.95, -7.8, 0.0, z0));

  // --- facade А (z1): beige, small high windows, Д-2 loading door with platform and ramp (photo 1)
  SH.siding.push(box(x0, 0.05, z1 - T, 15.9, top, z1), box(17.45, 0.05, z1 - T, x1, top, z1), box(15.9, 2.35, z1 - T, 17.45, top, z1));
  SH.frame.push(box(15.82, 0.0, z1 - 0.02, 15.9, 2.43, z1 + 0.06), box(17.45, 0.0, z1 - 0.02, 17.53, 2.43, z1 + 0.06), box(15.82, 2.35, z1 - 0.02, 17.53, 2.43, z1 + 0.06));
  [-14.6, -9.2, -3.0, 3.6, 9.4].forEach((x, i) => { SH.window.push(box(x - 0.55, 2.15, z1 - 0.02, x + 0.55, 2.62, z1 + 0.06)); SH.white.push(box(x - 0.62, 2.1, z1, x + 0.62, 2.67, z1 + 0.04)); });
  [-11.5, -5.5, 0.5, 6.0, 12.4, 17.5].forEach((x) => SH.louvre.push(box(x - 0.2, 2.75, z1, x + 0.2, 3.0, z1 + 0.05)));
  SH.granite.push(box(13.6, GROUND, z1, 19.4, 0.0, z1 + 2.6));
  { // ramp from the platform down to the yard
    const g = new THREE.BoxGeometry(1.6, 0.25, 5.8); const r = new THREE.Mesh(g); r.rotation.x = Math.atan(-GROUND / 5.8); r.position.set(18.2, GROUND / 2 - 0.12, z1 + 2.6 + 2.9); r.updateMatrix(); g.applyMatrix4(r.matrix); SH.granite.push(g);
  }

  // --- end facade at grid line 1 (x0): entrance (photo 4)
  const eSilver = 0.95, eTall = -6.2, EZ = ENTRANCE_Z, ED0 = EZ - 0.8, ED1 = EZ + 0.8;
  SH.profiled.push(box(x0, 0.05, z0, x0 + T, TOP_HI, eTall), box(x0, 0.05, eTall, x0 + T, cornice, ED0), box(x0, 0.05, ED1, x0 + T, cornice, eSilver), box(x0, 2.42, ED0, x0 + T, cornice, ED1));
  SH.siding.push(box(x0, cornice, eTall, x0 + T, top, eSilver), box(x0, 0.05, eSilver, x0 + T, top, z1));
  SH.glass.push(box(x0 - 0.1, 0.55, -9.25, x0 + 0.02, 2.25, -2.65), box(x0 - 0.1, 3.3, -9.25, x0 + 0.02, 4.95, -6.5));
  for (let z = -9.25; z <= -2.6; z += 1.66) SH.frame.push(box(x0 - 0.13, 0.5, z - 0.03, x0 - 0.05, 2.3, z + 0.03));
  SH.frame.push(box(x0 - 0.14, 0.5, -9.3, x0 - 0.04, 0.58, -2.6), box(x0 - 0.14, 2.22, -9.3, x0 - 0.04, 2.3, -2.6), box(x0 - 0.14, 3.25, -9.3, x0 - 0.04, 3.33, -6.45), box(x0 - 0.14, 4.92, -9.3, x0 - 0.04, 5.0, -6.45));
  SH.frame.push(box(x0 - 0.14, 3.3, -7.9, x0 - 0.04, 5.0, -7.84));
  for (let k = 0; k < 4; k++) SH.white.push(box(x0 - 0.55, 2.38 + k * 0.17, -9.7, x0 - 0.42, 2.46 + k * 0.17, ED0 - 0.5));
  for (let z = -9.6; z <= ED0 - 0.4; z += 2.3) SH.white.push(box(x0 - 0.55, 2.3, z - 0.04, x0, 3.0, z + 0.04));
  // entrance door, glass canopy
  SH.frame.push(box(x0 - 0.12, 0.0, ED0 - 0.08, x0 + T, 2.42, ED0), box(x0 - 0.12, 0.0, ED1, x0 + T, 2.42, ED1 + 0.08), box(x0 - 0.12, 2.34, ED0, x0 + T, 2.42, ED1));
  SH.steel.push(box(x0 - 1.25, 2.62, ED0 - 0.35, x0, 2.66, ED1 + 0.35));
  // vertical glazed strip and the cloud-sign wall
  SH.glass.push(box(x0 - 0.06, 0.35, 1.55, x0 + 0.02, 5.0, 2.6));
  for (let k = 0; k < 4; k++) SH.white.push(box(x0 - 0.3, 2.4 + k * 0.17, 1.4, x0 - 0.18, 2.47 + k * 0.17, 2.75));
  // entrance platform, four granite steps, ramp along the wall with steel railings
  SH.granite.push(box(x0 - 1.6, GROUND, -3.0, x0, 0.0, 6.6));
  for (let s = 0; s < 4; s++) SH.graniteStep.push(box(x0 - 1.6 - (s + 1) * 0.32, GROUND, EZ - 1.5, x0 - 1.6 - s * 0.32, -0.15 * (s + 1), EZ + 1.5));
  {
    const len = 6.0, drop = -GROUND;
    const g = new THREE.BoxGeometry(1.4, 0.3, len); const r = new THREE.Mesh(g); r.rotation.x = -Math.atan(drop / len); r.position.set(x0 - 0.8, GROUND / 2 - 0.15, 6.6 + len / 2); r.updateMatrix(); g.applyMatrix4(r.matrix); SH.granite.push(g);
  }
  const rail = (ax, ay, az, bx, by, bz) => { // posts every ~1.2 m, two rails
    const L = Math.hypot(bx - ax, bz - az), n = Math.max(1, Math.round(L / 1.2));
    for (let i = 0; i <= n; i++) { const t = i / n, x = ax + (bx - ax) * t, z = az + (bz - az) * t, y = ay + (by - ay) * t; SH.steel.push(box(x - 0.025, y, z - 0.025, x + 0.025, y + 1.0, z + 0.025)); }
    for (const h of [0.95, 0.5]) {
      const g = new THREE.CylinderGeometry(0.022, 0.022, Math.hypot(bx - ax, by - ay, bz - az), 6); g.rotateX(Math.PI / 2);
      const o = new THREE.Object3D(); o.position.set((ax + bx) / 2, (ay + by) / 2 + h, (az + bz) / 2); o.lookAt(bx, by + h, bz); o.updateMatrix(); g.applyMatrix4(o.matrix); SH.steel.push(g);
    }
  };
  rail(x0 - 1.55, 0, -2.95, x0 - 1.55, 0, EZ - 1.55); rail(x0 - 1.55, 0, EZ + 1.55, x0 - 1.55, 0, 6.6); rail(x0 - 1.55, 0, 6.6, x0 - 1.55, GROUND, 12.6);
  rail(x0 - 1.6, 0, EZ - 1.55, x0 - 2.9, GROUND, EZ - 1.55); rail(x0 - 1.6, 0, EZ + 1.55, x0 - 2.9, GROUND, EZ + 1.55);

  // --- end facade at grid line 9 (x1): plain beige, roof ladder, chilled-water pipes (photo 2)
  SH.siding.push(box(x1 - T, 0.05, z0, x1, top, z1));
  SH.louvre.push(box(x1, 1.6, 2.2, x1 + 0.05, 2.1, 3.0), box(x1, 3.0, -6.5, x1 + 0.05, 3.3, -6.1));
  for (let y = 0.6; y < top + 0.9; y += 0.3) SH.steel.push(box(x1 + 0.18, y, -4.25, x1 + 0.22, y + 0.03, -3.75));
  SH.steel.push(box(x1 + 0.15, 0.4, -4.3, x1 + 0.25, top + 1.0, -4.22), box(x1 + 0.15, 0.4, -3.78, x1 + 0.25, top + 1.0, -3.7));

  // trims: cornice line at 3.45 m on beige walls, vertical joints every 6 m, coping
  SH.white.push(box(x0, cornice - 0.05, z1, x1, cornice + 0.03, z1 + 0.07), box(-12.0, cornice - 0.05, z0 - 0.07, x1, cornice + 0.03, z0));
  AX.forEach((x) => { SH.white.push(box(x - 0.05, 0.05, z1, x + 0.05, top, z1 + 0.05)); if (x > -12) SH.white.push(box(x - 0.05, 0.05, z0 - 0.05, x + 0.05, top, z0)); });
  [[x0, z0], [x0, z1], [x1, z0], [x1, z1]].forEach(([x, z]) => SH.white.push(box(x - 0.08, 0.05, z - 0.08, x + 0.08, top, z + 0.08)));
  SH.coping.push(box(x0 - 0.06, top, z0 - 0.06, x1 + 0.06, top + 0.06, z0 + T + 0.04), box(x0 - 0.06, top, z1 - T - 0.04, x1 + 0.06, top + 0.06, z1 + 0.06), box(x1 - T - 0.04, top, z0, x1 + 0.06, top + 0.06, z1));
  SH.coping.push(box(x0 - 0.06, top, eSilver, x0 + T + 0.04, top + 0.06, z1), box(x0 - 0.06, TOP_HI, z0 - 0.06, sB, TOP_HI + 0.06, z0 + T), box(x0 - 0.06, TOP_HI, z0, x0 + T, TOP_HI + 0.06, eTall));
  SH.profiled.push(box(x0 + T, top, z0 + T, sB, TOP_HI, z0 + 0.5), box(x0 + T, top, z0 + T, x0 + 0.5, TOP_HI, eTall));
  // downpipes
  [[x0 + 0.5, z1 + 0.12], [-4.4, z1 + 0.12], [13.6, z1 + 0.12], [x1 - 0.5, z1 + 0.12], [x1 - 0.5, z0 - 0.12], [1.6, z0 - 0.12]].forEach(([x, z]) => { const g = new THREE.CylinderGeometry(0.06, 0.06, top - GROUND, 8); g.translate(x, (top + GROUND) / 2, z); SH.white.push(g); });

  for (const [k, list] of Object.entries(SH)) if (list.length) groups.shell.add(meshOf(list, M[k]));

  // signage: "DATA CENTER" letters and the cloud
  const dc = new THREE.Mesh(new THREE.PlaneGeometry(6.2, 0.9), new THREE.MeshStandardMaterial({ map: TX.textTexture('DATA CENTER', { font: '800 120px "Barlow Semi Condensed", "Arial Narrow", sans-serif', color: '#1e9be0', w: 1024, h: 160 }), transparent: true, roughness: 0.4, emissive: 0x1e9be0, emissiveIntensity: 0, clippingPlanes: clip }));
  dc.position.set(x0 - 0.06, 4.35, -3.3); dc.rotation.y = -Math.PI / 2; groups.shell.add(dc);
  const cloudMat = new THREE.MeshStandardMaterial({ map: TX.cloudSign(), transparent: true, roughness: 0.35, emissive: 0xffffff, emissiveIntensity: 0, clippingPlanes: clip });
  cloudMat.emissiveMap = cloudMat.map;
  const cloud = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 2.9), cloudMat); cloud.position.set(x0 - 0.1, 3.55, 5.6); cloud.rotation.y = -Math.PI / 2; groups.shell.add(cloud);
  dc.material.emissiveMap = dc.material.map;
  const signs = [dc.material, cloudMat];

  // roof: profiled gable inside the parapet, ridge along the building at 5.9 %
  {
    const span = (z1 - z0) / 2 - T, eave = 4.62, rise = span * 0.059;
    for (const s of [-1, 1]) {
      const g = new THREE.PlaneGeometry(x1 - x0 - 2 * T, Math.hypot(span, rise)); g.rotateX(-Math.PI / 2);
      const o = new THREE.Object3D(); o.rotation.x = s * Math.atan(rise / span); o.position.set((x0 + x1) / 2, eave + rise / 2, s * span / 2 + (z0 + z1) / 2); o.updateMatrix(); g.applyMatrix4(o.matrix);
      const uv = g.attributes.uv, p = g.attributes.position; for (let i = 0; i < p.count; i++) uv.setXY(i, p.getZ(i), p.getX(i));
      const m = new THREE.Mesh(g, M.roof); m.receiveShadow = true; m.castShadow = true; groups.roof.add(m);
    }
    // rooftop: ventilation hoods and smoke exhaust fans (three on the plan)
    const hoods = [];
    [[-2, -6.8], [4.2, -6.8], [11.5, -6.8], [-16, 4], [6, 6.4]].forEach(([x, z]) => hoods.push(box(x - 0.45, 4.7, z - 0.45, x + 0.45, 5.35, z + 0.45)));
    groups.roof.add(meshOf(hoods, M.steel));
  }

  // ================= INTERIOR =================
  const FL = { terrazzo: [], darkTiles: [], lino: [], raised: [], perforated: [] };
  FL.terrazzo.push(box(x0 + T, -0.05, z0 + T, x1 - T, 0.0, z1 - T));
  const floorKind = { vestibule: 'darkTiles', lobby: 'darkTiles', office: 'lino', control: 'lino', staff: 'lino', duty: 'lino' };
  for (const r of ROOMS) {
    if (r.key === 'hall') continue;
    const k = floorKind[r.key]; if (!k && !r.lvl) continue;
    FL[k || 'lino'].push(box(r.x0 + 0.06, 0.0, r.z0 + 0.06, r.x1 - 0.06, 0.012 + r.lvl, r.z1 - 0.06));
  }
  // hall raised floor; perforated tiles fill the cold aisles
  FL.raised.push(box(HALL.x0, 0, HALL.z0, HALL.x1, HALL.floor, HALL.z1));
  COLD_AISLES.forEach(([a, b]) => FL.perforated.push(box(a, HALL.floor, ROW_Z_RANGE[0], b, HALL.floor + 0.006, ROW_Z_RANGE[1])));
  FL.perforated.push(box(HALL.x0 + 0.3, HALL.floor, ROW_Z_RANGE[0], ROW_X_RANGE[0][0], HALL.floor + 0.006, ROW_Z_RANGE[1]));
  for (const [k, list] of Object.entries(FL)) if (list.length) { const m = meshOf(list, M[k], { cast: false }); groups.interior.add(m); }

  // partitions with door openings
  const wallSegs = []; // for walk collisions: [ax, az, bx, bz]
  const CEIL = 2.95;
  const partGeos = [], lintels = [];
  const cutDoors = (ax, az, bx, bz) => {
    const L = Math.hypot(bx - ax, bz - az), ux = (bx - ax) / L, uz = (bz - az) / L;
    const gaps = [];
    for (const [dx, dz, w] of DOORS) {
      const t = (dx - ax) * ux + (dz - az) * uz, off = Math.abs((dx - ax) * uz - (dz - az) * ux);
      if (off < 0.35 && t > -0.2 && t < L + 0.2) gaps.push([t - w / 2, t + w / 2]);
    }
    gaps.sort((a, b) => a[0] - b[0]);
    const pieces = []; let s = 0;
    for (const [g0, g1] of gaps) { if (g0 > s) pieces.push([s, g0]); s = Math.max(s, g1); }
    if (s < L) pieces.push([s, L]);
    return { pieces, gaps, ux, uz, L };
  };
  const doorLeaves = [], doorKeys = new Set();
  const addWall = (ax, az, bx, bz, h, th, list, y0 = 0, leafMat = M.door) => {
    const { pieces, gaps, ux, uz } = cutDoors(ax, az, bx, bz);
    const ang = Math.atan2(uz, ux);
    const piece = (t0, t1, ya, yb) => {
      const len = t1 - t0; if (len < 0.02) return;
      const g = wbox(len, yb - ya, th, 0, 0, 0); g.rotateY(-ang);
      g.translate(ax + ux * (t0 + t1) / 2, (ya + yb) / 2, az + uz * (t0 + t1) / 2); list.push(g);
    };
    pieces.forEach(([t0, t1]) => { piece(t0, t1, y0, h); wallSegs.push([ax + ux * t0, az + uz * t0, ax + ux * t1, az + uz * t1]); });
    gaps.forEach(([t0, t1]) => {
      piece(t0, t1, 2.2, h);
      const cx = ax + ux * (t0 + t1) / 2, cz = az + uz * (t0 + t1) / 2, key = cx.toFixed(1) + ',' + cz.toFixed(1);
      if (doorKeys.has(key)) return; doorKeys.add(key);
      const w = t1 - t0 - 0.04, pivot = new THREE.Group();
      pivot.position.set(ax + ux * (t0 + 0.02), y0, az + uz * (t0 + 0.02)); pivot.rotation.y = -ang;
      const leaf = new THREE.Mesh(new THREE.BoxGeometry(w, 2.16, 0.045), leafMat); leaf.position.set(w / 2, 1.09, 0); leaf.castShadow = true;
      pivot.add(leaf); groups.interior.add(pivot);
      doorLeaves.push({ pivot, base: -ang, center: new THREE.Vector3(cx, y0 + 1, cz), k: 0 });
    });
  };
  WALLS.forEach(([a, b, c, d]) => addWall(a, b, c, d, CEIL, 0.12, partGeos));
  groups.interior.add(meshOf(partGeos, M.wallPaint));
  // inner face of the outer walls (painted)
  const inner = [];
  addWall(x0 + T, z0 + T, x1 - T, z0 + T, CEIL, 0.04, inner); addWall(x0 + T, z1 - T, x1 - T, z1 - T, CEIL, 0.04, inner);
  addWall(x0 + T, z0 + T, x0 + T, z1 - T, CEIL, 0.04, inner, 0, M.glassClear); addWall(x1 - T, z0 + T, x1 - T, z1 - T, CEIL, 0.04, inner);
  groups.interior.add(meshOf(inner, M.wallPaint, { cast: false }));
  // hermetic hall: sandwich-panel box on its own steel frame (section Б-Б), top at +3.58
  const hallW = [];
  addWall(HALL.x0, HALL.z0, HALL.x1, HALL.z0, HALL.top, 0.1, hallW, HALL.floor, M.panelGrey); addWall(HALL.x1, HALL.z0, HALL.x1, HALL.z1, HALL.top, 0.1, hallW, HALL.floor, M.panelGrey);
  addWall(HALL.x1, HALL.z1, HALL.x0, HALL.z1, HALL.top, 0.1, hallW, HALL.floor, M.panelGrey); addWall(HALL.x0, HALL.z1, HALL.x0, HALL.z0, HALL.top, 0.1, hallW, HALL.floor, M.panelGrey);
  groups.interior.add(meshOf(hallW, M.sandwich));
  // door leaves of the hall (fire doors, opened) and the main entrance turnstile
  const extras = [];
  extras.push(box(-19.2, 0, -0.9, -19.0, 1.0, -0.2), box(-19.2, 0.95, -0.9, -18.4, 1.0, -0.85));
  groups.interior.add(meshOf(extras, M.steel));
  // wardrobes in the corridor (photos 6, 10)
  groups.interior.add(meshOf([box(-12.6, 0, -1.3, -12.0, 2.0, -0.2), box(-12.6, 0, -0.1, -12.0, 2.0, 1.0)], M.door));

  // suspended ceilings with LED panels (visible inside / walk mode)
  const ceilG = [], ledG = [];
  // one downward-facing plane per room: no overlap, no shadow lookups
  const ceilPlane = (a, b, c, d, y) => { const g = new THREE.PlaneGeometry(c - a, d - b); g.rotateX(Math.PI / 2); g.translate((a + c) / 2, y, (b + d) / 2); const uv = g.attributes.uv, p = g.attributes.position; for (let i = 0; i < p.count; i++) uv.setXY(i, p.getX(i), p.getZ(i)); return g; };
  for (const r of ROOMS) {
    if (r.key === 'hall') continue;
    ceilG.push(ceilPlane(r.x0, r.z0, r.x1, r.z1, CEIL));
    for (let x = r.x0 + 1.2; x < r.x1 - 0.6; x += 2.4) for (let z = r.z0 + 1.2; z < r.z1 - 0.6; z += 2.4) ledG.push(box(x - 0.29, CEIL - 0.012, z - 0.29, x + 0.29, CEIL, z + 0.29));
  }
  ceilG.push(ceilPlane(HALL.x0, HALL.z0, HALL.x1, HALL.z1, HALL.ceil));
  for (let x = HALL.x0 + 1.4; x < HALL.x1; x += 2.07) for (let z = HALL.z0 + 1.0; z < HALL.z1; z += 3.0) ledG.push(box(x - 0.08, HALL.ceil - 0.04, z - 0.6, x + 0.08, HALL.ceil, z + 0.6));
  { const cm = meshOf(ceilG, M.ceiling, { cast: false }), lm = meshOf(ledG, new THREE.MeshBasicMaterial({ color: 0xf4f7ff }), { cast: false }); cm.receiveShadow = lm.receiveShadow = false; groups.ceilings.add(cm, lm); }
  groups.ceilings.visible = false;

  // ================= MACHINE HALL =================
  const hallItems = buildHall();
  const racks = hallItems.filter((i) => i.kind !== 'cooler'), coolers = hallItems.filter((i) => i.kind === 'cooler');
  const y0 = HALL.floor;
  const rackGeo = new THREE.BoxGeometry(RACK.d - 0.02, RACK.h, RACK.w - 0.01); rackGeo.translate(0, RACK.h / 2, 0);
  // materials per face: +x/-x are front/back doors depending on the row
  const rackMesh = new THREE.InstancedMesh(rackGeo, [M.rackFront, M.rackFront, M.rackBody, M.rackBody, M.rackBody, M.rackBody], racks.length);
  const coolGeo = rackGeo.clone();
  const coolMesh = new THREE.InstancedMesh(coolGeo, [M.coolerFront, M.coolerFront, M.coolerBody, M.coolerBody, M.coolerBody, M.coolerBody], coolers.length);
  const dummy = new THREE.Object3D();
  const place = (mesh, list) => list.forEach((it, i) => {
    dummy.position.set(it.x, y0, it.z); dummy.rotation.set(0, it.backDir > 0 ? Math.PI : 0, 0); dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
    items.set(it.id, { ...it, mesh, instance: i, pos: new THREE.Vector3(it.x, y0 + RACK.h / 2, it.z) });
  });
  place(rackMesh, racks); place(coolMesh, coolers);
  [rackMesh, coolMesh].forEach((m) => { m.castShadow = true; m.receiveShadow = true; m.userData.list = m === rackMesh ? racks : coolers; pickables.push(m); groups.racks.add(m); });
  // status LEDs on the front of every rack (instanced, recoloured by main.js)
  const ledGeo = new THREE.PlaneGeometry(0.03, 0.03);
  const leds = new THREE.InstancedMesh(ledGeo, new THREE.MeshBasicMaterial({ toneMapped: false }), racks.length * 6);
  let li = 0; const ledColor = new THREE.Color();
  racks.forEach((it) => {
    const front = -it.backDir; // front faces −backDir along x
    for (let k = 0; k < 6; k++) {
      dummy.position.set(it.x + front * (RACK.d / 2 + 0.004), y0 + 0.5 + k * 0.24, it.z - 0.2 + (k % 2) * 0.05);
      dummy.rotation.set(0, front > 0 ? Math.PI / 2 : -Math.PI / 2, 0); dummy.updateMatrix(); leds.setMatrixAt(li, dummy.matrix);
      ledColor.set(k % 3 === 0 ? 0x3ddc84 : 0x4fc3f7); leds.setColorAt(li, ledColor); li++;
    }
  });
  groups.racks.add(leds);
  // row-end panels with row numbers, cable trays above rows
  const trayG = [];
  ROW_X_RANGE.forEach(([a, b], r) => {
    trayG.push(box((a + b) / 2 - 0.15, y0 + 2.45, ROW_Z_RANGE[0], (a + b) / 2 + 0.15, y0 + 2.5, ROW_Z_RANGE[1]));
    labels.push({ id: 'row' + (r + 1), text: () => '' + (r + 1), cls: 'row', pos: new THREE.Vector3((a + b) / 2, y0 + 2.75, ROW_Z_RANGE[1] + 0.3), group: 'racks' });
  });
  trayG.push(box(HALL.x0 + 0.5, y0 + 2.6, HALL.z1 - 1.2, HALL.x1 - 3.5, y0 + 2.64, HALL.z1 - 0.9));
  groups.racks.add(meshOf(trayG, M.tray, { cast: false }));
  // hot-aisle containment as the row layout implies: roof panels and end doors
  const contG = [], contF = [];
  HOT_AISLES.forEach(([a, b]) => {
    contG.push(box(a, y0 + RACK.h, ROW_Z_RANGE[0], b, y0 + RACK.h + 0.02, ROW_Z_RANGE[1]));
    for (const z of ROW_Z_RANGE) { contG.push(box(a, y0 + 0.02, z - 0.005, b, y0 + RACK.h, z + 0.005)); contF.push(box(a, y0, z - 0.03, a + 0.04, y0 + RACK.h, z + 0.03), box(b - 0.04, y0, z - 0.03, b, y0 + RACK.h, z + 0.03), box((a + b) / 2 - 0.015, y0, z - 0.03, (a + b) / 2 + 0.015, y0 + RACK.h, z + 0.03)); }
    for (let z = ROW_Z_RANGE[0]; z <= ROW_Z_RANGE[1] + 0.01; z += 1.2) contF.push(box(a, y0 + RACK.h, z - 0.02, b, y0 + RACK.h + 0.04, z + 0.02));
  });
  const warm = [];
  HOT_AISLES.forEach(([a, b]) => warm.push(box(a + 0.25, y0 + RACK.h - 0.06, ROW_Z_RANGE[0] + 0.1, b - 0.25, y0 + RACK.h - 0.02, ROW_Z_RANGE[1] - 0.1)));
  const containment = new THREE.Group(); containment.name = 'containment';
  containment.add(meshOf(warm, new THREE.MeshBasicMaterial({ color: 0xffa26b }), { cast: false }));
  containment.add(meshOf(contG, M.containment, { cast: false }), meshOf(contF, M.containFrame, { cast: false }));
  groups.racks.add(containment);

  // rack distribution boards ЩРТ-1…4 on the south hall wall, ЩРБПК/ЩРГПК in the corner
  const boards = [];
  [[-5.6, 'ЩРТ-1'], [-4.4, 'ЩРТ-2'], [-3.2, 'ЩРТ-3'], [-2.0, 'ЩРТ-4'], [-6.8, 'ЩРБПК']].forEach(([x, id], i) => {
    const g = box(x - 0.5, y0, HALL.z1 - 0.5, x + 0.5, y0 + 2.0, HALL.z1 - 0.06); boards.push(g);
    items.set(id, { id, kind: 'switchboard', pos: new THREE.Vector3(x, y0 + 1, HALL.z1 - 0.3) });
  });
  const boardMesh = meshOf(boards, M.panelGrey); boardMesh.userData.ids = ['ЩРТ-1', 'ЩРТ-2', 'ЩРТ-3', 'ЩРТ-4', 'ЩРБПК']; boardMesh.userData.kind = 'switchboard'; groups.electrical.add(boardMesh);

  // 24 APC AP9335TH sensors: top and bottom of the cold-aisle faces, rows 1–6
  const sensors = [];
  for (let r = 0; r < 6; r++) for (let k = 0; k < 4; k++) {
    const it = racks.find((q) => q.row === r + 1 && q.pos === [2, 6, 9, 13][k]) || racks.find((q) => q.row === r + 1);
    const front = -it.backDir;
    sensors.push({ id: 'TH-' + (sensors.length + 1), x: it.x + front * (RACK.d / 2 + 0.03), y: y0 + (k % 2 ? 1.75 : 0.45), z: it.z, row: r + 1 });
  }
  const sensMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.05, 0.09, 0.06), std({ color: 0xf4f4f2 }), sensors.length);
  sensors.forEach((s, i) => { dummy.position.set(s.x, s.y, s.z); dummy.rotation.set(0, 0, 0); dummy.updateMatrix(); sensMesh.setMatrixAt(i, dummy.matrix); items.set(s.id, { ...s, kind: 'sensor', mesh: sensMesh, instance: i, pos: new THREE.Vector3(s.x, s.y, s.z) }); });
  sensMesh.userData.list = sensors.map((s) => ({ ...s, kind: 'sensor' })); pickables.push(sensMesh); groups.racks.add(sensMesh);

  // ================= ELECTRICAL ROOM (room 25) =================
  const er = ROOMS.find((r) => r.key === 'electrical');
  const el = groups.electrical;
  const equip = (id, kind, geoList, mat, pos) => { const m = meshOf(geoList, mat); m.userData = { id, kind }; el.add(m); pickables.push(m); items.set(id, { id, kind, object: m, pos }); return m; };
  for (let i = 0; i < 4; i++) {
    const x = er.x0 + 0.6 + i * 1.75;
    equip('UPS' + (i + 1), 'ups', [box(x, 0, er.z0 + 0.2, x + 1.6, 1.9, er.z0 + 1.05)], M.ups, new THREE.Vector3(x + 0.8, 1, er.z0 + 0.6));
    el.add(meshOf([box(x + 0.15, 0.25, er.z0 + 1.051, x + 0.75, 1.75, er.z0 + 1.06), box(x + 0.85, 0.25, er.z0 + 1.051, x + 1.45, 1.75, er.z0 + 1.06)], M.louvre, { cast: false }));
  }
  equip('ЩБП', 'switchboard', [box(er.x0 + 7.7, 0, er.z0 + 0.2, er.x0 + 9.3, 2.1, er.z0 + 0.8)], M.panelGrey, new THREE.Vector3(er.x0 + 8.5, 1, er.z0 + 0.5));
  for (let i = 0; i < 4; i++) { const x = er.x0 + 0.6 + i * 1.05; equip('АК' + (i + 1), 'battery', [box(x, 0, er.z0 + 2.3, x + 0.95, 1.9, er.z0 + 3.1)], M.ups, new THREE.Vector3(x + 0.45, 1, er.z0 + 2.7)); }
  equip('ВРУ', 'switchboard', [box(er.x1 - 0.75, 0, er.z0 + 1.4, er.x1 - 0.15, 2.1, er.z1 - 0.6)], M.panelGrey, new THREE.Vector3(er.x1 - 0.45, 1, (er.z0 + er.z1) / 2));
  equip('АВР', 'switchboard', [box(er.x0 + 6.0, 0, er.z1 - 0.75, er.x0 + 7.6, 2.1, er.z1 - 0.15)], M.panelGrey, new THREE.Vector3(er.x0 + 6.8, 1, er.z1 - 0.4));
  [['KE1', er.x0 + 2.4], ['KE2', er.x0 + 3.1]].forEach(([id, x], i) => equip(id, 'cooler', [box(x, 0, er.z1 - 1.15, x + 0.6, 2.0, er.z1 - 0.1)], M.coolerBody, new THREE.Vector3(x + 0.3, 1, er.z1 - 0.6)));
  items.get('KE1').ac = 15; items.get('KE2').ac = 16;

  // ================= PUMP ROOM (room 23) =================
  const pr = ROOMS.find((r) => r.key === 'pump');
  const pumpParts = [];
  [[pr.x0 + 1.2, 'P1'], [pr.x0 + 2.6, 'P2'], [pr.x0 + 4.0, 'P3']].forEach(([x, id]) => {
    const g1 = new THREE.CylinderGeometry(0.22, 0.22, 0.7, 14); g1.rotateZ(Math.PI / 2); g1.translate(x, 0.45, pr.z0 + 1.6);
    const g2 = box(x - 0.45, 0, pr.z0 + 1.3, x + 0.45, 0.2, pr.z0 + 1.9);
    const m = meshOf([g1, g2], M.pipeBlue); m.userData = { id, kind: 'pump' }; groups.electrical.add(m); pickables.push(m); items.set(id, { id, kind: 'pump', object: m, pos: new THREE.Vector3(x, 0.5, pr.z0 + 1.6) });
  });
  const hdr = (y, mat) => { const g = new THREE.CylinderGeometry(0.11, 0.11, pr.x1 - pr.x0 - 0.6, 12); g.rotateZ(Math.PI / 2); g.translate((pr.x0 + pr.x1) / 2, y, pr.z0 + 0.5); return meshOf([g], mat); };
  groups.electrical.add(hdr(1.4, M.pipeBlue), hdr(1.75, M.pipeRed));
  { const g = new THREE.CylinderGeometry(0.35, 0.35, 1.2, 16); g.translate(pr.x1 - 0.8, 0.6, pr.z1 - 0.8); groups.electrical.add(meshOf([g], M.cylinder)); }

  // ================= CONTROL ROOM (room 6): desk with live screens =================
  const cr = ROOMS.find((r) => r.key === 'control');
  groups.interior.add(meshOf([box(cr.x0 + 0.8, 0.4, cr.z0 + 1.3, cr.x1 - 0.8, 1.15, cr.z0 + 2.0)], M.desk));
  const screenCanvas = document.createElement('canvas'); screenCanvas.width = 1024; screenCanvas.height = 256;
  const screenTex = new THREE.CanvasTexture(screenCanvas); screenTex.colorSpace = THREE.SRGBColorSpace;
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 0.8), new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false }));
  screen.position.set((cr.x0 + cr.x1) / 2, 1.75, cr.z0 + 0.45); groups.interior.add(screen);

  // ================= GAS SUPPRESSION =================
  const fireG = [];
  const cyl = (x, z, h = 1.6) => { const g = new THREE.CylinderGeometry(0.2, 0.2, h, 16); g.translate(x, h / 2 + (z > HALL.z1 ? 0 : HALL.floor), z); return g; };
  for (let i = 0; i < 4; i++) fireG.push(cyl(2.6 + i * 0.6, HALL.z1 - 0.4));
  for (let i = 0; i < 2; i++) fireG.push(cyl(er.x0 + 8.0 + i * 0.6, er.z1 - 0.5));
  const fireMesh = meshOf(fireG, M.cylinder); fireMesh.userData = { id: 'GAS', kind: 'gas' }; pickables.push(fireMesh); groups.fire.add(fireMesh);
  items.set('GAS', { id: 'GAS', kind: 'gas', object: fireMesh, pos: new THREE.Vector3(3.5, 1.2, HALL.z1 - 0.4) });
  const noz = [];
  for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) { const g = new THREE.CylinderGeometry(0.05, 0.03, 0.12, 8); g.translate(HALL.x0 + 2.6 + i * 4.6, HALL.ceil - 0.08, HALL.z0 + 3.0 + j * 5.2); noz.push(g); }
  noz.push(...[0, 1].map((k) => { const g = new THREE.CylinderGeometry(0.05, 0.03, 0.12, 8); g.translate(er.x0 + 3 + k * 4, 2.85, (er.z0 + er.z1) / 2); return g; }));
  groups.fire.add(meshOf(noz, M.steel, { cast: false }));
  const fireZones = new THREE.Group(); fireZones.name = 'fire-zones';
  [[HALL.x0, HALL.z0, HALL.x1, HALL.z1, HALL.floor], [er.x0, er.z0, er.x1, er.z1, 0]].forEach(([a, b, c, d, f]) => {
    const g = new THREE.BoxGeometry(c - a - 0.1, 2.9, d - b - 0.1); g.translate((a + c) / 2, f + 1.45, (b + d) / 2);
    fireZones.add(new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: 0xff5a4f, transparent: true, opacity: 0.08, depthWrite: false })));
    fireZones.add(new THREE.LineSegments(new THREE.EdgesGeometry(g), new THREE.LineBasicMaterial({ color: 0xff6b5e })));
  });
  groups.fire.add(fireZones);
  groups.fire.visible = false;

  // ================= OUTDOOR PLANT =================
  const od = groups.outdoor;
  // chillers HiRef LSE658FS: white casing, black V-coils, eight fans on top (photo 2)
  OUTDOOR.chillers.forEach((c) => {
    const parts = [], coils = [], fans = [];
    const H = 2.45;
    parts.push(box(c.x0, GROUND, c.z0, c.x1, GROUND + 0.9, c.z1), box(c.x0, GROUND + H - 0.25, c.z0, c.x1, GROUND + H, c.z1));
    for (let x = c.x0; x <= c.x1 + 0.01; x += (c.x1 - c.x0) / 4) parts.push(box(x - 0.06, GROUND, c.z0, x + 0.06, GROUND + H, c.z1));
    coils.push(box(c.x0 + 0.05, GROUND + 0.9, c.z0 + 0.03, c.x1 - 0.05, GROUND + H - 0.25, c.z0 + 0.12), box(c.x0 + 0.05, GROUND + 0.9, c.z1 - 0.12, c.x1 - 0.05, GROUND + H - 0.25, c.z1 - 0.03));
    for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) { const g = new THREE.CylinderGeometry(0.55, 0.55, 0.22, 20); g.translate(c.x0 + 0.72 + i * 1.45, GROUND + H + 0.11, c.z0 + 0.7 + j * 1.4); fans.push(g); }
    const body = meshOf(parts, M.chillerBody); body.userData = { id: c.id, kind: 'chiller' }; pickables.push(body); od.add(body, meshOf(coils, M.coil), meshOf(fans, M.fanGrill));
    items.set(c.id, { id: c.id, kind: 'chiller', object: body, pos: new THREE.Vector3((c.x0 + c.x1) / 2, GROUND + 1.3, (c.z0 + c.z1) / 2) });
  });
  // chilled-water pipes from the chillers into the building at grid line 9 (two insulated lines in photo 2)
  const pipeAlong = (pts, r, mat) => { const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)), false, 'catmullrom', 0.05); const m = new THREE.Mesh(new THREE.TubeGeometry(curve, 48, r, 10), mat); m.castShadow = true; return m; };
  od.add(pipeAlong([[25.4, GROUND + 0.5, 7.2], [23.4, GROUND + 0.5, 7.2], [23.0, GROUND + 0.5, 3.6], [23.0, 0.9, 3.0], [22.65, 0.9, 3.0]], 0.13, M.pipeFoil));
  od.add(pipeAlong([[25.4, GROUND + 0.9, 12.0], [23.8, GROUND + 0.9, 12.0], [23.6, GROUND + 0.9, 4.0], [23.4, 1.25, 3.6], [22.65, 1.25, 3.6]], 0.13, M.pipeFoil));
  // diesel generator Cummins C1000D5 in a container with a 4000 l base tank
  {
    const g = OUTDOOR.genset, parts = [box(g.x0, GROUND, g.z0, g.x1, GROUND + 0.45, g.z1), box(g.x0 + 0.05, GROUND + 0.45, g.z0 + 0.05, g.x1 - 0.05, GROUND + 3.05, g.z1 - 0.05)];
    const m = meshOf(parts, M.container); m.userData = { id: 'DGU', kind: 'genset' }; pickables.push(m); od.add(m);
    od.add(meshOf([box(g.x0 - 0.01, GROUND + 1.2, g.z0 + 0.8, g.x0 + 0.02, GROUND + 2.6, g.z0 + 2.6), box(g.x0 - 0.01, GROUND + 1.2, g.z1 - 2.6, g.x0 + 0.02, GROUND + 2.6, g.z1 - 0.8)], M.louvre, { cast: false }));
    const st = new THREE.CylinderGeometry(0.18, 0.18, 1.6, 12); st.translate((g.x0 + g.x1) / 2, GROUND + 3.8, g.z1 - 1.4); od.add(meshOf([st], M.darkSteel));
    items.set('DGU', { id: 'DGU', kind: 'genset', object: m, pos: new THREE.Vector3((g.x0 + g.x1) / 2, GROUND + 1.6, (g.z0 + g.z1) / 2) });
  }
  // transformer substation 2 × 1600 kVA: grey concrete-block walls, steel doors and louvres (sheets АС-3 4–5)
  {
    const s = OUTDOOR.substation, parts = [box(s.x0, GROUND, s.z0, s.x1, GROUND + s.h, s.z1)];
    const m = meshOf(parts, M.block); m.userData = { id: 'TP', kind: 'substation' }; pickables.push(m); od.add(m);
    od.add(meshOf([box(s.x0 - 0.1, GROUND + s.h, s.z0 - 0.1, s.x1 + 0.1, GROUND + s.h + 0.12, s.z1 + 0.1)], M.coping));
    const doors = []; [s.z0 + 1.2, s.z0 + 3.0, s.z0 + 6.2, s.z0 + 8.0].forEach((z) => doors.push(box(s.x0 - 0.04, GROUND, z, s.x0 + 0.01, GROUND + 2.6, z + 1.4)));
    od.add(meshOf(doors, M.panelGrey, { cast: false }));
    od.add(meshOf([s.z0 + 1.2, s.z0 + 3.0, s.z0 + 6.2, s.z0 + 8.0].map((z) => box(s.x0 - 0.05, GROUND + 2.75, z, s.x0, GROUND + 3.4, z + 1.4)), M.louvre, { cast: false }));
    items.set('TP', { id: 'TP', kind: 'substation', object: m, pos: new THREE.Vector3((s.x0 + s.x1) / 2, GROUND + 2.4, (s.z0 + s.z1) / 2) });
  }
  // solar array: 20 × JA Solar 305 W on two tilted racks facing true south
  {
    const sol = new THREE.Group(); const panels = [], legs = [];
    for (let rack = 0; rack < 2; rack++) for (let i = 0; i < 5; i++) for (let j = 0; j < 2; j++) {
      const g = new THREE.BoxGeometry(1.0, 0.04, 1.66); g.rotateX(-0.62); g.translate(i * 1.05 - 2.1, 1.25 + j * 0.95, j * -1.3);
      g.translate(rack * 6.2, 0, 0); panels.push(g);
    }
    for (let rack = 0; rack < 2; rack++) for (let i = 0; i < 3; i++) legs.push(box(rack * 6.2 + i * 2.1 - 2.2, 0, -1.6, rack * 6.2 + i * 2.1 - 2.14, 2.2, -1.54), box(rack * 6.2 + i * 2.1 - 2.2, 0, 0.5, rack * 6.2 + i * 2.1 - 2.14, 0.9, 0.56));
    const pm = meshOf(panels, M.solar); pm.userData = { id: 'PV', kind: 'solar' }; pickables.push(pm);
    sol.add(pm, meshOf(legs, M.steel));
    // face true south: local south is (0.68, −0.73)
    sol.rotation.y = Math.atan2(0.68, -0.73) + Math.PI; sol.position.set(OUTDOOR.solar.x, GROUND, OUTDOOR.solar.z);
    od.add(sol);
    items.set('PV', { id: 'PV', kind: 'solar', object: pm, pos: new THREE.Vector3(OUTDOOR.solar.x, GROUND + 1.5, OUTDOOR.solar.z) });
  }
  // VRF outdoor unit LG ARUN120LN3 at facade А between grid lines 3–4
  od.add(meshOf([box(OUTDOOR.vrf.x - 0.46, GROUND, OUTDOOR.vrf.z - 0.38, OUTDOOR.vrf.x + 0.46, GROUND + 1.68, OUTDOOR.vrf.z + 0.38)], M.chillerBody));
  // perimeter fence (welded mesh panels), barrier gate at the forecourt
  {
    const F = OUTDOOR.fence, posts = [], c = document.createElement('canvas'); c.width = 64; c.height = 64;
    const g = c.getContext('2d'); g.clearRect(0, 0, 64, 64); g.strokeStyle = '#3e5a40'; g.lineWidth = 3; for (let i = 0; i <= 64; i += 16) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 64); g.stroke(); } g.lineWidth = 2; for (let i = 0; i <= 64; i += 32) { g.beginPath(); g.moveTo(0, i); g.lineTo(64, i); g.stroke(); }
    const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace;
    const fm = M.fence.clone(); fm.map = t; fm.side = THREE.DoubleSide;
    const panels = [];
    const run = (ax, az, bx, bz, gap) => {
      const L = Math.hypot(bx - ax, bz - az), n = Math.ceil(L / 2.5);
      for (let i = 0; i < n; i++) {
        const t0 = i / n, t1 = (i + 1) / n, mx = ax + (bx - ax) * (t0 + t1) / 2, mz = az + (bz - az) * (t0 + t1) / 2;
        if (gap && gap(mx, mz)) continue;
        const pg = new THREE.PlaneGeometry(L / n, 2.0); pg.rotateY(-Math.atan2(bz - az, bx - ax)); pg.translate(mx, GROUND + 1.0, mz);
        const uv = pg.attributes.uv; for (let k = 0; k < uv.count; k++) uv.setXY(k, uv.getX(k) * L / n / 0.4, uv.getY(k) * 2.0 / 0.4);
        panels.push(pg);
        posts.push(box(ax + (bx - ax) * t0 - 0.03, GROUND, az + (bz - az) * t0 - 0.03, ax + (bx - ax) * t0 + 0.03, GROUND + 2.05, az + (bz - az) * t0 + 0.03));
      }
    };
    const gate = (x, z) => x < F.x0 + 0.5 && Math.abs(z) < 4.2;
    run(F.x0, F.z0, F.x1, F.z0); run(F.x1, F.z0, F.x1, F.z1); run(F.x1, F.z1, F.x0, F.z1); run(F.x0, F.z1, F.x0, F.z0, gate);
    od.add(new THREE.Mesh(mergeGeometries(panels), fm), meshOf(posts, M.containFrame));
    const arm = box(F.x0 - 0.05, GROUND + 0.95, -3.8, F.x0 + 0.05, GROUND + 1.05, 2.6);
    od.add(meshOf([box(F.x0 - 0.2, GROUND, 2.6, F.x0 + 0.2, GROUND + 1.1, 3.0)], M.panelGrey), meshOf([arm], M.white));
  }
  // street lights: tilted LED heads on 6 m poles, as photographed along facade А
  const lampHeads = [], poles = [], lampPos = [];
  const lamp = (x, z, dir) => { poles.push(box(x - 0.06, GROUND, z - 0.06, x + 0.06, GROUND + 5.6, z + 0.06)); lampHeads.push(box(x - 0.25, GROUND + 5.5, z - 0.18 + dir * 0.6, x + 0.25, GROUND + 5.62, z + 0.18 + dir * 0.6)); lampPos.push(new THREE.Vector3(x, GROUND + 5.4, z + dir * 0.6)); };
  [-15, -3, 9, 21].forEach((x) => lamp(x, ENV.z1 + 2.6, 1));
  [-14, 0, 14].forEach((x) => lamp(x, ENV.z0 - 3.4, -1));
  [-12, 4, 18].forEach((z) => lamp(OUTDOOR.fence.x0 + 3, z, 0));
  od.add(meshOf(poles, M.frame), meshOf(lampHeads, M.lamp, { cast: false }));
  // shrubs (thuja balls) by the entrance and along facade А
  const bushes = [];
  [[-27, -6], [-27, 4], [-12.5, 10.6], [3, 10.8], [-20, -11.2], [-1.5, -11.4]].forEach(([x, z]) => { const g = new THREE.IcosahedronGeometry(0.9, 1); g.scale(1, 0.85, 1); g.translate(x, GROUND + 0.7, z); bushes.push(g); });
  od.add(meshOf(bushes, M.bush));
  // benches
  od.add(meshOf([box(-11, GROUND + 0.4, ENV.z0 - 1.9, -9.6, GROUND + 0.46, ENV.z0 - 1.5), box(-11, GROUND, ENV.z0 - 1.9, -10.9, GROUND + 0.4, ENV.z0 - 1.5), box(-9.7, GROUND, ENV.z0 - 1.9, -9.6, GROUND + 0.4, ENV.z0 - 1.5)], M.door));

  // ================= PERSONNEL =================
  const people = [];
  const personMat = (c) => std({ color: c, roughness: 0.8 });
  const skin = std({ color: 0xc89a7c, roughness: 0.7 }), dark = std({ color: 0x2d3238, roughness: 0.8 }), hat = std({ color: 0xf5f5f0, roughness: 0.4 });
  function person(id, role, color, { helmet = false, seated = false } = {}) {
    const g = new THREE.Group(); g.name = id;
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 0.5, 4, 10), personMat(color)); body.position.y = seated ? 0.95 : 1.18;
    // arms hang from shoulder pivots so they can swing while walking; a small hand at the end
    const sy = body.position.y + 0.24, arms = [];
    for (const side of [-1, 1]) {
      const pivot = new THREE.Group(); pivot.position.set(side * 0.235, sy, 0);
      const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.055, 0.42, 3, 8), personMat(color)); arm.position.y = -0.26;
      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.052, 10, 8), skin); hand.position.y = -0.52;
      pivot.add(arm, hand); pivot.rotation.z = side * 0.07;
      if (seated) pivot.rotation.x = -1.05; // forearms toward the desk
      g.add(pivot); arms.push(pivot);
    }
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.115, 14, 10), skin); head.position.y = seated ? 1.5 : 1.73;
    const legL = new THREE.Mesh(new THREE.CapsuleGeometry(0.075, seated ? 0.3 : 0.62, 3, 8), dark), legR = legL.clone();
    if (seated) { legL.rotation.x = legR.rotation.x = Math.PI / 2; legL.position.set(-0.09, 0.55, 0.2); legR.position.set(0.09, 0.55, 0.2); }
    else { legL.position.set(-0.09, 0.42, 0); legR.position.set(0.09, 0.42, 0); }
    g.add(body, head, legL, legR);
    if (helmet) { const h = new THREE.Mesh(new THREE.SphereGeometry(0.135, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), hat); h.position.y = head.position.y + 0.02; g.add(h); }
    g.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.userData = { id, kind: 'person' }; pickables.push(o); } });
    groups.people.add(g);
    const p = { id, role, group: g, legs: [legL, legR], arms, seated };
    people.push(p); items.set(id, { id, kind: 'person', role, object: body, pos: g.position, person: p });
    return p;
  }
  groups.people = new THREE.Group(); groups.people.name = 'people'; root.add(groups.people);
  const duty = person('STAFF-1', 'duty', 0x2f6f9f, { seated: true });
  duty.group.position.set((cr.x0 + cr.x1) / 2 - 0.7, 0.4, cr.z0 + 2.55); duty.group.rotation.y = Math.PI;
  const duty2 = person('STAFF-2', 'duty', 0x2f6f9f, { seated: true });
  duty2.group.position.set((cr.x0 + cr.x1) / 2 + 0.8, 0.4, cr.z0 + 2.55); duty2.group.rotation.y = Math.PI;
  const hallEng = person('STAFF-3', 'hall', 0x1e9be0, {});
  const aisle = (ROW_X_RANGE[1][1] + ROW_X_RANGE[2][0]) / 2;
  hallEng.path = [[aisle, HALL.floor, ROW_Z_RANGE[1] - 0.4], [aisle, HALL.floor, ROW_Z_RANGE[0] + 0.6]];
  const guard = person('STAFF-4', 'security', 0x3b3f46, {});
  guard.group.position.set(-17.5, 0, 1.95); guard.group.rotation.y = -Math.PI / 2;
  const tech = person('STAFF-5', 'tech', 0xf08c2a, { helmet: true });
  tech.path = [[24.2, GROUND, 4.2], [24.2, GROUND, 15.2], [32.6, GROUND, 16.4], [32.6, GROUND, 4.4]];
  function updatePeople(t) {
    for (const p of people) {
      if (!p.path) continue;
      const L = p.path.length, seg = [];
      let total = 0; for (let i = 0; i < L; i++) { const a = p.path[i], b = p.path[(i + 1) % L]; const d = Math.hypot(b[0] - a[0], b[2] - a[2]); seg.push(d); total += d; }
      let s = (t * 0.75) % total, i = 0; // closed loop; a two-point path walks there and back
      let a = p.path[0], b = p.path[1];
      for (i = 0; i < L; i++) { if (s <= seg[i]) { a = p.path[i]; b = p.path[(i + 1) % L]; break; } s -= seg[i]; }
      const k = seg[i] ? s / seg[i] : 0;
      p.group.position.set(a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k);
      p.group.rotation.y = Math.atan2(b[0] - a[0], b[2] - a[2]);
      const sw = Math.sin(t * 6) * 0.35; p.legs[0].rotation.x = sw; p.legs[1].rotation.x = -sw; p.arms[0].rotation.x = -sw * 0.8; p.arms[1].rotation.x = sw * 0.8;
    }
  }

  // doors swing open while someone (the camera on a walk) comes within 2.6 m
  function updateDoors(p, dt, active) {
    for (const d of doorLeaves) {
      const want = active && d.center.distanceToSquared(p) < 6.8 ? 1 : 0;
      if (want === d.k) continue;
      d.k += Math.sign(want - d.k) * Math.min(Math.abs(want - d.k), dt * 1.8);
      d.pivot.rotation.y = d.base - d.k * 1.75;
    }
  }

  // building itself is pickable via the shell
  groups.shell.children.forEach((m) => { if (m.isMesh) { m.userData = { id: 'BLDG', kind: 'building' }; pickables.push(m); } });
  items.set('BLDG', { id: 'BLDG', kind: 'building', pos: new THREE.Vector3(0, 2.5, 0) });

  // room labels and outdoor labels
  ROOMS.forEach((r) => labels.push({ id: 'room' + r.n, room: r, pos: new THREE.Vector3((r.x0 + r.x1) / 2, (r.key === 'hall' ? 3.0 : 1.4) + r.lvl, (r.z0 + r.z1) / 2), group: 'interior', cls: r.key === 'hall' ? 'room big' : 'room' }));
  ['CH-1', 'CH-2', 'DGU', 'TP', 'PV'].forEach((id) => labels.push({ id: 'lbl-' + id, item: id, pos: items.get(id).pos.clone().add(new THREE.Vector3(0, 2.2, 0)), group: 'outdoor', cls: 'equip' }));

  // the sun never reaches inside: interior surfaces skip shadow lookups (large fill-rate saving)
  ['interior', 'ceilings', 'racks', 'electrical', 'fire', 'people'].forEach((k) => groups[k].traverse((o) => { if (o.isMesh) o.receiveShadow = false; }));
  return { root, groups, pickables, items, labels, wallSegs, M, signs, people, updatePeople, updateDoors, windowsMat: M.window, lampMat: M.lamp, lampPos, ledMesh: leds, racks, coolers, sensors, screen: { canvas: screenCanvas, tex: screenTex }, containment, rackMesh, coolMesh };
}
