import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';

import styles from './textarea.module.scss';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, ...props },
  ref,
) {
  const classNames = [styles.textarea, className].filter(Boolean).join(' ');

  return <textarea ref={ref} {...props} className={classNames} />;
});
