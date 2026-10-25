import { TestBed } from '@angular/core/testing';
import { SITE } from '../../core/site';
import { Footer } from './footer';

describe('Footer', () => {
  let root: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Footer] }).compileComponents();
    const fixture = TestBed.createComponent(Footer);
    root = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('links to the server on Instagram and YouTube, opened in a tab of their own', () => {
    const instagram = root.querySelector(`.social a[href="${SITE.social.instagram}"]`);
    const youtube = root.querySelector(`.social a[href="${SITE.social.youtube}"]`);
    expect(SITE.social.instagram).toBe('https://www.instagram.com/kingdomrpbrasil/');
    expect(SITE.social.youtube).toBe('https://www.youtube.com/@kingdomrpbrasil');
    for (const link of [instagram, youtube]) {
      expect(link).not.toBeNull();
      expect(link?.getAttribute('target')).toBe('_blank');
      expect(link?.getAttribute('rel')).toContain('noopener');
    }
    expect(instagram?.textContent).toContain('Instagram');
    expect(youtube?.textContent).toContain('YouTube');
  });

  it('keeps the Discord among the links, and the small print under them', () => {
    expect(root.querySelector(`.links a[href="${SITE.discord}"]`)).not.toBeNull();
    expect(root.querySelector('.legal')?.textContent).toContain('Warhorse Studios');
  });
});
