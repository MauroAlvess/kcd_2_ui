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

  it('is the section the navigation calls "casas", named by its heading, in the night tone with its own red and blue behind it', () => {
    const section = root.querySelector('section#casas');
    expect(section?.classList.contains('night')).toBe(true);
    const heading = root.querySelector(`#${section?.getAttribute('aria-labelledby')}`);
    expect(heading?.tagName).toBe('H2');
    expect(heading?.textContent).toBe('Leão ou Corvo');
    const halves = section?.querySelector(':scope > .halves');
    expect(halves?.getAttribute('aria-hidden')).toBe('true');
    expect(Array.from(halves?.children ?? [], (half) => half.className)).toEqual(['lion', 'raven']);
  });

  it('stands each knight on his own colour, the Lion on the left and the Raven on the right, with the house named above him and his size given', () => {
    const figures = Array.from(root.querySelectorAll('figure.house'));
    expect(figures.map((figure) => (figure.className.includes('leao') ? 'leao' : 'corvo'))).toEqual(
      ['leao', 'corvo'],
    );
    figures.forEach((figure, at) => {
      const image = figure.querySelector<HTMLImageElement>('img')!;
      expect(image.getAttribute('src')).toBe(`img/${HOUSES[at].image}`);
      expect(image.getAttribute('alt')).toBe(HOUSES[at].alt);
      expect(image.getAttribute('width')).toBe(String(HOUSES[at].width));
      expect(image.getAttribute('height')).toBe(String(HOUSES[at].height));
      expect(figure.querySelector('figcaption')?.textContent).toBe(HOUSES[at].name);
      expect(figure.firstElementChild?.tagName).toBe('FIGCAPTION');
    });
  });

  it('says what choosing means: a side is taken, and there is no going back', () => {
    const lead = root.querySelector('.lead')?.textContent ?? '';
    expect(lead).toContain('Jurar lealdade');
    expect(lead).toContain('não tem volta');
  });
});
