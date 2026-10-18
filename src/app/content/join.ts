import type { Step } from '../shared/ui/steps/steps';

/** What a newcomer does, in order. The server's whitelist is filled in on Discord. */
export const JOIN_STEPS: readonly Step[] = [
  {
    numeral: 'I',
    title: 'Entre no Discord',
    text: 'É lá que a comunidade vive, que os anúncios saem e que as alianças começam.',
  },
  {
    numeral: 'II',
    title: 'Faça a whitelist',
    text: 'O reino só abre os portões para quem passa pela whitelist.',
  },
  {
    numeral: 'III',
    title: 'Nasça plebeu',
    text: 'Crie o seu personagem, escolha uma guilda, jure lealdade a uma facção e comece a subir.',
  },
];
