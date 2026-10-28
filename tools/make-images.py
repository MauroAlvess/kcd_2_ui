"""Builds the web images in public/img from the original art in the project's img folder.

    python tools/make-images.py [folder with the originals] [output folder]

By default the originals are read from ../img (the folder next to this project) and the results
are written to public/img. Run it again whenever an original changes; every output is derived,
so nothing in public/img needs to be edited by hand.

Why it exists: the originals are print-sized PNGs and JPGs (up to 3840 px, over a megabyte each).
The page loads WebP files cut down to the size they are drawn at, two sizes for the large pictures
so a phone does not download the desktop one. Quality is chosen per picture: the photographs sit
under a dark gradient on the page and can be rougher than the crests, which are seen up close.

The site also uses two files that are not WebP, because browsers ask for them: favicon.ico and
apple-touch-icon.png.

The logo is the project's emblem ("brasão logo.jpg", 2026-10-15), printed in gold on a navy ground. The ground would
be a blue square on the site's black and its paper, so the gold is lifted off it (lift_from_dark): each pixel's
transparency is how far its brightness rises above the ground's, and its colour is the emblem's one gold, so the
speckled print of the gold stays. The game's own panel keeps the lion and raven crest.
"""

import math
import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageFilter

HERE = Path(__file__).resolve().parent
SOURCE = Path(sys.argv[1]) if len(sys.argv) > 1 else HERE.parents[1] / "img"
TARGET = Path(sys.argv[2]) if len(sys.argv) > 2 else HERE.parent / "public" / "img"
TARGET.mkdir(parents=True, exist_ok=True)

# output name, original file, widths (one file per width), quality
PHOTOS = [
    # The painting of the knight resting under the tree (2026-10-18), behind the way in at the foot of the page.
    ("painting", "backgroudn footer.jpg", (1280, 2560), 58),
    # The opening's picture (2026-10-28): "banner", the painted battle before the castle with the server's name in gold already on it
    # ("O primeiro RP brasileiro de Kingdom Come: Deliverance 2" and the crest). 1920 x 1080 is all the original has, so two sizes.
    ("banner", "banner.png", (960, 1920), 80),
    # The game as the players see it (2026-10-28): three of the user's own screenshots (the folder next to img), for the pitch under "Ninguém nasce
    # nobre": a tavern table at dusk, a duel before the walls, a village with a horse. Shown flat at a third of the page's width.
    ("shot-taverna", "../fotos/5.png", (720, 1200), 74),
    ("shot-duelo", "../fotos/image.png", (720, 1200), 74),
    ("shot-vila", "../fotos/67.png", (720, 1200), 74),
]

# Pictures with a transparent background: output name, original, widths, quality, alpha quality, and whether the
# original's "transparency" is really a checkerboard painted into its pixels (see knock_out_checkerboard).
CUTOUTS: list[tuple[str, str, tuple[int, ...], int, int, bool]] = [
    # The two ornamental frames of dark clouds (2026-10-21), each heaped in one corner: the pieces of the curtain that closes the screen
    # and opens to the four corners when the page is entered (shared/ui/curtain). One size each, their own: they are drawn about 1.4 times
    # the window, so a larger file would only be heavier.
    # Drawn up to 1.5 times their size, so they are kept at the quality of the art (2026-10-21: "perderam qualidade": 70/70 was soft).
    ("cloud-a", "Moldura Ornamental de Nuvens Espiraladas.png", (1774,), 88, 95, False),
    ("cloud-b", "Moldura Ornamental de Nuvens e Folhagens.png", (1375,), 88, 95, False),
]

