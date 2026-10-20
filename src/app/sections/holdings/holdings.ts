import { Component } from '@angular/core';
import {
  GIFTS,
  HOLDINGS,
  HOLDINGS_EYEBROW,
  HOLDINGS_LEAD,
  HOLDINGS_TITLE,
  SUPPORT_ART_ALT,
  SUPPORT_EYEBROW,
  SUPPORT_HOW,
  SUPPORT_LEAD,
  SUPPORT_TITLE,
} from '../../content/holdings';
import { SITE } from '../../core/site';
import { Button } from '../../shared/ui/button/button';
import { Section } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';

/**
 * What a player can have and what a supporter is given (2026-10-20: "tenha ou receba"), told in two bands that alternate with
 * the ones around them: on black, the lands and castles, the horses, the carts and the dogs a player can acquire, one row each
 * with its crest; on paper, the server being entirely free, and what whoever helps to keep it up receives (a horse, a dog, a
 * weapon and a noble's clothes). Only the first band is in the menu: the second is the other half of the same chapter.
 */
@Component({
  selector: 'app-holdings',
  imports: [Button, Section, SectionHeading],
  templateUrl: './holdings.html',
  styleUrl: './holdings.css',
})
export class Holdings {
  protected readonly site = SITE;
  protected readonly eyebrow = HOLDINGS_EYEBROW;
  protected readonly title = HOLDINGS_TITLE;
  protected readonly lead = HOLDINGS_LEAD;
  protected readonly holdings = HOLDINGS;
  protected readonly supportEyebrow = SUPPORT_EYEBROW;
  protected readonly supportTitle = SUPPORT_TITLE;
  protected readonly supportLead = SUPPORT_LEAD;
  protected readonly gifts = GIFTS;
  protected readonly how = SUPPORT_HOW;
  protected readonly artAlt = SUPPORT_ART_ALT;
}
