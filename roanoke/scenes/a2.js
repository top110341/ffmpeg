// Roanoke — Act 2: 1:00–3:00 (bars 24–72).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, clouds, forest } from './kit.js';
import { post, mapNC, PL } from './a1.js';

export default () => [
  { from: bar(24), to: bar(28), cues: [[0.3, 'type', 0.6], [3.75, 'type', 0.6], [7.5, 'thump', 0.6]],
    draw(t) {
      night('#0D120E'); forest(1500 * u, { color: '#08100B', h: 340 });
      post(TX - 200 * u, 950 * u, 360 * u, 'CROATOAN', remap(t, 0.3, 2.5));
      // a tree with CRO
      g.fillStyle = '#3E2F1E'; g.fillRect(TX + 130 * u, 520 * u, 220 * u, 900 * u);
      g.save(); g.translate(TX + 240 * u, 900 * u); text(g, 'CRO', 0, 0, { size: 70 * u * clamp((t - 3.75) / 0.4) || 0.01, weight: 800, family: 'Inter, sans-serif', color: '#1A1208' }); g.restore();
      kicker('สิ่งที่ถูกสลักไว้', TX, 300 * u, t, { color: C.red });
      say('“CROATOAN” บนเสารั้ว', TX, 400 * u, t - 0.3, { size: 52 * u, weight: 800, color: C.cream });
      say('และ “CRO” บนต้นไม้', TX, 1560 * u, t - 3.75, { size: 52 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(28), to: bar(32), cues: [[0.2, 'thump', 0.6], [2.5, 'pop', 0.6], [5.0, 'impact', 0.9]],
    draw(t) {
      paper();
      kicker('สัญญาที่ตกลงกันไว้ก่อน White จากไป', TX, 300 * u, t);
      say('ถ้าย้ายที่อยู่ ให้สลักชื่อปลายทางไว้', TX, 460 * u, t - 0.2, { size: 48 * u, weight: 800 });
      say('ถ้าตกอยู่ในอันตราย ให้สลักกากบาทไว้ด้วย', TX, 580 * u, t - 2.5, { size: 48 * u, weight: 800 });
      g.save(); g.translate(TX, 880 * u); const s = spring(t - 2.5, 'playful'); g.scale(s, s);
      g.strokeStyle = C.red; g.lineWidth = 30 * u; g.lineCap = 'round'; g.beginPath(); g.moveTo(0, -110 * u); g.lineTo(0, 110 * u); g.moveTo(-110 * u, 0); g.lineTo(110 * u, 0); g.stroke(); g.restore();
      if (t > 5) { g.strokeStyle = C.ink; g.lineWidth = 14 * u; g.beginPath(); g.arc(TX, 880 * u, 170 * u, 0, 7); g.moveTo(TX - 120 * u, 1000 * u); g.lineTo(TX + 120 * u, 760 * u); g.stroke(); }
      say('ไม่มีกากบาท', TX, 1230 * u, t - 5.0, { size: 72 * u, weight: 800, color: C.red });
      say('แปลว่าพวกเขาย้ายไปเอง ไม่ได้ถูกบังคับ?', TX, 1360 * u, t - 6.0, { size: 46 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(32), to: bar(36), cues: [[0.2, 'whoosh', 0.5], [2.5, 'pop', 0.8], [5.0, 'riser', 0.5], [7.5, 'impact', 0.9]],
    draw(t) {
      const cam = { lat: 35.55, lon: -75.8, z: 680 * u };
      const P = mapNC(cam); topScrim();
      pin(...P(PL.roanoke), 1, { label: 'Roanoke', side: 1, color: C.fog });
      pin(...P(PL.croatoan), t - 2.5, { label: 'เกาะ Croatoan (Hatteras)', side: -1 });
      path([P(PL.roanoke), P([35.6, -75.6]), P(PL.croatoan)], remap(t, 2.8, 4.5), { color: C.red, width: 5 * u, dash: [14 * u, 12 * u] });
      kicker('Croatoan คือชื่อเกาะ และชื่อชนเผ่าที่เป็นมิตร', TX, 250 * u, t, { color: C.red });
      say('ห่างลงไปทางใต้ราว 80 กม.', TX, 345 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.cream });
      say('White ตั้งใจจะไปตามหา\nแต่พายุทำให้เรือต้องกลับอังกฤษ', TX, 1450 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(36), to: bar(40), cues: [[0.2, 'thump', 0.6], [2.5, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 18); g.translate(sx, sy);
      paper();
      say('John White ไม่เคยได้กลับมาอีกเลย', TX, 560 * u, t - 0.2, { size: 54 * u, weight: 800 });
      stamp('NEVER FOUND', TX, 900 * u, t - 2.5, { size: 120 * u, rot: -0.08 });
      say('เขาไม่เคยรู้ว่าลูกสาวและหลานสาว\nเป็นอย่างไร', TX, 1200 * u, t - 3.5, { size: 50 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- theories
  { from: bar(40), to: bar(44), cues: [[0.2, 'pop', 0.4], [0.6, 'pop', 0.4], [1.0, 'pop', 0.4], [1.4, 'pop', 0.4]],
    draw(t) {
      paper();
      g.fillStyle = C.paper2; g.fillRect(60 * u, 470 * u, W - 120 * u, 900 * u);
      [['ย้ายไปอยู่กับชนเผ่าพื้นเมือง', 280, 640], ['ถูกโจมตีโดยชนเผ่าอื่น / สเปน', 760, 720], ['อดอยาก ภัยแล้ง โรคระบาด', 300, 1000], ['ต่อเรือหนีกลับ แล้วจมทะเล', 770, 1100]].forEach(([s, x, y], i) => {
        const p = spring(t - 0.2 - i * 0.4, 'playful'); if (p <= 0) return;
        g.save(); g.translate(x * u, y * u); g.rotate((hash(i, 7) - 0.5) * 0.12); g.scale(p, p);
        g.fillStyle = i === 0 ? C.red : '#F7F1E3'; g.fillRect(-235 * u, -70 * u, 470 * u, 140 * u);
        text(g, s, 0, 14 * u, { size: 31 * u, weight: 800, family: THAI, color: i === 0 ? C.paper : C.ink }); g.restore(); });
      say('ทฤษฎีหลัก', TX, 330 * u, t - 0.1, { size: 60 * u, weight: 800 });
      say('นักประวัติศาสตร์หลายคนเชื่อข้อแรกมากที่สุด', TX, 1460 * u, t - 3.0, { size: 44 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(44), to: bar(48), cues: [[0.2, 'pop', 0.6], [2.5, 'pop', 0.6], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      kicker('หลายสิบปีต่อมา', TX, 300 * u, t);
      say('นักสำรวจรายงานว่าพบชาวพื้นเมืองบางคน\nมีตาสีเทา หรือพูดภาษาอังกฤษได้', TX, 460 * u, t - 0.2, { size: 46 * u, weight: 800 });
      [-1, 1].forEach((sd, i) => person(TX + sd * 150 * u, 1000 * u, 110 * u * spring(t - 2.5 - i * 0.3, 'default'), i ? C.inkSoft : C.red));
      say('เป็นเพียงคำบอกเล่า ยังพิสูจน์ไม่ได้', TX, 1260 * u, t - 5.0, { size: 48 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- archaeology
  { from: bar(48), to: bar(53), cues: [[0.2, 'whoosh', 0.5], [2.5, 'pop', 0.7], [5.0, 'pop', 0.7], [7.5, 'thump', 0.6]],
    draw(t) {
      paper();
      // dig site cross-section with finds
      g.fillStyle = '#8A6A44'; g.fillRect(0, 700 * u, W, 600 * u); g.fillStyle = '#6E5234'; g.fillRect(0, 900 * u, W, 400 * u);
      g.strokeStyle = C.ink; g.lineWidth = 3 * u; g.setLineDash([12 * u, 10 * u]); g.strokeRect(150 * u, 720 * u, W - 300 * u, 560 * u); g.setLineDash([]);
      [['ตะปู', 300, 1000, 2.5], ['เศษกระเบื้องอังกฤษ', 560, 1100, 3.2], ['ชิ้นส่วนปืนยุค 1500s', 780, 980, 3.9], ['แท่งทองแดง', 420, 1200, 4.6]].forEach(([s, x, y, at]) => {
        const p = spring(t - at, 'playful'); if (p <= 0) return;
        g.fillStyle = C.red; g.beginPath(); g.arc(x * u, y * u, 16 * u * p, 0, 7); g.fill();
        text(g, s, x * u, y * u - 30 * u, { size: 30 * u, weight: 800, family: THAI, color: C.paper, alpha: clamp(p) }); });
      kicker('งานขุดค้นทางโบราณคดี · ทศวรรษ 2010–2020', TX, 300 * u, t);
      say('พบของใช้ยุคเดียวกับชาวอาณานิคม', TX, 410 * u, t - 0.2, { size: 50 * u, weight: 800 });
      say('ทั้งบนเกาะ Hatteras\nและพื้นที่ด้านในแผ่นดิน', TX, 1420 * u, t - 7.5, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(53), to: bar(58), cues: [[0.2, 'whoosh', 0.5], [2.5, 'pop', 0.7], [5.0, 'pop', 0.7], [8.75, 'thump', 0.6]],
    draw(t) {
      const cam = { lat: 35.6, lon: -76.2, z: 360 * u };
      const P = mapNC(cam); topScrim();
      pin(...P(PL.roanoke), 1, { label: 'Roanoke', side: 1, color: C.fog });
      pin(...P(PL.croatoan), t - 2.5, { label: 'Hatteras', side: 1 });
      pin(...P(PL.bertie), t - 5.0, { label: 'Bertie County', side: 1 });
      path([P(PL.roanoke), P(PL.croatoan)], remap(t, 2.5, 4), { color: C.red, width: 4 * u, dash: [12 * u, 10 * u] });
      path([P(PL.roanoke), P(PL.bertie)], remap(t, 5.0, 6.5), { color: C.red, width: 4 * u, dash: [12 * u, 10 * u] });
      kicker('สมมติฐานล่าสุด', TX, 250 * u, t, { color: C.red });
      say('ชาวอาณานิคมอาจแยกเป็นกลุ่ม\nแล้วผสมกลมกลืนกับชนพื้นเมือง', TX, 345 * u, t - 0.3, { size: 48 * u, weight: 800, color: C.cream });
      say('แต่ยังไม่มีหลักฐานชี้ขาด', TX, 1520 * u, t - 8.75, { size: 50 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(58), to: bar(62), cues: [[0.2, 'thump', 0.6], [2.5, 'thump', 0.6], [5.0, 'thump', 0.6], [7.5, 'chime', 0.5]],
    draw(t) {
      paper();
      kicker('สิ่งที่เรารู้แน่ ๆ', TX, 300 * u, t);
      [['ราว 115 คน หายไปจากเกาะ Roanoke', 0.2], ['ทิ้งคำว่า CROATOAN ไว้ ไม่มีกากบาท', 2.5], ['ไม่เคยพบหลุมศพหรือร่างของพวกเขา', 5.0]].forEach(([s, at], i) => {
        const p = spring(t - at, 'snappy'); if (p <= 0) return;
        g.save(); g.translate((1 - p) * -80 * u, 0); g.globalAlpha = clamp((t - at) / 0.12);
        text(g, '✓', 110 * u, 600 * u + i * 180 * u, { size: 60 * u, weight: 800, family: 'Inter, sans-serif', color: C.red });
        text(g, s, 180 * u, 590 * u + i * 180 * u, { size: 40 * u, weight: 800, family: THAI, color: C.ink, align: 'left' }); g.restore(); });
      say('Virginia Dare เด็กคนแรก\nกลายเป็นตำนานที่ไม่มีบทจบ', TX, 1300 * u, t - 7.5, { size: 52 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(62), to: bar(67), cues: [[0, 'thump', 0.9], [6.25, 'swish', 0.4]],
    draw(t) {
      night('#08070A');
      big('CROATOAN', TX, 900 * u, t, { size: 180 * u, color: C.cream });
      const p = spring(t - 0.8, 'default');
      g.fillStyle = C.red; g.fillRect(TX - 330 * u * p, 960 * u, 660 * u * p, 10 * u);
      say('Roanoke · 1587–1590', TX, 1120 * u, t - 1.5, { size: 56 * u, weight: 700, color: C.fog });
      say('115 คน ไม่เคยถูกพบ', TX, 1240 * u, t - 3.0, { size: 64 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(67), to: bar(72), cues: [[0, 'whoosh', 0.5], [6.25, 'chime', 0.8]],
    draw(t) {
      night('#0D120E'); forest(1500 * u, { color: '#08100B', h: 340 });
      post(TX, 900 * u, 380 * u, 'CROATOAN', 1);
      say('คุณคิดว่าพวกเขาไปอยู่ที่ไหน?', TX, 320 * u, t - 0.3, { size: 56 * u, weight: 800, color: C.cream });
      say('คอมเมนต์ทฤษฎีของคุณไว้ได้เลย', TX, 1560 * u, t - 3.0, { size: 46 * u, weight: 800, color: C.red });
      finish();
    } },
];
