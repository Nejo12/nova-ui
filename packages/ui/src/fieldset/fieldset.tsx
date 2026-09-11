import { useId, type FieldsetHTMLAttributes, type ReactNode } from 'react';

import styles from './fieldset.module.scss';

export type FieldsetProps = FieldsetHTMLAttributes<HTMLFieldSetElement> & {
  legend: ReactNode;
  description?: ReactNode;
  children: ReactNode;
};

export function Fieldset({
  legend,
  description,
  children,
  className,
  'aria-describedby': ariaDescribedBy,
  ...props
}: FieldsetProps) {
  const generatedDescriptionId = useId();
  const classNames = [styles.fieldset, className].filter(Boolean).join(' ');
  const describedBy =
    description !== undefined
      ? [ariaDescribedBy, generatedDescriptionId].filter(Boolean).join(' ')
      : ariaDescribedBy;

  return (
    <fieldset {...props} className={classNames} aria-describedby={describedBy}>
      <legend className={styles.legend}>{legend}</legend>
      {description !== undefined ? (
        <p id={generatedDescriptionId} className={styles.description}>
          {description}
        </p>
      ) : null}
      <div className={styles.content}>{children}</div>
    </fieldset>
  );
}
