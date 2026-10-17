import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { Rich, parts } from './rich';

describe('parts', () => {
  it('splits a text at its bold marks, keeping every space where it was', () => {
    expect(parts('A **Casa dos Leões**, sob Radovan, busca **a paz**.')).toEqual([
      { text: 'A ', strong: false },
      { text: 'Casa dos Leões', strong: true },
      { text: ', sob Radovan, busca ', strong: false },
      { text: 'a paz', strong: true },
      { text: '.', strong: false },
    ]);
  });

  it('leaves a text with no marks as one plain piece, and an empty text as none', () => {
    expect(parts('Sem destaque.')).toEqual([{ text: 'Sem destaque.', strong: false }]);
    expect(parts('')).toEqual([]);
  });

  it('can start and end in bold', () => {
    expect(parts('**Tudo** em destaque **também**')).toEqual([
      { text: 'Tudo', strong: true },
      { text: ' em destaque ', strong: false },
      { text: 'também', strong: true },
    ]);
  });
});

describe('Rich', () => {
  it('writes the bold words as strong and keeps the punctuation against them', () => {
    const fixture = TestBed.createComponent(Rich);
    fixture.componentRef.setInput('text', 'A **Casa Raborsch**, ou a **de Schodal**.');
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect([...element.querySelectorAll('strong')].map((node) => node.textContent)).toEqual([
      'Casa Raborsch',
      'de Schodal',
    ]);
    expect(element.textContent).toBe('A Casa Raborsch, ou a de Schodal.');
  });
});
