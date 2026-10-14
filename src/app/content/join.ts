import type { Step } from '../shared/ui/steps/steps';

/** What a newcomer does, in order. The server's whitelist is filled in on Discord. */
export const JOIN_STEPS: readonly Step[] = [
  {
    numeral: '1',
    title: 'Entre no Discord',
    text: 'É lá que a comunidade vive e que o servidor se organiza.',
  },
  { numeral: '2', title: 'Preencha a whitelist', text: 'O acesso ao servidor é por whitelist.' },
  {
    numeral: '3',
    title: 'Faça o seu personagem',
    text: 'Escolha uma guilda, jure lealdade a uma casa e comece como plebeu.',
  },
];
