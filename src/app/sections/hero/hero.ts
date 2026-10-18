import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { SITE } from '../../core/site';
import { Button } from '../../shared/ui/button/button';
import { ServerBadge } from '../../shared/ui/server-badge/server-badge';

/**
 * Whether the visitor's browser should be given the moving picture: not when they ask for less motion (the system's
 * "reduce motion"), nor when they save data (a phone's data saver). Without it the still of the first frame stays.
 */
export function wantsMotion(win: Window = window): boolean {
  const reduce = win.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const connection = (win.navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection;
  return !reduce && connection?.saveData !== true;
}

/**
 * The top of the page. Behind it the game's own view of Kuttenberg on its hill, the smoke and the mist moving over the
 * town (public/video, made by tools/make-hero-video.py), framed like the in-game panel with the lion and the raven in the
 * corners. In front: the emblem, the server's name as the page's only h1, the line that tells the story in one breath, and
 * the one thing to do, the Discord.
 *
 * The page arrives with the still of the video's first frame (the largest picture on the page, asked for first): the video
 * downloads nothing until the page has loaded, and then only if the visitor's browser should move (`wantsMotion`), the
 * narrow screens the 720p one. It plays muted, in a loop, and stops while the opening is out of sight.
 */
@Component({
  selector: 'app-hero',
  imports: [Button, ServerBadge],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  protected readonly site = SITE;
  /** The video has its first frame on screen: it fades in over the still, which is that same frame. */
  protected readonly playing = signal(false);

  private readonly video = viewChild.required<ElementRef<HTMLVideoElement>>('video');
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (!wantsMotion()) {
        return;
      }
      const video = this.video().nativeElement;
      // The attribute in the prerendered page already says it; the property is what a browser checks before it lets a
      // video play by itself.
      video.muted = true;
      video.addEventListener('playing', () => this.playing.set(true), { once: true });
      const play = () => {
        try {
          void video.play()?.catch(() => undefined);
        } catch {
          // A browser that cannot play it keeps the still.
        }
      };
      video.preload = 'auto';
      play();

      if (typeof IntersectionObserver !== 'undefined') {
        const observer = new IntersectionObserver(([entry]) =>
          entry?.isIntersecting ? play() : video.pause(),
        );
        observer.observe(this.host.nativeElement);
        destroyRef.onDestroy(() => observer.disconnect());
      }
    });
  }
}
