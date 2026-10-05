// Act 3 — the 340 cracked, what it said, what is left (2:05–3:00, bars 50–72).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, rrect, text, typewriter, shake } from './kit.js';
import { cipherGrid, crosshair, glyph } from './props.js';

export default () => [
  // ---------------- Chapter 7 — cracked
  { from: bar(50), to: bar(51), cues: Array.from({ length: 6 }, (_, i) => [i * 0.12, 'tick', 0.5]).concat([[1.1, 'chime', 0.5]]),
    draw(t) {
      night();
      const ys = ['1969', '1980', '1990', '2000', '2010', '2020'], dw = 170 * u, x0 = TX - 1.5 * (dw + 14 * u);
      for (let d = 0; d < 4; d++) flip(x0 + d * (dw + 14 * u), 820 * u, dw, 250 * u, ys.map((y) => y[d]), ys.map((_, i) => i * 0.12), t, { size: 190 * u, bg: C.night2, fg: C.cream });
      kicker('51 ปีต่อมา', TX, 560 * u, t, { color: C.red });
      say('ธันวาคม 2020', TX, 1100 * u, t - 0.9, { size: 64 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(51), to: bar(53), cues: [[0.2, 'pop', 0.6], [0.7, 'pop', 0.6], [1.2, 'pop', 0.6], [2.5, 'swish', 0.5]],
    draw(t) {
      night(C.night2);
      say('นักถอดรหัสสมัครเล่น 3 คน จาก 3 ประเทศ', TX, 330 * u, t - 0.1, { size: 48 * u, weight: 800, color: C.cream });
      [['David Oranchak', 'สหรัฐอเมริกา'], ['Sam Blake', 'ออสเตรเลีย'], ['Jarl Van Eycke', 'เบลเยียม']].forEach(([n, c], i) => {
        const s = spring(t - 0.2 - i * 0.5, 'default'); if (s <= 0) return;
        const y = 560 * u + i * 280 * u;
        g.save(); g.translate((1 - s) * W, 0);
        g.fillStyle = C.night3; rrect(g, 110 * u, y, W - 260 * u, 220 * u, 14 * u); g.fill();
        g.save(); g.beginPath(); g.rect(130 * u, y + 20 * u, 160 * u, 180 * u); g.clip(); g.fillStyle = C.night; g.fillRect(130 * u, y + 20 * u, 160 * u, 180 * u); person(210 * u, y + 190 * u, 70 * u, C.fog); g.restore();
        text(g, n, 330 * u, y + 105 * u, { size: 56 * u, weight: 400, family: SERIF, color: C.cream, align: 'left' });
        text(g, c, 330 * u, y + 165 * u, { size: 36 * u, weight: 600, family: THAI, color: C.fog, align: 'left' });
        g.restore();
      });
      say('ใช้ซอฟต์แวร์ทดลอง\nรูปแบบการสลับนับแสนแบบ', TX, 1440 * u, t - 2.5, { size: 46 * u, weight: 700, color: C.red });
      finish(0.8);
    } },
  { from: bar(53), to: bar(55) + 2 * BEAT, cues: Array.from({ length: 14 }, (_, i) => [0.3 + i * 0.28, 'type', 0.35]),
    draw(t) {
      paper();
      const cell = 56 * u, cols = 16, rows = 14, x0 = TX - (cols * cell) / 2, y0 = 520 * u;
      // reading path: the 340 was transposed diagonally — follow a diagonal walk through the grid
      const walk = [];
      for (let k = 0; k < cols * rows; k++) { const r = k % rows, c = (Math.floor(k / rows) + r * 2) % cols; walk.push(r * cols + c); }
      const p = remap(t, 0.3, 4.5), lit = Math.floor(walk.length * p);
      const on = new Set(walk.slice(0, lit));
      for (let i = 0; i < cols * rows; i++) {
        const c = i % cols, r = Math.floor(i / cols), x = x0 + c * cell + cell / 2, y = y0 + r * cell + cell / 2;
        if (on.has(i)) { g.fillStyle = 'rgba(200,50,30,0.12)'; g.fillRect(x - cell / 2, y - cell / 2, cell, cell);
          text(g, 'ETAOINSHRDLUCMFWYP'[Math.floor(hash(i, 77) * 18)], x, y + cell * 0.25, { size: cell * 0.7, weight: 700, family: 'Inter, sans-serif', color: C.red }); }
        else glyph(Math.floor(hash(i, 340) * 400), x, y, cell * 0.66, C.inkSoft);
      }
      kicker('กุญแจสำคัญ', TX, 300 * u, t);
      say('ตัวอักษรถูกสลับตำแหน่งแบบแนวทแยง', TX, 410 * u, t - 0.2, { size: 50 * u, weight: 800 });
      text(g, '* ภาพจำลองการอ่าน ไม่ใช่สัญลักษณ์จริง', TX, 1400 * u, { size: 30 * u, weight: 500, family: THAI, color: C.inkSoft, alpha: 0.8 });
      finish(0.6);
    } },
  { from: bar(55) + 2 * BEAT, to: bar(58), cues: [[0.1, 'thump', 0.6], [1.25, 'impact', 1.1]],
    draw(t) {
      const [sx, sy] = shake(t, 1.25, 22); g.translate(sx, sy);
      paper();
      cipherGrid(70 * u, 420 * u, 13, 14, 72 * u, 1, { seed: 340, color: C.paper3 });
      say('FBI ตรวจสอบแล้ว ยืนยันว่าถูกต้อง', TX, 330 * u, t - 0.1, { size: 54 * u, weight: 800 });
      stamp('SOLVED', TX, 960 * u, t - 1.25, { size: 190 * u, rot: -0.1 });
      say('รหัส 340 ถูกถอดได้สำเร็จ', TX, 1350 * u, t - 2.0, { size: 56 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- Chapter 8 — what it said
  { from: bar(58), to: bar(61), cues: [[0.3, 'type', 0.5], [1.4, 'type', 0.5], [2.5, 'type', 0.5], [4.0, 'thump', 0.5]],
    draw(t) {
      night('#08070A');
      kicker('ข้อความในรหัส 340', TX, 330 * u, t, { color: C.red });
      const f = { size: 58 * u, weight: 700, family: 'Inter, sans-serif', color: C.cream, cps: 20, align: 'left' };
      typewriter('I HOPE YOU ARE', 140 * u, 560 * u, t - 0.3, f);
      typewriter('HAVING LOTS OF FUN', 140 * u, 650 * u, t - 1.1, f);
      typewriter('IN TRYING TO', 140 * u, 740 * u, t - 2.0, f);
      typewriter('CATCH ME', 140 * u, 830 * u, t - 2.7, { ...f, color: C.red });
      say('“หวังว่าพวกคุณคงสนุกนะ\nกับการพยายามจับฉัน”', TX, 1150 * u, t - 4.0, { size: 56 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(61), to: bar(63) + 2 * BEAT, cues: [[0.3, 'type', 0.5], [1.4, 'type', 0.5], [3.0, 'thump', 0.5]],
    draw(t) {
      night('#08070A');
      const f = { size: 58 * u, weight: 700, family: 'Inter, sans-serif', color: C.cream, cps: 20, align: 'left' };
      typewriter('I AM NOT AFRAID', 140 * u, 560 * u, t - 0.3, f);
      typewriter('OF THE GAS CHAMBER', 140 * u, 650 * u, t - 1.2, { ...f, color: C.red });
      say('“ฉันไม่กลัวห้องรมแก๊ส\nเพราะมันจะส่งฉันไปสวรรค์เร็วขึ้น”', TX, 1000 * u, t - 3.0, { size: 52 * u, weight: 800, color: C.cream });
      say('ปฏิเสธด้วยว่า ไม่ใช่คนที่โทรเข้ารายการทีวีในชื่อเขา', TX, 1330 * u, t - 4.2, { size: 40 * u, weight: 600, color: C.fog });
      finish();
    } },
  { from: bar(63) + 2 * BEAT, to: bar(66), cues: [[0, 'whoosh', 0.5], [1.25, 'impact', 0.9]],
    draw(t) {
      paper();
      say('แต่… ไม่มีชื่อ', TX, 360 * u, t - 0.1, { size: 72 * u, weight: 800 });
      g.fillStyle = '#F4EEDF'; rrect(g, 90 * u, 640 * u, W - 220 * u, 340 * u, 8 * u); g.fill();
      typewriter('My name is', 140 * u, 740 * u, t - 0.4, { size: 64 * u, weight: 400, family: SERIF, color: C.ink, cps: 16 });
      for (let i = 0; i < 13; i++) { const s = spring(t - 1.25 - i * 0.05, 'snappy'); if (s <= 0) continue;
        g.save(); g.translate(150 * u + i * 60 * u, 880 * u); g.scale(s, s); glyph(Math.floor(hash(i, 13) * 400), 0, 0, 52 * u, C.red); g.restore(); }
      kicker('รหัส 13 ตัว · เม.ย. 1970', TX, 1120 * u, t - 1.0);
      say('ยังไม่มีใครถอดได้\nเช่นเดียวกับรหัส 32 ตัวอีกชุด', TX, 1260 * u, t - 2.0, { size: 50 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------- Chapter 9 — still open
  { from: bar(66), to: bar(68), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 20); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 700 * u], [0.02, 0]], 'heavy');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 90 * u, 520 * u, W - 200 * u, 900 * u, 18 * u); g.fill();
      rrect(g, 90 * u, 460 * u, 380 * u, 90 * u, 14 * u); g.fill();
      text(g, 'SFPD · ZODIAC', 280 * u, 522 * u, { size: 36 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 4 * u });
      crosshair(TX, 800 * u, 120 * u, 1, C.inkSoft, 10);
      g.restore();
      kicker('สถานะคดีวันนี้', TX, 330 * u, t);
      stamp('OPEN', TX, 1130 * u, t - 2.5, { size: 190 * u, rot: -0.1 });
      say('คดียังเปิดอยู่ ไม่เคยปิด', TX, 1520 * u, t - 3.0, { size: 50 * u, weight: 700 });
      finish(0.6);
    } },
  { from: bar(68), to: bar(70), cues: [[0, 'thump', 0.9], [2.5, 'swish', 0.4]],
    draw(t) {
      night('#08070A');
      crosshair(TX, 760 * u, 260 * u, remap(t, 0, 0.6), C.red, 18);
      big('ZODIAC', TX, 1180 * u, t - 0.4, { size: 230 * u, color: C.cream });
      say('ตัวตนจริงของเขา', TX, 1330 * u, t - 1.2, { size: 52 * u, weight: 600, color: C.fog });
      say('ไม่มีใครรู้', TX, 1440 * u, t - 2.5, { size: 72 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(70), to: bar(72), cues: [[0, 'type', 0.5], [2.5, 'chime', 0.8]],
    draw(t) {
      paper();
      cipherGrid(70 * u, 300 * u, 13, 8, 72 * u, remap(t, 0, 1.0), { seed: 3, color: C.paper3 });
      text(g, 'My name is', TX, 980 * u, { size: 70 * u, weight: 400, family: SERIF, color: C.ink });
      for (let i = 0; i < 13; i++) glyph(Math.floor(hash(i, 13) * 400), TX - 360 * u + i * 60 * u, 1080 * u, 52 * u, C.red);
      say('13 สัญลักษณ์นี้ คือชื่อของใคร?', TX, 1350 * u, t - 0.6, { size: 56 * u, weight: 800 });
      say('คอมเมนต์ทฤษฎีของคุณไว้ได้เลย', TX, 1460 * u, t - 2.5, { size: 46 * u, weight: 700, color: C.red });
      finish(0.6);
    } },
];
