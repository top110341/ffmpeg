// Act 2 — the records (1:20–3:00, bars 32–72).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, rrect, text, typewriter, shake, para } from './kit.js';
import { pilot, cheque, bars, timeline, planeTop, NAVY, GOLD } from './props.js';

export default () => [
  // ---------------- Chapter 5 — the researcher
  { from: bar(32), to: bar(34), cues: [[0.1, 'thump', 0.6], [1.25, 'click', 0.7]],
    draw(t) {
      paper();
      const ys = ['1980', '2002', '2010', '2020'], dw = 170 * u, x0 = TX - 1.5 * (dw + 14 * u);
      for (let d = 0; d < 4; d++) flip(x0 + d * (dw + 14 * u), 760 * u, dw, 250 * u, ys.map((y) => y[d]), ys.map((_, i) => i * 0.2), t, { size: 190 * u });
      kicker('2020', TX, 500 * u, t);
      say('นักเขียน Alan C. Logan', TX, 1050 * u, t - 1.25, { size: 58 * u, weight: 800 });
      say('ไล่ตรวจเรื่องเล่าทีละเรื่อง กับเอกสารจริง', TX, 1160 * u, t - 2.5, { size: 46 * u, weight: 700, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(34), to: bar(37), cues: Array.from({ length: 10 }, (_, i) => [0.2 + i * 0.3, 'swish', 0.3]),
    draw(t) {
      paper();
      // archive drawers sliding out
      for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) { const i = r * 3 + c, at = 0.2 + i * 0.25, p = spring(t - at, 'snappy');
        const x = 130 * u + c * 280 * u, y = 520 * u + r * 200 * u;
        g.fillStyle = '#8D7B5A'; g.fillRect(x, y, 250 * u, 170 * u);
        g.fillStyle = '#A8956E'; g.fillRect(x + 10 * u, y + 10 * u + p * 20 * u, 230 * u, 150 * u);
        g.fillStyle = '#E8DFC6'; g.fillRect(x + 90 * u, y + 40 * u + p * 20 * u, 70 * u, 24 * u); }
      say('บันทึกเรือนจำ · ศาล · หนังสือพิมพ์เก่า', TX, 330 * u, t - 0.1, { size: 48 * u, weight: 800 });
      say('สิ่งที่เขาพบ ทำให้เรื่องทั้งหมดพังลง', TX, 1440 * u, t - 3.75, { size: 50 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- Chapter 6 — Great Meadow
  { from: bar(37), to: bar(40), cues: [[0.2, 'type', 0.6], [1.0, 'type', 0.6], [2.5, 'impact', 1.0], [5.0, 'thump', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 20); g.translate(sx, sy);
      paper();
      g.save(); g.translate(TX, 780 * u); g.rotate(-0.02);
      g.fillStyle = '#F7F1E3'; rrect(g, -400 * u, -300 * u, 800 * u, 600 * u, 6 * u); g.fill();
      text(g, 'GREAT MEADOW CORRECTIONAL FACILITY', 0, -220 * u, { size: 30 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 2 * u });
      typewriter('INMATE  #25367', -330 * u, -100 * u, t - 0.2, { size: 56 * u, weight: 700, family: 'Inter, sans-serif', color: C.ink, cps: 14 });
      typewriter('IN:   JULY 26, 1965', -330 * u, 20 * u, t - 1.0, { size: 48 * u, weight: 700, family: 'Inter, sans-serif', color: C.ink, cps: 16 });
      typewriter('OUT:  DEC 24, 1968', -330 * u, 110 * u, t - 1.8, { size: 48 * u, weight: 700, family: 'Inter, sans-serif', color: C.red, cps: 16 });
      g.restore();
      kicker('เรือนจำรัฐนิวยอร์ก', TX, 330 * u, t);
      say('อายุ 17–20 ปี เขาอยู่ในคุกนี้', TX, 1270 * u, t - 2.5, { size: 54 * u, weight: 800 });
      say('(ถูกปล่อยช่วงสั้น ๆ แล้วถูกส่งกลับเพราะผิดเงื่อนไข)', TX, 1380 * u, t - 5.0, { size: 38 * u, weight: 600, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(40), to: bar(44), cues: [[0.2, 'swish', 0.5], [1.25, 'pop', 0.6], [3.75, 'impact', 1.0], [6.25, 'thump', 0.6]],
    draw(t) {
      paper();
      kicker('เทียบไทม์ไลน์', TX, 300 * u, t);
      timeline(110 * u, 1000 * u, W - 220 * u, 1964, 1970, [
        [1964, 1969, C.inkSoft, 'สิ่งที่เขาเล่า: นักบิน หมอ ทนาย', 1, 1.25],
        [1965.56, 1968.98, C.red, 'บันทึกจริง: อยู่ในเรือนจำ', 0, 3.75],
      ], t);
      say('ช่วงเวลาที่เขาบอกว่ากำลังบินรอบโลก', TX, 1260 * u, t - 3.75, { size: 48 * u, weight: 800 });
      say('ตรงกับช่วงที่เขาติดคุกเกือบทั้งหมด', TX, 1370 * u, t - 6.25, { size: 52 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- Chapter 7 — what did happen
  { from: bar(44), to: bar(47), cues: [[0.2, 'whoosh', 0.5], [2.5, 'thump', 0.6], [5.0, 'pop', 0.6]],
    draw(t) {
      night('#0E1424');
      // a suburban house at night and a man in a pilot's uniform at the door
      g.fillStyle = '#1F2A40'; g.fillRect(TX - 320 * u, 760 * u, 640 * u, 480 * u);
      g.beginPath(); g.moveTo(TX - 380 * u, 770 * u); g.lineTo(TX, 520 * u); g.lineTo(TX + 380 * u, 770 * u); g.fill();
      g.fillStyle = '#E9C66B'; g.fillRect(TX - 240 * u, 860 * u, 140 * u, 110 * u); g.fillRect(TX + 100 * u, 860 * u, 140 * u, 110 * u);
      g.fillStyle = '#0B101C'; g.fillRect(TX - 60 * u, 1040 * u, 120 * u, 200 * u);
      g.fillStyle = '#0A0F1A'; g.fillRect(0, 1240 * u, W, H - 1240 * u);
      pilot(TX - 200 * u + (1 - spring(t - 0.3, 'default')) * -500 * u, 1240 * u, 120 * u, '#05080F');
      kicker('1969 · Baton Rouge, รัฐลุยเซียนา', TX, 300 * u, t, { color: C.red });
      say('แต่งชุดนักบิน TWA', TX, 410 * u, t - 0.2, { size: 56 * u, weight: 800, color: C.cream });
      say('ขอพักบ้านครอบครัวของแอร์โฮสเตสที่เพิ่งรู้จัก', TX, 1380 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.cream });
      say('แล้วขโมยเช็คเปล่าของพวกเขาไป', TX, 1490 * u, t - 5.0, { size: 48 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(47), to: bar(50), cues: [[0.2, 'thump', 0.6], [2.5, 'impact', 0.9], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      kicker('สิ่งที่ยืนยันได้จากเอกสาร', TX, 300 * u, t);
      [['14 ก.พ. 1969', 'ถูกจับที่ Baton Rouge · ข้อหาปลอมเช็ค'], ['ก.ย. 1969', 'ถูกจับที่ฝรั่งเศส จำคุกราว 3 เดือน'], ['หลังจากนั้น', 'ติดคุกในสหรัฐฯ อีกหลายปี']].forEach(([d, s], i) => {
        const at = 0.2 + i * 2.3, p = spring(t - at, 'snappy'); if (p <= 0) return;
        const y = 560 * u + i * 250 * u;
        g.save(); g.translate((1 - p) * -W, 0);
        text(g, d, 120 * u, y, { size: 48 * u, weight: 400, family: SERIF, color: C.red, align: 'left' });
        text(g, s, 120 * u, y + 70 * u, { size: 40 * u, weight: 800, family: THAI, color: C.ink, align: 'left' });
        g.restore(); });
      say('เป็นนักต้มตุ๋นตัวจริง\nแต่ตัวเล็กกว่าที่เล่ามาก', TX, 1350 * u, t - 6.25, { size: 54 * u, weight: 800 });
      finish(0.6);
    } },
  // ---------------- Chapter 8 — claimed vs records
  { from: bar(50), to: bar(54), cues: Array.from({ length: 4 }, (_, i) => [0.3 + i * 1.6, 'click', 0.8]),
    draw(t) {
      paper();
      g.fillStyle = C.ink; g.fillRect(TX - 2 * u, 440 * u, 4 * u, 1060 * u);
      text(g, 'ที่เขาเล่า', TX - 250 * u, 420 * u, { size: 44 * u, weight: 800, family: THAI, color: C.inkSoft });
      text(g, 'บันทึกจริง', TX + 250 * u, 420 * u, { size: 44 * u, weight: 800, family: THAI, color: C.red });
      [['นักบิน Pan Am หลายปี', 'ไม่พบหลักฐานยืนยัน'], ['หมอ · ทนาย · อาจารย์', 'ไม่พบหลักฐานยืนยัน'], ['เช็คปลอม $2.5 ล้าน', 'คดีที่ยืนยันได้มีมูลค่าน้อยกว่ามาก'], ['ทำทั้งหมดตอนอายุ 16–21', 'ส่วนใหญ่อยู่ในเรือนจำ']].forEach(([a, b], i) => {
        const at = 0.3 + i * 1.6, p = spring(t - at, 'snappy'); if (p <= 0) return;
        const y = 600 * u + i * 220 * u;
        g.save(); g.globalAlpha = clamp((t - at) / 0.15);
        g.fillStyle = C.paper2; rrect(g, 60 * u, y - 70 * u, TX - 90 * u, 150 * u, 10 * u); g.fill();
        g.fillStyle = '#F7E3DF'; rrect(g, TX + 30 * u, y - 70 * u, TX - 90 * u, 150 * u, 10 * u); g.fill();
        g.restore();
        g.save(); g.beginPath(); g.rect(60 * u, y - 70 * u, W - 120 * u, 150 * u); g.clip();
        para2(a, TX - 250 * u, y, C.ink, clamp((t - at) / 0.15));
        para2(b, TX + 250 * u, y, C.red, clamp((t - at - 0.4) / 0.15));
        g.restore(); });
      finish(0.6);
    } },
  { from: bar(54), to: bar(58), cues: [[0.2, 'whoosh', 0.5], [2.5, 'impact', 1.0], [6.25, 'thump', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 20); g.translate(sx, sy);
      night('#08070A');
      say('การหลอกลวงที่ยิ่งใหญ่ที่สุดของเขา', TX, 700 * u, t - 0.3, { size: 58 * u, weight: 800, color: C.cream });
      say('อาจเป็นเรื่องราวชีวิตของตัวเอง', TX, 860 * u, t - 2.5, { size: 64 * u, weight: 800, color: C.red });
      say('และคนทั้งโลกเชื่อมานานกว่า 40 ปี', TX, 1150 * u, t - 6.25, { size: 50 * u, weight: 700, color: C.fog });
      finish();
    } },
  // ---------------- Chapter 8b — why it worked
  { from: bar(58), to: bar(62), cues: [[0.2, 'pop', 0.5], [2.5, 'pop', 0.5], [5.0, 'pop', 0.5], [7.5, 'thump', 0.6]],
    draw(t) {
      paper();
      kicker('ทำไมเรื่องนี้ถึงหลอกคนได้นานขนาดนั้น?', TX, 300 * u, t);
      [['เรื่องสนุกเกินกว่าจะไม่เชื่อ', 0.2], ['สื่อทำซ้ำต่อกันโดยไม่ตรวจสอบ', 2.5], ['เขาเล่าด้วยความมั่นใจทุกครั้ง', 5.0]].forEach(([s, at], i) => {
        const p = spring(t - at, 'snappy'); if (p <= 0) return;
        const y = 600 * u + i * 220 * u;
        g.save(); g.translate((1 - p) * W, 0);
        text(g, String(i + 1), 150 * u, y + 20 * u, { size: 110 * u, weight: 400, family: SERIF, color: C.red });
        text(g, s, 240 * u, y, { size: 46 * u, weight: 800, family: THAI, color: C.ink, align: 'left' });
        g.restore(); });
      say('นี่คือสูตรเดียวกับที่นักต้มตุ๋นใช้', TX, 1420 * u, t - 7.5, { size: 50 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- Chapter 9 — catch me
  { from: bar(62), to: bar(66), cues: [[0.2, 'thump', 0.6], [2.5, 'thump', 0.6], [5.0, 'thump', 0.6], [7.5, 'chime', 0.5]],
    draw(t) {
      paper();
      kicker('บทเรียนจากเรื่องนี้', TX, 300 * u, t);
      [['เรื่องยิ่งน่าเหลือเชื่อ', 0.2], ['ยิ่งต้องตรวจสอบ', 2.5], ['ก่อนจะเชื่อ หรือแชร์ต่อ', 5.0]].forEach(([s, at], i) => {
        if (t < at) return; say(s, TX, 640 * u + i * 200 * u, t - at, { size: i === 1 ? 80 * u : 60 * u, weight: 800, color: i === 1 ? C.red : C.ink }); });
      finish(0.6);
    } },
  { from: bar(66), to: bar(70), cues: [[0, 'thump', 0.9], [5.0, 'swish', 0.4]],
    draw(t) {
      night(NAVY);
      pilot(TX, 1100 * u, 260 * u, '#050A18');
      big('CATCH ME', TX, 1330 * u, t - 0.3, { size: 160 * u, color: C.cream });
      big('IF YOU CAN', TX, 1480 * u, t - 0.6, { size: 110 * u, color: C.red });
      say('เรื่องจริง… หรือเรื่องแต่ง?', TX, 330 * u, t - 2.5, { size: 60 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(70), to: bar(72), cues: [[0, 'whoosh', 0.5], [2.5, 'chime', 0.8]],
    draw(t) {
      night(NAVY);
      for (let i = 0; i < 6; i++) cheque(TX + (hash(i, 2) - 0.5) * 500 * u, 560 * u + i * 60 * u, 520 * u, (hash(i, 3) - 0.5) * 0.6);
      say('คุณเคยเชื่อเรื่องนี้ไหม?', TX, 1300 * u, t - 0.3, { size: 62 * u, weight: 800, color: C.cream });
      say('คอมเมนต์บอกได้เลย', TX, 1420 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
];

function para2(s, x, y, color, alpha) {
  para(s, x, y - 6 * u, { size: 34 * u, weight: 800, color, alpha, maxW: 420 * u, lh: 1.35 });
}
