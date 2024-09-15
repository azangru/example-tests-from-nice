import { test, expect } from '@playwright/test';

test.describe('lol', () => {

  test('one', async ({ page }) => {
    // await page.goto('https://playwright.dev/');

    await page.goto('http://localhost:5173');
    const title = page.locator('css=h1');
    await expect(title).toHaveCount(1);
  });

});
