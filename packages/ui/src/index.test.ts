import { describe, expect, it } from 'vitest';
import { NOVA_UI_PACKAGE } from './index';

describe('@nova/ui public entrypoint', () => {
  it('exposes the package marker', () => {
    expect(NOVA_UI_PACKAGE).toBe('@nova/ui');
  });
});
