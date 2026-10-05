// Dancing plague of 1518 — Act 1: 0:00–1:30 (bars 0–36).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, map } from './kit.js';

// a dancing figure: limbs swing on the beat; e = exhaustion 0..1 slows and droops
export function dancer(x, y, s, t, o = {}) {
  const { color = C.ink, phase = 0, e = 0 } = o;
  const b = (t / BEAT) * Math.PI + phase, amp = 1 - e * 0.7;
  g.save(); g.translate(x, y + Math.abs(Math.sin(b)) * -0.08 * s * amp); g.scale(s, s); g.rotate(Math.sin(b * 0.5) * 0.12 * amp + e * 0.25);
  g.fillStyle = color; g.strokeStyle = color; g.lineCap = 'round'; g.lineWidth = 0.09;
  g.beginPath(); g.arc(0, -1.55, 0.16, 0, 7); g.fill();
  g.beginPath(); g.moveTo(0, -1.38); g.lineTo(0, -0.7); g.stroke();
  const arm = (sd) => { const a = (Math.sin(b + sd) * 1.1 + 1.6) * amp + (1 - amp) * 0.3; g.beginPath(); g.moveTo(0, -1.25); g.lineTo(sd * Math.sin(a) * 0.45, -1.25 - Math.cos(a) * 0.45); g.stroke(); };
  arm(1); arm(-1);
  const leg = (sd) => { const a = Math.sin(b + (sd > 0 ? 0 : Math.PI)) * 0.5 * amp; g.beginPath(); g.moveTo(0, -0.7); g.lineTo(sd * 0.15 + Math.sin(a) * 0.3, 0); g.stroke(); };
  leg(1); leg(-1);
  g.fillStyle = 'rgba(200,50,30,0.9)'; g.beginPath(); g.moveTo(-0.22, -1.3); g.lineTo(0.22, -1.3); g.lineTo(0.3, -0.75); g.lineTo(-0.3, -0.75); g.closePath(); if (o.dress) g.fill();
  g.restore();
}
// timber-framed old town street
export function street(t, o = {}) {
  const { dark = 0 } = o;
  g.fillStyle = dark ? '#1A1512' : '#D9C9A6'; g.fillRect(0, 0, W, H);
  const cols = ['#E8DCC0', '#D8C4A0', '#E2D2B2', '#CDB892'];
  for (let i = 0; i < 6; i++) { const x = -40 * u + i * 200 * u, h = (620 + hash(i, 3) * 220) * u, y = 1250 * u - h;
    g.fillStyle = dark ? '#2A221C' : cols[i % 4]; g.fillRect(x, y, 190 * u, h);
    g.beginPath(); g.moveTo(x - 10 * u, y); g.lineTo(x + 95 * u, y - 120 * u); g.lineTo(x + 200 * u, y); g.fill();
    g.strokeStyle = dark ? '#120E0B' : '#5A4632'; g.lineWidth = 8 * u;
    g.strokeRect(x, y, 190 * u, h); g.beginPath(); g.moveTo(x, y + h * 0.33); g.lineTo(x + 190 * u, y + h * 0.33); g.moveTo(x, y + h * 0.66); g.lineTo(x + 190 * u, y + h * 0.66); g.moveTo(x, y); g.lineTo(x + 190 * u, y + h * 0.33); g.stroke();
    g.fillStyle = dark ? '#E9C66B' : '#4A5866'; g.fillRect(x + 60 * u, y + h * 0.42, 60 * u, 70 * u); }
  g.fillStyle = dark ? '#100C09' : '#8A7A62'; g.fillRect(0, 1250 * u, W, H - 1250 * u);
  g.fillStyle = dark ? '#1A1512' : '#9C8C72'; for (let i = 0; i < 60; i++) { g.beginPath(); g.ellipse(hash(i, 5) * W, 1280 * u + hash(i, 6) * 600 * u, 30 * u, 12 * u, 0, 0, 7); g.fill(); }
}
const EUR = [[48.0, 7.5], [48.0, 8.3], [48.9, 8.2], [49.0, 7.6], [48.6, 7.3]];

