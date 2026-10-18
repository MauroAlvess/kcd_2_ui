/** The picture each rule is drawn with (an inline line drawing in the Rules section). */
export type RuleIcon = 'swords' | 'horseshoe' | 'broken' | 'shield' | 'eye' | 'fist';

export interface Rule {
  readonly id: string;
  /** The name players use, as the server's rules write it. */
  readonly name: string;
  /** What the letters stand for, when the name is an abbreviation. */
  readonly full?: string;
  /** `forbidden` names what is punished; `expected`, what every character must do. */
  readonly kind: 'forbidden' | 'expected';
  readonly text: string;
  readonly icon: RuleIcon;
}

/*
 * The server's basic rules of roleplay, from the user's own parchment "Regras Básicas de RP Medieval" (2026-10-16),
 * shortened for the page: the setting, what stays in the roleplay, the rule with the most weight, the six terms and the motto.
 */

export const RULES_SETTING =
  'O servidor se passa a partir de 1403, numa sociedade medieval marcada por conflitos, violência, desigualdade e costumes muito diferentes dos de hoje. Essa ambientação existe para criar um RP imersivo, nunca para justificar mau comportamento entre jogadores.';

export const RULES_IN_CHARACTER =
  'O que acontece no RP fica no RP. O seu personagem pode ter as crenças e os costumes da época, mas eles nunca servem para atacar, constranger, assediar ou discriminar a pessoa por trás de outro personagem.';

export const ZERO_TOLERANCE = {
  title: 'Tolerância zero',
  text: 'Misoginia, racismo, preconceito, assédio, violência sexual e outras formas de abuso não são toleradas quando passam dos limites do RP ou miram o jogador. "Naquela época era assim" não é desculpa aceita pela Staff.',
} as const;

export const RULES: readonly Rule[] = [
  {
    id: 'rdm',
    name: 'RDM',
    full: 'Random Deathmatch',
    kind: 'forbidden',
    text: 'Matar ou agredir alguém sem motivo nem contexto válido de RP.',
    icon: 'swords',
  },
  {
    id: 'hdm',
    name: 'HDM',
    full: 'Horse Deathmatch',
    kind: 'forbidden',
    text: 'Usar o cavalo para atropelar, ferir ou matar alguém sem uma situação de RP que justifique.',
    icon: 'horseshoe',
  },
  {
    id: 'anti-rp',
    name: 'Anti-RP',
    kind: 'forbidden',
    text: 'Ignorar a lógica, as consequências ou a imersão da cena.',
    icon: 'broken',
  },
  {
    id: 'fear-rp',
    name: 'Fear RP',
    kind: 'expected',
    text: 'Valorize a própria vida: aja de acordo com o perigo que o seu personagem enfrenta.',
    icon: 'shield',
  },
  {
    id: 'metagaming',
    name: 'Metagaming',
    kind: 'forbidden',
    text: 'Usar no jogo o que se soube fora dele para favorecer o personagem.',
    icon: 'eye',
  },
  {
    id: 'powergaming',
    name: 'Powergaming',
    kind: 'forbidden',
    text: 'Forçar ações ou resultados sobre outro personagem sem deixar que ele reaja.',
    icon: 'fist',
  },
];

export const RULES_STAFF =
  'A Staff pode analisar e punir o que passar desses limites, mesmo quando o jogador chama a conduta de "parte do RP".';

export const RULES_MOTTO =
  'Viva a época. Interprete o seu personagem. Respeite quem está por trás dele.';
