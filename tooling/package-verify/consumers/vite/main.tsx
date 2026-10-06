import { createRoot } from 'react-dom/client';
import { Button, type ButtonProps } from '@nova-component/ui';
import { NOVA_THEME_ATTRIBUTE, type NovaResolvedTheme } from '@nova-component/design-tokens';
import '@nova-component/ui/styles.css';
import '@nova-component/design-tokens/tokens.css';

const theme: NovaResolvedTheme = 'light';
const props: ButtonProps = { children: 'Packed Vite button', variant: 'primary' };
const root = globalThis.document.getElementById('root');
if (!root) throw new Error('Missing consumer root');
root.dataset.novaTheme = theme;
root.dataset.tokensPackage = NOVA_THEME_ATTRIBUTE;
createRoot(root).render(<Button {...props} />);
