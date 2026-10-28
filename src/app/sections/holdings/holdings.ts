import { Component } from '@angular/core';
import { HOLDINGS, HOLDINGS_EYEBROW, HOLDINGS_LEAD, HOLDINGS_TITLE } from '../../content/holdings';
import { Reveal } from '../../shared/ui/reveal/reveal';
import { Section } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';

/**
 * What a player can have (2026-10-20: "tenha ou receba"): the lands and castles, the horses, the carts and the dogs, one row
 * each with its crest. The supporter's half of the chapter was taken off the page on 2026-10-28 ("a seção apoiador vamos remover
 * do site também").
 */
@Component({
  selector: 'app-holdings',
  imports: [Reveal, Section, SectionHeading],
  templateUrl: './holdings.html',
  styleUrl: './holdings.css',
})
export class Holdings {
  protected readonly eyebrow = HOLDINGS_EYEBROW;
  protected readonly title = HOLDINGS_TITLE;
  protected readonly lead = HOLDINGS_LEAD;
  protected readonly holdings = HOLDINGS;
}
