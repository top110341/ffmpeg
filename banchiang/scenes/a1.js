// Ban Chiang — Act 1: 0:00–0:45 (bars 0–18).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, map } from './kit.js';

// ---------------------------------------------------------------- warm earth palette (terracotta on cream, ochre)
Object.assign(C, { paper: '#F2E7D0', paper2: '#E6D3B0', paper3: '#D4BC93', ink: '#2A1A10', inkSoft: '#5E4634', red: '#B2432A',
  night: '#22150D', night2: '#2E1D12', night3: '#3E2718', cream: '#F2E7D0', fog: '#C9A983' });
export const E = { terra: '#A93C22', terra2: '#8A2F1A', ochre: '#C98D3A', buff: '#E8D2A6', buff2: '#D8B886',
  soil: '#9C6B43', soil2: '#7E5233', soil3: '#5E3B24', soil4: '#3E2618', bronze: '#A8743A', bronzeHi: '#F1CF86', patina: '#5F8E7B',
  leaf: '#6F7F3E', leaf2: '#4F5E2A', sky: '#F6E7C8', sky2: '#EBCB98', wood: '#6B4428', black: '#3A2E28' };

export const band = (y, h, dark = 0) => { g.fillStyle = dark ? 'rgba(34,21,13,0.86)' : 'rgba(242,231,208,0.9)'; g.fillRect(0, y, W, h); };

// ---------------------------------------------------------------- a walking figure (side view, facing +x). fall 0..1 tips it onto its face.
export function walker(x, y, s, t, o = {}) {
  const { color = C.ink, phase = 0, fall = 0, speed = 1, still = false, bag = true } = o;
  const b = still ? 0 : t * speed * Math.PI * 1.8 + phase, sw = (1 - fall);
  g.save(); g.translate(x, y); g.rotate(fall * 1.42); g.scale(s, s);
  g.strokeStyle = color; g.fillStyle = color; g.lineCap = 'round'; g.lineJoin = 'round'; g.lineWidth = 0.11;
  const bob = still ? 0 : Math.abs(Math.sin(b)) * -0.03 * sw;
  g.translate(0, bob);
  const limb = (x0, y0, a, a2, L) => { const kx = x0 + Math.sin(a) * L, ky = y0 + Math.cos(a) * L;
    g.beginPath(); g.moveTo(x0, y0); g.lineTo(kx, ky); g.lineTo(kx + Math.sin(a2) * L, ky + Math.cos(a2) * L); g.stroke(); };
  // legs: hip at -0.8; back leg kicks up while falling
  const s1 = Math.sin(b) * 0.5 * sw, s2 = -Math.sin(b) * 0.5 * sw;
  limb(0, -0.8, s1 - fall * 0.2, s1 - 0.25 * Math.max(0, -Math.sin(b)) * sw - fall * 0.1, 0.4);
  limb(0, -0.8, s2 - fall * 0.9, s2 - 0.25 * Math.max(0, Math.sin(b)) * sw - fall * 1.6, 0.4);
  // torso + head
  g.beginPath(); g.moveTo(0, -0.8); g.lineTo(0.03, -1.42); g.stroke();
  g.beginPath(); g.arc(0.06, -1.62, 0.15, 0, 7); g.fill();
  // bag on a strap
  if (bag) { g.lineWidth = 0.04; g.beginPath(); g.moveTo(0.04, -1.38); g.lineTo(-0.16, -0.98); g.stroke(); rrect(g, -0.28, -1.0, 0.22, 0.22, 0.04); g.fill(); g.lineWidth = 0.11; }
  // arms: swing while walking, thrown forward while falling
  const a1 = -Math.sin(b) * 0.55 * sw + fall * 2.2, a2 = Math.sin(b) * 0.55 * sw + fall * 1.9;
  limb(0.03, -1.32, a1, a1 + 0.3 + fall * 0.2, 0.3);
  limb(0.03, -1.32, a2, a2 + 0.3, 0.3);
  g.restore();
}

// ---------------------------------------------------------------- red kapok (ต้นงิ้ว) with a surface root crossing the path; returns the root hump x
export function kapok(x, base, s, o = {}) {
  const { flowers = true, glow = 0 } = o;
  g.save();
  // canopy: tiered horizontal branches
  for (let k = 0; k < 4; k++) { const y = base - s * (1.55 + k * 0.42), w = s * (1.25 - k * 0.22);
    g.strokeStyle = '#5A4636'; g.lineWidth = 0.05 * s; g.beginPath(); g.moveTo(x - w, y + 0.08 * s); g.quadraticCurveTo(x, y - 0.1 * s, x + w, y + 0.08 * s); g.stroke();
    for (let i = 0; i < 9; i++) { const px = x - w + (i / 8) * 2 * w, py = y - 0.02 * s + Math.sin(i * 1.7) * 0.05 * s;
      g.fillStyle = (i + k) % 3 ? E.leaf : E.leaf2; g.beginPath(); g.ellipse(px, py, 0.2 * s, 0.11 * s, 0, 0, 7); g.fill();
      if (flowers && hash(i, k + 7) > 0.6) { g.fillStyle = '#C2412B'; g.beginPath(); g.arc(px + 0.05 * s, py - 0.06 * s, 0.045 * s, 0, 7); g.fill(); } } }
  // trunk with buttresses
  g.fillStyle = '#7B6656';
  g.beginPath(); g.moveTo(x - 0.13 * s, base - 2.9 * s); g.lineTo(x + 0.13 * s, base - 2.9 * s); g.lineTo(x + 0.16 * s, base - 0.4 * s);
  g.quadraticCurveTo(x + 0.2 * s, base - 0.05 * s, x + 0.55 * s, base); g.lineTo(x - 0.55 * s, base); g.quadraticCurveTo(x - 0.2 * s, base - 0.05 * s, x - 0.16 * s, base - 0.4 * s); g.closePath(); g.fill();
  g.fillStyle = 'rgba(40,25,15,0.5)'; for (let i = 0; i < 7; i++) { g.beginPath(); g.arc(x + (hash(i, 3) - 0.5) * 0.2 * s, base - (0.6 + hash(i, 4) * 2) * s, 0.025 * s, 0, 7); g.fill(); }
  // surface root snaking across the path
  const hx = x + 1.25 * s;
  g.strokeStyle = '#5E4A3A'; g.lineWidth = 0.09 * s; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x + 0.4 * s, base); g.bezierCurveTo(x + 0.8 * s, base + 0.06 * s, hx - 0.25 * s, base - 0.16 * s, hx, base - 0.1 * s);
  g.bezierCurveTo(hx + 0.25 * s, base - 0.04 * s, hx + 0.4 * s, base + 0.08 * s, hx + 0.7 * s, base + 0.06 * s); g.stroke();
  if (glow > 0) { g.save(); g.strokeStyle = C.red; g.lineWidth = 6 * u; g.setLineDash([14 * u, 10 * u]); g.globalAlpha = clamp(glow);
    g.beginPath(); g.ellipse(hx, base - 0.08 * s, 0.42 * s * (0.8 + 0.2 * clamp(glow)), 0.22 * s, 0, 0, 7); g.stroke(); g.restore(); }
  g.restore();
  return hx;
}

