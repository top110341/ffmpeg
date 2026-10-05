// Flight 19 — whole film in two files. Act 1: 0:00–1:25 (bars 0–34).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, clouds, map } from './kit.js';
import { waves } from './props_air.js';

// TBM Avenger from above: stubby fuselage, wide straight wings, nose to -y
export function avenger(x, y, s, rot = 0, color = C.cream) {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); g.fillStyle = color;
  g.beginPath(); g.ellipse(0, 0.05, 0.12, 0.6, 0, 0, 7); g.fill();
  g.beginPath(); g.moveTo(-0.95, -0.05); g.lineTo(0.95, -0.05); g.lineTo(0.85, 0.12); g.lineTo(-0.85, 0.12); g.closePath(); g.fill();
  g.beginPath(); g.moveTo(-0.35, 0.5); g.lineTo(0.35, 0.5); g.lineTo(0.3, 0.6); g.lineTo(-0.3, 0.6); g.closePath(); g.fill();
  g.restore();
}
const FLA = [[31, -81.5], [30.7, -81.45], [29, -80.9], [27.5, -80.3], [26.1, -80.1], [25.2, -80.4], [24.6, -81.6], [25.1, -81.1], [25.9, -81.7], [26.7, -82.2], [27.8, -82.7], [28.9, -82.7], [29.9, -84.0], [30.1, -85.5], [30.4, -87], [31, -87]];
const BAH = [[[26.7, -79.0], [26.6, -77.9], [26.5, -78.0], [26.55, -78.9]], [[27.0, -77.4], [26.5, -76.95], [25.9, -77.2], [26.2, -77.3], [26.8, -77.6]],
  [[25.2, -78.0], [24.4, -77.6], [23.9, -77.6], [24.2, -78.2], [25.0, -78.4]], [[25.5, -76.7], [24.7, -76.1], [25.3, -76.3]], [[25.75, -79.28], [25.68, -79.24], [25.7, -79.3]]];
export const PL = { ftl: [26.07, -80.15], hens: [25.9, -79.1], turn1: [25.95, -77.95], turn2: [26.95, -78.0], banana: [28.24, -80.6], keys: [24.6, -81.6] };
export const mapFL = (cam, o = {}) => map(cam, { lands: [FLA, ...BAH], grid: 1, ...o });

