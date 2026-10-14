import { Component } from '@angular/core';
import { HOUSES } from '../../content/houses';
import { Section } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';
import { HouseCard } from './house-card/house-card';

/** The two houses at war, face to face: the player swears to one. */
@Component({
  selector: 'app-factions',
  imports: [Section, SectionHeading, HouseCard],
  templateUrl: './factions.html',
  styleUrl: './factions.css',
})
export class Factions {
  protected readonly houses = HOUSES;
}
