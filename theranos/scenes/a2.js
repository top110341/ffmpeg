// Theranos — Act 2: 0:55–3:00 (bars 22–72). The lab, the leak, the fall, the verdict.
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, rrect, text, typewriter, topScrim, shake } from './kit.js';
import { BLOOD, BOX, LAB, SANS, money, drop, tube, edison, analyzer, curtain, turtle, magazine, newspaper, gavel, bars, storefront } from './a1.js';

const PINK = '#F08A7E';
// lab bench top at y
function bench(y) {
  g.fillStyle = LAB; g.fillRect(0, 0, W, H);
  g.fillStyle = '#C9D1D5'; for (let i = 0; i < 8; i++) g.fillRect(0, 120 * u + i * 150 * u, W, 3 * u);
  g.fillStyle = '#8E989E'; g.fillRect(0, y, W, 34 * u); g.fillStyle = '#6F787E'; g.fillRect(0, y + 34 * u, W, H - y);
}
// a line on a dated timeline card list
function dated(d, s, x, y, t, at, color = C.ink) {
  const p = spring(t - at, 'snappy'); if (p <= 0) return;
  g.save(); g.translate((1 - p) * -W, 0);
  text(g, d, x, y, { size: 50 * u, weight: 400, family: SERIF, color: C.red, align: 'left' });
  text(g, s, x, y + 66 * u, { size: 40 * u, weight: 800, family: THAI, color, align: 'left' });
  g.restore();
}

