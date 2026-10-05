// Antwerp Diamond Heist — Act 1: 0:00–1:25 (bars 0–34). Helpers for both acts live at the top.
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, map, forest } from './kit.js';

// ---------------------------------------------------------------- props
export const ICE = '#BFD9E6', STEEL = '#8B93A0', STEEL2 = '#5B6270';
// 4-point star glint
export function sparkle(x, y, r, a = 1) {
  if (r <= 0 || a <= 0) return;
  g.save(); g.globalAlpha = clamp(a); g.fillStyle = '#FFFFFF'; g.beginPath();
  g.moveTo(x, y - r); g.quadraticCurveTo(x, y, x + r, y); g.quadraticCurveTo(x, y, x, y + r);
  g.quadraticCurveTo(x, y, x - r, y); g.quadraticCurveTo(x, y, x, y - r); g.fill(); g.restore();
}
// brilliant-cut diamond, side view; s = width in px; glint 0..1
export function gem(x, y, s, o = {}) {
  const { rot = 0, glint = 0, red = false } = o;
  const F = red ? ['#F6C9BF', '#E07A64', '#C8321E', '#F0A898', '#9E2414'] : ['#F3FAFD', '#CFE3EE', '#A9C8DA', '#E2EFF6', '#8FB4CC'];
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  const poly = (pts, c) => { g.beginPath(); pts.forEach(([a, b], i) => (i ? g.lineTo(a, b) : g.moveTo(a, b))); g.closePath(); g.fillStyle = c; g.fill(); };
  poly([[-0.5, 0], [-0.28, -0.22], [-0.1, -0.22], [-0.2, 0]], F[1]);
  poly([[-0.2, 0], [-0.1, -0.22], [0.1, -0.22], [0.2, 0]], F[0]);
  poly([[0.2, 0], [0.1, -0.22], [0.28, -0.22], [0.5, 0]], F[2]);
  poly([[-0.5, 0], [-0.2, 0], [0, 0.55]], F[3]);
  poly([[-0.2, 0], [0.2, 0], [0, 0.55]], F[1]);
  poly([[0.2, 0], [0.5, 0], [0, 0.55]], F[4]);
  g.strokeStyle = 'rgba(255,255,255,0.7)'; g.lineWidth = 0.014; g.lineJoin = 'round';
  g.beginPath(); g.moveTo(-0.5, 0); g.lineTo(-0.28, -0.22); g.lineTo(0.28, -0.22); g.lineTo(0.5, 0); g.lineTo(0, 0.55); g.closePath(); g.moveTo(-0.5, 0); g.lineTo(0.5, 0); g.stroke();
  g.restore();
  sparkle(x + s * 0.18, y - s * 0.16, s * 0.4 * glint, glint);
}
export const glintAt = (t, i) => Math.pow(Math.max(0, Math.sin(t * 2.6 + i * 2.1)), 10);
// a scatter of gems on the floor
export function gemPile(cx, cy, n, s, t, o = {}) {
  const { spread = 300, seed = 3, rise = 1 } = o;
  for (let i = 0; i < n; i++) {
    const a = hash(i, seed) * Math.PI * 2, r = Math.sqrt(hash(i, seed + 1)) * spread * u;
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r * 0.45 + (1 - rise) * 200 * u;
    gem(x, y, s * (0.6 + hash(i, seed + 2) * 0.6), { rot: (hash(i, seed + 3) - 0.5) * 1.2, glint: glintAt(t, i) });
  }
}

// safe-deposit box wall; isOpen(i) → 0..1 door swing
export function boxWall(x0, y0, cols, rows, cw, ch, isOpen, t = 0) {
  for (let i = 0; i < cols * rows; i++) {
    const x = x0 + (i % cols) * cw, y = y0 + Math.floor(i / cols) * ch, p = clamp(isOpen(i));
    g.fillStyle = STEEL2; g.fillRect(x, y, cw - 3 * u, ch - 3 * u);
    if (p > 0) {
      g.fillStyle = '#07090C'; g.fillRect(x + 3 * u, y + 3 * u, cw - 9 * u, ch - 9 * u);
      if (hash(i, 41) > 0.55) sparkle(x + cw * 0.5, y + ch * 0.55, Math.min(cw, ch) * 0.22 * glintAt(t, i), 0.9);
      const dw = (cw - 3 * u) * (1 - p * 0.75);       // door swung open toward the viewer-left
      g.fillStyle = '#A8B0BC'; g.beginPath(); g.moveTo(x, y); g.lineTo(x - dw * 0.35 * p, y - 4 * u * p); g.lineTo(x - dw * 0.35 * p, y + ch - 3 * u + 4 * u * p); g.lineTo(x, y + ch - 3 * u); g.closePath(); g.fill();
    } else {
      g.fillStyle = STEEL; g.fillRect(x + 3 * u, y + 3 * u, cw - 9 * u, ch - 9 * u);
      g.fillStyle = '#2B3038'; g.beginPath(); g.arc(x + cw * 0.72, y + ch * 0.5, Math.min(cw, ch) * 0.09, 0, 7); g.fill();
    }
  }
}
// fixed opening order for a 160-box wall (shuffled once, deterministically)
export const ORDER = (() => { const ix = Array.from({ length: 160 }, (_, i) => i).sort((a, b) => hash(a, 909) - hash(b, 909)); const r = []; ix.forEach((b, k) => (r[b] = k)); return r; })();

