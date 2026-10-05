// Elisa Lam — Act 1: 0:00–0:45 (bars 0–18). Who she was, the trip, the hotel.
// A real young woman died here: no body imagery, no likeness (silhouettes only), no ghost framing.
// The elevator is a generic re-creation, never the real footage; it is labelled as such on screen.
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, map, measure } from './kit.js';

// ---------------------------------------------------------------- palette: downtown LA at night
export const E = { sky: '#06080E', sky2: '#151A28', bldg: '#16141A', bldg2: '#1D1A21', trim: '#2B2731', win: '#0B0A0E',
  lamp: '#E9B566', glow: '233,181,102', neon: '#E5463A', neonG: '229,70,58', cctv: '#9DB8A6', cctvG: '157,184,166', far: '#0E1119' };
const INTER = 'Inter, sans-serif';

export function sky(t, o = {}) {
  const { top = E.sky, bot = E.sky2, stars = 0 } = o;
  const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, top); gr.addColorStop(1, bot);
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  if (stars) { g.save(); g.fillStyle = C.cream; for (let i = 0; i < 40; i++) { g.globalAlpha = stars * (0.2 + 0.3 * hash(i, 71)) * (0.8 + 0.2 * noise(t + i, 3)); g.fillRect(hash(i, 72) * W, hash(i, 73) * H * 0.5, 2.5 * u, 2.5 * u); } g.restore(); }
}

// Distant LA skyline standing on `base` (px): mixed towers with a few lit windows.
export function skyline(base, t, o = {}) {
  const { seed = 12, color = E.far, lit = 0.18, hmin = 160, hvar = 520, alpha = 1 } = o;
  g.save(); g.globalAlpha = alpha;
  let x = -30 * u, i = 0;
  while (x < W + 30 * u) {
    const w = (60 + hash(i, seed) * 110) * u, h = (hmin + Math.pow(hash(i, seed + 1), 2) * hvar) * u;
    g.fillStyle = color; g.fillRect(x, base - h, w - 4 * u, h + 2);
    if (hash(i, seed + 2) > 0.8) g.fillRect(x + w * 0.45, base - h - 50 * u, 4 * u, 50 * u);          // antenna
    for (let r = 0; r < h / (22 * u) - 1; r++) for (let c = 0; c < Math.floor(w / (18 * u)); c++) {
      const k = i * 97 + r * 13 + c; if (hash(k, seed + 4) > lit) continue;
      g.fillStyle = `rgba(${E.glow},${0.35 + 0.25 * hash(k, seed + 5)})`; g.fillRect(x + 6 * u + c * 18 * u, base - h + 12 * u + r * 22 * u, 6 * u, 8 * u);
    }
    x += w; i++;
  }
  g.restore();
}

