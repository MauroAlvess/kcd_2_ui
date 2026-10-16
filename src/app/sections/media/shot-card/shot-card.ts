import { Component, input, output } from '@angular/core';
import type { Shot } from '../../../content/media';

/**
 * One screenshot of the gallery, in its frame, with its title underneath. The picture is a button: pressing it asks the
 * gallery to show the large one (`opened`).
 */
@Component({
  selector: 'app-shot-card',
  templateUrl: './shot-card.html',
  styleUrl: './shot-card.css',
})
export class ShotCard {
  readonly shot = input.required<Shot>();
  readonly opened = output<void>();
}
