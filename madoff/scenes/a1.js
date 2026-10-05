// Bernie Madoff — Act 1: 0:00–1:25 (bars 0–34). The respected man, the promise, how a Ponzi scheme works.
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake } from './kit.js';

export const GREEN = '#2F8F5B', GOLD = '#C9A94A', NAVY = '#14213D', INTER = 'Inter, sans-serif';
export const fmt = (n) => Math.round(n).toLocaleString('en-US');

// ---------------------------------------------------------------- data series (deterministic)
// the reported fund: up every month, almost no dips
export function smooth(n, seed = 1) { const v = [100]; for (let i = 1; i < n; i++) v.push(v[i - 1] * (1.007 + hash(i, seed) * 0.004 - (hash(i, seed + 9) > 0.95 ? 0.006 : 0))); return v; }
// a real market: noisy walk with crashes
export function market(n, seed = 4, vol = 0.08) { const v = [100]; for (let i = 1; i < n; i++) v.push(v[i - 1] * (1 + (hash(i, seed) - 0.46) * vol)); return v; }

// line chart in box (x, y, w, h); p = draw progress 0..1. Returns the head {x, y}.
export function lineChart(x, y, w, h, vals, p, o = {}) {
  const { color = GREEN, width = 7 * u, axis = C.inkSoft, lo = Math.min(...vals), hi = Math.max(...vals), grid = true, area = null, dot = true } = o;
  g.save(); g.strokeStyle = axis; g.lineWidth = 3 * u; g.globalAlpha = 0.6;
  g.beginPath(); g.moveTo(x, y); g.lineTo(x, y + h); g.lineTo(x + w, y + h); g.stroke();
  if (grid) { g.globalAlpha = 0.15; for (let k = 1; k < 4; k++) { g.beginPath(); g.moveTo(x, y + (h * k) / 4); g.lineTo(x + w, y + (h * k) / 4); g.stroke(); } }
  g.restore();
  const pts = vals.map((v, i) => [x + (i / (vals.length - 1)) * w, y + h - ((v - lo) / (hi - lo)) * h]);
  if (area && p > 0) { const k = Math.max(1, Math.floor(clamp(p) * (pts.length - 1)));
    g.save(); g.fillStyle = area; g.beginPath(); g.moveTo(pts[0][0], y + h); for (let i = 0; i <= k; i++) g.lineTo(pts[i][0], pts[i][1]); g.lineTo(pts[k][0], y + h); g.closePath(); g.fill(); g.restore(); }
  const head = path(pts, p, { color, width });
  if (dot && p > 0) { g.fillStyle = color; g.beginPath(); g.arc(head.x, head.y, width * 1.6, 0, 7); g.fill(); }
  return head;
}

