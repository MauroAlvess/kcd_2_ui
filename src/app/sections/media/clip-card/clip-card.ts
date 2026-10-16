import { Component, ElementRef, booleanAttribute, input, output, viewChild } from '@angular/core';
import type { Clip } from '../../../content/media';

/**
 * One video of the gallery, in its frame, with its title and length underneath. The file is not downloaded before it is
 * played: the page shows the poster, and `preload="none"` keeps the browser from fetching ahead (the biggest is 13 MB).
 * The featured one takes the whole row of the grid it sits in.
 */
@Component({
  selector: 'app-clip-card',
  templateUrl: './clip-card.html',
  styleUrl: './clip-card.css',
  host: { '[class.featured]': 'featured()' },
})
export class ClipCard {
  readonly clip = input.required<Clip>();
  readonly featured = input(false, { transform: booleanAttribute });
  /** The visitor started this video: the gallery stops the others. */
  readonly played = output<void>();

  private readonly video = viewChild.required<ElementRef<HTMLVideoElement>>('video');

  pause(): void {
    this.video().nativeElement.pause();
  }
}
