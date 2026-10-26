import { Component, signal } from '@angular/core';
import { CHAPTERS, LORE_ENDING, LORE_EYEBROW, LORE_TITLE } from '../../content/lore';
import { Rich } from '../../shared/ui/rich/rich';
import { Reveal } from '../../shared/ui/reveal/reveal';
import { Section } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';

/**
 * The story of the crown of Kuttenberg after King Sigismund's death: the alliance of four houses, the letters that never
 * arrived, and the war over who is to rule. The chapters fold like an accordion, one open at a time (the first at the start):
 * a chapter opens and closes with a slide, its words rising as they appear, and its plus turns into a minus (2026-10-20: "um
 * efeito ao abrir e fechar"). Closed, a chapter's words stay in the page for a search engine but are out of reach of the keyboard
 * and of a screen reader.
 */
@Component({
  selector: 'app-lore',
  imports: [Reveal, Rich, Section, SectionHeading],
  templateUrl: './lore.html',
  styleUrl: './lore.css',
})
export class Lore {
  protected readonly eyebrow = LORE_EYEBROW;
  protected readonly title = LORE_TITLE;
  protected readonly chapters = CHAPTERS;
  protected readonly ending = LORE_ENDING;

  /** The chapter that is open, if any. */
  protected readonly open = signal<string | null>(CHAPTERS[0].id);

  /** Opens a chapter, closing the one that was open; asking for the open one closes it. */
  protected toggle(id: string): void {
    this.open.update((current) => (current === id ? null : id));
  }
}
