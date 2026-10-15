import type { Step } from '../shared/ui/steps/steps';

export interface Title {
  /** As a man is called. */
  readonly name: string;
  /** As a woman is, when the language has another word. */
  readonly female?: string;
  /** What Bohemia of the time called it, when that helps. */
  readonly native?: string;
  readonly text: string;
}

export interface Tier {
  readonly id: string;
  readonly name: string;
  readonly note: string;
  readonly titles: readonly Title[];
}

/**
 * Every title a player can hold, from the Rei down, in the order the in-game panel lists them (the same catalog as the
 * server's `nobility.ts`). The commoners are the last tier: they are everybody who holds none.
 */
export const TIERS: readonly Tier[] = [
  {
    id: 'coroa',
    name: 'Coroa da Boêmia',
    note: 'O Rei e a autoridade régia.',
    titles: [
      {
        name: 'Rei',
        female: 'Rainha',
        native: 'král',
        text: 'Soberano do reino: concede privilégios, confirma direitos e arbitra conflitos entre os grandes senhores. Só há um, e só a Coroa o nomeia.',
      },
    ],
  },
  {
    id: 'grandes',
    name: 'Grandes senhores e alta nobreza',
    note: 'Príncipes, marqueses e lordes.',
    titles: [
      {
        name: 'Príncipe',
        female: 'Princesa',
        text: 'Grande senhor territorial: governa um território de alto status.',
      },
      {
        name: 'Marquês',
        female: 'Marquesa',
        native: 'markrabě, margrave',
        text: 'Senhor de uma marca, um território de fronteira; o título é ligado sobretudo à Morávia, nas terras da Coroa da Boêmia.',
      },
      {
        name: 'Lorde',
        female: 'Lady',
        native: 'pán',
        text: 'Alta nobreza: controla domínios, castelos, rendas e homens armados. Na Boêmia do século XV, pán era a designação da alta nobreza.',
      },
    ],
  },
  {
    id: 'inferior',
    name: 'Nobreza inferior e oficiais',
    note: 'Cavaleiros, pequenos nobres e os oficiais de um senhorio.',
    titles: [
      {
        name: 'Cavaleiro',
        female: 'Cavaleira',
        native: 'rytíř',
        text: 'Nobreza inferior ou posição militar honorífica: guerreiro reconhecido pelo serviço, que pode ter terras, comandar homens ou servir a um senhor. Nem todo cavaleiro é rico.',
      },
      {
        name: 'Escudeiro',
        female: 'Escudeira',
        text: 'Pequena nobreza: pode possuir uma propriedade modesta, servir militarmente e buscar o reconhecimento de uma casa maior.',
      },
      {
        name: 'Pequeno nobre',
        native: 'zeman, vladyka',
        text: 'Pequena nobreza rural: terra modesta e serviço militar a um senhor.',
      },
      {
        name: 'Burgrave',
        native: 'purkrabí',
        text: 'Administra um castelo, uma fortaleza ou um domínio em nome de uma autoridade superior.',
      },
      {
        name: 'Hetman',
        native: 'hejtman',
        text: 'Comanda forças militares ou exerce funções de administração territorial, conforme o contexto.',
      },
      {
        name: 'Capitão da guarda',
        female: 'Capitã da guarda',
        text: 'Comanda os guardas de um castelo ou de uma residência nobre.',
      },
      {
        name: 'Chanceler',
        text: 'Cuida de documentos oficiais, cartas, selos e registros.',
      },
      {
        name: 'Juiz senhorial',
        female: 'Juíza senhorial',
        text: 'Julga disputas e infrações dentro da jurisdição do senhor.',
      },
      {
        name: 'Mordomo',
        female: 'Mordoma',
        text: 'Organiza a casa nobre, os criados, os suprimentos e as despesas.',
      },
      {
        name: 'Tesoureiro',
        female: 'Tesoureira',
        text: 'Controla tributos, aluguéis, dívidas e pagamentos; é o coletor de rendas.',
      },
      {
        name: 'Bailio',
        female: 'Bailia',
        text: 'Oficial de justiça: executa ordens, fiscaliza obrigações e auxilia na administração da justiça.',
      },
      {
        name: 'Meirinho',
        female: 'Meirinha',
        text: 'Administrador senhorial: supervisiona terras, trabalhadores, rendas e deveres dos habitantes.',
      },
      {
        name: 'Arauto',
        female: 'Arauta',
        text: 'Anuncia decretos, transmite mensagens e participa de cerimônias.',
      },
    ],
  },
  {
    id: 'igreja',
    name: 'Igreja',
    note: 'Com uma escada própria: um bispo nomeia padres e monges; um lorde não.',
    titles: [
      {
        name: 'Arcebispo',
        female: 'Arcebispa',
        text: 'Autoridade eclesiástica de alto nível, responsável por uma província religiosa. Praga era uma arquidiocese.',
      },
      {
        name: 'Bispo',
        female: 'Bispa',
        text: 'Governa uma diocese e supervisiona o clero sob a sua jurisdição.',
      },
      {
        name: 'Abade',
        female: 'Abadessa',
        text: 'Lidera um mosteiro ou uma comunidade religiosa e pode administrar propriedades e rendas significativas.',
      },
      {
        name: 'Prior',
        female: 'Priora',
        text: 'Lidera um priorado ou ajuda o abade; pode administrar propriedades e rendas.',
      },
      {
        name: 'Padre',
        text: 'Pároco: celebra missas, administra sacramentos, aconselha os habitantes e participa da vida comunitária.',
      },
      {
        name: 'Monge',
        female: 'Monja',
        text: 'Vive e serve em um mosteiro. Um monge não é necessariamente sacerdote.',
      },
      {
        name: 'Frade',
        female: 'Freira',
        text: 'Religioso de uma ordem que serve entre o povo. Não tem a autoridade de um padre.',
      },
      {
        name: 'Diácono',
        female: 'Diaconisa',
        text: 'Auxilia o padre nas funções religiosas, sem a autoridade dele.',
      },
      {
        name: 'Acólito',
        female: 'Acólita',
        text: 'Serve ao altar e auxilia o clero nas cerimônias.',
      },
    ],
  },
  {
    id: 'cidades',
    name: 'Cidades e guildas',
    note: 'Burgomestres, conselheiros e mestres de guilda.',
    titles: [
      {
        name: 'Burgomestre',
        text: 'Prefeito: administra a cidade, coordena decisões municipais e representa seus interesses perante a nobreza.',
      },
      {
        name: 'Conselheiro municipal',
        female: 'Conselheira municipal',
        text: 'Participa das decisões sobre impostos, mercados, manutenção urbana e leis locais.',
      },
      {
        name: 'Alcaide da aldeia',
        text: 'Representante da aldeia: recolhe informações, comunica ordens, organiza as obrigações da comunidade e serve de intermediário com o senhor local.',
      },
      {
        name: 'Mestre de guilda',
        female: 'Mestra de guilda',
        text: 'Lidera uma corporação profissional, fiscaliza a qualidade dos produtos e negocia privilégios para seus membros.',
      },
      {
        name: 'Chefe de mercado',
        text: 'Cuida da ordem, dos lugares e das medidas na praça do mercado.',
      },
      {
        name: 'Coletor de pedágios',
        female: 'Coletora de pedágios',
        text: 'Cobra a passagem em pontes, portões e estradas.',
      },
      {
        name: 'Guarda dos portões',
        text: 'Vigia as entradas da cidade e controla quem passa.',
      },
      {
        name: 'Capitão da milícia urbana',
        female: 'Capitã da milícia urbana',
        text: 'Comanda os cidadãos armados que defendem a cidade.',
      },
      {
        name: 'Escrivão',
        female: 'Escrivã',
        text: 'Escreve e guarda os registros, as cartas e as contas.',
      },
      {
        name: 'Mestre de ofício',
        female: 'Mestra de ofício',
        text: 'Mestre reconhecido de um ofício, que ensina aprendizes e responde pela qualidade do trabalho.',
      },
      {
        name: 'Administrador de hospedaria',
        female: 'Administradora de hospedaria',
        text: 'Tem a seu cargo uma hospedaria: os quartos, a cozinha e os criados.',
      },
    ],
  },
  {
    id: 'povo',
    name: 'População comum',
    note: 'Todo o resto do reino.',
    titles: [
      {
        name: 'Plebeu',
        female: 'Plebeia',
        text: 'Camponeses, artesãos, caçadores, mercadores e todos os que vivem de um ofício. É daqui que se sobe: um título de nobreza ou um cargo muda o lugar de qualquer um.',
      },
    ],
  },
];

