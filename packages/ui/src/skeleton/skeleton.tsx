import type { CSSProperties, ReactNode } from 'react';

import styles from './skeleton.module.scss';

export type SkeletonRadius = 'sm' | 'md' | 'pill';

export type SkeletonProps = {
  width?: string;
  height: string;
  radius?: SkeletonRadius;
  className?: string;
};

const RADIUS_CLASS: Record<SkeletonRadius, string> = {
  sm: styles.radiusSm!,
  md: styles.radiusMd!,
  pill: styles.radiusPill!,
};

export function Skeleton({
  width = '100%',
  height,
  radius = 'sm',
  className,
}: SkeletonProps) {
  const classNames = [styles.skeleton, RADIUS_CLASS[radius], className]
    .filter(Boolean)
    .join(' ');
  const style: CSSProperties = { width, height };

  return <div aria-hidden="true" className={classNames} style={style} />;
}

export type SkeletonRegionProps = {
  label: string;
  children: ReactNode;
};

export function SkeletonRegion({ label, children }: SkeletonRegionProps) {
  return (
    <div role="status" aria-busy="true">
      <span className={styles.srOnly}>{label}</span>
      {children}
    </div>
  );
}

export type DelayedRevealProps = {
  children: ReactNode;
};

export function DelayedReveal({ children }: DelayedRevealProps) {
  return <div className={styles.delayedReveal}>{children}</div>;
}
