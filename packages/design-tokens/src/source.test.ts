import { describe, expect, it } from 'vitest';
import source from './source.json';

describe('Nova token source', () => {
  it('keeps the light and dark semantic contracts aligned', () => {
    expect(Object.keys(source.semantic.light.color).sort()).toEqual(
      Object.keys(source.semantic.dark.color).sort(),
    );
  });

  it('uses product-neutral semantic token names', () => {
    const serializedKeys = Object.keys(source.semantic.light.color).join(' ').toLowerCase();

    expect(serializedKeys).not.toContain('klinnova');
    expect(serializedKeys).not.toContain('slotnova');
    expect(serializedKeys).not.toContain('oxblood');
  });
});
