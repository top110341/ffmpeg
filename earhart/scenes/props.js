// scenes/props.js — Earhart props: Lockheed Electra 10E, radio waves, Coast Guard cutter, Pacific geography.
import { g, u, W, H, C, SERIF, THAI, spring, clamp, hash, noise, text, rrect, map } from './kit.js';

// Electra 10E from above (twin engines, twin fins), nose to -y. 1 unit = s px.
export function electra(x, y, s, rot = 0, color = C.cream) {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); g.fillStyle = color;
  g.beginPath(); g.ellipse(0, 0, 0.09, 0.62, 0, 0, 7); g.fill();
  g.beginPath(); g.moveTo(-0.95, 0.02); g.lineTo(0.95, 0.02); g.lineTo(0.9, 0.14); g.lineTo(-0.9, 0.14); g.closePath(); g.fill();
  for (const sx of [-1, 1]) { g.beginPath(); g.ellipse(sx * 0.32, -0.04, 0.06, 0.2, 0, 0, 7); g.fill(); g.fillRect(sx * 0.32 - 0.12, -0.25, 0.24, 0.02); }
  g.fillRect(-0.3, 0.52, 0.6, 0.07);
  for (const sx of [-1, 1]) g.fillRect(sx * 0.3 - 0.02, 0.46, 0.04, 0.18);
  g.restore();
}
// side view, nose left
export function electraSide(x, y, s, color = C.cream) {
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color;
  g.beginPath(); g.moveTo(-1, 0); g.quadraticCurveTo(-0.95, -0.12, -0.7, -0.13); g.lineTo(0.75, -0.06); g.lineTo(0.95, -0.02); g.lineTo(0.75, 0.05); g.lineTo(-0.7, 0.08); g.quadraticCurveTo(-0.95, 0.07, -1, 0); g.fill();
  g.beginPath(); g.moveTo(0.78, -0.05); g.lineTo(0.85, -0.3); g.lineTo(0.95, -0.3); g.lineTo(0.95, -0.02); g.fill();
  rrect(g, -0.55, -0.02, 0.32, 0.08, 0.04); g.fill();
  g.fillStyle = 'rgba(0,0,0,0.35)'; for (let i = 0; i < 6; i++) g.fillRect(-0.45 + i * 0.12, -0.08, 0.06, 0.04);
  g.restore();
}
export function waves(x, y, t, o = {}) {
  const { color = C.red, n = 4, max = 240 * u, dir = 0, spread = 0.9, alpha = 1 } = o;
  for (let k = 0; k < n; k++) { const p = ((t * 0.8 + k / n) % 1); g.strokeStyle = color; g.globalAlpha = (1 - p) * alpha; g.lineWidth = 5 * u;
    g.beginPath(); g.arc(x, y, 30 * u + p * max, dir - spread, dir + spread); g.stroke(); }
  g.globalAlpha = 1;
}
export function cutter(x, y, s, color = '#1C2638') {
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color;
  g.beginPath(); g.moveTo(-1, 0); g.lineTo(1, 0); g.lineTo(0.85, 0.18); g.lineTo(-0.9, 0.18); g.closePath(); g.fill();
  g.fillRect(-0.3, -0.22, 0.5, 0.22); g.fillRect(-0.1, -0.4, 0.2, 0.18); g.fillRect(-0.02, -0.7, 0.04, 0.3);
  g.fillRect(0.3, -0.12, 0.12, 0.12);
  g.restore();
}
// Pacific geography, longitudes east-positive past 180 (Howland = 183.4).
const NG = [[-1, 131], [-0.8, 134], [-2.5, 138], [-2.6, 141], [-3.5, 144], [-5.5, 147.5], [-6.5, 147.8], [-8, 148], [-10.5, 150.5], [-10.2, 148], [-9.5, 147], [-8.2, 143.5], [-9, 141], [-8, 138.5], [-5, 137], [-4, 133.5], [-2.5, 132]];
const AUSN = [[-10.7, 142.5], [-12.5, 141.6], [-17.5, 140.8], [-19, 146.5], [-22, 150], [-25, 152.7], [-40, 152], [-40, 130], [-12, 130], [-14, 143.5]];
const SOLOMON = [[-6.6, 155.0], [-7.3, 156.6], [-8.5, 158.0], [-9.8, 160.8], [-10.6, 161.7], [-9.4, 159.2], [-8.0, 157.0]];
export const PLACE = { lae: [-6.73, 147.0], howland: [0.81, 183.38], niku: [-4.67, 185.48], baker: [0.19, 183.52], saipan: [15.2, 145.75] };
export const mapPacific = (cam, o = {}) => map(cam, { lands: [NG, AUSN, SOLOMON], grid: 5, ...o });
export function islet(P, p, r = 8) { const [x, y] = P(p); g.fillStyle = '#C9B98F'; g.beginPath(); g.arc(x, y, r * u, 0, 7); g.fill(); }
