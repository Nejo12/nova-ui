import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';

import styles from './select.module.scss';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, children, ...props },
  ref,
) {
  const classNames = [styles.select, className].filter(Boolean).join(' ');

  return (
    <select ref={ref} {...props} className={classNames}>
      {children}
    </select>
  );
});
