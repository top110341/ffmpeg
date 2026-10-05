// Act 2 — the turn, the pings, the search (0:55–2:05, bars 22–50).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, pin, path, planeTop, rrect, text, typewriter, topScrim, shake, proj } from './kit.js';
import { mapAsia, radar, sea, satellite, arcPts } from './props.js';
import { PLACE } from './geo.js';

const TURN = [PLACE.igari, [7.2, 103.2], [6.3, 101.8], [5.6, 100.8], PLACE.penang, [5.8, 99.2], [6.3, 98.0], PLACE.lastRadar];

function clockFace(x, y, r, minutes) {
  g.save(); g.translate(x, y);
  g.fillStyle = C.night2; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill();
  g.strokeStyle = C.cream; g.lineWidth = 4 * u; g.beginPath(); g.arc(0, 0, r, 0, 7); g.stroke();
  for (let i = 0; i < 12; i++) { g.save(); g.rotate(i * Math.PI / 6); g.fillStyle = C.cream; g.fillRect(-2 * u, -r + 10 * u, 4 * u, (i % 3 ? 14 : 26) * u); g.restore(); }
  const hand = (a, len, w, c) => { g.save(); g.rotate(a); g.fillStyle = c; rrect(g, -w / 2, -len, w, len + 12 * u, w / 2); g.fill(); g.restore(); };
  hand((minutes / 720) * Math.PI * 2, r * 0.55, 10 * u, C.cream); hand((minutes / 60) * Math.PI * 2, r * 0.82, 6 * u, C.red);
  g.restore();
}

