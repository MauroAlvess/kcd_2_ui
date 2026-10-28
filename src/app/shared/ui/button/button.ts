import { Component, booleanAttribute, input } from '@angular/core';
import { Icon } from '../icon/icon';
import type { IconName } from '../icon/icons';

/**
 * A link that looks like a button. `primary` is the flat red one, for the single thing a section wants you to do; `ghost`
 * is an outline in the colour of the surrounding text, so it works on both the black and the paper bands. `large` is for
 * the calls that close the opening and the page. A link that leaves the site opens in a new tab and says so to screen
 * readers. It can carry a line drawing before its words (`icon`), which only decorates.
 */
@Component({
  selector: 'app-button',
  imports: [Icon],
  template: `
    <a
      class="button"
      [attr.data-variant]="variant()"
      [class.large]="large()"
      [href]="href()"
      [attr.target]="external() ? '_blank' : null"
      [attr.rel]="external() ? 'noopener noreferrer' : null"
    >
      @if (icon(); as mark) {
        <app-icon [name]="mark" />
      }
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
      gap: 0.6rem;
      min-height: 2.9rem;
      padding: 0.75rem 1.4rem;
      font: 500 0.98rem/1.2 var(--sans);
      text-decoration: none;
      text-align: center;
      border: 1px solid transparent;
      border-radius: 2px;
      transition:
        background-color 0.15s,
        border-color 0.15s;
    }

    .large {
      min-height: 3.2rem;
      padding: 0.85rem 1.7rem;
      font-size: 1.02rem;
    }

    .button[data-variant='primary'] {
      color: var(--navy);
      background: var(--gold);
    }

    .button[data-variant='primary']:hover {
      background: var(--gold-hi);
    }

    .button[data-variant='ghost'] {
      color: inherit;
      border-color: color-mix(in srgb, currentColor 40%, transparent);
    }

    .button[data-variant='ghost']:hover {
      border-color: currentColor;
    }
  `,
})
export class Button {
  readonly href = input.required<string>();
  /** A line drawing before the words (user, 2026-10-25: "ícones nos sites também"). */
  readonly icon = input<IconName>();
  readonly variant = input<'primary' | 'ghost'>('primary');
  /** Written as a bare attribute: `<app-button external>`. */
  readonly external = input(false, { transform: booleanAttribute });
  /** Written as a bare attribute: `<app-button large>`. */
  readonly large = input(false, { transform: booleanAttribute });
}