// Rooftop water tank: cylinder on a steel stand, ladder, hatch on top. Feet centre at (x, y), s ≈ height px.
export function tank(x, y, s, o = {}) {
  const { color = '#2A2E36', rim = '#434955', hatch = 0, beam = 0 } = o;
  const w = s * 0.62, top = y - s, body = s * 0.62;
  g.save();
  g.strokeStyle = '#1C1F25'; g.lineWidth = s * 0.03;               // stand
  for (const k of [-0.42, -0.14, 0.14, 0.42]) { g.beginPath(); g.moveTo(x + k * w, y); g.lineTo(x + k * w * 0.95, y - s * 0.34); g.stroke(); }
  g.beginPath(); g.moveTo(x - w * 0.45, y - s * 0.18); g.lineTo(x + w * 0.45, y - s * 0.18); g.stroke();
  g.fillStyle = color; g.fillRect(x - w / 2, y - s * 0.34 - body, w, body);          // cylinder body
  g.fillStyle = 'rgba(255,255,255,0.05)'; g.fillRect(x - w / 2 + w * 0.12, y - s * 0.34 - body, w * 0.12, body);
  g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(x + w * 0.28, y - s * 0.34 - body, w * 0.22, body);
  g.strokeStyle = rim; g.lineWidth = s * 0.012;
  for (let k = 1; k < 4; k++) { g.beginPath(); g.moveTo(x - w / 2, y - s * 0.34 - body * k / 4); g.lineTo(x + w / 2, y - s * 0.34 - body * k / 4); g.stroke(); }
  g.fillStyle = rim; g.beginPath(); g.ellipse(x, y - s * 0.34 - body, w / 2, w * 0.1, 0, 0, 7); g.fill();     // lid
  g.fillStyle = '#1A1D22'; g.save(); g.translate(x - w * 0.1, y - s * 0.34 - body); g.rotate(-hatch * 1.1);
  g.fillRect(0, -w * 0.035, w * 0.22, w * 0.05); g.restore();                                                   // hatch
  g.strokeStyle = '#3A3F49'; g.lineWidth = s * 0.012;                                                          // ladder
  const lx = x - w * 0.36; g.beginPath(); g.moveTo(lx, y); g.lineTo(lx, top + s * 0.02); g.moveTo(lx + w * 0.12, y); g.lineTo(lx + w * 0.12, top + s * 0.02); g.stroke();
  for (let k = 0; k < 12; k++) { const ry = y - k * s * 0.08; g.beginPath(); g.moveTo(lx, ry); g.lineTo(lx + w * 0.12, ry); g.stroke(); }
  if (beam > 0) { const gr = g.createRadialGradient(x, y - s * 0.34 - body, 0, x, y - s * 0.34 - body, w * 0.9);
    gr.addColorStop(0, `rgba(255,240,200,${0.4 * beam})`); gr.addColorStop(1, 'rgba(255,240,200,0)'); g.fillStyle = gr; g.fillRect(x - w, y - s * 0.34 - body - w, w * 2, w * 2); }
  g.restore();
}

// A 1920s downtown hotel facade with a generic vertical neon "HOTEL" blade sign (no real logo).
// top: y of the cornice; the camera can pan by moving `top`.
export function facade(t, o = {}) {
  const { top = 300 * u, x0 = 130 * u, w = 820 * u, base = 1760 * u, floors = 14, lit = 0.22, seed = 4, neon = 1, tanks = 1, dim = 0 } = o;
  sky(t, { stars: 0.6 });
  skyline(base - 40 * u, t, { seed: seed + 20, hmin: 300, hvar: 700, lit: 0.1 });
  g.fillStyle = '#100F14'; g.fillRect(x0 - 200 * u, top + 260 * u, 190 * u, base);                  // neighbours
  g.fillRect(x0 + w + 10 * u, top + 420 * u, 260 * u, base);
  if (tanks) { tank(x0 + w * 0.26, top - 4 * u, 170 * u, { color: '#1A1C22', rim: '#2A2E36' }); tank(x0 + w * 0.5, top - 4 * u, 190 * u, { color: '#1A1C22', rim: '#2A2E36' }); }
  g.fillStyle = E.bldg; g.fillRect(x0, top, w, base - top);
  g.fillStyle = E.trim; g.fillRect(x0 - 18 * u, top - 6 * u, w + 36 * u, 30 * u); g.fillRect(x0 - 8 * u, top + 24 * u, w + 16 * u, 10 * u);
  const fh = (base - top - 260 * u) / floors, bays = 7, bw = w / bays;
  for (let b = 0; b <= bays; b++) { g.fillStyle = E.bldg2; g.fillRect(x0 + b * bw - 7 * u, top + 34 * u, 14 * u, base - top - 34 * u); }
  for (let r = 0; r < floors; r++) for (let b = 0; b < bays; b++) for (let k = 0; k < 2; k++) {
    const i = r * 31 + b * 3 + k, wx = x0 + b * bw + 14 * u + k * (bw - 28 * u) / 2, wy = top + 70 * u + r * fh, ww = (bw - 40 * u) / 2, wh = fh * 0.6;
    const on = hash(i, seed) < lit * (1 - dim);
    g.fillStyle = on ? `rgba(${E.glow},${0.42 + 0.18 * noise(t * 0.4 + i, 3)})` : E.win; g.fillRect(wx, wy, ww, wh);
    if (on && hash(i, seed + 1) > 0.6) { g.fillStyle = 'rgba(10,8,8,0.55)'; g.fillRect(wx, wy, ww, wh * 0.45); }   // half-drawn blind
  }
  // ground floor: storefronts + entrance canopy
  const gy = base - 190 * u;
  g.fillStyle = '#0D0C10'; g.fillRect(x0, gy, w, 190 * u);
  g.fillStyle = `rgba(${E.glow},0.3)`; for (let b = 0; b < bays; b++) if (b !== 3) g.fillRect(x0 + b * bw + 18 * u, gy + 40 * u, bw - 36 * u, 120 * u);
  g.fillStyle = E.trim; g.fillRect(x0 + 3 * bw - 30 * u, gy - 12 * u, bw + 60 * u, 30 * u);
  g.fillStyle = `rgba(${E.glow},0.55)`; g.fillRect(x0 + 3 * bw + 10 * u, gy + 40 * u, bw - 20 * u, 150 * u);
  // neon blade sign on the left pier: H O T E L
  if (neon > 0) {
    const sx = x0 + 40 * u, sy = top + 150 * u, sh = 560 * u, on = noise(t * 2.2, seed + 9) > -0.75 ? 1 : 0.25;
    g.save(); g.globalAlpha = neon;
    const gr = g.createRadialGradient(sx + 45 * u, sy + sh / 2, 0, sx + 45 * u, sy + sh / 2, 420 * u);
    gr.addColorStop(0, `rgba(${E.neonG},${0.32 * on})`); gr.addColorStop(1, `rgba(${E.neonG},0)`);
    g.fillStyle = gr; g.fillRect(sx - 400 * u, sy - 200 * u, 900 * u, sh + 400 * u);
    g.fillStyle = '#0A090C'; rrect(g, sx, sy, 90 * u, sh, 10 * u); g.fill();
    g.strokeStyle = on > 0.5 ? E.neon : '#5A2420'; g.lineWidth = 4 * u; rrect(g, sx + 6 * u, sy + 6 * u, 78 * u, sh - 12 * u, 8 * u); g.stroke();
    'HOTEL'.split('').forEach((ch, i) => { const flick = i === 3 && noise(t * 6, 33) < -0.55 ? 0.25 : on;
      text(g, ch, sx + 45 * u, sy + 95 * u + i * 100 * u, { size: 78 * u, weight: 700, family: INTER, color: flick > 0.5 ? '#FFD9D2' : '#5A2420' }); });
    g.restore();
  }
}

