// Elisa Lam — Act 2: 0:45–3:00 (bars 18–72). Missing, the video, the rooftop, the coroner, the internet, the lesson.
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, measure } from './kit.js';
import { E, sky, skyline, tank, facade, figure, elevator, recreation, band, phone } from './a1.js';
const INTER = 'Inter, sans-serif';

// Rooftop at night: skyline behind a parapet, a row of water tanks. o.beam lights the hatch of tank `focus`.
function rooftop(t, o = {}) {
  const { base = 1380 * u, beam = 0, focus = 1, hatch = 0, seed = 12 } = o;
  sky(t, { top: '#05070C', bot: '#1B2234', stars: 0.6 });
  skyline(base - 160 * u, t, { seed, hmin: 220, hvar: 780, lit: 0.16, color: '#0D1018' });
  skyline(base - 120 * u, t, { seed: seed + 7, hmin: 80, hvar: 260, lit: 0.22, color: '#0A0C13' });
  g.fillStyle = '#121419'; g.fillRect(0, base - 130 * u, W, H);                       // roof deck
  g.fillStyle = '#1A1C22'; g.fillRect(0, base - 150 * u, W, 26 * u);                 // parapet
  [[190, 360], [520, 430], [850, 360]].forEach(([x, s], i) => tank(x * u, base + 40 * u, s * u, { hatch: i === focus ? hatch : 0, beam: i === focus ? beam : 0 }));
  g.fillStyle = '#0B0C10'; g.fillRect(0, base + 40 * u, W, H);
}
// Comment row used on the phone feed. struck 0..1 draws a red line through it.
function comment(x, y, w, str, i, a, struck = 0) {
  if (a <= 0) return;
  g.save(); g.globalAlpha = clamp(a); g.translate((1 - clamp(a)) * 40 * u, 0);
  g.fillStyle = ['#5A6B8C', '#8C6A5A', '#6A8C70', '#7A5A8C', '#8C8A5A'][i % 5]; g.beginPath(); g.arc(x + 34 * u, y, 24 * u, 0, 7); g.fill();
  g.fillStyle = '#2A2F3A'; g.fillRect(x + 72 * u, y - 26 * u, 120 * u, 10 * u);
  text(g, str, x + 72 * u, y + 20 * u, { size: 32 * u, weight: 700, family: THAI, color: C.cream, align: 'left' });
  if (struck > 0) { const sw = measure(g, str, { size: 32 * u, weight: 700, family: THAI });
    g.fillStyle = E.neon; g.fillRect(x + 66 * u, y + 8 * u, (sw + 12 * u) * clamp(struck), 5 * u); }
  g.restore();
}
// Pill capsule.
function pill(x, y, s, rot, col) {
  g.save(); g.translate(x, y); g.rotate(rot);
  rrect(g, -s, -s * 0.42, s * 2, s * 0.84, s * 0.42); g.fillStyle = C.cream; g.fill();
  g.save(); g.beginPath(); g.rect(0, -s, s * 1.2, s * 2); g.clip(); rrect(g, -s, -s * 0.42, s * 2, s * 0.84, s * 0.42); g.fillStyle = col; g.fill(); g.restore();
  g.restore();
}
// Missing-person flyer, faceless (silhouette placeholder only).
function flyer(x, y, w, rot, t) {
  const h = w * 1.3;
  g.save(); g.translate(x, y); g.rotate(rot);
  g.fillStyle = 'rgba(0,0,0,0.4)'; g.fillRect(-w / 2 + 12 * u, -h / 2 + 16 * u, w, h);
  g.fillStyle = '#ECE6D6'; g.fillRect(-w / 2, -h / 2, w, h);
  text(g, 'MISSING', 0, -h / 2 + w * 0.17, { size: w * 0.15, weight: 400, family: SERIF, color: '#B42A1C', tracking: 3 * u });
  g.fillStyle = '#C9C1AE'; g.fillRect(-w * 0.28, -h / 2 + w * 0.26, w * 0.56, w * 0.56);
  person(0, -h / 2 + w * 0.82, w * 0.2, '#8F8673');
  text(g, 'ELISA LAM · 21', 0, -h / 2 + w * 0.97, { size: w * 0.075, weight: 700, family: INTER, color: '#2A2620', tracking: 2 * u });
  g.fillStyle = 'rgba(42,38,32,0.35)'; for (let r = 0; r < 4; r++) g.fillRect(-w * 0.36, -h / 2 + w * (1.05 + r * 0.055), w * (r === 3 ? 0.4 : 0.72), w * 0.018);
  g.restore();
}

