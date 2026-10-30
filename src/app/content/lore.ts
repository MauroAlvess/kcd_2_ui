/** What a chapter is made of, in the order it is read. */
export type Block =
  /** The chapter's opening, in italics. */
  | { readonly kind: 'lead'; readonly text: string }
  | { readonly kind: 'text'; readonly text: string }
  | { readonly kind: 'list'; readonly items: readonly string[] };

export interface Chapter {
  /** The anchor the contents list links to. */
  readonly id: string;
  /** The year the chapter opens with, for those that are dated. */
  readonly year?: string;
  readonly title: string;
  readonly blocks: readonly Block[];
}

export const LORE_EYEBROW = 'Crônica · 1402 – 1403';
/** The title: the plain words, then the gilded ones. */
export const LORE_TITLE = 'A Boêmia sem reis e a';
export const LORE_TITLE_EM = 'Guerra das Facções.';
export const LORE_LEAD = 'Dois reis em guerra, uma terra em chamas e duas facções pela coroa.';

/** A line of the short version of the story, beside the map: what happened, in a breath. */
export interface Episode {
  readonly mark: string;
  readonly title: string;
  readonly text: string;
}

/**
 * The story in seven lines; the whole of it follows, folded, in `CHAPTERS`. Rewritten on 2026-10-30 (the user: "ao invés de ter pessoas específicas, vamos deixar mais genérico, usando
 * fatos históricos"): no lord, no house of the nobility and no letter is named; what is told is what history gives (Wenceslas IV, King of Bohemia, and his half-brother Sigismund, King
 * of Hungary, whom the Cumans served) and what the server adds (both die, the ashes of the war light the revolts, and the two factions are born).
 */
export const EPISODES: readonly Episode[] = [
  {
    mark: '1402',
    title: 'A guerra dos reis',
    text: 'Venceslau IV, rei da Boêmia, e seu meio-irmão Sigismundo, rei da Hungria, entram em guerra pelo reino.',
  },
  {
    mark: 'A Hungria',
    title: 'Sigismundo e os cumanos',
    text: 'Sigismundo marcha sobre a Boêmia com os exércitos da Hungria e os arqueiros cumanos.',
  },
  {
    mark: '1403',
    title: 'A morte dos reis',
    text: 'A guerra se arrasta, a Boêmia sofre, e os dois reis morrem antes de qualquer vitória.',
  },
  {
    mark: 'As cinzas',
    title: 'Kuttenberg em chamas',
    text: 'O que a guerra deixou em Kuttenberg e por toda a Boêmia acende chamas e revoltas.',
  },
  {
    mark: 'Os Leões',
    title: 'Os ideais de Venceslau',
    text: 'Os que acreditavam nos ideais de Venceslau se unem e formam a facção dos Leões.',
  },
  {
    mark: 'Os Corvos',
    title: 'Os ideais de Sigismundo',
    text: 'Os que apoiavam Sigismundo e os cumanos criam a facção dos Corvos.',
  },
  {
    mark: 'Agora',
    title: 'Uma coroa vaga',
    text: 'Leões e Corvos lutam pelas terras da Boêmia até que um lado vença e surja um novo rei. O resto da história é escrito por quem joga.',
  },
];

