import type { Step } from '../shared/ui/steps/steps';

/** What a newcomer does, in order. The server's whitelist is filled in on Discord. */
export const JOIN_STEPS: readonly Step[] = [
  {
    numeral: '1',
    title: 'Entre no Discord',
    text: 'É lá que a comunidade vive, que os anúncios saem e que as alianças começam.',
  },
  {
    numeral: '2',
    title: 'Faça a whitelist',
    text: 'Envie o seu perfil da Steam à equipe no Discord. Só contas aprovadas passam pelos portões do reino.',
  },
  {
    numeral: '3',
    title: 'Nasça plebeu',
    text: 'Baixe o launcher e entre. Crie o seu personagem, aceite as regras do reino, escolha uma guilda e comece a subir.',
  },
];
