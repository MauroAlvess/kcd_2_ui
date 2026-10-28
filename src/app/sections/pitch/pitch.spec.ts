import { TestBed } from '@angular/core/testing';
import { PILLARS, SHOTS } from '../../content/pitch';
import { Pitch } from './pitch';

describe('Pitch', () => {
  let root: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Pitch] }).compileComponents();
    const fixture = TestBed.createComponent(Pitch);
    root = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('is the section the navigation calls "reino", named by its heading, with the lion of the panel in its top left corner', () => {
    const section = root.querySelector('section#reino');
    expect(section).not.toBeNull();
    const heading = root.querySelector(`#${section?.getAttribute('aria-labelledby')}`);
    expect(heading?.tagName).toBe('H2');
    expect(heading?.textContent).toBe('Ninguém nasce nobre');
    expect(section?.querySelector(':scope > img.corner.lion')).not.toBeNull();
  });

  it('says what the realm offers in four lines, each with a short title, in the order of the content', () => {
    const titles = Array.from(root.querySelectorAll('.pillar h3'), (title) => title.textContent);
    expect(titles).toEqual(PILLARS.map((pillar) => pillar.title));
    expect(titles).toHaveLength(4);
    const texts = Array.from(root.querySelectorAll('.pillar p'), (text) => text.textContent);
    expect(texts).toEqual(PILLARS.map((pillar) => pillar.text));
  });

  it('shows three pictures of the game, each in two sizes, with its size, its description and a caption', () => {
    const figures = Array.from(root.querySelectorAll('figure.shot'));
    expect(figures).toHaveLength(SHOTS.length);
    figures.forEach((figure, at) => {
      const image = figure.querySelector<HTMLImageElement>('img')!;
      expect(image.getAttribute('src')).toBe(`img/${SHOTS[at].large}`);
      expect(image.getAttribute('srcset')).toBe(
        `img/${SHOTS[at].small} 720w, img/${SHOTS[at].large} 1200w`,
      );
      expect(image.getAttribute('width')).toBe(String(SHOTS[at].width));
      expect(image.getAttribute('height')).toBe(String(SHOTS[at].height));
      expect(image.getAttribute('alt')).toBe(SHOTS[at].alt);
      expect(image.getAttribute('loading')).toBe('lazy');
      expect(figure.querySelector('figcaption')?.textContent).toBe(SHOTS[at].caption);
    });
  });
});
