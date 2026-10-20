import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollHint } from './scroll-hint';

describe('ScrollHint', () => {
  let fixture: ComponentFixture<ScrollHint>;
  let root: HTMLElement;

  const hint = () => root.querySelector<HTMLAnchorElement>('a.hint')!;

  /** Puts the page at a height, as scrolling would, and lets the page hear it. */
  async function scrollTo(y: number): Promise<void> {
    Object.defineProperty(window, 'scrollY', { value: y, configurable: true });
    window.dispatchEvent(new Event('scroll'));
    await fixture.whenStable();
  }

  beforeEach(async () => {
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
    await TestBed.configureTestingModule({ imports: [ScrollHint] }).compileComponents();
    fixture = TestBed.createComponent(ScrollHint);
    root = fixture.nativeElement;
    await fixture.whenStable();
  });

  afterEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
  });

  it('is a link down to the first chapter, named for a screen reader, with an arrow that only decorates', () => {
    expect(hint().getAttribute('href')).toBe('#reino');
    expect(hint().getAttribute('aria-label')).toBe('Rolar para baixo');
    expect(hint().querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('shows at the top of the page', () => {
    expect(hint().classList.contains('gone')).toBe(false);
    expect(hint().hasAttribute('tabindex')).toBe(false);
    expect(hint().hasAttribute('aria-hidden')).toBe(false);
  });

  it('stays while the page has barely moved', async () => {
    await scrollTo(12);
    expect(hint().classList.contains('gone')).toBe(false);
  });

  it('goes away once the page is scrolled, out of the keyboard and of the screen reader too, and does not come back', async () => {
    await scrollTo(300);
    expect(hint().classList.contains('gone')).toBe(true);
    expect(hint().getAttribute('tabindex')).toBe('-1');
    expect(hint().getAttribute('aria-hidden')).toBe('true');

    await scrollTo(0);
    expect(hint().classList.contains('gone')).toBe(true);
  });
});
