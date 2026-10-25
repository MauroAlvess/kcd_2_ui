// A contact sheet of the site's line drawings (src/app/shared/ui/icon/icons.ts): each icon large on paper and on black, and at the
// sizes it is used, so a new one can be judged next to the others before it is put in a page.
//   node tools/make-icon-sheet.mjs sheet.html     (Node 24: it reads the TypeScript file as it is)
// Open the page in a browser, or take a picture of it with Edge:
//   msedge --headless=new --window-size=1560,1000 --screenshot=sheet.png file:///.../sheet.html
import { writeFileSync } from 'node:fs';

const out = process.argv[2];
if (!out) {
  console.error('usage: node tools/make-icon-sheet.mjs <out.html>');
  process.exit(1);
}

const { ICONS } = await import(new URL('../src/app/shared/ui/icon/icons.ts', import.meta.url).href);

/** The icon as the Icon component draws it: a 24 x 24 square, thin round stroke, nothing filled. */
const svg = (paths, size) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths
    .map((d) => `<path d="${d}"/>`)
    .join('')}</svg>`;

const cells = Object.entries(ICONS)
  .map(
    ([name, paths]) => `
  <figure>
    <div class="row">
      <div class="paper">${svg(paths, 96)}</div>
      <div class="black">${svg(paths, 96)}</div>
    </div>
    <div class="small"><span class="p">${svg(paths, 20)}</span><span class="b">${svg(paths, 20)}</span><span class="p">${svg(paths, 28)}</span></div>
    <figcaption>${name}</figcaption>
  </figure>`,
  )
  .join('\n');

writeFileSync(
  out,
  `<!doctype html><meta charset="utf-8"><title>Ícones do site</title><style>
  body { margin: 0; padding: 16px; background: #888; font: 13px system-ui; display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; width: 1500px; }
  figure { margin: 0; }
  .row { display: flex; }
  .paper, .black { padding: 8px; }
  .paper { background: #ece6da; color: #8a1b1b; }
  .black { background: #0f0d0b; color: #cbb69a; }
  .small { display: flex; gap: 10px; align-items: center; padding: 6px; background: #ece6da; }
  .small .p { color: #1d1915; }
  .small .b { background: #0f0d0b; color: #ece6da; padding: 4px; }
  figcaption { margin-top: 2px; }
</style>${cells}`,
);
console.log(`${Object.keys(ICONS).length} icons: ${out}`);
