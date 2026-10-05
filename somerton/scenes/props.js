// scenes/props.js — Somerton Man props: dawn beach, seawall, the slip, the book, the code, Australia.
import { g, u, W, H, C, SERIF, THAI, spring, clamp, hash, noise, text, rrect, map, typewriter } from './kit.js';

export const SAND = '#D9C7A0', SAND2 = '#C4AF84', SEA = '#5D7083', SKY = '#C9C3B5';

export function beach(t, o = {}) {
  const { horizon = 760 * u, shore = 1180 * u } = o;
  const sky = g.createLinearGradient(0, 0, 0, horizon);
  sky.addColorStop(0, '#8E96A0'); sky.addColorStop(1, '#E6D9BE');
  g.fillStyle = sky; g.fillRect(0, 0, W, horizon);
  g.fillStyle = SEA; g.fillRect(0, horizon, W, shore - horizon);
  g.strokeStyle = 'rgba(239,230,210,0.35)'; g.lineWidth = 3 * u;
  for (let r = 0; r < 8; r++) { const y = horizon + 20 * u + r * (shore - horizon - 40 * u) / 8; g.beginPath();
    for (let x = 0; x <= W; x += 16 * u) { const yy = y + Math.sin(x / (60 * u) + t * (1 + r * 0.1) + r) * (2 + r) * u; x ? g.lineTo(x, yy) : g.moveTo(x, yy); } g.stroke(); }
  // foam line that slides up and back
  const fy = shore + Math.sin(t * 0.9) * 18 * u;
  g.fillStyle = SAND; g.fillRect(0, fy, W, H - fy);
  g.strokeStyle = '#F2EBDD'; g.lineWidth = 6 * u; g.beginPath();
  for (let x = 0; x <= W; x += 16 * u) { const yy = fy + noise(x / (90 * u) + t * 0.6, 3) * 10 * u; x ? g.lineTo(x, yy) : g.moveTo(x, yy); } g.stroke();
  g.fillStyle = SAND2; for (let i = 0; i < 140; i++) { g.globalAlpha = 0.5; g.beginPath(); g.arc(hash(i, 1) * W, fy + 30 * u + hash(i, 2) * (H - fy), (1 + hash(i, 3) * 2.5) * u, 0, 7); g.fill(); }
  g.globalAlpha = 1;
}
export function seawall(x0, y, w, h) {
  g.fillStyle = '#9A9283'; g.fillRect(x0, y, w, h);
  g.strokeStyle = '#7F786B'; g.lineWidth = 3 * u;
  for (let r = 0; r < h / (50 * u); r++) for (let c = 0; c < w / (110 * u) + 1; c++) g.strokeRect(x0 + c * 110 * u - (r % 2) * 55 * u, y + r * 50 * u, 110 * u, 50 * u);
}
// seated figure against the wall, legs out, head slightly tilted
export function seated(x, y, s, color = '#2B2A2E') {
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color;
  g.beginPath(); g.ellipse(0.02, -1.28, 0.2, 0.24, 0.15, 0, 7); g.fill();
  g.beginPath(); g.moveTo(-0.32, -1.0); g.quadraticCurveTo(0.02, -1.08, 0.34, -0.98); g.lineTo(0.36, -0.1); g.lineTo(-0.34, -0.1); g.closePath(); g.fill();
  g.beginPath(); g.moveTo(-0.3, -0.2); g.lineTo(1.4, -0.12); g.lineTo(1.42, 0.08); g.lineTo(-0.3, 0.06); g.closePath(); g.fill();
  g.fillStyle = '#121114'; g.beginPath(); g.ellipse(1.45, -0.02, 0.12, 0.09, 0, 0, 7); g.fill();
  g.restore();
}
// the scrap of paper with the printed words
export function slip(x, y, s, rot = 0) {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  g.fillStyle = '#F3ECD8'; g.beginPath();
  g.moveTo(-1, -0.32); for (let i = 0; i <= 10; i++) g.lineTo(-1 + i * 0.2, -0.32 + (hash(i, 4) - 0.5) * 0.06);
  g.lineTo(1, 0.32); for (let i = 10; i >= 0; i--) g.lineTo(-1 + i * 0.2, 0.32 + (hash(i, 5) - 0.5) * 0.06); g.closePath(); g.fill();
  text(g, 'Tamám Shud', 0, 0.12, { size: 0.42, weight: 400, family: '"Instrument Serif"', color: C.ink });
  g.restore();
}
export function book(x, y, w, open = 0, o = {}) {
  const { torn = false } = o;
  const h = w * 1.4;
  g.save(); g.translate(x, y);
  g.fillStyle = '#5B2E2A'; rrect(g, -w / 2, -h / 2, w, h, 8 * u); g.fill();
  g.strokeStyle = '#C9A94A'; g.lineWidth = 3 * u; g.strokeRect(-w / 2 + 20 * u, -h / 2 + 20 * u, w - 40 * u, h - 40 * u);
  text(g, 'Rubaiyat', 0, -h * 0.12, { size: w * 0.15, weight: 400, family: '"Instrument Serif"', color: '#E3C981' });
  text(g, 'of Omar Khayyam', 0, -h * 0.02, { size: w * 0.08, weight: 400, family: '"Instrument Serif"', color: '#E3C981' });
  g.restore();
}
// the five pencilled lines from the back of the book (line 2 was crossed out in the original)
export const CODE = ['WRGOABABD', 'MLIAOI', 'WTBIMPANETP', 'MLIABOAIAQC', 'ITTMTSAMSTGAB'];
export function codeCard(x, y, t, o = {}) {
  const { size = 72 * u, cps = 14, hot = -1 } = o;
  g.save(); g.translate(x, y);
  g.fillStyle = '#F4EEDF'; rrect(g, -440 * u, -60 * u, 880 * u, 5 * size * 1.3 + 80 * u, 6 * u); g.fill();
  CODE.forEach((line, i) => {
    const yy = 40 * u + i * size * 1.3, at = i * 0.7;
    typewriter(line, -390 * u, yy, t - at, { size, weight: 400, family: '"Instrument Serif"', color: i === hot ? C.red : C.ink, cps });
    if (i === 1 && t > at + line.length / cps + 0.2) { g.fillStyle = C.ink; g.fillRect(-395 * u, yy - size * 0.32, 300 * u, 5 * u); }
  });
  g.restore();
}
// Australia, stylised
const AUS = [[-10.7, 142.5], [-12.5, 141.6], [-17.5, 140.8], [-15, 136], [-12, 136.8], [-12.2, 131], [-14, 129.5], [-15, 128], [-14, 126], [-17, 122.2],
  [-20.3, 118.6], [-22, 114], [-24, 113.5], [-26.5, 113.5], [-29, 114.9], [-32, 115.7], [-34.3, 115.1], [-35, 117.9], [-34, 123], [-31.6, 131],
  [-32.5, 134], [-34.9, 135.6], [-33, 137.8], [-34.2, 138.1], [-34.6, 138.45], [-35.1, 138.5], [-35.6, 138.2], [-37.5, 140], [-38.4, 142],
  [-38.3, 144.6], [-37.9, 144.9], [-38.6, 146.3], [-37.5, 149.9], [-34, 151.2], [-32, 152.5], [-28, 153.6], [-25, 152.7], [-22, 150], [-19.3, 146.8], [-16.9, 145.8], [-14, 143.5]];
