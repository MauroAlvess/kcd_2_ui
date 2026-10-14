import { Component, input } from '@angular/core';
import type { Guild } from '../../../content/guilds';

/** One guild: its crest, its name in Latin and in Portuguese, what it does and what a new member is handed. */
@Component({
  selector: 'app-guild-card',
  templateUrl: './guild-card.html',
  styleUrl: './guild-card.css',
})
export class GuildCard {
  readonly guild = input.required<Guild>();
}
