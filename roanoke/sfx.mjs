// Synthesize sound effects at cue times.
//
//   node sfx.mjs [out/cues.json] [out/sfx.wav]
//
// cues: [{ "t": 0.5, "type": "click", "gain": 1 }, ...]. render.mjs writes out/cues.json from window.CUES,
// so cues live in index.html next to the animation they belong to.
// Types: click tick pop thump impact whoosh swish riser chime type
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const IN = process.argv[2] || 'out/cues.json', OUT = process.argv[3] || 'out/sfx.wav';
const SR = 48000, cues = JSON.parse(readFileSync(IN, 'utf8'));
let s = 42;
const noise = () => (s = (s * 1664525 + 1013904223) >>> 0) / 2147483648 - 1;
const TAU = 2 * Math.PI;

// [length in seconds, (t, len) => sample]. Risers end ON the cue time (they start len earlier).
const VOICES = {
  click:  [0.05, (t) => Math.sin(TAU * 1800 * t) * Math.exp(-t * 90) * 0.5],
  tick:   [0.03, (t) => Math.sin(TAU * 3200 * t) * Math.exp(-t * 160) * 0.35],
  type:   [0.04, (t) => (noise() * 0.5 + Math.sin(TAU * 2400 * t)) * Math.exp(-t * 120) * 0.25],
  pop:    [0.15, (t) => Math.sin(TAU * (600 + 900 * t) * t) * Math.exp(-t * 30) * 0.4],
  thump:  [0.50, (t) => Math.sin(TAU * (90 - 60 * t) * t) * Math.exp(-t * 9) * 0.9],
  impact: [1.20, (t) => (Math.sin(TAU * (55 - 20 * t) * t) * Math.exp(-t * 4) + noise() * Math.exp(-t * 12) * 0.5) * 0.8],
  whoosh: [0.35, (t) => noise() * Math.sin(Math.PI * Math.min(1, t / 0.35)) * 0.25],
  swish:  [0.18, (t) => noise() * Math.sin(Math.PI * Math.min(1, t / 0.18)) * 0.18],
  riser:  [1.00, (t, len) => noise() * (t / len) ** 2 * 0.3 + Math.sin(TAU * (200 + 600 * (t / len) ** 2) * t) * (t / len) ** 3 * 0.12, true],
  chime:  [1.00, (t) => [1, 2.76, 5.4].reduce((a, h, i) => a + Math.sin(TAU * 880 * h * t) * Math.exp(-t * (3 + i * 4)) / (i + 1), 0) * 0.22],
};

const end = Math.max(...cues.map((c) => c.t), 0) + 2;
const buf = new Float32Array(Math.ceil(end * SR));
for (const c of cues) {
  const v = VOICES[c.type];
  if (!v) { console.warn(`unknown sfx type "${c.type}" at ${c.t}s — skipped`); continue; }
  const [len, fn, endsOnCue] = v, l = c.len || len;
  const start = Math.floor((endsOnCue ? c.t - l : c.t) * SR), g = c.gain ?? 1;
  let lp = 0;
  for (let i = 0; i < l * SR; i++) {
    const j = start + i; if (j < 0 || j >= buf.length) continue;
    let x = fn(i / SR, l) * g;
    if (c.type === 'whoosh' || c.type === 'swish') { lp += 0.25 * (x - lp); x = lp * 1.6; } // soften noise
    buf[j] += x;
  }
}

const n = buf.length, b = Buffer.alloc(44 + n * 2);
b.write('RIFF', 0); b.writeUInt32LE(36 + n * 2, 4); b.write('WAVEfmt ', 8);
b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22);
b.writeUInt32LE(SR, 24); b.writeUInt32LE(SR * 2, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34);
b.write('data', 36); b.writeUInt32LE(n * 2, 40);
for (let i = 0; i < n; i++) b.writeInt16LE(Math.round(Math.tanh(buf[i]) * 32767), 44 + i * 2);
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, b);
console.log(`✓ ${OUT}  ${cues.length} cues`);
