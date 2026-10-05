#!/usr/bin/env bash
# After a container restart: re-queue every film whose delivery never finished.
#   tools/requeue.sh slug:OutputName ...
cd "$(dirname "$0")/.."
for pair in "$@"; do d=${pair%%:*}; n=${pair#*:}
  [ "$(grep -c bytes "$d/out/queue.log" 2>/dev/null)" -ge 2 ] && { echo "done   $d"; continue; }
  rm -f "$d/out/silent.mp4" "$d/out/queue.log" "$d/out/render.log"
  (nohup tools/render_film.sh "$d" "$n" > "$d/out/queue.log" 2>&1 &); sleep 1; echo "queued $d"
done
