import { TestBed } from '@angular/core/testing';
import { ICONS } from '../icon/icons';
import { Steps, type Step } from './steps';

const STEPS: readonly Step[] = [
  { numeral: 'I', title: 'Primeiro', text: 'Um.' },
  { numeral: 'II', title: 'Segundo', text: 'Dois.' },
];

async function render(layout?: 'columns' | 'timeline'): Promise<HTMLElement> {
  const fixture = TestBed.createComponent(Steps);
  fixture.componentRef.setInput('steps', STEPS);
  if (layout) {
    fixture.componentRef.setInput('layout', layout);
  }
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

describe('Steps', () => {
  it('is an ordered list with one item for each step, in order', async () => {
    const root = await render();

    expect(root.querySelector('ol')).not.toBeNull();
    const titles = Array.from(root.querySelectorAll('li h3'), (title) => title.textContent);
    expect(titles).toEqual(['Primeiro', 'Segundo']);
  });

  it('shows the numeral to the eye only, since the list already counts for a screen reader', async () => {
    const root = await render();
    const numerals = Array.from(root.querySelectorAll('.numeral'));

    expect(numerals.map((numeral) => numeral.textContent)).toEqual(['I', 'II']);
    expect(numerals.every((numeral) => numeral.getAttribute('aria-hidden') === 'true')).toBe(true);
  });

  it('draws the icon of a step before its numeral, and nothing for a step without one', async () => {
    const fixture = TestBed.createComponent(Steps);
    fixture.componentRef.setInput('steps', [
      { numeral: 'I', icon: 'chat', title: 'Primeiro', text: 'Um.' },
      { numeral: 'II', title: 'Segundo', text: 'Dois.' },
    ] satisfies readonly Step[]);
    await fixture.whenStable();
    const marks = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('.mark'));

    expect(marks[0].querySelector('app-icon path')?.getAttribute('d')).toBe(ICONS.chat[0]);
    expect(marks[0].firstElementChild?.tagName).toBe('APP-ICON');
    expect(marks[1].querySelector('app-icon')).toBeNull();
  });

  it('lays the steps out side by side unless it is asked for a timeline', async () => {
    expect((await render()).querySelector('ol')?.getAttribute('data-layout')).toBe('columns');
    expect((await render('timeline')).querySelector('ol')?.getAttribute('data-layout')).toBe(
      'timeline',
    );
  });
});
