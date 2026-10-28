/** One thing the realm offers, in a few words. */
export interface Pillar {
  readonly id: string;
  readonly title: string;
  readonly text: string;
}

/** A picture taken in the game, shown as it is: two sizes of the same file, and what it shows. */
export interface Shot {
  readonly id: string;
  /** The file for a screen as wide as the window and the one for a phone, both in public/img. */
  readonly large: string;
  readonly small: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly caption: string;
  /** Which part of the picture stays in view when it is cut to the shape of its box (`object-position`). */
  readonly position: string;
}

export const PITCH_EYEBROW = 'O reino';
export const PITCH_TITLE = 'Ninguém nasce nobre';
export const PITCH_LEAD =
  'Em Kuttenberg todo mundo começa plebeu. O que você vira depende do que fizer, e de quem estiver ao seu lado.';

/**
 * What a newcomer is told first, in four lines (2026-10-28, the user: "um site que passe informações que atraem jogadores novos a entrar
 * no RP, minimalista, simples, que venda a ideia sem ser gigante"): a trade, a family, a roof, a crown. Each is true of the server as it is.
 */
export const PILLARS: readonly Pillar[] = [
  {
    id: 'oficio',
    title: 'Um ofício',
    text: 'Ferreiro, caçador, taberneiro, alquimista, artesão, coletor, agricultor ou domador: cada guilda tem as suas receitas, e ninguém faz tudo sozinho.',
  },
  {
    id: 'familia',
    title: 'Uma família',
    text: 'Case, tenha herdeiros, adote, reconheça um bastardo. A sua árvore cresce por gerações e herda terras, títulos e inimigos.',
  },
  {
    id: 'teto',
    title: 'Um teto',
    text: 'Casas, oficinas e castelos, com portas e baús que só abrem para quem você escolher. O cavalo e a carroça esperam onde você os deixou.',
  },
  {
    id: 'coroa',
    title: 'Uma coroa',
    text: 'Duas casas disputam o reino, o Leão e o Corvo. Jurar lealdade é escolher um lado, e a escolha não tem volta.',
  },
];

/** The game as the players see it: three pictures from the server, with no frame and no effect. */
export const SHOTS: readonly Shot[] = [
  {
    id: 'taverna',
    large: 'shot-taverna-1200.webp',
    small: 'shot-taverna-720.webp',
    width: 1200,
    height: 714,
    alt: 'Dois jogadores sentados à mesa de uma taverna ao fim da tarde, com a luz de uma lamparina à frente e a vila ao fundo',
    caption: 'Tavernas',
    position: '50% 60%',
  },
  {
    id: 'duelo',
    large: 'shot-duelo-1200.webp',
    small: 'shot-duelo-720.webp',
    width: 1200,
    height: 651,
    alt: 'Dois jogadores duelam de espada num pátio, diante da muralha e da torre de uma cidade',
    caption: 'Duelos',
    position: '42% 55%',
  },
  {
    id: 'vila',
    large: 'shot-vila-1200.webp',
    small: 'shot-vila-720.webp',
    width: 1200,
    height: 678,
    alt: 'Jogadores conversam numa vila de casas de madeira, um deles montado num cavalo escuro, com uma carroça ao fundo',
    caption: 'Vilas e estradas',
    position: '55% 60%',
  },
];
