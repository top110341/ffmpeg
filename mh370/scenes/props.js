// scenes/props.js — MH370-specific props on top of kit.js.
import { g, u, W, H, C, SERIF, THAI, spring, clamp, hash, noise, text, rrect, map, dest, gcDist } from './kit.js';
import { LANDS, PLACE } from './geo.js';

export const mapAsia = (cam, o = {}) => map(cam, { lands: LANDS, ...o });

// Radar scope with a rotating sweep. blips: [{x, y, label, alive}] in scope-local px (0,0 = centre).
export function radar(x, y, r, t, blips = [], o = {}) {
  const { sweep = 1.4 } = o;
  g.save(); g.translate(x, y);
  g.fillStyle = '#07101C'; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill();
  g.strokeStyle = C.fog; g.globalAlpha = 0.35; g.lineWidth = 2 * u;
  for (let k = 1; k <= 4; k++) { g.beginPath(); g.arc(0, 0, (r * k) / 4, 0, 7); g.stroke(); }
  g.beginPath(); g.moveTo(-r, 0); g.lineTo(r, 0); g.moveTo(0, -r); g.lineTo(0, r); g.stroke();
  g.globalAlpha = 1;
  const a = t * sweep * Math.PI * 2;
  for (let k = 0; k < 24; k++) {           // sweep trail
    g.globalAlpha = 0.22 * (1 - k / 24);
    g.fillStyle = C.fog; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, r, a - (k + 1) * 0.03, a - k * 0.03); g.fill();
  }
  g.globalAlpha = 1;
  g.strokeStyle = C.cream; g.lineWidth = 3 * u; g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(a) * r, Math.sin(a) * r); g.stroke();
  for (const b of blips) {
    if (b.alive === 0) continue;
    const ang = Math.atan2(b.y, b.x), since = ((a - ang) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
    const glow = Math.max(0.35, 1 - since / (Math.PI * 2)) * (b.alive ?? 1);
    g.globalAlpha = glow; g.fillStyle = b.color || C.red;
    g.beginPath(); g.arc(b.x, b.y, 12 * u, 0, 7); g.fill();
    if (b.label) text(g, b.label, b.x + 24 * u, b.y + 12 * u, { size: 34 * u, weight: 700, family: 'Inter, sans-serif', color: C.cream, align: 'left' });
    g.globalAlpha = 1;
  }
  g.strokeStyle = C.fog; g.lineWidth = 4 * u; g.beginPath(); g.arc(0, 0, r, 0, 7); g.stroke();
  g.restore();
}

export function satellite(x, y, s, rot = 0, color = C.cream) {
  g.save(); g.translate(x, y); g.rotate(rot); g.fillStyle = color;
  rrect(g, -0.18 * s, -0.25 * s, 0.36 * s, 0.5 * s, 0.05 * s); g.fill();
  for (const sx of [-1, 1]) {
    g.fillRect(sx > 0 ? 0.2 * s : -0.9 * s, -0.16 * s, 0.7 * s, 0.32 * s);
    g.fillStyle = C.night; for (let i = 1; i < 4; i++) g.fillRect((sx > 0 ? 0.2 : -0.9) * s + i * 0.175 * s, -0.16 * s, 0.015 * s, 0.32 * s);
    g.fillStyle = color;
  }
  g.beginPath(); g.ellipse(0, 0.32 * s, 0.14 * s, 0.07 * s, 0, 0, 7); g.fill();
  g.restore();
}

// Night sea surface: stacked wave lines scrolling sideways. y0 = horizon.
export function sea(t, y0, o = {}) {
  const { color = C.fog, rows = 14, alpha = 0.5 } = o;
  g.save(); g.strokeStyle = color; g.lineWidth = 2 * u;
  for (let r = 0; r < rows; r++) {
    const y = y0 + Math.pow(r / rows, 1.6) * (H - y0), amp = (4 + r * 2.2) * u, k = 0.012 / (1 + r * 0.25) / u;
    g.globalAlpha = alpha * (0.3 + 0.7 * r / rows);
    g.beginPath();
    for (let x = 0; x <= W; x += 12 * u) {
      const yy = y + Math.sin(x * k + t * (1.2 + r * 0.08) + r * 1.7) * amp + noise(x / (180 * u) + r * 3, r) * amp;
      x ? g.lineTo(x, yy) : g.moveTo(x, yy);
    }
    g.stroke();
  }
  g.restore();
}

// Small person icon for crowd grids.
export function dot(x, y, s, color) {
  g.fillStyle = color; g.beginPath(); g.arc(x, y - s * 0.55, s * 0.32, 0, 7); g.fill();
  rrect(g, x - s * 0.36, y - s * 0.18, s * 0.72, s * 0.62, s * 0.3); g.fill();
}

// Flaperon outline (trailing-edge wing piece), centred; 1 unit = s px.
export function flaperon(x, y, s, rot = 0, color = C.cream, o = {}) {
  const { barnacles = 0 } = o;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  g.fillStyle = color;
  g.beginPath(); g.moveTo(-1, -0.12); g.lineTo(1, -0.22); g.lineTo(1.02, 0.02); g.lineTo(0.95, 0.16); g.lineTo(-0.95, 0.22); g.lineTo(-1.02, 0.06); g.closePath(); g.fill();
  g.strokeStyle = 'rgba(0,0,0,0.25)'; g.lineWidth = 0.01;
  for (let i = 1; i < 6; i++) { const xx = -1 + i * 0.33; g.beginPath(); g.moveTo(xx, -0.14 - i * 0.012); g.lineTo(xx, 0.2 - i * 0.012); g.stroke(); }
  if (barnacles) { g.fillStyle = 'rgba(70,60,40,0.55)'; for (let i = 0; i < 60 * barnacles; i++) { g.beginPath(); g.arc(-0.95 + hash(i, 5) * 0.4, 0.1 + (hash(i, 6) - 0.5) * 0.2, 0.008 + hash(i, 7) * 0.012, 0, 7); g.fill(); } }
  g.restore();
}

// Ping arc i (1..7): a small circle around the satellite sub-point through a reference position.
const ANCHOR = [[6.6, 96.5], [3.0, 94.0], [-3.5, 92.6], [-10.5, 92.0], [-18.5, 92.0], [-31.5, 92.6], [-35.6, 92.0]];
export function arcPts(i, from = 1.0, to = 2.9, n = 60) {
  const d = gcDist(PLACE.sat, ANCHOR[i - 1]);
  return Array.from({ length: n + 1 }, (_, k) => dest(PLACE.sat, d, from + (to - from) * (k / n)));
}
