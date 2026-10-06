import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import * as TX from './tex.js';
import { GROUND, ENV, OUTDOOR } from './model.js';

function decode(b64) {
  const bin = atob(b64), buf = new ArrayBuffer(bin.length), u8 = new Uint8Array(buf);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return new Int16Array(buf);
}
function rnd(seed) { let s = seed >>> 0; return () => ((s = Math.imul(s ^ (s >>> 15), 1 | s) + 0x6d2b79f5 >>> 0) / 4294967296); }
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

// flat yard of the data centre: |x| < SITE.x, |z| < SITE.z sits exactly on GROUND
export const SITE = { x0: -62, x1: 60, z0: -42, z1: 40 };

export function createEnvironment(site, { low = false } = {}) {
  const group = new THREE.Group(); group.name = 'environment';
  const near = site.terrain.near, far = site.terrain.far;
  const nearH = decode(near.data), farH = decode(far.data);
  const N = near.n, S = near.size;

  // ---------- height function ----------
  function rawNear(x, z) {
    const u = (x + S / 2) / S * (N - 1), v = (z + S / 2) / S * (N - 1);
    const i = Math.max(0, Math.min(N - 2, Math.floor(u))), j = Math.max(0, Math.min(N - 2, Math.floor(v)));
    const fu = Math.min(1, Math.max(0, u - i)), fv = Math.min(1, Math.max(0, v - j));
    const h = (a, b) => nearH[b * N + a] / near.scale;
    return (h(i, j) * (1 - fu) + h(i + 1, j) * fu) * (1 - fv) + (h(i, j + 1) * (1 - fu) + h(i + 1, j + 1) * fu) * fv;
  }
  function siteDist(x, z) {
    const dx = Math.max(SITE.x0 - x, 0, x - SITE.x1), dz = Math.max(SITE.z0 - z, 0, z - SITE.z1);
    return Math.hypot(dx, dz);
  }
  function heightAt(x, z) {
    const d = siteDist(x, z);
    if (d <= 0) return GROUND - 0.35;
    const w = smooth(0, 90, d);
    return GROUND - 0.35 * (1 - w) + (rawNear(x, z) - rawNear(0, 0)) * w;
  }

  // ---------- ground texture for the near terrain: landuse, woods, roads ----------
  const TEXN = low ? 1024 : 2048;
  const gc = document.createElement('canvas'); gc.width = gc.height = TEXN;
  const g = gc.getContext('2d');
  const toPx = (x) => (x + S / 2) / S * TEXN;
  g.fillStyle = '#9c9461'; g.fillRect(0, 0, TEXN, TEXN);
  const r0 = rnd(77);
  for (let i = 0; i < 3500; i++) { g.fillStyle = ['rgba(120,110,60,0.18)', 'rgba(160,150,95,0.18)', 'rgba(110,115,70,0.15)'][(r0() * 3) | 0]; g.beginPath(); g.arc(r0() * TEXN, r0() * TEXN, 3 + r0() * 14, 0, 7); g.fill(); }
  const AREA_COL = { farmland: '#b9a873', grassland: '#a49a62', grass: '#8d8f55', meadow: '#a49a62', park: '#7f8a4c', wood: '#6b6e35', forest: '#5e6531', residential: '#aaa48e', industrial: '#a29d93', construction: '#b0a487', cemetery: '#8a8a64', heath: '#a09765', pitch: '#7a8f4f', scrub: '#837f4b', orchard: '#7f8749' };
  const poly = (c) => { g.beginPath(); for (let i = 0; i < c.length; i += 2) (i ? g.lineTo : g.moveTo).call(g, toPx(c[i]), toPx(c[i + 1])); };
  const order = ['farmland', 'grassland', 'meadow', 'heath', 'residential', 'industrial', 'construction', 'cemetery', 'grass', 'park', 'scrub', 'orchard', 'wood', 'forest', 'pitch'];
  for (const k of order) for (const [kind, closed, c] of site.areas) if (kind === k && closed) { poly(c); g.closePath(); g.fillStyle = AREA_COL[k]; g.fill(); }
  for (const [kind, closed, c] of site.areas) if (kind === 'stream' || kind === 'canal' || kind === 'ditch' || kind === 'river') { poly(c); g.strokeStyle = '#5b7480'; g.lineWidth = kind === 'river' ? 5 : 2; g.stroke(); }
  for (const [kind, closed, c] of site.areas) if (kind === 'tree_row') { poly(c); g.strokeStyle = 'rgba(80,85,40,0.75)'; g.lineWidth = 5; g.stroke(); }
  // roads: kerb, then asphalt
  const pxm = TEXN / S;
  const roadsSorted = [...site.roads].sort((a, b) => a[0] - b[0]);
  for (const [w, kind, c] of roadsSorted) { poly(c); g.lineCap = g.lineJoin = 'round'; g.strokeStyle = kind === 'track' || kind === 'path' || kind === 'footway' ? '#a59b80' : '#7d7a73'; g.lineWidth = Math.max(1.5, (w + 1.2) * pxm); g.stroke(); }
  for (const [w, kind, c] of roadsSorted) if (!['track', 'path', 'footway', 'steps', 'cycleway'].includes(kind)) { poly(c); g.strokeStyle = '#55565a'; g.lineWidth = Math.max(1, w * pxm); g.stroke(); }
  // building footprints darken the ground a little (contact shadow)
  g.fillStyle = 'rgba(40,40,30,0.35)';
  for (const [h, t, c] of site.buildings) { poly(c); g.closePath(); g.fill(); }
  const groundTex = new THREE.CanvasTexture(gc); groundTex.colorSpace = THREE.SRGBColorSpace; groundTex.anisotropy = 8;
  const detail = TX.grass(); detail.repeat.set(S / 6, S / 6);

  // ---------- near terrain mesh ----------
  const NG = low ? 120 : 200;
  const ng = new THREE.PlaneGeometry(S, S, NG, NG); ng.rotateX(-Math.PI / 2);
  const p = ng.attributes.position;
  for (let i = 0; i < p.count; i++) p.setY(i, heightAt(p.getX(i), p.getZ(i)));
  ng.computeVertexNormals();
  const nearMat = new THREE.MeshLambertMaterial({ map: groundTex });
  nearMat.onBeforeCompile = (sh) => { // modulate the 1.7 m/px map with a tiled grass detail
    sh.uniforms.detailMap = { value: detail };
    sh.fragmentShader = sh.fragmentShader.replace('#include <map_pars_fragment>', '#include <map_pars_fragment>\nuniform sampler2D detailMap;')
      .replace('#include <map_fragment>', '#include <map_fragment>\nvec3 dt = texture2D(detailMap, vMapUv * ' + (S / 5).toFixed(1) + ').rgb;\nfloat fadeD = 1.0 - smoothstep(40.0, 260.0, length(vViewPosition));\ndiffuseColor.rgb *= mix(vec3(1.0), dt * 1.9, 0.5 * fadeD);');
  };
  const nearMesh = new THREE.Mesh(ng, nearMat); nearMesh.receiveShadow = false; nearMesh.name = 'terrain-near';
  group.add(nearMesh);

  // ---------- far terrain: Trans-Ili Alatau ----------
  const FN = far.n, FS = far.size;
  const fg = new THREE.PlaneGeometry(FS, FS, FN - 1, FN - 1); fg.rotateX(-Math.PI / 2);
  const fp = fg.attributes.position, colors = new Float32Array(fp.count * 3);
  const c0 = rawNear(0, 0);
  const col = new THREE.Color(), tmp = new THREE.Color();
  for (let j = 0; j < FN; j++) for (let i = 0; i < FN; i++) {
    const k = j * FN + i;
    const x = fp.getX(k), z = fp.getZ(k);
    let h = farH[k] / far.scale;
    const inside = Math.max(Math.abs(x), Math.abs(z)) < S / 2 - 150;
    const y = inside ? h - c0 + GROUND - 40 : h - c0 + GROUND - 3;
    fp.setY(k, y);
    const abs = h + 777.3;
    if (abs < 950) col.set('#a69b69'); else if (abs < 1500) col.set('#8d8a58').lerp(tmp.set('#6f7646'), (abs - 950) / 550);
    else if (abs < 2600) col.set('#4d5a36').lerp(tmp.set('#596446'), (abs - 1500) / 1100);
    else if (abs < 3300) col.set('#7b766d').lerp(tmp.set('#99938a'), (abs - 2600) / 700);
    else col.set('#e9edf2');
    colors.set([col.r, col.g, col.b], k * 3);
  }
  fg.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  fg.computeVertexNormals();
  // steep faces read as bare rock, snow clings to gentle slopes only
  const fn = fg.attributes.normal;
  for (let k = 0; k < fp.count; k++) {
    const steep = 1 - fn.getY(k), abs = fp.getY(k) + c0 - GROUND + 3 + 777.3;
    if (steep > 0.35 && abs > 1800) { col.fromArray(colors, k * 3).lerp(tmp.set('#77706a'), Math.min(1, (steep - 0.35) * 2.2)); colors.set([col.r, col.g, col.b], k * 3); }
  }
  const farMesh = new THREE.Mesh(fg, new THREE.MeshLambertMaterial({ vertexColors: true }));
  farMesh.name = 'terrain-far'; farMesh.receiveShadow = false;
  group.add(farMesh);

  // ---------- neighbouring buildings (OSM footprints, extruded) ----------
  const bgeos = [], br = rnd(5);
  const wallTones = ['#d8d2c4', '#cfc8b8', '#e2ddd2', '#bfb6a5', '#c9c3bb', '#d6cdbd', '#b9b2a8', '#e4dfd6', '#c4a98a'];
  for (const [h, kind, c] of site.buildings) {
    if (c.length < 6) continue;
    let cx = 0, cz = 0; for (let i = 0; i < c.length; i += 2) { cx += c[i]; cz += c[i + 1]; } cx /= c.length / 2; cz /= c.length / 2;
    if (Math.hypot(cx, cz) > S / 2 - 20) continue;
    const shape = new THREE.Shape();
    for (let i = 0; i < c.length; i += 2) (i ? shape.lineTo : shape.moveTo).call(shape, c[i], -c[i + 1]);
    const geo = new THREE.ExtrudeGeometry(shape, { depth: h + 1.0, bevelEnabled: false });
    geo.rotateX(-Math.PI / 2);
    const base = heightAt(cx, cz) - 1.0;
    geo.translate(0, base, 0);
    const wc = new THREE.Color(wallTones[(br() * wallTones.length) | 0]), rc = new THREE.Color(h < 5 ? ['#8a5a48', '#6f6a62', '#7d4a3c'][(br() * 3) | 0] : '#8e8a82').lerp(new THREE.Color('#6e6a62'), br() * 0.5);
    const pos = geo.attributes.position, nrm = geo.attributes.normal, cols = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
      const top = nrm.getY(i) > 0.5; const cc = top ? rc : wc;
      const shade = top ? 1 : 0.8 + 0.2 * Math.min(1, (pos.getY(i) - base) / (h + 1));
      cols[i * 3] = cc.r * shade; cols[i * 3 + 1] = cc.g * shade; cols[i * 3 + 2] = cc.b * shade;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
    geo.deleteAttribute('uv');
    bgeos.push(geo);
  }
  const bmesh = new THREE.Mesh(mergeGeometries(bgeos), new THREE.MeshLambertMaterial({ vertexColors: true }));
  bmesh.castShadow = false; bmesh.receiveShadow = true; bmesh.name = 'osm-buildings';
  group.add(bmesh);

  // ---------- trees: woods, tree rows, gardens of Alatau, the yard ----------
  const footprints = site.buildings.map(([, , c]) => { let a = 1e9, b = -1e9, d = 1e9, e = -1e9; for (let i = 0; i < c.length; i += 2) { a = Math.min(a, c[i]); b = Math.max(b, c[i]); d = Math.min(d, c[i + 1]); e = Math.max(e, c[i + 1]); } return [a - 1.5, b + 1.5, d - 1.5, e + 1.5]; });
  const CELL = 50, grid = new Map();
  footprints.forEach((f, idx) => { for (let gx = Math.floor(f[0] / CELL); gx <= Math.floor(f[1] / CELL); gx++) for (let gz = Math.floor(f[2] / CELL); gz <= Math.floor(f[3] / CELL); gz++) { const k = gx + ',' + gz; if (!grid.has(k)) grid.set(k, []); grid.get(k).push(idx); } });
  const blocked = (x, z) => {
    if (x > SITE.x0 - 2 && x < SITE.x1 + 2 && z > SITE.z0 - 2 && z < SITE.z1 + 2) return true;
    const l = grid.get(Math.floor(x / CELL) + ',' + Math.floor(z / CELL)); if (!l) return false;
    return l.some((i) => { const f = footprints[i]; return x > f[0] && x < f[1] && z > f[2] && z < f[3]; });
  };
  const roadSegs = [];
  for (const [w, kind, c] of site.roads) for (let i = 0; i + 3 < c.length; i += 2) roadSegs.push([c[i], c[i + 1], c[i + 2], c[i + 3], w / 2 + 1.2]);
  const RCELL = 40, rgrid = new Map();
  roadSegs.forEach((s, idx) => { const x0 = Math.min(s[0], s[2]) - s[4], x1 = Math.max(s[0], s[2]) + s[4], z0 = Math.min(s[1], s[3]) - s[4], z1 = Math.max(s[1], s[3]) + s[4]; for (let gx = Math.floor(x0 / RCELL); gx <= Math.floor(x1 / RCELL); gx++) for (let gz = Math.floor(z0 / RCELL); gz <= Math.floor(z1 / RCELL); gz++) { const k = gx + ',' + gz; if (!rgrid.has(k)) rgrid.set(k, []); rgrid.get(k).push(idx); } });
  const onRoad = (x, z) => { const l = rgrid.get(Math.floor(x / RCELL) + ',' + Math.floor(z / RCELL)); if (!l) return false; return l.some((i) => { const [ax, az, bx, bz, r] = roadSegs[i]; const dx = bx - ax, dz = bz - az, L = dx * dx + dz * dz || 1; const t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / L)); return Math.hypot(ax + dx * t - x, az + dz * t - z) < r; }); };
  const inPoly = (x, z, c) => { let ins = false; for (let i = 0, j = c.length - 2; i < c.length; j = i, i += 2) { const xi = c[i], zi = c[i + 1], xj = c[j], zj = c[j + 1]; if ((zi > z) !== (zj > z) && x < (xj - xi) * (z - zi) / (zj - zi) + xi) ins = !ins; } return ins; };

  const trees = { broad: [], column: [], birch: [] };
  const tr = rnd(99), LIM = S / 2 - 30;
  const MAX = low ? 3500 : 9000;
  const total = () => trees.broad.length + trees.column.length + trees.birch.length;
  const add = (type, x, z, s) => { if (Math.abs(x) > LIM || Math.abs(z) > LIM || blocked(x, z) || onRoad(x, z)) return; trees[type].push([x, z, s, tr()]); };
  for (const [kind, closed, c] of site.areas) {
    if (kind === 'tree_row') {
      for (let i = 0; i + 3 < c.length; i += 2) { const L = Math.hypot(c[i + 2] - c[i], c[i + 3] - c[i + 1]); const n = Math.max(1, Math.floor(L / 5.5)); for (let k = 0; k < n; k++) { const t = (k + tr() * 0.4) / n; add(tr() < 0.55 ? 'column' : 'broad', c[i] + (c[i + 2] - c[i]) * t + (tr() - 0.5) * 1.5, c[i + 1] + (c[i + 3] - c[i + 1]) * t + (tr() - 0.5) * 1.5, 0.9 + tr() * 0.5); } }
    }
  }
  const scatter = (kinds, density, mix) => {
    for (const [kind, closed, c] of site.areas) {
      if (!closed || !kinds.includes(kind)) continue;
      let a = 1e9, b = -1e9, d = 1e9, e = -1e9; for (let i = 0; i < c.length; i += 2) { a = Math.min(a, c[i]); b = Math.max(b, c[i]); d = Math.min(d, c[i + 1]); e = Math.max(e, c[i + 1]); }
      const n = Math.min(4000, ((b - a) * (e - d)) / density);
      for (let k = 0; k < n && total() < MAX; k++) { const x = a + tr() * (b - a), z = d + tr() * (e - d); if (inPoly(x, z, c)) add(mix(), x, z, 0.8 + tr() * 0.6); }
    }
  };
  scatter(['wood', 'forest'], 55, () => (tr() < 0.3 ? 'column' : tr() < 0.25 ? 'birch' : 'broad'));
  scatter(['park', 'cemetery'], 120, () => (tr() < 0.4 ? 'column' : 'broad'));
  scatter(['residential'], 260, () => (tr() < 0.35 ? 'column' : tr() < 0.2 ? 'birch' : 'broad'));
  // gardens: houses in Alatau sit among fruit trees and poplars
  for (const [h, kind, c] of site.buildings) {
    if (total() >= MAX) break;
    if (h > 5) continue;
    const x = c[0] + (tr() - 0.5) * 18, z = c[1] + (tr() - 0.5) * 18; add(tr() < 0.3 ? 'column' : 'broad', x, z, 0.7 + tr() * 0.5);
  }
  // random field trees and windbreak clumps
  for (let k = 0; k < (low ? 500 : 1500); k++) { const x = (tr() - 0.5) * 2 * LIM, z = (tr() - 0.5) * 2 * LIM; if (Math.hypot(x, z) > 140) add(tr() < 0.5 ? 'broad' : 'column', x, z, 0.8 + tr() * 0.5); }
  // the yard, as photographed: thujas and birches along facade Б, willows and elms around the fence
  const yardTrees = { broad: [], column: [], birch: [] };
  const yard = (type, x, z, s) => yardTrees[type].push([x, z, s, tr()]);
  [-19, -15.5, -6.5, -3].forEach((x, i) => yard('column', x, -12.6 - (i % 2) * 0.6, 0.5 + (i % 2) * 0.1));
  [-26, 26].forEach((x, i) => yard('birch', x, i ? -16 : -14, 0.75));
  for (let x = -44; x <= 42; x += 11) { yard('broad', x + tr() * 3, OUTDOOR.fence.z0 + 2.5, 0.55 + tr() * 0.2); if (tr() < 0.6) yard(tr() < 0.4 ? 'birch' : 'broad', x + tr() * 3, OUTDOOR.fence.z1 - 2.2, 0.55 + tr() * 0.2); }
  for (let z = -22; z <= 18; z += 13) { yard('broad', OUTDOOR.fence.x1 - 2.2, z + tr() * 2, 0.6); if (Math.abs(z) > 10) yard('column', OUTDOOR.fence.x0 + 2.4, z, 0.6); }

  // context (neighbours, woods, gardens) can be switched off; the ground and the yard always stay
  const context = new THREE.Group(); context.name = 'context';
  const ground = new THREE.Group(); ground.name = 'ground';
  group.remove(bmesh); context.add(bmesh);
  group.remove(nearMesh); ground.add(nearMesh);
  const treeMeshes = buildTrees(trees, heightAt, { shadow: false, chunk: 450, detail: 0 });
  treeMeshes.forEach((m) => context.add(m));
  buildTrees(yardTrees, heightAt, { shadow: true, chunk: 0, detail: 1 }).forEach((m) => ground.add(m));

  // ---------- the yard surface, painted at 10 px per metre ----------
  ground.add(buildYard(heightAt));
  group.add(context, ground);

  return { group, context, ground, heightAt, nearMesh, farMesh, buildingsMesh: bmesh, treeMeshes };
}

