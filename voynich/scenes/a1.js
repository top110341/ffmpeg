// Voynich Manuscript — Act 1: 0:00–0:45 (bars 0–18).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake } from './kit.js';

// manuscript palette
export const V = { vel: '#E8D8B2', vel2: '#D9C49A', edge: '#B8996A', ink: '#5A3B22', leaf: '#6F8C4C', leaf2: '#4E6B36',
  blue: '#5F7FA6', rust: '#A9563A', root: '#7D5634', water: '#7FA38C', skin: '#E9CDAA' };

// ---------------------------------------------------------------- invented "Voynichese" glyphs
// Not a real alphabet: each shape is a few loops, minims and hooks. Baseline y, x-height s px.
const GW = [0.62, 0.78, 0.66, 0.52, 0.3, 0.62, 0.78, 0.68, 0.66, 0.66, 0.5, 0.92, 0.74, 0.55];
export function glyph(k, x, y, s, color = V.ink, lw = 0.12) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.strokeStyle = color; g.lineWidth = lw; g.lineCap = 'round'; g.lineJoin = 'round';
  g.beginPath();
  switch (k) {
    case 0: g.arc(0.3, -0.42, 0.26, 0, 7); break;
    case 1: g.arc(0.3, -0.42, 0.25, 0, 7); g.moveTo(0.56, -0.68); g.lineTo(0.58, -0.08); g.quadraticCurveTo(0.6, 0, 0.72, -0.04); break;
    case 2: g.arc(0.3, -0.55, 0.23, 0, 7); g.moveTo(0.53, -0.55); g.quadraticCurveTo(0.56, 0.1, 0.12, 0.42); break;
    case 3: g.arc(0.28, -0.42, 0.25, 0.7, 5.6); break;
    case 4: g.moveTo(0.12, -0.75); g.lineTo(0.12, -0.08); g.quadraticCurveTo(0.14, 0, 0.26, -0.06); break;
    case 5: g.moveTo(0.1, -0.75); g.lineTo(0.1, 0); g.moveTo(0.1, -0.35); g.quadraticCurveTo(0.42, -0.95, 0.44, -0.3); g.quadraticCurveTo(0.46, 0.04, 0.58, -0.06); break;
    case 6: g.moveTo(0.12, 0); g.lineTo(0.12, -0.95); g.bezierCurveTo(0.12, -1.75, 0.6, -1.75, 0.6, -0.95); g.lineTo(0.6, 0);
      g.moveTo(0.12, -0.62); g.quadraticCurveTo(0.95, -1.15, 0.74, -0.42); break;
    case 7: g.moveTo(0.1, 0); g.lineTo(0.1, -1.5); g.moveTo(0.1, -0.95); g.bezierCurveTo(0.55, -1.9, 1.05, -1.3, 0.38, -0.78); g.moveTo(0.52, 0); g.lineTo(0.52, -1.0); break;
    case 8: g.arc(0.3, -0.38, 0.24, 0, 7); g.moveTo(0.54, -0.42); g.bezierCurveTo(0.6, -1.2, 0.2, -1.35, 0.04, -1.0); break;
    case 9: g.arc(0.3, -0.42, 0.24, 0, 7); g.moveTo(0.54, -0.42); g.bezierCurveTo(0.6, 0.3, 0.22, 0.42, 0.0, 0.24); break;
    case 10: g.moveTo(0.1, 0); g.lineTo(0.15, -0.62); g.quadraticCurveTo(0.3, -0.92, 0.46, -0.66); break;
    case 11: g.arc(0.24, -0.4, 0.22, 0.7, 5.6); g.moveTo(0.82, -0.25); g.arc(0.64, -0.4, 0.22, 0.7, 5.6); g.moveTo(0.04, -0.82); g.lineTo(0.86, -0.82); break;
    case 12: g.moveTo(0.5, 0.12); g.lineTo(0.5, -0.95); g.lineTo(0.06, -0.32); g.lineTo(0.72, -0.32); break;
    default: g.moveTo(0.46, -0.78); g.quadraticCurveTo(0.0, -0.66, 0.28, -0.4); g.quadraticCurveTo(0.58, -0.12, 0.06, 0);
  }
  g.stroke(); g.restore();
  return GW[k] * s;
}
// a pseudo-word: list of glyph ids, deterministic per seed (prefix/middle/suffix pools give it "word-like" structure)
export function vword(seed) {
  const n = 3 + Math.floor(hash(seed, 41) * 4), w = [];
  for (let k = 0; k < n; k++) {
    const r = hash(seed * 13 + k, 42);
    if (k === 0) w.push([12, 0, 11, 8, 6, 3, 13, 7][Math.floor(r * 8)]);
    else if (k === n - 1) w.push([9, 5, 2, 10, 1, 9][Math.floor(r * 6)]);
    else w.push([0, 3, 4, 4, 11, 6, 0, 1, 8, 3][Math.floor(r * 10)]);
  }
  return w;
}
export function wordW(w, s) { return w.reduce((a, k) => a + GW[k] * s, 0); }
export function drawWord(w, x, y, s, color = V.ink) { let cx = x; for (const k of w) cx += glyph(k, cx, y, s, color); return cx; }
// lines of pseudo-text in a box; p 0..1 reveals glyphs in reading order
export function vtext(x, y, w, lines, s, seed, p = 1, o = {}) {
  const { color = V.ink, lh = 2.3 } = o;
  let total = 0; const rows = [];
  for (let l = 0; l < lines; l++) {
    const row = []; let cx = 0, i = 0;
    for (;;) { const wd = vword(seed * 101 + l * 17 + i++); const ww = wordW(wd, s); if (cx + ww > w) break; row.push([cx, wd]); cx += ww + s * 0.7; total += wd.length; }
    rows.push(row);
  }
  let left = Math.floor(total * clamp(p));
  rows.forEach((row, l) => row.forEach(([cx, wd]) => {
    if (left <= 0) return;
    const part = wd.slice(0, left); left -= part.length;
    drawWord(part, x + cx, y + l * s * lh, s, color);
  }));
}
// a vellum leaf: uneven edges, stains, darker rim
export function vellum(x, y, w, h, o = {}) {
  const { seed = 3, fill = V.vel } = o;
  g.save();
  g.beginPath();
  const n = 18, j = (i, k) => (hash(i, seed + k) - 0.5) * 10 * u;
  for (let i = 0; i <= n; i++) g.lineTo(x + (i / n) * w + j(i, 1), y + j(i, 2));
  for (let i = 0; i <= n; i++) g.lineTo(x + w + j(i, 3), y + (i / n) * h + j(i, 4));
  for (let i = 0; i <= n; i++) g.lineTo(x + w - (i / n) * w + j(i, 5), y + h + j(i, 6));
  for (let i = 0; i <= n; i++) g.lineTo(x + j(i, 7), y + h - (i / n) * h + j(i, 8));
  g.closePath();
  g.shadowColor = 'rgba(40,25,10,0.35)'; g.shadowBlur = 30 * u; g.shadowOffsetY = 10 * u;
  g.fillStyle = fill; g.fill();
  g.shadowColor = 'transparent';
  g.clip();
  for (let i = 0; i < 9; i++) { g.fillStyle = `rgba(140,100,50,${0.05 + hash(i, seed + 9) * 0.06})`; g.beginPath();
    g.ellipse(x + hash(i, seed + 10) * w, y + hash(i, seed + 11) * h, (40 + hash(i, seed + 12) * 120) * u, (30 + hash(i, seed + 13) * 90) * u, hash(i, seed) * 3, 0, 7); g.fill(); }
  g.strokeStyle = 'rgba(150,110,60,0.35)'; g.lineWidth = 26 * u; g.strokeRect(x, y, w, h);
  g.restore();
}
// imaginary plant: root crown at (x, y), s = px per unit (stem ~1.6 units). grow 0..1.
export function plant(x, y, s, o = {}) {
  const { seed = 1, grow = 1, flower = true } = o;
  const gr = clamp(grow), sway = 0;
  g.save(); g.translate(x, y); g.lineCap = 'round'; g.lineJoin = 'round';
  // roots: tangled, splaying downward
  const nr = 5 + Math.floor(hash(seed, 1) * 4);
  g.strokeStyle = V.root;
  for (let i = 0; i < nr; i++) {
    const a = (i / (nr - 1) - 0.5) * 2.2, L = (0.45 + hash(i, seed + 2) * 0.35) * s * clamp(gr * 1.6);
    g.lineWidth = (0.05 - i * 0.003) * s;
    g.beginPath(); g.moveTo(0, 0.05 * s);
    g.bezierCurveTo(Math.sin(a) * L * 0.2, L * 0.4, Math.sin(a) * L * 0.9 + (hash(i, seed + 3) - 0.5) * 0.3 * s, L * 0.5, Math.sin(a) * L * 1.1, L);
    g.stroke();
  }
  g.fillStyle = '#9A6B40'; g.strokeStyle = V.ink; g.lineWidth = 0.012 * s;
  g.beginPath(); g.ellipse(0, 0.05 * s, 0.17 * s, 0.13 * s, 0, 0, 7); g.fill(); g.stroke();
  // stem
  const sh = 1.6 * s * clamp((gr - 0.15) / 0.6);
  if (sh > 0) {
    g.strokeStyle = V.leaf2; g.lineWidth = 0.045 * s;
    g.beginPath(); g.moveTo(0, -0.05 * s); g.quadraticCurveTo(0.12 * s, -sh * 0.5, 0, -sh); g.stroke();
    // leaves in pairs
    const nl = 3 + Math.floor(hash(seed, 4) * 2), kind = Math.floor(hash(seed, 5) * 3);
    for (let i = 0; i < nl; i++) {
      const ly = -(0.25 + i * (1.1 / nl)) * s; if (-ly > sh) continue;
      const ls = (0.55 - i * 0.07) * s * clamp(spring((gr - 0.3 - i * 0.08) * 6, 'snappy'));
      for (const sd of [-1, 1]) {
        g.save(); g.translate(0.04 * s * (ly / -s), ly); g.rotate(sd * (0.9 - i * 0.12) - Math.PI / 2 * 0 ); g.scale(sd, 1);
        g.fillStyle = (i + (sd > 0 ? 1 : 0)) % 2 ? V.leaf : V.leaf2; g.strokeStyle = V.ink; g.lineWidth = 0.012 * s;
        g.beginPath(); g.moveTo(0, 0);
        if (kind === 0) { g.quadraticCurveTo(ls * 0.5, -ls * 0.42, ls, 0); g.quadraticCurveTo(ls * 0.5, ls * 0.32, 0, 0); }
        else if (kind === 1) { for (let k = 0; k <= 4; k++) g.quadraticCurveTo(ls * (k + 0.5) / 4.5, -ls * (k % 2 ? 0.4 : 0.15), ls * (k + 1) / 4.5, -ls * 0.05); g.quadraticCurveTo(ls * 0.5, ls * 0.3, 0, 0); }
        else { g.bezierCurveTo(ls * 0.2, -ls * 0.7, ls * 0.95, -ls * 0.5, ls * 0.8, 0); g.bezierCurveTo(ls * 0.7, ls * 0.3, ls * 0.2, ls * 0.2, 0, 0); }
        g.fill(); g.stroke();
        g.beginPath(); g.moveTo(0, 0); g.lineTo(ls * 0.8, -ls * 0.02); g.stroke();
        g.restore();
      }
    }
    // flower head
    if (flower) {
      const fp = clamp(spring((gr - 0.75) * 5, 'playful')), np = 5 + Math.floor(hash(seed, 6) * 4), fc = hash(seed, 7) > 0.5 ? V.blue : V.rust;
      g.save(); g.translate(0, -sh); g.scale(fp, fp);
      for (let k = 0; k < np; k++) { const a = -Math.PI / 2 + (k / (np - 1) - 0.5) * 2.6; g.save(); g.rotate(a + Math.PI / 2);
        g.fillStyle = fc; g.strokeStyle = V.ink; g.lineWidth = 0.012 * s; g.beginPath(); g.ellipse(0, -0.2 * s, 0.07 * s, 0.2 * s, 0, 0, 7); g.fill(); g.stroke(); g.restore(); }
      g.fillStyle = '#C9A44A'; g.beginPath(); g.arc(0, 0, 0.1 * s, 0, 7); g.fill(); g.stroke();
      g.restore();
    }
  }
  g.restore();
}
// zodiac / cosmological wheel. rot = slow rotation; p 0..1 build-in
export function zodiac(cx, cy, r, rot, p = 1, o = {}) {
  const { seed = 4 } = o;
  g.save(); g.translate(cx, cy); g.lineCap = 'round';
  // rings
  const rings = [1, 0.78, 0.5, 0.26];
  rings.forEach((k, i) => { const q = clamp(p * 1.4 - i * 0.12); if (q <= 0) return;
    g.strokeStyle = V.ink; g.lineWidth = 4 * u; g.beginPath(); g.arc(0, 0, r * k, -Math.PI / 2, -Math.PI / 2 + q * Math.PI * 2); g.stroke(); });
  g.save(); g.globalAlpha = clamp(p * 2 - 0.4);
  g.fillStyle = 'rgba(95,127,166,0.25)'; g.beginPath(); g.arc(0, 0, r, 0, 7); g.arc(0, 0, r * 0.78, 0, 7, true); g.fill();
  g.rotate(rot);
  // 12 sectors with glyph-words around the outer band
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    g.strokeStyle = V.ink; g.lineWidth = 3 * u; g.beginPath(); g.moveTo(Math.cos(a) * r * 0.5, Math.sin(a) * r * 0.5); g.lineTo(Math.cos(a) * r, Math.sin(a) * r); g.stroke();
    g.save(); g.rotate(a + Math.PI / 12 + Math.PI / 2); const wd = vword(seed * 7 + i).slice(0, 4); drawWord(wd, -wordW(wd, r * 0.07) / 2, -r * 0.86, r * 0.07); g.restore();
    // small figure in the middle band: head + robe, holding a star
    g.save(); g.rotate(a + Math.PI / 12); g.translate(r * 0.64, 0); g.rotate(Math.PI / 2);
    g.fillStyle = V.skin; g.strokeStyle = V.ink; g.lineWidth = 2 * u;
    g.beginPath(); g.arc(0, -r * 0.07, r * 0.035, 0, 7); g.fill(); g.stroke();
    g.fillStyle = i % 2 ? V.blue : V.rust; g.beginPath(); g.moveTo(-r * 0.05, r * 0.06); g.quadraticCurveTo(0, -r * 0.06, r * 0.05, r * 0.06); g.closePath(); g.fill(); g.stroke();
    g.restore();
    // stars
    const sa = a + Math.PI / 12 + 0.2; g.fillStyle = '#C9A44A'; g.beginPath(); star(Math.cos(sa) * r * 0.64, Math.sin(sa) * r * 0.64, r * 0.025); g.fill();
  }
  // central sun with wavy rays
  g.fillStyle = '#D9A441'; g.strokeStyle = V.ink; g.lineWidth = 3 * u;
  g.beginPath(); for (let k = 0; k <= 64; k++) { const a = (k / 64) * Math.PI * 2, rr = r * (0.2 + 0.035 * Math.sin(k * 1.57)); g.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } g.closePath(); g.fill(); g.stroke();
  g.fillStyle = '#F1D27A'; g.beginPath(); g.arc(0, 0, r * 0.13, 0, 7); g.fill(); g.stroke();
  g.restore();
  g.restore();
}
export function star(x, y, r) { for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r * 0.45 : r; g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } g.closePath(); }
// open book with two vellum pages
export function openBook(cx, cy, w, h, t, o = {}) {
  const { seed = 2, p = 1 } = o;
  g.save();
  g.fillStyle = '#5A3A22'; rrect(g, cx - w / 2 - 18 * u, cy - h / 2 - 14 * u, w + 36 * u, h + 34 * u, 14 * u); g.fill();
  vellum(cx - w / 2, cy - h / 2, w / 2, h, { seed });
  vellum(cx, cy - h / 2, w / 2, h, { seed: seed + 5 });
  const sg = g.createLinearGradient(cx - 40 * u, 0, cx + 40 * u, 0);
  sg.addColorStop(0, 'rgba(60,35,15,0)'); sg.addColorStop(0.5, 'rgba(60,35,15,0.45)'); sg.addColorStop(1, 'rgba(60,35,15,0)');
  g.fillStyle = sg; g.fillRect(cx - 40 * u, cy - h / 2, 80 * u, h);
  const pw = w / 2 - 60 * u;
  vtext(cx - w / 2 + 30 * u, cy - h / 2 + 50 * u, pw, 3, 16 * u, seed, p);
  plant(cx - w / 4, cy + h * 0.12, h * 0.26, { seed: seed + 1, grow: p * 1.3 });
  vtext(cx + 30 * u, cy - h / 2 + 50 * u, pw, 4, 16 * u, seed + 9, p);
  zodiac(cx + w / 4, cy + h * 0.15, h * 0.24, t * 0.1, p, { seed });
  g.restore();
}

