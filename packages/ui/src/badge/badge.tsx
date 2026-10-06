import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './badge.module.scss';

export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: BadgeTone;
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { children, tone = 'neutral', className, ...props },
  ref,
) {
  const classNames = [styles.badge, className].filter(Boolean).join(' ');

  return (
    <span ref={ref} {...props} className={classNames} data-tone={tone}>
      {children}
    </span>
  );
});
