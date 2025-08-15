import { expect, test } from '@playwright/test';

test('CATAAS combo: gif + says + filter=mono + type=square loads and has expected params', async ({ page }) => {
  // Preconfigurar opções avançadas no localStorage antes de carregar a página (independente de i18n/UI)
  await page.addInitScript((opts) => {
    try {
      localStorage.setItem('advancedOptions_v1', JSON.stringify(opts));
    } catch {}
  }, {
    useGif: true,
    customText: 'Hello',
    enableText: true,
    textColor: 'orange',
    fontSize: 24,
    imageType: 'square',
    filter: 'mono',
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

  // Buscar
  await page.getByRole('button', { name: /search/i }).click();

  const img = page.locator('img').first();
  await expect(img).toBeVisible({ timeout: 15000 });

  const src = await img.getAttribute('src');
  expect(src).toBeTruthy();
  const url = src || '';

  // Verificações básicas da URL construída
  expect(url).toContain('/says/');
  expect(url).toMatch(/fontSize=24/);
  expect(url).toMatch(/filter=mono/);
  expect(url).toMatch(/type=square/);
});


