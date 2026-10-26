import { Component, signal } from '@angular/core';
import { MAP_ALT, REALM_HOUSES, type RealmHouseId } from '../../content/realm';
import { Reveal } from '../../shared/ui/reveal/reveal';
import { Section } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';

/**
 * The realm the war is about: the map of the region, laid on the parchment, with the houses' crests where they rule.
 * A crest is a button: it brings up its house beside the map (below it on a narrow screen), and the row of names under
 * the house does the same for a thumb that misses a crest. Every house is in the page; the others are hidden, not
 * missing, so a search engine reads them all. The crown's is shown first.
 */
@Component({
  selector: 'app-realm',
  imports: [Reveal, Section, SectionHeading],
  templateUrl: './realm.html',
  styleUrl: './realm.css',
})
export class Realm {
  protected readonly houses = REALM_HOUSES;
  protected readonly mapAlt = MAP_ALT;
  protected readonly selected = signal<RealmHouseId>('kuttenberg');

  protected select(id: RealmHouseId): void {
    this.selected.set(id);
  }
}
