import { SearchInput as SearchInputImplementation } from './search-input/search-input';
import { IconButton as IconButtonImplementation } from './icon-button/icon-button';
import { Icon as IconImplementation } from './icon/icon';
import { Fieldset as FieldsetImplementation } from './fieldset/fieldset';
import { VisuallyHidden as VisuallyHiddenImplementation } from './visually-hidden/visually-hidden';
import { Avatar as AvatarImplementation } from './avatar/avatar';
import { describe, expect, it } from 'vitest';
import {
  Avatar,
  getBottomNavigationItemClassName,
  Fieldset,
  getNavigationItemClassName,
  Icon,
  IconButton,
  NOVA_UI_PACKAGE,
  SearchInput,
  VisuallyHidden,
} from './index';

describe('@nova-component/ui public entrypoint', () => {
  it('exposes the package marker', () => {
    expect(NOVA_UI_PACKAGE).toBe('@nova-component/ui');
  });

  it('exports Avatar from the public entrypoint', () => {
    expect(Avatar).toBe(AvatarImplementation);
  });

  it('exports VisuallyHidden from the public entrypoint', () => {
    expect(VisuallyHidden).toBe(VisuallyHiddenImplementation);
  });

  it('exports Fieldset from the public entrypoint', () => {
    expect(Fieldset).toBe(FieldsetImplementation);
  });

  it('exports Icon from the public entrypoint', () => {
    expect(Icon).toBe(IconImplementation);
  });

  it('exports IconButton from the public entrypoint', () => {
    expect(IconButton).toBe(IconButtonImplementation);
  });

  it('exports SearchInput from the public entrypoint', () => {
    expect(SearchInput).toBe(SearchInputImplementation);
  });

  it('exports getBottomNavigationItemClassName from the public entrypoint', () => {
    expect(getBottomNavigationItemClassName).toBeTypeOf('function');
  });

  it('exports getNavigationItemClassName from the public entrypoint', () => {
    expect(getNavigationItemClassName).toBeTypeOf('function');
  });
});
