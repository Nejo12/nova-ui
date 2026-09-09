import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { TextInput } from './text-input';

afterEach(() => cleanup());

describe('TextInput', () => {
  it('defaults to a text input and forwards native props', () => {
    render(<TextInput aria-label="Full name" name="fullName" autoComplete="name" required />);

    const input = screen.getByRole('textbox', { name: 'Full name' });
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('name', 'fullName');
    expect(input).toHaveAttribute('autocomplete', 'name');
    expect(input).toBeRequired();
  });

  it('supports explicit input types and change handlers', () => {
    const onChange = vi.fn();
    render(<TextInput aria-label="Email" type="email" onChange={onChange} />);

    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toHaveAttribute('type', 'email');

    fireEvent.change(input, { target: { value: 'person@example.com' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('person@example.com');
  });

  it('preserves native disabled semantics', () => {
    render(<TextInput aria-label="Disabled field" disabled />);

    expect(screen.getByRole('textbox', { name: 'Disabled field' })).toBeDisabled();
  });

  it('preserves validation and description attributes', () => {
    render(
      <TextInput
        aria-label="Username"
        aria-invalid="true"
        aria-describedby="username-error"
      />,
    );

    const input = screen.getByRole('textbox', { name: 'Username' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'username-error');
  });

  it('preserves consumer class names', () => {
    render(<TextInput aria-label="Custom field" className="consumer-input" />);

    expect(screen.getByRole('textbox', { name: 'Custom field' })).toHaveClass('consumer-input');
  });
});
