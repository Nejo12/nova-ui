import type { HTMLAttributes } from 'react';

import styles from './spinner.module.scss';

export type SpinnerSize = 'small' | 'medium' | 'large';

export type SpinnerProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'aria-hidden' | 'aria-live' | 'children' | 'role'
> & {
  size?: SpinnerSize;
};

export function Spinner({ size = 'medium', className, ...props }: SpinnerProps) {
  const classNames = [styles.spinner, className].filter(Boolean).join(' ');

  return <span {...props} className={classNames} data-size={size} aria-hidden="true" />;
}