// round vault door with combination dial; open 0..1 swings it aside
export function vaultDoor(x, y, R, t, o = {}) {
  const { open = 0, dial = 0 } = o;
  g.save();
  g.fillStyle = '#2B3038'; g.beginPath(); g.arc(x, y, R * 1.12, 0, 7); g.fill();
  g.fillStyle = '#050608'; g.beginPath(); g.arc(x, y, R, 0, 7); g.fill();
  g.translate(x - R * 1.6 * open, y); g.scale(1 - open * 0.65, 1);
  g.fillStyle = '#7C8491'; g.beginPath(); g.arc(0, 0, R, 0, 7); g.fill();
  g.strokeStyle = '#5B6270'; g.lineWidth = R * 0.05; g.beginPath(); g.arc(0, 0, R * 0.82, 0, 7); g.stroke();
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; g.fillStyle = '#A8B0BC'; g.beginPath(); g.arc(Math.cos(a) * R * 0.92, Math.sin(a) * R * 0.92, R * 0.035, 0, 7); g.fill(); }
  g.rotate(dial); g.fillStyle = '#D9DEE5'; g.beginPath(); g.arc(0, 0, R * 0.28, 0, 7); g.fill();
  g.strokeStyle = '#2B3038'; g.lineWidth = R * 0.02;
  for (let k = 0; k < 20; k++) { const a = k / 20 * Math.PI * 2; g.beginPath(); g.moveTo(Math.cos(a) * R * 0.2, Math.sin(a) * R * 0.2); g.lineTo(Math.cos(a) * R * 0.27, Math.sin(a) * R * 0.27); g.stroke(); }
  g.fillStyle = C.red; g.fillRect(-R * 0.015, -R * 0.28, R * 0.03, R * 0.1);
  g.rotate(-dial); g.fillStyle = '#A8B0BC'; g.fillRect(R * 0.38, -R * 0.06, R * 0.36, R * 0.12);
  g.restore();
}

