// Lufthansa Heist 1978 — Act 1: 0:00–1:25 (bars 0–34). Helpers for both acts live at the top.
// No airline logos anywhere: the building is a generic "cargo terminal", the jet is the kit's plain airliner.
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, map, planeSide } from './kit.js';

// ---------------------------------------------------------------- palette & small utils
export const SODIUM = '#E9A84A', ASPH = '#14171C', VANC = '#1A1D23', CANVAS = '#B9A77C', BOX = '#7E6446';
export const money = (n) => '$' + Math.round(n).toLocaleString('en-US');

// ---------------------------------------------------------------- scenery
// Generic cargo terminal; (x, y) = bottom-left corner.
export function terminal(x, y, w, h, t = 0, o = {}) {
  const { sign = true, glow = 1 } = o;
  g.save();
  g.fillStyle = '#1C2330'; g.fillRect(x, y - h, w, h);
  g.fillStyle = '#273042'; g.fillRect(x, y - h, w, 30 * u);
  const n = Math.max(2, Math.floor(w / (150 * u))), span = (w - 60 * u) / n;
  for (let i = 0; i < Math.floor((w - 40 * u) / (70 * u)); i++) { const on = hash(i, 17) > 0.5;
    g.fillStyle = on ? 'rgba(233,198,107,0.85)' : '#121824'; g.fillRect(x + 30 * u + i * 70 * u, y - h + 60 * u, 40 * u, 26 * u); }
  for (let i = 0; i < n; i++) {
    const dx = x + 30 * u + i * span + 12 * u, dw = span - 24 * u, dh = h * 0.55;
    g.fillStyle = '#10151E'; g.fillRect(dx, y - dh, dw, dh);
    g.strokeStyle = 'rgba(140,151,173,0.2)'; g.lineWidth = 2 * u;
    for (let k = 1; k < 8; k++) { const ly = y - dh + k * dh / 8; g.beginPath(); g.moveTo(dx, ly); g.lineTo(dx + dw, ly); g.stroke(); }
    const lx = dx + dw / 2, gr = g.createRadialGradient(lx, y - dh * 0.3, 0, lx, y - dh * 0.3, 190 * u);
    gr.addColorStop(0, `rgba(233,168,74,${0.32 * glow})`); gr.addColorStop(1, 'rgba(233,168,74,0)');
    g.fillStyle = gr; g.fillRect(lx - 190 * u, y - dh - 190 * u, 380 * u, 380 * u + dh);
    g.fillStyle = SODIUM; g.fillRect(lx - 14 * u, y - dh - 18 * u, 28 * u, 8 * u);
  }
  if (sign) { g.fillStyle = '#0D1118'; rrect(g, x + w * 0.5 - 160 * u, y - h - 72 * u, 320 * u, 62 * u, 6 * u); g.fill();
    text(g, 'CARGO · 261', x + w * 0.5, y - h - 28 * u, { size: 32 * u, weight: 700, family: 'Inter, sans-serif', color: SODIUM, tracking: 3 * u }); }
  g.restore();
}
// Night airfield: sky, far skyline, apron, taxiway lights, terminal, parked cargo jet.
export function airport(t, o = {}) {
  const { hz = 1150, plane = true, bld = true, px = 330, py = 1250, ps = 300 } = o;
  const hy = hz * u;
  const gr = g.createLinearGradient(0, 0, 0, hy); gr.addColorStop(0, '#04060B'); gr.addColorStop(1, '#172036');
  g.fillStyle = gr; g.fillRect(0, 0, W, hy);
  for (let i = 0; i < 70; i++) { g.fillStyle = `rgba(239,230,210,${(0.15 + 0.45 * hash(i, 2)) * (0.7 + 0.3 * Math.sin(t * 2 + i))})`;
    g.fillRect(hash(i, 3) * W, hash(i, 4) * hy * 0.7, 2.5 * u, 2.5 * u); }
  for (let i = 0; i < 18; i++) { const h = (20 + hash(i, 5) * 70) * u; g.fillStyle = '#0D1320'; g.fillRect(i * 64 * u - 20 * u, hy - h, 60 * u, h); }
  g.fillStyle = ASPH; g.fillRect(0, hy, W, H - hy);
  g.fillStyle = 'rgba(216,180,90,0.55)'; for (let k = 0; k < 10; k++) g.fillRect(k * 130 * u - 40 * u, hy + 330 * u, 80 * u, 6 * u);
  for (let k = 0; k < 16; k++) { g.save(); g.globalAlpha = 0.55 + 0.45 * Math.sin(t * 4 + k); g.fillStyle = '#5FA0F0';
    g.beginPath(); g.arc(k * 72 * u + 20 * u, hy + 270 * u, 5 * u, 0, 7); g.fill(); g.restore(); }
  if (bld) terminal(470 * u, hy, 610 * u, 330 * u, t);
  if (plane) jet(px * u, py * u, ps * u);
}
// the kit's plain airliner, parked, with landing gear
export function jet(x, y, s, color = '#C3C9D2') {
  g.save(); g.strokeStyle = '#2B3038'; g.lineWidth = 0.02 * s;
  for (const gx of [-0.78, 0.08, 0.2]) { g.beginPath(); g.moveTo(x + gx * s, y + 0.06 * s); g.lineTo(x + gx * s, y + 0.12 * s); g.stroke();
    g.fillStyle = '#0A0B0D'; g.beginPath(); g.arc(x + gx * s, y + 0.13 * s, 0.03 * s, 0, 7); g.fill(); }
  g.restore();
  planeSide(x, y, s, { color, windows: '#3A4250' });
}
// black panel van, side view, nose toward +x (dir = -1 flips). (x, y) = ground under the middle.
export function van(x, y, s, o = {}) {
  const { color = VANC, lights = 0, dir = 1 } = o;
  g.save(); g.translate(x, y); g.scale(s * dir, s);
  if (lights > 0) { const gr = g.createLinearGradient(0.5, 0, 1.6, 0); gr.addColorStop(0, `rgba(255,236,190,${0.45 * lights})`); gr.addColorStop(1, 'rgba(255,236,190,0)');
    g.fillStyle = gr; g.beginPath(); g.moveTo(0.48, -0.24); g.lineTo(1.6, -0.42); g.lineTo(1.6, 0.05); g.lineTo(0.48, -0.17); g.closePath(); g.fill(); }
  g.fillStyle = color;
  g.beginPath(); g.moveTo(-0.5, -0.1); g.lineTo(-0.5, -0.52); g.lineTo(0.2, -0.52); g.quadraticCurveTo(0.33, -0.5, 0.4, -0.3); g.lineTo(0.5, -0.26); g.lineTo(0.5, -0.1); g.closePath(); g.fill();
  g.strokeStyle = 'rgba(160,170,190,0.5)'; g.lineWidth = 0.012; g.stroke();
  g.fillStyle = '#2A3446'; g.beginPath(); g.moveTo(0.23, -0.48); g.quadraticCurveTo(0.31, -0.47, 0.37, -0.32); g.lineTo(0.23, -0.32); g.closePath(); g.fill();
  g.fillRect(0.06, -0.48, 0.14, 0.16);
  g.strokeStyle = 'rgba(160,170,190,0.3)'; g.beginPath(); g.moveTo(0.03, -0.5); g.lineTo(0.03, -0.12); g.moveTo(-0.2, -0.5); g.lineTo(-0.2, -0.12); g.stroke();
  for (const wx of [-0.3, 0.3]) { g.fillStyle = '#050506'; g.beginPath(); g.arc(wx, -0.08, 0.1, 0, 7); g.fill(); g.fillStyle = '#5B6270'; g.beginPath(); g.arc(wx, -0.08, 0.04, 0, 7); g.fill(); }
  g.fillStyle = lights > 0 ? '#FFF0C8' : '#5A5A50'; g.fillRect(0.47, -0.25, 0.03, 0.05);
  g.fillStyle = '#8E1E12'; g.fillRect(-0.51, -0.32, 0.025, 0.07);
  g.restore();
}
// ski-masked silhouette (never a likeness)
export function masked(x, y, s, color = '#05070A') {
  person(x, y, s, color);
  g.fillStyle = 'rgba(239,230,210,0.75)';
  for (const sx of [-1, 1]) { g.beginPath(); g.ellipse(x + sx * 0.13 * s, y - 1.2 * s, 0.08 * s, 0.035 * s, 0, 0, 7); g.fill(); }
}
// canvas money sack
export function cashBag(x, y, s, o = {}) {
  const { rot = 0, c = CANVAS } = o;
  g.save(); g.translate(x, y); g.rotate(rot);
  g.save(); g.scale(s, s);
  g.fillStyle = c; g.beginPath(); g.moveTo(-0.12, -0.42); g.quadraticCurveTo(-0.5, -0.2, -0.45, 0.2); g.quadraticCurveTo(-0.4, 0.45, 0, 0.45);
  g.quadraticCurveTo(0.4, 0.45, 0.45, 0.2); g.quadraticCurveTo(0.5, -0.2, 0.12, -0.42); g.closePath(); g.fill();
  g.fillStyle = '#8E7B52'; g.fillRect(-0.15, -0.46, 0.3, 0.07);
  g.beginPath(); g.moveTo(-0.08, -0.46); g.lineTo(-0.18, -0.6); g.lineTo(0, -0.5); g.lineTo(0.18, -0.6); g.lineTo(0.08, -0.46); g.fill();
  g.restore();
  text(g, '$', 0, 0.22 * s, { size: 0.42 * s, weight: 400, family: SERIF, color: '#5A4A2E' });
  g.restore();
}
// cardboard carton, (x, y) = bottom-centre
export function carton(x, y, w, h) {
  g.fillStyle = BOX; g.fillRect(x - w / 2, y - h, w, h);
  g.fillStyle = '#C9B98A'; g.fillRect(x - w * 0.08, y - h, w * 0.16, h);
  g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(x - w / 2, y - h, w, h * 0.12);
}
// vault interior: shelves of cartons behind a cage; left = cartons still on the shelves (of 24); gate 0..1 open
export function vaultRoom(t, o = {}) {
  const { left = 24, gate = 1 } = o;
  night('#0C0F14');
  g.fillStyle = '#161B24'; g.fillRect(0, 560 * u, W, 830 * u);
  g.fillStyle = '#0E1116'; g.fillRect(0, 1390 * u, W, H - 1390 * u);
  for (let r = 0; r < 3; r++) { const y = 820 * u + r * 220 * u;
    for (let c = 0; c < 8; c++) { const i = r * 8 + c; if (i < 24 - left) continue;
      carton(150 * u + c * 102 * u, y, 86 * u, (110 + hash(i, 3) * 40) * u); }
    g.fillStyle = '#3A4250'; g.fillRect(90 * u, y, 900 * u, 14 * u); }
  const gr = g.createRadialGradient(TX, 600 * u, 0, TX, 600 * u, 700 * u); gr.addColorStop(0, 'rgba(233,198,107,0.14)'); gr.addColorStop(1, 'rgba(233,198,107,0)');
  g.fillStyle = gr; g.fillRect(0, 560 * u, W, 830 * u);
  // cage: fixed left half, gate swings on the right
  g.save(); g.strokeStyle = 'rgba(168,176,188,0.5)'; g.lineWidth = 4 * u;
  const cage = (x0, x1) => { for (let x = x0; x <= x1; x += 40 * u) { g.beginPath(); g.moveTo(x, 600 * u); g.lineTo(x, 1390 * u); g.stroke(); }
    g.lineWidth = 10 * u; g.beginPath(); g.moveTo(x0, 600 * u); g.lineTo(x1, 600 * u); g.moveTo(x0, 1000 * u); g.lineTo(x1, 1000 * u); g.stroke(); g.lineWidth = 4 * u; };
  cage(60 * u, 500 * u);
  g.translate(540 * u, 0); g.scale(1 - gate * 0.85, 1); cage(0, 440 * u);
  g.restore();
}
// fingerprint whorl drawn to progress p
export function fingerprint(x, y, r, p = 1, color = C.ink) {
  g.save(); g.strokeStyle = color; g.lineWidth = r * 0.035; g.lineCap = 'round';
  const n = 13;
  for (let k = 0; k < n; k++) { if (k / n > p) break; const rr = r * (0.1 + k * 0.07), gap = hash(k, 77) * Math.PI * 2;
    g.beginPath(); g.ellipse(x, y + k * r * 0.015, rr * 0.75, rr, 0, gap + 0.35, gap + Math.PI * 2 - 0.35); g.stroke(); }
  g.restore();
}
export function magnifier(x, y, r, color = C.ink) {
  g.save(); g.strokeStyle = color; g.lineWidth = r * 0.12;
  g.beginPath(); g.arc(x, y, r, 0, 7); g.stroke();
  g.lineCap = 'round'; g.lineWidth = r * 0.2; g.beginPath(); g.moveTo(x + r * 0.75, y + r * 0.75); g.lineTo(x + r * 1.5, y + r * 1.5); g.stroke();
  g.restore();
}
// judge's gavel over a sound block; a = raise angle (0 = struck)
export function gavel(x, y, s, a = 0) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = '#5A3A22'; rrect(g, -0.6, 0.35, 1.2, 0.18, 0.04); g.fill();
  g.fillStyle = '#7A4E2C'; rrect(g, -0.45, 0.22, 0.9, 0.14, 0.04); g.fill();
  g.translate(0.55, 0.1); g.rotate(a);
  g.fillStyle = '#8A5A32'; g.fillRect(-0.9, -0.04, 0.88, 0.08);
  g.fillStyle = '#6B4226'; rrect(g, -1.05, -0.2, 0.3, 0.4, 0.05); g.fill();
  g.fillStyle = '#C9A24A'; g.fillRect(-1.05, -0.13, 0.3, 0.035); g.fillRect(-1.05, 0.095, 0.3, 0.035);
  g.restore();
}
export const strike = (t, at) => (t < at - 0.5 ? 0.7 * clamp((t - (at - 1.0)) / 0.4) : t < at ? 0.7 : 0.7 * Math.max(0, 1 - (t - at) / 0.1) + Math.max(0, Math.sin((t - at) * 18) * 0.06 * Math.exp(-(t - at) * 8)));
// film reel + strip (text only, no posters)
export function filmReel(x, y, r, rot, color = C.ink, hole = C.paper) {
  g.save(); g.translate(x, y); g.rotate(rot);
  g.fillStyle = color; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill();
  g.fillStyle = hole; for (let k = 0; k < 5; k++) { const a = k / 5 * Math.PI * 2; g.beginPath(); g.arc(Math.cos(a) * r * 0.55, Math.sin(a) * r * 0.55, r * 0.22, 0, 7); g.fill(); }
  g.beginPath(); g.arc(0, 0, r * 0.1, 0, 7); g.fill();
  g.restore();
}
export function filmStrip(x, y, w, h, shift, label, color = C.ink) {
  g.save(); g.fillStyle = color; g.fillRect(x, y, w, h);
  g.beginPath(); g.rect(x, y, w, h); g.clip();
  g.fillStyle = C.paper; const step = 46 * u;
  for (let k = -1; k < w / step + 1; k++) { const sx = x + k * step + (shift % step); g.fillRect(sx, y + 10 * u, 22 * u, 16 * u); g.fillRect(sx, y + h - 26 * u, 22 * u, 16 * u); }
  const fw = h * 1.1; for (let k = -1; k < w / fw + 1; k++) { const fx = x + k * (fw + 14 * u) + (shift % (fw + 14 * u)); g.fillStyle = '#2A2620'; g.fillRect(fx, y + 38 * u, fw, h - 76 * u); }
  g.restore();
  if (label) text(g, label, x + w / 2, y + h / 2 + 16 * u, { size: 46 * u, weight: 700, family: 'Inter, sans-serif', color: C.paper, tracking: 6 * u });
}
// org-chart card with a silhouette; grey 0..1 fades it out
export function orgCard(x, y, w, h, name, role, grey = 0, o = {}) {
  const { hi = false } = o;
  g.save();
  g.fillStyle = hi ? '#2A1A16' : '#1E2B44'; rrect(g, x - w / 2, y, w, h, 14 * u); g.fill();
  if (hi) { g.strokeStyle = C.red; g.lineWidth = 4 * u; g.stroke(); }
  person(x, y + h * 0.55, h * 0.2, '#0A101C');
  if (name) text(g, name, x, y + h * 0.75, { size: 30 * u, weight: 700, family: 'Inter, sans-serif', color: C.cream });
  if (role) text(g, role, x, y + h * 0.9, { size: 26 * u, weight: 700, family: THAI, color: C.fog });
  if (grey > 0) { g.globalAlpha = 0.8 * grey; g.fillStyle = '#0A0C10'; rrect(g, x - w / 2, y, w, h, 14 * u); g.fill();
    g.globalAlpha = grey; g.strokeStyle = '#5B6270'; g.lineWidth = 3 * u; g.setLineDash([10 * u, 8 * u]); rrect(g, x - w / 2, y, w, h, 14 * u); g.stroke(); g.setLineDash([]);
    text(g, '?', x, y + h * 0.5, { size: 80 * u, weight: 400, family: SERIF, color: '#5B6270' }); }
  g.restore();
}
// analog clock; m = minutes elapsed (sweeps a red sector)
export function clock(x, y, r, m) {
  g.save();
  g.fillStyle = C.cream; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
  const a0 = -Math.PI / 2, a1 = a0 + Math.min(m, 60) / 60 * Math.PI * 2;
  g.fillStyle = 'rgba(200,50,30,0.3)'; g.beginPath(); g.moveTo(x, y); g.arc(x, y, r * 0.9, a0, a1); g.closePath(); g.fill();
  if (m > 60) { g.fillStyle = 'rgba(200,50,30,0.6)'; g.beginPath(); g.moveTo(x, y); g.arc(x, y, r * 0.9, a0, a0 + (m - 60) / 60 * Math.PI * 2); g.closePath(); g.fill(); }
  g.strokeStyle = C.ink; g.lineWidth = r * 0.04; g.beginPath(); g.arc(x, y, r, 0, 7); g.stroke();
  for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; g.lineWidth = r * (k % 3 ? 0.02 : 0.04);
    g.beginPath(); g.moveTo(x + Math.cos(a) * r * 0.82, y + Math.sin(a) * r * 0.82); g.lineTo(x + Math.cos(a) * r * 0.94, y + Math.sin(a) * r * 0.94); g.stroke(); }
  const ma = a0 + m / 60 * Math.PI * 2, ha = a0 + (3 + m / 60) / 12 * Math.PI * 2;
  g.lineCap = 'round'; g.lineWidth = r * 0.06; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(ha) * r * 0.5, y + Math.sin(ha) * r * 0.5); g.stroke();
  g.strokeStyle = C.red; g.lineWidth = r * 0.035; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(ma) * r * 0.8, y + Math.sin(ma) * r * 0.8); g.stroke();
  g.fillStyle = C.ink; g.beginPath(); g.arc(x, y, r * 0.05, 0, 7); g.fill();
  g.restore();
}

