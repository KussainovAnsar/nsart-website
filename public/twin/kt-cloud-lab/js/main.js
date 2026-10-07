import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Sky } from 'three/addons/objects/Sky.js';
import { T as TEXT, LANGS } from './i18n.js';
import './i18n2.js';
import * as TX from './tex.js';
import { createEnvironment, SITE } from './env.js';
import { createBuilding } from './building.js';
import { createLayers } from './layers.js';
import { createStory } from './story.js';
import { createTour } from './tour.js';
import { createScheme } from './scheme.js';
if (window.gsap && window.ScrollTrigger) window.gsap.registerPlugin(window.ScrollTrigger);
import { HALL, ENV, GROUND, ROOMS, OUTDOOR, FACTS, ENTRANCE_Z, telemetry, T0, T1, parseZbxTime, hostTarget, ROW_X_RANGE, ROW_Z_RANGE } from './model.js';

const $ = (s) => document.querySelector(s);
const store = { get(k, d) { try { const v = localStorage.getItem('ktc-' + k); return v == null ? d : JSON.parse(v); } catch { return d; } }, set(k, v) { try { localStorage.setItem('ktc-' + k, JSON.stringify(v)); } catch {} } };
const LOW = matchMedia('(pointer: coarse)').matches || Math.min(screen.width, screen.height) < 700;
// integrated and mobile GPUs get the light profile: no MSAA, hard shadows, smaller shadow map
const GPU = (() => { try { const g = document.createElement('canvas').getContext('webgl2'); const e = g.getExtension('WEBGL_debug_renderer_info'); return e ? g.getParameter(e.UNMASKED_RENDERER_WEBGL) : ''; } catch { return ''; } })();
const WEAK = LOW || /Intel|HD Graphics|UHD|Iris|Mali|Adreno|PowerVR|SwiftShader|llvmpipe/i.test(GPU);
const QS = new URLSearchParams(location.search);
const EMBED = QS.get('embed') === '1';
if (EMBED) document.body.classList.add('embed');
let lang = QS.get('lang') || store.get('lang', 'en'); if (!LANGS.includes(lang)) lang = 'en';
let L = TEXT[lang];
$('#loadMsg').textContent = L.loading;

// ---------- renderer ----------
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
// resolution adapts to the machine: start modest, step up while frames stay fast
const DPR_MAX = Math.min(devicePixelRatio, WEAK ? 1.25 : 1.5), DPR_MIN = 0.8;
let dpr = DPR_MAX, dprLowered = false;
const setDpr = (v) => { if (Math.abs(v - dpr) < 0.01) return; dpr = v; renderer.setPixelRatio(dpr); renderer.setSize(innerWidth, innerHeight); };
renderer.setPixelRatio(dpr);
renderer.autoClear = false;
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 0.72;
renderer.shadowMap.enabled = true; renderer.shadowMap.type = WEAK ? THREE.PCFShadowMap : THREE.PCFSoftShadowMap; renderer.shadowMap.autoUpdate = false;
renderer.localClippingEnabled = true;
$('#stage').appendChild(renderer.domElement);
TX.setAniso(Math.min(8, renderer.capabilities.getMaxAnisotropy()));

// two passes: sky and distant mountains with a deep frustum, then the site with a tight one
const scene = new THREE.Scene(), farScene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 5200);
const farCam = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 60, 220000);
camera.position.set(-260, 120, 210);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; controls.dampingFactor = 0.08; controls.maxPolarAngle = Math.PI * 0.495; controls.minDistance = 2; controls.maxDistance = 6000;
controls.target.set(0, 2, 0);

// ---------- sky, sun, fog, light ----------
const sky = new Sky(); sky.scale.setScalar(180000); // drawn once into a cube map, used as background
const su = sky.material.uniforms; su.turbidity.value = 3.2; su.rayleigh.value = 1.1; su.mieCoefficient.value = 0.004; su.mieDirectionalG.value = 0.78;
const envScene = new THREE.Scene(), envSky = new Sky(); envSky.scale.setScalar(1000); envScene.add(envSky);
Object.assign(envSky.material.uniforms.turbidity, { value: 3.2 });
const pmrem = new THREE.PMREMGenerator(renderer);
const skyRT = new THREE.WebGLCubeRenderTarget(256); skyRT.texture.colorSpace = THREE.SRGBColorSpace;
const skyCam = new THREE.CubeCamera(1, 5000, skyRT); envScene.add(skyCam);
let envRT = null;
scene.fog = new THREE.FogExp2(0xbfcfda, 0.000021); farScene.fog = scene.fog;
const sun = new THREE.DirectionalLight(0xfff1df, 3.0);
sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -66, right: 66, top: 66, bottom: -66, near: 10, far: 600 });
sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.04;
scene.add(sun, sun.target);
const hemi = new THREE.HemisphereLight(0xcfe3f5, 0x6b5f45, 0.6); scene.add(hemi);
// sky fill for matte (Lambert) surfaces, which get no image-based light
const skyFill = new THREE.AmbientLight(0xdfe8f0, 0.6); scene.add(skyFill);
const farSun = new THREE.DirectionalLight(0xfff1df, 2.4), farHemi = new THREE.HemisphereLight(0xcfe3f5, 0x6b5f45, 0.4); farScene.add(farSun, farHemi);
const nightLights = [];

// azimuth (deg from north, clockwise) → local frame (x along grid 1→9, z toward facade А)
const AZX = 227.4;
const dirLocal = (azDeg, elDeg) => { const ce = Math.cos(elDeg * Math.PI / 180); return new THREE.Vector3(Math.cos((azDeg - AZX) * Math.PI / 180) * ce, Math.sin(elDeg * Math.PI / 180), Math.cos((azDeg - AZX - 90) * Math.PI / 180) * ce); };
function solar(hour) { // 6 October, 43.35° N, 77.14° E, UTC+5
  const n = 279, phi = 43.35 * Math.PI / 180;
  const dec = 23.44 * Math.sin(2 * Math.PI * (284 + n) / 365) * Math.PI / 180;
  const solarHour = hour + (77.14 - 75) / 15 + 11.8 / 60;
  const ha = (solarHour - 12) * 15 * Math.PI / 180;
  const el = Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(ha));
  const az = Math.atan2(Math.sin(ha), Math.cos(ha) * Math.sin(phi) - Math.tan(dec) * Math.cos(phi)) + Math.PI;
  return { el: el * 180 / Math.PI, az: az * 180 / Math.PI };
}
let night = 0;
function setSun(hour) {
  const { el, az } = solar(hour);
  const d = dirLocal(az, el);
  su.sunPosition.value.copy(d); envSky.material.uniforms.sunPosition.value.copy(d);
  night = THREE.MathUtils.smoothstep(-el, -2, 6);
  const day = 1 - night, low = THREE.MathUtils.smoothstep(el, -2, 18);
  sun.position.copy(d.clone().multiplyScalar(300)); sun.intensity = 3.0 * low; farSun.position.copy(d); farSun.intensity = 2.2 * low; farHemi.intensity = 0.1 + 0.35 * (1 - night);
  sun.color.setHSL(0.08, 0.6 - 0.45 * low, 0.6 + 0.25 * low);
  hemi.intensity = 0.1 + 0.55 * day; skyFill.intensity = (WEAK ? 0.85 : 0.35) * day + 0.05;
  scene.fog.color.setRGB(0.04 + 0.7 * day * (0.85 + 0.15 * low), 0.06 + 0.75 * day * (0.85 + 0.15 * low), 0.09 + 0.78 * day);
  renderer.toneMappingExposure = 0.72 + night * 0.3;
  if (envRT) envRT.dispose();
  envRT = pmrem.fromScene(envScene, 0.02);
  skyCam.update(renderer, envScene); farScene.background = skyRT.texture;
  scene.environment = envRT.texture; farScene.environment = envRT.texture;
  envLevel = 0.1 + 0.7 * day; applyEnvLevel();
  shadowDirty = true;
  applyNight();
  $('#sunLbl').textContent = (night > 0.5 ? L.time.night : L.time.day) + ' ' + fmtHour(hour);
}
const fmtHour = (h) => `${String(Math.floor(h) % 24).padStart(2, '0')}:${String(Math.floor((h % 1) * 60)).padStart(2, '0')}`;

let shadowDirty = true, envLevel = 0.8;
// r160 has no scene.environmentIntensity: scale image-based light per material
function applyEnvLevel() { scene.traverse((o) => { if (!o.material) return; (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { if (m.isMeshStandardMaterial) { if (m.userData.envBase == null) m.userData.envBase = m.envMapIntensity; m.envMapIntensity = m.userData.envBase * envLevel; } }); }); }

