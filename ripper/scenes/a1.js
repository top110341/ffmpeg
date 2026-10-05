// Jack the Ripper — Act 1: 0:00–0:40 (bars 0–16). Whitechapel 1888, the East End, the first victim.
// No gore anywhere: victims appear only as names, dates, places and candles.
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, measure } from './kit.js';

// ---------------------------------------------------------------- palette: night + sodium lamps
export const N = { sky: '#080A11', sky2: '#1A1820', brick: '#15110E', brick2: '#1C1713', lamp: '#F2A23C', glow: '242,162,60',
  fogc: '150,142,134', ink: '#8A1E14', old: '#E3D2AA', chalk: '#D8D2C4' };

// Drifting fog banks between y0 and y1 (px). Pure function of t.
export function fog(t, o = {}) {
  const { y0 = 0, y1 = H, n = 10, alpha = 0.18, seed = 31, speed = 18, color = N.fogc, r = 340 } = o;
  g.save();
  for (let i = 0; i < n; i++) {
    const span = W + 2 * r * u;
    const x = ((hash(i, seed) * span + t * speed * u * (0.5 + hash(i, seed + 1))) % span) - r * u;
    const y = y0 + hash(i, seed + 2) * (y1 - y0);
    const rr = r * u * (0.6 + hash(i, seed + 3) * 0.8);
    const gr = g.createRadialGradient(x, y, 0, x, y, rr);
    gr.addColorStop(0, `rgba(${color},${alpha * (0.6 + 0.4 * hash(i, seed + 4))})`); gr.addColorStop(1, `rgba(${color},0)`);
    g.fillStyle = gr; g.fillRect(x - rr, y - rr, 2 * rr, 2 * rr);
  }
  g.restore();
}

// Victorian gas lamp standing at (x, y) ground, h px tall, with a flickering sodium halo.
export function gaslamp(x, y, h, t, o = {}) {
  const { seed = 1, glow = 1, color = '#07070A' } = o;
  const fl = (0.88 + 0.12 * noise(t * 5, seed)) * glow, ly = y - h * 0.9;
  g.save();
  let gr = g.createRadialGradient(x, ly, 0, x, ly, h * 0.8);
  gr.addColorStop(0, `rgba(${N.glow},${0.6 * fl})`); gr.addColorStop(0.22, `rgba(${N.glow},${0.2 * fl})`); gr.addColorStop(1, `rgba(${N.glow},0)`);
  g.fillStyle = gr; g.fillRect(x - h * 0.8, ly - h * 0.8, h * 1.6, h * 1.6);
  g.save(); g.translate(x, y); g.scale(1, 0.22);
  gr = g.createRadialGradient(0, 0, 0, 0, 0, h * 0.7); gr.addColorStop(0, `rgba(${N.glow},${0.3 * fl})`); gr.addColorStop(1, `rgba(${N.glow},0)`);
  g.fillStyle = gr; g.beginPath(); g.arc(0, 0, h * 0.7, 0, 7); g.fill(); g.restore();
  g.fillStyle = color;
  g.fillRect(x - h * 0.016, y - h * 0.85, h * 0.032, h * 0.85);
  g.fillRect(x - h * 0.045, y - h * 0.07, h * 0.09, h * 0.07);
  g.fillRect(x - h * 0.08, y - h * 0.8, h * 0.16, h * 0.014);
  g.fillStyle = `rgb(255,${Math.round(196 + 30 * fl)},${Math.round(110 + 40 * fl)})`;
  g.beginPath(); g.moveTo(x - h * 0.06, y - h * 0.97); g.lineTo(x + h * 0.06, y - h * 0.97); g.lineTo(x + h * 0.035, y - h * 0.85); g.lineTo(x - h * 0.035, y - h * 0.85); g.closePath(); g.fill();
  g.fillStyle = color;
  g.beginPath(); g.moveTo(x - h * 0.075, y - h * 0.965); g.lineTo(x, y - h * 1.02); g.lineTo(x + h * 0.075, y - h * 0.965); g.closePath(); g.fill();
  g.fillRect(x - h * 0.004, y - h * 0.97, h * 0.008, h * 0.12);
  g.restore();
}

