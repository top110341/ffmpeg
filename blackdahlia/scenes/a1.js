// Black Dahlia — Act 1: 0:00–0:45 (bars 0–18). Los Angeles 1947; Elizabeth Short as a person; last seen at the Biltmore.
// STRICT: no gore anywhere. The crime is only ever "her body was found in a vacant lot in Leimert Park on 15 January 1947".
// No likeness of any real person: people are generic silhouettes; buildings, signs and mastheads are invented.
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, measure, map, mixColor } from './kit.js';

// ---------------------------------------------------------------- palette: LA night, neon, dahlia reds
export const D = { sky: '#07080F', sky2: '#24132C', neon: '#FF4A5E', glow: '255,74,94', warm: '255,192,118', gold: '#E8B04E',
  sil: '#030409', petals: ['#1E0207', '#36050E', '#530915', '#710F1E', '#8E1A2A'], blue: ['#0B1530', '#14234A', '#1F3466', '#2C4884', '#3E5EA2'] };
export const SANS = 'Inter, sans-serif';

// dark band behind text over art
export const band = (y, h, a = 0.78) => { g.fillStyle = `rgba(7,8,15,${a})`; g.fillRect(0, y, W, h); };

// Stylised dahlia: rings of pointed petals, outer ring darkest. bloom 0..1 opens it; pal = 5 colours outer→inner.
export function dahlia(x, y, r, t, o = {}) {
  const { bloom = 1, spin = 0.03, pal = D.petals, alpha = 1, glow = 0.35, edge = 'rgba(255,150,160,0.20)' } = o;
  if (bloom <= 0) return;
  g.save(); g.translate(x, y); g.globalAlpha = alpha;
  if (glow > 0) { const gr = g.createRadialGradient(0, 0, 0, 0, 0, r * 1.5); gr.addColorStop(0, `rgba(150,20,40,${glow})`); gr.addColorStop(1, 'rgba(150,20,40,0)');
    g.fillStyle = gr; g.fillRect(-r * 1.5, -r * 1.5, r * 3, r * 3); }
  g.rotate(t * spin);
  const rings = [[22, 1.0, 0], [18, 0.82, 0.14], [15, 0.64, 0.05], [12, 0.47, 0.2], [8, 0.3, 0.1]];
  rings.forEach(([n, L, off], k) => {
    const b = clamp(bloom * 1.35 - (4 - k) * 0.06);
    const e = 1 - Math.pow(1 - b, 3), len = r * L * e, w = len * 0.36;
    if (len <= 0) return;
    for (let i = 0; i < n; i++) {
      g.save(); g.rotate((i / n) * Math.PI * 2 + off + k * 0.21 + (1 - e) * 0.6);
      g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(w, -len * 0.55, 0, -len); g.quadraticCurveTo(-w, -len * 0.55, 0, 0);
      g.fillStyle = pal[k]; g.fill(); g.strokeStyle = edge; g.lineWidth = Math.max(1, r * 0.007); g.stroke();
      g.strokeStyle = 'rgba(0,0,0,0.35)'; g.beginPath(); g.moveTo(0, -len * 0.18); g.lineTo(0, -len * 0.82); g.stroke();
      g.restore();
    }
  });
  g.fillStyle = '#0E0105'; g.beginPath(); g.arc(0, 0, r * 0.1 * bloom, 0, 7); g.fill();
  g.fillStyle = 'rgba(232,176,78,0.5)';
  for (let i = 0; i < 9; i++) { const a = i * 2.4, d = r * 0.05 * Math.sqrt(i / 9); g.beginPath(); g.arc(Math.cos(a) * d, Math.sin(a) * d, r * 0.012, 0, 7); g.fill(); }
  g.restore();
}

