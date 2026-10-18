import { Component, computed, input } from '@angular/core';

/** A piece of a paragraph: plain, or in bold. */
export interface Part {
  readonly text: string;
  readonly strong: boolean;
}

/** Splits the `**bold**` marks of a text into its pieces. */
export function parts(text: string): readonly Part[] {
  return text
    .split('**')
    .map((chunk, index) => ({ text: chunk, strong: index % 2 === 1 }))
    .filter((part) => part.text !== '');
}

/**
 * A text with some words in bold, marked `**like this**` in the content: it writes the bold ones as `strong` and the rest
 * as they are, with no space added between them, so a comma after a bold name stays against it.
 *
 * The page's text font comes in one weight, and the bold a browser draws over it smudges: the `strong` words keep the
 * weight and stand out by the colour the place they are in gives `--strong`.
 */
@Component({
  selector: 'app-rich',
  template: `@for (part of pieces(); track $index) {
    @if (part.strong) {
      <strong>{{ part.text }}</strong>
    } @else {
      <ng-container>{{ part.text }}</ng-container>
    }
  }`,
  styles: `
    :host {
      display: contents;
    }

    strong {
      font-weight: inherit;
      color: var(--strong, inherit);
    }
  `,
})
export class Rich {
  readonly text = input.required<string>();
  protected readonly pieces = computed(() => parts(this.text()));
}
