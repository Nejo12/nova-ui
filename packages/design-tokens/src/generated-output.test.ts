import { describe, expect, it } from 'vitest';
import generated from '../dist/tokens.json';

describe('generated Nova token output', () => {
  it('contains the extraction-ready semantic contract', () => {
    expect(generated.semantic.light['color.bgInverse']).toBe('#111827');
    expect(generated.semantic.light['color.statusInfoSurface']).toBe('#eff6ff');
    expect(generated.semantic.light['color.statusDangerText']).toBe('#450a0a');
    expect(generated.semantic.light['elevation.overlay']).toBe('0 6px 18px rgb(0 0 0 / 0.12)');
  });

  it('keeps generated light and dark semantic keys aligned', () => {
    expect(Object.keys(generated.semantic.light).sort()).toEqual(
      Object.keys(generated.semantic.dark).sort(),
    );
  });
});
