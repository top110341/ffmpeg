// Tham Luang cave rescue — Act 1: 0:00–0:45 (bars 0–18). Props for the whole film live here.
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, map, rain } from './kit.js';

export const GOLD = '#F2C14E', WATER = '#2C6E8E', ROCK = '#2A2420';
export const ease = (t, a, b) => { const x = clamp((t - a) / (b - a)); return x * x * (3 - 2 * x); };
const poly = (pts, s = u) => { g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x * s, y * s) : g.moveTo(x * s, y * s))); g.closePath(); };

// ---------------------------------------------------------------- people (generic icons — never a likeness)
// lit: 0 = grey/dim, 1 = warm and glowing
export function figure(x, y, s, o = {}) {
  const { lit = 0, color = '#4A5262' } = o;
  g.save(); g.translate(x, y); g.scale(s, s);
  if (lit > 0) { g.globalAlpha = 0.28 * lit; g.fillStyle = GOLD; g.beginPath(); g.arc(0, -0.55, 0.75, 0, 7); g.fill(); g.globalAlpha = 1; }
  g.fillStyle = lit > 0.5 ? GOLD : color;
  g.beginPath(); g.arc(0, -0.98, 0.2, 0, 7); g.fill();
  rrect(g, -0.27, -0.74, 0.54, 0.74, 0.2); g.fill();
  g.restore();
}
// cave diver seen from the side, swimming to +x. lamp: beam strength 0..1. t animates the fins.
export function diver(x, y, s, o = {}) {
  const { rot = 0, color = '#05070B', lamp = 1, t = 0, load = 0 } = o;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  if (lamp > 0) { g.globalAlpha = 0.2 * lamp; g.fillStyle = '#FFF2C4'; g.beginPath(); g.moveTo(0.66, -0.06); g.lineTo(2.4, -0.55); g.lineTo(2.4, 0.4); g.closePath(); g.fill(); g.globalAlpha = 1; }
  if (load) {   // a rescued person wrapped in a flexible stretcher, held alongside — no features, just a shape
    g.fillStyle = '#C9772E'; rrect(g, -0.15, 0.2, 0.95, 0.24, 0.12); g.fill();
    g.strokeStyle = '#3A2410'; g.lineWidth = 0.03; for (let k = 0; k < 4; k++) { g.beginPath(); g.moveTo(0.02 + k * 0.2, 0.2); g.lineTo(0.02 + k * 0.2, 0.44); g.stroke(); }
    g.fillStyle = '#1A1E26'; g.beginPath(); g.arc(0.86, 0.32, 0.13, 0, 7); g.fill();     // full-face mask
    g.strokeStyle = color; g.lineWidth = 0.06; g.beginPath(); g.moveTo(0.3, 0.05); g.lineTo(0.4, 0.22); g.stroke();
  }
  g.fillStyle = color; g.strokeStyle = color; g.lineCap = 'round';
  g.beginPath(); g.ellipse(0, 0, 0.5, 0.13, 0, 0, 7); g.fill();
  g.beginPath(); g.arc(0.6, -0.03, 0.13, 0, 7); g.fill();
  rrect(g, -0.38, -0.27, 0.62, 0.15, 0.07); g.fill();
  for (const k of [0, 1]) { const a = Math.sin(t * 6 + k * Math.PI) * 0.18;
    g.save(); g.translate(-0.45, 0.02); g.rotate(a); g.lineWidth = 0.1; g.beginPath(); g.moveTo(0, 0); g.lineTo(-0.42, 0); g.stroke();
    g.beginPath(); g.moveTo(-0.38, -0.03); g.lineTo(-0.72, -0.12); g.lineTo(-0.72, 0.1); g.lineTo(-0.38, 0.05); g.fill(); g.restore(); }
  g.lineWidth = 0.07; g.beginPath(); g.moveTo(0.3, 0.04); g.lineTo(0.78, 0.1 + Math.sin(t * 3) * 0.04); g.stroke();
  g.restore();
}
export function bike(x, y, s, color = C.ink) {
  g.save(); g.translate(x, y); g.scale(s, s); g.strokeStyle = color; g.lineWidth = 0.06; g.lineCap = 'round'; g.lineJoin = 'round';
  for (const sx of [-0.55, 0.55]) { g.beginPath(); g.arc(sx, 0, 0.36, 0, 7); g.stroke(); }
  g.beginPath(); g.moveTo(-0.55, 0); g.lineTo(-0.1, 0); g.lineTo(0.35, -0.5); g.lineTo(-0.3, -0.5); g.lineTo(-0.1, 0);
  g.moveTo(-0.3, -0.5); g.lineTo(-0.55, 0); g.moveTo(0.35, -0.5); g.lineTo(0.55, 0); g.moveTo(0.35, -0.5); g.lineTo(0.3, -0.7); g.lineTo(0.45, -0.72);
  g.moveTo(-0.32, -0.5); g.lineTo(-0.36, -0.62); g.moveTo(-0.46, -0.62); g.lineTo(-0.24, -0.62); g.stroke();
  g.restore();
}
export function candle(x, y, s, t) {
  const f = 1 + noise(t * 3, 4) * 0.12, sway = noise(t * 2, 8) * 0.06;
  g.save(); g.translate(x, y); g.scale(s, s);
  const gr = g.createRadialGradient(0, -1.25, 0.05, 0, -1.25, 1.6);
  gr.addColorStop(0, 'rgba(242,193,78,0.38)'); gr.addColorStop(1, 'rgba(242,193,78,0)');
  g.fillStyle = gr; g.beginPath(); g.arc(0, -1.25, 1.6, 0, 7); g.fill();
  g.fillStyle = '#EFE6D2'; rrect(g, -0.16, -1.0, 0.32, 1.0, 0.04); g.fill();
  g.fillStyle = '#D8CDB4'; g.fillRect(0.06, -1.0, 0.1, 1.0);
  g.fillStyle = '#FFE7A8'; g.beginPath(); g.ellipse(sway, -1.22 * 1, 0.08, 0.2 * f, sway, 0, 7); g.fill();
  g.fillStyle = '#FFFFFF'; g.beginPath(); g.ellipse(sway * 0.5, -1.17, 0.035, 0.08 * f, 0, 0, 7); g.fill();
  g.restore();
}
function star(x, y, r, color) {
  g.fillStyle = color; g.beginPath();
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.42 : r; g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
  g.closePath(); g.fill();
}
// plain-colour flags as chips (no emblems beyond simple stars/discs)
export function flag(code, x, y, w, h) {
  g.save(); rrect(g, x, y, w, h, 8 * u); g.clip();
  const band = (cols) => cols.forEach(([c, a, b]) => { g.fillStyle = c; g.fillRect(x, y + a * h, w, (b - a) * h); });
  const uk = (X, Y, ww, hh) => { g.save(); g.beginPath(); g.rect(X, Y, ww, hh); g.clip(); g.fillStyle = '#1F3A73'; g.fillRect(X, Y, ww, hh);
    const ln = (c, lw) => { g.strokeStyle = c; g.lineWidth = lw; g.beginPath(); g.moveTo(X, Y); g.lineTo(X + ww, Y + hh); g.moveTo(X + ww, Y); g.lineTo(X, Y + hh); g.stroke(); };
    ln('#FFFFFF', hh * 0.2); ln('#C8102E', hh * 0.07);
    g.fillStyle = '#FFFFFF'; g.fillRect(X + ww / 2 - hh * 0.17, Y, hh * 0.34, hh); g.fillRect(X, Y + hh * 0.33, ww, hh * 0.34);
    g.fillStyle = '#C8102E'; g.fillRect(X + ww / 2 - hh * 0.1, Y, hh * 0.2, hh); g.fillRect(X, Y + hh * 0.4, ww, hh * 0.2); g.restore(); };
  if (code === 'uk') uk(x, y, w, h);
  if (code === 'us') { for (let i = 0; i < 13; i++) { g.fillStyle = i % 2 ? '#FFFFFF' : '#B22234'; g.fillRect(x, y + (i * h) / 13, w, h / 13 + 1); }
    g.fillStyle = '#3C3B6E'; g.fillRect(x, y, w * 0.42, (h * 7) / 13);
    g.fillStyle = '#FFFFFF'; for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) { g.beginPath(); g.arc(x + w * (0.05 + c * 0.08), y + h * (0.07 + r * 0.12), 3 * u, 0, 7); g.fill(); } }
  if (code === 'au') { g.fillStyle = '#1F3A73'; g.fillRect(x, y, w, h); uk(x, y, w / 2, h / 2); star(x + w * 0.25, y + h * 0.75, h * 0.13, '#FFF');
    [[0.75, 0.2], [0.62, 0.48], [0.88, 0.42], [0.75, 0.82], [0.8, 0.6]].forEach(([a, b], i) => star(x + w * a, y + h * b, h * (i === 4 ? 0.04 : 0.07), '#FFF')); }
  if (code === 'cn') { g.fillStyle = '#DE2910'; g.fillRect(x, y, w, h); star(x + w * 0.17, y + h * 0.27, h * 0.16, '#FFDE00');
    [[0.33, 0.1], [0.4, 0.2], [0.4, 0.35], [0.33, 0.45]].forEach(([a, b]) => star(x + w * a, y + h * b, h * 0.055, '#FFDE00')); }
  if (code === 'jp') { g.fillStyle = '#FFFFFF'; g.fillRect(x, y, w, h); g.fillStyle = '#BC002D'; g.beginPath(); g.arc(x + w / 2, y + h / 2, h * 0.3, 0, 7); g.fill(); }
  if (code === 'la') { band([['#CE1126', 0, 0.25], ['#002868', 0.25, 0.75], ['#CE1126', 0.75, 1]]); g.fillStyle = '#FFFFFF'; g.beginPath(); g.arc(x + w / 2, y + h / 2, h * 0.2, 0, 7); g.fill(); }
  if (code === 'mm') { band([['#FECB00', 0, 0.34], ['#34B233', 0.33, 0.67], ['#EA2839', 0.66, 1]]); star(x + w / 2, y + h * 0.54, h * 0.34, '#FFFFFF'); }
  g.restore();
  g.strokeStyle = 'rgba(22,19,15,0.35)'; g.lineWidth = 2 * u; rrect(g, x, y, w, h, 8 * u); g.stroke();
}
// semicircular gauge; v and the scale are in % oxygen
export function gauge(x, y, r, v, o = {}) {
  const { lo = 10, hi = 25, danger = 16 } = o;
  const ang = (val) => Math.PI + clamp((val - lo) / (hi - lo)) * Math.PI;
  g.save(); g.lineCap = 'butt';
  g.lineWidth = 46 * u; g.strokeStyle = C.night3; g.beginPath(); g.arc(x, y, r, Math.PI, 0); g.stroke();
  g.strokeStyle = C.red; g.beginPath(); g.arc(x, y, r, Math.PI, ang(danger)); g.stroke();
  g.strokeStyle = '#3E7C5A'; g.beginPath(); g.arc(x, y, r, ang(19.5), ang(23.5)); g.stroke();
  for (let k = lo; k <= hi; k++) { const a = ang(k), L = k % 5 === 0 ? 40 : 18; g.strokeStyle = C.cream; g.lineWidth = 3 * u;
    g.beginPath(); g.moveTo(x + Math.cos(a) * (r - 30 * u), y + Math.sin(a) * (r - 30 * u)); g.lineTo(x + Math.cos(a) * (r - 30 * u - L * u), y + Math.sin(a) * (r - 30 * u - L * u)); g.stroke();
    if (k % 5 === 0) text(g, `${k}`, x + Math.cos(a) * (r - 105 * u), y + Math.sin(a) * (r - 105 * u) + 12 * u, { size: 34 * u, weight: 700, family: 'Inter, sans-serif', color: C.fog }); }
  const a = ang(v); g.strokeStyle = C.cream; g.lineWidth = 9 * u; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * (r - 40 * u), y + Math.sin(a) * (r - 40 * u)); g.stroke();
  g.fillStyle = C.cream; g.beginPath(); g.arc(x, y, 18 * u, 0, 7); g.fill();
  g.restore();
}

