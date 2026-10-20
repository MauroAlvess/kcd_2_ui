/** One thing a player can have: its picture (a file of public/img) and what the server does with it. */
export interface Holding {
  readonly id: string;
  readonly title: string;
  readonly text: string;
  readonly crest: string;
  /** The size of the picture's file, so the page keeps its place while it loads. */
  readonly crestWidth: number;
  readonly crestHeight: number;
  readonly crestAlt: string;
}

/** What a supporter is given: one line each, as the game server hands them over. */
export interface Gift {
  readonly id: string;
  readonly title: string;
  readonly text: string;
}

export const HOLDINGS_EYEBROW = 'Posses';
export const HOLDINGS_TITLE = 'Tenha ou receba';

/** 2026-10-20, the user: "além de títulos, honras e uma vida básica você pode adquirir: terras, casas, fazendas, castelos; cavalos, carroças e cachorros". */
export const HOLDINGS_LEAD =
  'Além de títulos, honras e uma vida simples, você pode adquirir o que é seu: terras, casas, fazendas e castelos; cavalos, carroças e cachorros.';

export const HOLDINGS: readonly Holding[] = [
  {
    id: 'terras',
    title: 'Terras, casas, fazendas e castelos',
    text: 'Casas, oficinas e fazendas com chave e baús seus, concedidas pela coroa. Até os castelos podem ter dono.',
    crest: 'prop-crest.webp',
    crestWidth: 360,
    crestHeight: 307,
    crestAlt: 'Brasão das propriedades: um castelo de torres vermelhas, com uma bandeira',
  },
  {
    id: 'cavalos',
    title: 'Cavalos',
    text: 'O seu cavalo espera onde você o deixou, mesmo depois que você sai do servidor. Dê um nome a ele e chame-o de longe.',
    crest: 'pet-cavalo.webp',
    crestWidth: 250,
    crestHeight: 303,
    crestAlt: 'Brasão do cavalo: um cavalo branco empinado num escudo vermelho, com coroa',
  },
  {
    id: 'carrocas',
    title: 'Carroças',
    text: 'Cargas e passageiros pelas estradas. Trancada, só o dono sobe e pega as rédeas; deixe-a livre e qualquer um conduz.',
    crest: 'pet-carroca.webp',
    crestWidth: 480,
    crestHeight: 278,
    crestAlt:
      'Brasão da carroça: uma carroça coberta com flores-de-lis, puxada por um cavalo branco',
  },
  {
    id: 'cachorros',
    title: 'Cachorros',
    text: 'Um companheiro fiel, com nome, que segue você pela estrada e espera quando você manda.',
    crest: 'pet-cachorro.webp',
    crestWidth: 250,
    crestHeight: 294,
    crestAlt: 'Brasão do cachorro: um cão empinado num escudo vermelho, com coroa',
  },
];

export const SUPPORT_EYEBROW = 'Apoio';

/** 2026-10-20, the user: "caso queira apoiar o sustento do servidor que é total free você pode apoiar e receber...". */
export const SUPPORT_TITLE = 'O servidor é totalmente free';
export const SUPPORT_LEAD = 'Quem quiser ajudar a manter o reino de pé pode apoiar, e recebe:';

export const GIFTS: readonly Gift[] = [
  { id: 'cavalo', title: 'Um cavalo', text: 'Em arreios de nobre, à sua espera.' },
  { id: 'cachorro', title: 'Um cachorro', text: 'Um cão fiel, que volta com você a cada entrada.' },
  { id: 'arma', title: 'Uma arma', text: 'Uma bombarda de mão, a píšťala, com dez balas.' },
  { id: 'roupas', title: 'Roupas de nobre', text: 'Um traje completo, das botas ao capuz.' },
];

/** Where to go to support: the game's own panel says how; the staff hand the rest over. No payment data lives on the site. */
export const SUPPORT_HOW =
  'Como apoiar está na seção Apoiador do painel do jogo. Depois, avise a administração no Discord: ela entrega tudo no jogo.';

export const SUPPORT_ART_ALT =
  'Um nobre de gibão vermelho e dourado, com a sua arma, ao lado do cavalo, do cachorro e de um canhão, sobre ramos bordados em vermelho e ouro';
