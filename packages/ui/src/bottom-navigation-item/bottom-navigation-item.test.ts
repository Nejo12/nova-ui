import { describe, expect, it } from 'vitest';

import styles from './bottom-navigation-item.module.scss';
import { getBottomNavigationItemClassName } from './bottom-navigation-item';

describe('getBottomNavigationItemClassName', () => {
  it('returns the default bottom-navigation-item class', () => {
    expect(getBottomNavigationItemClassName()).toBe(styles.bottomNavigationItem);
  });

  it('treats undefined options as the default state', () => {
    expect(getBottomNavigationItemClassName(undefined)).toBe(styles.bottomNavigationItem);
  });

  it('adds the current-state class when requested', () => {
    expect(getBottomNavigationItemClassName({ isCurrent: true })).toBe(
      `${styles.bottomNavigationItem} ${styles.current}`,
    );
  });

  it('composes consumer class names', () => {
    expect(
      getBottomNavigationItemClassName({
        className: 'consumer-bottom-navigation-item',
        isCurrent: true,
      }),
    ).toBe(`${styles.bottomNavigationItem} ${styles.current} consumer-bottom-navigation-item`);
  });
});
