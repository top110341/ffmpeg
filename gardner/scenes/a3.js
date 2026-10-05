// Act 3 — the investigation, the reward, the frames still waiting (2:05–3:00, bars 50–72).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, rrect, text, typewriter, shake } from './kit.js';
import { wall, frame, officer, stormPainting, GOLD } from './props.js';

export default () => [
  // ---------------- Chapter 7 — who?
  { from: bar(50), to: bar(52), cues: Array.from({ length: 8 }, (_, i) => [0.2 + i * 0.15, 'pop', 0.35]).concat([[2.5, 'thump', 0.6]]),
    draw(t) {
      paper();
      g.fillStyle = C.paper2; g.fillRect(60 * u, 470 * u, W - 120 * u, 900 * u);
      for (let i = 0; i < 8; i++) { const s = spring(t - 0.2 - i * 0.15, 'playful'); if (s <= 0) continue;
        const x = 200 * u + (i % 4) * 220 * u, y = 640 * u + Math.floor(i / 4) * 360 * u;
        g.save(); g.translate(x, y); g.rotate((hash(i, 8) - 0.5) * 0.15); g.scale(s, s);
        g.fillStyle = '#F7F1E3'; g.fillRect(-90 * u, -120 * u, 180 * u, 240 * u);
        g.save(); g.beginPath(); g.rect(-80 * u, -110 * u, 160 * u, 170 * u); g.clip(); g.fillStyle = C.night2; g.fillRect(-80 * u, -110 * u, 160 * u, 170 * u); person(0, 60 * u, 70 * u, C.fog); g.restore();
        text(g, '?', 0, 105 * u, { size: 50 * u, weight: 400, family: SERIF, color: C.red });
        g.fillStyle = C.red; g.beginPath(); g.arc(0, -120 * u, 10 * u, 0, 7); g.fill(); g.restore(); }
      say('FBI ไล่สืบผู้ต้องสงสัยจำนวนมาก', TX, 330 * u, t - 0.1, { size: 52 * u, weight: 800 });
      say('ตั้งแต่แก๊งมาเฟียบอสตัน จนถึงพ่อค้างานศิลปะ', TX, 1460 * u, t - 2.5, { size: 44 * u, weight: 700, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(52), to: bar(55), cues: [[0.2, 'type', 0.5], [1.4, 'type', 0.5], [3.75, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 3.75, 18); g.translate(sx, sy);
      paper();
      kicker('มีนาคม 2013 · FBI แถลง', TX, 330 * u, t);
      g.save(); g.translate(TX, 820 * u); g.rotate(-0.02);
      g.fillStyle = '#F7F1E3'; rrect(g, -400 * u, -280 * u, 800 * u, 560 * u, 6 * u); g.fill();
      typewriter('FBI เชื่อว่า', -330 * u, -140 * u, t - 0.2, { size: 64 * u, weight: 800, color: C.ink, cps: 14 });
      typewriter('รู้ตัวคนร้ายแล้ว', -330 * u, -50 * u, t - 1.0, { size: 64 * u, weight: 800, color: C.ink, cps: 14 });
      typewriter('2015: ทั้งคู่เสียชีวิตแล้ว', -330 * u, 110 * u, t - 2.6, { size: 54 * u, weight: 800, color: C.red, cps: 14 });
      g.restore();
      stamp('NO ARRESTS', TX, 1300 * u, t - 3.75, { size: 110 * u, rot: -0.08 });
      say('ไม่เคยประกาศชื่ออย่างเป็นทางการ', TX, 1520 * u, t - 4.3, { size: 44 * u, weight: 700, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(55), to: bar(58), cues: [[0.2, 'whoosh', 0.5], [3.75, 'thump', 0.6]],
    draw(t) {
      night('#070A12');
      // a rolled canvas in a dark space, slowly cracking
      g.save(); g.translate(TX, 860 * u); g.rotate(-0.25);
      g.fillStyle = '#D8C9A0'; rrect(g, -360 * u, -60 * u, 720 * u, 120 * u, 60 * u); g.fill();
      g.strokeStyle = '#8F7F58'; g.lineWidth = 3 * u; for (let i = -5; i <= 5; i++) { g.beginPath(); g.moveTo(i * 60 * u, -60 * u); g.lineTo(i * 60 * u + 10 * u, 60 * u); g.stroke(); }
      const cr = remap(t, 1.5, 6.5);
      g.strokeStyle = '#3B2F1E'; g.lineWidth = 2.5 * u;
      for (let k = 0; k < 14 * cr; k++) { const x0 = (hash(k, 5) - 0.5) * 640 * u; g.beginPath(); g.moveTo(x0, -50 * u); for (let j = 1; j < 6; j++) g.lineTo(x0 + (hash(k * 7 + j, 6) - 0.5) * 40 * u, -50 * u + j * 20 * u); g.stroke(); }
      g.restore();
      say('ถ้าภาพยังอยู่', TX, 330 * u, t - 0.2, { size: 60 * u, weight: 800, color: C.cream });
      say('ภาพที่ถูกกรีด แล้วม้วนเก็บ\nเสี่ยงแตกร้าวทุกปีที่ผ่านไป', TX, 1300 * u, t - 1.5, { size: 44 * u, weight: 700, color: C.cream });
      finish();
    } },
  // ---------------- Chapter 8 — the reward
  { from: bar(58), to: bar(61), cues: [[0.2, 'riser', 0.5], [1.4, 'impact', 1.0], [3.75, 'chime', 0.5]],
    draw(t) {
      paper();
      kicker('รางวัลนำจับ', TX, 420 * u, t);
      const n = Math.round(10 * clamp(spring(t - 0.2, 30, 11) * 1.004));
      text(g, `$${n},000,000`, TX, 820 * u, { size: 160 * u, weight: 400, family: SERIF, color: C.red });
      say('เพิ่มเป็นสองเท่าในปี 2017', TX, 990 * u, t - 1.4, { size: 54 * u, weight: 800 });
      say('รางวัลจากองค์กรเอกชน\nที่สูงที่สุดเท่าที่เคยมีมา', TX, 1180 * u, t - 2.5, { size: 50 * u, weight: 700, color: C.inkSoft });
      say('ให้แก่ข้อมูลที่ทำให้ได้ภาพคืน', TX, 1440 * u, t - 3.75, { size: 44 * u, weight: 700, color: C.red });
      finish(0.6);
    } },
  { from: bar(61), to: bar(63) + 2 * BEAT, cues: Array.from({ length: 10 }, (_, i) => [0.2 + i * 0.4, 'tick', 0.35]),
    draw(t) {
      night(C.night2);
      // tips arriving from everywhere: envelopes flying toward a central folder
      for (let i = 0; i < 24; i++) {
        const at = 0.1 + i * 0.22, p = clamp((t - at) / 1.2); if (p <= 0 || p >= 1) continue;
        const a = hash(i, 3) * Math.PI * 2, r = (1 - p) * 900 * u;
        g.save(); g.translate(TX + Math.cos(a) * r, 860 * u + Math.sin(a) * r); g.rotate(a);
        g.fillStyle = C.cream; g.globalAlpha = 0.8; g.fillRect(-40 * u, -26 * u, 80 * u, 52 * u); g.restore();
      }
      g.fillStyle = C.paper2; rrect(g, TX - 160 * u, 760 * u, 320 * u, 220 * u, 10 * u); g.fill();
      say('เบาะแสหลั่งไหลเข้ามาจากทั่วโลก', TX, 330 * u, t - 0.1, { size: 52 * u, weight: 800, color: C.cream });
      say('ไม่มีชิ้นไหนพาไปเจอภาพได้', TX, 1400 * u, t - 3.0, { size: 54 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(63) + 2 * BEAT, to: bar(66), cues: Array.from({ length: 6 }, (_, i) => [i * 0.15, 'tick', 0.5]).concat([[1.25, 'thump', 0.7]]),
    draw(t) {
      paper();
      const ys = ['1990', '2000', '2010', '2020', '2025', '2026'], dw = 170 * u, x0 = TX - 1.5 * (dw + 14 * u);
      for (let d = 0; d < 4; d++) flip(x0 + d * (dw + 14 * u), 820 * u, dw, 250 * u, ys.map((y) => y[d]), ys.map((_, i) => i * 0.15), t, { size: 190 * u });
      kicker('จนถึงวันนี้', TX, 560 * u, t);
      say('ภาพทั้ง 13 ชิ้น ยังไม่กลับมาสักชิ้น', TX, 1100 * u, t - 1.25, { size: 54 * u, weight: 800 });
      finish(0.6);
    } },
  // ---------------- Chapter 9 — the frames wait
  { from: bar(66), to: bar(68), cues: [[0, 'whoosh', 0.4], [2.5, 'thump', 0.6]],
    draw(t) {
      wall();
      const z = track(t, [[0, 0.5], [0.1, 0.75]], 'heavy');
      g.save(); g.translate(TX, 760 * u); g.scale(z, z); g.translate(-TX, -760 * u);
      frame(TX - 420 * u, 760 * u, 480 * u, 600 * u); frame(TX + 420 * u, 760 * u, 480 * u, 600 * u);
      g.restore();
      for (let i = 0; i < 3; i++) person(TX - 300 * u + i * 300 * u + Math.sin(t * 0.6 + i) * 30 * u, 1560 * u, 150 * u, '#0B120E');
      say('ผู้เข้าชมยังยืนมองกรอบเปล่า', TX, 300 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      say('ทุกวัน มากว่า 36 ปี', TX, 410 * u, t - 2.5, { size: 50 * u, weight: 700, color: C.red });
      finish(0.8);
    } },
  { from: bar(68), to: bar(70), cues: [[0, 'thump', 0.9], [2.5, 'swish', 0.4]],
    draw(t) {
      night('#08070A');
      big('13', TX, 980 * u, t, { size: 480 * u, color: C.cream });
      const p = spring(t - 0.7, 'default');
      g.fillStyle = GOLD; g.fillRect(TX - 260 * u * p, 1060 * u, 520 * u * p, 10 * u);
      say('ผลงานศิลปะที่หายไป', TX, 1220 * u, t - 1.0, { size: 56 * u, weight: 700, color: C.fog });
      say('ไม่มีใครรู้ว่าอยู่ที่ไหน', TX, 1330 * u, t - 2.5, { size: 60 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(70), to: bar(72), cues: [[0, 'whoosh', 0.4], [2.5, 'chime', 0.8]],
    draw(t) {
      wall();
      frame(TX, 760 * u, 640 * u, 800 * u);
      say('คุณคิดว่าภาพเหล่านี้', TX, 1300 * u, t - 0.3, { size: 58 * u, weight: 800, color: C.cream });
      say('ซ่อนอยู่ที่ไหน?', TX, 1410 * u, t - 2.5, { size: 64 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
];
