// Chicago Tylenol murders (1982) — Act 1: 0:00–0:47.5 (bars 0–19). Hook, title, setting, the first deaths.
// Respectful: no gore, no likenesses. Victims appear only as names, ages, towns and candles.
// No real trade dress: every bottle is a generic red-and-white "EXTRA-STRENGTH / PAIN RELIEVER" bottle.
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, measure } from './kit.js';

// ---------------------------------------------------------------- palette: a closed pharmacy at night
export const N = { bg: '#07090D', bg2: '#10151C', shelf: '#1B2129', shelf2: '#262D36', tube: '214,236,240', red: '#C42A22',
  white: '#ECE8DF', foil: '#C9CED6', lake: '#0B1A2B', land: '#121820', glow: '242,162,60' };
const SANS = 'Inter, sans-serif';

// ---------------------------------------------------------------- generic capsule bottle
// Feet at (x, y), s = height px. o.dim 0..1 darkens it into the shelf; o.mark rings it in red;
// o.cap 0..1 lifts the cap off; o.foil 0..1 = foil inner seal pressed on; o.band 0..1 = plastic neck band.
export function bottle(x, y, s, o = {}) {
  const { dim = 0, mark = 0, cap = 0, foil = 0, band = 0, rot = 0, label = true } = o;
  const w = s * 0.56, bodyH = s * 0.78, neckW = w * 0.62, neckY = -s * 0.86;
  g.save(); g.translate(x, y); g.rotate(rot);
  if (mark > 0) {
    const gr = g.createRadialGradient(0, -s * 0.5, 0, 0, -s * 0.5, s * 0.95);
    gr.addColorStop(0, `rgba(200,50,30,${0.42 * mark})`); gr.addColorStop(1, 'rgba(200,50,30,0)');
    g.fillStyle = gr; g.fillRect(-s, -s * 1.5, 2 * s, 2 * s);
  }
  // shadow
  g.fillStyle = 'rgba(0,0,0,0.45)'; g.beginPath(); g.ellipse(0, 0, w * 0.6, w * 0.08, 0, 0, 7); g.fill();
  // body + shoulder + neck
  const sil = () => {
    g.beginPath();
    g.moveTo(-w / 2, -w * 0.06); g.lineTo(-w / 2, -bodyH); g.quadraticCurveTo(-w / 2, -s * 0.84, -neckW / 2, neckY);
    g.lineTo(neckW / 2, neckY); g.quadraticCurveTo(w / 2, -s * 0.84, w / 2, -bodyH); g.lineTo(w / 2, -w * 0.06);
    g.quadraticCurveTo(w / 2, 0, w / 2 - w * 0.06, 0); g.lineTo(-w / 2 + w * 0.06, 0); g.quadraticCurveTo(-w / 2, 0, -w / 2, -w * 0.06); g.closePath();
  };
  sil(); g.fillStyle = N.white; g.fill();
  g.fillStyle = 'rgba(0,0,0,0.10)'; g.fillRect(w * 0.22, -bodyH, w * 0.28, bodyH);       // side shading
  g.fillStyle = 'rgba(255,255,255,0.5)'; g.fillRect(-w * 0.4, -bodyH * 0.95, w * 0.05, bodyH * 0.85);
  // red label
  const ly0 = -s * 0.66, ly1 = -s * 0.16;
  g.fillStyle = N.red; g.fillRect(-w / 2, ly0, w, ly1 - ly0);
  g.fillStyle = N.white; g.fillRect(-w / 2, ly0 + (ly1 - ly0) * 0.08, w, (ly1 - ly0) * 0.035);
  g.fillRect(-w / 2, ly1 - (ly1 - ly0) * 0.12, w, (ly1 - ly0) * 0.035);
  if (label && w > 34 * u) {
    const fs = w * 0.165;
    text(g, 'EXTRA', 0, ly0 + (ly1 - ly0) * 0.36, { size: fs, weight: 800, family: SANS, color: N.white });
    text(g, 'STRENGTH', 0, ly0 + (ly1 - ly0) * 0.36 + fs * 1.05, { size: fs, weight: 800, family: SANS, color: N.white });
    text(g, 'PAIN RELIEVER', 0, ly0 + (ly1 - ly0) * 0.36 + fs * 1.95, { size: w * 0.085, weight: 700, family: SANS, color: N.white, tracking: 1 * u });
    text(g, 'CAPSULES', 0, ly1 - (ly1 - ly0) * 0.17, { size: w * 0.07, weight: 700, family: SANS, color: N.white, tracking: 2 * u });
  }
  // foil over the mouth
  if (foil > 0) { g.save(); g.globalAlpha = foil; g.fillStyle = N.foil; g.fillRect(-neckW / 2 - 2 * u, neckY - s * 0.02, neckW + 4 * u, s * 0.025);
    g.fillStyle = 'rgba(255,255,255,0.8)'; g.fillRect(-neckW * 0.3, neckY - s * 0.02, neckW * 0.2, s * 0.012); g.restore(); }
  // cap (lifted by `cap`)
  const cy = neckY - s * 0.02 - cap * s * 0.45, cw = w * 0.8, ch = s * 0.14;
  g.save(); g.globalAlpha = 1 - clamp((cap - 0.8) * 5) * 0;
  rrect(g, -cw / 2, cy - ch, cw, ch, s * 0.02); g.fillStyle = '#F4F1EA'; g.fill();
  g.strokeStyle = 'rgba(0,0,0,0.16)'; g.lineWidth = Math.max(1, s * 0.006);
  for (let i = 1; i < 12; i++) { const rx = -cw / 2 + (i / 12) * cw; g.beginPath(); g.moveTo(rx, cy - ch * 0.85); g.lineTo(rx, cy - ch * 0.15); g.stroke(); }
  g.restore();
  // neck band (plastic shrink seal) wraps the cap/neck joint
  if (band > 0) { g.save(); g.globalAlpha = band; g.fillStyle = 'rgba(150,190,215,0.5)'; g.fillRect(-cw * 0.54, neckY - s * 0.09, cw * 1.08, s * 0.12);
    g.strokeStyle = 'rgba(255,255,255,0.8)'; g.lineWidth = 2 * u; g.strokeRect(-cw * 0.54, neckY - s * 0.09, cw * 1.08, s * 0.12);
    g.fillStyle = 'rgba(255,255,255,0.5)'; g.fillRect(-cw * 0.4, neckY - s * 0.075, cw * 0.12, s * 0.09); g.restore(); }
  if (dim > 0) { g.save(); g.globalAlpha = dim; g.fillStyle = N.bg; sil(); g.fill(); rrect(g, -cw / 2, cy - ch, cw, ch, s * 0.02); g.fill(); g.restore(); }
  if (mark > 0) { g.save(); g.globalAlpha = mark; g.strokeStyle = C.red; g.lineWidth = 6 * u; rrect(g, -w * 0.75, -s * 1.12 - cap * s * 0.45, w * 1.5, s * 1.2 + cap * s * 0.45, 16 * u); g.stroke(); g.restore(); }
  g.restore();
}

