// Act 2 — Berryessa, the taxi, the 340, the suspect (0:55–2:05, bars 22–50).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, rrect, text, typewriter, topScrim, shake } from './kit.js';
import { cipherGrid, crosshair, mapBay, PLACE, glyph } from './props.js';

function hood(x, y, s, t) {            // hooded silhouette with the crosshair on the chest
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = '#0B0B0E';
  g.beginPath(); g.moveTo(-0.32, -1.55); g.lineTo(0.32, -1.55); g.lineTo(0.36, -0.75); g.lineTo(0.95, -0.5); g.quadraticCurveTo(1.05, 0.2, 1.0, 0.8);
  g.lineTo(-1.0, 0.8); g.quadraticCurveTo(-1.05, 0.2, -0.95, -0.5); g.lineTo(-0.36, -0.75); g.closePath(); g.fill();
  g.fillStyle = C.paper; g.globalAlpha = 0.85; rrect(g, -0.2, -1.25, 0.14, 0.06, 0.03); g.fill(); rrect(g, 0.06, -1.25, 0.14, 0.06, 0.03); g.fill(); g.globalAlpha = 1;
  g.restore();
  crosshair(x, y - 0.15 * s, 0.32 * s, t, C.paper, 8);
}

export default () => [
  // ---------------- Chapter 4 — Berryessa and the taxi
  { from: bar(22), to: bar(24), cues: [[0, 'whoosh', 0.5], [1.25, 'pop', 0.8]],
    draw(t) {
      const cam = { lat: track(t, [[0, 38.15], [0.05, 38.52]], 'heavy'), lon: -122.24, z: track(t, [[0, 1000], [0.05, 2600]], 'heavy') * u };
      const P = mapBay(cam); topScrim();
      pin(...P(PLACE.berryessa), t - 1.25, { label: 'Lake Berryessa', side: 1 });
      kicker('27 ก.ย. 1969 · ทะเลสาบ Berryessa', TX, 250 * u, t, { color: C.red });
      say('ช่วงเย็น ริมทะเลสาบ', TX, 345 * u, t - 0.3, { size: 58 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(24), to: bar(26), cues: [[0, 'thump', 0.8], [1.0, 'riser', 0.5]],
    draw(t) {
      night('#0D0C10');
      hood(TX, 1000 * u + (1 - spring(t, 'heavy')) * 500 * u, 360 * u, remap(t, 0.9, 1.6));
      say('เขาสวมชุดคลุมหัวสีดำ', TX, 330 * u, t - 0.2, { size: 60 * u, weight: 800, color: C.cream });
      say('มีสัญลักษณ์เป้าเล็งบนหน้าอก', TX, 1460 * u, t - 1.6, { size: 52 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(26), to: bar(28), cues: [[0.3, 'type', 0.6], [1.2, 'type', 0.6], [2.5, 'thump', 0.6]],
    draw(t) {
      night(C.night2);
      // car door panel with the handwritten note
      g.fillStyle = '#C9B98F'; rrect(g, 80 * u, 450 * u, W - 200 * u, 640 * u, 30 * u); g.fill();
      g.fillStyle = '#B3A378'; rrect(g, 740 * u, 720 * u, 110 * u, 30 * u, 10 * u); g.fill();
      const f = { size: 56 * u, weight: 400, family: '"Instrument Serif"', color: C.ink, cps: 10 };
      typewriter('Vallejo', 150 * u, 560 * u, t - 0.3, f);
      typewriter('12-20-68', 150 * u, 640 * u, t - 0.9, f);
      typewriter('7-4-69', 150 * u, 720 * u, t - 1.5, f);
      typewriter('Sept 27-69-6:30', 150 * u, 800 * u, t - 2.0, f);
      typewriter('by knife', 150 * u, 880 * u, t - 2.9, f);
      crosshair(620 * u, 600 * u, 70 * u, remap(t, 0.1, 0.5), C.ink, 6);
      kicker('ข้อความที่เขาเขียนไว้บนประตูรถ', TX, 330 * u, t, { color: C.red });
      say('Cecelia 22 ปี เสียชีวิต · Bryan 20 ปี รอด', TX, 1300 * u, t - 2.5, { size: 48 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(28), to: bar(30), cues: [[0, 'whoosh', 0.5], [1.25, 'pop', 0.8]],
    draw(t) {
      const cam = { lat: 37.789, lon: -122.452, z: track(t, [[0, 1000], [0.05, 9000]], 'heavy') * u };
      const P = mapBay(cam, { grid: 0.02 }); topScrim();
      pin(...P(PLACE.sf), t - 1.25, { label: 'Presidio Heights', side: 1 });
      kicker('11 ต.ค. 1969 · ซานฟรานซิสโก', TX, 250 * u, t, { color: C.red });
      say('Paul Stine คนขับแท็กซี่ วัย 29', TX, 345 * u, t - 0.3, { size: 54 * u, weight: 800, color: C.cream });
      say('ถูกยิงเสียชีวิตในรถของตัวเอง', TX, 1480 * u, t - 2.5, { size: 50 * u, weight: 700, color: C.cream });
      finish(0.8);
    } },
  { from: bar(30), to: bar(32), cues: [[0.2, 'swish', 0.6], [2.5, 'thump', 0.7]],
    draw(t) {
      paper();
      // envelope + torn shirt swatch
      const s = spring(t - 0.2, 'default');
      g.save(); g.translate(TX - 60 * u, 760 * u + (1 - s) * 800 * u); g.rotate(-0.06);
      g.fillStyle = '#F2EAD6'; rrect(g, -330 * u, -200 * u, 660 * u, 400 * u, 8 * u); g.fill();
      g.strokeStyle = C.paper3; g.lineWidth = 3 * u; g.beginPath(); g.moveTo(-330 * u, -200 * u); g.lineTo(0, 30 * u); g.lineTo(330 * u, -200 * u); g.stroke();
      text(g, 'S.F. Chronicle', 0, 120 * u, { size: 46 * u, weight: 400, family: '"Instrument Serif"', color: C.ink });
      g.restore();
      const q = spring(t - 1.0, 'playful');
      if (q > 0) { g.save(); g.translate(TX + 220 * u, 980 * u); g.rotate(0.25); g.scale(q, q);
        g.fillStyle = '#E7E2D8'; g.beginPath(); for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2, r = (90 + hash(i, 9) * 40) * u; g.lineTo(Math.cos(a) * r * 1.3, Math.sin(a) * r); } g.closePath(); g.fill();
        g.strokeStyle = '#9DB0C6'; g.lineWidth = 3 * u; for (let i = -3; i <= 3; i++) { g.beginPath(); g.moveTo(i * 30 * u, -110 * u); g.lineTo(i * 30 * u, 110 * u); g.stroke(); }
        g.restore(); }
      say('เขาฉีกเสื้อของเหยื่อ', TX, 330 * u, t - 0.1, { size: 60 * u, weight: 800 });
      say('ส่งไปพร้อมจดหมาย\nเพื่อพิสูจน์ว่าเป็นตัวจริง', TX, 1300 * u, t - 2.5, { size: 52 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- Chapter 5 — the 340
  { from: bar(32), to: bar(34), cues: [[0, 'thump', 0.6], ...Array.from({ length: 8 }, (_, i) => [0.3 + i * 0.25, 'type', 0.3])],
    draw(t) {
      paper();
      const cell = 52 * u, cols = 17, rows = 20, x0 = TX - (cols * cell) / 2;
      g.fillStyle = '#F4EEDF'; g.fillRect(x0 - 16 * u, 400 * u, cols * cell + 32 * u, rows * cell + 24 * u);
      cipherGrid(x0, 412 * u, cols, rows, cell, remap(t, 0.2, 2.6), { seed: 340 });
      kicker('8 พ.ย. 1969', TX, 270 * u, t);
      const n = Math.round(340 * clamp(spring(t - 0.2, 30, 11) * 1.004));
      if (t > 2.7) { g.fillStyle = 'rgba(239,230,210,0.85)'; g.fillRect(0, 1380 * u, W, 220 * u); }
      text(g, `รหัส ${n}`, TX, 1520 * u, { size: 110 * u, weight: 800, family: THAI, color: C.red, alpha: clamp((t - 2.7) / 0.1) });
      finish(0.6);
    } },
  { from: bar(34), to: bar(37), cues: Array.from({ length: 12 }, (_, i) => [0.5 + i * 0.4, 'tick', 0.35]),
    draw(t) {
      paper();
      const cell = 52 * u, cols = 17, rows = 14, x0 = TX - (cols * cell) / 2;
      cipherGrid(x0, 560 * u, cols, rows, cell, 1, { seed: 340, color: C.inkSoft });
      // a magnifier sweeping over the cipher
      const mx = TX + Math.sin(t * 1.1) * 300 * u, my = 900 * u + Math.cos(t * 0.8) * 200 * u;
      g.save(); g.beginPath(); g.arc(mx, my, 130 * u, 0, 7); g.clip(); g.fillStyle = C.paper; g.fillRect(0, 0, W, H);
      g.translate(mx, my); g.scale(1.6, 1.6); g.translate(-mx, -my); cipherGrid(x0, 560 * u, cols, rows, cell, 1, { seed: 340, color: C.ink }); g.restore();
      g.strokeStyle = C.ink; g.lineWidth = 12 * u; g.beginPath(); g.arc(mx, my, 130 * u, 0, 7); g.stroke();
      g.beginPath(); g.moveTo(mx + 92 * u, my + 92 * u); g.lineTo(mx + 200 * u, my + 200 * u); g.lineWidth = 26 * u; g.lineCap = 'round'; g.stroke();
      const yr = Math.min(2019, 1969 + Math.floor(remap(t, 0.5, 6.5) * 50));
      kicker('นักถอดรหัส · FBI · มือสมัครเล่นทั่วโลก', TX, 300 * u, t);
      say('ไม่มีใครอ่านออก', TX, 420 * u, t - 0.3, { size: 64 * u, weight: 800 });
      text(g, String(yr), TX, 1460 * u, { size: 150 * u, weight: 400, family: SERIF, color: C.red });
      finish(0.6);
    } },
  { from: bar(37), to: bar(40), cues: Array.from({ length: 10 }, (_, i) => [0.3 + i * 0.3, 'swish', 0.35]),
    draw(t) {
      paper();
      for (let i = 0; i < 22; i++) {
        const at = 0.2 + i * 0.16, s = spring(t - at, 'snappy'); if (s <= 0) continue;
        g.save(); g.translate(TX + (hash(i, 2) - 0.5) * 300 * u, 900 * u - i * 10 * u - (1 - s) * 900 * u); g.rotate((hash(i, 3) - 0.5) * 0.5);
        g.fillStyle = i % 2 ? '#F2EAD6' : '#E9E0C8'; rrect(g, -260 * u, -150 * u, 520 * u, 300 * u, 6 * u); g.fill();
        g.strokeStyle = C.paper3; g.lineWidth = 3 * u; g.beginPath(); g.moveTo(-260 * u, -150 * u); g.lineTo(0, 20 * u); g.lineTo(260 * u, -150 * u); g.stroke();
        crosshair(170 * u, 80 * u, 34 * u, 1, C.ink, 4);
        g.restore();
      }
      kicker('1969 – 1974', TX, 330 * u, t);
      say('จดหมายมากกว่า 20 ฉบับ', TX, 1320 * u, t - 1.0, { size: 64 * u, weight: 800 });
      say('ถึงหนังสือพิมพ์และตำรวจ', TX, 1430 * u, t - 2.5, { size: 48 * u, weight: 600, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(40), to: bar(42), cues: [[0.2, 'type', 0.6], [1.0, 'type', 0.6], [2.5, 'impact', 0.9]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 18); g.translate(sx, sy);
      paper();
      g.save(); g.translate(TX, 800 * u); g.rotate(-0.04);
      g.fillStyle = '#F2EAD6'; rrect(g, -380 * u, -230 * u, 760 * u, 460 * u, 8 * u); g.fill();
      typewriter('Me - 37', -280 * u, -40 * u, t - 0.2, { size: 130 * u, weight: 400, family: '"Instrument Serif"', color: C.ink, cps: 8 });
      typewriter('SFPD - 0', -280 * u, 130 * u, t - 1.0, { size: 130 * u, weight: 400, family: '"Instrument Serif"', color: C.red, cps: 8 });
      g.restore();
      kicker('1974 · บนซองจดหมาย', TX, 330 * u, t);
      say('เขาอ้างว่าฆ่าไป 37 คน', TX, 1250 * u, t - 2.5, { size: 60 * u, weight: 800 });
      say('ตำรวจยืนยันได้เพียง 5', TX, 1360 * u, t - 3.0, { size: 52 * u, weight: 700, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------- Chapter 6 — the suspect
  { from: bar(42), to: bar(44), cues: [[0, 'thump', 0.7], [1.25, 'pop', 0.5]],
    draw(t) {
      paper();
      kicker('ผู้ต้องสงสัยหลัก', TX, 330 * u, t);
      const s = spring(t, 'default');
      g.save(); g.translate(0, (1 - s) * 900 * u);
      g.fillStyle = C.paper2; rrect(g, 120 * u, 450 * u, W - 280 * u, 800 * u, 14 * u); g.fill();
      g.fillStyle = C.night2; rrect(g, TX - 200 * u, 500 * u, 400 * u, 480 * u, 8 * u); g.fill();
      g.save(); g.beginPath(); g.rect(TX - 200 * u, 500 * u, 400 * u, 480 * u); g.clip(); person(TX, 960 * u, 190 * u, C.fog); g.restore();
      text(g, 'Arthur Leigh Allen', TX, 1080 * u, { size: 72 * u, weight: 400, family: SERIF, color: C.ink });
      text(g, 'อดีตครู · อาศัยอยู่ใน Vallejo', TX, 1160 * u, { size: 38 * u, weight: 600, family: THAI, color: C.inkSoft });
      g.restore();
      say('ถูกสอบสวนมาหลายสิบปี', TX, 1400 * u, t - 1.25, { size: 54 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(44), to: bar(46), cues: [[0.4, 'click', 0.8], [1.2, 'click', 0.8], [2.0, 'click', 0.8]],
    draw(t) {
      paper();
      kicker('หลักฐานที่ตรวจสอบ', TX, 330 * u, t);
      [['ลายนิ้วมือ', 0.4], ['ลายมือ', 1.2], ['ดีเอ็นเอบางส่วน (2002)', 2.0]].forEach(([s, at], i) => {
        const y = 600 * u + i * 240 * u, p = spring(t - at, 'snappy');
        g.save(); g.globalAlpha = clamp((t - at + 0.3) / 0.15);
        text(g, s, 140 * u, y, { size: 64 * u, weight: 800, family: THAI, color: C.ink, align: 'left' });
        if (p > 0) { g.save(); g.translate(W - 240 * u, y - 24 * u); g.scale(p, p); g.strokeStyle = C.red; g.lineWidth = 16 * u; g.lineCap = 'round';
          g.beginPath(); g.moveTo(-50 * u, -50 * u); g.lineTo(50 * u, 50 * u); g.moveTo(50 * u, -50 * u); g.lineTo(-50 * u, 50 * u); g.stroke(); g.restore(); }
        g.restore();
      });
      say('ไม่มีอะไรเชื่อมโยงเขาได้ชัดเจน', TX, 1380 * u, t - 2.6, { size: 54 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(46), to: bar(48), cues: [[0.1, 'thump', 0.6], [1.25, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 1.25, 20); g.translate(sx, sy);
      paper();
      kicker('สิงหาคม 1992', TX, 420 * u, t);
      say('Allen เสียชีวิต', TX, 620 * u, t - 0.2, { size: 70 * u, weight: 800 });
      stamp('NEVER CHARGED', TX, 950 * u, t - 1.25, { size: 110 * u, rot: -0.08 });
      say('ไม่เคยถูกตั้งข้อหา', TX, 1250 * u, t - 1.9, { size: 56 * u, weight: 700, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(48), to: bar(50), cues: Array.from({ length: 12 }, (_, i) => [0.1 + i * 0.12, 'pop', 0.3]),
    draw(t) {
      night(C.night2);
      for (let i = 0; i < 12; i++) {
        const s = spring(t - 0.1 - i * 0.12, 'playful'); if (s <= 0) continue;
        const c = i % 4, r = Math.floor(i / 4), x = TX - 300 * u + c * 200 * u, y = 640 * u + r * 260 * u;
        g.save(); g.translate(x, y); g.scale(s, s);
        g.fillStyle = C.night3; rrect(g, -80 * u, -110 * u, 160 * u, 220 * u, 10 * u); g.fill();
        g.save(); g.beginPath(); g.rect(-80 * u, -110 * u, 160 * u, 220 * u); g.clip(); person(0, 100 * u, 70 * u, C.fog); g.restore();
        text(g, '?', 0, -10 * u, { size: 90 * u, weight: 400, family: SERIF, color: C.red });
        g.restore();
      }
      say('ผู้ต้องสงสัยอีกหลายสิบคน', TX, 330 * u, t - 0.1, { size: 60 * u, weight: 800, color: C.cream });
      say('ไม่มีใครพิสูจน์ได้สักคน', TX, 1460 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
];
