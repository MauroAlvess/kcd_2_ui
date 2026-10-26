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

  it('is light unless it is told to be dark', async () => {
    const light = await render({ anchor: 'a' });
    expect(light.classList.contains('light')).toBe(true);
    expect(light.classList.contains('dark')).toBe(false);

    const dark = await render({ anchor: 'b', tone: 'dark' });
    expect(dark.classList.contains('dark')).toBe(true);
    expect(dark.classList.contains('light')).toBe(false);
  });

  it('frames a paper band with the lion and raven corners, and lays the clouds of the map in the corners of a black one without a photograph', async () => {
    const light = await render({ anchor: 'a' });
    expect(light.querySelector('.frame img.lion')?.getAttribute('src')).toBe(
      'img/corner-lion.webp',
    );
    expect(light.querySelector('.frame img.raven')?.getAttribute('src')).toBe(
      'img/corner-raven.webp',
    );
    expect(light.querySelector('.fog')).toBeNull();

    const dark = await render({ anchor: 'b', tone: 'dark' });
    expect(dark.querySelector('.frame')).toBeNull();
    const clouds = Array.from(dark.querySelectorAll<HTMLImageElement>('.fog img'));
    expect(clouds.map((cloud) => cloud.getAttribute('src'))).toEqual([
      'img/cloud-a-1774.webp',
      'img/cloud-b-1375.webp',
    ]);
    expect(dark.querySelector('.fog')?.getAttribute('aria-hidden')).toBe('true');
    for (const cloud of clouds) {
      expect(cloud.getAttribute('alt')).toBe('');
      expect(cloud.getAttribute('width')).toBeTruthy();
    }

    const photo = await render({
      anchor: 'c',
      tone: 'dark',
      image: { src: 'img/x.webp', srcset: 'img/x.webp 960w' },
    });
    expect(photo.querySelector('.fog')).toBeNull();
  });

  it('has no photograph unless it is given one', async () => {
    expect((await render({ anchor: 'a' })).querySelector('.photo')).toBeNull();
  });

  it('shows the photograph with its sizes, as decoration that a screen reader skips', async () => {
    const section = await render({
      anchor: 'a',
      tone: 'dark',
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
