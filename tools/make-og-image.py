"""Renders the card that chat apps and search results show for a link to the site: public/og-image-4.jpg.

    python tools/make-og-image.py

The picture is drawn by tools/og-image.html (1200 x 630, with the site's own fonts and photographs), so it is
photographed by a browser: Microsoft Edge or Google Chrome, whichever is installed, run without a window. Run it
again after changing the text, the logo or the photograph in that file; run `npm install` first, because the fonts
are read from node_modules.
"""

import os
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
PAGE = HERE / "og-image.html"
# The card has a number in its name (og-image-2.jpg from 2026-10-20, og-image-3.jpg from 2026-10-25, og-image-4.jpg since 2026-10-28, the banner): chat apps
# keep a link's picture by its address for days, so a new picture needs a new address. Change the number here, in src/app/core/seo.ts, in
# scripts/seo-files.mjs, in the README and in the specs when the card is redrawn, and delete the old file.
TARGET = HERE.parent / "public" / "og-image-4.jpg"

BROWSERS = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    "/usr/bin/microsoft-edge",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
]

browser = next((path for path in BROWSERS if os.path.exists(path)), None)
if browser is None:
    sys.exit("No Edge or Chrome found. Install one, or screenshot tools/og-image.html at 1200x630 yourself.")

fonts = HERE.parent / "node_modules" / "@fontsource" / "eb-garamond"
if not fonts.exists():
    sys.exit("The fonts are not installed: run `npm install` in the site folder first.")

with tempfile.TemporaryDirectory() as folder:
    shot = Path(folder) / "card.png"
    subprocess.run(
        [
            browser,
            "--headless",
            "--disable-gpu",
            "--no-sandbox",
            "--hide-scrollbars",
            "--force-device-scale-factor=1",
            "--virtual-time-budget=6000",
            f"--screenshot={shot}",
            "--window-size=1200,630",
            PAGE.as_uri(),
        ],
        check=True,
        capture_output=True,
    )
    image = Image.open(shot).convert("RGB")
    if image.size != (1200, 630):
        sys.exit(f"The browser drew {image.size}, not 1200x630.")
    image.save(TARGET, format="JPEG", quality=86, optimize=True, progressive=True)

print(f"{TARGET.name}: 1200x630, {TARGET.stat().st_size / 1024:.0f} KB")
