import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { Trailer } from './trailer';

const proto = HTMLDialogElement.prototype as unknown as Record<string, unknown>;
const originals = { showModal: proto['showModal'], close: proto['close'] };

describe('Trailer', () => {
  let fixture: ComponentFixture<Trailer>;
  let root: HTMLElement;

  // jsdom has no modal dialog: showing one sets `open`, closing clears it and says so (the `close` event).
  beforeAll(() => {
    proto['showModal'] = function (this: HTMLDialogElement) {
      this.setAttribute('open', '');
    };
    proto['close'] = function (this: HTMLDialogElement) {
      this.removeAttribute('open');
      this.dispatchEvent(new Event('close'));
    };
  });

  afterAll(() => {
    proto['showModal'] = originals.showModal;
    proto['close'] = originals.close;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Trailer] }).compileComponents();
    fixture = TestBed.createComponent(Trailer);
    root = fixture.nativeElement;
    await fixture.whenStable();
  });

  const link = () => root.querySelector('a.card') as HTMLAnchorElement;
  const dialog = () => root.querySelector('dialog') as HTMLDialogElement;
  const frame = () => root.querySelector('iframe') as HTMLIFrameElement | null;

  it('is a link to the video on YouTube, with its own picture and its length', () => {
    expect(link().getAttribute('href')).toBe('https://www.youtube.com/watch?v=Z5xjWIUd6Uo');
    expect(link().getAttribute('target')).toBe('_blank');
    expect(link().getAttribute('rel')).toContain('noopener');
    expect(root.querySelector('img')?.getAttribute('src')).toBe('img/trailer-1280.webp');
    expect(root.querySelector('.length')?.textContent).toContain('3 min 5 s');
  });

  it('builds no player until it is clicked, and asks YouTube for nothing before then', () => {
    expect(frame()).toBeNull();
    expect(dialog().open).toBe(false);
    expect(root.innerHTML).not.toContain('youtube-nocookie');
  });

  it('plays in the dialog on a plain click, from the no-cookie address, and keeps the link for a click with Ctrl', async () => {
    const withCtrl = new MouseEvent('click', { bubbles: true, cancelable: true, ctrlKey: true });
    link().dispatchEvent(withCtrl);
    await fixture.whenStable();
    expect(withCtrl.defaultPrevented).toBe(false);
    expect(frame()).toBeNull();

    const plain = new MouseEvent('click', { bubbles: true, cancelable: true });
    link().dispatchEvent(plain);
    await fixture.whenStable();
    expect(plain.defaultPrevented).toBe(true);
    expect(dialog().open).toBe(true);
    expect(frame()?.getAttribute('src')).toBe(
      'https://www.youtube-nocookie.com/embed/Z5xjWIUd6Uo?autoplay=1&rel=0&modestbranding=1',
    );
  });

  it('takes the player away when the dialog closes, which stops the sound', async () => {
    link().dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    await fixture.whenStable();
    expect(frame()).not.toBeNull();

    (root.querySelector('button.close') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(dialog().open).toBe(false);
    expect(frame()).toBeNull();
  });

  it('closes on a click in the margin around the player, but not on one in the player', async () => {
    link().dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    await fixture.whenStable();

    (root.querySelector('.frame') as HTMLElement).click();
    expect(dialog().open).toBe(true);
    dialog().click();
    await fixture.whenStable();
    expect(dialog().open).toBe(false);
  });
});
