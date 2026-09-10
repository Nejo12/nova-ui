import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

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
