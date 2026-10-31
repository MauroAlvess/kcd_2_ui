"""Builds the pictures of the site's cards from the user's paintings (2026-10-31, the user: "substitua as imagens do site dos cards ... e use essas imagens da pasta nova imagem", and
then: "era só para substituir as imagens dos cards e texto mesmo, não das imagens de fundo das seções"): the four lines of the realm and the two pictures of the gallery. The pictures
that stand behind a section (the opening, the way in) and the link card are not touched.

    python tools/make-story-images.py [the folder of the paintings]        (by default ../nova imagem, beside the site)

Which painting stands where is in `SLOTS` below. Each picture is made at the widths the page's `srcset` names (the page picks the smallest that is sharp on the screen): never wider
than the painting is, so that nothing is stretched. Deterministic: the same paintings give the same files. The old pictures that nothing names any more are deleted at the end (`STALE`).
The crests, the icons and the map are made by `make-landing-images.py` and `make-map.py`.
"""

import os
import sys

from PIL import Image

Image.MAX_IMAGE_PIXELS = None

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
IMG = os.path.join(ROOT, "public", "img")
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "..", "nova imagem")

# name of the files (`<name>-<width>.webp`), the painting, the widths, the quality, and what to cut away first (left, top, right, bottom, in the painting's pixels).
SLOTS = [
    # The four lines of the realm, in the order they are told.
    ("pilar-oficio", "cavalgando.png", [720, 1280, 2200], 88, None),
    ("pilar-familia", "korand para a guerra.png", [720, 1280, 2200], 88, None),
    ("pilar-teto", "ataque a suchdol.png", [720, 1280, 2200], 88, None),
    # The duel was painted as a banner and put on a black 16:9 page: the black is cut away, with the rough edge of the brush (rows 200 to 836 are all picture).
    ("pilar-coroa", "urik vs cumanos.png", [720, 1280, 1920], 90, (0, 200, 1920, 836)),
    # The two pictures of the gallery: the wide one first, the tall one beside it.
    ("galeria-floresta", "erik vs korand.png", [720, 1200, 1600], 88, None),
    ("galeria-estrada", "ida embora.png", [720, 1200, 1600], 88, None),
]

# The pictures of the first landing page that no page names now.
STALE = [
    "pilar-coroa-2200.webp",
    "pilar-familia-1920.webp",
    "pilar-teto-1920.webp",
    "galeria-mercado-720.webp",
    "galeria-mercado-1200.webp",
    "galeria-mercado-1600.webp",
]


def opened(file, crop):
    image = Image.open(os.path.join(SRC, file))
    if image.mode == "RGBA" and image.getchannel("A").getextrema()[0] < 255:
        print(f"  (the painting {file} has transparent pixels: they are drawn over black)")
        flat = Image.new("RGB", image.size, (0, 0, 0))
        flat.paste(image, mask=image.getchannel("A"))
        image = flat
    image = image.convert("RGB")
    return image.crop(crop) if crop else image


def save_widths(name, image, widths, quality):
    for width in widths:
        if width > image.width:
            sys.exit(f"{name}: {width} px asked, but the picture is only {image.width} wide")
        scaled = image if image.width == width else image.resize((width, round(image.height * width / image.width)), Image.LANCZOS)
        out = os.path.join(IMG, f"{name}-{width}.webp")
        scaled.save(out, "WEBP", quality=quality, method=6)
        print(f"  {name}-{width}.webp {scaled.width}x{scaled.height} {os.path.getsize(out) // 1024} KB")


for name, file, widths, quality, crop in SLOTS:
    print(f"{name}  <-  {file}")
    save_widths(name, opened(file, crop), widths, quality)

for stale in STALE:
    path = os.path.join(IMG, stale)
    if os.path.exists(path):
        os.remove(path)
        print(f"deleted {stale}")
