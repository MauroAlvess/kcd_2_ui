import { Component, input } from '@angular/core';

/** The photograph of an interlude: the file to show, the sizes the browser may pick from and what it shows. */
export interface InterludePhoto {
  readonly src: string;
  readonly srcset: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  /** Which part of the picture stays in the window when the band is shaped differently (`object-position`). */
  readonly position?: string;
}

/**
 * A pause between two chapters (2026-10-26, the user: "transformar nosso site em uma experiência única"): a photograph of the game across
 * the whole width, a little taller than the band, which the page scrolls past slower than itself, so the picture seems to lie further
 * back than the words. With less motion asked for, or in a browser without scroll-driven animations, it stands still. It is not a section:
 * it names nothing and links nowhere, so the menu and the page's outline do not count it.
 */
@Component({
  selector: 'app-interlude',
  template: `
    <figure class="interlude">
      <img
        [src]="photo().src"
        [attr.srcset]="photo().srcset"
        sizes="100vw"
        [attr.width]="photo().width"
        [attr.height]="photo().height"
        [alt]="photo().alt"
        [style.object-position]="photo().position ?? 'center'"
        loading="lazy"
        decoding="async"
      />
    </figure>
  `,
  styles: `
    :host {
      display: block;
    }

    .interlude {
      position: relative;
      height: clamp(15rem, 58vh, 38rem);
      margin: 0;
      overflow: clip;
      background: var(--black);
    }

    img {
      position: absolute;
      inset: -14% 0;
      width: 100%;
      height: 128%;
      max-width: none;
      object-fit: cover;
    }

    /* The picture drifts against the scroll: from a little above to a little below while the band crosses the window. */
    @media (prefers-reduced-motion: no-preference) {
      @supports (animation-timeline: view()) {
        img {
          animation: drift linear both;
          animation-timeline: view();
          animation-range: cover;
        }

        @keyframes drift {
          from {
            transform: translateY(-9%);
          }

          to {
            transform: translateY(9%);
          }
        }
      }
    }
  `,
})
export class Interlude {
  readonly photo = input.required<InterludePhoto>();
}
