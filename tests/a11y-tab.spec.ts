import { expect, test } from '@playwright/test';

test('Keyboard navigation: tab through search input and buttons', async ({ page }) => {
  await page.goto('/');
  // Focus the input explicitly, then proceed with keyboard only
  const input = page.getByRole('textbox');
  await input.focus();
  await expect(input).toBeFocused();
  await page.keyboard.type('cute');
  await page.keyboard.press('Tab');
  const searchBtn = page.getByRole('button', { name: /search/i });
  await expect(searchBtn).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('img').first()).toBeVisible({ timeout: 10000 });
});