export default () => [
  // ---------------- last contact
  { from: bar(18), to: bar(20), cues: [[0.2, 'tick', 0.5], [0.8, 'tick', 0.5], [1.4, 'tick', 0.5], [2.5, 'thump', 0.6]],
    draw(t) {
      night(E.sky);
      phone(TX, 1000 * u, 360 * u, (x, y, w, h) => {
        text(g, 'Elisa', x + w / 2, y + 130 * u, { size: 50 * u, weight: 400, family: SERIF, color: C.cream });
        const ring = Math.floor(t * 1.6) % 2 === 0 && t < 2.4;
        text(g, t < 2.4 ? 'กำลังโทร…' : 'ไม่มีผู้รับสาย', x + w / 2, y + 190 * u, { size: 30 * u, weight: 700, family: THAI, color: t < 2.4 ? C.fog : E.neon });
        for (let k = 0; k < 3; k++) { const q = ((t * 0.8 + k / 3) % 1); g.strokeStyle = `rgba(${E.cctvG},${ring ? (1 - q) * 0.6 : 0})`; g.lineWidth = 3 * u; g.beginPath(); g.arc(x + w / 2, y + h * 0.55, 60 * u + q * 90 * u, 0, 7); g.stroke(); }
        g.fillStyle = '#3A4458'; g.beginPath(); g.arc(x + w / 2, y + h * 0.55, 60 * u, 0, 7); g.fill();
        figure(x + w / 2, y + h * 0.55 + 46 * u, 110 * u, { color: '#1E2433' });
        g.fillStyle = E.neon; g.beginPath(); g.arc(x + w / 2, y + h - 110 * u, 44 * u, 0, 7); g.fill();
      });
      kicker('31 มกราคม 2013 (โดยประมาณ)', TX, 280 * u, t, { color: E.lamp });
      say('วันสุดท้ายที่มีคนเห็นเธอ', TX, 390 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      say('ตามรายงาน เธอติดต่อครอบครัวทุกวัน\nแล้วจู่ ๆ ก็เงียบหายไป', TX, 1470 * u, t - 2.5, { size: 42 * u, weight: 800, color: E.lamp });
      finish(0.8);
    } },
  // ---------------- missing
  { from: bar(20), to: bar(22), cues: [[0.2, 'whoosh', 0.5], [0.8, 'pop', 0.6], [1.6, 'pop', 0.6], [2.5, 'thump', 0.5]],
    draw(t) {
      night('#0B0E16');
      g.fillStyle = '#1C1A20'; g.fillRect(0, 0, W, H);
      g.strokeStyle = 'rgba(0,0,0,0.3)'; g.lineWidth = 3 * u; for (let i = 0; i < 30; i++) { g.beginPath(); g.moveTo(0, i * 70 * u); g.lineTo(W, i * 70 * u); g.stroke(); }
      [[300, 900, -0.08, 0.6], [760, 980, 0.07, 1.4], [520, 1000, -0.02, 0.2]].forEach(([x, y, r, at], i) => { const p = spring(t - at, 'snappy'); if (p <= 0) return;
        g.save(); g.translate(x * u, y * u); g.scale(1 + (1 - p) * 0.4, 1 + (1 - p) * 0.4); flyer(0, 0, 360 * u, r, t); g.restore(); });
      band(200 * u, 330 * u, 0.82);
      kicker('ครอบครัวแจ้งความ', TX, 280 * u, t, { color: E.lamp });
      say('ตำรวจ LAPD ติดใบประกาศคนหาย\nและค้นหาในโรงแรม', TX, 390 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      band(1420 * u, 160 * u, 0.82);
      say('แต่ไม่พบตัวเธอ', TX, 1520 * u, t - 2.5, { size: 50 * u, weight: 800, color: E.lamp });
      finish(0.8);
    } },
  // ---------------- the elevator video (re-creation)
  { from: bar(22), to: bar(26), cues: [[0.2, 'click', 0.5], [2.5, 'click', 0.6], [3.2, 'click', 0.5], [5.0, 'swish', 0.4], [7.5, 'thump', 0.5]],
    draw(t) {
      night(E.sky);
      // she enters, presses buttons, peeks out, steps out, steps back, gestures
      const fig = {
        x: track(t, [[0, 0.45], [2.0, 0.85], [3.6, 0.4], [6.0, 0.55]], 'default'),
        out: track(t, [[0, 0], [4.0, 1], [5.2, 0]], 'default'),
        armR: track(t, [[0, 0.15], [2.3, 1.6], [2.9, 0.2], [6.4, 2.3], [7.2, 0.6], [8.0, 2.0]], 'default'),
        armL: track(t, [[0, 0.15], [6.6, 2.4], [7.4, 0.5], [8.4, 1.8]], 'default'),
        step: track(t, [[0, 0], [3.8, 0.8], [5.4, 0]], 'default'),
      };
      const lit = t > 2.5 ? [2, 3, 4, 5, 6, 7].filter((k) => t > 2.4 + (k - 2) * 0.1) : [];
      elevator(80 * u, 560 * u, 840 * u, 760 * u, t, { fig, clock: 31 + t, lit });
      recreation(1370 * u, t - 0.3);
      kicker('กุมภาพันธ์ 2013 · ตำรวจเผยแพร่คลิป', TX, 280 * u, t, { color: E.lamp });
      say('ภาพจากกล้องในลิฟต์ของโรงแรม\nหวังให้มีคนช่วยให้เบาะแส', TX, 380 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      say('นี่เป็นภาพสุดท้ายของเธอที่มีการบันทึกไว้', TX, 1490 * u, t - 6.0, { size: 40 * u, weight: 800, color: E.lamp });
      finish(0.9);
    } },
  // ---------------- what the video shows: button panel
  { from: bar(26), to: bar(28), cues: Array.from({ length: 6 }, (_, i) => [0.3 + i * 0.22, 'click', 0.5]).concat([[2.6, 'thump', 0.5]]),
    draw(t) {
      night('#0D1110');
      const px = TX - 170 * u, py = 520 * u;
      g.fillStyle = '#5A625C'; rrect(g, px, py, 340 * u, 760 * u, 20 * u); g.fill();
      g.fillStyle = '#434A45'; rrect(g, px + 16 * u, py + 16 * u, 308 * u, 728 * u, 14 * u); g.fill();
      for (let k = 0; k < 14; k++) { const c = k % 2, r = Math.floor(k / 2), bx = px + 105 * u + c * 130 * u, by = py + 90 * u + r * 92 * u;
        const on = r >= 1 && r <= 5 && t > 0.3 + (r - 1) * 0.44 + c * 0.22;
        if (on) { const gr = g.createRadialGradient(bx, by, 0, bx, by, 70 * u); gr.addColorStop(0, 'rgba(244,233,200,0.45)'); gr.addColorStop(1, 'rgba(244,233,200,0)'); g.fillStyle = gr; g.fillRect(bx - 70 * u, by - 70 * u, 140 * u, 140 * u); }
        g.fillStyle = on ? '#F4E9C8' : '#2A302C'; g.beginPath(); g.arc(bx, by, 36 * u, 0, 7); g.fill();
        text(g, String(14 - r * 2 - c), bx, by + 12 * u, { size: 32 * u, weight: 700, family: INTER, color: on ? '#2A302C' : '#8A948C' }); }
      g.fillStyle = `rgba(${E.cctvG},0.07)`; g.fillRect(0, 0, W, H);
      say('ในคลิป เธอกดปุ่มหลายชั้นติดกัน', TX, 330 * u, t - 0.1, { size: 50 * u, weight: 800, color: C.cream });
      g.fillStyle = 'rgba(13,17,16,0.85)'; if (t > 2.4) g.fillRect(0, 1340 * u, W, 240 * u);
      say('ก้าวออก ก้าวกลับ มองซ้ายขวา\nโบกมือไปมา · ประตูลิฟต์ค้างเปิดอยู่นาน', TX, 1420 * u, t - 2.6, { size: 42 * u, weight: 800, color: E.lamp });
      finish(0.8);
    } },
  // ---------------- it goes viral
  { from: bar(28), to: bar(30), cues: Array.from({ length: 10 }, (_, i) => [0.2 + i * 0.18, 'pop', 0.3]).concat([[2.6, 'thump', 0.6]]),
    draw(t) {
      night('#0A0D16');
      const n = Math.round(3000000 * clamp(spring(t - 0.2, 26, 10)));
      for (let i = 0; i < 18; i++) { const a = spring(t - 0.2 - i * 0.09, 'snappy'); if (a <= 0) continue;
        const x = (120 + (i % 3) * 300) * u + (hash(i, 3) - 0.5) * 40 * u, y = (620 + Math.floor(i / 3) * 140) * u;
        g.save(); g.globalAlpha = clamp(a) * 0.9; g.fillStyle = '#18202E'; rrect(g, x, y, 260 * u, 110 * u, 12 * u); g.fill();
        g.fillStyle = '#2E3A30'; rrect(g, x + 10 * u, y + 10 * u, 110 * u, 90 * u, 8 * u); g.fill();
        figure(x + 65 * u, y + 92 * u, 70 * u, { color: '#0D120F' });
        g.fillStyle = '#3A4458'; g.fillRect(x + 134 * u, y + 26 * u, 110 * u, 10 * u); g.fillRect(x + 134 * u, y + 50 * u, 80 * u, 10 * u);
        g.fillStyle = E.neon; g.beginPath(); g.moveTo(x + 52 * u, y + 40 * u); g.lineTo(x + 80 * u, y + 55 * u); g.lineTo(x + 52 * u, y + 70 * u); g.fill(); g.restore(); }
      band(200 * u, 360 * u, 0.85);
      kicker('ไม่กี่วันต่อมา', TX, 270 * u, t, { color: E.lamp });
      text(g, n.toLocaleString('en-US') + '+', TX, 460 * u, { size: 130 * u, weight: 400, family: SERIF, color: C.cream });
      say('ครั้ง · ยอดชมบนเว็บไซต์จีนแห่งเดียว ภายในราว 10 วัน', TX, 540 * u, t - 0.8, { size: 32 * u, weight: 700, color: C.fog });
      say('คลิปแพร่ไปทั่วโลก', TX, 1500 * u, t - 2.6, { size: 54 * u, weight: 800, color: E.lamp });
      finish(0.8);
    } },
  // ---------------- water complaints
  { from: bar(30), to: bar(32), cues: [[0.2, 'tick', 0.5], [1.0, 'tick', 0.4], [1.8, 'tick', 0.4], [2.5, 'thump', 0.5]],
    draw(t) {
      night('#10141C');
      g.fillStyle = '#1B2230'; g.fillRect(0, 1150 * u, W, H);                                        // sink basin
      g.fillStyle = '#C7CCD4'; rrect(g, 200 * u, 1100 * u, 640 * u, 90 * u, 40 * u); g.fill();
      g.fillStyle = '#9AA1AC'; rrect(g, TX - 40 * u, 700 * u, 80 * u, 400 * u, 20 * u); g.fill();        // faucet
      rrect(g, TX - 40 * u, 700 * u, 280 * u, 70 * u, 30 * u); g.fill();
      g.fillStyle = '#7F8792'; rrect(g, TX + 200 * u, 740 * u, 50 * u, 70 * u, 10 * u); g.fill();
      // weak drip, deterministic
      const ph = (t * 1.3) % 1, dy = 820 * u + ph * ph * 280 * u;
      g.fillStyle = 'rgba(160,190,200,0.85)'; g.beginPath(); g.arc(TX + 225 * u, dy, 12 * u, 0, 7); g.fill();
      g.beginPath(); g.moveTo(TX + 213 * u, dy); g.lineTo(TX + 225 * u, dy - 26 * u); g.lineTo(TX + 237 * u, dy); g.fill();
      kicker('ช่วงกลางเดือนกุมภาพันธ์', TX, 280 * u, t, { color: E.lamp });
      say('แขกเริ่มร้องเรียนว่าน้ำไหลอ่อน', TX, 390 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      say('และน้ำประปามีรสชาติแปลก ๆ', TX, 500 * u, t - 1.6, { size: 50 * u, weight: 800, color: E.lamp });
      finish(0.8);
    } },
  // ---------------- 19 February: the rooftop
  { from: bar(32), to: bar(35), cues: [[0.2, 'whoosh', 0.5], [2.5, 'thump', 0.6], [5.0, 'chime', 0.4]],
    draw(t) {
      const cam = track(t, [[0, 1.12], [0.01, 1]], 'heavy');
      g.save(); g.translate(TX, 1300 * u); g.scale(cam, cam); g.translate(-TX, -1300 * u);
      rooftop(t, { beam: clamp((t - 2.6) / 0.8) * (0.85 + 0.15 * noise(t * 3, 2)), focus: 1, hatch: clamp((t - 2.4) / 0.6) });
      g.restore();
      band(200 * u, 340 * u, 0.75);
      kicker('19 กุมภาพันธ์ 2013', TX, 280 * u, t, { color: E.lamp });
      say('พนักงานซ่อมบำรุงขึ้นไปตรวจ\nถังเก็บน้ำบนดาดฟ้า', TX, 380 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      band(1440 * u, 150 * u, 0.85);
      say('และพบร่างของเธอในถังน้ำใบหนึ่ง', TX, 1530 * u, t - 2.6, { size: 46 * u, weight: 800, color: E.lamp });
      finish(0.9);
    } },
  // ---------------- how did she get there? roof door + alarm
  { from: bar(35), to: bar(38), cues: [[0.2, 'thump', 0.5], [2.5, 'tick', 0.6], [2.8, 'tick', 0.6], [5.0, 'pop', 0.5]],
    draw(t) {
      night('#0E1119');
      // door with lock + alarm box
      const dx = 260 * u, dy = 640 * u;
      g.fillStyle = '#232835'; g.fillRect(dx - 40 * u, dy - 40 * u, 480 * u, 760 * u);
      g.fillStyle = '#3A4052'; g.fillRect(dx, dy, 400 * u, 720 * u);
      g.strokeStyle = '#2A2F3D'; g.lineWidth = 6 * u; g.strokeRect(dx + 40 * u, dy + 40 * u, 320 * u, 280 * u); g.strokeRect(dx + 40 * u, dy + 380 * u, 320 * u, 280 * u);
      g.fillStyle = '#B9BEC8'; g.fillRect(dx + 20 * u, dy + 340 * u, 360 * u, 30 * u);            // push bar
      g.fillStyle = '#E8DFC8'; rrect(g, dx + 60 * u, dy + 100 * u, 280 * u, 130 * u, 8 * u); g.fill();
      text(g, 'ROOF', dx + 200 * u, dy + 155 * u, { size: 40 * u, weight: 700, family: INTER, color: '#B42A1C', tracking: 3 * u });
      text(g, 'ALARM WILL SOUND', dx + 200 * u, dy + 205 * u, { size: 24 * u, weight: 700, family: INTER, color: '#2A2620', tracking: 1 * u });
      const lit = t > 2.4 && Math.floor(t * 2) % 2 === 0;
      g.fillStyle = '#2A2F3D'; rrect(g, dx + 440 * u, dy - 30 * u, 120 * u, 120 * u, 12 * u); g.fill();
      g.fillStyle = lit ? 'rgba(229,70,58,0.25)' : '#3A1C1C'; g.beginPath(); g.arc(dx + 500 * u, dy + 30 * u, 36 * u, 0, 7); g.fill();
      kicker('คำถามที่ยังค้างคา', TX, 280 * u, t, { color: E.lamp });
      say('ประตูขึ้นดาดฟ้าล็อกไว้ และมีสัญญาณเตือน', TX, 390 * u, t - 0.2, { size: 44 * u, weight: 800, color: C.cream });
      say('ตามรายงาน สัญญาณไม่ได้ดังขึ้น', TX, 490 * u, t - 2.5, { size: 44 * u, weight: 800, color: E.lamp });
      g.fillStyle = 'rgba(14,17,25,0.85)'; if (t > 4.8) g.fillRect(0, 1420 * u, W, 170 * u);
      say('แต่ดาดฟ้ายังขึ้นได้ทางบันไดหนีไฟด้านนอกตึก', TX, 1510 * u, t - 5.0, { size: 40 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- the hatch: open or closed?
  { from: bar(38), to: bar(40), cues: [[0.2, 'thump', 0.5], [2.5, 'swish', 0.5]],
    draw(t) {
      night('#0A0C12');
      const op = Math.floor(t * 1.2) % 2;
      tank(TX, 1360 * u, 760 * u, { hatch: op, color: '#262A32', rim: '#3E4450' });
      band(200 * u, 330 * u, 0.85);
      say('ฝาถังน้ำ ตอนพบ\nปิดอยู่ หรือเปิดอยู่?', TX, 300 * u, t - 0.1, { size: 54 * u, weight: 800, color: C.cream });
      band(1400 * u, 190 * u, 0.85);
      say('คำบอกเล่าจากตำรวจและพนักงาน\nไม่ตรงกัน', TX, 1470 * u, t - 2.5, { size: 42 * u, weight: 800, color: E.lamp });
      finish(0.8);
    } },
  // ---------------- the coroner
  { from: bar(40), to: bar(44), cues: [[0.2, 'whoosh', 0.5], [0.6, 'type', 0.5], [5.0, 'impact', 1.0], [7.5, 'thump', 0.5]],
    draw(t) {
      const [sx, sy] = shake(t, 5.0, 16); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 300 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = 'rgba(0,0,0,0.15)'; g.fillRect(122 * u, 532 * u, 780 * u, 900 * u);
      g.fillStyle = '#F6F1E4'; g.fillRect(110 * u, 520 * u, 780 * u, 900 * u);
      text(g, "CORONER'S FINDINGS", 500 * u, 600 * u, { size: 40 * u, weight: 400, family: SERIF, color: C.ink, tracking: 3 * u });
      g.fillStyle = C.ink; g.fillRect(160 * u, 625 * u, 680 * u, 3 * u);
      const rows = [['DECEDENT', 'ELISA LAM, 21'], ['CAUSE', 'DROWNING'], ['MANNER', 'ACCIDENT'], ['CONDITION', 'BIPOLAR DISORDER']];
      rows.forEach(([k, v], i) => { const yy = 700 * u + i * 80 * u;
        text(g, k, 160 * u, yy, { size: 26 * u, weight: 700, family: INTER, color: C.inkSoft, align: 'left', tracking: 2 * u });
        typewriter(v, 420 * u, yy, t - 0.6 - i * 0.7, { size: 30 * u, weight: 700, family: INTER, color: C.ink, cps: 26 }); });
      g.restore();
      kicker('มิถุนายน 2013 · ผลชันสูตรของ LA County', TX, 300 * u, t, { color: C.red });
      say('สรุปว่า “จมน้ำโดยอุบัติเหตุ”', TX, 410 * u, t - 0.2, { size: 52 * u, weight: 800, color: C.ink });
      stamp('ACCIDENTAL', TX, 1140 * u, t - 5.0, { size: 110 * u, rot: -0.1 });
      say('โรคไบโพลาร์ถูกระบุว่าเป็นปัจจัยสำคัญ\nไม่พบร่องรอยการทำร้ายร่างกาย', TX, 1480 * u, t - 6.0, { size: 40 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------- toxicology
  { from: bar(44), to: bar(47), cues: [[0.2, 'pop', 0.5], [0.5, 'pop', 0.5], [0.8, 'pop', 0.5], [2.5, 'thump', 0.5], [5.0, 'pop', 0.4]],
    draw(t) {
      night('#0D1018');
      const cols = ['#C8321E', '#5E8C88', '#E9B566', '#8C97AD'];
      cols.forEach((c, i) => { const p = spring(t - 0.2 - i * 0.3, 'playful'); if (p <= 0) return; pill((240 + i * 180) * u, 700 * u, 60 * u * p, -0.5 + i * 0.3, c); });
      // dose bar: expected range vs measured
      const bx = 160 * u, bw = 680 * u, by = 940 * u;
      g.fillStyle = '#1E2433'; rrect(g, bx, by, bw, 60 * u, 30 * u); g.fill();
      g.fillStyle = 'rgba(94,140,136,0.45)'; g.fillRect(bx + bw * 0.45, by, bw * 0.4, 60 * u);
      text(g, 'ระดับที่ควรเป็นเมื่อกินตามสั่ง', bx + bw * 0.65, by - 24 * u, { size: 28 * u, weight: 700, family: THAI, color: '#8FC0BA' });
      const m = clamp(spring(t - 2.6, 'default')) * 0.16;
      g.fillStyle = E.lamp; rrect(g, bx, by, Math.max(60 * u, bw * m), 60 * u, 30 * u); g.fill();
      text(g, 'ที่ตรวจพบ', bx + 20 * u, by + 110 * u, { size: 28 * u, weight: 700, family: THAI, color: E.lamp, align: 'left', alpha: clamp(t - 2.8) });
      kicker('ผลตรวจสารพิษ', TX, 280 * u, t, { color: E.lamp });
      say('ไม่พบแอลกอฮอล์หรือยาเสพติด\nพบเพียงยาที่แพทย์สั่ง', TX, 380 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      say('ในระดับต่ำกว่าที่ควรเป็น', TX, 1200 * u, t - 2.6, { size: 50 * u, weight: 800, color: E.lamp });
      say('บ่งชี้ว่าเธออาจไม่ได้กินยา\nตามที่แพทย์สั่งในช่วงนั้น', TX, 1330 * u, t - 5.0, { size: 42 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- her own words: the blog
  { from: bar(47), to: bar(50), cues: [[0.2, 'swish', 0.4], [2.5, 'pop', 0.4], [5.0, 'chime', 0.4]],
    draw(t) {
      night('#11131B');
      // a laptop with a blog page of soft image tiles + text lines (illegible, nothing quoted)
      const lx = TX - 380 * u, ly = 640 * u, lw = 760 * u, lh = 480 * u;
      g.fillStyle = '#2A2E38'; rrect(g, lx - 20 * u, ly - 20 * u, lw + 40 * u, lh + 40 * u, 20 * u); g.fill();
      g.fillStyle = '#EDE7DA'; g.fillRect(lx, ly, lw, lh);
      g.fillStyle = '#2A2E38'; g.beginPath(); g.moveTo(lx - 80 * u, ly + lh + 40 * u); g.lineTo(lx + lw + 80 * u, ly + lh + 40 * u); g.lineTo(lx + lw + 40 * u, ly + lh + 20 * u); g.lineTo(lx - 40 * u, ly + lh + 20 * u); g.fill();
      const sc = track(t, [[0, 0], [2.5, -120 * u], [5.0, -220 * u]], 'default');
      g.save(); g.beginPath(); g.rect(lx, ly, lw, lh); g.clip(); g.translate(0, sc);
      for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) { const i = r * 3 + c;
        g.fillStyle = ['#D8C3B0', '#B9C6C9', '#CFC6D8', '#E0CFA8'][i % 4]; g.fillRect(lx + 30 * u + c * 240 * u, ly + 40 * u + r * 260 * u, 220 * u, 150 * u);
        g.fillStyle = 'rgba(40,40,50,0.35)'; g.fillRect(lx + 30 * u + c * 240 * u, ly + 205 * u + r * 260 * u, 200 * u * (0.6 + 0.4 * hash(i, 3)), 10 * u); g.fillRect(lx + 30 * u + c * 240 * u, ly + 225 * u + r * 260 * u, 140 * u, 10 * u); }
      g.restore();
      kicker('ในบล็อกของเธอเอง', TX, 280 * u, t, { color: E.lamp });
      say('เธอแบ่งปันภาพแฟชั่น ความชอบ ความฝัน', TX, 390 * u, t - 0.2, { size: 44 * u, weight: 800, color: C.cream });
      say('และเขียนอย่างเปิดเผยถึงการรับมือ\nกับภาวะซึมเศร้าและไบโพลาร์', TX, 1290 * u, t - 2.5, { size: 44 * u, weight: 800, color: E.lamp });
      say('เธอไม่ใช่ “ปริศนา” แต่เป็นคนจริง ๆ คนหนึ่ง', TX, 1490 * u, t - 5.0, { size: 40 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- the internet fills the gap with theories
  { from: bar(50), to: bar(53), cues: Array.from({ length: 6 }, (_, i) => [0.2 + i * 0.35, 'pop', 0.4]).concat([[3.6, 'swish', 0.4], [4.2, 'swish', 0.4], [4.8, 'swish', 0.4], [5.4, 'swish', 0.4]]),
    draw(t) {
      night('#0A0C14');
      const C6 = ['โรงแรมนี้ผีสิงแน่นอน', 'มีคนซ่อนอยู่นอกลิฟต์!', 'ต้องเป็นคำสาปของตึก', 'เหมือนในหนังผีเลย', 'คลิปนี้มีอะไรซ่อนอยู่', 'จับตาแขกห้องข้าง ๆ'];
      phone(TX, 960 * u, 440 * u, (x, y, w, h) => {
        g.fillStyle = '#161B26'; g.fillRect(x, y, w, 110 * u);
        text(g, 'ความคิดเห็น', x + w / 2, y + 74 * u, { size: 30 * u, weight: 700, family: THAI, color: C.fog });
        C6.forEach((s, i) => comment(x + 4 * u, y + 180 * u + i * 115 * u, w, s, i, (t - 0.2 - i * 0.35) / 0.3, (t - 3.6 - i * 0.3) / 0.35));
      });
      band(200 * u, 220 * u, 0.85);
      say('อินเทอร์เน็ตเติมช่องว่างด้วยทฤษฎี', TX, 330 * u, t - 0.1, { size: 50 * u, weight: 800, color: C.cream });
      g.fillStyle = 'rgba(10,12,20,0.88)'; if (t > 5.2) g.fillRect(0, 1460 * u, W, 130 * u);
      say('ไม่มีข้อใดมีหลักฐานรองรับ', TX, 1540 * u, t - 5.4, { size: 48 * u, weight: 800, color: E.lamp });
      finish(0.8);
    } },
  // ---------------- an innocent man accused
  { from: bar(53), to: bar(56), cues: [[0.2, 'thump', 0.5], [2.5, 'impact', 0.8], [5.0, 'thump', 0.5]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 14); g.translate(sx, sy);
      night('#0C0E15');
      person(TX, 1300 * u, 300 * u, '#1E2330');
      // red accusation tags dropping around him, then cleared
      const tags = ['ฆาตกร?', 'ผู้ต้องสงสัย?', 'ต้องเป็นเขา!'], clr = clamp((t - 5.0) / 0.6);
      tags.forEach((s, i) => { const p = spring(t - 2.4 - i * 0.25, 'snappy'); if (p <= 0) return;
        const x = [260, 780, 520][i] * u, y = [760, 820, 640][i] * u + (1 - p) * -200 * u;
        g.save(); g.globalAlpha = 1 - clr; g.translate(x, y); g.rotate((hash(i, 3) - 0.5) * 0.2);
        g.fillStyle = E.neon; rrect(g, -140 * u, -46 * u, 280 * u, 92 * u, 12 * u); g.fill();
        text(g, s, 0, 14 * u, { size: 38 * u, weight: 800, family: THAI, color: '#FFF2EC' }); g.restore(); });
      if (clr > 0) stamp('INNOCENT', TX, 760 * u, t - 5.0, { size: 100 * u, rot: -0.08, color: '#8FC0BA' });
      band(200 * u, 330 * u, 0.85);
      kicker('Pablo Vergara (Morbid) นักดนตรีเมทัล', TX, 280 * u, t, { color: E.lamp });
      say('ถูกชาวเน็ตกล่าวหา เพียงเพราะ\nเคยพักที่ Cecil ราวหนึ่งปีก่อน', TX, 380 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      band(1380 * u, 210 * u, 0.88);
      say('ทั้งที่ตอนเกิดเหตุเขาอยู่ที่เม็กซิโก\nเขาถูกคุกคามและขู่ทำร้ายอย่างหนัก', TX, 1450 * u, t - 5.2, { size: 40 * u, weight: 800, color: E.lamp });
      finish(0.8);
    } },
  // ---------------- the Netflix series
  { from: bar(56), to: bar(58), cues: [[0.2, 'whoosh', 0.5], [2.5, 'pop', 0.5]],
    draw(t) {
      night('#0A0B10');
      const p = clamp(spring(t - 0.1, 'default'));
      g.save(); g.translate(TX, 900 * u); g.scale(0.9 + 0.1 * p, 0.9 + 0.1 * p);
      g.fillStyle = '#16181F'; rrect(g, -400 * u, -250 * u, 800 * u, 480 * u, 18 * u); g.fill();
      g.fillStyle = '#05060A'; g.fillRect(-370 * u, -220 * u, 740 * u, 420 * u);
      g.fillRect(-60 * u, 230 * u, 120 * u, 50 * u); g.fillRect(-160 * u, 280 * u, 320 * u, 14 * u);
      const gr = g.createRadialGradient(0, 0, 0, 0, 0, 420 * u); gr.addColorStop(0, `rgba(${E.neonG},0.22)`); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(-370 * u, -220 * u, 740 * u, 420 * u);
      text(g, 'CRIME SCENE', 0, -60 * u, { size: 36 * u, weight: 700, family: INTER, color: C.fog, tracking: 6 * u, alpha: p });
      text(g, 'The Vanishing at', 0, 20 * u, { size: 58 * u, weight: 400, family: SERIF, color: C.cream, alpha: p });
      text(g, 'the Cecil Hotel', 0, 90 * u, { size: 58 * u, weight: 400, family: SERIF, color: C.cream, alpha: p });
      g.restore();
      kicker('2021 · สารคดีซีรีส์ของ Netflix', TX, 300 * u, t, { color: E.lamp });
      say('พูดถึงผลกระทบของ “นักสืบออนไลน์”\nที่มีต่อคนบริสุทธิ์', TX, 1300 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- the lesson
  { from: bar(58), to: bar(61), cues: [[0.2, 'thump', 0.5], [2.5, 'thump', 0.5], [5.0, 'chime', 0.4]],
    draw(t) {
      night('#0C0F17');
      kicker('สิ่งที่คดีนี้สอนเรา', TX, 300 * u, t, { color: E.lamp });
      [['ความเจ็บป่วยทางใจ\nไม่ใช่เรื่องลึกลับหรือเรื่องผี', 0.4], ['คลิปไวรัลหนึ่งคลิป\nไม่ได้เล่าเรื่องทั้งหมดของชีวิตคนหนึ่ง', 2.6], ['การคาดเดาบนโลกออนไลน์\nทำร้ายคนจริง ๆ ได้', 4.8]].forEach(([s, at], i) => {
        const p = spring(t - at, 'snappy'); if (p <= 0) return;
        g.save(); g.translate((1 - p) * W, 0);
        g.fillStyle = 'rgba(30,34,48,0.95)'; rrect(g, 90 * u, 470 * u + i * 300 * u, W - 220 * u, 240 * u, 14 * u); g.fill();
        g.fillStyle = E.lamp; g.fillRect(90 * u, 470 * u + i * 300 * u, 8 * u, 240 * u);
        say(s, TX, 565 * u + i * 300 * u, 1, { size: 42 * u, weight: 800, color: C.cream });
        g.restore(); });
      finish(0.8);
    } },
  // ---------------- talk to someone
  { from: bar(61), to: bar(64), cues: [[0.2, 'chime', 0.4], [3.75, 'pop', 0.5]],
    draw(t) {
      sky(t, { top: '#080B14', bot: '#1F2840', stars: 0.8 });
      skyline(1450 * u, t, { seed: 33, hmin: 120, hvar: 540, lit: 0.3, color: '#0B0E18' });
      g.fillStyle = '#0B0E18'; g.fillRect(0, 1448 * u, W, H);
      figure(TX - 70 * u, 1460 * u, 420 * u, { color: '#05060B', armR: 0.55 });
      figure(TX + 70 * u, 1460 * u, 400 * u, { color: '#05060B', armL: 0.55 });
      band(200 * u, 560 * u, 0.55);
      say('ถ้าคุณหรือคนใกล้ตัว\nกำลังลำบาก', TX, 300 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      say('ลองคุยกับใครสักคน', TX, 490 * u, t - 1.6, { size: 60 * u, weight: 800, color: E.lamp });
      const p = spring(t - 3.75, 'snappy');
      if (p > 0) { g.save(); g.translate(TX, 690 * u); g.scale(p, p);
        g.fillStyle = E.lamp; rrect(g, -330 * u, -70 * u, 660 * u, 140 * u, 70 * u); g.fill();
        text(g, 'สายด่วนสุขภาพจิต 1323', 0, 18 * u, { size: 50 * u, weight: 800, family: THAI, color: '#14110C' }); g.restore(); }
      finish(0.7);
    } },
  // ---------------- closing title card
  { from: bar(64), to: bar(68), cues: [[0, 'thump', 0.8], [5.0, 'swish', 0.4]],
    draw(t) {
      night('#06070B');
      big('Elisa Lam', TX, 760 * u, t, { size: 170 * u, color: C.cream });
      const p = spring(t - 0.7, 'default');
      g.fillStyle = E.lamp; g.fillRect(TX - 300 * u * p, 840 * u, 600 * u * p, 8 * u);
      say('นักศึกษาจากแวนคูเวอร์ · จากไปเมื่อปี 2013', TX, 960 * u, t - 1.0, { size: 46 * u, weight: 800, color: C.fog });
      say('จดจำเธอในฐานะคนคนหนึ่ง\nไม่ใช่คลิปไวรัล', TX, 1120 * u, t - 2.5, { size: 50 * u, weight: 800, color: E.lamp });
      // a row of soft city lights
      for (let i = 0; i < 14; i++) { const x = (60 + i * 70) * u, a = 0.3 + 0.2 * noise(t * 0.6 + i, 4);
        const gr = g.createRadialGradient(x, 1470 * u, 0, x, 1470 * u, 40 * u); gr.addColorStop(0, `rgba(${E.glow},${a})`); gr.addColorStop(1, `rgba(${E.glow},0)`); g.fillStyle = gr; g.fillRect(x - 40 * u, 1430 * u, 80 * u, 80 * u); }
      finish();
    } },
  // ---------------- question
  { from: bar(68), to: bar(72), cues: Array.from({ length: 8 }, (_, i) => [i * 0.625, 'thump', 0.25]).concat([[5.0, 'chime', 0.6]]),
    draw(t) {
      const top = track(t, [[0, 700 * u], [0.01, 760 * u]], 'heavy');
      facade(t, { top, lit: 0.35, seed: 6, neon: 0.5 });
      band(190 * u, 520 * u, 0.82);
      say('เคยเห็นเรื่องจริงของใครสักคน\nถูกโลกออนไลน์ตัดสินก่อนข้อเท็จจริงไหม?', TX, 290 * u, t - 0.3, { size: 44 * u, weight: 800, color: C.cream });
      say('คอมเมนต์บอกได้เลย', TX, 470 * u, t - 2.5, { size: 48 * u, weight: 800, color: E.lamp });
      say('สายด่วนสุขภาพจิต 1323 · ตลอด 24 ชั่วโมง', TX, 590 * u, t - 3.5, { size: 34 * u, weight: 700, color: C.fog });
      finish(0.8);
    } },
];
