import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { LiveStatus, UNKNOWN } from './core/server-status';
import { NAV, SITE } from './core/site';

describe('App', () => {
  let root: HTMLElement;

  beforeEach(async () => {
    // The numbers come from the network: a test never asks for them.
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: LiveStatus, useValue: { status: signal(UNKNOWN), start: () => undefined } },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(App);
    root = fixture.nativeElement;
    await fixture.whenStable();
  });

  afterEach(() => vi.restoreAllMocks());

  it('has one h1, the name of the server, and it is the first heading', () => {
    const h1 = root.querySelectorAll('h1');
    expect(h1).toHaveLength(1);
    expect(h1[0].textContent).toContain('Kingdom Come: Deliverance II');
    expect(h1[0].textContent).toContain('RP Brasil');
    expect(root.querySelector('h1, h2, h3')).toBe(h1[0]);
  });

  it('has a section for every link of the navigation', () => {
    for (const item of NAV) {
      expect(root.querySelector(`main section${item.href}`), item.href).not.toBeNull();
    }
  });

  it('reads as the opening, the chapters in the order the navigation lists them, and the way in', () => {
    const ids = Array.from(root.querySelectorAll('main section[id]'), (section) => section.id);
    expect(ids).toEqual(['inicio', 'reino', 'guildas', 'hierarquia', 'lore', 'entrar']);
    // "Entrar" has its own buttons, and it closes the page.
    const linked = ids.slice(1).filter((id) => id !== 'entrar');
    expect(linked.map((id) => `#${id}`)).toEqual(NAV.map((item) => item.href));
  });

  it('keeps its chapter headings plain: a small label, the title, no numerals or ornaments', () => {
    const headings = Array.from(root.querySelectorAll('main .heading'));
    expect(headings.length).toBeGreaterThanOrEqual(5);
    for (const heading of headings) {
      expect(heading.querySelector('.numeral, .ornament')).toBeNull();
      expect(heading.querySelector('h2')).not.toBeNull();
    }
  });

  it('keeps the small label of every section plain: its words, with no drawing before them (user, 2026-10-28: "sem frufru")', () => {
    const labels = Array.from(root.querySelectorAll('main section.section .eyebrow'));
    expect(labels.map((label) => label.textContent?.trim())).toEqual([
      'O reino',
      'Guildas',
      'Hierarquia',
      'Lore · Boêmia, 1402–1403',
      'Entrar',
    ]);
    for (const label of labels) {
      expect(label.querySelector('app-icon, svg'), label.textContent ?? '').toBeNull();
    }
  });

  it('names every section by a heading that exists', () => {
    const sections = root.querySelectorAll('main section[aria-labelledby]');
    expect(sections).toHaveLength(6);
    sections.forEach((section) => {
      const heading = root.querySelector(`#${section.getAttribute('aria-labelledby')}`);
      expect(heading, section.id).not.toBeNull();
      expect(['H1', 'H2']).toContain(heading?.tagName);
    });
  });

  it('points every link inside the page at something that is there', () => {
    const anchors = Array.from(root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    expect(anchors.length).toBeGreaterThan(10);
    for (const anchor of anchors) {
      const target = anchor.getAttribute('href')!;
      expect(root.querySelector(target), target).not.toBeNull();
    }
  });

  it('gives every image a text alternative (empty when it only decorates)', () => {
    const images = Array.from(root.querySelectorAll('img'));
    expect(images.length).toBeGreaterThan(10);
    for (const image of images) {
      expect(image.hasAttribute('alt'), image.getAttribute('src') ?? '').toBe(true);
    }
  });

  it('gives every image that is not a background its size, so the page does not jump while it loads', () => {
    const images = Array.from(root.querySelectorAll('img')).filter(
      (image) => !image.closest('.photo'),
    );
    for (const image of images) {
      expect(image.getAttribute('width'), image.getAttribute('src') ?? '').toBeTruthy();
      expect(image.getAttribute('height'), image.getAttribute('src') ?? '').toBeTruthy();
    }
  });

  it('sends the Discord link, from the opening, the welcome card and the foot of the page, to a new tab', () => {
    const discord = Array.from(
      root.querySelectorAll<HTMLAnchorElement>(`a[href="${SITE.discord}"]`),
    );
    expect(discord.length).toBeGreaterThanOrEqual(3);
    for (const link of discord) {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
    }
  });

  it('offers two things in the opening, the Discord and the launcher, and keeps both out of the bar', () => {
    const actions = Array.from(root.querySelectorAll<HTMLAnchorElement>('#inicio .actions a'));

    expect(actions.map((link) => link.getAttribute('href'))).toEqual([SITE.discord, SITE.launcher]);
    expect(root.querySelector('app-header a[href="' + SITE.discord + '"]')).toBeNull();
    expect(root.querySelector('app-header a[href="' + SITE.launcher + '"]')).toBeNull();
  });

  it('shows the shield of the two houses in the history', () => {
    const crest = root.querySelector<HTMLImageElement>('#lore img.crest');
    expect(crest?.getAttribute('src')).toBe('img/lion-raven.webp');
    expect(crest?.getAttribute('alt')).toContain('Leão');
    expect(crest?.getAttribute('alt')).toContain('Corvo');
  });

  it('tells what the realm offers in four short lines, and shows the game in three pictures of its own', () => {
    const pitch = root.querySelector('#reino') as HTMLElement;
    expect(pitch.querySelector('h2')?.textContent).toBe('Ninguém nasce nobre');
    expect(Array.from(pitch.querySelectorAll('.pillar h3'), (title) => title.textContent)).toEqual([
      'Um ofício',
      'Uma família',
      'Um teto',
      'Uma coroa',
    ]);
    const shots = Array.from(pitch.querySelectorAll<HTMLImageElement>('.shot img'));
    expect(shots.map((image) => image.getAttribute('src'))).toEqual([
      'img/shot-taverna-1200.webp',
      'img/shot-duelo-1200.webp',
      'img/shot-vila-1200.webp',
    ]);
    for (const image of shots) {
      expect(image.getAttribute('srcset')).toContain('720w');
      expect(image.getAttribute('alt')?.length).toBeGreaterThan(30);
    }
  });

  it('has no map of the houses, no supporter band, no rules, no family band and no holdings band any more (user, 2026-10-28)', () => {
    expect(root.querySelector('#apoio, #regras, #familia, #posses')).toBeNull();
    expect(
      root.querySelector(
        'img[src*="map-"], img[src*="apoiador"], img[src*="rules-"], img[src*="tree-crest"], img[src*="prop-crest"], img[src*="pet-"]',
      ),
    ).toBeNull();
  });

  it('keeps every band black, with no card and no picture under paper; the way in, over its painting, closes the page', () => {
    const bands = Array.from(root.querySelectorAll('main section.section'));
    expect(bands.map((section) => section.id)).toEqual([
      'reino',
      'guildas',
      'hierarquia',
      'lore',
      'entrar',
    ]);
    expect(
      root.querySelector('main .card .paper-photo, main .wrap.card, main .frame, main .light'),
    ).toBeNull();
    expect(bands.at(-1)?.querySelector('.photo')).not.toBeNull();
  });

  it('opens the page with the lion in the top left of the first band after the opening and closes it with the raven in the bottom right of the last band above the way in, and nowhere else', () => {
    const cornered = Array.from(root.querySelectorAll('main section.section')).filter(
      (section) => section.querySelector(':scope > img.corner') !== null,
    );
    expect(cornered.map((section) => section.id)).toEqual(['reino', 'lore']);
    const [first, last] = cornered;
    expect(first.querySelector(':scope > img.corner.lion')?.getAttribute('src'), first.id).toBe(
      'img/corner-lion.webp',
    );
    expect(first.querySelectorAll(':scope > img.corner')).toHaveLength(1);
    expect(last.querySelector(':scope > img.corner.raven')?.getAttribute('src'), last.id).toBe(
      'img/corner-raven.webp',
    );
    expect(last.querySelectorAll(':scope > img.corner')).toHaveLength(1);
    for (const corner of root.querySelectorAll('main img.corner')) {
      expect(corner.getAttribute('alt')).toBe('');
      expect(corner.getAttribute('aria-hidden')).toBe('true');
    }
  });

  it('lets the heading and the main blocks of every chapter show themselves as the page is read down to them', () => {
    // In the browser the blocks below the screen are held back and shown on arrival (`shared/ui/reveal`); the directive's own
    // custom property is on each block it looks after, and tells here which ones those are.
    const watched = (element: Element) =>
      (element as HTMLElement).style.getPropertyValue('--reveal-delay') !== '';
    const chapters = Array.from(root.querySelectorAll('main section.section'));
    expect(chapters).toHaveLength(5);
    for (const chapter of chapters) {
      expect(watched(chapter.querySelector('.heading')!), `${chapter.id}: heading`).toBe(true);
    }
    expect(
      Array.from(root.querySelectorAll('#guildas li')).filter((item) => watched(item)),
    ).toHaveLength(8);
    expect(
      Array.from(root.querySelectorAll('#reino .pillar')).filter((item) => watched(item)),
    ).toHaveLength(4);
    expect(
      Array.from(root.querySelectorAll('#reino .shots li')).filter((item) => watched(item)),
    ).toHaveLength(3);
    // The first of a row comes at once, and the next ones after it.
    const guilds = Array.from(root.querySelectorAll<HTMLElement>('#guildas li'));
    expect(
      guilds.slice(0, 5).map((guild) => guild.style.getPropertyValue('--reveal-delay')),
    ).toEqual(['0ms', '90ms', '180ms', '270ms', '0ms']);
    // Nothing is held back in a page that has not been opened in a browser (jsdom has no way to watch for the reader).
    expect(root.querySelectorAll('.reveal-wait')).toHaveLength(0);
  });

  it('keeps the payment out of the page: no Pix, no QR, no amount', () => {
    const text = root.textContent ?? '';
    expect(text).not.toMatch(/\bpix\b/i);
    expect(text).not.toMatch(/\bqr\b/i);
    expect(text).not.toMatch(/R\$\s*\d/);
  });

  it('puts a circle with a down arrow in the corner, pointing at the first chapter', () => {
    const hint = root.querySelector<HTMLAnchorElement>('app-scroll-hint a.hint');
    expect(hint?.getAttribute('href')).toBe('#reino');
  });

  it('keeps the opening to its words: no frame, no corner pieces, no cue', () => {
    const hero = root.querySelector('#inicio') as HTMLElement;
    expect(hero.querySelector('.frame, .corner, a.cue, img.emblem')).toBeNull();
  });

  it('offers the Discord and the launcher at the way in too, and sends the newcomer to the whitelist, the launcher and the rules without naming a faction the page no longer has', () => {
    const join = root.querySelector('#entrar') as HTMLElement;
    const links = Array.from(join.querySelectorAll<HTMLAnchorElement>('.actions a'));
    expect(links.map((link) => link.getAttribute('href'))).toEqual([SITE.discord, SITE.launcher]);
    const steps = join.textContent ?? '';
    expect(steps).toContain('perfil da Steam');
    expect(steps).toContain('Baixe o launcher');
    expect(steps).toContain('aceite as regras');
    expect(steps).toContain('gratuito');
    expect(steps.toLowerCase()).not.toContain('facção');
  });

  it('has a way past the menu for a keyboard, as the first thing to land on', () => {
    const skip = root.querySelector<HTMLAnchorElement>('a.skip');
    expect(skip?.getAttribute('href')).toBe('#conteudo');
    expect(root.querySelector('main#conteudo')).not.toBeNull();
    expect(root.firstElementChild).toBe(skip);
  });

  it('shows the players online in the opening and in the welcome card', () => {
    const badges = Array.from(root.querySelectorAll('app-server-badge'));

    expect(badges).toHaveLength(2);
    expect(root.querySelector('#inicio app-server-badge')).not.toBeNull();
    expect(root.querySelector('#entrar app-server-badge')).not.toBeNull();
    for (const badge of badges) {
      expect(badge.querySelector('[role="status"]')).not.toBeNull();
    }
  });

  it('never writes the address of the server in the page', () => {
    expect(root.innerHTML).not.toMatch(/\b(?:\d{1,3}\.){3}\d{1,3}\b/);
  });

  it('does not call the server by its old name any more', () => {
    expect(root.textContent ?? '').not.toMatch(/Leon\s*&\s*Crow/i);
  });

  it('says in plain text what the site is about, for the searches it wants to be found by', () => {
    const text = (root.textContent ?? '').toLowerCase();
    for (const phrase of [
      'kingdom come: deliverance ii',
      'deliverance 2',
      'kcd 2',
      'kingdom rp brasil',
      'rp brasil',
      'servidor de roleplay',
      'hierarquia',
      'burgrave',
      'whitelist',
      'discord',
      'guilda',
      'kuttenberg',
      'boêmia',
    ]) {
      expect(text, phrase).toContain(phrase);
    }
  });
});
