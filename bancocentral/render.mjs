// Render a seek(t) page to video, stills or a determinism report.
//
//   node render.mjs                         full render → out/silent.mp4 (1080x1920, 60 fps, 2 subframes)
//   node render.mjs --format 16:9           → out/silent_16x9.mp4 (also 1:1, 4:5, 9:16)
//   node render.mjs --draft                 animatic: half size, 30 fps, no motion blur → out/draft.mp4
//   node render.mjs --from 4 --to 7         render only those seconds → out/seg_4-7.mp4
//   node render.mjs --stills auto           one still per beat (or every 0.5 s) + out/stills/sheet.png
//   node render.mjs --stills 0,1.5,4.2      stills at those times
//   node render.mjs --check                 determinism + loop-seam + banned-API report
//
// Options: --w --h --fps --sub --shutter 0.5 --dur --out --page index.html --capture canvas|screenshot --sub 4 (flagship)
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, readFileSync, readdirSync, rmSync, existsSync } from 'node:fs';
import { startServer } from './lib/server.mjs';
import { ffmpegPath, ff } from './lib/ffmpeg.mjs';

const argv = process.argv.slice(2);
const has = (k) => argv.includes('--' + k);
const opt = (k, d) => { const i = argv.indexOf('--' + k); return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : d; };
const num = (k, d) => (opt(k) !== undefined ? Number(opt(k)) : d);

const FORMATS = { '9:16': [1080, 1920], '1:1': [1080, 1080], '4:5': [1080, 1350], '16:9': [1920, 1080] };
const format = opt('format');
if (format && !FORMATS[format]) throw new Error(`--format must be one of ${Object.keys(FORMATS).join(', ')}`);
const draft = has('draft');
let [W, H] = format ? FORMATS[format] : [num('w', 1080), num('h', 1920)];
if (draft) { W = Math.round(W / 2 / 2) * 2; H = Math.round(H / 2 / 2) * 2; }
const FPS = num('fps', draft ? 30 : 60);
const SUB = Math.max(1, num('sub', draft ? 1 : 2));
// Shutter as a fraction of the frame interval the subframes span: 0.5 = 180° (film look). Wider shutters
// spread the few subframes so far apart that fast moves show as stacked ghost copies instead of blur.
const SHUTTER = clamp01(num('shutter', 0.5));
function clamp01(x) { return Math.min(1, Math.max(0, x)); }
const PAGE = opt('page', 'index.html');
const CAPTURE = opt('capture', 'canvas');
mkdirSync('out', { recursive: true });

