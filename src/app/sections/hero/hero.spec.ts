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

  it('shows the banner, asked for first, in two sizes, cut to its middle on a phone, and with no video', async () => {
    const root = await render();
    const still = root.querySelector<HTMLImageElement>('img.still')!;
    expect(still.getAttribute('src')).toBe('img/banner-1920.webp');
    expect(still.getAttribute('srcset')).toBe(
      'img/banner-960.webp 960w, img/banner-1920.webp 1920w',
    );
    expect(still.getAttribute('width')).toBe('1920');
    expect(still.getAttribute('height')).toBe('1080');
    expect(still.getAttribute('fetchpriority')).toBe('high');
    expect(still.getAttribute('loading')).toBeNull();
    expect(still.closest('[aria-hidden="true"]')).not.toBeNull();
    expect(root.querySelector('video')).toBeNull();
  });

  it('keeps the name of the server in the h1 as words (the banner has it in its lettering) and shows no lettering of its own', async () => {
    const root = await render();
    const h1 = root.querySelector('h1#hero-title')!;
    expect(h1.textContent?.trim()).toBe('Kingdom Come: Deliverance II RP Brasil');
    expect(root.querySelector('img.title, h1 img'), 'the lettering image is gone').toBeNull();
    expect(root.querySelectorAll('img')).toHaveLength(1);
    expect(root.querySelector('.claim')?.previousElementSibling).toBe(h1);
  });

  it('says it in two short lines, the king dead and the crown vacant, then what to do about it, and offers two things: the Discord, and the launcher to download', async () => {
    const root = await render();
    expect(root.querySelector('.claim')?.textContent).toBe(
      'O rei morreu. A coroa de Kuttenberg está vaga.',
    );
    expect(root.querySelector('.claim span')?.textContent).toBe('A coroa de Kuttenberg está vaga.');
    expect(root.querySelector('.tagline')?.textContent).toContain('quem não sobe, serve');
    const actions = root.querySelectorAll<HTMLAnchorElement>('.actions a');
    expect(actions).toHaveLength(2);
    expect(actions[0].getAttribute('href')).toBe(SITE.discord);
    expect(actions[1].getAttribute('href')).toBe(SITE.launcher);
    expect(actions[1].textContent).toContain('Baixar launcher');
    expect(actions[1].getAttribute('target')).toBeNull();
  });
});
