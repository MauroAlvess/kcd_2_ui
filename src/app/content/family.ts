export interface TreeNode {
  readonly label: string;
  /** The player's own place in the tree. */
  readonly you?: boolean;
}

/** One branch of the tree: a person or a couple, and the branches that come down from them. */
export interface TreeBranch {
  readonly id: string;
  readonly people: readonly TreeNode[];
  readonly children?: readonly TreeBranch[];
}

/**
 * The family tree drawn as a tree (2026-10-20: "melhorar a seção família melhorando a árvore"): the grandparents at the top, the
 * parents (and the uncles, who are the parents' siblings) below them, then the player with their spouse and their siblings, their
 * children and nephews, and the grandchildren, each generation joined to the one before by a line.
 */
export const FAMILY_TREE: TreeBranch = {
  id: 'avos',
  people: [{ label: 'Avô' }, { label: 'Avó' }],
  children: [
    {
      id: 'pais',
      people: [{ label: 'Pai' }, { label: 'Mãe' }],
      children: [
        {
          id: 'irmaos',
          people: [{ label: 'Irmãos' }],
          children: [{ id: 'sobrinhos', people: [{ label: 'Sobrinhos' }] }],
        },
        {
          id: 'voce',
          people: [{ label: 'Você', you: true }, { label: 'Esposa' }],
          children: [
            {
              id: 'filhos',
              people: [{ label: 'Filhos' }],
              children: [{ id: 'netos', people: [{ label: 'Netos' }] }],
            },
          ],
        },
      ],
    },
    {
      id: 'tios',
      people: [{ label: 'Tios' }],
      children: [{ id: 'primos', people: [{ label: 'Primos' }] }],
    },
  ],
};

/** Every branch of the tree, top to bottom and left to right. */
export function branchesOf(branch: TreeBranch): TreeBranch[] {
  return [branch, ...(branch.children ?? []).flatMap((child) => branchesOf(child))];
}

export const FAMILY_POINTS: readonly string[] = [
  'Casas, terras e quartos de castelo para a sua linhagem',
  'Uma árvore por gerações: esposa, filhos e netos, até um bastardo ou um filho adotado',
  'Um sobrenome que o reino vai lembrar, ou temer',
];

/** What the tree says about children, under it. */
export const FAMILY_NOTE =
  'Um filho pode ser legítimo, adotado ou bastardo. Ao casar, o estado civil muda para casado.';
