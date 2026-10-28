import { Component } from '@angular/core';
import { PILLARS, PITCH_EYEBROW, PITCH_LEAD, PITCH_TITLE, SHOTS } from '../../content/pitch';
import { Reveal } from '../../shared/ui/reveal/reveal';
import { Section } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';

/**
 * What the realm offers, told in four short lines under one assertive title, and the game itself in three pictures taken on the server
 * (2026-10-28, the user: "refaça as seções: um site que passe informações que atraem jogadores novos a entrar no RP, minimalista, simples,
 * que venda a ideia sem precisar ser gigante"). It takes the place of what the family and the holdings bands said at length; the guilds and
 * the hierarchy that follow say the rest. The lion of the game's panel closes the top of it, on the left.
 */
@Component({
  selector: 'app-pitch',
  imports: [Reveal, Section, SectionHeading],
  templateUrl: './pitch.html',
  styleUrl: './pitch.css',
})
export class Pitch {
  protected readonly eyebrow = PITCH_EYEBROW;
  protected readonly title = PITCH_TITLE;
  protected readonly lead = PITCH_LEAD;
  protected readonly pillars = PILLARS;
  protected readonly shots = SHOTS;
}
