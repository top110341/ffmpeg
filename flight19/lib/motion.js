// lib/motion.js — motion toolkit for seek(t) films.
// Every export is a pure function of its inputs, so window.seek(t) stays deterministic:
// frame 812 renders without simulating frames 0..811, and every run is identical.

export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, p) => a + (b - a) * p;
// Map x from [a,b] to [c,d], clamped. remap(t, 1, 2) → 0..1 progress between 1s and 2s.
export const remap = (x, a, b, c = 0, d = 1) => lerp(c, d, clamp((x - a) / (b - a || 1e-9)));
export const loopT = (t, dur) => ((t % dur) + dur) % dur;

// ---------------------------------------------------------------- springs
// [stiffness, damping]. ζ = d / (2·√k): below 1 overshoots, 1 is critical.
export const SPRINGS = {
  snappy:  [320, 30], // ζ≈0.84 tiny overshoot — buttons, toggles, leading edges
  default: [170, 26], // ζ≈1.0  no overshoot — cards, containers, camera
  heavy:   [90, 19],  // ζ≈1.0  slow, weighty — big type, 3D objects, logo lockups
  playful: [220, 14], // ζ≈0.47 visible bounce — mascots, stickers
};

// Closed-form damped spring from 0 → 1, released at t = 0. k may be a preset name.
export function spring(t, k = 170, d = 26) {
  if (typeof k === 'string') [k, d] = SPRINGS[k];
  if (t <= 0) return 0;
  const w0 = Math.sqrt(k), z = d / (2 * w0);
  if (Math.abs(z - 1) < 1e-3) return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
  if (z < 1) {
    const wd = w0 * Math.sqrt(1 - z * z);
    return 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + (z * w0 / wd) * Math.sin(wd * t));
  }
  const s = Math.sqrt(z * z - 1), r1 = -w0 * (z - s), r2 = -w0 * (z + s);
  return 1 - (r2 * Math.exp(r1 * t) - r1 * Math.exp(r2 * t)) / (r2 - r1);
}

// A value that changes target several times: one spring per change, summed.
// keys: [[time, value], ...] sorted by time. Values may be numbers or arrays ([x, y], rgb...).
export function track(t, keys, k = 170, d = 26) {
  if (Array.isArray(keys[0][1])) return keys[0][1].map((_, j) => track(t, keys.map(([kt, v]) => [kt, v[j]]), k, d));
  let v = keys[0][1];
  for (let i = 1; i < keys.length; i++) v += (keys[i][1] - keys[i - 1][1]) * spring(t - keys[i][0], k, d);
  return v;
}

// Tab/selection indicator that stretches: leading edge stiffer than trailing edge.
export function indicator(t, stops, width = 120) {
  const lead = track(t, stops, 'snappy'), trail = track(t, stops, 140, 22);
  return { left: Math.min(lead, trail), right: Math.max(lead, trail) + width };
}

// Content inside a morphing container: in as the morph starts, out as the next morph starts, with a
// short crossover so the container is never visibly empty. Pair with a blur of (1 - alpha) for the
// "swap behind a short blur" look. For bare text (no blur) pass overlap = -0.1 to separate them instead.
export function swapAlpha(t, tIn, tOut = Infinity, overlap = 0.06) {
  return Math.min(clamp((t - tIn) / 0.12), clamp((tOut + overlap - t) / 0.12));
}