// ---------------------------------------------------------------- water
export function water(y0, t, o = {}) {
  const { color = 'rgba(44,110,142,0.92)', line = 'rgba(180,210,225,0.45)' } = o;
  g.save(); g.fillStyle = color;
  g.beginPath(); g.moveTo(0, H);
  for (let x = 0; x <= W + 20 * u; x += 20 * u) g.lineTo(x, y0 + Math.sin(x / (60 * u) + t * 2) * 6 * u);
  g.lineTo(W, H); g.closePath(); g.fill();
  g.strokeStyle = line; g.lineWidth = 3 * u;
  for (let r = 0; r < 3; r++) { g.beginPath(); for (let x = 0; x <= W + 20 * u; x += 20 * u) { const yy = y0 + r * 40 * u + 12 * u + Math.sin(x / (45 * u) + t * (2.5 + r) + r) * 4 * u; x ? g.lineTo(x, yy) : g.moveTo(x, yy); } g.globalAlpha = 1 - r * 0.3; g.stroke(); }
  g.restore();
}

// ---------------------------------------------------------------- inside the cave: a chamber with a ledge
export const LEDGE = Array.from({ length: 13 }, (_, i) => [205 + i * 52 + (i % 2) * 6, 1232 - (i % 3) * 4]);
export function caveRoom(t, o = {}) {
  const { level = 1700, lit = 0, beam = 0 } = o;
  night('#05070B');
  g.fillStyle = '#14171C';
  g.beginPath(); g.moveTo(0, 0);
  for (let i = 0; i <= 18; i++) { const x = (i / 18) * W, y = (120 + hash(i, 31) * 90 + (i % 3 === 1 ? 140 * hash(i, 32) : 0)) * u; g.lineTo(x, y); }
  g.lineTo(W, 0); g.fill();
  poly([[0, 300], [90, 520], [60, 900], [150, 1250], [0, 1500]]); g.fill();
  poly([[1080, 260], [960, 600], [1010, 1000], [930, 1260], [1080, 1500]]); g.fill();
  g.fillStyle = '#1D2026'; poly([[150, 1300], [190, 1240], [400, 1225], [640, 1232], [880, 1246], [920, 1300], [920, 1360], [150, 1360]]); g.fill();
  if (beam > 0) { g.save(); g.globalAlpha = 0.16 * beam; g.fillStyle = '#FFF2C4'; poly([[0, 1060], [1080, 1080], [1080, 1330]]); g.fill(); g.restore(); }
  LEDGE.forEach(([x, y], i) => figure(x * u, y * u, 44 * u, { lit: clamp(lit * 13 - i), color: '#3A404C' }));
  water(level * u, t);
}