// ---------------------------------------------------------------- Isan village on stilts, warm sky, dirt path (side view). ground line gy.
export function village(t, o = {}) {
  const { gy = 1250 * u, dusk = 0 } = o;
  const sk = g.createLinearGradient(0, 0, 0, gy);
  sk.addColorStop(0, dusk ? '#1C120C' : E.sky); sk.addColorStop(1, dusk ? '#3A2416' : E.sky2);
  g.fillStyle = sk; g.fillRect(0, 0, W, gy);
  if (!dusk) { g.fillStyle = 'rgba(232,170,80,0.45)'; g.beginPath(); g.arc(800 * u, gy - 560 * u, 110 * u, 0, 7); g.fill(); }
  // far tree line
  g.fillStyle = dusk ? '#140D08' : '#A9A066';
  g.beginPath(); g.moveTo(0, gy); for (let i = 0; i <= 24; i++) g.lineTo(i / 24 * W, gy - (90 + 50 * hash(i, 31)) * u); g.lineTo(W, gy); g.fill();
  // stilt houses
  [[150, 1.0], [520, 0.8], [900, 0.95]].forEach(([hx, k], i) => {
    const x = hx * u, w = 220 * u * k, fh = 120 * u * k, ph = 120 * u * k, top = gy - ph - fh;
    g.fillStyle = dusk ? '#0E0905' : E.wood; for (let p = 0; p < 4; p++) g.fillRect(x - w / 2 + p * (w - 12 * u) / 3, gy - ph, 12 * u, ph);
    g.fillStyle = dusk ? '#140D08' : '#A57B52'; g.fillRect(x - w / 2, top, w, fh);
    g.strokeStyle = dusk ? '#0E0905' : '#7E5A3A'; g.lineWidth = 3 * u; for (let p = 1; p < 6; p++) { g.beginPath(); g.moveTo(x - w / 2 + p * w / 6, top); g.lineTo(x - w / 2 + p * w / 6, top + fh); g.stroke(); }
    g.fillStyle = dusk ? '#0A0604' : '#4E3020'; g.beginPath(); g.moveTo(x - w / 2 - 30 * u, top + 6 * u); g.lineTo(x, top - 110 * u * k); g.lineTo(x + w / 2 + 30 * u, top + 6 * u); g.fill();
    if (dusk && i === 1) { g.fillStyle = 'rgba(240,180,90,0.8)'; g.fillRect(x - 20 * u, top + 30 * u, 40 * u, 50 * u); } });
  // ground + path
  g.fillStyle = dusk ? '#1E130B' : '#B98A5A'; g.fillRect(0, gy, W, H - gy);
  g.fillStyle = dusk ? '#2A1A10' : '#D9B183'; g.fillRect(0, gy, W, 70 * u);
  g.fillStyle = dusk ? '#140D08' : '#9E7148';
  for (let i = 0; i < 70; i++) { g.beginPath(); g.ellipse(hash(i, 5) * W, gy + 90 * u + hash(i, 6) * 700 * u, (10 + hash(i, 7) * 26) * u, 7 * u, 0, 0, 7); g.fill(); }
  // grass tufts
  g.strokeStyle = dusk ? '#140D08' : E.leaf2; g.lineWidth = 4 * u; g.lineCap = 'round';
  for (let i = 0; i < 26; i++) { const x = hash(i, 9) * W, y = gy + 80 * u + hash(i, 10) * 500 * u;
    for (let k = -2; k <= 2; k++) { g.beginPath(); g.moveTo(x, y); g.lineTo(x + k * 9 * u, y - (22 + 10 * hash(i, k + 3)) * u); g.stroke(); } }
}

