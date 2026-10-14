import { Component, input } from '@angular/core';
import type { House } from '../../../content/houses';

/** One of the two houses: its crest, its lord, its motto and what it stands for. */
@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.html',
  styleUrl: './house-card.css',
})
export class HouseCard {
  readonly house = input.required<House>();
}
