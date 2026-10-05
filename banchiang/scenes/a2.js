// Ban Chiang — Act 2: 0:45–3:00 (bars 18–72).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake } from './kit.js';
import { E, band, walker, kapok, village, pot, sherd, glint, bangle, spear, bell, LAYERS, strata, grave, crate, vitrine, vitrineGlass, digger, PL, mapTH } from './a1.js';

// a small village pig, eating
function pig(x, y, s, t) {
  const nod = Math.sin(t * 5) * 0.06;
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = '#4A3428';
  for (const lx of [-0.45, -0.2, 0.25, 0.45]) g.fillRect(lx - 0.06, 0.1, 0.12, 0.35);
  g.beginPath(); g.ellipse(0, 0, 0.7, 0.4, 0, 0, 7); g.fill();
  g.save(); g.translate(0.62, 0.0); g.rotate(0.35 + nod);
  g.beginPath(); g.ellipse(0.15, 0.05, 0.26, 0.22, 0, 0, 7); g.fill(); g.fillRect(0.3, -0.02, 0.16, 0.16);
  g.beginPath(); g.moveTo(0.02, -0.15); g.lineTo(0.12, -0.36); g.lineTo(0.2, -0.12); g.fill(); g.restore();
  g.strokeStyle = '#4A3428'; g.lineWidth = 0.05; g.beginPath(); g.arc(-0.75, -0.12, 0.08, 0, 5); g.stroke();
  g.restore();
}
// date axis 4000 BCE → 400 CE for the dating debate
const AX = (y) => 130 * u + ((y + 4000) / 4400) * 780 * u;
function axis(Y, a) {
  g.strokeStyle = C.ink; g.lineWidth = 5 * u; g.beginPath(); g.moveTo(AX(-4000), Y); g.lineTo(AX(-4000) + (AX(400) - AX(-4000)) * a, Y); g.stroke();
  [-4000, -3000, -2000, -1000].forEach((y, i) => { if (a < (i + 0.5) / 4.4) return; g.fillStyle = C.ink; g.fillRect(AX(y) - 2 * u, Y - 14 * u, 4 * u, 28 * u);
    text(g, `${-y}`, AX(y), Y + 56 * u, { size: 32 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft }); });
  if (a > 0.95) { g.fillStyle = C.ink; g.fillRect(AX(0) - 2 * u, Y - 14 * u, 4 * u, 28 * u); text(g, 'ค.ศ.', AX(0), Y + 56 * u, { size: 30 * u, weight: 800, family: THAI, color: C.inkSoft }); }
  text(g, 'ปีก่อนคริสตกาล', AX(-2500), Y + 110 * u, { size: 30 * u, weight: 800, family: THAI, color: C.inkSoft, alpha: clamp(a * 2 - 1) });
}
function marker(y, Y, lab, t, o = {}) {
  const { color = C.red, up = 1, crossed = 0 } = o;
  const p = clamp(spring(t, 'snappy')); if (p <= 0) return;
  const x = AX(y), h = 150 * u * p * up;
  g.strokeStyle = color; g.lineWidth = 5 * u; g.beginPath(); g.moveTo(x, Y); g.lineTo(x, Y - h); g.stroke();
  g.fillStyle = color; g.beginPath(); g.arc(x, Y, 13 * u * p, 0, 7); g.fill();
  text(g, lab, x, Y - h - 18 * u * up, { size: 34 * u, weight: 800, family: THAI, color, alpha: p });
  if (crossed > 0) { g.strokeStyle = C.ink; g.lineWidth = 7 * u; const w = 110 * u, cy = Y - h - 30 * u * up; g.beginPath(); g.moveTo(x - w, cy - 20 * u); g.lineTo(x - w + 2 * w * clamp(crossed), cy - 20 * u + 40 * u * clamp(crossed)); g.stroke(); }
}

