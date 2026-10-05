// Great Train Robbery 1963 — Act 1: 0:00–0:45 (bars 0–18). Props for both acts live at the top.
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, map, forest } from './kit.js';

// ---------------------------------------------------------------- palette
export const LOCO = '#2F5A3C', LOCO2 = '#21412B', MAROON = '#6A1F22', MAROON2 = '#4E1618', LAMP = '#F2C76B';
export const SKY = '#0A1220', SKY2 = '#1A2840', CANVAS = '#B9A57E', CANVAS2 = '#8E7C58';
const INTER = 'Inter, sans-serif';

// ---------------------------------------------------------------- night railway
// Sky, stars, moon, tree line, ballast, rail, sleepers and telegraph poles. scroll moves the trackside by px.
export function railway(t, o = {}) {
  const { railY = 1250 * u, scroll = 0, moon = true, poles = true, ground = '#0C1510' } = o;
  const gr = g.createLinearGradient(0, 0, 0, railY);
  gr.addColorStop(0, SKY); gr.addColorStop(1, SKY2);
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 80; i++) {
    const x = hash(i, 31) * W, y = hash(i, 32) * (railY - 300 * u);
    g.globalAlpha = 0.25 + 0.5 * Math.abs(Math.sin(t * 1.3 + i * 2.7)) * hash(i, 33);
    g.fillStyle = '#DDE6F2'; g.beginPath(); g.arc(x, y, (1 + hash(i, 34) * 2) * u, 0, 7); g.fill();
  }
  g.globalAlpha = 1;
  if (moon) { g.fillStyle = '#E8E2C8'; g.beginPath(); g.arc(860 * u, 640 * u, 46 * u, 0, 7); g.fill();
    g.fillStyle = SKY2; g.globalAlpha = 0.95; g.beginPath(); g.arc(842 * u, 628 * u, 42 * u, 0, 7); g.fill(); g.globalAlpha = 1; }
  // distant hills + tree line
  g.fillStyle = '#121C2A'; g.beginPath(); g.moveTo(0, railY - 140 * u);
  for (let x = 0; x <= W + 40 * u; x += 40 * u) g.lineTo(x, railY - 160 * u - (noise(x / (300 * u), 4) + 1) * 60 * u);
  g.lineTo(W, railY); g.lineTo(0, railY); g.fill();
  forest(railY - 60 * u, { color: '#0A1410', seed: 6, h: 120 });
  // embankment + ballast + rail
  g.fillStyle = ground; g.fillRect(0, railY + 30 * u, W, H - railY);
  g.fillStyle = '#23262C'; g.beginPath(); g.moveTo(-20 * u, railY + 40 * u); g.lineTo(0, railY - 6 * u); g.lineTo(W, railY - 6 * u); g.lineTo(W + 20 * u, railY + 40 * u); g.fill();
  const off = ((scroll % (60 * u)) + 60 * u) % (60 * u);
  g.fillStyle = '#3A2C22'; for (let x = -off; x < W; x += 60 * u) g.fillRect(x, railY - 2 * u, 34 * u, 12 * u);
  g.fillStyle = '#9AA3B2'; g.fillRect(0, railY - 9 * u, W, 7 * u);
  if (poles) {
    const po = ((scroll % (520 * u)) + 520 * u) % (520 * u);
    g.strokeStyle = '#05080C'; g.lineWidth = 9 * u;
    const xs = []; for (let x = -po - 520 * u; x < W + 520 * u; x += 520 * u) xs.push(x + 260 * u);
    for (const x of xs) { g.beginPath(); g.moveTo(x, railY + 30 * u); g.lineTo(x, railY - 420 * u); g.stroke();
      g.fillRect(x - 40 * u, railY - 400 * u, 80 * u, 8 * u); }
    g.lineWidth = 2 * u; g.strokeStyle = 'rgba(5,8,12,0.9)';
    for (let k = 0; k < xs.length - 1; k++) for (const dy of [-404, -396]) { g.beginPath(); g.moveTo(xs[k] - 30 * u, railY + dy * u); g.quadraticCurveTo((xs[k] + xs[k + 1]) / 2, railY + (dy + 40) * u, xs[k + 1] - 30 * u, railY + dy * u); g.stroke(); }
  }
}