// Fan palm silhouette, base at (x, y), h px tall; fronds sway gently.
export function palm(x, y, h, t, o = {}) {
  const { color = D.sil, seed = 1, lean = 0.1 } = o;
  const sw = Math.sin(t * 1.1 + seed * 2.3) * 0.03;
  const tx = x + h * (lean + sw * 0.4), ty = y - h, mx = x + h * lean * 0.15, my = y - h * 0.5;
  g.save(); g.fillStyle = color; g.strokeStyle = color; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x - h * 0.02, y); g.quadraticCurveTo(mx - h * 0.014, my, tx - h * 0.009, ty);
  g.lineTo(tx + h * 0.009, ty); g.quadraticCurveTo(mx + h * 0.014, my, x + h * 0.02, y); g.closePath(); g.fill();
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i / 9 - 0.5) * Math.PI * 1.6 + sw * 3 + (hash(i, seed) - 0.5) * 0.18;
    const len = h * (0.24 + hash(i, seed + 1) * 0.08);
    const qx = tx + Math.cos(a) * len * 0.55, qy = ty + Math.sin(a) * len * 0.55 - len * 0.12;
    const ex = tx + Math.cos(a) * len, ey = ty + Math.sin(a) * len * 0.6 + len * 0.45;
    g.lineWidth = h * 0.011; g.beginPath(); g.moveTo(tx, ty); g.quadraticCurveTo(qx, qy, ex, ey); g.stroke();
    g.lineWidth = h * 0.005;
    for (let k = 2; k <= 11; k++) {
      const s = k / 12, px = (1 - s) * (1 - s) * tx + 2 * (1 - s) * s * qx + s * s * ex, py = (1 - s) * (1 - s) * ty + 2 * (1 - s) * s * qy + s * s * ey, ll = len * 0.14 * (1 - s * 0.6);
      g.beginPath(); g.moveTo(px, py); g.lineTo(px + Math.cos(a + 1) * ll * 0.5, py + ll); g.moveTo(px, py); g.lineTo(px + Math.cos(a - 1) * ll * 0.5, py + ll); g.stroke();
    }
  }
  g.beginPath(); g.arc(tx, ty, h * 0.022, 0, 7); g.fill();
  g.restore();
}

// Sweeping searchlight beams rising from the horizon.
export function searchlights(t, base, a = 1, xs = [260, 820]) {
  g.save();
  xs.forEach((sx, i) => {
    const ang = -Math.PI / 2 + Math.sin(t * 0.45 + i * 2.1) * 0.45, L = 2200 * u, x0 = sx * u;
    const ex = x0 + Math.cos(ang) * L, ey = base + Math.sin(ang) * L, px = Math.cos(ang + Math.PI / 2) * 120 * u, py = Math.sin(ang + Math.PI / 2) * 120 * u;
    const gr = g.createLinearGradient(x0, base, ex, ey); gr.addColorStop(0, `rgba(230,225,255,${0.28 * a})`); gr.addColorStop(1, 'rgba(230,225,255,0)');
    g.fillStyle = gr; g.beginPath(); g.moveTo(x0 - 8 * u, base); g.lineTo(ex - px, ey - py); g.lineTo(ex + px, ey + py); g.lineTo(x0 + 8 * u, base); g.closePath(); g.fill();
  });
  g.restore();
}

// window grid for a building rect
function windows(x, y, w, h, t, seed, lit, ww = 16, wh = 22, gx = 34, gy = 46) {
  const cols = Math.floor((w - 16 * u) / (gx * u)), rows = Math.floor((h - 30 * u) / (gy * u));
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const k = seed * 97 + r * 13 + c, on = hash(k, 5) < lit;
    g.fillStyle = on ? `rgba(${D.warm},${0.5 + 0.25 * noise(t * 0.4 + k, 2)})` : 'rgba(0,0,0,0.35)';
    g.fillRect(x + 12 * u + c * gx * u, y + 20 * u + r * gy * u, ww * u, wh * u);
  }
}

