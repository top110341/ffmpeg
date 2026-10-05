// Roanoke — Act 1: 0:00–1:25 (bars 0–34).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, clouds, forest, map } from './kit.js';

// a carved wooden post with letters cut into it; p reveals letters
export function post(x, y, s, word, p = 1) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = '#6B5136'; g.fillRect(-0.16, -1.2, 0.32, 2.2);
  g.strokeStyle = '#4E3A26'; g.lineWidth = 0.01; for (let i = 0; i < 8; i++) { g.beginPath(); g.moveTo(-0.14 + i * 0.04, -1.2); g.lineTo(-0.13 + i * 0.04, 1.0); g.stroke(); }
  const n = Math.floor(word.length * clamp(p));
  [...word.slice(0, n)].forEach((ch, i) => { g.save(); g.translate(0, -1.0 + i * 0.22); g.rotate(Math.PI / 2);
    text(g, ch, 0, 0.06, { size: 0.2, weight: 800, family: 'Inter, sans-serif', color: '#2A1D10' }); g.restore(); });
  g.restore();
}
const MAIN = [[37.2, -76.3], [36.9, -76.2], [36.5, -76.0], [36.1, -75.95], [35.9, -76.0], [35.75, -76.0], [35.5, -76.45], [35.2, -76.5], [35.0, -76.6], [34.7, -76.8], [34.4, -77.6], [33.9, -78.0], [33.5, -79.0], [33, -80], [37.2, -80]];
const BANKS = [[36.95, -75.98], [36.4, -75.82], [36.0, -75.66], [35.6, -75.47], [35.25, -75.52], [35.12, -75.9], [35.17, -75.92], [35.28, -75.6], [35.62, -75.53], [36.02, -75.72], [36.42, -75.88], [36.9, -76.03]];
const ROANOKE = [[35.94, -75.7], [35.88, -75.63], [35.81, -75.63], [35.85, -75.7]];
export const PL = { roanoke: [35.89, -75.67], croatoan: [35.25, -75.6], bertie: [36.0, -76.85], england: [50.4, -4.1] };
export const mapNC = (cam, o = {}) => map(cam, { lands: [MAIN, BANKS, ROANOKE], grid: 0.5, ...o });