// ---------- load data, build the world ----------
const [site, events] = await Promise.all([fetch('site.json').then((r) => r.json()), fetch('events.json').then((r) => r.json())]);
const env = createEnvironment(site, { low: WEAK });
scene.add(env.group); farScene.add(env.farMesh);
const clipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 1e6);
const bld = createBuilding({ clip: [clipPlane], weak: WEAK });
scene.add(bld.root);
const layers = createLayers(bld);
['power', 'cooling', 'airflow', 'network', 'alarms'].forEach((k) => scene.add(layers[k]));
layers.alarms.visible = true;

// night: lamps and sign lights
// light pools under the street lamps instead of real spot lights (no per-pixel light cost)
const poolTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d'); const r = g.createRadialGradient(64, 64, 0, 64, 64, 64); r.addColorStop(0, 'rgba(255,214,160,0.9)'); r.addColorStop(1, 'rgba(255,214,160,0)'); g.fillStyle = r; g.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c); })();
const poolMat = new THREE.MeshBasicMaterial({ map: poolTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 });
bld.lampPos.forEach((p) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(13, 13), poolMat); m.rotation.x = -Math.PI / 2; m.position.set(p.x, GROUND + 0.03, p.z); m.renderOrder = 2; scene.add(m); });
function applyNight() {
  const n = night;
  poolMat.opacity = 0.75 * n;
  bld.lampMat.emissiveIntensity = 3 * n; bld.windowsMat.emissiveIntensity = 0.9 * n;
  bld.signs.forEach((m) => (m.emissiveIntensity = 1.4 * n));
  bld.M.glass.emissive?.set(0x000000);
}

// ---------- events → time index ----------
const EV = events.map(([sev, start, end, open, host, problem, dur], i) => ({ i, sev, host, problem, dur, t0: parseZbxTime(start), t1: end ? parseZbxTime(end) : null, start, end, target: hostTarget(host), rack: (problem.match(/EDA-(1\.\d\.\d+)/) || [])[1] }));
const DEFAULT_T = Date.UTC(2026, 9, 3, 21, 30) - 5 * 3600e3;
let simT = DEFAULT_T, playing = true, speed = 60;
const activeAt = (t) => EV.filter((e) => e.t0 <= t && (e.t1 == null || e.t1 > t));

// ---------- views ----------
const SOUTH = dirLocal(180, 0), NORTH = dirLocal(0, 0);
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const VIEWS = {
  aerial: { pos: () => NORTH.clone().multiplyScalar(230).add(V(0, 46, 0)), target: () => SOUTH.clone().multiplyScalar(320).add(V(0, 40, 0)), cut: false },
  site: { pos: () => V(-78, 42, 58), target: V(4, 0, 0), cut: false },
  entrance: { pos: () => V(-44, 2.4, -9), target: V(-22, 2.6, -1), cut: false },
  cutaway: { pos: () => V(-30, 34, 40), target: V(2, 0, 0), cut: true },
  hall: { pos: () => V(HALL.x0 + 1.2, 5.6, HALL.z1 + 4.5), target: V(3.5, 0.6, -2.0), cut: true },
  plan: { pos: () => V(0.5, 70, 0.6), target: V(0.5, 0, 0.5), cut: true },
};
let view = 'aerial', tween = null;
function flyTo(name, instant = false) {
  if (name === 'story') { if (walk.on) stopWalk(); tween = null; select(null); return story?.enter(); }
  if (name === 'scheme') return scheme.open();
  if (name === 'walk') return startTour();
  if (walk.on) stopWalk();
  if (tour.on) { tour.stop(); controls.enabled = true; bld.groups.ceilings.visible = false; }
  view = name; const v = VIEWS[name];
  setCutaway(v.cut);
  const p1 = v.pos(), t1 = typeof v.target === 'function' ? v.target() : v.target.clone();
  if (instant) { camera.position.copy(p1); controls.target.copy(t1); controls.update(); }
  else tween = { p0: camera.position.clone(), t0: controls.target.clone(), p1, t1, k: 0, dur: 1.6 };
  updateViewButtons(); store.set('view', name);
}
function flyToPoint(pos, dist = 7) {
  const dir = camera.position.clone().sub(controls.target).setY(0).normalize();
  if (!isFinite(dir.x)) dir.set(-1, 0, 1).normalize();
  const p1 = pos.clone().add(dir.multiplyScalar(dist)).add(V(0, dist * 0.55, 0));
  tween = { p0: camera.position.clone(), t0: controls.target.clone(), p1, t1: pos.clone(), k: 0, dur: 1.2 };
}
let cut = false;
function setCutaway(on) {
  cut = on; clipPlane.constant = on ? 3.05 : 1e6;
  bld.groups.roof.visible = !on && layerState.roof;
  bld.groups.ceilings.visible = false;
}

// ---------- layers ----------
const layerState = { env: true, roof: true, interior: true, racks: true, power: false, cooling: false, airflow: false, network: false, fire: false, labels: true, alarms: true };
const LAYER_COLORS = { power: '#ffb300', cooling: '#42a5f5', airflow: '#ff6a3d', network: '#69f0ae', fire: '#ff6b5e', alarms: '#ff8a3d' };
function applyLayers() {
  env.context.visible = layerState.env; env.farMesh.visible = layerState.env; shadowDirty = true;
  bld.groups.shell.visible = layerState.roof || !cut;
  bld.groups.roof.visible = layerState.roof && !cut;
  bld.groups.interior.visible = layerState.interior;
  bld.groups.racks.visible = layerState.racks; bld.groups.electrical.visible = layerState.racks;
  ['power', 'cooling', 'airflow', 'network', 'alarms'].forEach((k) => (layers[k].visible = layerState[k]));
  bld.groups.fire.visible = layerState.fire;
  if (layerState.airflow) heatDirty = true;
}

