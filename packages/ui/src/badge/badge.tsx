import type { HTMLAttributes, ReactNode } from 'react';

import styles from './badge.module.scss';

export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: BadgeTone;
};

export function Badge({
  children,
  tone = 'neutral',
  className,
  ...props
}: BadgeProps) {
  const classNames = [styles.badge, className].filter(Boolean).join(' ');

  return (
    <span {...props} className={classNames} data-tone={tone}>
      {children}
    </span>
  );
}