// cross-section of the Diamond Centre: tower above, two basement levels, vault on -2
export const BX = { top: 600, ground: 960, b1: 1150, floor: 1380, x0: 150, x1: 900 };
export function building(t, o = {}) {
  const { hi = 0, lit = 0.35, open = 0, band = true, people = 0 } = o;
  const gy = BX.ground * u, x0 = BX.x0 * u, x1 = BX.x1 * u, b1 = BX.b1 * u, fl = BX.floor * u;
  g.fillStyle = '#0B1018'; g.fillRect(0, 0, W, gy);
  for (let i = 0; i < 9; i++) { const h = (180 + hash(i, 12) * 260) * u; g.fillStyle = '#121A26'; g.fillRect(i * 130 * u - 30 * u, gy - h, 120 * u, h); }
  g.fillStyle = '#232C3A'; g.fillRect(x0, BX.top * u, x1 - x0, gy - BX.top * u);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) { const on = hash(r * 7 + c, 31) > 0.62; g.fillStyle = on ? '#E9C66B' : '#161D29'; g.fillRect(x0 + 40 * u + c * 100 * u, BX.top * u + 70 * u + r * 70 * u, 56 * u, 40 * u); }
  g.fillStyle = '#323C4E'; g.fillRect(x0, BX.top * u, x1 - x0, 40 * u);
  text(g, 'ANTWERP DIAMOND CENTRE', (x0 + x1) / 2, BX.top * u + 30 * u, { size: 24 * u, weight: 700, family: 'Inter, sans-serif', color: C.fog, tracking: 2 * u });
  g.fillStyle = '#0E131C'; g.fillRect((x0 + x1) / 2 - 50 * u, gy - 110 * u, 100 * u, 110 * u);
  // soil
  g.fillStyle = '#2E261F'; g.fillRect(0, gy, W, H - gy);
  g.fillStyle = '#241D17'; for (let i = 0; i < 160; i++) { g.beginPath(); g.arc(hash(i, 1) * W, gy + hash(i, 2) * (H - gy), (2 + hash(i, 3) * 5) * u, 0, 7); g.fill(); }
  // concrete shell + two levels
  g.fillStyle = '#6E6A64'; g.fillRect(x0 - 24 * u, gy, x1 - x0 + 48 * u, fl - gy + 40 * u);
  g.fillStyle = '#1E232B'; g.fillRect(x0 + 12 * u, gy + 16 * u, x1 - x0 - 24 * u, b1 - gy - 32 * u);
  g.fillStyle = `rgba(255,236,190,${0.08 + lit * 0.5})`; g.fillRect(x0 + 12 * u, b1 + 4 * u, x1 - x0 - 24 * u, fl - b1 - 8 * u);
  g.fillStyle = '#14181E'; g.globalAlpha = 1 - lit * 0.6; g.fillRect(x0 + 12 * u, b1 + 4 * u, x1 - x0 - 24 * u, fl - b1 - 8 * u); g.globalAlpha = 1;
  // stairs
  g.strokeStyle = '#4A5260'; g.lineWidth = 6 * u; g.beginPath();
  for (let k = 0; k < 6; k++) { const sx = x0 + 40 * u + k * 22 * u, sy = gy + 30 * u + k * 30 * u; g.moveTo(sx, sy); g.lineTo(sx + 22 * u, sy); g.lineTo(sx + 22 * u, sy + 30 * u); }
  for (let k = 0; k < 6; k++) { const sx = x0 + 40 * u + k * 22 * u, sy = b1 + 20 * u + k * 30 * u; g.moveTo(sx, sy); g.lineTo(sx + 22 * u, sy); g.lineTo(sx + 22 * u, sy + 30 * u); }
  g.stroke();
  text(g, '−1', x0 - 60 * u, (gy + b1) / 2 + 14 * u, { size: 40 * u, weight: 400, family: SERIF, color: C.fog });
  text(g, '−2', x0 - 60 * u, (b1 + fl) / 2 + 14 * u, { size: 40 * u, weight: 400, family: SERIF, color: C.red });
  // vault door + box wall on level -2
  vaultDoor(x0 + 290 * u, (b1 + fl) / 2, 82 * u, t, { open });
  boxWall(x0 + 420 * u, b1 + 30 * u, 8, 4, 40 * u, 42 * u, (i) => (open > 0 && hash(i, 5) < 0.7 ? open : 0), t);
  for (let i = 0; i < people; i++) person(x0 + 180 * u + i * 60 * u, fl - 40 * u, 26 * u, '#05070A');
  if (hi > 0) { g.save(); g.strokeStyle = C.red; g.lineWidth = 6 * u; g.globalAlpha = hi * (0.6 + 0.4 * Math.sin(t * 6)); g.strokeRect(x0 + 6 * u, b1 - 2 * u, x1 - x0 - 12 * u, fl - b1 + 4 * u); g.restore(); }
  if (band) { g.fillStyle = 'rgba(14,11,9,0.85)'; g.fillRect(0, 1440 * u, W, 180 * u); }
}

