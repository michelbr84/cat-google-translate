import { expect, test } from '@playwright/test';

test('fontColor by name (Orange) is sent and image loads', async ({ page }) => {
  await page.addInitScript((opts) => {
    try { localStorage.setItem('advancedOptions_v1', JSON.stringify(opts)); } catch {}
  }, {
    useGif: false,
    customText: 'Hello',
    enableText: true,
    textColor: 'Orange',
    fontSize: 24,
    imageType: 'default',
    filter: 'none',
    width: 0,
    height: 0,
    brightness: 100,
    lightness: 100,
    saturation: 100,
    hue: 0,
    red: 100,
    green: 100,
    blue: 100,
    html: false,
    json: false,
  });

  await page.goto('/');
  await page.getByRole('button', { name: /search/i }).click();
  const img = page.locator('img').first();
  await expect(img).toBeVisible({ timeout: 15000 });
  const url = (await img.getAttribute('src')) || '';
  expect(url).toContain('/says/');
  expect(url).toMatch(/fontColor=Orange/);
});

test('fontColor=White is sent and image loads', async ({ page }) => {
  await page.addInitScript((opts) => {
    try { localStorage.setItem('advancedOptions_v1', JSON.stringify(opts)); } catch {}
  }, {
    useGif: false,
    customText: 'Hello',
    enableText: true,
    textColor: 'White',
    fontSize: 24,
    imageType: 'default',
    filter: 'none',
    width: 0,
    height: 0,
    brightness: 100,
    lightness: 100,
    saturation: 100,
    hue: 0,
    red: 100,
    green: 100,
    blue: 100,
    html: false,
    json: false,
  });

  await page.goto('/');
  await page.getByRole('button', { name: /search/i }).click();
  const img = page.locator('img').first();
  await expect(img).toBeVisible({ timeout: 15000 });
  const url = (await img.getAttribute('src')) || '';
  expect(url).toContain('/says/');
  expect(url).toMatch(/fontColor=White/);
});


