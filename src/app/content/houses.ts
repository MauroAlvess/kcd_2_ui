export interface House {
  readonly id: 'leao' | 'corvo';
  readonly name: string;
  readonly leader: string;
  /** The motto the server shows on the faction page. */
  readonly motto: string;
  readonly creed: string;
  /** What the oath gives: the mantle and the collar come in the house's colour. */
  readonly colours: string;
  /** The crest's file in public/img, and what it shows. */
  readonly crest: string;
  readonly crestAlt: string;
}

export const HOUSES: readonly House[] = [
  {
    id: 'leao',
    name: 'Casa do Leão Dourado',
    leader: 'Lord Radovan de Zelený',
    motto: 'Pela honra, a lei e o sangue, manteremos a ordem.',
    creed: 'Legitimidade, lei e tradição. O poder pertence ao herdeiro, por sangue e por direito.',
    colours: 'Manto e gola vermelhos',
    crest: 'faction-leao.webp',
    crestAlt: 'Brasão da Casa do Leão Dourado: um leão dourado sobre o campo vermelho',
  },
  {
    id: 'corvo',
    name: 'Casa do Corvo',
    leader: 'Lord Marek de Černý',
    motto: 'Nas sombras da guerra, a astúcia conquista o que a força não pode.',
    creed:
      'Capacidade, alianças e autonomia local. Governa quem sabe proteger e manter a terra de pé.',
    colours: 'Manto e gola azuis',
    crest: 'faction-corvo.webp',
    crestAlt: 'Brasão da Casa do Corvo: um corvo sobre o campo negro',
  },
];
