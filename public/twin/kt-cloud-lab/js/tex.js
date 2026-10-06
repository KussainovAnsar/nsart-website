import * as THREE from 'three';

let maxAniso = 4;
export function setAniso(a) { maxAniso = a; }

function canvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; }
function rnd(seed) { let s = seed >>> 0; return () => ((s = Math.imul(s ^ (s >>> 15), 1 | s) + 0x6d2b79f5 >>> 0) / 4294967296); }
function toTex(c, rx = 1, ry = 1, srgb = true) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry);
  t.anisotropy = maxAniso; if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
function speckle(g, w, h, n, colors, r, rand) {
  for (let i = 0; i < n; i++) { g.fillStyle = colors[(rand() * colors.length) | 0]; const s = rand() * r + 0.4; g.fillRect(rand() * w, rand() * h, s, s); }
}

// pale-yellow vinyl siding as photographed on all long facades: 200 mm laps, one tile = 2 m × 2 m
export function siding(base = '#e7d6a4') {
  const [c, g] = canvas(512, 512), rand = rnd(3);
  g.fillStyle = base; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 10; i++) {
    const y = i * 51.2;
    const grd = g.createLinearGradient(0, y, 0, y + 51.2);
    grd.addColorStop(0, 'rgba(255,255,240,0.20)'); grd.addColorStop(0.75, 'rgba(0,0,0,0)'); grd.addColorStop(1, 'rgba(70,50,10,0.22)');
    g.fillStyle = grd; g.fillRect(0, y, 512, 51.2);
    g.fillStyle = 'rgba(90,70,30,0.45)'; g.fillRect(0, y + 49.5, 512, 1.5);
  }
  speckle(g, 512, 512, 2500, ['rgba(120,100,60,0.05)', 'rgba(255,255,255,0.05)'], 2, rand);
  for (let i = 0; i < 6; i++) { g.fillStyle = 'rgba(80,70,50,0.04)'; g.fillRect(rand() * 512, 0, 30 + rand() * 60, 512); }
  return toTex(c);
}
// silver trapezoidal profiled sheet (vertical ribs), one tile = 1 m wide
export function profiled() {
  const [c, g] = canvas(256, 256);
  const grd = g.createLinearGradient(0, 0, 256, 0);
  const stops = [[0, '#b9bec4'], [0.12, '#dfe3e7'], [0.2, '#9aa1a8'], [0.35, '#c6cbd0'], [0.62, '#c9ced3'], [0.7, '#eef1f3'], [0.78, '#a3aab1'], [1, '#bfc4c9']];
  stops.forEach(([o, col]) => grd.addColorStop(o, col)); g.fillStyle = grd; g.fillRect(0, 0, 256, 256);
  return toTex(c);
}
export function granite(base = '#8f6158') {
  const [c, g] = canvas(256, 256), rand = rnd(9);
  g.fillStyle = base; g.fillRect(0, 0, 256, 256);
  speckle(g, 256, 256, 9000, ['#5d3b36', '#b48a80', '#3e2a28', '#c9a99f', '#7a4f47'], 2.2, rand);
  g.strokeStyle = 'rgba(40,25,20,0.5)'; g.lineWidth = 1.5; g.strokeRect(0, 0, 256, 256);
  return toTex(c);
}
export function asphalt() {
  const [c, g] = canvas(512, 512), rand = rnd(5);
  g.fillStyle = '#5c5d5f'; g.fillRect(0, 0, 512, 512);
  speckle(g, 512, 512, 30000, ['#4a4b4d', '#6d6e70', '#55575a', '#7b7c7d', '#424345'], 2, rand);
  g.strokeStyle = 'rgba(30,30,30,0.35)'; g.lineWidth = 1.2;
  for (let i = 0; i < 9; i++) { g.beginPath(); let x = rand() * 512, y = rand() * 512; g.moveTo(x, y); for (let k = 0; k < 8; k++) { x += (rand() - 0.5) * 60; y += (rand() - 0.5) * 60; g.lineTo(x, y); } g.stroke(); }
  return toTex(c);
}
export function grass(autumn = 0.55) {
  const [c, g] = canvas(512, 512), rand = rnd(7);
  g.fillStyle = autumn > 0.5 ? '#7d7a45' : '#5f7a3a'; g.fillRect(0, 0, 512, 512);
  speckle(g, 512, 512, 40000, ['#6b7339', '#8c8549', '#58652f', '#9c8f55', '#a08a4c', '#4f5f2c'], 2.5, rand);
  for (let i = 0; i < 260; i++) { g.fillStyle = ['#c39a52', '#b7843e', '#d5b06a'][(rand() * 3) | 0]; g.beginPath(); g.ellipse(rand() * 512, rand() * 512, 3 + rand() * 3, 2 + rand() * 2, rand() * 3, 0, 7); g.fill(); }
  return toTex(c);
}
export function gravel() {
  const [c, g] = canvas(256, 256), rand = rnd(13);
  g.fillStyle = '#3d3f44'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 2600; i++) { const s = 2 + rand() * 4; g.fillStyle = ['#2b2d31', '#55585e', '#46494f', '#6a6d72', '#33363a'][(rand() * 5) | 0]; g.beginPath(); g.ellipse(rand() * 256, rand() * 256, s, s * 0.7, rand() * 3, 0, 7); g.fill(); }
  return toTex(c);
}
// herringbone concrete pavers, tile = 1.2 m
export function pavers() {
  const [c, g] = canvas(256, 256), rand = rnd(17);
  g.fillStyle = '#8d8b88'; g.fillRect(0, 0, 256, 256);
  const u = 32;
  for (let i = -8; i < 16; i++) for (let j = -8; j < 16; j++) {
    const x = i * u + j * u, y = j * u - i * u * 0;
    const tone = 128 + (rand() * 30 | 0) - 15; g.fillStyle = `rgb(${tone + 8},${tone + 6},${tone + 2})`;
    g.save(); g.translate(x % 512, (y + i * u) % 512); g.fillRect(1, 1, u * 2 - 2, u - 2); g.fillRect(1, u + 1, u - 2, u * 2 - 2); g.restore();
  }
  speckle(g, 256, 256, 3000, ['rgba(0,0,0,0.08)', 'rgba(255,255,255,0.06)'], 1.5, rand);
  return toTex(c);
}
// speckled poured floor seen in every corridor photo
export function terrazzo() {
  const [c, g] = canvas(512, 512), rand = rnd(19);
  g.fillStyle = '#b9bbbd'; g.fillRect(0, 0, 512, 512);
  speckle(g, 512, 512, 60000, ['#8f9295', '#d7d8d9', '#6e7174', '#a6a8aa', '#e9e9e8'], 2.2, rand);
  return toTex(c);
}
export function darkTiles() {
  const [c, g] = canvas(256, 256), rand = rnd(23);
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
    const t = 70 + (rand() * 14 | 0); g.fillStyle = `rgb(${t},${t - 2},${t - 4})`; g.fillRect(i * 64, j * 64, 64, 64);
    for (let k = 0; k < 40; k++) { g.fillStyle = `rgba(255,255,255,${0.02 + rand() * 0.03})`; g.fillRect(i * 64, j * 64 + rand() * 64, 64, 1); }
  }
  g.strokeStyle = 'rgba(30,30,30,0.6)'; for (let i = 0; i <= 4; i++) { g.beginPath(); g.moveTo(i * 64, 0); g.lineTo(i * 64, 256); g.moveTo(0, i * 64); g.lineTo(256, i * 64); g.stroke(); }
  return toTex(c);
}
// 600 mm raised-floor panels; perforated variant for cold aisles
export function raisedFloor(perforated = false) {
  const [c, g] = canvas(256, 256);
  g.fillStyle = '#d4d8db'; g.fillRect(0, 0, 256, 256);
  if (perforated) { g.fillStyle = '#6d7479'; for (let i = 0; i < 24; i++) for (let j = 0; j < 24; j++) { g.beginPath(); g.arc(14 + i * 9.8, 14 + j * 9.8, 2.6, 0, 7); g.fill(); } }
  else { const rand = rnd(29); speckle(g, 256, 256, 3000, ['rgba(0,0,0,0.05)', 'rgba(255,255,255,0.2)'], 2, rand); }
  g.strokeStyle = '#8b9196'; g.lineWidth = 3; g.strokeRect(1.5, 1.5, 253, 253);
  return toTex(c);
}
export function ceilingTiles() {
  const [c, g] = canvas(256, 256), rand = rnd(31);
  g.fillStyle = '#f1f0ec'; g.fillRect(0, 0, 256, 256);
  speckle(g, 256, 256, 5000, ['rgba(120,120,110,0.12)', 'rgba(160,160,150,0.1)'], 1.6, rand);
  g.strokeStyle = '#c9c8c2'; g.lineWidth = 4; g.strokeRect(0, 0, 256, 256);
  return toTex(c);
}
export function wallPaint(base = '#dcd8dc') {
  const [c, g] = canvas(256, 256), rand = rnd(37);
  g.fillStyle = base; g.fillRect(0, 0, 256, 256);
  speckle(g, 256, 256, 6000, ['rgba(0,0,0,0.025)', 'rgba(255,255,255,0.05)'], 2, rand);
  return toTex(c);
}
// sandwich panels of the hermetic hall enclosure: 1.0 m modules
export function sandwich() {
  const [c, g] = canvas(256, 256);
  g.fillStyle = '#eef0f1'; g.fillRect(0, 0, 256, 256);
  g.fillStyle = 'rgba(0,0,0,0.05)'; for (let i = 0; i < 256; i += 16) g.fillRect(0, i, 256, 1);
  g.fillStyle = '#b5bbbf'; g.fillRect(0, 0, 3, 256);
  return toTex(c);
}
// rack front: perforated door with a slim handle
export function rackDoor() {
  const [c, g] = canvas(128, 384);
  g.fillStyle = '#16181b'; g.fillRect(0, 0, 128, 384);
  g.fillStyle = '#2a2e33';
  for (let y = 22; y < 362; y += 5) for (let x = 12; x < 116; x += 5) g.fillRect(x + ((y / 5) % 2) * 2, y, 2.6, 2.6);
  g.fillStyle = '#0c0d0f'; g.fillRect(0, 0, 128, 14); g.fillRect(0, 370, 128, 14); g.fillRect(0, 0, 8, 384); g.fillRect(120, 0, 8, 384);
  g.fillStyle = '#9aa2a8'; g.fillRect(104, 160, 5, 60);
  return toTex(c, 1, 1);
}
export function coolerFront() {
  const [c, g] = canvas(128, 384);
  g.fillStyle = '#202326'; g.fillRect(0, 0, 128, 384);
  g.fillStyle = '#2f3438'; for (let y = 30; y < 360; y += 6) g.fillRect(10, y, 108, 3);
  g.fillStyle = '#0d3e5c'; g.fillRect(36, 40, 56, 30); g.fillStyle = '#4fc3f7'; g.fillRect(40, 46, 30, 4); g.fillRect(40, 54, 22, 4);
  return toTex(c, 1, 1);
}
export function louvre() {
  const [c, g] = canvas(64, 64);
  g.fillStyle = '#c9cdd1'; g.fillRect(0, 0, 64, 64);
  for (let y = 0; y < 64; y += 8) { g.fillStyle = '#7d848a'; g.fillRect(0, y + 5, 64, 3); }
  return toTex(c);
}
export function concreteBlock() {
  const [c, g] = canvas(256, 256), rand = rnd(41);
  g.fillStyle = '#a4a6a6'; g.fillRect(0, 0, 256, 256);
  speckle(g, 256, 256, 9000, ['#8e9090', '#b8baba', '#7c7e7e'], 1.8, rand);
  g.strokeStyle = 'rgba(70,70,70,0.6)'; g.lineWidth = 2;
  for (let r = 0; r < 8; r++) { const y = r * 32; g.beginPath(); g.moveTo(0, y); g.lineTo(256, y); g.stroke(); for (let k = 0; k < 4; k++) { const x = k * 64 + (r % 2) * 32; g.beginPath(); g.moveTo(x, y); g.lineTo(x, y + 32); g.stroke(); } }
  return toTex(c);
}
export function container() {
  const [c, g] = canvas(256, 128);
  g.fillStyle = '#d9dcdc'; g.fillRect(0, 0, 256, 128);
  for (let x = 0; x < 256; x += 10) { g.fillStyle = 'rgba(0,0,0,0.08)'; g.fillRect(x, 0, 3, 128); g.fillStyle = 'rgba(255,255,255,0.25)'; g.fillRect(x + 4, 0, 2, 128); }
  return toTex(c);
}
export function solarCells() {
  const [c, g] = canvas(128, 256);
  g.fillStyle = '#c8ccd0'; g.fillRect(0, 0, 128, 256);
  for (let i = 0; i < 6; i++) for (let j = 0; j < 10; j++) { g.fillStyle = '#1a2440'; g.fillRect(4 + i * 20.3, 4 + j * 24.8, 19, 23.5); g.fillStyle = 'rgba(120,150,220,0.15)'; g.fillRect(4 + i * 20.3, 4 + j * 24.8, 19, 3); }
  return toTex(c, 1, 1);
}
// text to texture (signage, labels)
export function textTexture(text, { font = '700 90px Barlow Semi Condensed, Arial Narrow, sans-serif', color = '#1a8fd6', w = 1024, h = 160, glow = null, bg = null } = {}) {
  const [c, g] = canvas(w, h);
  if (bg) { g.fillStyle = bg; g.fillRect(0, 0, w, h); }
  g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle';
  if (glow) { g.shadowColor = glow; g.shadowBlur = 18; }
  g.fillStyle = color; g.fillText(text, w / 2, h / 2 + 4);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = maxAniso;
  return t;
}
// KT Cloud Lab cloud sign
export function cloudSign() {
  const [c, g] = canvas(512, 320);
  g.fillStyle = '#1e9be0';
  const blobs = [[150, 200, 95], [255, 140, 120], [370, 185, 100], [255, 225, 90], [90, 235, 60], [440, 240, 62]];
  blobs.forEach(([x, y, r]) => { g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); });
  g.fillRect(90, 220, 350, 82);
  g.font = '600 66px "IBM Plex Sans", Arial, sans-serif'; g.fillStyle = '#ffffff'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText('KT Cloud Lab', 262, 220);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
