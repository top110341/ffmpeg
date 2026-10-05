// Flannan Isles — Act 2: 0:55–3:00 (bars 22–72).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, clouds, rain } from './kit.js';
import { sea, island } from './a1.js';

export default () => [
  { from: bar(22), to: bar(26), cues: [[0.3, 'click', 0.6], [2.5, 'thump', 0.6], [5.0, 'thump', 0.6], [7.5, 'impact', 0.9]],
    draw(t) {
      paper();
      kicker('ผู้ดูแลคนใหม่ Joseph Moore ขึ้นไปดู', TX, 300 * u, t);
      [['ประตูปิด · นาฬิกาในครัวหยุดเดิน', 0.3], ['ตะเกียงทำความสะอาด พร้อมจุด', 2.5], ['เสื้อกันฝน 2 ตัวหายไป · เหลือ 1 ตัว', 5.0]].forEach(([s, at], i) => {
        const p = spring(t - at, 'snappy'); if (p <= 0) return;
        g.save(); g.translate((1 - p) * W, 0);
        g.fillStyle = i === 2 ? C.red : C.paper2; rrect(g, 90 * u, 500 * u + i * 200 * u, W - 220 * u, 150 * u, 12 * u); g.fill();
        text(g, s, TX, 590 * u + i * 200 * u, { size: 44 * u, weight: 800, family: THAI, color: i === 2 ? C.paper : C.ink }); g.restore(); });
      say('ใครออกไปข้างนอก โดยไม่ใส่เสื้อกันฝน\nกลางพายุ?', TX, 1300 * u, t - 7.5, { size: 50 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(26), to: bar(30), cues: [[0.2, 'type', 0.5], [2.5, 'type', 0.5], [7.5, 'thump', 0.6]],
    draw(t) {
      paper();
      g.save(); g.translate(TX, 780 * u); g.rotate(-0.02);
      g.fillStyle = '#F7F1E3'; rrect(g, -420 * u, -300 * u, 840 * u, 600 * u, 6 * u); g.fill();
      text(g, 'TELEGRAM · 26 DEC 1900', 0, -230 * u, { size: 30 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 2 * u });
      const f = { size: 42 * u, weight: 700, family: 'Inter, sans-serif', color: C.ink, cps: 22, align: 'left' };
      typewriter('A DREADFUL ACCIDENT HAS', -360 * u, -130 * u, t - 0.2, f);
      typewriter('HAPPENED AT THE FLANNANS.', -360 * u, -70 * u, t - 1.3, f);
      typewriter('THE THREE KEEPERS…', -360 * u, 10 * u, t - 2.5, f);
      typewriter('HAVE DISAPPEARED', -360 * u, 70 * u, t - 3.4, { ...f, color: C.red });
      typewriter('FROM THE ISLAND.', -360 * u, 130 * u, t - 4.2, { ...f, color: C.red });
      g.restore();
      say('โทรเลขจากกัปตันเรือ ถึงคณะกรรมการประภาคาร', TX, 1300 * u, t - 6.0, { size: 42 * u, weight: 800 });
      finish(0.6);
    } },
  // ---------------- the legend
  { from: bar(30), to: bar(34), cues: [[0.2, 'riser', 0.4], [2.5, 'pop', 0.6], [5.0, 'pop', 0.6], [7.5, 'pop', 0.6]],
    draw(t) {
      night('#0D0C10');
      kicker('เรื่องเล่าที่แพร่ไปในภายหลัง', TX, 300 * u, t, { color: C.red });
      [['อาหารวางค้าง เก้าอี้ล้มคว่ำ', 0.2], ['นกประหลาด 3 ตัวบินออกจากเกาะ', 2.5], ['บันทึกว่าผู้ดูแลร้องไห้ และสวดภาวนา', 5.0]].forEach(([s, at], i) => {
        const p = spring(t - at, 'snappy'); if (p <= 0) return;
        g.save(); g.translate((1 - p) * -W, 0);
        g.fillStyle = C.night3; rrect(g, 90 * u, 470 * u + i * 220 * u, W - 220 * u, 170 * u, 12 * u); g.fill();
        text(g, s, TX, 570 * u + i * 220 * u, { size: 42 * u, weight: 800, family: THAI, color: C.cream }); g.restore(); });
      stamp('FALSE', TX, 1300 * u, t - 7.5, { size: 170 * u, rot: -0.1 });
      finish();
    } },
  { from: bar(34), to: bar(38), cues: [[0.2, 'thump', 0.6], [2.5, 'type', 0.5], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      g.save(); g.translate(TX, 760 * u); g.rotate(-0.03); g.fillStyle = '#5B2E2A'; rrect(g, -260 * u, -320 * u, 520 * u, 640 * u, 8 * u); g.fill();
      text(g, 'Flannan Isle', 0, -20 * u, { size: 70 * u, weight: 400, family: SERIF, color: '#F1E2B8' }); text(g, 'a poem · 1912', 0, 50 * u, { size: 36 * u, weight: 400, family: SERIF, color: '#F1E2B8' }); g.restore();
      kicker('ที่มาของรายละเอียดเหล่านั้น', TX, 300 * u, t);
      say('บทกวีของ Wilfrid Gibson\nและบทความยุคต่อมาที่แต่งเติมขึ้น', TX, 1260 * u, t - 2.5, { size: 46 * u, weight: 800 });
      say('ไม่พบในรายงานการสอบสวนจริง', TX, 1480 * u, t - 5.0, { size: 48 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- the real report
  { from: bar(38), to: bar(42), cues: [[0.2, 'whoosh', 0.5], [2.5, 'thump', 0.6], [5.0, 'pop', 0.6], [7.5, 'pop', 0.6]],
    draw(t) {
      night('#0A1420'); sea(t, 1250 * u, 1.4);
      // the west landing: steps cut into the cliff, a crane and a ropes box
      g.fillStyle = '#16241C'; g.beginPath(); g.moveTo(0, 1260 * u); g.lineTo(0, 600 * u); g.lineTo(700 * u, 560 * u); g.lineTo(900 * u, 1260 * u); g.fill();
      g.fillStyle = '#2A3A30'; for (let i = 0; i < 9; i++) g.fillRect(560 * u + i * 30 * u, 1160 * u - i * 60 * u, 60 * u, 14 * u);
      const dmg = t > 5.0;
      g.save(); g.translate(300 * u, 600 * u); g.rotate(dmg ? 0.6 : 0); g.fillStyle = '#7A6A4A'; g.fillRect(-10 * u, -200 * u, 20 * u, 200 * u); g.fillRect(-10 * u, -200 * u, 160 * u, 16 * u); g.restore();
      g.fillStyle = '#5A4632'; if (!dmg || t < 5.6) g.fillRect(420 * u, 530 * u, 120 * u, 70 * u);
      kicker('ผู้ตรวจการ Robert Muirhead · สอบสวน', TX, 300 * u, t, { color: C.red });
      say('ท่าเทียบเรือฝั่งตะวันตก ถูกพายุทำลาย', TX, 410 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      say('ราวเหล็กบิดงอ หินก้อนใหญ่หลุดกระเด็น', TX, 1400 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.cream });
      say('กล่องเก็บเชือก สูงจากน้ำ 33 เมตร ถูกซัดหายไป', TX, 1510 * u, t - 5.0, { size: 40 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(42), to: bar(47), cues: [[0.2, 'riser', 0.5], [3.75, 'impact', 1.2], [7.5, 'thump', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 3.75, 30); g.translate(sx, sy);
      night('#05090F');
      g.fillStyle = '#16241C'; g.beginPath(); g.moveTo(0, 1400 * u); g.lineTo(0, 700 * u); g.lineTo(500 * u, 680 * u); g.lineTo(640 * u, 1400 * u); g.fill();
      for (let i = 0; i < 3; i++) person(330 * u + i * 70 * u, 690 * u, 34 * u, t > 3.75 + i * 0.1 ? 'rgba(0,0,0,0)' : C.cream);
      const p = clamp(spring(t - 2.6, 40, 12));
      g.fillStyle = '#C9D4DF'; g.beginPath(); g.moveTo(W + 200 * u - p * 1300 * u, 1500 * u);
      for (let x = 0; x <= 900; x += 30) g.lineTo(W + 200 * u - p * 1300 * u + x * u, 1500 * u - Math.sin(x / 900 * Math.PI) * 900 * u * p);
      g.lineTo(W + 1200 * u, H); g.lineTo(W, H); g.fill();
      sea(t, 1400 * u, 2.5);
      kicker('ข้อสรุปของรายงาน', TX, 300 * u, t, { color: C.red });
      say('ทั้ง 3 คนออกไปเก็บอุปกรณ์ที่ท่าเรือ\nแล้วถูกคลื่นยักษ์ซัดตกทะเล', TX, 1480 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(47), to: bar(51), cues: [[0.3, 'pop', 0.6], [2.5, 'pop', 0.6], [5.0, 'pop', 0.6]],
    draw(t) {
      paper();
      kicker('แต่ยังมีคำถาม', TX, 300 * u, t);
      [['ทำไมทั้ง 3 คนออกไปพร้อมกัน\nทั้งที่กฎกำหนดให้ต้องมีคนอยู่ในประภาคาร', 0.3], ['คนที่ 3 ออกไปโดยไม่ใส่เสื้อกันฝน\nเพราะอะไร?', 2.5], ['ทำไมไม่พบร่างใครเลยสักคน', 5.0]].forEach(([s, at], i) => {
        if (t < at) return; say(s, TX, 520 * u + i * 300 * u, t - at, { size: 44 * u, weight: 800, color: i === 2 ? C.red : C.ink }); });
      finish(0.6);
    } },
  { from: bar(51), to: bar(55), cues: [[0.2, 'pop', 0.4], [0.6, 'pop', 0.4], [1.0, 'pop', 0.4], [1.4, 'pop', 0.4]],
    draw(t) {
      paper();
      g.fillStyle = C.paper2; g.fillRect(60 * u, 470 * u, W - 120 * u, 900 * u);
      [['คลื่นยักษ์ผิดปกติ', 270, 640], ['คนหนึ่งตกน้ำ อีกคนวิ่งไปช่วย', 740, 720], ['ทะเลาะกันจนเกิดเหตุร้าย?', 300, 1000], ['สายลับ / โจรสลัด?', 770, 1100]].forEach(([s, x, y], i) => {
        const p = spring(t - 0.2 - i * 0.4, 'playful'); if (p <= 0) return;
        g.save(); g.translate(x * u, y * u); g.rotate((hash(i, 7) - 0.5) * 0.12); g.scale(p, p);
        g.fillStyle = i < 2 ? C.red : '#F7F1E3'; g.fillRect(-240 * u, -70 * u, 480 * u, 140 * u);
        text(g, s, 0, 14 * u, { size: 31 * u, weight: 800, family: THAI, color: i < 2 ? C.paper : C.ink }); g.restore(); });
      say('ทฤษฎีที่ถูกพูดถึง', TX, 330 * u, t - 0.1, { size: 58 * u, weight: 800 });
      say('สองข้อแรก คือคำอธิบายที่น่าเป็นไปได้ที่สุด', TX, 1460 * u, t - 3.0, { size: 42 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(55), to: bar(60), cues: [[0.2, 'whoosh', 0.5], [6.25, 'thump', 0.6]],
    draw(t) {
      night('#071019'); clouds(t * 50 * u, { alpha: 0.5, seed: 9, color: C.night2 }); sea(t, 1250 * u, 1.2);
      island(t, { beam: 1 });
      kicker('ประภาคารวันนี้', TX, 300 * u, t, { color: C.red });
      say('ปี 1971 เปลี่ยนเป็นระบบอัตโนมัติ', TX, 410 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      say('ไม่มีผู้ดูแลอาศัยอยู่บนเกาะอีกเลย', TX, 1520 * u, t - 3.0, { size: 48 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(60), to: bar(66), cues: [[0, 'thump', 0.9], [7.5, 'swish', 0.4]],
    draw(t) {
      night('#08070A');
      big('FLANNAN', TX, 820 * u, t, { size: 200 * u, color: C.cream });
      big('ISLES', TX, 1020 * u, t - 0.15, { size: 200 * u, color: C.cream });
      const p = spring(t - 0.8, 'default');
      g.fillStyle = C.red; g.fillRect(TX - 330 * u * p, 1080 * u, 660 * u * p, 10 * u);
      say('15 ธันวาคม 1900', TX, 1220 * u, t - 1.5, { size: 56 * u, weight: 700, color: C.fog });
      say('3 คน ไม่เคยถูกพบ', TX, 1340 * u, t - 3.0, { size: 64 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(66), to: bar(72), cues: [[0, 'whoosh', 0.5], [7.5, 'chime', 0.8]],
    draw(t) {
      night('#071019'); clouds(t * 50 * u, { alpha: 0.6, seed: 9, color: C.night2 }); sea(t, 1250 * u, 1.6);
      island(t, { beam: Math.max(0, 1 - t / 3) });
      rain(t, { n: 140, alpha: 0.35, angle: 0.5 });
      say('คลื่นยักษ์ หรือมีอะไรมากกว่านั้น?', TX, 330 * u, t - 0.3, { size: 54 * u, weight: 800, color: C.cream });
      say('คอมเมนต์ทฤษฎีของคุณไว้ได้เลย', TX, 1500 * u, t - 4.0, { size: 46 * u, weight: 800, color: C.red });
      finish();
    } },
];
