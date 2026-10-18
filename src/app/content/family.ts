export interface TreeNode {
  readonly label: string;
  /** The player's own place in the tree. */
  readonly you?: boolean;
}

export interface TreeRow {
  readonly id: string;
  readonly label: string;
  readonly nodes: readonly TreeNode[];
}

/** The generations of the family tree, top to bottom, as the server's own tree lays them out. */
export const TREE_ROWS: readonly TreeRow[] = [
  { id: 'avos', label: 'Avós', nodes: [{ label: 'Avô' }, { label: 'Avó' }] },
  {
    id: 'pais',
    label: 'Pais e tios',
    nodes: [{ label: 'Pai' }, { label: 'Mãe' }, { label: 'Tios' }],
  },
  {
    id: 'geracao',
    label: 'Sua geração',
    nodes: [
      { label: 'Irmãos' },
      { label: 'Você', you: true },
      { label: 'Esposa' },
      { label: 'Primos' },
    ],
  },
  {
    id: 'filhos',
    label: 'Filhos e sobrinhos',
    nodes: [{ label: 'Filhos' }, { label: 'Sobrinhos' }],
  },
  { id: 'netos', label: 'Netos', nodes: [{ label: 'Netos' }] },
];

export const FAMILY_POINTS: readonly string[] = [
  'Casas, terras e quartos de castelo para a sua linhagem',
  'Uma árvore por gerações: esposa, filhos e netos, até um bastardo ou um filho adotado',
  'Um sobrenome que o reino vai lembrar, ou temer',
];

/** What the tree says about children, under it. */
export const FAMILY_NOTE =
  'Um filho pode ser legítimo, adotado ou bastardo. Ao casar, o estado civil muda para casado.';
