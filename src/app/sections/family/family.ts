import { Component } from '@angular/core';
import { FAMILY_NOTE, FAMILY_POINTS } from '../../content/family';
import { Section } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';
import { FamilyTree } from './family-tree/family-tree';

/** A family tree: what a player builds over time. */
@Component({
  selector: 'app-family',
  imports: [Section, SectionHeading, FamilyTree],
  templateUrl: './family.html',
  styleUrl: './family.css',
})
export class Family {
  protected readonly points = FAMILY_POINTS;
  protected readonly note = FAMILY_NOTE;
}
