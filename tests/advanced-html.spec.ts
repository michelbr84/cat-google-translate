import { expect, test } from '@playwright/test';

test('Advanced: HTML output shows HTML button after search', async ({ page }) => {
	await page.goto('/');

	// Open Advanced Options (match multiple locales)
	const advBtn = page.getByRole('button', { name: /advanced options|opções|opciones|options avancées/i });
	await advBtn.click();

	// Toggle HTML switch by locating the row containing 'HTML'
	const htmlRow = page.locator('div.flex.items-center.space-x-2:has-text("HTML")');
	await htmlRow.first().locator('button[role="switch"]').first().click();

	// Run a search
	const searchBtn = page.getByRole('button', { name: /search/i });
	await searchBtn.click();

	// Expect HTML action button to appear
	await expect(page.getByRole('button', { name: /^html$/i })).toBeVisible({ timeout: 10000 });
});


