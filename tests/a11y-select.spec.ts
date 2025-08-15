import { expect, test } from '@playwright/test';

test('Keyboard: focus and open Advanced Image Type select via keyboard', async ({ page }) => {
  await page.goto('/');

  // Open advanced options without relying on i18n text
  await page.locator('button[aria-controls="advanced-options-content"]').click();

  // Focus the first select trigger (Radix Select uses role=combobox on trigger)
  const trigger = page.getByRole('combobox').first();
  await trigger.focus();
  await expect(trigger).toBeFocused();

  // Open the list via keyboard and select the next option
  await page.keyboard.press('ArrowDown');

  const listbox = page.getByRole('listbox');
  await expect(listbox).toBeVisible();

  // Move to a different option and confirm
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');

  // Should close the listbox and keep focus on the trigger
  await expect(listbox).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('Keyboard: focus LanguageSelector and toggle menu', async ({ page }) => {
  await page.goto('/');
  // The first Tabs may be logo; tab until Language button (has aria-label="Language" in EN)
  await page.getByRole('button', { name: /language/i }).focus();
  const langBtn = page.getByRole('button', { name: /language/i });
  await expect(langBtn).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('menu')).toBeVisible();
});


