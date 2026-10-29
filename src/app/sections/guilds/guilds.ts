import { Component } from '@angular/core';
import { GUILDS } from '../../content/guilds';
import { Reveal } from '../../shared/ui/reveal/reveal';
import { Section } from '../../shared/ui/section/section';
import type { SectionImage } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';
import { GuildCard } from './guild-card/guild-card';

/** The guilds: choose a craft and start with what it needs. They stand on the night blue over the user's picture of the hunt (2026-10-29), a forest in the mist. */
@Component({
  selector: 'app-guilds',
  imports: [Reveal, Section, SectionHeading, GuildCard],
  templateUrl: './guilds.html',
  styleUrl: './guilds.css',
})
export class Guilds {
  protected readonly guilds = GUILDS;
  protected readonly forest: SectionImage = {
    src: 'img/forest-1920.webp',
    srcset: 'img/forest-960.webp 960w, img/forest-1920.webp 1920w',
    position: '50% 45%',
    tint: 0.8,
  };
}
