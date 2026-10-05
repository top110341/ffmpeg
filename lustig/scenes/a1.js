// Victor Lustig, the man who "sold" the Eiffel Tower — Act 1: 0:00–1:20 (bars 0–32).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, banknote } from './kit.js';

export const GOLD = '#C9A94A', NAVY = '#101827', WINE = '#3A1A1C', MAHOG = '#5A2A1A', LATIN = 'Inter, sans-serif';

// ---------------------------------------------------------------- props
// Eiffel Tower as a line drawing. Base centre (x, y), height h. p 0..1 reveals it bottom → top.
export function eiffel(x, y, h, p = 1, o = {}) {
  const { color = C.ink, lw = 1, alpha = 1 } = o;
  if (p <= 0) return;
  const hw = (f) => 0.19 * h * Math.pow(Math.max(0, 1 - f / 0.86), 1.8) + 0.012 * h;
  const ih = (f) => (f >= 0.38 ? 0 : hw(f) * 0.6 * Math.pow(1 - f / 0.38, 0.7));
  const Y = (f) => y - f * h;
  g.save(); g.globalAlpha *= alpha;
  g.beginPath(); g.rect(x - h, y - h * 1.04 * clamp(p) - 4 * u, 2 * h, h * 1.04 * clamp(p) + 40 * u); g.clip();
  g.strokeStyle = color; g.fillStyle = color; g.lineJoin = 'round'; g.lineCap = 'round';
  const L = (w) => { g.lineWidth = Math.max(1, w * h * lw); };
  // outer silhouette
  L(0.008);
  for (const sd of [-1, 1]) { g.beginPath(); for (let k = 0; k <= 48; k++) { const f = (k / 48) * 0.86; const px = x + sd * hw(f); k ? g.lineTo(px, Y(f)) : g.moveTo(px, Y(f)); } g.stroke(); }
  // inner leg edges, up to where the legs merge
  L(0.006);
  for (const sd of [-1, 1]) { g.beginPath(); for (let k = 0; k <= 30; k++) { const f = (k / 30) * 0.38; const px = x + sd * ih(f); k ? g.lineTo(px, Y(f)) : g.moveTo(px, Y(f)); } g.stroke(); }
  // the great arch under the first floor
  L(0.007); g.beginPath(); g.moveTo(x - ih(0.03), Y(0.03)); g.quadraticCurveTo(x, Y(0.2), x + ih(0.03), Y(0.03)); g.stroke();
  // lattice: zig-zags inside each leg, then across the single shaft
  L(0.0028);
  const st = 0.022;
  for (const sd of [-1, 1]) { g.beginPath(); for (let f = 0, k = 0; f < 0.38; f += st, k++) { const a = k % 2 ? hw(f) : ih(f); const px = x + sd * a; k ? g.lineTo(px, Y(f)) : g.moveTo(px, Y(f)); } g.stroke(); }
  for (let f = 0.38, k = 0; f < 0.84; f += 0.03, k++) { const f2 = Math.min(0.84, f + 0.03);
    g.beginPath(); g.moveTo(x - hw(f), Y(f)); g.lineTo(x + hw(f2), Y(f2)); g.moveTo(x + hw(f), Y(f)); g.lineTo(x - hw(f2), Y(f2)); g.stroke(); }
  // platforms
  const deck = (f, th, k) => { const w = hw(f) * k; g.fillRect(x - w, Y(f) - th * h, 2 * w, th * h);
    L(0.0025); for (let i = -4; i <= 4; i++) { g.beginPath(); g.moveTo(x + (i / 4) * w, Y(f) - th * h); g.lineTo(x + (i / 4) * w, Y(f) - th * h - 0.012 * h); g.stroke(); }
    g.fillRect(x - w, Y(f) - th * h - 0.013 * h, 2 * w, 0.003 * h); };
  deck(0.19, 0.02, 1.18); deck(0.38, 0.013, 1.35);
  // top: cabin, spire
  g.fillRect(x - 0.026 * h, Y(0.86) - 0.004 * h, 0.052 * h, 0.012 * h);
  g.fillRect(x - 0.016 * h, Y(0.905), 0.032 * h, 0.045 * h);
  L(0.006); g.beginPath(); g.moveTo(x, Y(0.905)); g.lineTo(x, Y(1)); g.stroke();
  g.beginPath(); g.arc(x, Y(0.93), 0.008 * h, 0, 7); g.fill();
  g.restore();
}

