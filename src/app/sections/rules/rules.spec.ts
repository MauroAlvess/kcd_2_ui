import { TestBed } from '@angular/core/testing';
import { RULES } from '../../content/rules';
import { ICONS } from '../../shared/ui/icon/icons';
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

  it('lists the six terms, each marked forbidden or required and drawn with its own line drawing', () => {
    const rules = Array.from(root.querySelectorAll<HTMLElement>('.rules .rule'));
    expect(rules.map((rule) => rule.querySelector('h3')?.textContent)).toEqual(
      RULES.map((rule) => rule.name),
    );
    expect(rules.map((rule) => rule.querySelector('.tag')?.textContent)).toEqual(
      RULES.map((rule) => (rule.kind === 'forbidden' ? 'Proibido' : 'Exigido')),
    );
    rules.forEach((rule, at) => {
      const drawing = rule.querySelector('app-icon svg');
      expect(drawing?.getAttribute('aria-hidden'), RULES[at].id).toBe('true');
      expect(drawing?.querySelector('path')?.getAttribute('d'), RULES[at].id).toBe(
        ICONS[RULES[at].icon][0],
      );
      expect(rule.querySelector('img')).toBeNull();
    });
    expect(new Set(RULES.map((rule) => rule.icon)).size).toBe(RULES.length);
  });

  it('ends on the motto', () => {
    expect(root.querySelector('.motto')?.textContent?.trim()).toBe(
      'Viva a época. Interprete o seu personagem. Respeite quem está por trás dele.',
    );
  });
});