// ---------------------------------------------------------------- page
const { server, url } = await startServer();
let browser;
for (const o of [{ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' }, {}, { channel: 'chrome' }, { channel: 'msedge' }]) {
  try { browser = await chromium.launch(o); break; } catch {}
}
if (!browser) { console.error('No browser. Run: npx playwright install chromium'); process.exit(1); }
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
await page.goto(`${url}/${PAGE}?w=${W}&h=${H}&render=1`);
try {
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
} catch {
  console.error('Page never set window.__ready = true.\n' + errors.join('\n'));
  process.exit(1);
}
if (errors.length) { console.error('Page errors:\n' + errors.join('\n')); process.exit(1); }

const meta = await page.evaluate(() => ({ dur: window.DUR, beats: window.BEATS || null, loop: !!window.LOOP, cues: window.CUES || null }));
const DUR = num('dur', meta.dur);
if (!DUR) throw new Error('Set window.DUR in the page or pass --dur');
if (meta.cues) writeFileSync('out/cues.json', JSON.stringify(meta.cues, null, 1)); // sfx.mjs reads this

async function frame(t, label) {
  if (CAPTURE === 'screenshot') {
    await page.evaluate((t) => window.seek(t), t);
    return page.screenshot({ type: 'png' });
  }
  const data = await page.evaluate(([t, fmt, label]) => {
    window.seek(t);
    const c = document.querySelector('canvas');
    if (label) { // timestamp burn-in for review sheets only
      const g = c.getContext('2d'), s = Math.max(14, c.height / 60);
      g.save(); g.font = `600 ${s}px monospace`; g.fillStyle = 'rgba(0,0,0,.7)';
      g.fillRect(0, c.height - s * 1.6, s * 6.2, s * 1.6); g.fillStyle = '#ff0'; g.fillText(label, s * 0.3, c.height - s * 0.45); g.restore();
    }
    return c.toDataURL(fmt, 0.92);
  }, [t, draft ? 'image/jpeg' : 'image/png', label || null]);
  return Buffer.from(data.slice(data.indexOf(',') + 1), 'base64');
}

const done = async (code = 0) => { await browser.close(); server.close(); process.exit(code); };

// ---------------------------------------------------------------- --check
if (has('check')) {
  let bad = 0;
  const times = [0, 0.37, DUR * 0.31, DUR * 0.5, DUR * 0.77, Math.max(0, DUR - 1 / FPS)];
  for (const t of times) {
    const a = (await frame(t)).toString('base64');
    for (const other of [DUR - t, t * 0.5 + 0.11, DUR * 0.9]) await frame(Math.min(other, DUR));
    const b = (await frame(t)).toString('base64');
    if (a !== b) { bad++; console.log(`✗ non-deterministic at t=${t.toFixed(3)}s (state carried between frames or unseeded randomness)`); }
  }
  if (!bad) console.log(`✓ deterministic at ${times.length} sampled times`);

  const seam = await page.evaluate((dur) => {
    const c = document.querySelector('canvas'), g = c.getContext('2d');
    window.seek(0); const a = g.getImageData(0, 0, c.width, c.height).data;
    window.seek(dur); const b = g.getImageData(0, 0, c.width, c.height).data;
    let s = 0; for (let i = 0; i < a.length; i += 4) s += Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2]);
    return s / (a.length / 4) / 3;
  }, DUR);
  console.log(`${meta.loop ? (seam < 2 ? '✓' : '✗') : '·'} loop seam: mean |frame(0) − frame(DUR)| = ${seam.toFixed(2)} / 255${meta.loop ? '' : '  (window.LOOP not set, info only)'}`);
  if (meta.loop && seam >= 2) bad++;

  const src = [PAGE, ...(existsSync('lib') ? readdirSync('lib').filter((f) => f.endsWith('.js')).map((f) => 'lib/' + f) : []),
    ...(existsSync('scenes') ? readdirSync('scenes').map((f) => 'scenes/' + f) : [])];
  const banned = [[/Math\.random\s*\(/, 'Math.random — use rng()/hash()'], [/setTimeout|setInterval/, 'timers'],
    [/Date\.now\s*\(/, 'Date.now'], [/transition\s*:/, 'CSS transition'], [/will-change/, 'will-change (blurs scaled text)']];
  for (const f of src) {
    const lines = readFileSync(f, 'utf8').split('\n');
    lines.forEach((l, i) => banned.forEach(([re, why]) => {
      if (re.test(l) && !/render-ok/.test(l)) { bad++; console.log(`✗ ${f}:${i + 1} ${why}`); }
    }));
  }
  console.log(`size ${W}x${H} · dur ${DUR}s · ${meta.beats ? meta.beats.length + ' beats' : 'no BEATS'} · ${meta.cues ? meta.cues.length + ' cues → out/cues.json' : 'no CUES'}`);
  console.log(bad ? `\n${bad} problem(s)` : '\nall checks passed');
  await done(bad ? 1 : 0);
}

// ---------------------------------------------------------------- --stills
if (opt('stills') !== undefined || has('stills')) {
  const spec = opt('stills', 'auto');
  // auto: one still per beat, taken 60% through the beat so springs have mostly settled
  const beats = meta.beats?.filter((b) => b < DUR) || [];
  let times = spec === 'auto'
    ? (beats.length ? beats.map((b, i) => +(b + 0.6 * ((beats[i + 1] ?? DUR) - b)).toFixed(3)) : Array.from({ length: Math.ceil(DUR * 2) }, (_, i) => i / 2 + 0.25))
    : spec.split(',').map(Number);
  rmSync('out/stills', { recursive: true, force: true }); mkdirSync('out/stills', { recursive: true });
  for (let i = 0; i < times.length; i++) {
    writeFileSync(`out/stills/s_${String(i).padStart(3, '0')}.png`, await frame(times[i], `${times[i].toFixed(2)}s`));
  }
  const cols = Math.min(6, times.length), rows = Math.ceil(times.length / cols);
  const cw = Math.round(Math.min(320, 1920 / cols) / 2) * 2;
  await ff(['-framerate', '1', '-i', 'out/stills/s_%03d.png', '-vf', `scale=${cw}:-2,tile=${cols}x${rows}:padding=6:margin=6:color=0x222222`,
    '-frames:v', '1', 'out/stills/sheet.png']);
  console.log(`${times.length} stills → out/stills/  ·  sheet → out/stills/sheet.png (${cols}x${rows}, timestamps burned in)`);
  await done();
}

// ---------------------------------------------------------------- video
const from = num('from', 0), to = Math.min(num('to', DUR), DUR);
const seg = has('from') || has('to');
const suffix = format ? '_' + format.replace(':', 'x') : '';
const out = opt('out', draft ? `out/draft${suffix}.mp4` : seg ? `out/seg_${from}-${to}${suffix}.mp4` : `out/silent${suffix}.mp4`);

const vf = SUB > 1 ? ['-vf', `tmix=frames=${SUB},select='eq(mod(n,${SUB}),${SUB - 1})',setpts=N/${FPS}/TB`] : [];
const enc = spawn(ffmpegPath(), ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS * SUB), '-i', '-',
  ...vf, '-r', String(FPS), '-c:v', 'libx264', '-preset', draft ? 'veryfast' : 'medium', '-crf', draft ? '23' : '16',
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });

const total = Math.round((to - from) * FPS * SUB), t0 = Date.now();
for (let i = 0; i < total; i++) {
  const f = Math.floor(i / SUB), j = i % SUB;     // frame f, subframe j: spread over SHUTTER of the frame
  const png = await frame(from + f / FPS + (SUB > 1 ? (j / SUB) * SHUTTER / FPS : 0));
  if (!enc.stdin.write(png)) await new Promise((r) => enc.stdin.once('drain', r));
  if (i % (FPS * SUB) === 0 && i) {
    const el = (Date.now() - t0) / 1000;
    console.log(`  ${(from + i / (FPS * SUB)).toFixed(0)}s / ${to}s  ·  eta ${Math.round(el / i * (total - i))}s`);
  }
}
enc.stdin.end();
const code = await new Promise((r) => enc.on('close', r));
console.log(code === 0 ? `✓ ${out}  (${W}x${H}, ${FPS} fps, ${SUB} subframes${SUB > 1 ? ` @ ${SHUTTER * 360}°` : ''}, ${((Date.now() - t0) / 1000).toFixed(0)}s)` : `✗ ffmpeg exited ${code}`);
await done(code);