// Gentleman silhouette: top hat, frock coat, cane. Feet at (x, y); ~2.25 s tall. tip 0..1 raises the hat.
export function gent(x, y, s, color = C.ink, o = {}) {
  const { tip = 0, cane = true, shirt = '#F2EEE4', step = 0, hat = true } = o;
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color; g.strokeStyle = color; g.lineCap = 'round';
  // legs (step swings them)
  const sw = Math.sin(step) * 0.12;
  g.save(); g.translate(-0.08, -0.92); g.rotate(sw); g.fillRect(-0.075, 0, 0.14, 0.92); g.beginPath(); g.ellipse(-0.04, 0.9, 0.13, 0.045, 0, 0, 7); g.fill(); g.restore();
  g.save(); g.translate(0.08, -0.92); g.rotate(-sw); g.fillRect(-0.065, 0, 0.14, 0.92); g.beginPath(); g.ellipse(0.05, 0.9, 0.13, 0.045, 0, 0, 7); g.fill(); g.restore();
  // frock coat with tails
  g.beginPath(); g.moveTo(-0.2, -1.66); g.quadraticCurveTo(-0.34, -1.64, -0.33, -1.45); g.lineTo(-0.3, -0.95); g.lineTo(-0.26, -0.55);
  g.lineTo(-0.06, -0.85); g.lineTo(0.06, -0.85); g.lineTo(0.26, -0.55); g.lineTo(0.3, -0.95); g.lineTo(0.33, -1.45); g.quadraticCurveTo(0.34, -1.64, 0.2, -1.66); g.closePath(); g.fill();
  // shirt front + bow tie
  g.fillStyle = shirt; g.beginPath(); g.moveTo(-0.08, -1.66); g.lineTo(0.08, -1.66); g.lineTo(0, -1.36); g.closePath(); g.fill();
  g.fillStyle = color; g.beginPath(); g.moveTo(0, -1.6); g.lineTo(-0.06, -1.64); g.lineTo(-0.06, -1.56); g.closePath(); g.moveTo(0, -1.6); g.lineTo(0.06, -1.64); g.lineTo(0.06, -1.56); g.closePath(); g.fill();
  // head + neck
  g.fillRect(-0.05, -1.74, 0.1, 0.1);
  g.beginPath(); g.ellipse(0, -1.86, 0.13, 0.15, 0, 0, 7); g.fill();
  // left arm down; right arm to the cane
  g.lineWidth = 0.11; g.beginPath(); g.moveTo(-0.28, -1.55); g.lineTo(-0.34, -1.0); g.stroke();
  g.beginPath(); g.moveTo(0.28, -1.55); g.lineTo(0.42, -1.12); g.lineTo(0.46, -0.98); g.stroke();
  if (cane) { g.lineWidth = 0.035; g.beginPath(); g.moveTo(0.47, -0.98); g.lineTo(0.56, 0); g.stroke();
    g.beginPath(); g.arc(0.47, -1.0, 0.045, 0, 7); g.fill(); }
  // top hat
  if (hat) { g.save(); g.translate(0, -1.98 - tip * 0.18); g.rotate(-tip * 0.35);
    g.fillRect(-0.21, -0.02, 0.42, 0.045); g.beginPath(); g.moveTo(-0.13, 0); g.lineTo(-0.12, -0.36); g.lineTo(0.12, -0.36); g.lineTo(0.13, 0); g.closePath(); g.fill();
    g.fillStyle = 'rgba(255,255,255,0.12)'; g.fillRect(-0.125, -0.09, 0.25, 0.04);
    g.restore(); }
  g.restore();
}

// Ocean liner seen side-on, bow to the right. Waterline at (x, y), ~2.1 s long.
export function liner(x, y, s, o = {}) {
  const { color = '#0B0F18', lights = GOLD, smoke = 0 } = o;
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color;
  g.beginPath(); g.moveTo(-1.0, -0.2); g.lineTo(1.08, -0.22); g.lineTo(0.96, 0.06); g.lineTo(-0.9, 0.06); g.quadraticCurveTo(-1.0, 0.0, -1.0, -0.2); g.fill();
  g.fillRect(-0.72, -0.3, 1.36, 0.11); g.fillRect(-0.55, -0.38, 1.02, 0.09); g.fillRect(-0.3, -0.44, 0.5, 0.07);
  for (let i = 0; i < 4; i++) { const fx = -0.48 + i * 0.27; g.beginPath(); g.moveTo(fx, -0.37); g.lineTo(fx + 0.04, -0.68); g.lineTo(fx + 0.15, -0.68); g.lineTo(fx + 0.12, -0.37); g.fill(); }
  g.lineWidth = 0.008; g.strokeStyle = color; g.beginPath(); g.moveTo(-0.85, -0.2); g.lineTo(-0.82, -0.78); g.lineTo(0.85, -0.78); g.lineTo(0.92, -0.22); g.stroke();
  g.fillStyle = lights;
  for (let i = 0; i < 30; i++) { if (hash(i, 31) < 0.3) continue; g.beginPath(); g.arc(-0.86 + i * 0.062, -0.09, 0.012, 0, 7); g.fill(); }
  for (let i = 0; i < 20; i++) { if (hash(i, 32) < 0.35) continue; g.fillRect(-0.66 + i * 0.065, -0.27, 0.025, 0.03); }
  if (smoke) { g.fillStyle = 'rgba(140,151,173,0.35)'; for (let k = 0; k < 4; k++) for (let j = 0; j < 5; j++) { g.beginPath(); g.arc(-0.38 + k * 0.27 - j * 0.12, -0.74 - j * 0.07, 0.05 + j * 0.025, 0, 7); g.fill(); } }
  g.restore();
}

