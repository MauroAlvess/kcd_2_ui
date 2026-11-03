/**
 * The Crônicas da Boêmia (2026-11-03, the user: "essas histórias são baseadas no próprio roleplay desenvolvido totalmente por jogadores, sem intervenção alguma da staff"):
 * the videos the server's channel makes of what its players lived, one per act, in the order they were made. The server's first trailer opens the row (the same day the user added
 * it: "aproveite e já add esse também, que é o primeiro trailer do servidor"); the acts that come next go at the end. The section is made for more (add an entry, and its cover with
 * `tools/make-chronicles.py`).
 */

export const CHRONICLES_EYEBROW = 'Crônicas da Boêmia';
/** The title: the plain words, then the gilded one. */
export const CHRONICLES_TITLE = 'O reino é escrito por quem';
export const CHRONICLES_TITLE_EM = 'joga.';
export const CHRONICLES_LEAD =
  'Estas histórias nasceram do roleplay dos jogadores, do começo ao fim, sem roteiro e sem intervenção alguma da staff. Assista ao que já aconteceu em Kuttenberg.';

export interface Chronicle {
  readonly id: string;
  /** What its tick under the caption says: the act's number in Roman, or a word. */
  readonly tick: string;
  /** What the card's label and the caption's say first: "Ato I". */
  readonly label: string;
  /** The act's name: the plain words, then the gilded one. */
  readonly name: string;
  readonly nameEm: string;
  /** The video's own id on YouTube (the part after `v=`). */
  readonly video: string;
  /** The covers in public/img, named by their width (`srcsetOf`). */
  readonly small: string;
  readonly large: string;
  /** The size of the large cover (the box keeps its shape before it loads). */
  readonly width: number;
  readonly height: number;
  /** What the cover shows, and the title written on it. */
  readonly alt: string;
}

export const CHRONICLES: readonly Chronicle[] = [
  {
    id: 'trailer',
    tick: 'Trailer',
    label: 'Primeiro trailer',
    name: 'Kingdom RP',
    nameEm: 'Brasil',
    video: 'Z5xjWIUd6Uo',
    small: 'cronica-trailer-640.webp',
    large: 'cronica-trailer-1280.webp',
    width: 1280,
    height: 720,
    alt: 'Trailer de revelação do Kingdom RP Brasil: um cavaleiro de armadura sob um sol dourado, com o brasão do Roleplay Brasileiro e a bandeira do Brasil.',
  },
  {
    id: 'ato-1',
    tick: 'I',
    label: 'Ato I',
    name: 'O primeiro',
    nameEm: 'conflito',
    video: '0Yt1FPSQWqQ',
    small: 'cronica-ato-1-640.webp',
    large: 'cronica-ato-1-1280.webp',
    width: 1280,
    height: 720,
    alt: 'As Crônicas da Boêmia, A Primeira Batalha: cavaleiros em armadura diante de uma paliçada em chamas, à noite.',
  },
  {
    id: 'ato-2',
    tick: 'II',
    label: 'Ato II',
    name: 'Um novo',
    nameEm: 'lorde',
    video: 'w9F0UUXOUj0',
    small: 'cronica-ato-2-640.webp',
    large: 'cronica-ato-2-1280.webp',
    width: 1280,
    height: 720,
    alt: 'As Crônicas da Boêmia, Um Novo Lorde: um homem e uma mulher diante de uma porta de madeira, e um grupo com tochas à noite.',
  },
];

/** A YouTube id is eleven letters, digits, "-" and "_": anything else is not put in an address. */
export const isVideoId = (id: string): boolean => /^[\w-]{11}$/.test(id);

/** The video's own page, for whoever prefers it or has no scripts. */
export const watchUrl = (id: string): string => `https://www.youtube.com/watch?v=${id}`;

/**
 * The player that opens in the card when it is asked for. The privacy domain of YouTube sets no cookie until the video is played; the page loads nothing of YouTube's
 * before the click, and the cover is its own file.
 */
export const embedUrl = (id: string): string =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