// ---------------------------------------------------------------- capsule (red/white), split 0..1 pulls the halves apart
export function capsule(x, y, len, rot, split = 0, o = {}) {
  const { powder = 1, seed = 3, a = '#C42A22', b = '#ECE8DF', shape = 'capsule' } = o;
  const d = len * 0.36, gap = split * len * 0.42;
  g.save(); g.translate(x, y); g.rotate(rot);
  g.fillStyle = 'rgba(0,0,0,0.35)'; g.beginPath(); g.ellipse(0, d * 0.75, len * 0.5, d * 0.16, 0, 0, 7); g.fill();
  if (shape === 'caplet') {
    rrect(g, -len / 2, -d * 0.5, len, d, d * 0.5); g.fillStyle = b; g.fill();
    g.fillStyle = 'rgba(0,0,0,0.12)'; g.fillRect(-1 * u, -d * 0.36, 2 * u, d * 0.72);
    g.fillStyle = 'rgba(255,255,255,0.6)'; rrect(g, -len * 0.35, -d * 0.36, len * 0.5, d * 0.12, d * 0.06); g.fill();
    g.restore(); return;
  }
  if (split > 0 && powder > 0) {           // white crystals spilling between the halves (pure function of split)
    g.fillStyle = 'rgba(245,245,240,0.95)';
    for (let i = 0; i < 46; i++) {
      const k = clamp(split * 1.6 - hash(i, seed) * 0.6), px = (hash(i, seed + 1) - 0.5) * gap * 1.6, py = (hash(i, seed + 2) - 0.5) * d * 0.8 + k * k * d * (1.2 + hash(i, seed + 3) * 1.6);
      if (k <= 0) continue;
      g.beginPath(); g.arc(px, py, (1.2 + hash(i, seed + 4) * 2.6) * u * (len / (300 * u)) * 1.2, 0, 7); g.fill();
    }
  }
  // white half (right), then red half (left) which overlaps it
  g.save(); g.translate(gap, 0); rrect(g, -len * 0.08, -d * 0.48, len * 0.58, d * 0.96, d * 0.48); g.fillStyle = b; g.fill();
  g.fillStyle = 'rgba(255,255,255,0.6)'; rrect(g, len * 0.02, -d * 0.34, len * 0.36, d * 0.1, d * 0.05); g.fill(); g.restore();
  g.save(); g.translate(-gap, 0); rrect(g, -len / 2, -d / 2, len * 0.56, d, d * 0.5); g.fillStyle = a; g.fill();
  g.fillStyle = 'rgba(255,255,255,0.28)'; rrect(g, -len * 0.4, -d * 0.36, len * 0.36, d * 0.1, d * 0.05); g.fill(); g.restore();
  g.restore();
}

