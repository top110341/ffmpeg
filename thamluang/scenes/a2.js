// Tham Luang cave rescue — Act 2: 0:45–3:00 (bars 18–72).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake } from './kit.js';
import { ease, GOLD, figure, diver, bike, candle, flag, gauge, water, caveRoom, LEDGE, passage, lineAt, caveSection, caveAt, cavePts, SPOT, schematicNote, caveMouth, BIKES } from './a1.js';

const FLAGS = [['uk', 'อังกฤษ'], ['us', 'สหรัฐฯ'], ['au', 'ออสเตรเลีย'], ['cn', 'จีน'], ['jp', 'ญี่ปุ่น'], ['la', 'ลาว'], ['mm', 'เมียนมา']];

export default () => [
  // ---------------- the search
  { from: bar(18), to: bar(21), cues: [[0.2, 'thump', 0.5], [3.75, 'whoosh', 0.5]],
    draw(t) {
      caveMouth(t, { dark: 1 });
      BIKES.forEach(([x, y]) => bike(x * u, y * u, 90 * u, '#3A4250'));
      for (let i = 0; i < 4; i++) { const x = (230 + i * 210) * u, a = -1.9 + noise(t * 0.6, i * 7) * 0.5;
        g.save(); g.globalAlpha = clamp((t - 0.6 - i * 0.5) / 0.3) * 0.22; g.fillStyle = '#FFF2C4';
        g.beginPath(); g.moveTo(x, 1300 * u); g.lineTo(x + Math.cos(a - 0.12) * 900 * u, 1300 * u + Math.sin(a - 0.12) * 900 * u); g.lineTo(x + Math.cos(a + 0.12) * 900 * u, 1300 * u + Math.sin(a + 0.12) * 900 * u); g.fill(); g.restore();
        person(x, 1330 * u, 40 * u, '#0A0D12'); }
      g.fillStyle = 'rgba(8,10,14,0.82)'; g.fillRect(0, 200 * u, W, 480 * u);
      kicker('ค่ำวันที่ 23 มิถุนายน', TX, 290 * u, t, { color: C.red });
      say('ไม่มีใครกลับบ้าน', TX, 400 * u, t - 0.2, { size: 60 * u, weight: 800, color: C.cream });
      say('พบจักรยานจอดอยู่หน้าถ้ำ\nการค้นหาเริ่มขึ้นกลางดึก', TX, 520 * u, t - 3.75, { size: 46 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(21), to: bar(24), cues: Array.from({ length: 8 }, (_, i) => [0.3 + i * 0.5, 'tick', 0.5]).concat([[5.0, 'impact', 0.8]]),
    draw(t) {
      night('#0B111B');
      kicker('วันที่', TX, 300 * u, t, { color: C.red });
      const d = ['2', '3', '4', '5', '6', '7', '8', '9'];
      flip(TX, 560 * u, 300 * u, 330 * u, d, d.map((_, i) => 0.3 + i * 0.5), t, { size: 230 * u, bg: C.cream, fg: C.ink, r: 16 * u });
      const n = Math.min(72, Math.floor(remap(t, 0.3, 5.0) * 72));
      for (let i = 0; i < n; i++) { const c = i % 12, r = Math.floor(i / 12); person((130 + c * 70 + (r % 2) * 30) * u, (860 + r * 70) * u, 22 * u, i % 9 === 0 ? C.red : C.fog); }
      say('หน่วยซีล ทหาร ตำรวจ อาสาสมัคร', TX, 1350 * u, t - 1.5, { size: 46 * u, weight: 800, color: C.cream });
      say('มีรายงานว่าผู้ร่วมภารกิจรวมราว 10,000 คน', TX, 1460 * u, t - 5.0, { size: 40 * u, weight: 800, color: GOLD });
      finish();
    } },
  { from: bar(24), to: bar(27), cues: [[0.2, 'whoosh', 0.5], [2.5, 'thump', 0.5], [5.0, 'pop', 0.6]],
    draw(t) {
      const P = caveSection(t, { level: 1095 + 35 * ease(t, 0, 7) });
      // hoses from the mouth, out along the ground
      const [mx, my] = P[0];
      g.strokeStyle = '#C9772E'; g.lineWidth = 7 * u; g.lineCap = 'round';
      for (let k = 0; k < 2; k++) { g.beginPath(); g.moveTo(-20 * u, my + (20 + k * 18) * u); g.lineTo(mx, my + k * 14 * u); g.lineTo(P[1][0], P[1][1] + k * 10 * u); g.lineTo(P[2][0], P[2][1] + k * 10 * u); g.stroke(); }
      g.fillStyle = 'rgba(160,200,220,0.8)';
      for (let i = 0; i < 10; i++) { const q = ((t * 0.6 + i / 10) % 1); g.beginPath(); g.arc(mx - q * 120 * u, my + 30 * u, 5 * u, 0, 7); g.fill(); }
      // shaft hunters on the ridge
      if (t > 5) [[560, 620], [690, 560], [820, 630]].forEach(([x, y], i) => { const s = spring(t - 5 - i * 0.3, 'snappy'); if (s <= 0) return;
        person(x * u, (y - 4) * u, 22 * u * s, C.cream);
        g.save(); g.setLineDash([8 * u, 8 * u]); g.strokeStyle = GOLD; g.lineWidth = 3 * u; g.beginPath(); g.moveTo(x * u, (y + 20) * u); g.lineTo(x * u, (y + 20 + 260 * clamp((t - 5.4 - i * 0.3) / 1.2)) * u); g.stroke(); g.restore(); });
      kicker('สู้กับน้ำ', TX, 250 * u, t, { color: C.red });
      say('สูบน้ำออกจากถ้ำทั้งวันทั้งคืน', TX, 345 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      say('ตลอดภารกิจ สูบน้ำออกรวม\nกว่าพันล้านลิตร (ตามรายงาน)', TX, 1380 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.cream });
      say('อีกทีมปีนดอย ตามหาปล่องทางเข้าอื่น', TX, 1520 * u, t - 5.0, { size: 40 * u, weight: 800, color: GOLD });
      finish(0.8);
    } },
  { from: bar(27), to: bar(30), cues: FLAGS.map((_, i) => [0.4 + i * 0.35, 'pop', 0.45]).concat([[5.0, 'chime', 0.5]]),
    draw(t) {
      paper();
      kicker('ความช่วยเหลือจากทั่วโลก', TX, 290 * u, t);
      say('ผู้เชี่ยวชาญหลายชาติเดินทางมาช่วย', TX, 400 * u, t - 0.2, { size: 48 * u, weight: 800 });
      FLAGS.forEach(([c, name], i) => { const s = spring(t - 0.4 - i * 0.35, 'snappy'); if (s <= 0) return;
        const col = i < 6 ? i % 2 : 0.5, row = Math.floor(i / 2), x = (i < 6 ? TX / u - 210 + col * 420 : TX / u) * u, y = (560 + row * 245) * u;
        g.save(); g.translate(x, y + 90 * u); g.scale(s, s); g.translate(-x, -(y + 90 * u));
        flag(c, x - 135 * u, y, 270 * u, 170 * u);
        text(g, name, x, y + 220 * u, { size: 38 * u, weight: 800, family: THAI, color: C.ink }); g.restore(); });
      say('และอีกหลายประเทศ', TX, 1560 * u, t - 5.0, { size: 40 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(30), to: bar(32), cues: [[0.2, 'whoosh', 0.5], [2.5, 'swish', 0.5]],
    draw(t) {
      const p = 0.02 + 0.8 * ease(t, 0, 4.8);
      const P = caveSection(t, { level: 1095, line: p });
      const h = path(P, p, { width: 0 });
      diver(h.x, h.y - 6 * u, 70 * u, { t, rot: h.ang, lamp: 1, color: '#DDE3EA' });
      kicker('นักดำน้ำถ้ำอาสาจากอังกฤษ', TX, 250 * u, t, { color: C.red });
      say('Rick Stanton · John Volanthen', TX, 350 * u, t - 0.2, { size: 58 * u, weight: 400, family: SERIF, color: C.cream });
      say('วางเชือกนำทาง ลึกเข้าไปทีละช่วง', TX, 1440 * u, t - 2.0, { size: 46 * u, weight: 800, color: C.cream });
      schematicNote();
      finish(0.8);
    } },
  { from: bar(32), to: bar(34), cues: Array.from({ length: 6 }, (_, i) => [i * 0.15, 'tick', 0.6]).concat([[1.0, 'thump', 0.7]]),
    draw(t) {
      paper(); kicker('มิถุนายน → กรกฎาคม 2018', TX, 420 * u, t);
      const d = ['27', '28', '29', '30', '1', '2'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.15), t, { size: 360 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('ค่ำวันจันทร์ที่ 2 กรกฎาคม', TX, 1240 * u, t - 1.0, { size: 56 * u, weight: 800 });
      say('วันที่ 10 ของการติดอยู่ในถ้ำ', TX, 1350 * u, t - 2.0, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- found
  { from: bar(34), to: bar(38), cues: [[0.3, 'type', 0.5], [2.5, 'type', 0.5], [3.75, 'impact', 0.9], [6.25, 'chime', 0.6]],
    draw(t) {
      caveRoom(t, { level: 1330, beam: clamp((t - 0.2) / 0.5), lit: remap(t, 3.75, 5.0) });
      diver(-40 * u, 1060 * u, 150 * u, { t, lamp: 0, color: '#0A0D12' });
      typewriter('“How many of you?”', TX, 330 * u, t - 0.3, { size: 66 * u, weight: 400, family: SERIF, color: C.cream, align: 'center', cps: 16 });
      typewriter('“Thirteen.”', TX, 450 * u, t - 2.5, { size: 80 * u, weight: 400, family: SERIF, color: GOLD, align: 'center', cps: 10 });
      say('“มีกี่คน” · “13 คน”', TX, 560 * u, t - 3.2, { size: 40 * u, weight: 700, color: C.fog });
      say('ทั้ง 13 คน ยังมีชีวิตอยู่', TX, 1440 * u, t - 3.75, { size: 62 * u, weight: 800, color: C.cream });
      say('หลังติดอยู่ในความมืดนาน 9 วัน', TX, 1540 * u, t - 6.25, { size: 42 * u, weight: 800, color: GOLD });
      finish();
    } },
  { from: bar(38), to: bar(41), cues: [[0.2, 'swish', 0.5], [2.5, 'pop', 0.6], [5.0, 'thump', 0.6]],
    draw(t) {
      const P = caveSection(t, { level: 1095, line: 0.9, labels: clamp((t - 0.4) / 0.4) });
      const [lx, ly] = P[SPOT.ledge];
      for (let i = 0; i < 13; i++) { g.fillStyle = GOLD; g.beginPath(); g.arc(lx - 30 * u + (i % 7) * 10 * u, ly - 22 * u - Math.floor(i / 7) * 10 * u, 4.5 * u, 0, 7); g.fill(); }
      const q = clamp(spring(t - 2.5, 'default'));
      g.strokeStyle = GOLD; g.lineWidth = 4 * u; const y = 1330 * u, x0 = P[0][0], x1 = x0 + (lx - x0) * q;
      g.beginPath(); g.moveTo(x0, y - 16 * u); g.lineTo(x0, y + 16 * u); g.moveTo(x0, y); g.lineTo(x1, y); g.moveTo(x1, y - 16 * u); g.lineTo(x1, y + 16 * u); g.stroke();
      text(g, 'ราว 4 กม.', (x0 + lx) / 2, 1395 * u, { size: 44 * u, weight: 800, family: THAI, color: GOLD, alpha: clamp((t - 3) / 0.3) });
      kicker('จุดที่พบ: เนินหินเหนือน้ำ', TX, 250 * u, t, { color: C.red });
      say('ลึกเข้าไปเลย “หาดพัทยา” ราว 400 ม.', TX, 345 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      say('หน่วยซีลและแพทย์ทหาร\nดำน้ำเข้าไปอยู่เป็นเพื่อนเด็ก ๆ', TX, 1460 * u, t - 5.0, { size: 42 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(41), to: bar(44), cues: [[0.2, 'riser', 0.5], [3.75, 'impact', 0.9], [5.6, 'thump', 0.5]],
    draw(t) {
      const [sx, sy] = shake(t, 3.75, 14); g.translate(sx, sy);
      night('#0B111B');
      const v = track(t, [[0, 21], [0.5, 21], [3.75, 15]], 'heavy');
      gauge(TX, 980 * u, 320 * u, v);
      text(g, `${v.toFixed(0)}%`, TX, 1110 * u, { size: 130 * u, weight: 400, family: SERIF, color: v < 16 ? C.red : C.cream });
      text(g, 'ออกซิเจนในโถง', TX, 1170 * u, { size: 36 * u, weight: 800, family: THAI, color: C.fog });
      kicker('ภัยใหม่ใต้ดิน', TX, 300 * u, t, { color: C.red });
      say('อากาศในถ้ำเริ่มบางลง', TX, 410 * u, t - 0.2, { size: 56 * u, weight: 800, color: C.cream });
      say('รายงานว่าออกซิเจนลดเหลือราว 15%\n(อากาศปกติราว 21%)', TX, 1290 * u, t - 3.75, { size: 42 * u, weight: 800, color: C.cream });
      say('และฝนมรสุมระลอกใหม่กำลังมา', TX, 1500 * u, t - 5.6, { size: 48 * u, weight: 800, color: C.red });
      finish();
    } },
  // ---------------- Saman Kunan
  { from: bar(44), to: bar(48), cues: [[0.3, 'chime', 0.45], [6.25, 'chime', 0.35]],
    draw(t) {
      night('#06080C');
      candle(TX, 1060 * u, 210 * u * clamp(spring(t - 0.2, 'heavy')), t);
      kicker('6 กรกฎาคม 2018', TX, 300 * u, t, { color: GOLD });
      say('จ่าเอกสมาน กุนัน', TX, 430 * u, t - 0.3, { size: 76 * u, weight: 800, color: C.cream });
      say('อดีตหน่วยซีล กองทัพเรือ วัย 37 ปี', TX, 530 * u, t - 0.8, { size: 42 * u, weight: 800, color: C.fog });
      say('อาสาลำเลียงถังอากาศเข้าไปในถ้ำ\nเสียชีวิตขณะดำน้ำกลับออกมา', TX, 1200 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.cream });
      say('“วีรบุรุษถ้ำหลวง”', TX, 1460 * u, t - 6.25, { size: 64 * u, weight: 800, color: GOLD });
      finish();
    } },
  // ---------------- the plan
  { from: bar(48), to: bar(51), cues: [[0.2, 'thump', 0.6], [1.25, 'swish', 0.5], [2.5, 'swish', 0.5], [3.75, 'swish', 0.5], [5.6, 'pop', 0.5]],
    draw(t) {
      paper();
      kicker('แผนที่ไม่เคยมีใครทำมาก่อน', TX, 300 * u, t);
      say('พาเด็กดำน้ำออกมา ทีละคน', TX, 410 * u, t - 0.2, { size: 54 * u, weight: 800 });
      [['1', 'ให้ยาสลบ ไม่ให้ตื่นตระหนกใต้น้ำ'], ['2', 'สวมหน้ากากดำน้ำแบบเต็มหน้า'], ['3', 'นักดำน้ำหนึ่งคน ประกบเด็กหนึ่งคน']].forEach(([n, s], i) => {
        const p = spring(t - 1.25 - i * 1.25, 'snappy'); if (p <= 0) return;
        g.save(); g.translate((1 - p) * W, 0);
        g.fillStyle = C.paper2; rrect(g, 90 * u, 560 * u + i * 190 * u, W - 220 * u, 150 * u, 12 * u); g.fill();
        text(g, n, 160 * u, 670 * u + i * 190 * u, { size: 90 * u, weight: 400, family: SERIF, color: C.red });
        text(g, s, 560 * u, 655 * u + i * 190 * u, { size: 38 * u, weight: 800, family: THAI, color: C.ink }); g.restore(); });
      say('ดูแลด้านการแพทย์โดย นพ. Richard Harris\nวิสัญญีแพทย์ชาวออสเตรเลีย', TX, 1260 * u, t - 5.6, { size: 40 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(51), to: bar(54), cues: [[0.2, 'whoosh', 0.5], [3.75, 'whoosh', 0.4]],
    draw(t) {
      passage(t);
      const x1 = (-250 + 1400 * clamp(t / 8.6)) * u;
      diver(x1, lineAt(x1) - 70 * u, 200 * u, { t, lamp: 1, load: 1 });
      const x2 = (-700 + 1320 * clamp(t / 8.6)) * u;
      diver(x2, lineAt(x2) + 150 * u, 150 * u, { t: t + 1, lamp: 0.6, color: '#05070B' });
      kicker('8–10 กรกฎาคม', TX, 250 * u, t, { color: C.red });
      say('นักดำน้ำพาออกมาตามเชือกนำทาง', TX, 350 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      say('ช่วงที่น้ำลดลง ส่งต่อด้วยเปล\nเป็นทอด ๆ จนถึงปากถ้ำ', TX, 1450 * u, t - 3.75, { size: 44 * u, weight: 800, color: C.cream });
      finish();
    } },
  // ---------------- out, 4 · 4 · 5
  { from: bar(54), to: bar(58), cues: [[0.2, 'thump', 0.5]].concat([0, 1, 2].flatMap((d) => Array.from({ length: d === 2 ? 5 : 4 }, (_, i) => [1.25 + d * 2.5 + i * 0.15, 'pop', 0.4]))).concat([[8.75, 'chime', 0.7]]),
    draw(t) {
      night('#0B111B');
      const rows = [['8 ก.ค.', 4], ['9 ก.ค.', 4], ['10 ก.ค. · รวมโค้ช', 5]];
      let out = 0;
      rows.forEach(([lab, n], r) => { const at = 1.25 + r * 2.5;
        text(g, lab, TX, (650 + r * 290) * u, { size: 38 * u, weight: 800, family: THAI, color: t > at ? GOLD : C.fog });
        for (let i = 0; i < n; i++) { const lit = clamp((t - at - i * 0.15) / 0.2); if (lit > 0.5) out++;
          figure(TX + (i - (n - 1) / 2) * 140 * u, (840 + r * 290) * u, 110 * u, { lit, color: '#3A4250' }); } });
      kicker('ออกจากถ้ำ', TX, 300 * u, t, { color: C.red });
      text(g, `${out} / 13`, TX, 500 * u, { size: 140 * u, weight: 400, family: SERIF, color: out === 13 ? GOLD : C.cream });
      say('ทุกคนถูกส่งตัวไปโรงพยาบาลทันที', TX, 1540 * u, t - 8.75, { size: 42 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(58), to: bar(60), cues: [[0, 'impact', 0.8], [2.5, 'chime', 0.5]],
    draw(t) {
      night('#06080C');
      const R = 260 * u, cx = TX, cy = 1050 * u;
      g.strokeStyle = C.night3; g.lineWidth = 3 * u; g.beginPath(); g.arc(cx, cy, R, 0, 7); g.stroke();
      for (let k = -2; k <= 2; k++) { g.beginPath(); g.ellipse(cx, cy, R * Math.abs(Math.cos(k * 0.5 + t * 0.2)), R, 0, 0, 7); g.stroke(); g.beginPath(); g.moveTo(cx - R * Math.cos(k * 0.5), cy + R * Math.sin(k * 0.5)); g.lineTo(cx + R * Math.cos(k * 0.5), cy + R * Math.sin(k * 0.5)); g.stroke(); }
      for (let i = 0; i < 18; i++) { const a = hash(i, 81) * 7, rr = Math.sqrt(hash(i, 82)) * R * 0.95, x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr, p = ((t * 0.7 + hash(i, 83)) % 1);
        g.strokeStyle = GOLD; g.globalAlpha = 1 - p; g.lineWidth = 3 * u; g.beginPath(); g.arc(x, y, 6 * u + p * 40 * u, 0, 7); g.stroke(); g.globalAlpha = 1; }
      big('18 วัน', TX, 470 * u, t - 0.05, { size: 170 * u, color: GOLD });
      say('ทั้ง 13 คน ออกมาอย่างปลอดภัย', TX, 610 * u, t - 0.5, { size: 50 * u, weight: 800, color: C.cream });
      say('ข่าวนี้ถูกเฝ้าติดตามไปทั่วโลก', TX, 1450 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.cream });
      finish();
    } },
  // ---------------- afterwards
  { from: bar(60), to: bar(62), cues: [[0.2, 'chime', 0.35]],
    draw(t) {
      night('#06080C');
      candle(TX, 1080 * u, 150 * u * clamp(spring(t - 0.2, 'heavy')), t);
      kicker('ธันวาคม 2019', TX, 300 * u, t, { color: GOLD });
      say('Beirut Pakbara', TX, 420 * u, t - 0.2, { size: 70 * u, weight: 400, family: SERIF, color: C.cream });
      say('หน่วยซีล กองทัพเรือ ผู้ร่วมภารกิจ', TX, 520 * u, t - 0.6, { size: 42 * u, weight: 800, color: C.fog });
      say('เสียชีวิตจากการติดเชื้อในกระแสเลือด\nที่กองทัพเรือระบุว่าได้รับระหว่างภารกิจ', TX, 1260 * u, t - 2.0, { size: 40 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(62), to: bar(64), cues: [[0.2, 'pop', 0.5], [0.6, 'pop', 0.5], [1.0, 'pop', 0.5], [1.4, 'pop', 0.5]],
    draw(t) {
      paper();
      kicker('วันนี้', TX, 290 * u, t);
      say('ถ้ำหลวงเปิดให้เข้าชมอีกครั้ง\nตั้งแต่ปลายปี 2019', TX, 400 * u, t - 0.1, { size: 48 * u, weight: 800 });
      [['The Cave', '2019'], ['The Rescue', '2021'], ['Thirteen Lives', '2022'], ['Thai Cave Rescue', '2022']].forEach(([s, y], i) => {
        const p = spring(t - 0.2 - i * 0.4, 'playful'); if (p <= 0) return;
        const x = TX + ((i % 2) - 0.5) * 420 * u, yy = (780 + Math.floor(i / 2) * 290) * u;
        g.save(); g.translate(x, yy); g.rotate((hash(i, 7) - 0.5) * 0.08); g.scale(p, p);
        g.fillStyle = i === 1 ? C.red : C.ink; rrect(g, -190 * u, -110 * u, 380 * u, 220 * u, 14 * u); g.fill();
        text(g, s, 0, 0, { size: 46 * u, weight: 400, family: SERIF, color: C.paper });
        text(g, y, 0, 60 * u, { size: 32 * u, weight: 700, family: 'Inter, sans-serif', color: C.paper3 }); g.restore(); });
      say('เรื่องนี้ถูกเล่าซ้ำในสารคดีและภาพยนตร์', TX, 1430 * u, t - 2.0, { size: 42 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------- close
  { from: bar(64), to: bar(68), cues: [[0, 'thump', 0.9], [2.5, 'chime', 0.5], [5.0, 'swish', 0.4]],
    draw(t) {
      night('#06080C');
      big('ถ้ำหลวง', TX, 760 * u, t, { size: 190 * u, color: C.cream });
      const p = spring(t - 0.7, 'default');
      g.fillStyle = C.red; g.fillRect(TX - 330 * u * p, 840 * u, 660 * u * p, 10 * u);
      text(g, 'THAM LUANG · 23.06 – 10.07.2018', TX, 920 * u, { size: 32 * u, weight: 700, family: 'Inter, sans-serif', color: C.fog, tracking: 3 * u, alpha: clamp((t - 0.9) / 0.3) });
      say('13 ชีวิตกลับบ้าน ด้วยแรงของคนนับหมื่น', TX, 1080 * u, t - 1.2, { size: 46 * u, weight: 800, color: C.cream });
      for (let i = 0; i < 13; i++) figure(TX + (i - 6) * 66 * u, 1400 * u, 56 * u, { lit: clamp((t - 2.5 - i * 0.08) / 0.2) });
      finish();
    } },
  { from: bar(68), to: bar(72), cues: [[0.2, 'thump', 0.5], [2.5, 'pop', 0.6], [5.0, 'chime', 0.8]],
    draw(t) {
      caveMouth(t);
      BIKES.forEach(([x, y]) => bike(x * u, y * u, 90 * u, '#2A2A22'));
      g.fillStyle = 'rgba(239,230,210,0.9)'; g.fillRect(0, 200 * u, W, 330 * u);
      say('ถ้าเป็นคุณ จะกล้าดำน้ำเข้าไปไหม?', TX, 330 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.ink });
      say('คอมเมนต์บอกได้เลย', TX, 440 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.red });
      finish(0.5);
    } },
];
