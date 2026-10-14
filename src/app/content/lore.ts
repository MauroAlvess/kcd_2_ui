import type { Step } from '../shared/ui/steps/steps';

/** How a quarrel over an inheritance became a war, in the order it happened. */
export const WAR_STEPS: readonly Step[] = [
  {
    numeral: 'I',
    title: 'A sucessão contestada',
    text: 'Radovan reivindicou a Marca pela legitimidade hereditária. Marek negou que ele tivesse autoridade para isso.',
  },
  {
    numeral: 'II',
    title: 'A crise das dívidas',
    text: 'As dívidas de Lord Oldřich ficaram sem pagamento, e as duas casas passaram a disputar propriedades, rendas e pedágios.',
  },
  {
    numeral: 'III',
    title: 'O primeiro confronto',
    text: 'Caravanas foram bloqueadas, as rotas de comércio ficaram sob ameaça e soldados começaram a ocupar as terras disputadas.',
  },
  {
    numeral: 'IV',
    title: 'A guerra aberta',
    text: 'Acusações de traição, ataques a comboios e represálias transformaram uma briga de herança em um conflito entre duas casas.',
  },
];
