import { createRef, type ComponentProps } from 'react';
import {
  Button,
  TextInput,
  Textarea,
  Select,
  Checkbox,
  Radio,
  SearchInput,
  IconButton,
  Card,
  Badge,
  Fieldset,
  VisuallyHidden,
  Progress,
  Icon,
  Avatar,
  Spinner,
} from '@nova-component/ui';
export const buttonRef: ComponentProps<typeof Button>['ref'] = createRef<HTMLButtonElement>();
export const textInputRef: ComponentProps<typeof TextInput>['ref'] = createRef<HTMLInputElement>();
export const textareaRef: ComponentProps<typeof Textarea>['ref'] = createRef<HTMLTextAreaElement>();
export const selectRef: ComponentProps<typeof Select>['ref'] = createRef<HTMLSelectElement>();
export const checkboxRef: ComponentProps<typeof Checkbox>['ref'] = createRef<HTMLInputElement>();
export const radioRef: ComponentProps<typeof Radio>['ref'] = createRef<HTMLInputElement>();
export const searchInputRef: ComponentProps<typeof SearchInput>['ref'] =
  createRef<HTMLInputElement>();
export const iconButtonRef: ComponentProps<typeof IconButton>['ref'] =
  createRef<HTMLButtonElement>();
export const cardRef: ComponentProps<typeof Card>['ref'] = createRef<HTMLElement>();
export const badgeRef: ComponentProps<typeof Badge>['ref'] = createRef<HTMLSpanElement>();
export const fieldsetRef: ComponentProps<typeof Fieldset>['ref'] = createRef<HTMLFieldSetElement>();
export const visuallyHiddenRef: ComponentProps<typeof VisuallyHidden>['ref'] =
  createRef<HTMLSpanElement>();
export const progressRef: ComponentProps<typeof Progress>['ref'] = createRef<HTMLDivElement>();
export const iconRef: ComponentProps<typeof Icon>['ref'] = createRef<SVGSVGElement>();
export const avatarRef: ComponentProps<typeof Avatar>['ref'] = createRef<HTMLSpanElement>();
export const spinnerRef: ComponentProps<typeof Spinner>['ref'] = createRef<HTMLSpanElement>();
// @ts-expect-error A button ref cannot target an SVG element.
export const invalidButtonRef: ComponentProps<typeof Button>['ref'] = createRef<SVGSVGElement>();
// @ts-expect-error A text input ref must expose an input, not a textarea.
export const invalidInputRef: ComponentProps<typeof TextInput>['ref'] =
  createRef<HTMLTextAreaElement>();
