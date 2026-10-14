import { Component } from '@angular/core';
import { TREE_ROWS } from '../../../content/family';

/**
 * A small family tree drawn in plain HTML and CSS, one row per generation, the way the server's own tree lays it out. It is
 * an example, not data: the player's row is in the middle, with a spouse, siblings and cousins around them.
 */
@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.html',
  styleUrl: './family-tree.css',
})
export class FamilyTree {
  protected readonly rows = TREE_ROWS;
}
