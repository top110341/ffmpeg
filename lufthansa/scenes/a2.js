// Lufthansa Heist 1978 — Act 2: 1:25–3:00 (bars 34–72). The haul, the van, the aftermath, the trials.
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake } from './kit.js';
import { SODIUM, ASPH, money, terminal, airport, jet, van, masked, cashBag, carton, vaultRoom, fingerprint, magnifier, gavel, strike,
  filmReel, filmStrip, orgCard, clock, mapNY, PL } from './a1.js';

// night street in Brooklyn: brick walls, a street lamp, a fire hydrant
function street(t) {
  night('#0A0D12');
  for (let i = 0; i < 6; i++) { const x = i * 190 * u - 30 * u, h = (520 + hash(i, 8) * 260) * u;
    g.fillStyle = i % 2 ? '#2A1E1A' : '#241A17'; g.fillRect(x, 1250 * u - h, 180 * u, h);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 2; c++) { const on = hash(i * 8 + r * 2 + c, 9) > 0.7;
      g.fillStyle = on ? 'rgba(233,198,107,0.8)' : '#120E0C'; g.fillRect(x + 30 * u + c * 70 * u, 1250 * u - h + 60 * u + r * 110 * u, 44 * u, 64 * u); } }
  g.fillStyle = '#16181C'; g.fillRect(0, 1250 * u, W, 70 * u);
  g.fillStyle = ASPH; g.fillRect(0, 1320 * u, W, H - 1320 * u);
  g.fillStyle = '#2B3038'; g.fillRect(860 * u, 820 * u, 12 * u, 430 * u); g.fillRect(800 * u, 820 * u, 70 * u, 10 * u);
  const gr = g.createRadialGradient(805 * u, 840 * u, 0, 805 * u, 1200 * u, 520 * u); gr.addColorStop(0, 'rgba(233,168,74,0.35)'); gr.addColorStop(1, 'rgba(233,168,74,0)');
  g.fillStyle = gr; g.fillRect(300 * u, 820 * u, 780 * u, 700 * u);
}
function hydrant(x, y, s) {
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = C.red;
  g.fillRect(-0.18, -0.8, 0.36, 0.8); g.beginPath(); g.arc(0, -0.8, 0.2, Math.PI, 0); g.fill();
  g.fillRect(-0.3, -0.55, 0.6, 0.14); g.fillRect(-0.26, -0.04, 0.52, 0.06);
  g.restore();
}
function bars(x0, x1, y0, y1, color = '#3A4658') { g.fillStyle = color; for (let x = x0; x <= x1; x += 120 * u) g.fillRect(x, y0, 22 * u, y1 - y0); }

