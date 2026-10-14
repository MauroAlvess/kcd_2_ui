import { Component } from '@angular/core';
import { WAR_STEPS } from '../../content/lore';
import { Section } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';
import { Steps } from '../../shared/ui/steps/steps';

/**
 * The story of the war between the Golden Lion and the Raven: why it began, how it grew, and the missing document at the
 * heart of it. The title stays in view on a wide screen while the long text scrolls beside it.
 */
@Component({
  selector: 'app-lore',
  imports: [Section, SectionHeading, Steps],
  templateUrl: './lore.html',
  styleUrl: './lore.css',
})
export class Lore {
  protected readonly warSteps = WAR_STEPS;
}