// ---------------------------------------------------------------- flooded passage (side view, fills the frame)
export function passage(t, o = {}) {
  const { lineY = 960 } = o;
  g.fillStyle = '#17485A'; g.fillRect(0, 0, W, H);
  g.fillStyle = '#05080C';
  g.beginPath(); g.moveTo(0, 0); g.lineTo(W, 0);
  for (let i = 20; i >= 0; i--) g.lineTo((i / 20) * W, (600 + noise(i * 0.7, 3) * 70) * u);
  g.fill();
  g.beginPath(); g.moveTo(0, H); g.lineTo(W, H);
  for (let i = 20; i >= 0; i--) g.lineTo((i / 20) * W, (1340 + noise(i * 0.7, 9) * 70) * u);
  g.fill();
  // drifting silt
  g.fillStyle = 'rgba(160,190,200,0.25)';
  for (let i = 0; i < 70; i++) { const x = ((hash(i, 41) * W - t * 30 * u * (0.5 + hash(i, 42))) % W + W) % W, y = (640 + hash(i, 43) * 680) * u + Math.sin(t + i) * 8 * u; g.beginPath(); g.arc(x, y, (1.5 + hash(i, 44) * 3) * u, 0, 7); g.fill(); }
  // the guideline
  g.strokeStyle = GOLD; g.lineWidth = 3 * u; g.beginPath(); g.moveTo(0, lineY * u);
  for (let x = 0; x <= W; x += 30 * u) g.lineTo(x, lineY * u + Math.sin(x / (180 * u)) * 26 * u); g.stroke();
}
export const lineAt = (x, lineY = 960) => lineY * u + Math.sin(x / (180 * u)) * 26 * u;

