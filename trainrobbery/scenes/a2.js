// Great Train Robbery 1963 — Act 2: 0:45–3:00 (bars 18–72).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake } from './kit.js';
import { railway, loco, coach, train, signalHead, robber, mailbag, quid, lorry, mapBrazil, RIO, pounds,
  SKY, SKY2, LAMP, CANVAS } from './a1.js';

const INTER = 'Inter, sans-serif';
const band = (y, h, a = 0.82) => { g.fillStyle = `rgba(10,18,32,${a})`; g.fillRect(0, y, W, h); };
const pband = (y, h) => { g.fillStyle = 'rgba(239,230,210,0.9)'; g.fillRect(0, y, W, h); };

// ---------------------------------------------------------------- scenery & props used only in act 2
// Side view of a railway bridge over a lane. bx = centre, y = rail level.
function bridge(bx, y) {
  g.fillStyle = '#070B12'; g.fillRect(bx - 120 * u, y + 30 * u, 240 * u, 300 * u);
  g.fillStyle = '#1A1D22'; g.fillRect(bx - 200 * u, y + 300 * u, 400 * u, 30 * u);
  g.fillStyle = '#4A3A30';
  for (const sd of [-1, 1]) { const x0 = sd < 0 ? bx - 230 * u : bx + 120 * u; g.fillRect(x0, y + 10 * u, 110 * u, 300 * u);
    g.strokeStyle = 'rgba(0,0,0,0.35)'; g.lineWidth = 2 * u;
    for (let r = 0; r < 10; r++) { g.beginPath(); g.moveTo(x0, y + 40 * u + r * 28 * u); g.lineTo(x0 + 110 * u, y + 40 * u + r * 28 * u); g.stroke(); } }
  g.fillStyle = '#3A3F48'; g.fillRect(bx - 130 * u, y, 260 * u, 40 * u);
  g.fillStyle = '#5A606A'; for (let i = 0; i < 12; i++) { g.beginPath(); g.arc(bx - 120 * u + i * 22 * u, y + 20 * u, 3 * u, 0, 7); g.fill(); }
}
// Two-storey farmhouse + barn, x = centre, y = ground. lit 0..1.
function farmhouse(x, y, s, lit = 1) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = '#141B26'; g.fillRect(0.95, -0.7, 1.1, 0.7);
  g.beginPath(); g.moveTo(0.9, -0.7); g.lineTo(1.5, -1.05); g.lineTo(2.1, -0.7); g.fill();
  g.fillStyle = '#1C2533'; g.fillRect(-1, -1.05, 2, 1.05);
  g.beginPath(); g.moveTo(-1.12, -1.0); g.lineTo(0, -1.6); g.lineTo(1.12, -1.0); g.fill();
  g.fillRect(0.5, -1.62, 0.16, 0.4);
  for (const [wx, wy, on] of [[-0.65, -0.82, 1], [0.35, -0.82, 0], [-0.65, -0.42, 1], [0.35, -0.42, 1]]) {
    g.fillStyle = on && lit > 0 ? `rgba(242,199,107,${0.4 + 0.55 * lit})` : '#0B1018'; g.fillRect(wx, wy, 0.3, 0.26);
    g.fillStyle = '#1C2533'; g.fillRect(wx + 0.14, wy, 0.02, 0.26); }
  g.fillStyle = '#0B1018'; g.fillRect(-0.12, -0.42, 0.26, 0.42);
  g.restore();
}
// Generic property-trading board (no brand): coloured bands round the edge. S = side in px.
const SIDES = [
  ['#8B5A3C', null, '#8B5A3C', null, null, '#8CC8E6', null, '#8CC8E6', '#8CC8E6'],
  ['#D7499A', null, '#D7499A', '#D7499A', null, '#F08A2E', null, '#F08A2E', '#F08A2E'],
  ['#D8322A', null, '#D8322A', '#D8322A', null, '#F2D12E', '#F2D12E', null, '#F2D12E'],
  ['#2E9E4F', '#2E9E4F', null, '#2E9E4F', null, null, '#2A4FA0', null, '#2A4FA0']];
