import { Component } from '@angular/core';
import { GUILDS } from '../../content/guilds';
import { Section } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';
import { GuildCard } from './guild-card/guild-card';

/** The guilds: choose a craft and start with what it needs. */
@Component({
  selector: 'app-guilds',
  imports: [Section, SectionHeading, GuildCard],
  templateUrl: './guilds.html',
  styleUrl: './guilds.css',
})
export class Guilds {
  protected readonly guilds = GUILDS;
}