const TAS = [[-40.8, 144.7], [-41, 148.3], [-43.2, 148], [-43.5, 146.5], [-41.5, 144.6]];
export const PLACE = { adelaide: [-34.93, 138.6], somerton: [-35.0, 138.51], melbourne: [-37.81, 144.96] };
export const mapAus = (cam, o = {}) => map(cam, { lands: [AUS, TAS], grid: 5, ...o });

// plaster bust (head and shoulders, eyes closed)
export function bust(x, y, s) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = '#E8E3D8'; g.beginPath(); g.ellipse(0, -0.95, 0.42, 0.52, 0, 0, 7); g.fill();
  g.beginPath(); g.moveTo(-0.9, 0.6); g.quadraticCurveTo(-0.8, -0.35, -0.2, -0.45); g.lineTo(0.2, -0.45); g.quadraticCurveTo(0.8, -0.35, 0.9, 0.6); g.closePath(); g.fill();
  g.strokeStyle = '#B9B2A2'; g.lineWidth = 0.025;
  g.beginPath(); g.moveTo(-0.22, -1.0); g.quadraticCurveTo(-0.13, -0.97, -0.05, -1.0); g.moveTo(0.05, -1.0); g.quadraticCurveTo(0.13, -0.97, 0.22, -1.0); g.stroke();
  g.beginPath(); g.moveTo(0, -0.95); g.lineTo(-0.04, -0.78); g.lineTo(0.04, -0.78); g.stroke();
  g.beginPath(); g.moveTo(-0.12, -0.66); g.lineTo(0.12, -0.66); g.stroke();
  g.restore();
}
export function suitcase(x, y, s, open = 0) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = '#6A4A2E'; rrect(g, -1, -0.6, 2, 1.2, 0.08); g.fill();
  g.strokeStyle = '#4A321E'; g.lineWidth = 0.06; g.beginPath(); g.moveTo(-1, -0.1); g.lineTo(1, -0.1); g.stroke();
  g.fillStyle = '#B79B5A'; g.fillRect(-0.7, -0.66, 0.16, 0.14); g.fillRect(0.54, -0.66, 0.16, 0.14);
  g.strokeStyle = '#4A321E'; g.lineWidth = 0.08; g.beginPath(); g.arc(0, -0.7, 0.22, Math.PI, 0); g.stroke();
  g.restore();
}