// ---------- walk mode ----------
const walk = { on: false, yaw: 0, pitch: 0, keys: {}, vel: new THREE.Vector3() };
const solids = [...bld.wallSegs];
const rect = (x0, z0, x1, z1) => solids.push([x0, z0, x1, z0], [x1, z0, x1, z1], [x1, z1, x0, z1], [x0, z1, x0, z0]);
ROW_X_RANGE.forEach(([a, b]) => rect(a, ROW_Z_RANGE[0], b, ROW_Z_RANGE[1]));
// facade line with the three external doors left open
solids.push([ENV.x0, ENV.z0, -9.0, ENV.z0], [-8.25, ENV.z0, ENV.x1, ENV.z0], [ENV.x1, ENV.z0, ENV.x1, ENV.z1], [ENV.x1, ENV.z1, 17.4, ENV.z1], [15.95, ENV.z1, ENV.x0, ENV.z1], [ENV.x0, ENV.z1, ENV.x0, ENTRANCE_Z + 0.78], [ENV.x0, ENTRANCE_Z - 0.78, ENV.x0, ENV.z0]);
OUTDOOR.chillers.forEach((c) => rect(c.x0, c.z0, c.x1, c.z1));
[OUTDOOR.genset, OUTDOOR.substation].forEach((c) => rect(c.x0, c.z0, c.x1, c.z1));
{ const F = OUTDOOR.fence; solids.push([F.x0, F.z0, F.x1, F.z0], [F.x1, F.z0, F.x1, F.z1], [F.x1, F.z1, F.x0, F.z1], [F.x0, F.z1, F.x0, 4.2], [F.x0, -4.2, F.x0, F.z0]); }
function floorAt(x, z) {
  if (x > HALL.x0 && x < HALL.x1 && z > HALL.z0 && z < HALL.z1) return HALL.floor;
  if (x > ENV.x0 && x < ENV.x1 && z > ENV.z0 && z < ENV.z1) { for (const r of ROOMS) if (r.lvl && x > r.x0 && x < r.x1 && z > r.z0 && z < r.z1) return r.lvl; return 0; }
  if (x > ENV.x0 - 1.6 && x <= ENV.x0 && z > -3 && z < 6.6) return 0;
  if (x > ENV.x0 - 2.9 && x <= ENV.x0 - 1.6 && z > ENTRANCE_Z - 1.5 && z < ENTRANCE_Z + 1.5) return -0.6 * (ENV.x0 - 1.6 - x) / 1.3;
  if (x > 13.6 && x < 19.4 && z >= ENV.z1 && z < ENV.z1 + 2.6) return 0; // loading platform at door Д-2
  if (x > 17.4 && x < 19.0 && z >= ENV.z1 + 2.6 && z < ENV.z1 + 8.4) return GROUND * (z - ENV.z1 - 2.6) / 5.8;
  if (x > ENV.x0 - 1.6 && x <= ENV.x0 && z >= 6.6 && z < 12.6) return -0.6 * (z - 6.6) / 6;
  if (x > SITE.x0 && x < SITE.x1 && z > SITE.z0 && z < SITE.z1) return GROUND;
  return env.heightAt(x, z);
}
function collide(p, r = 0.28) {
  for (let it = 0; it < 2; it++) for (const [ax, az, bx, bz] of solids) {
    const dx = bx - ax, dz = bz - az, l2 = dx * dx + dz * dz || 1e-6;
    const t = Math.max(0, Math.min(1, ((p.x - ax) * dx + (p.z - az) * dz) / l2));
    const cx = ax + dx * t, cz = az + dz * t, ox = p.x - cx, oz = p.z - cz, d = Math.hypot(ox, oz);
    if (d < r && d > 1e-6) { p.x = cx + ox / d * r; p.z = cz + oz / d * r; }
  }
}
function startWalk() {
  walk.on = true; view = 'walk'; tween = null; controls.enabled = false; setCutaway(false);
  bld.groups.ceilings.visible = true;
  camera.position.set(ENV.x0 - 9, 0, -1.65); camera.position.y = floorAt(camera.position.x, camera.position.z) + 1.62;
  walk.yaw = -Math.PI / 2; walk.pitch = 0.04;
  updateViewButtons(); showHint();
  if (!LOW) renderer.domElement.requestPointerLock?.()?.catch?.(() => {});
}
function startTour() {
  select(null); tween = null; if (walk.on) stopWalk();
  controls.enabled = false; setCutaway(false);
  view = 'walk'; updateViewButtons(); $('#hint').hidden = true;
  tour.start();
}
function stopWalk() {
  walk.on = false; controls.enabled = true; bld.groups.ceilings.visible = false; $('#hint').hidden = true; $('#pad').hidden = true;
  if (document.pointerLockElement) document.exitPointerLock();
  controls.target.copy(camera.position).add(new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(walk.pitch, walk.yaw, 0, 'YXZ')).multiplyScalar(6));
}
function showHint() {
  const h = $('#hint'); h.hidden = false;
  h.innerHTML = `${LOW ? L.walkTouch : L.walkHint}<button id="exitWalk">${L.exit}</button>`;
  $('#exitWalk').onclick = () => flyTo('cutaway');
  if (LOW) { const pad = $('#pad'); pad.hidden = false; pad.innerHTML = ['', '↑', '', '←', '↓', '→'].map((s, i) => s ? `<button data-k="${['', 'KeyW', '', 'KeyA', 'KeyS', 'KeyD'][i]}" aria-label="${s}">${s}</button>` : '<span></span>').join('');
    pad.querySelectorAll('button').forEach((b) => { const k = b.dataset.k; b.onpointerdown = (e) => { e.preventDefault(); walk.keys[k] = true; }; b.onpointerup = b.onpointerleave = () => (walk.keys[k] = false); }); }
}
addEventListener('keydown', (e) => { if (walk.on) { walk.keys[e.code] = true; if (e.code === 'Escape') flyTo('cutaway'); } });
addEventListener('keyup', (e) => (walk.keys[e.code] = false));
let dragLook = null;
renderer.domElement.addEventListener('pointerdown', (e) => { if (walk.on && !document.pointerLockElement) dragLook = { x: e.clientX, y: e.clientY }; });
addEventListener('pointerup', () => (dragLook = null));
addEventListener('pointermove', (e) => {
  if (!walk.on) return;
  let dx = 0, dy = 0;
  if (document.pointerLockElement) { dx = e.movementX; dy = e.movementY; } else if (dragLook) { dx = e.clientX - dragLook.x; dy = e.clientY - dragLook.y; dragLook = { x: e.clientX, y: e.clientY }; } else return;
  walk.yaw -= dx * 0.0025; walk.pitch = Math.max(-1.3, Math.min(1.3, walk.pitch - dy * 0.0025));
});
renderer.domElement.addEventListener('click', () => { if (walk.on && !LOW && !document.pointerLockElement) renderer.domElement.requestPointerLock?.()?.catch?.(() => {}); });
const scheme = createScheme({
  getT: () => simT, lang: () => lang, alarms: () => alarmMap,
  onPick: (id) => { const it = bld.items.get(id); if (!it) return; const indoor = it.pos.y > -0.5 && Math.abs(it.pos.x) < 23 && Math.abs(it.pos.z) < 9.6; if (indoor && !cut) { view = 'cutaway'; setCutaway(true); updateViewButtons(); } select(id); flyToPoint(it.pos.clone(), indoor ? 7 : 18); },
});
const tour = createTour({
  camera, floorAt, lang: () => lang,
  onStart: () => { bld.groups.ceilings.visible = true; },
  onControl: () => { const e = new THREE.Euler().setFromQuaternion(camera.quaternion, 'YXZ'); walk.on = true; walk.yaw = e.y; walk.pitch = e.x; controls.enabled = false; showHint(); },
  onEnd: () => { bld.groups.ceilings.visible = false; controls.enabled = true; flyTo('site'); },
});
function stepWalk(dt) {
  const k = walk.keys, f = (k.KeyW || k.ArrowUp ? 1 : 0) - (k.KeyS || k.ArrowDown ? 1 : 0), s = (k.KeyD || k.ArrowRight ? 1 : 0) - (k.KeyA || k.ArrowLeft ? 1 : 0);
  const sp = (k.ShiftLeft || k.ShiftRight ? 4.2 : 1.7) * dt;
  const fw = new THREE.Vector3(-Math.sin(walk.yaw), 0, -Math.cos(walk.yaw)), rt = new THREE.Vector3(Math.cos(walk.yaw), 0, -Math.sin(walk.yaw));
  const p = camera.position;
  p.addScaledVector(fw, f * sp).addScaledVector(rt, s * sp);
  collide(p);
  const fy = floorAt(p.x, p.z) + 1.62; p.y += (fy - p.y) * Math.min(1, dt * 10);
  camera.rotation.set(walk.pitch, walk.yaw, 0, 'YXZ');
  const inside = p.x > ENV.x0 && p.x < ENV.x1 && p.z > ENV.z0 && p.z < ENV.z1;
  bld.groups.ceilings.visible = inside;
}

