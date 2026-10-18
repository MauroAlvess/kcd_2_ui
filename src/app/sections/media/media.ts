import { Component, viewChildren } from '@angular/core';
import { CLIPS, SHOTS } from '../../content/media';
import { Lightbox, type LightboxPicture } from '../../shared/ui/lightbox/lightbox';
import { Section } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';
import { ClipCard } from './clip-card/clip-card';
import { ShotCard } from './shot-card/shot-card';

/**
 * The gallery: the server's videos (the first one big) and its screenshots, which open large in a view of their own.
 * Only one video plays at a time: starting one stops the others.
 */
@Component({
  selector: 'app-media',
  imports: [Section, SectionHeading, ClipCard, ShotCard, Lightbox],
  templateUrl: './media.html',
  styleUrl: './media.css',
})
export class Media {
  protected readonly clips = CLIPS;
  protected readonly shots = SHOTS;
  /** What the enlarged view shows: the large file of each screenshot, under its title. */
  protected readonly pictures: readonly LightboxPicture[] = SHOTS.map((shot) => ({
    src: shot.large.src,
    width: shot.large.width,
    height: shot.large.height,
    alt: shot.alt,
    caption: shot.title,
  }));

  private readonly cards = viewChildren(ClipCard);

  protected pauseOthers(id: string): void {
    for (const card of this.cards()) {
      if (card.clip().id !== id) {
        card.pause();
      }
    }
  }
}