// Row of soot-black brick terraces standing on `base` (px); a few windows lit amber.
export function terraces(base, t, o = {}) {
  const { seed = 3, lit = 0.3, x0 = -60 * u, hmin = 520, hvar = 300, sign = '' } = o;
  let x = x0, i = 0;
  g.save();
  while (x < W + 40 * u) {
    const w = (170 + hash(i, seed) * 90) * u, h = (hmin + hash(i, seed + 1) * hvar) * u, y = base - h;
    g.fillStyle = i % 2 ? N.brick : N.brick2; g.fillRect(x, y, w + 1, h);
    g.fillRect(x + w * 0.2, y - 60 * u, 34 * u, 60 * u); if (hash(i, seed + 2) > 0.5) g.fillRect(x + w * 0.68, y - 46 * u, 28 * u, 46 * u);
    const cols = Math.max(2, Math.floor(w / (72 * u))), rows = Math.floor(h / (150 * u));
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const k = i * 31 + r * 7 + c, wx = x + (c + 0.5) * w / cols - 18 * u, wy = y + 50 * u + r * 150 * u;
      if (wy + 70 * u > base - 140 * u) continue;
      const on = hash(k, seed + 5) < lit;
      g.fillStyle = on ? `rgba(${N.glow},${0.45 + 0.2 * noise(t * 0.6 + k, 3)})` : '#0B0908';
      g.fillRect(wx, wy, 36 * u, 64 * u);
    }
    g.fillStyle = '#090706'; g.fillRect(x + w * 0.5 - 26 * u, base - 124 * u, 52 * u, 124 * u);
    x += w; i++;
  }
  g.restore();
}

// The East End at night: sky, terraces, wet cobbles, gas lamps [[x(u), scale]...], two fog layers.
export function eastEnd(t, o = {}) {
  const { base = 1260 * u, lamps = [[200, 1], [840, 0.8]], fogA = 0.16, lit = 0.3, seed = 3, hmin = 520 } = o;
  const gr = g.createLinearGradient(0, 0, 0, base); gr.addColorStop(0, N.sky); gr.addColorStop(1, N.sky2);
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  fog(t, { y0: base - 800 * u, y1: base - 200 * u, n: 7, alpha: fogA * 0.8, seed: seed + 40, speed: 10 });
  terraces(base, t, { seed, lit, hmin });
  g.fillStyle = '#0C0A09'; g.fillRect(0, base, W, H - base);
  g.fillStyle = '#16120F';
  for (let r = 0; r < 14; r++) { const y = base + 18 * u + r * r * 4.2 * u + r * 16 * u, s = 0.5 + r * 0.12;
    for (let c = 0; c < 16; c++) { const x = (c + (r % 2) * 0.5) * 72 * u * s - 30 * u; g.beginPath(); g.ellipse(x, y, 28 * u * s, 8 * u * s, 0, 0, 7); g.fill(); } }
  lamps.forEach(([lx, s], k) => gaslamp(lx * u, base + 40 * u, 560 * u * s, t, { seed: k + 1 }));
  fog(t, { y0: base - 260 * u, y1: base + 320 * u, n: 12, alpha: fogA, seed: seed + 50, speed: 26 });
}