// The "Rumanian box": mahogany case, two slots, a crank. crank = angle; bill 0..1 pushes a $100 note out of the lower slot.
// xray 0..1 cuts the front away to show the genuine notes hidden inside.
export function moneybox(x, y, s, o = {}) {
  const { crank = 0, bill = 0, xray = 0 } = o;
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = 'rgba(0,0,0,0.22)'; g.beginPath(); g.ellipse(0.04, 0.66, 1.15, 0.08, 0, 0, 7); g.fill();
  // crank behind the right side
  g.save(); g.translate(1.02, -0.05); g.fillStyle = GOLD; g.beginPath(); g.arc(0, 0, 0.09, 0, 7); g.fill();
  g.rotate(crank); g.fillRect(-0.03, -0.42, 0.06, 0.42); g.fillStyle = '#2A1810'; rrect(g, -0.06, -0.56, 0.12, 0.2, 0.05); g.fill(); g.restore();
  // case
  g.fillStyle = MAHOG; rrect(g, -1, -0.6, 2, 1.2, 0.06); g.fill();
  g.fillStyle = '#7A3C24'; rrect(g, -0.92, -0.52, 1.84, 1.04, 0.04); g.fill();
  g.strokeStyle = 'rgba(40,16,8,0.35)'; g.lineWidth = 0.008;
  for (let i = 0; i < 9; i++) { g.beginPath(); g.moveTo(-0.92, -0.45 + i * 0.12); g.bezierCurveTo(-0.3, -0.5 + i * 0.12 + hash(i, 4) * 0.06, 0.3, -0.42 + i * 0.12, 0.92, -0.46 + i * 0.12); g.stroke(); }
  // brass corners + plate
  g.fillStyle = GOLD;
  for (const [cx, cy] of [[-1, -0.6], [1, -0.6], [-1, 0.6], [1, 0.6]]) { g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx - Math.sign(cx) * -0.0 + (cx < 0 ? 0.2 : -0.2), cy); g.lineTo(cx, cy + (cy < 0 ? 0.2 : -0.2)); g.closePath(); g.fill(); }
  rrect(g, -0.3, -0.5, 0.6, 0.14, 0.03); g.fill();
  // slots
  g.fillStyle = '#140A06'; rrect(g, -0.62, -0.22, 1.24, 0.06, 0.02); g.fill(); rrect(g, -0.62, 0.22, 1.24, 0.06, 0.02); g.fill();
  if (xray > 0) { g.save(); g.globalAlpha = clamp(xray); g.fillStyle = '#1A0C08'; rrect(g, -0.84, -0.13, 1.68, 0.32, 0.03); g.fill(); g.restore(); }
  g.restore();
  text(g, 'PATENT', x, y - 0.4 * s, { size: 0.08 * s, weight: 700, family: LATIN, color: '#3A2410', tracking: 2 * u });
  if (xray > 0) {
    g.save(); g.globalAlpha = clamp(xray);
    for (let i = 0; i < 4; i++) banknote(x + (-0.48 + i * 0.32) * s, y + (0.03 - i * 0.01) * s, 0.5 * s, (i - 1.5) * 0.04, { value: '100', fill: '#C8D2B4', ink: '#2E4A30' });
    g.strokeStyle = '#E8C66B'; g.lineWidth = 3 * u; g.setLineDash([10 * u, 8 * u]); rrect(g, x - 0.84 * s, y - 0.13 * s, 1.68 * s, 0.32 * s, 0.03 * s); g.stroke();
    g.restore();
  }
  // the note slides out of the lower slot towards the viewer (drawn in world space, clipped at the slot)
  if (bill > 0) {
    const bw = 1.1 * s, bh = bw * 0.43, sy = y + 0.25 * s;
    g.save(); g.beginPath(); g.rect(x - s, sy, 2 * s, 2 * s); g.clip();
    banknote(x, sy - bh / 2 + bh * clamp(bill) * 1.05, bw, 0, { value: '100', fill: '#D2DCBE', ink: '#2E4A30' });
    g.restore();
  }
}

// Invented seal (no real emblem): double ring, star crown, monogram.
export function seal(x, y, r, color = C.red) {
  g.save(); g.translate(x, y); g.strokeStyle = color; g.fillStyle = color;
  g.lineWidth = r * 0.06; g.beginPath(); g.arc(0, 0, r, 0, 7); g.stroke();
  g.lineWidth = r * 0.025; g.beginPath(); g.arc(0, 0, r * 0.82, 0, 7); g.stroke();
  for (let i = 0; i < 24; i++) { const a = (i / 24) * Math.PI * 2; g.beginPath(); g.arc(Math.cos(a) * r * 0.91, Math.sin(a) * r * 0.91, r * 0.025, 0, 7); g.fill(); }
  for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i - 2) * 0.32; g.save(); g.translate(Math.cos(a) * r * 0.55, Math.sin(a) * r * 0.55); g.rotate(a + Math.PI / 2);
    g.beginPath(); for (let k = 0; k < 10; k++) { const rr = k % 2 ? r * 0.04 : r * 0.1, aa = (k / 10) * Math.PI * 2 - Math.PI / 2; g.lineTo(Math.cos(aa) * rr, Math.sin(aa) * rr); } g.closePath(); g.fill(); g.restore(); }
  text(g, 'P·T', 0, r * 0.3, { size: r * 0.55, weight: 400, family: SERIF, color });
  g.restore();
}

// Official-looking letterhead (invented layout). Centre (x, y), width w. Typed body appears with t.
export function letterhead(x, y, w, t, o = {}) {
  const { rot = -0.02 } = o, h = w * 1.3;
  g.save(); g.translate(x, y); g.rotate(rot);
  g.fillStyle = 'rgba(0,0,0,0.3)'; g.fillRect(-w / 2 + 14 * u, -h / 2 + 18 * u, w, h);
  g.fillStyle = '#F6F0E0'; g.fillRect(-w / 2, -h / 2, w, h);
  seal(0, -h / 2 + w * 0.17, w * 0.1, '#2E3E66');
  text(g, 'RÉPUBLIQUE · PARIS', 0, -h / 2 + w * 0.34, { size: w * 0.03, weight: 700, family: LATIN, color: '#2E3E66', tracking: 3 * u });
  text(g, 'MINISTÈRE DES POSTES', 0, -h / 2 + w * 0.42, { size: w * 0.055, weight: 400, family: SERIF, color: C.ink });
  text(g, 'ET DES TÉLÉGRAPHES', 0, -h / 2 + w * 0.49, { size: w * 0.055, weight: 400, family: SERIF, color: C.ink });
  g.fillStyle = '#2E3E66'; g.fillRect(-w * 0.38, -h / 2 + w * 0.53, w * 0.76, 2 * u);
  typewriter('CONFIDENTIEL', -w * 0.38, -h / 2 + w * 0.65, t, { size: w * 0.05, weight: 700, family: LATIN, color: C.red, cps: 14 });
  for (let i = 0; i < 9; i++) { const p = clamp((t - 1.0 - i * 0.22) / 0.3); if (p <= 0) continue;
    const lw = w * (0.5 + hash(i, 12) * 0.26) * (i === 8 ? 0.4 : 1);
    g.fillStyle = 'rgba(40,36,30,0.55)'; g.fillRect(-w * 0.38, -h / 2 + w * 0.76 + i * w * 0.065, lw * p, w * 0.018); }
  // signature squiggle
  const sp = clamp((t - 3.4) / 0.8);
  if (sp > 0) { g.strokeStyle = '#1F2A4A'; g.lineWidth = 3 * u; g.beginPath();
    for (let k = 0; k <= 40 * sp; k++) { const a = k / 40, px = w * 0.05 + a * w * 0.3, py = h / 2 - w * 0.16 + Math.sin(a * 18) * w * 0.025 - a * w * 0.03; k ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); }
  g.restore();
}

