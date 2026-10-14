import { Component, input } from '@angular/core';

export interface Step {
  /** The mark in front of the step: a Roman numeral, or a plain number. */
  readonly numeral: string;
  readonly title: string;
  readonly text: string;
}

/**
 * A numbered sequence: three ranks, four episodes of a war, the steps to join. `columns` lays the steps side by side and
 * `timeline` stacks them with the numeral to the left. It is an ordered list, so a screen reader already counts the steps;
 * the numeral is for the eye only.
 */
@Component({
  selector: 'app-steps',
  templateUrl: './steps.html',
  styleUrl: './steps.css',
})
export class Steps {
  readonly steps = input.required<readonly Step[]>();
  readonly layout = input<'columns' | 'timeline'>('columns');
}
