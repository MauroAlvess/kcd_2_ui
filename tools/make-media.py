"""Builds the gallery's videos, video posters and screenshots (public/video, public/img) from the recordings in the
project's "videos e imagens" folder.

    python tools/make-media.py [folder with the originals] [--ffmpeg path/to/ffmpeg] [--only name,name]

By default the originals are read from ../videos e imagens (the folder next to this project). Every output is derived, so
nothing in public/video, and none of the media-* files of public/img, is edited by hand: run it again when an original
changes. `--only` rebuilds just the named ones (a video's name is `duelo`, a screenshot's `patio`, and so on).

Why it exists: the recordings are 1920x1080 at 20 Mb/s (the duel alone is 186 MB, and GitHub refuses a file over
100 MB) and the screenshots are PNGs of 2 to 4 MB. What the page loads instead:

- Videos: the black bars of the cinematic capture cut off (each recording has its own, because the game window was a
  different height each time: the first row of the picture and its height are in VIDEOS), 1280 px wide, H.264 in the high
  profile at CRF 26 with AAC audio at 96 kb/s, and the index at the front of the file (`+faststart`), so that playback
  starts before the whole file has arrived. About 18 MB for the three, against 248 MB.
- A poster for each video: the frame shown until it is played. The video itself is not downloaded before that.
- Screenshots in WebP, at 960 px for the page and at 1920 px for the enlarged view.

The numbers in src/app/content/media.ts (the pictures' sizes, the videos' lengths) are what this prints: copy them there
when an original is replaced.

ffmpeg is looked for in --ffmpeg, then on PATH, then in the Python package imageio-ffmpeg (`pip install imageio-ffmpeg`),
which carries a static build. Pillow is needed too (`pip install pillow`).
"""

import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent


def option(name: str) -> str | None:
    return sys.argv[sys.argv.index(name) + 1] if name in sys.argv else None


FLAGS = {"--ffmpeg", "--only"}
positional = [a for i, a in enumerate(sys.argv[1:], 1) if not a.startswith("--") and sys.argv[i - 1] not in FLAGS]
SOURCE = Path(positional[0]) if positional else HERE.parents[1] / "videos e imagens"
IMG = HERE.parent / "public" / "img"
VIDEO = HERE.parent / "public" / "video"
ONLY = set(option("--only").split(",")) if option("--only") else None

# Every video is cut to the picture the game drew (the rest is the black bars of the capture) and scaled to this width.
VIDEO_WIDTH = 1280
CRF = 26
POSTER_QUALITY = 74
SHOT_WIDTHS = (960, 1920)
SHOT_QUALITY = 74

# name, original, height of the picture inside the 1920x1080 recording, the row it starts at, and the second of the poster.
# (Measured on the rows that are not black: the duel and the horses' dusk at 100, the ride at 90.)
VIDEOS = [
    ("duelo", "Take Duelo.mp4", 874, 100, 45),
    ("passeio", "Take Passeio.mp4", 884, 90, 1.5),
    ("cavalo", "Take Cavalo.mp4", 856, 100, 2),
]

# name, original
SHOTS = [
    ("patio", "Picture.png"),
    ("cavalgada", "Picture cavalo.png"),
    ("dados", "Picture game dados.png"),
]


def wanted(name: str) -> bool:
    return ONLY is None or name in ONLY


def find_ffmpeg() -> str:
    explicit = option("--ffmpeg")
    if explicit:
        return explicit
    on_path = shutil.which("ffmpeg")
    if on_path:
        return on_path
    try:
        import imageio_ffmpeg

        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        sys.exit("ffmpeg not found: pass --ffmpeg <path>, put it on PATH, or `pip install imageio-ffmpeg`.")


def run(ffmpeg: str, *args: str) -> None:
    subprocess.run([ffmpeg, "-hide_banner", "-loglevel", "error", "-y", *args], check=True)


def seconds(ffmpeg: str, path: Path) -> float:
    """The length of a file, read from what ffmpeg prints about it."""
    text = subprocess.run([ffmpeg, "-hide_banner", "-i", str(path)], capture_output=True, text=True).stderr
    stamp = text.split("Duration:")[1].split(",")[0].strip()
    hours, minutes, rest = stamp.split(":")
    return int(hours) * 3600 + int(minutes) * 60 + float(rest)


def cut(height: int, top: int) -> str:
    return f"crop=1920:{height}:0:{top},scale={VIDEO_WIDTH}:-2:flags=lanczos,setsar=1"


def make_video(ffmpeg: str, name: str, original: str, height: int, top: int, poster_at: float) -> None:
    source = SOURCE / original
    out = VIDEO / f"{name}.mp4"
    run(
        ffmpeg, "-i", str(source), "-vf", cut(height, top),
        "-c:v", "libx264", "-preset", "slow", "-crf", str(CRF), "-pix_fmt", "yuv420p", "-profile:v", "high",
        "-level", "4.0", "-g", "60", "-c:a", "aac", "-b:a", "96k", "-ac", "2", "-movflags", "+faststart", str(out),
    )
    length = seconds(ffmpeg, out)
    print(f"{out.name:28} {VIDEO_WIDTH}x{round(VIDEO_WIDTH * height / 1920 / 2) * 2:<5} {out.stat().st_size / 1048576:7.1f} MB  {length:6.1f} s")

    with tempfile.TemporaryDirectory() as folder:
        frame = Path(folder) / "frame.png"
        run(ffmpeg, "-ss", str(poster_at), "-i", str(source), "-frames:v", "1", "-vf", cut(height, top), str(frame))
        picture = Image.open(frame).convert("RGB")
        poster = IMG / f"media-{name}-poster.webp"
        picture.save(poster, format="WEBP", quality=POSTER_QUALITY, method=6)
        print(f"{poster.name:28} {picture.width}x{picture.height:<5} {poster.stat().st_size / 1024:7.1f} KB")


def make_shot(name: str, original: str) -> None:
    picture = Image.open(SOURCE / original).convert("RGB")
    for width in SHOT_WIDTHS:
        scaled = picture.resize((width, round(width * picture.height / picture.width)), Image.LANCZOS)
        out = IMG / f"media-{name}-{width}.webp"
        scaled.save(out, format="WEBP", quality=SHOT_QUALITY, method=6)
        print(f"{out.name:28} {scaled.width}x{scaled.height:<5} {out.stat().st_size / 1024:7.1f} KB")


def main() -> None:
    IMG.mkdir(parents=True, exist_ok=True)
    VIDEO.mkdir(parents=True, exist_ok=True)
    ffmpeg = None
    for name, original, height, top, poster_at in VIDEOS:
        if wanted(name):
            ffmpeg = ffmpeg or find_ffmpeg()
            make_video(ffmpeg, name, original, height, top, poster_at)
    for name, original in SHOTS:
        if wanted(name):
            make_shot(name, original)


if __name__ == "__main__":
    main()