// Simple standing silhouette (never a likeness). Feet at (x, y), s ≈ height px.
// o.armL / o.armR: arm angle from hanging (0) to raised (≈2.6); o.step: leg spread; o.bag: backpack.
export function figure(x, y, s, o = {}) {
  const { color = '#05060A', armL = 0.15, armR = 0.15, step = 0, bag = 0, tilt = 0, face = 1 } = o;
  g.save(); g.translate(x, y); g.scale(s, s); g.rotate(tilt); g.fillStyle = color; g.strokeStyle = color; g.lineCap = 'round';
  g.lineWidth = 0.065;                                                                                  // legs
  g.beginPath(); g.moveTo(-0.04, -0.47); g.lineTo(-0.05 - step * 0.08, 0); g.moveTo(0.04, -0.47); g.lineTo(0.05 + step * 0.08, 0); g.stroke();
  g.beginPath(); g.moveTo(-0.1, -0.8); g.lineTo(0.1, -0.8); g.lineTo(0.13, -0.44); g.lineTo(-0.13, -0.44); g.closePath(); g.fill();  // torso
  if (bag) { rrect(g, -face * 0.2, -0.79, 0.11, 0.26, 0.03); g.fill(); }
  g.lineWidth = 0.05;
  for (const [sd, a] of [[-1, armL], [1, armR]]) { g.beginPath(); g.moveTo(sd * 0.09, -0.77); g.lineTo(sd * (0.1 + Math.sin(a) * 0.3), -0.77 + Math.cos(a) * 0.3); g.stroke(); }
  g.beginPath(); g.arc(0, -0.9, 0.075, 0, 7); g.fill();                                                  // head
  g.beginPath(); g.moveTo(-0.08, -0.93); g.quadraticCurveTo(-0.11, -0.78, -0.07, -0.7); g.lineTo(0.07, -0.7); g.quadraticCurveTo(0.11, -0.78, 0.08, -0.93); g.fill();  // long hair
  g.restore();
}

