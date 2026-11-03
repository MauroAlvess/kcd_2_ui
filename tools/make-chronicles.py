"""Builds the covers of the Crônicas da Boêmia (2026-11-03, the user: "vamos criar a seção Crônicas da Boêmia ... ato 1 o primeiro conflito, ato 2 um novo lorde", and the server's
first trailer).

    python tools/make-chronicles.py

Each chronicle is a video on the server's YouTube channel; the page shows its cover (the thumbnail the channel gave it, 1280 x 720) and only loads the player when a visitor
asks for it. The covers are downloaded here from YouTube's public thumbnail address and written to public/img in two widths, named by their width (`cronica-ato-1-640.webp`,
`cronica-ato-1-1280.webp`, `cronica-trailer-640.webp`) like the other pictures of a card, for the page to choose by `srcset`. When the channel changes a cover, run this again.

The ids are the videos' own (the part after `v=` of their address); keep them in step with `src/app/content/chronicles.ts`."""
import io
import os
import urllib.request

from PIL import Image

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
IMG = os.path.join(ROOT, "public", "img")

# the name in the files' names -> the video's id on YouTube (the ids of `CHRONICLES`)
VIDEOS = {"trailer": "Z5xjWIUd6Uo", "ato-1": "0Yt1FPSQWqQ", "ato-2": "w9F0UUXOUj0"}
WIDTHS = (640, 1280)
QUALITY = 82


def cover(video: str) -> Image.Image:
    """The video's largest thumbnail, 1280 x 720 when the channel gave one."""
    request = urllib.request.Request(f"https://i.ytimg.com/vi/{video}/maxresdefault.jpg", headers={"User-Agent": "Mozilla/5.0 (cover builder)"})
    with urllib.request.urlopen(request, timeout=30) as answer:
        picture = Image.open(io.BytesIO(answer.read())).convert("RGB")
    if picture.size != (1280, 720):
        raise SystemExit(f"{video}: the cover is {picture.size[0]}x{picture.size[1]}, not 1280x720: the channel has no large thumbnail for it")
    return picture


def main() -> None:
    os.makedirs(IMG, exist_ok=True)
    for name, video in VIDEOS.items():
        picture = cover(video)
        for width in WIDTHS:
            height = round(width * 9 / 16)
            sized = picture if width == picture.width else picture.resize((width, height), Image.LANCZOS)
            path = os.path.join(IMG, f"cronica-{name}-{width}.webp")
            sized.save(path, "WEBP", quality=QUALITY, method=6)
            print(f"{os.path.basename(path)}: {width}x{height}, {os.path.getsize(path) / 1024:.0f} KB")


if __name__ == "__main__":
    main()
