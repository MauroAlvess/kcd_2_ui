import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { NAV } from '../../core/site';
import { Icon } from '../../shared/ui/icon/icon';

/**
 * The bar at the top: the name and the section links. Over the opening's moving picture it is see-through, and it turns
 * solid black as soon as the page is scrolled, so the links stay readable over the parchment. On a narrow screen the links
 * fold into a menu behind one button, which closes by itself when a link is followed or Escape is pressed; there every link
 * has the line drawing of its section in front of it (user, 2026-10-25: "ícones nos sites também").
 */
@Component({
  selector: 'app-header',
  imports: [Icon],
  templateUrl: './header.html',
  styleUrl: './header.css',
  host: { '(document:keydown.escape)': 'close()' },
})
export class Header {
  protected readonly nav = NAV;
  protected readonly open = signal(false);
  /** The page has left its very top. The prerendered page is at the top, so it starts see-through. */
  protected readonly scrolled = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const update = () => this.scrolled.set(window.scrollY > 24);
      update();
      window.addEventListener('scroll', update, { passive: true });
      destroyRef.onDestroy(() => window.removeEventListener('scroll', update));
    });
  }

  protected toggle(): void {
    this.open.update((value) => !value);
  }

  protected close(): void {
    this.open.set(false);
  }
}
