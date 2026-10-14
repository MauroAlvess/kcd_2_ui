import { Component } from '@angular/core';
import { NOBILITY_RULE, RANKS } from '../../content/ascension';
import { Section, type SectionImage } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';
import { Steps } from '../../shared/ui/steps/steps';

/** The road up from plebeian to knight to noble, over the photograph of a forge: everybody starts at the bottom. */
@Component({
  selector: 'app-ascension',
  imports: [Section, SectionHeading, Steps],
  templateUrl: './ascension.html',
  styleUrl: './ascension.css',
})
export class Ascension {
  protected readonly ranks = RANKS;
  protected readonly rule = NOBILITY_RULE;
  protected readonly photo: SectionImage = {
    src: 'img/scene-forja-1920.webp',
    srcset: 'img/scene-forja-960.webp 960w, img/scene-forja-1920.webp 1920w',
  };
}