// ---------------------------------------------------------------- Ban Chiang jar. body centre (x, y), 1 unit = s px. Height ≈ 2.2 units.
function potPath() {
  g.beginPath();
  g.moveTo(-0.36, -1.08); g.quadraticCurveTo(-0.29, -0.93, -0.26, -0.82);
  g.bezierCurveTo(-0.32, -0.7, -0.98, -0.58, -1.0, 0.0);
  g.bezierCurveTo(-1.0, 0.5, -0.6, 0.82, -0.28, 0.86);
  g.lineTo(-0.36, 1.12); g.lineTo(0.36, 1.12); g.lineTo(0.28, 0.86);
  g.bezierCurveTo(0.6, 0.82, 1.0, 0.5, 1.0, 0.0);
  g.bezierCurveTo(0.98, -0.58, 0.32, -0.7, 0.26, -0.82);
  g.quadraticCurveTo(0.29, -0.93, 0.36, -1.08);
  g.closePath();
}
// swirl strokes in unit coords (late-period red-on-buff). Each stroke = list of points.
const SWIRLS = (() => {
  const S = [], arc = (y0, k) => Array.from({ length: 41 }, (_, i) => { const x = -1 + i / 20; return [x, y0 + k * Math.sqrt(Math.max(0, 1 - x * x))]; });
  S.push(arc(-0.56, 0.06));
  for (let k = 0; k < 5; k++) {
    const th = -1.15 + k * 0.575, cx = Math.sin(th), sx = Math.cos(th) * 0.95 + 0.05, cy = 0.02 + (k % 2 ? 0.07 : -0.07), dir = k % 2 ? 1 : -1;
    const pts = []; for (let i = 0; i <= 46; i++) { const q = 1 - i / 46, a = dir * q * 2.3 * Math.PI * 2 + k, r = 0.04 + 0.21 * q; pts.push([cx + Math.cos(a) * r * sx, cy + Math.sin(a) * r]); }
    S.push(pts);
    if (k < 4) { const th2 = -1.15 + (k + 1) * 0.575, nx = Math.sin(th2), ny = 0.02 + ((k + 1) % 2 ? 0.07 : -0.07); // S-hook to the next spiral
      S.push(Array.from({ length: 13 }, (_, i) => { const p = i / 12; return [cx + (nx - cx) * p, cy + (ny - cy) * p + (k % 2 ? -0.3 : 0.3) * Math.sin(p * Math.PI * 2) * 0.5]; })); }
  }
  S.push(arc(0.42, 0.05));
  for (let i = 0; i < 9; i++) { const x = -0.2 + i * 0.05; S.push([[x, -0.8], [x + 0.02, -0.68]]); }
  return S;
})();
const SW_TOTAL = SWIRLS.reduce((a, s) => a + s.length, 0);
export function pot(x, y, s, o = {}) {
  const { style = 'late', paint = 1, rot = 0, shade = 1, alpha = 1 } = o;
  const fill = style === 'early' ? E.black : style === 'mid' ? '#C88A5A' : E.buff;
  g.save(); g.globalAlpha *= alpha; g.translate(x, y); g.rotate(rot); g.scale(s, s);
  g.shadowColor = 'rgba(40,20,10,0.3)'; g.shadowBlur = 0.12 * s; g.shadowOffsetY = 0.04 * s;
  potPath(); g.fillStyle = fill; g.fill(); g.shadowColor = 'transparent';
  g.save(); potPath(); g.clip();
  g.lineCap = 'round'; g.lineJoin = 'round';
  if (style === 'late') {
    let left = Math.floor(SW_TOTAL * clamp(paint));
    g.strokeStyle = E.terra; g.lineWidth = 0.065;
    for (const st of SWIRLS) { if (left <= 1) break; const n = Math.min(st.length, left); left -= n;
      g.beginPath(); for (let i = 0; i < n; i++) i ? g.lineTo(st[i][0], st[i][1]) : g.moveTo(st[i][0], st[i][1]); g.stroke(); }
  } else if (style === 'early') {
    g.strokeStyle = 'rgba(232,210,170,0.55)'; g.lineWidth = 0.025;
    for (let r = 0; r < 2; r++) { g.beginPath(); for (let i = 0; i <= 16; i++) g.lineTo(-1 + i / 8, -0.45 + r * 0.22 + (i % 2 ? 0.1 : -0.04)); g.stroke(); }
    for (let k = 0; k < 4; k++) { g.beginPath(); for (let i = 0; i <= 30; i++) { const a = i / 30 * 9, rr = 0.02 + i / 30 * 0.13; g.lineTo(-0.68 + k * 0.45 + Math.cos(a) * rr, 0.08 + Math.sin(a) * rr); } g.stroke(); }
    g.strokeStyle = 'rgba(232,210,170,0.25)'; for (let i = 0; i < 40; i++) { const xx = -0.9 + i * 0.045; g.beginPath(); g.moveTo(xx, 0.35); g.lineTo(xx + 0.08, 0.8); g.stroke(); }
  } else {
    g.fillStyle = E.terra2; g.fillRect(-1.1, -1.2, 2.2, 0.62);
    g.strokeStyle = 'rgba(60,30,15,0.5)'; g.lineWidth = 0.03; g.beginPath(); g.moveTo(-1, -0.02); g.quadraticCurveTo(0, 0.06, 1, -0.02); g.stroke();
  }
  if (shade) { const sh = g.createRadialGradient(-0.35, -0.3, 0.1, 0, 0, 1.3);
    sh.addColorStop(0, 'rgba(255,245,220,0.35)'); sh.addColorStop(0.55, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(50,25,10,0.45)');
    g.fillStyle = sh; g.fillRect(-1.2, -1.3, 2.4, 2.6); }
  g.restore();
  g.lineWidth = 0.025; g.strokeStyle = 'rgba(50,28,14,0.6)'; potPath(); g.stroke();
  g.fillStyle = style === 'early' ? '#1E1814' : '#5A3A22'; g.beginPath(); g.ellipse(0, -1.08, 0.36, 0.06, 0, 0, 7); g.fill();
  g.restore();
}
// loose painted sherd (curved shard) at (x,y), size r
export function sherd(x, y, r, rot = 0, seed = 1) {
  g.save(); g.translate(x, y); g.rotate(rot);
  g.beginPath(); const n = 7; for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2, rr = r * (0.6 + hash(i, seed) * 0.5); g.lineTo(Math.cos(a) * rr, Math.sin(a) * rr * 0.75); } g.closePath();
  g.fillStyle = E.buff; g.fill(); g.strokeStyle = 'rgba(60,35,20,0.5)'; g.lineWidth = 2 * u; g.stroke();
  g.save(); g.clip(); g.strokeStyle = E.terra; g.lineWidth = r * 0.16; g.lineCap = 'round';
  g.beginPath(); for (let i = 0; i <= 20; i++) { const a = i / 20 * 8 + seed, rr = r * 0.08 + i / 20 * r * 0.6; g.lineTo(Math.cos(a) * rr - r * 0.2, Math.sin(a) * rr); } g.stroke(); g.restore();
  g.restore();
}

