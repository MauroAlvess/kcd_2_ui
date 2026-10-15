/** What a player can own besides a family: a house and its chests, a horse, a dog. As the game server does it. */
export interface Holding {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  /** A picture in public/img, 300 pixels wide and this tall. */
  readonly crest: string;
  readonly crestHeight: number;
  readonly crestAlt: string;
  readonly points: readonly string[];
}

export const HOLDINGS_TITLE = 'Casas, cavalos e cães';

export const HOLDINGS_INTRO =
  'Além da família, o que é seu fica com você: a casa e os baús, o cavalo que você comprou e o cão que te segue.';

export const HOLDINGS: readonly Holding[] = [
  {
    id: 'casas',
    title: 'Casas e baús',
    subtitle: 'O que é seu fica trancado',
    crest: 'prop-crest.webp',
    crestHeight: 256,
    crestAlt: 'Brasão das propriedades: um castelo de torres vermelhas com uma bandeira',
    points: [
      'Casas, oficinas e baús com chave própria, concedidos pela coroa',
      'Tranque e destranque pelo painel, ou na própria porta',
      'Um ladrão pode tentar arrombar, com gazua ou à força, e o dono fica sabendo',
      'Até os castelos de Suchdol e Raborsch podem ter dono',
    ],
  },
  {
    id: 'cavalos',
    title: 'Cavalos',
    subtitle: 'Compre o seu e cuide dele',
    crest: 'pet-cavalo.webp',
    crestHeight: 363,
    crestAlt: 'Brasão do cavalo: um cavalo branco empinado num escudo vermelho, com coroa',
    points: [
      'O seu cavalo espera onde você o deixou, mesmo depois que você sai do servidor',
      'Chame-o de longe e dê um nome a ele',
      'No painel, veja a vida, o fôlego, os arreios e onde ele está',
      'Se ele morrer, você o perde: é preciso comprar outro',
    ],
  },
  {
    id: 'caes',
    title: 'Cães',
    subtitle: 'Um companheiro fiel',
    crest: 'pet-cachorro.webp',
    crestHeight: 363,
    crestAlt: 'Brasão do cão: um cão empinado num escudo vermelho, com coroa',
    points: [
      'Quem apoia o servidor ganha um cão, que volta com você a cada entrada',
      'Dê um nome a ele e mande seguir ou esperar',
      'No painel, veja o ânimo dele e o que está fazendo',
    ],
  },
];
