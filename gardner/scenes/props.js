// scenes/props.js — Gardner heist props: gilded frames, stylised (not reproduced) paintings, floor plan, police silhouette.
import { g, u, W, H, C, SERIF, THAI, spring, clamp, hash, noise, text, rrect } from './kit.js';

export const GOLD = '#B8913E', GOLD2 = '#8A6A26', WALL = '#2A3B2F', WALL2 = '#22302A';

// Museum wall: dark green damask suggestion.
export function wall(c1 = WALL, c2 = WALL2) {
  g.fillStyle = c1; g.fillRect(0, 0, W, H);
  g.fillStyle = c2;
  for (let y = 0; y < H; y += 90 * u) for (let x = ((y / (90 * u)) % 2) * 60 * u; x < W; x += 120 * u) {
    g.beginPath(); g.ellipse(x, y, 18 * u, 30 * u, 0, 0, 7); g.fill();
  }
}

// Gilded frame; inner area left as-is (empty) or filled by a callback.
export function frame(x, y, w, h, o = {}) {
  const { border = 0.09, inner = null, emptyFill = WALL2 } = o;
  const b = Math.min(w, h) * border;
  g.save(); g.translate(x, y);
  g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(-w / 2 + 14 * u, -h / 2 + 18 * u, w, h);
  g.fillStyle = GOLD; g.fillRect(-w / 2, -h / 2, w, h);
  g.strokeStyle = GOLD2; g.lineWidth = b * 0.18;
  for (let k = 1; k <= 3; k++) { const d = (b * k) / 4; g.strokeRect(-w / 2 + d, -h / 2 + d, w - 2 * d, h - 2 * d); }
  // ornament beads
  g.fillStyle = '#D9B865';
  const n = Math.floor((w + h) / (26 * u));
  for (let i = 0; i < n; i++) { const f = i / n, px = -w / 2 + b * 0.5 + f * (w - b), py = -h / 2 + b * 0.5; g.beginPath(); g.arc(px, py, b * 0.12, 0, 7); g.fill(); g.beginPath(); g.arc(px, -py, b * 0.12, 0, 7); g.fill(); }
  g.fillStyle = emptyFill; g.fillRect(-w / 2 + b, -h / 2 + b, w - 2 * b, h - 2 * b);
  if (inner) { g.save(); g.beginPath(); g.rect(-w / 2 + b, -h / 2 + b, w - 2 * b, h - 2 * b); g.clip(); inner(w - 2 * b, h - 2 * b); g.restore(); }
  g.restore();
}

// Stylised stand-ins for the stolen works — simple shapes only, never reproductions.
export function stormPainting(w, h, t = 0) {
  g.fillStyle = '#1C2028'; g.fillRect(-w / 2, -h / 2, w, h);
  g.save(); g.fillStyle = '#E2CF9C'; g.globalAlpha *= 0.5; g.beginPath(); g.ellipse(-w * 0.25, -h * 0.3, w * 0.35, h * 0.2, -0.4, 0, 7); g.fill(); g.restore();
  g.fillStyle = '#2F3A3A';
  g.beginPath(); g.moveTo(-w / 2, h * 0.2);
  for (let i = 0; i <= 20; i++) { const x = -w / 2 + (i / 20) * w; g.lineTo(x, h * 0.2 + Math.sin(i * 1.3 + t * 2) * h * 0.06); }
  g.lineTo(w / 2, h / 2); g.lineTo(-w / 2, h / 2); g.fill();
  g.save(); g.translate(-w * 0.05, h * 0.05); g.rotate(-0.35 + Math.sin(t * 1.5) * 0.05);
  g.fillStyle = '#4A3420'; g.beginPath(); g.moveTo(-w * 0.3, 0); g.lineTo(w * 0.3, -h * 0.05); g.lineTo(w * 0.2, h * 0.1); g.lineTo(-w * 0.22, h * 0.1); g.fill();
  g.fillRect(-w * 0.01, -h * 0.45, w * 0.02, h * 0.45);
  g.fillStyle = '#C9B57E'; g.beginPath(); g.moveTo(0, -h * 0.44); g.lineTo(w * 0.22, -h * 0.12); g.lineTo(0, -h * 0.1); g.fill();
  g.restore();
}
export function concertPainting(w, h) {
  g.fillStyle = '#3B3326'; g.fillRect(-w / 2, -h / 2, w, h);
  g.fillStyle = '#6B5B40'; g.fillRect(-w / 2, -h * 0.05, w, h * 0.55);
  g.fillStyle = '#C8B48A'; g.fillRect(-w * 0.35, -h * 0.4, w * 0.3, h * 0.25); g.fillRect(w * 0.05, -h * 0.4, w * 0.3, h * 0.25);
  for (const [x, c] of [[-0.25, '#D8C9A6'], [0.02, '#5A4630'], [0.25, '#E6D7B0']]) {
    g.fillStyle = c; g.beginPath(); g.arc(x * w, -h * 0.02, w * 0.045, 0, 7); g.fill(); rrect(g, x * w - w * 0.07, h * 0.03, w * 0.14, h * 0.3, w * 0.04); g.fill();
  }
  g.fillStyle = '#2A2118'; g.fillRect(-w * 0.18, h * 0.12, w * 0.3, h * 0.08);
}
export function cutCanvas(w, h, p) {           // knife lines around the edge of a canvas, p 0..1
  g.strokeStyle = '#F2EAD6'; g.lineWidth = 4 * u; g.setLineDash([10 * u, 6 * u]);
  const per = 2 * (w + h), len = per * clamp(p);
  g.beginPath(); g.moveTo(-w / 2, -h / 2);
  const pts = [[w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2], [-w / 2, -h / 2]];
  let acc = 0, px = -w / 2, py = -h / 2;
  for (const [x, y] of pts) { const d = Math.hypot(x - px, y - py); if (acc + d >= len) { const f = (len - acc) / d; g.lineTo(px + (x - px) * f, py + (y - py) * f); break; } g.lineTo(x, y); acc += d; px = x; py = y; }
  g.stroke(); g.setLineDash([]);
}

