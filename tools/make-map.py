"""Builds the map of the lore section from the project's own art: ../img/mapa.png (2026-10-31, the user: "o mapa está errado, pegue o mapa da pasta img e substitua do site").

    python tools/make-map.py [the map's original] [output folder]

The map is the region of Kuttenberg with the crests of the five houses laid over it (Raborsch, Suchdol, Pschitoky, Kuttenberg and Malešov); the first one on the site
had Trosky's crest by Kuttenberg where the corrected art has Pschitoky's in the middle of the land. The original is 4096 x 3413 pixels: one WebP is made at each of
the widths the page's `srcset` names (700, 1200, 1600), at the quality the pictures of the landing page have. Run it again whenever `mapa.png` changes.
(`make-landing-images.py` used to make these from the zip of the new identity; it leaves the map to this script now.)
"""

import sys
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
SOURCE = Path(sys.argv[1]) if len(sys.argv) > 1 else HERE.parents[1] / "img" / "mapa.png"
TARGET = Path(sys.argv[2]) if len(sys.argv) > 2 else HERE.parent / "public" / "img"
WIDTHS = (1600, 1200, 700)
QUALITY = 82

Image.MAX_IMAGE_PIXELS = None
art = Image.open(SOURCE).convert("RGB")
TARGET.mkdir(parents=True, exist_ok=True)
for width in WIDTHS:
    out = TARGET / f"mapa-kuttenberg-{width}.webp"
    height = round(width * art.height / art.width)
    art.resize((width, height), Image.LANCZOS).save(out, format="WEBP", quality=QUALITY, method=6)
    print(f"{out.name:28} {width:5}x{height:<5} {out.stat().st_size / 1024:7.1f} KB")