// ---------------------------------------------------------------- rolling stock (side view, nose to the left, y = rail)
// English Electric Type 4 diesel (simplified). 1 unit = s px, body spans x … x + 2s.
export function loco(x, y, s, o = {}) {
  const { lamp = 1, cab = 1, color = LOCO } = o;
  g.save(); g.translate(x + s, y); g.scale(s, s);
  if (lamp > 0) { const gr = g.createLinearGradient(-1, 0, -2.4, 0); gr.addColorStop(0, `rgba(255,236,190,${0.35 * lamp})`); gr.addColorStop(1, 'rgba(255,236,190,0)');
    g.fillStyle = gr; g.beginPath(); g.moveTo(-0.98, -0.13); g.lineTo(-2.6, -0.3); g.lineTo(-2.6, 0.05); g.closePath(); g.fill(); }
  g.fillStyle = color; g.beginPath();
  g.moveTo(-1.0, -0.06); g.lineTo(-1.0, -0.19); g.quadraticCurveTo(-0.99, -0.25, -0.92, -0.255); g.lineTo(-0.86, -0.255);
  g.lineTo(-0.82, -0.37); g.lineTo(0.82, -0.37); g.lineTo(0.86, -0.255); g.lineTo(0.92, -0.255); g.quadraticCurveTo(0.99, -0.25, 1.0, -0.19); g.lineTo(1.0, -0.06); g.closePath(); g.fill();
  g.fillStyle = LOCO2; g.fillRect(-0.82, -0.4, 1.64, 0.035);
  g.fillStyle = '#D9C9A0'; g.fillRect(-0.98, -0.125, 1.96, 0.012);                         // waist stripe
  g.fillStyle = cab ? LAMP : '#1A2A20'; g.fillRect(-0.8, -0.345, 0.07, 0.06); g.fillRect(0.73, -0.345, 0.07, 0.06);
  g.fillStyle = '#1A2A20'; for (let i = 0; i < 7; i++) g.fillRect(-0.55 + i * 0.16, -0.33, 0.09, 0.05); // grilles
  g.fillStyle = '#F5F0DC'; g.beginPath(); g.arc(-0.985, -0.14, 0.018, 0, 7); g.fill();
  g.fillStyle = '#0E1116'; g.fillRect(-0.8, -0.065, 0.48, 0.04); g.fillRect(0.32, -0.065, 0.48, 0.04);
  for (const wx of [-0.74, -0.56, -0.38, 0.38, 0.56, 0.74]) { g.beginPath(); g.arc(wx, -0.02, 0.05, 0, 7); g.fill(); }
  g.fillRect(-1.03, -0.08, 0.03, 0.03); g.fillRect(1.0, -0.08, 0.03, 0.03);
  g.restore();
}
// Mail coach, 1.6 units long, starting at x. hi = outline in red (the high-value coach).
export function coach(x, y, s, o = {}) {
  const { hi = 0, lit = 1, color = MAROON } = o;
  g.save(); g.translate(x + 0.8 * s, y); g.scale(s, s);
  g.fillStyle = color; rrect(g, -0.8, -0.36, 1.6, 0.3, 0.03); g.fill();
  g.fillStyle = '#5A5F68'; g.beginPath(); g.ellipse(0, -0.36, 0.8, 0.035, 0, Math.PI, 0); g.fill();
  g.fillStyle = MAROON2; for (const dx of [-0.62, 0.52]) g.fillRect(dx, -0.33, 0.1, 0.25);
  for (let i = 0; i < 5; i++) { g.fillStyle = lit ? `rgba(242,199,107,${0.55 + 0.4 * hash(i, Math.floor(x))})` : '#2A1416'; g.fillRect(-0.4 + i * 0.17, -0.3, 0.1, 0.07); }
  g.fillStyle = '#0E1116'; g.fillRect(-0.7, -0.065, 0.36, 0.04); g.fillRect(0.34, -0.065, 0.36, 0.04);
  for (const wx of [-0.62, -0.42, 0.42, 0.62]) { g.beginPath(); g.arc(wx, -0.02, 0.045, 0, 7); g.fill(); }
  if (hi > 0) { g.strokeStyle = C.red; g.lineWidth = 0.02; g.globalAlpha = clamp(hi); rrect(g, -0.84, -0.42, 1.68, 0.42, 0.04); g.stroke(); }
  g.restore();
}
// Loco + n coaches. split = index of first coach left behind; gap = px pulled apart there. Returns the x of each car.
export function train(x, y, s, n, o = {}) {
  const { split = -1, gap = 0, hi = -1, hiA = 1, lamp = 1, dark = null } = o;
  loco(x, y, s, dark ? { lamp, color: dark, cab: 0 } : { lamp });
  const xs = [];
  for (let i = 0; i < n; i++) { const cx = x + s * (2.04 + i * 1.64) + (split >= 0 && i >= split ? gap : 0); xs.push(cx);
    if (cx > W + 20 * u) break; coach(cx, y, s, dark ? { color: dark, lit: 0 } : { hi: i === hi ? hiA : 0 }); }
  return xs;
}

