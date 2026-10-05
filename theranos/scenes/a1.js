// Theranos — Act 1: 0:00–0:55 (bars 0–22). The promise and the rise.
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, rrect, text, typewriter, topScrim, shake } from './kit.js';

export const BLOOD = '#B3261E', BOX = '#15161A', LAB = '#DDE3E6', SANS = 'Inter, sans-serif';
export const money = (n) => '$' + Math.round(n).toLocaleString('en-US');

// stylised drop of blood; (x, y) = centre of the round part, s = total height
export function drop(x, y, s, o = {}) {
  const { color = BLOOD, shine = 0.35, rot = 0 } = o;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); g.fillStyle = color;
  g.beginPath(); g.moveTo(0, -0.62);
  g.bezierCurveTo(0.1, -0.4, 0.34, -0.18, 0.34, 0.04); g.arc(0, 0.04, 0.34, 0, Math.PI);
  g.bezierCurveTo(-0.34, -0.18, -0.1, -0.4, 0, -0.62); g.fill();
  if (shine) { g.globalAlpha = shine; g.fillStyle = '#FFFFFF'; g.beginPath(); g.ellipse(-0.14, 0.02, 0.06, 0.13, 0.3, 0, 7); g.fill(); }
  g.restore();
}
// one blood-test icon: a tiny tube with a coloured fill; s = height
export function tube(x, y, s, color = BLOOD, o = {}) {
  const { glass = '#E9ECEE', cap = '#6E7B86' } = o;
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = glass; rrect(g, -0.16, -0.4, 0.32, 0.9, 0.16); g.fill();
  g.fillStyle = color; rrect(g, -0.16, 0.05, 0.32, 0.45, 0.16); g.fill();
  g.fillStyle = cap; g.fillRect(-0.2, -0.5, 0.4, 0.14);
  g.restore();
}
// the sleek black "Edison"-style box, (x, y) = bottom centre, w = width.
// door 0..1 slides the front door up; prog 0..1 fills the screen bar; label = small screen text.
export function edison(x, y, w, o = {}) {
  const { door = 0, prog = 0, label = '', err = false, cart = 0 } = o;
  const h = w * 0.78;
  g.save(); g.translate(x, y);
  g.fillStyle = 'rgba(0,0,0,0.25)'; g.beginPath(); g.ellipse(0, 0, w * 0.56, w * 0.05, 0, 0, 7); g.fill();
  g.fillStyle = BOX; rrect(g, -w / 2, -h, w, h, w * 0.04); g.fill();
  g.fillStyle = '#26282E'; rrect(g, -w / 2, -h, w, h * 0.08, w * 0.04); g.fill();
  // door bay
  const dx = -w * 0.42, dy = -h * 0.72, dw = w * 0.42, dh = h * 0.48;
  g.fillStyle = '#050506'; g.fillRect(dx, dy, dw, dh);
  if (cart > 0) { g.save(); g.beginPath(); g.rect(dx, dy, dw, dh); g.clip();
    const cw = dw * 0.6, cy = dy + dh * 0.4 + (1 - clamp(cart)) * dh * 0.7;
    g.fillStyle = '#E9ECEE'; rrect(g, dx + (dw - cw) / 2, cy, cw, dh * 0.4, 8 * u); g.fill(); drop(dx + dw / 2, cy + dh * 0.22, dh * 0.22, { shine: 0 }); g.restore(); }
  g.save(); g.beginPath(); g.rect(dx, dy - dh, dw, dh * 2); g.clip();
  g.fillStyle = '#1E2026'; g.fillRect(dx, dy - dh * clamp(door), dw, dh);
  g.strokeStyle = '#33363D'; g.lineWidth = 2 * u; g.strokeRect(dx, dy - dh * clamp(door), dw, dh);
  g.restore();
  // screen
  const sx = w * 0.06, sy = -h * 0.72, sw = w * 0.36, sh = h * 0.3;
  g.fillStyle = err ? '#2A0D0D' : '#0D2530'; rrect(g, sx, sy, sw, sh, w * 0.015); g.fill();
  g.fillStyle = 'rgba(255,255,255,0.15)'; g.fillRect(sx + sw * 0.1, sy + sh * 0.62, sw * 0.8, sh * 0.12);
  g.fillStyle = err ? '#E0473A' : '#5ED0E6'; g.fillRect(sx + sw * 0.1, sy + sh * 0.62, sw * 0.8 * clamp(prog), sh * 0.12);
  if (label) text(g, label, sx + sw / 2, sy + sh * 0.42, { size: sh * 0.2, weight: 700, family: SANS, color: err ? '#E0473A' : '#BFEFF8' });
  // wordmark in plain type + drop
  drop(-w * 0.38, -h * 0.13, h * 0.09, { shine: 0 });
  text(g, 'THERANOS', -w * 0.34, -h * 0.1, { size: w * 0.045, weight: 700, family: SANS, color: '#D9DCE1', align: 'left', tracking: w * 0.008 });
  g.restore();
}
// big generic commercial lab analyzer; (x, y) bottom centre
export function analyzer(x, y, w, t = 0) {
  const h = w * 0.62;
  g.save(); g.translate(x, y);
  g.fillStyle = '#B8BEC4'; g.fillRect(-w / 2, -h, w, h);
  g.fillStyle = '#CDD2D7'; g.fillRect(-w / 2, -h, w, h * 0.22);
  g.fillStyle = '#9BA3AA'; g.fillRect(-w / 2, -h * 0.78, w, h * 0.03);
  // sample carousel on the top deck
  g.fillStyle = '#7E878F'; g.beginPath(); g.ellipse(-w * 0.18, -h * 0.98, w * 0.2, w * 0.05, 0, 0, 7); g.fill();
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 0.6; const tx = -w * 0.18 + Math.cos(a) * w * 0.16, ty = -h * 0.98 + Math.sin(a) * w * 0.035;
    if (Math.sin(a) < -0.2) continue; tube(tx, ty - w * 0.03, w * 0.07, i % 3 ? BLOOD : '#D9A441'); }
  // doors and vents
  for (let i = 0; i < 4; i++) { g.strokeStyle = '#8D959C'; g.lineWidth = 3 * u; g.strokeRect(-w / 2 + w * 0.04 + i * w * 0.24, -h * 0.68, w * 0.2, h * 0.6); }
  for (let i = 0; i < 6; i++) { g.fillStyle = '#8D959C'; g.fillRect(w * 0.26, -h * 0.62 + i * h * 0.06, w * 0.16, h * 0.02); }
  // monitor on an arm
  g.fillStyle = '#5C646B'; g.fillRect(w * 0.36, -h * 1.25, w * 0.02, h * 0.3);
  g.fillStyle = '#2B3138'; rrect(g, w * 0.2, -h * 1.5, w * 0.3, h * 0.28, 6 * u); g.fill();
  g.fillStyle = '#7FD08A'; for (let i = 0; i < 4; i++) g.fillRect(w * 0.23, -h * 1.45 + i * h * 0.05, w * (0.1 + hash(i, 3) * 0.12), h * 0.02);
  text(g, 'COMMERCIAL ANALYZER', 0, -h * 0.82, { size: w * 0.035, weight: 700, family: SANS, color: '#4E565D', tracking: 2 * u });
  g.restore();
}
// stage curtain over a rect; open 0..1 pulls both halves aside
export function curtain(x0, y0, w, h, open) {
  const half = w / 2 * (1 - clamp(open) * 0.86);
  for (const sd of [0, 1]) {
    const xa = sd ? x0 + w - half : x0;
    g.fillStyle = '#6E1A1A'; g.fillRect(xa, y0, half, h);
    for (let i = 0; i < 6; i++) { g.fillStyle = i % 2 ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.06)'; g.fillRect(xa + (i / 6) * half, y0, half / 6, h); }
  }
  g.fillStyle = '#4A1010'; g.fillRect(x0 - 10 * u, y0 - 30 * u, w + 20 * u, 40 * u);
}
// generic woman silhouette in a black turtleneck (never a likeness)
export function turtle(x, y, s, color = BOX, o = {}) {
  const { collar = '#000000' } = o;
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color;
  g.beginPath(); g.ellipse(0, -1.18, 0.33, 0.42, 0, 0, 7); g.fill();
  g.beginPath(); g.arc(0.05, -1.62, 0.17, 0, 7); g.fill();                 // hair bun
  g.beginPath(); g.moveTo(-0.9, 0.6); g.quadraticCurveTo(-0.85, -0.45, -0.24, -0.55); g.lineTo(0.24, -0.55); g.quadraticCurveTo(0.85, -0.45, 0.9, 0.6); g.closePath(); g.fill();
  g.fillStyle = collar; rrect(g, -0.22, -0.86, 0.44, 0.36, 0.08); g.fill();  // turtleneck collar
  g.restore();
}
// cover of an invented magazine
export function magazine(x, y, w, t, o = {}) {
  const { line = '', sub = '', bg = '#E7E1D3' } = o;
  const h = w * 1.32;
  g.save(); g.translate(x, y);
  g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(-w / 2 + 12 * u, -h / 2 + 14 * u, w, h);
  g.fillStyle = bg; g.fillRect(-w / 2, -h / 2, w, h);
  text(g, 'MOGUL', 0, -h / 2 + w * 0.2, { size: w * 0.2, weight: 400, family: SERIF, color: BLOOD, tracking: w * 0.02 });
  g.fillStyle = C.ink; g.fillRect(-w * 0.42, -h / 2 + w * 0.25, w * 0.84, 2 * u);
  g.save(); g.beginPath(); g.rect(-w / 2, -h / 2, w, h); g.clip(); turtle(0, h / 2 + w * 0.02, w * 0.5); g.restore();
  if (line) text(g, line, -w * 0.44, -h / 2 + w * 0.42, { size: w * 0.1, weight: 400, family: SERIF, color: C.ink, align: 'left' });
  if (sub) text(g, sub, -w * 0.44, -h / 2 + w * 0.5, { size: w * 0.04, weight: 700, family: SANS, color: C.inkSoft, align: 'left', tracking: 1 * u });
  g.restore();
}
// generic newspaper front page with an invented masthead
export function newspaper(x, y, w, t, o = {}) {
  const { head = '', date = '', rot = 0 } = o;
  const h = w * 1.25;
  g.save(); g.translate(x, y); g.rotate(rot);
  g.fillStyle = 'rgba(0,0,0,0.2)'; g.fillRect(-w / 2 + 10 * u, -h / 2 + 12 * u, w, h);
  g.fillStyle = '#F4F0E6'; g.fillRect(-w / 2, -h / 2, w, h);
  text(g, 'THE DAILY LEDGER', 0, -h / 2 + w * 0.12, { size: w * 0.085, weight: 400, family: SERIF, color: C.ink });
  g.fillStyle = C.ink; g.fillRect(-w * 0.45, -h / 2 + w * 0.15, w * 0.9, 3 * u); g.fillRect(-w * 0.45, -h / 2 + w * 0.2, w * 0.9, 1.5 * u);
  if (date) text(g, date, 0, -h / 2 + w * 0.185, { size: w * 0.026, weight: 700, family: SANS, color: C.inkSoft, tracking: 2 * u });
  if (head) head.split('\n').forEach((ln, i) => text(g, ln, 0, -h / 2 + w * 0.32 + i * w * 0.085, { size: w * 0.072, weight: 800, family: SANS, color: C.ink }));
  // picture box + columns
  g.fillStyle = '#D6D0C2'; g.fillRect(-w * 0.45, -h / 2 + w * 0.5, w * 0.42, w * 0.36);
  drop(-w * 0.24, -h / 2 + w * 0.7, w * 0.2, { shine: 0 });
  for (let c = 0; c < 3; c++) for (let r = 0; r < 16; r++) {
    const cx = c === 0 ? -w * 0.45 : c === 1 ? 0 : w * 0.24, cw = c === 0 ? w * 0.42 : w * 0.21;
    const ry = -h / 2 + w * (c === 0 ? 0.9 : 0.5) + r * w * 0.035; if (ry > h / 2 - w * 0.06) continue;
    g.fillStyle = '#A9A396'; g.fillRect(cx, ry, cw * (0.7 + hash(r + c * 20, 4) * 0.3), 4 * u);
  }
  g.restore();
}
// judge's gavel and sound block; swing 0..1 lifts it
export function gavel(x, y, s, swing = 0) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = '#4A2E1C'; g.beginPath(); g.ellipse(0, 0.32, 0.55, 0.12, 0, 0, 7); g.fill(); g.fillRect(-0.55, 0.2, 1.1, 0.12);
  g.fillStyle = '#6B4329'; g.beginPath(); g.ellipse(0, 0.2, 0.55, 0.12, 0, 0, 7); g.fill();
  g.translate(0.7, 0); g.rotate(-0.15 - swing * 0.8);
  g.fillStyle = '#7A4B2C'; rrect(g, -1.5, -0.05, 1.3, 0.1, 0.05); g.fill();
  g.fillStyle = '#5A3520'; rrect(g, -0.32, -0.22, 0.28, 0.44, 0.06); g.fill();
  g.fillStyle = '#C9A94A'; g.fillRect(-0.33, -0.16, 0.3, 0.05); g.fillRect(-0.33, 0.11, 0.3, 0.05);
  g.restore();
}
// prison bars dropping in; p 0..1
export function bars(x0, y0, w, h, p = 1, color = '#2A2D33') {
  g.fillStyle = color; const n = 9;
  for (let i = 0; i < n; i++) { const x = x0 + (i + 0.5) * (w / n) - 9 * u; g.fillRect(x, y0, 18 * u, h * clamp(p * 1.4 - i * 0.05)); }
  g.fillRect(x0, y0, w, 22 * u); g.fillRect(x0, y0 + h * 0.5, w * clamp(p), 18 * u);
}
// generic pharmacy storefront; (x, y) bottom-left; shut 0..1 rolls the shutter down
export function storefront(x, y, w, t, o = {}) {
  const { shut = 0, booth = true } = o;
  const h = w * 0.8;
  g.save(); g.translate(x, y);
  g.fillStyle = '#E9E4D8'; g.fillRect(0, -h, w, h);
  g.fillStyle = '#2E5E4E'; g.fillRect(0, -h, w, h * 0.18);
  text(g, 'PHARMACY', w / 2, -h + h * 0.125, { size: h * 0.09, weight: 800, family: SANS, color: '#F4F0E6', tracking: 4 * u });
  g.fillStyle = '#9EC3CC'; g.fillRect(w * 0.06, -h * 0.74, w * 0.88, h * 0.62);
  if (booth) { g.fillStyle = '#F7F7F7'; g.fillRect(w * 0.5, -h * 0.6, w * 0.38, h * 0.48);
    g.fillStyle = BLOOD; drop(w * 0.69, -h * 0.47, h * 0.12, { shine: 0 });
    text(g, 'WELLNESS', w * 0.69, -h * 0.3, { size: h * 0.05, weight: 800, family: SANS, color: C.ink, tracking: 2 * u });
    text(g, 'CENTER', w * 0.69, -h * 0.23, { size: h * 0.05, weight: 800, family: SANS, color: C.ink, tracking: 2 * u }); }
  for (let i = 0; i < 3; i++) person(w * 0.14 + i * w * 0.11, -h * 0.12, h * 0.1, 'rgba(30,40,45,0.55)');
  if (shut > 0) { g.fillStyle = '#7D8287'; g.fillRect(w * 0.06, -h * 0.74, w * 0.88, h * 0.62 * clamp(shut));
    g.fillStyle = '#6A6F74'; for (let k = 0; k < 20; k++) { const yy = -h * 0.74 + k * h * 0.031; if (yy > -h * 0.74 + h * 0.62 * clamp(shut)) break; g.fillRect(w * 0.06, yy, w * 0.88, 3 * u); } }
  g.restore();
}
// labelled board-member silhouette card
function member(x, y, s, name, role, t, at) {
  const p = spring(t - at, 'playful'); if (p <= 0) return;
  g.save(); g.translate(x, y); g.scale(p, p);
  person(0, 0, s, '#2B3A55', { tie: BLOOD });
  text(g, name, 0, s * 1.05, { size: 34 * u, weight: 800, family: SANS, color: C.ink });
  text(g, role, 0, s * 1.05 + 46 * u, { size: 28 * u, weight: 700, family: THAI, color: C.inkSoft });
  g.restore();
}