# Crests and ornaments, one width each (twice the size they are drawn at): output, original, width, quality
CRESTS = [
    ("logo", "brasão logo.jpg", 320, 80),
    ("guild-ferreiro", "Brasão_do_Ferreiro_em_Fogo-removebg-preview.png", 300, 78),
    ("guild-cacador", "Brasão_Florestal_do_Cervo_Dourado-removebg-preview.png", 300, 78),
    ("guild-taberneiro", "Brasão_Medieval_da_Guilda_da_Cerveja-removebg-preview.png", 300, 78),
    ("guild-alquimista", "Emblema_Heráldico_da_Alquimia_Verde-removebg-preview.png", 300, 78),
    ("guild-artesao", "Brasão_do_Alfaiate_Dourado-removebg-preview.png", 300, 78),
    # The Coletores (2026-10-21): the user's own art, a large square with a margin round it, so trimmed to the figure.
    ("guild-coletor", "Brasão Coletor.png", 300, 78),
    # The Agricultores (2026-10-22): the user's own art, painted on a checkerboard (see CHECKERED), trimmed to the figure.
    ("guild-agricultor", "brasão agricultor.png", 300, 78),
    # The Domadores (2026-10-25): the user's own art, a PNG with its own transparency and a few specks round it (see SPECKLED), trimmed to the figure.
    ("guild-domador", "brasão domador.png", 300, 78),
    # The Lion's and the Raven's crest in one shield (2026-10-20: "na seção da história"): the lore.
    ("lion-raven", "Brasão_Medieval_do_Leão_e_Corvo-removebg-preview.png", 440, 76),
    # The tree of the realm's hierarchy, embroidered, for the Hierarquia section (2026-10-20: "uma árvore vertical completa"): about
    # 20rem wide, 560 px, cleaned of its specks.
    ("hierarchy-tree", "arvore hierarquica.png", 560, 56),
    # The in-game panel's frame corners: the lion's closes the top of the page's first band, the raven's the foot of its last.
    ("corner-lion", "border superior esquerda.png", 360, 80),
    ("corner-raven", "border inferior direita.png", 360, 80),
]

# The icon sits on the site's ground (the game's black, #0f0d0b), so it is flattened onto it: iOS paints transparency black anyway.
ICON_BACKGROUND = (15, 13, 11)

total = 0


def save(image: Image.Image, name: str, quality: int, alpha_quality: int = 80) -> None:
    global total
    out = TARGET / f"{name}.webp"
    image.save(out, format="WEBP", quality=quality, method=6, alpha_quality=alpha_quality)
    size = out.stat().st_size
    total += size
    print(f"{out.name:28} {image.width:5}x{image.height:<5} {size / 1024:7.1f} KB")


def resized(image: Image.Image, width: int) -> Image.Image:
    return image.resize((width, round(width * image.height / image.width)), Image.LANCZOS)


def knock_out_checkerboard(art: Image.Image, min_light: int = 226, spread: int = 10, pocket: int = 400) -> Image.Image:
    """Makes the background of a picture really transparent when its "transparency" is a drawn checkerboard.

    Some of the art came out of an image generator with the grey-and-white squares of a transparency preview painted into
    its pixels (every pixel opaque), so on the page the squares showed. Here the background is the light, neutral
    pixels (all three channels at least `min_light`, within `spread` of each other) that connect to the picture's edge.
    Light neutral areas the figures enclose count too, when they are bigger than `pocket` pixels; anything smaller is a
    highlight on armour or steel and stays. The edge is pulled in one pixel and softened so no pale fringe is left.
    """
    rgb = art.convert("RGB")
    width, height = rgb.size
    count = width * height
    data = rgb.tobytes()

    light = bytearray(count)
    for i in range(count):
        r, g, b = data[3 * i], data[3 * i + 1], data[3 * i + 2]
        low = min(r, g, b)
        if low >= min_light and max(r, g, b) - low <= spread:
            light[i] = 1

    neighbours = (-width - 1, -width, -width + 1, -1, 1, width - 1, width, width + 1)
    seen = bytearray(count)
    background = bytearray(count)

    def region(start: int) -> list[int]:
        """The connected light pixels around `start`, marked as seen."""
        seen[start] = 1
        stack = [start]
        members = []
        while stack:
            i = stack.pop()
            members.append(i)
            x = i % width
            for step in neighbours:
                j = i + step
                if 0 <= j < count and abs(j % width - x) <= 1 and light[j] and not seen[j]:
                    seen[j] = 1
                    stack.append(j)
        return members

    edge = [x for x in range(width)] + [(height - 1) * width + x for x in range(width)]
    edge += [y * width for y in range(height)] + [y * width + width - 1 for y in range(height)]
    for i in edge:
        if light[i] and not seen[i]:
            for member in region(i):
                background[member] = 1
    for i in range(count):
        if light[i] and not seen[i]:
            members = region(i)
            if len(members) >= pocket:
                for member in members:
                    background[member] = 1

    opaque = Image.frombytes("L", (width, height), bytes(background).translate(bytes([255, 0] + [0] * 254)))
    alpha = opaque.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
    cut = rgb.convert("RGBA")
    cut.putalpha(alpha)
    return cut


