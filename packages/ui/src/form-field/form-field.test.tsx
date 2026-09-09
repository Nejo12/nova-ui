import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { TextInput } from '../text-input/text-input';
import { FormField } from './form-field';

afterEach(() => cleanup());

describe('FormField', () => {
  it('associates its label with the supplied control id', () => {
    render(
      <FormField label="Email" htmlFor="email">
        <TextInput id="email" />
      </FormField>,
    );

    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'email');
  });

  it('renders optional description and error content', () => {
    render(
      <FormField
        label="Email"
        htmlFor="email"
        description="Use your work email."
        error="Enter a valid email address."
      >
        <TextInput id="email" aria-invalid="true" />
      </FormField>,
    );

    expect(screen.getByText('Use your work email.')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument();
  });

  it('marks required fields visually without changing the accessible label', () => {
    render(
      <FormField label="Email" htmlFor="email" required>
        <TextInput id="email" required />
      </FormField>,
    );

    expect(screen.getByLabelText('Email')).toBeRequired();
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
  });

  it('forwards wrapper attributes and consumer class names', () => {
    const { container } = render(
      <FormField label="Email" htmlFor="email" className="consumer-field" data-testid="field">
        <TextInput id="email" />
      </FormField>,
    );

    expect(screen.getByTestId('field')).toHaveClass('consumer-field');
    expect(container.querySelector('[data-testid="field"]')).toBeInTheDocument();
  });
});