// ---------------------------------------------------------------- signal, glove, battery
// Colour-light signal head (green above red). y = top of the head. glove 0..1 slides over the green lamp.
export function glove(x, y, s, rot = 0) {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); g.fillStyle = '#6B4A30';
  rrect(g, -0.5, -0.1, 1.0, 0.75, 0.22); g.fill();
  for (let i = 0; i < 4; i++) { rrect(g, -0.46 + i * 0.245, -0.62 + Math.abs(i - 1.5) * 0.08, 0.2, 0.62, 0.1); g.fill(); }
  g.save(); g.translate(0.5, 0.2); g.rotate(-0.7); rrect(g, -0.08, -0.38, 0.2, 0.46, 0.1); g.fill(); g.restore();
  g.fillStyle = '#4E3522'; g.fillRect(-0.5, 0.5, 1.0, 0.16);
  g.strokeStyle = 'rgba(0,0,0,0.25)'; g.lineWidth = 0.02; for (let i = 1; i < 4; i++) { g.beginPath(); g.moveTo(-0.5 + i * 0.245, -0.05); g.lineTo(-0.5 + i * 0.245, 0.3); g.stroke(); }
  g.restore();
}
export function signalHead(x, y, s, o = {}) {
  const { green = 1, red = 0, glove: gv = 0, post = 1, battery = 0 } = o;
  if (post) { g.fillStyle = '#4C525C'; g.fillRect(x - 0.06 * s, y + 0.9 * s, 0.12 * s, 2.4 * s); }
  g.fillStyle = '#0B0D10'; rrect(g, x - 0.3 * s, y, 0.6 * s, 1.0 * s, 0.08 * s); g.fill();
  const lamp = (cy, col, on) => {
    if (on > 0) { const gr = g.createRadialGradient(x, cy, 0, x, cy, 0.6 * s); gr.addColorStop(0, col.replace('A', 0.55 * on)); gr.addColorStop(1, col.replace('A', 0));
      g.fillStyle = gr; g.beginPath(); g.arc(x, cy, 0.6 * s, 0, 7); g.fill(); }
    g.fillStyle = on > 0 ? col.replace('A', 0.35 + 0.65 * on) : '#1E2228'; g.beginPath(); g.arc(x, cy, 0.15 * s, 0, 7); g.fill();
    g.fillStyle = '#16191E'; g.beginPath(); g.ellipse(x, cy - 0.16 * s, 0.22 * s, 0.07 * s, 0, Math.PI, 0); g.fill();
  };
  lamp(y + 0.28 * s, 'rgba(90,230,140,A)', green);
  lamp(y + 0.72 * s, 'rgba(255,70,50,A)', red);
  if (battery > 0) {
    const bx = x + 0.9 * s, by = y + 2.6 * s, p = clamp(battery);
    g.fillStyle = '#2B2F36'; rrect(g, bx - 0.32 * s, by, 0.64 * s, 0.45 * s, 0.04 * s); g.fill();
    g.fillStyle = '#C8A440'; g.fillRect(bx - 0.32 * s, by + 0.12 * s, 0.64 * s, 0.1 * s);
    text(g, '6V', bx, by + 0.4 * s, { size: 0.16 * s, weight: 800, family: INTER, color: '#E6E0D0' });
    g.strokeStyle = C.red; g.lineWidth = 0.035 * s; g.lineCap = 'round'; g.beginPath(); g.moveTo(bx - 0.18 * s, by);
    const ex = x + 0.3 * s, ey = y + 0.72 * s, mx = bx - 0.1 * s, my = y + 1.4 * s;
    for (let k = 1; k <= 20; k++) { const q = (k / 20) * p, a = 1 - q; g.lineTo(a * a * (bx - 0.18 * s) + 2 * a * q * mx + q * q * ex, a * a * by + 2 * a * q * my + q * q * ey); }
    g.stroke();
  }
  if (gv > 0) glove(x + (1 - gv) * 1.6 * s, y + 0.34 * s, 0.42 * s, -0.15 + (1 - gv) * 0.4);
}

