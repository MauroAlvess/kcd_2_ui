import { TestBed } from '@angular/core/testing';
import { PHOTOS } from '../../content/photos';
import { Photos } from './photos';

describe('Photos', () => {
  let root: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Photos] }).compileComponents();
    const fixture = TestBed.createComponent(Photos);
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
    const buttons = root.querySelectorAll('ul.wall button.open');
    expect(buttons.length).toBe(PHOTOS.length);
    expect(PHOTOS.length).toBeGreaterThanOrEqual(10);
    for (const img of Array.from(root.querySelectorAll('ul.wall img'))) {
      expect(img.getAttribute('alt')?.length ?? 0).toBeGreaterThan(20);
      expect(Number(img.getAttribute('width'))).toBeGreaterThan(0);
      expect(img.getAttribute('loading')).toBe('lazy');
    }
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
