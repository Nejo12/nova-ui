import { createRef } from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Card } from './card';

afterEach(() => cleanup());

describe('Card', () => {
  it('renders an outlined article by default', () => {
    render(<Card>Card content</Card>);

    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('data-variant', 'outlined');
    expect(card).toHaveTextContent('Card content');
  });

  it('renders consumer-provided structured content unchanged', () => {
    render(
      <Card>
        <h2>Design review</h2>
        <p>Review the latest proposal.</p>
      </Card>,
    );

    expect(screen.getByRole('heading', { level: 2, name: 'Design review' })).toBeInTheDocument();
    expect(screen.getByText('Review the latest proposal.')).toBeInTheDocument();
  });

  it('forwards native attributes and consumer class names', () => {
    render(
      <Card
        as="section"
        aria-label="Account summary"
        className="consumer-card"
        data-testid="summary-card"
      >
        Summary
      </Card>,
    );

    const card = screen.getByRole('region', { name: 'Account summary' });
    expect(card).toHaveClass('consumer-card');
    expect(card).toHaveAttribute('data-testid', 'summary-card');
  });

  it('supports the elevated surface variant', () => {
    render(<Card variant="elevated">Elevated content</Card>);

    expect(screen.getByRole('article')).toHaveAttribute('data-variant', 'elevated');
  });
});

describe('Card public ref', () => {
  it.each(['article', 'section', 'div'] as const)(
    'exposes the %s root and clears it on unmount',
    (as) => {
      const ref = createRef<HTMLElement>();
      const { unmount } = render(
        <Card ref={ref} as={as}>
          Content
        </Card>,
      );
      expect(ref.current?.tagName.toLowerCase()).toBe(as);
      unmount();
      expect(ref.current).toBeNull();
    },
  );
});

it('forwards a Card callback ref and clears it on unmount', () => {
  const ref = vi.fn<(node: HTMLElement | null) => void>();
  const { unmount } = render(<Card ref={ref}>Content</Card>);
  expect(ref.mock.calls[0]?.[0]?.tagName).toBe('ARTICLE');
  unmount();
  expect(ref.mock.calls.at(-1)?.[0]).toBeNull();
});
