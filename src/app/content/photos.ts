/** One screenshot of the gallery: the small file for the grid, the large one for the enlarged view, and the words that go with it. */
export interface Photo {
  readonly id: string;
  readonly title: string;
  /** What the picture shows, for whoever cannot see it. */
  readonly alt: string;
  readonly small: { readonly src: string; readonly width: number; readonly height: number };
  readonly large: { readonly src: string; readonly width: number; readonly height: number };
}

export const PHOTOS_EYEBROW = 'Fotos';
export const PHOTOS_TITLE = 'O reino pelos olhos de quem o vive';
export const PHOTOS_LEAD =
  'Imagens tiradas dentro do jogo pelos próprios jogadores: as aldeias, as estradas, as tavernas e os campos de treino do reino.';

/**
 * The players' screenshots, in the order they are shown. The files are made by `tools/make-photos.py` from the folder `fotos` at the
 * root of the project; adding one means putting it there, listing it in that script and here.
 */
export const PHOTOS: readonly Photo[] = [
  {
    id: 'foto-1',
    title: 'O estábulo, à luz do lampião',
    alt: 'Um cavalo no estábulo de uma aldeia, na penumbra, sob o telhado de palha.',
    small: { src: 'img/foto-1-960.webp', width: 960, height: 535 },
    large: { src: 'img/foto-1-1920.webp', width: 1569, height: 875 },
  },
  {
    id: 'foto-2',
    title: 'Conversa no trigal',
    alt: 'Três personagens conversam entre as espigas, com as casas da aldeia ao fundo.',
    small: { src: 'img/foto-2-960.webp', width: 960, height: 495 },
    large: { src: 'img/foto-2-1920.webp', width: 1366, height: 705 },
  },
  {
    id: 'foto-3',
    title: 'Uma moça no capinzal',
    alt: 'Uma aldeã de camisa branca e vestido de lã parada no meio do capim alto.',
    small: { src: 'img/foto-3-960.webp', width: 960, height: 679 },
    large: { src: 'img/foto-3-1920.webp', width: 1252, height: 886 },
  },
  {
    id: 'foto-4',
    title: 'À mesa, à luz de velas',
    alt: 'Dois personagens à mesa de uma tenda de feira, com velas acesas, ao fim da tarde.',
    small: { src: 'img/foto-4-960.webp', width: 960, height: 571 },
    large: { src: 'img/foto-4-1920.webp', width: 1813, height: 1079 },
  },
  {
    id: 'foto-5',
    title: 'Treino de arco à noite',
    alt: 'Um arqueiro de capuz verde com uma tocha, diante do alvo cravado de flechas.',
    small: { src: 'img/foto-5-960.webp', width: 960, height: 540 },
    large: { src: 'img/foto-5-1920.webp', width: 1920, height: 1080 },
  },
  {
    id: 'foto-6',
    title: 'Na praça da aldeia',
    alt: 'Duas jogadoras na praça conversam com um cavaleiro montado, entre as casas de madeira.',
    small: { src: 'img/foto-6-960.webp', width: 960, height: 542 },
    large: { src: 'img/foto-6-1920.webp', width: 1553, height: 877 },
  },
  {
    id: 'foto-7',
    title: 'Junto ao fogo',
    alt: 'O interior de uma casa de troncos, com figuras em volta da mesa e a lareira acesa.',
    small: { src: 'img/foto-7-960.webp', width: 960, height: 365 },
    large: { src: 'img/foto-7-1920.webp', width: 1920, height: 730 },
  },
  {
    id: 'foto-8',
    title: 'A estrada na floresta',
    alt: 'Dois viajantes seguem pela estrada de terra sob as bétulas, e alguém vem de longe.',
    small: { src: 'img/foto-8-960.webp', width: 960, height: 528 },
    large: { src: 'img/foto-8-1920.webp', width: 1797, height: 989 },
  },
  {
    id: 'foto-9',
    title: 'Na capela',
    alt: 'Um personagem sozinho numa capela de paredes pintadas, com uma vela sobre o banco.',
    small: { src: 'img/foto-9-960.webp', width: 960, height: 510 },
    large: { src: 'img/foto-9-1920.webp', width: 1917, height: 1018 },
  },
  {
    id: 'foto-10',
    title: 'Treino de espada',
    alt: 'Dois personagens se medem de espada diante dos muros de tijolo de uma fortaleza.',
    small: { src: 'img/foto-10-960.webp', width: 960, height: 521 },
    large: { src: 'img/foto-10-1920.webp', width: 1205, height: 654 },
  },
];