// ---------- picking & info card ----------
const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
let selected = null, downAt = null;
const selBox = new THREE.Box3Helper(new THREE.Box3(), 0x1e9be0); selBox.visible = false; selBox.material.depthTest = false; selBox.renderOrder = 9; scene.add(selBox);
renderer.domElement.addEventListener('pointerdown', (e) => (downAt = [e.clientX, e.clientY]));
// phone: a tap on the scene closes an open sheet
renderer.domElement.addEventListener('pointerdown', () => { if (PHONE) { $('#panel').classList.remove('open'); $('#layers').classList.remove('open'); } });
renderer.domElement.addEventListener('pointerup', (e) => {
  if (walk.on || !downAt || Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 5) return;
  pick(e.clientX, e.clientY);
});
function pick(cx, cy) {
  ptr.set(cx / innerWidth * 2 - 1, -cy / innerHeight * 2 + 1); ray.setFromCamera(ptr, camera);
  const vis = bld.pickables.filter((o) => { let p = o; while (p) { if (!p.visible) return false; p = p.parent; } return true; });
  const hits = ray.intersectObjects(vis, false).filter((h) => !cut || h.point.y < 3.1 || !h.object.parent || h.object.parent.name !== 'shell');
  if (!hits.length) return select(null);
  const h = hits[0]; let id;
  if (h.object.isInstancedMesh) id = h.object.userData.list[h.instanceId].id;
  else if (h.object.userData.ids) { const ids = h.object.userData.ids; id = ids.reduce((best, i) => (Math.abs(bld.items.get(i).pos.x - h.point.x) < Math.abs(bld.items.get(best).pos.x - h.point.x) ? i : best), ids[0]); }
  else id = h.object.userData.id;
  if (id === 'BLDG' && cut) return select(null);
  select(id, h.point);
}
function select(id) {
  selected = id ? bld.items.get(id) : null;
  if (!selected) { $('#card').hidden = true; selBox.visible = false; return; }
  const it = selected;
  if (it.mesh) { const s = it.kind === 'sensor' ? V(0.12, 0.14, 0.12) : V(1.12, 2.06, 0.64); selBox.box.setFromCenterAndSize(it.pos, s); }
  else if (it.object) selBox.box.setFromObject(it.object).expandByScalar(0.06);
  else selBox.box.setFromCenterAndSize(it.pos, V(46, 6, 19.6));
  selBox.visible = true;
  renderCard(); $('#card').hidden = false;
}
const fmt = (v, d = 1) => v.toLocaleString(lang === 'en' ? 'en-GB' : 'ru-RU', { minimumFractionDigits: d, maximumFractionDigits: d });
function cardModel(it) {
  const t = simT, C = L.card, K = L.kinds;
  const st = (alarm) => alarm ? `<span class="pill ${alarm === 'avg' ? 'crit' : 'warn'}">${alarm === 'avg' ? C.alarm : C.warn}</span>` : `<span class="pill ok">${C.ok}</span>`;
  const al = alarmMap.get(it.id);
  switch (it.kind) {
    case 'eda': { const i = +it.id.split('.').pop() + it.row * 11; return { title: it.id, kind: K.eda, rows: [[C.row, it.row], [C.pos, it.pos], [C.power, fmt(telemetry.rackPower(t, i)) + ' kW'], ['A / B', '2 × 3P 16 A'], [C.inlet, fmt(telemetry.inlet(t, nearestCooler(it))) + ' °C'], [C.status, st(al)]], spark: (tt) => telemetry.rackPower(tt, i), unit: 'kW' }; }
    case 'mda': case 'hda': case 'zda': return { title: it.id, kind: K[it.kind], rows: [[C.row, it.row], [C.pos, it.pos], ...(it.kind === 'mda' ? [[C.link, `${fmt(telemetry.wan(t, 0), 2)} / ${fmt(telemetry.wan(t, 1), 2)} Gbit/s`]] : []), [C.zabbix, it.kind === 'zda' ? `ZDA1.${it.row}-EX4200-1` : it.kind === 'mda' ? 'MDA1.1-MX240-1/2' : 'ARISTA / NTNX'], [C.status, st(al)]], spark: (tt) => telemetry.wan(tt, 0), unit: 'Gbit/s' };
    case 'cooler': { const n = it.ac; return { title: it.id === 'KE1' || it.id === 'KE2' ? it.id.replace('KE', 'Кэ') : it.id, kind: K.cooler, rows: [[C.zabbix, 'AC ' + n], ...(it.row ? [[C.row, it.row], [C.elec, (it.big ? '14.5' : '5') + ' kW']] : []), [C.inlet, fmt(telemetry.inlet(t, n)) + ' °C'], [C.rh, fmt(telemetry.humidity(t, n)) + ' %'], [C.fan, fmt(telemetry.fan(t, n), 0) + ' %'], [C.status, st(al)]], spark: (tt) => telemetry.inlet(tt, n), unit: '°C' }; }
    case 'sensor': { const i = +it.id.split('-')[1]; return { title: it.id, kind: K.sensor, rows: [[C.model, 'APC AP9335TH'], [C.row, it.row], ['°C', fmt(telemetry.sensor(t, i))], [C.rh, fmt(telemetry.humidity(t, (i % 14) + 1)) + ' %']], spark: (tt) => telemetry.sensor(tt, i), unit: '°C' }; }
    case 'ups': { const load = telemetry.upsLoad(t); return { title: it.id, kind: K.ups + ' · Eaton 9395', rows: [[C.capacity, '275 kVA'], [C.load, fmt(load / 4) + ' kW'], [C.phases, [0, 1, 2].map((p) => fmt(telemetry.upsPhase(t, p) / 4)).join(' / ')], [C.vin, fmt(telemetry.upsVin(t, 0)) + ' V'], [C.vout, fmt(telemetry.upsVout(t, 0)) + ' V'], [C.bat, fmt(telemetry.battery(t)) + ' V']], spark: (tt) => telemetry.upsLoad(tt) / 4, unit: 'kW' }; }
    case 'battery': return { title: it.id, kind: K.battery, rows: [[C.model, '9395-BAT10-500'], [C.bat, fmt(telemetry.battery(t)) + ' V'], [C.autonomy, '10 min']], spark: (tt) => telemetry.battery(tt), unit: 'V' };
    case 'switchboard': return { title: it.id, kind: K.switchboard, rows: [[C.load, it.id.startsWith('ЩРТ') ? fmt(telemetry.upsLoad(t) / 4) + ' kW' : fmt(telemetry.upsLoad(t)) + ' kW'], ...(it.id.startsWith('ЩРТ') ? [['ATyS', '630 A']] : [])], spark: (tt) => telemetry.upsLoad(tt), unit: 'kW' };
    case 'chiller': return { title: it.id, kind: K.chiller, rows: [[C.model, 'HiRef LSE658FS'], [C.cooling, '633 kW'], [C.elec, '239 kW'], [C.status, st(null)]], spark: (tt) => telemetry.upsLoad(tt) * 0.42 + 40, unit: 'kW' };
    case 'genset': return { title: 'Cummins C1000D5', kind: K.genset, rows: [['Standby', '833 kW / 1041 kVA'], ['Prime', '751 kW'], ['Engine', 'QST30-G3 V12'], [C.fuel, '4000 l'], [C.autonomy, '24 h'], [C.status, `<span class="pill ok">${C.standby}</span>`]] };
    case 'substation': return { title: 'ТП 2 × 1600 kVA', kind: K.substation, rows: [[C.model, '2 × ТМ-1600/10/0,4'], [C.feeders, '10 kV №20, №17'], ['0.4 kV', 'ЩО70, 2500 A'], [C.status, st(null)]] };
    case 'pump': return { title: it.id, kind: K.pump, rows: [[C.elec, it.id === 'P3' ? '4 kW' : '7.5 kW'], [C.status, st(null)]] };
    case 'gas': return { title: L.layers.fire, kind: K.gas, rows: [[C.agent, 'HFC-227ea'], ['', '1142 kg'], ['Импульс-100 / -80', '4 + 2'], ['', '18 ' + (lang === 'en' ? 'nozzles' : lang === 'ru' ? 'насадков' : 'шүмек')], [C.status, st(null)]] };
    case 'solar': return { title: 'JA Solar', kind: K.solar, rows: [[C.panels, '20 × 305 W'], [C.capacity, '6.1 kW'], [C.status, st(null)]] };
    case 'person': return { title: L.roles[it.role], kind: L.kinds2.person, rows: [[C.status, `<span class="pill ok">${lang === 'en' ? 'On shift' : lang === 'ru' ? 'На смене' : 'Ауысымда'}</span>`], ['24/7', lang === 'en' ? 'duty rota' : lang === 'ru' ? 'дежурство' : 'кезекшілік']] };
    case 'fiber': return { title: L.fiber[it.line], kind: L.kinds2.fiber, rows: [[C.zabbix, it.line ? 'MDA1.1-MX240-2 · ae1' : 'MDA1.1-MX240-1 · ae1'], ['Uplink', it.line ? 'OPS73' : 'OPTS6'], [C.load, fmt(telemetry.wan(t, it.line), 2) + ' Gbit/s'], [C.status, st(null)]], spark: (tt) => telemetry.wan(tt, it.line), unit: 'Gbit/s' };
    case 'grid': return { title: L.grid, kind: L.kinds2.grid, rows: [[C.feeders, '№20 · №17'], ['ПС 110/10 kV', '№156A'], [C.load, fmt(telemetry.facility(t).total) + ' kW'], ['PUE', fmt(telemetry.facility(t).pue, 2)]], spark: (tt) => telemetry.facility(tt).total, unit: 'kW' };
    case 'building': return { title: 'KT Cloud Lab', kind: K.building, rows: L.overview.facts.slice(0, 6) };
  }
  return { title: it.id, kind: '', rows: [] };
}
function nearestCooler(it) { let best = 1, d = 1e9; bld.coolers.forEach((k) => { if (k.row !== it.row) return; const dd = Math.abs(k.z - it.z); if (dd < d) { d = dd; best = k.ac; } }); return best; }
function renderCard() {
  if (!selected) return;
  const m = cardModel(selected);
  const card = $('#card');
  card.innerHTML = `<button class="x" aria-label="Close">×</button><h4>${m.title}</h4><div class="kind">${m.kind}</div><dl class="rows">${m.rows.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl>${m.spark ? `<canvas width="560" height="128"></canvas><div class="cap"><span>${L.card.trend}</span><span id="sparkV"></span></div>` : ''}`;
  card.querySelector('.x').onclick = () => select(null);
  if (m.spark) drawSpark(card.querySelector('canvas'), m.spark, m.unit);
}
function drawSpark(cv, fn, unit) {
  const g = cv.getContext('2d'), W = cv.width, H = cv.height, N = 120, vals = [];
  for (let i = 0; i < N; i++) vals.push(fn(simT - 24 * 3600e3 * (1 - i / (N - 1))));
  let mn = Math.min(...vals), mx = Math.max(...vals); const pad = (mx - mn) * 0.15 || 1; mn -= pad; mx += pad;
  g.clearRect(0, 0, W, H);
  g.strokeStyle = 'rgba(150,185,205,0.12)'; g.lineWidth = 1; for (let i = 1; i < 4; i++) { g.beginPath(); g.moveTo(0, H * i / 4); g.lineTo(W, H * i / 4); g.stroke(); }
  const X = (i) => i / (N - 1) * (W - 10), Y = (v) => H - 6 - (v - mn) / (mx - mn) * (H - 12);
  const grd = g.createLinearGradient(0, 0, 0, H); grd.addColorStop(0, 'rgba(30,155,224,0.35)'); grd.addColorStop(1, 'rgba(30,155,224,0)');
  g.beginPath(); vals.forEach((v, i) => (i ? g.lineTo(X(i), Y(v)) : g.moveTo(X(i), Y(v)))); g.lineTo(X(N - 1), H); g.lineTo(0, H); g.closePath(); g.fillStyle = grd; g.fill();
  g.beginPath(); vals.forEach((v, i) => (i ? g.lineTo(X(i), Y(v)) : g.moveTo(X(i), Y(v)))); g.strokeStyle = '#1e9be0'; g.lineWidth = 2.5; g.stroke();
  g.beginPath(); g.arc(X(N - 1), Y(vals[N - 1]), 5, 0, 7); g.fillStyle = '#fff'; g.fill();
  const sv = $('#sparkV'); if (sv) sv.textContent = `${fmt(Math.min(...vals))} – ${fmt(Math.max(...vals))} ${unit}`;
}

