// Act 1 — the voice, the first attacks, the first cipher (0:00–0:55, bars 0–22).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, rrect, text, typewriter, topScrim, shake } from './kit.js';
import { cipherGrid, crosshair, mapBay, PLACE, newspaper, glyph } from './props.js';

function car(x, y, s, color = C.night3, lights = 0) {      // side-on 1960s sedan, nose to the right
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color;
  g.beginPath(); g.moveTo(-1, 0.1); g.lineTo(-0.95, -0.12); g.lineTo(-0.5, -0.16); g.lineTo(-0.32, -0.38); g.lineTo(0.3, -0.38); g.lineTo(0.5, -0.16);
  g.lineTo(0.98, -0.12); g.lineTo(1, 0.1); g.closePath(); g.fill();
  g.fillStyle = '#05070C'; for (const wx of [-0.6, 0.6]) { g.beginPath(); g.arc(wx, 0.1, 0.16, 0, 7); g.fill(); }
  if (lights) { g.globalAlpha = lights; g.fillStyle = '#F2E2A6'; g.beginPath(); g.moveTo(1, -0.06); g.lineTo(2.6, -0.4); g.lineTo(2.6, 0.3); g.closePath(); g.globalAlpha = lights * 0.25; g.fill(); }
  g.restore();
}