// ---------------------------------------------------------------- the cave in cross-section (schematic, not to scale)
export const CAVE = [[50, 820], [150, 850], [250, 900], [330, 915], [420, 990], [500, 1170], [580, 1240], [660, 1200], [720, 1130], [780, 1112], [830, 1150], [880, 1070], [940, 1062]];
export const SPOT = { mouth: 0, ch3: 3, pattaya: 9, ledge: 11 };
const TOP = [[0, 840], [90, 760], [200, 650], [320, 690], [450, 580], [560, 620], [690, 560], [820, 630], [950, 600], [1080, 660]];
export const cavePts = () => CAVE.map(([x, y]) => [x * u, y * u]);
// frac along the cave polyline → [x, y]
export function caveAt(p) { const h = path(cavePts(), p, { width: 0 }); return [h.x, h.y]; }
export function caveSection(t, o = {}) {
  const { level = 1700, labels = 0, line = 0, sky = '#0B111B' } = o;
  night(sky);
  g.fillStyle = ROCK; g.beginPath(); TOP.forEach(([x, y], i) => (i ? g.lineTo(x * u, y * u) : g.moveTo(x * u, y * u))); g.lineTo(W, H); g.lineTo(0, H); g.closePath(); g.fill();
  // jungle fringe on the ridge
  g.fillStyle = '#1C2A1C';
  for (let i = 0; i < 40; i++) { const x = (i / 39) * W, k = Math.min(TOP.length - 2, Math.floor(x / (120 * u))), [x0, y0] = TOP[k], [x1, y1] = TOP[k + 1];
    const y = (y0 + (y1 - y0) * ((x / u - x0) / (x1 - x0))) * u; g.beginPath(); g.arc(x, y + 6 * u, (14 + hash(i, 61) * 14) * u, 0, 7); g.fill(); }
  g.strokeStyle = 'rgba(0,0,0,0.25)'; g.lineWidth = 2 * u;
  for (let i = 0; i < 14; i++) { const y = (760 + i * 60) * u; g.beginPath(); g.moveTo(0, y); for (let x = 0; x <= W; x += 60 * u) g.lineTo(x, y + noise(x / (200 * u), i) * 20 * u); g.stroke(); }
  const P = cavePts();
  const tunnel = (col) => { g.strokeStyle = col; g.fillStyle = col; g.lineWidth = 64 * u; g.lineJoin = 'round'; g.lineCap = 'round';
    g.beginPath(); P.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke();
    for (const k of [SPOT.ch3, SPOT.pattaya, SPOT.ledge]) { g.beginPath(); g.ellipse(P[k][0], P[k][1] - 10 * u, 62 * u, 44 * u, 0, 0, 7); g.fill(); } };
  tunnel('#06080C');
  g.save(); g.beginPath(); g.rect(0, level * u, W, H); g.clip(); tunnel('#2C6E8E'); g.restore();
  if (line > 0) path(P, line, { color: GOLD, width: 4 * u });
  if (labels > 0) {
    const lab = (k, s, dy, al = 'center') => { const [x, y] = P[k]; g.save(); g.globalAlpha = clamp(labels);
      g.strokeStyle = C.cream; g.lineWidth = 2 * u; g.beginPath(); g.moveTo(x, y + (dy < 0 ? -40 : 40) * u); g.lineTo(x, y + dy * u * 0.72); g.stroke();
      text(g, s, x, y + dy * u, { size: 32 * u, weight: 800, family: THAI, color: C.cream, align: al }); g.restore(); };
    lab(SPOT.mouth, 'ปากถ้ำ', -120, 'left'); lab(SPOT.ch3, 'โถง 3', -120); lab(SPOT.pattaya, 'หาดพัทยา', 150); lab(SPOT.ledge, 'จุดที่พบ', -130, 'right');
  }
  return P;
}
export const schematicNote = (y = 1560) => text(g, 'ภาพตัดขวางโดยประมาณ · ไม่ตามสัดส่วนจริง', TX, y * u, { size: 28 * u, weight: 700, family: THAI, color: C.fog });

