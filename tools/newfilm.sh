#!/usr/bin/env bash
# Scaffold a new series film from the shared template and synthesize its 3-minute score.
#   tools/newfilm.sh <slug> "<Title>" <key> <seed> "<mood per chapter x9>"
# e.g. tools/newfilm.sh earhart "Amelia Earhart" D 200 "dark chill tense tense dark tense chill dark dark"
set -euo pipefail
cd "$(dirname "$0")/.."
slug=$1; title=$2; key=$3; seed=$4; moods=($5)
src=bancocentral
mkdir -p "$slug/scenes" "$slug/docs" "$slug/audio/parts" "$slug/out"
for f in CLAUDE.md beats.py beats.json finish.mjs grab.mjs index.html music.mjs package.json package-lock.json render.mjs review.mjs sfx.mjs .gitignore; do cp "$src/$f" "$slug/"; done
cp -r "$src/lib" "$src/assets" "$slug/"
cp "$src/scenes/kit.js" "$slug/scenes/"
[ -e "$slug/node_modules" ] || ln -s ../dbcooper/node_modules "$slug/node_modules"
sed -i "s|<title>[^<]*</title>|<title>${title}</title>|" "$slug/index.html"
bars=(6 8 8 10 10 8 8 8 6)
cd "$slug"
for i in $(seq 0 8); do
  L=--loop; [ $i -eq 8 ] && L=
  intro=0; [ $i -eq 0 ] && intro=2
  node music.mjs --bpm 96 --bars ${bars[$i]} --mood ${moods[$i]} --intro $intro --seed $((seed + i)) --key "$key" $L --out audio/parts/p$((i+1)).wav > /dev/null
done
for i in $(seq 1 9); do echo "file 'p$i.wav'"; done > audio/parts/list.txt
ffmpeg -hide_banner -loglevel error -y -f concat -safe 0 -i audio/parts/list.txt -c copy audio/music.wav
echo "✓ $slug scaffolded"