// Generic CCTV re-creation of a small elevator seen from an upper corner, drawn inside the rect (x, y, w, h).
// draw(nx, ny) callback-free: pass the figure in o.fig = {x: 0..1 across the floor, armL, armR, step, out: 0..1 into the hall}.
export function elevator(x, y, w, h, t, o = {}) {
  const { fig = null, door = 1, lit = [], clock = 0, label = 'CAM 2 · ELEVATOR' } = o;
  const X = (nx) => x + nx * w, Y = (ny) => y + ny * h;
  g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip();
  g.fillStyle = '#1B221F'; g.fillRect(x, y, w, h);
  // back wall
  const bx0 = 0.3, bx1 = 0.86, by0 = 0.12, by1 = 0.62;
  g.fillStyle = '#2E3833'; g.fillRect(X(bx0), Y(by0), X(bx1) - X(bx0), Y(by1) - Y(by0));
  g.strokeStyle = 'rgba(0,0,0,0.25)'; g.lineWidth = 2 * u; for (let k = 1; k < 4; k++) { g.beginPath(); g.moveTo(X(bx0 + (bx1 - bx0) * k / 4), Y(by0)); g.lineTo(X(bx0 + (bx1 - bx0) * k / 4), Y(by1)); g.stroke(); }
  g.fillStyle = 'rgba(0,0,0,0.22)'; g.fillRect(X(bx0), Y(0.4), X(bx1) - X(bx0), 6 * u);                     // handrail
  // floor
  g.fillStyle = '#26302B'; g.beginPath(); g.moveTo(X(bx0), Y(by1)); g.lineTo(X(bx1), Y(by1)); g.lineTo(X(1.1), Y(1.02)); g.lineTo(X(-0.1), Y(1.02)); g.closePath(); g.fill();
  // left wall with the door opening into a lit hallway
  g.fillStyle = '#232B27'; g.beginPath(); g.moveTo(X(0), Y(0)); g.lineTo(X(bx0), Y(by0)); g.lineTo(X(bx0), Y(by1)); g.lineTo(X(-0.1), Y(1.02)); g.closePath(); g.fill();
  const d0 = 0.42, d1 = 0.78;
  // door: interpolate along the left wall (s=0 at back corner, 1 at front edge)
  const dq = (s, v) => { const xx = X(bx0 * (1 - s)), top = by0 * (1 - s), bot = by1 * (1 - s) + 1.02 * s; return [xx, Y(top + (bot - top) * (0.12 + v * 0.88))]; };
  const dp = [dq(d0, 0), dq(d1, 0), dq(d1, 1), dq(d0, 1)];
  g.fillStyle = door > 0.5 ? '#6E7A6E' : '#232B27'; g.beginPath(); dp.forEach(([a, b], i) => (i ? g.lineTo(a, b) : g.moveTo(a, b))); g.closePath(); g.fill();
  if (door > 0.5) { g.fillStyle = 'rgba(30,36,32,0.6)'; g.beginPath(); g.moveTo(...dq(d0, 0.75)); g.lineTo(...dq(d1, 0.7)); g.lineTo(...dq(d1, 1)); g.lineTo(...dq(d0, 1)); g.closePath(); g.fill(); }
  g.strokeStyle = '#141A17'; g.lineWidth = 6 * u; g.beginPath(); dp.forEach(([a, b], i) => (i ? g.lineTo(a, b) : g.moveTo(a, b))); g.closePath(); g.stroke();
  // right wall with the button panel
  g.fillStyle = '#212925'; g.beginPath(); g.moveTo(X(1), Y(0)); g.lineTo(X(bx1), Y(by0)); g.lineTo(X(bx1), Y(by1)); g.lineTo(X(1.1), Y(1.02)); g.closePath(); g.fill();
  g.fillStyle = '#4C5650'; g.beginPath(); g.moveTo(X(0.9), Y(0.26)); g.lineTo(X(0.95), Y(0.22)); g.lineTo(X(0.95), Y(0.52)); g.lineTo(X(0.9), Y(0.52)); g.closePath(); g.fill();
  for (let k = 0; k < 10; k++) { const on = lit.includes(k); g.fillStyle = on ? '#F4E9C8' : '#28302C'; g.beginPath(); g.arc(X(0.912 + (k % 2) * 0.022), Y(0.28 + Math.floor(k / 2) * 0.05), 4 * u, 0, 7); g.fill(); }
  // ceiling light falloff
  const lg = g.createRadialGradient(X(0.58), Y(0.05), 0, X(0.58), Y(0.05), w * 0.8); lg.addColorStop(0, 'rgba(220,240,225,0.18)'); lg.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = lg; g.fillRect(x, y, w, h);
  // the figure (a plain silhouette)
  if (fig) {
    const out = fig.out || 0, fx = X(0.25 + fig.x * 0.5) * (1 - out) + dq(0.62, 1)[0] * out, fy = Y(0.92) * (1 - out) + (dq(0.62, 1)[1] - 6 * u) * out;
    figure(fx, fy, h * (0.62 - out * 0.12), { armL: fig.armL ?? 0.15, armR: fig.armR ?? 0.15, step: fig.step || 0, color: '#0A0D0B' });
  }
  // CCTV treatment: green tint, scanlines, noise blocks, timestamp
  g.fillStyle = `rgba(${E.cctvG},0.08)`; g.fillRect(x, y, w, h);
  g.fillStyle = 'rgba(0,0,0,0.18)'; for (let ly = 0; ly < h; ly += 6 * u) g.fillRect(x, y + ly, w, 2 * u);
  const fr = Math.floor(t * 12);
  g.fillStyle = 'rgba(200,220,205,0.06)'; for (let k = 0; k < 30; k++) g.fillRect(x + hash(k + fr * 30, 5) * w, y + hash(k + fr * 30, 6) * h, (20 + 60 * hash(k, 7)) * u, 2 * u);
  const ss = Math.floor(clock), ts = `00:${String(Math.floor(ss / 60)).padStart(2, '0')}:${String(ss % 60).padStart(2, '0')}`;
  text(g, label, x + 24 * u, y + 44 * u, { size: 26 * u, weight: 700, family: INTER, color: E.cctv, align: 'left', tracking: 2 * u });
  text(g, ts, x + w - 24 * u, y + 44 * u, { size: 26 * u, weight: 700, family: INTER, color: E.cctv, align: 'right', tracking: 2 * u });
  if (Math.floor(t * 1.6) % 2 === 0) { g.fillStyle = E.neon; g.beginPath(); g.arc(x + 34 * u, y + h - 34 * u, 9 * u, 0, 7); g.fill(); }
  text(g, 'REC', x + 54 * u, y + h - 24 * u, { size: 24 * u, weight: 700, family: INTER, color: E.cctv, align: 'left', tracking: 2 * u });
  g.restore();
  g.strokeStyle = '#2C3430'; g.lineWidth = 8 * u; g.strokeRect(x, y, w, h);
}
// "re-creation, not the real footage" note, placed under the monitor
export function recreation(y, t) { say('ภาพจำลอง · ไม่ใช่ภาพจากกล้องจริง', TX, y, t, { size: 30 * u, weight: 700, color: C.fog }); }

