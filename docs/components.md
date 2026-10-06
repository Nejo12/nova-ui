# Shipped component API and accessibility index

Generated from [the public entrypoint](../packages/ui/src/index.ts), its exported source modules and colocated Storybook stories. Run `pnpm docs:generate` to refresh; `pnpm docs:verify` checks deterministic output in the quality gate. Only actual public exports appear here; Figma-only/deferred concepts are excluded.

Props and supporting local types below are source declarations, not a second API definition. Imported native React HTML/SVG attribute types retain their React meaning. Accessibility cues show the component markup; interaction behavior and consumer naming requirements are documented in the linked stories and enforced by component tests. Supporting unexported type aliases clarify unions but are not additional public exports.

| Export                                                                | Kind              | Storybook                                                                                                          | Public types                                                                   |
| --------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| [Avatar](#avatar)                                                     | Component         | [Components/Avatar](../packages/ui/src/avatar/avatar.stories.tsx)                                                  | `AvatarProps`, `AvatarSize`                                                    |
| [Badge](#badge)                                                       | Component         | [Components/Badge](../packages/ui/src/badge/badge.stories.tsx)                                                     | `BadgeProps`, `BadgeTone`                                                      |
| [Button](#button)                                                     | Component         | [Components/Button](../packages/ui/src/button/button.stories.tsx)                                                  | `ButtonProps`, `ButtonVariant`                                                 |
| [Card](#card)                                                         | Component         | [Components/Card](../packages/ui/src/card/card.stories.tsx)                                                        | `CardProps`, `CardVariant`                                                     |
| [Checkbox](#checkbox)                                                 | Component         | [Components/Checkbox](../packages/ui/src/checkbox/checkbox.stories.tsx)                                            | `CheckboxProps`                                                                |
| [Dialog](#dialog)                                                     | Component         | [Overlay/Dialog](../packages/ui/src/dialog/dialog.stories.tsx)                                                     | `DialogAction`, `DialogProps`, `DialogSize`, `DialogType`                      |
| [EmptyState](#emptystate)                                             | Component         | [Feedback/EmptyState](../packages/ui/src/empty-state/empty-state.stories.tsx)                                      | `EmptyStateHeadingLevel`, `EmptyStateProps`                                    |
| [Fieldset](#fieldset)                                                 | Component         | [Forms/Fieldset](../packages/ui/src/fieldset/fieldset.stories.tsx)                                                 | `FieldsetProps`                                                                |
| [Icon](#icon)                                                         | Component         | [Foundations/Icon](../packages/ui/src/icon/icon.stories.tsx)                                                       | `IconName`, `IconProps`, `IconSize`, `IconTone`                                |
| [IconButton](#iconbutton)                                             | Component         | [Components/IconButton](../packages/ui/src/icon-button/icon-button.stories.tsx)                                    | `IconButtonProps`, `IconButtonSize`                                            |
| [getBottomNavigationItemClassName](#getbottomnavigationitemclassname) | Class-name helper | [Foundations/Bottom navigation item](../packages/ui/src/bottom-navigation-item/bottom-navigation-item.stories.tsx) | `BottomNavigationItemClassNameOptions`                                         |
| [getNavigationItemClassName](#getnavigationitemclassname)             | Class-name helper | [Foundations/Navigation item](../packages/ui/src/navigation-item/navigation-item.stories.tsx)                      | `NavigationItemClassNameOptions`                                               |
| [FormField](#formfield)                                               | Component         | [Forms/FormField](../packages/ui/src/form-field/form-field.stories.tsx)                                            | `FormFieldProps`                                                               |
| [InlineAlert](#inlinealert)                                           | Component         | [Feedback/InlineAlert](../packages/ui/src/inline-alert/inline-alert.stories.tsx)                                   | `InlineAlertAnnouncement`, `InlineAlertProps`, `InlineAlertTone`               |
| [InlineLoading](#inlineloading)                                       | Component         | [Feedback/InlineLoading](../packages/ui/src/inline-loading/inline-loading.stories.tsx)                             | `InlineLoadingProps`, `InlineLoadingSize`, `InlineLoadingState`                |
| [Menu](#menu)                                                         | Component         | [Overlay/PopoverMenu](../packages/ui/src/popover-menu/popover-menu.stories.tsx)                                    | `MenuItem`, `MenuProps`, `OverlayAlign`, `PopoverProps`                        |
| [Popover](#popover)                                                   | Component         | [Overlay/PopoverMenu](../packages/ui/src/popover-menu/popover-menu.stories.tsx)                                    | `MenuItem`, `MenuProps`, `OverlayAlign`, `PopoverProps`                        |
| [Progress](#progress)                                                 | Component         | [Feedback/Progress](../packages/ui/src/progress/progress.stories.tsx)                                              | `ProgressProps`                                                                |
| [Radio](#radio)                                                       | Component         | [Forms/Radio](../packages/ui/src/radio/radio.stories.tsx)                                                          | `RadioProps`                                                                   |
| [Select](#select)                                                     | Component         | [Forms/Select](../packages/ui/src/select/select.stories.tsx)                                                       | `SelectProps`                                                                  |
| [DelayedReveal](#delayedreveal)                                       | Component         | [Primitives/Skeleton](../packages/ui/src/skeleton/skeleton.stories.tsx)                                            | `DelayedRevealProps`, `SkeletonProps`, `SkeletonRadius`, `SkeletonRegionProps` |
| [Skeleton](#skeleton)                                                 | Component         | [Primitives/Skeleton](../packages/ui/src/skeleton/skeleton.stories.tsx)                                            | `DelayedRevealProps`, `SkeletonProps`, `SkeletonRadius`, `SkeletonRegionProps` |
| [SkeletonRegion](#skeletonregion)                                     | Component         | [Primitives/Skeleton](../packages/ui/src/skeleton/skeleton.stories.tsx)                                            | `DelayedRevealProps`, `SkeletonProps`, `SkeletonRadius`, `SkeletonRegionProps` |
| [Spinner](#spinner)                                                   | Component         | [Feedback/Spinner](../packages/ui/src/spinner/spinner.stories.tsx)                                                 | `SpinnerProps`, `SpinnerSize`                                                  |
| [Textarea](#textarea)                                                 | Component         | [Forms/Textarea](../packages/ui/src/textarea/textarea.stories.tsx)                                                 | `TextareaProps`                                                                |
| [TextInput](#textinput)                                               | Component         | [Forms/TextInput](../packages/ui/src/text-input/text-input.stories.tsx)                                            | `TextInputProps`                                                               |
| [SearchInput](#searchinput)                                           | Component         | [Forms/SearchInput](../packages/ui/src/search-input/search-input.stories.tsx)                                      | `SearchInputClearAction`, `SearchInputProps`, `SearchInputSize`                |
| [Toast](#toast)                                                       | Component         | [Feedback/Toast](../packages/ui/src/toast/toast.stories.tsx)                                                       | `ToastAction`, `ToastProps`, `ToastTone`                                       |
| [Tooltip](#tooltip)                                                   | Component         | [Feedback/Tooltip](../packages/ui/src/tooltip/tooltip.stories.tsx)                                                 | `TooltipPlacement`, `TooltipProps`                                             |
| [VisuallyHidden](#visuallyhidden)                                     | Component         | [Accessibility/VisuallyHidden](../packages/ui/src/visually-hidden/visually-hidden.stories.tsx)                     | `VisuallyHiddenProps`                                                          |

## Avatar

[Implementation](../packages/ui/src/avatar/avatar.tsx) · [Components/Avatar stories](../packages/ui/src/avatar/avatar.stories.tsx)

Avatar is an initials-only identity primitive. It is decorative by default; supply aria-label or aria-labelledby only when its identity information needs to be announced.

**Story states:** `Medium`, `Small`, `Large`, `DifferentInitials`, `LightAndDarkBackgrounds`, `Decorative`, `AccessibleName`.

**Native elements:** `<span>`.

**Accessibility/semantic cues from source:**

- `aria-hidden={hasAccessibleName ? undefined : true}`
- `aria-label={ariaLabel}`
- `aria-labelledby={ariaLabelledBy}`

**Props and related types:**

```tsx
export type AvatarProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'aria-hidden' | 'children' | 'role'
> & {
  initials: string;
  size?: AvatarSize;
};

export type AvatarSize = 'small' | 'medium' | 'large';
```

## Badge

[Implementation](../packages/ui/src/badge/badge.tsx) · [Components/Badge stories](../packages/ui/src/badge/badge.stories.tsx)

**Story states:** `Neutral`, `Info`, `Success`, `Warning`, `Danger`.

**Native elements:** `<span>`.

**Props and related types:**

```tsx
export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: BadgeTone;
};

export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
```

## Button

[Implementation](../packages/ui/src/button/button.tsx) · [Components/Button stories](../packages/ui/src/button/button.stories.tsx)

**Story states:** `Primary`, `Secondary`, `Danger`, `Disabled`.

**Native elements:** `<button>`.

**Accessibility/semantic cues from source:**

- `type={type}`

**Props and related types:**

```tsx
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export type ButtonVariant = 'primary' | 'secondary' | 'danger';
```

## Card

[Implementation](../packages/ui/src/card/card.tsx) · [Components/Card stories](../packages/ui/src/card/card.stories.tsx)

**Story states:** `SimpleContent`, `HeadingAndBody`, `ComposedContent`, `Elevated`.

**Props and related types:**

```tsx
export type CardProps = HTMLAttributes<HTMLElement> & {
  as?: 'article' | 'section' | 'div';
  children: ReactNode;
  variant?: CardVariant;
};

export type CardVariant = 'outlined' | 'elevated';
```

## Checkbox

[Implementation](../packages/ui/src/checkbox/checkbox.tsx) · [Components/Checkbox stories](../packages/ui/src/checkbox/checkbox.stories.tsx)

**Story states:** `Default`, `Checked`, `WithDescription`, `Disabled`.

**Native elements:** `<input>`, `<label>`, `<span>`.

**Accessibility/semantic cues from source:**

- `type="checkbox"`

**Props and related types:**

```tsx
export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: ReactNode;
  description?: ReactNode;
};
```

## Dialog

[Implementation](../packages/ui/src/dialog/dialog.tsx) · [Overlay/Dialog stories](../packages/ui/src/dialog/dialog.stories.tsx)

**Story states:** `Info`, `Confirmation`, `Destructive`, `LongContent`.

**Native elements:** `<button>`, `<dialog>`, `<div>`, `<h2>`.

**Accessibility/semantic cues from source:**

- `aria-describedby={description === undefined ? undefined : descriptionId}`
- `aria-labelledby={titleId}`
- `aria-modal="true"`
- `disabled={action.disabled}`
- `type="button"`

**Props and related types:**

```tsx
export type DialogAction = {
  label: string;
  onAction: () => void;
  disabled?: boolean;
};

export type DialogProps = InfoDialogProps | ConfirmationDialogProps | DestructiveDialogProps;

type InfoDialogProps = DialogCommonProps & {
  type?: 'info';
  cancellable?: boolean;
  cancelLabel?: never;
  destructiveContext?: never;
};

type DialogCommonProps = {
  open: boolean;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  size?: DialogSize;
  action: DialogAction;
  onClose: () => void;
};

export type DialogSize = 'small' | 'medium';

type ConfirmationDialogProps = DialogCommonProps & {
  type: 'confirmation';
  cancellable?: true;
  cancelLabel: string;
  destructiveContext?: never;
};

type DestructiveDialogProps = DialogCommonProps & {
  type: 'destructive';
  cancellable?: true;
  cancelLabel: string;
  destructiveContext?: ReactNode;
};

export type DialogType = 'info' | 'confirmation' | 'destructive';
```

## EmptyState

[Implementation](../packages/ui/src/empty-state/empty-state.tsx) · [Feedback/EmptyState stories](../packages/ui/src/empty-state/empty-state.stories.tsx)

**Story states:** `HeadingOnly`, `WithDescription`, `WithAction`, `WithLinkAction`.

**Native elements:** `<div>`, `<section>`.

**Accessibility/semantic cues from source:**

- `aria-labelledby={ariaLabelledBy ?? generatedHeadingId}`

**Props and related types:**

```tsx
export type EmptyStateHeadingLevel = 2 | 3 | 4 | 5 | 6;

export type EmptyStateProps = HTMLAttributes<HTMLElement> & {
  heading: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  headingLevel?: EmptyStateHeadingLevel;
};
```

## Fieldset

[Implementation](../packages/ui/src/fieldset/fieldset.tsx) · [Forms/Fieldset stories](../packages/ui/src/fieldset/fieldset.stories.tsx)

**Story states:** `Basic`, `GroupedCheckboxes`, `GroupedRadios`, `Disabled`.

**Native elements:** `<div>`, `<fieldset>`, `<legend>`, `<p>`.

**Accessibility/semantic cues from source:**

- `aria-describedby={describedBy}`

**Props and related types:**

```tsx
export type FieldsetProps = FieldsetHTMLAttributes<HTMLFieldSetElement> & {
  legend: ReactNode;
  description?: ReactNode;
  children: ReactNode;
};
```

## Icon

[Implementation](../packages/ui/src/icon/icon.tsx) · [Foundations/Icon stories](../packages/ui/src/icon/icon.stories.tsx)

Icon provides Nova semantic names over a deliberately small Lucide-backed set. Icons are decorative by default; an icon-only interactive control must provide its accessible name on the containing control.

**Story states:** `Default`, `AllIcons`, `Sizes`, `Tones`, `LightAndDarkBackgrounds`, `AccessibleIconOnlyControl`.

**Accessibility/semantic cues from source:**

- `aria-hidden="true"`
- `focusable="false"`

**Props and related types:**

```tsx
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

export type IconProps = Omit<
  SVGAttributes<SVGSVGElement>,
  'aria-hidden' | 'children' | 'color' | 'focusable' | 'height' | 'width'
> & {
  name: IconName;
  size?: IconSize;
  tone?: IconTone;
};

export type IconSize = 16 | 20 | 24 | 32;

export type IconTone = 'default' | 'muted' | 'info' | 'success' | 'warning' | 'danger';
```

## IconButton

[Implementation](../packages/ui/src/icon-button/icon-button.tsx) · [Components/IconButton stories](../packages/ui/src/icon-button/icon-button.stories.tsx)

IconButton is a compact icon-only action control. Every instance needs an accessible name through aria-label or aria-labelledby; the nested Nova Icon remains decorative.

**Story states:** `Default`, `Small`, `Medium`, `Large`, `RepresentativeIcons`, `Disabled`, `LightAndDarkBackgrounds`, `InteractionStates`.

**Native elements:** `<button>`.

**Accessibility/semantic cues from source:**

- `type={type}`

**Props and related types:**

```tsx
export type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-label' | 'aria-labelledby' | 'children'
> &
  IconButtonAccessibleName & {
    icon: IconName;
    size?: IconButtonSize;
  };

type IconButtonAccessibleName =
  | {
      'aria-label': string;
      'aria-labelledby'?: never;
    }
  | {
      'aria-label'?: never;
      'aria-labelledby': string;
    };

export type IconButtonSize = 'small' | 'medium' | 'large';
```

## getBottomNavigationItemClassName

[Implementation](../packages/ui/src/bottom-navigation-item/bottom-navigation-item.ts) · [Foundations/Bottom navigation item stories](../packages/ui/src/bottom-navigation-item/bottom-navigation-item.stories.tsx)

Bottom navigation item is a router-agnostic styling helper, not a DOM component. Consumers own the Link or NavLink element, routing, localization, aria-current, and bar layout. isCurrent changes visual state only; disabled navigation is intentionally unsupported.

**Story states:** `Default`, `Current`, `FocusVisibleGuidance`, `ItemDimensions`, `FiveItemRow`.

The helper supplies classes; consumers own element choice, accessible names, roles and keyboard behavior.

**Props and related types:**

```tsx
export type BottomNavigationItemClassNameOptions = {
  className?: string;
  isCurrent?: boolean;
};
```

## getNavigationItemClassName

[Implementation](../packages/ui/src/navigation-item/navigation-item.ts) · [Foundations/Navigation item stories](../packages/ui/src/navigation-item/navigation-item.stories.tsx)

Navigation item is a router-agnostic styling helper, not a DOM component. Consumers own the Link or NavLink element, routing, localization, and aria-current. isCurrent changes visual state only; disabled navigation is intentionally unsupported.

**Story states:** `Default`, `Hover`, `Current`, `FocusVisibleGuidance`, `LongLabel`, `ConstrainedAndFullWidth`.

The helper supplies classes; consumers own element choice, accessible names, roles and keyboard behavior.

**Props and related types:**

```tsx
export type NavigationItemClassNameOptions = {
  className?: string;
  isCurrent?: boolean;
};
```

## FormField

[Implementation](../packages/ui/src/form-field/form-field.tsx) · [Forms/FormField stories](../packages/ui/src/form-field/form-field.stories.tsx)

**Story states:** `Default`, `WithDescription`, `Required`, `Invalid`.

**Native elements:** `<div>`, `<label>`, `<p>`, `<span>`.

**Accessibility/semantic cues from source:**

- `aria-hidden="true"`

**Props and related types:**

```tsx
export type FormFieldProps = HTMLAttributes<HTMLDivElement> & {
  label: ReactNode;
  htmlFor: string;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  children: ReactNode;
};
```

## InlineAlert

[Implementation](../packages/ui/src/inline-alert/inline-alert.tsx) · [Feedback/InlineAlert stories](../packages/ui/src/inline-alert/inline-alert.stories.tsx)

**Story states:** `Info`, `Success`, `Warning`, `Error`, `WithAction`, `LongContent`.

**Native elements:** `<div>`, `<span>`.

**Accessibility/semantic cues from source:**

- `'aria-atomic': true`
- `'aria-live': announcement`
- `aria-hidden="true"`
- `role: announcement === 'assertive' ? 'alert' : 'status'`

**Props and related types:**

```tsx
export type InlineAlertAnnouncement = 'off' | 'polite' | 'assertive';

export type InlineAlertProps = {
  title: ReactNode;
  children: ReactNode;
  tone?: InlineAlertTone;
  action?: ReactNode;
  announcement?: InlineAlertAnnouncement;
};

export type InlineAlertTone = 'info' | 'success' | 'warning' | 'error';
```

## InlineLoading

[Implementation](../packages/ui/src/inline-loading/inline-loading.tsx) · [Feedback/InlineLoading stories](../packages/ui/src/inline-loading/inline-loading.stories.tsx)

InlineLoading is an announced inline async status. Spinner is decorative activity; Skeleton is a content placeholder; Progress is measurable completion; Toast is detached transient feedback; Result State is a stable resolved outcome.

**Story states:** `LoadingSmall`, `LoadingMedium`, `SuccessSmall`, `SuccessMedium`, `ErrorSmall`, `ErrorMedium`, `StateTransitionExample`, `LightAndDarkBackgrounds`.

**Native elements:** `<span>`.

**Accessibility/semantic cues from source:**

- `aria-atomic="true"`
- `aria-hidden="true"`
- `aria-live="polite"`
- `role="status"`

**Props and related types:**

```tsx
export type InlineLoadingProps = Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  'aria-atomic' | 'aria-live' | 'children' | 'role'
> & {
  state?: InlineLoadingState;
  size?: InlineLoadingSize;
  text: React.ReactNode;
};

export type InlineLoadingState = 'loading' | 'success' | 'error';

export type InlineLoadingSize = 'small' | 'medium';
```

## Menu

[Implementation](../packages/ui/src/popover-menu/popover-menu.tsx) · [Overlay/PopoverMenu stories](../packages/ui/src/popover-menu/popover-menu.stories.tsx)

**Story states:** `PopoverStart`, `PopoverEnd`, `MenuDefault`, `MenuEndAligned`.

**Native elements:** `<button>`, `<div>`, `<span>`.

**Accessibility/semantic cues from source:**

- `'aria-controls': panelId`
- `'aria-expanded': open`
- `'aria-haspopup': 'menu'`
- `aria-hidden="true"`
- `aria-labelledby={triggerId}`
- `disabled={item.disabled}`
- `role="menu"`
- `role="menuitem"`
- `tabIndex={-1}`
- `tabIndex={index === activeIndex ? 0 : -1}`
- `type="button"`

**Props and related types:**

```tsx
export type MenuItem = {
  id: string;
  label: ReactNode;
  onSelect: () => void;
  disabled?: boolean;
  tone?: 'default' | 'danger';
  shortcut?: ReactNode;
};

export type MenuProps = {
  trigger: ReactElement;
  items: readonly MenuItem[];
  align?: OverlayAlign;
  className?: string;
};

export type OverlayAlign = 'start' | 'end';

export type PopoverProps = {
  trigger: ReactElement;
  title: ReactNode;
  children: ReactNode;
  action?: ReactNode;
  align?: OverlayAlign;
  className?: string;
};
```

## Popover

[Implementation](../packages/ui/src/popover-menu/popover-menu.tsx) · [Overlay/PopoverMenu stories](../packages/ui/src/popover-menu/popover-menu.stories.tsx)

**Story states:** `PopoverStart`, `PopoverEnd`, `MenuDefault`, `MenuEndAligned`.

**Native elements:** `<div>`, `<h2>`, `<span>`.

**Accessibility/semantic cues from source:**

- `'aria-controls': panelId`
- `'aria-expanded': open`
- `'aria-haspopup': 'dialog'`
- `aria-labelledby={titleId}`
- `role="dialog"`
- `tabIndex={-1}`

**Props and related types:**

```tsx
export type MenuItem = {
  id: string;
  label: ReactNode;
  onSelect: () => void;
  disabled?: boolean;
  tone?: 'default' | 'danger';
  shortcut?: ReactNode;
};

export type MenuProps = {
  trigger: ReactElement;
  items: readonly MenuItem[];
  align?: OverlayAlign;
  className?: string;
};

export type OverlayAlign = 'start' | 'end';

export type PopoverProps = {
  trigger: ReactElement;
  title: ReactNode;
  children: ReactNode;
  action?: ReactNode;
  align?: OverlayAlign;
  className?: string;
};
```

## Progress

[Implementation](../packages/ui/src/progress/progress.tsx) · [Feedback/Progress stories](../packages/ui/src/progress/progress.stories.tsx)

**Story states:** `Default`, `Low`, `Medium`, `Complete`, `CustomRange`, `LabelledByText`.

**Native elements:** `<div>`, `<span>`.

**Accessibility/semantic cues from source:**

- `aria-hidden="true"`
- `aria-valuemax={max}`
- `aria-valuemin={min}`
- `aria-valuenow={value}`
- `role="progressbar"`

**Props and related types:**

```tsx
export type ProgressProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'aria-valuemax' | 'aria-valuemin' | 'aria-valuenow' | 'children' | 'role'
> & {
  value: number;
  min?: number;
  max?: number;
};
```

## Radio

[Implementation](../packages/ui/src/radio/radio.tsx) · [Forms/Radio stories](../packages/ui/src/radio/radio.stories.tsx)

**Story states:** `Default`, `Checked`, `WithDescription`, `Disabled`.

**Native elements:** `<input>`, `<label>`, `<span>`.

**Accessibility/semantic cues from source:**

- `type="radio"`

**Props and related types:**

```tsx
export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: ReactNode;
  description?: ReactNode;
};
```

## Select

[Implementation](../packages/ui/src/select/select.tsx) · [Forms/Select stories](../packages/ui/src/select/select.stories.tsx)

**Story states:** `Default`, `Selected`, `Disabled`, `Invalid`.

**Native elements:** `<select>`.

**Props and related types:**

```tsx
export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;
```

## DelayedReveal

[Implementation](../packages/ui/src/skeleton/skeleton.tsx) · [Primitives/Skeleton stories](../packages/ui/src/skeleton/skeleton.stories.tsx)

**Story states:** `Default`, `WidthAndRadii`, `BusyRegion`, `Delayed`.

**Native elements:** `<div>`.

**Props and related types:**

```tsx
export type DelayedRevealProps = {
  children: ReactNode;
};

export type SkeletonProps = {
  width?: string;
  height: string;
  radius?: SkeletonRadius;
  className?: string;
};

export type SkeletonRadius = 'sm' | 'md' | 'pill';

export type SkeletonRegionProps = {
  label: string;
  children: ReactNode;
};
```

## Skeleton

[Implementation](../packages/ui/src/skeleton/skeleton.tsx) · [Primitives/Skeleton stories](../packages/ui/src/skeleton/skeleton.stories.tsx)

**Story states:** `Default`, `WidthAndRadii`, `BusyRegion`, `Delayed`.

**Native elements:** `<div>`.

**Accessibility/semantic cues from source:**

- `aria-hidden="true"`

**Props and related types:**

```tsx
export type DelayedRevealProps = {
  children: ReactNode;
};

export type SkeletonProps = {
  width?: string;
  height: string;
  radius?: SkeletonRadius;
  className?: string;
};

export type SkeletonRadius = 'sm' | 'md' | 'pill';

export type SkeletonRegionProps = {
  label: string;
  children: ReactNode;
};
```

## SkeletonRegion

[Implementation](../packages/ui/src/skeleton/skeleton.tsx) · [Primitives/Skeleton stories](../packages/ui/src/skeleton/skeleton.stories.tsx)

**Story states:** `Default`, `WidthAndRadii`, `BusyRegion`, `Delayed`.

**Native elements:** `<div>`, `<span>`.

**Accessibility/semantic cues from source:**

- `aria-busy="true"`
- `role="status"`

**Props and related types:**

```tsx
export type DelayedRevealProps = {
  children: ReactNode;
};

export type SkeletonProps = {
  width?: string;
  height: string;
  radius?: SkeletonRadius;
  className?: string;
};

export type SkeletonRadius = 'sm' | 'md' | 'pill';

export type SkeletonRegionProps = {
  label: string;
  children: ReactNode;
};
```

## Spinner

[Implementation](../packages/ui/src/spinner/spinner.tsx) · [Feedback/Spinner stories](../packages/ui/src/spinner/spinner.stories.tsx)

Spinner is a decorative indeterminate loading primitive. It does not announce loading state; use InlineLoading or another appropriate status region when loading must be communicated to assistive technology.

**Story states:** `Small`, `Medium`, `Large`, `AllSizes`, `LightAndDarkBackgrounds`.

**Native elements:** `<span>`.

**Accessibility/semantic cues from source:**

- `aria-hidden="true"`

**Props and related types:**

```tsx
export type SpinnerProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'aria-hidden' | 'aria-live' | 'children' | 'role'
> & {
  size?: SpinnerSize;
};

export type SpinnerSize = 'small' | 'medium' | 'large';
```

## Textarea

[Implementation](../packages/ui/src/textarea/textarea.tsx) · [Forms/Textarea stories](../packages/ui/src/textarea/textarea.stories.tsx)

**Story states:** `Default`, `WithValue`, `Invalid`, `Disabled`.

**Native elements:** `<textarea>`.

**Props and related types:**

```tsx
export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
```

## TextInput

[Implementation](../packages/ui/src/text-input/text-input.tsx) · [Forms/TextInput stories](../packages/ui/src/text-input/text-input.stories.tsx)

**Story states:** `Default`, `Email`, `Disabled`, `Invalid`, `Password`.

**Native elements:** `<input>`.

**Accessibility/semantic cues from source:**

- `type={type}`

**Props and related types:**

```tsx
export type TextInputProps = InputHTMLAttributes<HTMLInputElement>;
```

## SearchInput

[Implementation](../packages/ui/src/search-input/search-input.tsx) · [Forms/SearchInput stories](../packages/ui/src/search-input/search-input.stories.tsx)

SearchInput provides a native search field. Consumers own labels, query state, debounce behavior, submissions, and search results.

**Story states:** `Default`, `Small`, `Medium`, `Filled`, `WithClearAction`, `Disabled`, `WithFormField`, `AccessibleLabelled`.

**Native elements:** `<button>`, `<div>`, `<input>`.

**Accessibility/semantic cues from source:**

- `aria-label={clearAction.label}`
- `disabled={disabled}`
- `type="button"`
- `type="search"`

**Props and related types:**

```tsx
export type SearchInputClearAction = {
  label: string;
  onClear: () => void;
};

export type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
  size?: SearchInputSize;
  clearAction?: SearchInputClearAction;
};

export type SearchInputSize = 'small' | 'medium';
```

## Toast

[Implementation](../packages/ui/src/toast/toast.tsx) · [Feedback/Toast stories](../packages/ui/src/toast/toast.stories.tsx)

**Story states:** `Info`, `Success`, `WarningWithAction`, `Error`, `DisabledAction`.

**Native elements:** `<button>`, `<div>`, `<span>`.

**Accessibility/semantic cues from source:**

- `aria-atomic="true"`
- `aria-hidden="true"`
- `aria-label={dismissLabel}`
- `aria-live={isError ? 'assertive' : 'polite'}`
- `disabled={action.disabled}`
- `role={isError ? 'alert' : 'status'}`
- `type="button"`

**Props and related types:**

```tsx
export type ToastAction = {
  label: string;
  onAction: () => void;
  disabled?: boolean;
};

export type ToastProps = {
  children: ReactNode;
  dismissLabel: string;
  onDismiss: () => void;
  tone?: ToastTone;
  action?: ToastAction;
};

export type ToastTone = 'info' | 'success' | 'warning' | 'error';
```

## Tooltip

[Implementation](../packages/ui/src/tooltip/tooltip.tsx) · [Feedback/Tooltip stories](../packages/ui/src/tooltip/tooltip.stories.tsx)

**Story states:** `Top`, `Bottom`, `Left`, `Right`, `ExistingDescription`, `NarrowSurface`.

**Native elements:** `<span>`.

**Accessibility/semantic cues from source:**

- `'aria-describedby': describedBy || undefined`
- `role="tooltip"`

**Props and related types:**

```tsx
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export type TooltipProps = {
  content: ReactNode;
  children: ReactElement;
  placement?: TooltipPlacement;
  className?: string;
};
```

## VisuallyHidden

[Implementation](../packages/ui/src/visually-hidden/visually-hidden.tsx) · [Accessibility/VisuallyHidden stories](../packages/ui/src/visually-hidden/visually-hidden.stories.tsx)

VisuallyHidden keeps content in the document and accessibility tree while intentionally removing it from the visual layout.

**Story states:** `ScreenReaderContext`, `ButtonAccessibleName`.

**Native elements:** `<span>`.

**Props and related types:**

```tsx
export type VisuallyHiddenProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};
```

## Additional public exports

- `NovaResolvedTheme` — type re-export from `@nova-component/design-tokens`
- `NOVA_UI_PACKAGE` — package constant
