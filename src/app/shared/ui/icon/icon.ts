import { Component, computed, input } from '@angular/core';
import { ICONS, type IconName } from './icons';

/**
 * One of the site's line drawings (see `icons.ts`), in the colour of the text around it. Its side is `--icon-size` (1.25em unless
 * the place that uses it says otherwise). It only decorates: a screen reader skips it, so whatever it stands beside has to say the
 * same in words.
 */
@Component({
  selector: 'app-icon',
  template: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      @for (d of paths(); track $index) {
        <path [attr.d]="d" />
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      flex: none;
      width: var(--icon-size, 1.25em);
      height: var(--icon-size, 1.25em);
    }

    svg {
      width: 100%;
      height: 100%;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.6;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();

  protected readonly paths = computed(() => ICONS[this.name()]);
}
