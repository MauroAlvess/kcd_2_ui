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

  it('has no corner ornaments unless it is told to, and then the lion above and the raven below', async () => {
    expect((await render({ anchor: 'a' })).querySelector('img.corner')).toBeNull();

    const section = await render({ anchor: 'b', corners: true });
    expect(section.querySelector(':scope > img.corner.lion')?.getAttribute('src')).toBe(
      'img/corner-lion.webp',
    );
    expect(section.querySelector(':scope > img.corner.raven')?.getAttribute('src')).toBe(
      'img/corner-raven.webp',
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
