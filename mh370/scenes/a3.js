// Act 3 — debris, theories, the search goes on (2:05–3:00, bars 50–72). Ends on the radar it opened with.
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, pin, path, rrect, text, typewriter, topScrim, shake } from './kit.js';
import { mapAsia, radar, sea, flaperon, arcPts } from './props.js';
import { PLACE } from './geo.js';

const DEBRIS = [[-6.5, 39.6], [-11.5, 40.6], [-19.5, 35.2], [-24.4, 35.6], [-33.8, 25.8], [-17.0, 49.9], [-21.0, 48.5], [-25.0, 46.9], [-20.2, 57.5], [-21.1, 55.5]];

export default () => [
  // ---------------- Chapter 7 — the ocean gives something back
  { from: bar(50), to: bar(51), cues: [[0, 'tick', 0.6], [0.3, 'tick', 0.6], [1.1, 'chime', 0.4]],
    draw(t) {
      paper();
      const dw = 170 * u, x0 = TX - 1.5 * (dw + 14 * u);
      for (let d = 0; d < 4; d++) flip(x0 + d * (dw + 14 * u), 820 * u, dw, 250 * u, ['2014'[d], '2015'[d]], [0, 0.3], t, { size: 190 * u });
      kicker('16 เดือนต่อมา', TX, 560 * u, t);
      say('29 กรกฎาคม 2015', TX, 1100 * u, t - 0.9, { size: 64 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(51), to: bar(53), cues: [[0.2, 'whoosh', 0.5], [2.5, 'pop', 0.9]],
    draw(t) {
      const cam = { lat: track(t, [[0, -28], [0.1, -21]], 'heavy'), lon: track(t, [[0, 80], [0.1, 52]], 'heavy'), z: track(t, [[0, 22], [0.1, 55]], 'heavy') * u };
      const P = mapAsia(cam, { land: C.paper2, water: '#D9CFB8', line: C.inkSoft }); topScrim(560, '239,230,210', 0.92);
      pin(...P(PLACE.reunion), t - 2.5, { label: 'เกาะเรอูนียง', labelColor: C.red, side: 1 });
      kicker('มหาสมุทรอินเดียฝั่งตะวันตก', TX, 250 * u, t);
      say('มีชิ้นส่วนหนึ่งลอยมาเกยฝั่ง', TX, 350 * u, t - 0.3, { size: 56 * u, weight: 800 });
      say('ห่างจากจุดค้นหาราว 4,000 กม.', TX, 1500 * u, t - 3.0, { size: 46 * u, weight: 700, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(53), to: bar(55) + 2 * BEAT, cues: [[0, 'whoosh', 0.5], [3.75, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 3.75, 18); g.translate(sx, sy);
      paper();
      g.fillStyle = C.paper3; g.fillRect(0, 1050 * u, W, H - 1050 * u);
      sea(t, 1000 * u, { rows: 6, alpha: 0.35, color: C.inkSoft });
      const s = track(t, [[0, 0.7], [0.1, 1]], 'heavy');
      flaperon(TX, 860 * u + Math.sin(t * 1.4) * 10 * u, 400 * u * s, -0.06 + Math.sin(t) * 0.02, '#E9E3D2', { barnacles: 1 });
      kicker('แฟลเปอรอน · ชิ้นส่วนปีก', TX, 330 * u, t);
      say('ยาวราว 2 เมตร เต็มไปด้วยเพรียง', TX, 440 * u, t - 0.4, { size: 50 * u, weight: 800 });
      stamp('MH370', TX + 40 * u, 1250 * u, t - 3.75, { size: 150 * u, rot: -0.1 });
      say('ยืนยันแล้ว: มาจากเครื่องลำนี้', TX, 1500 * u, t - 4.2, { size: 50 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(55) + 2 * BEAT, to: bar(58), cues: DEBRIS.map((_, i) => [1.0 + i * 0.22, 'pop', 0.4]),
    draw(t) {
      const cam = { lat: -20, lon: 66, z: 20 * u };
      const P = mapAsia(cam, { land: C.paper2, water: '#D9CFB8', line: C.inkSoft }); topScrim(600, '239,230,210', 0.92);
      g.save(); g.globalAlpha = 0.9; path(arcPts(7, 2.0, 2.7).map(P), 1, { color: C.red, width: 5 * u }); g.restore();
      // drift arrows from the arc westwards
      for (let i = 0; i < 6; i++) {
        const p = remap(t, 0.2 + i * 0.08, 1.6 + i * 0.08), a = P([-30 + i * 2.5, 92 - i]), b = P([-22 + i * 1.5, 52 + i * 1.5]);
        const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + 60 * u];
        g.save(); g.strokeStyle = C.inkSoft; g.globalAlpha = 0.5; g.lineWidth = 3 * u; g.setLineDash([10 * u, 10 * u]);
        g.beginPath(); g.moveTo(...a);
        const q = (k) => [(1 - k) ** 2 * a[0] + 2 * (1 - k) * k * mid[0] + k * k * b[0], (1 - k) ** 2 * a[1] + 2 * (1 - k) * k * mid[1] + k * k * b[1]];
        for (let k = 0; k <= p; k += 0.05) g.lineTo(...q(k));
        g.stroke(); g.restore();
      }
      DEBRIS.forEach((d, i) => { const s = spring(t - 1.0 - i * 0.22, 'playful'); if (s <= 0) return; const [x, y] = P(d);
        g.fillStyle = C.red; g.beginPath(); g.arc(x, y, 14 * u * s, 0, 7); g.fill(); });
      kicker('2015 – 2017', TX, 250 * u, t);
      say('พบเศษชิ้นส่วนกว่า 30 ชิ้น\nตามชายฝั่งแอฟริกาและหมู่เกาะ', TX, 345 * u, t - 0.2, { size: 50 * u, weight: 800 });
      say('ยืนยันแน่ชัดว่าเป็นของ MH370: 3 ชิ้น', TX, 1500 * u, t - 2.6, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- Chapter 8 — what happened?
  { from: bar(58), to: bar(60), cues: [[0.1, 'pop', 0.4], [0.35, 'pop', 0.4], [0.6, 'pop', 0.4], [0.85, 'pop', 0.4], [1.6, 'swish', 0.5]],
    draw(t) {
      paper();
      g.fillStyle = C.paper2; g.fillRect(60 * u, 470 * u, W - 120 * u, 1000 * u);
      const nodes = [['นักบินจงใจ?', 250, 640], ['ถูกจี้?', 760, 700], ['ไฟไหม้ /\nขาดออกซิเจน?', 300, 1060], ['ระบบถูกปิด\nทีละอย่าง', 760, 1150], ['?', 520, 1340]];
      const links = [[0, 4], [1, 4], [2, 4], [3, 4], [0, 3], [1, 3]];
      g.strokeStyle = C.red; g.lineWidth = 4 * u;
      links.forEach(([a, b], i) => {
        const p = remap(t, 1.4 + i * 0.15, 1.7 + i * 0.15); if (p <= 0) return;
        const [, ax, ay] = nodes[a], [, bx, by] = nodes[b];
        g.beginPath(); g.moveTo(ax * u, ay * u); g.lineTo((ax + (bx - ax) * p) * u, (ay + (by - ay) * p) * u); g.stroke();
      });
      nodes.forEach(([a, x, y], i) => {
        const s = spring(t - 0.1 - i * 0.25, 'playful'); if (s <= 0) return;
        g.save(); g.translate(x * u, y * u); g.rotate((hash(i, 61) - 0.5) * 0.12); g.scale(s, s);
        g.fillStyle = 'rgba(0,0,0,0.15)'; g.fillRect(-160 * u + 8 * u, -80 * u + 10 * u, 320 * u, 160 * u);
        g.fillStyle = '#F7F1E3'; g.fillRect(-160 * u, -80 * u, 320 * u, 160 * u);
        const lines = a.split('\n');
        lines.forEach((l, k) => text(g, l, 0, (a === '?' ? 40 : 14 - (lines.length - 1) * 24 + k * 48) * u,
          { size: a === '?' ? 110 * u : 40 * u, weight: a === '?' ? 400 : 800, family: a === '?' ? SERIF : THAI, color: a === '?' ? C.red : C.ink }));
        g.fillStyle = C.red; g.beginPath(); g.arc(0, -80 * u, 12 * u, 0, 7); g.fill();
        g.restore();
      });
      say('ทฤษฎีนับไม่ถ้วน', TX, 330 * u, t - 0.2, { size: 64 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(60), to: bar(63), cues: [[0.2, 'type', 0.5], [2.5, 'type', 0.5], [5.0, 'thump', 0.7]],
    draw(t) {
      paper();
      kicker('รายงานสอบสวนฉบับสุดท้าย · 2018', TX, 330 * u, t);
      const s = spring(t, 'default');
      g.save(); g.translate(TX, 900 * u + (1 - s) * 500 * u); g.rotate(-0.02);
      g.fillStyle = '#F7F1E3'; rrect(g, -400 * u, -400 * u, 800 * u, 800 * u, 6 * u); g.fill();
      typewriter('การเลี้ยวกลับ', -330 * u, -260 * u, t - 0.2, { size: 56 * u, weight: 800, color: C.ink, cps: 16 });
      typewriter('เกิดจากการบังคับด้วยมือ', -330 * u, -180 * u, t - 0.8, { size: 56 * u, weight: 800, color: C.ink, cps: 16 });
      typewriter('ไม่ใช่ระบบออโตไพลอต', -330 * u, -100 * u, t - 1.6, { size: 46 * u, weight: 600, color: C.inkSoft, cps: 16 });
      typewriter('ไม่ตัดความเป็นไปได้', -330 * u, 40 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.ink, cps: 16 });
      typewriter('ว่ามีบุคคลที่สามเข้าแทรกแซง', -330 * u, 115 * u, t - 3.1, { size: 50 * u, weight: 800, color: C.ink, cps: 16 });
      g.restore();
      stamp('ไม่ทราบใครทำ', TX, 1450 * u, t - 5.0, { size: 90 * u, rot: -0.06, family: THAI, weight: 800, pad: 0.25 });
      finish(0.6);
    } },
  { from: bar(63), to: bar(66), cues: [[0.2, 'whoosh', 0.5], ...Array.from({ length: 8 }, (_, i) => [0.6 + i * 0.4, 'tick', 0.35]), [5.0, 'impact', 1.0]],
    draw(t) {
      const cam = { lat: -33.5, lon: 95, z: 160 * u };
      const P = mapAsia(cam); topScrim(620);
      path(arcPts(7, 1.9, 2.6).map(P), 1, { color: C.red, width: 5 * u });
      // the auv sweep: lawnmower lines inside the new area
      const [cx, cy] = P(PLACE.search2025), p = remap(t, 0.5, 4.5);
      g.save(); g.translate(cx, cy); g.rotate(0.55); g.strokeStyle = C.cream; g.lineWidth = 3 * u; g.globalAlpha = 0.75;
      const rows = 12, w = 420 * u, hh = 300 * u; g.beginPath();
      for (let r = 0; r < rows; r++) { const f = r / rows; if (f > p) break; const y = -hh / 2 + (r / (rows - 1)) * hh; g.moveTo(r % 2 ? w / 2 : -w / 2, y); g.lineTo(r % 2 ? -w / 2 : w / 2, y); }
      g.stroke(); g.globalAlpha = 1; g.restore();
      const n = Math.round(7571 * clamp(spring(t - 0.5, 30, 11) * 1.004));
      text(g, `${n.toLocaleString('en-US')} ตร.กม.`, TX, 1300 * u, { size: 110 * u, weight: 400, family: SERIF, color: C.cream });
      kicker('มี.ค. 2025 – ม.ค. 2026', TX, 250 * u, t, { color: C.red });
      say('Ocean Infinity กลับมาค้นอีกครั้ง\nด้วยหุ่นยนต์ดำน้ำ', TX, 345 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.cream });
      if (t > 5.0) { g.fillStyle = 'rgba(10,16,28,0.6)'; g.fillRect(0, 1380 * u, W, 220 * u); }
      stamp('ไม่พบ', TX, 1470 * u, t - 5.0, { size: 110 * u, rot: -0.06, family: THAI, weight: 800, pad: 0.3 });
      finish(0.8);
    } },
  // ---------------- Chapter 9 — still out there
  { from: bar(66), to: bar(68), cues: [[0.1, 'thump', 0.6], [2.5, 'click', 0.8]],
    draw(t) {
      paper();
      kicker('สัญญา “ไม่พบ ไม่จ่าย”', TX, 380 * u, t);
      big('$70 ล้าน', TX, 700 * u, t - 0.2, { size: 200 * u, color: C.ink });
      say('จ่ายเฉพาะเมื่อพบซากเครื่องบิน', TX, 830 * u, t - 0.8, { size: 50 * u, weight: 700, color: C.inkSoft });
      const s = spring(t - 2.5, 'snappy');
      g.save(); g.globalAlpha = clamp((t - 2.5) / 0.1); g.translate(TX, 1180 * u); g.scale(0.9 + 0.1 * s, 0.9 + 0.1 * s);
      g.fillStyle = C.ink; rrect(g, -380 * u, -110 * u, 760 * u, 220 * u, 16 * u); g.fill();
      text(g, 'ต่อสัญญาค้นหาถึง', 0, -20 * u, { size: 44 * u, weight: 700, family: THAI, color: C.paper });
      text(g, 'มิถุนายน 2027', 0, 70 * u, { size: 76 * u, weight: 800, family: THAI, color: C.red });
      g.restore();
      finish(0.6);
    } },
  { from: bar(68), to: bar(70), cues: [[0, 'thump', 0.9], [2.5, 'swish', 0.4]],
    draw(t) {
      night('#08070A');
      big('MH370', TX, 880 * u, t, { size: 300 * u, color: C.cream });
      const p = spring(t - 0.7, 'default');
      g.fillStyle = C.red; g.fillRect(TX - 330 * u * p, 960 * u, 660 * u * p, 10 * u);
      say('239 ชีวิต', TX, 1150 * u, t - 1.0, { size: 72 * u, weight: 800, color: C.cream });
      say('ยังไม่ได้กลับบ้าน', TX, 1260 * u, t - 2.5, { size: 60 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(70), to: bar(72), cues: [[0, 'whoosh', 0.4], [2.5, 'chime', 0.8]],
    draw(t) {
      night();
      radar(TX, 720 * u, 360 * u, t, [{ x: 110 * u, y: -120 * u, label: '?', alive: 0.5 + 0.5 * Math.sin(t * 4) }]);
      say('ยังไม่มีใครรู้ว่ามันอยู่ที่ไหน', TX, 1260 * u, t - 0.3, { size: 58 * u, weight: 800, color: C.cream });
      say('คุณคิดว่าเกิดอะไรขึ้นกับ MH370?', TX, 1420 * u, t - 2.5, { size: 56 * u, weight: 800, color: C.red });
      finish();
    } },
];