/** How a title is given, and what it shows of a player: the rules of the in-game panel's Nomeação section. */
export const RULES: readonly Step[] = [
  {
    numeral: 'I',
    title: 'Quem nomeia',
    text: 'Só um nobre nomeia, e só quem recebeu um título que dá esse direito: um lorde nomeia cavaleiros e oficiais, um bispo nomeia padres e monges. Os primeiros títulos vêm da Coroa, a administração do servidor.',
  },
  {
    numeral: 'II',
    title: 'Sempre para baixo',
    text: 'Ninguém dá um título igual ou acima do seu. O Rei é um só e só a Coroa o nomeia; um cavaleiro nomeia escudeiros; quem não tem posto abaixo do seu para dar, não nomeia.',
  },
  {
    numeral: 'III',
    title: 'Nobres e plebeus',
    text: 'Um nobre pode nomear um plebeu. Só se nomeia quem já se apresentou: no painel, na categoria Nobre, a seção Nomeação lista essas pessoas.',
  },
  {
    numeral: 'IV',
    title: 'Título e cargo',
    text: 'Um título de nobreza (rei, príncipe, marquês, lorde, cavaleiro, escudeiro, pequeno nobre) ou do alto clero (arcebispo, bispo, abade, prior) faz do nomeado um nobre, e o cônjuge e os descendentes legítimos sobem junto. Um cargo (burgrave, burgomestre, padre) não muda a condição social.',
  },
  {
    numeral: 'V',
    title: 'Sobre a cabeça',
    text: 'Plebeu ou nobre nunca aparece sobre a cabeça. O título só aparece se o jogador quiser: em Opções ele escolhe mostrar lorde, cavaleiro ou outro dos seus títulos, em dourado, no lugar do nome.',
  },
  {
    numeral: 'VI',
    title: 'A hierarquia à vista',
    text: 'O botão Ver hierarquia mostra o reino como esta árvore: cada título, quem o ocupa, e a guilda, a casa e as terras de cada um. Nada que diga onde a pessoa está ou como está: o reino sabe o nome e o título, não a vida do jogador.',
  },
  {
    numeral: 'VII',
    title: 'Terras',
    text: 'A Coroa pode ceder uma região inteira a um jogador: ele recebe as propriedades dela e decide sozinho o que fazer. As casas de NPC aparecem na lista dele, mas continuam dos moradores.',
  },
];
