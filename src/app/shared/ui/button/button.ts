import { Component, booleanAttribute, input } from '@angular/core';

/**
 * A link that looks like a button, as the identity draws it (2026-10-29): small capitals in Spectral SC, a thin inner frame and a chevron that leans
 * forward on hover. `primary` is the red one, for the single thing a section wants you to do; `ghost` is the brown and gold one beside it. `small` is the
 * size of the bar at the top. A link that leaves the site opens in a new tab and says so to screen readers.
 */
@Component({
  selector: 'app-button',
  template: `
    <a
      class="btn"
      [attr.data-variant]="variant()"
      [class.small]="small()"
      [href]="href()"
      [attr.target]="external() ? '_blank' : null"
      [attr.rel]="external() ? 'noopener noreferrer' : null"
    >
      <span class="words"><ng-content /></span>
      <svg
        class="chev"
        viewBox="0 0 8 14"
        fill="none"
        stroke="currentColor"
        stroke-width="1.3"
        aria-hidden="true"
      >
        <path d="M1 1l6 6-6 6" />
      </svg>
      @if (external()) {
        <span class="sr-only"> (abre em uma nova aba)</span>
      }
    </a>
  `,
  styles: `
    :host {
      display: inline-block;
    }

    .btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      gap: 2.75rem;
      width: 100%;
      height: 3.125rem;
      padding: 0 1.25rem 0 1.5rem;
      border: 1px solid;
      font-family: var(--button);
      font-weight: 700;
      font-size: 0.875rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      text-decoration: none;
      white-space: nowrap;
      transition: filter 0.3s;
    }

    .btn::before {
      content: '';
      position: absolute;
      inset: 4px;
      border: 1px solid;
      pointer-events: none;
    }

    .small {
      height: 2.75rem;
      padding: 0 1rem 0 1.25rem;
      gap: 2.125rem;
      font-size: 0.8125rem;
    }

    .chev {
      display: block;
      width: 8px;
      height: 14px;
      transition: transform 0.3s;
    }

    .btn:hover {
      filter: brightness(1.14);
    }

    .btn:hover .chev {
      transform: translateX(3px);
    }

    .btn[data-variant='primary'] {
      background: linear-gradient(180deg, #931012 0%, #7c0305 50%, #5c0204 100%);
      border-color: #b8474d;
      color: #ecd5a6;
      box-shadow:
        inset 0 0 16px rgba(30, 0, 0, 0.45),
        inset 0 1px 0 rgba(255, 190, 170, 0.12);
    }

    .btn[data-variant='primary']::before {
      border-color: rgba(214, 110, 116, 0.5);
    }

    .btn[data-variant='ghost'] {
      background: linear-gradient(180deg, #594a31 0%, #47392a 50%, #362b1e 100%);
      border-color: #8f7748;
      color: #e3c98f;
      box-shadow:
        inset 0 0 16px rgba(10, 6, 0, 0.45),
        inset 0 1px 0 rgba(255, 230, 170, 0.1);
    }

    .btn[data-variant='ghost']::before {
      border-color: rgba(176, 148, 92, 0.45);
    }

    .btn[data-variant='primary']:hover {
      color: #ecd5a6;
    }

    .btn[data-variant='ghost']:hover {
      color: #e3c98f;
    }
  `,
})
export class Button {
  readonly href = input.required<string>();
  readonly variant = input<'primary' | 'ghost'>('primary');
  /** Written as a bare attribute: `<app-button external>`. */
  readonly external = input(false, { transform: booleanAttribute });
  /** The size of the bar at the top; written as a bare attribute: `<app-button small>`. */
  readonly small = input(false, { transform: booleanAttribute });
}
