import { Component, inject } from '@angular/core';
import { INTERLUDES } from './content/interludes';
import { Seo } from './core/seo';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { Family } from './sections/family/family';
import { Guilds } from './sections/guilds/guilds';
import { Hero } from './sections/hero/hero';
import { Hierarchy } from './sections/hierarchy/hierarchy';
import { Holdings } from './sections/holdings/holdings';
import { Join } from './sections/join/join';
import { Lore } from './sections/lore/lore';
import { Realm } from './sections/realm/realm';
import { Rules } from './sections/rules/rules';
import { Curtain } from './shared/ui/curtain/curtain';
import { Interlude } from './shared/ui/interlude/interlude';
import { ScrollHint } from './shared/ui/scroll-hint/scroll-hint';

/**
 * The whole site is one page, told like a chronicle: the opening, the realm and its five houses, the guilds,
 * the family, the order of the realm, what a player can have or be given, the story of the crown, the laws, and the way in.
 * Each section is a component of its own under `sections/`; what is shared lives under `shared/ui/`, the texts under
 * `content/`. The site's own scrollbar is hidden (see styles.css): a circle with an arrow in the corner takes its place at the top.
 *
 * Since 2026-10-26 ("uma experiência única ... com efeitos únicos, focando no minimalismo, sem cara de IA, mas próprio") the page is told
 * in the server's own hand, which is embroidery: a red thread is sewn along the foot of the bar as the page is read and after the label of
 * every chapter, climbs the hierarchy from the plough to the throne and sews round a guild's card under the pointer; the paper bands are
 * framed with the map's lion and raven corners, the black ones keep the map's dark clouds in two corners, and the fog over the map parts as
 * it comes into view; two photographs of the game (`app-interlude`) pause the page between chapters; the way in opens with the panel's
 * embroidered "Bene advenisti". Every movement is tied to the scroll and stands still for less motion.
 */
@Component({
  selector: 'app-root',
  imports: [
    Curtain,
    Header,
    Hero,
    Realm,
    Interlude,
    Guilds,
    Family,
    Hierarchy,
    Holdings,
    Lore,
    Rules,
    Join,
    Footer,
    ScrollHint,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  /** The photographs between the chapters. */
  protected readonly interludes = INTERLUDES;

  constructor() {
    inject(Seo).apply();
  }
}