// low-poly instanced trees; autumn palette from the October photos
function buildTrees(trees, heightAt, { shadow = false, chunk = 0, detail = 1 } = {}) {
  const out = [];
  const rr = rnd(4);
  function crownGeo(blobs, colorA, detail = 1) {
    const parts = [];
    blobs.forEach(([x, y, z, r]) => {
      const g = new THREE.IcosahedronGeometry(r, detail);
      const p = g.attributes.position;
      for (let i = 0; i < p.count; i++) { const k = 1 + (rr() - 0.5) * 0.28; p.setXYZ(i, p.getX(i) * k, p.getY(i) * k * 0.9, p.getZ(i) * k); }
      g.translate(x, y, z); parts.push(g);
    });
    const m = mergeGeometries(parts); // icosahedra keep their smooth radial normals
    const cols = new Float32Array(m.attributes.position.count * 3), c = new THREE.Color(colorA);
    for (let i = 0; i < m.attributes.position.count; i++) cols.set([c.r, c.g, c.b], i * 3);
    m.setAttribute('color', new THREE.BufferAttribute(cols, 3));
    return m;
  }
  function trunkGeo(h, r, color) {
    const g = new THREE.CylinderGeometry(r * 0.7, r, h, 6, 1).toNonIndexed(); g.translate(0, h / 2, 0);
    const c = new THREE.Color(color), cols = new Float32Array(g.attributes.position.count * 3);
    for (let i = 0; i < g.attributes.position.count; i++) cols.set([c.r, c.g, c.b], i * 3);
    g.setAttribute('color', new THREE.BufferAttribute(cols, 3));
    return g;
  }
  const defs = {
    broad: { geo: mergeGeometries([trunkGeo(3.2, 0.22, '#4a3b2c'), crownGeo([[0, 4.8, 0, 2.6], [1.3, 4.2, 0.6, 1.9], [-1.2, 4.4, -0.5, 2.0], [0.2, 6.0, -0.3, 1.8]], '#ffffff', detail)]), tints: ['#8a8a3a', '#a07a2c', '#b8862e', '#6f7a34', '#c39a3a', '#7b6a2c', '#9a5e2a', '#5f6b30'] },
    column: { geo: mergeGeometries([trunkGeo(1.0, 0.15, '#3c3024'), crownGeo([[0, 2.6, 0, 1.25], [0, 4.2, 0, 1.05], [0, 5.6, 0, 0.75]], '#ffffff', detail)]), tints: ['#3f5a2a', '#4a6230', '#36502a', '#56662e', '#8a8a38'], sy: 1.5 },
    birch: { geo: mergeGeometries([trunkGeo(5.0, 0.16, '#e8e4dc'), crownGeo([[0, 5.6, 0, 1.6], [0.7, 6.8, 0.2, 1.2], [-0.6, 4.8, 0.3, 1.3]], '#ffffff', detail)]), tints: ['#d7b34a', '#c9a640', '#e0c060', '#b8a248'] },
  };
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true });
  const dummy = new THREE.Object3D(), c = new THREE.Color();
  const crownTint = (sh) => {
    sh.vertexShader = sh.vertexShader.replace('#include <color_vertex>', `#include <color_vertex>
      #ifdef USE_INSTANCING_COLOR
        float crown = step(2.95, color.r + color.g + color.b);
        vColor.rgb = mix(color.rgb, color.rgb * instanceColor.rgb, crown);
      #endif`);
  };
  mat.onBeforeCompile = crownTint; // trunks keep their colour, crowns take the instance tint
  for (const [type, list] of Object.entries(trees)) {
    if (!list.length) continue;
    const d = defs[type];
    // split into tiles so whole tiles outside the view are skipped
    const tiles = new Map();
    for (const t of list) { const k = chunk ? Math.floor(t[0] / chunk) + ',' + Math.floor(t[1] / chunk) : '0'; if (!tiles.has(k)) tiles.set(k, []); tiles.get(k).push(t); }
    for (const part of tiles.values()) {
      const m = new THREE.InstancedMesh(d.geo, mat, part.length);
      part.forEach(([x, z, s, r], i) => {
        dummy.position.set(x, heightAt(x, z) - 0.1, z);
        dummy.rotation.set(0, r * 6.28, 0);
        dummy.scale.set(s, s * (d.sy || 1) * (0.9 + r * 0.25), s);
        dummy.updateMatrix(); m.setMatrixAt(i, dummy.matrix);
        c.set(d.tints[Math.floor(r * 997) % d.tints.length]); m.setColorAt(i, c);
      });
      m.computeBoundingSphere();
      m.castShadow = shadow; m.receiveShadow = shadow; m.name = 'trees-' + type;
      out.push(m);
    }
  }
  return out;
}

