import styles from './bottom-navigation-item.module.scss';

export type BottomNavigationItemClassNameOptions = {
  className?: string;
  isCurrent?: boolean;
};

/**
 * Returns bottom-navigation-item styles for a consumer-owned interactive link.
 * Routing and aria-current remain the consumer's responsibility.
 */
export function getBottomNavigationItemClassName(
  options: BottomNavigationItemClassNameOptions = {},
): string {
  const { className, isCurrent = false } = options;

  return [styles.bottomNavigationItem, isCurrent && styles.current, className]
    .filter(Boolean)
    .join(' ');
}