// Full-length silhouette in a long coat and top hat; feet at (x, y), s ≈ height px. Never a likeness.
export function walker(x, y, s, o = {}) {
  const { color = '#040405', t = 0, walk = 0, hat = 'top' } = o;
  const sw = Math.sin(t * 5.5) * 0.05 * walk;
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color;
  g.fillRect(-0.07 + sw, -0.3, 0.055, 0.3); g.fillRect(0.015 - sw, -0.3, 0.055, 0.3);
  g.beginPath(); g.moveTo(-0.11, -0.78); g.lineTo(0.11, -0.78); g.lineTo(0.18, -0.24); g.lineTo(-0.18, -0.24); g.closePath(); g.fill();
  g.beginPath(); g.ellipse(0, -0.76, 0.135, 0.05, 0, 0, 7); g.fill();
  g.beginPath(); g.arc(0, -0.86, 0.06, 0, 7); g.fill();
  if (hat === 'top') { g.fillRect(-0.1, -0.915, 0.2, 0.02); g.fillRect(-0.058, -1.04, 0.116, 0.13); }
  if (hat === 'helmet') { g.beginPath(); g.ellipse(0, -0.9, 0.07, 0.11, 0, Math.PI, 0); g.fill(); g.fillRect(-0.085, -0.905, 0.17, 0.018); }
  g.restore();
}

// person() bust with a period hat: 'top' | 'bowler' | 'helmet' (police custodian helmet).
export function bust(x, y, s, color, hat = 'bowler') {
  person(x, y, s, color);
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color;
  if (hat === 'top') { g.fillRect(-0.58, -1.5, 1.16, 0.09); g.fillRect(-0.37, -2.15, 0.74, 0.67); }
  if (hat === 'bowler') { g.beginPath(); g.ellipse(0, -1.46, 0.56, 0.08, 0, 0, 7); g.fill(); g.beginPath(); g.arc(0, -1.46, 0.38, Math.PI, 0); g.fill(); }
  if (hat === 'helmet') { g.beginPath(); g.ellipse(0, -1.38, 0.42, 0.66, 0, Math.PI, 0); g.fill(); g.beginPath(); g.ellipse(0, -1.38, 0.52, 0.08, 0, 0, 7); g.fill();
    g.beginPath(); g.arc(0, -2.05, 0.08, 0, 7); g.fill(); }
  g.restore();
}

// Front page of an invented penny paper (no real masthead).
export function newspaper(x, y, w, rot, headline, o = {}) {
  const { masthead = 'THE LAMPLIGHT GAZETTE', seed = 1, sub = 'LONDON · ONE PENNY · 1888' } = o;
  const h = w * 1.35, hl = headline ? headline.split('\n') : [];
  g.save(); g.translate(x, y); g.rotate(rot);
  g.fillStyle = 'rgba(0,0,0,0.4)'; g.fillRect(-w / 2 + 12 * u, -h / 2 + 16 * u, w, h);
  g.fillStyle = '#E4DAC2'; g.fillRect(-w / 2, -h / 2, w, h);
  text(g, masthead, 0, -h / 2 + w * 0.1, { size: w * 0.072, weight: 400, family: SERIF, color: C.ink });
  g.fillStyle = C.ink; g.fillRect(-w * 0.44, -h / 2 + w * 0.13, w * 0.88, w * 0.006); g.fillRect(-w * 0.44, -h / 2 + w * 0.175, w * 0.88, w * 0.003);
  text(g, sub, 0, -h / 2 + w * 0.162, { size: w * 0.024, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 2 * u });
  hl.forEach((ln, i) => text(g, ln, 0, -h / 2 + w * (0.3 + i * 0.105), { size: w * 0.095, weight: 400, family: SERIF, color: C.ink }));
  const top = -h / 2 + w * (0.29 + hl.length * 0.105);
  g.fillStyle = 'rgba(22,19,15,0.42)';
  for (let c = 0; c < 3; c++) for (let r = 0; r < 40; r++) {
    const ly = top + r * w * 0.035; if (ly > h / 2 - w * 0.06) break;
    if (c === 1 && r > 2 && r < 11) { if (r === 3) { g.fillStyle = 'rgba(22,19,15,0.75)'; g.fillRect(-w * 0.14, ly, w * 0.27, w * 0.26); g.fillStyle = 'rgba(22,19,15,0.42)'; } continue; }
    g.fillRect(-w * 0.44 + c * w * 0.3, ly, w * 0.27 * (r % 7 === 6 ? 0.55 : 0.85 + 0.15 * hash(r * 3 + c, seed)), w * 0.011);
  }
  g.restore();
}

