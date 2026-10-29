import { Component } from '@angular/core';
import { HOUSES, HOUSES_EYEBROW, HOUSES_LEAD, HOUSES_TITLE } from '../../content/houses';
import { Reveal } from '../../shared/ui/reveal/reveal';
import { Section } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';

/**
 * The war of the two houses (2026-10-29, the user: "uma jogada de cores melhor... usar nossas imagens de uma forma melhor"): the band is painted red on the left and
 * blue on the right, the colours of the Lion and of the Raven, with the two knights of the user's "hero.png" standing each on his own colour and the words between
 * them. On a phone the words come first and the two knights stand side by side on the two colours below.
 */
@Component({
  selector: 'app-houses',
  imports: [Reveal, Section, SectionHeading],
  templateUrl: './houses.html',
  styleUrl: './houses.css',
})
export class Houses {
  protected readonly eyebrow = HOUSES_EYEBROW;
  protected readonly title = HOUSES_TITLE;
  protected readonly lead = HOUSES_LEAD;
  protected readonly houses = HOUSES;
}
