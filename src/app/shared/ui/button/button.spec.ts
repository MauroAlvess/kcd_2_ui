import { TestBed } from '@angular/core/testing';
import { Button } from './button';

async function link(inputs: Record<string, unknown>): Promise<HTMLAnchorElement> {
  const fixture = TestBed.createComponent(Button);
  for (const [name, value] of Object.entries(inputs)) {
    fixture.componentRef.setInput(name, value);
  }
  await fixture.whenStable();
  return (fixture.nativeElement as HTMLElement).querySelector('a') as HTMLAnchorElement;
}

describe('Button', () => {
  it('is a link to where it points, in the same tab', async () => {
    const anchor = await link({ href: '#guildas' });

    expect(anchor.getAttribute('href')).toBe('#guildas');
    expect(anchor.hasAttribute('target')).toBe(false);
    expect(anchor.hasAttribute('rel')).toBe(false);
    expect(anchor.textContent).not.toContain('nova aba');
  });

  it('opens an outside link in a new tab, without handing it the page, and says so to a screen reader', async () => {
    const anchor = await link({ href: 'https://discord.gg/exemplo', external: true });

    expect(anchor.getAttribute('target')).toBe('_blank');
    expect(anchor.getAttribute('rel')).toBe('noopener noreferrer');
    expect(anchor.querySelector('.sr-only')?.textContent).toContain('nova aba');
  });

  it('always leans a chevron forward after its words, and is a size smaller when it asks for it', async () => {
    const anchor = await link({ href: '#a', small: true });
    expect(anchor.querySelector('svg.chev')?.getAttribute('aria-hidden')).toBe('true');
    expect(anchor.classList.contains('small')).toBe(true);
    expect((await link({ href: '#a' })).classList.contains('small')).toBe(false);
  });

  it('is the red one unless it asks for the outline', async () => {
    expect((await link({ href: '#a' })).dataset['variant']).toBe('primary');
    expect((await link({ href: '#a', variant: 'ghost' })).dataset['variant']).toBe('ghost');
  });
});
