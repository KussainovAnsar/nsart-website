// Scroll story: pinned chapters scrub the camera along keyframes; copy, counters and layers react.
// Motion recipes after thisismagma.com: words rise from a mask (expo.out, 0.02 stagger),
// body letters brighten 0.2 → 1 with scroll, counters scrub, background numerals drift at half speed.
import * as THREE from 'three';

const gsap = window.gsap, ScrollTrigger = window.ScrollTrigger;

export function createStory(ctx) {
  const { camera, controls, L, setLayers, setCut, onExit, stats, SOUTH, NORTH, HALL } = ctx;
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const KEYS = [
    { pos: NORTH.clone().multiplyScalar(700).add(V(0, 190, 0)), tgt: SOUTH.clone().multiplyScalar(2600).add(V(0, 330, 0)), layers: {}, cut: false },
    { pos: V(-58, 16, -42), tgt: V(-6, 3, 0), layers: {}, cut: false },
    { pos: V(78, 34, -40), tgt: V(26, 0, -1), layers: { power: true }, cut: true },
    { pos: V(52, 24, 36), tgt: V(12, 0, 2), layers: { cooling: true }, cut: true },
    { pos: V(HALL.x0 - 3.5, 12.5, HALL.z1 + 8.5), tgt: V(2.5, 0.4, -2.2), layers: { airflow: true }, cut: true },
    { pos: V(-78, 52, -70), tgt: V(-12, 0, -8), layers: { network: true }, cut: false },
    { pos: V(-4, 9, 10), tgt: V(3, 1, -1), layers: { alarms: true }, cut: true },
  ];
  const N = KEYS.length;
  const root = document.getElementById('story');
  const scroller = document.getElementById('storyScroll');
  const inner = document.getElementById('storyInner');
  let lenis = null, active = false, progress = 0, chapter = -1;
  const mouse = { x: 0, y: 0, sx: 0, sy: 0 };

  function build() {
    const S = L().story;
    inner.innerHTML = S.ch.map(([h, p], i) => `
      <section class="ch" data-i="${i}">
        <div class="num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</div>
        <div class="copy">
          <div class="eyebrow mono">${String(i + 1).padStart(2, '0')} / ${String(N).padStart(2, '0')}</div>
          <h2>${h.split(' ').map((w) => `<span class="w"><span>${w}</span></span>`).join(' ')}</h2>
          <p>${[...p].map((c) => (c === ' ' ? ' ' : `<span class="c">${c}</span>`)).join('')}</p>
          <div class="stat"><span class="sv mono" data-to="${stats[i].v}" data-dec="${stats[i].d || 0}">0</span><span class="su">${stats[i].u}</span><span class="sl">${stats[i].l()}</span></div>
          ${i === N - 1 ? `<button class="go" id="storyGo"><span>${L().views.site} →</span></button>` : ''}
        </div>
      </section>`).join('') + '<div class="tail"></div>';
    document.getElementById('storyRail').innerHTML = S.ch.map((c, i) => `<button data-i="${i}" aria-label="${c[0]}"><i></i></button>`).join('');
    document.getElementById('storyRail').querySelectorAll('button').forEach((b) => (b.onclick = () => scrollToChapter(+b.dataset.i)));
    document.getElementById('storyClose').textContent = S.close;
    document.getElementById('storyHint').textContent = S.scroll;
    const go = document.getElementById('storyGo'); if (go) go.onclick = () => exit();
  }

  function scrollToChapter(i) {
    const sec = inner.querySelectorAll('.ch')[i];
    const y = sec.offsetTop + sec.offsetHeight * 0.35;
    if (lenis) lenis.scrollTo(y, { duration: 1.6 }); else scroller.scrollTo({ top: y, behavior: 'smooth' });
  }

  function wire() {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    const secs = [...inner.querySelectorAll('.ch')];
    // camera progress: chapter i is "on" while its copy crosses the middle of the screen
    ScrollTrigger.create({ scroller, trigger: inner, start: 'top top', end: () => `+=${secs[N - 1].offsetTop + secs[N - 1].offsetHeight * 0.35}`, scrub: 1,
      onUpdate: (st) => { progress = st.progress * (N - 1); } });
    secs.forEach((sec, i) => {
      const words = sec.querySelectorAll('h2 .w > span'), chars = sec.querySelectorAll('p .c'), sv = sec.querySelector('.sv'), num = sec.querySelector('.num'), stat = sec.querySelector('.stat');
      gsap.set(words, { yPercent: 115, rotate: 6 });
      ScrollTrigger.create({ scroller, trigger: sec, start: 'top 70%', once: false,
        onEnter: () => gsap.to(words, { yPercent: 0, rotate: 0, duration: 1.4, ease: 'expo.out', stagger: 0.035, overwrite: true }),
        onEnterBack: () => gsap.to(words, { yPercent: 0, rotate: 0, duration: 1.2, ease: 'expo.out', stagger: 0.02, overwrite: true }),
        onLeaveBack: () => gsap.to(words, { yPercent: 115, rotate: 6, duration: 0.5, ease: 'power2.in', overwrite: true }) });
      gsap.fromTo(chars, { opacity: 0.18 }, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { scroller, trigger: sec, start: 'top 80%', end: 'top 25%', scrub: 1 } });
      const to = +sv.dataset.to, dec = +sv.dataset.dec, o = { v: 0 };
      gsap.to(o, { v: to, ease: 'none', scrollTrigger: { scroller, trigger: sec, start: 'top 75%', end: 'top 20%', scrub: 1 }, onUpdate: () => (sv.textContent = o.v.toLocaleString(L().code === 'EN' ? 'en-GB' : 'ru-RU', { minimumFractionDigits: dec, maximumFractionDigits: dec })) });
      // parallax: numerals drift at half speed, the stat chip a little faster than the copy
      gsap.fromTo(num, { yPercent: 40 }, { yPercent: -60, ease: 'none', scrollTrigger: { scroller, trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.fromTo(stat, { y: 60 }, { y: -40, ease: 'none', scrollTrigger: { scroller, trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true } });
      // the copy fades out before the next chapter arrives, so two chapters never overlap
      gsap.fromTo(sec.querySelector('.copy'), { opacity: 1 }, { opacity: 0, ease: 'none', immediateRender: false, scrollTrigger: { scroller, trigger: sec, start: 'bottom 85%', end: 'bottom 45%', scrub: true } });
    });
    ScrollTrigger.refresh();
  }

  const tmpP = new THREE.Vector3(), tmpT = new THREE.Vector3(), side = new THREE.Vector3();
  const ease = (u) => u * u * (3 - 2 * u);
  function update(dt) {
    if (!active) return;
    const forced = new URLSearchParams(location.search).get('p');
    const p = Math.max(0, Math.min(N - 1 - 1e-6, forced != null ? +forced : progress)), i = Math.floor(p), u = ease(p - i);
    const a = KEYS[i], b = KEYS[i + 1];
    tmpP.lerpVectors(a.pos, b.pos, u); tmpT.lerpVectors(a.tgt, b.tgt, u);
    // arc between keyframes keeps the camera above the yard while it travels
    const lift = Math.sin(u * Math.PI) * Math.min(40, a.pos.distanceTo(b.pos) * 0.12); tmpP.y += lift;
    // pointer parallax: a small sideways and vertical drift (disabled on touch)
    mouse.sx += (mouse.x - mouse.sx) * Math.min(1, dt * 2.5); mouse.sy += (mouse.y - mouse.sy) * Math.min(1, dt * 2.5);
    const d = tmpP.distanceTo(tmpT);
    side.subVectors(tmpT, tmpP).cross(camera.up).normalize();
    tmpP.addScaledVector(side, mouse.sx * d * 0.035).add(V(0, -mouse.sy * d * 0.02, 0));
    camera.position.copy(tmpP); controls.target.copy(tmpT); camera.lookAt(tmpT);
    const ch = Math.round(p);
    if (ch !== chapter) {
      chapter = ch; setLayers(KEYS[ch].layers); setCut(KEYS[ch].cut);
      document.getElementById('storyRail').querySelectorAll('button').forEach((bt, k) => bt.classList.toggle('on', k === ch));
    }
    document.getElementById('storyBar').style.transform = `scaleX(${p / (N - 1)})`;
  }

  function enter() {
    active = true; chapter = -1; progress = 0;
    document.body.classList.add('in-story'); root.hidden = false;
    build(); scroller.scrollTop = 0;
    if (window.Lenis && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      lenis = new window.Lenis({ wrapper: scroller, content: inner, lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
    }
    wire();
    const hero = document.getElementById('stage');
    gsap.fromTo(hero, { scale: 1.1 }, { scale: 1, duration: 3, ease: 'expo.out' });
    gsap.fromTo('#storyFx .title', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.3, ease: 'expo.out', delay: 0.2 });
  }
  function exit() {
    active = false; document.body.classList.remove('in-story'); root.hidden = true;
    if (lenis) { lenis.destroy(); lenis = null; }
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.set('#stage', { clearProps: 'transform' });
    onExit();
  }
  if (gsap) {
    gsap.ticker.add((t) => lenis && lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
  }
  addEventListener('pointermove', (e) => { if (!active || e.pointerType !== 'mouse') return; mouse.x = e.clientX / innerWidth * 2 - 1; mouse.y = e.clientY / innerHeight * 2 - 1; });
  document.getElementById('storyClose').onclick = () => exit();
  addEventListener('keydown', (e) => { if (active && e.key === 'Escape') exit(); });

  return { enter, exit, update, get active() { return active; }, rebuild() { if (active) { build(); wire(); } } };
}
