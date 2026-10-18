import { Component } from '@angular/core';
import { TIERS } from '../../content/hierarchy';
import { Section } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';

/**
 * The order of the realm, from the Rei down to the commoners: every tier with the titles it holds, and the tree that draws
 * it. The sentence of each title is its tooltip, so the page stays light. The same catalog as the in-game panel's Nomeação
 * section.
 */
@Component({
  selector: 'app-hierarchy',
  imports: [Section, SectionHeading],
  templateUrl: './hierarchy.html',
  styleUrl: './hierarchy.css',
})
export class Hierarchy {
  protected readonly tiers = TIERS;
}
