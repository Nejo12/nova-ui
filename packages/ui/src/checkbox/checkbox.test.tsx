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
