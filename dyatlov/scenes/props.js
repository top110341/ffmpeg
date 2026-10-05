// scenes/props.js — Dyatlov Pass props: snow night, the slope, the tent, footprints, the cedar, the ravine.
import { g, u, W, H, C, SERIF, THAI, spring, clamp, hash, noise, text, rrect } from './kit.js';

export const SNOW = '#DCE3EA', SNOW2 = '#AFC0CF', SKY = '#0B1422';

export function snowfall(t, o = {}) {
  const { n = 160, wind = 0.6, alpha = 0.8 } = o;
  g.save(); g.fillStyle = '#F2F5F8';
  for (let i = 0; i < n; i++) {
    const z = 0.4 + hash(i, 7) * 0.6, span = H + 200 * u;
    const y = ((hash(i, 8) * span + t * 160 * u * z) % span) - 100 * u;
    const x = ((hash(i, 9) * W + t * 220 * u * wind * z + Math.sin(t * 2 + i) * 20 * u) % W + W) % W;
    g.globalAlpha = alpha * z; g.beginPath(); g.arc(x, y, 3.2 * u * z, 0, 7); g.fill();
  }
  g.restore();
}
// Mountain slope: a ridge line from upper-left to lower-right, snow below.
export function slope(y0, y1, o = {}) {
  const { color = SNOW2, seed = 2 } = o;
  g.fillStyle = color; g.beginPath(); g.moveTo(0, y0);
  for (let x = 0; x <= W; x += 30 * u) g.lineTo(x, y0 + (y1 - y0) * (x / W) + noise(x / (140 * u), seed) * 30 * u);
  g.lineTo(W, H); g.lineTo(0, H); g.closePath(); g.fill();
}
export function tent(x, y, s, o = {}) {
  const { cut = 0, collapsed = 0, color = '#C9B98F' } = o;
  g.save(); g.translate(x, y); g.scale(s, s);
  const ry = -0.5 * (1 - collapsed * 0.7);
  g.fillStyle = color; g.beginPath(); g.moveTo(-1, 0); g.lineTo(-0.85, ry); g.lineTo(0.85, ry); g.lineTo(1, 0); g.closePath(); g.fill();
  g.fillStyle = 'rgba(0,0,0,0.25)'; g.beginPath(); g.moveTo(-0.85, ry); g.lineTo(-1, 0); g.lineTo(-0.7, 0); g.closePath(); g.fill();
  if (cut > 0) { g.strokeStyle = '#0B1422'; g.lineWidth = 0.035; g.lineCap = 'round';
    for (let k = 0; k < 3; k++) { const p = clamp(cut * 3 - k); if (p <= 0) continue; const x0 = -0.3 + k * 0.25; g.beginPath(); g.moveTo(x0, ry * 0.85); g.lineTo(x0 + 0.05, ry * 0.85 + (-ry * 0.8) * p); g.stroke(); } }
  g.fillStyle = 'rgba(255,255,255,0.7)'; g.fillRect(-0.85, ry - 0.04, 1.7, 0.05);
  g.restore();
}
// Footprint trail from (x0,y0) to (x1,y1), p = 0..1 drawn.
export function prints(x0, y0, x1, y1, p, o = {}) {
  const { color = '#6F849A', n = 22, lanes = 5, seed = 3 } = o;
  g.fillStyle = color;
  for (let l = 0; l < lanes; l++) for (let i = 0; i < n; i++) {
    const f = i / n; if (f > p) break;
    const off = (l - lanes / 2) * 34 * u + noise(f * 6 + l, seed) * 10 * u, side = i % 2 ? 1 : -1;
    const x = x0 + (x1 - x0) * f + off + side * 9 * u, y = y0 + (y1 - y0) * f;
    g.beginPath(); g.ellipse(x, y, 8 * u, 14 * u, 0.3, 0, 7); g.fill();
  }
}
export function cedar(x, y, s, color = '#0E1A16') {
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color;
  g.fillRect(-0.05, -0.4, 0.1, 0.4);
  for (let k = 0; k < 6; k++) { const w = 0.55 - k * 0.07, yy = -0.3 - k * 0.22; g.beginPath(); g.moveTo(-w, yy); g.lineTo(0, yy - 0.42); g.lineTo(w, yy); g.closePath(); g.fill(); }
  g.restore();
}
export function forestLine(y, s = 1, color = '#0E1A16', seed = 4) {
  for (let i = 0; i < 18; i++) cedar((i / 17) * (W + 100 * u) - 50 * u, y + hash(i, seed) * 30 * u, (90 + hash(i, seed + 1) * 70) * u * s, color);
}
// Hiker silhouette with a backpack.
export function hiker(x, y, s, color = '#1A2230', step = 0) {
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color;
  g.beginPath(); g.arc(0, -1.6, 0.17, 0, 7); g.fill();
  rrect(g, -0.2, -1.42, 0.4, 0.75, 0.1); g.fill();
  rrect(g, -0.42, -1.4, 0.26, 0.6, 0.08); g.fill();
  const a = Math.sin(step) * 0.3;
  g.save(); g.translate(-0.08, -0.7); g.rotate(a); g.fillRect(-0.06, 0, 0.12, 0.7); g.restore();
  g.save(); g.translate(0.08, -0.7); g.rotate(-a); g.fillRect(-0.06, 0, 0.12, 0.7); g.restore();
  g.fillRect(0.22, -1.4, 0.04, 1.4);
  g.restore();
}
