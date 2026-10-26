import type { InterludePhoto } from '../shared/ui/interlude/interlude';

/**
 * The photographs of the game between the chapters (2026-10-26): the smithy before the guilds, a street of the realm at dusk before the
 * story. Made by `tools/make-images.py` from the project's `img` folder.
 */
export const INTERLUDES = {
  forja: {
    src: 'img/forja-1920.webp',
    srcset: 'img/forja-960.webp 960w, img/forja-1920.webp 1920w',
    width: 1920,
    height: 1080,
    alt: 'Uma ferraria do reino: o ferreiro trabalha junto à forja, entre ferramentas penduradas',
    position: '50% 45%',
  },
  cidade: {
    src: 'img/cidade-1920.webp',
    srcset: 'img/cidade-960.webp 960w, img/cidade-1920.webp 1920w',
    width: 1920,
    height: 1080,
    alt: 'Uma rua do reino ao entardecer, com gente entre as casas de madeira',
    position: '50% 60%',
  },
} as const satisfies Record<string, InterludePhoto>;
