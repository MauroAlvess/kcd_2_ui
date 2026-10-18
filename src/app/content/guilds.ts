export interface Guild {
  readonly id: string;
  /** The guild's name in Latin, as the server calls it. */
  readonly latin: string;
  readonly profession: string;
  /** The crest's file in public/img. */
  readonly crest: string;
  readonly description: string;
}

export const GUILDS: readonly Guild[] = [
  {
    id: 'fabri-ferrarii',
    latin: 'Fabri Ferrarii',
    profession: 'Ferreiro',
    crest: 'guild-ferreiro.webp',
    description: 'Fogo, martelo e aço. Toda espada que corta em Kuttenberg nasceu numa forja.',
  },
  {
    id: 'venatores',
    latin: 'Venatores',
    profession: 'Caçador',
    crest: 'guild-cacador.webp',
    description: 'Arco, faro e paciência. A floresta alimenta quem sabe ler os seus rastros.',
  },
  {
    id: 'tabernarii',
    latin: 'Tabernarii',
    profession: 'Taberneiro',
    crest: 'guild-taberneiro.webp',
    description: 'Cerveja, ensopado e segredos. Na taverna, todo boato tem dono, e preço.',
  },
  {
    id: 'alchemistae',
    latin: 'Alchemistae',
    profession: 'Alquimista',
    crest: 'guild-alquimista.webp',
    description: 'Ervas, poções e ataduras. Curam as feridas do reino, e às vezes as causam.',
  },
  {
    id: 'artifices',
    latin: 'Artifices',
    profession: 'Artesão',
    crest: 'guild-artesao.webp',
    description: 'Linha, couro e tecido. Vestem do camponês ao marquês.',
  },
];
