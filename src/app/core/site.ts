import { InjectionToken } from '@angular/core';
import config from '../../site.config.json';

export interface SiteConfig {
  readonly name: string;
  readonly game: string;
  readonly title: string;
  readonly description: string;
  /** The public address without a trailing slash. Empty until the domain is known: canonical and social-card links wait for it. */
  readonly url: string;
  readonly discord: string;
  readonly locale: string;
}

/**
 * What the whole site agrees on. The values live in `src/site.config.json` so the build scripts can read the same
 * file: change the Discord invite or the public address there, never in a component.
 */
export const SITE: SiteConfig = {
  name: config.name,
  game: config.game,
  title: config.title,
  description: config.description,
  url: config.url.replace(/\/+$/, ''),
  discord: config.discord,
  locale: config.locale,
};

/** The site's configuration as the services read it: `SITE` unless a test (or another deployment) provides another. */
export const SITE_CONFIG = new InjectionToken<SiteConfig>('SITE_CONFIG', {
  providedIn: 'root',
  factory: () => SITE,
});

export interface NavItem {
  readonly label: string;
  /** An anchor on the home page. The matching section has this id. */
  readonly href: string;
}

export const NAV: readonly NavItem[] = [
  { label: 'Guildas', href: '#guildas' },
  { label: 'Família', href: '#familia' },
  { label: 'Facções', href: '#faccoes' },
  { label: 'Ascensão', href: '#ascensao' },
  { label: 'Lore', href: '#lore' },
  { label: 'Mundo', href: '#mundo' },
];

/**
 * The phrases people type when they look for a server like this one, the main one first and then its spellings (the
 * game is written "Deliverance II" and "Deliverance 2", and "KCD2" for short). They are written into the page's own
 * text too, because a search engine trusts the words a visitor can read before a list of keywords.
 */
export const KEYWORDS: readonly string[] = [
  'kingdom come deliverance ii rp brasil',
  'kingdom come deliverance 2 rp brasil',
  'kcd 2 rp brasil',
  'kcd2 rp brasil',
  'kingdom come deliverance ii rp',
  'kingdom come deliverance 2 rp',
  'servidor rp kingdom come deliverance 2',
  'servidor de roleplay kingdom come deliverance ii',
  'servidor rp kcd2 brasil',
  'servidor de rp medieval brasil',
  'roleplay medieval brasil',
  'kingdom come deliverance 2 multiplayer brasil',
  'kcd2 multiplayer',
  'whitelist kcd2 rp',
  'kingdom leon crow',
  'guildas e facções rp',
  'kuttenberg rp',
  'boêmia 1403 rp',
];

/** Other ways the server, and the game, are called. */
export const ALTERNATE_NAMES: readonly string[] = [
  'Kingdom Come Deliverance II RP Brasil',
  'Kingdom Come Deliverance 2 RP Brasil',
  'KCD 2 RP Brasil',
  'Kingdom Leon & Crow',
];
