// Act 1 — empty frames, the night, the door (0:00–0:55, bars 0–22).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, rrect, text, typewriter, shake } from './kit.js';
import { wall, frame, stormPainting, concertPainting, cutCanvas, officer, GOLD } from './props.js';

export default () => [
  // ---------------- Chapter 1 — the empty frame
  { from: bar(0), to: bar(2), cues: [[0, 'thump', 0.6], [0.9, 'swish', 0.6], [1.6, 'impact', 0.9]],
    draw(t) {
      wall();
      const full = t < 0.9;
      frame(TX, 760 * u, 640 * u, 800 * u, { inner: full ? (w, h) => stormPainting(w, h, t) : null });
      if (!full && t < 1.2) { const p = clamp((t - 0.9) / 0.3); g.save(); g.globalAlpha = 1 - p; g.translate(TX, 760 * u - p * 600 * u); g.rotate(p * 0.4);
        g.beginPath(); g.rect(-256 * u, -356 * u, 512 * u, 712 * u); g.clip(); stormPainting(512 * u, 712 * u, t); g.restore(); }
      big('$500,000,000', TX, 1360 * u, t - 1.6, { size: 140 * u, color: C.red });
      say('ภาพที่หายไป เหลือไว้แค่กรอบเปล่า', TX, 1470 * u, t - 2.0, { size: 48 * u, weight: 700, color: C.cream });
      finish(0.8);
    } },
  { from: bar(2), to: bar(4), cues: [[0, 'whoosh', 0.5], [2.5, 'thump', 0.6]],
    draw(t) {
      wall();
      const z = track(t, [[0, 1], [0.1, 0.55]], 'heavy');
      g.save(); g.translate(TX, 760 * u); g.scale(z, z); g.translate(-TX, -760 * u);
      [[-760, 0, 520, 640], [0, 0, 640, 800], [760, 0, 520, 640], [-760, 820, 420, 520], [0, 860, 300, 380], [760, 820, 420, 520]].forEach(([dx, dy, w, h]) =>
        frame(TX + dx * u, 760 * u + dy * u, w * u, h * u));
      g.restore();
      const y = say('ผลงานศิลปะ 13 ชิ้น\nถูกขโมยในคืนเดียว', TX, 1250 * u, t - 0.2, { size: 64 * u, weight: 800, color: C.cream });
      say('การโจรกรรมงานศิลปะ\nครั้งใหญ่ที่สุดในประวัติศาสตร์', TX, y + 20 * u, t - 2.5, { size: 40 * u, weight: 700, color: C.red });
      finish(0.8);
    } },
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1], [3.2, 'type', 0.4]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 400 * u, 90 * u, 14 * u); g.fill();
      text(g, 'FBI · GARDNER THEFT', 270 * u, 472 * u, { size: 32 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 3 * u });
      g.restore();
      say('ผ่านมากว่า 36 ปี', TX, 760 * u, t - 0.25, { size: 70 * u, weight: 800 });
      stamp('UNSOLVED', TX, 1080 * u, t - 2.5, { size: 150 * u, rot: -0.12 });
      say('ไม่มีใครถูกจับ ไม่ได้ภาพคืนสักชิ้น', TX, 1380 * u, t - 3.2, { size: 48 * u, weight: 600, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------- Chapter 2 — Boston, St Patrick's night
  { from: bar(6), to: bar(7), cues: Array.from({ length: 6 }, (_, i) => [i * 0.15, 'tick', 0.6]).concat([[1.0, 'thump', 0.6]]),
    draw(t) {
      paper();
      kicker('มีนาคม 1990', TX, 420 * u, t);
      const d = ['13', '14', '15', '16', '17', '18'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.15), t, { size: 360 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('คืนหลังวันเซนต์แพทริก · บอสตัน', TX, 1240 * u, t - 1.0, { size: 52 * u, weight: 700 });
      finish(0.6);
    } },
  { from: bar(7), to: bar(9), cues: [[0, 'whoosh', 0.5], [2.5, 'thump', 0.5]],
    draw(t) {
      night('#070A12');
      // the palazzo: a four-storey block with arched windows
      const rise = spring(t, 'heavy'), bx = TX - 380 * u, by = 1350 * u - rise * 760 * u;
      g.fillStyle = '#16202E'; g.fillRect(bx, by, 760 * u, 900 * u);
      for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) {
        const x = bx + 60 * u + c * 140 * u, y = by + 60 * u + r * 170 * u, lit = hash(r * 5 + c, 3) < 0.15;
        g.fillStyle = lit ? '#E9C66B' : '#0B1018'; g.beginPath(); g.moveTo(x, y + 110 * u); g.lineTo(x, y + 30 * u); g.arc(x + 40 * u, y + 30 * u, 40 * u, Math.PI, 0); g.lineTo(x + 80 * u, y + 110 * u); g.fill();
      }
      g.fillStyle = '#05070C'; g.fillRect(0, 1350 * u, W, H - 1350 * u);
      kicker('Isabella Stewart Gardner Museum', TX, 300 * u, t, { color: C.red });
      say('คฤหาสน์สไตล์เวนิส กลางบอสตัน', TX, 400 * u, t - 0.3, { size: 52 * u, weight: 800, color: C.cream });
      say('เจ้าของสั่งไว้ในพินัยกรรม:\nห้ามเปลี่ยนแปลงสิ่งใดในพิพิธภัณฑ์', TX, 1450 * u, t - 2.5, { size: 44 * u, weight: 700, color: C.cream });
      finish();
    } },
  { from: bar(9), to: bar(11), cues: [[0.2, 'thump', 0.5], [0.6, 'thump', 0.5], [1.25, 'click', 0.9]],
    draw(t) {
      night('#070A12');
      g.fillStyle = '#16202E'; g.fillRect(0, 0, W, 1350 * u);
      g.fillStyle = '#0B1018'; rrect(g, TX - 170 * u, 640 * u, 340 * u, 710 * u, 10 * u); g.fill();
      g.fillStyle = C.fog; rrect(g, TX + 200 * u, 860 * u, 70 * u, 110 * u, 10 * u); g.fill();
      [-1, 1].forEach((sd, i) => { const s = spring(t - 0.2 - i * 0.4, 'default'); officer(TX + sd * 110 * u + (1 - s) * sd * 600 * u, 1340 * u, 200 * u, '#04060B'); });
      g.fillStyle = '#05070C'; g.fillRect(0, 1350 * u, W, H - 1350 * u);
      kicker('01:24', TX, 300 * u, t, { color: C.red });
      say('ชาย 2 คนในชุดตำรวจ กดกริ่งประตูข้าง', TX, 400 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.cream });
      say('“เราได้รับแจ้งว่ามีเหตุวุ่นวาย”', TX, 1500 * u, t - 1.25, { size: 52 * u, weight: 400, family: SERIF, color: C.cream });
      finish();
    } },
  { from: bar(11), to: bar(11) + 6 * BEAT, cues: [[0.3, 'click', 0.9], [1.25, 'thump', 0.7]],
    draw(t) {
      night(C.night2);
      // guard desk monitor + the buzzer button
      g.fillStyle = '#1B2333'; rrect(g, TX - 380 * u, 600 * u, 760 * u, 460 * u, 18 * u); g.fill();
      g.fillStyle = '#0A0F18'; rrect(g, TX - 340 * u, 640 * u, 680 * u, 380 * u, 10 * u); g.fill();
      officer(TX - 90 * u, 1010 * u, 120 * u, '#31405A'); officer(TX + 90 * u, 1010 * u, 120 * u, '#31405A');
      for (let i = 0; i < 18; i++) { g.fillStyle = 'rgba(200,210,230,0.05)'; g.fillRect(TX - 340 * u, 640 * u + i * 21 * u + ((t * 80 * u) % (21 * u)), 680 * u, 3 * u); }
      const p = spring(t - 0.3, 'snappy');
      g.fillStyle = C.red; g.beginPath(); g.arc(TX, 1200 * u + p * 6 * u, 64 * u, 0, 7); g.fill();
      say('เจ้าหน้าที่ รปภ. วัย 23 กดเปิดประตูให้', TX, 360 * u, t - 0.1, { size: 50 * u, weight: 800, color: C.cream });
      say('ผิดกฎของพิพิธภัณฑ์', TX, 1420 * u, t - 1.25, { size: 56 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(11) + 6 * BEAT, to: bar(14), cues: [[0, 'thump', 0.6], [1.25, 'impact', 0.9]],
    draw(t) {
      night('#06080D');
      // basement pipes and two seated figures
      g.strokeStyle = '#2B3344'; g.lineWidth = 34 * u; for (const y of [560, 640]) { g.beginPath(); g.moveTo(0, y * u); g.lineTo(W, y * u); g.stroke(); }
      g.lineWidth = 30 * u; for (const x of [300, 780]) { g.beginPath(); g.moveTo(x * u, 560 * u); g.lineTo(x * u, 1300 * u); g.stroke(); }
      [300, 780].forEach((x, i) => { const s = spring(t - 0.2 - i * 0.3, 'default'); person(x * u, 1180 * u, 120 * u * s, C.fog);
        g.fillStyle = '#B9B3A2'; g.fillRect(x * u - 70 * u * s, 980 * u, 140 * u * s, 26 * u); });
      kicker('ภายในไม่กี่นาที', TX, 330 * u, t, { color: C.red });
      say('รปภ. 2 คน ถูกใส่กุญแจมือ\nพันเทปที่หัว มัดไว้ในห้องใต้ดิน', TX, 1380 * u, t - 0.6, { size: 48 * u, weight: 800, color: C.cream });
      finish();
    } },
  // ---------------- Chapter 3 — upstairs
  { from: bar(14), to: bar(16), cues: [[0.2, 'swish', 0.5], [1.25, 'thump', 0.6], [2.5, 'click', 0.7]],
    draw(t) {
      paper();
      kicker('81 นาทีต่อจากนี้', TX, 330 * u, t);
      // a big clock face counting from 1:24
      const m = 84 + track(t, [[0, 0], [0.3, 30]], 'heavy');
      g.save(); g.translate(TX, 860 * u);
      g.fillStyle = C.ink; g.beginPath(); g.arc(0, 0, 300 * u, 0, 7); g.fill();
      for (let i = 0; i < 12; i++) { g.save(); g.rotate(i * Math.PI / 6); g.fillStyle = C.paper; g.fillRect(-3 * u, -280 * u, 6 * u, (i % 3 ? 20 : 40) * u); g.restore(); }
      g.strokeStyle = C.red; g.lineWidth = 30 * u; g.beginPath(); g.arc(0, 0, 230 * u, -Math.PI / 2 + (84 % 60) / 60 * Math.PI * 2, -Math.PI / 2 + (m % 60) / 60 * Math.PI * 2 + (m >= 120 ? Math.PI * 2 : 0)); g.stroke();
      const hand = (a, len, w, c) => { g.save(); g.rotate(a); g.fillStyle = c; rrect(g, -w / 2, -len, w, len + 14 * u, w / 2); g.fill(); g.restore(); };
      hand((m / 720) * Math.PI * 2, 160 * u, 16 * u, C.paper); hand((m / 60) * Math.PI * 2, 250 * u, 9 * u, C.red);
      g.restore();
      say('ขโมยขึ้นไปชั้นบน', TX, 1360 * u, t - 1.25, { size: 60 * u, weight: 800 });
      say('ไม่รีบร้อน ราวกับรู้ว่าไม่มีใครมาแน่', TX, 1470 * u, t - 2.5, { size: 46 * u, weight: 600, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(16), to: bar(19), cues: [[0.2, 'whoosh', 0.5], [1.5, 'pop', 0.7], [3.0, 'riser', 0.5], [4.4, 'impact', 0.9]],
    draw(t) {
      wall();
      frame(TX, 820 * u, 620 * u, 780 * u, { inner: (w, h) => { stormPainting(w, h, t); if (t > 3.0) cutCanvas(w - 30 * u, h - 30 * u, remap(t, 3.0, 4.4)); } });
      kicker('Dutch Room · ชั้น 2', TX, 280 * u, t, { color: C.red });
      say('Rembrandt · พายุบนทะเลกาลิลี', TX, 380 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      say('ภาพทะเลภาพเดียวที่เขาเคยวาด', TX, 1330 * u, t - 1.5, { size: 48 * u, weight: 700, color: C.cream });
      say('ถูกกรีดออกจากกรอบ', TX, 1440 * u, t - 4.4, { size: 56 * u, weight: 800, color: C.red });
      text(g, '* ภาพประกอบจำลอง', TX, 1560 * u, { size: 28 * u, weight: 500, family: THAI, color: C.fog, alpha: 0.7 });
      finish(0.8);
    } },
  { from: bar(19), to: bar(22), cues: [[0.2, 'whoosh', 0.5], [1.5, 'pop', 0.7], [4.4, 'thump', 0.8]],
    draw(t) {
      wall();
      const s = spring(t - 4.2, 'snappy');
      frame(TX, 820 * u, 640 * u, 600 * u, { inner: (w, h) => { if (t < 4.4) concertPainting(w, h); } });
      if (t >= 4.4) { g.save(); g.translate(TX, 820 * u - (t - 4.4) * 1200 * u); g.rotate((t - 4.4) * 0.5); g.globalAlpha = clamp(1 - (t - 4.4) * 2); g.beginPath(); g.rect(-262 * u, -242 * u, 524 * u, 484 * u); g.clip(); concertPainting(524 * u, 484 * u); g.restore(); }
      kicker('Dutch Room · ชั้น 2', TX, 280 * u, t, { color: C.red });
      say('Vermeer · The Concert', TX, 380 * u, t - 0.2, { size: 56 * u, weight: 800, color: C.cream });
      say('ภาพของ Vermeer ทั้งโลก มีอยู่ราว 34 ภาพ', TX, 1260 * u, t - 1.5, { size: 46 * u, weight: 700, color: C.cream });
      say('ภาพนี้ อาจเป็นภาพวาดที่ถูกขโมย\nซึ่งมีมูลค่าสูงที่สุดในโลก', TX, 1380 * u, t - 3.0, { size: 46 * u, weight: 800, color: C.red });
      text(g, '* ภาพประกอบจำลอง', TX, 1580 * u, { size: 28 * u, weight: 500, family: THAI, color: C.fog, alpha: 0.7 });
      finish(0.8);
    } },
];
