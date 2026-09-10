import type { InputHTMLAttributes, ReactNode } from 'react';

import styles from './checkbox.module.scss';

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: ReactNode;
  description?: ReactNode;
};

export function Checkbox({ label, description, className, id, ...props }: CheckboxProps) {
  const inputClassNames = [styles.input, className].filter(Boolean).join(' ');

  return (
    <label className={styles.root}>
      <input {...props} id={id} className={inputClassNames} type="checkbox" />
      <span className={styles.content}>
        <span className={styles.label}>{label}</span>
        {description ? <span className={styles.description}>{description}</span> : null}
      </span>
    </label>
  );
}
