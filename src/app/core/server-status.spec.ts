import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { GONE_AFTER_MS, LiveStatus, OFFLINE, UNKNOWN, readStatus } from './server-status';
import { SITE, SITE_CONFIG, type SiteConfig } from './site';

const ID = '30e25247-2500-4449-a7cd-4d563e05b0cc';
const NOW = Date.parse('2026-10-15T16:00:00.000Z');

/** One server of the master list, with what it really sends. */
const entry = (extra: Record<string, unknown> = {}) => ({
  id: ID,
  name: 'Kingdom - RP BRASIL',
  current_players: 3,
  max_players: 512,
  last_ping: '2026-10-15T15:59:55.000Z',
  ...extra,
});

const other = {
  id: 'another-server',
  name: 'Kingdom - RP BRASIL',
  current_players: 40,
  max_players: 64,
};

describe('readStatus', () => {
  it('reads the players and the places of the server, found by its id among the others', () => {
    expect(readStatus([other, entry()], ID, NOW)).toEqual({
      state: 'online',
      players: 3,
      max: 512,
    });
    expect(readStatus([entry({ current_players: 0 })], ID, NOW)).toEqual({
      state: 'online',
      players: 0,
      max: 512,
    });
  });

  it('finds the server by its id alone, whatever another entry is called', () => {
    expect(readStatus([other], ID, NOW)).toEqual(OFFLINE);
    expect(readStatus([{ ...entry(), id: 'someone-else' }], ID, NOW)).toEqual(OFFLINE);
  });

  it('says nothing for an answer that is not a list', () => {
    for (const answer of [null, undefined, {}, 'oops', 7, { servers: [entry()] }]) {
      expect(readStatus(answer, ID, NOW)).toEqual(UNKNOWN);
    }
  });

  it('says the server is gone when the list does not have it, or has not heard from it for two minutes', () => {
    expect(readStatus([], ID, NOW)).toEqual(OFFLINE);

    const ago = (ms: number) => new Date(NOW - ms).toISOString();
    expect(readStatus([entry({ last_ping: ago(GONE_AFTER_MS - 1000) })], ID, NOW).state).toBe(
      'online',
    );
    expect(readStatus([entry({ last_ping: ago(GONE_AFTER_MS + 1000) })], ID, NOW)).toEqual(OFFLINE);
    expect(readStatus([entry({ last_ping: 'not a date' })], ID, NOW)).toEqual(OFFLINE);
    expect(readStatus([entry({ last_ping: undefined })], ID, NOW)).toEqual(OFFLINE);
  });

  it('says nothing when the numbers are not numbers, and never shows more players than places', () => {
    for (const bad of [{ current_players: '3' }, { current_players: -1 }, { max_players: null }]) {
      expect(readStatus([entry(bad)], ID, NOW)).toEqual(UNKNOWN);
    }
    expect(readStatus([entry({ current_players: 9, max_players: 4 })], ID, NOW)).toEqual({
      state: 'online',
      players: 9,
      max: 9,
    });
  });
});

describe('LiveStatus', () => {
  afterEach(() => vi.unstubAllGlobals());

  function setup(config: SiteConfig = SITE) {
    TestBed.configureTestingModule({ providers: [{ provide: SITE_CONFIG, useValue: config }] });
    return TestBed.inject(LiveStatus);
  }
  const answering = (body: unknown) =>
    vi.fn(async (_url: string, _init?: unknown) => ({
      ok: true,
      status: 200,
      json: async () => body,
    }));

  it('asks the master list and keeps what it says of the server', async () => {
    const ask = answering([entry({ last_ping: new Date().toISOString() })]);
    vi.stubGlobal('fetch', ask);
    const live = setup();

    expect(live.status().state).toBe('unknown');
    await live.refresh();

    expect(ask).toHaveBeenCalledTimes(1);
    expect(ask.mock.calls[0][0]).toBe(SITE.listing.url);
    expect(live.status()).toEqual({ state: 'online', players: 3, max: 512 });
  });

  it('says nothing when the list does not answer, and nothing wrong when it answers badly', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => Promise.reject(new Error('offline'))),
    );
    const down = setup();
    await down.refresh();
    expect(down.status()).toEqual(UNKNOWN);

    TestBed.resetTestingModule();
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: false, status: 503, json: async () => [] })),
    );
    const broken = setup();
    await broken.refresh();
    expect(broken.status()).toEqual(UNKNOWN);
  });

  it('keeps the last answer when the list fails after having answered', async () => {
    const answer = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [entry({ last_ping: new Date().toISOString() })],
      })
      .mockRejectedValueOnce(new Error('offline'));
    vi.stubGlobal('fetch', answer);
    const live = setup();

    await live.refresh();
    await live.refresh();

    expect(answer).toHaveBeenCalledTimes(2);
    expect(live.status().state).toBe('online');
  });

  it('does not ask at all without a listing id', () => {
    const ask = answering([]);
    vi.stubGlobal('fetch', ask);
    const live = setup({ ...SITE, listing: { url: SITE.listing.url, id: '' } });

    live.start();

    expect(ask).not.toHaveBeenCalled();
  });
});
