import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { PHOTOS, PHOTOS_EYEBROW, PHOTOS_LEAD, PHOTOS_TITLE } from '../../content/photos';
import { Lightbox, type LightboxPicture } from '../../shared/ui/lightbox/lightbox';
import { Section } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';

/**
 * The players' screenshots (2026-10-25: "uma seção de fotos no site, mídias in game de players", then "em carrossel"), in a carousel: a
 * row of pictures that scrolls and snaps one at a time, the next one peeking in at the side, with two arrows, a counter and a dot for
 * each picture. It is the browser's own scrolling (scroll snap), so a finger, the wheel, the arrow keys and the buttons all do the same;
 * a picture opens large, one after the other, in the view of `shared/ui/lightbox`. They come from the folder `fotos` of the project.
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

  /** The picture the carousel is on: the one nearest the left edge of the row. */
  protected readonly current = signal(0);
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');

  /** Moves to the picture at `index` (round the ends, the way the arrows of a gallery do). */
  protected go(index: number): void {
    const count = this.photos.length;
    const target = (index + count) % count;
    const track = this.track().nativeElement;
    const slide = track.children.item(target) as HTMLElement | null;
    this.current.set(target);
    if (slide === null || typeof track.scrollTo !== 'function') {
      return;
    }
    const left = slide.offsetLeft;
    const calm = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left, behavior: calm ? 'auto' : 'smooth' });
  }

  protected step(by: -1 | 1): void {
    this.go(this.current() + by);
  }

  /** The row was scrolled (by a finger, the wheel, the keys or the arrows): the counter follows the picture nearest the left edge. */
  protected scrolled(): void {
    const track = this.track().nativeElement;
    let best = 0;
    let nearest = Infinity;
    for (let at = 0; at < track.children.length; at++) {
      const slide = track.children.item(at) as HTMLElement;
      const distance = Math.abs(slide.offsetLeft - track.scrollLeft);
      if (distance < nearest) {
        nearest = distance;
        best = at;
      }
    }
    if (best !== this.current()) {
      this.current.set(best);
    }
  }
}
