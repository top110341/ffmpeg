// Mona Lisa theft, 1911 — Act 1: 0:00–0:55 (bars 0–22). Props are exported for a2.js.
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, map } from './kit.js';

export const GOLD = '#B8913E', GOLD2 = '#7E5F22', WALL = '#4A221D', WALL2 = '#3E1C18';
const INTER = 'Inter, sans-serif';

// ---------------------------------------------------------------- the gallery wall
export function wall(c1 = WALL, c2 = WALL2) {
  g.fillStyle = c1; g.fillRect(0, 0, W, H);
  g.fillStyle = c2;
  for (let y = 0; y < H; y += 90 * u) for (let x = ((y / (90 * u)) % 2) * 60 * u; x < W; x += 120 * u) {
    g.beginPath(); g.ellipse(x, y, 16 * u, 28 * u, 0, 0, 7); g.fill();
  }
  // dado rail + skirting
  g.fillStyle = '#2C1512'; g.fillRect(0, 1560 * u, W, H - 1560 * u);
  g.fillStyle = GOLD2; g.fillRect(0, 1550 * u, W, 10 * u);
}
// soft elliptical glow, the sfumato building block
function blob(x, y, rx, ry, rgb, a = 1) {
  g.save(); g.translate(x, y); g.scale(1, ry / rx);
  const gr = g.createRadialGradient(0, 0, 0, 0, 0, rx);
  gr.addColorStop(0, `rgba(${rgb},${a})`); gr.addColorStop(0.55, `rgba(${rgb},${a * 0.6})`); gr.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = gr; g.beginPath(); g.arc(0, 0, rx, 0, 7); g.fill(); g.restore();
}
// A stylised stand-in for the portrait: soft blobs only, no face, never a copy.
export function lisa(w, h) {
  const gr = g.createLinearGradient(0, -h / 2, 0, h / 2);
  gr.addColorStop(0, '#77836A'); gr.addColorStop(0.45, '#515A43'); gr.addColorStop(1, '#2B2A1E');
  g.fillStyle = gr; g.fillRect(-w / 2, -h / 2, w, h);
  blob(-0.36 * w, -0.16 * h, 0.26 * w, 0.07 * h, '170,185,160', 0.55);
  blob(0.36 * w, -0.24 * h, 0.24 * w, 0.06 * h, '170,185,160', 0.5);
  g.save(); g.strokeStyle = 'rgba(196,150,88,0.55)'; g.lineWidth = w * 0.018; g.lineCap = 'round';
  g.beginPath(); g.moveTo(-0.48 * w, 0.02 * h); g.bezierCurveTo(-0.3 * w, -0.02 * h, -0.44 * w, -0.08 * h, -0.3 * w, -0.12 * h); g.stroke(); g.restore();
  // body and veil
  g.fillStyle = '#211B13';
  g.beginPath(); g.moveTo(-0.1 * w, -0.1 * h); g.quadraticCurveTo(-0.36 * w, -0.02 * h, -0.42 * w, 0.12 * h); g.lineTo(-0.5 * w, 0.5 * h);
  g.lineTo(0.5 * w, 0.5 * h); g.lineTo(0.42 * w, 0.12 * h); g.quadraticCurveTo(0.36 * w, -0.02 * h, 0.1 * w, -0.1 * h); g.closePath(); g.fill();
  g.beginPath(); g.ellipse(0, -0.2 * h, 0.17 * w, 0.17 * h, 0, 0, 7); g.fill();
  blob(0, -0.2 * h, 0.12 * w, 0.14 * h, '214,170,106', 0.95);        // face: a warm haze, nothing more
  blob(0, 0.03 * h, 0.17 * w, 0.06 * h, '196,150,92', 0.7);          // neckline
  blob(-0.06 * w, 0.33 * h, 0.12 * w, 0.06 * h, '206,160,98', 0.85);  // folded hands
  blob(0.1 * w, 0.35 * h, 0.1 * w, 0.05 * h, '206,160,98', 0.75);
  g.fillStyle = 'rgba(190,150,60,0.12)'; g.fillRect(-w / 2, -h / 2, w, h);
  const v = g.createRadialGradient(0, 0, Math.min(w, h) * 0.3, 0, 0, Math.hypot(w, h) * 0.55);
  v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(10,8,4,0.55)'); g.fillStyle = v; g.fillRect(-w / 2, -h / 2, w, h);
}
// Gilded frame centred at (x, y); inner is a callback (w, h) drawn with origin at the centre.
export function frame(x, y, w, h, o = {}) {
  const { border = 0.1, inner = null, emptyFill = '#1C1410', rot = 0, shadow = true } = o;
  const b = Math.min(w, h) * border;
  g.save(); g.translate(x, y); g.rotate(rot);
  if (shadow) { g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(-w / 2 + 14 * u, -h / 2 + 18 * u, w, h); }
  g.fillStyle = GOLD; g.fillRect(-w / 2, -h / 2, w, h);
  g.strokeStyle = GOLD2; g.lineWidth = b * 0.16;
  for (let k = 1; k <= 3; k++) { const d = (b * k) / 4; g.strokeRect(-w / 2 + d, -h / 2 + d, w - 2 * d, h - 2 * d); }
  g.fillStyle = '#DDBD6A';
  const n = Math.floor((w + h) / (26 * u));
  for (let i = 0; i < n; i++) { const f = i / n, px = -w / 2 + b * 0.5 + f * (w - b), py = -h / 2 + b * 0.5; g.beginPath(); g.arc(px, py, b * 0.11, 0, 7); g.fill(); g.beginPath(); g.arc(px, -py, b * 0.11, 0, 7); g.fill(); }
  g.fillStyle = emptyFill; g.fillRect(-w / 2 + b, -h / 2 + b, w - 2 * b, h - 2 * b);
  if (inner) { g.save(); g.beginPath(); g.rect(-w / 2 + b, -h / 2 + b, w - 2 * b, h - 2 * b); g.clip(); inner(w - 2 * b, h - 2 * b); g.restore(); }
  g.restore();
}
// Glass case over a frame (Peruggia had helped build these).
export function glass(x, y, w, h, a = 1) {
  g.save(); g.globalAlpha *= a;
  g.fillStyle = 'rgba(200,225,235,0.10)'; g.fillRect(x - w / 2, y - h / 2, w, h);
  g.strokeStyle = 'rgba(220,235,240,0.75)'; g.lineWidth = 4 * u; g.strokeRect(x - w / 2, y - h / 2, w, h);
  g.beginPath(); g.rect(x - w / 2, y - h / 2, w, h); g.clip();
  g.fillStyle = 'rgba(255,255,255,0.13)';
  g.beginPath(); g.moveTo(x - w / 2, y + h * 0.1); g.lineTo(x - w * 0.1, y - h / 2); g.lineTo(x + w * 0.05, y - h / 2); g.lineTo(x - w / 2, y + h * 0.3); g.fill();
  g.restore();
}
// The famous gap: an unfaded patch and four iron pegs.
export function emptyWall(x, y, w, h, a = 1) {
  g.save(); g.globalAlpha *= a;
  g.fillStyle = 'rgba(120,60,50,0.35)'; g.fillRect(x - w / 2, y - h / 2, w, h);
  for (const [dx, dy] of [[-0.32, -0.42], [0.32, -0.42], [-0.32, 0.44], [0.32, 0.44]]) {
    const px = x + dx * w, py = y + dy * h;
    g.fillStyle = 'rgba(0,0,0,0.4)'; g.beginPath(); g.ellipse(px + 6 * u, py + 8 * u, 14 * u, 8 * u, 0, 0, 7); g.fill();
    g.fillStyle = '#1A1A1C'; g.beginPath(); g.arc(px, py, 12 * u, 0, 7); g.fill();
    g.fillStyle = '#6A6A70'; g.beginPath(); g.arc(px - 3 * u, py - 3 * u, 4 * u, 0, 7); g.fill();
  }
  g.restore();
}
// The hanging painting at its usual size and place. FR = frame rect used across scenes.
export const FR = { x: 0, y: 840, w: 470, h: 660 };
export function monaOnWall(t, o = {}) {
  const { x = TX, y = FR.y * u, s = 1, cased = true } = o;
  frame(x, y, FR.w * u * s, FR.h * u * s, { inner: lisa });
  if (cased) glass(x, y, (FR.w + 30) * u * s, (FR.h + 30) * u * s);
}
// Workman in a long white smock. Feet at (x, y); s = px per unit (figure ≈ 1.95 units tall).
export function worker(x, y, s, t = 0, o = {}) {
  const { walk = 0, hidden = 0, carry = 0, dir = 1, smock = '#ECE6D8', body = '#1C1A1E' } = o;
  const ph = t * 6.2, sw = walk * Math.sin(ph) * 0.26;
  g.save(); g.translate(x, y - Math.abs(Math.sin(ph)) * walk * 0.03 * s); g.scale(s * dir, s);
  g.strokeStyle = body; g.lineCap = 'round'; g.lineWidth = 0.13;
  g.beginPath(); g.moveTo(-0.08, -0.7); g.lineTo(-0.08 + sw, -0.02); g.moveTo(0.08, -0.7); g.lineTo(0.08 - sw, -0.02); g.stroke();
  g.fillStyle = body; g.beginPath(); g.ellipse(-0.04 + sw, 0, 0.1, 0.04, 0, 0, 7); g.ellipse(0.12 - sw, 0, 0.1, 0.04, 0, 0, 7); g.fill();
  // smock
  g.fillStyle = smock;
  g.beginPath(); g.moveTo(-0.24, -1.5); g.lineTo(0.24, -1.5); g.lineTo(0.38 + hidden * 0.06, -0.52); g.lineTo(-0.38, -0.52); g.closePath(); g.fill();
  g.strokeStyle = 'rgba(0,0,0,0.16)'; g.lineWidth = 0.022;
  g.beginPath(); g.moveTo(0, -1.42); g.lineTo(0, -0.55); g.moveTo(-0.14, -1.2); g.lineTo(-0.2, -0.56); g.moveTo(0.14, -1.2); g.lineTo(0.22, -0.56); g.stroke();
  if (hidden > 0) { g.strokeStyle = `rgba(120,90,40,${0.55 * hidden})`; g.lineWidth = 0.03; g.strokeRect(-0.2, -1.36, 0.42, 0.66); }
  // arms
  g.strokeStyle = smock; g.lineWidth = 0.12;
  if (carry) { g.beginPath(); g.moveTo(0.16, -1.42); g.lineTo(0.42, -1.12); g.lineTo(0.6, -1.2); g.moveTo(-0.16, -1.42); g.lineTo(0.2, -1.0); g.lineTo(0.6, -1.0); g.stroke(); }
  else if (hidden > 0) { g.beginPath(); g.moveTo(0.18, -1.42); g.lineTo(0.3, -1.05); g.lineTo(0.05, -0.95); g.moveTo(-0.18, -1.42); g.lineTo(-0.3, -1.0); g.lineTo(-0.05, -0.85); g.stroke(); }
  else { const as = walk * Math.sin(ph + Math.PI) * 0.3; g.beginPath(); g.moveTo(0.18, -1.42); g.lineTo(0.22 + as, -0.9); g.moveTo(-0.18, -1.42); g.lineTo(-0.22 - as, -0.9); g.stroke(); }
  // head + flat cap (silhouette only)
  g.fillStyle = body; g.fillRect(-0.05, -1.62, 0.1, 0.14);
  g.beginPath(); g.arc(0, -1.74, 0.16, 0, 7); g.fill();
  g.fillStyle = '#2E2C33'; g.beginPath(); g.ellipse(0.04, -1.86, 0.2, 0.065, -0.08, 0, 7); g.fill();
  g.restore();
}
// Service stairwell, schematic: steps rising to the right.
export function stairwell(dark = 0) {
  g.fillStyle = dark ? '#151213' : '#2E2925'; g.fillRect(0, 0, W, H);
  g.fillStyle = 'rgba(255,240,200,0.06)';
  g.beginPath(); g.moveTo(760 * u, 260 * u); g.lineTo(880 * u, 260 * u); g.lineTo(560 * u, 1500 * u); g.lineTo(160 * u, 1500 * u); g.fill();
  g.fillStyle = '#E9DDBA'; g.globalAlpha = 0.5; rrect(g, 760 * u, 180 * u, 120 * u, 160 * u, 60 * u); g.fill(); g.globalAlpha = 1;
  for (let i = 0; i < 14; i++) {
    const x = -60 * u + i * 80 * u, y = 1560 * u - i * 62 * u;
    g.fillStyle = dark ? '#221D1C' : '#4A423A'; g.fillRect(x, y, W, 62 * u);
    g.fillStyle = dark ? '#2E2726' : '#615549'; g.fillRect(x, y, W, 8 * u);
  }
  g.strokeStyle = '#1A1512'; g.lineWidth = 8 * u;
  g.beginPath(); g.moveTo(0, 1380 * u); g.lineTo(W, 1380 * u - (W / (80 * u)) * 62 * u); g.stroke();
  for (let i = 0; i < 14; i++) { const x = i * 80 * u; g.lineWidth = 3 * u; g.beginPath(); g.moveTo(x, 1380 * u - i * 62 * u); g.lineTo(x, 1460 * u - i * 62 * u); g.stroke(); }
}
// Long palace façade with a central domed pavilion. y = ground line.
export function louvre(y, t, o = {}) {
  const { dawn = 1 } = o;
  const sky = g.createLinearGradient(0, 0, 0, y);
  sky.addColorStop(0, '#1B2236'); sky.addColorStop(1, dawn ? '#C98B62' : '#2A3248');
  g.fillStyle = sky; g.fillRect(0, 0, W, y);
  const stone = '#BFB196', shade = '#8E8270', roof = '#2F3440';
  const wing = (x0, x1, top) => {
    g.fillStyle = stone; g.fillRect(x0, top, x1 - x0, y - top);
    g.fillStyle = roof; g.beginPath(); g.moveTo(x0 - 10 * u, top); g.lineTo(x0 + 30 * u, top - 90 * u); g.lineTo(x1 - 30 * u, top - 90 * u); g.lineTo(x1 + 10 * u, top); g.fill();
    for (let r = 0; r < 2; r++) for (let x = x0 + 40 * u; x < x1 - 40 * u; x += 90 * u) {
      const wy = top + 50 * u + r * 160 * u; g.fillStyle = '#2A2A33';
      g.beginPath(); g.moveTo(x, wy + 110 * u); g.lineTo(x, wy + 24 * u); g.arc(x + 24 * u, wy + 24 * u, 24 * u, Math.PI, 0); g.lineTo(x + 48 * u, wy + 110 * u); g.fill();
    }
    g.fillStyle = shade; g.fillRect(x0, top + 20 * u, x1 - x0, 8 * u);
  };
  wing(-40 * u, W + 40 * u, y - 420 * u);
  // central pavilion
  const px0 = TX - 170 * u, px1 = TX + 170 * u, ptop = y - 600 * u;
  wing(px0, px1, ptop);
  g.fillStyle = roof; g.beginPath(); g.moveTo(px0 + 20 * u, ptop - 80 * u); g.quadraticCurveTo(TX, ptop - 330 * u, px1 - 20 * u, ptop - 80 * u); g.fill();
  g.fillStyle = '#E8D9A8'; g.beginPath(); g.arc(TX, ptop + 40 * u, 34 * u, 0, 7); g.fill();
  g.fillStyle = '#3B3328'; g.fillRect(0, y, W, H - y);
}
// Visitors seen from behind; hats vary. Deterministic per index.
export function crowdBack(n, y0, t, o = {}) {
  const { seed = 3, color = '#17110F', rows = 3, sway = 1 } = o;
  for (let i = 0; i < n; i++) {
    const r = i % rows, c = Math.floor(i / rows), x = 60 * u + ((c * 137 + r * 61) % 1000) * u * 1.0, y = y0 + r * 120 * u;
    const s = (70 + hash(i, seed) * 18) * u, bob = Math.sin(t * 2 + i) * 4 * u * sway;
    person(x, y + bob, s, color);
    const kind = hash(i, seed + 1);
    g.fillStyle = color;
    if (kind < 0.4) { g.beginPath(); g.ellipse(x, y + bob - 1.42 * s, 0.5 * s, 0.1 * s, 0, 0, 7); g.fill(); g.beginPath(); g.arc(x, y + bob - 1.45 * s, 0.32 * s, Math.PI, 0); g.fill(); }
    else if (kind < 0.7) { g.beginPath(); g.ellipse(x, y + bob - 1.4 * s, 0.8 * s, 0.16 * s, 0, 0, 7); g.fill(); g.fillStyle = '#5A1F1A'; g.beginPath(); g.ellipse(x + 0.2 * s, y + bob - 1.55 * s, 0.25 * s, 0.12 * s, 0, 0, 7); g.fill(); }
  }
}
// Simple door (for "how did he get in")
export function door(x, y, w, h, o = {}) {
  const { color = '#3A2A1E', open = 0, light = '#E9C66B' } = o;
  g.fillStyle = '#120D0A'; g.fillRect(x - w / 2, y - h, w, h);
  if (open > 0) { g.fillStyle = light; g.globalAlpha = 0.5 * open; g.fillRect(x - w / 2, y - h, w * open * 0.6, h); g.globalAlpha = 1; }
  g.fillStyle = color; g.fillRect(x - w / 2 + w * 0.6 * open, y - h, w * (1 - 0.6 * open), h);
  g.strokeStyle = 'rgba(0,0,0,0.35)'; g.lineWidth = 4 * u;
  g.strokeRect(x - w / 2 + w * 0.6 * open + w * 0.12, y - h + h * 0.08, w * (1 - 0.6 * open) - w * 0.24, h * 0.36);
  g.strokeRect(x - w / 2 + w * 0.6 * open + w * 0.12, y - h + h * 0.52, w * (1 - 0.6 * open) - w * 0.24, h * 0.4);
  g.fillStyle = GOLD; g.beginPath(); g.arc(x + w * 0.36, y - h * 0.48, w * 0.05, 0, 7); g.fill();
}

