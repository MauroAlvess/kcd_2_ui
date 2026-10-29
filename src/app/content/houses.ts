/** One of the two houses that dispute the realm, with the knight that stands for it. */
export interface House {
  readonly id: 'leao' | 'corvo';
  readonly name: string;
  /** The knight's file in public/img, cut out of the user's sheet of the two knights. */
  readonly image: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

export const HOUSES_EYEBROW = 'As duas casas';
export const HOUSES_TITLE = 'Leão ou Corvo';
export const HOUSES_LEAD =
  'Duas casas disputam a coroa de Kuttenberg. Jurar lealdade a uma é tomar o lado dela na guerra, e a escolha não tem volta.';

/** The red house on the left and the blue one on the right, the colours the band is painted in behind them. */
export const HOUSES: readonly House[] = [
  {
    id: 'leao',
    name: 'Casa do Leão Dourado',
    image: 'knight-lion.webp',
    width: 500,
    height: 675,
    alt: 'Cavaleiro da Casa do Leão Dourado, de armadura e túnica vermelhas, com o leão branco no escudo',
  },
  {
    id: 'corvo',
    name: 'Casa do Corvo',
    image: 'knight-raven.webp',
    width: 500,
    height: 674,
    alt: 'Cavaleiro da Casa do Corvo, de armadura e túnica azuis e amarelas, com o corvo no escudo',
  },
];
