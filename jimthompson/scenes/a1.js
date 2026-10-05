// Jim Thompson — Act 1: the silk king (0:00–0:55, bars 0–22).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, map } from './kit.js';

// ---------------------------------------------------------------- silk palette (Thai-documentary sub-series)
export const S = {
  mag: '#A8235F', mag2: '#D4588F', gold: '#D9A43B', gold2: '#F0CB72', teal: '#1E7470', teal2: '#3AA59A',
  plum: '#1A0D15', plum2: '#2B1724', teak: '#6B3A1E', teak2: '#8E5532', tile: '#9C3B22',
  jungle: '#10241B', jungle2: '#1B3A2A', mist: '#C9D3CF',
};
C.red = S.mag;                 // the film's single accent on paper scenes is deep silk magenta
export const SILKS = [S.mag, S.gold, S.teal, '#D9662B', '#5B2A86', S.mag2, S.teal2];
export const PLUM_BAND = 'rgba(26,13,21,0.84)';
export const PAPER_BAND = 'rgba(239,230,210,0.9)';

// ikat-like diamond pattern for the woven cloth
function pat(r, c, cols, pal) {
  const m = (cols - 1) / 2, d = Math.abs(c - m) + Math.abs((r % 14) - 7);
  if (d < 2) return pal[1];
  if (d < 4) return pal[2];
  if (d % 5 < 1) return pal[1];
  return (r + c) % 2 ? pal[0] : pal[3];
}
// A hand loom seen from the front: warp threads, cloth woven bottom-up to progress p, shuttle and beater.
export function loom(x, y, w, h, t, o = {}) {
  const { rows = 36, cols = 30, p = 1, frame = S.teak, pal = [S.mag, S.gold, S.teal, '#8A1A4C'], warp = '#EDE3CC' } = o;
  const cw = w / cols, rh = h / rows, n = Math.floor(clamp(p) * rows);
  g.save();
  g.fillStyle = frame;
  g.fillRect(x - 46 * u, y - 70 * u, 24 * u, h + 150 * u); g.fillRect(x + w + 22 * u, y - 70 * u, 24 * u, h + 150 * u);
  g.fillRect(x - 60 * u, y - 80 * u, w + 120 * u, 28 * u);
  g.fillStyle = S.teak2; g.fillRect(x - 60 * u, y + h + 40 * u, w + 120 * u, 34 * u);
  for (let c = 0; c < cols; c++) { g.strokeStyle = c % 2 ? warp : '#D5C8AA'; g.lineWidth = Math.max(1, cw * 0.28);
    g.beginPath(); g.moveTo(x + (c + 0.5) * cw, y - 52 * u); g.lineTo(x + (c + 0.5) * cw, y + h + 40 * u); g.stroke(); }
  for (let r = 0; r < n; r++) {
    const yy = y + h - (r + 1) * rh;
    for (let c = 0; c < cols; c++) {
      g.fillStyle = pat(r, c, cols, pal); g.fillRect(x + c * cw, yy, cw + 0.6, rh + 0.6);
      if ((r + c) % 2) { g.fillStyle = 'rgba(0,0,0,0.12)'; g.fillRect(x + c * cw, yy, cw + 0.6, rh + 0.6); }
    }
  }
  // sheen
  if (n > 0) { const gr = g.createLinearGradient(x, 0, x + w, 0); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.5 + 0.3 * Math.sin(t * 0.8), 'rgba(255,255,255,0.18)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(x, y + h - n * rh, w, n * rh); }
  if (p < 1) {
    const yy = y + h - (n + 0.5) * rh, k = (t * 1.6) % 2, f = k < 1 ? k : 2 - k, sx = x - 20 * u + f * (w + 40 * u);
    g.strokeStyle = pal[(n % 3)]; g.lineWidth = rh * 0.6; g.beginPath(); g.moveTo(x, yy); g.lineTo(Math.min(sx, x + w), yy); g.stroke();
    g.fillStyle = S.gold2; g.beginPath(); g.ellipse(sx, yy, 46 * u, 13 * u, 0, 0, 7); g.fill();
    g.fillStyle = S.teak; g.fillRect(sx - 18 * u, yy - 4 * u, 36 * u, 8 * u);
  }
  const beat = Math.max(0, Math.sin((t / BEAT) * Math.PI)) * 18 * u;
  g.fillStyle = frame; g.fillRect(x - 30 * u, y + h - n * rh - 26 * u - beat, w + 60 * u, 14 * u);
  g.restore();
}
// Silk ribbons flowing across the frame (bands of colour that ripple like cloth).
export function ribbons(t, y0, o = {}) {
  const { n = 5, gap = 70 * u, th = 64 * u, amp = 40 * u, pal = SILKS, alpha = 1, seed = 2 } = o;
  g.save(); g.globalAlpha = alpha;
  for (let i = 0; i < n; i++) {
    const ph = hash(i, seed) * 6, f = (1.6 + hash(i, seed + 1)) / W, yc = y0 + i * gap;
    const yAt = (x) => yc + Math.sin(x * f * 6.3 + t * 1.3 + ph) * amp + Math.sin(x * f * 2.1 - t * 0.7 + ph) * amp * 0.5;
    const thAt = (x) => th * (0.65 + 0.35 * Math.cos(x * f * 6.3 + t * 1.3 + ph));
    g.beginPath();
    for (let x = -20 * u; x <= W + 20 * u; x += 18 * u) { const yy = yAt(x) - thAt(x) / 2; x < 0 ? g.moveTo(x, yy) : g.lineTo(x, yy); }
    for (let x = W + 20 * u; x >= -20 * u; x -= 18 * u) g.lineTo(x, yAt(x) + thAt(x) / 2);
    g.closePath(); g.fillStyle = pal[i % pal.length]; g.fill();
    g.strokeStyle = 'rgba(255,255,255,0.28)'; g.lineWidth = 3 * u; g.beginPath();
    for (let x = -20 * u; x <= W + 20 * u; x += 18 * u) { const yy = yAt(x) - thAt(x) * 0.25; x < 0 ? g.moveTo(x, yy) : g.lineTo(x, yy); }
    g.stroke();
  }
  g.restore();
}
// Traditional Thai teak house, gable end to camera, standing on stilts. y = ground, s = px per unit.
// parts 0..1 lets it assemble (stilts → floor → walls → gable → roof).
export function thaiHouse(x, y, s, o = {}) {
  const { parts = 1, teak = S.teak, teak2 = S.teak2, roof = S.tile, lit = 0 } = o;
  const P = (i) => clamp(parts * 5 - i);
  g.save(); g.translate(x, y); g.scale(s, s);
  const drop = (i) => (1 - spring(P(i) * 1.2, 'snappy')) * -1.2;
  if (P(0) > 0) { g.save(); g.translate(0, drop(0)); g.globalAlpha = clamp(P(0) * 3); g.fillStyle = teak;
    for (const sx of [-0.7, -0.25, 0.25, 0.7]) g.fillRect(sx - 0.05, -0.55, 0.1, 0.55); g.restore(); }
  if (P(1) > 0) { g.save(); g.translate(0, drop(1)); g.globalAlpha = clamp(P(1) * 3); g.fillStyle = '#4A2814'; g.fillRect(-1.0, -0.64, 2.0, 0.1); g.restore(); }
  if (P(2) > 0) { g.save(); g.translate(0, drop(2)); g.globalAlpha = clamp(P(2) * 3);
    g.fillStyle = teak2; g.beginPath(); g.moveTo(-0.82, -0.64); g.lineTo(0.82, -0.64); g.lineTo(0.74, -1.42); g.lineTo(-0.74, -1.42); g.closePath(); g.fill();
    g.strokeStyle = teak; g.lineWidth = 0.025; for (let k = -3; k <= 3; k++) { g.beginPath(); g.moveTo(k * 0.23, -0.66); g.lineTo(k * 0.21, -1.4); g.stroke(); }
    g.fillStyle = lit ? `rgba(240,203,114,${lit})` : '#2A160C'; rrect(g, -0.16, -1.25, 0.32, 0.45, 0.03); g.fill();
    g.fillStyle = '#2A160C'; g.fillRect(-0.62, -1.2, 0.2, 0.3); g.fillRect(0.42, -1.2, 0.2, 0.3); g.restore(); }
  if (P(3) > 0) { g.save(); g.translate(0, drop(3)); g.globalAlpha = clamp(P(3) * 3);
    g.fillStyle = teak; g.beginPath(); g.moveTo(-0.8, -1.42); g.lineTo(0, -2.55); g.lineTo(0.8, -1.42); g.closePath(); g.fill();
    g.strokeStyle = 'rgba(240,203,114,0.35)'; g.lineWidth = 0.02; for (let k = 0; k < 9; k++) { const a = Math.PI * (0.12 + k * 0.095); g.beginPath(); g.moveTo(0, -1.45); g.lineTo(Math.cos(a) * -0.7, -1.45 - Math.sin(a) * 0.9); g.stroke(); }
    g.restore(); }
  if (P(4) > 0) { g.save(); g.translate(0, drop(4)); g.globalAlpha = clamp(P(4) * 3);
    g.strokeStyle = roof; g.lineWidth = 0.13; g.lineCap = 'round'; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(-1.08, -1.28); g.lineTo(0, -2.68); g.lineTo(1.08, -1.28); g.stroke();
    g.lineWidth = 0.06; g.beginPath(); g.moveTo(-1.08, -1.28); g.quadraticCurveTo(-1.22, -1.32, -1.2, -1.5); g.moveTo(1.08, -1.28); g.quadraticCurveTo(1.22, -1.32, 1.2, -1.5);
    g.moveTo(-0.08, -2.62); g.quadraticCurveTo(-0.1, -2.85, 0.05, -2.95); g.stroke(); g.restore(); }
  g.restore();
}
// Ban Khrua by the canal: stilt houses, silk drying on lines, water.
export function canal(t, o = {}) {
  const { water = 1150 * u, dark = 0 } = o;
  const sky = g.createLinearGradient(0, 0, 0, water); sky.addColorStop(0, dark ? '#20121C' : '#EAD9B6'); sky.addColorStop(1, dark ? '#3A2030' : '#E2C79A');
  g.fillStyle = sky; g.fillRect(0, 0, W, water);
  g.fillStyle = dark ? '#160D12' : '#4E6B44'; for (let i = 0; i < 14; i++) { g.beginPath(); g.arc(i * 85 * u, water - 260 * u - hash(i, 3) * 60 * u, 90 * u, 0, 7); g.fill(); }
  for (let i = 0; i < 4; i++) thaiHouse(140 * u + i * 260 * u, water - 10 * u, (95 + hash(i, 4) * 20) * u, { lit: dark ? 0.9 : 0 });
  // silk drying on lines between the houses
  for (let i = 0; i < 3; i++) { const x0 = 210 * u + i * 260 * u, yl = water - 150 * u;
    g.strokeStyle = '#3A2414'; g.lineWidth = 2 * u; g.beginPath(); g.moveTo(x0, yl); g.lineTo(x0 + 120 * u, yl); g.stroke();
    for (let k = 0; k < 3; k++) { g.fillStyle = SILKS[(i * 3 + k) % SILKS.length]; const sw = Math.sin(t * 2 + i + k) * 6 * u;
      g.beginPath(); g.moveTo(x0 + 8 * u + k * 38 * u, yl); g.lineTo(x0 + 38 * u + k * 38 * u, yl); g.lineTo(x0 + 38 * u + k * 38 * u + sw, yl + 90 * u); g.lineTo(x0 + 8 * u + k * 38 * u + sw, yl + 90 * u); g.fill(); } }
  g.fillStyle = dark ? '#0E1A1B' : '#3F7F7A'; g.fillRect(0, water, W, H - water);
  g.strokeStyle = dark ? 'rgba(240,203,114,0.25)' : 'rgba(255,255,255,0.3)'; g.lineWidth = 3 * u;
  for (let r = 0; r < 14; r++) { const y = water + 24 * u + r * r * 3.2 * u; g.beginPath();
    for (let x = 0; x <= W; x += 20 * u) { const yy = y + Math.sin(x / (40 * u) + t * 1.5 + r) * 3 * u; x ? g.lineTo(x, yy) : g.moveTo(x, yy); } g.stroke(); }
  // a long-tail boat drifting
  const bx = ((t * 50 * u) % (W + 400 * u)) - 200 * u, by = water + 160 * u;
  g.fillStyle = dark ? '#0A0608' : '#3A2414'; g.beginPath(); g.moveTo(bx - 150 * u, by - 18 * u); g.quadraticCurveTo(bx, by + 26 * u, bx + 160 * u, by - 30 * u); g.lineTo(bx + 140 * u, by - 10 * u); g.lineTo(bx - 140 * u, by - 6 * u); g.fill();
  person(bx - 40 * u, by - 14 * u, 34 * u, dark ? '#0A0608' : '#2A1A10');
}
// Highland jungle with a trail vanishing into mist. fog 0..1, dark = dusk.
export function jungle(t, o = {}) {
  const { fog = 0.6, dark = 0, trail = 1, vy = 980 * u } = o;
  const sky = g.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, dark ? '#0C1512' : '#B9C8C1'); sky.addColorStop(1, dark ? '#152A20' : '#7E978A');
  g.fillStyle = sky; g.fillRect(0, 0, W, H);
  const layers = dark ? ['#13261D', '#0F1F17', '#0A1610', '#060E0A'] : ['#6F8A7C', '#4C6B5A', '#2E4E3C', '#1A3426'];
  layers.forEach((col, li) => {
    const base = vy - 220 * u + li * 170 * u, rr = (70 + li * 40) * u;
    g.fillStyle = col; g.fillRect(0, base, W, H - base);
    for (let i = 0; i < 18; i++) { const x = (i / 17) * (W + 200 * u) - 100 * u + (hash(i, li + 7) - 0.5) * 60 * u, hh = (0.6 + hash(i, li + 9) * 0.8) * rr;
      g.beginPath(); g.arc(x, base, hh, Math.PI, 0); g.fill(); g.beginPath(); g.arc(x + hh * 0.6, base - hh * 0.5, hh * 0.7, 0, 7); g.fill(); }
    // mist over each layer, drifting
    g.save(); g.globalAlpha = fog * (0.55 - li * 0.1);
    g.fillStyle = dark ? '#2C3B36' : S.mist;
    for (let k = 0; k < 4; k++) { const mx = ((hash(k, li) * W + t * (20 + li * 10) * u) % (W + 600 * u)) - 300 * u;
      g.beginPath(); g.ellipse(mx, base - 20 * u, 360 * u, 60 * u, 0, 0, 7); g.fill(); }
    g.restore();
  });
  if (trail) { // the trail, fading in out of the mist
    const tg = g.createLinearGradient(0, vy, 0, vy + 260 * u), col = dark ? '42,36,24' : '156,136,102';
    tg.addColorStop(0, `rgba(${col},0)`); tg.addColorStop(1, `rgba(${col},1)`); g.fillStyle = tg;
    g.beginPath(); g.moveTo(TX - 8 * u, vy); g.bezierCurveTo(TX + 40 * u, vy + 300 * u, TX - 260 * u, vy + 560 * u, TX - 300 * u, H); g.lineTo(TX + 260 * u, H);
    g.bezierCurveTo(TX + 160 * u, vy + 560 * u, TX + 80 * u, vy + 300 * u, TX + 8 * u, vy); g.closePath(); g.fill(); }
  // ferns in the foreground
  g.fillStyle = dark ? '#030805' : '#0E2016';
  for (let i = 0; i < 9; i++) { const x = hash(i, 31) * W, y = H - hash(i, 32) * 200 * u; g.save(); g.translate(x, y); g.rotate(Math.sin(t + i) * 0.04);
    for (let k = -3; k <= 3; k++) { g.beginPath(); g.ellipse(k * 30 * u, -60 * u, 18 * u, 110 * u, k * 0.35, 0, 7); g.fill(); } g.restore(); }
}
// A full-figure silhouette walking away from camera. ph = walk phase.
export function walker(x, y, s, t, o = {}) {
  const { color = '#0B120E', alpha = 1, step = 1 } = o;
  const b = t * 5 * step;
  g.save(); g.globalAlpha *= alpha; g.translate(x, y); g.scale(s, s); g.fillStyle = color; g.strokeStyle = color; g.lineCap = 'round';
  g.lineWidth = 0.13; for (const sd of [-1, 1]) { const k = Math.sin(b + (sd > 0 ? 0 : Math.PI)) * step; g.beginPath(); g.moveTo(sd * 0.09, -0.95); g.lineTo(sd * 0.11 + k * 0.05, -0.02 - Math.max(0, k) * 0.08); g.stroke(); }
  rrect(g, -0.21, -1.62, 0.42, 0.72, 0.1); g.fill();
  g.lineWidth = 0.1; for (const sd of [-1, 1]) { const k = Math.sin(b + (sd > 0 ? Math.PI : 0)) * step; g.beginPath(); g.moveTo(sd * 0.2, -1.5); g.lineTo(sd * 0.27, -1.0 + k * 0.03); g.stroke(); }
  g.beginPath(); g.arc(0, -1.78, 0.15, 0, 7); g.fill();
  g.restore();
}
// Tudor-style highland bungalow (as the Moonlight cottage is usually described).
export function bungalow(x, y, s, o = {}) {
  const { lit = 1, wall = '#E6DCC8', timber = '#2A1A12', roof = '#3B2A26' } = o;
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = wall; g.fillRect(-1, -0.9, 2, 0.9);
  g.fillStyle = roof; g.beginPath(); g.moveTo(-1.15, -0.88); g.lineTo(-0.35, -1.6); g.lineTo(0.35, -1.6); g.lineTo(1.15, -0.88); g.fill();
  g.fillStyle = wall; g.beginPath(); g.moveTo(0.1, -0.9); g.lineTo(0.55, -1.42); g.lineTo(1.0, -0.9); g.fill();
  g.strokeStyle = timber; g.lineWidth = 0.05; g.strokeRect(-1, -0.9, 2, 0.9);
  for (const xx of [-0.6, -0.2, 0.25, 0.65]) { g.beginPath(); g.moveTo(xx, -0.9); g.lineTo(xx, 0); g.stroke(); }
  g.beginPath(); g.moveTo(-1, -0.45); g.lineTo(0.1, -0.45); g.moveTo(0.1, -0.9); g.lineTo(0.55, -1.42); g.lineTo(1.0, -0.9); g.moveTo(0.55, -1.42); g.lineTo(0.55, -0.9); g.stroke();
  g.fillStyle = timber; g.fillRect(-0.7, -1.85, 0.16, 0.5);
  g.fillStyle = lit ? `rgba(240,203,114,${0.6 + 0.4 * lit})` : '#24303A';
  for (const xx of [-0.85, -0.45]) g.fillRect(xx, -0.78, 0.22, 0.25);
  g.fillRect(0.38, -0.38, 0.34, 0.24);
  g.fillStyle = timber; g.fillRect(-0.12, -0.5, 0.2, 0.5);
  g.restore();
}
// Southeast Asia geography (rough coastlines).
const MAIN = [[25, 92], [21, 92], [20, 93], [17, 94.5], [16, 94.2], [16.5, 97.5], [14, 98], [12, 98.7], [10, 98.5], [8, 98.3], [7, 99.6], [6.3, 100.1], [5, 100.4], [3.5, 101.2], [2.5, 101.8], [1.5, 103.5], [1.3, 104.2], [2.5, 103.8], [4, 103.4], [5.5, 102.8], [6.2, 102.2], [7, 101], [8, 100.3], [9.5, 99.2], [11, 99.5], [12.5, 99.9], [13.4, 100.0], [13.5, 100.6], [12.6, 101.0], [12.2, 102.5], [11, 103], [10.5, 104.5], [9, 104.8], [8.7, 105], [10.4, 106.7], [12, 109.2], [16, 108.2], [19, 105.7], [21, 106.8], [22, 108], [25, 110]];
const SUMATRA = [[5.6, 95.3], [4, 96.3], [2, 98.7], [-1, 100.3], [-3, 102], [-5.8, 105.8], [-3, 106], [-1, 104.4], [1, 102.5], [2.5, 101], [4, 98.5]];
const BORNEO = [[7, 116.5], [4.5, 115.5], [2, 111], [1.5, 109.6], [-1, 110], [-3, 111], [-3.5, 114.5], [-4, 116], [0, 117.8], [1, 119], [5, 119.3], [7, 117]];
export const PL = { bkk: [13.75, 100.5], penang: [5.4, 100.3], cameron: [4.47, 101.38], kl: [3.14, 101.69] };
export const mapSEA = (cam, o = {}) => map(cam, { lands: [MAIN, SUMATRA, BORNEO], land: '#2E2230', water: '#0E1C1F', line: '#9AA8A4', grid: 5, ...o });