// Police-officer silhouette with cap.
export function officer(x, y, s, color = '#0B1020') {
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color;
  g.beginPath(); g.ellipse(0, -1.12, 0.34, 0.4, 0, 0, 7); g.fill();
  g.beginPath(); g.moveTo(-0.48, -1.38); g.lineTo(0.48, -1.38); g.lineTo(0.38, -1.62); g.lineTo(-0.38, -1.62); g.closePath(); g.fill();
  g.fillRect(-0.55, -1.42, 1.1, 0.08);
  g.beginPath(); g.moveTo(-0.9, 0.8); g.quadraticCurveTo(-0.85, -0.5, -0.2, -0.62); g.lineTo(0.2, -0.62); g.quadraticCurveTo(0.85, -0.5, 0.9, 0.8); g.closePath(); g.fill();
  g.fillStyle = '#C9A94A'; g.beginPath(); g.moveTo(-0.42, -0.3); g.lineTo(-0.3, -0.38); g.lineTo(-0.18, -0.3); g.lineTo(-0.22, -0.12); g.lineTo(-0.38, -0.12); g.closePath(); g.fill();
  g.restore();
}

// Floor plan of the rooms that matter (schematic, not to scale).
export const ROOMS = {
  dutch: { x: -330, y: -330, w: 380, h: 300, name: 'Dutch Room', floor: 'ชั้น 2' },
  short: { x: 90, y: -330, w: 240, h: 300, name: 'Short Gallery', floor: 'ชั้น 2' },
  blue: { x: -330, y: 140, w: 300, h: 240, name: 'Blue Room', floor: 'ชั้น 1' },
  court: { x: 20, y: 140, w: 310, h: 240, name: 'Courtyard', floor: '' },
};
export function plan(cx, cy, t, o = {}) {
  const { hot = {}, line = '#C8C2B0', fill = '#1E2620' } = o;
  g.save(); g.translate(cx, cy);
  for (const [k, r] of Object.entries(ROOMS)) {
    g.fillStyle = hot[k] ? `rgba(200,50,30,${0.25 * hot[k]})` : fill; g.fillRect(r.x * u, r.y * u, r.w * u, r.h * u);
    g.strokeStyle = hot[k] ? C.red : line; g.lineWidth = 4 * u; g.strokeRect(r.x * u, r.y * u, r.w * u, r.h * u);
    text(g, r.name, (r.x + r.w / 2) * u, (r.y + r.h / 2) * u, { size: 34 * u, weight: 700, family: 'Inter, sans-serif', color: hot[k] ? C.cream : line });
    if (r.floor) text(g, r.floor, (r.x + r.w / 2) * u, (r.y + r.h / 2 + 46) * u, { size: 28 * u, weight: 600, family: THAI, color: line });
  }
  g.fillStyle = line; g.globalAlpha = 0.6; g.fillRect(-340 * u, 75 * u, 680 * u, 6 * u); g.globalAlpha = 1;
  g.restore();
}
