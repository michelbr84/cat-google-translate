import { expect, test } from '@playwright/test';

test('Lucky search loads an image', async ({ page }) => {
	await page.goto('/');
	const lucky = page.getByRole('button', { name: /feeling lucky|sorte/i });
	await lucky.click();
	await expect(page.locator('img').first()).toBeVisible({ timeout: 10000 });
});


