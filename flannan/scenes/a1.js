// Flannan Isles — whole film. Act 1: 0:00–1:30 (bars 0–36).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, clouds, rain, map } from './kit.js';

export function sea(t, y0, rough = 1) {
  g.fillStyle = '#0B1A26'; g.fillRect(0, y0, W, H - y0);
  g.strokeStyle = 'rgba(170,190,205,0.45)'; g.lineWidth = 3 * u;
  for (let r = 0; r < 11; r++) { const y = y0 + 16 * u + r * r * 8 * u; g.beginPath(); for (let x = 0; x <= W; x += 14 * u) { const yy = y + Math.sin(x / (38 * u) + t * (1.6 + r * 0.2) + r) * (3 + r * 1.4) * u * rough; x ? g.lineTo(x, yy) : g.moveTo(x, yy); } g.stroke(); }
}
// the island: cliffs with the lighthouse on top; beam 0..1 on/off
export function island(t, o = {}) {
  const { beam = 1, y = 1180 * u, s = 1 } = o;
  g.save(); g.translate(TX, y); g.scale(s, s);
  g.fillStyle = '#16241C'; g.beginPath(); g.moveTo(-560 * u, 120 * u); g.lineTo(-420 * u, -120 * u); g.lineTo(-200 * u, -200 * u); g.lineTo(150 * u, -220 * u); g.lineTo(380 * u, -150 * u); g.lineTo(560 * u, 120 * u); g.closePath(); g.fill();
  g.fillStyle = '#E8E1CF'; g.fillRect(-40 * u, -440 * u, 80 * u, 230 * u);
  g.fillStyle = '#2B2D33'; g.fillRect(-56 * u, -480 * u, 112 * u, 46 * u);
  g.fillStyle = '#C9B98F'; g.fillRect(-120 * u, -270 * u, 80 * u, 60 * u); g.fillRect(40 * u, -270 * u, 100 * u, 60 * u);
  if (beam > 0) { const a = t * 1.6; g.save(); g.translate(0, -456 * u); g.globalAlpha = 0.28 * beam;
    g.fillStyle = '#F6E7A8'; g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(a) * 1400 * u, Math.sin(a) * 120 * u - 60 * u); g.lineTo(Math.cos(a) * 1400 * u, Math.sin(a) * 120 * u + 60 * u); g.closePath(); g.fill();
    g.globalAlpha = beam; g.fillStyle = '#F6E7A8'; g.beginPath(); g.arc(0, 0, 18 * u, 0, 7); g.fill(); g.restore(); }
  g.restore();
}
const LEWIS = [[58.52, -6.26], [58.3, -6.17], [58.2, -6.37], [58.0, -6.42], [57.85, -6.75], [57.75, -7.05], [58.0, -7.05], [58.17, -6.95], [58.25, -6.8], [58.38, -6.5]];
const SCOT = [[58.6, -5.0], [58.6, -3.0], [57.7, -1.8], [56.5, -2.6], [56, -3.5], [55, -1.5], [54.5, -3.6], [55.5, -5.0], [56.4, -6.2], [57.2, -5.8], [57.7, -5.8], [58.2, -5.3]];
const SKYE = [[57.68, -6.3], [57.5, -6.75], [57.2, -6.4], [57.1, -5.9], [57.3, -5.8]];
const UIST = [[57.75, -7.15], [57.6, -7.5], [57.3, -7.4], [57.05, -7.35], [57.3, -7.2], [57.6, -7.05]];
export const PL = { flannan: [58.29, -7.59], lewis: [58.2, -6.4], oban: [56.41, -5.47] };
export const mapHeb = (cam, o = {}) => map(cam, { lands: [LEWIS, SCOT, SKYE, UIST], grid: 1, ...o });

