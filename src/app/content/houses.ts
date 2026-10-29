/** One of the two houses that dispute the realm, with its crest. */
export interface House {
  readonly id: 'leao' | 'corvo';
  /** The line above the crest: which house it is and what it stands for. */
  readonly label: string;
  /** The name before its gilded words: "Casa do" and "Leão Dourado". */
  readonly name: string;
  readonly nameEm: string;
  /** The crest's file in public/img. */
  readonly crest: string;
  readonly alt: string;
  readonly text: string;
}

export const HOUSES_EYEBROW = 'As duas casas';
export const HOUSES_TITLE = 'Leão ou';
export const HOUSES_TITLE_EM = 'Corvo.';
export const HOUSES_LEAD =
  'Jurar lealdade a uma é tomar o lado dela na guerra, e a escolha não tem volta.';

export const HOUSES: readonly House[] = [
  {
    id: 'leao',
    label: 'Casa I · Protetor da Coroa',
    name: 'Casa do',
    nameEm: 'Leão Dourado',
    crest: 'brasao-leao.webp',
    alt: 'Brasão da Casa do Leão Dourado: leão dourado sobre campo vermelho',
    text: 'Radovan, Protetor da Coroa, quer preservar a sucessão.',
  },
  {
    id: 'corvo',
    label: 'Casa II · Maleshov',
    name: 'Casa do',
    nameEm: 'Corvo',
    crest: 'brasao-corvo.webp',
    alt: 'Brasão da Casa do Corvo: corvo negro sobre campo azul',
    text: 'A Casa de Maleshov desconfia do Protetor e de seus poderes.',
  },
];
