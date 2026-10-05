# Review log

Scores 1–10: hook · readability (phone) · motion · variety · composition · brand/look consistency · sound sync

## Round 1 — ch01–03 stills
hook 8 · read 6 · motion 7 · variety 8 · comp 6 · look 8 · sync 7
Worst: (1) S2 two text blocks overlap · (2) right-side labels in S6 run off frame / under TikTok rail · (3) "18C" sits on top of the seat map; kickers too small to read.
Fixes: `say()` returns its bottom y and following lines stack from it; right labels shortened and moved in; seat map clipped above the caption; kicker 30u → 40u.

## Round 2 — all 37 shots
hook 9 · read 7 · motion 7 · variety 9 · comp 7 · look 9 · sync 8
Worst: (1) map pins (Seattle) collide with headline text on S9/S19/S24 · (2) unplanned wraps in S21 and S27 overlap the next line · (3) coastline ends in a hard edge when the map zooms out; Cooper vane diagram unreadable.
Fixes: map cameras re-framed so pins sit below 500u, `topScrim()` behind map headlines, automatic wrap audit (`__wraps`) → explicit line breaks, coast extended to 34°N, vane diagram replaced by the 727 with a red padlock on the aft stair, search grid 7 → 6 rows.

## Round 3 — re-check of fixed shots
hook 9 · read 8 · motion 8 · variety 9 · comp 8 · look 9 · sync 8
Remaining weakest moment: S10 (note crossing the aisle) is the plainest frame — a paper rectangle on navy.