// ---------------------------------------------------------------- people, bags, money
// Full-body silhouette standing at (x, y = feet). lift 0..1 raises the arms; lean in radians.
export function robber(x, y, s, o = {}) {
  const { color = '#05070A', lift = 0, lean = 0, bag = 0, step = 0 } = o;
  g.save(); g.translate(x, y); g.rotate(lean); g.scale(s, s);
  g.fillStyle = color; g.strokeStyle = color; g.lineCap = 'round';
  g.lineWidth = 0.17; for (const sd of [-1, 1]) { g.beginPath(); g.moveTo(sd * 0.1, -0.85); g.lineTo(sd * 0.16 + sd * step * 0.12, 0); g.stroke(); }
  g.beginPath(); g.moveTo(-0.26, -1.42); g.lineTo(0.26, -1.42); g.lineTo(0.2, -0.78); g.lineTo(-0.2, -0.78); g.closePath(); g.fill();
  g.beginPath(); g.arc(0, -1.62, 0.15, 0, 7); g.fill();
  g.lineWidth = 0.12;
  const hy = -1.35 - lift * 0.6, hx = 0.32 - lift * 0.12;
  for (const sd of [-1, 1]) { g.beginPath(); g.moveTo(sd * 0.22, -1.36); g.lineTo(sd * hx, hy); g.stroke(); }
  g.restore();
  if (bag > 0) mailbag(x + Math.sin(lean) * -1.9 * s, y - (1.4 + lift * 0.75) * s, s * 0.55, lean * 0.6);
}
export function mailbag(x, y, s, rot = 0, o = {}) {
  const { fill = CANVAS } = o;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  g.fillStyle = fill; g.beginPath(); g.moveTo(-0.22, -0.42); g.quadraticCurveTo(-0.48, -0.1, -0.44, 0.24); g.quadraticCurveTo(0, 0.42, 0.44, 0.24);
  g.quadraticCurveTo(0.48, -0.1, 0.22, -0.42); g.closePath(); g.fill();
  g.fillStyle = CANVAS2; g.fillRect(-0.24, -0.47, 0.48, 0.08);
  g.beginPath(); g.moveTo(-0.12, -0.47); g.lineTo(0, -0.62); g.lineTo(0.12, -0.47); g.fill();
  g.fillStyle = 'rgba(0,0,0,0.18)'; g.fillRect(-0.3, 0.0, 0.6, 0.05);
  g.restore();
}
// A pre-decimal pound note (generic): green £1 or blue £5.
export function quid(x, y, w, rot = 0, five = false) {
  const h = w * 0.5;
  g.save(); g.translate(x, y); g.rotate(rot);
  g.fillStyle = five ? '#7FA0C8' : '#8FB58A'; rrect(g, -w / 2, -h / 2, w, h, w * 0.03); g.fill();
  g.strokeStyle = five ? '#2C4466' : '#2E4A2C'; g.lineWidth = w * 0.015; rrect(g, -w * 0.44, -h * 0.38, w * 0.88, h * 0.76, w * 0.03); g.stroke();
  g.beginPath(); g.ellipse(w * 0.18, 0, w * 0.12, h * 0.26, 0, 0, 7); g.stroke();
  text(g, five ? '£5' : '£1', -w * 0.22, h * 0.14, { size: h * 0.42, weight: 400, family: SERIF, color: five ? '#2C4466' : '#2E4A2C' });
  g.restore();
}
// Ex-army lorry, cab to the left. y = ground.
export function lorry(x, y, s, o = {}) {
  const { lights = 1, color = '#3E4632' } = o;
  g.save(); g.translate(x, y); g.scale(s, s);
  if (lights > 0) { const gr = g.createLinearGradient(-0.6, 0, -2.0, 0); gr.addColorStop(0, `rgba(255,236,190,${0.4 * lights})`); gr.addColorStop(1, 'rgba(255,236,190,0)');
    g.fillStyle = gr; g.beginPath(); g.moveTo(-0.6, -0.3); g.lineTo(-2.0, -0.45); g.lineTo(-2.0, -0.05); g.closePath(); g.fill(); }
  g.fillStyle = color; rrect(g, -0.6, -0.62, 0.42, 0.5, 0.05); g.fill();
  g.fillStyle = '#58604A'; g.beginPath(); g.moveTo(-0.14, -0.12); g.lineTo(-0.14, -0.72); g.quadraticCurveTo(0.4, -0.86, 0.95, -0.72); g.lineTo(0.95, -0.12); g.fill();
  g.fillStyle = '#9CB0C4'; g.fillRect(-0.55, -0.56, 0.18, 0.16);
  g.fillStyle = '#0E1116'; g.fillRect(-0.62, -0.14, 1.6, 0.06);
  for (const wx of [-0.42, 0.4, 0.75]) { g.beginPath(); g.arc(wx, -0.06, 0.1, 0, 7); g.fill(); }
  g.fillStyle = '#F5F0DC'; g.beginPath(); g.arc(-0.6, -0.3, 0.03, 0, 7); g.fill();
  g.restore();
}

