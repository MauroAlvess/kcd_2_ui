import { Component, inject } from '@angular/core';
import { SITE_CONFIG } from '../../core/site';
import { srcsetOf } from '../../content/pitch';
import {
  SOCIAL_DISCORD,
  SOCIAL_EYEBROW,
  SOCIAL_LEAD,
  SOCIAL_PAGES,
  SOCIAL_TITLE,
  SOCIAL_TITLE_EM,
  type SocialPage,
} from '../../content/social';
import { Button } from '../../shared/ui/button/button';

/**
 * The server on the social networks (2026-11-03): the TikTok, the Instagram and the YouTube as cards, each the owner's print of the page in the frame of the page's other pictures (two corners
 * round, two square, the gold hairline), and the whole card a link; the prints are a little dimmed until the pointer comes to them, because two of the three pages are white and the site is
 * dark. Under them the Discord, on the parchment of the opening and of the guilds' register: it has no print, and it is the door of the server.
 */
@Component({
  selector: 'app-social',
  imports: [Button],
  templateUrl: './social.html',
  styleUrl: './social.css',
})
export class Social {
  protected readonly site = inject(SITE_CONFIG);
  protected readonly eyebrow = SOCIAL_EYEBROW;
  protected readonly title = SOCIAL_TITLE;
  protected readonly titleEm = SOCIAL_TITLE_EM;
  protected readonly lead = SOCIAL_LEAD;
  protected readonly pages = SOCIAL_PAGES;
  protected readonly discord = SOCIAL_DISCORD;

  /** The two sizes of a print, each with its width, for the browser to choose from. */
  protected readonly srcset = (page: SocialPage): string => srcsetOf(page.small, page.large);
}