// Hand-written letter on old paper: a legible typed header + illegible ink scribble lines + optional signature.
// Never invents wording: only the header and the signature are readable.
export function letter(x, y, w, rot, t, o = {}) {
  const { head = '', sign = '', ink = N.ink, lines = 9, seed = 2, cps = 14, signAt = 2.5, h = w * 1.25, at = 0.5 } = o;
  g.save(); g.translate(x, y); g.rotate(rot);
  g.fillStyle = 'rgba(0,0,0,0.45)'; g.fillRect(-w / 2 + 14 * u, -h / 2 + 18 * u, w, h);
  g.fillStyle = N.old; g.fillRect(-w / 2, -h / 2, w, h);
  g.fillStyle = 'rgba(120,90,40,0.13)';
  for (let i = 0; i < 6; i++) { g.beginPath(); g.ellipse((hash(i, seed + 3) - 0.5) * w * 0.8, (hash(i, seed + 4) - 0.5) * h * 0.8, w * (0.05 + 0.1 * hash(i, seed + 5)), w * 0.06, 0, 0, 7); g.fill(); }
  g.fillStyle = 'rgba(0,0,0,0.07)'; g.fillRect(-w / 2, -2 * u, w, 4 * u);
  if (head) typewriter(head, -w * 0.4, -h / 2 + w * 0.17, t, { size: w * 0.08, weight: 400, family: SERIF, color: ink, cps, caret: false });
  const p = clamp((t - at) / 1.8);
  g.strokeStyle = ink; g.lineWidth = w * 0.008; g.lineCap = 'round'; g.lineJoin = 'round'; g.globalAlpha = 0.8;
  for (let i = 0; i < lines; i++) {
    const q = clamp(p * lines - i); if (q <= 0) break;
    const ly = -h / 2 + w * 0.32 + i * w * 0.085, lw = w * 0.8 * (i === lines - 1 ? 0.5 : 0.88 + 0.12 * hash(i, seed));
    g.beginPath();
    for (let k = 0, n = 46; k <= n * q; k++) {
      const px = -w * 0.4 + lw * k / n, py = ly + Math.sin(k * 1.9 + i * 3) * w * 0.012 + (hash(k + i * 50, seed) - 0.5) * w * 0.014;
      k ? g.lineTo(px, py) : g.moveTo(px, py);
    }
    g.stroke();
  }
  g.globalAlpha = 1;
  if (sign) { const sz = w * 0.075, sw = measure(g, sign, { size: sz, weight: 400, family: SERIF });
    typewriter(sign, w * 0.42 - sw, h / 2 - w * 0.1, t - signAt, { size: sz, weight: 400, family: SERIF, color: ink, cps, caret: false }); }
  g.restore();
}

// Memorial candle; flame flickers deterministically.
export function candle(x, y, s, t, seed = 1, lit = 1) {
  g.save();
  if (lit > 0) {
    const fl = 0.85 + 0.15 * noise(t * 7, seed), fy = y - s * 1.12;
    const gr = g.createRadialGradient(x, fy, 0, x, fy, s * 1.6 * fl);
    gr.addColorStop(0, `rgba(${N.glow},${0.45 * lit})`); gr.addColorStop(1, `rgba(${N.glow},0)`);
    g.fillStyle = gr; g.fillRect(x - s * 2, fy - s * 2, s * 4, s * 4);
    g.fillStyle = `rgba(255,214,140,${lit})`; g.beginPath();
    g.moveTo(x, fy - s * 0.32 * fl); g.quadraticCurveTo(x + s * 0.11, fy, x, fy + s * 0.1); g.quadraticCurveTo(x - s * 0.11, fy, x, fy - s * 0.32 * fl); g.fill();
  }
  g.fillStyle = '#E8DFCB'; g.fillRect(x - s * 0.13, y - s, s * 0.26, s);
  g.fillStyle = '#2A2420'; g.fillRect(x - s * 0.01, y - s * 1.08, s * 0.02, s * 0.08);
  g.restore();
}

