// Chapter 2 — boarding (0:15–0:35, bars 6–14).
import { g, u, L, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash,
  night, paper, finish, say, big, kicker, flip, person, rrect, text, typewriter, measure, strokeProgress } from './kit.js';

const T0 = bar(6);
const FLAPS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function board(row, x, y, t, t0, o = {}) {      // one split-flap row, each cell settles on its letter
  const { cw = 56 * u, ch = 80 * u, color = C.cream, bg = '#1A1814', seed = 1 } = o;
  [...row].forEach((ch_, j) => {
    const n = ch_ === ' ' ? 0 : 3 + Math.floor(hash(j, seed) * 5);
    const vals = [], times = [];
    for (let k = 0; k <= n; k++) { vals.push(k === n ? ch_ : FLAPS[Math.floor(hash(j * 31 + k, seed + 7) * FLAPS.length)]); times.push(t0 + j * 0.035 + k * 0.09); }
    if (n === 0) { vals.splice(0, vals.length, ' '); times.splice(0, times.length, 0); }
    flip(x + j * (cw + 6 * u), y, cw, ch, vals, times, t, { size: ch * 0.62, family: 'Inter, sans-serif', weight: 700, bg, fg: color, r: 6 * u });
  });
}

export default () => [
  // S4 — the date
  { from: T0, to: T0 + bar(1), cues: [0, 1, 2, 3, 4].map((i) => [i * 0.25, 'tick', 0.7]).concat([[1.0, 'thump', 0.6]]),
    draw(t) {
      paper();
      kicker('พฤศจิกายน 1971', TX, 420 * u, t);
      flip(TX, 820 * u, 440 * u, 540 * u, ['20', '21', '22', '23', '24'], [0, 0.25, 0.5, 0.75, 1.0], t,
        { size: 380 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('วันพุธ ก่อนวันขอบคุณพระเจ้า', TX, 1240 * u, t - 1.1, { size: 54 * u, weight: 700 });
      finish(0.6);
    } },
  // S5 — departure board
  { from: T0 + bar(1), to: T0 + bar(3), cues: [[0, 'swish', 0.5], ...Array.from({ length: 10 }, (_, i) => [0.15 + i * 0.09, 'tick', 0.35]), [2.5, 'click', 0.7]],
    draw(t) {
      night('#100E0B');
      kicker('สนามบินนานาชาติพอร์ตแลนด์', TX, 300 * u, t, { color: C.red });
      const x0 = TX - 7 * 62 * u + 28 * u;
      board('DEPARTURES    ', x0, 470 * u, t, 0.1, { color: C.fog, seed: 2 });
      board('NORTHWEST     ', x0, 640 * u, t, 0.3, { seed: 3 });
      board('FLIGHT 305    ', x0, 740 * u, t, 0.45, { seed: 4 });
      board('TO SEATTLE    ', x0, 840 * u, t, 0.6, { seed: 5 });
      board('DEP 2:50 PM   ', x0, 940 * u, t, 0.75, { seed: 6, color: '#E8B04A' });
      say('เที่ยวบิน 305 ไปซีแอตเทิล', TX, 1220 * u, t - 1.3, { size: 62 * u, weight: 800, color: C.cream });
      say('บินแค่ราว 30 นาที', TX, 1330 * u, t - 2.6, { size: 46 * u, weight: 500, color: C.fog });
      finish(0.8);
    } },
  // S6 — the man
  { from: T0 + bar(3), to: T0 + bar(5), cues: [[0, 'whoosh', 0.5], [0.9, 'pop', 0.6], [1.25, 'pop', 0.5], [1.875, 'pop', 0.5], [2.5, 'pop', 0.5], [3.125, 'pop', 0.5]],
    draw(t) {
      paper();
      kicker('ผู้โดยสารคนหนึ่ง', TX, 270 * u, t);
      const rise = spring(t - 0.1, 'heavy');
      g.save(); g.beginPath(); g.rect(0, 0, W, 1300 * u - 0 * u); g.clip();
      g.translate(0, (1 - rise) * 500 * u);
      person(TX, 1080 * u, 330 * u, C.inkSoft, { tie: C.ink });
      g.restore();
      // briefcase
      const bs = spring(t - 3.1, 'snappy');
      g.save(); g.translate(TX + 250 * u, 1240 * u); g.scale(bs, bs);
      g.fillStyle = C.ink; rrect(g, -110 * u, -70 * u, 220 * u, 150 * u, 12 * u); g.fill();
      g.strokeStyle = C.ink; g.lineWidth = 10 * u; rrect(g, -40 * u, -110 * u, 80 * u, 50 * u, 12 * u); g.stroke();
      g.restore();
      text(g, '?', TX, 820 * u, { size: 260 * u, weight: 400, family: SERIF, color: C.red, alpha: clamp((t - 0.6) / 0.2) });
      const notes = [['สูทสีเข้ม', -1, 1080, 0.9], ['เนกไทสีดำ', 1, 960, 1.25], ['อายุราวกลาง 40', -1, 700, 1.875], ['สุภาพ เงียบขรึม', 1, 600, 2.5], ['ถือกระเป๋าเอกสาร', -1, 1260, 3.125]];
      for (const [s, side, y, at] of notes) {
        const p = spring(t - at, 'snappy');
        if (p <= 0) continue;
        const ax = TX + side * 120 * u, lx = side < 0 ? 100 * u : TX + 200 * u;
        g.save(); g.strokeStyle = C.red; g.lineWidth = 3 * u;
        g.beginPath(); g.moveTo(ax, y * u); g.lineTo(ax + (lx - ax) * p, y * u); g.stroke(); g.restore();
        g.fillStyle = C.red; g.beginPath(); g.arc(ax, y * u, 8 * u * p, 0, 7); g.fill();
        text(g, s, side < 0 ? 100 * u : TX + 200 * u, y * u - 18 * u, { size: 38 * u, weight: 700, family: THAI, color: C.ink, align: 'left', alpha: clamp((t - at) / 0.15) });
      }
      say('ไม่มีใครรู้ว่าเขาเป็นใคร', TX, 1450 * u, t - 3.6, { size: 52 * u, weight: 700 });
      finish(0.6);
    } },
  // S7 — the ticket
  { from: T0 + bar(5), to: T0 + bar(5) + 6 * BEAT, cues: [[0, 'swish', 0.7], [0.5, 'type', 0.6], [1.2, 'type', 0.6], [1.9, 'type', 0.6], [2.6, 'type', 0.6]],
    draw(t) {
      paper();
      say('ซื้อตั๋วเที่ยวเดียว จ่ายเงินสด', TX, 400 * u, t - 0.1, { size: 58 * u, weight: 800 });
      const x = track(t, [[0, W + 500 * u], [0.05, TX]], 'default');
      g.save(); g.translate(x, 900 * u); g.rotate(-0.05);
      const tw = 840 * u, th = 520 * u;
      g.fillStyle = 'rgba(0,0,0,0.12)'; rrect(g, -tw / 2 + 14 * u, -th / 2 + 18 * u, tw, th, 18 * u); g.fill();
      g.fillStyle = '#F6F0E2'; rrect(g, -tw / 2, -th / 2, tw, th, 18 * u); g.fill();
      g.fillStyle = C.red; g.fillRect(-tw / 2, -th / 2 + 18 * u, tw, 84 * u);
      text(g, 'NORTHWEST ORIENT AIRLINES', 0, -th / 2 + 75 * u, { size: 38 * u, weight: 700, family: 'Inter, sans-serif', color: '#F6F0E2', tracking: 3 * u });
      g.setLineDash([10 * u, 10 * u]); g.strokeStyle = C.paper3; g.lineWidth = 3 * u;
      g.beginPath(); g.moveTo(tw / 2 - 190 * u, -th / 2 + 110 * u); g.lineTo(tw / 2 - 190 * u, th / 2 - 20 * u); g.stroke(); g.setLineDash([]);
      const lx = -tw / 2 + 40 * u, f = { size: 40 * u, weight: 700, family: 'Inter, sans-serif', color: C.ink, cps: 26 };
      const lab = (s, y) => text(g, s, lx, y, { size: 24 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, align: 'left', tracking: 2 * u });
      lab('PASSENGER', -60 * u); typewriter('DAN COOPER', lx, -10 * u, t - 0.5, f);
      lab('FROM / TO', 60 * u); typewriter('PORTLAND – SEATTLE', lx, 110 * u, t - 1.2, f);
      lab('FLIGHT', 170 * u); typewriter('305 · ONE WAY · CASH', lx, 220 * u, t - 1.9, f);
      text(g, '18C', tw / 2 - 95 * u, 40 * u, { size: 80 * u, weight: 400, family: SERIF, color: C.red, alpha: clamp((t - 2.6) / 0.15) });
      g.restore();
      say('ในชื่อ “Dan Cooper”', TX, 1370 * u, t - 2.7, { size: 60 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // S8 — seat 18C
  { from: T0 + bar(5) + 6 * BEAT, to: T0 + bar(8), cues: [[0, 'whoosh', 0.5], [1.25, 'pop', 0.8]],
    draw(t, d) {
      night(C.night);
      const z = track(t, [[0, 0.62], [0.9, 1.45]], 'heavy');
      const rows = 26, sw = 40 * u, sh = 36 * u, gap = 8 * u, aisle = 40 * u;
      const rowY = (r) => (r - 18) * (sh + gap);
      const seatX = (c) => (c < 3 ? -aisle / 2 - (3 - c) * (sw + gap) + gap / 2 : aisle / 2 + (c - 3) * (sw + gap) + gap / 2);
      g.save(); g.beginPath(); g.rect(0, 0, W, 1180 * u); g.clip();
      g.translate(TX - z * (seatX(2) + sw / 2), 700 * u); g.scale(z, z);
      g.strokeStyle = C.fog; g.lineWidth = 3 * u / z;
      const fw = 6 * (sw + gap) + aisle + 50 * u;
      rrect(g, -fw / 2, rowY(0) - 160 * u, fw, (rows + 6) * (sh + gap) + 160 * u, fw / 2); g.globalAlpha = 0.5; g.stroke(); g.globalAlpha = 1;
      for (let r = 1; r <= rows; r++) for (let c = 0; c < 6; c++) {
        const hot = r === 18 && c === 2, p = hot ? spring(t - 1.25, 'playful') : 0;
        g.fillStyle = hot ? C.red : C.night3;
        const x = seatX(c), y = rowY(r);
        g.save(); g.translate(x + sw / 2, y + sh / 2); g.scale(1 + p * 0.25, 1 + p * 0.25);
        rrect(g, -sw / 2, -sh / 2, sw, sh, 6 * u); g.fill(); g.restore();
      }
      for (const [c, l] of [[0, 'A'], [1, 'B'], [2, 'C'], [3, 'D'], [4, 'E'], [5, 'F']]) text(g, l, seatX(c) + sw / 2, rowY(0) - 20 * u, { size: 22 * u, weight: 700, family: 'Inter, sans-serif', color: C.fog });
      g.restore();
      big('18C', TX, 1360 * u, t - 1.3, { size: 200 * u, color: C.red });
      say('นั่งค่อนไปทางท้ายเครื่อง', TX, 1470 * u, t - 1.7, { size: 46 * u, color: C.cream, weight: 600 });
      finish(0.8);
    } },
];