export default () => [
  // ---------------------------------------------------------------- villagers already knew
  { from: bar(18), to: bar(21), cues: [[0.2, 'swish', 0.5], [2.5, 'pop', 0.5], [5.0, 'thump', 0.6]],
    draw(t) {
      const gy = 1250 * u;
      village(t, { gy });
      // a row of dug-up jars under the house + one fed to the pig
      for (let i = 0; i < 3; i++) { const p = clamp(spring(t - 0.4 - i * 0.2, 'playful')); if (p <= 0) continue; g.save(); g.translate(400 * u + i * 90 * u, gy + 30 * u); g.scale(p, p); pot(0, -50 * u, 42 * u, { paint: 1, rot: (i - 1) * 0.1 }); g.restore(); }
      g.save(); g.beginPath(); g.rect(0, 0, W, gy + 150 * u); g.clip(); pot(760 * u, gy + 120 * u, 48 * u, { rot: 1.2 }); g.restore();
      pig(640 * u, gy + 110 * u, 110 * u, t);
      walker(220 * u, gy + 40 * u, 200 * u, t, { still: true, bag: false, color: '#3A2416' });
      g.save(); g.translate(300 * u, gy - 220 * u); pot(0, 0, 45 * u, { paint: 1, rot: -0.2 }); g.restore();
      band(190 * u, 360 * u);
      kicker('แต่ที่จริงแล้ว…', TX, 280 * u, t);
      say('ชาวบ้านขุดเจอไหแบบนี้มานานแล้ว', TX, 390 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.ink });
      say('เวลาขุดดินทำสวน หรือสร้างบ้าน', TX, 480 * u, t - 2.5, { size: 42 * u, weight: 800, color: C.inkSoft });
      if (t > 5) band(1420 * u, 200 * u);
      say('บางใบถูกทิ้ง บางใบใช้ใส่อาหารหมู\nบางใบเก็บไว้เป็นของนำโชค', TX, 1480 * u, t - 5.0, { size: 40 * u, weight: 800, color: C.red });
      finish(0.5);
    } },
  // ---------------------------------------------------------------- the sherds go to Bangkok
  { from: bar(21), to: bar(23), cues: [[0.2, 'whoosh', 0.5], [0.6, 'pop', 0.5], [2.6, 'pop', 0.7]],
    draw(t) {
      const cam = { lat: 15.5, lon: 101.9, z: 150 * u };
      const P = mapTH(cam);
      topScrim(560, '242,231,208', 0.95);
      const A = P(PL.banchiang), B = P(PL.bangkok);
      const pts = Array.from({ length: 21 }, (_, i) => { const k = i / 20; return [A[0] + (B[0] - A[0]) * k + Math.sin(k * Math.PI) * 120 * u, A[1] + (B[1] - A[1]) * k]; });
      const hd = path(pts, remap(t, 0.6, 2.6), { color: C.red, width: 6 * u, dash: [18 * u, 14 * u] });
      pin(...A, t - 0.2, { label: 'บ้านเชียง', labelColor: C.ink, side: 1 });
      pin(...B, t - 2.6, { label: 'กรุงเทพฯ', labelColor: C.ink, side: -1, color: C.inkSoft });
      if (t > 0.6 && t < 2.8) sherd(hd.x, hd.y, 34 * u, t * 2, 4);
      kicker('ไม่นานหลังจากนั้น', TX, 280 * u, t);
      say('เศษไหถูกส่งต่อให้ผู้รู้ในกรุงเทพฯ', TX, 390 * u, t - 0.2, { size: 46 * u, weight: 800 });
      say('จนเรื่องไปถึงกรมศิลปากร', TX, 480 * u, t - 2.6, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- 1967 test dig (top-down)
  { from: bar(23), to: bar(26), cues: [[0.2, 'thump', 0.6], [1.0, 'tick', 0.4], [1.4, 'tick', 0.4], [2.5, 'pop', 0.6], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      const x0 = 150 * u, y0 = 560 * u, S = 720 * u;
      g.fillStyle = '#B98A5A'; g.fillRect(x0 - 40 * u, y0 - 40 * u, S + 80 * u, S + 80 * u);
      const dp = clamp(spring(t - 0.6, 'heavy'));
      g.fillStyle = '#8A5C38'; g.fillRect(x0 + 40 * u, y0 + 40 * u, (S - 80 * u) * dp, (S - 80 * u));
      if (t > 1.6) grave(x0 + S / 2, y0 + S / 2, 240 * u, t, remap(t, 1.6, 4));
      g.strokeStyle = 'rgba(242,231,208,0.9)'; g.lineWidth = 3 * u;
      for (let k = 0; k <= 4; k++) { const q = clamp((t - 0.8 - k * 0.1) / 0.4);
        g.beginPath(); g.moveTo(x0 + k * S / 4, y0); g.lineTo(x0 + k * S / 4, y0 + S * q); g.stroke();
        g.beginPath(); g.moveTo(x0, y0 + k * S / 4); g.lineTo(x0 + S * q, y0 + k * S / 4); g.stroke(); }
      kicker('เมษายน 1967 · กรมศิลปากร', TX, 300 * u, t);
      say('ขุดค้นทดลองครั้งแรก', TX, 410 * u, t - 0.2, { size: 56 * u, weight: 800 });
      say('พบภาชนะดินเผาและสำริด\nฝังอยู่ร่วมกับโครงกระดูกมนุษย์', TX, 1360 * u, t - 2.5, { size: 44 * u, weight: 800 });
      say('ที่นี่คือแหล่งฝังศพโบราณ', TX, 1530 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- stratigraphy
  { from: bar(26), to: bar(30), cues: [[0.2, 'whoosh', 0.5], [1.2, 'tick', 0.5], [3.0, 'pop', 0.5], [5.0, 'pop', 0.5], [7.0, 'pop', 0.5], [8.0, 'thump', 0.6]],
    draw(t) {
      paper();
      const x = 110 * u, y = 560 * u, w = 560 * u, h = 860 * u;
      const dig = remap(t, 0.8, 7.4);
      const { ys, fy } = strata(x, y, w, h, dig, t);
      // trowel at the dig front
      if (dig < 1) { g.save(); g.translate(x + w * (0.5 + 0.3 * Math.sin(t * 3)), fy - 6 * u); g.rotate(-0.5);
        g.fillStyle = '#9AA0A6'; g.beginPath(); g.moveTo(0, 0); g.lineTo(-30 * u, -60 * u); g.lineTo(30 * u, -60 * u); g.closePath(); g.fill();
        g.fillStyle = E.wood; g.fillRect(-8 * u, -130 * u, 16 * u, 70 * u); g.restore(); }
      LAYERS.forEach((L, i) => { const a = clamp((fy - ys[i] + 20 * u) / (60 * u)); if (a <= 0) return;
        g.save(); g.globalAlpha = a;
        g.strokeStyle = C.ink; g.lineWidth = 3 * u; g.beginPath(); g.moveTo(x + w + 6 * u, ys[i]); g.lineTo(x + w + 34 * u, ys[i]); g.stroke();
        text(g, L.name, x + w + 44 * u, ys[i] + 10 * u, { size: 38 * u, weight: 800, family: THAI, color: i === 1 ? C.red : C.ink, align: 'left' });
        if (L.sub) text(g, L.sub, x + w + 44 * u, ys[i] + 52 * u, { size: 24 * u, weight: 800, family: THAI, color: C.inkSoft, align: 'left' });
        g.restore(); });
      kicker('ชั้นดิน = เส้นเวลา', TX, 300 * u, t);
      say('ยิ่งขุดลึก ยิ่งย้อนเวลา', TX, 410 * u, t - 0.2, { size: 58 * u, weight: 800 });
      say('แต่ละชั้นมีภาชนะคนละแบบ', TX, 1520 * u, t - 8.0, { size: 44 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- 1974–75 Penn × FAD
  { from: bar(30), to: bar(33), cues: [[0.1, 'thump', 0.6], [1.0, 'pop', 0.6], [1.6, 'pop', 0.6], [5.0, 'chime', 0.5]],
    draw(t) {
      paper();
      const ys = ['1972', '1973', '1974'], dw = 140 * u, x0 = TX - 1.5 * (dw + 12 * u) - 70 * u;
      for (let d = 0; d < 4; d++) flip(x0 + d * (dw + 12 * u), 600 * u, dw, 200 * u, ys.map((y) => y[d]), ys.map((_, i) => i * 0.18), t, { size: 150 * u });
      text(g, '–75', x0 + 3 * (dw + 12 * u) + 90 * u, 655 * u, { size: 130 * u, weight: 400, family: SERIF, color: C.red, align: 'left', alpha: clamp((t - 0.5) / 0.3) });
      [['Chester Gorman', 'University of Pennsylvania', 290], ['ปิสิฐ เจริญวงศ์', 'กรมศิลปากร', 690]].forEach(([n, org, x], i) => {
        const p = clamp(spring(t - 1.0 - i * 0.6, 'snappy')); if (p <= 0) return;
        g.save(); g.translate(x * u, 900 * u + (1 - p) * 80 * u); g.globalAlpha = p;
        g.fillStyle = C.paper2; rrect(g, -190 * u, -110 * u, 380 * u, 420 * u, 16 * u); g.fill();
        person(0, 110 * u, 110 * u, i ? C.inkSoft : C.ink);
        text(g, n, 0, 190 * u, { size: i ? 36 * u : 34 * u, weight: i ? 800 : 700, family: i ? THAI : 'Inter, sans-serif', color: C.ink });
        text(g, org, 0, 245 * u, { size: i ? 28 * u : 22 * u, weight: i ? 800 : 700, family: i ? THAI : 'Inter, sans-serif', color: C.inkSoft });
        g.restore(); });
      kicker('การขุดค้นครั้งใหญ่', TX, 300 * u, t);
      say('ทีมไทย–อเมริกัน ร่วมกันนำ', TX, 410 * u, t - 0.2, { size: 52 * u, weight: 800 });
      say('ขุดค้นอย่างละเอียดเป็นระบบ ครั้งแรกของบ้านเชียง', TX, 1330 * u, t - 5.0, { size: 40 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- the haul
  { from: bar(33), to: bar(35), cues: Array.from({ length: 6 }, (_, i) => [0.2 + i * 0.22, 'thump', 0.45]).concat([[2.5, 'pop', 0.7]]),
    draw(t) {
      paper();
      const pos = [[300, 1180], [500, 1180], [700, 1180], [400, 1020], [600, 1020], [500, 860]];
      pos.forEach(([x, y], i) => { const p = clamp(spring(t - 0.2 - i * 0.22, 'snappy')); if (p <= 0) return;
        crate(x * u, y * u - (1 - p) * 300 * u, 190 * u, 150 * u, i === 5 ? 'PENN' : 'FAD · BC', { rot: (hash(i, 3) - 0.5) * 0.04 }); });
      const n = Math.min(6, Math.round(6 * clamp(spring(t - 0.3, 40, 13))));
      kicker('สิ่งที่ขุดได้', TX, 300 * u, t);
      big(`ราว ${n} ตัน`, TX, 540 * u, t - 0.2, { size: 150 * u, color: C.red });
      say('เศษภาชนะ เครื่องมือหิน และโลหะ', TX, 1320 * u, t - 1.0, { size: 46 * u, weight: 800 });
      say('ส่งไปวิเคราะห์ต่อที่ Penn Museum สหรัฐฯ', TX, 1430 * u, t - 2.5, { size: 42 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- burials
  { from: bar(35), to: bar(38), cues: [[0.2, 'swish', 0.5], [1.0, 'pop', 0.4], [1.5, 'pop', 0.4], [2.0, 'pop', 0.4], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      g.fillStyle = '#9C6B43'; g.fillRect(0, 560 * u, W, 640 * u);
      g.fillStyle = '#86593A'; for (let i = 0; i < 40; i++) { g.beginPath(); g.arc(hash(i, 21) * W, 580 * u + hash(i, 22) * 600 * u, (3 + hash(i, 23) * 8) * u, 0, 7); g.fill(); }
      grave(TX + 10 * u, 880 * u, 340 * u, t, remap(t, 0.6, 3.2));
      kicker('การฝังศพ', TX, 300 * u, t);
      say('ผู้คนที่นี่ฝังศพพร้อมข้าวของ', TX, 410 * u, t - 0.2, { size: 52 * u, weight: 800 });
      say('ภาชนะดินเผา กำไลสำริด ลูกปัด', TX, 1310 * u, t - 2.0, { size: 48 * u, weight: 800, color: C.red });
      say('ร่องรอยของความเชื่อ และการดูแลผู้ล่วงลับ', TX, 1430 * u, t - 5.0, { size: 42 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- the famous swirls, painted
  { from: bar(38), to: bar(41), cues: [[0.2, 'swish', 0.5], [0.8, 'swish', 0.3], [2.0, 'swish', 0.3], [3.2, 'swish', 0.3], [5.0, 'chime', 0.6]],
    draw(t) {
      paper();
      g.fillStyle = C.paper2; g.beginPath(); g.ellipse(TX, 1270 * u, 330 * u, 40 * u, 0, 0, 7); g.fill();
      const p = remap(t, 0.4, 4.8);
      pot(TX, 960 * u, 270 * u, { paint: p });
      // brush tip following the newest stroke
      if (p > 0 && p < 1) { const bx = TX + Math.sin(t * 5) * 150 * u, by = 940 * u + Math.cos(t * 3.7) * 90 * u;
        g.save(); g.translate(bx, by); g.rotate(-0.7); g.fillStyle = E.wood; g.fillRect(-6 * u, -230 * u, 12 * u, 190 * u);
        g.fillStyle = E.terra; g.beginPath(); g.moveTo(-10 * u, -40 * u); g.quadraticCurveTo(0, 10 * u, 10 * u, -40 * u); g.fill(); g.restore(); }
      kicker('สมัยปลาย · ราว 300 ปีก่อน ค.ศ. – ค.ศ. 200', TX, 300 * u, t);
      say('ลายก้นหอยสีแดงบนพื้นสีนวล', TX, 410 * u, t - 0.2, { size: 54 * u, weight: 800 });
      say('กลายเป็นสัญลักษณ์ของบ้านเชียง', TX, 1420 * u, t - 5.0, { size: 50 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- pottery through time
  { from: bar(41), to: bar(43), cues: [[0.2, 'pop', 0.5], [0.6, 'pop', 0.5], [1.0, 'pop', 0.5], [2.5, 'thump', 0.6]],
    draw(t) {
      paper();
      [['early', 'สมัยต้น'], ['mid', 'สมัยกลาง'], ['late', 'สมัยปลาย']].forEach(([st, lab], i) => {
        const p = clamp(spring(t - 0.2 - i * 0.4, 'playful')); if (p <= 0) return;
        const x = 230 * u + i * 280 * u;
        g.save(); g.translate(x, 900 * u); g.scale(p, p); pot(0, 0, 110 * u, { style: st, paint: 1 }); g.restore();
        text(g, lab, x, 1100 * u, { size: 38 * u, weight: 800, family: THAI, color: i === 2 ? C.red : C.ink, alpha: p }); });
      g.strokeStyle = C.inkSoft; g.lineWidth = 4 * u; const a = clamp(spring(t - 1.2, 'default'));
      g.beginPath(); g.moveTo(150 * u, 1170 * u); g.lineTo(150 * u + 720 * u * a, 1170 * u); g.stroke();
      if (a > 0.9) { g.fillStyle = C.inkSoft; g.beginPath(); g.moveTo(880 * u, 1170 * u); g.lineTo(855 * u, 1155 * u); g.lineTo(855 * u, 1185 * u); g.fill(); }
      kicker('ภาชนะเปลี่ยนไปตามยุค', TX, 300 * u, t);
      say('ยุคแรกเป็นสีดำ ลายขูดขีด', TX, 410 * u, t - 0.2, { size: 48 * u, weight: 800 });
      say('ลายเขียนสีแดงอันโด่งดัง\nมาทีหลังสุด', TX, 1300 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- bronze
  { from: bar(43), to: bar(46), cues: [[0.2, 'chime', 0.5], [1.0, 'pop', 0.5], [1.6, 'pop', 0.5], [2.5, 'chime', 0.4], [5.0, 'thump', 0.6]],
    draw(t) {
      night('#22150D');
      const lg = g.createRadialGradient(TX, 900 * u, 50 * u, TX, 900 * u, 600 * u); lg.addColorStop(0, 'rgba(201,141,58,0.35)'); lg.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = lg; g.fillRect(0, 0, W, H);
      for (let i = 0; i < 3; i++) { const p = clamp(spring(t - 0.2 - i * 0.2, 'snappy')); if (p <= 0) continue;
        g.save(); g.translate(270 * u, 760 * u + i * 110 * u); g.scale(p, p); bangle(0, 0, 110 * u, t, { phase: i * 0.5 }); g.restore(); }
      const s1 = clamp(spring(t - 1.0, 'heavy')); if (s1 > 0) { g.save(); g.globalAlpha = s1; spear(560 * u, 900 * u, 200 * u, 0.15); g.restore(); }
      const s2 = clamp(spring(t - 1.6, 'playful')); if (s2 > 0) { g.save(); g.translate(790 * u, 950 * u); g.scale(s2, s2); bell(0, 0, 130 * u, Math.sin(t * 4) * 0.15); g.restore(); }
      [['กำไล', 270, 1140], ['หัวหอก', 560, 1140], ['กระดิ่ง', 790, 1140]].forEach(([s, x, y], i) => text(g, s, x * u, y * u, { size: 36 * u, weight: 800, family: THAI, color: C.fog, alpha: clamp((t - 1 - i * 0.3) / 0.3) }));
      kicker('สำริด', TX, 300 * u, t, { color: E.ochre });
      say('ทองแดงผสมดีบุก หล่อเป็นเครื่องมือและเครื่องประดับ', TX, 410 * u, t - 0.2, { size: 36 * u, weight: 800, color: C.cream });
      say('พบทั้งเบ้าหลอมและแม่พิมพ์\nหลักฐานว่าหล่อสำริดกันในท้องถิ่น', TX, 1300 * u, t - 5.0, { size: 42 * u, weight: 800, color: E.bronzeHi });
      finish();
    } },
  // ---------------------------------------------------------------- the 1970s claim
  { from: bar(46), to: bar(49), cues: [[0.2, 'whoosh', 0.5], [1.5, 'pop', 0.6], [3.75, 'impact', 1.0], [6.0, 'thump', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 3.75, 16); g.translate(sx, sy);
      paper();
      const Y = 900 * u;
      axis(Y, clamp(spring(t - 0.4, 'default')));
      marker(-3600, Y, 'ราว 3,600', t - 1.5);
      kicker('ทศวรรษ 1970 · ข่าวใหญ่', TX, 300 * u, t);
      say('มีการเสนอว่าสำริดที่บ้านเชียง\nเก่าถึงราว 3,600 ปีก่อน ค.ศ.', TX, 410 * u, t - 0.2, { size: 46 * u, weight: 800 });
      stamp("WORLD'S OLDEST?", TX, 1180 * u, t - 3.75, { size: 80 * u, rot: -0.08 });
      say('ถ้าจริง จะเป็นยุคสำริดที่เก่าที่สุดในโลก', TX, 1400 * u, t - 6.0, { size: 40 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- revised, still debated
  { from: bar(49), to: bar(52), cues: [[0.2, 'swish', 0.5], [1.4, 'pop', 0.6], [2.6, 'pop', 0.6], [5.0, 'impact', 0.8]],
    draw(t) {
      paper();
      const Y = 900 * u;
      axis(Y, 1);
      marker(-3600, Y, 'ราว 3,600', 1, { color: C.inkSoft, crossed: remap(t, 0.3, 0.8) });
      marker(-2000, Y, 'ราว 2,000', t - 1.4, { up: -1 });
      marker(-1000, Y, 'ราว 1,000', t - 2.6);
      kicker('ผลวัดอายุชุดใหม่ ๆ', TX, 300 * u, t);
      say('คาร์บอน-14 ให้ตัวเลขที่ใหม่กว่ามาก', TX, 410 * u, t - 0.2, { size: 46 * u, weight: 800 });
      g.fillStyle = 'rgba(178,67,42,0.12)'; g.fillRect(AX(-2000), Y - 12 * u, AX(-1000) - AX(-2000), 24 * u * clamp(t - 2.6));
      stamp('DATES DEBATED', TX, 1280 * u, t - 5.0, { size: 84 * u, rot: -0.08 });
      say('นักวิชาการยังเถียงกันอยู่ว่า สำริดเริ่ม\nราว 2,000 หรือราว 1,000 ปีก่อน ค.ศ.', TX, 1440 * u, t - 5.4, { size: 38 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- World Heritage 1992
  { from: bar(52), to: bar(55), cues: [[0.1, 'thump', 0.7], [1.0, 'chime', 0.6], [5.0, 'pop', 0.5]],
    draw(t) {
      paper();
      const fy = track(t, [[0, 220 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1080 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 470 * u, 90 * u, 14 * u); g.fill();
      text(g, 'WORLD HERITAGE · 1992', 305 * u, 472 * u, { size: 28 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 2 * u });
      // a ring of small swirls as a border ornament
      g.strokeStyle = 'rgba(169,60,34,0.5)'; g.lineWidth = 4 * u; g.lineCap = 'round';
      for (let k = 0; k < 7; k++) { g.beginPath(); for (let i = 0; i <= 24; i++) { const a = i / 24 * 10 * (k % 2 ? 1 : -1), r = (2 + i * 1.1) * u; g.lineTo(190 * u + k * 115 * u + Math.cos(a) * r, 1460 * u + Math.sin(a) * r); } g.stroke(); }
      g.restore();
      big('1992', TX, 800 * u, t - 0.3, { size: 230 * u, color: C.red });
      say('ขึ้นทะเบียนเป็นมรดกโลก', TX, 940 * u, t - 1.0, { size: 58 * u, weight: 800 });
      say('ในฐานะหลักฐานของการปลูกข้าว เลี้ยงสัตว์\nทำเครื่องปั้นดินเผา และหล่อสำริด\nในยุคก่อนประวัติศาสตร์', TX, 1130 * u, t - 2.6, { size: 38 * u, weight: 800, color: C.inkSoft });
      say('ประกาศโดย UNESCO', TX, 1390 * u, t - 5.0, { size: 42 * u, weight: 800, color: C.red });
      finish(0.7);
    } },
  // ---------------------------------------------------------------- looting at night
  { from: bar(55), to: bar(58), cues: [[0.2, 'riser', 0.4], [2.5, 'thump', 0.6], [5.0, 'impact', 0.8]],
    draw(t) {
      const gy = 1200 * u;
      village(t, { gy, dusk: 1 });
      for (let i = 0; i < 3; i++) digger(230 * u + i * 260 * u, gy + 20 * u, 150 * u, t, '#0B0704', i * 1.3);
      // lantern glow
      const lg = g.createRadialGradient(560 * u, gy - 40 * u, 10 * u, 560 * u, gy - 40 * u, 260 * u); lg.addColorStop(0, 'rgba(240,180,90,0.5)'); lg.addColorStop(1, 'rgba(240,180,90,0)');
      g.fillStyle = lg; g.fillRect(0, 0, W, H); g.fillStyle = '#F0B45A'; g.beginPath(); g.arc(560 * u, gy - 20 * u, 12 * u, 0, 7); g.fill();
      for (let i = 0; i < 4; i++) { const p = clamp(spring(t - 2.5 - i * 0.3, 'snappy')); if (p <= 0) continue; crate(330 * u + i * 140 * u, gy + 260 * u, 110 * u, 80 * u * p); }
      band(190 * u, 380 * u, 1);
      kicker('ด้านมืด · ต้นทศวรรษ 1970', TX, 280 * u, t);
      say('ไหบ้านเชียงกลายเป็นของสะสมราคาแพง', TX, 390 * u, t - 0.2, { size: 44 * u, weight: 800, color: C.cream });
      say('มีการลักลอบขุด และขนออกนอกประเทศจำนวนมาก', TX, 480 * u, t - 2.5, { size: 38 * u, weight: 800, color: C.fog });
      if (t > 5) band(1380 * u, 210 * u, 1);
      say('ราวปี 1972 จึงมีกฎหมาย\nห้ามซื้อขายและส่งออก', TX, 1450 * u, t - 5.0, { size: 44 * u, weight: 800, color: '#E8805F' });
      finish();
    } },
  // ---------------------------------------------------------------- coming home
  { from: bar(58), to: bar(61), cues: [[0.2, 'thump', 0.6], [1.5, 'whoosh', 0.6], [3.5, 'pop', 0.7], [5.6, 'chime', 0.6]],
    draw(t) {
      paper();
      kicker('ปี 2008 · แคลิฟอร์เนีย สหรัฐฯ', TX, 300 * u, t);
      say('เจ้าหน้าที่สหรัฐฯ ตรวจค้นพิพิธภัณฑ์\nและนักสะสม พบโบราณวัตถุลักลอบนำเข้า', TX, 400 * u, t - 0.2, { size: 42 * u, weight: 800 });
      // crates flying home along an arc
      const A = [170 * u, 1000 * u], B = [790 * u, 1000 * u];
      g.strokeStyle = C.paper3; g.lineWidth = 5 * u; g.setLineDash([16 * u, 12 * u]); g.beginPath(); g.moveTo(...A); g.quadraticCurveTo(TX, 640 * u, ...B); g.stroke(); g.setLineDash([]);
      text(g, 'USA', A[0], A[1] + 70 * u, { size: 36 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft });
      text(g, 'ไทย', B[0], B[1] + 70 * u, { size: 40 * u, weight: 800, family: THAI, color: C.red });
      for (let i = 0; i < 5; i++) { const q = clamp((t - 1.5 - i * 0.25) / 1.6); if (q <= 0) continue; const e = q * q * (3 - 2 * q);
        const x = (1 - e) * (1 - e) * A[0] + 2 * (1 - e) * e * TX + e * e * B[0], y = (1 - e) * (1 - e) * A[1] + 2 * (1 - e) * e * 640 * u + e * e * B[1];
        crate(x, y + 30 * u, 90 * u, 70 * u, '', { rot: (e - 0.5) * 0.5 }); }
      const n = Math.round(554 * clamp(spring(t - 3.5, 30, 11)));
      text(g, `${Math.min(n, 554)}`, TX, 1290 * u, { size: 140 * u, weight: 400, family: SERIF, color: C.red, alpha: clamp((t - 3.5) / 0.2) });
      say('ชิ้น ถูกส่งคืนไทยในปี 2014', TX, 1390 * u, t - 3.8, { size: 46 * u, weight: 800 });
      say('และยังมีการส่งคืนอีกหลายครั้ง จนถึงปี 2024', TX, 1500 * u, t - 5.6, { size: 38 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- the museum today
  { from: bar(61), to: bar(64), cues: [[0.2, 'swish', 0.5], [1.0, 'pop', 0.5], [1.4, 'pop', 0.5], [1.8, 'pop', 0.5], [5.0, 'chime', 0.6]],
    draw(t) {
      paper();
      g.fillStyle = C.paper2; g.fillRect(0, 560 * u, W, 840 * u);
      const x = 130 * u, y = 640 * u, w = 760 * u, h = 520 * u;
      vitrine(x, y, w, h);
      [[260, 'late', 0.95], [450, 'mid', 0.8], [640, 'late', 1.05], [800, 'early', 0.75]].forEach(([px, st, k], i) => {
        const p = clamp(spring(t - 1.0 - i * 0.4, 'snappy')); if (p <= 0) return;
        g.save(); g.translate(px * u, y + h - 30 * u - 1.12 * 120 * u * k); g.scale(p, p); pot(0, 0, 120 * u * k, { style: st, paint: 1 }); g.restore(); });
      bangle(450 * u, y + 110 * u, 50 * u, t, { phase: 0.4 });
      vitrineGlass(x, y, w, h);
      kicker('วันนี้', TX, 300 * u, t);
      say('พิพิธภัณฑสถานแห่งชาติ บ้านเชียง', TX, 410 * u, t - 0.2, { size: 52 * u, weight: 800 });
      say('และหลุมขุดค้นวัดโพธิ์ศรีใน\nให้เห็นการฝังศพในชั้นดิน', TX, 1420 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------------------------------------------------------- closing card
  { from: bar(64), to: bar(68), cues: [[0, 'thump', 0.9], [1.0, 'swish', 0.4], [5.0, 'chime', 0.5]],
    draw(t) {
      night('#22150D');
      const lg = g.createRadialGradient(TX, 1250 * u, 40 * u, TX, 1250 * u, 520 * u); lg.addColorStop(0, 'rgba(201,141,58,0.3)'); lg.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = lg; g.fillRect(0, 0, W, H);
      big('BAN CHIANG', TX, 640 * u, t, { size: 150 * u, color: C.cream });
      const p = spring(t - 0.7, 'default');
      g.fillStyle = C.red; g.fillRect(TX - 330 * u * p, 700 * u, 660 * u * p, 10 * u);
      say('บ้านเชียง', TX, 830 * u, t - 1.0, { size: 76 * u, weight: 800, color: '#D9684A' });
      say('มรดกโลก · อุดรธานี', TX, 930 * u, t - 1.8, { size: 44 * u, weight: 800, color: C.fog });
      pot(TX, 1260 * u, 140 * u, { paint: remap(t, 1.5, 7) });
      finish();
    } },
  { from: bar(68), to: bar(72), cues: Array.from({ length: 4 }, (_, i) => [i * 1.25, 'tick', 0.35]).concat([[2.5, 'pop', 0.6], [5.0, 'chime', 0.8]]),
    draw(t) {
      const gy = 1180 * u;
      village(t, { gy });
      kapok(250 * u, gy, 220 * u);
      g.save(); g.beginPath(); g.rect(0, 0, W, gy + 24 * u); g.clip(); pot(720 * u, gy + 95 * u, 110 * u, { rot: 0.25 }); g.restore();
      glint(700 * u, gy - 20 * u, 40 * u, Math.sin(t * 2.5));
      band(190 * u, 380 * u);
      say('ถ้าคุณสะดุดเจอไหโบราณแบบนี้\nคุณจะทำอย่างไร?', TX, 290 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.ink });
      say('คอมเมนต์บอกได้เลย', TX, 500 * u, t - 2.5, { size: 48 * u, weight: 800, color: C.red });
      finish(0.5);
    } },
];
