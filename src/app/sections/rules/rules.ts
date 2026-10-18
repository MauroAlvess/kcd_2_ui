import { Component } from '@angular/core';
import {
  RULES,
  RULES_IN_CHARACTER,
  RULES_MOTTO,
  RULES_SETTING,
  RULES_STAFF,
  ZERO_TOLERANCE,
} from '../../content/rules';
import { Section } from '../../shared/ui/section/section';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';

/**
 * The laws of the realm, from the server's parchment of basic rules: why the setting is harsh and what it does not excuse,
 * the rule with the most weight set apart, the six terms every player hears (each marked as forbidden or required, with
 * a small drawing), and the motto.
 */
@Component({
  selector: 'app-rules',
  imports: [Section, SectionHeading],
  templateUrl: './rules.html',
  styleUrl: './rules.css',
})
export class Rules {
  protected readonly setting = RULES_SETTING;
  protected readonly inCharacter = RULES_IN_CHARACTER;
  protected readonly zero = ZERO_TOLERANCE;
  protected readonly rules = RULES;
  protected readonly staff = RULES_STAFF;
  protected readonly motto = RULES_MOTTO;
}
