import { expect, test } from '@playwright/test';

test('Keyboard: focus and toggle HTML/JSON switches', async ({ page }) => {
  await page.goto('/');
  // Open advanced options
  await page.locator('button[aria-controls="advanced-options-content"]').click();

  // Find switches
  const switches = page.locator('button[role="switch"]');
  const htmlSwitch = switches.nth(2); // After GIF and Text
  const jsonSwitch = switches.nth(3);

  await htmlSwitch.focus();
  await expect(htmlSwitch).toBeFocused();
  await page.keyboard.press('Space');

  // JSON must be disabled when HTML is on
  await expect(jsonSwitch).toBeDisabled();

  // Turn HTML off and JSON on
  await page.keyboard.press('Space');
  await jsonSwitch.focus();
  await page.keyboard.press('Space');
  await expect(htmlSwitch).toBeDisabled();
});


