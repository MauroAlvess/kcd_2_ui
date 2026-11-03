import { SITE } from '../core/site';

/**
 * The server on the social networks (2026-11-03, the user: "crie uma seção redes sociais, coloquei dentro do img os prints: TikTok, Instagram, YouTube e Discord ... vamos usar o mesmo layout do
 * site e usar os prints lá para ficar legal"): a card for each page, with the owner's print of it, and the Discord in a band of its own under them, the one network with no print, and the
 * one a newcomer has to go through. The addresses are the site's (`src/site.config.json`); the pictures come from `tools/make-social.py`.
 */

export const SOCIAL_EYEBROW = 'Redes sociais';
/** The title: the plain words, then the gilded ones. */
export const SOCIAL_TITLE = 'O reino também vive';
export const SOCIAL_TITLE_EM = 'fora do jogo.';
export const SOCIAL_LEAD =
  'Trailers, crônicas e cenas do que acontece em Kuttenberg, nas redes do servidor. Siga para acompanhar o que os jogadores vivem.';

export interface SocialPage {
  readonly id: string;
  /** The network's name. */
  readonly name: string;
  /** How the server is called there. */
  readonly handle: string;
  /** What is found there, in one line. */
  readonly line: string;
  /** What the link says. */
  readonly action: string;
  readonly href: string;
  /** The print in public/img, in two widths, named by their width (`srcsetOf`). */
  readonly small: string;
  readonly large: string;
  /** The size of the large one (the box keeps its shape before it loads). */
  readonly width: number;
  readonly height: number;
  /** What the print shows. */
  readonly alt: string;
}

export const SOCIAL_PAGES: readonly SocialPage[] = [
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@kingdomrpbrasil',
    line: 'Cenas curtas do que acontece no reino.',
    action: 'Seguir no TikTok',
    href: SITE.social.tiktok,
    small: 'social-tiktok-480.webp',
    large: 'social-tiktok-960.webp',
    width: 960,
    height: 540,
    alt: 'A página do Kingdom RP Brasil no TikTok, com o brasão do servidor e os vídeos publicados.',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@kingdomrpbrasil',
    line: 'Como entrar no servidor, as crônicas e os bastidores.',
    action: 'Seguir no Instagram',
    href: SITE.social.instagram,
    small: 'social-instagram-480.webp',
    large: 'social-instagram-960.webp',
    width: 960,
    height: 540,
    alt: 'O perfil do Kingdom RP Brasil no Instagram, com o brasão do servidor, os destaques e as publicações.',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    handle: '@kingdomrpbrasil',
    line: 'O trailer e as Crônicas da Boêmia, inteiros.',
    action: 'Ver o canal no YouTube',
    href: SITE.social.youtube,
    small: 'social-youtube-480.webp',
    large: 'social-youtube-960.webp',
    width: 960,
    height: 540,
    alt: 'O canal Kingdom Come: Deliverance II, RP Brasil no YouTube, com o banner do servidor e os vídeos das Crônicas da Boêmia.',
  },
];

/** The Discord's band: the title's plain word and gilded word, and its line. */
export const SOCIAL_DISCORD = {
  name: 'Discord',
  title: 'A conversa do reino',
  titleEm: 'acontece aqui.',
  line: 'A comunidade, os anúncios e as alianças acontecem no Discord. É também o primeiro passo para entrar no servidor.',
  action: 'Entrar no Discord',
} as const;