// Crystal chandelier hanging from (x, y). Sways gently with t.
export function chandelier(x, y, s, t) {
  g.save(); g.translate(x, y); g.rotate(Math.sin(t * 1.1) * 0.015); g.scale(s, s);
  const gl = g.createRadialGradient(0, 0.8, 0.05, 0, 0.8, 1.2);
  gl.addColorStop(0, 'rgba(255,226,160,0.45)'); gl.addColorStop(1, 'rgba(255,226,160,0)');
  g.fillStyle = gl; g.beginPath(); g.arc(0, 0.8, 1.2, 0, 7); g.fill();
  g.strokeStyle = GOLD; g.fillStyle = GOLD; g.lineWidth = 0.025;
  g.beginPath(); g.moveTo(0, 0); g.lineTo(0, 0.55); g.stroke();
  g.beginPath(); g.ellipse(0, 0.62, 0.08, 0.12, 0, 0, 7); g.fill();
  g.beginPath(); g.ellipse(0, 0.95, 0.12, 0.08, 0, 0, 7); g.fill();
  for (const [ry, rw] of [[0.8, 0.75], [0.62, 0.45]]) {
    g.beginPath(); g.ellipse(0, ry, rw, rw * 0.18, 0, 0, Math.PI); g.stroke();
    for (let i = 0; i < 7; i++) { const a = (i / 6) * Math.PI, cx = Math.cos(a) * rw, cy = ry + Math.sin(a) * rw * 0.18;
      g.fillStyle = '#F4EAD0'; g.fillRect(cx - 0.02, cy - 0.12, 0.04, 0.12);
      g.fillStyle = '#FFE9A8'; g.beginPath(); g.ellipse(cx, cy - 0.15, 0.02, 0.04 + noise(t * 3 + i, 4) * 0.008, 0, 0, 7); g.fill();
      g.fillStyle = 'rgba(230,240,255,0.85)'; g.beginPath(); const dy = cy + 0.08; g.moveTo(cx, dy - 0.04); g.lineTo(cx + 0.025, dy); g.lineTo(cx, dy + 0.06); g.lineTo(cx - 0.025, dy); g.closePath(); g.fill(); }
  }
  for (let i = 0; i < 9; i++) { const a = (i / 8) * Math.PI, cx = Math.cos(a) * 0.6, cy = 0.95 + Math.sin(a) * 0.1;
    g.fillStyle = 'rgba(230,240,255,0.7)'; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + 0.02, cy + 0.06); g.lineTo(cx, cy + 0.14); g.lineTo(cx - 0.02, cy + 0.06); g.closePath(); g.fill(); }
  g.restore();
}

// Grand hotel lobby: panelled wine walls, gilt pilasters, chequered marble floor from y = floor.
export function lobby(t, o = {}) {
  const { floor = 1180 * u, lamp = true } = o;
  const wg = g.createLinearGradient(0, 0, 0, floor); wg.addColorStop(0, '#2A1214'); wg.addColorStop(1, WINE);
  g.fillStyle = wg; g.fillRect(0, 0, W, floor);
  for (let i = 0; i < 5; i++) { const x = -60 * u + i * 300 * u;
    g.fillStyle = 'rgba(201,169,74,0.18)'; g.fillRect(x, 120 * u, 34 * u, floor - 120 * u);
    g.strokeStyle = 'rgba(201,169,74,0.28)'; g.lineWidth = 3 * u; g.strokeRect(x + 70 * u, 640 * u, 160 * u, 420 * u); }
  g.fillStyle = 'rgba(201,169,74,0.35)'; g.fillRect(0, 110 * u, W, 10 * u); g.fillRect(0, floor - 14 * u, W, 14 * u);
  // perspective floor
  g.fillStyle = '#E7DFCF'; g.fillRect(0, floor, W, H - floor);
  const rows = 9, vx = W / 2;
  for (let r = 0; r < rows; r++) { const y0 = floor + (r / rows) ** 1.6 * (H - floor), y1 = floor + ((r + 1) / rows) ** 1.6 * (H - floor);
    for (let c = -8; c < 8; c++) { if ((r + c) % 2 === 0) continue;
      const k0 = 0.4 + (r / rows) * 2.2, k1 = 0.4 + ((r + 1) / rows) * 2.2, cw = 140 * u;
      g.fillStyle = '#2B2622'; g.beginPath(); g.moveTo(vx + c * cw * k0, y0); g.lineTo(vx + (c + 1) * cw * k0, y0); g.lineTo(vx + (c + 1) * cw * k1, y1); g.lineTo(vx + c * cw * k1, y1); g.closePath(); g.fill(); } }
  if (lamp) chandelier(TX, -40 * u, 330 * u, t);
}

// Fedora + suit silhouette (generic, never a likeness).
export function fedora(x, y, s, color = C.ink, o = {}) {
  person(x, y, s, color, o);
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color;
  g.beginPath(); g.ellipse(0, -1.42, 0.7, 0.1, 0, 0, 7); g.fill();
  g.beginPath(); g.moveTo(-0.4, -1.42); g.quadraticCurveTo(-0.42, -1.95, 0, -1.9); g.quadraticCurveTo(0.42, -1.95, 0.4, -1.42); g.closePath(); g.fill();
  g.fillStyle = 'rgba(255,255,255,0.14)'; g.fillRect(-0.4, -1.56, 0.8, 0.08);
  g.restore();
}

