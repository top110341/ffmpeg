# Series brief: 3-minute vertical TikTok mystery/crime films (Thai)

Every film in this repo (dbcooper, mh370, zodiac, … dancing1518) is a 180 s, 1080×1920 canvas program.
Build a new one the same way. **Read `dancing1518/scenes/a1.js`, `dancing1518/scenes/a2.js` and
`tunguska/scenes/a1.js` first**: they are the reference for structure, pacing, layout and tone.

## Steps
1. **Facts first.** Research the topic on the web. Only put on screen what reliable sources agree on.
   Hedge anything disputed ("ราว", "บางแหล่งระบุว่า", "ตามคำบอกเล่า"). No invented quotes, case numbers,
   phone numbers, exact times or names you could not verify. Mention legends only *as* legends.
   Sensitive subjects (real victims): no gore, no victim images, respectful wording.
2. Scaffold: `tools/newfilm.sh <slug> "<Title>" <key> <seed> "<9 moods>"` (moods from: dark tense chill bright;
   key like C, D, E, F, G, A, Bb). This copies the template and synthesizes the 3-min score (96 BPM; bar = 2.5 s).
3. Write `scenes/a1.js` (bars 0–18 or so) and `scenes/a2.js` (to bar 72 = 180 s). Scenes are
   `{ from: bar(a), to: bar(b), cues: [[sec, sfx, gain]...], draw(t) {...} }` with t local to the scene.
   Scenes must tile 0→bar(72) with no gaps or overlaps. `index.html` already loads `CH=['a1','a2']`.
   SFX names: chime click impact pop riser swish thump tick type whoosh.
   Write topic-specific drawing helpers (props, scenery, diagrams) at the top of a1.js and export them for a2.js,
   like `dancer()`/`street()` in dancing1518 or `taiga()`/`fireball()` in tunguska. Draw with canvas only (no images).
4. Proof: `tools/proof.sh <slug>` → must print `✓ check passed`-style output, the wraps list must be EMPTY
   (fix any listed string by inserting explicit `\n` at a natural Thai phrase break or by shortening it),
   then it writes `<slug>/out/stills/sheet.png`. **Open the sheet with Read and look at it.** Fix overlaps,
   text crossing illustrations, text off-screen, empty-looking shots, then re-run proof. At least 2 rounds.
5. Do NOT render the full film, do not commit. Report back: slug, output name, a 3-line fact summary with
   what you hedged, and anything you were unsure of.

## Story shape (≈ 26–30 scenes over 72 bars)
- bar 0–2: hook in the first second (big visual + one striking line).
- bar 2–6: the stakes + a title card (paper card with an English tag line like `STRASSBURG · ANNO 1518`, a `stamp()`).
- Then the story in order, a new beat every 2–4 s, then the investigation/theories, what is known today,
  a closing title card (bar 64–68) and a last scene (bar 68–72) asking the viewer a question
  + `คอมเมนต์บอกได้เลย`.

## Layout rules (TikTok safe area — strict)
- Use `TX` as the text centre x (already shifted left for the right-hand button rail). Max text width 860u.
- Headlines/kickers at y 250–520u. Body text anywhere above 1560u. **Nothing important below 1600u**
  (TikTok caption area) and nothing right of x≈950u.
- All sizes multiply `u`. Thai body text 40–56u weight 800; big serif numbers via `big()`.
- `say()` returns the bottom y of what it drew — chain it when stacking lines. Each `\n` is a line.
- Text over busy art needs a band: `g.fillStyle='rgba(239,230,210,0.88)'; g.fillRect(0, y, W, h)` (or dark on night scenes) or `topScrim()`.
- Light scenes: `paper()` + `C.ink` text, accent `C.red`. Dark scenes: `night()` + `C.cream` text.
- Call `finish(0.5–1)` last in every draw (grain + vignette).

## Render contract
Pure function of t: no Math.random (use `hash(i, seed)`, `noise`), no Date, no state between frames.
Animate with `spring(t - at, 'snappy'|'default'|'heavy'|'playful')`, `track()`, `clamp`, `remap`.
Wrap any `g.globalAlpha`/transform changes in `g.save()/g.restore()`.
