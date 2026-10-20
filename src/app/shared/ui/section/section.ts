import { Component, input } from '@angular/core';

/** A photograph behind a dark section: the file to show and the sizes the browser may pick from. */
export interface SectionImage {
  readonly src: string;
  readonly srcset: string;
  /** Which part of the picture stays in view when the band is shaped differently (`object-position`). */
  readonly position?: string;
}

/**
 * One band of the page. It is either `light` (flat paper, dark ink, red accents) or `dark` (flat black, beige text), and it
 * hands that choice to everything inside it as custom properties (`--fg`, `--fg-muted`, `--rule`, `--accent`, `--strong`),
 * so a component written for one works on the other without knowing. A dark band can carry a photograph, darkened so the
 * text above it stays readable; anything given the `backdrop` attribute is laid behind the content instead of in it.
 */
@Component({
  selector: 'app-section',
  templateUrl: './section.html',
  styleUrl: './section.css',
})
export class Section {
  /** The anchor the navigation points to; it becomes the id of the section. Not called `id`, so the element of the component does not carry a second one. */
  readonly anchor = input.required<string>();
  readonly tone = input<'light' | 'dark'>('light');
  /** The id of the heading that names this section, for screen readers. */
  readonly labelledBy = input<string>();
  readonly image = input<SectionImage>();
}
