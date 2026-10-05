# Animation guide — D. B. Cooper

- One file per chapter: `scenes/chNN.js` exports `() => [{ from, to, cues, draw(t, d) }]` with absolute times. 96 BPM: `bar(n)` = n × 2.5 s, `BEAT` = 0.625 s. Every cut lands on a beat.
- Draw only through `scenes/kit.js`: palette `C`, `SERIF` (Instrument Serif, display/numbers) and `THAI` (Noto Sans Thai, everything else).
- Two worlds: **paper** (`paper()`, case-file scenes) and **night** (`night()`, sky/maps). Red `C.red` is the only accent.
- Text: `say()` for kinetic Thai lines (returns bottom y — stack the next line from it), `big()` for serif numbers, `kicker()` for the small red label, `typewriter()` for documents, `stamp()` for verdicts.
- Text column is `TX` (slightly left of centre) and `MAXW` 860u, keeping clear of the TikTok right rail and bottom caption. Headlines live at 250–470u, captions at 1150–1530u.
- Maps: `map(cam)` + `topScrim()` + `pin()` + `path()`; pins must sit below 500u.
- Motion: springs only (`spring`, `track`); impacts use `shake()`. Every shot ends with `finish()` (vignette + grain).
- Never: `Math.random`, timers, fades on everything, real photos or likenesses of people.
