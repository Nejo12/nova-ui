import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { EmptyState } from './empty-state';

afterEach(() => cleanup());

describe('EmptyState', () => {
  it('renders a region labelled by its heading', () => {
    render(<EmptyState heading="No vacancies yet" />);

    const heading = screen.getByRole('heading', { level: 2, name: 'No vacancies yet' });
    const region = screen.getByRole('region', { name: 'No vacancies yet' });

    expect(region).toHaveAttribute('aria-labelledby', heading.id);
    expect(region).toContainElement(heading);
  });

  it('supports an optional description and heading level', () => {
    render(
      <EmptyState
        heading="No applications"
        headingLevel={3}
        description={<span>Applications will appear here after candidates apply.</span>}
      />,
    );

    expect(screen.getByRole('heading', { level: 3, name: 'No applications' })).toBeInTheDocument();
    expect(
      screen.getByText('Applications will appear here after candidates apply.'),
    ).toBeInTheDocument();
  });

  it('renders one consumer-provided action without router coupling', () => {
    const onAction = vi.fn();

    render(
      <EmptyState
        heading="No vacancies yet"
        action={
          <button type="button" onClick={onAction}>
            Create vacancy
          </button>
        }
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Create vacancy' }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('forwards section attributes and consumer class names', () => {
    render(
      <EmptyState heading="Nothing saved" className="consumer-empty-state" data-testid="empty" />,
    );

    expect(screen.getByTestId('empty')).toHaveClass('consumer-empty-state');
  });
});
