// Mary Celeste — Act 2: 0:42–3:00 (bars 17–72).
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, clouds } from './kit.js';
import { sea, ship, barrel, mapAtl, azores, PL } from './a1.js';

export default () => [
  { from: bar(17), to: bar(20), cues: [[0.2, 'type', 0.5], [3.75, 'thump', 0.6]],
    draw(t) {
      paper();
      g.save(); g.translate(TX, 820 * u); g.rotate(-0.02);
      g.fillStyle = '#EDE3C8'; rrect(g, -400 * u, -380 * u, 800 * u, 760 * u, 6 * u); g.fill();
      g.strokeStyle = 'rgba(80,110,160,0.25)'; g.lineWidth = 2 * u; for (let i = 0; i < 13; i++) { g.beginPath(); g.moveTo(-380 * u, -320 * u + i * 56 * u); g.lineTo(380 * u, -320 * u + i * 56 * u); g.stroke(); }
      typewriter('Nov. 25, 1872', -330 * u, -230 * u, t - 0.2, { size: 52 * u, weight: 400, family: '"Instrument Serif"', color: C.ink, cps: 12 });
      typewriter('มองเห็นเกาะซานตามาเรีย', -330 * u, -120 * u, t - 1.4, { size: 46 * u, weight: 700, color: C.ink, cps: 14 });
      typewriter('ในหมู่เกาะอะซอเรส', -330 * u, -50 * u, t - 2.6, { size: 46 * u, weight: 700, color: C.ink, cps: 14 });
      g.restore();
      kicker('สมุดบันทึกเดินเรือ', TX, 330 * u, t);
      say('บันทึกปกติธรรมดา ไม่มีอะไรผิดสังเกต', TX, 1300 * u, t - 3.4, { size: 46 * u, weight: 800 });
      say('หลังจากนั้น หน้ากระดาษว่างเปล่า', TX, 1410 * u, t - 3.75, { size: 52 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- discovery
  { from: bar(20), to: bar(21), cues: Array.from({ length: 5 }, (_, i) => [i * 0.15, 'tick', 0.6]).concat([[1.0, 'thump', 0.6]]),
    draw(t) {
      paper(); kicker('ธันวาคม 1872', TX, 420 * u, t);
      const d = ['26', '28', '30', '02', '04'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.15), t, { size: 360 * u, bg: C.ink, fg: C.paper, r: 18 * u });
      say('9 วันหลังบันทึกหน้าสุดท้าย', TX, 1240 * u, t - 1.0, { size: 52 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(21), to: bar(25), cues: [[0.2, 'whoosh', 0.5], [2.5, 'thump', 0.6], [5.0, 'click', 0.7]],
    draw(t) {
      night('#0A1420'); sea(t, 1050 * u);
      ship(TX + 280 * u, 1040 * u, 420 * u, { rock: Math.sin(t * 0.8) * 0.05, torn: 1 });
      ship(TX - 300 * u + t * 20 * u, 1060 * u, 300 * u, { color: '#2A2420' });
      kicker('เรือสินค้า Dei Gratia', TX, 300 * u, t, { color: C.red });
      say('พบเรือลำหนึ่งแล่นส่ายไปมา ผิดปกติ', TX, 410 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      say('ห่างจากหมู่เกาะอะซอเรสหลายร้อยกิโลเมตร', TX, 1400 * u, t - 2.5, { size: 44 * u, weight: 800, color: C.cream });
      say('กัปตันทั้งสองลำ รู้จักกันมาก่อน', TX, 1510 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(25), to: bar(29), cues: [[0.3, 'thump', 0.5], [1.6, 'thump', 0.5], [2.9, 'thump', 0.5], [4.2, 'thump', 0.5], [7.5, 'impact', 0.9]],
    draw(t) {
      paper();
      kicker('เมื่อขึ้นไปตรวจบนเรือ', TX, 300 * u, t);
      [['เรือชูชีพ 1 ลำหายไป', true], ['น้ำในท้องเรือสูงราว 1 เมตร', false], ['ไม้วัดระดับน้ำ ทิ้งไว้บนดาดฟ้า', false], ['ปั๊มสูบน้ำ ถูกถอดแยกชิ้น', false]].forEach(([s, hot], i) => {
        const at = 0.3 + i * 1.3, p = spring(t - at, 'snappy'); if (p <= 0) return;
        g.save(); g.translate((1 - p) * W, 0);
        g.fillStyle = hot ? C.red : C.paper2; rrect(g, 90 * u, 470 * u + i * 190 * u, W - 220 * u, 150 * u, 12 * u); g.fill();
        text(g, s, TX, 560 * u + i * 190 * u, { size: 44 * u, weight: 800, family: THAI, color: hot ? C.paper : C.ink }); g.restore(); });
      say('ราวกับมีคนรีบหนีลงเรือเล็ก', TX, 1380 * u, t - 7.5, { size: 54 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- the court
  { from: bar(29), to: bar(33), cues: [[0.2, 'thump', 0.6], [2.5, 'thump', 0.6], [5.0, 'impact', 0.9]],
    draw(t) {
      const [sx, sy] = shake(t, 5.0, 16); g.translate(sx, sy);
      paper();
      kicker('ศาลยิบรอลตาร์', TX, 300 * u, t);
      say('ลูกเรือ Dei Gratia ขอรับเงินค่ากู้เรือ', TX, 420 * u, t - 0.2, { size: 50 * u, weight: 800 });
      say('อัยการสงสัยว่า พวกเขาฆ่าคนบนเรือ\nเพื่อเอาเงินรางวัล', TX, 700 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.red });
      stamp('NO EVIDENCE', TX, 1100 * u, t - 5.0, { size: 120 * u, rot: -0.08 });
      say('ศาลไม่พบหลักฐานการก่อเหตุ', TX, 1400 * u, t - 5.5, { size: 48 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(33), to: bar(37), cues: [[0.2, 'pop', 0.6], [2.5, 'riser', 0.4], [5.0, 'impact', 0.9]],
    draw(t) {
      night('#140D07');
      for (let i = 0; i < 9; i++) { const c = i % 3, r = Math.floor(i / 3); barrel(TX - 220 * u + c * 220 * u, 700 * u + r * 230 * u, 190 * u, t > 5 ? '#4A3220' : '#7A5230');
        if (t > 5) text(g, 'ว่าง', TX - 220 * u + c * 220 * u, 720 * u + r * 230 * u, { size: 40 * u, weight: 800, family: THAI, color: C.red }); }
      kicker('ตอนขนสินค้าลงที่เจนัว', TX, 300 * u, t, { color: C.red });
      say('พบถังแอลกอฮอล์ ว่างเปล่า 9 ถัง', TX, 1400 * u, t - 2.5, { size: 52 * u, weight: 800, color: C.cream });
      say('ทำจากไม้โอ๊กแดง ซึ่งรั่วซึมได้ง่าย', TX, 1510 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.fog });
      finish();
    } },
  // ---------------- theories
  { from: bar(37), to: bar(41), cues: [[0.2, 'pop', 0.4], [0.6, 'pop', 0.4], [1.0, 'pop', 0.4], [1.4, 'pop', 0.4], [1.8, 'pop', 0.4]],
    draw(t) {
      paper();
      g.fillStyle = C.paper2; g.fillRect(60 * u, 470 * u, W - 120 * u, 1000 * u);
      [['โจรสลัด?', 260, 620], ['ลูกเรือก่อกบฏ?', 760, 680], ['ปลาหมึกยักษ์?', 280, 900], ['พายุงวงช้าง?', 770, 980], ['ไอแอลกอฮอล์รั่ว\nกลัวเรือระเบิด', 300, 1240], ['เข้าใจผิดว่าเรือกำลังจม', 770, 1300]].forEach(([s, x, y], i) => {
        const p = spring(t - 0.2 - i * 0.4, 'playful'); if (p <= 0) return;
        g.save(); g.translate(x * u, y * u); g.rotate((hash(i, 7) - 0.5) * 0.12); g.scale(p, p);
        g.fillStyle = i >= 4 ? C.red : '#F7F1E3'; g.fillRect(-210 * u, -80 * u, 420 * u, 160 * u);
        const ls = s.split('\n'); ls.forEach((l, k) => text(g, l, 0, (14 - (ls.length - 1) * 22 + k * 46) * u, { size: 38 * u, weight: 800, family: THAI, color: i >= 4 ? C.paper : C.ink }));
        g.restore(); });
      say('ทฤษฎีมากมาย', TX, 330 * u, t - 0.1, { size: 60 * u, weight: 800 });
      finish(0.6);
    } },
  { from: bar(41), to: bar(46), cues: [[0.2, 'riser', 0.5], [2.5, 'impact', 1.0], [6.25, 'thump', 0.6], [10.0, 'thump', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 20); g.translate(sx, sy);
      night('#0A1420'); sea(t, 1150 * u, { rough: 1.5 });
      ship(TX + 120 * u, 1130 * u, 440 * u, { rock: Math.sin(t) * 0.04 });
      // the lifeboat on a towline behind the ship
      const back = clamp((t - 6.25) / 3) * 500 * u;
      g.strokeStyle = '#B9A88A'; g.lineWidth = 3 * u; g.beginPath(); g.moveTo(TX - 100 * u, 1120 * u); g.lineTo(TX - 220 * u - back, 1150 * u); g.stroke();
      g.fillStyle = '#3A2A1A'; g.beginPath(); g.ellipse(TX - 260 * u - back, 1150 * u, 60 * u, 16 * u, 0, 0, Math.PI); g.fill();
      if (t > 2.5 && t < 4) { const p = (t - 2.5) / 1.5; g.fillStyle = `rgba(80,140,255,${0.5 * (1 - p)})`; g.beginPath(); g.ellipse(TX + 120 * u, 1080 * u, 300 * u * (0.5 + p), 120 * u * (0.5 + p), 0, 0, 7); g.fill(); }
      kicker('ทฤษฎีที่หลายคนเชื่อมากที่สุด', TX, 300 * u, t, { color: C.red });
      say('ไอแอลกอฮอล์ติดไฟวูบในระวาง\nหรือกัปตันเข้าใจผิดว่าเรือกำลังจม', TX, 410 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      say('ทุกคนลงเรือชูชีพ ผูกเชือกตามเรือใหญ่ไว้', TX, 1360 * u, t - 6.25, { size: 44 * u, weight: 800, color: C.cream });
      say('แล้วเชือกอาจขาด…', TX, 1470 * u, t - 10.0, { size: 56 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(46), to: bar(50), cues: [[0.2, 'click', 0.7], [2.5, 'thump', 0.6], [5.0, 'pop', 0.6]],
    draw(t) {
      paper();
      kicker('ปี 2006 · การทดลองที่ University College London', TX, 330 * u, t);
      // a paper box filled with vapour that flashes with a cool blue flame
      g.fillStyle = '#D9C9A6'; rrect(g, TX - 300 * u, 600 * u, 600 * u, 420 * u, 10 * u); g.fill();
      if (t > 2.5 && t < 4.5) { const p = (t - 2.5) / 2; g.fillStyle = `rgba(80,140,255,${0.6 * (1 - p)})`; rrect(g, TX - 300 * u, 600 * u, 600 * u, 420 * u, 10 * u); g.fill(); }
      say('ไอแอลกอฮอล์ลุกเป็นเปลวไฟน่ากลัว', TX, 1160 * u, t - 2.5, { size: 50 * u, weight: 800 });
      say('แต่ไม่ร้อนพอจะไหม้กล่องกระดาษ', TX, 1270 * u, t - 5.0, { size: 50 * u, weight: 800, color: C.red });
      say('อธิบายได้ว่าทำไมเรือไม่มีรอยไหม้', TX, 1380 * u, t - 6.5, { size: 44 * u, weight: 700, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------- legacy
  { from: bar(50), to: bar(54), cues: [[0.2, 'thump', 0.6], [2.5, 'type', 0.5], [5.0, 'thump', 0.6]],
    draw(t) {
      paper();
      g.save(); g.translate(TX, 760 * u); g.rotate(-0.04); g.fillStyle = '#7A2E26'; rrect(g, -260 * u, -340 * u, 520 * u, 680 * u, 8 * u); g.fill();
      text(g, 'J. Habakuk Jephson\'s', 0, -60 * u, { size: 40 * u, weight: 400, family: SERIF, color: '#F1E2B8' });
      text(g, 'Statement', 0, 0, { size: 60 * u, weight: 400, family: SERIF, color: '#F1E2B8' }); g.restore();
      kicker('1884 · Arthur Conan Doyle', TX, 300 * u, t);
      say('ผู้แต่ง Sherlock Holmes (ในเวลาต่อมา)\nเขียนเรื่องแต่งจากคดีนี้ จนโด่งดังไปทั่วโลก', TX, 1260 * u, t - 2.5, { size: 46 * u, weight: 800 });
      say('รายละเอียดแต่งเติมหลายอย่าง\nถูกเข้าใจว่าเป็นเรื่องจริง', TX, 1480 * u, t - 5.0, { size: 40 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(54), to: bar(58), cues: [[0.2, 'whoosh', 0.5], [2.5, 'thump', 0.6], [6.25, 'impact', 0.9]],
    draw(t) {
      night('#0A1420'); sea(t, 1150 * u);
      const sink = clamp((t - 6.25) / 1.5);
      ship(TX, 1130 * u + sink * 120 * u, 460 * u, { rock: 0.1 * sink, sails: 0.4 });
      g.fillStyle = '#C9B98F'; g.beginPath(); g.ellipse(TX + 380 * u, 1160 * u, 200 * u, 30 * u, 0, Math.PI, 0); g.fill();
      kicker('1885 · นอกชายฝั่งเฮติ', TX, 300 * u, t, { color: C.red });
      say('เจ้าของเรือคนใหม่จงใจชนแนวปะการัง', TX, 410 * u, t - 0.2, { size: 48 * u, weight: 800, color: C.cream });
      say('เพื่อหลอกเอาเงินประกัน', TX, 1360 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.red });
      say('ชะตากรรมสุดท้ายของเรือผี', TX, 1470 * u, t - 6.25, { size: 46 * u, weight: 800, color: C.fog });
      finish();
    } },
  { from: bar(58), to: bar(62), cues: [[0.2, 'thump', 0.6], [2.5, 'thump', 0.6], [5.0, 'thump', 0.6], [7.5, 'chime', 0.5]],
    draw(t) {
      paper();
      kicker('สิ่งที่เรารู้แน่ ๆ', TX, 300 * u, t);
      [['เรือยังแล่นได้ และไม่มีร่องรอยการต่อสู้', 0.2], ['เรือชูชีพหายไป 1 ลำ', 2.5], ['ไม่มีใครใน 10 คน ถูกพบอีกเลย', 5.0]].forEach(([s, at], i) => {
        const p = spring(t - at, 'snappy'); if (p <= 0) return;
        g.save(); g.translate((1 - p) * -80 * u, 0); g.globalAlpha = clamp((t - at) / 0.12);
        text(g, '✓', 110 * u, 600 * u + i * 180 * u, { size: 60 * u, weight: 800, family: 'Inter, sans-serif', color: C.red });
        text(g, s, 180 * u, 590 * u + i * 180 * u, { size: 42 * u, weight: 800, family: THAI, color: C.ink, align: 'left' }); g.restore(); });
      say('ทำไมต้องทิ้งเรือที่ยังลอยได้?', TX, 1300 * u, t - 7.5, { size: 54 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  { from: bar(62), to: bar(67), cues: [[0, 'thump', 0.9], [6.25, 'swish', 0.4]],
    draw(t) {
      night('#08070A');
      big('MARY', TX, 820 * u, t, { size: 230 * u, color: C.cream });
      big('CELESTE', TX, 1030 * u, t - 0.15, { size: 190 * u, color: C.cream });
      const p = spring(t - 0.8, 'default');
      g.fillStyle = C.red; g.fillRect(TX - 330 * u * p, 1090 * u, 660 * u * p, 10 * u);
      say('10 ชีวิต ไม่เคยถูกพบ', TX, 1250 * u, t - 1.5, { size: 64 * u, weight: 800, color: C.red });
      finish();
    } },
  { from: bar(67), to: bar(72), cues: [[0, 'whoosh', 0.5], [6.25, 'chime', 0.8]],
    draw(t) {
      night('#0A1420'); clouds(t * 40 * u, { alpha: 0.4, seed: 3 }); sea(t, 1100 * u);
      ship(TX, 1080 * u + Math.sin(t * 1.3) * 6 * u, 760 * u, { rock: Math.sin(t * 1.1) * 0.03, torn: 1 });
      say('ถ้าคุณอยู่บนเรือลำนั้น', TX, 330 * u, t - 0.3, { size: 54 * u, weight: 800, color: C.cream });
      say('อะไรจะทำให้คุณยอมทิ้งเรือไป?', TX, 440 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.red });
      say('คอมเมนต์บอกได้เลย', TX, 1500 * u, t - 5.0, { size: 46 * u, weight: 800, color: C.cream });
      finish();
    } },
];
