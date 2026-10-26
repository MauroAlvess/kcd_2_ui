import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { LiveStatus, UNKNOWN } from './core/server-status';
import { NAV, SITE } from './core/site';
import { ICONS } from './shared/ui/icon/icons';

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
    expect(ids).toEqual([
      'inicio',
      'reino',
      'guildas',
      'familia',
      'hierarquia',
      'posses',
      'apoio',
      'lore',
      'regras',
      'entrar',
    ]);
    // "Apoio" is the second half of "Posses": a band of its own, with no link of its own.
    // "Entrar" has its own buttons, and it closes the page.
    const linked = ids.slice(1).filter((id) => id !== 'apoio' && id !== 'entrar');
    expect(linked.map((id) => `#${id}`)).toEqual(NAV.map((item) => item.href));
  });

  it('keeps its chapter headings plain: a small label, the title, no numerals or ornaments', () => {
    const headings = Array.from(root.querySelectorAll('main .heading'));
    expect(headings.length).toBeGreaterThanOrEqual(8);
    for (const heading of headings) {
      expect(heading.querySelector('.numeral, .ornament')).toBeNull();
      expect(heading.querySelector('h2')).not.toBeNull();
    }
  });

  it('marks the small label of every section with a line drawing, the one its entry in the menu has', () => {
    const labels = Array.from(root.querySelectorAll('main section.section .eyebrow'));
    expect(labels).toHaveLength(9);
    for (const label of labels) {
      expect(label.querySelector('app-icon svg path'), label.textContent ?? '').not.toBeNull();
    }
    for (const item of NAV) {
      const label = root.querySelector(`main section${item.href} .eyebrow`);
      expect(label?.querySelector('path')?.getAttribute('d'), item.label).toBe(ICONS[item.icon][0]);
    }
  });

  it('names every section by a heading that exists', () => {
    const sections = root.querySelectorAll('main section[aria-labelledby]');
    expect(sections).toHaveLength(10);
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

  it('shows the poster of the basic rules in the rules, and the shield of the two houses in the history', () => {
    const poster = root.querySelector<HTMLImageElement>('#regras a.poster img');
    expect(poster?.getAttribute('src')).toBe('img/rules-640.webp');
    expect(poster?.getAttribute('alt')).toContain('Regras Básicas');
    expect(root.querySelector('#regras a.poster')?.getAttribute('href')).toBe(
      'img/rules-1024.webp',
    );
    const crest = root.querySelector<HTMLImageElement>('#lore img.crest');
    expect(crest?.getAttribute('src')).toBe('img/lion-raven.webp');
    expect(crest?.getAttribute('alt')).toContain('Leão');
    expect(crest?.getAttribute('alt')).toContain('Corvo');
  });

  it('tells what a player can have, one row each with its crest, and what a supporter receives, in two bands', () => {
    const have = root.querySelector('#posses') as HTMLElement;
    expect(have.classList.contains('light')).toBe(true);
    expect(have.querySelector('h2')?.textContent).toBe('Tenha ou receba');
    expect(Array.from(have.querySelectorAll('.item h3'), (title) => title.textContent)).toEqual([
      'Terras, casas, fazendas e castelos',
      'Cavalos',
      'Carroças',
      'Cachorros',
    ]);
    expect(
      Array.from(have.querySelectorAll('.item img'), (image) => image.getAttribute('src')),
    ).toEqual([
      'img/prop-crest.webp',
      'img/pet-cavalo.webp',
      'img/pet-carroca.webp',
      'img/pet-cachorro.webp',
    ]);

    const support = root.querySelector('#apoio') as HTMLElement;
    expect(support.classList.contains('dark')).toBe(true);
    expect(support.textContent).toContain('totalmente free');
    expect(Array.from(support.querySelectorAll('.gifts h3'), (gift) => gift.textContent)).toEqual([
      'Um cavalo',
      'Um cachorro',
      'Uma arma',
      'Roupas de nobre',
    ]);
    expect(support.querySelector('img.art')?.getAttribute('src')).toBe('img/apoiador.webp');
    expect(support.querySelector(`a[href="${SITE.discord}"]`)?.getAttribute('target')).toBe(
      '_blank',
    );
  });

  it('alternates paper and black bands all the way down; the way in, over its painting, closes the page', () => {
    const bands = Array.from(root.querySelectorAll('main section.section'));
    const tones = bands
      .filter((section) => !section.querySelector('.photo'))
      .map((section) => (section.classList.contains('dark') ? 'dark' : 'light'));
    expect(tones.length).toBe(8);
    expect(tones[0]).toBe('light');
    for (let at = 1; at < tones.length; at++) {
      expect(tones[at], `section ${at}`).not.toBe(tones[at - 1]);
    }
    expect(bands.at(-1)?.id).toBe('entrar');
    expect(bands.at(-1)?.querySelector('.photo')).not.toBeNull();
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
