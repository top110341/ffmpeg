// Antwerp Diamond Heist — Act 2: 1:25–3:00 (bars 34–72). The haul, the trash bag, the trial, the claim.
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake } from './kit.js';
import { mapTrees, gem, gemPile, glintAt, sparkle, boxWall, ORDER, vaultDoor, building, woods, trashBag, sandwich, mapBel, PL, E19, STEEL } from './a1.js';

export default () => [
  // ---------------- inside the vault
  { from: bar(34), to: bar(36), cues: [[0.2, 'click', 0.7], [1.25, 'thump', 0.7], [2.5, 'whoosh', 0.5]],
    draw(t) {
      building(t, { lit: clamp((t - 0.3) / 0.4) * 0.9, open: clamp((t - 1.25) / 2), people: 4 });
      kicker('ในห้องนิรภัย', TX, 250 * u, t, { color: C.red });
      say('พวกเขาเปิดไฟ และเริ่มงัดตู้ทีละใบ', TX, 360 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      say('ตลอดทั้งคืน', TX, 1520 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(36), to: bar(40), cues: Array.from({ length: 24 }, (_, i) => [0.3 + i * 0.27, 'pop', 0.25]).concat([[7.5, 'impact', 0.9]]),
    draw(t) {
      night('#07090C');
      const n = Math.round(109 * clamp(remap(t, 0.3, 7.2)));
      boxWall(150 * u, 560 * u, 10, 16, 74 * u, 46 * u, (i) => (ORDER[i] < n ? clamp((n - ORDER[i]) / 3) : 0), t);
      g.fillStyle = 'rgba(7,9,12,0.88)'; g.fillRect(0, 1320 * u, W, 300 * u);
      text(g, `${n}`, TX, 1470 * u, { size: 160 * u, weight: 400, family: SERIF, color: n >= 109 ? C.red : C.cream });
      kicker('ตู้นิรภัยราว 160 ใบ', TX, 300 * u, t, { color: C.red });
      say('ถูกงัดเปิดไปกว่าร้อยใบ', TX, 410 * u, t - 0.1, { size: 54 * u, weight: 800, color: C.cream });
      text(g, '* บางแหล่งระบุ 109 ใบ บางแหล่ง 123 ใบ', TX, 1560 * u, { size: 30 * u, weight: 600, family: THAI, color: C.fog, alpha: clamp((t - 3) / 0.3) });
      finish(0.8);
    } },
  { from: bar(40), to: bar(42), cues: [[0.2, 'chime', 0.5], [2.5, 'impact', 0.9]],
    draw(t) {
      night('#08070A');
      gemPile(TX, 1050 * u, 26, 90 * u, t, { spread: 330, rise: clamp(spring(t - 0.2, 'heavy')) });
      big('$100M+', TX, 760 * u, t - 2.5, { size: 190 * u, color: C.cream });
      kicker('เพชร ทองคำ เครื่องประดับ', TX, 300 * u, t, { color: C.red });
      say('ประเมินกันว่ามูลค่ากว่า 100 ล้านดอลลาร์', TX, 410 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      g.fillStyle = 'rgba(8,7,10,0.8)'; if (t > 3) g.fillRect(0, 1360 * u, W, 160 * u);
      say('ตัวเลขจริงยังเป็นที่ถกเถียง', TX, 1460 * u, t - 3.2, { size: 46 * u, weight: 800, color: C.fog });
      finish();
    } },
  { from: bar(42), to: bar(44), cues: [[0.2, 'click', 0.7], [1.25, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 1.25, 20); g.translate(sx, sy);
      night('#14181E');
      vaultDoor(TX, 900 * u, 280 * u, t, { open: clamp(spring(t - 0.3, 'heavy')) * 0.9 });
      for (let i = 0; i < 14; i++) { const x = TX - 300 * u + hash(i, 4) * 600 * u, y = 1180 * u + hash(i, 5) * 140 * u; g.save(); g.translate(x, y); g.rotate(hash(i, 6) - 0.5);
        g.fillStyle = i % 3 ? '#E8E1CF' : '#C9B98A'; g.fillRect(-40 * u, -26 * u, 80 * u, 52 * u); g.restore(); }
      kicker('เช้าวันจันทร์', TX, 300 * u, t, { color: C.red });
      say('ประตูห้องนิรภัยถูกเปิดค้างไว้', TX, 410 * u, t - 0.2, { size: 52 * u, weight: 800, color: C.cream });
      say('ตู้ว่างเปล่า ของกระจัดกระจายเต็มพื้น', TX, 1440 * u, t - 1.25, { size: 48 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  // ---------------- the trash bag
  { from: bar(44), to: bar(47), cues: [[0.2, 'whoosh', 0.6], [3.75, 'pop', 0.9], [5.6, 'thump', 0.6]],
    draw(t) {
      const cam = { lat: 51.03, lon: 4.42, z: track(t, [[0, 330], [0.1, 1500]], 'heavy') * u };
      const P = mapBel(cam); topScrim(620);
      const pts = E19.map((p) => P(p));
      mapTrees(...P(PL.dump), 46, 150 * u, 4); mapTrees(...P([51.12, 4.30]), 20, 90 * u, 7); mapTrees(...P([50.90, 4.62]), 24, 100 * u, 9);
      for (const c of [PL.antwerp, PL.brussels, PL.mechelen]) { const [x, y] = P(c); g.fillStyle = 'rgba(239,230,210,0.12)'; g.beginPath(); g.arc(x, y, 70 * u, 0, 7); g.fill(); }
      g.save(); g.strokeStyle = 'rgba(200,190,150,0.35)'; g.lineWidth = 16 * u; g.lineCap = 'round'; g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke(); g.restore();
      path(pts, remap(t, 0.8, 3.6), { color: C.red, width: 6 * u, dash: [16 * u, 12 * u] });
      pin(...P(PL.antwerp), t - 0.6, { label: 'แอนต์เวิร์ป', side: 1, color: C.fog });
      pin(...P(PL.brussels), t - 1.2, { label: 'บรัสเซลส์', side: 1, color: C.fog });
      pin(...P(PL.mechelen), t - 0.9, { label: 'เมเคอเลิน', side: -1, color: C.fog });
      pin(...P(PL.dump), t - 3.75, { label: 'ป่าข้างทาง (โดยประมาณ)', side: 1 });
      text(g, 'E19', P([51.1, 4.5])[0] + 30 * u, P([51.1, 4.5])[1], { size: 40 * u, weight: 700, family: 'Inter, sans-serif', color: '#D8C78A', align: 'left', alpha: clamp((t - 1) / 0.3) });
      kicker('ระหว่างหลบหนี', TX, 250 * u, t, { color: C.red });
      say('ทิ้งถุงขยะไว้ในป่า\nริมทางหลวง E19', TX, 345 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(47), to: bar(50), cues: [[0.2, 'thump', 0.6], [2.5, 'thump', 0.6], [5.0, 'impact', 0.8]],
    draw(t) {
      woods(t);
      trashBag(TX + 40 * u, 1330 * u, 260 * u, { split: clamp((t - 2.5) / 0.5) });
      for (let i = 0; i < 6; i++) { const s = spring(t - 2.6 - i * 0.12, 'snappy'); if (s <= 0) continue; g.save(); g.translate(TX - 200 * u + i * 90 * u + 60 * u, 1440 * u + hash(i, 3) * 30 * u); g.rotate(hash(i, 4) - 0.5); g.scale(s, s);
        g.fillStyle = i % 2 ? '#E8E1CF' : '#C9B98A'; g.fillRect(-30 * u, -20 * u, 60 * u, 40 * u); g.restore(); }
      person(220 * u, 1300 * u, 70 * u * spring(t - 5.0, 'default'), '#05070A');
      g.fillStyle = 'rgba(12,18,15,0.85)'; g.fillRect(0, 200 * u, W, 330 * u);
      kicker('ไม่นานหลังเกิดเหตุ', TX, 290 * u, t, { color: C.red });
      say('เจ้าของที่ดินแถวนั้นพบกองขยะ\nจึงแจ้งตำรวจ', TX, 400 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(50), to: bar(53), cues: [[0.2, 'pop', 0.7], [1.6, 'pop', 0.7], [3.0, 'pop', 0.7], [5.0, 'impact', 0.9]],
    draw(t) {
      paper();
      const items = [['แซนด์วิชกินไม่หมด', 0.2], ['ซองเอกสารของ Diamond Centre', 1.6], ['ม้วนเทปกล้องวงจรปิด', 3.0]];
      items.forEach(([s, at], i) => { const p = spring(t - at, 'playful'); if (p <= 0) return;
        const y = 640 * u + i * 230 * u;
        g.save(); g.translate(240 * u, y); g.scale(p, p); g.rotate((hash(i, 9) - 0.5) * 0.2);
        g.fillStyle = '#F7F1E3'; g.fillRect(-110 * u, -90 * u, 220 * u, 180 * u);
        if (i === 0) sandwich(0, 10 * u, 170 * u, -0.15);
        if (i === 1) { g.fillStyle = '#C9B98A'; g.fillRect(-80 * u, -50 * u, 160 * u, 100 * u); g.strokeStyle = '#8C7A50'; g.lineWidth = 3 * u; g.beginPath(); g.moveTo(-80 * u, -50 * u); g.lineTo(0, 10 * u); g.lineTo(80 * u, -50 * u); g.stroke(); }
        if (i === 2) { g.fillStyle = '#16130F'; g.fillRect(-85 * u, -45 * u, 170 * u, 90 * u); g.fillStyle = '#F7F1E3'; for (const sx of [-40, 40]) { g.beginPath(); g.arc(sx * u, 0, 24 * u, 0, 7); g.fill(); }
          g.strokeStyle = '#16130F'; g.lineWidth = 3 * u; g.beginPath(); g.moveTo(85 * u, 30 * u); g.bezierCurveTo(110 * u, 80 * u, 60 * u, 90 * u, 100 * u, 120 * u); g.stroke(); }
        g.restore();
        text(g, s, 380 * u, y + 14 * u, { size: 40 * u, weight: 800, family: THAI, color: C.ink, align: 'left', alpha: clamp((t - at) / 0.2) }); });
      kicker('ในถุงขยะ', TX, 300 * u, t);
      say('หลักฐานที่ทิ้งไว้เอง', TX, 420 * u, t - 0.1, { size: 56 * u, weight: 800 });
      say('รวมถึงเอกสารที่โยงถึง Notarbartolo\nและตามรายงาน DNA จากแซนด์วิช', TX, 1360 * u, t - 5.0, { size: 42 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(53), to: bar(55), cues: [[0.1, 'thump', 0.6], [1.25, 'impact', 1.1]],
    draw(t) {
      const [sx, sy] = shake(t, 1.25, 22); g.translate(sx, sy);
      night('#0B1018');
      for (let i = 0; i < 6; i++) { g.fillStyle = '#2A3446'; g.fillRect(150 * u + i * 140 * u, 600 * u, 22 * u, 760 * u); }
      person(TX, 1300 * u, 200 * u, '#05070A');
      for (let i = 0; i < 6; i++) { g.fillStyle = '#3A4658'; g.fillRect(150 * u + i * 140 * u, 600 * u, 22 * u, 760 * u); }
      stamp('ARRESTED', TX, 1000 * u, t - 1.25, { size: 120 * u, rot: -0.12 });
      kicker('ไม่กี่วันต่อมา', TX, 300 * u, t, { color: C.red });
      say('Notarbartolo ถูกจับ\nหลังกลับมาที่แอนต์เวิร์ป', TX, 410 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- trial
  { from: bar(55), to: bar(58), cues: [[0.2, 'thump', 0.7], [2.5, 'pop', 0.6], [3.1, 'pop', 0.6], [3.7, 'pop', 0.6], [5.6, 'thump', 0.5]],
    draw(t) {
      paper();
      big('10 ปี', TX, 760 * u, t - 0.2, { size: 230 * u, color: C.red });
      say('Notarbartolo · คำตัดสินศาลเบลเยียม', TX, 880 * u, t - 0.6, { size: 42 * u, weight: 800, color: C.inkSoft });
      for (let i = 0; i < 3; i++) { const s = spring(t - 2.5 - i * 0.6, 'snappy'); if (s <= 0) continue;
        g.save(); g.translate(TX - 260 * u + i * 260 * u, 1120 * u); g.scale(s, s); person(0, 0, 70 * u, C.ink);
        g.fillStyle = C.ink; rrect(g, -80 * u, 50 * u, 160 * u, 70 * u, 10 * u); g.fill();
        text(g, '5 ปี', 0, 100 * u, { size: 40 * u, weight: 800, family: THAI, color: C.paper }); g.restore(); }
      kicker('ปี 2005', TX, 330 * u, t);
      say('ผู้ร่วมแก๊งอีก 3 คน', TX, 1340 * u, t - 2.5, { size: 46 * u, weight: 800 });
      say('ส่วน King of Keys ไม่เคยถูกระบุตัว', TX, 1450 * u, t - 5.6, { size: 44 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- the claim
  { from: bar(58), to: bar(61), cues: [[0.2, 'swish', 0.6], [2.5, 'type', 0.5], [5.0, 'impact', 0.9]],
    draw(t) {
      paper();
      // magazine page
      const s = spring(t - 0.2, 'default');
      g.save(); g.translate(TX, 880 * u + (1 - s) * 400 * u); g.rotate(-0.04);
      g.fillStyle = '#16130F'; g.fillRect(-300 * u, -300 * u, 600 * u, 520 * u);
      text(g, 'WIRED · 2009', 0, -220 * u, { size: 44 * u, weight: 700, family: 'Inter, sans-serif', color: C.paper, tracking: 4 * u });
      g.fillStyle = C.red; g.fillRect(-240 * u, -180 * u, 480 * u, 6 * u);
      for (let k = 0; k < 7; k++) { g.fillStyle = 'rgba(239,230,210,0.35)'; g.fillRect(-240 * u, -130 * u + k * 44 * u, (420 - hash(k, 2) * 140) * u, 14 * u); }
      g.restore();
      kicker('ปี 2009 · สัมภาษณ์จากในเรือนจำ', TX, 300 * u, t);
      say('Notarbartolo อ้างว่า งานนี้ถูก “จ้าง”\nเพื่อโกงเงินประกัน', TX, 410 * u, t - 0.2, { size: 46 * u, weight: 800 });
      stamp('UNVERIFIED', TX, 1000 * u, t - 5.0, { size: 110 * u, rot: -0.1 });
      say('ไม่มีหลักฐานยืนยันคำอ้างนี้', TX, 1300 * u, t - 5.0, { size: 48 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(61), to: bar(64), cues: [[0.2, 'thump', 0.6], [2.5, 'thump', 0.6], [5.0, 'chime', 0.5]],
    draw(t) {
      night('#0B1018');
      const W1 = W - 260 * u, x0 = 120 * u;
      const a = clamp(spring(t - 0.3, 'heavy')), b = clamp(spring(t - 2.5, 'heavy')) * 0.2;
      text(g, 'ประเมินกันทั่วไป', x0, 700 * u, { size: 40 * u, weight: 800, family: THAI, color: C.cream, align: 'left' });
      g.fillStyle = '#BFD9E6'; rrect(g, x0, 730 * u, W1 * a, 110 * u, 12 * u); g.fill();
      text(g, '$100M+', x0 + 20 * u, 805 * u, { size: 56 * u, weight: 400, family: SERIF, color: '#0B1018', align: 'left', alpha: a });
      text(g, 'คำอ้างของ Notarbartolo', x0, 960 * u, { size: 40 * u, weight: 800, family: THAI, color: C.cream, align: 'left', alpha: clamp((t - 2.3) / 0.2) });
      g.fillStyle = C.red; rrect(g, x0, 990 * u, W1 * b, 110 * u, 12 * u); g.fill();
      text(g, '≈ $20M', x0 + W1 * b + 20 * u, 1065 * u, { size: 56 * u, weight: 400, family: SERIF, color: C.red, align: 'left', alpha: clamp((t - 2.7) / 0.2) });
      kicker('ของในตู้มีมูลค่าเท่าไรกันแน่?', TX, 300 * u, t, { color: C.red });
      say('เขาอ้างว่าตู้หลายใบแทบว่างเปล่า', TX, 420 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      say('ตัวเลขประกันและมูลค่าจริง\nยังเป็นที่ถกเถียงจนถึงวันนี้', TX, 1300 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- close
  { from: bar(64), to: bar(68), cues: [[0, 'thump', 0.9], [2.5, 'chime', 0.4], [5.0, 'swish', 0.4]],
    draw(t) {
      night('#08070A');
      big('2003', TX, 760 * u, t, { size: 280 * u, color: C.cream });
      const p = spring(t - 0.7, 'default');
      g.fillStyle = C.red; g.fillRect(TX - 330 * u * p, 830 * u, 660 * u * p, 10 * u);
      say('การปล้นเพชรแห่งศตวรรษ', TX, 960 * u, t - 1.0, { size: 60 * u, weight: 800, color: C.red });
      for (let i = 0; i < 5; i++) gem(TX - 340 * u + i * 170 * u, 1180 * u + (i % 2) * 40 * u, 110 * u * clamp(spring(t - 2.5 - i * 0.12, 'snappy')), { glint: glintAt(t, i), red: i === 2 });
      say('เพชรส่วนใหญ่ ไม่เคยถูกพบ', TX, 1460 * u, t - 5.0, { size: 50 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(68), to: bar(72), cues: [[0, 'whoosh', 0.5], [2.5, 'pop', 0.6], [5.0, 'chime', 0.8]],
    draw(t) {
      woods(t, { road: true });
      trashBag(TX + 40 * u, 1330 * u, 230 * u, { split: 1 });
      sandwich(TX - 200 * u, 1450 * u, 150 * u, -0.2);
      sparkle(TX + 160 * u, 1420 * u, 40 * u * glintAt(t, 1), 1);
      g.fillStyle = 'rgba(12,18,15,0.88)'; g.fillRect(0, 200 * u, W, 360 * u);
      say('แผนเกือบสมบูรณ์แบบ\nพังเพราะถุงขยะใบเดียว', TX, 300 * u, t - 0.3, { size: 46 * u, weight: 800, color: C.cream });
      say('คุณเชื่อคำอ้างของ Notarbartolo ไหม?', TX, 470 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.cream });
      g.fillStyle = 'rgba(12,18,15,0.88)'; if (t > 5) g.fillRect(0, 1180 * u, W, 120 * u);
      say('คอมเมนต์บอกได้เลย', TX, 1260 * u, t - 5.0, { size: 54 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
];
