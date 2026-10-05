// Chicago Tylenol murders (1982) — Act 2: 0:47.5–3:00 (bars 19–72).
// The link, the panic, the recall, the new packaging and law, the suspects, the case today.
import { g, u, W, H, TX, C, SERIF, THAI, BEAT, bar, spring, track, clamp, remap, hash, noise,
  night, paper, finish, say, big, kicker, stamp, flip, person, pin, path, rrect, text, typewriter, topScrim, shake, measure } from './kit.js';
import { N, bottle, capsule, shelf, candle, chiMap, TOWN, approxNote, band } from './a1.js';
const SANS = 'Inter, sans-serif';

// ---------------------------------------------------------------- props
// Front page of an invented daily (no real masthead).
function newspaper(x, y, w, rot, headline, o = {}) {
  const { masthead = 'THE LAKESHORE LEDGER', sub = 'CHICAGO · OCTOBER 1982', seed = 1 } = o;
  const h = w * 1.35, hl = headline.split('\n');
  g.save(); g.translate(x, y); g.rotate(rot);
  g.fillStyle = 'rgba(0,0,0,0.4)'; g.fillRect(-w / 2 + 12 * u, -h / 2 + 16 * u, w, h);
  g.fillStyle = '#E4DED0'; g.fillRect(-w / 2, -h / 2, w, h);
  text(g, masthead, 0, -h / 2 + w * 0.1, { size: w * 0.07, weight: 400, family: SERIF, color: C.ink });
  g.fillStyle = C.ink; g.fillRect(-w * 0.44, -h / 2 + w * 0.13, w * 0.88, w * 0.006); g.fillRect(-w * 0.44, -h / 2 + w * 0.175, w * 0.88, w * 0.003);
  text(g, sub, 0, -h / 2 + w * 0.162, { size: w * 0.024, weight: 700, family: SANS, color: C.inkSoft, tracking: 2 * u });
  hl.forEach((ln, i) => text(g, ln, 0, -h / 2 + w * (0.31 + i * 0.12), { size: w * 0.11, weight: 800, family: SANS, color: C.ink }));
  const top = -h / 2 + w * (0.3 + hl.length * 0.12);
  // photo block with a generic bottle
  g.fillStyle = '#B9B2A2'; g.fillRect(-w * 0.44, top, w * 0.5, w * 0.42);
  bottle(-w * 0.19, top + w * 0.39, w * 0.32, {});
  g.fillStyle = 'rgba(22,19,15,0.42)';
  for (let c = 0; c < 3; c++) for (let r = 0; r < 40; r++) {
    const ly = top + r * w * 0.035; if (ly > h / 2 - w * 0.06) break;
    if (c < 2 && r < 13) continue;
    g.fillRect(-w * 0.44 + c * w * 0.3 + (c === 2 ? -w * 0.02 : 0), ly, w * 0.27 * (r % 7 === 6 ? 0.55 : 0.85 + 0.15 * hash(r * 3 + c, seed)), w * 0.011);
  }
  g.restore();
}
// Hand-written letter on paper: only illegible ink lines — no invented wording.
function letter(x, y, w, rot, t, o = {}) {
  const { ink = '#1E2A4A', lines = 10, seed = 2, h = w * 1.3, at = 0.3 } = o;
  g.save(); g.translate(x, y); g.rotate(rot);
  g.fillStyle = 'rgba(0,0,0,0.45)'; g.fillRect(-w / 2 + 14 * u, -h / 2 + 18 * u, w, h);
  g.fillStyle = '#F1EEE6'; g.fillRect(-w / 2, -h / 2, w, h);
  g.strokeStyle = 'rgba(80,120,170,0.25)'; g.lineWidth = 2 * u;
  for (let i = 0; i < 16; i++) { const ly = -h / 2 + w * 0.2 + i * w * 0.075; g.beginPath(); g.moveTo(-w / 2, ly); g.lineTo(w / 2, ly); g.stroke(); }
  const p = clamp((t - at) / 2.2);
  g.strokeStyle = ink; g.lineWidth = w * 0.008; g.lineCap = 'round'; g.lineJoin = 'round'; g.globalAlpha = 0.85;
  for (let i = 0; i < lines; i++) {
    const q = clamp(p * lines - i); if (q <= 0) break;
    const ly = -h / 2 + w * 0.19 + i * w * 0.075, lw = w * 0.8 * (i === lines - 1 ? 0.45 : 0.86 + 0.14 * hash(i, seed));
    g.beginPath();
    for (let k = 0, n = 46; k <= n * q; k++) {
      const px = -w * 0.4 + lw * k / n, py = ly + Math.sin(k * 1.9 + i * 3) * w * 0.012 + (hash(k + i * 50, seed) - 0.5) * w * 0.014;
      k ? g.lineTo(px, py) : g.moveTo(px, py);
    }
    g.stroke();
  }
  g.restore();
}
// Police cruiser side view, nose right; loudspeaker waves pulse with t.
function cruiser(x, y, s, t, o = {}) {
  const { waves = 1 } = o;
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = '#05070A';
  g.beginPath(); g.moveTo(-1, -0.12); g.lineTo(-0.98, -0.34); g.lineTo(-0.5, -0.38); g.lineTo(-0.32, -0.62); g.lineTo(0.28, -0.62); g.lineTo(0.46, -0.38);
  g.lineTo(0.98, -0.32); g.lineTo(1.0, -0.12); g.closePath(); g.fill();
  g.fillStyle = '#E9E5DC'; g.fillRect(-0.92, -0.33, 1.84, 0.05);
  g.fillStyle = 'rgba(214,236,240,0.35)'; g.beginPath(); g.moveTo(-0.28, -0.58); g.lineTo(-0.02, -0.58); g.lineTo(-0.02, -0.4); g.lineTo(-0.42, -0.4); g.closePath(); g.fill();
  g.beginPath(); g.moveTo(0.04, -0.58); g.lineTo(0.25, -0.58); g.lineTo(0.38, -0.4); g.lineTo(0.04, -0.4); g.closePath(); g.fill();
  for (const wx of [-0.62, 0.62]) { g.fillStyle = '#020304'; g.beginPath(); g.arc(wx, -0.1, 0.16, 0, 7); g.fill(); g.fillStyle = '#3A3F46'; g.beginPath(); g.arc(wx, -0.1, 0.07, 0, 7); g.fill(); }
  // light bar
  const ph = Math.floor(t / 0.3125) % 2;
  g.fillStyle = ph ? '#E23A2A' : '#5A1A14'; g.fillRect(-0.2, -0.7, 0.18, 0.08);
  g.fillStyle = ph ? '#203060' : '#3C66E0'; g.fillRect(0.02, -0.7, 0.18, 0.08);
  const gl = g.createRadialGradient(ph ? -0.11 : 0.11, -0.66, 0, ph ? -0.11 : 0.11, -0.66, 0.9);
  gl.addColorStop(0, ph ? 'rgba(226,58,42,0.35)' : 'rgba(60,102,224,0.35)'); gl.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gl; g.fillRect(-1, -1.6, 2, 1.8);
  // loudspeaker horn
  g.fillStyle = '#C9CED6'; g.beginPath(); g.moveTo(0.3, -0.68); g.lineTo(0.48, -0.76); g.lineTo(0.48, -0.6); g.closePath(); g.fill();
  g.strokeStyle = 'rgba(239,230,210,0.8)'; g.lineWidth = 0.02;
  for (let k = 0; k < 4; k++) { const q = ((t * 1.6 + k / 4) % 1); g.globalAlpha = (1 - q) * waves;
    g.beginPath(); g.arc(0.48, -0.68, 0.1 + q * 0.7, -0.6, 0.6); g.stroke(); }
  g.restore();
}
function factory(x, y, s, color = C.cream) {
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color;
  g.fillRect(-0.5, -0.4, 1, 0.4);
  g.beginPath(); g.moveTo(-0.5, -0.4); for (let i = 0; i < 3; i++) { g.lineTo(-0.5 + i / 3, -0.65); g.lineTo(-0.5 + (i + 1) / 3, -0.4); } g.fill();
  g.fillRect(0.3, -0.95, 0.12, 0.6);
  g.fillStyle = N.bg; for (let i = 0; i < 4; i++) g.fillRect(-0.42 + i * 0.22, -0.28, 0.12, 0.12);
  g.restore();
}
function store(x, y, s, color = C.cream, accent = C.red) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = color; g.fillRect(-0.5, -0.6, 1, 0.6);
  g.fillStyle = accent; for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(-0.55 + i * 0.22, -0.62); g.lineTo(-0.33 + i * 0.22, -0.62); g.lineTo(-0.33 + i * 0.22, -0.48); g.arc(-0.44 + i * 0.22, -0.48, 0.11, 0, Math.PI); g.fill(); }
  g.fillStyle = N.bg; g.fillRect(-0.12, -0.3, 0.24, 0.3); g.fillRect(-0.42, -0.34, 0.22, 0.18); g.fillRect(0.2, -0.34, 0.22, 0.18);
  g.restore();
}
// Gloved hand silhouette holding something at (x, y), arm coming from the right.
function hand(x, y, s, color = '#040507') {
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color;
  g.beginPath(); g.moveTo(0.1, -0.25); g.quadraticCurveTo(0.45, -0.32, 1.6, -0.2); g.lineTo(1.6, 0.25); g.quadraticCurveTo(0.45, 0.32, 0.1, 0.25); g.closePath(); g.fill();
  for (let i = 0; i < 4; i++) { rrect(g, -0.32, -0.26 + i * 0.13, 0.5, 0.11, 0.055); g.fill(); }
  rrect(g, -0.05, -0.42, 0.35, 0.12, 0.06); g.fill();
  g.restore();
}
function helix(x, y, h, t, color = C.red) {
  g.save(); g.lineWidth = 6 * u; g.lineCap = 'round';
  for (let i = 0; i <= 26; i++) {
    const yy = y - h / 2 + (i / 26) * h, a = i * 0.48 + t * 1.6, x1 = x + Math.sin(a) * 110 * u, x2 = x - Math.sin(a) * 110 * u;
    g.strokeStyle = `rgba(239,230,210,${0.25 + 0.25 * Math.cos(a)})`; g.beginPath(); g.moveTo(x1, yy); g.lineTo(x2, yy); g.stroke();
    g.fillStyle = Math.cos(a) > 0 ? color : C.fog; g.beginPath(); g.arc(x1, yy, 10 * u, 0, 7); g.fill();
    g.fillStyle = Math.cos(a) > 0 ? C.fog : color; g.beginPath(); g.arc(x2, yy, 10 * u, 0, 7); g.fill();
  }
  g.restore();
}
const fmt = (n) => Math.round(n).toLocaleString('en-US');

