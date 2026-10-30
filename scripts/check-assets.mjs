// Fails the build when the site points at a picture or a video that is not there, and lists the ones nothing uses.
// It runs before every build (npm's "prebuild"), so a typo in a file name never reaches the published site.
//
// A reference is any "img/<file>" (or "video/<file>") written in a template, a stylesheet or a component; the bare file names in
// src/app/content (the crests, which the templates join to "img/"); the files index.html asks for at the root
// (the icons); and the social-card picture the Seo service names.
//
// The paths are relative ("img/x.webp", never "/img/x.webp"; "video/x.mp4", never "/video/x.mp4"): they resolve against
// <base href>, which is /kcd_2_ui/ on GitHub Pages and / on a domain of its own, so one build works in both places.

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const pictures = readdirSync(join(root, 'public', 'img'));
const videoDir = join(root, 'public', 'video');
const videos = existsSync(videoDir) ? readdirSync(videoDir) : [];

/** Every file under `dir` whose name ends with one of `extensions`, specs left out. */
function walk(dir, extensions) {
  const found = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...walk(path, extensions));
    } else if (
      extensions.some((ext) => entry.name.endsWith(ext)) &&
      !entry.name.endsWith('.spec.ts')
    ) {
      found.push(path);
    }
  }
  return found;
}

const used = new Set();
const usedVideos = new Set();
const missing = [];

function expectPicture(name, where) {
  used.add(name);
  if (!pictures.includes(name)) {
    missing.push(`public/img/${name}  (in ${where})`);
  }
}

function expectVideo(name, where) {
  usedVideos.add(name);
  if (!videos.includes(name)) {
    missing.push(`public/video/${name}  (in ${where})`);
  }
}

function expectRootFile(name, where) {
  if (!existsSync(join(root, 'public', name))) {
    missing.push(`public/${name}  (in ${where})`);
  }
}

const sources = [...walk(join(root, 'src'), ['.html', '.ts', '.css'])];
for (const file of sources) {
  const text = readFileSync(file, 'utf8');
  const where = file.slice(root.length).replaceAll('\\', '/');

  for (const match of text.matchAll(/\bimg\/([\w.-]+\.(?:webp|png|jpe?g|svg|gif|avif))/g)) {
    expectPicture(match[1], where);
  }
  // A root-absolute path breaks under GitHub Pages, where the site is not at the root.
  for (const match of text.matchAll(/["'\s,(]\/img\/[\w.-]+/g)) {
    missing.push(`${match[0].slice(1)} must be relative (img/..., not /img/...)  (in ${where})`);
  }
  for (const match of text.matchAll(/\bvideo\/([\w.-]+\.(?:mp4|webm))/g)) {
    expectVideo(match[1], where);
  }
  for (const match of text.matchAll(/["'\s,(]\/video\/[\w.-]+/g)) {
    missing.push(
      `${match[0].slice(1)} must be relative (video/..., not /video/...)  (in ${where})`,
    );
  }
  if (where.startsWith('src/app/content/')) {
    for (const match of text.matchAll(/['"]([\w-]+\.(?:webp|png|jpe?g|svg))['"]/g)) {
      expectPicture(match[1], where);
    }
  }
  if (where === 'src/app/core/seo.ts') {
    for (const match of text.matchAll(/path:\s*'\/([\w.-]+\.(?:jpe?g|png))'/g)) {
      expectRootFile(match[1], where);
    }
  }
  if (where === 'src/index.html') {
    for (const match of text.matchAll(
      /<link[^>]*rel="(?:icon|apple-touch-icon|manifest)"[^>]*href="([^"/]+)"/g,
    )) {
      expectRootFile(match[1], where);
    }
  }
}

if (missing.length > 0) {
  console.error(
    'check-assets: these files are named but are not in public/:\n  ' + missing.join('\n  '),
  );
  process.exit(1);
}

/** The size of a WebP file, read from its header (the three kinds the encoders write), or null for anything else. */
function webpSize(file) {
  const bytes = readFileSync(file);
  if (bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WEBP') {
    return null;
  }
  const kind = bytes.toString('ascii', 12, 16);
  if (kind === 'VP8 ') {
    return { width: bytes.readUInt16LE(26) & 0x3fff, height: bytes.readUInt16LE(28) & 0x3fff };
  }
  if (kind === 'VP8L') {
    const bits = bytes.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (kind === 'VP8X') {
    return { width: 1 + bytes.readUIntLE(24, 3), height: 1 + bytes.readUIntLE(27, 3) };
  }
  return null;
}

// A picture of a card is declared with its own size (the box keeps the right shape before it loads, and a picture declared in another shape is stretched or cut
// by whatever the page does with it): the size written in content/pitch.ts is the size of the file (2026-10-30: the family's panorama was declared as 1280 x 720).
const wrongSizes = [];
const pitch = readFileSync(join(root, 'src', 'app', 'content', 'pitch.ts'), 'utf8');
for (const match of pitch.matchAll(
  /large:\s*'([\w.-]+\.webp)'[\s\S]*?width:\s*(\d+),\s*height:\s*(\d+)/g,
)) {
  const real = webpSize(join(root, 'public', 'img', match[1]));
  if (real === null || real.width !== Number(match[2]) || real.height !== Number(match[3])) {
    wrongSizes.push(
      `${match[1]} is ${real === null ? 'not a WebP' : `${real.width}x${real.height}`} and content/pitch.ts says ${match[2]}x${match[3]}`,
    );
  }
}
if (wrongSizes.length > 0) {
  console.error(
    'check-assets: a picture is declared in another size than it has:\n  ' +
      wrongSizes.join('\n  '),
  );
  process.exit(1);
}

const unused = [
  ...pictures.filter((name) => !used.has(name)),
  ...videos.filter((name) => !usedVideos.has(name)).map((name) => `video/${name}`),
];
console.log(
  `check-assets: ${used.size} pictures and ${usedVideos.size} videos in use, all present` +
    (unused.length > 0 ? `; not used by anything: ${unused.join(', ')}` : ''),
);
