import type { HTMLAttributes } from 'react';

import styles from './progress.module.scss';

export type ProgressProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'aria-valuemax' | 'aria-valuemin' | 'aria-valuenow' | 'children' | 'role'
> & {
  value: number;
  min?: number;
  max?: number;
};

function getVisualPercentage(value: number, min: number, max: number) {
  if (![value, min, max].every(Number.isFinite) || max <= min) {
    return 0;
  }

  const percentage = ((value - min) / (max - min)) * 100;
  return Math.min(100, Math.max(0, percentage));
}

export function Progress({ value, min = 0, max = 100, className, ...props }: ProgressProps) {
  const classNames = [styles.progress, className].filter(Boolean).join(' ');
  const visualPercentage = getVisualPercentage(value, min, max);

  return (
    <div
      {...props}
      className={classNames}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
    >
      <span
        className={styles.indicator}
        style={{ width: `${visualPercentage}%` }}
        aria-hidden="true"
      />
    </div>
  );
}