// ---------------------------------------------------------------- seeded randomness
// Never Math.random. rng(seed) gives a sequence; hash(i, seed) gives a stateless value per index.
export function rng(seed = 1) {
  return () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export const hash = (i, seed = 0) => rng((i * 374761393 + seed * 668265263) | 0)();
// Smooth 1-D value noise in [-1, 1]. noise(t * 2, 7) for an organic wobble.
export function noise(x, seed = 0) {
  const i = Math.floor(x), f = x - i, s = f * f * (3 - 2 * f);
  return lerp(hash(i, seed), hash(i + 1, seed), s) * 2 - 1;
}

// ---------------------------------------------------------------- color
export function hexToRgb(h) {
  h = h.replace('#', '');
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}
export const rgb = ([r, g, b], a = 1) => `rgba(${r | 0},${g | 0},${b | 0},${a})`;
export const mixColor = (a, b, p) => rgb(hexToRgb(a).map((v, i) => lerp(v, hexToRgb(b)[i], clamp(p))));

// ---------------------------------------------------------------- layout
// Write scenes against this, not fixed pixels, so 9:16, 1:1 and 16:9 render from one timeline.
// u = 1 at 1080 px on the short side. Size everything in u.
export function layout(W, H) {
  const u = Math.min(W, H) / 1080, aspect = W / H;
  const kind = aspect < 0.8 ? 'portrait' : aspect > 1.25 ? 'landscape' : 'square';
  const m = 64 * u;
  // Vertical platforms cover the top ~8% and bottom ~18% with UI; keep text out of there.
  const safe = kind === 'portrait'
    ? { x: m, y: H * 0.08, w: W - 2 * m, h: H * 0.74 }
    : { x: m, y: m, w: W - 2 * m, h: H - 2 * m };
  return { W, H, u, kind, cx: W / 2, cy: H / 2, safe, portrait: kind === 'portrait', landscape: kind === 'landscape' };
}

// ---------------------------------------------------------------- type
// Thai (and emoji) must be split by grapheme cluster, never by UTF-16 char,
// or vowels and tone marks detach from their consonant.
const seg = typeof Intl !== 'undefined' && Intl.Segmenter ? new Intl.Segmenter(undefined, { granularity: 'grapheme' }) : null;
export const graphemes = (s) => (seg ? [...seg.segment(s)].map((x) => x.segment) : [...s]);
const hasThai = (s) => /[฀-๿]/.test(s);

export function font(size, weight = 700, family = 'Inter, system-ui, sans-serif') {
  return `${weight} ${size}px ${family}`;
}

export function text(g, str, x, y, o = {}) {
  const { size = 64, weight = 700, family, color = '#fff', align = 'center', baseline = 'alphabetic', tracking = 0, alpha = 1 } = o;
  g.save();
  g.globalAlpha *= alpha;
  g.font = font(size, weight, family);
  g.fillStyle = color; g.textAlign = align; g.textBaseline = baseline;
  g.letterSpacing = `${hasThai(str) ? 0 : tracking}px`; // tracking breaks Thai stacking
  g.fillText(str, x, y);
  g.restore();
}

export function measure(g, str, o = {}) {
  const { size = 64, weight = 700, family, tracking = 0 } = o;
  g.save(); g.font = font(size, weight, family); g.letterSpacing = `${hasThai(str) ? 0 : tracking}px`;
  const w = g.measureText(str).width; g.restore();
  return w;
}

// Kinetic type: each grapheme (or word, by: 'word') rises out of a mask on a staggered spring.
// t is local time; returns nothing. align: 'center' | 'left'.
export function typeIn(g, str, x, y, t, o = {}) {
  const { size = 120, weight = 800, family, color = '#fff', tracking = 0, stagger = 0.035,
    preset = 'snappy', align = 'center', by = 'grapheme', alpha = 1, out = Infinity } = o;
  const thai = hasThai(str);
  const parts = by === 'word'
    ? (Intl.Segmenter ? [...new Intl.Segmenter(undefined, { granularity: 'word' }).segment(str)].map((x) => x.segment) : str.split(/(\s+)/))
    : graphemes(str);
  g.save();
  g.globalAlpha *= alpha;
  g.font = font(size, weight, family);
  g.letterSpacing = `${thai ? 0 : tracking}px`;
  g.fillStyle = color; g.textBaseline = 'alphabetic'; g.textAlign = 'left';
  const total = g.measureText(str).width;
  let cx = align === 'center' ? x - total / 2 : x;
  g.beginPath(); g.rect(cx - size, y - size * 1.25, total + size * 2, size * 1.65); g.clip(); // mask
  let prefix = '';
  parts.forEach((p, i) => {
    const px = cx + g.measureText(prefix).width; // measure prefix so kerning/shaping stays right
    prefix += p;
    const sIn = spring(t - i * stagger, preset), sOut = spring(t - out - i * stagger * 0.5, 'snappy');
    const dy = (1 - sIn) * size * 2.0 - sOut * size * 2.0; // 2.0: Thai marks above the line stay hidden below the mask
    g.fillText(p, px, y + dy);
  });
  g.restore();
}

// ---------------------------------------------------------------- shapes
export function rrect(g, x, y, w, h, r) {
  r = Math.max(0, Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2));
  g.beginPath(); g.roundRect(x, y, w, h, r);
}
// Draw-on stroke progress for a path built with a callback: p in 0..1.
export function strokeProgress(g, len, p) {
  g.setLineDash([len, len]); g.lineDashOffset = len * (1 - clamp(p));
}
