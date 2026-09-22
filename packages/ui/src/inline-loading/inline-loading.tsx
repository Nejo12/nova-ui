import type * as React from 'react';

import { Spinner } from '../spinner/spinner';

import styles from './inline-loading.module.scss';

export type InlineLoadingState = 'loading' | 'success' | 'error';
export type InlineLoadingSize = 'small' | 'medium';

export type InlineLoadingProps = Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  'aria-atomic' | 'aria-live' | 'children' | 'role'
> & {
  state?: InlineLoadingState;
  size?: InlineLoadingSize;
  text: React.ReactNode;
};

const STATE_GLYPHS: Record<Exclude<InlineLoadingState, 'loading'>, string> = {
  success: '✓',
  error: '!',
};

export function InlineLoading({
  state = 'loading',
  size = 'medium',
  text,
  className,
  ...props
}: InlineLoadingProps) {
  const classNames = [styles.inlineLoading, className].filter(Boolean).join(' ');
  const safeProps = { ...props } as React.HTMLAttributes<HTMLSpanElement>;

  delete safeProps.children;
  delete safeProps.role;
  delete safeProps['aria-live'];
  delete safeProps['aria-atomic'];

  return (
    <span
      {...safeProps}
      className={classNames}
      data-size={size}
      data-state={state}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {state === 'loading' ? (
        <Spinner className={styles.indicator} size={size} />
      ) : (
        <span className={styles.indicator} aria-hidden="true">
          {STATE_GLYPHS[state]}
        </span>
      )}
      <span className={styles.text}>{text}</span>
    </span>
  );
}
