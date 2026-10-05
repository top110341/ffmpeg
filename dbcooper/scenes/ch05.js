// Chapter 5 — the jump (1:20–1:45, bars 32–42).
import { g, u, L, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, finish, say, big, kicker, map, pin, path, planeTop, planeSide, flip, rain, clouds, forest, shake, parachute, PLACE, rrect, text, topScrim } from './kit.js';

const T0 = bar(32);

function gauge(x, y, r, v, label, sub) {      // v 0..1 needle position
  g.save(); g.translate(x, y);
  g.fillStyle = C.night; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill();
  g.strokeStyle = C.fog; g.lineWidth = 4 * u; g.beginPath(); g.arc(0, 0, r, 0, 7); g.stroke();
  for (let i = 0; i <= 10; i++) { const a = -Math.PI * 1.25 + i * Math.PI * 0.25; g.save(); g.rotate(a); g.fillStyle = C.fog; g.fillRect(r - 26 * u, -2 * u, (i % 5 ? 12 : 22) * u, 4 * u); g.restore(); }
  g.save(); g.rotate(-Math.PI * 1.25 + v * Math.PI * 2.5); g.fillStyle = C.red; rrect(g, -6 * u, -5 * u, r * 0.82, 10 * u, 5 * u); g.fill(); g.restore();
  g.fillStyle = C.cream; g.beginPath(); g.arc(0, 0, 10 * u, 0, 7); g.fill();
  g.restore();
  text(g, label, x, y + r + 60 * u, { size: 40 * u, weight: 800, family: THAI, color: C.cream });
  text(g, sub, x, y + r + 108 * u, { size: 32 * u, weight: 500, family: THAI, color: C.fog });
}
function toggle(x, y, label, on, at, t) {
  const p = spring(t - at, 'snappy');
  g.fillStyle = C.night; rrect(g, x, y - 30 * u, 96 * u, 52 * u, 26 * u); g.fill();
  g.strokeStyle = C.fog; g.lineWidth = 3 * u; g.stroke();
  g.fillStyle = p > 0.5 ? C.red : C.fog; g.beginPath(); g.arc(x + 26 * u + p * 44 * u, y - 4 * u, 18 * u, 0, 7); g.fill();
  text(g, label, x + 130 * u, y + 10 * u, { size: 40 * u, weight: 700, family: THAI, color: C.cream, align: 'left' });
  text(g, on, x + 640 * u, y + 10 * u, { size: 40 * u, weight: 800, family: THAI, color: C.red, align: 'right', alpha: clamp((t - at) / 0.15) });
}

