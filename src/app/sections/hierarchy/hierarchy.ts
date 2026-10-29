import { Component } from '@angular/core';
import { TIERS, TREE_LEVELS } from '../../content/hierarchy';

/** The Roman numerals of the ladder, from the Crown (VII) down to the people (I). */
const NUMERALS = ['VII', 'VI', 'V', 'IV', 'III', 'II', 'I'];

/**
 * The order of the realm as a ladder (2026-10-29, the new identity, "Do arado ao trono"): seven rungs from the Crown down to the people, each with
 * examples of who stands there; and, folded under it, every title one by one, with the sentence of each as its tooltip. The same catalog as the
 * in-game panel's Nomeação section.
 */
@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.html',
  styleUrl: './hierarchy.css',
})
export class Hierarchy {
  protected readonly tiers = TIERS;
  protected readonly levels = TREE_LEVELS.map((level, index) => ({
    ...level,
    numeral: NUMERALS[index] ?? '',
    /** The Crown and the people are set larger than the rungs between. */
    big: index === 0 || index === TREE_LEVELS.length - 1,
  }));
}
