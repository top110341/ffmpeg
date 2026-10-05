"""Measure a supplied music track: python beats.py audio/track.wav  -> beats.json

Needs: pip install numpy librosa soundfile
(If you synthesize music with music.mjs, it writes beats.json itself; you don't need this.)
"""
import json
import sys

try:
    import numpy as np
    import librosa
except ImportError:
    sys.exit("librosa missing. Run: python -m pip install numpy librosa soundfile")

path = sys.argv[1]
out = sys.argv[2] if len(sys.argv) > 2 else "beats.json"
y, sr = librosa.load(path, sr=None, mono=True)
tempo, frames = librosa.beat.beat_track(y=y, sr=sr, units="frames")
beats = librosa.frames_to_time(frames, sr=sr).round(3).tolist()

onset = librosa.onset.onset_strength(y=y, sr=sr)
peaks = librosa.util.peak_pick(onset, pre_max=3, post_max=3, pre_avg=3, post_avg=5, delta=0.5, wait=10)
data = {
    "bpm": float(np.atleast_1d(tempo)[0]),
    "beats": beats,                    # state changes go here
    "downbeats": beats[::4],           # big moments go here (assumes 4/4 starting on beat 1; check by ear)
    "hits": librosa.frames_to_time(peaks, sr=sr).round(3).tolist(),  # SFX go here
    "dur": round(len(y) / sr, 3),
    "source": path,
}
with open(out, "w") as f:
    json.dump(data, f, indent=1)
print(f"{out}: {data['bpm']:.1f} BPM, {len(beats)} beats, {len(data['hits'])} hits, {data['dur']}s")
