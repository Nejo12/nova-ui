import type { HTMLAttributes, ReactNode } from 'react';

import styles from './visually-hidden.module.scss';

export type VisuallyHiddenProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

export function VisuallyHidden({ children, className, ...props }: VisuallyHiddenProps) {
  const classNames = [styles.visuallyHidden, className].filter(Boolean).join(' ');

  return (
    <span {...props} className={classNames}>
      {children}
    </span>
  );
}
