// scenes/kit.js — shared look for the D. B. Cooper film. Every chapter draws through these helpers
// so palette, type, stamps, maps and planes stay identical across the 3 minutes. See docs/ANIMATION_GUIDE.md.
import { spring, track, clamp, remap, lerp, rng, hash, noise, text, typeIn, measure, rrect, strokeProgress, mixColor } from '../lib/motion.js';
export { spring, track, clamp, remap, lerp, rng, hash, noise, text, typeIn, measure, rrect, strokeProgress, mixColor };

export let g, L, u, W, H, TX, MAXW;
export function init(ctx, layout) {
  g = ctx; L = layout; u = L.u; W = L.W; H = L.H;
  // TikTok: right rail of buttons and bottom caption cover the frame; text lives slightly left of centre.
  TX = L.portrait ? L.cx - 24 * u : L.cx;
  MAXW = L.portrait ? 860 * u : Math.min(1400 * u, L.safe.w);
  makeTextures();
}

// ---------------------------------------------------------------- palette & type
export const C = {
  paper: '#EFE6D2', paper2: '#E2D5B8', paper3: '#CDBD9A', ink: '#16130F', inkSoft: '#4A4236',
  red: '#C8321E', night: '#0A101C', night2: '#121C2E', night3: '#1E2B44', cream: '#EFE6D2', fog: '#8C97AD',
};
export const SERIF = '"Instrument Serif", "Noto Sans Thai", serif';
export const THAI = '"Noto Sans Thai", Inter, sans-serif';
export const BAR = 2.5, BEAT = 0.625;            // 96 BPM
export const bar = (n) => n * BAR;

// ---------------------------------------------------------------- textures (built once from a fixed seed)
let grain, vign;
function makeTextures() {
  grain = new OffscreenCanvas(W, H);
  const x = grain.getContext('2d'), img = x.createImageData(W, H), r = rng(1971);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = r() * 255; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 22;
  }
  x.putImageData(img, 0, 0);
  vign = new OffscreenCanvas(W, H);
  const y = vign.getContext('2d'), gr = y.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.35, W / 2, H / 2, Math.hypot(W, H) * 0.6);
  gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,0.42)');
  y.fillStyle = gr; y.fillRect(0, 0, W, H);
}
export function finish(strength = 1) {
  g.save(); g.globalAlpha = strength; g.drawImage(vign, 0, 0); g.globalCompositeOperation = 'overlay'; g.drawImage(grain, 0, 0); g.restore();
}

export function paper() { g.fillStyle = C.paper; g.fillRect(0, 0, W, H); }
export function night(c = C.night) { g.fillStyle = c; g.fillRect(0, 0, W, H); }

// Rain: streaks whose positions are a pure function of t. angle in radians from vertical.
export function rain(t, { n = 140, alpha = 0.35, color = C.fog, angle = 0.18, speed = 2600, len = 70, seed = 3 } = {}) {
  g.save(); g.strokeStyle = color; g.lineCap = 'round';
  const dx = Math.sin(angle), dy = Math.cos(angle);
  for (let i = 0; i < n; i++) {
    const z = 0.4 + hash(i, seed) * 0.6;                        // depth
    const span = H + 400 * u;
    const y = ((hash(i, seed + 1) * span + t * speed * u * z) % span) - 200 * u;
    const x = hash(i, seed + 2) * (W + 400 * u) - 200 * u + y * dx / dy;
    g.globalAlpha = alpha * z; g.lineWidth = 2.2 * u * z;
    g.beginPath(); g.moveTo(x, y); g.lineTo(x - dx * len * u * z, y - dy * len * u * z); g.stroke();
  }
  g.restore();
}

// Clouds: soft blobs scrolling vertically by `scroll` px; deterministic per seed.
export function clouds(scroll, { n = 9, color = C.night3, alpha = 0.85, seed = 11, scale = 1 } = {}) {
  g.save(); g.fillStyle = color;
  for (let i = 0; i < n; i++) {
    const span = H + 900 * u;
    const y = ((hash(i, seed) * span - scroll) % span + span) % span - 450 * u;
    const x = hash(i, seed + 1) * W;
    const r = (160 + hash(i, seed + 2) * 220) * u * scale;
    g.globalAlpha = alpha * (0.5 + hash(i, seed + 3) * 0.5);
    g.beginPath();
    for (let k = 0; k < 6; k++) g.arc(x + (k - 2.5) * r * 0.42, y + Math.sin(k * 1.9 + i) * r * 0.16, r * (0.45 + 0.25 * Math.sin(k * 2.3 + i)), 0, Math.PI * 2);
    g.fill();
  }
  g.restore();
}