// ---------------------------------------------------------------- scenery & props
// classical exchange facade with columns, frieze and steps
export function facade(o = {}) {
  const { dark = 0, base = 1400 * u, x0 = 120 * u, w = W - 240 * u, n = 6, top = 700 * u, label = 'WALL STREET' } = o;
  const stone = dark ? '#2B303B' : '#DDD2B8', shade = dark ? '#12151C' : '#A5977A', line = dark ? '#0B0D12' : '#7D6F55';
  g.save();
  g.fillStyle = shade; g.fillRect(x0, top + 100 * u, w, base - top - 160 * u);
  g.fillStyle = stone; g.strokeStyle = line; g.lineWidth = 5 * u;
  g.beginPath(); g.moveTo(x0 - 40 * u, top); g.lineTo(x0 + w / 2, top - 190 * u); g.lineTo(x0 + w + 40 * u, top); g.closePath(); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(x0 + 60 * u, top - 22 * u); g.lineTo(x0 + w / 2, top - 150 * u); g.lineTo(x0 + w - 60 * u, top - 22 * u); g.closePath(); g.stroke();
  g.fillRect(x0 - 50 * u, top, w + 100 * u, 100 * u); g.strokeRect(x0 - 50 * u, top, w + 100 * u, 100 * u);
  if (label) text(g, label, x0 + w / 2, top + 68 * u, { size: 46 * u, weight: 400, family: SERIF, color: line, tracking: 12 * u });
  const cw = (w / n) * 0.5;
  for (let i = 0; i < n; i++) {
    const cx = x0 + (i + 0.5) * (w / n);
    g.fillStyle = stone; g.fillRect(cx - cw / 2, top + 100 * u, cw, base - top - 160 * u);
    g.fillRect(cx - cw / 2 - 14 * u, top + 100 * u, cw + 28 * u, 26 * u);
    g.fillRect(cx - cw / 2 - 14 * u, base - 86 * u, cw + 28 * u, 26 * u);
    g.strokeStyle = line; g.globalAlpha = 0.35; g.lineWidth = 3 * u;
    for (let k = 1; k < 4; k++) { const fx = cx - cw / 2 + (k * cw) / 4; g.beginPath(); g.moveTo(fx, top + 136 * u); g.lineTo(fx, base - 94 * u); g.stroke(); }
    g.globalAlpha = 1;
  }
  for (let k = 0; k < 3; k++) { const sx = x0 - 60 * u - k * 30 * u, sw = w + 120 * u + k * 60 * u, sy = base - 60 * u + k * 30 * u;
    g.fillStyle = stone; g.fillRect(sx, sy, sw, 30 * u); g.strokeStyle = line; g.lineWidth = 3 * u; g.strokeRect(sx, sy, sw, 30 * u); }
  g.restore();
}
// the oval, stepped "Lipstick Building" tower; floor `hi` glows
export function tower(cx, base, o = {}) {
  const { floors = 34, fh = 27 * u, hi = 17, glow = 1 } = o;
  const hw = (f) => (f < 22 ? 220 : f < 28 ? 185 : 150) * u;
  for (const [a, b] of [[0, 22], [22, 28], [28, 34]]) {
    const y0 = base - b * fh, y1 = base - a * fh, w = hw(a);
    g.fillStyle = '#5E322B'; g.fillRect(cx - w, y0, 2 * w, y1 - y0);
    g.fillStyle = '#7E453B'; g.beginPath(); g.ellipse(cx, y0, w, 22 * u, 0, 0, 7); g.fill();
  }
  for (let f = 0; f < floors; f++) {
    const w = hw(f), y = base - (f + 1) * fh + 6 * u, lit = f === hi - 1;
    g.fillStyle = lit ? `rgba(233,198,107,${0.25 + 0.75 * glow})` : '#24130F';
    g.fillRect(cx - w + 12 * u, y, 2 * w - 24 * u, fh - 12 * u);
    if (!lit) { g.fillStyle = 'rgba(233,198,107,0.5)'; for (let k = 0; k < 6; k++) if (hash(f * 6 + k, 3) > 0.82) g.fillRect(cx - w + 20 * u + k * ((2 * w - 40 * u) / 6), y + 2 * u, 30 * u, fh - 16 * u); }
  }
  g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(cx + 60 * u, base - 34 * fh, 160 * u, 34 * fh);
}
export function coin(x, y, r, a = 1) {
  if (a <= 0) return;
  g.save(); g.globalAlpha *= a;
  g.fillStyle = GOLD; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
  g.strokeStyle = '#8A6F22'; g.lineWidth = r * 0.14; g.beginPath(); g.arc(x, y, r * 0.72, 0, 7); g.stroke();
  text(g, '$', x, y + r * 0.38, { size: r * 1.05, weight: 800, family: INTER, color: '#6E5716' });
  g.restore();
}
// Ponzi pyramid: row 0 (top) = earliest investors, last row = newest. Coins climb from each row to the one above.
// appear = local time rows start popping in; drain 0..1 empties rows from the bottom up.
export function pyramid(cx, top, t, o = {}) {
  const { rows = 5, gap = 160 * u, sp = 140 * u, s = 44 * u, color = C.ink, appear = 0, drain = 0, fresh = C.red, dash = C.inkSoft } = o;
  const P = (r, i) => [cx + (i - r / 2) * sp, top + r * gap];
  const live = rows - drain * rows;
  for (let r = 1; r < rows; r++) {
    if (t < appear + r * 0.45 + 0.4 || r >= live) continue;
    for (let k = 0; k <= r; k++) {
      const ph = (t * 0.8 + hash(k + r * 7, 3)) % 1;
      const [ax, ay] = P(r, k), [bx, by] = P(r - 1, Math.min(r - 1, Math.round((k * (r - 1)) / r)));
      coin(ax + (bx - ax) * ph, ay - s * 0.9 + (by - ay) * ph - Math.sin(ph * Math.PI) * 30 * u, 15 * u, Math.sin(ph * Math.PI));
    }
  }
  for (let r = 0; r < rows; r++) {
    const sc = clamp(spring(t - appear - r * 0.45, 'playful')); if (sc <= 0) continue;
    for (let i = 0; i <= r; i++) {
      const [x, y] = P(r, i);
      if (r >= live) { g.save(); g.setLineDash([8 * u, 8 * u]); g.strokeStyle = dash; g.lineWidth = 3 * u; g.globalAlpha = 0.7;
        g.beginPath(); g.arc(x, y - s * 1.15, s * 0.4, 0, 7); g.stroke(); g.restore(); continue; }
      person(x, y, s * sc, r === rows - 1 ? fresh : color);
    }
  }
}
// a client account statement
export function statement(x, y, w, rot = 0, o = {}) {
  const { amount = '', seed = 1 } = o, h = w * 1.3;
  g.save(); g.translate(x, y); g.rotate(rot);
  g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(-w / 2 + 8 * u, -h / 2 + 10 * u, w, h);
  g.fillStyle = '#F4EFE2'; g.fillRect(-w / 2, -h / 2, w, h);
  g.fillStyle = NAVY; g.fillRect(-w / 2, -h / 2, w, h * 0.1);
  text(g, 'ACCOUNT STATEMENT', 0, -h / 2 + h * 0.068, { size: h * 0.045, weight: 700, family: INTER, color: '#F4EFE2', tracking: 2 * u });
  g.fillStyle = '#A39C8C';
  for (let i = 0; i < 9; i++) { const yy = -h / 2 + h * 0.18 + i * h * 0.06; g.fillRect(-w * 0.42, yy, w * (0.3 + hash(i, seed) * 0.2), h * 0.014); g.fillRect(w * 0.2, yy, w * 0.22, h * 0.014); }
  g.fillStyle = C.ink; g.fillRect(-w * 0.42, h * 0.3, w * 0.84, Math.max(1, h * 0.006));
  text(g, 'BALANCE', -w * 0.42, h * 0.4, { size: h * 0.045, weight: 700, family: INTER, color: C.inkSoft, align: 'left' });
  if (amount) text(g, amount, w * 0.42, h * 0.4, { size: h * 0.055, weight: 700, family: INTER, color: GREEN, align: 'right' });
  g.restore();
}
// judge's gavel; ang 0 = head resting on the block, ~0.7 = raised
export function gavel(x, y, s, ang = 0) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = '#4A2E1A'; g.beginPath(); g.ellipse(0.1, 0.56, 0.55, 0.12, 0, 0, 7); g.fill(); g.fillRect(-0.45, 0.42, 1.1, 0.14);
  g.fillStyle = '#7A5232'; g.beginPath(); g.ellipse(0.1, 0.42, 0.55, 0.12, 0, 0, 7); g.fill();
  g.save(); g.translate(1.05, 0.1); g.rotate(ang);
  g.fillStyle = '#8A5E3A'; g.fillRect(-0.95, -0.035, 1.0, 0.07);
  g.fillStyle = '#5A3820'; rrect(g, -1.15, -0.2, 0.32, 0.4, 0.05); g.fill();
  g.fillStyle = '#C9A94A'; g.fillRect(-1.15, -0.12, 0.32, 0.04); g.fillRect(-1.15, 0.08, 0.32, 0.04);
  g.restore(); g.restore();
}
// prison bars growing down with p
export function bars(x0, y0, w, h, p = 1, color = '#2A2D33') {
  g.fillStyle = color; const n = 8;
  for (let i = 0; i < n; i++) { const x = x0 + (i + 0.5) * (w / n) - 10 * u; g.fillRect(x, y0, 20 * u, h * clamp(p * 1.4 - i * 0.05)); }
  g.fillRect(x0, y0, w, 24 * u); g.fillRect(x0, y0 + h * 0.5, w * clamp(p), 20 * u);
}
// arrow from (x0,y0) to (x1,y1)
export function arrow(x0, y0, x1, y1, color, width = 10 * u, p = 1) {
  if (p <= 0) return;
  const x = x0 + (x1 - x0) * p, y = y0 + (y1 - y0) * p, a = Math.atan2(y1 - y0, x1 - x0), hd = width * 3;
  g.save(); g.strokeStyle = color; g.fillStyle = color; g.lineWidth = width; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x0, y0); g.lineTo(x - Math.cos(a) * hd * 0.6, y - Math.sin(a) * hd * 0.6); g.stroke();
  g.beginPath(); g.moveTo(x, y); g.lineTo(x - Math.cos(a - 0.45) * hd, y - Math.sin(a - 0.45) * hd); g.lineTo(x - Math.cos(a + 0.45) * hd, y - Math.sin(a + 0.45) * hd); g.closePath(); g.fill();
  g.restore();
}