// "bathing" section: green pools joined by pipes, figures shown head-and-shoulders above the water
export function pools(t, p = 1) {
  const P = [[260, 820, 300], [700, 760, 280], [470, 1180, 380]];
  g.save(); g.lineCap = 'round';
  // pipes (double stroke)
  const pipe = (pts, q) => { for (const [c, w] of [[V.ink, 46], [V.water, 34]]) { g.strokeStyle = c; g.lineWidth = w * u; g.beginPath();
    pts.forEach(([x, y], i) => (i ? g.lineTo(x * u, y * u) : g.moveTo(x * u, y * u))); g.stroke(); } };
  if (p > 0.1) { pipe([[260, 820], [260, 640], [520, 600], [700, 640], [700, 760]]); pipe([[700, 760], [820, 980], [600, 1180]]); pipe([[260, 820], [180, 1050], [350, 1180]]); }
  P.forEach(([x, y, w], i) => {
    const s = clamp(spring(p * 3 - i * 0.4, 'snappy')); if (s <= 0) return;
    g.save(); g.translate(x * u, y * u); g.scale(s, s);
    const n = i === 2 ? 4 : 2;
    for (let k = 0; k < n; k++) { const fx = (-w / 2 + (k + 0.5) * w / n) * u, bob = Math.sin(t * 2 + k + i) * 4 * u;
      g.fillStyle = V.skin; g.strokeStyle = V.ink; g.lineWidth = 3 * u;
      g.beginPath(); g.ellipse(fx, -10 * u + bob, 36 * u, 26 * u, 0, Math.PI, 0); g.fill(); g.stroke();
      g.beginPath(); g.arc(fx, -60 * u + bob, 22 * u, 0, 7); g.fill(); g.stroke();
      g.fillStyle = V.root; g.beginPath(); g.arc(fx, -70 * u + bob, 22 * u, Math.PI * 1.05, Math.PI * 1.95); g.fill(); }
    g.fillStyle = V.water; g.strokeStyle = V.ink; g.lineWidth = 4 * u;
    g.beginPath(); g.moveTo(-w / 2 * u, 0);
    for (let k = 0; k <= 12; k++) g.lineTo((-w / 2 + (k / 12) * w) * u, Math.sin(k * 1.3 + t * 3) * 5 * u);
    g.lineTo(w / 2 * u, 70 * u); g.quadraticCurveTo(0, 110 * u, -w / 2 * u, 70 * u); g.closePath(); g.fill(); g.stroke();
    g.restore(); });
  g.restore();
}
// apothecary jar
export function jar(x, y, s, seed) {
  const w = (0.5 + hash(seed, 1) * 0.25) * s, h = (1 + hash(seed, 2) * 0.4) * s, c = [V.blue, V.rust, V.leaf, '#C9A44A'][seed % 4];
  g.save(); g.translate(x, y); g.fillStyle = c; g.strokeStyle = V.ink; g.lineWidth = 3 * u;
  g.beginPath(); g.moveTo(-w / 2, 0); g.lineTo(-w / 2, -h * 0.8); g.quadraticCurveTo(0, -h * 1.05, w / 2, -h * 0.8); g.lineTo(w / 2, 0); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = V.vel2; g.fillRect(-w * 0.6, -h - 0.12 * s, w * 1.2, 0.14 * s); g.strokeRect(-w * 0.6, -h - 0.12 * s, w * 1.2, 0.14 * s);
  g.strokeStyle = 'rgba(255,240,210,0.6)'; g.beginPath(); for (let k = 1; k < 4; k++) { g.moveTo(-w / 2, -h * 0.2 * k); g.lineTo(w / 2, -h * 0.2 * k); } g.stroke();
  g.restore();
}
// gold coin seen at a slight angle
export function coin(x, y, r) {
  g.save(); g.fillStyle = '#B8892E'; g.beginPath(); g.ellipse(x, y + r * 0.12, r, r * 0.38, 0, 0, 7); g.fill();
  g.fillStyle = '#E2B54E'; g.beginPath(); g.ellipse(x, y, r, r * 0.38, 0, 0, 7); g.fill();
  g.strokeStyle = '#9A6F22'; g.lineWidth = 2 * u; g.beginPath(); g.ellipse(x, y, r * 0.75, r * 0.28, 0, 0, 7); g.stroke(); g.restore();
}
// cipher-cracking grid: glyph cells with a scanning head that tries latin letters
export function cipherGrid(cx, cy, cols, rows, cell, t, o = {}) {
  const { seed = 3, fail = 0 } = o;
  const x0 = cx - (cols * cell) / 2, y0 = cy - (rows * cell) / 2, head = Math.floor(t * 6);
  g.save();
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const i = r * cols + c, x = x0 + c * cell, y = y0 + r * cell, on = i === head % (cols * rows);
    g.fillStyle = on ? C.red : i % 2 ? '#F4EBD6' : V.vel; g.fillRect(x + 3 * u, y + 3 * u, cell - 6 * u, cell - 6 * u);
    const k = Math.floor(hash(i, seed) * 14);
    glyph(k, x + cell / 2 - GW[k] * cell * 0.22, y + cell * 0.62, cell * 0.44, on ? C.paper : V.ink, 0.1);
    const tried = i < head % (cols * rows) || head >= cols * rows;
    if (tried) text(g, 'ABCDEFGHIKLMNOPRSTUVZ'[Math.floor(hash(i, seed + Math.floor(t * 3)) * 21)], x + cell - 14 * u, y + 24 * u,
      { size: 18 * u, weight: 700, family: 'Inter, sans-serif', color: fail > 0 ? C.red : C.inkSoft, alpha: 0.85 });
  }
  g.strokeStyle = V.ink; g.lineWidth = 3 * u; g.strokeRect(x0, y0, cols * cell, rows * cell);
  g.restore();
}
// marble-panel library facade (stylised)
export function library(cx, base, w, h, color = '#D8CDB4') {
  g.save();
  g.fillStyle = '#6A5C48'; g.fillRect(cx - w / 2 - 20 * u, base - 18 * u, w + 40 * u, 18 * u);
  g.fillStyle = '#4A3F32'; for (let i = 0; i < 4; i++) g.fillRect(cx - w / 2 + (i + 0.5) * w / 4 - 8 * u, base - 140 * u, 16 * u, 122 * u);
  const top = base - 140 * u - h, n = 6, cw = w / n;
  g.fillStyle = '#9C8E74'; g.fillRect(cx - w / 2, top, w, h);
  for (let r = 0; r < Math.round(h / cw); r++) for (let c = 0; c < n; c++) {
    const x = cx - w / 2 + c * cw, y = top + r * cw;
    g.fillStyle = color; g.fillRect(x + 8 * u, y + 8 * u, cw - 16 * u, cw - 16 * u);
    g.fillStyle = 'rgba(200,160,80,0.25)'; g.beginPath(); g.arc(x + cw / 2, y + cw / 2, cw * 0.28, 0, 7); g.fill();
  }
  g.restore();
}
// envelope / folded letter
export function envelope(x, y, w, rot = 0) {
  const h = w * 0.62;
  g.save(); g.translate(x, y); g.rotate(rot);
  g.fillStyle = '#F2E6CA'; g.strokeStyle = V.ink; g.lineWidth = 3 * u; g.fillRect(-w / 2, -h / 2, w, h); g.strokeRect(-w / 2, -h / 2, w, h);
  g.beginPath(); g.moveTo(-w / 2, -h / 2); g.lineTo(0, h * 0.1); g.lineTo(w / 2, -h / 2); g.stroke();
  g.fillStyle = C.red; g.beginPath(); g.arc(0, h * 0.1, w * 0.07, 0, 7); g.fill();
  g.restore();
}

