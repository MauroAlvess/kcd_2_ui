import {
  Component,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import {
  CHAPTERS,
  EPISODES,
  LORE_ENDING,
  LORE_EYEBROW,
  LORE_LEAD,
  LORE_TITLE,
  LORE_TITLE_EM,
} from '../../content/lore';
import { ScrollState, clamp } from '../../core/scroll';
import { Rich } from '../../shared/ui/rich/rich';

/**
 * The story of the crown of Kuttenberg after King Sigismund's death (2026-10-29, the new identity): the title, the map of the region, held in place
 * and settling as it comes into view, beside the story in seven lines. The whole of it, chapter by chapter, is folded under a line of its own: the
 * chapters fold like an accordion, one open at a time (the first at the start), a chapter opening and closing with a slide and its plus turning into a
 * minus (2026-10-20: "um efeito ao abrir e fechar"). Closed, a chapter's words stay in the page for a search engine but are out of reach of the keyboard
 * and of a screen reader.
 */
@Component({
  selector: 'app-lore',
  imports: [Rich],
  templateUrl: './lore.html',
  styleUrl: './lore.css',
})
export class Lore {
  protected readonly eyebrow = LORE_EYEBROW;
  protected readonly title = LORE_TITLE;
  protected readonly titleEm = LORE_TITLE_EM;
  protected readonly lead = LORE_LEAD;
  protected readonly episodes = EPISODES;
  protected readonly chapters = CHAPTERS;
  protected readonly ending = LORE_ENDING;

  private readonly scroll = inject(ScrollState);
  private readonly section = viewChild<ElementRef<HTMLElement>>('lore');
  private readonly ready = signal(false);

  /** The map starts a little large and settles as the story comes into view. */
  protected readonly zoom = computed(() => {
    const box = this.section()?.nativeElement;
    if (!this.ready() || this.scroll.still() || !box) {
      return 'scale(1)';
    }
    const settled = clamp((this.scroll.progress(box) - 0.08) / 0.32);
    return `scale(${(1.14 - settled * 0.14).toFixed(3)})`;
  });

  /** The chapter that is open, if any. */
  protected readonly open = signal<string | null>(CHAPTERS[0].id);

  constructor() {
    afterNextRender(() => {
      this.scroll.start();
      this.ready.set(true);
    });
  }

  /** Opens a chapter, closing the one that was open; asking for the open one closes it. */
  protected toggle(id: string): void {
    this.open.update((current) => (current === id ? null : id));
  }
}
