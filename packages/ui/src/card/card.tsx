import { forwardRef, useCallback } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './card.module.scss';

export type CardVariant = 'outlined' | 'elevated';

export type CardProps = HTMLAttributes<HTMLElement> & {
  as?: 'article' | 'section' | 'div';
  children: ReactNode;
  variant?: CardVariant;
};

export const Card = forwardRef<HTMLElement, CardProps>(function Card(
  { as: Component = 'article', children, variant = 'outlined', className, ...props },
  ref,
) {
  const setRef = useCallback(
    (node: HTMLElement | null) => {
      if (typeof ref === 'function') return ref(node);
      else if (ref !== null) ref.current = node;
    },
    [ref],
  );
  const classNames = [styles.card, className].filter(Boolean).join(' ');

  return (
    <Component ref={setRef} {...props} className={classNames} data-variant={variant}>
      {children}
    </Component>
  );
});
