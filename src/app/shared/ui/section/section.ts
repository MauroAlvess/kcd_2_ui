import { booleanAttribute, Component, input } from '@angular/core';

/** A photograph behind a section: the file to show and the sizes the browser may pick from. */
export interface SectionImage {
  readonly src: string;
  readonly srcset: string;
  /** Which part of the picture stays in view when the band is shaped differently (`object-position`). */
  readonly position?: string;
}

/**
 * One band of the page: flat black, beige text, handed to everything inside it as custom properties (`--fg`, `--fg-muted`,
 * `--rule`, `--accent`, `--strong`). A band can carry a photograph, darkened so the text above it stays readable, or the game
 * panel's ornaments on two of its corners; anything given the `backdrop` attribute is laid behind the content instead of in it.
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
  /** The lion above on the left and the raven below on the right, set right in the band's corners. */
  readonly corners = input(false, { transform: booleanAttribute });
}
