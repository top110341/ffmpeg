// Victor Lustig — Act 2: 1:20–3:00 (bars 32–72).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, banknote } from './kit.js';
import { eiffel, gent, envelope, newspaper, fedora, alcatraz, GOLD, NAVY, WINE, LATIN } from './a1.js';

// ---------------------------------------------------------------- local props
// Little steam train, nose to the right.
function train(x, y, s, ang = 0, color = C.ink) {
  g.save(); g.translate(x, y); g.rotate(ang); g.scale(s, s); g.fillStyle = color;
  g.fillRect(-0.3, -0.32, 0.55, 0.24); g.fillRect(-0.3, -0.5, 0.2, 0.2); g.fillRect(0.12, -0.46, 0.07, 0.16);
  g.fillRect(-1.0, -0.36, 0.62, 0.28); g.fillRect(-1.7, -0.36, 0.62, 0.28);
  for (const wx of [-1.55, -1.2, -0.85, -0.5, -0.2, 0.1]) { g.beginPath(); g.arc(wx, -0.06, 0.07, 0, 7); g.fill(); }
  g.fillStyle = '#F3EDDC'; for (let i = 0; i < 6; i++) g.fillRect(-1.62 + (i % 3) * 0.2 + Math.floor(i / 3) * 0.7, -0.3, 0.12, 0.09);
  g.restore();
}
// Bank safe-deposit box with a hinged door; open 0..1 shows the cash stacks.
function safebox(x, y, s, open) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = 'rgba(0,0,0,0.25)'; g.beginPath(); g.ellipse(0.05, 0.55, 1.05, 0.07, 0, 0, 7); g.fill();
  g.fillStyle = '#5C6168'; rrect(g, -1, -0.5, 2, 1, 0.05); g.fill();
  g.fillStyle = '#2A2D33'; rrect(g, -0.9, -0.42, 1.8, 0.84, 0.03); g.fill();
  g.restore();
  for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) banknote(x + (-0.6 + c * 0.4) * s, y + (-0.16 + r * 0.32) * s, 0.36 * s, 0, { value: '$', fill: '#C9D4B6', ink: '#2E4A30' });
  g.save(); g.translate(x, y); g.scale(s, s);
  const k = Math.cos(clamp(open) * Math.PI * 0.48);                 // door swings toward the viewer
  g.fillStyle = '#7A8088'; rrect(g, -1, -0.5, 2 * k, 1, 0.05); g.fill();
  g.strokeStyle = '#50555C'; g.lineWidth = 0.02; rrect(g, -0.92, -0.42, 1.84 * k, 0.84, 0.03); g.stroke();
  if (k > 0.3) { g.fillStyle = '#C9CDD2'; g.beginPath(); g.arc(-1 + 1.7 * k, 0, 0.09, 0, 7); g.fill(); g.fillStyle = '#2A2D33'; g.fillRect(-1 + 1.7 * k - 0.015, -0.06, 0.03, 0.12); }
  g.restore();
}
// Handcuffs: close 0..1 swings the cuffs shut.
function cuffs(x, y, s, close, color = '#3A3F47') {
  g.save(); g.translate(x, y); g.scale(s, s); g.strokeStyle = color; g.lineCap = 'round';
  g.lineWidth = 0.05; for (let i = 0; i < 4; i++) { g.beginPath(); g.ellipse(-0.24 + i * 0.16, 0, 0.09, 0.05, 0, 0, 7); g.stroke(); }
  for (const sd of [-1, 1]) { g.save(); g.translate(sd * 0.68, 0); g.lineWidth = 0.1;
    g.beginPath(); g.arc(0, 0, 0.3, sd > 0 ? Math.PI : 0, (sd > 0 ? Math.PI : 0) + sd * (0.8 + 1.4 * clamp(close)) * Math.PI / 1.1); g.stroke();
    g.fillStyle = color; g.fillRect(sd > 0 ? -0.42 : 0.3, -0.07, 0.12, 0.14); g.restore(); }
  g.restore();
}
// Brick facade with windows; returns nothing. Window grid from x0.
function facade(x0, y0, w, h) {
  g.fillStyle = '#3A2A24'; g.fillRect(x0, y0, w, h);
  g.strokeStyle = 'rgba(0,0,0,0.25)'; g.lineWidth = 2 * u;
  for (let yy = y0; yy < y0 + h; yy += 26 * u) { g.beginPath(); g.moveTo(x0, yy); g.lineTo(x0 + w, yy); g.stroke(); }
  for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) { const wx = x0 + 60 * u + c * (w - 120 * u) / 3 - 50 * u, wy = y0 + 60 * u + r * 190 * u;
    g.fillStyle = (r === 1 && c === 2) ? '#E9C66B' : '#141922'; g.fillRect(wx, wy, 100 * u, 130 * u);
    g.fillStyle = '#2A1E19'; g.fillRect(wx - 8 * u, wy + 130 * u, 116 * u, 10 * u); }
}

