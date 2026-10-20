import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';

/** How far the page has to be scrolled, in pixels, for the cue to be taken as understood. */
const SCROLLED_PX = 40;

/**
 * A circle with a down arrow in the bottom left corner of the window, standing in for the scrollbar (the site's own is hidden,
 * 2026-10-20: "o scroll do site vamos deixar invisível e no canto inferior esquerdo um círculo com seta para baixo"). It tells a
 * visitor at the top that there is more below, takes them to the first chapter when pressed, and fades away for good as soon as
 * the page has been scrolled. The prerendered page has it showing; with no scripts it stays, and is only a link.
 */
@Component({
  selector: 'app-scroll-hint',
  templateUrl: './scroll-hint.html',
  styleUrl: './scroll-hint.css',
})
export class ScrollHint {
  /** The page has been scrolled: from then on the cue is gone. */
  protected readonly gone = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const update = () => {
        if (window.scrollY > SCROLLED_PX) {
          this.gone.set(true);
          window.removeEventListener('scroll', update);
        }
      };
      update();
      window.addEventListener('scroll', update, { passive: true });
      destroyRef.onDestroy(() => window.removeEventListener('scroll', update));
    });
  }
}
