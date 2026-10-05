// Chapter 9 — case closed, never found (2:45–3:00, bars 66–72). Ends on the image it opened with.
import { g, u, L, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, noise,
  paper, night, finish, say, big, kicker, stamp, shake, rain, clouds, parachute, rrect, text } from './kit.js';

const T0 = bar(66);

export default () => [
  // S35 — NORJAK closed
  { from: T0, to: T0 + bar(2), cues: [[0, 'swish', 0.6], [2.5, 'impact', 1.2]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 24);
      g.translate(sx, sy);
      paper();
      const y = track(t, [[0, 700 * u], [0.02, 0]], 'heavy');
      g.save(); g.translate(0, y);
      g.fillStyle = C.paper2; rrect(g, 90 * u, 520 * u, W - 200 * u, 900 * u, 18 * u); g.fill();
      rrect(g, 90 * u, 460 * u, 380 * u, 90 * u, 14 * u); g.fill();
      text(g, 'NORJAK', 280 * u, 525 * u, { size: 46 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 8 * u });
      text(g, 'Northwest Hijacking', TX, 760 * u, { size: 80 * u, weight: 400, family: SERIF, color: C.ink });
      g.restore();
      kicker('ชื่อแฟ้มคดีของ FBI', TX, 330 * u, t);
      stamp('CLOSED', TX, 1100 * u, t - 2.5, { size: 170 * u, rot: -0.1 });
      say('กรกฎาคม 2016 · ยุติการสอบสวน', TX, 1520 * u, t - 3.0, { size: 48 * u, weight: 700 });
      finish(0.6);
    } },
  // S36 — the title
  { from: T0 + bar(2), to: T0 + bar(4), cues: [[0, 'thump', 0.9], [2.5, 'swish', 0.4]],
    draw(t) {
      night('#08070A');
      big('D. B.', TX, 760 * u, t, { size: 300 * u, color: C.cream });
      big('COOPER', TX, 1010 * u, t - 0.15, { size: 260 * u, color: C.cream });
      const p = spring(t - 0.7, 'default');
      g.fillStyle = C.red; g.fillRect(TX - 330 * u * p, 1080 * u, 660 * u * p, 10 * u);
      say('ตัวตนจริงของเขา', TX, 1250 * u, t - 1.2, { size: 52 * u, weight: 600, color: C.fog });
      say('ไม่มีใครรู้', TX, 1360 * u, t - 2.5, { size: 72 * u, weight: 800, color: C.red });
      finish();
    } },
  // S37 — back to the rain: never found
  { from: T0 + bar(4), to: T0 + bar(6), cues: [[0, 'whoosh', 0.5], [2.5, 'chime', 0.8]],
    draw(t) {
      night();
      clouds(t * 80 * u, { alpha: 0.6, seed: 2 });
      rain(t + 40, { n: 170, alpha: 0.4 });
      parachute(TX + 60 * u, 640 * u + t * 30 * u, 260 * u, 1, C.cream, noise(t * 0.7, 2) * 0.08);
      say('ไม่เคยพบตัว', TX, 1150 * u, t - 0.3, { size: 110 * u, weight: 800, color: C.cream });
      say('ไม่เคยพบศพ ไม่เคยพบร่มที่เขาใช้', TX, 1290 * u, t - 1.2, { size: 46 * u, weight: 600, color: C.fog });
      say('คุณคิดว่าเขารอดไหม?', TX, 1450 * u, t - 2.5, { size: 62 * u, weight: 800, color: C.red });
      finish();
    } },
];
