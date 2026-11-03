import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CHRONICLES,
  CHRONICLES_TITLE,
  CHRONICLES_TITLE_EM,
  embedUrl,
  watchUrl,
} from '../../content/chronicles';
import { srcsetOf } from '../../content/pitch';
import { Chronicles, DWELL_MS } from './chronicles';

describe('Chronicles', () => {
  let fixture: ComponentFixture<Chronicles>;
  let root: HTMLElement;

  const cards = (): HTMLElement[] => Array.from(root.querySelectorAll<HTMLElement>('.card'));
  /** Where each card stands: in the middle, at the side it came from, or out of sight. */
  const states = (): string[] =>
    cards().map(
      (card) =>
        ['main', 'before', 'after', 'gone'].find((one) => card.classList.contains(one)) ?? '',
    );
  const hit = (at: number): HTMLButtonElement =>
    cards()[at].querySelector<HTMLButtonElement>('.hit')!;
  const on = (): string => root.querySelector('.caption.on .name')?.textContent?.trim() ?? '';
  const settle = async (): Promise<void> => {
    fixture.detectChanges();
    await fixture.whenStable();
  };
  const pointer = (
    button: HTMLElement,
    type: 'pointerenter' | 'pointerleave',
    kind = 'mouse',
  ): void => {
    button.dispatchEvent(Object.assign(new Event(type), { pointerType: kind }));
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Chronicles] }).compileComponents();
    fixture = TestBed.createComponent(Chronicles);
    root = fixture.nativeElement;
    await fixture.whenStable();
  });

  afterEach(() => vi.useRealTimers());

  it('is the section the navigation calls "cronicas", named by its h2 with the title and its gilded word', () => {
    const section = root.querySelector('section#cronicas');
    expect(section).not.toBeNull();
    const heading = root.querySelector(`#${section?.getAttribute('aria-labelledby')}`);
    expect(heading?.tagName).toBe('H2');
    expect(heading?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
      `${CHRONICLES_TITLE} ${CHRONICLES_TITLE_EM}`,
    );
    expect(heading?.querySelector('em')?.textContent).toBe(CHRONICLES_TITLE_EM);
  });

  it("says the stories are the players' own, with no script and no staff in them", () => {
    const lead = root.querySelector('.lead')?.textContent ?? '';
    expect(lead).toContain('roleplay dos jogadores');
    expect(lead).toContain('sem intervenção alguma da staff');
  });

  it('shows a card for each video in order, the first in the middle, the next at its side and the third out of sight, each cover in two sizes with its description and its size', () => {
    expect(CHRONICLES).toHaveLength(3);
    expect(cards()).toHaveLength(CHRONICLES.length);
    expect(states()).toEqual(['main', 'after', 'gone']);
    cards().forEach((card, at) => {
      const image = card.querySelector<HTMLImageElement>('img')!;
      expect(image.getAttribute('src')).toBe(`img/${CHRONICLES[at].large}`);
      expect(image.getAttribute('srcset')).toBe(
        srcsetOf(CHRONICLES[at].small, CHRONICLES[at].large),
      );
      expect(image.getAttribute('srcset')).toContain(` ${CHRONICLES[at].width}w`);
      expect(image.getAttribute('alt')).toBe(CHRONICLES[at].alt);
      expect(image.getAttribute('width')).toBe(String(CHRONICLES[at].width));
      expect(image.getAttribute('height')).toBe(String(CHRONICLES[at].height));
    });
    expect(on()).toBe('Kingdom RP Brasil');
  });

  it('opens with the first trailer of the server and goes on with the acts as the user named them: "Ato I, O primeiro conflito" and "Ato II, Um novo lorde"', () => {
    expect(CHRONICLES.map((one) => `${one.label}: ${one.name} ${one.nameEm}`)).toEqual([
      'Primeiro trailer: Kingdom RP Brasil',
      'Ato I: O primeiro conflito',
      'Ato II: Um novo lorde',
    ]);
    const names = Array.from(root.querySelectorAll('.caption .name'), (name) =>
      name.textContent?.trim(),
    );
    expect(names).toEqual(['Kingdom RP Brasil', 'O primeiro conflito', 'Um novo lorde']);
    const ticks = Array.from(root.querySelectorAll('.tick'), (tick) => tick.textContent?.trim());
    expect(ticks).toEqual(['Trailer', 'I', 'II']);
  });

  it("loads nothing of YouTube before a click: no player, the covers are the page's own files, and the link to each video is a plain link that opens a new tab", () => {
    expect(root.querySelector('iframe')).toBeNull();
    for (const image of Array.from(root.querySelectorAll('img'))) {
      expect(image.getAttribute('src')).toMatch(/^img\//);
    }
    const links = Array.from(root.querySelectorAll<HTMLAnchorElement>('a.more'));
    expect(links.map((link) => link.getAttribute('href'))).toEqual(
      CHRONICLES.map((one) => watchUrl(one.video)),
    );
    for (const link of links) {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
    }
  });

  it('plays the card in the middle in place, in the privacy player, when it is clicked', async () => {
    hit(0).click();
    await settle();
    const players = root.querySelectorAll<HTMLIFrameElement>('iframe');
    expect(players).toHaveLength(1);
    expect(players[0].getAttribute('src')).toBe(embedUrl(CHRONICLES[0].video));
    expect(players[0].getAttribute('src')).toContain('youtube-nocookie.com/embed/');
    expect(players[0].getAttribute('title')).toBe('Primeiro trailer: Kingdom RP Brasil');
    expect(players[0].hasAttribute('allowfullscreen')).toBe(true);
    expect(cards()[0].contains(players[0])).toBe(true);
    // The card's own button is gone while its video plays, and the cover is still under it.
    expect(cards()[0].querySelector('.hit')).toBeNull();
    expect(cards()[0].querySelector('img')).not.toBeNull();
  });

  it('brings the card at a side to the middle when it is clicked, sends the other to the side it came from, and changes the caption', async () => {
    hit(1).click();
    await settle();
    expect(states()).toEqual(['before', 'main', 'after']);
    expect(on()).toBe('O primeiro conflito');
    expect(root.querySelector('.tick.now')?.getAttribute('aria-label')).toBe(
      'Ato I: O primeiro conflito',
    );
    // The third comes in from out of sight, at the other side.
    hit(2).click();
    await settle();
    expect(states()).toEqual(['gone', 'before', 'main']);
    expect(on()).toBe('Um novo lorde');
    // And back, one at a time.
    hit(1).click();
    await settle();
    expect(states()).toEqual(['before', 'main', 'after']);
    hit(0).click();
    await settle();
    expect(states()).toEqual(['main', 'after', 'gone']);
    expect(on()).toBe('Kingdom RP Brasil');
  });

  it('puts away the video that was playing when another card is brought to the middle', async () => {
    hit(0).click();
    await settle();
    expect(root.querySelector('iframe')).not.toBeNull();
    root.querySelectorAll<HTMLButtonElement>('.tick')[2].click();
    await settle();
    expect(root.querySelector('iframe')).toBeNull();
    expect(states()).toEqual(['gone', 'before', 'main']);
    // The one now in the middle plays when it is clicked: its own video.
    hit(2).click();
    await settle();
    expect(root.querySelector('iframe')?.getAttribute('src')).toBe(embedUrl(CHRONICLES[2].video));
  });

  it('labels each card\'s button by what it does: "Assistir" for the one in the middle, "Mostrar" for the others', async () => {
    expect(hit(0).getAttribute('aria-label')).toBe('Assistir Primeiro trailer: Kingdom RP Brasil');
    expect(hit(1).getAttribute('aria-label')).toBe('Mostrar Ato I: O primeiro conflito');
    hit(1).click();
    await settle();
    expect(hit(1).getAttribute('aria-label')).toBe('Assistir Ato I: O primeiro conflito');
    expect(hit(0).getAttribute('aria-label')).toBe('Mostrar Primeiro trailer: Kingdom RP Brasil');
  });

  it('brings the card at the side to the middle after the mouse rests on it for a moment, and not before', async () => {
    vi.useFakeTimers();
    pointer(hit(1), 'pointerenter');
    vi.advanceTimersByTime(DWELL_MS - 1);
    await settle();
    expect(states()).toEqual(['main', 'after', 'gone']);
    vi.advanceTimersByTime(1);
    await settle();
    expect(states()).toEqual(['before', 'main', 'after']);
  });

  it('does nothing for a mouse that only passes by, for a finger, for the card already in the middle, and while a video plays', async () => {
    vi.useFakeTimers();
    // Passes by: leaves before the moment is over.
    pointer(hit(1), 'pointerenter');
    vi.advanceTimersByTime(DWELL_MS - 100);
    pointer(hit(1), 'pointerleave');
    vi.advanceTimersByTime(1000);
    await settle();
    expect(states()).toEqual(['main', 'after', 'gone']);
    // A finger has no hover: only a tap brings the card.
    pointer(hit(1), 'pointerenter', 'touch');
    vi.advanceTimersByTime(1000);
    await settle();
    expect(states()).toEqual(['main', 'after', 'gone']);
    // The card in the middle is already there.
    pointer(hit(0), 'pointerenter');
    vi.advanceTimersByTime(1000);
    await settle();
    expect(states()).toEqual(['main', 'after', 'gone']);
    // A video that plays is not taken from the viewer by a mouse that drifts to the side.
    hit(0).click();
    await settle();
    pointer(hit(1), 'pointerenter');
    vi.advanceTimersByTime(1000);
    await settle();
    expect(states()).toEqual(['main', 'after', 'gone']);
    expect(root.querySelector('iframe')).not.toBeNull();
  });

  it('forgets the wait when a click comes first, so that the card does not move twice', async () => {
    vi.useFakeTimers();
    pointer(hit(1), 'pointerenter');
    vi.advanceTimersByTime(DWELL_MS - 50);
    hit(1).click();
    await settle();
    expect(states()).toEqual(['before', 'main', 'after']);
    // The wait that was left would have brought the same card again, a second time, after the first.
    vi.advanceTimersByTime(1000);
    await settle();
    expect(states()).toEqual(['before', 'main', 'after']);
  });

  it('moves with the arrow keys, one card at a time, and stops at the ends', async () => {
    const deck = root.querySelector<HTMLElement>('.deck')!;
    const key = (name: string): void => {
      deck.dispatchEvent(new KeyboardEvent('keydown', { key: name, bubbles: true }));
    };
    key('ArrowLeft');
    await settle();
    expect(states()).toEqual(['main', 'after', 'gone']);
    key('ArrowRight');
    await settle();
    expect(states()).toEqual(['before', 'main', 'after']);
    key('ArrowRight');
    await settle();
    expect(states()).toEqual(['gone', 'before', 'main']);
    key('ArrowRight');
    await settle();
    expect(states()).toEqual(['gone', 'before', 'main']);
    key('ArrowLeft');
    await settle();
    expect(states()).toEqual(['before', 'main', 'after']);
  });

  it('keeps a card two places from the middle out of sight and out of reach, until it comes to a side', async () => {
    const third = cards()[2];
    expect(third.classList.contains('gone')).toBe(true);
    expect(third.getAttribute('aria-hidden')).toBe('true');
    expect(third.hasAttribute('inert')).toBe(true);
    hit(1).click();
    await settle();
    expect(third.classList.contains('gone')).toBe(false);
    expect(third.hasAttribute('inert')).toBe(false);
    expect(third.getAttribute('aria-hidden')).toBeNull();
  });

  it("is a carousel for a screen reader: a group of slides, each saying which of the three it is, with the covers' labels hidden from it", () => {
    const deck = root.querySelector('.deck');
    expect(deck?.getAttribute('role')).toBe('group');
    expect(deck?.getAttribute('aria-roledescription')).toBe('carrossel');
    expect(cards().map((card) => card.getAttribute('aria-label'))).toEqual([
      '1 de 3',
      '2 de 3',
      '3 de 3',
    ]);
    for (const chip of Array.from(root.querySelectorAll('.chip'))) {
      expect(chip.getAttribute('aria-hidden')).toBe('true');
    }
    // Only the caption of the card on show is read; the others are out of the way.
    const captions = Array.from(root.querySelectorAll('.caption'));
    expect(captions.map((caption) => caption.getAttribute('aria-hidden'))).toEqual([
      null,
      'true',
      'true',
    ]);
    expect(captions.map((caption) => caption.hasAttribute('inert'))).toEqual([false, true, true]);
  });
});
