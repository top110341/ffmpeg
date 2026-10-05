// Act 1 — the beach, the man with no name, the slip (0:00–1:20, bars 0–32).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, rrect, text, typewriter, topScrim, shake } from './kit.js';
import { beach, seawall, seated, slip, suitcase, mapAus, PLACE, SAND } from './props.js';

export default () => [
  // ---------------- Chapter 1 — "it is finished"
  { from: bar(0), to: bar(2), cues: [[0, 'whoosh', 0.5], [1.0, 'impact', 0.8], [1.8, 'type', 0.4]],
    draw(t) {
      beach(t);
      const s = spring(t - 0.2, 'heavy');
      slip(TX + noise(t * 0.7, 2) * 30 * u, 700 * u + (1 - s) * -500 * u + Math.sin(t * 1.3) * 14 * u, 300 * u * (0.6 + 0.4 * s), -0.08 + Math.sin(t) * 0.05);
      say('“Tamám Shud” แปลว่า', TX, 1350 * u, t - 1.0, { size: 56 * u, weight: 700, color: C.ink });
      say('“จบแล้ว”', TX, 1490 * u, t - 1.8, { size: 96 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(2), to: bar(4), cues: [[0, 'thump', 0.6], [2.5, 'swish', 0.5]],
    draw(t) {
      beach(t + 5);
      seawall(0, 900 * u, W, 300 * u);
      g.fillStyle = SAND; g.fillRect(0, 1200 * u, W, H - 1200 * u);
      seated(TX - 200 * u, 1230 * u, 230 * u * spring(t - 0.1, 'heavy'));
      const y = say('ชายนิรนามที่ถูกพบบนชายหาด', TX, 330 * u, t - 0.2, { size: 58 * u, weight: 800, color: C.ink });
      say('ไม่มีใครรู้ว่าเขาเป็นใคร\nตายอย่างไร หรือมาที่นี่ทำไม', TX, 1400 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.ink });
      finish(0.6);
    } },
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1], [3.2, 'type', 0.4]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 420 * u, 90 * u, 14 * u); g.fill();
      text(g, 'SA POLICE · TAMAM SHUD', 280 * u, 472 * u, { size: 30 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 3 * u });
      g.restore();
      say('ปริศนาที่ค้างคามา 78 ปี', TX, 760 * u, t - 0.25, { size: 66 * u, weight: 800 });
      stamp('UNSOLVED', TX, 1080 * u, t - 2.5, { size: 150 * u, rot: -0.12 });
      say('คดีลึกลับที่สุดคดีหนึ่งของออสเตรเลีย', TX, 1380 * u, t - 3.2, { size: 46 * u, weight: 600, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------- Chapter 2 — 1 December 1948
  { from: bar(6), to: bar(7), cues: Array.from({ length: 5 }, (_, i) => [i * 0.18, 'tick', 0.6]).concat([[1.0, 'thump', 0.6]]),
    draw(t) {
      paper();
      kicker('ธันวาคม 1948', TX, 420 * u, t);
      const d = ['27', '28', '29', '30', '01'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.18), t, { size: 360 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('เช้าวันแรกของฤดูร้อน', TX, 1240 * u, t - 1.0, { size: 54 * u, weight: 700 });
      finish(0.6);
    } },
  { from: bar(7), to: bar(9), cues: [[0, 'whoosh', 0.6], [2.5, 'pop', 0.9]],
    draw(t) {
      const cam = { lat: track(t, [[0, -27], [0.1, -34.95]], 'heavy'), lon: track(t, [[0, 134], [0.1, 138.5]], 'heavy'), z: track(t, [[0, 26], [0.1, 380]], 'heavy') * u };
      const P = mapAus(cam); topScrim();
      pin(...P(PLACE.adelaide), t - 1.2, { label: 'Adelaide', side: 1, color: C.fog });
      pin(...P(PLACE.somerton), t - 2.5, { label: 'Somerton Beach', side: -1 });
      kicker('ออสเตรเลียใต้', TX, 250 * u, t, { color: C.red });
      say('ชายหาด Somerton\nชานเมือง Adelaide', TX, 345 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(9), to: bar(11), cues: [[0.2, 'thump', 0.5], [1.25, 'pop', 0.5], [1.875, 'pop', 0.5], [2.5, 'pop', 0.5], [3.125, 'pop', 0.5]],
    draw(t) {
      beach(t + 9, { horizon: 640 * u, shore: 900 * u });
      seawall(0, 900 * u, W, 220 * u);
      g.fillStyle = SAND; g.fillRect(0, 1120 * u, W, H - 1120 * u);
      seated(TX - 250 * u, 1150 * u, 200 * u);
      const notes = [['สูทเรียบร้อย รองเท้าขัดเงา', 1.25], ['บุหรี่ที่สูบไปครึ่งมวน', 1.875], ['ไม่มีกระเป๋าเงิน ไม่มีบัตรใด ๆ', 2.5], ['ป้ายยี่ห้อเสื้อผ้า ถูกตัดออกทั้งหมด', 3.125]];
      notes.forEach(([s, at], i) => { if (t < at) return; text(g, s, 120 * u, 1300 * u + i * 76 * u, { size: 42 * u, weight: 800, family: THAI, color: i === 3 ? C.red : C.ink, align: 'left', alpha: clamp((t - at) / 0.15) }); });
      say('ศพชายวัยราว 40 พิงกำแพงกันคลื่น', TX, 330 * u, t - 0.2, { size: 52 * u, weight: 800, color: C.ink });
      finish(0.6);
    } },
  { from: bar(11), to: bar(14), cues: [[0.2, 'thump', 0.5], [2.5, 'thump', 0.6], [5.0, 'impact', 0.8]],
    draw(t) {
      paper();
      kicker('ผลชันสูตร', TX, 330 * u, t);
      const rows = [['ร่องรอยการทำร้าย', 'ไม่มี'], ['อวัยวะภายใน', 'คั่งเลือดผิดปกติ'], ['สารพิษที่ตรวจพบ', 'ไม่พบ']];
      rows.forEach(([a, b], i) => { const at = 0.2 + i * 1.1; if (t < at) return;
        const y = 560 * u + i * 170 * u;
        text(g, a, 120 * u, y, { size: 50 * u, weight: 700, family: THAI, color: C.inkSoft, align: 'left', alpha: clamp((t - at) / 0.15) });
        text(g, b, W - 160 * u, y, { size: 54 * u, weight: 800, family: THAI, color: C.red, align: 'right', alpha: clamp((t - at - 0.3) / 0.15) });
        g.fillStyle = C.paper3; g.fillRect(120 * u, y + 40 * u, W - 280 * u, 3 * u); });
      say('แพทย์สงสัยว่าเป็นยาพิษ\nแต่หาหลักฐานไม่พบ', TX, 1200 * u, t - 5.0, { size: 56 * u, weight: 800 });
      finish(0.6);
    } },
  // ---------------- Chapter 3 — the suitcase
  { from: bar(14), to: bar(16), cues: [[0.2, 'swish', 0.6], [2.5, 'thump', 0.6]],
    draw(t) {
      paper();
      kicker('ในกระเป๋ากางเกง', TX, 330 * u, t);
      [['ตั๋วรถไฟ', 'ซื้อแล้ว ไม่ได้ใช้'], ['ตั๋วรถเมล์', 'ใช้แล้ว'], ['หมากฝรั่ง · ไม้ขีด · หวี', '']].forEach(([a, b], i) => {
        const s = spring(t - 0.2 - i * 0.5, 'playful'); if (s <= 0) return;
        g.save(); g.translate(TX + (i - 1) * 290 * u, 820 * u); g.rotate((i - 1) * 0.08); g.scale(s, s);
        g.fillStyle = i < 2 ? '#E9DFC6' : '#F4EEDF'; rrect(g, -130 * u, -180 * u, 260 * u, 360 * u, 8 * u); g.fill();
        g.strokeStyle = C.paper3; g.setLineDash([8 * u, 8 * u]); g.lineWidth = 3 * u; g.strokeRect(-110 * u, -160 * u, 220 * u, 320 * u); g.setLineDash([]);
        text(g, a, 0, -10 * u, { size: 36 * u, weight: 800, family: THAI, color: C.ink });
        if (b) text(g, b, 0, 50 * u, { size: 30 * u, weight: 600, family: THAI, color: C.red });
        g.restore(); });
      say('ไม่มีอะไรบอกได้ว่าเขาเป็นใคร', TX, 1300 * u, t - 2.5, { size: 54 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(16), to: bar(19), cues: [[0.2, 'thump', 0.5], [1.4, 'click', 0.7], [3.75, 'impact', 0.8]],
    draw(t) {
      paper();
      kicker('มกราคม 1949 · สถานีรถไฟ Adelaide', TX, 330 * u, t);
      suitcase(TX, 800 * u, 300 * u * spring(t - 0.2, 'heavy'));
      say('พบกระเป๋าเดินทางที่ถูกฝากไว้\nเมื่อ 30 พ.ย. 1948 วันก่อนพบศพ', TX, 1180 * u, t - 1.4, { size: 50 * u, weight: 800 });
      say('ป้ายบนเสื้อผ้า ถูกตัดออกทั้งหมดอีกครั้ง', TX, 1420 * u, t - 3.75, { size: 48 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(19), to: bar(22), cues: [[0.3, 'type', 0.6], [2.5, 'thump', 0.6]],
    draw(t) {
      paper();
      // a tie with a name tag
      g.save(); g.translate(TX - 120 * u, 760 * u); g.rotate(-0.2 * spring(t, 'default'));
      g.fillStyle = '#3B4A63'; g.beginPath(); g.moveTo(-50 * u, -300 * u); g.lineTo(50 * u, -300 * u); g.lineTo(70 * u, 250 * u); g.lineTo(0, 330 * u); g.lineTo(-70 * u, 250 * u); g.closePath(); g.fill();
      g.restore();
      g.save(); g.translate(TX + 170 * u, 820 * u); g.rotate(0.06);
      g.fillStyle = '#F4EEDF'; g.fillRect(-180 * u, -60 * u, 360 * u, 120 * u);
      typewriter('T. KEANE', -140 * u, 22 * u, t - 0.3, { size: 64 * u, weight: 400, family: '"Instrument Serif"', color: C.ink, cps: 8 });
      g.restore();
      say('มีเพียงชื่อ “T. Keane” บนเนกไท', TX, 330 * u, t - 0.1, { size: 54 * u, weight: 800 });
      say('ตำรวจตามหาจนทั่ว\nไม่พบใครชื่อนี้ที่หายตัวไป', TX, 1300 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- Chapter 4 — the hidden pocket
  { from: bar(22), to: bar(25), cues: [[0.2, 'swish', 0.6], [1.25, 'pop', 0.8], [3.75, 'impact', 0.9]],
    draw(t) {
      paper();
      // trouser fob pocket (stitched rectangle) that a slip slides out of
      g.fillStyle = '#4A4F5C'; g.fillRect(0, 520 * u, W, 700 * u);
      g.strokeStyle = '#8D93A1'; g.lineWidth = 4 * u; g.setLineDash([14 * u, 10 * u]); g.strokeRect(TX - 200 * u, 700 * u, 400 * u, 300 * u); g.setLineDash([]);
      const out = spring(t - 1.25, 'default');
      slip(TX, 860 * u - out * 330 * u, 220 * u, -0.05);
      g.fillStyle = '#4A4F5C'; g.fillRect(TX - 210 * u, 860 * u, 420 * u, 360 * u);
      g.strokeStyle = '#8D93A1'; g.setLineDash([14 * u, 10 * u]); g.beginPath(); g.moveTo(TX - 200 * u, 860 * u); g.lineTo(TX + 200 * u, 860 * u); g.stroke(); g.setLineDash([]);
      kicker('หลายเดือนต่อมา', TX, 330 * u, t);
      say('พบกระดาษม้วนเล็ก ๆ\nซ่อนในกระเป๋าลับของกางเกง', TX, 1330 * u, t - 1.25, { size: 50 * u, weight: 800 });
      say('ฉีกมาจากหนังสือบทกวีเปอร์เซีย', TX, 1550 * u, t - 3.75, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(25), to: bar(28), cues: [[0.2, 'thump', 0.6], [2.5, 'chime', 0.5]],
    draw(t) {
      night('#14100C');
      g.save(); g.translate(TX, 820 * u);
      g.fillStyle = '#F3ECD8'; rrect(g, -330 * u, -420 * u, 660 * u, 840 * u, 6 * u); g.fill();
      g.fillStyle = 'rgba(22,19,15,0.18)'; for (let i = 0; i < 12; i++) g.fillRect(-250 * u, -330 * u + i * 44 * u, (420 - (i % 3) * 60) * u, 12 * u);
      const tear = spring(t - 2.5, 'snappy');
      g.save(); g.translate(0, 300 * u + tear * 140 * u); g.rotate(tear * 0.12);
      g.fillStyle = '#F3ECD8'; g.fillRect(-180 * u, -40 * u, 360 * u, 80 * u);
      text(g, 'Tamám Shud', 0, 18 * u, { size: 56 * u, weight: 400, family: '"Instrument Serif"', color: C.ink });
      g.restore();
      g.restore();
      kicker('Rubaiyat of Omar Khayyam', TX, 300 * u, t, { color: C.red });
      say('สองคำสุดท้ายของหนังสือ', TX, 1450 * u, t - 0.6, { size: 54 * u, weight: 800, color: C.cream });
      say('บทกวีว่าด้วยชีวิต และการยอมรับความตาย', TX, 1550 * u, t - 2.5, { size: 42 * u, weight: 600, color: C.fog });
      finish();
    } },
  { from: bar(28), to: bar(32), cues: [[0.2, 'whoosh', 0.5], [5.0, 'thump', 0.6]],
    draw(t) {
      night('#14100C');
      const r = track(t, [[0, 0.2], [0.2, 1]], 'heavy');
      g.save(); g.translate(TX, 800 * u); g.scale(r, r); slip(0, 0, 360 * u, -0.04); g.restore();
      say('ตำรวจเผยแพร่ภาพไปทั่วประเทศ', TX, 330 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      say('ตามหาหนังสือเล่มที่ถูกฉีกหน้านี้', TX, 1260 * u, t - 1.5, { size: 54 * u, weight: 800, color: C.cream });
      say('แล้ววันหนึ่ง มีคนเดินเข้ามาที่สถานีตำรวจ', TX, 1400 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.red });
      finish();
    } },
];
