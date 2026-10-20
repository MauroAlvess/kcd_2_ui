import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LiveStatus, UNKNOWN } from '../../core/server-status';
import { SITE } from '../../core/site';
import { Hero, wantsMotion } from './hero';

/** A window as `wantsMotion` reads it: whether it asks for less motion, and whether it saves data. */
function fakeWindow(reduce: boolean, saveData?: boolean): Window {
  return {
    matchMedia: (query: string) => ({ matches: reduce && query.includes('reduce') }),
    navigator: saveData === undefined ? {} : { connection: { saveData } },
  } as unknown as Window;
}

/** The test's browser cannot play a video: it is only asked to. */
const askToPlay = () =>
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(async () => undefined);

describe('Hero', () => {
  let play: ReturnType<typeof askToPlay>;

  beforeEach(async () => {
    play = askToPlay();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
    await TestBed.configureTestingModule({
      imports: [Hero],
      providers: [
        { provide: LiveStatus, useValue: { status: signal(UNKNOWN), start: () => undefined } },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  /** The opening, in a browser that asks for less motion or not. */
  async function render(reduce: boolean): Promise<HTMLElement> {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: reduce && query.includes('reduce'),
    }));
    const fixture = TestBed.createComponent(Hero);
    await fixture.whenStable();
    return fixture.nativeElement;
  }

  it('arrives with the view of Kuttenberg muted, looped, on the page, and asking for nothing yet', async () => {
    const video = (await render(true)).querySelector<HTMLVideoElement>('video.video')!;
    for (const attribute of ['muted', 'loop', 'playsinline']) {
      expect(video.hasAttribute(attribute), attribute).toBe(true);
    }
    expect(video.hasAttribute('autoplay')).toBe(false);
    expect(video.closest('[aria-hidden="true"]')).not.toBeNull();
    // A browser that asks for less motion keeps it so: the still stays and no video is downloaded.
    expect(video.getAttribute('preload')).toBe('none');
    expect(play).not.toHaveBeenCalled();
  });

  it('asks for the video once the page is up, and plays it muted, in a browser that may move', async () => {
    const video = (await render(false)).querySelector<HTMLVideoElement>('video.video')!;
    expect(video.preload).toBe('auto');
    expect(video.muted).toBe(true);
    expect(play).toHaveBeenCalledTimes(1);
  });

  it('offers the smaller video to narrow screens, each in VP9 first and H.264 after', async () => {
    const root = await render(true);
    const sources = Array.from(root.querySelectorAll('video source'), (source) => [
      source.getAttribute('src'),
      source.getAttribute('type'),
      source.getAttribute('media'),
    ]);
    expect(sources).toEqual([
      ['video/hero-720.webm', 'video/webm', '(max-width: 64rem)'],
      ['video/hero-720.mp4', 'video/mp4', '(max-width: 64rem)'],
      ['video/hero-1080.webm', 'video/webm', null],
      ['video/hero-1080.mp4', 'video/mp4', null],
    ]);
  });

  it('shows the still of the first frame meanwhile, the largest picture, asked for first', async () => {
    const still = (await render(true)).querySelector<HTMLImageElement>('img.still')!;
    expect(still.getAttribute('src')).toBe('img/hero-poster-1920.webp');
    expect(still.getAttribute('srcset')).toContain('img/hero-poster-960.webp 960w');
    expect(still.getAttribute('fetchpriority')).toBe('high');
    expect(still.getAttribute('loading')).toBeNull();
  });

  it('says the story in one line and offers two things: the Discord, and the launcher to download', async () => {
    const root = await render(true);
    expect(root.querySelector('.claim')?.textContent).toContain('A coroa de Kuttenberg');
    const actions = root.querySelectorAll<HTMLAnchorElement>('.actions a');
    expect(actions).toHaveLength(2);
    expect(actions[0].getAttribute('href')).toBe(SITE.discord);
    expect(actions[1].getAttribute('href')).toBe(SITE.launcher);
    expect(actions[1].textContent).toContain('Baixar launcher');
    expect(actions[1].getAttribute('target')).toBeNull();
  });

  it('moves only for a browser that neither asks for less motion nor saves data', () => {
    expect(wantsMotion(fakeWindow(false))).toBe(true);
    expect(wantsMotion(fakeWindow(false, false))).toBe(true);
    expect(wantsMotion(fakeWindow(true))).toBe(false);
    expect(wantsMotion(fakeWindow(false, true))).toBe(false);
    expect(wantsMotion({ navigator: {} } as unknown as Window)).toBe(true);
  });
});
