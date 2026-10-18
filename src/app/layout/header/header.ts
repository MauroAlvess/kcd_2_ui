import { Component, signal } from '@angular/core';
import { NAV } from '../../core/site';

/**
 * The bar that stays at the top: the name and the section links. On a narrow screen the links fold into a menu behind one button, which closes by itself when a link is followed or Escape is pressed.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
  host: { '(document:keydown.escape)': 'close()' },
})
export class Header {
  protected readonly nav = NAV;
  protected readonly open = signal(false);

  protected toggle(): void {
    this.open.update((value) => !value);
  }

  protected close(): void {
    this.open.set(false);
  }
}
