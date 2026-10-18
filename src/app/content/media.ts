/** A picture file and its size in pixels, for the `width` and `height` the page needs to keep the place of what is loading. */
export interface Picture {
  /** Relative to the page, like every picture of the site: no slash in front, so the same build works under any base path. */
  readonly src: string;
  readonly width: number;
  readonly height: number;
}

/** A recording of the server: a video, and the frame it shows until it is played. */
export interface Clip {
  readonly id: string;
  readonly title: string;
  readonly text: string;
  /** How long it runs, as a reader would say it. */
  readonly length: string;
  /** The file under `public/video`. */
  readonly file: string;
  readonly poster: Picture;
}

/** A screenshot: the picture the page shows, and the larger one the enlarged view shows. */
export interface Shot {
  readonly id: string;
  readonly title: string;
  readonly text: string;
  /** What the picture shows, for a reader who cannot see it. */
  readonly alt: string;
  readonly small: Picture;
  readonly large: Picture;
}

/**
 * The videos, the first of them the big one. They are cut down from the recordings by `tools/make-media.py` (the
 * originals are over 100 MB, more than GitHub takes in one file); the sizes and lengths here are what it prints.
 */
export const CLIPS: readonly Clip[] = [
  {
    id: 'duelo',
    title: 'Duelo no pátio',
    text: 'Dois cavaleiros de armadura cruzam espadas no pátio do castelo.',
    length: '1 min 13 s',
    file: 'video/duelo.mp4',
    poster: { src: 'img/media-duelo-poster.webp', width: 1280, height: 582 },
  },
  {
    id: 'passeio',
    title: 'Passeio a cavalo',
    text: 'O grupo segue a trilha da floresta ao cair da tarde.',
    length: '18 s',
    file: 'video/passeio.mp4',
    poster: { src: 'img/media-passeio-poster.webp', width: 1280, height: 590 },
  },
  {
    id: 'cavalo',
    title: 'Entardecer nos campos',
    text: 'Cavaleiros cruzam o campo quando o dia chega ao fim.',
    length: '8 s',
    file: 'video/cavalo.mp4',
    poster: { src: 'img/media-cavalo-poster.webp', width: 1280, height: 570 },
  },
];

/** The screenshots, in the order they are shown. */
export const SHOTS: readonly Shot[] = [
  {
    id: 'patio',
    title: 'No pátio do castelo',
    text: 'Um cavaleiro de vermelho, a cavalo, no meio da névoa.',
    alt: 'Um cavaleiro de casaco vermelho montado num cavalo escuro, no pátio de um castelo coberto de névoa.',
    small: { src: 'img/media-patio-960.webp', width: 960, height: 446 },
    large: { src: 'img/media-patio-1920.webp', width: 1920, height: 891 },
  },
  {
    id: 'cavalgada',
    title: 'Cavalgada pela estrada',
    text: 'Companheiros seguem a estrada de terra entre os campos de feno.',
    alt: 'Três cavaleiros de vermelho seguem uma estrada de terra entre campos de feno e uma floresta, sob um céu azul.',
    small: { src: 'img/media-cavalgada-960.webp', width: 960, height: 431 },
    large: { src: 'img/media-cavalgada-1920.webp', width: 1920, height: 862 },
  },
  {
    id: 'dados',
    title: 'Mesa de dados',
    text: 'Uma partida de dados à sombra, no meio da vila.',
    alt: 'Dois jogadores sentados diante de uma mesa de dados, sob um telhado de palha, numa vila de casas de madeira.',
    small: { src: 'img/media-dados-960.webp', width: 960, height: 428 },
    large: { src: 'img/media-dados-1920.webp', width: 1920, height: 857 },
  },
];

/**
 * The server's first trailer, on YouTube. The card in the opening shows its own copy of the thumbnail (`tools/make-trailer.py`
 * writes it) and builds the player only when it is clicked, so a visitor's browser asks YouTube for nothing until then.
 */
export interface Trailer {
  /** The video's id on YouTube. */
  readonly id: string;
  readonly title: string;
  readonly text: string;
  /** How long it runs, as a reader would say it, and as a search engine reads it. */
  readonly length: string;
  readonly duration: string;
  /** The day it went up, as a search engine reads it. */
  readonly uploaded: string;
  readonly small: Picture;
  readonly large: Picture;
}

export const TRAILER: Trailer = {
  id: 'Z5xjWIUd6Uo',
  title: 'Trailer de revelação',
  text: 'O primeiro trailer do servidor: a revelação do Kingdom RP BRASIL.',
  length: '3 min 5 s',
  duration: 'PT3M5S',
  uploaded: '2026-10-16',
  small: { src: 'img/trailer-640.webp', width: 640, height: 360 },
  large: { src: 'img/trailer-1280.webp', width: 1280, height: 720 },
};
