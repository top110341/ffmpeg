// Act 2 — the search, the theories, the island (1:20–3:00, bars 32–72).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake } from './kit.js';
import { electra, electraSide, waves, cutter, mapPacific, islet, PLACE } from './props.js';

export default () => [
  // ---------------- Chapter 4 — the search
  { from: bar(32), to: bar(36), cues: Array.from({ length: 10 }, (_, i) => [0.3 + i * 0.4, 'tick', 0.35]).concat([[7.5, 'thump', 0.6]]),
    draw(t) {
      const cam = { lat: 0, lon: 180, z: 26 * u };
      const P = mapPacific(cam); topScrim();
      islet(P, PLACE.howland, 6);
      const [hx, hy] = P(PLACE.howland), r = 380 * u * clamp(spring(t - 0.3, 30, 12));
      g.fillStyle = 'rgba(200,50,30,0.18)'; g.beginPath(); g.arc(hx, hy, r, 0, 7); g.fill();
      g.strokeStyle = C.red; g.lineWidth = 3 * u; g.stroke();
      for (let i = 0; i < 10; i++) { const at = 0.3 + i * 0.4; if (t < at) continue; const a = hash(i, 4) * 7, d = hash(i, 5) * r; electra(hx + Math.cos(a) * d, hy + Math.sin(a) * d, 26 * u, a); }
      kicker('การค้นหาครั้งใหญ่ที่สุดในยุคนั้น', TX, 250 * u, t, { color: C.red });
      say('กองทัพเรือและหน่วยยามฝั่งสหรัฐฯ', TX, 345 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.cream });
      say('ค้นหาพื้นที่ราว 650,000 ตร.กม.', TX, 1460 * u, t - 3.0, { size: 52 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(36), to: bar(39), cues: [[0.2, 'thump', 0.6], [2.5, 'impact', 1.0], [5.0, 'type', 0.4]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 20); g.translate(sx, sy);
      paper();
      say('ไม่พบเครื่องบิน ไม่พบร่าง ไม่พบเศษซาก', TX, 520 * u, t - 0.2, { size: 50 * u, weight: 800 });
      stamp('LOST AT SEA?', TX, 880 * u, t - 2.5, { size: 120 * u, rot: -0.08 });
      kicker('มกราคม 1939', TX, 1180 * u, t - 4.5);
      say('ศาลประกาศให้เธอเป็นผู้เสียชีวิต', TX, 1300 * u, t - 5.0, { size: 54 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- Chapter 5 — three theories
  { from: bar(39), to: bar(42), cues: [[0.3, 'pop', 0.6], [2.5, 'pop', 0.6], [5.0, 'pop', 0.6]],
    draw(t) {
      paper();
      kicker('3 ทฤษฎีหลัก', TX, 300 * u, t);
      [['1', 'น้ำมันหมด ตกลงทะเลใกล้ Howland', 0.3], ['2', 'ลงจอดฉุกเฉินบนเกาะร้าง Nikumaroro', 2.5], ['3', 'ถูกญี่ปุ่นจับตัวไป (ไม่มีหลักฐานยืนยัน)', 5.0]].forEach(([n, s, at], i) => {
        const p = spring(t - at, 'snappy'); if (p <= 0) return;
        const y = 600 * u + i * 260 * u;
        g.save(); g.translate((1 - p) * W, 0);
        g.fillStyle = C.paper2; rrect(g, 90 * u, y - 100 * u, W - 220 * u, 200 * u, 14 * u); g.fill();
        text(g, n, 170 * u, y + 40 * u, { size: 130 * u, weight: 400, family: SERIF, color: C.red });
        g.restore();
        g.save(); g.translate((1 - p) * W, 0);
        const lines = s.split(' (');
        text(g, lines[0], 260 * u, y - 4 * u, { size: 40 * u, weight: 800, family: THAI, color: C.ink, align: 'left' });
        if (lines[1]) text(g, '(' + lines[1], 260 * u, y + 52 * u, { size: 32 * u, weight: 600, family: THAI, color: C.inkSoft, align: 'left' });
        g.restore(); });
      finish(0.6);
    } },
  { from: bar(42), to: bar(46), cues: [[0.2, 'whoosh', 0.5], [2.5, 'pop', 0.7], [5.0, 'thump', 0.6], [7.5, 'thump', 0.6]],
    draw(t) {
      night('#071020');
      // the atoll: a ring of land around a lagoon
      g.save(); g.translate(TX, 880 * u); g.scale(spring(t - 0.2, 'heavy'), spring(t - 0.2, 'heavy'));
      g.fillStyle = '#C9B98F'; g.beginPath(); g.ellipse(0, 0, 400 * u, 220 * u, -0.3, 0, 7); g.fill();
      g.fillStyle = '#2F6A73'; g.beginPath(); g.ellipse(0, 0, 330 * u, 160 * u, -0.3, 0, 7); g.fill();
      g.fillStyle = '#2E5A3A'; for (let i = 0; i < 40; i++) { const a = i / 40 * 7; g.beginPath(); g.arc(Math.cos(a) * 365 * u, Math.sin(a) * 190 * u * 1 - Math.cos(a) * 110 * u * 0.3, 14 * u, 0, 7); g.fill(); }
      g.restore();
      kicker('Nikumaroro · ราว 650 กม. ใต้ Howland', TX, 300 * u, t, { color: C.red });
      say('เกาะปะการังที่ไม่มีคนอาศัย', TX, 410 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      say('ปี 1940 มีคนพบกระดูกมนุษย์บนเกาะ', TX, 1300 * u, t - 2.5, { size: 48 * u, weight: 800, color: C.cream });
      say('แต่กระดูกนั้นสูญหายไปภายหลัง', TX, 1410 * u, t - 5.0, { size: 48 * u, weight: 800, color: C.red });
      say('ปี 2018 การวิเคราะห์จากบันทึกเดิม\nชี้ว่าอาจตรงกับสัดส่วนร่างกายของเธอ', TX, 1530 * u, t - 7.5, { size: 38 * u, weight: 700, color: C.fog });
      finish();
    } },
  { from: bar(46), to: bar(50), cues: Array.from({ length: 8 }, (_, i) => [0.4 + i * 0.6, 'tick', 0.4]),
    draw(t) {
      night('#071020');
      waves(TX, 860 * u, t, { dir: 0, spread: Math.PI, color: C.red });
      g.fillStyle = C.cream; rrect(g, TX - 60 * u, 800 * u, 120 * u, 120 * u, 18 * u); g.fill();
      say('หลายวันหลังเครื่องหายไป', TX, 330 * u, t - 0.1, { size: 54 * u, weight: 800, color: C.cream });
      say('มีผู้รายงานว่าได้ยินสัญญาณวิทยุ\nที่อาจมาจากเครื่องของเธอ', TX, 1250 * u, t - 2.0, { size: 48 * u, weight: 800, color: C.cream });
      say('ถ้าจริง เครื่องต้องอยู่บนบก ไม่ใช่ในทะเล', TX, 1480 * u, t - 6.0, { size: 44 * u, weight: 800, color: C.red });
      finish();
    } },
  // ---------------- Chapter 6 — the modern hunt
  { from: bar(50), to: bar(54), cues: [[0.2, 'riser', 0.4], [2.5, 'pop', 0.8], [6.25, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 6.25, 18); g.translate(sx, sy);
      night('#04070D');
      // a sonar strip with a plane-like shadow
      g.fillStyle = '#2B2516'; g.fillRect(80 * u, 560 * u, W - 160 * u, 560 * u);
      for (let i = 0; i < 160; i++) { g.fillStyle = `rgba(214,190,130,${0.1 + hash(i, 3) * 0.3})`; g.fillRect(80 * u + hash(i, 1) * (W - 160 * u), 560 * u + hash(i, 2) * 560 * u, 30 * u, 4 * u); }
      g.save(); g.translate(TX, 840 * u); g.fillStyle = 'rgba(240,220,170,0.75)'; electra(0, 0, 200 * u, 0.3, 'rgba(240,220,170,0.75)'); g.restore();
      kicker('มกราคม 2024', TX, 330 * u, t, { color: C.red });
      say('ภาพโซนาร์ใต้ทะเลลึกเกือบ 5 กม.\nดูเหมือนเครื่องบินลำเล็ก', TX, 1260 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.cream });
      stamp('ROCK', TX, 840 * u, t - 6.25, { size: 160 * u, rot: -0.1 });
      say('พ.ย. 2024: ตรวจซ้ำแล้ว เป็นแค่หินใต้ทะเล', TX, 1500 * u, t - 6.5, { size: 42 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(54), to: bar(58), cues: [[0.2, 'whoosh', 0.5], [2.5, 'pop', 0.7], [5.0, 'thump', 0.6], [7.5, 'thump', 0.6]],
    draw(t) {
      night('#071020');
      g.save(); g.translate(TX, 860 * u);
      g.fillStyle = '#2F6A73'; g.fillRect(-420 * u, -300 * u, 840 * u, 600 * u);
      for (let i = 0; i < 90; i++) { g.fillStyle = `rgba(255,255,255,${0.05 + hash(i, 2) * 0.1})`; g.beginPath(); g.arc((hash(i, 3) - 0.5) * 840 * u, (hash(i, 4) - 0.5) * 600 * u, (4 + hash(i, 5) * 20) * u, 0, 7); g.fill(); }
      const s = spring(t - 2.5, 'snappy');
      g.strokeStyle = C.red; g.lineWidth = 6 * u; g.beginPath(); g.arc(60 * u, 30 * u, 90 * u * s, 0, 7); g.stroke();
      g.fillStyle = 'rgba(20,30,30,0.6)'; g.beginPath(); g.ellipse(60 * u, 30 * u, 40 * u, 16 * u, 0.4, 0, 7); g.fill();
      g.restore();
      kicker('“Taraia Object” · ทะเลสาบของ Nikumaroro', TX, 300 * u, t, { color: C.red });
      say('วัตถุใต้น้ำที่เห็นในภาพถ่ายดาวเทียม', TX, 410 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      say('และปรากฏในภาพถ่ายทางอากาศตั้งแต่ปี 1938', TX, 1260 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.cream });
      say('2026: ทีมจาก Purdue ลงพื้นที่ตรวจสอบ', TX, 1370 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.cream });
      say('ยังไม่มีการยืนยันอย่างเป็นทางการ\nว่าเป็นเครื่องบินของเธอ', TX, 1480 * u, t - 7.5, { size: 36 * u, weight: 800, color: C.red });
      finish();
    } },
  // ---------------- Chapter 7 — the line
  { from: bar(58), to: bar(62), cues: [[0.2, 'thump', 0.6], [2.5, 'thump', 0.6], [5.0, 'thump', 0.6], [7.5, 'chime', 0.5]],
    draw(t) {
      paper();
      kicker('สิ่งที่เรารู้แน่ ๆ', TX, 300 * u, t);
      [['เครื่องหายไปกลางแปซิฟิก 2 ก.ค. 1937', 0.2], ['สัญญาณสุดท้าย: เส้น 157–337', 2.5], ['ไม่เคยพบชิ้นส่วนที่ยืนยันได้', 5.0]].forEach(([s, at], i) => {
        const p = spring(t - at, 'snappy'); if (p <= 0) return;
        g.save(); g.translate((1 - p) * -80 * u, 0); g.globalAlpha = clamp((t - at) / 0.12);
        text(g, '✓', 120 * u, 600 * u + i * 180 * u, { size: 60 * u, weight: 800, family: 'Inter, sans-serif', color: C.red });
        text(g, s, 200 * u, 590 * u + i * 180 * u, { size: 42 * u, weight: 800, family: THAI, color: C.ink, align: 'left' });
        g.restore(); });
      say('ทุกอย่างที่เหลือ คือการคาดเดา', TX, 1350 * u, t - 7.5, { size: 56 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- Chapter 8 — ending
  { from: bar(62), to: bar(66), cues: [[0.2, 'whoosh', 0.5], [5.0, 'thump', 0.6]],
    draw(t) {
      night('#071020');
      electraSide(TX - t * 60 * u + 200 * u, 900 * u, 360 * u);
      g.fillStyle = '#0A1626'; g.fillRect(0, 1200 * u, W, H - 1200 * u);
      say('เธอเคยเขียนไว้ก่อนออกเดินทางว่า', TX, 330 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      say('ผู้หญิงควรลองทำสิ่งที่ผู้ชายทำ\nถ้าล้มเหลว ก็ขอให้เป็นแรงท้าทายคนอื่นต่อไป', TX, 1320 * u, t - 2.0, { size: 44 * u, weight: 800, color: C.red });
      text(g, '(ถอดความจากจดหมายถึงสามี)', TX, 1560 * u, { size: 32 * u, weight: 600, family: THAI, color: C.fog, alpha: clamp((t - 4) / 0.3) });
      finish();
    } },
  { from: bar(66), to: bar(69), cues: [[0, 'thump', 0.9], [3.75, 'swish', 0.4]],
    draw(t) {
      night('#08070A');
      big('AMELIA', TX, 820 * u, t, { size: 220 * u, color: C.cream });
      big('EARHART', TX, 1020 * u, t - 0.15, { size: 170 * u, color: C.cream });
      const p = spring(t - 0.8, 'default');
      g.fillStyle = C.red; g.fillRect(TX - 330 * u * p, 1080 * u, 660 * u * p, 10 * u);
      say('1897 – 1937 ?', TX, 1240 * u, t - 1.5, { size: 64 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(69), to: bar(72), cues: [[0, 'whoosh', 0.5], [3.75, 'chime', 0.8]],
    draw(t) {
      night('#071020');
      waves(TX, 760 * u, t, { dir: 0, spread: Math.PI, alpha: 0.6 });
      g.fillStyle = C.cream; rrect(g, TX - 50 * u, 710 * u, 100 * u, 100 * u, 16 * u); g.fill();
      say('“We are on the line 157 337…”', TX, 1150 * u, t - 0.3, { size: 50 * u, weight: 400, family: SERIF, color: C.cream });
      say('คุณคิดว่าเธอไปตกอยู่ที่ไหน?', TX, 1300 * u, t - 2.5, { size: 58 * u, weight: 800, color: C.red });
      say('คอมเมนต์ทฤษฎีของคุณไว้ได้เลย', TX, 1410 * u, t - 4.0, { size: 44 * u, weight: 700, color: C.fog });
      finish();
    } },
];
