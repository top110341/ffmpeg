// scenes/props.js — Abagnale props: pilot silhouette, cheque, airliner, prison bars, timeline bars.
import { g, u, W, H, C, SERIF, THAI, spring, clamp, hash, noise, text, rrect, planeTop } from './kit.js';

export const NAVY = '#14213D', GOLD = '#C9A94A';

export function pilot(x, y, s, color = NAVY, o = {}) {
  const { badge = GOLD } = o;
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color;
  g.beginPath(); g.ellipse(0, -1.12, 0.34, 0.4, 0, 0, 7); g.fill();
  g.beginPath(); g.moveTo(-0.5, -1.36); g.quadraticCurveTo(0, -1.75, 0.5, -1.36); g.closePath(); g.fill();
  g.fillRect(-0.58, -1.4, 1.16, 0.09);
  g.fillStyle = badge; g.fillRect(-0.12, -1.6, 0.24, 0.08);
  g.fillStyle = color;
  g.beginPath(); g.moveTo(-0.9, 0.8); g.quadraticCurveTo(-0.85, -0.5, -0.2, -0.62); g.lineTo(0.2, -0.62); g.quadraticCurveTo(0.85, -0.5, 0.9, 0.8); g.closePath(); g.fill();
  g.fillStyle = '#F2EEE4'; g.beginPath(); g.moveTo(-0.16, -0.6); g.lineTo(0, -0.3); g.lineTo(0.16, -0.6); g.fill();
  g.fillStyle = badge; g.fillRect(-0.55, -0.32, 0.3, 0.05); g.fillRect(-0.7, 0.35, 0.25, 0.04); g.fillRect(-0.7, 0.42, 0.25, 0.04); g.fillRect(0.45, 0.35, 0.25, 0.04); g.fillRect(0.45, 0.42, 0.25, 0.04);
  g.restore();
}
export function cheque(x, y, w, rot = 0, o = {}) {
  const { amount = '', payee = '', seed = 1, stamp = '' } = o;
  const h = w * 0.42;
  g.save(); g.translate(x, y); g.rotate(rot);
  g.fillStyle = 'rgba(0,0,0,0.18)'; g.fillRect(-w / 2 + 8 * u, -h / 2 + 10 * u, w, h);
  g.fillStyle = '#E6EEE3'; g.fillRect(-w / 2, -h / 2, w, h);
  g.strokeStyle = '#B5C7B0'; g.lineWidth = 2 * u; for (let i = 0; i < 9; i++) { g.beginPath(); g.moveTo(-w / 2, -h / 2 + i * h / 8); g.lineTo(w / 2, -h / 2 + i * h / 8 + h * 0.05); g.stroke(); }
  g.fillStyle = '#2C3E2C';
  text(g, 'PAY TO THE ORDER OF', -w * 0.42, -h * 0.12, { size: h * 0.08, weight: 700, family: 'Inter, sans-serif', color: '#2C3E2C', align: 'left' });
  g.fillRect(-w * 0.42, h * 0.02, w * 0.55, 2 * u);
  if (payee) text(g, payee, -w * 0.4, -h * 0.0, { size: h * 0.12, weight: 400, family: '"Instrument Serif"', color: C.ink, align: 'left' });
  rrect(g, w * 0.2, -h * 0.2, w * 0.24, h * 0.2, 4 * u); g.strokeStyle = '#2C3E2C'; g.stroke();
  if (amount) text(g, amount, w * 0.32, -h * 0.05, { size: h * 0.12, weight: 700, family: 'Inter, sans-serif', color: C.ink });
  g.fillRect(w * 0.05, h * 0.3, w * 0.38, 2 * u);
  text(g, '⑈ 0210 ⑆ 4471 ⑈', -w * 0.25, h * 0.4, { size: h * 0.08, weight: 700, family: 'Inter, sans-serif', color: '#2C3E2C' });
  g.restore();
}
export function bars(x0, y0, w, h, p = 1, color = '#2A2D33') {
  g.fillStyle = color;
  const n = 9;
  for (let i = 0; i < n; i++) { const x = x0 + (i + 0.5) * (w / n) - 9 * u; g.fillRect(x, y0, 18 * u, h * clamp(p * 1.4 - i * 0.05)); }
  g.fillRect(x0, y0, w, 22 * u); g.fillRect(x0, y0 + h * 0.5, w * clamp(p), 18 * u);
}
// a horizontal year timeline from y1..y2, with spans [[from, to, color, label]]
export function timeline(x0, y, w, y1, y2, spans, t, o = {}) {
  const X = (yr) => x0 + ((yr - y1) / (y2 - y1)) * w;
  g.fillStyle = C.inkSoft; g.fillRect(x0, y, w, 4 * u);
  for (let yr = y1; yr <= y2; yr++) { g.fillRect(X(yr) - 1.5 * u, y - 12 * u, 3 * u, 28 * u); text(g, `'${String(yr).slice(2)}`, X(yr), y + 60 * u, { size: 30 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft }); }
  spans.forEach(([a, b, color, label, row = 0, at = 0]) => {
    const p = clamp(spring(t - at, 'default'));
    const yy = y - 90 * u - row * 120 * u;
    g.fillStyle = color; rrect(g, X(a), yy, (X(b) - X(a)) * p, 60 * u, 10 * u); g.fill();
    if (p > 0.5) text(g, label, X(a) + 16 * u, yy + 42 * u, { size: 32 * u, weight: 800, family: THAI, color: '#F7F2E6', align: 'left' });
  });
}
export { planeTop };
