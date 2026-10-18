import { FAMILY_NOTE, FAMILY_POINTS, TREE_ROWS } from './family';
import { TIERS } from './hierarchy';
import { GUILDS } from './guilds';
import { HOUSES } from './houses';
import { JOIN_STEPS } from './join';
import { CHAPTERS, LORE_ENDING } from './lore';
import { REALM_HOUSES } from './realm';
import { RULES, RULES_MOTTO, ZERO_TOLERANCE } from './rules';

const unique = (values: readonly string[]) => new Set(values).size === values.length;
const filled = (value: string) => value.trim().length > 0;

describe('content', () => {
  it('has five guilds with their own id, name, craft, crest and description', () => {
    expect(GUILDS).toHaveLength(5);
    expect(unique(GUILDS.map((guild) => guild.id))).toBe(true);
    expect(unique(GUILDS.map((guild) => guild.crest))).toBe(true);
    for (const guild of GUILDS) {
      for (const text of [guild.latin, guild.profession, guild.description]) {
        expect(filled(text)).toBe(true);
      }
      expect(guild.crest).toMatch(/^guild-[a-z]+\.webp$/);
    }
  });

  it('has the two houses, each with a lord, a motto and a creed', () => {
    expect(HOUSES.map((house) => house.id)).toEqual(['leao', 'corvo']);
    for (const house of HOUSES) {
      for (const text of [house.name, house.leader, house.motto, house.creed, house.crestAlt]) {
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
    expect(points).toContain('adotado');
    expect(points).toContain('bastardo');
    expect(FAMILY_NOTE.toLowerCase()).toContain('adotado');
    expect(FAMILY_NOTE.toLowerCase()).toContain('bastardo');
  });

  it('numbers the steps of the way in without repeating a number', () => {
    expect(unique(JOIN_STEPS.map((step) => step.numeral))).toBe(true);
    for (const step of JOIN_STEPS) {
      expect([step.numeral, step.title, step.text].every(filled)).toBe(true);
    }
    expect(JOIN_STEPS).toHaveLength(3);
  });

  it('tells the lore in seven chapters, each with its own anchor and something to read', () => {
    expect(CHAPTERS.map((chapter) => chapter.id)).toEqual([
      'alianca',
      'morte-do-rei',
      'carta',
      'leoes-e-maleshov',
      'sucessao',
      'segredo',
      'nova-guerra',
    ]);
    expect(unique(CHAPTERS.map((chapter) => chapter.id))).toBe(true);
    for (const chapter of CHAPTERS) {
      expect(filled(chapter.title)).toBe(true);
      expect(chapter.blocks.length).toBeGreaterThan(0);
    }
    expect(CHAPTERS.filter((chapter) => chapter.year).map((chapter) => chapter.year)).toEqual([
      '1402',
      '1403',
    ]);
  });

  it('keeps the four houses, the two lords and the question the story ends on', () => {
    const text = CHAPTERS.flatMap((chapter) =>
      chapter.blocks.flatMap((block) => (block.kind === 'list' ? block.items : [block.text])),
    ).join(' ');
    for (const name of [
      'Casa de Trosky',
      'Casa dos Leões',
      'Casa de Schodal',
      'Casa Raborsch',
      'Casa de Maleshov',
      'Radovan de Zelený',
      'Gunther von Silberhände',
    ]) {
      expect(text, name).toContain(name);
    }
    expect(text).toContain('Marquês e Protetor da Coroa');
    expect(LORE_ENDING.question).toBe('E você, a quem jurará sua lealdade?');
  });

  it('closes every bold mark it opens', () => {
    const texts = CHAPTERS.flatMap((chapter) =>
      chapter.blocks.flatMap((block) => (block.kind === 'list' ? block.items : [block.text])),
    );
    for (const text of [...texts, LORE_ENDING.text]) {
      expect(text.split('**').length % 2, text.slice(0, 40)).toBe(1);
    }
  });
});

describe('realm', () => {
  it('has the five houses of the map, the crown first, each with its crest and something to say', () => {
    expect(REALM_HOUSES.map((house) => house.id)).toEqual([
      'kuttenberg',
      'trosky',
      'raborsch',
      'suchdol',
      'maleshov',
    ]);
    expect(unique(REALM_HOUSES.map((house) => house.crest))).toBe(true);
    for (const house of REALM_HOUSES) {
      for (const text of [house.place, house.house, house.holder, house.text, house.crestAlt]) {
        expect(filled(text), house.id).toBe(true);
      }
      expect(house.crest).toMatch(/^house-[a-z]+\.webp$/);
      expect(house.crestWidth > 0 && house.crestHeight > 0).toBe(true);
    }
  });

  it('puts every crest on the map, none on top of another', () => {
    for (const house of REALM_HOUSES) {
      expect(house.x, house.id).toBeGreaterThan(0);
      expect(house.x, house.id).toBeLessThan(100);
      expect(house.y, house.id).toBeGreaterThan(0);
      expect(house.y, house.id).toBeLessThan(100);
      expect(house.size, house.id).toBeGreaterThan(3);
    }
    for (const a of REALM_HOUSES) {
      for (const b of REALM_HOUSES) {
        if (a !== b) {
          expect(Math.hypot(a.x - b.x, a.y - b.y), `${a.id} ${b.id}`).toBeGreaterThan(8);
        }
      }
    }
  });

  it('tells the same story as the lore: the Lions and Radovan, Gunther, the lordless Schodal, the plot of Maleshov', () => {
    const text = REALM_HOUSES.map((house) => `${house.house} ${house.holder} ${house.text}`).join(
      ' ',
    );
    for (const name of [
      'Casa dos Leões',
      'Radovan de Zelený',
      'Gunther von Silberhände',
      'Casa de Schodal',
      'Casa de Maleshov',
    ]) {
      expect(text, name).toContain(name);
    }
  });
});

describe('rules', () => {
  it('has the six terms of the parchment of rules, each once, with what it forbids or asks', () => {
    expect(RULES.map((rule) => rule.id)).toEqual([
      'rdm',
      'hdm',
      'anti-rp',
      'fear-rp',
      'metagaming',
      'powergaming',
    ]);
    for (const rule of RULES) {
      expect(filled(rule.name) && filled(rule.text)).toBe(true);
    }
    expect(RULES.filter((rule) => rule.kind === 'expected').map((rule) => rule.id)).toEqual([
      'fear-rp',
    ]);
  });

  it('keeps the rule with the most weight and the motto', () => {
    expect(ZERO_TOLERANCE.text.toLowerCase()).toContain('assédio');
    expect(ZERO_TOLERANCE.text).toContain('Naquela época era assim');
    expect(RULES_MOTTO).toBe(
      'Viva a época. Interprete o seu personagem. Respeite quem está por trás dele.',
    );
  });
});

describe('hierarchy', () => {
  const titles = TIERS.flatMap((tier) => tier.titles);

  it('has the six tiers of the realm in the order the panel lists them, the commoners last', () => {
    expect(TIERS.map((tier) => tier.id)).toEqual([
      'coroa',
      'grandes',
      'inferior',
      'igreja',
      'cidades',
      'povo',
    ]);
    expect(unique(TIERS.map((tier) => tier.name))).toBe(true);
    for (const tier of TIERS) {
      expect(filled(tier.note)).toBe(true);
      expect(tier.titles.length).toBeGreaterThan(0);
    }
  });

  it('describes every title, once, with the Rei alone at the top', () => {
    expect(TIERS[0].titles.map((title) => title.name)).toEqual(['Rei']);
    expect(unique(titles.map((title) => title.name))).toBe(true);
    for (const title of titles) {
      expect(filled(title.name) && filled(title.text)).toBe(true);
      expect(title.text.endsWith('.')).toBe(true);
    }
    // The 37 titles of the server's catalog, and the plebeians.
    expect(titles).toHaveLength(37 + 1);
  });

  it('has the titles the realm is asked for: lords, knights, the Church and the towns', () => {
    const names = titles.map((title) => title.name);
    for (const name of [
      'Lorde',
      'Cavaleiro',
      'Escudeiro',
      'Pequeno nobre',
      'Burgrave',
      'Arcebispo',
      'Bispo',
      'Padre',
      'Burgomestre',
      'Mestre de guilda',
      'Administrador de hospedaria',
    ]) {
      expect(names, name).toContain(name);
    }
    expect(titles.find((title) => title.name === 'Lorde')?.native).toBe('pán');
    expect(titles.find((title) => title.name === 'Cavaleiro')?.native).toBe('rytíř');
  });
});