// ---------------------------------------------------------------- New York map [lat, lon]
const LI = [[40.574, -74.012], [40.571, -73.98], [40.583, -73.94], [40.545, -73.94], [40.565, -73.87], [40.583, -73.80], [40.60, -73.74], [40.585, -73.68],
  [40.59, -73.55], [40.62, -73.40], [40.66, -73.20], [40.73, -72.90], [40.80, -72.60], [40.90, -72.30], [41.07, -71.86], [41.00, -72.20], [41.15, -72.30],
  [40.98, -72.60], [40.96, -72.90], [40.93, -73.20], [40.90, -73.50], [40.88, -73.65], [40.80, -73.77], [40.79, -73.84], [40.79, -73.91], [40.75, -73.94],
  [40.70, -73.99], [40.68, -74.02], [40.635, -74.035], [40.60, -74.04]];
const BAY = [[40.598, -73.90], [40.62, -73.87], [40.645, -73.83], [40.637, -73.80], [40.615, -73.79], [40.598, -73.80], [40.595, -73.85]];
const MAN = [[40.701, -74.017], [40.709, -73.977], [40.73, -73.971], [40.75, -73.962], [40.775, -73.943], [40.80, -73.928], [40.835, -73.934], [40.872, -73.911],
  [40.879, -73.927], [40.85, -73.947], [40.80, -73.972], [40.76, -74.003], [40.72, -74.015]];
