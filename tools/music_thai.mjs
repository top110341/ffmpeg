// Thai-flavoured score for the Thai documentary films: ranat (xylophone), khim (hammered dulcimer),
// khlui (flute), ching/chap cymbals, thon drum, a low drone and a gong. Pentatonic, same beat grid
// and CLI as music.mjs, so the scene timings (96 BPM, bar = 2.5 s) stay identical.
//
//   node ../tools/music_thai.mjs --bpm 96 --bars 8 --mood bright --key D --seed 3 [--intro 2] [--loop] --out audio/parts/p1.wav
//
// Moods: bright (major pentatonic, flute) · chill (major pentatonic, sparse, khim) ·
//        dark (minor pentatonic, slow ranat, gong) · tense (minor pentatonic, fast ranat tremolo, busy drum)
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf('--' + k); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : d; };
const BPM = +opt('bpm', 96), BARS = +opt('bars', 8), MOOD = opt('mood', 'bright'), INTRO = +opt('intro', 1);
const LOOP = argv.includes('--loop'), OUT = opt('out', 'audio/music.wav'), SEED = +opt('seed', 3);
const KEYS = { C: 48, 'C#': 49, Db: 49, D: 50, 'D#': 51, Eb: 51, E: 52, F: 53, 'F#': 54, Gb: 54, G: 55, 'G#': 56, Ab: 56, A: 57, 'A#': 58, Bb: 58, B: 59 };
const ROOT = KEYS[opt('key', 'D')] - 12;

const SR = 48000, BEAT = 60 / BPM, BAR = BEAT * 4, DUR = BARS * BAR;
const TAIL = LOOP ? 0 : 3;
const N = Math.ceil((DUR + TAIL) * SR);
const L = new Float32Array(N), R = new Float32Array(N);

const minor = MOOD === 'dark' || MOOD === 'tense';
const SCALE = minor ? [0, 3, 5, 7, 10] : [0, 2, 4, 7, 9];
// drone roots per bar (all inside the scale, so nothing clashes)
const ROOTS = { bright: [0, 7, 9, 2], chill: [0, 9, 2, 7], dark: [0, 5, 3, 10], tense: [0, 0, 10, 7] }[MOOD] || [0, 7, 9, 2];

const hz = (m) => 440 * 2 ** ((m - 69) / 12);
let s = SEED * 9301 + 49297;
const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
const noise = () => rnd() * 2 - 1;
const TAU = 2 * Math.PI;

function add(t0, len, fn, gain = 1, pan = 0) {
  const a = Math.floor(t0 * SR), gl = gain * Math.min(1, 1 - pan), gr = gain * Math.min(1, 1 + pan);
  for (let i = 0; i < len * SR && a + i < N; i++) { if (a + i < 0) continue; const v = fn(i / SR); L[a + i] += v * gl; R[a + i] += v * gr; }
}
const env = (t, a, d) => Math.min(1, t / a) * Math.exp(-t / d);

// ---- instruments
// ranat ek: hardwood bars, strongly inharmonic partials, quick decay, mallet click
const ranat = (f, dec = 0.32) => (t) => (Math.sin(TAU * f * t) + 0.32 * Math.sin(TAU * f * 3.93 * t) * Math.exp(-t * 18) + 0.12 * Math.sin(TAU * f * 9.4 * t) * Math.exp(-t * 40))
  * env(t, 0.0015, dec) + (t < 0.003 ? noise() * 0.25 * (1 - t / 0.003) : 0);
// khim: two slightly detuned struck strings, harmonic, longer ring
const khim = (f) => (t) => { let v = 0; for (let k = 1; k <= 6; k++) v += (Math.sin(TAU * f * k * t) + Math.sin(TAU * f * 1.0025 * k * t)) * Math.exp(-t * (1.4 + k * 0.9)) / k; return v * 0.35 * Math.min(1, t / 0.002); };
// khlui: breathy flute with delayed vibrato
const khlui = (f, len) => (t) => { const vib = 1 + 0.005 * Math.sin(TAU * 5.4 * t) * Math.min(1, t / 0.35); const ph = TAU * f * vib * t;
  return (Math.sin(ph) + 0.18 * Math.sin(2 * ph) + 0.05 * Math.sin(3 * ph) + noise() * 0.04) * Math.min(1, t / 0.09) * Math.min(1, (len - t) / 0.12); };
