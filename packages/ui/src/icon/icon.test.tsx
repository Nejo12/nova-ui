import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Icon, type IconName, type IconSize, type IconTone } from './icon';

afterEach(() => cleanup());

const iconNames: IconName[] = [
  'search',
  'notifications',
  'chevron-down',
  'chevron-right',
  'add',
  'close',
  'check',
  'info',
  'warning',
  'more',
  'calendar',
  'user',
];

const iconSizes: IconSize[] = [16, 20, 24, 32];
const iconTones: IconTone[] = ['default', 'muted', 'info', 'success', 'warning', 'danger'];

describe('Icon', () => {
  it('renders every supported semantic icon name', () => {
    render(
      <div>
        {iconNames.map((name) => (
          <Icon key={name} name={name} data-testid={name} />
        ))}
      </div>,
    );

    iconNames.forEach((name) => {
      expect(screen.getByTestId(name)).toHaveAttribute('data-icon-name', name);
    });
  });

  it('renders every supported size', () => {
    render(
      <div>
        {iconSizes.map((size) => (
          <Icon key={size} name="search" size={size} data-testid={`size-${size}`} />
        ))}
      </div>,
    );

    iconSizes.forEach((size) => {
      const icon = screen.getByTestId(`size-${size}`);
      expect(icon).toHaveAttribute('width', String(size));
      expect(icon).toHaveAttribute('height', String(size));
    });
  });

  it('uses semantic tones', () => {
    render(
      <div>
        {iconTones.map((tone) => (
          <Icon key={tone} name="info" tone={tone} data-testid={`tone-${tone}`} />
        ))}
      </div>,
    );

    iconTones.forEach((tone) => {
      expect(screen.getByTestId(`tone-${tone}`)).toHaveAttribute('data-tone', tone);
    });
  });

  it('is decorative and non-focusable by default', () => {
    render(<Icon name="search" data-testid="search" />);

    const icon = screen.getByTestId('search');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).toHaveAttribute('focusable', 'false');
  });

  it('forwards SVG attributes and composes consumer class names', () => {
    render(
      <Icon name="calendar" className="consumer-icon" data-testid="calendar" strokeWidth={1.5} />,
    );

    const icon = screen.getByTestId('calendar');
    expect(icon).toHaveClass('consumer-icon');
    expect(icon).toHaveAttribute('stroke-width', '1.5');
  });
});
