// Act 2 — the book, the code, the nurse, the name (1:20–3:00, bars 32–72).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, rrect, text, typewriter, topScrim, shake } from './kit.js';
import { beach, seawall, seated, slip, book, codeCard, CODE, bust, mapAus, PLACE, SAND } from './props.js';

function car(x, y, s) {
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = '#2E3542';
  g.beginPath(); g.moveTo(-1, 0.1); g.lineTo(-0.95, -0.15); g.quadraticCurveTo(-0.5, -0.2, -0.35, -0.45); g.lineTo(0.35, -0.45); g.quadraticCurveTo(0.55, -0.2, 0.98, -0.15); g.lineTo(1, 0.1); g.closePath(); g.fill();
  g.fillStyle = '#0E1118'; for (const wx of [-0.6, 0.6]) { g.beginPath(); g.arc(wx, 0.1, 0.17, 0, 7); g.fill(); }
  g.restore();
}

export default () => [
  // ---------------- Chapter 5 — the book in the car
  { from: bar(32), to: bar(34), cues: [[0.2, 'thump', 0.5], [1.4, 'swish', 0.7]],
    draw(t) {
      paper();
      car(TX, 760 * u, 380 * u);
      const p = spring(t - 1.4, 'default');
      g.save(); g.translate(TX - 60 * u + (1 - p) * -500 * u, 640 * u - (1 - p) * 200 * u); g.rotate((1 - p) * -1.2); book(0, 0, 160 * u); g.restore();
      kicker('กรกฎาคม 1949', TX, 330 * u, t);
      say('ชายคนหนึ่งพบหนังสือเล่มนี้\nบนเบาะหลังรถของเขา', TX, 1150 * u, t - 0.6, { size: 52 * u, weight: 800 });
      say('ถูกโยนเข้ามาช่วงเดียวกับที่พบศพ', TX, 1400 * u, t - 2.5, { size: 46 * u, weight: 700, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(34), to: bar(36), cues: [[0.2, 'pop', 0.6], [2.5, 'impact', 0.9]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 16); g.translate(sx, sy);
      paper();
      book(TX - 160 * u, 800 * u, 300 * u);
      // the torn corner and the slip fitting it
      g.fillStyle = C.paper; g.beginPath(); g.moveTo(TX - 10 * u, 1010 * u); g.lineTo(TX - 10 * u, 1110 * u); g.lineTo(TX - 160 * u, 1110 * u); g.closePath(); g.fill();
      const s = spring(t - 0.6, 'default');
      slip(TX + 260 * u - (1 - s) * -300 * u, 1050 * u, 120 * u, 0.04);
      stamp('MATCH', TX + 220 * u, 640 * u, t - 2.5, { size: 120 * u, rot: 0.1 });
      say('หน้าสุดท้ายถูกฉีก', TX, 330 * u, t - 0.2, { size: 60 * u, weight: 800 });
      say('รอยฉีกตรงกับกระดาษในกระเป๋าพอดี', TX, 1400 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(36), to: bar(40), cues: CODE.map((_, i) => [0.3 + i * 0.7, 'type', 0.6]).concat([[6.25, 'thump', 0.7]]),
    draw(t) {
      paper();
      kicker('ที่ปกหลังของหนังสือ', TX, 300 * u, t);
      say('มีตัวอักษรเขียนด้วยดินสอ 5 บรรทัด', TX, 410 * u, t - 0.1, { size: 52 * u, weight: 800 });
      codeCard(TX, 640 * u, t - 0.3);
      say('ไม่มีใครถอดได้จนถึงวันนี้', TX, 1480 * u, t - 6.25, { size: 56 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(40), to: bar(42), cues: [[0.2, 'type', 0.5], [1.25, 'click', 0.8]],
    draw(t) {
      paper();
      g.save(); g.translate(TX, 820 * u); g.rotate(-0.03);
      g.fillStyle = '#F4EEDF'; rrect(g, -380 * u, -160 * u, 760 * u, 320 * u, 6 * u); g.fill();
      typewriter('X 3 _ _ _', -280 * u, 40 * u, t - 0.2, { size: 120 * u, weight: 400, family: '"Instrument Serif"', color: C.ink, cps: 6 });
      g.restore();
      kicker('และยังมีอีกอย่าง', TX, 330 * u, t);
      say('เบอร์โทรศัพท์ที่ไม่ได้ลงในสมุดโทรศัพท์', TX, 1250 * u, t - 1.25, { size: 48 * u, weight: 800, color: C.red });
      text(g, '* ปิดบังตัวเลขบางส่วน', TX, 1560 * u, { size: 28 * u, weight: 500, family: THAI, color: C.inkSoft, alpha: 0.7 });
      finish(0.6);
    } },
  // ---------------- Chapter 6 — the nurse
  { from: bar(42), to: bar(45), cues: [[0.2, 'thump', 0.5], [1.4, 'pop', 0.6], [3.75, 'thump', 0.6]],
    draw(t) {
      paper();
      kicker('เจ้าของเบอร์', TX, 330 * u, t);
      g.save(); g.beginPath(); g.rect(TX - 200 * u, 480 * u, 400 * u, 480 * u); g.clip();
      g.fillStyle = C.night2; g.fillRect(TX - 200 * u, 480 * u, 400 * u, 480 * u); person(TX, 940 * u, 180 * u * spring(t - 0.2, 'default'), C.fog); g.restore();
      say('พยาบาลสาวที่อาศัยอยู่ใกล้ชายหาด', TX, 1100 * u, t - 1.4, { size: 52 * u, weight: 800 });
      say('เธอบอกตำรวจว่า ไม่รู้จักชายคนนี้', TX, 1220 * u, t - 2.5, { size: 50 * u, weight: 700, color: C.inkSoft });
      say('และขอไม่ให้เปิดเผยชื่อของเธอ', TX, 1340 * u, t - 3.75, { size: 50 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(45), to: bar(48), cues: [[0.2, 'whoosh', 0.5], [2.5, 'thump', 0.7], [5.0, 'impact', 0.8]],
    draw(t) {
      night('#14100C');
      bust(TX, 1000 * u, 300 * u * spring(t - 0.2, 'heavy'));
      kicker('รูปปั้นปูนหล่อจากใบหน้าผู้ตาย', TX, 330 * u, t, { color: C.red });
      say('มีรายงานว่าเมื่อเธอเห็นรูปปั้นนี้', TX, 1300 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.cream });
      say('เธอแทบจะเป็นลม', TX, 1420 * u, t - 5.0, { size: 64 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(48), to: bar(50), cues: [[0.2, 'pop', 0.4], [0.5, 'pop', 0.4], [0.8, 'pop', 0.4], [2.5, 'thump', 0.6]],
    draw(t) {
      paper();
      g.fillStyle = C.paper2; g.fillRect(60 * u, 470 * u, W - 120 * u, 900 * u);
      [['สายลับยุคสงครามเย็น?', 270, 650], ['คนรักลับ ๆ?', 760, 720], ['ฆ่าตัวตายด้วยยาพิษ?', 300, 1080], ['?', 760, 1160]].forEach(([s, x, y], i) => {
        const p = spring(t - 0.2 - i * 0.3, 'playful'); if (p <= 0) return;
        g.save(); g.translate(x * u, y * u); g.rotate((hash(i, 7) - 0.5) * 0.12); g.scale(p, p);
        g.fillStyle = '#F7F1E3'; g.fillRect(-190 * u, -70 * u, 380 * u, 140 * u);
        text(g, s, 0, 14 * u, { size: s === '?' ? 100 * u : 38 * u, weight: s === '?' ? 400 : 800, family: s === '?' ? SERIF : THAI, color: s === '?' ? C.red : C.ink });
        g.fillStyle = C.red; g.beginPath(); g.arc(0, -70 * u, 10 * u, 0, 7); g.fill(); g.restore(); });
      say('ทฤษฎีถูกเสนอมานับไม่ถ้วน', TX, 330 * u, t - 0.1, { size: 56 * u, weight: 800 });
      say('ไม่มีข้อไหนพิสูจน์ได้', TX, 1460 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- Chapter 7 — 70 years later
  { from: bar(50), to: bar(52), cues: [[0.1, 'thump', 0.6], [1.25, 'click', 0.7]],
    draw(t) {
      paper();
      const ys = ['1949', '1970', '1990', '2010', '2021'], dw = 170 * u, x0 = TX - 1.5 * (dw + 14 * u);
      for (let d = 0; d < 4; d++) flip(x0 + d * (dw + 14 * u), 760 * u, dw, 250 * u, ys.map((y) => y[d]), ys.map((_, i) => i * 0.2), t, { size: 190 * u });
      kicker('พฤษภาคม 2021', TX, 500 * u, t);
      say('ตำรวจขุดศพขึ้นมาตรวจ DNA', TX, 1050 * u, t - 1.25, { size: 58 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(52), to: bar(55), cues: Array.from({ length: 10 }, (_, i) => [0.3 + i * 0.3, 'tick', 0.4]).concat([[3.75, 'pop', 0.8]]),
    draw(t) {
      night(C.night2);
      // DNA double helix assembling
      for (let i = 0; i < 26; i++) {
        const y = 520 * u + i * 30 * u, a = i * 0.45 + t * 1.5, p = clamp((t - i * 0.06) / 0.3);
        if (p <= 0) continue;
        const x1 = TX + Math.sin(a) * 180 * u, x2 = TX - Math.sin(a) * 180 * u;
        g.globalAlpha = p; g.strokeStyle = C.fog; g.lineWidth = 3 * u; g.beginPath(); g.moveTo(x1, y); g.lineTo(x2, y); g.stroke();
        g.fillStyle = C.cream; g.beginPath(); g.arc(x1, y, 9 * u, 0, 7); g.fill(); g.fillStyle = C.red; g.beginPath(); g.arc(x2, y, 9 * u, 0, 7); g.fill(); g.globalAlpha = 1;
      }
      say('DNA จากเส้นผมที่ติดอยู่กับรูปปั้นปูน', TX, 330 * u, t - 0.1, { size: 46 * u, weight: 800, color: C.cream });
      say('ถูกนำไปเทียบกับแผนผังเครือญาติ', TX, 1420 * u, t - 1.5, { size: 50 * u, weight: 800, color: C.cream });
      say('ไล่หาญาติที่ยังมีชีวิตอยู่', TX, 1530 * u, t - 3.75, { size: 46 * u, weight: 700, color: C.fog });
      finish(0.8);
    } },
  { from: bar(55), to: bar(58), cues: [[0.2, 'riser', 0.5], [1.25, 'impact', 1.1], [3.0, 'type', 0.5]],
    draw(t) {
      const [sx, sy] = shake(t, 1.25, 18); g.translate(sx, sy);
      paper();
      kicker('กรกฎาคม 2022', TX, 330 * u, t);
      say('นักวิจัยประกาศชื่อของเขา', TX, 440 * u, t - 0.2, { size: 54 * u, weight: 800 });
      big('Carl “Charles” Webb', TX, 800 * u, t - 1.25, { size: 110 * u, color: C.ink });
      typewriter('เกิด 1905 · เมลเบิร์น', TX, 940 * u, t - 3.0, { size: 46 * u, weight: 700, color: C.inkSoft, align: 'center', cps: 16 });
      typewriter('วิศวกรไฟฟ้า และช่างทำเครื่องมือ', TX, 1020 * u, t - 3.8, { size: 46 * u, weight: 700, color: C.inkSoft, align: 'center', cps: 16 });
      say('อายุ 43 ปีตอนเสียชีวิต', TX, 1220 * u, t - 5.5, { size: 54 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- Chapter 8 — named, not explained
  { from: bar(58), to: bar(61), cues: [[0.2, 'whoosh', 0.5], [1.25, 'pop', 0.7], [3.75, 'pop', 0.7]],
    draw(t) {
      const cam = { lat: -36.4, lon: 141.7, z: 135 * u };
      const P = mapAus(cam); topScrim();
      pin(...P(PLACE.melbourne), t - 1.25, { label: 'เมลเบิร์น', side: -1 });
      pin(...P(PLACE.somerton), t - 3.75, { label: 'Somerton', side: 1 });
      const a = P(PLACE.melbourne), b = P(PLACE.somerton), p = remap(t, 1.8, 3.6);
      g.strokeStyle = C.red; g.lineWidth = 5 * u; g.setLineDash([14 * u, 12 * u]); g.beginPath(); g.moveTo(...a); g.lineTo(a[0] + (b[0] - a[0]) * p, a[1] + (b[1] - a[1]) * p); g.stroke(); g.setLineDash([]);
      kicker('ราว 650 กม.', TX, 250 * u, t, { color: C.red });
      say('เขาเดินทางมาที่ Adelaide ทำไม?', TX, 345 * u, t - 0.3, { size: 54 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(61), to: bar(63) + 2 * BEAT, cues: [[0.2, 'thump', 0.5], [1.25, 'thump', 0.5], [2.5, 'thump', 0.5], [3.75, 'thump', 0.6]],
    draw(t) {
      paper();
      say('เรารู้ชื่อเขาแล้ว แต่ยังไม่รู้ว่า…', TX, 330 * u, t - 0.1, { size: 54 * u, weight: 800 });
      ['เขาเสียชีวิตเพราะอะไร', 'ใครตัดป้ายเสื้อผ้าของเขา', 'รหัส 5 บรรทัดนั้นหมายถึงอะไร', 'เขามาหาใครที่ชายหาดนั้น'].forEach((s, i) => {
        const at = 0.2 + i * 1.25; if (t < at) return;
        const y = 620 * u + i * 200 * u, p = spring(t - at, 'snappy');
        g.save(); g.translate((1 - p) * -80 * u, 0); g.globalAlpha = clamp((t - at) / 0.12);
        text(g, '?', 140 * u, y, { size: 90 * u, weight: 400, family: SERIF, color: C.red });
        text(g, s, 230 * u, y - 10 * u, { size: 52 * u, weight: 800, family: THAI, color: C.ink, align: 'left' });
        g.restore(); });
      finish(0.6);
    } },
  { from: bar(63) + 2 * BEAT, to: bar(66), cues: [[0.1, 'thump', 0.6], [1.25, 'impact', 0.9]],
    draw(t) {
      paper();
      kicker('กลางปี 2026', TX, 420 * u, t);
      say('ตำรวจออสเตรเลียใต้เตรียมส่งรายงาน\nให้เจ้าหน้าที่ไต่สวนการตาย', TX, 560 * u, t - 0.2, { size: 50 * u, weight: 800 });
      stamp('PENDING', TX, 950 * u, t - 1.25, { size: 150 * u, rot: -0.08 });
      say('ชื่อของเขายังไม่ถูกยืนยันอย่างเป็นทางการ', TX, 1260 * u, t - 2.0, { size: 46 * u, weight: 700, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------- Chapter 9 — it is finished?
  { from: bar(66), to: bar(68), cues: [[0, 'whoosh', 0.5], [2.5, 'thump', 0.6]],
    draw(t) {
      beach(t + 20);
      seawall(0, 900 * u, W, 300 * u);
      g.fillStyle = SAND; g.fillRect(0, 1200 * u, W, H - 1200 * u);
      say('78 ปีหลังเช้าวันนั้น', TX, 330 * u, t - 0.2, { size: 60 * u, weight: 800, color: C.ink });
      say('กำแพงกันคลื่นยังอยู่ที่เดิม', TX, 1400 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.ink });
      finish(0.6);
    } },
  { from: bar(68), to: bar(70), cues: [[0, 'thump', 0.9], [2.5, 'swish', 0.4]],
    draw(t) {
      night('#14100C');
      big('Tamám Shud', TX, 900 * u, t, { size: 180 * u, color: C.cream });
      const p = spring(t - 0.7, 'default');
      g.fillStyle = C.red; g.fillRect(TX - 330 * u * p, 960 * u, 660 * u * p, 10 * u);
      say('“จบแล้ว”', TX, 1130 * u, t - 1.0, { size: 64 * u, weight: 800, color: C.fog });
      say('แต่ปริศนายังไม่จบ', TX, 1260 * u, t - 2.5, { size: 64 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(70), to: bar(72), cues: [[0, 'type', 0.5], [2.5, 'chime', 0.8]],
    draw(t) {
      paper();
      codeCard(TX, 420 * u, 99, { size: 64 * u });
      say('คุณคิดว่ารหัสนี้หมายถึงอะไร?', TX, 1300 * u, t - 0.4, { size: 56 * u, weight: 800 });
      say('คอมเมนต์ทฤษฎีของคุณไว้ได้เลย', TX, 1420 * u, t - 2.5, { size: 46 * u, weight: 700, color: C.red });
      finish(0.6);
    } },
];
