import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

import styles from './text-input.module.scss';

export type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { className, type = 'text', ...props },
  ref,
) {
  const classNames = [styles.input, className].filter(Boolean).join(' ');

  return <input ref={ref} {...props} className={classNames} type={type} />;
});
