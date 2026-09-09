import type { ButtonHTMLAttributes } from 'react';

import styles from './button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({
  variant = 'primary',
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  const classNames = [styles.button, className].filter(Boolean).join(' ');

  return (
    <button
      {...props}
      className={classNames}
      type={type}
      data-variant={variant}
    />
  );
}
