// scenes/props.js — Banco Central heist props: street cross-section, tunnel, vault, money bricks, trucks, Brazil.
import { g, u, W, H, C, SERIF, THAI, spring, clamp, hash, noise, text, rrect, map } from './kit.js';

export const SOIL = '#6B4A30', SOIL2 = '#57391F', CONC = '#8E8B85', GREEN = '#3E8E5A', NOTE = '#B9C99A';

// Cross-section: houses and the bank above ground, soil below, a tunnel dug to progress p (0..1).
export const XS = { ground: 1000, depth: 1260, houseX: 120, bankX: 820, vaultX: 760, vaultW: 260 };
export function section(t, p, o = {}) {
  const { lit = 1, breach = 0, zoom = 1, band = true } = o;
  const gy = XS.ground * u, ty = XS.depth * u;
  g.fillStyle = '#0B1420'; g.fillRect(0, 0, W, gy);
  // street level
  g.fillStyle = '#1C2533'; g.fillRect(0, gy - 20 * u, W, 20 * u);
  // the rented house with the grass sign
  g.fillStyle = '#2A3446'; g.fillRect(XS.houseX * u - 60 * u, gy - 260 * u, 260 * u, 240 * u);
  g.beginPath(); g.moveTo(XS.houseX * u - 80 * u, gy - 250 * u); g.lineTo(XS.houseX * u + 70 * u, gy - 360 * u); g.lineTo(XS.houseX * u + 220 * u, gy - 250 * u); g.fill();
  g.fillStyle = GREEN; rrect(g, XS.houseX * u - 50 * u, gy - 220 * u, 240 * u, 60 * u, 8 * u); g.fill();
  text(g, 'GRAMA SINTÉTICA', XS.houseX * u + 70 * u, gy - 180 * u, { size: 24 * u, weight: 800, family: 'Inter, sans-serif', color: '#F2F6EE' });
  // the bank
  g.fillStyle = '#323C4E'; g.fillRect(XS.bankX * u - 240 * u, gy - 420 * u, 460 * u, 400 * u);
  for (let i = 0; i < 4; i++) g.fillStyle = '#26303F', g.fillRect(XS.bankX * u - 210 * u + i * 110 * u, gy - 380 * u, 60 * u, 340 * u);
  text(g, 'BANCO CENTRAL', XS.bankX * u - 10 * u, gy - 430 * u, { size: 34 * u, weight: 800, family: 'Inter, sans-serif', color: C.fog });
  // soil
  g.fillStyle = SOIL; g.fillRect(0, gy, W, H - gy);
  g.fillStyle = SOIL2; for (let i = 0; i < 180; i++) { g.beginPath(); g.arc(hash(i, 1) * W, gy + 20 * u + hash(i, 2) * (H - gy), (2 + hash(i, 3) * 6) * u, 0, 7); g.fill(); }
  // vault under the bank
  g.fillStyle = CONC; g.fillRect(XS.vaultX * u - 30 * u, gy, XS.vaultW * u + 60 * u, ty - gy + 120 * u);
  g.fillStyle = '#2B2D31'; g.fillRect(XS.vaultX * u, gy + 30 * u, XS.vaultW * u, ty - gy + 30 * u);
  for (let i = 0; i < 5; i++) { g.fillStyle = '#4C5A3A'; g.fillRect(XS.vaultX * u + 20 * u + i * 46 * u, ty - 30 * u, 36 * u, 60 * u); }
  // shaft + tunnel
  const sx = XS.houseX * u + 70 * u;
  const shaft = clamp(p * 4), run = clamp((p - 0.25) / 0.75);
  g.fillStyle = '#20150C'; g.fillRect(sx - 34 * u, gy, 68 * u, (ty - gy + 34 * u) * shaft);
  const tx1 = sx + (XS.vaultX * u - sx + 20 * u) * run;
  if (run > 0) {
    g.fillRect(sx - 34 * u, ty - 34 * u, tx1 - sx + 34 * u, 68 * u);
    g.fillStyle = '#9C7A4E'; for (let x = sx; x < tx1; x += 46 * u) g.fillRect(x, ty - 34 * u, 6 * u, 68 * u);
    g.fillStyle = `rgba(255,214,120,${0.8 * lit})`; for (let x = sx + 23 * u; x < tx1; x += 92 * u) { g.beginPath(); g.arc(x, ty - 22 * u, 5 * u, 0, 7); g.fill(); }
  }
  if (breach > 0) { g.fillStyle = '#20150C'; g.fillRect(XS.vaultX * u + 10 * u, ty - 34 * u, 70 * u, 68 * u * clamp(breach)); }
  if (band) { g.fillStyle = 'rgba(11,20,32,0.82)'; g.fillRect(0, 1390 * u, W, 240 * u); }
}
export function brick(x, y, s, rot = 0, color = NOTE) {     // a strapped bundle of R$50 notes
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  g.fillStyle = color; g.fillRect(-0.5, -0.24, 1, 0.48);
  g.fillStyle = 'rgba(0,0,0,0.12)'; for (let i = 0; i < 6; i++) g.fillRect(-0.5, -0.24 + i * 0.08, 1, 0.012);
  g.fillStyle = '#E6D9B3'; g.fillRect(-0.06, -0.25, 0.12, 0.5);
  text(g, '50', -0.32, 0.08, { size: 0.2, weight: 400, family: SERIF, color: '#3E4A2E' });
  g.restore();
}
export function truck(x, y, s, color = '#2A3446', cars = 3) {
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color;
  g.fillRect(-1.2, -0.25, 1.9, 0.12); rrect(g, 0.75, -0.55, 0.45, 0.5, 0.06); g.fill();
  g.fillStyle = '#9CC0D8'; g.fillRect(0.95, -0.48, 0.2, 0.16);
  g.fillStyle = '#0E1118'; for (const wx of [-1.0, -0.6, 0.3, 1.0]) { g.beginPath(); g.arc(wx, -0.05, 0.1, 0, 7); g.fill(); }
  for (let i = 0; i < cars; i++) { g.fillStyle = ['#C8321E', '#EFE6D2', '#5D7083'][i % 3]; rrect(g, -1.15 + i * 0.6, -0.48, 0.52, 0.2, 0.08); g.fill(); }
  g.restore();
}
const BRAZIL = [[5.2, -60.2], [4.4, -51.6], [1.8, -50.0], [-0.1, -49.3], [-1.3, -46.0], [-2.5, -44.3], [-2.8, -40.0], [-3.7, -38.5], [-5.1, -35.5],
  [-8.0, -34.9], [-10.5, -36.4], [-13.0, -38.5], [-17.9, -39.3], [-20.3, -40.3], [-22.9, -42.0], [-23.0, -43.2], [-24.0, -46.4], [-25.9, -48.6],
  [-28.5, -48.8], [-30.0, -50.3], [-33.7, -53.4], [-30.2, -57.6], [-27.3, -55.7], [-25.6, -54.6], [-22.0, -57.9], [-19.9, -58.1], [-16.3, -60.0],
  [-13.6, -61.0], [-11.0, -65.3], [-9.8, -66.7], [-10.9, -70.6], [-9.4, -73.0], [-4.3, -69.9], [-1.1, -69.5], [1.7, -69.8], [1.2, -66.8], [2.2, -64.2], [4.0, -64.6]];
export const PLACE = { fortaleza: [-3.73, -38.52], mg: [-19.9, -43.9], rio: [-22.9, -43.2] };
export const mapBrazil = (cam, o = {}) => map(cam, { lands: [BRAZIL], grid: 5, ...o });
