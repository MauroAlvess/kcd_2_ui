import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Curtain, GONE_MS, WAIT_MS } from './curtain';

describe('Curtain', () => {
  let fixture: ComponentFixture<Curtain>;
  let root: HTMLElement;

  const curtain = () => root.querySelector<HTMLElement>('.curtain');
  const pieces = () => Array.from(root.querySelectorAll<HTMLImageElement>('img.cloud'));

  /** How the browser answers `decode()` for the clouds' pictures (jsdom has none of its own). */
  function decoding(how: 'at once' | 'never' | 'fails' | 'absent'): void {
    Object.defineProperty(HTMLImageElement.prototype, 'decode', {
      configurable: true,
      writable: true,
      value:
        how === 'absent'
          ? undefined
          : () =>
              how === 'at once'
                ? Promise.resolve()
                : how === 'fails'
                  ? Promise.reject(new Error('broken picture'))
                  : new Promise<void>(() => undefined),
    });
  }

  async function enter(how: 'at once' | 'never' | 'fails' | 'absent'): Promise<void> {
    decoding(how);
    await TestBed.configureTestingModule({ imports: [Curtain] }).compileComponents();
    fixture = TestBed.createComponent(Curtain);
    root = fixture.nativeElement;
    // The first render is what starts the wait.
    fixture.detectChanges();
  }

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    delete (HTMLImageElement.prototype as { decode?: unknown }).decode;
  });

  it('is four heaps of clouds, one to a corner, made from the two frames, for the eyes only', async () => {
    await enter('never');
    expect(curtain()?.getAttribute('aria-hidden')).toBe('true');
    expect(pieces().map((piece) => piece.className.replace('cloud ', ''))).toEqual([
      'bl',
      'tr',
      'tl',
      'br',
    ]);
    expect(new Set(pieces().map((piece) => piece.getAttribute('src'))).size).toBe(2);
    for (const piece of pieces()) {
      expect(piece.getAttribute('alt')).toBe('');
    }
  });

  it('keeps the screen black until the pictures are in, then lets the clouds move', async () => {
    await enter('at once');
    expect(curtain()?.classList.contains('go')).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    fixture.detectChanges();
    expect(curtain()?.classList.contains('go')).toBe(true);
  });

  it('does not wait for ever on a picture that does not come, nor on one that is broken, nor on a browser that cannot decode', async () => {
    await enter('never');
    await vi.advanceTimersByTimeAsync(WAIT_MS - 1);
    fixture.detectChanges();
    expect(curtain()?.classList.contains('go')).toBe(false);
    await vi.advanceTimersByTimeAsync(2);
    fixture.detectChanges();
    expect(curtain()?.classList.contains('go')).toBe(true);
  });

  it('starts as soon as a broken picture has failed, and a browser with no decode does not hold it up', async () => {
    for (const how of ['fails', 'absent'] as const) {
      TestBed.resetTestingModule();
      await enter(how);
      await vi.advanceTimersByTimeAsync(1);
      fixture.detectChanges();
      expect(curtain()?.classList.contains('go'), how).toBe(true);
    }
  });

  it('is taken out of the page when the show is over, and does not come back', async () => {
    await enter('at once');
    await vi.advanceTimersByTimeAsync(GONE_MS - 100);
    fixture.detectChanges();
    expect(curtain()).not.toBeNull();
    await vi.advanceTimersByTimeAsync(200);
    fixture.detectChanges();
    expect(curtain()).toBeNull();
    await vi.advanceTimersByTimeAsync(10_000);
    fixture.detectChanges();
    expect(curtain()).toBeNull();
  });
});
