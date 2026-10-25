import { Component } from '@angular/core';
import { PHOTOS, PHOTOS_EYEBROW, PHOTOS_LEAD, PHOTOS_TITLE } from '../../content/photos';
import { Lightbox, type LightboxPicture } from '../../shared/ui/lightbox/lightbox';
import { Section } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';

/**
 * The players' screenshots (2026-10-25: "uma seção de fotos no site, mídias in game de players"), a wall of pictures that open
 * large, one after the other, in a view of their own (`shared/ui/lightbox`). They come from the folder `fotos` of the project.
 */
@Component({
  selector: 'app-photos',
  imports: [Section, SectionHeading, Lightbox],
  templateUrl: './photos.html',
  styleUrl: './photos.css',
})
export class Photos {
  protected readonly eyebrow = PHOTOS_EYEBROW;
  protected readonly title = PHOTOS_TITLE;
  protected readonly lead = PHOTOS_LEAD;
  protected readonly photos = PHOTOS;
  /** What the enlarged view shows: the large file of each picture, under its title. */
  protected readonly pictures: readonly LightboxPicture[] = PHOTOS.map((photo) => ({
    src: photo.large.src,
    width: photo.large.width,
    height: photo.large.height,
    alt: photo.alt,
    caption: photo.title,
  }));
}