export default () => [
  // ---------------------------------------------------------------- hook
  { from: bar(0), to: bar(2), cues: [[0, 'impact', 0.9], [0.4, 'type', 0.5], [1.25, 'type', 0.4], [2.5, 'thump', 0.6]],
    draw(t) {
      g.fillStyle = '#2A1C10'; g.fillRect(0, 0, W, H);
      const z = track(t, [[0, 1.08], [0.01, 1]], 'heavy');
      g.save(); g.translate(W / 2, 860 * u); g.scale(z, z); g.translate(-W / 2, -860 * u);
      vellum(40 * u, 120 * u, W - 80 * u, 1460 * u, { seed: 11 });
      vtext(110 * u, 230 * u, W - 220 * u, 4, 30 * u, 3, remap(t, 0, 3.2));
      plant(TX + 20 * u, 1020 * u, 300 * u, { seed: 4, grow: remap(t, 0.2, 2.6) });
      vtext(110 * u, 1300 * u, W - 220 * u, 2, 30 * u, 8, remap(t, 1.4, 4.6));
      g.restore();
      g.fillStyle = 'rgba(30,20,10,0.86)'; g.fillRect(0, 1360 * u, W, 230 * u);
      say('หนังสือที่ไม่มีใครในโลก\nอ่านออก', TX, 1440 * u, t - 0.05, { size: 54 * u, weight: 800, color: C.cream });
      finish(0.6);
    } },
  { from: bar(2), to: bar(4), cues: [[0, 'thump', 0.6], [2.5, 'swish', 0.5]],
    draw(t) {
      paper();
      big('600 ปี', TX, 560 * u, t - 0.1, { size: 210 * u, color: C.red });
      say('แผ่นหนังที่ใช้เขียน มีอายุราว 600 ปี', TX, 700 * u, t - 0.6, { size: 44 * u, weight: 800, color: C.inkSoft });
      // a single line of script being written across
      g.save(); g.fillStyle = V.vel; g.fillRect(0, 880 * u, W, 200 * u); g.restore();
      vtext(80 * u, 1010 * u, W - 160 * u, 1, 52 * u, 21, remap(t, 0.3, 4.5));
      say('นักถอดรหัสพยายามมากว่า 100 ปี', TX, 1250 * u, t - 2.5, { size: 50 * u, weight: 800 });
      say('ยังไม่มีใครอ่านออกได้จริง', TX, 1350 * u, t - 3.0, { size: 56 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 470 * u, 90 * u, 14 * u); g.fill();
      text(g, 'BEINECKE MS 408 · YALE', 305 * u, 472 * u, { size: 28 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 2 * u });
      vtext(150 * u, 600 * u, W - 300 * u, 1, 26 * u, 31, 1, { color: 'rgba(90,59,34,0.55)' });
      g.restore();
      say('ต้นฉบับวอยนิช', TX, 760 * u, t - 0.25, { size: 80 * u, weight: 800 });
      text(g, 'The Voynich Manuscript', TX, 850 * u, { size: 46 * u, weight: 400, family: SERIF, color: C.inkSoft, alpha: clamp((t - 0.8) / 0.4) });
      stamp('UNREADABLE', TX, 1090 * u, t - 2.5, { size: 112 * u, rot: -0.1 });
      say('ได้ชื่อว่าเป็นหนังสือ\nที่ลึกลับที่สุดเล่มหนึ่งของโลก', TX, 1340 * u, t - 3.0, { size: 44 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------------------------------------------------------- what it is
  { from: bar(6), to: bar(9), cues: [[0.2, 'whoosh', 0.6], [2.5, 'pop', 0.7], [5.0, 'swish', 0.5]],
    draw(t) {
      paper();
      kicker('มันคืออะไร', TX, 300 * u, t);
      say('หนังสือเขียนด้วยมือ บนแผ่นหนังสัตว์', TX, 410 * u, t - 0.2, { size: 48 * u, weight: 800 });
      const s = clamp(spring(t - 0.3, 'heavy'));
      g.save(); g.translate(TX, 870 * u); g.scale(0.9 + 0.1 * s, 0.9 + 0.1 * s); g.globalAlpha = clamp(t / 0.3);
      openBook(0, 0, 840 * u, 560 * u, t, { seed: 6, p: remap(t, 0.4, 5) });
      g.restore();
      const n = Math.round(240 * clamp(spring(t - 2.5, 40, 13)));
      text(g, `${n}`, TX - 70 * u, 1340 * u, { size: 150 * u, weight: 400, family: SERIF, color: C.red, alpha: clamp((t - 2.5) / 0.2) });
      say('หน้า', TX + 150 * u, 1330 * u, t - 2.7, { size: 56 * u, weight: 800, color: C.red });
      say('ราว 240 หน้าที่เหลืออยู่ เต็มไปด้วยภาพวาด', TX, 1460 * u, t - 5.0, { size: 42 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(9), to: bar(11), cues: Array.from({ length: 8 }, (_, i) => [0.2 + i * 0.18, 'tick', 0.5]).concat([[2.5, 'thump', 0.6]]),
    draw(t) {
      paper();
      kicker('ตัวอักษร', TX, 300 * u, t);
      say('อักษรที่ไม่ตรงกับระบบใดที่รู้จัก', TX, 410 * u, t - 0.2, { size: 50 * u, weight: 800 });
      const ids = [12, 0, 11, 6, 9, 7, 8, 5, 3, 1, 2, 10];
      ids.forEach((k, i) => { const c = i % 4, r = Math.floor(i / 4), p = spring(t - 0.2 - i * 0.18, 'snappy'); if (p <= 0) return;
        const x = 150 * u + c * 200 * u, y = 560 * u + r * 220 * u;
        g.save(); g.translate(x + 85 * u, y + 95 * u); g.scale(p, p);
        g.fillStyle = V.vel; rrect(g, -85 * u, -95 * u, 170 * u, 190 * u, 12 * u); g.fill();
        g.strokeStyle = 'rgba(90,59,34,0.25)'; g.lineWidth = 2 * u; g.stroke();
        glyph(k, -GW[k] * 60 * u, 40 * u, 120 * u, V.ink, 0.09);
        g.restore(); });
      say('และไม่มีใครรู้ว่าเป็นภาษาอะไร', TX, 1340 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- herbal
  { from: bar(11), to: bar(14), cues: [[0.2, 'swish', 0.5], [2.0, 'pop', 0.5], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      vellum(110 * u, 560 * u, W - 220 * u, 920 * u, { seed: 21 });
      vtext(170 * u, 640 * u, W - 340 * u, 2, 22 * u, 41, remap(t, 0.2, 3));
      plant(TX + 20 * u, 1170 * u, 300 * u, { seed: 9, grow: remap(t, 0.3, 4.2) });
      kicker('ส่วนแรก · พืชสมุนไพร', TX, 300 * u, t);
      say('ภาพพืชเต็มหน้า ทั้งราก ใบ และดอก', TX, 410 * u, t - 0.2, { size: 48 * u, weight: 800 });
      say('แต่พืชส่วนใหญ่ ไม่ตรงกับพันธุ์ใดที่รู้จัก', TX, 1540 * u, t - 5.0, { size: 42 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(14), to: bar(16), cues: [[0.2, 'pop', 0.5], [0.6, 'pop', 0.5], [1.0, 'pop', 0.5], [2.5, 'thump', 0.6]],
    draw(t) {
      paper();
      [0, 1, 2].forEach((i) => {
        const x = 210 * u + i * 300 * u;
        vellum(x - 135 * u, 580 * u, 270 * u, 640 * u, { seed: 30 + i });
        plant(x, 1000 * u, 170 * u, { seed: 13 + i * 5, grow: remap(t, 0.1 + i * 0.4, 1.6 + i * 0.4) });
        stamp('?', x + 70 * u, 650 * u, t - 2.5 - i * 0.25, { size: 70 * u, rot: 0.1, pad: 0.4, seed: i + 3 });
      });
      kicker('นักพฤกษศาสตร์พยายามเทียบ', TX, 300 * u, t);
      say('บางต้นดูเหมือนเอาพืชหลายชนิด\nมาต่อรวมกัน', TX, 410 * u, t - 0.2, { size: 46 * u, weight: 800 });
      say('ยังไม่มีข้อสรุปที่ตรงกัน', TX, 1360 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- astronomy
  { from: bar(16), to: bar(18), cues: [[0.2, 'riser', 0.5], [2.5, 'chime', 0.5]],
    draw(t) {
      paper();
      vellum(90 * u, 560 * u, W - 180 * u, 760 * u, { seed: 41 });
      zodiac(TX + 24 * u, 940 * u, 340 * u, t * 0.12, remap(t, 0.1, 1.6), { seed: 5 });
      kicker('ส่วนที่สอง · ดาราศาสตร์', TX, 300 * u, t);
      say('วงล้อดวงดาวและจักรราศี', TX, 410 * u, t - 0.2, { size: 52 * u, weight: 800 });
      say('ดวงอาทิตย์ ดวงจันทร์ และผู้คนตัวเล็ก ๆ\nเรียงเป็นวงรอบดวงดาว', TX, 1420 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
];
