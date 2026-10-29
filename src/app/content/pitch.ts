/** One thing the realm offers, in a few words, with the picture that takes the stage while it is read. */
export interface Pillar {
  readonly id: string;
  /** The small label above the title: the numeral and what it is about. */
  readonly label: string;
  readonly title: string;
  readonly text: string;
  /** The picture in public/img, in two widths: the file for a screen as wide as the window and the one for a phone. */
  readonly large: string;
  readonly small: string;
  readonly alt: string;
}

/** A picture taken in the game, with the few words under it. */
export interface Shot {
  readonly id: string;
  readonly large: string;
  readonly small: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly caption: string;
  readonly text: string;
  /** Which part of the picture stays in view when it is cut to the shape of its box (`object-position`). */
  readonly position: string;
}

export const PITCH_EYEBROW = 'O reino';
/** The title of the first chapter: the plain words, then the gilded one. */
export const PITCH_TITLE = 'Ninguém nasce';
export const PITCH_TITLE_EM = 'nobre.';

/**
 * What a newcomer is told first, in four lines (2026-10-28, the user: "um site que passe informações que atraem jogadores novos a entrar
 * no RP, minimalista, simples, que venda a ideia sem ser gigante"): a trade, a family, a roof, a crown. Each is true of the server as it is.
 * They take turns on the stage while the page is held still (2026-10-29, the new identity), each with its own picture.
 */
export const PILLARS: readonly Pillar[] = [
  {
    id: 'oficio',
    label: 'I · Um ofício',
    title: 'Domine um ofício',
    text: 'Ferreiro, caçador, taberneiro, alquimista, artesão, coletor, agricultor ou domador: cada guilda tem as suas receitas, e ninguém faz tudo sozinho.',
    large: 'pilar-oficio-1280.webp',
    small: 'pilar-oficio-720.webp',
    alt: 'Ferreiro martelando uma lâmina incandescente na bigorna',
  },
  {
    id: 'familia',
    label: 'II · Uma família',
    title: 'Funde uma linhagem',
    text: 'Case, tenha herdeiros, adote, reconheça um bastardo. A sua árvore cresce por gerações e herda terras, títulos e inimigos.',
    large: 'pilar-familia-1280.webp',
    small: 'pilar-familia-720.webp',
    alt: 'Jogadores cavalgando juntos numa estrada de terra entre campos e floresta',
  },
  {
    id: 'teto',
    label: 'III · Um teto',
    title: 'Erga o que é seu',
    text: 'Casas, oficinas e castelos, com portas e baús que só abrem para quem você escolher. O cavalo e a carroça esperam onde você os deixou.',
    large: 'pilar-teto-1280.webp',
    small: 'pilar-teto-720.webp',
    alt: 'Kuttenberg vista do vale, com telhados, muralhas e torres na neblina',
  },
  {
    id: 'coroa',
    label: 'IV · Uma coroa',
    title: 'Escolha um lado',
    text: 'Duas casas disputam o reino, o Leão e o Corvo. Jurar lealdade é escolher um lado, e a escolha não tem volta.',
    large: 'pilar-coroa-1280.webp',
    small: 'pilar-coroa-720.webp',
    alt: 'Duelo de cavaleiros num pátio de castelo, observado pela nobreza',
  },
];

/** The game as the players see it: two pictures from the server, one beside the other, a little out of step. */
export const SHOTS: readonly Shot[] = [
  {
    id: 'floresta',
    large: 'galeria-floresta-1200.webp',
    small: 'galeria-floresta-720.webp',
    width: 1200,
    height: 675,
    alt: 'Besta apontada para um cervo numa floresta enevoada',
    caption: 'Florestas',
    text: 'A floresta alimenta quem sabe ler os seus rastros.',
    position: '50% 50%',
  },
  {
    id: 'mercado',
    large: 'galeria-mercado-1200.webp',
    small: 'galeria-mercado-720.webp',
    width: 1200,
    height: 675,
    alt: 'Praça de mercado ao entardecer com barracas e casas de fachada gótica',
    caption: 'Mercados',
    text: 'Todo boato tem dono, e preço.',
    position: '40% 50%',
  },
];
