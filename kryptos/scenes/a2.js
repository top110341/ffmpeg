// Kryptos — Act 2: 0:47.5–3:00 (bars 19–72).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake } from './kit.js';
import { KC, LAT, ALPHA, K1C, K4, rndL, mix, sky, band, copperSheet, tableau, decodeBlock, letterGrid, clockFace, compass, candle, crt, gavel } from './a1.js';

const K1P = ['BETWEEN SUBTLE', 'SHADING AND THE', 'ABSENCE OF LIGHT', 'LIES THE NUANCE', 'OF IQLUSION'];
const inR = (i, a, b) => i >= a && i <= b;                 // 0-based K4 index ranges
const CLUE = { BERLIN: [63, 'BERLIN'], CLOCK: [69, 'CLOCK'], EAST: [21, 'EAST'], NORTHEAST: [25, 'NORTHEAST'] };
const clueSub = (on) => (i) => { for (const k of on) { const [a, w] = CLUE[k]; if (inR(i, a, a + w.length - 1)) return w[i - a]; } return null; };

export default () => [
  // ---------------- the tableau
  { from: bar(19), to: bar(22), cues: [[0.2, 'whoosh', 0.5], [2.5, 'pop', 0.6], [5.0, 'thump', 0.6]],
    draw(t) {
      sky(0.6);
      tableau(TX - 26 * 16 * u, 640 * u, 32 * u, { rows: 24, cols: 26, p: remap(t, 0.2, 2.2), dimA: 0.32, row: t > 2.5 ? 0 : -1, header: true });
      band(180 * u, 420 * u, 0.85);
      kicker('ตาราง Vigenère', TX, 270 * u, t, { color: KC.copLite });
      say('เครื่องมือเข้ารหัสอายุหลายร้อยปี', TX, 390 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      say('แต่แถวตัวอักษรขึ้นต้นด้วย KRYPTOS', TX, 500 * u, t - 2.5, { size: 44 * u, weight: 800, color: KC.copLite });
      band(1410 * u, 170 * u, 0.85);
      text(g, ALPHA, TX, 1500 * u, { size: 44 * u, weight: 700, family: LAT, color: C.cream, tracking: 4 * u, alpha: clamp((t - 5) / 0.3) });
      finish();
    } },
  // ---------------- how it works: B + P -> E
  { from: bar(22), to: bar(25), cues: [[0.2, 'pop', 0.6], [0.8, 'pop', 0.6], [1.6, 'impact', 0.8], [3.75, 'type', 0.5], [5.6, 'swish', 0.5]],
    draw(t) {
      sky(0.5);
      kicker('วิธีเข้ารหัส K1', TX, 270 * u, t, { color: KC.copLite });
      const box = (s, x, at, hot) => { const p = spring(t - at, 'snappy'); if (p <= 0) return;
        g.save(); g.translate(x, 560 * u); g.scale(p, p); g.fillStyle = hot ? KC.cop : KC.bg3; rrect(g, -90 * u, -90 * u, 180 * u, 180 * u, 16 * u); g.fill();
        text(g, s, 0, 45 * u, { size: 130 * u, weight: 700, family: LAT, color: hot ? KC.bg : C.cream }); g.restore(); };
      box('B', TX - 300 * u, 0.2); box('P', TX, 0.8); box('E', TX + 300 * u, 1.6, true);
      text(g, '+', TX - 150 * u, 590 * u, { size: 80 * u, weight: 700, family: LAT, color: C.fog, alpha: clamp((t - 0.6) / 0.2) });
      text(g, '→', TX + 150 * u, 590 * u, { size: 80 * u, weight: 700, family: LAT, color: C.fog, alpha: clamp((t - 1.4) / 0.2) });
      [['ข้อความ', -300], ['คำกุญแจ', 0], ['รหัส', 300]].forEach(([s, dx], i) => text(g, s, TX + dx * u, 710 * u, { size: 36 * u, weight: 700, family: THAI, color: C.fog, alpha: clamp((t - 0.3 - i * 0.6) / 0.3) }));
      g.save(); g.globalAlpha = clamp((t - 2.0) / 0.4); tableau(TX - 13 * 22 * u, 790 * u, 22 * u, { rows: 12, cols: 26, row: 3, col: 8, dimA: 0.25 }); g.restore();
      text(g, 'แถว P × คอลัมน์ B = E', TX, 1100 * u, { size: 34 * u, weight: 700, family: THAI, color: KC.tealLite, alpha: clamp((t - 2.4) / 0.3) });
      const y = say('คำกุญแจของ K1 และ K2 คือ', TX, 1230 * u, t - 3.75, { size: 44 * u, weight: 800, color: C.cream });
      say('PALIMPSEST · ABSCISSA', TX, y + 10 * u, t - 4.2, { size: 52 * u, weight: 700, family: LAT, color: KC.copLite });
      say('ส่วน K3 ใช้วิธีสลับตำแหน่งตัวอักษร', TX, y + 110 * u, t - 5.6, { size: 42 * u, weight: 800, color: C.cream });
      finish();
    } },
  // ---------------- 1999: the public solve
  { from: bar(25), to: bar(28), cues: [[0.2, 'thump', 0.6], [0.6, 'type', 0.4], [2.5, 'type', 0.4], [5.0, 'chime', 0.6]],
    draw(t) {
      sky(0.55);
      crt(TX, 860 * u, 520 * u, t);
      kicker('ปี 1999', TX, 270 * u, t, { color: KC.copLite });
      big('Jim Gillogly', TX, 440 * u, t - 0.2, { size: 104 * u, color: C.cream });
      say('นักวิทยาการคอมพิวเตอร์ในแคลิฟอร์เนีย', TX, 540 * u, t - 0.6, { size: 40 * u, weight: 800, color: C.fog });
      band(1200 * u, 380 * u, 0.85);
      const y = say('ใช้คอมพิวเตอร์ไข K1–K3 สำเร็จ', TX, 1290 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.cream });
      say('และประกาศต่อสาธารณะเป็นคนแรก', TX, y + 10 * u, t - 5.0, { size: 50 * u, weight: 800, color: KC.copLite });
      finish();
    } },
  // ---------------- 1998: CIA's own analyst
  { from: bar(28), to: bar(31), cues: [[0.2, 'swish', 0.5], [2.5, 'impact', 0.9], [5.0, 'pop', 0.6]],
    draw(t) {
      sky(0.5);
      // pencil worksheet
      g.save(); g.translate(TX, 880 * u); g.rotate(-0.05);
      g.fillStyle = '#E6DCC4'; g.fillRect(-300 * u, -260 * u, 600 * u, 520 * u);
      g.font = `600 ${30 * u}px ${LAT}`; g.textAlign = 'left';
      const n = Math.floor(remap(t, 0.2, 7) * 120);
      for (let i = 0; i < n; i++) { const r = Math.floor(i / 15), c = i % 15; g.fillStyle = r % 3 === 2 ? '#8A3A1E' : '#4A4236'; g.fillText(rndL(i, 77), -270 * u + c * 36 * u, -200 * u + r * 56 * u); }
      g.strokeStyle = '#4A4236'; g.lineWidth = 2 * u; for (let r = 0; r < 8; r++) { g.beginPath(); g.moveTo(-280 * u, -186 * u + r * 56 * u); g.lineTo(280 * u, -186 * u + r * 56 * u); g.stroke(); }
      g.fillStyle = '#E3B04B'; g.fillRect(150 * u, 210 * u, 220 * u, 18 * u); g.fillStyle = '#2A2016'; g.beginPath(); g.moveTo(370 * u, 210 * u); g.lineTo(400 * u, 219 * u); g.lineTo(370 * u, 228 * u); g.fill();
      g.restore();
      kicker('แต่แล้ว CIA ก็เปิดเผยว่า', TX, 270 * u, t, { color: KC.copLite });
      big('David Stein', TX, 440 * u, t - 0.2, { size: 104 * u, color: C.cream });
      say('นักวิเคราะห์ของ CIA ไขได้ก่อนแล้วในปี 1998', TX, 540 * u, t - 0.6, { size: 40 * u, weight: 800, color: C.fog });
      band(1200 * u, 380 * u, 0.85);
      const y = say('ด้วยดินสอกับกระดาษ', TX, 1290 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.cream });
      say('ใช้เวลาราว 400 ชั่วโมง', TX, y + 10 * u, t - 5.0, { size: 54 * u, weight: 800, color: KC.copLite });
      finish();
    } },
  // ---------------- NSA, earlier still
  { from: bar(31), to: bar(33), cues: [[0.1, 'thump', 0.6], [1.6, 'impact', 1.1]],
    draw(t) {
      const [sx, sy] = shake(t, 1.6, 20); g.translate(sx, sy);
      paper();
      g.fillStyle = C.paper2; rrect(g, 90 * u, 560 * u, W - 180 * u, 760 * u, 14 * u); g.fill();
      g.fillStyle = C.ink; for (let i = 0; i < 9; i++) { const w = (300 + hash(i, 51) * 420) * u; g.globalAlpha = 0.85; g.fillRect(160 * u, 640 * u + i * 70 * u, w, 26 * u); } g.globalAlpha = 1;
      kicker('ยังมีอีกทีม', TX, 270 * u, t, { color: C.red });
      say('นักถอดรหัสของ NSA ไข K1–K3 ได้\nตั้งแต่ราวปี 1992–1993', TX, 380 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.ink });
      stamp('DECLASSIFIED', TX, 950 * u, t - 1.6, { size: 96 * u, rot: -0.12, color: C.red });
      say('เพิ่งรู้กันเมื่อเอกสารถูกเปิดเผยในปี 2013', TX, 1420 * u, t - 2.6, { size: 42 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------- K1 decodes
  { from: bar(33), to: bar(37), cues: Array.from({ length: 12 }, (_, i) => [0.6 + i * 0.22, 'tick', 0.35]).concat([[4.0, 'chime', 0.6], [6.5, 'thump', 0.6]]),
    draw(t) {
      sky(0.45);
      kicker('K1 · ถอดรหัสแล้ว', TX, 270 * u, t, { color: KC.copLite });
      decodeBlock(K1P, K1C, TX, 500 * u, 52 * u, t - 0.6, { stagger: 0.045, hi: (r, c) => r === 4 && c >= 3 && t > 6.5, lh: 1.35 });
      band(900 * u, 520 * u, 0.0);
      say('แปลคร่าว ๆ', TX, 940 * u, t - 4.0, { size: 36 * u, weight: 700, color: C.fog });
      const y = say('ระหว่างเงาอันแผ่วเบากับความไร้แสง\nคือความละเอียดอ่อนของภาพลวงตา', TX, 1020 * u, t - 4.2, { size: 44 * u, weight: 800, color: C.cream });
      say('สังเกตคำว่า IQLUSION — สะกดผิดจาก ILLUSION', TX, y + 60 * u, t - 6.5, { size: 38 * u, weight: 800, color: KC.copLite });
      finish();
    } },
  // ---------------- K2
  { from: bar(37), to: bar(40), cues: [[0.2, 'type', 0.5], [2.5, 'whoosh', 0.5], [5.0, 'pop', 0.6]],
    draw(t) {
      sky(0.55);
      // earth with magnetic field lines
      const cx = TX, cy = 900 * u, R = 150 * u;
      g.save(); g.strokeStyle = 'rgba(142,216,204,0.45)'; g.lineWidth = 3 * u;
      for (let k = 1; k <= 4; k++) { const p = remap(t, 0.4 + k * 0.25, 1.4 + k * 0.25); if (p <= 0) continue; const a = R * (1 + k * 0.45);
        for (const sd of [-1, 1]) { g.beginPath(); g.ellipse(cx + sd * a * 0.55, cy, a * 0.6, a * 0.95, 0, 0, Math.PI * 2 * p); g.stroke(); } }
      g.restore();
      g.fillStyle = KC.bg3; g.beginPath(); g.arc(cx, cy, R, 0, 7); g.fill(); g.strokeStyle = KC.teal; g.lineWidth = 4 * u; g.stroke();
      g.fillStyle = '#1C4A3A'; g.beginPath(); g.ellipse(cx - 40 * u, cy - 30 * u, 60 * u, 80 * u, 0.4, 0, 7); g.fill(); g.beginPath(); g.ellipse(cx + 60 * u, cy + 50 * u, 40 * u, 50 * u, -0.3, 0, 7); g.fill();
      kicker('K2', TX, 270 * u, t, { color: KC.copLite });
      typewriter('IT WAS TOTALLY INVISIBLE', TX, 410 * u, t - 0.2, { size: 54 * u, weight: 700, family: LAT, color: C.cream, align: 'center', cps: 14 });
      text(g, '“มันมองไม่เห็นเลย”', TX, 500 * u, { size: 42 * u, weight: 700, family: THAI, color: C.fog, alpha: clamp((t - 2) / 0.3) });
      band(1240 * u, 340 * u, 0.85);
      const y = say('พูดถึงสนามแม่เหล็กโลก\nข้อมูลที่ส่ง “ใต้ดิน” ไปยังที่ลับ', TX, 1310 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.cream });
      say('และซ่อนพิกัดละติจูด–ลองจิจูดไว้', TX, y + 6 * u, t - 5.0, { size: 44 * u, weight: 800, color: KC.copLite });
      finish();
    } },
  // ---------------- K3: Howard Carter
  { from: bar(40), to: bar(43), cues: [[0.2, 'thump', 0.6], [2.5, 'whoosh', 0.4], [4.4, 'type', 0.5]],
    draw(t) {
      night('#040A0B');
      // blocked doorway with a small breach, candlelight behind it
      g.fillStyle = '#2A2118'; g.fillRect(250 * u, 640 * u, 580 * u, 760 * u);
      g.strokeStyle = '#1A140E'; g.lineWidth = 3 * u;
      for (let r = 0; r < 12; r++) for (let c = 0; c < 6; c++) g.strokeRect((250 + c * 97 + (r % 2) * 48) * u, (640 + r * 63) * u, 97 * u, 63 * u);
      const op = remap(t, 1.0, 3.0);
      g.save(); g.beginPath(); g.arc(380 * u, 740 * u, 70 * u * op, 0, 7); g.clip();
      g.fillStyle = '#3A2410'; g.fillRect(0, 0, W, H); candle(390 * u, 790 * u, 70 * u, t); g.restore();
      if (op > 0) { g.strokeStyle = '#120C08'; g.lineWidth = 6 * u; g.beginPath(); g.arc(380 * u, 740 * u, 70 * u * op, 0, 7); g.stroke(); }
      kicker('K3', TX, 270 * u, t, { color: KC.copLite });
      say('ดัดแปลงจากบันทึกของ Howard Carter', TX, 390 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      say('วันเปิดสุสานตุตันคาเมน ปี 1922', TX, 480 * u, t - 0.6, { size: 46 * u, weight: 800, color: KC.copLite });
      band(1420 * u, 160 * u, 0.85);
      typewriter('CAN YOU SEE ANYTHING Q', TX, 1500 * u, t - 4.4, { size: 54 * u, weight: 700, family: LAT, color: C.cream, align: 'center', cps: 12 });
      finish();
    } },
  // ---------------- errors on the sculpture
  { from: bar(43), to: bar(46), cues: [[0.2, 'pop', 0.6], [0.8, 'pop', 0.6], [1.4, 'pop', 0.6], [3.75, 'impact', 0.8], [5.6, 'thump', 0.5]],
    draw(t) {
      sky(0.5);
      kicker('คำสะกดผิดบนประติมากรรม', TX, 270 * u, t, { color: KC.copLite });
      [['IQLUSION', 1, 'K1'], ['UNDERGRUUND', 7, 'K2'], ['DESPARATLY', 4, 'K3']].forEach(([w, bad, k], j) => {
        const p = spring(t - 0.2 - j * 0.6, 'snappy'); if (p <= 0) return;
        const y = 470 * u + j * 150 * u, cell = 58 * u, x0 = TX - (w.length * cell) / 2 + 40 * u;
        g.save(); g.translate((1 - p) * W, 0);
        text(g, k, x0 - 70 * u, y + 18 * u, { size: 36 * u, weight: 700, family: LAT, color: C.fog });
        [...w].forEach((L, i) => { const hot = i === bad && t > 2.0;
          if (hot) { g.fillStyle = KC.cop; g.fillRect(x0 + i * cell + 2 * u, y - 44 * u, cell - 4 * u, 78 * u); }
          text(g, L, x0 + (i + 0.5) * cell, y + 20 * u, { size: 56 * u, weight: 700, family: LAT, color: hot ? KC.bg : C.cream }); });
        g.restore(); });
      stamp('ERROR?', TX, 1000 * u, t - 3.75, { size: 100 * u, rot: -0.1, color: KC.copLite });
      band(1180 * u, 400 * u, 0.85);
      const y = say('ซานบอร์นยอมรับว่าสะกดผิดบางคำโดยตั้งใจ', TX, 1260 * u, t - 3.0, { size: 40 * u, weight: 800, color: C.cream });
      say('ปี 2006 เขายังบอกว่า บน K2\nมีตัวอักษรตกหล่นไป 1 ตัว', TX, y + 20 * u, t - 5.6, { size: 44 * u, weight: 800, color: KC.copLite });
      finish();
    } },
  // ---------------- K4 holds out
  { from: bar(46), to: bar(49), cues: [[0.2, 'riser', 0.5], [2.5, 'impact', 1.0], [5.0, 'thump', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 18); g.translate(sx, sy);
      sky(0.5);
      kicker('แล้ว K4 ล่ะ?', TX, 270 * u, t, { color: KC.copLite });
      letterGrid(K4, TX, 420 * u, 14, 60 * u, { color: 'rgba(232,174,114,0.85)' });
      big('?', TX, 1180 * u, t - 2.5, { size: 300 * u, color: KC.copLite });
      band(1300 * u, 280 * u, 0.85);
      const y = say('หลายสิบปีผ่านไป ยังไม่มีใครไขได้', TX, 1370 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.cream });
      say('ซานบอร์นจึงเริ่มปล่อยคำใบ้', TX, y + 6 * u, t - 5.0, { size: 46 * u, weight: 800, color: KC.copLite });
      finish();
    } },
  // ---------------- BERLIN 2010, CLOCK 2014
  { from: bar(49), to: bar(52), cues: [[0.6, 'chime', 0.6], [3.1, 'chime', 0.6], [5.0, 'tick', 0.5], [5.6, 'tick', 0.5]],
    draw(t) {
      sky(0.45);
      const on = []; if (t > 0.6) on.push('BERLIN'); if (t > 3.1) on.push('CLOCK');
      const hiF = (i) => (inR(i, 63, 68) ? clamp((t - 0.4) / 0.2) : 0) + (inR(i, 69, 73) ? clamp((t - 2.9) / 0.2) : 0);
      letterGrid(K4, TX, 300 * u, 14, 60 * u, { hi: hiF, sub: clueSub(on), color: 'rgba(239,230,210,0.35)' });
      const tag = (s, y, at) => text(g, s, TX, y, { size: 44 * u, weight: 700, family: THAI, color: KC.copLite, alpha: clamp((t - at) / 0.3) });
      tag('ปี 2010 · ตำแหน่ง 64–69 = BERLIN', 880 * u, 0.8); tag('ปี 2014 · ตำแหน่ง 70–74 = CLOCK', 945 * u, 3.3);
      const cs = spring(t - 4.6, 'playful');
      if (cs > 0) clockFace(TX, 1160 * u, 140 * u * cs, t);
      band(1330 * u, 250 * u, 0.85);
      say('BERLIN CLOCK — นาฬิกาเบอร์ลิน?', TX, 1400 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.cream });
      say('ความหมายจริงยังเป็นปริศนา', TX, 1500 * u, t - 6.0, { size: 40 * u, weight: 800, color: C.fog });
      finish();
    } },
  // ---------------- 2020: NORTHEAST, EAST
  { from: bar(52), to: bar(55), cues: [[0.6, 'chime', 0.6], [3.1, 'chime', 0.6], [4.5, 'swish', 0.5]],
    draw(t) {
      sky(0.5);
      const on = ['BERLIN', 'CLOCK']; if (t > 0.6) on.push('NORTHEAST'); if (t > 3.1) on.push('EAST');
      const hiF = (i) => (inR(i, 63, 73) ? 0.5 : 0) + (inR(i, 25, 33) ? clamp((t - 0.4) / 0.2) : 0) + (inR(i, 21, 24) ? clamp((t - 2.9) / 0.2) : 0);
      letterGrid(K4, TX, 300 * u, 14, 60 * u, { hi: hiF, sub: clueSub(on), color: 'rgba(239,230,210,0.35)' });
      text(g, 'ปี 2020 · ตำแหน่ง 26–34 = NORTHEAST', TX, 880 * u, { size: 42 * u, weight: 700, family: THAI, color: KC.copLite, alpha: clamp((t - 0.8) / 0.3) });
      text(g, 'และ 22–25 = EAST', TX, 945 * u, { size: 42 * u, weight: 700, family: THAI, color: KC.copLite, alpha: clamp((t - 3.3) / 0.3) });
      const ang = track(t, [[0, -1.2], [3.4, Math.PI * 3 / 8]], 'playful');
      compass(TX, 1180 * u, 130 * u, ang);
      band(1360 * u, 220 * u, 0.85);
      say('รวมกันเป็น EAST NORTHEAST', TX, 1420 * u, t - 4.5, { size: 46 * u, weight: 800, color: C.cream });
      say('ทิศตะวันออกค่อนเหนือ', TX, 1510 * u, t - 5.2, { size: 40 * u, weight: 800, color: C.fog });
      finish();
    } },
  // ---------------- August 2025: the auction is announced
  { from: bar(55), to: bar(57), cues: [[0.2, 'thump', 0.6], [1.6, 'impact', 1.0], [2.8, 'pop', 0.5]],
    draw(t) {
      sky(0.55);
      const pp = spring(t - 0.3, 'default');
      g.save(); g.globalAlpha = pp; copperSheet(TX - 330 * u, 640 * u, 660 * u, 200 * u, { cols: 14, rows: 3, curve: 0, lit: 0.9, seed: 55, show: Math.floor(remap(t, 0.3, 1.5) * 42) }); g.restore();
      text(g, 'ต้นแบบแผ่นทองแดง (ภาพจำลอง)', TX, 900 * u, { size: 32 * u, weight: 700, family: THAI, color: C.fog, alpha: pp });
      const a = track(t, [[0, -0.9], [1.3, 0.25]], 'snappy');
      g.fillStyle = '#4A2E18'; rrect(g, TX - 200 * u, 1200 * u, 400 * u, 64 * u, 10 * u); g.fill();
      gavel(TX + 60 * u, 1150 * u, 280 * u, a);
      kicker('สิงหาคม 2025', TX, 270 * u, t, { color: KC.copLite });
      say('Jim Sanborn ประกาศ\nนำคำเฉลย K4 ออกประมูล', TX, 390 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      band(1320 * u, 250 * u, 0.85);
      say('พร้อมแผ่นทองแดงต้นแบบ\nและเอกสารการเข้ารหัส', TX, 1400 * u, t - 2.6, { size: 44 * u, weight: 800, color: KC.copLite });
      finish();
    } },
  // ---------------- September 2025: the archive
  { from: bar(57), to: bar(60), cues: [[0.2, 'whoosh', 0.5], [2.5, 'impact', 0.9], [5.0, 'thump', 0.6]],
    draw(t) {
      sky(0.6);
      // archive boxes
      for (let i = 0; i < 6; i++) { const x = 110 * u + (i % 3) * 290 * u, y = 640 * u + Math.floor(i / 3) * 210 * u;
        g.fillStyle = '#8C7A5C'; g.fillRect(x, y, 250 * u, 180 * u); g.fillStyle = '#E6DCC4'; g.fillRect(x + 70 * u, y + 40 * u, 110 * u, 50 * u);
        g.fillStyle = '#4A4236'; g.fillRect(x + 85 * u, y + 58 * u, 80 * u, 6 * u); g.fillRect(x + 85 * u, y + 72 * u, 50 * u, 6 * u); }
      // scraps rise out of one box
      for (let k = 0; k < 4; k++) { const p = spring(t - 2.5 - k * 0.3, 'default'); if (p <= 0) continue;
        g.save(); g.translate(TX + (k - 1.5) * 170 * u, 960 * u - p * 140 * u - (k % 2) * 30 * u); g.rotate((hash(k, 71) - 0.5) * 0.4);
        g.fillStyle = '#F3EBD8'; g.fillRect(-75 * u, -55 * u, 150 * u, 110 * u);
        g.font = `700 ${22 * u}px ${LAT}`; g.fillStyle = '#4A4236'; g.textAlign = 'center';
        for (let r = 0; r < 3; r++) { let s = ''; for (let c = 0; c < 8; c++) s += rndL(k * 40 + r * 8 + c, 88); g.fillText(s, 0, -18 * u + r * 30 * u); }
        g.restore(); }
      kicker('กันยายน 2025', TX, 270 * u, t, { color: KC.copLite });
      const y0 = say('นักเขียน 2 คน\nJarett Kobek และ Richard Byrne', TX, 370 * u, t - 0.2, { size: 42 * u, weight: 800, color: C.cream });
      say('ค้นคลังเอกสารที่ Smithsonian', TX, y0 + 10 * u, t - 0.6, { size: 46 * u, weight: 800, color: KC.copLite });
      band(1180 * u, 400 * u, 0.85);
      const y = say('พบเศษกระดาษที่มีข้อความ K4', TX, 1260 * u, t - 2.5, { size: 48 * u, weight: 800, color: C.cream });
      say('ซานบอร์นบอกว่าเขาใส่ปนไปโดยไม่ตั้งใจ', TX, y + 20 * u, t - 5.0, { size: 42 * u, weight: 800, color: KC.copLite });
      finish();
    } },
  // ---------------- November 2025: sold
  { from: bar(60), to: bar(62), cues: [[0.2, 'thump', 0.6], [1.2, 'impact', 1.1], [3.0, 'pop', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 1.2, 18); g.translate(sx, sy);
      sky(0.45);
      kicker('20 พฤศจิกายน 2025', TX, 300 * u, t, { color: KC.copLite });
      const v = Math.round(962500 * clamp(spring(t - 0.2, 60, 16)));
      text(g, `$${v.toLocaleString('en-US')}`, TX, 620 * u, { size: 170 * u, weight: 400, family: SERIF, color: C.cream });
      say('ขายให้ผู้ซื้อที่ไม่เปิดเผยชื่อ', TX, 760 * u, t - 1.2, { size: 50 * u, weight: 800, color: KC.copLite });
      g.save(); g.globalAlpha = clamp((t - 2.6) / 0.3); g.strokeStyle = KC.copLite; g.lineWidth = 6 * u;
      rrect(g, TX - 140 * u, 900 * u, 280 * u, 220 * u, 14 * u); g.stroke(); g.beginPath(); g.arc(TX, 900 * u, 90 * u, Math.PI, 0); g.stroke();
      g.fillStyle = KC.copLite; g.beginPath(); g.arc(TX, 1000 * u, 22 * u, 0, 7); g.fill(); g.fillRect(TX - 8 * u, 1000 * u, 16 * u, 60 * u); g.restore();
      band(1200 * u, 380 * u, 0.85);
      say('มีรายงานว่า Smithsonian\nปิดผนึกเอกสารชุดนั้นไว้ 50 ปี', TX, 1280 * u, t - 3.0, { size: 46 * u, weight: 800, color: C.cream });
      finish();
    } },
  // ---------------- discovered ≠ solved
  { from: bar(62), to: bar(64), cues: [[0.2, 'thump', 0.6], [1.2, 'swish', 0.5], [2.6, 'thump', 0.6]],
    draw(t) {
      sky(0.5);
      kicker('ณ ปี 2026', TX, 270 * u, t, { color: KC.copLite });
      const p = spring(t - 0.3, 'snappy'), q = spring(t - 1.2, 'snappy');
      g.save(); g.translate(TX, 600 * u); g.scale(p, p); g.fillStyle = KC.bg3; rrect(g, -360 * u, -100 * u, 720 * u, 200 * u, 16 * u); g.fill();
      text(g, 'คำตอบ “ถูกค้นพบ”', 0, 22 * u, { size: 64 * u, weight: 800, family: THAI, color: C.cream }); g.restore();
      g.save(); g.translate(TX, 860 * u); g.scale(q, q); g.fillStyle = KC.cop; rrect(g, -360 * u, -100 * u, 720 * u, 200 * u, 16 * u); g.fill();
      text(g, 'แต่ยังไม่มีใคร “ไข” ได้', 0, 22 * u, { size: 60 * u, weight: 800, family: THAI, color: KC.bg }); g.restore();
      const y = say('ข้อความเต็มยังไม่ถูกเผยแพร่ต่อสาธารณะ', TX, 1120 * u, t - 2.4, { size: 44 * u, weight: 800, color: C.cream });
      say('และวิธีเข้ารหัสของ K4\nยังไม่มีใครพิสูจน์ได้ เท่าที่เปิดเผย', TX, y + 20 * u, t - 3.0, { size: 44 * u, weight: 800, color: KC.copLite });
      finish();
    } },
  // ---------------- closing title
  { from: bar(64), to: bar(68), cues: [[0, 'thump', 0.9], [5.0, 'swish', 0.4]],
    draw(t) {
      sky(0.55, 0.3);
      g.save(); g.globalAlpha = 0.35;
      copperSheet(40 * u, 1180 * u, W - 80 * u, 380 * u, { cols: 26, rows: 8, curve: 0.8, lit: 0.8, seed: 30, phase: t * 0.2 });
      g.restore();
      big('K4', TX, 760 * u, t, { size: 300 * u, color: C.cream });
      const p = spring(t - 0.7, 'default');
      g.fillStyle = KC.cop; g.fillRect(TX - 330 * u * p, 840 * u, 660 * u * p, 10 * u);
      say('Kryptos', TX, 980 * u, t - 1.0, { size: 70 * u, weight: 400, family: SERIF, color: KC.copLite });
      say('คำตอบมีอยู่จริง แต่กุญแจยังเป็นความลับ', TX, 1090 * u, t - 2.0, { size: 44 * u, weight: 800, color: C.cream });
      finish();
    } },
  // ---------------- question
  { from: bar(68), to: bar(72), cues: Array.from({ length: 8 }, (_, i) => [i * 0.625, 'tick', 0.3]).concat([[5.0, 'chime', 0.8]]),
    draw(t) {
      sky(0.5, 0.35);
      copperSheet(40 * u, 620 * u, W - 80 * u, 860 * u, { cols: 22, rows: 22, curve: 0.75, lit: 1, seed: 4, phase: t * 0.15,
        letter: (i, r, c) => (r >= 10 && r <= 16 && c >= 4 && c < 18 ? K4[(r - 10) * 14 + (c - 4)] : '') || rndL(i, 4) });
      band(200 * u, 330 * u, 0.88);
      say('ถ้าคุณได้รู้คำตอบของ K4', TX, 310 * u, t - 0.3, { size: 52 * u, weight: 800, color: C.cream });
      say('จะเปิดเผย หรือเก็บเป็นความลับ?', TX, 410 * u, t - 1.0, { size: 52 * u, weight: 800, color: KC.copLite });
      band(1450 * u, 130 * u, 0.88);
      say('คอมเมนต์บอกได้เลย', TX, 1530 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.cream });
      finish();
    } },
];
