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

  it('reads as the hero and six sections in the order the navigation lists them', () => {
    const ids = Array.from(root.querySelectorAll('main section[id]'), (section) => section.id);
    expect(ids).toEqual([
      'inicio',
      'guildas',
      'familia',
      'faccoes',
      'hierarquia',
      'lore',
      'midias',
      'entrar',
    ]);
  });

  it('names every section by a heading that exists', () => {
    const sections = root.querySelectorAll('main section[aria-labelledby]');
    expect(sections).toHaveLength(8);
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

  it('never downloads a video before it is played, and plays none by itself', () => {
    const videos = Array.from(root.querySelectorAll('video'));
    expect(videos.length).toBeGreaterThan(0);
    for (const video of videos) {
      expect(video.getAttribute('preload')).toBe('none');
      expect(video.hasAttribute('autoplay')).toBe(false);
      expect(video.getAttribute('poster'), 'a video shows a frame while it waits').toBeTruthy();
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

  it('offers one thing in the opening, the Discord, and keeps the launcher and the Discord button out of the bar', () => {
    const actions = Array.from(root.querySelectorAll<HTMLAnchorElement>('#inicio .actions a'));

    expect(actions).toHaveLength(1);
    expect(actions[0].getAttribute('href')).toBe(SITE.discord);
    expect(root.querySelector('app-header a[href="' + SITE.discord + '"]')).toBeNull();
    expect(root.textContent ?? '').not.toContain('Baixar launcher');
  });

  it('shows the two houses by their crests alone, with no battle picture between them', () => {
    const factions = root.querySelector('#faccoes') as HTMLElement;
    expect(factions.querySelectorAll('img')).toHaveLength(2);
    expect(factions.querySelector('.duel')).toBeNull();
    expect(factions.querySelectorAll('app-house-card')).toHaveLength(2);
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