// ---------------------------------------------------------------- the cave mouth under Doi Nang Non
export function caveMouth(t, o = {}) {
  const { dark = 0 } = o;
  g.fillStyle = dark ? '#070A10' : '#D5DCC8'; g.fillRect(0, 0, W, H);
  g.fillStyle = dark ? '#0D131B' : '#9DAD8E'; poly([[0, 900], [200, 760], [420, 820], [640, 690], [880, 790], [1080, 740], [1080, 1200], [0, 1200]]); g.fill();
  g.fillStyle = dark ? '#141A21' : '#5F6B4F'; poly([[-20, 1500], [0, 860], [180, 740], [360, 680], [560, 640], [760, 690], [960, 760], [1100, 820], [1100, 1500]]); g.fill();
  g.fillStyle = dark ? '#0F1418' : '#46533A';
  for (let i = 0; i < 26; i++) { const x = (i / 25) * W, y = (720 + Math.abs(i - 12) * 9 + hash(i, 71) * 40) * u; g.beginPath(); g.arc(x, y, (30 + hash(i, 72) * 30) * u, 0, 7); g.fill(); }
  g.fillStyle = '#040506'; g.beginPath(); g.moveTo(300 * u, 1330 * u); g.quadraticCurveTo(300 * u, 930 * u, 540 * u, 920 * u); g.quadraticCurveTo(780 * u, 930 * u, 790 * u, 1330 * u); g.closePath(); g.fill();
  g.fillStyle = dark ? '#0A0D11' : '#8A7B5C'; g.fillRect(0, 1320 * u, W, H - 1320 * u);
}
export const BIKES = [[180, 1440], [330, 1470], [470, 1430], [620, 1475], [760, 1440], [880, 1480]];