// ---------------------------------------------------------------- bronze: bangle with a travelling glint, spearhead, bell
export function glint(x, y, r, a = 1) {
  if (a <= 0) return; g.save(); g.globalAlpha *= clamp(a); g.fillStyle = '#FFF4D6'; g.translate(x, y);
  g.beginPath(); for (let k = 0; k < 8; k++) { const ang = k * Math.PI / 4, rr = k % 2 ? r * 0.18 : r; g.lineTo(Math.cos(ang) * rr, Math.sin(ang) * rr); } g.closePath(); g.fill(); g.restore();
}
export function bangle(x, y, r, t, o = {}) {
  const { tilt = 0.38, phase = 0, rot = 0 } = o;
  g.save(); g.translate(x, y); g.rotate(rot);
  g.lineWidth = r * 0.24; g.strokeStyle = '#7A5226'; g.beginPath(); g.ellipse(0, r * 0.05, r, r * tilt, 0, 0, 7); g.stroke();
  g.lineWidth = r * 0.2; g.strokeStyle = E.bronze; g.beginPath(); g.ellipse(0, 0, r, r * tilt, 0, 0, 7); g.stroke();
  g.lineWidth = r * 0.06; g.strokeStyle = E.bronzeHi; g.beginPath(); g.ellipse(0, -r * 0.03, r * 0.96, r * tilt * 0.9, 0, Math.PI * 1.1, Math.PI * 1.75); g.stroke();
  g.fillStyle = 'rgba(95,142,123,0.55)'; for (let i = 0; i < 5; i++) { const a = hash(i, 13) * 7; g.beginPath(); g.arc(Math.cos(a) * r, Math.sin(a) * r * tilt, r * 0.05, 0, 7); g.fill(); }
  const ga = ((t * 0.7 + phase) % 1.6) / 1.6 * Math.PI * 2;
  glint(Math.cos(Math.PI * 1.25 + Math.sin(ga) * 0.5) * r, Math.sin(Math.PI * 1.25 + Math.sin(ga) * 0.5) * r * tilt, r * 0.4, Math.sin(ga) * 1.2);
  g.restore();
}
export function spear(x, y, s, rot = 0) {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  g.fillStyle = E.bronze; g.beginPath(); g.moveTo(0, -1); g.bezierCurveTo(0.12, -0.6, 0.26, 0.0, 0.08, 0.35); g.lineTo(0.07, 0.8); g.lineTo(-0.07, 0.8); g.lineTo(-0.08, 0.35); g.bezierCurveTo(-0.26, 0.0, -0.12, -0.6, 0, -1); g.fill();
  g.strokeStyle = E.bronzeHi; g.lineWidth = 0.03; g.beginPath(); g.moveTo(0, -0.9); g.lineTo(0, 0.75); g.stroke();
  g.fillStyle = 'rgba(95,142,123,0.6)'; g.beginPath(); g.arc(-0.1, 0.1, 0.05, 0, 7); g.arc(0.06, 0.5, 0.04, 0, 7); g.fill();
  g.restore();
}
export function bell(x, y, s, swing = 0) {
  g.save(); g.translate(x, y); g.rotate(swing); g.scale(s, s);
  g.strokeStyle = E.bronze; g.lineWidth = 0.08; g.beginPath(); g.arc(0, -1.0, 0.14, Math.PI, 0); g.stroke();
  g.fillStyle = E.bronze; g.beginPath(); g.moveTo(-0.28, -0.95); g.quadraticCurveTo(0, -1.05, 0.28, -0.95); g.lineTo(0.42, -0.1); g.quadraticCurveTo(0.5, 0.02, 0.56, 0.05); g.lineTo(-0.56, 0.05); g.quadraticCurveTo(-0.5, 0.02, -0.42, -0.1); g.closePath(); g.fill();
  g.strokeStyle = E.bronzeHi; g.lineWidth = 0.04; for (let k = 0; k < 3; k++) { g.beginPath(); g.moveTo(-0.32 - k * 0.03, -0.65 + k * 0.18); g.quadraticCurveTo(0, -0.6 + k * 0.18, 0.32 + k * 0.03, -0.65 + k * 0.18); g.stroke(); }
  g.fillStyle = '#6B4520'; g.beginPath(); g.arc(Math.sin(swing * 3) * 0.1, 0.16, 0.09, 0, 7); g.fill();
  g.restore();
}