export default () => [
  // ---------------- Chapter 4 — gone dark, then the turn
  { from: bar(22), to: bar(24), cues: [[0.2, 'click', 0.4], [1.25, 'impact', 1.0]],
    draw(t) {
      night();
      const alive = t < 1.25 ? 1 : 0;
      radar(TX, 760 * u, 380 * u, t + 0.4, [{ x: 140 * u, y: -60 * u, label: 'MH370', alive }]);
      kicker('01:21', TX, 270 * u, t, { color: C.red });
      say('ทรานสปอนเดอร์ถูกปิด', TX, 1300 * u, t - 1.25, { size: 66 * u, weight: 800, color: C.cream });
      say('เครื่องหายไปจากจอเรดาร์พลเรือน', TX, 1410 * u, t - 1.9, { size: 46 * u, weight: 600, color: C.fog });
      finish();
    } },
  { from: bar(24), to: bar(27), cues: [[0.2, 'whoosh', 0.6], ...Array.from({ length: 10 }, (_, i) => [0.6 + i * 0.5, 'tick', 0.4])],
    draw(t) {
      const cam = { lat: 6.2, lon: 100.6, z: 205 * u };
      const P = mapAsia(cam); topScrim();
      const pts = TURN.map(P), p = remap(t, 0.5, 6.5);
      // radar returns: discrete blips along the track, as the military radar saw it
      const N = 26;
      for (let i = 0; i <= N; i++) {
        const f = i / N; if (f > p) break;
        const q = path(pts, f, { width: 0 });
        g.fillStyle = C.red; g.globalAlpha = 0.35 + 0.65 * (f / Math.max(p, 0.01)); g.beginPath(); g.arc(q.x, q.y, 7 * u, 0, 7); g.fill(); g.globalAlpha = 1;
      }
      const h = path(pts, p, { width: 0 });
      planeTop(h.x, h.y, 55 * u, h.ang + Math.PI / 2, C.cream);
      pin(...P(PLACE.penang), t - 3.6, { label: 'ปีนัง', side: 1, color: C.fog });
      kicker('แต่เรดาร์ทหารยังมองเห็น', TX, 250 * u, t, { color: C.red });
      say('เครื่องเลี้ยวกลับ บินข้ามคาบสมุทร', TX, 345 * u, t - 0.3, { size: 52 * u, weight: 800, color: C.cream });
      say('ไปทางตะวันตก สวนทางกับปลายทาง', TX, 1500 * u, t - 3.75, { size: 46 * u, weight: 700, color: C.cream });
      finish(0.8);
    } },
  { from: bar(27), to: bar(29), cues: [[0, 'tick', 0.6], [1.25, 'pop', 0.8]],
    draw(t) {
      const cam = { lat: 6.2, lon: 98.6, z: track(t, [[0, 205], [0.05, 330]], 'heavy') * u };
      const P = mapAsia(cam); topScrim();
      path(TURN.map(P), 1, { color: C.red, width: 4 * u, dash: [10 * u, 10 * u] });
      pin(...P(PLACE.lastRadar), t - 1.25, { label: 'จุดสุดท้าย', side: -1 });
      kicker('02:22 · ทะเลอันดามัน', TX, 250 * u, t, { color: C.red });
      say('ครั้งสุดท้ายที่มีคนเห็นเครื่องบินลำนี้', TX, 345 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.cream });
      clockFace(TX, 1330 * u, 120 * u, 2 * 60 + 22);
      finish(0.8);
    } },
  { from: bar(29), to: bar(32), cues: [[0, 'whoosh', 0.4], [3.75, 'thump', 0.6]],
    draw(t) {
      night('#04070D');
      radar(TX, 760 * u, 380 * u, t, []);
      say('จากนั้น ทุกอย่างมืดสนิท', TX, 1300 * u, t - 0.3, { size: 66 * u, weight: 800, color: C.cream });
      say('ไม่มีวิทยุ ไม่มีเรดาร์\nไม่มีใครรู้ว่าบินไปทางไหน', TX, 1420 * u, t - 2.5, { size: 46 * u, weight: 600, color: C.fog });
      finish();
    } },
  // ---------------- Chapter 5 — the satellite handshakes
  { from: bar(32), to: bar(34), cues: [[0.3, 'whoosh', 0.5], [2.5, 'chime', 0.5]],
    draw(t) {
      night('#04070D');
      // earth limb
      const ey = track(t, [[0, 2600 * u], [0.05, 2050 * u]], 'heavy');
      g.fillStyle = C.night3; g.beginPath(); g.arc(TX, ey, 1300 * u, 0, 7); g.fill();
      g.strokeStyle = C.fog; g.globalAlpha = 0.5; g.lineWidth = 3 * u; g.stroke(); g.globalAlpha = 1;
      for (let i = 0; i < 80; i++) { g.fillStyle = C.cream; g.globalAlpha = 0.25 + hash(i, 4) * 0.5; g.fillRect(hash(i, 1) * W, hash(i, 2) * 600 * u, 2 * u, 2 * u); }
      g.globalAlpha = 1;
      const sy = track(t, [[0, -200 * u], [0.3, 620 * u]], 'heavy');
      satellite(TX, sy, 200 * u, noise(t * 0.5, 2) * 0.05);
      kicker('แต่ยังมีบางอย่างที่ทำงานอยู่', TX, 250 * u, t, { color: C.red });
      say('ดาวเทียม Inmarsat', TX, 1000 * u, t - 2.5, { size: 72 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(34), to: bar(37), cues: Array.from({ length: 7 }, (_, i) => [0.4 + i * 0.9, 'pop', 0.7]),
    draw(t) {
      night(C.night2);
      say('ทุกชั่วโมง เครื่องบินตอบสัญญาณ\nว่า “ยังเชื่อมต่ออยู่”', TX, 330 * u, t - 0.1, { size: 52 * u, weight: 800, color: C.cream });
      const T = ['02:25', '03:41', '04:41', '05:41', '06:41', '08:10', '08:19'];
      const y0 = 650 * u;
      g.strokeStyle = C.fog; g.lineWidth = 3 * u; g.beginPath(); g.moveTo(TX - 330 * u, y0); g.lineTo(TX - 330 * u, y0 + 6 * 125 * u); g.stroke();
      T.forEach((s, i) => {
        const at = 0.4 + i * 0.9, p = spring(t - at, 'playful'); if (p <= 0) return;
        const y = y0 + i * 125 * u, last = i === 6;
        g.fillStyle = last ? C.red : C.cream; g.beginPath(); g.arc(TX - 330 * u, y, 18 * u * p, 0, 7); g.fill();
        const ring = clamp((t - at) / 0.7);
        if (ring < 1) { g.strokeStyle = last ? C.red : C.cream; g.globalAlpha = 1 - ring; g.beginPath(); g.arc(TX - 330 * u, y, 18 * u + ring * 60 * u, 0, 7); g.stroke(); g.globalAlpha = 1; }
        text(g, s, TX - 270 * u, y + 20 * u, { size: 56 * u, weight: 400, family: SERIF, color: last ? C.red : C.cream, align: 'left', alpha: clamp((t - at) / 0.15) });
        text(g, `ครั้งที่ ${i + 1}`, TX + 330 * u, y + 16 * u, { size: 36 * u, weight: 600, family: THAI, color: C.fog, align: 'right', alpha: clamp((t - at) / 0.15) });
      });
      finish(0.8);
    } },
  { from: bar(37), to: bar(40), cues: Array.from({ length: 7 }, (_, i) => [0.4 + i * 0.5, 'tick', 0.5]).concat([[5.0, 'thump', 0.6]]),
    draw(t) {
      const cam = { lat: track(t, [[0, 5], [0.1, -14]], 'heavy'), lon: track(t, [[0, 98], [0.1, 88]], 'heavy'), z: track(t, [[0, 120], [0.1, 34]], 'heavy') * u };
      const P = mapAsia(cam); topScrim(620);
      for (let i = 1; i <= 7; i++) {
        const at = 0.4 + (i - 1) * 0.5, p = remap(t, at, at + 0.6); if (p <= 0) continue;
        path(arcPts(i).map(P), p, { color: i === 7 ? C.red : C.fog, width: (i === 7 ? 6 : 3) * u });
      }
      path(TURN.map(P), 1, { color: C.red, width: 3 * u });
      satellite(...P(PLACE.sat), 70 * u);
      kicker('สัญญาณแต่ละครั้งบอกได้แค่ระยะห่าง', TX, 250 * u, t, { color: C.red });
      say('เครื่องบินอยู่ที่ไหนสักแห่ง\nบนเส้นโค้งเหล่านี้', TX, 345 * u, t - 0.3, { size: 52 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(40), to: bar(42), cues: [[0, 'impact', 0.8], [2.5, 'thump', 0.6]],
    draw(t) {
      const cam = { lat: -22, lon: 88, z: 34 * u };
      const P = mapAsia(cam); topScrim(620);
      path(arcPts(7).map(P), 1, { color: C.red, width: 8 * u });
      for (let i = 1; i <= 6; i++) { g.globalAlpha = 0.35; path(arcPts(i).map(P), 1, { color: C.fog, width: 2 * u }); g.globalAlpha = 1; }
      // fuel gauge
      g.save(); g.translate(TX, 1330 * u);
      g.fillStyle = C.night2; rrect(g, -260 * u, -50 * u, 520 * u, 100 * u, 50 * u); g.fill();
      const f = 1 - clamp(spring(t - 0.2, 60, 16));
      g.fillStyle = f > 0.08 ? C.cream : C.red; rrect(g, -250 * u, -40 * u, Math.max(40 * u, 500 * u * f), 80 * u, 40 * u); g.fill();
      g.restore();
      text(g, 'น้ำมัน', TX, 1250 * u, { size: 38 * u, weight: 700, family: THAI, color: C.fog });
      kicker('08:19 · สัญญาณครั้งที่ 7 · ครั้งสุดท้าย', TX, 250 * u, t, { color: C.red });
      say('“เส้นโค้งที่ 7” มหาสมุทรอินเดียตอนใต้', TX, 345 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.cream });
      say('น้ำมันน่าจะหมดลงตรงนี้', TX, 1480 * u, t - 2.5, { size: 52 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- Chapter 6 — the search
  { from: bar(42), to: bar(44), cues: [[0, 'whoosh', 0.8], [2.5, 'thump', 0.7]],
    draw(t) {
      night('#030913');
      const depth = track(t, [[0, 0], [0.2, 1]], 60, 15);
      const top = 300 * u - depth * 200 * u;
      sea(t, top, { rows: 4, alpha: 0.4 });
      // seabed
      g.fillStyle = C.night3; g.beginPath(); g.moveTo(0, H);
      for (let x = 0; x <= W; x += 20 * u) g.lineTo(x, top + 80 * u + 4 * 230 * u + noise(x / (120 * u), 2) * 60 * u);
      g.lineTo(W, H); g.fill();
      // water column + depth ruler
      for (let i = 0; i <= 5; i++) {
        const y = top + 80 * u + i * 230 * u;
        g.fillStyle = C.fog; g.fillRect(100 * u, y, 40 * u, 3 * u);
        text(g, `${i} กม.`, 160 * u, y + 14 * u, { size: 34 * u, weight: 700, family: THAI, color: C.fog, align: 'left' });
      }
      const y2 = say('ก้นทะเลลึก\nราว 4 กิโลเมตร', 330 * u, 720 * u, t - 0.6, { size: 64 * u, weight: 800, color: C.cream, align: 'left', maxW: 640 * u });
      say('มืดสนิท หนาวจัด\nแทบไม่เคยมีใครสำรวจ', 330 * u, y2 + 20 * u, t - 2.5, { size: 44 * u, weight: 600, color: C.fog, align: 'left', maxW: 640 * u });
      finish();
    } },
  { from: bar(44), to: bar(46), cues: Array.from({ length: 10 }, (_, i) => [0.2 + i * 0.3, 'tick', 0.35]).concat([[3.6, 'pop', 0.6]]),
    draw(t) {
      const cam = { lat: -34.5, lon: 95, z: 150 * u };
      const P = mapAsia(cam); topScrim(620);
      path(arcPts(7, 1.9, 2.6).map(P), 1, { color: C.red, width: 5 * u });
      // swept strips along the arc
      const pts = arcPts(7, 2.05, 2.5, 30);
      pts.forEach((p, i) => {
        const at = 0.2 + i * 0.1, q = clamp((t - at) / 0.25); if (q <= 0) return;
        const [x, y] = P(p);
        g.fillStyle = C.fog; g.globalAlpha = 0.28 * q; g.save(); g.translate(x, y); g.rotate(0.5); g.fillRect(-150 * u, -16 * u, 300 * u, 32 * u); g.restore(); g.globalAlpha = 1;
      });
      const n = Math.round(120000 * clamp(spring(t - 0.2, 30, 11) * 1.004));
      text(g, `${n.toLocaleString('en-US')} ตร.กม.`, TX, 1330 * u, { size: 110 * u, weight: 400, family: SERIF, color: C.cream });
      kicker('2014 – 2017', TX, 250 * u, t, { color: C.red });
      say('การค้นหาใต้ทะเลครั้งใหญ่ที่สุด\nในประวัติศาสตร์การบิน', TX, 345 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(46), to: bar(48), cues: [[0.1, 'thump', 0.6], [1.25, 'impact', 1.1]],
    draw(t) {
      const [sx, sy] = shake(t, 1.25, 22); g.translate(sx, sy);
      paper();
      kicker('มกราคม 2017', TX, 420 * u, t);
      say('ไม่พบเครื่องบิน แม้แต่ชิ้นเดียว', TX, 640 * u, t - 0.2, { size: 62 * u, weight: 800 });
      stamp('SUSPENDED', TX, 960 * u, t - 1.25, { size: 140 * u, rot: -0.08 });
      say('ยุติการค้นหา', TX, 1260 * u, t - 1.9, { size: 56 * u, weight: 700, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(48), to: bar(50), cues: [[0.1, 'type', 0.5], [2.5, 'thump', 0.6], [2.7, 'type', 0.5]],
    draw(t) {
      paper();
      kicker('2018', TX, 330 * u, t);
      say('บริษัทเอกชน Ocean Infinity\nค้นอีกรอบ · ไม่พบ', TX, 460 * u, t - 0.1, { size: 54 * u, weight: 800 });
      // report page
      const s = spring(t - 2.3, 'default');
      g.save(); g.translate(TX, 1100 * u + (1 - s) * 600 * u); g.rotate(-0.03);
      g.fillStyle = '#F7F1E3'; rrect(g, -340 * u, -260 * u, 680 * u, 520 * u, 6 * u); g.fill();
      text(g, 'SAFETY INVESTIGATION REPORT', 0, -180 * u, { size: 32 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 2 * u });
      g.fillStyle = C.paper3; for (let i = 0; i < 5; i++) g.fillRect(-280 * u, -120 * u + i * 40 * u, (480 - (i % 2) * 120) * u, 10 * u);
      typewriter('ระบุสาเหตุไม่ได้', -280 * u, 150 * u, t - 2.7, { size: 64 * u, weight: 800, color: C.red, cps: 14 });
      g.restore();
      finish(0.6);
    } },
];
