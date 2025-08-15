import { expect, test } from '@playwright/test';

test('Advanced: JSON output shows JSON button and opens modal', async ({ page }) => {
	await page.goto('/');

	// Open Advanced Options
	const advBtn = page.getByRole('button', { name: /advanced options|opções|opciones|options avancées/i });
	await advBtn.click();

	// Toggle JSON switch via containing row
	const jsonRow = page.locator('div.flex.items-center.space-x-2:has-text("JSON")');
	await jsonRow.first().locator('button[role="switch"]').first().click();

	// Run a search
	const searchBtn = page.getByRole('button', { name: /search/i });
	await searchBtn.click();

	// Expect JSON action button and click it
	const jsonBtn = page.getByRole('button', { name: /^json$/i });
	await expect(jsonBtn).toBeVisible({ timeout: 10000 });
	await jsonBtn.click();

	// Modal content should be visible (simple pattern)
	await expect(page.locator('pre')).toBeVisible();
});


