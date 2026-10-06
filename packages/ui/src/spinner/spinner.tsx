import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

import styles from './spinner.module.scss';

export type SpinnerSize = 'small' | 'medium' | 'large';

export type SpinnerProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'aria-hidden' | 'aria-live' | 'children' | 'role'
> & {
  size?: SpinnerSize;
};

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = 'medium', className, ...props },
  ref,
) {
  const classNames = [styles.spinner, className].filter(Boolean).join(' ');
  const safeProps = { ...props } as HTMLAttributes<HTMLSpanElement>;

  delete safeProps.children;
  delete safeProps.role;
  delete safeProps['aria-live'];
  delete safeProps['aria-hidden'];

  return (
    <span ref={ref} {...safeProps} className={classNames} data-size={size} aria-hidden="true" />
  );
});