export default () => [
  { from: bar(0), to: bar(2), cues: [[0, 'whoosh', 0.5], [0.6, 'type', 0.5], [2.0, 'impact', 0.9]],
    draw(t) {
      night('#0D120E'); forest(1500 * u, { color: '#08100B', h: 340 });
      post(TX, 900 * u, 380 * u, 'CROATOAN', remap(t, 0.5, 2.0));
      say('คำเดียวที่ทิ้งไว้', TX, 320 * u, t - 0.2, { size: 60 * u, weight: 800, color: C.cream });
      say('เมื่อคนทั้งอาณานิคมหายไป', TX, 1560 * u, t - 2.0, { size: 52 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(2), to: bar(4), cues: [[0, 'thump', 0.6], [2.5, 'swish', 0.5]],
    draw(t) {
      paper();
      for (let i = 0; i < 115; i++) { const at = 0.1 + i * 0.012; if (t < at) break; const c = i % 12, r = Math.floor(i / 12);
        g.fillStyle = i >= 104 ? C.red : C.inkSoft; g.beginPath(); g.arc(TX - 330 * u + c * 60 * u, 520 * u + r * 60 * u, 16 * u, 0, 7); g.fill(); }
      big('115 คน', TX, 1260 * u, t - 1.0, { size: 150 * u, color: C.ink });
      say('ชาย หญิง และเด็ก · หายไปทั้งหมด', TX, 1400 * u, t - 2.5, { size: 48 * u, weight: 800, color: C.red });
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
      text(g, 'THE LOST COLONY · 1587', 260 * u, 472 * u, { size: 28 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 2 * u });
      g.restore();
      say('อาณานิคมที่หายสาบสูญ', TX, 760 * u, t - 0.25, { size: 64 * u, weight: 800 });
      stamp('LOST', TX, 1080 * u, t - 2.5, { size: 190 * u, rot: -0.1 });
      say('ปริศนาที่เก่าแก่ที่สุดของอเมริกา', TX, 1380 * u, t - 3.0, { size: 46 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  { from: bar(6), to: bar(9), cues: [[0.2, 'whoosh', 0.6], [2.5, 'pop', 0.8]],
    draw(t) {
      const cam = { lat: track(t, [[0, 35.5], [0.1, 35.75]], 'heavy'), lon: track(t, [[0, -77], [0.1, -75.95]], 'heavy'), z: track(t, [[0, 200], [0.1, 520]], 'heavy') * u };
      const P = mapNC(cam); topScrim();
      pin(...P(PL.roanoke), t - 2.5, { label: 'เกาะ Roanoke', side: 1 });
      kicker('1587 · ชายฝั่งนอร์ทแคโรไลนาในปัจจุบัน', TX, 250 * u, t, { color: C.red });
      say('อังกฤษพยายามตั้งถิ่นฐานถาวร\nแห่งแรกในโลกใหม่', TX, 345 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(9), to: bar(12), cues: [[0.2, 'pop', 0.6], [2.5, 'chime', 0.5], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      person(TX - 160 * u, 900 * u, 130 * u * spring(t - 0.2, 'default'), C.inkSoft);
      person(TX + 160 * u, 920 * u, 100 * u * spring(t - 0.6, 'default'), C.inkSoft);
      g.fillStyle = C.red; g.beginPath(); g.arc(TX + 160 * u, 900 * u, 30 * u * spring(t - 2.5, 'playful'), 0, 7); g.fill();
      say('ผู้ว่าการ John White', TX, 360 * u, t - 0.1, { size: 60 * u, weight: 800 });
      say('สิงหาคม 1587: หลานสาวของเขาเกิด', TX, 1120 * u, t - 2.5, { size: 50 * u, weight: 800 });
      say('Virginia Dare\nเด็กอังกฤษคนแรกที่เกิดในทวีปอเมริกา', TX, 1240 * u, t - 3.5, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(12), to: bar(15), cues: [[0.2, 'whoosh', 0.6], [2.5, 'thump', 0.6], [5.0, 'pop', 0.6]],
    draw(t) {
      night('#0A1420');
      g.strokeStyle = 'rgba(160,180,195,0.4)'; g.lineWidth = 2.5 * u; for (let r = 0; r < 10; r++) { const y = 1100 * u + r * r * 8 * u; g.beginPath(); for (let x = 0; x <= W; x += 16 * u) { const yy = y + Math.sin(x / (46 * u) + t * 1.4 + r) * (2 + r) * u; x ? g.lineTo(x, yy) : g.moveTo(x, yy); } g.stroke(); }
      g.save(); g.translate(TX + t * 60 * u - 200 * u, 1090 * u); g.fillStyle = '#1A1410'; g.beginPath(); g.moveTo(-160 * u, 0); g.lineTo(160 * u, -10 * u); g.lineTo(120 * u, 40 * u); g.lineTo(-130 * u, 40 * u); g.fill(); g.fillRect(-5 * u, -260 * u, 10 * u, 260 * u); g.fillStyle = '#E8E0CC'; g.fillRect(-100 * u, -240 * u, 200 * u, 180 * u); g.restore();
      kicker('ปลายปี 1587', TX, 300 * u, t, { color: C.red });
      say('White กลับอังกฤษ เพื่อนำเสบียงมาเพิ่ม', TX, 410 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      say('ทิ้งลูกสาว หลานสาว และคนอีกกว่าร้อยคนไว้', TX, 1450 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.cream });
      say('ตั้งใจจะกลับมาในไม่กี่เดือน', TX, 1560 * u, t - 5.0, { size: 48 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(15), to: bar(19), cues: [[0.2, 'riser', 0.5], [2.5, 'impact', 1.0], [6.25, 'thump', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 20); g.translate(sx, sy);
      night('#0A1420');
      for (let i = 0; i < 12; i++) { const s = spring(t - 2.5 - i * 0.06, 'snappy'); if (s <= 0) continue; const x = 100 * u + (i % 6) * 170 * u, y = 760 * u + Math.floor(i / 6) * 200 * u;
        g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = '#C8321E'; g.beginPath(); g.moveTo(-60 * u, 20 * u); g.lineTo(60 * u, 20 * u); g.lineTo(40 * u, 50 * u); g.lineTo(-40 * u, 50 * u); g.fill(); g.fillRect(-3 * u, -80 * u, 6 * u, 100 * u); g.fillStyle = '#E8E0CC'; g.fillRect(-40 * u, -70 * u, 80 * u, 60 * u); g.restore(); }
      kicker('1588', TX, 300 * u, t, { color: C.red });
      say('อังกฤษทำสงคราม\nกับกองเรือรบสเปน (Armada)', TX, 410 * u, t - 0.2, { size: 42 * u, weight: 800, color: C.cream });
      say('ทุกลำถูกเรียกไปรบ', TX, 1300 * u, t - 2.5, { size: 60 * u, weight: 800, color: C.red });
      say('การเดินทางกลับ ต้องเลื่อนออกไปถึง 3 ปี', TX, 1420 * u, t - 6.25, { size: 46 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(19), to: bar(20), cues: Array.from({ length: 4 }, (_, i) => [i * 0.2, 'tick', 0.6]).concat([[1.0, 'thump', 0.6]]),
    draw(t) {
      paper();
      const ys = ['1587', '1588', '1589', '1590'], dw = 170 * u, x0 = TX - 1.5 * (dw + 14 * u);
      for (let d = 0; d < 4; d++) flip(x0 + d * (dw + 14 * u), 820 * u, dw, 250 * u, ys.map((y) => y[d]), ys.map((_, i) => i * 0.2), t, { size: 190 * u });
      kicker('สิงหาคม', TX, 560 * u, t);
      say('White กลับมาถึง Roanoke', TX, 1100 * u, t - 0.9, { size: 56 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(20), to: bar(24), cues: [[0.2, 'whoosh', 0.5], [2.5, 'thump', 0.7], [5.0, 'thump', 0.7], [7.5, 'impact', 0.9]],
    draw(t) {
      night('#0D120E'); forest(1500 * u, { color: '#08100B', h: 340 });
      // an empty palisade
      g.fillStyle = '#4A3A26'; for (let i = 0; i < 16; i++) { const x = 120 * u + i * 56 * u, h = (300 + hash(i, 4) * 60) * u; if (i === 7 || i === 8) continue; g.fillRect(x, 1300 * u - h, 40 * u, h); g.beginPath(); g.moveTo(x, 1300 * u - h); g.lineTo(x + 20 * u, 1300 * u - h - 30 * u); g.lineTo(x + 40 * u, 1300 * u - h); g.fill(); }
      kicker('อาณานิคมว่างเปล่า', TX, 300 * u, t, { color: C.red });
      say('บ้านเรือนถูกรื้อถอน ไม่ใช่ถูกเผาทำลาย', TX, 410 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      say('ไม่มีศพ ไม่มีหลุมศพ ไม่มีร่องรอยการสู้รบ', TX, 1450 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.cream });
      say('ทุกคนหายไป อย่างเป็นระเบียบ', TX, 1560 * u, t - 7.5, { size: 50 * u, weight: 800, color: C.red });
      finish();
    } },
];
