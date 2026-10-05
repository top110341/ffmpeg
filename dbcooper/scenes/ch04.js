// Chapter 4 — the swap at Seattle (0:55–1:20, bars 22–32).
import { g, u, L, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash,
  night, paper, finish, say, big, kicker, map, pin, planeTop, planeSide, person, banknote, serial, PLACE, rrect, text, topScrim } from './kit.js';

const T0 = bar(22);
export const SERIALS = Array.from({ length: 60 }, (_, i) => serial(i));
export const HIT = 31;                       // the row that the 1980 money matches in chapter 7

function clock(x, y, r, minutes, o = {}) {
  const { face = C.night2, ink = C.cream } = o;
  g.save(); g.translate(x, y);
  g.fillStyle = face; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill();
  g.strokeStyle = ink; g.lineWidth = 4 * u; g.beginPath(); g.arc(0, 0, r, 0, 7); g.stroke();
  for (let i = 0; i < 12; i++) { g.save(); g.rotate(i * Math.PI / 6); g.fillStyle = ink; g.fillRect(-2 * u, -r + 10 * u, 4 * u, (i % 3 ? 14 : 26) * u); g.restore(); }
  const hand = (a, len, w, c) => { g.save(); g.rotate(a); g.fillStyle = c; rrect(g, -w / 2, -len, w, len + 12 * u, w / 2); g.fill(); g.restore(); };
  hand((minutes / 720) * Math.PI * 2, r * 0.55, 10 * u, ink);
  hand((minutes / 60) * Math.PI * 2, r * 0.82, 6 * u, C.red);
  g.fillStyle = C.red; g.beginPath(); g.arc(0, 0, 9 * u, 0, 7); g.fill();
  g.restore();
}

