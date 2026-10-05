// Voynich Manuscript — Act 2: 0:45–3:00 (bars 18–72).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake } from './kit.js';
import { V, glyph, vword, wordW, drawWord, vtext, vellum, plant, zodiac, star, openBook, pools, jar, coin, cipherGrid, library, envelope } from './a1.js';

const band = (y, h, dark = 0) => { g.fillStyle = dark ? 'rgba(20,14,8,0.86)' : 'rgba(239,230,210,0.9)'; g.fillRect(0, y, W, h); };

export default () => [
  // ---------------------------------------------------------------- bathing section
  { from: bar(18), to: bar(21), cues: [[0.2, 'swish', 0.5], [1.0, 'pop', 0.4], [1.4, 'pop', 0.4], [1.8, 'pop', 0.4], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      vellum(90 * u, 540 * u, W - 180 * u, 860 * u, { seed: 51 });
      pools(t, remap(t, 0.3, 2.2));
      kicker('ส่วนที่สาม · “ผู้หญิงในอ่างน้ำ”', TX, 300 * u, t);
      say('ผู้หญิงแช่อยู่ในสระน้ำสีเขียว\nเชื่อมกันด้วยท่อรูปร่างประหลาด', TX, 400 * u, t - 0.2, { size: 44 * u, weight: 800 });
      say('บางคนว่าเป็นการอาบน้ำบำบัด\nบางคนว่าเป็นอวัยวะในร่างกาย', TX, 1460 * u, t - 5.0, { size: 42 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- recipes
  { from: bar(21), to: bar(24), cues: [[0.2, 'pop', 0.5], [0.5, 'pop', 0.5], [0.8, 'pop', 0.5], [2.5, 'type', 0.5], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      vellum(90 * u, 520 * u, W - 180 * u, 780 * u, { seed: 61 });
      for (let i = 0; i < 4; i++) { const p = clamp(spring(t - 0.2 - i * 0.3, 'playful')); if (p <= 0) continue;
        g.save(); g.translate(210 * u + i * 210 * u, 760 * u); g.scale(p, p); jar(0, 0, 150 * u, i + 2); g.restore(); }
      for (let r = 0; r < 4; r++) { const y = 860 * u + r * 105 * u, q = remap(t, 2.3 + r * 0.6, 3.3 + r * 0.6); if (q <= 0) continue;
        g.save(); g.fillStyle = r % 2 ? V.rust : '#C9A44A'; g.beginPath(); star(180 * u, y - 10 * u, 22 * u * clamp(q * 3)); g.fill(); g.restore();
        vtext(230 * u, y, 640 * u, 1, 20 * u, 70 + r, q); vtext(230 * u, y + 46 * u, 520 * u, 1, 20 * u, 80 + r, q); }
      kicker('ส่วนท้ายเล่ม', TX, 300 * u, t);
      say('โถยา รากไม้ และย่อหน้าสั้น ๆ\nที่มีรูปดาวกำกับ', TX, 400 * u, t - 0.2, { size: 44 * u, weight: 800 });
      say('หลายคนเชื่อว่าเป็น “สูตรยา”', TX, 1420 * u, t - 5.0, { size: 54 * u, weight: 800, color: C.red });
      say('แต่ไม่มีใครอ่านส่วนผสมออก', TX, 1520 * u, t - 6.0, { size: 40 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- where did it come from
  { from: bar(24), to: bar(26), cues: [[0.1, 'thump', 0.7], [1.25, 'thump', 0.7], [2.5, 'thump', 0.7], [3.75, 'riser', 0.5]],
    draw(t) {
      night('#140E09');
      ['ใครเขียน?', 'เขียนเมื่อไร?', 'เขียนไปเพื่ออะไร?'].forEach((s, i) =>
        say(s, TX, 640 * u + i * 190 * u, t - 0.1 - i * 1.25, { size: 92 * u, weight: 800, color: i === 2 ? C.red : C.cream }));
      vtext(110 * u, 1300 * u, W - 220 * u, 1, 34 * u, 91, remap(t, 0, 4), { color: 'rgba(232,216,178,0.35)' });
      say('ย้อนรอยจากหลักฐานที่มีอยู่จริง', TX, 1450 * u, t - 3.75, { size: 42 * u, weight: 800, color: C.fog });
      finish();
    } },
  // ---------------------------------------------------------------- Marci letter
  { from: bar(26), to: bar(29), cues: [[0.2, 'whoosh', 0.5], [1.0, 'pop', 0.6], [2.6, 'pop', 0.6], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      const A = [700 * u, 760 * u], B = [330 * u, 1180 * u];
      const pts = Array.from({ length: 21 }, (_, i) => { const k = i / 20; return [A[0] + (B[0] - A[0]) * k - Math.sin(k * Math.PI) * 140 * u, A[1] + (B[1] - A[1]) * k]; });
      const hd = path(pts, remap(t, 1.2, 3.2), { color: C.red, width: 6 * u, dash: [18 * u, 14 * u] });
      pin(...A, t - 0.8, { label: 'ปราก', labelColor: C.ink, side: 1 });
      pin(...B, t - 2.6, { label: 'โรม', labelColor: C.ink, side: 1 });
      // the letter itself: folded sheet with lines of handwriting (abstract strokes)
      const lp = clamp(spring(t - 4.6, 'heavy'));
      if (lp > 0) { g.save(); g.translate(690 * u, 1050 * u + (1 - lp) * 120 * u); g.rotate(0.06); g.globalAlpha = lp;
        g.shadowColor = 'rgba(40,25,10,0.3)'; g.shadowBlur = 20 * u; g.fillStyle = '#F4EAD2'; g.fillRect(-170 * u, -150 * u, 340 * u, 280 * u); g.shadowColor = 'transparent';
        g.strokeStyle = 'rgba(70,50,30,0.7)'; g.lineWidth = 3 * u;
        for (let l = 0; l < 7; l++) { g.beginPath(); for (let k = 0; k <= 30; k++) { const x = -140 * u + k * 9 * u * (l === 6 ? 0.5 : 1); g.lineTo(x, -110 * u + l * 34 * u + Math.sin(k * 2.1 + l) * 5 * u); } g.stroke(); }
        g.restore(); }
      if (t > 1.2 && t < 3.4) envelope(hd.x, hd.y, 110 * u, Math.sin(t * 4) * 0.1);
      kicker('ปี 1665 หรือ 1666', TX, 300 * u, t);
      say('Johannes Marcus Marci\nนักวิทยาศาสตร์แห่งปราก', TX, 400 * u, t - 0.2, { size: 46 * u, weight: 800 });
      say('ส่งหนังสือเล่มนี้ไปให้ Athanasius Kircher\nนักปราชญ์เยสุอิตชื่อดังที่กรุงโรม', TX, 1340 * u, t - 2.8, { size: 40 * u, weight: 800 });
      say('พร้อมจดหมายหนึ่งฉบับ', TX, 1500 * u, t - 5.0, { size: 48 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(29), to: bar(32), cues: Array.from({ length: 10 }, (_, i) => [0.4 + i * 0.16, 'tick', 0.45]).concat([[4.4, 'impact', 0.9]]),
    draw(t) {
      const [sx, sy] = shake(t, 4.4, 16); g.translate(sx, sy);
      paper();
      kicker('ในจดหมายเล่าว่า', TX, 300 * u, t);
      say('มีคนเล่าว่า จักรพรรดิรูดอล์ฟที่ 2\nเคยซื้อหนังสือนี้ไว้', TX, 400 * u, t - 0.2, { size: 46 * u, weight: 800 });
      const n = Math.min(60, Math.floor(remap(t, 0.4, 2.2) * 60));
      for (let i = 0; i < n; i++) { const c = i % 5, r = Math.floor(i / 5); coin(270 * u + c * 120 * u + (r % 2) * 18 * u, 1120 * u - r * 22 * u, 52 * u); }
      const v = Math.round(600 * clamp(spring(t - 0.4, 30, 11)));
      text(g, `${Math.min(v, 600)}`, TX, 1330 * u, { size: 140 * u, weight: 400, family: SERIF, color: C.red, alpha: clamp((t - 0.4) / 0.2) });
      say('ดูกัต (เหรียญทอง)', TX, 1420 * u, t - 1.0, { size: 40 * u, weight: 800, color: C.inkSoft });
      stamp('HEARSAY', TX, 860 * u, t - 4.4, { size: 100 * u, rot: -0.12 });
      say('เป็นแค่คำบอกเล่า ยังไม่มีเอกสารยืนยัน', TX, 1530 * u, t - 5.0, { size: 40 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(32), to: bar(34), cues: [[0.2, 'swish', 0.5], [2.5, 'thump', 0.6]],
    draw(t) {
      paper();
      const s = clamp(spring(t - 0.2, 'heavy'));
      g.save(); g.globalAlpha = s; person(TX, 1000 * u, 170 * u, C.inkSoft);
      // monk's hood
      g.fillStyle = C.inkSoft; g.beginPath(); g.moveTo(TX - 80 * u, 870 * u); g.quadraticCurveTo(TX, 720 * u, TX + 80 * u, 870 * u); g.lineTo(TX + 70 * u, 900 * u); g.lineTo(TX - 70 * u, 900 * u); g.fill();
      g.restore();
      kicker('ผู้เขียนคือใคร?', TX, 300 * u, t);
      say('จดหมายยังเล่าว่า มีคนเชื่อว่า\nผู้เขียนคือ Roger Bacon', TX, 400 * u, t - 0.2, { size: 46 * u, weight: 800 });
      say('นักปราชญ์อังกฤษ ศตวรรษที่ 13', TX, 1240 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- 1912 Voynich
  { from: bar(34), to: bar(37), cues: [[0.2, 'tick', 0.6], [0.6, 'tick', 0.6], [1.0, 'thump', 0.6], [2.5, 'pop', 0.6], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      kicker('ผ่านไปราว 250 ปี', TX, 300 * u, t);
      const ys = ['1665', '1750', '1850', '1912'], dw = 170 * u, x0 = TX - 1.5 * (dw + 14 * u);
      for (let d = 0; d < 4; d++) flip(x0 + d * (dw + 14 * u), 560 * u, dw, 250 * u, ys.map((y) => y[d]), ys.map((_, i) => 0.2 + i * 0.4), t, { size: 190 * u });
      const p = clamp(spring(t - 2.3, 'heavy'));
      g.save(); g.globalAlpha = p; person(TX - 250 * u, 1060 * u, 110 * u, C.ink, { tie: C.red });
      g.translate(TX + 170 * u, 960 * u); g.rotate(-0.08); g.fillStyle = '#5A3A22'; rrect(g, -120 * u, -150 * u, 240 * u, 300 * u, 10 * u); g.fill();
      g.fillStyle = V.vel; g.fillRect(-100 * u, -130 * u, 200 * u, 260 * u); vtext(-85 * u, -95 * u, 170 * u, 4, 12 * u, 4, 1);
      envelope(40 * u, 60 * u, 120 * u, 0.15);
      g.restore();
      say('Wilfrid Voynich พ่อค้าหนังสือเก่า', TX, 1220 * u, t - 2.5, { size: 46 * u, weight: 800 });
      say('ซื้อมาจากคณะเยสุอิต ที่ Villa Mondragone\nใกล้กรุงโรม', TX, 1320 * u, t - 3.5, { size: 40 * u, weight: 800, color: C.inkSoft });
      say('จดหมายของ Marci ยังแนบอยู่ในเล่ม', TX, 1500 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(37), to: bar(40), cues: [[0.2, 'whoosh', 0.5], [2.5, 'impact', 0.8], [5.0, 'chime', 0.5]],
    draw(t) {
      paper();
      const rise = track(t, [[0, 200 * u], [0.1, 0]], 'heavy');
      g.save(); g.translate(0, rise); library(TX, 1100 * u, 640 * u, 320 * u); g.restore();
      kicker('ตั้งแต่ปี 1969', TX, 300 * u, t);
      say('อยู่ที่ห้องสมุด Beinecke\nมหาวิทยาลัย Yale สหรัฐอเมริกา', TX, 400 * u, t - 0.2, { size: 46 * u, weight: 800 });
      big('MS 408', TX, 1300 * u, t - 2.5, { size: 150 * u, color: C.red });
      say('ทุกหน้าถูกสแกน เปิดให้ทุกคนดูออนไลน์', TX, 1460 * u, t - 5.0, { size: 42 * u, weight: 800 });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- Friedman
  { from: bar(40), to: bar(43), cues: [[0.2, 'riser', 0.5], [2.5, 'thump', 0.7], [5.0, 'type', 0.5]],
    draw(t) {
      night('#0E1018');
      g.save(); g.globalAlpha = clamp(t / 0.6);
      person(TX, 960 * u, 180 * u, '#46506A', { tie: C.red });
      g.restore();
      // faint grid of glyphs behind
      g.save(); g.globalAlpha = 0.18; for (let i = 0; i < 6; i++) vtext(80 * u, 640 * u + i * 60 * u, W - 160 * u, 1, 18 * u, 100 + i, 1, { color: C.cream }); g.restore();
      kicker('สงครามโลกครั้งที่ 2', TX, 300 * u, t);
      text(g, 'William Friedman', TX, 440 * u, { size: 84 * u, weight: 400, family: SERIF, color: C.cream, alpha: clamp((t - 0.3) / 0.4) });
      band(1180 * u, 390 * u, 1);
      say('นักถอดรหัสระดับตำนานของสหรัฐฯ\nทีมของเขาเจาะรหัส Purple ของญี่ปุ่น', TX, 1250 * u, t - 2.5, { size: 42 * u, weight: 800, color: C.cream });
      say('ปี 1944 เขาตั้งทีมศึกษาต้นฉบับนี้', TX, 1460 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(43), to: bar(46), cues: Array.from({ length: 12 }, (_, i) => [0.2 + i * 0.17, 'tick', 0.4]).concat([[3.75, 'impact', 1.0], [5.6, 'thump', 0.6]]),
    draw(t) {
      const [sx, sy] = shake(t, 3.75, 18); g.translate(sx, sy);
      paper();
      kicker('ผลลัพธ์', TX, 300 * u, t);
      say('นับตัวอักษร วิเคราะห์ความถี่\nศึกษาอยู่หลายสิบปี', TX, 400 * u, t - 0.2, { size: 46 * u, weight: 800 });
      cipherGrid(TX, 900 * u, 6, 5, 120 * u, t, { fail: t > 3.75 ? 1 : 0 });
      stamp('FAILED', TX, 900 * u, t - 3.75, { size: 120 * u, rot: -0.12 });
      say('Friedman เชื่อว่ามันอาจเป็น\n“ภาษาประดิษฐ์” ที่คิดขึ้นใหม่', TX, 1340 * u, t - 5.6, { size: 44 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- carbon dating
  { from: bar(46), to: bar(50), cues: [[0.2, 'whoosh', 0.5], [2.5, 'riser', 0.5], [3.75, 'impact', 0.9], [6.25, 'thump', 0.6], [8.0, 'pop', 0.5]],
    draw(t) {
      paper();
      kicker('ปี 2009 · University of Arizona', TX, 300 * u, t);
      say('ตัดชิ้นหนังเล็ก ๆ ไปตรวจด้วยคาร์บอน-14', TX, 400 * u, t - 0.2, { size: 44 * u, weight: 800 });
      // timeline 1200–1700
      const X = (y) => 120 * u + ((y - 1200) / 500) * 800 * u, Y = 820 * u, a = clamp(spring(t - 0.8, 'default'));
      g.strokeStyle = C.ink; g.lineWidth = 5 * u; g.beginPath(); g.moveTo(X(1200), Y); g.lineTo(X(1200) + (X(1700) - X(1200)) * a, Y); g.stroke();
      [1200, 1300, 1400, 1500, 1600, 1700].forEach((y, i) => { if (a < i / 5) return; g.fillStyle = C.ink; g.fillRect(X(y) - 2 * u, Y - 14 * u, 4 * u, 28 * u);
        text(g, `${y}`, X(y), Y + 60 * u, { size: 30 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft }); });
      // Bacon marker
      if (t > 2.0) { g.fillStyle = C.inkSoft; g.beginPath(); g.arc(X(1292), Y, 12 * u, 0, 7); g.fill();
        text(g, 'Bacon เสียชีวิต 1292', X(1292), Y - 40 * u, { size: 28 * u, weight: 700, family: THAI, color: C.inkSoft, alpha: clamp((t - 2) / 0.3) }); }
      const b = clamp(spring(t - 3.75, 'snappy'));
      if (b > 0) { g.fillStyle = 'rgba(200,50,30,0.85)'; const xa = X(1404), xb = X(1438), m = (xa + xb) / 2;
        g.fillRect(m - (m - xa) * b, Y - 60 * u, (xb - xa) * b, 120 * u); }
      big('1404–1438', TX, 1110 * u, t - 3.75, { size: 150 * u, color: C.red });
      say('หนังผลิตขึ้นช่วงต้นศตวรรษที่ 15', TX, 1230 * u, t - 4.5, { size: 46 * u, weight: 800 });
      say('หลัง Roger Bacon เสียชีวิตไปกว่า 100 ปี', TX, 1350 * u, t - 6.25, { size: 44 * u, weight: 800, color: C.red });
      say('* วัดอายุของหนัง ไม่ใช่วันที่ลงมือเขียน', TX, 1490 * u, t - 8.0, { size: 36 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- statistics
  { from: bar(50), to: bar(53), cues: Array.from({ length: 10 }, (_, i) => [0.4 + i * 0.12, 'pop', 0.3]).concat([[2.5, 'thump', 0.6], [5.0, 'thump', 0.6]]),
    draw(t) {
      paper();
      kicker('แล้วมันเป็นภาษาจริงไหม?', TX, 300 * u, t);
      say('ทั้งเล่มมีราว 170,000 ตัวอักษร', TX, 400 * u, t - 0.2, { size: 46 * u, weight: 800 });
      const base = 1100 * u, n = 10;
      for (let i = 0; i < n; i++) { const p = clamp(spring(t - 0.4 - i * 0.12, 'snappy')), h = (440 / (i + 1)) * u * p, x = 150 * u + i * 76 * u;
        g.fillStyle = i === 0 ? C.red : C.inkSoft; g.fillRect(x, base - h, 52 * u, h);
        if (p > 0.5) { g.save(); g.translate(x + 34 * u, base + 20 * u); g.rotate(Math.PI / 2); drawWord(vword(200 + i).slice(0, 4), 0, 0, 22 * u); g.restore(); } }
      g.strokeStyle = C.ink; g.lineWidth = 3 * u; g.beginPath(); g.moveTo(130 * u, base); g.lineTo(930 * u, base); g.stroke();
      text(g, 'คำที่พบบ่อย → พบน้อย', TX, 560 * u, { size: 30 * u, weight: 700, family: THAI, color: C.inkSoft, alpha: clamp((t - 0.6) / 0.3) });
      say('นักวิจัยพบว่าความถี่ของคำ\nมีรูปแบบคล้ายภาษาจริง', TX, 1310 * u, t - 2.5, { size: 46 * u, weight: 800 });
      say('ไม่น่าใช่การขีดเขียนมั่ว ๆ แบบสุ่ม', TX, 1480 * u, t - 5.0, { size: 42 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(53), to: bar(55), cues: [[0.3, 'pop', 0.6], [0.8, 'pop', 0.6], [1.3, 'pop', 0.6], [2.5, 'thump', 0.6]],
    draw(t) {
      paper();
      g.fillStyle = V.vel; g.fillRect(0, 640 * u, W, 360 * u);
      const wd = vword(77), s = 40 * u, ww = wordW(wd, s), gap = 50 * u, x0 = TX - (ww * 3 + gap * 2) / 2;
      for (let i = 0; i < 3; i++) { const p = clamp(spring(t - 0.3 - i * 0.5, 'snappy')); if (p <= 0) continue;
        g.save(); g.globalAlpha = p; drawWord(wd, x0 + i * (ww + gap), 850 * u, s); g.restore();
        g.fillStyle = C.red; g.fillRect(x0 + i * (ww + gap), 885 * u, ww * p, 6 * u); }
      vtext(80 * u, 730 * u, W - 160 * u, 1, 22 * u, 300, 1, { color: 'rgba(90,59,34,0.4)' });
      vtext(80 * u, 960 * u, W - 160 * u, 1, 22 * u, 301, 1, { color: 'rgba(90,59,34,0.4)' });
      kicker('แต่ก็มีจุดแปลก', TX, 300 * u, t);
      say('คำเดียวกันซ้ำติดกัน 2–3 ครั้ง', TX, 400 * u, t - 0.2, { size: 50 * u, weight: 800 });
      say('ซึ่งพบได้ยากในภาษาทั่วไป', TX, 1180 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- claimed solutions
  { from: bar(55), to: bar(58), cues: [[0.2, 'swish', 0.5], [1.2, 'swish', 0.5], [3.0, 'impact', 0.8], [4.0, 'impact', 0.8], [6.0, 'thump', 0.6]],
    draw(t) {
      paper();
      kicker('มีคนประกาศว่า “ไขได้แล้ว”', TX, 300 * u, t);
      say('หลายครั้ง…', TX, 400 * u, t - 0.2, { size: 54 * u, weight: 800 });
      [['2017', 'Nicholas Gibbs', 'อ้างว่าเป็นอักษรย่อภาษาละติน'], ['2019', 'Gerard Cheshire', 'อ้างว่าเป็นภาษา proto-Romance']].forEach(([y, who, what], i) => {
        const p = spring(t - 0.2 - i * 1.0, 'snappy'); if (p <= 0) return;
        const cy = 560 * u + i * 330 * u;
        g.save(); g.translate((1 - p) * W, 0);
        g.fillStyle = C.paper2; rrect(g, 90 * u, cy, W - 230 * u, 280 * u, 16 * u); g.fill();
        text(g, y, 250 * u, cy + 125 * u, { size: 100 * u, weight: 400, family: SERIF, color: C.ink });
        text(g, who, 620 * u, cy + 100 * u, { size: 44 * u, weight: 700, family: 'Inter, sans-serif', color: C.ink });
        text(g, what, 620 * u, cy + 180 * u, { size: 30 * u, weight: 800, family: THAI, color: C.inkSoft });
        g.restore();
        stamp('REJECTED', 250 * u, cy + 215 * u, t - 3.0 - i * 1.0, { size: 44 * u, rot: -0.12, seed: 9 + i });
      });
      say('ผู้เชี่ยวชาญตรวจแล้ว\nคำแปลไม่สมเหตุสมผลทั้งคู่', TX, 1380 * u, t - 6.0, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- hoax hypothesis
  { from: bar(58), to: bar(61), cues: [[0.2, 'thump', 0.6], [1.5, 'swish', 0.5], [3.0, 'pop', 0.5], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      kicker('ปี 2004 · Gordon Rugg', TX, 300 * u, t);
      say('หรือมันเป็นแค่ “เรื่องหลอก”?', TX, 400 * u, t - 0.2, { size: 56 * u, weight: 800 });
      // syllable table + sliding grille card
      const x0 = 150 * u, y0 = 580 * u, cw = 130 * u, ch = 90 * u;
      g.fillStyle = V.vel; g.fillRect(x0, y0, cw * 6, ch * 5);
      for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) { const wd = vword(400 + r * 6 + c).slice(0, 2); drawWord(wd, x0 + c * cw + 30 * u, y0 + r * ch + 60 * u, 30 * u); }
      g.strokeStyle = 'rgba(90,59,34,0.3)'; g.lineWidth = 2 * u; for (let c = 0; c <= 6; c++) { g.beginPath(); g.moveTo(x0 + c * cw, y0); g.lineTo(x0 + c * cw, y0 + ch * 5); g.stroke(); }
      const gx = x0 + track(t, [[0, -700 * u], [1.5, 0], [3.0, cw * 2]], 'default');
      g.save(); g.beginPath(); g.rect(gx, y0 - 20 * u, cw * 3, ch * 5 + 40 * u);
      const holes = [[0, 1], [1, 3], [2, 0]];
      for (const [c, r] of holes) g.rect(gx + c * cw + 10 * u, y0 + r * ch + 10 * u, cw - 20 * u, ch - 20 * u);
      g.fillStyle = 'rgba(40,30,20,0.92)'; g.fill('evenodd'); g.restore();
      g.strokeStyle = C.red; g.lineWidth = 4 * u; for (const [c, r] of holes) g.strokeRect(gx + c * cw + 10 * u, y0 + r * ch + 10 * u, cw - 20 * u, ch - 20 * u);
      say('เขาใช้แผ่นเจาะรู (Cardan grille)\nสร้างข้อความไร้ความหมาย ที่ดูคล้ายกันได้', TX, 1180 * u, t - 3.0, { size: 40 * u, weight: 800 });
      say('แต่นั่นไม่ได้พิสูจน์ว่าเป็นของปลอม', TX, 1380 * u, t - 5.0, { size: 48 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- theories
  { from: bar(61), to: bar(64), cues: [[0.2, 'pop', 0.4], [0.6, 'pop', 0.4], [1.0, 'pop', 0.4], [1.4, 'pop', 0.4], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      g.fillStyle = C.paper2; g.fillRect(60 * u, 520 * u, W - 120 * u, 760 * u);
      [['ภาษาที่สูญหายไปแล้ว', 300, 680], ['รหัสลับ', 700, 760], ['ภาษาประดิษฐ์', 300, 1040], ['ข้อความหลอก', 700, 1120]].forEach(([s, x, y], i) => {
        const p = spring(t - 0.2 - i * 0.4, 'playful'); if (p <= 0) return;
        g.save(); g.translate(x * u, y * u); g.rotate((hash(i, 7) - 0.5) * 0.12); g.scale(p, p);
        g.fillStyle = i === 3 ? C.red : '#F7F1E3'; g.fillRect(-200 * u, -70 * u, 400 * u, 140 * u);
        text(g, s, 0, 14 * u, { size: 36 * u, weight: 800, family: THAI, color: i === 3 ? C.paper : C.ink }); g.restore(); });
      say('ทฤษฎีที่ยังถกเถียงกันอยู่', TX, 330 * u, t - 0.1, { size: 58 * u, weight: 800 });
      say('ผ่านมากว่า 100 ปี ยังไม่มีคำตอบ', TX, 1420 * u, t - 5.0, { size: 50 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- closing card
  { from: bar(64), to: bar(68), cues: [[0, 'thump', 0.9], [5.0, 'swish', 0.4]],
    draw(t) {
      night('#140E09');
      big('MS 408', TX, 820 * u, t, { size: 230 * u, color: C.cream });
      const p = spring(t - 0.7, 'default');
      g.fillStyle = C.red; g.fillRect(TX - 330 * u * p, 900 * u, 660 * u * p, 10 * u);
      say('ต้นฉบับวอยนิช', TX, 1060 * u, t - 1.0, { size: 68 * u, weight: 800, color: C.red });
      say('หนังสือที่ยังไม่มีใครอ่านออก', TX, 1170 * u, t - 1.8, { size: 46 * u, weight: 800, color: C.cream });
      vtext(110 * u, 1380 * u, W - 220 * u, 2, 30 * u, 500, remap(t, 1.5, 8), { color: 'rgba(232,216,178,0.6)' });
      finish();
    } },
  { from: bar(68), to: bar(72), cues: [[0.2, 'type', 0.5], [2.5, 'chime', 0.6], [5.0, 'chime', 0.8]],
    draw(t) {
      g.fillStyle = '#2A1C10'; g.fillRect(0, 0, W, H);
      vellum(40 * u, 120 * u, W - 80 * u, 1460 * u, { seed: 11 });
      vtext(110 * u, 640 * u, W - 220 * u, 2, 30 * u, 3, 1);
      plant(TX + 20 * u, 1180 * u, 260 * u, { seed: 4, grow: 1 });
      vtext(110 * u, 1380 * u, W - 220 * u, 2, 30 * u, 8, remap(t, 0, 8));
      band(190 * u, 380 * u);
      say('คุณคิดว่ามันคือภาษาลับ\nหรือแค่เรื่องหลอก?', TX, 290 * u, t - 0.3, { size: 52 * u, weight: 800, color: C.ink });
      say('คอมเมนต์บอกได้เลย', TX, 500 * u, t - 2.5, { size: 48 * u, weight: 800, color: C.red });
      finish(0.5);
    } },
];
