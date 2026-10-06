import { createRef } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Checkbox } from './checkbox';

afterEach(() => cleanup());

describe('Checkbox', () => {
  it('renders an accessible checkbox with its label', () => {
    render(<Checkbox label="Email notifications" />);

    expect(screen.getByRole('checkbox', { name: 'Email notifications' })).not.toBeChecked();
  });

  it('forwards native checkbox props and change handlers', () => {
    const onChange = vi.fn();
    render(
      <Checkbox
        label="Lawful hiring"
        name="lawfulHiringDeclared"
        value="yes"
        defaultChecked
        required
        onChange={onChange}
      />,
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Lawful hiring' });
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute('name', 'lawfulHiringDeclared');
    expect(checkbox).toHaveAttribute('value', 'yes');
    expect(checkbox).toBeRequired();

    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('supports description content without changing the accessible name', () => {
    render(
      <Checkbox
        label="CV required"
        description="Candidates must include a CV with their application."
      />,
    );

    expect(screen.getByRole('checkbox', { name: /CV required/ })).toBeInTheDocument();
    expect(
      screen.getByText('Candidates must include a CV with their application.'),
    ).toBeInTheDocument();
  });

  it('preserves native disabled semantics', () => {
    render(<Checkbox label="Unavailable option" disabled />);

    expect(screen.getByRole('checkbox', { name: 'Unavailable option' })).toBeDisabled();
  });
});

describe('Checkbox public ref', () => {
  it('exposes the input DOM node and clears the object ref on unmount', () => {
    const ref = createRef<HTMLInputElement>();
    const { unmount } = render(<Checkbox ref={ref} label="Consent" />);
    expect(ref.current?.tagName.toLowerCase()).toBe('input');
    ref.current?.focus();
    expect(ref.current).toHaveFocus();
    unmount();
    expect(ref.current).toBeNull();
  });

  it('invokes a callback ref with the DOM node and null on unmount', () => {
    const ref = vi.fn<(node: HTMLInputElement | null) => void>();
    const { unmount } = render(<Checkbox ref={ref} label="Consent" />);
    expect(ref.mock.calls[0]?.[0]?.tagName.toLowerCase()).toBe('input');
    unmount();
    expect(ref.mock.calls.at(-1)?.[0]).toBeNull();
  });
});
