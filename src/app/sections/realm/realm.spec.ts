import { ComponentFixture, TestBed } from '@angular/core/testing';
import { REALM_HOUSES } from '../../content/realm';
import { Realm } from './realm';

describe('Realm', () => {
  let fixture: ComponentFixture<Realm>;
  let root: HTMLElement;

  const pins = () => Array.from(root.querySelectorAll<HTMLButtonElement>('.map .pin'));
  const picker = () => Array.from(root.querySelectorAll<HTMLButtonElement>('.picker button'));
  const shown = () =>
    Array.from(root.querySelectorAll<HTMLElement>('.house'))
      .filter((house) => !house.hidden)
      .map((house) => house.dataset['house']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Realm] }).compileComponents();
    fixture = TestBed.createComponent(Realm);
    root = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('is the section the navigation calls "reino", named by its heading', () => {
    const section = root.querySelector('section#reino');
    expect(section).not.toBeNull();
    expect(root.querySelector(`#${section?.getAttribute('aria-labelledby')}`)?.tagName).toBe('H2');
  });

  it('puts the five crests on the map, where the houses rule, as buttons a screen reader can name', () => {
    expect(pins()).toHaveLength(5);
    pins().forEach((pin, index) => {
      const house = REALM_HOUSES[index];
      expect(pin.style.left).toBe(`${house.x}%`);
      expect(pin.style.top).toBe(`${house.y}%`);
      expect(pin.textContent).toContain(house.place);
      expect(pin.querySelector('img')?.getAttribute('alt')).toBe('');
    });
    expect(root.querySelector('.map img.terrain')?.getAttribute('alt')).toContain('Kuttenberg');
  });

  it('starts on the crown, and a crest brings its own house up in its place', async () => {
    expect(shown()).toEqual(['kuttenberg']);
    expect(pins()[0].getAttribute('aria-pressed')).toBe('true');

    pins()[1].click();
    await fixture.whenStable();

    expect(shown()).toEqual(['trosky']);
    expect(pins()[1].getAttribute('aria-pressed')).toBe('true');
    expect(pins()[0].getAttribute('aria-pressed')).toBe('false');
    expect(picker()[1].getAttribute('aria-pressed')).toBe('true');
  });

  it('lets the row of names do the same, for a thumb that misses a crest', async () => {
    picker()[4].click();
    await fixture.whenStable();

    expect(shown()).toEqual(['maleshov']);
    expect(pins()[4].getAttribute('aria-pressed')).toBe('true');
  });

  it('keeps every house in the page, so a search engine reads them all', () => {
    const text = root.textContent ?? '';
    for (const house of REALM_HOUSES) {
      expect(text, house.id).toContain(house.text);
    }
  });
});
