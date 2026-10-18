import { Component, booleanAttribute, input } from '@angular/core';

/**
 * A link that looks like a button. `primary` is the red one, edged in gold like the embroidered crests, for the single
 * thing a section wants you to do; `ghost` is an outline in the colour of the surrounding text, so it works on both the
 * black and the parchment bands. `large` is for the calls that close the opening and the page. A link that leaves the
 * site opens in a new tab and says so to screen readers.
 */
@Component({
  selector: 'app-button',
  template: `
    <a
      class="button"
      [attr.data-variant]="variant()"
      [class.large]="large()"
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
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      min-height: 3.25rem;
      padding: 0.9rem 2.1rem;
      font: 600 0.8rem/1.2 var(--display);
      letter-spacing: 0.2em;
      text-transform: uppercase;
      text-decoration: none;
      text-align: center;
      border: 1px solid transparent;
      transition:
        background-color 0.2s,
        border-color 0.2s,
        box-shadow 0.25s,
        transform 0.2s;
    }

    .large {
      min-height: 3.9rem;
      padding: 1.1rem 2.8rem;
      font-size: 0.88rem;
      letter-spacing: 0.24em;
    }

    .button[data-variant='primary'] {
      color: var(--paper);
      background: linear-gradient(to bottom, var(--red-hi), var(--red));
      border-color: var(--gold-deep);
      box-shadow:
        inset 0 0 0 3px var(--red),
        inset 0 0 0 4px rgba(236, 210, 138, 0.42),
        0 0.7rem 1.6rem rgba(0, 0, 0, 0.35);
    }

    .button[data-variant='primary']:hover {
      background: linear-gradient(to bottom, #ad0e12, var(--red-hi));
      border-color: var(--gold);
      box-shadow:
        inset 0 0 0 3px var(--red-hi),
        inset 0 0 0 4px rgba(236, 210, 138, 0.7),
        0 0 1.6rem rgba(152, 9, 12, 0.55),
        0 0.7rem 1.6rem rgba(0, 0, 0, 0.35);
      transform: translateY(-1px);
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
  /** Written as a bare attribute: `<app-button large>`. */
  readonly large = input(false, { transform: booleanAttribute });
}