// 1940s Los Angeles at night: low skyline, one generic stepped tower, palms, wet street.
export function skyline(t, o = {}) {
  const { base = 1300 * u, lit = 0.3, seed = 3, beams = 0, palms = [[110, 1], [900, 0.82]], tower = 640, haze = 1 } = o;
  const gr = g.createLinearGradient(0, 0, 0, base); gr.addColorStop(0, D.sky); gr.addColorStop(0.65, '#120F20'); gr.addColorStop(1, D.sky2);
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  g.save(); g.fillStyle = C.cream;
  for (let i = 0; i < 70; i++) { g.globalAlpha = 0.2 + 0.4 * Math.abs(noise(t * 0.6 + i, 7)); g.fillRect(hash(i, 41) * W, hash(i, 42) * base * 0.55, 2.5 * u, 2.5 * u); }
  g.restore();
  if (beams) searchlights(t, base - 200 * u, beams);
  // far row
  let x = -40 * u, i = 0;
  while (x < W + 40 * u) { const w = (80 + hash(i, seed + 9) * 100) * u, h = (120 + hash(i, seed + 8) * 200) * u;
    g.fillStyle = '#100E1A'; g.fillRect(x, base - 120 * u - h, w + 1, h + 120 * u); x += w; i++; }
  if (tower) { const tx = tower * u; g.fillStyle = '#0C0B15';
    g.fillRect(tx - 70 * u, base - 640 * u, 140 * u, 640 * u); g.fillRect(tx - 48 * u, base - 730 * u, 96 * u, 100 * u); g.fillRect(tx - 28 * u, base - 800 * u, 56 * u, 80 * u);
    g.beginPath(); g.moveTo(tx - 28 * u, base - 800 * u); g.lineTo(tx, base - 880 * u); g.lineTo(tx + 28 * u, base - 800 * u); g.fill();
    g.fillStyle = `rgba(${D.glow},${0.75 + 0.25 * noise(t * 2, 4)})`; g.beginPath(); g.arc(tx, base - 890 * u, 6 * u, 0, 7); g.fill();
    windows(tx - 70 * u, base - 620 * u, 140 * u, 600 * u, t, 77, lit * 0.8, 12, 18, 26, 40); }
  // near row
  x = -60 * u; i = 0;
  while (x < W + 40 * u) { const w = (130 + hash(i, seed) * 110) * u, h = (150 + hash(i, seed + 1) * 230) * u;
    g.fillStyle = i % 2 ? '#0A0911' : '#0D0B15'; g.fillRect(x, base - h, w + 1, h);
    g.fillStyle = '#07060C'; g.fillRect(x - 4 * u, base - h - 8 * u, w + 8 * u, 10 * u);
    windows(x, base - h, w, h - 40 * u, t, i + seed * 10, lit); x += w; i++; }
  if (haze) { const hz = g.createLinearGradient(0, base - 260 * u, 0, base); hz.addColorStop(0, 'rgba(120,60,110,0)'); hz.addColorStop(1, `rgba(120,60,110,${0.18 * haze})`); g.fillStyle = hz; g.fillRect(0, base - 260 * u, W, 260 * u); }
  g.fillStyle = '#05050A'; g.fillRect(0, base, W, H - base);
  g.save(); for (let k = 0; k < 14; k++) { g.globalAlpha = 0.12 + 0.08 * noise(t + k, 3); g.fillStyle = k % 3 ? `rgb(${D.warm})` : D.neon;
    g.fillRect(hash(k, 61) * W, base + 30 * u + hash(k, 62) * 260 * u, 6 * u, (60 + hash(k, 63) * 120) * u); } g.restore();
  palms.forEach(([px, s], k) => palm(px * u, base + 80 * u, 900 * u * s, t, { seed: k + 1, lean: k % 2 ? -0.08 : 0.1 }));
}

// Vertical neon blade sign (generic "HOTEL"). Letter 2 flickers.
export function neonSign(x, y, h, t, o = {}) {
  const { word = 'HOTEL', seed = 3, on = 1 } = o;
  const n = word.length, w = h * 0.26, step = h / (n + 0.4);
  g.save();
  const gr = g.createRadialGradient(x, y + h / 2, 0, x, y + h / 2, h * 0.75); gr.addColorStop(0, `rgba(${D.glow},${0.22 * on})`); gr.addColorStop(1, `rgba(${D.glow},0)`);
  g.fillStyle = gr; g.fillRect(x - h * 0.75, y - h * 0.25, h * 1.5, h * 1.5);
  g.fillStyle = '#0A0A10'; g.fillRect(x + w / 2, y + h * 0.12, h * 0.1, h * 0.025); g.fillRect(x + w / 2, y + h * 0.84, h * 0.1, h * 0.025);
  rrect(g, x - w / 2, y, w, h, w * 0.14); g.fillStyle = '#140E18'; g.fill(); g.strokeStyle = `rgba(${D.glow},${0.35 + 0.4 * on})`; g.lineWidth = h * 0.008; g.stroke();
  for (let k = 0; k < n; k++) {
    const f = on * (k === 1 && noise(t * 7, seed) < -0.35 ? 0.15 : 1);
    g.shadowColor = D.neon; g.shadowBlur = h * 0.045 * f;
    text(g, word[k], x, y + step * (k + 0.95), { size: step * 0.78, weight: 700, family: SANS, color: f > 0.5 ? '#FFD9DE' : '#4A1A26' });
  }
  g.restore();
}

