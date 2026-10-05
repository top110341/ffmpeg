# Motion studio rules

Every video in this folder is a program. `index.html` paints any moment on demand through
`window.seek(t)`; `render.mjs` walks time in headless Chromium and pipes frames to ffmpeg.

## Render contract
- Every film is a pure function of time: `window.seek(t)` paints frame t.
- No CSS transitions, no setTimeout/setInterval, no Date.now, no requestAnimationFrame in render mode,
  no state carried between frames. Seeded randomness only (`rng`, `hash`, `noise` from lib/motion.js), never Math.random.
- Motion uses closed-form springs from lib/motion.js. A value with more than one target uses `track()`.
  Tiny overshoot on UI (`snappy`), none on type (`default`/`heavy`).
- Size everything with `layout(W, H).u` so 9:16, 1:1 and 16:9 render from one timeline. Reframe per format, never crop.
- Text stays inside `layout().safe`. Thai text: Noto Sans Thai / IBM Plex Sans Thai, no letter tracking,
  split by grapheme (`typeIn` already does).
- `node render.mjs --check` must pass before any full render.

## Look
- Banned defaults: centered title on a gradient, everything fading in, corner labels and frame borders,
  glow on UI chrome, generic particle bursts, text sliding in on linear easing, `will-change` on scaled elements.
- One display face, one UI face. One accent color unless the brief says otherwise.
- Every 2 to 4 seconds something new must happen on screen. A hook in the first 2 seconds.
- Product films: real screenshots, logo and colors from ./assets only. Never invent product UI.

## Sound
- Score is synthesized (`music.mjs`) unless a track is supplied (then measure it with `beats.py`, use it unchanged).
- Scene changes land on beats (beats.json), big moments on downbeats. SFX are scene `cues`, synthesized by `sfx.mjs`.
- Final mix: `finish.mjs` → -14 LUFS, true peak -1 dB.

## Loop before you show me anything
1. `node render.mjs --stills auto` → open out/stills/sheet.png and LOOK at it.
2. Score 1-10: hook in first 2 s · readability at phone size · motion quality · variety · composition ·
   brand accuracy · sound sync. Log scores + the 3 worst problems in docs/review_log.md.
3. Fix the 3 worst problems. Repeat until every score is 8+ (at least 3 rounds on a new film).
4. `node render.mjs --draft` → `node review.mjs --in out/draft.mp4` for pacing, then the full render.

## Commands
| step | command |
|---|---|
| live preview | `node lib/server.mjs` → http://127.0.0.1:5173/?w=1080&h=1920 |
| music + beat grid | `node music.mjs --bpm 120 --bars 8 --mood bright` |
| measure a supplied track | `python beats.py audio/track.wav` |
| checks | `node render.mjs --check` |
| stills sheet | `node render.mjs --stills auto` |
| animatic | `node render.mjs --draft` |
| full render | `node render.mjs` (`--format 16:9`, `--sub 4` for flagship, `--shutter 0.5` = 180° blur) |
| sfx | `node sfx.mjs` (reads out/cues.json written by render) |
| mix + mux | `node finish.mjs` (`--loop` for seamless loops) |
| review sheets | `node review.mjs --at 4.2` |
| product assets | `node grab.mjs <url>` |
