import { TestBed } from '@angular/core/testing';
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

  it('lays the steps out side by side unless it is asked for a timeline', async () => {
    expect((await render()).querySelector('ol')?.getAttribute('data-layout')).toBe('columns');
    expect((await render('timeline')).querySelector('ol')?.getAttribute('data-layout')).toBe(
      'timeline',
    );
  });
});
