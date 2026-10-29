import { Component, computed, inject } from '@angular/core';
import { SITE } from '../../core/site';
import { ScrollState } from '../../core/scroll';
import { JOIN_STEPS } from '../../content/join';
import { Button } from '../../shared/ui/button/button';
import { ServerBadge } from '../../shared/ui/server-badge/server-badge';

/**
 * The top of the page (2026-10-29, the new identity): the game's own picture of a wagon ambushed on a forest road across the whole window, darkened on the
 * left; on the left the claim, as the page's only h1 ("O rei morreu. A coroa está vaga."), the line that tells the story in one breath and the motto; on
 * the right a parchment panel, "Escolha seu destino", with the server as it is listed, who is online, the three steps to enter and the two buttons.
 * The picture drifts down and the words up as the page is scrolled, and the words fade (`ScrollState`); the server's name, in the words the search
 * engines look for, is in the h1 for those who read it with a screen reader.
 */
@Component({
  selector: 'app-hero',
  imports: [Button, ServerBadge],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  protected readonly site = SITE;
  protected readonly steps = JOIN_STEPS;
  private readonly scroll = inject(ScrollState);

  /** The picture drifts down and grows a little as the page goes up. */
  protected readonly picture = computed(() => {
    const y = this.scroll.still() ? 0 : this.scroll.y();
    return `translate3d(0, ${(y * 0.38).toFixed(1)}px, 0) scale(${(1 + Math.min(y, 900) / 6000).toFixed(4)})`;
  });

  protected readonly words = computed(() => {
    const y = this.scroll.still() ? 0 : this.scroll.y();
    return {
      transform: `translate3d(0, ${(y * -0.12).toFixed(1)}px, 0)`,
      opacity: Math.max(0, 1 - y / 700).toFixed(3),
    };
  });
}
