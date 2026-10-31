/** One thing the realm offers, in a few words, with the picture that takes the stage while it is read. */
export interface Pillar {
  readonly id: string;
  /** The small label above the title: the numeral and what it is about. */
  readonly label: string;
  readonly title: string;
  readonly text: string;
  /**
   * The picture in public/img, in three widths, each named by its own (the page tells them to the browser by `srcset`, `srcsetOf`): `large` is the original's size, for a big or a
   * sharp screen (2026-10-30, the user: "os cards de imagem, algumas estão distorcidas, perdendo qualidade por causa da resolução"), `medium` the one a laptop asks for, `small` a phone's.
   */
  readonly large: string;
  readonly medium: string;
  readonly small: string;
  /** The size of the large file, as it is (the box reserves the right shape before it loads). */
  readonly width: number;
  readonly height: number;
  /** Which part of the picture stays in view when it is cut to the shape of the stage (`object-position`). */
  readonly position: string;
  readonly alt: string;
}

/** A picture taken in the game, with the few words under it. */
export interface Shot {
  readonly id: string;
  /** Three widths, as a pillar's. */
  readonly large: string;
  readonly medium: string;
  readonly small: string;
  /**
   * How wide the picture is drawn once it is cut to its box (`sizes`): a picture that fills its box by its height (the market's, in a tall frame, shows a third of its width) is
   * drawn wider than the box, and the browser has to be told so or it takes a file that is too small (the laptop's 720 one, stretched 1.6 times).
   */
  readonly sizes: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly caption: string;
  readonly text: string;
  /** Which part of the picture stays in view when it is cut to the shape of its box (`object-position`). */
  readonly position: string;
}

/**
 * The `srcset` of a picture that comes in several files named by their width ("pilar-oficio-720.webp"): each file with its own width, so that the browser takes the smallest one
 * that is sharp at the size the picture is drawn and the density of the screen.
 */
export const srcsetOf = (...files: readonly string[]): string =>
  files
    .map((file) => {
      const width = /-(\d+)\.webp$/.exec(file)?.[1];
      if (width === undefined) {
        throw new Error(`${file} has no width in its name`);
      }
      return `img/${file} ${width}w`;
    })
    .join(', ');

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
    large: 'pilar-oficio-2200.webp',
    medium: 'pilar-oficio-1280.webp',
    small: 'pilar-oficio-720.webp',
    width: 2200,
    height: 1208,
    // The two riders stand in the left half of the painting; the tree and the far castle on its right are what is cut when the stage is nearly square.
    position: '12% 50%',
    alt: 'Dois cavaleiros de armadura galopando por uma estrada de terra sob nuvens de tempestade, com um pássaro no céu e um castelo ao longe',
  },
  {
    id: 'familia',
    label: 'II · Uma família',
    title: 'Funde uma linhagem',
    text: 'Case, tenha herdeiros, adote, reconheça um bastardo. A sua árvore cresce por gerações e herda terras, títulos e inimigos.',
    large: 'pilar-familia-2200.webp',
    medium: 'pilar-familia-1280.webp',
    small: 'pilar-familia-720.webp',
    // The woman stands at about a third of the painting's width and the knight at the door at four fifths: a nearly square stage keeps both when it is held to the right.
    width: 2200,
    height: 1232,
    position: '86% 50%',
    alt: 'Uma mulher de vestido vermelho junto à janela, de olhos baixos, enquanto um cavaleiro de armadura deixa o quarto pela porta',
  },
  {
    id: 'teto',
    label: 'III · Um teto',
    title: 'Erga o que é seu',
    text: 'Casas, oficinas e castelos, com portas e baús que só abrem para quem você escolher. O cavalo e a carroça esperam onde você os deixou.',
    large: 'pilar-teto-2200.webp',
    medium: 'pilar-teto-1280.webp',
    small: 'pilar-teto-720.webp',
    width: 2200,
    height: 1249,
    // The two towers and the gate stand between a sixth and four fifths of the painting's width.
    position: '36% 50%',
    alt: 'Besteiros diante da muralha de um castelo, com uma torre rachada, outra de madeira e um portão de tábuas sob um céu cinzento',
  },
  {
    id: 'coroa',
    label: 'IV · Uma coroa',
    title: 'Escolha um lado',
    text: 'Duas facções disputam o reino, o Leão e o Corvo. Jurar lealdade é escolher um lado, e a escolha não tem volta.',
    large: 'pilar-coroa-1920.webp',
    medium: 'pilar-coroa-1280.webp',
    small: 'pilar-coroa-720.webp',
    // A banner (3 : 1): the two fighters stand in its left half, so a nearly square stage is held to the left.
    width: 1920,
    height: 636,
    position: '10% 50%',
    alt: 'Duelo entre um guerreiro cumano de escudo vermelho e um cavaleiro de armadura, entre poeira e nuvens',
  },
];

/** The game as the players see it: two pictures from the server, one beside the other, a little out of step. */
export const SHOTS: readonly Shot[] = [
  {
    id: 'floresta',
    large: 'galeria-floresta-1600.webp',
    medium: 'galeria-floresta-1200.webp',
    small: 'galeria-floresta-720.webp',
    sizes: '(max-width: 60rem) 100vw, 800px',
    width: 1600,
    height: 895,
    alt: 'Um cavaleiro de armadura descansa sob uma grande árvore, com a espada ao lado, e um corvo pousa no escudo de um soldado caído na relva',
    caption: 'Florestas',
    text: 'A floresta alimenta quem sabe ler os seus rastros.',
    position: '50% 50%',
  },
  {
    id: 'estrada',
    large: 'galeria-estrada-1600.webp',
    medium: 'galeria-estrada-1200.webp',
    small: 'galeria-estrada-720.webp',
    // The frame is 4 : 5 (519 x 649 on a desktop): the picture fills it by its height, so it is drawn about 1160 px wide, and on a phone twice the screen's width.
    sizes: '(max-width: 60rem) 200vw, 1160px',
    width: 1600,
    height: 883,
    alt: 'Uma carroça coberta segue por uma estrada de terra ao entardecer, entre muros de pedra, com ruínas sobre um morro no horizonte',
    caption: 'Estradas',
    text: 'Toda estrada tem dono, e preço.',
    position: '78% 50%',
  },
];
