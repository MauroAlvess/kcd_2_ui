import { Component } from '@angular/core';
import {
  HOUSES,
  HOUSES_EYEBROW,
  HOUSES_LEAD,
  HOUSES_TITLE,
  HOUSES_TITLE_EM,
} from '../../content/houses';

/**
 * The war of the two houses (2026-10-29, the new identity): "Leão ou Corvo", with the crest of each in a dark panel under a gilded thread, the house it
 * is, its name with the gilded words and a line on where it stands. Choosing one is taking its side, and the choice is final.
 */
@Component({
  selector: 'app-houses',
  templateUrl: './houses.html',
  styleUrl: './houses.css',
})
export class Houses {
  protected readonly eyebrow = HOUSES_EYEBROW;
  protected readonly title = HOUSES_TITLE;
  protected readonly titleEm = HOUSES_TITLE_EM;
  protected readonly lead = HOUSES_LEAD;
  protected readonly houses = HOUSES;
}
