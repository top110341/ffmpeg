// Chapter 6 — manhunt, the name, the copycats (1:45–2:05, bars 42–50).
import { g, u, L, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash,
  night, paper, finish, say, big, kicker, map, pin, path, planeTop, planeSide, stamp, proj, PLACE, rrect, text, topScrim, measure } from './kit.js';

const T0 = bar(42);

export default () => [
  // S24 — Reno, empty cabin
  { from: T0, to: T0 + bar(2), cues: [[0, 'whoosh', 0.6], [1.4, 'pop', 0.7], [2.5, 'impact', 0.9]],
    draw(t) {
      const cam = { lat: 43.5, lon: -121.2, z: 105 * u };
      const P = map(cam, { river: 1 });
      topScrim();
      pin(...P(PLACE.sea), 0.5, { label: 'ซีแอตเทิล', side: 1 });
      const pts = [P(PLACE.sea), P(PLACE.ariel), P([44.0, -121.6]), P([41.5, -120.6]), P(PLACE.reno)];
      const h = path(pts, remap(t, 0, 1.4), { color: C.red, width: 5 * u, dash: [14 * u, 12 * u] });
      if (t < 1.4) planeTop(h.x, h.y, 50 * u, h.ang + Math.PI / 2, C.cream);
      pin(...P(PLACE.reno), t - 1.4, { label: 'รีโน', side: 1 });
      kicker('เครื่องลงจอดที่รีโน เนวาดา', TX, 250 * u, t, { color: C.red });
      if (t > 2.5) {
        g.fillStyle = 'rgba(10,16,28,0.7)'; g.fillRect(0, 0, W, H);
        stamp('EMPTY', TX, 1000 * u, t - 2.5, { size: 150 * u, rot: 0.08, color: C.red });
      }
      say('เขาไม่อยู่บนเครื่องแล้ว', TX, 1300 * u, t - 2.7, { size: 60 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // S25 — the search grid
  { from: T0 + bar(2), to: T0 + bar(4), cues: Array.from({ length: 8 }, (_, i) => [0.3 + i * BEAT * 0.5, 'tick', 0.4]),
    draw(t) {
      const cam = { lat: 45.95, lon: -122.55, z: 2600 * u };
      map(cam, { river: 1 });
      topScrim();
      // trees
      g.fillStyle = '#0E1A1A';
      for (let i = 0; i < 260; i++) { const x = hash(i, 31) * W, y = 520 * u + hash(i, 32) * 900 * u; g.beginPath(); g.moveTo(x, y - 26 * u); g.lineTo(x + 12 * u, y); g.lineTo(x - 12 * u, y); g.fill(); }
      const cols = 6, rows = 6, cw = 140 * u, x0 = TX - cols * cw / 2, y0 = 520 * u;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const k = r * cols + c, at = 0.2 + hash(k, 41) * 3.6;
        g.strokeStyle = C.fog; g.globalAlpha = 0.35; g.lineWidth = 2 * u; g.strokeRect(x0 + c * cw, y0 + r * cw, cw, cw); g.globalAlpha = 1;
        const p = clamp((t - at) / 0.2);
        if (p > 0) {
          g.fillStyle = C.fog; g.globalAlpha = 0.18 * p; g.fillRect(x0 + c * cw, y0 + r * cw, cw, cw); g.globalAlpha = 1;
          g.strokeStyle = C.red; g.lineWidth = 5 * u; const m = 40 * u, q = spring(t - at, 'snappy');
          g.beginPath(); g.moveTo(x0 + c * cw + m, y0 + r * cw + m); g.lineTo(x0 + c * cw + m + (cw - 2 * m) * q, y0 + r * cw + m + (cw - 2 * m) * q);
          g.moveTo(x0 + (c + 1) * cw - m, y0 + r * cw + m); g.lineTo(x0 + (c + 1) * cw - m - (cw - 2 * m) * q, y0 + r * cw + m + (cw - 2 * m) * q); g.stroke();
        }
      }
      kicker('จุดกระโดดโดยประมาณ', TX, 250 * u, t, { color: C.red });
      say('ค้นหาทั้งทางบกและทางอากาศ', TX, 350 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      say('ไม่พบร่องรอยอะไรเลย', TX, 1530 * u, t - 2.6, { size: 54 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  // S26 — "D. B." was a mistake
  { from: T0 + bar(4), to: T0 + bar(6), cues: [[0, 'thump', 0.6], [1.2, 'swish', 0.8], [1.6, 'type', 0.7]],
    draw(t) {
      paper();
      kicker('ชื่อบนตั๋วจริง', TX, 420 * u, t);
      const y = 860 * u, size = 190 * u;
      big('Dan Cooper', TX, y, t, { size, color: C.ink });
      const dw = measure(g, 'Dan', { size, weight: 400, family: SERIF }), full = measure(g, 'Dan Cooper', { size, weight: 400, family: SERIF });
      const sx = TX - full / 2, p = remap(t, 1.2, 1.5);
      g.strokeStyle = C.red; g.lineWidth = 14 * u; g.lineCap = 'round';
      if (p > 0) { g.beginPath(); g.moveTo(sx - 10 * u, y - size * 0.28); g.lineTo(sx - 10 * u + (dw + 20 * u) * p, y - size * 0.3); g.stroke(); }
      const q = spring(t - 1.6, 'playful');
      if (q > 0) { g.save(); g.translate(sx + dw / 2, y - size * 0.75); g.rotate(-0.12); g.scale(q, q); text(g, 'D. B.', 0, 0, { size: 150 * u, weight: 400, family: '"Instrument Serif"', color: C.red }); g.restore(); }
      say('ชื่อ “D. B. Cooper” เกิดจาก\nความสับสนของสื่อในวันนั้น', TX, 1170 * u, t - 2.5, { size: 54 * u, weight: 800 });
      finish(0.6);
    } },
  // S27 — copycats and the Cooper vane
  { from: T0 + bar(6), to: T0 + bar(8), cues: Array.from({ length: 6 }, (_, i) => [0.2 + i * BEAT * 0.5, 'pop', 0.4]).concat([[2.5, 'click', 0.9]]),
    draw(t) {
      paper();
      if (t < 2.5) {
        kicker('ปี 1972', TX, 330 * u, t);
        for (let i = 0; i < 15; i++) {
          const at = 0.2 + i * 0.12, s = spring(t - at, 'playful');
          if (s <= 0) continue;
          const c = i % 5, r = Math.floor(i / 5);
          planeTop(TX - 320 * u + c * 160 * u, 560 * u + r * 220 * u, 70 * u * s, 0, C.ink);
        }
        say('มีคนพยายามจี้เครื่องบิน\nเลียนแบบหลายราย', TX, 1250 * u, t - 0.8, { size: 52 * u, weight: 800 });
      } else {
        const k = t - 2.5;
        kicker('จึงเกิด “Cooper vane”', TX, 330 * u, k);
        // the 727 with its aft stair locked shut
        const ps = 440 * u, px = TX + 10 * u, py = 760 * u;
        planeSide(px, py, ps, { color: C.ink, stair: 0.35 * (1 - spring(k - 0.3, 'snappy')), windows: C.paper });
        const lx = px + 0.86 * ps - 70 * u, ly = py + 95 * u, ls = spring(k - 0.7, 'playful');
        if (ls > 0) {
          g.save(); g.translate(lx, ly); g.scale(ls, ls);
          g.strokeStyle = C.red; g.lineWidth = 12 * u; g.beginPath(); g.arc(0, -34 * u, 26 * u, Math.PI, 0); g.stroke();
          g.fillStyle = C.red; rrect(g, -42 * u, -36 * u, 84 * u, 70 * u, 10 * u); g.fill();
          g.fillStyle = C.paper; g.beginPath(); g.arc(0, -6 * u, 9 * u, 0, 7); g.fill(); g.fillRect(-4 * u, -6 * u, 8 * u, 22 * u);
          g.restore();
        }
        say('อุปกรณ์ล็อกบันไดท้าย\nไม่ให้เปิดได้ระหว่างบิน', TX, 1080 * u, k - 0.3, { size: 54 * u, weight: 800 });
        say('และสนามบินเริ่มตรวจค้นผู้โดยสาร', TX, 1330 * u, k - 1.2, { size: 44 * u, weight: 600, color: C.inkSoft });
      }
      finish(0.6);
    } },
];

