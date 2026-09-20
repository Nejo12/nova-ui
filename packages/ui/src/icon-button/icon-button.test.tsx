import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { IconButton, type IconButtonSize } from './icon-button';

afterEach(() => cleanup());

const sizes: IconButtonSize[] = ['small', 'medium', 'large'];

describe('IconButton', () => {
  it('renders the requested Nova Icon', () => {
    render(<IconButton icon="notifications" aria-label="Notifications" />);

    expect(screen.getByRole('button', { name: 'Notifications' })).toContainElement(
      document.querySelector('[data-icon-name="notifications"]'),
    );
  });

  it('renders all supported sizes', () => {
    render(
      <div>
        {sizes.map((size) => (
          <IconButton key={size} icon="search" size={size} aria-label={`Search ${size}`} />
        ))}
      </div>,
    );

    sizes.forEach((size) => {
      expect(screen.getByRole('button', { name: `Search ${size}` })).toHaveAttribute(
        'data-size',
        size,
      );
    });
  });

  it('defaults to button type and respects a supplied type', () => {
    const { rerender } = render(<IconButton icon="search" aria-label="Search" />);
    expect(screen.getByRole('button', { name: 'Search' })).toHaveAttribute('type', 'button');

    rerender(<IconButton icon="search" aria-label="Search" type="submit" />);
    expect(screen.getByRole('button', { name: 'Search' })).toHaveAttribute('type', 'submit');
  });

  it('supports aria-labelledby accessible names', () => {
    render(
      <>
        <span id="calendar-label">Open calendar</span>
        <IconButton icon="calendar" aria-labelledby="calendar-label" />
      </>,
    );

    expect(screen.getByRole('button', { name: 'Open calendar' })).toBeInTheDocument();
  });

  it('forwards native button props, composes class names, and handles clicks', () => {
    const onClick = vi.fn();
    render(
      <IconButton
        icon="add"
        aria-label="Add item"
        className="consumer-icon-button"
        name="create"
        value="item"
        data-testid="add"
        onClick={onClick}
      />,
    );

    const button = screen.getByTestId('add');
    expect(button).toHaveClass('consumer-icon-button');
    expect(button).toHaveAttribute('name', 'create');
    expect(button).toHaveAttribute('value', 'item');

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('uses native disabled semantics and does not invoke click handlers', () => {
    const onClick = vi.fn();
    render(
      <IconButton icon="close" aria-label="Close" disabled onClick={onClick} data-testid="close" />,
    );

    const button = screen.getByTestId('close');
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