// ---------- UI ----------
const TABS = ['systems', 'ops', 'power', 'cooling', 'about'];
// panels can be collapsed; the choice is remembered per viewer
const PHONE = matchMedia('(max-width: 820px)').matches;
const mins = Object.assign({ panel: false, layers: false, kpis: PHONE }, store.get('mins', {}));
document.addEventListener('click', (e) => { const b = e.target.closest('.min-btn'); if (!b) return; const k = b.dataset.min; mins[k] = !mins[k]; store.set('mins', mins); b.textContent = mins[k] ? '+' : '–'; applyMins(); });
function applyMins() {
  $('#panel').classList.toggle('min', mins.panel); $('#layers').classList.toggle('min', mins.layers); $('#kpis').classList.toggle('min', mins.kpis);
  const k = $('#kpiMin'); if (k) k.textContent = mins.kpis ? '+' : '–';
}
let tab = store.get('tab', 'systems'); if (!TABS.includes(tab)) tab = 'systems';
let activeSystem = null;
// left panel drives the scene: each system sets the camera, the layers and the selection
const SYSTEM_FOCUS = {
  grid: { layers: { power: true }, id: 'GRID', view: 'site', dist: 30 },
  tp: { layers: { power: true }, id: 'TP', dist: 18 },
  dgu: { layers: { power: true }, id: 'DGU', dist: 18 },
  ups: { layers: { power: true }, id: 'UPS2', cut: true, dist: 9 },
  chillers: { layers: { cooling: true }, id: 'CH-1', dist: 18 },
  coolers: { layers: { cooling: true, airflow: true }, id: 'K6', cut: true, dist: 8 },
  racks: { layers: { airflow: true }, id: 'ZDA 1.4', cut: true, dist: 12 },
  fiber: { layers: { network: true }, id: 'FIBER-1', view: 'site', dist: 40 },
  fire: { layers: { fire: true }, id: 'GAS', cut: true, dist: 12 },
  people: { layers: {}, id: 'STAFF-3', cut: true, dist: 9 },
};
function focusSystem(key) {
  const f = SYSTEM_FOCUS[key]; activeSystem = key;
  ['power', 'cooling', 'airflow', 'network', 'fire'].forEach((k) => (layerState[k] = !!f.layers[k]));
  applyLayers(); syncLayerButtons();
  if (walk.on) stopWalk();
  view = f.cut ? 'cutaway' : 'site'; setCutaway(!!f.cut); updateViewButtons();
  const it = bld.items.get(f.id);
  select(f.id); flyToPoint(it.pos.clone(), f.dist);
  renderTab();
}
function syncLayerButtons() { $('#layers').querySelectorAll('.tg').forEach((b) => b.setAttribute('aria-pressed', layerState[b.dataset.k])); }

