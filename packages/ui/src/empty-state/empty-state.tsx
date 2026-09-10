import { useId, type HTMLAttributes, type ReactNode } from 'react';

import styles from './empty-state.module.scss';

export type EmptyStateHeadingLevel = 2 | 3 | 4 | 5 | 6;

export type EmptyStateProps = HTMLAttributes<HTMLElement> & {
  heading: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  headingLevel?: EmptyStateHeadingLevel;
};

export function EmptyState({
  heading,
  description,
  action,
  headingLevel = 2,
  className,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: EmptyStateProps) {
  const generatedHeadingId = useId();
  const Heading = `h${headingLevel}` as const;
  const classNames = [styles.emptyState, className].filter(Boolean).join(' ');

  return (
    <section
      {...props}
      className={classNames}
      aria-labelledby={ariaLabelledBy ?? generatedHeadingId}
    >
      <Heading id={generatedHeadingId} className={styles.heading}>
        {heading}
      </Heading>
      {description !== undefined ? <div className={styles.description}>{description}</div> : null}
      {action !== undefined ? <div className={styles.action}>{action}</div> : null}
    </section>
  );
}
