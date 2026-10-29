import { TestBed } from '@angular/core/testing';
import { SITE } from '../../core/site';
import { ScrollState } from '../../core/scroll';
import { Header } from './header';

describe('Header', () => {
  async function render() {
    await TestBed.configureTestingModule({ imports: [Header] }).compileComponents();
    const fixture = TestBed.createComponent(Header);
    await fixture.whenStable();
    return fixture;
  }

  it('shows the crest and the name of the server, and takes back to the top', async () => {
    const root: HTMLElement = (await render()).nativeElement;
    const brand = root.querySelector<HTMLAnchorElement>('a.brand')!;
    expect(brand.getAttribute('href')).toBe('#topo');
    expect(brand.textContent).toContain('Kingdom RP Brasil');
    expect(brand.textContent).toContain('Kingdom Come: Deliverance II');
    expect(root.querySelector('img.crest')?.getAttribute('src')).toBe('img/logo-rp.webp');
  });

  it('puts the launcher and the Discord on the right, the Discord in a tab of its own', async () => {
    const root: HTMLElement = (await render()).nativeElement;
    const links = root.querySelectorAll<HTMLAnchorElement>('.buttons a');
    expect(links).toHaveLength(2);
    expect(links[0].getAttribute('href')).toBe(SITE.launcher);
    expect(links[1].getAttribute('href')).toBe(SITE.discord);
    expect(links[1].getAttribute('target')).toBe('_blank');
  });

  it('turns dark once the page is scrolled, and is see-through at the top', async () => {
    const fixture = await render();
    const bar = (fixture.nativeElement as HTMLElement).querySelector('.bar')!;
    expect(bar.classList.contains('solid')).toBe(false);
    TestBed.inject(ScrollState).y.set(200);
    await fixture.whenStable();
    expect(bar.classList.contains('solid')).toBe(true);
  });
});