// Generic 1940s hotel facade (not any real building): lit windows, canopy with chasing bulbs.
export function hotel(x, base, w, h, t, o = {}) {
  const { lit = 0.45, seed = 5 } = o;
  g.save();
  g.fillStyle = '#181320'; g.fillRect(x, base - h, w, h);
  g.fillStyle = '#211A2B'; for (let k = 0; k < 4; k++) g.fillRect(x - 8 * u, base - h + k * h * 0.24, w + 16 * u, 12 * u);
  windows(x, base - h + 20 * u, w, h - 260 * u, t, seed, lit, 26, 38, 64, 74);
  // entrance and canopy
  const cx = x + w / 2;
  g.fillStyle = `rgba(${D.warm},0.55)`; g.fillRect(cx - 90 * u, base - 170 * u, 180 * u, 170 * u);
  g.fillStyle = '#0E0A12'; g.fillRect(cx - 4 * u, base - 170 * u, 8 * u, 170 * u);
  g.fillStyle = '#2A1C22'; g.beginPath(); g.moveTo(cx - 200 * u, base - 190 * u); g.lineTo(cx + 200 * u, base - 190 * u); g.lineTo(cx + 230 * u, base - 240 * u); g.lineTo(cx - 230 * u, base - 240 * u); g.closePath(); g.fill();
  for (let k = 0; k < 16; k++) { const on = ((Math.floor(t / BEAT * 2) + k) % 4) !== 0;
    g.fillStyle = on ? '#FFE3A8' : '#5A4630'; g.beginPath(); g.arc(cx - 190 * u + k * 25.3 * u, base - 192 * u, 5 * u, 0, 7); g.fill(); }
  g.restore();
}

// 1940s sedan silhouette, nose to the left; wheels at y. s ≈ length px.
export function car(x, y, s, t, o = {}) {
  const { color = '#0B0A10', lights = 1 } = o;
  g.save(); g.translate(x, y); g.scale(s, s);
  if (lights) { const gr = g.createRadialGradient(-0.5, -0.12, 0, -0.5, -0.12, 0.5); gr.addColorStop(0, `rgba(${D.warm},${0.5 * lights})`); gr.addColorStop(1, `rgba(${D.warm},0)`);
    g.fillStyle = gr; g.fillRect(-1.0, -0.6, 1.0, 1.0); }
  g.fillStyle = color;
  g.beginPath(); g.moveTo(-0.5, -0.06); g.quadraticCurveTo(-0.5, -0.17, -0.36, -0.19); g.lineTo(-0.2, -0.2);
  g.quadraticCurveTo(-0.12, -0.34, 0.04, -0.35); g.quadraticCurveTo(0.24, -0.35, 0.3, -0.22); g.quadraticCurveTo(0.48, -0.2, 0.5, -0.08);
  g.lineTo(0.5, -0.03); g.lineTo(-0.5, -0.03); g.closePath(); g.fill();
  g.fillStyle = `rgba(${D.warm},0.35)`; g.beginPath(); g.moveTo(-0.14, -0.21); g.quadraticCurveTo(-0.08, -0.31, 0.04, -0.31); g.lineTo(0.04, -0.21); g.closePath(); g.fill();
  g.fillStyle = '#050508'; for (const wx of [-0.3, 0.3]) { g.beginPath(); g.arc(wx, -0.03, 0.075, 0, 7); g.fill(); }
  g.fillStyle = '#FFE3A8'; g.beginPath(); g.arc(-0.48, -0.12, 0.018, 0, 7); g.fill();
  g.restore();
}

// Front page of an invented 1947 evening paper (no real masthead).
export function newspaper(x, y, w, rot, headline, o = {}) {
  const { masthead = 'THE EVENING CLARION', seed = 1, sub = 'LOS ANGELES · EXTRA · 1947' } = o;
  const h = w * 1.35, hl = headline ? headline.split('\n') : [];
  g.save(); g.translate(x, y); g.rotate(rot);
  g.fillStyle = 'rgba(0,0,0,0.4)'; g.fillRect(-w / 2 + 12 * u, -h / 2 + 16 * u, w, h);
  g.fillStyle = '#E6DCC4'; g.fillRect(-w / 2, -h / 2, w, h);
  text(g, masthead, 0, -h / 2 + w * 0.1, { size: w * 0.07, weight: 400, family: SERIF, color: C.ink });
  g.fillStyle = C.ink; g.fillRect(-w * 0.44, -h / 2 + w * 0.13, w * 0.88, w * 0.006); g.fillRect(-w * 0.44, -h / 2 + w * 0.175, w * 0.88, w * 0.003);
  text(g, sub, 0, -h / 2 + w * 0.162, { size: w * 0.024, weight: 700, family: SANS, color: C.inkSoft, tracking: 2 * u });
  hl.forEach((ln, i) => text(g, ln, 0, -h / 2 + w * (0.3 + i * 0.105), { size: w * 0.095, weight: 400, family: SERIF, color: C.ink }));
  const top = -h / 2 + w * (0.29 + hl.length * 0.105);
  g.fillStyle = 'rgba(22,19,15,0.42)';
  for (let c = 0; c < 3; c++) for (let r = 0; r < 40; r++) {
    const ly = top + r * w * 0.035; if (ly > h / 2 - w * 0.06) break;
    g.fillRect(-w * 0.44 + c * w * 0.3, ly, w * 0.27 * (r % 7 === 6 ? 0.55 : 0.85 + 0.15 * hash(r * 3 + c, seed)), w * 0.011);
  }
  g.restore();
}