// ---------------------------------------------------------------- maps
const GB = [[58.64, -3.07], [57.7, -1.8], [56.5, -2.6], [56.0, -2.5], [55.0, -1.4], [54.5, -0.6], [53.6, 0.1], [53.0, 0.3], [52.95, 0.9],
  [52.9, 1.7], [52.5, 1.75], [51.95, 1.3], [51.5, 0.6], [51.4, 1.4], [51.1, 1.35], [50.75, 0.2], [50.75, -1.0], [50.6, -2.0], [50.65, -3.4],
  [50.2, -4.2], [49.97, -5.2], [50.07, -5.7], [50.6, -4.6], [51.2, -4.2], [51.4, -3.2], [51.6, -3.9], [51.7, -5.2], [52.1, -4.7], [52.6, -4.1],
  [52.8, -4.7], [53.3, -4.6], [53.3, -3.3], [53.5, -3.0], [54.0, -3.0], [54.5, -3.6], [54.9, -3.4], [54.7, -4.8], [55.0, -5.1], [55.5, -4.7],
  [55.9, -4.9], [55.3, -5.6], [56.4, -5.5], [57.0, -5.8], [57.6, -5.8], [58.2, -5.3], [58.6, -5.0], [58.6, -4.0]];
const IRL = [[55.3, -7.3], [54.6, -5.5], [53.9, -6.2], [53.3, -6.1], [52.2, -6.3], [51.6, -8.5], [51.5, -9.8], [52.1, -10.4], [53.3, -9.9], [54.3, -10.0], [55.2, -8.2]];
export const PL = { glasgow: [55.86, -4.25], carlisle: [54.89, -2.93], crewe: [53.09, -2.44], rugby: [52.37, -1.26], bletchley: [52.0, -0.73],
  bridego: [51.88, -0.68], london: [51.53, -0.13], farm: [51.8, -1.05] };
