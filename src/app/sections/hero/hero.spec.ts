import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { JOIN_STEPS } from '../../content/join';
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

  it('shows the picture of the ambush, asked for first, in two sizes, with no video', async () => {
    const root = await render();
    const still = root.querySelector<HTMLImageElement>('img.still')!;
    expect(still.getAttribute('src')).toBe('img/hero-1920.webp');
    expect(still.getAttribute('srcset')).toBe('img/hero-960.webp 960w, img/hero-1920.webp 1920w');
    expect(still.getAttribute('fetchpriority')).toBe('high');
    expect(still.getAttribute('loading')).toBeNull();
    expect(still.closest('[aria-hidden="true"]')).not.toBeNull();
    expect(root.querySelector('video')).toBeNull();
  });

  it('keeps the claim as the only h1, with the name of the server in it for those who read it aloud', async () => {
    const root = await render();
    expect(root.querySelectorAll('h1')).toHaveLength(1);
    const h1 = root.querySelector('h1#hero-title')!;
    expect(h1.querySelector('.sr-only')?.textContent).toContain(
      'Kingdom Come: Deliverance II RP Brasil',
    );
    expect(h1.textContent?.replace(/\s+/g, ' ')).toContain('O rei morreu.A coroa está vaga.');
    expect(h1.querySelector('em')?.textContent).toBe('vaga.');
  });

  it('tells the story in a breath and the motto, then offers the parchment: the server, three steps and two buttons', async () => {
    const root = await render();
    expect(root.querySelector('.tagline')?.textContent).toContain('Comece plebeu');
    expect(root.querySelector('.motto')?.textContent).toContain('quem não sobe, serve');
    expect(root.querySelector('.panel h2')?.textContent).toBe('Escolha seu destino');
    expect(root.querySelector('.panel .name')?.textContent).toBe(
      'Kingdom - RP BRASIL - WL - Kuttenberg',
    );
    expect(root.querySelectorAll('.steps li')).toHaveLength(JOIN_STEPS.length);
    const actions = root.querySelectorAll<HTMLAnchorElement>('.actions a');
    expect(actions).toHaveLength(2);
    expect(actions[0].getAttribute('href')).toBe(SITE.discord);
    expect(actions[0].getAttribute('target')).toBe('_blank');
    expect(actions[1].getAttribute('href')).toBe(SITE.launcher);
    expect(actions[1].textContent).toContain('Baixar launcher');
  });
});
