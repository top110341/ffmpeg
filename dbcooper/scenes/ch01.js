// Chapter 1 — cold open (0:00–0:15, bars 0–6). Night jump first, the case file after.
import { g, u, L, W, H, TX, C, SERIF, THAI, bar, spring, track, clamp, noise, remap,
  night, paper, rain, clouds, finish, say, big, kicker, stamp, parachute, shake, rrect, text } from './kit.js';

export default () => [
  { from: bar(0), to: bar(2), cues: [[0, 'riser', 0.5], [0.3, 'whoosh', 0.9], [1.0, 'impact', 0.8], [1.6, 'type', 0.5]],
    draw(t) {
      night();
      clouds(t * 90 * u, { alpha: 0.6, seed: 2 });
      rain(t, { n: 170, alpha: 0.4 });
      const open = spring(t - 0.3, 'playful');
      parachute(TX, 780 * u + t * 30 * u, 480 * u, open, C.cream, noise(t * 0.7, 2) * 0.07);
      big('$200,000', TX, 1330 * u, t - 1.0, { size: 230 * u, color: C.red });
      say('เงินค่าไถ่ที่เขาได้ไปในคืนเดียว', TX, 1450 * u, t - 1.6, { size: 50 * u, color: C.cream, weight: 600 });
      finish();
    } },
  { from: bar(2), to: bar(4), cues: [[0, 'whoosh', 0.7], [2.5, 'swish', 0.6]],
    draw(t) {
      night();
      clouds(t * 260 * u, { alpha: 0.5, seed: 5, color: C.night2 });
      const s = track(t, [[0, 1], [2.4, 0.55]], 'heavy');
      parachute(TX, 900 * u, 480 * u * s, 1, C.cream, noise(t * 0.9, 3) * 0.1);
      clouds(t * 700 * u + 1200 * u, { alpha: remap(t, 2.2, 4.4, 0.25, 1), seed: 9, color: C.night3, scale: 1.4 });
      rain(t + 7, { n: 200, alpha: 0.45, speed: 3400 });
      const y = say('ชายคนหนึ่ง\nกระโดดลงไปในความมืด', TX, 1250 * u, t - 0.2, { size: 66 * u, color: C.cream, weight: 800 });
      say('กลางพายุฝน เหนือป่าทึบของวอชิงตัน', TX, y + 20 * u, t - 2.5, { size: 46 * u, color: C.fog, weight: 500 });
      finish();
    } },
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.7], [2.5, 'impact', 1.1], [3.2, 'type', 0.4]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22);
      g.translate(sx, sy);
      paper();
      // case folder
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 360 * u, 90 * u, 14 * u); g.fill();
      text(g, 'FBI · NORJAK', 250 * u, 472 * u, { size: 36 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 4 * u });
      g.restore();
      say('และไม่มีใครเห็นเขาอีกเลย', TX, 760 * u, t - 0.25, { size: 76 * u, weight: 800, color: C.ink });
      stamp('UNSOLVED', TX, 1080 * u, t - 2.5, { size: 150 * u, rot: -0.12 });
      say('คดีจี้เครื่องบินในสหรัฐฯ คดีเดียว\nที่ยังไม่เคยคลี่คลาย', TX, 1370 * u, t - 3.2, { size: 46 * u, weight: 600, color: C.inkSoft });
      finish(0.7);
    } },
];
