// scenes/props.js — Zodiac-specific props: cipher glyphs, the crosshair symbol, Bay Area geography, newspaper.
import { g, u, W, H, C, SERIF, THAI, spring, clamp, hash, noise, text, rrect, map } from './kit.js';

// Stylised cipher glyphs drawn as paths/letters. They evoke the ciphers' look; they are NOT the real symbol sequences.
const LET = 'ABCDEFGHIJKLMNOPRSTUVWXYZ+';
export function glyph(id, x, y, s, color = C.ink) {
  const k = id % 40;
  g.save(); g.translate(x, y); g.fillStyle = color; g.strokeStyle = color; g.lineWidth = s * 0.09; g.lineCap = 'round';
  if (k < 26) {
    const flip = hash(id, 3) < 0.3 ? -1 : 1, up = hash(id, 4) < 0.15 ? -1 : 1;
    g.scale(flip, up);
    text(g, LET[k], 0, s * 0.36, { size: s, weight: 700, family: 'Inter, sans-serif', color });
  } else {
    const r = s * 0.36;
    g.beginPath();
    switch (k) {
      case 26: g.arc(0, 0, r, 0, 7); g.stroke(); g.beginPath(); g.moveTo(-r, 0); g.lineTo(r, 0); g.moveTo(0, -r); g.lineTo(0, r); g.stroke(); break;
      case 27: g.moveTo(0, -r); g.lineTo(r, r); g.lineTo(-r, r); g.closePath(); g.stroke(); break;
      case 28: g.moveTo(0, r); g.lineTo(r, -r); g.lineTo(-r, -r); g.closePath(); g.fill(); break;
      case 29: g.rect(-r, -r, 2 * r, 2 * r); g.stroke(); break;
      case 30: g.rect(-r, -r, 2 * r, 2 * r); g.fill(); break;
      case 31: g.arc(0, 0, r, 0, 7); g.stroke(); break;
      case 32: g.arc(0, 0, r, 0, 7); g.fill(); break;
      case 33: g.arc(0, 0, r, Math.PI / 2, Math.PI * 1.5); g.fill(); g.beginPath(); g.arc(0, 0, r, 0, 7); g.stroke(); break;
      case 34: g.moveTo(-r, -r); g.lineTo(r, r); g.moveTo(r, -r); g.lineTo(-r, r); g.stroke(); break;
      case 35: g.moveTo(0, -r); g.lineTo(r, 0); g.lineTo(0, r); g.lineTo(-r, 0); g.closePath(); g.stroke(); break;
      case 36: g.moveTo(-r, r); g.lineTo(-r, -r); g.lineTo(r, -r); g.moveTo(-r, 0); g.lineTo(r * 0.6, 0); g.stroke(); break;
      case 37: g.moveTo(-r, -r); g.lineTo(0, r); g.lineTo(r, -r); g.stroke(); break;
      case 38: g.arc(0, 0, r, 0, 7); g.stroke(); g.beginPath(); g.arc(0, 0, r * 0.3, 0, 7); g.fill(); break;
      default: g.moveTo(-r, 0); g.lineTo(r, 0); g.moveTo(0, -r); g.lineTo(0, r); g.stroke();
    }
  }
  g.restore();
}
// A grid of glyphs; reveal 0..1 types them in reading order.
export function cipherGrid(x0, y0, cols, rows, cell, reveal, o = {}) {
  const { seed = 1, color = C.ink, hot = null, hotColor = C.red } = o;
  const n = cols * rows, shown = Math.floor(n * clamp(reveal));
  for (let i = 0; i < shown; i++) {
    const c = i % cols, r = Math.floor(i / cols);
    glyph(Math.floor(hash(i, seed) * 400), x0 + c * cell + cell / 2, y0 + r * cell + cell / 2, cell * 0.72, hot && hot(i) ? hotColor : color);
  }
}
// The crosshair: a circle with a cross through it.
export function crosshair(x, y, r, t = 1, color = C.red, w = 12) {
  const p = clamp(t);
  g.save(); g.strokeStyle = color; g.lineWidth = w * u; g.lineCap = 'round';
  g.beginPath(); g.arc(x, y, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p); g.stroke();
  const q = clamp((t - 0.5) * 2), e = r * 1.35;
  g.beginPath(); g.moveTo(x - e * q, y); g.lineTo(x + e * q, y); g.moveTo(x, y - e * q); g.lineTo(x, y + e * q); g.stroke();
  g.restore();
}

// Bay Area, stylised.
const LAND = [[38.6, -123.4], [38.3, -123.1], [38.0, -122.98], [37.95, -122.75], [37.9, -122.68], [37.83, -122.48], [37.81, -122.48],
  [37.78, -122.51], [37.6, -122.5], [37.3, -122.4], [37.0, -122.2], [36.9, -121.9], [36.6, -121.9], [36.0, -121.3], [36, -120], [39.2, -120], [39.2, -123.8]];
const BAY = [[37.81, -122.47], [37.81, -122.39], [37.72, -122.38], [37.6, -122.35], [37.45, -122.1], [37.5, -122.0], [37.7, -122.2], [37.8, -122.3],
  [37.9, -122.33], [38.0, -122.4], [38.05, -122.3], [38.1, -122.25], [38.06, -122.15], [38.05, -122.05], [38.03, -122.1], [38.0, -122.25],
  [37.98, -122.35], [37.88, -122.45], [37.83, -122.47]];
const BERRYESSA = [[38.68, -122.27], [38.62, -122.24], [38.56, -122.2], [38.5, -122.15], [38.49, -122.17], [38.55, -122.23], [38.63, -122.29]];
export const PLACE = { sf: [37.789, -122.452], vallejo: [38.13, -122.2], benicia: [38.09, -122.13], berryessa: [38.57, -122.24], napa: [38.3, -122.29] };
export const mapBay = (cam, o = {}) => map(cam, { lands: [LAND], waters: [BAY, BERRYESSA], grid: 0.5, ...o });

// Newspaper front page; headline Latin, body as grey bars.
export function newspaper(x, y, w, rot, headline, o = {}) {
  const { masthead = 'SAN FRANCISCO CHRONICLE', body = 1, seed = 1 } = o;
  const h = w * 1.3;
  g.save(); g.translate(x, y); g.rotate(rot);
  g.fillStyle = 'rgba(0,0,0,0.18)'; g.fillRect(-w / 2 + 10 * u, -h / 2 + 14 * u, w, h);
  g.fillStyle = '#F4EEDF'; g.fillRect(-w / 2, -h / 2, w, h);
  text(g, masthead, 0, -h / 2 + w * 0.08, { size: w * 0.055, weight: 400, family: SERIF, color: C.ink });
  g.fillStyle = C.ink; g.fillRect(-w * 0.45, -h / 2 + w * 0.1, w * 0.9, w * 0.006);
  text(g, headline, 0, -h / 2 + w * 0.21, { size: w * 0.075, weight: 800, family: 'Inter, sans-serif', color: C.ink });
  g.fillStyle = 'rgba(22,19,15,0.25)';
  for (let c = 0; c < 3; c++) for (let r = 0; r < 18 * body; r++) {
    const ww = w * 0.27 * (0.7 + hash(r + c * 31, seed) * 0.3);
    g.fillRect(-w * 0.45 + c * w * 0.31, -h / 2 + w * 0.3 + r * w * 0.045, ww, w * 0.018);
  }
  g.restore();
}
