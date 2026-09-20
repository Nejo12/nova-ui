import { describe, expect, it } from 'vitest';
import {
  Avatar,
  Fieldset,
  getNavigationItemClassName,
  Icon,
  IconButton,
  NOVA_UI_PACKAGE,
  VisuallyHidden,
} from './index';

describe('@nova-component/ui public entrypoint', () => {
  it('exposes the package marker', () => {
    expect(NOVA_UI_PACKAGE).toBe('@nova-component/ui');
  });

  it('exports Avatar from the public entrypoint', () => {
    expect(Avatar).toBeTypeOf('function');
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

  it('exports IconButton from the public entrypoint', () => {
    expect(IconButton).toBeTypeOf('function');
  });

  it('exports getNavigationItemClassName from the public entrypoint', () => {
    expect(getNavigationItemClassName).toBeTypeOf('function');
  });
});
