// Act 2 — the search, the ravine, the theories, the avalanche answer (1:20–3:00, bars 32–72).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, rrect, text, typewriter, shake } from './kit.js';
import { snowfall, slope, tent, prints, cedar, forestLine, hiker, SNOW, SNOW2, SKY } from './props.js';

export default () => [
  // ---------------- Chapter 5 — the search
  { from: bar(32), to: bar(34), cues: Array.from({ length: 5 }, (_, i) => [i * 0.15, 'tick', 0.5]).concat([[1.25, 'thump', 0.7]]),
    draw(t) {
      paper();
      kicker('กุมภาพันธ์ 1959', TX, 420 * u, t);
      const d = ['12', '16', '20', '23', '26'];
      flip(TX, 800 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.15), t, { size: 360 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('พวกเขาไม่ได้กลับมาตามกำหนด', TX, 1220 * u, t - 1.0, { size: 52 * u, weight: 800 });
      say('หน่วยค้นหาพบเต็นท์ที่ว่างเปล่า', TX, 1330 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(34), to: bar(37), cues: [[0.2, 'whoosh', 0.5], [2.5, 'thump', 0.7], [5.0, 'thump', 0.7]],
    draw(t) {
      night(SKY);
      g.fillStyle = SNOW2; g.fillRect(0, 1250 * u, W, H - 1250 * u);
      cedar(TX, 1260 * u, 700 * u * spring(t, 'heavy'), '#0E1A16');
      // remains of a small fire
      g.fillStyle = '#2B2016'; g.beginPath(); g.ellipse(TX + 160 * u, 1280 * u, 90 * u, 22 * u, 0, 0, 7); g.fill();
      for (let i = 0; i < 5; i++) { g.strokeStyle = '#1A140E'; g.lineWidth = 8 * u; g.beginPath(); g.moveTo(TX + 100 * u + i * 30 * u, 1290 * u); g.lineTo(TX + 120 * u + i * 20 * u, 1250 * u); g.stroke(); }
      snowfall(t, { n: 100, wind: 0.5 });
      kicker('ใต้ต้นสนซีดาร์ ห่างจากเต็นท์ราว 1.5 กม.', TX, 300 * u, t, { color: C.red });
      say('พบ 2 ศพ ข้างกองไฟที่ดับแล้ว', TX, 410 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      say('สวมแค่ชุดชั้นใน', TX, 1440 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.ink });
      say('กิ่งไม้บนต้นถูกหักไว้สูงถึง 5 เมตร', TX, 1550 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(37), to: bar(40), cues: [[0.2, 'pop', 0.6], [1.0, 'pop', 0.6], [1.8, 'pop', 0.6], [5.0, 'thump', 0.6]],
    draw(t) {
      night(SKY);
      slope(300 * u, 600 * u);
      tent(TX + 300 * u, 520 * u, 90 * u, { cut: 1, collapsed: 0.5 });
      cedar(TX - 330 * u, 1460 * u, 260 * u);
      // three markers on the way back up
      [[0.62, 0.2], [0.45, 1.0], [0.28, 1.8]].forEach(([f, at]) => { const s = spring(t - at, 'playful'); if (s <= 0) return;
        const x = (TX - 330 * u) + ((TX + 300 * u) - (TX - 330 * u)) * f, y = 1460 * u + (520 * u - 1460 * u) * f;
        g.fillStyle = C.red; g.beginPath(); g.arc(x, y, 18 * u * s, 0, 7); g.fill(); });
      g.strokeStyle = C.red; g.setLineDash([12 * u, 12 * u]); g.lineWidth = 3 * u; g.beginPath(); g.moveTo(TX - 330 * u, 1460 * u); g.lineTo(TX + 300 * u, 520 * u); g.stroke(); g.setLineDash([]);
      snowfall(t, { n: 100, wind: 0.5 });
      say('อีก 3 ศพ อยู่ระหว่างต้นไม้กับเต็นท์', TX, 330 * u, t - 0.1, { size: 48 * u, weight: 800, color: C.ink });
      say('ราวกับพยายามเดินกลับไปที่เต็นท์', TX, 1600 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(40), to: bar(42), cues: [[0.1, 'thump', 0.6], [1.25, 'impact', 0.9]],
    draw(t) {
      paper();
      kicker('ผลชันสูตร 5 ศพแรก', TX, 420 * u, t);
      big('-25°C', TX, 780 * u, t - 0.1, { size: 220 * u, color: C.ink });
      say('เสียชีวิตจากความหนาวเย็น', TX, 960 * u, t - 1.25, { size: 60 * u, weight: 800, color: C.red });
      say('แต่ยังเหลืออีก 4 คนที่ยังหาไม่เจอ', TX, 1120 * u, t - 2.5, { size: 50 * u, weight: 700, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------- Chapter 6 — the ravine
  { from: bar(42), to: bar(45), cues: [[0.2, 'whoosh', 0.5], [2.5, 'thump', 0.7], [5.0, 'impact', 0.9]],
    draw(t) {
      night(SKY);
      // cross-section: snow layers filling a ravine
      g.fillStyle = '#0E1A16'; g.fillRect(0, 500 * u, W, 120 * u);
      const melt = remap(t, 0.5, 4.5);
      for (let k = 0; k < 8; k++) { const y = 620 * u + k * 110 * u; g.fillStyle = k % 2 ? SNOW : SNOW2; g.globalAlpha = k < 8 - melt * 6 ? 1 : 0.15; g.fillRect(0, y, W, 110 * u); }
      g.globalAlpha = 1;
      g.fillStyle = '#2E3B47'; g.fillRect(0, 1500 * u, W, 120 * u);
      for (let i = 0; i < 4; i++) { g.fillStyle = C.red; g.globalAlpha = clamp((t - 4.5) / 0.3); g.beginPath(); g.ellipse(TX - 240 * u + i * 160 * u, 1480 * u, 60 * u, 18 * u, 0, 0, 7); g.fill(); g.globalAlpha = 1; }
      text(g, '≈ 4 เมตร', 150 * u, 1100 * u, { size: 44 * u, weight: 800, family: THAI, color: C.ink, align: 'left' });
      kicker('พฤษภาคม 1959 · หิมะเริ่มละลาย', TX, 300 * u, t, { color: C.red });
      say('อีก 4 ศพ ในร่องเขาใต้หิมะลึก', TX, 410 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(45), to: bar(48), cues: [[0.2, 'thump', 0.6], [1.4, 'thump', 0.6], [2.6, 'thump', 0.6], [5.0, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 5.0, 16); g.translate(sx, sy);
      paper();
      kicker('ผลชันสูตร 4 ศพสุดท้าย', TX, 300 * u, t);
      [['กะโหลกศีรษะแตก', 0.2], ['ซี่โครงหักหลายซี่', 1.4], ['แต่แทบไม่มีบาดแผลภายนอก', 2.6]].forEach(([s, at], i) => {
        if (t < at) return; text(g, s, TX, 540 * u + i * 150 * u, { size: 58 * u, weight: 800, family: THAI, color: i === 2 ? C.red : C.ink, alpha: clamp((t - at) / 0.12) }); });
      say('แพทย์เทียบว่าแรงกระแทก\nเท่ากับถูกรถชน', TX, 1150 * u, t - 5.0, { size: 58 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(48), to: bar(50), cues: [[0.2, 'tick', 0.6], [0.5, 'tick', 0.6], [0.8, 'tick', 0.6], [1.25, 'thump', 0.6]],
    draw(t) {
      night('#08070A');
      // a geiger counter needle
      g.save(); g.translate(TX, 820 * u);
      g.fillStyle = '#2B2F36'; rrect(g, -260 * u, -200 * u, 520 * u, 380 * u, 20 * u); g.fill();
      g.fillStyle = '#E8E1CF'; g.beginPath(); g.arc(0, 60 * u, 190 * u, Math.PI, 0); g.fill();
      g.save(); g.translate(0, 60 * u); g.rotate(-Math.PI / 2 + (-0.9 + noise(t * 8, 4) * 0.25 + spring(t - 0.2, 'snappy') * 1.0)); g.fillStyle = C.red; g.fillRect(-3 * u, -170 * u, 6 * u, 170 * u); g.restore();
      g.restore();
      say('ร่างหนึ่งไม่มีลิ้น และบางร่างไม่มีดวงตา', TX, 330 * u, t - 0.1, { size: 46 * u, weight: 800, color: C.cream });
      say('เสื้อผ้าบางชิ้นมีสารกัมมันตรังสี', TX, 1300 * u, t - 1.25, { size: 52 * u, weight: 800, color: C.red });
      say('(ร่างอยู่ในลำธารใต้หิมะนานหลายเดือน)', TX, 1410 * u, t - 2.5, { size: 40 * u, weight: 600, color: C.fog });
      finish();
    } },
  // ---------------- Chapter 7 — theories
  { from: bar(50), to: bar(53), cues: Array.from({ length: 6 }, (_, i) => [0.2 + i * 0.3, 'pop', 0.4]).concat([[5.0, 'thump', 0.6]]),
    draw(t) {
      paper();
      g.fillStyle = C.paper2; g.fillRect(60 * u, 470 * u, W - 120 * u, 1000 * u);
      [['เยติ?', 260, 620], ['UFO / แสงประหลาด?', 760, 660], ['ทดลองอาวุธลับ?', 290, 900], ['คลื่นเสียงความถี่ต่ำ?', 770, 960], ['ชนเผ่าท้องถิ่น?', 300, 1200], ['หิมะถล่ม?', 760, 1260]].forEach(([s, x, y], i) => {
        const p = spring(t - 0.2 - i * 0.3, 'playful'); if (p <= 0) return;
        g.save(); g.translate(x * u, y * u); g.rotate((hash(i, 7) - 0.5) * 0.14); g.scale(p, p);
        g.fillStyle = '#F7F1E3'; g.fillRect(-200 * u, -60 * u, 400 * u, 120 * u);
        text(g, s, 0, 14 * u, { size: 40 * u, weight: 800, family: THAI, color: i === 5 ? C.red : C.ink });
        g.fillStyle = C.red; g.beginPath(); g.arc(0, -60 * u, 10 * u, 0, 7); g.fill(); g.restore(); });
      say('ทฤษฎีนับไม่ถ้วนตลอด 60 ปี', TX, 330 * u, t - 0.1, { size: 58 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(53), to: bar(55), cues: [[0.2, 'type', 0.5], [2.5, 'impact', 0.9]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 18); g.translate(sx, sy);
      paper();
      kicker('ข้อสรุปของทางการโซเวียต · 1959', TX, 330 * u, t);
      g.save(); g.translate(TX, 760 * u); g.rotate(-0.02);
      g.fillStyle = '#F7F1E3'; rrect(g, -400 * u, -200 * u, 800 * u, 400 * u, 6 * u); g.fill();
      typewriter('“พลังธรรมชาติ', -330 * u, -40 * u, t - 0.2, { size: 66 * u, weight: 800, color: C.ink, cps: 12 });
      typewriter('ที่ไม่อาจต้านทานได้”', -330 * u, 60 * u, t - 1.2, { size: 66 * u, weight: 800, color: C.ink, cps: 12 });
      g.restore();
      stamp('CLOSED', TX, 1200 * u, t - 2.5, { size: 140 * u, rot: -0.1 });
      say('ปิดคดีโดยไม่บอกว่าพลังนั้นคืออะไร', TX, 1450 * u, t - 3.0, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(55), to: bar(58), cues: [[0.1, 'thump', 0.6], [2.5, 'click', 0.8]],
    draw(t) {
      night(SKY);
      // the pass sign
      const s = spring(t - 0.2, 'heavy');
      g.fillStyle = '#3B2A1E'; g.fillRect(TX - 10 * u, 800 * u + (1 - s) * 600 * u, 20 * u, 600 * u);
      g.fillStyle = '#E8E1CF'; rrect(g, TX - 300 * u, 700 * u + (1 - s) * 600 * u, 600 * u, 180 * u, 10 * u); g.fill();
      text(g, 'Перевал Дятлова', TX, 805 * u + (1 - s) * 600 * u, { size: 60 * u, weight: 400, family: SERIF, color: C.ink });
      g.fillStyle = SNOW2; g.fillRect(0, 1400 * u, W, H - 1400 * u);
      snowfall(t, { n: 140 });
      say('ช่องเขานั้นถูกตั้งชื่อตามผู้นำกลุ่ม', TX, 330 * u, t - 0.1, { size: 52 * u, weight: 800, color: C.cream });
      say('“ช่องเขาดีอัตลอฟ”', TX, 1250 * u, t - 2.5, { size: 70 * u, weight: 800, color: C.red });
      finish();
    } },
  // ---------------- Chapter 8 — the avalanche answer
  { from: bar(58), to: bar(60), cues: [[0.1, 'thump', 0.6], [1.25, 'impact', 0.9]],
    draw(t) {
      paper();
      const ys = ['1959', '1990', '2010', '2019', '2020'], dw = 170 * u, x0 = TX - 1.5 * (dw + 14 * u);
      for (let d = 0; d < 4; d++) flip(x0 + d * (dw + 14 * u), 740 * u, dw, 250 * u, ys.map((y) => y[d]), ys.map((_, i) => i * 0.2), t, { size: 190 * u });
      kicker('อัยการรัสเซียเปิดคดีใหม่', TX, 480 * u, t);
      say('2020: สรุปว่าเป็น “หิมะถล่ม”', TX, 1050 * u, t - 1.25, { size: 58 * u, weight: 800 });
      say('ครอบครัวผู้เสียชีวิตจำนวนมากไม่ยอมรับ', TX, 1170 * u, t - 2.5, { size: 46 * u, weight: 700, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(60), to: bar(63), cues: [[0.2, 'swish', 0.5], [2.5, 'riser', 0.6], [5.0, 'impact', 1.1]],
    draw(t) {
      const [sx, sy] = shake(t, 5.0, 24); g.translate(sx, sy);
      night(SKY);
      // cross-section of the slope: a cut for the tent, wind-loaded snow above, then a slab sliding
      const slopeY = (x) => 500 * u + x * 0.6;
      g.fillStyle = SNOW2; g.beginPath(); g.moveTo(0, slopeY(0)); g.lineTo(W, slopeY(W)); g.lineTo(W, H); g.lineTo(0, H); g.fill();
      const cutX = TX + 60 * u;
      g.fillStyle = SKY; g.fillRect(cutX - 120 * u, slopeY(cutX - 120 * u) - 10 * u, 240 * u, 90 * u);
      tent(cutX, slopeY(cutX) + 70 * u, 90 * u);
      const load = remap(t, 1.0, 4.0), slide = clamp(spring(t - 5.0, 60, 12));
      g.save(); g.translate(slide * 120 * u, slide * 72 * u);
      g.fillStyle = SNOW; g.beginPath(); g.moveTo(0, slopeY(0) - 40 * u * load); g.lineTo(cutX - 120 * u, slopeY(cutX - 120 * u) - 70 * u * load); g.lineTo(cutX - 120 * u, slopeY(cutX - 120 * u)); g.lineTo(0, slopeY(0)); g.fill();
      g.restore();
      snowfall(t, { n: 160, wind: 2.2 });
      kicker('งานวิจัยสวิตเซอร์แลนด์ · 2021', TX, 300 * u, t, { color: C.red });
      say('การขุดหิมะตั้งเต็นท์ + ลมพัดหิมะมาทับถม', TX, 410 * u, t - 0.2, { size: 44 * u, weight: 800, color: C.cream });
      say('แผ่นหิมะขนาดเล็กเลื่อนลงมาทับเต็นท์', TX, 1560 * u, t - 5.0, { size: 48 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(63), to: bar(66), cues: [[0.2, 'thump', 0.6], [2.5, 'thump', 0.6], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      kicker('ทฤษฎีนี้อธิบายได้ว่า', TX, 300 * u, t);
      [['ทำไมต้องกรีดเต็นท์หนีออกมาทันที', 0.2], ['ทำไมบางคนบาดเจ็บรุนแรงโดยไม่มีแผลภายนอก', 1.5], ['ทำไมทางการไม่เห็นร่องรอยหิมะถล่มชัดเจน', 2.8]].forEach(([s, at], i) => {
        const p = spring(t - at, 'snappy'); if (p <= 0) return;
        g.save(); g.translate((1 - p) * -80 * u, 0);
        text(g, '✓', 120 * u, 560 * u + i * 170 * u, { size: 60 * u, weight: 800, family: 'Inter, sans-serif', color: C.red, alpha: clamp((t - at) / 0.12) });
        para(s, 200 * u, 560 * u + i * 170 * u, t - at);
        g.restore(); });
      say('แต่ยังมีคำถามที่ไม่มีใครตอบได้\nทำไมไม่เดินกลับไปเอาของในเต็นท์?', TX, 1250 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- Chapter 9 — the mountain keeps it
  { from: bar(66), to: bar(68), cues: [[0, 'whoosh', 0.5], [2.5, 'thump', 0.6]],
    draw(t) {
      night(SKY);
      g.fillStyle = SNOW2; g.beginPath(); g.moveTo(-100 * u, 1500 * u); g.lineTo(TX - 40 * u, 560 * u); g.lineTo(W + 100 * u, 1500 * u); g.fill();
      g.fillStyle = '#0B1422'; g.fillRect(0, 1500 * u, W, H - 1500 * u);
      for (let i = 0; i < 9; i++) { g.fillStyle = C.red; g.globalAlpha = clamp((t - 0.3 - i * 0.12) / 0.2); g.beginPath(); g.arc(TX - 320 * u + i * 80 * u, 1580 * u, 14 * u, 0, 7); g.fill(); g.globalAlpha = 1; }
      snowfall(t, { n: 160 });
      say('9 ชีวิตที่ไม่ได้กลับลงมา', TX, 330 * u, t - 0.2, { size: 60 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(68), to: bar(70), cues: [[0, 'thump', 0.9], [2.5, 'swish', 0.4]],
    draw(t) {
      night('#08070A');
      big('DYATLOV', TX, 900 * u, t, { size: 200 * u, color: C.cream });
      const p = spring(t - 0.7, 'default');
      g.fillStyle = C.red; g.fillRect(TX - 330 * u * p, 960 * u, 660 * u * p, 10 * u);
      say('หิมะถล่ม… จริงหรือ?', TX, 1150 * u, t - 1.0, { size: 64 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(70), to: bar(72), cues: [[0, 'whoosh', 0.5], [2.5, 'chime', 0.8]],
    draw(t) {
      night(SKY);
      slope(700 * u, 1100 * u);
      tent(TX, 1000 * u, 380 * u, { cut: 1 });
      snowfall(t, { n: 200, wind: 1.2 });
      say('คุณคิดว่าคืนนั้นเกิดอะไรขึ้น?', TX, 1350 * u, t - 0.3, { size: 58 * u, weight: 800, color: C.ink });
      say('คอมเมนต์ทฤษฎีของคุณไว้ได้เลย', TX, 1460 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.red });
      finish();
    } },
];

function para(s, x, y, t) {
  text(g, s, x, y, { size: 42 * u, weight: 800, family: THAI, color: C.ink, align: 'left', alpha: clamp(t / 0.12) });
}