// ---------------------------------------------------------------- Thailand map (rough outlines, fine at this zoom)
const TH = [[20.45, 99.95], [20.35, 100.1], [19.6, 100.5], [18.3, 101.1], [17.9, 102.6], [18.2, 103.4], [17.4, 104.8], [16.0, 105.5], [15.3, 105.5], [14.4, 105.1], [14.3, 103.0], [13.4, 102.4],
  [12.2, 102.8], [12.6, 101.4], [13.4, 100.95], [13.5, 100.5], [13.3, 100.0], [12.5, 99.97], [11.0, 99.5], [10.0, 99.2], [9.2, 99.9], [8.4, 100.3], [7.2, 100.6], [6.4, 101.3], [6.0, 102.0],
  [5.8, 101.6], [6.5, 100.6], [6.5, 100.1], [7.3, 99.6], [8.0, 98.4], [9.0, 98.3], [10.0, 98.5], [11.6, 99.6], [12.6, 99.2], [14.0, 99.0], [15.3, 98.6], [16.5, 98.5], [17.7, 97.8], [18.6, 97.7],
  [19.7, 98.2], [19.8, 98.9], [20.2, 99.5]];
const NEI = [[24, 94], [28, 97], [27, 104], [22.5, 106.5], [21, 107.5], [17, 107], [12.5, 109.3], [10.4, 106.8], [8.7, 104.9], [10.5, 104.2], [11.6, 103.1], [12.2, 102.8], [13.4, 102.4], [14.3, 103.0],
  [14.4, 105.1], [15.3, 105.5], [16.0, 105.5], [17.4, 104.8], [18.2, 103.4], [17.9, 102.6], [18.3, 101.1], [19.6, 100.5], [20.35, 100.1], [20.45, 99.95], [20.2, 99.5], [19.8, 98.9], [19.7, 98.2],
  [18.6, 97.7], [17.7, 97.8], [16.5, 98.5], [15.3, 98.6], [14.0, 99.0], [12.6, 99.2], [11.6, 99.6], [10.0, 98.5], [12, 98.6], [14, 98], [16, 97.6], [16.5, 94.5], [20, 93], [22, 92.5]];
