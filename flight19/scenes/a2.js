// Flight 19 — Act 2: 0:50–3:00 (bars 20–72).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, clouds, rain } from './kit.js';
import { waves } from './props_air.js';
import { avenger, mapFL, PL } from './a1.js';

function sea(t, y0, rough = 1) {
  g.fillStyle = '#081322'; g.fillRect(0, y0, W, H - y0);
  g.strokeStyle = 'rgba(140,151,173,0.4)'; g.lineWidth = 2.5 * u;
  for (let r = 0; r < 10; r++) { const y = y0 + 20 * u + r * r * 9 * u; g.beginPath(); for (let x = 0; x <= W; x += 16 * u) { const yy = y + Math.sin(x / (40 * u) + t * (2 + r * 0.2) + r) * (3 + r) * u * rough; x ? g.lineTo(x, yy) : g.moveTo(x, yy); } g.stroke(); }
}

export default () => [
  { from: bar(20), to: bar(24), cues: [[0.3, 'type', 0.5], [2.5, 'type', 0.5], [5.0, 'type', 0.5], [7.5, 'thump', 0.6]],
    draw(t) {
      night('#05090F'); clouds(t * 120 * u, { alpha: 0.7, seed: 8, color: C.night2 });
      rain(t, { n: 120, alpha: 0.3, angle: 0.4 });
      kicker('วิทยุที่หอบังคับการบินได้ยิน', TX, 300 * u, t, { color: C.red });
      const f = { size: 52 * u, weight: 400, family: SERIF, color: C.cream, cps: 16, align: 'left' };
      typewriter('“I don\'t know where we are…”', 110 * u, 520 * u, t - 0.3, f);
      typewriter('“We must have got lost', 110 * u, 640 * u, t - 2.5, f);
      typewriter('after that last turn.”', 110 * u, 710 * u, t - 3.6, f);
      say('ฟ้ามืดลง อากาศแย่ลง ทะเลมีคลื่นสูง', TX, 1200 * u, t - 5.0, { size: 48 * u, weight: 800, color: C.cream });
      say('สัญญาณวิทยุขาด ๆ หาย ๆ', TX, 1310 * u, t - 7.5, { size: 48 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(24), to: bar(28), cues: [[0.3, 'type', 0.6], [3.75, 'riser', 0.5], [7.5, 'impact', 1.0]],
    draw(t) {
      night('#04070D'); sea(t, 1150 * u, 2);
      kicker('ราว 19:04', TX, 300 * u, t, { color: C.red });
      say('ได้ยินเสียงของ Taylor เป็นครั้งสุดท้าย', TX, 410 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      typewriter('“All planes close up tight…', 110 * u, 620 * u, t - 1.0, { size: 46 * u, weight: 400, family: SERIF, color: C.cream, cps: 16 });
      typewriter('when the first plane drops below 10 gallons,', 110 * u, 690 * u, t - 2.6, { size: 38 * u, weight: 400, family: SERIF, color: C.cream, cps: 20 });
      typewriter('we all go down together.”', 110 * u, 760 * u, t - 4.6, { size: 46 * u, weight: 400, family: SERIF, color: C.red, cps: 16 });
      say('“เมื่อลำแรกน้ำมันเหลือไม่ถึง 10 แกลลอน\nเราจะลงทะเลไปพร้อมกัน”', TX, 1000 * u, t - 6.0, { size: 44 * u, weight: 800, color: C.cream });
      finish();
    } },
  // ---------------- the second disappearance
  { from: bar(28), to: bar(32), cues: [[0.2, 'whoosh', 0.6], [2.5, 'thump', 0.6], [5.0, 'riser', 0.5], [7.5, 'impact', 1.2]],
    draw(t) {
      const [sx, sy] = shake(t, 7.5, 26); g.translate(sx, sy);
      night('#04070D'); sea(t, 1250 * u, 2);
      // PBM Mariner flying boat, gull wing
      if (t < 7.5) { g.save(); g.translate(-200 * u + t * 120 * u, 760 * u); g.fillStyle = C.cream;
        g.beginPath(); g.ellipse(0, 0, 200 * u, 40 * u, 0, 0, 7); g.fill();
        g.beginPath(); g.moveTo(-40 * u, -20 * u); g.lineTo(-140 * u, -90 * u); g.lineTo(-300 * u, -80 * u); g.lineTo(-290 * u, -66 * u); g.lineTo(-130 * u, -70 * u); g.closePath(); g.fill();
        g.beginPath(); g.moveTo(40 * u, -20 * u); g.lineTo(140 * u, -90 * u); g.lineTo(300 * u, -80 * u); g.lineTo(290 * u, -66 * u); g.lineTo(130 * u, -70 * u); g.closePath(); g.fill();
        g.restore(); }
      if (t > 7.5) { const p = clamp((t - 7.5) / 1.5); g.fillStyle = `rgba(232,150,60,${1 - p})`; g.beginPath(); g.arc(-200 * u + 7.5 * 120 * u, 760 * u, 60 * u + p * 200 * u, 0, 7); g.fill(); }
      kicker('19:27 · เครื่องบินกู้ภัย PBM Mariner ขึ้นบิน', TX, 300 * u, t, { color: C.red });
      say('ลูกเรือ 13 คน ออกไปตามหาฝูงบิน', TX, 410 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.cream });
      say('เรือบรรทุกน้ำมันในละแวกนั้น\nเห็นเปลวไฟลุกบนท้องฟ้า', TX, 1380 * u, t - 7.5, { size: 46 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(32), to: bar(36), cues: [[0.2, 'thump', 0.6], [2.5, 'thump', 0.6], [5.0, 'impact', 0.9]],
    draw(t) {
      paper();
      kicker('คืนเดียว', TX, 360 * u, t);
      big('27', TX, 820 * u, t - 0.2, { size: 380 * u, color: C.red });
      say('ชีวิตที่หายไป', TX, 980 * u, t - 1.0, { size: 64 * u, weight: 800 });
      say('Flight 19: 14 คน · PBM Mariner: 13 คน', TX, 1120 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.inkSoft });
      say('เครื่องรุ่นนี้ขึ้นชื่อเรื่องไอน้ำมันสะสม\nจนอาจระเบิดกลางอากาศ', TX, 1300 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- the search, the report
  { from: bar(36), to: bar(40), cues: Array.from({ length: 10 }, (_, i) => [0.3 + i * 0.5, 'tick', 0.35]).concat([[7.5, 'thump', 0.6]]),
    draw(t) {
      const cam = { lat: 27.0, lon: -77.5, z: 140 * u };
      const P = mapFL(cam); topScrim();
      for (let i = 0; i < 40; i++) { const at = 0.3 + i * 0.12; if (t < at) continue; const lat = 24 + hash(i, 3) * 6, lon = -80 + hash(i, 4) * 6; const [x, y] = P([lat, lon]);
        g.strokeStyle = C.red; g.globalAlpha = 0.6; g.lineWidth = 3 * u; g.strokeRect(x - 30 * u, y - 30 * u, 60 * u, 60 * u); g.globalAlpha = 1; }
      kicker('5 วันต่อมา', TX, 250 * u, t, { color: C.red });
      say('เรือและเครื่องบินหลายร้อยลำ\nค้นหาทั่วมหาสมุทรแอตแลนติก', TX, 345 * u, t - 0.3, { size: 48 * u, weight: 800, color: C.cream });
      say('ไม่พบอะไรเลย แม้แต่คราบน้ำมัน', TX, 1520 * u, t - 6.0, { size: 50 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(40), to: bar(44), cues: [[0.2, 'type', 0.5], [2.5, 'thump', 0.6], [5.0, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 5.0, 18); g.translate(sx, sy);
      paper();
      kicker('รายงานของกองทัพเรือ', TX, 300 * u, t);
      g.save(); g.translate(TX, 760 * u); g.rotate(-0.02);
      g.fillStyle = '#F7F1E3'; rrect(g, -400 * u, -280 * u, 800 * u, 560 * u, 6 * u); g.fill();
      typewriter('ฉบับแรก: ผู้นำฝูงสับสนตำแหน่ง', -340 * u, -150 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.ink, cps: 16 });
      g.fillStyle = C.red; if (t > 2.5) g.fillRect(-350 * u, -168 * u, 700 * u * clamp((t - 2.5) / 0.4), 8 * u);
      typewriter('แก้ไขเป็น: “ไม่ทราบสาเหตุ”', -340 * u, 20 * u, t - 3.0, { size: 52 * u, weight: 800, color: C.red, cps: 14 });
      g.restore();
      say('หลังแม่ของ Taylor ยื่นคัดค้าน\nไม่ให้โทษลูกชายของเธอ', TX, 1250 * u, t - 5.0, { size: 48 * u, weight: 800 });
      finish(0.6);
    } },
  // ---------------- the legend
  { from: bar(44), to: bar(48), cues: [[0.2, 'whoosh', 0.6], [2.5, 'thump', 0.7], [5.0, 'pop', 0.6]],
    draw(t) {
      const cam = { lat: 27.5, lon: -72, z: 32 * u };
      const P = mapFL(cam); topScrim();
      const A = P([25.77, -80.19]), B = P([32.3, -64.78]), Cc = P([18.47, -66.1]), p = remap(t, 0.5, 3.0);
      g.fillStyle = 'rgba(200,50,30,0.2)'; g.strokeStyle = C.red; g.lineWidth = 5 * u;
      g.beginPath(); g.moveTo(...A); g.lineTo(A[0] + (B[0] - A[0]) * p, A[1] + (B[1] - A[1]) * p); if (p >= 1) { g.lineTo(...Cc); g.closePath(); g.fill(); } g.stroke();
      text(g, 'ไมอามี', A[0] - 20 * u, A[1] + 50 * u, { size: 32 * u, weight: 700, family: THAI, color: C.cream, align: 'right' });
      text(g, 'เบอร์มิวดา', B[0], B[1] - 30 * u, { size: 32 * u, weight: 700, family: THAI, color: C.cream });
      text(g, 'เปอร์โตริโก', Cc[0], Cc[1] + 50 * u, { size: 32 * u, weight: 700, family: THAI, color: C.cream });
      kicker('1964 · นิตยสาร Argosy', TX, 250 * u, t, { color: C.red });
      say('คำว่า “สามเหลี่ยมเบอร์มิวดา” ถือกำเนิด', TX, 345 * u, t - 0.3, { size: 46 * u, weight: 800, color: C.cream });
      say('Flight 19 กลายเป็นเรื่องเอกของตำนานนี้', TX, 1500 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(48), to: bar(52), cues: [[0.2, 'pop', 0.5], [2.5, 'pop', 0.5], [5.0, 'pop', 0.5], [7.5, 'thump', 0.6]],
    draw(t) {
      paper();
      g.fillStyle = C.paper2; g.fillRect(60 * u, 470 * u, W - 120 * u, 900 * u);
      [['สนามแม่เหล็กผิดปกติ?', 270, 650, 0.2], ['คลื่นยักษ์/พายุ?', 760, 720, 0.9], ['มนุษย์ต่างดาว?', 300, 1000, 1.6], ['หลงทาง + น้ำมันหมด', 760, 1100, 2.5]].forEach(([s, x, y, at], i) => {
        const p = spring(t - at, 'playful'); if (p <= 0) return;
        g.save(); g.translate(x * u, y * u); g.rotate((hash(i, 7) - 0.5) * 0.12); g.scale(p, p);
        g.fillStyle = i === 3 ? C.red : '#F7F1E3'; g.fillRect(-200 * u, -70 * u, 400 * u, 140 * u);
        text(g, s, 0, 14 * u, { size: 40 * u, weight: 800, family: THAI, color: i === 3 ? C.paper : C.ink }); g.restore(); });
      say('ทฤษฎีมากมาย', TX, 330 * u, t - 0.1, { size: 60 * u, weight: 800 });
      say('นักวิจัยส่วนใหญ่เชื่อคำอธิบายที่ธรรมดาที่สุด', TX, 1460 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(52), to: bar(56), cues: [[0.2, 'whoosh', 0.5], [2.5, 'pop', 0.7], [6.25, 'impact', 0.9]],
    draw(t) {
      night('#030913');
      g.fillStyle = '#122030'; g.beginPath(); g.moveTo(0, 1250 * u); for (let x = 0; x <= W; x += 30 * u) g.lineTo(x, 1250 * u + noise(x / (120 * u), 3) * 50 * u); g.lineTo(W, H); g.lineTo(0, H); g.fill();
      for (let i = 0; i < 5; i++) avenger(150 * u + i * 190 * u, 1230 * u + hash(i, 2) * 40 * u, 70 * u, hash(i, 3) * 3, 'rgba(201,185,143,0.6)');
      kicker('1991 · นักล่าสมบัติพบซากเครื่อง Avenger 5 ลำใต้ทะเล', TX, 300 * u, t, { color: C.red });
      say('ตอนแรกคิดว่าเป็น Flight 19', TX, 420 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.cream });
      stamp('NOT FLIGHT 19', TX, 860 * u, t - 6.25, { size: 100 * u, rot: -0.08 });
      say('เลขเครื่องไม่ตรง เป็นเครื่องที่ตกจากเหตุอื่น', TX, 1080 * u, t - 6.5, { size: 42 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(56), to: bar(60), cues: [[0.2, 'thump', 0.6], [2.5, 'thump', 0.6], [5.0, 'thump', 0.6], [7.5, 'chime', 0.5]],
    draw(t) {
      paper();
      kicker('สิ่งที่เรารู้แน่ ๆ', TX, 300 * u, t);
      [['เข็มทิศมีปัญหา และผู้นำฝูงสับสนตำแหน่ง', 0.2], ['คืนนั้นมืด อากาศแย่ ทะเลคลื่นสูง', 2.5], ['น้ำมันหมดกลางมหาสมุทร', 5.0]].forEach(([s, at], i) => {
        const p = spring(t - at, 'snappy'); if (p <= 0) return;
        g.save(); g.translate((1 - p) * -80 * u, 0); g.globalAlpha = clamp((t - at) / 0.12);
        text(g, '✓', 110 * u, 600 * u + i * 180 * u, { size: 60 * u, weight: 800, family: 'Inter, sans-serif', color: C.red });
        text(g, s, 180 * u, 590 * u + i * 180 * u, { size: 40 * u, weight: 800, family: THAI, color: C.ink, align: 'left' }); g.restore(); });
      say('แต่ซากของทั้ง 6 ลำ\nยังไม่เคยถูกพบ', TX, 1300 * u, t - 7.5, { size: 56 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(60), to: bar(64), cues: [[0.2, 'whoosh', 0.5], [5.0, 'thump', 0.6]],
    draw(t) {
      night('#04070D'); sea(t, 1100 * u, 1.5);
      waves(TX, 700 * u, t, { dir: 0, spread: Math.PI, alpha: Math.max(0.15, 1 - t / 6), color: C.fog });
      say('ทุกวันนี้ ยังมีคนพยายามตามหา', TX, 330 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      say('ทะเลบริเวณนี้ลึกหลายกิโลเมตร\nและกระแสน้ำแรงมาก', TX, 1300 * u, t - 2.5, { size: 48 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(64), to: bar(68), cues: [[0, 'thump', 0.9], [5.0, 'swish', 0.4]],
    draw(t) {
      night('#08070A');
      big('FLIGHT 19', TX, 900 * u, t, { size: 200 * u, color: C.cream });
      const p = spring(t - 0.7, 'default');
      g.fillStyle = C.red; g.fillRect(TX - 330 * u * p, 960 * u, 660 * u * p, 10 * u);
      say('5 ธันวาคม 1945', TX, 1120 * u, t - 1.0, { size: 56 * u, weight: 700, color: C.fog });
      say('6 ลำ · 27 ชีวิต · 0 ซาก', TX, 1240 * u, t - 2.5, { size: 60 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(68), to: bar(72), cues: [[0, 'whoosh', 0.5], [5.0, 'chime', 0.8]],
    draw(t) {
      night('#071020'); clouds(t * 80 * u, { alpha: 0.5, seed: 6 });
      for (let i = 0; i < 5; i++) avenger(TX + (i - 2) * 140 * u, 760 * u + Math.abs(i - 2) * 90 * u, 110 * u, 0, C.cream);
      say('สามเหลี่ยมเบอร์มิวดา หรือแค่โชคร้าย?', TX, 1250 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.cream });
      say('คอมเมนต์บอกความเห็นของคุณได้เลย', TX, 1370 * u, t - 3.0, { size: 46 * u, weight: 800, color: C.red });
      finish();
    } },
];
