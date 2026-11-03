import { Component, DestroyRef, inject, signal } from '@angular/core';
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser';
import {
  CHRONICLES,
  CHRONICLES_EYEBROW,
  CHRONICLES_LEAD,
  CHRONICLES_TITLE,
  CHRONICLES_TITLE_EM,
  embedUrl,
  isVideoId,
  watchUrl,
  type Chronicle,
} from '../../content/chronicles';
import { srcsetOf } from '../../content/pitch';

/** How long the pointer rests on the card at the side before it takes the middle (a pointer only passing by moves nothing). */
export const DWELL_MS = 260;

interface Slide extends Chronicle {
  /** "Ato I: O primeiro conflito": what the card and its player are called. */
  readonly title: string;
  readonly watch: string;
  readonly embed: SafeResourceUrl;
}

/**
 * The Crônicas da Boêmia (2026-11-03, the user: "vamos criar a seção crônicas da Boêmia ... os vídeos tipo carrossel ... ao passar o mouse ou clicar em um ele vai para o meio
 * ocupando o local do outro", right under the opening): the videos the server's channel makes of what its players lived, as a row of cards in which the one on show stands in
 * the middle, large, and the next peeks in at its side, smaller and dimmed. A pointer that rests on the card at the side (or a click or a tap on it, or the arrow keys) brings it
 * to the middle and sends the other to the side it came from; a click on the one in the middle plays it, in place. Nothing of YouTube is loaded until then: the covers are the
 * page's own files, the player is the privacy domain's and only opens on the click. With no scripts the cover is still there, and the caption's link takes the visitor to the video.
 * It is made for more than two: the cards two places away from the middle are out of sight.
 */
@Component({
  selector: 'app-chronicles',
  templateUrl: './chronicles.html',
  styleUrl: './chronicles.css',
})
export class Chronicles {
  protected readonly eyebrow = CHRONICLES_EYEBROW;
  protected readonly title = CHRONICLES_TITLE;
  protected readonly titleEm = CHRONICLES_TITLE_EM;
  protected readonly lead = CHRONICLES_LEAD;

  private readonly sanitizer = inject(DomSanitizer);

  protected readonly slides: readonly Slide[] = CHRONICLES.map((chronicle) => {
    // The one address the player is trusted with is built here, of an id that is eleven plain characters.
    if (!isVideoId(chronicle.video)) {
      throw new Error(`${chronicle.id}: "${chronicle.video}" is not a YouTube id`);
    }
    return {
      ...chronicle,
      title: `${chronicle.label}: ${chronicle.name} ${chronicle.nameEm}`,
      watch: watchUrl(chronicle.video),
      embed: this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl(chronicle.video)),
    };
  });

  /** The two covers of a card, each with its width, for the browser to choose from. */
  protected readonly srcset = (slide: Chronicle): string => srcsetOf(slide.small, slide.large);

  /** Which card is in the middle. */
  protected readonly active = signal(0);
  /** Which card is playing, if one is: its player is open in place of its cover. */
  protected readonly playing = signal<number | null>(null);

  private pending: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stopDwell());
  }

  /** Where a card stands: 0 in the middle, -1 and 1 at its sides, farther out of sight. */
  protected offset(at: number): number {
    return at - this.active();
  }

  /** What a card's button does, in words. */
  protected action(at: number): string {
    const slide = this.slides[at];
    return this.offset(at) === 0 ? `Assistir ${slide.title}` : `Mostrar ${slide.title}`;
  }

  /** A click or a tap: the card in the middle plays, any other comes to the middle. */
  protected choose(at: number): void {
    if (at === this.active()) {
      this.playing.set(at);
    } else {
      this.select(at);
    }
  }

  /** Brings a card to the middle; what was playing is put away (its cover comes back). */
  protected select(at: number): void {
    this.stopDwell();
    if (at < 0 || at >= this.slides.length) {
      return;
    }
    this.active.set(at);
    this.playing.set(null);
  }

  /** The arrow keys: the next card on the left or on the right, when there is one. */
  protected move(by: number): void {
    this.select(this.active() + by);
  }

  /** A mouse that rests on a card at the side: after a moment it comes to the middle. Not while a video plays (it would be taken from the viewer), and never for a finger. */
  protected dwell(at: number, event: PointerEvent): void {
    if (event.pointerType !== 'mouse' || at === this.active() || this.playing() !== null) {
      return;
    }
    this.stopDwell();
    this.pending = setTimeout(() => {
      this.pending = null;
      if (this.playing() === null) {
        this.select(at);
      }
    }, DWELL_MS);
  }

  protected stopDwell(): void {
    if (this.pending !== null) {
      clearTimeout(this.pending);
      this.pending = null;
    }
  }
}
