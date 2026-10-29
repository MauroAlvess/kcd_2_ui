import { Component } from '@angular/core';
import { SITE } from '../../core/site';

/** The closing band (2026-10-29, the new identity): the crest and the name on the left, the fan-made notice in the middle and the three places to find us on the right. */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly site = SITE;
}
