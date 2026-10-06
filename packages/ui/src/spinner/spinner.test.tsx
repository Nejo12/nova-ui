import { createRef } from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

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

describe('Spinner public ref', () => {
  it('exposes the span DOM node and clears the object ref on unmount', () => {
    const ref = createRef<HTMLSpanElement>();
    const { unmount } = render(<Spinner ref={ref} />);
    expect(ref.current?.tagName.toLowerCase()).toBe('span');
    unmount();
    expect(ref.current).toBeNull();
  });

  it('invokes a callback ref with the DOM node and null on unmount', () => {
    const ref = vi.fn<(node: HTMLSpanElement | null) => void>();
    const { unmount } = render(<Spinner ref={ref} />);
    expect(ref.mock.calls[0]?.[0]?.tagName.toLowerCase()).toBe('span');
    unmount();
    expect(ref.mock.calls.at(-1)?.[0]).toBeNull();
  });
});
