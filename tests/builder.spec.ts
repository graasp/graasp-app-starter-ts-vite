import { expect, test } from '@playwright/test';

test('has context', async ({ page }) => {
  await page.goto('./');

  // Expect a title "to contain" a substring.
  await expect(page.getByText(/Builder/)).toHaveText(/Builder as/);
});
