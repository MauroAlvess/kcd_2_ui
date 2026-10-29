import { TestBed } from '@angular/core/testing';
import { Section } from './section';

async function render(inputs: Record<string, unknown>): Promise<HTMLElement> {
  const fixture = TestBed.createComponent(Section);
  for (const [name, value] of Object.entries(inputs)) {
    fixture.componentRef.setInput(name, value);
  }
  await fixture.whenStable();
  return (fixture.nativeElement as HTMLElement).querySelector('section') as HTMLElement;
}

describe('Section', () => {
  it('is the anchor its id says, and is named by its heading', async () => {
    const section = await render({ anchor: 'guildas', labelledBy: 'guildas-title' });

    expect(section.id).toBe('guildas');
    expect(section.getAttribute('aria-labelledby')).toBe('guildas-title');
  });

  it('has no corner ornament unless it is told to, and then only the one it is told: the lion above on the left, or the raven below on the right', async () => {
    expect((await render({ anchor: 'a' })).querySelector('img.corner')).toBeNull();

    const lion = await render({ anchor: 'b', corner: 'lion' });
    expect(lion.querySelector(':scope > img.corner.lion')?.getAttribute('src')).toBe(
      'img/corner-lion.webp',
    );
    expect(lion.querySelector('img.corner.raven')).toBeNull();

    const raven = await render({ anchor: 'c', corner: 'raven' });
    expect(raven.querySelector(':scope > img.corner.raven')?.getAttribute('src')).toBe(
      'img/corner-raven.webp',
    );
    expect(raven.querySelector('img.corner.lion')).toBeNull();
  });

  it('is the paper of the F2 panel unless it is told it is night, the blue of the banner; only the paper carries the print of the panel and the rope', async () => {
    const paper = await render({ anchor: 'a' });
    expect(paper.classList.contains('paper')).toBe(true);
    expect(paper.classList.contains('night')).toBe(false);
    expect(paper.querySelector(':scope > img.print')?.getAttribute('src')).toBe(
      'img/paper-photo.webp',
    );
    expect(paper.querySelector(':scope > img.rope')?.getAttribute('src')).toBe('img/rope.webp');

    const night = await render({ anchor: 'b', tone: 'night' });
    expect(night.classList.contains('night')).toBe(true);
    expect(night.classList.contains('paper')).toBe(false);
    expect(night.querySelector('img.print, img.rope')).toBeNull();
  });

  it('lays the night blue over a picture as heavily as it is told, 0.85 when it is not', async () => {
    const image = { src: 'img/x-1920.webp', srcset: 'img/x-960.webp 960w' };
    const plain = await render({ anchor: 'a', tone: 'night', image });
    expect((plain.querySelector('.photo') as HTMLElement).style.getPropertyValue('--tint')).toBe(
      '0.85',
    );
    const light = await render({ anchor: 'b', tone: 'night', image: { ...image, tint: 0.5 } });
    expect((light.querySelector('.photo') as HTMLElement).style.getPropertyValue('--tint')).toBe(
      '0.5',
    );
  });

  it('has no photograph unless it is given one', async () => {
    expect((await render({ anchor: 'a' })).querySelector('.photo')).toBeNull();
  });

  it('shows the photograph with its sizes, as decoration that a screen reader skips', async () => {
    const section = await render({
      anchor: 'a',
      image: { src: 'img/x-1920.webp', srcset: 'img/x-960.webp 960w, img/x-1920.webp 1920w' },
    });
    const photo = section.querySelector<HTMLImageElement>('.photo img');

    expect(section.querySelector('.photo')?.getAttribute('aria-hidden')).toBe('true');
    expect(photo?.getAttribute('src')).toBe('img/x-1920.webp');
    expect(photo?.getAttribute('srcset')).toContain('960w');
    expect(photo?.getAttribute('alt')).toBe('');
    expect(photo?.getAttribute('loading')).toBe('lazy');
  });
});
