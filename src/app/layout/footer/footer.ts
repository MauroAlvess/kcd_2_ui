import { Component } from '@angular/core';
import { NAV, SITE } from '../../core/site';
import { Button } from '../../shared/ui/button/button';

/** The closing band: who we are, the section links again, the Discord button and the small print. */
@Component({
  selector: 'app-footer',
  imports: [Button],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly nav = NAV;
  protected readonly site = SITE;
}
