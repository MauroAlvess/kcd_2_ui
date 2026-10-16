import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TRAILER } from '../../../content/media';

/**
 * The card of the server's first trailer, in the opening. It is a plain link to the video on YouTube (it works with no
 * script, and a click with Ctrl or Shift is the link's own); an ordinary click plays the trailer in a modal dialog instead,
 * and only then is the player built, from YouTube's no-cookie address, so nothing is asked of YouTube before that. Closing
 * the dialog (Escape, the margin, "Fechar") takes the player away, which stops the sound.
 */
@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.html',
  styleUrl: './trailer.css',
})
export class Trailer {
  protected readonly trailer = TRAILER;
  protected readonly watch = `https://www.youtube.com/watch?v=${TRAILER.id}`;
  protected readonly embed: SafeResourceUrl = inject(DomSanitizer).bypassSecurityTrustResourceUrl(
    `https://www.youtube-nocookie.com/embed/${TRAILER.id}?autoplay=1&rel=0&modestbranding=1`,
  );
  protected readonly playing = signal(false);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  protected open(event: MouseEvent): void {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    this.playing.set(true);
    this.dialog().nativeElement.showModal();
  }

  protected close(): void {
    this.dialog().nativeElement.close();
  }

  /** A click on the dialog itself, and not on what is inside it, is a click on the margin around the player. */
  protected margin(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  protected stop(): void {
    this.playing.set(false);
  }
}
