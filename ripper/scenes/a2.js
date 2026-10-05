// Jack the Ripper — Act 2: 0:40–3:00 (bars 16–72). Letters, police, press, suspects, DNA, still unsolved.
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, measure } from './kit.js';
import { N, fog, gaslamp, terraces, eastEnd, walker, bust, newspaper, letter, candle, wcMap, SITE, approxNote } from './a1.js';

// brick wall filling the frame, with a chalk scrawl that a wipe (0..1) erases left to right
function wall(t, wipe = 0) {
  g.fillStyle = '#2A1D17'; g.fillRect(0, 0, W, H);
  for (let r = 0; r < 40; r++) for (let c = -1; c < 12; c++) {
    const x = c * 110 * u + (r % 2) * 55 * u, y = r * 48 * u, k = r * 13 + c;
    g.fillStyle = `rgb(${58 + hash(k, 2) * 22},${36 + hash(k, 3) * 12},${28 + hash(k, 4) * 8})`;
    g.fillRect(x + 3 * u, y + 3 * u, 104 * u, 42 * u);
  }
  // illegible chalk lines — the exact wording is disputed, so it is never written out
  g.save(); g.strokeStyle = N.chalk; g.lineWidth = 7 * u; g.lineCap = 'round'; g.globalAlpha = 0.85;
  for (let l = 0; l < 4; l++) { g.beginPath();
    for (let k = 0; k <= 60; k++) { const x = 160 * u + k * 11 * u * (l === 3 ? 0.6 : 1), y = 820 * u + l * 95 * u + Math.sin(k * 1.3 + l) * 16 * u + (hash(k + l * 70, 9) - 0.5) * 22 * u;
      if (hash(k + l * 70, 10) < 0.12) g.moveTo(x, y); else k ? g.lineTo(x, y) : g.moveTo(x, y); }
    g.stroke(); }
  g.restore();
  if (wipe > 0) { const wx = 120 * u + wipe * 800 * u; g.fillStyle = '#3A2820'; g.globalAlpha = 0.97; g.fillRect(120 * u, 770 * u, wipe * 800 * u, 420 * u); g.globalAlpha = 1;
    g.fillStyle = '#6E5A44'; rrect(g, wx - 40 * u, 900 * u + Math.sin(wipe * 30) * 40 * u, 90 * u, 130 * u, 16 * u); g.fill(); }
}
// small brown-paper parcel tied with string
function parcel(x, y, s, rot = 0) {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  g.fillStyle = 'rgba(0,0,0,0.4)'; g.fillRect(-0.48, -0.28, 1, 0.66);
  g.fillStyle = '#9C7A4E'; g.fillRect(-0.5, -0.32, 1, 0.64);
  g.fillStyle = '#B4925F'; g.beginPath(); g.moveTo(-0.5, -0.32); g.lineTo(-0.38, -0.44); g.lineTo(0.62, -0.44); g.lineTo(0.5, -0.32); g.fill();
  g.fillStyle = '#7C5E3A'; g.beginPath(); g.moveTo(0.5, -0.32); g.lineTo(0.62, -0.44); g.lineTo(0.62, 0.2); g.lineTo(0.5, 0.32); g.fill();
  g.strokeStyle = '#E8DCC0'; g.lineWidth = 0.025; g.beginPath(); g.moveTo(0, -0.32); g.lineTo(0, 0.32); g.moveTo(-0.5, 0); g.lineTo(0.5, 0); g.moveTo(0, -0.32); g.lineTo(0.12, -0.44); g.stroke();
  g.restore();
}
// patterned shawl with fringe (no stains, no detail)
function shawl(x, y, w, t) {
  const h = w * 0.62;
  g.save(); g.translate(x, y); g.rotate(-0.05);
  g.fillStyle = '#4A3A52'; g.beginPath(); g.moveTo(-w / 2, -h / 2);
  for (let k = 0; k <= 10; k++) g.lineTo(-w / 2 + k * w / 10, -h / 2 + Math.sin(k * 1.4 + t) * 6 * u);
  g.lineTo(w / 2, h / 2); g.lineTo(-w / 2, h / 2); g.closePath(); g.fill();
  for (let i = 0; i < 26; i++) { const fx = (hash(i, 61) - 0.5) * w * 0.85, fy = (hash(i, 62) - 0.5) * h * 0.8;
    g.fillStyle = i % 3 ? '#C9A85C' : '#D9CFBF'; for (let p = 0; p < 5; p++) { g.beginPath(); g.ellipse(fx + Math.cos(p * 1.26) * 12 * u, fy + Math.sin(p * 1.26) * 12 * u, 9 * u, 5 * u, p * 1.26, 0, 7); g.fill(); }
    g.fillStyle = '#E8B84A'; g.beginPath(); g.arc(fx, fy, 5 * u, 0, 7); g.fill(); }
  g.strokeStyle = '#4A3A52'; g.lineWidth = 3 * u;
  for (let k = 0; k < 40; k++) { const fx = -w / 2 + (k + 0.5) * w / 40; g.beginPath(); g.moveTo(fx, h / 2); g.lineTo(fx + Math.sin(t * 2 + k) * 4 * u, h / 2 + 34 * u); g.stroke(); }
  g.restore();
}
// DNA double helix drawn up to progress p
function helix(x, y, h, t, p = 1, color = N.lamp) {
  g.save(); g.lineWidth = 6 * u; g.lineCap = 'round';
  const n = 28;
  for (let k = 0; k < n * p; k++) { const yy = y - h / 2 + k * h / n, a = k * 0.45 + t * 2, x1 = x + Math.sin(a) * 70 * u, x2 = x - Math.sin(a) * 70 * u;
    g.strokeStyle = 'rgba(239,230,210,0.35)'; g.beginPath(); g.moveTo(x1, yy); g.lineTo(x2, yy); g.stroke();
    g.fillStyle = Math.cos(a) > 0 ? color : C.cream; g.beginPath(); g.arc(x1, yy, 9 * u, 0, 7); g.fill();
    g.fillStyle = Math.cos(a) > 0 ? C.cream : color; g.beginPath(); g.arc(x2, yy, 9 * u, 0, 7); g.fill(); }
  g.restore();
}
// dark band for text over art
const band = (y, h, a = 0.78) => { g.fillStyle = `rgba(8,10,17,${a})`; g.fillRect(0, y, W, h); };