// Dark band for text over busy art.
export function band(y, h, a = 0.78) { g.fillStyle = `rgba(6,8,14,${a})`; g.fillRect(0, y, W, h); }

// Smartphone, screen content drawn by fn(x, y, w, h) in screen coordinates.
export function phone(x, y, w, fn, o = {}) {
  const { rot = 0, screen = '#0F1218' } = o, h = w * 2.05;
  g.save(); g.translate(x, y); g.rotate(rot);
  g.fillStyle = 'rgba(0,0,0,0.45)'; rrect(g, -w / 2 + 14 * u, -h / 2 + 18 * u, w, h, w * 0.12); g.fill();
  g.fillStyle = '#1F2128'; rrect(g, -w / 2, -h / 2, w, h, w * 0.12); g.fill();
  g.fillStyle = screen; rrect(g, -w / 2 + w * 0.05, -h / 2 + w * 0.05, w * 0.9, h - w * 0.1, w * 0.09); g.fill();
  g.save(); rrect(g, -w / 2 + w * 0.05, -h / 2 + w * 0.05, w * 0.9, h - w * 0.1, w * 0.09); g.clip();
  fn(-w / 2 + w * 0.05, -h / 2 + w * 0.05, w * 0.9, h - w * 0.1);
  g.restore();
  g.fillStyle = '#05060A'; rrect(g, -w * 0.13, -h / 2 + w * 0.08, w * 0.26, w * 0.06, w * 0.03); g.fill();
  g.restore();
}