/** The story of the Bohemia without kings, chapter by chapter. */
export const CHAPTERS: readonly Chapter[] = [
  {
    id: 'guerra',
    year: '1402',
    title: 'A guerra dos dois reis',
    blocks: [
      {
        kind: 'lead',
        text: 'Boêmia, ano de 1402. O reino é de Venceslau IV, da casa de Luxemburgo, e há anos ele não consegue mantê-lo em paz: os nobres se dividem, as dívidas crescem e a autoridade do rei se enfraquece.',
      },
      {
        kind: 'text',
        text: 'Quem mais cobiça a coroa da Boêmia é o próprio meio-irmão do rei, **Sigismundo, rei da Hungria**. Ele conhece o reino, tem aliados entre os senhores boêmios e conta com um exército que Venceslau não pode igualar.',
      },
      {
        kind: 'text',
        text: 'Ao lado dos húngaros marcham os **cumanos**, cavaleiros e arqueiros das estepes que servem a coroa da Hungria: homens que lutam de longe, depressa e sem piedade, e que a Boêmia aprende a temer.',
      },
      {
        kind: 'text',
        text: 'Começa uma guerra que não se decide numa batalha. Cercos, saques, juramentos quebrados e estradas tomadas fazem da região de Kuttenberg, rica pelas minas de prata que sustentam a coroa, um dos prêmios mais disputados.',
      },
    ],
  },
  {
    id: 'morte-dos-reis',
    year: '1403',
    title: 'A morte dos reis',
    blocks: [
      {
        kind: 'text',
        text: 'A guerra se arrasta por mais de um ano, e a Boêmia, que no começo só olhava, passa a sofrer: colheitas queimadas, caravanas assaltadas, aldeias vazias e minas paradas.',
      },
      {
        kind: 'text',
        text: 'Então os dois reis morrem. Nenhum deles vence, e nenhum deixa um herdeiro que todos aceitem, nem um acordo que ponha fim ao que começaram.',
      },
      {
        kind: 'text',
        text: 'De um lado ficam os fiéis de Venceslau, sem rei; do outro, os homens de Sigismundo e os cumanos, sem comando. Os dois lados ainda têm armas, castelos e rancor, e ficam sem ninguém que lhes diga que a guerra acabou.',
      },
    ],
  },
  {
    id: 'cinzas',
    title: 'As cinzas de Kuttenberg',
    blocks: [
      {
        kind: 'text',
        text: 'O que a guerra deixou em Kuttenberg e na Boêmia não se apaga com a morte de quem a começou: vilas queimadas, famílias sem teto, bandos de soldados sem soldo e estradas onde ninguém viaja sozinho.',
      },
      {
        kind: 'text',
        text: 'Dos restos da guerra nascem **chamas e revoltas**. Cidades fecham os portões, senhores locais escolhem a quem obedecer, e quem não tem a quem obedecer escolhe a quem seguir.',
      },
      {
        kind: 'text',
        text: 'Mercadores, artesãos, camponeses e guildas se veem presos no meio. Todos precisam de um lado, de uma lei e de um senhor que os proteja, e é assim que se formam as duas facções.',
      },
    ],
  },
  {
    id: 'leoes',
    title: 'Os Leões',
    blocks: [
      {
        kind: 'text',
        text: 'Os que acreditavam nos ideais de Venceslau IV se unem sob um só estandarte: **a facção dos Leões**.',
      },
      {
        kind: 'text',
        text: 'Querem um reino de ordem e de lei, em que a honra, o sangue e a palavra dada valham mais que a força de quem chegou por último. O seu lema é “pela honra, a lei e o sangue, manteremos a ordem”, e o seu brasão é o leão dourado sobre o campo vermelho.',
      },
    ],
  },
  {
    id: 'corvos',
    title: 'Os Corvos',
    blocks: [
      {
        kind: 'text',
        text: 'Os que apoiavam os ideais de Sigismundo e dos cumanos se unem em outro estandarte: **a facção dos Corvos**.',
      },
      {
        kind: 'text',
        text: 'Aprenderam na guerra que a astúcia vale o que a espada não vale, e que o reino pertence a quem sabe esperar a hora. O seu lema é “nas sombras da guerra, a astúcia conquista o que a força não pode”, e o seu brasão é o corvo negro sobre o campo azul.',
      },
    ],
  },
  {
    id: 'coroa-vaga',
    title: 'A coroa vaga',
    blocks: [
      {
        kind: 'text',
        text: 'Hoje, em 1403, a Boêmia não tem rei. Leões e Corvos lutam pelo controle das terras do reino, cidade por cidade, estrada por estrada, e ninguém nasce do lado vencedor: o lado vencedor é o que se faz.',
      },
      {
        kind: 'text',
        text: 'A guerra só termina quando uma das duas facções vencer e fizer um novo rei. Até lá, cada senhor, cada guilda e cada plebeu que ergue a própria casa em Kuttenberg está, querendo ou não, escrevendo o que vem depois.',
      },
    ],
  },
];

/** The last words of the story, and the question it leaves the player with. */
export const LORE_ENDING = {
  text: '**Os dois reis morreram. A coroa está vaga. E as duas facções ainda lutam por ela.**',
  question: 'E você, a quem jurará sua lealdade?',
} as const;
