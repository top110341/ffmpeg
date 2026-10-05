// Act 2 — Monday, the mistakes, the underworld, the money that never came back (1:20–3:00, bars 32–72).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake } from './kit.js';
import { section, brick, truck, mapBrazil, PLACE, XS, SOIL, GREEN, NOTE } from './props.js';

export default () => [
  // ---------------- Chapter 5 — Monday morning
  { from: bar(32), to: bar(34), cues: [[0.2, 'click', 0.7], [1.25, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 1.25, 20); g.translate(sx, sy);
      section(t, 1, { breach: 1, lit: 0.3 });
      kicker('จันทร์ 8 ส.ค. 2005 · เช้า', TX, 250 * u, t, { color: C.red });
      say('พนักงานเปิดห้องนิรภัย', TX, 345 * u, t - 0.2, { size: 56 * u, weight: 800, color: C.cream });
      say('เจอรูบนพื้น และตู้ที่ว่างเปล่า', TX, 1500 * u, t - 1.25, { size: 52 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(34), to: bar(37), cues: [[0.2, 'thump', 0.6], [2.5, 'thump', 0.6], [5.0, 'impact', 0.8]],
    draw(t) {
      paper();
      kicker('ปัญหาใหญ่ของตำรวจ', TX, 300 * u, t);
      for (let i = 0; i < 12; i++) { const s = spring(t - 0.2 - i * 0.06, 'snappy'); if (s <= 0) continue;
        g.save(); g.translate(TX - 300 * u + (i % 4) * 200 * u, 620 * u + Math.floor(i / 4) * 130 * u); g.scale(s, s);
        g.fillStyle = NOTE; g.fillRect(-90 * u, -40 * u, 180 * u, 80 * u);
        text(g, '?????????', 0, 10 * u, { size: 26 * u, weight: 700, family: 'Inter, sans-serif', color: '#3E4A2E' }); g.restore(); }
      say('เป็นธนบัตรใช้แล้ว เลขไม่เรียงกัน', TX, 1170 * u, t - 2.5, { size: 50 * u, weight: 800 });
      say('ไม่ได้บันทึกเลขไว้ ตามรอยแทบไม่ได้', TX, 1290 * u, t - 5.0, { size: 50 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(37), to: bar(40), cues: [[0.2, 'whoosh', 0.5], [2.5, 'thump', 0.6], [5.0, 'thump', 0.6]],
    draw(t) {
      night('#0B1420');
      section(t, 1, { breach: 1, lit: 0 });
      g.fillStyle = 'rgba(11,20,32,0.55)'; g.fillRect(0, 0, W, H);
      kicker('ในบ้านเช่าหลังนั้น', TX, 300 * u, t, { color: C.red });
      say('ว่างเปล่า', TX, 420 * u, t - 0.2, { size: 70 * u, weight: 800, color: C.cream });
      say('พวกเขาโรยปูนขาวทิ้งไว้ทั่วบ้าน\nเพื่อลบลายนิ้วมือ', TX, 1470 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- Chapter 6 — eleven cars in cash
  { from: bar(40), to: bar(43), cues: Array.from({ length: 11 }, (_, i) => [0.2 + i * 0.15, 'pop', 0.4]).concat([[3.75, 'thump', 0.7]]),
    draw(t) {
      paper();
      for (let i = 0; i < 11; i++) { const s = spring(t - 0.2 - i * 0.15, 'playful'); if (s <= 0) continue;
        const c = i % 4, r = Math.floor(i / 4), x = TX - 300 * u + c * 200 * u, y = 640 * u + r * 170 * u;
        g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = ['#C8321E', '#16130F', '#5D7083'][i % 3];
        rrect(g, -80 * u, -30 * u, 160 * u, 50 * u, 16 * u); g.fill(); rrect(g, -45 * u, -60 * u, 90 * u, 40 * u, 12 * u); g.fill();
        g.fillStyle = '#16130F'; g.beginPath(); g.arc(-48 * u, 22 * u, 16 * u, 0, 7); g.fill(); g.beginPath(); g.arc(48 * u, 22 * u, 16 * u, 0, 7); g.fill(); g.restore(); }
      kicker('ความผิดพลาดครั้งแรก', TX, 300 * u, t);
      say('สมาชิกแก๊งซื้อรถ 11 คัน\nจ่ายด้วยเงินสดทั้งหมด', TX, 1220 * u, t - 1.0, { size: 54 * u, weight: 800 });
      say('ใครจะซื้อรถด้วยเงินสดขนาดนั้น?', TX, 1460 * u, t - 3.75, { size: 48 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(43), to: bar(46), cues: [[0.2, 'whoosh', 0.6], [3.75, 'impact', 1.0]],
    draw(t) {
      const cam = { lat: -12.5, lon: -41.5, z: 46 * u };
      const P = mapBrazil(cam); topScrim();
      const pts = [P(PLACE.fortaleza), P([-9, -40.5]), P([-15, -42.5]), P(PLACE.mg)];
      const h = path(pts, remap(t, 0.3, 3.6), { color: C.red, width: 5 * u, dash: [14 * u, 12 * u] });
      truck(h.x, h.y - 20 * u, 70 * u, '#E6E8EE', 3);
      pin(...P(PLACE.fortaleza), 1, { label: 'Fortaleza', side: 1, color: C.fog });
      pin(...P(PLACE.mg), t - 3.75, { label: 'Minas Gerais', side: 1 });
      kicker('ร้านขายรถแจ้งตำรวจ', TX, 250 * u, t, { color: C.red });
      say('ตำรวจสกัดรถบรรทุกขนรถยนต์ได้\nห่างออกไปเกือบ 2,000 กม.', TX, 345 * u, t - 0.3, { size: 48 * u, weight: 800, color: C.cream });
      say('พบเงินหลายล้านเรียลซ่อนในรถ', TX, 1520 * u, t - 3.75, { size: 50 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  // ---------------- Chapter 7 — the underworld turns
  { from: bar(46), to: bar(50), cues: [[0.2, 'riser', 0.4], [2.5, 'thump', 0.7], [5.0, 'thump', 0.7], [7.5, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 7.5, 18); g.translate(sx, sy);
      night('#08070A');
      for (let i = 0; i < 7; i++) { const s = spring(t - 0.2 - i * 0.2, 'default'); person(TX - 360 * u + i * 120 * u, 1000 * u, 60 * u * s, i === 3 ? C.red : '#2A2D33'); }
      say('ข่าวเงินก้อนโตแพร่ไปทั่วโลกใต้ดิน', TX, 330 * u, t - 0.1, { size: 50 * u, weight: 800, color: C.cream });
      say('แก๊งอื่นลักพาตัวคนร้ายบางคน\nเพื่อเรียกค่าไถ่จากเงินที่ขโมยมา', TX, 1200 * u, t - 2.5, { size: 48 * u, weight: 800, color: C.cream });
      say('ต.ค. 2005: ผู้ต้องสงสัยว่าเป็นหัวหน้าทีม\nถูกพบเป็นศพ', TX, 1450 * u, t - 7.5, { size: 46 * u, weight: 800, color: C.red });
      finish();
    } },
  // ---------------- Chapter 8 — arrests and the missing millions
  { from: bar(50), to: bar(53), cues: Array.from({ length: 20 }, (_, i) => [0.2 + i * 0.12, 'pop', 0.25]).concat([[5.0, 'thump', 0.6]]),
    draw(t) {
      paper();
      for (let i = 0; i < 120; i++) { const at = 0.2 + i * 0.025; if (t < at) break;
        const c = i % 12, r = Math.floor(i / 12); g.fillStyle = C.inkSoft; g.beginPath(); g.arc(TX - 330 * u + c * 60 * u, 560 * u + r * 60 * u, 16 * u, 0, 7); g.fill(); }
      kicker('ในหลายปีต่อมา', TX, 330 * u, t);
      say('ถูกจับและตัดสินลงโทษกว่า 100 คน', TX, 1260 * u, t - 3.0, { size: 54 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(53), to: bar(57), cues: [[0.2, 'thump', 0.6], [2.5, 'thump', 0.6], [5.0, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 5.0, 18); g.translate(sx, sy);
      night('#0B1420');
      // a bar: stolen vs recovered
      const W1 = W - 240 * u, x0 = 120 * u;
      g.fillStyle = '#2A3446'; rrect(g, x0, 760 * u, W1, 120 * u, 14 * u); g.fill();
      const rec = clamp(spring(t - 2.5, 'heavy')) * 0.3;
      g.fillStyle = NOTE; rrect(g, x0, 760 * u, W1 * rec, 120 * u, 14 * u); g.fill();
      text(g, 'ที่ขโมยไป R$164 ล้าน', x0, 730 * u, { size: 40 * u, weight: 800, family: THAI, color: C.cream, align: 'left' });
      text(g, 'ได้คืน', x0 + 20 * u, 840 * u, { size: 38 * u, weight: 800, family: THAI, color: '#1B2A12', align: 'left', alpha: clamp((t - 2.7) / 0.2) });
      say('เงินที่กู้คืนได้ ไม่ถึงครึ่ง', TX, 1120 * u, t - 2.5, { size: 60 * u, weight: 800, color: C.cream });
      say('อีกนับร้อยล้านเรียล ไม่มีใครรู้ว่าอยู่ที่ไหน', TX, 1250 * u, t - 5.0, { size: 48 * u, weight: 800, color: C.red });
      text(g, '* ตัวเลขเงินที่ได้คืนแตกต่างกันตามแต่ละแหล่งข้อมูล', TX, 1520 * u, { size: 28 * u, weight: 500, family: THAI, color: C.fog, alpha: 0.7 });
      finish(0.8);
    } },
  { from: bar(57), to: bar(60), cues: [[0.2, 'riser', 0.4], [1.25, 'impact', 0.9], [5.0, 'chime', 0.5]],
    draw(t) {
      night('#08070A');
      g.fillStyle = '#1B1A1F'; g.fillRect(0, 640 * u, W, 480 * u);
      for (let i = 0; i < 14; i++) { const x = ((i * 120 * u - t * 160 * u) % (W + 120 * u) + W + 120 * u) % (W + 120 * u) - 60 * u; g.fillStyle = '#F2EEE4'; g.fillRect(x, 660 * u, 50 * u, 34 * u); g.fillRect(x, 1066 * u, 50 * u, 34 * u); }
      big('3 Tonelada$', TX, 930 * u, t - 1.25, { size: 140 * u, color: C.cream });
      kicker('2022 · สารคดี Netflix', TX, 330 * u, t, { color: C.red });
      say('เรื่องนี้ถูกเล่าซ้ำทั้งในหนังและสารคดี', TX, 1300 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.cream });
      finish();
    } },
  // ---------------- Chapter 9 — where is it?
  { from: bar(60), to: bar(64), cues: [[0.2, 'thump', 0.6], [2.5, 'thump', 0.6], [5.0, 'thump', 0.6], [7.5, 'chime', 0.5]],
    draw(t) {
      paper();
      kicker('เงินที่เหลืออาจอยู่ที่ไหน?', TX, 300 * u, t);
      [['ฟอกผ่านธุรกิจ', 0.2], ['ฝังซ่อนไว้ใต้ดิน', 2.5], ['แบ่งกระจายไปทั่วประเทศ', 5.0]].forEach(([s, at], i) => {
        const p = spring(t - at, 'playful'); if (p <= 0) return;
        g.save(); g.translate(TX, 620 * u + i * 220 * u); g.scale(p, p);
        g.fillStyle = i === 1 ? C.red : C.ink; rrect(g, -360 * u, -75 * u, 720 * u, 150 * u, 75 * u); g.fill();
        text(g, s, 0, 18 * u, { size: 50 * u, weight: 800, family: THAI, color: C.paper }); g.restore(); });
      say('ไม่มีใครตอบได้ชัดเจน', TX, 1450 * u, t - 7.5, { size: 54 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(64), to: bar(68), cues: [[0.2, 'whoosh', 0.5], [5.0, 'thump', 0.7]],
    draw(t) {
      section(t, 1, { breach: 1, lit: 0.6 + 0.4 * Math.sin(t * 2) });
      kicker('อุโมงค์ 78 เมตร', TX, 250 * u, t, { color: C.red });
      say('ขุดอย่างอดทน 3 เดือน\nแต่พังเพราะความโลภไม่กี่วัน', TX, 345 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.cream });
      say('เงินส่วนใหญ่ยังหายไปจนถึงวันนี้', TX, 1500 * u, t - 5.0, { size: 50 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(68), to: bar(70), cues: [[0, 'thump', 0.9], [2.5, 'swish', 0.4]],
    draw(t) {
      night('#08070A');
      big('R$164,000,000', TX, 900 * u, t, { size: 120 * u, color: C.cream });
      const p = spring(t - 0.7, 'default');
      g.fillStyle = C.red; g.fillRect(TX - 330 * u * p, 960 * u, 660 * u * p, 10 * u);
      say('ใต้ถนนเมืองฟอร์ตาเลซา', TX, 1130 * u, t - 1.0, { size: 56 * u, weight: 700, color: C.fog });
      say('ปล้นโดยไม่มีใครได้ยินเสียง', TX, 1250 * u, t - 2.5, { size: 60 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(70), to: bar(72), cues: [[0, 'whoosh', 0.5], [2.5, 'chime', 0.8]],
    draw(t) {
      section(t, 1, { breach: 1 });
      say('ถ้าคุณมีเงินก้อนนี้ คุณจะซ่อนไว้ที่ไหน?', TX, 330 * u, t - 0.3, { size: 48 * u, weight: 800, color: C.cream });
      say('คอมเมนต์บอกได้เลย', TX, 1500 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
];