// ---------------------------------------------------------------- night pharmacy aisle
// rows: shelf board y (u). mark: [row, col] of the one bottle that is lit red. Returns bottle positions.
export function shelf(t, o = {}) {
  const { rows = [760, 1110, 1460], n = 5, bs = 250, mark = null, dim = 0.45, markA = 1, light = 1, x0 = 120, x1 = 900 } = o;
  night(N.bg);
  // back wall panels
  g.fillStyle = N.bg2; g.fillRect(40 * u, 300 * u, W - 80 * u, 1280 * u);
  // fluorescent tube, flickering a little
  const fl = light * (0.85 + 0.15 * noise(t * 6, 2)) * (noise(t * 1.3, 9) > 0.62 ? 0.55 : 1);
  const gr = g.createLinearGradient(0, 160 * u, 0, 900 * u);
  gr.addColorStop(0, `rgba(${N.tube},${0.22 * fl})`); gr.addColorStop(1, `rgba(${N.tube},0)`);
  g.fillStyle = gr; g.fillRect(0, 160 * u, W, 740 * u);
  g.fillStyle = `rgba(${N.tube},${0.9 * fl})`; g.fillRect(150 * u, 180 * u, W - 300 * u, 12 * u);
  const pos = [];
  rows.forEach((ry, r) => {
    for (let c = 0; c < n; c++) {
      const x = (x0 + (c + 0.5) * (x1 - x0) / n) * u, y = ry * u, isM = mark && mark[0] === r && mark[1] === c;
      bottle(x, y, bs * u, { dim: isM ? dim * (1 - markA) : dim + r * 0.08, mark: isM ? markA : 0 });
      pos.push([x, y]);
    }
    g.fillStyle = N.shelf2; g.fillRect(40 * u, ry * u, W - 80 * u, 22 * u);
    g.fillStyle = N.shelf; g.fillRect(40 * u, ry * u + 22 * u, W - 80 * u, 40 * u);
    for (let c = 0; c < n; c++) { g.fillStyle = 'rgba(236,232,223,0.28)'; g.fillRect((x0 + (c + 0.5) * (x1 - x0) / n - 30) * u, ry * u + 30 * u, 60 * u, 22 * u); }
  });
  return pos;
}

// ---------------------------------------------------------------- memorial candle (deterministic flicker)
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

// ---------------------------------------------------------------- schematic map: Chicago + western suburbs (approximate)
const LAKE = [[42.45, -87.80], [42.30, -87.82], [42.15, -87.75], [42.05, -87.68], [41.97, -87.645], [41.90, -87.62], [41.84, -87.60],
  [41.76, -87.55], [41.70, -87.52], [41.62, -87.42], [41.55, -87.0], [41.55, -86.0], [42.6, -86.0], [42.6, -87.80]];
