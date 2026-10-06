'use client';

import { Button, type ButtonProps } from '@nova-component/ui';
import { NOVA_THEME_ATTRIBUTE, type NovaResolvedTheme } from '@nova-component/design-tokens';

export default function Page() {
  const theme: NovaResolvedTheme = 'light';
  const props: ButtonProps = { children: 'Packed Next button', variant: 'primary' };
  return (
    <main data-nova-theme={theme} data-tokens-package={NOVA_THEME_ATTRIBUTE}>
      <Button {...props} />
    </main>
  );
}
