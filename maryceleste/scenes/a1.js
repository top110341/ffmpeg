// Mary Celeste — Act 1: 0:00–1:25 (bars 0–34).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, clouds, map } from './kit.js';

export function sea(t, y0, o = {}) {
  const { color = '#0E2233', line = 'rgba(160,180,195,0.4)', rough = 1 } = o;
  g.fillStyle = color; g.fillRect(0, y0, W, H - y0);
  g.strokeStyle = line; g.lineWidth = 2.5 * u;
  for (let r = 0; r < 11; r++) { const y = y0 + 16 * u + r * r * 8 * u; g.beginPath(); for (let x = 0; x <= W; x += 16 * u) { const yy = y + Math.sin(x / (46 * u) + t * (1.2 + r * 0.15) + r) * (2 + r) * u * rough; x ? g.lineTo(x, yy) : g.moveTo(x, yy); } g.stroke(); }
}
// A two-masted brigantine, side-on, bow to the right. sails 0..1; s = hull length px.
export function ship(x, y, s, o = {}) {
  const { sails = 1, color = '#1A1410', sail = '#E8E0CC', rock = 0, torn = 0 } = o;
  g.save(); g.translate(x, y); g.rotate(rock); g.scale(s, s);
  g.fillStyle = color;
  g.beginPath(); g.moveTo(-0.5, -0.02); g.lineTo(0.55, -0.04); g.quadraticCurveTo(0.5, 0.08, 0.38, 0.12); g.lineTo(-0.42, 0.12); g.quadraticCurveTo(-0.5, 0.06, -0.5, -0.02); g.fill();
  g.fillRect(-0.18, -0.62, 0.012, 0.6); g.fillRect(0.2, -0.66, 0.012, 0.64);
  g.beginPath(); g.moveTo(0.55, -0.04); g.lineTo(0.8, -0.12); g.lineTo(0.8, -0.11); g.lineTo(0.55, -0.03); g.fill();
  g.fillStyle = sail;
  if (sails > 0) {
    for (let k = 0; k < 3; k++) { const w = 0.2 - k * 0.03, yy = -0.6 + k * 0.17; g.globalAlpha = 1 - torn * (k === 1 ? 0.8 : 0); g.fillRect(0.206 - w, yy, w * 2 * sails, 0.14); g.globalAlpha = 1; }
    g.beginPath(); g.moveTo(-0.17, -0.58); g.lineTo(-0.17, -0.08); g.lineTo(-0.17 - 0.32 * sails, -0.1); g.closePath(); g.fill();
    g.beginPath(); g.moveTo(0.22, -0.6); g.lineTo(0.78, -0.13); g.lineTo(0.22, -0.12); g.closePath(); g.globalAlpha = 0.85; g.fill(); g.globalAlpha = 1;
  }
  g.restore();
}
export function barrel(x, y, s, color = '#7A5230') {
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color;
  g.beginPath(); g.moveTo(-0.35, -0.5); g.quadraticCurveTo(-0.5, 0, -0.35, 0.5); g.lineTo(0.35, 0.5); g.quadraticCurveTo(0.5, 0, 0.35, -0.5); g.closePath(); g.fill();
  g.fillStyle = '#3A2A1A'; g.fillRect(-0.42, -0.3, 0.84, 0.05); g.fillRect(-0.42, 0.25, 0.84, 0.05);
  g.restore();
}
const EUR = [[43.4, -9.3], [42, -8.9], [40, -8.9], [38.7, -9.5], [37, -8.9], [36.2, -6.0], [36.0, -5.6], [36.8, -2.0], [38.5, 0], [41, 1.5], [43.3, 3.5], [43.6, 7.4], [44.4, 8.9], [42, 12], [40, 15.5], [38, 16], [40.5, 18.5], [45, 13.5], [47, 13], [48, 0], [47.5, -2.5], [46, -1.3], [43.5, -1.5]];
const AFR = [[35.8, -5.9], [35.2, -2], [36.9, 10.3], [33, 11], [31, 20], [10, 20], [10, -16], [21, -17], [27.6, -13.2], [31.5, -9.8], [33.6, -7.6]];
const NAM = [[50, -56], [47, -53], [44.5, -63.5], [43, -70], [41.5, -70], [40.6, -74], [39, -74.5], [37, -76], [35, -75.5], [32, -80.8], [30, -81.4], [25, -80.3], [25, -100], [50, -100]];
const AZORES = [[37.0, -25.2], [36.95, -25.05], [37.8, -25.8], [38.7, -27.2], [38.6, -28.6], [39.4, -31.2]];
export const PL = { ny: [40.7, -74.0], genoa: [44.4, 8.9], found: [38.3, -17.25], lastlog: [37.0, -25.1], gib: [36.14, -5.35] };
export const mapAtl = (cam, o = {}) => map(cam, { lands: [EUR, AFR, NAM], grid: 5, ...o });
export function azores(P) { g.fillStyle = '#C9B98F'; for (const p of AZORES) { const [x, y] = P(p); g.beginPath(); g.arc(x, y, 6 * u, 0, 7); g.fill(); } }

