export type { NovaResolvedTheme } from '@nova/design-tokens';

export { Dialog } from './dialog/dialog';
export type { DialogAction, DialogProps, DialogSize, DialogType } from './dialog/dialog';

export { InlineAlert } from './inline-alert/inline-alert';
export type {
  InlineAlertAnnouncement,
  InlineAlertProps,
  InlineAlertTone,
} from './inline-alert/inline-alert';

export { DelayedReveal, Skeleton, SkeletonRegion } from './skeleton/skeleton';
export type {
  DelayedRevealProps,
  SkeletonProps,
  SkeletonRadius,
  SkeletonRegionProps,
} from './skeleton/skeleton';

export { Tooltip } from './tooltip/tooltip';
export type { TooltipPlacement, TooltipProps } from './tooltip/tooltip';

export const NOVA_UI_PACKAGE = '@nova/ui' as const;
