import { Component, inject } from '@angular/core';
import { Seo } from './core/seo';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { Factions } from './sections/factions/factions';
import { Family } from './sections/family/family';
import { Guilds } from './sections/guilds/guilds';
import { Hero } from './sections/hero/hero';
import { Hierarchy } from './sections/hierarchy/hierarchy';
import { Holdings } from './sections/holdings/holdings';
import { Join } from './sections/join/join';
import { Lore } from './sections/lore/lore';
import { Photos } from './sections/photos/photos';
import { Realm } from './sections/realm/realm';
import { Rules } from './sections/rules/rules';
import { Curtain } from './shared/ui/curtain/curtain';
import { ScrollHint } from './shared/ui/scroll-hint/scroll-hint';

/**
 * The whole site is one page, told like a chronicle: the opening, the realm and its five houses, the two factions, the guilds,
 * the family, the order of the realm, what a player can have or be given, the story of the crown, the laws, and the way in.
 * Each section is a component of its own under `sections/`; what is shared lives under `shared/ui/`, the texts under
 * `content/`. The site's own scrollbar is hidden (see styles.css): a circle with an arrow in the corner takes its place at the top.
 */
@Component({
  selector: 'app-root',
  imports: [
    Curtain,
    Header,
    Hero,
    Realm,
    Factions,
    Guilds,
    Family,
    Hierarchy,
    Holdings,
    Lore,
    Rules,
    Join,
    Photos,
    Footer,
    ScrollHint,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor() {
    inject(Seo).apply();
  }
}
