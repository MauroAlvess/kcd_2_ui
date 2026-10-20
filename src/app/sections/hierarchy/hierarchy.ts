import { Component } from '@angular/core';
import { TIERS, TREE_LEVELS } from '../../content/hierarchy';
import { Section } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';

/**
 * The order of the realm as a whole tree, from the Rei at the top to the people at the roots (the embroidered picture), each
 * row named beside it with examples of who stands there; and, folded under it, every title one by one, with the sentence of each
 * as its tooltip. The same catalog as the in-game panel's Nomeação section.
 */
@Component({
  selector: 'app-hierarchy',
  imports: [Section, SectionHeading],
  templateUrl: './hierarchy.html',
  styleUrl: './hierarchy.css',
})
export class Hierarchy {
  protected readonly tiers = TIERS;
  protected readonly levels = TREE_LEVELS;
}