// ---------- operations pipeline: alerts → analytics → prediction → prescription ----------
function opsModel(t) {
  const O = L.ops, act = activeAt(t);
  const fanAl = [...new Set(act.filter((e) => /^AC \d+/.test(e.host)).map((e) => e.host))];
  const netAl = act.filter((e) => !/^AC /.test(e.host));
  let analytics, predict = [], prescribe;
  if (fanAl.length) {
    const ids = fanAl.map((h) => { const n = +h.split(' ')[1]; return n <= 14 ? 'K' + n : 'Кэ' + (n - 14); });
    analytics = O.analytics.fans(fanAl.length, ids.join(', '));
    let worst = 1, wf = 0; for (let n = 1; n <= 16; n++) { const f = telemetry.fan(t, n); if (f > wf) { wf = f; worst = n; } }
    const slope = Math.max(0.15, (telemetry.fan(t, worst) - telemetry.fan(t - 3 * 3600e3, worst)) / 3);
    const hrs = Math.max(1, Math.min(12, Math.round((100 - wf) / slope)));
    let peak = 0; for (let n = 1; n <= 14; n++) peak = Math.max(peak, telemetry.inlet(t, n));
    predict.push(O.predict.fans(hrs, fmt(peak + 0.6)));
    prescribe = O.prescribe.fans(worst <= 14 ? 'K' + worst : 'Кэ' + (worst - 14));
  } else if (netAl.length) { analytics = O.analytics.net(netAl.length); prescribe = O.prescribe.net; }
  else { analytics = O.analytics.calm; prescribe = O.prescribe.calm; }
  let maxUps = 0; for (let h = 0; h < 24; h++) maxUps = Math.max(maxUps, telemetry.upsLoad(t + h * 3600e3));
  predict.push(O.predict.ups(Math.ceil(maxUps / FACTS.ups.kw * 100 + 1)));
  const d = new Date(t + 5 * 3600e3); const next15 = t + (((15 - d.getUTCHours() + 24) % 24) || 24) * 3600e3;
  predict.push(O.predict.pue(fmt(telemetry.facility(next15).pue, 2)));
  return { act, analytics, predict, prescribe };
}
let lastSimT = null;
function checkNewAlerts() {
  if (lastSimT != null && simT > lastSimT && simT - lastSimT < 6 * 3600e3) {
    const fresh = EV.filter((e) => e.t0 > lastSimT && e.t0 <= simT);
    if (fresh.length) toast(fresh[fresh.length - 1]);
  }
  lastSimT = simT;
}
let toastTimer = null;
function toast(e) {
  const el = $('#toast'); el.hidden = false;
  el.innerHTML = `<span class="dot ${e.sev}"></span><div><div class="t">${L.ops.newAlert} · ${e.start.slice(11, 16)} · ${e.host}</div><div class="p">${e.problem}</div></div>`;
  el.onclick = () => { if (e.target) { if (!cut) flyTo('cutaway'); setTimeout(() => { select(e.target); flyToPoint(bld.items.get(e.target).pos, 6); }, cut ? 0 : 900); } };
  el.classList.remove('in'); void el.offsetWidth; el.classList.add('in');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => (el.hidden = true), 5200);
}
function buildChrome() {
  L = TEXT[lang]; document.documentElement.lang = lang === 'kk' ? 'kk' : lang;
  $('#title').innerHTML = L.title.replace('·', '·<b>').replace(/$/, '</b>');
  $('#subtitle').textContent = L.sub; $('#northTxt').textContent = L.north;
  $('#langs').innerHTML = LANGS.map((k) => `<button aria-pressed="${k === lang}" data-l="${k}">${TEXT[k].code}</button>`).join('');
  $('#langs').querySelectorAll('button').forEach((b) => (b.onclick = () => { lang = b.dataset.l; store.set('lang', lang); buildChrome(); }));
  $('#views').innerHTML = `<button data-v="story" aria-pressed="false">${L.story.btn}</button>` + Object.keys(L.views).map((k) => `<button data-v="${k}" aria-pressed="false">${L.views[k]}</button>`).join('') + `<button data-v="scheme" aria-pressed="false">${{ en: '2D schematic', ru: '2D-схема', kk: '2D-сызба' }[lang]}</button>`;
  scheme?.refresh(); tour?.render?.();
  story?.rebuild();
  $('#views').querySelectorAll('button').forEach((b) => (b.onclick = () => flyTo(b.dataset.v)));
  updateViewButtons();
  $('#tabs').innerHTML = TABS.map((k) => `<button role="tab" data-t="${k}" aria-selected="${k === tab}">${L.tabs2[k] || L.tabs[k]}</button>`).join('');
  $('#panelMin').textContent = mins.panel ? '+' : '–';
  $('#tabs').querySelectorAll('button[data-t]').forEach((b) => (b.onclick = () => { tab = b.dataset.t; mins.panel = false; store.set('mins', mins); store.set('tab', tab); buildChrome(); }));
  applyMins();
  $('#layers').innerHTML = `<h2>${L.layers.title}<button class="min-btn" data-min="layers" aria-label="Collapse">${mins.layers ? '+' : '–'}</button></h2>` + Object.keys(layerState).map((k) => `<button class="tg" data-k="${k}" aria-pressed="${layerState[k]}" style="--sw:${LAYER_COLORS[k] || 'var(--kt)'}"><span class="sw"></span>${L.layers[k]}</button>`).join('');
  $('#layers').querySelectorAll('.tg').forEach((b) => (b.onclick = () => { const k = b.dataset.k; layerState[k] = !layerState[k]; b.setAttribute('aria-pressed', layerState[k]); applyLayers(); if (['power', 'cooling', 'airflow', 'network', 'fire'].includes(k) && layerState[k] && !cut && view !== 'walk') flyTo(k === 'power' || k === 'cooling' ? 'cutaway' : 'hall'); }));
  $('#panelToggle').textContent = L.tabs2.systems + ' ▴'; $('#layersToggle').textContent = L.layers.title + ' ▴';
  $('#panelToggle').onclick = () => { $('#panel').classList.toggle('open'); $('#layers').classList.remove('open'); };
  $('#layersToggle').onclick = () => { $('#layers').classList.toggle('open'); $('#panel').classList.remove('open'); };
  $('#speed').innerHTML = [1, 60, 600, 3600].map((s) => `<button data-s="${s}" aria-pressed="${s === speed}">${s}×</button>`).join('');
  $('#speed').querySelectorAll('button').forEach((b) => (b.onclick = () => { speed = +b.dataset.s; $('#speed').querySelectorAll('button').forEach((q) => q.setAttribute('aria-pressed', q === b)); }));
  labelEls.forEach((el) => el.remove()); labelEls.clear(); buildLabels();
  renderTab(); renderKpis(); renderCard(); setSun(+$('#sun').value);
  if (walk.on) showHint();
}
function updateViewButtons() { $('#views').querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.v === view)); }
let evFilter = 'active';
function renderTab() {
  const body = $('#tabbody'), O = L.overview, t = simT;
  if (tab === 'systems') {
    const S = L.systems;
    body.innerHTML = `<h3>${S.title}</h3><div class="sys">${S.list.map(([k, n, d]) => `<button class="sysb" data-s="${k}" aria-pressed="${activeSystem === k}"><span class="ic ic-${k}"></span><span><b>${n}</b><small>${d}</small></span></button>`).join('')}</div><p class="note">${S.hint}</p><h3>${L.tabs.overview}</h3><dl class="facts">${O.facts.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl>`;
    body.querySelectorAll('.sysb').forEach((b) => (b.onclick = () => focusSystem(b.dataset.s)));
  } else if (tab === 'ops') {
    const m = opsModel(t), S = L.ops.stages;
    const evs = (evFilter === 'active' ? m.act : EV.filter((e) => e.t0 <= t)).sort((a, b) => b.t0 - a.t0);
    body.innerHTML = `<h3>${L.ops.title} <span class="live"><i></i>${L.ops.live}</span></h3>
      <ol class="pipe">
        <li class="st-a"><span class="sn">1</span><div><b>${S[0]}</b><p><span class="${m.act.length ? 'crit' : 'ok'} mono">${m.act.length}</span> · ${m.act.slice(0, 3).map((e) => e.host).join(', ') || '—'}</p></div></li>
        <li class="st-b"><span class="sn">2</span><div><b>${S[1]}</b><p>${m.analytics}</p></div></li>
        <li class="st-c"><span class="sn">3</span><div><b>${S[2]}</b>${m.predict.map((p) => `<p>${p}</p>`).join('')}</div></li>
        <li class="st-d"><span class="sn">4</span><div><b>${S[3]}</b><p>${m.prescribe}</p></div></li>
      </ol>
      <h3>${L.tabs.events}</h3><div class="seg"><button data-f="active" aria-pressed="${evFilter === 'active'}">${L.events.active}</button><button data-f="all" aria-pressed="${evFilter === 'all'}">${L.events.all}</button></div>` +
      (evs.length ? evs.slice(0, 40).map((e) => { const open = e.t1 == null || e.t1 > t; return `<div class="ev ${open ? '' : 'done'}" data-i="${e.i}"><span class="sv ${e.sev}"></span><div><div class="t"><span>${e.start}</span><span>${e.host}</span><span class="${open ? 'crit' : 'ok'}">${open ? L.events.open : L.events.resolved}</span></div><div class="p">${e.problem}</div></div></div>`; }).join('') : `<p class="note">${L.events.none}</p>`) + `<p class="note">${L.events.src}</p>`;
    body.querySelectorAll('.seg button').forEach((b) => (b.onclick = () => { evFilter = b.dataset.f; renderTab(); }));
    body.querySelectorAll('.ev').forEach((el) => (el.onclick = () => { const e = EV[+el.dataset.i]; const id = e.target; if (!id) return; if (!cut) flyTo('cutaway'); setTimeout(() => { select(id); flyToPoint(bld.items.get(id).pos, 6); }, cut ? 0 : 900); }));
  }
  else if (tab === 'power') {
    const ph = [0, 1, 2].map((p) => telemetry.upsPhase(t, p));
    body.innerHTML = `<h3>${O.chain}</h3><ol class="chain">${O.chainSteps.map((s) => `<li>${s}</li>`).join('')}</ol><h3>UPS · Eaton 9395</h3>
      ${ph.map((v, i) => `<div class="meter"><span class="n">${L.card.load} L${i + 1}</span><span class="val">${fmt(v)} kW</span></div>`).join('')}
      <div class="meter"><span class="n">${L.card.vin}</span><span class="val">${fmt(telemetry.upsVin(t, 0))} V</span></div>
      <div class="meter"><span class="n">${L.card.vout}</span><span class="val">${fmt(telemetry.upsVout(t, 0))} V</span></div>
      <div class="meter"><span class="n">${L.card.bat}</span><span class="val">${fmt(telemetry.battery(t))} V</span><span class="sub">4 × 9395-BAT10-500 · ${L.card.autonomy} 10 min</span></div>
      <div class="meter"><span class="n">${L.kinds.genset}</span><span class="val ok">${L.card.standby}</span><span class="sub">Cummins C1000D5 · 833 kW · ${L.card.fuel} 4000 l</span></div>`;
  } else if (tab === 'cooling') {
    body.innerHTML = `<h3>${O.cool}</h3><ol class="chain">${O.coolSteps.map((s) => `<li>${s}</li>`).join('')}</ol><h3>AC 1–16</h3>` +
      Array.from({ length: 16 }, (_, i) => i + 1).map((n) => { const v = telemetry.inlet(t, n), f = telemetry.fan(t, n); const cls = f > 95 ? 'warn' : 'ok'; return `<div class="meter" data-ac="${n}" style="cursor:pointer"><span class="n">${n <= 14 ? 'K' + n : 'Кэ' + (n - 14)} <span class="mono" style="color:var(--ink-3)">AC ${n}</span></span><span class="val">${fmt(v)} °C · <span class="${cls}">${fmt(f, 0)} %</span></span></div>`; }).join('') + `<p class="note">${L.about.layout}</p>`;
    body.querySelectorAll('[data-ac]').forEach((el) => (el.onclick = () => { const n = +el.dataset.ac; const id = n <= 14 ? 'K' + n : 'KE' + (n - 14); if (!cut) flyTo('cutaway'); setTimeout(() => { select(id); flyToPoint(bld.items.get(id).pos, 6); }, cut ? 0 : 900); }));
  } else if (tab === 'events') {
    const list = (evFilter === 'active' ? activeAt(t) : EV.filter((e) => e.t0 <= t)).sort((a, b) => b.t0 - a.t0);
    body.innerHTML = `<div class="seg"><button data-f="active" aria-pressed="${evFilter === 'active'}">${L.events.active}</button><button data-f="all" aria-pressed="${evFilter === 'all'}">${L.events.all}</button></div>` +
      (list.length ? list.map((e) => { const open = e.t1 == null || e.t1 > t; return `<div class="ev ${open ? '' : 'done'}" data-i="${e.i}"><span class="sv ${e.sev}"></span><div><div class="t"><span>${e.start}</span><span>${e.host}</span><span class="${open ? 'crit' : 'ok'}">${open ? L.events.open : L.events.resolved}</span></div><div class="p">${e.problem}</div></div></div>`; }).join('') : `<p class="note">${L.events.none}</p>`) + `<p class="note">${L.events.src}</p>`;
    body.querySelectorAll('.seg button').forEach((b) => (b.onclick = () => { evFilter = b.dataset.f; renderTab(); }));
    body.querySelectorAll('.ev').forEach((el) => (el.onclick = () => { const e = EV[+el.dataset.i]; const id = e.target; if (!id) return; if (!cut) flyTo('cutaway'); setTimeout(() => { select(id); flyToPoint(bld.items.get(id).pos, 6); }, cut ? 0 : 900); }));
  } else if (tab === 'about') {
    const A = L.about;
    body.innerHTML = `<p class="prose">${A.what}</p><p class="prose">${A.maturity}</p><h3>Sources</h3><dl class="facts">${A.sources.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl><p class="note">${A.layout}</p>`;
  }
}
const ACTIVE_RACKS = bld.racks.filter((r) => r.kind === 'eda' && telemetry.rackActive(r.ci)).length;
function renderKpis() {
  const t = simT, K = L.kpi, K2 = L.kpi2;
  const fac = telemetry.facility(t), it = fac.it, pct = it / FACTS.ups.kw * 100;
  let inl = 0, rh = 0; for (let n = 1; n <= 14; n++) { inl += telemetry.inlet(t, n); rh += telemetry.humidity(t, n); }
  inl /= 14; rh /= 14;
  const out = telemetry.outside(t), act = activeAt(t).length;
  const days = Math.floor((t - T0) / 86400e3);
  $('#kpis').innerHTML = [
    [K.it, `${fmt(it, 0)}<small>kW</small>`, `${fmt(pct, 0)} % ${K.ups}`, pct],
    [K2.pue, `${fmt(fac.pue, 2)}`, K2.pueS, (2 - fac.pue) * 100],
    [K2.inside, `${fmt(inl)}<small>°C</small>`, `${fmt(rh, 0)} % RH · ASHRAE 18–27`, (inl - 15) / 17 * 100],
    [K2.outside, `${fmt(out)}<small>°C</small>`, 'Alatau, 780 m', null],
    [K2.uptime, `100<small>%</small>`, `${days + 1} d · ${K2.uptimeS}`, 100],
    [K2.racks, `${ACTIVE_RACKS + 9}<small>· ${75 - ACTIVE_RACKS}</small>`, K2.racksS, (ACTIVE_RACKS + 9) / 84 * 100],
    [K.alarms, `<span class="${act ? 'crit' : 'ok'}">${act}</span>`, 'Zabbix · SNMP', null],
  ].map(([k, v, s, bar]) => `<div class="kpi"><div class="k">${k}</div><div class="v">${v}</div><div class="s">${s}</div>${bar != null ? `<div class="bar"><i style="width:${Math.max(2, Math.min(100, bar))}%"></i></div>` : ''}</div>`).join('') + `<button class="kpi-min" id="kpiMin" aria-label="Collapse">${mins.kpis ? '+' : '–'}</button>`;
  $('#kpiMin').onclick = () => { mins.kpis = !mins.kpis; store.set('mins', mins); applyMins(); };
  const d = new Date(t + 5 * 3600e3);
  $('#clock').textContent = `${d.getUTCDate().toString().padStart(2, '0')}.${(d.getUTCMonth() + 1).toString().padStart(2, '0')}.${d.getUTCFullYear()} ${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')}`;
}
const ICON_PAUSE = '<svg viewBox="0 0 16 16" width="12" height="12"><rect x="3" y="2" width="3.5" height="12" fill="currentColor"/><rect x="9.5" y="2" width="3.5" height="12" fill="currentColor"/></svg>';
const ICON_PLAY = '<svg viewBox="0 0 16 16" width="12" height="12"><path d="M4 2 L14 8 L4 14 Z" fill="currentColor"/></svg>';
$('#play').innerHTML = ICON_PAUSE;
$('#play').onclick = () => { playing = !playing; $('#play').innerHTML = playing ? ICON_PAUSE : ICON_PLAY; };
$('#sun').value = store.get('sun2', 13.5);
$('#sun').oninput = (e) => { setSun(+e.target.value); store.set('sun2', +e.target.value); };

