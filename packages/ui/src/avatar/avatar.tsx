import type { HTMLAttributes } from 'react';

import styles from './avatar.module.scss';

export type AvatarSize = 'small' | 'medium' | 'large';

export type AvatarProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'aria-hidden' | 'children' | 'role'
> & {
  initials: string;
  size?: AvatarSize;
};

export function Avatar({
  initials,
  size = 'medium',
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: AvatarProps) {
  const classNames = [styles.avatar, className].filter(Boolean).join(' ');
  const hasAccessibleName = ariaLabel !== undefined || ariaLabelledBy !== undefined;

  return (
    <span
      {...props}
      className={classNames}
      data-size={size}
      aria-hidden={hasAccessibleName ? undefined : true}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {initials}
    </span>
  );
}
