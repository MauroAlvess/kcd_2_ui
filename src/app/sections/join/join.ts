import { Component } from '@angular/core';
import { JOIN_STEPS } from '../../content/join';
import { SITE } from '../../core/site';
import { Button } from '../../shared/ui/button/button';
import { Section } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';
import { Steps } from '../../shared/ui/steps/steps';

/** The welcome and the way in: join the Discord and fill in the whitelist. The lion and the raven hold the corners of the card. */
@Component({
  selector: 'app-join',
  imports: [Button, Section, SectionHeading, Steps],
  templateUrl: './join.html',
  styleUrl: './join.css',
})
export class Join {
  protected readonly site = SITE;
  protected readonly steps = JOIN_STEPS;
}
