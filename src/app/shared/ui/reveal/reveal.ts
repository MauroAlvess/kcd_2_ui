import {
  afterNextRender,
  computed,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';

/** The longest a block waits for the ones before it in its row, and how long each of them adds. */
const MAX_PLACE = 4;
const PLACE_MS = 90;

/**
 * What is below the screen when the page opens is held back, and shows itself as the visitor reads down to it (user,
 * 2026-10-26: "à medida que vá rolando para baixo vai aparecendo as informações"): it comes up out of a short distance
 * and out of nothing, once, and stays. A blank page is never the price of that:
 *
 * - the page is complete as it is written (prerendered, and with no scripts): nothing is hidden until the browser has
 *   built the page, and only what is still below the screen at that moment;
 * - what is already on the screen, or above it (a link to `#regras`, a reload half way down), is left alone;
 * - a browser with no `IntersectionObserver`, and a visitor who asked for less motion, see the page as it is written.
 *
 * Use it as a bare attribute, or give it the place of the block in a row of its kind (`[appReveal]="$index"`): the later
 * ones follow the first a moment after, instead of all at once. The look is in `styles.css` (`.reveal-wait`, `.reveal-in`).
 */
@Directive({
  selector: '[appReveal]',
  host: {
    '[class.reveal-wait]': 'waiting()',
    '[class.reveal-in]': 'shown()',
    '[style.--reveal-delay]': 'delay()',
  },
})
export class Reveal {
  /** The place in a row (0 for the first, or when there is no row): a number, or nothing at all for a bare attribute. */
  readonly appReveal = input<number | string>('');

  protected readonly waiting = signal(false);
  protected readonly shown = signal(false);
  protected readonly delay = computed(() => {
    const place = Math.trunc(Number(this.appReveal()));
    return `${Math.min(Math.max(Number.isFinite(place) ? place : 0, 0), MAX_PLACE) * PLACE_MS}ms`;
  });

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyed = inject(DestroyRef);

    // Only in a browser, and only once the page is on the screen: the server never runs this.
    afterNextRender(() => {
      if (
        typeof IntersectionObserver === 'undefined' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        host.getBoundingClientRect().top < window.innerHeight * 0.9
      ) {
        return;
      }
      this.waiting.set(true);
      // Its top edge a little above the foot of the screen is "read down to it": a tall block does not wait to be seen whole.
      const watcher = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            this.waiting.set(false);
            this.shown.set(true);
            watcher.disconnect();
          }
        },
        { rootMargin: '0px 0px -8% 0px' },
      );
      watcher.observe(host);
      destroyed.onDestroy(() => watcher.disconnect());
    });
  }
}
