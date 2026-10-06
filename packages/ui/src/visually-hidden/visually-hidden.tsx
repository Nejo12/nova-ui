import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './visually-hidden.module.scss';

export type VisuallyHiddenProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  function VisuallyHidden({ children, className, ...props }, ref) {
    const classNames = [styles.visuallyHidden, className].filter(Boolean).join(' ');

    return (
      <span ref={ref} {...props} className={classNames}>
        {children}
      </span>
    );
  },
);