for name, original, widths, quality in PHOTOS:
    photo = Image.open(SOURCE / original).convert("RGB")
    for width in widths:
        save(resized(photo, width), f"{name}-{width}", quality)

for name, original, widths, quality, alpha_quality, checkerboard in CUTOUTS:
    art = Image.open(SOURCE / original).convert("RGBA")
    if checkerboard:
        art = knock_out_checkerboard(art)
    for width in widths:
        save(resized(art, width), f"{name}-{width}", quality, alpha_quality)

# Cut to what is drawn before they are sized, so a crest painted with wide transparent margins is as big as the others.
TRIMMED = {
    "hierarchy-tree", "lion-raven", "guild-coletor", "guild-agricultor", "guild-domador",
}

# Crests whose edge is so intricate that the default transparency quality is most of their weight.
ALPHA_QUALITY = {"hierarchy-tree": 40}

# Originals whose background removal left dark specks around the figure.
SPECKLED = {"Brasão Coletor.png", "arvore hierarquica.png", "brasão domador.png"}

# Originals that are a figure printed on a dark ground, with no transparency of their own.
LIFTED = {"brasão logo.jpg"}

# Crests whose "transparency" is a checkerboard painted into the pixels (see knock_out_checkerboard).
CHECKERED = {"brasão agricultor.png"}


