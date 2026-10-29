import {
  Component,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { PILLARS, PITCH_EYEBROW, PITCH_TITLE, PITCH_TITLE_EM, SHOTS } from '../../content/pitch';
import { ScrollState, clamp } from '../../core/scroll';

/**
 * What the realm offers, told in four short lines under one assertive title (2026-10-28, the user: "um site que passe informações que atraem jogadores novos
 * a entrar no RP, minimalista, simples, que venda a ideia sem precisar ser gigante"), and the game itself in two pictures taken on the server.
 *
 * In the new identity (2026-10-29) the four lines take turns on a stage while the page is held still: the page is 3400 px tall there and the title stays in
 * place, the line on show and its picture change with how far it is scrolled, the new picture wiping in from the right. That needs a browser that moves:
 * the page as it is prerendered, with no scripts, and for a visitor who asked for less motion, the four are one under the other, each with its picture,
 * and nothing is held.
 */
@Component({
  selector: 'app-pitch',
  templateUrl: './pitch.html',
  styleUrl: './pitch.css',
})
export class Pitch {
  protected readonly eyebrow = PITCH_EYEBROW;
  protected readonly title = PITCH_TITLE;
  protected readonly titleEm = PITCH_TITLE_EM;
  protected readonly pillars = PILLARS;
  protected readonly shots = SHOTS;

  private readonly scroll = inject(ScrollState);
  private readonly reino = viewChild<ElementRef<HTMLElement>>('reino');

  /** A browser that moves has taken the page over: the stage is held, with one pillar at a time. */
  protected readonly staged = signal(false);

  /** Which pillar is on the stage: a quarter of the held page each. */
  protected readonly on = computed(() => {
    const box = this.reino()?.nativeElement;
    if (!this.staged() || !box) {
      return 0;
    }
    this.scroll.y();
    const rect = box.getBoundingClientRect();
    const pane = Math.min(this.scroll.height(), 900);
    const progress = clamp(-rect.top / Math.max(1, rect.height - pane));
    return Math.min(PILLARS.length - 1, Math.floor(progress * PILLARS.length * 0.999));
  });

  constructor() {
    afterNextRender(() => {
      this.scroll.start();
      this.staged.set(!this.scroll.still());
    });
  }
}
