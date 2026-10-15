import { Component } from '@angular/core';
import { RULES, TIERS } from '../../content/hierarchy';
import { Section } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';
import { Steps } from '../../shared/ui/steps/steps';

/**
 * The order of the realm, from the Rei down to the commoners: every title with what it is, who names whom, and the tree
 * that draws it. The same catalog as the in-game panel's Nomeação section.
 */
@Component({
  selector: 'app-hierarchy',
  imports: [Section, SectionHeading, Steps],
  templateUrl: './hierarchy.html',
  styleUrl: './hierarchy.css',
})
export class Hierarchy {
  protected readonly tiers = TIERS;
  protected readonly rules = RULES;
}