export default () => [
  { from: bar(0), to: bar(2), cues: [[0, 'whoosh', 0.6], [1.0, 'impact', 0.9], [1.8, 'type', 0.4]],
    draw(t) {
      night('#0A1420'); clouds(t * 40 * u, { alpha: 0.4, seed: 3 }); sea(t, 1100 * u);
      ship(TX, 1080 * u + Math.sin(t * 1.3) * 6 * u, 760 * u, { rock: Math.sin(t * 1.1) * 0.03, torn: 1 });
      big('0 คน', TX, 1420 * u, t - 1.0, { size: 160 * u, color: C.red });
      say('เรือที่ลอยอยู่กลางทะเล โดยไม่มีใครอยู่บนเรือเลย', TX, 1530 * u, t - 1.8, { size: 40 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(2), to: bar(4), cues: [[0, 'thump', 0.6], [2.5, 'swish', 0.5]],
    draw(t) {
      paper();
      ['อาหารพอกิน 6 เดือน', 'น้ำจืดเต็มถัง', 'ของใช้ส่วนตัวอยู่ครบ', 'สินค้ายังอยู่ในระวาง'].forEach((s, i) => {
        const at = 0.2 + i * 0.5, p = spring(t - at, 'snappy'); if (p <= 0) return;
        g.save(); g.translate((1 - p) * W, 0);
        text(g, '✓', 160 * u, 560 * u + i * 150 * u, { size: 60 * u, weight: 800, family: 'Inter, sans-serif', color: C.red });
        text(g, s, 240 * u, 550 * u + i * 150 * u, { size: 50 * u, weight: 800, family: THAI, color: C.ink, align: 'left' }); g.restore(); });
      say('ทุกอย่างอยู่ครบ…', TX, 360 * u, t - 0.1, { size: 64 * u, weight: 800 });
      say('ยกเว้นคน 10 คน', TX, 1300 * u, t - 2.5, { size: 72 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 380 * u, 90 * u, 14 * u); g.fill();
      text(g, 'MARY CELESTE · 1872', 260 * u, 472 * u, { size: 30 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 3 * u });
      g.restore();
      say('เรือผีที่โด่งดังที่สุดในประวัติศาสตร์', TX, 760 * u, t - 0.25, { size: 54 * u, weight: 800 });
      stamp('ABANDONED', TX, 1080 * u, t - 2.5, { size: 130 * u, rot: -0.1 });
      say('150 ปีผ่านไป ยังไม่มีใครรู้ว่าพวกเขาหายไปไหน', TX, 1380 * u, t - 3.0, { size: 42 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  { from: bar(6), to: bar(7), cues: Array.from({ length: 5 }, (_, i) => [i * 0.15, 'tick', 0.6]).concat([[1.0, 'thump', 0.6]]),
    draw(t) {
      paper(); kicker('พฤศจิกายน 1872', TX, 420 * u, t);
      const d = ['03', '04', '05', '06', '07'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.15), t, { size: 360 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('ท่าเรือนิวยอร์ก', TX, 1240 * u, t - 1.0, { size: 56 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(7), to: bar(10), cues: [[0.2, 'pop', 0.5], [1.0, 'pop', 0.5], [1.8, 'pop', 0.5], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      [['กัปตัน Benjamin Briggs', 0.2, 1.1], ['Sarah ภรรยา', 1.0, 0.95], ['Sophia ลูกสาววัย 2 ขวบ', 1.8, 0.6]].forEach(([s, at, sc], i) => {
        const p = spring(t - at, 'playful'); if (p <= 0) return;
        const x = TX - 300 * u + i * 300 * u; person(x, 900 * u, 120 * u * sc * p, i === 2 ? C.red : C.inkSoft);
        text(g, s.split(' ')[0], x, 1000 * u, { size: 38 * u, weight: 800, family: THAI, color: C.ink });
        text(g, s.split(' ').slice(1).join(' '), x, 1050 * u, { size: 30 * u, weight: 600, family: THAI, color: C.inkSoft }); });
      say('ครอบครัวกัปตันเดินทางไปด้วย', TX, 360 * u, t - 0.1, { size: 56 * u, weight: 800 });
      say('พร้อมลูกเรืออีก 7 คน · รวม 10 ชีวิต', TX, 1260 * u, t - 3.0, { size: 50 * u, weight: 800 });
      say('ปลายทาง: เมืองเจนัว ประเทศอิตาลี', TX, 1370 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(10), to: bar(13), cues: Array.from({ length: 12 }, (_, i) => [0.2 + i * 0.2, 'thump', 0.25]).concat([[5.0, 'pop', 0.6]]),
    draw(t) {
      night('#140D07');
      for (let i = 0; i < 40; i++) { const at = 0.2 + i * 0.06, s = spring(t - at, 'snappy'); if (s <= 0) continue;
        const c = i % 8, r = Math.floor(i / 8); barrel(TX - 350 * u + c * 100 * u, 1180 * u - r * 120 * u - (1 - s) * 700 * u, 120 * u); }
      say('สินค้าบนเรือ', TX, 330 * u, t - 0.1, { size: 54 * u, weight: 800, color: C.cream });
      big('1,700+ ถัง', TX, 560 * u, t - 0.5, { size: 150 * u, color: C.cream });
      say('แอลกอฮอล์อุตสาหกรรม ไวไฟสูง', TX, 1380 * u, t - 5.0, { size: 52 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(13), to: bar(17), cues: [[0.2, 'whoosh', 0.5], [2.5, 'pop', 0.7], [6.25, 'pop', 0.7]],
    draw(t) {
      const cam = { lat: 39.5, lon: -32.5, z: 14 * u };
      const P = mapAtl(cam); topScrim(); azores(P);
      pin(...P(PL.ny), t - 0.2, { label: 'นิวยอร์ก', side: 1 });
      pin(...P(PL.genoa), t - 2.5, { label: 'เจนัว', side: -1, color: C.fog });
      const h = path([P(PL.ny), P([39.5, -50]), P(PL.lastlog)], remap(t, 0.5, 6.0), { color: C.red, width: 4 * u, dash: [12 * u, 10 * u] });
      ship(h.x, h.y + 20 * u, 70 * u, { color: C.cream, sail: C.cream });
      if (t > 6.25) pin(...P(PL.lastlog), t - 6.25, { label: 'หมู่เกาะอะซอเรส', side: -1 });
      kicker('7 พ.ย. 1872 · ออกเดินทาง', TX, 250 * u, t, { color: C.red });
      say('ข้ามมหาสมุทรแอตแลนติก', TX, 345 * u, t - 0.3, { size: 52 * u, weight: 800, color: C.cream });
      say('25 พ.ย.: บันทึกเดินเรือหน้าสุดท้าย', TX, 1500 * u, t - 6.25, { size: 48 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
];