// ---------------------------------------------------------------- schematic Whitechapel map (approximate)
const LAT0 = 51.5172, LON0 = -0.0688, K = Math.cos(51.517 * Math.PI / 180);
const ROADS = {
  main: [
    [[51.5136, -0.0790], [51.5138, -0.0770], [51.5150, -0.0722], [51.5168, -0.0680], [51.5185, -0.0630], [51.5197, -0.0580]],       // Whitechapel High St / Rd
    [[51.5150, -0.0722], [51.5180, -0.0740], [51.5210, -0.0752], [51.5248, -0.0766]],                                             // Commercial Street
    [[51.5147, -0.0706], [51.5138, -0.0660], [51.5128, -0.0600], [51.5122, -0.0566]],                                             // Commercial Road
  ],
  minor: [
    [[51.5168, -0.0712], [51.5200, -0.0717], [51.5242, -0.0722]],     // Brick Lane
    [[51.5203, -0.0745], [51.5204, -0.0715], [51.5210, -0.0670]],     // Hanbury Street
    [[51.5210, -0.0650], [51.5204, -0.0596]],                         // Buck's Row
    [[51.5138, -0.0655], [51.5116, -0.0652]],                         // Berner Street
    [[51.5189, -0.0766], [51.5188, -0.0745]],                         // Dorset Street
    [[51.5152, -0.0734], [51.5172, -0.0741]],                         // Goulston Street
    [[51.5138, -0.0770], [51.5160, -0.0792]],                         // Houndsditch
    [[51.5172, -0.0741], [51.5189, -0.0766], [51.5210, -0.0775]],     // Crispin / Bell Lane-ish connector
  ],
};
export const SITE = {
  nichols: [51.5205, -0.0612], chapman: [51.5204, -0.0727], stride: [51.5128, -0.0654],
  eddowes: [51.5136, -0.0783], kelly: [51.5189, -0.0758], goulston: [51.5163, -0.0738],
};
export function wcMap(t, o = {}) {
  const { cy = 1080 * u, z = 62000, cx = TX, reveal = 1, labels = true, city = 0, dim = 1 } = o;
  const P = ([la, lo]) => [cx + (lo - LON0) * K * z * u, cy - (la - LAT0) * z * u];
  g.fillStyle = '#0B0F18'; g.fillRect(0, 0, W, H);
  g.save(); g.strokeStyle = 'rgba(140,151,173,0.07)'; g.lineWidth = 1 * u;
  for (let i = 0; i < 24; i++) { g.beginPath(); g.moveTo(0, i * 90 * u); g.lineTo(W, i * 90 * u); g.stroke(); g.beginPath(); g.moveTo(i * 90 * u, 0); g.lineTo(i * 90 * u, H); g.stroke(); }
  g.restore();
  // dense grid of back lanes, to read as a crowded district
  g.save(); g.strokeStyle = `rgba(140,151,173,${0.12 * dim})`; g.lineWidth = 3 * u;
  for (let i = 0; i < 26; i++) { const [x, y] = P([51.5115 + hash(i, 81) * 0.013, -0.079 + hash(i, 82) * 0.021]), a = hash(i, 83) * Math.PI, L = (40 + hash(i, 84) * 90) * u;
    g.beginPath(); g.moveTo(x - Math.cos(a) * L, y - Math.sin(a) * L); g.lineTo(x + Math.cos(a) * L, y + Math.sin(a) * L); g.stroke(); }
  g.restore();
  if (city > 0) {   // City of London boundary (schematic, approximate)
    const b = [[51.5195, -0.0785], [51.5165, -0.0768], [51.5140, -0.0757], [51.5110, -0.0752]].map(P);
    g.save(); g.globalAlpha = city; path(b, 1, { color: N.lamp, width: 4 * u, dash: [14 * u, 12 * u] });
    g.fillStyle = `rgba(${N.glow},0.08)`; g.beginPath(); g.moveTo(0, b[0][1]); b.forEach(([x, y]) => g.lineTo(x, y)); g.lineTo(0, b[3][1]); g.closePath(); g.fill();
    text(g, 'City of London', b[2][0] - 24 * u, b[2][1] + 120 * u, { size: 30 * u, weight: 700, family: 'Inter, sans-serif', color: N.lamp, align: 'right' });
    g.restore();
  }
  ROADS.main.forEach((r) => path(r.map(P), reveal, { color: `rgba(239,230,210,${0.75 * dim})`, width: 12 * u }));
  ROADS.minor.forEach((r) => path(r.map(P), reveal, { color: `rgba(239,230,210,${0.45 * dim})`, width: 6 * u }));
  if (labels) {
    const a = clamp((reveal - 0.6) / 0.4) * 0.55 * dim, lb = (s, p, rot = 0) => { const [x, y] = P(p); g.save(); g.translate(x, y); g.rotate(rot);
      text(g, s, 0, 0, { size: 24 * u, weight: 700, family: 'Inter, sans-serif', color: C.cream, alpha: a, tracking: 1 * u }); g.restore(); };
    lb('WHITECHAPEL RD', [51.5175, -0.0640], -0.42); lb('COMMERCIAL ST', [51.5225, -0.0782], 1.2); lb('COMMERCIAL RD', [51.5125, -0.0615], 0.2);
    lb('BRICK LANE', [51.5232, -0.0706], 1.52);
  }
  return P;
}
// "approximate locations" note pinned to the lower edge of the safe area
export function approxNote(t) { say('ตำแหน่งโดยประมาณ · แผนที่จำลอง', TX, 1530 * u, t, { size: 30 * u, weight: 700, color: C.fog }); }

