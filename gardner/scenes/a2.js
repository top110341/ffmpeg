// Act 2 — what they took, the Blue Room, the morning after (0:55–2:05, bars 22–50).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, rrect, text, typewriter, shake, person } from './kit.js';
import { wall, frame, plan, ROOMS, GOLD } from './props.js';

const PLAN_Y = 900;
function card(x, y, w, h, title, sub, s, o = {}) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = 'rgba(0,0,0,0.3)'; g.fillRect(-w / 2 + 8 * u, -h / 2 + 10 * u, w, h);
  g.fillStyle = '#F4EEDF'; g.fillRect(-w / 2, -h / 2, w, h);
  g.fillStyle = GOLD; g.fillRect(-w / 2, -h / 2, w, 12 * u);
  text(g, title, 0, -6 * u, { size: (o.ts || 40) * u, weight: 400, family: SERIF, color: C.ink });
  text(g, sub, 0, 44 * u, { size: 28 * u, weight: 600, family: THAI, color: C.inkSoft });
  g.restore();
}

export default () => [
  // ---------------- Chapter 4 — the haul
  { from: bar(22), to: bar(24), cues: [[0.2, 'pop', 0.5], [0.6, 'pop', 0.5], [1.0, 'pop', 0.5], [1.4, 'pop', 0.5]],
    draw(t) {
      wall();
      const items = [['Rembrandt', 'สุภาพบุรุษกับสตรีในชุดดำ'], ['Rembrandt', 'ภาพพิมพ์เหมือนตนเอง ขนาดเท่าแสตมป์'], ['Govaert Flinck', 'ภูมิทัศน์กับเสาโอเบลิสก์'], ['ภาชนะสำริดจีน', 'อายุกว่า 3,000 ปี']];
      items.forEach(([a, b], i) => { const s = spring(t - 0.2 - i * 0.4, 'playful'); if (s <= 0) return;
        card(TX + (i % 2 ? 210 : -210) * u, 680 * u + Math.floor(i / 2) * 330 * u, 400 * u, 260 * u, a, b, s, { ts: 46 }); });
      kicker('Dutch Room · ยังไม่หมด', TX, 300 * u, t, { color: C.red });
      say('รวม 6 ชิ้นจากห้องนี้ห้องเดียว', TX, 1400 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(24), to: bar(26), cues: [[0.2, 'whoosh', 0.4], [1.25, 'pop', 0.7], [2.5, 'pop', 0.7]],
    draw(t) {
      night('#141A16');
      plan(TX, PLAN_Y * u, t, { hot: { dutch: clamp(t / 0.3), short: clamp((t - 1.25) / 0.3) } });
      kicker('ผังพิพิธภัณฑ์ (แบบย่อ)', TX, 300 * u, t, { color: C.red });
      say('จาก Dutch Room\nไปต่อที่ Short Gallery', TX, 400 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      say('ภาพสเก็ตช์ของ Degas 5 ชิ้น', TX, 1440 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(26), to: bar(29), cues: [[0.3, 'click', 0.5], [0.8, 'click', 0.5], [1.3, 'click', 0.5], [3.75, 'thump', 0.7]],
    draw(t) {
      night('#141A16');
      // a framed Napoleonic flag with an eagle finial on its pole
      g.fillStyle = '#3C2A1E'; g.fillRect(TX - 10 * u, 520 * u, 20 * u, 900 * u);
      g.fillStyle = '#5E3A4A'; g.fillRect(TX + 10 * u, 600 * u, 360 * u, 300 * u);
      const lift = t > 3.75 ? (t - 3.75) * 700 * u : 0;
      g.save(); g.translate(TX, 500 * u - lift); g.rotate(noise(t * 4, 3) * (t > 0.3 && t < 3.75 ? 0.08 : 0));
      g.fillStyle = GOLD;
      g.beginPath(); g.moveTo(0, -20 * u); g.lineTo(-90 * u, -70 * u); g.lineTo(-60 * u, -10 * u); g.lineTo(-20 * u, 0); g.lineTo(20 * u, 0); g.lineTo(60 * u, -10 * u); g.lineTo(90 * u, -70 * u); g.closePath(); g.fill();
      g.beginPath(); g.arc(0, -40 * u, 22 * u, 0, 7); g.fill(); g.fillRect(-14 * u, 0, 28 * u, 30 * u);
      g.restore();
      say('พวกเขาพยายามไขธงสมัยนโปเลียน\nออกจากกรอบ', TX, 300 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      say('ทำไม่สำเร็จ\nเลยเอาแค่ยอดเสารูปนกอินทรีไป', TX, 1350 * u, t - 2.2, { size: 50 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(29), to: bar(32), cues: [[0.2, 'whoosh', 0.4], [1.25, 'thump', 0.7], [3.75, 'pop', 0.7]],
    draw(t) {
      night('#141A16');
      plan(TX, PLAN_Y * u, t, { hot: { dutch: 0.5, short: 0.5, blue: t > 1.25 ? 0.6 + 0.4 * Math.sin(t * 6) : 0 } });
      kicker('Blue Room · ชั้น 1', TX, 300 * u, t, { color: C.red });
      say('Manet · Chez Tortoni', TX, 400 * u, t - 0.3, { size: 58 * u, weight: 800, color: C.cream });
      say('อยู่คนละชั้นกับห้องอื่น ๆ ทั้งหมด', TX, 1440 * u, t - 1.25, { size: 48 * u, weight: 700, color: C.cream });
      say('และนี่คือจุดที่แปลกที่สุด', TX, 1540 * u, t - 3.75, { size: 48 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  // ---------------- Chapter 5 — the sensors
  { from: bar(32), to: bar(34), cues: Array.from({ length: 10 }, (_, i) => [0.3 + i * 0.25, 'tick', 0.4]),
    draw(t) {
      night('#141A16');
      plan(TX, PLAN_Y * u, t, { hot: {} });
      // footsteps logged by motion sensors in the Dutch Room and Short Gallery
      const steps = [];
      for (let i = 0; i < 10; i++) { const r = i < 6 ? ROOMS.dutch : ROOMS.short; steps.push([(r.x + 50 + hash(i, 4) * (r.w - 100)), (r.y + 50 + hash(i, 5) * (r.h - 100))]); }
      steps.forEach(([x, y], i) => { const at = 0.3 + i * 0.25, p = spring(t - at, 'playful'); if (p <= 0) return;
        g.fillStyle = C.red; g.beginPath(); g.arc(TX + x * u, PLAN_Y * u + y * u, 16 * u * p, 0, 7); g.fill();
        const q = clamp((t - at) / 0.6); g.strokeStyle = C.red; g.globalAlpha = 1 - q; g.lineWidth = 3 * u; g.beginPath(); g.arc(TX + x * u, PLAN_Y * u + y * u, 16 * u + q * 50 * u, 0, 7); g.stroke(); g.globalAlpha = 1; });
      kicker('เซนเซอร์จับการเคลื่อนไหว', TX, 300 * u, t, { color: C.red });
      say('บันทึกทุกก้าวของคนร้ายไว้', TX, 400 * u, t - 0.2, { size: 56 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(34), to: bar(37), cues: [[0.2, 'thump', 0.7], [2.5, 'riser', 0.5], [3.75, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 3.75, 18); g.translate(sx, sy);
      night('#141A16');
      plan(TX, PLAN_Y * u, t, { hot: { blue: 0.6 } });
      const r = ROOMS.blue;
      text(g, '?', TX + (r.x + r.w / 2) * u, PLAN_Y * u + (r.y + r.h / 2 + 50) * u, { size: 220 * u * spring(t - 3.75, 'playful'), weight: 400, family: SERIF, color: C.red });
      say('แต่ในห้อง Blue Room', TX, 300 * u, t - 0.2, { size: 56 * u, weight: 800, color: C.cream });
      say('เซนเซอร์ไม่บันทึกใครเดินเข้าไปเลย', TX, 410 * u, t - 1.25, { size: 50 * u, weight: 800, color: C.red });
      say('แล้วภาพของ Manet หายไปได้อย่างไร?', TX, 1480 * u, t - 3.75, { size: 52 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(37), to: bar(40), cues: [[0.3, 'click', 0.8], [1.2, 'swish', 0.6], [3.75, 'thump', 0.6]],
    draw(t) {
      night(C.night2);
      // VHS tape lifted out of a recorder
      g.fillStyle = '#1B2333'; rrect(g, TX - 360 * u, 860 * u, 720 * u, 200 * u, 14 * u); g.fill();
      g.fillStyle = '#0A0F18'; g.fillRect(TX - 240 * u, 900 * u, 480 * u, 40 * u);
      const out = track(t, [[0, 0], [1.2, 1]], 'default');
      g.save(); g.translate(TX, 900 * u - out * 300 * u); g.rotate(out * -0.15);
      g.fillStyle = '#111'; rrect(g, -230 * u, -130 * u, 460 * u, 260 * u, 12 * u); g.fill();
      g.fillStyle = '#E8E1CF'; g.fillRect(-170 * u, -100 * u, 340 * u, 70 * u);
      for (const sx of [-1, 1]) { g.fillStyle = '#333'; g.beginPath(); g.arc(sx * 110 * u, 40 * u, 55 * u, 0, 7); g.fill(); g.fillStyle = '#111'; g.beginPath(); g.arc(sx * 110 * u, 40 * u, 20 * u, 0, 7); g.fill(); }
      text(g, 'SECURITY', 0, -52 * u, { size: 34 * u, weight: 700, family: 'Inter, sans-serif', color: C.ink });
      g.restore();
      say('ก่อนออกไป', TX, 300 * u, t - 0.1, { size: 56 * u, weight: 800, color: C.cream });
      say('พวกเขาเอาเทปกล้องวงจรปิดไปด้วย', TX, 1300 * u, t - 1.2, { size: 54 * u, weight: 800, color: C.red });
      say('ไม่มีภาพหน้าของคนร้ายเหลือไว้เลย', TX, 1410 * u, t - 3.75, { size: 46 * u, weight: 700, color: C.fog });
      finish(0.8);
    } },
  { from: bar(40), to: bar(42), cues: [[0.3, 'thump', 0.6], [1.25, 'thump', 0.6], [2.5, 'impact', 0.9]],
    draw(t) {
      night('#070A12');
      g.fillStyle = '#05070C'; g.fillRect(0, 1200 * u, W, H - 1200 * u);
      // hatchback leaving, two trips
      for (let k = 0; k < 2; k++) { const at = 0.3 + k * 0.95, p = clamp((t - at) / 0.8); if (p <= 0 || p >= 1) continue;
        g.save(); g.translate(-200 * u + p * (W + 400 * u), 1180 * u); g.fillStyle = '#1D2738';
        g.beginPath(); g.moveTo(-160 * u, 0); g.lineTo(-150 * u, -70 * u); g.lineTo(-60 * u, -120 * u); g.lineTo(90 * u, -120 * u); g.lineTo(160 * u, -60 * u); g.lineTo(170 * u, 0); g.fill();
        g.fillStyle = '#E9C66B'; g.globalAlpha = 0.5; g.beginPath(); g.moveTo(170 * u, -40 * u); g.lineTo(420 * u, -100 * u); g.lineTo(420 * u, 20 * u); g.fill(); g.restore(); }
      kicker('02:40 และ 02:45', TX, 360 * u, t, { color: C.red });
      say('ขนของออกไป 2 รอบ\nแล้วหายไปในความมืด', TX, 460 * u, t - 0.3, { size: 48 * u, weight: 800, color: C.cream });
      big('81 นาที', TX, 900 * u, t - 2.5, { size: 200 * u, color: C.red });
      finish();
    } },
  // ---------------- Chapter 6 — morning
  { from: bar(42), to: bar(44), cues: [[0.2, 'click', 0.6], [1.25, 'thump', 0.7], [2.5, 'impact', 0.8]],
    draw(t) {
      paper();
      kicker('เช้าวันนั้น', TX, 360 * u, t);
      say('รปภ. กะเช้ามาถึง ไม่มีใครเปิดประตูให้', TX, 480 * u, t - 0.2, { size: 50 * u, weight: 800 });
      big('ตำรวจตัวจริง', TX, 900 * u, t - 1.25, { size: 140 * u, color: C.ink });
      say('มาถึงเมื่อทุกอย่างสายเกินไป', TX, 1050 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(44), to: bar(46), cues: Array.from({ length: 13 }, (_, i) => [0.2 + i * 0.18, 'tick', 0.45]),
    draw(t) {
      paper();
      const L = ['Rembrandt · พายุบนทะเลกาลิลี', 'Rembrandt · สุภาพบุรุษกับสตรีในชุดดำ', 'Rembrandt · ภาพพิมพ์เหมือนตนเอง', 'Vermeer · The Concert', 'Flinck · ภูมิทัศน์กับโอเบลิสก์',
        'Manet · Chez Tortoni', 'Degas · ภาพสเก็ตช์ 5 ชิ้น', 'ภาชนะสำริดจีน (กู)', 'ยอดเสานกอินทรี'];
      L.forEach((s, i) => { const at = 0.2 + i * 0.25; if (t < at) return;
        text(g, s, 120 * u, 500 * u + i * 92 * u, { size: 40 * u, weight: 700, family: THAI, color: C.ink, align: 'left', alpha: clamp((t - at) / 0.12) });
        g.fillStyle = C.red; g.fillRect(90 * u, 488 * u + i * 92 * u, 12 * u, 12 * u); });
      const n = Math.min(13, Math.floor(remap(t, 0.2, 2.6) * 13));
      kicker('รายการที่หายไป', TX, 360 * u, t);
      text(g, `${n} ชิ้น`, TX, 1450 * u, { size: 150 * u, weight: 400, family: SERIF, color: C.red });
      finish(0.6);
    } },
  { from: bar(46), to: bar(48), cues: [[0.2, 'riser', 0.4], [1.25, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 1.25, 20); g.translate(sx, sy);
      paper();
      kicker('มูลค่าโดยประมาณ', TX, 500 * u, t);
      const n = Math.round(500 * clamp(spring(t - 0.2, 30, 11) * 1.004));
      text(g, `$${n} ล้าน`, TX, 860 * u, { size: 200 * u, weight: 400, family: SERIF, color: C.red });
      say('การขโมยทรัพย์สิน\nที่มีมูลค่าสูงที่สุดเท่าที่เคยมีมา', TX, 1060 * u, t - 1.25, { size: 46 * u, weight: 700, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(48), to: bar(50), cues: [[0, 'whoosh', 0.4], [2.5, 'thump', 0.6]],
    draw(t) {
      wall();
      frame(TX, 820 * u, 640 * u, 800 * u);
      say('เพราะพินัยกรรมห้ามเปลี่ยนแปลงสิ่งใด', TX, 300 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      say('กรอบเปล่ายังแขวนอยู่ที่เดิม\nจนถึงวันนี้', TX, 1350 * u, t - 2.5, { size: 56 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
];