// Newspaper with an invented masthead. Centre (x, y), size w × h.
export function newspaper(x, y, w, h, o = {}) {
  const { rot = 0, head = 'TOUR EIFFEL', mast = "L'ÉCHO DU BOULEVARD", tower = true, seed = 3 } = o;
  g.save(); g.translate(x, y); g.rotate(rot);
  g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(-w / 2 + 14 * u, -h / 2 + 16 * u, w, h);
  g.fillStyle = '#F3EDDC'; g.fillRect(-w / 2, -h / 2, w, h);
  const m = w * 0.06;
  text(g, mast, 0, -h / 2 + w * 0.12, { size: w * 0.075, weight: 400, family: SERIF, color: C.ink });
  g.fillStyle = C.ink; g.fillRect(-w / 2 + m, -h / 2 + w * 0.15, w - 2 * m, 3 * u); g.fillRect(-w / 2 + m, -h / 2 + w * 0.185, w - 2 * m, 1.5 * u);
  text(g, 'PARIS', -w / 2 + m, -h / 2 + w * 0.175, { size: w * 0.022, weight: 700, family: LATIN, color: C.inkSoft, align: 'left' });
  text(g, head, 0, -h / 2 + w * 0.3, { size: w * 0.095, weight: 800, family: LATIN, color: C.ink, tracking: 2 * u });
  // body: picture box + columns of grey lines
  const top = -h / 2 + w * 0.36, colW = (w - 2 * m - 2 * 20 * u) / 3;
  for (let c = 0; c < 3; c++) {
    const cx = -w / 2 + m + c * (colW + 20 * u);
    let yy = top;
    if (c === 1 && tower) { g.fillStyle = '#D9D0BC'; g.fillRect(cx, yy, colW, colW * 1.25); eiffel(cx + colW / 2, yy + colW * 1.2, colW * 1.1, 1, { color: '#5A5246' }); yy += colW * 1.25 + 18 * u; }
    for (let i = 0; yy < h / 2 - m; i++, yy += w * 0.032) { g.fillStyle = 'rgba(60,54,44,0.45)'; g.fillRect(cx, yy, colW * (0.75 + hash(i + c * 50, seed) * 0.25), w * 0.012); }
  }
  g.restore();
}

// Envelope stuffed with franc notes. p 0..1 pushes the notes up and out.
export function envelope(x, y, w, rot, p, o = {}) {
  const h = w * 0.62;
  g.save(); g.translate(x, y); g.rotate(rot);
  g.fillStyle = 'rgba(0,0,0,0.3)'; g.fillRect(-w / 2 + 14 * u, -h / 2 + 18 * u, w, h);
  g.fillStyle = '#B89E6E'; g.fillRect(-w / 2, -h / 2, w, h);
  // open flap behind
  g.fillStyle = '#C9B07E'; g.beginPath(); g.moveTo(-w / 2, -h / 2); g.lineTo(0, -h / 2 - h * 0.55); g.lineTo(w / 2, -h / 2); g.closePath(); g.fill();
  for (let i = 0; i < 7; i++) { const q = clamp(p * 1.3 - i * 0.05);
    banknote((i - 3) * w * 0.07, -h * 0.15 - q * h * (0.35 + hash(i, 9) * 0.25), w * 0.78, (i - 3) * 0.06 * q, { value: 'F', fill: i % 2 ? '#CBB8D8' : '#D8C3C9', ink: '#4A3A5A' }); }
  // front pocket
  g.fillStyle = '#D6BF8E'; g.beginPath(); g.moveTo(-w / 2, -h / 2 + h * 0.12); g.lineTo(0, h * 0.08); g.lineTo(w / 2, -h / 2 + h * 0.12); g.lineTo(w / 2, h / 2); g.lineTo(-w / 2, h / 2); g.closePath(); g.fill();
  g.strokeStyle = 'rgba(90,70,40,0.4)'; g.lineWidth = 2 * u; g.beginPath(); g.moveTo(-w / 2, h / 2); g.lineTo(-w * 0.1, h * 0.05); g.moveTo(w / 2, h / 2); g.lineTo(w * 0.1, h * 0.05); g.stroke();
  g.fillStyle = C.red; g.beginPath(); g.arc(0, h * 0.1, w * 0.05, 0, 7); g.fill();
  g.restore();
}

// Alcatraz island silhouette on dark water; beam = lighthouse angle.
export function alcatraz(y, s, t, o = {}) {
  const { color = '#06080D', beam = true } = o;
  const x = TX;
  if (beam) { const a = -Math.PI / 2 + Math.sin(t * 0.8) * 1.2;
    g.save(); g.translate(x + 0.55 * s, y - 0.62 * s); g.rotate(a);
    const bg = g.createLinearGradient(0, 0, 900 * u, 0); bg.addColorStop(0, 'rgba(255,236,190,0.45)'); bg.addColorStop(1, 'rgba(255,236,190,0)');
    g.fillStyle = bg; g.beginPath(); g.moveTo(0, 0); g.lineTo(900 * u, -90 * u); g.lineTo(900 * u, 90 * u); g.closePath(); g.fill(); g.restore(); }
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color;
  g.beginPath(); g.moveTo(-1.3, 0); g.quadraticCurveTo(-1.1, -0.18, -0.8, -0.22); g.lineTo(-0.5, -0.3); g.quadraticCurveTo(0, -0.38, 0.5, -0.3); g.lineTo(0.9, -0.2); g.quadraticCurveTo(1.15, -0.12, 1.3, 0); g.closePath(); g.fill();
  g.fillRect(-0.55, -0.52, 0.95, 0.24); g.fillRect(-0.4, -0.58, 0.6, 0.07);          // cellhouse
  g.fillRect(-0.9, -0.36, 0.3, 0.12); g.fillRect(0.6, -0.34, 0.25, 0.12);             // outbuildings
  g.fillRect(0.5, -0.66, 0.08, 0.4); g.fillRect(0.47, -0.7, 0.14, 0.05);             // lighthouse
  g.fillStyle = '#FFE9A8'; g.beginPath(); g.arc(0.54, -0.62, 0.025, 0, 7); g.fill();
  g.fillStyle = 'rgba(255,233,168,0.6)'; for (let i = 0; i < 12; i++) g.fillRect(-0.5 + i * 0.075, -0.44, 0.02, 0.03);
  g.restore();
  // water + reflection streaks
  g.fillStyle = '#0B1220'; g.fillRect(0, y, W, H - y);
  g.strokeStyle = 'rgba(140,151,173,0.35)'; g.lineWidth = 2 * u;
  for (let i = 0; i < 26; i++) { const yy = y + 20 * u + hash(i, 41) * 500 * u, xx = (hash(i, 42) * W + t * 20 * u * (0.5 + hash(i, 43))) % W;
    g.beginPath(); g.moveTo(xx, yy); g.lineTo(xx + (40 + hash(i, 44) * 90) * u, yy); g.stroke(); }
}

