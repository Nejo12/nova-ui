import { describe, expect, it } from 'vitest';

import styles from './navigation-item.module.scss';
import { getNavigationItemClassName } from './navigation-item';

describe('getNavigationItemClassName', () => {
  it('returns the default navigation-item class', () => {
    expect(getNavigationItemClassName()).toBe(styles.navigationItem);
  });

  it('treats undefined options as the default state', () => {
    expect(getNavigationItemClassName(undefined)).toBe(styles.navigationItem);
  });

  it('adds the current-state class when requested', () => {
    expect(getNavigationItemClassName({ isCurrent: true })).toBe(
      `${styles.navigationItem} ${styles.current}`,
    );
  });

  it('composes consumer class names', () => {
    expect(
      getNavigationItemClassName({
        className: 'consumer-navigation-item',
        isCurrent: true,
      }),
    ).toBe(`${styles.navigationItem} ${styles.current} consumer-navigation-item`);
  });
});