export default () => [
  { from: bar(0), to: bar(2), cues: [[0, 'thump', 0.6], [0.625, 'thump', 0.5], [1.25, 'thump', 0.6], [1.875, 'thump', 0.5]],
    draw(t) {
      street(t);
      for (let i = 0; i < 7; i++) { const at = 0.2 + i * 0.25; if (t < at) continue; dancer(160 * u + i * 125 * u, 1400 * u + (i % 2) * 60 * u, 150 * u, t, { phase: i * 0.7, color: '#2A2016', dress: i % 2 === 0 }); }
      g.fillStyle = 'rgba(239,230,210,0.85)'; g.fillRect(0, 180 * u, W, 330 * u);
      big('1518', TX, 400 * u, t - 0.1, { size: 220 * u, color: C.red });
      say('คนทั้งเมืองเต้นรำ… จนหยุดไม่ได้', TX, 1700 * u - 140 * u, t - 1.4, { size: 46 * u, weight: 800, color: C.ink });
      finish(0.5);
    } },
  { from: bar(2), to: bar(4), cues: [[0, 'thump', 0.6], [2.5, 'swish', 0.5]],
    draw(t) {
      paper();
      dancer(TX, 1100 * u, 300 * u, t, { e: clamp(t / 4), color: C.inkSoft, dress: true });
      say('บางคนเต้นติดต่อกันหลายวัน', TX, 360 * u, t - 0.1, { size: 58 * u, weight: 800 });
      say('จนล้มหมดแรง', TX, 1300 * u, t - 2.5, { size: 64 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 380 * u, 90 * u, 14 * u); g.fill();
      text(g, 'STRASSBURG · ANNO 1518', 260 * u, 472 * u, { size: 28 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 2 * u });
      g.restore();
      say('โรคระบาดการเต้นรำ', TX, 760 * u, t - 0.25, { size: 70 * u, weight: 800 });
      stamp('UNEXPLAINED', TX, 1080 * u, t - 2.5, { size: 120 * u, rot: -0.1 });
      say('500 ปีผ่านไป ยังไม่มีใครอธิบายได้แน่ชัด', TX, 1380 * u, t - 3.0, { size: 44 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  { from: bar(6), to: bar(9), cues: [[0.2, 'whoosh', 0.6], [2.5, 'pop', 0.8]],
    draw(t) {
      paper();
      // schematic: the Rhine and the city
      g.strokeStyle = '#7A93A6'; g.lineWidth = 20 * u; g.beginPath(); g.moveTo(780 * u, 300 * u); g.bezierCurveTo(700 * u, 700 * u, 860 * u, 1000 * u, 760 * u, 1500 * u); g.stroke();
      const s = clamp(spring(t - 1.2, 'heavy'));
      g.fillStyle = 'rgba(200,50,30,0.2)'; g.beginPath(); g.arc(520 * u, 900 * u, 180 * u * s, 0, 7); g.fill();
      g.strokeStyle = C.red; g.lineWidth = 6 * u; g.stroke();
      text(g, 'แม่น้ำไรน์', 850 * u, 560 * u, { size: 34 * u, weight: 700, family: THAI, color: '#4A6070' });
      pin(520 * u, 900 * u, t - 2.5, { label: 'สตราสบูร์ก', labelColor: C.ink, side: -1 });
      kicker('จักรวรรดิโรมันอันศักดิ์สิทธิ์ · ปัจจุบันคือฝรั่งเศส', TX, 300 * u, t);
      say('เมืองสตราสบูร์ก ปี 1518', TX, 410 * u, t - 0.2, { size: 56 * u, weight: 800 });
      say('ชาวเมืองเพิ่งผ่านความอดอยาก\nโรคระบาด และฤดูหนาวที่โหดร้าย', TX, 1300 * u, t - 3.5, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(9), to: bar(10), cues: Array.from({ length: 5 }, (_, i) => [i * 0.15, 'tick', 0.6]).concat([[1.0, 'thump', 0.6]]),
    draw(t) {
      paper(); kicker('กรกฎาคม 1518', TX, 420 * u, t);
      const d = ['10', '11', '12', '13', '14'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.15), t, { size: 360 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('ในตรอกแคบ ๆ หน้าบ้านหลังหนึ่ง', TX, 1240 * u, t - 1.0, { size: 52 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(10), to: bar(14), cues: Array.from({ length: 16 }, (_, i) => [i * 0.625, 'thump', 0.35]),
    draw(t) {
      street(t);
      dancer(TX, 1450 * u, 240 * u, t, { color: '#2A2016', dress: true });
      g.fillStyle = 'rgba(239,230,210,0.88)'; g.fillRect(0, 200 * u, W, 300 * u);
      kicker('Frau Troffea', TX, 300 * u, t, { color: C.red });
      say('ผู้หญิงคนหนึ่งเริ่มเต้นรำบนถนน', TX, 410 * u, t - 0.2, { size: 52 * u, weight: 800, color: C.ink });
      g.fillStyle = 'rgba(239,230,210,0.88)'; if (t > 5) g.fillRect(0, 1580 * u, W, 130 * u);
      say('ไม่มีดนตรี ไม่มีเหตุผล · ไม่ยอมหยุด', TX, 1660 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.red });
      finish(0.5);
    } },
  { from: bar(14), to: bar(18), cues: Array.from({ length: 16 }, (_, i) => [i * 0.625, 'thump', 0.35]).concat([[7.5, 'impact', 0.8]]),
    draw(t) {
      street(t);
      const n = Math.min(34, Math.floor(remap(t, 0.2, 7.5) * 34) + 1);
      for (let i = 0; i < n; i++) { const c = i % 9, r = Math.floor(i / 9); dancer(80 * u + c * 115 * u + (r % 2) * 50 * u, 1330 * u + r * 110 * u, 110 * u, t, { phase: i * 1.3, color: '#2A2016', dress: i % 3 === 0 }); }
      g.fillStyle = 'rgba(239,230,210,0.88)'; g.fillRect(0, 200 * u, W, 300 * u);
      kicker('ภายในหนึ่งสัปดาห์', TX, 300 * u, t, { color: C.red });
      text(g, `${n} คน`, TX, 450 * u, { size: 110 * u, weight: 400, family: SERIF, color: C.ink });
      finish(0.5);
    } },
];
