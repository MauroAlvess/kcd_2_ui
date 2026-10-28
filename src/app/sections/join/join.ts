import { Component } from '@angular/core';
import { JOIN_STEPS } from '../../content/join';
import { SITE } from '../../core/site';
import { Button } from '../../shared/ui/button/button';
import { Reveal } from '../../shared/ui/reveal/reveal';
import { Section } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';
import { ServerBadge } from '../../shared/ui/server-badge/server-badge';
import { Steps } from '../../shared/ui/steps/steps';

/**
 * The welcome and the way in: join the Discord and fill in the whitelist, on the picture the user made for it, "entre aqui" (2026-10-28): the
 * knight resting under the tree, the server's crest over him. The picture is the band's background (`backdrop`), whole and at the width of
 * the window like the opening's banner, and the words begin under the crest.
 */
@Component({
  selector: 'app-join',
  imports: [Button, Reveal, Section, SectionHeading, ServerBadge, Steps],
  templateUrl: './join.html',
  styleUrl: './join.css',
})
export class Join {
  protected readonly site = SITE;
  protected readonly steps = JOIN_STEPS;
}