// Camera shake that decays after an impact at local time t0.
export function shake(t, t0, amp = 18) {
  const k = t - t0; if (k < 0 || k > 0.6) return [0, 0];
  const a = amp * u * Math.exp(-k * 9);
  return [noise(k * 40, 5) * a, noise(k * 40, 9) * a];
}

// ---------------------------------------------------------------- Thai type
const wseg = new Intl.Segmenter('th', { granularity: 'word' });
export function wrap(str, maxW, size, weight = 700, family = THAI) {
  const words = [...wseg.segment(str)].map((s) => s.segment);
  const lines = []; let cur = '';
  for (const w of words) {
    const test = cur + w;
    if (cur && measure(g, test.trim(), { size, weight, family }) > maxW) { lines.push(cur.trim()); cur = w.trimStart(); }
    else cur = test;
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}
// Kinetic multi-line text: each line rises from its mask on a spring, word by word.
// Returns the y just below the block so callers can stack.
export function say(str, x, y, t, o = {}) {
  const { size = 64 * u, weight = 700, family = THAI, color = C.ink, maxW = MAXW, align = 'center', lh = 1.42,
    stagger = 0.045, out = Infinity, alpha = 1, preset = 'default', lineGap = 0.12 } = o;
  const lines = str.split('\n').flatMap((p) => wrap(p, maxW, size, weight, family));
  if (lines.length > str.split('\n').length) (globalThis.__wraps ||= new Set()).add(str);
  lines.forEach((ln, i) => typeIn(g, ln, x, y + i * size * lh, t - i * lineGap,
    { size, weight, family, color, align, by: 'word', stagger, preset, alpha, out: out - i * 0.04 }));
  return y + lines.length * size * lh;
}
// Static (no animation) Thai/Latin text, wrapped.
export function para(str, x, y, o = {}) {
  const { size = 48 * u, weight = 500, family = THAI, color = C.ink, maxW = MAXW, align = 'center', lh = 1.45, alpha = 1 } = o;
  const lines = str.split('\n').flatMap((p) => wrap(p, maxW, size, weight, family));
  lines.forEach((ln, i) => text(g, ln, x, y + i * size * lh, { size, weight, family, color, align, alpha }));
  return y + lines.length * size * lh;
}
// Typewriter: graphemes appear at cps chars/second (Latin/Thai safe), with a caret.
const gseg = new Intl.Segmenter('th', { granularity: 'grapheme' });
export function typewriter(str, x, y, t, o = {}) {
  const { size = 44 * u, weight = 500, family = THAI, color = C.ink, cps = 22, align = 'left', caret = true } = o;
  const gs = [...gseg.segment(str)].map((s) => s.segment);
  const n = clamp(Math.floor(t * cps), 0, gs.length);
  const shown = gs.slice(0, n).join('');
  g.save(); g.font = `${weight} ${size}px ${family}`; g.fillStyle = color; g.textAlign = align; g.textBaseline = 'alphabetic';
  const full = g.measureText(str).width;
  const x0 = align === 'center' ? x - full / 2 : x;
  g.textAlign = 'left'; g.fillText(shown, x0, y);
  if (caret && t > 0 && n < gs.length) { const w = g.measureText(shown).width; g.fillRect(x0 + w + 3 * u, y - size * 0.8, 3 * u, size * 0.95); }
  g.restore();
  return n; // graphemes shown (for sfx planning)
}

// Big display number/word in serif, scaling up from a mask on a heavy spring.
export function big(str, x, y, t, o = {}) {
  const { size = 220 * u, color = C.ink, align = 'center', out = Infinity } = o;
  typeIn(g, str, x, y, t, { size, weight: 400, family: SERIF, color, align, stagger: 0.05, preset: 'heavy', out });
}

// Small label above content: thin rule + caps.
export function kicker(str, x, y, t, o = {}) {
  const { color = C.red, size = 40 * u, align = 'center' } = o;
  const s = spring(t, 'snappy');
  const w = measure(g, str, { size, weight: 700, family: THAI });
  g.save(); g.globalAlpha = clamp(t / 0.15);
  g.fillStyle = color;
  const x0 = align === 'center' ? x - w / 2 : x;
  g.fillRect(x0, y + 14 * u, w * s, 3 * u);
  text(g, str, x0 + w / 2, y, { size, weight: 700, family: THAI, color });
  g.restore();
}

// ---------------------------------------------------------------- stamp
export function stamp(str, x, y, t, o = {}) {
  if (t < 0) return;
  const { size = 120 * u, color = C.red, rot = -0.14, family = SERIF, weight = 400, seed = 7, pad = 0.32 } = o;
  const s = spring(t, 'snappy');
  const sc = 1 + (1 - s) * 1.6;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(sc, sc);
  g.globalAlpha = clamp(t / 0.05) * 0.92;
  const w = measure(g, str, { size, weight, family, tracking: 6 * u }) + size * pad * 2, h = size * 1.25;
  g.strokeStyle = color; g.lineWidth = size * 0.07;
  rrect(g, -w / 2, -h / 2, w, h, size * 0.12); g.stroke();
  rrect(g, -w / 2 + size * 0.11, -h / 2 + size * 0.11, w - size * 0.22, h - size * 0.22, size * 0.07); g.lineWidth = size * 0.025; g.stroke();
  text(g, str, 0, size * 0.36, { size, weight, family, color, tracking: 6 * u });
  // ink wear: knock tiny holes out of the stamp
  g.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 70; i++) {
    g.globalAlpha = 0.5 + hash(i, seed) * 0.5;
    g.beginPath(); g.arc((hash(i, seed + 1) - 0.5) * w, (hash(i, seed + 2) - 0.5) * h, (1 + hash(i, seed + 3) * 4) * u, 0, 7); g.fill();
  }
  g.restore();
}

