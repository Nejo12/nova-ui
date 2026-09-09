import type { Meta, StoryObj } from '@storybook/react-vite';

function TokenPreview() {
  const swatches = [
    ['Page', 'var(--nova-color-bg-page)', 'var(--nova-color-text-primary)'],
    ['Surface', 'var(--nova-color-bg-surface)', 'var(--nova-color-text-primary)'],
    ['Subtle', 'var(--nova-color-bg-subtle)', 'var(--nova-color-text-primary)'],
    ['Primary action', 'var(--nova-color-action-primary)', 'var(--nova-color-action-primary-text)'],
  ] as const;

  return (
    <div style={{ display: 'grid', gap: 'var(--nova-space-4)', maxWidth: 760 }}>
      <header>
        <h1 style={{ margin: 0 }}>Nova semantic token contract</h1>
        <p style={{ color: 'var(--nova-color-text-secondary)' }}>
          Product themes override semantic values without changing component APIs.
        </p>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 'var(--nova-space-3)',
        }}
      >
        {swatches.map(([label, background, color]) => (
          <div
            key={label}
            style={{
              background,
              color,
              border: '1px solid var(--nova-color-border-default)',
              borderRadius: 'var(--nova-radius-md)',
              minHeight: 120,
              padding: 'var(--nova-space-4)',
            }}
          >
            <strong>{label}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: 'Foundations/Tokens',
  component: TokenPreview,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof TokenPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SemanticContract: Story = {};
