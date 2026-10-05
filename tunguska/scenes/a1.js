// Tunguska — Act 1: 0:00–1:30 (bars 0–36).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, clouds, forest, map } from './kit.js';

// top-down taiga with trees; flatten 0..1 lays them radially away from (cx, cy)
export function taiga(cx, cy, flatten, o = {}) {
  const { n = 900, R = 1400 * u, seed = 5, burn = 0 } = o;
  g.fillStyle = '#16231A'; g.fillRect(0, 0, W, H);
  for (let i = 0; i < n; i++) {
    const x = hash(i, seed) * W, y = hash(i, seed + 1) * H, dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy);
    const hit = clamp(flatten * 1.2 - d / R) > 0 ? 1 : 0;
    if (hit) { const a = Math.atan2(dy, dx), L = 26 * u;
      g.strokeStyle = d < 140 * u ? '#3B3226' : burn > 0 && d < 400 * u ? '#2A2016' : '#5C4A32'; g.lineWidth = 4 * u;
      g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * L, y + Math.sin(a) * L); g.stroke(); }
    else { g.fillStyle = '#21402B'; g.beginPath(); g.arc(x, y, 10 * u, 0, 7); g.fill(); }
  }
}
// fireball streak across the sky; p 0..1
export function fireball(p, x0, y0, x1, y1) {
  const x = x0 + (x1 - x0) * p, y = y0 + (y1 - y0) * p;
  for (let k = 0; k < 20; k++) { const q = Math.max(0, p - k * 0.012); g.globalAlpha = (1 - k / 20) * 0.5; g.fillStyle = k < 4 ? '#FFF2C4' : '#E8963C';
    g.beginPath(); g.arc(x0 + (x1 - x0) * q, y0 + (y1 - y0) * q, (26 - k) * u, 0, 7); g.fill(); }
  g.globalAlpha = 1; g.fillStyle = '#FFFFFF'; g.beginPath(); g.arc(x, y, 22 * u, 0, 7); g.fill();
}
const RUS = [[70, 60], [72, 80], [73, 100], [76, 110], [72, 130], [71, 150], [69, 170], [60, 165], [55, 142], [50, 140], [45, 135], [43, 132], [50, 120], [50, 90], [50, 60]];
const BAIKAL = [[55.8, 109.5], [54.5, 109.0], [53.3, 107.5], [52.0, 105.5], [51.5, 104.0], [51.7, 105.0], [53.0, 107.3], [54.3, 108.8], [55.6, 109.8]];
export const PL = { tunguska: [60.9, 101.9], vanavara: [60.34, 102.28], baikal: [53.5, 108.0], moscow: [55.75, 37.6] };
export const mapSib = (cam, o = {}) => map(cam, { lands: [RUS], waters: [BAIKAL], grid: 5, ...o });

