import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FAMILY_TREE } from '../../../content/family';

/**
 * A family tree drawn in plain HTML and CSS, with its branches (nested lists whose lines are the borders of the items). It is
 * an example, not data: the player is in the middle with a spouse, their siblings beside them and their children below, and
 * the uncles and cousins on the other branch.
 */
@Component({
  selector: 'app-family-tree',
  imports: [NgTemplateOutlet],
  templateUrl: './family-tree.html',
  styleUrl: './family-tree.css',
})
export class FamilyTree {
  protected readonly tree = FAMILY_TREE;
}