// ---------------------------------------------------------------- schematic West Coast map (approximate)
const COAST = [[60, -140], [56, -133], [54, -130.5], [50.5, -128], [49, -125.5], [48.4, -124.7], [47.9, -124.6], [46.3, -124.0], [43, -124.4],
  [40.4, -124.4], [38.9, -123.7], [37.8, -122.5], [36.9, -122], [36.6, -121.9], [35.6, -121.2], [34.5, -120.5], [34.4, -119.6], [34.0, -118.8],
  [33.8, -118.4], [33.6, -117.9], [33.2, -117.4], [32.7, -117.2], [32.5, -117.1], [28, -114.5], [24, -111], [24, -95], [62, -95], [62, -140]];
export const PL = { van: [49.28, -123.12], sd: [32.72, -117.16], la: [34.05, -118.24], sc: [36.97, -122.03], sf: [37.77, -122.42] };
export const mapWest = (cam, o = {}) => {
  const P = map(cam, { lands: [COAST], grid: 5, land: '#141B2A', water: '#080C15', ...o });
  const a = P([49, -125.5]), b = P([49, -100]);
  g.save(); g.setLineDash([10 * u, 10 * u]); g.strokeStyle = 'rgba(140,151,173,0.5)'; g.lineWidth = 2.5 * u; g.beginPath(); g.moveTo(...a); g.lineTo(...b); g.stroke(); g.restore();
  return P;
};

