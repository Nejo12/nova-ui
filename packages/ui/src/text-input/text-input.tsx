import type { InputHTMLAttributes } from 'react';

import styles from './text-input.module.scss';

export type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ className, type = 'text', ...props }: TextInputProps) {
  const classNames = [styles.input, className].filter(Boolean).join(' ');

  return <input {...props} className={classNames} type={type} />;
}
