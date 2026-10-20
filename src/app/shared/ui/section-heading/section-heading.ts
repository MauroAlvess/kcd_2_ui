import { Component, input } from '@angular/core';

/**
 * The heading of a section: a small label above, the title and, projected in, an introduction. Plain on purpose (2026-10-20,
 * the user: "menos enfeitado e mais minimalista"): no numerals, no ornaments, the title in sentence case.
 * The title is the section's h2; the page's only h1 belongs to the opening.
 */
@Component({
  selector: 'app-section-heading',
  templateUrl: './section-heading.html',
  styleUrl: './section-heading.css',
})
export class SectionHeading {
  readonly eyebrow = input<string>();
  /** The title itself. Not called `title`, which would also show up as a hover tooltip on the element of the component. */
  readonly heading = input.required<string>();
  /** Gives the h2 an id, so the section can name itself by it (see `Section.labelledBy`). */
  readonly titleId = input<string>();
  readonly align = input<'center' | 'start'>('start');
}
