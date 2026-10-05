// Jim Thompson — Act 2: the house, the vanishing, the search, the theories (0:55–3:00, bars 22–72).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake } from './kit.js';
import { S, SILKS, PLUM_BAND, PAPER_BAND, loom, ribbons, thaiHouse, canal, jungle, walker, bungalow, mapSEA, PL } from './a1.js';

// topographic search map with a grid of sectors swept to progress p, and search teams as dots
function searchMap(t, p, o = {}) {
  const { x0 = 80 * u, y0 = 500 * u, w = W - 160 * u, h = 720 * u } = o;
  g.save(); g.beginPath(); g.rect(x0, y0, w, h); g.clip();
  g.fillStyle = '#16261E'; g.fillRect(x0, y0, w, h);
  const peaks = [[0.3, 0.35], [0.72, 0.6], [0.45, 0.82]];
  g.strokeStyle = 'rgba(201,211,207,0.22)'; g.lineWidth = 2 * u;
  peaks.forEach(([px, py], j) => { for (let r = 1; r < 9; r++) { g.beginPath();
    for (let a = 0; a <= 64; a++) { const th = a / 64 * Math.PI * 2, rr = r * 46 * u * (1 + 0.18 * noise(th * 2 + r * 0.3, j + 3));
      const xx = x0 + px * w + Math.cos(th) * rr, yy = y0 + py * h + Math.sin(th) * rr * 0.8; a ? g.lineTo(xx, yy) : g.moveTo(xx, yy); } g.stroke(); } });
  const cols = 6, rows = 6, cw = w / cols, ch = h / rows, n = Math.floor(p * cols * rows);
  for (let i = 0; i < n; i++) { const k = Math.floor(hash(i, 3) * 0) + i, c = k % cols, r = Math.floor(k / cols);
    g.fillStyle = 'rgba(217,164,59,0.16)'; g.fillRect(x0 + c * cw, y0 + r * ch, cw, ch); }
  g.strokeStyle = 'rgba(240,203,114,0.55)'; g.lineWidth = 2 * u;
  for (let c = 1; c < cols; c++) { g.beginPath(); g.moveTo(x0 + c * cw, y0); g.lineTo(x0 + c * cw, y0 + h); g.stroke(); }
  for (let r = 1; r < rows; r++) { g.beginPath(); g.moveTo(x0, y0 + r * ch); g.lineTo(x0 + w, y0 + r * ch); g.stroke(); }
  for (let i = 0; i < 26; i++) { const sp = 0.05 + hash(i, 8) * 0.05, ph = hash(i, 9);
    const xx = x0 + ((hash(i, 10) + t * sp + ph) % 1) * w, yy = y0 + (hash(i, 11) * 0.9 + 0.05) * h + Math.sin(t * 0.9 + i) * 14 * u;
    g.fillStyle = i % 5 === 0 ? S.mag2 : S.gold2; g.beginPath(); g.arc(xx, yy, 7 * u, 0, 7); g.fill(); }
  // the cottage, the starting point
  const [cx, cy] = [x0 + 0.5 * w, y0 + 0.5 * h];
  g.fillStyle = C.cream; g.fillRect(cx - 12 * u, cy - 12 * u, 24 * u, 24 * u);
  g.strokeStyle = S.mag2; g.lineWidth = 4 * u; for (let k = 0; k < 2; k++) { const q = (t * 0.4 + k * 0.5) % 1; g.globalAlpha = 1 - q; g.beginPath(); g.arc(cx, cy, 20 * u + q * 160 * u, 0, 7); g.stroke(); }
  g.restore();
  g.strokeStyle = 'rgba(201,211,207,0.5)'; g.lineWidth = 3 * u; g.strokeRect(x0, y0, w, h);
}
// a "MISSING" notice with a silhouette (never a likeness)
function poster(x, y, w, t, o = {}) {
  const { rot = -0.03 } = o, h = w * 1.35, s = spring(t, 'snappy');
  if (t < 0) return;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(-w / 2 + 12 * u, -h / 2 + 14 * u, w, h);
  g.fillStyle = '#EFE6D2'; g.fillRect(-w / 2, -h / 2, w, h);
  text(g, 'MISSING', 0, -h / 2 + 120 * u, { size: 104 * u, weight: 400, family: SERIF, color: S.mag, tracking: 4 * u });
  g.fillStyle = '#D8CDB4'; g.fillRect(-w * 0.32, -h / 2 + 160 * u, w * 0.64, w * 0.6);
  g.save(); g.beginPath(); g.rect(-w * 0.32, -h / 2 + 160 * u, w * 0.64, w * 0.6); g.clip();
  person(0, -h / 2 + 160 * u + w * 0.62, w * 0.24, '#3A3028'); g.restore();
  text(g, 'JIM THOMPSON', 0, -h / 2 + 220 * u + w * 0.6, { size: 46 * u, weight: 700, family: 'Inter, sans-serif', color: C.ink, tracking: 3 * u });
  text(g, 'หายตัวไป 26.03.1967', 0, -h / 2 + 290 * u + w * 0.6, { size: 40 * u, weight: 800, family: THAI, color: C.inkSoft });
  g.fillStyle = 'rgba(22,19,15,0.35)'; for (let i = 0; i < 3; i++) g.fillRect(-w * 0.35, -h / 2 + 330 * u + w * 0.6 + i * 34 * u, w * (0.5 + hash(i, 6) * 0.2), 12 * u);
  g.restore();
}
// theory card used across the theory scenes
function theoryCard(n, title, x, y, t, o = {}) {
  const { w = 400 * u, h = 150 * u, rot = 0, fill = '#F7F1E3', ink = C.ink, size = 34 * u } = o;
  const p = spring(t, 'playful'); if (p <= 0) return;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(p, p);
  g.fillStyle = 'rgba(0,0,0,0.15)'; g.fillRect(-w / 2 + 8 * u, -h / 2 + 10 * u, w, h);
  g.fillStyle = fill; g.fillRect(-w / 2, -h / 2, w, h);
  g.fillStyle = SILKS[n % SILKS.length]; g.fillRect(-w / 2, -h / 2, 14 * u, h);
  const lines = title.split('\n');
  lines.forEach((ln, i) => text(g, ln, 10 * u, (i - (lines.length - 1) / 2) * size * 1.3 + size * 0.35, { size, weight: 800, family: THAI, color: ink }));
  g.restore();
}