// ---------------------------------------------------------------- split-flap card
// values[i] shows from times[i]; each change flips over 0.22 s.
export function flip(x, y, w, h, values, times, t, o = {}) {
  const { size = h * 0.72, family = SERIF, weight = 400, bg = C.ink, fg = C.paper, r = 10 * u } = o;
  let i = 0; for (let k = 0; k < times.length; k++) if (t >= times[k]) i = k;
  const p = i > 0 ? clamp((t - times[i]) / 0.22) : 1;
  const cur = values[i], prev = values[Math.max(0, i - 1)];
  const half = (val, top, sy = 1) => {
    g.save(); g.beginPath(); g.rect(x - w / 2, top ? y - h / 2 : y, w, h / 2); g.clip();
    g.translate(0, y); g.scale(1, sy); g.translate(0, -y);
    rrect(g, x - w / 2, y - h / 2, w, h, r); g.fillStyle = bg; g.fill();
    text(g, val, x, y + size * 0.35, { size, family, weight, color: fg });
    g.restore();
  };
  half(cur, true); half(p < 1 ? prev : cur, false);
  if (p < 0.5) half(prev, true, 1 - p * 2);
  else if (p < 1) half(cur, false, (p - 0.5) * 2);
  g.fillStyle = 'rgba(0,0,0,0.5)'; g.fillRect(x - w / 2, y - 1.5 * u, w, 3 * u);
}