export default () => [
  // S19 — new course: Mexico City
  { from: T0, to: T0 + bar(2), cues: [[0, 'whoosh', 0.6], [2.5, 'pop', 0.6]],
    draw(t) {
      const cam = { lat: track(t, [[0, 47.0], [0.3, 46.4]], 'heavy'), lon: -122.4, z: track(t, [[0, 900], [0.3, 330]], 'heavy') * u };
      const P = map(cam, { river: 1 });
      topScrim();
      pin(...P(PLACE.sea), t - 0.1, { label: 'ซีแอตเทิล', side: 1 });
      const pts = [P(PLACE.sea), P([46.8, -122.45]), P(PLACE.ariel), P([44.9, -122.3]), P([43.8, -122.05])];
      const h = path(pts, remap(t, 0.5, 4.5), { color: C.red, width: 5 * u, dash: [14 * u, 12 * u] });
      planeTop(h.x, h.y, 60 * u, h.ang + Math.PI / 2, C.cream);
      kicker('19:40 · ขึ้นบินอีกครั้ง', TX, 250 * u, t, { color: C.red });
      say('เขาสั่งให้มุ่งหน้าไป', TX, 345 * u, t - 0.3, { size: 52 * u, weight: 700, color: C.cream });
      say('เม็กซิโกซิตี้', TX, 470 * u, t - 2.5, { size: 96 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  // S20 — his flight conditions
  { from: T0 + bar(2), to: T0 + bar(4), cues: [[0.2, 'click', 0.6], [2.5, 'click', 0.6], [2.5 + BEAT, 'click', 0.6], [2.5 + 2 * BEAT, 'click', 0.6], [2.5 + 3 * BEAT, 'click', 0.6]],
    draw(t) {
      night(C.night2);
      say('เงื่อนไขการบินของเขา', TX, 290 * u, t, { size: 56 * u, weight: 800, color: C.cream });
      gauge(TX - 210 * u, 620 * u, 160 * u, track(t, [[0, 0.8], [0.2, 0.33]], 'heavy'), 'ความสูง', 'ต่ำกว่า 10,000 ฟุต');
      gauge(TX + 210 * u, 620 * u, 160 * u, track(t, [[0, 0.7], [0.5, 0.18]], 'heavy'), 'ความเร็ว', 'ช้าที่สุดที่บินได้');
      const x = TX - 330 * u;
      toggle(x, 1040 * u, 'ล้อ', 'กางลง', 2.5, t);
      toggle(x, 1140 * u, 'แฟลป', '15°', 2.5 + BEAT, t);
      toggle(x, 1240 * u, 'อัดความดัน', 'ปิด', 2.5 + 2 * BEAT, t);
      toggle(x, 1340 * u, 'บันไดท้าย', 'เปิด', 2.5 + 3 * BEAT, t);
      finish(0.8);
    } },
  // S21 — the aft stair opens in flight
  { from: T0 + bar(4), to: T0 + bar(6), cues: [[0.6, 'whoosh', 0.9], [1.0, 'riser', 0.5]],
    draw(t) {
      night();
      const z = track(t, [[0, 1], [1.2, 1.7]], 'heavy'), s = 470 * u;
      const fx = TX + 0.86 * s, fy = 860 * u;
      g.save(); g.translate(fx, fy); g.scale(z, z); g.translate(-fx, -fy);
      planeSide(TX, 820 * u, s, { color: C.cream, stair: spring(t - 0.6, 'heavy'), windows: C.night2, rot: noise(t * 3, 4) * 0.008 });
      g.restore();
      rain(t, { n: 220, alpha: 0.4, angle: 1.35, speed: 3600, len: 110 });
      const y2 = say('บันไดท้ายเครื่อง\nเปิดออกกลางอากาศ', TX, 1200 * u, t - 0.4, { size: 62 * u, weight: 800, color: C.cream });
      say('ข้างนอกมืดสนิท ฝนตกหนัก ลมแรง', TX, y2 + 20 * u, t - 2.5, { size: 46 * u, weight: 500, color: C.fog });
      finish();
    } },
  // S22 — 20:13, the tail jolts
  { from: T0 + bar(6), to: T0 + bar(8), cues: [[0, 'tick', 0.6], [1.25, 'tick', 0.6], [2.5, 'impact', 1.2]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 30);
      g.translate(sx, sy);
      night();
      const dw = 190 * u, dh = 270 * u, y = 760 * u, x0 = TX - 2 * dw - 40 * u;
      flip(x0, y, dw, dh, ['2'], [0], t, { size: 210 * u });
      flip(x0 + dw + 14 * u, y, dw, dh, ['0'], [0], t, { size: 210 * u });
      text(g, ':', TX, y + 70 * u, { size: 200 * u, weight: 400, family: SERIF, color: C.cream });
      flip(TX + 40 * u + dw / 2, y, dw, dh, ['1'], [0], t, { size: 210 * u });
      flip(TX + 40 * u + dw * 1.5 + 14 * u, y, dw, dh, ['1', '2', '3'], [0, 1.25, 2.5], t, { size: 210 * u, fg: t >= 2.72 ? C.red : C.paper });
      kicker('สองทุ่มสิบสามนาที', TX, 500 * u, t, { color: C.red });
      const fl = clamp(1 - (t - 2.5) / 0.25);
      if (t > 2.5 && fl > 0) { g.fillStyle = C.red; g.globalAlpha = fl * 0.35; g.fillRect(-50 * u, -50 * u, W + 100 * u, H + 100 * u); g.globalAlpha = 1; }
      say('หางเครื่องกระตุกวูบหนึ่ง', TX, 1180 * u, t - 2.5, { size: 64 * u, weight: 800, color: C.cream });
      say('ลูกเรือเชื่อว่า นี่คือวินาทีที่เขากระโดด', TX, 1300 * u, t - 3.1, { size: 46 * u, weight: 600, color: C.fog });
      finish();
    } },
  // S23 — the fall into forest and rain
  { from: T0 + bar(8), to: T0 + bar(10), cues: [[0, 'whoosh', 1.0], [4.0, 'thump', 0.6]],
    draw(t) {
      night();
      clouds(t * 900 * u, { alpha: 0.7, seed: 13, color: C.night2 });
      const ft = track(t, [[0, 1900 * u], [2.2, 1250 * u]], 'heavy');
      const alt = Math.max(0, Math.round(10000 * (1 - clamp(spring(t - 0.1, 30, 11)))) / 100) * 100;
      // altitude ruler on the left
      g.save(); g.strokeStyle = C.fog; g.fillStyle = C.fog; g.lineWidth = 2 * u;
      const off = (t * 420 * u) % (120 * u);
      for (let i = -1; i < 16; i++) { const y = 200 * u + i * 120 * u - off; g.fillRect(90 * u, y, i % 2 ? 24 * u : 44 * u, 3 * u); }
      g.restore();
      text(g, `${alt.toLocaleString('en-US')} ฟุต`, 150 * u, 980 * u, { size: 56 * u, weight: 400, family: SERIF, color: C.red, align: 'left' });
      parachute(TX + 80 * u + noise(t, 6) * 20 * u, 700 * u + t * 40 * u, 230 * u * (1 - 0.3 * remap(t, 0, 5)), 1, C.cream, noise(t * 1.2, 7) * 0.12);
      clouds(t * 1400 * u + 500 * u, { alpha: 0.85, seed: 17, color: C.night3, scale: 1.2 });
      forest(ft, { h: 300 });
      rain(t + 3, { n: 200, alpha: 0.4, speed: 3800 });
      say('กลางคืน · ฝน · ป่าทึบ', TX, 300 * u, t - 0.3, { size: 64 * u, weight: 800, color: C.cream });
      say('เขาใส่แค่สูทกับรองเท้าหนัง', TX, 410 * u, t - 2.5, { size: 46 * u, weight: 600, color: C.fog });
      finish();
    } },
];
