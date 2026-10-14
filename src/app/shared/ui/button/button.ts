import { Component, booleanAttribute, input } from '@angular/core';

/**
 * A link that looks like a button. `primary` is the red one, for the single thing a section wants you to do;
 * `ghost` is an outline in the colour of the surrounding text, so it works on both the black and the beige sections.
 * A link that leaves the site opens in a new tab and says so to screen readers.
 */
@Component({
  selector: 'app-button',
  template: `
    <a
      class="button"
      [attr.data-variant]="variant()"
      [href]="href()"
      [attr.target]="external() ? '_blank' : null"
      [attr.rel]="external() ? 'noopener noreferrer' : null"
    >
      <ng-content />
      @if (external()) {
        <span class="sr-only"> (abre em uma nova aba)</span>
      }
    </a>
  `,
  styles: `
    :host {
      display: inline-block;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 3.25rem;
      padding: 0.9rem 2rem;
      font: 600 0.8rem/1.2 var(--display);
      letter-spacing: 0.2em;
      text-transform: uppercase;
      text-decoration: none;
      text-align: center;
      border: 1px solid transparent;
      transition:
        background-color 0.2s,
        border-color 0.2s;
    }

    .button[data-variant='primary'] {
      color: var(--paper);
      background: var(--red);
      border-color: var(--red);
      box-shadow: inset 0 0 0 1px rgba(238, 228, 207, 0.16);
    }

    .button[data-variant='primary']:hover {
      background: var(--red-hi);
      border-color: var(--red-hi);
    }

    .button[data-variant='ghost'] {
      color: inherit;
      border-color: currentColor;
    }

    .button[data-variant='ghost']:hover {
      background: color-mix(in srgb, currentColor 12%, transparent);
    }
  `,
})
export class Button {
  readonly href = input.required<string>();
  readonly variant = input<'primary' | 'ghost'>('primary');
  /** Written as a bare attribute: `<app-button external>`. */
  readonly external = input(false, { transform: booleanAttribute });
}
