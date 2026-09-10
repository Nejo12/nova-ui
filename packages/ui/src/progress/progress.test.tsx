import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Progress } from './progress';

afterEach(() => cleanup());

function getIndicator(progressbar: HTMLElement) {
  const indicator = progressbar.firstElementChild;
  expect(indicator).toBeInstanceOf(HTMLElement);
  return indicator as HTMLElement;
}

describe('Progress', () => {
  it('renders a progressbar with default bounds', () => {
    render(<Progress value={30} />);

    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '30');
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
  });

  it('forwards custom value bounds and an accessible label', () => {
    render(<Progress value={25} min={10} max={50} aria-label="Upload progress" />);

    const progressbar = screen.getByRole('progressbar', { name: 'Upload progress' });
    expect(progressbar).toHaveAttribute('aria-valuenow', '25');
    expect(progressbar).toHaveAttribute('aria-valuemin', '10');
    expect(progressbar).toHaveAttribute('aria-valuemax', '50');
  });

  it('calculates the visual percentage from custom bounds', () => {
    render(<Progress value={50} min={25} max={125} aria-label="Import progress" />);

    const indicator = getIndicator(screen.getByRole('progressbar'));
    expect(indicator).toHaveStyle({ width: '25%' });
  });

  it('clamps visual rendering below and above the range', () => {
    const { rerender } = render(
      <Progress value={-20} min={0} max={100} aria-label="Sync progress" />,
    );

    expect(getIndicator(screen.getByRole('progressbar'))).toHaveStyle({ width: '0%' });

    rerender(<Progress value={140} min={0} max={100} aria-label="Sync progress" />);

    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '140');
    expect(getIndicator(progressbar)).toHaveStyle({ width: '100%' });
  });

  it('forwards native attributes and consumer class names', () => {
    render(
      <Progress
        value={60}
        aria-label="Setup progress"
        aria-describedby="progress-help"
        className="consumer-progress"
        data-testid="setup-progress"
      />,
    );

    const progressbar = screen.getByTestId('setup-progress');
    expect(progressbar).toHaveClass('consumer-progress');
    expect(progressbar).toHaveAttribute('aria-describedby', 'progress-help');
  });

  it('uses a safe zero-width visual when max is not greater than min', () => {
    const { rerender } = render(
      <Progress value={10} min={10} max={10} aria-label="Equal bounds progress" />,
    );

    expect(getIndicator(screen.getByRole('progressbar'))).toHaveStyle({ width: '0%' });

    rerender(<Progress value={10} min={20} max={10} aria-label="Invalid bounds progress" />);

    expect(getIndicator(screen.getByRole('progressbar'))).toHaveStyle({ width: '0%' });
  });
});