// ---------------------------------------------------------------- planes
// Boeing 727 seen from above, nose pointing to -y. 1 unit = s px.
export function planeTop(x, y, s, rot, color = C.cream, type = '777') {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); g.fillStyle = color;
  g.beginPath();
  g.moveTo(0, -1); g.quadraticCurveTo(0.085, -0.95, 0.085, -0.78); g.lineTo(0.085, 0.86); g.quadraticCurveTo(0.05, 1.0, 0, 1.02);
  g.quadraticCurveTo(-0.05, 1.0, -0.085, 0.86); g.lineTo(-0.085, -0.78); g.quadraticCurveTo(-0.085, -0.95, 0, -1); g.fill();
  for (const sx of [1, -1]) {
    g.beginPath(); g.moveTo(sx * 0.08, -0.16); g.lineTo(sx * 0.82, 0.24); g.lineTo(sx * 0.82, 0.32); g.lineTo(sx * 0.08, 0.13); g.fill();
    g.beginPath(); g.moveTo(sx * 0.04, 0.72); g.lineTo(sx * 0.34, 0.92); g.lineTo(sx * 0.34, 0.98); g.lineTo(sx * 0.04, 0.9); g.fill();
    if (type === '777') { rrect(g, sx * 0.33 - 0.05, -0.08, 0.1, 0.24, 0.05); g.fill(); }
    else { rrect(g, sx * 0.13 - 0.045, 0.58, 0.09, 0.22, 0.04); g.fill(); }
  }
  g.restore();
}
// Boeing 727 side view, nose to the left. stair 0..1 = aft airstair lowered. 1 unit = s px.
export function planeSide(x, y, s, o = {}) {
  const { color = C.cream, stair = 0, windows = null, rot = 0 } = o;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); g.fillStyle = color;
  g.beginPath();
  g.moveTo(-1, 0.02); g.quadraticCurveTo(-0.99, -0.07, -0.86, -0.085); g.lineTo(0.62, -0.085);
  g.lineTo(1.0, -0.06); g.lineTo(1.04, -0.02); g.lineTo(0.96, 0.03); g.lineTo(0.7, 0.075);
  g.lineTo(-0.86, 0.075); g.quadraticCurveTo(-0.99, 0.07, -1, 0.02); g.fill();
  g.beginPath(); g.moveTo(0.66, -0.08); g.lineTo(0.88, -0.48); g.lineTo(1.0, -0.48); g.lineTo(1.0, -0.06); g.fill();   // fin
  g.beginPath(); g.moveTo(0.82, -0.5); g.lineTo(1.12, -0.5); g.lineTo(1.1, -0.465); g.lineTo(0.84, -0.465); g.fill();  // T-tail
  rrect(g, 0.6, -0.15, 0.24, 0.08, 0.04); g.fill();                                                                    // engine
  g.beginPath(); g.moveTo(-0.12, 0.05); g.lineTo(0.3, 0.1); g.lineTo(0.34, 0.12); g.lineTo(-0.08, 0.09); g.fill();      // wing
  // aft airstair hinged under the tail
  g.save(); g.translate(0.86, 0.06); g.rotate(stair * 0.95);
  g.fillRect(-0.32, -0.012, 0.32, 0.024);
  g.restore();
  if (windows) { g.fillStyle = windows; for (let i = 0; i < 26; i++) { g.beginPath(); g.arc(-0.78 + i * 0.054, -0.03, 0.011, 0, 7); g.fill(); } }
  g.restore();
}

