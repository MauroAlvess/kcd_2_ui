import { TestBed } from '@angular/core/testing';
import { HOUSES } from '../../content/houses';
import { Houses } from './houses';

describe('Houses', () => {
  let root: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Houses] }).compileComponents();
    const fixture = TestBed.createComponent(Houses);
    root = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('is the section the navigation calls "casas", named by its h2: Leão ou Corvo', () => {
    const section = root.querySelector('section#casas');
    expect(section).not.toBeNull();
    const heading = root.querySelector(`#${section?.getAttribute('aria-labelledby')}`);
    expect(heading?.tagName).toBe('H2');
    expect(heading?.textContent?.trim()).toBe('Leão ou Corvo.');
  });

  it('shows each house in its own panel, the Lion first, with its crest, its label, its name and a line', () => {
    const articles = Array.from(root.querySelectorAll('article.house'));
    expect(articles.map((article) => article.getAttribute('data-house'))).toEqual([
      'leao',
      'corvo',
    ]);
    articles.forEach((article, at) => {
      const image = article.querySelector<HTMLImageElement>('img')!;
      expect(image.getAttribute('src')).toBe(`img/${HOUSES[at].crest}`);
      expect(image.getAttribute('alt')).toBe(HOUSES[at].alt);
      expect(article.querySelector('.label')?.textContent).toBe(HOUSES[at].label);
      expect(article.querySelector('h3')?.textContent?.trim()).toBe(
        `${HOUSES[at].name} ${HOUSES[at].nameEm}`,
      );
      expect(article.querySelector('.text')?.textContent).toBe(HOUSES[at].text);
    });
  });

  it('says what choosing means: a side is taken, and there is no going back', () => {
    const lead = root.querySelector('.lead')?.textContent ?? '';
    expect(lead).toContain('Jurar lealdade');
    expect(lead).toContain('não tem volta');
  });
});
