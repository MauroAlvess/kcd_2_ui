/** One step of the way in, in order. */
export interface Step {
  /** The mark in front of the step: a number with its zero. */
  readonly numeral: string;
  /** The first words, in the heavier face. */
  readonly title: string;
  /** What follows them. */
  readonly text: string;
}

/** What a newcomer does, in order. The whitelist is done inside the game, at the door of the server (2026-10-30: "a wl agora é feita dentro do jogo"). */
export const JOIN_STEPS: readonly Step[] = [
  {
    numeral: '01',
    title: 'Entre no Discord.',
    text: 'A comunidade, os anúncios e as alianças acontecem lá.',
  },
  {
    numeral: '02',
    title: 'Entre pela porta do servidor.',
    text: 'Baixe o launcher e entre. A whitelist é feita dentro do jogo: um trailer e um questionário de dez perguntas sobre as regras.',
  },
  {
    numeral: '03',
    title: 'Nasça plebeu.',
    text: 'Crie seu personagem e escolha onde nasce: os Leões, em Suchdol, ou os Corvos, em Malešov. Depois procure um escrivão ou um mestre de ofício: é ele quem cede a sua guilda.',
  },
];
