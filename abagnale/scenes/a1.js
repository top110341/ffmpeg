// Act 1 — the legend as he told it (0:00–1:20, bars 0–32).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, rrect, text, typewriter, shake } from './kit.js';
import { pilot, cheque, bars, planeTop, NAVY, GOLD } from './props.js';

export default () => [
  // ---------------- Chapter 1 — the hook
  { from: bar(0), to: bar(2), cues: [[0, 'whoosh', 0.6], [0.8, 'thump', 0.7], [1.6, 'impact', 0.9]],
    draw(t) {
      night(NAVY);
      for (let i = 0; i < 6; i++) { const s = spring(t - 0.1 - i * 0.08, 'default'); cheque(TX + (hash(i, 2) - 0.5) * 500 * u, 520 * u + i * 60 * u - (1 - s) * 900 * u, 520 * u, (hash(i, 3) - 0.5) * 0.6); }
      pilot(TX, 1250 * u + (1 - spring(t - 0.5, 'heavy')) * 500 * u, 220 * u, '#0A1226');
      big('$2,500,000', TX, 1430 * u, t - 1.6, { size: 150 * u, color: C.red });
      say('เด็กหนุ่มวัย 16 ที่หลอกคนได้ทั้งโลก?', TX, 1540 * u, t - 2.0, { size: 46 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(2), to: bar(4), cues: [[0, 'swish', 0.5], [0.6, 'pop', 0.5], [1.2, 'pop', 0.5], [1.8, 'pop', 0.5], [2.5, 'thump', 0.6]],
    draw(t) {
      paper();
      const roles = [['นักบิน', NAVY], ['หมอ', '#4D6B6A'], ['ทนาย', '#3A2F28'], ['อาจารย์', '#5A4630']];
      roles.forEach(([r, c], i) => { const s = spring(t - 0.6 * i, 'playful'); if (s <= 0) return;
        const x = TX - 330 * u + i * 220 * u; person(x, 900 * u, 90 * u * s, c);
        text(g, r, x, 1020 * u, { size: 44 * u, weight: 800, family: THAI, color: C.ink, alpha: clamp(s) }); });
      say('Frank Abagnale', TX, 360 * u, t - 0.1, { size: 80 * u, weight: 400, family: SERIF });
      say('ชายที่บอกว่าเคยปลอมตัวมาแล้วทุกอาชีพ', TX, 1300 * u, t - 2.5, { size: 48 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1], [3.2, 'type', 0.4]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 400 * u, 90 * u, 14 * u); g.fill();
      text(g, 'BASED ON A TRUE STORY', 270 * u, 472 * u, { size: 28 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 3 * u });
      g.restore();
      say('เรื่องจริงที่กลายเป็นหนังฮอลลีวูด', TX, 760 * u, t - 0.25, { size: 58 * u, weight: 800 });
      stamp('TRUE?', TX, 1080 * u, t - 2.5, { size: 180 * u, rot: -0.12 });
      say('แต่ถ้าเรื่องที่เขาเล่า\nคือการหลอกครั้งใหญ่ที่สุดล่ะ?', TX, 1380 * u, t - 3.2, { size: 42 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------- Chapter 2 — the book
  { from: bar(6), to: bar(8), cues: [[0.2, 'thump', 0.6], [1.25, 'swish', 0.6]],
    draw(t) {
      night('#0E0F14');
      const s = spring(t - 0.1, 'heavy');
      g.save(); g.translate(TX, 820 * u + (1 - s) * 700 * u); g.rotate(-0.05);
      g.fillStyle = '#C8321E'; rrect(g, -260 * u, -360 * u, 520 * u, 720 * u, 8 * u); g.fill();
      text(g, 'CATCH ME', 0, -120 * u, { size: 96 * u, weight: 800, family: 'Inter, sans-serif', color: '#F7F2E6' });
      text(g, 'IF YOU CAN', 0, -20 * u, { size: 70 * u, weight: 800, family: 'Inter, sans-serif', color: '#F7F2E6' });
      text(g, 'Frank W. Abagnale', 0, 260 * u, { size: 44 * u, weight: 400, family: SERIF, color: '#F7F2E6' });
      g.restore();
      kicker('1980 · อัตชีวประวัติ', TX, 300 * u, t, { color: C.red });
      say('เล่าชีวิตช่วงอายุ 16–21 ปี', TX, 1350 * u, t - 1.25, { size: 56 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(8), to: bar(11), cues: [[0.2, 'whoosh', 0.7], [2.5, 'pop', 0.6], [5.0, 'thump', 0.6]],
    draw(t) {
      night('#0B1630');
      for (let i = 0; i < 30; i++) { g.fillStyle = '#F7F2E6'; g.globalAlpha = 0.3 + hash(i, 1) * 0.5; g.fillRect(hash(i, 2) * W, hash(i, 3) * 700 * u, 2 * u, 2 * u); }
      g.globalAlpha = 1;
      const p = remap(t, 0, 7.5);
      planeTop(-200 * u + p * (W + 400 * u), 900 * u - Math.sin(p * Math.PI) * 120 * u, 140 * u, Math.PI / 2 - Math.cos(p * Math.PI) * 0.3, '#E6E8EE', '777');
      pilot(TX, 1480 * u, 200 * u, '#0A1226');
      kicker('เขาอ้างว่า', TX, 300 * u, t, { color: C.red });
      say('ปลอมตัวเป็นนักบินสายการบิน Pan Am', TX, 400 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      say('บินฟรีกว่า 250 เที่ยว · 26 ประเทศ', TX, 510 * u, t - 2.5, { size: 46 * u, weight: 700, color: C.cream });
      say('ระยะทางกว่า 1.6 ล้านกิโลเมตร', TX, 610 * u, t - 5.0, { size: 46 * u, weight: 700, color: GOLD });
      finish(0.8);
    } },
  { from: bar(11), to: bar(14), cues: [[0.2, 'pop', 0.6], [2.5, 'pop', 0.6], [5.0, 'pop', 0.6]],
    draw(t) {
      paper();
      kicker('และยังอ้างว่า', TX, 300 * u, t);
      [['เป็นหมอเด็กในโรงพยาบาลที่จอร์เจีย', 0.2], ['สอบผ่านเนติบัณฑิต ทำงานเป็นทนาย', 2.5], ['สอนวิชาสังคมวิทยาในมหาวิทยาลัย', 5.0]].forEach(([s, at], i) => {
        const p = spring(t - at, 'snappy'); if (p <= 0) return;
        const y = 560 * u + i * 260 * u;
        g.save(); g.translate((1 - p) * W, 0);
        g.fillStyle = C.paper2; rrect(g, 90 * u, y - 90 * u, W - 220 * u, 180 * u, 14 * u); g.fill();
        text(g, s, TX, y + 16 * u, { size: 44 * u, weight: 800, family: THAI, color: C.ink });
        g.restore(); });
      say('ทั้งหมดก่อนอายุ 21', TX, 1400 * u, t - 6.0, { size: 58 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- Chapter 3 — the cheques
  { from: bar(14), to: bar(17), cues: Array.from({ length: 12 }, (_, i) => [0.2 + i * 0.25, 'swish', 0.35]).concat([[5.0, 'impact', 0.9]]),
    draw(t) {
      const [sx, sy] = shake(t, 5.0, 16); g.translate(sx, sy);
      night(NAVY);
      for (let i = 0; i < 26; i++) { const at = 0.2 + i * 0.13, s = spring(t - at, 'snappy'); if (s <= 0) continue;
        cheque(TX + (hash(i, 5) - 0.5) * 600 * u, 860 * u + (hash(i, 6) - 0.5) * 500 * u - (1 - s) * 800 * u, 420 * u, (hash(i, 7) - 0.5) * 0.8, { amount: `$${(100 + Math.floor(hash(i, 8) * 900))}.00` }); }
      const n = Math.round(2.5 * clamp(spring(t - 0.2, 30, 11) * 1.004) * 10) / 10;
      g.fillStyle = 'rgba(20,33,61,0.75)'; if (t > 4.6) g.fillRect(0, 1260 * u, W, 300 * u);
      text(g, `$${n.toFixed(1)} ล้าน`, TX, 1420 * u, { size: 140 * u, weight: 400, family: SERIF, color: C.red, alpha: clamp((t - 4.6) / 0.2) });
      kicker('เขาอ้างว่า', TX, 300 * u, t, { color: C.red });
      say('ขึ้นเงินเช็คปลอมใน 26 ประเทศ', TX, 400 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(17), to: bar(19), cues: [[0.2, 'thump', 0.6], [1.25, 'impact', 0.9]],
    draw(t) {
      night('#0E0F14');
      bars(80 * u, 500 * u, W - 160 * u, 900 * u, spring(t - 0.2, 'heavy'));
      kicker('1969 · ฝรั่งเศส', TX, 330 * u, t, { color: C.red });
      say('ถูกจับในที่สุด', TX, 1300 * u, t - 1.25, { size: 70 * u, weight: 800, color: C.cream });
      say('เขาเล่าว่าติดคุกทั้งฝรั่งเศส\nสวีเดน และสหรัฐฯ', TX, 1420 * u, t - 2.5, { size: 46 * u, weight: 700, color: C.fog });
      finish();
    } },
  { from: bar(19), to: bar(22), cues: [[0.2, 'click', 0.7], [2.5, 'chime', 0.5]],
    draw(t) {
      paper();
      g.save(); g.translate(TX, 760 * u); g.rotate(-0.03);
      g.fillStyle = '#F7F1E3'; rrect(g, -380 * u, -260 * u, 760 * u, 520 * u, 6 * u); g.fill();
      g.fillStyle = '#1B3A6B'; g.beginPath(); g.arc(-230 * u, -110 * u, 80 * u, 0, 7); g.fill();
      text(g, 'FBI', -230 * u, -86 * u, { size: 64 * u, weight: 800, family: 'Inter, sans-serif', color: '#F7F1E3' });
      typewriter('CONSULTANT', -110 * u, -90 * u, t - 0.2, { size: 56 * u, weight: 700, family: 'Inter, sans-serif', color: C.ink, cps: 12 });
      typewriter('FRAUD PREVENTION', -110 * u, -20 * u, t - 1.0, { size: 40 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, cps: 14 });
      g.restore();
      say('จากนักต้มตุ๋น กลายเป็นผู้เชี่ยวชาญ\nด้านป้องกันการฉ้อโกง', TX, 1180 * u, t - 1.5, { size: 52 * u, weight: 800 });
      say('บรรยายให้ FBI และธนาคารทั่วโลก\nนานหลายสิบปี', TX, 1420 * u, t - 3.5, { size: 44 * u, weight: 700, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------- Chapter 4 — Hollywood
  { from: bar(22), to: bar(25), cues: [[0.2, 'riser', 0.5], [1.25, 'impact', 1.0], [3.75, 'chime', 0.5]],
    draw(t) {
      night('#08070A');
      // film strip
      g.fillStyle = '#1B1A1F'; g.fillRect(0, 600 * u, W, 520 * u);
      for (let i = 0; i < 14; i++) { const x = ((i * 120 * u - t * 160 * u) % (W + 120 * u) + W + 120 * u) % (W + 120 * u) - 60 * u; g.fillStyle = '#F2EEE4'; g.fillRect(x, 620 * u, 50 * u, 34 * u); g.fillRect(x, 1066 * u, 50 * u, 34 * u); }
      g.fillStyle = '#2C2B33'; g.fillRect(0, 680 * u, W, 360 * u);
      big('2002', TX, 960 * u, t - 1.25, { size: 240 * u, color: C.cream });
      kicker('สตีเวน สปีลเบิร์ก กำกับ', TX, 330 * u, t, { color: C.red });
      say('Leonardo DiCaprio · Tom Hanks', TX, 440 * u, t - 0.3, { size: 52 * u, weight: 800, color: C.cream });
      say('หนังทำรายได้ทั่วโลกกว่า 350 ล้านดอลลาร์', TX, 1300 * u, t - 3.75, { size: 46 * u, weight: 800, color: GOLD });
      finish();
    } },
  { from: bar(25), to: bar(28), cues: [[0.2, 'pop', 0.5], [1.2, 'pop', 0.5], [2.2, 'pop', 0.5], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      [['หนังสือขายดี', 0.2], ['หนังฮอลลีวูด', 1.2], ['ละครเพลงบรอดเวย์ (2011)', 2.2], ['งานบรรยายทั่วโลก', 3.2]].forEach(([s, at], i) => {
        const p = spring(t - at, 'playful'); if (p <= 0) return;
        g.save(); g.translate(TX, 560 * u + i * 190 * u); g.scale(p, p);
        g.fillStyle = i % 2 ? C.ink : C.red; rrect(g, -360 * u, -70 * u, 720 * u, 140 * u, 70 * u); g.fill();
        text(g, s, 0, 18 * u, { size: 48 * u, weight: 800, family: THAI, color: C.paper }); g.restore(); });
      say('ทั้งหมดสร้างจากเรื่องเล่าของเขา', TX, 1420 * u, t - 5.0, { size: 54 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(28), to: bar(32), cues: [[0.2, 'whoosh', 0.5], [5.0, 'riser', 0.6], [7.5, 'impact', 0.9]],
    draw(t) {
      night('#08070A');
      say('ไม่มีใครตั้งคำถาม', TX, 700 * u, t - 0.3, { size: 70 * u, weight: 800, color: C.cream });
      say('…จนกระทั่งมีคนไปเปิดบันทึกเก่า', TX, 1000 * u, t - 3.0, { size: 58 * u, weight: 800, color: C.red });
      finish();
    } },
];
