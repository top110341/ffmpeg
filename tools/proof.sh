#!/usr/bin/env bash
# check + unplanned-wrap audit + one still per shot → <film>/out/stills/sheet.png
set -euo pipefail
cd "$(dirname "$0")/../$1"
node render.mjs --check 2>&1 | tail -1
echo "-- wraps:"; node ../tools/wraps.mjs 2>&1 | tail -20
T=$(node ../tools/shots.mjs 0.85); node render.mjs --stills "$T" 2>&1 | tail -1
