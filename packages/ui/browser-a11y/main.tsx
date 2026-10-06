import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Dialog, Menu, Popover, Tooltip } from '../src/index';
import '@nova-component/design-tokens/tokens.css';

type DialogMode = 'info' | 'confirmation' | 'mandatory' | 'disabled' | null;

function App() {
  const [mode, setMode] = useState<DialogMode>(null);
  const [selected, setSelected] = useState('None');
  const close = () => setMode(null);
  const content = (
    <>
      <label>
        Dialog field
        <input aria-label="Dialog field" />
      </label>
      <input aria-label="Disabled field" disabled />
      <a href="#details" style={{ color: 'var(--nova-color-text-primary)' }}>
        Dialog link
      </a>
      <div role="textbox" aria-label="Editable note" contentEditable suppressContentEditableWarning>
        Editable text
      </div>
      <details>
        <summary>More details</summary>
        <p>Additional information</p>
      </details>
      <button type="button" disabled>
        Disabled control
      </button>
    </>
  );

  return (
    <main style={{ padding: 24 }}>
      <h1>Nova browser accessibility</h1>
      <button type="button" onClick={() => setMode('info')}>
        Open information
      </button>
      <button type="button" onClick={() => setMode('confirmation')}>
        Open confirmation
      </button>
      <button type="button" onClick={() => setMode('mandatory')}>
        Open mandatory
      </button>
      <button type="button" onClick={() => setMode('disabled')}>
        Open disabled action
      </button>
      <Popover trigger={<button type="button">Open popover</button>} title="Popover options">
        <label>
          Popover field
          <input aria-label="Popover field" />
        </label>
        <button type="button">Popover action</button>
      </Popover>
      <Menu
        trigger={<button type="button">Open menu</button>}
        items={[
          { id: 'first', label: 'First option', onSelect: () => setSelected('First') },
          {
            id: 'disabled',
            label: 'Disabled option',
            disabled: true,
            onSelect: () => setSelected('Disabled'),
          },
          { id: 'last', label: 'Last option', onSelect: () => setSelected('Last') },
        ]}
      />
      <Tooltip content="Helpful description">
        <button type="button">Tooltip trigger</button>
      </Tooltip>
      <output aria-label="Selected option">{selected}</output>
      {mode === 'confirmation' ? (
        <Dialog
          open
          title="Confirm change"
          type="confirmation"
          cancelLabel="Cancel change"
          action={{ label: 'Confirm change', onAction: close }}
          onClose={close}
        >
          {content}
        </Dialog>
      ) : mode !== null ? (
        <Dialog
          open
          title="Information"
          description="Review this information."
          cancellable={mode !== 'mandatory'}
          action={{ label: 'Acknowledge', onAction: close, disabled: mode === 'disabled' }}
          onClose={close}
        >
          {content}
        </Dialog>
      ) : null}
    </main>
  );
}

const root = globalThis.document.getElementById('root');
if (!root) throw new Error('Missing browser fixture root');
globalThis.document.body.style.background = 'var(--nova-color-bg-page)';
globalThis.document.body.style.color = 'var(--nova-color-text-primary)';
createRoot(root).render(<App />);