function buildYard(heightAt) {
  const W = SITE.x1 - SITE.x0, D = SITE.z1 - SITE.z0, PPM = 10;
  const c = document.createElement('canvas'); c.width = W * PPM; c.height = D * PPM;
  const g = c.getContext('2d');
  const X = (x) => (x - SITE.x0) * PPM, Z = (z) => (z - SITE.z0) * PPM;
  const pat = (tex, scale) => { const p = g.createPattern(tex.image, 'repeat'); p.setTransform(new DOMMatrix().scale(scale)); return p; };
  const grassP = pat(TX.grass(), 0.6), asphP = pat(TX.asphalt(), 0.7), pavP = pat(TX.pavers(), 0.5), gravP = pat(TX.gravel(), 0.6);
  const rect = (fill, x0, z0, x1, z1) => { g.fillStyle = fill; g.fillRect(X(x0), Z(z0), (x1 - x0) * PPM, (z1 - z0) * PPM); };
  const F = OUTDOOR.fence;
  rect(grassP, SITE.x0, SITE.z0, SITE.x1, SITE.z1);
  // outside the fence: dry verge
  g.fillStyle = 'rgba(150,135,90,0.35)'; g.fillRect(0, 0, c.width, Z(F.z0)); g.fillRect(0, Z(F.z1), c.width, c.height); g.fillRect(0, 0, X(F.x0), c.height); g.fillRect(X(F.x1), 0, c.width, c.height);
  // forecourt in front of the entrance, driveway along facade А, service yard at grid line 9 (photos 1, 2, 4)
  rect(asphP, F.x0, -24, ENV.x0 - 2.2, 22);
  rect(asphP, F.x0, 12.6, F.x1 - 1, 22);
  rect(asphP, ENV.x1 + 0.6, -6, F.x1 - 1, 22);
  rect(asphP, SITE.x0, -4, F.x0, 4); // gate and access road
  // kerbs
  g.strokeStyle = '#c9c7c0'; g.lineWidth = 2.2;
  g.strokeRect(X(F.x0), Z(-24), (ENV.x0 - 2.2 - F.x0) * PPM, 46 * PPM);
  g.beginPath(); g.moveTo(X(ENV.x0 - 2.2), Z(12.6)); g.lineTo(X(ENV.x1 + 0.6), Z(12.6)); g.stroke();
  // gravel beds under the chillers and the generator (photo 2)
  rect(gravP, 24.2, 4.6, 32.4, 14.8); rect(gravP, 32.6, 4.8, 38.0, 16.6);
  // herringbone paving: path along facade Б and around the solar array (photo 3)
  rect(pavP, ENV.x0 - 2.2, ENV.z0 - 2.3, ENV.x1 + 0.6, ENV.z0 - 0.9);
  rect(pavP, ENV.x0 - 2.2, ENV.z0 - 2.3, ENV.x0 - 0.4, 12.6);
  rect(pavP, 14, -20, 25, -18.8);
  // concrete apron of the substation
  rect('#9a9893', 29.6, -11, 37.2, 1.9);
  // parking bays
  g.strokeStyle = 'rgba(240,240,235,0.85)'; g.lineWidth = 1.5;
  for (let z = -20; z <= 18; z += 2.6) { g.beginPath(); g.moveTo(X(F.x0 + 1), Z(z)); g.lineTo(X(F.x0 + 6), Z(z)); g.stroke(); }
  // fallen leaves
  const r = rnd(3);
  for (let i = 0; i < 5000; i++) { g.fillStyle = ['#c49a4a', '#b07a32', '#d6b061', '#9a6a2a'][(r() * 4) | 0]; g.globalAlpha = 0.5 + r() * 0.5; g.beginPath(); g.ellipse(r() * c.width, r() * c.height, 1.4 + r() * 1.6, 0.9 + r(), r() * 3, 0, 7); g.fill(); }
  g.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  const geo = new THREE.PlaneGeometry(W, D); geo.rotateX(-Math.PI / 2); geo.translate((SITE.x0 + SITE.x1) / 2, GROUND, (SITE.z0 + SITE.z1) / 2);
  const m = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ map: tex }));
  m.receiveShadow = true; m.name = 'yard';
  return m;
}