export const ROUTE = [PL.glasgow, PL.carlisle, PL.crewe, PL.rugby, PL.bletchley, PL.bridego, PL.london];
export const mapUK = (cam, o = {}) => map(cam, { lands: [GB, IRL], grid: 2, ...o });
const BRAZIL = [[5.2, -60.2], [4.4, -51.6], [1.8, -50.0], [-0.1, -49.3], [-1.3, -46.0], [-2.5, -44.3], [-2.8, -40.0], [-3.7, -38.5], [-5.1, -35.5],
  [-8.0, -34.9], [-10.5, -36.4], [-13.0, -38.5], [-17.9, -39.3], [-20.3, -40.3], [-22.9, -42.0], [-23.0, -43.2], [-24.0, -46.4], [-25.9, -48.6],
  [-28.5, -48.8], [-30.0, -50.3], [-33.7, -53.4], [-30.2, -57.6], [-27.3, -55.7], [-25.6, -54.6], [-22.0, -57.9], [-19.9, -58.1], [-16.3, -60.0],
  [-13.6, -61.0], [-11.0, -65.3], [-9.8, -66.7], [-10.9, -70.6], [-9.4, -73.0], [-4.3, -69.9], [-1.1, -69.5], [1.7, -69.8], [1.2, -66.8], [2.2, -64.2], [4.0, -64.6]];
export const RIO = [-22.9, -43.2];
export const mapBrazil = (cam, o = {}) => map(cam, { lands: [BRAZIL], grid: 5, ...o });

export const pounds = (n) => '£' + Math.round(n).toLocaleString('en-GB');

