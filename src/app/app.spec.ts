import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { LiveStatus, UNKNOWN } from './core/server-status';
import { SITE } from './core/site';

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

  it('has one h1, the claim with the name of the server in it, and it is the first heading', () => {
    const h1 = root.querySelectorAll('h1');
    expect(h1).toHaveLength(1);
    expect(h1[0].textContent).toContain('Kingdom Come: Deliverance II');
    expect(h1[0].textContent).toContain('RP Brasil');
    expect(root.querySelector('h1, h2, h3')).toBe(h1[0]);
  });

  it('reads as the opening, the chapters in the order of the story, and the way in', () => {
    const ids = Array.from(root.querySelectorAll('main section[id]'), (section) => section.id);
    expect(ids).toEqual(['topo', 'reino', 'casas', 'guildas', 'hierarquia', 'lore', 'entrar']);
  });

  it('keeps the small label of every section plain: its words, with no drawing before them', () => {
    const labels = Array.from(root.querySelectorAll('main section .eyebrow'));
    expect(labels.map((label) => label.textContent?.trim())).toEqual([
      'O primeiro RP brasileiro de KCD II',
      'O reino',
      'As duas casas',
      'Guildas',
      'Hierarquia',
      'Crônica · 1402 – 1403',
      'Um reino à espera',
    ]);
    for (const label of labels) {
      expect(label.querySelector('app-icon, svg'), label.textContent ?? '').toBeNull();
    }
  });

  it('names every section by a heading that exists', () => {
    const sections = root.querySelectorAll('main section[aria-labelledby]');
    expect(sections).toHaveLength(7);
    sections.forEach((section) => {
      const heading = root.querySelector(`#${section.getAttribute('aria-labelledby')}`);
      expect(heading, section.id).not.toBeNull();
      expect(['H1', 'H2']).toContain(heading?.tagName);
    });
  });

  it('points every link inside the page at something that is there', () => {
    const anchors = Array.from(root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    expect(anchors.length).toBeGreaterThan(3);
    for (const anchor of anchors) {
      const target = anchor.getAttribute('href')!;
      expect(root.querySelector(target), target).not.toBeNull();
    }
  });

  it('gives every image a text alternative (empty when it only decorates) and its size, so the page does not jump while it loads', () => {
    const images = Array.from(root.querySelectorAll('img'));
    expect(images.length).toBeGreaterThan(20);
    for (const image of images) {
      const src = image.getAttribute('src') ?? '';
      expect(image.hasAttribute('alt'), src).toBe(true);
      expect(image.getAttribute('width'), src).toBeTruthy();
      expect(image.getAttribute('height'), src).toBeTruthy();
    }
  });

  it('sends the Discord link, from the bar, the opening, the closing call and the foot of the page, to a new tab', () => {
    const discord = Array.from(
      root.querySelectorAll<HTMLAnchorElement>(`a[href="${SITE.discord}"]`),
    );
    expect(discord.length).toBeGreaterThanOrEqual(4);
    for (const link of discord) {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
    }
  });

  it('offers the Discord and the launcher in the bar, in the opening and in the closing call', () => {
    for (const where of ['app-header .buttons', '#topo .actions', '#entrar .actions']) {
      const links = Array.from(root.querySelectorAll<HTMLAnchorElement>(`${where} a`));
      expect(links.map((link) => link.getAttribute('href')).sort(), where).toEqual(
        [SITE.discord, SITE.launcher].sort(),
      );
    }
  });

  it('shows the two crests of the houses and the eight of the guilds, all from the new set', () => {
    expect(
      Array.from(root.querySelectorAll('#casas img.crest'), (image) => image.getAttribute('src')),
    ).toEqual(['img/brasao-leao.webp', 'img/brasao-corvo.webp']);
    expect(root.querySelectorAll('#guildas .frame img')).toHaveLength(8);
  });

  it('puts the map of the region in the history, beside the story in seven lines', () => {
    expect(root.querySelector('#lore .map img')?.getAttribute('alt')).toContain('Kuttenberg');
    expect(root.querySelectorAll('#lore .episode')).toHaveLength(7);
  });

  it('has no map of the houses, no supporter band, no rules, no family band and no holdings band', () => {
    expect(root.querySelector('#apoio, #regras, #familia, #posses')).toBeNull();
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

  it('has a way past the menu for a keyboard, as the first thing to land on', () => {
    const skip = root.querySelector<HTMLAnchorElement>('a.skip');
    expect(skip?.getAttribute('href')).toBe('#conteudo');
    expect(root.querySelector('main#conteudo')).not.toBeNull();
    expect(root.firstElementChild).toBe(skip);
  });

  it('shows the players online in the opening and in the closing call', () => {
    const badges = Array.from(root.querySelectorAll('app-server-badge'));
    expect(badges).toHaveLength(2);
    expect(root.querySelector('#topo app-server-badge')).not.toBeNull();
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
