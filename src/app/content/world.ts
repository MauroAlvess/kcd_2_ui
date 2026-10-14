export interface Path {
  readonly title: string;
  readonly kicker: string;
  readonly items: readonly string[];
}

/** The two ways of living in the realm: facing the road, or staying in the fields. */
export const PATHS: readonly Path[] = [
  {
    title: 'A estrada',
    kicker: 'Para quem procura perigo',
    items: [
      'Bandidos à espreita, prontos para saquear quem passa',
      'Acampamentos inteiros tomados por bandidos',
      'Lobos, javalis e cães selvagens nas florestas',
    ],
  },
  {
    title: 'Os campos',
    kicker: 'Para quem prefere a paz',
    items: [
      'Uma vida tranquila nos campos',
      'Cozinhar e criar poções',
      'Gastar todas as moedas em um jogo de dados',
    ],
  },
];