export default () => [
  // ---------------- Chapter 1 — the hook
  { from: bar(0), to: bar(2), cues: [[0, 'whoosh', 0.6]].concat(Array.from({ length: 6 }, (_, i) => [0.2 + i * 0.2, 'tick', 0.4])).concat([[1.6, 'impact', 1.0]]),
    draw(t) {
      const [sx, sy] = shake(t, 1.6, 20); g.translate(sx, sy);
      night('#0B0F14');
      for (let i = 0; i < 7; i++) { const s = spring(t - 0.05 - i * 0.12, 'default');
        statement(TX + (hash(i, 2) - 0.5) * 560 * u, 920 * u + (hash(i, 4) - 0.5) * 260 * u - (1 - s) * 1300 * u, 330 * u, (hash(i, 3) - 0.5) * 0.7, { amount: `$${fmt(1e6 + hash(i, 5) * 9e6)}`, seed: i }); }
      g.fillStyle = 'rgba(11,15,20,0.82)'; g.fillRect(0, 300 * u, W, 210 * u);
      const n = 64.8e9 * clamp(spring(t - 0.1, 'heavy'));
      text(g, `$${fmt(Math.round(n / 1e8) * 1e8)}`, TX, 450 * u, { size: 104 * u, weight: 400, family: SERIF, color: t > 1.6 ? C.red : C.cream });
      g.fillStyle = 'rgba(11,15,20,0.82)'; if (t > 1.1) g.fillRect(0, 1330 * u, W, 240 * u);
      say('เงิน 64,800 ล้านดอลลาร์\nที่ไม่เคยมีอยู่จริง', TX, 1420 * u, t - 1.2, { size: 52 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(2), to: bar(4), cues: [[0, 'riser', 0.4], [2.5, 'pop', 0.6]],
    draw(t) {
      paper();
      kicker('ผลตอบแทนที่ลูกค้าเห็น', TX, 300 * u, t);
      say('กำไรสม่ำเสมอ ปีแล้วปีเล่า', TX, 420 * u, t - 0.2, { size: 58 * u, weight: 800 });
      lineChart(130 * u, 620 * u, 760 * u, 560 * u, smooth(60), clamp(t / 3.5), { area: 'rgba(47,143,91,0.15)' });
      say('แทบไม่เคยขาดทุนเลยสักเดือน', TX, 1380 * u, t - 2.5, { size: 58 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 400 * u, 90 * u, 14 * u); g.fill();
      text(g, 'NEW YORK · 1960–2008', 270 * u, 472 * u, { size: 28 * u, weight: 700, family: INTER, color: C.inkSoft, tracking: 2 * u });
      g.restore();
      say('Bernie Madoff', TX, 720 * u, t - 0.25, { size: 96 * u, weight: 400, family: SERIF });
      say('แชร์ลูกโซ่ที่ใหญ่ที่สุดในประวัติศาสตร์', TX, 840 * u, t - 0.6, { size: 46 * u, weight: 800 });
      stamp('PONZI', TX, 1100 * u, t - 2.5, { size: 150 * u, rot: -0.1 });
      say('โดยชายที่ Wall Street ไว้ใจที่สุดคนหนึ่ง', TX, 1400 * u, t - 3.0, { size: 44 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------- Chapter 2 — the respected man
  { from: bar(6), to: bar(9), cues: [[0.2, 'whoosh', 0.6], [2.5, 'pop', 0.6], [3.75, 'thump', 0.6]],
    draw(t) {
      paper();
      const rise = (1 - spring(t - 0.1, 'heavy')) * 500 * u;
      g.save(); g.translate(0, rise); facade({ top: 760 * u, base: 1400 * u }); g.restore();
      person(TX, 1350 * u + (1 - spring(t - 2.5, 'default')) * 400 * u, 70 * u, NAVY, { tie: C.red });
      kicker('1960 · นิวยอร์ก', TX, 300 * u, t);
      say('Bernard L. Madoff\nเปิดบริษัทซื้อขายหุ้นของตัวเอง', TX, 410 * u, t - 0.2, { size: 50 * u, weight: 800 });
      say('ด้วยเงินทุนเริ่มต้นราว 5,000 ดอลลาร์', TX, 1510 * u, t - 3.75, { size: 44 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(9), to: bar(12), cues: [[0.2, 'swish', 0.5], [2.5, 'tick', 0.5], [5.0, 'pop', 0.6]],
    draw(t) {
      night('#0C121B');
      // ticker board
      g.fillStyle = '#05080D'; g.fillRect(0, 640 * u, W, 560 * u);
      for (let r = 0; r < 5; r++) {
        const y = 720 * u + r * 105 * u, sp = (r % 2 ? 1 : -1) * 180 * u, off = ((t * sp) % (260 * u * 12) + 260 * u * 12) % (260 * u * 12);
        for (let k = -1; k < 12; k++) {
          const i = k + r * 13, x = ((k * 260 * u + off) % (260 * u * 12)) - 200 * u, up = hash(i, 8) > 0.35;
          const sym = 'ABCDEFGHJKLMNPRSTW'[Math.floor(hash(i, 1) * 18)] + 'ABCDEFGHJKLMNPRSTW'[Math.floor(hash(i, 2) * 18)] + 'ABCDEFGHJKLMNPRSTW'[Math.floor(hash(i, 3) * 18)];
          text(g, sym, x, y, { size: 40 * u, weight: 700, family: INTER, color: '#E9E3D3', align: 'left' });
          text(g, `${up ? '▲' : '▼'}${(hash(i, 4) * 3).toFixed(2)}`, x + 100 * u, y, { size: 34 * u, weight: 700, family: INTER, color: up ? '#4FBF7F' : '#E0533C', align: 'left' });
        }
      }
      kicker('ทศวรรษต่อ ๆ มา', TX, 300 * u, t);
      say('บริษัทเติบโตจนเป็นผู้ค้าหุ้นรายใหญ่\nของ Wall Street', TX, 410 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      say('และเป็นหนึ่งในผู้บุกเบิก\nการซื้อขายหุ้นด้วยคอมพิวเตอร์', TX, 1340 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(12), to: bar(14), cues: [[0.1, 'click', 0.7], [2.5, 'pop', 0.4], [2.8, 'pop', 0.4], [3.1, 'pop', 0.4]],
    draw(t) {
      paper();
      // desk name plate
      const s = spring(t - 0.1, 'snappy');
      g.save(); g.translate(TX, 800 * u + (1 - s) * 300 * u);
      g.fillStyle = '#3A2A1C'; g.beginPath(); g.moveTo(-330 * u, 90 * u); g.lineTo(330 * u, 90 * u); g.lineTo(300 * u, -90 * u); g.lineTo(-300 * u, -90 * u); g.closePath(); g.fill();
      g.fillStyle = GOLD; rrect(g, -270 * u, -70 * u, 540 * u, 140 * u, 8 * u); g.fill();
      text(g, 'CHAIRMAN', 0, -2 * u, { size: 56 * u, weight: 700, family: INTER, color: '#2A1E10', tracking: 8 * u });
      text(g, 'NASDAQ', 0, 50 * u, { size: 34 * u, weight: 700, family: INTER, color: '#2A1E10', tracking: 6 * u });
      g.fillStyle = '#26190F'; g.fillRect(-380 * u, 90 * u, 760 * u, 30 * u);
      g.restore();
      kicker('ต้นทศวรรษ 1990', TX, 300 * u, t);
      say('เคยเป็นประธานกรรมการ NASDAQ', TX, 420 * u, t - 0.2, { size: 52 * u, weight: 800 });
      say('(ตำแหน่งประธานที่ไม่ใช่ผู้บริหาร)', TX, 520 * u, t - 0.8, { size: 36 * u, weight: 600, color: C.inkSoft });
      for (let i = 0; i < 7; i++) { const p = spring(t - 2.5 - i * 0.1, 'playful'); if (p > 0) person(150 * u + i * 122 * u, 1300 * u, 46 * u * clamp(p), C.inkSoft, { tie: i % 2 ? C.red : null }); }
      say('คนในวงการเชื่อถือเขาอย่างมาก', TX, 1460 * u, t - 2.8, { size: 48 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- Chapter 3 — the 17th floor & the promise
  { from: bar(14), to: bar(17), cues: [[0.2, 'riser', 0.4], [2.5, 'chime', 0.6], [5.0, 'thump', 0.6]],
    draw(t) {
      night('#0A0E18');
      for (let i = 0; i < 40; i++) { g.fillStyle = '#E9E3D3'; g.globalAlpha = 0.2 + hash(i, 1) * 0.4; g.fillRect(hash(i, 2) * W, 560 * u + hash(i, 3) * 300 * u, 2 * u, 2 * u); }
      g.globalAlpha = 1;
      const cx = TX - 40 * u, base = 1430 * u + (1 - spring(t - 0.1, 'heavy')) * 300 * u;
      tower(cx, base, { glow: clamp((t - 2.5) / 0.3) * (0.8 + 0.2 * Math.sin(t * 6)) });
      g.fillStyle = '#05070D'; g.fillRect(0, 1430 * u, W, H - 1430 * u);
      if (t > 2.5) { const y = base - 16.5 * 27 * u; g.strokeStyle = GOLD; g.lineWidth = 4 * u; g.beginPath(); g.moveTo(cx + 200 * u, y); g.lineTo(cx + 250 * u, y); g.stroke();
        text(g, 'ชั้น 17', cx + 262 * u, y + 16 * u, { size: 46 * u, weight: 800, family: THAI, color: GOLD, align: 'left', alpha: clamp((t - 2.6) / 0.2) }); }
      g.fillStyle = 'rgba(10,14,24,0.85)'; g.fillRect(0, 230 * u, W, 290 * u);
      kicker('Lipstick Building · แมนฮัตตัน', TX, 300 * u, t);
      say('ธุรกิจอีกส่วนหนึ่งแยกไว้ที่ชั้น 17', TX, 420 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      say('ฝ่ายรับบริหารเงินลงทุนให้ลูกค้า\nทำงานแบบปิดลับ คนนอกแทบไม่รู้', TX, 1500 * u, t - 5.0, { size: 42 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(17), to: bar(20), cues: [[0.2, 'whoosh', 0.5], [2.5, 'pop', 0.6], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      kicker('สิ่งที่ลูกค้าได้รับ', TX, 300 * u, t);
      say('ผลตอบแทนราว 10–12% ต่อปี', TX, 420 * u, t - 0.2, { size: 60 * u, weight: 800 });
      const box = [130 * u, 620 * u, 760 * u, 560 * u];
      lineChart(...box, market(60, 7, 0.1), clamp((t - 0.6) / 3), { color: C.inkSoft, width: 5 * u, lo: 60, hi: 230, grid: true, dot: false });
      lineChart(...box, smooth(60), clamp((t - 2.5) / 2.5), { lo: 60, hi: 230, grid: false });
      text(g, 'ตลาดหุ้นจริง', 150 * u, 650 * u, { size: 34 * u, weight: 800, family: THAI, color: C.inkSoft, align: 'left', alpha: clamp((t - 1) / 0.3) });
      text(g, 'กองทุน Madoff', 150 * u, 700 * u, { size: 34 * u, weight: 800, family: THAI, color: GREEN, align: 'left', alpha: clamp((t - 2.6) / 0.3) });
      say('ตลาดจริงขึ้น ๆ ลง ๆ\nแต่ของเขาแทบเป็นเส้นตรง', TX, 1340 * u, t - 5.0, { size: 48 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(20), to: bar(23), cues: [[0.2, 'swish', 0.5], [1.25, 'pop', 0.5], [2.5, 'pop', 0.5], [5.0, 'chime', 0.5]],
    draw(t) {
      paper();
      kicker('กลยุทธ์ที่เขาอ้าง', TX, 300 * u, t);
      say('Split-Strike Conversion', TX, 420 * u, t - 0.2, { size: 64 * u, weight: 400, family: SERIF });
      const x0 = 130 * u, x1 = 890 * u, top = 720 * u, bot = 1080 * u;
      const pc = clamp(spring(t - 1.25, 'default')), pf = clamp(spring(t - 2.5, 'default'));
      g.save(); g.setLineDash([18 * u, 12 * u]); g.lineWidth = 6 * u;
      g.strokeStyle = C.red; g.beginPath(); g.moveTo(x0, top); g.lineTo(x0 + (x1 - x0) * pc, top); g.stroke();
      g.strokeStyle = GREEN; g.beginPath(); g.moveTo(x0, bot); g.lineTo(x0 + (x1 - x0) * pf, bot); g.stroke(); g.restore();
      text(g, 'เพดาน · ขายออปชัน จำกัดกำไร', x0, top - 24 * u, { size: 34 * u, weight: 800, family: THAI, color: C.red, align: 'left', alpha: pc });
      text(g, 'พื้น · ซื้อออปชัน กันขาดทุน', x0, bot + 56 * u, { size: 34 * u, weight: 800, family: THAI, color: GREEN, align: 'left', alpha: pf });
      const pts = Array.from({ length: 40 }, (_, i) => [x0 + (i / 39) * (x1 - x0), (top + bot) / 2 + Math.sin(i * 0.7) * 90 * u + (hash(i, 3) - 0.5) * 120 * u]);
      path(pts.map(([x, y]) => [x, Math.max(top + 10 * u, Math.min(bot - 10 * u, y))]), clamp((t - 0.4) / 3.5), { color: C.ink, width: 6 * u });
      text(g, 'ซื้อหุ้นบริษัทใหญ่', TX, 1250 * u, { size: 42 * u, weight: 800, family: THAI, color: C.ink, alpha: clamp((t - 0.6) / 0.3) });
      say('ฟังดูซับซ้อน ปลอดภัย และน่าเชื่อถือ', TX, 1440 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- Chapter 4 — the truth
  { from: bar(23), to: bar(26), cues: [[0.2, 'riser', 0.6], [2.5, 'impact', 1.2], [5.0, 'thump', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 26); g.translate(sx, sy);
      night('#08070A');
      kicker('แต่ความจริงคือ…', TX, 320 * u, t);
      big('0', TX, 900 * u, t - 2.5, { size: 420 * u, color: C.red });
      say('การซื้อขายหุ้นจริง\nในฝ่ายบริหารเงินลงทุน', TX, 1080 * u, t - 2.7, { size: 52 * u, weight: 800, color: C.cream });
      say('ภายหลังเขายอมรับในศาลว่า\nไม่ได้นำเงินลูกค้าไปลงทุนตามที่สัญญา', TX, 1360 * u, t - 5.0, { size: 42 * u, weight: 700, color: C.fog });
      finish();
    } },
  { from: bar(26), to: bar(30), cues: [[0.2, 'pop', 0.4], [0.65, 'pop', 0.4], [1.1, 'pop', 0.4], [1.55, 'pop', 0.4], [2.0, 'pop', 0.4]].concat(Array.from({ length: 8 }, (_, i) => [2.5 + i * 0.625, 'tick', 0.3])).concat([[7.5, 'thump', 0.7]]),
    draw(t) {
      paper();
      kicker('แชร์ลูกโซ่ทำงานอย่างไร', TX, 300 * u, t);
      say('เงินของคนใหม่ ถูกจ่ายเป็น\n“กำไร” ให้คนเก่า', TX, 410 * u, t - 0.2, { size: 50 * u, weight: 800 });
      pyramid(TX + 30 * u, 720 * u, t, { appear: 0.2, rows: 5, gap: 150 * u, sp: 130 * u });
      text(g, 'รุ่นแรก', 90 * u, 700 * u, { size: 36 * u, weight: 800, family: THAI, color: C.inkSoft, align: 'left', alpha: clamp((t - 0.3) / 0.3) });
      text(g, 'คนใหม่', 90 * u, 1336 * u, { size: 36 * u, weight: 800, family: THAI, color: C.red, align: 'left', alpha: clamp((t - 2.1) / 0.3) });
      say('ไม่มีกำไรจริง มีแค่เงินที่หมุนต่อกันไป', TX, 1460 * u, t - 6.0, { size: 44 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(30), to: bar(32), cues: [[0.1, 'thump', 0.6], [1.25, 'click', 0.6], [2.5, 'pop', 0.6]],
    draw(t) {
      paper();
      kicker('ที่มาของชื่อ “Ponzi”', TX, 300 * u, t);
      say('Charles Ponzi · บอสตัน ปี 1920', TX, 420 * u, t - 0.2, { size: 52 * u, weight: 800 });
      // reply coupon with perforated edge
      const s = spring(t - 1.0, 'snappy');
      g.save(); g.translate(TX + 80 * u, 820 * u); g.rotate(-0.06); g.scale(s, s);
      g.fillStyle = '#D9C9A0'; g.fillRect(-260 * u, -170 * u, 520 * u, 340 * u);
      g.fillStyle = C.paper; for (let i = 0; i < 18; i++) { g.beginPath(); g.arc(-260 * u + i * (520 * u / 17), -170 * u, 10 * u, 0, 7); g.arc(-260 * u + i * (520 * u / 17), 170 * u, 10 * u, 0, 7); g.fill(); }
      g.strokeStyle = '#6B5A3A'; g.lineWidth = 4 * u; g.strokeRect(-220 * u, -130 * u, 440 * u, 260 * u);
      text(g, 'REPLY COUPON', 0, -50 * u, { size: 46 * u, weight: 700, family: INTER, color: '#4A3C24', tracking: 4 * u });
      text(g, 'POSTAGE', 0, 20 * u, { size: 34 * u, weight: 700, family: INTER, color: '#6B5A3A', tracking: 6 * u });
      g.beginPath(); g.arc(0, 90 * u, 30 * u, 0, 7); g.stroke();
      g.restore();
      person(220 * u, 1060 * u, 80 * u, C.inkSoft);
      g.fillStyle = C.inkSoft; g.fillRect(155 * u, 922 * u, 130 * u, 14 * u); g.fillRect(183 * u, 868 * u, 74 * u, 58 * u);
      say('สัญญากำไร 50% ภายใน 45 วัน\nโดยใช้เงินคนใหม่จ่ายคนเก่า', TX, 1260 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(32), to: bar(34), cues: [[0.2, 'whoosh', 0.5], [1.25, 'whoosh', 0.5], [2.5, 'impact', 0.9]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 16); g.translate(sx, sy);
      night('#0C121B');
      say('แผนนี้อยู่รอดได้ ตราบที่…', TX, 400 * u, t - 0.1, { size: 54 * u, weight: 800, color: C.cream });
      const pIn = clamp(spring(t - 0.2, 'default')), pout = clamp(spring(t - 1.25, 'default'));
      const surge = clamp((t - 2.5) / 0.4);
      arrow(140 * u, 760 * u, 860 * u, 760 * u, GREEN, (28 - 16 * surge) * u, pIn);
      arrow(860 * u, 1010 * u, 140 * u, 1010 * u, C.red, (14 + 22 * surge) * u, pout);
      text(g, 'เงินใหม่ไหลเข้า', TX, 700 * u, { size: 42 * u, weight: 800, family: THAI, color: '#7FD3A2', alpha: pIn });
      text(g, 'เงินที่ถูกถอนออก', TX, 1110 * u, { size: 42 * u, weight: 800, family: THAI, color: '#F08A76', alpha: pout });
      say('ถ้าคนแห่ถอนเงินพร้อมกันเมื่อไร\nทุกอย่างจะพังทันที', TX, 1340 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
];
