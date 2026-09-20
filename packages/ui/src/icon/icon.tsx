import {
  Bell,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  Ellipsis,
  Info,
  Plus,
  Search,
  TriangleAlert,
  User,
  X,
  type LucideIcon,
} from 'lucide-react';
import type { SVGAttributes } from 'react';

import styles from './icon.module.scss';

export type IconName =
  | 'search'
  | 'notifications'
  | 'chevron-down'
  | 'chevron-right'
  | 'add'
  | 'close'
  | 'check'
  | 'info'
  | 'warning'
  | 'more'
  | 'calendar'
  | 'user';

export type IconSize = 16 | 20 | 24 | 32;

export type IconTone = 'default' | 'muted' | 'info' | 'success' | 'warning' | 'danger';

export type IconProps = Omit<
  SVGAttributes<SVGSVGElement>,
  'aria-hidden' | 'children' | 'color' | 'focusable' | 'height' | 'width'
> & {
  name: IconName;
  size?: IconSize;
  tone?: IconTone;
};

const icons = {
  search: Search,
  notifications: Bell,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  add: Plus,
  close: X,
  check: Check,
  info: Info,
  warning: TriangleAlert,
  more: Ellipsis,
  calendar: Calendar,
  user: User,
} satisfies Record<IconName, LucideIcon>;

export function Icon({ name, size = 24, tone = 'default', className, ...props }: IconProps) {
  const IconComponent = icons[name];
  const classNames = [styles.icon, className].filter(Boolean).join(' ');

  return (
    <IconComponent
      {...props}
      className={classNames}
      size={size}
      data-icon-name={name}
      data-tone={tone}
      aria-hidden="true"
      focusable="false"
    />
  );
}