// spray can with a mist cone toward +x; p = spray intensity
export function sprayCan(x, y, s, t, p = 1) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = '#C8321E'; rrect(g, -0.18, -0.2, 0.36, 0.95, 0.06); g.fill();
  g.fillStyle = '#EFE6D2'; g.fillRect(-0.18, 0.15, 0.36, 0.22);
  g.fillStyle = '#9AA3AF'; rrect(g, -0.14, -0.34, 0.28, 0.16, 0.05); g.fill();
  g.fillStyle = '#2B3038'; g.fillRect(-0.05, -0.42, 0.14, 0.09);
  for (let i = 0; i < 70 * p; i++) { const q = ((hash(i, 8) + t * 1.6) % 1), a = (hash(i, 9) - 0.5) * 0.5;
    g.globalAlpha = (1 - q) * 0.5; g.fillStyle = '#E8F1F6'; g.beginPath(); g.arc(0.12 + q * 1.4, -0.38 + Math.sin(a) * q * 1.4, 0.02 + q * 0.05, 0, 7); g.fill(); }
  g.restore();
}
// wall-mounted heat/motion sensor; fog 0..1 = hairspray film
export function sensorBox(x, y, s, o = {}) {
  const { fog = 0, led = 1 } = o;
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = '#D9DEE5'; rrect(g, -0.5, -0.35, 1, 0.7, 0.1); g.fill();
  g.fillStyle = '#3A4250'; g.beginPath(); g.ellipse(0, 0.02, 0.3, 0.22, 0, 0, 7); g.fill();
  g.strokeStyle = '#5B6270'; g.lineWidth = 0.02; for (let k = -2; k <= 2; k++) { g.beginPath(); g.moveTo(-0.28, k * 0.07); g.lineTo(0.28, k * 0.07); g.stroke(); }
  g.fillStyle = led ? '#E0402A' : '#3A2020'; g.beginPath(); g.arc(0.38, -0.24, 0.05, 0, 7); g.fill();
  if (fog > 0) { g.globalAlpha = fog * 0.75; g.fillStyle = '#EEF4F7'; g.beginPath(); g.ellipse(0, 0.02, 0.36, 0.28, 0, 0, 7); g.fill(); }
  g.restore();
}
// dark woods by the motorway
export function woods(t, o = {}) {
  const { road = true } = o;
  night('#0C120F');
  for (let i = 0; i < 22; i++) { const x = hash(i, 61) * W, w = (16 + hash(i, 62) * 30) * u; g.fillStyle = i % 3 ? '#151E18' : '#1B261F'; g.fillRect(x, 0, w, 1250 * u); }
  forest(820 * u, { color: '#101812', seed: 9, h: 300 });
  if (road) { g.fillStyle = '#1F2326'; g.fillRect(0, 780 * u, W, 60 * u); for (let k = 0; k < 8; k++) { const x = ((k * 180 * u - t * 600 * u) % (W + 180 * u) + W + 180 * u) % (W + 180 * u) - 90 * u; g.fillStyle = '#C9B66A'; g.fillRect(x, 806 * u, 80 * u, 6 * u); } }
  g.fillStyle = '#1A2219'; g.fillRect(0, 1180 * u, W, H - 1180 * u);
  for (let i = 0; i < 26; i++) { const x = hash(i, 71) * W; g.fillStyle = '#0F1510'; g.fillRect(x, 840 * u, (10 + hash(i, 72) * 24) * u, 400 * u); }
  g.fillStyle = '#26301F'; for (let i = 0; i < 140; i++) { g.beginPath(); g.ellipse(hash(i, 81) * W, 1190 * u + hash(i, 82) * 420 * u, (10 + hash(i, 83) * 20) * u, 5 * u, 0, 0, 7); g.fill(); }
}
export function trashBag(x, y, s, o = {}) {
  const { split = 0 } = o;
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = '#0A0B0D'; g.beginPath(); g.moveTo(-0.5, 0.4); g.quadraticCurveTo(-0.62, -0.15, -0.18, -0.42); g.lineTo(-0.1, -0.62); g.lineTo(0.1, -0.62); g.lineTo(0.18, -0.42); g.quadraticCurveTo(0.62, -0.15, 0.5, 0.4); g.closePath(); g.fill();
  g.strokeStyle = 'rgba(190,200,215,0.55)'; g.lineWidth = 0.03; g.stroke();
  g.strokeStyle = 'rgba(140,151,173,0.5)'; g.lineWidth = 0.02; g.beginPath(); g.moveTo(-0.3, -0.2); g.quadraticCurveTo(-0.25, 0.1, -0.3, 0.3); g.moveTo(0.22, -0.25); g.quadraticCurveTo(0.3, 0.05, 0.25, 0.32); g.stroke();
  if (split > 0) { g.fillStyle = '#050505'; g.beginPath(); g.ellipse(0.3, 0.3, 0.2 * split, 0.08 * split, -0.3, 0, 7); g.fill(); }
  g.restore();
}
export function sandwich(x, y, s, rot = 0) {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  const half = (dy, c) => { g.fillStyle = c; g.beginPath(); g.moveTo(-0.5, dy); g.lineTo(0.5, dy); g.quadraticCurveTo(0.52, dy - 0.12, 0.38, dy - 0.14);
    // bite marks
    for (let k = 0; k < 3; k++) g.arc(0.25 - k * 0.14, dy - 0.15, 0.07, 0, Math.PI, true);
    g.lineTo(-0.5, dy - 0.14); g.closePath(); g.fill(); };
  half(0.12, '#D8A65C'); g.fillStyle = '#B23A3A'; for (let k = 0; k < 4; k++) { g.beginPath(); g.ellipse(-0.4 + k * 0.2, -0.02, 0.1, 0.035, 0, 0, 7); g.fill(); }
  g.fillStyle = '#7FAF5A'; g.fillRect(-0.48, -0.06, 0.6, 0.025);
  half(-0.06, '#E3B66E');
  g.restore();
}
// Belgium, simplified outline [lat, lon]
const BEL = [[51.37, 3.37], [51.27, 3.80], [51.29, 4.24], [51.48, 4.53], [51.44, 4.90], [51.50, 5.10], [51.30, 5.50], [51.18, 5.85], [51.05, 5.80],
  [50.76, 5.68], [50.76, 6.03], [50.62, 6.27], [50.32, 6.40], [50.13, 6.13], [49.80, 5.85], [49.50, 5.80], [49.55, 5.45], [49.80, 4.95], [50.10, 4.85],
  [49.97, 4.45], [50.30, 4.00], [50.35, 3.70], [50.50, 3.60], [50.75, 3.25], [50.80, 2.90], [50.70, 2.60], [51.09, 2.55], [51.20, 2.90]];
