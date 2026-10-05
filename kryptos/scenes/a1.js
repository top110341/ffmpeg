// Kryptos — Act 1: 0:00–0:47.5 (bars 0–19). Night / teal-copper palette.
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake } from './kit.js';

// ---------------------------------------------------------------- palette + verified strings
export const KC = { bg: '#061417', bg2: '#0C262A', bg3: '#123539', teal: '#3E9C90', tealLite: '#8ED8CC', cop: '#C27C42',
  copDark: '#5E3518', copLite: '#E8AE72', glow: '#FFE2AE', hole: '#140A04' };
export const LAT = 'Inter, sans-serif';
export const ALPHA = 'KRYPTOSABCDEFGHIJLMNQUVWXZ';               // the sculpture's keyed alphabet
// K1 ciphertext (verified: decrypts to the K1 plaintext with key PALIMPSEST over ALPHA)
export const K1C = 'EMUFPHZLRFAXYUSDJKZLDKRNSHGNFIVJYQTQUXQBQVYUVLLTREVJYQTMKYRDMFD';
// K4 ciphertext, 97 letters (clue positions checked: 22–25 FLRV→EAST, 26–34 →NORTHEAST, 64–69 →BERLIN, 70–74 →CLOCK)
export const K4 = 'OBKRUOXOGHULBSOLIFBBWFLRVQQPRNGKSSOTWTQSJQSSEKZZWATJKLUDIAWINFBNYPVTTMZFPKWGDKZXTJCDIGKUHUAUEKCAR';
const AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const rndL = (i, s = 1) => AZ[Math.floor(hash(i, s) * 26)];
export function mix(a, b, p) {
  const A = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16)), B = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * clamp(p))).join(',')})`;
}

// teal-black night with a soft glow
export function sky(glowY = 0.5, a = 0.28) {
  night(KC.bg);
  const gr = g.createRadialGradient(W / 2, H * glowY, 0, W / 2, H * glowY, H * 0.6);
  gr.addColorStop(0, `rgba(62,156,144,${a})`); gr.addColorStop(1, 'rgba(6,20,23,0)');
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
}
export function band(y, h, a = 0.82) { g.fillStyle = `rgba(6,20,23,${a})`; g.fillRect(0, y, W, h); }

// ---------------------------------------------------------------- the copper screen
// Curved copper sheet with letters cut through it, lit from behind. Letters come from hash unless `letter` is given.
// lit 0..1 backlight · curve 0..1 S-bend · show = letters cut so far · hi(i) 0..1 highlight · fade(i) 0..1 letter alpha
export function copperSheet(x, y, w, h, o = {}) {
  const { cols = 24, rows = 30, curve = 0.6, lit = 1, seed = 3, letter = (i) => rndL(i, seed), hi = () => 0, show = Infinity,
    phase = 0, size = 0.7, fade = () => 1 } = o;
  const th = [], xs = [0], zE = [0];
  for (let c = 0; c < cols; c++) {
    const s = (c + 0.5) / cols; th.push(curve * 0.9 * Math.sin(Math.PI * 2 * s + phase));
    xs.push(xs[c] + Math.cos(th[c])); zE.push(zE[c] + Math.sin(th[c]) / cols);
  }
  const k = w / xs[cols], zm = zE.reduce((a, b) => a + b, 0) / zE.length, sE = zE.map((z) => 1 + (z - zm) * 0.9);
  const cy = y + h / 2, ch = h / rows;
  for (let c = 0; c < cols; c++) {
    const x0 = x + xs[c] * k, x1 = x + xs[c + 1] * k, h0 = h * sE[c] / 2, h1 = h * sE[c + 1] / 2;
    const light = 0.5 + 0.5 * Math.cos(th[c] * 1.6 + 0.6);
    g.fillStyle = mix(KC.copDark, KC.cop, light);
    g.beginPath(); g.moveTo(x0, cy - h0); g.lineTo(x1 + 0.6, cy - h1); g.lineTo(x1 + 0.6, cy + h1); g.lineTo(x0, cy + h0); g.closePath(); g.fill();
    // verdigris streaks
    for (let j = 0; j < 3; j++) { const q = hash(c * 3 + j, seed + 40); if (q > 0.55) continue;
      g.fillStyle = `rgba(62,156,144,${0.12 + q * 0.2})`; const hm = Math.min(h0, h1), yy = cy - hm + hash(c * 3 + j, seed + 41) * hm * 2;
      const hh = Math.min((40 + hash(c, seed + 42) * 160) * u * sE[c], cy + hm - yy);
      if (hh > 0) g.fillRect(x0, yy, x1 - x0 + 0.6, hh); }
  }
  // dark rim
  g.strokeStyle = KC.copDark; g.lineWidth = 6 * u; g.beginPath();
  for (let c = 0; c <= cols; c++) { const xx = x + xs[c] * k, yy = cy - h * sE[c] / 2; c ? g.lineTo(xx, yy) : g.moveTo(xx, yy); } g.stroke();
  g.beginPath(); for (let c = 0; c <= cols; c++) { const xx = x + xs[c] * k, yy = cy + h * sE[c] / 2; c ? g.lineTo(xx, yy) : g.moveTo(xx, yy); } g.stroke();
  // letters
  g.save(); g.textAlign = 'center'; g.textBaseline = 'middle';
  const fs = ch * size; g.font = `700 ${fs}px ${LAT}`;
  const holeC = mix(KC.hole, KC.glow, lit);
  for (let c = 0; c < cols; c++) {
    const xm = x + (xs[c] + xs[c + 1]) / 2 * k, sm = (sE[c] + sE[c + 1]) / 2, sx = Math.max(0.15, Math.cos(th[c]));
    for (let r = 0; r < rows; r++) {
      const i = r * cols + c; if (i >= show) continue;
      const L = letter(i, r, c); if (!L) continue;
      const yy = cy + (r + 0.5 - rows / 2) * ch * sm, hv = hi(i), fa = fade(i);
      if (fa <= 0) continue;
      g.save(); g.translate(xm, yy); g.scale(sx * sm, sm); g.globalAlpha = fa;
      if (hv > 0) { g.fillStyle = `rgba(142,216,204,${hv})`; g.fillRect(-ch * 0.48, -ch * 0.48, ch * 0.96, ch * 0.96); }
      g.fillStyle = hv > 0.5 ? KC.bg : holeC; g.fillText(L, 0, fs * 0.04);
      g.restore();
    }
  }
  g.restore();
  return (r, c) => [x + (xs[c] + xs[c + 1]) / 2 * k, cy + (r + 0.5 - rows / 2) * ch];
}

// ---------------------------------------------------------------- Vigenère tableau (keyed alphabet, row r shifted by r)
// p 0..1 diagonal reveal; row/col highlight (−1 none)
export function tableau(x, y, cell, o = {}) {
  const { rows = 26, cols = 26, row = -1, col = -1, p = 1, dimA = 0.4, header = false } = o;
  g.save(); g.font = `700 ${cell * 0.6}px ${LAT}`; g.textAlign = 'center'; g.textBaseline = 'middle';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    if ((r + c) / (rows + cols - 2) > p) continue;
    const cx = x + (c + 0.5) * cell, cy = y + (r + 0.5) * cell, L = ALPHA[(r + c) % 26];
    const cross = r === row && c === col, hot = r === row || c === col;
    if (cross) { g.fillStyle = KC.cop; g.fillRect(cx - cell / 2, cy - cell / 2, cell, cell); g.fillStyle = KC.bg; }
    else if (hot) { g.fillStyle = 'rgba(62,156,144,0.35)'; g.fillRect(cx - cell / 2, cy - cell / 2, cell, cell); g.fillStyle = C.cream; }
    else if (header && r === 0) g.fillStyle = KC.copLite;
    else g.fillStyle = `rgba(232,174,114,${dimA})`;
    g.fillText(L, cx, cy + cell * 0.03);
  }
  g.restore();
}

// ---------------------------------------------------------------- decoding: cipher letters flip to plaintext
// lines: plaintext lines (spaces kept, no cipher letter consumed); cipher letters fill the non-space slots in order.
export function decodeBlock(lines, cipher, x, y, cell, t, o = {}) {
  const { stagger = 0.04, cC = 'rgba(239,230,210,0.5)', pC = C.cream, hi = () => false, hiC = KC.copLite, lh = 1.25, seed = 9 } = o;
  g.save(); g.font = `700 ${cell * 0.82}px ${LAT}`; g.textAlign = 'center'; g.textBaseline = 'middle';
  let k = 0;
  lines.forEach((ln, r) => {
    const x0 = x - (ln.length * cell) / 2;
    [...ln].forEach((p, c) => {
      if (p === ' ') return;
      const i = k++, ci = cipher[i] || rndL(i, seed), f = clamp((t - i * stagger) / 0.24);
      const cx = x0 + (c + 0.5) * cell, cy = y + r * cell * lh, sy = Math.max(0.06, Math.abs(Math.cos(f * Math.PI)));
      const on = f >= 0.5, H1 = on && hi(r, c);
      if (H1) { g.fillStyle = 'rgba(194,124,66,0.35)'; g.fillRect(cx - cell / 2, cy - cell * 0.6, cell, cell * 1.2); }
      g.save(); g.translate(cx, cy); g.scale(1, sy);
      g.fillStyle = on ? (H1 ? hiC : pC) : cC; g.fillText(on ? p : ci, 0, cell * 0.04);
      g.restore();
    });
  });
  g.restore();
  return y + lines.length * cell * lh;
}
// A row of letters in fixed cells (for K4 strips); hi(i) highlight; sub(i) replacement letter shown in copper
export function letterGrid(str, x, y, perRow, cell, o = {}) {
  const { color = 'rgba(239,230,210,0.75)', hi = () => 0, sub = () => null, show = Infinity, lh = 1.3 } = o;
  g.save(); g.font = `700 ${cell * 0.78}px ${LAT}`; g.textAlign = 'center'; g.textBaseline = 'middle';
  [...str].forEach((L, i) => {
    if (i >= show) return;
    const r = Math.floor(i / perRow), c = i % perRow, cx = x + (c + 0.5 - perRow / 2) * cell, cy = y + r * cell * lh;
    const hv = hi(i), s = sub(i);
    if (hv > 0) { g.fillStyle = `rgba(194,124,66,${0.85 * hv})`; g.fillRect(cx - cell * 0.47, cy - cell * 0.6, cell * 0.94, cell * 1.2); }
    g.fillStyle = s ? KC.bg : hv > 0 ? C.cream : color; g.fillText(s || L, cx, cy + cell * 0.04);
  });
  g.restore();
}

// ---------------------------------------------------------------- props
export function clockFace(x, y, r, t, o = {}) {
  const { color = KC.copLite, face = KC.bg2 } = o;
  g.save(); g.translate(x, y);
  g.fillStyle = face; g.beginPath(); g.arc(0, 0, r, 0, 7); g.fill();
  g.strokeStyle = color; g.lineWidth = r * 0.06; g.stroke();
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; g.lineWidth = r * (i % 3 ? 0.025 : 0.05);
    g.beginPath(); g.moveTo(Math.cos(a) * r * 0.78, Math.sin(a) * r * 0.78); g.lineTo(Math.cos(a) * r * 0.9, Math.sin(a) * r * 0.9); g.stroke(); }
  const hand = (a, L, w) => { g.lineWidth = w; g.lineCap = 'round'; g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.sin(a) * L, -Math.cos(a) * L); g.stroke(); };
  hand(t * 0.5 + 1.2, r * 0.5, r * 0.07); hand(t * 6 + 0.3, r * 0.75, r * 0.045);
  g.fillStyle = color; g.beginPath(); g.arc(0, 0, r * 0.07, 0, 7); g.fill();
  g.restore();
}
// compass rose; needle angle in radians from north (clockwise)
export function compass(x, y, r, ang, o = {}) {
  const { color = KC.copLite, labels = true } = o;
  g.save(); g.translate(x, y);
  g.strokeStyle = 'rgba(142,216,204,0.5)'; g.lineWidth = 3 * u; g.beginPath(); g.arc(0, 0, r, 0, 7); g.stroke();
  g.beginPath(); g.arc(0, 0, r * 0.82, 0, 7); g.stroke();
  for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8, L = i % 4 === 0 ? 0.62 : i % 2 === 0 ? 0.74 : 0.78;
    g.beginPath(); g.moveTo(Math.sin(a) * r * L, -Math.cos(a) * r * L); g.lineTo(Math.sin(a) * r * 0.82, -Math.cos(a) * r * 0.82); g.stroke(); }
  if (labels) ['N', 'E', 'S', 'W'].forEach((s, i) => { const a = i * Math.PI / 2;
    text(g, s, Math.sin(a) * r * 1.16, -Math.cos(a) * r * 1.16 + 16 * u, { size: 44 * u, weight: 700, family: LAT, color: i === 1 ? KC.copLite : 'rgba(239,230,210,0.7)' }); });
  g.rotate(ang);
  g.fillStyle = color; g.beginPath(); g.moveTo(0, -r * 0.75); g.lineTo(r * 0.08, 0); g.lineTo(-r * 0.08, 0); g.closePath(); g.fill();
  g.fillStyle = 'rgba(239,230,210,0.35)'; g.beginPath(); g.moveTo(0, r * 0.75); g.lineTo(r * 0.08, 0); g.lineTo(-r * 0.08, 0); g.closePath(); g.fill();
  g.fillStyle = KC.bg; g.beginPath(); g.arc(0, 0, r * 0.05, 0, 7); g.fill();
  g.restore();
}
export function candle(x, y, s, t) {
  g.save(); g.translate(x, y); g.scale(s, s);
  const gr = g.createRadialGradient(0, -1.15, 0, 0, -1.15, 1.6);
  gr.addColorStop(0, 'rgba(255,214,140,0.55)'); gr.addColorStop(1, 'rgba(255,214,140,0)');
  g.fillStyle = gr; g.beginPath(); g.arc(0, -1.15, 1.6, 0, 7); g.fill();
  g.fillStyle = '#E9DCC0'; g.fillRect(-0.12, -0.9, 0.24, 0.9);
  const fl = noise(t * 6, 3) * 0.12;
  g.fillStyle = '#FFD68C'; g.beginPath(); g.moveTo(0, -1.45 + fl); g.quadraticCurveTo(0.13, -1.05, 0, -0.95); g.quadraticCurveTo(-0.13, -1.05, 0, -1.45 + fl); g.fill();
  g.restore();
}
// CRT monitor with scrolling letters (late-90s PC)
export function crt(x, y, w, t, o = {}) {
  const h = w * 0.78;
  g.save(); g.translate(x, y);
  g.fillStyle = '#C9C2B0'; rrect(g, -w / 2, -h / 2, w, h, w * 0.05); g.fill();
  g.fillStyle = '#0A1A14'; rrect(g, -w * 0.42, -h * 0.4, w * 0.84, h * 0.66, w * 0.03); g.fill();
  g.fillStyle = '#B7AF9C'; g.fillRect(-w * 0.18, h / 2, w * 0.36, w * 0.06); g.fillRect(-w * 0.32, h / 2 + w * 0.06, w * 0.64, w * 0.04);
  g.beginPath(); g.rect(-w * 0.4, -h * 0.38, w * 0.8, h * 0.62); g.clip();
  g.font = `700 ${w * 0.05}px ${LAT}`; g.fillStyle = '#7CE0A0'; g.textAlign = 'left';
  const sc = (t * 3) % 1, n0 = Math.floor(t * 3);
  for (let r = 0; r < 12; r++) { let s = ''; for (let c = 0; c < 18; c++) s += rndL((n0 + r) * 18 + c, 31);
    g.globalAlpha = r === 11 ? 1 : 0.6; g.fillText(s, -w * 0.37, -h * 0.32 + (r - sc) * w * 0.055); }
  g.restore();
}
// top-down schematic of a courtyard with an S-shaped screen (illustrative, not a real plan)
export function courtyard(t, p = 1) {
  sky(0.55, 0.18);
  g.save();
  g.strokeStyle = 'rgba(142,216,204,0.35)'; g.lineWidth = 3 * u;
  g.fillStyle = KC.bg3;
  const blk = (x, y, w, h) => { g.fillRect(x * u, y * u, w * u, h * u); g.strokeRect(x * u, y * u, w * u, h * u); };
  blk(60, 560, 960, 230); blk(60, 790, 200, 640); blk(820, 790, 200, 640);
  for (let i = 0; i < 14; i++) { g.strokeStyle = 'rgba(142,216,204,0.12)'; g.beginPath(); g.moveTo((100 + i * 66) * u, 580 * u); g.lineTo((100 + i * 66) * u, 770 * u); g.stroke(); }
  g.fillStyle = '#0E2A22'; g.fillRect(260 * u, 790 * u, 560 * u, 640 * u);
  for (let i = 0; i < 22; i++) { const tx = 290 + hash(i, 61) * 500, ty = 830 + hash(i, 62) * 560; if (Math.hypot(tx - 600, ty - 1080) < 170) continue;
    g.fillStyle = '#1C4A3A'; g.beginPath(); g.arc(tx * u, ty * u, (22 + hash(i, 63) * 18) * u, 0, 7); g.fill(); }
  g.fillStyle = '#123F4A'; g.beginPath(); g.ellipse(430 * u, 1250 * u, 90 * u, 50 * u, 0.2, 0, 7); g.fill();
  // the S-shaped copper screen
  g.strokeStyle = KC.cop; g.lineWidth = 16 * u; g.lineCap = 'round';
  const q = clamp(p);
  g.beginPath(); for (let k = 0; k <= 40 * q; k++) { const s = k / 40, xx = 520 + s * 180, yy = 1080 + Math.sin(s * Math.PI * 2) * 40; k ? g.lineTo(xx * u, yy * u) : g.moveTo(xx * u, yy * u); } g.stroke();
  g.restore();
}
// wooden auction gavel
export function gavel(x, y, s, a = 0) {
  g.save(); g.translate(x, y); g.rotate(a); g.scale(s, s);
  g.fillStyle = '#7A4A26'; g.fillRect(-0.05, -0.1, 0.1, 1.0);
  g.fillStyle = '#9A6234'; rrect(g, -0.35, -0.3, 0.7, 0.3, 0.06); g.fill();
  g.fillStyle = '#C79A62'; g.fillRect(-0.36, -0.22, 0.08, 0.14); g.fillRect(0.28, -0.22, 0.08, 0.14);
  g.restore();
}

export default () => [
  // ---------------- hook
  { from: bar(0), to: bar(2), cues: [[0, 'riser', 0.5], [1.0, 'impact', 1.0], [1.6, 'type', 0.4]],
    draw(t) {
      const [sx, sy] = shake(t, 1.0, 26); g.translate(sx, sy);
      sky(0.5, 0.35);
      copperSheet(40 * u, 560 * u, W - 80 * u, 900 * u, { cols: 22, rows: 22, curve: 0.75, lit: remap(t, 0.2, 1.0), seed: 4, phase: t * 0.15 });
      band(200 * u, 330 * u, 0.85); band(1440 * u, 150 * u, 0.85);
      say('ประติมากรรมกลางลาน CIA', TX, 320 * u, t - 0.1, { size: 60 * u, weight: 800, color: C.cream });
      say('ที่ซ่อนรหัสลับ', TX, 440 * u, t - 0.6, { size: 60 * u, weight: 800, color: KC.copLite });
      say('35 ปี ไม่มีใครไขส่วนสุดท้ายได้', TX, 1530 * u, t - 1.3, { size: 46 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(2), to: bar(4), cues: Array.from({ length: 8 }, (_, i) => [0.2 + i * 0.18, 'type', 0.3]).concat([[2.5, 'thump', 0.6]]),
    draw(t) {
      sky(0.45);
      kicker('ส่วนที่ 4 · K4', TX, 280 * u, t, { color: KC.copLite });
      big('97', TX, 520 * u, t - 0.1, { size: 220 * u, color: C.cream });
      letterGrid(K4, TX, 680 * u, 14, 60 * u, { show: Math.floor(remap(t, 0.2, 2.2) * 97), color: 'rgba(232,174,114,0.9)' });
      say('ตัวอักษร 97 ตัวสุดท้าย', TX, 1340 * u, t - 2.2, { size: 54 * u, weight: 800, color: C.cream });
      say('นักถอดรหัสทั่วโลกพยายามมาหลายสิบปี', TX, 1440 * u, t - 2.8, { size: 44 * u, weight: 800, color: KC.copLite });
      finish();
    } },
  // ---------------- title card
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 470 * u, 90 * u, 14 * u); g.fill();
      text(g, 'LANGLEY · VIRGINIA · 1990', 305 * u, 472 * u, { size: 28 * u, weight: 700, family: LAT, color: C.inkSoft, tracking: 2 * u });
      g.restore();
      big('Kryptos', TX, 760 * u, t - 0.2, { size: 170 * u, color: C.ink });
      say('ประติมากรรมรหัสลับของ CIA', TX, 900 * u, t - 0.6, { size: 52 * u, weight: 800, color: C.ink });
      stamp('ENCRYPTED', TX, 1130 * u, t - 2.5, { size: 110 * u, rot: -0.1, color: '#A65A22' });
      say('ชื่อมาจากภาษากรีก แปลว่า “ซ่อนเร้น”', TX, 1400 * u, t - 3.0, { size: 44 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------- where
  { from: bar(6), to: bar(9), cues: [[0.2, 'whoosh', 0.6], [1.2, 'swish', 0.4], [3.0, 'pop', 0.8]],
    draw(t) {
      g.save(); const z = track(t, [[0, 1.0], [0.2, 1.12]], 'heavy'); g.translate(600 * u, 1080 * u); g.scale(z, z); g.translate(-600 * u, -1080 * u);
      courtyard(t, remap(t, 1.2, 2.6)); g.restore();
      topScrim(560, '6,20,23', 0.95);
      kicker('แลงลีย์ รัฐเวอร์จิเนีย สหรัฐฯ', TX, 260 * u, t, { color: KC.copLite });
      say('ลานด้านในสำนักงานใหญ่ CIA', TX, 380 * u, t - 0.3, { size: 54 * u, weight: 800, color: C.cream });
      pin(610 * u, 1060 * u, t - 3.0, { label: 'Kryptos', side: 1, color: KC.cop, labelColor: C.cream });
      band(1440 * u, 130 * u, 0.8);
      say('ภาพประกอบเชิงสัญลักษณ์ ไม่ใช่ผังจริง', TX, 1520 * u, t - 0.8, { size: 32 * u, weight: 700, color: C.fog });
      finish(0.8);
    } },
  { from: bar(9), to: bar(10), cues: [[0, 'tick', 0.6], [0.2, 'tick', 0.6], [0.4, 'tick', 0.6], [1.0, 'thump', 0.6]],
    draw(t) {
      sky(0.45);
      kicker('พฤศจิกายน 1990', TX, 420 * u, t, { color: KC.copLite });
      const d = ['01', '02', '03'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, [0, 0.2, 0.4], t, { size: 360 * u, bg: KC.cop, fg: KC.bg, r: 18 * u });
      say('เปิดตัวอย่างเป็นทางการ', TX, 1240 * u, t - 0.9, { size: 56 * u, weight: 800, color: C.cream });
      finish();
    } },
  // ---------------- the artist
  { from: bar(10), to: bar(13), cues: Array.from({ length: 10 }, (_, i) => [1.0 + i * 0.5, 'click', 0.35]).concat([[0.1, 'whoosh', 0.5]]),
    draw(t) {
      sky(0.6);
      const n = Math.floor(remap(t, 0.8, 6.5) * 120);
      const P = copperSheet(420 * u, 760 * u, 560 * u, 640 * u, { cols: 10, rows: 12, curve: 0.3, lit: 0.9, seed: 12, show: n });
      // cutting spark at the newest letter
      if (n > 0 && n < 120) { const [px, py] = P(Math.floor(n / 10), n % 10);
        for (let k = 0; k < 6; k++) { const a = hash(k + n * 7, 5) * 6.28, d = (10 + hash(k + n, 6) * 30) * u; g.fillStyle = '#FFE9B8'; g.fillRect(px + Math.cos(a) * d, py + Math.sin(a) * d, 4 * u, 4 * u); } }
      person(250 * u, 1400 * u, 130 * u, '#02090A');
      kicker('ศิลปินผู้สร้าง', TX, 290 * u, t, { color: KC.copLite });
      big('Jim Sanborn', TX, 460 * u, t - 0.2, { size: 110 * u, color: C.cream });
      band(1440 * u, 150 * u, 0.8);
      say('ฉลุตัวอักษรทะลุแผ่นทองแดง', TX, 1530 * u, t - 2.5, { size: 48 * u, weight: 800, color: C.cream });
      finish();
    } },
  // ---------------- the cryptographer
  { from: bar(13), to: bar(16), cues: [[0.2, 'thump', 0.6], [2.5, 'pop', 0.6], [5.0, 'chime', 0.5]],
    draw(t) {
      sky(0.55);
      g.save(); g.globalAlpha = 0.9; tableau(TX - 260 * u, 700 * u, 40 * u, { rows: 13, cols: 13, p: remap(t, 0.3, 3), dimA: 0.3, row: t > 5 ? 3 : -1, col: t > 5 ? 8 : -1 }); g.restore();
      person(150 * u, 1250 * u, 100 * u, '#02090A'); person(910 * u, 1250 * u, 100 * u, '#02090A');
      kicker('ผู้ช่วยออกแบบรหัส', TX, 290 * u, t, { color: KC.copLite });
      big('Ed Scheidt', TX, 460 * u, t - 0.2, { size: 110 * u, color: C.cream });
      band(1260 * u, 330 * u, 0.85);
      const y = say('อดีตประธานศูนย์รหัสลับของ CIA', TX, 1340 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.cream });
      say('สอนเทคนิคเข้ารหัสให้ซานบอร์น', TX, y + 10 * u, t - 5.0, { size: 46 * u, weight: 800, color: KC.copLite });
      finish();
    } },
  // ---------------- anatomy: ~1,800 letters, half message, half table
  { from: bar(16), to: bar(19), cues: [[0.2, 'riser', 0.4], [2.5, 'impact', 0.8], [4.4, 'swish', 0.5]],
    draw(t) {
      sky(0.5);
      const split = remap(t, 4.2, 5.2);
      const sec = (i) => { const r = Math.floor(i / 24); return r < 2 ? 0 : r < 12 ? 1 : r < 21 ? 2 : 3; };
      copperSheet(40 * u, 640 * u, W - 80 * u, 700 * u, { cols: 24, rows: 24, curve: 0.55, seed: 21,
        letter: (i, r, c) => c < 12 ? rndL(i, 21) : ALPHA[(r + c) % 26],
        hi: (i) => { const c = i % 24; return c < 12 && sec(i) === 3 ? split * 0.9 : 0; } });
      band(180 * u, 400 * u, 0.85);
      const n = Math.round(1800 * clamp(spring(t - 0.2, 40, 13)));
      text(g, `${n.toLocaleString('en-US')}`, TX, 420 * u, { size: 170 * u, weight: 400, family: SERIF, color: KC.copLite });
      say('ตัวอักษรราว 1,800 ตัว บนแผ่นทองแดง', TX, 520 * u, t - 0.6, { size: 50 * u, weight: 800, color: C.cream });
      band(1430 * u, 160 * u, 0.85);
      say('ครึ่งหนึ่งคือข้อความลับ 4 ส่วน K1–K4', TX, 1490 * u, t - 2.5, { size: 42 * u, weight: 800, color: C.cream });
      say('อีกครึ่งคือตารางถอดรหัส', TX, 1556 * u, t - 4.4, { size: 42 * u, weight: 800, color: KC.copLite });
      finish();
    } },
];