export default () => [
  // ---------------- the haul
  { from: bar(34), to: bar(37), cues: Array.from({ length: 16 }, (_, i) => [0.2 + i * 0.18, 'tick', 0.3]).concat([[3.2, 'impact', 0.9], [5.0, 'thump', 0.6]]),
    draw(t) {
      night('#0B1018');
      const a = 5000000 * clamp(remap(t, 0.2, 2.2)), b = 875000 * clamp(remap(t, 2.3, 3.2));
      for (let i = 0; i < 16; i++) { if (i / 16 > (a + b) / 5875000) break; const c = i % 6, r = Math.floor(i / 6);
        cashBag(150 * u + c * 140 * u + (r % 2) * 70 * u, 1380 * u - r * 100 * u, 150 * u, { rot: (hash(i, 6) - 0.5) * 0.4 }); }
      text(g, money(a + b), TX, 760 * u, { size: 140 * u, weight: 400, family: SERIF, color: t > 3.2 ? C.red : C.cream });
      const W1 = 760 * u, x0 = TX - 380 * u;
      g.fillStyle = C.night3; rrect(g, x0, 820 * u, W1, 30 * u, 8 * u); g.fill();
      g.fillStyle = C.cream; rrect(g, x0, 820 * u, W1 * a / 5875000, 30 * u, 8 * u); g.fill();
      if (b > 0) { g.fillStyle = SODIUM; g.fillRect(x0 + W1 * 5000000 / 5875000, 820 * u, W1 * b / 5875000, 30 * u); }
      text(g, 'เงินสด ~$5,000,000', x0, 910 * u, { size: 36 * u, weight: 800, family: THAI, color: C.cream, align: 'left' });
      text(g, 'เครื่องประดับ ~$875,000', x0 + W1, 910 * u, { size: 36 * u, weight: 800, family: THAI, color: SODIUM, align: 'right', alpha: clamp((t - 2.3) / 0.2) });
      kicker('มูลค่าที่ถูกปล้น', TX, 300 * u, t, { color: C.red });
      say('รวมราว 5.875 ล้านดอลลาร์', TX, 420 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      say('ตามรายงาน มากกว่าที่แก๊งคาดไว้มาก', TX, 1000 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.fog });
      finish(0.8);
    } },
  // ---------------- the van
  { from: bar(37), to: bar(40), cues: [[0.2, 'whoosh', 0.6], [2.5, 'thump', 0.6], [5.0, 'impact', 0.8]],
    draw(t) {
      street(t);
      van(track(t, [[0, -300 * u], [0.2, 480 * u]], 'heavy'), 1450 * u, 380 * u, { lights: t < 2.5 ? 1 : 0 });
      hydrant(760 * u, 1470 * u, 90 * u);
      g.fillStyle = 'rgba(10,13,18,0.86)'; g.fillRect(0, 200 * u, W, 360 * u);
      kicker('หลังการปล้น', TX, 290 * u, t, { color: C.red });
      say('Parnell “Stacks” Edwards\nมีหน้าที่นำรถตู้ไปทำลายทิ้ง', TX, 400 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      g.fillStyle = 'rgba(10,13,18,0.82)'; if (t > 5) g.fillRect(0, 1470 * u, W, 100 * u);
      say('แต่เขากลับจอดทิ้งไว้ริมถนนในบรูคลิน', TX, 1530 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(40), to: bar(43), cues: [[0.2, 'thump', 0.6], [2.5, 'swish', 0.5], [5.0, 'impact', 0.9]],
    draw(t) {
      paper();
      van(TX - 80 * u, 1180 * u, 560 * u, { color: '#3A3F48' });
      const mx = track(t, [[0, TX - 200 * u], [2.5, TX + 30 * u]], 'default'), my = 990 * u;
      g.save(); g.beginPath(); g.arc(mx, my, 150 * u, 0, 7); g.clip(); g.fillStyle = '#E8E1CF'; g.fill();
      fingerprint(mx, my, 120 * u, clamp(remap(t, 2.5, 4.5)), C.ink); g.restore();
      magnifier(mx, my, 150 * u, C.ink);
      kicker('ราว 2 วันหลังเกิดเหตุ', TX, 300 * u, t);
      say('ตำรวจพบรถตู้คันนั้น', TX, 420 * u, t - 0.2, { size: 56 * u, weight: 800 });
      stamp('EVIDENCE', TX, 1360 * u, t - 5.0, { size: 100 * u, rot: -0.1 });
      say('และพบลายนิ้วมือของ Edwards', TX, 1540 * u, t - 5.0, { size: 48 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- the aftermath (no detail, no gore)
  { from: bar(43), to: bar(47), cues: [[0.2, 'thump', 0.6]].concat(Array.from({ length: 6 }, (_, i) => [2.5 + i * 0.9, 'thump', 0.35])).concat([[8.5, 'chime', 0.4]]),
    draw(t) {
      night('#0A0C10');
      const cw = 190 * u, ch = 220 * u;
      g.strokeStyle = 'rgba(140,151,173,0.35)'; g.lineWidth = 3 * u; g.beginPath();
      g.moveTo(TX, 830 * u); g.lineTo(TX, 870 * u); g.moveTo(TX - 315 * u, 870 * u); g.lineTo(TX + 315 * u, 870 * u);
      for (let c = 0; c < 4; c++) { g.moveTo(TX - 315 * u + c * 210 * u, 870 * u); g.lineTo(TX - 315 * u + c * 210 * u, 900 * u); } g.stroke();
      orgCard(TX, 610 * u, 260 * u, 220 * u, 'Burke', 'ผู้วางแผน', 0, { hi: true });
      const order = [2, 5, 0, 7, 3, 6];
      for (let i = 0; i < 8; i++) { const c = i % 4, r = Math.floor(i / 4), k = order.indexOf(i);
        const grey = k < 0 ? 0 : clamp((t - 2.5 - k * 0.9) / 0.4);
        orgCard(TX - 315 * u + c * 210 * u, 900 * u + r * 250 * u, cw, ch, '', 'ผู้เกี่ยวข้อง', grey); }
      kicker('ในหลายเดือนต่อมา', TX, 290 * u, t, { color: C.red });
      say('ผู้เกี่ยวข้องหลายคน เสียชีวิตหรือหายตัวไป', TX, 400 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      text(g, '* ภาพประกอบ ไม่ใช่จำนวนจริง', TX, 1430 * u, { size: 28 * u, weight: 600, family: THAI, color: C.fog, alpha: clamp((t - 3) / 0.3) });
      say('คดีส่วนใหญ่ ยังไม่เคยคลี่คลาย', TX, 1530 * u, t - 8.5, { size: 48 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  // ---------------- the only conviction
  { from: bar(47), to: bar(50), cues: [[0.2, 'thump', 0.6], [2.5, 'impact', 1.0], [5.0, 'thump', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 16); g.translate(sx, sy);
      paper();
      gavel(TX + 40 * u, 700 * u, 300 * u, strike(t, 2.5));
      big('1979', TX, 1250 * u, t - 0.2, { size: 170 * u, color: C.ink });
      stamp('GUILTY', TX, 1000 * u, t - 2.55, { size: 100 * u, rot: -0.12 });
      kicker('Louis Werner คนใน', TX, 300 * u, t);
      say('ถูกศาลตัดสินว่ามีความผิด', TX, 420 * u, t - 0.2, { size: 54 * u, weight: 800 });
      say('เป็นคนเดียวที่ถูกลงโทษ\nในคดีปล้นครั้งนี้โดยตรง', TX, 1390 * u, t - 5.0, { size: 48 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(50), to: bar(52), cues: [[0.2, 'whoosh', 0.5], [2.5, 'impact', 0.9]],
    draw(t) {
      night('#08070A');
      for (let i = 0; i < 9; i++) { const f = clamp(1 - remap(t, 0.4 + i * 0.12, 1.6 + i * 0.12)); if (f <= 0) continue;
        g.save(); g.globalAlpha = f; cashBag(TX - 320 * u + (i % 5) * 160 * u + Math.floor(i / 5) * 80 * u, 1150 * u - Math.floor(i / 5) * 120 * u - (1 - f) * 60 * u, 170 * u, { rot: (hash(i, 2) - 0.5) * 0.4 }); g.restore(); }
      big('?', TX, 1180 * u, t - 1.8, { size: 380 * u, color: C.cream });
      kicker('แล้วเงินล่ะ?', TX, 300 * u, t, { color: C.red });
      say('เงินและเครื่องประดับส่วนใหญ่', TX, 420 * u, t - 0.2, { size: 52 * u, weight: 800, color: C.cream });
      stamp('MISSING', TX, 1430 * u, t - 2.5, { size: 110 * u, rot: -0.1 });
      say('ไม่เคยถูกพบ', TX, 530 * u, t - 2.5, { size: 60 * u, weight: 800, color: C.red });
      finish();
    } },
  // ---------------- the informant
  { from: bar(52), to: bar(55), cues: [[0.2, 'thump', 0.7], [2.5, 'click', 0.7], [5.0, 'type', 0.5]],
    draw(t) {
      night('#0B1018');
      const sp = clamp(spring(t - 0.2, 'heavy'));
      const gr = g.createRadialGradient(TX, 700 * u, 0, TX, 1100 * u, 560 * u); gr.addColorStop(0, `rgba(239,230,210,${0.3 * sp})`); gr.addColorStop(1, 'rgba(239,230,210,0)');
      g.fillStyle = gr; g.beginPath(); g.moveTo(TX - 60 * u, 560 * u); g.lineTo(TX + 60 * u, 560 * u); g.lineTo(TX + 380 * u, 1300 * u); g.lineTo(TX - 380 * u, 1300 * u); g.closePath(); g.fill();
      person(TX, 1230 * u, 230 * u, '#05070A');
      g.fillStyle = C.night3; rrect(g, TX - 330 * u, 1290 * u, 660 * u, 90 * u, 10 * u); g.fill();
      typewriter('WITNESS PROTECTION', TX, 1350 * u, t - 5.0, { size: 34 * u, weight: 700, family: 'Inter, sans-serif', color: C.cream, align: 'center', cps: 16 });
      kicker('ปี 1980', TX, 290 * u, t, { color: C.red });
      say('Henry Hill ถูกจับในคดียาเสพติด', TX, 400 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      g.fillStyle = 'rgba(11,16,24,0.85)'; if (t > 2.5) g.fillRect(0, 1420 * u, W, 180 * u);
      say('เขาเลือกเป็นพยานให้รัฐ\nเพราะกลัวว่าตัวเองจะเป็นรายต่อไป', TX, 1470 * u, t - 2.5, { size: 42 * u, weight: 800, color: SODIUM });
      finish(0.8);
    } },
  { from: bar(55), to: bar(58), cues: [[0.2, 'swish', 0.6], [2.5, 'pop', 0.7], [5.0, 'chime', 0.5]],
    draw(t) {
      paper();
      const s = spring(t - 0.2, 'default');
      filmReel(TX - 190 * u, 780 * u, 150 * u * s, t * 1.2); filmReel(TX + 190 * u, 780 * u, 150 * u * s, t * 1.2);
      filmStrip(60 * u, 960 * u, W - 160 * u, 150 * u, t * 120 * u, t > 2.5 ? 'GOODFELLAS · 1990' : '');
      kicker('จากชีวิตจริง สู่จอภาพยนตร์', TX, 300 * u, t);
      say('เรื่องเล่าของเขากลายเป็นหนังสือ Wiseguy (1985)', TX, 420 * u, t - 0.2, { size: 40 * u, weight: 800 });
      say('และภาพยนตร์ Goodfellas (1990)', TX, 1220 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.red });
      say('ตัวละคร Jimmy Conway\nได้แรงบันดาลใจจาก Jimmy Burke', TX, 1350 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(58), to: bar(60), cues: [[0.2, 'thump', 0.7], [2.5, 'thump', 0.6]],
    draw(t) {
      night('#0B1018');
      bars(150 * u, 900 * u, 620 * u, 1330 * u, '#2A3446');
      person(TX, 1300 * u, 210 * u, '#05070A', { tie: C.red });
      bars(150 * u, 900 * u, 620 * u, 1330 * u, '#3A4658');
      kicker('Jimmy Burke', TX, 290 * u, t, { color: C.red });
      say('ไม่เคยถูกตั้งข้อหาในคดีปล้นนี้', TX, 400 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      g.fillStyle = 'rgba(11,16,24,0.88)'; if (t > 2.5) g.fillRect(0, 1360 * u, W, 230 * u);
      say('แต่ถูกจำคุกตลอดชีวิตจากคดีอื่น\nและเสียชีวิตระหว่างรับโทษ ปี 1996', TX, 1430 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- 36 years later
  { from: bar(60), to: bar(62), cues: [[0.2, 'swish', 0.6], [1.2, 'type', 0.5], [2.5, 'thump', 0.7]],
    draw(t) {
      paper();
      const s = spring(t - 0.2, 'default');
      g.save(); g.translate(TX, 900 * u + (1 - s) * 500 * u); g.rotate(-0.035);
      g.fillStyle = '#F7F1E3'; g.fillRect(-360 * u, -300 * u, 720 * u, 560 * u);
      g.fillStyle = C.ink; g.fillRect(-320 * u, -250 * u, 640 * u, 8 * u);
      text(g, 'NEW YORK · 2014', 0, -200 * u, { size: 34 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 4 * u });
      for (let k = 0; k < 8; k++) { g.fillStyle = 'rgba(22,19,15,0.18)'; g.fillRect(-320 * u, -20 * u + k * 34 * u, (640 - hash(k, 3) * 200) * u, 12 * u); }
      g.restore();
      typewriter('ARREST IN 1978 JFK HEIST', TX, 820 * u, t - 1.2, { size: 46 * u, weight: 800, family: 'Inter, sans-serif', color: C.ink, align: 'center', cps: 22 });
      kicker('36 ปีต่อมา · มกราคม 2014', TX, 300 * u, t);
      say('FBI จับกุม Vincent Asaro', TX, 420 * u, t - 0.2, { size: 56 * u, weight: 800 });
      say('หนึ่งในข้อหาเกี่ยวโยงกับการปล้นครั้งนี้', TX, 1300 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(62), to: bar(64), cues: [[0.2, 'thump', 0.6], [1.25, 'impact', 1.1]],
    draw(t) {
      const [sx, sy] = shake(t, 1.25, 20); g.translate(sx, sy);
      night('#14110E');
      g.fillStyle = '#3A2A1C'; g.fillRect(80 * u, 1000 * u, W - 160 * u, 400 * u);
      g.fillStyle = '#2A1E14'; for (let k = 0; k < 6; k++) g.fillRect(110 * u + k * 145 * u, 1040 * u, 110 * u, 320 * u);
      gavel(TX + 40 * u, 880 * u, 300 * u, strike(t, 1.25));
      stamp('ACQUITTED', TX, 1200 * u, t - 1.3, { size: 110 * u, rot: -0.1 });
      kicker('พฤศจิกายน 2015', TX, 300 * u, t, { color: C.red });
      say('คณะลูกขุนตัดสินว่า Asaro ไม่มีความผิด', TX, 420 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      say('ปริศนายังคงไม่จบ', TX, 1520 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- close
  { from: bar(64), to: bar(68), cues: [[0, 'thump', 0.9], [2.5, 'chime', 0.4], [5.0, 'swish', 0.4]],
    draw(t) {
      night('#08070A');
      big('1978', TX, 760 * u, t, { size: 280 * u, color: C.cream });
      const p = spring(t - 0.7, 'default');
      g.fillStyle = C.red; g.fillRect(TX - 330 * u * p, 830 * u, 660 * u * p, 10 * u);
      say('คดีปล้น Lufthansa', TX, 960 * u, t - 1.0, { size: 64 * u, weight: 800, color: C.red });
      for (let i = 0; i < 5; i++) cashBag(TX - 340 * u + i * 170 * u, 1220 * u + (i % 2) * 30 * u, 140 * u * clamp(spring(t - 2.5 - i * 0.12, 'snappy')), { rot: (hash(i, 5) - 0.5) * 0.3 });
      say('เงินกว่า 5 ล้านดอลลาร์\nส่วนใหญ่ไม่เคยกลับมา', TX, 1420 * u, t - 5.0, { size: 48 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(68), to: bar(72), cues: [[0, 'whoosh', 0.5], [2.5, 'pop', 0.6], [5.0, 'chime', 0.8]],
    draw(t) {
      airport(t);
      van(1500 * u - t * 140 * u, 1470 * u, 300 * u, { lights: 0.8 });
      g.fillStyle = 'rgba(4,6,11,0.85)'; g.fillRect(0, 200 * u, W, 500 * u);
      say('เงินหลายล้านดอลลาร์\nหายไปไหน?', TX, 300 * u, t - 0.3, { size: 52 * u, weight: 800, color: C.cream });
      say('คุณคิดว่ามันอยู่ที่ไหนวันนี้?', TX, 470 * u, t - 2.5, { size: 44 * u, weight: 800, color: SODIUM });
      say('คอมเมนต์บอกได้เลย', TX, 620 * u, t - 5.0, { size: 54 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
];
