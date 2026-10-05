// Mona Lisa theft, 1911 — Act 2: 0:55–3:00 (bars 22–72).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake } from './kit.js';
import { wall, frame, lisa, glass, emptyWall, monaOnWall, FR, worker, crowdBack, door, mapEU, PL, train,
  newspaper, thumbprint, trunk, stoneHead, officer, hotel, scales, easel, GOLD } from './a1.js';

const INTER = 'Inter, sans-serif';
const band = (y, h, c = 'rgba(20,10,8,0.85)') => { g.fillStyle = c; g.fillRect(0, y * u, W, h * u); };

export default () => [
  // ---------------- discovery
  { from: bar(22), to: bar(23), cues: [[0, 'tick', 0.6], [0.3, 'tick', 0.6], [1.0, 'thump', 0.6]],
    draw(t) {
      paper(); kicker('สิงหาคม 1911', TX, 420 * u, t);
      flip(TX, 820 * u, 460 * u, 540 * u, ['21', '22'], [0, 0.3], t, { size: 360 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('วันอังคาร · ลูฟวร์เปิดตามปกติ', TX, 1240 * u, t - 0.8, { size: 54 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(23), to: bar(26), cues: [[0.2, 'thump', 0.5], [2.5, 'pop', 0.7], [5.0, 'thump', 0.6]],
    draw(t) {
      wall();
      emptyWall(TX - 90 * u, 860 * u, 400 * u, 560 * u);
      const s = spring(t - 0.2, 'default');
      easel(830 * u + (1 - s) * 300 * u, 1230 * u, 300 * u);
      person(900 * u + (1 - s) * 300 * u, 1290 * u, 110 * u, '#120A08');
      band(210, 300);
      kicker('Louis Béroud · จิตรกร', TX, 290 * u, t, { color: C.red });
      say('มาเพื่อวาดภาพโมนาลิซา', TX, 410 * u, t - 0.3, { size: 54 * u, weight: 800, color: C.cream });
      if (t > 2.5) band(1290, 300);
      say('แต่บนผนังมีแค่ตะขอเหล็ก 4 อัน', TX, 1380 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.cream });
      say('ตอนแรกยามคิดว่า\nภาพถูกยกไปถ่ายรูป', TX, 1470 * u, t - 5.0, { size: 42 * u, weight: 800, color: C.fog });
      finish(0.8);
    } },
  { from: bar(26), to: bar(28), cues: [[0.2, 'riser', 0.5], [1.25, 'impact', 1.2], [3.2, 'thump', 0.8]],
    draw(t) {
      const [sx, sy] = shake(t, 1.25, 26); g.translate(sx, sy);
      night('#120808');
      const cl = spring(t - 2.6, 'heavy');
      g.fillStyle = '#2A1410'; g.fillRect(TX - 330 * u, 760 * u, 660 * u, 760 * u);
      g.fillStyle = '#E9C66B'; g.globalAlpha = 0.25 * (1 - cl); g.fillRect(TX - 300 * u, 790 * u, 600 * u, 730 * u); g.globalAlpha = 1;
      for (const sd of [-1, 1]) { const w = 300 * u * cl; g.fillStyle = '#4A2A1C'; g.fillRect(sd < 0 ? TX - 300 * u : TX + 300 * u - w, 790 * u, w, 730 * u);
        g.strokeStyle = 'rgba(0,0,0,0.35)'; g.lineWidth = 4 * u; if (cl > 0.3) g.strokeRect(sd < 0 ? TX - 260 * u : TX + 40 * u, 840 * u, 220 * u * cl, 280 * u); }
      if (cl > 0.8) { g.fillStyle = C.cream; rrect(g, TX - 150 * u, 1170 * u, 300 * u, 90 * u, 8 * u); g.fill(); text(g, 'FERMÉ', TX, 1232 * u, { size: 52 * u, weight: 400, family: SERIF, color: C.red, tracking: 6 * u }); }
      g.fillStyle = '#080404'; g.fillRect(0, 1520 * u, W, H - 1520 * u);
      say('แล้วทุกคนก็รู้ความจริง', TX, 330 * u, t - 0.1, { size: 54 * u, weight: 800, color: C.cream });
      stamp('MISSING', TX, 560 * u, t - 1.25, { size: 120 * u, rot: -0.08 });
      say('ลูฟวร์ปิดราว 1 สัปดาห์ เพื่อค้นทั้งอาคาร', TX, 1610 * u - 40 * u, t - 3.2, { size: 42 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(28), to: bar(30), cues: [[0.1, 'swish', 0.6], [0.6, 'swish', 0.6], [1.1, 'swish', 0.6], [2.5, 'thump', 0.5]],
    draw(t) {
      paper();
      [[TX - 200, 880, -0.12, 'LE CRI DU MATIN', 'โมนาลิซาหายไป!', 0.1], [TX + 210, 960, 0.1, 'GAZETTE DES QUAIS', 'ใครขโมย?', 0.6], [TX, 1120, -0.03, 'THE MORNING LANTERN', 'ตำรวจยังไร้เบาะแส', 1.1]].forEach(([x, y, r, m, h, at], i) => {
        const p = spring(t - at, 'snappy'); if (p <= 0) return;
        g.save(); g.translate(x * u, y * u); g.scale(p, p); g.rotate((1 - p) * 0.6); newspaper(0, 0, 440 * u, r, m, h, { seed: i }); g.restore(); });
      say('ข่าวดังไปทั่วโลก', TX, 330 * u, t - 0.1, { size: 62 * u, weight: 800 });
      say('ภาพโมนาลิซาขึ้นหน้าหนึ่ง\nหนังสือพิมพ์หลายประเทศ', TX, 1490 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(30), to: bar(33), cues: Array.from({ length: 8 }, (_, i) => [0.2 + i * 0.3, 'pop', 0.25]).concat([[3.75, 'thump', 0.6]]),
    draw(t) {
      wall();
      emptyWall(TX, 980 * u, FR.w * u, FR.h * u);
      const n = Math.min(27, Math.floor(remap(t, 0.2, 3.0) * 27) + 1);
      crowdBack(n, 1440 * u, t, { rows: 3 });
      band(200, 420);
      kicker('เมื่อลูฟวร์เปิดอีกครั้ง', TX, 290 * u, t, { color: C.red });
      say('ผู้คนต่อแถวมาดู… ผนังว่าง ๆ', TX, 410 * u, t - 0.3, { size: 52 * u, weight: 800, color: C.cream });
      say('บางแหล่งเล่าว่า คนมาดูช่องว่างนี้\nมากกว่าตอนที่ภาพยังแขวนอยู่', TX, 500 * u, t - 3.75, { size: 40 * u, weight: 800, color: C.fog });
      finish(0.8);
    } },
  // ---------------- suspects
  { from: bar(33), to: bar(36), cues: [[0.2, 'thump', 0.6], [1.0, 'click', 0.6], [2.5, 'pop', 0.6], [2.9, 'pop', 0.6], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      const s = spring(t - 0.2, 'default');
      person(TX, 1080 * u + (1 - s) * 200 * u, 200 * u, C.ink, { tie: C.red });
      [[220, 960, -0.1, 2.5], [820, 980, 0.12, 2.9]].forEach(([x, y, r, at]) => { const p = spring(t - at, 'playful'); if (p > 0) stoneHead(x * u, y * u, 120 * u * p, r); });
      kicker('7 กันยายน 1911', TX, 300 * u, t);
      say('ตำรวจจับกุมกวีชื่อดัง', TX, 420 * u, t - 0.3, { size: 52 * u, weight: 800 });
      say('Guillaume Apollinaire', TX, 520 * u, t - 1.0, { size: 56 * u, weight: 800, family: SERIF, color: C.red });
      say('เพราะ Géry Pieret อดีตเลขาฯ ของเขา\nเคยขโมยรูปปั้นหินโบราณจากลูฟวร์', TX, 1290 * u, t - 5.0, { size: 42 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(36), to: bar(38), cues: [[0.2, 'thump', 0.6], [2.5, 'impact', 0.9]],
    draw(t) {
      paper();
      const s1 = spring(t - 0.1, 'default'), s2 = spring(t - 0.4, 'default');
      person(TX - 200 * u, 1050 * u + (1 - s1) * 200 * u, 170 * u, C.inkSoft, { tie: C.red });
      person(TX + 200 * u, 1050 * u + (1 - s2) * 200 * u, 170 * u, C.ink);
      text(g, 'Apollinaire', TX - 200 * u, 1230 * u, { size: 40 * u, weight: 400, family: SERIF, color: C.inkSoft });
      text(g, 'Picasso', TX + 200 * u, 1230 * u, { size: 40 * u, weight: 400, family: SERIF, color: C.ink });
      say('Pablo Picasso ผู้เคยซื้อรูปปั้นจาก Pieret\nก็ถูกเรียกไปสอบปากคำ', TX, 330 * u, t - 0.2, { size: 44 * u, weight: 800 });
      stamp('CLEARED', TX, 650 * u, t - 2.5, { size: 120 * u, rot: -0.1 });
      say('ทั้งคู่พ้นข้อสงสัย ไม่เกี่ยวกับคดีนี้', TX, 1360 * u, t - 2.8, { size: 46 * u, weight: 800, color: C.red });
      say('Apollinaire ถูกขังเกือบ 1 สัปดาห์', TX, 1450 * u, t - 3.4, { size: 40 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(38), to: bar(41), cues: [[0.2, 'riser', 0.4], [2.5, 'thump', 0.7], [5.0, 'impact', 0.8]],
    draw(t) {
      night('#0B0F16');
      glass(TX, 900 * u, 620 * u, 760 * u);
      thumbprint(TX, 900 * u, 230 * u, remap(t, 0.3, 2.2), C.cream);
      band(200, 330, 'rgba(8,10,16,0.88)');
      kicker('Alphonse Bertillon · ผู้เชี่ยวชาญนิติวิทยาศาสตร์', TX, 290 * u, t, { color: C.red, size: 34 * u });
      say('พบรอยนิ้วโป้งบนกระจกที่ครอบภาพ', TX, 410 * u, t - 0.3, { size: 48 * u, weight: 800, color: C.cream });
      if (t > 2.5) band(1290, 300, 'rgba(8,10,16,0.88)');
      say('แต่แฟ้มประวัติสมัยนั้นเก็บแค่โป้งขวา\nรอยนี้เป็นนิ้วซ้าย', TX, 1380 * u, t - 2.5, { size: 42 * u, weight: 800, color: C.cream, out: 2.4 });
      say('ตำรวจเคยไปสอบปากคำเขาถึงห้อง\nแต่ไม่สงสัยอะไรเลย', TX, 1380 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.red });
      finish();
    } },
  // ---------------- two years in a trunk
  { from: bar(41), to: bar(44), cues: [[0.2, 'thump', 0.6], [2.5, 'whoosh', 0.6], [3.2, 'pop', 0.7], [5.0, 'thump', 0.7]],
    draw(t) {
      night('#1C140F');
      g.fillStyle = '#2A1E16'; g.fillRect(0, 1250 * u, W, H - 1250 * u);
      const rv = clamp((t - 2.5) / 0.8);
      trunk(TX, 1000 * u, 660 * u, { reveal: rv });
      if (t > 3.2) { const p = spring(t - 3.2, 'snappy'); g.save(); g.globalAlpha = clamp(p);
        g.strokeStyle = C.red; g.lineWidth = 5 * u; g.beginPath(); g.moveTo(TX - 380 * u, 1150 * u); g.lineTo(TX - 260 * u, 1110 * u); g.stroke();
        text(g, 'ช่องลับ', TX - 380 * u, 1210 * u, { size: 40 * u, weight: 800, family: THAI, color: C.red }); g.restore(); }
      band(200, 330, 'rgba(18,12,8,0.88)');
      kicker('ห้องเช่าของเขาในปารีส', TX, 290 * u, t, { color: C.red });
      say('หลายแหล่งระบุว่าภาพถูกซ่อน\nในหีบไม้ที่มีพื้นลับ', TX, 400 * u, t - 0.3, { size: 46 * u, weight: 800, color: C.cream });
      say('นานกว่า 2 ปี', TX, 1440 * u, t - 5.0, { size: 84 * u, weight: 800, color: C.red });
      finish(0.9);
    } },
  { from: bar(44), to: bar(46), cues: [[0.2, 'swish', 0.6], [1.0, 'type', 0.6], [2.5, 'pop', 0.6]],
    draw(t) {
      paper();
      const s = spring(t - 0.1, 'default');
      g.save(); g.translate(TX, 880 * u + (1 - s) * 400 * u); g.rotate(-0.05);
      g.fillStyle = 'rgba(0,0,0,0.2)'; g.fillRect(-330 * u, -190 * u, 680 * u, 400 * u);
      g.fillStyle = '#E8DCBE'; g.fillRect(-340 * u, -200 * u, 680 * u, 400 * u);
      g.strokeStyle = '#B7A57E'; g.lineWidth = 3 * u; g.beginPath(); g.moveTo(-340 * u, -200 * u); g.lineTo(0, 20 * u); g.lineTo(340 * u, -200 * u); g.stroke();
      g.fillStyle = C.red; g.fillRect(220 * u, -170 * u, 80 * u, 96 * u); g.strokeStyle = C.paper; g.setLineDash([6 * u, 5 * u]); g.strokeRect(228 * u, -162 * u, 64 * u, 80 * u); g.setLineDash([]);
      typewriter('Sig. Alfredo Geri', -120 * u, 90 * u, t - 1.0, { size: 40 * u, family: SERIF, weight: 400, cps: 20 });
      typewriter('Firenze', -120 * u, 145 * u, t - 1.9, { size: 40 * u, family: SERIF, weight: 400, cps: 20 });
      g.restore();
      kicker('ปลายปี 1913', TX, 300 * u, t);
      say('เขาเขียนจดหมายถึง Alfredo Geri\nพ่อค้าศิลปะในฟลอเรนซ์', TX, 410 * u, t - 0.3, { size: 46 * u, weight: 800 });
      say('ลงชื่อว่า “Leonardo”', TX, 1250 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.red });
      say('เสนอนำภาพกลับคืนสู่อิตาลี', TX, 1350 * u, t - 3.2, { size: 44 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(46), to: bar(48), cues: [[0.2, 'whoosh', 0.6], [0.6, 'pop', 0.6], [4.0, 'pop', 0.7]],
    draw(t) {
      const P = mapEU({ lat: 46.3, lon: 6.8, z: 120 * u });
      const a = P(PL.paris), b = P(PL.florence);
      const pts = Array.from({ length: 24 }, (_, i) => { const f = i / 23; return [a[0] + (b[0] - a[0]) * f + Math.sin(f * Math.PI) * 90 * u, a[1] + (b[1] - a[1]) * f - Math.sin(f * Math.PI) * 40 * u]; });
      const p = clamp(remap(t, 0.8, 4.0));
      path(pts, 1, { color: 'rgba(239,230,210,0.25)', width: 4 * u, dash: [12 * u, 10 * u] });
      const hd = path(pts, p, { color: C.red, width: 7 * u });
      if (p > 0 && p < 1) train(hd.x, hd.y, 40 * u, hd.ang);
      topScrim(560, '18,24,32');
      pin(...a, t - 0.6, { label: 'ปารีส', side: 1 });
      pin(...b, t - 4.0, { label: 'ฟลอเรนซ์', side: -1 });
      kicker('ธันวาคม 1913', TX, 280 * u, t, { color: C.red });
      say('นั่งรถไฟจากปารีสไปฟลอเรนซ์\nพร้อมภาพที่ซ่อนอยู่ในหีบ', TX, 390 * u, t - 0.3, { size: 46 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- Florence
  { from: bar(48), to: bar(51), cues: [[0.2, 'thump', 0.6], [2.5, 'click', 0.7], [3.0, 'riser', 0.4], [5.0, 'impact', 1.0]],
    draw(t) {
      night('#1C1712');
      g.fillStyle = '#2A2219'; g.fillRect(0, 1300 * u, W, H - 1300 * u);
      const lid = spring(t - 2.5, 'default'), lift = spring(t - 3.0, 'heavy');
      person(170 * u, 1330 * u, 130 * u, '#0E0B08', { tie: '#4A3A2A' });
      person(880 * u, 1330 * u, 135 * u, '#0E0B08', { tie: C.red });
      text(g, 'Geri', 170 * u, 1440 * u, { size: 36 * u, weight: 400, family: SERIF, color: C.fog });
      text(g, 'Poggi', 880 * u, 1440 * u, { size: 36 * u, weight: 400, family: SERIF, color: C.fog });
      trunk(TX, 1260 * u, 480 * u, { lid });
      if (lift > 0) { g.save(); g.translate(TX, 1180 * u - lift * 330 * u);
        g.fillStyle = '#6B5232'; g.fillRect(-140 * u, -200 * u, 280 * u, 400 * u); g.beginPath(); g.rect(-130 * u, -190 * u, 260 * u, 380 * u); g.clip(); lisa(260 * u, 380 * u); g.restore(); }
      band(200, 330, 'rgba(14,11,8,0.88)');
      kicker('Hotel Tripoli-Italia · ฟลอเรนซ์', TX, 290 * u, t, { color: C.red, size: 36 * u });
      say('Geri พา Giovanni Poggi\nผู้อำนวยการหอศิลป์ Uffizi มาด้วย', TX, 395 * u, t - 0.3, { size: 46 * u, weight: 800, color: C.cream });
      stamp('AUTHENTIC', TX, 1510 * u, t - 5.0, { size: 90 * u, rot: -0.06 });
      finish(0.9);
    } },
  { from: bar(51), to: bar(53), cues: [[0.2, 'thump', 0.7], [0.6, 'thump', 0.7], [2.5, 'swish', 0.6], [3.0, 'chime', 0.5]],
    draw(t) {
      night('#0E1018');
      hotel(TX, 1380 * u, 640 * u, 'HOTEL TRIPOLI-ITALIA', 'HOTEL LA GIOCONDA', clamp((t - 2.6) / 0.5));
      g.fillStyle = '#07080C'; g.fillRect(0, 1380 * u, W, H - 1380 * u);
      [-1, 1].forEach((sd, i) => { const s = spring(t - 0.2 - i * 0.4, 'default'); officer(TX + sd * 150 * u + (1 - s) * sd * 600 * u, 1520 * u, 150 * u); });
      band(200, 330, 'rgba(8,10,16,0.88)');
      say('ตำรวจจับกุม Peruggia', TX, 320 * u, t - 0.2, { size: 56 * u, weight: 800, color: C.cream });
      say('ต่อมาโรงแรมนี้เปลี่ยนชื่อ\nเป็น Hotel La Gioconda', TX, 420 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.red });
      finish(0.9);
    } },
  { from: bar(53), to: bar(56), cues: [[0.2, 'thump', 0.6], [2.5, 'click', 0.6], [3.75, 'thump', 0.6], [6.25, 'pop', 0.6]],
    draw(t) {
      paper();
      const tilt = track(t, [[0, -0.22], [3.75, 0], [6.25, 0.2]], 'heavy');
      scales(TX, 690 * u, 300 * u, tilt, 'เพื่อชาติ', 'เพื่อเงิน');
      kicker('แรงจูงใจ?', TX, 300 * u, t);
      say('เขาอ้างว่าทำเพื่อชาติ: คืนภาพให้อิตาลี', TX, 420 * u, t - 0.3, { size: 44 * u, weight: 800 });
      say('แต่ภาพนี้ไม่ได้ถูกปล้นไปจากอิตาลี\nLeonardo นำไปฝรั่งเศสด้วยตัวเอง', TX, 1230 * u, t - 2.5, { size: 42 * u, weight: 800, color: C.inkSoft });
      say('และหลายแหล่งชี้ว่าเขาหวังเงินตอบแทนด้วย', TX, 1420 * u, t - 6.25, { size: 42 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(56), to: bar(58), cues: [[0.2, 'thump', 0.7], [2.5, 'swish', 0.6], [3.0, 'impact', 0.8]],
    draw(t) {
      paper();
      // cell window
      g.fillStyle = C.paper2; g.fillRect(TX - 260 * u, 980 * u, 520 * u, 300 * u);
      g.fillStyle = C.ink; for (let k = 0; k < 6; k++) g.fillRect(TX - 240 * u + k * 92 * u, 980 * u, 16 * u, 300 * u * clamp(spring(t - 0.3 - k * 0.08, 'snappy')));
      kicker('มิถุนายน 1914 · ศาลในฟลอเรนซ์', TX, 300 * u, t);
      big('1 ปี 15 วัน', TX, 600 * u, t - 0.2, { size: 130 * u, color: C.ink });
      if (t > 2.5) { const p = clamp((t - 2.5) / 0.3); g.fillStyle = C.red; g.fillRect(TX - 320 * u, 560 * u, 640 * u * p, 12 * u); }
      say('ติดคุกจริงราว 7 เดือน', TX, 800 * u, t - 3.0, { size: 70 * u, weight: 800, color: C.red });
      say('แล้วได้รับการปล่อยตัว', TX, 1420 * u, t - 3.6, { size: 44 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------- homecoming
  { from: bar(58), to: bar(60), cues: [[0.2, 'pop', 0.6], [1.2, 'pop', 0.6], [2.2, 'pop', 0.6], [3.6, 'chime', 0.6]],
    draw(t) {
      const P = mapEU({ lat: 45.4, lon: 7.4, z: 100 * u });
      const f = P(PL.florence), r = P(PL.rome), m = P(PL.milan), pa = P(PL.paris);
      path([f, r, m, pa], clamp(remap(t, 0.3, 3.6)), { color: C.red, width: 6 * u, dash: [14 * u, 10 * u] });
      topScrim(560, '18,24,32');
      pin(...f, t - 0.2, { label: 'ฟลอเรนซ์', side: -1 });
      pin(...r, t - 1.2, { label: 'โรม', side: -1 });
      pin(...m, t - 2.2, { label: 'มิลาน', side: -1 });
      pin(...pa, t - 3.6, { label: 'ปารีส', side: 1, color: C.cream });
      kicker('ก่อนกลับฝรั่งเศส', TX, 280 * u, t, { color: C.red });
      say('ภาพถูกจัดแสดงที่\nฟลอเรนซ์ โรม และมิลาน', TX, 390 * u, t - 0.3, { size: 48 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(60), to: bar(62), cues: [[0, 'chime', 0.6], [0.6, 'tick', 0.4], [1.0, 'tick', 0.4], [1.4, 'tick', 0.4], [2.6, 'thump', 0.7]],
    draw(t) {
      wall();
      const s = spring(t - 0.1, 'heavy');
      g.save(); g.translate(0, (1 - s) * -600 * u); monaOnWall(t, { y: 820 * u, s: 0.78 }); g.restore();
      crowdBack(27, 1440 * u, t, { rows: 3 });
      band(200, 300);
      kicker('มกราคม 1914', TX, 290 * u, t, { color: C.red });
      say('โมนาลิซากลับสู่ลูฟวร์', TX, 405 * u, t - 0.2, { size: 58 * u, weight: 800, color: C.cream });
      band(1150, 240);
      const n = Math.round(100000 * clamp(spring(t - 0.5, 30, 11) * 1.004) / 1000) * 1000;
      text(g, `${Math.min(n, 100000).toLocaleString('en-US')}+`, TX, 1290 * u, { size: 120 * u, weight: 400, family: SERIF, color: C.red });
      say('คนมาชมใน 2 วันแรก ตามรายงาน', TX, 1360 * u, t - 1.5, { size: 40 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(62), to: bar(64), cues: [[0.2, 'thump', 0.6], [0.6, 'pop', 0.4], [1.0, 'pop', 0.4], [2.5, 'impact', 0.9]],
    draw(t) {
      paper();
      [[-280, 0], [0, 0], [280, 0], [-280, 300], [0, 300], [280, 300]].forEach(([dx, dy], i) => {
        const p = spring(t - 0.4 - i * 0.12, 'playful'); if (p <= 0) return;
        g.save(); g.translate(TX + dx * u, 820 * u + dy * u); g.scale(p, p);
        frame(0, 0, 180 * u, 250 * u, { inner: lisa, shadow: false });
        text(g, '?', 0, 40 * u, { size: 120 * u, weight: 400, family: SERIF, color: C.cream });
        g.restore(); });
      kicker('ตำนานที่ไม่มีหลักฐาน', TX, 300 * u, t);
      say('บทความปี 1932 อ้างว่ามีผู้บงการชื่อ Valfierno\nวางแผนขายภาพปลอมให้นักสะสม', TX, 410 * u, t - 0.2, { size: 40 * u, weight: 800 });
      stamp('UNPROVEN', TX, 1000 * u, t - 2.5, { size: 120 * u, rot: -0.1 });
      say('ไม่เคยมีหลักฐานยืนยันเรื่องนี้', TX, 1400 * u, t - 3.0, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- close
  { from: bar(64), to: bar(68), cues: [[0, 'thump', 0.9], [0.7, 'swish', 0.4], [5.0, 'chime', 0.5]],
    draw(t) {
      wall('#1E0F0C', '#170B09');
      monaOnWall(t, { y: 640 * u, s: 0.72 });
      big('1911', TX, 1230 * u, t, { size: 240 * u, color: C.cream });
      const p = spring(t - 0.7, 'default');
      g.fillStyle = C.red; g.fillRect(TX - 300 * u * p, 1290 * u, 600 * u * p, 10 * u);
      say('การโจรกรรมที่ทำให้โมนาลิซา\nกลายเป็นภาพที่ดังที่สุดในโลก', TX, 1390 * u, t - 1.0, { size: 48 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(68), to: bar(72), cues: [[0.3, 'pop', 0.6], [2.5, 'pop', 0.6], [5.0, 'chime', 0.8]],
    draw(t) {
      wall();
      monaOnWall(t, { y: 1000 * u, s: 0.85 });
      band(200, 380);
      say('คุณคิดว่า Peruggia ขโมยภาพนี้\nเพื่อชาติ หรือเพื่อเงิน?', TX, 320 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.cream });
      say('คอมเมนต์บอกได้เลย', TX, 510 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
];
