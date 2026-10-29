import { Injectable, signal } from '@angular/core';

const clamp = (value: number): number => Math.min(1, Math.max(0, value));

/**
 * Where the page is scrolled to, for the parts of the design that move with it: the opening's picture and words, the four pillars of the realm that
 * take turns while the page is held still, the map that settles as it comes into view, the closing picture. A browser starts it once after the first
 * draw; it reads the scroll at most once a frame. The server that prerenders the page never starts it, so the page is written at its top, with the
 * first pillar showing, and it stays still for a visitor who asked for less motion.
 */
@Injectable({ providedIn: 'root' })
export class ScrollState {
  /** How far the page is scrolled, in pixels. */
  readonly y = signal(0);
  /** The height of the window, in pixels. */
  readonly height = signal(900);
  /** The visitor asked for less motion: nothing here moves. */
  readonly still = signal(true);
  private started = false;

  start(): void {
    if (this.started || typeof window === 'undefined') {
      return;
    }
    this.started = true;
    this.still.set(
      typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    );
    let frame = 0;
    const read = (): void => {
      frame = 0;
      this.y.set(window.scrollY);
      this.height.set(window.innerHeight || 900);
    };
    const soon = (): void => {
      if (frame === 0) {
        frame = requestAnimationFrame(read);
      }
    };
    window.addEventListener('scroll', soon, { passive: true });
    window.addEventListener('resize', soon);
    read();
  }

  /**
   * How far an element has gone through the window, from 0 (its top is at the foot of the window) to 1 (its foot has left at the top). Read inside a
   * `computed` that also reads `y()`, so it is worked out again at every frame of the scroll. 0.5 until the page is in a browser.
   */
  progress(element: HTMLElement | null): number {
    if (element === null || this.y() < 0 || typeof element.getBoundingClientRect !== 'function') {
      return 0.5;
    }
    const box = element.getBoundingClientRect();
    const vh = this.height();
    return clamp((vh - box.top) / (vh + box.height));
  }
}

export { clamp };
