import { Component } from '@angular/core';
import { PATHS } from '../../content/world';
import { Section, type SectionImage } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';

/** What waits outside the walls, and the quiet alternative: the road with its bandits and beasts, or the fields. */
@Component({
  selector: 'app-world',
  imports: [Section, SectionHeading],
  templateUrl: './world.html',
  styleUrl: './world.css',
})
export class World {
  protected readonly paths = PATHS;
  protected readonly photo: SectionImage = {
    src: 'img/scene-cacada-1600.webp',
    srcset: 'img/scene-cacada-960.webp 960w, img/scene-cacada-1600.webp 1600w',
  };
}
