import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

import styles from './button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', className, type = 'button', ...props },
  ref,
) {
  const classNames = [styles.button, className].filter(Boolean).join(' ');

  return <button ref={ref} {...props} className={classNames} type={type} data-variant={variant} />;
});
