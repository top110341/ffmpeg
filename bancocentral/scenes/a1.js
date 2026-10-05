// Act 1 — the tunnel (0:00–1:20, bars 0–32).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, rrect, text, typewriter, topScrim, shake } from './kit.js';
import { section, brick, truck, mapBrazil, PLACE, XS, SOIL, GREEN, NOTE } from './props.js';

export default () => [
  // ---------------- Chapter 1 — hook
  { from: bar(0), to: bar(2), cues: [[0, 'riser', 0.5], [1.4, 'impact', 1.0], [2.0, 'type', 0.4]],
    draw(t) {
      section(t, remap(t, 0, 1.4), { breach: remap(t, 1.3, 1.5) });
      big('R$164 ล้าน', TX, 330 * u, t - 1.4, { size: 140 * u, color: C.red });
      say('ขุดอุโมงค์ใต้ถนน เข้าห้องนิรภัยธนาคารกลาง', TX, 1450 * u, t - 2.0, { size: 44 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(2), to: bar(4), cues: Array.from({ length: 12 }, (_, i) => [0.2 + i * 0.12, 'thump', 0.25]).concat([[2.5, 'thump', 0.6]]),
    draw(t) {
      night('#0B1420');
      for (let i = 0; i < 40; i++) { const at = 0.1 + i * 0.05, s = spring(t - at, 'snappy'); if (s <= 0) continue;
        const c = i % 8, r = Math.floor(i / 8); brick(TX - 350 * u + c * 100 * u, 1100 * u - r * 60 * u - (1 - s) * 800 * u, 96 * u, 0, NOTE); }
      big('3.5 ตัน', TX, 600 * u, t - 0.6, { size: 200 * u, color: C.cream });
      say('ธนบัตรใบละ 50 เรียล', TX, 1260 * u, t - 1.4, { size: 54 * u, weight: 800, color: C.cream });
      say('โจรกรรมธนาคารครั้งใหญ่ที่สุด\nในประวัติศาสตร์บราซิล', TX, 1370 * u, t - 2.5, { size: 40 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1], [3.2, 'type', 0.4]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 420 * u, 90 * u, 14 * u); g.fill();
      text(g, 'POLÍCIA FEDERAL · 2005', 280 * u, 472 * u, { size: 30 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 3 * u });
      g.restore();
      say('ไม่มีเสียงปืน ไม่มีตัวประกัน', TX, 760 * u, t - 0.25, { size: 62 * u, weight: 800 });
      stamp('NO ALARM', TX, 1080 * u, t - 2.5, { size: 140 * u, rot: -0.12 });
      say('และเงินส่วนใหญ่ ยังไม่เคยถูกพบ', TX, 1380 * u, t - 3.2, { size: 48 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------- Chapter 2 — the shop
  { from: bar(6), to: bar(8), cues: [[0, 'whoosh', 0.6], [2.5, 'pop', 0.9]],
    draw(t) {
      const cam = { lat: track(t, [[0, -12], [0.1, -4.2]], 'heavy'), lon: track(t, [[0, -52], [0.1, -39]], 'heavy'), z: track(t, [[0, 26], [0.1, 120]], 'heavy') * u };
      const P = mapBrazil(cam); topScrim();
      pin(...P(PLACE.fortaleza), t - 2.5, { label: 'Fortaleza', side: -1 });
      kicker('บราซิล · 2005', TX, 250 * u, t, { color: C.red });
      say('เมืองฟอร์ตาเลซา ภาคตะวันออกเฉียงเหนือ', TX, 345 * u, t - 0.3, { size: 48 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(8), to: bar(11), cues: [[0.2, 'thump', 0.6], [2.5, 'click', 0.7], [5.0, 'pop', 0.6]],
    draw(t) {
      night('#0B1420');
      // a shop front with the grass sign
      g.fillStyle = '#2A3446'; g.fillRect(120 * u, 600 * u, W - 240 * u, 700 * u);
      g.fillStyle = GREEN; const s = spring(t - 0.2, 'playful');
      g.save(); g.translate(TX, 700 * u); g.scale(s, s); rrect(g, -380 * u, -70 * u, 760 * u, 140 * u, 12 * u); g.fill();
      text(g, 'GRAMA SINTÉTICA', 0, 20 * u, { size: 64 * u, weight: 800, family: 'Inter, sans-serif', color: '#F2F6EE' }); g.restore();
      g.fillStyle = '#E9C66B'; g.fillRect(200 * u, 860 * u, 260 * u, 300 * u); g.fillStyle = '#0B101C'; g.fillRect(620 * u, 900 * u, 240 * u, 400 * u);
      g.fillStyle = '#0A0F1A'; g.fillRect(0, 1300 * u, W, H - 1300 * u);
      kicker('ห่างจากธนาคารราว 80 เมตร', TX, 330 * u, t, { color: C.red });
      say('มีร้านขาย “หญ้าเทียม” เปิดใหม่', TX, 440 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      say('เช่าบ้านไว้ราว 3 เดือนก่อนเกิดเหตุ', TX, 1420 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.cream });
      say('เพื่อนบ้านไม่เคยสงสัยอะไร', TX, 1530 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(11), to: bar(14), cues: Array.from({ length: 6 }, (_, i) => [0.4 + i * 0.9, 'thump', 0.4]),
    draw(t) {
      night('#0B1420');
      // trucks leaving with soil, labelled as landscaping
      for (let k = 0; k < 3; k++) { const p = ((t * 0.25 + k / 3) % 1); g.save(); g.translate(-300 * u + p * (W + 600 * u), 1150 * u + k * 6 * u); g.scale(260 * u, 260 * u);
        g.fillStyle = '#2E3B4F'; g.fillRect(-1.1, -0.45, 1.4, 0.4); g.fillStyle = SOIL; g.beginPath(); g.ellipse(-0.4, -0.45, 0.6, 0.18, 0, Math.PI, 0); g.fill();
        g.fillStyle = '#2E3B4F'; rrect(g, 0.35, -0.55, 0.4, 0.5, 0.05); g.fill(); g.fillStyle = '#0E1118'; for (const wx of [-0.8, -0.2, 0.55]) { g.beginPath(); g.arc(wx, -0.03, 0.1, 0, 7); g.fill(); }
        g.restore(); }
      g.fillStyle = '#0A0F1A'; g.fillRect(0, 1160 * u, W, H - 1160 * u);
      say('ดินหลายตันถูกขนออกทุกวัน', TX, 330 * u, t - 0.2, { size: 56 * u, weight: 800, color: C.cream });
      say('ใครเห็นก็คิดว่าเป็นงานจัดสวน', TX, 1340 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  // ---------------- Chapter 3 — the dig
  { from: bar(14), to: bar(18), cues: Array.from({ length: 16 }, (_, i) => [0.3 + i * 0.6, 'tick', 0.3]),
    draw(t) {
      section(t, remap(t, 0.2, 9.5));
      const m = Math.round(78 * remap(t, 2.5, 9.5));
      text(g, `${m} เมตร`, TX, 1500 * u, { size: 140 * u, weight: 400, family: SERIF, color: C.cream, alpha: clamp((t - 2.5) / 0.2) });
      kicker('ราว 10 คน · ขุดนาน 3 เดือน', TX, 250 * u, t, { color: C.red });
      say('อุโมงค์ลึกราว 4 เมตร', TX, 345 * u, t - 0.3, { size: 52 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(18), to: bar(22), cues: [[0.2, 'click', 0.7], [2.5, 'click', 0.7], [5.0, 'click', 0.7], [7.5, 'thump', 0.6]],
    draw(t) {
      night('#140D07');
      // inside the tunnel, one-point perspective
      const vx = TX, vy = 860 * u;
      g.fillStyle = '#3B2715'; g.fillRect(0, 0, W, H);
      for (let k = 0; k < 14; k++) { const d = ((k + t * 0.8) % 14) / 14, s = 0.08 + Math.pow(d, 2.2) * 1.4;
        g.strokeStyle = `rgba(156,122,78,${0.3 + d * 0.7})`; g.lineWidth = (2 + d * 18) * u; g.strokeRect(vx - 560 * u * s, vy - 420 * u * s, 1120 * u * s, 840 * u * s);
        g.fillStyle = `rgba(255,214,120,${d})`; g.beginPath(); g.arc(vx, vy - 390 * u * s, 6 * u + d * 20 * u, 0, 7); g.fill(); }
      g.fillStyle = '#0B0703'; g.fillRect(vx - 50 * u, vy - 38 * u, 100 * u, 76 * u);
      kicker('ภายในอุโมงค์', TX, 300 * u, t, { color: C.red });
      [['ผนังกรุไม้ และพลาสติกกันดิน', 0.2], ['เดินสายไฟส่องสว่างตลอดทาง', 2.5], ['มีระบบระบายอากาศ', 5.0]].forEach(([s, at], i) => {
        if (t < at) return; say(s, TX, 1350 * u + i * 90 * u, t - at, { size: 46 * u, weight: 800, color: C.cream }); });
      say('สูงแค่ราว 70 ซม. ต้องคลานตลอดทาง', TX, 410 * u, t - 7.5, { size: 46 * u, weight: 800, color: C.cream });
      finish();
    } },
  // ---------------- Chapter 4 — the weekend
  { from: bar(22), to: bar(24), cues: Array.from({ length: 5 }, (_, i) => [i * 0.15, 'tick', 0.5]).concat([[1.25, 'thump', 0.7]]),
    draw(t) {
      paper();
      kicker('สิงหาคม 2005', TX, 420 * u, t);
      const d = ['02', '03', '04', '05', '06'];
      flip(TX, 800 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.15), t, { size: 360 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('คืนวันเสาร์ ต่อเนื่องถึงวันอาทิตย์', TX, 1220 * u, t - 1.0, { size: 52 * u, weight: 800 });
      say('ธนาคารปิดทำการ', TX, 1330 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(24), to: bar(28), cues: [[0.2, 'riser', 0.6], [2.5, 'impact', 1.1], [5.0, 'thump', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 26); g.translate(sx, sy);
      night('#1A1A1E');
      // a reinforced concrete slab being cut from below, rebar showing
      g.fillStyle = '#8E8B85'; g.fillRect(0, 700 * u, W, 300 * u);
      g.strokeStyle = '#5A4632'; g.lineWidth = 10 * u; for (let i = 0; i < 9; i++) { g.beginPath(); g.moveTo(i * 130 * u, 700 * u); g.lineTo(i * 130 * u + 40 * u, 1000 * u); g.stroke(); }
      const p = clamp(spring(t - 2.5, 60, 14));
      g.fillStyle = '#0B0703'; g.beginPath(); g.ellipse(TX, 1000 * u, 220 * u * p, 300 * u * p, 0, Math.PI, 0); g.fill();
      kicker('พื้นห้องนิรภัย', TX, 330 * u, t, { color: C.red });
      say('คอนกรีตเสริมเหล็ก หนาราว 1.1 เมตร', TX, 440 * u, t - 0.2, { size: 50 * u, weight: 800, color: C.cream });
      say('เจาะทะลุขึ้นมาได้', TX, 1260 * u, t - 2.5, { size: 66 * u, weight: 800, color: C.red });
      say('สัญญาณกันขโมยไม่ทำงานเลย', TX, 1380 * u, t - 5.0, { size: 50 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(28), to: bar(32), cues: Array.from({ length: 5 }, (_, i) => [0.4 + i * 0.8, 'thump', 0.6]).concat([[7.5, 'impact', 0.9]]),
    draw(t) {
      night('#1A1A1E');
      for (let k = 0; k < 5; k++) { const at = 0.4 + k * 0.8, s = spring(t - at, 'default'); if (s <= 0) continue;
        const x = TX - 400 * u + k * 200 * u;
        g.fillStyle = '#4C5A3A'; rrect(g, x - 80 * u, 640 * u, 160 * u, 420 * u, 10 * u); g.fill();
        g.save(); g.beginPath(); g.rect(x - 80 * u, 640 * u, 160 * u, 420 * u); g.clip();
        for (let r = 0; r < 7; r++) brick(x, 1020 * u - r * 56 * u + (1 - s) * 600 * u, 140 * u, 0, NOTE);
        g.restore(); }
      say('เปิดตู้เก็บเงิน 5 ตู้', TX, 330 * u, t - 0.2, { size: 60 * u, weight: 800, color: C.cream });
      say('ขนเงินย้อนกลับไปทางอุโมงค์\nทั้งคืน', TX, 1280 * u, t - 4.0, { size: 54 * u, weight: 800, color: C.cream });
      say('≈ US$70 ล้าน ในเวลานั้น', TX, 1520 * u, t - 7.5, { size: 50 * u, weight: 800, color: C.red });
      finish();
    } },
];