export default () => [
  // ---------------- hook: one drop, two hundred tests
  { from: bar(0), to: bar(2), cues: [[0, 'whoosh', 0.5], [0.55, 'pop', 0.9], [0.7, 'riser', 0.4], [2.0, 'thump', 0.6]],
    draw(t) {
      night('#0D0F14');
      const fall = clamp(t / 0.55);
      if (t < 0.6) drop(TX, 200 * u + fall * fall * 700 * u, 220 * u);
      else {
        const s = clamp(spring(t - 0.6, 'snappy'));
        for (let i = 0; i < 200; i++) { const c = i % 20, r = Math.floor(i / 20);
          const tx = 100 * u + c * 41 * u, ty = 700 * u + r * 62 * u;
          const k = clamp(spring(t - 0.6 - hash(i, 9) * 0.35, 'snappy'));
          tube(TX + (tx - TX) * k, 900 * u + (ty - 900 * u) * k, 46 * u * (0.4 + 0.6 * k), i % 7 === 0 ? '#D9A441' : BLOOD); }
        if (s < 1) drop(TX, 900 * u, 220 * u * (1 - s));
      }
      big('1 หยด', TX, 470 * u, t - 0.1, { size: 190 * u, color: C.cream });
      say('ตรวจได้มากกว่า 200 รายการ?', TX, 1460 * u, t - 1.1, { size: 58 * u, weight: 800, color: '#F08A7E' });
      finish(0.8);
    } },
  { from: bar(2), to: bar(4), cues: [[0.1, 'tick', 0.4], [0.4, 'tick', 0.4], [0.7, 'tick', 0.4], [1.0, 'tick', 0.4], [2.5, 'impact', 1.1]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 26); g.translate(sx, sy);
      night('#0D0F14');
      const up = clamp(spring(t - 0.1, 26, 12)), down = t > 2.5 ? clamp(spring(t - 2.5, 'snappy')) : 0;
      const v = 9e9 * up * (1 - down);
      g.fillStyle = 'rgba(255,255,255,0.06)'; rrect(g, 70 * u, 640 * u, W - 160 * u, 300 * u, 20 * u); g.fill();
      text(g, money(v), TX, 840 * u, { size: 118 * u, weight: 400, family: SERIF, color: t > 2.5 ? '#F08A7E' : C.cream });
      kicker('สตาร์ทอัพตรวจเลือด ที่เคยมีมูลค่า', TX, 520 * u, t, { color: '#F08A7E' });
      say('ก่อนจะเหลือศูนย์', TX, 1100 * u, t - 2.5, { size: 72 * u, weight: 800, color: '#F08A7E' });
      say('เพราะเทคโนโลยีนั้น ไม่ได้ทำงานอย่างที่อ้าง', TX, 1250 * u, t - 3.1, { size: 44 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 420 * u, 90 * u, 14 * u); g.fill();
      text(g, 'PALO ALTO · 2003–2018', 280 * u, 472 * u, { size: 28 * u, weight: 700, family: SANS, color: C.inkSoft, tracking: 2 * u });
      g.restore();
      drop(TX, 700 * u, 150 * u * clamp(spring(t - 0.2, 'playful')), { shine: 0.3 });
      big('THERANOS', TX, 930 * u, t - 0.3, { size: 130 * u, color: C.ink });
      say('การหลอกลวงครั้งใหญ่แห่งซิลิคอนแวลลีย์', TX, 1060 * u, t - 0.8, { size: 46 * u, weight: 800 });
      stamp('FRAUD', TX, 1290 * u, t - 2.5, { size: 140 * u, rot: -0.1 });
      say('เรื่องจริงของ Elizabeth Holmes', TX, 1480 * u, t - 3.0, { size: 44 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------- chapter 1 — the student and the promise
  { from: bar(6), to: bar(9), cues: [[0.1, 'tick', 0.5], [0.3, 'tick', 0.5], [0.5, 'tick', 0.5], [0.7, 'thump', 0.6], [2.5, 'pop', 0.6], [5.0, 'swish', 0.5]],
    draw(t) {
      paper();
      kicker('ปี 2003', TX, 300 * u, t);
      const ages = ['16', '17', '18', '19'];
      flip(TX, 560 * u, 300 * u, 300 * u, ages, ages.map((_, i) => 0.1 + i * 0.2), t, { size: 220 * u, bg: C.ink, fg: C.paper, r: 16 * u });
      text(g, 'ปี', TX + 210 * u, 600 * u, { size: 52 * u, weight: 800, family: THAI, color: C.inkSoft, alpha: clamp(t - 0.7) });
      turtle(TX, 1180 * u, 170 * u * clamp(spring(t - 0.8, 'default')), '#2B3A55', { collar: '#1B2638' });
      say('นักศึกษาวิศวกรรมเคมี มหาวิทยาลัย Stanford', TX, 1300 * u, t - 2.5, { size: 44 * u, weight: 800 });
      say('ก่อตั้งบริษัท แล้วไม่นานก็ลาออกจากมหาวิทยาลัย', TX, 1400 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(9), to: bar(11), cues: [[0.2, 'swish', 0.5], [2.5, 'pop', 0.8]],
    draw(t) {
      paper();
      g.fillStyle = C.paper2; rrect(g, 70 * u, 540 * u, 430 * u, 640 * u, 18 * u); g.fill(); rrect(g, 530 * u, 540 * u, 400 * u, 640 * u, 18 * u); g.fill();
      text(g, 'แบบเดิม', 285 * u, 620 * u, { size: 44 * u, weight: 800, family: THAI, color: C.inkSoft });
      for (let i = 0; i < 5; i++) { const k = clamp(spring(t - 0.3 - i * 0.15, 'snappy')); tube(150 * u + i * 68 * u, 900 * u + (1 - k) * 80 * u, 170 * u * k, BLOOD); }
      // syringe
      g.save(); g.translate(285 * u, 1080 * u); g.rotate(-0.2); g.fillStyle = '#9AA6B0'; g.fillRect(-150 * u, -16 * u, 200 * u, 32 * u); g.fillRect(50 * u, -3 * u, 110 * u, 6 * u); g.fillRect(-190 * u, -26 * u, 40 * u, 52 * u); g.restore();
      text(g, 'เจาะเส้นเลือด · หลายหลอด', 285 * u, 1160 * u, { size: 30 * u, weight: 800, family: THAI, color: C.ink });
      if (t > 2.3) {
        text(g, 'สิ่งที่เธอสัญญา', 730 * u, 620 * u, { size: 44 * u, weight: 800, family: THAI, color: C.red });
        // fingertip + one drop
        g.fillStyle = '#E3B9A0'; rrect(g, 670 * u, 900 * u, 120 * u, 260 * u, 60 * u); g.fill();
        drop(730 * u, 860 * u, 110 * u * clamp(spring(t - 2.5, 'playful')));
        text(g, 'เจาะปลายนิ้ว · หยดเดียว', 730 * u, 1160 * u, { size: 30 * u, weight: 800, family: THAI, color: C.ink });
      }
      say('ไม่ต้องใช้เข็มใหญ่อีกต่อไป', TX, 360 * u, t - 0.1, { size: 58 * u, weight: 800 });
      say('ตรวจได้เร็วกว่า ถูกกว่า และเจ็บน้อยกว่า', TX, 1340 * u, t - 3.2, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(11), to: bar(14), cues: [[0.2, 'whoosh', 0.5], [1.2, 'click', 0.8], [2.0, 'click', 0.6], [2.6, 'riser', 0.4], [5.0, 'chime', 0.7]],
    draw(t) {
      night('#101318');
      g.fillStyle = 'rgba(94,208,230,0.08)'; g.beginPath(); g.ellipse(TX, 1180 * u, 420 * u, 90 * u, 0, 0, 7); g.fill();
      const door = t < 1.2 ? 0 : t < 2.0 ? clamp(spring(t - 1.2, 'snappy')) : 1 - clamp(spring(t - 2.0, 'snappy'));
      const prog = remap(t, 2.6, 6.0);
      edison(TX, 1180 * u, 640 * u * clamp(spring(t - 0.1, 'heavy')), { door, cart: clamp((t - 1.3) / 0.5), prog, label: t > 6 ? '200+ TESTS' : 'ANALYZING' });
      g.fillStyle = 'rgba(10,12,16,0.75)'; g.fillRect(0, 230 * u, W, 280 * u);
      kicker('เครื่อง “Edison”', TX, 300 * u, t, { color: '#5ED0E6' });
      say('กล่องเล็ก ๆ ขนาดวางบนโต๊ะได้', TX, 410 * u, t - 0.3, { size: 54 * u, weight: 800, color: C.cream });
      say('บริษัทอ้างว่าตรวจเลือดได้หลายร้อยรายการ\nจากเลือดเพียงไม่กี่หยด', TX, 1300 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- chapter 2 — the rise
  { from: bar(14), to: bar(16), cues: Array.from({ length: 5 }, (_, i) => [0.2 + i * 0.35, 'pop', 0.5]).concat([[2.6, 'thump', 0.6]]),
    draw(t) {
      paper();
      kicker('คณะกรรมการบริษัท', TX, 300 * u, t);
      say('เต็มไปด้วยชื่อใหญ่ของการเมืองสหรัฐฯ', TX, 410 * u, t - 0.1, { size: 50 * u, weight: 800 });
      const M = [['George Shultz', 'อดีต รมว.ต่างประเทศ'], ['Henry Kissinger', 'อดีต รมว.ต่างประเทศ'], ['James Mattis', 'นายพลนาวิกโยธิน'], ['William Perry', 'อดีต รมว.กลาโหม'], ['Sam Nunn', 'อดีตวุฒิสมาชิก']];
      M.forEach(([n, r], i) => { const row = i < 3 ? 0 : 1, col = row ? i - 3 : i;
        const x = row ? TX - 150 * u + col * 300 * u : TX - 290 * u + col * 290 * u;
        member(x, 760 * u + row * 420 * u, 90 * u, n, r, t, 0.2 + i * 0.35); });
      say('แต่แทบไม่มีใครเชี่ยวชาญการตรวจเลือด', TX, 1460 * u, t - 2.6, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(16), to: bar(18), cues: [[0.2, 'whoosh', 0.5], [1.2, 'pop', 0.7], [2.5, 'chime', 0.5]],
    draw(t) {
      paper();
      const k = clamp(spring(t - 0.1, 'heavy'));
      storefront(110 * u, 1180 * u + (1 - k) * 600 * u, 800 * u, t);
      kicker('ปี 2013 · จับมือ Walgreens', TX, 300 * u, t);
      say('เปิดจุดตรวจเลือดในร้านขายยาเครือใหญ่', TX, 410 * u, t - 0.2, { size: 48 * u, weight: 800 });
      say('ราว 40 สาขา ส่วนใหญ่ในรัฐแอริโซนา', TX, 1300 * u, t - 1.2, { size: 50 * u, weight: 800, color: C.red });
      say('คนทั่วไปเริ่มใช้ผลตรวจจริง', TX, 1420 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(18), to: bar(20), cues: Array.from({ length: 8 }, (_, i) => [0.1 + i * 0.2, 'tick', 0.4]).concat([[2.0, 'impact', 1.0]]),
    draw(t) {
      const [sx, sy] = shake(t, 2.0, 18); g.translate(sx, sy);
      night('#0D0F14');
      const v = 9e9 * clamp(spring(t - 0.1, 22, 11) * 1.003);
      for (let i = 0; i < 9; i++) { const hh = (i + 1) / 9 * 520 * u * clamp(spring(t - 0.1 - i * 0.08, 'snappy'));
        g.fillStyle = i === 8 ? BLOOD : '#2A2F3A'; g.fillRect(120 * u + i * 86 * u, 1440 * u - hh, 66 * u, hh); }
      text(g, money(v), TX, 760 * u, { size: 112 * u, weight: 400, family: SERIF, color: C.cream });
      kicker('ปี 2014', TX, 300 * u, t, { color: '#F08A7E' });
      say('นักลงทุนตีมูลค่าบริษัทราว 9,000 ล้านดอลลาร์', TX, 410 * u, t - 0.2, { size: 44 * u, weight: 800, color: C.cream });
      say('ระดมทุนได้รวมกว่า 700 ล้านดอลลาร์', TX, 1540 * u, t - 2.0, { size: 44 * u, weight: 800, color: '#F08A7E' });
      finish(0.8);
    } },
  { from: bar(20), to: bar(22), cues: [[0.1, 'swish', 0.6], [1.25, 'click', 0.8], [2.5, 'pop', 0.6]],
    draw(t) {
      paper();
      const k = clamp(spring(t - 0.1, 'heavy'));
      g.save(); g.translate(0, (1 - k) * 900 * u); g.rotate(0); magazine(TX, 860 * u, 520 * u, t, { line: '$4.5B', sub: 'YOUNGEST SELF-MADE' }); g.restore();
      kicker('ตามการประเมินของ Forbes', TX, 280 * u, t);
      say('ทรัพย์สินราว 4,500 ล้านดอลลาร์', TX, 1350 * u, t - 1.25, { size: 50 * u, weight: 800, color: C.red });
      say('มหาเศรษฐีหญิงสร้างตัวเองที่อายุน้อยที่สุด\nเสื้อคอเต่าสีดำ กลายเป็นภาพจำ', TX, 1450 * u, t - 2.5, { size: 40 * u, weight: 800 });
      finish(0.6);
    } },
];
