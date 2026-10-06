import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Dialog native modal contract', () => {
  test('info initial focus, Escape, restoration and body cleanup', async ({ page }) => {
    const opener = page.getByRole('button', { name: 'Open information', exact: true });
    await opener.click();
    await expect(page.getByRole('button', { name: 'Acknowledge' })).toBeFocused();
    await expect(page.getByRole('dialog')).toHaveAccessibleName('Information');
    await expect(page.getByRole('dialog')).toHaveAccessibleDescription('Review this information.');
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('hidden');
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(opener).toBeFocused();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('');
  });

  test('confirmation initial focus and native forward/backward order', async ({ page }) => {
    await page.getByRole('button', { name: 'Open confirmation', exact: true }).click();
    const cancel = page.getByRole('button', { name: 'Cancel change', exact: true });
    const confirm = page.getByRole('button', { name: 'Confirm change', exact: true });
    await expect(cancel).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(confirm).toBeFocused();
    await expect(confirm).toHaveCSS('outline-style', 'solid');
    await page.keyboard.press('Shift+Tab');
    await expect(cancel).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(page.getByText('More details', { exact: true })).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(page.getByRole('textbox', { name: 'Editable note' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByText('More details', { exact: true })).toBeFocused();
  });

  test('native modal excludes background focus across repeated Tab cycles', async ({ page }) => {
    const background = page.getByRole('button', { name: 'Open confirmation', exact: true });
    await background.click();
    await background.evaluate((element) => element.focus());
    await expect(background).not.toBeFocused();
    for (const key of ['Tab', 'Shift+Tab']) {
      for (let index = 0; index < 20; index += 1) {
        await page.keyboard.press(key);
        const contained = await page.evaluate(() => {
          const dialog = document.querySelector('dialog[open]');
          // Native navigation may visit browser chrome between cycles. It never
          // enables focus on an inert background element in the document.
          return (
            document.activeElement === document.body || !!dialog?.contains(document.activeElement)
          );
        });
        expect(contained).toBe(true);
        await expect(page.getByRole('button', { name: 'Disabled control' })).not.toBeFocused();
        await expect(page.getByRole('textbox', { name: 'Disabled field' })).not.toBeFocused();
      }
    }
  });

  test('disabled action still allows contenteditable and summary navigation', async ({ page }) => {
    await page.getByRole('button', { name: 'Open disabled action', exact: true }).click();
    await expect(page.getByRole('textbox', { name: 'Dialog field' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Dialog link' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('textbox', { name: 'Editable note' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByText('More details', { exact: true })).toBeFocused();
    await expect(page.getByRole('button', { name: 'Acknowledge' })).toBeDisabled();
  });

  test('mandatory dialog ignores Escape and backdrop, then restores focus on action/unmount', async ({
    page,
  }) => {
    const opener = page.getByRole('button', { name: 'Open mandatory', exact: true });
    await opener.click();
    await expect(page.getByRole('button', { name: 'Acknowledge' })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.mouse.click(1, 1);
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: 'Acknowledge' }).click();
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(opener).toBeFocused();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('');
  });
});

test('Popover focus, Escape restoration, and outside-pointer dismissal', async ({ page }) => {
  const opener = page.getByRole('button', { name: 'Open popover', exact: true });
  await opener.click();
  await expect(page.getByRole('textbox', { name: 'Popover field' })).toBeFocused();
  await expect(opener).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(opener).toBeFocused();
  await opener.click();
  await page.getByRole('heading', { level: 1 }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('Menu arrow navigation skips disabled items, Home/End, selection and restoration', async ({
  page,
}) => {
  const opener = page.getByRole('button', { name: 'Open menu', exact: true });
  await opener.focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitem', { name: 'First option' })).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitem', { name: 'Last option' })).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitem', { name: 'First option' })).toBeFocused();
  await page.keyboard.press('End');
  await expect(page.getByRole('menuitem', { name: 'Last option' })).toBeFocused();
  await page.keyboard.press('Home');
  await expect(page.getByRole('menuitem', { name: 'First option' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('menu')).toHaveCount(0);
  await expect(page.getByLabel('Selected option')).toHaveText('First');
  await expect(opener).toBeFocused();
  await page.keyboard.press('ArrowUp');
  await expect(page.getByRole('menuitem', { name: 'Last option' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(opener).toBeFocused();
});

test('Tooltip supports hover, keyboard focus, description and Escape', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'Tooltip trigger', exact: true });
  await trigger.hover();
  await expect(page.getByRole('tooltip')).toHaveText('Helpful description');
  await expect(trigger).toHaveAccessibleDescription('Helpful description');
  await page.mouse.move(0, 0);
  await expect(page.getByRole('tooltip')).toHaveCount(0);
  await trigger.focus();
  await expect(page.getByRole('tooltip')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('tooltip')).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(trigger).not.toHaveAttribute('aria-describedby');
});

for (const theme of ['light', 'dark']) {
  test(`representative open overlays are axe-clean in ${theme}`, async ({ page }) => {
    await page
      .locator('html')
      .evaluate((element, value) => element.setAttribute('data-nova-theme', value), theme);
    for (const trigger of ['Open information', 'Open popover', 'Open menu', 'Tooltip trigger']) {
      await page.getByRole('button', { name: trigger, exact: true }).focus();
      if (trigger !== 'Tooltip trigger') await page.keyboard.press('Enter');
      await expect(
        page.getByRole(
          trigger === 'Open menu' ? 'menu' : trigger === 'Tooltip trigger' ? 'tooltip' : 'dialog',
        ),
      ).toBeVisible();
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
      await page.keyboard.press('Escape');
    }
  });
}
