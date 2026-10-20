import { Component } from '@angular/core';
import { JOIN_STEPS } from '../../content/join';
import { SITE } from '../../core/site';
import { Button } from '../../shared/ui/button/button';
import { Section } from '../../shared/ui/section/section';
import type { SectionImage } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';
import { ServerBadge } from '../../shared/ui/server-badge/server-badge';
import { Steps } from '../../shared/ui/steps/steps';

/**
 * The welcome and the way in: join the Discord and fill in the whitelist, over the painting of the knight resting under the
 * tree (2026-10-20: "na parte do passo uma imagem de fundo é legal").
 */
@Component({
  selector: 'app-join',
  imports: [Button, Section, SectionHeading, ServerBadge, Steps],
  templateUrl: './join.html',
  styleUrl: './join.css',
})
export class Join {
  protected readonly site = SITE;
  protected readonly steps = JOIN_STEPS;
  protected readonly painting: SectionImage = {
    src: 'img/painting-2560.webp',
    srcset: 'img/painting-1280.webp 1280w, img/painting-2560.webp 2560w',
    position: '58% 100%',
  };
}
