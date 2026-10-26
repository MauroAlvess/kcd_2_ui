import { TestBed } from '@angular/core/testing';
import { Interlude, type InterludePhoto } from './interlude';

const PHOTO: InterludePhoto = {
  src: 'img/x-1920.webp',
  srcset: 'img/x-960.webp 960w, img/x-1920.webp 1920w',
  width: 1920,
  height: 1080,
  alt: 'Uma forja',
  position: '50% 40%',
};

describe('Interlude', () => {
  it('shows the photograph across the width, with its sizes, its words and the part of it to keep', async () => {
    const fixture = TestBed.createComponent(Interlude);
    fixture.componentRef.setInput('photo', PHOTO);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const img = root.querySelector<HTMLImageElement>('figure.interlude img')!;

    expect(img.getAttribute('src')).toBe('img/x-1920.webp');
    expect(img.getAttribute('srcset')).toContain('960w');
    expect(img.getAttribute('sizes')).toBe('100vw');
    expect(img.getAttribute('width')).toBe('1920');
    expect(img.getAttribute('height')).toBe('1080');
    expect(img.getAttribute('alt')).toBe('Uma forja');
    expect(img.getAttribute('loading')).toBe('lazy');
    expect(img.style.objectPosition).toBe('50% 40%');
    expect(root.querySelector('section, h2, a')).toBeNull();
  });
});