export default () => [
  // ---------------- Chapter 4 — fame
  { from: bar(22), to: bar(25), cues: [[0.2, 'swish', 0.6], [2.5, 'pop', 0.6], [5.0, 'chime', 0.4]],
    draw(t) {
      night(S.plum);
      // a stage: curtains part, a spotlight, two costumed figures
      const op = spring(t - 0.2, 'heavy');
      g.fillStyle = '#24121C'; g.fillRect(90 * u, 620 * u, W - 180 * u, 640 * u);
      const sp = g.createRadialGradient(TX, 1150 * u, 20 * u, TX, 1150 * u, 380 * u); sp.addColorStop(0, 'rgba(240,203,114,0.55)'); sp.addColorStop(1, 'rgba(240,203,114,0)');
      g.fillStyle = sp; g.fillRect(90 * u, 620 * u, W - 180 * u, 640 * u);
      for (const [dx, col, ph] of [[-120, S.gold, 0], [120, S.mag2, 1.7]]) {
        const fx = TX + dx * u, fy = 1220 * u, sw = Math.sin(t * 2 + ph) * 0.05;
        g.save(); g.translate(fx, fy); g.rotate(sw); g.fillStyle = col;
        g.beginPath(); g.moveTo(-90 * u, 0); g.lineTo(90 * u, 0); g.lineTo(34 * u, -260 * u); g.lineTo(-34 * u, -260 * u); g.closePath(); g.fill();
        g.fillStyle = '#1A0D15'; g.beginPath(); g.arc(0, -300 * u, 34 * u, 0, 7); g.fill();
        g.fillStyle = S.gold2; g.beginPath(); g.moveTo(-26 * u, -326 * u); g.lineTo(0, -380 * u); g.lineTo(26 * u, -326 * u); g.fill();
        g.restore(); }
      for (const sd of [-1, 1]) { g.fillStyle = S.mag; const cw = (W / 2 - 90 * u) * (1 - op * 0.72);
        const x0 = sd < 0 ? 90 * u : W - 90 * u - cw; g.fillRect(x0, 600 * u, cw, 680 * u);
        g.fillStyle = 'rgba(0,0,0,0.25)'; for (let k = 0; k < 6; k++) g.fillRect(x0 + (k + 0.5) * cw / 6, 600 * u, 6 * u, 680 * u); }
      g.fillStyle = '#7A1442'; g.fillRect(70 * u, 580 * u, W - 140 * u, 60 * u);
      g.fillStyle = '#3A2414'; g.fillRect(70 * u, 1260 * u, W - 140 * u, 30 * u);
      kicker('1951 · บรอดเวย์ นิวยอร์ก', TX, 300 * u, t, { color: S.gold });
      say('ละครเพลง The King and I', TX, 420 * u, t - 0.2, { size: 58 * u, weight: 800, color: C.cream });
      say('เครื่องแต่งกายบนเวทีใช้ผ้าไหมไทย', TX, 1400 * u, t - 2.5, { size: 46 * u, weight: 800, color: S.gold2 });
      say('ชื่อเสียงของผ้าไหมไทยยิ่งดังขึ้น', TX, 1500 * u, t - 5.0, { size: 42 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(25), to: bar(28), cues: [[0.2, 'thump', 0.5], [0.8, 'thump', 0.5], [1.4, 'thump', 0.5], [2.0, 'thump', 0.5], [2.6, 'impact', 0.7], [5.0, 'chime', 0.4]],
    draw(t) {
      paper();
      g.fillStyle = '#7FA59E'; g.fillRect(0, 1150 * u, W, 120 * u);
      g.strokeStyle = 'rgba(255,255,255,0.45)'; g.lineWidth = 3 * u; for (let r = 0; r < 4; r++) { g.beginPath(); for (let x = 0; x <= W; x += 20 * u) { const yy = 1175 * u + r * 26 * u + Math.sin(x / (40 * u) + t * 1.5 + r) * 3 * u; x ? g.lineTo(x, yy) : g.moveTo(x, yy); } g.stroke(); }
      g.fillStyle = '#5E7A4C'; for (let i = 0; i < 5; i++) { g.beginPath(); g.arc(80 * u + i * 220 * u + (i > 1 ? 120 * u : 0), 1150 * u - 120 * u, 110 * u, 0, 7); g.fill(); }
      thaiHouse(TX, 1150 * u, 200 * u, { parts: remap(t, 0.2, 3.0) });
      kicker('บ้านริมคลองตรงข้ามบ้านครัว', TX, 300 * u, t);
      say('เรือนไทยไม้สักที่เขาสร้างเอง', TX, 410 * u, t - 0.2, { size: 52 * u, weight: 800 });
      say('รื้อเรือนเก่าจากอยุธยาและบ้านครัว\nมาประกอบใหม่ เสร็จราวปี 1959', TX, 1360 * u, t - 2.6, { size: 44 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(28), to: bar(30), cues: [[0.2, 'thump', 0.6], [1.2, 'pop', 0.5], [1.8, 'pop', 0.5], [2.4, 'pop', 0.5], [2.6, 'type', 0.4]],
    draw(t) {
      paper();
      person(TX, 1050 * u, 200 * u * spring(t - 0.1, 'heavy'), C.inkSoft, { tie: S.mag });
      g.fillStyle = C.paper; g.fillRect(0, 1060 * u, W, 60 * u);
      kicker('ทศวรรษ 1960', TX, 300 * u, t);
      say('ราชาผ้าไหมไทย', TX, 440 * u, t - 0.1, { size: 84 * u, weight: 800 });
      [['นักธุรกิจ', 1.0], ['นักสะสมศิลปะ', 1.4], ['อดีตคน OSS', 1.8]].forEach(([s, at], i) => {
        const p = spring(t - at, 'snappy'); if (p <= 0) return; const x = TX + (i - 1) * 300 * u, y = 1180 * u;
        g.save(); g.translate(x, y); g.scale(p, p); g.fillStyle = i === 2 ? S.mag : C.ink; rrect(g, -142 * u, -44 * u, 284 * u, 88 * u, 44 * u); g.fill();
        text(g, s, 0, 12 * u, { size: 32 * u, weight: 800, family: THAI, color: C.paper }); g.restore(); });
      say('มีข่าวลือว่าเขายังมีสายสัมพันธ์\nกับหน่วยข่าวกรอง แต่ไม่เคยมีการยืนยัน', TX, 1340 * u, t - 2.6, { size: 40 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(30), to: bar(32), cues: [[0.2, 'whoosh', 0.5], [1.0, 'pop', 0.6], [2.6, 'pop', 0.6]],
    draw(t) {
      const cam = { lat: 9, lon: 101, z: track(t, [[0, 40], [0.05, 52]], 'heavy') * u };
      const P = mapSEA(cam); topScrim(600, '26,13,21');
      pin(...P(PL.bkk), t - 0.3, { label: 'กรุงเทพฯ', side: 1, color: S.mag2 });
      const h = path([P(PL.bkk), P(PL.penang), P(PL.cameron)], remap(t, 0.6, 2.8), { color: S.gold, width: 5 * u, dash: [14 * u, 10 * u] });
      pin(...P(PL.penang), t - 1.4, { label: 'ปีนัง', side: -1, color: S.mag2 });
      pin(...P(PL.cameron), t - 2.6, { label: 'Cameron Highlands', side: 1, color: S.gold });
      kicker('มีนาคม 1967', TX, 250 * u, t, { color: S.gold });
      say('เขาไปพักผ่อนช่วงอีสเตอร์ที่มาเลเซีย', TX, 345 * u, t - 0.3, { size: 48 * u, weight: 800, color: C.cream });
      g.fillStyle = PLUM_BAND; if (t > 2.8) g.fillRect(0, 1400 * u, W, 150 * u);
      say('เมืองตากอากาศบนภูเขา ท่ามกลางป่าดิบ', TX, 1490 * u, t - 3.0, { size: 44 * u, weight: 800, color: S.gold2 });
      finish(0.8);
    } },
  // ---------------- Chapter 5 — the vanishing
  { from: bar(32), to: bar(35), cues: [[0.2, 'whoosh', 0.5], [2.5, 'pop', 0.5], [5.0, 'thump', 0.6]],
    draw(t) {
      jungle(t, { fog: 0.7, dark: 1, trail: 0, vy: 1100 * u });
      g.fillStyle = 'rgba(240,230,200,0.9)'; g.beginPath(); g.arc(760 * u, 690 * u, 70 * u, 0, 7); g.fill();
      g.fillStyle = 'rgba(201,211,207,0.12)'; g.beginPath(); g.arc(760 * u, 690 * u, 120 * u, 0, 7); g.fill();
      bungalow(TX, 1240 * u, 230 * u * spring(t - 0.2, 'heavy'), { lit: 0.6 + 0.4 * Math.sin(t * 2) * 0 });
      g.fillStyle = PLUM_BAND; g.fillRect(0, 200 * u, W, 320 * u);
      kicker('บ้านพัก “Moonlight Cottage”', TX, 290 * u, t, { color: S.gold });
      say('เขามาพักกับเพื่อนสนิทอีก 3 คน', TX, 410 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      g.fillStyle = PLUM_BAND; if (t > 2.3) g.fillRect(0, 1330 * u, W, 250 * u);
      say('บ้านพักบนเนินเขา\nรายล้อมด้วยป่าดิบชื้นที่หนาทึบ', TX, 1420 * u, t - 2.5, { size: 46 * u, weight: 800, color: S.gold2 });
      finish();
    } },
  { from: bar(35), to: bar(36), cues: Array.from({ length: 5 }, (_, i) => [i * 0.15, 'tick', 0.6]).concat([[1.0, 'thump', 0.6]]),
    draw(t) {
      paper(); kicker('มีนาคม 1967', TX, 420 * u, t);
      const d = ['22', '23', '24', '25', '26'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.15), t, { size: 360 * u, bg: S.plum, fg: S.gold2, r: 18 * u });
      say('วันอาทิตย์อีสเตอร์', TX, 1240 * u, t - 1.0, { size: 60 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(36), to: bar(39), cues: [[0.2, 'swish', 0.4], [2.5, 'thump', 0.5], [5.0, 'whoosh', 0.6]],
    draw(t) {
      jungle(t, { fog: 0.45 + t * 0.05 });
      const p = remap(t, 1.5, 7.5), wy = 1560 * u - p * 520 * u;
      walker(TX + 60 * u - p * 70 * u, wy, (240 - p * 190) * u, t, { alpha: 1 - clamp((p - 0.7) / 0.3) * 0.8 });
      g.fillStyle = PAPER_BAND; g.fillRect(0, 200 * u, W, 320 * u);
      kicker('ช่วงบ่ายวันนั้น', TX, 290 * u, t);
      say('ขณะที่เพื่อน ๆ พักผ่อนอยู่ในบ้าน', TX, 410 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.ink });
      g.fillStyle = PLUM_BAND; if (t > 2.3) g.fillRect(0, 1330 * u, W, 250 * u);
      say('เขาออกจากบ้านพักไปคนเดียว\nเชื่อกันว่าออกไปเดินเล่น', TX, 1420 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.cream });
      finish(0.6);
    } },
  { from: bar(39), to: bar(42), cues: [[0.2, 'pop', 0.5], [0.6, 'pop', 0.5], [1.0, 'pop', 0.5], [5.0, 'impact', 0.9]],
    draw(t) {
      const [sx, sy] = shake(t, 5.0, 14); g.translate(sx, sy);
      night(S.plum);
      // a wooden table top-down with what he left behind
      g.fillStyle = '#4A2C1A'; rrect(g, 100 * u, 560 * u, W - 230 * u, 520 * u, 16 * u); g.fill();
      g.strokeStyle = 'rgba(0,0,0,0.2)'; g.lineWidth = 3 * u; for (let k = 0; k < 7; k++) { g.beginPath(); g.moveTo(110 * u, 600 * u + k * 70 * u); g.lineTo(W - 140 * u, 600 * u + k * 70 * u + Math.sin(k) * 10 * u); g.stroke(); }
      const item = (at, fn) => { const s = spring(t - at, 'playful'); if (s <= 0) return; g.save(); fn(s); g.restore(); };
      item(0.2, (s) => { g.translate(300 * u, 800 * u); g.rotate(-0.2); g.scale(s, s); g.fillStyle = '#E8E0CC'; g.fillRect(-80 * u, -120 * u, 160 * u, 240 * u); g.fillStyle = S.mag; g.fillRect(-80 * u, -40 * u, 160 * u, 70 * u);
        g.fillStyle = '#F4EFE4'; for (let k = 0; k < 3; k++) g.fillRect(-50 * u + k * 34 * u, -150 * u, 24 * u, 50 * u); });
      item(0.6, (s) => { g.translate(530 * u, 860 * u); g.rotate(0.3); g.scale(s, s); g.fillStyle = '#9AA3A8'; rrect(g, -45 * u, -80 * u, 90 * u, 160 * u, 14 * u); g.fill(); g.fillStyle = '#5E666B'; g.fillRect(-45 * u, -80 * u, 90 * u, 40 * u); });
      item(1.0, (s) => { g.translate(740 * u, 780 * u); g.scale(s, s); g.fillStyle = 'rgba(200,140,60,0.85)'; rrect(g, -55 * u, -90 * u, 110 * u, 170 * u, 18 * u); g.fill(); g.fillStyle = '#F4EFE4'; g.fillRect(-60 * u, -120 * u, 120 * u, 40 * u);
        g.fillStyle = '#F4EFE4'; g.fillRect(-40 * u, -30 * u, 80 * u, 60 * u); });
      kicker('สิ่งที่เขาทิ้งไว้ในบ้านพัก', TX, 300 * u, t, { color: S.gold });
      say('ตามรายงาน: บุหรี่ ไฟแช็ก\nและยาประจำตัวของเขา', TX, 410 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      say('เหมือนตั้งใจออกไปไม่นาน', TX, 1200 * u, t - 2.5, { size: 50 * u, weight: 800, color: S.gold2 });
      say('แต่จนฟ้ามืด เขาก็ไม่กลับมา', TX, 1360 * u, t - 5.0, { size: 56 * u, weight: 800, color: S.mag2 });
      finish();
    } },
  // ---------------- Chapter 6 — the search
  { from: bar(42), to: bar(46), cues: Array.from({ length: 12 }, (_, i) => [0.3 + i * 0.5, 'tick', 0.3]).concat([[2.5, 'pop', 0.5], [5.0, 'pop', 0.5], [7.5, 'thump', 0.6]]),
    draw(t) {
      night(S.plum);
      searchMap(t, clamp(spring(t - 0.3, 20, 12)) * 0.9, { y0: 500 * u, h: 640 * u });
      kicker('หนึ่งในการค้นหาครั้งใหญ่ที่สุดของมาเลเซีย', TX, 300 * u, t, { color: S.gold });
      say('คนหลายร้อยคนเดินเท้าค้นป่า', TX, 410 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      [['ทหาร', 2.5], ['ตำรวจ', 2.9], ['นักแกะรอยโอรัง อัสลี', 3.3], ['สุนัขดมกลิ่น', 5.0], ['เฮลิคอปเตอร์', 5.4]].forEach(([s, at], i) => {
        const p = spring(t - at, 'snappy'); if (p <= 0) return;
        const row = i < 3 ? 0 : 1, xs = row === 0 ? [180, 380, 690] : [370, 680], x = xs[row === 0 ? i : i - 3] * u, y = 1240 * u + row * 110 * u;
        const w = [190, 190, 360, 280, 280][i] * u;
        g.save(); g.translate(x, y); g.scale(p, p); g.fillStyle = i === 2 ? S.mag : S.teal; rrect(g, -w / 2, -40 * u, w, 80 * u, 40 * u); g.fill();
        text(g, s, 0, 12 * u, { size: 34 * u, weight: 800, family: THAI, color: C.cream }); g.restore(); });
      say('ค้นอย่างเป็นทางการราว 11 วัน', TX, 1500 * u, t - 7.5, { size: 46 * u, weight: 800, color: S.gold2 });
      finish(0.8);
    } },
  { from: bar(46), to: bar(48), cues: [[0.2, 'riser', 0.4], [2.5, 'chime', 0.5]],
    draw(t) {
      night('#0E070C');
      // a crystal ball glowing over a cloth
      const gl = 0.6 + 0.4 * Math.sin(t * 3);
      const rg = g.createRadialGradient(TX, 840 * u, 10 * u, TX, 840 * u, 420 * u); rg.addColorStop(0, `rgba(58,165,154,${0.45 * gl})`); rg.addColorStop(1, 'rgba(58,165,154,0)');
      g.fillStyle = rg; g.fillRect(0, 400 * u, W, 900 * u);
      g.fillStyle = S.mag; g.beginPath(); g.ellipse(TX, 1050 * u, 360 * u, 70 * u, 0, 0, 7); g.fill();
      g.fillStyle = S.gold; g.fillRect(TX - 110 * u, 990 * u, 220 * u, 50 * u);
      g.fillStyle = 'rgba(160,220,210,0.35)'; g.beginPath(); g.arc(TX, 860 * u, 160 * u, 0, 7); g.fill();
      g.strokeStyle = 'rgba(220,240,236,0.6)'; g.lineWidth = 4 * u; g.stroke();
      g.fillStyle = 'rgba(255,255,255,0.5)'; g.beginPath(); g.ellipse(TX - 60 * u, 790 * u, 40 * u, 22 * u, -0.6, 0, 7); g.fill();
      for (let i = 0; i < 6; i++) { const a = t * 0.8 + i; g.fillStyle = `rgba(240,203,114,${0.4 + 0.3 * Math.sin(t * 2 + i)})`; g.beginPath(); g.arc(TX + Math.cos(a) * 80 * u, 860 * u + Math.sin(a * 1.3) * 60 * u, 6 * u, 0, 7); g.fill(); }
      kicker('เมื่อร่องรอยเงียบหาย', TX, 330 * u, t, { color: S.gold });
      say('มีรายงานว่าแม้แต่ร่างทรงและนักพลังจิต\nก็ถูกเชิญมาช่วยหา', TX, 1250 * u, t - 0.6, { size: 44 * u, weight: 800, color: C.cream });
      say('แต่ก็ไม่พบอะไรเลย', TX, 1450 * u, t - 2.5, { size: 54 * u, weight: 800, color: S.mag2 });
      finish();
    } },
  { from: bar(48), to: bar(50), cues: [[0.1, 'swish', 0.5], [2.5, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 20); g.translate(sx, sy);
      g.fillStyle = '#5A4632'; g.fillRect(0, 0, W, H);
      g.fillStyle = 'rgba(0,0,0,0.18)'; for (let i = 0; i < 22; i++) g.fillRect(0, i * 90 * u, W, 4 * u);
      poster(TX, 820 * u, 560 * u, t - 0.1);
      stamp('NO TRACE', TX, 1120 * u, t - 2.5, { size: 120 * u, rot: -0.12, color: S.mag2 });
      g.fillStyle = PLUM_BAND; g.fillRect(0, 1340 * u, W, 230 * u);
      say('ไม่พบร่าง ไม่พบเสื้อผ้า\nไม่พบร่องรอยใด ๆ ของเขาอีกเลย', TX, 1430 * u, t - 0.6, { size: 46 * u, weight: 800, color: C.cream });
      finish(0.7);
    } },
  // ---------------- Chapter 7 — theories
  { from: bar(50), to: bar(52), cues: Array.from({ length: 6 }, (_, i) => [0.2 + i * 0.35, 'pop', 0.4]),
    draw(t) {
      paper();
      g.fillStyle = C.paper2; g.fillRect(60 * u, 500 * u, W - 150 * u, 900 * u);
      [['หลงป่า / อุบัติเหตุ', 290, 640], ['ตกกับดักสัตว์', 730, 690], ['ถูกสัตว์ป่าทำร้าย', 290, 900], ['ถูกลักพาตัว\nหรือฆาตกรรม', 730, 950], ['โยงกับหน่วยข่าวกรอง', 290, 1170], ['ตั้งใจหายตัวไปเอง', 730, 1220]].forEach(([s, x, y], i) =>
        theoryCard(i, s, x * u, y * u, t - 0.2 - i * 0.35, { rot: (hash(i, 7) - 0.5) * 0.1, w: 400 * u, h: 160 * u }));
      kicker('ทฤษฎีที่ถูกเสนอ', TX, 300 * u, t);
      say('เกิดอะไรขึ้นกับเขา?', TX, 420 * u, t - 0.1, { size: 60 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(52), to: bar(54), cues: [[0.2, 'thump', 0.6], [3.0, 'impact', 0.9]],
    draw(t) {
      jungle(t, { fog: 0.6, trail: 1 });
      // a covered pit trap in the trail
      g.fillStyle = '#1B140C'; g.beginPath(); g.ellipse(TX - 60 * u, 1380 * u, 170 * u, 50 * u, 0, 0, 7); g.fill();
      g.strokeStyle = '#6B5A3A'; g.lineWidth = 7 * u; for (let k = 0; k < 6; k++) { g.beginPath(); g.moveTo(TX - 220 * u + k * 60 * u, 1350 * u); g.lineTo(TX - 160 * u + k * 50 * u, 1410 * u); g.stroke(); }
      g.fillStyle = PAPER_BAND; g.fillRect(0, 200 * u, W, 340 * u);
      kicker('ทฤษฎีที่ 1 · ป่าดิบ', TX, 290 * u, t);
      say('หลงป่า พลัดตกหุบเขา ตกกับดักสัตว์\nหรือถูกสัตว์ป่าอย่างเสือทำร้าย', TX, 400 * u, t - 0.2, { size: 44 * u, weight: 800, color: C.ink });
      stamp('UNPROVEN', TX, 900 * u, t - 3.0, { size: 110 * u, rot: -0.1, color: S.mag2 });
      g.fillStyle = PLUM_BAND; if (t > 2.8) g.fillRect(0, 1460 * u, W, 120 * u);
      say('แต่ไม่เคยพบร่างหรือกระดูกเลย', TX, 1535 * u, t - 3.0, { size: 44 * u, weight: 800, color: C.cream });
      finish(0.6);
    } },
  { from: bar(54), to: bar(56), cues: [[0.2, 'thump', 0.6], [3.0, 'impact', 0.9]],
    draw(t) {
      night('#0C0A0E');
      // two shadow figures, torch beams sweeping
      for (const [x, ph] of [[300, 0], [760, 1.5]]) { const a = -Math.PI / 2 + Math.sin(t * 0.8 + ph) * 0.5;
        const gr = g.createRadialGradient(x * u, 1250 * u, 10 * u, x * u, 1250 * u, 600 * u); gr.addColorStop(0, 'rgba(240,203,114,0.35)'); gr.addColorStop(1, 'rgba(240,203,114,0)');
        g.fillStyle = gr; g.beginPath(); g.moveTo(x * u, 1250 * u); g.arc(x * u, 1250 * u, 600 * u, a - 0.25, a + 0.25); g.closePath(); g.fill();
        person(x * u, 1460 * u, 150 * u, '#050405'); }
      kicker('ทฤษฎีที่ 2 · ถูกลักพาตัวหรือฆาตกรรม', TX, 300 * u, t, { color: S.gold });
      say('โดยคู่แข่งทางธุรกิจ?\nหรือกองโจรคอมมิวนิสต์มลายา?', TX, 410 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      stamp('UNPROVEN', TX, 900 * u, t - 3.0, { size: 110 * u, rot: -0.1, color: S.mag2 });
      say('ปี 2017 สารคดีเรื่องหนึ่งอ้างว่าเป็นฝีมือคอมมิวนิสต์\nแต่ก็ยังไม่มีหลักฐานชี้ชัด', TX, 1200 * u, t - 3.2, { size: 38 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(56), to: bar(58), cues: [[0.2, 'type', 0.5], [3.0, 'impact', 0.9]],
    draw(t) {
      paper();
      // a file with redacted lines
      g.fillStyle = '#F7F1E3'; g.save(); g.translate(TX, 860 * u); g.rotate(0.03); g.fillRect(-330 * u, -280 * u, 660 * u, 560 * u);
      text(g, 'CLASSIFIED', 0, -200 * u, { size: 50 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 8 * u });
      for (let i = 0; i < 8; i++) { const w = (380 + hash(i, 3) * 180) * u, p = clamp((t - 0.3 - i * 0.18) / 0.25);
        g.fillStyle = 'rgba(22,19,15,0.25)'; g.fillRect(-270 * u, -130 * u + i * 52 * u, w, 14 * u);
        if (i % 2 === 0) { g.fillStyle = C.ink; g.fillRect(-270 * u, -142 * u + i * 52 * u, w * p, 36 * u); } }
      g.restore();
      kicker('ทฤษฎีที่ 3 · สายลับและการหายตัวโดยตั้งใจ', TX, 300 * u, t);
      say('งานข่าวกรองในยุคสงครามเย็น?\nหรือเขาตั้งใจหายตัวไปเอง?', TX, 410 * u, t - 0.2, { size: 46 * u, weight: 800 });
      stamp('UNPROVEN', TX, 900 * u, t - 3.0, { size: 110 * u, rot: -0.1 });
      say('ไม่มีทฤษฎีไหนพิสูจน์ได้จนถึงวันนี้', TX, 1300 * u, t - 3.4, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- Chapter 8 — aftermath and legacy
  { from: bar(58), to: bar(60), cues: [[0.2, 'thump', 0.5], [2.5, 'chime', 0.4]],
    draw(t) {
      night('#0E070C');
      // a single candle
      const fl = 1 + 0.08 * Math.sin(t * 13) + 0.05 * noise(t * 6, 2);
      const rg = g.createRadialGradient(TX, 860 * u, 10 * u, TX, 860 * u, 360 * u * fl); rg.addColorStop(0, 'rgba(240,203,114,0.35)'); rg.addColorStop(1, 'rgba(240,203,114,0)');
      g.fillStyle = rg; g.fillRect(0, 400 * u, W, 900 * u);
      g.fillStyle = '#E8DFCC'; g.fillRect(TX - 40 * u, 900 * u, 80 * u, 220 * u);
      g.fillStyle = S.gold2; g.beginPath(); g.ellipse(TX, 860 * u, 18 * u, 40 * u * fl, 0, 0, 7); g.fill();
      kicker('สิงหาคม 1967', TX, 330 * u, t, { color: S.gold });
      say('ราว 5 เดือนต่อมา พี่สาวของเขา\nถูกฆาตกรรมที่บ้านในรัฐเพนซิลเวเนีย', TX, 1250 * u, t - 0.2, { size: 44 * u, weight: 800, color: C.cream });
      say('คดีนี้ก็ไม่เคยคลี่คลาย และไม่มีหลักฐาน\nว่าทั้งสองเรื่องเกี่ยวข้องกัน', TX, 1420 * u, t - 2.5, { size: 40 * u, weight: 800, color: C.fog });
      finish();
    } },
  { from: bar(60), to: bar(62), cues: [[0.2, 'thump', 0.6], [2.5, 'impact', 0.8]],
    draw(t) {
      paper();
      big('1974', TX, 760 * u, t - 0.1, { size: 280 * u, color: C.red });
      say('ศาลไทยประกาศให้เขาเป็นผู้เสียชีวิต\nตามกฎหมาย', TX, 1000 * u, t - 0.8, { size: 48 * u, weight: 800 });
      say('แต่ไม่มีใครรู้ว่าเกิดอะไรขึ้นกับเขาจริง ๆ', TX, 1260 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.red });
      kicker('7 ปีหลังหายตัวไป', TX, 380 * u, t);
      finish(0.6);
    } },
  { from: bar(62), to: bar(64), cues: [[0.2, 'swish', 0.5], [2.5, 'chime', 0.5]],
    draw(t) {
      canal(t, { water: 1100 * u });
      g.fillStyle = PAPER_BAND; g.fillRect(0, 200 * u, W, 340 * u);
      kicker('มรดกที่เขาทิ้งไว้', TX, 290 * u, t);
      say('บ้านของเขากลายเป็น\nพิพิธภัณฑ์บ้านจิม ทอมป์สัน', TX, 400 * u, t - 0.2, { size: 48 * u, weight: 800 });
      g.fillStyle = PLUM_BAND; if (t > 2.3) g.fillRect(0, 1300 * u, W, 270 * u);
      say('และผ้าไหมไทยก็เป็นที่รู้จัก\nไปทั่วโลกจนถึงทุกวันนี้', TX, 1390 * u, t - 2.5, { size: 46 * u, weight: 800, color: S.gold2 });
      finish(0.5);
    } },
  { from: bar(64), to: bar(68), cues: [[0, 'thump', 0.9], [5.0, 'swish', 0.4]],
    draw(t) {
      night(S.plum);
      ribbons(t, 1330 * u, { n: 4, gap: 60 * u, th: 50 * u, amp: 26 * u, alpha: clamp(t / 1.5) });
      big('JIM', TX, 700 * u, t, { size: 240 * u, color: C.cream });
      big('THOMPSON', TX, 900 * u, t - 0.15, { size: 150 * u, color: C.cream });
      const p = spring(t - 0.8, 'default');
      g.fillStyle = S.gold; g.fillRect(TX - 330 * u * p, 960 * u, 660 * u * p, 10 * u);
      say('1906 – 1967 ?', TX, 1100 * u, t - 1.5, { size: 64 * u, weight: 800, color: S.gold2 });
      say('ราชาผ้าไหมไทยที่หายไปในป่า', TX, 1210 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(68), to: bar(72), cues: [[0, 'whoosh', 0.5], [5.0, 'chime', 0.8]],
    draw(t) {
      jungle(t, { fog: 0.7 + 0.03 * t });
      walker(TX - 10 * u, 1060 * u, 60 * u, t, { alpha: 0.5 * (1 - clamp(t / 6)) });
      g.fillStyle = PLUM_BAND; g.fillRect(0, 200 * u, W, 320 * u);
      say('คุณคิดว่าเกิดอะไรขึ้นกับ\nJim Thompson?', TX, 310 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.cream });
      say('คอมเมนต์บอกได้เลย', TX, 470 * u, t - 2.5, { size: 46 * u, weight: 800, color: S.gold2 });
      finish(0.6);
    } },
];