const MAIN = [[40.40, -74.60], [40.48, -74.26], [40.52, -74.25], [40.56, -74.21], [40.64, -74.18], [40.65, -74.08], [40.69, -74.06], [40.75, -74.025],
  [40.80, -73.99], [40.88, -73.945], [40.888, -73.925], [40.87, -73.905], [40.83, -73.92], [40.80, -73.915], [40.80, -73.87], [40.81, -73.79], [40.87, -73.78],
  [40.95, -73.70], [41.00, -73.65], [41.20, -73.40], [41.60, -73.40], [41.60, -74.80]];
const SI = [[40.648, -74.08], [40.61, -74.055], [40.57, -74.10], [40.50, -74.25], [40.51, -74.255], [40.56, -74.21], [40.63, -74.18], [40.645, -74.12]];
export const PL = { jfk: [40.6413, -73.7781], manhattan: [40.78, -73.968], brooklyn: [40.66, -73.95] };
export const mapNY = (cam, o = {}) => map(cam, { lands: [MAIN, LI, MAN, SI], waters: [BAY], grid: 1, ...o });

// ---------------------------------------------------------------- scenes
export default () => [
  // ---------------- hook
  { from: bar(0), to: bar(2), cues: [[0, 'riser', 0.5], [0.3, 'whoosh', 0.5], [1.3, 'impact', 1.1], [2.0, 'type', 0.4]],
    draw(t) {
      const [sx, sy] = shake(t, 1.3, 24); g.translate(sx, sy);
      airport(t);
      van(track(t, [[0, -200 * u], [0.1, 780 * u]], 'heavy'), 1340 * u, 280 * u, { lights: 1 });
      g.fillStyle = 'rgba(4,6,11,0.8)'; g.fillRect(0, 230 * u, W, 290 * u);
      const n = 5875000 * clamp(remap(t, 0.15, 1.3) ** 0.6);
      text(g, money(n), TX, 430 * u, { size: 150 * u, weight: 400, family: SERIF, color: t > 1.3 ? C.red : C.cream });
      g.fillStyle = 'rgba(4,6,11,0.75)'; if (t > 1.9) g.fillRect(0, 1380 * u, W, 200 * u);
      say('ปล้นกลางสนามบินในนิวยอร์ก\nโดยไม่ยิงปืนแม้แต่นัดเดียว', TX, 1450 * u, t - 2.0, { size: 46 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(2), to: bar(4), cues: Array.from({ length: 9 }, (_, i) => [0.1 + i * 0.13, 'thump', 0.35]).concat([[2.5, 'thump', 0.7]]),
    draw(t) {
      night('#0B1018');
      for (let i = 0; i < 14; i++) { const at = 0.05 + i * 0.09, s = spring(t - at, 'snappy'); if (s <= 0) continue;
        const c = i % 5, r = Math.floor(i / 5);
        cashBag(TX - 320 * u + c * 160 * u + (r % 2) * 80 * u, 1220 * u - r * 110 * u - (1 - s) * 900 * u, 170 * u, { rot: (hash(i, 4) - 0.5) * 0.4 }); }
      big('$5 ล้าน', TX, 470 * u, t - 0.2, { size: 190 * u, color: C.cream });
      say('เงินสด · และเครื่องประดับอีกราว $875,000', TX, 600 * u, t - 0.8, { size: 42 * u, weight: 800, color: C.fog });
      say('หนึ่งในการปล้นเงินสดครั้งใหญ่ที่สุด\nในประวัติศาสตร์สหรัฐฯ ณ เวลานั้น', TX, 1400 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1], [3.2, 'type', 0.4]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 520 * u, 90 * u, 14 * u); g.fill();
      text(g, 'JFK · NEW YORK · 11.12.1978', 330 * u, 472 * u, { size: 28 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 2 * u });
      g.restore();
      say('คดีปล้น Lufthansa', TX, 720 * u, t - 0.25, { size: 76 * u, weight: 800 });
      van(TX, 900 * u, 220 * u * clamp(spring(t - 0.6, 'default')), { color: C.ink });
      stamp('NEVER RECOVERED', TX, 1100 * u, t - 2.5, { size: 88 * u, rot: -0.1 });
      say('เงินส่วนใหญ่ ไม่เคยได้คืน', TX, 1390 * u, t - 3.2, { size: 48 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------- the place
  { from: bar(6), to: bar(9), cues: [[0.2, 'whoosh', 0.6], [1.2, 'pop', 0.5], [2.5, 'pop', 0.8], [5.0, 'pop', 0.5]],
    draw(t) {
      const cam = { lat: track(t, [[0, 40.9], [0.1, 40.66]], 'heavy'), lon: track(t, [[0, -73.6], [0.1, -73.9]], 'heavy'), z: track(t, [[0, 420], [0.1, 1650]], 'heavy') * u };
      const P = mapNY(cam); topScrim(620);
      pin(...P(PL.manhattan), t - 1.2, { label: 'แมนฮัตตัน', side: -1, color: C.fog });
      pin(...P(PL.jfk), t - 2.5, { label: 'สนามบิน JFK', side: 1 });
      if (t > 3.2) path([P(PL.manhattan), P(PL.jfk)], remap(t, 3.2, 4.4), { color: C.fog, width: 4 * u, dash: [12 * u, 10 * u] });
      kicker('นิวยอร์ก · ธันวาคม 1978', TX, 250 * u, t, { color: C.red });
      say('สนามบิน JFK ย่านควีนส์', TX, 345 * u, t - 0.3, { size: 54 * u, weight: 800, color: C.cream });
      g.fillStyle = 'rgba(10,16,28,0.82)'; if (t > 5) g.fillRect(0, 1420 * u, W, 150 * u);
      say('ห่างจากแมนฮัตตันราว 20 กม.', TX, 1510 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(9), to: bar(12), cues: [[0.2, 'whoosh', 0.5], [2.5, 'thump', 0.7], [5.0, 'pop', 0.6]],
    draw(t) {
      const sc = track(t, [[0, 1], [2.3, 1.12]], 'heavy');
      g.save(); g.translate(780 * u, 1050 * u); g.scale(sc, sc); g.translate(-780 * u, -1050 * u);
      airport(t, { px: 250, py: 1290, ps: 260 });
      g.restore();
      g.fillStyle = 'rgba(14,11,9,0.85)'; g.fillRect(0, 1360 * u, W, 230 * u);
      kicker('Lufthansa Cargo Terminal', TX, 250 * u, t, { color: C.red });
      say('อาคารคลังสินค้า Building 261', TX, 360 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      say('มีห้องนิรภัยเก็บของมีค่าก่อนส่งต่อ', TX, 1440 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.cream });
      say('รวมถึงธนบัตรดอลลาร์ที่ส่งมาจากเยอรมนี', TX, 1530 * u, t - 5.0, { size: 40 * u, weight: 800, color: SODIUM });
      finish(0.8);
    } },
  // ---------------- the inside man and the tip
  { from: bar(12), to: bar(14), cues: [[0.2, 'thump', 0.6], [2.5, 'type', 0.5]],
    draw(t) {
      paper();
      const s = spring(t - 0.2, 'default');
      person(TX, 1080 * u, 240 * u * s, C.ink, { tie: C.inkSoft });
      g.fillStyle = '#6B5136'; g.fillRect(TX - 380 * u, 1080 * u, 760 * u, 40 * u); g.fillRect(TX - 360 * u, 1120 * u, 30 * u, 200 * u); g.fillRect(TX + 330 * u, 1120 * u, 30 * u, 200 * u);
      carton(TX - 250 * u, 1080 * u, 120 * u, 90 * u); carton(TX + 250 * u, 1080 * u, 100 * u, 120 * u);
      g.fillStyle = C.paper2; rrect(g, TX - 300 * u, 1370 * u, 600 * u, 90 * u, 10 * u); g.fill();
      typewriter('L. WERNER · CARGO', TX, 1430 * u, t - 0.6, { size: 34 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, align: 'center', cps: 16 });
      kicker('คนใน', TX, 300 * u, t);
      say('Louis Werner\nหัวหน้างานคลังสินค้าของสายการบิน', TX, 420 * u, t - 0.2, { size: 50 * u, weight: 800 });
      say('มีหนี้พนันก้อนโต', TX, 1530 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(14), to: bar(17), cues: [[0.3, 'pop', 0.6], [1.6, 'pop', 0.6], [2.9, 'pop', 0.6], [4.2, 'pop', 0.7], [6.2, 'thump', 0.5]],
    draw(t) {
      paper();
      const N = [['Louis Werner', 'คนในคลังสินค้า'], ['Martin Krugman', 'เจ้ามือรับพนัน'], ['Henry Hill', 'คนในแก๊ง'], ['Jimmy Burke', 'ผู้วางแผน']];
      N.forEach(([n, r], i) => { const at = 0.3 + i * 1.3, s = spring(t - at, 'snappy'); if (s <= 0) return;
        const x = i % 2 ? TX + 170 * u : TX - 170 * u, y = 640 * u + i * 190 * u;
        if (i > 0) { const px = (i - 1) % 2 ? TX + 170 * u : TX - 170 * u, py = 640 * u + (i - 1) * 190 * u;
          const e = path([[px, py + 75 * u], [x, y - 10 * u]], remap(t, at - 0.5, at), { color: C.red, width: 5 * u, dash: [12 * u, 8 * u] }); }
        g.save(); g.translate(x, y); g.scale(s, s);
        g.fillStyle = i === 3 ? C.ink : C.paper2; rrect(g, -250 * u, -65 * u, 500 * u, 140 * u, 14 * u); g.fill();
        person(-180 * u, 60 * u, 40 * u, i === 3 ? C.red : C.inkSoft);
        text(g, n, -120 * u, -6 * u, { size: 38 * u, weight: 700, family: 'Inter, sans-serif', color: i === 3 ? C.paper : C.ink, align: 'left' });
        text(g, r, -120 * u, 46 * u, { size: 32 * u, weight: 800, family: THAI, color: i === 3 ? C.paper3 : C.inkSoft, align: 'left' });
        g.restore(); });
      kicker('ข้อมูลรั่วออกไปเป็นทอด ๆ', TX, 300 * u, t);
      say('Werner บอกวิธีเข้าอาคารและห้องนิรภัย', TX, 420 * u, t - 0.1, { size: 44 * u, weight: 800 });
      say('ข่าวไปถึงแก๊งในย่านควีนส์', TX, 1440 * u, t - 6.2, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(17), to: bar(20), cues: [[0.2, 'thump', 0.7], [2.5, 'type', 0.5], [5.0, 'thump', 0.6]],
    draw(t) {
      night('#0B1018');
      const gr = g.createRadialGradient(TX, 860 * u, 0, TX, 860 * u, 520 * u); gr.addColorStop(0, 'rgba(233,168,74,0.25)'); gr.addColorStop(1, 'rgba(233,168,74,0)');
      g.fillStyle = gr; g.fillRect(0, 300 * u, W, 1200 * u);
      const s = spring(t - 0.2, 'default');
      person(TX, 1180 * u, 280 * u * s, '#05070A', { tie: C.red });
      g.fillStyle = C.night3; rrect(g, TX - 340 * u, 1260 * u, 680 * u, 90 * u, 10 * u); g.fill();
      typewriter('JAMES "JIMMY THE GENT" BURKE', TX, 1320 * u, t - 2.5, { size: 32 * u, weight: 700, family: 'Inter, sans-serif', color: C.cream, align: 'center', cps: 18 });
      kicker('ผู้ถูกเชื่อว่าเป็นผู้วางแผน', TX, 300 * u, t, { color: C.red });
      say('Jimmy Burke\nฉายา “Jimmy the Gent”', TX, 400 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      say('ผู้ร่วมงานของตระกูลมาเฟีย Lucchese', TX, 1460 * u, t - 5.0, { size: 44 * u, weight: 800, color: SODIUM });
      finish(0.8);
    } },
  // ---------------- the night
  { from: bar(20), to: bar(22), cues: Array.from({ length: 4 }, (_, i) => [i * 0.18, 'tick', 0.5]).concat([[1.25, 'thump', 0.7]]),
    draw(t) {
      paper(); kicker('ธันวาคม 1978', TX, 420 * u, t);
      const d = ['08', '09', '10', '11'];
      flip(TX, 800 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.18), t, { size: 360 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('เช้ามืดวันจันทร์ ราวตี 3', TX, 1220 * u, t - 1.0, { size: 54 * u, weight: 800 });
      say('พนักงานกะดึกกำลังพักกินข้าว', TX, 1330 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(22), to: bar(25), cues: [[0.2, 'whoosh', 0.6], [2.5, 'thump', 0.6]].concat(Array.from({ length: 6 }, (_, i) => [3.8 + i * 0.3, 'pop', 0.4])),
    draw(t) {
      airport(t, { plane: false });
      const vx = track(t, [[0, -300 * u], [0.2, 540 * u]], 'heavy');
      van(vx, 1330 * u, 360 * u, { lights: t < 3 ? 1 : 0.3 });
      for (let i = 0; i < 6; i++) { const s = spring(t - 3.8 - i * 0.3, 'default'); if (s <= 0) continue;
        g.save(); g.globalAlpha = clamp(s); masked(150 * u + i * 125 * u, 1500 * u - (1 - s) * 30 * u, 62 * u, '#05070A'); g.restore(); }
      g.fillStyle = 'rgba(4,6,11,0.8)'; g.fillRect(0, 200 * u, W, 330 * u);
      kicker('คืนนั้น', TX, 290 * u, t, { color: C.red });
      say('รถตู้สีดำมาถึงคลังสินค้า', TX, 400 * u, t - 0.2, { size: 52 * u, weight: 800, color: C.cream });
      g.fillStyle = 'rgba(4,6,11,0.75)'; if (t > 3.6) g.fillRect(0, 560 * u, W, 130 * u);
      say('ชายสวมหน้ากากราว 6 คน พร้อมอาวุธ', TX, 640 * u, t - 3.8, { size: 46 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(25), to: bar(28), cues: [[0.2, 'thump', 0.6], [1.0, 'swish', 0.4], [5.0, 'impact', 0.8]],
    draw(t) {
      night('#0B1420');
      // blueprint floor plan
      g.save(); g.strokeStyle = 'rgba(140,151,173,0.12)'; g.lineWidth = 1 * u;
      for (let x = 0; x < W; x += 60 * u) { g.beginPath(); g.moveTo(x, 560 * u); g.lineTo(x, 1380 * u); g.stroke(); }
      for (let y = 560 * u; y < 1390 * u; y += 60 * u) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
      g.restore();
      const R = [[100, 600, 520, 760, 'คลังสินค้า'], [640, 600, 300, 340, 'ห้องพักพนักงาน'], [640, 960, 300, 400, 'ห้องนิรภัย']];
      R.forEach(([x, y, w, h, l], i) => { g.strokeStyle = i === 1 ? C.red : C.cream; g.lineWidth = 5 * u; g.strokeRect(x * u, y * u, w * u, h * u);
        text(g, l, (x + w / 2) * u, (y + h - 24) * u, { size: 30 * u, weight: 700, family: THAI, color: i === 1 ? C.red : C.fog }); });
      for (let i = 0; i < 10; i++) {
        const sx = (160 + hash(i, 3) * 400) * u, sy = (660 + hash(i, 4) * 600) * u, ex = (680 + (i % 5) * 52) * u, ey = (680 + Math.floor(i / 5) * 70) * u;
        const p = clamp(spring(t - 1.0 - i * 0.25, 'default'));
        g.fillStyle = C.cream; g.beginPath(); g.arc(sx + (ex - sx) * p, sy + (ey - sy) * p, 14 * u, 0, 7); g.fill(); }
      for (let i = 0; i < 3; i++) { const p = clamp(remap(t, 0.5 + i * 0.3, 3.5));
        g.fillStyle = C.red; g.beginPath(); g.arc((140 + p * (440 + i * 30)) * u, (1300 - p * 300 - i * 80) * u, 16 * u, 0, 7); g.fill(); }
      kicker('ภายในอาคาร', TX, 300 * u, t, { color: C.red });
      say('พนักงานถูกต้อนไปรวมกันเป็นตัวประกัน', TX, 420 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      say('ไม่มีการยิงปืนแม้แต่นัดเดียว', TX, 1480 * u, t - 5.0, { size: 52 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(28), to: bar(31), cues: [[0.2, 'click', 0.8], [1.0, 'whoosh', 0.5]].concat(Array.from({ length: 12 }, (_, i) => [2.0 + i * 0.42, 'thump', 0.3])),
    draw(t) {
      const n = Math.round(40 * clamp(remap(t, 2.0, 7.0)));
      vaultRoom(t, { left: 24 - Math.round(24 * n / 40), gate: clamp(spring(t - 0.3, 'heavy')) });
      g.fillStyle = 'rgba(12,15,20,0.88)'; g.fillRect(0, 200 * u, W, 330 * u); g.fillRect(0, 1390 * u, W, 210 * u);
      kicker('ห้องนิรภัย', TX, 290 * u, t, { color: C.red });
      say('พนักงานถูกบังคับให้ปิดสัญญาณกันขโมย\nแล้วเปิดห้องนิรภัย', TX, 390 * u, t - 0.2, { size: 44 * u, weight: 800, color: C.cream });
      text(g, `${n}`, TX + 10 * u, 1530 * u, { size: 120 * u, weight: 400, family: SERIF, color: n >= 40 ? C.red : C.cream, align: 'right' });
      text(g, 'ลัง', TX + 30 * u, 1520 * u, { size: 50 * u, weight: 800, family: THAI, color: C.cream, align: 'left' });
      say('ขนลังเงินและของมีค่า ราว 40 ลัง', TX, 1170 * u, t - 7.0, { size: 44 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(31), to: bar(34), cues: Array.from({ length: 12 }, (_, i) => [i * 0.625, 'tick', 0.35]).concat([[5.0, 'whoosh', 0.7]]),
    draw(t) {
      night('#0B1018');
      const m = 64 * clamp(remap(t, 0.2, 4.5));
      clock(TX, 900 * u, 270 * u, m);
      text(g, `${Math.round(m)} นาที`, TX, 1290 * u, { size: 90 * u, weight: 400, family: SERIF, color: m >= 64 ? C.red : C.cream });
      kicker('ทั้งหมดนี้ใช้เวลา', TX, 300 * u, t, { color: C.red });
      say('ราว 1 ชั่วโมง', TX, 420 * u, t - 0.2, { size: 64 * u, weight: 800, color: C.cream });
      text(g, '* หลายแหล่งระบุ 64 นาที', TX, 1360 * u, { size: 30 * u, weight: 600, family: THAI, color: C.fog, alpha: clamp((t - 4.5) / 0.3) });
      say('แล้วรถตู้ก็หายไปในความมืด', TX, 1500 * u, t - 5.0, { size: 48 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
];
