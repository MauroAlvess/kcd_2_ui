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

  it('shows the picture of the tower over the valley, asked for first, with no video', async () => {
    const root = await render();
    const still = root.querySelector<HTMLImageElement>('img.still')!;
    expect(still.getAttribute('src')).toBe('img/hero-1920.webp');
    expect(still.getAttribute('srcset')).toContain('img/hero-960.webp 960w');
    expect(still.getAttribute('fetchpriority')).toBe('high');
    expect(still.getAttribute('loading')).toBeNull();
    expect(still.closest('[aria-hidden="true"]')).not.toBeNull();
    expect(root.querySelector('video')).toBeNull();
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
