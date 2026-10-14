import { Component, signal } from '@angular/core';
import { NAV, SITE } from '../../core/site';
import { Button } from '../../shared/ui/button/button';

/**
 * The bar that stays at the top: the name, the section links and the Discord button. On a narrow screen the links and the
 * button fold into a menu behind one button, which closes by itself when a link is followed or Escape is pressed.
 */
@Component({
  selector: 'app-header',
  imports: [Button],
  templateUrl: './header.html',
  styleUrl: './header.css',
  host: { '(document:keydown.escape)': 'close()' },
})
export class Header {
  protected readonly nav = NAV;
  protected readonly site = SITE;
  protected readonly open = signal(false);

  protected toggle(): void {
    this.open.update((value) => !value);
  }

  protected close(): void {
    this.open.set(false);
  }
}
