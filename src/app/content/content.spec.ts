import { NOBILITY_RULE, RANKS } from './ascension';
import { FAMILY_NOTE, FAMILY_POINTS, TREE_ROWS } from './family';
import { HOLDINGS } from './holdings';
import { GUILDS } from './guilds';
import { HOUSES } from './houses';
import { JOIN_STEPS } from './join';
import { WAR_STEPS } from './lore';
import { PATHS } from './world';

const unique = (values: readonly string[]) => new Set(values).size === values.length;
const filled = (value: string) => value.trim().length > 0;

describe('content', () => {
  it('has five guilds with their own id, name, craft, crest, description and kit', () => {
    expect(GUILDS).toHaveLength(5);
    expect(unique(GUILDS.map((guild) => guild.id))).toBe(true);
    expect(unique(GUILDS.map((guild) => guild.crest))).toBe(true);
    for (const guild of GUILDS) {
      for (const text of [guild.latin, guild.profession, guild.description, guild.kit]) {
        expect(filled(text)).toBe(true);
      }
      expect(guild.crest).toMatch(/^guild-[a-z]+\.webp$/);
    }
  });

  it('has the two houses, each with a lord, a motto, a creed and a colour', () => {
    expect(HOUSES.map((house) => house.id)).toEqual(['leao', 'corvo']);
    for (const house of HOUSES) {
      for (const text of [
        house.name,
        house.leader,
        house.motto,
        house.creed,
        house.colours,
        house.crestAlt,
      ]) {
        expect(filled(text)).toBe(true);
      }
    }
  });

  it('puts the player once in the family tree, with their own row between the elders and the children', () => {
    const rows = TREE_ROWS.map((row) => row.id);
    expect(rows).toEqual(['avos', 'pais', 'geracao', 'filhos', 'netos']);

    const players = TREE_ROWS.flatMap((row) =>
      row.nodes.filter((node) => node.you).map(() => row.id),
    );
    expect(players).toEqual(['geracao']);
    expect(FAMILY_POINTS.length).toBeGreaterThan(0);
  });

  it('says that a family can adopt, have bastards and record the dead', () => {
    const points = FAMILY_POINTS.join(' ').toLowerCase();
    expect(points).toContain('adotar');
    expect(points).toContain('bastardo');
    expect(points).toContain('falecido');
    expect(FAMILY_NOTE.toLowerCase()).toContain('adotado');
    expect(FAMILY_NOTE.toLowerCase()).toContain('bastardo');
  });

  it('says that a plebeian can rise to noble with the descendants, but not the adopted or the bastards', () => {
    const rule = NOBILITY_RULE.toLowerCase();
    expect(rule).toContain('plebeu pode subir a nobre');
    expect(rule).toContain('descendentes');
    expect(rule).toContain('adotados');
    expect(rule).toContain('bastardos');
  });

  it('numbers each sequence of steps without repeating a number', () => {
    for (const steps of [RANKS, WAR_STEPS, JOIN_STEPS]) {
      expect(unique(steps.map((step) => step.numeral))).toBe(true);
      for (const step of steps) {
        expect([step.numeral, step.title, step.text].every(filled)).toBe(true);
      }
    }
    expect(RANKS.map((step) => step.title)).toEqual(['Plebeu', 'Cavaleiro', 'Nobre']);
    expect(WAR_STEPS).toHaveLength(4);
    expect(JOIN_STEPS).toHaveLength(3);
  });

  it('has the road and the fields, with something to say about each', () => {
    expect(PATHS.map((path) => path.title)).toEqual(['A estrada', 'Os campos']);
    for (const path of PATHS) {
      expect(path.items.length).toBeGreaterThanOrEqual(3);
    }
  });
});

describe('holdings', () => {
  it('tells of a house, a horse and a dog, each with a crest and what a player can do', () => {
    expect(HOLDINGS.map((holding) => holding.id)).toEqual(['casas', 'cavalos', 'caes']);
    for (const holding of HOLDINGS) {
      expect(holding.crest).toMatch(/^[\w-]+\.webp$/);
      expect(holding.crestAlt.length).toBeGreaterThan(10);
      expect(holding.points.length).toBeGreaterThan(1);
    }
  });

  it('says that a horse that dies is lost and another must be bought', () => {
    const horse = HOLDINGS.find((holding) => holding.id === 'cavalos')!;
    expect(horse.points.join(' ')).toMatch(/morrer.*comprar outro/);
  });
});
