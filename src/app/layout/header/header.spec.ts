import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NAV, SITE } from '../../core/site';
import { Header } from './header';

describe('Header', () => {
  let fixture: ComponentFixture<Header>;
  let root: HTMLElement;

  const toggle = () => root.querySelector<HTMLButtonElement>('.toggle')!;
  const menu = () => root.querySelector<HTMLElement>('.menu')!;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Header] }).compileComponents();
    fixture = TestBed.createComponent(Header);
    root = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('links to every section of the page', () => {
    const hrefs = Array.from(root.querySelectorAll<HTMLAnchorElement>('.menu li a'), (anchor) =>
      anchor.getAttribute('href'),
    );
    expect(hrefs).toEqual(NAV.map((item) => item.href));
  });

  it('has the Discord button, in a new tab', () => {
    const discord = root.querySelector<HTMLAnchorElement>(`.menu a[href="${SITE.discord}"]`);
    expect(discord).not.toBeNull();
    expect(discord?.getAttribute('target')).toBe('_blank');
  });

  it('starts with the menu closed and the button saying it will open it', () => {
    expect(toggle().getAttribute('aria-expanded')).toBe('false');
    expect(menu().classList.contains('open')).toBe(false);
    expect(toggle().textContent).toContain('Abrir o menu');
    expect(toggle().getAttribute('aria-controls')).toBe(menu().id);
  });

  it('opens with the button and then offers to close', async () => {
    toggle().click();
    await fixture.whenStable();

    expect(toggle().getAttribute('aria-expanded')).toBe('true');
    expect(menu().classList.contains('open')).toBe(true);
    expect(toggle().textContent).toContain('Fechar o menu');
  });

  it('closes with Escape', async () => {
    toggle().click();
    await fixture.whenStable();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();

    expect(toggle().getAttribute('aria-expanded')).toBe('false');
  });

  it('closes when a link is followed, so the menu is not left covering the section it went to', async () => {
    toggle().click();
    await fixture.whenStable();

    root.querySelector<HTMLAnchorElement>('.menu li a')!.click();
    await fixture.whenStable();

    expect(menu().classList.contains('open')).toBe(false);
  });
});
