// Bernie Madoff — Act 2: 1:25–3:00 (bars 34–72). Feeder funds, the ignored warnings, the collapse, the aftermath.
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake } from './kit.js';
import { GREEN, GOLD, NAVY, INTER, fmt, smooth, market, lineChart, facade, coin, pyramid, statement, gavel, bars, arrow } from './a1.js';

// crash series: a noisy climb, then the 2008 plunge
const CRASH = (() => { const v = market(34, 11, 0.05); for (let i = 0; i < 16; i++) v.push(v[v.length - 1] * (1 - 0.035 - hash(i, 12) * 0.03 + (i % 5 === 4 ? 0.04 : 0))); return v; })();

export default () => [
  // ---------------- Chapter 5 — feeder funds
  { from: bar(34), to: bar(37), cues: Array.from({ length: 5 }, (_, i) => [0.2 + i * 0.2, 'pop', 0.4]).concat([[2.5, 'thump', 0.6], [5.0, 'chime', 0.5]]),
    draw(t) {
      paper();
      kicker('กองทุนป้อนเงิน · Feeder Funds', TX, 300 * u, t);
      say('กองทุนอื่นรวบรวมเงินลูกค้า\nแล้วส่งต่อให้ Madoff บริหาร', TX, 410 * u, t - 0.2, { size: 48 * u, weight: 800 });
      const mx = TX, my = 1090 * u;
      for (let i = 0; i < 5; i++) {
        const bx = TX + (i - 2) * 172 * u, by = 690 * u, s = clamp(spring(t - 0.2 - i * 0.2, 'playful'));
        if (t > 1.4) for (let k = 0; k < 3; k++) { const ph = (t * 0.6 + k / 3 + hash(i, 4)) % 1; coin(bx + (mx - bx) * ph, by + 60 * u + (my - by - 120 * u) * ph, 16 * u, Math.sin(ph * Math.PI)); }
        g.save(); g.translate(bx, by); g.scale(s, s);
        g.fillStyle = i === 1 ? C.red : C.ink; rrect(g, -76 * u, -48 * u, 152 * u, 96 * u, 10 * u); g.fill();
        text(g, i === 1 ? 'Fairfield' : 'กองทุน', 0, 12 * u, { size: i === 1 ? 30 * u : 32 * u, weight: 800, family: i === 1 ? INTER : THAI, color: C.paper });
        g.restore();
      }
      const ms = clamp(spring(t - 1.2, 'snappy'));
      g.save(); g.translate(mx, my); g.scale(ms, ms);
      g.fillStyle = NAVY; rrect(g, -200 * u, -70 * u, 400 * u, 140 * u, 14 * u); g.fill();
      text(g, 'MADOFF', 0, 22 * u, { size: 64 * u, weight: 400, family: SERIF, color: GOLD, tracking: 6 * u });
      g.restore();
      say('ธนาคาร มูลนิธิ คนดัง และคนธรรมดา\nรวมหลายพันบัญชีทั่วโลก', TX, 1330 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- Chapter 6 — the man who did the maths
  { from: bar(37), to: bar(39), cues: [[0.1, 'thump', 0.6], [0.8, 'type', 0.4], [2.5, 'impact', 0.8]],
    draw(t) {
      night('#0C121B');
      // chalkboard of sums that do not add up
      g.fillStyle = '#1C2A2A'; rrect(g, 420 * u, 640 * u, 500 * u, 420 * u, 10 * u); g.fill();
      g.strokeStyle = '#3A2A1C'; g.lineWidth = 12 * u; g.stroke();
      for (let i = 0; i < 5; i++) { const w = clamp((t - 0.3 - i * 0.25) / 0.3) * (200 + hash(i, 5) * 200) * u; g.fillStyle = 'rgba(233,227,211,0.7)'; g.fillRect(460 * u, 700 * u + i * 52 * u, w, 6 * u); }
      if (t > 2.5) { text(g, '≠', 790 * u, 1000 * u, { size: 150 * u, weight: 700, family: INTER, color: C.red, alpha: clamp((t - 2.5) / 0.15) }); }
      person(250 * u, 1200 * u, 120 * u, '#05080F', { tie: C.red });
      g.fillStyle = '#0A0F1A'; g.fillRect(0, 1270 * u, W, H - 1270 * u);
      kicker('ปี 2000 · บอสตัน', TX, 300 * u, t);
      say('Harry Markopolos นักวิเคราะห์การเงิน', TX, 420 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      say('ลองคำนวณกลยุทธ์ของ Madoff\nแล้วพบว่าตัวเลขเป็นไปไม่ได้', TX, 1380 * u, t - 2.5, { size: 46 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  { from: bar(39), to: bar(41), cues: [[0.2, 'type', 0.6], [0.9, 'type', 0.6], [1.5, 'type', 0.6], [2.5, 'thump', 0.6]],
    draw(t) {
      paper();
      g.save(); g.translate(TX, 840 * u); g.rotate(-0.02);
      g.fillStyle = 'rgba(0,0,0,0.15)'; g.fillRect(-372 * u, -268 * u, 760 * u, 560 * u);
      g.fillStyle = '#F7F1E3'; g.fillRect(-380 * u, -280 * u, 760 * u, 560 * u);
      typewriter("THE WORLD'S LARGEST", -330 * u, -180 * u, t - 0.2, { size: 52 * u, weight: 700, family: INTER, color: C.ink, cps: 26 });
      typewriter('HEDGE FUND', -330 * u, -110 * u, t - 0.9, { size: 52 * u, weight: 700, family: INTER, color: C.ink, cps: 26 });
      typewriter('IS A FRAUD', -330 * u, -40 * u, t - 1.5, { size: 52 * u, weight: 700, family: INTER, color: C.red, cps: 26 });
      for (let i = 0; i < 5; i++) { if (t < 2.0 + i * 0.12) continue; const y = 40 * u + i * 44 * u;
        g.fillStyle = C.red; g.fillRect(-330 * u, y, 18 * u, 18 * u); g.fillStyle = '#A39C8C'; g.fillRect(-296 * u, y + 5 * u, (300 + hash(i, 6) * 260) * u, 8 * u); }
      g.restore();
      kicker('ปี 2005 · บันทึกถึง SEC', TX, 300 * u, t);
      say('ชี้สัญญาณอันตรายหลายสิบข้อ', TX, 1250 * u, t - 2.0, { size: 52 * u, weight: 800, color: C.red });
      say('เขาเตือน SEC ซ้ำหลายครั้ง\nตั้งแต่ปี 2000 ถึง 2008', TX, 1370 * u, t - 2.8, { size: 44 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(41), to: bar(43), cues: [[0.2, 'swish', 0.5], [1.6, 'impact', 1.0], [2.5, 'thump', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 1.6, 16); g.translate(sx, sy);
      paper();
      kicker('SEC · ก.ล.ต. สหรัฐฯ', TX, 300 * u, t);
      say('เข้าตรวจสอบ Madoff หลายครั้ง', TX, 420 * u, t - 0.2, { size: 54 * u, weight: 800 });
      // case folder
      const s = spring(t - 0.2, 'snappy');
      g.save(); g.translate(TX, 840 * u + (1 - s) * 300 * u); g.rotate(0.03);
      g.fillStyle = '#C9A86A'; rrect(g, -330 * u, -230 * u, 260 * u, 70 * u, 12 * u); g.fill();
      g.fillStyle = '#D8BC80'; rrect(g, -330 * u, -190 * u, 660 * u, 400 * u, 12 * u); g.fill();
      text(g, 'CASE FILE · B. MADOFF', -290 * u, -120 * u, { size: 34 * u, weight: 700, family: INTER, color: '#5A4630', align: 'left', tracking: 2 * u });
      g.restore();
      stamp('CLOSED', TX, 900 * u, t - 1.6, { size: 130 * u, rot: -0.12 });
      say('แต่ไม่พบการโกง', TX, 1200 * u, t - 1.8, { size: 60 * u, weight: 800, color: C.red });
      say('ภายหลัง รายงานของ SEC เอง\nยอมรับว่าพลาดสัญญาณสำคัญ', TX, 1340 * u, t - 2.6, { size: 44 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------- Chapter 7 — 2008
  { from: bar(43), to: bar(45), cues: [[0.2, 'riser', 0.6], [2.0, 'impact', 1.2], [3.75, 'thump', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 2.0, 30); g.translate(sx, sy);
      night('#0B0F14');
      const p = clamp(t / 2.6);
      lineChart(120 * u, 660 * u, 780 * u, 560 * u, CRASH, p, { color: p > 0.7 ? '#E0533C' : '#4FBF7F', axis: C.fog, width: 7 * u });
      kicker('กันยายน 2008', TX, 300 * u, t);
      say('วิกฤตการเงินโลก', TX, 430 * u, t - 0.2, { size: 72 * u, weight: 800, color: C.cream });
      say('นักลงทุนต้องการเงินสด\nแห่ถอนเงินจากทุกที่', TX, 1360 * u, t - 2.2, { size: 50 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  { from: bar(45), to: bar(47), cues: [[0.2, 'thump', 0.6], [1.25, 'swish', 0.4], [2.5, 'swish', 0.4], [3.75, 'impact', 0.9]],
    draw(t) {
      paper();
      kicker('ปลายปี 2008', TX, 300 * u, t);
      say('ลูกค้าขอถอนเงินรวม\nราว 7,000 ล้านดอลลาร์', TX, 410 * u, t - 0.2, { size: 52 * u, weight: 800 });
      pyramid(TX, 720 * u, t + 3, { rows: 5, gap: 140 * u, drain: clamp((t - 0.8) / 3) * 0.8 });
      say('ไม่มีเงินใหม่มากพอ\nจะจ่ายคนเก่าอีกต่อไป', TX, 1390 * u, t - 3.6, { size: 50 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(47), to: bar(48), cues: [[0, 'tick', 0.6], [0.15, 'tick', 0.6], [0.3, 'tick', 0.6], [1.0, 'thump', 0.6]],
    draw(t) {
      paper(); kicker('ธันวาคม 2008', TX, 420 * u, t);
      const d = ['08', '09', '10'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.15), t, { size: 360 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('เขาเรียกลูกชายสองคนมาพบ', TX, 1240 * u, t - 0.8, { size: 52 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(48), to: bar(50), cues: [[0.2, 'thump', 0.6], [2.0, 'impact', 0.9], [3.75, 'pop', 0.5]],
    draw(t) {
      night('#0D0B0A');
      const gl = g.createRadialGradient(TX, 980 * u, 40 * u, TX, 980 * u, 520 * u);
      gl.addColorStop(0, 'rgba(233,198,107,0.35)'); gl.addColorStop(1, 'rgba(233,198,107,0)'); g.fillStyle = gl; g.fillRect(0, 400 * u, W, 1200 * u);
      person(TX - 230 * u, 1210 * u, 140 * u, '#000');
      person(TX + 170 * u, 1230 * u + (1 - spring(t - 0.3, 'default')) * 200 * u, 120 * u, '#1A1410');
      person(TX + 340 * u, 1240 * u + (1 - spring(t - 0.5, 'default')) * 200 * u, 115 * u, '#1A1410');
      g.fillStyle = '#060504'; g.fillRect(0, 1250 * u, W, H - 1250 * u);
      kicker('ตามคำบอกเล่าของลูกชาย', TX, 300 * u, t);
      say('เขาสารภาพว่าทั้งหมดคือ', TX, 420 * u, t - 0.2, { size: 52 * u, weight: 800, color: C.cream });
      say('“เรื่องโกหกครั้งใหญ่”', TX, 560 * u, t - 2.0, { size: 74 * u, weight: 800, color: C.red });
      say('ลูกชายทั้งสองแจ้งทางการทันที', TX, 1400 * u, t - 3.75, { size: 48 * u, weight: 800, color: C.cream });
      finish();
    } },
  { from: bar(50), to: bar(52), cues: [[0.2, 'riser', 0.5], [1.25, 'impact', 1.2], [2.5, 'thump', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 1.25, 26); g.translate(sx, sy);
      night('#06080E');
      const ph = Math.floor(t * 4) % 2;
      const lg = (x, col) => { const r = g.createRadialGradient(x, 560 * u, 10 * u, x, 560 * u, 620 * u); r.addColorStop(0, col); r.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = r; g.fillRect(0, 0, W, H); };
      lg(140 * u, ph ? 'rgba(220,40,30,0.55)' : 'rgba(220,40,30,0.12)'); lg(W - 140 * u, ph ? 'rgba(40,80,230,0.12)' : 'rgba(40,80,230,0.55)');
      person(TX, 1300 * u, 170 * u, '#000');
      g.fillStyle = '#020306'; g.fillRect(0, 1300 * u, W, H - 1300 * u);
      kicker('11 ธันวาคม 2008', TX, 300 * u, t);
      stamp('ARRESTED', TX, 700 * u, t - 1.25, { size: 120 * u, rot: -0.1 });
      say('FBI จับกุมเขาที่อพาร์ตเมนต์\nในแมนฮัตตัน', TX, 1390 * u, t - 1.6, { size: 50 * u, weight: 800, color: C.cream });
      finish();
    } },
  // ---------------- Chapter 8 — the numbers
  { from: bar(52), to: bar(55), cues: Array.from({ length: 6 }, (_, i) => [0.1 + i * 0.12, 'swish', 0.3]).concat([[1.5, 'impact', 1.0], [3.0, 'pop', 0.6], [4.4, 'pop', 0.6], [6.0, 'thump', 0.6]]),
    draw(t) {
      paper();
      kicker('ตัวเลขที่แท้จริง', TX, 300 * u, t);
      for (let i = 0; i < 6; i++) { const s = spring(t - 0.1 - i * 0.12, 'snappy');
        statement(TX + (i - 2.5) * 34 * u, 700 * u - i * 10 * u - (1 - s) * 900 * u, 300 * u, (hash(i, 9) - 0.5) * 0.3, { amount: `$${fmt(2e5 + hash(i, 7) * 4e6)}`, seed: i }); }
      stamp('FAKE', TX, 720 * u, t - 1.5, { size: 150 * u, rot: -0.16 });
      const b1 = clamp(spring(t - 3.0, 'default')), b2 = clamp(spring(t - 4.4, 'default')), BW = 760 * u, x0 = 130 * u;
      text(g, 'ยอดในใบแจ้งยอด ~$64,800 ล้าน', x0, 1090 * u, { size: 38 * u, weight: 800, family: THAI, color: GREEN, align: 'left', alpha: b1 });
      g.fillStyle = GREEN; g.fillRect(x0, 1110 * u, BW * b1, 50 * u);
      text(g, 'เงินต้นที่สูญจริง ราว $17,000–20,000 ล้าน', x0, 1240 * u, { size: 38 * u, weight: 800, family: THAI, color: C.red, align: 'left', alpha: b2 });
      g.fillStyle = C.red; g.fillRect(x0, 1260 * u, BW * (19 / 64.8) * b2, 50 * u);
      g.save(); g.setLineDash([10 * u, 8 * u]); g.strokeStyle = C.red; g.lineWidth = 3 * u; g.globalAlpha = b2; g.strokeRect(x0 + BW * (17 / 64.8), 1260 * u, BW * (3 / 64.8), 50 * u); g.restore();
      say('ส่วนที่เหลือคือ “กำไร”\nที่ไม่เคยมีอยู่จริง', TX, 1420 * u, t - 6.0, { size: 46 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(55), to: bar(58), cues: [[0.2, 'thump', 0.6], [3.75, 'impact', 1.3], [5.0, 'thump', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 3.75, 24); g.translate(sx, sy);
      paper();
      const ang = t < 3.75 ? track(t, [[0, 0], [1.2, 0.75]], 'default') : 0.75 * clamp(1 - (t - 3.75) / 0.06);
      gavel(TX - 230 * u, 820 * u, 260 * u, ang);
      kicker('มีนาคม 2009', TX, 300 * u, t);
      say('รับสารภาพทั้ง 11 ข้อหา', TX, 420 * u, t - 0.2, { size: 58 * u, weight: 800 });
      say('รวมถึงฉ้อโกงหลักทรัพย์และฟอกเงิน', TX, 520 * u, t - 1.0, { size: 40 * u, weight: 700, color: C.inkSoft });
      big('150 ปี', TX, 1220 * u, t - 3.75, { size: 190 * u, color: C.red });
      say('มิถุนายน 2009 · ศาลตัดสินจำคุก\nโทษสูงสุดตามกฎหมาย ขณะเขาอายุ 71', TX, 1350 * u, t - 5.0, { size: 42 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(58), to: bar(60), cues: Array.from({ length: 8 }, (_, i) => [0.2 + i * 0.25, 'tick', 0.35]).concat([[2.5, 'chime', 0.6]]),
    draw(t) {
      paper();
      kicker('Irving Picard · ผู้ชำระบัญชีที่ศาลแต่งตั้ง', TX, 300 * u, t);
      say('ฟ้องเรียกเงินคืนจากธนาคาร\nกองทุน และผู้ที่ได้ “กำไร” ไป', TX, 410 * u, t - 0.2, { size: 46 * u, weight: 800 });
      for (let i = 0; i < 14; i++) { const ph = clamp((t - 0.3 - i * 0.12) / 0.6); if (ph <= 0) continue; coin(TX + (hash(i, 3) - 0.5) * 360 * u, 640 * u + ph * 300 * u, 26 * u, ph < 1 ? 1 : 0); }
      // jar
      g.strokeStyle = C.ink; g.lineWidth = 6 * u; rrect(g, TX - 220 * u, 860 * u, 440 * u, 300 * u, 30 * u); g.stroke();
      const lvl = clamp(spring(t - 0.5, 30, 11));
      g.fillStyle = GOLD; g.fillRect(TX - 214 * u, 1154 * u - 240 * u * lvl, 428 * u, 240 * u * lvl);
      const n = 14000 * lvl;
      text(g, `กว่า $${fmt(Math.round(n / 100) * 100)} ล้าน`, TX, 1290 * u, { size: 76 * u, weight: 800, family: THAI, color: C.red });
      say('กระบวนการคืนเงินยืดเยื้อมานานกว่า 15 ปี', TX, 1420 * u, t - 2.5, { size: 42 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  { from: bar(60), to: bar(62), cues: [[0.2, 'thump', 0.6], [1.25, 'impact', 0.8], [3.0, 'chime', 0.4]],
    draw(t) {
      night('#0E0F14');
      bars(90 * u, 560 * u, W - 180 * u, 640 * u, spring(t - 0.2, 'heavy'));
      kicker('14 เมษายน 2021', TX, 330 * u, t);
      say('เสียชีวิตในเรือนจำ ด้วยวัย 82 ปี', TX, 1320 * u, t - 1.25, { size: 54 * u, weight: 800, color: C.cream });
      say('หลังรับโทษไปราว 12 ปี', TX, 1440 * u, t - 2.5, { size: 46 * u, weight: 700, color: C.fog });
      finish();
    } },
  // ---------------- Chapter 9 — lessons & close
  { from: bar(62), to: bar(64), cues: [[0.2, 'pop', 0.5], [1.25, 'pop', 0.5], [2.5, 'pop', 0.5], [3.75, 'thump', 0.6]],
    draw(t) {
      paper();
      kicker('สัญญาณอันตรายที่หลายคนมองข้าม', TX, 300 * u, t);
      [['กำไรสม่ำเสมอเกินจริง', 0.2], ['อธิบายไม่ได้ว่ากำไรมาจากไหน', 1.25], ['ผู้สอบบัญชีเป็นสำนักงานเล็ก ๆ', 2.5]].forEach(([s, at], i) => {
        const p = spring(t - at, 'snappy'); if (p <= 0) return;
        const y = 560 * u + i * 220 * u;
        g.save(); g.translate((1 - p) * W, 0);
        g.fillStyle = C.paper2; rrect(g, 90 * u, y - 80 * u, W - 220 * u, 160 * u, 14 * u); g.fill();
        text(g, String(i + 1), 160 * u, y + 34 * u, { size: 100 * u, weight: 400, family: SERIF, color: C.red });
        text(g, s, 240 * u, y + 14 * u, { size: 42 * u, weight: 800, family: THAI, color: C.ink, align: 'left' });
        g.restore(); });
      say('ถ้าดีเกินจริง… มักไม่จริง', TX, 1340 * u, t - 3.75, { size: 62 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(64), to: bar(68), cues: [[0, 'thump', 0.9], [5.0, 'impact', 0.9], [7.5, 'swish', 0.4]],
    draw(t) {
      const [sx, sy] = shake(t, 5.0, 18); g.translate(sx, sy);
      night('#08070A');
      big('Bernie Madoff', TX, 700 * u, t, { size: 130 * u, color: C.cream });
      const p = spring(t - 0.7, 'default');
      g.fillStyle = C.red; g.fillRect(TX - 330 * u * p, 760 * u, 660 * u * p, 10 * u);
      say('แชร์ลูกโซ่ที่ใหญ่ที่สุดในประวัติศาสตร์', TX, 860 * u, t - 1.0, { size: 48 * u, weight: 800, color: C.red });
      const v = smooth(40); if (t > 5.0) v.push(v[39], v[39] * 0.0 + 60);
      lineChart(130 * u, 1060 * u, 760 * u, 420 * u, v.slice(0, t > 5.0 ? 42 : 40), t > 5.0 ? clamp(0.95 + (t - 5.0) * 0.2) : clamp((t - 1.5) / 3.3) * (t > 5 ? 1 : 0.999),
        { color: t > 5.0 ? C.red : '#4FBF7F', axis: C.fog, lo: 60, hi: Math.max(...smooth(40)), grid: false });
      finish();
    } },
  { from: bar(68), to: bar(72), cues: Array.from({ length: 8 }, (_, i) => [i * 0.625, 'thump', 0.35]).concat([[5.0, 'chime', 0.8]]),
    draw(t) {
      paper();
      facade({ top: 860 * u, base: 1480 * u });
      g.fillStyle = 'rgba(239,230,210,0.92)'; g.fillRect(0, 200 * u, W, 400 * u);
      say('ถ้ามีคนเสนอกำไรสม่ำเสมอ\nไม่เคยขาดทุนเลย คุณจะลงทุนไหม?', TX, 310 * u, t - 0.3, { size: 50 * u, weight: 800, color: C.ink });
      say('คอมเมนต์บอกได้เลย', TX, 520 * u, t - 2.5, { size: 48 * u, weight: 800, color: C.red });
      finish(0.5);
    } },
];
