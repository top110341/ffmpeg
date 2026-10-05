// Dancing plague of 1518 — Act 2: 0:45–3:00 (bars 18–72).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake } from './kit.js';
import { dancer, street } from './a1.js';

export default () => [
  { from: bar(18), to: bar(22), cues: Array.from({ length: 12 }, (_, i) => [0.2 + i * 0.3, 'pop', 0.3]).concat([[7.5, 'thump', 0.6]]),
    draw(t) {
      paper();
      const n = Math.round(400 * clamp(spring(t - 0.2, 30, 11) * 1.004));
      for (let i = 0; i < Math.min(n, 400); i++) { const c = i % 20, r = Math.floor(i / 20); g.fillStyle = C.inkSoft; g.beginPath(); g.arc(150 * u + c * 40 * u, 520 * u + r * 40 * u, 12 * u, 0, 7); g.fill(); }
      text(g, `${n}`, TX, 1430 * u, { size: 150 * u, weight: 400, family: SERIF, color: C.red });
      kicker('ปลายเดือนสิงหาคม', TX, 330 * u, t);
      say('บันทึกบางฉบับระบุว่ามีผู้ป่วยถึงราว 400 คน', TX, 1540 * u, t - 3.0, { size: 40 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(22), to: bar(26), cues: [[0.2, 'thump', 0.6], [2.5, 'thump', 0.6], [5.0, 'impact', 0.9]],
    draw(t) {
      paper();
      kicker('สภาเมืองเรียกแพทย์มาวินิจฉัย', TX, 330 * u, t);
      say('แพทย์บอกว่า เป็นเพราะ “เลือดร้อน”', TX, 520 * u, t - 0.2, { size: 50 * u, weight: 800 });
      say('วิธีรักษาคือ…', TX, 720 * u, t - 2.5, { size: 60 * u, weight: 800 });
      say('ให้เต้นต่อไป\nจนกว่าจะหายเอง', TX, 950 * u, t - 5.0, { size: 84 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(26), to: bar(30), cues: Array.from({ length: 16 }, (_, i) => [i * 0.625, i % 2 ? 'tick' : 'thump', 0.4]),
    draw(t) {
      street(t, { dark: 0 });
      // a stage with pipers and drummers
      g.fillStyle = '#6B5136'; g.fillRect(150 * u, 1150 * u, 780 * u, 40 * u);
      for (let i = 0; i < 3; i++) person(260 * u + i * 260 * u, 1150 * u, 70 * u, '#3A2A1A');
      for (let i = 0; i < 14; i++) dancer(80 * u + (i % 7) * 140 * u, 1420 * u + Math.floor(i / 7) * 160 * u, 120 * u, t, { phase: i, color: '#2A2016', dress: i % 2 === 0 });
      g.fillStyle = 'rgba(239,230,210,0.9)'; g.fillRect(0, 200 * u, W, 330 * u);
      kicker('ทางการ “ช่วย” อย่างไร', TX, 290 * u, t, { color: C.red });
      say('สร้างเวทีกลางตลาด จ้างนักดนตรีมาเล่น\nจ้างคนมาช่วยพยุงคนเต้น', TX, 400 * u, t - 0.2, { size: 44 * u, weight: 800, color: C.ink });
      finish(0.5);
    } },
  { from: bar(30), to: bar(34), cues: [[0.2, 'riser', 0.5], [3.75, 'impact', 1.0], [6.25, 'thump', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 3.75, 16); g.translate(sx, sy);
      street(t, { dark: 1 });
      for (let i = 0; i < 9; i++) dancer(100 * u + i * 110 * u, 1450 * u, 130 * u, t, { phase: i, color: '#0A0807', e: clamp((t - 1) / 3) });
      g.fillStyle = 'rgba(10,8,7,0.8)'; g.fillRect(0, 200 * u, W, 330 * u);
      say('ผลคือ ยิ่งมีคนเต้นมากขึ้น', TX, 330 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      say('บางคนล้มลงด้วยอาการ\nหัวใจวาย อ่อนเพลียสุดขีด', TX, 1640 * u - 120 * u, t - 3.75, { size: 44 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(34), to: bar(38), cues: [[0.2, 'thump', 0.6], [2.5, 'type', 0.5], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      kicker('จำนวนผู้เสียชีวิต', TX, 330 * u, t);
      big('?', TX, 760 * u, t - 0.2, { size: 380 * u, color: C.red });
      say('บันทึกยุคหลังอ้างว่าเสียชีวิตวันละ 15 คน', TX, 1000 * u, t - 2.5, { size: 44 * u, weight: 800 });
      say('แต่เอกสารในเวลานั้น\nไม่ได้ยืนยันตัวเลขนี้', TX, 1150 * u, t - 5.0, { size: 50 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(38), to: bar(42), cues: [[0.2, 'thump', 0.6], [2.5, 'chime', 0.5], [5.0, 'pop', 0.6]],
    draw(t) {
      paper();
      // red shoes and a cross
      g.save(); g.translate(TX, 760 * u); const s = clamp(spring(t - 2.5, 'playful'));
      g.scale(s, s); g.fillStyle = C.red;
      for (const sd of [-1, 1]) { g.beginPath(); g.ellipse(sd * 110 * u, 0, 90 * u, 40 * u, sd * 0.2, 0, 7); g.fill(); g.fillRect(sd * 110 * u - 60 * u, -60 * u, 80 * u, 60 * u); }
      g.restore();
      g.fillStyle = C.inkSoft; g.fillRect(TX - 10 * u, 380 * u, 20 * u, 200 * u); g.fillRect(TX - 70 * u, 430 * u, 140 * u, 20 * u);
      kicker('สิงหาคม–กันยายน', TX, 330 * u - 20 * u, t);
      say('ทางการเปลี่ยนแผน\nห้ามดนตรีและการเต้นในที่สาธารณะ', TX, 1000 * u, t - 0.2, { size: 40 * u, weight: 800 });
      say('ส่งผู้ป่วยไปศาลเจ้านักบุญวิทุส\nพร้อมรองเท้าสีแดง เพื่อสวดขอพร', TX, 1150 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.red });
      say('ไม่นานหลังจากนั้น การเต้นก็ค่อย ๆ จางหายไป', TX, 1380 * u, t - 5.0, { size: 42 * u, weight: 800 });
      finish(0.6);
    } },
  // ---------------- theories
  { from: bar(42), to: bar(46), cues: [[0.2, 'pop', 0.4], [0.6, 'pop', 0.4], [1.0, 'pop', 0.4], [1.4, 'pop', 0.4]],
    draw(t) {
      paper();
      g.fillStyle = C.paper2; g.fillRect(60 * u, 470 * u, W - 120 * u, 900 * u);
      [['คำสาปนักบุญวิทุส', 280, 640], ['พิษจากเชื้อราในขนมปัง', 760, 720], ['ลัทธิทางศาสนา', 300, 1000], ['โรคจิตหมู่จากความเครียด', 760, 1100]].forEach(([s, x, y], i) => {
        const p = spring(t - 0.2 - i * 0.4, 'playful'); if (p <= 0) return;
        g.save(); g.translate(x * u, y * u); g.rotate((hash(i, 7) - 0.5) * 0.12); g.scale(p, p);
        g.fillStyle = i === 3 ? C.red : '#F7F1E3'; g.fillRect(-220 * u, -70 * u, 440 * u, 140 * u);
        text(g, s, 0, 14 * u, { size: 34 * u, weight: 800, family: THAI, color: i === 3 ? C.paper : C.ink }); g.restore(); });
      say('ทฤษฎีที่ถูกเสนอ', TX, 330 * u, t - 0.1, { size: 60 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(46), to: bar(50), cues: [[0.2, 'thump', 0.6], [2.5, 'impact', 0.8], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      // wheat stalk with dark ergot kernels
      g.strokeStyle = '#B79B5A'; g.lineWidth = 8 * u; g.beginPath(); g.moveTo(TX, 1100 * u); g.lineTo(TX, 560 * u); g.stroke();
      for (let k = 0; k < 9; k++) { const y = 580 * u + k * 40 * u; for (const sd of [-1, 1]) { g.fillStyle = k % 3 === 1 ? '#2A1D2E' : '#D8BE7A'; g.beginPath(); g.ellipse(TX + sd * 26 * u, y, 18 * u, 30 * u, sd * 0.4, 0, 7); g.fill(); } }
      kicker('ทฤษฎีเชื้อราเออร์กอต', TX, 330 * u, t);
      say('เชื้อราในข้าวไรย์ทำให้เกิดภาพหลอน', TX, 1250 * u, t - 0.2, { size: 46 * u, weight: 800 });
      stamp('UNLIKELY', TX, 860 * u, t - 2.5, { size: 120 * u, rot: -0.1 });
      say('แต่พิษนี้ทำให้เลือดไปเลี้ยงแขนขาไม่พอ\nเต้นต่อเนื่องหลายวันแทบเป็นไปไม่ได้', TX, 1400 * u, t - 5.0, { size: 42 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(50), to: bar(55), cues: [[0.2, 'thump', 0.6], [2.5, 'thump', 0.6], [6.25, 'thump', 0.6]],
    draw(t) {
      paper();
      kicker('คำอธิบายที่นักประวัติศาสตร์ยอมรับมากที่สุด', TX, 300 * u, t);
      big('ความเครียดหมู่', TX, 560 * u, t - 0.2, { size: 120 * u, color: C.red });
      [['อดอยาก โรคระบาด ความยากจน', 2.5], ['ความเชื่อว่านักบุญลงโทษด้วยการเต้น', 4.0], ['เมื่อคนหนึ่งเริ่ม คนอื่นก็ “ติด” ตามกันไป', 6.25]].forEach(([s, at], i) => {
        const p = spring(t - at, 'snappy'); if (p <= 0) return;
        g.save(); g.translate((1 - p) * W, 0);
        g.fillStyle = C.paper2; rrect(g, 90 * u, 720 * u + i * 200 * u, W - 220 * u, 150 * u, 12 * u); g.fill();
        text(g, s, TX, 810 * u + i * 200 * u, { size: 40 * u, weight: 800, family: THAI, color: C.ink }); g.restore(); });
      say('นักประวัติศาสตร์ John Waller\nเรียกว่า “โรคจิตหมู่จากความเครียด”', TX, 1400 * u, t - 9.0, { size: 42 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(55), to: bar(59), cues: [[0.2, 'whoosh', 0.5], [2.5, 'pop', 0.6], [5.0, 'pop', 0.6]],
    draw(t) {
      paper();
      kicker('ไม่ใช่ครั้งเดียว', TX, 330 * u, t);
      say('มีบันทึก “โรคคลั่งการเต้น” ในยุโรป\nหลายครั้งตั้งแต่ยุคกลาง', TX, 480 * u, t - 0.2, { size: 46 * u, weight: 800 });
      const ys = [['1374', 'แม่น้ำไรน์'], ['1518', 'สตราสบูร์ก']];
      ys.forEach(([y, p], i) => { const s = spring(t - 2.5 - i * 1.25, 'snappy'); if (s <= 0) return;
        g.save(); g.translate(TX + (i - 0.5) * 420 * u, 950 * u); g.scale(s, s);
        g.fillStyle = i === 1 ? C.red : C.ink; rrect(g, -180 * u, -140 * u, 360 * u, 280 * u, 16 * u); g.fill();
        text(g, y, 0, 10 * u, { size: 110 * u, weight: 400, family: SERIF, color: C.paper }); text(g, p, 0, 90 * u, { size: 34 * u, weight: 700, family: THAI, color: C.paper }); g.restore(); });
      say('แต่ครั้งปี 1518 มีเอกสารบันทึกชัดเจนที่สุด', TX, 1300 * u, t - 6.0, { size: 44 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(59), to: bar(64), cues: [[0.2, 'thump', 0.6], [3.75, 'thump', 0.6], [7.5, 'chime', 0.5]],
    draw(t) {
      paper();
      kicker('บทเรียนจากปี 1518', TX, 330 * u, t);
      say('ความกลัวและความเครียดของคนหมู่มาก', TX, 600 * u, t - 0.2, { size: 50 * u, weight: 800 });
      say('ส่งผลต่อร่างกายได้จริง', TX, 760 * u, t - 2.0, { size: 64 * u, weight: 800, color: C.red });
      say('และยังเกิดขึ้นในรูปแบบอื่นจนถึงทุกวันนี้', TX, 1000 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(64), to: bar(68), cues: [[0, 'thump', 0.9], [5.0, 'swish', 0.4]],
    draw(t) {
      night('#08070A');
      big('1518', TX, 860 * u, t, { size: 300 * u, color: C.cream });
      const p = spring(t - 0.7, 'default');
      g.fillStyle = C.red; g.fillRect(TX - 330 * u * p, 940 * u, 660 * u * p, 10 * u);
      say('โรคระบาดการเต้นรำ', TX, 1100 * u, t - 1.0, { size: 64 * u, weight: 800, color: C.red });
      for (let i = 0; i < 5; i++) dancer(220 * u + i * 160 * u, 1500 * u, 110 * u, t, { phase: i, color: C.fog });
      finish();
    } },
  { from: bar(68), to: bar(72), cues: Array.from({ length: 8 }, (_, i) => [i * 0.625, 'thump', 0.35]).concat([[5.0, 'chime', 0.8]]),
    draw(t) {
      street(t);
      for (let i = 0; i < 7; i++) dancer(160 * u + i * 125 * u, 1400 * u + (i % 2) * 60 * u, 150 * u, t, { phase: i * 0.7, color: '#2A2016', dress: i % 2 === 0 });
      g.fillStyle = 'rgba(239,230,210,0.88)'; g.fillRect(0, 200 * u, W, 300 * u);
      say('คุณคิดว่าเกิดอะไรขึ้นกับชาวเมือง?', TX, 330 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.ink });
      say('คอมเมนต์บอกได้เลย', TX, 440 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.red });
      finish(0.5);
    } },
];
