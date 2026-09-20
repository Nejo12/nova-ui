import styles from './navigation-item.module.scss';

export type NavigationItemClassNameOptions = {
  className?: string;
  isCurrent?: boolean;
};

/**
 * Returns navigation-item styles for a consumer-owned interactive link.
 * Routing and aria-current remain the consumer's responsibility.
 */
export function getNavigationItemClassName(options: NavigationItemClassNameOptions = {}): string {
  const { className, isCurrent = false } = options;

  return [styles.navigationItem, isCurrent && styles.current, className].filter(Boolean).join(' ');
}
