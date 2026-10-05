// Chapter 3 — the note (0:35–0:55, bars 14–22).
import { g, u, L, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, map, pin, path, planeTop, PLACE, rrect, text, topScrim, typewriter, stamp } from './kit.js';

const T0 = bar(14);

export default () => [
  // S9 — PDX → SEA
  { from: T0, to: T0 + bar(2), cues: [[0.2, 'pop', 0.5], [0.4, 'whoosh', 0.6], [3.7, 'pop', 0.6]],
    draw(t) {
      const cam = { lat: 46.3, lon: -122.45, z: track(t, [[0, 380], [0.01, 470]], 'heavy') * u };
      const P = map(cam, { river: 1 });
      topScrim();
      pin(...P(PLACE.pdx), t - 0.2, { label: 'พอร์ตแลนด์', side: -1 });
      pin(...P(PLACE.sea), t - 3.7, { label: 'ซีแอตเทิล', side: -1 });
      const pts = [P(PLACE.pdx), P([46.1, -122.75]), P([46.9, -122.6]), P(PLACE.sea)];
      const h = path(pts, remap(t, 0.5, 3.8), { color: C.red, width: 5 * u, dash: [14 * u, 12 * u] });
      planeTop(h.x, h.y, 70 * u, h.ang + Math.PI / 2, C.cream);
      kicker('14:50 · ขึ้นบิน', TX, 250 * u, t, { color: C.red });
      say('ผู้โดยสารราว 36 คน · ลูกเรือ 6 คน', TX, 345 * u, t - 0.4, { size: 54 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // S10 — the note crosses the aisle
  { from: T0 + bar(2), to: T0 + bar(3), cues: [[0, 'swish', 0.8]],
    draw(t) {
      night(C.night2);
      // cabin: windows down the wall, seat backs in the foreground
      g.fillStyle = C.night3;
      for (let i = 0; i < 4; i++) { rrect(g, 90 * u + i * 250 * u, 330 * u, 120 * u, 170 * u, 56 * u); g.fill(); }
      g.fillStyle = C.night;
      for (let i = 0; i < 3; i++) { rrect(g, -60 * u + i * 420 * u, 1500 * u, 360 * u, 520 * u, 60 * u); g.fill(); }
      const x = track(t, [[0, -300 * u], [0.02, TX]], 'default'), r = track(t, [[0, -0.6], [0.02, 0.08]], 'default');
      g.save(); g.translate(x, 860 * u); g.rotate(r);
      g.fillStyle = C.paper; rrect(g, -200 * u, -130 * u, 400 * u, 260 * u, 6 * u); g.fill();
      g.strokeStyle = C.paper3; g.lineWidth = 3 * u; g.beginPath(); g.moveTo(-200 * u, 0); g.lineTo(200 * u, 0); g.stroke();
      g.restore();
      say('เขายื่นโน้ตให้พนักงานต้อนรับ', TX, 1240 * u, t - 0.15, { size: 56 * u, weight: 800, color: C.cream });
      say('เธอนึกว่าเป็นเบอร์โทรจีบ จึงเก็บไว้โดยไม่เปิดอ่าน', TX, 1350 * u, t - 1.1, { size: 42 * u, weight: 500, color: C.fog });
      finish(0.8);
    } },
  // S11 — the note opens
  { from: T0 + bar(3), to: T0 + bar(5), cues: [[0, 'whoosh', 0.4], [0.6, 'type', 0.6], [2.5, 'thump', 0.9]],
    draw(t) {
      night(C.night2);
      kicker('ข้อความในโน้ต (ถอดความ)', TX, 300 * u, t, { color: C.red });
      const sy = Math.max(0.04, spring(t - 0.05, 'heavy'));
      g.save(); g.translate(TX, 800 * u); g.scale(1, sy); g.rotate(0.02);
      g.fillStyle = C.paper; rrect(g, -380 * u, -300 * u, 760 * u, 600 * u, 8 * u); g.fill();
      g.strokeStyle = C.paper3; g.lineWidth = 3 * u; g.beginPath(); g.moveTo(-380 * u, 0); g.lineTo(380 * u, 0); g.stroke();
      g.restore();
      if (sy > 0.9) {
        typewriter('ฉันมีระเบิด', TX - 300 * u, 720 * u, t - 0.6, { size: 96 * u, weight: 800, color: C.ink, cps: 12 });
        typewriter('อยู่ในกระเป๋า', TX - 300 * u, 860 * u, t - 1.5, { size: 72 * u, weight: 600, color: C.ink, cps: 14 });
        const p = remap(t, 2.5, 2.9);
        g.fillStyle = C.red; g.fillRect(TX - 300 * u, 745 * u, 520 * u * p, 9 * u);
      }
      say('เขาบอกให้เธอ นั่งลงข้าง ๆ เขา', TX, 1300 * u, t - 2.7, { size: 52 * u, weight: 700, color: C.cream });
      finish(0.8);
    } },
  // S12 — x-ray of the briefcase
  { from: T0 + bar(5), to: T0 + bar(5) + 6 * BEAT, cues: [[0, 'riser', 0.4], [3.0, 'thump', 0.7]],
    draw(t) {
      night('#060A12');
      kicker('เขาแง้มกระเป๋าให้ดู', TX, 300 * u, t, { color: C.red });
      const cx = TX, cy = 820 * u, bw = 760 * u, bh = 480 * u;
      g.save(); g.strokeStyle = C.fog; g.lineWidth = 4 * u;
      rrect(g, cx - bw / 2, cy - bh / 2, bw, bh, 22 * u); g.stroke();
      rrect(g, cx - 80 * u, cy - bh / 2 - 60 * u, 160 * u, 70 * u, 18 * u); g.stroke();
      const scan = cy - bh / 2 + bh * remap(t, 0.3, 2.4);
      g.beginPath(); g.rect(cx - bw / 2, cy - bh / 2, bw, scan - (cy - bh / 2)); g.clip();
      for (let i = 0; i < 8; i++) {
        const x = cx - 320 * u + (i % 4) * 78 * u, y = cy - 170 * u + Math.floor(i / 4) * 170 * u;
        g.fillStyle = C.red; rrect(g, x, y, 56 * u, 150 * u, 26 * u); g.fill();
      }
      g.fillStyle = C.fog; rrect(g, cx + 90 * u, cy - 40 * u, 220 * u, 130 * u, 10 * u); g.fill();
      g.strokeStyle = C.cream; g.lineWidth = 4 * u;
      for (let i = 0; i < 4; i++) {
        g.beginPath(); g.moveTo(cx - 290 * u + i * 78 * u, cy - 170 * u);
        g.bezierCurveTo(cx - 200 * u + i * 40 * u, cy - 260 * u, cx + 40 * u, cy - 220 * u + i * 30 * u, cx + 120 * u + i * 40 * u, cy - 40 * u); g.stroke();
      }
      g.restore();
      g.fillStyle = C.cream; g.globalAlpha = 0.85; g.fillRect(cx - bw / 2 - 20 * u, scan - 2 * u, bw + 40 * u, 4 * u); g.globalAlpha = 1;
      say('แท่งสีแดง · สายไฟ · แบตเตอรี่', TX, 1250 * u, t - 2.2, { size: 54 * u, weight: 800, color: C.cream });
      say('ระเบิดจริงหรือไม่ ไม่มีใครรู้จนวันนี้', TX, 1360 * u, t - 3.0, { size: 42 * u, weight: 500, color: C.fog });
      finish(0.8);
    } },
  // S13 — the demands
  { from: T0 + bar(5) + 6 * BEAT, to: T0 + bar(8), cues: [[0.3, 'click', 0.8], [0.3 + 2 * BEAT, 'click', 0.8], [0.3 + 4 * BEAT, 'click', 0.8]],
    draw(t) {
      paper();
      kicker('ข้อเรียกร้อง', TX, 330 * u, t);
      const rows = [['$200,000', 'ธนบัตรอเมริกัน'], ['ร่มชูชีพ 4 ใบ', 'ชุดหลัก 2 · ชุดสำรอง 2'], ['รถเติมน้ำมัน', 'รออยู่ที่ซีแอตเทิล']];
      rows.forEach(([a, b], i) => {
        const at = 0.3 + i * 2 * BEAT, y = 560 * u + i * 260 * u, x = 130 * u;
        const s = spring(t - at + 0.15, 'snappy');
        g.save(); g.globalAlpha = clamp((t - at + 0.15) / 0.12);
        g.strokeStyle = C.ink; g.lineWidth = 5 * u; rrect(g, x, y - 70 * u, 90 * u, 90 * u, 10 * u); g.stroke();
        const p = remap(t, at, at + 0.25);
        if (p > 0) {
          g.strokeStyle = C.red; g.lineWidth = 12 * u; g.lineCap = 'round';
          g.beginPath(); g.moveTo(x + 14 * u, y - 30 * u);
          const m = [x + 38 * u, y - 4 * u], e = [x + 98 * u, y - 96 * u];
          if (p < 0.4) { const q = p / 0.4; g.lineTo(x + 14 * u + (m[0] - x - 14 * u) * q, y - 30 * u + (m[1] - y + 30 * u) * q); }
          else { const q = (p - 0.4) / 0.6; g.lineTo(...m); g.lineTo(m[0] + (e[0] - m[0]) * q, m[1] + (e[1] - m[1]) * q); }
          g.stroke();
        }
        g.translate((1 - s) * 60 * u, 0);
        text(g, a, x + 140 * u, y, { size: i === 0 ? 110 * u : 72 * u, weight: i === 0 ? 400 : 800, family: i === 0 ? SERIF : THAI, color: C.ink, align: 'left' });
        text(g, b, x + 142 * u, y + 60 * u, { size: 36 * u, weight: 500, family: THAI, color: C.inkSoft, align: 'left' });
        g.restore();
      });
      finish(0.6);
    } },
];
