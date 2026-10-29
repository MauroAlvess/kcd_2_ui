// Writes public/robots.txt and public/sitemap.xml from the public address in src/site.config.json.
// It runs before every build (npm's "prebuild"). While the address is empty it writes a robots.txt that allows
// everything and no sitemap: a sitemap with made-up links would be worse than none.
//
// The address may have a path (https://mauroalvess.github.io/kcd_2_ui on GitHub Pages). Search engines only read a
// robots.txt at a domain's root, so under a path it is written but ignored, and the sitemap is handed to Google
// Search Console by its full address instead.

import { readFileSync, rmSync, writeFileSync } from 'node:fs';

const config = JSON.parse(
  readFileSync(new URL('../src/site.config.json', import.meta.url), 'utf8'),
);
const robots = new URL('../public/robots.txt', import.meta.url);
const sitemap = new URL('../public/sitemap.xml', import.meta.url);

const url = String(config.url ?? '')
  .trim()
  .replace(/\/+$/, '');

if (url !== '' && !/^https?:\/\/[^\s/]+(?:\/[^\s/]+)*$/.test(url)) {
  throw new Error(
    `site.config.json: "url" must look like https://example.com.br or https://user.github.io/repo (no spaces), got "${url}"`,
  );
}

if (url === '') {
  writeFileSync(robots, 'User-agent: *\nAllow: /\n');
  rmSync(sitemap, { force: true });
  console.log(
    'seo-files: no "url" in src/site.config.json yet, so robots.txt has no Sitemap line and there is no sitemap.xml',
  );
} else {
  writeFileSync(robots, `User-agent: *\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n`);
  const today = new Date().toISOString().slice(0, 10);
  // The page's own pictures, for the image search: the card a link shows and the banner of the opening.
  const images = ['og-image-5.jpg', 'img/hero-1920.webp']
    .map(
      (path) =>
        `    <image:image>\n      <image:loc>${url}/${path}</image:loc>\n    </image:image>\n`,
    )
    .join('');
  writeFileSync(
    sitemap,
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n  <url>\n    <loc>${url}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n${images}  </url>\n</urlset>\n`,
  );
  console.log(`seo-files: robots.txt and sitemap.xml written for ${url}`);
}
