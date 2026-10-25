/**
 * The site's line drawings, in the hand of the ones in the game's panel (user, 2026-10-25: "depois colocarmos ícones nos sites também"): a
 * 24 x 24 square, one thin stroke in the colour of the text around it, round ends and corners, nothing filled. Each is a list of path
 * `d` strings (circles and ellipses are written as arcs, a dot as a zero-length stroke), so the `Icon` component draws any of them with the
 * same few lines. The section marks are the very shapes of the panel's menu (banner, shield, tree, house, crown, heart); the rest are drawn
 * in the same style. Anything new goes here, and the contact sheet in `tools/` shows them all at once.
 */
export const ICONS = {
  /* The sections, in the order of the page. */
  map: [
    'M3.5 6.4 L9 4.4 L15 6.4 L20.5 4.4 V17.6 L15 19.6 L9 17.6 L3.5 19.6 Z',
    'M9 4.4 V17.6 M15 6.4 V19.6',
  ],
  banner: ['M6 3 V21', 'M6 4.5 H19 L15.8 9 L19 13.5 H6'],
  shield: [
    'M12 2.8 L19.6 5.6 V11.4 C19.6 16.2 16.4 19.8 12 21.4 C7.6 19.8 4.4 16.2 4.4 11.4 V5.6 Z',
  ],
  tree: [
    'M9.7 5 a2.3 2.3 0 1 0 4.6 0 a2.3 2.3 0 1 0 -4.6 0',
    'M3.2 19 a2.3 2.3 0 1 0 4.6 0 a2.3 2.3 0 1 0 -4.6 0',
    'M16.2 19 a2.3 2.3 0 1 0 4.6 0 a2.3 2.3 0 1 0 -4.6 0',
    'M12 7.3 V12 M12 12 H5.5 V16.7 M12 12 H18.5 V16.7',
  ],
  crown: ['M4 18 L5 8 L9.4 12.2 L12 6 L14.6 12.2 L19 8 L20 18 Z', 'M4 21 H20'],
  house: ['M3.5 11 L12 3.8 L20.5 11', 'M5.8 9.6 V20.2 H18.2 V9.6', 'M10 20.2 V14.2 H14 V20.2'],
  heart: [
    'M12 20.2 C5.6 15.6 3.2 12.4 3.2 9.1 C3.2 6.5 5.2 4.6 7.6 4.6 C9.5 4.6 11.1 5.8 12 7.4 C12.9 5.8 14.5 4.6 16.4 4.6 C18.8 4.6 20.8 6.5 20.8 9.1 C20.8 12.4 18.4 15.6 12 20.2 Z',
  ],
  book: [
    'M12 6.6 C9.8 4.9 6.6 4.5 3.8 5 V18.4 C6.6 17.9 9.8 18.3 12 20 C14.2 18.3 17.4 17.9 20.2 18.4 V5 C17.4 4.5 14.2 4.9 12 6.6 Z',
    'M12 6.6 V20',
  ],
  scales: [
    'M12 4 V20 M8 20.5 H16',
    'M4.5 7 H19.5',
    'M4.5 7 L2.2 13 M4.5 7 L6.8 13 M2.2 13 a2.3 2.3 0 0 0 4.6 0 Z',
    'M19.5 7 L17.2 13 M19.5 7 L21.8 13 M17.2 13 a2.3 2.3 0 0 0 4.6 0 Z',
  ],
  enter: [
    'M14 4.5 H18 a1.5 1.5 0 0 1 1.5 1.5 V18 a1.5 1.5 0 0 1 -1.5 1.5 H14',
    'M10 8 L14 12 L10 16 M14 12 H4',
  ],

  /* The rules. */
  swords: [
    'M6.5 3 L15.2 16.4 M11.6 17.2 L17 14.3 M15.2 16.4 L17.4 20.8',
    'M17.5 3 L8.8 16.4 M7 14.3 L12.4 17.2 M8.8 16.4 L6.6 20.8',
  ],
  horseshoe: [
    'M6.6 20.4 C3.6 16.4 3.8 8.6 7 5.4 C9.2 3.2 14.8 3.2 17 5.4 C20.2 8.6 20.4 16.4 17.4 20.4',
    'M6.6 20.4 H9.4 M14.6 20.4 H17.4',
    'M7.4 9.2 V9.4 M16.6 9.2 V9.4 M6.4 13.4 V13.6 M17.6 13.4 V13.6',
  ],
  broken: [
    'M12 3.4 a8.6 8.6 0 1 0 0 17.2 a8.6 8.6 0 1 0 0 -17.2',
    'M13.4 3.6 L10.6 9 L14 12.2 L10.4 16.2 L11.4 20.5',
  ],
  eye: [
    'M2.5 12 C5 7.5 8.5 5.5 12 5.5 C15.5 5.5 19 7.5 21.5 12 C19 16.5 15.5 18.5 12 18.5 C8.5 18.5 5 16.5 2.5 12 Z',
    'M9.4 12 a2.6 2.6 0 1 0 5.2 0 a2.6 2.6 0 1 0 -5.2 0',
  ],
  fist: [
    'M6 10.5 a2 2 0 0 1 2 -2 H16 a2 2 0 0 1 2 2 V14.5 C18 17.5 16 20 12.5 20 H11.5 C8 20 6 17.5 6 14.5 Z',
    'M9 8.5 V12 M12 8.5 V12 M15 8.5 V12',
    'M6 14 H12.2 a1.5 1.5 0 0 1 0 3',
  ],

  /* The steps and the gifts. */
  chat: [
    'M5.2 4.6 H18.8 a1.7 1.7 0 0 1 1.7 1.7 V14.3 a1.7 1.7 0 0 1 -1.7 1.7 H11.2 L7 19.8 V16 H5.2 a1.7 1.7 0 0 1 -1.7 -1.7 V6.3 a1.7 1.7 0 0 1 1.7 -1.7 Z',
    'M8.5 10.3 V10.3 M12 10.3 V10.3 M15.5 10.3 V10.3',
  ],
  checklist: [
    'M6.5 3.5 H14.5 L19 8 V20.5 H6.5 Z',
    'M14.5 3.5 V8 H19',
    'M9 14.2 L11.2 16.4 L15.2 12',
  ],
  person: [
    'M8.4 8 a3.6 3.6 0 1 0 7.2 0 a3.6 3.6 0 1 0 -7.2 0',
    'M4.5 21 C4.5 15.8 8 13.6 12 13.6 C16 13.6 19.5 15.8 19.5 21',
  ],
  paw: [
    'M12 12.6 C9.2 12.6 6.6 15.6 6.6 17.8 C6.6 19.6 8 20.4 9.6 20.2 C10.6 20.1 11.2 19.7 12 19.7 C12.8 19.7 13.4 20.1 14.4 20.2 C16 20.4 17.4 19.6 17.4 17.8 C17.4 15.6 14.8 12.6 12 12.6 Z',
    'M3.3 11.6 a1.5 2 0 1 0 3 0 a1.5 2 0 1 0 -3 0',
    'M7.1 7 a1.5 2.1 0 1 0 3 0 a1.5 2.1 0 1 0 -3 0',
    'M13.9 7 a1.5 2.1 0 1 0 3 0 a1.5 2.1 0 1 0 -3 0',
    'M17.7 11.6 a1.5 2 0 1 0 3 0 a1.5 2 0 1 0 -3 0',
  ],
  handgonne: [
    'M2.8 8.2 H14.6 V11.6 H2.8 Z',
    'M6.2 8.2 V11.6 M10.4 8.2 V11.6',
    'M14.6 9.2 H21.2 V12 H17.4 L16.6 16.2 H13.6 L14.6 11.6',
    'M12.4 8.2 V6.2',
  ],
  tunic: [
    'M8.6 3.8 L3.4 6.6 L5.4 11 L8 10 V20.2 H16 V10 L18.6 11 L20.6 6.6 L15.4 3.8 C14.8 5.4 13.4 6.2 12 6.2 C10.6 6.2 9.2 5.4 8.6 3.8 Z',
    'M8 14.2 H16',
  ],
  download: ['M12 4 V15 M7.5 10.6 L12 15.2 L16.5 10.6', 'M4.5 19.5 H19.5'],
} as const satisfies Record<string, readonly string[]>;

export type IconName = keyof typeof ICONS;
