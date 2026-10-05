// Act 1 — cold open, departure, last words (0:00–0:55, bars 0–22).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, planeTop, rrect, text, typewriter, topScrim, shake } from './kit.js';
import { mapAsia, radar, sea, dot } from './props.js';
import { PLACE } from './geo.js';

const FL = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function board(row, x, y, t, t0, o = {}) {
  const { cw = 56 * u, ch = 80 * u, color = C.cream, bg = '#16161A', seed = 1 } = o;
  [...row].forEach((c, j) => {
    if (c === ' ') return;
    const n = 3 + Math.floor(hash(j, seed) * 5), vals = [], times = [];
    for (let k = 0; k <= n; k++) { vals.push(k === n ? c : FL[Math.floor(hash(j * 31 + k, seed + 7) * FL.length)]); times.push(t0 + j * 0.035 + k * 0.09); }
    flip(x + j * (cw + 6 * u), y, cw, ch, vals, times, t, { size: ch * 0.62, family: 'Inter, sans-serif', weight: 700, bg, fg: color, r: 6 * u });
  });
}

export default () => [
  // ---------------- Chapter 1 — cold open
  { from: bar(0), to: bar(2), cues: [[0, 'riser', 0.4], [1.0, 'impact', 0.9], [1.7, 'swish', 0.5]],
    draw(t) {
      night();
      const alive = t < 1.6 ? 1 : Math.max(0, 1 - (t - 1.6) / 0.08) * (Math.sin(t * 60) > 0 ? 1 : 0.2);
      radar(TX, 700 * u, 380 * u, t, [{ x: 110 * u, y: -120 * u, label: 'MH370', alive: t < 1.75 ? alive : 0 }]);
      big('239', TX, 1330 * u, t - 1.0, { size: 260 * u, color: C.red });
      say('ชีวิต หายไปพร้อมเครื่องบินทั้งลำ', TX, 1460 * u, t - 1.7, { size: 52 * u, weight: 700, color: C.cream });
      finish();
    } },
  { from: bar(2), to: bar(4), cues: [[0, 'whoosh', 0.7], [2.5, 'thump', 0.6]],
    draw(t) {
      night('#060B14');
      const horizon = track(t, [[0, 700 * u], [0.1, 300 * u]], 'heavy');
      sea(t, horizon, { rows: 16, alpha: 0.55 });
      const y = say('ไม่มีสัญญาณขอความช่วยเหลือ', TX, 1150 * u, t - 0.3, { size: 60 * u, weight: 800, color: C.cream });
      say('ไม่มีซาก · ไม่มีคำอธิบาย', TX, y + 30 * u, t - 2.5, { size: 54 * u, weight: 700, color: C.red });
      finish();
    } },
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1], [3.2, 'type', 0.4]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 420 * u, 90 * u, 14 * u); g.fill();
      text(g, 'MH370 · 08 MAR 2014', 280 * u, 472 * u, { size: 34 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 3 * u });
      g.restore();
      say('เครื่องบินโดยสารทั้งลำ', TX, 720 * u, t - 0.25, { size: 70 * u, weight: 800 });
      say('หายไปจากโลกนี้', TX, 820 * u, t - 0.6, { size: 70 * u, weight: 800 });
      stamp('MISSING', TX, 1110 * u, t - 2.5, { size: 160 * u, rot: -0.1 });
      say('12 ปีผ่านไป ยังไม่มีใครรู้ว่ามันอยู่ที่ไหน', TX, 1400 * u, t - 3.2, { size: 46 * u, weight: 600, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------- Chapter 2 — departure
  { from: bar(6), to: bar(7), cues: Array.from({ length: 8 }, (_, i) => [i * 0.14, 'tick', 0.6]).concat([[1.1, 'thump', 0.6]]),
    draw(t) {
      paper();
      kicker('มีนาคม 2014', TX, 420 * u, t);
      const days = ['01', '02', '03', '04', '05', '06', '07', '08'];
      flip(TX, 820 * u, 460 * u, 540 * u, days, days.map((_, i) => i * 0.14), t, { size: 360 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('คืนวันศุกร์ เลยเที่ยงคืนไปไม่นาน', TX, 1240 * u, t - 1.1, { size: 52 * u, weight: 700 });
      finish(0.6);
    } },
  { from: bar(7), to: bar(9), cues: [[0, 'swish', 0.5], ...Array.from({ length: 10 }, (_, i) => [0.15 + i * 0.09, 'tick', 0.35])],
    draw(t) {
      night('#0E0F14');
      kicker('สนามบินนานาชาติกัวลาลัมเปอร์', TX, 300 * u, t, { color: C.red });
      const x0 = TX - 7 * 62 * u + 28 * u;
      board('DEPARTURES', x0, 470 * u, t, 0.1, { color: C.fog, seed: 2 });
      board('MALAYSIA', x0, 640 * u, t, 0.3, { seed: 3 });
      board('FLIGHT MH370', x0, 740 * u, t, 0.45, { seed: 4 });
      board('TO BEIJING', x0, 840 * u, t, 0.6, { seed: 5 });
      board('DEP 00:41', x0, 940 * u, t, 0.75, { seed: 6, color: '#E8B04A' });
      say('กัวลาลัมเปอร์ → ปักกิ่ง', TX, 1220 * u, t - 1.3, { size: 64 * u, weight: 800, color: C.cream });
      say('Boeing 777 · กำหนดถึงปักกิ่ง 06:30', TX, 1330 * u, t - 2.6, { size: 46 * u, weight: 500, color: C.fog });
      finish(0.8);
    } },
  { from: bar(9), to: bar(11), cues: [[0.2, 'riser', 0.3], [1.9, 'pop', 0.7], [2.5, 'thump', 0.6]],
    draw(t) {
      night(C.night2);
      const cols = 20, s = 38 * u, gap = 7 * u, x0 = TX - (cols * (s + gap)) / 2 + s / 2, y0 = 480 * u;
      for (let i = 0; i < 239; i++) {
        const at = 0.1 + i * 0.007, p = spring(t - at, 'snappy'); if (p <= 0) continue;
        const crew = i >= 227, c = i % cols, r = Math.floor(i / cols);
        g.save(); g.translate(x0 + c * (s + gap), y0 + r * (s + gap)); g.scale(p, p);
        dot(0, 0, s * 0.9, crew ? C.red : C.cream); g.restore();
      }
      const n = Math.round(239 * clamp(spring(t - 0.1, 30, 11) * 1.004));
      text(g, String(n), TX, 1350 * u, { size: 170 * u, weight: 400, family: SERIF, color: C.cream });
      say('ผู้โดยสาร 227 · ลูกเรือ 12', TX, 1460 * u, t - 1.9, { size: 50 * u, weight: 800, color: C.cream });
      say('จาก 14 ประเทศ · ชาวจีน 153 คน', TX, 330 * u, t - 2.5, { size: 46 * u, weight: 600, color: C.fog });
      finish(0.8);
    } },
  { from: bar(11), to: bar(11) + 6 * BEAT, cues: [[0, 'whoosh', 0.6], [0.2, 'pop', 0.5]],
    draw(t) {
      const cam = { lat: 5.2, lon: 103.2, z: 150 * u };
      const P = mapAsia(cam); topScrim();
      pin(...P(PLACE.kul), t - 0.2, { label: 'กัวลาลัมเปอร์', side: -1 });
      const pts = [P(PLACE.kul), P([5.5, 103.0]), P(PLACE.igari), P([10.5, 106.8]), P([16, 109.5])];
      const h = path(pts, remap(t, 0.4, 3.6) * 0.62, { color: C.red, width: 5 * u, dash: [14 * u, 12 * u] });
      planeTop(h.x, h.y, 60 * u, h.ang + Math.PI / 2, C.cream);
      g.save(); g.setLineDash([8 * u, 10 * u]); g.strokeStyle = C.fog; g.globalAlpha = 0.6; g.lineWidth = 3 * u;
      const [ex, ey] = P([16, 109.5]); const [ix, iy] = P(PLACE.igari);
      g.beginPath(); g.moveTo(ix, iy); g.lineTo(ex, ey); g.stroke(); g.restore();
      text(g, 'ปักกิ่ง ↑', ex - 30 * u, ey - 30 * u, { size: 38 * u, weight: 700, family: THAI, color: C.fog, align: 'right' });
      kicker('00:41 · ขึ้นบิน', TX, 250 * u, t, { color: C.red });
      say('มุ่งหน้าขึ้นเหนือ ข้ามทะเลจีนใต้', TX, 345 * u, t - 0.3, { size: 52 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(11) + 6 * BEAT, to: bar(14), cues: [[0, 'thump', 0.5], [1.25, 'thump', 0.5]],
    draw(t) {
      paper();
      kicker('ในห้องนักบิน', TX, 330 * u, t);
      [['กัปตัน', 'Zaharie Ahmad Shah', 'อายุ 53 · ชั่วโมงบินกว่า 18,000', 0], ['ผู้ช่วยนักบิน', 'Fariq Abdul Hamid', 'อายุ 27', 1.25]].forEach(([role, name, sub, at], i) => {
        const s = spring(t - at, 'default'); if (s <= 0) return;
        const y = 500 * u + i * 430 * u;
        g.save(); g.translate((1 - s) * -W, 0);
        g.fillStyle = C.paper2; rrect(g, 80 * u, y, W - 200 * u, 360 * u, 14 * u); g.fill();
        g.fillStyle = C.night2; rrect(g, 110 * u, y + 30 * u, 220 * u, 300 * u, 8 * u); g.fill();
        g.save(); g.beginPath(); g.rect(110 * u, y + 30 * u, 220 * u, 300 * u); g.clip(); person(220 * u, y + 300 * u, 110 * u, C.fog); g.restore();
        text(g, role, 370 * u, y + 100 * u, { size: 38 * u, weight: 700, family: THAI, color: C.red, align: 'left' });
        text(g, name, 370 * u, y + 180 * u, { size: 52 * u, weight: 400, family: SERIF, color: C.ink, align: 'left' });
        text(g, sub, 370 * u, y + 245 * u, { size: 32 * u, weight: 600, family: THAI, color: C.inkSoft, align: 'left' });
        g.restore();
      });
      say('นักบินมากประสบการณ์ทั้งคู่', TX, 1460 * u, t - 2.6, { size: 48 * u, weight: 700 });
      finish(0.6);
    } },
  // ---------------- Chapter 3 — last words
  { from: bar(14), to: bar(16), cues: [[0.3, 'click', 0.6], [0.6, 'click', 0.6], [0.9, 'click', 0.6], [2.5, 'thump', 0.6]],
    draw(t) {
      night(C.night2);
      kicker('01:07', TX, 300 * u, t, { color: C.red });
      say('ระบบ ACARS ส่งรายงานอัตโนมัติ\nเป็นครั้งสุดท้าย', TX, 410 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      for (let i = 0; i < 9; i++) {
        const at = 0.3 + i * 0.3, p = clamp((t - at) / 0.5);
        if (p <= 0 || i > 2 && t > 2.5) continue;
        const y = 1300 * u - p * 500 * u, x = TX + (i % 3 - 1) * 160 * u;
        g.globalAlpha = 1 - p; g.fillStyle = C.fog; rrect(g, x - 40 * u, y - 24 * u, 80 * u, 48 * u, 8 * u); g.fill(); g.globalAlpha = 1;
      }
      planeTop(TX, 1360 * u, 150 * u, 0, C.cream, '777');
      say('หลังจากนั้น ไม่มีข้อมูลส่งออกมาอีก', TX, 1560 * u, t - 2.6, { size: 44 * u, weight: 600, color: C.fog });
      finish(0.8);
    } },
  { from: bar(16), to: bar(18), cues: [[0.4, 'type', 0.5], [1.0, 'type', 0.5], [1.6, 'type', 0.5], [2.5, 'chime', 0.4]],
    draw(t) {
      night();
      kicker('01:19 · เสียงสุดท้ายจากห้องนักบิน', TX, 330 * u, t, { color: C.red });
      // radio waveform
      g.save(); g.strokeStyle = C.red; g.lineWidth = 4 * u; g.beginPath();
      const amp = t > 0.3 && t < 2.4 ? 1 : 0.08;
      for (let x = 100 * u; x <= W - 140 * u; x += 6 * u) {
        const yv = 640 * u + Math.sin(x * 0.05 / u + t * 18) * noise(x / (40 * u) + t * 6, 3) * 90 * u * amp;
        x === 100 * u ? g.moveTo(x, yv) : g.lineTo(x, yv);
      }
      g.stroke(); g.restore();
      typewriter('“Good night', TX - 380 * u, 920 * u, t - 0.4, { size: 76 * u, weight: 400, family: SERIF, color: C.cream, cps: 14 });
      typewriter('Malaysia three', TX - 380 * u, 1010 * u, t - 1.0, { size: 76 * u, weight: 400, family: SERIF, color: C.cream, cps: 14 });
      typewriter('seven zero.”', TX - 380 * u, 1100 * u, t - 1.6, { size: 76 * u, weight: 400, family: SERIF, color: C.cream, cps: 14 });
      say('“ราตรีสวัสดิ์ มาเลเซีย สามเจ็ดศูนย์”', TX, 1300 * u, t - 2.5, { size: 50 * u, weight: 700, color: C.fog });
      finish();
    } },
  { from: bar(18), to: bar(20), cues: [[0, 'whoosh', 0.5], [2.6, 'pop', 0.7]],
    draw(t) {
      const cam = { lat: track(t, [[0, 5.5], [0.1, 7.2]], 'heavy'), lon: 104.5, z: track(t, [[0, 150], [0.1, 300]], 'heavy') * u };
      const P = mapAsia(cam); topScrim();
      // FIR boundary between Malaysia and Vietnam
      const [ax, ay] = P([4.5, 101.5]), [bx, by] = P([9.5, 106.0]);
      g.save(); g.setLineDash([16 * u, 12 * u]); g.strokeStyle = C.cream; g.globalAlpha = 0.6; g.lineWidth = 3 * u;
      g.beginPath(); g.moveTo(ax, ay); g.lineTo(bx, by); g.stroke(); g.restore();
      const [mx, my] = P([6.0, 103.2]);
      text(g, 'น่านฟ้ามาเลเซีย', mx - 40 * u, my + 100 * u, { size: 34 * u, weight: 700, family: THAI, color: C.fog, align: 'right' });
      text(g, 'น่านฟ้าเวียดนาม', mx + 60 * u, my - 90 * u, { size: 34 * u, weight: 700, family: THAI, color: C.fog, align: 'left' });
      const pts = [P(PLACE.kul), P([5.5, 103.0]), P(PLACE.igari)];
      const h = path(pts, remap(t, 0, 2.5, 0.55, 1), { color: C.red, width: 5 * u, dash: [14 * u, 12 * u] });
      planeTop(h.x, h.y, 60 * u, h.ang + Math.PI / 2, C.cream);
      pin(...P(PLACE.igari), t - 2.6, { label: 'IGARI', side: 1 });
      kicker('จุดรอยต่อน่านฟ้า', TX, 250 * u, t, { color: C.red });
      say('ส่งต่อให้หอบังคับการบินโฮจิมินห์', TX, 345 * u, t - 0.3, { size: 52 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(20), to: bar(22), cues: [[0.3, 'tick', 0.7], [1.55, 'tick', 0.7], [2.8, 'tick', 0.7]],
    draw(t) {
      night(C.night2);
      // a radio calling into silence
      for (let k = 0; k < 3; k++) {
        const at = 0.3 + k * 1.25, p = clamp((t - at) / 1.1); if (p <= 0 || p >= 1) continue;
        g.strokeStyle = C.fog; g.globalAlpha = 1 - p; g.lineWidth = 5 * u;
        g.beginPath(); g.arc(TX, 820 * u, 80 * u + p * 380 * u, 0, 7); g.stroke(); g.globalAlpha = 1;
      }
      g.fillStyle = C.cream; rrect(g, TX - 60 * u, 760 * u, 120 * u, 160 * u, 18 * u); g.fill();
      g.fillRect(TX + 20 * u, 660 * u, 10 * u, 110 * u);
      say('“Malaysian three seven zero…”', TX, 1230 * u, t - 0.3, { size: 56 * u, weight: 400, family: SERIF, color: C.cream });
      say('ไม่มีเสียงตอบกลับมาอีกเลย', TX, 1360 * u, t - 2.5, { size: 60 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
];
