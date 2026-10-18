export type RealmHouseId = 'kuttenberg' | 'trosky' | 'raborsch' | 'suchdol' | 'maleshov';

export interface RealmHouse {
  readonly id: RealmHouseId;
  /** The place, as the ribbon of its crest writes it. */
  readonly place: string;
  /** The house, as the lore calls it. */
  readonly house: string;
  /** Who holds it now, or what it has become, in a few words. */
  readonly holder: string;
  readonly text: string;
  /** The crest's file in public/img, its size there, and what it shows. */
  readonly crest: string;
  readonly crestWidth: number;
  readonly crestHeight: number;
  readonly crestAlt: string;
  /**
   * Where the crest stands on the map, as percentages of the map's width and height: where the user put it on
   * `mapa.png` (found by comparing it with `mapa puro.jpeg`, the same map without the crests).
   */
  readonly x: number;
  readonly y: number;
  /** How wide the crest is drawn, as a percentage of the map's width (Kuttenberg's, the crown's, is the largest). */
  readonly size: number;
}

/** What the map says, for anybody who cannot see it. */
export const MAP_ALT =
  'Mapa da região de Kuttenberg, entre florestas, campos e nuvens escuras: Kuttenberg e Trosky a leste, Raborsch e Suchdol a oeste e Maleshov ao sul';

/**
 * The five houses of the lore on the map of the realm, the crown first. Their texts follow the user's story of the
 * crown of Kuttenberg (`lore.ts`): Trosky is the House of the Lions of Radovan de Zelený, Raborsch Gunther von
 * Silberhände's, Suchdol the House of Schodal that lost its lord with the king, and Maleshov the one that conspired.
 */
export const REALM_HOUSES: readonly RealmHouse[] = [
  {
    id: 'kuttenberg',
    place: 'Kuttenberg',
    house: 'A Coroa',
    holder: 'Cidade real · o trono está vazio',
    text: 'A cidade da prata. Suas minas pagam exércitos, e quem segura Kuttenberg segura a Boêmia.',
    crest: 'house-kuttenberg.webp',
    crestWidth: 320,
    crestHeight: 330,
    crestAlt: 'Brasão de Kuttenberg: a águia negra sobre o campo dourado, sob a coroa',
    x: 80.47,
    y: 23.91,
    size: 10.2,
  },
  {
    id: 'trosky',
    place: 'Trosky',
    house: 'Casa dos Leões',
    holder: 'Radovan de Zelený, Marquês e Protetor da Coroa',
    text: 'Guarda a única carta que o rei deixou, e com ela o direito de marchar sobre Kuttenberg. Muitos querem saber o que mais ela dizia.',
    crest: 'house-trosky.webp',
    crestWidth: 320,
    crestHeight: 324,
    crestAlt: 'Brasão de Trosky: o leão branco coroado sobre o campo vermelho',
    x: 70.12,
    y: 45.94,
    size: 6.8,
  },
  {
    id: 'raborsch',
    place: 'Raborsch',
    house: 'Casa Raborsch',
    holder: 'Gunther von Silberhände, Lorde de Raborsch',
    text: 'O punho de prata. Um dos poucos em quem o rei confiou até o fim, e agora senhor da própria escolha.',
    crest: 'house-raborsch.webp',
    crestWidth: 320,
    crestHeight: 322,
    crestAlt:
      'Brasão de Raborsch: um braço de armadura que ergue uma pedra de prata, sobre o campo azul',
    x: 26.17,
    y: 14.06,
    size: 6.8,
  },
  {
    id: 'suchdol',
    place: 'Suchdol',
    house: 'Casa de Schodal',
    holder: 'Terra sem senhor',
    text: 'O Lorde de Schodal caiu na mesma campanha que o rei. Terra sem dono não fica sem dono por muito tempo.',
    crest: 'house-suchdol.webp',
    crestWidth: 320,
    crestHeight: 411,
    crestAlt: 'Brasão de Suchdol: três pernas armadas em roda sobre o campo verde',
    x: 15.33,
    y: 34.22,
    size: 6.8,
  },
  {
    id: 'maleshov',
    place: 'Maleshov',
    house: 'Casa de Maleshov',
    holder: 'Sob suspeita de traição',
    text: 'Marchou ao lado do rei e conspirou pelas costas dele. Ninguém sabe até onde vai a trama, nem quem mais está nela.',
    crest: 'house-maleshov.webp',
    crestWidth: 320,
    crestHeight: 410,
    crestAlt: 'Brasão de Maleshov: o corvo negro sobre o campo azul, sob uma coroa',
    x: 56.15,
    y: 80.4,
    size: 7.2,
  },
];
