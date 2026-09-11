import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Checkbox } from '../checkbox/checkbox';
import { Fieldset } from './fieldset';

afterEach(() => cleanup());

describe('Fieldset', () => {
  it('renders a native fieldset, legend, and consumer children', () => {
    render(
      <Fieldset legend="Notification channels">
        <Checkbox label="Email" />
      </Fieldset>,
    );

    const fieldset = screen.getByRole('group', { name: 'Notification channels' });
    expect(fieldset.tagName).toBe('FIELDSET');
    expect(fieldset.querySelector('legend')).toHaveTextContent('Notification channels');
    expect(screen.getByRole('checkbox', { name: 'Email' })).toBeInTheDocument();
  });

  it('forwards native fieldset attributes', () => {
    render(
      <form id="settings-form">
        <Fieldset legend="Settings" name="settings" form="settings-form" data-testid="settings">
          Content
        </Fieldset>
      </form>,
    );

    const fieldset = screen.getByTestId('settings');
    expect(fieldset).toHaveAttribute('name', 'settings');
    expect(fieldset).toHaveAttribute('form', 'settings-form');
  });

  it('preserves native disabled semantics for grouped controls', () => {
    render(
      <Fieldset legend="Unavailable settings" disabled>
        <Checkbox label="Email" />
      </Fieldset>,
    );

    expect(screen.getByRole('group', { name: 'Unavailable settings' })).toBeDisabled();
    expect(screen.getByRole('checkbox', { name: 'Email' })).toBeDisabled();
  });

  it('preserves consumer class names', () => {
    render(
      <Fieldset legend="Custom group" className="consumer-fieldset">
        Content
      </Fieldset>,
    );

    expect(screen.getByRole('group', { name: 'Custom group' })).toHaveClass('consumer-fieldset');
  });

  it('renders and associates optional supporting content', () => {
    render(
      <Fieldset
        legend="Contact methods"
        description="Select every method that is suitable."
        aria-describedby="external-help"
      >
        <Checkbox label="Email" />
      </Fieldset>,
    );

    const fieldset = screen.getByRole('group', { name: 'Contact methods' });
    const description = screen.getByText('Select every method that is suitable.');

    expect(fieldset).toHaveAttribute('aria-describedby', expect.stringContaining('external-help'));
    expect(fieldset).toHaveAttribute('aria-describedby', expect.stringContaining(description.id));
  });
});
