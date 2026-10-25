import type { Step } from '../shared/ui/steps/steps';

/** What a newcomer does, in order. The server's whitelist is filled in on Discord. */
export const JOIN_STEPS: readonly Step[] = [
  {
    numeral: 'I',
    icon: 'chat',
    title: 'Entre no Discord',
    text: 'É lá que a comunidade vive, que os anúncios saem e que as alianças começam.',
  },
  {
    numeral: 'II',
    icon: 'checklist',
    title: 'Faça a whitelist',
    text: 'O reino só abre os portões para quem passa pela whitelist.',
  },
  {
    numeral: 'III',
    icon: 'person',
    title: 'Nasça plebeu',
    text: 'Crie o seu personagem, escolha uma guilda, jure lealdade a uma facção e comece a subir.',
  },
];
