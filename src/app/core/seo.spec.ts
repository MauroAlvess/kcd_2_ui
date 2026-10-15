import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Seo } from './seo';
import { ALTERNATE_NAMES, KEYWORDS, SITE, SITE_CONFIG, type SiteConfig } from './site';

const WITH_ADDRESS: SiteConfig = { ...SITE, url: 'https://kcd2rp.example' };
const NO_ADDRESS: SiteConfig = { ...SITE, url: '' };
const UNDER_A_PATH: SiteConfig = { ...SITE, url: 'https://mauroalvess.github.io/kcd_2_ui' };

function setup(config: SiteConfig = SITE) {
  TestBed.configureTestingModule({ providers: [{ provide: SITE_CONFIG, useValue: config }] });
  const seo = TestBed.inject(Seo);
  const doc = TestBed.inject(DOCUMENT);
  const content = (selector: string) =>
    doc.head.querySelector(selector)?.getAttribute('content') ?? null;
  const graph = () => JSON.parse(doc.getElementById('seo-json-ld')?.textContent ?? 'null');
  return { seo, doc, content, graph };
}

describe('Seo', () => {
  // The head of the test document is shared by every test in this file.
  beforeEach(() => {
    document.head
      .querySelectorAll(
        'meta[name], meta[property], link[rel="canonical"], link[rel="alternate"], #seo-json-ld',
      )
      .forEach((element) => element.remove());
    document.title = '';
  });

  it('writes the title and the description', () => {
    const { seo, doc, content } = setup();
    seo.apply();

    expect(doc.title).toBe(SITE.title);
    expect(content('meta[name="description"]')).toBe(SITE.description);
    expect(content('meta[property="og:title"]')).toBe(SITE.title);
    expect(content('meta[property="og:description"]')).toBe(SITE.description);
    expect(content('meta[name="twitter:card"]')).toBe('summary_large_image');
  });

  it('keeps the title and the description inside what a search result shows', () => {
    expect(SITE.title.length).toBeLessThanOrEqual(70);
    expect(SITE.description.length).toBeLessThanOrEqual(160);
  });

  it('names the game, the country and the server in the title', () => {
    expect(SITE.title).toContain('Kingdom Come: Deliverance 2');
    expect(SITE.title).toContain('RP Brasil');
    expect(SITE.title).toContain(SITE.name);
  });

  it('says the main phrase, the way most people search it, at the start of the title and of the description', () => {
    const main = 'kingdom come deliverance 2 rp brasil';
    expect(SITE.title.toLowerCase().replace(':', '').startsWith(main)).toBe(true);
    expect(SITE.description.toLowerCase().replace(':', '').startsWith(main)).toBe(true);
  });

  it('is called Kingdom RP BRASIL, with no trace of the old name in what a search engine reads', () => {
    expect(SITE.name).toBe('Kingdom RP BRASIL');
    expect(SITE.title).toContain('Kingdom RP BRASIL');
    expect(SITE.description).toContain('Kingdom RP BRASIL');
    const everything = JSON.stringify([{ ...SITE, discord: '' }, KEYWORDS, ALTERNATE_NAMES]);
    expect(everything.toLowerCase()).not.toMatch(/leon|crow/);
  });

  it('writes the keywords people search for, the main phrase first', () => {
    const { seo, content } = setup();
    seo.apply();

    const written = content('meta[name="keywords"]') ?? '';
    expect(written).toBe(KEYWORDS.join(', '));
    expect(KEYWORDS[0]).toBe('kingdom come deliverance 2 rp brasil');
    for (const phrase of [
      'kingdom come deliverance ii rp brasil',
      'kingdom rp brasil',
      'kcd 2 rp brasil',
      'kcd2 rp brasil',
      'whitelist',
    ]) {
      expect(written).toContain(phrase);
    }
    expect(new Set(KEYWORDS).size).toBe(KEYWORDS.length);
  });

  it('writes the rest of the head a search engine and a browser look for', () => {
    const { seo, doc, content } = setup(NO_ADDRESS);
    seo.apply();

    expect(content('meta[name="author"]')).toBe(SITE.name);
    expect(content('meta[name="application-name"]')).toBe(SITE.name);
    expect(content('meta[name="content-language"]')).toBe('pt-BR');
    expect(content('meta[name="referrer"]')).toBe('strict-origin-when-cross-origin');
    expect(content('meta[property="og:locale"]')).toBe('pt_BR');
    expect(doc.head.querySelector('link[rel="alternate"][hreflang]')).toBeNull();
  });

  it('writes the card text but no links while the public address is unknown', () => {
    const { seo, doc, content } = setup(NO_ADDRESS);
    seo.apply();

    expect(content('meta[property="og:title"]')).not.toBeNull();
    expect(content('meta[property="og:url"]')).toBeNull();
    expect(content('meta[property="og:image"]')).toBeNull();
    expect(content('meta[name="twitter:image"]')).toBeNull();
    expect(doc.head.querySelector('link[rel="canonical"]')).toBeNull();
  });

  it('writes absolute links for the cards and the canonical address once the address is known', () => {
    const { seo, doc, content } = setup(WITH_ADDRESS);
    seo.apply();

    expect(content('meta[property="og:url"]')).toBe('https://kcd2rp.example/');
    expect(content('meta[property="og:image"]')).toBe('https://kcd2rp.example/og-image.jpg');
    expect(content('meta[name="twitter:image"]')).toBe('https://kcd2rp.example/og-image.jpg');
    expect(content('meta[property="og:image:width"]')).toBe('1200');
    expect(content('meta[property="og:image:height"]')).toBe('630');
    expect(content('meta[property="og:image:type"]')).toBe('image/jpeg');
    expect(content('meta[name="twitter:image:alt"]')).toBe(
      content('meta[property="og:image:alt"]'),
    );
    expect(doc.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://kcd2rp.example/',
    );
    const alternates = Array.from(
      doc.head.querySelectorAll('link[rel="alternate"][hreflang]'),
      (link) => link.getAttribute('hreflang'),
    );
    expect(alternates).toEqual(['pt-BR', 'x-default']);
  });

  it("describes the page as a game server and its group, with the Discord as the group's other address", () => {
    const { seo, graph } = setup(NO_ADDRESS);
    seo.apply();

    const nodes = graph()['@graph'] as Array<Record<string, any>>;
    const server = nodes.find((node) => node['@type'] === 'GameServer');
    const group = nodes.find((node) => node['@type'] === 'Organization');

    expect(server?.['game']['@type']).toBe('VideoGame');
    expect(server?.['game']['name']).toBe(SITE.game);
    expect(server?.['inLanguage']).toBe('pt-BR');
    expect(group?.['name']).toBe(SITE.name);
    expect(group?.['sameAs']).toEqual([SITE.discord]);
    expect(nodes.some((node) => node['@type'] === 'WebSite')).toBe(false);
  });

  it('names the server and the game by their other spellings in the structured data', () => {
    const { seo, graph } = setup();
    seo.apply();

    const nodes = graph()['@graph'] as Array<Record<string, any>>;
    const server = nodes.find((node) => node['@type'] === 'GameServer');
    expect(server?.['alternateName']).toEqual([...ALTERNATE_NAMES]);
    expect(server?.['game']['alternateName']).toContain('KCD 2');
    expect(server?.['keywords']).toBe(KEYWORDS.join(', '));
    expect(server?.['areaServed']).toEqual({ '@type': 'Country', name: 'Brasil' });
  });

  it('adds the site and the page, with absolute addresses, once the address is known', () => {
    const { seo, graph } = setup(WITH_ADDRESS);
    seo.apply();

    const nodes = graph()['@graph'] as Array<Record<string, any>>;
    const site = nodes.find((node) => node['@type'] === 'WebSite');
    const page = nodes.find((node) => node['@type'] === 'WebPage');
    const group = nodes.find((node) => node['@type'] === 'Organization');

    expect(site?.['url']).toBe('https://kcd2rp.example/');
    expect(page?.['primaryImageOfPage']).toBe('https://kcd2rp.example/og-image.jpg');
    expect(page?.['keywords']).toBe(KEYWORDS.join(', '));
    expect(group?.['logo']).toBe('https://kcd2rp.example/apple-touch-icon.png');
    expect(site?.['publisher']).toEqual({ '@id': group?.['@id'] });

    const server = nodes.find((node) => node['@type'] === 'GameServer');
    expect(server?.['@id']).toBe('https://kcd2rp.example/#server');
    expect(server?.['provider']).toEqual({ '@id': group?.['@id'] });
    expect(page?.['about']).toEqual({ '@id': server?.['@id'] });
  });

  it('gives the server, the group and the site one name, so a search engine shows that name for the site', () => {
    const { seo, graph } = setup(WITH_ADDRESS);
    seo.apply();

    const nodes = graph()['@graph'] as Array<Record<string, any>>;
    for (const type of ['GameServer', 'Organization', 'WebSite']) {
      expect(nodes.find((node) => node['@type'] === type)?.['name'], type).toBe(SITE.name);
    }
    const site = nodes.find((node) => node['@type'] === 'WebSite');
    expect(site?.['alternateName']).toContain('Kingdom Come Deliverance 2 RP Brasil');
  });

  it('lets a search engine show the page, a snippet of any length and the large picture', () => {
    const { seo, content } = setup();
    seo.apply();

    const robots = content('meta[name="robots"]') ?? '';
    for (const directive of ['index', 'follow', 'max-snippet:-1', 'max-image-preview:large']) {
      expect(robots.split(', '), directive).toContain(directive);
    }
    expect(robots).not.toContain('noindex');
  });

  it('writes the search consoles verification codes once the owner has them', () => {
    const { seo, content } = setup({ ...SITE, verification: { google: 'abc123', bing: 'def456' } });
    seo.apply();

    expect(content('meta[name="google-site-verification"]')).toBe('abc123');
    expect(content('meta[name="msvalidate.01"]')).toBe('def456');
  });

  it('writes no verification tag while there is no code', () => {
    const { seo, content } = setup({ ...SITE, verification: { google: '', bing: '' } });
    seo.apply();

    expect(content('meta[name="google-site-verification"]')).toBeNull();
    expect(content('meta[name="msvalidate.01"]')).toBeNull();
  });

  it('keeps the path of an address under a path, the way GitHub Pages serves the site', () => {
    const { seo, doc, content, graph } = setup(UNDER_A_PATH);
    seo.apply();

    expect(content('meta[property="og:url"]')).toBe('https://mauroalvess.github.io/kcd_2_ui/');
    expect(content('meta[property="og:image"]')).toBe(
      'https://mauroalvess.github.io/kcd_2_ui/og-image.jpg',
    );
    expect(doc.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://mauroalvess.github.io/kcd_2_ui/',
    );
    const group = (graph()['@graph'] as Array<Record<string, any>>).find(
      (node) => node['@type'] === 'Organization',
    );
    expect(group?.['logo']).toBe('https://mauroalvess.github.io/kcd_2_ui/apple-touch-icon.png');
  });

  it('is published at an https address with no slash at the end', () => {
    expect(SITE.url).toMatch(/^https:\/\/[^\s]+[^/]$/);
  });

  it('works with a DOM that answers a selector matching nothing with undefined, as the server one does', () => {
    const { seo, doc } = setup(WITH_ADDRESS);
    const head = doc.head;
    const original = head.querySelector.bind(head);
    head.querySelector = ((selector: string) =>
      original(selector) ?? undefined) as typeof head.querySelector;
    try {
      expect(() => seo.apply()).not.toThrow();
      expect(original('link[rel="canonical"]')?.getAttribute('href')).toBe(
        'https://kcd2rp.example/',
      );
      expect(original('link[rel="alternate"][hreflang="x-default"]')).not.toBeNull();
    } finally {
      head.querySelector = original;
    }
  });

  it('writes the structured data and the canonical link once, however often it runs', () => {
    const { seo, doc } = setup(WITH_ADDRESS);
    seo.apply();
    seo.apply();

    expect(doc.head.querySelectorAll('#seo-json-ld')).toHaveLength(1);
    expect(doc.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(doc.head.querySelectorAll('link[rel="alternate"][hreflang]')).toHaveLength(2);
    expect(doc.head.querySelectorAll('meta[property="og:title"]')).toHaveLength(1);
  });

  it('keeps a "<" in the text from ever ending the structured data early', () => {
    const { seo, doc, graph } = setup({ ...SITE, description: 'ataque </script><b>x</b>' });
    seo.apply();

    expect(doc.getElementById('seo-json-ld')?.textContent).not.toContain('<');
    expect(graph()['@graph'][0].description).toBe('ataque </script><b>x</b>');
  });
});