// ching (open, ringing) and chap (damped): small bronze cymbals
const CH = [2350, 3120, 4410, 5630, 6870];
const cymbal = (d) => (t) => { let v = 0; for (const [i, f] of CH.entries()) v += Math.sin(TAU * f * t + i) / (i + 1); return (v * 0.5 + noise() * 0.25 * Math.exp(-t * 60)) * Math.exp(-t / d); };
// thon: goblet drum — low tone with pitch drop, and a slap
const thon = (t) => Math.sin(TAU * (68 * t + 40 * (1 - Math.exp(-t * 25)) / 25)) * Math.exp(-t * 8);
let hp = 0, pv = 0;
const slap = (t) => { const n = noise(); hp = n - pv; pv = n; return (hp * 0.6 + Math.sin(TAU * 230 * t) * 0.5) * Math.exp(-t * 35); };
// khong (gong): low, beating, long
const gong = (f) => (t) => (Math.sin(TAU * f * t) + 0.6 * Math.sin(TAU * f * 1.006 * t) + 0.4 * Math.sin(TAU * f * 2.76 * t) * Math.exp(-t * 1.5) + 0.2 * Math.sin(TAU * f * 5.4 * t) * Math.exp(-t * 4))
  * Math.min(1, t / 0.01) * Math.exp(-t / 2.2) * 0.5;

// pick a scale note near a target midi
const scaleNotes = []; for (let o = -2; o < 5; o++) for (const d of SCALE) scaleNotes.push(ROOT + o * 12 + d);
const nearest = (m) => scaleNotes.reduce((a, b) => (Math.abs(b - m) < Math.abs(a - m) ? b : a));
const idx = (m) => scaleNotes.indexOf(nearest(m));

const endBar = LOOP ? -1 : BARS - 1;
let mel = idx(ROOT + 36 + ROOTS[0]);            // ranat melody pointer (index into scaleNotes)
const density = { bright: 8, chill: 4, dark: 4, tense: 16 }[MOOD] || 8;

