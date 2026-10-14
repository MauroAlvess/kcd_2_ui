export interface Guild {
  readonly id: string;
  /** The guild's name in Latin, as the server calls it. */
  readonly latin: string;
  readonly profession: string;
  /** The crest's file in public/img. */
  readonly crest: string;
  readonly description: string;
  /** What a member is handed the first time they join the guild. */
  readonly kit: string;
}

export const GUILDS: readonly Guild[] = [
  {
    id: 'fabri-ferrarii',
    latin: 'Fabri Ferrarii',
    profession: 'Ferreiro',
    crest: 'guild-ferreiro.webp',
    description:
      'Trabalham o ferro nas forjas de Kuttenberg: espadas, armaduras e ferramentas para quem precisa. Sem eles, nenhum exército se arma e nenhum arado corta a terra.',
    kit: 'Dois manuais de forja, sucata, ferro, aço e ferragens para a primeira peça.',
  },
  {
    id: 'venatores',
    latin: 'Venatores',
    profession: 'Caçador',
    crest: 'guild-cacador.webp',
    description:
      'Caçam e rastreiam nas florestas ao redor de Kuttenberg, trazendo carne, pele e couro. Conhecem cada trilha que os soldados não veem.',
    kit: 'Um arco de aveleira, 20 flechas de caça e 20 flechas comuns.',
  },
  {
    id: 'tabernarii',
    latin: 'Tabernarii',
    profession: 'Taberneiro',
    crest: 'guild-taberneiro.webp',
    description:
      'Fermentam cevada e lúpulo e servem nas tabernas de Kuttenberg. Onde há cerveja, há notícia, fofoca e um ouvido disposto a escutar por uma moeda.',
    kit: 'Carne de porco crua para o primeiro assado.',
  },
  {
    id: 'alchemistae',
    latin: 'Alchemistae',
    profession: 'Alquimista',
    crest: 'guild-alquimista.webp',
    description:
      'Destilam ervas e minerais em poções, venenos e remédios. Conhecimento guardado a sete chaves, tão útil quanto perigoso nas mãos erradas.',
    kit: 'O Herbário do Aprendiz, ervas e carvão para as primeiras poções.',
  },
  {
    id: 'artifices',
    latin: 'Artifices',
    profession: 'Artesão',
    crest: 'guild-artesao.webp',
    description:
      'Cosem e remendam o que Kuttenberg veste: túnicas, calças e capuzes. Do camponês ao mercador, todos precisam de um pano que dure.',
    kit: 'Dez peças de roupa simples, prontas para vender.',
  },
];
