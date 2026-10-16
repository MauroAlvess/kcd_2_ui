"""Builds the trailer card's picture (public/img/trailer-*.webp) from the video's own thumbnail on YouTube.

    python tools/make-trailer.py [video id]

The id defaults to the first trailer's (it is `TRAILER.id` in src/app/content/media.ts). The thumbnail is downloaded once, here,
and the page serves its own copy: a visitor's browser asks YouTube for nothing until the trailer is played. Pillow is needed
(`pip install pillow`). The sizes this prints are the ones to keep in `TRAILER.poster` (media.ts).
"""

import io
import sys
import urllib.request
from pathlib import Path

from PIL import Image

VIDEO = sys.argv[1] if len(sys.argv) > 1 else "Z5xjWIUd6Uo"
OUT = Path(__file__).resolve().parent.parent / "public" / "img"
WIDTHS = (640, 1280)


def main() -> None:
    url = f"https://i.ytimg.com/vi/{VIDEO}/maxresdefault.jpg"
    with urllib.request.urlopen(url, timeout=30) as response:
        picture = Image.open(io.BytesIO(response.read())).convert("RGB")
    for width in WIDTHS:
        height = round(picture.height * width / picture.width)
        target = OUT / f"trailer-{width}.webp"
        picture.resize((width, height), Image.LANCZOS).save(target, "WEBP", quality=80, method=6)
        print(f"{target.name}: {width}x{height}, {target.stat().st_size // 1024} KB")


main()
