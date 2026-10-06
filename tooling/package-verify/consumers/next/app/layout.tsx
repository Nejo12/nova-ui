import type { ReactNode } from 'react';
import '@nova-component/ui/styles.css';
import '@nova-component/design-tokens/tokens.css';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
