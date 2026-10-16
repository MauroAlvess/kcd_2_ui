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
  styles: ':host { display: contents; }',
})
export class Rich {
  readonly text = input.required<string>();
  protected readonly pieces = computed(() => parts(this.text()));
}
