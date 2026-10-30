/** One of the two factions that dispute the realm (a faction, not a noble house, 2026-10-30), with its crest. */
export interface House {
  readonly id: 'leao' | 'corvo';
  /** The line above the crest: which faction it is and what it stands for. */
  readonly label: string;
  /** The name before its gilded words: "Facção do" and "Leão Dourado". */
  readonly name: string;
  readonly nameEm: string;
  /** The crest's file in public/img. */
  readonly crest: string;
  readonly alt: string;
  readonly text: string;
}

export const HOUSES_EYEBROW = 'As duas facções';
export const HOUSES_TITLE = 'Leão ou';
export const HOUSES_TITLE_EM = 'Corvo.';
export const HOUSES_LEAD =
  'Jurar lealdade a uma é tomar o lado dela na guerra, e a escolha não tem volta.';

export const HOUSES: readonly House[] = [
  {
    id: 'leao',
    label: 'Os Leões · Ideais de Venceslau',
    name: 'Facção do',
    nameEm: 'Leão Dourado',
    crest: 'brasao-leao.webp',
    alt: 'Brasão da facção do Leão Dourado: leão dourado sobre campo vermelho',
    text: 'Os que acreditam nos ideais de Venceslau IV: honra, lei e sangue para manter a ordem do reino.',
  },
  {
    id: 'corvo',
    label: 'Os Corvos · Ideais de Sigismundo',
    name: 'Facção do',
    nameEm: 'Corvo',
    crest: 'brasao-corvo.webp',
    alt: 'Brasão da facção do Corvo: corvo negro sobre campo azul',
    text: 'Os que seguem Sigismundo e os cumanos: nas sombras da guerra, a astúcia conquista o que a força não pode.',
  },
];