// ---------------------------------------------------------------- stratigraphy section. dig 0..1 reveals layers top-down. Returns layer y-centres.
export const LAYERS = [
  { f: 0.13, c: '#6E5034', name: 'ผิวดินปัจจุบัน' },
  { f: 0.29, c: '#A87447', name: 'สมัยปลาย', sub: 'ไหลายเขียนสีแดง' },
  { f: 0.29, c: '#86593A', name: 'สมัยกลาง', sub: '' },
  { f: 0.29, c: '#5E3B24', name: 'สมัยต้น', sub: 'ภาชนะสีดำลายขูดขีด' },
];
export function strata(x, y, w, h, dig, t) {
  let yy = y; const out = [];
  g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip();
  LAYERS.forEach((L, i) => { const lh = L.f * h;
    g.fillStyle = L.c; g.beginPath(); g.moveTo(x, yy + Math.sin(i) * 8 * u);
    for (let k = 0; k <= 12; k++) g.lineTo(x + k / 12 * w, yy + Math.sin(k * 1.3 + i * 2) * 10 * u * (i ? 1 : 0));
    g.lineTo(x + w, y + h); g.lineTo(x, y + h); g.closePath(); g.fill();
    g.fillStyle = 'rgba(30,15,5,0.12)'; for (let k = 0; k < 40; k++) { g.beginPath(); g.arc(x + hash(k, i + 40) * w, yy + hash(k, i + 41) * lh, (2 + hash(k, i + 42) * 5) * u, 0, 7); g.fill(); }
    out.push(yy + lh / 2); yy += lh; });
  // embedded finds
  const y1 = out[1], y2 = out[2], y3 = out[3];
  pot(x + w * 0.28, y1, 44 * u, { paint: 1, rot: 0.2 }); pot(x + w * 0.72, y1 + 10 * u, 36 * u, { paint: 1, rot: -0.5 });
  sherd(x + w * 0.5, y1 + 30 * u, 22 * u, 0.4, 3);
  bangle(x + w * 0.35, y2, 32 * u, t, { phase: 0.3 }); bangle(x + w * 0.66, y2 + 20 * u, 26 * u, t, { phase: 0.9, rot: 0.4 });
  pot(x + w * 0.3, y3 + 10 * u, 40 * u, { style: 'early', rot: -0.15 }); pot(x + w * 0.74, y3, 34 * u, { style: 'early', rot: 0.3 });
  // unexcavated cover below the dig front
  const fy = y + h * clamp(dig);
  if (dig < 1) { g.fillStyle = '#3B2618'; g.fillRect(x, fy, w, y + h - fy);
    g.strokeStyle = 'rgba(242,231,208,0.12)'; g.lineWidth = 3 * u; for (let k = -20; k < 30; k++) { g.beginPath(); g.moveTo(x + k * 40 * u, fy); g.lineTo(x + k * 40 * u + 300 * u, y + h + 300 * u); g.stroke(); }
    g.fillStyle = C.cream; g.fillRect(x, fy - 2 * u, w, 4 * u); }
  g.restore();
  g.strokeStyle = C.ink; g.lineWidth = 4 * u; g.strokeRect(x, y, w, h);
  return { ys: out, fy };
}

// ---------------------------------------------------------------- burial (respectful outline, not a skeleton) with grave goods appearing p 0..1
export function grave(cx, cy, s, t, p = 1) {
  g.save(); g.translate(cx, cy);
  g.fillStyle = '#6E4A30'; rrect(g, -1.15 * s, -0.42 * s, 2.3 * s, 0.84 * s, 0.12 * s); g.fill();
  g.strokeStyle = 'rgba(242,231,208,0.85)'; g.lineWidth = 4 * u; g.setLineDash([12 * u, 9 * u]);
  g.beginPath(); g.arc(-0.78 * s, 0, 0.13 * s, 0, 7); g.stroke();
  rrect(g, -0.62 * s, -0.17 * s, 1.15 * s, 0.34 * s, 0.17 * s); g.stroke();
  g.setLineDash([]);
  const goods = [[0.75, -0.12, 'pot'], [0.92, 0.18, 'pot'], [-0.25, -0.24, 'bangle'], [-0.1, 0.25, 'bangle'], [0.3, -0.27, 'bead']];
  goods.forEach(([gx, gy, k], i) => { const q = clamp(spring(p * 4 - i * 0.5, 'playful')); if (q <= 0) return;
    g.save(); g.translate(gx * s, gy * s); g.scale(q, q);
    if (k === 'pot') pot(0, 0, 0.13 * s, { paint: 1 });
    else if (k === 'bangle') bangle(0, 0, 0.09 * s, t, { phase: i });
    else for (let b = 0; b < 6; b++) { g.fillStyle = b % 2 ? '#C9563A' : '#E3C48A'; g.beginPath(); g.arc((b - 2.5) * 0.04 * s, 0, 0.018 * s, 0, 7); g.fill(); }
    g.restore(); });
  g.restore();
}

// ---------------------------------------------------------------- props
export function crate(x, y, w, h, label = '', o = {}) {
  const { rot = 0 } = o;
  g.save(); g.translate(x, y); g.rotate(rot);
  g.fillStyle = '#B88A55'; g.fillRect(-w / 2, -h, w, h);
  g.strokeStyle = '#7A5530'; g.lineWidth = 4 * u; g.strokeRect(-w / 2, -h, w, h);
  for (let k = 1; k < 3; k++) { g.beginPath(); g.moveTo(-w / 2, -h + k * h / 3); g.lineTo(w / 2, -h + k * h / 3); g.stroke(); }
  g.beginPath(); g.moveTo(-w / 2, -h); g.lineTo(w / 2, 0); g.stroke();
  if (label) text(g, label, 0, -h / 2 + 10 * u, { size: Math.min(28 * u, h * 0.3), weight: 700, family: 'Inter, sans-serif', color: '#4A2E16', tracking: 2 * u });
  g.restore();
}
export function vitrine(x, y, w, h) {
  // plinth
  g.fillStyle = '#4A2E1C'; g.fillRect(x - 20 * u, y + h, w + 40 * u, 160 * u);
  g.fillStyle = '#5E3B24'; g.fillRect(x - 20 * u, y + h, w + 40 * u, 20 * u);
  // glass back light
  const gr = g.createLinearGradient(0, y, 0, y + h); gr.addColorStop(0, 'rgba(255,240,205,0.95)'); gr.addColorStop(1, 'rgba(220,190,140,0.95)');
  g.fillStyle = gr; g.fillRect(x, y, w, h);
}
export function vitrineGlass(x, y, w, h) {
  g.save(); g.fillStyle = 'rgba(255,255,255,0.12)';
  g.beginPath(); g.moveTo(x + w * 0.1, y); g.lineTo(x + w * 0.32, y); g.lineTo(x + w * 0.12, y + h); g.lineTo(x - w * 0.1 + w * 0.1, y + h); g.closePath(); g.fill();
  g.beginPath(); g.moveTo(x + w * 0.5, y); g.lineTo(x + w * 0.56, y); g.lineTo(x + w * 0.36, y + h); g.lineTo(x + w * 0.3, y + h); g.closePath(); g.fill();
  g.strokeStyle = 'rgba(60,35,20,0.7)'; g.lineWidth = 5 * u; g.strokeRect(x, y, w, h);
  g.restore();
}
// bent figure digging with a spade (night silhouette)
export function digger(x, y, s, t, color = '#0E0905', phase = 0) {
  const b = Math.sin(t * 3 + phase);
  g.save(); g.translate(x, y); g.scale(s, s); g.strokeStyle = color; g.fillStyle = color; g.lineCap = 'round'; g.lineWidth = 0.12;
  g.beginPath(); g.moveTo(-0.15, 0); g.lineTo(0, -0.75); g.moveTo(0.2, 0); g.lineTo(0, -0.75); g.stroke();
  const lean = 0.7 + b * 0.25;
  const sx = Math.sin(lean) * 0.7, sy = -0.75 - Math.cos(lean) * 0.7;
  g.beginPath(); g.moveTo(0, -0.75); g.lineTo(sx, sy); g.stroke();
  g.beginPath(); g.arc(sx + 0.12, sy - 0.08, 0.15, 0, 7); g.fill();
  g.beginPath(); g.moveTo(sx * 0.8, sy * 0.95); g.lineTo(0.75, -0.45 + b * 0.1); g.stroke();
  g.lineWidth = 0.06; g.beginPath(); g.moveTo(0.55, -0.8 + b * 0.1); g.lineTo(0.95, 0.0 + b * 0.1); g.stroke();
  g.beginPath(); g.ellipse(1.0, 0.08 + b * 0.1, 0.08, 0.14, -0.4, 0, 7); g.fill();
  g.restore();
}