export default () => [
  // ---------------- Chapter 1 — hook
  { from: bar(0), to: bar(2), cues: [[0, 'whoosh', 0.6], [1.6, 'thump', 0.7], [3.2, 'swish', 0.4]],
    draw(t) {
      jungle(t, { fog: 0.6 + t * 0.06 });
      const p = clamp(t / 5), wy = 1500 * u - p * 470 * u;
      walker(TX + 40 * u - p * 30 * u, wy, (260 - p * 190) * u, t, { alpha: 1 - clamp((t - 3.2) / 1.6) * 0.85 });
      g.fillStyle = PLUM_BAND; g.fillRect(0, 210 * u, W, 300 * u);
      kicker('CAMERON HIGHLANDS · 1967', TX, 290 * u, t, { color: S.gold });
      say('เขาเดินออกไปในป่าตอนบ่าย', TX, 410 * u, t - 0.1, { size: 56 * u, weight: 800, color: C.cream });
      g.fillStyle = PLUM_BAND; if (t > 1.5) g.fillRect(0, 1400 * u, W, 160 * u);
      say('และไม่เคยกลับมาอีกเลย', TX, 1500 * u, t - 1.6, { size: 60 * u, weight: 800, color: S.gold2 });
      finish(0.6);
    } },
  { from: bar(2), to: bar(4), cues: [[0, 'thump', 0.6], [2.5, 'swish', 0.5]],
    draw(t) {
      paper();
      loom(TX - 280 * u, 620 * u, 560 * u, 500 * u, t, { p: 0.25 + t * 0.14 });
      say('Jim Thompson', TX, 400 * u, t - 0.1, { size: 104 * u, weight: 400, family: SERIF });
      say('ชาวอเมริกันผู้ปลุกชีวิตผ้าไหมไทย', TX, 1330 * u, t - 0.8, { size: 50 * u, weight: 800 });
      say('และพาไปดังทั่วโลก', TX, 1430 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 600 * u, 90 * u, 14 * u); g.fill();
      text(g, 'CAMERON HIGHLANDS · 26.03.1967', 370 * u, 472 * u, { size: 28 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 2 * u });
      g.save(); g.beginPath(); g.rect(70 * u, 1450 * u, W - 140 * u, 140 * u); g.clip(); ribbons(t, 1480 * u, { n: 3, gap: 40 * u, th: 40 * u, amp: 14 * u }); g.restore();
      g.restore();
      say('ราชาผ้าไหมไทย\nหายตัวไปกลางป่า', TX, 680 * u, t - 0.25, { size: 66 * u, weight: 800 });
      stamp('MISSING', TX, 1080 * u, t - 2.5, { size: 150 * u, rot: -0.1 });
      say('59 ปีผ่านไป ยังไม่มีใครพบร่องรอยของเขา', TX, 1360 * u, t - 3.0, { size: 42 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------- Chapter 2 — who he was
  { from: bar(6), to: bar(9), cues: [[0.2, 'whoosh', 0.5], [1.0, 'pop', 0.5], [3.75, 'pop', 0.6]],
    draw(t) {
      paper();
      // blueprint of a facade, drawn on
      const bx = 130 * u, by = 560 * u, bw = 770 * u, bh = 560 * u;
      g.fillStyle = '#1D4F5E'; rrect(g, bx, by, bw, bh, 10 * u); g.fill();
      g.save(); g.strokeStyle = 'rgba(255,255,255,0.12)'; g.lineWidth = 1 * u;
      for (let i = 1; i < 16; i++) { g.beginPath(); g.moveTo(bx + i * bw / 16, by); g.lineTo(bx + i * bw / 16, by + bh); g.stroke(); }
      for (let i = 1; i < 12; i++) { g.beginPath(); g.moveTo(bx, by + i * bh / 12); g.lineTo(bx + bw, by + i * bh / 12); g.stroke(); } g.restore();
      const q = remap(t, 0.4, 4.0), cx = bx + bw / 2;
      const ln = [[[cx - 260 * u, by + 480 * u], [cx + 260 * u, by + 480 * u]], [[cx - 230 * u, by + 480 * u], [cx - 230 * u, by + 230 * u], [cx + 230 * u, by + 230 * u], [cx + 230 * u, by + 480 * u]],
        [[cx - 270 * u, by + 230 * u], [cx, by + 90 * u], [cx + 270 * u, by + 230 * u], [cx - 270 * u, by + 230 * u]]];
      ln.forEach((pts, i) => path(pts, remap(q, i * 0.25, i * 0.25 + 0.4), { color: '#EAF2F2', width: 4 * u }));
      for (let k = 0; k < 5; k++) path([[cx - 170 * u + k * 85 * u, by + 260 * u], [cx - 170 * u + k * 85 * u, by + 470 * u]], remap(q, 0.7 + k * 0.05, 0.95 + k * 0.05), { color: '#EAF2F2', width: 6 * u });
      kicker('1906 · Greenville, Delaware', TX, 300 * u, t);
      say('เกิดในรัฐเดลาแวร์ สหรัฐอเมริกา', TX, 420 * u, t - 0.2, { size: 52 * u, weight: 800 });
      say('เรียนสถาปัตยกรรม', TX, 1250 * u, t - 1.0, { size: 50 * u, weight: 800 });
      say('แล้วทำงานเป็นสถาปนิกในนิวยอร์ก\nตลอดช่วงทศวรรษ 1930', TX, 1350 * u, t - 3.75, { size: 44 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(9), to: bar(11), cues: [[0.2, 'thump', 0.6], [2.5, 'impact', 0.9]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 14); g.translate(sx, sy);
      night(S.plum);
      // a manila dossier
      const s = spring(t - 0.2, 'heavy');
      g.save(); g.translate(TX, 880 * u + (1 - s) * 300 * u); g.rotate(-0.05);
      g.fillStyle = '#B48A4E'; rrect(g, -320 * u, -260 * u, 640 * u, 470 * u, 14 * u); g.fill(); rrect(g, -320 * u, -300 * u, 220 * u, 60 * u, 10 * u); g.fill();
      g.fillStyle = '#C9A266'; rrect(g, -300 * u, -240 * u, 600 * u, 430 * u, 10 * u); g.fill();
      g.fillStyle = 'rgba(40,24,10,0.55)'; for (let i = 0; i < 6; i++) g.fillRect(-250 * u, -160 * u + i * 52 * u, (300 + hash(i, 4) * 180) * u, 14 * u);
      g.restore();
      stamp('OSS', TX + 40 * u, 920 * u, t - 2.5, { size: 150 * u, rot: -0.14, color: S.mag2 });
      kicker('สงครามโลกครั้งที่ 2', TX, 300 * u, t, { color: S.gold });
      say('เขาเข้าร่วมหน่วย OSS\nหน่วยข่าวกรองของสหรัฐฯ', TX, 410 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      say('ต้นแบบของหน่วยงานที่ต่อมาคือ CIA', TX, 1300 * u, t - 2.8, { size: 46 * u, weight: 800, color: S.gold2 });
      finish();
    } },
  { from: bar(11), to: bar(14), cues: [[0.2, 'whoosh', 0.6], [2.0, 'pop', 0.8], [5.0, 'chime', 0.4]],
    draw(t) {
      const cam = { lat: track(t, [[0, 8], [0.1, 12.2]], 'heavy'), lon: track(t, [[0, 104], [0.1, 100.9]], 'heavy'), z: track(t, [[0, 26], [0.1, 64]], 'heavy') * u };
      const P = mapSEA(cam); topScrim(600, '26,13,21');
      pin(...P(PL.bkk), t - 2.0, { label: 'กรุงเทพฯ', side: 1, color: S.mag2 });
      kicker('1945 · หลังญี่ปุ่นยอมแพ้', TX, 250 * u, t, { color: S.gold });
      say('เขาถูกส่งมาประจำที่กรุงเทพฯ', TX, 345 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.cream });
      g.fillStyle = PLUM_BAND; if (t > 4.8) g.fillRect(0, 1370 * u, W, 220 * u);
      say('เมื่อพ้นจากราชการ\nเขาตัดสินใจปักหลักที่เมืองไทย', TX, 1450 * u, t - 5.0, { size: 46 * u, weight: 800, color: S.gold2 });
      finish(0.8);
    } },
  // ---------------- Chapter 3 — the silk
  { from: bar(14), to: bar(17), cues: [[0.2, 'swish', 0.5], [2.5, 'pop', 0.5], [5.0, 'thump', 0.6]],
    draw(t) {
      canal(t);
      g.fillStyle = PAPER_BAND; g.fillRect(0, 200 * u, W, 400 * u);
      kicker('ชุมชนบ้านครัว · ริมคลองแสนแสบ', TX, 290 * u, t);
      say('ชาวมุสลิมเชื้อสายจาม\nทอผ้าไหมด้วยมือสืบต่อกันมา', TX, 400 * u, t - 0.2, { size: 48 * u, weight: 800 });
      g.fillStyle = PLUM_BAND; if (t > 2.3) g.fillRect(0, 1300 * u, W, 290 * u);
      say('แต่หลังสงคราม งานทอมือ\nกำลังจะหายไปจากกรุงเทพฯ', TX, 1390 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.cream });
      finish(0.5);
    } },
  { from: bar(17), to: bar(20), cues: Array.from({ length: 12 }, (_, i) => [i * 0.625, 'tick', 0.3]).concat([[0.1, 'thump', 0.6]]),
    draw(t) {
      paper();
      loom(TX - 330 * u, 580 * u, 660 * u, 600 * u, t, { p: 0.08 + t * 0.12, rows: 40, cols: 34 });
      kicker('1948', TX, 300 * u, t);
      say('เขาก่อตั้ง Thai Silk Company', TX, 420 * u, t - 0.2, { size: 54 * u, weight: 800 });
      say('ใช้สีย้อมที่สดและติดทนกว่าเดิม\nช่างทอทำงานที่บ้านของตัวเอง', TX, 1360 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(20), to: bar(22), cues: [[0.2, 'whoosh', 0.5], [1.5, 'pop', 0.7], [3.5, 'chime', 0.4]],
    draw(t) {
      night(S.plum);
      ribbons(t, 1260 * u, { n: 5, gap: 64 * u, th: 60 * u, amp: 34 * u });
      // a fashion magazine with a silk swatch on its cover
      const s = spring(t - 1.5, 'snappy');
      g.save(); g.translate(TX, 790 * u); g.rotate(-0.06 * s); g.scale(s, s);
      g.fillStyle = '#F4EEE2'; g.fillRect(-210 * u, -280 * u, 420 * u, 560 * u);
      g.save(); g.beginPath(); g.rect(-190 * u, -170 * u, 380 * u, 420 * u); g.clip(); loom(-190 * u, -170 * u, 380 * u, 420 * u, 0, { p: 1, rows: 22, cols: 18, frame: 'rgba(0,0,0,0)' }); g.restore();
      text(g, 'FASHION', 0, -200 * u, { size: 74 * u, weight: 400, family: SERIF, color: C.ink, tracking: 6 * u });
      g.restore();
      kicker('ปลายทศวรรษ 1940', TX, 300 * u, t, { color: S.gold });
      say('นิตยสาร Vogue นำผ้าไหมของเขาไปตีพิมพ์', TX, 410 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      g.fillStyle = PLUM_BAND; if (t > 3.3) g.fillRect(0, 1110 * u, W, 120 * u);
      say('ผ้าไหมไทยเริ่มเป็นที่ต้องการทั่วโลก', TX, 1185 * u, t - 3.5, { size: 46 * u, weight: 800, color: S.gold2 });
      finish();
    } },
];
