import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { Lightbox, type LightboxPicture } from './lightbox';

const PICTURES: readonly LightboxPicture[] = [
  { src: 'img/a-1920.webp', width: 1920, height: 891, alt: 'Descrição A', caption: 'Primeira' },
  { src: 'img/b-1920.webp', width: 1920, height: 862, alt: 'Descrição B', caption: 'Segunda' },
  { src: 'img/c-1920.webp', width: 1920, height: 857, alt: 'Descrição C', caption: 'Terceira' },
];

const proto = HTMLDialogElement.prototype as unknown as Record<string, unknown>;
const originals = { showModal: proto['showModal'], close: proto['close'] };

describe('Lightbox', () => {
  let fixture: ComponentFixture<Lightbox>;
  let root: HTMLElement;

  // jsdom has no modal dialog: what the component relies on is that showing it sets `open`, and that closing it clears
  // `open` and says so (the `close` event), which is all the stand-ins do.
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

  async function render(pictures: readonly LightboxPicture[] = PICTURES): Promise<void> {
    await TestBed.configureTestingModule({ imports: [Lightbox] }).compileComponents();
    fixture = TestBed.createComponent(Lightbox);
    fixture.componentRef.setInput('pictures', pictures);
    root = fixture.nativeElement;
    await fixture.whenStable();
  }

  const dialog = () => root.querySelector('dialog') as HTMLDialogElement;
  const image = () => root.querySelector('dialog img') as HTMLImageElement | null;
  const caption = () => root.querySelector('figcaption')?.textContent?.replace(/\s+/g, ' ').trim();

  async function show(index: number): Promise<void> {
    fixture.componentInstance.show(index);
    await fixture.whenStable();
  }

  it('is closed, and downloads nothing, until it is asked to show a picture', async () => {
    await render();

    expect(dialog().hasAttribute('open')).toBe(false);
    expect(image()).toBeNull();
  });

  it('opens on the picture asked for, with its size, its description and its caption', async () => {
    await render();
    await show(1);

    expect(dialog().hasAttribute('open')).toBe(true);
    expect(image()?.getAttribute('src')).toBe('img/b-1920.webp');
    expect(image()?.getAttribute('width')).toBe('1920');
    expect(image()?.getAttribute('height')).toBe('862');
    expect(image()?.getAttribute('alt')).toBe('Descrição B');
    expect(caption()).toBe('Segunda 2 de 3');
  });

  it('keeps to the pictures it has when it is asked for one that is not there', async () => {
    await render();
    await show(9);
    expect(image()?.getAttribute('alt')).toBe('Descrição C');

    await show(-4);
    expect(image()?.getAttribute('alt')).toBe('Descrição A');
  });

  it('goes to the next and the previous picture, round the ends', async () => {
    await render();
    await show(1);
    const next = root.querySelector('.next') as HTMLButtonElement;
    const previous = root.querySelector('.previous') as HTMLButtonElement;

    next.click();
    await fixture.whenStable();
    expect(caption()).toBe('Terceira 3 de 3');
    next.click();
    await fixture.whenStable();
    expect(caption()).toBe('Primeira 1 de 3');
    previous.click();
    await fixture.whenStable();
    expect(caption()).toBe('Terceira 3 de 3');
  });

  it('goes the same way with the left and right arrow keys, and ignores the others', async () => {
    await render();
    await show(0);

    dialog().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await fixture.whenStable();
    expect(caption()).toBe('Segunda 2 de 3');

    dialog().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    dialog().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await fixture.whenStable();
    expect(caption()).toBe('Terceira 3 de 3');

    dialog().dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
    await fixture.whenStable();
    expect(caption()).toBe('Terceira 3 de 3');
  });

  it('closes on "Fechar", and on a click on the margin, but not on a click on the picture', async () => {
    await render();
    await show(0);

    image()?.click();
    expect(dialog().hasAttribute('open')).toBe(true);

    dialog().click();
    expect(dialog().hasAttribute('open')).toBe(false);

    await show(0);
    expect(dialog().hasAttribute('open')).toBe(true);
    (root.querySelector('.close') as HTMLButtonElement).click();
    expect(dialog().hasAttribute('open')).toBe(false);
  });

  it('puts the focus on "Fechar" when it opens, and says in words what it is', async () => {
    await render();

    const close = root.querySelector('.close') as HTMLButtonElement;
    expect(close.textContent?.trim()).toBe('Fechar');
    expect(close.hasAttribute('autofocus')).toBe(true);
    expect(dialog().getAttribute('aria-label')).toBe('Imagem ampliada');
  });

  it('has no arrows when there is a single picture, and names the two it has when there are more', async () => {
    await render(PICTURES.slice(0, 1));
    expect(root.querySelector('.step')).toBeNull();
    await show(0);
    expect(caption()).toBe('Primeira 1 de 1');

    TestBed.resetTestingModule();
    await render();
    expect(root.querySelector('.previous')?.getAttribute('aria-label')).toBe('Imagem anterior');
    expect(root.querySelector('.next')?.getAttribute('aria-label')).toBe('Próxima imagem');
  });
});
