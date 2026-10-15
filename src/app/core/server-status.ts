import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { SITE_CONFIG } from './site';

export type ServerState = 'unknown' | 'online' | 'offline';

export interface ServerStatus {
  readonly state: ServerState;
  /** The players in the game now and the places the server has, as the master list says; 0 unless `online`. */
  readonly players: number;
  readonly max: number;
}

export const UNKNOWN: ServerStatus = { state: 'unknown', players: 0, max: 0 };
export const OFFLINE: ServerStatus = { state: 'offline', players: 0, max: 0 };

/** The list forgets a server about two minutes after its last heartbeat: a ping older than this is a server that is gone. */
export const GONE_AFTER_MS = 2 * 60_000;

const EVERY_MS = 45_000;
const TIMEOUT_MS = 8_000;
/** How long the last answer is kept when the list stops answering, before the page says nothing at all. */
const STALE_AFTER_MS = 5 * 60_000;

const count = (value: unknown): number | null =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0 ? Math.floor(value) : null;

/**
 * What the master list says of one server, found by its listing id (never by its address: the page does not know
 * it). A list that is not a list says nothing; a list without the server, or with an old ping, says it is gone.
 * `now` is the clock, so a test can set it.
 */
export function readStatus(list: unknown, id: string, now: number): ServerStatus {
  if (!Array.isArray(list)) {
    return UNKNOWN;
  }
  const entry = list.find(
    (item): item is Record<string, unknown> =>
      typeof item === 'object' && item !== null && (item as Record<string, unknown>)['id'] === id,
  );
  if (entry === undefined) {
    return OFFLINE;
  }
  const ping = typeof entry['last_ping'] === 'string' ? Date.parse(entry['last_ping']) : NaN;
  if (!Number.isFinite(ping) || now - ping > GONE_AFTER_MS) {
    return OFFLINE;
  }
  const players = count(entry['current_players']);
  const max = count(entry['max_players']);
  if (players === null || max === null) {
    return UNKNOWN;
  }
  return { state: 'online', players, max: Math.max(max, players) };
}

/**
 * The players online now, read from the public master list the game's own server browser uses (it allows any page to
 * read it). The prerendered page has no numbers: a browser starts this once it has drawn, asks at once and then every
 * 45 s while the page is on screen, and keeps quiet if the list does not answer.
 */
@Injectable({ providedIn: 'root' })
export class LiveStatus {
  private readonly site = inject(SITE_CONFIG);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly current = signal<ServerStatus>(UNKNOWN);
  private timer: ReturnType<typeof setInterval> | undefined;
  private lastAnswer = 0;

  readonly status = this.current.asReadonly();

  /** Only a browser calls this (after the first render): the server that prerenders the page never does. */
  start(): void {
    if (this.timer !== undefined || !this.site.listing.id) {
      return;
    }
    void this.refresh();
    this.timer = setInterval(() => {
      if (!this.document.hidden) {
        void this.refresh();
      }
    }, EVERY_MS);
    const onVisible = () => {
      if (!this.document.hidden && Date.now() - this.lastAnswer > EVERY_MS / 2) {
        void this.refresh();
      }
    };
    this.document.addEventListener('visibilitychange', onVisible);
    this.destroyRef.onDestroy(() => {
      clearInterval(this.timer);
      this.document.removeEventListener('visibilitychange', onVisible);
    });
  }

  async refresh(): Promise<void> {
    try {
      const answer = await fetch(this.site.listing.url, {
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });
      if (!answer.ok) {
        throw new Error(`HTTP ${answer.status}`);
      }
      this.current.set(readStatus(await answer.json(), this.site.listing.id, Date.now()));
      this.lastAnswer = Date.now();
    } catch {
      // A list that does not answer says nothing about the server: the last answer stays for a while, then nothing.
      if (Date.now() - this.lastAnswer > STALE_AFTER_MS) {
        this.current.set(UNKNOWN);
      }
    }
  }
}
