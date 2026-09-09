import type { HTMLAttributes, ReactNode } from 'react';

import styles from './form-field.module.scss';

export type FormFieldProps = HTMLAttributes<HTMLDivElement> & {
  label: ReactNode;
  htmlFor: string;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  children: ReactNode;
};

export function FormField({
  label,
  htmlFor,
  description,
  error,
  required = false,
  children,
  className,
  ...props
}: FormFieldProps) {
  const classNames = [styles.field, className].filter(Boolean).join(' ');

  return (
    <div {...props} className={classNames} data-invalid={error !== undefined || undefined}>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
        {required ? (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {description !== undefined ? <p className={styles.description}>{description}</p> : null}
      {children}
      {error !== undefined ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}
