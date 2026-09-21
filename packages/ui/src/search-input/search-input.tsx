import type { InputHTMLAttributes } from 'react';

import { Icon } from '../icon/icon';
import styles from './search-input.module.scss';

export type SearchInputSize = 'small' | 'medium';

export type SearchInputClearAction = {
  label: string;
  onClear: () => void;
};

export type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
  size?: SearchInputSize;
  clearAction?: SearchInputClearAction;
};

export function SearchInput({
  size = 'medium',
  clearAction,
  className,
  disabled,
  ...props
}: SearchInputProps) {
  const classNames = [styles.input, className].filter(Boolean).join(' ');

  return (
    <div className={styles.field}>
      <Icon className={styles.searchIcon} name="search" size={16} tone="muted" />
      <input {...props} className={classNames} data-size={size} disabled={disabled} type="search" />
      {clearAction !== undefined ? (
        <button
          className={styles.clearButton}
          type="button"
          aria-label={clearAction.label}
          disabled={disabled}
          onClick={clearAction.onClear}
        >
          <Icon name="close" size={16} tone="muted" />
        </button>
      ) : null}
    </div>
  );
}
