// Act 1 — the flight (0:00–1:20, bars 0–32).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, clouds } from './kit.js';
import { electra, electraSide, waves, cutter, mapPacific, islet, PLACE } from './props.js';

function sea(t, y0) {
  g.fillStyle = '#0A1626'; g.fillRect(0, y0, W, H - y0);
  g.strokeStyle = 'rgba(140,151,173,0.35)'; g.lineWidth = 2 * u;
  for (let r = 0; r < 10; r++) { const y = y0 + 20 * u + r * r * 9 * u; g.beginPath(); for (let x = 0; x <= W; x += 16 * u) { const yy = y + Math.sin(x / (50 * u) + t * (1 + r * 0.1) + r) * (2 + r) * u; x ? g.lineTo(x, yy) : g.moveTo(x, yy); } g.stroke(); }
}

export default () => [
  // ---------------- Chapter 1 — hook
  { from: bar(0), to: bar(2), cues: [[0, 'whoosh', 0.6], [1.2, 'type', 0.5], [2.2, 'thump', 0.6]],
    draw(t) {
      night('#071020'); clouds(t * 60 * u, { alpha: 0.5, seed: 4 }); sea(t, 1250 * u);
      electraSide(TX + 60 * u - t * 40 * u, 820 * u + Math.sin(t) * 10 * u, 300 * u);
      waves(TX - 260 * u, 820 * u, t, { dir: Math.PI, spread: 0.7 });
      typewriter('“We are on the line…”', TX, 470 * u, t - 1.2, { size: 64 * u, weight: 400, family: SERIF, color: C.cream, align: 'center', cps: 16 });
      say('ข้อความวิทยุสุดท้าย ก่อนเธอหายไปตลอดกาล', TX, 1500 * u, t - 2.2, { size: 44 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(2), to: bar(4), cues: [[0, 'thump', 0.6], [2.5, 'swish', 0.5]],
    draw(t) {
      paper();
      person(TX, 1000 * u, 260 * u * spring(t, 'heavy'), C.inkSoft);
      g.fillStyle = C.inkSoft; g.beginPath(); g.ellipse(TX, 1000 * u - 300 * u, 120 * u, 40 * u, 0, Math.PI, 0); g.fill();
      say('Amelia Earhart', TX, 360 * u, t - 0.1, { size: 96 * u, weight: 400, family: SERIF });
      say('นักบินหญิงที่ดังที่สุดในโลก', TX, 1250 * u, t - 1.0, { size: 56 * u, weight: 800 });
      say('หญิงคนแรกที่บินเดี่ยวข้ามแอตแลนติก (1932)', TX, 1360 * u, t - 2.5, { size: 42 * u, weight: 700, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(4), to: bar(6), cues: [[0.1, 'thump', 0.6], [2.5, 'impact', 1.1]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 22); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 260 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = C.paper2; rrect(g, 70 * u, 470 * u, W - 140 * u, 1120 * u, 18 * u); g.fill();
      rrect(g, 70 * u, 410 * u, 400 * u, 90 * u, 14 * u); g.fill();
      text(g, 'KHAQQ · 2 JULY 1937', 270 * u, 472 * u, { size: 30 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, tracking: 3 * u });
      g.restore();
      say('89 ปีผ่านไป', TX, 760 * u, t - 0.25, { size: 70 * u, weight: 800 });
      stamp('MISSING', TX, 1080 * u, t - 2.5, { size: 160 * u, rot: -0.12 });
      say('ยังไม่มีใครพบเครื่องบินของเธอ', TX, 1380 * u, t - 3.0, { size: 50 * u, weight: 800, color: C.inkSoft });
      finish(0.7);
    } },
  // ---------------- Chapter 2 — around the world
  { from: bar(6), to: bar(9), cues: [[0.2, 'riser', 0.4], [3.75, 'thump', 0.7]],
    draw(t) {
      night('#071020');
      kicker('1937 · บินรอบโลกตามแนวเส้นศูนย์สูตร', TX, 300 * u, t, { color: C.red });
      say('เส้นทางยาวที่สุดที่เคยมีคนพยายามบินรอบโลก', TX, 410 * u, t - 0.2, { size: 44 * u, weight: 800, color: C.cream });
      const p = clamp(spring(t - 0.5, 40, 14)) * 0.75;
      g.save(); g.translate(TX, 900 * u);
      g.strokeStyle = C.night3; g.lineWidth = 34 * u; g.beginPath(); g.arc(0, 0, 280 * u, -Math.PI / 2, Math.PI * 1.5); g.stroke();
      g.strokeStyle = C.red; g.beginPath(); g.arc(0, 0, 280 * u, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p); g.stroke();
      const a = -Math.PI / 2 + Math.PI * 2 * p; electra(Math.cos(a) * 280 * u, Math.sin(a) * 280 * u, 70 * u, a + Math.PI, C.cream);
      g.restore();
      text(g, `${Math.round(p * 100)}%`, TX, 940 * u, { size: 120 * u, weight: 400, family: SERIF, color: C.cream });
      say('บินมาแล้วราว 35,000 กม.', TX, 1350 * u, t - 2.0, { size: 54 * u, weight: 800, color: C.cream });
      say('เหลือช่วงสุดท้าย: ข้ามมหาสมุทรแปซิฟิก', TX, 1460 * u, t - 3.75, { size: 46 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(9), to: bar(12), cues: [[0.2, 'pop', 0.5], [2.5, 'pop', 0.6], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      electra(TX, 680 * u, 340 * u * spring(t - 0.2, 'heavy'), Math.PI / 2 * 0, C.ink);
      text(g, 'Lockheed Electra 10E', TX, 1000 * u, { size: 56 * u, weight: 400, family: SERIF, color: C.ink, alpha: clamp((t - 0.5) / 0.2) });
      g.save(); g.beginPath(); g.rect(TX - 120 * u, 1080 * u, 240 * u, 260 * u); g.clip(); g.fillStyle = C.paper2; g.fillRect(TX - 120 * u, 1080 * u, 240 * u, 260 * u);
      person(TX, 1330 * u, 110 * u * spring(t - 2.5, 'default'), C.inkSoft); g.restore();
      say('ผู้นำทาง: Fred Noonan', TX, 1420 * u, t - 2.5, { size: 52 * u, weight: 800 });
      say('อดีตนักเดินเรือของสายการบิน Pan Am', TX, 1520 * u, t - 5.0, { size: 42 * u, weight: 700, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(12), to: bar(14), cues: [[0, 'whoosh', 0.6], [1.25, 'pop', 0.7], [3.75, 'pop', 0.7]],
    draw(t) {
      const cam = { lat: -2.5, lon: 165, z: track(t, [[0, 18], [0.05, 23]], 'heavy') * u };
      const P = mapPacific(cam); topScrim();
      pin(...P(PLACE.lae), t - 1.25, { label: 'Lae, นิวกินี', side: 1 });
      islet(P, PLACE.howland, 7);
      pin(...P(PLACE.howland), t - 3.75, { label: 'เกาะ Howland', side: -1 });
      const h = path([P(PLACE.lae), P(PLACE.howland)], remap(t, 1.5, 4.5), { color: C.red, width: 4 * u, dash: [12 * u, 10 * u] });
      electra(h.x, h.y, 50 * u, h.ang + Math.PI / 2);
      kicker('ช่วงที่ยากที่สุดของทริป', TX, 250 * u, t, { color: C.red });
      say('บินต่อเนื่องราว 4,100 กม. เหนือทะเล', TX, 345 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(14), to: bar(17), cues: [[0.2, 'thump', 0.6], [2.5, 'thump', 0.6], [5.0, 'click', 0.7]],
    draw(t) {
      night('#071020'); sea(t, 1000 * u);
      g.fillStyle = '#C9B98F'; const iw = 260 * u * spring(t - 0.2, 'heavy'); g.beginPath(); g.ellipse(TX, 1010 * u, iw, 26 * u, 0, Math.PI, 0); g.fill();
      cutter(TX + 280 * u, 1060 * u, 160 * u);
      waves(TX + 280 * u, 950 * u, t, { dir: -Math.PI / 2, spread: 1.2, color: C.fog, alpha: t > 5 ? 1 : 0 });
      kicker('จุดหมาย', TX, 300 * u, t, { color: C.red });
      say('เกาะเล็ก ๆ ยาวแค่ราว 2.5 กม.', TX, 410 * u, t - 0.2, { size: 54 * u, weight: 800, color: C.cream });
      say('สูงจากน้ำไม่กี่เมตร หาด้วยตาเปล่ายากมาก', TX, 1300 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.cream });
      say('เรือหน่วยยามฝั่ง Itasca รอรับสัญญาณวิทยุ', TX, 1410 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.red });
      finish();
    } },
  // ---------------- Chapter 3 — the radio
  { from: bar(17), to: bar(18), cues: Array.from({ length: 5 }, (_, i) => [i * 0.15, 'tick', 0.6]).concat([[1.0, 'thump', 0.6]]),
    draw(t) {
      paper();
      kicker('กรกฎาคม 1937', TX, 420 * u, t);
      const d = ['28', '29', '30', '01', '02'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.15), t, { size: 360 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('ออกจาก Lae ราว 10 โมงเช้า', TX, 1240 * u, t - 1.0, { size: 52 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(18), to: bar(22), cues: [[0.3, 'type', 0.5], [1.3, 'type', 0.5], [5.0, 'type', 0.5], [6.0, 'type', 0.5]],
    draw(t) {
      night('#071020');
      waves(TX, 1350 * u, t, { dir: -Math.PI / 2, spread: 1.4, max: 300 * u });
      kicker('ห้องวิทยุบนเรือ Itasca · ช่วงเช้า', TX, 300 * u, t, { color: C.red });
      const f = { size: 58 * u, weight: 400, family: SERIF, color: C.cream, cps: 16, align: 'left' };
      typewriter('“We must be on you', 120 * u, 540 * u, t - 0.3, f);
      typewriter('but cannot see you…”', 120 * u, 620 * u, t - 1.3, f);
      typewriter('“…gas is running low.”', 120 * u, 760 * u, t - 3.0, { ...f, color: C.red });
      say('“เราน่าจะอยู่เหนือพวกคุณแล้ว\nแต่มองไม่เห็น”\n“น้ำมันใกล้หมด”', TX, 1000 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(22), to: bar(25), cues: [[0.3, 'type', 0.6], [3.75, 'impact', 0.9]],
    draw(t) {
      night('#071020');
      kicker('ราว 08:43 · ข้อความสุดท้ายที่ชัดเจน', TX, 300 * u, t, { color: C.red });
      typewriter('“We are on the line', 120 * u, 560 * u, t - 0.3, { size: 66 * u, weight: 400, family: SERIF, color: C.cream, cps: 14 });
      typewriter('157 337…”', 120 * u, 660 * u, t - 1.8, { size: 110 * u, weight: 400, family: SERIF, color: C.red, cps: 8 });
      say('เส้นทิศทางที่ไม่มีใครรู้ว่าอยู่ตรงไหนของเส้นนั้น', TX, 1100 * u, t - 3.75, { size: 44 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(25), to: bar(28), cues: [[0.2, 'whoosh', 0.5], [5.0, 'thump', 0.6]],
    draw(t) {
      const cam = { lat: -1.5, lon: 183.5, z: 70 * u };
      const P = mapPacific(cam); topScrim();
      islet(P, PLACE.howland, 9); islet(P, PLACE.niku, 9);
      pin(...P(PLACE.howland), 0.5, { label: 'Howland', side: 1, color: C.fog });
      // the line of position 157°–337° drawn through Howland
      const [hx, hy] = P(PLACE.howland), a = (337 - 90) * Math.PI / 180, L = 700 * u * remap(t, 0.3, 2.3);
      g.strokeStyle = C.red; g.lineWidth = 5 * u; g.setLineDash([16 * u, 12 * u]);
      g.beginPath(); g.moveTo(hx - Math.cos(a) * L, hy - Math.sin(a) * L); g.lineTo(hx + Math.cos(a) * L, hy + Math.sin(a) * L); g.stroke(); g.setLineDash([]);
      if (t > 4.5) pin(...P(PLACE.niku), t - 4.5, { label: 'Nikumaroro', side: 1 });
      kicker('เส้น 157°–337°', TX, 250 * u, t, { color: C.red });
      say('ลากผ่านเกาะ Howland ลงไปทางใต้', TX, 345 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.cream });
      say('และผ่านเกาะร้างอีกเกาะหนึ่งพอดี', TX, 1520 * u, t - 4.5, { size: 48 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(28), to: bar(32), cues: [[0.2, 'whoosh', 0.4], [5.0, 'thump', 0.6]],
    draw(t) {
      night('#04070D'); sea(t, 1100 * u);
      waves(TX, 800 * u, t, { dir: 0, spread: Math.PI, alpha: Math.max(0, 1 - t / 4) });
      say('แล้วสัญญาณก็เงียบไป', TX, 700 * u, t - 0.3, { size: 70 * u, weight: 800, color: C.cream });
      say('เครื่องบินไม่เคยมาถึงเกาะ Howland', TX, 860 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.red });
      finish();
    } },
];