export default () => [
  { from: bar(0), to: bar(2), cues: [[0, 'whoosh', 0.6], [1.0, 'impact', 0.9], [1.8, 'type', 0.4]],
    draw(t) {
      night('#071020'); clouds(t * 80 * u, { alpha: 0.5, seed: 6 });
      for (let i = 0; i < 5; i++) avenger(TX + (i - 2) * 140 * u, 760 * u + Math.abs(i - 2) * 90 * u, 110 * u, 0, i === 2 ? C.red : C.cream);
      big('5 ลำ · 14 ชีวิต', TX, 1330 * u, t - 1.0, { size: 120 * u, color: C.cream });
      say('หายไปพร้อมกันกลางทะเล', TX, 1470 * u, t - 1.8, { size: 52 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(2), to: bar(4), cues: [[0, 'thump', 0.6], [1.6, 'impact', 0.9]],
    draw(t) {
      night('#071020');
      for (let i = 0; i < 5; i++) { const a = clamp(1 - (t - 0.4 - i * 0.25) / 0.3); if (a <= 0) continue; g.globalAlpha = a; avenger(TX + (i - 2) * 140 * u, 760 * u + Math.abs(i - 2) * 90 * u, 110 * u, 0, C.cream); g.globalAlpha = 1; }
      say('เครื่องที่ออกไปค้นหา ก็หายไปอีกลำ', TX, 1250 * u, t - 1.6, { size: 54 * u, weight: 800, color: C.cream });
      say('ต้นตำนาน “สามเหลี่ยมเบอร์มิวดา”', TX, 1370 * u, t - 2.6, { size: 54 * u, weight: 800, color: C.red });
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
      text(g, 'US NAVY · FLIGHT 19', 260 * u, 472 * u, { size: 30 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 3 * u });
      g.restore();
      say('ไม่เคยพบซาก ไม่เคยพบศพ', TX, 760 * u, t - 0.25, { size: 64 * u, weight: 800 });
      stamp('CAUSE UNKNOWN', TX, 1080 * u, t - 2.5, { size: 100 * u, rot: -0.1 });
      finish(0.7);
    } },
  { from: bar(6), to: bar(7), cues: Array.from({ length: 5 }, (_, i) => [i * 0.15, 'tick', 0.6]).concat([[1.0, 'thump', 0.6]]),
    draw(t) {
      paper(); kicker('ธันวาคม 1945 · ไม่กี่เดือนหลังสงครามโลกจบ', TX, 420 * u, t);
      const d = ['01', '02', '03', '04', '05'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.15), t, { size: 360 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('ฐานทัพเรือ Fort Lauderdale, ฟลอริดา', TX, 1240 * u, t - 1.0, { size: 50 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(7), to: bar(10), cues: [[0.2, 'pop', 0.6], [2.5, 'pop', 0.6], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      avenger(TX, 660 * u, 300 * u * spring(t - 0.2, 'heavy'), 0, C.ink);
      text(g, 'Grumman TBM Avenger', TX, 960 * u, { size: 56 * u, weight: 400, family: SERIF, color: C.ink, alpha: clamp((t - 0.5) / 0.2) });
      say('เครื่องทิ้งตอร์ปิโด 5 ลำ\nฝึกบินเดินทางเหนือทะเล', TX, 1120 * u, t - 2.5, { size: 44 * u, weight: 800 });
      say('ผู้นำฝูง: ร.ท. Charles Taylor\nชั่วโมงบินราว 2,500 ชม.', TX, 1300 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(10), to: bar(13), cues: [[0.2, 'whoosh', 0.5], [2.5, 'pop', 0.6], [4.0, 'pop', 0.6], [5.5, 'pop', 0.6]],
    draw(t) {
      const cam = { lat: 26.3, lon: -79.0, z: 300 * u };
      const P = mapFL(cam); topScrim();
      pin(...P(PL.ftl), t - 0.2, { label: 'Fort Lauderdale', side: -1 });
      const pts = [P(PL.ftl), P(PL.hens), P(PL.turn1), P(PL.turn2), P(PL.ftl)];
      path(pts, remap(t, 0.6, 6.5), { color: C.red, width: 5 * u, dash: [14 * u, 12 * u] });
      const h = path(pts, remap(t, 0.6, 6.5), { width: 0 });
      avenger(h.x, h.y, 34 * u, h.ang + Math.PI / 2);
      kicker('14:10 · ขึ้นบิน · เส้นทางฝึกรูปสามเหลี่ยม', TX, 250 * u, t, { color: C.red });
      say('ไปทางตะวันออก → ขึ้นเหนือ → กลับฐาน', TX, 345 * u, t - 0.3, { size: 48 * u, weight: 800, color: C.cream });
      say('รวมราว 3 ชั่วโมง', TX, 1520 * u, t - 5.5, { size: 52 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- the compasses
  { from: bar(13), to: bar(16), cues: [[0.2, 'type', 0.5], [1.4, 'type', 0.5], [3.75, 'impact', 0.9]],
    draw(t) {
      const [sx, sy] = shake(t, 3.75, 14); g.translate(sx, sy);
      night('#071020');
      // a compass card spinning loose
      g.save(); g.translate(TX, 860 * u);
      g.fillStyle = '#1B2333'; g.beginPath(); g.arc(0, 0, 260 * u, 0, 7); g.fill();
      g.strokeStyle = C.fog; g.lineWidth = 6 * u; g.stroke();
      g.rotate(Math.sin(t * 3) * 1.2 + t * 0.8);
      g.fillStyle = C.red; g.beginPath(); g.moveTo(0, -220 * u); g.lineTo(26 * u, 0); g.lineTo(-26 * u, 0); g.fill();
      g.fillStyle = C.cream; g.beginPath(); g.moveTo(0, 220 * u); g.lineTo(26 * u, 0); g.lineTo(-26 * u, 0); g.fill();
      ['N', 'E', 'S', 'W'].forEach((d, i) => { g.save(); g.rotate(i * Math.PI / 2); text(g, d, 0, -170 * u, { size: 44 * u, weight: 800, family: 'Inter, sans-serif', color: C.cream }); g.restore(); });
      g.restore();
      kicker('ราว 15:40 · วิทยุจากผู้นำฝูง', TX, 300 * u, t, { color: C.red });
      typewriter('“Both my compasses are out…”', TX, 430 * u, t - 0.2, { size: 54 * u, weight: 400, family: SERIF, color: C.cream, align: 'center', cps: 16 });
      say('“เข็มทิศเสียทั้งสองตัว”', TX, 1300 * u, t - 2.0, { size: 56 * u, weight: 800, color: C.cream });
      say('เขาเชื่อว่ากำลังบินอยู่เหนือหมู่เกาะฟลอริดาคีย์', TX, 1420 * u, t - 3.75, { size: 44 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(16), to: bar(20), cues: [[0.2, 'whoosh', 0.5], [2.5, 'pop', 0.7], [5.0, 'riser', 0.5], [7.5, 'impact', 0.9]],
    draw(t) {
      const cam = { lat: 26.0, lon: -79.6, z: 210 * u };
      const P = mapFL(cam); topScrim();
      const real = P(PL.turn2), keys = P(PL.keys);
      pin(...real, t - 0.2, { label: 'ตำแหน่งจริง (บาฮามาส)', side: -1 });
      pin(...keys, t - 2.5, { label: 'ที่เขาคิดว่าอยู่', side: 1, color: C.fog });
      // he turned northeast to reach "Florida" — further out to sea
      const p = remap(t, 5.0, 7.5), ex = real[0] + 420 * u * p, ey = real[1] - 300 * u * p;
      g.strokeStyle = C.red; g.lineWidth = 6 * u; g.beginPath(); g.moveTo(...real); g.lineTo(ex, ey); g.stroke();
      if (p > 0) avenger(ex, ey, 40 * u, Math.atan2(ey - real[1], ex - real[0]) + Math.PI / 2);
      kicker('ความเข้าใจผิดที่อาจทำให้ทุกคนเสียชีวิต', TX, 250 * u, t, { color: C.red });
      say('จึงพาฝูงบินไปทางตะวันออกเฉียงเหนือ\nเพื่อ “กลับเข้าฝั่ง”', TX, 1400 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.cream });
      say('แต่กลับยิ่งออกห่างจากแผ่นดิน', TX, 1580 * u, t - 7.5, { size: 46 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
];