export default () => [
  // ---------------- victim 2
  { from: bar(16), to: bar(19), cues: [[0.2, 'whoosh', 0.5], [1.4, 'pop', 0.7], [3.75, 'thump', 0.5]],
    draw(t) {
      const P = wcMap(t, { reveal: 1 });
      const [nx, ny] = P(SITE.nichols); candle(nx, ny - 6 * u, 40 * u, t, 1);
      const [x, y] = P(SITE.chapman); g.save(); g.globalAlpha = clamp((t - 1.2) / 0.4); candle(x, y - 6 * u, 46 * u, t, 2); g.restore();
      pin(x, y, t - 1.4, { label: 'Hanbury Street', color: N.lamp, side: -1 });
      topScrim(640);
      kicker('8 กันยายน 1888 · รายที่ 2', TX, 260 * u, t, { color: N.lamp });
      big('Annie Chapman', TX, 420 * u, t - 0.2, { size: 104 * u, color: C.cream });
      say('พบในลานหลังบ้านเลขที่ 29 ถนน Hanbury', TX, 510 * u, t - 3.0, { size: 38 * u, weight: 800, color: C.cream });
      approxNote(t - 2.0);
      finish(0.8);
    } },
  // ---------------- fear, rumour, prejudice
  { from: bar(19), to: bar(21), cues: [[0.1, 'swish', 0.5], [0.5, 'swish', 0.4], [0.9, 'swish', 0.4], [2.6, 'thump', 0.6]],
    draw(t) {
      night(N.sky); fog(t, { y0: 600 * u, y1: 1600 * u, n: 8, alpha: 0.1, seed: 12 });
      [[-170, 1040, -0.14, 'WHITECHAPEL\nIN TERROR'], [190, 1080, 0.1, 'WHO IS\n“LEATHER APRON”?'], [0, 1130, -0.03, 'ANOTHER\nMURDER']].forEach(([dx, y, r, h], i) => {
        const s = spring(t - 0.1 - i * 0.4, 'snappy'); if (s <= 0) return;
        newspaper(TX + dx * u, y * u + (1 - s) * 900 * u, 470 * u, r * s, h, { seed: i + 3, masthead: ['THE LAMPLIGHT GAZETTE', 'EAST END ECHO', 'THE PENNY HERALD'][i] }); });
      band(220 * u, 330 * u);
      kicker('ความกลัวลามไปทั่ว', TX, 300 * u, t, { color: N.lamp });
      say('ข่าวลือเรื่องชายฉายา “Leather Apron”\nปลุกอคติต่อชาวยิวในย่านนั้น', TX, 410 * u, t - 0.2, { size: 44 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- Dear Boss
  { from: bar(21), to: bar(24), cues: [[0.1, 'whoosh', 0.5], [0.3, 'type', 0.5], [1.0, 'type', 0.4], [4.0, 'type', 0.6], [5.0, 'impact', 0.8]],
    draw(t) {
      night('#100C0A');
      const s = clamp(spring(t, 'default'));
      letter(TX, 1000 * u + (1 - s) * 500 * u, 640 * u, -0.04, t - 0.3, { head: 'Dear Boss,', sign: 'Jack the Ripper', signAt: 3.7, lines: 7, h: 700 * u });
      band(210 * u, 350 * u);
      kicker('จดหมาย “Dear Boss”', TX, 280 * u, t, { color: N.lamp });
      say('ลงวันที่ 25 ก.ย. 1888 ส่งถึงสำนักข่าว\nCentral News Agency', TX, 390 * u, t - 0.2, { size: 42 * u, weight: 800, color: C.cream });
      band(1400 * u, 180 * u);
      say('เขียนด้วยหมึกแดง และลงชื่อว่า…', TX, 1500 * u, t - 2.5, { size: 44 * u, weight: 800, color: N.lamp });
      finish(0.8);
    } },
  // ---------------- likely a hoax
  { from: bar(24), to: bar(26), cues: [[0.1, 'swish', 0.5], [2.5, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 18); g.translate(sx, sy);
      night(N.sky);
      const s = spring(t - 0.1, 'snappy');
      newspaper(TX, 1000 * u + (1 - s) * 900 * u, 560 * u, -0.05, 'JACK\nTHE RIPPER', { seed: 9 });
      stamp('HOAX?', TX + 60 * u, 1080 * u, t - 2.5, { size: 130 * u, rot: -0.16 });
      band(210 * u, 330 * u);
      say('ชื่อนี้ถูกตีพิมพ์ แล้วติดปากคนทั่วโลก', TX, 300 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      say('แต่ตำรวจบางคนในยุคนั้น และนักวิจัยจำนวนมาก\nเชื่อว่านักข่าวเป็นคนเขียนเอง', TX, 400 * u, t - 2.6, { size: 38 * u, weight: 800, color: N.lamp });
      finish(0.8);
    } },
  // ---------------- 30 September
  { from: bar(26), to: bar(27), cues: Array.from({ length: 5 }, (_, i) => [i * 0.15, 'tick', 0.6]).concat([[1.0, 'thump', 0.7]]),
    draw(t) {
      night(N.sky); fog(t, { y0: 300 * u, y1: 1600 * u, n: 8, alpha: 0.1, seed: 6 });
      kicker('กันยายน 1888', TX, 420 * u, t, { color: N.lamp });
      const d = ['26', '27', '28', '29', '30'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.15), t, { size: 360 * u, bg: C.cream, fg: C.ink, r: 18 * u });
      say('คืนเดียว… สองราย', TX, 1240 * u, t - 1.0, { size: 60 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- the "double event"
  { from: bar(27), to: bar(30), cues: [[0.2, 'pop', 0.7], [2.5, 'pop', 0.7], [5.0, 'whoosh', 0.5]],
    draw(t) {
      const P = wcMap(t, { reveal: 1, city: clamp((t - 4.8) / 0.5), dim: 0.85, cy: 1000 * u });
      [['nichols', 1], ['chapman', 2]].forEach(([k, sd]) => { const [x, y] = P(SITE[k]); candle(x, y - 6 * u, 36 * u, t, sd); });
      const [sx, sy] = P(SITE.stride), [ex, ey] = P(SITE.eddowes);
      if (t > 0.6) candle(sx, sy - 6 * u, 40 * u, t, 3, clamp((t - 0.6) / 0.4));
      if (t > 3.0) candle(ex, ey - 6 * u, 40 * u, t, 4, clamp((t - 3.0) / 0.4));
      pin(sx, sy, t - 0.2, { label: 'Berner Street', color: N.lamp, side: 1 });
      pin(ex, ey, t - 2.5, { label: 'Mitre Square', color: N.lamp, side: 1 });
      topScrim(660);
      kicker('30 กันยายน 1888 · รายที่ 3 และ 4', TX, 250 * u, t, { color: N.lamp });
      big('Elizabeth Stride', TX, 380 * u, t - 0.2, { size: 84 * u, color: C.cream });
      big('Catherine Eddowes', TX, 490 * u, t - 2.5, { size: 84 * u, color: C.cream });
      band(1380 * u, 200 * u, 0.7);
      say('ห่างกันไม่ถึงหนึ่งชั่วโมง\nเดินถึงกันได้ในไม่กี่นาที', TX, 1440 * u, t - 5.0, { size: 40 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- two police forces + Abberline
  { from: bar(30), to: bar(33), cues: [[0.2, 'thump', 0.6], [2.5, 'pop', 0.6], [5.0, 'thump', 0.6]],
    draw(t) {
      night('#0B0F18'); fog(t, { y0: 900 * u, y1: 1500 * u, n: 8, alpha: 0.12, seed: 14 });
      const pa = spring(t - 0.3, 'default'), pb = spring(t - 0.6, 'default');
      g.save(); g.globalAlpha = clamp(pa); bust(250 * u, 1250 * u - (1 - pa) * 80 * u, 170 * u, '#1E2B44', 'helmet'); g.restore();
      g.save(); g.globalAlpha = clamp(pb); bust(790 * u, 1250 * u - (1 - pb) * 80 * u, 170 * u, '#2A2230', 'helmet'); g.restore();
      text(g, 'Metropolitan Police', 250 * u, 1400 * u, { size: 32 * u, weight: 700, family: 'Inter, sans-serif', color: C.fog, alpha: clamp(pa) });
      text(g, 'City of London Police', 790 * u, 1400 * u, { size: 32 * u, weight: 700, family: 'Inter, sans-serif', color: C.fog, alpha: clamp(pb) });
      const pc = spring(t - 2.5, 'heavy');
      g.save(); g.globalAlpha = clamp(pc); bust(TX, 1180 * u, 230 * u, '#05060A', 'bowler'); g.restore();
      kicker('การสืบสวน', TX, 290 * u, t, { color: N.lamp });
      say('Mitre Square อยู่ในเขต City of London\nตำรวจสองหน่วยจึงต้องทำงานคู่กัน', TX, 400 * u, t - 0.2, { size: 42 * u, weight: 800, color: C.cream });
      say('สารวัตร Frederick Abberline\nแห่ง Scotland Yard ประสานงานภาคสนาม', TX, 1490 * u, t - 2.8, { size: 40 * u, weight: 800, color: N.lamp });
      finish(0.8);
    } },
  // ---------------- Goulston Street
  { from: bar(33), to: bar(36), cues: [[0.2, 'thump', 0.6], [2.5, 'swish', 0.6], [5.0, 'whoosh', 0.7]],
    draw(t) {
      wall(t, clamp((t - 5.0) / 1.6));
      band(200 * u, 420 * u, 0.85);
      kicker('Goulston Street · คืนเดียวกัน', TX, 270 * u, t, { color: N.lamp });
      say('ตำรวจพบเศษผ้ากันเปื้อนของ Eddowes\nใต้ข้อความชอล์กบนกำแพง', TX, 380 * u, t - 0.2, { size: 42 * u, weight: 800, color: C.cream });
      say('ข้อความเอ่ยถึงชาวยิว\nถ้อยคำที่แน่ชัดยังถกเถียงกันจนวันนี้', TX, 520 * u, t - 2.5, { size: 36 * u, weight: 800, color: N.lamp });
      band(1330 * u, 250 * u, 0.85);
      say('ผบ.ตร. Charles Warren สั่งลบก่อนเช้า\nเพราะกลัวเกิดจลาจลต่อต้านชาวยิว', TX, 1410 * u, t - 5.0, { size: 40 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- From Hell
  { from: bar(36), to: bar(39), cues: [[0.1, 'whoosh', 0.5], [0.3, 'type', 0.5], [2.5, 'thump', 0.7], [5.0, 'pop', 0.5]],
    draw(t) {
      night('#100C0A');
      const s = clamp(spring(t, 'default'));
      letter(TX - 40 * u, 1000 * u + (1 - s) * 500 * u, 560 * u, 0.05, t - 0.3, { head: 'From hell', lines: 6, h: 640 * u, seed: 7, ink: '#2A1E18' });
      const ps = spring(t - 2.5, 'snappy'); if (ps > 0) parcel(730 * u, 1300 * u + (1 - ps) * 300 * u, 230 * u, -0.08);
      band(210 * u, 380 * u);
      kicker('จดหมาย “From Hell” · 16 ต.ค. 1888', TX, 280 * u, t, { color: N.lamp });
      say('ส่งถึง George Lusk ประธาน\nคณะกรรมการเฝ้าระวังแห่ง Whitechapel', TX, 390 * u, t - 0.2, { size: 42 * u, weight: 800, color: C.cream });
      band(1400 * u, 190 * u);
      say('มาพร้อมพัสดุกล่องเล็ก ๆ', TX, 1470 * u, t - 2.8, { size: 46 * u, weight: 800, color: N.lamp });
      say('นักวิจัยบางคนมองว่า ฉบับนี้มีโอกาสเป็นของจริงมากกว่า', TX, 1545 * u, t - 5.0, { size: 34 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- press frenzy
  { from: bar(39), to: bar(41), cues: Array.from({ length: 6 }, (_, i) => [0.1 + i * 0.3, 'swish', 0.35]).concat([[2.6, 'type', 0.5]]),
    draw(t) {
      night(N.sky);
      for (let i = 0; i < 6; i++) { const s = spring(t - 0.1 - i * 0.3, 'snappy'); if (s <= 0) continue;
        newspaper(200 * u + (i % 3) * 330 * u + (hash(i, 4) - 0.5) * 60 * u, 860 * u + Math.floor(i / 3) * 420 * u, 360 * u, (hash(i, 5) - 0.5) * 0.4 * s + (1 - s) * 2, ['HORROR', 'THE KILLER\nWRITES', 'POLICE\nBAFFLED', 'NEW\nLETTER', 'FEAR IN\nTHE EAST', 'STILL AT\nLARGE'][i],
          { seed: i + 11, masthead: ['THE LAMPLIGHT GAZETTE', 'EAST END ECHO', 'THE PENNY HERALD'][i % 3] }); }
      band(200 * u, 360 * u, 0.85);
      kicker('สื่อคลั่ง', TX, 280 * u, t, { color: N.lamp });
      say('หนังสือพิมพ์ราคาถูกแข่งกันพาดหัว', TX, 380 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      say('จดหมายที่อ้างเป็นฆาตกรหลั่งไหลมาหลายร้อยฉบับ', TX, 480 * u, t - 2.5, { size: 36 * u, weight: 800, color: N.lamp });
      finish(0.8);
    } },
  // ---------------- 9 November
  { from: bar(41), to: bar(42), cues: Array.from({ length: 5 }, (_, i) => [i * 0.15, 'tick', 0.6]).concat([[1.0, 'thump', 0.7]]),
    draw(t) {
      night(N.sky); fog(t, { y0: 300 * u, y1: 1600 * u, n: 8, alpha: 0.1, seed: 16 });
      kicker('พฤศจิกายน 1888', TX, 420 * u, t, { color: N.lamp });
      const d = ['5', '6', '7', '8', '9'];
      flip(TX, 820 * u, 460 * u, 540 * u, d, d.map((_, i) => i * 0.15), t, { size: 360 * u, bg: C.cream, fg: C.ink, r: 18 * u });
      say('รายที่ 5', TX, 1240 * u, t - 1.0, { size: 60 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- victim 5
  { from: bar(42), to: bar(45), cues: [[0.2, 'whoosh', 0.5], [1.4, 'pop', 0.6], [3.75, 'chime', 0.4]],
    draw(t) {
      const P = wcMap(t, { reveal: 1, dim: 0.9 });
      ['nichols', 'chapman', 'stride', 'eddowes'].forEach((k, i) => { const [x, y] = P(SITE[k]); candle(x, y - 6 * u, 36 * u, t, i + 1); });
      const [x, y] = P(SITE.kelly); g.save(); g.globalAlpha = clamp((t - 1.2) / 0.4); candle(x, y - 6 * u, 46 * u, t, 5); g.restore();
      pin(x, y, t - 1.4, { label: "Miller's Court", color: N.lamp, side: 1 });
      topScrim(640);
      kicker('9 พฤศจิกายน 1888 · รายที่ 5', TX, 260 * u, t, { color: N.lamp });
      big('Mary Jane Kelly', TX, 420 * u, t - 0.2, { size: 100 * u, color: C.cream });
      say('ในห้องเช่าของเธอเอง ย่าน Dorset Street\nอายุราว 25 ปี อายุน้อยที่สุดในห้าราย', TX, 505 * u, t - 3.0, { size: 36 * u, weight: 800, color: C.cream });
      approxNote(t - 2.0);
      finish(0.8);
    } },
  // ---------------- remember the five
  { from: bar(45), to: bar(48), cues: Array.from({ length: 5 }, (_, i) => [0.3 + i * 0.4, 'chime', 0.25]).concat([[5.0, 'thump', 0.5]]),
    draw(t) {
      night('#07080D');
      const names = [['Mary Ann Nichols', '31.08.1888'], ['Annie Chapman', '08.09.1888'], ['Elizabeth Stride', '30.09.1888'], ['Catherine Eddowes', '30.09.1888'], ['Mary Jane Kelly', '09.11.1888']];
      names.forEach(([n, d], i) => { const at = 0.3 + i * 0.4, y = 640 * u + i * 150 * u;
        candle(170 * u, y + 20 * u, 70 * u, t, i + 1, clamp((t - at) / 0.3));
        text(g, n, 260 * u, y - 10 * u, { size: 54 * u, weight: 400, family: SERIF, color: C.cream, align: 'left', alpha: clamp((t - at) / 0.3) });
        text(g, d, 262 * u, y + 34 * u, { size: 26 * u, weight: 700, family: 'Inter, sans-serif', color: C.fog, align: 'left', tracking: 2 * u, alpha: clamp((t - at - 0.1) / 0.3) }); });
      kicker('ห้ารายที่เรียกว่า “canonical five”', TX, 300 * u, t, { color: N.lamp });
      say('ผู้หญิงยากจนที่มีชีวิต มีครอบครัว', TX, 410 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      say('หนังสือ The Five (2019) ของ Hallie Rubenhold\nเล่าชีวิตของพวกเธอ แทนเรื่องของฆาตกร', TX, 1440 * u, t - 5.0, { size: 36 * u, weight: 800, color: N.lamp });
      finish(0.8);
    } },
  // ---------------- how many victims?
  { from: bar(48), to: bar(50), cues: Array.from({ length: 11 }, (_, i) => [0.2 + i * 0.12, 'tick', 0.4]).concat([[2.6, 'thump', 0.6]]),
    draw(t) {
      night(N.sky);
      const canon = [2, 3, 4, 5, 6];   // positions of the five within the 11-name police file (chronological)
      for (let i = 0; i < 11; i++) { const at = 0.2 + i * 0.12, x = TX + (i % 6 - 2.5) * 130 * u + (i >= 6 ? 65 * u : 0), y = 820 * u + Math.floor(i / 6) * 160 * u;
        const s = clamp(spring(t - at, 'snappy')); const hi = canon.includes(i) && t > 2.4;
        g.fillStyle = hi ? N.lamp : 'rgba(239,230,210,0.35)'; g.beginPath(); g.arc(x, y, 44 * u * s, 0, 7); g.fill(); }
      kicker('แฟ้มคดี “Whitechapel murders”', TX, 300 * u, t, { color: N.lamp });
      say('มีชื่อเหยื่อ 11 ราย\nเม.ย. 1888 – ก.พ. 1891', TX, 410 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      say('ส่วนใหญ่เชื่อว่า 5 รายเป็นฝีมือคนเดียวกัน', TX, 1200 * u, t - 2.6, { size: 42 * u, weight: 800, color: N.lamp });
      say('แต่นักประวัติศาสตร์ยังเถียงกัน\nบางคนว่าน้อยกว่า บางคนว่ามากกว่า', TX, 1340 * u, t - 3.6, { size: 38 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- Macnaghten memorandum
  { from: bar(50), to: bar(53), cues: [[0.1, 'type', 0.5], [1.3, 'pop', 0.5], [2.5, 'pop', 0.5], [3.75, 'pop', 0.5]],
    draw(t) {
      paper();
      g.fillStyle = C.paper2; rrect(g, 70 * u, 560 * u, W - 140 * u, 980 * u, 16 * u); g.fill();
      typewriter('MEMORANDUM · 1894', 110 * u, 630 * u, t - 0.1, { size: 34 * u, weight: 700, family: 'Inter, sans-serif', color: C.inkSoft, cps: 20, caret: false });
      const sus = [['Montague Druitt', 'ทนายความ · พบศพในแม่น้ำเทมส์\nปลายเดือน ธ.ค. 1888'], ['Aaron Kosminski', 'ช่างตัดผมชาวโปแลนด์\nถูกส่งโรงพยาบาลจิตเวชปี 1891'], ['Michael Ostrog', 'นักต้มตุ๋น · ภายหลังพบว่า\nปี 1888 น่าจะติดคุกอยู่ที่ฝรั่งเศส']];
      sus.forEach(([n, d], i) => { const at = 1.3 + i * 1.25, s = clamp(spring(t - at, 'default')); if (s <= 0) return; const y = 760 * u + i * 260 * u;
        g.save(); g.globalAlpha = s; g.translate((1 - s) * 80 * u, 0);
        bust(190 * u, y + 110 * u, 70 * u, C.ink, i === 0 ? 'top' : 'bowler');
        text(g, n, 300 * u, y + 20 * u, { size: 48 * u, weight: 400, family: SERIF, color: C.ink, align: 'left' });
        d.split('\n').forEach((ln, k) => text(g, ln, 300 * u, y + 76 * u + k * 46 * u, { size: 32 * u, weight: 700, family: THAI, color: C.inkSoft, align: 'left' }));
        g.restore(); });
      kicker('ผู้ต้องสงสัยในบันทึกของตำรวจ', TX, 300 * u, t);
      say('Melville Macnaghten ระบุ 3 ชื่อ', TX, 410 * u, t - 0.2, { size: 50 * u, weight: 800 });
      finish(0.6);
    } },
  // ---------------- popular but weak theories
  { from: bar(53), to: bar(55), cues: [[0.2, 'pop', 0.5], [0.8, 'pop', 0.5], [2.5, 'impact', 0.8]],
    draw(t) {
      paper();
      [['เจ้าชาย Albert Victor', 'หลักฐานชี้ว่าอยู่สกอตแลนด์\nในคืน 30 ก.ย.'], ['จิตรกร Walter Sickert', 'หลักฐานชี้ว่าน่าจะอยู่ฝรั่งเศส\nในช่วงหลายคดี']].forEach(([n, d], i) => {
        const p = spring(t - 0.2 - i * 0.6, 'playful'); if (p <= 0) return;
        g.save(); g.translate(TX, 760 * u + i * 330 * u); g.rotate((i ? 1 : -1) * 0.03); g.scale(p, p);
        g.fillStyle = '#F7F1E3'; g.fillRect(-400 * u, -130 * u, 800 * u, 260 * u);
        text(g, n, 0, -40 * u, { size: 48 * u, weight: 800, family: THAI, color: C.ink });
        d.split('\n').forEach((ln, k) => text(g, ln, 0, 30 * u + k * 46 * u, { size: 34 * u, weight: 700, family: THAI, color: C.inkSoft }));
        g.restore(); });
      stamp('WEAK', TX, 1290 * u, t - 2.5, { size: 90 * u, rot: -0.1 });
      kicker('ทฤษฎียอดนิยม', TX, 300 * u, t);
      say('มีผู้ต้องสงสัยถูกเสนอชื่อกว่า 100 คน', TX, 410 * u, t - 0.2, { size: 48 * u, weight: 800 });
      say('ส่วนใหญ่ไม่มีหลักฐานหนักแน่น', TX, 1450 * u, t - 3.0, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
  // ---------------- 2014 shawl DNA claim
  { from: bar(55), to: bar(58), cues: [[0.2, 'whoosh', 0.5], [1.5, 'riser', 0.4], [5.0, 'pop', 0.6]],
    draw(t) {
      night('#0B0F18');
      shawl(330 * u, 1050 * u, 470 * u, t);
      helix(800 * u, 1050 * u, 560 * u, t, clamp((t - 1.5) / 1.5));
      kicker('ปี 2014', TX, 290 * u, t, { color: N.lamp });
      say('Russell Edwards ซื้อผ้าคลุมไหล่ผืนหนึ่ง\nที่อ้างว่ามาจากที่เกิดเหตุของ Eddowes', TX, 400 * u, t - 0.2, { size: 42 * u, weight: 800, color: C.cream });
      say('ผลตรวจ DNA ที่เขาอ้าง\nชี้ไปที่ Aaron Kosminski', TX, 1430 * u, t - 2.5, { size: 46 * u, weight: 800, color: N.lamp });
      finish(0.8);
    } },
  // ---------------- why scientists dispute it
  { from: bar(58), to: bar(61), cues: [[0.2, 'thump', 0.5], [1.4, 'thump', 0.5], [2.6, 'thump', 0.5], [5.0, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 5.0, 18); g.translate(sx, sy);
      paper();
      [['ไม่มีหลักฐานว่าผ้าผืนนี้\nเคยอยู่ในที่เกิดเหตุจริง', 0.2], ['ผ่านมือคนมากว่า 100 ปี\nเสี่ยงปนเปื้อน', 1.4], ['DNA ไมโทคอนเดรียระบุตัวบุคคลไม่ได้\nคนจำนวนมากมีแบบเดียวกัน', 2.6]].forEach(([s, at], i) => {
        const p = spring(t - at, 'snappy'); if (p <= 0) return;
        g.save(); g.translate((1 - p) * W, 0);
        g.fillStyle = C.paper2; rrect(g, 90 * u, 590 * u + i * 230 * u, W - 220 * u, 190 * u, 12 * u); g.fill();
        s.split('\n').forEach((ln, k) => text(g, ln, TX, 670 * u + i * 230 * u + k * 56 * u, { size: 38 * u, weight: 800, family: THAI, color: C.ink }));
        g.restore(); });
      stamp('DISPUTED', TX, 1370 * u, t - 5.0, { size: 110 * u, rot: -0.08 });
      kicker('ผลวิจัยตีพิมพ์ในวารสารปี 2019', TX, 300 * u, t);
      say('แต่นักวิทยาศาสตร์หลายคนแย้ง', TX, 410 * u, t - 0.2, { size: 54 * u, weight: 800 });
      finish(0.6);
    } },
  // ---------------- still unsolved
  { from: bar(61), to: bar(64), cues: [[0.2, 'whoosh', 0.5], [3.75, 'thump', 0.6]],
    draw(t) {
      const z = track(t, [[0, 1], [0.01, 1.08]], 30, 11);
      g.save(); g.translate(TX, 1260 * u); g.scale(z, z); g.translate(-TX, -1260 * u);
      eastEnd(t, { lamps: [[180, 1.05], [880, 0.75]], fogA: 0.24, lit: 0.12, seed: 3 });
      g.restore();
      band(210 * u, 340 * u);
      say('ไม่มีใครถูกตั้งข้อหา\nไม่มีใครถูกพิจารณาคดี', TX, 300 * u, t - 0.2, { size: 52 * u, weight: 800, color: C.cream });
      band(1380 * u, 200 * u);
      say('จนถึงวันนี้ ตัวตนของฆาตกรยังเป็นปริศนา', TX, 1490 * u, t - 3.75, { size: 42 * u, weight: 800, color: N.lamp });
      finish(0.9);
    } },
  // ---------------- closing title card
  { from: bar(64), to: bar(68), cues: [[0, 'thump', 0.9], [5.0, 'swish', 0.4]],
    draw(t) {
      night('#06070B'); fog(t, { y0: 900 * u, y1: 1700 * u, n: 12, alpha: 0.14, seed: 41 });
      gaslamp(170 * u, 1560 * u, 640 * u, t, { seed: 8 });
      big('1888', TX, 760 * u, t, { size: 300 * u, color: C.cream });
      const p = spring(t - 0.7, 'default');
      g.fillStyle = N.lamp; g.fillRect(TX - 330 * u * p, 840 * u, 660 * u * p, 10 * u);
      say('Jack the Ripper', TX, 990 * u, t - 1.0, { size: 80 * u, weight: 400, family: SERIF, color: N.lamp });
      say('ฆาตกรที่ไม่เคยมีใบหน้า', TX, 1120 * u, t - 2.5, { size: 50 * u, weight: 800, color: C.cream });
      finish();
    } },
  // ---------------- question
  { from: bar(68), to: bar(72), cues: Array.from({ length: 8 }, (_, i) => [i * 0.625, 'thump', 0.3]).concat([[5.0, 'chime', 0.8]]),
    draw(t) {
      eastEnd(t, { lamps: [[180, 1.05], [880, 0.75]], fogA: 0.2 });
      walker(640 * u - t * 8 * u, 1290 * u, 300 * u, { t, walk: 1 });
      band(200 * u, 330 * u, 0.8);
      say('คุณคิดว่าแจ็กเดอะริปเปอร์คือใคร?\nหรือเราจะไม่มีวันรู้?', TX, 300 * u, t - 0.3, { size: 46 * u, weight: 800, color: C.cream });
      say('คอมเมนต์บอกได้เลย', TX, 460 * u, t - 2.5, { size: 46 * u, weight: 800, color: N.lamp });
      finish(0.8);
    } },
];