for (let bar = 0; bar < BARS; bar++) {
  const off = ROOTS[bar % ROOTS.length], t0 = bar * BAR, last = bar === endBar;
  // drone: root + fifth, soft bowed tone (sloh-like), swelling per bar
  if (!last) for (const [j, iv] of [0, 7].entries()) {
    const f = hz(ROOT + 12 + off + iv); let y = 0;
    add(t0, BAR + 0.4, (t) => { let x = 0; for (let k = 1; k <= 5; k++) x += Math.sin(TAU * f * k * t + k) / k; y += 0.05 * (x - y);
      return y * Math.min(1, t / 0.5) * Math.min(1, (BAR + 0.4 - t) / 0.4) * 0.075; }, 1, j ? 0.3 : -0.3);
  }
  // ranat melody: pentatonic random walk, played in octaves; intro bars play a soft roll instead
  if (!last) {
    const n = bar < INTRO ? 8 : density;
    for (let q = 0; q < n; q++) {
      const at = t0 + q * BAR / n;
      if (MOOD === 'chill' && q % 4 === 3 && rnd() < 0.5) continue;
      const step = MOOD === 'tense' ? (q % 2 ? 0 : rnd() < 0.5 ? -1 : 1) : Math.round((rnd() - 0.5) * 3);
      mel = Math.max(idx(ROOT + 31), Math.min(idx(ROOT + 50), mel + step));
      if (q === 0) mel = idx(scaleNotes[mel] + ((ROOT + 36 + off) - scaleNotes[mel]) * 0.5); // lean to the bar's root
      const f = hz(scaleNotes[mel]), g = (bar < INTRO ? 0.05 + 0.05 * (q / n) : 0.14) * (q % (n / 4) === 0 ? 1.15 : 0.9);
      add(at, 0.6, ranat(f, MOOD === 'dark' ? 0.5 : 0.3), g, 0.25);
      add(at, 0.6, ranat(f * 2, 0.22), g * 0.45, -0.25);
    }
  }
  // khim: arpeggiated pentatonic chords on the off-beats (bright / chill)
  if (!last && bar >= INTRO && (MOOD === 'bright' || MOOD === 'chill'))
    for (let b = 0; b < 4; b++) for (let k = 0; k < 2; k++) {
      const m = nearest(ROOT + 24 + off + [0, 4, 7, 12][(b + k * 2) % 4]);
      add(t0 + (b + 0.5) * BEAT + k * 0.03, 1.4, khim(hz(m)), 0.06, k ? 0.45 : -0.45);
    }
  // khlui: long phrase every other bar (bright / dark)
  if (!last && bar >= INTRO && bar % 2 === 0 && (MOOD === 'bright' || MOOD === 'dark')) {
    const notes = [0, 1, 2].map(() => scaleNotes[Math.max(0, Math.min(scaleNotes.length - 1, idx(ROOT + 48 + off) + Math.round((rnd() - 0.4) * 4)))]);
    const lens = [BEAT * 2, BEAT, BEAT * 4.5];
    let tt = t0;
    notes.forEach((m, i) => { add(tt, lens[i], khlui(hz(m), lens[i]), 0.07, -0.1); tt += lens[i]; });
  }
  // ching / chap: the time-keeper. chap on beat 2? — classic: ching (open) on the weak beat, chap (damped) on the strong beat
  if (bar >= INTRO && !last) for (let b = 0; b < 4; b++) {
    const tb = t0 + b * BEAT;
    if (b % 2 === 1) add(tb, 1.2, cymbal(0.45), 0.09, 0.35);
    else add(tb, 0.15, cymbal(0.035), 0.08, 0.35);
    if (MOOD === 'tense') add(tb + BEAT / 2, 0.15, cymbal(0.03), 0.05, 0.35);
  }
  // thon drum
  if (bar >= INTRO && !last) {
    const pat = { bright: [[0, 't'], [1.5, 's'], [2, 't'], [3, 's']], chill: [[0, 't'], [2.5, 's']],
      dark: [[0, 't'], [2, 't']], tense: [[0, 't'], [0.75, 's'], [1.5, 's'], [2, 't'], [2.5, 't'], [3, 's'], [3.5, 's']] }[MOOD];
    for (const [b, k] of pat) add(t0 + b * BEAT, 0.5, k === 't' ? thon : slap, k === 't' ? 0.36 : 0.18, -0.15);
  }
  // gong on phrase starts (dark / tense), and a soft one to open the piece
  if ((bar === 0 && !LOOP) || ((MOOD === 'dark' || MOOD === 'tense') && bar % 4 === 0 && bar >= INTRO && !last)) add(t0, 5, gong(hz(ROOT + 12)), 0.15);
  // ending: gong + final ranat note + open ching
  if (last) {
    add(t0, BAR + TAIL, gong(hz(ROOT + 12)), 0.4);
    add(t0, 1.2, ranat(hz(ROOT + 36), 0.9), 0.16);
    add(t0, 1.5, cymbal(0.9), 0.1, 0.35);
  }
}

// space: dotted-eighth ping-pong delay + a short room
const D = Math.floor(BEAT * 0.75 * SR);
for (let i = D; i < N; i++) { L[i] += R[i - D] * 0.18; R[i] += L[i - D] * 0.18; }
for (const [dt, g] of [[0.029, 0.25], [0.041, 0.2], [0.053, 0.16]]) { const d = Math.floor(dt * SR); for (let i = N - 1; i >= d; i--) { L[i] += L[i - d] * g * 0.5; R[i] += R[i - d] * g * 0.5; } }
let peak = 0;
for (let i = 0; i < N; i++) { L[i] = Math.tanh(L[i] * 1.1); R[i] = Math.tanh(R[i] * 1.1); peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i])); }
const g = 0.89 / (peak || 1);
if (LOOP) for (let i = 0; i < 480 && i < N; i++) { const f = i / 480; L[i] *= f; R[i] *= f; L[N - 1 - i] *= f; R[N - 1 - i] *= f; }

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
writeFileSync('beats.json', JSON.stringify({ bpm: BPM, beats, downbeats: beats.filter((_, i) => i % 4 === 0), bars: BARS, dur: +DUR.toFixed(4), source: 'synth-thai' }, null, 1));
console.log(`✓ ${OUT}  thai/${MOOD} · ${BPM} BPM · ${BARS} bars · ${DUR.toFixed(2)}s${LOOP ? ' · loop' : ` + ${TAIL}s tail`}`);
