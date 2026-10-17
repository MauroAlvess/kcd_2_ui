import { NOBILITY_RULE, RANKS } from './ascension';
import { FAMILY_NOTE, FAMILY_POINTS, TREE_ROWS } from './family';
import { HOLDINGS } from './holdings';
import { RULES, TIERS } from './hierarchy';
import { GUILDS } from './guilds';
import { HOUSES } from './houses';
import { JOIN_STEPS } from './join';
import { CLIPS, MEDIA_NOTE, SHOTS } from './media';
import { CHAPTERS, LORE_ENDING } from './lore';
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
    for (const steps of [RANKS, JOIN_STEPS]) {
      expect(unique(steps.map((step) => step.numeral))).toBe(true);
      for (const step of steps) {
        expect([step.numeral, step.title, step.text].every(filled)).toBe(true);
      }
    }
    expect(RANKS.map((step) => step.title)).toEqual(['Plebeu', 'Cavaleiro', 'Nobre']);
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

  it('has the road and the fields, with something to say about each', () => {
    expect(PATHS.map((path) => path.title)).toEqual(['A estrada', 'Os campos']);
    for (const path of PATHS) {
      expect(path.items.length).toBeGreaterThanOrEqual(3);
    }
  });
});

describe('media', () => {
  it('has the three videos, the duel first, each with its words, its file, its poster and its length', () => {
    expect(CLIPS.map((clip) => clip.id)).toEqual(['duelo', 'passeio', 'cavalo']);
    expect(unique(CLIPS.map((clip) => clip.file))).toBe(true);
    for (const clip of CLIPS) {
      expect([clip.title, clip.text, clip.length].every(filled)).toBe(true);
      expect(clip.file).toMatch(/^video\/[a-z]+\.mp4$/);
      expect(clip.poster.src).toMatch(/^img\/media-[a-z]+-poster\.webp$/);
      expect(clip.poster.width).toBe(1280);
      expect(clip.poster.height).toBeGreaterThan(500);
      expect(clip.length).toMatch(/^(\d+ min )?\d+ s$/);
    }
  });

  it('has the three screenshots, each in two sizes of the same picture, with a description to read', () => {
    expect(SHOTS.map((shot) => shot.id)).toEqual(['patio', 'cavalgada', 'dados']);
    for (const shot of SHOTS) {
      expect([shot.title, shot.text].every(filled)).toBe(true);
      expect(shot.alt.length).toBeGreaterThan(40);
      expect(shot.small.src).toMatch(/^img\/media-[a-z]+-960\.webp$/);
      expect(shot.large.src).toMatch(/^img\/media-[a-z]+-1920\.webp$/);
      expect([shot.small.width, shot.large.width]).toEqual([960, 1920]);
      // Half the size, to the pixel the rounding of the smaller one allows.
      expect(Math.abs(shot.small.height * 2 - shot.large.height)).toBeLessThanOrEqual(1);
    }
  });

  it('keeps one id for each thing shown, and says where the pictures come from', () => {
    expect(unique([...CLIPS, ...SHOTS].map((item) => item.id))).toBe(true);
    expect(filled(MEDIA_NOTE)).toBe(true);
  });
});

describe('holdings', () => {
  it('tells of a house, a horse, a cart, a dog and a supporter, each with a crest and what a player can do', () => {
    expect(HOLDINGS.map((holding) => holding.id)).toEqual([
      'casas',
      'cavalos',
      'carrocas',
      'caes',
      'apoiador',
    ]);
    for (const holding of HOLDINGS) {
      expect(holding.crest).toMatch(/^[\w-]+\.webp$/);
      expect(holding.crestAlt.length).toBeGreaterThan(10);
      expect(holding.points.length).toBeGreaterThan(1);
    }
  });

  it('says a cart is locked to its owner until he leaves it free, and a supporter is given a musket, a hand cannon and ten balls', () => {
    const cart = HOLDINGS.find((holding) => holding.id === 'carrocas')!;
    expect(cart.points.join(' ')).toMatch(/Trancada.*livre/);
    const supporter = HOLDINGS.find((holding) => holding.id === 'apoiador')!;
    expect(supporter.points.join(' ')).toMatch(/mosquete.*canhão de mão.*10 balas/);
  });

  it('says that a horse that dies is lost and another must be bought', () => {
    const horse = HOLDINGS.find((holding) => holding.id === 'cavalos')!;
    expect(horse.points.join(' ')).toMatch(/morrer.*comprar outro/);
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

  it('says who names whom, what a title does to a standing, and what is shown over a head', () => {
    expect(RULES.length).toBe(7);
    expect(unique(RULES.map((rule) => rule.numeral))).toBe(true);
    const words = RULES.map((rule) => rule.text)
      .join(' ')
      .toLowerCase();
    for (const phrase of [
      'só um nobre nomeia',
      'abaixo do seu',
      'cônjuge e os descendentes',
      'nunca aparece sobre a cabeça',
      'ver hierarquia',
      'região inteira',
    ]) {
      expect(words, phrase).toContain(phrase);
    }
  });
});
