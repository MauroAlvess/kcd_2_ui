import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { PHOTOS } from '../../content/photos';
import { Photos } from './photos';

describe('Photos', () => {
  let root: HTMLElement;
  let fixture: ComponentFixture<Photos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Photos] }).compileComponents();
    fixture = TestBed.createComponent(Photos);
    root = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('is the chapter "fotos", named by its own heading', () => {
    const section = root.querySelector('section#fotos');
    expect(section).not.toBeNull();
    const heading = root.querySelector('h2');
    expect(heading?.id).toBe('fotos-title');
    expect(section?.getAttribute('aria-labelledby')).toBe('fotos-title');
  });

  it('shows every photo as a button that enlarges it, each with a description and a size', () => {
    const buttons = root.querySelectorAll('ul.track button.open');
    expect(buttons.length).toBe(PHOTOS.length);
    expect(PHOTOS.length).toBeGreaterThanOrEqual(10);
    const images = Array.from(root.querySelectorAll('ul.track img'));
    for (const img of images) {
      expect(img.getAttribute('alt')?.length ?? 0).toBeGreaterThan(20);
      expect(Number(img.getAttribute('width'))).toBeGreaterThan(0);
    }
    // The first two are fetched with the page; the rest only as the row is scrolled toward them.
    expect(images.slice(2).every((img) => img.getAttribute('loading') === 'lazy')).toBe(true);
  });

  it('is a carousel: two arrows, a dot for each photo, and a counter that follows the one it is on', async () => {
    expect(root.querySelector('.carousel')?.getAttribute('aria-roledescription')).toBe('carrossel');
    expect(root.querySelector('button.previous')?.getAttribute('aria-label')).toBe('Foto anterior');
    expect(root.querySelector('button.next')?.getAttribute('aria-label')).toBe('Próxima foto');
    const dots = root.querySelectorAll('button.dot');
    expect(dots.length).toBe(PHOTOS.length);
    expect(root.querySelector('.count')?.textContent).toContain(`1 de ${PHOTOS.length}`);
    expect(dots[0].classList.contains('on')).toBe(true);

    (root.querySelector('button.next') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(root.querySelector('.count')?.textContent).toContain(`2 de ${PHOTOS.length}`);
    expect(root.querySelector('.count')?.textContent).toContain(PHOTOS[1].title);
    expect(dots[1].getAttribute('aria-current')).toBe('true');

    (root.querySelector('button.previous') as HTMLButtonElement).click();
    (root.querySelector('button.previous') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(root.querySelector('.count')?.textContent).toContain(`${PHOTOS.length} de ${PHOTOS.length}`);

    (dots[4] as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(root.querySelector('.count')?.textContent).toContain(`5 de ${PHOTOS.length}`);
  });

  it('has one view for all of them, with the large file of each', () => {
    expect(root.querySelectorAll('dialog.lightbox').length).toBe(1);
    expect(new Set(PHOTOS.map((photo) => photo.id)).size).toBe(PHOTOS.length);
    for (const photo of PHOTOS) {
      expect(photo.large.width).toBeGreaterThan(photo.small.width - 1);
      expect(photo.large.src).toMatch(/^img\/foto-\d+-1920\.webp$/);
      expect(photo.small.src).toMatch(/^img\/foto-\d+-960\.webp$/);
    }
  });
});