export default () => [
  // ---------------- hook: the mail train brakes at a red light
  { from: bar(0), to: bar(2), cues: [[0, 'whoosh', 0.7], [0.6, 'click', 0.8], [2.3, 'impact', 1.1], [3.2, 'type', 0.4]],
    draw(t) {
      const [sx, sy] = shake(t, 2.3, 18); g.translate(sx, sy);
      const p = clamp(t / 2.3), e = 1 - (1 - p) * (1 - p);
      railway(t, { railY: 1220 * u, scroll: -e * 1600 * u });
      signalHead(70 * u, 820 * u, 130 * u, { green: t < 0.6 ? 1 : 0, red: t < 0.6 ? 0 : 1 });
      train(W + 200 * u - e * (W + 30 * u), 1220 * u, 360 * u, 4, { lamp: 1 });
      g.fillStyle = 'rgba(10,18,32,0.82)'; g.fillRect(0, 200 * u, W, 330 * u); g.fillRect(0, 1360 * u, W, 230 * u);
      big('£2.6 ล้าน', TX, 410 * u, t - 0.1, { size: 170 * u, color: C.red });
      say('ปล้นรถไฟไปรษณีย์กลางดึก\nในเวลาราวครึ่งชั่วโมง', TX, 1440 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(2), to: bar(4), cues: Array.from({ length: 10 }, (_, i) => [0.2 + i * 0.18, 'thump', 0.3]).concat([[2.5, 'thump', 0.6]]),
    draw(t) {
      night(SKY);
      for (let i = 0; i < 36; i++) { const at = 0.1 + i * 0.06, s = spring(t - at, 'heavy'); if (s <= 0) continue;
        const c = i % 7, r = Math.floor(i / 7);
        mailbag(TX - 360 * u + c * 120 * u + (r % 2) * 55 * u, 1180 * u - r * 95 * u - (1 - s) * 900 * u, 125 * u, (hash(i, 8) - 0.5) * 0.5); }
      kicker('ราว', TX, 300 * u, t - 0.2, { color: C.red });
      big('120', TX, 540 * u, t - 0.3, { size: 240 * u, color: C.cream });
      say('กระสอบไปรษณีย์', TX, 660 * u, t - 0.8, { size: 54 * u, weight: 800, color: C.cream });
      g.fillStyle = 'rgba(10,18,32,0.8)'; g.fillRect(0, 1290 * u, W, 280 * u);
      say('อัดแน่นด้วยธนบัตรใช้แล้ว', TX, 1380 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.cream });
      say('ระหว่างทางไปลอนดอน', TX, 1480 * u, t - 3.2, { size: 46 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1], [3.2, 'type', 0.4]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 470 * u, 90 * u, 14 * u); g.fill();
      text(g, 'BUCKINGHAMSHIRE · 08.08.1963', 305 * u, 472 * u, { size: 26 * u, weight: 700, family: INTER, color: C.inkSoft, tracking: 2 * u });
      g.restore();
      text(g, 'The Great Train Robbery', TX, 680 * u, { size: 62 * u, weight: 400, family: SERIF, color: C.ink, alpha: clamp((t - 0.2) / 0.3) });
      say('การปล้นรถไฟครั้งใหญ่ แห่งอังกฤษ', TX, 800 * u, t - 0.4, { size: 54 * u, weight: 800 });
      stamp('ROBBED', TX, 1080 * u, t - 2.5, { size: 140 * u, rot: -0.1 });
      say('และเงินส่วนใหญ่ ไม่เคยถูกพบ', TX, 1380 * u, t - 3.2, { size: 50 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------- the route
  { from: bar(6), to: bar(9), cues: [[0.2, 'whoosh', 0.6], [0.8, 'pop', 0.6], [3.0, 'pop', 0.6], [4.6, 'impact', 0.8]],
    draw(t) {
      const cam = { lat: track(t, [[0, 53.5], [0.1, 54.6]], 'heavy'), lon: track(t, [[0, -6], [0.1, -2.6]], 'heavy'), z: track(t, [[0, 70], [0.1, 140]], 'heavy') * u };
      const P = mapUK(cam);
      const pts = ROUTE.map(P);
      const head = path(pts, remap(t, 1.0, 3.2), { color: C.red, width: 7 * u });
      if (t > 1.0) { g.fillStyle = C.cream; g.beginPath(); g.arc(head.x, head.y, 11 * u, 0, 7); g.fill(); }
      pin(...P(PL.glasgow), t - 0.8, { label: 'Glasgow', side: -1 });
      pin(...P(PL.london), t - 3.0, { label: 'London Euston', side: -1 });
      if (t > 4.6) { const [bx, by] = P(PL.bridego), s = spring(t - 4.6, 'playful');
        g.strokeStyle = C.red; g.lineWidth = 6 * u; g.beginPath(); g.arc(bx, by, 46 * u * s, 0, 7); g.stroke();
        text(g, 'จุดเกิดเหตุ', bx - 60 * u, by - 60 * u, { size: 34 * u, weight: 800, family: THAI, color: C.red, align: 'right', alpha: clamp((t - 4.8) / 0.2) }); }
      topScrim(620);
      kicker('อังกฤษ · ปี 1963', TX, 250 * u, t, { color: C.red });
      say('รถไฟไปรษณีย์สาย\nGlasgow → London', TX, 345 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.cream });
      g.fillStyle = 'rgba(10,16,28,0.82)'; if (t > 4.6) g.fillRect(0, 1480 * u, W, 120 * u);
      say('Buckinghamshire ก่อนถึงลอนดอนไม่ไกล', TX, 1550 * u, t - 4.8, { size: 40 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(9), to: bar(10), cues: Array.from({ length: 5 }, (_, i) => [i * 0.15, 'tick', 0.6]).concat([[1.0, 'thump', 0.6]]),
    draw(t) {
      paper(); kicker('สิงหาคม 1963', TX, 420 * u, t);
      const d = ['04', '05', '06', '07', '08'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.15), t, { size: 360 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('ราวตี 3 ของวันพฤหัสบดี', TX, 1240 * u, t - 1.0, { size: 56 * u, weight: 800 });
      finish(0.6);
    } },
  // ---------------- the travelling post office
  { from: bar(10), to: bar(13), cues: Array.from({ length: 12 }, (_, i) => [i * 0.625, 'tick', 0.25]).concat([[2.5, 'pop', 0.7], [5.0, 'thump', 0.6]]),
    draw(t) {
      railway(t, { railY: 1200 * u, scroll: -t * 900 * u });
      const x = -260 * u - t * 12 * u + Math.sin(t * 9) * 1.5 * u;
      const xs = train(x, 1200 * u + Math.sin(t * 13) * 1 * u, 230 * u, 5, { hi: 1, hiA: clamp((t - 2.5) / 0.3) });
      if (t > 2.5) { const cx = xs[1] + 0.8 * 230 * u, s = spring(t - 2.5, 'snappy');
        g.save(); g.translate(cx, 1050 * u); g.scale(s, s); g.fillStyle = C.red; rrect(g, -135 * u, -36 * u, 270 * u, 60 * u, 10 * u); g.fill();
        text(g, 'พัสดุมูลค่าสูง', 0, 8 * u, { size: 32 * u, weight: 800, family: THAI, color: C.cream }); g.restore(); }
      g.fillStyle = 'rgba(10,18,32,0.82)'; g.fillRect(0, 200 * u, W, 340 * u);
      kicker('Travelling Post Office', TX, 290 * u, t, { color: C.red });
      say('พนักงานคัดแยกจดหมาย\nบนรถไฟตลอดทั้งคืน', TX, 395 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      g.fillStyle = 'rgba(10,18,32,0.82)'; if (t > 5) g.fillRect(0, 1330 * u, W, 250 * u);
      say('คืนนั้นมีเงินมากเป็นพิเศษ\nหลังช่วงวันหยุดธนาคาร', TX, 1410 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- the gang
  { from: bar(13), to: bar(16), cues: Array.from({ length: 15 }, (_, i) => [0.2 + i * 0.1, 'pop', 0.25]).concat([[2.5, 'thump', 0.6], [4.0, 'type', 0.5]]),
    draw(t) {
      paper();
      kicker('แก๊งราว 15 คน', TX, 300 * u, t);
      say('นำโดย Bruce Reynolds', TX, 410 * u, t - 0.2, { size: 56 * u, weight: 800 });
      for (let i = 0; i < 15; i++) { const s = spring(t - 0.2 - i * 0.1, 'playful'); if (s <= 0) continue;
        const c = i % 5, r = Math.floor(i / 5), boss = i === 7 && t > 2.5;
        person(TX - 320 * u + c * 160 * u, 680 * u + r * 170 * u + (1 - s) * 60 * u, 60 * u * s, boss ? C.red : C.ink); }
      const names = ['Ronnie Biggs', 'Buster Edwards', 'Charlie Wilson', 'Roy James', 'Gordon Goody', 'Roger Cordrey'];
      names.forEach((n, i) => { const s = spring(t - 4.0 - i * 0.25, 'snappy'); if (s <= 0) return;
        const x = TX + (i % 2 ? 210 : -210) * u, y = 1210 * u + Math.floor(i / 2) * 100 * u;
        g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = C.paper2; rrect(g, -195 * u, -38 * u, 390 * u, 72 * u, 10 * u); g.fill();
        text(g, n, 0, 13 * u, { size: 34 * u, weight: 700, family: INTER, color: C.ink }); g.restore(); });
      say('และอีกหลายคน', TX, 1530 * u, t - 6.0, { size: 40 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------- the signal
  { from: bar(16), to: bar(18), cues: [[0.2, 'whoosh', 0.5], [1.2, 'swish', 0.6], [2.5, 'click', 0.9], [3.1, 'thump', 0.6]],
    draw(t) {
      railway(t, { railY: 1500 * u, poles: false, moon: false });
      const gv = clamp(spring(t - 1.0, 'default')), bt = remap(t, 2.5, 3.1);
      signalHead(TX + 20 * u, 590 * u, 250 * u, { green: 1 - gv * 0.97, red: t > 3.1 ? 1 : 0, glove: gv, battery: t > 2.4 ? bt + 0.001 : 0, post: 1 });
      g.fillStyle = 'rgba(10,18,32,0.82)'; g.fillRect(0, 200 * u, W, 330 * u);
      kicker('Sears Crossing · ก่อนถึงสะพาน', TX, 290 * u, t, { color: C.red });
      say('สัญญาณไฟข้างรางถูกดัดแปลง', TX, 400 * u, t - 0.2, { size: 52 * u, weight: 800, color: C.cream });
      g.fillStyle = 'rgba(10,18,32,0.82)'; if (t > 1.2) g.fillRect(0, 1400 * u, W, 190 * u);
      say('ใช้ถุงมือปิดไฟเขียว', TX, 1470 * u, t - 1.2, { size: 46 * u, weight: 800, color: C.cream });
      say('ต่อแบตเตอรี่ ให้ไฟแดงสว่างแทน', TX, 1550 * u, t - 3.1, { size: 46 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
];