function board(cx, cy, S, rot = 0) {
  const c = S / 12.2, k = 1.6 * c;
  g.save(); g.translate(cx, cy); g.rotate(rot);
  g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(-S / 2 + 12 * u, -S / 2 + 16 * u, S, S);
  g.fillStyle = '#E7E2CC'; g.fillRect(-S / 2, -S / 2, S, S);
  g.fillStyle = '#CFE3D2'; g.fillRect(-S / 2 + k, -S / 2 + k, S - 2 * k, S - 2 * k);
  g.strokeStyle = '#2A2A2A'; g.lineWidth = Math.max(1, S * 0.003);
  for (let side = 0; side < 4; side++) {
    g.save(); g.rotate(side * Math.PI / 2);
    for (let i = 0; i < 9; i++) {
      const x = S / 2 - k - (i + 1) * c, y = S / 2 - k;
      g.strokeRect(x, y, c, k);
      const col = SIDES[side][i]; if (col) { g.fillStyle = col; g.fillRect(x, y, c, k * 0.28); g.strokeRect(x, y, c, k * 0.28); }
    }
    g.strokeRect(S / 2 - k, S / 2 - k, k, k);
    g.restore();
  }
  g.strokeRect(-S / 2, -S / 2, S, S);
  // centre: two card piles and a pound sign
  g.save(); g.rotate(-0.78); g.fillStyle = '#F0B13A'; g.fillRect(-S * 0.24, -S * 0.2, S * 0.17, S * 0.1); g.fillStyle = '#5BA4D8'; g.fillRect(S * 0.07, S * 0.1, S * 0.17, S * 0.1); g.restore();
  text(g, '£', 0, S * 0.07, { size: S * 0.2, weight: 400, family: SERIF, color: '#9E2414' });
  g.restore();
}
function dice(x, y, s, n, rot = 0) {
  g.save(); g.translate(x, y); g.rotate(rot); g.fillStyle = '#F7F4EA'; rrect(g, -s / 2, -s / 2, s, s, s * 0.18); g.fill();
  g.strokeStyle = 'rgba(0,0,0,0.25)'; g.lineWidth = 2 * u; g.stroke();
  const P = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] }[n];
  g.fillStyle = '#16130F'; for (const [a, b] of P) { g.beginPath(); g.arc(a * s * 0.26, b * s * 0.26, s * 0.08, 0, 7); g.fill(); }
  g.restore();
}
// A fingerprint whorl that draws ridge by ridge (p 0..1).
function fingerprint(x, y, r, p, o = {}) {
  const { color = C.red, seed = 1, rot = 0 } = o;
  const n = 10, m = Math.floor(clamp(p) * n + 0.999);
  g.save(); g.translate(x, y); g.rotate(rot); g.strokeStyle = color; g.lineWidth = r * 0.05; g.lineCap = 'round';
  for (let k = 0; k < m; k++) { const a = r * (k + 1) / n, s0 = hash(k, seed) * 6.28, gap = 0.4 + hash(k, seed + 1) * 0.7;
    g.beginPath(); g.ellipse(0, k * r * 0.012, a * 0.78, a, 0, s0, s0 + Math.PI * 2 - gap); g.stroke(); }
  g.restore();
}
function bottle(x, y, s) {   // generic tomato-sauce bottle, y = base
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = '#B3221A'; g.beginPath(); g.moveTo(-0.32, 0); g.lineTo(-0.32, -0.95); g.quadraticCurveTo(-0.32, -1.25, -0.12, -1.45); g.lineTo(-0.12, -1.85);
  g.lineTo(0.12, -1.85); g.lineTo(0.12, -1.45); g.quadraticCurveTo(0.32, -1.25, 0.32, -0.95); g.lineTo(0.32, 0); g.closePath(); g.fill();
  g.fillStyle = '#F2EEE4'; g.fillRect(-0.15, -2.05, 0.3, 0.22);
  g.fillStyle = '#EFE3C4'; g.fillRect(-0.32, -0.85, 0.64, 0.45);
  g.fillStyle = 'rgba(255,255,255,0.25)'; g.fillRect(-0.24, -1.2, 0.07, 1.1);
  g.restore();
}
function gavel(x, y, s, rot) {
  g.fillStyle = '#5A3A22'; rrect(g, x - 1.1 * s, y + 0.08 * s, 2.2 * s, 0.32 * s, 0.06 * s); g.fill();
  g.save(); g.translate(x + 0.9 * s, y - 0.3 * s); g.rotate(rot);
  g.fillStyle = '#7A4E2E'; g.fillRect(-1.9 * s, -0.07 * s, 1.9 * s, 0.14 * s);
  g.fillStyle = '#5A3A22'; rrect(g, -2.3 * s, -0.36 * s, 0.6 * s, 0.72 * s, 0.1 * s); g.fill();
  g.fillStyle = '#C8A440'; g.fillRect(-2.3 * s, -0.24 * s, 0.6 * s, 0.06 * s); g.fillRect(-2.3 * s, 0.18 * s, 0.6 * s, 0.06 * s);
  g.restore();
}
// Prison wall at night with a sweeping searchlight. ladder 0..1 unrolls a rope ladder at lx; climb 0..1 moves a figure up it.
function prisonWall(t, o = {}) {
  const { ladder = 0, climb = -1, lx = TX - 80 * u, top = 640 * u, base = 1460 * u } = o;
  night('#070B12');
  for (let i = 0; i < 40; i++) { g.fillStyle = 'rgba(220,230,240,0.5)'; g.beginPath(); g.arc(hash(i, 51) * W, hash(i, 52) * 600 * u, (1 + hash(i, 53) * 1.6) * u, 0, 7); g.fill(); }
  // searchlight from a tower on the right
  const a = -2.2 + Math.sin(t * 0.9) * 0.45, tx = 900 * u, ty = 360 * u;
  g.save(); g.globalAlpha = 0.18; g.fillStyle = '#F4EBC8'; g.beginPath(); g.moveTo(tx, ty);
  g.lineTo(tx + Math.cos(a - 0.09) * 2000 * u, ty + Math.sin(a - 0.09) * 2000 * u); g.lineTo(tx + Math.cos(a + 0.09) * 2000 * u, ty + Math.sin(a + 0.09) * 2000 * u); g.fill(); g.restore();
  g.fillStyle = '#1A1E26'; g.fillRect(tx - 40 * u, ty, 80 * u, base - ty); g.fillRect(tx - 70 * u, ty - 50 * u, 140 * u, 60 * u);
  g.fillStyle = '#F4EBC8'; g.beginPath(); g.arc(tx - 40 * u, ty - 20 * u, 14 * u, 0, 7); g.fill();
  // brick wall
  g.fillStyle = '#3A3430'; g.fillRect(0, top, W, base - top);
  g.strokeStyle = 'rgba(0,0,0,0.35)'; g.lineWidth = 2 * u;
  for (let r = 0; r * 34 * u < base - top; r++) { const y = top + r * 34 * u; g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
    for (let x = (r % 2) * 40 * u; x < W; x += 80 * u) { g.beginPath(); g.moveTo(x, y); g.lineTo(x, y + 34 * u); g.stroke(); } }
  g.fillStyle = '#4C4640'; g.fillRect(0, top - 24 * u, W, 30 * u);
  g.fillStyle = '#0A0D12'; g.fillRect(0, base, W, H - base);
  if (ladder > 0) {
    const len = (base - top) * clamp(ladder);
    g.strokeStyle = '#C9B48A'; g.lineWidth = 5 * u;
    for (const dx of [-40, 40]) { g.beginPath(); g.moveTo(lx + dx * u, top - 20 * u); g.lineTo(lx + dx * u + Math.sin(t * 2) * 3 * u, top + len); g.stroke(); }
    g.lineWidth = 4 * u; for (let y = top + 30 * u; y < top + len; y += 60 * u) { g.beginPath(); g.moveTo(lx - 40 * u, y); g.lineTo(lx + 40 * u, y); g.stroke(); }
    g.fillStyle = '#C9B48A'; g.beginPath(); g.arc(lx - 40 * u, top - 20 * u, 8 * u, 0, 7); g.arc(lx + 40 * u, top - 20 * u, 8 * u, 0, 7); g.fill();
  }
  if (climb >= 0) { const y = base - (base - top + 60 * u) * clamp(climb);
    robber(lx, y, 120 * u, { color: '#05070A', lift: 1, step: Math.sin(t * 8) * 0.6 }); }
}
function mugshot(x, y, w, s) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = '#D9CDB0'; g.fillRect(-w / 2, -w * 0.65, w, w * 1.3);
  g.strokeStyle = 'rgba(22,19,15,0.25)'; g.lineWidth = 2 * u; for (let i = 1; i < 6; i++) { g.beginPath(); g.moveTo(-w / 2, -w * 0.65 + i * w * 0.18); g.lineTo(w / 2, -w * 0.65 + i * w * 0.18); g.stroke(); }
  person(0, w * 0.42, w * 0.3, C.inkSoft);
  g.fillStyle = C.ink; g.fillRect(-w * 0.32, w * 0.42, w * 0.64, w * 0.12);
  g.restore();
}