// ---------------------------------------------------------------- map (geography comes from scenes/geo.js)
// Camera: {lat, lon, z} where z = px per degree of latitude. lands: [[lat, lon], ...] polygons.
export function proj(cam) {
  const k = Math.cos(cam.lat * Math.PI / 180);
  return ([lat, lon]) => [L.cx + (lon - cam.lon) * k * cam.z, L.cy - (lat - cam.lat) * cam.z];
}
export function map(cam, o = {}) {
  const { lands = [], land = C.night3, water = C.night, line = C.fog, lw = 2.5, grid = 5 } = o;
  const P = proj(cam);
  g.fillStyle = water; g.fillRect(0, 0, W, H);
  // graticule, faint
  g.save(); g.strokeStyle = line; g.globalAlpha = 0.12; g.lineWidth = 1 * u;
  for (let la = -60; la <= 60; la += grid) { const y = P([la, cam.lon])[1]; g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
  for (let lo = 0; lo <= 180; lo += grid) { const x = P([cam.lat, lo])[0]; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
  g.restore();
  for (const poly of lands) {
    g.beginPath(); poly.forEach((p, i) => { const [x, y] = P(p); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.closePath();
    g.fillStyle = land; g.fill(); g.strokeStyle = line; g.lineWidth = lw * u; g.globalAlpha = 0.55; g.stroke(); g.globalAlpha = 1;
  }
  return P;
}
// Great-circle destination from (lat, lon) at distance d (radians) and bearing b (radians).
export function dest([lat, lon], d, b) {
  const r = Math.PI / 180, p1 = lat * r, l1 = lon * r;
  const p2 = Math.asin(Math.sin(p1) * Math.cos(d) + Math.cos(p1) * Math.sin(d) * Math.cos(b));
  const l2 = l1 + Math.atan2(Math.sin(b) * Math.sin(d) * Math.cos(p1), Math.cos(d) - Math.sin(p1) * Math.sin(p2));
  return [p2 / r, l2 / r];
}
export function gcDist([a, b], [c, d]) {
  const r = Math.PI / 180;
  return Math.acos(Math.min(1, Math.sin(a * r) * Math.sin(c * r) + Math.cos(a * r) * Math.cos(c * r) * Math.cos((d - b) * r)));
}
export function pin(x, y, t, o = {}) {
  const { color = C.red, label = '', labelColor = C.cream, size = 34 * u, side = 1 } = o;
  if (t < 0) return;
  const s = spring(t, 'playful'), drop = (1 - spring(t, 'snappy')) * -140 * u;
  g.save(); g.translate(x, y + drop);
  g.globalAlpha = 0.35 * s; g.fillStyle = '#000'; g.beginPath(); g.ellipse(0, -drop + 4 * u, size * 0.5 * s, size * 0.18 * s, 0, 0, 7); g.fill();
  g.globalAlpha = 1; g.fillStyle = color;
  g.beginPath(); g.arc(0, -size * 1.2, size * 0.55 * s, 0, 7); g.fill();
  g.beginPath(); g.moveTo(-size * 0.42 * s, -size * 1.05); g.lineTo(0, 0); g.lineTo(size * 0.42 * s, -size * 1.05); g.fill();
  g.fillStyle = C.night; g.beginPath(); g.arc(0, -size * 1.2, size * 0.2 * s, 0, 7); g.fill();
  g.restore();
  if (label) text(g, label, x + side * size * 0.9, y - size * 0.95, { size: 34 * u, weight: 700, family: THAI, color: labelColor, align: side > 0 ? 'left' : 'right', alpha: clamp((t - 0.15) / 0.2) });
}
// Animated path along points [[x,y]...] drawn to progress p; returns the head position and heading.
export function path(pts, p, o = {}) {
  const { color = C.red, width = 5 * u, dash = null } = o;
  const draw = width > 0;
  const seg = []; let len = 0;
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); len += d; }
  let target = len * clamp(p), acc = 0, hx = pts[0][0], hy = pts[0][1], ang = 0;
  g.save(); g.strokeStyle = color; g.lineWidth = width; g.lineCap = 'round'; g.lineJoin = 'round'; if (dash) g.setLineDash(dash);
  g.beginPath(); g.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) {
    const [ax, ay] = pts[i - 1], [bx, by] = pts[i];
    ang = Math.atan2(by - ay, bx - ax);
    if (acc + seg[i - 1] >= target) { const f = (target - acc) / (seg[i - 1] || 1); hx = ax + (bx - ax) * f; hy = ay + (by - ay) * f; g.lineTo(hx, hy); break; }
    acc += seg[i - 1]; g.lineTo(bx, by); hx = bx; hy = by;
  }
  if (draw) g.stroke(); g.restore();
  return { x: hx, y: hy, ang };
}

// ---------------------------------------------------------------- props
export function banknote(x, y, w, rot = 0, o = {}) {
  const { serial = '', worn = 0, seed = 1, fill = '#D9D2B4', ink = '#3E4A3A' } = o;
  const h = w * 0.43;
  g.save(); g.translate(x, y); g.rotate(rot);
  g.beginPath();
  if (worn > 0) {          // torn, decayed edge
    const n = 28;
    for (let i = 0; i <= n; i++) { const a = i / n; const px = -w / 2 + a * w, py = -h / 2 + hash(i, seed) * h * 0.12 * worn; i ? g.lineTo(px, py) : g.moveTo(px, py); }
    for (let i = 0; i <= n; i++) { const a = i / n; const px = w / 2 - a * w, py = h / 2 - hash(i, seed + 5) * h * 0.14 * worn; g.lineTo(px, py); }
    g.closePath();
  } else rrect(g, -w / 2, -h / 2, w, h, w * 0.02);
  g.fillStyle = fill; g.fill();
  g.strokeStyle = ink; g.lineWidth = w * 0.008; g.globalAlpha = 0.85;
  rrect(g, -w * 0.45, -h * 0.4, w * 0.9, h * 0.8, w * 0.02); g.stroke();
  g.beginPath(); g.ellipse(0, 0, w * 0.13, h * 0.32, 0, 0, 7); g.stroke();
  g.globalAlpha = 1;
  text(g, '20', -w * 0.36, -h * 0.15, { size: h * 0.26, weight: 400, family: SERIF, color: ink });
  text(g, '20', w * 0.36, h * 0.3, { size: h * 0.26, weight: 400, family: SERIF, color: ink });
  if (serial) text(g, serial, w * 0.24, -h * 0.2, { size: h * 0.11, weight: 700, family: 'Inter, sans-serif', color: ink });
  if (worn > 0) { g.globalAlpha = 0.25 * worn; g.fillStyle = '#5A4A2E'; for (let i = 0; i < 12; i++) { g.beginPath(); g.arc((hash(i, seed + 9) - 0.5) * w, (hash(i, seed + 10) - 0.5) * h, w * (0.03 + hash(i, seed + 11) * 0.08), 0, 7); g.fill(); } }
  g.restore();
}
// Deterministic fake serial in the style of 1969 series $20 notes.
export function serial(i) {
  const L1 = 'ABCDEFGHIJKL'[Math.floor(hash(i, 21) * 12)];
  return `${L1}${String(Math.floor(hash(i, 22) * 1e8)).padStart(8, '0')}A`;
}
// Head-and-shoulders silhouette used for people (never a real likeness).
export function person(x, y, s, color = C.ink, o = {}) {
  const { tie = null } = o;
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color;
  g.beginPath(); g.ellipse(0, -1.15, 0.36, 0.44, 0, 0, 7); g.fill();
  g.beginPath(); g.moveTo(-0.9, 0.6); g.quadraticCurveTo(-0.85, -0.5, -0.2, -0.6); g.lineTo(0.2, -0.6); g.quadraticCurveTo(0.85, -0.5, 0.9, 0.6); g.closePath(); g.fill();
  if (tie) { g.fillStyle = tie; g.beginPath(); g.moveTo(-0.07, -0.58); g.lineTo(0.07, -0.58); g.lineTo(0.1, 0.25); g.lineTo(0, 0.38); g.lineTo(-0.1, 0.25); g.fill(); }
  g.restore();
}
// Dark pine-forest horizon at baseline y.
export function forest(y, { color = '#05080F', seed = 4, h = 260 } = {}) {
  g.save(); g.fillStyle = color;
  g.fillRect(0, y, W, H - y);
  for (let i = 0; i < 46; i++) {
    const x = (i / 45) * (W + 80 * u) - 40 * u + (hash(i, seed) - 0.5) * 30 * u;
    const th = (0.5 + hash(i, seed + 1) * 0.6) * h * u, tw = th * 0.32;
    g.beginPath(); g.moveTo(x - tw, y + 2 * u); g.lineTo(x, y - th); g.lineTo(x + tw, y + 2 * u); g.fill();
  }
  g.restore();
}
// Parachute canopy + jumper silhouette. open 0..1.
export function parachute(x, y, s, open, color = C.cream, sway = 0) {
  g.save(); g.translate(x, y); g.rotate(sway); g.scale(s, s);
  const w = 0.2 + 0.8 * open, h = 0.25 + 0.3 * open;
  g.fillStyle = color; g.strokeStyle = color; g.lineWidth = 0.008;
  g.beginPath(); g.ellipse(0, -0.6, w, h, 0, Math.PI, 0);
  for (let i = 3; i >= 0; i--) { const px = -w + (i / 4) * 2 * w; g.quadraticCurveTo(px + w / 4, -0.6 + 0.07 * open, px, -0.6); }
  g.fill();
  for (let i = 0; i <= 6; i++) { g.beginPath(); g.moveTo(-w + (i / 6) * 2 * w, -0.6); g.lineTo(0, 0.25); g.stroke(); }
  g.beginPath(); g.arc(0, 0.27, 0.035, 0, 7); g.fill();
  g.beginPath(); g.moveTo(-0.04, 0.3); g.lineTo(0.04, 0.3); g.lineTo(0.035, 0.46); g.lineTo(-0.035, 0.46); g.fill();
  g.restore();
}

// Darkens the top of a map so headline text never fights pins or routes.
export function topScrim(h = 600, color = '10,16,28', a = 0.9) {
  const gr = g.createLinearGradient(0, 0, 0, h * u);
  gr.addColorStop(0, `rgba(${color},${a})`); gr.addColorStop(0.55, `rgba(${color},${a * 0.75})`); gr.addColorStop(1, `rgba(${color},0)`);
  g.fillStyle = gr; g.fillRect(0, 0, W, h * u);
}