export default () => [
  { from: bar(0), to: bar(2), cues: [[0, 'riser', 0.6], [1.2, 'impact', 1.3], [2.0, 'type', 0.4]],
    draw(t) {
      const [sx, sy] = shake(t, 1.2, 40); g.translate(sx, sy);
      if (t < 1.2) { night('#0B1420'); g.fillStyle = '#16231A'; g.fillRect(0, 1200 * u, W, H); fireball(remap(t, 0, 1.2), -100 * u, 200 * u, TX, 1100 * u); }
      else { taiga(TX, 900 * u, clamp((t - 1.2) / 0.5)); const f = clamp(1 - (t - 1.2) / 0.4); g.fillStyle = `rgba(255,240,200,${f})`; g.fillRect(-50 * u, -50 * u, W + 100 * u, H + 100 * u); }
      if (t > 1.6) { g.fillStyle = 'rgba(10,16,28,0.65)'; g.fillRect(0, 1300 * u, W, 300 * u); }
      say('ป่า 80 ล้านต้น ล้มราบในพริบตา', TX, 1440 * u, t - 2.0, { size: 48 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(2), to: bar(4), cues: [[0, 'thump', 0.6], [2.5, 'swish', 0.5]],
    draw(t) {
      taiga(TX, 900 * u, 1);
      g.fillStyle = 'rgba(10,16,28,0.7)'; g.fillRect(0, 1180 * u, W, 420 * u); g.fillRect(0, 220 * u, W, 260 * u);
      big('1,000×', TX, 400 * u, t - 0.1, { size: 170 * u, color: C.red });
      say('รุนแรงกว่าระเบิดปรมาณูที่ฮิโรชิมา\nหลายร้อยถึงราวพันเท่า', TX, 1280 * u, t - 0.8, { size: 46 * u, weight: 800, color: C.cream });
      say('แต่ไม่มีหลุมอุกกาบาต', TX, 1500 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 380 * u, 90 * u, 14 * u); g.fill();
      text(g, 'TUNGUSKA · 30.06.1908', 260 * u, 472 * u, { size: 28 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 2 * u });
      g.restore();
      say('การระเบิดครั้งใหญ่ที่สุด\nที่มนุษย์เคยบันทึกจากวัตถุนอกโลก', TX, 720 * u, t - 0.25, { size: 50 * u, weight: 800 });
      stamp('NO CRATER', TX, 1080 * u, t - 2.5, { size: 130 * u, rot: -0.1 });
      say('ไม่เคยพบชิ้นส่วนของสิ่งที่ระเบิด', TX, 1380 * u, t - 3.0, { size: 46 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  { from: bar(6), to: bar(9), cues: [[0.2, 'whoosh', 0.6], [2.5, 'pop', 0.8]],
    draw(t) {
      const cam = { lat: track(t, [[0, 58], [0.1, 59]], 'heavy'), lon: track(t, [[0, 80], [0.1, 103]], 'heavy'), z: track(t, [[0, 18], [0.1, 60]], 'heavy') * u };
      const P = mapSib(cam); topScrim();
      pin(...P(PL.tunguska), t - 2.5, { label: 'แม่น้ำ Tunguska', side: 1 });
      pin(...P(PL.baikal), t - 1.2, { label: 'ทะเลสาบไบคาล', side: 1, color: C.fog });
      kicker('ไซบีเรีย รัสเซีย', TX, 250 * u, t, { color: C.red });
      say('ป่าสนกว้างใหญ่ที่แทบไม่มีคนอาศัย', TX, 345 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(9), to: bar(10), cues: Array.from({ length: 5 }, (_, i) => [i * 0.15, 'tick', 0.6]).concat([[1.0, 'thump', 0.6]]),
    draw(t) {
      paper(); kicker('มิถุนายน 1908', TX, 420 * u, t);
      const d = ['26', '27', '28', '29', '30'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.15), t, { size: 360 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('ราว 7 โมงเช้า', TX, 1240 * u, t - 1.0, { size: 56 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(10), to: bar(14), cues: [[0.2, 'riser', 0.6], [5.0, 'whoosh', 0.8]],
    draw(t) {
      night('#7A8FA6'); g.fillStyle = '#16231A'; g.fillRect(0, 1250 * u, W, H); forest(1250 * u, { color: '#0E1A12', h: 200 });
      fireball(remap(t, 0.5, 9.5), -100 * u, 300 * u, W + 100 * u, 900 * u);
      kicker('พยานชาวพื้นเมือง Evenki และผู้ตั้งถิ่นฐาน', TX, 300 * u, t, { color: C.red });
      say('เห็นลูกไฟสีฟ้าสว่างเกือบเท่าดวงอาทิตย์\nเคลื่อนผ่านท้องฟ้า', TX, 410 * u, t - 0.3, { size: 46 * u, weight: 800, color: C.ink });
      say('ตามด้วยเสียงคล้ายปืนใหญ่', TX, 1480 * u, t - 5.0, { size: 50 * u, weight: 800, color: C.cream });
      finish(0.6);
    } },
  { from: bar(14), to: bar(18), cues: [[0.2, 'riser', 0.6], [2.5, 'impact', 1.3], [5.0, 'whoosh', 0.8]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 44); g.translate(sx, sy);
      night('#0B1420');
      g.fillStyle = '#16231A'; g.fillRect(0, 1250 * u, W, H); forest(1250 * u, { color: '#0E1A12', h: 200 });
      if (t > 2.5) { const p = clamp((t - 2.5) / 4); for (let k = 0; k < 3; k++) { const q = clamp(p - k * 0.15); g.strokeStyle = `rgba(255,220,160,${1 - q})`; g.lineWidth = 10 * u; g.beginPath(); g.arc(TX, 600 * u, 60 * u + q * 1400 * u, 0, 7); g.stroke(); }
        const f = clamp(1 - (t - 2.5) / 0.6); g.fillStyle = `rgba(255,245,215,${f})`; g.fillRect(-50 * u, -50 * u, W + 100 * u, H + 100 * u); }
      kicker('ระเบิดกลางอากาศ', TX, 300 * u, t, { color: C.red });
      say('สูงจากพื้นราว 5–10 กิโลเมตร', TX, 410 * u, t - 0.2, { size: 52 * u, weight: 800, color: C.cream });
      say('พลังงานราว 10–15 เมกะตัน', TX, 1440 * u, t - 5.0, { size: 56 * u, weight: 800, color: C.red });
      finish();
    } },
];
