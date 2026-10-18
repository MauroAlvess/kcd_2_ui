import { TestBed } from '@angular/core/testing';
import { RULES } from '../../content/rules';
import { Rules } from './rules';

describe('Rules', () => {
  let root: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Rules] }).compileComponents();
    const fixture = TestBed.createComponent(Rules);
    root = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('is the section the navigation calls "regras", named by its heading', () => {
    const section = root.querySelector('section#regras');
    expect(section).not.toBeNull();
    expect(root.querySelector(`#${section?.getAttribute('aria-labelledby')}`)?.tagName).toBe('H2');
  });

  it('sets the rule with the most weight apart, under its own heading', () => {
    const zero = root.querySelector('aside.zero');
    expect(zero?.querySelector('h3')?.textContent).toBe('Tolerância zero');
    expect(zero?.getAttribute('aria-labelledby')).toBe(zero?.querySelector('h3')?.id);
  });

  it('lists the six terms, each marked forbidden or required, with a drawing a screen reader skips', () => {
    const rules = Array.from(root.querySelectorAll<HTMLElement>('.rules .rule'));
    expect(rules.map((rule) => rule.querySelector('h3')?.textContent)).toEqual(
      RULES.map((rule) => rule.name),
    );
    expect(rules.map((rule) => rule.querySelector('.tag')?.textContent)).toEqual(
      RULES.map((rule) => (rule.kind === 'forbidden' ? 'Proibido' : 'Exigido')),
    );
    for (const rule of rules) {
      expect(rule.querySelector('.icon')?.getAttribute('aria-hidden')).toBe('true');
      expect(rule.querySelector('.icon svg path, .icon svg circle')).not.toBeNull();
    }
  });

  it('ends on the motto', () => {
    expect(root.querySelector('.motto')?.textContent?.trim()).toBe(
      'Viva a época. Interprete o seu personagem. Respeite quem está por trás dele.',
    );
  });
});
