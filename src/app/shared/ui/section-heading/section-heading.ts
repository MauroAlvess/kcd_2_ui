import { Component, input } from '@angular/core';
import { Reveal } from '../reveal/reveal';

/**
 * The heading of a section: a small label above in the game panel's own face and gold, the title and, projected in, an introduction.
 * Plain on purpose (2026-10-20, the user: "menos enfeitado e mais minimalista"; 2026-10-28: "sem frufru"): no drawing before the label,
 * no numerals, no ornaments.
 * The title is the section's h2; the page's only h1 belongs to the opening.
 */
@Component({
  selector: 'app-section-heading',
  imports: [Reveal],
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
