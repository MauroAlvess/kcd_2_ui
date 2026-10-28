import { Component, inject } from '@angular/core';
import { Seo } from './core/seo';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { Guilds } from './sections/guilds/guilds';
import { Hero } from './sections/hero/hero';
import { Hierarchy } from './sections/hierarchy/hierarchy';
import { Join } from './sections/join/join';
import { Lore } from './sections/lore/lore';
import { Pitch } from './sections/pitch/pitch';
import { Curtain } from './shared/ui/curtain/curtain';
import { ScrollHint } from './shared/ui/scroll-hint/scroll-hint';

/**
 * The whole site is one page, short on purpose (2026-10-28, the user: "minimalista, simples, que venda a ideia sem ser gigante"): the
 * opening, what the realm offers and the game in three pictures, the guilds, the order of the realm, the story of the crown folded
 * behind one line, and the way in (the family and the holdings were folded into the first of them; the map of the houses, the
 * supporter's band and the rules were taken off the same day).
 * Each section is a component of its own under `sections/`; what is shared lives under `shared/ui/`, the texts under
 * `content/`. The site's own scrollbar is hidden (see styles.css): a circle with an arrow in the corner takes its place at the top.
 */
@Component({
  selector: 'app-root',
  imports: [Curtain, Header, Hero, Pitch, Guilds, Hierarchy, Lore, Join, Footer, ScrollHint],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor() {
    inject(Seo).apply();
  }
}
