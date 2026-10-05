// Synthesize an original score in code, on the same beat grid as the picture.
//
//   node music.mjs --bpm 120 --bars 8 --mood bright --out audio/music.wav
//
// Writes the WAV and beats.json ({bpm, beats, downbeats, bars, dur}); index.html reads beats.json.
// Moods: bright (I–V–vi–IV) · dark (i–VI–III–VII) · tense (i–i–VI–V) · chill (Imaj7–vi7–ii7–V7)
// --key A (root) · --intro 1 (bars before drums) · --loop (no ending, seamless) · --seed 3
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf('--' + k); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : d; };
const BPM = +opt('bpm', 120), BARS = +opt('bars', 8), MOOD = opt('mood', 'bright'), INTRO = +opt('intro', 1);
const LOOP = argv.includes('--loop'), OUT = opt('out', 'audio/music.wav'), SEED = +opt('seed', 3);
const KEYS = { C: 48, 'C#': 49, Db: 49, D: 50, 'D#': 51, Eb: 51, E: 52, F: 53, 'F#': 54, Gb: 54, G: 55, 'G#': 56, Ab: 56, A: 57, 'A#': 58, Bb: 58, B: 59 };
const ROOT = KEYS[opt('key', MOOD === 'bright' || MOOD === 'chill' ? 'C' : 'A')] - 12;

const SR = 48000, BEAT = 60 / BPM, BAR = BEAT * 4, DUR = BARS * BAR;
const TAIL = LOOP ? 0 : 2;
const N = Math.ceil((DUR + TAIL) * SR);
const L = new Float32Array(N), R = new Float32Array(N);

// chords: [root offset, chord tones relative to that root]
const MAJ = [0, 4, 7], MIN = [0, 3, 7], M7 = [0, 4, 7, 11], m7 = [0, 3, 7, 10], D7 = [0, 4, 7, 10];
const PROG = {
  bright: [[0, MAJ], [7, MAJ], [9, MIN], [5, MAJ]],
  dark: [[0, MIN], [8, MAJ], [3, MAJ], [10, MAJ]],
  tense: [[0, MIN], [0, MIN], [8, MAJ], [7, MAJ]],
  chill: [[0, M7], [9, m7], [2, m7], [7, D7]],
}[MOOD] || [[0, MAJ], [7, MAJ], [9, MIN], [5, MAJ]];

const hz = (m) => 440 * 2 ** ((m - 69) / 12);
let s = SEED * 9301 + 49297;
const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
const noise = () => rnd() * 2 - 1;

function add(t0, len, fn, gain = 1, pan = 0) {
  const a = Math.floor(t0 * SR), gl = gain * Math.min(1, 1 - pan), gr = gain * Math.min(1, 1 + pan);
  for (let i = 0; i < len * SR && a + i < N; i++) { const v = fn(i / SR); L[a + i] += v * gl; R[a + i] += v * gr; }
}
// band-limited-ish saw from a few harmonics
const saw = (f, t, h = 6) => { let v = 0; for (let k = 1; k <= h; k++) v += Math.sin(2 * Math.PI * f * k * t) / k; return v * 0.6; };
const env = (t, a, d) => Math.min(1, t / a) * Math.exp(-t / d);

const kick = (t) => Math.sin(2 * Math.PI * (45 * t + 100 * (1 - Math.exp(-t * 30)) / 30)) * Math.exp(-t * 7) + (t < 0.004 ? noise() * 0.4 : 0);
let hp = 0, prev = 0;
const hat = (t) => { const n = noise(); hp = n - prev; prev = n; return hp * Math.exp(-t * 60) * 0.5; };
const clap = (t) => noise() * (Math.exp(-t * 25) + 0.6 * Math.exp(-((t - 0.012) ** 2) * 4e5)) * 0.6 + Math.sin(2 * Math.PI * 190 * t) * Math.exp(-t * 30) * 0.3;

const endBar = LOOP ? -1 : BARS - 1;
const kickTimes = [];

