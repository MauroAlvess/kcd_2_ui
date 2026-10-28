import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CHAPTERS } from '../../content/lore';
import { Lore } from './lore';

describe('Lore', () => {
  let fixture: ComponentFixture<Lore>;
  let root: HTMLElement;

  const heads = () => Array.from(root.querySelectorAll<HTMLButtonElement>('button.head'));
  const panels = () => Array.from(root.querySelectorAll<HTMLElement>('.panel'));
  const expanded = () =>
    heads()
      .map((head, index) => (head.getAttribute('aria-expanded') === 'true' ? index : -1))
      .filter((index) => index >= 0);

  async function press(index: number): Promise<void> {
    heads()[index].click();
    await fixture.whenStable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Lore] }).compileComponents();
    fixture = TestBed.createComponent(Lore);
    root = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('has a button in a heading for every chapter, each one controlling the room of its own words', () => {
    expect(heads()).toHaveLength(CHAPTERS.length);
    heads().forEach((head, index) => {
      expect(head.closest('h3')).not.toBeNull();
      expect(head.getAttribute('aria-controls')).toBe(panels()[index].id);
      expect(head.textContent).toContain(CHAPTERS[index].title);
    });
  });

  it('folds the whole story behind one line, "Ler a história", closed until a reader opens it', () => {
    const more = root.querySelector<HTMLDetailsElement>('details.more')!;
    expect(more.querySelector('summary')?.textContent).toBe('Ler a história');
    expect(more.open).toBe(false);
    expect(more.querySelectorAll('button.head')).toHaveLength(CHAPTERS.length);
    expect(root.querySelector('.top .crest')).not.toBeNull();
  });

  it('starts with the first chapter open, and the others folded and out of reach of the keyboard', () => {
    expect(expanded()).toEqual([0]);
    expect(panels()[0].hasAttribute('inert')).toBe(false);
    for (const panel of panels().slice(1)) {
      expect(panel.hasAttribute('inert')).toBe(true);
    }
    expect(root.querySelectorAll('.chapter.open')).toHaveLength(1);
  });

  it('opens the chapter that is pressed and folds the one that was open', async () => {
    await press(3);

    expect(expanded()).toEqual([3]);
    expect(panels()[3].hasAttribute('inert')).toBe(false);
    expect(panels()[0].hasAttribute('inert')).toBe(true);
    expect(root.querySelectorAll('.chapter.open')).toHaveLength(1);
    expect(heads()[3].closest('.chapter')?.classList.contains('open')).toBe(true);
  });

  it('folds the chapter that is pressed while it is open, and opens it again the next time', async () => {
    await press(0);
    expect(expanded()).toEqual([]);
    expect(root.querySelectorAll('.chapter.open')).toHaveLength(0);

    await press(0);
    expect(expanded()).toEqual([0]);
  });

  it('keeps the words of every chapter in the page, folded or not, for a search engine', () => {
    const text = root.textContent ?? '';
    for (const chapter of CHAPTERS) {
      expect(text).toContain(chapter.title);
    }
    expect(text).toContain('E você, a quem jurará sua lealdade?');
  });
});
