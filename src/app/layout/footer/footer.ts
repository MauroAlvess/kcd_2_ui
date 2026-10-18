import { Component } from '@angular/core';
import { NAV, SITE } from '../../core/site';

/** The closing band: who we are, the section links and the Discord, and the small print. */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly nav = NAV;
  protected readonly site = SITE;
}
