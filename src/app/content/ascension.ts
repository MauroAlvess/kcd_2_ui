import type { Step } from '../shared/ui/steps/steps';

/** How a rise to nobility reaches the family: those of the blood go up with the one raised; adopted and bastard children do not. */
export const NOBILITY_RULE =
  'Um plebeu pode subir a nobre, e os seus descendentes sobem junto com ele. Filhos adotados e bastardos não herdam o título.';

export const RANKS: readonly Step[] = [
  {
    numeral: 'I',
    title: 'Plebeu',
    text: 'Todos começam aqui, com roupas de trabalho, comida para umas cinco horas, uma espada de caça, uma adaga, uma tocha e 100 moedas.',
  },
  {
    numeral: 'II',
    title: 'Cavaleiro',
    text: 'Sirva a uma casa, ganhe fama com a espada ou com o arco e mostre do que é capaz.',
  },
  {
    numeral: 'III',
    title: 'Nobre',
    text: 'Terras, título e uma família que carrega o seu nome.',
  },
];
