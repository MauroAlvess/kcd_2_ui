import { Component, input } from '@angular/core';

/** A photograph behind a section: the file to show and the sizes the browser may pick from. */
export interface SectionImage {
  readonly src: string;
  readonly srcset: string;
  /** Which part of the picture stays in view when the band is shaped differently (`object-position`). */
  readonly position?: string;
  /** How much of the night blue is laid over the picture, from 0 to 1 (0.85 when left out): the lighter the picture, the more it needs. */
  readonly tint?: number;
}

/**
 * One band of the page, in one of two tones (2026-10-29, the user: "não gostei do bege, podemos fazer uma jogada de cores melhor... e usar nossas imagens de uma
 * forma melhor"): `paper`, the screen of the F2 panel done again (its beige, its photograph printed faintly into it, its grain, its light from the top left and its
 * darkened edges, the braided rope along the top, ink for the words and red for the small labels); and `night`, the deep blue of the banner, with bone words and gold
 * labels, which can carry a picture. The tone hands its colours to everything inside as custom properties (`--fg`, `--fg-muted`, `--rule`, `--accent`, `--strong`).
 * A band can also carry one of the game panel's ornaments in a corner; anything given the `backdrop` attribute is laid behind the content instead of in it.
 */
@Component({
  selector: 'app-section',
  templateUrl: './section.html',
  styleUrl: './section.css',
})
export class Section {
  /** The anchor the navigation points to; it becomes the id of the section. Not called `id`, so the element of the component does not carry a second one. */
  readonly anchor = input.required<string>();
  /** The id of the heading that names this section, for screen readers. */
  readonly labelledBy = input<string>();
  readonly image = input<SectionImage>();
  /** One ornament of the game panel set right in a corner of the band, with no margin: the lion above on the left, or the raven below on the right. */
  readonly corner = input<'lion' | 'raven'>();
  /** The paper of the F2 panel (the default), or the night blue of the banner. */
  readonly tone = input<'paper' | 'night'>('paper');
}