const LIST = ['ฟังให้มาก อย่ารีบพูด', 'อย่าทำหน้าเบื่อ', 'รอฟังจุดยืนการเมือง แล้วคล้อยตาม', 'รอฟังความเชื่อศาสนา แล้วคล้อยตาม',
  'อย่าเริ่มเรื่องอ่อนไหวเอง', 'อย่าบ่นเรื่องโรคภัยของตัวเอง', 'อย่าซักไซ้เรื่องส่วนตัว', 'อย่าคุยโอ้อวด', 'อย่าแต่งตัวรุงรัง', 'อย่าเมา'];

export default () => [
  // ---------------- Chapter 5 — the payoff and the getaway
  { from: bar(32), to: bar(35), cues: [[0.2, 'thump', 0.6], [1.0, 'swish', 0.5], [5.0, 'chime', 0.5]],
    draw(t) {
      night('#17110C');
      const gl = g.createRadialGradient(TX, 900 * u, 50 * u, TX, 900 * u, 700 * u); gl.addColorStop(0, 'rgba(233,198,107,0.25)'); gl.addColorStop(1, 'rgba(233,198,107,0)');
      g.fillStyle = gl; g.fillRect(0, 0, W, H);
      const s = spring(t - 0.1, 'heavy');
      envelope(TX, 960 * u + (1 - s) * 900 * u, 560 * u, -0.06, clamp((t - 1.0) / 1.2));
      kicker('ปิดดีล', TX, 270 * u, t, { color: GOLD });
      say('Poisson จ่ายค่า “หอไอเฟล”\nแถมสินบนให้อีกก้อน', TX, 380 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      say('แต่หอไอเฟล… ไม่เคยเป็นของ Lustig', TX, 1460 * u, t - 5.0, { size: 48 * u, weight: 800, color: GOLD });
      finish(0.8);
    } },
  { from: bar(35), to: bar(38), cues: [[0.2, 'whoosh', 0.6], [1.0, 'pop', 0.5], [3.0, 'pop', 0.5], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      // faint graticule
      g.save(); g.strokeStyle = C.paper3; g.lineWidth = 2 * u; for (let i = 0; i < 8; i++) { g.beginPath(); g.moveTo(0, 620 * u + i * 110 * u); g.lineTo(W, 600 * u + i * 110 * u); g.stroke(); } g.restore();
      const A = [210 * u, 1010 * u], B = [810 * u, 960 * u];
      const pts = Array.from({ length: 21 }, (_, i) => { const k = i / 20; return [A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k - Math.sin(k * Math.PI) * 160 * u]; });
      path(pts, 1, { color: C.paper3, width: 6 * u, dash: [14 * u, 12 * u] });
      const hd = path(pts, remap(t, 1.0, 5.0), { color: C.red, width: 6 * u });
      eiffel(A[0], A[1] - 70 * u, 150 * u, 1, { color: C.inkSoft });
      pin(A[0], A[1], t - 0.6); pin(B[0], B[1], t - 3.0);
      text(g, 'ปารีส', A[0], A[1] + 70 * u, { size: 40 * u, weight: 800, family: THAI, color: C.ink, alpha: clamp((t - 0.8) / 0.2) });
      text(g, 'เวียนนา', B[0], B[1] + 70 * u, { size: 40 * u, weight: 800, family: THAI, color: C.ink, alpha: clamp((t - 3.2) / 0.2) });
      if (t > 1.0) train(hd.x, hd.y - 6 * u, 70 * u, hd.ang, C.ink);
      kicker('ขั้นที่ 3 · หนี', TX, 290 * u, t);
      say('ขึ้นรถไฟหนีไปเวียนนา\nพร้อมกระเป๋าเงินสด', TX, 400 * u, t - 0.2, { size: 54 * u, weight: 800 });
      say('แล้วเฝ้าดูหนังสือพิมพ์ทุกวัน…', TX, 1300 * u, t - 5.0, { size: 50 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(38), to: bar(40), cues: [[0.1, 'swish', 0.5], [0.6, 'swish', 0.5], [1.1, 'swish', 0.5], [2.5, 'thump', 0.7]],
    draw(t) {
      paper();
      [['LA BOURSE', -0.06, 1], ['THÉÂTRE', 0.04, 2], ['LE SPORT', -0.02, 3]].forEach(([hd, r, sd], i) => { const s = spring(t - 0.1 - i * 0.5, 'default'); if (s <= 0) return;
        newspaper(TX + (i - 1) * 40 * u, 780 * u + (1 - s) * 1300 * u, 600 * u, 640 * u, { rot: r, head: hd, tower: false, seed: sd }); });
      kicker('ผ่านไปหลายวัน', TX, 330 * u, t);
      say('ไม่มีข่าวเลยสักบรรทัด', TX, 1250 * u, t - 1.5, { size: 60 * u, weight: 800 });
      say('เชื่อกันว่า Poisson อายเกินกว่าจะแจ้งตำรวจ', TX, 1380 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- Chapter 6 — round two, and Capone
  { from: bar(40), to: bar(43), cues: [[0.2, 'whoosh', 0.5], [3.75, 'impact', 1.0], [4.2, 'swish', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 3.75, 16); g.translate(sx, sy);
      night(NAVY);
      for (let i = 0; i < 30; i++) { g.fillStyle = C.cream; g.globalAlpha = 0.2 + hash(i, 4) * 0.4; g.fillRect(hash(i, 5) * W, 560 * u + hash(i, 6) * 600 * u, 2.5 * u, 2.5 * u); }
      g.globalAlpha = 1;
      if (t > 3.75) { const a = -2.3 + (t - 3.75) * 0.9; g.save(); g.translate(TX, 1250 * u); g.rotate(a);
        const bg = g.createLinearGradient(0, 0, 1100 * u, 0); bg.addColorStop(0, 'rgba(255,240,200,0.4)'); bg.addColorStop(1, 'rgba(255,240,200,0)');
        g.fillStyle = bg; g.beginPath(); g.moveTo(0, 0); g.lineTo(1100 * u, -120 * u); g.lineTo(1100 * u, 120 * u); g.closePath(); g.fill(); g.restore(); }
      eiffel(720 * u, 1250 * u, 700 * u, 1, { color: GOLD });
      const gx = track(t, [[0, -200 * u], [0.1, 300 * u], [3.9, -300 * u]], 'heavy');
      gent(gx, 1250 * u, 220 * u, '#05070C', { step: t < 1.4 || t > 3.9 ? t * 10 : 0, shirt: '#8C97AD' });
      g.fillStyle = '#070B14'; g.fillRect(0, 1250 * u, W, H);
      kicker('ตามที่เล่ากันมา', TX, 270 * u, t, { color: GOLD });
      say('เขากลับมาปารีส… เพื่อขายอีกรอบ', TX, 380 * u, t - 0.2, { size: 52 * u, weight: 800, color: C.cream });
      say('ครั้งนี้เหยื่อไปแจ้งตำรวจ', TX, 1380 * u, t - 3.75, { size: 54 * u, weight: 800, color: C.red });
      say('แต่ Lustig หนีรอดไปได้อีกครั้ง', TX, 1490 * u, t - 5.5, { size: 46 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(43), to: bar(45), cues: [[0.2, 'thump', 0.6], [2.5, 'impact', 0.9]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 14); g.translate(sx, sy);
      paper();
      // a shelf of later books and articles
      const spines = ['#7A2A1E', '#2E3E66', '#4A4236', '#8A6A2E', '#3A5A4A', '#6B4E36', '#2A2D33'];
      spines.forEach((c, i) => { const s = spring(t - 0.2 - i * 0.08, 'snappy'); if (s <= 0) return; const hh = (300 + hash(i, 61) * 120) * u;
        g.fillStyle = c; g.fillRect(170 * u + i * 104 * u, 1420 * u - hh * s, 90 * u, hh * s);
        g.fillStyle = 'rgba(239,230,210,0.5)'; g.fillRect(185 * u + i * 104 * u, 1420 * u - hh * s + 30 * u, 60 * u, 6 * u); });
      g.fillStyle = '#6B4E36'; g.fillRect(120 * u, 1420 * u, W - 240 * u, 22 * u);
      stamp('LEGEND?', TX, 1200 * u, t - 2.5, { size: 120 * u, rot: -0.1 });
      kicker('หมายเหตุ', TX, 330 * u, t);
      say('รายละเอียดเรื่องหอไอเฟล\nส่วนใหญ่มาจากเรื่องเล่ายุคหลัง', TX, 470 * u, t - 0.2, { size: 52 * u, weight: 800 });
      say('ตัวเลขเงิน และบางฉาก\nจึงยืนยันไม่ได้ทั้งหมด', TX, 700 * u, t - 1.5, { size: 46 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(45), to: bar(47), cues: [[0.2, 'thump', 0.6], [1.0, 'riser', 0.4], [2.5, 'impact', 0.8]],
    draw(t) {
      night('#14100C');
      const gl = g.createRadialGradient(TX, 1050 * u, 30 * u, TX, 1050 * u, 520 * u); gl.addColorStop(0, 'rgba(233,198,107,0.22)'); gl.addColorStop(1, 'rgba(233,198,107,0)');
      g.fillStyle = gl; g.fillRect(0, 0, W, H);
      fedora(TX, 1150 * u + (1 - spring(t - 0.1, 'heavy')) * 400 * u, 190 * u, '#050403');
      g.fillStyle = 'rgba(20,16,12,0.9)'; g.fillRect(0, 1190 * u, W, 380 * u);
      const n = Math.round(50000 * clamp(spring(t - 1.0, 30, 11) * 1.004));
      text(g, '$' + n.toLocaleString('en-US'), TX, 1340 * u, { size: 140 * u, weight: 400, family: SERIF, color: GOLD, alpha: clamp((t - 0.9) / 0.2) });
      kicker('อีกหนึ่งเรื่องเล่าที่โด่งดัง', TX, 270 * u, t, { color: GOLD });
      say('เขาไปขอให้ Al Capone\nร่วมลงทุน $50,000', TX, 380 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      say('สัญญาว่าจะทำกำไรให้ 2 เท่า', TX, 1470 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(47), to: bar(50), cues: [[0.2, 'click', 0.7], [2.5, 'swish', 0.6], [5.0, 'impact', 0.9], [5.4, 'chime', 0.5]],
    draw(t) {
      paper();
      const op = t < 2.5 ? spring(t - 0.3, 'default') : 1 - spring(t - 2.5, 'default') * 0.6;
      const sx = track(t, [[0, TX], [2.5, TX - 80 * u]], 'default');
      safebox(sx, 820 * u, 280 * u, op);
      kicker('แต่ไม่ได้ลงทุนอะไรเลย', TX, 290 * u, t);
      say('แค่เก็บเงินไว้ในตู้นิรภัย\nแล้วนำมาคืนครบ บอกว่าดีลล่ม', TX, 400 * u, t - 0.2, { size: 50 * u, weight: 800 });
      big('$5,000', TX, 1290 * u, t - 5.0, { size: 160 * u, color: C.red });
      say('Capone ประทับใจใน “ความซื่อสัตย์”\nจึงให้เงินเขาไปใช้', TX, 1390 * u, t - 5.4, { size: 44 * u, weight: 800 });
      finish(0.6);
    } },
  // ---------------- Chapter 7 — counterfeiter, prisoner, escapee
  { from: bar(50), to: bar(53), cues: [[0.2, 'whoosh', 0.5], ...Array.from({ length: 10 }, (_, i) => [1.0 + i * 0.6, 'tick', 0.35]), [7.0, 'thump', 0.5]],
    draw(t) {
      night('#0E0C0A');
      const x0 = 110 * u, y0 = 560 * u, w = W - 220 * u - 40 * u, h = 860 * u, rh = 118 * u;
      g.fillStyle = '#EDE3CB'; rrect(g, x0, y0, w, h, 10 * u); g.fill();
      const off = clamp(remap(t, 1.0, 7.0)) * (LIST.length * rh - h + 60 * u);
      g.save(); g.beginPath(); g.rect(x0, y0 + 10 * u, w, h - 20 * u); g.clip();
      LIST.forEach((s, i) => { const yy = y0 + 90 * u + i * rh - off;
        text(g, String(i + 1), x0 + 70 * u, yy, { size: 64 * u, weight: 400, family: SERIF, color: C.red });
        text(g, s, x0 + 140 * u, yy - 4 * u, { size: 40 * u, weight: 800, family: THAI, color: C.ink, align: 'left' });
        g.fillStyle = C.paper3; g.fillRect(x0 + 40 * u, yy + 40 * u, w - 80 * u, 2 * u); });
      g.restore();
      const fade = (y, up) => { const gr = g.createLinearGradient(0, y, 0, y + (up ? -80 : 80) * u); gr.addColorStop(0, 'rgba(237,227,203,1)'); gr.addColorStop(1, 'rgba(237,227,203,0)'); g.fillStyle = gr; g.fillRect(x0, Math.min(y, y + (up ? -80 : 80) * u), w, 80 * u); };
      fade(y0 + 10 * u, false); fade(y0 + h - 10 * u, true);
      kicker('ถูกยกให้เป็นของเขา', TX, 270 * u, t, { color: GOLD });
      say('“บัญญัติ 10 ประการของนักต้มตุ๋น”', TX, 380 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      say('ไม่มีหลักฐานชัดว่าเขาเขียนเองจริงหรือไม่', TX, 1510 * u, t - 4.0, { size: 38 * u, weight: 700, color: C.fog });
      finish(0.8);
    } },
  { from: bar(53), to: bar(55), cues: Array.from({ length: 8 }, (_, i) => [0.3 + i * 0.3, 'thump', 0.35]).concat([[2.5, 'swish', 0.5]]),
    draw(t) {
      night('#0F1116');
      // press: frame + turning rollers; notes shoot out to a pile
      g.fillStyle = '#2E3238'; g.fillRect(140 * u, 760 * u, 420 * u, 380 * u); g.fillStyle = '#3E434B'; g.fillRect(170 * u, 720 * u, 360 * u, 50 * u);
      for (const [rx, ry] of [[270 * u, 900 * u], [430 * u, 900 * u]]) { g.save(); g.translate(rx, ry); g.rotate(t * 6);
        g.fillStyle = '#8C97AD'; g.beginPath(); g.arc(0, 0, 62 * u, 0, 7); g.fill(); g.strokeStyle = '#2E3238'; g.lineWidth = 8 * u;
        for (let k = 0; k < 3; k++) { g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(k * 2.09) * 60 * u, Math.sin(k * 2.09) * 60 * u); g.stroke(); } g.restore(); }
      for (let i = 0; i < 14; i++) { const at = 0.3 + i * 0.3, k = clamp((t - at) / 0.5); if (k <= 0) continue;
        const px = 560 * u + k * (230 * u + hash(i, 71) * 60 * u), py = 1000 * u + k * k * (130 * u - i * 8 * u);
        banknote(px, py, 220 * u, (hash(i, 72) - 0.5) * 0.3 * k, { value: '$', fill: '#C9D4B6', ink: '#2E4A30' }); }
      kicker('ทศวรรษ 1930 · สหรัฐฯ', TX, 270 * u, t, { color: GOLD });
      say('หันมาปลอมธนบัตรดอลลาร์\nร่วมกับ William Watts', TX, 380 * u, t - 0.2, { size: 52 * u, weight: 800, color: C.cream });
      say('ธนบัตรปลอมหมุนเวียนจำนวนมาก\nจน Secret Service ต้องตามล่า', TX, 1330 * u, t - 2.5, { size: 46 * u, weight: 800, color: GOLD });
      finish(0.8);
    } },
  { from: bar(55), to: bar(57), cues: [[0.2, 'thump', 0.6], [1.5, 'whoosh', 0.6], [3.5, 'pop', 0.5]],
    draw(t) {
      night('#0E1420');
      facade(120 * u, 520 * u, 700 * u, 1100 * u);
      // knotted bedsheet rope from the lit window
      const wx = 120 * u + 60 * u + 2 * (700 * u - 120 * u) / 3 - 50 * u + 50 * u, wy = 520 * u + 60 * u + 190 * u + 120 * u;
      const L = clamp(remap(t, 0.8, 1.6)) * 560 * u;
      g.strokeStyle = '#EDE6D6'; g.lineWidth = 14 * u; g.lineCap = 'round'; g.beginPath(); g.moveTo(wx, wy);
      for (let k = 0; k <= 20; k++) { const yy = wy + (k / 20) * L; g.lineTo(wx + Math.sin(k * 0.6 + t * 1.5) * 8 * u, yy); } g.stroke();
      g.fillStyle = '#EDE6D6'; for (let k = 1; k < 5; k++) { const yy = wy + k * 120 * u; if (yy < wy + L) { g.beginPath(); g.ellipse(wx, yy, 18 * u, 12 * u, 0, 0, 7); g.fill(); } }
      if (t > 1.5) gent(wx + 10 * u, wy + 280 * u + clamp(remap(t, 1.5, 4.5)) * 110 * u, 130 * u, '#B8C0CC', { hat: false, cane: false, shirt: '#E8ECF0' });
      g.fillStyle = 'rgba(8,12,20,0.88)'; g.fillRect(0, 190 * u, W, 300 * u);
      kicker('พฤษภาคม 1935 · ถูกจับที่นิวยอร์ก', TX, 280 * u, t, { color: GOLD });
      say('1 กันยายน 1935 · วันก่อนขึ้นศาล', TX, 400 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      g.fillStyle = 'rgba(8,12,20,0.88)'; if (t > 1.4) g.fillRect(0, 1290 * u, W, 280 * u);
      say('เขาผูกผ้าปูที่นอนต่อเป็นเชือก\nไต่ลงมาจากที่คุมขัง', TX, 1370 * u, t - 1.5, { size: 46 * u, weight: 800, color: GOLD });
      say('บางแหล่งเล่าว่าแกล้งทำเป็นคนเช็ดกระจก', TX, 1530 * u, t - 3.5, { size: 36 * u, weight: 700, color: C.fog });
      finish(0.8);
    } },
  { from: bar(57), to: bar(58), cues: [[0.3, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 0.3, 18); g.translate(sx, sy);
      paper();
      cuffs(TX, 820 * u, 300 * u, spring(t - 0.3, 'snappy'));
      kicker('ราว 4 สัปดาห์ต่อมา', TX, 400 * u, t);
      say('ถูกจับได้อีกครั้งที่ Pittsburgh', TX, 1180 * u, t - 0.3, { size: 58 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- Chapter 8 — the Rock, and the end
  { from: bar(58), to: bar(61), cues: [[0.2, 'thump', 0.7], [1.25, 'impact', 0.9], [3.75, 'whoosh', 0.5]],
    draw(t) {
      night('#0A0F1A');
      const sk = g.createLinearGradient(0, 600 * u, 0, 1250 * u); sk.addColorStop(0, 'rgba(46,62,102,0)'); sk.addColorStop(1, 'rgba(120,110,150,0.55)');
      g.fillStyle = sk; g.fillRect(0, 600 * u, W, 650 * u);
      for (let i = 0; i < 50; i++) { g.fillStyle = C.cream; g.globalAlpha = 0.15 + hash(i, 81) * 0.5; g.fillRect(hash(i, 82) * W, hash(i, 83) * 1200 * u, 2.5 * u, 2.5 * u); }
      g.globalAlpha = 1;
      alcatraz(1250 * u, 380 * u, t);
      kicker('ศาลตัดสิน · ปลายปี 1935', TX, 270 * u, t, { color: GOLD });
      big('20 ปี', TX, 600 * u, t - 1.25, { size: 210 * u, color: C.cream });
      say('ปลอมแปลงเงินตรา 15 ปี + หลบหนี 5 ปี', TX, 760 * u, t - 1.8, { size: 42 * u, weight: 800, color: C.fog });
      say('ถูกส่งไปคุมขังที่ Alcatraz', TX, 1430 * u, t - 3.75, { size: 56 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(61), to: bar(64), cues: [[0.2, 'thump', 0.6], [2.0, 'type', 0.6], [3.5, 'type', 0.6], [4.6, 'thump', 0.7]],
    draw(t) {
      paper();
      const s = spring(t - 0.1, 'default');
      g.save(); g.translate(TX, 850 * u + (1 - s) * 900 * u); g.rotate(0.02);
      g.fillStyle = 'rgba(0,0,0,0.18)'; g.fillRect(-370 * u, -170 * u, 760 * u, 360 * u);
      g.fillStyle = '#F7F1E3'; g.fillRect(-380 * u, -180 * u, 760 * u, 360 * u);
      g.strokeStyle = C.inkSoft; g.lineWidth = 2 * u; g.strokeRect(-350 * u, -150 * u, 700 * u, 300 * u);
      for (let i = 0; i < 3; i++) { g.fillStyle = C.paper3; g.fillRect(-320 * u, -110 * u + i * 50 * u, (300 + hash(i, 91) * 300) * u, 14 * u); }
      text(g, 'USUAL OCCUPATION', -320 * u, 60 * u, { size: 26 * u, weight: 700, family: LATIN, color: C.inkSoft, align: 'left', tracking: 2 * u });
      typewriter('APPRENTICE SALESMAN', -320 * u, 120 * u, t - 3.5, { size: 46 * u, weight: 700, family: LATIN, color: C.ink, cps: 16 });
      g.restore();
      kicker('11 มีนาคม 1947', TX, 290 * u, t);
      const yb = say('เสียชีวิตด้วยโรคปอดบวม ในวัย 57 ปี', TX, 400 * u, t - 0.2, { size: 48 * u, weight: 800 });
      say('ที่ศูนย์การแพทย์เรือนจำกลาง\nเมือง Springfield รัฐ Missouri', TX, yb + 10 * u, t - 1.0, { size: 40 * u, weight: 700, color: C.inkSoft });
      say('มีรายงานว่าใบมรณบัตรระบุอาชีพของเขาว่า', TX, 1260 * u, t - 2.0, { size: 42 * u, weight: 800 });
      say('“พนักงานขายฝึกหัด”', TX, 1400 * u, t - 4.6, { size: 76 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- Chapter 9 — close
  { from: bar(64), to: bar(68), cues: [[0, 'thump', 0.9], [3.0, 'chime', 0.5], [5.0, 'swish', 0.4]],
    draw(t) {
      night(NAVY);
      eiffel(TX, 1560 * u, 1250 * u, remap(t, 0, 2.5), { color: GOLD, alpha: 0.22 });
      big('1925', TX, 820 * u, t, { size: 300 * u, color: C.cream });
      const p = spring(t - 0.7, 'default');
      g.fillStyle = C.red; g.fillRect(TX - 330 * u * p, 900 * u, 660 * u * p, 10 * u);
      say('ชายผู้ขายหอไอเฟล', TX, 1060 * u, t - 1.0, { size: 66 * u, weight: 800, color: C.red });
      say('นักต้มตุ๋นที่โลกยังเล่าถึงจนวันนี้', TX, 1180 * u, t - 3.0, { size: 46 * u, weight: 800, color: C.cream });
      gent(TX, 1560 * u, 110 * u, '#05070C', { tip: spring(t - 5.0, 'playful'), shirt: '#8C97AD' });
      finish();
    } },
  { from: bar(68), to: bar(72), cues: [[0.2, 'whoosh', 0.5], [2.5, 'pop', 0.6], [5.0, 'chime', 0.8]],
    draw(t) {
      paper();
      eiffel(TX + 120 * u, 1540 * u, 860 * u, 1, { color: C.ink });
      // swinging "SOLD" tag
      const ax = TX + 120 * u + 60 * u, ay = 1540 * u - 0.38 * 860 * u, sw = Math.sin(t * 2.2) * 0.12;
      g.save(); g.translate(ax, ay); g.rotate(-0.5 + sw);
      g.strokeStyle = C.ink; g.lineWidth = 3 * u; g.beginPath(); g.moveTo(0, 0); g.lineTo(0, 120 * u); g.stroke();
      g.fillStyle = C.red; rrect(g, -80 * u, 120 * u, 160 * u, 80 * u, 10 * u); g.fill();
      text(g, 'SOLD', 0, 175 * u, { size: 44 * u, weight: 800, family: LATIN, color: C.paper, tracking: 3 * u });
      g.restore();
      gent(210 * u, 1540 * u, 250 * u, C.ink, { tip: spring(t - 2.5, 'playful') * (t < 4.5 ? 1 : 1 - clamp((t - 4.5) / 0.4)) });
      g.fillStyle = 'rgba(239,230,210,0.9)'; g.fillRect(0, 200 * u, W, 320 * u);
      say('ถ้าเป็นคุณ… จะเชื่อ “ท่านเคานต์” ไหม?', TX, 330 * u, t - 0.3, { size: 52 * u, weight: 800, color: C.ink });
      say('คอมเมนต์บอกได้เลย', TX, 450 * u, t - 2.5, { size: 48 * u, weight: 800, color: C.red });
      finish(0.5);
    } },
];
