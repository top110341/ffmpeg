// Chapter 7 — money in the river (2:05–2:25, bars 50–58).
import { g, u, L, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, map, pin, flip, banknote, serial, PLACE, rrect, text, topScrim } from './kit.js';
import { SERIALS, HIT } from './ch04.js';

const T0 = bar(50);

export default () => [
  // S28 — nine years later
  { from: T0, to: T0 + bar(1), cues: Array.from({ length: 9 }, (_, i) => [i * 0.16, 'tick', 0.5]).concat([[1.5, 'chime', 0.4]]),
    draw(t) {
      paper();
      const years = Array.from({ length: 10 }, (_, i) => String(1971 + i));
      const times = years.map((_, i) => i * 0.16);
      const dw = 170 * u, x0 = TX - 1.5 * (dw + 14 * u);
      for (let d = 0; d < 4; d++) flip(x0 + d * (dw + 14 * u), 820 * u, dw, 250 * u, years.map((y) => y[d]), times, t, { size: 190 * u });
      kicker('เก้าปีต่อมา', TX, 560 * u, t);
      say('กุมภาพันธ์ 1980', TX, 1100 * u, t - 1.4, { size: 64 * u, weight: 800 });
      finish(0.6);
    } },
  // S29 — the Columbia River, Tena Bar
  { from: T0 + bar(1), to: T0 + bar(3), cues: [[0.2, 'swish', 0.5], [2.5, 'pop', 0.9]],
    draw(t) {
      const cam = { lat: track(t, [[0, 45.95], [0.3, 45.74]], 'heavy'), lon: -122.72, z: track(t, [[0, 700], [0.3, 1700]], 'heavy') * u };
      const P = map(cam, { land: C.paper2, water: C.paper, line: C.inkSoft, river: remap(t, 0.1, 2.2), riverColor: '#5C7A8C', sound: 0 });
      topScrim(560, '239,230,210', 0.92);
      pin(...P(PLACE.pdx), t - 0.4, { label: 'พอร์ตแลนด์', labelColor: C.ink, color: C.inkSoft, side: 1 });
      pin(...P(PLACE.tena), t - 2.5, { label: 'Tena Bar', labelColor: C.red, side: -1 });
      kicker('ริมแม่น้ำโคลัมเบีย', TX, 250 * u, t);
      say('ครอบครัวหนึ่งมาพักผ่อนริมหาดทราย', TX, 350 * u, t - 0.3, { size: 54 * u, weight: 800 });
      finish(0.6);
    } },
  // S30 — the boy digs up the money
  { from: T0 + bar(3), to: T0 + bar(5) + 2 * BEAT, cues: [[0.3, 'swish', 0.5], [2.5, 'impact', 0.8]],
    draw(t) {
      paper();
      const sy = 1000 * u;
      g.fillStyle = C.paper3; g.fillRect(0, sy, W, H - sy);
      g.fillStyle = '#B8A580';
      for (let i = 0; i < 400; i++) { g.globalAlpha = 0.6; g.beginPath(); g.arc(hash(i, 51) * W, sy + 20 * u + hash(i, 52) * (H - sy), (1 + hash(i, 53) * 3) * u, 0, 7); g.fill(); }
      g.globalAlpha = 1;
      for (let i = 0; i < 3; i++) {
        const rise = spring(t - 0.4 - i * BEAT, 'heavy');
        const x = TX + (i - 1) * 230 * u, y = sy + 160 * u - rise * (260 + i * 60) * u;
        g.save(); g.beginPath(); g.rect(0, 0, W, sy + 30 * u); g.clip();
        banknote(x, y, 420 * u, (i - 1) * 0.18, { worn: 1, seed: 70 + i, fill: '#C9BC94' });
        g.restore();
      }
      say('เด็กชายวัย 8 ขวบ ขุดทรายเจอ\nธนบัตรเปื่อย 3 ปึก', TX, 330 * u, t - 0.2, { size: 54 * u, weight: 800 });
      big('$5,800', TX, 1300 * u, t - 2.5, { size: 200 * u, color: C.red });
      say('ยังมีหนังยางรัดอยู่', TX, 1430 * u, t - 3.0, { size: 46 * u, weight: 600, color: C.inkSoft });
      finish(0.6);
    } },
  // S31 — serials match the ransom list
  { from: T0 + bar(5) + 2 * BEAT, to: T0 + bar(8), cues: [[0, 'whoosh', 0.5], [1.4, 'chime', 0.9]],
    draw(t) {
      night();
      const rowH = 60 * u, scroll = track(t, [[0, (HIT - 9) * rowH], [0.05, HIT * rowH]], 70, 17);
      g.save(); g.beginPath(); g.rect(0, 590 * u, W, 300 * u); g.clip();
      for (let i = 0; i < SERIALS.length; i++) {
        const y = 760 * u + i * rowH - scroll; if (y < 500 * u || y > 960 * u) continue;
        const hot = i === HIT && t > 1.4;
        text(g, SERIALS[i], TX, y, { size: 42 * u, weight: 700, family: 'Inter, sans-serif', color: hot ? C.red : C.fog, tracking: 4 * u });
      }
      g.restore();
      text(g, 'บันทึกของ FBI ปี 1971', TX, 530 * u, { size: 34 * u, weight: 600, family: THAI, color: C.fog });
      banknote(TX, 1130 * u, 520 * u, -0.04, { worn: 1, seed: 90, fill: '#C9BC94', serial: SERIALS[HIT] });
      const p = remap(t, 1.0, 1.4);
      g.strokeStyle = C.red; g.lineWidth = 4 * u; g.setLineDash([10 * u, 8 * u]);
      g.beginPath(); g.moveTo(TX + 130 * u, 1080 * u); g.lineTo(TX + 130 * u, 1080 * u - (1080 - 785) * u * p); g.stroke(); g.setLineDash([]);
      const q = spring(t - 1.4, 'playful');
      if (q > 0) { g.save(); g.translate(TX + 330 * u, 760 * u); g.scale(q, q); g.fillStyle = C.red; g.beginPath(); g.arc(0, 0, 44 * u, 0, 7); g.fill();
        g.strokeStyle = C.cream; g.lineWidth = 9 * u; g.lineCap = 'round'; g.beginPath(); g.moveTo(-18 * u, 0); g.lineTo(-4 * u, 15 * u); g.lineTo(20 * u, -14 * u); g.stroke(); g.restore(); }
      say('เลขตรงกับเงินค่าไถ่', TX, 300 * u, t - 1.5, { size: 64 * u, weight: 800, color: C.cream });
      say('เงินก้อนเดียวที่เคยถูกพบ\nไม่มีใครอธิบายได้ว่ามาอยู่ตรงนี้ได้อย่างไร', TX, 1380 * u, t - 2.6, { size: 42 * u, weight: 600, color: C.fog });
      finish(0.8);
    } },
];