// Manila envelope; flap 0..1 opens it. label = small typed tag on the front.
export function envelope(x, y, w, rot, o = {}) {
  const { flap = 0, label = '' } = o;
  const h = w * 0.62;
  g.save(); g.translate(x, y); g.rotate(rot);
  g.fillStyle = 'rgba(0,0,0,0.45)'; g.fillRect(-w / 2 + 14 * u, -h / 2 + 18 * u, w, h);
  g.fillStyle = '#C9A76A'; g.fillRect(-w / 2, -h / 2, w, h);
  g.fillStyle = 'rgba(90,60,20,0.18)'; g.beginPath(); g.moveTo(-w / 2, h / 2); g.lineTo(0, 0); g.lineTo(w / 2, h / 2); g.closePath(); g.fill();
  // flap
  const fy = -h / 2 + (1 - 2 * flap) * h * 0.5;
  g.fillStyle = flap > 0.5 ? '#B8955A' : '#D6B67A'; g.beginPath(); g.moveTo(-w / 2, -h / 2); g.lineTo(0, fy); g.lineTo(w / 2, -h / 2); g.closePath(); g.fill();
  // postage + postmark
  g.fillStyle = '#7A1B22'; g.fillRect(w * 0.3, -h * 0.36, w * 0.13, w * 0.15);
  g.strokeStyle = 'rgba(22,19,15,0.55)'; g.lineWidth = 3 * u; g.beginPath(); g.arc(w * 0.26, -h * 0.22, w * 0.07, 0, 7); g.stroke();
  for (let k = 0; k < 3; k++) { g.beginPath(); g.moveTo(w * 0.33, -h * 0.25 + k * 12 * u); g.lineTo(w * 0.47, -h * 0.25 + k * 12 * u); g.stroke(); }
  // address scribble (illegible on purpose)
  g.strokeStyle = 'rgba(22,19,15,0.6)'; g.lineWidth = 4 * u;
  for (let l = 0; l < 3; l++) { g.beginPath(); for (let k = 0; k <= 30; k++) { const px = -w * 0.2 + k * w * 0.015, py = h * 0.05 + l * h * 0.13 + Math.sin(k * 1.7 + l) * 5 * u; k ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); }
  if (label) text(g, label, 0, h * 0.42, { size: w * 0.04, weight: 700, family: SANS, color: '#4A3418', tracking: 2 * u });
  g.restore();
}

// Travel suitcase with destination labels.
export function suitcase(x, y, w, t, o = {}) {
  const { labels = [] } = o, h = w * 0.66;
  g.save(); g.translate(x, y);
  g.fillStyle = 'rgba(0,0,0,0.3)'; g.beginPath(); g.ellipse(0, h / 2 + 8 * u, w * 0.55, 18 * u, 0, 0, 7); g.fill();
  g.strokeStyle = '#3A2614'; g.lineWidth = 16 * u; g.beginPath(); g.moveTo(-w * 0.14, -h / 2); g.quadraticCurveTo(-w * 0.14, -h / 2 - 70 * u, 0, -h / 2 - 70 * u); g.quadraticCurveTo(w * 0.14, -h / 2 - 70 * u, w * 0.14, -h / 2); g.stroke();
  g.fillStyle = '#7A4E2A'; rrect(g, -w / 2, -h / 2, w, h, 24 * u); g.fill();
  g.fillStyle = '#5E3A1E'; g.fillRect(-w / 2, -h * 0.08, w, h * 0.05);
  g.fillStyle = '#C9A15A'; for (const sx of [-0.3, 0.3]) g.fillRect(sx * w - 18 * u, -h / 2 - 4 * u, 36 * u, 26 * u);
  labels.forEach(([s, lx, ly, r, col], i) => { const p = clamp(spring(t - 0.4 - i * 0.5, 'playful')); if (p <= 0) return;
    g.save(); g.translate(lx * w, ly * h); g.rotate(r); g.scale(p, p);
    g.fillStyle = col; rrect(g, -110 * u, -44 * u, 220 * u, 88 * u, 40 * u); g.fill();
    g.strokeStyle = 'rgba(255,255,255,0.6)'; g.lineWidth = 3 * u; rrect(g, -100 * u, -34 * u, 200 * u, 68 * u, 32 * u); g.stroke();
    text(g, s, 0, 11 * u, { size: 30 * u, weight: 700, family: SANS, color: '#F4ECD8', tracking: 2 * u }); g.restore(); });
  g.restore();
}