export default () => [
  // ---------------- Chapter 1 — "This is the Zodiac speaking"
  { from: bar(0), to: bar(2), cues: [[0, 'type', 0.5], [0.4, 'type', 0.4], [1.0, 'impact', 1.0], [1.6, 'type', 0.5]],
    draw(t) {
      paper();
      cipherGrid(70 * u, 300 * u, 13, 15, 72 * u, remap(t, 0, 1.0), { seed: 3, color: C.inkSoft });
      g.fillStyle = 'rgba(239,230,210,0.72)'; if (t > 1.0) g.fillRect(0, 0, W, H);
      crosshair(TX, 860 * u, 230 * u, remap(t, 1.0, 1.5), C.red, 20);
      typewriter('“This is the Zodiac speaking.”', TX, 1360 * u, t - 1.6, { size: 60 * u, weight: 400, family: SERIF, color: C.ink, align: 'center', cps: 22 });
      finish(0.6);
    } },
  { from: bar(2), to: bar(4), cues: [[0, 'whoosh', 0.6], [2.5, 'thump', 0.6]],
    draw(t) {
      night('#08070A');
      const r = track(t, [[0, 230], [0.05, 600]], 'heavy') * u;
      crosshair(TX, 760 * u, r, 1, C.night3, 26);
      const y = say('ฆาตกรต่อเนื่อง\nที่เขียนจดหมายท้าตำรวจ', TX, 1180 * u, t - 0.2, { size: 64 * u, weight: 800, color: C.cream });
      say('พร้อมรหัสลับที่ไม่มีใครอ่านออก', TX, y + 20 * u, t - 2.5, { size: 50 * u, weight: 700, color: C.red });
      finish();
    } },
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1], [3.2, 'type', 0.4]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 360 * u, 90 * u, 14 * u); g.fill();
      text(g, 'SFPD · ZODIAC', 250 * u, 472 * u, { size: 34 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 3 * u });
      g.restore();
      say('ตำรวจตามล่าเขามากว่า 50 ปี', TX, 760 * u, t - 0.25, { size: 64 * u, weight: 800 });
      stamp('UNSOLVED', TX, 1080 * u, t - 2.5, { size: 150 * u, rot: -0.12 });
      say('จนวันนี้ ยังไม่รู้ว่าเขาเป็นใคร', TX, 1380 * u, t - 3.2, { size: 48 * u, weight: 600, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------- Chapter 2 — the first attacks
  { from: bar(6), to: bar(7), cues: [0, 1, 2, 3].map((i) => [i * 0.22, 'tick', 0.6]).concat([[1.0, 'thump', 0.6]]),
    draw(t) {
      paper();
      const dw = 170 * u, x0 = TX - 1.5 * (dw + 14 * u), ys = ['1965', '1966', '1967', '1968'];
      for (let d = 0; d < 4; d++) flip(x0 + d * (dw + 14 * u), 820 * u, dw, 250 * u, ys.map((y) => y[d]), ys.map((_, i) => i * 0.22), t, { size: 190 * u });
      kicker('แคลิฟอร์เนีย ปลายยุค 60', TX, 560 * u, t);
      say('รอบอ่าวซานฟรานซิสโก', TX, 1100 * u, t - 1.0, { size: 60 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(7), to: bar(9), cues: [[0, 'whoosh', 0.5], [0.6, 'pop', 0.6], [1.0, 'pop', 0.6], [1.4, 'pop', 0.6], [1.8, 'pop', 0.6]],
    draw(t) {
      const cam = { lat: 38.15, lon: -122.27, z: track(t, [[0, 700], [0.05, 1000]], 'heavy') * u };
      const P = mapBay(cam); topScrim();
      pin(...P(PLACE.benicia), t - 0.6, { label: 'Benicia', side: 1 });
      pin(...P(PLACE.vallejo), t - 1.0, { label: 'Vallejo', side: -1 });
      pin(...P(PLACE.berryessa), t - 1.4, { label: 'Lake Berryessa', side: 1 });
      pin(...P(PLACE.sf), t - 1.8, { label: 'San Francisco', side: 1 });
      kicker('ธ.ค. 1968 – ต.ค. 1969', TX, 250 * u, t, { color: C.red });
      say('4 เหตุการณ์ · เหยื่อ 7 คน', TX, 345 * u, t - 0.3, { size: 56 * u, weight: 800, color: C.cream });
      say('เสียชีวิต 5 · รอดชีวิต 2', TX, 1520 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(9), to: bar(11), cues: [[0, 'whoosh', 0.4], [1.25, 'thump', 0.7]],
    draw(t) {
      night('#05070C');
      g.fillStyle = '#0B0F18'; g.fillRect(0, 1000 * u, W, H - 1000 * u);
      g.strokeStyle = C.fog; g.globalAlpha = 0.25; g.lineWidth = 4 * u; g.setLineDash([50 * u, 40 * u]); g.lineDashOffset = -t * 60 * u;
      g.beginPath(); g.moveTo(0, 1100 * u); g.lineTo(W, 1100 * u); g.stroke(); g.setLineDash([]); g.globalAlpha = 1;
      car(TX - 120 * u, 1000 * u, 280 * u, C.night3, clamp(t / 0.3));
      kicker('20 ธ.ค. 1968 · ถนน Lake Herman', TX, 330 * u, t, { color: C.red });
      say('คู่รักวัยรุ่นที่จอดรถคุยกัน', TX, 440 * u, t - 0.3, { size: 56 * u, weight: 800, color: C.cream });
      say('David 17 ปี · Betty Lou 16 ปี', TX, 1300 * u, t - 1.25, { size: 52 * u, weight: 800, color: C.cream });
      say('ถูกยิงเสียชีวิตทั้งคู่', TX, 1410 * u, t - 2.5, { size: 50 * u, weight: 700, color: C.red });
      finish();
    } },
  { from: bar(11), to: bar(11) + 6 * BEAT, cues: [[0, 'whoosh', 0.4], [0.4, 'thump', 0.4], [1.6, 'thump', 0.4], [2.6, 'thump', 0.5]],
    draw(t) {
      night('#05070C');
      // distant Fourth of July fireworks: soft flashes on the horizon
      for (let k = 0; k < 3; k++) {
        const at = 0.4 + k * 1.1, p = clamp((t - at) / 0.9); if (p <= 0 || p >= 1) continue;
        const x = 250 * u + k * 280 * u, y = 520 * u + (k % 2) * 80 * u;
        g.strokeStyle = k === 1 ? C.red : C.fog; g.globalAlpha = 1 - p; g.lineWidth = 3 * u;
        for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; g.beginPath(); g.moveTo(x + Math.cos(a) * p * 40 * u, y + Math.sin(a) * p * 40 * u); g.lineTo(x + Math.cos(a) * p * 120 * u, y + Math.sin(a) * p * 120 * u + p * p * 30 * u); g.stroke(); }
        g.globalAlpha = 1;
      }
      g.fillStyle = '#0B0F18'; g.fillRect(0, 1000 * u, W, H - 1000 * u);
      car(TX, 1000 * u, 280 * u, C.night3, 0);
      kicker('4 ก.ค. 1969 · Blue Rock Springs, Vallejo', TX, 300 * u, t, { color: C.red });
      say('Darlene 22 ปี เสียชีวิต', TX, 1300 * u, t - 0.6, { size: 54 * u, weight: 800, color: C.cream });
      say('Mike 19 ปี รอดชีวิต', TX, 1410 * u, t - 1.6, { size: 50 * u, weight: 700, color: C.fog });
      finish();
    } },
  { from: bar(11) + 6 * BEAT, to: bar(14), cues: [[0, 'tick', 0.6], [0.25, 'tick', 0.6], [0.5, 'tick', 0.6], [1.25, 'thump', 0.7]],
    draw(t) {
      night(C.night2);
      // phone booth handset + voice waves
      g.save(); g.translate(TX, 760 * u); g.rotate(-0.3 + noise(t, 3) * 0.02);
      g.fillStyle = C.cream; rrect(g, -210 * u, -40 * u, 420 * u, 80 * u, 40 * u); g.fill();
      rrect(g, -250 * u, -70 * u, 120 * u, 160 * u, 50 * u); g.fill(); rrect(g, 130 * u, -70 * u, 120 * u, 160 * u, 50 * u); g.fill();
      g.restore();
      for (let k = 0; k < 4; k++) { const p = ((t * 0.9 + k * 0.25) % 1); g.strokeStyle = C.red; g.globalAlpha = 1 - p; g.lineWidth = 5 * u;
        g.beginPath(); g.arc(TX + 260 * u, 690 * u, 40 * u + p * 160 * u, -0.9, 0.3); g.stroke(); g.globalAlpha = 1; }
      kicker('ไม่ถึงชั่วโมงต่อมา', TX, 330 * u, t, { color: C.red });
      say('ชายคนหนึ่งโทรหาตำรวจ Vallejo', TX, 1150 * u, t - 0.3, { size: 56 * u, weight: 800, color: C.cream });
      say('อ้างว่าเป็นคนทำ ทั้งสองคดี', TX, 1260 * u, t - 1.25, { size: 56 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  // ---------------- Chapter 3 — the letters and the 408
  { from: bar(14), to: bar(16), cues: [[0.2, 'swish', 0.6], [0.6, 'swish', 0.6], [1.0, 'swish', 0.6], [2.5, 'thump', 0.6]],
    draw(t) {
      paper();
      const papers = [['SAN FRANCISCO CHRONICLE', -0.12, -160], ['SAN FRANCISCO EXAMINER', 0.02, 0], ['VALLEJO TIMES-HERALD', 0.14, 160]];
      papers.forEach(([m, r, dx], i) => { const s = spring(t - 0.2 - i * 0.4, 'default'); if (s <= 0) return;
        newspaper(TX + dx * u, 860 * u + (1 - s) * 900 * u, 520 * u, r, '', { masthead: m, seed: i + 1 }); });
      kicker('31 ก.ค. 1969', TX, 300 * u, t);
      say('จดหมายถึงหนังสือพิมพ์ 3 ฉบับ', TX, 1440 * u, t - 2.5, { size: 56 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(16), to: bar(18), cues: [[0.2, 'type', 0.5], [1.0, 'type', 0.5], [1.8, 'type', 0.5], [2.5, 'impact', 0.8]],
    draw(t) {
      paper();
      const cell = 52 * u, cols = 17, x0 = TX - (cols * cell) / 2;
      for (let p = 0; p < 3; p++) {
        const y0 = 380 * u + p * 290 * u, r = remap(t, 0.2 + p * 0.8, 0.9 + p * 0.8);
        g.fillStyle = '#F4EEDF'; g.fillRect(x0 - 16 * u, y0 - 12 * u, cols * cell + 32 * u, 8 * cell + 24 * u);
        cipherGrid(x0, y0, cols, 8, cell * 0.66, r, { seed: 40 + p, color: C.ink });
        text(g, `ส่วนที่ ${p + 1}`, x0 + cols * cell, y0 + 8 * cell * 0.66 + 4 * u, { size: 30 * u, weight: 700, family: THAI, color: C.red, align: 'right', alpha: clamp(r * 4) });
      }
      const n = Math.round(408 * clamp(spring(t - 0.2, 30, 11) * 1.004));
      text(g, `${n} สัญลักษณ์`, TX, 1320 * u, { size: 96 * u, weight: 400, family: SERIF, color: C.ink });
      say('ขู่ว่าถ้าไม่ลงหน้าหนึ่ง จะฆ่าอีก', TX, 1450 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(18), to: bar(20), cues: [[0.3, 'type', 0.6], [2.5, 'thump', 0.5]],
    draw(t) {
      paper();
      g.save(); g.translate(TX, 800 * u); g.rotate(0.02);
      g.fillStyle = '#F7F2E6'; rrect(g, -400 * u, -330 * u, 800 * u, 660 * u, 4 * u); g.fill();
      g.strokeStyle = 'rgba(80,110,160,0.25)'; g.lineWidth = 2 * u;
      for (let i = 0; i < 11; i++) { g.beginPath(); g.moveTo(-380 * u, -260 * u + i * 56 * u); g.lineTo(380 * u, -260 * u + i * 56 * u); g.stroke(); }
      typewriter('This is the', -330 * u, -150 * u, t - 0.3, { size: 92 * u, weight: 400, family: SERIF, color: C.ink, cps: 14 });
      typewriter('Zodiac speaking.', -330 * u, -30 * u, t - 1.1, { size: 92 * u, weight: 400, family: SERIF, color: C.ink, cps: 14 });
      crosshair(250 * u, 170 * u, 70 * u, remap(t, 2.2, 2.7), C.ink, 7);
      g.restore();
      kicker('ส.ค. 1969 · จดหมายฉบับถัดมา', TX, 330 * u, t);
      say('ประโยคเปิดที่เขาใช้แทบทุกฉบับ\nลงท้ายด้วยสัญลักษณ์เป้าเล็ง', TX, 1300 * u, t - 2.5, { size: 50 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(20), to: bar(22), cues: [[0.1, 'pop', 0.5], [0.4, 'pop', 0.5], [1.4, 'type', 0.5], [2.5, 'thump', 0.7]],
    draw(t) {
      paper();
      [-1, 1].forEach((sd, i) => { const s = spring(t - 0.1 - i * 0.3, 'playful'); if (s <= 0) return; person(TX + sd * 130 * u, 760 * u, 110 * u * s, C.inkSoft); });
      say('ครูมัธยมกับภรรยา\nถอดรหัสได้ในราว 1 สัปดาห์', TX, 330 * u, t - 0.1, { size: 46 * u, weight: 800 });
      typewriter('I LIKE KILLING PEOPLE', TX, 1060 * u, t - 1.4, { size: 54 * u, weight: 700, family: 'Inter, sans-serif', color: C.red, align: 'center', cps: 18 });
      typewriter('BECAUSE IT IS SO MUCH FUN', TX, 1130 * u, t - 2.0, { size: 54 * u, weight: 700, family: 'Inter, sans-serif', color: C.red, align: 'center', cps: 18 });
      say('แต่ในข้อความ ไม่มีชื่อของเขา', TX, 1360 * u, t - 2.6, { size: 56 * u, weight: 800 });
      finish(0.6);
    } },
];
