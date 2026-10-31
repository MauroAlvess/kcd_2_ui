import { TIERS, TREE_LEVELS } from './hierarchy';
import { GUILDS } from './guilds';
import { JOIN_STEPS } from './join';
import { CHAPTERS, LORE_ENDING } from './lore';
import { HOUSES } from './houses';
import { PILLARS, SHOTS, srcsetOf } from './pitch';
import { NAV } from '../core/site';

const unique = (values: readonly string[]) => new Set(values).size === values.length;
const filled = (value: string) => value.trim().length > 0;

describe('content', () => {
  it('has eight guilds with their own id, name, craft, crest and description', () => {
    expect(GUILDS).toHaveLength(8);
    expect(unique(GUILDS.map((guild) => guild.id))).toBe(true);
    expect(unique(GUILDS.map((guild) => guild.crest))).toBe(true);
    for (const guild of GUILDS) {
      for (const text of [guild.latin, guild.profession, guild.description]) {
        expect(filled(text)).toBe(true);
      }
      expect(guild.crest).toMatch(/^guild-[a-z]+\.webp$/);
    }
  });

  it('tells what the realm offers in four short lines: a trade, a family, a roof, a crown', () => {
    expect(PILLARS.map((pillar) => pillar.id)).toEqual(['oficio', 'familia', 'teto', 'coroa']);
    expect(unique(PILLARS.map((pillar) => pillar.title))).toBe(true);
    for (const pillar of PILLARS) {
      expect(filled(pillar.title) && filled(pillar.text)).toBe(true);
      // Short on purpose: a line to be read at a glance, not a paragraph.
      expect(pillar.text.length).toBeLessThan(200);
    }
    const family = PILLARS.find((pillar) => pillar.id === 'familia')!.text.toLowerCase();
    expect(family).toContain('adote');
    expect(family).toContain('bastardo');
  });

  it('shows the game in two pictures of its own, each in two sizes with a description and a few words', () => {
    expect(SHOTS.map((shot) => shot.id)).toEqual(['floresta', 'estrada']);
    expect(unique(SHOTS.flatMap((shot) => [shot.large, shot.small]))).toBe(true);
    for (const shot of SHOTS) {
      expect(shot.large).toMatch(/^galeria-[a-z]+-1600\.webp$/);
      expect(shot.medium).toMatch(/^galeria-[a-z]+-1200\.webp$/);
      expect(shot.small).toMatch(/^galeria-[a-z]+-720\.webp$/);
      expect(shot.width).toBeGreaterThan(shot.height);
      expect(shot.alt.length).toBeGreaterThan(30);
      expect(filled(shot.caption)).toBe(true);
      expect(shot.position).toMatch(/^\d+% \d+%$/);
    }
  });

  it('has the two factions, the Lion on the red side and the Raven on the blue, each with its crest and a line on where it stands', () => {
    expect(HOUSES.map((house) => house.id)).toEqual(['leao', 'corvo']);
    for (const house of HOUSES) {
      expect(house.crest).toMatch(/^brasao-[a-z]+\.webp$/);
      expect(filled(house.name) && house.alt.length > 30).toBe(true);
    }
  });

  it('climbs the ladder of the hierarchy in seven rungs, naming real titles as examples', () => {
    expect(TREE_LEVELS).toHaveLength(7);
    expect(new Set(TREE_LEVELS.map((level) => level.id)).size).toBe(TREE_LEVELS.length);
    const titles = new Set(
      TIERS.flatMap((tier) =>
        tier.titles.flatMap((title) => [title.name, title.female ?? title.name]),
      ),
    );
    for (const id of ['coroa', 'alta', 'oficiais', 'mestres']) {
      const level = TREE_LEVELS.find((one) => one.id === id)!;
      for (const name of level.example.split(' · ')) {
        expect(titles.has(name), `${id}: ${name}`).toBe(true);
      }
    }
  });

  it('lists the sections of the page in the order it tells them, each once, with the realm first and the story last', () => {
    expect(NAV.map((item) => item.href)).toEqual([
      '#reino',
      '#faccoes',
      '#guildas',
      '#hierarquia',
      '#lore',
    ]);
    expect(unique(NAV.map((item) => item.label))).toBe(true);
    expect(NAV.every((item) => filled(item.label))).toBe(true);
  });

  it('numbers the steps of the way in without repeating a number', () => {
    expect(unique(JOIN_STEPS.map((step) => step.numeral))).toBe(true);
    for (const step of JOIN_STEPS) {
      expect([step.numeral, step.title, step.text].every(filled)).toBe(true);
    }
    expect(JOIN_STEPS).toHaveLength(3);
  });

  it('says the whitelist is done inside the game (2026-10-30), not by sending a profile to the staff', () => {
    const words = JOIN_STEPS.map((step) => `${step.title} ${step.text}`).join(' ');
    expect(words).toContain('A whitelist é feita dentro do jogo');
    expect(words).not.toMatch(/perfil da Steam/);
  });

  it('gives each card picture three files named by their width, the largest as wide as it is declared, so that a big or a sharp screen is not given a stretched one (2026-10-30)', () => {
    for (const picture of [...PILLARS, ...SHOTS]) {
      const widths = [picture.small, picture.medium, picture.large].map((file) =>
        Number(/-(\d+)\.webp$/.exec(file)?.[1]),
      );
      expect(widths[0]).toBe(720);
      expect(widths[0]).toBeLessThan(widths[1]);
      expect(widths[1]).toBeLessThan(widths[2]);
      expect(widths[2], picture.large).toBe(picture.width);
      // A card is drawn about 700 css pixels wide: the largest file has to carry it on a screen at twice the density.
      expect(widths[2]).toBeGreaterThanOrEqual(1400);
    }
    expect(srcsetOf('a-720.webp', 'a-1280.webp', 'a-2200.webp')).toBe(
      'img/a-720.webp 720w, img/a-1280.webp 1280w, img/a-2200.webp 2200w',
    );
    expect(() => srcsetOf('a.webp')).toThrow();
  });

  it('declares each picture of the realm and of the game in the shape the file has, and where it stays in view', () => {
    for (const picture of [...PILLARS, ...SHOTS]) {
      expect(picture.width).toBeGreaterThan(0);
      expect(picture.height).toBeGreaterThan(0);
      expect(picture.position).toMatch(/^\d{1,3}% \d{1,3}%$/);
    }
  });

  it('tells the lore in six chapters, each with its own anchor and something to read', () => {
    expect(CHAPTERS.map((chapter) => chapter.id)).toEqual([
      'guerra',
      'morte-dos-reis',
      'cinzas',
      'leoes',
      'corvos',
      'coroa-vaga',
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

  it('tells the war of the two kings and the two factions, and names no lord of the nobility (2026-10-30)', () => {
    const text = CHAPTERS.flatMap((chapter) =>
      chapter.blocks.flatMap((block) => (block.kind === 'list' ? block.items : [block.text])),
    ).join(' ');
    for (const fact of [
      'Venceslau IV',
      'Sigismundo, rei da Hungria',
      'cumanos',
      'Kuttenberg',
      'facção dos Leões',
      'facção dos Corvos',
      'novo rei',
    ]) {
      expect(text, fact).toContain(fact);
    }
    for (const person of ['Radovan', 'Gunther', 'Silberhände', 'Schodal', 'Protetor da Coroa', 'bastardo']) {
      expect(text, person).not.toContain(person);
    }
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
    // The 38 titles of the server's catalog, and the plebeians.
    expect(titles).toHaveLength(38 + 1);
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
