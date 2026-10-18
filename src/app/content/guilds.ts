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
    description: 'Trabalham o ferro nas forjas de Kuttenberg: espadas, armaduras e ferramentas.',
  },
  {
    id: 'venatores',
    latin: 'Venatores',
    profession: 'Caçador',
    crest: 'guild-cacador.webp',
    description: 'Caçam e rastreiam nas florestas, trazendo carne, pele e couro.',
  },
  {
    id: 'tabernarii',
    latin: 'Tabernarii',
    profession: 'Taberneiro',
    crest: 'guild-taberneiro.webp',
    description: 'Servem nas tabernas de Kuttenberg. Onde há cerveja, há notícia e fofoca.',
  },
  {
    id: 'alchemistae',
    latin: 'Alchemistae',
    profession: 'Alquimista',
    crest: 'guild-alquimista.webp',
    description: 'Destilam ervas e minerais em poções, venenos e remédios.',
  },
  {
    id: 'artifices',
    latin: 'Artifices',
    profession: 'Artesão',
    crest: 'guild-artesao.webp',
    description: 'Cosem e remendam o que Kuttenberg veste: túnicas, calças e capuzes.',
  },
];
