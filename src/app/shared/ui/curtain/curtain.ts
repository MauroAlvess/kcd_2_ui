import { Component, ElementRef, afterNextRender, inject, signal } from '@angular/core';

/** The longest the clouds' pictures are waited for before the curtain goes ahead with whatever has come. */
export const WAIT_MS = 2500;

/** The curtain is taken out of the page this long after it starts: its animation (curtain.css) is over a little before. */
export const GONE_MS = 3200;

/**
 * The entrance of the site (2026-10-21, the user: "ao entrar no site as nuvens fecham a tela e vão abrindo, indo para os 4 cantos"): four
 * heaps of dark clouds, one from each corner, close over the screen and then draw back out to the four corners, uncovering the page.
 * The pieces are the user's two ornamental cloud frames, each used twice and turned to face its corner. Until the pictures have
 * come (or `WAIT_MS` has passed) the screen is plain black; with reduced motion, or with no scripts, there is no curtain at all (the
 * stylesheet hides it), and the prerendered page always has it, so a visitor never sees the page before the clouds close.
 * It is for the eyes only: the page behind is all there for a reader, a search engine and the keyboard.
 */
@Component({
  selector: 'app-curtain',
  templateUrl: './curtain.html',
  styleUrl: './curtain.css',
})
export class Curtain {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  /** The clouds have started to move. */
  protected readonly going = signal(false);
  /** The show is over and the curtain is out of the page. */
  protected readonly gone = signal(false);

  constructor() {
    afterNextRender(() => {
      const pictures = Array.from(this.host.nativeElement.querySelectorAll('img'));
      const ready = Promise.all(
        pictures.map((picture) =>
          typeof picture.decode === 'function'
            ? picture.decode().catch(() => undefined)
            : undefined,
        ),
      );
      const timeout = new Promise<void>((resolve) => setTimeout(resolve, WAIT_MS));
      void Promise.race([ready, timeout]).then(() => {
        this.going.set(true);
        setTimeout(() => this.gone.set(true), GONE_MS);
      });
    });
  }
}
