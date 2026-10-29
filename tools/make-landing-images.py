"""Builds the site's pictures from the files of the new identity (the user's "Landing page-html.zip", 2026-10-29: the gold crest, the eight guild crests, the two
houses' crests, the photographs, the map). Run it on the folder the zip was extracted to; it writes into public/img and the icons into public/.

    python tools/make-landing-images.py <extracted folder>/assets

Deterministic: the same files give the same pictures. The zip's files have hash names, so they are named here by what they show."""
import os
import sys
from PIL import Image, ImageDraw, ImageFont

SRC = sys.argv[1]
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
IMG = os.path.join(ROOT, "public", "img")
PUBLIC = os.path.join(ROOT, "public")
BG = (17, 14, 10)

NAMES = {
    "logo": "075e9220799661e1ad9d8baf93ebfe2b.webp",
    "hero": "990b4e8924423362625756d5475d9d90.webp",
    "oficio": "bf7b14355364f1dab0fd0aa9eb02a465.webp",
    "familia": "152102bc5e534226eb46564fcae9a7e2.webp",
    "teto": "b9214c75663d456740de9627bbb3e138.jpg",
    "coroa": "db947a7785a73cc1b8de5d0ad856a280.webp",
    "floresta": "28117b178463ce340e02e1334762ce02.webp",
    "mercado": "29dd6fb413c73fb42d1f2d42ee08162c.webp",
    "leao": "caab5046e736003d023ed9adde79ffaa.webp",
    "corvo": "f7b31cede843c7c87c7dec9a53f47bcf.webp",
    "mapa": "e1fae7e112b1b949f9beb7b0c639ad95.webp",
    "entrar": "b8f687060467da1d226790d3d79f57ad.webp",
    "guild-ferreiro": "132b4b58788078ef7be1962503325800.webp",
    "guild-cacador": "46607dbb3918ce1fe216073581af11da.webp",
    "guild-taberneiro": "e19d3560400093171c849c2d451f8b43.webp",
    "guild-alquimista": "639db6bc01feafa604c4f9460464211c.webp",
    "guild-artesao": "6b7de91bef7f2939b2435a43e5e87f25.webp",
    "guild-coletor": "7f9e26b14eda67bc6f88676cd40181e9.webp",
    "guild-agricultor": "a931e0eddc62248aceb67579000528c9.webp",
    "guild-domador": "01517e8cc36c3d3fdbfc8aab591d765c.webp",
}


def opened(key):
    return Image.open(os.path.join(SRC, NAMES[key]))


def save(image, name, quality=80):
    path = os.path.join(IMG, name)
    if name.endswith(".webp"):
        image.save(path, "WEBP", quality=quality, method=6)
    else:
        image.convert("RGB").save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"{name:34s} {image.size[0]}x{image.size[1]} {os.path.getsize(path) // 1024} KB")


def wide(key, name, widths, quality=78):
    image = opened(key).convert("RGB")
    for width in widths:
        scaled = image if image.width <= width else image.resize((width, round(image.height * width / image.width)), Image.LANCZOS)
        save(scaled, f"{name}-{width}.webp", quality)


# The photographs, in two widths each (the page picks one by `srcset`).
wide("hero", "hero", [1920, 960])
wide("oficio", "pilar-oficio", [1280, 720])
wide("familia", "pilar-familia", [1280, 720])
wide("teto", "pilar-teto", [1280, 720])
wide("coroa", "pilar-coroa", [1280, 720])
wide("floresta", "galeria-floresta", [1200, 720])
wide("mercado", "galeria-mercado", [1200, 720])
wide("mapa", "mapa-kuttenberg", [1200, 700])
wide("entrar", "entrar", [1920, 960])

# The crests keep their transparency.
def crest(key, name, size, quality=88):
    image = opened(key).convert("RGBA")
    image = image.resize((size, round(image.height * size / image.width)), Image.LANCZOS)
    save(image, name, quality)


logo = opened("logo").convert("RGBA")
crest("logo", "logo-rp.webp", 256)
crest("leao", "brasao-leao.webp", 480)
crest("corvo", "brasao-corvo.webp", 480)
for guild in ["ferreiro", "cacador", "taberneiro", "alquimista", "artesao", "coletor", "agricultor", "domador"]:
    crest(f"guild-{guild}", f"guild-{guild}.webp", 160)


# The icons: the gold crest on the page's black.
def icon(size, name, pad=0.16):
    canvas = Image.new("RGB", (size, size), BG)
    inner = round(size * (1 - 2 * pad))
    mark = logo.copy()
    mark.thumbnail((inner, inner), Image.LANCZOS)
    canvas.paste(mark, ((size - mark.width) // 2, (size - mark.height) // 2), mark)
    path = os.path.join(PUBLIC, name)
    canvas.save(path, "PNG", optimize=True)
    print(f"{name:34s} {size}x{size}")
    return canvas


icon(192, "icon-192.png")
icon(512, "icon-512.png")
icon(180, "apple-touch-icon.png", 0.12)
big = icon(256, "_favicon-source.png", 0.08)
big.save(os.path.join(PUBLIC, "favicon.ico"), format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
os.remove(os.path.join(PUBLIC, "_favicon-source.png"))
print("favicon.ico")

# The picture a link to the site shows (Discord, WhatsApp, search): the hero cut to 1200x630, darkened on the left, with the crest and the claim.
hero = opened("hero").convert("RGB")
scale = 630 / hero.height
card = hero.resize((round(hero.width * scale), 630), Image.LANCZOS)
left = round((card.width - 1200) * 0.55)
card = card.crop((left, 0, left + 1200, 630))
shade = Image.new("RGBA", card.size)
pixels = shade.load()
for x in range(card.width):
    alpha = round(215 * max(0.0, 1 - x / 900))
    for y in range(card.height):
        pixels[x, y] = (17, 14, 10, alpha)
card = Image.alpha_composite(card.convert("RGBA"), shade)
mark = logo.copy()
mark.thumbnail((150, 150), Image.LANCZOS)
card.alpha_composite(mark, (64, 64))
draw = ImageDraw.Draw(card)
try:
    big_font = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 74)
    small_font = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 30)
    italic = ImageFont.truetype("C:/Windows/Fonts/georgiaz.ttf", 74)
except OSError:
    big_font = small_font = italic = ImageFont.load_default()
draw.text((64, 250), "O rei morreu.", font=big_font, fill=(239, 230, 210))
draw.text((64, 336), "A coroa está", font=big_font, fill=(239, 230, 210))
draw.text((64, 422), "vaga.", font=italic, fill=(213, 161, 86))
draw.text((64, 548), "KINGDOM RP BRASIL  ·  KINGDOM COME: DELIVERANCE II", font=small_font, fill=(217, 204, 178))
card.convert("RGB").save(os.path.join(PUBLIC, "og-image-5.jpg"), "JPEG", quality=86, optimize=True, progressive=True)
print("og-image-5.jpg 1200x630")
