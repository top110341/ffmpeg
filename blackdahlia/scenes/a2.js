// Black Dahlia — Act 2: 0:45–3:00 (bars 18–72). Last sighting, the discovery (one line, no detail), the press,
// the nickname, the mailed envelope, false confessions, suspects (all unproven), Hollywood, and remembering her.
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, measure } from './kit.js';
import { D, SANS, band, dahlia, palm, searchlights, skyline, neonSign, hotel, car, newspaper, envelope, laMap, LAP, approxNote } from './a1.js';

// ---------------------------------------------------------------- props
// 1940s wooden phone booth; figure = generic silhouette seen from behind (never a likeness).
function phoneBooth(x, y, h, t, o = {}) {
  const { figure = 1, light = 1 } = o, w = h * 0.42;
  g.save();
  const gr = g.createRadialGradient(x, y - h * 0.5, 0, x, y - h * 0.5, h * 0.9); gr.addColorStop(0, `rgba(${D.warm},${0.22 * light})`); gr.addColorStop(1, `rgba(${D.warm},0)`);
  g.fillStyle = gr; g.fillRect(x - h, y - h * 1.4, h * 2, h * 1.8);
  g.fillStyle = '#3A2416'; rrect(g, x - w / 2, y - h, w, h, w * 0.04); g.fill();
  g.fillStyle = '#26170D'; g.fillRect(x - w * 0.56, y - h - w * 0.07, w * 1.12, w * 0.1);
  g.fillStyle = '#E9DDC0'; g.fillRect(x - w * 0.4, y - h + w * 0.08, w * 0.8, w * 0.14);
  text(g, 'TELEPHONE', x, y - h + w * 0.185, { size: w * 0.085, weight: 700, family: SANS, color: '#2A190F', tracking: 2 * u });
  const px = x - w * 0.38, py = y - h + w * 0.32, pw = w * 0.76, ph = h - w * 0.32 - w * 0.4;
  g.fillStyle = `rgba(${D.warm},${0.6 * light})`; g.fillRect(px, py, pw, ph);
  if (figure) {
    g.fillStyle = 'rgba(24,12,10,0.9)'; const hx = x - w * 0.02, hy = py + ph * 0.28;
    g.beginPath(); g.ellipse(hx, hy + w * 0.05, w * 0.16, w * 0.2, 0, 0, 7); g.fill();                 // hair
    g.beginPath(); g.moveTo(hx - w * 0.3, py + ph); g.quadraticCurveTo(hx - w * 0.3, hy + w * 0.28, hx, hy + w * 0.24);
    g.quadraticCurveTo(hx + w * 0.3, hy + w * 0.28, hx + w * 0.3, py + ph); g.closePath(); g.fill();   // shoulders
    g.lineWidth = w * 0.07; g.strokeStyle = 'rgba(24,12,10,0.9)'; g.lineCap = 'round';
    g.beginPath(); g.moveTo(hx + w * 0.22, hy + w * 0.35); g.quadraticCurveTo(hx + w * 0.26, hy + w * 0.1, hx + w * 0.14, hy); g.stroke();  // arm to ear
  }
  g.fillStyle = '#26170D'; g.fillRect(x - w * 0.015, py, w * 0.03, ph);
  for (let k = 1; k < 3; k++) g.fillRect(px, py + ph * k / 3 - w * 0.012, pw, w * 0.024);
  g.fillStyle = '#2E1C10'; g.fillRect(x - w / 2, y - w * 0.36, w, w * 0.36);
  g.restore();
}
// rotary-era desk telephone; ring 0..1 shakes the handset
function deskPhone(x, y, s, t, ring = 0) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = 'rgba(0,0,0,0.25)'; g.beginPath(); g.ellipse(0, 0.02, 0.62, 0.08, 0, 0, 7); g.fill();
  g.fillStyle = '#16130F';
  g.beginPath(); g.moveTo(-0.5, 0); g.quadraticCurveTo(-0.45, -0.42, 0, -0.42); g.quadraticCurveTo(0.45, -0.42, 0.5, 0); g.closePath(); g.fill();
  g.fillStyle = '#E6DCC4'; g.beginPath(); g.arc(0, -0.2, 0.17, 0, 7); g.fill();
  g.fillStyle = '#16130F'; for (let k = 0; k < 10; k++) { const a = -2.2 + k * 0.48; g.beginPath(); g.arc(Math.cos(a) * 0.115, -0.2 + Math.sin(a) * 0.115, 0.024, 0, 7); g.fill(); }
  const j = ring > 0 ? Math.sin(t * 60) * 0.03 * ring : 0;
  g.save(); g.translate(0, -0.5 + Math.abs(j)); g.rotate(j);
  g.fillStyle = '#16130F'; rrect(g, -0.52, -0.06, 1.04, 0.12, 0.06); g.fill();
  g.beginPath(); g.ellipse(-0.5, 0.0, 0.13, 0.1, 0, 0, 7); g.fill(); g.beginPath(); g.ellipse(0.5, 0.0, 0.13, 0.1, 0, 0, 7); g.fill();
  g.restore();
  if (ring > 0) { g.strokeStyle = `rgba(200,50,30,${0.8 * ring})`; g.lineWidth = 0.025; g.lineCap = 'round';
    for (const sd of [-1, 1]) for (let k = 0; k < 3; k++) { const r = 0.7 + k * 0.14 + ((t * 2) % 0.14); g.beginPath(); g.arc(0, -0.4, r, sd > 0 ? -0.7 : Math.PI - 0.1, sd > 0 ? 0.1 : Math.PI + 0.7); g.stroke(); } }
  g.restore();
}
// printing press: rotating cylinders with a paper web; sheets fly off the top
function presses(t, y0) {
  g.save();
  const rows = [[260, y0, 120], [560, y0 - 40, 150], [860, y0, 120], [400, y0 + 260, 110], [720, y0 + 250, 130]];
  g.strokeStyle = '#D9CFB8'; g.lineWidth = 26 * u; g.beginPath(); g.moveTo(-20 * u, y0 + 120 * u);
  rows.slice(0, 3).forEach(([x, y, r]) => g.lineTo(x * u, (y - r * 0.2) * u)); g.lineTo(W + 20 * u, y0 + 120 * u); g.stroke();
  rows.forEach(([x, y, r], i) => {
    const cx = x * u, cy = y * u, R = r * u, a = t * (i % 2 ? -4 : 4);
    g.fillStyle = '#1E1A22'; g.beginPath(); g.arc(cx, cy, R, 0, 7); g.fill();
    g.strokeStyle = '#3A3442'; g.lineWidth = 8 * u; g.stroke();
    g.strokeStyle = '#4A4452'; g.lineWidth = 10 * u;
    for (let k = 0; k < 6; k++) { const b = a + k * Math.PI / 3; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(b) * R * 0.85, cy + Math.sin(b) * R * 0.85); g.stroke(); }
    g.fillStyle = '#6A6272'; g.beginPath(); g.arc(cx, cy, R * 0.16, 0, 7); g.fill();
  });
  g.restore();
}
// newspaper letters cut out and pasted: each glyph on its own scrap
function cutout(str, x, y, size, t, o = {}) {
  const { at = 0, rate = 0.06 } = o, gl = [...str];
  let wsum = 0; const ws = gl.map((c) => (c === ' ' ? size * 0.4 : size * 0.78)); wsum = ws.reduce((a, b) => a + b, 0);
  let cx = x - wsum / 2;
  gl.forEach((c, i) => {
    const w = ws[i]; const p = clamp(spring(t - at - i * rate, 'snappy'));
    if (c !== ' ' && p > 0) {
      g.save(); g.translate(cx + w / 2, y + (1 - p) * -60 * u); g.rotate((hash(i, 31) - 0.5) * 0.3); g.scale(p, p);
      const bg = ['#EFE6D2', '#F7F1E3', '#16130F', '#C8321E', '#E2D5B8'][Math.floor(hash(i, 32) * 5)];
      g.fillStyle = bg; g.fillRect(-w * 0.5, -size * 0.6, w * 0.96, size * 1.1);
      const fam = hash(i, 33) > 0.5 ? SERIF : SANS;
      text(g, c, 0, size * 0.28, { size: size * (0.75 + hash(i, 34) * 0.25), weight: fam === SANS ? 700 : 400, family: fam, color: bg === '#16130F' || bg === '#C8321E' ? '#F7F1E3' : C.ink });
      g.restore();
    }
    cx += w;
  });
}
// officer silhouette with peaked cap
function officer(x, y, s, color) {
  person(x, y, s, color);
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color;
  g.beginPath(); g.ellipse(0, -1.5, 0.5, 0.16, 0, 0, 7); g.fill(); g.fillRect(-0.4, -1.72, 0.8, 0.22); g.fillRect(-0.5, -1.46, 0.6, 0.06);
  g.restore();
}
// a typed confession sheet (illegible typed lines only)
function sheet(x, y, w, rot, seed) {
  const h = w * 1.3;
  g.save(); g.translate(x, y); g.rotate(rot);
  g.fillStyle = 'rgba(0,0,0,0.4)'; g.fillRect(-w / 2 + 8 * u, -h / 2 + 10 * u, w, h);
  g.fillStyle = '#ECE3CC'; g.fillRect(-w / 2, -h / 2, w, h);
  g.fillStyle = 'rgba(22,19,15,0.5)';
  for (let r = 0; r < 11; r++) g.fillRect(-w * 0.4, -h * 0.38 + r * h * 0.07, w * 0.8 * (r === 10 ? 0.4 : 0.75 + 0.25 * hash(r, seed)), h * 0.018);
  g.fillStyle = '#7A6A50'; g.beginPath(); g.arc(0, -h / 2 + 10 * u, 8 * u, 0, 7); g.fill();
  g.restore();
}
// suspect card: silhouette in a fedora (never a likeness), name, lines of text
function suspectCard(x, y, w, h, t, name, lines, o = {}) {
  const { at = 0, tone = C.ink } = o, p = clamp(spring(t - at, 'default'));
  if (p <= 0) return;
  g.save(); g.globalAlpha = p; g.translate(0, (1 - p) * 60 * u);
  g.fillStyle = 'rgba(0,0,0,0.18)'; g.fillRect(x + 10 * u, y + 12 * u, w, h);
  g.fillStyle = '#F7F1E3'; g.fillRect(x, y, w, h);
  g.fillStyle = C.paper2; g.fillRect(x + 24 * u, y + 24 * u, 220 * u, 260 * u);
  person(x + 134 * u, y + 270 * u, 105 * u, tone);
  g.fillStyle = tone; g.save(); g.translate(x + 134 * u, y + 270 * u); g.scale(105 * u, 105 * u);
  g.beginPath(); g.ellipse(0, -1.45, 0.62, 0.09, 0, 0, 7); g.fill(); g.beginPath(); g.moveTo(-0.38, -1.45); g.quadraticCurveTo(-0.36, -1.95, 0, -1.92); g.quadraticCurveTo(0.36, -1.95, 0.38, -1.45); g.fill();
  g.restore();
  text(g, '?', x + 134 * u, y + 200 * u, { size: 80 * u, weight: 400, family: SERIF, color: '#F7F1E3', alpha: 0.7 });
  text(g, name, x + 280 * u, y + 90 * u, { size: 56 * u, weight: 400, family: SERIF, color: C.ink, align: 'left' });
  lines.forEach((ln, k) => text(g, ln, x + 282 * u, y + 160 * u + k * 50 * u, { size: 31 * u, weight: 700, family: THAI, color: C.inkSoft, align: 'left' }));
  g.restore();
}
// case folder
function folder(x, y, w, t) {
  const h = w * 0.72;
  g.save(); g.translate(x, y);
  g.fillStyle = 'rgba(0,0,0,0.2)'; g.fillRect(-w / 2 + 12 * u, -h / 2 + 14 * u, w, h);
  g.fillStyle = '#C9A76A'; rrect(g, -w / 2, -h / 2 - 40 * u, w * 0.36, 60 * u, 10 * u); g.fill();
  g.fillRect(-w / 2, -h / 2, w, h);
  g.fillStyle = '#ECE3CC'; g.fillRect(-w * 0.3, -h * 0.34, w * 0.6, 80 * u);
  text(g, 'CASE FILE · 1947', 0, -h * 0.34 + 52 * u, { size: 32 * u, weight: 700, family: SANS, color: C.ink, tracking: 3 * u });
  g.restore();
}
// generic hardback book with a dahlia on the cover
function book(x, y, w, t, title, sub) {
  const h = w * 1.45;
  g.save(); g.translate(x, y); g.rotate(-0.06);
  g.fillStyle = 'rgba(0,0,0,0.5)'; g.fillRect(-w / 2 + 16 * u, -h / 2 + 18 * u, w, h);
  g.fillStyle = '#120A0E'; g.fillRect(-w / 2, -h / 2, w, h);
  g.fillStyle = '#2A1218'; g.fillRect(-w / 2, -h / 2, w * 0.06, h);
  g.restore();
  g.save(); g.translate(x, y); g.rotate(-0.06);
  dahlia(0, h * 0.08, w * 0.3, t, { glow: 0.2 });
  text(g, title, 0, -h * 0.32, { size: w * 0.11, weight: 400, family: SERIF, color: '#F2E4D0' });
  text(g, sub, 0, h * 0.42, { size: w * 0.06, weight: 700, family: SANS, color: D.gold, tracking: 3 * u });
  g.restore();
}
// cinema marquee with chasing bulbs
function marquee(x, y, w, t, line1, line2) {
  const h = w * 0.42;
  g.save(); g.translate(x, y);
  const gr = g.createRadialGradient(0, 0, 0, 0, 0, w * 0.8); gr.addColorStop(0, `rgba(${D.warm},0.18)`); gr.addColorStop(1, `rgba(${D.warm},0)`);
  g.fillStyle = gr; g.fillRect(-w, -w * 0.8, w * 2, w * 1.6);
  g.fillStyle = '#1A1220'; rrect(g, -w / 2, -h / 2, w, h, 14 * u); g.fill();
  g.fillStyle = '#F2E8D2'; g.fillRect(-w * 0.42, -h * 0.32, w * 0.84, h * 0.64);
  const n = 22;
  for (let k = 0; k < n * 2; k++) { const top = k < n, kk = k % n, bx = -w / 2 + 20 * u + kk * (w - 40 * u) / (n - 1), by = top ? -h / 2 + 14 * u : h / 2 - 14 * u;
    const on = ((Math.floor(t / BEAT * 2) + k) % 3) !== 0; g.fillStyle = on ? '#FFE3A8' : '#4A3A2A'; g.beginPath(); g.arc(bx, by, 6 * u, 0, 7); g.fill(); }
  text(g, line1, 0, -h * 0.04, { size: h * 0.15, weight: 700, family: SANS, color: C.ink, tracking: 3 * u });
  text(g, line2, 0, h * 0.2, { size: h * 0.12, weight: 700, family: SANS, color: C.red, tracking: 3 * u });
  g.restore();
}
// memorial candle
function candle(x, y, s, t, seed = 1, lit = 1) {
  g.save();
  if (lit > 0) {
    const fl = 0.85 + 0.15 * noise(t * 7, seed), fy = y - s * 1.12;
    const gr = g.createRadialGradient(x, fy, 0, x, fy, s * 1.6 * fl); gr.addColorStop(0, `rgba(${D.warm},${0.45 * lit})`); gr.addColorStop(1, `rgba(${D.warm},0)`);
    g.fillStyle = gr; g.fillRect(x - s * 2, fy - s * 2, s * 4, s * 4);
    g.fillStyle = `rgba(255,214,140,${lit})`; g.beginPath();
    g.moveTo(x, fy - s * 0.32 * fl); g.quadraticCurveTo(x + s * 0.11, fy, x, fy + s * 0.1); g.quadraticCurveTo(x - s * 0.11, fy, x, fy - s * 0.32 * fl); g.fill();
  }
  g.fillStyle = '#E8DFCB'; g.fillRect(x - s * 0.13, y - s, s * 0.26, s);
  g.fillStyle = '#2A2420'; g.fillRect(x - s * 0.01, y - s * 1.08, s * 0.02, s * 0.08);
  g.restore();
}