def lift_from_dark(image: Image.Image) -> Image.Image:
    """A one-colour figure on a dark ground, as the figure on transparency, cut to it. The ground is the median
    brightness (the picture is mostly ground), the figure what the brightest 2% reach; between the two the
    transparency ramps, so the edges and the print's specks stay soft."""
    rgb = image.convert("RGB")
    lum = rgb.convert("L")
    hist = lum.histogram()
    total_pixels = sum(hist)
    seen, ground = 0, 0
    for value, count in enumerate(hist):
        seen += count
        if seen >= total_pixels / 2:
            ground = value
            break
    seen, top = 0, 255
    for value in range(255, -1, -1):
        seen += hist[value]
        if seen >= total_pixels * 0.02:
            top = value
            break
    low = ground + 22
    high = max(low + 1, int(top * 0.82))
    alpha = lum.point(lambda v: 0 if v <= low else 255 if v >= high else round((v - low) * 255 / (high - low)))
    full = alpha.point(lambda v: 255 if v == 255 else 0)
    flat = rgb.get_flattened_data() if hasattr(rgb, "get_flattened_data") else rgb.getdata()
    covered = [pixel for pixel, mark in zip(flat, full.get_flattened_data() if hasattr(full, "get_flattened_data") else full.getdata()) if mark]
    colour = tuple(sorted(pixel[channel] for pixel in covered)[len(covered) // 2] for channel in range(3))
    figure = Image.new("RGBA", rgb.size, colour + (0,))
    figure.putalpha(alpha)
    return figure.crop(alpha.point(lambda v: 255 if v > 24 else 0).getbbox())


def drop_specks(image: Image.Image, keep_share: float = 0.02) -> Image.Image:
    """Clears the specks a background removal left around a figure: the visible pixels are grouped into patches that
    touch (on a half-size copy, grown a little so a thin line still joins what it joins), and a patch smaller than
    `keep_share` of the largest goes transparent. The same as the game's tools/make-ui-images.py."""
    alpha = image.getchannel("A")
    width, height = alpha.size
    small = alpha.point(lambda value: 255 if value > 16 else 0).filter(ImageFilter.MaxFilter(3)).resize((width // 2, height // 2), Image.NEAREST)
    sw, sh = small.size
    pixels = small.load()
    label = [0] * (sw * sh)
    sizes = [0]
    for y in range(sh):
        for x in range(sw):
            if not pixels[x, y] or label[y * sw + x]:
                continue
            current = len(sizes)
            label[y * sw + x] = current
            stack = [(x, y)]
            count = 0
            while stack:
                cx, cy = stack.pop()
                count += 1
                for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                    if 0 <= nx < sw and 0 <= ny < sh and pixels[nx, ny] and not label[ny * sw + nx]:
                        label[ny * sw + nx] = current
                        stack.append((nx, ny))
            sizes.append(count)
    largest = max(sizes[1:], default=0)
    keep = {index for index in range(1, len(sizes)) if sizes[index] >= largest * keep_share}
    mask = Image.new("L", (sw, sh), 0)
    marks = mask.load()
    for y in range(sh):
        for x in range(sw):
            if label[y * sw + x] in keep:
                marks[x, y] = 255
    mask = mask.resize((width, height), Image.NEAREST).filter(ImageFilter.MaxFilter(5))
    cleaned = image.copy()
    cleaned.putalpha(ImageChops.darker(alpha, mask))
    return cleaned


for name, original, width, quality in CRESTS:
    art = Image.open(SOURCE / original).convert("RGBA")
    if original in LIFTED:
        art = lift_from_dark(art)
    if original in CHECKERED:
        art = knock_out_checkerboard(art)
    if original in SPECKLED:
        art = drop_specks(art)
    if name in TRIMMED:
        art = art.crop(art.getbbox())
    save(resized(art, width), name, quality, ALPHA_QUALITY.get(name, 80))

# Icons from the logo: favicon.ico (16, 32, 48) and apple-touch-icon (180). The emblem is taller than wide, so it is
# centred on a square, a little inside it.
emblem = lift_from_dark(Image.open(SOURCE / "brasão logo.jpg"))
side = round(max(emblem.size) * 1.08)
logo = Image.new("RGBA", (side, side), (0, 0, 0, 0))
logo.alpha_composite(emblem, ((side - emblem.width) // 2, (side - emblem.height) // 2))
TARGET.parent.mkdir(parents=True, exist_ok=True)
square = Image.new("RGBA", logo.size, ICON_BACKGROUND + (255,))
square.alpha_composite(logo)
square = square.convert("RGB")
square.resize((180, 180), Image.LANCZOS).save(TARGET.parent / "apple-touch-icon.png", optimize=True)
logo.resize((48, 48), Image.LANCZOS).save(TARGET.parent / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
# The installable icons the web manifest (public/site.webmanifest) names: the emblem kept inside the middle 70% of a
# black square, the part a phone's mask (a circle, a rounded square) always shows.
padded_side = round(max(emblem.size) / 0.7)
padded = Image.new("RGBA", (padded_side, padded_side), ICON_BACKGROUND + (255,))
padded.alpha_composite(emblem, ((padded_side - emblem.width) // 2, (padded_side - emblem.height) // 2))
for px in (192, 512):
    padded.convert("RGB").resize((px, px), Image.LANCZOS).save(TARGET.parent / f"icon-{px}.png", optimize=True)
for icon in ("apple-touch-icon.png", "favicon.ico", "icon-192.png", "icon-512.png"):
    size = (TARGET.parent / icon).stat().st_size
    total += size
    print(f"{icon:28} {'':11} {size / 1024:7.1f} KB")

print(f"{'total':28} {'':11} {total / 1024:7.1f} KB")