export default () => [
  // ---------------- chapter 3 — behind the curtain
  { from: bar(22), to: bar(25), cues: [[0.2, 'thump', 0.6], [2.5, 'swish', 0.8], [3.0, 'impact', 0.9], [5.0, 'pop', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 3.0, 14); g.translate(sx, sy);
      bench(1250 * u);
      analyzer(TX + 60 * u, 1250 * u, 760 * u, t);
      curtain(80 * u, 560 * u, W - 160 * u, 690 * u, clamp(spring(t - 2.5, 'heavy')));
      edison(TX - 250 * u, 1250 * u, 280 * u, { prog: 0.7, label: 'TESTING' });
      g.fillStyle = 'rgba(221,227,230,0.92)'; g.fillRect(0, 210 * u, W, 300 * u);
      kicker('ความจริงในห้องแล็บ', TX, 290 * u, t);
      say('ตามการสืบสวนในเวลาต่อมา', TX, 400 * u, t - 0.2, { size: 50 * u, weight: 800 });
      g.fillStyle = 'rgba(221,227,230,0.92)'; if (t > 4.8) g.fillRect(0, 1300 * u, W, 260 * u);
      say('การตรวจส่วนใหญ่ทำบนเครื่องเชิงพาณิชย์\nเช่นของ Siemens ที่ถูกดัดแปลง', TX, 1380 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.red });
      finish(0.5);
    } },
  { from: bar(25), to: bar(28), cues: [[0.2, 'pop', 0.6], [1.5, 'swish', 0.5], [3.75, 'thump', 0.6], [4.4, 'tick', 0.5], [5.0, 'tick', 0.5], [5.6, 'tick', 0.5]],
    draw(t) {
      paper();
      kicker('เบื้องหลัง', TX, 300 * u, t);
      say('เลือดจากปลายนิ้วมีน้อยเกินไป', TX, 410 * u, t - 0.1, { size: 52 * u, weight: 800 });
      // drop into a beaker that fills with water and pales
      const dil = clamp((t - 1.5) / 1.5);
      g.strokeStyle = C.inkSoft; g.lineWidth = 6 * u;
      g.beginPath(); g.moveTo(170 * u, 620 * u); g.lineTo(190 * u, 1000 * u); g.lineTo(430 * u, 1000 * u); g.lineTo(450 * u, 620 * u); g.stroke();
      const lvl = 0.15 + dil * 0.7;
      g.fillStyle = `rgba(179,38,30,${0.95 - dil * 0.7})`; g.fillRect(190 * u, 1000 * u - 370 * u * lvl, 240 * u, 370 * u * lvl);
      if (t < 1.4) drop(310 * u, 560 * u + clamp(t / 0.8) * 340 * u, 70 * u);
      text(g, 'เจือจาง', 310 * u, 1080 * u, { size: 40 * u, weight: 800, family: THAI, color: C.inkSoft, alpha: dil });
      // result sheet with flagged values
      g.fillStyle = '#F7F3EA'; rrect(g, 540 * u, 600 * u, 380 * u, 470 * u, 10 * u); g.fill();
      text(g, 'LAB REPORT', 730 * u, 660 * u, { size: 30 * u, weight: 800, family: SANS, color: C.inkSoft, tracking: 2 * u });
      ['K', 'Ca', 'Na', 'Hb', 'PSA'].forEach((k, i) => { const y = 740 * u + i * 66 * u, at = 4.4 + i * 0.3;
        text(g, k, 580 * u, y, { size: 34 * u, weight: 700, family: SANS, color: C.ink, align: 'left' });
        const bad = t > at && i !== 2; const v = (10 + hash(i, Math.floor(t * 8)) * 90).toFixed(1);
        text(g, t > 3.75 ? v : '—', 760 * u, y, { size: 34 * u, weight: 700, family: SANS, color: bad ? C.red : C.ink, align: 'left' });
        if (bad) text(g, '?', 880 * u, y, { size: 40 * u, weight: 800, family: SANS, color: C.red }); });
      say('จึงถูกเจือจางก่อนเข้าเครื่อง', TX, 1240 * u, t - 1.5, { size: 46 * u, weight: 800 });
      say('ผลตรวจหลายรายการคลาดเคลื่อน', TX, 1360 * u, t - 3.75, { size: 52 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(28), to: bar(30), cues: [[0.2, 'pop', 0.6], [0.8, 'pop', 0.6], [2.5, 'thump', 0.6]],
    draw(t) {
      paper();
      kicker('ผู้เปิดโปงจากภายใน', TX, 300 * u, t);
      [['Tyler Shultz', -1, 0.2], ['Erika Cheung', 1, 0.8]].forEach(([n, sd, at]) => { const p = clamp(spring(t - at, 'playful')); if (p <= 0) return;
        const x = TX + sd * 210 * u;
        person(x, 900 * u, 130 * u * p, sd < 0 ? '#2B3A55' : '#4D6B6A');
        text(g, n, x, 1060 * u, { size: 44 * u, weight: 800, family: SANS, color: C.ink, alpha: p }); });
      say('พนักงานหนุ่มสาวในแล็บ เห็นผลควบคุมคุณภาพ\nที่ไม่ผ่าน แต่ยังถูกใช้ตรวจคนไข้', TX, 1180 * u, t - 1.4, { size: 40 * u, weight: 800 });
      say('Tyler คือหลานชายของ George Shultz\nกรรมการของบริษัทเอง', TX, 1380 * u, t - 2.5, { size: 42 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(30), to: bar(32), cues: [[0.2, 'whoosh', 0.5], [0.6, 'swish', 0.4], [2.5, 'thump', 0.7]],
    draw(t) {
      night('#0E1016');
      // envelopes flying out to the regulators
      for (let i = 0; i < 3; i++) { const p = clamp((t - 0.3 - i * 0.3) / 1.2); if (p <= 0) continue;
        const x = 200 * u + p * 560 * u, y = 900 * u - Math.sin(p * Math.PI) * 220 * u + i * 30 * u;
        g.save(); g.translate(x, y); g.rotate(-0.2 + p * 0.3); g.fillStyle = C.cream; g.fillRect(-70 * u, -45 * u, 140 * u, 90 * u);
        g.strokeStyle = '#9A8F7A'; g.lineWidth = 3 * u; g.beginPath(); g.moveTo(-70 * u, -45 * u); g.lineTo(0, 10 * u); g.lineTo(70 * u, -45 * u); g.stroke(); g.restore(); }
      person(170 * u, 1000 * u, 90 * u, '#2B3A55'); person(290 * u, 1000 * u, 90 * u, '#4D6B6A');
      // regulator building
      g.fillStyle = '#2A3142'; g.fillRect(720 * u, 760 * u, 220 * u, 240 * u); g.beginPath(); g.moveTo(700 * u, 770 * u); g.lineTo(830 * u, 680 * u); g.lineTo(960 * u, 770 * u); g.fill();
      g.fillStyle = '#0E1016'; for (let i = 0; i < 4; i++) g.fillRect(740 * u + i * 52 * u, 800 * u, 22 * u, 180 * u);
      // lawyers closing in
      if (t > 2.4) for (let i = 0; i < 4; i++) { const p = clamp(spring(t - 2.5 - i * 0.12, 'heavy')); person(-100 * u + p * (200 * u + i * 150 * u), 1420 * u, 110 * u, '#05070B', { tie: '#3A0D0D' }); }
      g.fillStyle = 'rgba(14,16,22,0.8)'; g.fillRect(0, 230 * u, W, 280 * u);
      say('ทั้งคู่ลาออก แล้วร้องเรียนหน่วยงานรัฐ', TX, 330 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      say('และให้ข้อมูลกับนักข่าว', TX, 440 * u, t - 1.0, { size: 46 * u, weight: 800, color: C.fog });
      say('บริษัทตอบโต้ด้วยทีมทนายความ', TX, 1170 * u, t - 2.5, { size: 50 * u, weight: 800, color: PINK });
      finish();
    } },
  // ---------------- chapter 4 — the story breaks
  { from: bar(32), to: bar(35), cues: [[0.2, 'whoosh', 0.7], [0.9, 'impact', 1.0], [2.5, 'type', 0.5], [5.0, 'pop', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 0.9, 16); g.translate(sx, sy);
      paper();
      const p = clamp(spring(t - 0.2, 'heavy'));
      g.save(); g.translate(TX, 860 * u); g.rotate((1 - p) * 4 - 0.04); g.scale(0.2 + 0.8 * p, 0.2 + 0.8 * p);
      newspaper(0, 0, 640 * u, t, { head: 'BLOOD-TEST STARTUP\nUNDER SCRUTINY', date: 'OCTOBER 15, 2015' });
      g.restore();
      kicker('15 ตุลาคม 2015', TX, 300 * u, t);
      say('Wall Street Journal ตีพิมพ์ผลการสืบสวน', TX, 1340 * u, t - 2.5, { size: 46 * u, weight: 800 });
      say('โดยนักข่าว John Carreyrou', TX, 1450 * u, t - 3.2, { size: 46 * u, weight: 800, color: C.red });
      text(g, '(หนังสือพิมพ์ในภาพเป็นภาพจำลอง)', TX, 1540 * u, { size: 26 * u, weight: 700, family: THAI, color: C.inkSoft, alpha: clamp(t - 2.5) });
      finish(0.6);
    } },
  { from: bar(35), to: bar(38), cues: [[0.2, 'riser', 0.5], [2.5, 'impact', 0.9], [5.0, 'thump', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 16); g.translate(sx, sy);
      night('#101318');
      const err = t > 2.5;
      edison(TX, 1180 * u, 600 * u, { prog: err ? 0.97 : remap(t, 0.2, 2.4) * 0.97, label: err ? 'ERROR' : 'ANALYZING', err });
      g.fillStyle = 'rgba(10,12,16,0.8)'; g.fillRect(0, 220 * u, W, 300 * u);
      kicker('รายงานระบุว่า', TX, 290 * u, t, { color: PINK });
      say('เครื่อง Edison ใช้ตรวจจริงเพียงไม่กี่รายการ', TX, 400 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      say('Theranos ปฏิเสธ บอกว่ารายงานไม่ถูกต้อง', TX, 1300 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.cream });
      say('แต่หน่วยงานรัฐเริ่มเข้าตรวจสอบ', TX, 1420 * u, t - 5.0, { size: 50 * u, weight: 800, color: PINK });
      finish(0.8);
    } },
  // ---------------- chapter 5 — 2016, everything falls
  { from: bar(38), to: bar(40), cues: Array.from({ length: 6 }, (_, i) => [0.3 + i * 0.2, 'click', 0.5]).concat([[2.5, 'thump', 0.6]]),
    draw(t) {
      paper();
      kicker('ปี 2016', TX, 300 * u, t);
      say('บริษัทประกาศยกเลิกผลตรวจ\nจากเครื่อง Edison ย้อนหลัง 2 ปี', TX, 410 * u, t - 0.1, { size: 48 * u, weight: 800 });
      for (let i = 0; i < 24; i++) { const c = i % 6, r = Math.floor(i / 6), x = 190 * u + c * 130 * u, y = 760 * u + r * 160 * u;
        tube(x, y, 120 * u, BLOOD); const at = 0.3 + i * 0.05;
        if (t > at) { const k = clamp((t - at) / 0.15); g.strokeStyle = C.red; g.lineWidth = 8 * u; g.beginPath(); g.moveTo(x - 40 * u, y - 50 * u); g.lineTo(x - 40 * u + 80 * u * k, y - 50 * u + 100 * u * k); g.stroke(); } }
      say('คาดว่าราวหลายหมื่นรายการ', TX, 1440 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(40), to: bar(42), cues: [[0.2, 'whoosh', 0.4], [1.0, 'thump', 0.8], [2.5, 'thump', 0.6]],
    draw(t) {
      paper();
      storefront(110 * u, 1180 * u, 800 * u, t, { shut: clamp(spring(t - 0.3, 'heavy')) });
      kicker('มิถุนายน 2016', TX, 300 * u, t);
      say('Walgreens ยุติความร่วมมือ', TX, 410 * u, t - 0.1, { size: 56 * u, weight: 800 });
      say('ปิดจุดตรวจเลือดทั้งหมดราว 40 แห่ง', TX, 1320 * u, t - 1.0, { size: 48 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(42), to: bar(45), cues: [[0.2, 'swish', 0.5], [2.5, 'riser', 0.4], [4.4, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 4.4, 18); g.translate(sx, sy);
      night('#0D0F14');
      const down = clamp(spring(t - 2.5, 20, 9));
      magazine(TX, 830 * u, 460 * u, t, { line: t > 4.4 ? '$0' : '$4.5B', sub: 'NET WORTH', bg: t > 4.4 ? '#BDB6A6' : '#E7E1D3' });
      text(g, money(4.5e9 * (1 - down)), TX, 1340 * u, { size: 104 * u, weight: 400, family: SERIF, color: t > 4.4 ? PINK : C.cream });
      kicker('มิถุนายน 2016 · Forbes', TX, 280 * u, t, { color: PINK });
      say('ปรับมูลค่าทรัพย์สินของเธอใหม่', TX, 1460 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.cream });
      say('จาก 4,500 ล้านดอลลาร์ เหลือ 0', TX, 1550 * u, t - 4.4, { size: 46 * u, weight: 800, color: PINK });
      finish(0.8);
    } },
  { from: bar(45), to: bar(47), cues: [[0.2, 'thump', 0.6], [1.25, 'impact', 1.1]],
    draw(t) {
      const [sx, sy] = shake(t, 1.25, 20); g.translate(sx, sy);
      paper();
      g.save(); g.translate(TX, 800 * u); g.rotate(-0.03);
      g.fillStyle = '#F7F3EA'; rrect(g, -360 * u, -280 * u, 720 * u, 520 * u, 8 * u); g.fill();
      g.strokeStyle = '#B9A97E'; g.lineWidth = 6 * u; rrect(g, -330 * u, -250 * u, 660 * u, 460 * u, 6 * u); g.stroke();
      text(g, 'CLINICAL LABORATORY', 0, -150 * u, { size: 38 * u, weight: 800, family: SANS, color: C.ink, tracking: 3 * u });
      text(g, 'CERTIFICATE', 0, -90 * u, { size: 52 * u, weight: 400, family: SERIF, color: C.ink });
      g.fillStyle = '#B9A97E'; for (let i = 0; i < 4; i++) g.fillRect(-240 * u, -20 * u + i * 44 * u, 480 * u * (0.6 + hash(i, 2) * 0.4), 6 * u);
      g.restore();
      stamp('REVOKED', TX, 820 * u, t - 1.25, { size: 120 * u, rot: -0.14 });
      kicker('กรกฎาคม 2016 · หน่วยงานกำกับ CMS', TX, 300 * u, t);
      say('เพิกถอนใบอนุญาตแล็บหลักของบริษัท', TX, 1220 * u, t - 1.25, { size: 48 * u, weight: 800 });
      say('และสั่งห้าม Holmes เป็นเจ้าของ\nหรือบริหารแล็บ 2 ปี', TX, 1340 * u, t - 2.6, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- chapter 6 — 2018
  { from: bar(47), to: bar(49), cues: [[0.2, 'thump', 0.6], [1.25, 'impact', 1.0], [2.5, 'pop', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 1.25, 18); g.translate(sx, sy);
      night('#0E1016');
      g.save(); g.translate(TX, 760 * u); g.rotate(0.03);
      g.fillStyle = '#E9E4D8'; rrect(g, -340 * u, -260 * u, 680 * u, 500 * u, 6 * u); g.fill();
      text(g, 'SECURITIES AND EXCHANGE', 0, -170 * u, { size: 34 * u, weight: 800, family: SANS, color: C.inkSoft, tracking: 2 * u });
      text(g, 'COMPLAINT', 0, -90 * u, { size: 70 * u, weight: 400, family: SERIF, color: C.ink });
      g.fillStyle = '#A9A396'; for (let i = 0; i < 5; i++) g.fillRect(-260 * u, -20 * u + i * 44 * u, 520 * u * (0.6 + hash(i, 6) * 0.4), 6 * u);
      g.restore();
      stamp('FRAUD', TX, 800 * u, t - 1.25, { size: 130 * u, rot: -0.12 });
      kicker('มีนาคม 2018 · ก.ล.ต.สหรัฐฯ (SEC)', TX, 280 * u, t, { color: PINK });
      say('กล่าวหาว่าระดมทุนกว่า 700 ล้านดอลลาร์\nด้วยข้อมูลเท็จ', TX, 1150 * u, t - 1.25, { size: 44 * u, weight: 800, color: C.cream });
      say('Holmes ยอมความ: ปรับ 500,000 ดอลลาร์\nห้ามเป็นผู้บริหารบริษัทมหาชน 10 ปี', TX, 1340 * u, t - 2.5, { size: 40 * u, weight: 800, color: PINK });
      finish(0.8);
    } },
  { from: bar(49), to: bar(52), cues: [[0.2, 'pop', 0.6], [2.5, 'pop', 0.6], [5.0, 'thump', 0.8]],
    draw(t) {
      paper();
      kicker('ปี 2018', TX, 300 * u, t);
      // book "Bad Blood" (generic cover)
      const b = clamp(spring(t - 0.2, 'heavy'));
      g.save(); g.translate(780 * u, 640 * u + (1 - b) * 500 * u); g.rotate(0.06);
      g.fillStyle = '#1A1A1A'; g.fillRect(-120 * u, -170 * u, 240 * u, 340 * u);
      drop(0, -40 * u, 110 * u, { shine: 0 });
      text(g, 'BAD BLOOD', 0, 100 * u, { size: 38 * u, weight: 800, family: SANS, color: '#F4F0E6' });
      g.restore();
      dated('พฤษภาคม', 'หนังสือ Bad Blood ของ Carreyrou ออกวางขาย', 110 * u, 520 * u, t, 0.2);
      dated('มิถุนายน', 'Holmes และ Balwani ถูกฟ้องคดีอาญา', 110 * u, 880 * u, t, 2.5);
      dated('กันยายน', 'Theranos ประกาศเลิกกิจการ', 110 * u, 1110 * u, t, 5.0, C.red);
      const k = clamp((t - 5.0) / 1.2);
      g.save(); g.globalAlpha = 1 - k * 0.8; edison(TX, 1520 * u, 300 * u, { prog: 0 }); g.restore();
      finish(0.6);
    } },
  // ---------------- chapter 7 — the trial
  { from: bar(52), to: bar(55), cues: [[0.2, 'thump', 0.6], [2.4, 'impact', 1.0], [5.0, 'thump', 0.6]],
    draw(t) {
      night('#14100C');
      // courtroom: bench panel and lamp light
      g.fillStyle = '#3A2A1E'; g.fillRect(0, 980 * u, W, 260 * u);
      g.fillStyle = '#2A1E15'; for (let i = 0; i < 8; i++) g.fillRect(40 * u + i * 130 * u, 1000 * u, 90 * u, 220 * u);
      g.fillStyle = 'rgba(255,220,160,0.08)'; g.beginPath(); g.moveTo(TX - 80 * u, 520 * u); g.lineTo(TX + 80 * u, 520 * u); g.lineTo(TX + 420 * u, 1240 * u); g.lineTo(TX - 420 * u, 1240 * u); g.fill();
      const sw = t < 2.2 ? clamp((t - 1.4) / 0.8) : 1 - clamp((t - 2.2) / 0.12);
      gavel(TX + 140 * u, 940 * u, 150 * u, sw);
      turtle(TX - 250 * u, 1240 * u, 120 * u, '#05070B', { collar: '#000' });
      kicker('2021 · ศาลรัฐบาลกลาง San Jose', TX, 300 * u, t, { color: PINK });
      say('คดีอาญาขึ้นสู่ศาล', TX, 410 * u, t - 0.2, { size: 58 * u, weight: 800, color: C.cream });
      say('Holmes ขึ้นให้การเอง', TX, 1360 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.cream });
      say('และยืนยันว่าไม่ได้ตั้งใจหลอกลวงใคร', TX, 1470 * u, t - 5.0, { size: 46 * u, weight: 800, color: PINK });
      finish();
    } },
  { from: bar(55), to: bar(58), cues: Array.from({ length: 11 }, (_, i) => [0.4 + i * 0.25, 'click', 0.5]).concat([[5.0, 'impact', 0.9]]),
    draw(t) {
      paper();
      kicker('3 มกราคม 2022 · คำตัดสินของคณะลูกขุน', TX, 300 * u, t);
      say('11 ข้อกล่าวหา', TX, 410 * u, t - 0.1, { size: 58 * u, weight: 800 });
      const kind = (i) => (i < 4 ? 0 : i < 8 ? 1 : 2);
      for (let i = 0; i < 11; i++) { const at = 0.4 + i * 0.25, p = clamp(spring(t - at, 'snappy')); if (p <= 0) continue;
        const c = i % 4, r = Math.floor(i / 4), x = TX - 300 * u + c * 200 * u, y = 640 * u + r * 190 * u, k = kind(i);
        g.save(); g.translate(x, y); g.scale(p, p);
        g.fillStyle = k === 0 ? C.red : k === 1 ? '#F7F3EA' : C.paper3; rrect(g, -80 * u, -70 * u, 160 * u, 140 * u, 14 * u); g.fill();
        if (k === 1) { g.strokeStyle = C.inkSoft; g.lineWidth = 4 * u; rrect(g, -80 * u, -70 * u, 160 * u, 140 * u, 14 * u); g.stroke(); }
        text(g, k === 0 ? 'ผิด' : k === 1 ? 'ไม่ผิด' : '?', 0, 16 * u, { size: 44 * u, weight: 800, family: THAI, color: k === 0 ? C.paper : C.ink });
        g.restore(); }
      say('ผิด 4 ข้อหา: ฉ้อโกงนักลงทุน', TX, 1260 * u, t - 3.4, { size: 48 * u, weight: 800, color: C.red });
      say('ไม่ผิด 4 ข้อหาที่เกี่ยวกับผู้ป่วย', TX, 1370 * u, t - 4.2, { size: 44 * u, weight: 800 });
      say('อีก 3 ข้อหาคณะลูกขุนตัดสินไม่ได้', TX, 1470 * u, t - 5.0, { size: 40 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------- chapter 8 — the sentence
  { from: bar(58), to: bar(60), cues: [[0.2, 'thump', 0.6], [1.25, 'impact', 0.9]],
    draw(t) {
      night('#0E1016');
      person(TX, 1050 * u, 170 * u * clamp(spring(t - 0.1, 'default')), '#05070B', { tie: '#3A0D0D' });
      kicker('กรกฎาคม 2022', TX, 300 * u, t, { color: PINK });
      say('Sunny Balwani อดีตประธานบริษัท\nและอดีตคนรักของ Holmes', TX, 410 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      say('ผิดทั้ง 12 ข้อหา', TX, 1240 * u, t - 1.25, { size: 66 * u, weight: 800, color: PINK });
      say('ภายหลังถูกตัดสินจำคุกราว 13 ปี', TX, 1370 * u, t - 2.0, { size: 46 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(60), to: bar(62), cues: Array.from({ length: 6 }, (_, i) => [0.1 + i * 0.15, 'tick', 0.5]).concat([[1.25, 'impact', 1.2]]),
    draw(t) {
      const [sx, sy] = shake(t, 1.25, 24); g.translate(sx, sy);
      night('#0E1016');
      bars(80 * u, 560 * u, W - 160 * u, 760 * u, spring(t - 1.25, 'heavy'), '#2A2D33');
      const yrs = Math.min(11, Math.floor(remap(t, 0.1, 1.0) * 11));
      g.fillStyle = 'rgba(14,16,22,0.85)'; g.fillRect(0, 760 * u, W, 300 * u);
      text(g, t < 1.25 ? `${yrs} ปี` : '11 ปี 3 เดือน', TX, 960 * u, { size: 130 * u, weight: 800, family: THAI, color: t < 1.25 ? C.cream : PINK });
      kicker('18 พฤศจิกายน 2022', TX, 300 * u, t, { color: PINK });
      say('ศาลตัดสินจำคุก Elizabeth Holmes', TX, 410 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      say('และต่อมาสั่งให้ชดใช้ร่วมกับ Balwani\n452 ล้านดอลลาร์', TX, 1380 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(62), to: bar(64), cues: [[0.2, 'thump', 0.6], [2.5, 'pop', 0.6], [3.75, 'pop', 0.6]],
    draw(t) {
      paper();
      dated('30 พ.ค. 2023', 'เข้าเรือนจำหญิงที่ Bryan รัฐเท็กซัส', 110 * u, 420 * u, t, 0.2);
      dated('มี.ค. 2026', 'ศาลลดโทษลงราว 1 ปี ตามกฎใหม่', 110 * u, 700 * u, t, 2.5);
      dated('ราวปี 2027', 'มีรายงานว่าอาจย้ายไปบ้านกึ่งวิถี', 110 * u, 980 * u, t, 3.75);
      say('ส่วนตัวเธอยังยืนยันว่าตัวเองบริสุทธิ์', TX, 1360 * u, t - 4.0, { size: 44 * u, weight: 800, color: C.red });
      text(g, 'ข้อมูล ณ ต.ค. 2026 · วันพ้นโทษอาจเปลี่ยนได้', TX, 1470 * u, { size: 30 * u, weight: 700, family: THAI, color: C.inkSoft, alpha: clamp(t - 4.0) });
      finish(0.6);
    } },
  // ---------------- closing
  { from: bar(64), to: bar(68), cues: [[0, 'thump', 0.9], [2.5, 'chime', 0.5], [7.5, 'swish', 0.4]],
    draw(t) {
      night('#08070A');
      drop(TX, 560 * u, 200 * u * clamp(spring(t - 0.1, 'playful')));
      big('THERANOS', TX, 900 * u, t - 0.3, { size: 140 * u, color: C.cream });
      const p = spring(t - 1.0, 'default');
      g.fillStyle = BLOOD; g.fillRect(TX - 330 * u * p, 960 * u, 660 * u * p, 10 * u);
      say('2003 – 2018', TX, 1060 * u, t - 1.2, { size: 56 * u, weight: 800, color: C.fog });
      say('เลือดหยดเดียว กับความเชื่อมูลค่า\n9,000 ล้านดอลลาร์', TX, 1220 * u, t - 2.5, { size: 48 * u, weight: 800, color: PINK });
      say('“แกล้งทำไปก่อน จนกว่าจะทำได้จริง”\nใช้ไม่ได้ กับผลตรวจเลือดของคน', TX, 1420 * u, t - 5.0, { size: 40 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(68), to: bar(72), cues: [[0, 'whoosh', 0.5], [2.5, 'pop', 0.6], [5.0, 'chime', 0.8]],
    draw(t) {
      night('#0D0F14');
      for (let i = 0; i < 60; i++) { const c = i % 10, r = Math.floor(i / 10); tube(140 * u + c * 80 * u, 760 * u + r * 100 * u, 70 * u, i % 7 === 0 ? '#D9A441' : BLOOD); }
      edison(TX, 1480 * u, 360 * u, { prog: 0.5 + 0.5 * Math.sin(t * 2) ** 2, label: '???' });
      g.fillStyle = 'rgba(13,15,20,0.85)'; g.fillRect(0, 220 * u, W, 330 * u);
      say('ถ้าคุณเป็นนักลงทุนในปี 2014', TX, 310 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.cream });
      say('คุณจะเชื่อเธอไหม?', TX, 420 * u, t - 1.2, { size: 60 * u, weight: 800, color: PINK });
      say('คอมเมนต์บอกได้เลย', TX, 1560 * u, t - 2.5, { size: 48 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
];
