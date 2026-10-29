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

  it('is the section the navigation calls "reino", named by its h2, with the title and its gilded word', () => {
    const section = root.querySelector('section#reino');
    expect(section).not.toBeNull();
    const heading = root.querySelector(`#${section?.getAttribute('aria-labelledby')}`);
    expect(heading?.tagName).toBe('H2');
    expect(heading?.textContent?.trim()).toBe('Ninguém nasce nobre.');
    expect(heading?.querySelector('em')?.textContent).toBe('nobre.');
  });

  it('says what the realm offers in four lines, each with its label, title and text, in the order of the content', () => {
    const titles = Array.from(root.querySelectorAll('.turn h3'), (title) => title.textContent);
    expect(titles).toEqual(PILLARS.map((pillar) => pillar.title));
    expect(titles).toHaveLength(4);
    const texts = Array.from(root.querySelectorAll('.turn .text'), (text) => text.textContent);
    expect(texts).toEqual(PILLARS.map((pillar) => pillar.text));
    const labels = Array.from(root.querySelectorAll('.turn .label'), (label) => label.textContent);
    expect(labels).toEqual(PILLARS.map((pillar) => pillar.label));
  });

  it('keeps one picture for each line, in two sizes with its description, the first on show at the top of the page', () => {
    const pictures = Array.from(root.querySelectorAll<HTMLImageElement>('.stage img'));
    expect(pictures).toHaveLength(PILLARS.length);
    pictures.forEach((image, at) => {
      expect(image.getAttribute('src')).toBe(`img/${PILLARS[at].large}`);
      expect(image.getAttribute('srcset')).toBe(
        `img/${PILLARS[at].small} 720w, img/${PILLARS[at].large} 1280w`,
      );
      expect(image.getAttribute('alt')).toBe(PILLARS[at].alt);
    });
    // At the top of the page the first line is the one on show.
    expect(root.querySelector('.turn.on h3')?.textContent).toBe(PILLARS[0].title);
    expect(root.querySelectorAll('.picture.shown')).toHaveLength(1);
  });

  it('shows two pictures of the game, each in two sizes, with its size, its description and a caption', () => {
    const figures = Array.from(root.querySelectorAll('figure.shot'));
    expect(figures).toHaveLength(SHOTS.length);
    figures.forEach((figure, at) => {
      const image = figure.querySelector<HTMLImageElement>('img')!;
      expect(image.getAttribute('src')).toBe(`img/${SHOTS[at].large}`);
      expect(image.getAttribute('srcset')).toBe(
        `img/${SHOTS[at].small} 720w, img/${SHOTS[at].large} 1200w`,
      );
      expect(image.getAttribute('width')).toBe(String(SHOTS[at].width));
      expect(image.getAttribute('alt')).toBe(SHOTS[at].alt);
      expect(image.getAttribute('loading')).toBe('lazy');
      expect(figure.querySelector('.tag')?.textContent).toBe(SHOTS[at].caption);
    });
  });
});
