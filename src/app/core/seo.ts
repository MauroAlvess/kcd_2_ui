import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ALTERNATE_NAMES, KEYWORDS, SITE_CONFIG } from './site';

/** The picture chat apps and search results show for a link to the site (public/og-image.jpg). */
const SOCIAL_IMAGE = {
  path: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'O emblema dourado do RP Brasil sobre fundo preto, com o texto Kingdom Come: Deliverance II, RP Brasil',
} as const;

const JSON_LD_ID = 'seo-json-ld';

/**
 * Writes the page's title, description, social cards, canonical link and structured data into the document head.
 * It runs while the site is prerendered, so the HTML that is published already has all of it and a crawler needs no
 * JavaScript; in the browser it only repeats the same values.
 */
@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly site = inject(SITE_CONFIG);

  apply(): void {
    this.titleService.setTitle(this.site.title);

    this.meta.updateTag({ name: 'description', content: this.site.description });
    this.meta.updateTag({ name: 'keywords', content: KEYWORDS.join(', ') });
    this.meta.updateTag({ name: 'robots', content: 'index, follow, max-image-preview:large' });
    this.meta.updateTag({ name: 'author', content: this.site.name });
    this.meta.updateTag({ name: 'application-name', content: this.site.name });
    this.meta.updateTag({ name: 'apple-mobile-web-app-title', content: this.site.name });
    this.meta.updateTag({ name: 'referrer', content: 'strict-origin-when-cross-origin' });
    this.meta.updateTag({ name: 'format-detection', content: 'telephone=no' });
    this.meta.updateTag({ name: 'content-language', content: this.site.locale });

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: this.site.name });
    this.meta.updateTag({ property: 'og:locale', content: this.site.locale.replace('-', '_') });
    this.meta.updateTag({ property: 'og:title', content: this.site.title });
    this.meta.updateTag({ property: 'og:description', content: this.site.description });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: this.site.title });
    this.meta.updateTag({ name: 'twitter:description', content: this.site.description });

    // Links in a card must be absolute to work, so they wait for the public address.
    if (this.site.url) {
      const image = `${this.site.url}${SOCIAL_IMAGE.path}`;
      this.meta.updateTag({ property: 'og:url', content: `${this.site.url}/` });
      this.meta.updateTag({ property: 'og:image', content: image });
      this.meta.updateTag({ property: 'og:image:width', content: String(SOCIAL_IMAGE.width) });
      this.meta.updateTag({ property: 'og:image:height', content: String(SOCIAL_IMAGE.height) });
      this.meta.updateTag({ property: 'og:image:alt', content: SOCIAL_IMAGE.alt });
      this.meta.updateTag({ name: 'twitter:image', content: image });
      this.canonical(`${this.site.url}/`);
      this.alternates(`${this.site.url}/`);
    }

    this.jsonLd();
  }

  /** The structured data that tells a search engine what the page is: a game server, the group behind it and the site. */
  graph(): object {
    const url = this.site.url;
    const organization = `${url}/#organization`;

    const keywords = KEYWORDS.join(', ');

    const nodes: object[] = [
      {
        '@type': 'GameServer',
        name: `${this.site.game} — RP Brasil`,
        alternateName: ALTERNATE_NAMES,
        description: this.site.description,
        keywords,
        inLanguage: this.site.locale,
        areaServed: { '@type': 'Country', name: 'Brasil' },
        game: {
          '@type': 'VideoGame',
          name: this.site.game,
          alternateName: ['Kingdom Come Deliverance 2', 'KCD 2', 'KCD2'],
        },
        ...(url && { url: `${url}/` }),
      },
      {
        '@type': 'Organization',
        ...(url && { '@id': organization, url: `${url}/`, logo: `${url}/apple-touch-icon.png` }),
        name: this.site.name,
        alternateName: ALTERNATE_NAMES,
        sameAs: [this.site.discord],
      },
    ];

    if (url) {
      nodes.push(
        {
          '@type': 'WebSite',
          url: `${url}/`,
          name: this.site.name,
          alternateName: ALTERNATE_NAMES,
          inLanguage: this.site.locale,
          publisher: { '@id': organization },
        },
        {
          '@type': 'WebPage',
          url: `${url}/`,
          name: this.site.title,
          description: this.site.description,
          keywords,
          inLanguage: this.site.locale,
          primaryImageOfPage: `${url}${SOCIAL_IMAGE.path}`,
          isPartOf: { '@type': 'WebSite', url: `${url}/` },
        },
      );
    }

    return { '@context': 'https://schema.org', '@graph': nodes };
  }

  private canonical(href: string): void {
    // The server's DOM answers a selector that matches nothing with undefined rather than null.
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  /** Tells a search engine this is the page for Brazilian Portuguese, and the one to use when no language fits. */
  private alternates(href: string): void {
    for (const hreflang of [this.site.locale, 'x-default']) {
      let link = this.document.head.querySelector<HTMLLinkElement>(
        `link[rel="alternate"][hreflang="${hreflang}"]`,
      );
      if (!link) {
        link = this.document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', hreflang);
        this.document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    }
  }

  private jsonLd(): void {
    let script = this.document.getElementById(JSON_LD_ID);
    if (!script) {
      script = this.document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('id', JSON_LD_ID);
      this.document.head.appendChild(script);
    }
    // A "<" can never end the script early, whatever the text becomes later.
    script.textContent = JSON.stringify(this.graph()).replace(/</g, '\\u003c');
  }
}
