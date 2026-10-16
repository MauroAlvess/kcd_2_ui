import { Component } from '@angular/core';
import { CHAPTERS, LORE_ENDING, LORE_EYEBROW, LORE_TITLE } from '../../content/lore';
import { Rich } from '../../shared/ui/rich/rich';
import { Section } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';

/**
 * The story of the crown of Kuttenberg after King Sigismund's death: the alliance of four houses, the letters that never
 * arrived, and the war over who is to rule. The title and the list of chapters stay in view on a wide screen while the long
 * text scrolls beside them.
 */
@Component({
  selector: 'app-lore',
  imports: [Rich, Section, SectionHeading],
  templateUrl: './lore.html',
  styleUrl: './lore.css',
})
export class Lore {
  protected readonly eyebrow = LORE_EYEBROW;
  protected readonly title = LORE_TITLE;
  protected readonly chapters = CHAPTERS;
  protected readonly ending = LORE_ENDING;
}
