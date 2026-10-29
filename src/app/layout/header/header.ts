import { Component, inject } from '@angular/core';
import { SITE } from '../../core/site';
import { ScrollState } from '../../core/scroll';
import { Button } from '../../shared/ui/button/button';

/**
 * The bar at the top (2026-10-29, the new identity): the crest and the name on the left, "Kuttenberg, Anno Domini 1403" in the middle and the two buttons, the
 * launcher and the Discord, on the right. Over the opening's picture it is see-through and tall; it turns dark and a little lower as soon as the page is
 * scrolled. On a narrow screen the middle and the launcher are left out, and the Discord stays.
 */
@Component({
  selector: 'app-header',
  imports: [Button],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected readonly site = SITE;
  private readonly scroll = inject(ScrollState);

  /** The page has left its very top. The prerendered page is at the top, so it starts see-through. */
  protected scrolled(): boolean {
    return this.scroll.y() > 40;
  }
}
