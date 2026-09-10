import { describe, expect, it } from 'vitest';
import { NOVA_UI_PACKAGE, VisuallyHidden } from './index';

describe('@nova-component/ui public entrypoint', () => {
  it('exposes the package marker', () => {
    expect(NOVA_UI_PACKAGE).toBe('@nova-component/ui');
  });

  it('exports VisuallyHidden from the public entrypoint', () => {
    expect(VisuallyHidden).toBeTypeOf('function');
  });
});
