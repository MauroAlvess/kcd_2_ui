import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Reveal } from './reveal';

@Component({
  imports: [Reveal],
  template: `
    <p class="bare" appReveal>alone</p>
    @for (place of places; track place) {
      <p class="row" [appReveal]="place">{{ place }}</p>
    }
  `,
})
class Host {
  readonly places = [0, 1, 2, 5, 9];
}

/** What the browser's `IntersectionObserver` is to the directive: it says when to look, and what it was told. */
class FakeObserver {
  static all: FakeObserver[] = [];
  watched: Element[] = [];
  disconnected = false;
  constructor(
    readonly callback: (entries: { isIntersecting: boolean }[]) => void,
    readonly options?: IntersectionObserverInit,
  ) {
    FakeObserver.all.push(this);
  }
  observe(element: Element): void {
    this.watched.push(element);
  }
  disconnect(): void {
    this.disconnected = true;
  }
}

describe('Reveal', () => {
  let fixture: ComponentFixture<Host>;
  let root: HTMLElement;

  const blocks = () => Array.from(root.querySelectorAll<HTMLElement>('p'));
  const held = () => blocks().filter((block) => block.classList.contains('reveal-wait'));
  const shown = () => blocks().filter((block) => block.classList.contains('reveal-in'));
  /** The observer that is watching `block` (they are made in the order the page is built, which is not the order it is read in). */
  const watching = (block: Element) =>
    FakeObserver.all.find((observer) => observer.watched[0] === block)!;

  /** Opens the page with its blocks `top` pixels from the top of a 768 px-high window. */
  async function open(
    top: number,
    options: { reduced?: boolean; observer?: boolean } = {},
  ): Promise<void> {
    if (options.observer !== false) {
      vi.stubGlobal('IntersectionObserver', FakeObserver);
    } else {
      vi.stubGlobal('IntersectionObserver', undefined);
    }
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({ matches: options.reduced === true && query.includes('reduce') })),
    );
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({ top } as DOMRect);
    await TestBed.configureTestingModule({ imports: [Host] }).compileComponents();
    fixture = TestBed.createComponent(Host);
    root = fixture.nativeElement;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  /** The reader comes down to every block that is being watched. */
  function arrive(): void {
    for (const observer of FakeObserver.all) {
      observer.callback([{ isIntersecting: true }]);
    }
    fixture.detectChanges();
  }

  beforeEach(() => {
    FakeObserver.all = [];
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 768 });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('leaves what is on the screen, or above it, exactly as it is written: nothing is held back, nothing blinks', async () => {
    await open(120);
    expect(held()).toHaveLength(0);
    expect(shown()).toHaveLength(0);
    expect(FakeObserver.all).toHaveLength(0);

    TestBed.resetTestingModule();
    await open(-4000);
    expect(held()).toHaveLength(0);
    expect(FakeObserver.all).toHaveLength(0);
  });

  it('holds back what is still below the screen, and shows each block when the reader comes down to it', async () => {
    await open(2000);
    expect(blocks()).toHaveLength(6);
    expect(held()).toHaveLength(6);
    expect(shown()).toHaveLength(0);
    expect(FakeObserver.all).toHaveLength(6);

    watching(blocks()[1]).callback([{ isIntersecting: false }]);
    fixture.detectChanges();
    expect(held(), 'a block that is still out of sight stays held').toHaveLength(6);

    watching(blocks()[0]).callback([{ isIntersecting: true }]);
    fixture.detectChanges();
    expect(blocks()[0].classList.contains('reveal-in')).toBe(true);
    expect(blocks()[0].classList.contains('reveal-wait')).toBe(false);
    expect(held()).toHaveLength(5);
    expect(watching(blocks()[0]).disconnected, 'one look is enough: it is not watched again').toBe(
      true,
    );

    arrive();
    expect(held()).toHaveLength(0);
    expect(shown()).toHaveLength(6);
  });

  it('counts a block as read down to when its top edge is a little above the foot of the screen, not when all of it is in view', async () => {
    await open(2000);
    expect(watching(blocks()[0]).options?.rootMargin).toBe('0px 0px -8% 0px');
    expect(watching(blocks()[0]).options?.threshold).toBeUndefined();
    expect(watching(blocks()[0]).watched).toEqual([blocks()[0]]);
  });

  it('makes the blocks of a row follow the first by a moment each, and never by more than four steps', async () => {
    await open(2000);
    const delays = blocks().map((block) => block.style.getPropertyValue('--reveal-delay'));
    expect(delays).toEqual(['0ms', '0ms', '90ms', '180ms', '360ms', '360ms']);
  });

  it('shows the page as it is written to a visitor who asked for less motion', async () => {
    await open(2000, { reduced: true });
    expect(held()).toHaveLength(0);
    expect(shown()).toHaveLength(0);
    expect(FakeObserver.all).toHaveLength(0);
  });

  it('shows the page as it is written in a browser that cannot watch for the reader', async () => {
    await open(2000, { observer: false });
    expect(held()).toHaveLength(0);
    expect(shown()).toHaveLength(0);
  });

  it('stops watching a block that goes away before the reader gets to it', async () => {
    await open(2000);
    expect(FakeObserver.all.some((observer) => observer.disconnected)).toBe(false);
    fixture.destroy();
    expect(FakeObserver.all.every((observer) => observer.disconnected)).toBe(true);
  });
});