export default () => [
  // S14 — circling over Puget Sound for ~2 hours
  { from: T0, to: T0 + bar(2), cues: [0, 1, 2, 3, 4, 5, 6, 7].map((i) => [i * BEAT, 'tick', 0.45]).concat([[0, 'whoosh', 0.5]]),
    draw(t) {
      const cam = { lat: 47.42, lon: -122.48, z: track(t, [[0, 1500], [0.01, 1100]], 'heavy') * u };
      const P = map(cam, { river: 0 });
      topScrim();
      pin(...P(PLACE.sea), t - 0.2, { label: 'ซีแอตเทิล', side: 1 });
      const [ox, oy] = P([47.42, -122.48]), rx = 250 * u, ry = 170 * u, a = t * 1.7;
      g.save(); g.strokeStyle = C.red; g.lineWidth = 4 * u; g.setLineDash([12 * u, 12 * u]); g.globalAlpha = 0.7;
      g.beginPath(); g.ellipse(ox, oy, rx, ry, 0, a - 2.2, a); g.stroke(); g.restore();
      const px = ox + Math.cos(a) * rx, py = oy + Math.sin(a) * ry;
      planeTop(px, py, 60 * u, Math.atan2(Math.cos(a) * ry, -Math.sin(a) * rx) + Math.PI / 2, C.cream);
      kicker('ระหว่างที่ FBI รวบรวมเงิน', TX, 250 * u, t, { color: C.red });
      say('เครื่องบินวนอยู่เหนือน่านฟ้าซีแอตเทิล', TX, 345 * u, t - 0.3, { size: 54 * u, weight: 800, color: C.cream });
      clock(TX, 1300 * u, 130 * u, 15 * 60 + 20 + track(t, [[0, 0], [0.3, 140]], 'heavy'));
      text(g, 'เกือบ 2 ชั่วโมง', TX, 1510 * u, { size: 50 * u, weight: 800, family: THAI, color: C.cream, alpha: clamp((t - 1.2) / 0.2) });
      finish(0.8);
    } },
  // S15 — 10,000 twenty-dollar bills
  { from: T0 + bar(2), to: T0 + bar(4), cues: Array.from({ length: 8 }, (_, i) => [0.25 + i * BEAT * 0.5, 'pop', 0.4]).concat([[3.75, 'chime', 0.5]]),
    draw(t) {
      paper();
      kicker('เงินค่าไถ่', TX, 300 * u, t);
      for (let i = 0; i < 16; i++) {
        const at = 0.1 + i * BEAT * 0.25, s = spring(t - at, 'snappy');
        if (s <= 0) continue;
        const x = TX + (hash(i, 3) - 0.5) * 180 * u, y = 900 * u - i * 14 * u;
        banknote(x, y - (1 - s) * 700 * u, 620 * u, (hash(i, 4) - 0.5) * 0.35, { seed: i });
      }
      const n = Math.round(10000 * clamp(spring(t - 0.2, 40, 13)));
      text(g, `${n.toLocaleString('en-US')} ใบ`, TX, 1250 * u, { size: 150 * u, weight: 400, family: SERIF, color: C.ink, alpha: clamp((t - 0.2) / 0.1) });
      say('ธนบัตรใบละ $20 · รวม $200,000', TX, 1370 * u, t - 1.2, { size: 50 * u, weight: 700 });
      finish(0.6);
    } },
  // S16 — every serial number on microfilm
  { from: T0 + bar(4), to: T0 + bar(6), cues: [[0, 'whoosh', 0.4], [3.4, 'click', 0.8]],
    draw(t) {
      night();
      const rowH = 64 * u, scroll = track(t, [[0, 0], [0.05, HIT * rowH]], 60, 16);
      g.save(); g.beginPath(); g.rect(0, 520 * u, W, 820 * u); g.clip();
      for (let i = 0; i < SERIALS.length; i++) {
        const y = 930 * u + i * rowH - scroll;
        if (y < 450 * u || y > 1420 * u) continue;
        const hot = i === HIT && t > 3.4;
        text(g, SERIALS[i], TX - 200 * u, y, { size: 44 * u, weight: 700, family: 'Inter, sans-serif', color: hot ? C.red : C.fog, align: 'left', tracking: 4 * u });
        text(g, '$20', TX + 210 * u, y, { size: 44 * u, weight: 400, family: SERIF, color: hot ? C.red : C.night3, align: 'left' });
      }
      g.restore();
      g.strokeStyle = C.red; g.lineWidth = 3 * u; g.strokeRect(100 * u, 930 * u - 50 * u, W - 260 * u, 68 * u);
      kicker('ก่อนส่งมอบเงิน', TX, 270 * u, t, { color: C.red });
      say('FBI ถ่ายไมโครฟิล์มเลขธนบัตรไว้ทุกใบ', TX, 365 * u, t - 0.3, { size: 52 * u, weight: 800, color: C.cream });
      text(g, '* เลขในภาพเป็นตัวอย่าง', TX, 1480 * u, { size: 30 * u, weight: 500, family: THAI, color: C.fog, alpha: 0.7 });
      finish(0.8);
    } },
  // S17 — landing at Sea-Tac, passengers walk off
  { from: T0 + bar(6), to: T0 + bar(8), cues: [[0, 'whoosh', 0.8], [0.9, 'thump', 0.6], [1.6, 'swish', 0.4]],
    draw(t) {
      night(C.night);
      const gy = 1000 * u;
      g.fillStyle = C.night2; g.fillRect(0, gy + 40 * u, W, H - gy);
      g.strokeStyle = C.fog; g.globalAlpha = 0.4; g.setLineDash([60 * u, 50 * u]); g.lineWidth = 6 * u;
      g.beginPath(); g.moveTo(0, gy + 120 * u); g.lineTo(W, gy + 120 * u); g.stroke(); g.setLineDash([]); g.globalAlpha = 1;
      const x = track(t, [[0, W + 700 * u], [0.02, TX + 40 * u]], 'heavy');
      planeSide(x, gy, 470 * u, { color: C.cream, windows: C.night2 });
      // 36 passengers leave through the front door and walk off left
      for (let i = 0; i < 36; i++) {
        const at = 1.4 + i * 0.07, k = t - at;
        if (k < 0) continue;
        const px = x - 380 * u - k * 260 * u - (i % 3) * 14 * u, py = gy + 60 * u + Math.min(k * 3, 1) * 40 * u + (i % 3) * 12 * u;
        if (px < -40 * u) continue;
        g.fillStyle = C.cream; g.beginPath(); g.arc(px, py - 22 * u, 9 * u, 0, 7); g.fill(); g.fillRect(px - 7 * u, py - 12 * u, 14 * u, 28 * u);
      }
      kicker('17:39 · ลงจอดที่ซีแอตเทิล', TX, 300 * u, t, { color: C.red });
      say('รับเงินกับร่มชูชีพ', TX, 400 * u, t - 0.4, { size: 58 * u, weight: 800, color: C.cream });
      say('แลกกับปล่อยผู้โดยสารทั้งหมด', TX, 1350 * u, t - 2.5, { size: 52 * u, weight: 700, color: C.cream });
      finish(0.8);
    } },
  // S18 — four crew stay aboard with him
  { from: T0 + bar(8), to: T0 + bar(10), cues: [[0.3, 'pop', 0.5], [0.55, 'pop', 0.5], [0.8, 'pop', 0.5], [1.05, 'pop', 0.5], [2.5, 'thump', 0.9]],
    draw(t) {
      night(C.night);
      const s = 470 * u, x = TX + 30 * u, y = 860 * u;
      g.save(); g.globalAlpha = 0.4; planeSide(x, y, s, { color: C.fog }); g.restore();
      const crew = [['นักบิน', -0.86, 0.3], ['ผู้ช่วยนักบิน', -0.8, 0.55], ['วิศวกรการบิน', -0.74, 0.8], ['พนักงานต้อนรับ', -0.6, 1.05]];
      crew.forEach(([lab, px, at], i) => {
        const p = spring(t - at, 'playful'); if (p <= 0) return;
        person(x + px * s + i * 22 * u, y + 10 * u, 44 * u * p, C.cream);
        const ly = 560 * u + i * 70 * u;
        g.strokeStyle = C.fog; g.lineWidth = 2 * u; g.globalAlpha = clamp((t - at) / 0.2);
        g.beginPath(); g.moveTo(x + px * s + i * 12 * u, y - 40 * u); g.lineTo(x + px * s + i * 12 * u, ly + 12 * u); g.lineTo(130 * u + 330 * u, ly + 12 * u); g.stroke(); g.globalAlpha = 1;
        text(g, lab, 130 * u, ly, { size: 40 * u, weight: 700, family: THAI, color: C.cream, align: 'left', alpha: clamp((t - at) / 0.2) });
      });
      const q = spring(t - 2.5, 'playful');
      if (q > 0) { person(x + 0.62 * s, y + 10 * u, 44 * u * q, C.red); text(g, '?', x + 0.62 * s, y - 70 * u, { size: 90 * u, weight: 400, family: SERIF, color: C.red, alpha: q }); }
      say('เหลือลูกเรือ 4 คน', TX, 1250 * u, t - 0.6, { size: 64 * u, weight: 800, color: C.cream });
      say('…กับชายในที่นั่ง 18C', TX, 1360 * u, t - 2.6, { size: 52 * u, weight: 700, color: C.red });
      finish(0.8);
    } },
];