for (let bar = 0; bar < BARS; bar++) {
  const [off, tones] = PROG[bar % PROG.length];
  const t0 = bar * BAR, last = bar === endBar;
  // pad: three detuned voices per chord tone, slow attack, low-passed
  if (!last) for (const [j, iv] of tones.entries()) {
    const f = hz(ROOT + 24 + off + iv);
    let y = 0;
    add(t0, BAR + 0.3, (t) => {
      const x = saw(f * 0.997, t, 4) + saw(f * 1.003, t + 0.01, 4) + saw(f, t, 4);
      y += 0.06 * (x - y);
      return y * Math.min(1, t / 0.25) * Math.min(1, (BAR + 0.3 - t) / 0.3) * 0.045;
    }, 1, (j % 2 ? 0.35 : -0.35));
  }
  // bass: eighth notes on the root
  if (bar >= INTRO && !last) for (let e = 0; e < 8; e++) {
    const f = hz(ROOT + 12 + off + (e === 7 && MOOD !== 'chill' ? 12 : 0));
    let y = 0;
    add(t0 + e * BEAT / 2, BEAT / 2, (t) => { const x = saw(f, t, 5); y += 0.15 * (x - y); return y * env(t, 0.004, 0.18) * 0.32; });
  }
  // arp: sixteenths through chord tones, an octave up, plucky
  if (!last) for (let q = 0; q < 16; q++) {
    if (MOOD === 'chill' && q % 2) continue;
    const pattern = [0, 1, 2, 1, 0, 2, 1, 2];
    const iv = tones[pattern[q % 8] % tones.length] + (q >= 8 && bar % 2 ? 12 : 0);
    const f = hz(ROOT + 36 + off + iv);
    add(t0 + q * BEAT / 4, 0.35, (t) => (Math.sin(2 * Math.PI * f * t) + 0.3 * Math.sin(4 * Math.PI * f * t)) * env(t, 0.002, 0.08) * 0.07, 1, q % 2 ? 0.4 : -0.4);
  }
  // drums
  if (bar >= INTRO && !last) for (let b = 0; b < 4; b++) {
    const tb = t0 + b * BEAT;
    if (MOOD !== 'chill' || b % 2 === 0) { add(tb, 0.5, kick, 0.9); kickTimes.push(tb); }
    if (b % 2 === 1) add(tb, 0.3, clap, 0.5);
    add(tb + BEAT / 2, 0.08, hat, 0.35, 0.2);
    if (MOOD === 'tense' || MOOD === 'bright') add(tb + BEAT / 4 * 3, 0.05, hat, 0.18, -0.2);
  }
  // riser into the drop
  if (bar === INTRO - 1 && INTRO > 0) {
    let y = 0;
    add(t0, BAR, (t) => { const p = t / BAR; y += (0.02 + p * 0.5) * (noise() - y); return y * p * p * 0.35; });
  }
  // ending: final chord stab + impact on the last downbeat
  if (last) {
    add(t0, 0.9, kick, 1.1); kickTimes.push(t0);
    for (const iv of tones) {
      const f = hz(ROOT + 24 + off + iv); let y = 0;
      add(t0, BAR + TAIL, (t) => { const x = saw(f, t, 6); y += 0.08 * (x - y); return y * env(t, 0.005, 0.9) * 0.09; });
    }
    add(t0, 1.5, (t) => noise() * Math.exp(-t * 4) * 0.15);
  }
}

// sidechain: duck everything but the kick under each kick (approximation: duck bus after the fact)
const duck = new Float32Array(N).fill(1);
for (const kt of kickTimes) { const a = Math.floor(kt * SR); for (let i = 0; i < 0.22 * SR && a + i < N; i++) duck[a + i] = Math.min(duck[a + i], 0.55 + 0.45 * (i / (0.22 * SR))); }
// simple stereo delay (dotted eighth) for space
const D = Math.floor(BEAT * 0.75 * SR);
for (let i = D; i < N; i++) { L[i] += R[i - D] * 0.22; R[i] += L[i - D] * 0.22; }
let peak = 0;
for (let i = 0; i < N; i++) { L[i] = Math.tanh(L[i] * duck[i] * 1.2); R[i] = Math.tanh(R[i] * duck[i] * 1.2); peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i])); }
const g = 0.89 / (peak || 1);
if (LOOP) for (let i = 0; i < 480 && i < N; i++) { const f = i / 480; L[i] *= f; R[i] *= f; L[N - 1 - i] *= f; R[N - 1 - i] *= f; }

// 16-bit stereo WAV
const b = Buffer.alloc(44 + N * 4);
b.write('RIFF', 0); b.writeUInt32LE(36 + N * 4, 4); b.write('WAVEfmt ', 8);
b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(2, 22);
b.writeUInt32LE(SR, 24); b.writeUInt32LE(SR * 4, 28); b.writeUInt16LE(4, 32); b.writeUInt16LE(16, 34);
b.write('data', 36); b.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) {
  b.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * g)) * 32767), 44 + i * 4);
  b.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * g)) * 32767), 46 + i * 4);
}
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, b);

const beats = Array.from({ length: BARS * 4 }, (_, i) => +(i * BEAT).toFixed(4));
writeFileSync('beats.json', JSON.stringify({ bpm: BPM, beats, downbeats: beats.filter((_, i) => i % 4 === 0), bars: BARS, dur: +DUR.toFixed(4), source: 'synth' }, null, 1));
console.log(`✓ ${OUT}  ${MOOD} · ${BPM} BPM · ${BARS} bars · ${DUR.toFixed(2)}s${LOOP ? ' · loop' : ` + ${TAIL}s tail`}  ·  beats.json written`);
