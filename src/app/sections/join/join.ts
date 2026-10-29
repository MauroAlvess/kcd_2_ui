import { Component, computed, inject } from '@angular/core';
import { SITE } from '../../core/site';
import { ScrollState } from '../../core/scroll';
import { Button } from '../../shared/ui/button/button';
import { ServerBadge } from '../../shared/ui/server-badge/server-badge';

/**
 * The closing call (2026-10-29, the new identity): the picture of the knight resting under the tree across the whole width, dark at the top and the foot
 * and on the left where the words stand, "Sua lenda começa hoje", and the two buttons. The three steps are in the opening's panel; here the call is short.
 * The picture drifts a little with the scroll.
 */
@Component({
  selector: 'app-join',
  imports: [Button, ServerBadge],
  templateUrl: './join.html',
  styleUrl: './join.css',
})
export class Join {
  protected readonly site = SITE;
  private readonly scroll = inject(ScrollState);

  protected readonly drift = computed(() => {
    if (this.scroll.still()) {
      return 'none';
    }
    const box = typeof document === 'undefined' ? null : document.getElementById('entrar');
    return `translate3d(0, ${((this.scroll.progress(box) - 0.5) * -160).toFixed(1)}px, 0)`;
  });
}
