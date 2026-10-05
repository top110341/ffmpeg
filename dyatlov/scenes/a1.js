// Act 1 — the tent, the group, the night (0:00–1:20, bars 0–32).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, rrect, text, typewriter, shake } from './kit.js';
import { snowfall, slope, tent, prints, cedar, forestLine, hiker, SNOW, SNOW2, SKY } from './props.js';

export default () => [
  // ---------------- Chapter 1 — cut from the inside
  { from: bar(0), to: bar(2), cues: [[0, 'whoosh', 0.6], [1.0, 'swish', 0.8], [1.3, 'swish', 0.8], [1.6, 'impact', 1.0]],
    draw(t) {
      night(SKY);
      slope(700 * u, 1100 * u);
      tent(TX, 1000 * u, 380 * u, { cut: remap(t, 1.0, 1.7) });
      snowfall(t, { n: 200, wind: 1.2 });
      say('เต็นท์ถูกกรีดขาด', TX, 330 * u, t - 0.2, { size: 70 * u, weight: 800, color: C.cream });
      say('จากด้านใน', TX, 1340 * u, t - 1.6, { size: 110 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(2), to: bar(4), cues: [[0, 'whoosh', 0.5], [2.5, 'thump', 0.6]],
    draw(t) {
      night(SKY);
      slope(300 * u, 500 * u);
      prints(TX + 200 * u, 520 * u, TX - 150 * u, 1600 * u, remap(t, 0.1, 3.5));
      snowfall(t + 3, { n: 200, wind: 1.2 });
      const y = say('นักเดินเขา 9 คน\nหนีออกไปกลางพายุหิมะ', TX, 1180 * u, t - 0.2, { size: 60 * u, weight: 800, color: C.ink });
      say('อุณหภูมิราว -25°C · ส่วนใหญ่ไม่ได้ใส่รองเท้า', TX, y + 20 * u, t - 2.5, { size: 42 * u, weight: 800, color: C.red });
      finish(0.7);
    } },
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1], [3.2, 'type', 0.4]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 360 * u, 90 * u, 14 * u); g.fill();
      text(g, 'ДЕЛО · 1959', 250 * u, 472 * u, { size: 36 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 4 * u });
      g.restore();
      say('ไม่มีใครรอดกลับมาเล่า', TX, 760 * u, t - 0.25, { size: 66 * u, weight: 800 });
      stamp('SECRET', TX, 1080 * u, t - 2.5, { size: 160 * u, rot: -0.12 });
      say('สหภาพโซเวียตเก็บเอกสาร\nเป็นความลับนานหลายสิบปี', TX, 1380 * u, t - 3.2, { size: 42 * u, weight: 700, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------- Chapter 2 — the group
  { from: bar(6), to: bar(7), cues: Array.from({ length: 5 }, (_, i) => [i * 0.18, 'tick', 0.6]).concat([[1.0, 'thump', 0.6]]),
    draw(t) {
      paper();
      kicker('มกราคม 1959', TX, 420 * u, t);
      const d = ['19', '20', '21', '22', '23'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.18), t, { size: 360 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('เมืองสเวียร์ดลอฟสค์ สหภาพโซเวียต', TX, 1240 * u, t - 1.0, { size: 50 * u, weight: 700 });
      finish(0.6);
    } },
  { from: bar(7), to: bar(9), cues: Array.from({ length: 10 }, (_, i) => [0.2 + i * 0.12, 'pop', 0.35]),
    draw(t) {
      paper();
      for (let i = 0; i < 10; i++) { const s = spring(t - 0.2 - i * 0.12, 'playful'); if (s <= 0) continue;
        const c = i % 5, r = Math.floor(i / 5); person(TX - 360 * u + c * 180 * u, 860 * u + r * 300 * u, 70 * u * s, i === 9 ? C.red : C.inkSoft); }
      say('นักศึกษาและศิษย์เก่า\nสถาบันโพลีเทคนิคอูราล 10 คน', TX, 330 * u, t - 0.1, { size: 52 * u, weight: 800 });
      say('นำโดย Igor Dyatlov วัย 23', TX, 1420 * u, t - 2.0, { size: 54 * u, weight: 800, color: C.ink });
      say('ทุกคนเป็นนักเดินเขามากประสบการณ์', TX, 1520 * u, t - 3.0, { size: 44 * u, weight: 700, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(9), to: bar(11), cues: [[0.2, 'whoosh', 0.5], [1.4, 'pop', 0.7]],
    draw(t) {
      night(SKY);
      slope(900 * u, 1000 * u, { color: SNOW });
      for (let i = 0; i < 9; i++) hiker(160 * u + i * 90 * u + t * 40 * u, 1010 * u + i * 3 * u, 90 * u, '#1A2230', t * 6 + i);
      snowfall(t, { n: 120, wind: 0.6 });
      kicker('เป้าหมาย: ภูเขา Otorten', TX, 330 * u, t, { color: C.red });
      say('เส้นทางสกีระดับยากที่สุด', TX, 440 * u, t - 0.3, { size: 56 * u, weight: 800, color: C.cream });
      say('เดินสกีหลายร้อยกิโลเมตร กลางฤดูหนาว', TX, 1300 * u, t - 1.4, { size: 50 * u, weight: 800, color: C.ink });
      finish(0.8);
    } },
  { from: bar(11), to: bar(14), cues: [[0.2, 'thump', 0.6], [2.5, 'chime', 0.5]],
    draw(t) {
      night(SKY);
      slope(900 * u, 1000 * u, { color: SNOW });
      for (let i = 0; i < 9; i++) hiker(160 * u + i * 80 * u + t * 30 * u, 1010 * u, 90 * u, '#1A2230', t * 6 + i);
      const back = spring(t - 0.6, 'default');
      hiker(900 * u - back * 260 * u, 1010 * u, 90 * u, C.red, -t * 6);
      kicker('28 มกราคม', TX, 330 * u, t, { color: C.red });
      say('Yuri Yudin ป่วย ต้องเดินทางกลับ', TX, 440 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      say('เขาคือคนเดียว\nที่รอดชีวิตจากทริปนี้', TX, 1300 * u, t - 2.5, { size: 60 * u, weight: 800, color: C.red });
      snowfall(t, { n: 120, wind: 0.6 });
      finish(0.8);
    } },
  // ---------------- Chapter 3 — Dead Mountain
  { from: bar(14), to: bar(16), cues: [[0.2, 'whoosh', 0.5], [1.25, 'thump', 0.7]],
    draw(t) {
      night(SKY);
      g.fillStyle = SNOW2; g.beginPath(); g.moveTo(-100 * u, 1500 * u); g.lineTo(TX - 40 * u, 520 * u + (1 - spring(t, 'heavy')) * 400 * u); g.lineTo(W + 100 * u, 1500 * u); g.fill();
      g.fillStyle = SNOW; g.beginPath(); g.moveTo(TX - 160 * u, 780 * u); g.lineTo(TX - 40 * u, 520 * u); g.lineTo(TX + 120 * u, 760 * u); g.fill();
      g.fillStyle = '#0B1422'; g.fillRect(0, 1500 * u, W, H - 1500 * u);
      snowfall(t, { n: 140, wind: 1 });
      kicker('1 กุมภาพันธ์ 1959', TX, 300 * u, t, { color: C.red });
      say('ตั้งแคมป์บนไหล่เขา Kholat Syakhl', TX, 410 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      say('ภาษาท้องถิ่นแปลว่า “ภูเขามรณะ”', TX, 1620 * u, t - 1.25, { size: 50 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(16), to: bar(19), cues: [[0.2, 'click', 0.8], [1.0, 'click', 0.8], [1.8, 'click', 0.8], [4.0, 'thump', 0.6]],
    draw(t) {
      paper();
      // three film photos dropping in, grainy
      for (let i = 0; i < 3; i++) { const at = 0.2 + i * 0.8, s = spring(t - at, 'default'); if (s <= 0) continue;
        g.save(); g.translate(TX + (i - 1) * 40 * u, 760 * u + i * 40 * u - (1 - s) * 900 * u); g.rotate((i - 1) * 0.1);
        g.fillStyle = '#F7F4EC'; g.fillRect(-260 * u, -200 * u, 520 * u, 400 * u);
        g.fillStyle = '#8C949C'; g.fillRect(-230 * u, -170 * u, 460 * u, 300 * u);
        g.fillStyle = '#C7CDD3'; g.beginPath(); g.moveTo(-230 * u, 40 * u); g.lineTo(230 * u, -40 * u); g.lineTo(230 * u, 130 * u); g.lineTo(-230 * u, 130 * u); g.fill();
        if (i === 2) tent(0, 40 * u, 90 * u, { color: '#5B5F63' }); else for (let k = 0; k < 3; k++) hiker(-80 * u + k * 70 * u, 60 * u, 40 * u, '#3A3F45', k);
        g.restore(); }
      kicker('ฟิล์มในกล้องของพวกเขา', TX, 300 * u, t);
      say('ภาพถ่ายชุดสุดท้าย ยังดูปกติดี', TX, 1300 * u, t - 2.5, { size: 54 * u, weight: 800 });
      say('ทำไมไม่ตั้งแคมป์ในป่า ที่อยู่ห่างไปแค่ 1.5 กม.?', TX, 1420 * u, t - 4.0, { size: 42 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- Chapter 4 — that night
  { from: bar(19), to: bar(22), cues: [[0.2, 'riser', 0.5], [2.5, 'impact', 1.0], [3.0, 'swish', 0.8], [3.3, 'swish', 0.8]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 26); g.translate(sx, sy);
      night('#060A12');
      // inside the tent: sloped canvas walls lit by a single lamp
      g.fillStyle = '#3A3427'; g.beginPath(); g.moveTo(0, 1400 * u); g.lineTo(TX, 500 * u); g.lineTo(W, 1400 * u); g.fill();
      for (let i = 0; i < 9; i++) { g.fillStyle = '#1D1A14'; g.beginPath(); g.ellipse(160 * u + i * 95 * u, 1320 * u, 46 * u, 26 * u, 0, 0, 7); g.fill(); }
      if (t > 3.0) { g.strokeStyle = '#C9D4DF'; g.lineWidth = 8 * u; for (let k = 0; k < 2; k++) { const p = clamp((t - 3.0 - k * 0.3) / 0.25); g.beginPath(); g.moveTo(TX + (k * 120 - 80) * u, 700 * u); g.lineTo(TX + (k * 120 - 60) * u, 700 * u + p * 500 * u); g.stroke(); } }
      kicker('คืนนั้น หลังเที่ยงคืน', TX, 300 * u, t, { color: C.red });
      say('มีบางอย่างทำให้ทั้ง 9 คนตื่นตระหนก', TX, 410 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      say('พวกเขากรีดผนังเต็นท์ แล้วออกไปทันที', TX, 1560 * u, t - 3.0, { size: 48 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(22), to: bar(25), cues: [[0.2, 'whoosh', 0.6]],
    draw(t) {
      night(SKY);
      slope(250 * u, 420 * u);
      tent(TX + 280 * u, 460 * u, 110 * u, { cut: 1, collapsed: 0.5 });
      forestLine(1480 * u, 1, '#0E1A16');
      prints(TX + 260 * u, 500 * u, TX - 140 * u, 1450 * u, remap(t, 0.2, 6.5), { lanes: 6 });
      snowfall(t + 9, { n: 180, wind: 1.3 });
      say('รอยเท้าเดินเป็นแถว ลงไปทางป่า', TX, 1580 * u, t - 0.6, { size: 46 * u, weight: 800, color: C.cream });
      say('บางคนใส่แค่ถุงเท้า บางคนเท้าเปล่า', TX, 330 * u, t - 3.0, { size: 46 * u, weight: 800, color: C.ink });
      finish();
    } },
  { from: bar(25), to: bar(28), cues: [[0.2, 'thump', 0.6], [2.5, 'thump', 0.6], [5.0, 'impact', 0.8]],
    draw(t) {
      paper();
      kicker('สิ่งที่ทิ้งไว้ในเต็นท์', TX, 300 * u, t);
      [['รองเท้าบูต', 0.2], ['เสื้อกันหนาว', 0.9], ['อาหาร', 1.6], ['ขวานและมีด', 2.3]].forEach(([s, at], i) => {
        const p = spring(t - at, 'snappy'); if (p <= 0) return;
        const y = 520 * u + i * 150 * u;
        text(g, s, 160 * u, y, { size: 58 * u, weight: 800, family: THAI, color: C.ink, align: 'left', alpha: clamp((t - at) / 0.12) });
        g.save(); g.translate(W - 240 * u, y - 20 * u); g.scale(p, p); g.strokeStyle = C.red; g.lineWidth = 12 * u; g.lineCap = 'round';
        g.beginPath(); g.moveTo(-30 * u, 0); g.lineTo(-8 * u, 24 * u); g.lineTo(34 * u, -26 * u); g.stroke(); g.restore(); });
      say('ทุกอย่างที่ใช้เอาชีวิตรอด\nถูกทิ้งไว้ทั้งหมด', TX, 1260 * u, t - 5.0, { size: 58 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(28), to: bar(32), cues: [[0.2, 'whoosh', 0.4], [5.0, 'thump', 0.6]],
    draw(t) {
      night('#04070D');
      snowfall(t, { n: 240, wind: 1.6, alpha: 0.9 });
      say('ลมแรง หิมะตก มืดสนิท', TX, 700 * u, t - 0.3, { size: 62 * u, weight: 800, color: C.cream });
      say('อะไรทำให้คน 9 คน\nยอมเสี่ยงตายกลางความหนาว?', TX, 1100 * u, t - 2.5, { size: 58 * u, weight: 800, color: C.red });
      finish();
    } },
];