export default () => [
  // ---------------- hook
  { from: bar(0), to: bar(2), cues: [[0, 'thump', 0.7], [0.3, 'whoosh', 0.5], [1.25, 'thump', 0.6], [2.2, 'tick', 0.4]],
    draw(t) {
      const z = track(t, [[0, 1.12], [0.01, 1]], 'heavy');
      g.save(); g.translate(TX, 1260 * u); g.scale(z, z); g.translate(-TX, -1260 * u);
      eastEnd(t, { lamps: [[180, 1.05], [880, 0.75]], fogA: 0.2 });
      walker(560 * u + t * 6 * u, 1290 * u, 300 * u, { t, walk: 1 });
      g.restore();
      g.fillStyle = 'rgba(8,10,17,0.72)'; g.fillRect(0, 210 * u, W, 300 * u); g.fillRect(0, 1360 * u, W, 230 * u);
      big('1888', TX, 440 * u, t - 0.1, { size: 220 * u, color: N.lamp });
      say('ผู้หญิง 5 คน ถูกฆาตกรรมในย่านเดียวกัน\nภายในราว 10 สัปดาห์', TX, 1440 * u, t - 1.0, { size: 46 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(2), to: bar(4), cues: [[0, 'thump', 0.6], [0.2, 'type', 0.5], [2.5, 'swish', 0.5]],
    draw(t) {
      night(N.sky); fog(t, { y0: 300 * u, y1: 1500 * u, n: 12, alpha: 0.14, seed: 9 });
      gaslamp(TX, 1560 * u, 600 * u, t, { seed: 4 });
      typewriter('Jack the Ripper', TX, 560 * u, t - 0.2, { size: 120 * u, weight: 400, family: SERIF, color: C.cream, align: 'center', cps: 16 });
      const y = say('ฆาตกรที่ไม่เคยถูกจับ', TX, 740 * u, t - 1.3, { size: 58 * u, weight: 800, color: C.cream });
      say('และแม้แต่ชื่อนี้…\nก็อาจถูกแต่งขึ้นโดยนักข่าว', TX, y + 20 * u, t - 2.6, { size: 48 * u, weight: 800, color: N.lamp });
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
      rrect(g, 70 * u, 410 * u, 480 * u, 90 * u, 14 * u); g.fill();
      text(g, 'WHITECHAPEL · LONDON · 1888', 310 * u, 472 * u, { size: 28 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 2 * u });
      g.restore();
      say('แจ็กเดอะริปเปอร์', TX, 760 * u, t - 0.25, { size: 84 * u, weight: 800 });
      stamp('UNSOLVED', TX, 1080 * u, t - 2.5, { size: 120 * u, rot: -0.1 });
      say('กว่า 130 ปีผ่านไป\nยังไม่มีใครรู้ว่าเขาคือใคร', TX, 1340 * u, t - 3.0, { size: 46 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------- London, west vs east
  { from: bar(6), to: bar(8), cues: [[0.2, 'whoosh', 0.6], [1.6, 'pop', 0.7], [3.2, 'thump', 0.5]],
    draw(t) {
      night('#0B0F18');
      // the Thames, schematic
      const river = [[-40, 1180], [180, 1120], [380, 1190], [560, 1260], [760, 1200], [1120, 1240]].map(([x, y]) => [x * u, y * u]);
      path(river, clamp(t / 1.2), { color: '#2C4560', width: 46 * u });
      text(g, 'แม่น้ำเทมส์', 400 * u, 1290 * u, { size: 32 * u, weight: 700, family: THAI, color: '#6D8AA8', alpha: clamp(t - 0.8) });
      const zone = (x, y, r, col, a) => { g.save(); g.globalAlpha = a; g.fillStyle = col; g.beginPath(); g.arc(x * u, y * u, r * u, 0, 7); g.fill(); g.restore(); };
      const a1 = clamp(spring(t - 0.6, 'default')), a2 = clamp(spring(t - 1.6, 'default'));
      zone(230, 960, 190, 'rgba(239,230,210,0.12)', a1);
      text(g, 'ฝั่งตะวันตก', 230 * u, 950 * u, { size: 44 * u, weight: 800, family: THAI, color: C.cream, alpha: a1 });
      text(g, 'ร่ำรวยกว่า', 230 * u, 1010 * u, { size: 36 * u, weight: 700, family: THAI, color: C.fog, alpha: a1 });
      zone(720, 1000, 220 * (0.9 + 0.1 * Math.sin(t * 3)), `rgba(${N.glow},0.22)`, a2);
      pin(720 * u, 1010 * u, t - 1.6, { label: '', color: N.lamp });
      text(g, 'Whitechapel', 720 * u, 830 * u, { size: 52 * u, weight: 400, family: SERIF, color: N.lamp, alpha: a2 });
      kicker('ลอนดอนตะวันออก · East End', TX, 300 * u, t, { color: N.lamp });
      say('ย่านไวท์ชาเปล ปี 1888', TX, 410 * u, t - 0.2, { size: 58 * u, weight: 800, color: C.cream });
      say('หนึ่งในย่านที่ยากจนและแออัดที่สุดของเมือง', TX, 1440 * u, t - 3.2, { size: 42 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- lodging houses
  { from: bar(8), to: bar(10), cues: [[0.1, 'thump', 0.6], [0.4, 'riser', 0.3], [2.6, 'pop', 0.6]],
    draw(t) {
      eastEnd(t, { base: 1380 * u, lamps: [[880, 0.9]], lit: 0.55, seed: 8, hmin: 700 });
      g.fillStyle = 'rgba(8,10,17,0.78)'; g.fillRect(0, 210 * u, W, 520 * u);
      kicker('บ้านพักราคาถูก (common lodging houses)', TX, 290 * u, t, { color: N.lamp, size: 36 * u });
      const n = Math.round(233 * clamp(spring(t - 0.3, 40, 13)));
      text(g, `${n}`, TX, 540 * u, { size: 200 * u, weight: 400, family: SERIF, color: C.cream });
      say('หลังในไวท์ชาเปล', TX, 640 * u, t - 0.8, { size: 46 * u, weight: 800, color: C.cream });
      g.fillStyle = 'rgba(8,10,17,0.78)'; if (t > 2.4) g.fillRect(0, 1420 * u, W, 170 * u);
      say('คืนหนึ่งมีคนนอนเบียดกันราว 8,500 คน', TX, 1520 * u, t - 2.6, { size: 44 * u, weight: 800, color: N.lamp });
      finish(0.8);
    } },
  // ---------------- fog & gas lamps
  { from: bar(10), to: bar(12), cues: [[0.1, 'whoosh', 0.5], [2.5, 'thump', 0.5]],
    draw(t) {
      night(N.sky);
      fog(t, { y0: 200 * u, y1: 1700 * u, n: 16, alpha: 0.16, seed: 21, speed: 22 });
      gaslamp(330 * u, 1500 * u, 900 * u, t, { seed: 6 });
      walker(780 * u - t * 14 * u, 1480 * u, 360 * u, { t, walk: 1, color: '#030304' });
      fog(t, { y0: 1100 * u, y1: 1700 * u, n: 10, alpha: 0.2, seed: 22, speed: 34 });
      g.fillStyle = 'rgba(8,10,17,0.72)'; g.fillRect(0, 230 * u, W, 300 * u);
      say('ไฟตะเกียงแก๊สสลัว ๆ\nกับหมอกควันถ่านหิน', TX, 330 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      g.fillStyle = 'rgba(8,10,17,0.72)'; if (t > 2.3) g.fillRect(0, 1530 * u, W, 70 * u + 100 * u);
      say('คนที่ไม่มีเงินค่าเตียง ต้องเดินอยู่ข้างนอกทั้งคืน', TX, 1575 * u, t - 2.5, { size: 38 * u, weight: 800, color: N.lamp });
      finish(0.9);
    } },
  // ---------------- 31 August
  { from: bar(12), to: bar(13), cues: Array.from({ length: 5 }, (_, i) => [i * 0.15, 'tick', 0.6]).concat([[1.0, 'thump', 0.6]]),
    draw(t) {
      night(N.sky); fog(t, { y0: 300 * u, y1: 1600 * u, n: 8, alpha: 0.1, seed: 5 });
      kicker('สิงหาคม 1888', TX, 420 * u, t, { color: N.lamp });
      const d = ['27', '28', '29', '30', '31'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.15), t, { size: 360 * u, bg: C.cream, fg: C.ink, r: 18 * u });
      say('ก่อนรุ่งสาง', TX, 1240 * u, t - 1.0, { size: 56 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- victim 1
  { from: bar(13), to: bar(16), cues: [[0.2, 'whoosh', 0.5], [1.4, 'pop', 0.7], [3.0, 'chime', 0.5]],
    draw(t) {
      const P = wcMap(t, { reveal: clamp(t / 1.3) });
      g.save(); g.globalAlpha = clamp((t - 1.2) / 0.4); const [x, y] = P(SITE.nichols); candle(x, y - 6 * u, 46 * u, t, 1); g.restore();
      pin(...P(SITE.nichols), t - 1.4, { label: "Buck's Row", color: N.lamp, side: -1 });
      topScrim(640);
      kicker('31 สิงหาคม 1888 · รายที่ 1', TX, 260 * u, t, { color: N.lamp });
      big('Mary Ann Nichols', TX, 420 * u, t - 0.2, { size: 100 * u, color: C.cream });
      say('แม่ของลูก 5 คน · พบเสียชีวิตบนถนน Buck\'s Row', TX, 510 * u, t - 3.0, { size: 38 * u, weight: 800, color: C.cream });
      approxNote(t - 2.0);
      finish(0.8);
    } },
];
