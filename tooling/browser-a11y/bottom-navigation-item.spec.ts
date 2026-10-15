import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

/**
 * Relative-luminance contrast ratio per WCAG 2.1 (sRGB, no alpha).
 * `rgb` strings come from `getComputedStyle`, so always "rgb(r, g, b)".
 */
function contrastRatio(foreground: string, background: string): number {
  const toLinear = (channel: number) => {
    const srgb = channel / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  };
  const luminance = (rgb: string) => {
    const match = rgb.match(/\d+/g);
    if (!match || match.length < 3) throw new Error(`Unparseable color: ${rgb}`);
    const [r, g, b] = match.map(Number) as [number, number, number];
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  };
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

for (const theme of ['light', 'dark']) {
  test(`bottom navigation item base state is axe-clean and >=4.5:1 in ${theme}`, async ({
    page,
  }) => {
    await page
      .locator('html')
      .evaluate((element, value) => element.setAttribute('data-nova-theme', value), theme);

    const nav = page.getByRole('navigation', { name: 'Bottom navigation' });
    const inactive = nav.getByRole('button', { name: 'More', exact: true });
    const current = nav.getByRole('button', { name: 'Home', exact: true });

    expect((await new AxeBuilder({ page }).include('nav').analyze()).violations).toEqual([]);

    const [inactiveStyle, currentStyle] = await Promise.all([
      inactive.evaluate((element) => {
        const style = getComputedStyle(element);
        return { color: style.color, backgroundColor: style.backgroundColor };
      }),
      current.evaluate((element) => {
        const style = getComputedStyle(element);
        return { color: style.color, backgroundColor: style.backgroundColor };
      }),
    ]);

    // Base state must declare its own background (transparent is valid and
    // lets the consumer-owned bar surface show through) rather than leaving
    // it unset, which previously fell back to the browser's UA default
    // button background (nova-ui#348 / slotnova#348).
    expect(inactiveStyle.backgroundColor).toBe('rgba(0, 0, 0, 0)');

    const pageBackground = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor,
    );
    expect(contrastRatio(inactiveStyle.color, pageBackground)).toBeGreaterThanOrEqual(4.5);

    // Current state keeps its own explicit background/foreground pairing.
    expect(currentStyle.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(contrastRatio(currentStyle.color, currentStyle.backgroundColor)).toBeGreaterThanOrEqual(
      4.5,
    );
  });
}
