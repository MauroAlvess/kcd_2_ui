import { Component } from '@angular/core';
import { HOLDINGS, HOLDINGS_INTRO, HOLDINGS_TITLE } from '../../../content/holdings';

/** A house and its chests, a horse, a dog: what a player owns besides a family, under the family tree. */
@Component({
  selector: 'app-holdings',
  templateUrl: './holdings.html',
  styleUrl: './holdings.css',
})
export class Holdings {
  protected readonly title = HOLDINGS_TITLE;
  protected readonly intro = HOLDINGS_INTRO;
  protected readonly holdings = HOLDINGS;
}
