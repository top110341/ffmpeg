// Chapter 8 — suspects and 45 years (2:25–2:45, bars 58–66).
import { g, u, L, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash,
  paper, night, finish, say, big, kicker, flip, stamp, person, rrect, text } from './kit.js';

const T0 = bar(58);

export default () => [
  // S32 — the evidence board
  { from: T0, to: T0 + bar(2), cues: [[0.1, 'pop', 0.4], [0.35, 'pop', 0.4], [0.6, 'pop', 0.4], [0.85, 'pop', 0.4], [1.6, 'swish', 0.5], [2.5, 'thump', 0.7]],
    draw(t) {
      paper();
      g.fillStyle = C.paper2; g.fillRect(60 * u, 470 * u, W - 120 * u, 1000 * u);
      const nodes = [['พอร์ตแลนด์', '24 พ.ย. 1971', 230, 620], ['เที่ยวบิน 305', 'ซีแอตเทิล', 720, 680], ['จุดกระโดด', '20:13 น.', 300, 1050], ['Tena Bar', 'ก.พ. 1980', 760, 1150], ['?', '', 520, 1340]];
      const pos = nodes.map(([, , x, y]) => [x * u, y * u]);
      const links = [[0, 1], [1, 2], [2, 3], [3, 4], [2, 4], [0, 4]];
      g.strokeStyle = C.red; g.lineWidth = 4 * u;
      links.forEach(([a, b], i) => {
        const p = remap(t, 1.4 + i * 0.18, 1.7 + i * 0.18); if (p <= 0) return;
        const [ax, ay] = pos[a], [bx, by] = pos[b];
        g.beginPath(); g.moveTo(ax, ay); g.quadraticCurveTo((ax + bx) / 2, (ay + by) / 2 + 40 * u, ax + (bx - ax) * p, ay + (by - ay) * p); g.stroke();
      });
      nodes.forEach(([a, b, x, y], i) => {
        const s = spring(t - 0.1 - i * 0.25, 'playful'); if (s <= 0) return;
        g.save(); g.translate(x * u, y * u); g.rotate((hash(i, 61) - 0.5) * 0.12); g.scale(s, s);
        g.fillStyle = 'rgba(0,0,0,0.15)'; g.fillRect(-150 * u + 8 * u, -70 * u + 10 * u, 300 * u, 140 * u);
        g.fillStyle = '#F7F1E3'; g.fillRect(-150 * u, -70 * u, 300 * u, 140 * u);
        text(g, a, 0, b ? -2 * u : 40 * u, { size: a === '?' ? 110 * u : 40 * u, weight: a === '?' ? 400 : 800, family: a === '?' ? SERIF : THAI, color: a === '?' ? C.red : C.ink });
        if (b) text(g, b, 0, 44 * u, { size: 30 * u, weight: 500, family: THAI, color: C.inkSoft });
        g.fillStyle = C.red; g.beginPath(); g.arc(0, -70 * u, 12 * u, 0, 7); g.fill();
        g.restore();
      });
      say('50 กว่าปี ทฤษฎีนับไม่ถ้วน', TX, 330 * u, t - 0.2, { size: 60 * u, weight: 800 });
      finish(0.6);
    } },
  // S33 — three suspects, nothing proven
  { from: T0 + bar(2), to: T0 + bar(5) + 2 * BEAT, cues: [[0, 'thump', 0.6], [2.5, 'thump', 0.6], [5.0, 'thump', 0.6], [6.25, 'impact', 1.0]],
    draw(t) {
      paper();
      kicker('ผู้ต้องสงสัยที่ถูกพูดถึงมากที่สุด', TX, 260 * u, t);
      const S = [['Richard McCoy', 'จี้เครื่องบินด้วยวิธีคล้ายกันในปี 1972'], ['Kenneth Christiansen', 'อดีตพนักงานของ Northwest Orient'], ['Robert Rackstraw', 'อดีตทหารผ่านศึกเวียดนาม']];
      S.forEach(([name, note], i) => {
        const at = i * 2.5, s = spring(t - at, 'default'); if (s <= 0) return;
        const y = 470 * u + i * 330 * u;
        g.save(); g.translate((1 - s) * W, 0);
        g.fillStyle = C.paper2; rrect(g, 80 * u, y, W - 200 * u, 290 * u, 14 * u); g.fill();
        g.fillStyle = C.night2; rrect(g, 110 * u, y + 30 * u, 200 * u, 230 * u, 8 * u); g.fill();
        g.save(); g.beginPath(); g.rect(110 * u, y + 30 * u, 200 * u, 230 * u); g.clip(); person(210 * u, y + 230 * u, 95 * u, C.fog); g.restore();
        text(g, name, 340 * u, y + 120 * u, { size: 58 * u, weight: 400, family: SERIF, color: C.ink, align: 'left' });
        text(g, note, 340 * u, y + 185 * u, { size: 32 * u, weight: 600, family: THAI, color: C.inkSoft, align: 'left' });
        g.restore();
      });
      stamp('ไม่มีหลักฐานชี้ขาด', TX, 1520 * u, t - 6.25, { size: 84 * u, rot: -0.06, family: THAI, weight: 800, pad: 0.25 });
      finish(0.6);
    } },
  // S34 — 1971 → 2016
  { from: T0 + bar(5) + 2 * BEAT, to: T0 + bar(8), cues: Array.from({ length: 12 }, (_, i) => [i * 0.1, 'tick', 0.35]).concat([[1.25, 'impact', 0.9]]),
    draw(t) {
      night();
      const years = Array.from({ length: 46 }, (_, i) => String(1971 + i));
      const times = years.map((_, i) => 1.25 * (1 - Math.pow(1 - i / 45, 2.2)));
      const dw = 170 * u, x0 = TX - 1.5 * (dw + 14 * u);
      for (let d = 0; d < 4; d++) flip(x0 + d * (dw + 14 * u), 640 * u, dw, 250 * u, years.map((y) => y[d]), times, t, { size: 190 * u, bg: C.night2, fg: C.cream });
      kicker('FBI สืบสวนต่อเนื่อง', TX, 400 * u, t, { color: C.red });
      big('45 ปี', TX, 1150 * u, t - 1.25, { size: 280 * u, color: C.red });
      say('ผู้ต้องสงสัยกว่า 800 คน', TX, 1300 * u, t - 2.2, { size: 52 * u, weight: 700, color: C.cream });
      finish(0.8);
    } },
];
