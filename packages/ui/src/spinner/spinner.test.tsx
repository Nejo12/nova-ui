import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Spinner } from './spinner';

afterEach(() => cleanup());

describe('Spinner', () => {
  it('renders with the medium size by default', () => {
    render(<Spinner data-testid="spinner" />);

    expect(screen.getByTestId('spinner')).toHaveAttribute('data-size', 'medium');
  });

  it.each(['small', 'large'] as const)('renders the %s size', (size) => {
    render(<Spinner size={size} data-testid="spinner" />);

    expect(screen.getByTestId('spinner')).toHaveAttribute('data-size', size);
  });

  it('is always decorative', () => {
    render(<Spinner data-testid="spinner" />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toHaveAttribute('aria-hidden', 'true');
    expect(spinner).not.toHaveAttribute('role');
    expect(spinner).not.toHaveAttribute('aria-live');
  });

  it('forwards safe span attributes and composes consumer class names', () => {
    render(<Spinner className="consumer-spinner" data-testid="spinner" title="Loading" />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toHaveClass('consumer-spinner');
    expect(spinner).toHaveAttribute('title', 'Loading');
  });

  it('does not render children', () => {
    const unsafeProps = { children: 'Loading' } as unknown as Parameters<typeof Spinner>[0];

    render(<Spinner {...unsafeProps} data-testid="spinner" />);

    expect(screen.getByTestId('spinner')).toBeEmptyDOMElement();
  });
});
