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
export const LORE_TITLE = 'A Coroa de Kuttenberg e a';
export const LORE_TITLE_EM = 'Guerra da Sucessão.';
export const LORE_LEAD = 'Uma aliança, um rei morto e uma carta que quase não chegou.';

/** A line of the short version of the story, beside the map: what happened, in a breath. */
export interface Episode {
  readonly mark: string;
  readonly title: string;
  readonly text: string;
}

/** The story in seven lines (2026-10-29, the new identity); the whole of it follows, folded, in `CHAPTERS`. */
export const EPISODES: readonly Episode[] = [
  {
    mark: '1402',
    title: 'A aliança',
    text: 'Quatro casas nobres se unem a Sigismundo na disputa contra Venceslau IV pelo poder.',
  },
  {
    mark: '1403',
    title: 'A morte do rei',
    text: 'Sigismundo cai em combate, ao lado do Lorde de Schodal. Seu herdeiro mais velho também morre, e a aliança se desfaz.',
  },
  {
    mark: 'A carta',
    title: 'A carta que sobreviveu',
    text: 'Sigismundo queria reconhecer um filho bastardo. Suas cartas foram interceptadas ou perdidas. Só uma chegou a Radovan, nomeado Protetor da Coroa.',
  },
  {
    mark: 'As casas',
    title: 'Os Leões e Maleshov',
    text: 'Radovan busca preservar a sucessão. Maleshov desconfia de seus poderes.',
  },
  {
    mark: 'A dúvida',
    title: 'A sucessão contestada',
    text: 'Quem é o herdeiro legítimo? O bastardo tem direito ao trono? Até onde vai a autoridade do Protetor?',
  },
  {
    mark: 'O segredo',
    title: 'O que as cartas escondem',
    text: 'As cartas desaparecidas podem revelar um herdeiro, ou traições antigas.',
  },
  {
    mark: 'Agora',
    title: 'Uma nova guerra',
    text: 'Cada casa segue os próprios interesses, e o povo sofre com a incerteza. O resto da história é escrito por quem joga.',
  },
];