export default () => [
  // ---------------- the stop
  { from: bar(18), to: bar(20), cues: [[0, 'thump', 0.6], [1.6, 'impact', 0.7], [2.5, 'tick', 0.5], [3.6, 'click', 0.9]],
    draw(t) {
      const p = clamp(t / 1.6), e = 1 - (1 - p) * (1 - p);
      railway(t, { railY: 1250 * u });
      signalHead(110 * u, 880 * u, 100 * u, { green: 0, red: 1 });
      train(560 * u - e * 220 * u, 1250 * u, 230 * u, 3, { lamp: 1 });
      // trackside phone + fireman walking to it
      const bx = 230 * u;
      g.fillStyle = '#2B2F36'; g.fillRect(bx - 6 * u, 1150 * u, 12 * u, 130 * u); rrect(g, bx - 40 * u, 1060 * u, 80 * u, 100 * u, 8 * u); g.fill();
      if (t > 2.3) { const w = clamp((t - 2.3) / 1.2); robber(370 * u - w * 90 * u, 1290 * u, 95 * u, { color: '#05070A', step: Math.sin(t * 9) * (1 - w) }); }
      if (t > 3.6) { g.strokeStyle = C.red; g.lineWidth = 4 * u; g.beginPath(); g.moveTo(bx, 1060 * u); g.lineTo(bx + 30 * u, 980 * u); g.moveTo(bx + 50 * u, 940 * u); g.lineTo(bx + 90 * u, 880 * u); g.stroke();
        const s = spring(t - 3.6, 'playful'); g.lineWidth = 6 * u; g.beginPath(); g.arc(bx + 40 * u, 960 * u, 60 * u * s, 0, 7); g.stroke(); }
      band(200 * u, 330 * u);
      kicker('ราวตี 3', TX, 290 * u, t, { color: C.red });
      say('รถไฟหยุดตรงหน้าไฟแดง', TX, 400 * u, t - 0.2, { size: 56 * u, weight: 800, color: C.cream });
      if (t > 2.5) band(1360 * u, 230 * u);
      say('ผู้ช่วยคนขับลงไปโทรศัพท์ข้างราง', TX, 1440 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.cream });
      say('แต่สายถูกตัดไว้แล้ว', TX, 1530 * u, t - 3.6, { size: 46 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  // ---------------- the cab
  { from: bar(20), to: bar(23), cues: [[0.2, 'swish', 0.5], [1.2, 'thump', 0.5], [2.5, 'thump', 0.8], [5.0, 'thump', 0.6]],
    draw(t) {
      railway(t, { railY: 1300 * u, poles: false });
      loco(100 * u, 1300 * u, 900 * u, { lamp: 1 });
      for (let i = 0; i < 4; i++) { const s = spring(t - 0.5 - i * 0.35, 'default'); if (s <= 0) continue;
        robber(120 * u + i * 110 * u + (1 - s) * -200 * u, 1340 * u, 150 * u, { color: '#030406', lift: i === 3 ? 0.8 : 0.2, lean: i === 3 ? 0.15 : 0 }); }
      if (t > 2.5) { g.save(); g.globalAlpha = 0.35 * clamp(1 - (t - 2.5) / 0.8); g.fillStyle = '#5A0A06'; g.fillRect(0, 0, W, H); g.restore(); }
      band(200 * u, 330 * u);
      kicker('Jack Mills · คนขับรถไฟ วัย 57', TX, 290 * u, t, { color: C.red });
      say('แก๊งบุกขึ้นห้องคนขับ', TX, 400 * u, t - 0.2, { size: 56 * u, weight: 800, color: C.cream });
      if (t > 2.5) band(1390 * u, 200 * u);
      say('เขาถูกตีที่ศีรษะจนบาดเจ็บ', TX, 1460 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.red });
      say('และถูกบังคับให้ขับรถไฟต่อ', TX, 1550 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- uncouple and move to the bridge
  { from: bar(23), to: bar(26), cues: [[0.2, 'thump', 0.5], [1.2, 'click', 0.9], [1.6, 'whoosh', 0.6], [5.0, 'thump', 0.6]],
    draw(t) {
      const d = 1300 * u * clamp(1 - Math.pow(1 - remap(t, 1.6, 6.5), 2)), ry = 1050 * u;
      railway(t, { railY: ry, scroll: -d, moon: false });
      bridge(-1060 * u + d, ry);
      // rear coaches stay where they were: they drift right as the camera follows the front
      train(160 * u, ry, 150 * u, 7, { split: 2, gap: d + (t > 1.2 ? 8 * u : 0), hi: 1, hiA: clamp((t - 0.4) / 0.3) });
      if (t > 1.2 && t < 2.2) { const s = spring(t - 1.2, 'playful'), x = 160 * u + 150 * u * (2.04 + 1.64 * 2) - 6 * u + d / 2;
        g.strokeStyle = C.red; g.lineWidth = 5 * u; g.beginPath(); g.arc(x, ry - 30 * u, 50 * u * s, 0, 7); g.stroke(); }
      if (d > 1200 * u) text(g, 'Bridego Bridge', 240 * u, ry + 380 * u, { size: 34 * u, weight: 700, family: INTER, color: C.fog, alpha: clamp((t - 6) / 0.3) });
      band(200 * u, 330 * u);
      kicker('ปลดตู้ขบวนที่เหลือทิ้งไว้', TX, 290 * u, t, { color: C.red });
      say('เอาไปแค่หัวรถจักร\nกับ 2 ตู้แรกที่มีของมีค่า', TX, 390 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      if (t > 3.5) band(1450 * u, 140 * u);
      say('ไปหยุดที่สะพาน Bridego', TX, 1540 * u, t - 3.5, { size: 46 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- the human chain
  { from: bar(26), to: bar(29), cues: Array.from({ length: 12 }, (_, i) => [0.3 + i * 0.6, 'thump', 0.35]),
    draw(t) {
      const ry = 820 * u;
      railway(t, { railY: ry, poles: false, moon: false, ground: '#0C1510' });
      // embankment falling to a lane where the lorry waits
      g.fillStyle = '#101A13'; g.beginPath(); g.moveTo(430 * u, ry + 30 * u); g.lineTo(W, ry + 30 * u); g.lineTo(W, 1330 * u); g.lineTo(900 * u, 1330 * u); g.closePath(); g.fill();
      g.fillStyle = '#05080A'; g.beginPath(); g.moveTo(430 * u, ry + 30 * u); g.lineTo(900 * u, 1330 * u); g.lineTo(W, 1330 * u); g.lineTo(W, H); g.lineTo(0, H); g.lineTo(0, ry + 30 * u); g.closePath();
      g.fillStyle = '#0C1510'; g.fill();
      g.fillStyle = '#1A1D22'; g.fillRect(560 * u, 1330 * u, W, 26 * u);
      train(430 * u - 5.28 * 230 * u, ry, 230 * u, 2, { hi: 1, hiA: 0.6, lamp: 0 });
      lorry(780 * u, 1335 * u, 230 * u, { lights: 0.6 });
      // five men down the slope; bags travel hand to hand
      const men = [0, 1, 2, 3, 4].map((i) => { const q = 0.1 + i * 0.2; return [430 * u + q * 400 * u, ry + 40 * u + q * 470 * u * 1.05]; });
      const hands = [[380 * u, ry - 100 * u]];
      men.forEach(([x, y], i) => { const lift = 0.5 + 0.5 * Math.sin(t * 5 + i * 1.3); robber(x, y, 120 * u, { color: '#020304', lift, lean: 0.1 });
        hands.push([x + 10 * u, y - (1.35 + lift * 0.6) * 120 * u - 20 * u]); });
      hands.push([840 * u, 1180 * u]);
      for (let k = 0; k < 6; k++) { const q = ((t * 0.32 + k / 6) % 1);
        const f = q * (hands.length - 1), i = Math.min(hands.length - 2, Math.floor(f)), r = f - i;
        const x = hands[i][0] + (hands[i + 1][0] - hands[i][0]) * r, y = hands[i][1] + (hands[i + 1][1] - hands[i][1]) * r - Math.sin(r * Math.PI) * 30 * u;
        mailbag(x, y, 80 * u, Math.sin(q * 20) * 0.3); }
      band(200 * u, 330 * u);
      kicker('สะพาน Bridego · ใกล้ Ledburn', TX, 290 * u, t, { color: C.red });
      say('ต่อแถวส่งกระสอบ\nลงคันทางรถไฟทีละใบ', TX, 390 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      if (t > 4.0) band(1420 * u, 170 * u);
      say('ไปยังรถบรรทุกที่รออยู่ข้างล่าง', TX, 1520 * u, t - 4.0, { size: 46 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- the counter
  { from: bar(29), to: bar(32), cues: Array.from({ length: 16 }, (_, i) => [0.4 + i * 0.32, 'tick', 0.3]).concat([[5.6, 'impact', 1.0]]),
    draw(t) {
      const [sx, sy] = shake(t, 5.6, 16); g.translate(sx, sy);
      night(SKY);
      for (let i = 0; i < 40; i++) { const sp = 0.5 + hash(i, 71) * 0.5, y = ((hash(i, 72) * 2200 + t * 260 * sp) % 2200 - 200) * u;
        g.save(); g.globalAlpha = 0.55; quid(hash(i, 73) * W, y, 120 * u * sp, Math.sin(t * 1.5 + i) * 0.8, hash(i, 74) > 0.6); g.restore(); }
      g.fillStyle = 'rgba(10,18,32,0.75)'; g.fillRect(0, 760 * u, W, 260 * u);
      const p = 1 - Math.pow(1 - remap(t, 0.4, 5.6), 3);
      text(g, pounds(2600000 * p), TX, 940 * u, { size: 140 * u, weight: 400, family: SERIF, color: t > 5.6 ? C.red : C.cream });
      band(200 * u, 330 * u);
      kicker('ใช้เวลาไม่ถึงครึ่งชั่วโมง', TX, 290 * u, t, { color: C.red });
      say('ขนกระสอบไปได้ราว 120 ใบ', TX, 400 * u, t - 0.2, { size: 52 * u, weight: 800, color: C.cream });
      if (t > 5.6) band(1150 * u, 240 * u);
      say('รวมกว่า 2.6 ล้านปอนด์', TX, 1250 * u, t - 5.6, { size: 60 * u, weight: 800, color: C.cream });
      say('ในมูลค่าเงินปี 1963', TX, 1340 * u, t - 6.0, { size: 40 * u, weight: 800, color: C.fog });
      finish(0.8);
    } },
  { from: bar(32), to: bar(34), cues: [[0.2, 'thump', 0.6], [0.8, 'impact', 0.8], [2.5, 'pop', 0.6]],
    draw(t) {
      paper();
      kicker('เทียบค่าเงินปัจจุบัน ราว', TX, 330 * u, t);
      big('£50 ล้าน+', TX, 650 * u, t - 0.6, { size: 170 * u, color: C.red });
      say('ตัวเลขประเมินต่างกันไปตามวิธีคำนวณ', TX, 790 * u, t - 1.2, { size: 38 * u, weight: 800, color: C.inkSoft });
      for (let i = 0; i < 9; i++) { const s = spring(t - 1.6 - i * 0.08, 'snappy'); if (s <= 0) continue; quid(TX - 280 * u + (i % 5) * 140 * u, 1000 * u + Math.floor(i / 5) * 90 * u + (1 - s) * 80 * u, 150 * u, (hash(i, 3) - 0.5) * 0.4, i % 3 === 0); }
      say('การปล้นครั้งใหญ่ที่สุด\nของอังกฤษในเวลานั้น', TX, 1300 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.ink });
      finish(0.6);
    } },
  // ---------------- the farm
  { from: bar(34), to: bar(37), cues: [[0.2, 'whoosh', 0.5], [2.5, 'thump', 0.6], [5.0, 'thump', 0.5]],
    draw(t) {
      night(SKY);
      for (let i = 0; i < 70; i++) { g.fillStyle = `rgba(221,230,242,${0.3 + 0.5 * hash(i, 61)})`; g.beginPath(); g.arc(hash(i, 62) * W, hash(i, 63) * 1100 * u, (1 + hash(i, 64) * 1.8) * u, 0, 7); g.fill(); }
      g.fillStyle = '#0E1612'; g.beginPath(); g.moveTo(0, 1150 * u); for (let x = 0; x <= W; x += 40 * u) g.lineTo(x, 1130 * u - (noise(x / (260 * u), 9) + 1) * 40 * u); g.lineTo(W, H); g.lineTo(0, H); g.fill();
      farmhouse(560 * u, 1250 * u, 230 * u, clamp((t - 2.5) / 0.4) + 0.001);
      g.fillStyle = '#0A110D'; g.fillRect(0, 1250 * u, W, H - 1250 * u);
      const lx = -300 * u + (1 - Math.pow(1 - remap(t, 0.3, 3.0), 2)) * 520 * u;
      g.save(); g.translate(lx, 0); g.scale(-1, 1); lorry(0, 1300 * u, 200 * u, { lights: 0.8 }); g.restore();
      band(200 * u, 330 * u);
      kicker('Leatherslade Farm', TX, 290 * u, t, { color: C.red });
      say('หนีไปกบดานที่ฟาร์มห่างไกล\nที่จัดหาไว้ล่วงหน้า', TX, 390 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      if (t > 5.0) band(1400 * u, 180 * u);
      say('รอให้เรื่องเงียบ แล้วค่อยแยกย้าย', TX, 1500 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- the board game
  { from: bar(37), to: bar(40), cues: [[0.2, 'pop', 0.5], [1.8, 'tick', 0.6], [2.0, 'tick', 0.6], [4.0, 'thump', 0.6]],
    draw(t) {
      g.fillStyle = '#5A3E28'; g.fillRect(0, 0, W, H);
      g.fillStyle = 'rgba(0,0,0,0.18)'; for (let i = 0; i < 14; i++) g.fillRect(0, i * 140 * u + 60 * u, W, 4 * u);
      const s = spring(t - 0.1, 'heavy');
      board(TX, 920 * u + (1 - s) * 400 * u, 640 * u, -0.05);
      for (let i = 0; i < 7; i++) { const p = spring(t - 0.6 - i * 0.12, 'snappy'); if (p <= 0) continue;
        quid(TX + (hash(i, 81) - 0.5) * 720 * u, (i % 2 ? 610 : 1240) * u + (hash(i, 82) - 0.5) * 40 * u, 150 * u * p, (hash(i, 83) - 0.5) * 0.8, i % 3 === 0); }
      const r1 = 1 + Math.floor(clamp((t - 1.8) * 6)) % 6, r2 = 1 + Math.floor(clamp((t - 1.8) * 4)) % 6;
      dice(TX - 60 * u, 940 * u, 60 * u, t > 2.2 ? 5 : r1, 0.3); dice(TX + 40 * u, 900 * u, 60 * u, t > 2.2 ? 3 : r2, -0.2);
      pband(200 * u, 330 * u);
      kicker('ระหว่างหลบซ่อน', TX, 290 * u, t, { color: C.red });
      say('พวกเขาฆ่าเวลาด้วยเกมเศรษฐี', TX, 400 * u, t - 0.2, { size: 52 * u, weight: 800, color: C.ink });
      if (t > 4.0) pband(1340 * u, 250 * u);
      say('ตามคำบอกเล่า ใช้ธนบัตรที่ปล้นมา\nเล่นแทนเงินในเกม', TX, 1420 * u, t - 4.0, { size: 44 * u, weight: 800, color: C.ink });
      finish(0.6);
    } },
  // ---------------- the police arrive
  { from: bar(40), to: bar(42), cues: Array.from({ length: 6 }, (_, i) => [i * 0.12, 'tick', 0.5]).concat([[1.0, 'thump', 0.6], [2.5, 'impact', 0.8]]),
    draw(t) {
      paper(); kicker('สิงหาคม 1963', TX, 380 * u, t);
      const d = ['08', '09', '10', '11', '12', '13'];
      flip(TX, 720 * u, 420 * u, 480 * u, d, d.map((_, i) => i * 0.12), t, { size: 320 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('ชาวบ้านแจ้งเบาะแส\nตำรวจบุกถึงฟาร์ม', TX, 1110 * u, t - 1.0, { size: 52 * u, weight: 800 });
      say('แก๊งหนีไปแล้ว', TX, 1340 * u, t - 2.5, { size: 64 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- the fingerprints
  { from: bar(42), to: bar(45), cues: [[0.2, 'swish', 0.5], [1.2, 'pop', 0.7], [2.2, 'pop', 0.7], [3.2, 'pop', 0.7], [5.0, 'impact', 0.8]],
    draw(t) {
      paper();
      board(TX - 120 * u, 870 * u, 500 * u, 0.06);
      bottle(TX + 300 * u, 1150 * u, 150 * u);
      fingerprint(TX - 210 * u, 800 * u, 70 * u, remap(t, 1.2, 1.9), { seed: 3, rot: 0.3 });
      fingerprint(TX - 20 * u, 960 * u, 64 * u, remap(t, 2.2, 2.9), { seed: 7, rot: -0.5 });
      fingerprint(TX + 300 * u, 1010 * u, 40 * u, remap(t, 3.2, 3.9), { seed: 11, rot: 0.1, color: '#16130F' });
      // magnifier sweeping over the evidence
      const mx = track(t, [[0, TX - 380 * u], [1.0, TX - 210 * u], [2.0, TX - 20 * u], [3.0, TX + 300 * u], [4.3, TX + 80 * u]], 'default');
      const my = track(t, [[0, 700 * u], [1.0, 800 * u], [2.0, 960 * u], [3.0, 1010 * u], [4.3, 880 * u]], 'default');
      g.strokeStyle = '#2A2016'; g.lineWidth = 14 * u; g.beginPath(); g.arc(mx, my, 95 * u, 0, 7); g.stroke();
      g.lineWidth = 22 * u; g.lineCap = 'round'; g.beginPath(); g.moveTo(mx + 70 * u, my + 70 * u); g.lineTo(mx + 170 * u, my + 170 * u); g.stroke();
      g.fillStyle = 'rgba(255,255,255,0.12)'; g.beginPath(); g.arc(mx, my, 90 * u, 0, 7); g.fill();
      pband(200 * u, 360 * u);
      kicker('หลักฐานที่ทิ้งไว้', TX, 290 * u, t, { color: C.red });
      say('รอยนิ้วมือบนกระดานเกม\nและขวดซอสมะเขือเทศ', TX, 395 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.ink });
      if (t > 5.0) pband(1340 * u, 250 * u);
      say('ตรงกับลายนิ้วมือ\nในแฟ้มประวัติของตำรวจ', TX, 1420 * u, t - 5.0, { size: 48 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- arrests
  { from: bar(45), to: bar(47), cues: Array.from({ length: 8 }, (_, i) => [0.2 + i * 0.15, 'pop', 0.35]).concat([[2.5, 'impact', 1.0]]),
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 18); g.translate(sx, sy);
      paper();
      for (let i = 0; i < 8; i++) { const s = spring(t - 0.2 - i * 0.15, 'playful'); if (s <= 0) continue;
        mugshot(TX - 300 * u + (i % 4) * 200 * u, 720 * u + Math.floor(i / 4) * 300 * u, 170 * u, s); }
      stamp('CAUGHT', TX, 870 * u, t - 2.5, { size: 140 * u, rot: -0.12 });
      kicker('ภายในไม่กี่เดือน', TX, 300 * u, t, { color: C.red });
      say('ตำรวจตามจับได้ทีละคน', TX, 410 * u, t - 0.2, { size: 56 * u, weight: 800 });
      say('แต่บางคนยังหลบหนีได้อีกหลายปี', TX, 1360 * u, t - 3.0, { size: 46 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------- the trial
  { from: bar(47), to: bar(50), cues: [[0.2, 'thump', 0.6], [2.4, 'impact', 1.2], [5.0, 'thump', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 2.4, 24); g.translate(sx, sy);
      paper();
      const rot = t < 2.4 ? -0.9 * clamp(t / 1.8) : -0.9 + 0.9 * clamp(spring(t - 2.4, 'snappy'));
      gavel(TX + 40 * u, 1150 * u, 120 * u, rot);
      kicker('ศาลเมือง Aylesbury · ปี 1964', TX, 300 * u, t, { color: C.red });
      say('สมาชิกหลายคนถูกตัดสินจำคุก', TX, 410 * u, t - 0.2, { size: 52 * u, weight: 800 });
      big('30 ปี', TX, 760 * u, t - 2.4, { size: 260 * u, color: C.red });
      say('หลายคนมองว่าเป็นโทษที่หนักมาก\nสำหรับคดีปล้นทรัพย์', TX, 1360 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------- escapes
  { from: bar(50), to: bar(52), cues: [[0.2, 'whoosh', 0.5], [2.5, 'thump', 0.7]],
    draw(t) {
      prisonWall(t, {});
      for (let i = 0; i < 3; i++) { const s = clamp((t - 2.5 - i * 0.2) / 0.3); if (s <= 0) continue; robber(560 * u + i * 100 * u - (1 - s) * 60 * u, 1460 * u, 110 * u, { color: '#050505', step: Math.sin(t * 9 + i) }); }
      band(200 * u, 330 * u);
      kicker('Charlie Wilson · สิงหาคม 1964', TX, 290 * u, t, { color: C.red });
      say('แหกคุกที่ Birmingham', TX, 400 * u, t - 0.2, { size: 56 * u, weight: 800, color: C.cream });
      if (t > 2.5) band(1470 * u, 120 * u);
      say('มีคนบุกเข้าไปช่วยเขาออกมา', TX, 1545 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(52), to: bar(55), cues: [[0.2, 'thump', 0.5], [1.0, 'swish', 0.7], [2.5, 'tick', 0.4], [3.5, 'tick', 0.4], [4.5, 'tick', 0.4], [6.0, 'whoosh', 0.6]],
    draw(t) {
      prisonWall(t, { ladder: clamp(spring(t - 1.0, 'heavy')), climb: t > 2.2 && t < 6.4 ? remap(t, 2.2, 6.4) : -1 });
      band(200 * u, 330 * u);
      kicker('Ronnie Biggs · กรกฎาคม 1965', TX, 290 * u, t, { color: C.red });
      say('ปีนบันไดเชือก\nข้ามกำแพงคุก Wandsworth', TX, 390 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      if (t > 4.5) band(1480 * u, 110 * u);
      say('ระหว่างเวลาออกกำลังกายในลานคุก', TX, 1550 * u, t - 4.5, { size: 42 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- Biggs in Brazil
  { from: bar(55), to: bar(58), cues: [[0.2, 'whoosh', 0.6], [2.5, 'pop', 0.8], [5.0, 'thump', 0.6]],
    draw(t) {
      const cam = { lat: track(t, [[0, 10], [0.1, -14]], 'heavy'), lon: track(t, [[0, -25], [0.1, -50]], 'heavy'), z: track(t, [[0, 12], [0.1, 30]], 'heavy') * u };
      const P = mapBrazil(cam); topScrim(620);
      pin(...P(RIO), t - 2.5, { label: 'Rio de Janeiro', side: -1 });
      kicker('หนีไปออสเตรเลีย ก่อนไปบราซิล', TX, 250 * u, t, { color: C.red });
      say('Biggs ใช้ชีวิตในริโอฯ\nนานกว่า 30 ปี', TX, 345 * u, t - 0.3, { size: 52 * u, weight: 800, color: C.cream });
      if (t > 5.0) band(1380 * u, 210 * u, 0.88);
      say('ช่วงนั้นไม่มีสนธิสัญญา\nส่งผู้ร้ายข้ามแดนกับอังกฤษ', TX, 1450 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- what became of them
  { from: bar(58), to: bar(61), cues: [[0.2, 'thump', 0.5], [0.6, 'pop', 0.6], [2.5, 'pop', 0.6], [5.0, 'pop', 0.6]],
    draw(t) {
      paper();
      kicker('หลังจากนั้น', TX, 330 * u, t);
      [['1968', 'Bruce Reynolds ถูกจับที่ Torquay\nได้รับโทษจำคุก 25 ปี', 0.6], ['2001', 'Biggs บินกลับอังกฤษเอง\nและถูกจับทันทีที่ลงเครื่อง', 2.5], ['2013', 'Biggs เสียชีวิต อายุ 84 ปี\nReynolds เสียชีวิตในปีเดียวกัน', 5.0]].forEach(([y, s, at], i) => {
        const p = spring(t - at, 'snappy'); if (p <= 0) return;
        g.save(); g.translate((1 - p) * W, 0);
        const top = 450 * u + i * 330 * u;
        g.fillStyle = i === 1 ? C.ink : C.paper2; rrect(g, 90 * u, top, W - 230 * u, 290 * u, 14 * u); g.fill();
        text(g, y, TX, top + 100 * u, { size: 90 * u, weight: 400, family: SERIF, color: C.red });
        s.split('\n').forEach((ln, k) => text(g, ln, TX, top + 170 * u + k * 56 * u, { size: 40 * u, weight: 800, family: THAI, color: i === 1 ? C.paper : C.ink }));
        g.restore(); });
      finish(0.6);
    } },
  // ---------------- the driver
  { from: bar(61), to: bar(64), cues: [[0.2, 'thump', 0.5], [3.5, 'chime', 0.4]],
    draw(t) {
      railway(t, { railY: 1300 * u, scroll: -t * 40 * u });
      signalHead(TX + 40 * u, 760 * u, 110 * u, { green: 1, red: 0 });
      band(200 * u, 360 * u);
      kicker('Jack Mills · คนขับรถไฟ', TX, 290 * u, t, { color: C.red });
      say('ไม่เคยหายเป็นปกติ\nเสียชีวิตในปี 1970', TX, 395 * u, t - 0.2, { size: 52 * u, weight: 800, color: C.cream });
      if (t > 3.5) band(1360 * u, 230 * u);
      say('สาเหตุทางการคือมะเร็งเม็ดเลือดขาว\nแต่ครอบครัวเชื่อว่าการถูกทำร้ายมีส่วน', TX, 1440 * u, t - 3.5, { size: 40 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- closing title
  { from: bar(64), to: bar(68), cues: [[0, 'thump', 0.9], [2.5, 'pop', 0.5], [5.0, 'swish', 0.4]],
    draw(t) {
      night('#070A10');
      big('1963', TX, 760 * u, t, { size: 300 * u, color: C.cream });
      const p = spring(t - 0.7, 'default');
      g.fillStyle = C.red; g.fillRect(TX - 330 * u * p, 840 * u, 660 * u * p, 10 * u);
      say('ปล้นรถไฟครั้งใหญ่', TX, 990 * u, t - 1.0, { size: 64 * u, weight: 800, color: C.red });
      say('เงินกว่า 2 ล้านปอนด์\nไม่เคยถูกพบจนถึงวันนี้', TX, 1120 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.cream });
      g.fillStyle = '#0F141C'; g.fillRect(0, 1460 * u, W, H - 1460 * u);
      train(W + 100 * u - t * 160 * u, 1460 * u, 130 * u, 6, { dark: '#2C3D5C', lamp: 0.6 });
      finish();
    } },
  // ---------------- the question
  { from: bar(68), to: bar(72), cues: Array.from({ length: 8 }, (_, i) => [i * 0.625, 'tick', 0.3]).concat([[5.0, 'chime', 0.8]]),
    draw(t) {
      railway(t, { railY: 1250 * u, scroll: -t * 700 * u });
      train(60 * u - t * 6 * u, 1250 * u, 220 * u, 5, { lamp: 1 });
      band(200 * u, 330 * u, 0.86);
      say('คุณมองพวกเขาเป็นตำนาน\nหรือแค่อาชญากร?', TX, 310 * u, t - 0.3, { size: 52 * u, weight: 800, color: C.cream });
      say('คอมเมนต์บอกได้เลย', TX, 480 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.red });
      finish(0.7);
    } },
];
