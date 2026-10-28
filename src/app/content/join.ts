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
    text: 'Envie o seu perfil da Steam à equipe no Discord. Só contas aprovadas passam pelos portões do reino.',
  },
  {
    numeral: 'III',
    icon: 'person',
    title: 'Nasça plebeu',
    text: 'Baixe o launcher e entre. Crie o seu personagem, aceite as regras do reino, escolha uma guilda e comece a subir.',
  },
];