export default () => [
  // ---------------- hook: the hotel at night, tilt up to the rooftop tanks
  { from: bar(0), to: bar(2), cues: [[0, 'thump', 0.7], [0.2, 'riser', 0.4], [1.25, 'thump', 0.5], [2.4, 'tick', 0.4]],
    draw(t) {
      const top = track(t, [[0, 120 * u], [0.01, 520 * u]], 'heavy');
      facade(t, { top, lit: 0.24 });
      band(170 * u, 330 * u, 0.72); band(1330 * u, 250 * u, 0.78);
      big('Cecil Hotel', TX, 380 * u, t - 0.1, { size: 150 * u, color: C.cream });
      say('นักศึกษาสาววัย 21 ปี\nหายตัวไปในโรงแรมแห่งนี้', TX, 1410 * u, t - 1.0, { size: 48 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- the clip the world watched
  { from: bar(2), to: bar(4), cues: [[0, 'thump', 0.6], [0.1, 'type', 0.4], [2.5, 'swish', 0.5]],
    draw(t) {
      night(E.sky);
      const fig = { x: 0.55, armL: track(t, [[0, 0.15], [1.2, 2.2], [2.2, 0.4], [3.2, 1.8]], 'default'), armR: track(t, [[0, 0.15], [1.6, 1.4], [3.0, 0.3]], 'default') };
      elevator(80 * u, 560 * u, 840 * u, 760 * u, t, { fig, clock: 14 + t, lit: [2, 3, 4, 5] });
      recreation(1370 * u, t - 0.3);
      say('คลิปจากกล้องในลิฟต์\nที่คนทั่วโลกเปิดดูหลายล้านครั้ง', TX, 300 * u, t - 0.1, { size: 50 * u, weight: 800, color: C.cream });
      say('แต่เรื่องจริง เศร้ากว่าทฤษฎีใด ๆ', TX, 1500 * u, t - 2.5, { size: 48 * u, weight: 800, color: E.lamp });
      finish(0.9);
    } },
  // ---------------- title card
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 18); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 440 * u, 90 * u, 14 * u); g.fill();
      text(g, 'LOS ANGELES · 2013', 290 * u, 472 * u, { size: 28 * u, weight: 700, family: INTER, color: C.inkSoft, tracking: 2 * u });
      g.restore();
      say('การจากไปของ', TX, 690 * u, t - 0.25, { size: 52 * u, weight: 800, color: C.inkSoft });
      big('Elisa Lam', TX, 850 * u, t - 0.5, { size: 150 * u, color: C.ink });
      stamp('NOT A GHOST STORY', TX, 1110 * u, t - 2.5, { size: 70 * u, rot: -0.08 });
      say('เรื่องจริงของหญิงสาวคนหนึ่ง\nไม่ใช่เรื่องผี', TX, 1330 * u, t - 3.0, { size: 46 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------- who she was
  { from: bar(6), to: bar(9), cues: [[0.2, 'whoosh', 0.5], [2.5, 'pop', 0.6], [5.0, 'pop', 0.6]],
    draw(t) {
      sky(t, { top: '#0A0F1A', bot: '#1E2638', stars: 0.8 });
      // north-shore mountains + city lights of Vancouver, schematic
      g.fillStyle = '#121828'; g.beginPath(); g.moveTo(0, 1180 * u);
      for (let i = 0; i <= 12; i++) g.lineTo(i * 95 * u, (980 + 160 * Math.abs(Math.sin(i * 1.3)) + 40 * hash(i, 4)) * u); g.lineTo(W, 1300 * u); g.lineTo(0, 1300 * u); g.fill();
      skyline(1330 * u, t, { seed: 41, hmin: 60, hvar: 260, lit: 0.3, color: '#0B0E16' });
      g.fillStyle = '#0B0E16'; g.fillRect(0, 1328 * u, W, H);
      g.fillStyle = 'rgba(233,181,102,0.08)'; for (let i = 0; i < 16; i++) g.fillRect(hash(i, 8) * W, 1350 * u + i * 6 * u, 80 * u, 2 * u);
      const fx = track(t, [[0, 420 * u], [0.3, 560 * u]], 'heavy');
      figure(fx, 1560 * u, 420 * u, { bag: 1, armL: 0.1, armR: 0.2, color: '#04050A' });
      band(200 * u, 380 * u, 0.72);
      kicker('Elisa Lam · อายุ 21 ปี', TX, 280 * u, t, { color: E.lamp });
      say('นักศึกษาจากแวนคูเวอร์ แคนาดา', TX, 390 * u, t - 0.2, { size: 52 * u, weight: 800, color: C.cream });
      say('เรียนที่ University of British Columbia', TX, 500 * u, t - 2.5, { size: 40 * u, weight: 800, color: C.fog });
      say('ชอบแฟชั่น และเขียนบล็อกเป็นประจำ', TX, 720 * u, t - 5.0, { size: 44 * u, weight: 800, color: E.lamp });
      finish(0.8);
    } },
  // ---------------- the West Coast trip
  { from: bar(9), to: bar(12), cues: [[0.2, 'whoosh', 0.6], [1.4, 'pop', 0.6], [3.2, 'pop', 0.6], [5.0, 'pop', 0.5]],
    draw(t) {
      const cam = { lat: track(t, [[0, 46], [0.1, 42.2]], 'heavy'), lon: -119.5, z: track(t, [[0, 40], [0.1, 60]], 'heavy') * u };
      const P = mapWest(cam);
      const v = P(PL.van), s = P(PL.sd), l = P(PL.la), c = P(PL.sc), f = P(PL.sf);
      const arc = (a, b, k = 0.25) => Array.from({ length: 24 }, (_, i) => { const q = i / 23, mx = (a[0] + b[0]) / 2 + (b[1] - a[1]) * k, my = (a[1] + b[1]) / 2 - (b[0] - a[0]) * k;
        return [(1 - q) * (1 - q) * a[0] + 2 * q * (1 - q) * mx + q * q * b[0], (1 - q) * (1 - q) * a[1] + 2 * q * (1 - q) * my + q * q * b[1]]; });
      path(arc(v, s, 0.18), clamp((t - 0.9) / 1.4), { color: C.cream, width: 4 * u, dash: [12 * u, 10 * u] });
      path([s, l], clamp((t - 2.8) / 0.8), { color: E.lamp, width: 7 * u });
      path([l, c, f], clamp((t - 4.8) / 1.4), { color: C.fog, width: 4 * u, dash: [6 * u, 12 * u] });
      pin(...v, t - 0.6, { label: 'แวนคูเวอร์', side: 1 });
      pin(...s, t - 2.2, { label: 'ซานดิเอโก', side: 1, color: C.fog });
      pin(...l, t - 3.2, { label: 'ลอสแอนเจลิส', side: 1, color: E.lamp });
      pin(...c, t - 5.2, { label: 'ซานตาครูซ', side: -1, color: C.fog });
      pin(...f, t - 5.6, { label: 'ซานฟรานซิสโก', side: -1, color: C.fog });
      topScrim(560, '8,12,21', 0.95);
      kicker('มกราคม 2013', TX, 270 * u, t, { color: E.lamp });
      say('ทริปเที่ยวคนเดียวที่เธอเรียกว่า\n“West Coast tour”', TX, 370 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      band(1430 * u, 150 * u, 0.7);
      say('เส้นประ = จุดหมายที่วางแผนไว้ต่อ · แผนที่จำลอง', TX, 1520 * u, t - 5.0, { size: 32 * u, weight: 700, color: C.fog });
      finish(0.8);
    } },
  // ---------------- 26 January: check-in
  { from: bar(12), to: bar(13), cues: Array.from({ length: 5 }, (_, i) => [i * 0.15, 'tick', 0.6]).concat([[1.0, 'thump', 0.6]]),
    draw(t) {
      night(E.sky);
      kicker('มกราคม 2013', TX, 420 * u, t, { color: E.lamp });
      const d = ['22', '23', '24', '25', '26'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.15), t, { size: 360 * u, bg: C.cream, fg: C.ink, r: 18 * u });
      say('เช็กอินโรงแรมใจกลางลอสแอนเจลิส', TX, 1240 * u, t - 1.0, { size: 50 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- the hotel
  { from: bar(13), to: bar(16), cues: [[0.2, 'whoosh', 0.5], [2.5, 'pop', 0.6], [5.0, 'thump', 0.6]],
    draw(t) {
      const top = track(t, [[0, 640 * u], [0.01, 700 * u]], 'heavy');
      facade(t, { top, lit: 0.3, seed: 6 });
      band(190 * u, 400 * u, 0.8);
      kicker('Cecil Hotel · เปิดเมื่อปี 1924', TX, 270 * u, t, { color: E.lamp });
      say('ช่วงนั้นใช้อีกชื่อหนึ่งว่า\n“Stay on Main”', TX, 380 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      band(1380 * u, 210 * u, 0.82);
      say('ห้องพักราคาประหยัด\nอยู่ติดย่านคนไร้บ้าน Skid Row', TX, 1450 * u, t - 2.5, { size: 42 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- a dark reputation
  { from: bar(16), to: bar(18), cues: [[0.1, 'thump', 0.6], [1.0, 'pop', 0.5], [2.5, 'pop', 0.5]],
    draw(t) {
      facade(t, { top: 480 * u, lit: 0.1, seed: 9, dim: 0.5, neon: 0.6 });
      g.fillStyle = 'rgba(6,8,14,0.55)'; g.fillRect(0, 0, W, H);
      kicker('ชื่อเสียงด้านมืดของโรงแรม', TX, 300 * u, t, { color: E.lamp });
      [['มีรายงานการเสียชีวิตหลายครั้ง\nตลอดหลายสิบปี', 0.6], ['มีรายงานว่าฆาตกรต่อเนื่อง Richard Ramirez\nเคยพักที่นี่ช่วงทศวรรษ 1980', 2.0]].forEach(([s, at], i) => {
        const p = spring(t - at, 'snappy'); if (p <= 0) return;
        g.save(); g.translate((1 - p) * W, 0);
        g.fillStyle = 'rgba(14,16,24,0.92)'; rrect(g, 90 * u, 520 * u + i * 300 * u, W - 220 * u, 240 * u, 14 * u); g.fill();
        g.fillStyle = E.neon; g.fillRect(90 * u, 520 * u + i * 300 * u, 8 * u, 240 * u);
        say(s, TX, 615 * u + i * 300 * u, 1, { size: 42 * u, weight: 800, color: C.cream });
        g.restore(); });
      finish(0.9);
    } },
];
