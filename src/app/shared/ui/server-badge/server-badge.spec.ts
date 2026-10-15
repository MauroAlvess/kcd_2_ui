import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { LiveStatus, UNKNOWN, type ServerStatus } from '../../../core/server-status';
import { ServerBadge } from './server-badge';

async function render(status: ServerStatus) {
  const start = vi.fn();
  TestBed.configureTestingModule({
    providers: [{ provide: LiveStatus, useValue: { status: signal(status), start } }],
  });
  const fixture = TestBed.createComponent(ServerBadge);
  await fixture.whenStable();
  const root = fixture.nativeElement as HTMLElement;
  return { root, start, text: (root.textContent ?? '').replace(/\s+/g, ' ').trim() };
}

describe('ServerBadge', () => {
  it('says how many are playing and how many places there are', async () => {
    const { text, root } = await render({ state: 'online', players: 3, max: 512 });

    expect(text).toBe('3 jogadores online agora de 512 vagas');
    expect(root.querySelector('.badge')?.getAttribute('data-state')).toBe('online');
  });

  it('says one player in the singular, and nobody in plain words', async () => {
    expect((await render({ state: 'online', players: 1, max: 512 })).text).toBe(
      '1 jogador online agora de 512 vagas',
    );
    TestBed.resetTestingModule();
    expect((await render({ state: 'online', players: 0, max: 512 })).text).toBe(
      'Nenhum jogador online agora de 512 vagas',
    );
  });

  it('writes the numbers the way a Brazilian reads them', async () => {
    const { text } = await render({ state: 'online', players: 1234, max: 2048 });

    expect(text).toContain('1.234 jogadores');
    expect(text).toContain('de 2.048 vagas');
  });

  it('says the server is out when the list says it is gone', async () => {
    const { text, root } = await render({ state: 'offline', players: 0, max: 0 });

    expect(text).toBe('Servidor fora do ar no momento');
    expect(root.querySelector('.badge')?.getAttribute('data-state')).toBe('offline');
  });

  it('says nothing, and keeps its room, until the list has answered', async () => {
    const { text, root } = await render(UNKNOWN);

    expect(text).toBe('');
    expect(root.querySelector('.badge')?.getAttribute('data-state')).toBe('unknown');
  });

  it('is a status a screen reader announces politely, and starts asking once it has drawn', async () => {
    const { root, start } = await render({ state: 'online', players: 2, max: 512 });

    expect(root.querySelector('p')?.getAttribute('role')).toBe('status');
    expect(start).toHaveBeenCalledTimes(1);
  });
});
