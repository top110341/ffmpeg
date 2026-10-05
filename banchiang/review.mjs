// Review sheets for the critique loop. Open the PNGs it writes and LOOK at them.
//
//   node review.mjs                          out/final.mp4 → out/review/{contact,phone,poster}.png + loop_check.mp4
//   node review.mjs --in out/draft.mp4 --at 4.2      + strip.png: 12 consecutive frames from 4.2 s
//   node review.mjs --poster 3.1                     poster frame time (default: 40% in)
//   node review.mjs --extract refs/launch.mp4 --every 0.5   reference frames → refs/frames/ + refs/frames/sheet.png
import { mkdirSync } from 'node:fs';
import { basename } from 'node:path';
import { ff, duration } from './lib/ffmpeg.mjs';

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf('--' + k); return i >= 0 && argv[i + 1] !== undefined ? argv[i + 1] : d; };

if (opt('extract')) {
  const src = opt('extract'), every = +opt('every', 0.5), dir = opt('dir', 'refs/frames');
  mkdirSync(dir, { recursive: true });
  await ff(['-i', src, '-vf', `fps=1/${every},scale=540:-2`, `${dir}/f_%04d.png`]);
  const n = Math.ceil(duration(src) / every), rows = Math.ceil(n / 8);
  await ff(['-i', src, '-vf', `fps=1/${every},scale=240:-2,tile=8x${rows}:padding=4:color=0x222222`, '-frames:v', '1', `${dir}/sheet.png`]);
  console.log(`✓ ${n} frames of ${basename(src)} → ${dir}/ (frame k is at ${every}·(k−1) s) · sheet → ${dir}/sheet.png`);
  process.exit(0);
}

const src = opt('in', 'out/final.mp4'), dir = opt('dir', 'out/review');
mkdirSync(dir, { recursive: true });
const dur = duration(src);
const cRows = Math.ceil((dur * 2) / 6), pRows = Math.ceil(dur / 5);

await ff(['-i', src, '-vf', `fps=2,scale=270:-2,tile=6x${cRows}:padding=4:color=0x222222`, '-frames:v', '1', `${dir}/contact.png`]);
await ff(['-i', src, '-vf', `fps=1,scale=360:-2,tile=5x${pRows}:padding=4:color=0x222222`, '-frames:v', '1', `${dir}/phone.png`]);
await ff(['-ss', String(+opt('poster', dur * 0.4)), '-i', src, '-frames:v', '1', `${dir}/poster.png`]);
await ff(['-stream_loop', '1', '-i', src, '-c', 'copy', `${dir}/loop_check.mp4`]);
let msg = `✓ ${dir}/contact.png (cell k = ${'0.5'}·k s, 6 per row) · phone.png (360 px wide, 1 per s) · poster.png · loop_check.mp4`;
if (opt('at')) {
  await ff(['-ss', String(Math.max(0, +opt('at') - 0.1)), '-i', src, '-vf', 'scale=320:-2,tile=12x1:padding=2', '-frames:v', '1', `${dir}/strip.png`]);
  msg += ` · strip.png (12 frames from ${opt('at')} s)`;
}
console.log(msg + `  ·  ${dur.toFixed(2)} s`);
