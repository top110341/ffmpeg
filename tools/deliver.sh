#!/usr/bin/env bash
# Finish a motion-studio film folder: sfx → mix → loudness (safe true peak after AAC) → full + <30 MiB copy.
#   tools/deliver.sh <film-dir> <OutputName>
# Expects <film-dir>/out/silent.mp4, audio/music.wav and out/cues.json (written by render.mjs).
set -euo pipefail
dir=$1; name=$2
cd "$dir"
node sfx.mjs > /dev/null
mkdir -p out/deliver
ffmpeg -hide_banner -loglevel error -y -i audio/music.wav -i out/sfx.wav -filter_complex \
  "[0:a]aresample=48000,volume=-3dB[m];[1:a]aresample=48000,aformat=channel_layouts=stereo[s];[m][s]amix=inputs=2:normalize=0:duration=longest,loudnorm=I=-14:TP=-2:LRA=11,aresample=48000,atrim=0:180,afade=t=out:st=179.7:d=0.3,volume=-1.5dB[a]" \
  -map "[a]" -c:a pcm_f32le out/mix.wav
ffmpeg -hide_banner -loglevel error -y -i out/silent.mp4 -i out/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -t 180 -movflags +faststart "out/deliver/${name}.mp4"
# phone copy under the 30 MiB chat upload limit (two-pass, 1080x1920 kept)
ffmpeg -hide_banner -loglevel error -y -i "out/deliver/${name}.mp4" -c:v libx264 -preset slow -b:v 1100k -maxrate 1800k -bufsize 3600k -pass 1 -passlogfile out/x264 -an -f null /dev/null
ffmpeg -hide_banner -loglevel error -y -i "out/deliver/${name}.mp4" -c:v libx264 -preset slow -b:v 1100k -maxrate 1800k -bufsize 3600k -pass 2 -passlogfile out/x264 -pix_fmt yuv420p -c:a copy -movflags +faststart "out/deliver/${name}_small.mp4"
ffmpeg -hide_banner -loglevel error -y -ss 4.6 -i out/silent.mp4 -frames:v 1 out/deliver/poster.png
for f in "out/deliver/${name}.mp4" "out/deliver/${name}_small.mp4"; do
  printf '%s  %s bytes  ' "$f" "$(stat -c %s "$f")"
  ffmpeg -hide_banner -nostats -i "$f" -af ebur128=peak=true -f null - 2>&1 | grep -E "I:|Peak:" | tail -2 | tr -s ' ' | tr '\n' ' '; echo
done
