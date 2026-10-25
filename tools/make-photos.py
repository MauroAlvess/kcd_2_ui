"""Builds the gallery's pictures (public/img/foto-<n>-960.webp and foto-<n>-1920.webp) from the players' screenshots.

    python tools/make-photos.py [folder with the screenshots] [output folder]

By default the screenshots are read from ../fotos (the folder next to this project, where the administration drops them) and the
results are written to public/img. The order of ORDER is the order of the gallery; src/app/content/photos.ts carries the title,
the description and the sizes of each. Every output is derived: run it again when a screenshot is added or replaced.
"""

import sys
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
SOURCE = Path(sys.argv[1]) if len(sys.argv) > 1 else HERE.parents[1] / "fotos"
TARGET = Path(sys.argv[2]) if len(sys.argv) > 2 else HERE.parent / "public" / "img"
TARGET.mkdir(parents=True, exist_ok=True)

# The screenshots in the order they appear; the names are the ones the files were given.
ORDER = ["2.png", "3.png", "4.png", "5.png", "6.png", "67.png", "7.png", "9.png", "10.png", "image.png"]
WIDTHS = ((960, 70), (1920, 76))

for number, name in enumerate(ORDER, start=1):
    original = Image.open(SOURCE / name).convert("RGB")
    for width, quality in WIDTHS:
        height = round(original.height * width / original.width)
        picture = original.resize((width, height), Image.LANCZOS) if original.width > width else original.copy()
        out = TARGET / f"foto-{number}-{width}.webp"
        picture.save(out, "WEBP", quality=quality, method=6)
        print(f"{out.name}: {picture.width}x{picture.height}, {out.stat().st_size // 1024} KB")