export default () => [
  { from: bar(0), to: bar(2), cues: [[0, 'whoosh', 0.6], [1.0, 'impact', 0.9], [1.8, 'type', 0.4]],
    draw(t) {
      night('#071019'); clouds(t * 50 * u, { alpha: 0.6, seed: 9, color: C.night2 }); sea(t, 1250 * u, 1.6);
      island(t, { beam: t < 1.0 ? 1 : 0 });
      rain(t, { n: 140, alpha: 0.35, angle: 0.5 });
      big('3 คน', TX, 330 * u, t - 1.0, { size: 160 * u, color: C.red });
      say('ผู้ดูแลประภาคารหายไปทั้งหมด\nบนเกาะกลางทะเลที่ไม่มีใครอื่น', TX, 1450 * u, t - 1.8, { size: 46 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(2), to: bar(4), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 440 * u, 90 * u, 14 * u); g.fill();
      text(g, 'NORTHERN LIGHTHOUSE BOARD', 290 * u, 472 * u, { size: 26 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 2 * u });
      g.restore();
      say('ไม่เคยพบศพแม้แต่คนเดียว', TX, 760 * u, t - 0.25, { size: 62 * u, weight: 800 });
      stamp('MISSING', TX, 1080 * u, t - 2.5, { size: 160 * u, rot: -0.1 });
      say('และเรื่องเล่าที่ตามมา ยิ่งทำให้มันน่ากลัวขึ้น', TX, 1380 * u, t - 3.0, { size: 42 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  { from: bar(4), to: bar(7), cues: [[0.2, 'whoosh', 0.6], [2.5, 'pop', 0.8]],
    draw(t) {
      const cam = { lat: track(t, [[0, 56.8], [0.1, 58.1]], 'heavy'), lon: track(t, [[0, -4.5], [0.1, -6.9]], 'heavy'), z: track(t, [[0, 140], [0.1, 520]], 'heavy') * u };
      const P = mapHeb(cam, { grid: 0.5 }); topScrim();
      g.fillStyle = '#C9B98F'; const [fx, fy] = P(PL.flannan); g.beginPath(); g.arc(fx, fy, 8 * u, 0, 7); g.fill();
      pin(fx, fy, t - 2.5, { label: 'หมู่เกาะ Flannan', side: 1 });
      kicker('สกอตแลนด์ · เฮบริดีสด้านนอก', TX, 250 * u, t, { color: C.red });
      say('เกาะ Eilean Mòr ไม่มีคนอาศัย', TX, 345 * u, t - 0.3, { size: 52 * u, weight: 800, color: C.cream });
      say('ห่างจากเกาะ Lewis ราว 30 กม.', TX, 1500 * u, t - 3.5, { size: 48 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(7), to: bar(10), cues: [[0.2, 'pop', 0.5], [1.0, 'pop', 0.5], [1.8, 'pop', 0.5], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      [['James Ducat', 'หัวหน้า · อายุ 43'], ['Thomas Marshall', 'ผู้ช่วย'], ['Donald MacArthur', 'ผู้ดูแลชั่วคราว']].forEach(([n, r], i) => {
        const p = spring(t - 0.2 - i * 0.8, 'playful'); if (p <= 0) return;
        const x = TX - 300 * u + i * 300 * u; person(x, 900 * u, 110 * u * p, C.inkSoft);
        text(g, n, x, 1010 * u, { size: 36 * u, weight: 400, family: SERIF, color: C.ink });
        text(g, r, x, 1060 * u, { size: 30 * u, weight: 600, family: THAI, color: C.inkSoft }); });
      say('ประภาคารเพิ่งเปิดใช้ปี 1899', TX, 360 * u, t - 0.1, { size: 54 * u, weight: 800 });
      say('ผู้ดูแล 3 คน ผลัดกันจุดไฟทุกคืน', TX, 1260 * u, t - 3.0, { size: 50 * u, weight: 800 });
      say('เรือส่งเสบียงมาเปลี่ยนเวรทุก 2 สัปดาห์', TX, 1370 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- the dark light
  { from: bar(10), to: bar(11), cues: Array.from({ length: 5 }, (_, i) => [i * 0.15, 'tick', 0.6]).concat([[1.0, 'thump', 0.6]]),
    draw(t) {
      paper(); kicker('ธันวาคม 1900', TX, 420 * u, t);
      const d = ['11', '12', '13', '14', '15'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.15), t, { size: 360 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('คืนที่มีพายุรุนแรง', TX, 1240 * u, t - 1.0, { size: 56 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(11), to: bar(14), cues: [[0.2, 'whoosh', 0.5], [2.5, 'thump', 0.7], [5.0, 'thump', 0.6]],
    draw(t) {
      night('#05090F'); clouds(t * 80 * u, { alpha: 0.6, seed: 2, color: C.night2 }); sea(t, 1250 * u, 2);
      island(t, { beam: 0 });
      // a passing steamer
      g.save(); g.translate(-200 * u + t * 90 * u, 1270 * u); g.fillStyle = '#1C2638'; g.fillRect(-120 * u, -30 * u, 240 * u, 30 * u); g.fillRect(-30 * u, -70 * u, 40 * u, 40 * u);
      g.fillStyle = '#E9C66B'; g.fillRect(-90 * u, -22 * u, 10 * u, 8 * u); g.fillRect(-60 * u, -22 * u, 10 * u, 8 * u); g.restore();
      rain(t, { n: 160, alpha: 0.35, angle: 0.5 });
      kicker('15 ธ.ค. 1900', TX, 300 * u, t, { color: C.red });
      say('เรือกลไฟที่แล่นผ่านสังเกตว่า', TX, 410 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      say('ประภาคารไม่ได้เปิดไฟ', TX, 520 * u, t - 2.5, { size: 64 * u, weight: 800, color: C.red });
      say('แต่ไม่มีใครรีบไปตรวจดู', TX, 1520 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(14), to: bar(18), cues: Array.from({ length: 8 }, (_, i) => [0.3 + i * 0.6, 'whoosh', 0.3]),
    draw(t) {
      night('#05090F'); sea(t, 900 * u, 2.6); rain(t, { n: 200, alpha: 0.4, angle: 0.6 });
      kicker('พายุทำให้เรือออกไม่ได้', TX, 300 * u, t, { color: C.red });
      const days = Math.min(26, 15 + Math.floor(remap(t, 0.3, 6) * 11));
      text(g, `${days} ธ.ค.`, TX, 700 * u, { size: 150 * u, weight: 400, family: SERIF, color: C.cream });
      say('เรือเปลี่ยนเวรต้องรอถึง 11 วัน', TX, 1500 * u, t - 4.0, { size: 50 * u, weight: 800, color: C.cream });
      finish();
    } },
  // ---------------- arrival
  { from: bar(18), to: bar(22), cues: [[0.2, 'whoosh', 0.5], [2.5, 'click', 0.6], [5.0, 'thump', 0.6], [7.5, 'thump', 0.6]],
    draw(t) {
      night('#0A1420'); sea(t, 1250 * u, 1.2);
      island(t, { beam: 0 });
      g.save(); g.translate(TX + 400 * u - t * 20 * u, 1290 * u); g.fillStyle = '#2A3446'; g.fillRect(-160 * u, -40 * u, 320 * u, 40 * u); g.fillRect(-20 * u, -120 * u, 50 * u, 80 * u); g.restore();
      kicker('26 ธ.ค. 1900 · เรือ Hesperus มาถึง', TX, 300 * u, t, { color: C.red });
      say('ไม่มีธงต้อนรับ ไม่มีใครลงมารับ', TX, 410 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      say('เป่าหวูด ยิงพลุสัญญาณ', TX, 1500 * u, t - 2.5, { size: 48 * u, weight: 800, color: C.cream });
      say('ไม่มีเสียงตอบ', TX, 1600 * u, t - 5.0, { size: 56 * u, weight: 800, color: C.red });
      finish();
    } },
];
