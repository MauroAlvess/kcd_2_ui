import { TestBed } from '@angular/core/testing';
import { SITE } from '../../core/site';
import { srcsetOf } from '../../content/pitch';
import { SOCIAL_LEAD, SOCIAL_PAGES, SOCIAL_TITLE, SOCIAL_TITLE_EM } from '../../content/social';
import { Social } from './social';

describe('Social', () => {
  let root: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Social] }).compileComponents();
    const fixture = TestBed.createComponent(Social);
    root = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('is the section the navigation calls "redes", named by its h2 with the title and its gilded words', () => {
    const section = root.querySelector('section#redes');
    expect(section).not.toBeNull();
    const heading = root.querySelector(`#${section?.getAttribute('aria-labelledby')}`);
    expect(heading?.tagName).toBe('H2');
    expect(heading?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
      `${SOCIAL_TITLE} ${SOCIAL_TITLE_EM}`,
    );
    expect(root.querySelector('.lead')?.textContent).toBe(SOCIAL_LEAD);
  });

  it('has a card for the TikTok, the Instagram and the YouTube, each a link to the page, in a tab of its own', () => {
    const links = Array.from(root.querySelectorAll<HTMLAnchorElement>('a.card'));
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      'https://www.tiktok.com/@kingdomrpbrasil',
      SITE.social.instagram,
      SITE.social.youtube,
    ]);
    for (const link of links) {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
      expect(link.textContent).toContain('abre em uma nova aba');
      expect(link.querySelector('h3')?.textContent?.trim()).toBeTruthy();
    }
  });

  it("shows each page by the owner's print, with words for it and its own size, loaded only when it comes near", () => {
    const images = Array.from(root.querySelectorAll<HTMLImageElement>('a.card img.print'));
    expect(images).toHaveLength(SOCIAL_PAGES.length);
    SOCIAL_PAGES.forEach((page, at) => {
      const image = images[at];
      expect(image.getAttribute('src')).toBe(`img/${page.large}`);
      expect(image.getAttribute('srcset')).toBe(srcsetOf(page.small, page.large));
      expect(image.getAttribute('alt')).toBe(page.alt);
      expect(image.getAttribute('width')).toBe(String(page.width));
      expect(image.getAttribute('height')).toBe(String(page.height));
      expect(image.getAttribute('loading')).toBe('lazy');
    });
  });

  it('has the Discord in a band of its own under the cards, with its button', () => {
    const band = root.querySelector('.band');
    expect(band?.textContent).toContain('Discord');
    const button = band?.querySelector<HTMLAnchorElement>('app-button a');
    expect(button?.getAttribute('href')).toBe(SITE.discord);
    expect(button?.getAttribute('target')).toBe('_blank');
    expect(button?.textContent).toContain('Entrar no Discord');
    expect(band?.compareDocumentPosition(root.querySelector('.pages')!)).toBe(
      Node.DOCUMENT_POSITION_PRECEDING,
    );
  });
});
