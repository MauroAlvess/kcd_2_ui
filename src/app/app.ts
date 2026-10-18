import { Component, inject } from '@angular/core';
import { Seo } from './core/seo';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { Factions } from './sections/factions/factions';
import { Family } from './sections/family/family';
import { Guilds } from './sections/guilds/guilds';
import { Hero } from './sections/hero/hero';
import { Hierarchy } from './sections/hierarchy/hierarchy';
import { Join } from './sections/join/join';
import { Lore } from './sections/lore/lore';
import { Realm } from './sections/realm/realm';
import { Rules } from './sections/rules/rules';

/**
 * The whole site is one page, told like a chronicle in eight chapters: the opening, the realm and its five houses, the two
 * factions, the guilds, the family, the order of the realm, the story of the crown, the laws, and the way in. Each section
 * is a component of its own under `sections/`; what is shared lives under `shared/ui/`, the texts under `content/`.
 */
@Component({
  selector: 'app-root',
  imports: [Header, Hero, Realm, Factions, Guilds, Family, Hierarchy, Lore, Rules, Join, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor() {
    inject(Seo).apply();
  }
}
