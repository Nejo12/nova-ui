import type { SelectHTMLAttributes } from 'react';

import styles from './select.module.scss';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: SelectProps) {
  const classNames = [styles.select, className].filter(Boolean).join(' ');

  return (
    <select {...props} className={classNames}>
      {children}
    </select>
  );
}
