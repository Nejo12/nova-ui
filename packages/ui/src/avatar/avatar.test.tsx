import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Avatar, type AvatarSize } from './avatar';

afterEach(() => cleanup());

const sizes: AvatarSize[] = ['small', 'medium', 'large'];

describe('Avatar', () => {
  it('renders supplied initials exactly', () => {
    render(<Avatar initials="O.G." />);

    expect(screen.getByText('O.G.')).toHaveTextContent('O.G.');
  });

  it('uses medium size by default', () => {
    render(<Avatar initials="OG" data-testid="avatar" />);

    expect(screen.getByTestId('avatar')).toHaveAttribute('data-size', 'medium');
  });

  it('supports every size', () => {
    render(
      <div>
        {sizes.map((size) => (
          <Avatar key={size} initials={size} size={size} data-testid={size} />
        ))}
      </div>,
    );

    sizes.forEach((size) => {
      expect(screen.getByTestId(size)).toHaveAttribute('data-size', size);
    });
  });

  it('forwards native attributes and composes consumer class names', () => {
    render(
      <Avatar
        initials="OG"
        className="consumer-avatar"
        id="owner-avatar"
        title="Owner initials"
        data-testid="avatar"
      />,
    );

    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('consumer-avatar');
    expect(avatar).toHaveAttribute('id', 'owner-avatar');
    expect(avatar).toHaveAttribute('title', 'Owner initials');
  });

  it('is decorative by default without interactive semantics', () => {
    render(<Avatar initials="OG" data-testid="avatar" />);

    const avatar = screen.getByTestId('avatar');
    expect(avatar.tagName).toBe('SPAN');
    expect(avatar).toHaveAttribute('aria-hidden', 'true');
    expect(avatar).not.toHaveAttribute('role');
  });

  it('remains exposed to assistive technology when aria-label is supplied', () => {
    render(<Avatar initials="OG" aria-label="Olaniyi Gabriel" />);

    const avatar = screen.getByLabelText('Olaniyi Gabriel');
    expect(avatar).not.toHaveAttribute('aria-hidden');
  });

  it('supports aria-labelledby without forcing decorative behavior', () => {
    render(
      <>
        <span id="avatar-label">Olaniyi Gabriel</span>
        <Avatar initials="OG" aria-labelledby="avatar-label" />
      </>,
    );

    const avatar = screen.getByLabelText('Olaniyi Gabriel');
    expect(avatar).not.toHaveAttribute('aria-hidden');
  });
});