// ---------------------------------------------------------------- map: France, Switzerland, Italy (coarse, schematic)
const EU = [[36, -8], [36.5, -2], [37.5, -0.8], [38.7, 0.2], [39.5, -0.3], [40.5, 0.6], [41.4, 2.2], [42.4, 3.1], [43.3, 3.5], [43.5, 4.8], [43.1, 6.0],
  [43.7, 7.4], [44.4, 8.8], [44.1, 9.7], [43.0, 10.5], [42.4, 11.2], [41.9, 12.2], [41.2, 13.5], [40.6, 14.4], [40.0, 15.6], [39.5, 15.8], [38.2, 15.6],
  [38.0, 16.0], [39.0, 17.1], [39.9, 16.6], [40.4, 17.2], [39.8, 18.4], [40.1, 18.5], [40.6, 18.0], [41.1, 16.9], [41.9, 16.1], [42.0, 15.0], [43.6, 13.5],
  [44.4, 12.3], [45.4, 12.3], [45.7, 13.7], [45.5, 14.5], [44.0, 15.5], [42.0, 18.5], [40.0, 20.0], [40, 25], [56, 25], [56, 8.5], [54, 8.5], [53.4, 6.5],
  [53, 4.8], [51.5, 3.5], [51.0, 2.5], [49.9, 1.4], [49.4, 0.0], [49.7, -1.9], [48.6, -1.6], [48.7, -4.7], [47.8, -4.3], [47.3, -2.5], [46.2, -1.2],
  [43.4, -1.5], [43.5, -8]];