// Night sea with small wave dashes from y down.
export function sea(y, t, o = {}) {
  const { color = '#0C1526' } = o;
  g.fillStyle = color; g.fillRect(0, y, W, H - y);
  g.strokeStyle = 'rgba(201,169,74,0.35)'; g.lineWidth = 2.5 * u;
  for (let i = 0; i < 40; i++) { const yy = y + 18 * u + hash(i, 51) * 560 * u, xx = ((hash(i, 52) * W - t * 30 * u) % W + W) % W;
    g.beginPath(); g.moveTo(xx, yy); g.quadraticCurveTo(xx + 25 * u, yy - 8 * u, xx + 50 * u, yy); g.stroke(); }
}

// Speech bubble with a short word.
export function bubble(str, x, y, t, o = {}) {
  const { color = C.cream, ink = C.ink, size = 40 * u } = o;
  const s = spring(t, 'playful'); if (s <= 0) return;
  g.save(); g.translate(x, y); g.scale(s, s);
  g.font = `700 ${size}px ${LATIN}`; const w = g.measureText(str).width + size * 1.1, h = size * 1.7;
  g.fillStyle = color; rrect(g, -w / 2, -h / 2, w, h, h / 2); g.fill();
  g.beginPath(); g.moveTo(-w * 0.15, h / 2 - 2); g.lineTo(-w * 0.25, h / 2 + size * 0.5); g.lineTo(-w * 0.02, h / 2 - 2); g.fill();
  text(g, str, 0, size * 0.36, { size, weight: 700, family: LATIN, color: ink });
  g.restore();
}