const ROADS = [
  [[41.98, -88.30], [41.99, -88.05], [41.99, -87.90], [41.96, -87.75], [41.90, -87.64]],    // I-90 (approx)
  [[41.87, -88.30], [41.87, -88.05], [41.87, -87.90], [41.875, -87.64]],                     // I-290/I-88 (approx)
  [[42.20, -87.88], [42.05, -87.86], [41.95, -87.88], [41.80, -87.87], [41.65, -87.86]],     // I-294 (approx)
  [[42.20, -88.00], [42.06, -87.94], [41.99, -87.80], [41.95, -87.70]],                       // I-94/Edens-ish
  [[41.80, -88.30], [41.80, -88.05], [41.83, -87.80], [41.85, -87.65]],                       // I-55-ish
];
export const TOWN = {
  elkgrove: [42.004, -87.97], arlington: [42.088, -87.98], lisle: [41.80, -88.075], elmhurst: [41.899, -87.94],
  winfield: [41.87, -88.16], chicago: [41.88, -87.63],
};
export function chiMap(t, o = {}) {
  const { lat = 41.95, lon = -87.86, z = 1700, reveal = 1, roads = 1 } = o;
  const k = Math.cos(lat * Math.PI / 180);
  const P = ([la, lo]) => [TX + (lo - lon) * k * z * u, 1000 * u - (la - lat) * z * u];
  g.fillStyle = N.land; g.fillRect(0, 0, W, H);
  g.save(); g.strokeStyle = 'rgba(140,151,173,0.06)'; g.lineWidth = 1 * u;
  for (let i = 0; i < 24; i++) { g.beginPath(); g.moveTo(0, i * 90 * u); g.lineTo(W, i * 90 * u); g.stroke(); g.beginPath(); g.moveTo(i * 90 * u, 0); g.lineTo(i * 90 * u, H); g.stroke(); }
  g.restore();
  // suburban street texture
  g.save(); g.strokeStyle = 'rgba(140,151,173,0.07)'; g.lineWidth = 2 * u;
  for (let i = 0; i < 70; i++) { const x = hash(i, 61) * W, y = 600 * u + hash(i, 62) * 900 * u, L = (30 + hash(i, 63) * 60) * u, h = hash(i, 64) > 0.5;
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + (h ? L : 0), y + (h ? 0 : L)); g.stroke(); }
  g.restore();
  if (roads > 0) ROADS.forEach((r) => path(r.map(P), reveal, { color: `rgba(239,230,210,${0.22 * roads})`, width: 6 * u }));
  g.beginPath(); LAKE.forEach((p, i) => { const [x, y] = P(p); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.closePath();
  g.fillStyle = N.lake; g.fill(); g.strokeStyle = 'rgba(109,138,168,0.6)'; g.lineWidth = 3 * u; g.stroke();
  const [lx, ly] = P([42.12, -87.5]);
  g.save(); g.translate(lx, ly); g.rotate(Math.PI / 2 - 0.12);
  text(g, 'ทะเลสาบมิชิแกน', 0, 0, { size: 30 * u, weight: 700, family: THAI, color: '#6D8AA8', alpha: clamp(reveal * 2 - 1) }); g.restore();
  return P;
}
export function approxNote(t) { say('ตำแหน่งโดยประมาณ · แผนที่จำลอง', TX, 1530 * u, t, { size: 30 * u, weight: 700, color: C.fog }); }

// dark band behind text over busy art
export function band(y, h, a = 0.8) { g.fillStyle = `rgba(7,9,13,${a})`; g.fillRect(0, y * u, W, h * u); }

export default () => [
  // ---------------- hook: one bottle among many
  { from: bar(0), to: bar(2), cues: [[0, 'thump', 0.7], [0.3, 'riser', 0.4], [1.25, 'impact', 0.9], [2.5, 'tick', 0.4]],
    draw(t) {
      const z = track(t, [[0, 1.14], [0.01, 1]], 'heavy');
      g.save(); g.translate(TX, 1100 * u); g.scale(z, z); g.translate(-TX, -1100 * u);
      shelf(t, { mark: [1, 2], markA: clamp((t - 1.25) / 0.2), dim: 0.55 });
      g.restore();
      g.fillStyle = 'rgba(7,9,13,0.78)'; g.fillRect(0, 210 * u, W, 300 * u); g.fillRect(0, 1360 * u, W, 230 * u);
      big('7', TX, 450 * u, t - 0.1, { size: 240 * u, color: C.red });
      say('ยาแก้ปวดบนชั้นวางธรรมดา ๆ\nคร่าชีวิตคนไป 7 คน', TX, 1430 * u, t - 1.3, { size: 46 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- the capsule opens
  { from: bar(2), to: bar(4), cues: [[0, 'thump', 0.6], [1.2, 'click', 0.8], [1.3, 'swish', 0.4], [3.4, 'thump', 0.5]],
    draw(t) {
      night(N.bg);
      const gr = g.createRadialGradient(TX, 900 * u, 0, TX, 900 * u, 600 * u); gr.addColorStop(0, 'rgba(214,236,240,0.12)'); gr.addColorStop(1, 'rgba(214,236,240,0)');
      g.fillStyle = gr; g.fillRect(0, 300 * u, W, 1200 * u);
      const sp = clamp(spring(t - 1.2, 'heavy'));
      capsule(TX, 820 * u, 560 * u, -0.18 + 0.04 * Math.sin(t * 0.8), sp * 0.9);
      say('ใครบางคนแอบเปิดแคปซูล\nเติมไซยาไนด์ลงไป', TX, 330 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      band(1400, 170, t > 2.4 ? 0.85 : 0);
      say('แล้วนำขวดกลับไปวางบนชั้นวางในร้าน', TX, 1500 * u, t - 2.6, { size: 46 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  // ---------------- title card
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 440 * u, 90 * u, 14 * u); g.fill();
      text(g, 'CHICAGO · SEPT–OCT 1982', 290 * u, 472 * u, { size: 28 * u, weight: 700, family: SANS, color: C.inkSoft, tracking: 2 * u });
      g.restore();
      say('คดีฆาตกรรมไทลินอล', TX, 740 * u, t - 0.25, { size: 78 * u, weight: 800 });
      say('The Tylenol Murders', TX, 850 * u, t - 0.6, { size: 52 * u, weight: 400, family: SERIF, color: C.inkSoft });
      stamp('UNSOLVED', TX, 1100 * u, t - 2.5, { size: 120 * u, rot: -0.1 });
      say('กว่า 40 ปีผ่านไป\nยังไม่มีใครถูกตั้งข้อหาฆาตกรรม', TX, 1330 * u, t - 3.0, { size: 44 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------- setting: Chicago suburbs
  { from: bar(6), to: bar(9), cues: [[0.2, 'whoosh', 0.6], [1.6, 'pop', 0.7], [4.4, 'thump', 0.5]],
    draw(t) {
      const z = track(t, [[0, 900], [0.1, 1700]], 'heavy');
      const P = chiMap(t, { z, reveal: clamp(t / 1.4) });
      const [cx, cy] = P(TOWN.chicago);
      const p = clamp(spring(t - 1.4, 'default'));
      g.save(); g.globalAlpha = 0.25 * p; g.fillStyle = C.red; g.beginPath(); g.ellipse(cx - 300 * u, cy - 80 * u, 340 * u * p, 230 * u * p, 0, 0, 7); g.fill(); g.restore();
      pin(cx, cy, t - 1.6, { label: 'ชิคาโก', side: -1 });
      topScrim(640, '7,9,13');
      kicker('รัฐอิลลินอยส์ · สหรัฐอเมริกา', TX, 250 * u, t, { color: C.red });
      say('ชิคาโกและชานเมือง\nฤดูใบไม้ร่วง ปี 1982', TX, 350 * u, t - 0.3, { size: 52 * u, weight: 800, color: C.cream });
      band(1320, 270, t > 4.2 ? 0.8 : 0);
      say('ในเวลานั้น ไทลินอลคือยาแก้ปวด\nที่ขายดีที่สุดในอเมริกา', TX, 1400 * u, t - 4.4, { size: 42 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- 29 September
  { from: bar(9), to: bar(10), cues: Array.from({ length: 5 }, (_, i) => [i * 0.15, 'tick', 0.6]).concat([[1.0, 'thump', 0.6]]),
    draw(t) {
      night(N.bg); kicker('กันยายน 1982', TX, 420 * u, t, { color: C.red });
      const d = ['25', '26', '27', '28', '29'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.15), t, { size: 360 * u, bg: C.cream, fg: C.ink, r: 18 * u });
      say('เช้าวันพุธ', TX, 1240 * u, t - 1.0, { size: 56 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- victim 1
  { from: bar(10), to: bar(13), cues: [[0.2, 'chime', 0.4], [2.6, 'pop', 0.5], [5.0, 'thump', 0.5]],
    draw(t) {
      night(N.bg);
      const lit = clamp((t - 0.3) / 0.6);
      candle(TX, 1180 * u, 200 * u, t, 1, lit);
      kicker('29 กันยายน 1982 · รายแรก', TX, 280 * u, t, { color: C.red });
      big('Mary Kellerman', TX, 450 * u, t - 0.2, { size: 110 * u, color: C.cream });
      say('เด็กหญิงวัย 12 ปี จาก Elk Grove Village', TX, 560 * u, t - 0.8, { size: 42 * u, weight: 800, color: C.cream });
      say('เช้าวันนั้นเธอไม่สบาย\nจึงกินยาแก้ปวดไป 1 แคปซูล', TX, 1290 * u, t - 2.6, { size: 46 * u, weight: 800, color: C.cream });
      say('และจากไปในวันเดียวกัน', TX, 1500 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  // ---------------- the Janus family
  { from: bar(13), to: bar(16), cues: [[0.2, 'thump', 0.5], [2.6, 'chime', 0.4], [5.2, 'chime', 0.4]],
    draw(t) {
      night(N.bg);
      // one bottle on a kitchen table, three candles
      g.fillStyle = '#16120F'; g.fillRect(0, 1180 * u, W, 60 * u);
      bottle(TX, 1180 * u, 300 * u, { dim: 0.15 });
      [[TX - 330 * u, 0.4], [TX + 270 * u, 5.4], [TX + 380 * u, 5.6]].forEach(([x, at], i) => candle(x, 1180 * u, 120 * u, t, i + 2, clamp((t - at) / 0.5)));
      kicker('วันเดียวกัน · Arlington Heights', TX, 280 * u, t, { color: C.red });
      say('Adam Janus อายุ 27 ปี\nเสียชีวิตหลังกินยาชนิดเดียวกัน', TX, 390 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      say('เย็นนั้น ญาติมารวมตัวที่บ้านของเขา', TX, 1320 * u, t - 2.6, { size: 42 * u, weight: 800, color: C.cream });
      say('น้องชาย Stanley และภรรยา Theresa\nกินยาจากขวดเดียวกัน · ทั้งคู่ไม่รอด', TX, 1400 * u, t - 5.2, { size: 42 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  // ---------------- seven deaths, map pins
  { from: bar(16), to: bar(19), cues: [[0.2, 'whoosh', 0.5]].concat([0.8, 1.3, 1.8, 2.3, 2.8, 3.3].map((a) => [a, 'pop', 0.5])).concat([[5.0, 'impact', 0.7]]),
    draw(t) {
      const P = chiMap(t, { reveal: 1 });
      const ts = [['elkgrove', 'Elk Grove Village', 1], ['arlington', 'Arlington Heights', 1], ['lisle', 'Lisle', 1], ['elmhurst', 'Elmhurst', 1], ['winfield', 'Winfield', 1], ['chicago', 'Chicago', -1]];
      ts.forEach(([k, lb, sd], i) => pin(...P(TOWN[k]), t - 0.8 - i * 0.5, { label: lb, side: sd }));
      topScrim(640, '7,9,13');
      kicker('29 ก.ย. – 1 ต.ค. 1982', TX, 250 * u, t, { color: C.red });
      say('ภายในราว 3 วัน', TX, 350 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      band(1330, 170, t > 4.8 ? 0.82 : 0);
      say('มีผู้เสียชีวิต 7 คน ในชิคาโกและชานเมือง', TX, 1430 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.red });
      if (t > 1) approxNote(t - 1);
      finish(0.8);
    } },
];
