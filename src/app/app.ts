import { Component, inject } from '@angular/core';
import { Seo } from './core/seo';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { Ascension } from './sections/ascension/ascension';
import { Factions } from './sections/factions/factions';
import { Family } from './sections/family/family';
import { Guilds } from './sections/guilds/guilds';
import { Hierarchy } from './sections/hierarchy/hierarchy';
import { Hero } from './sections/hero/hero';
import { Join } from './sections/join/join';
import { Lore } from './sections/lore/lore';
import { Media } from './sections/media/media';
import { World } from './sections/world/world';

/**
 * The whole site is one page: a header, ten sections in the order a visitor reads them, and a footer. Each section is a
 * component of its own under `sections/`; what is shared lives under `shared/ui/`, the texts under `content/`.
 */
@Component({
  selector: 'app-root',
  imports: [
    Header,
    Hero,
    Guilds,
    Family,
    Factions,
    Ascension,
    Hierarchy,
    Lore,
    World,
    Media,
    Join,
    Footer,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor() {
    inject(Seo).apply();
  }
}