export default () => [
  // ---------------- Chapter 1 — the hook
  { from: bar(0), to: bar(2), cues: [[0, 'riser', 0.5], [1.6, 'impact', 1.1], [2.2, 'swish', 0.4]],
    draw(t) {
      const [sx, sy] = shake(t, 1.6, 20); g.translate(sx, sy);
      night(NAVY);
      for (let i = 0; i < 40; i++) { g.fillStyle = C.cream; g.globalAlpha = 0.2 + hash(i, 1) * 0.5; g.fillRect(hash(i, 2) * W, hash(i, 3) * 1300 * u, 2.5 * u, 2.5 * u); }
      g.globalAlpha = 1;
      g.fillStyle = '#070B14'; g.fillRect(0, 1420 * u, W, H);
      eiffel(TX, 1420 * u, 880 * u, remap(t, 0, 1.4), { color: GOLD });
      stamp('SOLD', TX, 1040 * u, t - 1.6, { size: 150 * u, rot: -0.14 });
      say('ชายคนนี้ “ขาย” หอไอเฟล', TX, 330 * u, t - 0.2, { size: 64 * u, weight: 800, color: C.cream });
      say('…ทั้งที่มันไม่ใช่ของเขา', TX, 1520 * u, t - 2.4, { size: 52 * u, weight: 800, color: GOLD });
      finish(0.8);
    } },
  { from: bar(2), to: bar(4), cues: [[0, 'whoosh', 0.5], [2.5, 'pop', 0.7]],
    draw(t) {
      paper();
      const x = track(t, [[0, W + 300 * u], [0.05, TX]], 'heavy');
      gent(x, 1330 * u, 300 * u, C.ink, { tip: spring(t - 2.5, 'playful') * (t < 4.2 ? 1 : 1 - clamp((t - 4.2) / 0.3)), step: t < 1.2 ? t * 9 : 0 });
      kicker('นักต้มตุ๋นระดับตำนาน', TX, 280 * u, t);
      say('Victor Lustig', TX, 420 * u, t - 0.15, { size: 100 * u, weight: 400, family: SERIF });
      say('เขาเรียกตัวเองว่า “ท่านเคานต์”', TX, 1460 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1], [3.0, 'type', 0.4]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 340 * u, 90 * u, 14 * u); g.fill();
      text(g, 'PARIS · 1925', 240 * u, 472 * u, { size: 28 * u, weight: 700, family: LATIN, color: C.inkSoft, tracking: 3 * u });
      eiffel(W - 230 * u, 1540 * u, 1000 * u, 1, { color: C.ink, alpha: 0.1 });
      g.restore();
      say('ชายผู้ขายหอไอเฟล', TX, 760 * u, t - 0.25, { size: 76 * u, weight: 800 });
      stamp('SOLD', TX, 1080 * u, t - 2.5, { size: 170 * u, rot: -0.12 });
      say('และยังหลอกได้แม้แต่ Al Capone\n(ตามเรื่องที่เล่ากันมา)', TX, 1360 * u, t - 3.0, { size: 44 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------- Chapter 2 — who he was
  { from: bar(6), to: bar(8), cues: Array.from({ length: 5 }, (_, i) => [i * 0.15, 'tick', 0.6]).concat([[1.2, 'thump', 0.6], [2.5, 'pop', 0.5]]),
    draw(t) {
      paper(); kicker('จุดเริ่มต้น · 4 มกราคม', TX, 400 * u, t);
      const ys = ['1886', '1887', '1888', '1889', '1890'];
      flip(TX, 720 * u, 620 * u, 340 * u, ys, ys.map((_, i) => i * 0.15), t, { size: 250 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('เกิดที่เมือง Hostinné', TX, 1060 * u, t - 1.2, { size: 60 * u, weight: 800 });
      say('จักรวรรดิออสเตรีย-ฮังการี\n(ปัจจุบันอยู่ในสาธารณรัฐเช็ก)', TX, 1190 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(8), to: bar(11), cues: [[0.2, 'whoosh', 0.5], [1.5, 'pop', 0.4], [2.1, 'pop', 0.4], [2.7, 'pop', 0.4], [3.3, 'pop', 0.4], [5.0, 'thump', 0.6]],
    draw(t) {
      night(NAVY);
      g.fillStyle = '#E8DFC6'; g.beginPath(); g.arc(800 * u, 640 * u, 50 * u, 0, 7); g.fill();
      sea(1180 * u, t);
      liner(-150 * u + remap(t, 0, 7.5) * 760 * u + 200 * u, 1180 * u, 300 * u, { smoke: 1 });
      [['Bonjour', 250, 760], ['Guten Tag', 640, 820], ['Hello', 330, 930], ['Ciao', 760, 960], ['Dobrý den', 520, 690]].forEach(([w, x, y], i) => bubble(w, x * u, y * u, t - 1.5 - i * 0.6, { size: 34 * u }));
      kicker('ก่อนจะเป็น “ท่านเคานต์”', TX, 270 * u, t, { color: GOLD });
      say('พูดได้หลายภาษา\nแต่งตัวเป็นผู้ดีมีฐานะ', TX, 380 * u, t - 0.2, { size: 52 * u, weight: 800, color: C.cream });
      say('ตระเวนหลอกผู้โดยสารร่ำรวย\nบนเรือเดินสมุทรข้ามแอตแลนติก', TX, 1380 * u, t - 5.0, { size: 44 * u, weight: 800, color: GOLD });
      finish(0.8);
    } },
  { from: bar(11), to: bar(14), cues: Array.from({ length: 6 }, (_, i) => [1.2 + i * 0.2, 'tick', 0.5]).concat([[2.6, 'swish', 0.6], [5.0, 'pop', 0.6]]),
    draw(t) {
      paper();
      const cr = clamp(remap(t, 1.2, 2.6)) * Math.PI * 4 + clamp(remap(t, 4.0, 5.0)) * Math.PI * 2;
      const bill = t < 4.8 ? remap(t, 2.4, 3.4) : remap(t, 4.8, 5.6);
      moneybox(TX, 870 * u, 260 * u, { crank: cr, bill });
      if (t > 4.8) banknote(TX + 300 * u * clamp(spring(t - 4.8, 'default')), 1170 * u, 286 * u, 0.12, { value: '100', fill: '#D2DCBE', ink: '#2E4A30' });
      kicker('สินค้าเด็ด', TX, 280 * u, t);
      say('“กล่องพิมพ์เงิน” (Rumanian Box)', TX, 390 * u, t - 0.15, { size: 54 * u, weight: 800 });
      say('ใส่กระดาษเปล่า หมุนก้าน…\nได้ธนบัตร $100 ออกมาจริง ๆ', TX, 1330 * u, t - 3.2, { size: 48 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(14), to: bar(16), cues: [[0.2, 'click', 0.6], [2.5, 'impact', 0.9]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 14); g.translate(sx, sy);
      paper();
      moneybox(TX, 820 * u, 260 * u, { crank: 0, xray: clamp((t - 0.3) / 0.4) });
      stamp('FAKE', TX + 160 * u, 1010 * u, t - 2.5, { size: 110 * u, rot: -0.12 });
      kicker('ความจริงคือ', TX, 300 * u, t);
      say('ข้างในซ่อนธนบัตรจริงไว้แค่ไม่กี่ใบ', TX, 420 * u, t - 0.3, { size: 50 * u, weight: 800 });
      say('เหยื่อจ่ายเงินก้อนโต ซื้อกล่องธรรมดาใบหนึ่ง\nกว่าจะรู้ตัว เขาหายไปแล้ว', TX, 1260 * u, t - 2.8, { size: 42 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- Chapter 3 — Paris, 1925
  { from: bar(16), to: bar(19), cues: [[0.1, 'whoosh', 0.6], [0.6, 'thump', 0.6], [2.5, 'click', 0.6], [5.0, 'pop', 0.5]],
    draw(t) {
      paper();
      const s = spring(t - 0.1, 'heavy');
      newspaper(TX, 810 * u + (1 - s) * 1200 * u, 760 * u, 820 * u, { rot: -0.03 + (1 - s) * 0.3 });
      // red marker loop around the headline
      const p = clamp((t - 2.5) / 0.6);
      if (p > 0) { g.save(); g.translate(TX, 810 * u - 410 * u + 760 * u * 0.27); g.rotate(-0.05); g.strokeStyle = C.red; g.lineWidth = 7 * u; g.lineCap = 'round';
        g.beginPath(); g.ellipse(0, 0, 360 * u, 70 * u, 0, -Math.PI / 2, -Math.PI / 2 + p * Math.PI * 2.1); g.stroke(); g.restore(); }
      kicker('ปารีส · ปี 1925', TX, 300 * u, t);
      say('หนังสือพิมพ์ลงข่าวว่า\nหอไอเฟลทรุดโทรม ค่าดูแลแพงลิบ', TX, 1330 * u, t - 2.5, { size: 48 * u, weight: 800 });
      say('Lustig อ่านแล้ว… ปิ๊งไอเดีย', TX, 1510 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(19), to: bar(22), cues: [[0.2, 'swish', 0.5], [2.5, 'pop', 0.6], [5.0, 'click', 0.7]],
    draw(t) {
      paper();
      eiffel(TX, 1300 * u, 720 * u, 1, { color: C.ink });
      // "cut here" lines across the tower
      if (t > 5.0) { g.save(); g.strokeStyle = C.red; g.lineWidth = 5 * u; g.setLineDash([22 * u, 14 * u]);
        [0.19, 0.38, 0.62].forEach((f, i) => { const p = clamp((t - 5.0 - i * 0.25) / 0.4); const yy = 1300 * u - f * 720 * u - 20 * u;
          g.beginPath(); g.moveTo(TX - 320 * u, yy); g.lineTo(TX - 320 * u + 640 * u * p, yy); g.stroke(); });
        g.restore(); }
      // 20-year bracket
      const bp = clamp(spring(t - 2.5, 'snappy'));
      if (bp > 0) { g.save(); g.globalAlpha = clamp(bp); g.fillStyle = C.red; rrect(g, TX + 190 * u, 840 * u, 210 * u, 120 * u, 14 * u); g.fill();
        text(g, '20 ปี', TX + 295 * u, 922 * u, { size: 62 * u, weight: 800, family: THAI, color: C.paper }); g.restore(); }
      kicker('เกร็ดที่คนไม่ค่อยรู้', TX, 290 * u, t);
      say('หอไอเฟลสร้างเพื่องานเอ็กซ์โปปี 1889', TX, 400 * u, t - 0.2, { size: 48 * u, weight: 800 });
      say('เดิมได้รับอนุญาตให้ตั้งอยู่แค่ 20 ปี', TX, 1390 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.red });
      say('ข่าว “รื้อขายเป็นเศษเหล็ก” จึงฟังดูเป็นไปได้', TX, 1495 * u, t - 5.0, { size: 42 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------- Chapter 4 — the con
  { from: bar(22), to: bar(25), cues: [[0.2, 'type', 0.6], [1.2, 'type', 0.5], [2.0, 'type', 0.5], [3.4, 'swish', 0.4], [3.75, 'thump', 0.6]],
    draw(t) {
      night('#1C1510');
      g.fillStyle = '#2A1F17'; for (let i = 0; i < 12; i++) g.fillRect(0, 560 * u + i * 90 * u, W, 3 * u);
      letterhead(TX, 880 * u, 560 * u, t - 0.2);
      kicker('ขั้นที่ 1 · ปลอมตัว', TX, 270 * u, t, { color: GOLD });
      say('ทำกระดาษหัวจดหมายราชการปลอม', TX, 380 * u, t - 0.2, { size: 52 * u, weight: 800, color: C.cream });
      g.fillStyle = 'rgba(28,21,16,0.85)'; if (t > 3.6) g.fillRect(0, 1270 * u, W, 300 * u);
      say('อ้างตัวเป็นรองผู้อำนวยการใหญ่\nกระทรวงไปรษณีย์และโทรเลข', TX, 1360 * u, t - 3.75, { size: 48 * u, weight: 800, color: GOLD });
      finish(0.8);
    } },
  { from: bar(25), to: bar(28), cues: [[0.2, 'chime', 0.5], ...Array.from({ length: 6 }, (_, i) => [1.2 + i * 0.25, 'pop', 0.35]), [5.0, 'thump', 0.6]],
    draw(t) {
      lobby(t, { floor: 1180 * u });
      // long table with dealers
      for (let i = 0; i < 6; i++) { const s = spring(t - 1.2 - i * 0.25, 'snappy'); if (s <= 0) continue; person(170 * u + i * 150 * u, 1160 * u, 64 * u * s, '#120A0A'); }
      gent(TX, 1280 * u, 170 * u, '#0A0606', { cane: false, shirt: '#E8DFC6' });
      g.fillStyle = '#4A2A1E'; g.fillRect(90 * u, 1150 * u, W - 180 * u, 34 * u); g.fillStyle = '#2E1A12'; g.fillRect(110 * u, 1184 * u, W - 220 * u, 90 * u);
      g.fillStyle = 'rgba(24,10,12,0.86)'; g.fillRect(0, 190 * u, W, 300 * u);
      kicker('Hôtel de Crillon · ปารีส', TX, 280 * u, t, { color: GOLD });
      say('เชิญพ่อค้าเศษเหล็กรายใหญ่มาประชุมลับ', TX, 400 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      g.fillStyle = 'rgba(24,10,12,0.86)'; if (t > 4.8) g.fillRect(0, 1300 * u, W, 270 * u);
      say('บอกว่ารัฐจะรื้อหอไอเฟลขายเป็นเศษเหล็ก\nและต้องเก็บเรื่องนี้เป็นความลับ', TX, 1400 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.cream });
      finish(0.7);
    } },
  { from: bar(28), to: bar(30), cues: [[0.2, 'thump', 0.6], [1.25, 'pop', 0.7]],
    draw(t) {
      paper();
      for (let i = 0; i < 6; i++) { const hit = i === 3 && t > 1.25; person(150 * u + i * 150 * u, 1080 * u, 80 * u, hit ? C.red : C.paper3); }
      if (t > 1.25) { const s = spring(t - 1.25, 'playful'); g.save(); g.strokeStyle = C.red; g.lineWidth = 6 * u; g.beginPath(); g.arc(600 * u, 1000 * u, 140 * u * s, 0, 7); g.stroke(); g.restore(); }
      kicker('ขั้นที่ 2 · เลือกเหยื่อ', TX, 300 * u, t);
      say('André Poisson', TX, 470 * u, t - 1.25, { size: 92 * u, weight: 400, family: SERIF, color: C.red });
      say('นักธุรกิจที่อยากเป็นที่ยอมรับ\nในสังคมชั้นสูงของปารีส', TX, 1260 * u, t - 2.2, { size: 48 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(30), to: bar(32), cues: [[0.2, 'thump', 0.5], [1.5, 'swish', 0.6], [3.0, 'pop', 0.6]],
    draw(t) {
      paper();
      person(260 * u, 1080 * u, 110 * u, C.red); gent(800 * u, 1250 * u, 190 * u, C.ink, { cane: false });
      g.fillStyle = '#6B4E36'; g.fillRect(120 * u, 1090 * u, W - 240 * u, 26 * u);
      // an envelope slides under the table
      const ex = track(t, [[0, 260 * u], [1.5, 760 * u]], 'default');
      if (t > 1.3) envelope(ex, 1170 * u, 150 * u, 0, 0);
      say('Poisson เริ่มสงสัย…', TX, 360 * u, t - 0.1, { size: 56 * u, weight: 800 });
      say('Lustig เลยแอบ “ขอสินบน”', TX, 480 * u, t - 1.3, { size: 56 * u, weight: 800, color: C.red });
      say('ข้าราชการที่ขอเงินใต้โต๊ะ\nต้องเป็นข้าราชการตัวจริงแน่ ๆ', TX, 1310 * u, t - 3.0, { size: 46 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
];
