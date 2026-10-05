// Mix music + sfx, normalize loudness, mux with the silent render.
//
//   node finish.mjs                     out/silent.mp4 + audio/music.wav + out/sfx.wav → out/final.mp4
//   node finish.mjs --format 16:9       out/silent_16x9.mp4 → out/final_16x9.mp4
// Options: --video --music --sfx --out --lufs -14 --music-gain -3 --sfx-gain 0 (dB) --loop (no end fade, for loops)
import { existsSync } from 'node:fs';
import { ff, duration } from './lib/ffmpeg.mjs';

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf('--' + k); return i >= 0 && argv[i + 1] !== undefined ? argv[i + 1] : d; };
const suffix = opt('format') ? '_' + opt('format').replace(':', 'x') : '';
const video = opt('video', `out/silent${suffix}.mp4`), out = opt('out', `out/final${suffix}.mp4`);
const music = opt('music', 'audio/music.wav'), sfx = opt('sfx', 'out/sfx.wav');
const lufs = opt('lufs', '-14');
if (!existsSync(video)) { console.error(`missing ${video} — run node render.mjs first`); process.exit(1); }

const inputs = ['-i', video], chains = [];
let n = 1;
for (const [file, gain] of [[music, opt('music-gain', '-3')], [sfx, opt('sfx-gain', '0')]]) {
  if (!existsSync(file)) { console.log(`· no ${file}, skipped`); continue; }
  inputs.push('-i', file);
  chains.push(`[${n}:a]aresample=48000,aformat=channel_layouts=stereo,volume=${gain}dB[a${n}]`);
  n++;
}
if (n === 1) {
  await ff([...inputs, '-c', 'copy', out]);
  console.log(`✓ ${out} (no audio)`);
  process.exit(0);
}
const labels = chains.map((_, i) => `[a${i + 1}]`).join('');
// Trim/pad audio to the exact video length. (apad + -shortest inside filter_complex never terminates.)
const dur = duration(video).toFixed(3);
const graph = `${chains.join(';')};${labels}amix=inputs=${n - 1}:normalize=0:duration=longest,loudnorm=I=${lufs}:TP=-1.0:LRA=11,` +
  `aresample=48000,apad=whole_dur=${dur},atrim=0:${dur}` +
  (argv.includes('--loop') ? '' : `,afade=t=out:st=${Math.max(0, dur - 0.3).toFixed(3)}:d=0.3`) + '[aout]';
await ff([...inputs, '-filter_complex', graph, '-map', '0:v', '-map', '[aout]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-t', dur, '-movflags', '+faststart', out]);
console.log(`✓ ${out}  (${n - 1} audio stem(s), ${lufs} LUFS)`);