// ---------------------------------------------------------------- maps
// crude USA outline (lat, lon) — schematic only
const USA = [[48.4, -124.7], [49, -95], [48.3, -88.5], [46.5, -84.5], [45, -82.5], [43.5, -79], [45, -74.7], [45, -71.5], [47.4, -69.2], [44.8, -67],
  [42.6, -70.6], [41.6, -70], [41, -72], [40.5, -74], [39, -74.9], [37, -76], [35.2, -75.5], [32, -81], [30.5, -81.4], [27, -80], [25.2, -80.4], [26.5, -82],
  [29.8, -83.5], [30.2, -87.5], [29.2, -89.2], [29.6, -93.8], [28, -97], [26, -97.2], [29.5, -101], [31.8, -106.5], [31.3, -111], [32.7, -114.7],
  [32.5, -117.1], [34, -118.5], [34.5, -120.6], [37.8, -122.5], [40.4, -124.3], [42, -124.3], [46.2, -124], [48.4, -124.7]];
export const US = { boston: [42.36, -71.06], la: [34.05, -118.25] };
export const usMap = (cam) => map(cam, { lands: [USA], grid: 5, land: '#1B1A2C', water: '#0A0A14' });

// schematic Los Angeles street map (approximate)
const LA0 = [34.033, -118.29], KLA = Math.cos(34.03 * Math.PI / 180);
export const LAP = { biltmore: [34.0493, -118.2547], leimert: [34.0157, -118.3285] };
const LAROADS = {
  main: [
    [[34.0485, -118.2580], [34.0560, -118.2800], [34.0620, -118.3050], [34.0620, -118.3500]],   // Wilshire Blvd
    [[34.0750, -118.3355], [34.0400, -118.3355], [34.0000, -118.3355]],                         // Crenshaw Blvd
    [[34.0600, -118.2530], [34.0300, -118.2700], [33.9950, -118.2820]],                         // Figueroa St
    [[34.0250, -118.3600], [34.0250, -118.2400]],                                               // a cross-town artery
  ],
};
export function laMap(t, o = {}) {
  const { cy = 1000 * u, z = 9800, cx = TX, reveal = 1 } = o;
  const P = ([la, lo]) => [cx + (lo - LA0[1]) * KLA * z * u, cy - (la - LA0[0]) * z * u];
  g.fillStyle = '#0A0B14'; g.fillRect(0, 0, W, H);
  g.save(); g.strokeStyle = 'rgba(140,151,173,0.10)'; g.lineWidth = 2 * u;
  for (let i = -10; i < 30; i++) { const [x] = P([0, -118.40 + i * 0.008]); g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
  for (let i = -10; i < 30; i++) { const [, y] = P([33.95 + i * 0.008, 0]); g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
  g.restore();
  // downtown block, faint
  const [dx, dy] = P([34.05, -118.25]); g.fillStyle = 'rgba(232,176,78,0.10)'; g.beginPath(); g.arc(dx, dy, 110 * u, 0, 7); g.fill();
  LAROADS.main.forEach((r) => path(r.map(P), reveal, { color: 'rgba(239,230,210,0.55)', width: 9 * u }));
  const a = clamp((reveal - 0.6) / 0.4) * 0.55, lb = (s, p, rot = 0) => { const [x, y] = P(p); g.save(); g.translate(x, y); g.rotate(rot);
    text(g, s, 0, 0, { size: 24 * u, weight: 700, family: SANS, color: C.cream, alpha: a, tracking: 1 * u }); g.restore(); };
  lb('WILSHIRE BLVD', [34.0640, -118.3200], 0); lb('CRENSHAW BLVD', [34.0560, -118.3410], -Math.PI / 2); lb('FIGUEROA ST', [34.0080, -118.2700], -1.2);
  text(g, 'DOWNTOWN', dx, dy + 150 * u, { size: 26 * u, weight: 700, family: SANS, color: D.gold, alpha: a * 1.4, tracking: 3 * u });
  return P;
}
export function approxNote(t, y = 1530 * u) { say('ตำแหน่งโดยประมาณ · แผนที่จำลอง', TX, y, t, { size: 30 * u, weight: 700, color: C.fog }); }

export default () => [
  // ---------------- hook
  { from: bar(0), to: bar(2), cues: [[0, 'thump', 0.7], [0.2, 'riser', 0.4], [1.25, 'thump', 0.6], [2.0, 'chime', 0.4]],
    draw(t) {
      const z = track(t, [[0, 1.1], [0.01, 1]], 'heavy');
      g.save(); g.translate(TX, 1300 * u); g.scale(z, z); g.translate(-TX, -1300 * u);
      skyline(t, { base: 1300 * u, beams: 0.8 });
      g.restore();
      dahlia(TX, 900 * u, 250 * u, t, { bloom: clamp(spring(t - 0.15, 'heavy')), glow: 0.45 });
      band(220 * u, 290 * u, 0.72); band(1360 * u, 230 * u, 0.72);
      big('1947', TX, 440 * u, t - 0.1, { size: 220 * u, color: C.cream });
      say('คดีฆาตกรรมในลอสแอนเจลิส\nที่ยังไขไม่ได้มาเกือบ 80 ปี', TX, 1440 * u, t - 1.0, { size: 46 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- nickname vs real name
  { from: bar(2), to: bar(4), cues: [[0, 'thump', 0.6], [0.3, 'type', 0.5], [2.5, 'swish', 0.5], [2.9, 'pop', 0.5]],
    draw(t) {
      night(D.sky);
      dahlia(TX, 1360 * u, 230 * u, t, { bloom: 1, glow: 0.3 });
      kicker('หนังสือพิมพ์ตั้งฉายาให้เธอว่า', TX, 330 * u, t, { color: D.neon });
      typewriter('Black Dahlia', TX, 500 * u, t - 0.3, { size: 120 * u, weight: 400, family: SERIF, color: C.cream, align: 'center', cps: 14 });
      const y = say('แต่เธอมีชื่อจริง', TX, 700 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.cream });
      big('Elizabeth Short', TX, y + 90 * u, t - 2.9, { size: 104 * u, color: D.neon });
      finish();
    } },
  // ---------------- title card
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 520 * u, 90 * u, 14 * u); g.fill();
      text(g, 'LOS ANGELES · JANUARY 1947', 330 * u, 472 * u, { size: 28 * u, weight: 700, family: SANS, color: C.inkSoft, tracking: 2 * u });
      dahlia(830 * u, 640 * u, 70 * u, t, { glow: 0, edge: 'rgba(0,0,0,0.25)' });
      g.restore();
      say('แบล็กดาเลีย', TX, 780 * u, t - 0.25, { size: 90 * u, weight: 800 });
      stamp('UNSOLVED', TX, 1080 * u, t - 2.5, { size: 120 * u, rot: -0.1 });
      say('ไม่เคยมีใครถูกตั้งข้อหา\nจนถึงทุกวันนี้', TX, 1340 * u, t - 3.0, { size: 46 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------- who she was: Boston → Los Angeles
  { from: bar(6), to: bar(9), cues: [[0.2, 'whoosh', 0.5], [1.2, 'pop', 0.7], [4.5, 'whoosh', 0.6], [5.6, 'pop', 0.7]],
    draw(t) {
      const cam = { lat: 38.5, lon: -95, z: track(t, [[0, 26], [0.1, 20]], 'heavy') * u };
      const P = usMap(cam);
      const [bx, by] = P(US.boston), [lx, ly] = P(US.la);
      const arc = Array.from({ length: 30 }, (_, k) => { const s = k / 29; return [bx + (lx - bx) * s, by + (ly - by) * s - Math.sin(s * Math.PI) * 160 * u]; });
      if (t > 4.5) path(arc, clamp((t - 4.5) / 1.1), { color: D.neon, width: 5 * u, dash: [16 * u, 12 * u] });
      pin(bx, by, t - 1.2, { label: 'Boston', side: -1, color: D.neon });
      pin(lx, ly, t - 5.6, { label: 'Los Angeles', side: 1, color: D.neon });
      topScrim(560, '10,10,20');
      kicker('ก่อนจะกลายเป็น “ตำนาน”', TX, 260 * u, t, { color: D.neon });
      say('Elizabeth Short\nเกิดวันที่ 29 กรกฎาคม 1924', TX, 360 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      band(1330 * u, 250 * u, 0.75);
      say('ย่าน Hyde Park เมือง Boston\nลูกสาวคนที่ 3 จากพี่น้อง 5 คน', TX, 1410 * u, t - 2.2, { size: 44 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- California, 1946
  { from: bar(9), to: bar(12), cues: [[0.2, 'riser', 0.4], [3.0, 'chime', 0.5]],
    draw(t) {
      skyline(t, { base: 1420 * u, beams: 1, lit: 0.25, palms: [[120, 1.05], [880, 0.9], [990, 0.7]], tower: 0 });
      // hills behind the city
      g.fillStyle = 'rgba(20,14,30,0.9)'; g.beginPath(); g.moveTo(0, 1180 * u);
      for (let k = 0; k <= 20; k++) g.lineTo(k * W / 20, 1180 * u - (60 + 70 * Math.sin(k * 0.7) + 40 * hash(k, 9)) * u);
      g.lineTo(W, 1300 * u); g.lineTo(0, 1300 * u); g.closePath(); g.globalAlpha = 0.6; g.fill(); g.globalAlpha = 1;
      band(220 * u, 290 * u, 0.7);
      kicker('ปี 1946 · แคลิฟอร์เนีย', TX, 290 * u, t, { color: D.neon });
      say('เธอเดินทางมาลอสแอนเจลิส', TX, 400 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      band(1380 * u, 200 * u, 0.72);
      say('หลายแหล่งเล่าว่า เธอใฝ่ฝัน\nอยากทำงานในวงการภาพยนตร์', TX, 1450 * u, t - 3.0, { size: 44 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- a person: 22, moving between rooms
  { from: bar(12), to: bar(14), cues: [[0.1, 'thump', 0.6], [0.5, 'pop', 0.4], [1.0, 'pop', 0.4], [1.5, 'pop', 0.4], [3.0, 'chime', 0.5]],
    draw(t) {
      paper();
      kicker('อายุเพียง', TX, 300 * u, t);
      big('22 ปี', TX, 500 * u, t - 0.1, { size: 180 * u, color: C.red });
      suitcase(TX, 860 * u, 520 * u, t, { labels: [['BOSTON', -0.28, -0.22, -0.12, '#2C4A6E'], ['SAN DIEGO', 0.26, -0.18, 0.1, '#6E5A2C'], ['LOS ANGELES', 0.0, 0.25, -0.04, C.red]] });
      say('ย้ายที่พักอยู่บ่อย ๆ\nระหว่างโรงแรมและห้องเช่า', TX, 1190 * u, t - 1.6, { size: 46 * u, weight: 800 });
      say('มีครอบครัว มีเพื่อน และมีความฝัน', TX, 1420 * u, t - 3.0, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- 9 January
  { from: bar(14), to: bar(15), cues: Array.from({ length: 5 }, (_, i) => [i * 0.15, 'tick', 0.6]).concat([[1.0, 'thump', 0.6]]),
    draw(t) {
      night(D.sky);
      kicker('มกราคม 1947', TX, 420 * u, t, { color: D.neon });
      const d = ['5', '6', '7', '8', '9'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.15), t, { size: 360 * u, bg: C.cream, fg: C.ink, r: 18 * u });
      say('วันสุดท้ายที่มีคนยืนยันว่าเห็นเธอ', TX, 1240 * u, t - 1.0, { size: 48 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- the Biltmore
  { from: bar(15), to: bar(18), cues: [[0.1, 'whoosh', 0.5], [0.6, 'thump', 0.5], [4.0, 'pop', 0.6]],
    draw(t) {
      skyline(t, { base: 1400 * u, palms: [[70, 1.1]], tower: 0, lit: 0.2 });
      hotel(260 * u, 1400 * u, 560 * u, 900 * u, t, { seed: 4 });
      neonSign(850 * u, 640 * u, 520 * u, t, { seed: 5 });
      const cx = track(t, [[0, -300 * u], [0.3, -300 * u], [2.2, 360 * u]], 'heavy');
      car(cx + 300 * u, 1440 * u, 420 * u, t);
      band(210 * u, 330 * u, 0.82);
      kicker('9 มกราคม 1947 · ใจกลาง LA', TX, 280 * u, t, { color: D.neon });
      say('ชายคนหนึ่งที่เธอรู้จัก ขับรถมาส่งเธอ\nที่โรงแรม Biltmore', TX, 390 * u, t - 0.2, { size: 44 * u, weight: 800, color: C.cream });
      band(1460 * u, 140 * u, 0.82);
      say('ตามคำให้การของเขา เธอบอกว่าจะมาพบพี่สาว', TX, 1540 * u, t - 4.0, { size: 36 * u, weight: 800, color: D.neon });
      finish(0.8);
    } },
];