// ---------- labels ----------
const labelEls = new Map();
function buildLabels() {
  const host = $('#labels');
  bld.labels.forEach((lb) => {
    const el = document.createElement('div'); el.className = 'lb ' + (lb.cls || '');
    if (lb.room) el.innerHTML = lb.room.key === 'hall' ? `${L.rooms.hall} · 221.7 m²` : `<b>${lb.room.n}</b>${L.rooms[lb.room.key]} · ${String(lb.room.area).replace('.', lang === 'en' ? '.' : ',')} m²`;
    else if (lb.item) { const it = bld.items.get(lb.item); el.textContent = it.kind === 'chiller' ? it.id : it.kind === 'fiber' ? L.fiber[it.line] : it.kind === 'grid' ? L.grid : L.kinds[it.kind]; }
    else el.textContent = typeof lb.text === 'function' ? lb.text() : lb.text;
    host.appendChild(el); labelEls.set(lb, el);
  });
}
const pv = new THREE.Vector3();
function updateLabels() {
  const showRooms = cut && layerState.labels && layerState.interior && view !== 'walk';
  const showRows = layerState.labels && layerState.racks && (cut || walk.on);
  const showEquip = layerState.labels && !walk.on && (view === 'site' || view === 'cutaway');
  labelEls.forEach((el, lb) => {
    let show = lb.room ? showRooms && (view === 'plan' || view === 'cutaway' || view === 'hall' ? (lb.room.area > 9 || view === 'plan') : false) : lb.item ? showEquip && (lb.group === 'network' ? layerState.network : lb.group === 'power' ? layerState.power : true) : showRows;
    if (show) {
      pv.copy(lb.pos).project(camera);
      const dist = camera.position.distanceTo(lb.pos);
      if (pv.z > 1 || dist > (lb.item ? 160 : 70)) show = false;
      else { el.style.left = ((pv.x + 1) / 2 * innerWidth) + 'px'; el.style.top = ((1 - pv.y) / 2 * innerHeight) + 'px'; }
    }
    el.hidden = !show;
  });
}

// ---------- alarms, LEDs, control-room screen ----------
let alarmMap = new Map();
const ledC = new THREE.Color();
function refreshAlarmMap() {
  alarmMap = new Map();
  for (const e of activeAt(simT)) {
    if (e.target) alarmMap.set(e.target, alarmMap.get(e.target) === 'avg' ? 'avg' : e.sev);
    if (e.rack) alarmMap.set('EDA ' + e.rack, e.sev);
  }
}
function updateLeds(time) { // rack LEDs: amber blink on racks with alarms, quiet blue activity elsewhere
  let li = 0;
  bld.racks.forEach((r) => {
    const al = alarmMap.get(r.id);
    for (let k = 0; k < 6; k++) {
      if (al) ledC.set(Math.sin(time * 8 + k) > 0 ? 0xffa726 : 0x331a00);
      else ledC.set((k % 3 === 0) ? 0x3ddc84 : (Math.sin(time * 3 + li * 1.7) > 0.6 ? 0x4fc3f7 : 0x0d3b4f));
      bld.ledMesh.setColorAt(li++, ledC);
    }
  });
  bld.ledMesh.instanceColor.needsUpdate = true;
}
function drawScreen() {
  const { canvas: c, tex } = bld.screen, g = c.getContext('2d');
  g.fillStyle = '#0b141b'; g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = '#1e9be0'; g.fillRect(0, 0, c.width, 6);
  g.font = '600 26px "IBM Plex Sans", sans-serif'; g.fillStyle = '#e7eef2'; g.fillText('KT Cloud Lab · Zabbix', 24, 44);
  const vals = [['IT', fmt(telemetry.upsLoad(simT), 0) + ' kW'], ['Inlet', fmt(telemetry.inlet(simT, 3)) + ' °C'], ['RH', fmt(telemetry.humidity(simT, 3), 0) + ' %'], ['Alarms', '' + activeAt(simT).length]];
  vals.forEach(([k, v], i) => { g.fillStyle = '#6b7f8c'; g.font = '20px "IBM Plex Mono", monospace'; g.fillText(k, 24 + i * 250, 100); g.fillStyle = i === 3 && activeAt(simT).length ? '#ff6b5e' : '#e7eef2'; g.font = '600 48px "Barlow Semi Condensed", sans-serif'; g.fillText(v, 24 + i * 250, 154); });
  g.strokeStyle = '#1e9be0'; g.lineWidth = 3; g.beginPath();
  for (let i = 0; i < 200; i++) { const y = 230 - (telemetry.upsLoad(simT - (200 - i) * 600e3) - 250) * 2.2; i ? g.lineTo(24 + i * 4.9, y) : g.moveTo(24, y); }
  g.stroke(); tex.needsUpdate = true;
}
function heatSamples() {
  const s = bld.sensors.map((q, i) => ({ x: q.x, z: q.z, v: telemetry.sensor(simT, i + 1) }));
  bld.coolers.forEach((k) => s.push({ x: k.x + (-k.backDir) * 0.8, z: k.z, v: telemetry.inlet(simT, k.ac) - 1.2 }));
  return s;
}
let heatDirty = true;