const MAL = [[6.5, 100.1], [6.5, 100.6], [5.8, 101.6], [6.0, 102.0], [5.5, 102.6], [4, 103.4], [2, 104.2], [1.3, 103.6], [2.5, 101.5], [4, 100.6], [5.5, 100.3]];
export const PL = { thamluang: [20.38, 99.87], maesai: [20.43, 99.88], chiangrai: [19.91, 99.84], bangkok: [13.75, 100.5] };
export function mapTH(cam) {
  const P = map(cam, { lands: [NEI, MAL], grid: 5, land: '#16202F' });
  g.beginPath(); TH.forEach((p, i) => { const [x, y] = P(p); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.closePath();
  g.fillStyle = '#34486A'; g.fill(); g.strokeStyle = C.cream; g.globalAlpha = 0.7; g.lineWidth = 3 * u; g.stroke(); g.globalAlpha = 1;
  return P;
}

export default () => [
  // ---------------- hook
  { from: bar(0), to: bar(2), cues: [[0, 'impact', 0.9], [0.4, 'riser', 0.4], [2.5, 'pop', 0.5], [3.75, 'thump', 0.6]],
    draw(t) {
      caveRoom(t, { level: 1600 - 270 * ease(t, 0, 3.5), lit: remap(t, 2.4, 3.6), beam: clamp((t - 2.2) / 0.4) });
      big('13 ชีวิต', TX, 430 * u, t - 0.05, { size: 170 * u, color: C.cream });
      say('ติดอยู่ลึกใต้ภูเขา ในถ้ำที่น้ำท่วม', TX, 580 * u, t - 0.6, { size: 48 * u, weight: 800, color: C.cream });
      say('นานถึง 18 วัน', TX, 690 * u, t - 2.5, { size: 64 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(2), to: bar(4), cues: [[0, 'whoosh', 0.5], [2.5, 'swish', 0.5]],
    draw(t) {
      passage(t);
      const x = (-150 + 1150 * clamp(t / 5)) * u;
      diver(x, lineAt(x) - 60 * u, 190 * u, { t, lamp: 1 });
      say('ทางออกเดียวคือ ดำน้ำ', TX, 340 * u, t - 0.1, { size: 64 * u, weight: 800, color: C.cream });
      say('ผ่านโพรงน้ำขุ่น มืดสนิท หลายช่วง', TX, 460 * u, t - 0.8, { size: 46 * u, weight: 800, color: C.fog });
      say('บางคนว่ายน้ำไม่เป็น\nและไม่มีใครเคยดำน้ำมาก่อน', TX, 1460 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 500 * u, 90 * u, 14 * u); g.fill();
      text(g, 'CHIANG RAI · 23.06.2018', 320 * u, 472 * u, { size: 28 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 2 * u });
      g.restore();
      say('ภารกิจกู้ภัยถ้ำหลวง', TX, 760 * u, t - 0.25, { size: 76 * u, weight: 800 });
      stamp('TRAPPED', TX, 1080 * u, t - 2.5, { size: 140 * u, rot: -0.1 });
      say('ปฏิบัติการที่คนทั้งโลกเฝ้ารอข่าว', TX, 1380 * u, t - 3.0, { size: 46 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------- where
  { from: bar(6), to: bar(9), cues: [[0.2, 'whoosh', 0.6], [1.0, 'pop', 0.5], [3.75, 'whoosh', 0.6], [5.0, 'pop', 0.8]],
    draw(t) {
      const cam = { lat: track(t, [[0, 13], [3.75, 19.2]], 'heavy'), lon: track(t, [[0, 101], [3.75, 100.2]], 'heavy'), z: track(t, [[0, 70], [3.75, 210]], 'heavy') * u };
      const P = mapTH(cam); topScrim();
      if (t < 3.6) pin(...P(PL.bangkok), t - 1.0, { label: 'กรุงเทพฯ', side: 1, color: C.fog });
      if (t > 4.2) { pin(...P(PL.chiangrai), t - 4.2, { label: 'ตัวเมืองเชียงราย', side: 1, color: C.fog });
        pin(...P(PL.thamluang), t - 5.0, { label: 'ถ้ำหลวง · อ.แม่สาย', side: -1 });
        text(g, 'เมียนมา', P([20.95, 99.0])[0], P([20.95, 99.0])[1], { size: 34 * u, weight: 700, family: THAI, color: C.fog, alpha: clamp((t - 4.5) / 0.4) }); }
      kicker('จังหวัดเชียงราย · เหนือสุดของไทย', TX, 250 * u, t, { color: C.red });
      say('ถ้ำหลวงนางนอน', TX, 345 * u, t - 0.3, { size: 54 * u, weight: 800, color: C.cream });
      say('ถ้ำยาวราว 10 กม. ใต้ดอยนางนอน\nใกล้ชายแดนเมียนมา', TX, 1440 * u, t - 5.5, { size: 44 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(9), to: bar(10), cues: Array.from({ length: 5 }, (_, i) => [i * 0.15, 'tick', 0.6]).concat([[1.0, 'thump', 0.6]]),
    draw(t) {
      paper(); kicker('มิถุนายน 2018', TX, 420 * u, t);
      const d = ['19', '20', '21', '22', '23'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.15), t, { size: 360 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('วันเสาร์ หลังซ้อมฟุตบอล', TX, 1240 * u, t - 1.0, { size: 56 * u, weight: 800 });
      finish(0.6);
    } },
  // ---------------- the team
  { from: bar(10), to: bar(13), cues: Array.from({ length: 12 }, (_, i) => [0.3 + i * 0.12, 'pop', 0.25]).concat([[3.75, 'thump', 0.6], [5.0, 'pop', 0.7]]),
    draw(t) {
      paper();
      kicker('ทีมฟุตบอล “หมูป่าอะคาเดมี”', TX, 300 * u, t);
      say('นักเตะเยาวชน 12 คน อายุ 11–16 ปี', TX, 410 * u, t - 0.2, { size: 50 * u, weight: 800 });
      for (let i = 0; i < 12; i++) { const s = spring(t - 0.3 - i * 0.12, 'playful'); if (s <= 0) continue;
        const c = i % 6, r = Math.floor(i / 6); figure((170 + c * 140 + r * 40) * u, (760 + r * 230) * u, 120 * u * s, { color: C.inkSoft }); }
      const sc = spring(t - 3.75, 'playful');
      if (sc > 0) figure(870 * u, 1000 * u, 150 * u * sc, { color: C.red });
      say('กับผู้ช่วยโค้ชวัย 25 ปี', TX, 1240 * u, t - 3.75, { size: 52 * u, weight: 800 });
      say('เอกพล จันทะวงษ์ · “โค้ชเอก”', TX, 1350 * u, t - 5.0, { size: 52 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(13), to: bar(15), cues: BIKES.map((_, i) => [0.4 + i * 0.3, 'click', 0.5]).concat([[3.0, 'thump', 0.5]]),
    draw(t) {
      caveMouth(t);
      BIKES.forEach(([x, y], i) => { const s = spring(t - 0.4 - i * 0.3, 'snappy'); if (s > 0) bike(x * u, y * u, 90 * u * s, '#2A2A22'); });
      g.fillStyle = 'rgba(239,230,210,0.88)'; g.fillRect(0, 200 * u, W, 330 * u);
      kicker('หลังซ้อมเสร็จ', TX, 290 * u, t);
      say('ปั่นจักรยานไปเที่ยวถ้ำหลวง\nจอดไว้หน้าถ้ำ แล้วเดินเข้าไป', TX, 400 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.ink });
      finish(0.5);
    } },
  // ---------------- the flood
  { from: bar(15), to: bar(18), cues: [[0, 'whoosh', 0.5], [2.5, 'riser', 0.5], [5.0, 'impact', 0.8]],
    draw(t) {
      const lv = 1300 - 205 * ease(t, 1, 6.5);
      caveSection(t, { level: lv });
      rain(t, { n: 120, alpha: 0.4, color: '#9FB3C8' });
      const p = 0.3 + 0.6 * ease(t, 1, 6.5);
      for (let i = 0; i < 13; i++) { const [x, y] = caveAt(clamp(p - i * 0.012)); g.fillStyle = GOLD; g.beginPath(); g.arc(x, y + (hash(i, 3) - 0.5) * 18 * u, 6 * u, 0, 7); g.fill(); }
      kicker('ฝนมรสุมเทลงมา', TX, 250 * u, t, { color: C.red });
      say('น้ำทะลักท่วมทางออก\nด้านหลังพวกเขา', TX, 350 * u, t - 0.2, { size: 52 * u, weight: 800, color: C.cream });
      say('ทั้งทีมต้องถอยลึกเข้าไปเรื่อย ๆ', TX, 1440 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.cream });
      schematicNote();
      finish(0.8);
    } },
];