/** The story of the crown of Kuttenberg after King Sigismund's death, chapter by chapter. */
export const CHAPTERS: readonly Chapter[] = [
  {
    id: 'alianca',
    year: '1402',
    title: 'A aliança que mudou o destino da Boêmia',
    blocks: [
      {
        kind: 'lead',
        text: 'Boêmia, ano de 1402. O reino atravessa um período de instabilidade política, marcado pela disputa entre Venceslau IV e seu irmão Sigismundo de Luxemburgo. Enquanto a autoridade real se enfraquece, grandes senhores procuram ampliar sua influência, e antigas rivalidades transformam-se em alianças militares.',
      },
      {
        kind: 'text',
        text: 'Foi nesse cenário que quatro casas nobres decidiram unir suas forças a Sigismundo: **a Casa de Trosky, conhecida como a Casa dos Leões; a Casa de Schodal; a Casa Raborsch; e a Casa de Maleshov.**',
      },
      {
        kind: 'text',
        text: 'Sob a promessa de restaurar a autoridade, garantir a estabilidade das terras e estabelecer uma nova ordem política, essas casas marcharam ao lado de Sigismundo contra o antigo soberano de Kuttenberg e seus aliados.',
      },
      {
        kind: 'text',
        text: 'A campanha foi marcada por cercos, traições, juramentos quebrados e batalhas que alteraram o equilíbrio de poder na região. Cada casa entrou na guerra com seus próprios interesses: algumas buscavam terras e títulos; outras desejavam influência sobre as rotas comerciais e as riquezas de Kuttenberg.',
      },
      {
        kind: 'text',
        text: 'A vitória de Sigismundo, em 1403, culminou em sua ascensão ao trono de Kuttenberg, consolidando uma nova ordem sob seu comando. Entretanto, a aliança que o levara ao poder estava longe de ser sólida. Entre os nobres que o haviam apoiado, cresciam ambições particulares, ressentimentos e disputas por influência.',
      },
      {
        kind: 'text',
        text: 'O reino conquistado carregava, desde o início, as sementes de sua próxima guerra.',
      },
    ],
  },
  {
    id: 'morte-do-rei',
    year: '1403',
    title: 'A morte do rei e o fim da aliança',
    blocks: [
      {
        kind: 'text',
        text: 'Pouco tempo após conquistar a coroa, Sigismundo morreu em combate, durante uma campanha militar que também custou a vida ao Lorde de Schodal.',
      },
      {
        kind: 'text',
        text: 'A morte dos dois líderes lançou a região em uma crise sem precedentes. O novo reino perdeu seu soberano antes que sua autoridade pudesse ser plenamente consolidada, enquanto uma das casas mais importantes da aliança ficou sem seu senhor.',
      },
      {
        kind: 'text',
        text: 'Para agravar a situação, o filho legítimo mais velho de Sigismundo, reconhecido como seu principal herdeiro, também morreu durante a guerra. Restou à dinastia um herdeiro ainda jovem, cuja posição política era frágil e cuja capacidade de governar não inspirava confiança entre todos os nobres.',
      },
      {
        kind: 'text',
        text: 'Sigismundo, porém, já desconfiava de que a lealdade de seus aliados não era absoluta.',
      },
      {
        kind: 'text',
        text: 'Informações recebidas durante a campanha indicavam que a **Casa de Maleshov e alguns nobres menores conspiravam secretamente**, procurando aumentar seu poder e preparar-se para o momento em que o rei não pudesse mais impor sua vontade.',
      },
      {
        kind: 'text',
        text: 'Temendo que sua morte desencadeasse uma disputa pelo trono, Sigismundo tentou preparar instruções para os poucos senhores em quem ainda confiava. Entre eles estavam **Gunther von Silberhände, Lorde de Raborsch, e Radovan de Zelený, Senhor de Trosky e representante da Casa dos Leões**.',
      },
      {
        kind: 'text',
        text: 'Entretanto, a morte chegou antes que todas as cartas fossem escritas, seladas e entregues.',
      },
    ],
  },
  {
    id: 'carta',
    title: 'A carta que sobreviveu',
    blocks: [
      {
        kind: 'text',
        text: 'Entre as últimas ordens de Sigismundo havia um pedido de importância extraordinária: encontrar um filho bastardo que tivera muitos anos antes e cuja existência permanecia desconhecida para grande parte da nobreza.',
      },
      {
        kind: 'text',
        text: 'Segundo suas intenções, esse filho poderia ser reconhecido como herdeiro, caso sua identidade e legitimidade fossem estabelecidas. Sigismundo acreditava que sua descoberta poderia alterar o destino da coroa, mas não deixou instruções completas sobre como o reconhecimento deveria ocorrer.',
      },
      {
        kind: 'text',
        text: 'Partes de suas correspondências foram interceptadas, e outras jamais chegaram aos destinatários. Não se sabe quem as tomou, quais informações foram destruídas ou se alguém passou a utilizar o conteúdo das cartas em benefício próprio.',
      },
      { kind: 'text', text: 'Apenas uma comunicação oficial chegou às mãos de Radovan de Zelený.' },
      {
        kind: 'text',
        text: 'Nela, Sigismundo nomeava Radovan **Marquês e Protetor da Coroa**, concedendo-lhe autoridade para marchar sobre as terras de Kuttenberg, preservar a ordem e garantir que a sucessão fosse conduzida em favor de um herdeiro de Sigismundo.',
      },
      {
        kind: 'text',
        text: 'A carta, contudo, não esclarecia toda a questão do filho bastardo, tampouco estabelecia de maneira inequívoca como o jovem herdeiro legítimo deveria se relacionar com essa possível reivindicação.',
      },
      {
        kind: 'text',
        text: 'Radovan recebeu, assim, uma missão que ultrapassava a simples defesa de um território: deveria impedir que o reino conquistado pelo seu soberano se desintegrasse em disputas entre nobres.',
      },
      {
        kind: 'text',
        text: 'Mas a ordem real também lhe concedia poder suficiente para despertar o temor daqueles que desejavam controlar Kuttenberg.',
      },
    ],
  },
  {
    id: 'leoes-e-maleshov',
    title: 'A Casa dos Leões e a Casa de Maleshov',
    blocks: [
      { kind: 'text', text: 'A chegada das ordens de Sigismundo dividiu os antigos aliados.' },
      {
        kind: 'text',
        text: '**Radovan de Zelený**, apoiado pela autoridade que lhe fora concedida, considerava sua obrigação preservar a coroa, proteger a sucessão e impedir que os nobres se aproveitassem da morte do rei. Para ele, a estabilidade do território dependia do cumprimento dos juramentos e do reconhecimento de uma autoridade legítima.',
      },
      {
        kind: 'text',
        text: '**A Casa de Maleshov**, por sua vez, passou a questionar as intenções e os poderes de Radovan. Seus representantes temiam que o título de Marquês e Protetor da Coroa fosse utilizado para concentrar terras, rendas e autoridade nas mãos da Casa dos Leões.',
      },
      {
        kind: 'text',
        text: 'Os homens de Maleshov sustentavam que nenhum senhor deveria governar acima dos demais sem limites claros. Seus adversários, entretanto, viam nessa posição uma tentativa de encobrir as ambições que já existiam antes da morte de Sigismundo.',
      },
      {
        kind: 'text',
        text: 'Enquanto isso, Gunther von Silberhände, Lorde de Raborsch, permanecia entre os poucos nobres conhecidos por terem recebido a confiança do falecido rei. Sua posição poderia ser decisiva para apoiar Radovan, proteger os interesses da sucessão ou revelar informações sobre as últimas vontades de Sigismundo.',
      },
      {
        kind: 'text',
        text: 'A antiga aliança, formada para conquistar Kuttenberg, começava a ruir. Aqueles que haviam marchado sob o mesmo estandarte agora precisavam decidir se permaneceriam unidos ou se lutariam pelo controle do reino.',
      },
    ],
  },
  {
    id: 'sucessao',
    title: 'A sucessão contestada',
    blocks: [
      { kind: 'text', text: 'A morte de Sigismundo deixou três questões sem resposta:' },
      {
        kind: 'list',
        items: [
          '**O herdeiro legítimo:** o jovem filho sobrevivente deveria assumir a coroa imediatamente, apesar de sua idade e da instabilidade política?',
          '**O filho bastardo desaparecido:** poderia ele ser encontrado, reconhecido e aceito pela nobreza como sucessor?',
          '**A autoridade de Radovan:** até onde se estendiam os poderes de Marquês e Protetor da Coroa, e quem teria o direito de contestá-los?',
        ],
      },
      {
        kind: 'text',
        text: 'Nenhuma dessas questões poderia ser resolvida apenas pela força das armas sem provocar novas revoltas. Ainda assim, cada casa começou a reunir aliados, proteger suas propriedades e preparar seus homens.',
      },
      {
        kind: 'text',
        text: 'As rotas comerciais tornaram-se instrumentos de pressão. Pedágios foram contestados, caravanas passaram a viajar sob escolta, e os senhores locais começaram a escolher quais ordens obedeceriam. Mercadores, artesãos, camponeses e guildas viram-se presos entre juramentos nobres e a necessidade de sobreviver.',
      },
    ],
  },
  {
    id: 'segredo',
    title: 'O segredo que pode mudar o reino',
    blocks: [
      {
        kind: 'text',
        text: 'As cartas desaparecidas tornaram-se tão importantes quanto os exércitos.',
      },
      {
        kind: 'text',
        text: 'Alguns acreditam que o filho bastardo de Sigismundo jamais será encontrado. Outros suspeitam que alguém já conhece sua identidade e aguarda o momento certo para apresentá-lo. Há também quem afirme que as cartas interceptadas revelam muito mais do que uma simples ordem de sucessão.',
      },
      {
        kind: 'text',
        text: 'Se o herdeiro desaparecido for encontrado, poderá unir o reino ou desencadear uma guerra ainda maior. Se permanecer oculto, cada casa poderá defender sua própria interpretação das últimas vontades do rei.',
      },
      {
        kind: 'text',
        text: 'E se as cartas revelarem que alguns dos antigos aliados traíram Sigismundo antes mesmo de sua morte, os juramentos que sustentavam a nobreza poderão perder todo o valor.',
      },
    ],
  },
  {
    id: 'nova-guerra',
    title: 'O início de uma nova guerra',
    blocks: [
      {
        kind: 'text',
        text: 'Em 1403, Kuttenberg não enfrenta apenas uma disputa pelo trono. Enfrenta as consequências de uma conquista realizada por homens que nunca desejaram exatamente o mesmo futuro.',
      },
      {
        kind: 'text',
        text: 'A **Casa dos Leões**, sob Radovan de Zelený, busca cumprir as ordens recebidas e preservar a autoridade da coroa. A **Casa de Maleshov** procura impedir que essa autoridade se transforme em domínio absoluto sobre os demais senhores. A **Casa de Schodal**, ferida pela morte de seu lorde, precisa lidar com o vazio deixado por seu líder. A **Casa Raborsch** deve decidir se permanecerá fiel à antiga aliança ou se seguirá seus próprios interesses.',
      },
      {
        kind: 'text',
        text: 'Em Raborsch, Gunther von Silberhände guarda uma posição de importância singular: sua lealdade e seu conhecimento sobre os últimos dias de Sigismundo poderão influenciar o destino de todos.',
      },
      {
        kind: 'text',
        text: 'Enquanto os nobres disputam títulos, terras e legitimidade, o povo paga o preço da incerteza. Cada estrada pode tornar-se um campo de batalha, cada castelo pode abrigar um conspirador e cada juramento pode esconder uma traição.',
      },
      {
        kind: 'text',
        text: 'A guerra que uniu essas casas para conquistar Kuttenberg terminou com a morte de seu rei. A guerra que decidirá quem merece governá-la está apenas começando.',
      },
    ],
  },
];

/** The last words of the story, and the question it leaves the player with. */
export const LORE_ENDING = {
  text: '**A coroa ficou sem seu soberano. O herdeiro permanece envolto em mistério. E a lealdade dos nobres está prestes a ser posta à prova.**',
  question: 'E você, a quem jurará sua lealdade?',
} as const;