// ---------- compass ----------
function updateCompass() {
  const f = new THREE.Vector3(); camera.getWorldDirection(f); f.y = 0; f.normalize();
  const a = Math.atan2(f.x, -f.z), n = Math.atan2(NORTH.x, -NORTH.z);
  $('#needle').setAttribute('transform', `rotate(${(n - a) * 180 / Math.PI})`);
}

// ---------- loop ----------
const clock = new THREE.Clock();
let acc = 0, accTab = 0, accCard = 0, accHeat = 0, accScreen = 0, accLed = 0, accLbl = 0, frames = 0, perfT = 0;
const lastFocus = new THREE.Vector3(1e9, 0, 0), lastCam = new THREE.Vector3();
let jsT = 0, jsN = 0, rT = 0;
function frame() {
  requestAnimationFrame(frame);
  const _t0 = performance.now();
  const dt = Math.min(0.05, clock.getDelta()), time = clock.elapsedTime;
  if (playing) { simT += dt * 1000 * speed; if (simT > T1) simT = T0; }
  if (tween) {
    tween.k = Math.min(1, tween.k + dt / tween.dur); const e = tween.k < 0.5 ? 4 * tween.k ** 3 : 1 - (-2 * tween.k + 2) ** 3 / 2;
    camera.position.lerpVectors(tween.p0, tween.p1, e); controls.target.lerpVectors(tween.t0, tween.t1, e);
    if (tween.k >= 1) tween = null;
  }
  if (story.active) { tween = null; story.update(dt); } else if (tour.on) tour.update(dt); else if (walk.on) stepWalk(dt); else controls.update();
  // shadows are re-rendered only when the sun or the point of interest moves
  const focus = walk.on || tour.on ? camera.position : controls.target;
  const fx = THREE.MathUtils.clamp(focus.x, -40, 40), fz = THREE.MathUtils.clamp(focus.z, -30, 30);
  if (shadowDirty) { sun.target.position.set(-1.5, 0, -1.5); sun.position.copy(su.sunPosition.value).multiplyScalar(300).add(sun.target.position); sun.target.updateMatrixWorld(); renderer.shadowMap.needsUpdate = true; shadowDirty = false; }
  layers.update(time, dt); bld.updatePeople(time); bld.updateDoors(camera.position, dt, walk.on || tour.on); checkNewAlerts();
  acc += dt; accTab += dt; accCard += dt; accHeat += dt; accScreen += dt; accLed += dt; accLbl += dt;
  if (acc > 1) { acc = 0; refreshAlarmMap(); if (!story.active) renderKpis(); }
  if (accTab > 2.5 && ['ops', 'power', 'cooling'].includes(tab) && !story.active && !$('#panel').matches(':hover')) { accTab = 0; renderTab(); }
  if (accCard > 2 && selected) { accCard = 0; renderCard(); }
  if (accLed > 0.25 && layerState.racks) { accLed = 0; updateLeds(time); }
  layers.setAlarms(layerState.alarms ? alarmMap : new Map(), time, camera);
  if (layerState.airflow && (heatDirty || accHeat > 3)) { accHeat = 0; heatDirty = false; layers.updateHeat(heatSamples()); }
  if (accScreen > 3) { accScreen = 0; drawScreen(); }
  const moved = lastCam.distanceToSquared(camera.position) > 1e-6; lastCam.copy(camera.position);
  if (!story.active && (moved || accLbl > 0.5)) { accLbl = 0; updateLabels(); updateCompass(); }
  farCam.position.copy(camera.position); farCam.quaternion.copy(camera.quaternion);
  const _t1 = performance.now();
  renderer.clear(); renderer.render(farScene, farCam); renderer.clearDepth(); renderer.render(scene, camera);
  const _t2 = performance.now(); jsT += _t1 - _t0; rT += _t2 - _t1; jsN++;
  // adaptive resolution: hold ~50+ fps
  frames++; perfT += dt;
  if (perfT > 2) {
    const fps = frames / perfT; frames = 0; perfT = 0;
    // resolution stays fixed; it steps down once, permanently, only if this machine is truly too slow
    if (fps < 28 && !dprLowered) { dprLowered = true; setDpr(Math.max(DPR_MIN, dpr - 0.2)); }
    window.__fps = fps; window.__dpr = dpr; window.__js = jsT / jsN; window.__rt = rT / jsN; jsT = rT = jsN = 0;
  }
}

// portrait phones get a wider lens so rooms and rows stay readable; landscape and desktop keep 42°
const fitLens = () => { const asp = innerWidth / innerHeight, fov = asp < 0.8 ? 62 : 42; for (const c of [camera, farCam]) { c.aspect = asp; c.fov = fov; c.updateProjectionMatrix(); } };
fitLens();
addEventListener('resize', () => { fitLens(); renderer.setSize(innerWidth, innerHeight); });

// ---------- scroll story ----------
const STAT_L = {
  en: ['above sea level', '× 18 m footprint', 'kVA, 2 × 1600 substation', 'kW of chiller cooling', 'racks in seven rows', 'diverse fibre routes', 'PUE, calculated live'],
  ru: ['над уровнем моря', '× 18 м в плане', 'кВА, ТП 2 × 1600', 'кВт холода от чиллеров', 'стойки в семи рядах', 'оптические трассы', 'PUE, расчёт онлайн'],
  kk: ['теңіз деңгейінен', '× 18 м жоспарда', 'кВА, ҚС 2 × 1600', 'кВт чиллер салқыны', 'жеті қатарда сөре', 'оптикалық трасса', 'PUE, онлайн есептеу'],
};
const story = createStory({
  camera, controls, HALL, SOUTH, NORTH, L: () => L,
  stats: [{ v: 780, u: 'm' }, { v: 44.85, d: 2, u: 'm' }, { v: 3200, u: 'kVA' }, { v: 1266, u: 'kW' }, { v: 84, u: '' }, { v: 2, u: '' }, { v: +telemetry.facility(DEFAULT_T).pue.toFixed(2), d: 2, u: '' }].map((s, i) => ({ ...s, l: () => STAT_L[lang][i] })),
  setLayers: (o) => { ['power', 'cooling', 'airflow', 'network', 'fire'].forEach((k) => (layerState[k] = !!o[k])); layerState.alarms = true; applyLayers(); syncLayerButtons(); },
  setCut: (on) => setCutaway(on),
  onExit: () => { view = 'site'; flyTo('site'); },
});

buildChrome();
applyLayers();
setSun(+$('#sun').value);
const hash = location.hash.slice(1);
const startView = hash in VIEWS ? hash : 'aerial';
flyTo(startView, true);
if (hash === 'story' || (!hash && !EMBED)) story.enter();
if (EMBED && !hash) flyTo('site');
drawScreen();
requestAnimationFrame(frame);
$('#loading').style.opacity = 0; setTimeout(() => $('#loading').remove(), 700);

// test hook for automated checks
window.__twin = { flyTo, layerState, applyLayers, story, tour, scheme, setSun, camera, select, get view() { return view; } };
window.__twin.dbg = { scene, farScene, renderer, env, bld, sun, layers };
