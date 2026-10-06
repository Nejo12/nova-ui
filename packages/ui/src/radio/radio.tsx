import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

import styles from './radio.module.scss';

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: ReactNode;
  description?: ReactNode;
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, description, className, id, ...props },
  ref,
) {
  const inputClassNames = [styles.input, className].filter(Boolean).join(' ');

  return (
    <label className={styles.root}>
      <input ref={ref} {...props} id={id} className={inputClassNames} type="radio" />
      <span className={styles.content}>
        <span className={styles.label}>{label}</span>
        {description ? <span className={styles.description}>{description}</span> : null}
      </span>
    </label>
  );
});