export default () => [
  // ---------------- the link
  { from: bar(19), to: bar(22), cues: [[0.2, 'whoosh', 0.5], [2.4, 'pop', 0.6], [5.0, 'impact', 0.8]],
    draw(t) {
      night(N.bg);
      g.fillStyle = '#16120F'; g.fillRect(0, 1260 * u, W, 50 * u);
      const xs = [190, 400, 610, 820];
      xs.forEach((x, i) => { const s = clamp(spring(t - 0.3 - i * 0.25, 'snappy')); if (s <= 0) return; bottle(x * u, 1260 * u, 260 * u * s, { mark: t > 5 ? clamp((t - 5 - i * 0.12) / 0.2) : 0 }); });
      // magnifier sweeping across
      const mx = track(t, [[0, 120], [2.4, 820]], 'heavy') * u, my = 1060 * u;
      g.save(); g.strokeStyle = C.cream; g.lineWidth = 14 * u; g.beginPath(); g.arc(mx, my, 110 * u, 0, 7); g.stroke();
      g.beginPath(); g.moveTo(mx + 78 * u, my + 78 * u); g.lineTo(mx + 170 * u, my + 170 * u); g.lineWidth = 26 * u; g.stroke();
      g.fillStyle = 'rgba(214,236,240,0.1)'; g.beginPath(); g.arc(mx, my, 104 * u, 0, 7); g.fill(); g.restore();
      kicker('จุดเชื่อมโยง', TX, 280 * u, t, { color: C.red });
      say('เจ้าหน้าที่ดับเพลิงในชานเมือง\nสังเกตเห็นสิ่งที่ผู้ตายมีเหมือนกัน', TX, 390 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      say('ทุกรายกินแคปซูล\nExtra-Strength Tylenol', TX, 1400 * u, t - 5.0, { size: 48 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  // ---------------- what was inside
  { from: bar(22), to: bar(24), cues: [[0.1, 'thump', 0.6], [0.9, 'click', 0.7], [2.5, 'impact', 0.9]],
    draw(t) {
      const [sx, sy] = shake(t, 2.5, 16); g.translate(sx, sy);
      paper();
      capsule(TX, 860 * u, 520 * u, 0.1, clamp(spring(t - 0.9, 'heavy')) * 0.95, { seed: 8 });
      kicker('ผลชันสูตร', TX, 300 * u, t);
      say('ในแคปซูลมีสารพิษ', TX, 420 * u, t - 0.2, { size: 56 * u, weight: 800 });
      stamp('POTASSIUM CYANIDE', TX, 1250 * u, t - 2.5, { size: 64 * u, rot: -0.06 });
      say('โพแทสเซียมไซยาไนด์ · ออกฤทธิ์ภายในไม่กี่นาที', TX, 1430 * u, t - 3.0, { size: 40 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------- headlines
  { from: bar(24), to: bar(26), cues: [[0.1, 'whoosh', 0.6], [0.5, 'thump', 0.7], [2.6, 'swish', 0.4]],
    draw(t) {
      night(N.bg);
      const s = spring(t - 0.1, 'heavy'), r = track(t, [[0, -1.2], [0.1, -0.05]], 'heavy');
      g.save(); g.translate(TX, 980 * u); g.scale(0.4 + 0.6 * s, 0.4 + 0.6 * s); newspaper(0, 0, 680 * u, r, 'CYANIDE IN\nPAIN CAPSULES'); g.restore();
      band(210, 270, 0.82);
      say('ความหวาดกลัวแพร่ไปทั่วประเทศ', TX, 320 * u, t - 0.3, { size: 52 * u, weight: 800, color: C.cream });
      say('หนังสือพิมพ์ในภาพเป็นฉบับจำลอง', TX, 420 * u, t - 0.9, { size: 30 * u, weight: 700, color: C.fog });
      band(1450, 150, t > 2.4 ? 0.82 : 0);
      say('ใครจะรู้ว่าขวดไหนมีพิษ?', TX, 1540 * u, t - 2.6, { size: 46 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  // ---------------- loudspeakers in the streets
  { from: bar(26), to: bar(28), cues: [[0.1, 'riser', 0.4], [2.5, 'thump', 0.6]],
    draw(t) {
      night('#06080C');
      // houses
      for (let i = 0; i < 6; i++) { const x = -40 * u + i * 200 * u, h = (260 + hash(i, 4) * 120) * u;
        g.fillStyle = '#0E1218'; g.fillRect(x, 1250 * u - h, 180 * u, h);
        g.beginPath(); g.moveTo(x - 14 * u, 1250 * u - h); g.lineTo(x + 90 * u, 1250 * u - h - 90 * u); g.lineTo(x + 194 * u, 1250 * u - h); g.fill();
        g.fillStyle = hash(i, 5) > 0.4 ? `rgba(${N.glow},0.5)` : '#080A0E'; g.fillRect(x + 60 * u, 1250 * u - h + 70 * u, 50 * u, 60 * u); }
      g.fillStyle = '#0A0C10'; g.fillRect(0, 1250 * u, W, H);
      cruiser(track(t, [[0, -200], [0.1, 470]], 'heavy') * u + t * 12 * u, 1360 * u, 340 * u, t);
      band(220, 300, 0.8);
      say('ตำรวจขับรถติดลำโพง\nประกาศเตือนตามถนน', TX, 320 * u, t - 0.2, { size: 52 * u, weight: 800, color: C.cream });
      band(1430, 160, t > 2.3 ? 0.8 : 0);
      say('“อย่ากินยาไทลินอล”', TX, 1530 * u, t - 2.5, { size: 54 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  // ---------------- two plants → many stores
  { from: bar(28), to: bar(31), cues: [[0.2, 'pop', 0.6], [0.6, 'pop', 0.6], [2.5, 'whoosh', 0.5], [5.0, 'impact', 1.0]],
    draw(t) {
      night(N.bg);
      const A = [[260, 820], [760, 820]], S = [[150, 1300], [330, 1300], [510, 1300], [690, 1300], [870, 1300]];
      A.forEach(([x, y], i) => { const s = clamp(spring(t - 0.2 - i * 0.4, 'snappy')); if (s > 0) factory(x * u, y * u, 220 * u * s); });
      text(g, 'Pennsylvania', 260 * u, 880 * u, { size: 32 * u, weight: 700, family: SANS, color: C.fog, alpha: clamp(t - 0.6) });
      text(g, 'Texas', 760 * u, 880 * u, { size: 32 * u, weight: 700, family: SANS, color: C.fog, alpha: clamp(t - 1.0) });
      S.forEach(([x, y], i) => {
        const src = A[i % 2], p = remap(t, 2.5 + i * 0.15, 3.6 + i * 0.15);
        path([[src[0] * u, 920 * u], [src[0] * u, 1040 * u], [x * u, 1120 * u], [x * u, 1180 * u]], p, { color: 'rgba(239,230,210,0.35)', width: 4 * u, dash: [10 * u, 10 * u] });
        if (p >= 1) store(x * u, y * u, 140 * u);
        if (t > 5.0) { g.save(); g.globalAlpha = clamp((t - 5 - i * 0.1) / 0.2); g.fillStyle = C.red; g.beginPath(); g.arc(x * u, 1360 * u, 14 * u, 0, 7); g.fill(); g.restore(); }
      });
      kicker('ยามาจากไหน', TX, 280 * u, t, { color: C.red });
      say('ขวดที่มีพิษผลิตจากโรงงาน 2 แห่ง\nคนละรัฐ', TX, 390 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      say('แต่พิษไปโผล่ในร้านหลายแห่ง\nในเขตชิคาโกเท่านั้น', TX, 1450 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  // ---------------- tampered on the shelf
  { from: bar(31), to: bar(34), cues: [[0.2, 'swish', 0.5], [2.5, 'click', 0.8], [5.0, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 5.0, 16); g.translate(sx, sy);
      shelf(t, { rows: [900, 1300], n: 4, bs: 280, dim: 0.5, mark: t > 2.6 ? [0, 2] : null, markA: clamp((t - 2.6) / 0.3) });
      // the hand slides the bottle back into its gap
      if (t < 2.7) { const hx = track(t, [[0, 1200], [0.2, 640]], 'heavy') * u, hy = track(t, [[0, 700], [0.2, 900]], 'heavy') * u;
        g.fillStyle = N.bg2; g.fillRect(560 * u, 640 * u, 160 * u, 258 * u);
        bottle(hx, hy, 280 * u, { dim: 0.2 }); hand(hx + 70 * u, hy - 120 * u, 120 * u); }
      else { const ho = track(t, [[2.7, 0], [2.71, 700]], 'default') * u; hand(710 * u + ho, 780 * u, 120 * u); }
      band(210, 300, 0.82);
      kicker('ข้อสรุปของผู้สืบสวน', TX, 280 * u, t, { color: C.red });
      say('คนร้ายน่าจะซื้อยาไปใส่พิษ\nแล้วแอบนำกลับมาวางคืนบนชั้น', TX, 390 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      stamp('NOT THE FACTORY', TX, 1470 * u, t - 5.0, { size: 70 * u, rot: -0.08 });
      finish(0.8);
    } },
  // ---------------- the recall
  { from: bar(34), to: bar(37), cues: Array.from({ length: 10 }, (_, i) => [0.3 + i * 0.25, 'tick', 0.4]).concat([[3.2, 'impact', 0.9], [5.0, 'thump', 0.6]]),
    draw(t) {
      night(N.bg);
      // bottles streaming off the shelf into recall crates
      for (let i = 0; i < 24; i++) { const ph = ((t * 0.55 + hash(i, 3)) % 1), x = (80 + hash(i, 4) * 820) * u, y = (700 + ph * 760) * u;
        g.save(); g.globalAlpha = 0.55 * Math.sin(ph * Math.PI); bottle(x, y, (90 + hash(i, 5) * 50) * u, { rot: (hash(i, 6) - 0.5) * 1.2 + ph, label: false }); g.restore(); }
      const n = 31e6 * clamp(spring(t - 0.3, 14, 7.5) * 1.0);
      band(590, 300, 0.8);
      text(g, fmt(Math.min(n, 31e6)), TX, 790 * u, { size: 150 * u, weight: 400, family: SERIF, color: C.cream });
      say('ขวด', TX, 870 * u, t - 0.8, { size: 46 * u, weight: 800, color: C.cream });
      band(210, 240, 0.8);
      kicker('ต้นเดือนตุลาคม 1982', TX, 280 * u, t, { color: C.red });
      say('Johnson & Johnson เรียกคืนยาทั่วประเทศ', TX, 390 * u, t - 0.2, { size: 44 * u, weight: 800, color: C.cream });
      band(1360, 220, t > 3 ? 0.82 : 0);
      say('ราว 31 ล้านขวด', TX, 1450 * u, t - 3.2, { size: 56 * u, weight: 800, color: C.red });
      say('มูลค่าราว 100 ล้านดอลลาร์', TX, 1540 * u, t - 5.0, { size: 42 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- crisis management case study
  { from: bar(37), to: bar(40), cues: [[0.2, 'pop', 0.5], [1.5, 'pop', 0.5], [2.8, 'pop', 0.5], [5.0, 'impact', 0.9]],
    draw(t) {
      paper();
      kicker('บทเรียนธุรกิจ', TX, 300 * u, t);
      say('บริษัทยอมเจ็บ เพื่อความปลอดภัยของผู้บริโภค', TX, 420 * u, t - 0.2, { size: 44 * u, weight: 800 });
      [['เก็บยาออกจากชั้นวางทั่วประเทศ', 0.2], ['หยุดโฆษณาไทลินอล', 1.5], ['เตือนประชาชนอย่างเปิดเผย', 2.8]].forEach(([s, at], i) => {
        const p = spring(t - at, 'snappy'); if (p <= 0) return;
        g.save(); g.translate((1 - p) * W, 0);
        g.fillStyle = C.paper2; rrect(g, 90 * u, 560 * u + i * 170 * u, W - 220 * u, 130 * u, 12 * u); g.fill();
        g.fillStyle = C.red; g.beginPath(); g.arc(160 * u, 625 * u + i * 170 * u, 18 * u, 0, 7); g.fill();
        text(g, s, TX + 30 * u, 640 * u + i * 170 * u, { size: 40 * u, weight: 800, family: THAI, color: C.ink }); g.restore(); });
      stamp('CASE STUDY', TX, 1180 * u, t - 5.0, { size: 100 * u, rot: -0.08 });
      say('ถูกยกเป็นกรณีศึกษาการจัดการวิกฤต\nที่โด่งดังที่สุดกรณีหนึ่ง', TX, 1400 * u, t - 5.4, { size: 42 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------- copycats
  { from: bar(40), to: bar(42), cues: Array.from({ length: 8 }, (_, i) => [0.2 + i * 0.2, 'tick', 0.35]).concat([[2.6, 'thump', 0.6]]),
    draw(t) {
      night(N.bg);
      const n = Math.round(270 * clamp(spring(t - 0.2, 30, 11)));
      for (let i = 0; i < n; i++) { const c = i % 18, r = Math.floor(i / 18); g.fillStyle = i % 37 === 5 ? C.red : 'rgba(239,230,210,0.55)';
        g.beginPath(); g.arc(150 * u + c * 42 * u, 640 * u + r * 42 * u, 12 * u, 0, 7); g.fill(); }
      band(210, 270, 0.8);
      kicker('ผู้เลียนแบบ', TX, 280 * u, t, { color: C.red });
      say('ในเดือนต่อมา FDA บันทึกเหตุสงสัย\nว่ามีการปลอมปนสินค้า', TX, 380 * u, t - 0.2, { size: 42 * u, weight: 800, color: C.cream });
      band(1320, 260, 0.8);
      text(g, `${n}+`, TX, 1440 * u, { size: 130 * u, weight: 400, family: SERIF, color: C.red });
      say('ครั้ง', TX, 1530 * u, t - 2.6, { size: 44 * u, weight: 800, color: C.cream });
      finish(0.8);
    } },
  // ---------------- the triple seal
  { from: bar(42), to: bar(45), cues: [[0.2, 'swish', 0.5], [1.4, 'click', 0.8], [3.2, 'pop', 0.6], [5.0, 'pop', 0.6]],
    draw(t) {
      paper();
      const cap = track(t, [[0, 0], [0.2, 1], [2.4, 0]], 'default'), foil = clamp((t - 1.4) / 0.2), bandA = clamp((t - 3.2) / 0.3), box = clamp(spring(t - 5.0, 'default'));
      const bx = TX - 230 * u, by = 1250 * u, bs = 460 * u;
      if (t > 1.4 && t < 1.8) { g.save(); g.globalAlpha = 1 - (t - 1.4) / 0.4; g.fillStyle = '#FFFFFF'; g.beginPath(); g.arc(bx, by - bs * 0.86, 120 * u, 0, 7); g.fill(); g.restore(); }
      bottle(bx, by, bs, { cap, foil, band: bandA });
      // the box closing around it
      if (box > 0) { g.save(); g.strokeStyle = C.red; g.lineWidth = 6 * u; g.setLineDash([16 * u, 10 * u]);
        rrect(g, bx - bs * 0.42, by - bs * (1.08 * box) - 10 * u, bs * 0.84, bs * 1.08 * box + 20 * u, 10 * u); g.stroke(); g.restore(); }
      const items = [['1', 'ซีลฟอยล์ปิดปากขวด', 1.4], ['2', 'ซีลพลาสติกรัดรอบฝา', 3.2], ['3', 'กล่องปิดผนึกด้วยกาว', 5.0]];
      items.forEach(([n, s, at], i) => { const p = clamp(spring(t - at, 'snappy')); if (p <= 0) return;
        g.save(); g.globalAlpha = clamp(p); const y = (860 + i * 170) * u, x = 560 * u;
        g.fillStyle = C.red; g.beginPath(); g.arc(x, y - 14 * u, 30 * u * p, 0, 7); g.fill();
        text(g, n, x, y, { size: 36 * u, weight: 800, family: SANS, color: C.paper });
        text(g, s, x + 50 * u, y, { size: 32 * u, weight: 800, family: THAI, color: C.ink, align: 'left' }); g.restore(); });
      kicker('พฤศจิกายน 1982', TX, 300 * u, t);
      say('ไทลินอลกลับสู่ชั้นวาง\nพร้อมบรรจุภัณฑ์ซีล 3 ชั้น', TX, 410 * u, t - 0.2, { size: 50 * u, weight: 800 });
      finish(0.6);
    } },
  // ---------------- the law
  { from: bar(45), to: bar(47), cues: [[0.1, 'thump', 0.6], [0.4, 'type', 0.5], [2.6, 'impact', 1.0]],
    draw(t) {
      const [sx, sy] = shake(t, 2.6, 18); g.translate(sx, sy);
      paper();
      const fy = track(t, [[0, 300 * u], [0.01, 0]], 'default');
      g.save(); g.translate(0, fy);
      g.fillStyle = '#F6F1E4'; rrect(g, 120 * u, 560 * u, W - 280 * u, 760 * u, 10 * u); g.fill();
      g.strokeStyle = C.inkSoft; g.lineWidth = 2 * u; g.strokeRect(150 * u, 590 * u, W - 340 * u, 700 * u);
      typewriter('FEDERAL ANTI-TAMPERING ACT', TX, 690 * u, t - 0.4, { size: 40 * u, weight: 400, family: SERIF, color: C.ink, align: 'center', cps: 30 });
      text(g, 'U.S. CONGRESS · 1983', TX, 750 * u, { size: 26 * u, weight: 700, family: SANS, color: C.inkSoft, tracking: 3 * u, alpha: clamp(t - 1.2) });
      g.fillStyle = 'rgba(22,19,15,0.3)'; for (let i = 0; i < 9; i++) g.fillRect(200 * u, (820 + i * 44) * u, (W - 440) * u * (i === 8 ? 0.5 : 0.9 + 0.1 * hash(i, 4)), 10 * u);
      g.restore();
      kicker('ตุลาคม 1983', TX, 300 * u, t);
      say('สหรัฐฯ ออกกฎหมายที่สื่อเรียกว่า “Tylenol bill”', TX, 420 * u, t - 0.2, { size: 40 * u, weight: 800 });
      stamp('FEDERAL CRIME', TX, 1150 * u, t - 2.6, { size: 80 * u, rot: -0.1 });
      say('การปลอมปนสินค้าอุปโภคบริโภค\nกลายเป็นความผิดอาญาระดับรัฐบาลกลาง', TX, 1420 * u, t - 3.0, { size: 40 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------- capsule → caplet
  { from: bar(47), to: bar(50), cues: [[0.2, 'thump', 0.5], [2.6, 'whoosh', 0.6], [3.0, 'pop', 0.7]],
    draw(t) {
      paper();
      const m = clamp(spring(t - 2.6, 'default'));
      g.save(); g.globalAlpha = 1 - m; capsule(TX, 880 * u, 460 * u, -0.2, 0); g.restore();
      g.save(); g.globalAlpha = m; capsule(TX, 880 * u, 460 * u * (0.8 + 0.2 * m), -0.2, 0, { shape: 'caplet' }); g.restore();
      text(g, m < 0.5 ? 'CAPSULE' : 'CAPLET', TX, 1080 * u, { size: 34 * u, weight: 700, family: SANS, color: C.inkSoft, tracking: 4 * u });
      kicker('1986', TX, 300 * u, t);
      say('เกิดเหตุยาแคปซูลถูกใส่ไซยาไนด์ซ้ำในนิวยอร์ก', TX, 420 * u, t - 0.2, { size: 40 * u, weight: 800 });
      say('บริษัทเลิกขายแบบแคปซูล\nเปลี่ยนเป็น “แคปเล็ต” ยาเม็ดเคลือบ', TX, 1240 * u, t - 3.0, { size: 46 * u, weight: 800, color: C.red });
      say('ที่แกะออกมาใส่สิ่งแปลกปลอมได้ยากกว่า', TX, 1440 * u, t - 4.5, { size: 40 * u, weight: 800, color: C.inkSoft });
      finish(0.6);
    } },
  // ---------------- the extortion letter
  { from: bar(50), to: bar(53), cues: [[0.2, 'swish', 0.5], [0.6, 'type', 0.4], [3.0, 'impact', 0.9]],
    draw(t) {
      night(N.bg);
      const ly = track(t, [[0, 1700], [0.1, 1000]], 'heavy') * u;
      letter(TX, ly, 560 * u, -0.05, t);
      band(210, 300, 0.82);
      kicker('ตุลาคม 1982', TX, 280 * u, t, { color: C.red });
      say('Johnson & Johnson ได้รับจดหมาย\nเรียกเงินเพื่อ “หยุดการฆ่า”', TX, 380 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      band(1330, 260, t > 2.8 ? 0.85 : 0);
      big('$1,000,000', TX, 1470 * u, t - 3.0, { size: 130 * u, color: C.red });
      finish(0.8);
    } },
  // ---------------- James W. Lewis
  { from: bar(53), to: bar(56), cues: [[0.2, 'thump', 0.6], [2.6, 'impact', 1.0], [5.2, 'thump', 0.6]],
    draw(t) {
      const [sx, sy] = shake(t, 2.6, 18); g.translate(sx, sy);
      night(N.bg);
      const gr = g.createRadialGradient(TX, 900 * u, 0, TX, 900 * u, 560 * u); gr.addColorStop(0, 'rgba(214,236,240,0.12)'); gr.addColorStop(1, 'rgba(214,236,240,0)');
      g.fillStyle = gr; g.fillRect(0, 300 * u, W, 1200 * u);
      // height chart behind a silhouette (never a likeness)
      g.strokeStyle = 'rgba(239,230,210,0.15)'; g.lineWidth = 2 * u; for (let i = 0; i < 8; i++) { g.beginPath(); g.moveTo(180 * u, (620 + i * 70) * u); g.lineTo(880 * u, (620 + i * 70) * u); g.stroke(); }
      person(TX, 1180 * u, 260 * u, '#020305');
      kicker('ผู้ต้องสงสัยหลัก', TX, 280 * u, t, { color: C.red });
      big('James W. Lewis', TX, 440 * u, t - 0.2, { size: 100 * u, color: C.cream });
      stamp('EXTORTION', TX, 1240 * u, t - 2.6, { size: 90 * u, rot: -0.1 });
      say('ถูกตัดสินว่าผิดฐานกรรโชกทรัพย์ จำคุก 10 ปี', TX, 1420 * u, t - 3.0, { size: 40 * u, weight: 800, color: C.cream });
      say('แต่ไม่เคยถูกตั้งข้อหาฆาตกรรม · เขาปฏิเสธมาตลอด', TX, 1510 * u, t - 5.2, { size: 38 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  // ---------------- Roger Arnold
  { from: bar(56), to: bar(58), cues: [[0.2, 'thump', 0.5], [2.5, 'impact', 0.8]],
    draw(t) {
      night(N.bg);
      person(TX, 1180 * u, 220 * u, '#020305');
      kicker('อีกหนึ่งคนที่ถูกสอบสวน', TX, 280 * u, t, { color: C.red });
      big('Roger Arnold', TX, 440 * u, t - 0.2, { size: 100 * u, color: C.cream });
      say('ไม่พบหลักฐานเชื่อมโยงกับคดีวางยา', TX, 560 * u, t - 0.8, { size: 42 * u, weight: 800, color: C.cream });
      stamp('CLEARED', TX, 1280 * u, t - 2.5, { size: 100 * u, rot: -0.1, color: '#7FA88A' });
      finish(0.8);
    } },
  // ---------------- the years after
  { from: bar(58), to: bar(61), cues: [[0.2, 'tick', 0.5], [1.6, 'tick', 0.5], [3.4, 'tick', 0.5], [5.2, 'chime', 0.5]],
    draw(t) {
      night(N.bg);
      const ev = [['2009', 'FBI ค้นบ้านของ Lewis', 0.2], ['2022', 'เจ้าหน้าที่สอบปากคำเขาอีกครั้ง', 1.6], ['2023', 'Lewis เสียชีวิต อายุ 76 ปี', 3.4]];
      const p = clamp(spring(t - 0.1, 'heavy'));
      g.fillStyle = 'rgba(239,230,210,0.3)'; g.fillRect(200 * u, 640 * u, 4 * u, 720 * u * p);
      ev.forEach(([y, s, at], i) => { const q = clamp(spring(t - at, 'snappy')); if (q <= 0) return; const yy = (700 + i * 280) * u;
        g.fillStyle = i === 2 ? C.red : C.cream; g.beginPath(); g.arc(202 * u, yy, 18 * u * q, 0, 7); g.fill();
        text(g, y, 260 * u, yy + 30 * u, { size: 90 * u, weight: 400, family: SERIF, color: i === 2 ? C.red : C.cream, align: 'left', alpha: q });
        text(g, s, 260 * u, yy + 100 * u, { size: 38 * u, weight: 800, family: THAI, color: C.cream, align: 'left', alpha: q }); });
      kicker('หลายสิบปีต่อมา', TX, 280 * u, t, { color: C.red });
      say('คดียังไม่จบ', TX, 390 * u, t - 0.2, { size: 56 * u, weight: 800, color: C.cream });
      say('จนวันสุดท้าย เขาไม่เคยถูกตั้งข้อหาฆาตกรรม', TX, 1520 * u, t - 5.2, { size: 38 * u, weight: 800, color: C.fog });
      finish(0.8);
    } },
  // ---------------- today: DNA, the documentary, the case is open
  { from: bar(61), to: bar(64), cues: [[0.2, 'riser', 0.4], [2.6, 'pop', 0.6], [5.0, 'thump', 0.6]],
    draw(t) {
      night(N.bg);
      // evidence bag with a generic bottle, DNA helix beside it
      g.save(); g.translate(330 * u, 1000 * u); g.rotate(-0.06);
      g.fillStyle = 'rgba(214,236,240,0.12)'; rrect(g, -170 * u, -260 * u, 340 * u, 480 * u, 14 * u); g.fill();
      g.strokeStyle = 'rgba(214,236,240,0.5)'; g.lineWidth = 3 * u; g.stroke();
      g.fillStyle = C.red; g.fillRect(-170 * u, -260 * u, 340 * u, 22 * u);
      bottle(0, 170 * u, 300 * u, { dim: 0.25 });
      g.fillStyle = C.cream; g.fillRect(-120 * u, 150 * u, 240 * u, 50 * u);
      text(g, 'EVIDENCE', 0, 186 * u, { size: 28 * u, weight: 800, family: SANS, color: C.ink, tracking: 3 * u });
      g.restore();
      helix(730 * u, 1000 * u, 520 * u, t);
      band(210, 300, 0.82);
      kicker('ทุกวันนี้', TX, 280 * u, t, { color: C.red });
      say('ตำรวจส่งหลักฐานเก่า\nไปตรวจดีเอ็นเอด้วยเทคโนโลยีใหม่', TX, 380 * u, t - 0.2, { size: 46 * u, weight: 800, color: C.cream });
      band(1300, 290, t > 2.4 ? 0.85 : 0);
      say('ปี 2025 Netflix ปล่อยสารคดี\n“Cold Case: The Tylenol Murders”', TX, 1380 * u, t - 2.6, { size: 40 * u, weight: 800, color: C.cream });
      say('ตำรวจยืนยันว่า คดียังเปิดอยู่', TX, 1540 * u, t - 5.0, { size: 44 * u, weight: 800, color: C.red });
      finish(0.8);
    } },
  // ---------------- closing card: in memory
  { from: bar(64), to: bar(68), cues: [[0, 'thump', 0.9], [1.2, 'chime', 0.5], [7.0, 'swish', 0.4]],
    draw(t) {
      night('#06070A');
      big('1982', TX, 420 * u, t, { size: 200 * u, color: C.cream });
      const p = spring(t - 0.6, 'default');
      g.fillStyle = C.red; g.fillRect(TX - 300 * u * p, 470 * u, 600 * u * p, 8 * u);
      say('คดีฆาตกรรมไทลินอล', TX, 580 * u, t - 0.8, { size: 56 * u, weight: 800, color: C.red });
      say('ด้วยความระลึกถึง', TX, 700 * u, t - 1.2, { size: 38 * u, weight: 700, color: C.fog });
      const names = ['Mary Kellerman · 12', 'Adam Janus · 27', 'Stanley Janus · 25', 'Theresa Janus · 19', 'Mary Reiner · 27', 'Mary McFarland · 31', 'Paula Prince · 35'];
      names.forEach((nm, i) => say(nm, TX, (790 + i * 64) * u, t - 1.4 - i * 0.25, { size: 40 * u, weight: 400, family: SERIF, color: C.cream }));
      for (let i = 0; i < 7; i++) candle((180 + i * 115) * u, 1500 * u, 90 * u, t, i + 11, clamp((t - 1.4 - i * 0.25) / 0.4));
      finish();
    } },
  // ---------------- question to the viewer
  { from: bar(68), to: bar(72), cues: [[0.2, 'swish', 0.5], [1.0, 'click', 0.7], [5.0, 'chime', 0.8]],
    draw(t) {
      paper();
      // the bottle opened: cap lifts, the foil seal under it peels away
      const cap = clamp(spring(t - 0.4, 'default')) * 0.35, peel = clamp(spring(t - 1.2, 'heavy'));
      const bs = 560 * u, by = 1300 * u, ny = by - bs * 0.88;
      bottle(TX, by, bs, { cap, foil: 1 - clamp(peel * 3) });
      if (peel > 0) { g.save(); g.translate(TX + peel * 300 * u, ny - peel * 60 * u); g.rotate(0.5 * peel);
        g.fillStyle = '#D9DEE5'; g.beginPath(); g.ellipse(0, 0, bs * 0.18, bs * 0.18 * (0.25 + 0.75 * peel), 0, 0, 7); g.fill();
        g.strokeStyle = 'rgba(0,0,0,0.18)'; g.lineWidth = 2 * u; g.stroke();
        g.fillStyle = '#C3C9D2'; g.fillRect(bs * 0.16, -bs * 0.02, bs * 0.08, bs * 0.04);
        g.fillStyle = 'rgba(255,255,255,0.7)'; g.beginPath(); g.ellipse(-bs * 0.05, -bs * 0.03 * peel, bs * 0.06, bs * 0.015, 0, 0, 7); g.fill(); g.restore(); }
      say('ครั้งหน้าที่คุณแกะซีลฟอยล์ใต้ฝาขวดยา', TX, 330 * u, t - 0.3, { size: 44 * u, weight: 800, color: C.ink });
      say('มันมีอยู่เพราะคดีนี้', TX, 430 * u, t - 1.2, { size: 50 * u, weight: 800, color: C.red });
      say('คุณคิดว่าใครคือคนร้าย?', TX, 1450 * u, t - 2.6, { size: 52 * u, weight: 800, color: C.ink });
      say('คอมเมนต์บอกได้เลย', TX, 1550 * u, t - 3.6, { size: 46 * u, weight: 800, color: C.red });
      finish(0.6);
    } },
];
