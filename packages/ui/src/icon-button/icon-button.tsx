import type { ButtonHTMLAttributes } from 'react';

import { Icon, type IconName } from '../icon/icon';
import styles from './icon-button.module.scss';

export type IconButtonSize = 'small' | 'medium' | 'large';

type IconButtonAccessibleName =
  | {
      'aria-label': string;
      'aria-labelledby'?: never;
    }
  | {
      'aria-label'?: never;
      'aria-labelledby': string;
    };

export type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-label' | 'aria-labelledby' | 'children'
> &
  IconButtonAccessibleName & {
    icon: IconName;
    size?: IconButtonSize;
  };

export function IconButton({
  icon,
  size = 'medium',
  className,
  type = 'button',
  ...props
}: IconButtonProps) {
  const classNames = [styles.iconButton, className].filter(Boolean).join(' ');

  return (
    <button {...props} className={classNames} type={type} data-size={size}>
      <Icon name={icon} size={16} />
    </button>
  );
}