export default () => [
  // ---------------- lobby phone
  { from: bar(18), to: bar(20), cues: [[0.1, 'thump', 0.5], [0.4, 'tick', 0.3], [2.6, 'impact', 0.7]],
    draw(t) {
      night('#100B10');
      // lobby: wainscot, floor tiles
      g.fillStyle = '#1C1418'; g.fillRect(0, 0, W, 1450 * u);
      for (let k = 0; k < 7; k++) { g.fillStyle = '#231A1F'; g.fillRect(k * 170 * u, 620 * u, 120 * u, 760 * u); }
      g.fillStyle = '#0C0809'; g.fillRect(0, 1450 * u, W, H);
      for (let r = 0; r < 6; r++) for (let c = 0; c < 12; c++) if ((r + c) % 2) { g.fillStyle = '#17110F'; g.fillRect(c * 100 * u, 1450 * u + r * 60 * u, 100 * u, 60 * u); }
      phoneBooth(TX + 20 * u, 1460 * u, 760 * u, t, { light: 0.8 + 0.2 * noise(t * 3, 2) });
      band(210 * u, 330 * u, 0.8);
      kicker('ล็อบบี้โรงแรม', TX, 280 * u, t, { color: D.neon });
      say('ตามคำบอกเล่า มีคนเห็นเธอ\nใช้โทรศัพท์ในล็อบบี้', TX, 390 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      band(1470 * u, 130 * u, 0.85);
      say('จากนั้น… เธอก็หายไป', TX, 1550 * u, t - 2.6, { size: 48 * u, weight: 800, color: D.neon });
      finish(0.9);
    } },
  // ---------------- six unknown days
  { from: bar(20), to: bar(22), cues: Array.from({ length: 7 }, (_, i) => [0.3 + i * 0.25, 'tick', 0.5]).concat([[2.6, 'thump', 0.6]]),
    draw(t) {
      night(D.sky);
      big('6 วัน', TX, 500 * u, t - 0.1, { size: 170 * u, color: C.cream });
      const days = ['9', '10', '11', '12', '13', '14', '15'];
      days.forEach((d, i) => { const p = clamp(spring(t - 0.3 - i * 0.25, 'snappy')); if (p <= 0) return;
        const x = TX + (i - 3) * 124 * u, y = 820 * u, mid = i > 0 && i < 6;
        g.save(); g.translate(x, y); g.scale(p, p);
        g.fillStyle = mid ? '#1B1A2C' : C.cream; rrect(g, -54 * u, -70 * u, 108 * u, 140 * u, 10 * u); g.fill();
        g.fillStyle = mid ? '#2A2840' : C.red; g.fillRect(-54 * u, -70 * u, 108 * u, 26 * u);
        text(g, mid ? '?' : d, 0, 40 * u, { size: 60 * u, weight: 400, family: SERIF, color: mid ? D.neon : C.ink });
        g.restore();
        text(g, d, x, y + 110 * u, { size: 26 * u, weight: 700, family: SANS, color: C.fog, alpha: p }); });
      say('ไม่มีใครรู้แน่ชัด\nว่าเธออยู่ที่ไหนในช่วงนั้น', TX, 1100 * u, t - 2.6, { size: 48 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- 15 January: the one line about the discovery (no detail)
  { from: bar(22), to: bar(25), cues: [[0.2, 'whoosh', 0.5], [0.8, 'pop', 0.6], [2.4, 'pop', 0.6], [4.5, 'chime', 0.5]],
    draw(t) {
      const P = laMap(t, { reveal: clamp(t / 1.2), cy: 1080 * u });
      const [bx, by] = P(LAP.biltmore), [lx, ly] = P(LAP.leimert);
      pin(bx, by, t - 0.8, { label: 'Biltmore', side: -1, color: D.gold });
      if (t > 1.4) path([[bx, by], [lx, ly]], clamp((t - 1.4) / 1.0), { color: 'rgba(239,230,210,0.5)', width: 4 * u, dash: [12 * u, 12 * u] });
      g.save(); g.globalAlpha = clamp((t - 2.2) / 0.4); candle(lx, ly - 6 * u, 46 * u, t, 3); g.restore();
      pin(lx, ly, t - 2.4, { label: 'Leimert Park', side: 1, color: D.neon });
      topScrim(640, '10,11,20');
      kicker('15 มกราคม 1947', TX, 260 * u, t, { color: D.neon });
      say('ร่างของเธอถูกพบในที่ดินว่างเปล่า\nย่าน Leimert Park', TX, 370 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      band(1380 * u, 120 * u, 0.7);
      say('ห่างจากโรงแรมราว 8 กม. (ระยะเส้นตรง)', TX, 1450 * u, t - 4.5, { size: 38 * u, weight: 800, color: C.cream });
      approxNote(t - 2.0, 1550 * u);
      finish(0.8);
    } },
  // ---------------- respect
  { from: bar(25), to: bar(27), cues: [[0.2, 'chime', 0.4], [2.6, 'thump', 0.5]],
    draw(t) {
      night('#07070C');
      dahlia(TX, 1000 * u, 200 * u, t, { bloom: 1, glow: 0.3, alpha: 0.9 });
      candle(TX - 300 * u, 1280 * u, 90 * u, t, 1); candle(TX + 300 * u, 1280 * u, 90 * u, t, 2);
      say('เราจะไม่เล่ารายละเอียดของเหตุการณ์\nเพื่อให้เกียรติแก่เธอ', TX, 360 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      say('ตำรวจระบุตัวตนเธอได้จากลายนิ้วมือ\nด้วยความช่วยเหลือของ FBI', TX, 1420 * u, t - 2.6, { size: 42 * u, weight: 800, color: D.gold });
      finish(0.9);
    } },
  // ---------------- the presses roll
  { from: bar(27), to: bar(30), cues: Array.from({ length: 12 }, (_, i) => [i * 0.625, i % 2 ? 'tick' : 'thump', 0.35]).concat([[5.0, 'swish', 0.6]]),
    draw(t) {
      night('#0C0B10');
      presses(t, 1250 * u);
      for (let i = 0; i < 5; i++) { const s = spring(t - 0.4 - i * 0.45, 'snappy'); if (s <= 0) continue;
        newspaper(170 * u + i * 190 * u, 860 * u + (i % 2) * 60 * u - (1 - s) * -500 * u, 300 * u, (hash(i, 5) - 0.5) * 0.4, ['MYSTERY\nGIRL', 'NEW\nCLUE?', 'CITY\nSHOCKED', 'POLICE\nHUNT', 'EXTRA!'][i],
          { seed: i + 3, masthead: ['THE EVENING CLARION', 'CITY EXTRA', 'THE COAST GAZETTE'][i % 3] }); }
      band(210 * u, 330 * u, 0.85);
      kicker('สงครามหนังสือพิมพ์', TX, 280 * u, t, { color: D.neon });
      say('หนังสือพิมพ์ใน LA แข่งกันขายข่าวนี้\nทุกวัน นานหลายสัปดาห์', TX, 390 * u, t - 0.2, { size: 44 * u, weight: 800, color: C.cream });
      band(1400 * u, 200 * u, 0.85);
      say('บางฉบับเติมแต่งรายละเอียด\nที่ไม่มีหลักฐานรองรับ', TX, 1470 * u, t - 5.0, { size: 44 * u, weight: 800, color: D.neon });
      finish(0.8);
    } },
  // ---------------- the nickname
  { from: bar(30), to: bar(33), cues: [[0.2, 'whoosh', 0.5], [2.5, 'riser', 0.4], [4.4, 'impact', 0.8]],
    draw(t) {
      night(D.sky);
      const m = clamp((t - 2.5) / 1.8);
      const pal = D.blue.map((b, i) => mix(b, D.petals[i], m));
      dahlia(TX, 900 * u, 220 * u, t, { pal, glow: 0.25 + 0.15 * m });
      // ticket stub for the 1946 film
      const p = clamp(spring(t - 0.4, 'default'));
      g.save(); g.globalAlpha = p; g.translate(TX, 1250 * u);
      g.fillStyle = '#E6DCC4'; rrect(g, -300 * u, -60 * u, 600 * u, 120 * u, 12 * u); g.fill();
      g.fillStyle = '#2C4884'; g.fillRect(-300 * u, -60 * u, 18 * u, 120 * u); g.fillRect(282 * u, -60 * u, 18 * u, 120 * u);
      text(g, 'THE BLUE DAHLIA · 1946', 0, 11 * u, { size: 30 * u, weight: 700, family: SANS, color: '#1F3466', tracking: 3 * u });
      g.restore();
      kicker('ที่มาของฉายา', TX, 290 * u, t, { color: D.neon });
      say('ว่ากันว่าล้อมาจากภาพยนตร์\nThe Blue Dahlia (1946)', TX, 400 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      say('ตามคำบอกเล่า เพราะเธอมีผมสีดำ\nและมักแต่งชุดสีเข้ม', TX, 1420 * u, t - 4.6, { size: 40 * u, weight: 800, color: D.neon });
      finish(0.8);
    } },
  // ---------------- the press at its worst
  { from: bar(33), to: bar(36), cues: [[0.2, 'tick', 0.5], [0.5, 'tick', 0.5], [0.8, 'tick', 0.5], [3.0, 'thump', 0.6], [5.6, 'impact', 0.7]],
    draw(t) {
      paper();
      deskPhone(TX, 1000 * u, 300 * u, t, t < 2.8 ? 1 : 0);
      kicker('ด้านมืดของสื่อ', TX, 290 * u, t);
      say('ตามบันทึกหลายแหล่ง นักข่าวโทรหาแม่ของเธอ\nบอกว่าลูกสาวชนะการประกวดความงาม', TX, 400 * u, t - 0.2, { size: 40 * u, weight: 800 });
      say('ก่อนจะบอกความจริง\nเพื่อเค้นข้อมูลไปเขียนข่าว', TX, 1120 * u, t - 3.0, { size: 46 * u, weight: 800, color: C.red });
      say('ข่าวลือมากมายเรื่องชีวิตส่วนตัวของเธอ\nถูกตีพิมพ์โดยไม่มีหลักฐาน', TX, 1380 * u, t - 5.6, { size: 40 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------- 24 January
  { from: bar(36), to: bar(37), cues: Array.from({ length: 5 }, (_, i) => [i * 0.15, 'tick', 0.6]).concat([[1.0, 'thump', 0.6]]),
    draw(t) {
      night(D.sky);
      kicker('มกราคม 1947', TX, 420 * u, t, { color: D.neon });
      const d = ['20', '21', '22', '23', '24'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.15), t, { size: 360 * u, bg: C.cream, fg: C.ink, r: 18 * u });
      say('ซองปริศนา', TX, 1240 * u, t - 1.0, { size: 60 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- the envelope
  { from: bar(37), to: bar(40), cues: [[0.1, 'whoosh', 0.5], [1.4, 'swish', 0.5], [2.0, 'pop', 0.4], [2.4, 'pop', 0.4], [2.8, 'pop', 0.4], [3.2, 'pop', 0.4], [5.5, 'thump', 0.5]],
    draw(t) {
      paper();
      const s = clamp(spring(t, 'default'));
      const items = [['BIRTH CERTIFICATE', -250, 0.06], ['PHOTOS', 250, -0.08], ['ADDRESS BOOK', -230, -0.05], ['BUSINESS CARDS', 240, 0.07]];
      items.forEach(([lab, dx, r], i) => { const p = clamp(spring(t - 2.0 - i * 0.4, 'snappy')); if (p <= 0) return;
        const x = TX + (dx > 0 ? 200 : -200) * u, y = (i < 2 ? 1010 : 1185) * u + (1 - p) * -200 * u;
        g.save(); g.translate(x, y); g.rotate(r * p * 0.5); g.scale(0.9 + 0.1 * p, 0.82 * (0.9 + 0.1 * p)); g.globalAlpha = p;
        g.fillStyle = 'rgba(0,0,0,0.2)'; g.fillRect(-180 * u + 8 * u, -95 * u + 10 * u, 360 * u, 190 * u);
        g.fillStyle = i === 1 ? '#2A2622' : '#F7F1E3'; g.fillRect(-180 * u, -95 * u, 360 * u, 190 * u);
        if (i === 1) { g.fillStyle = '#5A544C'; g.fillRect(-160 * u, -75 * u, 320 * u, 120 * u); }
        else { g.fillStyle = 'rgba(22,19,15,0.35)'; for (let k = 0; k < 4; k++) g.fillRect(-150 * u, -60 * u + k * 26 * u, 300 * u * (0.6 + 0.4 * hash(k, i)), 8 * u); }
        text(g, lab, 0, 78 * u, { size: 26 * u, weight: 700, family: SANS, color: i === 1 ? '#F7F1E3' : C.red, tracking: 2 * u });
        g.restore(); });
      envelope(TX, 760 * u + (1 - s) * 700 * u, 420 * u, -0.04, { flap: clamp((t - 1.2) / 0.6), label: 'PHOTOS · ADDRESS BOOK · PAPERS' });
      kicker('24 มกราคม 1947', TX, 290 * u, t);
      say('มีคนส่งซองถึงหนังสือพิมพ์\nLos Angeles Examiner', TX, 400 * u, t - 0.2, { size: 46 * u, weight: 800 });
      say('ข้างในคือของส่วนตัวของเธอ\nเช่น สูติบัตร รูปถ่าย สมุดที่อยู่', TX, 1350 * u, t - 3.6, { size: 44 * u, weight: 800, color: C.red });
      say('รายงานระบุว่าของถูกเช็ดด้วยน้ำมัน เพื่อลบลายนิ้วมือ', TX, 1545 * u, t - 5.5, { size: 34 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------- cut-out note
  { from: bar(40), to: bar(42), cues: Array.from({ length: 8 }, (_, i) => [0.2 + i * 0.18, 'pop', 0.25]).concat([[3.0, 'thump', 0.6]]),
    draw(t) {
      night('#0E0C12');
      g.fillStyle = '#E6DCC4'; g.save(); g.translate(TX, 900 * u); g.rotate(-0.03); g.fillRect(-420 * u, -260 * u, 840 * u, 520 * u); g.restore();
      cutout('HERE IS', TX, 760 * u, 84 * u, t, { at: 0.2, rate: 0.07 });
      cutout("DAHLIA'S", TX, 900 * u, 84 * u, t, { at: 0.8, rate: 0.07 });
      cutout('BELONGINGS', TX, 1040 * u, 72 * u, t, { at: 1.4, rate: 0.06 });
      band(210 * u, 330 * u, 0.85);
      kicker('ข้อความที่แนบมา', TX, 280 * u, t, { color: D.neon });
      say('ประกอบจากตัวอักษร\nที่ตัดจากหนังสือพิมพ์', TX, 390 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      band(1260 * u, 200 * u, 0.85);
      say('แต่ไม่เคยนำไปสู่ตัวผู้ส่ง', TX, 1370 * u, t - 3.0, { size: 50 * u, weight: 800, color: D.neon });
      finish(0.8);
    } },
  // ---------------- the investigation
  { from: bar(42), to: bar(45), cues: [[0.2, 'riser', 0.4], [3.0, 'thump', 0.6], [5.0, 'pop', 0.5]],
    draw(t) {
      night('#0B0F18');
      const n = Math.round(150 * clamp(remap(t, 0.3, 3.0)));
      for (let i = 0; i < n; i++) { const c = i % 15, r = Math.floor(i / 15);
        officer(105 * u + c * 59 * u + (r % 2) * 28 * u, 760 * u + r * 66 * u, 22 * u, r % 3 ? '#1E2B44' : '#2A3A58'); }
      kicker('การสืบสวน', TX, 290 * u, t, { color: D.neon });
      say('หนึ่งในการสืบสวนครั้งใหญ่ที่สุด\nในประวัติศาสตร์ LAPD', TX, 400 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      band(1430 * u, 170 * u, 0.85);
      say('บางแหล่งระบุว่ามีเจ้าหน้าที่ร่วมราว 750 นาย\nจากหลายหน่วยงาน', TX, 1480 * u, t - 3.0, { size: 38 * u, weight: 800, color: D.gold });
      finish(0.8);
    } },
  // ---------------- false confessions
  { from: bar(45), to: bar(48), cues: Array.from({ length: 9 }, (_, i) => [0.3 + i * 0.32, 'thump', 0.35]).concat([[5.2, 'impact', 0.8]]),
    draw(t) {
      night('#14100E');
      g.fillStyle = '#5A4632'; g.fillRect(60 * u, 600 * u, W - 120 * u, 800 * u);
      g.fillStyle = '#4C3B2A'; for (let k = 0; k < 40; k++) { g.beginPath(); g.arc(80 * u + hash(k, 3) * (W - 160 * u), 620 * u + hash(k, 4) * 760 * u, 3 * u, 0, 7); g.fill(); }
      for (let i = 0; i < 9; i++) { const c = i % 3, r = Math.floor(i / 3), at = 0.3 + i * 0.32;
        const p = clamp(spring(t - at, 'snappy')); if (p <= 0) continue;
        const x = 250 * u + c * 290 * u, y = 760 * u + r * 245 * u;
        g.save(); g.globalAlpha = p; sheet(x, y, 170 * u, (hash(i, 8) - 0.5) * 0.2, i); g.restore();
        stamp('FALSE', x, y + 10 * u, t - at - 0.25, { size: 42 * u, rot: -0.2 + hash(i, 9) * 0.1, seed: i + 3 }); }
      kicker('คำสารภาพ', TX, 290 * u, t, { color: D.neon });
      say('คนหลายสิบคนเดินเข้ามา\nอ้างว่าตัวเองเป็นคนร้าย', TX, 400 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      band(1420 * u, 180 * u, 0.85);
      say('ทุกคำสารภาพถูกพิสูจน์ว่าเป็นเท็จ', TX, 1490 * u, t - 3.4, { size: 44 * u, weight: 800, color: D.neon });
      say('รายงานหลายแหล่งระบุว่า ตลอดหลายสิบปีมีผู้อ้างตัวนับร้อยคน', TX, 1565 * u, t - 5.2, { size: 30 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- suspects over the decades
  { from: bar(48), to: bar(50), cues: Array.from({ length: 6 }, (_, i) => [0.2 + i * 0.2, 'pop', 0.35]).concat([[3.0, 'thump', 0.6]]),
    draw(t) {
      night(D.sky);
      for (let i = 0; i < 6; i++) { const p = clamp(spring(t - 0.2 - i * 0.2, 'default')); if (p <= 0) continue;
        const x = 150 * u + i * 150 * u;
        g.save(); g.globalAlpha = p; person(x, 1150 * u + (1 - p) * 60 * u, 95 * u, i % 2 ? '#1B1A2C' : '#262438');
        g.fillStyle = i % 2 ? '#1B1A2C' : '#262438'; g.beginPath(); g.ellipse(x, 1150 * u - 1.45 * 95 * u + (1 - p) * 60 * u, 58 * u, 9 * u, 0, 0, 7); g.fill();
        text(g, '?', x, 1050 * u, { size: 60 * u, weight: 400, family: SERIF, color: D.neon }); g.restore(); }
      kicker('ผู้ต้องสงสัย', TX, 290 * u, t, { color: D.neon });
      say('ตลอดเกือบ 80 ปี\nมีผู้ถูกเสนอชื่อหลายสิบคน', TX, 400 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      say('แต่ไม่มีใครถูกพิสูจน์ได้', TX, 1380 * u, t - 3.0, { size: 52 * u, weight: 800, color: D.neon });
      finish(0.8);
    } },
  // ---------------- George Hodel
  { from: bar(50), to: bar(54), cues: [[0.2, 'whoosh', 0.5], [2.6, 'type', 0.5], [5.2, 'type', 0.5], [7.6, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 7.6, 16); g.translate(sx, sy);
      paper();
      suspectCard(90 * u, 560 * u, 820 * u, 330 * u, t, 'George Hodel', ['แพทย์ในลอสแอนเจลิส', 'เสียชีวิตปี 1999'], { at: 0.2 });
      kicker('ผู้ต้องสงสัยที่ถูกพูดถึงมากที่สุด', TX, 300 * u, t);
      say('ปี 1950 สำนักงานอัยการแอบติดเครื่องดักฟัง\nในบ้านของเขานานหลายสัปดาห์', TX, 1000 * u, t - 2.6, { size: 38 * u, weight: 800 });
      say('ปี 2003 ลูกชาย Steve Hodel อดีตนักสืบ LAPD\nเขียนหนังสือกล่าวหาว่าพ่อคือคนร้าย', TX, 1180 * u, t - 5.2, { size: 38 * u, weight: 800, color: C.red });
      stamp('UNPROVEN', TX, 1420 * u, t - 7.6, { size: 90 * u, rot: -0.08 });
      finish(0.6);
    } },
  // ---------------- Walter Bayley and others
  { from: bar(54), to: bar(57), cues: [[0.2, 'whoosh', 0.5], [2.8, 'whoosh', 0.5], [5.4, 'impact', 0.9]],
    draw(t) {
      const [sx, sy] = shake(t, 5.4, 14); g.translate(sx, sy);
      paper();
      suspectCard(90 * u, 470 * u, 820 * u, 330 * u, t, 'Walter Bayley', ['ศัลยแพทย์ เคยมีบ้านใกล้จุดนั้น', 'นักข่าวเสนอชื่อหลายสิบปีต่อมา', 'เสียชีวิตตั้งแต่ปี 1948'], { at: 0.2, tone: '#2A2622' });
      suspectCard(90 * u, 900 * u, 820 * u, 330 * u, t, 'และอีกหลายชื่อ', ['นักเขียนและนักสืบสมัครเล่น', 'เสนอทฤษฎีใหม่แทบทุกทศวรรษ'], { at: 2.8, tone: '#4A4236' });
      kicker('ทฤษฎีอื่น ๆ', TX, 300 * u, t);
      stamp('UNPROVEN', TX, 1400 * u, t - 5.4, { size: 90 * u, rot: -0.08, seed: 11 });
      finish(0.6);
    } },
  // ---------------- officially unsolved
  { from: bar(57), to: bar(59), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 18); g.translate(sx, sy);
      paper();
      folder(TX, 950 * u, 640 * u, t);
      stamp('UNSOLVED', TX, 1010 * u, t - 2.5, { size: 110 * u, rot: -0.12, seed: 5 });
      say('ทุกทฤษฎียังไม่มีหลักฐาน\nมากพอจะพิสูจน์ได้', TX, 330 * u, t - 0.1, { size: 54 * u, weight: 800 });
      say('อย่างเป็นทางการ\nคดีนี้ยังไม่คลี่คลาย', TX, 1380 * u, t - 3.0, { size: 50 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- Hollywood
  { from: bar(59), to: bar(62), cues: [[0.2, 'whoosh', 0.5], [1.2, 'pop', 0.6], [2.8, 'chime', 0.5], [5.6, 'thump', 0.5]],
    draw(t) {
      night('#0D0A12');
      searchlights(t, 1500 * u, 0.6, [150, 930]);
      const pb = clamp(spring(t - 1.0, 'default')), pm = clamp(spring(t - 2.6, 'default'));
      g.save(); g.globalAlpha = pb; book(280 * u, 920 * u + (1 - pb) * 200 * u, 350 * u, t, 'The Black Dahlia', 'NOVEL · 1987'); g.restore();
      g.save(); g.globalAlpha = pm; marquee(700 * u, 1080 * u + (1 - pm) * 200 * u, 440 * u, t, 'THE BLACK DAHLIA', 'FILM · 2006'); g.restore();
      kicker('จากคดีจริง สู่ตำนานฮอลลีวูด', TX, 290 * u, t, { color: D.neon });
      say('นิยายของ James Ellroy (1987)\nและภาพยนตร์ปี 2006', TX, 400 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      band(1380 * u, 200 * u, 0.85);
      say('แต่ “ตำนาน” มักกลบตัวตนจริง\nของผู้หญิงคนหนึ่ง', TX, 1450 * u, t - 5.6, { size: 44 * u, weight: 800, color: D.neon });
      finish(0.8);
    } },
  // ---------------- remember her
  { from: bar(62), to: bar(64), cues: [[0.2, 'chime', 0.5], [2.6, 'chime', 0.4]],
    draw(t) {
      night('#08070C');
      candle(TX, 1300 * u, 120 * u, t, 4);
      dahlia(TX, 1000 * u, 150 * u, t, { glow: 0.25 });
      big('Elizabeth Short', TX, 420 * u, t - 0.1, { size: 104 * u, color: C.cream });
      text(g, '1924 – 1947', TX, 510 * u, { size: 40 * u, weight: 700, family: SANS, color: C.fog, tracking: 4 * u, alpha: clamp((t - 0.6) / 0.4) });
      say('เธอไม่ใช่ตำนาน', TX, 640 * u, t - 1.2, { size: 52 * u, weight: 800, color: C.cream });
      say('เธอคือหญิงสาววัย 22 ปี\nที่มีครอบครัวและมีความฝัน', TX, 1420 * u, t - 2.6, { size: 44 * u, weight: 800, color: D.gold });
      finish(0.9);
    } },
  // ---------------- closing title card
  { from: bar(64), to: bar(68), cues: [[0, 'thump', 0.9], [5.0, 'swish', 0.4]],
    draw(t) {
      night('#06060B');
      dahlia(TX, 1350 * u, 190 * u, t, { bloom: clamp(spring(t - 1.5, 'heavy')), glow: 0.35 });
      big('1947', TX, 760 * u, t, { size: 300 * u, color: C.cream });
      const p = spring(t - 0.7, 'default');
      g.fillStyle = D.neon; g.fillRect(TX - 330 * u * p, 840 * u, 660 * u * p, 10 * u);
      say('Black Dahlia', TX, 980 * u, t - 1.0, { size: 84 * u, weight: 400, family: SERIF, color: D.neon });
      say('คดีที่ยังรอคำตอบ', TX, 1100 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.cream });
      finish();
    } },
  // ---------------- question
  { from: bar(68), to: bar(72), cues: Array.from({ length: 8 }, (_, i) => [i * 0.625, 'thump', 0.3]).concat([[5.0, 'chime', 0.8]]),
    draw(t) {
      skyline(t, { base: 1320 * u, beams: 0.7 });
      dahlia(TX, 980 * u, 150 * u, t, { glow: 0.35, alpha: 0.9 });
      band(200 * u, 330 * u, 0.8);
      say('คุณคิดว่าคดีนี้\nจะมีวันคลี่คลายไหม?', TX, 300 * u, t - 0.3, { size: 48 * u, weight: 800, color: C.cream });
      say('คอมเมนต์บอกได้เลย', TX, 460 * u, t - 2.5, { size: 46 * u, weight: 800, color: D.neon });
      finish(0.8);
    } },
];

// colour mix for hex strings
function mix(a, b, k) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16)), pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * k)).join(',')})`;
}
