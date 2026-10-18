"""Builds the moving picture behind the opening of the page: public/video/hero-*.{webm,mp4} and its still,
public/img/hero-poster-*.webp, from the original recording in the project's img folder.

    python tools/make-hero-video.py [--ffmpeg PATH] [original]

The original is "Main Menu Kutnohorsko.mp4" (2026-10-18): the game's own main-menu view of Kuttenberg on its hill, the
smoke and the mist moving over a still town, 54 seconds of 3840x2160 at 30 frames, 51 MB. Its header says the pixels are
twice as wide as they are tall (32:9); they are not, the picture is 16:9, so the pixels are made square again here.

What comes out, all without sound (the video only ever plays muted):
- 1920x1080 and 1280x720, each as WebM (VP9, which every current browser plays and which is about half the size) and as
  MP4 (H.264, for whatever does not play VP9). The page offers the 720 ones to narrow screens.
- 24 frames a second: the smoke is slow, and a quarter fewer frames is a quarter less to download.
- A seamless loop: the last second is faded into the first, so the jump of the smoke when the video starts over is gone.
  The result is one second shorter than the original and starts one second into it.
- The still the page shows until the video plays (and instead of it, for anybody who asks for less motion or to save
  data): the first frame of the loop, 1920 and 960 px wide.

ffmpeg is not installed on the project's machine. A static build is in the imageio-ffmpeg package:
    pip install --target <folder> imageio-ffmpeg
then pass <folder>/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe as --ffmpeg (or set FFMPEG).
"""

import os
import subprocess
import sys
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
SITE = HERE.parent
VIDEO_OUT = SITE / "public" / "video"
IMAGE_OUT = SITE / "public" / "img"

args = sys.argv[1:]
ffmpeg = os.environ.get("FFMPEG", "ffmpeg")
if "--ffmpeg" in args:
    at = args.index("--ffmpeg")
    ffmpeg = args[at + 1]
    del args[at : at + 2]
SOURCE = Path(args[0]) if args else HERE.parents[1] / "img" / "Main Menu Kutnohorsko.mp4"

FPS = 24
# Where the loop starts in the original, and how long the fade from its end back into its start lasts.
LOOP_START = 1.0
FADE = 1.0

# name, height, VP9 quality (crf, lower is better), H.264 quality (crf)
SIZES = [("hero-1080", 1080, 38, 26), ("hero-720", 720, 38, 26)]
POSTER_WIDTHS = (1920, 960)


def run(command: list[str]) -> None:
    subprocess.run(command, check=True)


def duration(path: Path) -> float:
    """The length of the original in seconds, read from ffmpeg's own report."""
    probe = subprocess.run([ffmpeg, "-hide_banner", "-i", str(path)], capture_output=True, text=True)
    for line in probe.stderr.splitlines():
        line = line.strip()
        if line.startswith("Duration:"):
            hours, minutes, seconds = line.split(",")[0].split(": ")[1].split(":")
            return int(hours) * 3600 + int(minutes) * 60 + float(seconds)
    raise SystemExit(f"Could not read the length of {path}")


def loop_filter(height: int, length: float) -> str:
    """Scales to `height`, square pixels, FPS frames a second; then the end faded into the start (see the top of the file)."""
    width = height * 16 // 9
    body = length - LOOP_START
    return (
        f"[0:v]scale={width}:{height}:flags=lanczos,setsar=1,fps={FPS},format=yuv420p,split[a][b];"
        # xfade wants a constant rate on both sides, which a trim loses: it is said again after each.
        f"[a]trim=start={LOOP_START}:end={length:.3f},setpts=PTS-STARTPTS,fps={FPS}[main];"
        f"[b]trim=start=0:end={LOOP_START},setpts=PTS-STARTPTS,fps={FPS}[head];"
        # The fade hands its frames on in full colour (4:4:4), which only some browsers play: back to 4:2:0.
        f"[main][head]xfade=transition=fade:duration={FADE}:offset={body - FADE:.3f},format=yuv420p[out]"
    )


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"Not found: {SOURCE}")
    VIDEO_OUT.mkdir(parents=True, exist_ok=True)
    IMAGE_OUT.mkdir(parents=True, exist_ok=True)
    length = duration(SOURCE)
    print(f"{SOURCE.name}: {length:.2f} s")

    for name, height, vp9_crf, h264_crf in SIZES:
        graph = loop_filter(height, length)
        webm = VIDEO_OUT / f"{name}.webm"
        run([ffmpeg, "-hide_banner", "-v", "error", "-y", "-i", str(SOURCE), "-filter_complex", graph, "-map", "[out]", "-an",
             "-c:v", "libvpx-vp9", "-crf", str(vp9_crf), "-b:v", "0", "-pix_fmt", "yuv420p", "-row-mt", "1", "-deadline", "good", "-cpu-used", "2",
             str(webm)])
        mp4 = VIDEO_OUT / f"{name}.mp4"
        run([ffmpeg, "-hide_banner", "-v", "error", "-y", "-i", str(SOURCE), "-filter_complex", graph, "-map", "[out]", "-an",
             "-c:v", "libx264", "-crf", str(h264_crf), "-preset", "slow", "-tune", "film", "-profile:v", "high",
             "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(mp4)])
        for out in (webm, mp4):
            print(f"{out.name:22} {out.stat().st_size / 1024 / 1024:6.2f} MB")

    # The still: the loop's first frame, as the 1080 video shows it.
    frame = VIDEO_OUT / "poster-frame.png"
    run([ffmpeg, "-hide_banner", "-v", "error", "-y", "-ss", str(LOOP_START), "-i", str(SOURCE),
         "-vf", "scale=1920:1080:flags=lanczos,setsar=1", "-frames:v", "1", str(frame)])
    still = Image.open(frame).convert("RGB")
    frame.unlink()
    for width in POSTER_WIDTHS:
        image = still if width == still.width else still.resize((width, width * 9 // 16), Image.LANCZOS)
        out = IMAGE_OUT / f"hero-poster-{width}.webp"
        image.save(out, format="WEBP", quality=62, method=6)
        print(f"{out.name:22} {out.stat().st_size / 1024:6.1f} KB")


main()