const NL = [[51.37, 3.37], [51.27, 3.80], [51.29, 4.24], [51.48, 4.53], [51.44, 4.90], [51.50, 5.10], [51.30, 5.50], [51.18, 5.85], [51.05, 5.80], [50.76, 5.68], [50.76, 6.03], [51.9, 6.1], [52.3, 4.6], [51.8, 3.9]];
export const PL = { antwerp: [51.218, 4.40], mechelen: [51.03, 4.48], brussels: [50.85, 4.35], dump: [50.96, 4.46] };
export const E19 = [[51.19, 4.42], [51.12, 4.46], [51.03, 4.48], [50.95, 4.45], [50.87, 4.38]];
export function mapBel(cam, o = {}) {
  const P = map(cam, { lands: [NL], grid: 1, land: '#141E30', ...o });
  g.save(); g.beginPath(); BEL.forEach((p, i) => { const [x, y] = P(p); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.closePath();
  g.fillStyle = C.night3; g.fill(); g.strokeStyle = C.cream; g.globalAlpha = 0.6; g.lineWidth = 3 * u; g.stroke(); g.restore();
  return P;
}
// clusters of tree crowns on a map around point [x, y]
export function mapTrees(x, y, n, r, seed = 2) {
  for (let i = 0; i < n; i++) { const a = hash(i, seed) * 7, d = Math.sqrt(hash(i, seed + 1)) * r;
    g.fillStyle = i % 3 ? '#2F5A3A' : '#3E6E48'; g.beginPath(); g.arc(x + Math.cos(a) * d, y + Math.sin(a) * d * 0.7, (10 + hash(i, seed + 2) * 8) * u, 0, 7); g.fill(); }
}

// ---------------------------------------------------------------- scenes
export default () => [
  // ---------------- hook
  { from: bar(0), to: bar(2), cues: [[0, 'riser', 0.5], [0.4, 'pop', 0.3], [0.7, 'pop', 0.3], [1.0, 'pop', 0.3], [1.3, 'impact', 1.1], [2.0, 'type', 0.4]],
    draw(t) {
      const [sx, sy] = shake(t, 1.3, 26); g.translate(sx, sy);
      night('#07090C');
      boxWall(60 * u, 560 * u, 10, 12, 92 * u, 66 * u, (i) => clamp((t * 18 - ORDER[i]) / 3), t);
      gemPile(TX, 1300 * u, 12, 70 * u, t, { spread: 300, seed: 8, rise: clamp(spring(t - 1.3, 'heavy')) });
      g.fillStyle = 'rgba(7,9,12,0.86)'; g.fillRect(0, 200 * u, W, 330 * u); g.fillRect(0, 1380 * u, W, 230 * u);
      big('$100M+', TX, 420 * u, t - 1.3, { size: 200 * u, color: C.cream });
      say('เพชรหายจากห้องนิรภัย “ที่ไม่มีใครเจาะได้”', TX, 1490 * u, t - 2.0, { size: 44 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(2), to: bar(4), cues: Array.from({ length: 10 }, (_, i) => [0.15 + i * 0.12, 'tick', 0.5]).concat([[2.5, 'thump', 0.7]]),
    draw(t) {
      night('#0B1018');
      for (let i = 0; i < 10; i++) { const s = spring(t - 0.15 - i * 0.12, 'snappy'); if (s <= 0) continue;
        const c = i % 5, r = Math.floor(i / 5), x = TX - 360 * u + c * 180 * u, y = 720 * u + r * 200 * u;
        g.save(); g.translate(x, y); g.scale(s, s); g.strokeStyle = C.fog; g.lineWidth = 5 * u; rrect(g, -70 * u, -70 * u, 140 * u, 140 * u, 18 * u); g.stroke();
        text(g, String(i + 1), 0, 28 * u, { size: 80 * u, weight: 400, family: SERIF, color: C.cream }); g.restore(); }
      kicker('ANTWERP · เบลเยียม', TX, 300 * u, t, { color: C.red });
      say('ระบบป้องกัน 10 ชั้น', TX, 430 * u, t - 0.1, { size: 66 * u, weight: 800, color: C.cream });
      say('แต่ไม่มีสัญญาณเตือนดัง\nแม้แต่ครั้งเดียว', TX, 1250 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1], [3.2, 'type', 0.4]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 470 * u, 90 * u, 14 * u); g.fill();
      text(g, 'ANTWERPEN · 15.02.2003', 305 * u, 472 * u, { size: 28 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 2 * u });
      g.restore();
      say('“การปล้นแห่งศตวรรษ”', TX, 720 * u, t - 0.25, { size: 70 * u, weight: 800 });
      gem(TX - 250 * u, 820 * u, 70 * u, { glint: glintAt(t, 1) }); gem(TX + 250 * u, 820 * u, 70 * u, { glint: glintAt(t, 4), red: true });
      stamp('NEVER FOUND', TX, 1080 * u, t - 2.5, { size: 112 * u, rot: -0.1 });
      say('และเพชรส่วนใหญ่ ไม่เคยถูกพบอีกเลย', TX, 1380 * u, t - 3.2, { size: 46 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------- the place
  { from: bar(6), to: bar(9), cues: [[0.2, 'whoosh', 0.6], [2.5, 'pop', 0.8], [5.0, 'pop', 0.5]],
    draw(t) {
      const cam = { lat: track(t, [[0, 50.6], [0.1, 50.7]], 'heavy'), lon: track(t, [[0, 4.6], [0.1, 4.5]], 'heavy'), z: track(t, [[0, 150], [0.1, 330]], 'heavy') * u };
      const P = mapBel(cam); topScrim(620);
      pin(...P(PL.brussels), t - 1.2, { label: 'บรัสเซลส์', side: -1, color: C.fog });
      pin(...P(PL.antwerp), t - 2.5, { label: 'แอนต์เวิร์ป', side: 1 });
      kicker('เบลเยียม · 2003', TX, 250 * u, t, { color: C.red });
      say('แอนต์เวิร์ป ศูนย์กลางการค้าเพชร\nที่ใหญ่ที่สุดแห่งหนึ่งของโลก', TX, 345 * u, t - 0.3, { size: 48 * u, weight: 800, color: C.cream });
      g.fillStyle = 'rgba(10,16,28,0.8)'; if (t > 5) g.fillRect(0, 1420 * u, W, 150 * u);
      say('ย่านเพชรมีกล้องและตำรวจตรวจตราตลอด', TX, 1510 * u, t - 5.0, { size: 42 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(9), to: bar(12), cues: [[0.2, 'whoosh', 0.5], [2.5, 'thump', 0.7], [5.0, 'pop', 0.6]],
    draw(t) {
      const sc = track(t, [[0, 1], [2.3, 1.18]], 'heavy');
      g.save(); g.translate(TX, 1270 * u); g.scale(sc, sc); g.translate(-TX, -1270 * u);
      building(t, { hi: clamp((t - 2.5) / 0.4), band: false });
      g.restore();
      g.fillStyle = 'rgba(14,11,9,0.85)'; g.fillRect(0, 1440 * u, W, 180 * u);
      kicker('Antwerp Diamond Centre', TX, 250 * u, t, { color: C.red });
      say('ห้องนิรภัยอยู่ใต้ดินลงไป 2 ชั้น', TX, 360 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      say('ตู้นิรภัยราว 160 ใบ ของพ่อค้าเพชร', TX, 1520 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- the inside man
  { from: bar(12), to: bar(14), cues: [[0.2, 'thump', 0.6], [2.5, 'type', 0.5]],
    draw(t) {
      paper();
      const s = spring(t - 0.2, 'default');
      person(TX, 1080 * u, 240 * u * s, C.ink, { tie: C.red });
      g.fillStyle = '#6B5136'; g.fillRect(TX - 380 * u, 1080 * u, 760 * u, 40 * u); g.fillRect(TX - 360 * u, 1120 * u, 30 * u, 200 * u); g.fillRect(TX + 330 * u, 1120 * u, 30 * u, 200 * u);
      gem(TX - 250 * u, 1060 * u, 60 * u, { glint: glintAt(t, 2) }); gem(TX - 170 * u, 1066 * u, 44 * u, { glint: glintAt(t, 5) }); gem(TX + 230 * u, 1062 * u, 54 * u, { glint: glintAt(t, 3) });
      g.fillStyle = C.paper2; rrect(g, TX - 300 * u, 1370 * u, 600 * u, 90 * u, 10 * u); g.fill();
      typewriter('L. NOTARBARTOLO · DIAMONDS', TX, 1430 * u, t - 2.5, { size: 34 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, align: 'center', cps: 18 });
      kicker('ราวปี 2000 · ราว 2 ปีครึ่งก่อนเกิดเหตุ', TX, 300 * u, t);
      say('ชายชาวอิตาลีเช่าออฟฟิศในตึกนี้\nอ้างตัวว่าเป็นพ่อค้าเพชร', TX, 420 * u, t - 0.2, { size: 50 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(14), to: bar(17), cues: [[0.2, 'click', 0.7], [2.5, 'thump', 0.6], [5.0, 'pop', 0.6]],
    draw(t) {
      night('#0B1018');
      boxWall(150 * u, 640 * u, 8, 8, 96 * u, 76 * u, (i) => (i === 27 ? clamp(spring(t - 2.5, 'snappy')) : 0), t);
      const hx = 150 * u + 3 * 96 * u, hy = 640 * u + 3 * 76 * u;
      g.strokeStyle = C.red; g.lineWidth = 6 * u; g.globalAlpha = clamp((t - 2.5) / 0.3); g.strokeRect(hx - 6 * u, hy - 6 * u, 96 * u + 6 * u, 76 * u + 6 * u); g.globalAlpha = 1;
      g.fillStyle = 'rgba(11,16,24,0.9)'; g.fillRect(0, 1300 * u, W, 300 * u);
      kicker('สิทธิ์ของผู้เช่า', TX, 300 * u, t, { color: C.red });
      say('ได้ตู้นิรภัยของตัวเองในห้องนิรภัย', TX, 420 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      say('เดินเข้าออกจนพนักงานคุ้นหน้า', TX, 1380 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.cream });
      say('ไม่มีใครสงสัยเขาเลย', TX, 1490 * u, t - 5.0, { size: 50 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(17), to: bar(19), cues: [[0.2, 'click', 0.8], [1.2, 'click', 0.8], [2.5, 'thump', 0.6]],
    draw(t) {
      night('#08070A');
      vaultDoor(TX, 900 * u, 260 * u, t, { dial: track(t, [[0, 0], [0.4, 1.4], [1.4, -0.8], [2.6, 2.2]], 'snappy') });
      // viewfinder corners
      g.strokeStyle = C.cream; g.lineWidth = 5 * u; const fx = TX - 360 * u, fy = 580 * u, fw = 720 * u, fh = 640 * u, k = 60 * u;
      for (const [x, y, dx, dy] of [[fx, fy, 1, 1], [fx + fw, fy, -1, 1], [fx, fy + fh, 1, -1], [fx + fw, fy + fh, -1, -1]]) { g.beginPath(); g.moveTo(x + dx * k, y); g.lineTo(x, y); g.lineTo(x, y + dy * k); g.stroke(); }
      if (Math.floor(t * 2) % 2 === 0) { g.fillStyle = C.red; g.beginPath(); g.arc(fx + 40 * u, fy + 40 * u, 12 * u, 0, 7); g.fill(); }
      text(g, 'REC', fx + 64 * u, fy + 52 * u, { size: 30 * u, weight: 700, family: 'Inter, sans-serif', color: C.cream });
      kicker('ตามคำบอกเล่าของเขาเอง', TX, 300 * u, t, { color: C.red });
      say('เขาแอบถ่ายประตูห้องนิรภัย\nด้วยกล้องจิ๋ว', TX, 400 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      say('ปุ่มหมุนรหัส มีราว 100 ล้านแบบ', TX, 1360 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(19), to: bar(22), cues: Array.from({ length: 5 }, (_, i) => [0.3 + i * 0.5, 'thump', 0.5]).concat([[5.0, 'pop', 0.6]]),
    draw(t) {
      paper();
      const crew = [['Notarbartolo', 'หัวหน้าทีม'], ['The Genius', 'ผู้เชี่ยวชาญ\nระบบสัญญาณ'], ['The Monster', 'สะเดาะกุญแจ'], ['King of Keys', 'ปลอมกุญแจ'], ['Speedy', 'เพื่อนเก่า\nของหัวหน้า']];
      crew.forEach(([n, r], i) => { const s = spring(t - 0.3 - i * 0.5, 'default'); if (s <= 0) return;
        const c = i < 3 ? i : i - 3, row = i < 3 ? 0 : 1, x = row ? TX - 150 * u + c * 300 * u : TX - 300 * u + c * 300 * u, y = 820 * u + row * 380 * u;
        g.save(); g.globalAlpha = s; person(x, y + (1 - s) * 40 * u, 90 * u, i === 3 ? C.red : C.ink);
        text(g, n, x, y + 90 * u, { size: 30 * u, weight: 700, family: 'Inter, sans-serif', color: C.ink });
        r.split('\n').forEach((ln, k) => text(g, ln, x, y + 135 * u + k * 38 * u, { size: 28 * u, weight: 700, family: THAI, color: C.inkSoft })); g.restore(); });
      kicker('แก๊งจากอิตาลี', TX, 300 * u, t);
      say('สื่อตั้งฉายาว่า “School of Turin”', TX, 420 * u, t - 0.1, { size: 50 * u, weight: 800 });
      say('ตัวตนจริงของ King of Keys\nยังไม่มีใครรู้จนถึงวันนี้', TX, 1460 * u, t - 5.0, { size: 42 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- the weekend
  { from: bar(22), to: bar(24), cues: Array.from({ length: 3 }, (_, i) => [i * 0.2, 'tick', 0.5]).concat([[1.25, 'thump', 0.7]]),
    draw(t) {
      paper(); kicker('กุมภาพันธ์ 2003', TX, 420 * u, t);
      const d = ['13', '14', '15'];
      flip(TX, 800 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.2), t, { size: 360 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('สุดสัปดาห์ 15–16 กุมภาพันธ์', TX, 1220 * u, t - 1.0, { size: 52 * u, weight: 800 });
      say('ย่านเพชรปิดเงียบ', TX, 1330 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(24), to: bar(26), cues: [[0.2, 'swish', 0.6], [0.9, 'swish', 0.5], [2.5, 'thump', 0.6]],
    draw(t) {
      night('#1A1D22');
      g.fillStyle = '#2A2F37'; g.fillRect(0, 560 * u, W, 820 * u);
      sensorBox(TX + 170 * u, 830 * u, 300 * u, { fog: remap(t, 0.4, 2.0) });
      sprayCan(TX - 260 * u, 1020 * u, 300 * u, t, t > 0.2 && t < 2.2 ? 1 : 0);
      kicker('ก่อนหน้านั้น · ตามที่มีการรายงาน', TX, 300 * u, t, { color: C.red });
      say('สเปรย์ฉีดผม พ่นใส่เซนเซอร์ความร้อน', TX, 410 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      say('ฟิล์มบาง ๆ ทำให้มัน “ตาบอด”', TX, 1480 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(26), to: bar(30), cues: Array.from({ length: 10 }, (_, i) => [0.8 + i * 0.8, 'click', 0.6]),
    draw(t) {
      paper();
      const L = ['กล้องวงจรปิดภายนอก', 'ประตูเหล็กดัดล็อก', 'แป้นกดปลดสัญญาณ', 'ปุ่มหมุนรหัส', 'กุญแจล็อก', 'เซนเซอร์แรงสั่นสะเทือน',
        'เซนเซอร์สนามแม่เหล็ก', 'กล้องวงจรปิดภายใน', 'เซนเซอร์แสง', 'เซนเซอร์ความร้อน + การเคลื่อนไหว'];
      L.forEach((s, i) => { const y = 600 * u + i * 86 * u, at = 0.8 + i * 0.8, p = clamp((t - at) / 0.25);
        text(g, String(i + 1).padStart(2, '0'), 140 * u, y + 14 * u, { size: 40 * u, weight: 400, family: SERIF, color: C.inkSoft });
        text(g, s, 210 * u, y + 14 * u, { size: 40 * u, weight: 800, family: THAI, color: C.ink, align: 'left', alpha: p > 0 ? 0.8 : 1 });
        if (p > 0) { g.fillStyle = 'rgba(200,50,30,0.75)'; g.fillRect(200 * u, y + 2 * u, (620 * u) * p, 3 * u);
          const s2 = spring(t - at, 'playful'); g.save(); g.translate(880 * u, y); g.scale(s2, s2); g.strokeStyle = C.red; g.lineWidth = 8 * u; g.lineCap = 'round';
          g.beginPath(); g.moveTo(-20 * u, 0); g.lineTo(-4 * u, 16 * u); g.lineTo(24 * u, -20 * u); g.stroke(); g.restore(); } });
      kicker('คืนวันเสาร์', TX, 300 * u, t);
      say('ผ่านไปทีละชั้น…', TX, 420 * u, t - 0.1, { size: 56 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(30), to: bar(34), cues: [[0.2, 'pop', 0.6], [2.5, 'pop', 0.6], [5.0, 'pop', 0.6], [7.5, 'thump', 0.6]],
    draw(t) {
      night('#0B1018');
      const cards = [['แผ่นโพลีเอสเตอร์', 'บังความร้อนจากร่างกาย'], ['เทปกาว', 'ปิดเซนเซอร์แสง'], ['แกะน็อต + เทป', 'ยึดแผ่นแม่เหล็กไว้ด้วยกัน']];
      cards.forEach(([a, b], i) => { const p = spring(t - 0.2 - i * 2.5, 'snappy'); if (p <= 0) return;
        const y = 620 * u + i * 250 * u;
        g.save(); g.translate((1 - p) * W, 0);
        g.fillStyle = '#1E2B44'; rrect(g, 100 * u, y, 820 * u, 200 * u, 16 * u); g.fill();
        // icon
        const ix = 210 * u, iy = y + 100 * u;
        if (i === 0) { g.fillStyle = '#C9D3DE'; g.fillRect(ix - 50 * u, iy - 70 * u, 100 * u, 140 * u); person(ix + 20 * u, iy + 70 * u, 40 * u, '#0B1018'); }
        if (i === 1) { g.fillStyle = '#D8B45A'; g.beginPath(); g.arc(ix, iy, 56 * u, 0, 7); g.fill(); g.fillStyle = '#0B1018'; g.beginPath(); g.arc(ix, iy, 24 * u, 0, 7); g.fill(); }
        if (i === 2) { g.fillStyle = STEEL; g.fillRect(ix - 60 * u, iy - 40 * u, 54 * u, 80 * u); g.fillRect(ix + 6 * u, iy - 40 * u, 54 * u, 80 * u); g.fillStyle = 'rgba(216,180,90,0.85)'; g.fillRect(ix - 70 * u, iy - 12 * u, 140 * u, 24 * u); }
        text(g, a, 320 * u, y + 85 * u, { size: 46 * u, weight: 800, family: THAI, color: C.cream, align: 'left' });
        text(g, b, 320 * u, y + 145 * u, { size: 36 * u, weight: 700, family: THAI, color: C.fog, align: 'left' });
        g.restore(); });
      kicker('อุปกรณ์ธรรมดา ๆ', TX, 300 * u, t, { color: C.red });
      say('ตามที่มีการรายงาน พวกเขาใช้…', TX, 420 * u, t - 0.1, { size: 50 * u, weight: 800, color: C.cream });
      say('ไม่มีสัญญาณเตือนดังเลย', TX, 1450 * u, t - 7.5, { size: 54 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
];