// ---------------------------------------------------------------- Thailand (rough outline for a stylised map)
export const TH = [[20.45, 99.9], [20.2, 100.1], [19.6, 100.5], [18.5, 101.1], [17.9, 101.0], [17.5, 101.4], [17.9, 101.8], [18.15, 102.1], [17.9, 102.6],
  [18.3, 103.3], [18.4, 103.9], [17.6, 104.4], [16.6, 104.75], [15.6, 105.6], [14.4, 105.2], [14.35, 103.6], [14.0, 102.8], [13.6, 102.4], [12.6, 102.4],
  [12.2, 102.6], [11.65, 102.9], [12.2, 102.2], [12.6, 101.4], [13.1, 100.9], [13.5, 100.95], [13.5, 100.5], [13.3, 100.0], [12.5, 99.95], [11.8, 99.8],
  [10.5, 99.2], [9.3, 99.3], [8.4, 100.0], [7.2, 100.6], [6.9, 101.3], [6.25, 102.1], [5.8, 101.8], [6.0, 101.1], [6.5, 100.2], [7.5, 99.4],
  [8.0, 98.4], [9.0, 98.3], [10.0, 98.5], [10.8, 99.2], [11.8, 99.6], [12.6, 99.2], [13.2, 99.1], [14.1, 98.6], [15.3, 98.4], [16.4, 98.7],
  [17.6, 97.9], [18.5, 97.6], [19.7, 97.9], [20.1, 98.6], [20.4, 99.4]];
export const PL = { banchiang: [17.40, 103.24], udon: [17.41, 102.79], bangkok: [13.75, 100.5] };
export const mapTH = (cam) => map(cam, { lands: [TH], land: '#D9B47F', water: '#EADFC8', line: '#7E5233', lw: 3, grid: 2 });

