import type { HTMLAttributes, ReactNode } from 'react';

import styles from './card.module.scss';

export type CardVariant = 'outlined' | 'elevated';

export type CardProps = HTMLAttributes<HTMLElement> & {
  as?: 'article' | 'section' | 'div';
  children: ReactNode;
  variant?: CardVariant;
};

export function Card({
  as: Component = 'article',
  children,
  variant = 'outlined',
  className,
  ...props
}: CardProps) {
  const classNames = [styles.card, className].filter(Boolean).join(' ');

  return (
    <Component {...props} className={classNames} data-variant={variant}>
      {children}
    </Component>
  );
}
