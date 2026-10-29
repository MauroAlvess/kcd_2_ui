import { TestBed } from '@angular/core/testing';
import { GUILDS } from '../../content/guilds';
import { Guilds } from './guilds';

describe('Guilds', () => {
  let root: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Guilds] }).compileComponents();
    const fixture = TestBed.createComponent(Guilds);
    root = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('is the section the navigation calls "guildas", named by its heading', () => {
    const section = root.querySelector('section#guildas');
    expect(section).not.toBeNull();
    const heading = root.querySelector(`#${section?.getAttribute('aria-labelledby')}`);
    expect(heading?.tagName).toBe('H2');
  });

  it('shows the eight guilds, in order, each with its name in Latin', () => {
    const names = Array.from(root.querySelectorAll('.row h4'), (name) => name.textContent);
    expect(names).toEqual(GUILDS.map((guild) => guild.latin));
    expect(names).toHaveLength(8);
  });

  it('gives each crest a description and its size', () => {
    const crests = Array.from(root.querySelectorAll<HTMLImageElement>('.row .frame img'));
    expect(crests).toHaveLength(8);
    for (const crest of crests) {
      expect(crest.getAttribute('alt')).toContain('Brasão da guilda');
      expect(crest.getAttribute('width')).toBeTruthy();
      expect(crest.getAttribute('height')).toBeTruthy();
    }
  });
});
