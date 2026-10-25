import { TestBed } from '@angular/core/testing';
import { Icon } from './icon';
import { ICONS, type IconName } from './icons';

async function render(name: IconName): Promise<HTMLElement> {
  const fixture = TestBed.createComponent(Icon);
  fixture.componentRef.setInput('name', name);
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

describe('Icon', () => {
  it('draws every path of the icon it is asked for, in a square of 24, hidden from a screen reader', async () => {
    const root = await render('tree');
    const svg = root.querySelector('svg')!;

    expect(svg.getAttribute('viewBox')).toBe('0 0 24 24');
    expect(svg.getAttribute('aria-hidden')).toBe('true');
    expect(svg.getAttribute('focusable')).toBe('false');
    expect(Array.from(svg.querySelectorAll('path'), (path) => path.getAttribute('d'))).toEqual([
      ...ICONS.tree,
    ]);
  });

  it('changes its drawing when the name changes', async () => {
    const fixture = TestBed.createComponent(Icon);
    fixture.componentRef.setInput('name', 'heart');
    await fixture.whenStable();
    fixture.componentRef.setInput('name', 'crown');
    await fixture.whenStable();

    const drawn = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('path'),
      (path) => path.getAttribute('d'),
    );
    expect(drawn).toEqual([...ICONS.crown]);
  });

  it('has nothing but strokes to draw: every icon has paths, and every path is a drawing command that starts with a move', () => {
    const names = Object.keys(ICONS) as IconName[];
    expect(names.length).toBeGreaterThanOrEqual(20);
    for (const name of names) {
      expect(ICONS[name].length, name).toBeGreaterThan(0);
      for (const d of ICONS[name]) {
        expect(d, name).toMatch(/^M-?\d/);
        expect(d, name).not.toMatch(/[^MmLlHhVvCcSsQqTtAaZz0-9.,\s-]/);
      }
    }
  });
});