const CORSICA = [[43.0, 9.4], [42.0, 8.6], [41.4, 9.2], [42.6, 9.5]];
const SARDINIA = [[41.2, 9.2], [40.9, 8.2], [39.0, 8.4], [39.2, 9.6], [40.8, 9.8]];
const BORDERS = [
  [[43.8, 7.5], [44.2, 7.7], [45.1, 6.9], [45.9, 7.0], [46.4, 6.1], [47.6, 7.6], [49.0, 8.2], [49.5, 6.4], [50.1, 4.8], [51.0, 2.5]],
  [[45.9, 7.0], [46.5, 8.4], [46.0, 9.0], [46.5, 10.3], [46.9, 10.5], [46.6, 12.4], [46.4, 13.7], [45.7, 13.7]],
  [[47.6, 7.6], [47.7, 9.5], [47.3, 9.6], [46.9, 10.5]],
  [[43.4, -1.5], [42.7, 0.0], [42.4, 3.1]]];
export const PL = { paris: [48.86, 2.35], florence: [43.77, 11.25], rome: [41.9, 12.5], milan: [45.46, 9.19] };
export function mapEU(cam) {
  const P = map(cam, { lands: [EU, CORSICA, SARDINIA], land: '#2A2A26', water: '#121820', line: '#9A8F78', grid: 2 });
  g.save(); g.strokeStyle = '#9A8F78'; g.globalAlpha = 0.5; g.lineWidth = 2.5 * u; g.setLineDash([10 * u, 8 * u]);
  for (const b of BORDERS) { g.beginPath(); b.forEach((p, i) => { const [x, y] = P(p); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.stroke(); }
  g.restore();
  return P;
}
// little steam train for the route
export function train(x, y, s, ang = 0) {
  g.save(); g.translate(x, y); g.rotate(ang); g.scale(s, s); g.fillStyle = C.cream;
  rrect(g, -1, -0.35, 1.3, 0.55, 0.08); g.fill(); g.fillRect(0.3, -0.6, 0.5, 0.8); g.fillRect(-0.85, -0.6, 0.18, 0.3);
  g.fillStyle = C.red; for (const wx of [-0.7, -0.2, 0.5]) { g.beginPath(); g.arc(wx, 0.25, 0.16, 0, 7); g.fill(); }
  g.restore();
}
// ---------------------------------------------------------------- props for act 2
// Newspaper sheet; masthead is invented, headline Thai.
export function newspaper(x, y, w, rot, mast, head, o = {}) {
  const { seed = 1, sub = '' } = o, h = w * 1.3;
  g.save(); g.translate(x, y); g.rotate(rot);
  g.fillStyle = 'rgba(0,0,0,0.3)'; g.fillRect(-w / 2 + 12 * u, -h / 2 + 14 * u, w, h);
  g.fillStyle = '#EDE4CC'; g.fillRect(-w / 2, -h / 2, w, h);
  text(g, mast, 0, -h / 2 + w * 0.13, { size: w * 0.095, weight: 400, family: SERIF, color: C.ink });
  g.fillStyle = C.ink; g.fillRect(-w * 0.44, -h / 2 + w * 0.17, w * 0.88, 3 * u); g.fillRect(-w * 0.44, -h / 2 + w * 0.185, w * 0.88, 1.5 * u);
  text(g, head, 0, -h / 2 + w * 0.32, { size: w * 0.085, weight: 800, family: THAI, color: C.red });
  if (sub) text(g, sub, 0, -h / 2 + w * 0.42, { size: w * 0.05, weight: 700, family: THAI, color: C.ink });
  // picture box: an empty wall with hooks
  const bx = -w * 0.42, by = -h / 2 + w * 0.48, bw = w * 0.4, bh = w * 0.5;
  g.fillStyle = '#B9AE94'; g.fillRect(bx, by, bw, bh);
  g.strokeStyle = '#4A4236'; g.lineWidth = 2 * u; g.strokeRect(bx + bw * 0.22, by + bh * 0.16, bw * 0.56, bh * 0.68);
  g.fillStyle = '#4A4236'; for (const [dx, dy] of [[0.28, 0.2], [0.72, 0.2], [0.28, 0.8], [0.72, 0.8]]) { g.beginPath(); g.arc(bx + bw * dx, by + bh * dy, 4 * u, 0, 7); g.fill(); }
  g.fillStyle = 'rgba(22,19,15,0.35)';
  for (let i = 0; i < 18; i++) { const cx = i < 9 ? w * 0.04 : -w * 0.42, cy = (i < 9 ? by : by + bh + w * 0.06) + (i % 9) * w * 0.055, lw = (i < 9 ? 0.38 : 0.84) * w * (0.7 + hash(i, seed) * 0.3);
    if (i >= 9 && i % 9 > 4) continue; g.fillRect(cx, cy, lw, w * 0.018); }
  g.restore();
}
// Thumbprint as concentric warped loops, drawn up to p.
export function thumbprint(x, y, r, p, color = C.cream) {
  g.save(); g.strokeStyle = color; g.lineWidth = 5 * u; g.lineCap = 'round';
  const n = 14;
  for (let k = 1; k <= n; k++) { if (k / n > p) break;
    const rr = (k / n) * r; g.beginPath();
    for (let a = 0; a <= 64; a++) { const th = (a / 64) * Math.PI * 1.85 + 0.6 + k * 0.2, wob = 1 + noise(a * 0.3 + k, 4) * 0.06;
      const px = x + Math.cos(th) * rr * 0.78 * wob, py = y + Math.sin(th) * rr * wob - (1 - k / n) * r * 0.25;
      a ? g.lineTo(px, py) : g.moveTo(px, py); }
    g.stroke(); }
  g.restore();
}
// Wooden trunk with a false bottom. reveal 0..1 turns the front into an x-ray; lid 0..1 opens.
export function trunk(x, y, w, o = {}) {
  const { reveal = 0, lid = 0 } = o, h = w * 0.55;
  g.save(); g.translate(x, y);
  g.fillStyle = 'rgba(0,0,0,0.35)'; g.beginPath(); g.ellipse(0, h / 2 + 10 * u, w * 0.55, 18 * u, 0, 0, 7); g.fill();
  // interior (cutaway)
  g.fillStyle = '#2A1C12'; g.fillRect(-w / 2, -h / 2, w, h);
  ['#7A5A8A', '#5A6E86', '#9A7E5A', '#6A7A5A'].forEach((c, i) => { g.fillStyle = c; rrect(g, -w * 0.45 + i * w * 0.23, -h * 0.4 + (i % 2) * 10 * u, w * 0.2, h * 0.38, 8 * u); g.fill(); });
  g.fillStyle = '#C49A5A'; g.fillRect(-w / 2, h * 0.08, w, 12 * u);                     // the false floor
  g.save(); g.translate(0, h * 0.3); g.scale(1, 0.32);                                   // the panel lying flat beneath it
  g.fillStyle = '#6B5232'; g.fillRect(-w * 0.3, -w * 0.21, w * 0.6, w * 0.42);
  g.beginPath(); g.rect(-w * 0.28, -w * 0.19, w * 0.56, w * 0.38); g.clip(); g.rotate(Math.PI / 2); lisa(w * 0.38, w * 0.56); g.restore();
  // front panel, fading to x-ray
  g.globalAlpha = 1 - 0.85 * reveal;
  g.fillStyle = '#6A4426'; g.fillRect(-w / 2, -h / 2, w, h);
  g.strokeStyle = '#4A2E18'; g.lineWidth = 3 * u; for (let k = 1; k < 5; k++) { g.beginPath(); g.moveTo(-w / 2, -h / 2 + k * h / 5); g.lineTo(w / 2, -h / 2 + k * h / 5); g.stroke(); }
  g.globalAlpha = 1;
  g.fillStyle = '#2C2C30'; for (const bx of [-0.36, 0.36]) g.fillRect(bx * w - 14 * u, -h / 2, 28 * u, h);
  g.strokeStyle = '#2C2C30'; g.lineWidth = 8 * u; g.strokeRect(-w / 2, -h / 2, w, h);
  g.fillStyle = GOLD; rrect(g, -30 * u, -h / 2 + 6 * u, 60 * u, 44 * u, 6 * u); g.fill();
  // lid
  g.save(); g.translate(0, -h / 2); g.scale(1, 1 - lid * 1.6);
  g.fillStyle = '#5A381E'; g.beginPath(); g.moveTo(-w / 2, 0); g.lineTo(-w / 2, -h * 0.18); g.quadraticCurveTo(0, -h * 0.42, w / 2, -h * 0.18); g.lineTo(w / 2, 0); g.fill();
  g.strokeStyle = '#2C2C30'; g.lineWidth = 8 * u; g.stroke();
  g.restore();
  g.restore();
}
// Ancient stone head (the stolen Iberian statuettes), stylised.
export function stoneHead(x, y, s, rot = 0) {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  g.fillStyle = '#A59A86'; rrect(g, -0.35, -0.6, 0.7, 1.2, 0.3); g.fill();
  g.beginPath(); g.ellipse(-0.4, -0.05, 0.12, 0.25, 0, 0, 7); g.ellipse(0.4, -0.05, 0.12, 0.25, 0, 0, 7); g.fill();
  g.fillStyle = '#7E7462'; g.fillRect(-0.22, -0.18, 0.14, 0.05); g.fillRect(0.08, -0.18, 0.14, 0.05); g.fillRect(-0.04, -0.12, 0.08, 0.3); g.fillRect(-0.14, 0.3, 0.28, 0.04);
  g.fillStyle = '#8E846F'; g.fillRect(-0.3, 0.6, 0.6, 0.25);
  g.restore();
}
// Police silhouette with a peaked cap.
export function officer(x, y, s, color = '#0B0D14') {
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color;
  g.beginPath(); g.ellipse(0, -1.12, 0.34, 0.4, 0, 0, 7); g.fill();
  g.beginPath(); g.moveTo(-0.42, -1.4); g.lineTo(0.42, -1.4); g.lineTo(0.36, -1.66); g.lineTo(-0.36, -1.66); g.closePath(); g.fill();
  g.fillRect(-0.55, -1.44, 1.1, 0.08);
  g.beginPath(); g.moveTo(-0.9, 0.8); g.quadraticCurveTo(-0.85, -0.5, -0.2, -0.62); g.lineTo(0.2, -0.62); g.quadraticCurveTo(0.85, -0.5, 0.9, 0.8); g.closePath(); g.fill();
  g.fillStyle = '#C9A94A'; for (let k = 0; k < 3; k++) { g.beginPath(); g.arc(0, -0.35 + k * 0.3, 0.05, 0, 7); g.fill(); }
  g.restore();
}
// Hotel front with a sign board; sign swaps from a to b as p goes 0→1 (flip on the x axis).
export function hotel(x, y, w, a, b, p = 0) {
  const h = w * 1.25;
  g.fillStyle = '#C9B48E'; g.fillRect(x - w / 2, y - h, w, h);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { const wx = x - w / 2 + w * 0.08 + c * w * 0.23, wy = y - h + h * 0.3 + r * h * 0.2;
    g.fillStyle = hash(r * 4 + c, 9) < 0.3 ? '#E9C66B' : '#2A2A33'; g.fillRect(wx, wy, w * 0.14, h * 0.13);
    g.fillStyle = '#7A6A50'; g.fillRect(wx - 6 * u, wy + h * 0.13, w * 0.14 + 12 * u, 8 * u); }
  g.fillStyle = '#4A3A2A'; rrect(g, x - w * 0.1, y - h * 0.17, w * 0.2, h * 0.17, 40 * u); g.fill();
  const sy = y - h + h * 0.13, sc = Math.abs(Math.cos(p * Math.PI));
  g.save(); g.translate(x, sy); g.scale(1, Math.max(0.02, sc));
  g.fillStyle = C.ink; rrect(g, -w * 0.46, -h * 0.07, w * 0.92, h * 0.14, 8 * u); g.fill();
  text(g, p < 0.5 ? a : b, 0, h * 0.025, { size: w * 0.07, weight: 700, family: INTER, color: GOLD, tracking: 2 * u });
  g.restore();
}
// Balance scale: tilt > 0 drops the right pan.
export function scales(x, y, s, tilt, lA, lB) {
  g.save(); g.translate(x, y);
  g.fillStyle = C.ink; g.fillRect(-8 * u, 0, 16 * u, s * 1.1); g.fillRect(-s * 0.35, s * 1.1, s * 0.7, 16 * u);
  g.rotate(tilt); g.fillRect(-s, -6 * u, 2 * s, 12 * u); g.rotate(-tilt);
  for (const sd of [-1, 1]) { const px = Math.cos(tilt) * sd * s, py = Math.sin(tilt) * sd * s;
    g.strokeStyle = C.ink; g.lineWidth = 3 * u; g.beginPath(); g.moveTo(px, py); g.lineTo(px - s * 0.28, py + s * 0.55); g.moveTo(px, py); g.lineTo(px + s * 0.28, py + s * 0.55); g.stroke();
    g.fillStyle = sd < 0 ? C.inkSoft : C.red; g.beginPath(); g.ellipse(px, py + s * 0.58, s * 0.34, s * 0.08, 0, 0, 7); g.fill();
    text(g, sd < 0 ? lA : lB, px, py + s * 0.82, { size: 40 * u, weight: 800, family: THAI, color: sd < 0 ? C.inkSoft : C.red }); }
  g.restore();
}
// Painter's easel with a small blank canvas.
export function easel(x, y, s) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.strokeStyle = '#6B4A2A'; g.lineWidth = 0.05; g.lineCap = 'round';
  g.beginPath(); g.moveTo(-0.35, 0); g.lineTo(0, -1.6); g.lineTo(0.35, 0); g.moveTo(0, -1.6); g.lineTo(0.05, 0); g.moveTo(-0.3, -0.7); g.lineTo(0.3, -0.7); g.stroke();
  g.fillStyle = '#EDE4CC'; g.fillRect(-0.32, -1.45, 0.64, 0.75);
  g.restore();
}

export default () => [
  // ---------------- hook
  { from: bar(0), to: bar(2), cues: [[0, 'thump', 0.6], [0.9, 'swish', 0.7], [1.6, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 1.6, 18); g.translate(sx, sy);
      wall();
      emptyWall(TX, FR.y * u, FR.w * u, FR.h * u);
      const p = clamp((t - 0.9) / 0.45);
      if (p < 1) { g.save(); g.globalAlpha = 1 - p * p; g.translate(0, -p * 700 * u); monaOnWall(t); g.restore(); }
      g.fillStyle = 'rgba(20,10,8,0.82)'; g.fillRect(0, 210 * u, W, 210 * u);
      say('ภาพวาดที่ดังที่สุดในโลก', TX, 340 * u, t - 0.1, { size: 62 * u, weight: 800, color: C.cream });
      if (t > 1.6) { g.fillStyle = 'rgba(20,10,8,0.82)'; g.fillRect(0, 1290 * u, W, 240 * u); }
      say('เคยหายไปจากผนัง\nนานกว่า 2 ปี', TX, 1385 * u, t - 1.6, { size: 58 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(2), to: bar(4), cues: [[0, 'whoosh', 0.5], [2.5, 'thump', 0.6]],
    draw(t) {
      wall();
      const z = track(t, [[0, 1.0], [0.1, 0.62]], 'heavy');
      g.save(); g.translate(TX, 840 * u); g.scale(z, z); g.translate(-TX, -840 * u);
      [[-700, -40, 520, 380], [700, -40, 520, 640], [-640, 620, 420, 300], [640, 640, 420, 520], [0, -820, 760, 420], [-700, -760, 420, 500], [700, -780, 460, 380]].forEach(([dx, dy, w, h], i) =>
        frame(TX + dx * u, 840 * u + dy * u, w * u, h * u, { emptyFill: ['#3D3A2A', '#2C3634', '#4A3A28', '#36302A'][i % 4] }));
      monaOnWall(t);
      g.restore();
      g.fillStyle = 'rgba(20,10,8,0.85)'; g.fillRect(0, 1250 * u, W, 330 * u);
      const y = say('แต่ก่อนปี 1911\nคนทั่วไปแทบไม่รู้จักภาพนี้', TX, 1340 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      say('จนกระทั่งมันถูกขโมย', TX, y + 5 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1], [3.2, 'type', 0.4]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 420 * u, 90 * u, 14 * u); g.fill();
      text(g, 'LOUVRE · PARIS · 1911', 280 * u, 472 * u, { size: 28 * u, weight: 700, family: INTER, color: C.inkSoft, tracking: 2 * u });
      g.restore();
      say('โจรกรรมโมนาลิซา', TX, 720 * u, t - 0.25, { size: 76 * u, weight: 800 });
      stamp('STOLEN', TX, 1010 * u, t - 2.5, { size: 150 * u, rot: -0.1 });
      say('โจรไม่ได้พังเข้ามา\nเขาเดินเข้าประตูเหมือนพนักงานคนหนึ่ง', TX, 1290 * u, t - 3.2, { size: 44 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------- Paris, Monday
  { from: bar(6), to: bar(8), cues: [[0.2, 'whoosh', 0.6], [2.5, 'pop', 0.7]],
    draw(t) {
      const rise = spring(t, 'heavy');
      g.save(); g.translate(0, (1 - rise) * 200 * u); louvre(1450 * u, t); g.restore();
      g.fillStyle = 'rgba(18,20,32,0.86)'; g.fillRect(0, 200 * u, W, 330 * u);
      kicker('Musée du Louvre · ปารีส', TX, 290 * u, t, { color: C.red });
      say('ทุกวันจันทร์ ลูฟวร์ปิดไม่ให้คนเข้าชม', TX, 410 * u, t - 0.3, { size: 46 * u, weight: 800, color: C.cream });
      if (t > 2.5) { g.fillStyle = 'rgba(18,20,32,0.86)'; g.fillRect(0, 1460 * u, W, 140 * u); }
      say('ข้างในมีแค่เจ้าหน้าที่และคนงาน', TX, 1550 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.cream });
      finish(0.7);
    } },
  { from: bar(8), to: bar(9), cues: Array.from({ length: 5 }, (_, i) => [i * 0.15, 'tick', 0.6]).concat([[1.0, 'thump', 0.6]]),
    draw(t) {
      paper(); kicker('สิงหาคม 1911', TX, 420 * u, t);
      const d = ['17', '18', '19', '20', '21'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.15), t, { size: 360 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('วันจันทร์ · เช้าตรู่', TX, 1240 * u, t - 1.0, { size: 58 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(9), to: bar(12), cues: [[0.2, 'thump', 0.5], [0.8, 'thump', 0.4], [2.5, 'pop', 0.6], [5.0, 'pop', 0.6]],
    draw(t) {
      night('#14100E');
      // a corridor of arches
      for (let i = 0; i < 5; i++) { const x = 40 * u + i * 230 * u; g.fillStyle = '#211A16'; rrect(g, x, 640 * u, 170 * u, 760 * u, 80 * u); g.fill(); }
      g.fillStyle = '#0C0907'; g.fillRect(0, 1400 * u, W, H - 1400 * u);
      const x = track(t, [[0, -100 * u], [0.1, TX + 160 * u]], 60, 18);
      worker(x, 1400 * u, 330 * u, t, { walk: clamp(1 - (t - 2.2) / 0.6) });
      kicker('Vincenzo Peruggia', TX, 290 * u, t, { color: C.red });
      say('ช่างชาวอิตาลี วัย 29 ปี', TX, 400 * u, t - 0.3, { size: 54 * u, weight: 800, color: C.cream });
      say('เคยทำงานในลูฟวร์มาก่อน', TX, 500 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.cream });
      g.fillStyle = 'rgba(12,9,7,0.85)'; if (t > 5) g.fillRect(0, 1430 * u, W, 160 * u);
      say('ช่วยทำกล่องกระจกครอบภาพสำคัญ\nรวมถึงโมนาลิซาด้วย', TX, 1490 * u, t - 5.0, { size: 40 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(12), to: bar(15), cues: [[0.2, 'thump', 0.6], [1.0, 'pop', 0.6], [3.75, 'pop', 0.6], [4.4, 'click', 0.8]],
    draw(t) {
      paper();
      say('เขาเข้าไปได้อย่างไร?', TX, 330 * u, t - 0.1, { size: 62 * u, weight: 800 });
      const card = (i, at, title, body, col) => {
        const p = spring(t - at, 'snappy'); if (p <= 0) return;
        const y = 470 * u + i * 520 * u;
        g.save(); g.translate((1 - p) * -W, 0);
        g.fillStyle = i ? C.paper2 : '#E6DCC6'; rrect(g, 80 * u, y, W - 210 * u, 470 * u, 16 * u); g.fill();
        door(250 * u, y + 400 * u, 170 * u, 300 * u, { open: i ? clamp((t - at - 0.6) / 0.5) : 0, color: i ? '#5A4630' : '#6A6258' });
        text(g, title, 380 * u, y + 90 * u, { size: 34 * u, weight: 800, family: THAI, color: col, align: 'left' });
        body.forEach((ln, k) => text(g, ln, 380 * u, y + 170 * u + k * 62 * u, { size: 40 * u, weight: 800, family: THAI, color: C.ink, align: 'left' }));
        g.restore();
      };
      card(0, 1.0, 'เรื่องเล่าที่แพร่หลาย', ['ซ่อนในตู้เก็บของ', 'ตั้งแต่คืนวันอาทิตย์'], C.inkSoft);
      card(1, 3.75, 'คำให้การของเขาเอง', ['เดินเข้าประตูคนงาน', 'ตอนเช้าวันจันทร์', 'สวมเสื้อคลุมขาวแบบพนักงาน'], C.red);
      if (t > 3.75) { g.save(); g.strokeStyle = C.red; g.lineWidth = 6 * u; const p = clamp((t - 4.0) / 0.4); g.beginPath(); g.moveTo(380 * u, 640 * u); g.lineTo(380 * u + 440 * u * p, 640 * u); g.moveTo(380 * u, 702 * u); g.lineTo(380 * u + 480 * u * p, 702 * u); g.globalAlpha = 0.8; g.stroke(); g.restore(); }
      finish(0.6);
    } },
  // ---------------- the theft
  { from: bar(15), to: bar(18), cues: [[0.2, 'thump', 0.6], [2.5, 'click', 0.8], [3.2, 'swish', 0.6], [5.0, 'thump', 0.6]],
    draw(t) {
      wall();
      emptyWall(TX + 60 * u, FR.y * u, FR.w * u, FR.h * u);
      const lift = track(t, [[0, 0], [2.5, 1]], 'default'), carry = clamp((t - 3.2) / 3.5);
      const fx = TX + 60 * u + carry * 900 * u, fy = FR.y * u - lift * 40 * u + carry * 340 * u;
      worker(fx - 405 * u, 1540 * u, 320 * u, t, { walk: carry > 0 ? 1 : 0, carry: t > 2.2 ? 1 : 0 });
      g.save(); g.translate(fx, fy); g.rotate(carry * 0.12); g.translate(-fx, -fy);
      frame(fx, fy, FR.w * u, FR.h * u, { inner: lisa }); glass(fx, fy, (FR.w + 30) * u, (FR.h + 30) * u);
      g.restore();
      g.fillStyle = 'rgba(20,10,8,0.85)'; g.fillRect(0, 210 * u, W, 300 * u);
      kicker('ห้อง Salon Carré', TX, 290 * u, t, { color: C.red });
      say('ห้องว่าง ไม่มีใครอยู่เลย', TX, 410 * u, t - 0.3, { size: 54 * u, weight: 800, color: C.cream });
      g.fillStyle = 'rgba(20,10,8,0.85)'; if (t > 2.5) g.fillRect(0, 1250 * u, W, 280 * u);
      say('เขายกภาพลงจากตะขอเหล็ก 4 อัน', TX, 1340 * u, t - 2.5, { size: 48 * u, weight: 800, color: C.cream });
      say('ทั้งกรอบ ทั้งกล่องกระจก', TX, 1450 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(18), to: bar(22), cues: [[0.2, 'whoosh', 0.5], [2.5, 'click', 0.8], [3.0, 'click', 0.6], [5.0, 'swish', 0.6], [7.5, 'thump', 0.7]],
    draw(t) {
      stairwell(1);
      // empty frame and glass case left on the landing
      const off = spring(t - 2.5, 'default');
      frame(250 * u, 1250 * u, 300 * u, 420 * u, { rot: -0.12, emptyFill: '#151213' });
      glass(250 * u + off * 120 * u, 1270 * u, 320 * u, 440 * u, 0.9);
      // the bare panel: shown, then tucked away
      const tuck = clamp((t - 5.0) / 0.6);
      if (tuck < 1) { g.save(); g.globalAlpha = 1 - tuck; g.translate(560 * u - tuck * 40 * u, 1060 * u + tuck * 60 * u); g.rotate(0.05);
        g.fillStyle = '#6B5232'; g.fillRect(-120 * u, -170 * u, 240 * u, 340 * u); g.beginPath(); g.rect(-110 * u, -160 * u, 220 * u, 320 * u); g.clip(); lisa(220 * u, 320 * u); g.restore(); }
      const climb = clamp((t - 7.5) / 2.5);
      worker(640 * u + climb * 300 * u, 1335 * u - climb * 230 * u, 320 * u, t, { hidden: tuck, walk: climb > 0 ? 1 : 0 });
      g.fillStyle = 'rgba(12,9,7,0.85)'; g.fillRect(0, 200 * u, W, 340 * u);
      kicker('บันไดบริการ', TX, 280 * u, t, { color: C.red });
      say('เขาแกะกรอบและกล่องกระจกทิ้งไว้', TX, 390 * u, t - 0.3, { size: 48 * u, weight: 800, color: C.cream });
      say('เหลือแผ่นไม้ ขนาดราว 77×53 ซม.', TX, 480 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.fog });
      g.fillStyle = 'rgba(12,9,7,0.85)'; if (t > 5) g.fillRect(0, 1440 * u, W, 160 * u);
      say('ซ่อนไว้ใต้เสื้อคลุม', TX, 1520 * u, t - 5.0, { size: 48 * u, weight: 800, color: C.red, out: 2.4 });
      say('แล้วเดินออกจากลูฟวร์ไปเฉย ๆ', TX, 1520 * u, t - 7.5, { size: 48 * u, weight: 800, color: C.cream });
      finish(0.9);
    } },
];
