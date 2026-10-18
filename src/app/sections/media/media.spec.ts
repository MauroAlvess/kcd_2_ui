import { TestBed } from '@angular/core/testing';
import { CLIPS, SHOTS } from '../../content/media';
import { Media } from './media';

const proto = HTMLDialogElement.prototype as unknown as Record<string, unknown>;
const originals = { showModal: proto['showModal'], close: proto['close'] };

describe('Media', () => {
  let root: HTMLElement;

  // jsdom has neither a modal dialog nor a video that plays; the stand-ins keep what the page asks of them.
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
    await TestBed.configureTestingModule({ imports: [Media] }).compileComponents();
    const fixture = TestBed.createComponent(Media);
    root = fixture.nativeElement;
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const videos = () => Array.from(root.querySelectorAll<HTMLVideoElement>('video'));
  const shots = () => Array.from(root.querySelectorAll<HTMLButtonElement>('.shot .open'));
  const dialog = () => root.querySelector('dialog') as HTMLDialogElement;

  it('is the section the navigation calls "midias", named by its heading', () => {
    const section = root.querySelector('section#midias');
    expect(section).not.toBeNull();
    const heading = root.querySelector(`#${section?.getAttribute('aria-labelledby')}`);
    expect(heading?.tagName).toBe('H2');
  });

  it('shows the three videos in order, the first one big', () => {
    const titles = Array.from(
      root.querySelectorAll('app-clip-card h4'),
      (title) => title.textContent,
    );
    expect(titles).toEqual(CLIPS.map((clip) => clip.title));
    expect(titles).toHaveLength(3);

    const cards = Array.from(root.querySelectorAll('app-clip-card'));
    expect(cards.map((card) => card.classList.contains('featured'))).toEqual([true, false, false]);
  });

  it('puts a poster on each video and downloads nothing of it before it is played', () => {
    expect(videos()).toHaveLength(3);
    videos().forEach((video, index) => {
      const clip = CLIPS[index];
      expect(video.hasAttribute('controls')).toBe(true);
      expect(video.getAttribute('preload')).toBe('none');
      expect(video.getAttribute('poster')).toBe(clip?.poster.src);
      expect(video.getAttribute('width')).toBe(String(clip?.poster.width));
      expect(video.getAttribute('height')).toBe(String(clip?.poster.height));
      expect(video.getAttribute('aria-label')).toContain(clip?.title);
      expect(video.hasAttribute('autoplay')).toBe(false);

      const source = video.querySelector('source');
      expect(source?.getAttribute('src')).toBe(clip?.file);
      expect(source?.getAttribute('type')).toBe('video/mp4');
      expect(video.querySelector('a')?.getAttribute('href')).toBe(clip?.file);
    });
  });

  it('says how long each video runs, to a screen reader too', () => {
    const lengths = Array.from(root.querySelectorAll('app-clip-card .length'), (length) =>
      length.textContent?.trim(),
    );
    expect(lengths).toEqual(CLIPS.map((clip) => `Duração: ${clip.length}`));
  });

  it('stops the other videos when one is played, and only those', () => {
    const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
    const all = videos();

    all[1]?.dispatchEvent(new Event('play'));

    expect(pause).toHaveBeenCalledTimes(2);
    expect(pause.mock.contexts).toContain(all[0]);
    expect(pause.mock.contexts).toContain(all[2]);
    expect(pause.mock.contexts).not.toContain(all[1]);
  });

  it('shows the three screenshots as buttons, each with its picture, its size and its description', () => {
    expect(shots()).toHaveLength(3);
    shots().forEach((button, index) => {
      const shot = SHOTS[index];
      const image = button.querySelector('img');
      expect(image?.getAttribute('src')).toBe(shot?.small.src);
      expect(image?.getAttribute('width')).toBe(String(shot?.small.width));
      expect(image?.getAttribute('height')).toBe(String(shot?.small.height));
      expect(image?.getAttribute('alt')).toBe(shot?.alt);
      expect(image?.getAttribute('loading')).toBe('lazy');
      expect(button.textContent).toContain(`Ampliar a imagem: ${shot?.title}`);
    });
  });

  it('opens the large picture, under its title, when a screenshot is pressed', async () => {
    expect(dialog().hasAttribute('open')).toBe(false);
    expect(dialog().querySelector('img')).toBeNull();

    shots()[2]?.click();
    await Promise.resolve();
    TestBed.tick();

    const large = dialog().querySelector('img');
    expect(dialog().hasAttribute('open')).toBe(true);
    expect(large?.getAttribute('src')).toBe(SHOTS[2]?.large.src);
    expect(large?.getAttribute('alt')).toBe(SHOTS[2]?.alt);
    expect(dialog().querySelector('figcaption')?.textContent).toContain(SHOTS[2]?.title);
  });
});