export default () => [
  // ---------------------------------------------------------------- hook: a stumble
  { from: bar(0), to: bar(2), cues: [[0, 'tick', 0.4], [0.33, 'tick', 0.4], [0.66, 'tick', 0.4], [1.05, 'swish', 0.6], [1.35, 'thump', 1.0], [1.6, 'pop', 0.7]],
    draw(t) {
      const gy = 1180 * u;
      const [sx, sy] = shake(t, 1.35, 14); g.translate(sx, sy);
      village(t, { gy });
      kapok(250 * u, gy, 220 * u);
      const tt = Math.min(t, 1.05), fall = clamp(spring(t - 1.05, 'heavy') * 1.0);
      g.save(); g.beginPath(); g.rect(0, 0, W, gy + 24 * u); g.clip(); pot(820 * u, gy + 95 * u, 110 * u, { rot: 0.25 }); g.restore();
      walker(130 * u + tt * 360 * u, gy + 8 * u, 190 * u, tt, { fall, speed: 1.6 });
      if (t > 1.35) for (let i = 0; i < 6; i++) { const q = clamp((t - 1.35) / 0.6); g.fillStyle = `rgba(217,177,131,${0.8 * (1 - q)})`; g.beginPath(); g.arc(560 * u + (i - 2.5) * 50 * u * (1 + q), gy - q * 60 * u - hash(i, 2) * 30 * u, (14 + 20 * q) * u, 0, 7); g.fill(); }
      band(200 * u, 290 * u);
      big('1966', TX, 410 * u, t - 0.05, { size: 200 * u, color: C.red });
      band(1330 * u, 230 * u);
      say('สะดุดล้มครั้งเดียว\nพบประวัติศาสตร์หลายพันปี', TX, 1405 * u, t - 1.5, { size: 50 * u, weight: 800, color: C.ink });
      finish(0.5);
    } },
  { from: bar(2), to: bar(4), cues: [[0, 'thump', 0.6], [0.6, 'swish', 0.4], [2.5, 'chime', 0.5]],
    draw(t) {
      paper();
      const gy = 1060 * u;
      const rise = track(t, [[0, 80 * u], [0.05, 0]], 'heavy');
      // soil block with a pot buried, rim and shoulder poking out
      pot(TX + 20 * u, gy + 170 * u + rise, 310 * u, { rot: 0.12 });
      g.fillStyle = '#9C6B43'; g.beginPath(); g.moveTo(0, gy); for (let k = 0; k <= 20; k++) g.lineTo(k / 20 * W, gy + Math.sin(k * 1.9) * 12 * u + (k > 6 && k < 14 ? 30 * u * Math.sin((k - 6) / 8 * Math.PI) : 0)); g.lineTo(W, H); g.lineTo(0, H); g.fill();
      g.save(); g.beginPath(); g.rect(0, 0, W, gy + 12 * u); g.clip(); pot(TX + 20 * u, gy + 170 * u + rise, 310 * u, { rot: 0.12 }); g.restore();
      g.fillStyle = '#7E5233'; for (let i = 0; i < 50; i++) { g.beginPath(); g.arc(hash(i, 3) * W, gy + 60 * u + hash(i, 4) * 520 * u, (4 + hash(i, 5) * 10) * u, 0, 7); g.fill(); }
      // dust brushed away
      for (let i = 0; i < 10; i++) { const q = clamp((t - 0.6 - i * 0.05) / 1.2); if (q <= 0 || q >= 1) continue;
        g.fillStyle = `rgba(156,107,67,${1 - q})`; g.beginPath(); g.arc(TX + (hash(i, 8) - 0.5) * 300 * u + q * (hash(i, 9) - 0.5) * 300 * u, 800 * u - q * 200 * u, 8 * u, 0, 7); g.fill(); }
      kicker('ใต้ใบหน้าของเขา', TX, 300 * u, t);
      say('มีขอบไหดินเผาโผล่ขึ้นมาจากพื้น', TX, 410 * u, t - 0.2, { size: 50 * u, weight: 800 });
      band(1300 * u, 200 * u);
      say('ลายเขียนสีแดง วนเป็นก้นหอย', TX, 1410 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 20); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 470 * u, 90 * u, 14 * u); g.fill();
      text(g, 'BAN CHIANG · UDON THANI', 305 * u, 472 * u, { size: 28 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 2 * u });
      g.restore();
      say('แหล่งโบราณคดีบ้านเชียง', TX, 720 * u, t - 0.25, { size: 70 * u, weight: 800 });
      text(g, 'Ban Chiang', TX, 820 * u, { size: 56 * u, weight: 400, family: SERIF, color: C.inkSoft, alpha: clamp((t - 0.8) / 0.4) });
      stamp('BRONZE AGE', TX, 1060 * u, t - 2.5, { size: 110 * u, rot: -0.1 });
      say('หมู่บ้านธรรมดาในอีสาน ที่กลายเป็น\nแหล่งยุคสำริดสำคัญที่สุดแห่งหนึ่งของอุษาคเนย์', TX, 1300 * u, t - 3.0, { size: 40 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------------------------------------------------------- where
  { from: bar(6), to: bar(9), cues: [[0.2, 'whoosh', 0.6], [1.0, 'pop', 0.6], [3.2, 'whoosh', 0.5], [4.6, 'pop', 0.8]],
    draw(t) {
      const cam = { lat: track(t, [[0, 13.8], [3.0, 17.4]], 'heavy'), lon: track(t, [[0, 101.2], [3.0, 103.0]], 'heavy'), z: track(t, [[0, 82], [3.0, 420]], 'heavy') * u };
      const P = mapTH(cam);
      topScrim(560, '242,231,208', 0.95);
      if (t < 3.2) pin(...P(PL.bangkok), t - 1.0, { label: 'กรุงเทพฯ', labelColor: C.ink, side: 1, color: C.inkSoft });
      pin(...P(PL.udon), t - 2.0, { label: 'อุดรธานี', labelColor: C.ink, side: -1, color: C.inkSoft });
      pin(...P(PL.banchiang), t - 4.6, { label: 'บ้านเชียง', labelColor: C.red, side: 1 });
      if (t > 3.5) { const [lx, ly] = P([18.25, 103.0]); text(g, 'สปป.ลาว', lx, ly, { size: 40 * u, weight: 800, family: THAI, color: C.inkSoft, alpha: clamp((t - 3.5) / 0.5) });
        const [mx, my] = P([18.02, 102.35]); text(g, 'แม่น้ำโขง', mx, my, { size: 30 * u, weight: 800, family: THAI, color: '#5F7F8E', alpha: clamp((t - 3.8) / 0.5) }); }
      kicker('ภาคอีสาน ประเทศไทย', TX, 280 * u, t);
      say('อำเภอหนองหาน จังหวัดอุดรธานี', TX, 390 * u, t - 0.3, { size: 50 * u, weight: 800 });
      if (t > 4.6) { band(1360 * u, 180 * u); say('ห่างกรุงเทพฯ หลายร้อยกิโลเมตร', TX, 1460 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.inkSoft }); }
      finish(0.6);
    } },
  // ---------------------------------------------------------------- when
  { from: bar(9), to: bar(10), cues: Array.from({ length: 5 }, (_, i) => [i * 0.15, 'tick', 0.6]).concat([[1.0, 'thump', 0.6]]),
    draw(t) {
      paper(); kicker('วันหนึ่งในเดือนกรกฎาคม', TX, 420 * u, t);
      const ys = ['1962', '1963', '1964', '1965', '1966'], dw = 190 * u, x0 = TX - 1.5 * (dw + 16 * u);
      for (let d = 0; d < 4; d++) flip(x0 + d * (dw + 16 * u), 800 * u, dw, 300 * u, ys.map((y) => y[d]), ys.map((_, i) => i * 0.15), t, { size: 230 * u, bg: C.ink, fg: C.paper, r: 16 * u });
      say('ที่หมู่บ้านบ้านเชียง', TX, 1220 * u, t - 1.0, { size: 56 * u, weight: 800 });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- who
  { from: bar(10), to: bar(13), cues: [[0.2, 'swish', 0.5], [2.5, 'pop', 0.6], [5.0, 'pop', 0.6]],
    draw(t) {
      paper();
      const s = clamp(spring(t - 0.2, 'heavy'));
      g.save(); g.globalAlpha = s;
      walker(TX - 30 * u, 1120 * u, 280 * u, t, { still: true, color: C.inkSoft });
      // notebook in hand
      g.fillStyle = C.red; g.save(); g.translate(TX + 70 * u, 820 * u); g.rotate(-0.2); g.fillRect(-36 * u, -48 * u, 72 * u, 96 * u); g.fillStyle = C.paper; g.fillRect(-26 * u, -36 * u, 52 * u, 6 * u); g.restore();
      g.restore();
      g.fillStyle = C.paper2; g.fillRect(0, 1120 * u, W, 8 * u);
      kicker('นักศึกษาชาวอเมริกัน', TX, 300 * u, t);
      text(g, 'Stephen Young', TX, 440 * u, { size: 90 * u, weight: 400, family: SERIF, color: C.ink, alpha: clamp((t - 0.3) / 0.4) });
      say('นักศึกษามหาวิทยาลัย Harvard วัยราว 20 ปี', TX, 1240 * u, t - 2.5, { size: 42 * u, weight: 800 });
      say('ลูกชายของอดีตเอกอัครราชทูตสหรัฐฯ ประจำไทย', TX, 1330 * u, t - 3.2, { size: 40 * u, weight: 800, color: C.inkSoft });
      say('เขามาเก็บข้อมูลทำงานวิจัยในหมู่บ้าน', TX, 1460 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- the stumble, in slow motion
  { from: bar(13), to: bar(16), cues: [[0.2, 'tick', 0.4], [0.8, 'tick', 0.4], [1.4, 'tick', 0.4], [2.0, 'pop', 0.6], [3.4, 'swish', 0.7], [3.75, 'impact', 1.0], [5.0, 'pop', 0.5]],
    draw(t) {
      const gy = 1220 * u;
      const [sx, sy] = shake(t, 3.75, 20); g.translate(sx, sy);
      village(t, { gy });
      const hx = kapok(170 * u, gy, 250 * u, { glow: remap(t, 2.0, 2.4) * (t < 3.6 ? 1 : 0) });
      const tt = Math.min(t, 3.4), fall = clamp(spring(t - 3.4, 'heavy'));
      walker(-60 * u + tt * (hx + 60 * u - 20 * u) / 3.4, gy + 6 * u, 200 * u, tt, { fall, speed: 0.7 });
      if (t > 3.75) {
        for (let i = 0; i < 7; i++) { const q = clamp((t - 3.75) / 0.7); g.fillStyle = `rgba(217,177,131,${0.85 * (1 - q)})`; g.beginPath(); g.arc(hx + 200 * u + (i - 3) * 45 * u * (1 + q), gy - q * 70 * u - hash(i, 4) * 30 * u, (12 + 22 * q) * u, 0, 7); g.fill(); }
        const p = clamp(spring(t - 3.8, 'playful'));
        g.save(); g.translate(hx + 230 * u, 1000 * u); g.scale(p, p); g.rotate(0.15);
        g.fillStyle = C.red; g.font = `400 ${180 * u}px ${SERIF}`; g.textAlign = 'center'; g.fillText('!', 0, 0); g.restore();
      }
      band(200 * u, 330 * u);
      kicker('ระหว่างเดินตามทางในหมู่บ้าน', TX, 290 * u, t);
      say('เท้าของเขาเกี่ยวรากต้นงิ้ว', TX, 400 * u, t - 2.0, { size: 54 * u, weight: 800, color: C.ink });
      if (t > 5) band(1350 * u, 190 * u);
      say('ล้มคว่ำหน้าลงบนพื้นดิน', TX, 1460 * u, t - 5.0, { size: 52 * u, weight: 800, color: C.red });
      finish(0.5);
    } },
  // ---------------------------------------------------------------- a path full of sherds (top-down)
  { from: bar(16), to: bar(18), cues: Array.from({ length: 7 }, (_, i) => [0.3 + i * 0.25, 'pop', 0.45]).concat([[2.5, 'thump', 0.6]]),
    draw(t) {
      g.fillStyle = '#C99A66'; g.fillRect(0, 0, W, H);
      g.fillStyle = '#DDB685'; g.beginPath(); g.moveTo(320 * u, 0); g.bezierCurveTo(200 * u, 600 * u, 820 * u, 900 * u, 640 * u, H); g.lineTo(980 * u, H); g.bezierCurveTo(1100 * u, 900 * u, 480 * u, 600 * u, 660 * u, 0); g.fill();
      g.fillStyle = '#A97A4C'; for (let i = 0; i < 90; i++) { g.beginPath(); g.ellipse(hash(i, 11) * W, hash(i, 12) * H, (6 + hash(i, 13) * 16) * u, 5 * u, hash(i, 14) * 3, 0, 7); g.fill(); }
      const S = [[430, 620], [600, 760], [380, 900], [700, 1000], [520, 1120], [760, 1260], [600, 1400]];
      S.forEach(([x, y], i) => { sherd(x * u, y * u, (40 + hash(i, 15) * 20) * u, hash(i, 16) * 6, i + 2);
        const q = t - 0.3 - i * 0.25; if (q > 0) { const r = (50 + 60 * clamp(q / 0.4)) * u; g.save(); g.strokeStyle = C.red; g.lineWidth = 5 * u; g.globalAlpha = clamp(1.4 - q); g.beginPath(); g.arc(x * u, y * u, r, 0, 7); g.stroke(); g.restore(); } });
      band(200 * u, 330 * u);
      kicker('พอลุกขึ้นมาดูดี ๆ', TX, 290 * u, t);
      say('ทางเดินทั้งเส้นเต็มไปด้วย\nเศษภาชนะดินเผา', TX, 390 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.ink });
      band(1330 * u, 200 * u);
      say('ฝังตื้น ๆ อยู่ใต้ผิวดิน', TX, 1450 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.red });
      finish(0.5);
    } },
];
