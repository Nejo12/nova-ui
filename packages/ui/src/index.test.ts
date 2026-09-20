import { describe, expect, it } from 'vitest';
import { Fieldset, Icon, NOVA_UI_PACKAGE, VisuallyHidden } from './index';

describe('@nova-component/ui public entrypoint', () => {
  it('exposes the package marker', () => {
    expect(NOVA_UI_PACKAGE).toBe('@nova-component/ui');
  });

  it('exports VisuallyHidden from the public entrypoint', () => {
    expect(VisuallyHidden).toBeTypeOf('function');
  });

  it('exports Fieldset from the public entrypoint', () => {
    expect(Fieldset).toBeTypeOf('function');
  });

  it('exports Icon from the public entrypoint', () => {
    expect(Icon).toBeTypeOf('function');
  });
});
