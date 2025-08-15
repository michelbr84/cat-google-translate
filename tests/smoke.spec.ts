import { expect, test } from '@playwright/test';

test.describe('Smoke', () => {
	test('loads home and searches a cat', async ({ page }) => {
		await page.goto('/');
		// input placeholder should be present
		const input = page.getByRole('textbox');
		await expect(input).toBeVisible();
		await input.fill('cute');
		const searchBtn = page.getByRole('button', { name: /search/i });
		await searchBtn.click();
		// wait for image to appear
		const img = page.locator('img');
		await expect(img.first()).toBeVisible({ timeout: 10000 });
	});
});


