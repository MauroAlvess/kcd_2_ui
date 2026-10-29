/** One step of the way in, in order. */
export interface Step {
  /** The mark in front of the step: a number with its zero. */
  readonly numeral: string;
  /** The first words, in the heavier face. */
  readonly title: string;
  /** What follows them. */
  readonly text: string;
}

/** What a newcomer does, in order. The server's whitelist is filled in on Discord. */
export const JOIN_STEPS: readonly Step[] = [
  {
    numeral: '01',
    title: 'Entre no Discord.',
    text: 'A comunidade, os anúncios e as alianças acontecem lá.',
  },
  {
    numeral: '02',
    title: 'Faça a whitelist.',
    text: 'Envie seu perfil da Steam à equipe. Só contas aprovadas entram.',
  },
  {
    numeral: '03',
    title: 'Nasça plebeu.',
    text: 'Baixe o launcher, crie seu personagem e escolha uma guilda.',
  },
];
