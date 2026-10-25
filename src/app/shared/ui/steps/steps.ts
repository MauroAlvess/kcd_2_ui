import { Component, input } from '@angular/core';
import { Icon } from '../icon/icon';
import type { IconName } from '../icon/icons';

export interface Step {
  /** The mark in front of the step: a Roman numeral, or a plain number. */
  readonly numeral: string;
  /** A line drawing beside the numeral (user, 2026-10-25: "ícones nos sites também"). */
  readonly icon?: IconName;
  readonly title: string;
  readonly text: string;
}

/**
 * A numbered sequence: three ranks, four episodes of a war, the steps to join. `columns` lays the steps side by side and
 * `timeline` stacks them with the numeral to the left. It is an ordered list, so a screen reader already counts the steps;
 * the numeral and the drawing beside it are for the eye only.
 */
@Component({
  selector: 'app-steps',
  imports: [Icon],
  templateUrl: './steps.html',
  styleUrl: './steps.css',
})
export class Steps {
  readonly steps = input.required<readonly Step[]>();
  readonly layout = input<'columns' | 'timeline'>('columns');
}
