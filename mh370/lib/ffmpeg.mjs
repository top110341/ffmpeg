// Locate an ffmpeg binary: $FFMPEG, PATH, Python's imageio-ffmpeg, then the ffmpeg-static npm package.
import { execFileSync, spawnSync, spawn } from 'node:child_process';
import { createRequire } from 'node:module';

let cached;
export function ffmpegPath() {
  if (cached) return cached;
  for (const c of [process.env.FFMPEG, 'ffmpeg']) {
    if (c && spawnSync(c, ['-version'], { stdio: 'ignore' }).status === 0) return (cached = c);
  }
  for (const py of ['python', 'python3', 'py']) {
    try {
      const p = execFileSync(py, ['-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())'],
        { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
      if (p) return (cached = p);
    } catch {}
  }
  try { const p = createRequire(import.meta.url)('ffmpeg-static'); if (p) return (cached = p); } catch {}
  throw new Error('ffmpeg not found. Install it (winget install Gyan.FFmpeg | brew install ffmpeg | apt install ffmpeg) ' +
    'or run: python -m pip install imageio-ffmpeg');
}

// Run ffmpeg to completion; rejects with stderr on failure.
export function ff(args, { quiet = true } = {}) {
  return new Promise((res, rej) => {
    const p = spawn(ffmpegPath(), ['-hide_banner', '-y', ...(quiet ? ['-loglevel', 'error'] : []), ...args]);
    let err = '';
    p.stderr.on('data', (d) => (err += d));
    p.on('close', (code) => (code === 0 ? res(err) : rej(new Error(`ffmpeg failed (${code}):\n${err}`))));
  });
}

// Duration in seconds, parsed from `ffmpeg -i` (no ffprobe needed).
export function duration(file) {
  const r = spawnSync(ffmpegPath(), ['-hide_banner', '-i', file], { encoding: 'utf8' });
  const m = /Duration: (\d+):(\d+):([\d.]+)/.exec(r.stderr || '');
  if (!m) throw new Error(`Could not read duration of ${file}`);
  return +m[1] * 3600 + +m[2] * 60 + +m[3];
}
