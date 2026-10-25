import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LiveStatus, UNKNOWN } from '../../core/server-status';
import { SITE } from '../../core/site';
import { Hero } from './hero';

describe('Hero', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
      providers: [
        { provide: LiveStatus, useValue: { status: signal(UNKNOWN), start: () => undefined } },
      ],
    }).compileComponents();
  });

  async function render(): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(Hero);
    await fixture.whenStable();
    return fixture.nativeElement;
  }

  it('shows the picture of the duel in the tourney yard, asked for first, in three sizes and with no video', async () => {
    const root = await render();
    const still = root.querySelector<HTMLImageElement>('img.still')!;
    expect(still.getAttribute('src')).toBe('img/hero-1920.webp');
    expect(still.getAttribute('srcset')).toBe(
      'img/hero-960.webp 960w, img/hero-1920.webp 1920w, img/hero-2560.webp 2560w',
    );
    expect(still.getAttribute('fetchpriority')).toBe('high');
    expect(still.getAttribute('loading')).toBeNull();
    expect(still.closest('[aria-hidden="true"]')).not.toBeNull();
    expect(root.querySelector('video')).toBeNull();
  });

  it('names the server with the lettering the user made, and keeps the words in the h1 for a screen reader and a crawler (2026-10-25)', async () => {
    const root = await render();
    const h1 = root.querySelector('h1#hero-title')!;
    expect(h1.textContent?.trim()).toBe('Kingdom Come: Deliverance II RP Brasil');
    expect(h1.querySelector('.sr-only')?.textContent).toBe(
      'Kingdom Come: Deliverance II RP Brasil',
    );
    const title = h1.querySelector<HTMLImageElement>('img.title')!;
    expect(title.getAttribute('alt'), 'the words are said once, by the h1').toBe('');
    expect(title.getAttribute('src')).toBe('img/title-1280.webp');
    expect(title.getAttribute('srcset')).toBe('img/title-640.webp 640w, img/title-1280.webp 1280w');
    expect(title.getAttribute('width')).toBe('1280');
    expect(title.getAttribute('height')).toBe('536');
    expect(title.getAttribute('fetchpriority')).toBe('high');
    expect(title.getAttribute('loading')).toBeNull();
    expect(root.querySelector('.game, .name'), 'the old title in words is gone').toBeNull();
    expect(root.querySelector('.claim')?.previousElementSibling).toBe(h1);
  });

  it('says the story in one line and offers two things: the Discord, and the launcher to download', async () => {
    const root = await render();
    expect(root.querySelector('.claim')?.textContent).toContain('A coroa de Kuttenberg');
    const actions = root.querySelectorAll<HTMLAnchorElement>('.actions a');
    expect(actions).toHaveLength(2);
    expect(actions[0].getAttribute('href')).toBe(SITE.discord);
    expect(actions[1].getAttribute('href')).toBe(SITE.launcher);
    expect(actions[1].textContent).toContain('Baixar launcher');
    expect(actions[1].getAttribute('target')).toBeNull();
  });
});
