import { Component, ElementRef, computed, input, signal, viewChild } from '@angular/core';

/** What the enlarged view needs of a picture. */
export interface LightboxPicture {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly caption: string;
}

/**
 * A picture shown large over the page, the way a gallery does it. It is a native modal dialog, so the browser itself
 * keeps the focus inside, closes it on Escape, leaves the page behind it inert and gives the focus back to whatever
 * opened it. Left and Right (and the two arrows on the sides) go to the neighbouring picture, round the ends; a click on
 * the dark margin, or on "Fechar", closes it. Nothing is downloaded before the first time it is opened.
 */
@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.html',
  styleUrl: './lightbox.css',
})
export class Lightbox {
  readonly pictures = input.required<readonly LightboxPicture[]>();

  protected readonly index = signal(0);
  protected readonly used = signal(false);
  protected readonly current = computed(() => this.pictures()[this.index()]);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  /** Opens the view on the picture at `index`. */
  show(index: number): void {
    const last = this.pictures().length - 1;
    this.index.set(Math.max(0, Math.min(index, last)));
    this.used.set(true);
    const dialog = this.dialog().nativeElement;
    if (!dialog.open) {
      dialog.showModal();
    }
  }

  protected close(): void {
    this.dialog().nativeElement.close();
  }

  protected step(by: -1 | 1): void {
    const count = this.pictures().length;
    this.index.update((now) => (now + by + count) % count);
  }

  /** A click on the dialog itself, and not on what is inside it, is a click on the margin around the picture. */
  protected margin(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  protected keys(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.step(-1);
    } else if (event.key === 'ArrowRight') {
      this.step(1);
    }
  }
}
