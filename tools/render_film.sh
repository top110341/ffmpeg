#!/usr/bin/env bash
# Queue-render one film folder and deliver it. At most MAX renders run at once across all queued films.
#   tools/render_film.sh <film-dir> <OutputName>
set -euo pipefail
cd "$(dirname "$0")/.."
dir=$1; name=$2; MAX=${MAX:-2}
lock=/tmp/claude-render.lock
running() { pgrep -fc "^node render.mjs --fps 30 --sub 2" || true; }
exec 9>"$lock"
while true; do
  flock 9
  if [ "$(running)" -lt "$MAX" ]; then
    (cd "$dir" && exec node render.mjs --fps 30 --sub 2 > out/render.log 2>&1) &
    pid=$!
    sleep 5            # let the process appear before releasing the admission lock
    flock -u 9
    break
  fi
  flock -u 9
  sleep 20
done
wait $pid
tail -1 "$dir/out/render.log"
tools/deliver.sh "$dir" "$name"
