"""Builds the pictures of the section of the social networks (2026-11-03, the user: "crie uma seção redes sociais, coloquei dentro do img os prints ... vamos usar o mesmo layout do site e
usar os prints lá para ficar legal").

    python tools/make-social.py [folder of the prints]

The prints are the owner's own screenshots of the server's pages, in the project's `img` folder by default (`..\\img`, beside the site's). Each is cut to the shape of the card, 16:9, keeping
its top and its middle, and written to public/img in two widths, named by their width (`social-tiktok-480.webp`, `social-tiktok-960.webp`), for the page to choose by `srcset`. The numbers on
a print are those of the day it was taken: when a new print is put in that folder, run this again.
"""
import os
import sys

from PIL import Image

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
IMG = os.path.join(ROOT, "public", "img")
PRINTS = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "..", "img")

# the name in the files' names -> the owner's print (the ids of `SOCIAL_PAGES`)
FILES = {"tiktok": "print tiktok.png", "instagram": "Print instagram.png", "youtube": "print youtube.png"}
WIDTHS = (480, 960)
SHAPE = 16 / 9
QUALITY = 84


def cut(picture: Image.Image) -> Image.Image:
    """The print in the card's shape: what is too wide loses as much on each side, what is too tall loses its bottom (a page's head is what shows who it is)."""
    width, height = picture.size
    if width / height > SHAPE:
        keep = round(height * SHAPE)
        left = (width - keep) // 2
        return picture.crop((left, 0, left + keep, height))
    return picture.crop((0, 0, width, round(width / SHAPE)))


def main() -> None:
    os.makedirs(IMG, exist_ok=True)
    for name, file in FILES.items():
        picture = cut(Image.open(os.path.join(PRINTS, file)).convert("RGB"))
        for width in WIDTHS:
            if width > picture.width:
                raise SystemExit(f"{file}: {picture.width} wide after the cut, and the page asks for {width}: a print this small would blur")
            height = round(width / SHAPE)
            path = os.path.join(IMG, f"social-{name}-{width}.webp")
            picture.resize((width, height), Image.LANCZOS).save(path, "WEBP", quality=QUALITY, method=6)
            print(f"{os.path.basename(path)}: {width}x{height}, {os.path.getsize(path) / 1024:.0f} KB")


if __name__ == "__main__":
    main()
