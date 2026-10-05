// Tunguska — Act 2: 0:45–3:00 (bars 18–72).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, clouds, forest } from './kit.js';
import { taiga, fireball, mapSib, PL } from './a1.js';

export default () => [
  { from: bar(18), to: bar(22), cues: [[0.2, 'whoosh', 0.6], [2.5, 'impact', 0.9], [5.0, 'thump', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 18); g.translate(sx, sy);
      paper();
      // a trading-post porch and a man thrown from his chair
      g.fillStyle = '#6B5136'; g.fillRect(150 * u, 900 * u, 600 * u, 40 * u); g.fillRect(170 * u, 600 * u, 30 * u, 300 * u); g.fillRect(700 * u, 600 * u, 30 * u, 300 * u); g.fillRect(150 * u, 580 * u, 600 * u, 30 * u);
      const throw_ = clamp(spring(t - 2.5, 60, 14));
      g.save(); g.translate(400 * u + throw_ * 300 * u, 880 * u - Math.sin(throw_ * Math.PI) * 200 * u); g.rotate(throw_ * 1.2); person(0, 0, 90 * u, C.inkSoft); g.restore();
      kicker('สถานีการค้า Vanavara · ห่างไปราว 65 กม.', TX, 330 * u, t);
      say('ชายคนหนึ่งรู้สึกร้อนเหมือนเสื้อถูกไฟลวก', TX, 1150 * u, t - 0.6, { size: 46 * u, weight: 800 });
      say('แล้วแรงระเบิดก็เหวี่ยงเขาตกจากระเบียง', TX, 1260 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.red });
      say('หน้าต่างแตกไกลหลายร้อยกิโลเมตร', TX, 1400 * u, t - 5.0, { size: 46 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(22), to: bar(26), cues: [[0.2, 'whoosh', 0.5], [2.5, 'chime', 0.5], [5.0, 'pop', 0.6]],
    draw(t) {
      night('#1B1530');
      // glowing night skies over Europe for days after
      const glow = g.createLinearGradient(0, 0, 0, 1200 * u); glow.addColorStop(0, '#2A1D4A'); glow.addColorStop(1, '#C88A5A');
      g.globalAlpha = clamp(t / 2); g.fillStyle = glow; g.fillRect(0, 0, W, 1200 * u); g.globalAlpha = 1;
      g.fillStyle = '#0A0812'; for (let i = 0; i < 9; i++) { const w = (60 + hash(i, 2) * 80) * u, h = (160 + hash(i, 3) * 260) * u; g.fillRect(i * 125 * u, 1200 * u - h, w, h); }
      g.fillRect(0, 1200 * u, W, H - 1200 * u);
      kicker('หลายคืนต่อมา · ยุโรปและเอเชีย', TX, 300 * u, t, { color: C.red });
      say('ท้องฟ้ายามค่ำคืนสว่างผิดปกติ', TX, 410 * u, t - 0.2, { size: 52 * u, weight: 800, color: C.cream });
      say('ในลอนดอน มีรายงานว่าอ่านหนังสือพิมพ์\nกลางแจ้งได้ตอนเที่ยงคืน', TX, 1360 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(26), to: bar(30), cues: [[0.2, 'thump', 0.6], [2.5, 'thump', 0.6], [5.0, 'impact', 0.8]],
    draw(t) {
      paper();
      kicker('แต่ไม่มีใครไปดูจุดเกิดเหตุ', TX, 330 * u, t);
      const ys = ['1908', '1914', '1917', '1921', '1927'], dw = 170 * u, x0 = TX - 1.5 * (dw + 14 * u);
      for (let d = 0; d < 4; d++) flip(x0 + d * (dw + 14 * u), 760 * u, dw, 250 * u, ys.map((y) => y[d]), ys.map((_, i) => 0.3 + i * 0.4), t, { size: 190 * u });
      say('สงครามโลก การปฏิวัติรัสเซีย สงครามกลางเมือง', TX, 1060 * u, t - 2.5, { size: 42 * u, weight: 800 });
      say('19 ปีผ่านไป กว่าจะมีนักวิทยาศาสตร์มาถึง', TX, 1200 * u, t - 5.0, { size: 48 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(30), to: bar(35), cues: [[0.2, 'whoosh', 0.5], [2.5, 'thump', 0.6], [6.25, 'impact', 0.9]],
    draw(t) {
      const z = track(t, [[0, 2.2], [0.3, 1]], 'heavy');
      g.save(); g.translate(TX, 960 * u); g.scale(z, z); g.translate(-TX, -960 * u); taiga(TX, 960 * u, 1, { burn: 1 }); g.restore();
      g.fillStyle = 'rgba(10,16,28,0.75)'; g.fillRect(0, 200 * u, W, 300 * u); g.fillRect(0, 1350 * u, W, 300 * u);
      kicker('1927 · คณะสำรวจของ Leonid Kulik', TX, 300 * u, t, { color: C.red });
      say('ต้นไม้ล้มชี้ออกจากจุดศูนย์กลาง เหมือนรูปผีเสื้อ', TX, 400 * u, t - 0.2, { size: 42 * u, weight: 800, color: C.cream });
      say('ตรงกลาง ต้นไม้ยังยืนอยู่ แต่ไม่มีกิ่งก้าน', TX, 1440 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.cream });
      say('ไม่มีหลุม ไม่มีหินอุกกาบาต', TX, 1540 * u, t - 6.25, { size: 50 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(35), to: bar(39), cues: [[0.2, 'thump', 0.6], [2.5, 'thump', 0.6], [5.0, 'impact', 0.9]],
    draw(t) {
      paper();
      // area comparison: 2,150 km² as a square vs a city outline
      const s = clamp(spring(t - 0.3, 'heavy'));
      g.fillStyle = 'rgba(200,50,30,0.25)'; g.fillRect(TX - 330 * u * s, 900 * u - 330 * u * s, 660 * u * s, 660 * u * s);
      g.strokeStyle = C.red; g.lineWidth = 5 * u; g.strokeRect(TX - 330 * u * s, 900 * u - 330 * u * s, 660 * u * s, 660 * u * s);
      const c = clamp(spring(t - 2.5, 'snappy')) * 330 * Math.sqrt(1569 / 2150);
      g.fillStyle = 'rgba(22,19,15,0.25)'; g.fillRect(TX - c * u, 900 * u - c * u, 2 * c * u, 2 * c * u);
      text(g, 'กรุงเทพฯ ~1,569 ตร.กม.', TX, 900 * u + 10 * u, { size: 36 * u, weight: 800, family: THAI, color: C.ink, alpha: clamp((t - 2.7) / 0.2) });
      kicker('พื้นที่ป่าที่ราบเป็นหน้ากลอง', TX, 330 * u, t);
      big('2,150 ตร.กม.', TX, 480 * u, t - 0.3, { size: 110 * u, color: C.red });
      say('ใหญ่กว่ากรุงเทพมหานครทั้งจังหวัด', TX, 1350 * u, t - 5.0, { size: 50 * u, weight: 800 });
      finish(0.6);
    } },
  // ---------------- what was it?
  { from: bar(39), to: bar(43), cues: [[0.2, 'pop', 0.4], [0.6, 'pop', 0.4], [1.0, 'pop', 0.4], [1.4, 'pop', 0.4], [1.8, 'pop', 0.4]],
    draw(t) {
      paper();
      g.fillStyle = C.paper2; g.fillRect(60 * u, 470 * u, W - 120 * u, 1000 * u);
      [['ดาวเคราะห์น้อย', 280, 640], ['ดาวหาง', 760, 700], ['แก๊สธรรมชาติระเบิด', 300, 920], ['ปฏิสสาร / หลุมดำจิ๋ว', 770, 1000], ['ยานต่างดาว', 300, 1240], ['การทดลองของ Tesla', 770, 1300]].forEach(([s, x, y], i) => {
        const p = spring(t - 0.2 - i * 0.4, 'playful'); if (p <= 0) return;
        g.save(); g.translate(x * u, y * u); g.rotate((hash(i, 7) - 0.5) * 0.12); g.scale(p, p);
        g.fillStyle = i < 2 ? C.red : '#F7F1E3'; g.fillRect(-210 * u, -70 * u, 420 * u, 140 * u);
        text(g, s, 0, 14 * u, { size: 36 * u, weight: 800, family: THAI, color: i < 2 ? C.paper : C.ink }); g.restore(); });
      say('ทฤษฎีมีตั้งแต่วิทยาศาสตร์ ถึงเรื่องเหนือจริง', TX, 330 * u, t - 0.1, { size: 46 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(43), to: bar(48), cues: [[0.2, 'riser', 0.5], [3.75, 'impact', 1.0], [7.5, 'thump', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 3.75, 20); g.translate(sx, sy);
      night('#04070D');
      for (let i = 0; i < 80; i++) { g.fillStyle = C.cream; g.globalAlpha = 0.3 + hash(i, 1) * 0.5; g.fillRect(hash(i, 2) * W, hash(i, 3) * 900 * u, 2 * u, 2 * u); }
      g.globalAlpha = 1;
      // a rocky body entering, heating, breaking apart
      const p = remap(t, 0.3, 3.75), x = TX + 300 * u - p * 300 * u, y = 300 * u + p * 600 * u;
      if (t < 3.75) { g.fillStyle = '#6B5E50'; g.beginPath(); for (let k = 0; k < 10; k++) { const a = k / 10 * 7, r = (50 + hash(k, 4) * 20) * u; g.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } g.fill();
        g.strokeStyle = `rgba(232,150,60,${p})`; g.lineWidth = 12 * u; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 200 * u * p, y - 400 * u * p); g.stroke(); }
      else { for (let k = 0; k < 16; k++) { const a = hash(k, 5) * 7, d = (t - 3.75) * 500 * u; g.fillStyle = `rgba(255,200,120,${clamp(1 - (t - 3.75))})`; g.beginPath(); g.arc(TX + Math.cos(a) * d, 900 * u + Math.sin(a) * d, 12 * u, 0, 7); g.fill(); } }
      kicker('คำอธิบายที่นักวิทยาศาสตร์ส่วนใหญ่ยอมรับ', TX, 300 * u, t, { color: C.red });
      say('ดาวเคราะห์น้อยหรือดาวหาง\nขนาดหลายสิบเมตร', TX, 410 * u, t - 0.2, { size: 44 * u, weight: 800, color: C.cream });
      say('ความร้อนและแรงดัน\nทำให้แตกสลายกลางอากาศ\nก่อนถึงพื้นดิน จึงไม่เหลือหลุม', TX, 1280 * u, t - 3.75, { size: 44 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(48), to: bar(53), cues: [[0.2, 'pop', 0.6], [2.5, 'thump', 0.6], [6.25, 'pop', 0.6]],
    draw(t) {
      paper();
      kicker('แต่ยังมีคำถามค้างคา', TX, 300 * u, t);
      [['ทำไมไม่พบเศษหินขนาดใหญ่เลย?', 0.2], ['เป็นดาวเคราะห์น้อย หรือดาวหาง?', 2.5], ['ทะเลสาบ Cheko ใกล้ ๆ\nเป็นหลุมอุกกาบาตหรือไม่?\n(ยังถกเถียงกันอยู่)', 6.25]].forEach(([s, at], i) => {
        if (t < at) return; say(s, TX, 520 * u + i * 280 * u, t - at, { size: 44 * u, weight: 800, color: i === 2 ? C.red : C.ink }); });
      finish(0.6);
    } },
  { from: bar(53), to: bar(58), cues: [[0.2, 'whoosh', 0.6], [3.75, 'impact', 0.9], [7.5, 'thump', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 3.75, 16); g.translate(sx, sy);
      night('#8A9BB0'); g.fillStyle = '#E8EDF2'; g.fillRect(0, 1250 * u, W, H);
      for (let i = 0; i < 9; i++) { const w = (60 + hash(i, 2) * 80) * u, h = (160 + hash(i, 3) * 260) * u; g.fillStyle = '#3A4252'; g.fillRect(i * 125 * u, 1250 * u - h, w, h); }
      fireball(remap(t, 0.3, 3.75), -100 * u, 200 * u, W * 0.7, 700 * u);
      kicker('15 ก.พ. 2013 · เชเลียบินสค์ รัสเซีย', TX, 300 * u, t, { color: C.red });
      say('ลูกพี่ลูกน้องที่เล็กกว่าของ Tunguska', TX, 410 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.ink });
      say('ระเบิดกลางอากาศเช่นกัน\nคนบาดเจ็บกว่า 1,000 คน จากกระจกแตก', TX, 1400 * u, t - 3.75, { size: 46 * u, weight: 800, color: C.ink });
      finish(0.6);
    } },
  { from: bar(58), to: bar(62), cues: [[0.2, 'thump', 0.6], [2.5, 'chime', 0.5]],
    draw(t) {
      paper();
      kicker('30 มิถุนายน ของทุกปี', TX, 360 * u, t);
      big('Asteroid Day', TX, 640 * u, t - 0.2, { size: 130 * u, color: C.red });
      say('สหประชาชาติกำหนดเป็น\n“วันดาวเคราะห์น้อยสากล”', TX, 820 * u, t - 1.5, { size: 50 * u, weight: 800 });
      say('เพื่อเตือนว่า เหตุแบบนี้\nเกิดขึ้นได้อีก', TX, 1160 * u, t - 4.0, { size: 54 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(62), to: bar(67), cues: [[0.2, 'thump', 0.6], [3.75, 'riser', 0.5], [6.25, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 6.25, 20); g.translate(sx, sy);
      night('#08070A');
      say('ถ้าระเบิดเดียวกันนี้', TX, 600 * u, t - 0.2, { size: 60 * u, weight: 800, color: C.cream });
      say('เกิดเหนือเมืองใหญ่ แทนที่จะเป็นป่าไซบีเรีย…', TX, 760 * u, t - 2.0, { size: 46 * u, weight: 800, color: C.fog });
      big('TUNGUSKA', TX, 1200 * u, t - 6.25, { size: 190 * u, color: C.red });
      finish();
    } },
  { from: bar(67), to: bar(72), cues: [[0, 'whoosh', 0.5], [6.25, 'chime', 0.8]],
    draw(t) {
      taiga(TX, 900 * u, 1);
      g.fillStyle = 'rgba(10,16,28,0.7)'; g.fillRect(0, 230 * u, W, 300 * u); g.fillRect(0, 1350 * u, W, 300 * u);
      say('ดาวเคราะห์น้อย ดาวหาง หรือสิ่งอื่น?', TX, 400 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.cream });
      say('คอมเมนต์ทฤษฎีของคุณไว้ได้เลย', TX, 1500 * u, t - 3.0, { size: 46 * u, weight: 800, color: C.red });
      finish();
    } },
];
